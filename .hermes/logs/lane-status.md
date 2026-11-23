# 定时任务状态 (lane-status)

> 生成: 2026-11-23 19:13 · 触发层: Windows Task Scheduler `\ZP-*` → `.hermes/cron-run/*.cmd` → `dsh --profile headless`
> 结构记录来源: `.hermes/logs/lane-runs.jsonl` (143 条真实记录, 逐步接入中) · 兜底证据: wrapper 原始日志 `.hermes/logs/cron-ZP-*.log`
> SSoT: `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`
> **verdict: ATTENTION** — ZP-daily-content 2026-11-23 -> STALE ; ZP-daily-content scheduler LastTaskResult=2147946720 ; ZP-weekly-meta 2026-11-20 -> FAILED ; ZP-blog-deepfix 2026-11-21 -> MISSING ; ZP-blog-deepfix scheduler LastTaskResult=2147946720 ; ZP-k3-review 2026-11-23 -> MISSING ; ZP-k3-review scheduler LastTaskResult=2147946720

| lane | 触发 | 近 7 天逐日 verdict | state | 最近报告 | 调度器 LastRun / Result / Next | 证据日志 |
|------|------|----------------------|-------|----------|-------------------------------|----------|
| ZP-daily-content | DAILY 21:17 | 11-17:OK 11-18:FAILED 11-19:OK 11-20:PARTIAL 11-21:MISSING 11-22:MISSING 11-23:STALE | quarantined | `2026-11-20-ZP-daily-content.md` (2026-11-20) | 2026-11-23 09:24:24 / 2147946720 / 2026-11-23 21:17:00 | `.hermes/logs/cron-ZP-daily-content.log` |
| ZP-weekly-meta | WEEKLY FRI 20:52 | 11-20:FAILED | failed | `2026-11-20-ZP-weekly-meta.md` (2026-11-20) | 2026-11-20 20:52:00 / 0 / 2026-11-27 20:52:00 | `.hermes/logs/cron-ZP-weekly-meta.log` |
| ZP-blog-deepfix | WEEKLY SAT 23:47 | 11-21:MISSING | blocked | `2026-11-07-ZP-blog-deepfix.md` (2026-11-07) | 2026-11-22 16:29:21 / 2147946720 / 2026-11-28 23:47:00 | `.hermes/logs/cron-ZP-blog-deepfix.log` |
| ZP-k3-review | DAILY 07:10 | 11-17:MISSING 11-18:MISSING 11-19:MISSING 11-20:MISSING 11-21:MISSING 11-22:MISSING 11-23:MISSING | blocked | `2026-11-13-ZP-k3-review.md` (2026-11-13) | 2026-11-23 09:24:24 / 2147946720 / 2026-11-24 07:10:00 | `.hermes/logs/cron-ZP-k3-review.log` |

## 恢复分类 (recovery_plan — 下一步该干什么)

| lane | state | 动作 | 原因 | 证据/命令 | 建议重试 |
|------|-------|------|------|-----------|----------|
| ZP-daily-content | quarantined | `retry` | 跑过但无当日报告 (空转/零产出) | `.hermes/logs/cron-ZP-daily-content.log` | 下轮自然重跑 |
| ZP-weekly-meta | failed | `retry` | dsh/wrapper 退出码 0 | `.hermes/logs/cron-ZP-weekly-meta.log` | 下轮自然重跑 |
| ZP-blog-deepfix | blocked | `request_human` | 触发点已过但无任何 run 记录 (调度器/执行器未装载) | `Get-ScheduledTask -TaskName ZP-blog-deepfix | Get-ScheduledTaskInfo` | 需人处理 |
| ZP-k3-review | blocked | `request_human` | 触发点已过但无任何 run 记录 (调度器/执行器未装载) | `Get-ScheduledTask -TaskName ZP-k3-review | Get-ScheduledTaskInfo` | 需人处理 |

> 动作含义: `retry`=瞬时/外部原因下轮重跑 ; `modify_payload`=先改入参/prompt 再跑 ; `request_human`=需 K3 动作(附一条可粘贴命令) ; `abort`=设计缺陷/红线, 停手撞墙。

## 警告 (warnings)

- DUPLICATE_IDEMPOTENCY_KEY e5038594dc97fb9f: ZP-blog-deepfix-20261010T001710 与 ZP-blog-deepfix-20261010T004733 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY eeab665ac84424ea: ZP-gsc-feedback-20261028T194739-35600 与 ZP-gsc-feedback-20261028T201821-36460 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY 0453ab66a64d9edd: ZP-gsc-feedback-20261029T012114-harness 与 ZP-gsc-feedback-20261029T202003-11152 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY 2d920c1eb06bb1a1: ZP-weekly-meta-20261030T071010-32596 与 ZP-weekly-meta-20261030T205755-32592 同日同目标重复处理

## 逐 lane 明细 (最近一次应触发日)

### ZP-daily-content — 2026-11-23 `STALE`

- 期望触发: 21:17
- run 记录: {"run_id":"ZP-daily-content-20261123T181708-harness","lane":"ZP-daily-content","trigger":"dsh-harness","fired_at":"2026-11-23 18:17:08","ended_at":"2026-11-23T19:0x:00+08:00","idempotency_key":"harness-20261123-doujin-rush-residual-exec","dsh_exit":0,"wrapper_exit":null,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-23-ZP-daily-content.md","report_auto_generated":false,"files":["src/data/products.ts",".hermes/logs/2026-11-23-ZP-daily-content.md"],"pushed":true,"head":"7a400449","source":"harness-lane","note":"执行 FIX-20261121-DOUJIN-RUSH-RESIDUAL (K3 #5): doujin 4 处 24小時特急->条件化 (zh x2 + ja feature/longDesc 披露); a4-flyers 证据未复现登记; 貼紙第七窗 30.1 (streak 止步); tsc 基线 54->0 (真实 exit0); 11-21/11-22 两轮缺口登记"}
- wrapper 最近一次: start=2026-11-20 21:17:01 end=0 dsh_exit=0 guardBlocked=false runsTotal=45
- 当天报告: `2026-11-23-ZP-daily-content.md`
- 调度器: LastRun=2026-11-23 09:24:24 Result=2147946720 State=Ready
- notes: report is AUTO-FILLED or lacks a complete OK/PARTIAL/NO_OP contract (2026-11-23-ZP-daily-content.md)

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
- 调度器: LastRun=2026-11-22 16:29:21 Result=2147946720 State=Ready
- notes: no wrapper log run-start and no bus record for this trigger

### ZP-k3-review — 2026-11-23 `MISSING`

- 期望触发: 07:10
- run 记录: {"run_id":"ZP-k3-review-20261113T071654-23508","lane":"ZP-k3-review","trigger":"schtasks","fired_at":"2026-11-13 07:16:54","ended_at":"2026-11-13 07:16:54","idempotency_key":"4c5c4142808d8cc4","key_consumed":true,"dsh_exit":0,"wrapper_exit":0,"verdict":"OK","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-13-ZP-k3-review.md","report_auto_generated":false,"files":["docs/assets/2026-11-12/"],"pushed":true,"head":"ce09a937","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-13 07:10:01 end=0 dsh_exit=0 guardBlocked=false runsTotal=16
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-23 09:24:24 Result=2147946720 State=Ready
- notes: no wrapper log run-start and no bus record for this trigger

## 待 K3 管理员清理的遗留任务

- `\ZprintPro-CronWatchdog-2125` (21:25) — reads autoclaw jobs.json indices 5..9 (historical one-shot jobs, not the ZP lanes) -> PASS/FAIL meaningless; superseded by ZP-cron-watchdog
- `\ZP-gsc-feedback` (20:13) — 2026-11-23 consolidation: GSC feedback merged into ZP-daily-content (harness-daily-growth-20261120.md step 1); delete after S4U rollout, XML backup first
- `\ZP-monthly-matrix` (12:13) — 2026-11-23 consolidation: monthly review merged into ZP-weekly-meta on the first Friday of each month; delete after S4U rollout, XML backup first

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
