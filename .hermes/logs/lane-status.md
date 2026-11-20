# 定时任务状态 (lane-status)

> 生成: 2026-11-20 04:57 · 触发层: Windows Task Scheduler `\ZP-*` → `.hermes/cron-run/*.cmd` → `dsh --profile headless`
> 结构记录来源: `.hermes/logs/lane-runs.jsonl` (131 条真实记录, 逐步接入中) · 兜底证据: wrapper 原始日志 `.hermes/logs/cron-ZP-*.log`
> SSoT: `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`
> **verdict: ATTENTION** — ZP-daily-content scheduler LastTaskResult=2147946720 ; ZP-gsc-feedback scheduler LastTaskResult=1 ; ZP-weekly-meta scheduler LastTaskResult=2147946720 ; ZP-blog-deepfix 2026-11-14 -> MISSING ; ZP-blog-deepfix scheduler LastTaskResult=2147946720 ; ZP-monthly-matrix scheduler LastTaskResult=2147946720 ; ZP-k3-review scheduler LastTaskResult=2147946720

| lane | 触发 | 近 7 天逐日 verdict | state | 最近报告 | 调度器 LastRun / Result / Next | 证据日志 |
|------|------|----------------------|-------|----------|-------------------------------|----------|
| ZP-daily-content | DAILY 21:17 | 11-14:STALE 11-15:STALE 11-16:STALE 11-17:STALE 11-18:FAILED 11-19:STALE 11-20:PENDING | pending | `2026-11-12-ZP-daily-content.md` (2026-11-12) | 2026-11-19 23:20:19 / 2147946720 / 2026-11-20 21:17:00 | `.hermes/logs/cron-ZP-daily-content.log` |
| ZP-gsc-feedback | DAILY 20:13 | 11-14:PARTIAL 11-15:MISSING 11-16:MISSING 11-17:MISSING 11-18:FAILED 11-19:FAILED 11-20:PENDING | pending | `2026-11-18-ZP-gsc-feedback.md` (2026-11-18) | 2026-11-19 20:13:01 / 1 / 2026-11-20 20:13:00 | `.hermes/logs/cron-ZP-gsc-feedback.log` |
| ZP-weekly-meta | WEEKLY FRI 20:52 | 11-20:PENDING | pending | `2026-10-30-ZP-weekly-meta.md` (2026-10-30) | 2026-11-13 21:32:01 / 2147946720 / 2026-11-20 20:52:00 | `.hermes/logs/cron-ZP-weekly-meta.log` |
| ZP-blog-deepfix | WEEKLY SAT 23:47 | 11-14:MISSING | blocked | `2026-11-07-ZP-blog-deepfix.md` (2026-11-07) | 2026-11-15 18:25:40 / 2147946720 / 2026-11-21 23:47:00 | `.hermes/logs/cron-ZP-blog-deepfix.log` |
| ZP-monthly-matrix | MONTHLY 1 12:13 | — | pending | `2026-10-10-ZP-monthly-matrix.md` (2026-10-10) | 2026-11-01 17:42:14 / 2147946720 / 2026-12-01 12:13:00 | `—` |
| ZP-k3-review | DAILY 07:10 | 11-14:MISSING 11-15:MISSING 11-16:MISSING 11-17:MISSING 11-18:MISSING 11-19:MISSING 11-20:PENDING | pending | `2026-11-13-ZP-k3-review.md` (2026-11-13) | 2026-11-19 09:03:15 / 2147946720 / 2026-11-20 07:10:00 | `.hermes/logs/cron-ZP-k3-review.log` |

## 恢复分类 (recovery_plan — 下一步该干什么)

| lane | state | 动作 | 原因 | 证据/命令 | 建议重试 |
|------|-------|------|------|-----------|----------|
| ZP-blog-deepfix | blocked | `request_human` | 触发点已过但无任何 run 记录 (调度器/执行器未装载) | `Get-ScheduledTask -TaskName ZP-blog-deepfix | Get-ScheduledTaskInfo` | 需人处理 |
| ZP-monthly-matrix | pending | `request_human` | 窗口内无应触发日, 但调度器 LastTaskResult=2147946720 (从未成功跑过) | `Get-ScheduledTaskInfo -TaskName ZP-monthly-matrix` | 需人处理 |

> 动作含义: `retry`=瞬时/外部原因下轮重跑 ; `modify_payload`=先改入参/prompt 再跑 ; `request_human`=需 K3 动作(附一条可粘贴命令) ; `abort`=设计缺陷/红线, 停手撞墙。

## 警告 (warnings)

- DUPLICATE_IDEMPOTENCY_KEY e5038594dc97fb9f: ZP-blog-deepfix-20261010T001710 与 ZP-blog-deepfix-20261010T004733 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY eeab665ac84424ea: ZP-gsc-feedback-20261028T194739-35600 与 ZP-gsc-feedback-20261028T201821-36460 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY 0453ab66a64d9edd: ZP-gsc-feedback-20261029T012114-harness 与 ZP-gsc-feedback-20261029T202003-11152 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY 2d920c1eb06bb1a1: ZP-weekly-meta-20261030T071010-32596 与 ZP-weekly-meta-20261030T205755-32592 同日同目标重复处理

## 逐 lane 明细 (最近一次应触发日)

### ZP-daily-content — 2026-11-20 `PENDING`

- 期望触发: 21:17
- run 记录: {"run_id":"ZP-daily-content-20261119T181730-harness","lane":"ZP-daily-content","trigger":"dsh-harness","fired_at":"2026-11-19 18:17:30","ended_at":"2026-11-19T18:45:00+08:00","idempotency_key":"harness-20261119-sticker-sixth-window-30-cross","dsh_exit":0,"wrapper_exit":null,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-19-ZP-daily-content.md","report_auto_generated":false,"files":[".hermes/logs/2026-11-19-ZP-daily-content.md"],"pushed":true,"head":"REPLACE","source":"harness-lane","note":"貼紙第六窗 29.94 破 30 线 (六窗 38.06->29.94 累计 -8.12, 仍 HOLD ≤25 未达, 进入 title 评估讨论窗口); 消费 11-18 决策窗执行 (agenda1 schema MOQ档价格 + agenda2 a2海报 + agenda3 food + CF success x2 + live 5/5); nengajo 21imp; SMALLBATCH 复测 11-21 可核验; src 零写入"}
- wrapper 最近一次: start=2026-11-18 21:17:01 end=1 dsh_exit=1 guardBlocked=false runsTotal=44
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-19 23:20:19 Result=2147946720 State=Ready

### ZP-gsc-feedback — 2026-11-20 `PENDING`

- 期望触发: 20:13
- run 记录: {"run_id":"ZP-gsc-feedback-20261119T201305-35628","lane":"ZP-gsc-feedback","trigger":"schtasks","fired_at":"2026-11-19 20:13:05","ended_at":"2026-11-19 20:13:05","idempotency_key":"e0e52600e993ad2a","key_consumed":false,"dsh_exit":1,"wrapper_exit":1,"verdict":"FAILED","state":"failed","blocked_reason":"dsh exited 1; model execution failed before host finalize","guard":{"ok":true},"report":".hermes/logs/2026-11-19-ZP-gsc-feedback.failure.md","report_auto_generated":true,"files":[],"pushed":false,"head":"35909643","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-19 20:13:01 end=1 dsh_exit=1 guardBlocked=false runsTotal=40
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-19 20:13:01 Result=1 State=Ready

### ZP-weekly-meta — 2026-11-20 `PENDING`

- 期望触发: 20:52
- run 记录: {"run_id":"ZP-weekly-meta-20261106T205201","lane":"ZP-weekly-meta","trigger":"schtasks","phase":"preflight","fired_at":"2026-11-06 20:52:00","ended_at":"2026-11-06 20:52:00","idempotency_key":"c1034d5d108a2a24","key_consumed":false,"dsh_exit":null,"wrapper_exit":10,"verdict":"BLOCKED","state":"blocked","blocked_reason":"strategy-feedback exited 1; output suppressed","guard":{"ok":true},"report":".hermes/logs/2026-11-06-ZP-weekly-meta.md","report_auto_generated":true,"files":[],"pushed":false,"source":"lane-preflight.py"}
- wrapper 最近一次: start=2026-11-06 20:52:00 end=- dsh_exit=null guardBlocked=false runsTotal=4
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-13 21:32:01 Result=2147946720 State=Ready

### ZP-blog-deepfix — 2026-11-14 `MISSING`

- 期望触发: 23:47
- run 记录: {"run_id":"ZP-blog-deepfix-20261107T235321-30504","lane":"ZP-blog-deepfix","trigger":"schtasks","fired_at":"2026-11-07 23:53:21","ended_at":"2026-11-07 23:53:21","idempotency_key":"e2c2a2a60f4db26d","key_consumed":true,"dsh_exit":0,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-07-ZP-blog-deepfix.md","report_auto_generated":false,"files":["docs/assets/2026-11-07/gsc-focus-query-position-delta.png","docs/assets/2026-11-07/gsc-four-window-kpi-delta.png"],"pushed":true,"head":"911def1e","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-07 23:47:00 end=0 dsh_exit=0 guardBlocked=false runsTotal=5
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-15 18:25:40 Result=2147946720 State=Ready
- notes: no wrapper log run-start and no bus record for this trigger

### ZP-monthly-matrix

近窗口内无应触发日。

### ZP-k3-review — 2026-11-20 `PENDING`

- 期望触发: 07:10
- run 记录: {"run_id":"ZP-k3-review-20261113T071654-23508","lane":"ZP-k3-review","trigger":"schtasks","fired_at":"2026-11-13 07:16:54","ended_at":"2026-11-13 07:16:54","idempotency_key":"4c5c4142808d8cc4","key_consumed":true,"dsh_exit":0,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-13-ZP-k3-review.md","report_auto_generated":false,"files":["docs/assets/2026-11-12/"],"pushed":true,"head":"ce09a937","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-13 07:10:01 end=0 dsh_exit=0 guardBlocked=false runsTotal=16
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-19 09:03:15 Result=2147946720 State=Ready

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
