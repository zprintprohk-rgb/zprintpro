# 2026-10-26 products.ts C4 价格架构分析包 — 三语跨语不一致根因 + A/B/C 方案

> 执行依据: K3「穷尽 100% 能力分析研究后继续执行 NEXT 清单」· 本包只做分析与方案, **不动 products.ts** (C4 K3-only)
> 数据来源: products.ts 全量 dump (31 SKU) + price-tables/{books,posters,flyers,stickers}.json 全档 dump + sku-seo-data.ts + title-v5-audit-2026-10-25.json

## VERDICT
C4 域发现 **3 个结构性硬伤** (客户可见/机器可测) + **1 个系统性模式** (多市场定价, 需 K3 定口径):
1. **a2-posters price_range 'HK$95-1,017' 无任何档位支撑** (编造带) — qty10=160/qty300=656, 95 与 1,017 均非档位值
2. **a1-posters basePrice 20 无档支撑** (qty1=45, qty200=29, 无 20 档)
3. **white-card-boxes basePrice 129 = 500 个整批价** (非单件) — basePrice 语义在全站不统一 (多数=单件价 0.25/6/40, 此=整批 129)
4. **多市场定价模式**: zh 带 (HKD 独立) vs en/ja (en USD × 135-140 换算) — 同规格跨语价差 2-13 倍 (a5-flyers zh 0.35 HKD vs ja ¥50=2.56 HKD 差 7x; textbooks zh 24 HKD vs en 9.2 USD=71.8 HKD 差 3x)

## 证据 (双方法: products.ts vs price-tables 校准档)

### 方法1: products.ts 三语字段 (31 SKU dump)
| SKU | price_range | basePrice | basePrice_en | basePrice_ja | minQ |
|---|---|---|---|---|---|
| saddle-stitch-booklets | HK$6-32/本 | 6 | 1.84 | 258 | 10 |
| perfect-bound-books | HK$16-80/本 | 16 | 4.6 | 644 | 10 |
| hardcover-books | HK$40-240/本 | 40 | 13.8 | 1932 | 10 |
| graduation-yearbook | HK$45-180/本 | 45 | 10.35 | 1350 | 1 |
| textbooks | HK$5-50/本 | 24 | 9.2 | 1288 | 100 |
| exercise-books | HK$4-16/本 | 4 | 1.84 | 258 | 10 |
| a2-posters | **HK$95-1,017** | 16 | 2.3 | 300 | 10 |
| a1-posters | HK$290-7,200·噴繪 | 20 | 4.6 | 600 | 1 |
| a5-flyers | HK$0.25-0.65/張 | 0.25 | 0.4 | 50 | 10 |
| a4-flyers | HK$0.35-0.95/張 | 0.35 | 0.55 | 70 | 10 |
| same-day-flyers | HK$0.55-1.50/張 | 0.55 | 0.95 | 125 | 10 |
| folded-leaflets | HK$0.70-1.95/張 | 0.7 | 0.8 | 110 | 10 |
| small-batch-stickers | HK$38-120/A4 | 38 | 0.55 | 69 | 10 |
| roll-stickers | HK$0.20-5.50/張 | 0.2 | 0.03 | 4 | 10 |
| folding-boxes | HK$2.5-15/個 | 2.5 | 0.51 | 69 | 100 |
| rigid-boxes | HK$8-42/個 | 8 | 1.84 | 240 | 100 |
| mailer-boxes | HK$3.5-10/個 | 3.5 | 0.8 | 105 | 100 |
| kraft-paper-bags | HK$3-8/個 | 8 | 1.84 | 240 | 100 |
| white-card-bags | HK$5-12/個 | 12 | 2.76 | 360 | 100 |
| gift-bags | HK$10-20/個 | 20 | 4.6 | 600 | 100 |
| red-packets | HK$1.10-4.80/個 | 1.10 | 0.46 | 64 | 100 |
| envelopes | HK$0.22-1.80/個 | 0.22 | 0.14 | 20 | 100 |
| doujinshi-printing | ¥7,500〜/部 | 7500 | 1245 | — | 10 |

### 方法2: price-tables 校准档全 dump (关键行)
- **posters A2 157g 單面**: qty10=160(16/張) → qty50=450(**9.0/張**) → qty100=5.61 → qty300=2.19 — 「HK$9 起」= qty50 档 ✓ 真实; **95 与 1,017 无档**
- **books A4 8P 騎釘**: qty10=185(18.5/本, modeled 待校準) → qty100=970(**9.7/本, anchor-0.97 cal 7/24**) → qty500=1311(2.62) → qty5000=5956(1.19) — 校准大档 9.7@100/2.62@500; **zh 带 6-32 下限 6 无档位支撑** (校准带 1.19-9.7)
- **flyers A5 157g**: qty10=79.5(7.95/張, modeled 待校準) → qty100=125(**1.25/張, anchor cal 7/20**) → qty1000=0.347 → qty5000=0.137 — 校准大档 0.137-1.25; **zh 带 0.25-0.65 下限 0.25 无档位支撑** (0.197@2000 / 0.347@1000 之间)
- **stickers 60×30mm**: qty10=66(6.6/個, modeled) → qty500=0.686 → qty1000=0.346 (intuan 7/18) — 校准 0.346@1000
- **A1 噴繪 qty1=45 / 相紙 qty1=56** (posters.json) — 与 a1 title「HK$45起」一致 ✓

### 双方法结论
| 项 | products.ts | 校准档 | 判定 |
|---|---|---|---|
| a2 price_range 95-1,017 | 编造带 | 无 95/1,017 档 | **硬伤 (K3 校准)** |
| a1 basePrice 20 | 20 | 无 20 档 (45/29) | **硬伤 (K3 校准)** |
| white-card-boxes basePrice 129 | 整批 500 个 | 129=500×0.258 | **basePrice 语义不统一** |
| saddle zh 6 起 | 带下限 6 | 校准 9.7@100/2.62@500 | 带下限=营销区间 (无档) |
| a5 zh 0.25 起 | 带下限 0.25 | 校准 1.25@100/0.347@1000 | 同上 |
| ja 全系 | en×140 | — | 统一模式 ✓ (非错误) |
| textbooks zh 24 vs en 9.2 | 3x 价差 | — | 多市场定价 (需 K3 口径) |

## 根因链
1. **price-tables 双态**: qty10-99 = modeled 待校準模型值 (不可信为真价) / qty100+ = anchor/intuan 校准真值 — 线上 PDP 批价行 (qty10 整批 160/179/308) 用的正是待校準值
2. **products.ts 带 = 营销区间** (非档位带): 带下限 (6/0.25/9) 多为「常见批量价」非最低档 (qty300 A2=2.19 更低)
3. **basePrice 锚语义不统一**: 单件价 (多数) vs 整批价 (white-card-boxes 129) vs A4 尺寸价 (small-batch-stickers 38) — **title-v5 guard 对照 basePrice 判 PRICE_MISMATCH 的根因** (HARD 7 中至少 3 项源于锚口径)
4. **A/B 类孤儿 (blog 8+5 篇) 全部归因此根因**: A 类币种串 = 跨语显示未本地化 (值本身 zh 带/en 换算); B 类 = 低于带下限或无 SSoT (kraft 0.5-0.8 无 SKU/ school-exercise 2.8<4 / poster-price 6<9 / marathon A3 无档 / folding 0.85<2.5)

## 方案 (供 K3 拍板)
**方案 A (推荐, 最小改动 + 多市场价保留)**:
1. a2 price_range 校准为真实带: 'HK$9-656' (qty50 9/張 ~ qty300 整批 656) 或 'HK$16-656' (起批 16) — K3 选口径
2. a1 basePrice 20 → 45 (qty1 真实) — 同时 title-v5 guard 对 a1 判 mismatch 消除
3. white-card-boxes basePrice 129 → 0.5 (单件价, 与 price_range 0.5-3 一致)
4. blog A 类 8 篇: 按各语 SSoT 本地化 (ja = en×140 换算表, zh = HKD 带) — 提供完整换算表执行
5. blog B 类 5 篇: 逐个校准 — kraft (0.5-0.8 有真实大档则标注数量, 无则撤) / school-exercise (2.8-3.5 → 4-16 带) / poster-price (6 → 9) / marathon (A3 撤价) / folding (0.85-1.45 → 2.5-15 带)
**方案 B**: 全站统一全球价 (zh=en 换算) — 动 products.ts 全部价格带, 大改, 市场本地化丢失
**方案 C**: 只修硬伤 1-3 (a2/a1/white-card) + B 类孤儿, A 类币种串暂缓 — 最小范围

## NEXT (K3 拍板后执行)
- 选定方案 → 我执行 (products.ts 改动 + blog 批量本地化 + title-v5 复检)
- lane 缺口 (weekly-meta/gsc-feedback 10-25 未触发) 需管理员查 Task Scheduler
