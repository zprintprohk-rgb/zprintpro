# 8/6 1:45 T1 4 CTR 狙击 verify — PARTIAL (3/5 PASS, 修漏在 CF build)

## 结论
**5-min verify FAIL: 3/5 PASS, 2/5 FAIL** (Blog 3 locale 标题未更新)。
**根因**: T1 664f9e3 改了 `blog-data/{zh-hk,en,ja}.json` 但漏改 `src/data/blog-posts.ts` 的 `lpSameDayFlyersHK` BlogPostMeta title/excerpt — Blog 详情页 title 源在 `blog-posts.ts` (BlogPostMeta.title[locale])，不是 blog-data JSON。

## 8/6 0:39 T1 664f9e3 (✅ deployed, 3/5 PASS)
| # | URL | 期望关键词 | 实测 | 状态 |
|---|-----|----------|-----|-----|
| 1 | /zh-hk/product/pvc-menus/ | 餐牌印刷 + 智印港 | "PVC 餐牌印刷 · 防水防油覆膜 50本起 \| 餐廳/咖啡店/酒吧菜單 \| 智印港 ZprintPro" | ✅ PASS |
| 2 | /ja/product/double-sided-flyers/ | 両面カラー印刷 | "両面カラー印刷 両面チラシ \| 両面フルカラー 100枚〜 翌日発送 \| ZprintPro" | ✅ PASS |
| 3 | /zh-hk/blog/same-day-flyers.../ | 即日印刷・ | "即日宣傳單張印刷指南 · 香港餐廳開業 / 活動速遞方案 \| 智印港 ZprintPro" | ❌ FAIL (缺 "即日印刷・" 前缀) |
| 4 | /en/blog/same-day-flyers.../ | Same Day Printing | "Same-Day Flyer Printing Guide · 4-6hr Rush Turnaround for US Small Business \| ZprintPro" | ❌ FAIL (缺 "Same Day Printing" 前缀) |
| 5 | /ja/blog/same-day-flyers.../ | 即日印刷・ | "即日チラシ印刷ガイド · 4-6時間特急納品 日本の中小企業向け \| ZprintPro" | ❌ FAIL (缺 "即日印刷・" 前缀) |

## 8/6 1:45 修漏 commit 95d24ce (pushed, CF build in_progress)
- 1 file 6+/6-:
  - `src/data/blog-posts.ts` (lpSameDayFlyersHK BlogPostMeta title + excerpt 3 locale)
- pre-commit checks 全过 (UTF-8 LF, 0 简体字)
- CF Pages check-runs status=in_progress (started 17:46:36Z = 01:46:36 CST)
- 6 min self-reminder set: once-c1c2c7, 5 URL re-verify + 升级 K3

## 数据流教训 (跨项目可复用)
- **PDP vs Blog title 源不同**:
  - PDP: `src/data/sku-seo-data.ts` (skuSeo) > `src/data/products.ts` (name/title_zh) fallback
  - Blog: `src/data/blog-posts.ts` (BlogPostMeta.title[locale]) > `src/data/blog-data/{locale}.json` (仅 content body)
- **"fix all X" 类 commit 必 grep 全 src/ 找 isEn/locale==='en' 模式**: T1 改了 blog-data 但漏 blog-posts，下次先 `Select-String -Path src/data -Pattern "<slug>"` 全文件清单
- **3 文件同步铁律 (Blog 详情页 / 列表页 / JSON)**:
  - src/data/blog-posts.ts (BlogPostMeta title + excerpt)
  - src/data/blog-data/{zh-hk,en,ja}.json (content body)
  - src/app/[locale]/blog/[slug]/page.tsx (posts 对象 legacy — 新版已走 blog-posts.ts)

## 后续
- 6 min 后 once-c1c2c7 触发 verify 5/5
- 若 5/5 PASS: 写 .hermes/k3-inbox/2026-08-06-T1-4ctr-snipe-verify-PASS.md (T1 + T1-r2 2 阶段汇总)
- 若任一 FAIL: 立即修 + push
- T2 (cron 治理) + T4 (matrix ctr_target) 已在 commit 3d029f1 落地 (check-runs pending, 应该是 incremental cache 0s)
- T3 (10:15 daily cron auto packaging Pillar v8) 等 cron 触发

## Push quota 计数 (8/6 1:45)
- 664f9e3 T1 src/data 4 file (1 build)
- 3d029f1 T2+T4 .hermes/ 3 file (1 build, incremental cache 应该 0s)
- 95d24ce T1-r2 src/data 1 file (1 build, in_progress)
- 今日累计 3 push / 月度 23/500 (4.6%)

K3 — 漏修已 push，6 min 后会齐 5/5，详见 once-c1c2c7 触发报告
