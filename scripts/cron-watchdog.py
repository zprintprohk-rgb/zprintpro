#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/cron-watchdog.py -- 车道存活看门狗 v2 (K3 v9.4 §五 2026-09-13 建 / 2026-09-19 改正判据)

v2 为什么改 (K3 2026-09-19 指令「定时任务结果要给 deepseek 执行任务做依据」):
  v1 只做一件事: 看 .hermes/logs 里「本车道报告文件的最新 mtime」是否在期望间隔内。三个失效点:
    ① 9/17 全档复制把 2026-09-1x 报告的 mtime 统一刷成 2026-09-17 13:31:55 -> mtime 不再是新鲜度证据;
    ② 9/17 21:17 daily-content lane 在已删除的 worktree 空转 4 分钟零产出, v1 却拿 9/16 旧报告判 [OK];
    ③ 只在「文件太旧」时告警, 完全不看 wrapper exit / 当日有无真实产出 / 调度器 LastTaskResult。
  v2 改为**四方对账** (调度器 + 结果总线 lane-runs.jsonl + wrapper 原始日志 + 本车道当日报告文件),
  实现委托 scripts/lane-status.mjs (verdict: OK/MISSING/FAILED/BLOCKED/STALE/PENDING), 并额外检查
  .hermes/locks/lane.lock 是否留下陈旧锁。

调度: Task Scheduler ZP-cron-watchdog (每天 06:43 Asia/Shanghai)。
退出码: 0 = 无新问题 (或告警去重后无新增) / 1 = 有新告警 / 3 = 对账器不可用
"""
import glob
import json
import os
import subprocess
import sys
import time

try:  # 根治 Windows 控制台 GBK 崩 (v9.4 §三-1)
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:  # noqa: BLE001
    pass

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGS = os.path.join(REPO, ".hermes", "logs")
REPORTS = os.path.join(REPO, ".hermes", "reports")
ALERT = os.path.join(LOGS, "cron-watchdog-alerts.md")
STATUS_JSON = os.path.join(LOGS, "lane-status.json")
LOCK = os.path.join(REPO, ".hermes", "locks", "lane.lock")
LOCK_STALE_SECONDS = 3600
WINDOW_DAYS = 8  # 覆盖 daily(每日) + weekly(周五/周六靠窗口边界) + monthly(靠 problems/未触发判定)

# v1 的 mtime 口径保留为**兜底参考**(仅当对账器不可用时打印, 不再作为判据)
FALLBACK_LANES = [
    ("ZP-daily-content", [os.path.join(LOGS, "*-daily-content.md"), os.path.join(REPORTS, "daily-content-*.md")], 26),
    ("ZP-gsc-feedback", [os.path.join(LOGS, "*-gsc-feedback.md"), os.path.join(REPORTS, "gsc-feedback-*.md")], 26),
    ("ZP-weekly-meta", [os.path.join(REPORTS, "weekly-meta-*.md"), os.path.join(LOGS, "*-weekly-meta.md")], 8 * 24),
    ("ZP-blog-deepfix", [os.path.join(REPORTS, "blog-deepfix-*.md"), os.path.join(LOGS, "*-blog-deepfix.md")], 8 * 24),
    ("ZP-monthly-matrix", [os.path.join(REPORTS, "monthly-matrix-*.md"), os.path.join(LOGS, "*-monthly-matrix-audit.md")], 32 * 24),
]


def run_lane_status():
    """调用结果总线对账器 (node scripts/lane-status.mjs), 返回 (dict|None, stderr-ish str)"""
    try:
        r = subprocess.run(["node", "scripts/lane-status.mjs", f"--days={WINDOW_DAYS}", "--quiet"],
                           cwd=REPO, capture_output=True, text=True, timeout=180)
        if r.returncode not in (0, 1):
            return None, f"lane-status.mjs exit={r.returncode}: {(r.stderr or '').strip()[:200]}"
    except (OSError, subprocess.SubprocessError) as e:  # noqa: BLE001
        return None, f"lane-status.mjs 调用失败: {e}"
    try:
        with open(STATUS_JSON, "r", encoding="utf-8") as fh:
            return json.load(fh), ""
    except (OSError, ValueError) as e:  # noqa: BLE001
        return None, f"lane-status.json 读取失败: {e}"


def fallback_mtime_rows():
    rows = []
    for name, pats, limit_h in FALLBACK_LANES:
        best = None
        for pat in pats:
            for f in glob.glob(pat):
                try:
                    m = os.path.getmtime(f)
                except OSError:
                    continue
                if best is None or m > best[0]:
                    best = (m, f)
        if best is None:
            rows.append(f"  [????] {name}: 无报告文件")
            continue
        age_h = (time.time() - best[0]) / 3600.0
        rows.append(f"  [{'OK  ' if age_h <= limit_h else 'FAIL'}] {name}: mtime {os.path.basename(best[1])} "
                    f"({age_h:.1f}h 前, 上限 {limit_h}h) [仅兜底参考, mtime 已失真 2026-09-17]")
    return rows


def check_stale_lock():
    """陈旧锁 = lane 崩溃/被 kill 后残留, 会挡住后续所有车道"""
    try:
        with open(LOCK, "r", encoding="utf-8") as fh:
            cur = json.load(fh)
    except (OSError, ValueError):
        return None
    age = time.time() - float(cur.get("acquired_ts") or 0)
    if age > LOCK_STALE_SECONDS:
        return (f"- **锁残留**: `.hermes/locks/lane.lock` 由 `{cur.get('lane')}` 持有 "
                f"**{age / 3600:.1f}h** (pid={cur.get('pid')}, acquired {cur.get('acquired_at')}) "
                f"-> 超过 {LOCK_STALE_SECONDS}s 视为陈旧, 后续车道可夺; 若持续残留请人工清理")
    return None


def write_exec_line(status_txt, detail):
    rep = os.path.join(LOGS, "cron-execution-report.md")
    ts = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    line = (f"| {ts} | ZP-cron-watchdog | {status_txt} | `cron-watchdog-alerts.md` (告警时才写) | "
            f"{detail} | — |\n")
    try:
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
        print(f"[watchdog] 执行报告已追加: {rep}")
    except OSError as e:
        print(f"[watchdog] 执行报告写入失败: {e}", file=sys.stderr)


def main():
    now = time.time()
    print("== 车道对账看门狗 (v2 四方对账: 调度器/总线/日志/当日报告, K3 2026-09-19) ==")
    alerts = []

    status, err = run_lane_status()
    if status is None:
        print(f"[watchdog] 对账器不可用 -> {err}", file=sys.stderr)
        print("  兜底 mtime 视图 (不作判据):")
        for r in fallback_mtime_rows():
            print(r)
        alerts.append(f"- **对账器不可用**: {err} -> 本日无法机器判定车道结果, 需人工检查 "
                      f"`scripts/lane-status.mjs` 是否可执行 (node 缺失?)")

    detail = "—"
    if status:
        lanes = status.get("lanes", [])
        rows = []
        for l in lanes:
            last = (l.get("days") or [None])[-1]
            v = last.get("status") if last else "UNKNOWN"
            rep = (last or {}).get("report")
            rows.append(f"  [{(v if v in ('OK',) else 'FAIL'):<8}] {l.get('task')}: "
                        f"{last.get('day') if last else '-'} {v} "
                        f"report={os.path.basename(rep) if rep else 'NONE'}")
        for r in rows:
            print(r)
        print(f"  总线记录 {status.get('bus_records')} 条 · 窗口 {status.get('window_days')} 天 · "
              f"verdict={status.get('verdict')}")
        detail = " | ".join(
            f"{(l.get('days') or [{}])[-1].get('status', 'UNKNOWN')} {l.get('task')}" for l in lanes
        ) or "—"
        for p in status.get("problems", []):
            alerts.append(f"- **车道结果异常**: {p} -> 见 `.hermes/logs/lane-status.md` 逐 lane 明细")

    lock_alert = check_stale_lock()
    if lock_alert:
        alerts.append(lock_alert)
        print(lock_alert)

    status_txt = "✅ 通过" if not alerts else f"⚠️ {len(alerts)} 条告警"
    write_exec_line(status_txt, detail)

    if not alerts:
        print("\n[PASS] 四方对账无异常 (无 MISSING/FAILED/BLOCKED/STALE, 无锁残留)")
        return 0

    os.makedirs(LOGS, exist_ok=True)
    ts = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    # 去重: 同一条告警文本已存在则不重复追加 (历史欠账不刷屏; 文件仍是 K3 每周复盘的单一事实源)
    prev = ""
    try:
        with open(ALERT, "r", encoding="utf-8") as fh:
            prev = fh.read()
    except OSError:
        pass
    fresh = [a for a in alerts if a not in prev]
    if not fresh:
        print("\n[PASS] 告警均为历史已记录项 (去重后无新增), 文件未追加")
        return 0
    with open(ALERT, "a", encoding="utf-8", newline="\n") as fh:
        fh.write(f"\n## {ts} 车道对账告警\n\n")
        fh.write("\n".join(fresh) + "\n")
    print(f"\n[FAIL] {len(fresh)} 条新告警 -> 已追加 {ALERT}")
    for a in fresh:
        print("  " + a)
    return 1


if __name__ == "__main__":
    sys.exit(main())
