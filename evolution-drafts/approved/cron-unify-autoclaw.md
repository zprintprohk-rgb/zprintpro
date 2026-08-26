# Evolution Proposal: 将「定时任务一律由 AutoClaw cron 统一管理、取代 Hermes 定时任务并避开高峰期」的用户决策沉淀为长期规则，防止后续双系统重复建任务。

- Proposal-ID: evo-2026-08-08-cron-unify-autoclaw
- Status: approved
- Signature: cron-unify-autoclaw
- Created-At: 2026-08-08 02:16
- Last-Seen-At: 2026-08-08 02:16
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium

## Why This Matters
- 将「定时任务一律由 AutoClaw cron 统一管理、取代 Hermes 定时任务并避开高峰期」的用户决策沉淀为长期规则，防止后续双系统重复建任务。

## Evidence
- Interactive proposal card was present in the session UI.
- The original pending draft file was unavailable at approval time.
- AutoClaw reconstructed this draft from the proposal payload so the review result can still be recorded.

## Duplicate Check
- Checked: pending draft path + signature/proposal fallback
- Result: original draft file missing
- Decision: create surrogate draft from proposal payload

## Proposed Change
### MEMORY.md（定时任务统一管理规则）

# MEMORY.md

## 定时任务管理（2026-08-08 user 拍板）

- 定时任务一律由 AutoClaw cron 统一管理，逐步取代 Hermes/mavis 的定时任务，避免双系统重复触发
- 调度时间一律避开高峰期（高负载/高峰时段），新建或合并 cron 前先读取 Hermes 现有定时任务清单比对查重

## Apply Plan
1. Keep this reconstructed draft as the approval artifact.
2. Record the proposal content exactly as shown in the interactive card.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-08-08-cron-unify-autoclaw
- Reject: 拒绝 evo-2026-08-08-cron-unify-autoclaw
## Audit Note
- Applied: 2026-08-08 02:26 (Asia/Shanghai) by AutoClaw main session
- 落点: ① F:\zprintpro-nextjs\MEMORY.md (新建, 提案 Target) ② F:\aitoptools\AGENTS.md 定时任务统一管理铁律 (项目级可执行) ③ aitoptools commit a752075 (攒批未 push)
- 状态: APPROVED + APPLIED
