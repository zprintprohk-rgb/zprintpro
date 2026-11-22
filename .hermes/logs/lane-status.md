# 定时任务状态 (lane-status)

> 生成: 2026-11-22 16:28 · 触发层: Windows Task Scheduler `\ZP-*` → `.hermes/cron-run/*.cmd` → `dsh --profile headless`
> 结构记录来源: `.hermes/logs/lane-runs.jsonl` (143 条真实记录, 逐步接入中) · 兜底证据: wrapper 原始日志 `.hermes/logs/cron-ZP-*.log`
> SSoT: `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`
> **verdict: ATTENTION** — ZP-gsc-feedback 2026-11-22 -> STALE ; ZP-weekly-meta 2026-11-20 -> FAILED ; ZP-blog-deepfix 2026-11-21 -> MISSING ; ZP-blog-deepfix scheduler LastTaskResult=2147946720 ; ZP-monthly-matrix scheduler LastTaskResult=2147946720 ; ZP-k3-review 2026-11-22 -> MISSING ; ZP-k3-review scheduler LastTaskResult=2147946720

| lane | 触发 | 近 7 天逐日 verdict | state | 最近报告 | 调度器 LastRun / Result / Next | 证据日志 |
|------|------|----------------------|-------|----------|-------------------------------|----------|
| ZP-daily-content | DAILY 21:17 | 11-16:OK 11-17:OK 11-18:FAILED 11-19:OK 11-20:PARTIAL 11-21:MISSING 11-22:PENDING | pending | `2026-11-20-ZP-daily-content.md` (2026-11-20) | 2026-11-20 21:17:01 / 0 / 2026-11-22 21:17:00 | `.hermes/logs/cron-ZP-daily-content.log` |
| ZP-gsc-feedback | DAILY 20:13 | 11-16:MISSING 11-17:MISSING 11-18:FAILED 11-19:FAILED 11-20:PARTIAL 11-21:PARTIAL 11-22:STALE | quarantined | `2026-11-21-ZP-gsc-feedback.md` (2026-11-21) | 2026-11-21 20:13:01 / 0 / 2026-11-22 20:13:00 | `.hermes/logs/cron-ZP-gsc-feedback.log` |
| ZP-weekly-meta | WEEKLY FRI 20:52 | 11-20:FAILED | failed | `2026-11-20-ZP-weekly-meta.md` (2026-11-20) | 2026-11-20 20:52:00 / 0 / 2026-11-27 20:52:00 | `.hermes/logs/cron-ZP-weekly-meta.log` |
| ZP-blog-deepfix | WEEKLY SAT 23:47 | 11-21:MISSING | blocked | `2026-11-07-ZP-blog-deepfix.md` (2026-11-07) | 2026-11-15 18:25:40 / 2147946720 / 2026-11-28 23:47:00 | `.hermes/logs/cron-ZP-blog-deepfix.log` |
| ZP-monthly-matrix | MONTHLY 1 12:13 | — | pending | `2026-10-10-ZP-monthly-matrix.md` (2026-10-10) | 2026-11-01 17:42:14 / 2147946720 / 2026-12-01 12:13:00 | `—` |
| ZP-k3-review | DAILY 07:10 | 11-16:MISSING 11-17:MISSING 11-18:MISSING 11-19:MISSING 11-20:MISSING 11-21:MISSING 11-22:MISSING | blocked | `2026-11-13-ZP-k3-review.md` (2026-11-13) | 2026-11-21 08:03:15 / 2147946720 / 2026-11-23 07:10:00 | `.hermes/logs/cron-ZP-k3-review.log` |

## 恢复分类 (recovery_plan — 下一步该干什么)

| lane | state | 动作 | 原因 | 证据/命令 | 建议重试 |
|------|-------|------|------|-----------|----------|
| ZP-gsc-feedback | quarantined | `retry` | 跑过但无当日报告 (空转/零产出) | `.hermes/logs/cron-ZP-gsc-feedback.log` | 下轮自然重跑 |
| ZP-weekly-meta | failed | `retry` | dsh/wrapper 退出码 0 | `.hermes/logs/cron-ZP-weekly-meta.log` | 下轮自然重跑 |
| ZP-blog-deepfix | blocked | `request_human` | 触发点已过但无任何 run 记录 (调度器/执行器未装载) | `Get-ScheduledTask -TaskName ZP-blog-deepfix | Get-ScheduledTaskInfo` | 需人处理 |
| ZP-monthly-matrix | pending | `request_human` | 窗口内无应触发日, 但调度器 LastTaskResult=2147946720 (从未成功跑过) | `Get-ScheduledTaskInfo -TaskName ZP-monthly-matrix` | 需人处理 |
| ZP-k3-review | blocked | `request_human` | 触发点已过但无任何 run 记录 (调度器/执行器未装载) | `Get-ScheduledTask -TaskName ZP-k3-review | Get-ScheduledTaskInfo` | 需人处理 |

> 动作含义: `retry`=瞬时/外部原因下轮重跑 ; `modify_payload`=先改入参/prompt 再跑 ; `request_human`=需 K3 动作(附一条可粘贴命令) ; `abort`=设计缺陷/红线, 停手撞墙。

## 警告 (warnings)

- DUPLICATE_IDEMPOTENCY_KEY e5038594dc97fb9f: ZP-blog-deepfix-20261010T001710 与 ZP-blog-deepfix-20261010T004733 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY eeab665ac84424ea: ZP-gsc-feedback-20261028T194739-35600 与 ZP-gsc-feedback-20261028T201821-36460 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY 0453ab66a64d9edd: ZP-gsc-feedback-20261029T012114-harness 与 ZP-gsc-feedback-20261029T202003-11152 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY 2d920c1eb06bb1a1: ZP-weekly-meta-20261030T071010-32596 与 ZP-weekly-meta-20261030T205755-32592 同日同目标重复处理

## 逐 lane 明细 (最近一次应触发日)

### ZP-daily-content — 2026-11-22 `PENDING`

- 期望触发: 21:17
- run 记录: {"run_id":"ZP-daily-content-20261120T212048-10844","lane":"ZP-daily-content","trigger":"schtasks","fired_at":"2026-11-20 21:20:48","ended_at":"2026-11-20 21:20:48","idempotency_key":"52979e34482394fe","key_consumed":true,"dsh_exit":0,"wrapper_exit":0,"verdict":"PARTIAL","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-20-ZP-daily-content.md","report_auto_generated":false,"files":[],"pushed":false,"head":"c851ec68","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-20 21:17:01 end=0 dsh_exit=0 guardBlocked=false runsTotal=45
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-20 21:17:01 Result=0 State=Ready

### ZP-gsc-feedback — 2026-11-22 `STALE`

- 期望触发: 20:13
- run 记录: {"run_id":"ZP-gsc-feedback-20261121T201302-host-finalize","lane":"ZP-gsc-feedback","trigger":"schtasks","phase":"host-finalize","fired_at":"2026-11-21 20:13:02","ended_at":"2026-11-22 16:28:43","idempotency_key":"b93ef5a6fc086a2d","key_consumed":true,"dsh_exit":null,"wrapper_exit":null,"verdict":"PARTIAL","state":"completed","blocked_reason":"dsh 会话异常(20h 僵尸, 管道死锁), wrapper cmd 21312 非提升会话不可 kill; 报告产物完整(VERDICT/CONSUMED/DELIVERED/NEXT 齐), host-side 收尾 commit/push/bus","guard":{"ok":true},"report":".hermes/logs/2026-11-21-ZP-gsc-feedback.md","report_auto_generated":false,"files":[".hermes/logs/2026-11-21-ZP-gsc-feedback.md",".hermes/logs/gsc-daily-anomaly-2026-11-21.json",".hermes/logs/flywheel-learning-ledger.json"],"pushed":true,"head":"pending","source":"host-finalize-manual"}
- wrapper 最近一次: start=2026-11-21 20:13:02 end=0 dsh_exit=0 guardBlocked=false runsTotal=42
- 当天报告: `2026-11-22-ZP-gsc-feedback.failure.md`
- 调度器: LastRun=2026-11-21 20:13:01 Result=0 State=Ready
- notes: missing exact same-day lane report: .hermes/logs/2026-11-22-ZP-gsc-feedback.md | .hermes/logs/2026-11-22-gsc-feedback.md ; report is AUTO-FILLED or lacks a complete OK/PARTIAL/NO_OP contract (2026-11-22-ZP-gsc-feedback.failure.md)

### ZP-weekly-meta — 2026-11-20 `FAILED`

- 期望触发: 20:52
- run 记录: {"run_id":"ZP-weekly-meta-20261120T205853-29108","lane":"ZP-weekly-meta","trigger":"schtasks","fired_at":"2026-11-20 20:58:53","ended_at":"2026-11-20 20:58:53","idempotency_key":"e311eb8c55fd59fc","key_consumed":false,"dsh_exit":0,"wrapper_exit":4,"verdict":"FAILED","state":"failed","blocked_reason":"pre-commit guard rejected 9 production files; no report commit/push","guard":{"ok":false},"report":".hermes/logs/2026-11-20-ZP-weekly-meta.md","report_auto_generated":false,"files":["docs/assets/2026-11-20/gsc-money-queries-and-pages.json","docs/assets/2026-11-20/gsc-small-order-term-comparison.json","src/data/products.ts","src/data/sku-seo-data.ts","src/lib/price-data.generated.ts","src/lib/pricing.ts"],"pushed":false,"head":"5d78f8ae","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-20 20:52:00 end=0 dsh_exit=0 guardBlocked=true runsTotal=5
- 当天报告: `2026-11-20-ZP-weekly-meta.md`
- 调度器: LastRun=2026-11-20 20:52:00 Result=0 State=Ready
- notes: pre-commit guard rejected 9 production files; no report commit/push ; guard blocked src commit ; guard-blocked message seen in console log (suspected: log may also carry human-session output)

### ZP-blog-deepfix — 2026-11-21 `MISSING`

- 期望触发: 23:47
- run 记录: {"run_id":"ZP-blog-deepfix-20261107T235321-30504","lane":"ZP-blog-deepfix","trigger":"schtasks","fired_at":"2026-11-07 23:53:21","ended_at":"2026-11-07 23:53:21","idempotency_key":"e2c2a2a60f4db26d","key_consumed":true,"dsh_exit":0,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-07-ZP-blog-deepfix.md","report_auto_generated":false,"files":["docs/assets/2026-11-07/gsc-focus-query-position-delta.png","docs/assets/2026-11-07/gsc-four-window-kpi-delta.png"],"pushed":true,"head":"911def1e","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-07 23:47:00 end=0 dsh_exit=0 guardBlocked=false runsTotal=5
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-15 18:25:40 Result=2147946720 State=Ready
- notes: no wrapper log run-start and no bus record for this trigger

### ZP-monthly-matrix

近窗口内无应触发日。

### ZP-k3-review — 2026-11-22 `MISSING`

- 期望触发: 07:10
- run 记录: {"run_id":"ZP-k3-review-20261113T071654-23508","lane":"ZP-k3-review","trigger":"schtasks","fired_at":"2026-11-13 07:16:54","ended_at":"2026-11-13 07:16:54","idempotency_key":"4c5c4142808d8cc4","key_consumed":true,"dsh_exit":0,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-13-ZP-k3-review.md","report_auto_generated":false,"files":["docs/assets/2026-11-12/"],"pushed":true,"head":"ce09a937","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-13 07:10:01 end=0 dsh_exit=0 guardBlocked=false runsTotal=16
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-21 08:03:15 Result=2147946720 State=Ready
- notes: no wrapper log run-start and no bus record for this trigger

## 待 K3 管理员清理的遗留任务

- `\ZprintPro-CronWatchdog-2125` (21:25) — reads autoclaw jobs.json indices 5..9 (historical one-shot jobs, not the ZP lanes) -> PASS/FAIL meaningless; superseded by ZP-cron-watchdog

执行: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\remove-legacy-cron-tasks.ps1` (需管理员; 非提升会话实测无法 delete)

## verdict 定义

| verdict | 含义 |
|---------|------|
| OK | 跑过且产出「文件名日期 == 目标日」的完整真实报告 |
| PARTIAL | 已完成且有真实交付, 但 NEXT/外部输入仍需跟进; completed + ATTENTION, 不重做 DELIVERED |
| NO_OP | 四字段证据完整的合法无变更退出; completed, 不重试、不算异常 |
| MISSING | 触发点已过 45min 仍无 wrapper 日志 / 无总线记录 |
| FAILED | dsh exit != 0 |
| BLOCKED | 前置检查拒绝执行 |
| STALE | 跑过但无当日报告 (空转零产出) 或 guard 拦下 src commit |
| PENDING | 触发点未到 / 宽限期内 |
