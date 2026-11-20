# 「簇 8 残留」六项只读审计 — 2026-10-22

- 审计对象：《两周执行方案 v2》「簇 8 残留」六项
- 真值源：`src/data/products.ts`（minQuantity / basePrice / price_range）
- 方法：Node `fs.readFileSync(...,'utf8')` 逐行正则 + CJK 以 `\uXXXX` 转义写入脚本（规避 PowerShell GBK 解码，per AGENTS.md §0.26.9）
- 只读：未修改任何文件，未执行 git 操作
- 证据等级：全部为一手代码（当前仓库实现）

---

## 真值基线（products.ts，本次实测 83 SKU）

| SKU | slug 行 | minQuantity | basePrice | price_range |
|---|---|---|---|---|
| 月曆 wall-calendars | :4008 | 1 | 3 | HK$3-8/本 |
| 課本 textbooks | :5980（min :6007，base :6001，range :6000） | 100 | 24 | HK$5-50/本 |
| 練習簿 exercise-books | :5757（min :5784，base :5778） | 10 | 4 | HK$4-16/本 |
| 快遞盒 mailer-boxes | :3178（min :3208，base :3202） | 100 | 3.5 | HK$3.5-10/個 |
| A2 海報 a2-posters | :2459（min :2490，base :2482） | 10 | 16 | HK$95-1,017 |

`textbooks` 另有 `basePrice_ja: 1288`（:6003）；ja 站内价锚点为 ¥1,288，非 HK$28。

---

## 1. category-seo-content.ts「100 本起」2 处 — 判定：非缺陷（v2 类目误判）

命中共 2 处，**均在 `educational`（校園教育印刷）块**，不属于日历、不属于书刊：

- `src/data/category-seo-content.ts:2299`（`educationalContent` / zh-hk，`coreAdvantages.items[].points`）
  `'練習簿 10 本起訂（數碼印刷），適合小型補習社和專題教材；教科書 100 本起'`
- `src/data/category-seo-content.ts:2465`（同块 / ja，`h2`）
  `h2: '教科書 印刷 / 練習冊 / 教材 | 100本起 24h出荷 | ZprintPro'`

与真值比对：

- 「教科書 100 本起」↔ `textbooks.minQuantity = 100`（products.ts:6007）→ **相符**
- 「練習簿 10 本起訂」↔ `exercise-books.minQuantity = 10`（products.ts:5784）→ **相符**
- 与月曆真值（`minQuantity = 1`，HK$3-8/本）无冲突——月曆块 `calendars/zh-hk` 全块无 `100 本起` 字样（`calendars` 块 L1654-2270，仅 L1759/L1768 出现「50-100 本試印」描述性表述，且同句已写「1 本起印」）

**结论**：不需修。v2 把它归为「日历/书刊残留」是类目误判；数字与 SKU 真值一致。

**附带不一致（另计，非本条）**：`h2` 内「24h出荷」与全站「3-5 個工作天」口径（`ProductTabs.tsx:32`、`product-faqs.ts` 全量）冲突，属交期口径问题，非起订量问题。

---

## 2. category-seo-content.ts「HK$28」1 处 — 判定：需修（教育类假价，非月曆假价）

- 位置：`src/data/category-seo-content.ts:2466`（`educationalContent` / ja，`featuredSnippet`，col 36）
- 原文：`featuredSnippet: '教科書 印刷 100本から HK$28／本 | 練習冊/教材/学校/塾 4 種対応 | 24h出荷 DHL 2-4日 | ジープリント. ...'`
- 真值：`textbooks.basePrice = 24`（products.ts:6001）、`price_range = 'HK$5-50/本'`（:6000）
- 交叉对照：同一 SKU 的 ja 标题在 `sku-seo-data.ts:2374` 写 `100本起 HK$24起`

**冲突成立**：HK$28 比 basePrice 高 16.7%，且以「100本から HK$28／本」形式当起报价呈现 → 违反「basePrice = 起订量下入门价」的报价口径。

**归因**：不在月曆块（月曆真值 HK$3-8/本，products.ts:4008-4423 六个 calendar SKU 全为 basePrice 3）。HK$28 与 `hardcover-menus`（:4595，HK$28-120/本）、`vehicle-wraps`（:4997，HK$28-120/平方米）的 basePrice 数值相同，疑为跨 SKU 数字串档；本条不认定来源，仅记录数值巧合。

---

## 3. mailer-boxes「7-10 個工作天」— 判定：需修（冲突成立，但不在 v2 指的文件）

- `src/data/products.ts:3178` mailer-boxes 块（L3178-3277）**没有任何交期文案**：`description`（:3185）无工作天，`price_range`（:3201）= `HK$3.5-10/個`，块内 `7-10` 命中 0。
- `src/data/product-faqs.ts:1230`（`skuMoneyFAQs['mailer-boxes']` 第 1 问）：`'快遞盒 100 個起印，HK$3.5-10/個（按尺寸與坑型）。標準 3-5 個工作天（檔案確認後）。'`
- `src/data/product-faqs.ts:1254`（同 SKU 第 3 问）：`'標準 3-5 個工作天，急單可加急排期。...'`
- **实际 7-10 出处**：`src/data/sku-seo-data.ts:1115`（block header `"mailer-boxes": {` 在 :1106），zh-hk `seo.description`：
  `"郵寄盒/郵寄盒 100 個起。... 7-10 個工作天交貨，港九新界免費速遞，順豐速遞上門。..."`

站内标准：`src/components/product/ProductTabs.tsx:32` `standard: '標準送貨: 3-5個工作天'`。

客户可见性：`sku-seo-data` 经 `src/app/[locale]/product/[slug]/page.tsx:44/119`（`getSkuSeo(slug)`）进入 PDP metadata，属对外文案。

**结论**：同一 SKU 内「7-10」与「3-5」并存，需二选一统一（建议按全站口径 3-5，除非产能实测支持 7-10）。修点 = `sku-seo-data.ts:1115`。

---

## 4. textbooks ja「HK$28 vs HK$24」— 判定：需修，但与第 2 项是同一行代码

- `src/data/products.ts` textbooks 块（:5980-6060）**无 HK$28**：`basePrice: 24`（:6001）、`price_range: 'HK$5-50/本'`（:6000）；块内「28」全部命中图片路径 `v28_5`（:6010-6014），非价格。
- `textbooks.descriptionJa`（:5984）通篇无价格数字。
- HK$28 侧：`category-seo-content.ts:2466`（ja featuredSnippet）— 与第 2 项完全同一行。
- HK$24 侧：`sku-seo-data.ts:2374` `"title": "教科書印刷 | 覆膜 騎馬釘 | 100本起 HK$24起 | 智印港"`（ja 父节点 :2387 之后为 ja body，价锚 ¥1288）。

**结论**：冲突真实存在，但**第 2 项与第 4 项是同一缺陷**，修 `category-seo-content.ts:2466` 即同时关闭两项。v2 把它算作两条，重复计数。

**附带（同块）**：`products.ts:5984` `descriptionJa` 含繁體字形 `學年別教材`（日文应为 `学年別教材`），属跨语言污染，属门童 #4 范畴。

---

## 5. a2-posters descriptionJa 简中/字形污染 — 判定：无字形污染；有中文式搭配

- 位置：`src/data/products.ts:2463`，`descriptionJa`
- 原文：`標準A2サイズ、イベント宣伝の第一選択。157gコート紙、鮮やかな色彩、10枚から、1-2日納期。適用業界:小売セレクト、ブランド pop-up、ショッピングモール フラッシュ、レストランメニュー、カフェ、教育研修、ギャラリー展示、ブライダルイベント。`
- 逐字校验（Node utf8，简中专用字黑名单约 90 字，已排除日文通用 `写`）：**0 命中**
- `sku-seo-data.ts` a2-posters ja 段（:839-851）同法校验：仅 `写真紙` 命中 `写`，属日文正字，非污染

**但存在译写层问题（非门童 #4 硬拦项）**：
- `第一選択` → 日语惯用 `第一選択肢`
- `適用業界` → 惯用 `対象業界`
- `ショッピングモール フラッシュ` → 「闪店」直译，应为 `ポップアップストア`
- `ブランド pop-up` 中英混排，宜统一

**附带（同 SKU，价格/规格三口径不一）**：
- zh 描述（:2463）`HK$12.9起/張`、`200g銅版紙/PP合成紙`；`basePrice: 16`（:2482）；`price_range: HK$95-1,017`（:2481）
- `sku-seo-data.ts:826` zh 标题 `HK$9起`；`product-faqs.ts:855`「HK$9 起/張（157g 銅版紙）」
- en/ja 描述（:2463 同字段族）写 `157g`，与 zh 的 `200g` 不一致
- → 三个起价（9 / 12.9 / 16）并存，需一次性对表

---

## 6. packaging SKU 级 FAQ 覆盖 — 判定：覆盖不全（缺口，非残留错值）

结构：`src/data/product-faqs.ts:846` `export const skuMoneyFAQs: Record<string, FAQItem[]> = {`，共 20 个 SKU key；PDP 挂载见 `page.tsx:273-274`（`moneyFaqs = skuMoneyFAQs[product.slug]`，随后 `coreFaqs = coreProductFAQMap[product.category_slug]`）。

packaging 类目共 12 SKU（products.ts `category_slug: 'packaging'`），覆盖 5 个：

| slug | 问数 | 三语齐 | 行号 |
|---|---|---|---|
| food-boxes | 2 | ✅ | :964 |
| folding-boxes | 4 | ✅ | :1172 |
| mailer-boxes | 4 | ✅ | :1222 |
| rigid-boxes | 4 | ✅ | :1272 |
| cosmetic-boxes | 4 | ✅ | :1322 |

缺 7 个：`magnetic-closure-gift-box`、`electronics-packaging-box`、`kraft-paper-packaging-box`、`gang-run-card-boxes`、`white-card-boxes`、`corrugated-boxes`、`tuck-end-boxes`（products.ts :6105 / :6181 / :6282 / :6382 / :6453 / :6511 / :6570）→ PDP 回落 `packagingBoxesFAQs`（`product-faqs.ts:233-357`，10 问通用集，无该 SKU 的 MOQ/价/交期直答）。

三语完整性：已覆盖 5 个 SKU 的 question/answer 对象均含 `'zh-hk'` / `en` / `ja`，缺语 0。

附带：`food-boxes` 仅 2 问，与同层 4 问不一致；`sku-seo-data.ts` 另有 84 个 `"faqs"` 数组，全仓无消费点（仅该文件头注释「faqs 无消费点疑死数据」），不构成 SKU 级 FAQ 供给。

---

## 汇总

| # | 项 | 现状 | 需修 | 修点 |
|---|---|---|---|---|
| 1 | 100 本起 ×2 | 教育块，与 minQuantity 相符 | 否 | — |
| 2 | HK$28 ×1 | 教育 ja 假价，高于 basePrice 24 | 是 | category-seo-content.ts:2466 |
| 3 | mailer 7-10 vs 3-5 | 冲突真实，出处在 sku-seo-data | 是 | sku-seo-data.ts:1115 |
| 4 | textbooks ja 28 vs 24 | 与 #2 同一行 | 是（同 #2） | category-seo-content.ts:2466 |
| 5 | a2-posters ja 字形 | 无简中字形；有译写与价格三口径 | 否（字形）／建议修（译写+价格） | products.ts:2463 |
| 6 | packaging SKU FAQ | 5/12 覆盖，7 缺口，三语齐 | 缺口待补 | product-faqs.ts:846 起 |

去重后实际待修点：**2 处代码 + 1 处译写/价格对表 + 7 个 FAQ 缺口**。

## 数据来源

- `src/data/products.ts`（2026-10-22 本地读取，83 SKU 全量字段表）
- `src/data/category-seo-content.ts`（2026-10-22，全文件按 `const *Content` + locale 键映射定位）
- `src/data/sku-seo-data.ts`（2026-10-22）
- `src/data/product-faqs.ts`（2026-10-22）
- `src/components/product/ProductTabs.tsx`、`src/app/[locale]/product/[slug]/page.tsx`（消费链）
