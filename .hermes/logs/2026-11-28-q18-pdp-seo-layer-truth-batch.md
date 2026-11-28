# 2026-11-28 Q18 PDP/SEO 層驗真批（免運 / 15年 / MTR 口徑統一）

- **批次**：Q18（K3 2026-11-28 指令「開工 Q18 PDP/SEO 層驗真批…口徑與 Q17 同一 SSoT，以最优推荐方案执行」）
- **執行**：autoclaw 人手會話（22:50–23:35）
- **VERDICT**：OK（334 處替換 / 10 文件；斷言全過；門禁全綠）
- **CONSUMED**：Q17 SSoT（`src/lib/quote-engine/shipping.ts` + `src/data/products.ts`）+ Q17 欠賬清單 §5 #1
- **DELIVERED**：sku-seo-data.ts（含 CSV 源頭）/ products-content.ts / product-faqs.ts / 6 個組件文件
- **NEXT**：Q19 = PDP 層 48h／1 小時打稿／FSC 三類同款承諾（見 §6）

## 1. 真值 SSoT（與 Q17 完全同一口徑）

| 主題 | 真值 | 來源 |
|---|---|---|
| 香港免運 | 滿 HK$500（港九新界）順豐免運 | `shipping.ts` FREE_SHIPPING_THRESHOLDS.local = 500 |
| 美國免運 | 滿 US$99（≈HK$775，K3 2026-07-18 拍板） | 同上 north_america = 775 |
| 日本配送 | **無「全國免運」真值**；門檻僅 asia_pacific HK$1,500，文案口徑 = 送料見積確認 | 同上 asia_pacific = 1500 |
| 年限 | 「15 年以上」在 PDP/SEO 層屬無來源年限聲明；§13.14 批准的「15+」僅限 TrustWaterfall / 官方信任位 | §13.14 + 本批 K3 指令 |
| 港鐵站交收 | **無此服務**（Q14c K3 拍板：無門店自取） | Q14c commit 0745cf41 |

## 2. 變更統計（10 文件 / 334 處）

### 2.1 sku-seo-data.ts + CSV 源頭（SOP-5：同時改源頭與派生層，文本逐字一致）

| 規則 | 內容 | sku(ts) | CSV |
|---|---|---:|---:|
| R12a | `、日本全国送料無料です。` → `、送料はお見積り時にご確認ください。` | 1 | 0 |
| R12b | `日本全国送料無料` → `全国配送対応（送料はお見積り時に確認）`（覆蓋 、/。/です 全部變體） | 44 | 2 |
| R12c | `全国送料無料` → 同上（殘餘 catch-all） | 3 | 3 |
| R16 | `15年以上の印刷実績` → `長年の印刷実績` | 4 | 0 |
| R16b | `15年以上の実績を持つZprintPro` → `長年の実績を持つZprintPro` | 1 | 0 |
| R17 | `港九新界免費速遞` → `港九新界滿 HK$500 免費速遞`（行內已有 HK$500/$500+ 則跳過） | 69 | 40 |
| R17a-d | `一律免費速遞` / `免運費直送` / `免運費速遞` / `免運費送上門` → 補 `滿 HK$500` | 4 | 0 |
| R18 | `港九新界免費送貨` → `港九新界滿 HK$500 免費送貨` | 2 | 1 |

**ja 無條件免運 31 → 0；15 年以上 6 → 0；zh 無門檻免費速遞/送貨 全部補門檻。**
en `keywords` 內 61 個 `... free shipping` **保留**：屬搜索定位詞（用戶搜 free shipping），且站點確有 US$99+ 免運真值，不構成無來源聲明。

### 2.2 products-content.ts（150 處）

| 類 | 處理 |
|---|---|
| ja 運費表格 cells `100 個・100 枚以上 送料無料` / `100 枚以上 送料無料` | → `送料はお見積り時に確認`（20+20；數量門檻非引擎真值，車道真值為金額 ≥HK$1,500） |
| ja 段落 `100 個・100 枚以上のご注文は送料無料で全国配送…` | 10 處逐型改寫（含 `<strong>` 變體 6 處）→ `…で全国配送（送料はお見積り時に確認）` |
| ja US 門檻 | `$100 以上…米国向け送料無料` ×51 → **`$99 以上`**（真值 US$99）；`$200 以上…` ×1 → `$99`，`£150 / AU$300 以上で英豪向け送料無料` → `英国・豪州向けの送料はお見積り時に確認` |
| ja `国際速達送料無料` | 1 處 → `国際速達（送料はお見積り時に確認）` |
| 教材雙表 cells | `¥10,000 以上送料無料` / `100 冊以上で送料無料` / `¥10,000 以上免運` / `100 冊以上免運` 各 1 → 見積/報價確認；`HK$500 以上で送料無料`、`滿 HK$500 免運費` **保留**（真值） |

### 2.3 product-faqs.ts（2 處，Q14c 漏網）

- L77 貼紙 FAQ、L750 另一 SKU FAQ：`滿HK$500免運費，未滿額可選擇香港 MTR 站交收（觀塘、旺角…）` → `滿 HK$500 順豐免運費，未滿額運費以報價確認。`
- 本批後 product-faqs.ts `MTR / 港鐵` = **0**。

### 2.4 組件層（8 處 / 6 文件）

| 文件 | 原文 | 新文 |
|---|---|---|
| HowItWorks | `title: '港九新界免費速遞'` | `'港九新界 $500+ 免費速遞'`（與同檔 subtitle 一致） |
| HowItWorks | `title: '日本全国送料無料'` / `desc: '…全国送料 0 円。'` | `'日本全国配送対応'` / `'…送料はお見積り時に確認。'` |
| MobileValueStrip | `…｜日本全国送料無料｜DHL 2〜4日` | `…｜日本全国配送対応｜DHL 2〜4日` |
| WhyChooseUs | `subtitle: '500ドル以上送料無料'`（假門檻） | `subtitle: '全国配送対応'` / `description: '送料はお見積り時に確認'` |
| ProductTabs | `freeShipping: '国際送料無料'` | `'国際配送対応'` |
| FloatingQuoteCTA | `'2時間以内に返信 · サンプル送料無料'` | `'… · お見積り無料'` |
| RushDeliveryFAQ | `MTR駅受取（無料）または宅配便（HK$50-80）` | `順豐宅配便でお届けします（HK$500 以上は送料無料、未満は送料をお見積り時に確認）`（Q14c：無港鐵取貨、HK$50-80 無來源） |

**TrustWaterfall 的 `15+` 4 處未動**：§13.14 K3 拍板批准的營銷口徑（信任位），不屬本批無來源聲明。

## 3. 斷言與門禁

- **三件套**：① 逐規則計數（334）② 殘留形狀斷言（見下）③ 備份 → `.hermes/tmp/q18-backup-2026-11-28T14-5x…/`
- **殘留斷言（ALL PASS）**：`全国送料無料` = 0（sku / csv / pc）；`15年以上` = 0（sku / csv）；`MTR|港鐵` = 0（pf / rdf）；zh `免運|免費速遞|免費送貨` 全部帶門檻或 `以報價`（唯一豁免 = 「免運費嗎？」FAQ 問句標題）；ja 殘留 `送料無料` 僅 3 處，全部條件真值（`K$500以上でSF Express送料無料` ×2、`99 ドル以上送料無料` ×1）。
- **CSV 結構**：84 行 × 31 列 = 無一行破列（TSV 完整性斷言）。
- **生成器**：`csv-to-sku-seo.mjs` dry-run 斷言 A–E 全 PASS；預覽與現值差 = **註釋吞沒**（comments 10→6，含 `// 2026-11-28 K3 拍板 place-cards`），屬已知待修 bug（Q13b/Q14c 均遇）→ **未 apply**，CSV 與 ts 已同文本鏡像。
- **門禁**：`check-encoding` PASS（staged 後複查）；`tsc --noEmit` **0 = 0**（基線 0）；`check-brand-mentions --strict` A 類 0；`check-content-guard` **red=0**（🟠 orange 173 = 存量 shadow；🟡 策略黑話 1 = ja「会」存量，Q17 已記錄）。

## 4. 線上驗證

（見 §5 部署回執；驗證點：`/ja/product/waterproof-stickers/` 無 `全国送料無料` 且有 `全国配送対応`；`/zh-hk/product/a1-posters/` 見 `滿 HK$500`；`/ja/services/rush-printing-delivery/` 無 `MTR駅受取`；`/zh-hk/` 首屏見 `$500+ 免費速遞`）

## 5. Commit / Push

- commit / push 見 `git log`（本批 1 commit）
- push 間隔：上次 push 20:22（blog-deepfix 車道）→ 本批 23:3x，**≥30 min 滿足**（§0.25）
- 未代持/未提交車道遺留的 3 個 M 文件（`category-seo-content.ts` / `product-specs-i18n.ts` / `category-conversion-blocks.ts`），亦未清掃

## 6. 欠賬（Q19 候選，按優先級）

1. **PDP/SEO 層 48h 承諾**：products-content.ts `48 小時快遞` 20 處（紅包/餐牌/信封/作業簿等 intro 段）+ sku-seo `48 小時快遞 (順豐香港本地派送)` / `香港本地 48 小時交付` 等 11 處 + `磁吸翻蓋禮盒印刷 … 48小時交貨` title（Q14c 已標「包裝類另批不動」，標題變更需過 title-v5 門童）。
2. **FSC 強聲明存量**：products-content.ts 540 處、sku-seo-data.ts 113 處（Q17 口徑 = 「指定品項可選」，但量大需獨立批 + 逐 SKU 真值核對，不可機械替換）。
3. **「1 小時內免費數碼打稿」**：products-content/sku-seo 大量 quick-answer 塊（K3 11-24 k3-review E12 已判 FAIL 的同族聲明），需與報價引擎/實際流程對齊後再改。
4. `cluster-content.ts` 死文件刪除（P17 留批）。
5. pillar 正文存量工藝數字（1,000+ 張 / 5,000 張）待 K3 裁定是否描述性化。
6. `csv-to-sku-seo.mjs` 註釋吞沒 bug 修復（會反覆吃掉 K3 拍板註釋）。

## 7. 數據來源

- 真值：`src/lib/quote-engine/shipping.ts`（FREE_SHIPPING_THRESHOLDS）、`src/data/products.ts`（FSC / turnaround 字段）
- 口徑：`.hermes/logs/2026-11-28-q17-blog-layer-truth-batch.md` §1
- 掃描與替換：`.hermes/tmp/q18-classify-20261128.cjs`、`.hermes/tmp/q18-apply-20261128.cjs`（dry-run → apply，雙次一致）
- 校準狀態：已校準（本批執行時點 2026-11-28 22:50–23:35）
