# 定时任务状态 (lane-status)

> 生成: 2026-10-27 06:43 · 触发层: Windows Task Scheduler `\ZP-*` → `.hermes/cron-run/*.cmd` → `dsh --profile headless`
> 结构记录来源: `.hermes/logs/lane-runs.jsonl` (46 条真实记录, 逐步接入中) · 兜底证据: wrapper 原始日志 `.hermes/logs/cron-ZP-*.log`
> SSoT: `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`
> **verdict: ATTENTION** — ZP-daily-content scheduler LastTaskResult=1 ; ZP-gsc-feedback scheduler LastTaskResult=1 ; ZP-weekly-meta 2026-10-23 -> MISSING ; ZP-weekly-meta scheduler LastTaskResult=2147946720 ; ZP-blog-deepfix 2026-10-24 -> MISSING ; ZP-blog-deepfix scheduler LastTaskResult=2147946720 ; ZP-monthly-matrix scheduler LastTaskResult=2147946720 ; ZP-k3-review scheduler LastTaskResult=1

| lane | 触发 | 近 8 天逐日 verdict | state | 最近报告 | 调度器 LastRun / Result / Next | 证据日志 |
|------|------|----------------------|-------|----------|-------------------------------|----------|
| ZP-daily-content | DAILY 21:17 | 10-20:OK 10-21:MISSING 10-22:OK 10-23:MISSING 10-24:OK 10-25:OK 10-26:OK 10-27:PENDING | pending | `2026-10-26-daily-content.md` (2026-10-26) | 2026-10-26 21:17:02 / 1 / 2026-10-27 21:17:00 | `.hermes/logs/cron-ZP-daily-content.log` |
| ZP-gsc-feedback | DAILY 20:13 | 10-20:MISSING 10-21:MISSING 10-22:MISSING 10-23:MISSING 10-24:STALE 10-25:MISSING 10-26:FAILED 10-27:PENDING | pending | `2026-10-26-ZP-gsc-feedback.md` (2026-10-26) | 2026-10-26 20:13:01 / 1 / 2026-10-27 20:13:00 | `.hermes/logs/cron-ZP-gsc-feedback.log` |
| ZP-weekly-meta | WEEKLY FRI 20:52 | 10-23:MISSING | blocked | `2026-10-10-ZP-weekly-meta.md` (2026-10-10) | 2026-10-24 02:18:55 / 2147946720 / 2026-10-30 20:52:00 | `.hermes/logs/cron-ZP-weekly-meta.log` |
| ZP-blog-deepfix | WEEKLY SAT 23:47 | 10-24:MISSING | blocked | `2026-10-10-ZP-blog-deepfix.md` (2026-10-10) | 2026-10-25 11:22:59 / 2147946720 / 2026-10-31 23:47:00 | `.hermes/logs/cron-ZP-blog-deepfix.log` |
| ZP-monthly-matrix | MONTHLY 1 12:13 | — | pending | `2026-10-10-ZP-monthly-matrix.md` (2026-10-10) | 2026-10-01 14:01:01 / 2147946720 / 2026-11-01 12:13:00 | `—` |
| ZP-k3-review | DAILY 07:10 | 10-20:MISSING 10-21:MISSING 10-22:MISSING 10-23:MISSING 10-24:MISSING 10-25:MISSING 10-26:OK 10-27:PENDING | pending | `2026-10-26-ZP-k3-review.md` (2026-10-26) | 2026-10-26 07:10:01 / 1 / 2026-10-27 07:10:00 | `.hermes/logs/cron-ZP-k3-review.log` |

## 恢复分类 (recovery_plan — 下一步该干什么)

| lane | state | 动作 | 原因 | 证据/命令 | 建议重试 |
|------|-------|------|------|-----------|----------|
| ZP-weekly-meta | blocked | `request_human` | 触发点已过但无任何 run 记录 (调度器/执行器未装载) | `Get-ScheduledTask -TaskName ZP-weekly-meta | Get-ScheduledTaskInfo` | 需人处理 |
| ZP-blog-deepfix | blocked | `request_human` | 触发点已过但无任何 run 记录 (调度器/执行器未装载) | `Get-ScheduledTask -TaskName ZP-blog-deepfix | Get-ScheduledTaskInfo` | 需人处理 |
| ZP-monthly-matrix | pending | `request_human` | 窗口内无应触发日, 但调度器 LastTaskResult=2147946720 (从未成功跑过) | `Get-ScheduledTaskInfo -TaskName ZP-monthly-matrix` | 需人处理 |

> 动作含义: `retry`=瞬时/外部原因下轮重跑 ; `modify_payload`=先改入参/prompt 再跑 ; `request_human`=需 K3 动作(附一条可粘贴命令) ; `abort`=设计缺陷/红线, 停手撞墙。

## 警告 (warnings)

- DUPLICATE_IDEMPOTENCY_KEY e5038594dc97fb9f: ZP-blog-deepfix-20261010T001710 与 ZP-blog-deepfix-20261010T004733 同日同目标重复处理

## 逐 lane 明细 (最近一次应触发日)

### ZP-daily-content — 2026-10-27 `PENDING`

- 期望触发: 21:17
- run 记录: {"run_id":"ZP-daily-content-20261026T181700-harness","lane":"ZP-daily-content","trigger":"dsh-harness","fired_at":"2026-10-26 18:17:00","ended_at":"2026-10-26T18:39:01+08:00","idempotency_key":"harness-20261026-boxes-detox","dsh_exit":0,"wrapper_exit":null,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-10-26-daily-content.md","report_auto_generated":false,"files":["src/data/sku-seo-data.ts",".hermes/logs/2026-10-26-daily-content.md",".hermes/logs/b1c-queue-progress.json",".hermes/_bak-sku-seo-before-boxes-20261026.ts"],"pushed":true,"head":"ef3140ac","source":"harness-lane"}
- wrapper 最近一次: start=2026-10-26 21:17:02 end=1 dsh_exit=1 guardBlocked=false runsTotal=28
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-10-26 21:17:02 Result=1 State=Ready

### ZP-gsc-feedback — 2026-10-27 `PENDING`

- 期望触发: 20:13
- run 记录: {"run_id":"ZP-gsc-feedback-20261024T201343","lane":"ZP-gsc-feedback","trigger":"schtasks","fired_at":"2026-10-24 20:13:43","ended_at":"2026-10-24 20:13:43","idempotency_key":"3667b5fb919620d9","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-10-23-ZP-k3-review.md","report_auto_generated":false,"files":[],"pushed":true,"head":"07d53b90","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-10-26 20:13:01 end=1 dsh_exit=1 guardBlocked=false runsTotal=20
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-10-26 20:13:01 Result=1 State=Ready

### ZP-weekly-meta — 2026-10-23 `MISSING`

- 期望触发: 20:52
- run 记录: {"run_id":"ZP-weekly-meta-20261010T001056","lane":"ZP-weekly-meta","trigger":"schtasks","fired_at":"2026-10-10 00:10:56","ended_at":"2026-10-10 00:10:56","idempotency_key":"5569b1811756e49b","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-10-10-ZP-weekly-meta.md","files":["src/lib/seo.ts"],"pushed":false,"head":"c32931c8","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-09-18 23:07:00 end=0 dsh_exit=0 guardBlocked=false runsTotal=1
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-10-24 02:18:55 Result=2147946720 State=Ready
- notes: no wrapper log run-start and no bus record for this trigger

### ZP-blog-deepfix — 2026-10-24 `MISSING`

- 期望触发: 23:47
- run 记录: {"run_id":"ZP-blog-deepfix-20261010T054102","lane":"ZP-blog-deepfix","trigger":"schtasks","fired_at":"2026-10-10 05:41:02","ended_at":"2026-10-10 05:41:02","idempotency_key":"37eaab37ee14ebaf","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-10-10-ZP-blog-deepfix.md","files":[],"pushed":true,"head":"7f9b92a9","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-10-10 05:37:00 end=0 dsh_exit=0 guardBlocked=false runsTotal=3
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-10-25 11:22:59 Result=2147946720 State=Ready
- notes: no wrapper log run-start and no bus record for this trigger

### ZP-monthly-matrix

近窗口内无应触发日。

### ZP-k3-review — 2026-10-27 `PENDING`

- 期望触发: 07:10
- run 记录: {"run_id":"ZP-k3-review-20261026T071031","lane":"ZP-k3-review","trigger":"schtasks","fired_at":"2026-10-26 07:10:31","ended_at":"2026-10-26 07:10:31","idempotency_key":"a81f935853c1be6f","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":"NONE","report_auto_generated":true,"files":[],"pushed":true,"head":"b0e30769","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-10-26 07:10:02 end=1 dsh_exit=1 guardBlocked=false runsTotal=5
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-10-26 07:10:01 Result=1 State=Ready

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
