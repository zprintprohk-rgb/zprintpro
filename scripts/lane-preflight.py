#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/lane-preflight.py -- lane 前置检查 + 互斥锁 + 结果回喂 (K3 2026-09-19 指令)

定位 (为什么存在):
  1. 9/17 daily-content lane 在【已删除的 worktree】里空找 4 分钟, 零产出, 却 exit=0 ->
     Task Scheduler Result=0 -> 看门狗旧实现判 [OK]。前置检查把这类空转挡在调用 dsh 之前。
  2. 9/19 blog-deepfix lane (05:37-05:49) 与人手会话 (05:41 起) 并发改写同一文件
     src/data/blog-data/zh-hk.json -> 产生坏版。互斥锁 (.hermes/locks/lane.lock) 是根治手段。
  3. K3 2026-09-19: 「定时任务结果是要给 deepseek 执行任务的数据依据和支撑的」->
     本脚本把上一轮结果 + 其他车道当日动作 + 待重做项, 汇成 .hermes/logs/run-context-<lane>.json,
     由 wrapper 作为**第一句话**喂给本轮 dsh (先读结果, 再决定今天干什么)。

用法 (wrapper 内调用):
  python scripts/lane-preflight.py --lane ZP-blog-deepfix --repo F:\\zprintpro-nextjs --acquire
  python scripts/lane-preflight.py --lane ZP-blog-deepfix --release
退出码:
  0 = 可以开工 (--acquire 时锁已持有) ; 10 = 前置检查不过 (禁止调用 dsh) ;
  11 = 已被占用 (同 repo 有另一条 lane 持锁) ; 2 = 参数/环境错误
"""

import argparse
import glob
import json
import os
import subprocess
import sys
import time

try:  # Windows 控制台 GBK 崩根治 (同 cron-watchdog.py v9.4 教训)
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:  # noqa: BLE001
    pass

REPO_DEFAULT = r"F:\zprintpro-nextjs"
LOCK_STALE_SECONDS = 3600          # 超过 = 陈旧锁, 可夺 (与 lane 墙钟上限 3600s 对齐)
BUS = "lane-runs.jsonl"


def read_json(path, fallback=None):
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, ValueError):
        return fallback


def write_json(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(obj, fh, ensure_ascii=False, indent=2)
        fh.write("\n")


def append_bus(repo, record):
    p = os.path.join(repo, ".hermes", "logs", BUS)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "a", encoding="utf-8", newline="\n") as fh:
        fh.write(json.dumps(record, ensure_ascii=False) + "\n")


def newest_report(repo, lane):
    """本车道当日报告: 口径强制 <YYYY-MM-DD>-<lane>.md; 剔除第三方报告 (如 cron-watchdog-alerts.md)。"""
    logs = os.path.join(repo, ".hermes", "logs")
    lane_suffix = lane.replace("ZP-", "")
    cands = []
    for pat in (os.path.join(logs, f"*-{lane_suffix}.md"), os.path.join(logs, f"*-{lane}.md")):
        cands += glob.glob(pat)
    if not cands:
        return None, []
    # 只要文件名里含日期 token 的 (无日期的第三方文件不认)
    cands = [c for c in cands if len(os.path.basename(c)) >= 10 and os.path.basename(c)[:4].isdigit()]
    if not cands:
        return None, []
    cands.sort(key=lambda f: (os.path.basename(f)[:10], os.path.getmtime(f)), reverse=True)
    files = []
    rep = cands[0]
    try:
        with open(rep, "r", encoding="utf-8", errors="replace") as fh:
            for line in fh:
                if line.startswith("DELIVERED:"):
                    files = [x.strip() for x in line.split(":", 1)[1].split(",") if x.strip() and x.strip() != "NONE"]
                    break
    except OSError:
        pass
    return os.path.relpath(rep, repo).replace("\\", "/"), files


def last_run_record(repo, lane):
    p = os.path.join(repo, ".hermes", "logs", BUS)
    last = None
    try:
        with open(p, "r", encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                try:
                    rec = json.loads(line)
                except ValueError:
                    continue
                if rec.get("lane") == lane and not rec.get("test_record"):
                    last = rec
    except OSError:
        pass
    return last


def check_repo(repo):
    """① 目录存在 ② 是 git worktree ③ 分支 = main"""
    if not os.path.isdir(repo):
        return False, f"repo 目录不存在: {repo}"
    if not os.path.isdir(os.path.join(repo, ".git")) and not os.path.isfile(os.path.join(repo, ".git")):
        return False, f"{repo} 不是 git worktree (.git 缺失)"
    for f in ("src/data/products.ts", "src/data/blog-data", "package.json"):
        if not os.path.exists(os.path.join(repo, f)):
            return False, f"仓库结构不完整, 缺 {f} (疑似空 worktree -> 9/17 空转同类风险)"
    try:
        r = subprocess.run(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=repo,
                           capture_output=True, text=True, timeout=20)
        branch = (r.stdout or "").strip()
    except (OSError, subprocess.SubprocessError) as e:  # noqa: BLE001
        return False, f"git 不可用: {e}"
    if r.returncode != 0:
        return False, "git rev-parse 失败 (仓库损坏?)"
    if branch != "main":
        return False, f"当前分支 {branch} != main (生产车道只允许在 main 上跑)"
    return True, f"repo OK, branch={branch}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lane", required=True)
    ap.add_argument("--repo", default=REPO_DEFAULT)
    ap.add_argument("--acquire", action="store_true", help="执行前置检查并抢锁")
    ap.add_argument("--release", action="store_true", help="释放锁 (wrapper 收尾)")
    args = ap.parse_args()

    repo = args.repo
    lock_path = os.path.join(repo, ".hermes", "locks", "lane.lock")
    ctx_path = os.path.join(repo, ".hermes", "logs", f"run-context-{args.lane}.json")

    # ---------------- release ----------------
    if args.release:
        try:
            cur = read_json(lock_path)
            if cur and cur.get("lane") == args.lane:
                os.remove(lock_path)
                print(f"[preflight] 锁已释放: {lock_path}")
            elif cur:
                print(f"[preflight] 锁属于 {cur.get('lane')}, 本 lane 不释放", file=sys.stderr)
            else:
                print("[preflight] 无锁, 无需释放")
        except OSError as e:
            print(f"[preflight] 释放锁失败: {e}", file=sys.stderr)
        return 0

    # ---------------- acquire (前置检查 + 抢锁 + 写上下文) ----------------
    now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    checks = []

    ok, msg = check_repo(repo)
    checks.append({"name": "repo_worktree_branch", "ok": ok, "detail": msg})
    blocked = None if ok else msg

    # 锁检查 (陈旧可夺)
    lock_holder = None
    cur_lock = read_json(lock_path)
    if cur_lock:
        age = time.time() - float(cur_lock.get("acquired_ts") or 0)
        if age <= LOCK_STALE_SECONDS and cur_lock.get("lane") != args.lane:
            lock_holder = cur_lock
            checks.append({"name": "lock_free", "ok": False,
                           "detail": f"{cur_lock.get('lane')} 持锁 {age / 60:.1f} min (pid={cur_lock.get('pid')})"})
            blocked = blocked or f"锁被 {cur_lock.get('lane')} 持有 ({age / 60:.1f} min)"
        else:
            checks.append({"name": "lock_free", "ok": True,
                           "detail": f"陈旧锁 (age {age / 60:.1f} min) 或本 lane 持有 -> 可夺"})
    else:
        checks.append({"name": "lock_free", "ok": True, "detail": "无锁"})

    # 上一轮状态 (来自总线)
    prev = last_run_record(repo, args.lane)
    prev_report, prev_files = newest_report(repo, args.lane)
    checks.append({"name": "prev_run_known", "ok": prev is not None,
                   "detail": (f"总线最近记录 verdict={prev.get('verdict')} @ {prev.get('ended_at')}"
                              if prev else "总线无本车道记录 (可能是首次/总线刚启用) -> 以报告文件为准")})

    # 结果总线汇总 (lane-status.json) — 若不存在, 现场生成
    status_path = os.path.join(repo, ".hermes", "logs", "lane-status.json")
    status = read_json(status_path)
    if not status:
        try:
            subprocess.run(["node", "scripts/lane-status.mjs", "--days=7", "--quiet"],
                           cwd=repo, capture_output=True, text=True, timeout=120)
        except (OSError, subprocess.SubprocessError):
            pass
        status = read_json(status_path)
    checks.append({"name": "lane_status_available", "ok": status is not None,
                   "detail": (f"verdict={status.get('verdict')} problems={len(status.get('problems') or [])}"
                              if status else "lane-status.json 不可读 (node/脚本缺失?)")})

    # 今日兄弟车道动作 (跨车道避让: 防 9/19 同文件撞车)
    today = time.strftime("%Y-%m-%d")
    siblings = []
    if status:
        for l in status.get("lanes", []):
            if l.get("task") == args.lane:
                continue
            last = (l.get("days") or [{}])[-1]
            if last.get("day") == today:
                siblings.append({"lane": l.get("task"), "status": last.get("status"),
                                 "report": last.get("report"), "start": l.get("start")})
            elif l.get("lastWrapperRun", {}) and str(l["lastWrapperRun"].get("start", "")).startswith(today):
                siblings.append({"lane": l.get("task"), "status": "ran-today",
                                 "report": None, "start": l.get("start")})

    # 待重做队列 (由上一轮 verdict 推导)
    retry = []
    if prev:
        v = prev.get("verdict")
        if v in ("FAILED", "BLOCKED", "STALE", "PARTIAL"):
            retry.append({"kind": "RETRY_OF", "run_id": prev.get("run_id"),
                          "reason": prev.get("blocked_reason") or v,
                          "candidate_files": prev.get("files") or []})
    if status:
        for l in status.get("lanes", []):
            if l.get("task") != args.lane:
                continue
            for d in l.get("days", []):
                if d.get("status") in ("FAILED", "BLOCKED", "STALE") and d.get("day") >= today[:8] + "01":
                    retry.append({"kind": "UNRESOLVED_DAY", "day": d["day"], "status": d["status"],
                                  "notes": d.get("notes") or []})

    # 抢锁 (前置检查通过才抢)
    lock_info = None
    if not blocked:
        lock_info = {"lane": args.lane, "pid": os.getpid(), "acquired_at": now,
                     "acquired_ts": time.time(), "host": os.environ.get("COMPUTERNAME", "")}
        write_json(lock_path, lock_info)
        checks.append({"name": "lock_acquired", "ok": True, "detail": lock_path})
    else:
        checks.append({"name": "lock_acquired", "ok": False, "detail": "前置检查未过, 未抢锁"})

    ctx = {
        "lane": args.lane,
        "generated_at": now,
        "repo": repo,
        "contract": ".hermes/cron-prompts/lane-results-bus-contract.md",
        "preflight": {"verdict": "blocked" if blocked else "ok",
                      "blocked_reason": blocked or "",
                      "checks": checks},
        "lock": lock_info,
        "previous_run": {
            "bus_record": prev,
            "latest_report": prev_report,
            "delivered_files_from_report": prev_files,
        },
        "sibling_lanes": siblings,
        "retry_queue": retry,
        "instructions_to_lane": [
            "先读本文件与 .hermes/logs/lane-status.json, 再决定今天做什么 (契约第 -1 优先级)",
            "retry_queue 非空时优先重做其中的未完成项, 报告首段写 RETRY_OF(<run_id>)",
            "sibling_lanes 里今日已改过的文件, 本轮不得再次改写 (跨车道避让, 防撞车)",
            "报告名 <YYYY-MM-DD>-<lane>.md, 首段必含 VERDICT/CONSUMED/DELIVERED/NEXT 四行",
        ],
    }
    write_json(ctx_path, ctx)
    print(f"[preflight] 上下文已写: {ctx_path}")
    print(f"[preflight] verdict={ctx['preflight']['verdict']} lock={bool(lock_info)} "
          f"retry={len(retry)} siblings={len(siblings)}")
    for c in checks:
        print(f"  [{'OK  ' if c['ok'] else 'FAIL'}] {c['name']}: {c['detail']}")

    if blocked:
        append_bus(repo, {
            "run_id": f"{args.lane}-{time.strftime('%Y%m%dT%H%M%S', time.localtime())}",
            "lane": args.lane, "trigger": "schtasks", "phase": "preflight",
            "ended_at": now, "verdict": "BLOCKED", "blocked_reason": blocked,
            "guard": {"ok": True}, "pushed": False, "source": "lane-preflight.py",
        })
        print(f"\n[preflight] BLOCKED -> 禁止调用 dsh: {blocked}", file=sys.stderr)
        return 10
    if lock_holder:
        return 11
    return 0


if __name__ == "__main__":
    sys.exit(main())
