# 定时任务状态 (lane-status)

> 生成: 2026-10-10 06:43 · 触发层: Windows Task Scheduler `\ZP-*` → `.hermes/cron-run/*.cmd` → `dsh --profile headless`
> 结构记录来源: `.hermes/logs/lane-runs.jsonl` (26 条真实记录, 逐步接入中) · 兜底证据: wrapper 原始日志 `.hermes/logs/cron-ZP-*.log`
> SSoT: `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`
> **verdict: ATTENTION** — ZP-daily-content 2026-10-10 -> STALE ; ZP-gsc-feedback scheduler LastTaskResult=1 ; ZP-weekly-meta 2026-10-09 -> MISSING ; ZP-weekly-meta scheduler LastTaskResult=2147946720 ; ZP-monthly-matrix scheduler LastTaskResult=2147946720 ; ZP-k3-review scheduler LastTaskResult=267011

| lane | 触发 | 近 8 天逐日 verdict | state | 最近报告 | 调度器 LastRun / Result / Next | 证据日志 |
|------|------|----------------------|-------|----------|-------------------------------|----------|
| ZP-daily-content | DAILY 21:17 | 10-03:STALE 10-04:STALE 10-05:MISSING 10-06:MISSING 10-07:OK 10-08:MISSING 10-09:OK 10-10:STALE | quarantined | `2026-10-10-ZP-daily-content.md` (2026-10-10) | 2026-10-10 00:28:03 / 0 / 2026-10-10 21:17:00 | `.hermes/logs/cron-ZP-daily-content.log` |
| ZP-gsc-feedback | DAILY 22:43 | 10-03:MISSING 10-04:MISSING 10-05:MISSING 10-06:OK 10-07:MISSING 10-08:MISSING 10-09:MISSING 10-10:OK | completed | `2026-10-10-ZP-gsc-feedback.md` (2026-10-10) | 2026-10-10 00:35:35 / 1 / 2026-10-10 22:43:00 | `.hermes/logs/cron-ZP-gsc-feedback.log` |
| ZP-weekly-meta | WEEKLY FRI 23:07 | 10-09:MISSING | blocked | `2026-10-10-ZP-weekly-meta.md` (2026-10-10) | 2026-10-09 23:30:35 / 2147946720 / 2026-10-16 23:07:00 | `.hermes/logs/cron-ZP-weekly-meta.log` |
| ZP-blog-deepfix | WEEKLY SAT 05:37 | 10-03:MISSING 10-10:OK | completed | `2026-10-10-ZP-blog-deepfix.md` (2026-10-10) | 2026-10-10 05:37:00 / 0 / 2026-10-17 05:37:00 | `.hermes/logs/cron-ZP-blog-deepfix.log` |
| ZP-monthly-matrix | MONTHLY 1 06:13 | — | pending | `2026-10-10-ZP-monthly-matrix.md` (2026-10-10) | 2026-10-01 14:01:01 / 2147946720 / 2026-11-01 06:13:00 | `—` |
| ZP-k3-review | DAILY 07:10 | 10-03:MISSING 10-04:MISSING 10-05:MISSING 10-06:MISSING 10-07:MISSING 10-08:MISSING 10-09:MISSING 10-10:OK | completed | `2026-10-10-ZP-k3-review.md` (2026-10-10) | 1999-11-30 00:00:00 / 267011 / 2026-10-10 07:10:00 | `—` |

## 恢复分类 (recovery_plan — 下一步该干什么)

| lane | state | 动作 | 原因 | 证据/命令 | 建议重试 |
|------|-------|------|------|-----------|----------|
| ZP-daily-content | quarantined | `modify_payload` | pre-commit guard 拦下 src commit -> 必须先让改动过对应断言 | `node scripts/guards/sop10-guard.js` | 需人处理 |
| ZP-weekly-meta | blocked | `request_human` | 触发点已过但无任何 run 记录 (调度器/执行器未装载) | `Get-ScheduledTask -TaskName ZP-weekly-meta | Get-ScheduledTaskInfo` | 需人处理 |
| ZP-monthly-matrix | pending | `request_human` | 窗口内无应触发日, 但调度器 LastTaskResult=2147946720 (从未成功跑过) | `Get-ScheduledTaskInfo -TaskName ZP-monthly-matrix` | 需人处理 |

> 动作含义: `retry`=瞬时/外部原因下轮重跑 ; `modify_payload`=先改入参/prompt 再跑 ; `request_human`=需 K3 动作(附一条可粘贴命令) ; `abort`=设计缺陷/红线, 停手撞墙。

## 警告 (warnings)

- DUPLICATE_IDEMPOTENCY_KEY e5038594dc97fb9f: ZP-blog-deepfix-20261010T001710 与 ZP-blog-deepfix-20261010T004733 同日同目标重复处理

## 逐 lane 明细 (最近一次应触发日)

### ZP-daily-content — 2026-10-10 `STALE`

- 期望触发: 21:17
- run 记录: {"run_id":"ZP-daily-content-20261010T003533","lane":"ZP-daily-content","trigger":"schtasks","fired_at":"2026-10-10 00:35:33","ended_at":"2026-10-10 00:35:33","idempotency_key":"63da4450194bcf23","dsh_exit":null,"wrapper_exit":4,"verdict":"BLOCKED","state":"blocked","blocked_reason":"pre-commit guard 拒绝 5 个生产文件","guard":{"ok":false},"report":".hermes/logs/2026-10-10-ZP-daily-content.md","files":["src/app/[locale]/blog/[slug]/page.tsx","src/data/blog-data/en.json","src/data/blog-data/ja.json","src/data/blog-data/zh-hk.json","src/data/blog-posts.ts"],"pushed":false,"head":"797c84e3","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-10-10 00:28:04 end=0 dsh_exit=0 guardBlocked=true runsTotal=19
- 当天报告: `2026-10-10-ZP-daily-content.md`
- 调度器: LastRun=2026-10-10 00:28:03 Result=0 State=Ready
- notes: guard-blocked message seen in console log (suspected: log may also carry human-session output)

### ZP-gsc-feedback — 2026-10-10 `OK`

- 期望触发: 22:43
- run 记录: {"run_id":"ZP-gsc-feedback-20261010T003840","lane":"ZP-gsc-feedback","trigger":"schtasks","fired_at":"2026-10-10 00:38:40","ended_at":"2026-10-10 00:38:40","idempotency_key":"89e1031bbefdc16d","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":"NONE","files":[],"pushed":false,"head":"38c009fe","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-10-10 00:35:36 end=1 dsh_exit=1 guardBlocked=false runsTotal=15
- 当天报告: `2026-10-10-ZP-gsc-feedback.md`
- 调度器: LastRun=2026-10-10 00:35:35 Result=1 State=Ready

### ZP-weekly-meta — 2026-10-09 `MISSING`

- 期望触发: 23:07
- run 记录: {"run_id":"ZP-weekly-meta-20261010T001056","lane":"ZP-weekly-meta","trigger":"schtasks","fired_at":"2026-10-10 00:10:56","ended_at":"2026-10-10 00:10:56","idempotency_key":"5569b1811756e49b","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-10-10-ZP-weekly-meta.md","files":["src/lib/seo.ts"],"pushed":false,"head":"c32931c8","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-09-18 23:07:00 end=0 dsh_exit=0 guardBlocked=false runsTotal=1
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-10-09 23:30:35 Result=2147946720 State=Ready
- notes: no wrapper log run-start and no bus record for this trigger

### ZP-blog-deepfix — 2026-10-10 `OK`

- 期望触发: 05:37
- run 记录: {"run_id":"ZP-blog-deepfix-20261010T054102","lane":"ZP-blog-deepfix","trigger":"schtasks","fired_at":"2026-10-10 05:41:02","ended_at":"2026-10-10 05:41:02","idempotency_key":"37eaab37ee14ebaf","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-10-10-ZP-blog-deepfix.md","files":[],"pushed":true,"head":"7f9b92a9","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-10-10 05:37:00 end=0 dsh_exit=0 guardBlocked=false runsTotal=3
- 当天报告: `2026-10-10-ZP-blog-deepfix.md`
- 调度器: LastRun=2026-10-10 05:37:00 Result=0 State=Ready

### ZP-monthly-matrix

近窗口内无应触发日。

### ZP-k3-review — 2026-10-10 `OK`

- 期望触发: 07:10
- run 记录: {"run_id":"ZP-k3-review-20261010T002356","lane":"ZP-k3-review","trigger":"schtasks","fired_at":"2026-10-10 00:23:56","ended_at":"2026-10-10 00:23:56","idempotency_key":"416be6a67096c2f9","dsh_exit":null,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-10-10-ZP-k3-review.md","files":[],"pushed":false,"head":"8e8d617e","source":"lane-git-commit.py"}
- wrapper 最近一次: 无日志
- 当天报告: `2026-10-10-ZP-k3-review.md`
- 调度器: LastRun=1999-11-30 00:00:00 Result=267011 State=Ready

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
