# Harness 任務單：RUSH-PAGE-TRUTH-20261121 — rush 服務頁集群真值收尾

> 拍板：K3 2026-11-21 08:48 三問三答（原話要點）+ 指示「就派 Harness 把 rush 服務頁集群一次性收尾」
> 登記：strategy-task-queue.json → RUSH-PAGE-18PM-CHANNEL-FACT-20261121（本任務單生效後轉 EXECUTING）
> 模式：與 harness-task-a2-sameday-truth-fix-20261120.md 同 —— Harness 只改檔 + 寫報告，**不 git commit/push**（host 複驗後統一提交）

## 一、K3 拍板真值（2026-11-21 08:48，逐字要點）

1. **18:00 急件通道仍實際運作**：每日 18:00 前落單並確認稿件 → 通宵印刷 → 順豐翌日中午 12:00 前送到（港九新界）。核心承諾**保留不改**。
2. **付費急件通道（有附加費，收費更好）**；可急作品類與數量檔（K3 原話）：
   - 傳單：**50–1000 張**可以走（「小單如 50 張傳單可以走」）
   - 小冊子：**10–500 本**可以走
   - 摺頁：**50–500** 可以走
   - 「等都是可以走的，這就是急客戶所需，幫客戶搶時間」——未列品類用「等／以報價確認」收口，**不得编造新品類或新數字**
3. **截稿時間以 18:00 為準**（全集群統一，不再出現第二個截稿時間）。

## 二、寫入範圍（4 檔，禁止越界）

### A. `src/app/[locale]/services/rush-printing-delivery/page.tsx`
- **title 不改**（「18:00 截單・翌日 12:00 送到」屬實）。
- **meta desc 三語**：各補急件適用檔位 + 附加費，控制在原有長度量級（zh ≤ ~160 字）。zh 參考改法：在「順豐翌日中午前送達」後接「急件適用：傳單 50–1000 張・小冊子 10–500 本・摺頁 50–500 份等（附加費）」；en/ja 同步本地化（en: `Rush eligible: flyers 50–1000 pcs, booklets 10–500, folded leaflets 50–500 (surcharge)`；ja 對應）。
- **AEO 答案塊**（generateServiceJsonLd 下方那個藍底直接答案句，三語）：句尾補「急件適用品類與數量檔以報價確認，附加費另計；包裝盒、紙袋等需後加工品類不適用」級別的條件（具體措辭三語本地化，zh 必含 傳單 50–1000／小冊子 10–500／摺頁 50–500 三檔）。
- **FAQ JSON-LD**（zh 6 條 / ja 6 條）：zh Q1「即日印刷最快幾耐到？」答案補三檔品類 + 附加費；ja 對應條同步；其餘條目不改。
- 相關服務列表（L186-190）：不改。

### B. `src/components/sections/RushDeliveryGrid.tsx`
- H2「今天下單，明天中午12點前收貨」**保留**（屬實）。
- H2 下方**新增一行三語副標**（ small, text-gray-500 級別）：zh「急件適用：宣傳單張 50–1000 張・畫冊 10–500 本・摺頁 50–500 份等｜18:00 截單・附加費・其餘品類以報價確認」；en/ja 本地化。
- 卡片紅色徽章「明天12:00前」**保留**；卡片價格（HK$0.25/張起等）**一律不改**——價格是其他 SKU 的 GUARD-DEBT 範圍，動了即越界。
- 底部 ⚠️ 注意條三語各補一句：「未列品類與數量檔以 WhatsApp 報價確認。」

### C. `src/components/sections/RushDeliveryFAQ.tsx`
- 先 Read 全文。zh FAQ 若有「哪些產品可以即日」類條目 → 補三檔品類 + 附加費；若無此條，不改結構、不新造條目（只改既有句子）。
- ja 條目中「全6商品とも翌日12時までに配達いたします」（L69 附近）屬無條件泛化 → 改為「対象品類（チラシ 50–1000 枚・冊子 10–500 部・折りたたみリーフレット 50–500 など）は翌日12時までにお届け」級別。
- **门童 #30 紅線**：此檔是 'use client' 組件，**嚴禁在其中新增/渲染 ld+json**（JSON-LD 只留在 page.tsx 服務端）。

### D. `src/components/home/WhyChooseUs.tsx`
- L71 附近 ja「即日印刷は18:00締切、翌日12時までにお届け。」：句尾補「（対象品類・数量檔あり・割増料金）」級別條件；同檔 zh/en 對應句若存在無條件泛化承諾，一併補條件；若本就帶條件則不動。

## 三、鐵律（違者作廢）

1. **不得編造**：附加費**沒有給具體費率/百分比**，全集群只寫「附加費／surcharge／割増料金」，不得出現 % 或金額。
2. 品類檔位只寫 K3 拍板三個（傳單 50–1000／小冊子 10–500／摺頁 50–500），其餘一律「等／以報價確認」。
3. 截稿時間只出現 **18:00**（HKT／當地時間表述沿用原文風格）。
4. 不改 title、不改任何 SKU 價格、不動 products.ts / sku-seo-data.ts / products-content.ts。
5. zh-hk 文案一律繁體；en/ja 禁機翻腔，沿用站內既有條目風格（參考同檔既有句式）。
6. **推送前必跑**（昨晚事故教訓，全過才准交報告）：
   - `node scripts/check-encoding.js --fix`
   - `node scripts/check-content-guard.js`（exit 0）
   - `npx tsc --noEmit`
   - `npm run build`（**必跑**——預渲染崩潰只有 build 能攔）
7. 不 git commit / push；完成後寫報告。

## 四、報告

- 路徑：`.hermes/logs/2026-11-21-RUSH-PAGE-TRUTH.md`
- 首段機器塊：`VERDICT / CONSUMED / DELIVERED / NEXT`，其後列：每檔每處修改 before→after 對照、四項檢查命令與 exit code、殘留清單。
- VERDICT 誠實記（guards 被既有 debt 攔就如實 FAILED 並列命中，不得隱瞞）。

## 五、host 複驗清單（Harness 做完後由 Kimi 執行）

1. `git diff` 範圍 = 上述 4 檔且僅此 4 檔。
2. 獨立複跑 guards + build。
3. 線上驗證（push 後）：/zh-hk/services/rush-printing-delivery/ 的 AEO 塊、FAQ、Grid 副標三處新檔位。
