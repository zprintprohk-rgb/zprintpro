# 裁決材料：<50 三條補滿是否併入 A1 title 面 D2 批（一頁）

**日期**：2026-11-27 · **提出方**：Kimi Work 主會話
**性質**：BAND_FILL（存量 WARN，目標區 50-57）· 待 K3 一句話：「併入」/「不併」
**數據來源**：帶審計 `.hermes/logs/sku-title-audit-2026-11-26.json`（存量 issue 3 條）；v5 審計 WARN 基線 30 條；真值源 products.ts / product-faqs.ts / sku-seo-data.ts 逐條核驗 2026-11-27；當量口徑 `scripts/guards/title-equiv.js`

---

## 三條補滿候選（全部只加已驗證真值，零新承諾）

### ① a2-posters / zh-hk（現行 eq=48）

| | 內容 | 當量 |
|---|---|---|
| 現行 | `A2 海報印刷 420×594mm 10張起印 HK$16起 \| 智印港` | 48 |
| **候選 A（推薦）** | `A2 海報印刷 420×594mm 10張起印 HK$16起 1-2天 \| 智印港` | **54** |

- 補的元素：「1-2天」常規交期——真值 `product-faqs.ts:855/867`（常規 1-2 個工作天，雙點互證）
- HK$16 = basePrice 引擎真值（K3 10-30 裁決單#1，PDP title 已對齊），保留不動
- 執行鏈：CSV 源頭 → csv-to-sku-seo.mjs → sku-seo-data.ts（SOP-5）

### ② art-posters / zh-hk（現行 eq=50...實核 49）

| | 內容 | 當量 |
|---|---|---|
| 現行 | `藝術海報 \| 美術紙 Giclée \| 1個起 HK$26起 \| 智印港` | 50* |
| **候選 A（推薦）** | `藝術海報 \| 美術紙 Giclée \| A1/A2 1個起 HK$26起 \| 智印港` | **56** |

- 補的元素：「A1/A2」尺寸檔——真值 `products.ts:2822` name 欄「藝術海報 \| A1/A2 海報」
- HK$26 = basePrice 引擎真值（minQuantity 1 已驗），保留不動
- *審計錄 49（其口徑含空格折算是 50 邊界）；候選 56 穩落區內
- 執行鏈：products.ts `title_zh`（該 SKU title 在 products.ts 與 sku-seo-data 雙層，需同步核）

### ③ small-bags / ja（現行 eq=46，雙 WARN：BAND_FILL + MOQ_UNVERIFIABLE）

| | 內容 | 當量 |
|---|---|---|
| 現行 | `小判紙袋｜100個〜 白カード 多サイズ｜ZprintPro` | 46 |
| **候選 A（推薦）** | `小判紙袋｜100個〜 白カード 多サイズ｜DHL 2-4日｜ZprintPro` | **57** |

- 補的元素：「DHL 2-4日」——真值同 SKU ja description（「DHL で日本へ 2-4 日配送」）
- 候選 B「1時間無料校正」= 61 超 57 阻斷線，否
- ⚠ **MOQ_UNVERIFIABLE 隨批消不掉**：small-bags 無引擎條目（純 CSV 層 SKU），100個〜 無 basePrice/minQuantity 可對 → WARN 保留登記，不影響補滿執行
- ⚠ **新發現**：該 SKU `ja body` = `" fast delivery."` 殘缺句（生成層剝殼事故形態）→ 建議隨批修，另登記

## 推薦與待批

**執行層推薦：三條全併入 11-28 D2 批**（理由：同窗口同門禁同執行鏈，均 ≤3 字符串/條，單變量語義不破——各 SKU 獨立、無共享組件；三條都是 WARN 級存量 issue，審計基線「存量 <50 只許遞減」）

**待 K3 一句話**：「三條併入」/「a2+art 併，small-bags 緩」（small-bags 有 MOQ_UNVERIFIABLE+body 殘缺兩個掛鉤）/「不併」

不答 = 維持執行卡原狀（單 SKU A1）。

**校驗聲明**：三條候選補入元素全部來自引擎/FAQ/description 已驗真值，零新承諾、零價格變動；當量全部落在 50-57 目標區（54/56/57，57 為區內上限非阻斷線，阻斷線 = 58）。
