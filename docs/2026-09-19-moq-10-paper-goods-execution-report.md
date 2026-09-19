# 全網站起訂量修正 — 執行報告

**日期**: 2026-09-19
**範圍裁決**: 紙品線（傳單 / 貼紙 / 賀卡）100 → **10**；書刊本冊維持 100（另案）
**定價機制裁決**: 新增 **modeled 小批量檔**（開機費 HK$50 + 隨量遞減單張價），標明 `modeled / 待校準`

---

## 一、數據來源

```
數據來源:
- 源頭檔: src/data/products.ts (97 SKU 的 minQuantity / variables.quantities)
- 源頭檔: src/data/price-tables/{flyers,stickers,digital-stickers-cost,flyers-cost-yate98,special-fold-leaflets}.json
- 生成器: scripts/gen-price-data.mjs → src/lib/price-data.generated.ts (18 slugs)
- 口徑 SSoT: src/data/print-method-policy.ts (本批新增 PAPER_GOODS_* 族)
- 驗證: scripts/moq10-{audit-ladders,verify-anchors,smoke-test}.mjs + moq10-runtime-check.ts
- K3 2026-09-19 拍板: 範圍 = 紙品線; 小批量定價 = modeled 檔; 書刊本冊暫不動
- 既有拍板 (未覆蓋, 繼續生效): K3 2026-09-18 v10.1 決策 1-B (書刊 1 本起印展示口徑)
```

**校準狀態**: 新增的 10/25/50/75/99 檔全部為 **modeled**（`src: "modeled-small-batch"`、`calibratedAt: "待校準"`），
**非工廠實詢 anchor**。所有既有 anchor 檔逐條未改（見 §三 GATE 1）。

---

## 二、改動清單

### 2.1 報價資料層（新增小批量檔）

| 檔案 | 改動 |
|---|---|
| `src/data/price-tables/flyers.json` | a5/a4/same-day/eco 各加 10/25/50/75/99 |
| `src/data/price-tables/stickers.json` | die-cut / small-batch 各加 10/25/50/75/99 |
| `src/data/price-tables/digital-stickers-cost.json` | 5/5 configs |
| `src/data/price-tables/flyers-cost-yate98.json` | custom-flyers 17/17 configs |
| `src/data/price-tables/special-fold-leaflets.json` | folded-leaflets 4/4 configs |
| `src/lib/price-data.generated.ts` | 由 `node scripts/gen-price-data.mjs` 重新生成 |

**定價模型**（`scripts/moq10-add-small-batch-tiers.mjs`）:

```
整批價(q) = 開機費 HK$50 + q × 進場單張價 × Λ(q)
  Λ = { 10: 2.35, 25: 1.52, 50: 1.08, 75: 1.01, 99: 1.00 }   # 隨量遞減至 1
天花板 = floor( min( 既有最低檔總價 × 0.98, anchorQty × floor(anchor單張價,2位) ) )
```

實際階梯（HK$ / 整批）:

```
a5-flyers        : 10→79.5  25→97.5  50→117.5  75→122.5  99→122.5 │ 100→125
a4-flyers        : 10→139.5 25→194.5 50→255    75→338    99→372   │ 100→380
same-day-flyers  : 10→184   25→266.5 50→358    75→482    99→558   │ 100→570
eco-flyers       : 10→80    25→98    50→118.5  75→146    99→175.5 │ 300→380
folded-leaflets  : 10→161   25→229.5 50→305    75→407.5  99→517.5 │ 300→1416
waterproof-stickers: 10→71  25→71    50→71                   │ 50→73 (anchor 自 50 起)
```

### 2.2 資料層（起訂量欄位）

- `src/data/products.ts`: **22 個紙品 SKU** `minQuantity` 100 → 10
- 其中 **15 個** SKU 的 `variables.quantities` 首檔插入 `{ value: 10, discount: 2.35 }`
  （無 price-data 渲染路徑者：傳單 4 + 貼紙 7 + 賀卡 6 = 17，減去 2 個無 quantities 區塊）
- **未動**（維持原值）: 書刊本冊 100 / 包裝盒 500 / 紙袋 100 / 月曆 1000 / 海報 100 / 橫額 100 / 婚慶 50

### 2.3 口徑 SSoT 與展示層

| 檔案 | 改動 |
|---|---|
| `src/data/print-method-policy.ts` | 新增 `PAPER_GOODS_SMALL_BATCH_SLUGS`(22) / `PAPER_GOODS_MOQ`(10) / `isPaperGoodsSmallBatch()` / `getDisplayMinOrderV2()` / 三語 `PAPER_GOODS_MOQ_NOTE` + `PAPER_GOODS_MOQ_AEO` |
| `src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx` | 起訂量行接 `getDisplayMinOrderV2`；新增紙品 AEO 塊（口徑與 price-table 同源） |

### 2.4 前端文案（消除矛盾）

| 檔案 | 改動 |
|---|---|
| `src/components/services/rush-data.ts` | 傳單/海報/貼紙起訂量 100 → 10；價格欄加註「大量檔」 |
| `src/components/services/RushPriceTable.tsx` | 「100 張起印」→「10 張起印…起印量愈低單張愈高」 |
| `src/components/services/RushHero.tsx` | 傳單/海報/貼紙 10 張起 · 紙袋 100 個起 |
| `src/components/home/HeroBanner.tsx` | slide 1（傳單/海報/貼紙 10 張起）、slide 3（A4 傳單 500 → 10 張起，原值與 minQuantity 矛盾） |
| `src/components/home/MainCategoryEntry.tsx` | zh-hk/en/ja AEO 答案 → 10 |
| `src/components/category/CategorySharpHooks.tsx` | stickers 場景卡 zh-hk/en/ja、flyers 場景卡 zh-hk/en/ja |
| `src/components/category/CategoryIndustries.tsx` | stickers 場景卡 zh-hk/ja |
| `src/lib/h1-builder.ts` | `SHARP_HOOKS_MAP_ZH_HK.stickers` 100張起印 → 10張起印；`DEFAULT_HOOK_JA.stickers` 100枚から → 10枚から |
| `src/lib/seo.ts` | stickers 標題（1張起印 → 10張起印，原與 minQuantity 矛盾）+ 描述；flyers 標題/描述 |
| `src/lib/seo-keywords.ts` | flyers 描述/body zh-hk/en/ja（500 起 → 10 起） |
| `src/app/[locale]/services/page.tsx` | 貼紙/傳單 meta 卡 + 頂層 description（en/ja）+ heroBadges（改為「小批量友善」，因本頁跨品類） |
| `src/app/[locale]/services/rush-printing-delivery/page.tsx` | 即日印刷 banner zh-hk/ja/en + 相關服務清單（傳單 100→10、貼紙 50→10） |
| `src/app/[locale]/category/[slug]/page.tsx` | greeting-cards en 標題 100 MOQ → 10 MOQ |
| `src/data/product-faqs.ts` | 貼紙 FAQ 最低訂量 100 → 10（zh-hk/en/ja）+ 小批量即日取 100-500 → 10-500 |
| `src/data/products.ts` | 13 個 SKU × 22 處描述/features 內「100 張起印」→「10 張起印」（含 en `MOQ 100`、ja `100枚から`） |

---

## 三、驗證（6 道閘門全綠）

| GATE | 指令 | 結果 |
|---|---|---|
| 1 | `node scripts/moq10-audit-ladders.mjs` | ✅ 0（本次引入問題 0；**既有 anchor 逐條不變**） |
| 2 | `node scripts/moq10-verify-anchors.mjs` | ✅ 0（起批檔與 price table 一致） |
| 3 | `node scripts/moq10-smoke-test.mjs` | ✅ **59 通過 / 0 失敗** |
| 4 | `npx tsx scripts/moq10-runtime-check.ts` | ✅ **30 通過 / 0 失敗**（實跑真實模組） |
| 5 | `node scripts/check-regression-guard.js --commit` | ✅ 🔴0 🟠0 🟡0 ⚪0（含門童 #19 價格口徑） |
| 6 | `node scripts/check-brand-baseline.mjs` | ✅ PASS（431 → 311，未新增） |
| 7 | `npx tsc --noEmit` | ✅ **54**（基線 57，持平改善，0 新增） |
| 8 | `npm run build` | ✅ exit 0 · 732 URLs · 16 品類 / 97 產品 / 111 部落格 |

### 邊界測試（GATE 3 覆蓋）

- 9 張 < 10 → 低於最低檔（`getTableQuote` 以最低檔單價計）
- **10 張命中最低檔**，且 ≥ 開機費成本（A5 = HK$79.5，非 HK$12.5 錯價）
- 99 張總價 ≤ 天花板 < 既有最低檔總價 → **客戶加量永不倒掛**
- 非名單 SKU 抽查 8 個（書刊/包裝盒/紙袋/月曆/海報/橫額）維持原值

---

## 四、過程中修正的三個既有缺陷（附證據）

1. **PDP 價格區塊死路**（`src/app/[locale]/product/[slug]/page.tsx`）
   `hasPriceTable` 原用 `findClosestTierBatch(slug, minQuantity||500)` 判斷，該函式只要 slug 出現在
   **任何** price table 就回傳物件；但 `die-cut-stickers` / `small-batch-stickers` 所屬的
   `stickers.json` **未被 `gen-price-data.mjs` 讀取** ⇒ `getPriceTableForSlug()` 回 null。
   結果：`QuoteCalculator` 被抑制 + `ReferencePriceBlock` 不渲染 = **該兩個 SKU 的 PDP 完全無價**。
   已改用 `getPriceTableForSlug()` 作唯一判據（與下方 render 條件完全一致）。

2. **分類卡「起批」語意**（`scripts/gen-price-data.mjs`）
   `UNIT_PRICE_ANCHORS` 的 `qty`/`batchPrice` 原本取「最低單價檔」，但 `pricing.ts getDisplayAnchor`
   的 `sub` 語意是「起批量 · 整批價」。加入 10 張檔後會出現
   「HK$0.14/張起 · 10張起批 · 整批 HK$686」（10 張實際整批 HK$80）。
   已改為 `qty`/`batchPrice` 取最低數量檔，`priceDisplay` 仍為最低單價。

3. **HeroBanner A4 傳單 slide 標「500 張起印」**，與 `minQuantity` 100 早已矛盾，本批一併修正為 10。

---

## 五、已知殘留與未決（需 K3 裁決 / 另案）

### 5.1 本批未動（依裁決，屬另案）

| 項目 | 現狀 | 建議 |
|---|---|---|
| **書刊本冊**（catalog/saddle-stitch/perfect-bound/hardcover/spiral/exercise-books） | `minQuantity` 100 + 展示口徑「1 本起印（數碼）」（K3 2026-09-18 v10.1 1-B） | 若要降至 10 本，需同步改 `price-band-guard.js` 門童 #19 + 三語博客文案（見 5.2） |
| **A1 海報獨立** | `a1-posters` `minQuantity` 仍 100；`a2-posters` 的 price table 首檔已是 10 | 建議獨立品類 + 補 A1 專屬 price table |
| **傳統膠印 100 起** | 未設印刷方式分流規則 | 建議加 `print_type` 分流（100-199 走數碼、200+ 引導膠印） |
| **通宵截稿** | 站上既有口徑 **18:00**（`rush-data.ts` timeline / FAQ / `RushPriceTable`） | 與提案的 15:00-16:00 不一致 → **需 K3 拍板**，本批不動 |
| **紙袋後工 10 起** | 紙袋維持 100 個 | 若後工另收設置費，需先建後工價表 |
| **2 個 SKU 無 quantities 區塊** | `rounded-corner-greeting-cards` / `fluorescent-stickers` | `minQuantity=10` 已生效（QuoteCalculator 回退 minQuantity），但無檔位選擇器 → 需補 `variables.quantities` |

### 5.2 博客內容層（**建議獨立一波**）

博客文章是**另一套內容層**，本次僅盤點未改。與本批直接相關（flyer/sticker 主題）的宣稱：

- 全站博客命中 100-起印類宣稱：**92 篇 / 3 locale**
- 其中與傳單/貼紙**主題直接相關**者：**33 篇 / 118 處**
  （zh-hk 11 篇 58 處 / ja 7 篇 43 處 / en 5 篇 17 處；重災：`same-day-flyers-printing-hong-kong-guide` 13 處、
  `industrial-nameplate-printing-guide` 10 處、`sticker-guide` 7 處）

**為何本批不改**：
1. 需逐篇改寫散文（非機械替換），否則會產生「100 張起」與「10 張起」混用的半改狀態；
2. `src/data/blog-data/*.json` 受門童 #15 嚴格 JSON 校驗，改動須整批過閘；
3. 屬跨品類內容（部分「100 張起」屬紙袋/餐牌/海報，**本來就對**），需逐篇判別品類。

**建議**: 開「博客起訂量同步波」，範圍 = 上述 33 篇，逐篇判別品類後改寫，並在三語完成後跑門童 #15。

### 5.3 既有資料特性（不改，僅登記）

- `digital-stickers-cost.json` config[0] anchor **自身不單調**（50 張 HK$73 → 100 張 HK$71，工廠實價），
  故 99→100 的**單張價**最多微升 ≤ 2%（audit 以 2% 容忍並記錄）。
  本批守住的是**總價**永不倒掛，非每步單張價單調 —— 否則 10 張會跌到 HK$12.5（低於成本）。
- `same-day-flyers` / `eco-flyers` 等既有檔內存在同 config 低價變體（如 100 張 HK$164），屬既有資料，非本批引入。
- `books.json` `saddle-stitch-booklets` 300→500 檔總價下降（1778 → 1311），屬既有，本批未動。

### 5.4 部署

依 §0.25（30 min 間隔）+ §0.25.10（小改動免預覽僅限 ≤3 檔案 / 不觸數據層 schema / 不觸批量 SEO 字段）：
本批為 **22 檔案 + 數據層 + 批量 SEO 字段**，**不符合直推條件** ⇒ 已 commit 本地，**push 需另行排程**。
