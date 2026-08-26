# Evolution Proposal: 将「每日任务产物落盘后先汇报数据就绪+建议恢复顺序、经确认后按预案串行恢复,并每次读取 cron 执行结果更新任务策略」固化为长期工作流规则,便于后续每日任务与定时任务复盘。

- Proposal-ID: evo-2026-08-15-daily-artifact-report-cron-review
- Status: pending
- Signature: daily-artifact-report-cron-review
- Created-At: 2026-08-15 20:48
- Last-Seen-At: 2026-08-15 20:48
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium
- Payload-Hash: 6d825e97163f3e0a7795a3393350cecd53ba1dbb52c4177e96a2a652b2ef95e2
- Content-Hash: a0779b5ac222414dbedc816000feb51b89245042dc678279b6a0b5b31703517d

## Why This Matters
- 将「每日任务产物落盘后先汇报数据就绪+建议恢复顺序、经确认后按预案串行恢复,并每次读取 cron 执行结果更新任务策略」固化为长期工作流规则,便于后续每日任务与定时任务复盘。

## Evidence
- Interactive proposal card was present in the session UI.
- Main recorded this pending draft before any approval action.
- Approval and rejection use the Main-owned proposal record, not a later renderer payload.

## Duplicate Check
- Checked: Main-owned proposal signature and immutable payload hash
- Result: pending authority record created
- Decision: only the recorded payload may transition this proposal

## Proposed Change
### 记忆 (MEMORY.md)

# MEMORY.md

## 每日任务产物与定时任务复盘规则

- **产物落盘后先汇报**: 每日任务产物落盘后,先向用户汇报「数据就绪 + 建议恢复顺序」,经用户确认后按预案串行恢复,不自行跳过确认直接执行。
- **定时任务必复盘**: 每次读取每个定时任务 (cron) 的执行结果,按数据与结果更新任务和策略,而非只跑不管。

## Apply Plan
1. Keep this Main-owned draft as the approval artifact.
2. Apply exactly the payload bound to this draft after user approval.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-08-15-daily-artifact-report-cron-review
- Reject: 拒绝 evo-2026-08-15-daily-artifact-report-cron-review