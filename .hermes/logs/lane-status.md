# 定时任务状态 (lane-status)

> 生成: 2026-10-07 15:28 · 触发层: Windows Task Scheduler `\ZP-*` → `.hermes/cron-run/*.cmd` → `dsh --profile headless`
> 结构记录来源: `.hermes/logs/lane-runs.jsonl` (14 条真实记录, 逐步接入中) · 兜底证据: wrapper 原始日志 `.hermes/logs/cron-ZP-*.log`
> SSoT: `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`
> **verdict: ATTENTION** — ZP-daily-content scheduler LastTaskResult=2147946720 ; ZP-weekly-meta scheduler LastTaskResult=2147946720 ; ZP-blog-deepfix scheduler LastTaskResult=2147946720 ; ZP-monthly-matrix scheduler LastTaskResult=2147946720

| lane | 触发 | 近 2 天逐日 verdict | state | 最近报告 | 调度器 LastRun / Result / Next | 证据日志 |
|------|------|----------------------|-------|----------|-------------------------------|----------|
| ZP-daily-content | DAILY 21:17 | 10-06:MISSING 10-07:PENDING | pending | `2026-09-29-ZP-daily-content.md` (2026-09-29) | 2026-10-06 21:47:30 / 2147946720 / 2026-10-07 21:17:00 | `.hermes/logs/cron-ZP-daily-content.log` |
| ZP-gsc-feedback | DAILY 22:43 | 10-06:OK 10-07:PENDING | pending | `2026-10-06-gsc-feedback.md` (2026-10-06) | 2026-10-06 22:43:01 / 0 / 2026-10-07 22:43:00 | `.hermes/logs/cron-ZP-gsc-feedback.log` |
| ZP-weekly-meta | WEEKLY FRI 23:07 | — | pending | `2026-09-18-weekly-meta.md` (2026-09-18) | 2026-10-03 14:06:40 / 2147946720 / 2026-10-09 23:07:00 | `.hermes/logs/cron-ZP-weekly-meta.log` |
| ZP-blog-deepfix | WEEKLY SAT 05:37 | — | pending | `2026-09-19-blog-deepfix.md` (2026-09-19) | 2026-10-03 14:06:40 / 2147946720 / 2026-10-10 05:37:00 | `.hermes/logs/cron-ZP-blog-deepfix.log` |
| ZP-monthly-matrix | MONTHLY 1 06:13 | — | pending | — | 2026-10-01 14:01:01 / 2147946720 / 2026-11-01 06:13:00 | `—` |

## 恢复分类 (recovery_plan — 下一步该干什么)

| lane | state | 动作 | 原因 | 证据/命令 | 建议重试 |
|------|-------|------|------|-----------|----------|
| ZP-weekly-meta | pending | `request_human` | 窗口内无应触发日, 但调度器 LastTaskResult=2147946720 (从未成功跑过) | `Get-ScheduledTaskInfo -TaskName ZP-weekly-meta` | 需人处理 |
| ZP-blog-deepfix | pending | `request_human` | 窗口内无应触发日, 但调度器 LastTaskResult=2147946720 (从未成功跑过) | `Get-ScheduledTaskInfo -TaskName ZP-blog-deepfix` | 需人处理 |
| ZP-monthly-matrix | pending | `request_human` | 窗口内无应触发日, 但调度器 LastTaskResult=2147946720 (从未成功跑过) | `Get-ScheduledTaskInfo -TaskName ZP-monthly-matrix` | 需人处理 |

> 动作含义: `retry`=瞬时/外部原因下轮重跑 ; `modify_payload`=先改入参/prompt 再跑 ; `request_human`=需 K3 动作(附一条可粘贴命令) ; `abort`=设计缺陷/红线, 停手撞墙。

## 逐 lane 明细 (最近一次应触发日)

### ZP-daily-content — 2026-10-07 `PENDING`

- 期望触发: 21:17
- run 记录: {"run_id":"ZP-daily-content-20261004T211831","lane":"ZP-daily-content","trigger":"schtasks","fired_at":"2026-10-04 21:18:31","ended_at":"2026-10-04 21:18:31","idempotency_key":"d67a2dec5f5298a8","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":"NONE","files":[],"pushed":true,"head":"c035f169","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-10-04 21:17:02 end=1 dsh_exit=1 guardBlocked=false runsTotal=15
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-10-06 21:47:30 Result=2147946720 State=Ready

### ZP-gsc-feedback — 2026-10-07 `PENDING`

- 期望触发: 22:43
- run 记录: {"run_id":"ZP-gsc-feedback-20261006T225514","lane":"ZP-gsc-feedback","trigger":"schtasks","fired_at":"2026-10-06 22:55:14","ended_at":"2026-10-06 22:55:14","idempotency_key":"6c8cff7c452774a2","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-10-06-gsc-feedback.md","files":[".hermes/industry-keyword-matrix.json"],"pushed":true,"head":"791a654d","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-10-06 22:43:02 end=0 dsh_exit=0 guardBlocked=false runsTotal=14
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-10-06 22:43:01 Result=0 State=Ready

### ZP-weekly-meta

近窗口内无应触发日。

### ZP-blog-deepfix

近窗口内无应触发日。

### ZP-monthly-matrix

近窗口内无应触发日。

## 待 K3 管理员清理的遗留任务

- `\ZprintPro-CronWatchdog-2125` (21:25) — reads autoclaw jobs.json indices 5..9 (historical one-shot jobs, not the ZP lanes) -> PASS/FAIL meaningless; superseded by ZP-cron-watchdog

执行: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\remove-legacy-cron-tasks.ps1` (需管理员; 非提升会话实测无法 delete)

## verdict 定义

| verdict | 含义 |
|---------|------|
| OK | 跑过且产出「文件名日期 == 目标日」的报告 |
| MISSING | 触发点已过 45min 仍无 wrapper 日志 / 无总线记录 |
| FAILED | dsh exit != 0 |
| BLOCKED | 前置检查拒绝执行 |
| STALE | 跑过但无当日报告 (空转零产出) 或 guard 拦下 src commit |
| PENDING | 触发点未到 / 宽限期内 |
