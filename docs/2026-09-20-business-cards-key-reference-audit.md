# business-cards key 引用面盤點（K3 裁決「選項 C 的變體」第一步）

**性質**：K3 指示「先查 business-cards key 的引用面 —— 如果僅 CategorySharpHooks 一處引用，
則改名的影響面最小」。本檔是該排查的結果。
**數據來源**：`grep business-cards` over `src/`（36 命中 / 15+ 檔案，2026-09-20）
**K3 前提**：選項 C 的變體成立**條件是「僅一處引用」** → 實測結果**推翻該前提**

---

## 一、引用面全表（36 處）

| 檔案 | 行 | 引用性質 | 改名影響 |
|------|---|---------|---------|
| `src/middleware.ts` | 100-108 | **301 重定向映射**（`premium-business-cards` 等 8 行 → greeting-cards） | 🔴 **§0.0 明文禁止改動** |
| `src/app/[locale]/business-card-printing/page.tsx` | 212, 282 | 名片落地頁 + GA `source="business-cards-hero"` | 🔴 名片展示層（§0.0 待裁決項） |
| `src/components/category/CategoryProductCard.tsx` | 22 | categorySlug → 漸層樣式映射 | ⚠️ 改 key 該類別失去 fallback 樣式 |
| `src/components/category/CategorySidebar.tsx` | 22 | categorySlug → 圖示 | ⚠️ 同上 |
| `src/components/ProductTabs.tsx` | 26, 170, 197 | 特點／行業／賣點三組映射 | ⚠️ 同上 |
| `src/components/category/CategorySharpHooks.tsx` | 245 | 場景資料（K3 欲改的目標） | ✓ 目標處 |
| `src/components/home/HotProducts.tsx` | 78 | 熱銷圖示映射 | ⚠️ 同上 |
| `src/components/ProductCard.tsx` | 22 | categorySlug → 樣式 | ⚠️ 同上 |
| `src/components/product/ProductCard.tsx` | 42 | categorySlug → 樣式 | ⚠️ 同上 |
| `src/data/category-seo-content.ts` | 2550 | **`'business-cards': '賀卡印刷'`（已是別名映射）** | ⚠️ 已存在對映，改名須同步 |
| `src/data/category-seo-content.ts` | 3933 | 註解（提及 §11 約束） | ✓ 無影響 |
| `src/lib/h1-builder.ts` | 81, 98, 189, 230 | H1 fallback／單位／最小量映射 4 處 | ⚠️ 名稱錯位風險 |
| `src/lib/pricing.ts` | 640 | 計價幣別映射 | ⚠️ 同上 |
| `src/lib/quote-engine/engine.ts` | 35-36 | 註解（公式已斷註冊） | ✓ 無影響 |
| `src/lib/quote-engine/formulas/business-cards.ts` | 198 | 公式本體 `slug: 'business-cards'` | ⚠️ deprecated 但保留 |
| `src/lib/quote-engine/__tests__/*` | 4 檔 | 測試 import 該公式 | ⚠️ 改 slug 需同步測試 |

**統計**：需同步修改的**非註解引用約 28 處 / 12 個檔案**。

---

## 二、★ 推翻 K3 前提的兩項發現

### 2.1 `business-cards` 不是「孤兒 key」，而是**全站 fallback/別名**

它**沒有對應 SKU**，但**每個 UI 元件都為它準備了映射**（8 處 categorySlug → 樣式/圖示）。
`category-seo-content.ts:2550` 更已明確寫著：

```
'business-cards': { 'zh-hk': '賀卡印刷', en: 'Greeting Cards', ja: 'グリーティングカード印刷' }
```

⇒ 這不是「漏納入」，而是**系統性地保留了一個指向賀卡的別名 key**。
改名為 `greeting-cards` 不是「歸位」，而是**拆除別名層**——影響面遠大於 K3 預期。

### 2.2 兩處引用落在 §0.0 明令禁區

AGENTS.md §0.0 執行細則原文禁止：
> 「不得修改 middleware 301 映射」「不得刪除或改寫既有賀卡資產」

實測：
- `middleware.ts` L100-108 = **8 行 301 重定向映射**（舊名片 URL → 賀卡）→ 屬明令禁區
- `app/[locale]/business-card-printing/page.tsx` = **名片落地頁仍在**，且屬 §0.0「展示層是否恢復/新建名片頁面」的**待裁決項**

⇒ 選項 C（改名）**無法在不觸禁區的前提下完成**。

---

## 三、結論與建議

**選項 C 的變體在「僅一處引用」的前提下成立；實測為 28 處 / 12 檔 + 2 處禁區 → 前提不成立。**

| 選項 | 可行性 | 評估 |
|------|-------|------|
| **A** 只修三場景 MOQ 為 10 | ✅ 可行 | 消除與賀卡真值的矛盾；不動任何 key；**零 §0.0 風險** |
| **B** A + 補齊 `CategoryIndustries` + 新增 2 處映射 | ⚠️ 可行 | 完成雙源一致；不動 `business-cards` key，故不觸禁區 |
| **C** A + key 改名為 `greeting-cards` | 🔴 **不建議** | 需動 28 處 / 12 檔，且牽涉 `middleware.ts` 301 與名片落地頁兩處禁區 |

**建議改採 B**：
1. 三場景 MOQ 對齊賀卡真值（10）
2. 補齊至 `CategoryIndustries`（key 保留 `business-cards`，與全站 8 處 UI 映射一致）
3. **新增** `SCENARIO_LINKS['business-cards']` 與 `SCENARIO_INDUSTRY_NAMES['business-cards']`
   （否則補齊後卡片仍取不到 href／行業名）
4. 於 SSoT 註解記錄「`business-cards` = 指向賀卡的別名 key（無 SKU）」，
   使語義錯配**被明文化**，而非靠改名消除

**為何 B 比 C 更符合 K3 的意圖**：K3 的根本關切是「資料模型與業務語義錯配」。
在改名成本極高且觸禁區的情況下，**以註解明文化別名關係**同樣可消除「誤解」，
且保留 §0.0 要求的既有資產與映射不動。

**§0.0 合規**：A/B 都只改 MOQ 數字與新增映射，不改 `middleware.ts`、不動名片落地頁、
不刪改賀卡資產 → 合規。

---

## 四、若 K3 仍決定執行 C（改名）的前置條件

1. 先取得 §0.0 的明確豁免（`middleware.ts` 301 映射 + 名片落地頁兩處）
2. 逐檔同步 28 處引用，並以「渲染等效性驗證」比對改名前後（8 處 UI 映射易漏）
3. `quote-engine/formulas/business-cards.ts` 的 slug 改名需同步 4 個測試檔
4. 建議作為**獨立一輪**，不與 MOQ 修正混批
