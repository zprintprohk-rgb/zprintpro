# 定时任务状态 (lane-status)

> 生成: 2026-09-23 06:43 · 触发层: Windows Task Scheduler `\ZP-*` → `.hermes/cron-run/*.cmd` → `dsh --profile headless`
> 结构记录来源: `.hermes/logs/lane-runs.jsonl` (6 条真实记录, 逐步接入中) · 兜底证据: wrapper 原始日志 `.hermes/logs/cron-ZP-*.log`
> SSoT: `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`
> **verdict: ATTENTION** — ZP-daily-content scheduler LastTaskResult=1 ; ZP-gsc-feedback scheduler LastTaskResult=1 ; ZP-blog-deepfix 2026-09-19 -> STALE ; ZP-monthly-matrix scheduler LastTaskResult=267011

| lane | 触发 | 近 8 天逐日 verdict | state | 最近报告 | 调度器 LastRun / Result / Next | 证据日志 |
|------|------|----------------------|-------|----------|-------------------------------|----------|
| ZP-daily-content | DAILY 21:17 | 09-16:OK 09-17:STALE 09-18:OK 09-19:MISSING 09-20:STALE 09-21:STALE 09-22:STALE 09-23:PENDING | pending | `2026-09-18-daily-content.md` (2026-09-18) | 2026-09-22 21:17:01 / 1 / 2026-09-23 21:17:00 | `.hermes/logs/cron-ZP-daily-content.log` |
| ZP-gsc-feedback | DAILY 22:43 | 09-16:OK 09-17:STALE 09-18:OK 09-19:MISSING 09-20:MISSING 09-21:STALE 09-22:STALE 09-23:PENDING | pending | `2026-09-18-gsc-feedback.md` (2026-09-18) | 2026-09-22 22:43:01 / 1 / 2026-09-23 22:43:00 | `.hermes/logs/cron-ZP-gsc-feedback.log` |
| ZP-weekly-meta | WEEKLY FRI 23:07 | 09-18:OK | completed | `2026-09-18-weekly-meta.md` (2026-09-18) | 2026-09-18 23:07:00 / 0 / 2026-09-25 23:07:00 | `.hermes/logs/cron-ZP-weekly-meta.log` |
| ZP-blog-deepfix | WEEKLY SAT 05:37 | 09-19:STALE | quarantined | `2026-09-19-blog-deepfix.md` (2026-09-19) | 2026-09-19 05:37:00 / 0 / 2026-09-26 05:37:00 | `.hermes/logs/cron-ZP-blog-deepfix.log` |
| ZP-monthly-matrix | MONTHLY 1 06:13 | — | pending | — | 1999-11-30 00:00:00 / 267011 / 2026-10-01 06:13:00 | `—` |

## 恢复分类 (recovery_plan — 下一步该干什么)

| lane | state | 动作 | 原因 | 证据/命令 | 建议重试 |
|------|-------|------|------|-----------|----------|
| ZP-blog-deepfix | quarantined | `modify_payload` | pre-commit guard 拦下 src commit -> 必须先让改动过对应断言 | `node scripts/guards/sop10-guard.js` | 需人处理 |
| ZP-monthly-matrix | pending | `request_human` | 窗口内无应触发日, 但调度器 LastTaskResult=267011 (从未成功跑过) | `Get-ScheduledTaskInfo -TaskName ZP-monthly-matrix` | 需人处理 |

> 动作含义: `retry`=瞬时/外部原因下轮重跑 ; `modify_payload`=先改入参/prompt 再跑 ; `request_human`=需 K3 动作(附一条可粘贴命令) ; `abort`=设计缺陷/红线, 停手撞墙。

## 逐 lane 明细 (最近一次应触发日)

### ZP-daily-content — 2026-09-23 `PENDING`

- 期望触发: 21:17
- run 记录: {"run_id":"ZP-daily-content-20260922T212033","lane":"ZP-daily-content","trigger":"schtasks","fired_at":"2026-09-22 21:20:33","ended_at":"2026-09-22 21:20:33","idempotency_key":"7175eec9332268c7","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":"NONE","files":[],"pushed":false,"head":"20f99823","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-09-22 21:17:02 end=1 dsh_exit=1 guardBlocked=false runsTotal=9
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-09-22 21:17:01 Result=1 State=Ready

### ZP-gsc-feedback — 2026-09-23 `PENDING`

- 期望触发: 22:43
- run 记录: {"run_id":"ZP-gsc-feedback-20260922T224500","lane":"ZP-gsc-feedback","trigger":"schtasks","fired_at":"2026-09-22 22:45:00","ended_at":"2026-09-22 22:45:00","idempotency_key":"953671dd8224d707","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":"NONE","files":[],"pushed":true,"head":"2fd51c98","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-09-22 22:43:02 end=1 dsh_exit=1 guardBlocked=false runsTotal=11
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-09-22 22:43:01 Result=1 State=Ready

### ZP-weekly-meta — 2026-09-18 `OK`

- 期望触发: 23:07
- run 记录: （总线尚无记录，证据来自 wrapper 日志）
- wrapper 最近一次: start=2026-09-18 23:07:00 end=0 dsh_exit=0 guardBlocked=false runsTotal=1
- 当天报告: `2026-09-18-weekly-meta.md`
- 调度器: LastRun=2026-09-18 23:07:00 Result=0 State=Ready

### ZP-blog-deepfix — 2026-09-19 `STALE`

- 期望触发: 05:37
- run 记录: {"run_id":"ZP-blog-deepfix-20260919T081911","lane":"ZP-blog-deepfix","trigger":"schtasks","ended_at":"2026-09-19 08:19:11","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/cron-watchdog-alerts.md","files":[],"pushed":true,"head":"f5bb90b6","source":"lane-git-commit.py","idempotency_key":"152fae94b2081d68","state":"completed","backfilled":"idempotency_key/state added 2026-09-19 after P3-10 landed"}
- wrapper 最近一次: start=2026-09-19 05:37:09 end=0 dsh_exit=0 guardBlocked=true runsTotal=1
- 当天报告: `2026-09-19-blog-deepfix.md`
- 调度器: LastRun=2026-09-19 05:37:00 Result=0 State=Ready
- notes: guard-blocked message seen in console log (suspected: log may also carry human-session output)

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
