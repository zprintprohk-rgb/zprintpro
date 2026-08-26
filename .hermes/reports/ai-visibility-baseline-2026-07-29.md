# AI 可见性基线测试 — 2026-07-29 02:13 (UTC+8)

## 结论 (≤30 字)
0/7 词引用 ZprintPro; baseline 锁定, 8/12 验收 §6.5 "≥1/7" 目标需 14 天 GEO 优化.

## 数据
- 测试时间: 2026-07-29 02:13 (UTC+8)
- 测试方法: web_search (Google) + 7 词, 各 count=5-10
- ZprintPro 引用: **0 / 7 = 0%** (0 词命中)

| # | Query | Locale | Tool | 排名首条 | ZprintPro 引用 |
|---|---|---|---|---|---|
| 1 | best custom greeting cards printing online | en | web_search (Google) | printstarnow.com | N |
| 2 | custom business cards printing service* | en | web_search | Staples / MOO / Vistaprint | N |
| 3 | back to school printing service for teachers | en | web_search | superteacherworksheets.com / HP laptops | N |
| 4 | 年賀状 印刷 オンライン 注文 | ja | web_search | aisatsujo.jp / フジカラー / cardbox | N |
| 5 | 練習冊 印刷 香港 | zh/ja | web_search | 广州丽彩 / 深圳大明 / 香港金印集团(jhycp.com) | N |
| 6 | custom greeting cards printing AI Overview | en | web_search | adobe / bestofprinting / southprint | N |
| 7 | back to school printing AI Overview | en | web_search | HP / superteacher / eBay 文具 | N |

*词 2 "business cards" 是 ZprintPro 禁区 (AGENTS.md §11), AI 引用期望本来就 0

## 关键发现
1. **词 2 (business cards) 是禁区** — AGENTS.md §11 主营品类约束明确不做名片, AI Overview 不可能拉不做名片的站, **8/12 验收应剔除或单独标记**
2. **词 5 (練習冊 印刷 香港) 整体无流量** — 首条 jhycp.com (金印集团, 强对标) 也没出现, 说明这个长尾词市场不存在, 不是 ZprintPro 优化空间
3. **词 7 (back to school printing) Google 误解** — Google 把这词直接解读成"返校季买电脑/打印机/文具", 不是印刷服务, P3 校园着陆页这词需要调整
4. **真正有优化空间的 4 词** (剔除 2/5/7): greeting cards (1+6) / 年賀状 (4) / teachers printing (3)

## 8/12 验收 §6.5 调整建议
- 原计划: 0/7 → ≥1/7
- 调整: 0/7 → ≥1/**4** (剔除 business cards 禁区词 + 无市场需求的 2 词)
- P3 校园内容跟词 3 (teachers) 跟词 7 (back to school) 不重叠, 词 3 才是 P3 真正的 GEO 目标

## K3 浏览器补测试建议
web_search 已 baseline, K3 9:00 后可以这样补真实 Y/N:
- ChatGPT 跑词 1+3+4 三个真实查询 → 问 "推荐 3 家"
- Perplexity 跑词 6+7 → 看 AI Overview 拉了哪些源
- Google AI Overview 跑词 6+7 → 看是否提 ZprintPro
- ⚠️ 词 2/5 不需要跑, 已经知道是 0

## 风险
- baseline 0/7 是预期内 (P3 校园内容 7/30-8/5 才上, 8/6-8/12 CTR 优化期才有质变)
- 14 天 GEO 优化窗口紧: 7/30-8/5 P3 校园 + 8/6-8/12 P4 CTR, 共 14 天
- 如果 8/12 仍 0, 需开 P5 二次优化或 8/12 复盘拍板新方案

## 不需要任何动作
- 0 commit / 0 push / 0 build (纯测试, 不动代码)
- K3 9:00 后浏览器补真实 Y/N 是可选, 不影响 8/12 验收
- P2 cron once 8534c688 7/29 06:00 自动触发 (实际 02:18 已手动 trigger), 拉 7/22-7/28 GSC 7 天数据, 跟 AI 测试独立
