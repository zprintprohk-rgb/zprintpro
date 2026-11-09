# §7 第 4 行 MEASURE 证据补齐：宣傳單張 / 書刊印刷（11-09，供 11-14 复测）

> 依据：`2026-11-07-three-market-seo-aeo-geo-flywheel-strategy.md` §7 第 4 行（检查索引、意图、承接与页面变更；11-14 复测）· `74ffa5a9`（宣傳單張价格已修）
> 性质：测量证据。零 src 改动。

## 一、宣傳單張 / 宣傳單張印刷（query×page×country，09-30..10-27）

| URL | 国家 | imp | clk | pos |
|---|---|---:|---:|---:|
| **/zh-hk/category/flyers/**（主承接） | hkg | 106 / 98 | 0 | 32.71 / 28.84 |
| **/zh-hk/product/a4-flyers/** | hkg | 16 | 0 | **13.81**（最接近首页） |
| same-day-flyers / a5-flyers | hkg | 5 / 4 | 0 | 38 / 60 |

- 线上（200）：flyers category title 当量 **59**（超带 1，与 stickers 104/ja stickers 83/books-category n/a 同入「title 超带待批族」）；desc 156 ✅；`10張起` 在位 ✅（74ffa5a9 价格真值已上线）。
- 判定：**MEASURE 维持**。主承接=category，但最深可达页其实是 a4 PDP（13.81）——与海报（blog 9.78 vs category 61.7）**不同构**：flyers 簇是「category 主承接但双页都深」，无 blog 抢词。禁 301/canonical；无 snippet 单变量提案（先等 11-14 同窗）。

## 二、書刊印刷 / 印書（同档）

| URL | imp | pos |
|---|---:|---:|
| **/zh-hk/blog/book-buying-guide/**（第一） | 92 / 51 | 30.41 / 32.39 |
| **/zh-hk/category/books/**（第二） | 90 / 47 | 55.08 / 46.32 |
| catalog-printing / saddle PDP 等无关页 | 10-41 | 43-77 |

- 线上：books category title 当量 **57 ✅ 带内**；desc 141。
- 判定：**双页均深位（30+）**，无任何页面贴近首页 → 纯 MEASURE；与 10-31 战略「書刊 blog 45.5% 承接」一致。11-14 只复测，无动作。

## 三、对 11-14 复测 runbook 的增补

- 本两簇纳入 `.hermes/_retest_1114.cjs` 已注册查询集（宣傳單張/書刊印刷 已在 QC_QUERIES）；页级份额如需 flyers category 份额，复测日以 qp 档同法计算。
- confounders 提醒：74ffa5a9（宣傳單張价格）已上线，复测若见 CTR/imp 变化须按「价格修复 + 窗口移动」双因素记录，不单归因。

## 数据来源

- `GSC数据/money-kw-query-page-country-2026-10-31.csv`（本轮归因）
- `.hermes/logs/gsc-2026-11-09-flyers-books-attribution.json` + `-live.json`（本轮落盘）
- 线上 UA fetch（2026-11-09 20:1x）
