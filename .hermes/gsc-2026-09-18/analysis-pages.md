# GSC 頁面層分析 — combo 28d（新視窗數據截止 2026-09-15）

> **數據來源**: `F:\zprintpro-nextjs\.hermes\gsc-2026-09-18\extract.json`（GSC 後台匯出，Real data；本檔未經二次抓取或估算）
> - `new.combo_28d.網頁`（575 列）· `old.combo_28d.網頁`（548 列）· 對照用 `new/old.combo_7d.網頁`
> - 過濾器（兩視窗相同）: 搜尋類型=網路、日期=過去 28 天
> - 圖表日期實測：new 2026-08-19 ~ 2026-09-15（28 天）／old 2026-08-11 ~ 2026-09-07（28 天）
> - 所有數字均取自 `網頁` 工作表；本報告**不與 `圖表`/`查詢數` 工作表的數字混用**（原因見 §0.2）

---

## 0. 讀法與資料限制（先讀，決定後面所有數字的可信度）

### 0.1 兩個視窗的真正關係：只有 20 天重疊，兩端各 8 天沒有對照

| 視窗 | 匯出檔 | 日期範圍 | 天數 | 與對方重疊 | 只有自己有 |
|---|---|---|---|---|---|
| old | 2026-09-10 匯出 | 2026-08-11 ~ 2026-09-07 | 28 | 08-19 ~ 09-07（20 天） | **08-11 ~ 08-18（8 天）** |
| new | 2026-09-18 匯出 | 2026-08-19 ~ 2026-09-15 | 28 | 08-19 ~ 09-07（20 天） | **09-08 ~ 09-15（8 天）** |

**這是本報告最重要的方法論限制**：§4 的「每頁展示增減」不是純變化量，而是「變化 + 視窗位移」的混合。
old 視窗多含 8/11-8/18，new 視窗多含 9/8-9/15。因此 §4 另附 **§4.6 非重疊 7 天對照**（old 7d = 09-01~09-07，new 7d = 09-09~09-15，中間僅缺 09-08 一天），
該對照不含位移成分，是判讀「最近有沒有壞掉」的主要鏡頭。

### 0.2 資料完整性（必須先講清楚）

| 口徑 | 頁面列數 | 展示 | 點擊 | CTR |
|---|---|---|---|---|
| new `combo_28d.網頁`（本報告基準） | 575 | 24,089 | 361 | 1.50% |
| new `combo_28d.圖表`（同匯出、同過濾器） | 28 天 | 20,833 | 356 | 1.71% |
| 差距 | — | **+3,256（+15.6%）** | +5 | — |
| old `combo_28d.網頁` | 548 | 23,430 | 354 | 1.51% |

- **`網頁` 表合計比同一匯出的 `圖表` 合計多 3,256 次展示（+15.6%）**。這是匯出檔內部的口徑不一致，本檔無法從資料判斷成因。
  本報告所有數字**一律以 `網頁` 表為準並保持一致**，不對 `圖表` 數字做任何換算。
- `網頁` 表 575 列 URL 全部唯一（無重複列）。
- **locale 過濾的 3 個鍵（`hk_28d` / `jp_28d` / `us_28d`）不是語系，是「國家/地區」過濾**（過濾器工作表實測：中國香港 / 日本 / 美國）。
  其 `網頁` 表合計反而**小於**同鍵 `圖表`（例：`hk_28d` 圖表 10,848 展示 / 251 點擊，`網頁` 表僅 7,360 / 44）。
  故 **§3 的語系切分一律用 `combo_28d.網頁` 的 URL 前綴 `/{locale}/` 判定**，不採用這 3 個鍵，避免混入口徑不明的數字。
- GSC 匯出最後 1-2 天可能仍在結算（資料延遲）。檔內沒有任何新鮮度欄位可證實或排除，**§4.6 的 7 天跌幅需保留此不確定性**。
- 匯出**沒有 page × query 二維表**（`查詢數` 是站級、`網頁` 是頁級，兩者無法 join）。因此 §6.4 的「同題材互相蠶食」**只能是 slug 線索假設，不是證實**。

---

## 1. Top pages 記分卡（new combo_28d，575 頁中按展示排序前 40）

| # | 頁面 | 語系 | 型 | 展示 | 點擊 | CTR | 位置 |
|---|---|---|---|---|---|---|---|
| 1 | `/zh-hk/product/a2-posters/` | zh-hk | /product/ | 980 | 17 | 1.73% | 16.13 |
| 2 | `/zh-hk/category/packaging/` | zh-hk | /category/ | 520 | 2 | 0.38% | 32.96 |
| 3 | `/zh-hk/blog/a5-vs-a6-flyer-size/` | zh-hk | /blog/ | 510 | 0 | 0.00% | 7.85 |
| 4 | `/zh-hk/` | zh-hk | home | 464 | 34 | 7.33% | 20.88 |
| 5 | `/zh-hk/category/stickers/` | zh-hk | /category/ | 455 | 6 | 1.32% | 34.27 |
| 6 | `/zh-hk/category/posters/` | zh-hk | /category/ | 416 | 4 | 0.96% | 36.13 |
| 7 | `/zh-hk/category/calendars/` | zh-hk | /category/ | 397 | 3 | 0.76% | 21.13 |
| 8 | `/en/product/small-batch-stickers/` | en | /product/ | 396 | 0 | 0.00% | 17.81 |
| 9 | `/en/product/a2-posters/` | en | /product/ | 385 | 1 | 0.26% | 45.45 |
| 10 | `/zh-hk/services/rush-printing-delivery/` | zh-hk | /services/ | 382 | 10 | 2.62% | 16.37 |
| 11 | `/zh-hk/blog/poster-size-guide/` | zh-hk | /blog/ | 373 | 1 | 0.27% | 15.54 |
| 12 | `/en/product/doujinshi-printing/` | en | /product/ | 359 | 5 | 1.39% | 11.72 |
| 13 | `/zh-hk/category/flyers/` | zh-hk | /category/ | 338 | 6 | 1.78% | 29.62 |
| 14 | `/zh-hk/blog/poster-printing-guide/` | zh-hk | /blog/ | 325 | 2 | 0.62% | 13.10 |
| 15 | `/zh-hk/category/paper-bags/` | zh-hk | /category/ | 319 | 2 | 0.63% | 31.58 |
| 16 | `/en/product/catalog-printing/` | en | /product/ | 307 | 0 | 0.00% | 29.71 |
| 17 | `/zh-hk/product/waterproof-stickers/` | zh-hk | /product/ | 304 | 8 | 2.63% | 9.44 |
| 18 | `/zh-hk/category/books/` | zh-hk | /category/ | 301 | 3 | 1.00% | 33.70 |
| 19 | `/zh-hk/product/business-envelopes/` | zh-hk | /product/ | 299 | 1 | 0.33% | 11.40 |
| 20 | `/en/product/exercise-books/` | en | /product/ | 289 | 0 | 0.00% | 23.26 |
| 21 | `/zh-hk/product/same-day-flyers/` | zh-hk | /product/ | 279 | 15 | 5.38% | 16.05 |
| 22 | `/zh-hk/blog/food-packaging-printing-guide/` | zh-hk | /blog/ | 259 | 1 | 0.39% | 12.63 |
| 23 | `/zh-hk/product/saddle-stitch-booklets/` | zh-hk | /product/ | 256 | 2 | 0.78% | 34.80 |
| 24 | `/zh-hk/product/electronics-packaging-box/` | zh-hk | /product/ | 253 | 1 | 0.40% | 49.51 |
| 25 | `/zh-hk/blog/mtr-advertising-specs/` | zh-hk | /blog/ | 230 | 8 | 3.48% | 6.70 |
| 26 | `/en/product/saddle-stitch-booklets/` | en | /product/ | 225 | 0 | 0.00% | 67.00 |
| 27 | `/en/blog/flyer-sizes-compared/` | en | /blog/ | 224 | 0 | 0.00% | 14.44 |
| 28 | `/en/blog/catalog-printing-china-supplier-guide/` | en | /blog/ | 216 | 0 | 0.00% | 16.90 |
| 29 | `/zh-hk/product/custom-calendars/` | zh-hk | /product/ | 215 | 1 | 0.47% | 22.25 |
| 30 | `/zh-hk/product/large-envelopes/` | zh-hk | /product/ | 203 | 3 | 1.48% | 6.37 |
| 31 | `/en/blog/calendar-printing-guide/` | en | /blog/ | 203 | 0 | 0.00% | 32.57 |
| 32 | `/zh-hk/product/handle-bags/` | zh-hk | /product/ | 199 | 1 | 0.50% | 15.91 |
| 33 | `/zh-hk/blog/saddle-stitch-booklet-printing-guide/` | zh-hk | /blog/ | 199 | 0 | 0.00% | 13.29 |
| 34 | `/zh-hk/category/red-packets/` | zh-hk | /category/ | 198 | 3 | 1.52% | 22.55 |
| 35 | `/zh-hk/product/large-bags/` | zh-hk | /product/ | 187 | 4 | 2.14% | 17.18 |
| 36 | `/zh-hk/blog/poster-printing-price-guide/` | zh-hk | /blog/ | 185 | 2 | 1.08% | 14.90 |
| 37 | `/zh-hk/product/transparent-stickers/` | zh-hk | /product/ | 184 | 5 | 2.72% | 15.78 |
| 38 | `/ja/product/doujinshi-printing/` | ja | /product/ | 183 | 4 | 2.19% | 19.27 |
| 39 | `/zh-hk/product/a5-flyers/` | zh-hk | /product/ | 170 | 2 | 1.18% | 30.56 |
| 40 | `/en/` | en | home | 169 | 4 | 2.37% | 11.57 |
| | **前 40 合計** | | | **12,356** | **161** | **1.30%** | — |

前 40 頁（佔全部頁面 6.96%）承載 12,356 次展示（**51.3%** 的頁面層展示）與 161 次點擊（**44.6%**）。

### 1.1 按 URL 路徑型分組

| 型 | 頁數 | 展示 | 佔展示 | 點擊 | 佔點擊 | 加權 CTR | 加權位置 |
|---|---|---|---|---|---|---|---|
| /product/ | 265 | 12,100 | 50.23% | 192 | 53.19% | 1.59% | 22.76 |
| /blog/ | 214 | 6,477 | 26.89% | 61 | 16.90% | 0.94% | 15.15 |
| /category/ | 50 | 3,955 | 16.42% | 50 | 13.85% | 1.26% | 27.10 |
| /services/ | 6 | 433 | 1.80% | 11 | 3.05% | 2.54% | 17.40 |
| home | 6 | 673 | 2.79% | 41 | 11.36% | 6.09% | 17.48 |
| other | 34 | 451 | 1.87% | 6 | 1.66% | 1.33% | 9.97 |
| **合計** | **575** | **24,089** | **100.00%** | **361** | **100.00%** | **1.50%** | **20.94** |

讀法：

- **`/product/`（265 頁，含 1 條無 locale 前綴的舊名片 URL，見 §6.6）是展示主體**：12,100 展示（50.2%），但加權 CTR 只有 1.59%、加權位置 22.76（多數落在第 3 頁之後）。
- **`/blog/`（214 頁）是第二主體**：6,477 展示（26.9%），加權 CTR 0.94%，但加權位置 15.15 明顯優於 product ——**內容頁排得比產品頁前面，卻轉不出點擊**（§2 的核心）。
- **`/category/` 只有 50 頁但吃掉 3,955 展示（16.4%）**，加權位置 27.10 是全型最差（分類頁排在第 3 頁後）。
- **`/guide/` 零頁**：站內 buying-guide 形態內容實際掛在 `/{locale}/blog/...-guide/`（例 `en/blog/catalog-printing-guide/`），GSC 頁面表中沒有任何 `/{locale}/guide/` 開頭 URL。
- `home`（6 列，含 3 個裸網域與 3 個 `/{locale}/` 首頁）展示 673、點擊 41，加權 CTR 6.09% —— 全站最高效的一塊。
- `other`（34 頁）包含 `service-areas`、`payment-methods`、`company-news`、`about` 等非產品/內容頁。

---

## 2. ★ 有展示但幾乎零點擊（本報告核心）

門檻：`展示 ≥ 50` 且 `點擊 ≤ 1`。**符合頁面 65 頁，合計鎖住 8,547 次展示**（= 頁面層全部展示的 35.5%），只換來 25 次點擊。

| 判定 | 頁數 | 展示 | 佔全部展示 | 點擊 | 加權 CTR | 讀法 |
|---|---|---|---|---|---|---|
| **GOOD-POS（位置 ≤ 12）** | 16 | 1,866 | 7.75% | 7 | 0.38% | **摘要/snippet 問題**：已經排在第一頁，Google 也給了曝光，但沒人點 |
| **POOR-POS（位置 > 12）** | 49 | 6,681 | 27.73% | 18 | 0.27% | **排名問題**：曝光來自第 2-7 頁，先修排名，摘要不是第一因 |
| **合計** | **65** | **8,547** | **35.48%** | **25** | **0.29%** | — |

補充（同口徑）:

- 其中 **點擊恰好 0** 的有 40 頁、5,043 次展示。
- 全站口徑更寬的同一現象：**575 頁中有 428 頁（74.4%）28 天內點擊為 0**，這些頁面吃掉 9,078 次展示（37.7%）。
- **GOOD-POS 組的型別分布**：zh-hk blog 5、zh-hk product 4、en blog 4、zh-hk other 1、zh-hk category 1、en category 1 → **未有任何 ja 頁面**。
- **POOR-POS 組的型別分布**：en product 14、zh-hk blog 9、zh-hk product 8、en blog 8、ja product 6、en/zh-hk category 各 1、ja blog 1、en other 1。
- 對照組：排第 1 的 `zh-hk/product/a2-posters/`（980 展示 / 位置 16.13）拿到 17 次點擊（CTR 1.73%）—— 證明**位置差不等於零點擊**，
  真正異常的是 GOOD-POS 組那種「位置好、曝光足、點擊 0」。

### 2.1 全部 65 頁明細（按展示 desc）

| # | 頁面 | 語系 | 型 | 展示 | 點擊 | CTR | 位置 | 判定 | old 窗 展示/點擊 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `/zh-hk/blog/a5-vs-a6-flyer-size/` | zh-hk | /blog/ | 510 | 0 | 0.00% | 7.85 | **GOOD-POS 摘要** | 536 / 1 |
| 2 | `/en/product/small-batch-stickers/` | en | /product/ | 396 | 0 | 0.00% | 17.81 | **POOR-POS 排名** | 405 / 0 |
| 3 | `/en/product/a2-posters/` | en | /product/ | 385 | 1 | 0.26% | 45.45 | **POOR-POS 排名** | 443 / 1 |
| 4 | `/zh-hk/blog/poster-size-guide/` | zh-hk | /blog/ | 373 | 1 | 0.27% | 15.54 | **POOR-POS 排名** | 419 / 1 |
| 5 | `/en/product/catalog-printing/` | en | /product/ | 307 | 0 | 0.00% | 29.71 | **POOR-POS 排名** | 445 / 1 |
| 6 | `/zh-hk/product/business-envelopes/` | zh-hk | /product/ | 299 | 1 | 0.33% | 11.40 | **GOOD-POS 摘要** | 233 / 2 |
| 7 | `/en/product/exercise-books/` | en | /product/ | 289 | 0 | 0.00% | 23.26 | **POOR-POS 排名** | 355 / 0 |
| 8 | `/zh-hk/blog/food-packaging-printing-guide/` | zh-hk | /blog/ | 259 | 1 | 0.39% | 12.63 | **POOR-POS 排名** | 209 / 1 |
| 9 | `/zh-hk/product/electronics-packaging-box/` | zh-hk | /product/ | 253 | 1 | 0.40% | 49.51 | **POOR-POS 排名** | 219 / 1 |
| 10 | `/en/product/saddle-stitch-booklets/` | en | /product/ | 225 | 0 | 0.00% | 67.00 | **POOR-POS 排名** | 358 / 0 |
| 11 | `/en/blog/flyer-sizes-compared/` | en | /blog/ | 224 | 0 | 0.00% | 14.44 | **POOR-POS 排名** | 258 / 0 |
| 12 | `/en/blog/catalog-printing-china-supplier-guide/` | en | /blog/ | 216 | 0 | 0.00% | 16.90 | **POOR-POS 排名** | 149 / 0 |
| 13 | `/zh-hk/product/custom-calendars/` | zh-hk | /product/ | 215 | 1 | 0.47% | 22.25 | **POOR-POS 排名** | 98 / 0 |
| 14 | `/en/blog/calendar-printing-guide/` | en | /blog/ | 203 | 0 | 0.00% | 32.57 | **POOR-POS 排名** | 184 / 0 |
| 15 | `/zh-hk/product/handle-bags/` | zh-hk | /product/ | 199 | 1 | 0.50% | 15.91 | **POOR-POS 排名** | 129 / 0 |
| 16 | `/zh-hk/blog/saddle-stitch-booklet-printing-guide/` | zh-hk | /blog/ | 199 | 0 | 0.00% | 13.29 | **POOR-POS 排名** | 142 / 0 |
| 17 | `/ja/product/waterproof-stickers/` | ja | /product/ | 138 | 1 | 0.72% | 15.18 | **POOR-POS 排名** | 108 / 1 |
| 18 | `/en/product/foil-stickers/` | en | /product/ | 136 | 0 | 0.00% | 39.51 | **POOR-POS 排名** | 133 / 0 |
| 19 | `/zh-hk/product/kraft-paper-bags/` | zh-hk | /product/ | 130 | 1 | 0.77% | 11.17 | **GOOD-POS 摘要** | 109 / 1 |
| 20 | `/en/blog/eco-paper-bag-gsm/` | en | /blog/ | 128 | 0 | 0.00% | 13.05 | **POOR-POS 排名** | 112 / 0 |
| 21 | `/zh-hk/blog/sticker-buying-guide/` | zh-hk | /blog/ | 123 | 0 | 0.00% | 16.82 | **POOR-POS 排名** | 75 / 0 |
| 22 | `/zh-hk/product/roll-up-banners/` | zh-hk | /product/ | 121 | 1 | 0.83% | 48.72 | **POOR-POS 排名** | 141 / 1 |
| 23 | `/en/category/japan-doujin/` | en | /category/ | 118 | 0 | 0.00% | 15.41 | **POOR-POS 排名** | 146 / 0 |
| 24 | `/zh-hk/product/folded-leaflets/` | zh-hk | /product/ | 113 | 1 | 0.88% | 24.25 | **POOR-POS 排名** | 99 / 1 |
| 25 | `/zh-hk/product/vehicle-wraps/` | zh-hk | /product/ | 112 | 1 | 0.89% | 46.44 | **POOR-POS 排名** | 91 / 1 |
| 26 | `/zh-hk/blog/design-file-specs/` | zh-hk | /blog/ | 105 | 0 | 0.00% | 9.71 | **GOOD-POS 摘要** | 103 / 0 |
| 27 | `/zh-hk/blog/graduation-yearbook-printing-guide/` | zh-hk | /blog/ | 95 | 0 | 0.00% | 7.05 | **GOOD-POS 摘要** | 87 / 1 |
| 28 | `/en/product/same-day-flyers/` | en | /product/ | 93 | 0 | 0.00% | 40.39 | **POOR-POS 排名** | 109 / 2 |
| 29 | `/zh-hk/blog/poster-buying-guide/` | zh-hk | /blog/ | 92 | 0 | 0.00% | 57.98 | **POOR-POS 排名** | 83 / 0 |
| 30 | `/ja/product/same-day-flyers/` | ja | /product/ | 91 | 0 | 0.00% | 26.16 | **POOR-POS 排名** | 84 / 0 |
| 31 | `/zh-hk/blog/2027-monthly-calendar-printing-timetable/` | zh-hk | /blog/ | 89 | 1 | 1.12% | 7.38 | **GOOD-POS 摘要** | 48 / 1 |
| 32 | `/en/blog/saddle-stitch-booklet-printing-guide/` | en | /blog/ | 89 | 0 | 0.00% | 8.33 | **GOOD-POS 摘要** | 83 / 0 |
| 33 | `/zh-hk/product/outdoor-vinyl-banners/` | zh-hk | /product/ | 88 | 0 | 0.00% | 52.09 | **POOR-POS 排名** | 77 / 0 |
| 34 | `/zh-hk/blog/sticker-guide/` | zh-hk | /blog/ | 87 | 1 | 1.15% | 66.13 | **POOR-POS 排名** | 96 / 1 |
| 35 | `/zh-hk/blog/cmyk-guide/` | zh-hk | /blog/ | 84 | 1 | 1.19% | 18.30 | **POOR-POS 排名** | 75 / 1 |
| 36 | `/zh-hk/category/menus/` | zh-hk | /category/ | 82 | 0 | 0.00% | 27.95 | **POOR-POS 排名** | 78 / 0 |
| 37 | `/en/blog/poster-printing-price-guide/` | en | /blog/ | 81 | 0 | 0.00% | 6.83 | **GOOD-POS 摘要** | 69 / 0 |
| 38 | `/en/product/waterproof-stickers/` | en | /product/ | 80 | 1 | 1.25% | 40.46 | **POOR-POS 排名** | 89 / 1 |
| 39 | `/en/product/adhesive-posters/` | en | /product/ | 79 | 0 | 0.00% | 39.76 | **POOR-POS 排名** | 59 / 0 |
| 40 | `/en/blog/paper-bag-printing-guide/` | en | /blog/ | 78 | 0 | 0.00% | 13.44 | **POOR-POS 排名** | 110 / 1 |
| 41 | `/zh-hk/product/colored-envelopes/` | zh-hk | /product/ | 77 | 1 | 1.30% | 5.30 | **GOOD-POS 摘要** | 78 / 2 |
| 42 | `/ja/product/kraft-paper-packaging-box/` | ja | /product/ | 77 | 1 | 1.30% | 18.38 | **POOR-POS 排名** | 73 / 1 |
| 43 | `/en/product/a1-posters/` | en | /product/ | 74 | 1 | 1.35% | 34.18 | **POOR-POS 排名** | 71 / 1 |
| 44 | `/ja/product/a2-posters/` | ja | /product/ | 74 | 0 | 0.00% | 18.14 | **POOR-POS 排名** | 98 / 0 |
| 45 | `/en/product/eco-paper-bags/` | en | /product/ | 74 | 0 | 0.00% | 45.09 | **POOR-POS 排名** | 68 / 0 |
| 46 | `/zh-hk/blog/sticker-design/` | zh-hk | /blog/ | 72 | 0 | 0.00% | 13.96 | **POOR-POS 排名** | 48 / 0 |
| 47 | `/en/product/die-cut-stickers/` | en | /product/ | 72 | 0 | 0.00% | 44.93 | **POOR-POS 排名** | 67 / 0 |
| 48 | `/en/blog/cmyk-guide/` | en | /blog/ | 69 | 0 | 0.00% | 42.77 | **POOR-POS 排名** | 81 / 0 |
| 49 | `/ja/blog/cmyk-guide/` | ja | /blog/ | 65 | 1 | 1.54% | 63.62 | **POOR-POS 排名** | 67 / 1 |
| 50 | `/ja/product/double-sided-flyers/` | ja | /product/ | 65 | 0 | 0.00% | 29.68 | **POOR-POS 排名** | 65 / 0 |
| 51 | `/en/blog/a5-vs-a6-flyer-size/` | en | /blog/ | 64 | 0 | 0.00% | 7.48 | **GOOD-POS 摘要** | 58 / 0 |
| 52 | `/zh-hk/product/acrylic-keychain/` | zh-hk | /product/ | 63 | 1 | 1.59% | 24.35 | **POOR-POS 排名** | 38 / 0 |
| 53 | `/zh-hk/service-areas/` | zh-hk | other | 63 | 0 | 0.00% | 7.52 | **GOOD-POS 摘要** | 57 / 0 |
| 54 | `/en/blog/restaurant-menu-printing-guide/` | en | /blog/ | 63 | 0 | 0.00% | 31.40 | **POOR-POS 排名** | 67 / 0 |
| 55 | `/en/product/removable-stickers/` | en | /product/ | 60 | 0 | 0.00% | 40.65 | **POOR-POS 排名** | 92 / 0 |
| 56 | `/en/blog/mtr-advertising-specs/` | en | /blog/ | 56 | 0 | 0.00% | 13.70 | **POOR-POS 排名** | 73 / 0 |
| 57 | `/zh-hk/product/laminated-menus/` | zh-hk | /product/ | 55 | 0 | 0.00% | 7.38 | **GOOD-POS 摘要** | 27 / 0 |
| 58 | `/en/category/flyers/` | en | /category/ | 54 | 1 | 1.85% | 9.56 | **GOOD-POS 摘要** | 42 / 1 |
| 59 | `/en/payment-methods/` | en | other | 54 | 1 | 1.85% | 13.20 | **POOR-POS 排名** | 70 / 1 |
| 60 | `/ja/product/can-badge/` | ja | /product/ | 54 | 0 | 0.00% | 33.41 | **POOR-POS 排名** | 50 / 0 |
| 61 | `/zh-hk/category/envelopes/` | zh-hk | /category/ | 53 | 1 | 1.89% | 11.11 | **GOOD-POS 摘要** | 49 / 1 |
| 62 | `/zh-hk/blog/eco-printing/` | zh-hk | /blog/ | 53 | 0 | 0.00% | 15.79 | **POOR-POS 排名** | 58 / 0 |
| 63 | `/en/blog/marathon-event-poster-printing-guide/` | en | /blog/ | 52 | 0 | 0.00% | 6.04 | **GOOD-POS 摘要** | 31 / 0 |
| 64 | `/zh-hk/blog/sticker-materials/` | zh-hk | /blog/ | 50 | 1 | 2.00% | 5.56 | **GOOD-POS 摘要** | 43 / 2 |
| 65 | `/en/product/kraft-paper-packaging-box/` | en | /product/ | 50 | 0 | 0.00% | 32.68 | **POOR-POS 排名** | 41 / 0 |

---

## 3. 語系切分（按 URL 前綴 `/{locale}/`，取自 combo_28d.網頁）

| 語系 | 頁數 | 佔頁數 | 展示 | 佔展示 | 點擊 | 佔點擊 | 加權 CTR | 加權位置 | 每次點擊需要展示 |
|---|---|---|---|---|---|---|---|---|---|
| zh-hk | 211 | 36.7% | 15,241 | 63.27% | 289 | 80.06% | 1.90% | 19.31 | 52.7 |
| en | 208 | 36.2% | 6,781 | 28.15% | 38 | 10.53% | 0.56% | 25.09 | 178.4 |
| ja | 152 | 26.4% | 2,032 | 8.44% | 32 | 8.86% | 1.57% | 19.65 | 63.5 |
| other | 4 | 0.7% | 35 | 0.15% | 2 | 0.55% | 5.71% | 3.23 | 17.5 |
| **合計** | **575** | **100.00%** | **24,089** | **100.00%** | **361** | **100.00%** | **1.50%** | **20.94** | **66.7** |

**業者說 en / ja 與 zh-hk 「表現很不一樣」——數據完全支持，而且量級比預期更大：**

- **en 佔 208 頁（36.2% 的頁面）卻只拿到 38 次點擊（10.5% 的點擊）**；en 每換到 1 次點擊需要 **178.4 次展示**，zh-hk 只要 52.7 次、ja 只要 63.5 次 —— **en 的 CTR 只有 zh-hk 的 30%**。
- en 加權 CTR **0.56%**，只有 zh-hk（1.90%）的 3.38 分之一、ja（1.57%）的 2.81 分之一。
- en 的加權位置 25.09 是三語系最差（zh-hk 19.31、ja 19.65）→ **en 的既有內容普遍排在第 3 頁之後，曝光換不到點擊**。
- ja 是**小體量高效率**：152 頁只有 2,032 展示（8.4%），但 CTR 1.57% 高於 en 近 2.8 倍。ja 的問題不是轉化，是**曝光量太小**。

### 3.1 zh-hk — 展示 ≥ 50 且點擊 ≤ 1（29 頁，4,114 展示）

- GOOD-POS（摘要問題）：**11 頁 / 1,526 展示 / 6 點擊**
- POOR-POS（排名問題）：**18 頁 / 2,588 展示 / 11 點擊**

| 頁面 | 型 | 展示 | 點擊 | CTR | 位置 | 判定 |
|---|---|---|---|---|---|---|
| `/zh-hk/blog/a5-vs-a6-flyer-size/` | /blog/ | 510 | 0 | 0.00% | 7.85 | GOOD-POS 摘要 |
| `/zh-hk/blog/poster-size-guide/` | /blog/ | 373 | 1 | 0.27% | 15.54 | POOR-POS 排名 |
| `/zh-hk/product/business-envelopes/` | /product/ | 299 | 1 | 0.33% | 11.40 | GOOD-POS 摘要 |
| `/zh-hk/blog/food-packaging-printing-guide/` | /blog/ | 259 | 1 | 0.39% | 12.63 | POOR-POS 排名 |
| `/zh-hk/product/electronics-packaging-box/` | /product/ | 253 | 1 | 0.40% | 49.51 | POOR-POS 排名 |
| `/zh-hk/product/custom-calendars/` | /product/ | 215 | 1 | 0.47% | 22.25 | POOR-POS 排名 |
| `/zh-hk/product/handle-bags/` | /product/ | 199 | 1 | 0.50% | 15.91 | POOR-POS 排名 |
| `/zh-hk/blog/saddle-stitch-booklet-printing-guide/` | /blog/ | 199 | 0 | 0.00% | 13.29 | POOR-POS 排名 |
| `/zh-hk/product/kraft-paper-bags/` | /product/ | 130 | 1 | 0.77% | 11.17 | GOOD-POS 摘要 |
| `/zh-hk/blog/sticker-buying-guide/` | /blog/ | 123 | 0 | 0.00% | 16.82 | POOR-POS 排名 |
| `/zh-hk/product/roll-up-banners/` | /product/ | 121 | 1 | 0.83% | 48.72 | POOR-POS 排名 |
| `/zh-hk/product/folded-leaflets/` | /product/ | 113 | 1 | 0.88% | 24.25 | POOR-POS 排名 |
| `/zh-hk/product/vehicle-wraps/` | /product/ | 112 | 1 | 0.89% | 46.44 | POOR-POS 排名 |
| `/zh-hk/blog/design-file-specs/` | /blog/ | 105 | 0 | 0.00% | 9.71 | GOOD-POS 摘要 |
| `/zh-hk/blog/graduation-yearbook-printing-guide/` | /blog/ | 95 | 0 | 0.00% | 7.05 | GOOD-POS 摘要 |
| `/zh-hk/blog/poster-buying-guide/` | /blog/ | 92 | 0 | 0.00% | 57.98 | POOR-POS 排名 |
| `/zh-hk/blog/2027-monthly-calendar-printing-timetable/` | /blog/ | 89 | 1 | 1.12% | 7.38 | GOOD-POS 摘要 |
| `/zh-hk/product/outdoor-vinyl-banners/` | /product/ | 88 | 0 | 0.00% | 52.09 | POOR-POS 排名 |
| `/zh-hk/blog/sticker-guide/` | /blog/ | 87 | 1 | 1.15% | 66.13 | POOR-POS 排名 |
| `/zh-hk/blog/cmyk-guide/` | /blog/ | 84 | 1 | 1.19% | 18.30 | POOR-POS 排名 |
| `/zh-hk/category/menus/` | /category/ | 82 | 0 | 0.00% | 27.95 | POOR-POS 排名 |
| `/zh-hk/product/colored-envelopes/` | /product/ | 77 | 1 | 1.30% | 5.30 | GOOD-POS 摘要 |
| `/zh-hk/blog/sticker-design/` | /blog/ | 72 | 0 | 0.00% | 13.96 | POOR-POS 排名 |
| `/zh-hk/product/acrylic-keychain/` | /product/ | 63 | 1 | 1.59% | 24.35 | POOR-POS 排名 |
| `/zh-hk/service-areas/` | other | 63 | 0 | 0.00% | 7.52 | GOOD-POS 摘要 |
| `/zh-hk/product/laminated-menus/` | /product/ | 55 | 0 | 0.00% | 7.38 | GOOD-POS 摘要 |
| `/zh-hk/category/envelopes/` | /category/ | 53 | 1 | 1.89% | 11.11 | GOOD-POS 摘要 |
| `/zh-hk/blog/eco-printing/` | /blog/ | 53 | 0 | 0.00% | 15.79 | POOR-POS 排名 |
| `/zh-hk/blog/sticker-materials/` | /blog/ | 50 | 1 | 2.00% | 5.56 | GOOD-POS 摘要 |

### 3.2 en — 展示 ≥ 50 且點擊 ≤ 1（29 頁，3,869 展示）

- GOOD-POS（摘要問題）：**5 頁 / 340 展示 / 1 點擊**
- POOR-POS（排名問題）：**24 頁 / 3,529 展示 / 4 點擊**

| 頁面 | 型 | 展示 | 點擊 | CTR | 位置 | 判定 |
|---|---|---|---|---|---|---|
| `/en/product/small-batch-stickers/` | /product/ | 396 | 0 | 0.00% | 17.81 | POOR-POS 排名 |
| `/en/product/a2-posters/` | /product/ | 385 | 1 | 0.26% | 45.45 | POOR-POS 排名 |
| `/en/product/catalog-printing/` | /product/ | 307 | 0 | 0.00% | 29.71 | POOR-POS 排名 |
| `/en/product/exercise-books/` | /product/ | 289 | 0 | 0.00% | 23.26 | POOR-POS 排名 |
| `/en/product/saddle-stitch-booklets/` | /product/ | 225 | 0 | 0.00% | 67.00 | POOR-POS 排名 |
| `/en/blog/flyer-sizes-compared/` | /blog/ | 224 | 0 | 0.00% | 14.44 | POOR-POS 排名 |
| `/en/blog/catalog-printing-china-supplier-guide/` | /blog/ | 216 | 0 | 0.00% | 16.90 | POOR-POS 排名 |
| `/en/blog/calendar-printing-guide/` | /blog/ | 203 | 0 | 0.00% | 32.57 | POOR-POS 排名 |
| `/en/product/foil-stickers/` | /product/ | 136 | 0 | 0.00% | 39.51 | POOR-POS 排名 |
| `/en/blog/eco-paper-bag-gsm/` | /blog/ | 128 | 0 | 0.00% | 13.05 | POOR-POS 排名 |
| `/en/category/japan-doujin/` | /category/ | 118 | 0 | 0.00% | 15.41 | POOR-POS 排名 |
| `/en/product/same-day-flyers/` | /product/ | 93 | 0 | 0.00% | 40.39 | POOR-POS 排名 |
| `/en/blog/saddle-stitch-booklet-printing-guide/` | /blog/ | 89 | 0 | 0.00% | 8.33 | GOOD-POS 摘要 |
| `/en/blog/poster-printing-price-guide/` | /blog/ | 81 | 0 | 0.00% | 6.83 | GOOD-POS 摘要 |
| `/en/product/waterproof-stickers/` | /product/ | 80 | 1 | 1.25% | 40.46 | POOR-POS 排名 |
| `/en/product/adhesive-posters/` | /product/ | 79 | 0 | 0.00% | 39.76 | POOR-POS 排名 |
| `/en/blog/paper-bag-printing-guide/` | /blog/ | 78 | 0 | 0.00% | 13.44 | POOR-POS 排名 |
| `/en/product/a1-posters/` | /product/ | 74 | 1 | 1.35% | 34.18 | POOR-POS 排名 |
| `/en/product/eco-paper-bags/` | /product/ | 74 | 0 | 0.00% | 45.09 | POOR-POS 排名 |
| `/en/product/die-cut-stickers/` | /product/ | 72 | 0 | 0.00% | 44.93 | POOR-POS 排名 |
| `/en/blog/cmyk-guide/` | /blog/ | 69 | 0 | 0.00% | 42.77 | POOR-POS 排名 |
| `/en/blog/a5-vs-a6-flyer-size/` | /blog/ | 64 | 0 | 0.00% | 7.48 | GOOD-POS 摘要 |
| `/en/blog/restaurant-menu-printing-guide/` | /blog/ | 63 | 0 | 0.00% | 31.40 | POOR-POS 排名 |
| `/en/product/removable-stickers/` | /product/ | 60 | 0 | 0.00% | 40.65 | POOR-POS 排名 |
| `/en/blog/mtr-advertising-specs/` | /blog/ | 56 | 0 | 0.00% | 13.70 | POOR-POS 排名 |
| `/en/category/flyers/` | /category/ | 54 | 1 | 1.85% | 9.56 | GOOD-POS 摘要 |
| `/en/payment-methods/` | other | 54 | 1 | 1.85% | 13.20 | POOR-POS 排名 |
| `/en/blog/marathon-event-poster-printing-guide/` | /blog/ | 52 | 0 | 0.00% | 6.04 | GOOD-POS 摘要 |
| `/en/product/kraft-paper-packaging-box/` | /product/ | 50 | 0 | 0.00% | 32.68 | POOR-POS 排名 |

### 3.3 ja — 展示 ≥ 50 且點擊 ≤ 1（7 頁，564 展示）

- GOOD-POS（摘要問題）：**0 頁 / 0 展示 / 0 點擊**
- POOR-POS（排名問題）：**7 頁 / 564 展示 / 3 點擊**

| 頁面 | 型 | 展示 | 點擊 | CTR | 位置 | 判定 |
|---|---|---|---|---|---|---|
| `/ja/product/waterproof-stickers/` | /product/ | 138 | 1 | 0.72% | 15.18 | POOR-POS 排名 |
| `/ja/product/same-day-flyers/` | /product/ | 91 | 0 | 0.00% | 26.16 | POOR-POS 排名 |
| `/ja/product/kraft-paper-packaging-box/` | /product/ | 77 | 1 | 1.30% | 18.38 | POOR-POS 排名 |
| `/ja/product/a2-posters/` | /product/ | 74 | 0 | 0.00% | 18.14 | POOR-POS 排名 |
| `/ja/blog/cmyk-guide/` | /blog/ | 65 | 1 | 1.54% | 63.62 | POOR-POS 排名 |
| `/ja/product/double-sided-flyers/` | /product/ | 65 | 0 | 0.00% | 29.68 | POOR-POS 排名 |
| `/ja/product/can-badge/` | /product/ | 54 | 0 | 0.00% | 33.41 | POOR-POS 排名 |

**語系差異的一句話結論**：zh-hk 的零點擊頁一半是「排得前面卻不點」（摘要），
en 的零點擊頁 **29 頁中有 24 頁是排名問題**（含 14 個 en product 頁），ja 的零點擊頁 **7 頁全部是排名問題、GOOD-POS 為 0**。
同樣的「修摘要」動作在 en 幾乎無效（位置 >12 的頁面點不到是排名問題），修法必須分語系。

---

## 4. old vs new 逐頁對照

| 項 | old（~09-07） | new（~09-15） | 差 |
|---|---|---|---|
| 頁面列數 | 548 | 575 | +27 |
| 展示 | 23,430 | 24,089 | +659 |
| 點擊 | 354 | 361 | +7 |
| 兩窗共有頁 | — | 539 | old 獨有 9 / new 獨有 36 |

### 4.1 展示增幅 Top 15（共有頁）

| 展示增 | old 展示 | new 展示 | old 點擊 | new 點擊 | old 位置 | new 位置 | 頁面 |
|---|---|---|---|---|---|---|---|
| **+209** | 255 | 464 | 22 | 34 | 20.62 | 20.88 | `/zh-hk/` |
| **+140** | 185 | 325 | 1 | 2 | 13.45 | 13.10 | `/zh-hk/blog/poster-printing-guide/` |
| **+138** | 163 | 301 | 2 | 3 | 26.74 | 33.70 | `/zh-hk/category/books/` |
| **+117** | 98 | 215 | 0 | 1 | 24.83 | 22.25 | `/zh-hk/product/custom-calendars/` |
| **+103** | 877 | 980 | 17 | 17 | 16.80 | 16.13 | `/zh-hk/product/a2-posters/` |
| **+70** | 129 | 199 | 0 | 1 | 9.83 | 15.91 | `/zh-hk/product/handle-bags/` |
| **+67** | 149 | 216 | 0 | 0 | 16.94 | 16.90 | `/en/blog/catalog-printing-china-supplier-guide/` |
| **+66** | 233 | 299 | 2 | 1 | 12.33 | 11.40 | `/zh-hk/product/business-envelopes/` |
| **+57** | 142 | 199 | 0 | 0 | 13.18 | 13.29 | `/zh-hk/blog/saddle-stitch-booklet-printing-guide/` |
| **+50** | 209 | 259 | 1 | 1 | 12.88 | 12.63 | `/zh-hk/blog/food-packaging-printing-guide/` |
| **+50** | 135 | 185 | 1 | 2 | 18.10 | 14.90 | `/zh-hk/blog/poster-printing-price-guide/` |
| **+48** | 75 | 123 | 0 | 0 | 17.79 | 16.82 | `/zh-hk/blog/sticker-buying-guide/` |
| **+43** | 316 | 359 | 2 | 5 | 12.02 | 11.72 | `/en/product/doujinshi-printing/` |
| **+41** | 48 | 89 | 1 | 1 | 7.71 | 7.38 | `/zh-hk/blog/2027-monthly-calendar-printing-timetable/` |
| **+40** | 2 | 42 | 0 | 0 | 6.50 | 14.79 | `/zh-hk/blog/paper-bag-printing-guide/` |

### 4.2 展示跌幅 Top 15（共有頁）

| 展示減 | old 展示 | new 展示 | old 點擊 | new 點擊 | old 位置 | new 位置 | 頁面 |
|---|---|---|---|---|---|---|---|
| **-274** | 317 | 43 | 0 | 0 | 69.03 | 59.28 | `/en/blog/poster-size-guide/` |
| **-138** | 445 | 307 | 1 | 0 | 38.89 | 29.71 | `/en/product/catalog-printing/` |
| **-133** | 358 | 225 | 0 | 0 | 75.53 | 67.00 | `/en/product/saddle-stitch-booklets/` |
| **-112** | 143 | 31 | 0 | 0 | 53.82 | 52.61 | `/en/product/perfect-bound-books/` |
| **-88** | 158 | 70 | 2 | 2 | 50.52 | 10.31 | `/en/category/books/` |
| **-78** | 460 | 382 | 12 | 10 | 18.02 | 16.37 | `/zh-hk/services/rush-printing-delivery/` |
| **-66** | 355 | 289 | 0 | 0 | 25.63 | 23.26 | `/en/product/exercise-books/` |
| **-66** | 100 | 34 | 0 | 0 | 12.92 | 11.09 | `/zh-hk/blog/paper-bag-buying-guide/` |
| **-63** | 95 | 32 | 4 | 4 | 42.01 | 10.06 | `/zh-hk/product/a4-flyers/` |
| **-63** | 81 | 18 | 0 | 0 | 49.52 | 47.61 | `/ja/product/textbooks/` |
| **-62** | 517 | 455 | 7 | 6 | 33.19 | 34.27 | `/zh-hk/category/stickers/` |
| **-58** | 443 | 385 | 1 | 1 | 47.93 | 45.45 | `/en/product/a2-posters/` |
| **-46** | 419 | 373 | 1 | 1 | 14.41 | 15.54 | `/zh-hk/blog/poster-size-guide/` |
| **-45** | 565 | 520 | 4 | 2 | 33.22 | 32.96 | `/zh-hk/category/packaging/` |
| **-44** | 156 | 112 | 8 | 4 | 8.18 | 10.63 | `/zh-hk/product/certificates/` |

### 4.3 點擊跌幅 Top 10（共有頁）

| 點擊減 | old 點擊 | new 點擊 | old 展示 | new 展示 | old 位置 | new 位置 | 頁面 |
|---|---|---|---|---|---|---|---|
| **-4** | 8 | 4 | 156 | 112 | 8.18 | 10.63 | `/zh-hk/product/certificates/` |
| **-3** | 4 | 1 | 44 | 32 | 5.20 | 6.75 | `/zh-hk/product/magnetic-closure-gift-box/` |
| **-3** | 3 | 0 | 50 | 47 | 9.38 | 10.68 | `/zh-hk/blog/paper-materials/` |
| **-2** | 12 | 10 | 460 | 382 | 18.02 | 16.37 | `/zh-hk/services/rush-printing-delivery/` |
| **-2** | 6 | 4 | 165 | 169 | 10.57 | 11.57 | `/en/` |
| **-2** | 5 | 3 | 432 | 397 | 19.20 | 21.13 | `/zh-hk/category/calendars/` |
| **-2** | 5 | 3 | 210 | 203 | 5.22 | 6.37 | `/zh-hk/product/large-envelopes/` |
| **-2** | 4 | 2 | 565 | 520 | 33.22 | 32.96 | `/zh-hk/category/packaging/` |
| **-2** | 4 | 2 | 51 | 53 | 11.22 | 9.13 | `/zh-hk/product/pvc-menus/` |
| **-2** | 2 | 0 | 109 | 93 | 41.15 | 40.39 | `/en/product/same-day-flyers/` |

### 4.4 ★ 完全消失的頁面（old 有、new 無）—— 全量 9 頁

| old 展示 | old 點擊 | old 位置 | 語系 | 型 | 頁面 |
|---|---|---|---|---|---|
| 2 | 0 | 8.50 | en | /blog/ | `/en/blog/religious-ceremony-printing-guide/` |
| 2 | 0 | 8.50 | en | /blog/ | `/en/blog/wedding-red-packet-printing-guide/` |
| 2 | 0 | 42.50 | ja | /blog/ | `/ja/blog/packaging-trends/` |
| 1 | 0 | 3.00 | ja | /blog/ | `/ja/blog/mtr-advertising-specs/` |
| 1 | 0 | 7.00 | ja | /product/ | `/ja/product/drawer-slide-gift-box/` |
| 1 | 0 | 8.00 | en | other | `/en/company-news/` |
| 1 | 0 | 10.00 | en | /blog/ | `/en/blog/book-buying-guide/` |
| 1 | 0 | 14.00 | en | /blog/ | `/en/blog/packaging-trends/` |
| 1 | 0 | 27.00 | zh-hk | /blog/ | `/zh-hk/blog/ip-character-sticker-printing-guide/` |
| **合計** | **12** | **0** | — | — | **9 頁** |

**「消失」的真實規模：9 頁、合計 12 次展示、0 次點擊 —— 這是長尾雜訊，不是 404 事故。**

- 每一頁在 old 窗都只有 **1-2 次展示**（GSC 頁面表只收錄有曝光的 URL；1-2 次曝光的頁面在新視窗掉到 0 曝光，就會整列消失）。
- 我對這 9 條 slug 做了本地代碼核對（唯讀）：`blog-posts.ts` / `blog-data/{zh-hk,en,ja}.json` / `blog/[slug]/page.tsx` 的 `articleSlugs` 中
  **`packaging-trends`（zh-hk/en/ja）、`wedding-red-packet-printing-guide`、`religious-ceremony-printing-guide`、`ip-character-sticker-printing-guide`、
  `book-buying-guide`、`mtr-advertising-specs`、`company-news` 全部仍然存在**；
  `ja/product/drawer-slide-gift-box` 則在 `src/middleware.ts` L57 有既有映射 → `/product/rigid-boxes/`（**屬刻意 301 收攏**）。
- 結論：**沒有任何一頁的消失可歸因於 404 或斷掉的重定向**。此結論僅涵蓋本檔可查的 9 頁；GSC 無法驗證線上 HTTP 狀態，若要 100% 確認需對這 9 條 URL 跑線上探針。

### 4.5 新視窗新出現的頁面（new 有、old 無）—— 36 頁，合計 160 展示 / 2 點擊

| 展示 | 點擊 | 位置 | 語系 | 型 | 頁面 |
|---|---|---|---|---|---|
| 34 | 1 | 6.74 | zh-hk | /blog/ | `/zh-hk/blog/hong-kong-printing-cost-baseline-2026/` |
| 21 | 0 | 6.62 | zh-hk | /blog/ | `/zh-hk/blog/campus-education-printing-pillar-guide/` |
| 11 | 1 | 4.64 | zh-hk | /blog/ | `/zh-hk/blog/print-specifications-reference-guide-2026/` |
| 11 | 0 | 7.82 | zh-hk | /blog/ | `/zh-hk/blog/sticker-material-pvc-vinyl-removable/` |
| 10 | 0 | 6.10 | zh-hk | /blog/ | `/zh-hk/blog/kraft-paper-box-types-comparison-2026/` |
| 9 | 0 | 29.33 | en | /blog/ | `/en/blog/sticker-material-pvc-vinyl-removable/` |
| 6 | 0 | 22.33 | en | /blog/ | `/en/blog/hong-kong-printing-cost-baseline-2026/` |
| 5 | 0 | 4.80 | en | /blog/ | `/en/blog/print-specifications-reference-guide-2026/` |
| 5 | 0 | 6.60 | zh-hk | /blog/ | `/zh-hk/blog/marathon-event-poster-printing-guide/` |
| 5 | 0 | 27.60 | ja | /blog/ | `/ja/blog/sticker-material-pvc-vinyl-removable/` |
| 5 | 0 | 29.60 | zh-hk | /product/ | `/zh-hk/product/wedding-seating-charts/` |
| 3 | 0 | 8.00 | en | /blog/ | `/en/blog/foil-stamping-3-applications-2026/` |
| 3 | 0 | 30.67 | en | /services/ | `/en/services/catalog-printing-china/` |
| 3 | 0 | 66.33 | ja | /blog/ | `/ja/blog/banner-buying-guide/` |
| 2 | 0 | 5.00 | zh-hk | /product/ | `/zh-hk/product/wedding-thank-you-cards/` |
| 2 | 0 | 5.50 | ja | /blog/ | `/ja/blog/tea-beverage-gift-box-printing-guide/` |
| 2 | 0 | 6.00 | ja | /blog/ | `/ja/blog/foil-stamping-3-applications-2026/` |
| 2 | 0 | 6.00 | zh-hk | /blog/ | `/zh-hk/blog/tea-beverage-gift-box-printing-guide/` |
| 2 | 0 | 7.50 | ja | /blog/ | `/ja/blog/doujin-circle-printing-guide/` |
| 2 | 0 | 9.50 | ja | /blog/ | `/ja/blog/same-day-flyers-printing-hong-kong-guide/` |

（僅列前 20；其餘 16 頁展示均 ≤ 1。）新出現頁面合計只有 160 展示，且最高的一頁只有 34 展示 —— **新視窗沒有「新頁起量」的跡象**。

### 4.6 ★ 非重疊 7 天對照（old 7d = 09-01~09-07 vs new 7d = 09-09~09-15）

這是唯一不含視窗位移成分的鏡頭（僅缺 09-08 一天）。

| 口徑 | old 7d | new 7d | 差 |
|---|---|---|---|
| 展示 | 6,585 | 5,901 | -684（-10.4%） |
| 點擊 | 100 | 102 | +2 |
| CTR | 1.52% | 1.73% | +0.21 pp |

**7 天展示跌幅 Top 15（限 old 7d 展示 ≥ 20 的 83 頁）**

| 7d 展示減 | old7 展示 | new7 展示 | old7 點擊 | new7 點擊 | 頁面 |
|---|---|---|---|---|---|
| **-136** | 192 | 56 | 0 | 0 | `/zh-hk/blog/a5-vs-a6-flyer-size/` |
| **-129** | 161 | 32 | 3 | 0 | `/zh-hk/category/stickers/` |
| **-106** | 122 | 16 | 4 | 0 | `/zh-hk/services/rush-printing-delivery/` |
| **-87** | 116 | 29 | 0 | 0 | `/en/product/exercise-books/` |
| **-76** | 135 | 59 | 0 | 1 | `/zh-hk/category/posters/` |
| **-74** | 158 | 84 | 1 | 0 | `/zh-hk/category/packaging/` |
| **-49** | 69 | 20 | 0 | 0 | `/en/blog/eco-paper-bag-gsm/` |
| **-45** | 109 | 64 | 0 | 0 | `/en/product/small-batch-stickers/` |
| **-32** | 61 | 29 | 1 | 1 | `/zh-hk/blog/rush-printing-hk-guide/` |
| **-31** | 71 | 40 | 0 | 1 | `/zh-hk/product/exercise-books/` |
| **-31** | 76 | 45 | 1 | 3 | `/en/product/doujinshi-printing/` |
| **-29** | 77 | 48 | 0 | 0 | `/en/blog/catalog-printing-china-supplier-guide/` |
| **-26** | 97 | 71 | 0 | 0 | `/zh-hk/product/business-envelopes/` |
| **-26** | 99 | 73 | 1 | 0 | `/zh-hk/blog/poster-size-guide/` |
| **-23** | 70 | 47 | 1 | 0 | `/zh-hk/product/a5-flyers/` |

**7 天展示升幅 Top 10**

| 7d 展示增 | old7 展示 | new7 展示 | old7 點擊 | new7 點擊 | 頁面 |
|---|---|---|---|---|---|
| **+97** | 61 | 158 | 0 | 1 | `/zh-hk/category/books/` |
| **+58** | 41 | 99 | 0 | 0 | `/zh-hk/product/handle-bags/` |
| **+48** | 27 | 75 | 0 | 1 | `/zh-hk/blog/poster-printing-price-guide/` |
| **+32** | 171 | 203 | 7 | 14 | `/zh-hk/` |
| **+30** | 261 | 291 | 4 | 8 | `/zh-hk/product/a2-posters/` |
| **+20** | 64 | 84 | 0 | 0 | `/en/product/catalog-printing/` |
| **+17** | 30 | 47 | 3 | 6 | `/zh-hk/blog/doujin-circle-printing-guide/` |
| **+16** | 88 | 104 | 0 | 1 | `/zh-hk/product/custom-calendars/` |
| **+15** | 43 | 58 | 0 | 0 | `/zh-hk/category/red-packets/` |
| **+14** | 23 | 37 | 1 | 0 | `/zh-hk/product/kraft-paper-bags/` |

7 天口徑的兩個關鍵事實：

1. **全站 7 天展示 -10.4%、點擊 +2、CTR 由 1.52% 升到 1.73%**。
2. **跌幅集中在少數頁面，升幅也集中在少數頁面**：跌幅最大的 `zh-hk/blog/a5-vs-a6-flyer-size/`（192→56）與升幅最大的 `zh-hk/category/books/`（61→158）在同期都與「全站 -10%」無關。
   故 7 天變動**不是全域齊漲齊跌**，而是逐頁重排。

語系 7d 對照：

| 語系 | old7 展示/點擊 | old7 CTR | new7 展示/點擊 | new7 CTR | 展示差 |
|---|---|---|---|---|---|
| zh-hk | 4,322 / 76 | 1.76% | 3,946 / 81 | 2.05% | -376（-8.7%） |
| en | 1,707 / 12 | 0.70% | 1,398 / 13 | 0.93% | -309（-18.1%） |
| ja | 550 / 11 | 2.00% | 554 / 8 | 1.44% | +4（0.7%） |

---

## 5. 與站內近期改動對照（三份指定文件 + 視窗內 commit 面）

### 5.1 三份指定文件（皆為 09-17 / 09-18 落地）

| 文件 / 改動 | 落地時間 | 是否落在 GSC 視窗內 | 頁面層可見性 |
|---|---|---|---|
| §九 `ce` 截斷事故**修復**（commit `622001cf`，2,799 處） | 2026-09-17 | **否（兩視窗皆止於 09-15）** | **完全不可見** |
| §九 `ce` 截斷事故**引入**（commit `2f8d9438`，packaging-blog-reorg-v3） | 2026-09-02 | **是** | 見 §5.2 |
| `.hermes/logs/2026-09-18-zine-post-delivery.md`（zine 三語上線 `9144ecdb`） | 2026-09-18 07:57 | **否** | **頁面表中 `zine` 零命中** |
| v10 執行卡 P0-1 `/unsubscribe` 三語頁（`9f50eee1`） | 2026-09-17 | **否** | **`unsubscribe` 零命中** |
| v10 執行卡 P0-3 UTM 歸因（`ab5a92a5`/`60f6242f`） | 2026-09-17 | **否** | 不影響曝光/點擊 |
| v10 執行卡 P0-4a Candle & Soap 指南（`2ce4db49`） | 2026-09-17 19:12 | **否** | **`candle`/`soap` 零命中** |

**明確結論（時序）**：

- **`ce` 截斷修復（09-17）不可能出現在這份數據裡** —— new 視窗止於 2026-09-15、old 視窗止於 2026-09-07。修復效果要等**下一份匯出（視窗起點 > 09-17）**才驗得到。
- 同理 **09-17 / 09-18 的全部工作（zine 上線、`/unsubscribe`、candle-soap 指南、機構招標承接頁、GSC 洩漏二輪清理、月曆價格口徑）在頁面表中一律 0 命中**：
  我用 `zine` / `candle` / `soap` / `school-exercise` / `unsubscribe` / `institutional` / `trade-program` / `self-publish` / `etsy` / `photo-book` / `travel-journal` 對 new/old 的 28d 與 7d 頁面表全文檢索，**全部 ZERO HITS**（唯一命中的是既有 SKU `spiral-notebooks`，與新內容無關）。
  這與「這些頁面在 09-15 之後才上線」**完全一致**，也意味著**目前沒有任何頁面層證據可以評價 09-17/18 那一批的效果**。
- v10 執行卡特別註明 zine 篇「GSC 側無展示數據 → 不引用任何 GSC 數字」；本次頁面層檢索**獨立複核了這一判定（確實零展示）**。

### 5.2 `ce` 截斷事故與頁面層數據是否一致

事故存活 09-02 → 09-17，這意味著：

| 視窗 | 受損天數 | 佔比 |
|---|---|---|
| new 28d（08-19~09-15） | 09-02 ~ 09-15 = 14 天 | 50.0% |
| old 28d（08-11~09-07） | 09-02 ~ 09-07 = 6 天 | 21.4% |
| new 7d（09-09~09-15） | 7 天 | **100%** |
| old 7d（09-01~09-07） | 09-02 ~ 09-07 = 6 天 | 85.7% |

也就是說：**new 7d 那一週整週都在受損狀態下**。用這一週檢驗：

| 檢驗項 | 若「全站文字/版面損壞 → 全站 CTR 崩」應看到 | 實測 | 一致？ |
|---|---|---|---|
| 全站 7d CTR | 明顯下滑 | **1.52% → 1.73%（+0.21 pp，上升）** | ✗ 不一致 |
| 全站 28d CTR | 下滑 | old 1.51% → new 1.50%（-0.01 pp，基本持平） | ∼ 無明顯崩壞 |
| 全站 7d 點擊 | 下滑 | 100 → 102（+2，微升） | ✗ 不一致 |
| 全站 7d 展示 | 下滑 | 6,585 → 5,901（-10.4%） | ✓ 一致但方向不足以定罪 |

**判定（推論，非證實）**：頁面層數據**不支持**「`ce` 截斷造成全站 CTR 崩壞」這個假設 —— 受損最完整的那一週，全站 CTR 反而上升、點擊微升。
展示端 -10.4% 是唯一同向訊號，但同一份數據裡有頁面同期大漲（`zh-hk/category/books/` +97、`zh-hk/` +32、`zh-hk/product/handle-bags/` +58），**這不像全站損壞的特徵，而像逐頁重排**。
**本檔無法排除個別頁面受損**（例如 762 處 Tailwind 類失效造成的版面損壞是逐頁的），也**無法證實**任何個別頁面的跌幅由該事故造成 —— GSC 頁面表沒有「版面/文字品質」維度。

### 5.3 這些改動解釋不了的頁面（必須單獨點名）

三份指定文件（09-17/18）在時序上無法解釋任何本視窗的變化。再看 **視窗內（08-19~09-15）的實際改動面**（`git log` 唯讀核對），與跌幅最大的頁面對照：

| 頁面 | 7d 展示 | 7d 點擊 | 視窗內是否有針對該頁的改動 | 判定 |
|---|---|---|---|---|
| `zh-hk/services/rush-printing-delivery/` | 122 → 16（**-106**） | 4 → 0 | **有**：`8738a047`（09-11）明列「rush 頁 AEO 答案塊」 | **相鄰性存在、因果不可證**（見下方） |
| `zh-hk/category/stickers/` | 161 → 32（**-129**） | 3 → 0 | **有**：`f24daac6`（09-10）zh-hk 全 16 品類 PLP 模板對齊（stickers 為定型頁） | 相鄰、因果不可證 |
| `en/product/exercise-books/` | 116 → 29（**-87**） | 0 → 0 | **無針對該頁者**：視窗內處理教材題材的是 `1cc999e8`/`23046e3f`/`dc1947c0`（09-15，blog 教材・教科書篇）與 `4137ff3a`（09-15 sitemap 收錄），09-10 的 PDP v9 門控 `3c726ed8` 訊息明列「zh-hk 全 115 SKU」、09-11 的 `bfb005dc` 為 ja PDP，**commit 訊息中未見 en PDP 批次** | **解釋不了** |
| `zh-hk/category/posters/` | 135 → 59（-76） | 0 → 1 | 有：`13a2725e`（09-14）poster 死鏈修復 + `f24daac6`（09-10）zh-hk PLP 模板 | 相鄰、因果不可證 |
| `zh-hk/category/packaging/` | 158 → 84（-74） | 1 → 0 | 有：`f24daac6`（09-10）zh-hk PLP 模板 | 相鄰、因果不可證 |
| `en/blog/eco-paper-bag-gsm/` | 69 → 20（-49） | 0 → 0 | **無文件列其為目標**；視窗內唯一涵蓋 packaging blog 的批次是 `2f8d9438`（09-02 packaging-blog-reorg-v3，即 `ce` 事故引入批），該批是否動到此頁我**未逐一核對**，故不能斷言「無改動」 | **解釋不了** |
| `en/product/small-batch-stickers/` | 109 → 64（-45） | 0 → 0 | **無**（09-13 `a6922c56` 是 products.ts 71 條標題對齊的批次，涵蓋面廣但未逐一核對） | **解釋不了** |
| `en/blog/poster-size-guide/` | 28d 317 → 43（**-274**，位置 69.03→59.28） | 3 → 2 | **無**：視窗內 `57ed215f`（09-06）針對的是 posters **類目頁** en/ja 轉化區塊，不是這篇 blog；`13a2725e`（09-14）為 zh-hk poster 死鏈 | **解釋不了，且是全站 28d 最大單頁展示跌幅** |
| `en/product/saddle-stitch-booklets/` | 27 → 27（持平） | 0 → 0 | **無**（`7e599ecc` 是 09-18，窗口外） | 28d -133 展示 + 位置 67.00 → **解釋不了** |
| `en/product/catalog-printing/` | 64 → 84（**+20**） | 0 → 0 | 無 | 位置由 38.89 轉好到 29.71，與 en/blog 同題材頁並存 |

**`rush-printing-delivery`（zh-hk）單獨說明 —— 這是唯一「文件明列改動 + 同頁 7 天暴跌」的交集**：

- 事實：該頁 28d 由 460/12（位置 18.02）→ 382/10（位置 16.37）；**7d 由 122/4 → 16/0**（展示 -87%、點擊 4→0）。位置反而略變好。
- 事實：`8738a047`（2026-09-11，v9.2.3 D+E+G4 合批）內容明列「G4（contactPoint 補 email/WhatsApp + **rush 頁 AEO 答案塊**）」。
- **這兩件事時間相鄰（09-11 改動 → new 7d 涵蓋 09-09~09-15）。但本檔只能證明相鄰，不能證明因果** —— 同期還有 09-10 全站 16 品類 PLP 模板替換、09-10 title 全量落窗（SKU 120 + 博客 192）、09-13 products.ts 71 條標題對齊，
  且 GSC 的 7 天窗無法切出「09-12 之後」的子窗。**建議把它列為第一個用線上探針 + Search Console 即時查詢去查的頁面**（本報告不做任何因果宣稱）。

**一句話**：三份指定文件能解釋的 = 零（時序全部在視窗外）；視窗內改動（09-02 packaging 重組、09-09~09-13 全站 title 落窗、09-10 PLP/PDP v9 模板替換、09-13 單品牌化清毒）能提供的只是**相鄰性**，不是歸因。
`en/product/exercise-books/`、`en/blog/eco-paper-bag-gsm/`、`en/product/small-batch-stickers/`、`en/blog/poster-size-guide/`、`en/product/saddle-stitch-booklets/` **這 5 頁在指定文件與視窗內 commit 訊息中都找不到針對性改動（其中 2 頁所屬批次涵蓋面廣、未逐一核對）**，屬「解釋不了」，優先查線上有沒有壞。

---

## 6. 退化頁面分診

### 6.1 排序規則（先講清楚，避免數字被誤讀）

跨類別排序需要一個共同尺。本報告採用的規則是：

- **零點擊池（`點擊 ≤ 1`）**：以 `new 展示` 為「曝險量」。
- **點擊流失頁（`點擊 > 1` 但較 old 窗下滑）**：以 `100 × 流失點擊` 為曝險量。
  係數 100 是**排序慣例**（非量測值）。設定 100 的用意：讓「掉 1 次點擊」的分數至少等同「100 次零點擊展示」——
  該等值線定在本檔實測的全站平均 **66.7 展示/點擊**（24,089 展示 ÷ 361 點擊）之上，即這份排序比純展示口徑更看重點擊。
- 所有進入排名的數字本身**全部來自 JSON**，只有「用哪個量排序」是我定的慣例。

### 6.2 最值得修的 15 頁（依 §6.1 規則排序）

| # | 頁面 | 展示 | 點擊 | CTR | 位置 | 類別 | 一句話理由 |
|---|---|---|---|---|---|---|---|
| 1 | `/zh-hk/blog/a5-vs-a6-flyer-size/` | 510 | 0 | 0.00% | 7.85 | 零點擊池 | **摘要問題**：位置 7.85、510 展示、0 點擊，且 old 窗同樣 536 展示 / 1 點擊 —— 標題/摘要長期不合格，非短期波動 |
| 2 | `/zh-hk/product/certificates/` | 112 | 4 | 3.57% | 10.63 | 點擊流失 | **點擊流失**：8→4 次點擊（-4），位置由 8.18 退到 10.63；AGENTS.md §11.5 將證書印刷列為全站最高 CTR 資產之一，退步需立刻查 |
| 3 | `/en/product/small-batch-stickers/` | 396 | 0 | 0.00% | 17.81 | 零點擊池 | **排名問題（en 旗艦詞）**：396 展示、位置 17.81、0 點擊；`small batch` 是 en 差異化定位詞，此頁在第 2 頁 = 曝光換不到流量 |
| 4 | `/en/product/a2-posters/` | 385 | 1 | 0.26% | 45.45 | 零點擊池 | **排名問題**：385 展示、位置 45.45（第 5 頁）、1 點擊；與 zh-hk 同 SKU（980 展示 / 17 點擊 / 位置 16.13）落差 5 倍 |
| 5 | `/zh-hk/blog/poster-size-guide/` | 373 | 1 | 0.27% | 15.54 | 零點擊池 | **排名＋衰退**：373 展示、位置 15.54；7 天展示 99→73 且點擊 1→0 |
| 6 | `/en/product/catalog-printing/` | 307 | 0 | 0.00% | 29.71 | 零點擊池 | **排名問題＋同題材三頁互擠**：307 展示、位置 29.71、0 點擊；同時存在 `en/blog/catalog-printing-china-supplier-guide/`（216 展示 / 位置 16.90 / 0 點擊）與 `en/services/catalog-printing-china/` |
| 7 | `/zh-hk/product/magnetic-closure-gift-box/` | 32 | 1 | 3.12% | 6.75 | 點擊流失 | **點擊流失**：4→1 次點擊（-3），位置 5.20→6.75 |
| 8 | `/zh-hk/blog/paper-materials/` | 47 | 0 | 0.00% | 10.68 | 點擊流失 | **點擊流失**：3→0 次點擊（-3），位置 9.38→10.68（原本在第 1 頁） |
| 9 | `/zh-hk/product/business-envelopes/` | 299 | 1 | 0.33% | 11.40 | 零點擊池 | **摘要問題**：299 展示、位置 11.40、1 點擊（CTR 0.33%）；同簇 `large-envelopes`/`pearl-envelopes`/`colored-envelopes` CTR 都明顯較高 |
| 10 | `/en/product/exercise-books/` | 289 | 0 | 0.00% | 23.26 | 零點擊池 | **排名問題＋無法解釋的 7 天暴跌**：289 展示、位置 23.26、0 點擊；7d 116→29（-75%），視窗內無針對該頁的改動 |
| 11 | `/zh-hk/blog/food-packaging-printing-guide/` | 259 | 1 | 0.39% | 12.63 | 零點擊池 | **排名問題（差一點）**：259 展示、位置 12.63、1 點擊；7d 點擊由 1 → 0 |
| 12 | `/zh-hk/product/electronics-packaging-box/` | 253 | 1 | 0.40% | 49.51 | 零點擊池 | **排名問題（最差之一）**：253 展示、位置 49.51、1 點擊；同類 `en` 版亦僅 41 展示 / 位置 21.39 |
| 13 | `/en/product/saddle-stitch-booklets/` | 225 | 0 | 0.00% | 67.00 | 零點擊池 | **排名問題＋28d 大失血**：位置 67.00、0 點擊；展示 358→225（-133），7d 27→27 持平（無回升） |
| 14 | `/en/blog/flyer-sizes-compared/` | 224 | 0 | 0.00% | 14.44 | 零點擊池 | **同題材互擠＋摘要問題**：224 展示、位置 14.44、0 點擊；同題材另有 `en/blog/a5-vs-a6-flyer-size/`（64 展示 / 位置 7.48 / 0 點擊）與 `zh-hk/blog/a5-vs-a6-flyer-size/`（510 展示 / 位置 7.85 / 0 點擊） |
| 15 | `/en/blog/catalog-printing-china-supplier-guide/` | 216 | 0 | 0.00% | 16.90 | 零點擊池 | **同題材互擠＋排名問題**：216 展示、位置 16.90、0 點擊；與 `en/product/catalog-printing/`、`en/services/catalog-printing-china/` 三頁同題材 |

（第 15 名之後的同一池子：`zh-hk/product/handle-bags/` 199 展示 / 位置 15.91、`zh-hk/blog/saddle-stitch-booklet-printing-guide/` 199 展示 / 位置 13.29、`ja/product/waterproof-stickers/` 138 展示 / 位置 15.18、`en/product/foil-stickers/` 136 展示 / 位置 39.51。）

### 6.3 摘要問題短名單（位置 ≤ 12 且點擊 ≤ 1，展示 ≥ 50）—— **修這個最快見效**

這 16 頁合計 1,866 次展示（7.7% 的全站展示）只換到 7 次點擊。它們已經在 Google 第一頁，成本最低。

| # | 頁面 | 語系 | 型 | 展示 | 點擊 | 位置 | old 窗 展示/點擊 |
|---|---|---|---|---|---|---|---|
| 1 | `/zh-hk/blog/a5-vs-a6-flyer-size/` | zh-hk | /blog/ | 510 | 0 | 7.85 | 536 / 1 |
| 2 | `/zh-hk/product/business-envelopes/` | zh-hk | /product/ | 299 | 1 | 11.40 | 233 / 2 |
| 3 | `/zh-hk/product/kraft-paper-bags/` | zh-hk | /product/ | 130 | 1 | 11.17 | 109 / 1 |
| 4 | `/zh-hk/blog/design-file-specs/` | zh-hk | /blog/ | 105 | 0 | 9.71 | 103 / 0 |
| 5 | `/zh-hk/blog/graduation-yearbook-printing-guide/` | zh-hk | /blog/ | 95 | 0 | 7.05 | 87 / 1 |
| 6 | `/zh-hk/blog/2027-monthly-calendar-printing-timetable/` | zh-hk | /blog/ | 89 | 1 | 7.38 | 48 / 1 |
| 7 | `/en/blog/saddle-stitch-booklet-printing-guide/` | en | /blog/ | 89 | 0 | 8.33 | 83 / 0 |
| 8 | `/en/blog/poster-printing-price-guide/` | en | /blog/ | 81 | 0 | 6.83 | 69 / 0 |
| 9 | `/zh-hk/product/colored-envelopes/` | zh-hk | /product/ | 77 | 1 | 5.30 | 78 / 2 |
| 10 | `/en/blog/a5-vs-a6-flyer-size/` | en | /blog/ | 64 | 0 | 7.48 | 58 / 0 |
| 11 | `/zh-hk/service-areas/` | zh-hk | other | 63 | 0 | 7.52 | 57 / 0 |
| 12 | `/zh-hk/product/laminated-menus/` | zh-hk | /product/ | 55 | 0 | 7.38 | 27 / 0 |
| 13 | `/en/category/flyers/` | en | /category/ | 54 | 1 | 9.56 | 42 / 1 |
| 14 | `/zh-hk/category/envelopes/` | zh-hk | /category/ | 53 | 1 | 11.11 | 49 / 1 |
| 15 | `/en/blog/marathon-event-poster-printing-guide/` | en | /blog/ | 52 | 0 | 6.04 | 31 / 0 |
| 16 | `/zh-hk/blog/sticker-materials/` | zh-hk | /blog/ | 50 | 1 | 5.56 | 43 / 2 |

**這一組的共同特徵值得注意**：其中 **9 頁是 blog 內容頁、4 頁是 product 頁**，且 **zh-hk 佔 11 頁、en 5 頁**。
`zh-hk/blog/a5-vs-a6-flyer-size/`（510 展示 / 位置 7.85 / **0 點擊**，old 窗 536 展示 / 1 點擊）是單一最大標的：**它不是新問題，是長期狀態**。

### 6.4 同題材多頁互擠（蠶食）候選 —— **僅為 slug 線索推論**

前置聲明：匯出**沒有 page × query 二維表**，所以**無法證明**任何兩頁真的在同一組查詢上互搶。以下只是「同一題材存在 ≥ 2 個頁面、且兩頁都在曝光」的清單，
屬**待驗假設**，需要 Search Console 的「查詢 + 網頁」聯表才能定案。

**傳單尺寸（flyer size）**

| 頁面 | 展示 | 點擊 | CTR | 位置 |
|---|---|---|---|---|
| `/zh-hk/blog/a5-vs-a6-flyer-size/` | 510 | 0 | 0.00% | 7.85 |
| `/en/blog/a5-vs-a6-flyer-size/` | 64 | 0 | 0.00% | 7.48 |
| `/en/blog/flyer-sizes-compared/` | 224 | 0 | 0.00% | 14.44 |

**海報（poster）— zh-hk 4 篇 blog 並存**

| 頁面 | 展示 | 點擊 | CTR | 位置 |
|---|---|---|---|---|
| `/zh-hk/blog/poster-size-guide/` | 373 | 1 | 0.27% | 15.54 |
| `/zh-hk/blog/poster-printing-guide/` | 325 | 2 | 0.62% | 13.10 |
| `/zh-hk/blog/poster-printing-price-guide/` | 185 | 2 | 1.08% | 14.90 |
| `/zh-hk/blog/poster-buying-guide/` | 92 | 0 | 0.00% | 57.98 |

**貼紙（sticker）— zh-hk 4 篇 blog + 分類頁**

| 頁面 | 展示 | 點擊 | CTR | 位置 |
|---|---|---|---|---|
| `/zh-hk/blog/sticker-guide/` | 87 | 1 | 1.15% | 66.13 |
| `/zh-hk/blog/sticker-buying-guide/` | 123 | 0 | 0.00% | 16.82 |
| `/zh-hk/blog/sticker-design/` | 72 | 0 | 0.00% | 13.96 |
| `/zh-hk/blog/sticker-materials/` | 50 | 1 | 2.00% | 5.56 |

**畫冊（catalog）— en 三種型共存**

| 頁面 | 展示 | 點擊 | CTR | 位置 |
|---|---|---|---|---|
| `/en/product/catalog-printing/` | 307 | 0 | 0.00% | 29.71 |
| `/en/blog/catalog-printing-china-supplier-guide/` | 216 | 0 | 0.00% | 16.90 |
| `/en/services/catalog-printing-china/` | 3 | 0 | 0.00% | 30.67 |

**紙袋 — zh-hk 2 篇 + en 2 篇**

| 頁面 | 展示 | 點擊 | CTR | 位置 |
|---|---|---|---|---|
| `/zh-hk/blog/paper-bag-printing-guide/` | 42 | 0 | 0.00% | 14.79 |
| `/zh-hk/blog/paper-bag-buying-guide/` | 34 | 0 | 0.00% | 11.09 |
| `/en/blog/paper-bag-printing-guide/` | 78 | 0 | 0.00% | 13.44 |
| `/en/blog/eco-paper-bag-gsm/` | 128 | 0 | 0.00% | 13.05 |

**餐牌（menu）— zh-hk 淋膜 vs PVC + blog**

| 頁面 | 展示 | 點擊 | CTR | 位置 |
|---|---|---|---|---|
| `/zh-hk/product/laminated-menus/` | 55 | 0 | 0.00% | 7.38 |
| `/zh-hk/product/pvc-menus/` | 53 | 2 | 3.77% | 9.13 |
| `/zh-hk/blog/restaurant-menu-printing-guide/` | 94 | 2 | 2.13% | 9.63 |

**騎馬釘小冊子 — blog 與 PDP 同題材（三語）**

| 頁面 | 展示 | 點擊 | CTR | 位置 |
|---|---|---|---|---|
| `/zh-hk/blog/saddle-stitch-booklet-printing-guide/` | 199 | 0 | 0.00% | 13.29 |
| `/zh-hk/product/saddle-stitch-booklets/` | 256 | 2 | 0.78% | 34.80 |
| `/en/blog/saddle-stitch-booklet-printing-guide/` | 89 | 0 | 0.00% | 8.33 |
| `/en/product/saddle-stitch-booklets/` | 225 | 0 | 0.00% | 67.00 |

**月曆 — blog / 分類 / PDP 三型**

| 頁面 | 展示 | 點擊 | CTR | 位置 |
|---|---|---|---|---|
| `/zh-hk/category/calendars/` | 397 | 3 | 0.76% | 21.13 |
| `/zh-hk/product/custom-calendars/` | 215 | 1 | 0.47% | 22.25 |
| `/zh-hk/blog/2027-monthly-calendar-printing-timetable/` | 89 | 1 | 1.12% | 7.38 |
| `/en/blog/calendar-printing-guide/` | 203 | 0 | 0.00% | 32.57 |

互擠的判讀（推論）：「搶同一題材」最明顯的訊號是**同題材內出現「一頁排前面卻 0 點擊、另一頁排很後面卻還在吃展示」**：

- 海報（zh-hk）：`poster-size-guide`（373 展示 / 位置 15.54 / 1 點擊）與 `poster-buying-guide`（92 展示 / **位置 57.98** / 0 點擊）—— 後者吃了 92 次展示卻在第 6 頁，
  同題材已有 3 篇更前面的文章，**`poster-buying-guide` 是最像重複贅頁的一頁**。
- 貼紙（zh-hk）：`sticker-guide` 位置 **66.13**、`sticker-buying-guide` 位置 16.82、`sticker-design` 位置 13.96、`sticker-materials` 位置 **5.56** —— 四頁在同一題材上位置差距極大，
  且 **4 頁 28 天合計只有 2 次點擊**（87/123/72/50 展示）。
- 畫冊（en）：`product/catalog-printing`（307 展示 / 位置 29.71）+ `blog/catalog-printing-china-supplier-guide`（216 展示 / 位置 16.90）+ `services/catalog-printing-china`（3 展示 / 位置 30.67），
  **三頁合計 526 展示、0 點擊**。
- 傳單尺寸：`zh-hk/blog/a5-vs-a6-flyer-size`（510 展示 / 位置 7.85）與 `en/blog/flyer-sizes-compared`（224 展示 / 位置 14.44）**兩頁合計 734 展示、0 點擊**；
  同一 slug 的 en 版（64 展示 / 位置 7.48 / 0 點擊）也沒有貢獻。**這三頁是「同題材三胞胎」的典型**。

### 6.5 動能觀察名單（7 天口徑，供下一份匯出複核）

| 頁面 | 28d 展示 | 28d 點擊 | 位置 | old7 展示/點擊 | new7 展示/點擊 | 7d 展示方向 |
|---|---|---|---|---|---|---|
| `/zh-hk/services/rush-printing-delivery/` | 382 | 10 | 16.37 | 122 / 4 | 16 / 0 | ↓ |
| `/zh-hk/category/stickers/` | 455 | 6 | 34.27 | 161 / 3 | 32 / 0 | ↓ |
| `/en/product/exercise-books/` | 289 | 0 | 23.26 | 116 / 0 | 29 / 0 | ↓ |
| `/zh-hk/category/posters/` | 416 | 4 | 36.13 | 135 / 0 | 59 / 1 | ↓ |
| `/zh-hk/category/packaging/` | 520 | 2 | 32.96 | 158 / 1 | 84 / 0 | ↓ |
| `/en/blog/eco-paper-bag-gsm/` | 128 | 0 | 13.05 | 69 / 0 | 20 / 0 | ↓ |
| `/en/product/small-batch-stickers/` | 396 | 0 | 17.81 | 109 / 0 | 64 / 0 | ↓ |
| `/en/product/saddle-stitch-booklets/` | 225 | 0 | 67.00 | 27 / 0 | 27 / 0 | ↑ |
| `/zh-hk/blog/a5-vs-a6-flyer-size/` | 510 | 0 | 7.85 | 192 / 0 | 56 / 0 | ↓ |
| `/zh-hk/product/a4-flyers/` | 32 | 4 | 10.06 | 8 / 1 | 11 / 0 | ↑ |
| `/zh-hk/category/books/` | 301 | 3 | 33.70 | 61 / 0 | 158 / 1 | ↑ |
| `/zh-hk/product/custom-calendars/` | 215 | 1 | 22.25 | 88 / 0 | 104 / 1 | ↑ |

末欄**只表示 7 天展示方向**；點擊方向請直接讀最後兩欄（例：`zh-hk/product/a4-flyers/` 7d 展示微升 8→11，但點擊 1→0；`zh-hk/product/custom-calendars/` 展示 88→104 且點擊 0→1，是真改善）。
### 6.6 額外的技術性發現（頁面層可見）

| 發現 | 數據 | 說明 |
|---|---|---|
| **`www.` 主機仍在 GSC 頁面表中吃到曝光** | new 窗 6 列、合計 54 展示 / 2 點擊（old 窗 5 列 / 60 展示） | `src/middleware.ts` L152-153 有 `www → 非 www` 301；但匯出顯示曝光仍記在 `www.zprintpro.com/en/category/{flyers,posters,paper-bags,packaging}/` 上。**可能原因（無法從匯出判斷）**：301 未覆蓋全部情形，或 Google 尚未完成主機整合。
| **無 locale 前綴的舊名片 URL 仍在曝光** | `/product/thick-business-cards-400g/`：new 8 展示 / 0 點擊 / 位置 **6.00**（old 8 展示 / 位置 6.00，兩窗都在） | `src/middleware.ts` L101 只在 QUOTE_PRODUCT_MAP（`/quote?product=`）中把 `thick-business-cards-400g` 映射到 `thick-greeting-cards-400g`；直接訪問該路徑時，middleware 的「缺 locale 補前綴」規則會導向 `/{locale}/product/thick-business-cards-400g/` —— 一個已改名的舊 SKU 路徑。**位置 6.00 卻 0 點擊**，值得單獨確認該路徑是否有 301 到現存 SKU。

---

## 7. 方法、可複核性與未解項

**方法**：所有數字由 `extract.json` 直接計算（Python3，UTF-8 輸出），未做任何插值、抽樣或估算。
路徑型判定 = 去掉 `/{locale}/` 後取第一段（`blog`/`product`/`category`/`guide`/`services`）；語系判定 = URL 前綴 `/zh-hk/`、`/en/`、`/ja/`，其餘歸 `other`。
加權 CTR = `Σ點擊 / Σ展示`；加權位置 = `Σ(位置×展示) / Σ展示`。

**未解項（留給下一份匯出 / 線上探針）**：

1. 為何 `網頁` 表合計比同匯出 `圖表` 多 15.6%（本檔無法判定）。
2. 為何 3 個國家過濾鍵（hk/jp/us）的 `網頁` 表遠小於其 `圖表`（本檔未採用該 3 鍵）。
3. 本報告識別出的下跌頁面中，`en/product/exercise-books/`、`en/blog/eco-paper-bag-gsm/`、`en/product/small-batch-stickers/`、`en/blog/poster-size-guide/`、`en/product/saddle-stitch-booklets/`**沒有任何視窗內的文件化改動可以對應**，需線上探針（HTTP 200 / canonical / 呈現內容）確認。
4. 互擠（蠶食）只能靠 Search Console 的「查詢 × 網頁」聯表證實，本匯出無此維度。
5. new 7d 的 -10.4% 展示跌幅是否含 GSC 期末結算（資料延遲）成分，無法從檔內判定。

**本報告不做的事**：不宣稱任何因果、不以任何方式修改專案檔案（唯一寫入 = 本檔）、不引用 `extract.json` 以外的數字。

---

**數據來源**:
```
數據來源:
- GSC data: F:\zprintpro-nextjs\.hermes\gsc-2026-09-18\extract.json
  · new.combo_28d.網頁 / old.combo_28d.網頁 / new|old.combo_7d.網頁（圖表日期實測 2026-08-19~09-15 與 2026-08-11~09-07）
- 程式事實（唯讀核對，未修改）: src/middleware.ts（L57 drawer-slide-gift-box→rigid-boxes；L101 thick-business-cards-400g；L152-153 www 301）
- 程式事實（唯讀核對）: src/data/blog-posts.ts / src/data/blog-data/{zh-hk,en,ja}.json / src/app/[locale]/blog/[slug]/page.tsx（9 條消失 slug 的存在性）
- Git log（唯讀）: 視窗內改動面 08-19~09-15（2f8d9438 / 8738a047 / f24daac6 / d2984a0e / 3c726ed8 / a6922c56 / 13a2725e / aef739c4 等）
- 指定對照文件: docs/2026-09-17-website-traffic-expansion-plan-v1.md §九 / .hermes/logs/2026-09-18-zine-post-delivery.md / docs/2026-09-17-v10-website-execution-card.md
- 校準日期: 2026-09-18（匯出日）; 本報告不含任何估算值或預測值
```

**文件結束。**
