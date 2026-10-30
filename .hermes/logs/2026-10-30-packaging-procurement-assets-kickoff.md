# 2026-10-30 包裝採購資產三件 — 開工記錄（§6.3 / §12）

VERDICT: PARTIAL — 數據取證完成（1/3 可直接建，1/3 需真值確認，1/3 待取數）
CONSUMED: `.hermes/logs/2026-10-30-three-strategy-completion-and-next-phase.md` §6.3/§12 · `.hermes/logs/2026-10-30-k3-commercial-truth-decision-sheet.md` #2（無真實模板不宣傳下載）· `src/data/price-tables/zh-hk/paper-bags.json` · `public/` 檔案清點（pdf/ai/eps/zip = 0）
DELIVERED: 本開工記錄（三項資產的真值取證結果 + 阻斷點 + 可執行結論）
NEXT: ① PDF 入稿檢查清單 → 可直接建（無新數字）② 紙袋報價模板 → **需先確認 base 材質口徑**（否則新增第 4 層價格）③ 學校採購清單 → 下輪取 exercise-books 真值

---

## 一、PDF 入稿檢查清單 🟢 可直接建

**真值來源（站內既有，無需新數字）**：`category-seo-content.ts` 貼紙域「檔案要求 AI / PDF / PNG，300dpi，CMYK，預留 2mm 出血位（模切用）」；`buying-guides.ts`「AI／PDF／EPS 矢量檔、300dpi、CMYK 色彩模式，文字轉曲線，異形模切附刀模線」；包裝批 1 既有「文件確認後以報價為準」。

**可寫入的檢查項（全部有站內出處）**：
1. 出血 2mm（模切件）／3mm（一般裁切件）
2. 色彩 CMYK（禁 RGB 直接送印）
3. 解析度 300dpi
4. 文字轉曲線／嵌入字體
5. 異形模切附刀模線
6. 頁序與封面加頁（書刊類）
7. 檔案格式 AI／PDF／EPS（點陣 PNG 僅限簡單件）

**阻斷點**：無。落點建議 `/zh-hk/blog/design-file-specs/`（既有頁，28d 72 imp @ 6.17）追加一段，不新建路由、不動 title。

## 二、紙袋報價尺寸模板 🟡 需先確認材質口徑

**已取真值**（`src/data/price-tables/zh-hk/paper-bags.json`）：

| 維度 | 實測值 |
|---|---|
| 尺寸 | 小 (A5 / 10×15×5 cm) · 中 (A4 / 20×15×8 cm) · 大 (A3 / 30×20×10 cm) — 共 3 |
| 數量檔 | 100 / 250 / 500 / 1,000 / 2,000 / 3,000 / 5,000 / 10,000 — 共 8 |
| 單價帶 | **HK$1.05 – 10.5 / 個**（依尺寸 × 數量） |
| 交期 | 5–7 個工作天（全部檔位一致） |

**阻斷點（重要）**：該表為「尺寸 × 數量」純階梯，**未標明對應材質**；而 category 現有 featuredSnippet 是「牛皮紙 HK$8/個起 / 白卡 HK$12/個起 / 珠光燙金 HK$20/個起」——**按材質起價**。兩者計價基準不同。
若直接把 1.05–10.5 的表加進 category，會在同頁形成「材質起價」與「尺寸×數量價」兩套數值，**正是本輪貼紙診斷判定的第 4 層價格衝突**。

**結論**：需 K3 或真值確認「1.05–10.5 對應哪個材質與印刷面（單面/雙面、是否含提手）」，綁定條件後才可上表；否則只寫「按尺寸 × 數量 × 材質報價，30 秒 AI 報價確認」，不列數字。

## 三、學校採購清單 🟡 待取數

**已確認可用來源**：`exercise-books` 價格表 + 裝訂／頁數真值（包裝批 1 已驗證 exercise-books 域存在真實階梯價）。
**本輪未取數**：為避免與貼紙/紙袋同類「未綁定條件的價格表」問題，下輪先 dump 價格表結構（尺寸／頁數／裝訂／數量四維是否齊全）再決定表格形態。

---

## 四、與 §6.3 原文的對照

| §6.3 優先資產 | 本輪狀態 |
|---|---|
| 真實刀模／模板下載 | 🔴 BLOCKED（`public/` 0 檔；決策單 #2「無真實模板不宣傳下載」） |
| PDF 入稿檢查清單 | 🟢 可建（真值齊） |
| 紙袋報價尺寸模板 | 🟡 數據已取，**待材質口徑綁定** |
| C109 真值倒排表 | 🔴 BLOCKED（決策 #5 倒排留空） |
| 學校採購清單 | 🟡 待取數 |

## 五、數據來源

```
數據來源:
- src/data/price-tables/zh-hk/paper-bags.json（實讀：3 尺寸 × 8 數量檔 × unit_price 1.05-10.5 × lead_time 5-7 工作天）
- src/data/category-seo-content.ts L3599-3632（paperBagsContent zh-hk featuredSnippet 材質起價 + coreAdvantages 結構）
- src/data/buying-guides.ts 貼紙域檔案規格段（出血/300dpi/CMYK/轉曲線/刀模線）
- public/ 檔案清點（pdf/ai/eps/zip = 0）
- .hermes/logs/2026-10-30-k3-commercial-truth-decision-sheet.md #2
```

本記錄未修改 `src/`；三項資產的頁面落地待上述阻斷點解除後執行。
