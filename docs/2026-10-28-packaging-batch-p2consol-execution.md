# 2026-10-28 data-driven 三市场小批 + P2-CONSOL-01 落位报告

> 角色：ZprintPro 首席 SEO/AEO/GEO 数据战略分析师
> 依据：`docs/2026-10-28-data-driven-next-phase-strategy.md` §7 立即执行顺序 + `docs/2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md` P2-CONSOL-01
> 数据来源：GSC 2026-10-26 冻结导出（`.hermes/logs/gsc-deep-analysis-2026-10-26.json`）+ 线上探针 + `src/data/products.ts` 价格真值表（commit 记录见各 commit）

## 一、P2-CONSOL-01 落位（K3 拍板方案 A，commit 5e8e220c）

**决策**：保留 `packaging-box-pricing-2026` + 301 `packaging-box-price-2026`（K3 11:10 拍板方案 A）

| 动作 | 文件 | 验证 |
|---|---|---|
| 301 映射（三语） | `src/middleware.ts` RETIRED_BLOG_REDIRECTS + 优先级 2.66 | middleware 含 price-2026 301 ✓ |
| 三语删文 | `src/data/blog-data/{en,zh-hk,ja}.json` | 键删除 + JSON 可解析 + 键数校验 ✓ |
| 引用收拢 | `blog-posts.ts`（对象+导出）+ `blog-m3-images.ts`（图片键） | count=1 校验 ✓ |
| sitemap 重生成 | `public/sitemap*.xml`（6 文件） | 不含 price-2026 ✓ + 顺带补 comiket-c109 真实页 ✓ |

门禁：tsc 54 / title-v5 HARD 7→3（消除 4 处 PRICE_MISMATCH）/ brand 0 / gsc-leak 0

## 二、data-driven 三市场小批 #1（zh 海报/食品包装、en small-batch、ja C109）

### 2.1 en small-batch stickers（页面级实验，GSC 49 展示/0 点击 pos 4.77）

| 修复 | 改动 | 真值来源 |
|---|---|---|
| title MOQ 50→10 + 价格 $0.045→$0.55 | `Small Batch Stickers from $0.55 | 10pcs | ZprintPro`（当量 51） | products.ts minQuantity=10 / basePrice_en=0.55 |
| desc MOQ/价格 | `from 10 pcs at $0.55/pc (A4 sheet)` | 同上 |
| ja desc 币种 + MOQ | `10 枚〜 ¥69/枚〜` | basePrice_ja=69 |
| zh desc MOQ + 价格口径 | `10 張起印 HK$38/A4` | basePrice=38（A4 口径） |
| zh title 价格口径 | `HK$38/A4` | 同上 |

### 2.2 zh 海报（zh-hk 主攻，海报簇 1,492 展示/5 点击）

| 修复 | 改动 | 真值来源 |
|---|---|---|
| a1-posters zh title | HK$45→HK$20 | basePrice=20 |
| a2-posters zh title | HK$9→HK$16 | basePrice=16 |

（en/ja 海报 title 已对齐：a1 $4.60/¥600、a2 $2.30/¥300 ✓）

### 2.3 zh 食品包装（zh-hk 主攻，食品簇 358 展示）

| 修复 | 改动 | 真值来源 |
|---|---|---|
| food ja desc 币种 | HK$2.5→¥101 | basePrice_ja=101 |
| food en desc 币种/价格 | HK$2.50→$0.74 | basePrice_en=0.74 |

（zh food title HK$2.5 = price_range 真值 ✓；en title 100 MOQ $0.74 ✓ D8-D10 已对齐）

### 2.4 ja C109（时间窗 2026-12-29 至 12-31）

**审计结论：已达标，无需改动**（页面含締切逆算 3 计划表 + 入稿检查清单 + 品目价格表 + 搬运/收件指导；禁编造截断/日本直送/价格承诺已遵守——`src/app/[locale]/comiket-c109/page.tsx` 头部真值口径注释）

### 2.5 zh 纸袋族（zh-hk 主攻，审计确认）

white-card/eco/kraft-paper-bags/kraft-paper-packaging-box 三语 title 价格全部与 basePrice 对齐（HK$12/$2.76/¥360、HK$8/$1.84/¥240、HK$8/$1.84/¥240、HK$5/$1.15/¥150 ✓）——**无冲突**

## 三、复测登记（data-driven §3 第 8 条）

| URL | 上线日 | 冻结窗口 | 基线（GSC 10-26 冻结） | 下一检查日 | 成败条件 |
|---|---|---|---|---|---|
| /en/product/small-batch-stickers/ | 2026-10-28 | 2 周 | 49 展示/0 点击 pos 4.77 | 11-11（7 天）/ 11-25（28 天） | 7 天：技术+真值通过；28 天：点击 >0 且 pos ≤4.7 → SCALE，零点击 → FIX |
| /zh-hk/product/a1-posters/ | 2026-10-28 | 2 周 | 海报簇 1,492 展示/5 点击 | 11-11 / 11-25 | 7 天：词页匹配复查；28 天：点击升 → SCALE，未升 → FIX（审词页匹配） |
| /zh-hk/product/a2-posters/ | 2026-10-28 | 2 周 | 同上（簇级） | 11-11 / 11-25 | 同上 |
| /zh-hk/product/food-boxes/ | 2026-10-28 | 2 周 | 食品簇 358 展示/0 点击 | 11-11 / 11-25 | 28 天：点击 >0 → SCALE |
| /ja/comiket-c109/ | 已上线（审计达标） | — | 同人誌簇 170 展示/0 点击 pos 19.06 | 11-25（28 天） | C109 前点击/询盘信号 + 技术通过 |

## 四、watch 登记

- **传单族（same-day-flyers/thick-paper-flyers/folded-leaflets/a4-flyers/a5-flyers）zh title 价格**：products.ts basePrice=0（无对照）——zh HK$1.30/0.45/0.70/0.35/0.25 与 en basePrice_en（$0.95/0.7/0.8/0.55/0.4）口径不匹配——**待 K3 真值统一，不猜值**
- **food-boxes basePrice=2 vs price_range HK$2.5-18**：title 用 2.5（price_range 真值）——base=2 口径过时——**待 K3 统一**
- **七簇移交项（纸袋 FDA/SGS/FSC 文件取得 + FreeSampleBanner 免费打样）**：业务动作，继续挂账
- **ja 泛企业 H1 ×16（rigid 之外）**：watch 逐 SKU 修

## 五、状态

- P2-CONSOL-01：✅ 已拍板已落位（301 上线待 CF build 验证）
- data-driven 三市场小批 #1：✅ 完成（9 处真值修复 + C109 达标审计 + 复测登记）
- 门禁：tsc 54 / title-v5 HARD 3（存量）/ brand 0 / gsc-leak 0
- 下一批：push ≥11:31（含 P2-CONSOL-01 + 三市场小批 + docs 批）
