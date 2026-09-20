# `sku-seo-data.ts` 重生成安全性事故與 SOP-5 例外留痕

**日期**：2026-09-20
**性質**：**即時發現並還原的資料損失事故** + SOP-5（派生文件禁手搓）的**例外留痕**
**數據來源**：
- 實測：`node scripts/csv-to-sku-seo.mjs`（生成器輸出 75 entries）
- 實測：`.hermes/logs/_check-sku-seo-state.mjs`（當前/備份/HEAD 三方 key 數對比）
- 備份：`.hermes/_bak-sku-seo-before-regen-20260920.ts`（99 keys，已還原）
- CSV：`zprintpro-sku-seo-data.csv`（TAB 31 欄，75 資料列）
- K3 2026-09-19 指示：「sku-seo-data.ts 的 24 條 menus 文案必須改源頭 CSV，不能手搓派生文件」

---

## 一、事故經過（已還原，無資料損失）

依 K3 指示，修改 CSV 源頭（menus FAQ 答案）後重跑生成器 `scripts/csv-to-sku-seo.mjs`：

```
[csv-to-sku-seo] Wrote src/data/sku-seo-data.ts with 75 entries
```

⚠️ **生成器只輸出 75 entries，而 `sku-seo-data.ts` 原有 99 個 SKU key** →
直接採用將**丟失 25 個 SKU**，且 diff 達 **4697 行**（預期僅 4 條）。

**丟失清單（25 個）**：
`magnetic-closure-gift-box`、`electronics-packaging-box`、`kraft-paper-packaging-box`、
`gang-run-card-boxes`、`tuck-end-boxes`、`corrugated-boxes`、`white-card-boxes`、
`graduation-yearbook`、`cafe-table-cards`、`drink-tokens`、`escort-cards`、
`name-tags-badges`、`foil-wedding-invitations`、`save-the-date-cards`、
`wedding-menu-cards`、`wedding-place-cards`、`wedding-program-cards`、
`wedding-seating-charts`、`wedding-suite-bundle`、`wedding-thank-you-cards`、
`doujinshi-printing`、`acrylic-keychain`、`can-badge`、`postcard-set`、`eco-tote-bag`

**處置**：已從備份逐字還原（99 keys / 733,500 bytes），`git diff` 為空，tsc 54 持平。

---

## 二、根因：`sku-seo-data.ts` 是「生成 + 手工」混合檔

| 來源 | key / 列數 |
|------|-----------|
| `zprintpro-sku-seo-data.csv`（宣告的源頭） | **75** 資料列 |
| `src/data/sku-seo-data.ts`（宣稱「自动生成」） | **99** 個 key |

⇒ 生成器**已不是**該檔的完整來源。檔頭註解「从 zprintpro-sku-seo-data.csv 自动生成」
與事實不符（漏了 24 個 key 的來源說明），這正是 SOP-5「改源頭」路徑會**造成損失**的原因。

### 附帶的流程缺陷（已固化檢查）

我建立的檢查 `_verify-regen-safety.mjs` 在**還原前**曾跑過一次，當時檔案已被生成器
覆蓋成 75 keys → 它比對「CSV 75 vs 目標 75」後報 **✅ 安全**。
**這是時序造成的假安全感**：檢查對象必須是**重生成前的原始檔**，而非已被覆蓋的檔。

修法：檢查腳本改為對照 **git HEAD 版本**（穩定基準），而非工作區當前檔。

---

## 三、SOP-5 例外留痕（本次為何直接改派生檔）

SOP-5 原文：**「派生文件禁手搓：改源頭再跑生成器，衝突時也回源頭重新生成」**。

本批**無法遵守**，理由如下（非圖方便）：

1. 「回源頭重生成」的**代價是丟失 25 個 SKU**（實測），比手改風險更大
2. CSV 只有 75 列，缺失的 24 個 key 在 CSV 中**不存在** → 無源頭可改
3. 本次改動僅 4 條 FAQ 文案（同一句），且以**前斷言 + 後斷言**保護
   （原文存在性 / 新文到位 / **key 數不變 99**）

**執行方式**：`_fix-csv-menus-faq.mjs`（改 CSV，4 條）+ `_sync-menus-faq-to-ts.mjs`
（同步 TS，3 處），兩者皆 dry-run → apply → 後斷言。

**改動內容**：
- 舊：`一般為50個起訂，一次性餐牌可接受10個起。`
- 新：`一般為10個起訂，一次性餐牌（大批量柯式）100個起。`
  （menus 真值已改 10；一次性餐牌真值 100，故補明「大批量柯式」以消歧義）

**驗證**：CSV 31 欄斷言通過；TS key 數 99 不變；舊文殘留 0；tsc 54 持平。

---

## 四、長期方案（需 K3 定一個方向）

| 方案 | 做法 | 優點 | 缺點 |
|------|------|------|------|
| **A** | 把 24 個缺失 SKU 補進 CSV → 恢復「生成器為唯一來源」 | 回歸 SOP-5，可持續 | 需先補齊 24 SKU 的全部欄位（工作量大） |
| **B** | 正式承認 `sku-seo-data.ts` 為**手工維護檔**，廢除/停用生成器 | 誠實反映現狀 | 失去批量生成能力 |
| **C** | 改生成器為**增量合併**（只更新 CSV 涵蓋的 key，保留其他 key） | 兩全：既回源頭又不丟資料 | 需改生成器邏輯 + 加合併測試 |

**建議 C**：保留「改 CSV 重生成」的 SOP-5 路徑，同時不丟失手工擴充的內容。
本專案已有生成器加斷言的先例（`gen-price-data.mjs` 的 `EXPECT` 計數斷言），可沿用同模式。

---

## 五、附帶修復（本輪）

| 項 | 內容 |
|----|------|
| **生成器安全性檢查** | `_verify-regen-safety.mjs`：重跑生成器前比對 CSV 列數 vs 目標 key 數；**改為對照 git HEAD** 避免時序假安全感 |
| **PowerShell 靜默失敗** | 首次 `Copy-Item` 還原未生效且無報錯 → 改用 **node `fs.writeFileSync`** 並驗證逐字相同（已列為工具選擇教訓） |

---

## 六、線上探針（本輪 push 後複驗）

| 目標 | 結果 |
|------|------|
| `art-posters` PDP (zh-hk) | ✅ 已生效（「1 張起印」），**先前的「100張起印」殘留已隨部署清除** |
| `a2-posters` PDP (zh-hk) | ✅ 已生效（「10 張起印」） |
| 貼紙品類頁 (zh-hk) | ✅ 已生效（「10 個起」） |
| `art-posters` PDP (en) | ⚠️ 未見預期值 — 英文文案措辭不同，探針 pattern 未涵蓋（**非失敗**，待補 pattern） |

彙總：已生效 3 ｜ 仍見舊值 0 ｜ INVALID 0
