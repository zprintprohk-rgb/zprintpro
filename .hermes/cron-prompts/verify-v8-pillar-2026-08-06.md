8/6 10:30 verify daily cron v8 packaging-box-custom-guide 跑完状态 (K3 17:24 拍板 C 8 周 60 篇 + A 选 packaging)

**verify 步骤**:
1. mavis cron get zprintpro-daily-content-1x7w (查 lastRun + 今日状态)
2. git log --oneline -3 (查今日 commit)
3. 若 commit 存在:
   a. GitHub API: https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/{sha}/check-runs (conclusion=success?)
   b. curl 24 URL: zh-hk/en/ja × 8 blog 验证 HTTP 200 (重点: packaging-box-custom-guide 4 blog × 3 locale = 12 URL)
   c. curl /zh-hk/blog/packaging-box-custom-guide/ 查 9 段结构 (h2/h3/table/CTA box/Author Bio/Sources/Disclaimer 数量 ≥ 模板 baseline)
   d. grep packaging-box-custom-guide 查 '9 段' / '重點摘要' / '關鍵洞察' 关键 v8 token
4. 若 conclusion=success + 24 URL PASS + 9 段 + v8 token: PASS, 写 K3 inbox 报告
5. 若 conclusion=failure 或 build fail: 立即升级 K3, 写 .hermes/k3-inbox/2026-08-06-1030-v8-pillar-fail.md
6. 完成后 mavis cron delete mavis <self> 自删

**TTL**: 4h (到 14:30, 超时自删)
**Self-delete after run**

Reference: .hermes/plan/blog-v8-rollout-2026-08-06-to-08-30.md §三 8/6 第 1 Pillar 改写流程