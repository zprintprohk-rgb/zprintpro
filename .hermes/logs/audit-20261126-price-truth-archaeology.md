# 价格矛盾源码考古（只读）— 四处矛盾定真值

- **日期**: 2026-11-26 · **工作区**: `F:\zprintpro-nextjs` · **HEAD**: `1e3c1e72`（2026-11-25 18:21，git status `src/` 干净 = 源码读数与 HEAD 一致）
- **任务边界**: 零 `src/` 写入；不改任何 title；无内部真值可判处标「需 K3 定价」；全文中文
- **方法**: ① Node v24 以 utf-8 全量读源码脚本 ×9（`.hermes/tmp-price-audit/audit2-10.cjs`，遵 §0.26.9 禁 PowerShell 判 CJK）；② `git log -S` / `git show` 字段引入史考古；③ `node scripts/guards/price-truth-guard.js` 实跑；④ 线上 5 URL 实测（fetch GET，2026-11-26，HTTP 200）；⑤ web 竞品对照 3 组。每条结论 ≥2 个独立方法复算（详见各表「复算」行）。

---

## 一、结论摘要（整体置信：高）

| # | 矛盾 | 一句话判定 | 置信 |
|---|------|-----------|------|
| ① | zh-hk 婚庆卡 NT$25-95 / NT$15-55 | **数据层真值错误（symbol 误写）**：`NT$` 直接存在 `products.ts` 字段里，渲染层 zh-hk 原样直出；币种方向 NT$→HK$ 已有 K3 议程 + 同批 3 个 SKU 先例背书；**basePrice 数值（1.2/0.65）与区间不同币不同量级，需 K3 重定价** | 币种判定=确定；数值=需 K3 |
| ② | en 贴纸 title $0.05 vs FAQ/PDP US$0.55 | **不是 $0.55 掉位笔误（确定）**：`$0.05` 是 2026-08-17 手写批植入的类目锚（diff 铁证：$0.23→$0.05）；$0.55 是 K3 10-28 拍板的 small-batch-stickers `basePrice_en` 真值。两者是「不同 SKU + 不同单位」的锚冲突。**11-26 live 复核：JSON-LD ItemList offers 已被 11-18「价格口径 B」改为 MOQ 实价（0.90/0.41/0.37…），$0.05 只残留在 title/desc/og 字面量**——前作 G1 审计的「JSON-LD 写 $0.05」半句与今日实测不符（见 §三-② 出入说明） | 非笔误=确定；类目锚取值=需 K3 |
| ③ | ja 小批量 hero ¥69/枚 vs HK$ 报价引擎 | **円建て口径下的数据真值 = `basePrice_ja: 69`（products.ts:976，K3 10-28 拍板对齐组，feed/GMC 同源）→ 10 枚 ¥690**；`HK$38（約700円）〜` 与价格表 HK$89/134/196 是 zh-hk 报价引擎口径（HKD）错植进自称「JPY 日本円建て」的 ja 页 —— 同一「10 枚」档两种口径相差 **~24×**。统一口径需 K3 定价 | ¥69 真值=高置信；HKD 表错植=确定；统一口径=需 K3 |
| ④ | A1 title HK$20起 vs 卡 HK$29.00-45.00 vs 价格件 HK$20.00×1 | **不存在单一错误数字——是双产线口径并存（确定）**：`HK$20` = `basePrice` 报价引擎真值（柯式线；价格件 HK$20.00×1 实为 A2 默认档）；`HK$29.00-45.00` = K3 2026-09-19 P0-2 拍板的噴繪诚实区间锚（pricing.ts:1016 带拍板注释，非 bug）。标题带价与 K3 11-13 D1/D6「标题优先无价格常青值」偏好相悖，去留需 K3 | 口径并存=确定；主锚取舍=需 K3 |

四处的**共同根因**：价格体系存在 5 层（`basePrice`/`basePrice_en`/`basePrice_ja`/`price_range`/显示锚+机层锚），各自在不同时期按不同拍板演化，叠加 per-locale「竞品对标价」设计（pricing.ts:188 注释原话），而**机审守卫不含币种符号与跨层一致性检查**（price-truth-guard 实跑 HARD=0/WARN=0 但四处矛盾全部不在其覆盖面）——错值能长期存活。

---

## 二、逐处考古表

### ① zh-hk 婚庆类目 SKU 卡 NT$25-95 / NT$15-55

| 项 | 内容 |
|---|---|
| 存储原值 | `src/data/products.ts:6886` `price_range: 'NT$25-95 / 套'`（WI-001 燙金喜帖，name L6882）；`:6938` `price_range: 'NT$15-55 / 套'`（WI-003 婚禮感謝卡，name L6934）；`:6846` `basePrice: 1.2`（WI-001）、`:6898` `basePrice: 0.65`（WI-003）；minQuantity 均 50（L6879/L6931）。两 SKU 均无 `variables`（6850-6990 全扫无命中） |
| 渲染链 | 类目卡 `CategoryProductCard.tsx` L60-71：`getDisplayAnchor(slug)`（无婚庆 override）→ 回退 `convertToFromPrice(price_range, locale)` → `pricing.ts:716-718` **zh-hk 分支原样返回字符串** → `NT$25-95 / 套` 直出（en/ja 分支 L734 正则只认 `HK\$`，不命中 → 同样原样返回，三语全部显示 NT$）。PDP 购买件 `PdpPurchaseButtons` 用 `basePrice`（HKD 约定）→ zh-hk 婚庆 PDP 出现「hero NT$25-95/套 + 购物车 HK$1.20 × 50 = HK$60.00」双币并存（后者为 2026-11-25 K3-review 会话线上实测记录，`.hermes/logs/2026-11-25-ZP-k3-review.md`） |
| 引入 commit | **`6e28663c` 2026-08-18**「feat(seo): Step 2 §11 业务子类目豁免 + 3 新类目 + 12 新 SKU (K3 8/17 05:32 拍板)」（git log -S 'NT$25-95'）；扩散进 `sku-seo-data.ts` 三语正文 6 处（L2918/2925/2932/2990/2997/3004，含「價格範圍為 NT$25-95 / 套」）经 **`ca85da91` 2026-09-10**（F1 zh-hk 薄内容补齐 63 SKU）生成链写入；CSV `zprintpro-sku-seo-data.csv` 无 NT$（-S 空）→ 正文值来自 products.ts |
| 全站异常度 | 全量 price_range 84 条：82 条 HK$、1 条 ¥（DJ-001 同人誌 `¥7,500〜/部〜`，K3 10-30 拍板 JPY 建て真值，`57647c4f` 10-28 修）、**2 条 NT$（即本处）** |
| 先例与登记 | 同批（8-18 婚庆批）其余 NT$ SKU 已被 K3 裁决改 HK$：drink-tokens（living-book §L427：「只能是港币」→ `HK$0.25起/張`）、cafe-table-cards / save-the-date / wedding-place-cards（living-book L672「zh-hk NT$→HK$ 3 槽」，`e569c4a5` 9-21、`f9935e4b` 10-12 退役 301）；10-28 `docs/2026-10-28-packaging-batch-d15h1-cleansing-report.md` L142 已登记「婚慶 2 SKU price_range 用 NT$（台幣）…且 basePrice(1.2/0.65) 与 range 不同币不同量级」；11-25 K3 D1 议程「喜帖 NT$→HK$」（digest-20261125-earlydocs.md L43）；队列 `FIX-20261125-PRICE-TRUTH-GAPS` status=BLOCKED_K3_TRUTH（strategy-task-queue.json L1394-1411，result 仍空） |
| 判定真值 | **NT$ = 数据层 symbol 误写**（非渲染层硬编码——渲染链全链无 NT$ 逻辑，纯直出）。币种方向 = HK$（K3 D1 议程 + 3 个同批先例 + 84 条里 82 条 HK$ 的站点规范）。**数值需 K3**：若按「NT$25-95 实为 HK$25-95 的误写」→ 提案 A（11-25 K3-review 提案）：`HK$25-95 / 套` + basePrice=25（购物车 50×25=HK$1,250）；basePrice 1.2/0.65 的原设计币种/意图无任何拍板记录，不得自判 |
| 推荐修复 | **symbol 修（方向已拍板）+ 数值占位待 K3**：products.ts 两行 price_range 改 `HK$25-95 / 套` / `HK$15-55 / 套`；basePrice 1.2/0.65 待 K3（提案 A：25/15）；sku-seo-data 6 处正文走生成器链重生成（SOP-5，改源头再跑 `scripts/csv-to-sku-seo.mjs`，禁手搓）；攒批 1 push |
| 竞品对照 | 香港喜帖市场：e-print 喜帖/結婚咭 350g 雙粉咭＋立體燙工 100 張 **HK$800-1,000**（e-print.com.hk/products_wedding_cards_printing）；ThinkCards 燙金 7 色最平 **$490/100張**、約 $11-19/張（Cosmopolitan HK, 2020 文）；喜帖 MOQ 行业惯例 100 張起（esdlife 2024）。对照：若改 HK$25-95/套，我方 50 套起单套价高于本地 100 張帶（$5-10/張）约 3-12×，「套 vs 張」单位不同（套≈1 帖+信封）需在拍板时一并校准；感謝卡 HK$15-55/套 无直接公开锚 |
| 复算 | M1=Node 全量 price_range 清单（仅 2 条 NT$）；M2=live curl `/zh-hk/category/wedding-invitations/`（NT$25-95 / NT$15-55 各渲染于卡位，RSC payload 同值）；M3=git -S（6e28663c）+ 84 条全量币种分布。✅ 三方法一致 |

### ② en 贴纸类目页 title $0.05 vs 同页 FAQ/PDP US$0.55

| 项 | 内容 |
|---|---|
| 存储原值 | **title/desc 字面量**：`src/lib/seo.ts:413` `'Small Batch Sticker Printing $0.05 · 10 MOQ \| ZprintPro'`、`:425` `'Small batch sticker printing from $0.05, 10 MOQ — …'`（categorySeoData，非计算值） |
| 渲染链 | title/desc/og ← `generateMetadata`（seo.ts）直出；JSON-LD ItemList offers ← `schema-extensions.ts:496-520` → `pricing.ts:950-974 getProductOfferPrice`：分支 1（有 UNIT 锚 SKU）→ 2026-11-18 价格口径 B：`getSchemaMoqTierPrice`（pricing.ts:934-948）取 PRICE_TABLES 的 MOQ 档实价（waterproof：tier qty10 priceUSD 9 ÷ 10 = **$0.90**），表缺档才回退 `anchor.priceDisplay`；分支 2（无锚 SKU）→ `convertToFromPrice` → INDEPENDENT_PRICES 优先（`pricing.ts:308+`）→ fx 回退（×0.128，L734-755）。FAQ quickAnswer ← `category-conversion-blocks.ts:243`「US$0.55 per sticker」；PDP $0.55 ← `products.ts:975 basePrice_en: 0.55` + `sku-seo-data.ts:185/186` + `product-faqs.ts:1076/1088` |
| 引入 commit | **`5d45069c` 2026-08-17**（67-B 19 词 B 指令批）：diff 铁证——en title 由 `'Sticker Printing from $0.23 \| Free Shipping $99+ \| ZprintPro'` 手写改为 `'Sticker Printing from $0.05 \| 1 MOQ + Free Proof'`（同批 zh「50 張起印→1 張起印」、ja 加 ¥8〜）；`a3ea8597`/`2bdacde3` 9-1 改写保留 $0.05；**`ae277dfa` 2026-11-12**（weekly-meta 批）再改词为现值（104→55 当量，MOQ 1→10），**$0.05 保留未修**。$0.55 侧：`8baa775c` 2026-07-13 引入 per-locale basePrice 字段；**`17f67f07` 2026-10-28**「data-driven 小批 #1：en small-batch stickers 价格 .045→.55 真值对齐 basePrice_en/ja 69/zh 38-A4」= K3 拍板真值组 |
| $0.05 的机层旧来源 | `price-data.generated.ts:7111` waterproof-stickers UNIT 锚 `en: { priceDisplay: '0.05', qty: 10, batchPrice: 9 }`（`6fb0ee58` 2026-07-25 预计算）；口径 B 之前分支 1 直接回退该值 → 旧 build JSON-LD 曾输出 $0.05。pricing.ts:910-916 注释自证该病：「priceDisplay = 批量档 as-low-as，与 MOQ 档实价落差 ≥5x 达 15/20 → GMC 价格准确性风险（审计档 .hermes/logs/price-scale-audit-20261116.json）」 |
| **live 实测（2026-11-26）与 G1 出入** | `/en/category/stickers/`（HTTP 200）：title/desc/og = $0.05（8 hit 全部命中 title 族）；FAQPage JSON-LD + 可见 FAQ + 卡片 = **US$0.55**；ItemList offers = **0.90（waterproof）/0.41（transparent）/0.37（removable）…**（与 audit9 代码模拟完全一致；抽验前 3 offer 一致）。⇒ **JSON-LD 已无 $0.05**。前作 `.hermes/logs/audit-20261125-g1-truth-check.md` 记「title+JSON-LD 写 $0.05」——JSON-LD 半句与 11-26 实测不符（疑为 11-18 前旧 build 缓存或把 og/meta 归入 JSON-LD），按引用规范如实写明出入，不作和解 |
| en 页四锚全景 | title/og **$0.05**（8-17 手写遗留）｜metaDescription（conv-blocks:239）**US$0.32/pc (waterproof PVC)**｜FAQ+卡片 **US$0.55**（small-batch）｜卡片族 **US$0.32/0.41/…**（INDEPENDENT_PRICES）｜ItemList offers **$0.23-1.00**（口径 B MOQ 实价）——同一页面 4 类锚并存 |
| 判定真值 | **非掉位笔误（确定）**：$0.05 与 $0.55 无字符关系，是「8-17 手写类目锚」vs「K3 10-28 拍板 PDP 真值」的**跨 SKU 跨单位锚冲突**（$0.05≈透明贴纸 HK$0.38×0.128 的 fx 回退族；$0.55=small-batch per-A4/piece 竞品对标锚）。数值合理性：$0.05/pc≈HK$0.39/pc 落在我方防水带 HK$0.22-1.0/張 内（非市场错价），但与同页其它锚不一致 |
| 推荐修复 | **占位待 K3（类目 from-锚拍板）+ 字面量重写**：推荐类目 en 锚对齐 INDEPENDENT_PRICES 真值 = **US$0.32（waterproof，与卡片/metaDescription 已一致）** 或 US$0.55（small-batch）；title/desc/og 三处字面量属 src 改动，走攒批；JSON-LD 无需动（口径 B 已修）；price-data:7111 的 '0.05' 显示层锚保留（显示层口径），但其「MOQ 档缺失回退」路径建议登记为守卫盲区 |
| 竞品对照 | e-print 貼紙類 數碼貼紙 **$104/100 張**（≈HK$1.04/張，4 工作天，e-print.com.hk/products_Labels）→ 我方防水 HK$0.22-1.0/張、透明 HK$0.38-1.50/張 处于市场带内或更低；en 锚无论取 0.32 或 0.55 均有市场支撑 |
| 复算 | M1=live curl（title 0.05 ✓ offers 0.90/0.41/0.37 ✓）；M2=audit9 全 SKU offer 模拟（9 SKU 枚举，无 0.05）与 live 一致；M3=git show 5d45069c diff 原文。✅ 三方法一致（唯 G1 前作的 JSON-LD 半句与今日不符，已如实分叉记录） |

### ③ /ja/product/small-batch-stickers/ hero ¥69/枚 vs 报价引擎 HK$38（約700円）〜 / 价格表 HK$89/134/196

| 项 | 内容 |
|---|---|
| 存储原值 | `src/data/products.ts:973-976`：`price_range: 'HK$38-120/A4'`、`basePrice: 38`、`basePrice_en: 0.55`、`basePrice_ja: 69`（ST-004，slug L951，minQuantity 10 L980）；独立定价 `pricing.ts:351-353` small-batch-stickers `{ en: 0.55-1.1 pc, ja: 69-138 枚 }` |
| 渲染链 | hero ¥69/枚 ← `ProductPageV9` fromPrice → `convertToFromPrice` → INDEPENDENT_PRICES ja min 69 →『¥69〜』（live title「10枚〜 ¥69〜」+ desc「¥69/枚〜（A4 版）」）；**价格件 ¥69 × 10 = ¥690 · MOQ 10** ← `PdpPurchaseButtons.tsx:48-66`（`getLocalePrice`: ja→`basePrice_ja ?? round(basePrice×19.5)`，×minQuantity；头部注释 L7：「币种口径 = merchant feed 同源…与 GMC 价格一致性」）；HKD 段/表 ← `products-content.ts:2214`（「A4 版基本価格 HK$38（約 700 円）〜、最小ロット 10 枚」）+ `:2218`（表 10 枚 HK$89/134/196、100 枚 HK$38/57/84、500 枚 HK$29/…）；円建て承诺 ← `products-content.ts:2166`「**JPY 日本円建て明朗会計**」（live ✓） |
| 引入 commit | per-locale basePrice 字段：**`8baa775c` 2026-07-13**（pricing.ts:188 注释原话「per-locale basePrice_en / basePrice_ja（**locale-optimized 竞品对标价**）」→ ¥69/$0.55 是手设市场锚，非 HKD 换算）；INDEPENDENT_PRICES 体系：**`04d9d17a` 2026-04-26**「EN/JA 独立定价策略（对标海外市场）」；真值定案：**`17f67f07` 2026-10-28**「价格 .045→.55 真值对齐 basePrice_en/ja 69/zh 38-A4」（K3 data-driven 小批 #1）——K3 10-28 已把 {zh 38/A4, en $0.55, ja ¥69} 拍为展示/购买/机器层真值组 |
| 算术复算 | HKD 表（报价引擎口径）：38×2.35(MOQ 係数)=**89.3→89** ✓；38×1.5×2.35=**133.95→134** ✓；38×2.2×2.35=**196.46→196** ✓；100 枚 38/57/84 ✓（×1/×1.5/×2.2）；500 枚 38×0.75=28.5→**29** ✓ —— 表与 QuoteCalculator 参数完全自洽（表脚注自述「HK$38 × 2.35」）。ja 口径：69×10=**690** ✓ |
| 矛盾定式 | 同一「10 枚」档：ja 标题/FAQ/购买件/机器层 = **¥69/枚（10 枚 ¥690 ≈ HK$37.5）**；HKD 表 = **HK$89/枚（10 枚 HK$890 ≈ ¥16,400）** —— 相差 **~24×**，且页内自称「JPY 日本円建て明朗会計·為替変動リスクなし」。另有第三口径：QuoteCalculator 对 ja 把 69 再乘 MOQ 係数 2.35 → ¥162/枚（**代码推演，推断级**，需线上交互复核）——若成立，ja 购买件 ¥69 与交互报价 ¥162 亦自相矛盾（per-locale 锚已含小批量溢价，再乘係数 = 双计） |
| 判定真值 | **円建て口径下的数据真值 = basePrice_ja 69/枚**（K3 10-28 拍板 + hero/购买件/schema/feed 四链同源一致，10 枚 ¥690）；**HK$89/134/196 表与「HK$38（約700円）〜」= zh-hk 报价引擎 HKD 口径错植进 ja 页**（products-content ja 正文继承 zh 档位表），与円建て承诺直接矛盾。哪套定价是交易真值（¥69 对标锚 vs HKD 引擎实算）= **需 K3 定价**，不得自判 |
| 推荐修复 | **占位待 K3**：(a) 若拍板 ¥69 为准 → ja 价格表按 ¥ 重建档位（10 枚 ¥69/枚；100 枚/500 枚档位值需新拍板）或整段移除 HKD 表；(b) 若拍板 HKD 引擎为准 → basePrice_ja/INDEPENDENT_PRICES/标题/FAQ/购买件全链重写（大改）；(c) QuoteCalculator 对 per-locale basePrice 的 discount 语义需设计拍板（双计 bug 修复方向）；(d) `products-content.ts` ja 段与 `sku-seo-data.ts` L2932 经脚本链同步 |
| 竞品对照 | e-print 數碼貼紙 $104/100張（≈HK$1.04/張≈¥19/張）→ ¥69/枚≈HK$3.7/枚（小枚数对标口径）处市场带内；HK$38/A4（版面口径）≈¥700/A4 与页内「約 700 円」自洽——两套口径各自内部成立，错在混排 |
| 复算 | M1=live curl ja PDP（¥69×10=¥690 购买件 ✓ + HK$89/134/196 表同页 ✓ + 円建て承诺 ✓）；M2=算术复算（38×2.35=89.3 ✓、69×10=690 ✓，双法一致）；M3=git 拍板链（8baa775c→04d9d17a→17f67f07）。✅；QuoteCalculator ¥162 为推断级（已标注） |

### ④ a1-posters title「HK$20起」 vs SKU 卡「HK$29.00-45.00 起」 vs 价格件「HK$20.00 × 1 = HK$20.00 MOQ 1」

| 项 | 内容 |
|---|---|
| 存储原值 | `src/data/products.ts:2568` `price_range: 'HK$290-7,200 · 噴繪成品 · 不含安裝裱貼'`；`:2569-2571` `basePrice: 20 / basePrice_en: 4.6 / basePrice_ja: 600`；`:2575` `minQuantity: 1`；`:2582-2587` variables sizes：**a2 ×1 / a1 ×1.8 / a0 ×3.2**（PO-002，slug L2546） |
| 渲染链 | **title「HK$20起」** ← `sku-seo-data.ts:394/434/441/448` + `category-seo-content.ts:3301/3363/3401/3463/3603/3713` 字面量（live title「A1 大幅海報 厚紙 \| 1張起印 HK$20起 4小時打稿」）——与 `basePrice: 20` 对齐，通过 title-v5 门童「价格·MOQ 真值对照 products.ts」；**卡片 HK$29.00-45.00** ← `CategoryProductCard` → `getDisplayAnchor` → `pricing.ts:1016` `DISPLAY_ANCHOR_OVERRIDES['a1-posters'] = { low: 29.00, high: 45.00, unit: '張' }` + L1011-1015 拍板注释（**K3 2026-09-19 路線圖 P0-2「A1 獨立 minQuantity=1 + 獨立價階」：原值 {29,29} 中 29 實為 200 張檔單張價會誤導 → 改為誠實區間：1 張 HK$45 → 量產檔 HK$29/張（10 張 HK$290、200 張 HK$5,800）**）；配套 `price-data.generated.ts:7179-7183` UNIT 锚（zh 29/qty1/batch45 · en 3.7/6 · ja 580/900，`4593937c` 2026-09-19 gen-price-data）+ 档表 `:6921-6995`（qty1 HK$45 / 10→290 / 20→580 / 50→1,450 / 100→2,900 / 200→5,800）；**价格件 HK$20.00 × 1 = HK$20.00** ← `QuoteCalculator` 默认配置 `sizes[0]='a2'`（×1）× basePrice 20 × minQuantity 1 —— **A1 页默认报价档实为 A2 价**（live ✓）；og/schema ← price_range 290-7,200 + Product offer（HKD，'4…' 截取可见，与口径 B MOQ 档 45/1 一致） |
| 引入 commit | price_range/三币字段：**`9161367c` 2026-07-25**（B2 公式定价 + A1 inkjet e-banner×0.95）；卡片区间锚：**`4593937c` 2026-09-19**（gen-price-data 首次接入 UNIT 锚）+ pricing.ts 注释记载的 9-19 拍板改判（{29,29}→{29,45}）；拍板脉络：**K3 2026-10-26 队列①**「zh 海报 category 9/45 vs basePrice 16/20（本项，**推荐 basePrice 对齐**）」（`.hermes/logs/2026-10-26-seven-clusters-k3-decision-queue.md` L111，SSoT=_allsku_truth.tsv）；**K3 2026-11-13 CT-20261113-D1/D6**「保留 A2 16 与 A1 三产品线；**标题优先无价格常青值**且须过 50-57 当量与冻结规则」（coordination-board.json L1084）；`99902084` 11-20 A2 海報 17 项真值落地（同族拍板链） |
| 判定真值 | **三值都是各自口径的「真值」，同页混排才是矛盾（确定）**：`HK$20` = 报价引擎规格价（basePrice，A2 默认档；柯式线营销锚，K3 10-26 推荐对齐 basePrice）；`HK$29.00-45.00` = K3 9-19 拍板的噴繪诚实区间锚（量产 29→单张 45，非 bug）；`HK$290-7,200` = 噴繪批量带（7-25 引入，290=10 張档 ✓；上限 7,200 与档表 200 張 5,800 不齐——上限来源待证，次要）。title 带「HK$20起」与 K3 11-13 D1/D6「标题优先无价格常青值」相悖（该拍板后未回改此 title） |
| 推荐修复 | **占位待 K3**：(a) title 去「HK$20起」或改「柯式」产线标注（per D1/D6 常青值偏好；涉及 title 冻结规则需一并过当量）；(b) QuoteCalculator 默认档对齐 A1（×1.8 → HK$36）或页面强制 A1 起选（UX 拍板）；(c) 卡片 29-45 锚已拍板——保留不动；(d) price_range 上限 7,200 档位来源核实后修（次要）；以上全部属 src 改动走攒批 |
| 竞品对照 | e-print 海報页 A1 特大海報标注**需另外報價**（无公开单张价）；印刷易（servicecorps.hk）无价快报 → A1 小批量公开锚稀缺；我方 blog `poster-printing-price-guide` 自述「A1 三級產品線：柯式 HK$20/張起、噴繪基材 HK$45-56/張、噴繪成品 HK$290 起」与 products-content.ts:5430-5435 PDP 三线口径一致（自证），外部强锚缺位——正因如此更需 K3 一句话定主锚 |
| 复算 | M1=live curl zh-hk a1 PDP（title HK$20起 ✓ + HK$29.00-45.00 每張起/實價按規格報價 ✓ + HK$20.00×1=HK$20.00 MOQ 1 ✓ 三值同页）；M2=pricing.ts:1011-1016 拍板注释与 override 实现直读；M3=K3 10-26/11-13 拍板档 + 档表 qty1=45/qty10=290 对照 price_range 290 ✓。✅ 三方法一致 |

---

## 三、审计过程中的新发现（超出原 4 处，登记不处理）

- **N1 QuoteCalculator × per-locale basePrice 双计溢价（推断级，未线上复核）**：QuoteCalculator 对 en/ja 用 `basePrice_en/ja`（已是含溢价的「竞品对标」锚）再乘 HKD 口径的 MOQ 係数 2.35 → en 默认档 ≈ $1.29/pc、ja ≈ ¥162/枚，与各自购买件（$0.55×10 / ¥69×10）矛盾。修复方向需 K3 设计拍板（定义 per-locale basePrice 为「已含 MOQ 档价」并跳过 quantities 係数，或反之）。
- **N2 守卫盲区**：`scripts/guards/price-truth-guard.js` 实跑 `blocks=85 checked=81 noTruth=4 (small-bags,name,seo,doujinshi-printing) HARD=0 WARN=0 EXIT=0`（3HARD+2WARN 已由 `e392b120` 11-21 清零）——但守卫**不含币种符号检查**（NT$ 存活 100 天的直接原因），也不做 title/卡片/表/机层跨层一致性对账。建议增补：`price_range` 非白名单币种符号（zh-hk 允许 HK$，DJ-001 例外 ¥）= WARN 级。
- **N3 en 贴纸页「四锚并存」家族**（见 ② 表）：title 0.05 / meta 0.32 / FAQ+卡 0.55 / offers 0.23-1.00。同类「锚不同步」欠债已登记于 `.hermes/logs/price-scale-audit-20261116.json`（≥5x 落差 15/20）。
- **N4 其它 $0.05 字面分布**：`components/geo/CompareTable.tsx:35`（GEO 对照表，en `US$0.05-0.19/pc` = 透明贴纸 fx 值；渲染于 `services/seo/[slug]` 页，非贴纸类目）——若 K3 改类目锚，此类 GEO 组件值需同链同步。

---

## 四、数据来源 + 校准状态

```
数据来源:
- 源码直读 (Node utf-8 脚本, HEAD 1e3c1e72 = 2026-11-25 18:21, git status src/ 干净):
  src/data/products.ts (7095 行) / src/lib/pricing.ts (1077 行) / src/lib/price-data.generated.ts (7202 行)
  src/lib/seo.ts / src/lib/seo/schema-extensions.ts / src/data/sku-seo-data.ts / src/data/category-seo-content.ts
  src/data/category-conversion-blocks.ts / src/data/products-content.ts / src/components/category/CategoryProductCard.tsx
  src/components/category/CategoryProductsPanel.tsx / src/components/product/PdpPurchaseButtons.tsx
  src/components/quote/QuoteCalculator.tsx / src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx
  src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx / src/app/[locale]/product/[slug]/page.tsx
- git 考古 (git log -S / git show): 04d9d17a 2026-04-26, 8baa775c 2026-07-13, 9161367c 2026-07-25,
  6fb0ee58 2026-07-25, 4593937c 2026-09-19, 6e28663c 2026-08-18, 5d45069c 2026-08-17, a3ea8597/2bdacde3 2026-09-01,
  ca85da91 2026-09-10, e569c4a5 2026-09-21, f9935e4b 2026-10-12, 17f67f07 2026-10-28, 57647c4f 2026-10-28,
  d5c0d36f 2026-11-18, 99902084 2026-11-20, e392b120 2026-11-21, ae277dfa 2026-11-12
- 内部拍板/审计档: docs/2026-10-28-packaging-batch-d15h1-cleansing-report.md (L142),
  .hermes/logs/2026-10-26-seven-clusters-k3-decision-queue.md (L111),
  docs/2026-09-20-handover-living-book.md (L427/L672), .hermes/logs/2026-11-25-ZP-k3-review.md (L106/L197),
  .hermes/logs/digest-20261125-earlydocs.md (L43), .hermes/logs/2026-11-25-priority-execution-wave.md (L32/L43),
  .hermes/logs/strategy-task-queue.json (FIX-20261125-PRICE-TRUTH-GAPS, BLOCKED_K3_TRUTH),
  .hermes/logs/coordination-board.json (CT-20261113-D1/D6), .hermes/logs/price-scale-audit-20261116.json,
  .hermes/_allsku_truth.tsv (products.ts 派生镜像, 2026-11-21 a029ae5d)
- 机审: node scripts/guards/price-truth-guard.js (2026-11-26 实跑, HARD=0 WARN=0 EXIT=0)
- 线上实测 (2026-11-26, HTTP 200 ×5): /zh-hk/category/wedding-invitations/ · /en/category/stickers/ ·
  /ja/product/small-batch-stickers/ · /en/product/small-batch-stickers/ · /zh-hk/product/a1-posters/
- 竞品对照 (web, 页面快照口径): e-print.com.hk/products_Labels (貼紙 $104/100張),
  e-print.com.hk/products_wedding_cards_printing (喜帖 350g 立體燙工 100張 HK$800-1,000),
  cosmopolitan.com.hk 喜帖公司推介 2020 (ThinkCards $490/100張, $11-19/張), wedding.esdlife.com 2024 (MOQ 100張起),
  e-print.com.hk/products_poster_printing (A1 需另報價), zprintpro.com/zh-hk/blog/poster-printing-price-guide (自站三线口径)
校准状态: 已校准 (源码=HEAD 1e3c1e72; 线上=2026-11-26 实测; 竞品=页面快照, 档位/单位以对方页面为准, 仅作量级对照非定价依据)
```

---

## 五、待证项

1. **③ QuoteCalculator ja 默认档 ¥162/枚**（推断级）：需线上交互复核 ja PDP 报价计算器默认输出；若成立，en 同病 $1.29/pc。
2. **② G1 前作「JSON-LD $0.05」取证口径**：11-26 live 无 $0.05 offer；建议 G1 复核其取证时间/缓存（11-18 口径 B 部署前后分界）。
3. **④ price_range 上限 7,200 的档位来源**：档表 200 張=5,800、500 張=14,500 量级，7,200 不在任何档上——疑为 7-25 旧公式残留，需翻 `9161367c` 源档。
4. **① WI-001 basePrice 1.2 / WI-003 0.65 的设计币种**：无拍板记录可考（-S 无命中），只能 K3 定。
5. **竞品快照档位**：e-print $104/100張 的尺寸/材质口径未进页面核对，仅作量级对照。

## 六、建议下一步

1. **把本报告四条「判定真值 + 推荐」直接填入 `FIX-20261125-PRICE-TRUTH-GAPS` 的拍板材料**（K3 一句话裁决，不需重新考古）：① basePrice 数值（提案 A：25/15 或维持 1.2/0.65）；② 类目 en 锚（推荐 US$0.32 waterproof）；③ ja 档位口径（¥69 为准则档位值需新拍）；④ title 去价/产线标注 + 默认档。
2. **K3 拍板后修复链**：products.ts →（生成器）sku-seo-data/CSV → products-content/category-seo-content/sku-seo-data 正同链 → 攒批 1 push（§0.25.9）→ title-v5/brand/gsc-leak/price-truth 门童全量 → 5 URL curl 验收。
3. **守卫增补**（N2）：币种符号白名单检查入 price-truth-guard（WARN 级起步，FP 复盘后再升硬拦）——属 scripts/ 改动，本次零写入未执行。
4. **QuoteCalculator per-locale 语义**（N1）：作为独立设计议题升级 K3，不与四处混拍。

*报告完 · 只读审计，未改任何 src/ 文件，未改任何 title；勘察脚本与原始输出存于 `.hermes/tmp-price-audit/`（audit2-10.cjs + out2-10.txt），可复跑复核。*


---

## 七、线上复核补记（2026-11-26 01:15, 主会话追加 · 非原审计范围）

> 追加者注：以下为主会话在收到本报告后对「待证项 ①」的线上实证复核，结论反向（证伪），并对待证项 ③ 之 ja 口径判定补充新铁证。原报告正文不动（per §0.23.2 不抹历史）。

### 7.1 待证项 ①（QuoteCalculator ja ¥162/枚 双计）= **证伪**

- 代码层：`src/components/quote/QuoteCalculator.tsx` L174-199 主计算路径 = `(localeBasePrice + surchargePerUnit + finishingPerUnit) * sizeMultiplier * quantityDiscount`，默认档 sizeMultiplier=1 / quantityDiscount=1；**无任何 2.35 MOQ 係数乘法路径**（rg 全文 0 命中）。
- `2.35` 的真实出处：仅 `src/data/products-content.ts` L1961/2066/2224（zh/en/ja 三语正文表格「读法」说明文字），系手写文案，非引擎行为。
- 线上层（ja PDP small-batch-stickers，2026-11-26 01:05 HKT 实测）：hero `¥69/枚 ¥69 × 10 = ¥690`、购买件小计 `¥690`——**69×10 精确，无倍乘**。
- 结论：N1 从「推断级」改判 **「证伪」**；en 同病 $1.29 推断一并作废。报告中 L3 段「MOQ 系数」表述系把正文文案误读为引擎行为，本席接受该误读并在此更正。

### 7.2 待证项 ③（ja 口径）新铁证（加固原判定，方向不变）

ja 折叠区「小ロット単価表（A4 版基準・実報価エンジン準拠）」展开实测：
1. 表自称「**実報価エンジン準拠 / 本ページの見積もりエンジン実パラメータから算出**」，但同页引擎实际输出 ¥69 体系（hero/购买件/JSON-LD 四链同源）——表与引擎**同页直接矛盾**（比「HKD 错植 ja 页」更硬的矛盾点）。
2. 10 枚档 HK$89 = HK$38 × 2.35（表内「読み方」自证手写係数），引擎代码无此係数 → 「実報価エンジン準拠」声明不实。
3. 表内「HK$38（**約 700 円**）」换算率漂移：38 × 19.5 = 741 ≠ 700（站内 ja 换算标准 = ×19.5）。
4. 同页双价并存：hero ¥69/枚 vs 折叠表 HK$89/枚（同 SKU 同页两币种两单价）。

→ 方案 A（ja 页按 ¥69 口径重建档位或移除 HKD 表；100/500 枚档值需新拍）证据链更硬；不改原判定分级（确定级）。

### 7.3 新登记 N5：ja 相关产品卡小数円（归 per-locale 价格完整性族）

ja PDP 相关产品卡实测 `¥8.40 個あたり〜`（其余 3 卡 ¥51/¥46/¥60 整数）：0.43 × 19.5 = 8.385 → 显示 8.40，特征 = **waterproof SKU 无 basePrice_ja**，走 basePrice_en × FALLBACK_RATES.JPY(19.5) fallback（PdpPurchaseButtons.tsx L53 同族路径），且 ja 显示层未做整数円化。随 ③ 处置顺链补 basePrice_ja 真值 + ja 整数显示；不单独拍板。

### 7.4 GSC API 路径阻塞（旁证登记，与价格审计无关）

`scripts/fetch_gsc_data.py` L38 内置默认 `GSC_PROXY=http://127.0.0.1:7892`；本机代理进程当前未运行（拒连），直连 googleapis.com 超时（10060）。auth verify 8/8 PASS（凭据无恙）。K3 侧启动代理后即可恢复 API 拉取（承接层 query×page 明细 STALE 刷新的前提条件）。

*补记人：主会话（首席 SEO/AEO/GEO 数据战略分析师执行层）· 复核方法：实码 rg + 线上 2 URL 实测 + 浏览器 DOM 快照（ja PDP 含折叠区展开）· 零 src 写入*
