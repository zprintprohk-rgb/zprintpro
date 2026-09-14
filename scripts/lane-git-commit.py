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
import os
import subprocess
import sys
import time

try:  # 根治 Windows 控制台 GBK 崩 (v9.4 §三-1)
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

MAIN_REPO = "F:/zprintpro-main-tmp"
GIT = "git"

# lane 允许提交的路径 (白名单: 只提交 lane 真正会改的生产文件 + 报告)
# 排除: .hermes/*.cjs 工具/备份/回滚 (一次性诊断工具, 不属 lane 产物)
ALLOWED_PATHS = [
    "src/data/blog-data/",
    "src/data/blog-posts.ts",
    "src/data/products.ts",
    "src/data/sku-seo-data.ts",
    "src/app/[locale]/blog/[slug]/page.tsx",
    "src/lib/",
    ".hermes/industry-keyword-matrix.json",
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
    allowed = []
    for p in changed:
        norm = p.replace("\\", "/")
        if any(norm.startswith(prefix) or norm == prefix for prefix in ALLOWED_PATHS):
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

    # 4) commit (lane 专用消息)
    date = time.strftime("%Y-%m-%d %H:%M")
    msg = f"cron({args.lane}): lane 产物自动提交 {date}"
    run([GIT, "add", "--"] + allowed, cwd=repo)
    r = run([GIT, "commit", "-m", msg], cwd=repo, check=False)
    if r.returncode != 0 and "nothing to commit" not in r.stdout + r.stderr:
        print(f"[lane-git] commit 失败: {r.stdout}\n{r.stderr}", file=sys.stderr)
        return 4
    print(f"[lane-git] commit 完成: {msg}")

    # 5) push (host 侧, SSH 已认证)
    r = run([GIT, "push", "origin", "main"], cwd=repo, check=False)
    if r.returncode != 0:
        print(f"[lane-git] push 失败: {r.stdout}\n{r.stderr}", file=sys.stderr)
        return 5
    print("[lane-git] push 完成 -> origin/main 已更新")
    return 0


if __name__ == "__main__":
    sys.exit(main())
