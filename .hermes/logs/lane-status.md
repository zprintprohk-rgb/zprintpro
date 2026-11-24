# 定时任务状态 (lane-status)

> 生成: 2026-11-24 07:57 · 触发层: Windows Task Scheduler `\ZP-*` → `.hermes/cron-run/*.cmd` → `dsh --profile headless`
> 结构记录来源: `.hermes/logs/lane-runs.jsonl` (145 条真实记录, 逐步接入中) · 兜底证据: wrapper 原始日志 `.hermes/logs/cron-ZP-*.log`
> SSoT: `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`
> **verdict: ATTENTION** — ZP-blog-deepfix scheduler LastTaskResult=2147946720 ; ZP-k3-review 2026-11-24 -> PARTIAL ; ZP-k3-review scheduler LastTaskResult=267014

| lane | 触发 | 近 2 天逐日 verdict | state | 最近报告 | 调度器 LastRun / Result / Next | 证据日志 |
|------|------|----------------------|-------|----------|-------------------------------|----------|
| ZP-daily-content | DAILY 21:17 | 11-23:PARTIAL 11-24:PENDING | pending | `2026-11-23-ZP-daily-content.md` (2026-11-23) | 2026-11-23 21:17:01 / 0 / 2026-11-24 21:17:00 | `.hermes/logs/cron-ZP-daily-content.log` |
| ZP-weekly-meta | WEEKLY FRI 20:52 | — | pending | `2026-11-20-ZP-weekly-meta.md` (2026-11-20) | 2026-11-20 20:52:00 / 0 / 2026-11-27 20:52:00 | `.hermes/logs/cron-ZP-weekly-meta.log` |
| ZP-blog-deepfix | WEEKLY SAT 23:47 | — | pending | `2026-11-07-ZP-blog-deepfix.md` (2026-11-07) | 2026-11-22 16:29:21 / 2147946720 / 2026-11-28 23:47:00 | `.hermes/logs/cron-ZP-blog-deepfix.log` |
| ZP-k3-review | DAILY 07:10 | 11-23:MISSING 11-24:PARTIAL | completed | `2026-11-24-ZP-k3-review.md` (2026-11-24) | 2026-11-24 07:10:01 / 267014 / 2026-11-25 07:10:00 | `.hermes/logs/cron-ZP-k3-review.log` |

## 恢复分类 (recovery_plan — 下一步该干什么)

| lane | state | 动作 | 原因 | 证据/命令 | 建议重试 |
|------|-------|------|------|-----------|----------|
| ZP-blog-deepfix | pending | `request_human` | 窗口内无应触发日, 但调度器 LastTaskResult=2147946720 (从未成功跑过) | `Get-ScheduledTaskInfo -TaskName ZP-blog-deepfix` | 需人处理 |
| ZP-k3-review | completed | `modify_payload` | PARTIAL 已有真实交付, 不是空转; 下轮只处理报告 NEXT 与缺失外部输入, 禁止重做 DELIVERED | `.hermes/logs/run-context-ZP-k3-review.json` | 需人处理 |

> 动作含义: `retry`=瞬时/外部原因下轮重跑 ; `modify_payload`=先改入参/prompt 再跑 ; `request_human`=需 K3 动作(附一条可粘贴命令) ; `abort`=设计缺陷/红线, 停手撞墙。

## 警告 (warnings)

- DUPLICATE_IDEMPOTENCY_KEY e5038594dc97fb9f: ZP-blog-deepfix-20261010T001710 与 ZP-blog-deepfix-20261010T004733 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY eeab665ac84424ea: ZP-gsc-feedback-20261028T194739-35600 与 ZP-gsc-feedback-20261028T201821-36460 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY 0453ab66a64d9edd: ZP-gsc-feedback-20261029T012114-harness 与 ZP-gsc-feedback-20261029T202003-11152 同日同目标重复处理
- DUPLICATE_IDEMPOTENCY_KEY 2d920c1eb06bb1a1: ZP-weekly-meta-20261030T071010-32596 与 ZP-weekly-meta-20261030T205755-32592 同日同目标重复处理

## 逐 lane 明细 (最近一次应触发日)

### ZP-daily-content — 2026-11-24 `PENDING`

- 期望触发: 21:17
- run 记录: {"run_id":"ZP-daily-content-20261123T212212-28100","lane":"ZP-daily-content","trigger":"schtasks","fired_at":"2026-11-23 21:22:12","ended_at":"2026-11-23 21:22:12","idempotency_key":"4d8367265a1a2ae9","key_consumed":true,"dsh_exit":0,"wrapper_exit":0,"verdict":"PARTIAL","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-23-ZP-daily-content.md","report_auto_generated":false,"files":["src/data/products.ts","docs/assets/2026-11-23/"],"pushed":true,"head":"ec3c844e","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-23 21:17:02 end=0 dsh_exit=0 guardBlocked=false runsTotal=46
- 当天报告: **缺失**（空转/零产出的判据）
- 调度器: LastRun=2026-11-23 21:17:01 Result=0 State=Ready

### ZP-weekly-meta

近窗口内无应触发日。

### ZP-blog-deepfix

近窗口内无应触发日。

### ZP-k3-review — 2026-11-24 `PARTIAL`

- 期望触发: 07:10
- run 记录: {"run_id":"ZP-k3-review-20261124T071715-31652","lane":"ZP-k3-review","trigger":"schtasks","fired_at":"2026-11-24 07:17:15","ended_at":"2026-11-24 07:17:15","idempotency_key":"2783e87fd773e454","key_consumed":true,"dsh_exit":0,"wrapper_exit":0,"verdict":"PARTIAL","state":"completed","blocked_reason":"","guard":{"ok":true},"report":".hermes/logs/2026-11-24-ZP-k3-review.md","report_auto_generated":false,"files":[],"pushed":true,"head":"53514c41","source":"lane-git-commit.py"}
- wrapper 最近一次: start=2026-11-24 07:10:01 end=0 dsh_exit=0 guardBlocked=false runsTotal=17
- 当天报告: `2026-11-24-ZP-k3-review.md`
- 调度器: LastRun=2026-11-24 07:10:01 Result=267014 State=Ready

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
