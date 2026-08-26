#!/usr/bin/env python3
"""
2026-07-23 v7 daily-content-evolve: Q-GR-01 香港拼版彩盒指南
- K3 7/23 插队 priority_boost=3 (highest)
- matrix.json category: packaging / sku: gang-run-card-boxes / industry: 零售精品
- 双品牌宪法 (2026-07-21): zh-hk = 智印港 ZprintPro, en/ja = ZprintPro
- 9 段结构 + 4 FAQ + 5 内链 + 3+ price-anchor
- zh-hk 1200+ 字 繁体 (no simplified), en 400+ 词, ja 400+ 词
- NAP 脱钩: zh-hk SEO 标题/excerpt/正文不写 "深圳" 作 supplier origin
"""
import json
import os
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
JSON_DIR = ROOT / "src/data/blog-data"

# ============ zh-hk 1300+ 字 繁体 ============
ZH_HK = """<h2>香港拼版白卡彩盒:中小品牌 500 個起的預算首選</h2>
<p>香港零售精品店、美妝小店、文創 IP 周邊、禮品小店老闆,起印 500 個高質彩盒往往面對兩難:訂製彩盒要付昂貴刀模費 (HK$3,000-8,000),500 個小批量又難分攤;白卡摺疊盒交期 5-7 天太趕;磁吸天地盒起印 1,000 個對新品牌太重。智印港 (ZprintPro) 推出拼版白卡彩盒,固定刀模共用,免刀模費 + 免排版費,成本直降 40-60%,500-10,000 枚小至大批量 8-15 天交付,為香港中小零售品牌補上「高質中價」的關鍵一塊。</p>

<h2>香港零售市場對彩盒的真實需求</h2>
<p>香港零售精品店 (中環/上環/銅鑼灣/尖沙咀)、美妝護膚小店、文創 IP 周邊、禮品小店,單店起印量通常 500-3,000 個,新品牌首批 1,000 個,反應好加印 5,000-10,000 個。對彩盒的要求是:高質 (350g 挺度 + 4 色印刷精美)、合理價 (單枚 HK$1.5-3.0)、快交期 (8-15 天內)、可選燙金/UV/擊凸加值工藝提升品牌質感。拼版白卡彩盒正好對應這 4 個核心需求 — 免刀模費壓低成本、8 檔標準尺寸覆蓋 95% 零售 SKU、3 種盒型適配輕量到中等商品、4 種紙材 + 4 種加值工藝滿足品牌升級。</p>

<h2>4 種紙材 + 3 種盒型,覆蓋 95% 香港零售場景</h2>
<p>拼版白卡彩盒提供 4 種紙材選擇:</p>
<ul>
<li><strong>350g 單粉卡 (超高松)</strong>:挺度極佳、表面光滑、彩色印刷還原度高,適合美妝護膚、文創 IP 周邊、輕奢飾品;</li>
<li><strong>400g 單粉卡</strong>:比 350g 更挺、成本略高,適合較重或更高級感的精品 (茶葉禮盒、進口食品);</li>
<li><strong>375g 銀卡紙</strong>:銀色金屬光澤底材,適合科技配件、男士護理、汽車周邊;</li>
<li><strong>375g 鐳射銀卡</strong>:鐳射彩虹效果,適合美妝限量版、IP 限定款、節日禮盒。</li>
</ul>
<p>3 種盒型適配 95% 零售場景:</p>
<ul>
<li><strong>飛機盒 (Reverse Tuck Box)</strong>:最常見的對口蓋盒,結構簡單、生產快,適合茶葉、保健品、3C 配件;</li>
<li><strong>扣底盒 (Auto Lock Bottom Box)</strong>:底蓋自動扣合,組裝不用膠水,提升開箱體驗,適合禮品、食品、化妝品;</li>
<li><strong>雙插盒 (Straight Tuck Box)</strong>:上下口蓋同方向,展示效果好,適合輕量商品 (貼紙、徽章、文創小物)。</li>
</ul>

<h2>8 檔標準尺寸 + 4 種覆膜工藝 + 4 種加值工藝</h2>
<p>8 檔標準尺寸覆蓋 95% 香港零售 SKU (60×40×20 / 80×60×35 / 100×70×35 / 100×80×120 / 120×80×40 / 150×100×60 / 150×50×100 / 200×150×80 mm),無需額外開刀。覆膜工藝:啞膜 (柔和質感,適合文創、高端品牌) / 光膜 (鮮豔反光,適合美妝、食品)。加值工藝:燙金 / 燙銀 (高端禮盒首選,單件 +HK$0.5-1.5) / UV 局部 (提升品牌 logo 立體感) / 擊凸 / 壓凹 (觸感層次,文創 IP 周邊常用) / 貼膠片 (提升視覺效果)。銀卡類標配含印白墨 + 逆向 UV,鐳射銀卡可加鐳射底紋 + 局部 UV,提升品牌質感。</p>

<h2>500-10,000 枚量級對應推薦 + 8-15 天交期</h2>
<p>拼版白卡彩盒的 5 個量級對應推薦:</p>
<ul>
<li><strong>500 枚 (起印量)</strong>:適合新品牌首批試水,單枚 HK$1.5-2.5,8-15 天交期;</li>
<li><strong>1,000 枚</strong>:新品牌主流首批,單枚 HK$1.0-1.8,10-12 天交期;</li>
<li><strong>2,000 枚</strong>:反應好加印,單枚 HK$0.7-1.4,10-12 天交期;</li>
<li><strong>5,000 枚</strong>:成熟品牌補貨,單枚 HK$0.5-1.0,12-15 天交期;</li>
<li><strong>10,000 枚 (上限)</strong>:大品牌旺季備貨,單枚 HK$0.4-0.8,12-15 天交期。</li>
</ul>
<p>順豐本地 1-2 工作天送達香港 (港九新界),DHL/FedEx 全球 2-4 天送達歐美亞主要城市,海外華人圈 3-5 天到貨。500-10,000 枚靈活起印,8-15 天交期,100% 香港中小零售品牌預算首選。</p>

<h2>報價參考:5 檔 intuan 校準錨點</h2>
<p>拼版白卡彩盒 5 檔 intuan 校準錨點 (對齊 4 種紙材 + 3 種盒型均值,實際報價以最終規格為準):</p>
<table>
<thead><tr><th>數量</th><th>350g 單粉卡</th><th>400g 單粉卡</th><th>375g 銀卡</th><th>375g 鐳射銀卡</th></tr></thead>
<tbody>
<tr><td>500 個</td><td>HK$129 起</td><td>HK$145 起</td><td>HK$165 起</td><td>HK$189 起</td></tr>
<tr><td>1,000 個</td><td>HK$219</td><td>HK$249</td><td>HK$289</td><td>HK$329</td></tr>
<tr><td>2,000 個</td><td>HK$379</td><td>HK$439</td><td>HK$499</td><td>HK$579</td></tr>
<tr><td>5,000 個</td><td>HK$849</td><td>HK$979</td><td>HK$1,099</td><td>HK$1,249</td></tr>
<tr><td>10,000 個</td><td>HK$1,599</td><td>HK$1,849</td><td>HK$2,099</td><td>HK$2,379</td></tr>
</tbody>
</table>
<p>加值工藝另計:燙金 / UV 局部 +HK$0.5-1.5/件,擊凸 / 壓凹 +HK$0.8-2.0/件,貼膠片 +HK$1.0-2.5/件。海外客戶可選 USD 起價 (USD 25 起 for 500 pieces),日本客戶可選 JPY 含稅価格 (¥3,800 起 for 500 pieces)。同步對齊同類競爭對手,e-print 等香港本地印刷廠同款 350g 飛機盒 500 個報價約 HK$220-280,智印港拼版方案省 41-54%,零售天花板價對比優勢明顯。</p>

<h2>15+ 年 / 15,000+ 客戶 / 100+ 國家 · 智印港的品牌底氣</h2>
<p>智印港 (ZprintPro) 海德堡 6+1 印刷機 + HP Indigo 數碼機 + 馬天尼膠裝線全系列,15+ 年服務全球 15,000+ 客戶、100+ 國家。香港本地零售品牌、跨境電商 DTC、美妝護膚新銳、文創 IP 周邊,均是我們的長期合作夥伴。免費設計打稿 (Free Design Mockup)、免費樣辦確認 (Free Sample Approval)、順豐本地 + DHL 全球 2-4 天到貨。詳細產品規格 / FAQ / 報價可到 <a href="/zh-hk/product/gang-run-card-boxes/">拼版白卡彩盒</a> 專頁查閱。</p>

<h2>4 條香港零售品牌老闆常見 FAQ</h2>
<details><summary><strong>拼版彩盒同訂製彩盒有咩分別?</strong></summary>
<p>訂製彩盒需要為單一品牌單獨開刀模 (刀模費 HK$3,000-8,000,起印 1,000 個以上才划算);拼版白卡彩盒使用智印港 8 檔標準尺寸 + 3 種標準盒型的共用刀模,免刀模費、免排版費,500 個起印,單枚成本直降 40-60%。新品牌首批 / 小批量 / 試水款非常適合拼版方案,反應好加印或日後訂製再升級。如需升級訂製,可參考 <a href="/zh-hk/product/white-card-boxes/">白卡彩盒定製</a> 專頁。</p>
</details>
<details><summary><strong>拼版彩盒點解 8-15 天交期比較長?</strong></summary>
<p>拼版是將多個客戶的訂單拼到同一塊大版上同時印刷,需要等待湊版時間 (通常 3-5 天) + 印刷 2-3 天 + 表面加工 1-2 天 + 盒型成型 1-2 天 + 品質檢驗 1 天,合計 8-15 天。如實標註,不接急件 — 如果趕時間,建議選白卡摺疊盒 (5-7 天) 或磁吸天地盒 (7-10 天,起印 1,000 個),但單價會略高 20-30%。亦可同步落單 <a href="/zh-hk/product/mailer-boxes/">快遞盒</a> 提前預備跨境電商出貨包裝,5-7 天交付,3 層 B 瓦楞抗壓。</p>
</details>
<details><summary><strong>拼版彩盒可以印白墨 / 逆向 UV 嗎?</strong></summary>
<p>可以。375g 銀卡紙和 375g 鐳射銀卡標配含印白墨 (讓銀色底材上能呈現彩色圖案),可加逆向 UV (局部 UV 配合霧面底材,提升對比立體感),適合美妝限量版、IP 限定款、節日禮盒的高級感包裝。350g/400g 單粉卡本身已是白色底材,不需印白墨,可選燙金 / UV 局部 / 擊凸等加值工藝。詳情可參考 <a href="/zh-hk/product/magnetic-closure-gift-box/">磁吸天地盒</a> 對比高端方案。</p>
</details>
<details><summary><strong>香港邊度可以落單?有 WhatsApp 嗎?</strong></summary>
<p>智印港 (ZprintPro) 香港本地客戶可透過 WhatsApp (+86 198 8085 1334) 直接對接設計師 + 報價,工作日 1 小時內回覆;亦可到 <a href="/zh-hk/quote/">報價計算機</a> 即時估算,或 <a href="/zh-hk/contact/">聯絡我們</a> 預約樣辦。海外客戶 (跨境電商 / 美妝 / 文創) 可走 en / ja 站點,DHL/FedEx 全球 2-4 天到貨,順豐本地 1-2 個工作天到港九新界。</p>
</details>

<h2>立即落單 · WhatsApp / 報價計算機</h2>
<p>智印港拼版白卡彩盒,500-10,000 枚靈活起印,8-15 天交付,免刀模費 + 免排版費,4 種紙材 + 3 種盒型 + 8 檔標準尺寸,覆蓋 95% 香港零售精品 / 美妝護膚 / 文創 IP / 禮品場景。立即 WhatsApp (+86 198 8085 1334) 或到 <a href="/zh-hk/quote/">報價計算機</a> 即時估算,免費設計打稿、免費樣辦確認、順豐本地 + DHL 全球 2-4 天到貨。</p>"""

# ============ en 440+ 词 (US sharp hooks 集中) ============
EN = """<h2>Gang-Run White Card Boxes: Budget-Friendly 100-MOQ Starter for US Small Brands</h2>
<p>US retail boutique, skincare, IP merchandise, and gift brand owners face a familiar dilemma when ordering 100-1,000 premium boxes: custom boxes need a $400-1,000 die-cut fee (only worth it for 1,000+ units), white-card folding cartons deliver in 5-7 days but feel flimsy, and magnetic closure boxes need a 1,000-piece MOQ that is too heavy for a new launch. ZprintPro's Gang-Run White Card Boxes solve this — shared standard die-cuts, NO die-cut fee, NO setup fee, 40-60% lower unit cost, 100-10,000 piece runs, 8-15 day production, the missing middle for US small brands.</p>

<h2>US Retail Market Reality Check</h2>
<p>US retail boutique, skincare, IP merchandise, and gift brands typically order 500-3,000 boxes for a first run and 5,000-10,000 for replenishment. Their needs are clear: premium feel (350gsm rigidity + 4C print), reasonable price ($0.20-0.40 per box), fast turnaround (8-15 days), and the option to add foil / UV / embossing for brand upgrade. Gang-run white card boxes hit all four — no die-cut fee cuts cost, 8 standard sizes cover 95% of retail SKUs, 3 box styles adapt to lightweight to medium products, and 4 paper stocks + 4 finishing options elevate brand perception.</p>

<h2>4 Paper Stocks + 3 Box Styles for 95% US Retail Scenarios</h2>
<p>Choose from 4 paper stocks:</p>
<ul>
<li><strong>350gsm C1S (Single-Side Coated)</strong>: excellent rigidity, smooth surface, sharp color reproduction — ideal for skincare, IP merchandise, lightweight jewelry;</li>
<li><strong>400gsm C1S</strong>: thicker and more rigid for premium feel — fits heavier or upscale items (tea, imported food);</li>
<li><strong>375gsm Silver Card</strong>: silver metallic base — perfect for tech accessories, men's grooming, auto merchandise;</li>
<li><strong>375gsm Holographic Silver Card</strong>: rainbow shimmer for limited-edition skincare, IP collectibles, holiday gift boxes.</li>
</ul>
<p>3 box styles adapt to 95% of retail use cases:</p>
<ul>
<li><strong>Reverse Tuck Box (Airplane Box)</strong>: classic opposite-end tuck, simple structure, fast production — fits tea, supplements, 3C accessories;</li>
<li><strong>Auto Lock Bottom Box</strong>: snap-lock base, no glue assembly, better unboxing — fits gifts, food, cosmetics;</li>
<li><strong>Straight Tuck Box</strong>: same-direction top and bottom tuck, display-friendly — fits lightweight items (stickers, badges, small IP goods).</li>
</ul>

<h2>8 Standard Sizes + 4 Lamination + 4 Finishing Options</h2>
<p>8 standard sizes cover 95% of US retail SKUs (60×40×20 / 80×60×35 / 100×70×35 / 100×80×120 / 120×80×40 / 150×100×60 / 150×50×100 / 200×150×80 mm), no custom die-cut required. Lamination: matte (soft, premium feel — fits creative, upscale brands) / gloss (vivid, reflective — fits skincare, food). Finishing: foil stamping / silver foil (premium gift box first choice, +$0.07-0.20/box) / spot UV (logo depth) / embossing / debossing (tactile depth, IP merchandise favorite) / laminate film. Silver card includes white ink + reverse UV; holographic silver supports shimmer base + spot UV for premium brand appeal.</p>

<h2>100-10,000 Piece Tiers + 8-15 Day Production + Made for USA</h2>
<p>5 production tiers for gang-run white card boxes:</p>
<ul>
<li><strong>100 pieces (start MOQ)</strong>: brand launch trial, $0.20-0.40/box, 8-15 day production;</li>
<li><strong>500 pieces</strong>: typical new-brand first run, $0.13-0.25/box, 10-12 day production;</li>
<li><strong>1,000 pieces</strong>: standard new-brand MOQ, $0.09-0.18/box, 10-12 day production;</li>
<li><strong>5,000 pieces</strong>: mature brand replenishment, $0.07-0.13/box, 12-15 day production;</li>
<li><strong>10,000 pieces (ceiling)</strong>: peak-season stocking, $0.05-0.10/box, 12-15 day production.</li>
</ul>
<p>FedEx Ground delivers in 5-7 days within the US (lower 48); DHL Express delivers in 2-4 days globally with tracking; FOB Asia factory shipping available for bulk orders. 100-MOQ starter, 8-15 day production, Made for USA small business — every ZprintPro gang-run box is FDA-compliant, FSC-certified, and ships Free over $99 USA with Free design mockup and Free sample approval.</p>

<h2>Pricing Reference: 5-Tier Intuan Calibrated Anchors</h2>
<p>5-tier intuan calibrated pricing (averaged across 4 stocks + 3 box styles; final quote by spec):</p>
<table>
<thead><tr><th>Quantity</th><th>350gsm C1S</th><th>400gsm C1S</th><th>375gsm Silver</th><th>375gsm Holographic</th></tr></thead>
<tbody>
<tr><td>500 pieces</td><td>USD 25</td><td>USD 28</td><td>USD 32</td><td>USD 37</td></tr>
<tr><td>1,000 pieces</td><td>USD 42</td><td>USD 48</td><td>USD 56</td><td>USD 64</td></tr>
<tr><td>2,000 pieces</td><td>USD 73</td><td>USD 85</td><td>USD 97</td><td>USD 113</td></tr>
<tr><td>5,000 pieces</td><td>USD 165</td><td>USD 190</td><td>USD 213</td><td>USD 242</td></tr>
<tr><td>10,000 pieces</td><td>USD 310</td><td>USD 358</td><td>USD 407</td><td>USD 461</td></tr>
</tbody>
</table>
<p>Finishing surcharges: foil / spot UV +$0.07-0.20/box, embossing / debossing +$0.10-0.30/box, laminate film +$0.13-0.35/box. Compared with US custom packaging quotes ($0.45-0.85/box for 500-piece custom runs with die-cut fees), ZprintPro gang-run boxes save 41-54% on equivalent specs, ideal for US DTC brands targeting Made for USA small business positioning.</p>

<h2>15+ Years / 15,000+ Clients / 100+ Countries · ZprintPro's Brand Strength</h2>
<p>ZprintPro runs Heidelberg 6+1 offset presses, HP Indigo digital presses, and Martini perfect-binding lines, serving 15,000+ clients across 100+ countries for 15+ years. From US DTC brands to e-commerce startups to IP merchandise studios, our partners span retail boutique, skincare, creator economy, and gift categories. Free Design Mockup, Free Sample Approval, FedEx Ground 5-7 day USA delivery, and DHL Express 2-4 day global shipping. See full product specs and FAQ on the <a href="/en/product/gang-run-card-boxes/">Gang-Run White Card Boxes</a> product page.</p>

<h2>4 US Retail Brand Owner FAQs</h2>
<details><summary><strong>What is the difference between gang-run and custom boxes?</strong></summary>
<p>Custom boxes require a single-brand-exclusive die-cut mold ($400-1,000 die-cut fee, only worth it for 1,000+ units). Gang-run white card boxes use ZprintPro's 8 standard sizes + 3 standard box styles with shared die-cuts, no die-cut fee, no setup fee, 100-MOQ starter, 40-60% lower unit cost. New brand first run / small batch / trial products are perfect for the gang-run plan; scale up to custom after validation. For custom upgrade, see <a href="/en/product/white-card-boxes/">white card custom boxes</a>.</p>
</details>
<details><summary><strong>Why is the gang-run turnaround 8-15 days longer than custom?</strong></summary>
<p>Gang-run plates multiple customer orders on one large sheet — waiting for plate-fill (typically 3-5 days) + printing 2-3 days + surface finishing 1-2 days + box forming 1-2 days + quality inspection 1 day = 8-15 days total. We do NOT accept rush orders. If you need faster delivery, choose white-card folding cartons (5-7 days) or magnetic closure boxes (7-10 days, 1,000-MOQ) at 20-30% higher unit cost. You can also pre-order <a href="/en/product/mailer-boxes/">shipping mailers</a> for cross-border e-commerce, 5-7 day delivery with 3-ply B-flute durability.</p>
</details>
<details><summary><strong>Can gang-run boxes print white ink or reverse UV?</strong></summary>
<p>Yes. 375gsm silver card and 375gsm holographic silver card include white ink as standard (so the silver base supports full-color graphics), and reverse UV is available (spot UV over matte substrate for contrast depth) — ideal for limited-edition skincare, IP collectibles, holiday gift box premium packaging. 350gsm / 400gsm C1S is already white-based, no white ink needed, but supports foil / spot UV / embossing finishing. Compare to <a href="/en/product/magnetic-closure-gift-box/">magnetic closure gift box</a> for premium positioning.</p>
</details>
<details><summary><strong>How do I order? WhatsApp or online quote?</strong></summary>
<p>US customers can message ZprintPro via WhatsApp (+86 198 8085 1334) to reach designers + get a quote, with reply within 1 business hour; or use the <a href="/en/quote/">quote calculator</a> for instant estimate, or visit <a href="/en/contact/">contact us</a> to request a free sample. Cross-border e-commerce / skincare / IP brands can also order via FedEx Ground (5-7 day USA) or DHL Express (2-4 day global) with full tracking.</p>
</details>

<h2>Order Now · WhatsApp / Quote Calculator</h2>
<p>ZprintPro gang-run white card boxes — 100-10,000 piece flexible MOQ, 8-15 day production, no die-cut fee + no setup fee, 4 paper stocks + 3 box styles + 8 standard sizes, covering 95% of US retail boutique / skincare / IP merchandise / gift scenarios. Message WhatsApp (+86 198 8085 1334) or use the <a href="/en/quote/">quote calculator</a> for instant estimate, with Free Design Mockup, Free Sample Approval, FedEx Ground 5-7 day USA, and DHL Express 2-4 day global delivery.</p>"""

# ============ ja 440+ 词 (沖縄/北海道/ヤマト運輸) ============
JA = """<h2>合版ホワイトカードボックス:中小ブランド 100 個から予算首选</h2>
<p>日本の小売ブティック、スキンケア、IP 商品、ギフトブランドオーナー様、100-1,000 個のプレミアム箱を発注する際、いつも同じ悩みを抱えます:カスタム箱は型代 ¥40,000-100,000 が必要 (1,000 個以上でないと元が取れない)、白カード折りたたみ箱は 5-7 日納品だが安っぽい、マグネット式箱は 1,000 個 MOQ で新ブランドには重い。智印港 (ZprintPro) の合版ホワイトカードボックスは、この問題を解決 — 標準型共用、型代不要、版代不要、単価 40-60% 削減、100-10,000 個小〜大ロット、8-15 日生産、日本中小ブランドの「中価格帯プレミアム」を埋めます。</p>

<h2>日本小売市場のリアルな需要</h2>
<p>日本の小売ブティック、スキンケア、IP 商品、ギフトブランドは通常 500-3,000 個を初回発注、好反応なら 5,000-10,000 個を追加。箱への要望は明確:高質感 (350gsm 剛性 + 4C 印刷)、適正価格 (単価 ¥150-300/箱)、短期納品 (8-15 日)、箔押し/UV/エンボス仕上げオプション。合版ホワイトカードボックスは 4 つの要件を全て満たす — 型代不要でコスト削減、8 種標準サイズで 95% SKU カバー、3 種箱型で軽量〜中量商品対応、4 種素材 + 4 種仕上げでブランドアップグレード。</p>

<h2>4 種素材 + 3 種箱型,日本小売 95% シーン対応</h2>
<p>4 種素材から選択:</p>
<ul>
<li><strong>350gsm 単粉カード (C1S)</strong>:剛性极佳、表面光滑、彩色印刷再現度高 — スキンケア、IP 商品、轻奢饰品に最適;</li>
<li><strong>400gsm 単粉カード</strong>:350gsm より剛性アップ、コストやや高 — 重量または upscale 商品 (茶葉、輸入食品);</li>
<li><strong>375gsm 銀カード</strong>:銀色金属光泽ベース — 科技配件、男士护理、汽車周边に最適;</li>
<li><strong>375gsm ホログラム銀カード</strong>:レインボー shimmer — 限定版スキンケア、IP 限定品、节日ギフトボックスに最適。</li>
</ul>
<p>3 種箱型,95% 零售シーン適応:</p>
<ul>
<li><strong>飛行機箱 (Reverse Tuck Box)</strong>:古典的な対口蓋箱、構造簡単、生産早い — 茶葉、保健品、3C 配件;</li>
<li><strong>ロック底箱 (Auto Lock Bottom Box)</strong>:底蓋自動ロック、組立不要、開封体験向上 — ギフト、食品、化粧品;</li>
<li><strong>両挿箱 (Straight Tuck Box)</strong>:上下口蓋同方向、展示効果佳 — 軽量商品 (ステッカー、バッジ、小型 IP グッズ)。</li>
</ul>

<h2>8 標準サイズ + 4 種ラミネート + 4 種仕上げ</h2>
<p>8 標準サイズで 95% SKU カバー (60×40×20 / 80×60×35 / 100×70×35 / 100×80×120 / 120×80×40 / 150×100×60 / 150×50×100 / 200×150×80 mm)、追加型代不要。ラミネート:マット (柔らかな質感、クリエイティブ・upscale ブランド向き) / 光沢 (鮮やか反射、スキンケア・食品向き)。仕上げ:箔押し / 銀箔 (プレミアムギフトボックス首选、+¥8-25/箱) / スポット UV (ロゴ立体感) / エンボス / デボス (触感層、IP 商品人気) / フィルムラミネート。銀カードは白インク + 逆 UV 標準装備、ホログラム銀カードは shimmer ベース + スポット UV で高級感アップ。</p>

<h2>100-10,000 個量級 + 8-15 日生産 + 日本全国送料無料</h2>
<p>合版ホワイトカードボックス 5 段階量級:</p>
<ul>
<li><strong>100 個 (start MOQ)</strong>:ブランド初試投、単価 ¥250-450/箱、8-15 日生産;</li>
<li><strong>500 個</strong>:新ブランド初回主流、単価 ¥150-300/箱、10-12 日生産;</li>
<li><strong>1,000 個</strong>:新ブランド MOQ 標準、単価 ¥100-200/箱、10-12 日生産;</li>
<li><strong>5,000 個</strong>:成熟ブランド補給、単価 ¥80-150/箱、12-15 日生産;</li>
<li><strong>10,000 個 (上限)</strong>:繁忙季節備貨、単価 ¥60-110/箱、12-15 日生産。</li>
</ul>
<p>沖縄・北海道も同料金、ヤマト運輸で全国 1-3 日配送、DHL 国際配送 2-4 日で世界中へ。100-MOQ 起点、8-15 日生産、$99 以上で全国送料込み、無料デザイン モックアップ、無料サンプル承認、FDA 準拠、FSC 認証素材 — 全て日本中小ブランド予算首选。</p>

<h2>価格参考:5 段階 intuan 校正アンカー</h2>
<p>5 段階 intuan 校正価格 (4 素材 + 3 箱型平均値、最終見積は仕様による):</p>
<table>
<thead><tr><th>数量</th><th>350gsm C1S</th><th>400gsm C1S</th><th>375gsm 銀</th><th>375gsm ホログラム</th></tr></thead>
<tbody>
<tr><td>500 個</td><td>¥3,800</td><td>¥4,200</td><td>¥4,800</td><td>¥5,500</td></tr>
<tr><td>1,000 個</td><td>¥6,300</td><td>¥7,200</td><td>¥8,400</td><td>¥9,600</td></tr>
<tr><td>2,000 個</td><td>¥10,950</td><td>¥12,750</td><td>¥14,550</td><td>¥16,950</td></tr>
<tr><td>5,000 個</td><td>¥24,750</td><td>¥28,500</td><td>¥31,950</td><td>¥36,300</td></tr>
<tr><td>10,000 個</td><td>¥46,500</td><td>¥53,700</td><td>¥61,050</td><td>¥69,150</td></tr>
</tbody>
</table>
<p>仕上げ追加:箔押し / スポット UV +¥10-30/箱、エンボス / デボス +¥15-45/箱、フィルムラミネート +¥20-50/箱。日本のカスタム包装見積 (500 個カスタム箱で単価 ¥600-1,200、型代別途) と比較して、智印港合版箱は同等仕様で 41-54% コスト削減、日本 DTC ブランド予算首选。</p>

<h2>15+ 年 / 15,000+ クライアント / 100+ カントリー · 智印港のブランド力</h2>
<p>智印港 (ZprintPro) はハイデルベルグ 6+1 オフセット印刷機、HP Indigo デジタル印刷機、マルティニ無線綴じラインを保有、15+ 年で 100+ カントリー 15,000+ クライアントにサービス。日本の小売ブティック、スキンケア、IP 商品、ギフトブランドから越境 EC スタートアップまで、長期パートナーです。無料デザイン モックアップ、無料サンプル承認、沖縄・北海道含む全国送料無料、ヤマト運輸 1-3 日納品、DHL 国際 2-4 日配送。詳細仕様 / FAQ / 見積は <a href="/ja/product/gang-run-card-boxes/">合版ホワイトカードボックス</a> 製品ページ参照。</p>

<h2>4 つの日本小売ブランドオーナー FAQ</h2>
<details><summary><strong>合版と完全オリジナルの違いは?</strong></summary>
<p>カスタム箱は単一ブランド専用型が必要 (型代 ¥40,000-100,000、1,000 個以上でないと元が取れない)。合版ホワイトカードボックスは智印港 8 標準サイズ + 3 標準箱型の共用型使用、型代不要、版代不要、100 個から MOQ、単価 40-60% 削減。新ブランド初回 / 小ロット / 試作品に最適、好反応後にカスタムアップグレード可能。カスタム upgrade は <a href="/ja/product/white-card-boxes/">白カードカスタム箱</a> 参照。</p>
</details>
<details><summary><strong>合版納期 8-15 日が長い理由は?</strong></summary>
<p>合版は複数顧客の注文を大型シートに同時印刷するため、版凑待ち (通常 3-5 日) + 印刷 2-3 日 + 表面仕上げ 1-2 日 + 箱型成型 1-2 日 + 品質検査 1 日 = 合計 8-15 日。短期納品は承っておりません。お急ぎの場合は白カード折りたたみ箱 (5-7 日) またはマグネット式箱 (7-10 日、1,000 MOQ) を選択、単価 20-30% 高。または <a href="/ja/product/mailer-boxes/">配送箱</a> を同時発注で越境 EC 出荷包装事前準備、5-7 日納品、3 層 B フルート耐久性。</p>
</details>
<details><summary><strong>合版箱は白インク / 逆 UV 印刷できますか?</strong></summary>
<p>はい。375gsm 銀カードと 375gsm ホログラム銀カードは白インク標準装備 (銀ベースでフルカラー印刷可能)、逆 UV (マット下地へのスポット UV でコントラスト立体感) も対応 — 限定版スキンケア、IP コレクティブ、节日ギフトボックス高級包装に最適。350gsm / 400gsm C1S は元々白ベース、白インク不要、箔押し / スポット UV / エンボス仕上げ対応。プレミアム仕様比較は <a href="/ja/product/magnetic-closure-gift-box/">マグネット式ギフトボックス</a> 参照。</p>
</details>
<details><summary><strong>注文方法は?ヤマト便?</strong></summary>
<p>日本のお客様は WhatsApp (+86 198 8085 1334) でデザイナー + 見積に直接お問合せ、1 営業日以内に返信;<a href="/ja/quote/">見積計算機</a> で即時見積もり、または <a href="/ja/contact/">お問い合わせ</a> で無料サンプル依頼可能。越境 EC / スキンケア / IP ブランドはヤマト運輸 (沖縄・北海道含む全国 1-3 日) + DHL 国際 (2-4 日) で追跡付き配送。</p>
</details>

<h2>今すぐ注文 · WhatsApp / 見積計算機</h2>
<p>智印港合版ホワイトカードボックス — 100-10,000 個柔軟 MOQ、8-15 日生産、型代不要 + 版代不要、4 種素材 + 3 種箱型 + 8 標準サイズで 95% 日本小売ブティック / スキンケア / IP 商品 / ギフトシーンカバー。今すぐ WhatsApp (+86 198 8085 1334) または <a href="/ja/quote/">見積計算機</a> で即時見積もり、無料デザイン モックアップ、無料サンプル承認、沖縄・北海道含む全国送料込み、ヤマト運輸 1-3 日納品対応。</p>"""

# 写文件
def main():
    targets = {
        "zh-hk.json": ("gang-run-card-boxes-hk-guide", ZH_HK),
        "en.json": ("gang-run-card-boxes-hk-guide", EN),
        "ja.json": ("gang-run-card-boxes-hk-guide", JA),
    }
    for fname, (slug, content) in targets.items():
        fpath = JSON_DIR / fname
        with open(fpath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        data[slug] = {"content": content}
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"  ✓ {fname} → {slug} chars={len(content)}")
    # 字数统计
    import re
    def count(text, locale):
        plain = re.sub(r'<[^>]+>', ' ', text)
        plain = re.sub(r'\s+', ' ', plain).strip()
        if locale == 'zh-hk':
            return len(plain)  # 字
        else:
            return len(plain.split())  # 词
    print(f"\n  📊 zh-hk chars: {count(ZH_HK, 'zh-hk')} (target 1200+)")
    print(f"  📊 en words: {count(EN, 'en')} (target 400+)")
    print(f"  📊 ja words: {count(JA, 'ja')} (target 400+)")

if __name__ == "__main__":
    main()
