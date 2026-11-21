# RUSH-PAGE-TRUTH-20261121 — rush 服務頁集群真值收尾

VERDICT: FAILED — 4 檔代碼改動已全部落盤（4/4），但 §3.6 四項驗證閘門在本會話**完全無法執行**（`pwsh` 被 sandbox 封鎖，任務環境明令禁止重試），因此沒有 exit code、沒有 build 證據，不能宣稱 PASS。
CONSUMED: `.hermes/cron-prompts/harness-task-rush-page-truth-20261121.md` 全文；K3 2026-11-21 08:48 三問三答真值；A/B/C/D 四檔原文全文；`scripts/check-content-guard.js`（只讀，確認規則與 exit 行為）。
DELIVERED: A `page.tsx`、B `RushDeliveryGrid.tsx`、C `RushDeliveryFAQ.tsx`、D `WhyChooseUs.tsx` 共 4 檔已改；本報告。**0 commit / 0 push**。
NEXT: host（Kimi）必須依 §五複驗清單獨立跑 `check-encoding` / `check-content-guard` / `tsc` / `build` + `git diff --stat`；四項全綠後再由 host 統一提交。另需 K3 決定是否另開批次補 `src/components/services/rush-data.ts` 的可見 FAQ（見 §4 殘留）。

數據來源:
- K3 2026-11-21 08:48 拍板（任務單 §一逐字要點）
- `.hermes/cron-prompts/harness-task-rush-page-truth-20261121.md`（2026-11-21）
- 四檔磁盤原文（本會話 Read 全文，2026-11-21）

---

## 0. 執行環境限制（先說清楚，不掩蓋）

本會話的 `pwsh` 工具被 sandbox 封鎖（任務環境明示：「the pwsh tool is blocked in this sandbox, do NOT retry it; use file tools and web tools only」）。
因此本報告**沒有**任何檢查命令的 exit code 可填 —— 不是 0，也不是失敗碼，而是 **NOT EXECUTED**。
我沒有用任何方式偽造 exit code、build 成功訊息或 `git diff --stat` 輸出。

已用文件工具完成的替代性靜態核對（**不能**替代 §3.6 四項閘門）：

| 靜態核對 | 結果 |
|---|---|
| C 檔新增 `ld+json` / schema script | 0 新增；命中的 2 處（L7、L100）均為改動前既有註釋 |
| C 檔 `%` | 僅 L29/L55/L81 既有「95% 準時率」，與附加費無關；本次未新增 % |
| `附加費/surcharge/割増` 緊鄰金額或百分比 | 0 命中（`src/**/*.tsx`） |
| 三檔品類檔位字串 | A/B/C 均含 `50–1000`／`10–500`／`50–500`；D 依任務 D 只補「條件級」措辭 |
| 截稿時間 | 本次新增文字只出現 18:00；`6PM`／`18時` 為站內既有本地化表述，未引入第二個截稿時間 |
| 改動檔案範圍 | 本會話 edit 工具僅操作 A/B/C/D 四檔，未碰 `products.ts` / `sku-seo-data.ts` / `products-content.ts` |

### 0.1 STEP 0 冪等檢查

改動前先以 grep 核對四檔：三檔品類字串 `50–1000`／`10–500`／`50–500` 在 A/B/C/D **0 命中**；B 的 H2 副標、D 的條件句亦不存在；A 的 meta/AEO/JSON-LD 新句全部不存在。故四檔所有改動均為**首次套用**，無「已存在→跳過」項。（page.tsx 原有 3 處「附加費」屬舊有 Q2 價格問答，不是本次新增，已保留未動。）

---

## 1. 逐檔 before → after

### A. `src/app/[locale]/services/rush-printing-delivery/page.tsx`

title 未改；相關服務列表（L186-190 區塊）未改；FAQ JSON-LD 其餘條目未改。

#### A1. zh-hk meta description（L43）

Before:
```
即日印刷・即日急件服務：每日 18:00 前落單並確認稿件，通宵印刷、順豐翌日中午前送達，宣傳單張／貼紙 10 張起印。免費 2 小時打稿，港九新界滿 HK$500 免費順豐。30 秒 AI 報價，WhatsApp 即日回覆。
```
After:
```
即日印刷・即日急件服務：每日 18:00 前落單並確認稿件，通宵印刷、順豐翌日中午前送達。急件適用：傳單 50–1000 張・小冊子 10–500 本・摺頁 50–500 份等（附加費）。宣傳單張／貼紙 10 張起印，免費 2 小時打稿。30 秒 AI 報價，WhatsApp 即日回覆。
```
說明：按要求在「順豐翌日中午前送達」後接三檔 + 附加費；為守住 zh ≈160 字量級，刪去「港九新界滿 HK$500 免費順豐」一句（該權益在頁面其他區塊仍在），現長度約 148 字。

#### A2. en meta description（L48）

Before:
```
Same-day & rush printing with 6PM cut-off, flyers & stickers from 10 pcs, delivered next-day 12pm. Flyers, posters, stickers, paper bags, booklets, roll-up banners in CMYK full color. WhatsApp 30-sec quote, 15-min email reply.
```
After:
```
Same-day & rush printing with 6PM cut-off, delivered next-day 12pm. Rush eligible: flyers 50–1000 pcs, booklets 10–500, folded leaflets 50–500 (surcharge). WhatsApp 30-sec quote, 15-min email reply.
```
說明：保留原句長度量級與 CTA；以三檔 + surcharge 取代原冗長品類枚舉（原句本身已超 160 字符，故不再疊加）。

#### A3. ja meta description（L53）

Before:
```
即日印刷・特急印刷 18:00 締切、チラシ・ステッカーは 10 枚〜、翌日 12 時前配送。ポスター・紙袋・冊子・ロールアップバナー、CMYK フルカラー防水。WhatsApp 30 秒見積もり、2 時間以内にメール返信。
```
After:
```
即日印刷・特急印刷 18:00 締切、翌日 12 時前配送。特急対象：チラシ 50–1000 枚・冊子 10–500 部・折りたたみリーフレット 50–500 部など（割増料金）。WhatsApp 30 秒見積もり、2 時間以内にメール返信。
```

#### A4. zh-hk AEO 藍底直接答案句（L154）

Before:
```
即日印刷：每日 18:00 前落單並確認稿件，即安排通宵印刷，順豐翌日中午 12:00 前送到，傳單／貼紙 10 張起印。
```
After:
```
即日印刷：每日 18:00 前落單並確認稿件，即安排通宵印刷，順豐翌日中午 12:00 前送到，傳單／貼紙 10 張起印。急件適用：傳單 50–1000 張、小冊子 10–500 本、摺頁 50–500 份等，附加費另計；包裝盒、紙袋等需後加工品類不適用。
```

#### A5. en AEO 答案句（L157）

Before:
```
Same-day printing: order before 6PM and confirm artwork, we print overnight and SF Express delivers before noon the next day. Flyers & stickers from 10 pcs.
```
After:
```
Same-day printing: order before 6PM and confirm artwork, we print overnight and SF Express delivers before noon the next day. Flyers & stickers from 10 pcs. Rush eligible: flyers 50–1000 pcs, booklets 10–500, folded leaflets 50–500 (surcharge). Packaging boxes and paper bags requiring post-press finishing are not eligible; confirm other items by quote.
```

#### A6. ja AEO 答案句（L156）

Before:
```
即日印刷：18:00 までにご注文・データ確認で徹夜印刷、SFで翌日12時前にお届け。チラシ・ステッカーは10枚〜。
```
After:
```
即日印刷：18:00 までにご注文・データ確認で徹夜印刷、SFで翌日12時前にお届け。チラシ・ステッカーは10枚〜。特急対象：チラシ 50–1000 枚・冊子 10–500 部・折りたたみリーフレット 50–500 部など（割増料金）。化粧箱・紙袋など後加工が必要な商品は対象外です。その他はお見積もりにてご確認ください。
```

#### A7. FAQ JSON-LD zh Q1「即日印刷最快幾耐到？」（L108）

Before:
```
每日 18:00 前落單並確認稿件，即安排通宵印刷，順豐翌日中午 12:00 前送到，亦支持順豐速遞上門。
```
After:
```
每日 18:00 前落單並確認稿件，即安排通宵印刷，順豐翌日中午 12:00 前送到，亦支持順豐速遞上門。急件適用：傳單 50–1000 張、小冊子 10–500 本、摺頁 50–500 份等，附加費另計。
```

#### A8. FAQ JSON-LD ja Q1「当日印刷の最速納期は？」（L122）

Before:
```
毎日18時までのご注文で徹夜印刷、SF翌朝12時前配送、提携先受取も対応。
```
After:
```
毎日18時までのご注文で徹夜印刷、SF翌朝12時前配送、提携先受取も対応。特急対象：チラシ 50–1000 枚・冊子 10–500 部・折りたたみリーフレット 50–500 部など（割増料金）。
```

---

### B. `src/components/sections/RushDeliveryGrid.tsx`

H2 文案（三語）逐字保留；卡片紅色徽章、卡片價格、SKU 資料一律未改。

#### B0. H2 間距 class（只改 className，不改文字）

Before: `className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8"`
After: `className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4"`

說明：為新增副標讓位，總垂直間距與原本相若；H2 文字 0 改動。

#### B1. H2 下新增 zh-hk 副標（L135-141）

Before: 無此副標（H2 後直接進 grid）。
After:
```
急件適用：宣傳單張 50–1000 張・畫冊 10–500 本・摺頁 50–500 份等｜18:00 截單・附加費・其餘品類以報價確認
```
樣式：`text-sm text-gray-500 mb-6 md:mb-8`。

#### B2. en 副標

After:
```
Rush eligible: flyers 50–1000 pcs · booklets 10–500 · folded leaflets 50–500 · 18:00 cut-off · surcharge · other items by quote
```

#### B3. ja 副標

After:
```
特急対象：チラシ 50–1000 枚・冊子 10–500 部・折りたたみリーフレット 50–500 部など｜18:00 締切・割増料金・その他はお見積もり
```

#### B4. 底部 ⚠️ 注意條（三語各補一句）

zh-hk Before:
```
包裝盒、紙袋、信封等需後工產品不適用隔夜達服務，常規交期2-5天。
```
zh-hk After:
```
包裝盒、紙袋、信封等需後工產品不適用隔夜達服務，常規交期2-5天。未列品類與數量檔以 WhatsApp 報價確認。
```

en Before:
```
Packaging boxes, paper bags, and envelopes require post-press finishing. Standard lead time: 2-5 days.
```
en After:
```
Packaging boxes, paper bags, and envelopes require post-press finishing. Standard lead time: 2-5 days. Items or quantities not listed: confirm by WhatsApp quote.
```

ja Before:
```
包装盒・紙袋・封筒などは後加工が必要なため、翌日配送対象外。標準納期：2-5日。
```
ja After:
```
包装盒・紙袋・封筒などは後加工が必要なため、翌日配送対象外。標準納期：2-5日。記載のない品目・数量は WhatsApp にてお見積もり確認をお願いいたします。
```

---

### C. `src/components/sections/RushDeliveryFAQ.tsx`

先 Read 全文（143 行）。未新增/刪除條目、未改陣列結構、未新增 `ld+json`（§3.6 門童 #30 紅線）。
本檔 zh 無字面「哪些產品可以即日」問句，但 Q1 答案正是「可即日品類」的無條件枚舉，故按「只改既有句子」處理；另 Q5 原文直接否認附加費（「不加收加急費」），與本次全集群附加費真值正面衝突，一併改正（超出明列 bullet 的部分在此披露，屬同一真值修正，未新增費率/金額）。

#### C1. zh-hk Q1 答案（L17）

Before:
```
每日18:00（週一至週五）前完成付款並確認稿件，即可安排通宵印刷。宣傳單張、海報、貼紙、畫冊與易拉寶均於翌日中午12點前送達。支持港鐵站交收及辦公室地址配送。
```
After:
```
每日18:00（週一至週五）前完成付款並確認稿件，即可安排通宵印刷。急件適用：傳單 50–1000 張、小冊子 10–500 本、摺頁 50–500 份等，附加費另計；海報、貼紙、易拉寶等其他品類以 WhatsApp 報價確認。支持港鐵站交收及辦公室地址配送。
```

#### C2. zh-hk Q5「隔夜達的價格會更貴嗎？」答案（L33）

Before:
```
印刷單價與常規訂單一致，不加收「加急費」。僅收取正常速遞費用：港鐵站交收免費，上門速遞九龍/港島HK$50起、新界HK$80起。
```
After:
```
即日急件優先排產會有附加費，實際差價視乎品類與數量；WhatsApp 30 秒報價最準。速遞費用另計：港鐵站交收免費，上門速遞九龍/港島HK$50起、新界HK$80起。
```
說明：HK$50/80 為原文既有速遞費，非附加費費率；本次未給附加費任何 % 或金額。

#### C3. en Q1 答案（L43）

Before:
```
Complete payment and artwork confirmation by 6PM (Mon-Fri) for overnight printing. All 6 rush SKUs arrive by 12PM next day.
```
After:
```
Complete payment and artwork confirmation by 6PM (Mon-Fri) for overnight printing. Rush-eligible items (flyers 50–1000 pcs, booklets 10–500, folded leaflets 50–500) arrive by 12PM next day; other items by WhatsApp quote.
```
說明：「All 6 rush SKUs」與三檔真值衝突，屬同一無條件泛化修正（與 ja L69 同型）。

#### C4. en Q5 答案（L59）

Before:
```
Print pricing is the same as standard orders. Only normal courier fees apply.
```
After:
```
Rush priority production carries a surcharge, depending on item and quantity; a 30-second WhatsApp quote confirms it. Courier fees are separate.
```

#### C5. ja Q1 答案（L69，任務明列）

Before:
```
平日18時までに入金・データ確認が完了したご注文を対象とします。全6商品とも翌日12時までに配達いたします。
```
After:
```
平日18時までに入金・データ確認が完了したご注文を対象とします。対象品類（チラシ 50–1000 枚・冊子 10–500 部・折りたたみリーフレット 50–500 部など）は翌日12時までにお届けします（割増料金）。
```

#### C6. ja Q5 答案（L85）

Before:
```
印刷単価は通常注文と同額です。配送料のみ別途発生いたします。
```
After:
```
特急は優先生産のため割増料金がかかります。差額は品目・数量により異なります。WhatsApp 30秒見積もりでご確認ください。配送料は別途です。
```

---

### D. `src/components/home/WhyChooseUs.tsx`

#### D1. ja momentDesc（L71，任務明列）

Before:
```
標準は3-5営業日で完成；即日印刷は18:00締切、翌日12時までにお届け。
```
After:
```
標準は3-5営業日で完成；即日印刷は18:00締切、翌日12時までにお届け（対象品目・数量条件あり・割増料金）。
```

#### D2. ja feature[0] description（L74，同檔同句重複）

Before:
```
標準 3-5 営業日；即日印刷：18:00 締切、翌日 12 時着
```
After:
```
標準 3-5 営業日；即日印刷：18:00 締切、翌日 12 時着（対象品目・数量条件あり・割増料金）
```

#### D3. zh-hk momentDesc（L24，對應句）

Before:
```
標準訂單 3-5 個工作天完成；即日急件 18:00 截單，翌日中午 12:00 前送達。
```
After:
```
標準訂單 3-5 個工作天完成；即日急件 18:00 截單，翌日中午 12:00 前送達（指定品類及數量適用，附加費另計）。
```

#### D4. zh-hk feature[0] description（L27）

Before:
```
標準訂單 3-5 個工作天完成；即日急件 18:00 截單，翌日中午 12:00 前送達
```
After:
```
標準訂單 3-5 個工作天完成；即日急件 18:00 截單，翌日中午 12:00 前送達（指定品類及數量適用，附加費另計）
```

#### D5. en momentDesc（L48，對應句）

Before:
```
Standard orders done in 3-5 business days; same-day rush: order by 6pm, delivered by noon next day.
```
After:
```
Standard orders done in 3-5 business days; same-day rush: order by 6pm, delivered by noon next day (selected items and quantities; surcharge applies).
```

#### D6. en feature[0] description（L51）

Before:
```
Standard 3-5 business days; same-day rush: order by 6pm, delivered by noon next day
```
After:
```
Standard 3-5 business days; same-day rush: order by 6pm, delivered by noon next day (selected items and quantities; surcharge applies)
```

說明：D 依任務 D 要求補「條件級」措辭，未在首頁卡重複三檔清單；三檔明細落在 A/B/C。

---

## 2. §3.6 四項檢查（全部 NOT EXECUTED）

| # | 命令 | exit code | 備註 |
|---|---|---|---|
| 1 | `node scripts/check-encoding.js --fix` | **NOT EXECUTED** | `pwsh` 被 sandbox 封鎖，環境明令禁止重試 |
| 2 | `node scripts/check-content-guard.js` | **NOT EXECUTED** | 同上；無 exit 0 證據 |
| 3 | `npx tsc --noEmit` | **NOT EXECUTED** | 同上；無 0 錯誤證據 |
| 4 | `npm run build` | **NOT EXECUTED** | 同上；預渲染未驗 |

**結論：§3.6「全過才准交報告」的門檻未達成，故 VERDICT = FAILED（驗證受阻，非代碼已證失敗）。**
本報告不聲稱任何一項 PASS；host 必須獨立複跑並以實際 exit code 覆寫本節。

已做的純文件靜態核對見 §0 表格（不構成上述四項的替代）。

---

## 3. `git diff --stat`（NOT EXECUTED）

命令：`git diff --stat`
結果：**NOT EXECUTED**（同上，無 shell）。因此無法貼出真實 stat 行。

可如實聲明的替代事實：
- 本會話 `edit` 工具只對以下 4 個絕對路徑做過寫入，無第五個路徑：
  1. `F:\zprintpro-nextjs\src\app\[locale]\services\rush-printing-delivery\page.tsx`
  2. `F:\zprintpro-nextjs\src\components\sections\RushDeliveryGrid.tsx`
  3. `F:\zprintpro-nextjs\src\components\sections\RushDeliveryFAQ.tsx`
  4. `F:\zprintpro-nextjs\src\components\home\WhyChooseUs.tsx`
- 未 touch `products.ts` / `sku-seo-data.ts` / `products-content.ts` / `src/services/rush/*` / `src/components/services/Rush*`。
- 未 git add / commit / push。

host 仍需以 `git diff --stat` 機器輸出為準；若出現第 5 個檔案，一律以 host 結果為準並視本報告範圍聲明失效。

---

## 4. 殘留清單

1. **驗證閘門未跑（最高優先）**：四項命令 0 執行、0 exit code。host 必須複跑；任何一項紅即整個任務 FAILED。
2. **可見 rush 頁 FAQ 與 JSON-LD 不同步**：`src/components/services/rush-data.ts` L38 的 Q1 仍是「…順豐翌日中午 12:00 前送到，亦支持港鐵站交收。」，未含三檔/附加費；`RushFaq.tsx` 為凍結資產（AGENTS §0.25.9.3 凍結 `src/components/services/Rush*`），且不在本任務 4 檔範圍，本會話未動。結果：頁面可見 FAQ 與 page.tsx 的 FAQ JSON-LD 措辭不一致。需 K3 另批才可改凍結檔。
3. **頁面「最後更新」仍為 2026 年 8 月 26 日**（page.tsx L183），不在任務範圍，未改。
4. **B/C 兩組件目前未見被引用**（`grep RushDeliveryFAQ|RushDeliveryGrid` 僅命中自身定義）：本次照任務單修改，但是否上線可見取決於 host 的掛載現狀；不影響 diff 範圍。
5. **未 commit / 未 push**：符合任務單 §3.7；工作區改動留給 host 複驗後統一提交。
6. **D 檔為條件級措辭**（「指定品類及數量」/「selected items and quantities」/「対象品目・数量条件」），未列三檔；此為任務 D 的「級別」要求，非遺漏。

---

## 5. 給 host 的複驗指令（建議順序）

```bash
cd /d F:\zprintpro-nextjs
node scripts/check-encoding.js --fix
node scripts/check-content-guard.js
npx tsc --noEmit
npm run build
git diff --stat
git diff -- src/app/[locale]/services/rush-printing-delivery/page.tsx src/components/sections/RushDeliveryGrid.tsx src/components/sections/RushDeliveryFAQ.tsx src/components/home/WhyChooseUs.tsx
```

驗收要點：
- diff 僅上述 4 檔；
- 三語只出現 18:00 一個截稿時間（6PM / 18時 為既有本地化表述）；
- 附加費 0 費率、0 金額；
- C 檔無新增 `ld+json`；
- `RushDeliveryGrid` 價格與紅色徽章未變；
- page title 未變。
