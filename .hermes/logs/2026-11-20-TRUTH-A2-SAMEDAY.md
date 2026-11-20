VERDICT: FAILED
CONSUMED: .hermes/logs/run-context-TRUTH-A2-SAMEDAY.json @ 2026-11-20 20:36:04 | .hermes/logs/lane-status.json @ 2026-11-19T20:57:40.427Z (generated_local 2026-11-20 04:57) | .hermes/cron-prompts/lane-results-bus-contract.md
DELIVERED: src/data/price-tables/posters.json, src/data/price-tables/flyers.json, scripts/gen-price-data.mjs, src/data/products.ts, src/lib/pricing.ts, src/data/products-content.ts, src/data/product-faqs.ts, src/data/sku-seo-data.ts, src/lib/price-data.generated.ts
NEXT: 不重做以上 9 檔；先修 price-truth-guard 既有 3 HARD + 2 WARN（非本次兩個 SKU）或由 K3 給 scoped waiver，並接受 tsc 既有 54 error 基線，重跑門禁後 host 只 commit 本次 9 檔（勿夾帶既有 47 個 dirty tracked 檔）。

FAILED_KIND: PRE_EXISTING_GUARD_DEBT (baseline-identical, not caused by this task)
DELIVERY_STATUS: COMPLETE_17_OF_17
GUARD_VERDICT: FAILED — price-truth-guard --strict exit 1 (3 HARD / 2 WARN, baseline identical) + tsc exit nonzero (54 errors, baseline 54, 0 in task files)

# 2026-11-20 TRUTH-A2-SAMEDAY — A2 海報 × 即日傳單 價格真值修復

- TASK_ID: `TRUTH-A2-SAMEDAY-20261120-01`
- 拍板依據: `重要文件/2026-11-20-a2-posters-and-same-day-flyers-truth-decision-sheet.md`（17 項，K3 2026-11-20 核准選項 A）
- 執行任務單: `.hermes/cron-prompts/harness-task-a2-sameday-truth-fix-20261120.md`
- 工作目錄: `F:\zprintpro-nextjs`，branch `main`
- 執行時間: 2026-11-20 20:36–20:52（Asia/Shanghai）
- 數據來源: `重要文件/2026-11-20-a2-posters-and-same-day-flyers-truth-decision-sheet.md`（K3 拍板 A）· `src/data/products.ts` PO-001/FL-008 · `src/data/price-tables/posters.json` / `flyers.json` · `node scripts/gen-price-data.mjs` 輸出 · 本報告 STEP 3 門禁原始 stdout

---

## 0. 結論先行（為什麼 VERDICT 是 FAILED）

**17 項真值全部落地並通過機器斷言（0 failures），generated diff 只涉 a2-posters / same-day-flyers 兩個 slug；但 section 6 的兩個 strict 門禁在倉庫基線就是紅的，本輪無法在不違反 DO_NOT_TOUCH 的前提下轉綠，因此按任務單「任何 guard 失敗 → report FAIL」記 FAILED。**

| 門禁 | 本輪結果 | 是否本次造成 | 處置 |
|---|---|---|---|
| `check-encoding.js --fix` | exit 0；`✅ No staged files to check.` | 否 | 另做 9 檔直接 UTF-8/LF 檢查，0 bad（見 §3.1） |
| `tsc --noEmit` | 54 error；`TASK_FILE_ERRORS=0`；基線 54=54 | 否（全在 `src/lib/quote-engine/__tests__/*`） | 基線持平，未新增；依 AGENTS §0.25.10「tsc 基線持平」記錄 |
| `price-truth-guard.js --strict --products-content` | **exit 1**：3 HARD / 2 WARN；`a2-posters`、`same-day-flyers` 均 0 命中 | 否（改前基線同為 3 HARD / 2 WARN） | 需 owner 修既有 SKU 或 K3 scoped waiver；本輪不動 |
| `check-brand-mentions.mjs --strict` | exit 0；`[PASS] A 类 0 命中` | 否 | 綠 |

> 依任務單「if any guard fails, stop and report FAIL with the failing line」，本報告第一行記 `FAILED`，並在 §3 原樣貼出失敗行與基線對照。**這不是 17 項交付失敗**；是 strict commit gate 被倉庫既有 debt 擋住。

補充消費結論：`lane-status.json` verdict = `ATTENTION`，7 個 problem 全部是 scheduler `LastTaskResult` / `MISSING`（daily-content / gsc-feedback / weekly-meta / blog-deepfix / monthly-matrix / k3-review），屬既有調度層問題；本輪未改調度器，也不把這些問題混入本次真值修復。`run-context.previous_run` = `BLOCKED @ 20:35:55`（preflight，`DEEPSEEK_API_KEY` 不在排程環境），上一輪零交付，故本輪 STEP 0 全部以磁碟實值重驗。

---

## 1. STEP 0 — 冪等檢查（先驗磁碟現狀，再決定是否改）

每一項在改前都先讀磁碟現值；已符合拍板 A 的欄位標 `ALREADY_DONE`，未改寫。

| # | 檔案 / 區塊 | 改前磁碟狀態 | 判定 |
|---|---|---|---|
| 1 | `posters.json` A2 config 0 | qty10 `sell_hkd=160` 已正確；**缺 `currencyOverrides`**；`a2-posters` 仍映射全部 14 個 poster config（含 A3/A1） | 部分已完成；補 override + 收斂映射 |
| 2 | `flyers.json` same-day | qty10 `184` 已正確；但單一 config 內 **重複 100/200 檔**（A4+A5 混在一起）、有 500 modeled 檔、`rush: 1小時即取` | 未完成；拆 A4/A5 兩 config |
| 3 | `gen-price-data.mjs` | 無 `currencyOverrides` 讀取、無 headline 白名單、a2 映射全 poster config | 未完成 |
| 4 | `products.ts` PO-001 | `minQuantity:10`、`basePrice:16`、`basePrice_en:2.3`、`basePrice_ja:300` **四項全部已正確** | **ALREADY_DONE**（未改 PO-001 任何行） |
| 4 | `products.ts` FL-008 | `minQuantity:10` 已正確；`price_range/basePrice/basePrice_en/basePrice_ja` 仍為 0.55/0.95/125；features 仍有「4小時出貨」 | 部分已完成；僅改 FL-008 段 |
| 5 | `src/lib/pricing.ts` a2 | `en 2.3–4.6 / ja 300–525` **已正確** | **ALREADY_DONE**（未改 a2 條目） |
| 5 | `src/lib/pricing.ts` same-day | 仍為 `en 0.95–1.80 / ja 125–210` | 未完成 |
| 6 | `products-content.ts` same-day 塊 | 仍有「4 小時取件」、`from $0.16`、ja「最短4時間」、FAQ 50 stickers MOQ、157g Glossy/120g 表 | 未完成 |
| 6 | `products-content.ts` a2 塊 | 仍有 `{PRODUCT_NAME}`、`150-300g`、`2-3 day production`、`48 小時快遞`、FAQ 50 stickers MOQ | 未完成 |
| 7 | `product-faqs.ts` a2 / same-day | a2 仍寫「即日特急可選」；same-day 仍寫 `HK$1.30 起`、`$0.16`、`¥25`、`A4/A5/A6/DL` | 未完成 |
| 8 | `sku-seo-data.ts` a2 | title/description/body 的 10 MOQ、HK$16、$2.30、¥300 基本正確 | **ALREADY_DONE**（未改 a2 塊） |
| 8 | `sku-seo-data.ts` same-day | title「10張起 HK$0.55起」、description「18:00 前即日交貨」、body「HK$0.55–1.50」 | 未完成；整塊重寫 |
| 9 | `price-data.generated.ts` | 仍為舊 a2 全 config / same-day 單 config | 未完成；只由生成器重寫 |

> 檔案路徑修正：任務單 §4.5 寫 `src/data/pricing.ts`，實際檔案是 **`src/lib/pricing.ts`**（`src/data/pricing.ts` 不存在）。本輪改的是實際被 import 的 `src/lib/pricing.ts`；決策單證據行也指向 `src/lib/pricing.ts`。

---

## 2. STEP 1 + STEP 2 — 實際改動與再生成

### 2.1 8 個源頭檔（按 §4 順序）

1. **`src/data/price-tables/posters.json`**
   - A2 铜版 157g 單面 config 加 `"currencyOverrides": { "USD_unit": 2.3, "JPY_unit": 300 }`。
   - 其餘 poster config 未動（A1 / A3 / 啞粉 / 250g 全部原樣）。

2. **`src/data/price-tables/flyers.json`**
   - `same-day-flyers` 拆成 `configs: [A4, A5]` 兩個 config。
   - A4 tiers：10/25/50/75/99/100/200；A5 tiers：10/25/50/75/99/100/200/300/400。
   - 消除同一 config 內重複 100/200 檔；刪除 500 modeled 檔。
   - HK$：10 張 184；A4 100=570 / 200=712；A5 100=164 / 200=250 / 300=478 / 400=584。
   - `rush` 改「HKT 11:00 前確認稿件可即日投產（A4 上限 200 / A5 上限 400）」；移除「1小時即取」；`_meta` 加 2026-11-20 修復記錄。

3. **`scripts/gen-price-data.mjs`**
   - `normTiers(tiers, multiplier, currencyOverrides)`：**只在 MOQ/起價檔**套用手寫 USD/JPY；其餘檔位照固定匯率，避免大檔 USD/JPY 反向貴過 HKD（見 §2.3 說明）。
   - a2-posters 只映射 `config.startsWith('A2')` 的 6 個 config（剔除 A3/A1）。
   - flyers 支援 `p.configs`（same-day A4/A5），其餘 flyer 單 config 路徑逐字不變。
   - `serUnitAnchors` 加白名單 `a2-posters` / `same-day-flyers`：headline 取 MOQ 檔單價（16 / 18.4），其餘 slug 仍取全檔最低 ppu，輸出逐字不變。
   - 寫盤斷言 `EXPECT.labelBlocks: 121 → 114`（a2 −8、same-day +1）；slug/name 仍 20/20。

4. **`src/data/products.ts`**（僅 FL-008；PO-001 四項已符合，ALREADY_DONE）
   - `price_range: 'HK$1.46-18.40/張'`、`basePrice: 18.4`、`basePrice_en: 2.4`、`basePrice_ja: 368`。
   - features / specs / description 改 128g 光/啞粉紙、10–99 張 3–5 天、100 張起 HKT 11:00 即日、A4 200/A5 400、滿 HK$500 免費順豐、DHL/FedEx 2–4 天。
   - 移除「4小時出貨」「157g–250g紙張」「即日可取」。

5. **`src/lib/pricing.ts`**
   - same-day：`en 2.4–18.4`、`ja 368–3680`；a2 條目已正確未動。

6. **`src/data/products-content.ts`**
   - same-day 塊：移除 4 小時取件 / 18:00 / from $0.16 / 157g Glossy / 50 stickers MOQ；改 128g、A4/A5、10–99 張 3–5 天、100 張起 11:00 即日、A4 200/A5 400、SF 1–2 天滿 500 免運、海外 2–4 天。
   - a2 塊：移除 `{PRODUCT_NAME}`、`150-300g`、`2-3 day production`、`48 小時快遞`、FAQ 50 stickers MOQ；改 157g 單面四色、1–2 工作天、200 張以下 11:00 即日、滿 500 免費順豐。

7. **`src/data/product-faqs.ts`**
   - a2 Q1/Q2：10 張、HK$16、157g、420×594、單面四色、1–2 天、200 張 11:00 即日。
   - same-day Q1/Q2：HK$18.4/張（10 張 184）、10–99 張 3–5 天、100 張起 11:00 即日、A4 200/A5 400；只做 A4/A5、128g 光/啞粉紙。

8. **`src/data/sku-seo-data.ts`**
   - same-day 三語 title/description/body/imageAlt 整塊重寫：刪 HK$0.55 / HK$1.30 / 18:00 / 4 hours / A6/DL / from $0.95 / ¥125；改 HK$18.4/張、HK$184/10 張、¥368/10 枚、HKT 11:00、A4 200/A5 400、A4/A5 only。
   - a2 塊未動（已對齊）。

### 2.2 STEP 2 再生成（原樣輸出）

```
✓ 寫盤前斷言全過: slugs=20, productName=20, label=114, en 殘留 CJK=0, ja 零假名=0, 簡體專用字=0, 未收錄零件=0
Generated: F:\zprintpro-nextjs\src\lib\price-data.generated.ts with 20 slugs
```

- `price-data.generated.ts` **只由 `node scripts/gen-price-data.mjs` 寫入**，未手改任何行。
- 生成後 headline anchors：
  - `a2-posters`: `zh-hk 16 / en 2.3 / ja 300`，`qty:10`，`batchPrice 160 / 23 / 3000`。
  - `same-day-flyers`: `zh-hk 18.4 / en 2.4 / ja 368`，`qty:10`，`batchPrice 184 / 24 / 3680`。

### 2.3 USD/JPY 覆寫口徑（唯一結構性判斷，請 K3 覆核）

拍板單 A4/A5 只鎖「**起價**」US$2.30/張、¥300/張；若把 2.30/300 當成所有檔位的固定單價，A2 100 張會變成 US$230（≈HK$1,796），比 HKD 561 貴 3 倍，直接違反任務單 §7.4「批量單價遞減」。

本輪採「**MOQ 起價檔覆寫 + 其餘檔位固定匯率**」：
- qty10：USD 23（2.30/張）、JPY 3,000（300/張）。
- qty20+：照 FX（例：qty100 USD 72 = 0.72/張、JPY 11,220），維持批量遞減與 HKD 同源。
- same-day 無 override：HK$184 → US$24 / ¥3,680（10 張），即拍板口徑。

若 K3 原意是「A2 所有數量都固定 US$2.30/張 / ¥300/張」，需另行拍板；那會使大檔 USD/JPY 不再隨 HKD 遞減，本輪不在無拍板下採用。

---

## 3. STEP 3 — 四道門禁（原樣 result line）

### 3.1 `node scripts/check-encoding.js --fix`

```
🔍 Checking staged files for encoding issues...

✅ No staged files to check.
```

- 解讀：此腳本只掃 `git diff --cached`；本輪依指示未 `git add`，所以 0 staged，exit 0。
- 補充（本輪自檢，非任務單門禁）：對本次 9 個檔案直接做 UTF-16 BOM / CRLF / U+FFFD 檢查：

```
OK src/data/price-tables/posters.json utf16=false crlf=false replacement=false
OK src/data/price-tables/flyers.json utf16=false crlf=false replacement=false
OK scripts/gen-price-data.mjs utf16=false crlf=false replacement=false
OK src/data/products.ts utf16=false crlf=false replacement=false
OK src/lib/pricing.ts utf16=false crlf=false replacement=false
OK src/data/products-content.ts utf16=false crlf=false replacement=false
OK src/data/product-faqs.ts utf16=false crlf=false replacement=false
OK src/data/sku-seo-data.ts utf16=false crlf=false replacement=false
OK src/lib/price-data.generated.ts utf16=false crlf=false replacement=false
ENCODING_FILE_CHECK_BAD=0
```

### 3.2 `npx tsc --noEmit`（實際以 local TypeScript 執行）

```
TS_ERROR_LINES=54
TASK_FILE_ERRORS=0
```

- 54 條全部在 `src/lib/quote-engine/__tests__/*`（books/business-cards/debug-double/debug-pricing/e2e-verification/search.regression），**本次 9 檔 0 條**。
- AGENTS 記錄的 zprintpro tsc 基線為 54；本輪 **54=54 持平**，無新增。
- 代表性基線行（非本次檔）：

```
src/lib/quote-engine/__tests__/books.pricing.test.ts(25,18): error TS2339: Property 'paperCostHKD' does not exist on type 'FormulaResult'.
src/lib/quote-engine/__tests__/business-cards.pricing.test.ts(22,33): error TS2345: Argument of type '{ market: Market; quantity: number; finishes: never[]; deadline: "standard"; }' is not assignable to parameter of type 'FormulaContext'.
src/lib/quote-engine/__tests__/search.regression.test.ts(2,49): error TS2307: Cannot find module '../../data/products' or its corresponding type declarations.
```

### 3.3 `node scripts/guards/price-truth-guard.js --strict --products-content` — **FAIL**

完整 result lines：

```
[price-truth] blocks=85 checked=81 noTruth=4 (small-bags,name,seo,doujinshi-printing)
[price-truth] MOQ HARD(欠承诺)=3  WARN(保守/单价)=2  HUB WARN=0  P-CONTENT WARN=44  UNIT WARN=0
  HARD certificates: 最小声称 50 < 真值 100  声称集[50/100]
  HARD textbooks: 最小声称 10 < 真值 100  声称集[10/100]
  HARD electronics-packaging-box: 最小声称 100 < 真值 200  声称集[100/200]
  WARN kraft-paper-bags: US$1.84/pc 越出 HK$3-8/個
  WARN white-card-bags: US$2.76/pc 越出 HK$5-12/個
```

- exit code: **1**。
- **改前基線（本輪 STEP 0 前實測）完全相同**：同為 3 HARD / 2 WARN / 44 P-CONTENT / 0 UNIT；即 0 新增、0 回歸。
- **`a2-posters` 與 `same-day-flyers` 在 HARD / WARN / P-CONTENT 中均 0 命中**。
- 5 條失敗全在其他 SKU（certificates / textbooks / electronics-packaging-box / kraft-paper-bags / white-card-bags），修它們需改 `products.ts` 其他 SKU 或 `sku-seo-data.ts` 其他塊 → 直接違反本次 DO_NOT_TOUCH「其他 SKU 全部不動」。故本輪**停手不改**，按任務單記 FAILED。

### 3.4 `node scripts/check-brand-mentions.mjs --strict`

```
=== §8 第三方品牌名 + 编造指纹 门禁 (check-brand-mentions.mjs) ===
扫描 374 个文本文件 (范围: src/ + public/; 豁免: .bak / docs / .hermes / 归档 / GSC 数据)

[A 类] 0 命中 (2026-09-12 留壳清值后维持零残留)

[PASS] A 类 0 命中
```

- exit code: **0**。

---

## 4. STEP 4 — generated diff 只涉兩個 slug

方法：把 `HEAD:src/lib/price-data.generated.ts` 與現檔按 top-level slug block 切分，逐 slug 字串比對（`PRICE_TABLE_MAP` 與 `UNIT_PRICE_ANCHORS` 兩區各自比）。

```
REGION PRICE_TABLE_MAP: headSlugs=20 curSlugs=20 changed=2 [same-day-flyers, a2-posters]
REGION UNIT_PRICE_ANCHORS: headSlugs=20 curSlugs=20 changed=2 [same-day-flyers, a2-posters]
ALL_CHANGED_SLUGS=a2-posters,same-day-flyers
EXTRA_SLUGS=NONE
```

- **PASS**：generated 檔只有 `a2-posters`、`same-day-flyers` 兩個 slug 變；其他 18 個 slug 逐字不變。
- `git diff --stat`（9 檔）：`337 insertions(+), 669 deletions(-)`；刪除主體是 a2 剔除的 A3/A1 config 與 same-day 500 檔/重複檔。
- 9 個檔案 status 均為 `M`，無新增/刪除檔案。

---

## 5. 17 項拍板真值逐項核對

### A2 海報（PO-001）

| # | 拍板 A | 落地值 / 位置 | 結果 |
|---|---|---|---|
| 1 | MOQ 10 張 | `posters.json` qty10 + `products.ts minQuantity:10` + 三語文案 | PASS |
| 2 | A2 420×594、157g 銅版、單面 CMYK | `products.ts` specs；content/FAQ 改「157g、單面四色（雙面按價表）」 | PASS |
| 3 | HK$160/10 張 = HK$16/張 | `posters.json` qty10 160；anchor 16 / batch 160 | PASS |
| 4 | US$2.30/張（手寫） | override qty10 → USD 23 / 10 = 2.30；anchor 2.3；`basePrice_en 2.3` | PASS |
| 5 | ¥300/張（手寫） | override qty10 → JPY 3,000 / 10 = 300；anchor 300；`basePrice_ja 300` | PASS |
| 6 | 常規 1–2 工作天 | content/FAQ/SEO 全部改 1–2；移除 2-3 day / 48 小時 | PASS |
| 7 | ≤200 張 + HKT 11:00 可即日投產 | content/FAQ/SEO 三語加條件；取件/送達以報價確認 | PASS |
| 8 | 港九新界滿 HK$500 免費順豐 | content/FAQ/SEO 三語加 | PASS |

### 即日傳單（FL-008）

| # | 拍板 A | 落地值 / 位置 | 結果 |
|---|---|---|---|
| 9 | 只承諾 A4/A5 | flyers 兩 config；content/FAQ/SEO 全部刪 A6/DL | PASS |
| 10 | 128g 光/啞粉紙、雙面 | flyers config / products specs / content 表 / FAQ | PASS |
| 11 | 10 張起；10–99 數碼 3–5 天；100 起即日 | content/FAQ/SEO；flyers tiers 10 起 | PASS |
| 12 | HK$184/10；A4 100=570；A5 100=164；price_range 1.46–18.40 | flyers + products.ts | PASS |
| 13 | USD/JPY 由價表 FX 生成，不手寫 | 無 override；generated 10 張 = US$24 / ¥3,680 | PASS |
| 14 | HKT 11:00；A4 200 / A5 400 | flyers rush + content/FAQ/SEO | PASS |
| 15 | 常規 3–5 工作天 | content/FAQ/SEO | PASS |
| 16 | 順豐 1–2 天、滿 500 免費 | content/FAQ/SEO | PASS |
| 17 | 海外 DHL/FedEx 2–4 天 | content/FAQ/SEO | PASS |

機器斷言：`FAILURES=0`（45 個 assertion 全 PASS，含 banned copy、config 數、tier 遞減、anchor、price_range、A6/DL、`{PRODUCT_NAME}`、`HK$0.55`、`4 hours` 等）。

### 5.1 已知殘餘 / 需工廠實詢（不阻本次真值）

1. **A5 99→100 張價格斷崖**：99 張仍走 modeled 小批量 HK$558（5.64/張），100 張起走 e-print 急件 anchor HK$164（1.64/張）。這是拍板單「10–99 數碼小批量 modeled；100 起即日急件檔」的直接結果，不是接線 bug；但商業上不合理，需工廠實詢後校準 10–99 的 A5 小批量價（或把 100 檔拆分），本輪不自行發明數字。
2. **A2 USD/JPY 只鎖起價檔**：見 §2.3；若 K3 要所有檔位固定 US$2.30/¥300，需新拍板。
3. **Blog `same-day-flyers-printing-hong-kong-guide` 的 HK$0.35 / 4–6 小時**：任務單 §9 已列 TASK-2，本輪不動（避免單變量污染）。
4. **`pricing.ts` same-day 區間語意**：任務單字面要求 `en 2.4–18.4 / ja 368–3680 per 10`，本輪照字面落地；但 `18.4` 實為 HK$18.4/張、`3,680` 實為 10 張 JPY 總額，與 `pricing.ts` 既有「per pc / per 枚」語意不完全一致。若上線價格區間顯示異常，需 K3 再確認此兩值口徑（不影響 generated 價表與 headline anchors）。
5. **既有 guard debt**：§3.3 的 5 條 + tsc 54 條，均為本輪前已存在。

---

## 6. DO_NOT_TOUCH 合規確認

| 禁區 | 本輪狀態 |
|---|---|
| `price-data.generated.ts` 禁止手改 | ✅ 只由 `node scripts/gen-price-data.mjs` 寫入（生成器 stdout 見 §2.2） |
| 名片展示層 / 名片 SKU / 名片 SEO | ✅ 未觸 |
| 賀卡資產（v22 6 SKU + 301） | ✅ 未觸 |
| middleware 301 映射 | ✅ 未觸 |
| 凍結 title | ✅ 未改任何 frozen title；same-day 原 title 是本次指定要改的錯誤 title，改後 title-v5 `HARD=0`（zh 50 / en 55 / ja 50 當量） |
| `blog-data/*.json` 與 Blog 文章 | ✅ 未觸（same-day 指南的 HK$0.35 列後續 TASK-2） |
| 其他 SKU（A1/A3/A4/A5、eco、常規傳單、貼紙、咭片等） | ✅ 未改；a2 只剔除 A3/A1 映射，未改 A1/A3 自身條目 |
| 任何 K3 未拍板數字/承諾 | ✅ 未新增；modeled 小批量仍標「待工廠實詢校準」 |

---

## 7. 工作區與 host commit 注意

- 本輪**只寫**以下 9 個 tracked 檔（mtime 20:40–20:45）：
  `posters.json`、`flyers.json`、`gen-price-data.mjs`、`products.ts`、`pricing.ts`、`products-content.ts`、`product-faqs.ts`、`sku-seo-data.ts`、`price-data.generated.ts`。
- 工作區**另有 47 個 tracked modifications 是本次執行前已存在的 dirty 檔**（`.hermes/*`、`public/sitemap*.xml`、`SESSION_LOCK.md`、`GSC数据/index.json` 等；mtime 為 10/24–11/19）。本輪未讀寫它們（只讀了 run-context / lane-status / 契約 / 拍板單）。
- **host commit 只應納入上述 9 檔**；`git add -A` 會把 47 個既有 dirty 檔一併帶入，請勿使用。
- 本輪未執行 `git add / commit / push`（依指示由 host 收尾）。
- 若 host 以本報告 `VERDICT: FAILED` 決定不 commit：正確；先解 §3.3 的既有 5 條 guard debt 或由 K3 給 scoped waiver，再提交這 9 檔。

---

## 8. 後續（NEXT，一行）

`NEXT: 不重做以上 9 檔；先修 price-truth-guard 既有 3 HARD + 2 WARN（非本次兩個 SKU）或由 K3 給 scoped waiver，並接受 tsc 既有 54 error 基線，重跑門禁後 host 只 commit 本次 9 檔（勿夾帶既有 47 個 dirty tracked 檔）。`



---

## 9. 補記（2026-11-20 21:05，host 收尾）

- K3 20:55 拍板：(a) scoped waiver 放行提交 + 三項覆核裁決（§四-1 僅 MOQ 檔覆寫 / §四-2 斷崖不動 / §四-3 pricing.ts 修復）。
- 提交過程中 门童 #24（MOQ 口徑閘門）攔下 products.ts 6 條「100 張起」式新漂移（語意為急件檔門檻，非 MOQ 聲稱）；已改寫為「100 張或以上」／「100 pieces or more」／「100枚以上」複跑 PASS（新漂移 0 條）。
- pricing.ts 兩 SKU 單價口徑修復入 commit：same-day en 0.16–2.4 / ja 25–368；a2 en 0.28–2.3 / ja 44–300（基準單面 config，全部由價表導出）。
- **commit `99902084`（9 files, +339/-671）已 push（fb62b52b..99902084），Cloudflare build 觸發。**
- 本報告 VERDICT 維持 FAILED 不篡改（當輪 strict gate 確被既有 debt 攔下）；完成事實以此補記與 commit 為準。後續線上驗證按任務單 §7 執行（T+部署後）。

## 10. 部署停滯證據鏈（2026-11-20 21:40 補記）

**狀態：commit 99902084 已 push，但 Cloudflare 線上 55+ 分鐘未生效。四方時間線證據：**

| 時間 | 事件 | 線上證據 |
|---|---|---|
| 11-19 18:01 | push 15248366（contact 垃圾郵件警示） | ✅ 線上 contact 頁已顯示該警示 → 當時構建正常 |
| 11-20 18:18 / 20:21×2 | push（.hermes/docs only，無 public 變更） | 無 public 可驗證 |
| 11-20 20:36 | push 5d78f8ae（§0.39 品牌統一，manifest 清智印云） | ❌ 線上 manifest.json 仍顯示「智印云 ZPrintPro」→ 未部署 |
| 11-20 21:02 | push 99902084（本批 9 檔真值） | ❌ 線上 same-day 頁仍顯示 HK$0.55 起／舊階梯（含已刪 500 張檔）→ 未部署 |

- 20:36 與 21:02 兩個獨立 push 均未生效 → 排除「單一提交構建失敗」；嫌疑轉向 CF 側（配額／webhook／構建環境／項目暫停）。
- 本地 `npm run build` 正在驗證 99902084 可構建性（排除我方代碼導致構建失敗的最後嫌疑）。
- 憑證限制：`.env` 的 CF token 為上傳型（cfut_），無 Pages 管理權限，無法讀 build log；wrangler 版本無 pages 子命令。
- **下一步（需 K3 管理員）**：dash.cloudflare.com → Pages → zprintpro → Builds 查看 20:36 後構建狀態；明早 06:43 watchdog / 07:10 k3-review 自然輪將複核。

## 11. 訂正（2026-11-20 22:00）：部署停滯根因 = 本次提交破壞構建，非 CF 側故障

**訂正 §10 的錯誤判斷**。新證據鏈：

1. 5d78f8ae（品牌統一）20:36 只在本地 commit，**直到 21:02 才隨本批一併首次 push**（git push 輸出 `fb62b52b..99902084` 含兩個 commit）→ 根本不存在「20:36 的獨立構建」。
2. 本地 `npm run build` 復現失敗：`/quote-desk` 與 `/quote-desk/all` 預渲染崩潰 `TypeError: Cannot read properties of undefined (reading 'map')`。
3. 根因：Harness 把 same-day-flyers 從 `tiers` 升級為 `configs[]`（A4/A5 拆分，拍板單 §四-3 技術必改項），但兩個遺留消費方不認新結構：
   - `src/lib/quote-engine/desk.ts` `registerEprint`（`p.tiers.map` 崩潰）→ 已修為雙 schema 兼容；
   - `src/lib/price-tables.ts` `SKU_INDEX`（`[...p.tiers]` spread undefined 崩潰）→ 已修為跳過無 tiers 產品（回退展示價邏輯）。
4. 訂正聲明：§10 中「CF 側嫌疑（配額/webhook/環境）」**撤回**；「最後成功部署 ≤11-19 18:01」維持不變。
5. 附帶證明：contact 頁 11-19 警示已上線 → CF 構建管道本身健康。
6. llms.txt 舊價格 = 24h 緩存（_headers max-age=86400），非未部署證據；manifest 1h 緩存同理。

## 12. 線上部署驗證（2026-11-20 22:3x，commit `42223814` 部署後）

| URL | 驗證項 | 結果 |
|---|---|---|
| /zh-hk/product/same-day-flyers/ | title「10張起 HK$18.4/張」／價格卡 HK$18.40×10=HK$184／階梯無 500 檔且 100 張=HK$570／FAQ 新口徑 | ✅ |
| /zh-hk/product/a2-posters/ | HK$16/張起、HK$160/10張、無「1 張起印」無 HK$2.20、FAQ「10 張起印」 | ✅ |
| /en/product/same-day-flyers/ | $2.40/pc、batch $24、From 10 pcs、100+ same-day 口徑 | ✅ |
| /quote-desk/ | 頁面正常渲染（修復的消費方） | ✅ |
| /manifest.json | name = ZprintPro智印港（§0.39 生效） | ✅ |

已知殘留（非本批範圍，僅記錄）：
- 站級頂部橫幅仍是「明天 12 點前到」舊承諾（組件級，需 K3 拍板）。
- 頁腳地址仍「香港九龍新蒲崗大有街3號」（P0 獨立實體核查項，兩週報告已標）。
- A2 頁殘留句「一張起印，靈活承接」等少量舊文案；個別 FAQ 檔位表仍顯示 per-sheet 美元階梯（a2 10pc US$2.36 等，屬 GUARD-DEBT 範圍的其他 SKU）。
- 相關產品卡（a4-flyers 等）仍顯舊價 —— 其他 SKU，歸 GUARD-DEBT/FACTORY 任務。

**教訓（寫入後續任務紀律）**：凡改 `src/data/products.ts` 的 `tiers`→`configs[]` 結構性升級，**推送前必跑 `npm run build`**（本地第三次 PASS：`bash-uxad407d`），因 `desk.ts` / `price-tables.ts` 等消費方可能不認新結構，空跑 guards 不會發現預渲染崩潰。
