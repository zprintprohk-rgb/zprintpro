"""
V3.7 DoD 4: 2 篇新 wedding blog 本地备好 (K3 21:12 key 后 1 push 一次性上线)
- DoD 4a: en wedding-invitation-cost-guide (600-900 词, 主词: wedding invitation cost)
- DoD 4b: zh-hk wedding-table-card-printing-guide (1500-2500 字, 主词: 枱卡印刷)

V3.7 v3 标准:
- 字数分级 (商业指南级)
- GEO 硬条款: 答案前置 + 疑问句 H2 + 数字列表
- targetKeywords 字段 (1 主词 + 3-5 长尾) - 入 BlogPostMeta frontmatter (新字段)
- 内链 ≥5
- FAQ ≥4
- zh-hk 100% 繁体
- NAP §13.10 严判 0 违规
- WhatsApp 198 统一

写入文件:
- src/data/blog-posts.ts: 2 新 lpWeddingXxx 块 (6 字段 targetKeywords)
- src/data/blog-data/{zh-hk,en,ja}.json: 2 content 块 (3 locale 同步)
"""

import json
import re
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')

# ============================================================
# LP_BLOCK 1: lpWeddingInvitationCost (en cost guide 主词)
# ============================================================
LP_INVITATION_COST = """
const lpWeddingInvitationCost: BlogPostMeta = {
  slug: 'wedding-invitation-cost-guide',
  categoryKey: 'paper-bags',
  source: 'daily',
  date: '2026-08-20',
  targetKeywords: {
    primary: 'wedding invitation cost',
    secondary: ['how much do wedding invitations cost', 'average cost of wedding invitations', 'wedding invitation pricing 2026', 'cheap wedding invitations bulk', 'custom wedding invitation price'],
  },
  title: {
    'zh-hk': '美國婚禮邀請卡 2026 成本指南 · 50-500 份 4 檔真實價格 + 預算規劃 | ZprintPro',
    en: 'Wedding Invitation Cost Guide 2026: Real Pricing for 50-500 Piece Runs, Budget Breakdown & Savings Tips | ZprintPro',
    ja: '結婚式招待状 コストガイド 2026：50〜500部のリアル価格 + 予算内訳 + 節約術 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '美國新婚夫婦、婚禮策劃師、預算規劃師必睇。2026 年美國婚禮邀請卡 4 檔真實成交價 ($0.85-3.20 / 份),50-500 份批量成本對比,設計費、燙金、加名、印刷 4 大成本拆解,智印港 DHL 全球 2-4 天直送 50+ 國家。',
    en: 'Couples, planners, and budget advisors — 2026 real pricing for 50-500 piece wedding invitation runs ($0.85-3.20/piece). 4 quantity tiers, 4 cost components (design + foil + names + printing), DHL global 2-4 days from Asia factory, 50+ countries.',
    ja: 'ご婚約カップル・プランナー・予算プランナーへ。2026年米国結婚式招待状リアル価格 ($0.85-3.20 / 枚)、50〜500部4段階、設計費・箔押し・名入れ・印刷4大コスト、DHL全世界2-4日配送、50ヶ国対応。',
  },
};
"""

# ============================================================
# LP_BLOCK 2: lpWeddingTableCard (zh-hk 枱卡/席位图 主词)
# ============================================================
LP_TABLE_CARD = """
const lpWeddingTableCard: BlogPostMeta = {
  slug: 'wedding-table-card-printing-guide',
  categoryKey: 'paper-bags',
  source: 'daily',
  date: '2026-08-20',
  targetKeywords: {
    primary: '枱卡印刷',
    secondary: ['婚宴枱卡', '席位圖印刷', '中式枱卡', '婚禮枱卡設計', '枱卡 MOQ'],
  },
  title: {
    'zh-hk': '婚宴枱卡 / 席位圖印刷指南 2026 · 100-500 張材質工藝 + 4 檔實價 | 智印港 ZprintPro',
    en: 'Wedding Table Card & Seating Chart Printing Guide 2026: 100-500 Piece Pricing, Materials & Design | ZprintPro',
    ja: '結婚式 テーブルカード・席次表印刷ガイド 2026：100〜500枚 価格・素材・デザイン | ZprintPro',
  },
  excerpt: {
    'zh-hk': '準新人、婚禮統籌師、宴會場地必睇。2026 龍年婚宴枱卡 / 席位圖 / 桌牌 / 席次表 4 大場景,100-500 張 4 檔實價,白卡紙 / 珠光紙 / 棉紙 / 燙金紙 4 種材質對比,中英文 / 數字座位 / 客製化圖案 3 大設計風格,智印港 5-10 個工作天交付。',
    en: 'Couples, wedding planners, and venues — 2026 dragon year guide for wedding table cards, seating charts, place cards, and escort cards. 4 quantity tiers (100/200/500/1000), 4 materials, 3 design styles, 5-10 working day delivery from Asia factory.',
    ja: 'ご婚約カップル・ウェディングプランナー・式場様へ。2026辰年ブライダル テーブルカード・席次表・場札・席札4大シーン、100〜500枚4段階価格、素材4種・デザイン3スタイル、5-10営業日納品。',
  },
};
"""


# ============================================================
# blog-data/en.json content: wedding-invitation-cost-guide (700 词 V3.7 v3)
# ============================================================
EN_INVITATION_COST = """<p>How much do wedding invitations really cost in 2026? Real pricing for 50-piece, 100-piece, 300-piece, and 500-piece custom wedding invitation runs ranges from $0.85 to $3.20 per piece, with the average couple spending $150-300 on invitations for a 100-150 guest wedding. ZprintPro supplies <a href="/category/wedding-invitations/">custom wedding invitations</a> with foil stamping, duplex paper, and personalized names from Asia factory, 50-500 piece small-batch runs, DHL global 2-4 day delivery to 50+ countries.</p>

<h2>What is the average cost of wedding invitations in 2026?</h2>
<p>The 2026 average wedding invitation cost breaks into 4 quantity tiers, with per-piece price dropping 60-75% as quantity rises:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>50 pieces (small wedding / trial):</strong> $2.30-3.20 / piece, $115-160 total — most expensive per unit, but lowest absolute cost</li><li><strong>100 pieces (mid-size wedding):</strong> $1.55-2.30 / piece, $155-230 total — 25% off 50-tier, most popular starting point</li><li><strong>300 pieces (large wedding):</strong> $1.05-1.55 / piece, $315-465 total — 50% off 50-tier, sweet spot for 150-300 guests</li><li><strong>500 pieces (extra-large or planner stock):</strong> $0.65-1.05 / piece, $325-525 total — 70% off 50-tier, best per-piece value</li></ol>

<h2>What are the 4 main cost components of wedding invitations?</h2>
<p>Custom wedding invitation costs come from 4 components. Understanding each helps you control your budget:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>Base printing (50-60% of total cost):</strong> CMYK or Pantone color printing on 250-350g white card / pearl / linen / cotton paper. Standard finish includes duplex lamination. $0.40-1.05/piece at 100-tier.</li><li><strong>Foil stamping (15-25%):</strong> Gold / silver / rose gold / champagne gold foil for names, dates, monograms. Adds $0.13-0.40/piece per foil layer. Most invitations have 1 foil layer; luxury has 2-3.</li><li><strong>Personalization (10-20%):</strong> Per-guest name printing requires variable data printing. Adds $0.13-0.40/piece. If each guest has a unique name + table number, this scales linearly with quantity.</li><li><strong>Design setup (5-10% of total or $50-200 flat):</strong> One-time design fee for custom artwork. ZprintPro includes free design with 100+ piece orders, otherwise $50-150 per design.</li></ol>

<h2>How does wedding invitation cost vary by material?</h2>
<p>Material choice adds $0.13-0.65/piece beyond white card baseline. The 4 most common materials in 2026 US wedding invitation market:</p>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Material</th><th class="border p-2 text-left">Weight</th><th class="border p-2 text-left">Upcharge (USD/piece)</th><th class="border p-2 text-left">Best For</th></tr></thead><tbody><tr><td class="border p-2">White card</td><td class="border p-2">250-350g</td><td class="border p-2">Base</td><td class="border p-2">Western standard / budget</td></tr><tr><td class="border p-2">Pearl paper</td><td class="border p-2">250-300g</td><td class="border p-2">+0.25-0.50</td><td class="border p-2">Chinese luxury / evening</td></tr><tr><td class="border p-2">Linen paper</td><td class="border p-2">250-300g</td><td class="border p-2">+0.25-0.50</td><td class="border p-2">Western / church wedding</td></tr><tr><td class="border p-2">Cotton paper</td><td class="border p-2">250-300g</td><td class="border p-2">+0.40-0.65</td><td class="border p-2">Church / forest / literary</td></tr><tr><td class="border p-2">Foil-ready paper</td><td class="border p-2">250-300g</td><td class="border p-2">+0.13-0.40</td><td class="border p-2">Foil invitation first choice</td></tr></tbody></table>

<h2>What finishing options add the most cost?</h2>
<p>The 6 most common finishing options and their cost impact at 100-piece tier:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>Spot UV:</strong> +$0.07-0.20/piece. Highlights logo or monogram area. Often paired with foil for layered effect.</li><li><strong>Emboss / deboss:</strong> +$0.13-0.32/piece. 3D tactile feel. Dragon-phoenix emboss = Chinese luxury signature, adds +$0.20/piece over flat foil.</li><li><strong>Duplex (double layer):</strong> +$0.25-0.50/piece. Two paper layers laminated together. Common in Chinese invitations, adds perceived weight.</li><li><strong>Laser engraving:</strong> +$0.40-0.80/piece. Fine patterns cut through top paper layer. Western luxury / high-end invitations.</li><li><strong>Pantone spot color:</strong> +$0.13-0.25/piece. Exact brand color match. Wedding theme color matching.</li><li><strong>Edge foiling:</strong> +$0.30-0.50/piece. Foil on the 3 edges of the card. High-end modern look.</li></ol>

<h2>How to save 30-50% on wedding invitation cost?</h2>
<p>5 proven budget-saving strategies for 2026 weddings:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>Order 300+ pieces instead of 100:</strong> Saves 50% per piece. Use extras for keepsakes, thank-you cards, or save-the-dates.</li><li><strong>Skip duplex lamination:</strong> Saves $0.25-0.50/piece. Use thicker 350g+ card stock instead.</li><li><strong>Use pearl or linen over cotton:</strong> Pearl and linen give 80% of cotton's tactile feel at 50% of the upcharge.</li><li><strong>Single foil layer instead of 2-3:</strong> Most luxury feel comes from 1 well-placed foil. Multi-layer adds 1-2 days production + 0.40-0.80/piece.</li><li><strong>Standard CMYK instead of Pantone:</strong> Saves $0.13-0.25/piece. Reserve Pantone for true brand color matching.</li></ol>

<h2>What's included vs extra in wedding invitation pricing?</h2>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Component</th><th class="border p-2 text-left">Included?</th><th class="border p-2 text-left">Notes</th></tr></thead><tbody><tr><td class="border p-2">White card 250g</td><td class="border p-2">Yes (base)</td><td class="border p-2">Standard 250g white card stock</td></tr><tr><td class="border p-2">CMYK color printing</td><td class="border p-2">Yes</td><td class="border p-2">4-color process on both sides</td></tr><tr><td class="border p-2">1 foil layer (gold/silver)</td><td class="border p-2">Yes (1 layer)</td><td class="border p-2">Names, date, or monogram</td></tr><tr><td class="border p-2">Duplex lamination</td><td class="border p-2">Yes (1 duplex)</td><td class="border p-2">Front-to-back paper lamination</td></tr><tr><td class="border p-2">Free design service</td><td class="border p-2">Yes (100+ pieces)</td><td class="border p-2">Custom artwork included</td></tr><tr><td class="border p-2">Digital proof</td><td class="border p-2">$25-65</td><td class="border p-2">1 physical sample before production</td></tr><tr><td class="border p-2">Express production (5 days)</td><td class="border p-2">+30%</td><td class="border p-2">Standard is 7-10 days</td></tr><tr><td class="border p-2">Rush shipping (DHL Express)</td><td class="border p-2">+$15-50</td><td class="border p-2">2-4 days instead of 7-10 days</td></tr></tbody></table>

<h2>5 Hong Kong Wedding Invitation Cost FAQ</h2>
<p><strong>Q1: What's the cheapest wedding invitation cost option?</strong><br/>A: 50 pieces at base white card with 1 foil layer runs $0.65-1.05/piece. For budget weddings, digital printing (no foil) can drop to $0.40-0.60/piece.</p>
<p><strong>Q2: How much should I budget for 150 wedding invitations?</strong><br/>A: 150 pieces typically costs $180-280 with foil + duplex. For luxury (3 foil layers + laser engraving + cotton paper), budget $350-500.</p>
<p><strong>Q3: Are digital wedding invitations cheaper than printed?</strong><br/>A: Digital (email/PDF) costs $0 in printing but loses the tactile experience most couples value. Hybrid approach: digital save-the-date + printed formal invitation saves 20-30%.</p>
<p><strong>Q4: When is the best time to order wedding invitations?</strong><br/>A: Order 2-3 months before the wedding for standard delivery. For peak season (May, October-December), order 4 months ahead. Save 5-10% by ordering 6+ months ahead during off-peak (January-March).</p>
<p><strong>Q5: Does wedding invitation cost include envelopes?</strong><br/>A: Envelopes are usually separate. Standard A5 envelopes run $0.30-0.80/piece. Foil-lined envelopes add $1.50-3.00/piece. <a href="/en/blog/wedding-invitation-envelope-printing-guide/">See our envelope guide for 5 material options</a>.</p>

<h2>Get your 30-second instant quote</h2>
<p>Enter "wedding invitation" + quantity + material + finishing at <a href="/quote/">ZprintPro Quote System</a> to see real-time pricing for all 4 tiers. 100-piece MOQ, free design, 7-10 working day standard delivery, DHL global 2-4 day from Asia factory.</p>
<p>WhatsApp instant inquiry: <a href="https://wa.me/8619880851334">+86 198 8085 1334</a>, reply within 2 hours.</p>

<h3>Further reading</h3>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/en/blog/wedding-invitation-pricing-guide/">Wedding Invitation Pricing Guide 2026: 4 Quantity Tiers + Material Costs</a> — 4 cost components, 4 materials, 6 finishing options breakdown</li>
<li><a href="/en/blog/wedding-invitation-envelope-printing-guide/">Wedding Envelope Printing Guide: Foil Envelopes + Personalized Names</a> — 5 envelope materials, 4 finishing options</li>
<li><a href="/en/blog/wedding-favor-bag-printing-guide/">Hong Kong Wedding Favor Bag & Invitation Printing Guide 2026</a> — favor bag + invitation bundle 10% off</li>
<li><a href="/en/blog/wedding-table-card-printing-guide/">Wedding Table Card & Seating Chart Printing Guide 2026</a> — table cards + place cards + seating charts 100-1000 pieces</li>
<li><a href="/category/wedding-invitations/">Wedding Invitations Category</a> — Chinese-style, Western-style, foil, embossed full collection</li>
</ul>
"""


# ============================================================
# blog-data/en.json content: wedding-table-card-printing-guide (300 词 - 短一点 因为 en 是 600-900 范围)
# ============================================================
EN_TABLE_CARD = """<p>Wedding table cards (place cards + seating charts + escort cards) are essential for any wedding with assigned seating. The 2026 average cost for 100-500 table cards is $0.40-1.20/piece, with total budget for a 150-guest wedding typically $80-180. ZprintPro supplies <a href="/category/wedding-invitations/">wedding table cards</a> in 4 materials (white card / pearl / linen / cotton), 3 design styles, 100-1000 piece small-batch runs from Asia factory, 5-10 working day delivery, DHL global 2-4 days to 50+ countries.</p>

<h2>What is a wedding table card vs place card vs seating chart?</h2>
<p>3 distinct pieces work together for assigned-seating weddings:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>Place card (table card):</strong> Individual card at each guest's seat showing their name. Most common use. 1 per guest = 100 pieces for 100 guests. Size: 5×7cm or 6×9cm folded.</li><li><strong>Seating chart (escort card):</strong> Large poster near entrance listing all guests by table number. 1 per wedding. Size: A1 (594×841mm) or A2 (420×594mm) for 100-200 guests.</li><li><strong>Table number card:</strong> Larger card on each table showing table 1, 2, 3... 1 per table. Size: 10×15cm or 13×18cm folded.</li></ol>

<h2>How much do wedding table cards cost in 2026?</h2>
<p>4 quantity tiers with realistic pricing for 250g white card + duplex + foil table number:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>100 pieces (small wedding, 50-80 guests):</strong> $0.85-1.20 / piece, $85-120 total</li><li><strong>200 pieces (mid-size, 100-150 guests):</strong> $0.60-0.85 / piece, $120-170 total</li><li><strong>500 pieces (large, 200-300 guests):</strong> $0.40-0.60 / piece, $200-300 total</li><li><strong>1000 pieces (extra-large, 400+ guests or planner stock):</strong> $0.30-0.45 / piece, $300-450 total</li></ol>

<h2>Which material is best for wedding table cards?</h2>
<p>4 materials ranked by tactile feel and budget:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>White card 250-350g (budget):</strong> Clean, versatile, $0 base upcharge. Best for Western standard weddings.</li><li><strong>Pearl paper 250-300g (mid-luxury):</strong> Subtle shimmer, $0.25-0.50 upcharge. Best for evening weddings / Chinese luxury.</li><li><strong>Linen paper 250-300g (textured):</strong> Horizontal weave texture, $0.25-0.50 upcharge. Best for church / outdoor weddings.</li><li><strong>Cotton paper 250-300g (premium):</strong> Soft fabric feel, $0.40-0.65 upcharge. Best for literary / forest / high-end weddings.</li></ol>

<h2>What design styles work for wedding table cards?</h2>
<p>3 main design styles for 2026 weddings:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>Classic serif + foil:</strong> Traditional Times New Roman or Garamond with gold foil name. Suits 70% of weddings.</li><li><strong>Modern sans-serif + spot UV:</strong> Helvetica or Futura with subtle UV highlights. Suits modern / minimalist weddings.</li>
<li><strong>Hand-lettered + custom illustration:</strong> Watercolor or custom artwork with hand-calligraphy name. Suits garden / outdoor / literary weddings.</li></ol>

<h2>What's the typical production timeline for table cards?</h2>
<p>Standard production is 5-7 working days for digital printing, 7-10 days for foil + duplex combinations. Rush 3-5 day production adds 30%. Best to order 1 month before the wedding to allow for design approval, production, and shipping.</p>

<h2>5 Wedding Table Card FAQ</h2>
<p><strong>Q1: Can I order table cards + place cards + seating chart together?</strong><br/>A: Yes. ZprintPro wedding stationery bundle — place cards + table numbers + seating chart + invitations, 10% bundle discount. WhatsApp +86 198 8085 1334 for bundle quote.</p>
<p><strong>Q2: What's the minimum order for table cards?</strong><br/>A: 50 pieces MOQ for table cards, 1 piece for seating chart. 100-piece is most economical for place cards.</p>
<p><strong>Q3: Can each place card have a different guest name?</strong><br/>A: Yes. Variable data printing adds $0.13-0.40/piece. Provide Excel/CSV with names, table numbers, and any dietary notes.</p>
<p><strong>Q4: How do I get the seating chart size right?</strong><br/>A: A1 (594×841mm) for 100-200 guests, A2 (420×594mm) for 50-100 guests, A0 (841×1189mm) for 200+ guests. We provide a free template.</p>
<p><strong>Q5: Are place cards and table numbers foil-stamped?</strong><br/>A: Optional. Standard is digital print, foil adds $0.13-0.40/piece per foil layer. Most couples foil-stamp table numbers + bride/groom cards only.</p>

<h2>Get your 30-second instant quote</h2>
<p>Enter "wedding table card" + quantity + material + finishing at <a href="/quote/">ZprintPro Quote System</a> for real-time 4-tier pricing. 100-piece MOQ, free design, 5-10 working day delivery, DHL global 2-4 days from Asia factory.</p>
<p>WhatsApp instant inquiry: <a href="https://wa.me/8619880851334">+86 198 8085 1334</a>, reply within 2 hours.</p>

<h3>Further reading</h3>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/en/blog/wedding-invitation-pricing-guide/">Wedding Invitation Pricing Guide 2026</a> — invitation + envelope + table card bundle pricing</li>
<li><a href="/en/blog/wedding-invitation-cost-guide/">Wedding Invitation Cost Guide 2026</a> — average cost breakdown + 5 budget-saving strategies</li>
<li><a href="/en/blog/wedding-favor-bag-printing-guide/">Wedding Favor Bag Printing Guide 2026</a> — favor bag + table card 10% bundle</li>
<li><a href="/en/blog/wedding-red-packet-printing-guide/">Wedding Red Packet Printing Guide 2026</a> — Chinese-style 紅包 for tea ceremony</li>
<li><a href="/category/wedding-invitations/">Wedding Invitations Full Collection</a> — invitations + table cards + favor bags all categories</li>
</ul>
"""


# ============================================================
# blog-data/zh-hk.json content: wedding-invitation-cost-guide (1800 字 zh-hk V3.7 v3)
# ============================================================
ZH_HK_INVITATION_COST = """<p>2026 年美國婚禮邀請卡平均成本 $0.85-3.20 / 份,50-500 份 4 檔真實成交價對比。100-150 人婚禮預算 $150-300 美元,設計費佔 5-10%、燙金 15-25%、加名 10-20%、印刷 50-60%。智印港為美國婚慶市場提供<a href="/category/wedding-invitations/">客製婚禮邀請卡</a>全系列服務,白卡紙 / 珠光紙 / 萊妮紋紙 / 棉紙 4 種材質 + 燙金 / UV / 擊凸 / 對裱 / 雷射雕刻 / Pantone 6 種工藝,DHL 全球 2-4 天直送 50+ 國家。</p>

<h2>2026 年婚禮邀請卡平均成本是幾多?</h2>
<p>美國婚慶市場 4 檔數量實際成交價區間 (USD),單價隨數量提升下降 60-75%:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>50 份 (小型婚禮 / 試水):</strong> $2.30-3.20 / 份,總價 $115-160 — 單價最貴,絕對成本最低</li><li><strong>100 份 (中型婚禮 100-150 人):</strong> $1.55-2.30 / 份,總價 $155-230 — 比 50 檔省 25%,最受歡迎起步點</li><li><strong>300 份 (大型婚禮 150-300 人):</strong> $1.05-1.55 / 份,總價 $315-465 — 比 50 檔省 50%,甜蜜點</li><li><strong>500 份 (超大型 / 婚慶公司備用):</strong> $0.65-1.05 / 份,總價 $325-525 — 比 50 檔省 70%,最抵單價</li></ol>

<h2>婚禮邀請卡 4 大成本拆解?</h2>
<p>客製婚禮邀請卡成本來自 4 大部件,理解每部件有助預算控制:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>基本印刷 (50-60% 總成本):</strong> CMYK 或 Pantone 印刷在 250-350g 白卡 / 珠光 / 萊妮紋 / 棉紙。標準含對裱。100 檔 $0.40-1.05 / 份</li><li><strong>燙金 (15-25%):</strong> 金 / 銀 / 玫瑰金 / 香檳金燙新人姓名、婚期、結婚標誌。每層加 $0.13-0.40 / 份,大多數邀請卡 1 層,奢華版 2-3 層</li><li><strong>個性化加名 (10-20%):</strong> 每位賓客不同姓名需可變數據印刷。加 $0.13-0.40 / 份,隨數量線性增加</li><li><strong>設計費 (5-10% 總成本 或 $50-200 一次性):</strong> 客製圖稿設計一次性費用。智印港 100 份起免費設計,否則 $50-150 / 款</li></ol>

<h2>材質如何影響婚禮邀請卡成本?</h2>
<p>材質選擇在白卡基線上加 $0.13-0.65 / 份,2026 年美國婚慶市場 4 種主流材質:</p>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">材質</th><th class="border p-2 text-left">厚度</th><th class="border p-2 text-left">加價 (USD/份)</th><th class="border p-2 text-left">適合場景</th></tr></thead><tbody><tr><td class="border p-2">白卡紙</td><td class="border p-2">250-350g</td><td class="border p-2">基價</td><td class="border p-2">西式標準 / 預算型</td></tr><tr><td class="border p-2">珠光紙</td><td class="border p-2">250-300g</td><td class="border p-2">+0.25-0.50</td><td class="border p-2">中式奢華 / 晚宴</td></tr><tr><td class="border p-2">萊妮紋紙</td><td class="border p-2">250-300g</td><td class="border p-2">+0.25-0.50</td><td class="border p-2">西式 / 教堂婚禮</td></tr><tr><td class="border p-2">棉紙</td><td class="border p-2">250-300g</td><td class="border p-2">+0.40-0.65</td><td class="border p-2">教堂 / 森林 / 文青</td></tr><tr><td class="border p-2">燙金專用紙</td><td class="border p-2">250-300g</td><td class="border p-2">+0.13-0.40</td><td class="border p-2">燙金邀請卡首選</td></tr></tbody></table>

<h2>哪種工藝對成本影響最大?</h2>
<p>6 種最常見工藝在 100 檔的成本影響:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>UV 局部上光:</strong> +$0.07-0.20 / 份,突出 logo 或結婚標誌,常與燙金搭配</li><li><strong>擊凸 / 壓凹:</strong> +$0.13-0.32 / 份,立體觸感,龍鳳擊凸是中式奢華標配 (比平面燙金 +$0.20 / 份)</li><li><strong>對裱 (雙層紙):</strong> +$0.25-0.50 / 份,兩層紙貼合,中式邀請卡常見,增加份量感</li><li><strong>雷射雕刻:</strong> +$0.40-0.80 / 份,精細花紋切穿頂層紙,西式奢華 / 高檔邀請卡</li><li><strong>Pantone 專色印刷:</strong> +$0.13-0.25 / 份,品牌色精準還原,婚禮主題色匹配</li><li><strong>邊緣燙金:</strong> +$0.30-0.50 / 份,卡片 3 邊燙金,高檔現代風</li></ol>

<h2>如何節省 30-50% 婚禮邀請卡成本?</h2>
<p>2026 年 5 個有效省錢策略:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>300 份起訂代替 100 份:</strong> 單價省 50%,多餘可做紀念卡、感謝卡、或 save-the-date</li><li><strong>跳過對裱:</strong> 省 $0.25-0.50 / 份,改用 350g+ 厚卡紙代替</li><li><strong>珠光或萊妮紋代替棉紙:</strong> 珠光 / 萊妮紋 80% 棉紙觸感,加價減半</li><li><strong>單層燙金代替 2-3 層:</strong> 大多奢華感來自 1 層位置精準的燙金,多層 +1-2 天生產 + $0.40-0.80 / 份</li><li><strong>標準 CMYK 代替 Pantone:</strong> 省 $0.13-0.25 / 份,真正需要品牌色匹配才用 Pantone</li></ol>

<h2>婚禮邀請卡定價包含什麼 / 額外加什麼?</h2>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">部件</th><th class="border p-2 text-left">包含?</th><th class="border p-2 text-left">備註</th></tr></thead><tbody><tr><td class="border p-2">白卡 250g 基價</td><td class="border p-2">是 (基線)</td><td class="border p-2">標準 250g 白卡紙</td></tr><tr><td class="border p-2">CMYK 彩色印刷</td><td class="border p-2">是</td><td class="border p-2">雙面 4 色印刷</td></tr><tr><td class="border p-2">1 層燙金 (金/銀)</td><td class="border p-2">是 (1 層)</td><td class="border p-2">姓名、婚期、結婚標誌</td></tr><tr><td class="border p-2">對裱</td><td class="border p-2">是 (1 次)</td><td class="border p-2">正反兩面紙貼合</td></tr><tr><td class="border p-2">免費設計服務</td><td class="border p-2">是 (100 份起)</td><td class="border p-2">客製圖稿包含</td></tr><tr><td class="border p-2">數碼打樣</td><td class="border p-2">$25-65</td><td class="border p-2">生產前 1 張實物樣本</td></tr><tr><td class="border p-2">急件生產 (5 天)</td><td class="border p-2">+30%</td><td class="border p-2">標準 7-10 天</td></tr><tr><td class="border p-2">急件運 DHL Express</td><td class="border p-2">+$15-50</td><td class="border p-2">2-4 天代替 7-10 天</td></tr></tbody></table>

<h2>5 大婚禮邀請卡成本常見問題</h2>
<p><strong>Q1: 最便宜的婚禮邀請卡選項是什麼?</strong><br/>A: 50 份白卡基線 + 1 層燙金,$0.65-1.05 / 份。預算型婚禮可選數碼印刷 (無燙金) 降至 $0.40-0.60 / 份。</p>
<p><strong>Q2: 150 份婚禮邀請卡預算幾多?</strong><br/>A: 150 份含燙金 + 對裱通常 $180-280。奢華版 (3 層燙金 + 雷射雕刻 + 棉紙) 預算 $350-500。</p>
<p><strong>Q3: 數碼婚禮邀請卡比印刷便宜嗎?</strong><br/>A: 數碼 (email/PDF) 印刷費 $0 但失去大多數新人珍視的觸感體驗。混合方案: 數碼 save-the-date + 印刷正式邀請,省 20-30%。</p>
<p><strong>Q4: 婚禮邀請卡最佳下單時間?</strong><br/>A: 婚禮前 2-3 個月下單標準生產。旺季 (5 月、10-12 月) 提前 4 個月。非旺季 (1-3 月) 提前 6+ 個月下單省 5-10%。</p>
<p><strong>Q5: 婚禮邀請卡定價含信封嗎?</strong><br/>A: 信封通常另計。標準 A5 信封 $0.30-0.80 / 份,燙金內襯信封加 $1.50-3.00 / 份。<a href="/zh-hk/blog/wedding-invitation-envelope-printing-guide/">查看信封指南 5 種材質</a>。</p>

<h2>立即取得 30 秒 AI 報價</h2>
<p>透過 <a href="/quote/">智印港 ZprintPro 報價系統</a> 輸入「婚禮邀請卡」+ 數量 + 材質 + 工藝,系統即時顯示 4 檔實際成交價。100 份起印,免費設計,7-10 個工作天標準交付,DHL 全球 2-4 天配送 (亞洲工廠直發)。</p>
<p>WhatsApp 即時查詢: <a href="https://wa.me/8619880851334">+86 198 8085 1334</a>,回覆速度 ≤ 2 小時。</p>

<h3>延伸閱讀</h3>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/zh-hk/blog/wedding-invitation-pricing-guide/">香港喜帖價格指南 2026 · 4 檔實價 + 材質工藝全對比</a> — 4 成本拆解 + 4 材質 + 6 工藝</li>
<li><a href="/zh-hk/blog/wedding-invitation-envelope-printing-guide/">婚慶信封印刷指南 · 燙金信封 + 個性化新人姓名</a> — 5 信封材質 + 4 工藝對比</li>
<li><a href="/zh-hk/blog/wedding-favor-bag-printing-guide/">香港婚慶喜帖 / 婚禮禮袋印刷指南 · 2026 婚嫁旺季必備</a> — 喜帖 + 禮袋套裝 9 折</li>
<li><a href="/zh-hk/blog/wedding-table-card-printing-guide/">婚宴枱卡 / 席位圖印刷指南 2026 · 100-500 張材質工藝 + 4 檔實價</a> — 枱卡 + 席位圖 + 桌牌套裝</li>
<li><a href="/category/wedding-invitations/">喜帖印刷類目</a> — 中式喜帖、西式邀請卡、燙金喜帖全系列</li>
</ul>
"""


# ============================================================
# blog-data/zh-hk.json content: wedding-table-card-printing-guide (2200 字 zh-hk V3.7 v3)
# ============================================================
ZH_HK_TABLE_CARD = """<p>2026 年香港婚宴枱卡 / 席位圖 / 桌牌 / 席次表 4 大場景,100-500 張 4 檔實價,白卡紙 / 珠光紙 / 萊妮紋紙 / 棉紙 4 種材質對比,中英文 / 數字座位 / 客製化圖案 3 大設計風格。150 人婚宴預算 $80-180,智印港為香港婚慶市場提供<a href="/category/wedding-invitations/">婚宴枱卡印刷</a>全系列服務,5-10 個工作天交付,順豐本地 24h + DHL 全球 2-4 天配送 50+ 國家。</p>

<h2>枱卡 vs 席位圖 vs 桌牌 vs 席次表分別是什麼?</h2>
<p>4 大婚宴指引物件,功能各異,4 種配合使用最完整:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>枱卡 (Place Card):</strong> 每位賓客座位前的小卡,顯示賓客姓名 + 桌號。1 位賓客 1 張,100 賓客 = 100 張。常見尺寸 5×7cm 或 6×9cm 摺卡</li><li><strong>席位圖 (Seating Chart / Escort Card):</strong> 入口處大型海報,按桌號列出所有賓客姓名。1 場婚禮 1 張。常見尺寸 A1 (594×841mm) 或 A2 (420×594mm),100-200 賓客適用</li><li><strong>桌牌 (Table Number):</strong> 每張桌中央的大卡,顯示「第 1 桌」「第 2 桌」。1 桌 1 張。常見尺寸 10×15cm 或 13×18cm 摺卡</li><li><strong>席次表 (Seating Plan / Floor Plan):</strong> 宴會場地佈局圖,顯示桌位排列。1 場婚禮 1 張。常見尺寸 A2 或 A1,跟席位圖配合使用</li></ol>

<h2>2026 年婚宴枱卡成本是幾多?</h2>
<p>4 檔數量實際成交價區間 (HKD),250g 白卡紙 + 對裱 + 燙金桌號標準工藝:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>100 張 (小型婚宴 50-80 賓客):</strong> HK$ 6.6-9.3 / 張,總價 HK$ 660-930</li><li><strong>200 張 (中型婚宴 100-150 賓客):</strong> HK$ 4.7-6.6 / 張,總價 HK$ 940-1,320</li><li><strong>500 張 (大型婚宴 200-300 賓客):</strong> HK$ 3.1-4.7 / 張,總價 HK$ 1,550-2,350</li><li><strong>1,000 張 (超大型 400+ 賓客 / 婚慶公司備用):</strong> HK$ 2.3-3.5 / 張,總價 HK$ 2,300-3,500</li></ol>

<h2>婚宴枱卡材質怎麼選?4 種材質對比</h2>
<p>香港婚慶市場最常用 4 種材質,觸感 vs 預算:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>白卡紙 250-350g (預算型):</strong> 純白百搭,基價 HK$ 0。適合西式標準婚禮</li><li><strong>珠光紙 250-300g (中奢華):</strong> 細微珍珠光澤,加 HK$ 2-4 / 張。適合晚宴 / 中式奢華</li><li><strong>萊妮紋紙 250-300g (質感型):</strong> 橫紋織物感,加 HK$ 2-4 / 張。適合教堂 / 戶外婚禮</li><li><strong>棉紙 (Linen) 250-300g (高檔):</strong> 柔軟布感,加 HK$ 3-5 / 張。適合文青 / 森林 / 高檔婚禮</li></ol>

<h2>婚宴枱卡 3 大設計風格?</h2>
<p>2026 年香港婚慶市場 3 種主流風格:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>經典襯線 + 燙金:</strong> 傳統 Times New Roman 或 Garamond 字體配金色燙金,適合 70% 婚禮</li><li><strong>現代無襯線 + UV 局部上光:</strong> Helvetica 或 Futura 字體配 UV 重點突出,適合現代 / 極簡婚禮</li><li><strong>手寫字體 + 客製化插畫:</strong> 水彩或客製圖案配手寫體姓名,適合花園 / 戶外 / 文青婚禮</li></ol>

<h2>婚宴枱卡生產週期幾耐?</h2>
<p>標準生產 5-7 個工作天 (數碼印刷),7-10 個工作天 (燙金 + 對裱組合)。急件 3-5 天生產加 30% 費用。建議婚禮前 1 個月下單,留時間給設計確認、生產、運送到場地。旺季 (5 月、10-12 月) 提前 1.5 個月。</p>

<h2>枱卡 vs 席位圖 印刷規格差異?</h2>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">項目</th><th class="border p-2 text-left">枱卡 (Place Card)</th><th class="border p-2 text-left">席位圖 (Seating Chart)</th><th class="border p-2 text-left">桌牌 (Table Number)</th></tr></thead><tbody><tr><td class="border p-2">尺寸</td><td class="border p-2">5×7cm / 6×9cm 摺卡</td><td class="border p-2">A2 (420×594mm) / A1 (594×841mm)</td><td class="border p-2">10×15cm / 13×18cm 摺卡</td></tr><tr><td class="border p-2">數量</td><td class="border p-2">1 張 / 賓客</td><td class="border p-2">1 張 / 婚禮</td><td class="border p-2">1 張 / 桌</td></tr><tr><td class="border p-2">內容</td><td class="border p-2">賓客姓名 + 桌號</td><td class="border p-2">所有賓客按桌號分組</td><td class="border p-2">桌號 (1/2/3...)</td></tr><tr><td class="border p-2">典型材質</td><td class="border p-2">白卡 / 珠光 / 棉紙</td><td class="border p-2">白卡 / 防水 PP 膠片</td><td class="border p-2">白卡 / 燙金專用紙</td></tr><tr><td class="border p-2">100 件成本 (HK$)</td><td class="border p-2">660-930</td><td class="border p-2">200-400 (1 件)</td><td class="border p-2">300-500 (10 件)</td></tr></tbody></table>

<h2>5 大婚宴枱卡常見問題</h2>
<p><strong>Q1: 枱卡 + 席位圖 + 桌牌可以一起訂嗎?有套裝嗎?</strong><br/>A: 可以。智印港婚宴印刷套裝 — 喜帖 + 枱卡 + 席位圖 + 桌牌 + 婚禮禮袋 + 利是封,套裝 9 折優惠。WhatsApp 19880851334 報價。</p>
<p><strong>Q2: 枱卡最小起訂量多少?</strong><br/>A: 枱卡 50 張起,席位圖 1 張起,桌牌 10 張起。100 張是枱卡最經濟起步點。</p>
<p><strong>Q3: 枱卡每張可以印不同賓客姓名嗎?</strong><br/>A: 可以。可變數據印刷加 HK$ 1-3 / 張,提供 Excel/CSV 含姓名、桌號、飲食備註 (茹素 / 食物敏感)。</p>
<p><strong>Q4: 席位圖尺寸怎麼選?</strong><br/>A: 100-200 賓客選 A1 (594×841mm),50-100 賓客選 A2 (420×594mm),200+ 賓客選 A0 (841×1189mm) 或拼接多張 A1。智印港提供免費模板。</p>
<p><strong>Q5: 枱卡 + 桌牌 燙金值得嗎?</strong><br/>A: 標準是數碼印刷,燙金加 HK$ 1-3 / 張每層。大多新人只燙桌號 + 新郎新娘枱卡,賓客枱卡不燙金 (省錢)。</p>

<h2>立即取得 30 秒 AI 報價</h2>
<p>透過 <a href="/quote/">智印港 ZprintPro 報價系統</a> 輸入「婚宴枱卡」+ 數量 + 材質 + 工藝,系統即時顯示 4 檔實際成交價。100 張起印,免費設計,5-10 個工作天交付,順豐本地 24h + DHL 全球 2-4 天配送 (亞洲工廠直發)。</p>
<p>WhatsApp 即時查詢: <a href="https://wa.me/8619880851334">+86 198 8085 1334</a>,回覆速度 ≤ 2 小時。</p>

<h3>延伸閱讀</h3>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/zh-hk/blog/wedding-invitation-pricing-guide/">香港喜帖價格指南 2026 · 4 檔實價 + 材質工藝全對比</a> — 喜帖 + 信封 + 枱卡套裝定價</li>
<li><a href="/zh-hk/blog/wedding-invitation-cost-guide/">美國婚禮邀請卡 2026 成本指南 · 4 檔真實價格</a> — 平均成本拆解 + 5 大省錢策略</li>
<li><a href="/zh-hk/blog/wedding-favor-bag-printing-guide/">香港婚慶喜帖 / 婚禮禮袋印刷指南</a> — 枱卡 + 婚禮禮袋套裝 9 折</li>
<li><a href="/zh-hk/blog/wedding-red-packet-printing-guide/">婚嫁利是封印刷指南 · 燙金龍鳳 + 個性化新人姓名</a> — 中式婚嫁紅包 100 個起小批量定制</li>
<li><a href="/category/wedding-invitations/">喜帖印刷類目</a> — 中式喜帖、西式邀請卡、枱卡、婚禮禮袋全系列</li>
</ul>
"""


# ============================================================
# JA content (en cost guide ja, ja table card) - 2 篇 短版 400 词 V3.7 v3
# ============================================================
JA_INVITATION_COST = """<p>2026年米国結婚式招待状の平均コストは$0.85-3.20/枚、50〜500枚4段階リアル価格。100-150名ウェディング予算$150-300、設計費5-10%・箔押し15-25%・名入れ10-20%・印刷50-60%構成。ZprintProは米国ブライダル市場向け<a href="/category/wedding-invitations/">カスタム結婚式招待状</a>を白カード・パール・ラインペーパー・コットン4素材+箔押し・UV・エンボス・二層紙・レーザー彫刻・Pantone6加工で提供、DHL全世界2-4日配送、50ヶ国対応。</p>

<h2>2026年 結婚式招待状の平均コストは?</h2>
<p>米国ブライダル市場4段階数量リアル価格 (USD)、単価は数量増加で60-75%低下:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>50枚 (小型 / 試作):</strong> $2.30-3.20/枚、$115-160 — 単価最高、総額最低</li><li><strong>100枚 (中型 100-150名):</strong> $1.55-2.30/枚、$155-230 — 50枚比25%OFF、開始点</li><li><strong>300枚 (大型 150-300名):</strong> $1.05-1.55/枚、$315-465 — 50枚比50%OFF、ベストバリュー</li><li><strong>500枚 (超大型 / プランナー予備):</strong> $0.65-1.05/枚、$325-525 — 50枚比70%OFF</li></ol>

<h2>結婚式招待状の4大コスト構成?</h2>
<p>カスタム招待状のコストは4大パーツ、理解すれば予算管理可能:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>基本印刷 (50-60%):</strong> CMYKまたはPantone印刷、250-350g白カード/パール/ラインペーパー/コットン。標準二層紙含む。100枚で$0.40-1.05/枚</li><li><strong>箔押し (15-25%):</strong> 金/銀/ローズゴールド/シャンパンゴールド、新郎新婦名・挙式日・モノグラム。1層+$0.13-0.40/枚、多くは1層、ラグジュアリーは2-3層</li><li><strong>個別名入れ (10-20%):</strong> ゲスト別名前は可変データ印刷必須。+$0.13-0.40/枚、数量に比例</li><li><strong>デザイン費 (5-10% または$50-200一括):</strong> カスタム artwork 一回限り。ZprintProは100枚以上で無料、それ以外$50-150/デザイン</li></ol>

<h2>素材はコストにどう影響する?</h2>
<p>素材選択は白カード基準で+$0.13-0.65/枚、2026年米国ブライダル市場4素材:</p>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">素材</th><th class="border p-2 text-left">厚み</th><th class="border p-2 text-left">追加 (USD/枚)</th><th class="border p-2 text-left">最適シーン</th></tr></thead><tbody><tr><td class="border p-2">白カード</td><td class="border p-2">250-350g</td><td class="border p-2">基本</td><td class="border p-2">西洋式標準 / 予算型</td></tr><tr><td class="border p-2">パール紙</td><td class="border p-2">250-300g</td><td class="border p-2">+0.25-0.50</td><td class="border p-2">中式 luxury / 披露宴</td></tr><tr><td class="border p-2">ラインペーパー</td><td class="border p-2">250-300g</td><td class="border p-2">+0.25-0.50</td><td class="border p-2">西洋式 / 教会式</td></tr><tr><td class="border p-2">コットン紙</td><td class="border p-2">250-300g</td><td class="border p-2">+0.40-0.65</td><td class="border p-2">教会 / 森林 / 文芸</td></tr><tr><td class="border p-2">箔押し用紙</td><td class="border p-2">250-300g</td><td class="border p-2">+0.13-0.40</td><td class="border p-2">箔押し招待状第一選択</td></tr></tbody></table>

<h2>どの加工がコストに最も影響する?</h2>
<p>6種主要加工の100枚コスト影響:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>部分UV:</strong> +$0.07-0.20/枚、ロゴ/モノグラム強調、箔押しと併用</li><li><strong>エンボス/デボス:</strong> +$0.13-0.32/枚、立体触感、龍鳳エンボスは中式 luxury (平面箔+$0.20/枚)</li><li><strong>二層紙 (Duplex):</strong> +$0.25-0.50/枚、二層紙貼合、中式招待状で一般的</li><li><strong>レーザー彫刻:</strong> +$0.40-0.80/枚、精細パターン、西洋式 luxury</li><li><strong>Pantone特色印刷:</strong> +$0.13-0.25/枚、ブランド色完全一致</li><li><strong>エッジ箔押し:</strong> +$0.30-0.50/枚、カード3辺に箔押し、高級モダン</li></ol>

<h2>30-50% コスト削減する5つの方法?</h2>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>100枚ではなく300枚:</strong> 単価50%OFF、剩余で記念カード・サンキューカード・save-the-date</li><li><strong>二層紙スキップ:</strong> $0.25-0.50/枚節約、350g+厚カードで代替</li><li><strong>パール/ラインでコットン代替:</strong> 80%触感、加価半額</li><li><strong>単層箔で2-3層代替:</strong> 1層精準箔で80%奢华感、多層+1-2日+$0.40-0.80/枚</li><li><strong>標準CMYKでPantone代替:</strong> $0.13-0.25/枚節約</li></ol>

<h2>結婚式招待状の価格に含まれるもの?</h2>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">項目</th><th class="border p-2 text-left">含まれる?</th><th class="border p-2 text-left">備考</th></tr></thead><tbody><tr><td class="border p-2">白カード 250g 基本</td><td class="border p-2">はい (基本)</td><td class="border p-2">標準 250g 白カード</td></tr><tr><td class="border p-2">CMYK カラー印刷</td><td class="border p-2">はい</td><td class="border p-2">両面 4色</td></tr><tr><td class="border p-2">1層箔押し (金/銀)</td><td class="border p-2">はい (1層)</td><td class="border p-2">名前・挙式日・モノグラム</td></tr><tr><td class="border p-2">二層紙</td><td class="border p-2">はい (1回)</td><td class="border p-2">両面紙貼合</td></tr><tr><td class="border p-2">無料デザイン</td><td class="border p-2">はい (100枚以上)</td><td class="border p-2">カスタム artwork</td></tr><tr><td class="border p-2">デジタル校正</td><td class="border p-2">$25-65</td><td class="border p-2">本番前 1枚实物</td></tr><tr><td class="border p-2">特急本番 (5日)</td><td class="border p-2">+30%</td><td class="border p-2">標準 7-10日</td></tr><tr><td class="border p-2">DHL Express 配送</td><td class="border p-2">+$15-50</td><td class="border p-2">2-4日 (通常7-10日)</td></tr></tbody></table>

<h2>5大 FAQ</h2>
<p><strong>Q1: 最も安い結婚式招待状オプションは?</strong><br/>A: 50枚白カード基本+1層箔で$0.65-1.05/枚。予算型はデジタル印刷 (箔なし) で$0.40-0.60/枚。</p>
<p><strong>Q2: 150枚招待状の予算は?</strong><br/>A: 箔+二層紙で$180-280、ラグジュアリー (3層箔+レーザー+コットン) で$350-500。</p>
<p><strong>Q3: デジタル招待状は印刷より安い?</strong><br/>A: デジタル (email/PDF) は印刷費$0だが触感丧失。ハイブリッド (save-the-date デジタル+正式招待印刷) で20-30%節約。</p>
<p><strong>Q4: 最適注文タイミングは?</strong><br/>A: 挙式2-3ヶ月前標準、繁忙期 (5月/10-12月) 4ヶ月前、閑散期 (1-3月) 6ヶ月以上前で5-10%OFF。</p>
<p><strong>Q5: 封筒は価格に含まれる?</strong><br/>A: 別料金。標準A5封筒$0.30-0.80/枚、箔押し内側+$1.50-3.00/枚。<a href="/ja/blog/wedding-invitation-envelope-printing-guide/">封筒ガイド5素材</a>参照。</p>

<h2>30秒AI見積を取得</h2>
<p><a href="/quote/">ZprintPro見積システム</a>で「結婚式招待状」+ 数量 + 素材 + 加工入力、4段階リアル価格表示。100枚から、無料デザイン、7-10営業日納品、DHL全世界2-4日配送 (アジア工場)。</p>
<p>WhatsApp即時問合せ: <a href="https://wa.me/8619880851334">+86 198 8085 1334</a>、2時間以内に返信。</p>

<h3>関連ガイド</h3>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/ja/blog/wedding-invitation-pricing-guide/">結婚式招待状 価格ガイド 2026：4段階価格 + 素材加工完全比較</a></li>
<li><a href="/ja/blog/wedding-invitation-envelope-printing-guide/">ブライダル封筒印刷ガイド：箔押し封筒 + 個別名入れ</a></li>
<li><a href="/ja/blog/wedding-favor-bag-printing-guide/">香港ブライダル引出物袋・招待状印刷ガイド 2026</a></li>
<li><a href="/ja/blog/wedding-table-card-printing-guide/">結婚式 テーブルカード・席次表印刷ガイド 2026</a></li>
<li><a href="/category/wedding-invitations/">結婚式招待状 カテゴリ</a></li>
</ul>
"""


JA_TABLE_CARD = """<p>2026年香港結婚式 テーブルカード・席次表・場札・席札4大シーン、100〜500枚4段階リアル価格、白カード・Pearl・Linen・Cotton4素材、3デザインスタイル。150名披露宴予算$80-180、ZprintProは香港ブライダル市場向け<a href="/category/wedding-invitations/">テーブルカード印刷</a>を5-10営業日納品、順豊ローカル24h+DHL全世界2-4日配送50ヶ国で提供。</p>

<h2>テーブルカード vs 席次表 vs 場札 vs 席札の違いは?</h2>
<p>4大ブライダル案内アイテム、機能別:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>テーブルカード (Place Card):</strong> 各ゲスト席前の小カード、ゲスト名+テーブル番号。1ゲスト1枚、100ゲスト=100枚。サイズ5×7cmまたは6×9cm二つ折り</li><li><strong>席次表 (Seating Chart):</strong> 入口大型ポスター、テーブル別全ゲスト名。1披露宴1枚。サイズA1 (594×841mm) またはA2 (420×594mm)、100-200ゲスト</li><li><strong>場札 (Table Number):</strong> 各テーブル中央大カード、「テーブル1」「テーブル2」。1テーブル1枚。サイズ10×15cmまたは13×18cm</li><li><strong>席次プラン (Seating Plan):</strong> 式場レイアウト図、テーブル配置表示。1披露宴1枚。サイズA2またはA1、席次表と併用</li></ol>

<h2>2026年 結婚式テーブルカードのコストは?</h2>
<p>4段階数量リアル価格 (HKD)、250g白カード+二層紙+箔押しテーブル番号標準:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>100枚 (小型 50-80ゲスト):</strong> HK$ 6.6-9.3/枚、HK$ 660-930</li><li><strong>200枚 (中型 100-150ゲスト):</strong> HK$ 4.7-6.6/枚、HK$ 940-1,320</li><li><strong>500枚 (大型 200-300ゲスト):</strong> HK$ 3.1-4.7/枚、HK$ 1,550-2,350</li><li><strong>1,000枚 (超大型 400+ゲスト / プランナー予備):</strong> HK$ 2.3-3.5/枚、HK$ 2,300-3,500</li></ol>

<h2>テーブルカード素材は?4素材比較</h2>
<p>香港ブライダル市場4素材、触感 vs 予算:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>白カード 250-350g (予算型):</strong> 純白万能、HK$ 0追加。西洋式標準披露宴</li><li><strong>パール紙 250-300g (中 luxury):</strong> 細微パール光沢、+HK$ 2-4/枚。披露宴/中式 luxury</li><li><strong>ラインペーパー 250-300g (質感型):</strong> 横紋織物感、+HK$ 2-4/枚。教会/アウトドア</li><li><strong>コットン紙 (Linen) 250-300g (高級):</strong> 柔らか布感、+HK$ 3-5/枚。文芸/森林/高級披露宴</li></ol>

<h2>テーブルカード 3デザインスタイル?</h2>
<p>2026年香港ブライダル3主流スタイル:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>クラシック明朝 + 箔押し:</strong> 伝統Times New RomanまたはGaramond+金色箔、70%披露宴</li><li><strong>モダンサンセリフ + UV部分:</strong> HelveticaまたはFutura+UV強調、現代/ミニマル披露宴</li><li><strong>手書き + カスタムイラスト:</strong> 水彩またはカスタム+手書き名、ガーデン/アウトドア/文芸披露宴</li></ol>

<h2>テーブルカード生産期間は?</h2>
<p>標準5-7営業日 (デジタル印刷)、7-10営業日 (箔+二層紙)。特急3-5日+30%。披露宴1ヶ月前注文推奨 (デザイン承認+生産+配送)。繁忙期 (5月/10-12月) 1.5ヶ月前。</p>

<h2>テーブルカード vs 席次表 印刷仕様の違いは?</h2>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">項目</th><th class="border p-2 text-left">テーブルカード</th><th class="border p-2 text-left">席次表</th><th class="border p-2 text-left">場札</th></tr></thead><tbody><tr><td class="border p-2">サイズ</td><td class="border p-2">5×7cm / 6×9cm</td><td class="border p-2">A2 (420×594mm) / A1 (594×841mm)</td><td class="border p-2">10×15cm / 13×18cm</td></tr><tr><td class="border p-2">数量</td><td class="border p-2">1枚/ゲスト</td><td class="border p-2">1枚/披露宴</td><td class="border p-2">1枚/テーブル</td></tr><tr><td class="border p-2">内容</td><td class="border p-2">ゲスト名+テーブル番号</td><td class="border p-2">全ゲストテーブル別</td><td class="border p-2">テーブル番号 (1/2/3...)</td></tr><tr><td class="border p-2">典型素材</td><td class="border p-2">白カード/パール/コットン</td><td class="border p-2">白カード/防水PP</td><td class="border p-2">白カード/箔押し用紙</td></tr><tr><td class="border p-2">100件コスト (HK$)</td><td class="border p-2">660-930</td><td class="border p-2">200-400 (1件)</td><td class="border p-2">300-500 (10件)</td></tr></tbody></table>

<h2>5大 FAQ</h2>
<p><strong>Q1: テーブルカード + 席次表 + 場札 一括注文できますか? セット割は?</strong><br/>A: 可能。ZprintProブライダルセット — 招待状+テーブルカード+席次表+場札+引出物袋+紅包、10%セット割引。WhatsApp +86 198 8085 1334 見積依頼。</p>
<p><strong>Q2: 最小発注数量は?</strong><br/>A: テーブルカード50枚、席次表1枚、場札10枚から。100枚がテーブルカード経済的スタート。</p>
<p><strong>Q3: テーブルカード ゲスト別名前印刷できますか?</strong><br/>A: 可変データ印刷+HK$ 1-3/枚、Excel/CSV提供 (名前/テーブル番号/食事制限)。</p>
<p><strong>Q4: 席次表サイズ選定は?</strong><br/>A: 100-200ゲスト=A1 (594×841mm)、50-100ゲスト=A2 (420×594mm)、200+ゲスト=A0 (841×1189mm) またはA1複数枚連結。ZprintPro無料テンプレート提供。</p>
<p><strong>Q5: テーブルカード+場札 箔押し価値は?</strong><br/>A: 標準デジタル印刷、箔押し+HK$ 1-3/枚/層。多くは場札+新郎新婦テーブルカードのみ箔押し、ゲストテーブルカード箔なし (節約)。</p>

<h2>30秒AI見積</h2>
<p><a href="/quote/">ZprintPro見積システム</a>で「結婚式テーブルカード」+ 数量 + 素材 + 加工入力、4段階価格即時表示。100枚から、無料デザイン、5-10営業日納品、順豊ローカル24h+DHL全世界2-4日配送 (アジア工場)。</p>
<p>WhatsApp即時問合せ: <a href="https://wa.me/8619880851334">+86 198 8085 1334</a>、2時間以内に返信。</p>

<h3>関連ガイド</h3>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/ja/blog/wedding-invitation-pricing-guide/">結婚式招待状 価格ガイド 2026：4段階価格 + 素材加工完全比較</a></li>
<li><a href="/ja/blog/wedding-invitation-cost-guide/">結婚式招待状 コストガイド 2026：リアル価格 + 節約術</a></li>
<li><a href="/ja/blog/wedding-favor-bag-printing-guide/">香港ブライダル引出物袋・招待状印刷ガイド 2026</a></li>
<li><a href="/ja/blog/wedding-red-packet-printing-guide/">ブライダル紅包印刷ガイド：箔押し龍鳳+個別新婦名</a></li>
<li><a href="/category/wedding-invitations/">結婚式招待状 カテゴリ</a></li>
</ul>
"""


def main():
    print("=" * 60)
    print("V3.7 DoD 4: 2 篇新 wedding blog 本地备好")
    print("=" * 60)

    # 1. blog-posts.ts 写入 2 个新 lpWeddingXxx 块
    print("\n[1/7] blog-posts.ts 写入")
    ts_path = ROOT / 'src' / 'data' / 'blog-posts.ts'
    ts_content = ts_path.read_text(encoding='utf-8')
    print(f"  blog-posts.ts 当前 {len(ts_content)} chars")

    # 找 lpWeddingInvitationPricing 块结束位置 (L635 后)
    target = "const lpWeddingInvitationPricing: BlogPostMeta = {"
    idx = ts_content.find(target)
    if idx == -1:
        print(f"  ❌ 找不到 {target}, 退出")
        return

    # 找块结束 };
    after_target = ts_content[idx:]
    end_idx = after_target.find('};\n')
    if end_idx == -1:
        print(f"  ❌ 找不到 }}; 结束标记, 退出")
        return

    insert_pos = idx + end_idx + 3
    # 2 个新块插入
    new_blocks = LP_INVITATION_COST + '\n' + LP_TABLE_CARD
    new_ts = ts_content[:insert_pos] + new_blocks + ts_content[insert_pos:]

    if new_ts == ts_content:
        print("  ⚠️  无变化 (已存在?)")
    else:
        ts_path.write_text(new_ts, encoding='utf-8')
        print(f"  ✅ blog-posts.ts 写入 +{len(new_ts) - len(ts_content)} chars (2 blocks)")

    # 2-3-4. 写入 3 locale JSON 4 个 content (en cost + en table + zh-hk cost + zh-hk table + ja cost + ja table = 6 entries)
    print("\n[2/7] blog-data/{zh-hk,en,ja}.json 写入 6 entries")

    # 2a. en cost
    en_path = ROOT / 'src/data/blog-data/en.json'
    en = json.loads(en_path.read_text(encoding='utf-8'))
    if 'wedding-invitation-cost-guide' in en:
        print(f"  ⚠️  en wedding-invitation-cost-guide 已存在")
    else:
        en['wedding-invitation-cost-guide'] = {'content': EN_INVITATION_COST}
        json.dump(en, open(en_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print(f"  ✅ en.json wedding-invitation-cost-guide: {len(EN_INVITATION_COST)} chars / {len(EN_INVITATION_COST.split())} words")

    # 2b. en table
    if 'wedding-table-card-printing-guide' in en:
        print(f"  ⚠️  en wedding-table-card-printing-guide 已存在")
    else:
        en['wedding-table-card-printing-guide'] = {'content': EN_TABLE_CARD}
        json.dump(en, open(en_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print(f"  ✅ en.json wedding-table-card-printing-guide: {len(EN_TABLE_CARD)} chars / {len(EN_TABLE_CARD.split())} words")

    # 3a. zh-hk cost
    zh_path = ROOT / 'src/data/blog-data/zh-hk.json'
    zh = json.loads(zh_path.read_text(encoding='utf-8'))
    if 'wedding-invitation-cost-guide' in zh:
        print(f"  ⚠️  zh-hk wedding-invitation-cost-guide 已存在")
    else:
        zh['wedding-invitation-cost-guide'] = {'content': ZH_HK_INVITATION_COST}
        json.dump(zh, open(zh_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print(f"  ✅ zh-hk.json wedding-invitation-cost-guide: {len(ZH_HK_INVITATION_COST)} 字")

    # 3b. zh-hk table
    if 'wedding-table-card-printing-guide' in zh:
        print(f"  ⚠️  zh-hk wedding-table-card-printing-guide 已存在")
    else:
        zh['wedding-table-card-printing-guide'] = {'content': ZH_HK_TABLE_CARD}
        json.dump(zh, open(zh_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print(f"  ✅ zh-hk.json wedding-table-card-printing-guide: {len(ZH_HK_TABLE_CARD)} 字")

    # 4a. ja cost
    ja_path = ROOT / 'src/data/blog-data/ja.json'
    ja = json.loads(ja_path.read_text(encoding='utf-8'))
    if 'wedding-invitation-cost-guide' in ja:
        print(f"  ⚠️  ja wedding-invitation-cost-guide 已存在")
    else:
        ja['wedding-invitation-cost-guide'] = {'content': JA_INVITATION_COST}
        json.dump(ja, open(ja_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print(f"  ✅ ja.json wedding-invitation-cost-guide: {len(JA_INVITATION_COST.split())} 词")

    # 4b. ja table
    if 'wedding-table-card-printing-guide' in ja:
        print(f"  ⚠️  ja wedding-table-card-printing-guide 已存在")
    else:
        ja['wedding-table-card-printing-guide'] = {'content': JA_TABLE_CARD}
        json.dump(ja, open(ja_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print(f"  ✅ ja.json wedding-table-card-printing-guide: {len(JA_TABLE_CARD.split())} 词")

    # 5. JSON parse verify
    print("\n[5/7] JSON parse verify")
    for p in [zh_path, en_path, ja_path]:
        try:
            json.loads(open(p, encoding='utf-8').read())
            print(f"  ✅ {p.name}")
        except Exception as e:
            print(f"  ❌ {p.name}: {e}")

    # 6. zh-hk 简体字残留
    print("\n[6/7] zh-hk 100% 繁体检查")
    simp_only = {
        '贴': '貼', '纸': '紙', '样': '樣', '复': '複/復', '证': '證', '质': '質',
        '实': '實', '当': '當', '严': '嚴', '种': '種', '产': '產', '张': '張',
        '时': '時', '这': '這', '过': '過', '满': '滿', '应': '應', '对': '對',
        '们': '們', '党': '黨', '学': '學', '习': '習', '开': '開', '关': '關',
        '总': '總', '经': '經', '会': '會', '议': '議', '国': '國', '华': '華',
        '语': '語', '请': '請', '让': '讓', '选': '選', '择': '擇', '单': '單',
        '击': '擊', '链': '鏈', '显': '顯', '页': '頁', '统': '統', '计': '計',
        '结': '結', '设': '設', '风': '風', '险': '險', '预': '預', '报': '報',
        '档': '檔', '码': '碼',
    }
    for name, content in [('cost', ZH_HK_INVITATION_COST), ('table', ZH_HK_TABLE_CARD)]:
        violations = []
        for s, t in simp_only.items():
            if s in content:
                # 检查是否在 class="..." 内
                idx = 0
                while True:
                    idx = content.find(s, idx)
                    if idx == -1: break
                    ctx = content[max(0,idx-30):idx+30]
                    if 'class=' not in ctx or 'class="' not in ctx:
                        violations.append((s, t, idx, ctx))
                    idx += 1
        if violations:
            print(f"  ⚠️  zh-hk {name}: {len(violations)} 处真简体字残留")
            for s, t, idx, ctx in violations[:3]:
                print(f"      {s}→{t} @ {idx}: ...{ctx[-30:]}...")
        else:
            print(f"  ✅ zh-hk {name}: 0 真简体残留")

    # 7. NAP §13.10 严判 + 198 统一 + V3.7 v3 验收
    print("\n[7/7] V3.7 v3 验收")
    for name, zh, en, ja in [
        ('cost', ZH_HK_INVITATION_COST, EN_INVITATION_COST, JA_INVITATION_COST),
        ('table', ZH_HK_TABLE_CARD, EN_TABLE_CARD, JA_TABLE_CARD),
    ]:
        # 198 统一
        has_198_zh = '198 8085 1334' in zh
        has_198_en = '198 8085 1334' in en
        has_198_ja = '198 8085 1334' in ja
        has_181_zh = '18126380255' in zh or '181 2638 0255' in zh
        print(f"  [{name}] 198 统一: zh={has_198_zh} en={has_198_en} ja={has_198_ja} | 旧 181 残留 zh={has_181_zh}")

        # 字数 / 词数
        zh_chars = len(zh)
        en_words = len(en.split())
        ja_words = len(ja.split())
        print(f"  [{name}] 字数: zh-hk={zh_chars}字 (V3.7 v3 商业指南 1500-2500) | en={en_words}词 (600-900) | ja={ja_words}词 (400-600)")

        # 内链接数
        zh_links = len(re.findall(r'href="(/[^"]+)"', zh))
        en_links = len(re.findall(r'href="(/[^"]+)"', en))
        ja_links = len(re.findall(r'href="(/[^"]+)"', ja))
        print(f"  [{name}] 内链接: zh={zh_links} (V3.7 v3 ≥5) | en={en_links} (≥5) | ja={ja_links} (≥5)")

        # FAQ 数
        faq_zh = zh.count('<strong>Q')
        faq_en = en.count('<strong>Q')
        faq_ja = ja.count('<strong>Q')
        print(f"  [{name}] FAQ: zh={faq_zh} (V3.7 v3 ≥4) | en={faq_en} | ja={faq_ja}")

        # 答案前置 (GEO 硬条款)
        # 第一段含 主词 + 数字
        first_p_zh_match = re.search(r'<p[^>]*>([^<]+)</p>', zh)
        first_p_en_match = re.search(r'<p[^>]*>([^<]+)</p>', en)
        if first_p_zh_match:
            first_p = first_p_zh_match.group(1)
            if any(c in first_p for c in ['$0.85', '$2.30', '$1.55', '4 檔', '4 大', '1500-2500', '600-900', '100-500', 'HK$']):
                print(f"  [{name}] ✅ GEO 答案前置 zh-hk: 含数字+主词")
            else:
                print(f"  [{name}] ⚠️  GEO 答案前置 zh-hk 缺数字: {first_p[:80]}")


if __name__ == '__main__':
    main()
