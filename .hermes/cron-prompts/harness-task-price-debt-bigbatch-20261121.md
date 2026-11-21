# Harness 任務單（草稿 v1）：PRICE-DEBT-BIGBATCH-20261121 — rush-data 真值 + GUARD-DEBT 一次清

> 拍板：K3 2026-11-21 09:08「解凍 rush-data.ts 並連同 GUARD-DEBT（其他 SKU 價格舊值）一次過清」
> 狀態：**K3 2026-11-21 09:15 已批（D1=10張接 / D2=10本接 / D3=100接 / D4 准 / D5 准，「全部按這個統一」）→ 正式生效**
> 模式：Harness 只改檔 + 寫報告，不 git commit/push；host 複驗後統一提交（1 次 build）

## 一、K3 拍板定案（2026-11-21 09:15，「全部按這個統一」）

| # | 項 | K3 裁決 | 執行方向 |
|---|---|---|---|
| D1 | 證書 certificates MOQ | **10 張接**（比原聲稱 50 更低） | products.ts minQuantity 100→**10**；price-tables certificates 補 10 張檔位（參考 A2/same-day 的 configs 低檔建模法）；gen-price-data 再生成；全站聲稱統一改 10 張起 |
| D2 | 書籍 textbooks MOQ | **10 本接** | 同上方向：100→**10**，price-tables books 補 10 本檔，聲稱統一 10 本起 |
| D3 | 電子包裝盒 electronics-packaging-box MOQ | **100 接** | 同上方向：200→**100**，price-tables 補 100 檔，聲稱統一 100 起 |
| D4 | 紙袋 USD 越界 | 按匯率由 HKD 真值重算 | kraft/white-card 兩條 USD 由 HKD 帶出，guard WARN=0 |
| D5 | rush 價格表 | 逐格對照現行真值改齊 | 見 P1 第 2 條；不得新造檔位 |

## 二、執行包（按風險升序，全做）

### P0｜TSC-DEBT 死測試（零客戶影響，先清）
- `src/lib/quote-engine/__tests__/` 6 檔（search.regression / books.pricing / business-cards.pricing / debug-double / debug-pricing / e2e-verification）import 路徑懸空，54 個 tsc 錯。
- 修法：修 import 路徑（`'../../data/products'` → 正確相對或 `@/data/products`）；改完 `npx tsc --noEmit` 錯誤數應降至 0（或僅剩與本批無關者，逐條報告）。**不改測試斷言邏輯**。

### P1｜rush-data.ts 真值（K3 已拍板解凍，zh-hk 可見層）
檔：`src/components/services/rush-data.ts`（凍結 glob 之外，K3 2026-11-21 09:08 明確授權）
1. `faqs[0]`（即日印刷最快幾耐到）答案補：「急件適用：傳單 50–1000 張、小冊子 10–500 本、摺頁 50–500 份等，附加費另計。」——與 page.tsx JSON-LD（已上線口徑）逐字對齊。
2. `prices` 表 6 行按 D5 複驗改價；`畫冊印刷` 行 rush 檔補「（急件 10 本起）」級別註記（K3 今早：小冊子 10–500 本可走急件）。
3. `timeline` / `scenarios` / `metrics` / `trust` **不動**。
4. 連帶：`page.tsx` L183「最後更新：2026 年 8 月 26 日」→「2026 年 11 月 21 日」。
5. **紅線**：`Rush*.tsx` 8 組件仍凍結，不碰；rush-data.ts 是唯一寫入點（組件讀它，自動生效）。

### P2｜GUARD-DEBT 3 HARD —— 真值下調方向（D1-D3 K3 已裁「X 接」）
- **products.ts**：certificates minQuantity 100→10；textbooks 100→10；electronics-packaging-box 200→100。
- **price-tables 對應檔**（certificates/books/boxes 系）：補對應低檔（10 張／10 本／100）tier，建模法參考 11-20 A2/same-day 批次（configs[].tiers 或 currencyOverrides 先例，**照抄結構不創新**）；檔位單價無工廠數據時按相鄰檔等比外推並在報告標「modeled」。
- `node scripts/gen-price-data.mjs` 再生成；確認 `src/lib/price-data.generated.ts` 三 SKU 低檔出現。
- **聲稱統一**：grep 三 SKU 全部 MOQ 聲稱點（products-content.ts / sku-seo-data.ts / product-faqs.ts / RushDeliveryGrid 若在內），一律改齊新真值（10 張起／10 本起／100 起）；改前逐點列清單進報告。
- 完成後 `node scripts/guards/price-truth-guard.js` HARD=0 且三 SKU 無新 WARN。
- **消費方複查**（昨晚事故教訓）：改完跑 `npm run build` 前先 grep `desk.ts` / `price-tables.ts` 是否有按 slug 硬編碼這三 SKU 的 tiers 假設，有則一併兼容。

### P3｜GUARD-DEBT 2 WARN（D4）
- `src/lib/pricing.ts` 兩條 bags USD 改由 HKD 真值帶出（參考 11-20 A2/same-day 的 currencyOverrides 修法）；`node scripts/gen-price-data.mjs` 再生成；guard WARN=0。

## 三、鐵律

1. 不編造價格/MOQ：所有新值必須來自 price-tables / products.ts / K3 拍板，改動逐條列 before→after。
2. title 一律不動（凍結槽）；不碰名片/賀卡資產、middleware 301、blog-data。
3. zh-hk 繁體、en/ja 沿用站內既有風格。
4. **推送前必跑四項**（昨晚事故教訓）：`node scripts/check-encoding.js --fix` → `node scripts/check-content-guard.js` → `npx tsc --noEmit`（P0 後應 0 錯）→ `npm run build`（必跑）。任一紅即停，報告如實記 FAILED。
5. 不 commit/push。

## 四、報告

- 路徑：`.hermes/logs/2026-11-21-PRICE-DEBT-BIGBATCH.md`
- 首段 `VERDICT / CONSUMED / DELIVERED / NEXT`；其後 D1-D5 逐項執行對照、四項檢查 exit code、guard 複跑前後對比、殘留清單。

## 五、host 複驗清單

1. `git diff --stat` 範圍 = P0-P3 涉入檔，無越界。
2. 獨立複跑四項檢查 + price-truth-guard（HARD=0 WARN=0）。
3. push 後線上抽驗：rush 頁可見 FAQ Q1、價格表、證書/書籍/電子盒三 PDP 的 MOQ 聲稱。
