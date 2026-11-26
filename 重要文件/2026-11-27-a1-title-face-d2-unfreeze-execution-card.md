# 執行卡：A1 title 面 D2 解凍批（11-28 門開即推）

**狀態**：READY（已批准方向，等 11-28 D2 解凍窗口）· **建卡**：2026-11-27 05:2x Kimi Work 主會話
**擴批**：K3 11-27 05:34 拍板「三條併入」→ 範圍擴至 4 SKU × 7 title 槽 + 1 body 修復（§一.3-6）
**拍板鏈**：K3 11-13 D1/D6「標題優先無價格常青值」→ 考古報告 ④ A1 推薦「title 去『HK$20起』或加柯式產線標注」→ K3 11-26 02:48 四項拍板含 ④ A1 → 批1 已落地 QuoteCalculator 默認檔（sizes[0]=A1）＋title 面遺留至本批；BAND_FILL 三條併入 per K3 11-27 05:34
**數據來源**：title v5 審計 `.hermes/logs/sku-title-v5-audit-2026-11-26.json`（252 槽全量）；帶審計 `.hermes/logs/sku-title-audit-2026-11-26.json`；CSV 源頭 `zprintpro-sku-seo-data.csv`（tab 分隔）；當量口徑 `scripts/guards/title-equiv.js`；補滿裁決材料 `重要文件/2026-11-27-title-bandfill-3-slots-merge-ruling-material.md`

---

## 一、本批範圍（4 SKU × 7 title 槽 + 1 body 修復 + 1 PDP 直答塊回填）

### 1. A1 title 三語改寫（核心）

**改法（已拍板方向：去價 + 柯式產線標注）**，全部落 50-57 半角當量目標區：

| 語系 | 現行（當量） | 新 title（當量） | 變動 |
|---|---|---|---|
| zh-hk | `A1 大幅海報 厚紙 \| 1張起印 HK$20起 4小時打稿 \| 智印港`（53） | `A1 大幅海報印刷 厚紙柯式 \| 1張起印 4小時打稿 \| 智印港`（53） | 去「HK$20起」＋加「柯式」 |
| en | `A1 Large Posters \| 594×841mm \| 1 MOQ $4.60 \| ZprintPro`（55） | `A1 Large Posters \| 594×841mm Offset \| 1 MOQ \| ZprintPro`（56） | 去「$4.60」＋加「Offset」 |
| ja | `A1 ポスター \| 防水 DHL配送 \| 1枚〜 ¥600〜 \| ZprintPro`（54） | `A1 ポスター \| 防水 DHL配送 オフセット \| 1枚〜 \| ZprintPro`（57） | 去「¥600〜」＋加「オフセット」 |

**消除的矛盾**：title「HK$20起」= A2 basePrice 默認檔殘留（頁面實際默認已改 A1），與卡片区間 HK$29-45（K3 9-19 P0-2 拍板噴繪誠實區間錨，`pricing.ts:1016`）正面衝突 → 去價後衝突自然消失，區間錨保留不動。

**執行鏈（SOP-5 鐵律）**：
1. 改 `zprintpro-sku-seo-data.csv` a1-posters 行 SEO标题三列（源頭）
2. 跑 `node scripts/csv-to-sku-seo.mjs --apply --allow-drift` → 生成器斷言 PASS 後 `src/data/sku-seo-data.ts` 自動同步
3. **禁手搓 sku-seo-data.ts**；products.ts 的 a1-posters 若有獨立 title 欄位需同步檢查（批1 已改 sizes[]，title 欄位一併核）

### 2. G1 批1 頁 3（a1-posters PDP）直答塊價位回填

- 母提案頁 3 原標「價格矛盾 → 占位待 PRICE-TRUTH」——① 真值已拍（HK$20=引擎默認檔歷史值，卡 29-45 為 A1 誠實區間）、② QuoteCalculator 默認檔已改 A1（批1 落地）、③ title 面本批消除最後矛盾
- 回填內容 = 草案 v1.2 Variant A 直答稿（產線標注稿，K3 11-26 02:29 已選）：起訂/計價行用「以報價確認」＋卡片区間錨，不寫死單價
- WA 預填 A2→A1 錯配必修（母提案頁 3 待辦列明）

### 3. BAND_FILL 補滿 ×3（K3 11-27 05:34「三條併入」拍板）

| SKU/語系 | 現行（當量） | 新 title（當量） | 補入真值源 |
|---|---|---|---|
| a2-posters/zh-hk | `A2 海報印刷 420×594mm 10張起印 HK$16起 \| 智印港`（48） | `A2 海報印刷 420×594mm 10張起印 HK$16起 1-2天 \| 智印港`（54） | product-faqs.ts:855 常規 1-2 工作天 |
| art-posters/zh-hk | `藝術海報 \| 美術紙 Giclée \| 1個起 HK$26起 \| 智印港`（49） | `藝術海報 \| 美術紙 Giclée \| A1/A2 1個起 HK$26起 \| 智印港`（56） | products.ts:2822 A1/A2 檔 |
| small-bags/ja | `小判紙袋｜100個〜 白カード 多サイズ｜ZprintPro`（46） | `小判紙袋｜100個〜 白カード 多サイズ｜DHL 2-4日｜ZprintPro`（57） | 同 SKU ja description DHL 2-4 日 |

- 三條均只加已驗證屬性，零新承諾、零價格變動；當量 54/56/57 全落 50-57 目標區
- 執行鏈同 §1.1（CSV → 生成器）；art-posters 需核 products.ts `title_zh` 雙層同步

### 4. small-bags/ja body 殘缺修復（隨批掛鉤）

- 現行 `"body": " fast delivery."`（生成層剝殼事故形態）→ 按 zh/en body 同構補回 ja 正文（100個〜・白カード/クラフト/コート紙・4色 CMYK・1時間無料デザイン校正・DHL 2-4日・30秒AI見積，全部已在同塊 description 有源）
- 修復後跑生成器斷言，確保零漂移

### 5. 邊界重申（擴批後）

- small-bags MOQ_UNVERIFIABLE WARN 保留登記（無引擎條目，本批消不掉，不影響執行）
- 凍結槽 certificates / foil-stickers 仍不動；WARN 30 存量其餘 27 條不混入

## 二、門禁與驗收（執行時逐項）

1. `npx tsc --noEmit` = 0 err
2. title-v5 守衛：staged title 變更 HARD=0、新當量全過 50-57（58 阻斷線）
3. title-band（門童 #25）：staged 新增 ≥58 硬攔 = 0
4. 六門禁 + brand-mentions --strict + encoding 全綠
5. live 探針（帶瀏覽器 UA）：zh/en/ja a1-posters PDP 新 title 生效、舊「HK$20起/$4.60/¥600〜」字面量 = 0、卡 29-45 仍在
5b. live 探針（擴批加測）：a2-posters/art-posters zh-hk 與 small-bags ja 新 title 生效、舊字面量 = 0；small-bags ja body 殘缺句 = 0
6. 單變量：本批動 4 SKU（a1-posters title ×3 + 直答塊 / a2-posters zh-hk / art-posters zh-hk / small-bags ja title+body），各 SKU 獨立無共享組件；不帶 WARN 其餘 27 條存量

## 三、明確不動（邊界）

- `pricing.ts:1016` HK$29-45 區間錨（K3 9-19 拍板，保留）
- 凍結槽 certificates / foil-stickers（v5 審計 frozen 名單，非本批）
- WARN 30 條存量其餘 27 條（LONGTAIL_SOURCE 13 / MOQ_UNVERIFIABLE 餘 5 / MOQ_DRIFT 4 / FROZEN_FILLER_WORD 2 / PRICE_UNVERIFIABLE 2 / BAND_FILL 已清 3）→ 逐條另列批次，不混入本批

## 四、推送時機

**11-28 D2 解凍窗口開**（title 凍結面解禁）→ 按 §一 執行鏈走完全部門禁 → §0.25 攢批 1 push（本批單獨成 commit，不與他批混）→ live 驗收後回寫賬本 + 隊列卡翻 DONE。

**擴批裁決已閉合**：K3 11-27 05:34 拍板「三條併入」→ §一.3-4 已併入正式範圍；裁決材料 `重要文件/2026-11-27-title-bandfill-3-slots-merge-ruling-material.md` 留存備查。
