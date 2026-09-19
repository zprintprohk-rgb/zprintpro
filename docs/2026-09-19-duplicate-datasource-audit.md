# 重複資料源盤點（K3 2026-09-19 第三項 · 收斂前必要輸入）

**日期**：2026-09-19
**目的**：K3 判「雙資料源」為比 33 條待裁決更嚴重的架構風險，並建議「立即收斂為單一來源」。
本盤點是收斂的**前置輸入**——先確認全站有哪些重複源、分歧程度如何，再決定收斂方向。

**數據來源**：
- 掃描器：`.hermes/logs/_find-duplicate-datasources.mjs`（175 檔 → 150 個資料常數 → 40 組高重疊候選）
- 等價性驗證：`.hermes/logs/_verify-datasource-equivalence.mjs`
- `git show` 各檔 import 段實測

---

## 一、掃描方法（含一次假陽性教訓）

**首版**：直接比對「物件常數的頂層 key 集合」→ 命中 **1098 組**，全部是假陽性：
站上每個 UI 字典都是 `{ 'zh-hk': …, en: …, ja: … }`，彼此 Jaccard 恆為 1.0。

**修法**：
1. 識別「語系鍵」（`zh-hk`/`en`/`ja`/…）並排除；
2. 兩邊都只有語系鍵時，改比**內層鍵**（語系字典第二層的 key 名）才算真重複；
3. 其餘用「非語系鍵」的 Jaccard。

→ 1098 組收斂到 **40 組**。（此教訓與 `METRIC_INTEGRITY_FIVE_TRAPS` 同源：**先用壞指標跑，會被假陽性淹沒**。）

---

## 二、核心發現（K3 指出的那一個）

### 2.1 `categoryIndustryScenarios` 雙副本 — **確認成立**

| 項目 | 值 |
|------|-----|
| 副本 A | `src/components/category/CategoryIndustries.tsx` (L43, 13 類別) |
| 副本 B | `src/components/category/CategorySharpHooks.tsx` (L22, 16 類別) |
| B 的檔頭註解 | 「数据: 复用 CategoryIndustries 的 categoryIndustryScenarios 前 3 个 Tier A」 |
| B 的實際 import | 只有 `@/lib/seo` 與 `@/data/print-method-policy` — **沒有 import CategoryIndustries** |
| 判定 | **註解聲稱复用，實為複製** → K3 所述風險成立 |

**為什麼不能直接改 import（等價性驗證結果）**：

`CategorySharpHooks` 用 `CATEGORY_INDUSTRIES[slug][locale][idx]` 取行業名，`idx` 來自**它自己那份**
場景物件的陣列順序。若只換資料源而不對齊順序 → **行業名與文案錯配**（比數字錯更嚴重）。

實測 **6 個可比類別中 4 個不一致**：

| 類別 | SharpHooks | CategoryIndustries | 分歧性質 |
|------|-----------|-------------------|----------|
| `stickers` | pet_food, beauty, ecommerce | pet_food, **pharma**, beauty | 順序 + tier B 混入 front |
| `posters` | retail, exhibition, **restaurant** | retail, exhibition, **property** | **第 3 條內容不同** |
| `banners` | exhibition, outdoor, mall | **trade_show, outdoor_ad, auto_showroom** | **key 完全不同** |
| `envelopes` | corporate, finance, school | **corp_business, finance_mail, school_notice** | key 命名分歧 |
| `menus` | restaurant, cafe, bar | restaurant, cafe, bar | ✓ 一致 |
| `packaging` | beauty, ecommerce, tea_beverage | beauty, ecommerce, tea_beverage | ✓ 一致 |

另：`business-cards` 為 SharpHooks 獨有類別（Industries 無）——孤兒資料。

---

## 三、其他確認為「完全重複」的常量（40 組候選中的高信度項）

| 常量 | 重複檔案 | 說明 |
|------|---------|------|
| `categoryFallbacks` | `components/category/CategoryProductCard.tsx`<br>`components/product/ProductCard.tsx`<br>`components/ProductCard.tsx` | **13 keys 三方完全相同**（Jaccard 1.00）→ 典型可收斂 |
| `categoryIndustryScenarios` | `components/category/CategoryIndustries.tsx`<br>`components/category/CategorySharpHooks.tsx` | 見 §二 |
| `categoryIndustryScenarios`(A) | `src/lib/seo.ts::CATEGORY_INDUSTRIES` | 13 共同鍵（seo.ts 多 3 個語系鍵）→ **同一資料的兩種表達** |

---

## 四、建議（需 K3 選一個方向，我不擅自裁決客戶可見映射）

**方向 A（推薦 · 最保守）**：以 `CategoryIndustries` 為權威，但**先對齊** `CategorySharpHooks` 的
差異項（stickers 排序、posters 第 3 條、banners/envelopes key 命名），確認每類別前 3 條不變後再改 import。
→ 優點：不改變任何客戶可見內容；缺點：需逐類別確認 4 個分歧項。

**方向 B**：以 `CategorySharpHooks` 為權威（其註解自稱复用者），反向覆蓋 Industries。
→ 風險：Industries 有 5 條而 SharpHooks 只有 3 條，會**丟失 tier B 場景**。

**方向 C**：只收斂「完全無分歧」的類別（`menus` / `packaging` 等），分歧項掛待辦。
→ 優點：零風險；缺點：雙源並存期延長，漂移風險仍在。

**另建議（與方向無關）**：`categoryFallbacks` 三方重複可**立即收斂**（完全同構，無分歧）
到單一來源（建議放 `src/data/`），風險接近 0。

---

## 五、門童化評估

K3 建議「在門童中新增檢查：任何聲稱『复用』但實際複製的資料源，應在 push 前被攔下」。

**評估結論：暫不固化為硬門童**，理由：
1. 首版偵測誤報率極高（1098 組假陽性）→ 硬門童會被繞過或長期紅燈；
2. 「聲稱复用」是**自然語言註解**，無法可靠機器判定（同義詞多）；
3. 本輪已把可執行的部分做成**盤點腳本**（`_find-duplicate-datasources.mjs`），
   可作為「改動架構時的複查工具」，而非每次 push 的硬閘門。

**建議替代**：改為在 `error-patterns.md` 登錄規則（若 K3 同意），
要求「新增資料源前先跑盤點腳本」，比硬攔更可持續。
