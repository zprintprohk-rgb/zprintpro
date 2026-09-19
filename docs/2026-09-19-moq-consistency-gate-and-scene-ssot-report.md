# MOQ 口徑一致性：掃描器 · SSoT 驅動 · 門童 #22

**日期**：2026-09-19
**範圍**：全站 MOQ（最小起印量）文案口徑一致性 — 執行 K3 本輪指令第 4/5/6/7 項
**數據來源**：
- `src/data/products.ts` `minQuantity`（94 個產品 SKU，引擎實際輸入 = 本報告的**真值唯一定義**）
- 本輪新建掃描器實際執行輸出（`scripts/moq10-books-context-scan.ts`）
- 線上探針：`https://zprintpro.com/zh-hk/category/books/`（K3 指令起點）
- K3 2026-09-19 指令（本輪 7 項）
- 前序：`docs/2026-09-19-moq-10-paper-goods-execution-report.md`、`-wave2-roadmap-report.md`

---

## 一、本輪指令與交付對照

| # | K3 指令 | 交付 | 狀態 |
|---|---------|------|------|
| 1 | push `b591f700` 後重跑品類頁探針 | 查證：`origin/main` **已 = b591f700**，本地另領先 2 commit（`eb54c4fd`、`9f0d9545` 為他車道） | ✅ 無需再推 |
| 2 | 修騎馬釘品類頁「50 本起」殘留 | 騎馬釘 SKU `name/nameEn/nameJa/title_zh` + 三語描述 + features（100 → 10） | ✅ |
| 3 | 校園場景卡片改 per-SKU 真值（50/100/100/10/10） | SSoT 驅動渲染（見 §四） | ✅ |
| 4 | 建「品類頁 MOQ 渲染規則」呼叫 SSoT | `print-method-policy.ts` §D：`SCENE_MOQ_SOURCE` / `sceneMoqLabel()` / `withSceneMoq()` | ✅ |
| 5 | SEO 文案 MOQ 掃描 → push 前硬閘門 | **門童 #22**，已裝 `core.hooksPath=.githooks` | ✅ |
| 6 | `seo.ts` + `products.ts` 進口徑來源矩陣 | 見 §二 | ✅ |
| 7 | 品類頁 MOQ 一致性檢查（終結打地鼠） | `scripts/moq10-category-page-check.ts`（渲染層 5 面檢查） | ✅ |

---

## 二、口徑來源矩陣（MOQ 共有 7 層，已全部定位）

| 層 | 檔案／來源 | 角色 | 是否真值 | 本輪處理 |
|----|-----------|------|----------|----------|
| **L0** | `src/data/products.ts` `minQuantity` | **報價引擎輸入 = 唯一真值** | ✅ **真值** | 不動（94 SKU） |
| L1 | `src/data/products.ts` `name`/`description*`/`title_zh`/`features` | PDP SKU 文案 | 衍生 | ✅ 修 22 條 |
| L2 | `src/lib/seo.ts`（含 `CATEGORY_INDUSTRIES`） | 品類頁 meta/場景資料 | 衍生 | ✅ 掃描；`place-cards` 50 張已對齊 |
| L3 | `src/data/sku-seo-data.ts` | SKU SEO title/desc/body | 衍生 | ✅ 掃描（既有 55 條非本批正確） |
| L4 | `src/data/products-content.ts` | PDP 長文 HTML | 衍生 | ✅ 掃描 |
| L5 | `src/data/category-seo-content.ts` | 品類頁 SEO 段落/FAQ | 衍生 | ✅ 修 1 條（books 50→10） |
| L6 | `src/data/blog-data/*.json` | 部落格（跨品類） | 衍生 | ⚠️ **未納入閘門**（見 §七） |
| L7 | `src/data/category-conversion-blocks.ts` | 轉化區塊 | 衍生 | ⚠️ **未納入閘門**（見 §七） |

**關鍵架構事實**（本輪新發現）：
`CategoryIndustries.tsx` 與 `CategorySharpHooks.tsx` **各自維護一份相同場景資料**，
後者檔頭註解聲稱「复用 CategoryIndustries 的 categoryIndustryScenarios」但**實為複製**，
已實測漂移（同 `pet_food` 場景：一處 `10 張起印`、另一處 `From 50`）。
→ 兩處現已統一走 SSoT（§四），但**雙資料源本身仍是待收斂技術債**。

---

## 三、已修復漂移（30 條計畫 / 35 處取代）

**修法**：`scripts/moq10-repair-drift.ts` — 每條綁定「SKU 區塊 + 精確原文」，改前斷言 `hit==1`、改後斷言 `hit==0`，全批不符即中止（源於上輪「隨機替換污染紙袋」事故）。

### books 類（真值 10）
| SKU | 欄位 | 原 | 新 |
|-----|------|----|----|
| `catalog-printing` | title_zh / description(zh,en,ja,zh) | 50本起 / 50 本起印 / 100 MOQ / 100冊〜 | **10** |
| `catalog-printing` | features | 【1本起訂】 | 【10本起訂】 |
| `catalog-printing` | en FAQ | 100 pcs MOQ | 10 pcs MOQ |
| `saddle-stitch-booklets` | name/nameEn/nameJa/title_zh + 三語描述 + features | 100 本起 / 100 Copies MOQ / 100冊 | **10** |
| `perfect-bound-books` / `hardcover-books` / `spiral-notebooks` | description(三語) + features | 100 MOQ / 100冊〜 / 【1本起訂】 | **10** |
| `exercise-books` | en 描述 + features | 50-100 book MOQ / 【100本起訂】 | **10** |
| `school-flyers` | features | 【100本起訂】 | 【10本起訂】 |
| `graduation-yearbook` | en/ja 描述 | 100 MOQ / 100冊〜 | **50**（K3 校園裁決：只修矛盾不動真值） |
| `category-seo-content.ts` books FAQ | 小批量靈活化 | 50 本起 MOQ | 10 本起 MOQ |

### 貼紙／賀卡類（真值 10）
`foil-greeting-cards`、`waterproof-stickers`、`removable-stickers` 的 `title_zh`（100/50 → 10）；
`die-cut-stickers`、`foil-stickers` 的 en(`50 MOQ`)+ja(`50枚から`)；
`eco-paper-bags`(100 MOQ)、`thick-paper-flyers`(25→10 枚)、`eco-flyers`(50 MOQ) 的 en/ja。

### 婚宴／枱卡類（真值 50）
`wedding-place-cards`、`drink-tokens`、`escort-cards`、`name-tags-badges`、`cafe-table-cards`、
`wedding-thank-you-cards`、`wedding-program-cards`、`wedding-menu-cards`、`wedding-suite-bundle`
→ zh `100 張起印`／en `100 sets|sheets MOQ`／ja `100 枚から` 全部改 **50**。

**範圍紀律**：`certificates` / `textbooks` 的【100本起訂】真值確為 100 → **正確，不動**（K3 裁決）。

---

## 四、SSoT 驅動渲染（K3 第 3/4/6 項）

### 設計原則
真值**直接讀 `products.ts` 的 `minQuantity`，不另設平行對照表**（平行表正是漂移根源）。

### 新增 API（`src/data/print-method-policy.ts` §D）
```ts
SCENE_MOQ_SOURCE   // 場景 key → SKU slug（只註冊「本來就有起印量宣稱」的卡片）
sceneMoqLabel()    // 場景 key + locale → 「50 本起」/「From 50 copies」/「50冊から」
withSceneMoq()     // 替換卡片第三行；2 行文案不追加；複合句保留工藝與交期（SCENE_MOQ_AFFIX）
```

### 修正的真實矛盾
| 卡片 | 原宣稱 | SSoT 真值 | 修正後 |
|------|--------|-----------|--------|
| `graduation` 畢業紀念冊 | 100 本起（zh/en/ja） | **50** | 全彩內頁 · 50 本起 / Full-color · From 50 copies / フルカラー · 50冊から |
| `certificates` 獎狀證書 | 50 張起（zh/en/ja） | **100** | A4 尺寸 · 100 本起 / A4 size · From 100 copies / A4サイズ · 100冊から |
| `tutoring_textbook` 補習教材 | 50 本起（zh/en/ja） | **100** | 無線膠裝 · 100 本起 · 7 天交貨（保留工藝與交期） |

### 接入點（2 個組件 / 3 處）
- `CategoryIndustries.tsx`（2 處渲染迴圈）
- `CategorySharpHooks.tsx`（1 處）
- `CategoryProductCard.tsx`：**原本就已正確**使用 `getDisplayMinOrder`（無需改）

**驗證**：`scripts/moq10-verify-scene-moq.ts` → **PASS 15 / FAIL 0**
（含「前兩行不動」「原陣列不被就地修改」「2 行文案不追加」「未註冊場景回傳 null」）

---

## 五、門童 #22（K3 第 5 項）

- **編號**：現有最大為 `#21`（`rule-translation-guard`），故取 **#22**
- **位置**：`scripts/canonical/pre-commit` 步驟 `3.6`（品牌基線後、DoD 前）
- **安裝**：`core.hooksPath = .githooks` → 已安裝並驗證（`bash scripts/setup-hooks.sh`）
- **耗時**：實測 **0.8 秒** → 無條件執行，不需 conditional gating
- **判據**：任何 SKU 上下文中的起印量與 `products.ts minQuantity` 不符即 FAIL
- **防繞過設計**：已登錄「待 K3 裁決」項**不阻擋**（否則 24 條存量會鎖死全站 → 閘門必被繞過），
  只擋**未登錄的新漂移**；存量項一律顯示 `📋 已登錄`（**不是** ✓），避免被誤讀成「已修好」
- **現狀**：`[GATE] PASS — 🆕 新漂移 0 條（另有 24 條已登錄待裁決，不阻擋）`

---

## 六、待 K3 裁決（33 條，閘門已登錄、不阻擋）

| 類別 | 條數 | 矛盾 | 需裁決 |
|------|------|------|--------|
| **海報真值** | 4 | `a2-posters` 真值 100 但文案「10張起印」（`price-tables` 價階由 10 起）；`art-posters` 真值 100 但文案「1張起印」 | 以價格表還是 `minQuantity` 為真值？（A1 已定 1 張） |
| **品類級段落**（貼紙） | 9 | `category-seo-content.ts` 貼紙品類頁寫「50 個起印 / 50 張起訂 / 100 pcs MOQ」，貼紙真值已 10 | 文案是「50 張起（數碼）+ 1,000 張以上柯式更經濟」的**完整階梯**，改成 10 須同時確認柯式門檻措辭 |
| **features 口徑** | 6 | 利是封 `【500個起訂】` vs 真值 100 | 「柯式經濟量」是否應寫進 features？ |
| **features 口徑** | 6 | 月曆 `【500本起印】` vs 真值 1000 | 同上 |
| **features 口徑** | 5 | 餐牌 `【50本起訂】` vs 真值 100；且文案自相矛盾（「50本起訂」+「小批量數碼」） | 同上 |
| **title 矛盾** | 1 | `white-card-boxes` title「100個起印」vs 真值 500 | 改 title 還是改真值？ |

### 品類級盲區（本輪最重要的方法論發現）

`category-seo-content.ts` 的**品類級文案**（h2 / heading / paragraphs / buyersGuide / specs / FAQ）
**不含任何 SKU slug** → 掃描器原有的 SKU 歸屬判定會**整檔跳過** →
該檔永遠報 **0 命中**。而實測它有 9 處真實漂移。

**這是「0 命中 ≠ 乾淨」的典型案例**：若只信第一次的掃描結果，會誤判該檔沒問題。
修法：新增 `scanCategoryLevel()` 為**第二判定域**（以品類關鍵詞推導預期門檻，非 slug 歸屬），
並排除跨品類段落（如「同人誌 10 本起 / 貼紙 50 張起 / 壓克力 5 個起」一行列多品類者）。

---

## 七、未納入閘門的層（已知缺口，建議下一輪）

| 缺口 | 說明 | 風險 |
|------|------|------|
| `blog-data/*.json` | 跨品類噪音大（一篇可涉多品類），需逐篇判斷 | 中 |
| `category-conversion-blocks.ts` | 含「MOQ 低至 100 張，部分款式 50 張起」等表述 | 中 |
| `seo.ts` `CATEGORY_INDUSTRIES` | 品類頁場景資料（非 SKU 縮排結構），需 category-slug 歸屬判定 | 中 |
| `CategorySharpHooks` 雙資料源 | 與 `CategoryIndustries` 重複維護同一場景資料 | **高**（結構性漂移源） |
| **品類級段落其餘品類** | `scanCategoryLevel()` 目前只登錄 stickers；其他品類（月曆/餐牌/信封/包裝盒/紙袋）尚未建目標表 | **高** |

> ✅ 已補：`category-seo-content.ts` 品類級段落（本輪新增 `scanCategoryLevel()` 第二判定域）

---

## 八、指標踩坑記錄（5 次，全部是**指標本身錯**而非結論錯）

本輪掃描器建置過程中 **5 次計數／判定失誤**，全部在「下結論前」被雙方法復算或形狀斷言攔下：

| # | 錯誤結論 | 真相 | 根因 |
|---|----------|------|------|
| 1 | 「只有 5 條漂移」 | 實際 76 條 | `slug:` 未加字邊界 → 誤匹配 `category_slug:` → 真值表混入分類名 → `truth.get('books')===undefined` → **整段靜默跳過** |
| 2 | 「真值表 99 SKU」 | 94 產品 + 16 分類 | `CategoryDef` 陣列（縮排 2）混入產品 slug（縮排 4） |
| 3 | 「雙方法不一致（5 vs 121）」 | 定義域不同，假紅 | 方法 1 只數特定樣式、方法 2 數全部樣式 → 對帳必須**逐樣式同定義域** |
| 4 | 「5 個 SKU 缺 minQuantity」 | 94 個全都有 | 斷言寫成「全檔 minQuantity 行數 == 產品 slug 行數」，未考慮 `japan-doujin` **嵌套子商品**（無頂層 slug） |
| 5 | 「`ja_枚から` 是誤配」 | 全部是真實日文 MOQ | 對樣式語義理解不足；掃描器只看行首 110 字，而真相在行內 700+ 字元處（zh/en/ja 三語擠一行） |

**固化為機制**（不再依賴記性）：
- `assertShape()` 形狀斷言 — 真值表 == 產品 slug 行 == minQuantity 行；區塊內多值須在白名單
- `independentByStyle()` 雙方法復算 — 逐樣式同定義域 grep 對帳
- `nestedSubProductRanges()` — 排除無頂層 slug 的嵌套子商品（`japan-doujin` 5 個子商品）
- 命中上下文改取**命中處前後文**，不再取行首（坑 5 的直接修法）

---

## 九、驗證證據

| 檢查 | 指令 | 結果 |
|------|------|------|
| 來源層掃描 + 閘門 | `npx tsx scripts/moq10-books-context-scan.ts --gate` | ✅ PASS（🆕 0 / 已登錄 33） |
| 品類頁渲染層（5 面） | `npx tsx scripts/moq10-category-page-check.ts` | ✅ PASS 32 / FAIL 0 |
| 場景 SSoT | `npx tsx scripts/moq10-verify-scene-moq.ts` | ✅ PASS 15 / FAIL 0 |
| 本批殘留 | `npx tsx scripts/moq10-verify-residual-moq.ts` | ✅ 本批範圍無殘留（exit 0） |
| TypeScript | `npx tsc --noEmit` | ✅ 54（基線 54，持平）；改動檔案 0 錯誤 |
| 反審門童（既有） | `node scripts/check-regression-guard.js --commit` | ✅ 🔴0 🟠0 🟡0 |
| 品牌基線 | `node scripts/check-brand-baseline.mjs` | ✅ PASS（431→311，未新增） |

**未完成驗證**：線上探針（需 push 部署後執行）— 建議驗 `/zh-hk/category/educational/` 確認
畢業紀念冊顯示 50 本起、獎狀證書顯示 100 本起。
