# Harness 執行任務單：A2 海報 + 即日傳單 價格真值修復（2026-11-20 拍板單落地）

> 本任務單按《重要文件/2026-11-20-a2-posters-and-same-day-flyyers-truth-decision-sheet.md》推薦選項 A 起草。
> 若 K3 要改任何一項選項，請在執行前聲明並同步修改拍板單；否則以下 17 項按推薦 A 鎖定為執行真值。

---

## 1. 任務元數據

| 欄位 | 值 |
|---|---|
| TASK_ID | TRUTH-A2-SAMEDAY-20261120-01 |
| 拍板依據 | 重要文件/2026-11-20-a2-posters-and-same-day-flyers-truth-decision-sheet.md（17 項，全部推薦 A） |
| OWNER_LANE | ZP-daily-content |
| APPROVAL_GATE | 本任務單按 2026-11-20 拍板單推薦 A 起草；K3 回覆「按建議 A 執行」或修改拍板單後生效。生效前 Harness 只讀不寫。 |
| 生效條件 | K3 口頭/文字確認「按建議 A 執行」 |
| 日期 | 2026-11-20 |
| 工作目錄 | F:\zprintpro-nextjs |

## 2. 執行真值（選項 A 鎖定，17 項）

### 2.1 A2 海報（PO-001）
1. MOQ = 10 張（「1 張起印」只屬 A1 海報，A2 禁用）。
2. 基準規格：A2 420×594mm、157g 銅版紙、單面四色（CMYK）。
3. 價格：HK$160 / 10 張 = HK$16/張。
4. USD：US$2.30/張（拍板手寫值）。
5. JPY：¥300/張（拍板手寫值）。
6. 常規工期：1–2 工作天。
7. 即日急件：≤200 張 且 HKT 11:00 前確認稿件 → 可即日投產；取件/送達以報價確認為準。
8. 運費：港九新界滿 HK$500 免費順豐。

### 2.2 即日傳單（FL-008）
9. 只承諾 A4 / A5（禁用 A6/DL 在 SKU 主承諾中出現）。
10. 急件基準紙：128g 光面/啞面粉紙，雙面。
11. 起印：10 張起印；10–99 張 = 數碼小批量，常規 3–5 工作天；100 張起才入即日急件檔。
12. 價格：HK$184 / 10 張（modeled，待工廠實詢）；A4 100 張 HK$570；A5 100 張 HK$164；修復後 price_range = 'HK$1.46-18.40/張'。
13. USD/JPY：全部由價表按固定匯率生成（HK$184 → US$24/10 張、¥3,680/10 張），不手寫。
14. 即日急件：HKT 11:00 前確認稿件可即日投產；A4 急件上限 200 張、A5 上限 400 張。
15. 常規工期：3–5 工作天。
16. 順豐：1–2 工作天，滿 HK$500 免費。
17. 海外：DHL/FedEx 主要市場約 2–4 工作天。

### 2.3 全局禁用文案（任何語言任何檔案）
- A2：「1 張起印」
- 即日傳單：「HK$0.55 起」「HK$1.30 起」「1 小時即取」「4 小時出貨」

## 3. USD/JPY 手寫覆寫調和方案（本任務單唯一結構性改動）

拍板單 A4/A5 要求 A2 的 USD=2.30/張、JPY=300/張（手寫），而生成器 `scripts/gen-price-data.mjs` 的固定匯率（HKD→USD 1/7.81、HKD→JPY 1/0.05）會生成 US$2.0、¥320，兩者衝突。

調和：在 `src/data/price-tables/posters.json` 的 A2 config 增加 per-slug 覆寫欄位：

```json
"currencyOverrides": { "USD_unit": 2.30, "JPY_unit": 300 }
```

`gen-price-data.mjs` 讀取該欄位時優先生成覆寫值，否則走固定匯率。即日傳單無此矛盾，不加覆寫（HK$184 → US$24、¥3,680 即拍板口徑）。

## 4. 寫入範圍（WRITE_SCOPE，僅限以下檔案與區塊）

1. `src/data/price-tables/posters.json` — 僅 A2 config：加 currencyOverrides；確保 a2-posters slug 只映射 A2 config（剔除 A3/A1/eco）。
2. `src/data/price-tables/flyers.json` — same-day-flyers 拆回 A4/A5 兩個 config，消除重複 qty 檔。
3. `scripts/gen-price-data.mjs` — 讀取 currencyOverrides；a2-posters / same-day-flyers 兩 slug 增加 serUnitAnchors 白名單覆寫（headline 價 = MOQ 檔單價 HK$16 / HK$18.4），其餘 slug 生成邏輯不動。
4. `src/data/products.ts` — 僅 PO-001（minQuantity=10、basePrice=16、basePrice_en=2.3、basePrice_ja=300）與 FL-008（minQuantity=10、basePrice=18.4、price_range='HK$1.46-18.40/張'、basePrice_en / basePrice_ja 由價表生成口徑同步）兩個 SKU 段。
5. `src/data/pricing.ts` — a2-posters 條目（en 2.3–4.6 / ja 300–525）與 same-day-flyers 條目（en 2.4–18.4 / ja 368–3680 per 10）兩條。
6. `src/data/products-content.ts` — 僅 same-day-flyers 塊（約 5034–5138 行）與 a2-posters 塊（約 5140–5330 行）：修 4 小時取件、from $0.16、ja 最短 4 小時、`{PRODUCT_NAME}` 模板洩漏、FAQ 錯寫 50 stickers MOQ 等。
7. `src/data/product-faqs.ts` — 僅 skuMoneyFAQs 中 same-day-flyers（847–923 行）與 a2-posters 條目。
8. `src/data/sku-seo-data.ts` — a2-posters 塊（818–853 行，基本正確，僅對齊）與 same-day-flyers 塊（746–781 行：title「10張起 HK$0.55起」、描述 18:00 前即日交貨、body 10 張 HK$0.55–1.50 全部改寫）。
9. `src/lib/price-data.generated.ts` — 只准由 `node scripts/gen-price-data.mjs` 再生成，禁止手改。

## 5. 禁止觸碰（DO_NOT_TOUCH）

- price-data.generated.ts：只准再生成，禁止手改任何行。
- 名片展示層 / 任何名片 SKU / 名片 SEO 條目（§0.0 展示層待 K3 拍板，本任務不觸）。
- 賀卡資產（v22 改名 6 SKU + 301 落點，不得刪改）。
- middleware 301 重定向映射。
- 凍結 title（四元素 + 長尾 3 篩選，凍結 2–4 週週期內不動）。
- blog-data/*.json 與任何 Blog 文章（same-day-flyers-printing-hong-kong-guide 的 HK$0.35/4-6 小時衝突列為後續任務，本任務單變量）。
- 其他 SKU：A1/A3/A4/A5 海報、eco 海報、常規傳單、貼紙、咭片等全部不動。
- 任何 K3 未拍板的數字與承諾。

## 6. 執行步驟（Harness 依序）

1. 讀本任務單 + 拍板單，確認 K3 已確認「按建議 A 執行」。
2. 按 §4 順序改 8 個源頭檔（先 price-tables，再生成器，再資料層）。
3. 再生成：node scripts/gen-price-data.mjs。
4. Guards（全過才允許 commit）：
   - node scripts/check-encoding.js --fix
   - npx tsc --noEmit
   - node scripts/guards/price-truth-guard.js --strict --products-content
   - node scripts/check-brand-mentions.mjs --strict
5. Diff 審查：git diff 確認 generated 檔 diff 只涉 a2-posters 與 same-day-flyers 兩個 slug。
6. 報告：.hermes/logs/2026-11-2x-truth-a2-sameday-fix.md，首段含 VERDICT / CONSUMED / DELIVERED / NEXT。

## 7. 上線驗證（PRODUCTION_DEPLOY / ONLINE_VERIFY）

Cloudflare Pages 部署完成後逐項驗證（三語對照）：

1. URL 對照（每項 zh-hk / en / ja）：
   - /products/a2-posters/、/en/products/a2-posters/、/ja/products/a2-posters/
   - /products/same-day-flyers/、/en/products/same-day-flyers/、/ja/products/same-day-flyers/
2. 每頁價格卡：A2 顯示 HK$160/10 張（HK$16/張），無「1 張起印」、無 HK$2.2 雙價矛盾；即日傳單顯示 HK$184/10 張，無 HK$0.55/HK$1.30 起價。
3. FAQ 與 JSON-LD：價格、MOQ、工期、截稿口徑（HKT 11:00）與拍板單一致；無 `{PRODUCT_NAME}` 洩漏。
4. 價格卡計算：100/200/400 檔隨機抽兩檔手算，批量單價遞減、總價正確。
5. WhatsApp 預填訊息：SKU 名與規格正確。
6. 搜尋結果預覽（sku-seo-data 改寫後的 title/description 與頁面 H1 一致）。

## 8. 復測（RETEST）

- T+7d：GSC 檢查兩 SKU 展示/點擊變化；站內價格卡再抽檢。
- T+14d：同行詢盤對照（WhatsApp 首訊是否仍問 A2 1 張起印 / 傳單 HK$0.55）。
- T+28d：拍板單 17 項逐項回驗，寫入 .hermes/logs/。

## 9. 後續任務（本任務單不執行，僅登記）

- TASK-2：Blog 文章 same-day-flyers-printing-hong-kong-guide 的 HK$0.35/100 張起/4-6 小時與本拍板單對齊（需 K3 確認口徑，避免單變量污染）。


> **勘誤 2026-11-20（Harness 首輪實測發現）**：§4 第 5 項 `src/data/pricing.ts` 路徑有誤，實際檔案為 `src/lib/pricing.ts`（`same-day-flyers` 在 334 行、`a2-posters` 在 376 行）。以此勘誤為準。

> **執行紀律 2026-11-20（事故教訓）**：凡涉及 `src/data/products.ts` 的 `tiers`→`configs[]` 結構性升級，**推送前必跑 `npm run build`**。本批因 `desk.ts`（quote-engine）與 `price-tables.ts` 兩個遺留消費方不認 `configs` 結構導致 `/quote-desk` 預渲染崩潰、首輪構建失敗（commit 99902084），二次修復 `42223814` 才部署成功。guards/encode/tsc 全過也攔不住 Next 預渲染崩潰，build 是最後防線。
