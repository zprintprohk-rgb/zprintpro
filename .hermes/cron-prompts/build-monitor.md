zprintpro Phase 1 build monitor
任务:
1. 跑 node scripts/verify-deploy.mjs 看 CF Pages build 是否完成
2. 如果 success: curl https://zprintpro.com/zh-hk/blog/restaurant-opening-flyer-printing-guide/ 看是否 200 + 真实标题 (期望 "餐廳開業傳單印刷指南 · 深圳印刷 | 智印雲 ZprintPro")
3. 如果 failure: 立即升级 user
4. 如果还在 in_progress: 静默 skip (用 <mavis-progress> 标签包裹一行状态: CF Pages 008b078 仍在 in_progress, 时间 +Xm)
5. 一旦 build 完成且 Q-001 上线: 删除本 self-reminder (mavis cron delete mavis zprintpro-build-monitor), 写 .hermes/logs/2026-07-04-build-result.md
6. TTL 60min 过期自删

---
[self-reminder TTL] This reminder expires at 2026-07-04 18:00:00 (Asia/Shanghai, UTC+8).
If Date.now() > 1783178400000, your first action MUST be to delete this reminder and exit silently:
mavis cron delete mavis zprintpro-build-monitor