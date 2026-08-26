# Evolution Proposal: 用户明确要求定时任务用中文命名、合并后删除旧任务并保持清单干净（"指令不听不执行"暴露清理规则缺失），沉淀为长期 cron 管理规则。

- Proposal-ID: evo-2026-08-09-cron-chinese-naming-cleanup
- Status: approved
- Signature: cron-chinese-naming-cleanup
- Created-At: 2026-08-09 17:03
- Last-Seen-At: 2026-08-09 17:03
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium

## Why This Matters
- 用户明确要求定时任务用中文命名、合并后删除旧任务并保持清单干净（"指令不听不执行"暴露清理规则缺失），沉淀为长期 cron 管理规则。

## Evidence
- Interactive proposal card was present in the session UI.
- The original pending draft file was unavailable at approval time.
- AutoClaw reconstructed this draft from the proposal payload so the review result can still be recorded.

## Duplicate Check
- Checked: pending draft path + signature/proposal fallback
- Result: original draft file missing
- Decision: create surrogate draft from proposal payload

## Proposed Change
### MEMORY.md（定时任务命名与清理规则）

# MEMORY.md

## 定时任务管理（2026-08-08 user 拍板 · evo-2026-08-08-cron-unify-autoclaw）

- 定时任务一律由 AutoClaw cron 统一管理，逐步取代 Hermes/mavis 的定时任务，避免双系统重复触发
- 调度时间一律避开高峰期（高负载/高峰时段），新建或合并 cron 前先读取 Hermes 现有定时任务清单比对查重
- 项目级执行细则见各项目 AGENTS.md（aitoptools 已落地：cron 10→4 合并 + 路径铁律 + 幂等防双跑，见 F:\aitoptools\.hermes\logs\cron-merge-20260808.md）

## 定时任务命名与清理（2026-08-09 user 拍板）

- cron 任务名称一律用中文命名，并写明作用与功能，让用户一眼看懂每个任务在做什么（不要用难懂的英文缩写/代号）
- 合并 cron 后必须立即删除被替代的旧任务和不需要的任务，不得遗留重复或混乱条目；清理完成后向用户汇报最终清单供确认

## Apply Plan
1. Keep this reconstructed draft as the approval artifact.
2. Record the proposal content exactly as shown in the interactive card.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-08-09-cron-chinese-naming-cleanup
- Reject: 拒绝 evo-2026-08-09-cron-chinese-naming-cleanup
## Audit Note
- Applied: 2026-08-09 17:05 (Asia/Shanghai) by AutoClaw main session
- 落点: ① F:\zprintpro-nextjs\MEMORY.md (定时任务命名与清理段) ② F:\aitoptools\AGENTS.md (cron 中文命名铁律) ③ 4 个 cron 已于 8/9 17:01 中文命名
- 状态: APPROVED + APPLIED
