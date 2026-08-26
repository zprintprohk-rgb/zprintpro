# Evolution Proposal: 用户明确表示看不懂英文页面，需要记录「英文页面一律配中文逐步说明」的长期协助偏好，避免后续再让用户独自面对英文界面。

- Proposal-ID: evo-2026-08-11-english-page-chinese-guidance
- Status: approved
- Signature: english-page-chinese-guidance
- Created-At: 2026-08-11 00:17
- Last-Seen-At: 2026-08-11 00:17
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium

## Why This Matters
- 用户明确表示看不懂英文页面，需要记录「英文页面一律配中文逐步说明」的长期协助偏好，避免后续再让用户独自面对英文界面。

## Evidence
- Interactive proposal card was present in the session UI.
- The original pending draft file was unavailable at approval time.
- AutoClaw reconstructed this draft from the proposal payload so the review result can still be recorded.

## Duplicate Check
- Checked: pending draft path + signature/proposal fallback
- Result: original draft file missing
- Decision: create surrogate draft from proposal payload

## Proposed Change
### MEMORY.md 新增英文页面协助偏好

# MEMORY.md

## 定时任务管理（2026-08-08 user 拍板 · evo-2026-08-08-cron-unify-autoclaw）

- 定时任务一律由 AutoClaw cron 统一管理，逐步取代 Hermes/mavis 的定时任务，避免双系统重复触发
- 调度时间一律避开高峰期（高负载/高峰时段），新建或合并 cron 前先读取 Hermes 现有定时任务清单比对查重
- 项目级执行细则见各项目 AGENTS.md（aitoptools 已落地：cron 10→4 合并 + 路径铁律 + 幂等防双跑，见 F:\aitoptools\.hermes\logs\cron-merge-20260808.md）

## 定时任务命名与清理（2026-08-09 user 拍板 · evo-2026-08-09-cron-chinese-naming-cleanup）

- cron 任务名称一律用**中文命名**，写明作用与功能，让用户一眼看懂每个任务在做什么（不用难懂的英文缩写/代号）
- 合并 cron 后必须**立即删除**被替代的旧任务和不需要的任务，不得遗留重复或混乱条目；清理完成后向用户汇报最终清单供确认
- 当前状态（8/9）：4 个中文名任务 = 每日联盟运营(12:17) / 每日搜索增长(19:23) / 每周复盘(周日07:47) / 季节集群执行(8/10+8/18)

## 英文页面协助偏好（2026-08-11 · evo-2026-08-11-english-page-chinese-guidance）

- 用户英文阅读能力有限（原话：「全是英文的页面，看不太懂啊」）——引导用户操作任何英文网站/页面时，必须提供**中文逐步说明**，并翻译关键按钮/选项的中文含义，不要只丢英文原文或英文截图让用户自己看
- Printful 等素材站的免费下载：优先走「Free download / 下载」类免费按钮，**明确避开** All Access / 试用 / 价格等付费入口；下载完成后向用户确认文件已到手

## Apply Plan
1. Keep this reconstructed draft as the approval artifact.
2. Record the proposal content exactly as shown in the interactive card.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-08-11-english-page-chinese-guidance
- Reject: 拒绝 evo-2026-08-11-english-page-chinese-guidance
## Audit Note
- Applied: 2026-08-11 00:54 (Asia/Shanghai) by AutoClaw main session
- 落点: ① F:\zprintpro-nextjs\MEMORY.md (英文页面协助偏好段) ② F:\aitoptools\AGENTS.md (待同步)
- 状态: APPROVED + APPLIED
