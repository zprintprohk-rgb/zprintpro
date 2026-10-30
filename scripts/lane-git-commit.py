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
    python scripts/lane-git-commit.py --lane <name> --repo <main-worktree> --dsh-exit <real-exit>
  非零 dsh exit 或无效当日报告均禁止 commit/push; 通过后才检测白名单改动并跑 guard。

用法:
  python scripts/lane-git-commit.py --lane ZP-daily-content --dsh-exit 0
环境:
  PYTHONIOENCODING=utf-8 (wrapper 已设)
"""
import argparse
import hashlib
import json
import os
import re
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

# Shared runtime state is evidence, not a lane deliverable. Excluding it prevents one
# lane from committing another lane's bus rows, logs, locks or freshly generated status.
RUNTIME_ONLY_PATHS = [
    ".hermes/logs/lane-runs.jsonl",
    ".hermes/logs/lane-status.json",
    ".hermes/logs/lane-status.md",
    ".hermes/logs/cron-execution-report.md",
    ".hermes/logs/run-context-",
    ".hermes/logs/cron-",
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
    ap.add_argument("--dsh-exit", required=True, type=int,
                    help="real dsh process exit code; nonzero forbids every commit/push")
    ap.add_argument("--day", help="TEST FIXTURES ONLY: YYYY-MM-DD report ownership date")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--include-matrix", action="store_true",
                    help="仅 gsc-feedback lane 使用: 允许提交 .hermes/industry-keyword-matrix.json "
                         "(K3 拍板该文件由 gsc-feedback cron 单独提交)")
    args = ap.parse_args()

    repo = os.path.abspath(args.repo)
    day = args.day or time.strftime("%Y-%m-%d")
    date = time.strftime("%Y-%m-%d %H:%M")
    probe = subprocess.run([GIT, "rev-parse", "--git-dir"], cwd=repo, capture_output=True, text=True)
    if probe.returncode != 0:
        print(f"[lane-git] repo 无效或非 git 仓库: {repo} -> 跳过", file=sys.stderr)
        return 1

    # A failed model run can never be converted into a content/report commit.
    if args.dsh_exit != 0:
        reason = f"dsh exited {args.dsh_exit}; model execution failed before host finalize"
        failure_report = write_failure_report(repo, args.lane, day, "FAILED", reason, args.dsh_exit)
        write_exec_report(args.lane, repo, [], False, date, exit_code=args.dsh_exit,
                          verdict="FAILED(dsh)", blocked_reason=reason,
                          report_path=failure_report, report_auto=True,
                          run_verdict="FAILED", dsh_exit=args.dsh_exit)
        return args.dsh_exit if 0 < args.dsh_exit < 126 else 1

    # dsh=0 is not success without today's own, complete, non-auto report.
    report_path, report_error = validate_lane_report(repo, args.lane, day)
    if report_error:
        failure_report = write_failure_report(repo, args.lane, day, "STALE", report_error, 0)
        write_exec_report(args.lane, repo, [], False, date, exit_code=6,
                          verdict="STALE(invalid or missing same-day report)",
                          blocked_reason=report_error, report_path=failure_report,
                          report_auto=True, run_verdict="STALE", dsh_exit=0)
        return 6

    r = run([GIT, "status", "--porcelain", "-z"], cwd=repo, check=False)
    changed = []
    tokens = r.stdout.split("\0")
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        if not tok:
            i += 1
            continue
        status = tok[:2]
        path = tok[3:]
        if status[0] in ("R", "C") and i + 1 < len(tokens):
            path = tokens[i + 1]
            i += 2
        else:
            i += 1
        if status[0] in ("M", "A", "D", "R", "C", "T", "?") or status[1] in ("M", "A", "D", "T", "U"):
            changed.append(path)

    allowed_paths = list(ALLOWED_PATHS)
    if args.include_matrix:
        allowed_paths.append(".hermes/industry-keyword-matrix.json")
    allowed = []
    for p in changed:
        norm = p.replace("\\", "/")
        if any(norm == x or norm.startswith(x) for x in RUNTIME_ONLY_PATHS):
            continue
        if any(norm.startswith(prefix) or norm == prefix for prefix in allowed_paths):
            allowed.append(norm)
        else:
            print(f"[lane-git] 跳过白名单外改动: {p}")

    if not allowed:
        print(f"[lane-git] {args.lane}: 无可提交改动; 当日报告有效, 写 OK 总线")
        write_exec_report(args.lane, repo, [], False, date, report_path=report_path,
                          run_verdict="OK", dsh_exit=0)
        return 0

    print(f"[lane-git] {args.lane}: 白名单改动 {len(allowed)} 个:")
    for p in allowed:
        print(f"  + {p}")

    enc = run(["node", "scripts/check-encoding.js"], cwd=repo, check=False)
    if enc.returncode != 0:
        reason = "check-encoding failed; no commit or push attempted"
        write_exec_report(args.lane, repo, allowed, False, date, exit_code=3,
                          verdict="FAILED(encoding guard)", blocked_reason=reason,
                          report_path=report_path, run_verdict="FAILED", dsh_exit=0)
        return 3

    if args.dry_run:
        print(f"[lane-git] dry-run: 将 commit {len(allowed)} 文件 (未执行)")
        return 0

    src_files = [p for p in allowed if not p.startswith(".hermes/")]
    report_files = [p for p in allowed if p.startswith(".hermes/logs/") or p.startswith(".hermes/reports/")
                    or (args.include_matrix and p == ".hermes/industry-keyword-matrix.json")]

    if src_files:
        msg = f"cron({args.lane}): lane 产物自动提交 {date}"
        run([GIT, "add", "--"] + src_files, cwd=repo)
        # Pathspec is mandatory: never include unrelated staged human-session work.
        r = run([GIT, "commit", "-m", msg, "--"] + src_files, cwd=repo, check=False)
        if r.returncode != 0 and "nothing to commit" not in r.stdout + r.stderr:
            reason = f"pre-commit guard rejected {len(src_files)} production files; no report commit/push"
            print(f"[lane-git] src commit 被拦: {r.stdout}\n{r.stderr}", file=sys.stderr)
            write_exec_report(args.lane, repo, allowed, False, date, exit_code=4,
                              verdict="FAILED(guard 拦下 src commit)", blocked_reason=reason,
                              report_path=report_path, run_verdict="FAILED", dsh_exit=0)
            return 4
        print(f"[lane-git] src commit 完成: {msg} ({len(src_files)} 文件)")

    if report_files and _commit_reports(repo, args, report_files, date) != 0:
        write_exec_report(args.lane, repo, allowed, False, date, exit_code=4,
                          verdict="FAILED(report commit)", blocked_reason="report commit failed",
                          report_path=report_path, run_verdict="FAILED", dsh_exit=0)
        return 4

    last_push = run([GIT, "log", "origin/main", "-1", "--format=%ct"], cwd=repo, check=False).stdout.strip()
    try:
        gap = int(time.time()) - int(last_push)
    except ValueError:
        gap = 99999
    pushed = False
    if gap < 1800:
        print(f"[lane-git] 距上次 push {gap}s (<30min) -> 本次只 commit 不 push")
    else:
        r = run([GIT, "push", "origin", "main"], cwd=repo, check=False)
        if r.returncode != 0:
            reason = "git push failed; see wrapper log"
            write_exec_report(args.lane, repo, allowed, False, date, exit_code=5,
                              verdict="FAILED(push)", blocked_reason=reason,
                              report_path=report_path, run_verdict="FAILED", dsh_exit=0)
            return 5
        pushed = True
        print("[lane-git] push 完成 -> origin/main 已更新")

    write_exec_report(args.lane, repo, allowed, pushed, date, report_path=report_path,
                      run_verdict="OK", dsh_exit=0)
    return 0


def _commit_reports(repo, args, report_files, date):
    """提交 .hermes 内部报告/数据 (--no-verify)。

    2026-09-19 抽出为独立函数: 原实现内联在 main(), 一旦 src commit 被 guard 拦下就
    return 4, 报告文件永远不提交 (实测 9/19 两份 blog-deepfix 报告至今仍是 untracked)。
    """
    msg = f"cron({args.lane}): lane 报告 {date}"
    run([GIT, "add", "--"] + report_files, cwd=repo)
    # 2026-10-10 修复: 用 pathspec 限定提交范围。`git commit --no-verify -m msg` 会把
    #   **任何**已 staged 的内容一起提交 (不只本次 add 的报告文件) —— 人手会话 staged 的改动、
    #   或上面被门童拦下尚未撤出的生产文件, 都会被顺带带上线。限定 pathspec 后二者都不可能。
    r = run([GIT, "commit", "--no-verify", "-m", msg, "--"] + report_files, cwd=repo, check=False)
    if r.returncode != 0 and "nothing to commit" not in r.stdout + r.stderr:
        print(f"[lane-git] report commit 失败: {r.stdout}\n{r.stderr}", file=sys.stderr)
        return 4
    print(f"[lane-git] report commit 完成 (--no-verify): {msg} ({len(report_files)} 文件)")
    return 0


def idempotency_key(lane, intent, target, day=None):
    """P3-10 幂等键: (intent + target + day) 三元组的稳定哈希 (与 lane-preflight.py 同算法)。

    消费者(执行层)据此判断"这一件事今天是否已处理过"; 命中相同 key 即跳过 -> 幂等铁律可执行化。
    """
    day = day or time.strftime("%Y-%m-%d")
    return hashlib.sha256(f"{lane}|{intent}|{target}|{day}".encode("utf-8")).hexdigest()[:16]


def resolve_idempotency_key(lane, repo):
    """幂等键的**单一来源** = 本轮 preflight 写入的 run-context (2026-10-10 修复, §6-A)。

    缺陷: 两侧各自重组键 —— preflight 用 ("run", "lane-default"), 本脚本收尾用
    ("deliver", <报告路径 或 "lane-default">) -> 同一 lane 同一天必然产出**两个**键,
    契约 §二.2「命中相同 key 即跳过」永远无法命中, 机器判重退化为人工比报告。
    实测 2026-10-10 blog-deepfix: run-context `37eaab37ee14ebaf` vs lane-runs `e5038594dc97fb9f`。

    改为**读取** preflight 已落盘的 this_run_key: 单一权威、两侧恒等, 并顺带消除
    「23:5x 起跑跨午夜 00:0x 收尾」时 day 归属不同导致的第三类分歧。
    读不到 (缺文件/旧格式/取值异常) 时回退到与 preflight 完全相同的调用口径。
    """
    ctx = os.path.join(repo, ".hermes", "logs", f"run-context-{lane}.json")
    try:
        with open(ctx, "r", encoding="utf-8") as fh:
            key = (json.load(fh).get("idempotency") or {}).get("this_run_key")
        if isinstance(key, str) and len(key) == 16:
            return key
    except (OSError, ValueError):
        pass
    return idempotency_key(lane, "run", "lane-default")


def validate_lane_report(repo, lane, day):
    """Accept only today's exact lane report with all four fields and VERDICT: OK.

    AUTO-FILL is inspected only on the machine-readable VERDICT line. A real report
    may discuss an earlier AUTO-FILL incident in its prose without becoming a stub.
    """
    candidates = [f".hermes/logs/{day}-{lane}.md"]
    if lane.startswith("ZP-"):
        candidates.append(f".hermes/logs/{day}-{lane[3:]}.md")
    existing = [(rel, os.path.join(repo, rel)) for rel in candidates if os.path.isfile(os.path.join(repo, rel))]
    if not existing:
        return None, f"missing exact same-day lane report: {' | '.join(candidates)}"
    for rel, path in existing:
        try:
            with open(path, "r", encoding="utf-8", errors="replace") as fh:
                text = fh.read()
        except OSError as e:
            return None, f"lane report unreadable: {type(e).__name__}"
        verdict_line = re.search(r"^[-*\s]*\*?\*?VERDICT\*?\*?:.*$", text, re.MULTILINE)
        auto_fill = (verdict_line and re.search(
            r"VERDICT\*?\*?:\s*\*?\*?(?:STALE|FAILED|BLOCKED|MISSING)\*?\*?\s*[（(]?AUTO-FILL(?:ED)?",
            verdict_line.group(0)))
        if auto_fill:
            continue  # marker follows a failure value; trailing prose on real OK is harmless
        for field in ("VERDICT", "CONSUMED", "DELIVERED", "NEXT"):
            if not re.search(rf"^[-*\s]*\*?\*?{field}\*?\*?:\s*\S.*$", text, re.MULTILINE):
                return None, f"same-day report lacks machine-readable {field}"
        if not re.search(
                r"^[-*\s]*\*?\*?VERDICT\*?\*?:\s*\*?\*?OK\*?\*?(?=\s*$|\s*[—–\-:：()（）])",
                text, re.MULTILINE):
            return None, "same-day report VERDICT is not exactly OK (PARTIAL/BLOCKED/FAILED cannot finalize as OK)"
        return rel, None
    return None, "all same-day lane report candidates are AUTO-FILL failure evidence; no real OK report"


def write_failure_report(repo, lane, day, verdict, reason, dsh_exit):
    """Create separate failure evidence; never displace a real same-day lane report."""
    rel = f".hermes/logs/{day}-{lane}.failure.md"
    path = os.path.join(repo, rel)
    if os.path.exists(path):
        return rel
    stub = (
        f"# {lane} {verdict} (AUTO-FILL)\n\n"
        f"VERDICT: {verdict} (AUTO-FILL)\n"
        f"CONSUMED: host finalize only; dsh_exit={dsh_exit}\n"
        f"DELIVERED: NONE\n"
        f"NEXT: resolve the recorded failure; do not treat this AUTO-FILL as success\n\n"
        f"Reason: {reason}\n"
        f"Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
    )
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(stub)
        return rel
    except OSError:
        return "NONE"


def write_lane_run(record, repo):
    """Append one structured record to the repository-specific results bus."""
    try:
        bus = os.path.join(repo, ".hermes", "logs", "lane-runs.jsonl")
        os.makedirs(os.path.dirname(bus), exist_ok=True)
        with open(bus, "a", encoding="utf-8", newline="\n") as fh:
            fh.write(json.dumps(record, ensure_ascii=False) + "\n")
        print(f"[lane-git] 结果总线已追加: {bus}")
    except (OSError, TypeError) as e:  # noqa: BLE001
        print(f"[lane-git] 结果总线写入失败: {e}", file=sys.stderr)


def write_exec_report(lane, repo, allowed, pushed, date,
                      exit_code=0, verdict="✅ 完成", blocked_reason="",
                      fired_at=None, report_auto=False, dsh_exit=None,
                      run_verdict=None, report_path=None):
    """Append human and machine evidence with explicit, non-inferred verdicts."""
    fired_at = fired_at or time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    report = report_path or "NONE"
    pushed_txt = "✅ push" if pushed else "NO_PUSH"
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

    try:
        head = run([GIT, "rev-parse", "--short", "HEAD"], cwd=repo, check=False).stdout.strip()
    except Exception:  # noqa: BLE001
        head = ""
    final_verdict = run_verdict or ("OK" if exit_code == 0 else "FAILED")
    state = {"OK": "completed", "FAILED": "failed", "BLOCKED": "blocked",
             "STALE": "quarantined"}.get(final_verdict, "failed")
    write_lane_run({
        "run_id": f"{lane}-{time.strftime('%Y%m%dT%H%M%S', time.localtime())}-{os.getpid()}",
        "lane": lane,
        "trigger": "schtasks",
        "fired_at": fired_at,
        "ended_at": now,
        "idempotency_key": resolve_idempotency_key(lane, repo),
        "key_consumed": final_verdict == "OK",
        "dsh_exit": dsh_exit,
        "wrapper_exit": exit_code,
        "verdict": final_verdict,
        "state": state,
        "blocked_reason": blocked_reason,
        "guard": {"ok": exit_code not in (3, 4)},
        "report": report,
        "report_auto_generated": bool(report_auto),
        "files": files,
        "pushed": bool(pushed),
        "head": head,
        "source": "lane-git-commit.py",
    }, repo)


if __name__ == "__main__":
    sys.exit(main())
