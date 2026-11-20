#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/cron-watchdog.py -- 车道静默看门狗 (K3 v9.4 §五, 2026-09-13)

用途: 每天 06:43 (闲时窗口 19:00-07:00 尾段) 校验 5 条车道的报告 mtime 是否在期望间隔内,
      超期即在 .hermes/logs/cron-watchdog-alerts.md 追加告警并 exit 1 -> 第二次静默事故
      在 24h 内暴露, 而不是等 6 天才发现 (9/7-9/13 事故教训)。
依据: K3 2026-09-13 19:39/19:43 拍板 (改派 deepseek harness + 闲时铁律) + 9/7-9/13 六天静默事故。
调度: Task Scheduler ZP-cron-watchdog (schtasks, 每天 06:43 Asia/Shanghai)。
"""
import glob
import os
import sys
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

# 车道 -> (报告 glob 列表, 期望间隔小时)
# 报告文件名口径来源: v7 payload 的落盘路径 + 2026-09-13 实测的 .hermes/logs 既有文件名。
LANES = [
    ("ZP-daily-content", [
        os.path.join(LOGS, "*-daily-content.md"),
        os.path.join(LOGS, "*-daily-content-cron.md"),
        os.path.join(REPORTS, "daily-content-*.md"),
    ], 26),
    ("ZP-gsc-feedback", [
        os.path.join(LOGS, "*-gsc-feedback.md"),
        os.path.join(REPORTS, "gsc-feedback-*.md"),
    ], 26),
    ("ZP-weekly-meta", [
        os.path.join(REPORTS, "weekly-meta-*.md"),
        os.path.join(LOGS, "*-weekly-meta.md"),
    ], 8 * 24),
    ("ZP-blog-deepfix", [
        os.path.join(REPORTS, "blog-deepfix-*.md"),
        os.path.join(LOGS, "*-blog-deepfix.md"),
        os.path.join(LOGS, "blog-deepfix-*.md"),
    ], 8 * 24),
    ("ZP-monthly-matrix", [
        os.path.join(REPORTS, "monthly-matrix-*.md"),
        os.path.join(LOGS, "*-monthly-matrix.md"),
        os.path.join(LOGS, "*-monthly-matrix-audit.md"),
    ], 32 * 24),
]

# 车道最早武装时刻 (K3 v9.4 签发 2026-09-13 20:10): 在此之前的缺失不算静默。
# 根因: autoclaw 侧 5 实体从未创建 = 触发层真空 6 天, 历史缺失是「没有触发器」的后果,
# 不是新故障; 武装后若仍旧缺失 = 真静默, 必须告警。
ARMED_AT = time.mktime((2026, 9, 13, 20, 10, 0, 0, 0, -1))
GRACE_HOURS = 26  # 武装后首个周期 (daily 车道 26h) 内不报缺失


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
    since_armed_h = (now - ARMED_AT) / 3600.0
    post_arm = since_armed_h > GRACE_HOURS  # 已过首周期 -> 缺失即真故障
    alerts = []
    rows = []

    print("== 车道存活校验 (闲时窗口尾段 watchdog, K3 v9.4) ==")
    print(f"   武装时刻: 2026-09-13 20:10 | 距武装 {since_armed_h:.1f}h | 缺失判定: "
          f"{'严格(首周期已过)' if post_arm else '宽容(武装首周期内)'}")
    for name, pats, limit_h in LANES:
        hit = newest(pats)
        if not hit:
            if post_arm:
                alerts.append(f"- {name}: **无任何报告文件** (期望 {limit_h}h 内有产出, 已过武装首周期) -> 疑似静默停摆")
                rows.append(f"  [FAIL] {name}: 无报告")
            else:
                rows.append(f"  [WAIT] {name}: 无报告 (武装首周期内, 待 21:17 首发)")
            continue
        age_h = (now - hit[0]) / 3600.0
        ok = age_h <= limit_h
        rows.append(f"  {'[OK]  ' if ok else '[FAIL]'} {name}: 最近报告 {os.path.basename(hit[1])} "
                    f"({age_h:.1f}h 前, 上限 {limit_h}h)")
        if not ok:
            alerts.append(
                f"- {name}: 最近报告 `{os.path.basename(hit[1])}` 已是 **{age_h:.1f}h** 前 "
                f"(上限 {limit_h}h) -> 疑似静默停摆"
            )
    for r in rows:
        print(r)

    if not alerts:
        print(f"\n[PASS] 5 条车道均在期望间隔内 (无告警)")
        return 0

    os.makedirs(LOGS, exist_ok=True)
    ts = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(now))
    day = time.strftime("%Y-%m-%d", time.localtime(now))
    # 去重: 同一天内同一车道的同一告警只追加一次, 避免历史欠账 (weekly/blog 未触发前)
    # 每天重复刷屏; 文件仍是 K3 每周复盘的单一事实源。
    prev = ""
    try:
        prev = open(ALERT, "r", encoding="utf-8").read()
    except OSError:
        pass
    fresh = [a for a in alerts if a not in prev]
    if not fresh:
        print(f"\n[PASS] 告警均为当天已记录项 (去重后无新增), 文件未追加")
        return 0
    with open(ALERT, "a", encoding="utf-8") as fh:
        fh.write(f"\n## {ts} 静默告警\n\n")
        fh.write("\n".join(fresh) + "\n")
    print(f"\n[FAIL] {len(fresh)} 条车道超期 -> 已追加告警到 {ALERT}")
    for a in fresh:
        print("  " + a)
    return 1


if __name__ == "__main__":
    sys.exit(main())
