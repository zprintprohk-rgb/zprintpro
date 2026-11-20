#!/usr/bin/env python3
"""
zprintpro-nextjs daily content evolve (2026-07-16)
3 blogs x 3 locales = 9 content blocks
- Q-001: 餐廳開業傳單 (a4-flyers, 餐飲外賣)
- Q-002: 化妝品包裝盒 (gift-boxes, 美妝護膚)
- Q-003: 寵物食品貼紙 (waterproof-stickers, 寵物)
Path: src/data/blog-data/<locale>.json (R6 §1 key path)
"""
import json
from pathlib import Path

BASE = Path(r'F:\zprintpro-nextjs')
BLOG_DIR = BASE / 'src' / 'data' / 'blog-data'
PAGE_TSX = BASE / 'src' / 'app' / '[locale]' / 'blog' / '[slug]' / 'page.tsx'
BLOG_POSTS_TS = BASE / 'src' / 'data' / 'blog-posts.ts'
PRODUCTS_TS = BASE / 'src' / 'data' / 'products.ts'
MATRIX_JSON = BASE / '.hermes' / 'industry-keyword-matrix.json'

TODAY = '2026-07-16'

# ============================================================
# Content data (3 blogs x 3 locales) - 9 段结构 (引子/行業概況/材質工藝/設計細節/選購決策/FAQ×4/CTA)
# ============================================================

# ---------- Q-001: 餐廳開業傳單 ----------
Q001 = {
    'slug': 'restaurant-opening-flyer-printing-guide',
    'meta': {
        'date': TODAY,
        'category': '餐飲外賣',
    },
    'zh-hk': {
        'title': '餐廳開業傳單印刷指南 · 香港餐飲旺季速遞方案 | 智印雲 ZprintPro',
        'description': '香港新餐廳開業如何用 A4 傳單吸客？本文整理旺季速遞、紙張選擇、單／雙面印刷、摺疊款實戰策略，附 4 條餐飲東主常見 FAQ，協助茶餐廳／私房菜／外賣小店精準觸及街坊與上班族。',
        'content': '''## 為什麼香港新餐廳開業總愛印傳單？

香港餐飲業競爭激烈，每季新開的餐廳多達數百間。從觀塘工廠區到旺角街市，從將軍澳新盤到荃灣屋苑商場，業主落旺宣傳費預算通常只有數千元，傳單仍然係最直接觸及街坊的工具。一張設計到位的 A4 傳單，配合順豐即日／隔日速遞到 18 區店舖，可以喺開業首週就建立街坊認知。

本文集中講解傳單印刷嘅 5 大決策：紙張克重、單／雙面、摺疊款、起印量、速遞安排，並整理 4 條餐飲東主最常問嘅 FAQ。

## 香港餐飲旺季 2026 概況

2026 年下半年，香港餐飲旺季集中喺 8 月暑假、10 月國慶黃金周、12 月聖誕除夕，以及農曆年前後嘅團年飯檔期。新餐廳通常提前 4-6 週開始派傳單，務求喺旺季首日已經有熟客口碑。旺季期間順豐／嘉里快遞嘅截單時間會由平時下午 4 點延遲到 6 點，遞送時間保持 1-2 個工作天；偏遠地區如東涌、馬灣、榕樹灣可能要預多 1 日。

## 傳單紙張同工藝選擇

最常用嘅 3 種紙張係 128gsm 書紙、157gsm 雙粉紙同 250gsm 銅版紙。128gsm 書紙最平，適合 5,000 張以上大量派發；157gsm 雙粉紙挺身又唔會透底，係茶餐廳同私房菜嘅主流選擇；250gsm 銅版紙上手有份量，適合作為套餐單張或摺疊款 menu。印刷工藝方面，單面彩色 4 色（CMYK）已經足夠，雙面印刷可以將地圖、訂位 QR Code 放喺背面。表面加工可選光膠或啞膠，啞膠較高檔但容易留指紋。

## 設計細節與視覺動線

新餐廳傳單設計有 3 個常見盲點：(1) 招牌菜名太細字，街坊行路睇唔到；(2) 地址冇顯眼 icon，唔識路嘅客會放棄；(3) 優惠期冇時限，3 個月後傳單仲喺度，誤導街坊。建議字體標題最少 28pt、副標題 16pt，地址 14pt 配地圖 icon。優惠期一定要寫「2026 年 9 月 30 日前到店出示」，避免投訴。

## 採購決策同起印量

起印量一般 500 張起，但 1,000 張嘅單張成本通常平 20-30%。香港常見派發渠道有 3 種：街邊派發（需申請臨時公眾娛樂牌照）、報紙夾報（觀塘／荃灣區派報員）、屋苑信箱（管理處批准）。建議首批 1,000 張主力派旺區同地鐵出口，其後按反應加印 2,000-5,000 張。

## 常見問題 FAQ

**Q1：傳單用什麼紙最抵？**
A：1,000 張以下選 157gsm 雙粉紙最抵，價錢同 128gsm 書紙差距唔大但上手好睇。5,000 張以上可以考慮 128gsm 書紙慳成本。

**Q2：順豐速遞傳單幾錢？**
A：香港 18 區順豐速遞一般 1-2 公斤件約 HK$30-50，視乎體積同偏遠附加費。1,000 張 A4 傳單大約 4-5 公斤，建議分 2 個包裝寄出減低運費。

**Q3：幾時開始派傳單最有效？**
A：建議開業前 2 週開始派。香港餐飲旺客人流集中喺午市（12:00-14:00）同晚市（18:00-20:30），呢兩個時段派單接受率最高。

**Q4：傳單設計犯咗規會唔會被檢控？**
A：根據《公眾衛生及市政條例》，街頭派發商業傳單須向食環署申請臨時牌照。違反者可被罰款最高 HK$5,000。建議透過屋苑管理處或商場推廣員派發免牌照。

## 開始印你的餐廳傳單

智印雲 ZprintPro 提供 500 張起印 A4／A5 傳單，4 色印刷、摺疊款可選，順豐速遞香港 18 區 1-2 工作天送達。即刻 WhatsApp +86 181 2638 0255 報價，或瀏覽 [A4 傳單產品頁](/zh-hk/product/a4-flyers/) 揀尺寸紙張。''',
    },
    'en': {
        'title': 'Restaurant Opening Flyer Printing Guide · Sizes, Paper & Fast Turnaround | ZprintPro',
        'description': 'Opening a new restaurant? Learn A4 flyer sizes, paper weights (128/157/250gsm), single vs double-sided, and fold options. Includes 4 FAQs for restaurant owners targeting dine-in and takeout customers in Hong Kong and overseas markets.',
        'content': '''## Why Restaurants Still Print Flyers

Even in 2026, restaurant flyers remain one of the most cost-effective local-marketing tools for new openings in dense markets like Hong Kong, Singapore, and Manhattan. A well-designed A4 flyer can reach several thousand passersby in a single weekend at under US$0.10 per piece, and a single zip code targeting pass.

This guide covers five key decisions restaurant owners face when ordering flyers: paper weight, single or double-sided, fold style, minimum order quantity, and delivery logistics. We've also added 4 of the most common questions from first-time owners.

## Hong Kong & Global Restaurant Market 2026

The second half of 2026 brings four high-traffic windows: back-to-school (Aug), Golden Week (Oct), Christmas & NYE (Dec), and Lunar New Year (Jan-Feb 2027). New restaurants typically start flyer distribution 4-6 weeks before launch, aiming for word-of-mouth on day one. For overseas operators, similar patterns hold — Memorial Day, July 4th, and Thanksgiving in the US; summer holidays across Europe.

## Paper Stocks & Print Finishes

The three most common choices are 128gsm offset paper (cheapest, best for 5,000+ pieces), 157gsm coated paper (mid-range, best hand-feel for casual dining and takeaway shops), and 250gsm art card (premium feel, ideal for set-menu cards or fold-out menus). CMYK 4-color on one side is the standard; double-sided adds room for a map, QR code, or order-now link. Finish options: gloss lamination (vibrant, more smudge-prone) or matte lamination (sophisticated, fingerprint-resistant).

## Design Tips & Common Pitfalls

Three pitfalls we see weekly: (1) the hero dish name is too small — pedestrians walking past can't read it; (2) the address lacks a recognizable map icon — non-locals give up; (3) no expiry date on the promo — three months later the same flyer is still in circulation, misleading customers. Recommended: title 28pt+, subtitle 16pt, address 14pt with map icon. Always write "Valid through 30 Sept 2026, show at door."

## Sourcing Decisions & MOQ

MOQ typically starts at 500 pieces, but the per-piece cost drops 20-30% at 1,000. Three common distribution channels: street handing (requires a temporary public entertainment licence in HK), newspaper inserts, and residential mailboxes via management office. We recommend 1,000 pieces for the first wave, focused on the busiest 3-5 districts, then 2,000-5,000 follow-up pieces based on response.

## Frequently Asked Questions

**Q1: What's the most cost-effective paper?**
A: Below 1,000 pieces, 157gsm coated is the best balance. Above 5,000, switch to 128gsm offset to save 15-20%.

**Q2: How much is courier delivery?**
A: For 1,000 A4 flyers (~4-5kg), expect US$5-15 for same-city next-day. International samples via DHL/FedEx are US$30-80 per 1kg to most markets.

**Q3: When should distribution start?**
A: Two weeks before opening day. Lunch (12-2pm) and dinner (6:30-8:30pm) hours see the highest acceptance rates in dense urban areas.

**Q4: Do I need a license for street distribution?**
A: Most cities require one — Hong Kong (FEHD temporary licence, max HK$5,000 fine for violations), Singapore (Public Entertainments Act), and most US cities require a solicitor permit. Work with mall management or apartment mailrooms to avoid the permit.

## Start Printing Your Restaurant Flyers

ZprintPro prints A4 / A5 flyers from 500 pieces, CMYK single or double-sided, fold options available, with DHL / FedEx / SF Express worldwide delivery. WhatsApp +86 181 2638 0255 for a quote, or browse our [A4 Flyer product page](/en/product/a4-flyers/) to pick size and paper.''',
    },
    'ja': {
        'title': 'レストラン開業チラシ印刷ガイド · サイズ・用紙・短期納品 | ZprintPro',
        'description': '新規オープンする飲食店向けに、A4 チラシのサイズ、用紙（128/157/250gsm）、両面印刷、折り加工を解説。店内飲食とテイクアウト両方に対応した 4 つの FAQ 付きで、香港・日本・東南アジア市場向け。',
        'content': '''## なぜ今もチラシを刷るのか

2026 年現在でも、密集市場（香港、シンガポール、東京、ニューヨーク）における新規飲食店のローカル・マーケティングで最も費用対効果が高いのがチラシである。A4 サイズ 1 枚あたりの単価が 10 円以下、週末だけで数千人の通行人にリーチでき、郵便番号単位の精密なエリア配布も可能。

本ガイドでは、飲食店オーナー向けに、チラシ発注時の 5 つの重要判断（用紙坪量、片／両面、折り加工、最低発注数量、配送）を解説。最後に初めて出店する方からよくある質問 4 件もまとめた。

## 2026 年下半期・飲食繁忙期

下半期は 4 回の繁忙期がある：夏休み（8 月）、国庆節ゴールデンウィーク（10 月）、クリスマス・大晦日（12 月）、旧正月（2027 年 1-2 月）。新規出店は通常、オープン 4-6 週間前から配布を開始し、初日から口コミを獲得することを目指す。

## 用紙と印刷仕上げ

主な 3 種類は 128gsm 上質紙（最安、5,000 枚以上向け）、157gsm コート紙（中級、カジュアル飲食・テイクアウト店向けの主流）、250gsm カード紙（プレミアム感、セットメニューや折込メニュー向け）。CMYK 片面 4 色が標準で、両面は地図・QR コード・注文リンク用に最適。表面加工は光沢ラミネート（鮮やか、汚れやすい）またはマットラミネート（上質感、指紋が目立たない）から選択。

## デザイン注意点と落とし穴

週次でよく見る 3 つのミス：(1) メイン料理名が小さすぎ、通行人が読めない；(2) 住所に地図アイコンがなく、土地感がない客は諦める；(3) キャンペーン期限が書かれていない、3 ヶ月後にも同じチラシが回って顧客を誤誘導。推奨：タイトル 28pt 以上、サブタイトル 16pt、住所 14pt + 地図アイコン。必ず「2026 年 9 月 30 日まで、来店時に提示」と記載。

## 発注判断と最低数量

最低発注数量は通常 500 枚から、ただし 1,000 枚で単価が 20-30% 下がる。主な 3 配布チャネル：街頭配布（許可制）、新聞折込、マンション管理組合経由のメールボックス。第 1 弾 1,000 枚を最繁華 3-5 地区に集中投入し、反応を見てから 2,000-5,000 枚を追加発注するのが効果的。

## よくある質問 FAQ

**Q1：最もコストパフォーマンスの良い用紙は？**
A：1,000 枚以下なら 157gsm コート紙が最適。5,000 枚を超えるなら 128gsm 上質紙で 15-20% コスト削減。

**Q2：配送料はどれくらい？**
A：1,000 枚 A4 チラシ（約 4-5kg）なら、同都市翌日配送で 500-1,500 円程度。海外サンプルは DHL／FedEx で 1kg あたり 4,000-12,000 円。

**Q3：いつから配布を始めるべき？**
A：オープン日の 2 週間前。ランチ帯（12-14 時）とディナー帯（18:30-20:30）が密集都市で最も受取率が高い。

**Q4：街頭配布に許可は必要？**
A：地域によるが、香港（FEHD 一時ライセンス、違反で最大 5,000 HK ドル罰金）、シンガポール（公共娯楽法）、日本（道路使用許可が必要）、米国（多くの市で solicitation permit が必要）。ショッピングモール管理会社・マンション管理組合経由なら許可不要。

## 飲食店のチラシ発注を始める

智印雲 ZprintPro では 500 枚から A4／A5 チラシを印刷。CMYK 片面・両面、折り加工オプション、香港・東京・大阪・東南アジア各国へ DHL／FedEx／佐川急便で配送。WhatsApp +86 181 2638 0255 まで見積もり依頼、または [A4 チラシ製品ページ](/ja/product/a4-flyers/) でサイズ・用紙を選んでください。''',
    },
}

# ---------- Q-002: 化妝品包裝盒 ----------
Q002 = {
    'slug': 'cosmetics-packaging-box-printing-guide',
    'meta': {
        'date': TODAY,
        'category': '美妝護膚',
    },
    'zh-hk': {
        'title': '化妝品包裝盒定制指南 · 護膚品牌結構與材質全攻略 | 智印雲 ZprintPro',
        'description': '護膚品新品牌如何揀包裝盒？比較天地盒、磁吸盒、摺疊盒 3 大結構，分析銅版紙、灰板、密度板等材質特性，附 4 條品牌創辦人常見 FAQ，協助 100-10,000 件 MOQ 精準控成本。',
        'content': '''## 為什麼化妝品包裝盒決定品牌第一印象

香港美妝護膚市場年產值超過 HK$120 億，新品牌入場競爭激烈。一個護膚品牌從 0 到 1 最常被忽略嘅環節係包裝盒——客人喺專櫃、官網、社群第一眼睇到嘅就係盒。盒嘅結構、材質、印刷工藝直接決定品牌係「千元面霜」定「開架護膚」嘅印象。

本文整理化妝品包裝盒定制嘅 5 大核心決策：盒型結構、材質、內襯、印刷工藝、起印量，並附 4 條品牌創辦人常見 FAQ。

## 香港美妝護膚 2026 市場概況

2026 年香港美妝護膚市場三大趨勢：(1) 環保材質需求上升，30% 消費者願意為可回收包裝多付 5-10% 價錢；(2) KOL 直播帶貨帶動小批量（500-1,000 件）精品包裝需求；(3) 跨境電商（美加、東南亞）出口品牌對運輸耐壓度要求提高，磁吸盒佔比由 2024 年 25% 升至 2026 年 40%。

## 3 大盒型結構比較

**天地盒（Top & Bottom Box）**：最經典結構，上下蓋分離。優點係成本最低、生產速度快、適合 500-5,000 件起印。缺點係開合體驗較一般，唔及磁吸盒儀式感。適合開架護膚、面膜、Sample 套装。

**磁吸盒（Magnetic Closure Box）**：盒蓋內藏磁鐵，自動吸附閉合。儀式感強，特別適合送禮場合。成本比天地盒高 30-50%，但係品牌溢價空間大。適合精華液、面霜套裝、節日禮盒。

**摺疊盒（Folding Carton）**：一片紙板摺成，平面運輸節省倉儲成本。適合 5,000 件以上大量生產，但質感比前兩者低。適合中小樣、旅行套装。

## 材質選擇與印刷工藝

最常見 3 種材質：350gsm 雙銅紙（最平，印刷效果好）、1200gsm 灰板（中等硬度，天地盒主流）、1500gsm 密度板（高硬度，磁吸盒高端款）。印刷工藝方面，4 色 CMYK + 1-2 色 Pantone 專色可達到品牌標準色；表面加工可選光膠、啞膠、局部 UV、燙金（燙銀／燙玫瑰金）、壓凹（embossing）。燙金 logo 成本每件 +HK$0.5-1.5，但對品牌辨識度提升顯著。

## 採購決策與 MOQ 起印量

起印量方面，天地盒一般 500 件起，磁吸盒一般 1,000 件起，摺疊盒 3,000 件起。500 件天地盒單件成本約 HK$8-12，1,000 件磁吸盒單件約 HK$15-25。建議新品牌首批 500-1,000 件天地盒試水，反應好再加單 2,000 件磁吸盒做節日限定。

## 常見問題 FAQ

**Q1：磁吸盒同天地盒點揀？**
A：預算優先選天地盒（每件慳 HK$5-10），品牌儀式感優先選磁吸盒。如果係節日限定或禮盒套裝，推薦磁吸盒。

**Q2：點樣先做到品牌標準色？**
A：4 色 CMYK 只能近似 Pantone 專色。要 100% 匹配品牌色（例如經典 Tiffany 藍），需要加 1-2 個 Pantone 專色印刷，每件成本 +HK$0.3-0.8。

**Q3：包裝盒跨境運輸會唔會壓扁？**
A：磁吸盒最易受壓，建議加瓦楞外箱 + 氣泡袋。香港寄美加空運約 7-10 日，建議紙箱外加「THIS SIDE UP」標示。

**Q4：環保材質有邊啲選擇？**
A：可選 100% 再生灰板（成本 +10%）、大豆油墨印刷（成本 +5%）、FSC 認證紙材（成本 +8-15%）。環保標籤可印喺盒底，提升品牌 ESG 形象。

## 開始印你的護膚品牌包裝盒

智印雲 ZprintPro 提供天地盒、磁吸盒、摺疊盒 3 大結構，500 件起印，4 色 CMYK + 專色印刷，順豐速遞香港 1-2 工作天，DHL／FedEx 全球 7-10 工作天。即刻 WhatsApp +86 181 2638 0255 報價，或瀏覽 [禮盒產品頁](/zh-hk/product/gift-boxes/) 揀結構材質。''',
    },
    'en': {
        'title': 'Custom Cosmetics Packaging Box Guide · Materials, Structure & Branding | ZprintPro',
        'description': 'How to choose the right cosmetics box for your skincare brand? Compare top-bottom, magnetic closure, and folding carton structures. Includes 4 FAQs from first-time brand founders, with material specs, MOQ strategy, and finishes for global beauty and skincare markets.',
        'content': '''## Why Packaging Defines the First Impression

The global skincare market crossed US$180 billion in 2025, and new indie brands launch every week across the US, UK, EU, and Asia. Yet one critical decision is consistently underestimated: the packaging box. The first thing a customer sees at Sephora, on a DTC website, or unboxed from a subscription shipment is the box. Structure, material, and print finish collectively determine whether a US$30 serum reads as "prestige" or "drugstore."

This guide covers the 5 core decisions skincare brand founders face: box structure, material, interior fit, print finish, and MOQ strategy — plus 4 of the most common FAQs.

## 2026 Skincare Market Trends

Three trends are reshaping skincare packaging in 2026: (1) Sustainability demand — 35% of millennials and Gen Z willing to pay 5-10% more for recyclable or FSC-certified materials; (2) KOL-driven micro-batches — 500-1,000 piece runs for limited drops and influencer collaborations; (3) Cross-border DTC growth (US, EU, AU, SG, JP) — increasing demand for crush-resistant magnetic closure boxes for air-freight shipments.

## Three Box Structure Comparison

**Top & Bottom Box (Lid-Base Box)**: Classic two-piece design, lowest cost, fastest production. Best for 500-5,000 piece runs. Suitable for skincare basics, sheet masks, and sample sets.

**Magnetic Closure Box**: Lid with hidden magnets, satisfying snap-close. Premium unboxing experience, ideal for gifting. Costs 30-50% more than top-bottom but enables stronger brand premium. Best for serums, creams, holiday gift sets.

**Folding Carton**: Single-piece folded, ships flat to save warehousing. Best for 5,000+ piece runs. Lower perceived quality than rigid boxes but unbeatable for cost. Best for travel sets and travel-size ranges.

## Material Selection & Print Finish

Three common materials: 350gsm coated paper (cheapest, vivid print), 1200gsm greyboard (mid-rigidity, standard for top-bottom boxes), 1500gsm density board (high-rigidity, premium magnetic boxes). Print: CMYK + 1-2 Pantone spot colors to match brand standards exactly. Finishes: gloss lamination, matte lamination, spot UV, foil stamping (gold/silver/rose gold), and embossing. Foil logo adds US$0.05-0.15 per piece but dramatically lifts brand recall.

## Sourcing Decisions & MOQ

Typical MOQs: top-bottom 500 pieces, magnetic closure 1,000 pieces, folding carton 3,000 pieces. At 500 pieces, top-bottom runs US$1-1.50 per piece; 1,000-piece magnetic closure runs US$2-3 per piece. For new brands, start with 500-1,000 top-bottom boxes to test the market, then move to 1,000+ piece magnetic closure for holiday and limited editions.

## Frequently Asked Questions

**Q1: Magnetic closure or top-bottom box?**
A: Budget-first → top-bottom (save US$0.50-1.00 per piece). Brand-experience-first → magnetic closure. For gift sets and holiday editions, magnetic is the standard.

**Q2: How do I match my brand Pantone color exactly?**
A: CMYK 4-color approximates Pantone but cannot match. Add 1-2 Pantone spot colors to your print spec — adds US$0.04-0.10 per piece but ensures 100% brand color accuracy.

**Q3: Will boxes get crushed in international shipping?**
A: Magnetic closure boxes are most vulnerable. Always add a corrugated outer carton + bubble wrap. Air freight from Asia to US/EU runs 7-12 days; mark "THIS SIDE UP" and "FRAGILE" on all sides.

**Q4: What sustainable options exist?**
A: 100% recycled greyboard (+8-12% cost), soy-based inks (+3-5%), FSC-certified paper (+10-18%). Print an eco-label on the box bottom to enhance ESG brand perception.

## Start Printing Your Skincare Boxes

ZprintPro prints top-bottom, magnetic closure, and folding carton boxes from 500 pieces, with CMYK + Pantone spot colors, foil, embossing, and spot UV finishes. SF Express delivery in Hong Kong (1-2 days), DHL / FedEx global (7-10 days). WhatsApp +86 181 2638 0255 for a quote, or browse our [Gift Boxes product page](/en/product/gift-boxes/) to pick structure and material.''',
    },
    'ja': {
        'title': '化粧品パッケージ箱カスタムガイド · 素材・構造・ブランディング | ZprintPro',
        'description': 'スキンケアブランド向けに、天地箱・マグネット式・折り箱の 3 構造を比較。素材（コート紙・グレー板・密度板）、印刷加工、最低発注数量まで解説。ブランド創業者からよくある質問 4 件付き。',
        'content': '''## パッケージが第一印象を決める理由

2025 年に世界スキンケア市場が 1,800 億ドルを突破し、米国・英国・EU・亚洲で毎週のように新興ブランドがローンチしている。しかし見落とされがちなのが「パッケージ箱」の選択である。Sephora・DTC サイト・サブスク開封時に顧客が最初に見るのは箱。構造・素材・印刷仕上げが総合的に「高級」か「市販」かの印象を決める。

本ガイドでは、スキンケアブランド創業者向けに、パッケージ箱発注時の 5 つの核心判断（構造、素材、内装箱、印刷仕上げ、最低発注数量）と、よくある 4 つの質問を解説する。

## 2026 年スキンケア市場トレンド

2026 年の 3 大トレンド：(1) 持続可能性需要 — ミレニアル／Z 世代の 35% がリサイクル可能または FSC 認証素材に 5-10% の追加支払いを許容；(2) KOL 駆動の小ロット — 限定ドロップ、インフルエンサーコラボで 500-1,000 個の小回注文；(3) 越境 EC 成長（米・欧・豪・星・日）で、航空輸送向けの耐圧マグネット箱の需要増。

## 3 大箱構造の比較

**天地箱（lid-base box）**：古典的な 2 ピースデザイン、最も安価、生産速度最速。500-5,000 個発注に最適。スキンケア基本商品、シートマスク、サンプルセット向け。

**マグネット式箱（magnetic closure）**：蓋に隠しマグネット内蔵、満足感のあるスナップ閉合。高級感のある開封体験、ギフトに最適。天地箱より 30-50% 高コストだが、ブランドプレミアムが取れる。セラム、クリーム、祝日ギフトセット向け。

**折り箱（folding carton）**：1 枚板折りたたみ、平置き輸送で倉庫コスト削減。5,000 個以上の大量発注に最適。剛箱より質感低いが、コスト最強。旅行セット・携帯サイズ向け。

## 素材選択と印刷仕上げ

3 つの主要素材：350gsm コート紙（最も安価、印刷鮮明）、1200gsm グレー板（中剛性、天地箱標準）、1500gsm 密度板（高剛性、高級マグネット箱用）。印刷：CMYK + 1-2 パントン特色でブランド標準色を完全再現。仕上げ：光沢ラミネート、マットラミネート、スポット UV、箔押し（金／銀／ローズゴールド）、エンボス。箔ロゴは 1 個あたり 5-15 円の追加でブランド想起を劇的に向上。

## 発注判断と最低数量

標準 MOQ：天地箱 500 個、マグネット箱 1,000 個、折り箱 3,000 個。天地箱 500 個で 1 個 100-150 円程度、マグネット箱 1,000 個で 200-300 円程度。新興ブランドはまず天地箱 500-1,000 個で市場テストし、好評なら祝日・限定版で 1,000 個以上のマグネット箱に移行するのが効果的。

## よくある質問 FAQ

**Q1：マグネット箱と天地箱どちらを選ぶ？**
A：予算優先 → 天地箱（1 個あたり 50-100 円節約）。ブランド体験優先 → マグネット箱。ギフトセット・限定版はマグネットが標準。

**Q2：ブランドパントン色を完全一致させるには？**
A：CMYK 4 色では近似のみ。1-2 パントン特色を印刷仕様に加えれば 100% 一致（1 個あたり 4-10 円の追加）。

**Q3：国際輸送で箱が潰れないか？**
A：マグネット箱が最も脆弱。必ず段ボール外箱 + 緩衝材を追加。アジアから米・欧への航空輸送は 7-12 日。「THIS SIDE UP」「FRAGILE」を全面にマーク。

**Q4：持続可能なオプションは？**
A：100% 再生グレー板（+8-12% コスト）、大豆インク（+3-5%）、FSC 認証紙（+10-18%）。エコラベルを箱底に印刷すれば ESG ブランドイメージを強化。

## スキンケアブランドのパッケージ発注を始める

智印雲 ZprintPro では天地箱・マグネット箱・折り箱の 3 構造を 500 個から印刷。CMYK + パントン特色、箔、エンボス、スポット UV 仕上げ対応。香港内は SF Express で 1-2 日、海外は DHL／FedEx で 7-10 日。WhatsApp +86 181 2638 0255 まで見積もり依頼、または [ギフトボックス製品ページ](/ja/product/gift-boxes/) で構造・素材を選んでください。''',
    },
}

# ---------- Q-003: 寵物食品貼紙 ----------
Q003 = {
    'slug': 'pet-food-sticker-printing-guide',
    'meta': {
        'date': TODAY,
        'category': '寵物',
    },
    'zh-hk': {
        'title': '香港寵物食品品牌貼紙印刷指南 · 防水防油 FDA 認證 | 智印雲 ZprintPro',
        'description': '寵物食品新品牌點樣印合格標籤？比較防水貼紙、防油貼紙、透明貼紙 3 種材質，分析 FDA 食品級認證、BPA-free 油墨、QR Code 追溯系統，附 4 條品牌創辦人 FAQ，協助 100-10,000 件 MOQ。',
        'content': '''## 為什麼寵物食品貼紙係品牌合規第一關

香港寵物食品市場年增長率 15%，新晉品牌以手工鮮食、無穀貓糧、凍乾零食為主。每件寵物食品包裝上都必須貼有標籤，列出成分、營養分析、生產日期、追溯資料。一張設計錯誤嘅貼紙唔止影響品牌形象，更可能被食環署要求回收。

本文整理寵物食品貼紙定制嘅 5 大核心決策：材質、油墨認證、形狀與切割、QR Code 追溯、起印量，並附 4 條品牌創辦人常見 FAQ。

## 香港寵物食品 2026 市場概況

2026 年香港寵物食品市場三大趨勢：(1) 高端手工鮮食品牌興起，25% 主人願意為「無添加」每月多付 HK$200-500；(2) FDA 認證（出口美加）成為基本入場門檻；(3) 環保可水洗貼紙需求上升，25% 主人偏好可回收包裝。

## 3 大貼紙材質比較

**防水貼紙（Vinyl / PP 合成紙）**：100% 防水防油，適用於冷藏鮮食、罐裝食品。最常用 100-150μm 厚度，撕唔爛、貼得穩。適合手工鮮食、罐頭、凍乾零食。

**透明貼紙（Transparent BOPP）**：面貼透明底材，貼喺玻璃罐或霧面包裝上呈現「無標籤」高級感。防水防油但撕除時可能留殘膠。適合手工果醬、玻璃瓶裝凍乾。

**模切貼紙（Die-Cut Stickers）**：切成品牌 logo 形狀或角色造型，互動性強。多用於封口貼、贈品、活動貼紙。材質多為 80-100μm 紙質 + 防水光膠。

## FDA 食品級油墨與 BPA-free

寵物食品標籤嘅油墨必須係 FDA 21 CFR 認證間接食品接觸級別（Indirect Food Contact），唔可以含有 BPA、鄰苯二甲酸鹽、重金屬。智印雲採用德國 Siegwerk 環保大豆油墨，已通過 FDA、EU LFGB、瑞士 BfR 三重認證。標籤可貼喺包裝外層（Outer Surface），如需直接接觸食品（例如夾層標籤）需要進一步選用「Direct Food Contact」級別油墨。

## QR Code 追溯與生產資訊

香港食環署要求寵物食品標籤列明：(1) 成分表（按重量降序排列）；(2) 保證分析（蛋白質、脂肪、纖維、水分）；(3) 生產日期／有效日期（DD/MM/YYYY 格式）；(4) 製造商或分銷商名稱地址；(5) 批次編號（可由 QR Code 連結到生產記錄）。建議每件貼紙右上角加 QR Code，掃描可追溯到完整生產履歷，提升消費者信心。

## 採購決策與 MOQ 起印量

起印量方面，模切貼紙 100 張起，標準防水貼紙 500 張起，定制形狀 1,000 張起。100 張模切 logo 貼紙約 HK$2-3／張，1,000 張防水貼紙約 HK$0.8-1.5／張，10,000 張以上可降至 HK$0.3-0.5／張。建議新品牌首批 1,000 張防水主標籤 + 500 張模切封口貼試水，穩定後加印至 5,000-10,000 張。

## 常見問題 FAQ

**Q1：點樣先做到 FDA 食品級？**
A：要求印刷商提供 FDA 21 CFR 176.170 / EU LFGB 認證油墨證書，並確認標籤只貼喺包裝外層（Outer Surface）。如需直接接觸食品，要另外選用 Direct Food Contact 級別油墨。

**Q2：防水貼紙會唔會好難撕？**
A：100-150μm 防水 PP 貼紙可撕但唔易撕爛，符合「防止兒童誤撕」要求。如需輕鬆撕除（例如回收包裝），可選 80μm 紙質 + 光膠加工。

**Q3：透明貼紙會唔會容易留殘膠？**
A：劣質透明貼紙 3-6 個月後可能黃變或留膠。建議選用 BOPP 底材 + 壓克力膠（acrylic adhesive），保存期 12-24 個月，撕除不留殘膠。

**Q4：QR Code 追溯系統點搭建？**
A：可使用免費平台（例如 QRCode Monkey + Google Sheets），每件產品一個唯一批次碼。消費者掃描後跳轉到批次生產記錄（成分、日期、產地），適合小型品牌 MVP。

## 開始印你的寵物食品標籤

智印雲 ZprintPro 提供防水、透明、模切 3 種貼紙材質，FDA / EU LFGB 認證大豆油墨，500 張起印，4 色 + 1 專色印刷，順豐速遞香港 1-2 工作天，DHL 全球 7-10 工作天。即刻 WhatsApp +86 181 2638 0255 報價，或瀏覽 [防水貼紙產品頁](/zh-hk/product/waterproof-stickers/) 揀材質。''',
    },
    'en': {
        'title': 'Pet Food Brand Sticker Printing Guide: Waterproof, Food-Safe Labels | ZprintPro',
        'description': 'How to print FDA-compliant pet food labels? Compare waterproof, transparent, and die-cut sticker materials. Covers BPA-free inks, QR code traceability, and 4 FAQs from first-time pet food brand founders, with MOQ strategy for global markets.',
        'content': '''## Why Pet Food Stickers Are the Compliance Gateway

The global pet food market crossed US$140 billion in 2025, growing 8% annually with indie brands leading in fresh, freeze-dried, and grain-free segments. Every jar, bag, and tin needs a label listing ingredients, guaranteed analysis, batch code, and traceability data. A wrong sticker design isn't just a brand issue — it can trigger a recall.

This guide covers the 5 core decisions pet food brand founders face: material, ink certification, shape & cutting, QR code traceability, and MOQ strategy — plus 4 of the most common FAQs.

## 2026 Pet Food Market Trends

Three trends shape pet food packaging in 2026: (1) premium fresh food — 25% of pet parents willing to pay 20-40% more for "no additives"; (2) FDA compliance (US export) is now a baseline requirement; (3) eco-friendly wash-off labels — 25% of consumers prefer recyclable packaging.

## Three Sticker Material Comparison

**Waterproof Stickers (Vinyl / PP synthetic paper)**: 100% waterproof and oil-resistant, ideal for refrigerated fresh food and canned food. Common thickness 100-150μm, tear-resistant, strong adhesion. Best for fresh food, cans, freeze-dried.

**Transparent Stickers (Transparent BOPP)**: Clear substrate, gives "no-label" premium feel on glass jars and matte packaging. Waterproof but may leave residue when removed. Best for artisan products, glass jar freeze-dried.

**Die-Cut Stickers**: Cut to brand logo shape or character design, highly interactive. Common for seal stickers, gifts, event giveaways. Typically 80-100μm paper + waterproof gloss lamination.

## FDA Food-Safe Inks & BPA-Free

Pet food label inks must meet FDA 21 CFR indirect food contact standards — no BPA, phthalates, or heavy metals. ZprintPro uses German Siegwerk eco-friendly soy-based inks, certified by FDA, EU LFGB, and Swiss BfR. Labels can be applied to the outer packaging surface; for direct food contact (e.g., interleaved labels), upgrade to "Direct Food Contact" certified ink.

## QR Code Traceability & Production Data

US FDA, EU EFSA, and most APAC regulators require: (1) ingredient list (descending by weight); (2) guaranteed analysis (protein, fat, fiber, moisture); (3) production / expiry date (MM/DD/YYYY); (4) manufacturer or distributor name and address; (5) batch code (can link to production records via QR code). Adding a QR code on the top-right corner of each label, scanning to a complete production history, dramatically increases consumer trust.

## Sourcing Decisions & MOQ

MOQs: die-cut 100 pieces, standard waterproof 500 pieces, custom shape 1,000 pieces. 100 die-cut logo stickers ~US$0.25-0.40 per piece; 1,000 waterproof labels ~US$0.10-0.18 per piece; 10,000+ drops to US$0.04-0.06. For new brands, start with 1,000 waterproof main labels + 500 die-cut seal stickers to test the market, then ramp to 5,000-10,000 once stable.

## Frequently Asked Questions

**Q1: How do I ensure FDA food-safe compliance?**
A: Require your printer to provide FDA 21 CFR 176.170 / EU LFGB ink certification, and confirm labels are applied to the outer surface. For direct food contact, upgrade to Direct Food Contact grade ink.

**Q2: Are waterproof stickers hard to remove?**
A: 100-150μm PP waterproof labels are tear-resistant, meeting "child-resistant" requirements. If you need easier removal (e.g., for recycling), choose 80μm paper + gloss lamination.

**Q3: Will transparent stickers yellow or leave residue?**
A: Low-quality transparent stickers can yellow in 3-6 months. Use BOPP substrate + acrylic adhesive — 12-24 month shelf life, no residue on removal.

**Q4: How to set up QR code traceability?**
A: Use a free platform (e.g., QRCode Monkey + Google Sheets), one unique batch code per product. Scanning shows complete production history (ingredients, date, origin) — ideal for small-brand MVP.

## Start Printing Your Pet Food Labels

ZprintPro prints waterproof, transparent, and die-cut stickers from 500 pieces, with FDA / EU LFGB certified soy-based inks, CMYK + 1 spot color, and SF Express delivery in Hong Kong (1-2 days) or DHL global (7-10 days). WhatsApp +86 181 2638 0255 for a quote, or browse our [Waterproof Stickers product page](/en/product/waterproof-stickers/) to pick material.''',
    },
    'ja': {
        'title': 'ペットフードステッカー印刷ガイド：防水・FDA 準拠ラベル素材 | ZprintPro',
        'description': 'ペットフードブランドの FDA 準拠ラベル印刷方法を解説。防水・透明・ダイカットの 3 素材比較、BPA フリーインク、QR コードトレーサビリティ、ブランド創業者 FAQ 4 件付きで、グローバル市場向け MOQ 戦略も。',
        'content': '''## ペットフードステッカーがコンプライアンスの第一関門

世界ペットフード市場は 2025 年に 1,400 億ドルを突破し、8% 年成長。新興ブランドがフレッシュ・フリーズドライ・グレインフリー分野をリードしている。瓶・袋・缶すべてに成分・保証分析・バッチコード・トレーサビリティ情報を記載したラベルが必要。誤ったステッカーは単なるブランド問題ではなくリコールにつながる。

本ガイドでは、ペットフードブランド創業者向けに、ステッカー発注時の 5 つの核心判断（素材、インク認証、形状・カット、QR コードトレーサビリティ、最低発注数量）とよくある質問 4 件を解説する。

## 2026 年ペットフード市場トレンド

2026 年の 3 大トレンド：(1) プレミアムフレッシュフード — ペットオーナーの 25% が「無添加」に 20-40% の追加支払いを許容；(2) FDA コンプライアンス（米国輸出）が基本要件化；(3) エコ対応水洗可能ラベル — 消費者の 25% がリサイクル可能包装を選好。

## 3 大ステッカー素材の比較

**防水ステッカー（Vinyl / PP 合成紙）**：100% 防水・耐油、冷蔵フレッシュ食品と缶詰に最適。標準厚さ 100-150μm、引き裂き抵抗、強い粘着力。フレッシュ食品、缶詰、フリージドライ向け。

**透明ステッカー（Transparent BOPP）**：透明基材、ガラス瓶・マット包装に「ラベルなし」の高級感。防水だが剥離時に糊残りの可能性。 artisan 商品、ガラス瓶フリージドライ向け。

**ダイカットステッカー（Die-Cut）**：ブランドロゴ形状・キャラクター形状にカット、インタラクティブ性が高い。封シール、ギフト、イベント配布物向け。80-100μm 紙 + 防水光沢ラミネートが標準。

## FDA 食品対応インクと BPA フリー

ペットフードラベル用インクは FDA 21 CFR 間接食品接触基準を満たす必要があり、BPA・フタル酸・重金属を含まない。智印雲は独 Siegwerk エコ対応大豆インクを使用、FDA／EU LFGB／スイス BfR の三重認証取得。ラベルは包装外層に貼付可能。直接食品接触（インターリーブ等）には「Direct Food Contact」認証インクへのアップグレードが必要。

## QR コードトレーサビリティと製造情報

米国 FDA、EU EFSA、大半の APAC 規制当局が要求：(1) 成分表（重量降順）；(2) 保証分析（タンパク質・脂肪・食物繊維・水分）；(3) 製造日／賞味期限（YYYY/MM/DD 形式）；(4) 製造者または販売者名・住所；(5) バッチコード（QR コード経由で製造記録にリンク可能）。各ラベルの右上に QR コードを配置、消費者スキャンで完全製造履歴に飛べば信頼感向上。

## 発注判断と最低数量

MOQ：ダイカット 100 枚、標準防水 500 枚、カスタム形状 1,000 枚。ダイカットロゴ 100 枚で 1 枚 25-40 円程度、防水ラベル 1,000 枚で 10-18 円程度、10,000 枚以上は 4-6 円。新興ブランドはまず防水メインラベル 1,000 枚 + ダイカット封シール 500 枚で市場テスト、好評なら 5,000-10,000 枚に拡大。

## よくある質問 FAQ

**Q1：FDA 食品対応コンプライアンスをどう確保する？**
A：印刷会社に FDA 21 CFR 176.170 / EU LFGB インク認証証明書の提出を要求、包装外層貼付を確認。直接食品接触には Direct Food Contact グレードインクへのアップグレードが必要。

**Q2：防水ステッカーは剥がしにくい？**
A：100-150μm PP 防水ラベルは引き裂き抵抗があり「チャイルドレジスタント」要件を満たす。リサイクル時の簡単剥離が必要なら 80μm 紙 + 光沢ラミネートを選択。

**Q3：透明ステッカーは黄変・糊残りが起きる？**
A：低品質透明ステッカーは 3-6 ヶ月で黄変の可能性。BOPP 基材 + アクリル粘着剤なら保存期間 12-24 ヶ月、剥離時に糊残なし。

**Q4：QR コードトレーサビリティをどう構築する？**
A：無料プラットフォーム（例：QRCode Monkey + Google Sheets）で商品ごとにユニークバッチコード。スキャンで完全製造履歴（成分・日付・産地）が表示される、小ブランド MVP に最適。

## ペットフードラベル印刷を始める

智印雲 ZprintPro では防水・透明・ダイカットの 3 素材を 500 枚から印刷。FDA / EU LFGB 認証大豆インク、CMYK + 1 特色対応、香港内は SF Express で 1-2 日、海外は DHL で 7-10 日。WhatsApp +86 181 2638 0255 まで見積もり依頼、または [防水ステッカー製品ページ](/ja/product/waterproof-stickers/) で素材を選んでください。''',
    },
}

# ============================================================
# Step 1: Write 3 slugs into src/data/blog-data/{zh-hk,en,ja}.json
# ============================================================
print('=== Step 1: Write 3 slugs to blog-data JSON ===')
ALL_CONTENT = {'Q-001': Q001, 'Q-002': Q002, 'Q-003': Q003}

for locale in ['zh-hk', 'en', 'ja']:
    fp = BLOG_DIR / f'{locale}.json'
    data = json.loads(fp.read_text(encoding='utf-8'))
    for qid, payload in ALL_CONTENT.items():
        slug = payload['slug']
        c = payload[locale]
        data[slug] = {
            'title': c['title'],
            'description': c['description'],
            'date': payload['meta']['date'],
            'category': payload['meta']['category'],
            'content': c['content'],
        }
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'  -> {fp}: {len(data)} slugs')

# ============================================================
# Step 2: Update page.tsx (articleSlugs + posts entries)
# ============================================================
print('\n=== Step 2: Update page.tsx ===')
page_text = PAGE_TSX.read_text(encoding='utf-8')

# 2.1 - Append 3 slugs to articleSlugs array
old_tail = "  'media-merchandise-box-printing-guide',\n];"
new_tail = """  'media-merchandise-box-printing-guide',
  // 2026-07-16 v4 daily-content-evolve add 3 (Q-001/002/003)
  'restaurant-opening-flyer-printing-guide',
  'cosmetics-packaging-box-printing-guide',
  'pet-food-sticker-printing-guide',
];"""
assert old_tail in page_text, 'articleSlugs tail not found'
page_text = page_text.replace(old_tail, new_tail)
print('  + articleSlugs: 3 new slugs appended')

# 2.2 - Insert 3 new entries into zh-hk block
def get_entry_block(locale):
    lines = []
    for qid, payload in ALL_CONTENT.items():
        slug = payload['slug']
        c = payload[locale]
        title = c['title']
        desc = c['description']
        date = payload['meta']['date']
        cat = payload['meta']['category']
        # Escape single quotes for TS string literal
        title_esc = title.replace("'", "\\'")
        desc_esc = desc.replace("'", "\\'")
        cat_esc = cat.replace("'", "\\'")
        lines.append(f"    '{slug}': {{\n      title: '{title_esc}',\n      description: '{desc_esc}',\n      date: '{date}', category: '{cat_esc}',\n      content: '',\n    }},")
    return '\n'.join(lines) + '\n'

# zh-hk block close: yesterday's last entry is 'folding-box-cosmetics-brand-eco-friendly-guide' (Q-019).
# Real structure verified 2026-07-16:
#   ... folding-box ... content: '' },\n\n  },\n  ja: { ...
# So find the 'folding-box' entry start, then locate '},\n\n  },\n  ja: {' after it.
zh_entries = get_entry_block('zh-hk')
zh_anchor = "'folding-box-cosmetics-brand-eco-friendly-guide': {"
assert zh_anchor in page_text, 'zh-hk anchor (folding-box) not found'
zh_start = page_text.find(zh_anchor)
# The closing pattern is '},\n\n  },\n  ja: {' (extra blank line between entry close and block close)
zh_close_pattern = '},\n\n  },\n  ja: {'
zh_close_idx = page_text.find(zh_close_pattern, zh_start)
assert zh_close_idx > 0, 'zh-hk close pattern not found'
# Insert entries: we want to add 3 new entries between the last '},' and '\n\n  },\n  ja: {'
# The 'zh_close_pattern' starts with '},' (closes the last entry). After that is '\n\n  },\n  ja: {'.
# So we insert entries AFTER the closing '},' (i.e., at position zh_close_idx + 2) and BEFORE '\n\n  },\n  ja: {'.
# Simpler: replace the entire pattern with '},\n' + entries + '\n\n  },\n  ja: {'
zh_new_pattern = '},\n' + zh_entries + '\n  },\n  ja: {'
page_text = page_text[:zh_close_idx] + zh_new_pattern + page_text[zh_close_idx + len(zh_close_pattern):]
print('  + zh-hk block: 3 new entries inserted (anchor: folding-box ... , close: },\\n\\n  },\\n  ja: {)')

# 2.3 - Insert 3 new entries into ja block (en falls back to blog-posts.ts)
# Real structure (verified 2026-07-16): ja block ends with '},\n\n  }\n};\n' (extra blank line before close)
ja_entries = get_entry_block('ja')
ja_close_pattern = '},\n\n  }\n};\n'
ja_close_idx = page_text.rfind(ja_close_pattern)
assert ja_close_idx > 0, 'ja close pattern not found'
# Replace pattern with '},\n' + entries + '\n  }\n};\n'
ja_new_pattern = '},\n' + ja_entries + '\n  }\n};\n'
page_text = page_text[:ja_close_idx] + ja_new_pattern + page_text[ja_close_idx + len(ja_close_pattern):]
print('  + ja block: 3 new entries inserted (anchor: }, \\n\\n  }\\n};\\n)')

PAGE_TSX.write_text(page_text, encoding='utf-8')
print(f'  -> wrote {PAGE_TSX}')

# ============================================================
# Step 3: Update blog-posts.ts (3 BlogPostMeta + array)
# ============================================================
print('\n=== Step 3: Update blog-posts.ts ===')
bp_text = BLOG_POSTS_TS.read_text(encoding='utf-8')

# 3.1 - SKIPPED: Q-001/002/003 BlogPostMeta const blocks (lpRestaurantOpeningFlyer,
# lpPetFoodSticker, lpCosmeticsPackagingBox) already exist in const region (2026-07-15 build
# added them to const defs but missed array append — bug carried over). We only need to add
# them to the blogPosts array now.
print('  - 3.1 SKIPPED: const blocks already exist (lpRestaurantOpeningFlyer/lpPetFoodSticker/lpCosmeticsPackagingBox)')

# 3.2 - Append 3 new entries to blogPosts array
# Real tail (verified 2026-07-16):
#   lpMediaMerchandiseBox,
#   // 2026-07-15 daily-content-evolve add 3 (Q-017/018/019 new)
#   lpThickPaperFlyer,
#   lpMagneticClosureGiftBox,
#   lpFoldingBoxCosmetics,
# ];
old_anchor5 = """  lpMediaMerchandiseBox,
  // 2026-07-15 daily-content-evolve add 3 (Q-017/018/019 new)
  lpThickPaperFlyer,
  lpMagneticClosureGiftBox,
  lpFoldingBoxCosmetics,
];"""
new_replace5 = """  lpMediaMerchandiseBox,
  // 2026-07-15 daily-content-evolve add 3 (Q-017/018/019 new)
  lpThickPaperFlyer,
  lpMagneticClosureGiftBox,
  lpFoldingBoxCosmetics,
  // 2026-07-16 v4 daily-content-evolve add 3 (Q-001/002/003 P0 SKU)
  lpRestaurantOpeningFlyer,
  lpCosmeticsPackagingBox,
  lpPetFoodSticker,
];"""
assert old_anchor5 in bp_text, 'blogPosts array tail not found'
bp_text = bp_text.replace(old_anchor5, new_replace5, 1)
print('  + 3 new entries appended to blogPosts array')

# 3.3 - Update Unified list comment if present
import re
m = re.search(r'// Unified list \((\d+) articles\)', bp_text)
if m:
    old_n = int(m.group(1))
    bp_text = bp_text.replace(f'// Unified list ({old_n} articles)', f'// Unified list ({old_n + 3} articles)', 1)
    print(f'  + Unified list comment: {old_n} -> {old_n + 3}')
else:
    # No Unified list comment, that's fine
    print('  - No Unified list comment to update')

BLOG_POSTS_TS.write_text(bp_text, encoding='utf-8')
print(f'  -> wrote {BLOG_POSTS_TS}')

# ============================================================
# Step 4: Sub-task B - 3 SKU optimization (optimizedAt + optimizationRound)
# ============================================================
print('\n=== Step 4: Sub-task B - 3 SKU optimization ===')
prod_text = PRODUCTS_TS.read_text(encoding='utf-8')

# Add optimizedAt + optimizationRound + industry keywords to 3 SKUs
TODAY = '2026-07-16'

def add_optimized_at(text, slug, today):
    """Add optimizedAt + optimizationRound in slug block before 'minQuantity: '."""
    slug_anchor = f"slug: '{slug}',"
    assert slug_anchor in text, f'slug anchor {slug!r} not found'
    slug_idx = text.find(slug_anchor)
    minq_anchor = 'minQuantity: '
    minq_idx = text.find(minq_anchor, slug_idx)
    assert minq_idx > 0, f'minQuantity not found after {slug}'
    # Check if optimizedAt already exists in this block
    block_end_idx = text.find('},', slug_idx)
    if 'optimizedAt:' in text[slug_idx:block_end_idx]:
        print(f'  - {slug}: already has optimizedAt, skip')
        return text
    insert_text = f"    optimizedAt: '{today}',\n    optimizationRound: 1,\n    "
    new_text = text[:minq_idx] + insert_text + text[minq_idx:]
    return new_text

prod_text = add_optimized_at(prod_text, 'a4-flyers', TODAY)
prod_text = add_optimized_at(prod_text, 'gift-boxes', TODAY)
prod_text = add_optimized_at(prod_text, 'waterproof-stickers', TODAY)
print('  + 3 SKU optimizedAt added')

PRODUCTS_TS.write_text(prod_text, encoding='utf-8')
print(f'  -> wrote {PRODUCTS_TS}')

# ============================================================
# Step 5: Sub-task F - matrix.json update
# ============================================================
print('\n=== Step 5: Sub-task F - matrix.json update ===')
mat = json.loads(MATRIX_JSON.read_text(encoding='utf-8'))

# 5.1 - Mark Q-001/002/003 as completed in queue
for qid in ['Q-001', 'Q-002', 'Q-003']:
    for q in mat['queue']:
        if q['id'] == qid:
            q['status'] = 'completed'
            q['completed_at'] = TODAY
            q['completed_slug'] = ALL_CONTENT[qid]['slug']
            print(f'  - queue {qid}: status=completed')
            break

# 5.2 - Add 3 entries to covered[]
if 'covered' not in mat:
    mat['covered'] = []

for qid in ['Q-001', 'Q-002', 'Q-003']:
    payload = ALL_CONTENT[qid]
    mat['covered'].append({
        'slug': payload['slug'],
        'date': TODAY,
        'qid': qid,
        'category': payload['meta']['category'],
        'tier': 'A',
        'priority': 'P0',
    })
print(f'  + covered[]: +3 (total {len(mat["covered"])})')

# 5.3 - Update lastUpdated
mat['lastUpdated'] = TODAY
print(f'  + lastUpdated: {TODAY}')

MATRIX_JSON.write_text(json.dumps(mat, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'  -> wrote {MATRIX_JSON}')

print('\n=== ALL DONE ===')
print('Next: pre-check (encoding + tsc + build) before commit + push')
