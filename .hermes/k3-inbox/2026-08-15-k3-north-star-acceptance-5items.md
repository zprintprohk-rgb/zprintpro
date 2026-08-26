# K3 北极星首个验收日手测报告 · 5 项 (2026-08-15 补执行)

> **触发**: 8/12 22:00 北极星首个验收日手测清单 (cron c21196df 提醒 + user "现在执行")
> **执行时间**: 2026-08-15 19:20 Asia/Shanghai (补跑, 数据窗口 8/6-8/12)
> **数据源**: CF API (token 有效) / Supabase REST (凭据缺失, 见 ①) / GSC 7d CSV / 生产站点 curl / web_search 近似
> **判定**: ② PASS · ⑤ PASS · ③ FAIL · ④ FAIL · ① BLOCKER (需 K3 提供凭据)

---

## ① Supabase quotes 表询盘计数 — BLOCKER (凭据缺失)

| 项 | 结果 |
|---|---|
| 本机 SUPABASE_SERVICE_ROLE_KEY | ❌ 无 (.env / .env.local 均无; 历史记录确认 M3 无 key, K3 8/7 18:22 授权未部署) |
| Supabase 项目 | hgexjbscqopiqoyxpcae.supabase.co (zprintpro-production) |
| 生产写入链路验证 | ✅ POST /api/quote → 200 + UUID `dfefd14a-0151-4619-8a9c-b8cd54d32642` (created_at 2026-08-13T20:14:33Z, 落库成功) |
| 待剔除 smoke 记录 | 4892080c (8/8 04:35 Autoclaw Smoke) / 748ce36d (Autoclaw Smoke) / fae355ba (8/7 M3 prod verify) / dfefd14a (本次 walkthrough) |
| 真实询盘 ≥5 判定 | ⛔ 无法自动核验 — 需 K3 在 Supabase dashboard 查 quotes 表 count 或提供 service role key |

**升级 K3**: 提供 `SUPABASE_SERVICE_ROLE_KEY` (写入 F:\zprintpro-nextjs\.env) 后我可自动拉取真实 count; 或 K3 dashboard 截图核验。

## ② CF Bulk Redirect List enabled — ✅ PASS

| 检查项 | 结果 |
|---|---|
| List 存在 | ✅ `z_printpro_legacy_301` (id 02bad76e..., kind=redirect, 149 条) |
| Ruleset 启用 | ✅ `http_request_redirect` (id 6ad7203a...) 规则 `http.request.full_uri in $z_printpro_legacy_301`, action=redirect, **enabled=True** |
| 规则内容抽样 | ✅ www.z-printpro.com/ → zprintpro.com/zh-hk/ (301); contact-us.html → /zh-hk/contact/; help-center.html → /zh-hk/help-center/; brochure-knowledge → /zh-hk/category/books/ 等 6 条正确 |
| 目标页可达 | ✅ zprintpro.com/zh-hk/ 200, /zh-hk/contact/ 200 |
| 附注 | 本机访问 www.z-printpro.com 报错 (旧域解析/网络受限), CF 配置层已确认 enabled |

## ③ 4 引擎 AI 引用自测 — ❌ FAIL (0/4, 期望 ≥1/4)

| 引擎 | 查询词 | 引用 zprintpro.com? | 实际头部结果 |
|---|---|---|---|
| Perplexity | 香港化妆品包装盒定制 | ❌ NO | flintgift / jyxpackaging / nyyxbz / holidaypac |
| ChatGPT | Custom packaging boxes for small business USA | ❌ NO | boxup / packlane / vistaprint / arka |
| Claude | 両面カラー印刷 おすすめ | ❌ NO | monotaro / kakaku / my-best |
| Gemini | 月曆印刷 香港 2027 | ❌ NO | chishingcal / bynock / e-print / taicheong |

**判定**: 0/4 引用 = FAIL。注: 本自测用 web_search 近似 (非真实 4 引擎账号对话), 建议 K3 浏览器人工复核 1 次; 但方向性结论明确 — 4 个查询首屏均无 zprintpro.com。
**正面信号**: robots.txt AI 白名单已生效 (GPTBot / OAI-SearchBot / ChatGPT-User / ClaudeBot / PerplexityBot / Google-Extended / Applebot-Extended / Bytespider / CCBot 全部 Allow); llms.txt (3560B) + llms-zh-hk.txt (10171B) + llms-ja.txt (10233B) 均 200 在线。基础设施就绪, 内容注入强度不足。

## ④ 4 CTR 词查 GSC 8/6-8/12 7d — ❌ FAIL (1/4 进 top10, 期望 ≥2)

| 词 | 7d imps | pos 8/6-8/12 | baseline pos (7/29-8/5) | 变化 | top10? |
|---|---|---|---|---|---|
| 即日印刷 | 1 | **10.0** | 15.25 | -5.25 | ✅ (临界) |
| 餐牌印刷 | 9 | 14.4 | 17.93 | -3.53 | ❌ |
| 月曆印刷 | 22 | 18.5 | 23.61 | -5.11 | ❌ |
| 両面カラー印刷 | 18 | 22.5 | 22.19 | +0.31 | ❌ |

**判定**: 1/4 进 top10 = FAIL (期望 ≥2)。但 3/4 词位置明显改善 (即日 -5.25 / 餐牌 -3.5 / 月曆 -5.1), 方向正确, 距离阈值不远。
**附**: 同窗口 top imps 词 = 月曆印刷 22 / 貼紙印刷 21 / 宣傳單張印刷 20 / 両面カラー印刷 18, 长尾流量池健康。

## ⑤ 6/6 retrofit 页面走单 — ✅ PASS

| 检查项 | 结果 |
|---|---|
| 6 slug × 3 locale 页面 | ✅ 18/18 全部 HTTP 200 (apparel-shopping-bag / baby-product-label-sticker / cmyk-guide / cross-border-ecommerce-shipping-box / paper-materials / same-day-flyers-printing-hong-kong) |
| 博客 → CTA | ✅ 每页 wa.me 5-7 处 + /zh-hk/quote/ 链接 3-4 处 (无 # / javascript:void) |
| 表单页 | ✅ /zh-hk/quote/ 200 (47KB) / en/quote/ 200 / ja/quote/ 200, 每页 form ≥2 |
| 提交 | ✅ POST /api/quote → 200 + UUID 落库 (smoke 标记 autoclaw-smoke-k3-20260814) |
| 感谢页 | ✅ 前端内联 success 状态 (zh-hk「詢價已提交!」/ en "Inquiry Submitted!" / ja「依頼を送信しました!」), 无独立 thank-you 路由 (308/404 属正常) |

**结论**: 博客→CTA→表单→提交→感谢页 全链路 6/6 走通。

---

## 汇总判定 (K3 §6 验收 5 项手测)

| # | 项 | 期望 | 实际 | 判定 |
|---|---|---|---|---|
| ① | quotes 真实询盘 | ≥5 | 待 K3 dashboard 核验 (写入链路 200+UUID ✅) | ⛔ BLOCKER |
| ② | CF Bulk Redirect List | enabled | enabled=True + 149 条 | ✅ PASS |
| ③ | AI 引用 | ≥1/4 | 0/4 | ❌ FAIL |
| ④ | CTR 词 top10 | ≥2/4 | 1/4 (即日印刷 10.0) | ❌ FAIL |
| ⑤ | retrofit 走单 | 6/6 | 6/6 全链路 | ✅ PASS |

## 路径推荐 (per review-8-12-template §9)

- **① 解锁**: K3 提供 SUPABASE_SERVICE_ROLE_KEY 或 dashboard 截图 → 立即复核真实询盘数
- **③ 修复**: llms.txt 已就位但 4 引擎 0 引用 → 8/15-8/21 增加 GEO 注入强度 (v8 标杆文末尾 llms 摘要块 + 品牌实体重复), 8/22 复盘复查
- **④ 修复**: 3/4 词已在进步轨道 → 保持 T1 狙击 + 标题/摘要 CTR 优化 (即日印刷临界 top10 优先巩固)
- **⑤ 保持**: 转化链路无回归, 8/13 起 batch 生产继续