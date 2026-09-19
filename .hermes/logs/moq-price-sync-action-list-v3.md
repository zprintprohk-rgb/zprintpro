# 價目同步波 — 逐條清單 v3 (套用判定域 SSoT)

**產出**: 2026-09-19 · `scripts/moq10-action-list-v3.ts`

```
數據來源:
- 判定域 SSoT: src/data/print-method-policy.ts (PRODUCT_TARGETS / CROSS_CATEGORY_PAGES / POSTER_SIZE_TARGETS)
- 目標解析優先序: L0 跨品類綜合頁 → L1 產品 slug (權威) → L2 海報尺寸 → L3 關鍵詞 fallback
- 掃描: 111 檔 / 1838 命中
- 校準日期: 2026-09-19
```

## v2 → v3 修正對照 (K3 提質三件)

| 根因 (v2 抽驗發現) | v3 處理 |
|---|---|
| 跨品類綜合頁被當單一品類 | 新增 `CROSS_CATEGORY_PAGES`, 該類命中轉「白名單」不給單一目標 |
| 海報 A1 與 A2/A3 門檻不同 | 新增 `POSTER_SIZE_TARGETS` (A1=1 / A2·A3=10 / 其他海報=100 沿用現況) |
| 標籤錯、目標值偶然對 | 改由**產品 slug** 對 `PRODUCT_TARGETS` (L1), 關鍵詞僅作 fallback (L3) |

## 統計

| 類別 | 數量 |
|---|---|
| ① 改 MOQ (可執行前需逐條確認) | 187 |
| ② price_tier 改格式 | 595 |
| 白名單: 跨品類綜合頁 (另立門檻組) | 73 |
| ④ 人工: 共享模板句 | 244 |
| ④ 人工: 其他 | 346 |
| ③ 保留不動 | 577 |

## ① 置信度分佈

| 置信度 | 數量 | 判據 |
|---|---|---|
| high | 38 | L1 產品 slug / L2 海報尺寸 (權威) |
| mid | 0 | L2 其他海報 (沿用 100) |
| low | 149 | L3 關鍵詞 fallback (距 >25 字) |

## ① 明細

| # | 檔案:行 | 判定域 | 品類 | 當前值 | 目標值 | 置信度 | 依據 |
|---|---|---|---|---|---|---|
| 1 | `src/data/blog-posts.ts:936` | L3-keyword | 書刊/畫冊 | `30 本起印` | `10 本起印` | low | 書刊/畫冊 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 2 | `src/data/blog-posts.ts:937` | L3-keyword | 書刊/畫冊 | `30-copy MOQ` | `10-copy MOQ` | low | 書刊/畫冊 距 22 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 3 | `src/data/blog-posts.ts:1230` | L3-keyword | 書刊/畫冊 | `100 張起印` | `10 張起印` | low | 書刊/畫冊 距 9 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 4 | `src/data/blog-posts.ts:1947` | L3-keyword | 書刊/畫冊 | `100 部から` | `10 部から` | low | 書刊/畫冊 距 13 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 5 | `src/data/blog-posts.ts:1977` | L3-keyword | 書刊/畫冊 | `100 部から` | `10 部から` | low | 書刊/畫冊 距 19 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 6 | `src/data/blog-posts.ts:2002` | L3-keyword | 書刊/畫冊 | `1 本起印` | `10 本起印` | low | 書刊/畫冊 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 7 | `src/data/blog-posts.ts:2034` | L3-keyword | 書刊/畫冊 | `1 本起印` | `10 本起印` | low | 書刊/畫冊 距 15 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 8 | `src/data/buying-guides.ts:31` | L3-keyword | 賀卡 | `100 張起印` | `10 張起印` | low | 賀卡 距 22 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 9 | `src/data/buying-guides.ts:32` | L3-keyword | 賀卡 | `100 MOQ` | `10 MOQ` | low | 賀卡 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 10 | `src/data/buying-guides.ts:33` | L3-keyword | 賀卡 | `100枚から` | `10枚から` | low | 賀卡 距 22 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 11 | `src/data/buying-guides.ts:44` | L3-keyword | 賀卡 | `100 張起印` | `10 張起印` | low | 賀卡 距 27 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 12 | `src/data/buying-guides.ts:60` | L3-keyword | 賀卡 | `100 MOQ` | `10 MOQ` | low | 賀卡 距 21 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 13 | `src/data/buying-guides.ts:74` | L3-keyword | 賀卡 | `100枚から` | `10枚から` | low | 賀卡 距 54 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 14 | `src/data/buying-guides.ts:117` | L3-keyword | 貼紙/標籤 | `50 個起印` | `10 個起印` | low | 貼紙/標籤 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 15 | `src/data/buying-guides.ts:117` | L3-keyword | 貼紙/標籤 | `100 張起` | `10 張起` | low | 貼紙/標籤 距 25 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 16 | `src/data/buying-guides.ts:117` | L3-keyword | 貼紙/標籤 | `500 張起` | `10 張起` | low | 貼紙/標籤 距 43 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 17 | `src/data/buying-guides.ts:181` | L3-keyword | 貼紙/標籤 | `50枚から` | `10枚から` | low | 貼紙/標籤 距 6 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 18 | `src/data/buying-guides.ts:181` | L3-keyword | 貼紙/標籤 | `100枚から` | `10枚から` | low | 貼紙/標籤 距 30 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 19 | `src/data/buying-guides.ts:181` | L3-keyword | 貼紙/標籤 | `500枚から` | `10枚から` | low | 貼紙/標籤 距 53 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 20 | `src/data/buying-guides.ts:733` | L3-keyword | 書刊/畫冊 | `50 本起印` | `10 本起印` | low | 書刊/畫冊 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 21 | `src/data/buying-guides.ts:747` | L3-keyword | 書刊/畫冊 | `50 本起印` | `10 本起印` | low | 書刊/畫冊 距 42 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 22 | `src/data/buying-guides.ts:749` | L3-keyword | 書刊/畫冊 | `50 本起印` | `10 本起印` | low | 書刊/畫冊 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 23 | `src/data/buying-guides.ts:750` | L3-keyword | 書刊/畫冊 | `50 本起印` | `10 本起印` | low | 書刊/畫冊 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 24 | `src/data/buying-guides.ts:819` | L3-keyword | 書刊/畫冊 | `50 冊から` | `10 冊から` | low | 書刊/畫冊 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 25 | `src/data/buying-guides.ts:820` | L3-keyword | 書刊/畫冊 | `50 冊から` | `10 冊から` | low | 書刊/畫冊 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 26 | `src/data/buying-guides.ts:916` | L3-keyword | 貼紙/標籤 | `MOQ 100` | `MOQ 10` | low | 貼紙/標籤 距 17 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 27 | `src/data/category-conversion-blocks.ts:74` | L3-keyword | 貼紙/標籤 | `100 張起印` | `10 張起印` | low | 貼紙/標籤 距 20 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 28 | `src/data/category-conversion-blocks.ts:75` | L3-keyword | 貼紙/標籤 | `100 張起印` | `10 張起印` | low | 貼紙/標籤 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 29 | `src/data/category-conversion-blocks.ts:354` | L3-keyword | 貼紙/標籤 | `100枚から` | `10枚から` | low | 貼紙/標籤 距 16 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 30 | `src/data/category-conversion-blocks.ts:355` | L3-keyword | 貼紙/標籤 | `100枚から` | `10枚から` | low | 貼紙/標籤 距 29 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 31 | `src/data/category-conversion-blocks.ts:795` | L3-keyword | 傳單 | `100 張起印` | `10 張起印` | low | 傳單 距 31 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 32 | `src/data/category-conversion-blocks.ts:2320` | L3-keyword | 傳單 | `100枚から` | `10枚から` | low | 傳單 距 14 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 33 | `src/data/category-conversion-blocks.ts:2435` | L3-keyword | 傳單 | `100枚から` | `10枚から` | low | 傳單 距 39 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 34 | `src/data/category-conversion-blocks.ts:3589` | L3-keyword | 書刊/畫冊 | `100 本起印` | `10 本起印` | low | 書刊/畫冊 距 8 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 35 | `src/data/category-conversion-blocks.ts:3701` | L3-keyword | 書刊/畫冊 | `100 本起印` | `10 本起印` | low | 書刊/畫冊 距 8 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 36 | `src/data/category-conversion-blocks.ts:3871` | L3-keyword | 書刊/畫冊 | `100冊から` | `10冊から` | low | 書刊/畫冊 距 31 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 37 | `src/data/category-conversion-blocks.ts:3879` | L3-keyword | 書刊/畫冊 | `100冊から` | `10冊から` | low | 書刊/畫冊 距 27 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 38 | `src/data/category-conversion-blocks.ts:3883` | L3-keyword | 書刊/畫冊 | `100冊から` | `10冊から` | low | 書刊/畫冊 距 6 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 39 | `src/data/category-conversion-blocks.ts:3990` | L3-keyword | 書刊/畫冊 | `100冊から` | `10冊から` | low | 書刊/畫冊 距 39 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 40 | `src/data/category-conversion-blocks.ts:3991` | L3-keyword | 書刊/畫冊 | `100冊から` | `10冊から` | low | 書刊/畫冊 距 12 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 41 | `src/data/category-conversion-blocks.ts:3992` | L3-keyword | 書刊/畫冊 | `100冊から` | `10冊から` | low | 書刊/畫冊 距 6 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 42 | `src/data/category-conversion-blocks.ts:3995` | L3-keyword | 書刊/畫冊 | `100冊から` | `10冊から` | low | 書刊/畫冊 距 8 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 43 | `src/data/category-conversion-blocks.ts:4003` | L3-keyword | 書刊/畫冊 | `100冊から` | `10冊から` | low | 書刊/畫冊 距 4 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 44 | `src/data/category-conversion-blocks.ts:4007` | L3-keyword | 書刊/畫冊 | `100冊から` | `10冊から` | low | 書刊/畫冊 距 5 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 45 | `src/data/category-seo-content.ts:712` | L3-keyword | 書刊/畫冊 | `50 本起印` | `10 本起印` | low | 書刊/畫冊 距 23 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 46 | `src/data/category-seo-content.ts:912` | L3-keyword | 書刊/畫冊 | `50冊から` | `10冊から` | low | 書刊/畫冊 距 35 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 47 | `src/data/category-seo-content.ts:969` | L3-keyword | 貼紙/標籤 | `1冊から` | `10冊から` | low | 貼紙/標籤 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 48 | `src/data/category-seo-content.ts:1599` | L3-keyword | 貼紙/標籤 | `500枚から` | `10枚から` | low | 貼紙/標籤 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 49 | `src/data/category-seo-content.ts:1916` | L3-keyword | 貼紙/標籤 | `50冊から` | `10冊から` | low | 貼紙/標籤 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 50 | `src/data/category-seo-content.ts:2217` | L3-keyword | 貼紙/標籤 | `500枚から` | `10枚から` | low | 貼紙/標籤 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 51 | `src/data/category-seo-content.ts:2509` | L3-keyword | 貼紙/標籤 | `50冊から` | `10冊から` | low | 貼紙/標籤 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 52 | `src/data/category-seo-content.ts:2665` | L3-keyword | 貼紙/標籤 | `50 個起印` | `10 個起印` | low | 貼紙/標籤 距 5 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 53 | `src/data/category-seo-content.ts:2722` | L3-keyword | 貼紙/標籤 | `50 張起` | `10 張起` | low | 貼紙/標籤 距 22 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 54 | `src/data/category-seo-content.ts:2739` | L3-keyword | 貼紙/標籤 | `50 張起印` | `10 張起印` | low | 貼紙/標籤 距 12 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 55 | `src/data/category-seo-content.ts:2745` | L3-keyword | 貼紙/標籤 | `50 張起` | `10 張起` | low | 貼紙/標籤 距 23 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 56 | `src/data/category-seo-content.ts:2745` | L3-keyword | 貼紙/標籤 | `1,000 張起` | `10 張起` | low | 貼紙/標籤 距 13 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 57 | `src/data/category-seo-content.ts:2756` | L3-keyword | 貼紙/標籤 | `50 張起` | `10 張起` | low | 貼紙/標籤 距 18 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 58 | `src/data/category-seo-content.ts:2876` | L3-keyword | 貼紙/標籤 | `50枚から` | `10枚から` | low | 貼紙/標籤 距 8 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 59 | `src/data/category-seo-content.ts:2933` | L3-keyword | 貼紙/標籤 | `50枚から` | `10枚から` | low | 貼紙/標籤 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 60 | `src/data/category-seo-content.ts:2950` | L3-keyword | 貼紙/標籤 | `50枚から` | `10枚から` | low | 貼紙/標籤 距 51 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 61 | `src/data/category-seo-content.ts:2965` | L3-keyword | 貼紙/標籤 | `50枚から` | `10枚から` | low | 貼紙/標籤 距 20 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 62 | `src/data/category-seo-content.ts:2987` | L3-keyword | 傳單 | `100 張起印` | `10 張起印` | low | 傳單 距 15 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 63 | `src/data/category-seo-content.ts:3044` | L3-keyword | 貼紙/標籤 | `100 張起` | `10 張起` | low | 貼紙/標籤 距 22 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 64 | `src/data/category-seo-content.ts:3185` | L3-keyword | 傳單 | `100枚から` | `10枚から` | low | 傳單 距 12 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 65 | `src/data/category-seo-content.ts:3242` | L3-keyword | 貼紙/標籤 | `100枚から` | `10枚から` | low | 貼紙/標籤 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 66 | `src/data/category-seo-content.ts:3346` | L3-keyword | 貼紙/標籤 | `1 張起` | `10 張起` | low | 貼紙/標籤 距 22 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 67 | `src/data/category-seo-content.ts:3556` | L3-keyword | 貼紙/標籤 | `1枚から` | `10枚から` | low | 貼紙/標籤 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 68 | `src/data/category-seo-content.ts:3992` | L3-keyword | 貼紙/標籤 | `50 張起` | `10 張起` | low | 貼紙/標籤 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 69 | `src/data/category-seo-content.ts:4112` | L3-keyword | 貼紙/標籤 | `MOQ 50` | `MOQ 10` | low | 貼紙/標籤 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 70 | `src/data/category-seo-content.ts:4218` | L3-keyword | 賀卡 | `100 張起印` | `10 張起印` | low | 賀卡 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 71 | `src/data/category-seo-content.ts:4267` | L3-keyword | 貼紙/標籤 | `100 張起印` | `10 張起印` | low | 貼紙/標籤 距 22 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 72 | `src/data/category-seo-content.ts:4298` | L3-keyword | 賀卡 | `100 張起印` | `10 張起印` | low | 賀卡 距 18 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 73 | `src/data/category-seo-content.ts:4392` | L3-keyword | 賀卡 | `100枚から` | `10枚から` | low | 賀卡 距 15 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 74 | `src/data/category-seo-content.ts:4441` | L3-keyword | 貼紙/標籤 | `100 枚から` | `10 枚から` | low | 貼紙/標籤 距 23 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 75 | `src/data/category-seo-content.ts:4472` | L3-keyword | 賀卡 | `100 枚から` | `10 枚から` | low | 賀卡 距 27 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 76 | `src/data/category-seo-content.ts:4838` | L3-keyword | 貼紙/標籤 | `50 張起印` | `10 張起印` | low | 貼紙/標籤 距 22 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 77 | `src/data/category-seo-content.ts:5016` | L3-keyword | 貼紙/標籤 | `50 枚から` | `10 枚から` | low | 貼紙/標籤 距 23 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 78 | `src/data/insights/hk-print-inquiry-index-vol1.ts:22` | L3-keyword | 書刊/畫冊 | `100 部から` | `10 部から` | low | 書刊/畫冊 距 46 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 79 | `src/data/insights/hk-print-inquiry-index-vol1.ts:22` | L3-keyword | 書刊/畫冊 | `100 部から` | `10 部から` | low | 書刊/畫冊 距 9 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 80 | `src/data/insights/hk-print-inquiry-index-vol1.ts:22` | L3-keyword | 貼紙/標籤 | `50 枚から` | `10 枚から` | low | 貼紙/標籤 距 8 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 81 | `src/data/products-content.ts:276` | L3-keyword | 賀卡 | `50枚〜` | `10枚〜` | low | 賀卡 距 5 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 82 | `src/data/products-content.ts:390` | L3-keyword | 賀卡 | `50枚〜` | `10枚〜` | low | 賀卡 距 5 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 83 | `src/data/products-content.ts:550` | L3-keyword | 賀卡 | `MOQ 100` | `MOQ 10` | low | 賀卡 距 21 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 84 | `src/data/products-content.ts:787` | L3-keyword | 賀卡 | `MOQ 100` | `MOQ 10` | low | 賀卡 距 21 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 85 | `src/data/products-content.ts:1021` | L3-keyword | 賀卡 | `MOQ 100` | `MOQ 10` | low | 賀卡 距 21 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 86 | `src/data/products-content.ts:1253` | L3-keyword | 賀卡 | `MOQ 100` | `MOQ 10` | low | 賀卡 距 21 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 87 | `src/data/products-content.ts:1364` | L3-keyword | 貼紙/標籤 | `500 張起印` | `10 張起印` | low | 貼紙/標籤 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 88 | `src/data/products-content.ts:1578` | L3-keyword | 貼紙/標籤 | `50 枚〜` | `10 枚〜` | low | 貼紙/標籤 距 57 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 89 | `src/data/products-content.ts:1702` | L3-keyword | 貼紙/標籤 | `500 張起印` | `10 張起印` | low | 貼紙/標籤 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 90 | `src/data/products-content.ts:1937` | L3-keyword | 貼紙/標籤 | `500 張起印` | `10 張起印` | low | 貼紙/標籤 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 91 | `src/data/products-content.ts:2221` | L3-keyword | 貼紙/標籤 | `500 張起印` | `10 張起印` | low | 貼紙/標籤 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 92 | `src/data/products-content.ts:2467` | L3-keyword | 貼紙/標籤 | `500 張起印` | `10 張起印` | low | 貼紙/標籤 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 93 | `src/data/products-content.ts:2546` | L3-keyword | 貼紙/標籤 | `100 枚から` | `10 枚から` | low | 貼紙/標籤 距 17 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 94 | `src/data/products-content.ts:2588` | L3-keyword | 貼紙/標籤 | `MOQ 100` | `MOQ 10` | low | 貼紙/標籤 距 32 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 95 | `src/data/products-content.ts:2706` | L3-keyword | 貼紙/標籤 | `500 張起印` | `10 張起印` | low | 貼紙/標籤 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 96 | `src/data/products-content.ts:2943` | L3-keyword | 貼紙/標籤 | `500 張起印` | `10 張起印` | low | 貼紙/標籤 距 7 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 97 | `src/data/products-content.ts:10062` | L3-keyword | 書刊/畫冊 | `1部から` | `10部から` | low | 書刊/畫冊 距 43 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 98 | `src/data/products-content.ts:11576` | L3-keyword | 書刊/畫冊 | `50 部から` | `10 部から` | low | 書刊/畫冊 距 9 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 99 | `src/data/products.ts:338` | L3-keyword | 賀卡 | `100個起印` | `10個起印` | low | 賀卡 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 100 | `src/data/products.ts:716` | L3-keyword | 貼紙/標籤 | `100個起印` | `10個起印` | low | 貼紙/標籤 距 6 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 101 | `src/data/products.ts:915` | L3-keyword | 貼紙/標籤 | `50張起印` | `10張起印` | low | 貼紙/標籤 距 11 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 102 | `src/data/products.ts:5766` | L3-keyword | 書刊/畫冊 | `MOQ 100` | `MOQ 10` | low | 書刊/畫冊 距 16 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 103 | `src/data/sku-seo-data.ts:31` | L3-keyword | 貼紙/標籤 | `100 張起` | `10 張起` | low | 貼紙/標籤 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 104 | `src/data/sku-seo-data.ts:82` | L3-keyword | 貼紙/標籤 | `100 張起` | `10 張起` | low | 貼紙/標籤 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 105 | `src/data/sku-seo-data.ts:125` | L3-keyword | 貼紙/標籤 | `100 張起` | `10 張起` | low | 貼紙/標籤 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 106 | `src/data/sku-seo-data.ts:184` | L3-keyword | 貼紙/標籤 | `50 枚〜` | `10 枚〜` | low | 貼紙/標籤 距 6 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 107 | `src/data/sku-seo-data.ts:185` | L3-keyword | 貼紙/標籤 | `50 枚〜` | `10 枚〜` | low | 貼紙/標籤 距 6 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 108 | `src/data/sku-seo-data.ts:212` | L3-keyword | 貼紙/標籤 | `100 張起` | `10 張起` | low | 貼紙/標籤 距 5 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 109 | `src/data/sku-seo-data.ts:255` | L3-keyword | 貼紙/標籤 | `100 張起` | `10 張起` | low | 貼紙/標籤 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 110 | `src/data/sku-seo-data.ts:298` | L3-keyword | 貼紙/標籤 | `100 張起` | `10 張起` | low | 貼紙/標籤 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 111 | `src/data/sku-seo-data.ts:341` | L3-keyword | 貼紙/標籤 | `100 張起` | `10 張起` | low | 貼紙/標籤 距 3 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 112 | `src/data/sku-seo-data.ts:706` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 14 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 113 | `src/data/sku-seo-data.ts:726` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 11 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 114 | `src/data/sku-seo-data.ts:753` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 14 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 115 | `src/data/sku-seo-data.ts:773` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 11 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 116 | `src/data/sku-seo-data.ts:785` | L3-keyword | 傳單 | `100 張起` | `10 張起` | low | 傳單 距 5 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 117 | `src/data/sku-seo-data.ts:800` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 14 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 118 | `src/data/sku-seo-data.ts:802` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 6 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 119 | `src/data/sku-seo-data.ts:816` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 11 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 120 | `src/data/sku-seo-data.ts:827` | L3-keyword | 傳單 | `100張起` | `10張起` | low | 傳單 距 10 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 121 | `src/data/sku-seo-data.ts:865` | L3-keyword | 傳單 | `100張起` | `10張起` | low | 傳單 距 10 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 122 | `src/data/sku-seo-data.ts:866` | L3-keyword | 傳單 | `100 張起` | `10 張起` | low | 傳單 距 5 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 123 | `src/data/sku-seo-data.ts:880` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 14 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 124 | `src/data/sku-seo-data.ts:896` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 10 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 125 | `src/data/sku-seo-data.ts:939` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 12 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 126 | `src/data/sku-seo-data.ts:951` | L3-keyword | 傳單 | `100 張起` | `10 張起` | low | 傳單 距 10 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 127 | `src/data/sku-seo-data.ts:965` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 14 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 128 | `src/data/sku-seo-data.ts:2446` | L3-keyword | 書刊/畫冊 | `100枚〜` | `10枚〜` | low | 書刊/畫冊 距 4 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 129 | `src/data/sku-seo-data.ts:2488` | L3-keyword | 書刊/畫冊 | `100枚〜` | `10枚〜` | low | 書刊/畫冊 距 4 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 130 | `src/data/sku-seo-data.ts:2816` | L3-keyword | 書刊/畫冊 | `100枚〜` | `10枚〜` | low | 書刊/畫冊 距 4 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 131 | `src/data/sku-seo-data.ts:2843` | L3-keyword | 傳單 | `100張起` | `10張起` | low | 傳單 距 10 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 132 | `src/data/sku-seo-data.ts:2844` | L3-keyword | 傳單 | `100 張起` | `10 張起` | low | 傳單 距 9 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 133 | `src/data/sku-seo-data.ts:2858` | L3-keyword | 書刊/畫冊 | `100枚〜` | `10枚〜` | low | 書刊/畫冊 距 4 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 134 | `src/data/sku-seo-data.ts:2874` | L3-keyword | 傳單 | `100枚〜` | `10枚〜` | low | 傳單 距 11 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 135 | `src/data/sku-seo-data.ts:3095` | L3-keyword | 貼紙/標籤 | `500 張起` | `10 張起` | low | 貼紙/標籤 距 5 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 136 | `src/data/sku-seo-data.ts:3383` | L3-keyword | 書刊/畫冊 | `50 本起印` | `10 本起印` | low | 書刊/畫冊 距 6 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 137 | `src/data/sku-seo-data.ts:3396` | L3-keyword | 書刊/畫冊 | `50 冊から` | `10 冊から` | low | 書刊/畫冊 距 9 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 138 | `src/data/sku-seo-data.ts:3408` | L3-keyword | 書刊/畫冊 | `50 本起印` | `10 本起印` | low | 書刊/畫冊 距 4 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 139 | `src/data/sku-seo-data.ts:3596` | L3-keyword | 賀卡 | `100枚〜` | `10枚〜` | low | 賀卡 距 11 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 140 | `src/data/sku-seo-data.ts:3597` | L3-keyword | 賀卡 | `100枚〜` | `10枚〜` | low | 賀卡 距 58 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 141 | `src/data/sku-seo-data.ts:3646` | L3-keyword | 賀卡 | `100枚〜` | `10枚〜` | low | 賀卡 距 59 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 142 | `src/data/sku-seo-data.ts:3694` | L3-keyword | 賀卡 | `100枚〜` | `10枚〜` | low | 賀卡 距 13 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 143 | `src/data/sku-seo-data.ts:3695` | L3-keyword | 賀卡 | `100枚〜` | `10枚〜` | low | 賀卡 距 56 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 144 | `src/lib/seo.ts:608` | L3-keyword | 書刊/畫冊 | `50部〜` | `10部〜` | low | 書刊/畫冊 距 5 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 145 | `src/lib/seo.ts:644` | L3-keyword | 賀卡 | `100枚から` | `10枚から` | low | 賀卡 距 15 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 146 | `src/lib/seo.ts:654` | L3-keyword | 賀卡 | `100枚から` | `10枚から` | low | 賀卡 距 13 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 147 | `src/app/[locale]/category/[slug]/page.tsx:175` | L3-keyword | 貼紙/標籤 | `50 MOQ` | `10 MOQ` | low | 貼紙/標籤 距 33 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 148 | `src/app/[locale]/category/[slug]/page.tsx:190` | L3-keyword | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | low | 書刊/畫冊 距 14 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 149 | `src/app/[locale]/category/[slug]/page.tsx:206` | L3-keyword | 書刊/畫冊 | `1000 MOQ` | `10 MOQ` | low | 書刊/畫冊 距 24 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬) |  |
| 150 | `src/app/[locale]/services/catalog-printing-china/page.tsx:23` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 151 | `src/app/[locale]/services/catalog-printing-china/page.tsx:24` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 152 | `src/app/[locale]/services/catalog-printing-china/page.tsx:28` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 153 | `src/app/[locale]/services/catalog-printing-china/page.tsx:29` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 154 | `src/app/[locale]/services/catalog-printing-china/page.tsx:33` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 155 | `src/app/[locale]/services/catalog-printing-china/page.tsx:34` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 156 | `src/app/[locale]/services/catalog-printing-china/page.tsx:114` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 157 | `src/app/[locale]/services/catalog-printing-china/page.tsx:118` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 50` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 158 | `src/app/[locale]/services/catalog-printing-china/page.tsx:123` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 50` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 159 | `src/app/[locale]/services/catalog-printing-china/page.tsx:124` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 100,` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 160 | `src/app/[locale]/services/catalog-printing-china/page.tsx:124` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 500` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 161 | `src/app/[locale]/services/catalog-printing-china/page.tsx:124` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 50` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 162 | `src/app/[locale]/services/catalog-printing-china/page.tsx:166` | L1-slug:catalog-printing | 書刊/畫冊 | `50 本起印` | `10 本起印` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 163 | `src/app/[locale]/services/catalog-printing-china/page.tsx:195` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 164 | `src/app/[locale]/services/catalog-printing-china/page.tsx:196` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 165 | `src/app/[locale]/services/catalog-printing-china/page.tsx:199` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 166 | `src/app/[locale]/services/catalog-printing-china/page.tsx:204` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 167 | `src/app/[locale]/services/catalog-printing-china/page.tsx:205` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 100,` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 168 | `src/app/[locale]/services/catalog-printing-china/page.tsx:205` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 500` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 169 | `src/app/[locale]/services/catalog-printing-china/page.tsx:205` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 170 | `src/app/[locale]/services/catalog-printing-china/page.tsx:247` | L1-slug:catalog-printing | 書刊/畫冊 | `50 pcs MOQ` | `10 pcs MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 171 | `src/app/[locale]/services/catalog-printing-china/page.tsx:276` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 172 | `src/app/[locale]/services/catalog-printing-china/page.tsx:277` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 173 | `src/app/[locale]/services/catalog-printing-china/page.tsx:280` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 174 | `src/app/[locale]/services/catalog-printing-china/page.tsx:285` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 175 | `src/app/[locale]/services/catalog-printing-china/page.tsx:286` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 100,` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 176 | `src/app/[locale]/services/catalog-printing-china/page.tsx:286` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 500` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 177 | `src/app/[locale]/services/catalog-printing-china/page.tsx:286` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 178 | `src/app/[locale]/services/catalog-printing-china/page.tsx:328` | L1-slug:catalog-printing | 書刊/畫冊 | `MOQ 50` | `MOQ 10` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 179 | `src/app/[locale]/services/catalog-printing-china/page.tsx:328` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 180 | `src/app/[locale]/services/catalog-printing-china/page.tsx:328` | L1-slug:catalog-printing | 書刊/畫冊 | `1部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 181 | `src/app/[locale]/services/catalog-printing-china/page.tsx:659` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 182 | `src/app/[locale]/services/catalog-printing-china/page.tsx:659` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 183 | `src/app/[locale]/services/catalog-printing-china/page.tsx:663` | L1-slug:catalog-printing | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 184 | `src/app/[locale]/services/catalog-printing-china/page.tsx:663` | L1-slug:catalog-printing | 書刊/畫冊 | `50部から` | `10部から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 185 | `src/app/[locale]/services/catalog-printing-china/page.tsx:667` | L1-slug:catalog-printing | 書刊/畫冊 | `100 MOQ` | `10 MOQ` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 186 | `src/app/[locale]/services/catalog-printing-china/page.tsx:667` | L1-slug:catalog-printing | 書刊/畫冊 | `100枚から` | `10枚から` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |
| 187 | `src/app/[locale]/services/catalog-printing-china/page.tsx:667` | L1-slug:catalog-printing | 書刊/畫冊 | `100 張起` | `10 張起` | high | 產品 slug catalog-printing (minQuantity 權威值) |  |

## 白名單 — 跨品類綜合頁 (需人工立門檻組)

| # | 檔案:行 | 命中 | 說明 |
|---|---|---|---|
| 1 | `src/data/blog-posts.ts:990` | `100 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 2 | `src/data/blog-posts.ts:992` | `100 枚から` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 3 | `src/data/blog-posts.ts:1281` | `100 個起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 4 | `src/data/blog-posts.ts:1412` | `100 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 5 | `src/data/blog-posts.ts:1412` | `100 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 6 | `src/data/blog-posts.ts:1414` | `100枚から` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 7 | `src/data/blog-posts.ts:1431` | `100 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 8 | `src/data/blog-posts.ts:1433` | `100 枚〜` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 9 | `src/data/blog-posts.ts:1454` | `100 個起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 10 | `src/data/blog-posts.ts:1545` | `50 本起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 11 | `src/data/blog-posts.ts:1634` | `100 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 12 | `src/data/blog-posts.ts:1636` | `100 枚〜` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 13 | `src/data/blog-posts.ts:1658` | `100 個起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 14 | `src/data/blog-posts.ts:1729` | `100 個起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 15 | `src/data/blog-posts.ts:2007` | `1 本起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 16 | `src/data/blog-posts.ts:2009` | `1 部から` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 17 | `src/data/blog-posts.ts:2041` | `1 部から` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 18 | `src/data/blog-posts.ts:2041` | `100 部から` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 19 | `src/data/buying-guides.ts:929` | `MOQ 100` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 20 | `src/data/buying-guides.ts:929` | `100 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 21 | `src/data/buying-guides.ts:929` | `100 張起` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 22 | `src/data/category-seo-content.ts:84` | `100 個起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 23 | `src/data/pillar-content.ts:58` | `100 張起` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 24 | `src/data/pillar-content.ts:60` | `100枚から` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 25 | `src/data/pillar-content.ts:96` | `10 張起` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 26 | `src/data/pillar-content.ts:98` | `10枚から` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 27 | `src/data/products-content.ts:6566` | `500 個起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 28 | `src/data/sku-seo-data.ts:907` | `100張起` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 29 | `src/data/sku-seo-data.ts:993` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 30 | `src/data/sku-seo-data.ts:993` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 31 | `src/data/sku-seo-data.ts:993` | `50 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 32 | `src/data/sku-seo-data.ts:993` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 33 | `src/data/sku-seo-data.ts:993` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 34 | `src/data/sku-seo-data.ts:993` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 35 | `src/data/sku-seo-data.ts:993` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 36 | `src/data/sku-seo-data.ts:1041` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 37 | `src/data/sku-seo-data.ts:1041` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 38 | `src/data/sku-seo-data.ts:1041` | `50 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 39 | `src/data/sku-seo-data.ts:1041` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| 40 | `src/data/sku-seo-data.ts:1041` | `1 張起印` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |
| … | | | 其餘 33 條見 .json |