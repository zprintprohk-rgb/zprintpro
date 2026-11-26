# 2026-11-27 人手執行器 — D1/D2/D3+WI 正確性批（K3 11-27 03:32 拍板）

## VERDICT: PASS
## CONSUMED: K3 2026-11-27 03:32 拍板（D1 推薦B · D2 推薦C · D3 推薦收窄）+ 11-27 03:18 戰略批遺留 WI NT$ 項 + k3-review C5 車價證據
## DELIVERED: 4 項修復上線（commit d742df6a）+ 隊列 D3 卡變更 + FULL-REFUND 新卡
## NEXT: k3-review 12:05 獨立復探；full-refund 卡待 K3 三選一拍板；今晚 18:17 daily 消費 SMALLBATCH 語言殘留（與本批零重疊）

數據來源: K3 2026-11-27 03:32 拍板原話（D1 SB 10 件價推薦B / D2 doujin 車價×10 推薦C / D3 收窄 SB 卡驗收）；k3-review 11-26 §6-D1 驗收錨（PDP 表 10 pcs $0.60 / hero 車 $0.55 / 類目卡 From US$0.55/pc）；src/data/products-content.ts L2031-2032 價格表實讀（10pcs=$0.60 / 50pcs=$0.55）；scripts/csv-to-sku-seo.mjs L215（body/faqs 為 ts 權威域）；DOUJIN-SEMANTIC-FIX 卡 evidence（PdpPurchaseButtons 車價【排除】屬 D-2 案）；live 探針 2026-11-27 04:0x（zprintpro.com 實頁 curl）。

---

## 一、四項執行明細

### ① WI 正文 NT$→HK$（×6，最優先解鎖項）
- **調查發現**：`grep NT$` 全 src 僅 6 處，全在 `src/data/sku-seo-data.ts`——`foil-wedding-invitations`（L2918/2925/2932）+ `wedding-thank-you-cards`（L2990/2997/3004）三語 body。
- **CSV 疑點解決**：`zprintpro-sku-seo-data.csv` 全表 0 處 NT$（喜帖行 col18-20 body 為去價「?套起印」佔位版）。**結論：body 是 ts 權威域**（生成器 L91-93/L145-147/L215 明確 body/faqs 不屬 CSV 覆蓋域），直接改 ts 即改源頭，無需動 CSV。
- **執行**：6 處 `NT$` → `HK$`。zh「價格範圍為 HK$25-95 / 套」、en「Prices run HK$25–95 per set」、ja「料金は 1 セットあたり HK$25〜95」（感謝卡 15-55 同）。與批1 basePrice 25/15（HK$）+ CSV col12「HK$25 起/套」+ en/ja 站慣例（tuck-end-boxes 等 body 均直書 HK$）三方對齊。
- **事故與修復**：Python 文本模式寫回把 3054 行轉 CRLF（Windows `\n`→os.linesep），生成器 `loadTsFromText` 正則 `\n\}\n` 失配報錯。已用 `newline=''` 全文件歸一 LF，生成器重跑 **斷言 A-E 全 PASS、0 漂移、字節級變化 0**（body 保留驗證）。隊列 JSON 同法修復（indent 還原 2）。

### ② D2 doujin 車價（方案 C：按規格報價止血）
- **範圍切割驗證**：`getPriceTableForSlug('doujinshi-printing')` = null（不在 price-data.generated.ts）→ 舊頁右欄 QuoteCalculator 對 doujin **有渲染**（page.tsx L621 條件），故 D2 必須覆蓋兩面，否則頁面仍殘乘量總價。
- **執行**（3 文件）：
  - `src/data/products.ts`：Product 介面加 `quoteOnly?: boolean`（含 K3 拍板註釋）；doujinshi-printing 設 `quoteOnly: true`。
  - `PdpPurchaseButtons.tsx`：T 表加三語 quoteOnlyTitle/Desc/Cta + `WHATSAPP_URL`；`product.quoteOnly` 早退分支渲染「按規格報價」塊（data-purchase-block + data-quote-only），無數量選擇器、無加購/立即購買、無 qty×total。
  - `page.tsx`：右欄 QuoteCalculator 對 quoteOnly 直接 `return null`。
- **文案口徑**：三語均「以正式報價為準」同族條件化，零新增硬承諾。WhatsApp 鏈接沿用全站統一 `wa.me/8619880851334`（about 頁模式）。
- **邊界**：`price_range: '¥7,500〜/注文〜'` 與 schema 層價格保留（屬參考錨，非乘量總價）。

### ③ D1 SB 10 件價（方案 B：只改標籤不改價）
- **實讀驗證**：products-content.ts L2031-2032 價格表 = 10pcs $0.60 / 50pcs $0.55（Vinyl 檔）。INDEPENDENT_PRICES en 錨 0.55 = **50pcs 檔**，無檔期語境時與表內 10pcs $0.60 並置構成誤讀。zh-hk 錨 = 10張檔（HK$38/A4）、ja 錨 = 10枚檔（¥69〜），均無此問題 → 只動 en。
- **執行**：`pricing.ts convertToFromPrice` 加 slug+locale 條件：SB en 輸出 `$0.55/pc (50+)`。全鏈路（類目卡 CategoryPageV9 L216 / PDP hero ProductPageV9 L287+806 / 舊頁 L470/L544 / meta description L448）自動繼承，零 UI 層改動。
- **未動**：價格數字、PDP 表、zh/ja 顯示、UNIT_LABEL 全域表。

### ④ D3 隊列卡變更（零代碼）
- `FIX-20261125-SMALLBATCH-WORDING-RESIDUAL`：exit_criteria ① 收窄為「SB 本地內容串（write_scope 7 文件）」；full refund 共享組件（FreeSampleBanner / category-seo-content L4703 / RushDeliveryFAQ / TrustBadgeBlock / WhyChooseUs / ProductWhyChooseUs）**剔出剔出驗收**，歸新卡。
- 新建 `FIX-20261127-FULL-REFUND-SITEWIDE`（WAITING_K3）：全站 refund 語三選一（保留 / 條件化 / 刪除），含 trustGuarantee「100% satisfaction guarantee」全 PDP 100% 類待裁項。

## 二、門禁
`tsc --noEmit` 0 err · title-v5 HARD=0 · brand/gsc-leak/entity/price-truth/i18n 全靜默 · brand-mentions --strict 0 命中 · pre-commit 門童全綠（shadow orange 僅存量）· csv-to-sku-seo 斷言 A-E PASS · 編碼 UTF-8 LF。

## 三、部署與 live 探針（2026-11-27 04:0x）
push `abd0f6c7..d742df6a` → CF Pages build success（舊版探針先行 403→200 後由 data-quote-only 翻轉確認新版落地）。

| 探針 | 結果 |
|---|---|
| ja /product/doujinshi-printing/ | data-quote-only=1、仕様見積り対応=1、カートに追加=0、小計=0 ✅ D2-C |
| zh-hk /product/foil-wedding-invitations/ | HK$25-95=3、NT$=0 ✅ WI |
| en /product/wedding-thank-you-cards/ | HK$15–55=2、NT$=0 ✅ WI |
| en /product/small-batch-stickers/ | (50+)=3、表 $0.60=2 ✅ D1-B（10pcs 檔保留） |
| en /category/stickers/ | 類目卡 (50+)=2 ✅ D1-B |

## 四、遺留與待裁（均不阻塞本批結論）
1. **FULL-REFUND-SITEWIDE**：待 K3 一句話三選一。
2. **N5**（ja 相關卡 ¥8.40 小數円 = waterproof 無 basePrice_ja fallback）/ **N6 方案①②**（MOQ 實價/區間錨，12-04 月度復盤）：維持登記。
3. **A1 title 面**：11-28 D2 解凍後執行。
4. ** tonight 18:17 daily 車道**：消費 SMALLBATCH 語言殘留（DOUJIN-SEMANTIC-FIX 卡）→ 明晚 DOUJIN → 後晚 G1 批2 直答塊；本批已為其清出語義域（車價邏輯歸本批、語義串歸車道，無雙寫風險）。
5. 本批動過 SESSION_LOCK（持有 03:4x-04:0x 已釋放，見 SESSION_LOCK.md 頂部）。

## 五、SOP-10 五問自查
1. 架構差異：先讀 DOUJIN 卡 evidence 確認 PdpPurchaseButtons 屬 D-2 案非車道領地 ✅
2. 約束範圍：D3 只動隊列卡兩條，未碰 src 內容 ✅
3. 原數據來源：$0.55=50pcs / $0.60=10pcs 均 products-content.ts 實讀，非推斷 ✅
4. 字段值策略：NT$ 直接改 HK$（無聯繫方式類字段）✅
5. Markdown 渲染：未新增 user-facing [text](url)（WhatsApp 為裸 a 標籤，既有模式）✅
