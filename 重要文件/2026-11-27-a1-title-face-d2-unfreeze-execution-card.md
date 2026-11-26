# 執行卡：A1 title 面 D2 解凍批（11-28 門開即推）

**狀態**：READY（已批准方向，等 11-28 D2 解凍窗口）· **建卡**：2026-11-27 05:2x Kimi Work 主會話
**拍板鏈**：K3 11-13 D1/D6「標題優先無價格常青值」→ 考古報告 ④ A1 推薦「title 去『HK$20起』或加柯式產線標注」→ K3 11-26 02:48 四項拍板含 ④ A1 → 批1 已落地 QuoteCalculator 默認檔（sizes[0]=A1）＋title 面遺留至本批
**數據來源**：title v5 審計 `.hermes/logs/sku-title-v5-audit-2026-11-26.json`（252 槽全量）；帶審計 `.hermes/logs/sku-title-audit-2026-11-26.json`；CSV 源頭 `zprintpro-sku-seo-data.csv`（tab 分隔）；當量口徑 `scripts/guards/title-equiv.js`

---

## 一、本批範圍（1 SKU × 3 語 title + 1 PDP 直答塊回填）

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

## 二、門禁與驗收（執行時逐項）

1. `npx tsc --noEmit` = 0 err
2. title-v5 守衛：staged title 變更 HARD=0、新當量全過 50-57（58 阻斷線）
3. title-band（門童 #25）：staged 新增 ≥58 硬攔 = 0
4. 六門禁 + brand-mentions --strict + encoding 全綠
5. live 探針（帶瀏覽器 UA）：zh/en/ja a1-posters PDP 新 title 生效、舊「HK$20起/$4.60/¥600〜」字面量 = 0、卡 29-45 仍在
6. 單變量：本批只動 a1-posters title ×3 + 同頁直答塊，不帶其他 SKU

## 三、明確不動（邊界）

- `pricing.ts:1016` HK$29-45 區間錨（K3 9-19 拍板，保留）
- 凍結槽 certificates / foil-stickers（v5 審計 frozen 名單，非本批）
- 3 條存量 <50（small-bags/ja 46、a2-posters/zh-hk 47、art-posters/zh-hk 49）→ 同窗口可選合流項，需 K3 加一句話才併入（title 面 11-28 D2 同解禁，BAND_FILL 屬 WARN 非 HARD）
- WARN 30 條存量基線（LONGTAIL_SOURCE 13 / MOQ_UNVERIFIABLE 6 / MOQ_DRIFT 4 / BAND_FILL 3 / FROZEN_FILLER_WORD 2 / PRICE_UNVERIFIABLE 2）→ 逐條另列批次，不混入本批保單變量

## 四、推送時機

**11-28 D2 解凍窗口開**（title 凍結面解禁）→ 按 §一 執行鏈走完全部門禁 → §0.25 攢批 1 push（本批單獨成 commit，不與他批混）→ live 驗收後回寫賬本 + 隊列卡翻 DONE。

**待 K3 一句話（僅當要擴批時）**：「<50 三條併入」/「維持單 SKU」。不答 = 默認單 SKU 執行。
