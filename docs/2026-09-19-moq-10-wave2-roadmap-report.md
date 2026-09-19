# 全網站起訂量修正 — 第二波執行報告（K3 路線圖）

**日期**: 2026-09-19
**依據**: K3 優先級路線圖（P0 兩項 / P1 三項 / P2 兩項）
**前一波**: commit `6941d40d`（紙品線 100 → 10，38 檔案）

---

## 一、數據來源

```
數據來源:
- 源頭檔: src/data/products.ts (97 SKU minQuantity / variables.quantities)
- 源頭檔: src/data/price-tables/{posters,books,flyers,stickers,digital-stickers-cost,flyers-cost-yate98,special-fold-leaflets}.json
- 源頭檔: src/data/blog-data/{zh-hk,en,ja}.json (92 entries/locale)
- 生成器: scripts/gen-price-data.mjs → src/lib/price-data.generated.ts (19 slugs)
- 口徑 SSoT: src/data/print-method-policy.ts
- 門童: scripts/guards/price-band-guard.js (門童 #19)
- K3 2026-09-19 路線圖: P0-1 / P0-2 / P1-3 / P1-4 / P1-5 / P2-6 / P2-7
- 校準日期: 2026-09-19 (統計數字皆為當日實測; 未校準項已逐項標註)
```

---

## 二、P0 完成項

### P0-1 `/services/rush-printing-delivery/` 頁面同步 MOQ 10 口徑

- **現況澄清**: 該頁**可見文案**已於第一波改好（banner「傳單／貼紙 10 張起印」、相關服務清單）。
  本波補的是 **metaMap 的 en/ja**：
  | locale | 舊 | 新 |
  |---|---|---|
  | en | `100+ MOQ`（desc）＋ `flyers 100 moq`（keywords） | `flyers & stickers from 10 pcs`＋`flyers 10 moq,stickers 10 moq` |
  | ja | title「100枚〜」＋ desc「100 枚〜」＋ keywords「チラシ 100 枚」 | title「10枚〜」＋ desc「チラシ・ステッカーは 10 枚〜」＋「チラシ 10 枚,ステッカー 10 枚」 |
- **順手修一處既有矛盾**：zh-hk desc 原寫「下午 3 時前落單即日交貨」，與同頁 title「18:00 截單・翌日 12:00」及站上 timeline / FAQ / rush-data 全部 18:00 互相矛盾 → 統一為 18:00。
- 殘留「100 個起」= 紙袋（不在本批），正確保留。

### P0-2 A1 海報獨立 `minQuantity = 1` + 獨立價階

**勘查發現**：`posters.json` 一直有 2 個 A1 config（PP/環保海報 Yupo、相紙海報），但**從未映射進 `gen-price-data`** ⇒ `a1-posters` 既無 price table、`minQuantity` 又是 100，而 `seo.ts` 早已寫「1 張起印」= 長期自相矛盾。

| 項目 | 改動 |
|---|---|
| `gen-price-data.mjs` | 新增 `a1-posters` 映射（只取 2 個 A1 config）；計數斷言 18→19 slugs / 114→116 labels（斷言正確攔下過一次） |
| `posters.json` | 2 個 A1 config 加入 qty **1/3/5/7** modeled 檔 |
| `products.ts` | `a1-posters` `minQuantity` 100 → **1**；`quantities` 由死資料 100/500/1000 改為 **1/3/5/10/20** |
| `pricing.ts` | A1 display anchor `{29,29}`（註明「待 user 拍板」，29 實為 200 張檔單價）→ `{29,45}` 誠實區間 |
| `products-content.ts` | 6 處 poster 長描述：「10 張起印」→「1 張起印」；`50-poster minimum` / `50 posters…100 posters` → `from 1 poster` |
| `sku-seo-data.ts` | A1 title `100起印・HK$20起` → `1張起印・HK$45起`；desc/body `100 張起` → `1 張起`；en `50-MOQ…100 MOQ` → `from 1 poster`；h1 `50+` → `from 1` |

**A1 階梯（HK$ / 張，PP-Yupo｜相紙）**：
```
1→45｜56    3→115.5｜143.5    5→167｜207    7→213｜264.5
10→290｜360   20→580｜720   50→1450｜1800   100→2900｜3600   200→5800｜7200
```
單張價 45 → 14.5 → 29（≥100 線性），**無倒掛**；1 張總價恆 < 10 張總價。

---

## 三、P1 完成項

### P1-3 門童 #19 改為動態讀取 `minQuantity`

- `scripts/guards/price-band-guard.js`：新增 `readMinQuantity(slug)`，由 `src/data/products.ts` **解析**（不用會過期的 `.hermes/_products_export.json` 鏡像，符合單一真源）。
- BK-002 三語條目的 `required` / `forbidden` 改由 `bk002Bands(minQty)` 推導；K3 作廢的 50 本字樣仍列為 forbidden。
- **動態性已實證**：模擬 `minQuantity=10` 時，門童要求 `10 本起` 並改為禁 `50/100 本起`（原寫死 100）。
- 現況掃描 0 命中（zh-hk/en/ja 三篇文章皆正確寫 100 本起）。

### P1-4 補兩個 SKU 的 `quantities`

- `rounded-corner-greeting-cards`、`fluorescent-stickers` 原本**連 `variables` 都沒有** ⇒ PDP 無數量檔位選擇器。
- 已補 `variables.quantities`（10/100/500/1000[/2000]），與同線 SKU 一致。

### P1-5 博客層逐處判斷後修正

**方法（4 層過濾，逐處判斷而唔係文章級替換）**：

| 層 | 規則 | 作用 |
|---|---|---|
| 1 | 文章 slug 須命中紙品線白名單 | 排除工業銘牌 / 紙盒 / 校園 / 酒店客用品等主題 |
| 1b | 排除婚慶主題（`EXCLUDE_ARTICLES`） | 婚慶 SKU 維持 50 起，不在本批 |
| 2 | 上下文含他品類詞 → 不改 | 同篇內雜有紙袋 / 包裝盒 / 餐牌 的數字 |
| 3 | 上下文屬價目 / 批量單價語境 → 不改 | **關鍵**：`100 張起印 HK$0.22/張` 的 100 是**價目檔位**，改成 10 會令報價說謊（10 張實際 HK$71 起） |
| 3b | 例外：正在回答 MOQ 問題者仍改 | 「最低起印量係幾多？」屬真實 MOQ 宣稱 |
| 4 | 英文/日文「價格綁定 MOQ」→ 不改 | `US$1.20-1.80 per piece at 100 MOQ`、`100 枚から、1 枚 HK$0.22〜` |

**結果**：改 **63 處**（zh-hk 21 / en 17 / ja 25，38 個欄位）｜他品類保留 28 ｜**價目檔位保留 36** ｜非本批主題文章略過 68 篇。
JSON 以 `JSON.parse → JSON.stringify` 寫回，門童 #15 三檔全過（keys 92/92/92）。

**v1 為何被否決（已記錄在腳本頭部）**：v1 只用關鍵詞滑窗，改到 141 處，其中 `industrial-nameplate-printing-guide`（價目與 100 張檔綁定）、`kraft-paper-box`、`campus-education`、`school-exercise-book`、`hotel-keycard` 全部屬誤改 → 改為主題白名單 + 4 層約束。

---

## 四、P2 完成項

### P2-6 傳統膠印軟分流（報價器邏輯）

- `print-method-policy.ts` 新增 `getPrintMethodAdvice(slug, qty)`：

| 數量 | recommended | 提示 |
|---|---|---|
| < 100 | digital | 免製版，100 件起可轉柯式 |
| **100-199** | digital（過渡區 `isCrossover`） | 柯式短版攤不開，建議續走數碼；加至 200 件柯式單價明顯較低 |
| ≥ 200 | **offset** | 版費可攤分，單價最低、色彩最準 |

- 門檻集中為常數 `OFFSET_MIN_QTY=100` / `OFFSET_ECONOMICAL_FROM=200`（與門童 #19 動態讀值同一原則，不散落各檔）。
- `QuoteCalculator.tsx` 於價格區塊上方渲染提示卡（三語、顏色隨建議變化）。
- **「軟」= 只提示，不改價、不阻擋落單**。
- 邊界測試 24/0：1/9/10/99→digital、100/150/199→digital+過渡、200/500/5000→offset；非適用品類（包裝盒/紙袋/月曆/A1/婚慶）回 `null`。

### P2-7 畫冊 10-99 本獨立價階

- `books.json` 3 個 SKU 加入 10/25/50/75/99 本 modeled 檔：

| SKU | 10 | 25 | 50 | 75 | 99 | anchor |
|---|---|---|---|---|---|---|
| saddle-stitch-booklets | 179 | 346 | 545 | 738 | 922 | 100本 941 |
| perfect-bound-books | 308 | 597 | 942 | 1275 | 1592 | 100本 1624 |
| exercise-books | 53 | 104 | 164 | 222 | 281 | 500本 1414 |

- **模型修正（實測踩坑）**：`books.json` 的 `tier.price` 是**折扣前原價**，生成時才乘 `priceMultiplier`（0.97/0.94）。首版在 `price` 空間夾天花板 ⇒ 生成後 99 檔 951 **貴過** 100 檔 941。已改為**全程在最終成交價空間運算**（`final = price × mult`），修正後 99 檔 922 ≤ 941 ✓。
- ⚠️ **與 P1 裁決的張力（必須明講）**：本項只加**價階**，`products.ts` 的書刊 `minQuantity` **仍為 100**。即價階已就緒，但前台起訂量口徑未放開。要真正放開 10 本落單需 K3 再拍板（門童 #19 已於本波改為動態，屆時會自動跟隨）。

---

## 五、驗證（8 道閘門全綠）

| GATE | 指令 | 結果 |
|---|---|---|
| 1 | `node scripts/moq10-audit-ladders.mjs` | ✅ 0（本次引入問題 0；**既有 anchor 逐條不變**） |
| 2 | `node scripts/moq10-verify-anchors.mjs` | ✅ 0 |
| 3 | `node scripts/moq10-smoke-test.mjs` | ✅ **61 通過 / 0 失敗** |
| 4 | `npx tsx scripts/moq10-runtime-check.ts` | ✅ **38 通過 / 0 失敗** |
| 5 | `npx tsx scripts/moq10-print-method-check.ts` | ✅ **24 通過 / 0 失敗** |
| 6 | `node scripts/moq10-verify-books-generated.mjs` | ✅ 不變量全過 |
| 7 | `node scripts/check-regression-guard.js --commit` | ✅ 🔴0 |
| 8 | `node scripts/guards/blog-data-integrity-guard.js` | ✅ 3 檔全過 |
| 9 | `npx tsc --noEmit` | ✅ **54**（基線 57，0 新增） |
| 10 | `npm run build` | ✅ exit 0 · 732 URLs |

---

## 六、殘留與未決

| 項目 | 狀態 | 說明 |
|---|---|---|
| **書刊 minQuantity 仍 100** | ⏳ 待 K3 | P2-7 已備價階，未放開口徑（見 §四） |
| **價目檔位（36 處）** | ⏳ 另波 | 博客內「100 張起印 HK$0.22/張」等**批量價目**與 100 檔綁定，需與價目同步波一併處理，否則改 MOQ 會產生假報價 |
| **價目檔位（博客 36 處）外，UI 內亦有** | ⏳ 另波 | 同源問題，需一併盤點 |
| **通宵截稿時間** | ⏳ 待 K3 | 站上既有口徑 18:00（已於 P0-1 統一），與提案 15:00-16:00 不同 |
| **紙袋後工 10 起** | ⏳ 待 K3 | 紙袋維持 100 個 |
| **rounded-corner / fluorescent** | ✅ 本波已補 | — |
| **`small-batch-stickers` / `die-cut-stickers` 的表格檔位** | ⏳ 另案 | `stickers.json` 未被 `gen-price-data` 讀取（PDP 走 QuoteCalculator 已修，表格未建） |

---

## 七、Push 判斷（依 K3 指示）

- 第一波 `6941d40d` 已 commit 本地、未 push。
- 本波（P0 兩項）完成後，**建議合併為單一 push**；依 §0.25.1 需與上次 push **≥ 30 分鐘間隔**。
- 上一輪 push 為 `921b54a7`（11:30:15，非本執行層）；第一波 commit 於 11:56:53。
- **尚未 push**：待 K3 指示在滿足間隔後執行合併 push。
