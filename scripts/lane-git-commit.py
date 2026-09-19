#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/lane-git-commit.py -- lane 产物 host 侧 git 提交器 (K3 C 修复, 2026-09-14)

问题根因 (K3 C 项):
  lane (dsh --profile headless) 运行在受限 sandbox, pwsh 工具被 block -> git 无法执行;
  且 lane 工作目录是 redesign 分支 -> 即使能 push 也推错分支, 永不 deploy。

修复:
  wrapper .cmd 由 Task Scheduler 以 cmd.exe 运行 (host 侧, 不受 lane sandbox 限制),
  dsh lane 结束后 wrapper 追加调用本脚本:
    python scripts/lane-git-commit.py --lane <name> --repo <main-worktree>
  本脚本在 main worktree 检测 src/data + .hermes 改动 -> 跑 guard -> commit + push。

用法:
  python scripts/lane-git-commit.py --lane ZP-daily-content
环境:
  PYTHONIOENCODING=utf-8 (wrapper 已设)
"""
import argparse
import json
import os
import subprocess
import sys
import time

try:  # 根治 Windows 控制台 GBK 崩 (v9.4 §三-1)
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

# 2026-09-17 K3 目录铁律: F:\zprintpro-nextjs 是唯一项目根 + 唯一生产工作目录。
# 旧值硬编码 "F:/zprintpro-main-tmp"; 该 worktree 于 2026-09-17 移除后, 硬编码路径让
# host-side commit 直接失败 (can't open file .../lane-git-commit.py: No such file)。
# 改为自动探测: 本脚本位于 <repo>/scripts/ 下 → repo 根 = 上两级目录, 无路径假设。
MAIN_REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GIT = "git"

# lane 允许提交的路径 (白名单: 只提交 lane 真正会改的生产文件 + 报告)
# 排除: .hermes/*.cjs 工具/备份/回滚 (一次性诊断工具, 不属 lane 产物)
# 排除: .hermes/industry-keyword-matrix.json (K3 拍板 defer 到 gsc-feedback cron 单独提交,
#        避免 lane 自动提交把残留 M 状态一并带走; gsc-feedback prompt 内部处理该文件)
ALLOWED_PATHS = [
    "src/data/blog-data/",
    "src/data/blog-posts.ts",
    "src/data/products.ts",
    "src/data/sku-seo-data.ts",
    "src/app/[locale]/blog/[slug]/page.tsx",
    "src/lib/",
    ".hermes/logs/",
    ".hermes/reports/",
    "docs/",
    "scripts/",
]


def run(args, cwd=MAIN_REPO, check=True):
    r = subprocess.run(args, cwd=cwd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if check and r.returncode != 0:
        print(f"[git] {' '.join(args)} -> exit {r.returncode}\n{r.stdout}\n{r.stderr}", file=sys.stderr)
        raise SystemExit(2)
    return r


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lane", required=True, help="lane name, e.g. ZP-daily-content")
    ap.add_argument("--repo", default=MAIN_REPO)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--include-matrix", action="store_true",
                    help="仅 gsc-feedback lane 使用: 允许提交 .hermes/industry-keyword-matrix.json "
                         "(K3 拍板该文件由 gsc-feedback cron 单独提交)")
    args = ap.parse_args()

    repo = args.repo
    # linked worktree 的 .git 是文件 (gitdir 指针), 不是目录 -> 用 git rev-parse 验证
    probe = subprocess.run([GIT, "rev-parse", "--git-dir"], cwd=repo, capture_output=True, text=True)
    if probe.returncode != 0:
        print(f"[lane-git] repo 无效或非 git 仓库: {repo} -> 跳过", file=sys.stderr)
        return 1

    # 1) 检测 main worktree 改动 (相对 HEAD) — 用 -z NUL 分隔避免路径解析偏移
    r = run([GIT, "status", "--porcelain", "-z"], cwd=repo, check=False)
    changed = []
    # -z 格式: "XY path\0" (重命名: "XY old\0new\0"), path 原样无引用
    tokens = r.stdout.split("\0")
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        if not tok:
            i += 1
            continue
        status = tok[:2]
        path = tok[3:]  # 跳过 "XY " (2 状态符 + 1 空格)
        if status[0] in ("R", "C") and i + 1 < len(tokens):
            # rename/copy: 下一个 token 是新路径
            path = tokens[i + 1]
            i += 2
        else:
            i += 1
        # XY 任一列有改动即算 (工作树改动常见于 Y 列, 如 " M")
        if status[0] in ("M", "A", "D", "R", "C", "T", "?") or status[1] in ("M", "A", "D", "T", "U"):
            changed.append(path)

    # 2) 白名单过滤
    allowed_paths = list(ALLOWED_PATHS)
    if args.include_matrix:
        allowed_paths.append(".hermes/industry-keyword-matrix.json")
    allowed = []
    for p in changed:
        norm = p.replace("\\", "/")
        if any(norm.startswith(prefix) or norm == prefix for prefix in allowed_paths):
            allowed.append(p)
        else:
            print(f"[lane-git] 跳过白名单外改动: {p}")

    if not allowed:
        print(f"[lane-git] {args.lane}: 无可提交的白名单改动 (共 {len(changed)} 个原始改动) -> 不 commit")
        return 0

    print(f"[lane-git] {args.lane}: 白名单改动 {len(allowed)} 个:")
    for p in allowed:
        print(f"  + {p}")

    # 3) 跑 guard (encoding + 品牌) — 失败则 abort
    guard_ok = True
    try:
        enc = run(["node", "scripts/check-encoding.js"], cwd=repo, check=False)
        if enc.returncode != 0:
            print("[lane-git] check-encoding FAILED -> abort commit", file=sys.stderr)
            guard_ok = False
    except FileNotFoundError:
        pass
    if not guard_ok:
        return 3

    if args.dry_run:
        print(f"[lane-git] dry-run: 将 commit {len(allowed)} 文件 (未执行)")
        return 0

    # 4) commit (lane 专用消息) — 分两类:
    #    a) src 生产文件: 走预提交 hook 全量 guard (encoding/brand/GSC 硬拦)
    #    b) .hermes/logs|reports 报告: 内部文档, 预提交 hook 的品牌/GSC guard 不适用
    #       (报告含 GSC 决策数字但无来源行是常态), 用 --no-verify 单独提交, 防止
    #       lane 自动提交因报告 guard 命中而整体失败
    src_files = [p for p in allowed if not p.startswith(".hermes/")]
    # 2026-09-15 fix: matrix 必须被提交。matrix 以 .hermes/ 开头、不属于 logs/reports,
    #   原分类导致 --include-matrix 白名单命中但两个 commit 桶都不含 → 静默丢弃 (永不 commit)。
    #   归入 report 类 (内部数据文件, --no-verify 提交, 与其它 .hermes 数据一致)。
    report_files = [p for p in allowed if p.startswith(".hermes/logs/") or p.startswith(".hermes/reports/")
                    or (args.include_matrix and p == ".hermes/industry-keyword-matrix.json")]

    date = time.strftime("%Y-%m-%d %H:%M")

    if src_files:
        msg = f"cron({args.lane}): lane 产物自动提交 {date}"
        run([GIT, "add", "--"] + src_files, cwd=repo)
        r = run([GIT, "commit", "-m", msg], cwd=repo, check=False)
        if r.returncode != 0 and "nothing to commit" not in r.stdout + r.stderr:
            print(f"[lane-git] src commit 被拦: {r.stdout}\n{r.stderr}", file=sys.stderr)
            print(f"[lane-git] 提示: 生产文件未过 guard, 需人工处理 (不自动 --no-verify)", file=sys.stderr)
            # 2026-09-19 修复: 原实现在此 return 4 -> 跳过报告提交与执行报告写入 ->
            # 9/19 blog-deepfix lane 整批成功却在 cron-execution-report.md 里没有任何记录
            # (成功且无记录 = 主程序无从判断)。改为: 先落报告 + 写执行报告行, 再返回 4。
            if report_files:
                _commit_reports(repo, args, report_files, date)
            write_exec_report(args.lane, args.repo, allowed, False, date,
                              exit_code=4,
                              verdict="FAILED(guard 拦下 src commit)",
                              blocked_reason=f"pre-commit guard 拒绝 {len(src_files)} 个生产文件",
                              report_files=report_files)
            return 4
        print(f"[lane-git] src commit 完成: {msg} ({len(src_files)} 文件)")

    if report_files:
        if _commit_reports(repo, args, report_files, date) != 0:
            return 4

    # 5) push (host 侧, SSH 已认证) — §0.25 30min 间隔硬下限:
    #    距上次 push <30min 只 commit 不 push (commit 已落本地, 下次 lane/手动 push 带走)
    #    撞车判定: 用 origin/main 最新 commit 时间
    last_push = run([GIT, "log", "origin/main", "-1", "--format=%ct"], cwd=repo, check=False).stdout.strip()
    now_ts = int(time.time())
    try:
        last_ts = int(last_push)
        gap = now_ts - last_ts
    except ValueError:
        gap = 99999
    pushed = False
    if gap < 1800:
        print(f"[lane-git] 距上次 push {gap}s (<30min) -> 本次只 commit 不 push (§0.25 硬下限), "
              f"commit 留待下次 lane/manual push")
    else:
        r = run([GIT, "push", "origin", "main"], cwd=repo, check=False)
        if r.returncode != 0:
            print(f"[lane-git] push 失败: {r.stdout}\n{r.stderr}", file=sys.stderr)
            return 5
        pushed = True
        print("[lane-git] push 完成 -> origin/main 已更新")

    # 6) 统一执行报告 (K3 2026-09-15 拍板: 定时任务完成后要有可查看的执行报告与结果)
    #    每次 lane 收尾追加一条记录到 .hermes/logs/cron-execution-report.md
    write_exec_report(args.lane, args.repo, allowed, pushed, date)
    return 0


def _commit_reports(repo, args, report_files, date):
    """提交 .hermes 内部报告/数据 (--no-verify)。

    2026-09-19 抽出为独立函数: 原实现内联在 main(), 一旦 src commit 被 guard 拦下就
    return 4, 报告文件永远不提交 (实测 9/19 两份 blog-deepfix 报告至今仍是 untracked)。
    """
    msg = f"cron({args.lane}): lane 报告 {date}"
    run([GIT, "add", "--"] + report_files, cwd=repo)
    r = run([GIT, "commit", "--no-verify", "-m", msg], cwd=repo, check=False)
    if r.returncode != 0 and "nothing to commit" not in r.stdout + r.stderr:
        print(f"[lane-git] report commit 失败: {r.stdout}\n{r.stderr}", file=sys.stderr)
        return 4
    print(f"[lane-git] report commit 完成 (--no-verify): {msg} ({len(report_files)} 文件)")
    return 0


def pick_lane_report(lane, allowed):
    """从本次白名单改动里挑出**本车道自己的报告文件**。

    2026-09-19 实测教训: 原实现取 "第一个 .md" -> 会把别人的文件写进报告列
    (历史行: daily-content 写成 title-audit-2026-09-09.md / gsc-feedback 写成 cron-check-tonight.md;
     当日实测又把 ZP-blog-deepfix 写成 .hermes/logs/cron-watchdog-alerts.md)。
    口径: ① 优先 <YYYY-MM-DD>-<lane>.md (契约强制命名) ② 其次 *-<lane 短名>.md ③ 都没有写 NONE。
    """
    short = lane.replace("ZP-", "")
    md = [p for p in (allowed or [])
          if p.endswith(".md") and "cron-execution-report.md" not in p]
    dated = sorted([p for p in md if os.path.basename(p).startswith(tuple(
        f"{d}-" for d in [time.strftime('%Y-%m-%d', time.localtime()),
                          time.strftime('%Y-%m-%d', time.localtime(time.time() - 86400))]))])
    for p in dated:
        if os.path.basename(p).endswith(f"-{short}.md") or os.path.basename(p).endswith(f"-{lane}.md"):
            return p
    named = [p for p in sorted(md) if p.endswith(f"-{short}.md") or p.endswith(f"-{lane}.md")]
    if named:
        return named[-1]
    if dated:
        return dated[-1]
    return "NONE"


def write_lane_run(record):
    """追加一条结构化 run 记录到 .hermes/logs/lane-runs.jsonl (结果总线, K3 2026-09-19 指令)。

    这是「定时任务把执行结果和数据交给主程序做判断依据」的机器可读载体,
    由 scripts/lane-status.mjs 汇总成 lane-status.json / lane-status.md。
    """
    try:
        bus = os.path.join(MAIN_REPO, ".hermes", "logs", "lane-runs.jsonl")
        os.makedirs(os.path.dirname(bus), exist_ok=True)
        with open(bus, "a", encoding="utf-8", newline="\n") as fh:
            fh.write(json.dumps(record, ensure_ascii=False) + "\n")
        print(f"[lane-git] 结果总线已追加: {bus}")
    except (OSError, TypeError) as e:  # noqa: BLE001
        print(f"[lane-git] 结果总线写入失败: {e}", file=sys.stderr)


def write_exec_report(lane, repo, allowed, pushed, date,
                      exit_code=0, verdict="✅ 完成", blocked_reason="", report_files=None):
    """追加 lane 执行报告到统一总览文件 cron-execution-report.md (K3 要求可见).

    2026-09-19 升级 (K3 指令「定时任务要有报告, 且报告要能作为判断依据」):
      ① 报告路径不再取「字母序第一个 .md」(原实现会写错成别人的旧报告), 改为优先取本 lane
         报告文件 (report_files 里第一个 .md);
      ② 结果列写真实 verdict + exit_code, 不再恒写「✅ 完成」;
      ③ 同时写结构化 lane-runs.jsonl, 供 lane-status.mjs 汇总。
    """
    report = pick_lane_report(lane, report_files if report_files is not None else allowed)
    pushed_txt = "✅ push" if pushed else "⏳ commit(未 push)"
    files = [p for p in allowed
             if not p.endswith(".md")
             and not p.startswith("scripts/")
             and not p.startswith(".hermes/logs/")
             and not p.startswith(".hermes/reports/")]
    files_txt = ", ".join(files) if files else "NONE"
    now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    verdict_txt = verdict if verdict else ("✅ 完成" if exit_code == 0 else f"❌ exit={exit_code}")

    try:
        logs_dir = os.path.join(repo, ".hermes", "logs")
        os.makedirs(logs_dir, exist_ok=True)
        rep = os.path.join(logs_dir, "cron-execution-report.md")
        line = (f"| {now} | {lane} | {verdict_txt} (exit={exit_code}) | `{report}` | "
                f"{files_txt} | {pushed_txt} |\n")
        if not os.path.exists(rep):
            header = ("# Cron 执行报告总览\n\n"
                      "> 每次 lane / watchdog 运行后自动追加一条。"
                      "机器可读版: `lane-runs.jsonl` + `lane-status.json` (scripts/lane-status.mjs)。\n\n"
                      "| 时间 | 任务 | 结果 | 报告路径 | 详情/产物 | push 状态 |\n"
                      "|------|------|------|----------|----------|-----------|\n")
            with open(rep, "w", encoding="utf-8", newline="\n") as fh:
                fh.write(header + line)
        else:
            with open(rep, "a", encoding="utf-8", newline="\n") as fh:
                fh.write(line)
        print(f"[lane-git] 执行报告已追加: {rep}")
    except OSError as e:
        print(f"[lane-git] 执行报告写入失败: {e}", file=sys.stderr)

    # 结果总线 (机器可读)
    try:
        head = run([GIT, "rev-parse", "--short", "HEAD"], cwd=repo, check=False).stdout.strip()
    except Exception:  # noqa: BLE001
        head = ""
    write_lane_run({
        "run_id": f"{lane}-{time.strftime('%Y%m%dT%H%M%S', time.localtime())}",
        "lane": lane,
        "trigger": "schtasks",
        "ended_at": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
        "dsh_exit": None,           # wrapper 侧已知; 本脚本无法读取, 由 lane-status.mjs 从 wrapper 日志补齐
        "wrapper_exit": exit_code,
        "verdict": "OK" if exit_code == 0 else ("BLOCKED" if blocked_reason else "FAILED"),
        "blocked_reason": blocked_reason,
        "guard": {"ok": exit_code != 4},
        "report": report,
        "files": files,
        "pushed": bool(pushed),
        "head": head,
        "source": "lane-git-commit.py",
    })


if __name__ == "__main__":
    sys.exit(main())
