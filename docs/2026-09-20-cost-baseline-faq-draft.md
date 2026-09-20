# hk-cost-baseline-2026 三語 FAQ 追加草案（batch C 執行包）

**日期**：2026-09-20
**狀態**：草案待應用——**不動 src/**，應用前須滿足 §0.35.7 雙條件（① src/ 無 MM 且 staged 刪除=0 ② peer ≥15 min 無寫入）
**格式依據**：B3 五要件（SSoT §3.1 段 12，K3 2026-09-19 二次修訂）＋ `.hermes/_probe-pb/precheck-faq-format.mjs` 生產同源正則
**題量**：6 組（合規區間 5-8）；候選第 7 題（數碼 vs 柯式點揀）因數據僅有同業口徑、本站表格無直接對照，**捨棄**（§0.23 不進無來源數字）
**插入位置**（三語同）：`延伸閱讀 </ul>` 之後、文末 WhatsApp CTA `<p class="mt-6">` 之前，追加 `<h2>` + 6 組 FAQ
**附帶動作（獨立條目，與 FAQ 同批執行）**：剝離三語 content 開頭的內嵌 JSON-LD `<script>` 塊（索引 0 起至首個 `<h2 id="key-numbers">` 前）——B2 紅線（content 內嵌 inline JSON-LD = 重複渲染），page.tsx 已生成同族 schema，剝離零損失

---

## 一、zh-hk（粵語書面，對齊本文語域；量詞：張/本/個）

```html
<h2>常見問題（FAQ）</h2>
<p><strong>Q1: 網上參考價同正式報價點解會有出入？</strong><br/>A: 出入在於規格未對齊。本報告嘅 basePrice 係「起訂量＋入門規格」嘅下限，唔係平均價；同一 SKU 會隨紙張、尺寸同後加工喺報價帶內浮動，例如燙金卡每張 HK$1.80–3.20。正式報價按你實際規格逐項計，所以格價必須規格對齊先有意義。</p>
<p><strong>Q2: 想報價快又準，要預備咩資料？</strong><br/>A: 齊集 9 項資料就能最快攞到準確報價：品項同用途、成品尺寸、頁數（書冊類）、紙款克重、顏色（單色／四色／專色）、裝訂同加工、數量、交貨日期同地點、有冇現成印刷檔。資料越齊，報價越準，亦避免後期追加費用；亦可以直接用本站 30 秒 AI 報價試算。</p>
<p><strong>Q3: 起訂量 100 張係點嚟？可唔可以印少啲？</strong><br/>A: 100 張係攤薄製版成本嘅常見平衡點，唔係鐵律。日曆要 1,000 本先攤得開製版費；婚禮文具每張單價高，50 張起就得；日本同人 SKU 仲有 4–10 個起。想印少啲，揀單價高或數碼工藝嘅品類就得。</p>
<p><strong>Q4: 報價包唔包設計同打稿？</strong><br/>A: 唔包設計。本報告全部係出廠價，唔含設計服務同季節附加費；打稿方面，各產品頁口徑係提交檔案後 2 小時內免費數碼打稿，重要刊物建議先打稿再大批印刷，避免成批印錯。</p>
<p><strong>Q5: 運費同加急點計？</strong><br/>A: 表列價格係出廠價，DHL 或本地快遞運費另計。產品頁口徑：港九新界滿 HK$500 順豐免運，1–2 個工作天送達；跨境 DHL 全球 2–4 個工作天。加急訂單 24 小時打稿加 2 天生產，加收 20%。</p>
<p><strong>Q6: 環保紙會令成本升幾多？</strong><br/>A: 唔一定。FSC 認證牛皮紙袋同常規款同為每個 HK$3–8，下限零溢價；再生紙傳單約貴 52%（每張 HK$0.38 對 HK$0.18）；環保利是封約貴 73%（每個 HK$1.90 對 HK$1.10），但到高規格帶頂溢價收窄到約 8%。</p>
```

**數據來源逐題核對**：Q1＝本文「計算方法」段（basePrice 下限定義＋燙金卡帶）｜Q2＝行業通用清單（對標 hkdesignpro 同題，非價格聲明）｜Q3＝本文品類表（日曆 MOQ 1,000／婚禮 50／同人 4–10）＋「起訂量分佈」段｜Q4＝本文「適用範圍」段（不含設計服務）＋產品頁打稿口徑｜Q5＝本文「適用範圍」段（運費另計）＋產品頁運費/加急口徑｜Q6＝本文「FSC 與環保紙溢價」段四個數字全部直引

## 二、en（40–80 words/answer，answer-first）

```html
<h2>Frequently Asked Questions</h2>
<p><strong>Q1: Why does the online reference price differ from the formal quote?</strong><br/>A: The gap comes from unmatched specifications between the reference and the quote. Every basePrice in this report is a floor — the entry spec at MOQ, not an average. Each SKU floats within a price band as paper, size, and finishing change: foil-stamped cards, for example, span HK$1.80–3.20 each. A formal quote is calculated line by line against your actual specs, so always compare like with like.</p>
<p><strong>Q2: What should I prepare for a fast, accurate quote?</strong><br/>A: Prepare nine items for the fastest, most accurate quote: product type and use, finished size, page count (books), paper and gsm, colours (1C/4C/spot), binding and finishing, quantity, delivery date and location, and whether you have print-ready artwork. The more complete the brief, the fewer surprise surcharges later. You can also test instantly with our 30-second AI quote.</p>
<p><strong>Q3: Why is the MOQ 100 pieces? Can I print fewer?</strong><br/>A: 100 is the plate-cost break-even point, not a fixed rule. Calendars need 1,000 copies to absorb plate-making; wedding stationery starts at 50 because its higher unit price amortises faster; Japan-market doujin SKUs start at just 4–10. To print fewer, choose a high-unit-price or digital-print category.</p>
<p><strong>Q4: Does the quote include design and proofing?</strong><br/>A: No. Design services and seasonal surcharges are excluded from every price in this report. For proofs, the product-page standard is a free digital proof within 2 hours of file submission. For important publications, always proof before the full run to avoid reprinting the entire batch.</p>
<p><strong>Q5: How are shipping and rush fees calculated?</strong><br/>A: Listed prices are ex-works; DHL or local courier is billed separately. Product-page standard: free SF Express delivery within Hong Kong on orders over HK$500, arriving in 1–2 working days; worldwide DHL in 2–4 working days. Rush orders receive proofing within 24 hours plus 2 days of production at a 20% surcharge.</p>
<p><strong>Q6: How much more does eco paper cost?</strong><br/>A: Not always more. FSC-certified kraft paper bags match conventional bags at HK$3–8 each — zero premium at the floor. Recycled flyers cost about 52% more (HK$0.38 vs HK$0.18), and eco red packets about 73% more (HK$1.90 vs HK$1.10), though the premium narrows to roughly 8% at the top of the band.</p>
```

## 三、ja（です・ます調；量詞：枚/部/個，禁用「份」——65198c97 教訓）

```html
<h2>よくある質問（FAQ）</h2>
<p><strong>Q1: ネットの参考価格と正式見積もりが違うのはなぜ？</strong><br/>A: 仕様が揃っていないためです。本レポートの basePrice は MOQ・エントリー仕様時の下限であって平均値ではなく、用紙・サイズ・仕上げによって見積帯内に幅があります（箔押しカードは 1枚 HK$1.80–3.20）。正式見積もりは実仕様を1項目ずつ計算するため、比較は同じ仕様同士で行ってください。</p>
<p><strong>Q2: 早く正確な見積もりには何を準備する？</strong><br/>A: 9項目です。品目と用途、仕上がりサイズ、ページ数（冊子類）、用紙と坪量、色数（1色／4色／特色）、製本と加工、数量、納期と納品場所、印刷データの有無。資料が揃うほど見積もりは速く正確になり、後からの追加料金も減ります。30秒 AI 見積もりで即試算も可能です。</p>
<p><strong>Q3: MOQ はなぜ100枚？ もっと少なくてもいい？</strong><br/>A: 100枚は一般的な目安です。版代を回収できるバランス点で、絶対ルールではありません。カレンダーは製版費をまかなうため1,000部から、婚礼文具は単価が高いため50部から、日本向け同人SKUは4–10個から。少部数なら、単価の高い品類かデジタル印刷の品類を選んでください。</p>
<p><strong>Q4: 見積もりにデザイン・校正は含まれる？</strong><br/>A: デザイン・校正料は別です。本レポートの価格はすべて持出条件で、デザインサービスと季節サーチャージは含みません。校正は各製品ページの案内どおり、データ提出後2時間以内にデジタル無料校正があります。重要な出版物は、必ず本刷り前に校正を済ませてください。</p>
<p><strong>Q5: 送料と特急料金はどう計算される？</strong><br/>A: 送料は別途請求です。表記価格は持出条件で、DHL・地域宅配便は運賃がかかります。製品ページの案内では、香港市内は HK$500 以上で送料無料・1–2営業日、国際便 DHL は2–4営業日です。特急は24時間校正＋2日生産で、20%の追加料金がかかります。</p>
<p><strong>Q6: 環境配慮の紙はどれくらい高くなる？</strong><br/>A: 必ずしも高くなりません。FSC認証クラフト紙袋は従来品と同じ HK$3–8/個で、下限では差はゼロです。再生紙チラシは約52%増（HK$0.38 対 HK$0.18）、エコ紅包は約73%増（HK$1.90 対 HK$1.10）ですが、帯の上限では差は約8%に縮まります。</p>
```

---

## 四、應用與驗收清單（下一輪照做）

1. **前置**：查 `SESSION_LOCK.md` + `lane.lock`；雙條件判定（§0.35.7）；`git fetch origin main && git fetch origin_ssh main` 後確認積壓讀數
2. **應用腳本化**（禁手搓，SOP-5 精神）：寫 `scripts/apply-cost-baseline-faq.mjs`——對三語 JSON 做結構定位（非正則，避坑 12）：① 剝離 content 開頭內嵌 `<script>…</script>\n`（斷言：`content.indexOf('<script')===0`，剝離後以 `<h2 id="key-numbers">` 開頭）② 在 `延伸閱讀 </ul>` 與文末 CTA 之間插入 FAQ 塊（斷言：插入點唯一、FAQ 前 content 不含 `<strong>Q1:`）③ 前斷言（key 數不變/其他欄位不動）+ 後斷言（FAQ 組數=6、內嵌 @type=0、JSON.parse 通過）
3. **格式驗證**：`node .hermes/_probe-pb/precheck-faq-format.mjs`（內建 8 用例）＋生產正則對三語 FAQ 塊實解析（期望各 6 命中）
4. **門童**：blog-data JSON 嚴格校驗（門童 #15）→ 全量 pre-commit → push（§0.25 窗口）
5. **線上斷言（禁只 JSON.parse content，SSoT §3.2）**：部署後 `curl` 三語頁面，斷言生成區含 FAQPage 塊 + FAQ 可見 6 組；更新 `.hermes/reports/blog-12seg-checklist-*.json` 對應行
6. **同批攢 push**：與 set-e 7 處修復 + handoff 去重指引合 1 次 push（build quota）

## 五、本批不修（須另行授權）

- **段 3 問句式 H2 = 0/9**（本文 9 個 H2 全為陳述式，SSoT 段 3 要求問句式 >50%）——改寫 9 個 H2 = 內容 churn，比照 `poster-printing-guide` en/ja 前例，**待 K3 指令包授權**
- 字數：zh-hk 補 FAQ 後 ≈6,800+ 字符（過 2026Q3 floor 6,000）；ja ≈5,200 仍低於 floor，是否擴寫待 K3 裁
