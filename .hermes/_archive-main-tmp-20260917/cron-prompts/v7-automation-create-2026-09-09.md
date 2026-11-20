# v7 自动化任务创建包（5 实体 · autoclaw Blueprint Automation）

> **拍板来源**: K3 9/8 06:15「定时任务设于 19:00-07:00 窗口」（调度 SSoT = AGENTS.md §0.34.3）
> **payload**: `v7-automation-payload-2026-09-09.json`（`{"version":1,"jobs":[...]}`，字段逐项对齐 autoclaw 注册表 `C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json` 既有 schema）
> **创建方式**: autoclaw 会话用原生 AutomationCreate 逐条创建。本同步在 DSH 会话执行——无 AutomationCreate 工具，且 jobs.json 为运行时活动注册表（服务持续写回 + .bak 机制），**禁外部直写**，故以 payload 交付。
> **验收**: 创建后 grep jobs.json 5 个 name 全在 + `enabled:true` + expr/tz 正确 + 首次运行后按 `lastDurationMs` 校准 timeout。

## 5 实体清单

| name | expr (Asia/Shanghai) | timeoutSeconds | 报告路径 |
|---|---|---|---|
| `zprintpro-daily-content-1x7w` | `17 21 * * *`（每天 21:17） | 3600 | `.hermes/logs/<日期>-daily-content.md` |
| `zprintpro-gsc-feedback-loop` | `43 22 * * *`（每天 22:43） | 1800 | `.hermes/logs/<日期>-gsc-feedback.md` |
| `zprintpro-weekly-meta-refresh` | `7 23 * * 5`（周五 23:07） | 1800 | `.hermes/reports/weekly-meta-<日期>.md` |
| `zprintpro-blog-deepfix` | `37 5 * * 6`（周六 05:37） | 3600 | `.hermes/reports/blog-deepfix-<日期>.md` |
| `zprintpro-monthly-matrix-audit` | `13 6 1 * *`（每月 1 号 06:13） | 3600 | `.hermes/reports/monthly-matrix-<日期>.md` |

## timeoutSeconds 依据（实录，非估算）

- 既有任务 `zprintpro-w7-strategy-m1-weekly-check` 用 `timeoutSeconds: 300`，jobs.json state 实录 **consecutiveErrors: 4，lastError = "cron: job execution timed out (last phase: model-call-started)"**（2026-09-09 读取）→ 内容生产类任务 300s 必不够。
- 3600（重任务）/ 1800（轻任务）为运维初值；首次真实运行后按各自 `lastDurationMs` 回填校准（校准值写回本文件，标"已校准 + 日期"）。

## SOP-10 5 问门禁

1. **架构差异**: payload 字段逐项对齐 jobs.json 既有 w7 任务 schema（数据来源①），非自造格式；message 沿用"短指令指向完整 prompt 文件"既有模式。
2. **约束适用**: 调度 = K3 9/8 06:15 拍板原文（§0.34.3），5 实体 19:00-07:00 窗口；创建动作本身 = K3 9/9 本轮指令"同步技能自动化"。
3. **数据来源**: 见下节。
4. **字段策略**: `sessionKey` / `state` 为运行时字段，payload 不预填，由 autoclaw 创建时生成；UUID 已预生成 5 个，冲突时由创建方重新生成。
5. **渲染**: 本文件为内部 SOP，不进 user-facing UI。

## 数据来源（§0.23）

- ① schema + w7 timeout 实录: `C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json`（2026-09-09 读取，1615 行 / 2 zprintpro 实体）
- ② 调度拍板: AGENTS.md §0.34.3（K3 9/8 06:15 拍板原文转录）
- ③ prompt SSoT: `.hermes/cron-prompts/zprintpro-{daily-content-1x7w,gsc-feedback-loop,weekly-meta-refresh,blog-deepfix,monthly-matrix-audit}.md`（2026-09-09 版，顶部 v8 大脑指令段 + v7 执行层迁移段含最高规则名片禁令）
- ④ 时间换算: §0.34.3 文字时刻 → cron expr（21:17→`17 21 * * *` 等，tz=Asia/Shanghai）

## 幂等检查（创建前必跑）

创建前先查 jobs.json 是否已存在同名任务（2026-09-09 盘点结论：仅 `zprintpro-w7-strategy-m1-weekly-check` + 2 条 K3 提醒类任务，**5 实体均未建**）→ 已存在同名则跳过，不重复创建。
