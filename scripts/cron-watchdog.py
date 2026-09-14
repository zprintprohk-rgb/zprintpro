#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/cron-watchdog.py — 车道静默看门狗 (K3 v9.4 §五, 2026-09-13)

用途: 每天 06:43 (闲时窗口 19:00-07:00 尾段) 校验 5 条车道的报告 mtime 是否在期望间隔内,
      超期即在 .hermes/logs/cron-watchdog-alerts.md 追加告警行并 exit 1 → 24h 内暴露静默停摆。
依据: K3 2026-09-13 19:39/19:43 拍板 (改派 deepseek harness + 闲时铁律) + 9/7-9/13 六天静默事故
"""
import os
import sys
import glob
import time

try:  # 根治 Windows 控制台 GBK 崩 (v9.4 §三-1)
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGS = os.path.join(REPO, ".hermes", "logs")
REPORTS = os.path.join(REPO, ".hermes", "reports")
ALERT = os.path.join(LOGS, "cron-watchdog-alerts.md")

# 车道 → (报告 glob, 期望间隔小时)
LANES = [
    ("ZP-daily-content", [os.path.join(LOGS, "*-daily-content.md")], 26),
    ("ZP-gsc-feedback", [os.path.join(LOGS, "*-gsc-feedback.md")], 26),
    ("ZP-weekly-meta", [os.path.join(REPORTS, "weekly-meta-*.md"), os.path.join(LOGS, "*-weekly-meta.md")], 8 * 24),
    ("ZP-blog-deepfix", [os.path.join(REPORTS, "blog-deepfix-*.md"), os.path.join(LOGS, "*-blog-deepfix.md")], 8 * 24),
    ("ZP-monthly-matrix", [os.path.join(REPORTS, "monthly-matrix-*.md"), os.path.join(LOGS, "*-monthly-matrix.md")], 32 * 24),
]


def newest(pattern_list):
    best = None
    for pat in pattern_list:
        for f in glob.glob(pat):
            try:
                m = os.path.getmtime(f)
            except OSError:
                continue
            if best is None or m > best[0]:
                best = (m, f)
    return best


def main():
    now = time.time()
    alerts = []
    print("== 车道存活校验 (闲时窗口尾段 watchdog) ==")
    for name, pats, limit_h in LANES:
        hit = newest(pats)
        if not hit:
            alerts.append(f"- {name}: **无任何报告文件** (期望 {limit_h}h 内有产出)")
            print(f"  ❌ {name}: 无报告")
            continue
        age_h = (now - hit[0]) / 3600.0
        ok = age_h <= limit_h
        print(f"  {'✅' if ok else '❌'} {name}: 最近报告 {os.path.basename(hit[1])} ({age_h:.1f}h 前, 上限 {limit_h}h)")
        if not ok:
            alerts.append(
                f"- {name}: 最近报告 `{os.path.basename(hit[1])}` 已是 **{age_h:.1f}h** 前 (上限 {limit_h}h) → 疑似静默停摆"
            )

    if not alerts:
        print("\n[PASS] 5 条车道均在期望间隔内")
        return 0

    os.makedirs(LOGS, exist_ok=True)
    ts = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(now))
    with open(ALERT, "a", encoding="utf-8") as fh:
        fh.write(f"\n## {ts} 静默告警\n\n")
        fh.write("\n".join(alerts) + "\n")
    print(f"\n[FAIL] {len(alerts)} 条车道超期 → 已追加告警到 {ALERT}")
    for a in alerts:
        print("  " + a)
    return 1


if __name__ == "__main__":
    sys.exit(main())
