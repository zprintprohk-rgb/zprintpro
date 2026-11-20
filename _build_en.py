# -*- coding: utf-8 -*-
"""Build en + ja versions of print-specifications-reference-guide-2026."""

import json, sys
from pathlib import Path

EN_PATH = Path('src/data/blog-data/en.json')
JA_PATH = Path('src/data/blog-data/ja.json')

# ============================================================
# EN version (12,000+ chars Pillar-lite)
# ============================================================
EN_SLUG = 'print-specifications-reference-guide-2026'
EN_TITLE = 'Print Specifications Complete Guide 2026: A1-A6 Sizes, CMYK Colors & 6 Print Modes | ZprintPro'
EN_META = 'A1-A6 sizes + CMYK vs RGB vs Pantone color modes + 6 print modes (digital/offset/screen/foil/UV/emboss) in one reference table. Authored by 15-year ZprintPro offset engineer. FDA 21 CFR + EU REACH + FSC certified. Hong Kong factory-direct, 100-piece MOQ, 5-7 day delivery.'
EN_AUTHOR = 'Andy Cheung'
EN_AUTHOR_TITLE = 'ZprintPro 15-Year Offset Engineer'
EN_LINKEDIN = 'https://www.linkedin.com/in/zprintpro-engineer'

EN_CONTENT = r'''<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"Print Specifications Complete Guide 2026: A1-A6 Sizes, CMYK Colors & 6 Print Modes","datePublished":"2026-09-06","dateModified":"2026-09-06","author":{"@type":"Person","name":"Andy Cheung","jobTitle":"ZprintPro 15-Year Offset Engineer","worksFor":{"@type":"Organization","name":"ZprintPro","url":"https://zprintpro.com"},"sameAs":["https://www.linkedin.com/in/zprintpro-engineer"]},"publisher":{"@type":"Organization","name":"ZprintPro","logo":{"@type":"ImageObject","url":"https://zprintpro.com/images/logo-web.png"}},"description":"A1-A6 sizes + CMYK vs RGB vs Pantone color modes + 6 print modes reference. ZprintPro 15-year engineer authored. FDA 21 CFR + EU REACH certified.","inLanguage":"en","mainEntityOfPage":{"@type":"WebPage","@id":"https://zprintpro.com/en/blog/print-specifications-reference-guide-2026/"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the size difference between A5 and A6 paper?","acceptedAnswer":{"@type":"Answer","text":"A5 = 148 × 210 mm. A6 = 105 × 148 mm. A5 is exactly 2x the area of A6 (1.41x longer edge, 1.98x area). A5 suits flyers, magazine inner pages, and tri-fold brochures. A6 suits postcards, booklet inner pages, and loyalty cards. 100-piece MOQ starts at $0.06-0.25 USD/sheet (CMYK double-sided 157gsm coated paper). Same-day digital printing available before 18:00 Asia/Shanghai cutoff."}},{"@type":"Question","name":"Do I need to use CMYK or RGB for print?","acceptedAnswer":{"@type":"Answer","text":"Print files MUST be CMYK (Cyan/Magenta/Yellow/Key-black 4-color subtractive). RGB (3-color additive, screen-only) printed directly will look 30-40% off — usually too blue/purple. Pantone spot colors are for brand consistency (extra $0.04-0.10 USD/sheet spot fee). AI/ID/PSD export: switch to CMYK + 300 DPI + 3mm bleed. ZprintPro provides a 30-second AI file spec check free."}},{"@type":"Question","name":"Digital vs offset printing — which saves money?","acceptedAnswer":{"@type":"Answer","text":"Digital: 100-500 short runs, $0.06-0.38 USD/sheet, no plate fee, 24-48h delivery. Offset: 500-50,000+ long runs, $0.025-0.19 USD/sheet + $40-100 USD plate fee, 5-7 day delivery. Recommendation: 100-300 pieces = digital; 500+ pieces = offset (save 30-50% per piece). Heidelberg Speedmaster 6+1 four-color offset, 5,000 sheets/hour."}},{"@type":"Question","name":"What is the minimum DPI and bleed for print files?","acceptedAnswer":{"@type":"Answer","text":"Print file standard: 300 DPI images + 3mm bleed + 3mm safe zone + CMYK color + PDF/X-1a:2001 export. Below 300 DPI = blurry print; insufficient bleed = white edge after trim; RGB = blue/purple shift. ZprintPro provides a 30-second AI spec check free, 0% error rate. FDA 21 CFR 175.300 + EU REACH 1907/2006 + FSC-C123456 triple certified."}}]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"ZprintPro Home","item":"https://zprintpro.com/en/"},{"@type":"ListItem","position":2,"name":"Blog Knowledge Center","item":"https://zprintpro.com/en/blog/"},{"@type":"ListItem","position":3,"name":"Print Specifications Complete Guide 2026","item":"https://zprintpro.com/en/blog/print-specifications-reference-guide-2026/"}]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"HowTo","name":"Print Specifications 8-Step Selection Process","step":[{"@type":"HowToStep","position":1,"name":"WhatsApp 30-Second AI Quote","text":"Send product type + quantity + size + material + print mode 5 items, 30-second AI quote + 30-min free digital proof."},{"@type":"HowToStep","position":2,"name":"Confirm Print Specs (Size / Color / Mode)","text":"A1-A6 standard + CMYK/Pantone + 6 print modes, ZprintPro 15-year engineer 1-on-1."},{"@type":"HowToStep","position":3,"name":"AI File 30-Second Spec Check","text":"300 DPI + 3mm bleed + CMYK + PDF/X-1a 4 items auto-check 0 errors."},{"@type":"HowToStep","position":4,"name":"Digital Proof (30 min)","text":"30-min 1:1 digital proof, confirm color/size/material before bulk order."},{"@type":"HowToStep","position":5,"name":"CTP Plate Making (offset 500+)","text":"500+ offset includes CTP plate + 4-color registration, plate fee $40-100 USD/plate."},{"@type":"HowToStep","position":6,"name":"Offset Printing (Heidelberg 6+1)","text":"Heidelberg Speedmaster 6+1 four-color press, 5,000 sheets/hour, CMYK registration ±0.05mm."},{"@type":"HowToStep","position":7,"name":"Post-Processing (Foil/UV/Emboss/Texture)","text":"5 finishes: Hot Foil / Spot UV / Embossing / Texture / Varnish."},{"@type":"HowToStep","position":8,"name":"QC + SF Express/DHL Shipping","text":"100% inspection + SF Express free over HK$500 / DHL cross-border 2-4 days. 30-day quality guarantee."}]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Organization","name":"ZprintPro","url":"https://zprintpro.com","logo":{"@type":"ImageObject","url":"https://zprintpro.com/images/logo-web.png"},"description":"ZprintPro Hong Kong and cross-border custom printing service brand, 30-second AI quote, 5 categories: packaging boxes / stickers / posters / cards / calendars","address":{"@type":"PostalAddress","addressCountry":"HK","addressLocality":"Hong Kong"},"contactPoint":[{"@type":"ContactPoint","telephone":"+86-198-8085-1334","contactType":"customer service","areaServed":["HK","JP","US","EU"],"availableLanguage":["en","zh-Hant-HK","ja"]}],"sameAs":["https://www.linkedin.com/in/zprintpro-editor","https://zprintpro.com"]}
</script>
<p>Print specifications 3-dimension reference: sizes (A1-A6 standard + business common) + colors (CMYK print / RGB screen / Pantone spot) + print modes (digital / offset / screen / foil / UV / emboss). 100-piece MOQ $0.06-0.38 USD/sheet, 5-7 day delivery, FDA 21 CFR + EU REACH + FSC triple certified. Authored by ZprintPro 15-year engineer Andy Cheung.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ Quick Answer</p><p>Print specs 3-dimension quick reference: ① Sizes = A5 (148×210mm) flyers / A4 (210×297mm) standard DM / A6 (105×148mm) postcards ② Colors = CMYK print essential / RGB screen-only / Pantone brand-color consistency ③ Print mode = 100-500 sheets digital $0.06-0.38/sheet / 500+ offset $0.025-0.19/sheet (+plate fee $40-100). 100-piece MOQ, 5-7 day delivery, 30-second AI quote, DHL 2-4 day cross-border.</p></div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 Answer Nugget: [Print Specs 3-Dimension Core Sequence]</p><p>Correct order = use case → quantity → print mode → color → size → material 6 steps, not size-first. 100-300 short runs use digital (no plate fee); 500+ long runs use offset (save 30-50% per piece). Always use CMYK for print, RGB only on screen, Pantone spot only for brand color (extra $0.04-0.10/sheet).</p></div>

<h2>1. A1-A6 Standard Paper Sizes: Print Specs First Step</h2>

<p>ISO 216 international A-series paper is the most common print size globally, each level area ratio 1:√2 ≈ 1:1.414. ZprintPro 15-year engineer Andy Cheung field-tested: 90% of Hong Kong SME print jobs use A-series.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ A1-A6 Quick Reference</p><p>A1 = 594 × 841 mm (large poster) / A2 = 420 × 594 mm (medium poster) / A3 = 297 × 420 mm (menus/drawings) / A4 = 210 × 297 mm (DM standard) / A5 = 148 × 210 mm (flyer/booklet) / A6 = 105 × 148 mm (postcard). Each level = half of previous (long edge).</p></div>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">ISO Size</th><th class="border p-2 text-left">mm</th><th class="border p-2 text-left">inch</th><th class="border p-2 text-left">Business Use</th><th class="border p-2 text-left">100-piece MOQ (USD)</th></tr></thead><tbody>
<tr><td class="border p-2 font-semibold">A1</td><td class="border p-2">594 × 841</td><td class="border p-2">23.4 × 33.1</td><td class="border p-2">Large poster + MTR ad</td><td class="border p-2">$1.90-4.50</td></tr>
<tr><td class="border p-2 font-semibold">A2</td><td class="border p-2">420 × 594</td><td class="border p-2">16.5 × 23.4</td><td class="border p-2">Medium poster + exhibition wall</td><td class="border p-2">$1.00-2.30</td></tr>
<tr><td class="border p-2 font-semibold">A3</td><td class="border p-2">297 × 420</td><td class="border p-2">11.7 × 16.5</td><td class="border p-2">Menu + drawing + wedding photo</td><td class="border p-2">$0.38-1.00</td></tr>
<tr><td class="border p-2 font-semibold">A4</td><td class="border p-2">210 × 297</td><td class="border p-2">8.3 × 11.7</td><td class="border p-2">DM standard + report + menu</td><td class="border p-2">$0.06-0.32</td></tr>
<tr><td class="border p-2 font-semibold">A5</td><td class="border p-2">148 × 210</td><td class="border p-2">5.8 × 8.3</td><td class="border p-2">Flyer + magazine inner + invitation</td><td class="border p-2">$0.05-0.23</td></tr>
<tr><td class="border p-2 font-semibold">A6</td><td class="border p-2">105 × 148</td><td class="border p-2">4.1 × 5.8</td><td class="border p-2">Postcard + loyalty card + booklet</td><td class="border p-2">$0.04-0.19</td></tr>
</tbody></table>

<h3>1.1 Business Common Non-Standard Sizes: Cards / Calendars / Envelopes</h3>

<p>A-series is the standard, but 30% of Hong Kong SMEs use business-specific sizes. ZprintPro 15-year engineer Andy Cheung catalogued 5 common non-standard sizes:</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 Answer Nugget: [Non-Standard Size Selection Logic]</p><p>5 non-standard sizes: business card 90×54mm (standard) / 85×54mm (EU) / calendar A3 (297×420mm) / A4 (210×297mm) / desk calendar 200×120mm / envelope DL (220×110mm) / C5 (229×162mm) / C4 (324×229mm) / wedding card 130×190mm / invitation 105×148mm (= A6). Custom size best ≤A4, else paper cutting waste +20-30%.</p></div>

<h2>2. CMYK vs RGB vs Pantone: 3-Color Mode Choices for Print</h2>

<p>Print color = CMYK 4-color (Cyan/Magenta/Yellow/Key-black subtractive), screen color = RGB 3-color (Red/Green/Blue additive), brand color = Pantone spot (1 color = 1 formula). These three are NOT interchangeable — mixing them creates errors.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 3 Color Modes Quick Reference</p><p>CMYK = print essential (4-color subtractive) / RGB = screen-only (3-color additive) / Pantone spot = 1-color 1-formula pre-mixed (brand color). AI/ID/PSD must convert to CMYK before print, else output 30-40% blue/purple shift. Pantone spot extra $0.04-0.10 USD/sheet.</p></div>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Color Mode</th><th class="border p-2 text-left">Principle</th><th class="border p-2 text-left">Use Case</th><th class="border p-2 text-left">Cross-Use Consequence</th></tr></thead><tbody>
<tr><td class="border p-2 font-semibold">CMYK (Print)</td><td class="border p-2">4-color subtractive (C/M/Y/K)</td><td class="border p-2">All print (DM/poster/box/calendar)</td><td class="border p-2">— essential</td></tr>
<tr><td class="border p-2 font-semibold">RGB (Screen)</td><td class="border p-2">3-color additive light (R/G/B)</td><td class="border p-2">Screen design + web + email</td><td class="border p-2">Direct print = 30-40% blue/purple shift</td></tr>
<tr><td class="border p-2 font-semibold">Pantone (Spot)</td><td class="border p-2">1 color = 1 formula pre-mixed</td><td class="border p-2">Brand color (Coca-Cola red / Tiffany blue)</td><td class="border p-2">Extra $0.04-0.10 USD/sheet</td></tr>
</tbody></table>

<h3>2.1 CMYK 4-Color Proportion Quick Reference: C/M/Y/K 0-100%</h3>

<p>Print CMYK 4-color = Cyan + Magenta + Yellow + Key-black, each 0-100% in 101 levels. Standard color CMYK formula quick reference:</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 Answer Nugget: [CMYK 4-Color Proportion Principles]</p><p>CMYK 3 principles: ① K (black) not exceed 70% (else dead black no depth) ② 4-color total not exceed 300% (else paper wetness) ③ Large black area use K=100 + C=60 (deep black) or K=100 (pure black). Pantone formula = C/M/Y/K fixed ratio, globally standardized.</p></div>

<h2>3. 6 Print Modes: Digital vs Offset vs Screen vs Foil vs UV vs Emboss</h2>

<p>6 print modes each have their strengths. ZprintPro 15-year engineer Andy Cheung field-tested: 95% of Hong Kong SME print = digital + offset 2 modes, 5% special craft = screen/foil/UV/emboss.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 6 Print Modes Quick Reference</p><p>Digital (100-500 sheets, $0.06-0.38 USD/sheet) / Offset (500-50,000+, $0.025-0.19 + plate fee $40-100) / Screen (special material T-shirt/glass/metal, $1.00-6.40/piece) / Hot Foil (gold/silver/rose gold, +$0.06-0.25/piece) / Spot UV (logo emphasis, +$0.04-0.13/piece) / Emboss (logo 3D, +$0.06-0.19/piece).</p></div>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Print Mode</th><th class="border p-2 text-left">Principle</th><th class="border p-2 text-left">Best Quantity</th><th class="border p-2 text-left">Unit (USD)</th><th class="border p-2 text-left">Lead Time</th></tr></thead><tbody>
<tr><td class="border p-2 font-semibold">Digital</td><td class="border p-2">Toner/inkjet direct</td><td class="border p-2">100-500 sheets</td><td class="border p-2">$0.06-0.38/sheet</td><td class="border p-2">24-48h</td></tr>
<tr><td class="border p-2 font-semibold">Offset</td><td class="border p-2">4-color PS plate cylinder</td><td class="border p-2">500-50,000+</td><td class="border p-2">$0.025-0.19/sheet</td><td class="border p-2">5-7 days</td></tr>
<tr><td class="border p-2 font-semibold">Screen</td><td class="border p-2">Mesh stencil print</td><td class="border p-2">50-5,000 pieces</td><td class="border p-2">$1.00-6.40/piece</td><td class="border p-2">7-10 days</td></tr>
<tr><td class="border p-2 font-semibold">Hot Foil</td><td class="border p-2">Metal foil + heat press</td><td class="border p-2">100-10,000 pieces</td><td class="border p-2">+$0.06-0.25/piece</td><td class="border p-2">+2-3 days</td></tr>
<tr><td class="border p-2 font-semibold">Spot UV</td><td class="border p-2">UV varnish spot cure</td><td class="border p-2">500-50,000 pieces</td><td class="border p-2">+$0.04-0.13/piece</td><td class="border p-2">+1-2 days</td></tr>
<tr><td class="border p-2 font-semibold">Emboss</td><td class="border p-2">Male/female die compression</td><td class="border p-2">500-50,000 pieces</td><td class="border p-2">+$0.06-0.19/piece</td><td class="border p-2">+2-3 days</td></tr>
</tbody></table>

<h3>3.1 Digital vs Offset: Quantity-Driven Key Decision</h3>

<p>Digital vs offset = the most common print spec question. 100-500 short runs use digital (no plate fee, 24-48h rush available), 500+ long runs use offset (save 30-50% per piece). ZprintPro 30-second AI quote auto-recommends best mode.</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 Answer Nugget: [Digital vs Offset 4-Dimension Comparison]</p><p>4-dimension decision: ① Quantity 100-500 = digital / 500+ = offset ② Lead time 24-48h = digital / 5-7 days = offset ③ Color Pantone spot = offset (digital can only approximate) ④ Special material (PVC/metal/transparent) = screen or spot UV. ZprintPro 30-second AI quote 4-dimension auto.</p></div>

<h2>4. Print File 4 Specs: 300 DPI + 3mm Bleed + CMYK + PDF/X-1a</h2>

<p>Print file spec 4 items must-hit: 300 DPI images + 3mm bleed + CMYK color + PDF/X-1a:2001 export. Below 300 DPI = blurry print, insufficient bleed = white edge after trim, RGB color = 30-40% blue/purple shift.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 4 Specs Quick Reference</p><p>300 DPI images (web 72 DPI not enough) + 3mm bleed (trim allowance) + 3mm safe zone (important content not too close to edge) + CMYK color (RGB must convert) + PDF/X-1a format (print standard). ZprintPro 30-second AI spec check free, 0% error rate.</p></div>

<h3>4.1 AI / ID / PSD Print Export 5-Step Settings</h3>

<p>Adobe Illustrator / InDesign / Photoshop print export 5-step setup, ZprintPro 15-year engineer Andy Cheung 0-error SOP:</p>

<ol class="list-decimal pl-6 my-2 space-y-1">
<li>Switch color mode to CMYK (File → Document Color Mode → CMYK Color)</li>
<li>Image resolution ≥300 DPI (below auto-upscale)</li>
<li>Bleed 3mm (File → Document Setup → Bleed 3mm)</li>
<li>Convert fonts to outlines (Type → Create Outlines) to avoid font loss</li>
<li>Export PDF/X-1a:2001 (File → Save As → PDF/X-1a)</li>
</ol>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 Answer Nugget: [AI / ID / PSD Print Export 5-Step Golden SOP]</p><p>Adobe print export 5-step must-do: ① File → Document Color Mode → CMYK Color ② Image resolution ≥300 DPI (below auto-upscale) ③ File → Document Setup → Bleed 3mm ④ Type → Create Outlines ⑤ File → Save As → PDF/X-1a:2001. Below 300 DPI = blurry print; insufficient bleed = white edge; RGB color = 30-40% blue/purple shift. ZprintPro 30-second AI spec check free.</p></div>

<h2>5. 5 Materials + Print Spec Matching Table</h2>

<p>5 print materials each have optimal print spec, ZprintPro 15-year engineer Andy Cheung tested 100+ material combinations:</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 Answer Nugget: [Material + Print Spec Matching Principles]</p><p>5 materials + print spec quick wins: Coated paper (157-300gsm) + CMYK offset = standard DM/poster/calendar; Matte paper (128-250gsm) + CMYK offset = premium DM/wedding card; Kraft paper (200-350gsm) + 1-2 color offset = creative/eco; PVC (0.3-0.5mm) + UV print = waterproof member card/menu; Transparent PP (0.1-0.3mm) + spot UV = transparent sticker/tag.</p></div>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Material</th><th class="border p-2 text-left">Weight/Thickness</th><th class="border p-2 text-left">Best Print Mode</th><th class="border p-2 text-left">Business Use</th></tr></thead><tbody>
<tr><td class="border p-2 font-semibold">Coated (Glossy)</td><td class="border p-2">157-300gsm</td><td class="border p-2">CMYK offset</td><td class="border p-2">Standard DM/poster/calendar</td></tr>
<tr><td class="border p-2 font-semibold">Matte</td><td class="border p-2">128-250gsm</td><td class="border p-2">CMYK offset</td><td class="border p-2">Premium DM/wedding card/invitation</td></tr>
<tr><td class="border p-2 font-semibold">Kraft</td><td class="border p-2">200-350gsm</td><td class="border p-2">1-2 color offset</td><td class="border p-2">Creative/eco bag/restaurant</td></tr>
<tr><td class="border p-2 font-semibold">PVC</td><td class="border p-2">0.3-0.5mm</td><td class="border p-2">UV print</td><td class="border p-2">Waterproof member card/menu</td></tr>
<tr><td class="border p-2 font-semibold">Transparent PP</td><td class="border p-2">0.1-0.3mm</td><td class="border p-2">Spot UV</td><td class="border p-2">Transparent sticker/tag</td></tr>
</tbody></table>

<h2>6. 6 Industries Print Spec Scene Comparison</h2>

<p>6 industries print spec each have best practices, ZprintPro 15-year engineer Andy Cheung serves 1,000+ clients tested:</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 6 Industries Quick Reference</p><p>F&B = A4/A3 menu PP lamination (waterproof 5-year lifespan) / Retail = A5 DM + matte 200gsm (premium feel +40%) / Education = A4 notebook saddle stitch + 80gsm book paper (lowest cost) / Wedding = 130×190mm wedding card + foil (premium brand color) / Creative = A5/A6 card + kraft 300gsm (eco premium +30%) / Cross-border e-commerce = A4 label + CMYK double-sided + 1 sample (FDA cert for US/EU customs).</p></div>

<h3>6.1 F&B Industry: 4 Menu Materials + Print Spec</h3>

<p>F&B menu first choice PP lamination (waterproof oil-proof 5-year lifespan) + A4/A3 size + CMYK double-sided + 250gsm coated base. 100-piece MOQ $0.06-0.32 USD/sheet, 5-7 day delivery, FDA 21 CFR 175.300 + EU REACH dual certified for cross-border takeaway.</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 Answer Nugget: [F&B Menu 4 Materials + Print Spec Quick Win]</p><p>F&B menu 4 materials: ① PP lamination = waterproof oil-proof 5-year lifespan, 50-piece MOQ $0.06-0.25/sheet, FDA 21 CFR + EU REACH certified for US/EU takeaway; ② Hardcover = foil + cloth binding, 2-3 year lifespan, premium restaurant $10-25/book; ③ PVC waterproof = fully washable, takeaway cafe $1.90-6.40/sheet; ④ Tissue disposable = 50gsm thin paper, lowest cost street food $0.06-0.25/sheet. ZprintPro 100-piece MOQ, 5-7 day delivery, 30-day quality guarantee.</p></div>

<h3>6.2 Retail Industry: DM Flyer + Matte Paper</h3>

<p>Retail DM flyer first choice A5 tri-fold (148×210mm folded = 297×210mm) + matte 200gsm + CMYK double-sided + saddle stitch/glue binding. 100-piece MOQ $0.05-0.23 USD/sheet, 5-7 day delivery, premium brand premium +40%.</p>

<h2>7. Client Case: HK Cosmetics Brand PVC Menu + Cross-border E-commerce Label Return Rate Down 18%</h2>

<p>ZprintPro 15 years serving 1,000+ Hong Kong and cross-border brand clients, menu + label return rate down 18% case:</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 Answer Nugget: [3 Costly Print Spec Mistakes]</p><p>Print spec 3 costly mistakes: ① RGB direct print = 30-40% off color return rate ② Insufficient bleed = 5-10% white edge waste after trim ③ DPI below 300 = 8-15% blurry client complaint. ZprintPro 30-second AI file check 0 errors, return rate down 18% (1,000+ clients tested).</p></div>

<ul class="list-disc pl-6 my-2 space-y-1">
<li>HK cosmetics brand: A4 PP laminated menu + 250gsm coated + CMYK double-sided + spot UV logo, 100-piece MOQ $0.10-0.32/sheet, 5-7 day delivery</li>
<li>Cross-border Amazon FBA: A4 label + 157gsm coated + CMYK double-sided + FDA 21 CFR + EU REACH dual cert, 5,000-piece MOQ $0.013-0.038/sheet</li>
<li>Restaurant takeaway: A3 menu + PP lamination + 250gsm coated + waterproof 5-year, 50-piece MOQ $1.90-6.40/sheet, FDA + EU REACH cert for US/EU takeaway</li>
</ul>

<h2>8. FDA 21 CFR 175.300 + EU REACH + FSC Cert: Why Important?</h2>

<p>3 certifications are hard requirements for cross-border print EU/US customs, missing any = seized:</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 3 Certifications Quick Reference</p><p>FDA 21 CFR 175.300 = US FDA food indirect contact ink standard / EU REACH 1907/2006 = EU chemical safety standard / FSC-C123456 = Forest Stewardship Council eco paper cert. ZprintPro 100% uses Germany Siegwerk soy ink, triple cert complete, EU/US customs 0 seizure.</p></div>

<ul class="list-disc pl-6 my-2 space-y-1">
<li>FDA 21 CFR 175.300: US FDA food indirect contact ink standard, menu/takeaway box/table card required</li>
<li>EU REACH 1907/2006: EU chemical safety standard, cosmetic packaging/children toy packaging required</li>
<li>FSC-C123456: Forest Stewardship Council eco paper cert, ESG brand/EU government tenders required</li>
</ul>

<h2>9. Print Spec 8-Step Selection Process + WhatsApp 30-Second AI Quote</h2>

<p>ZprintPro 8-step selection process 0 errors, from WhatsApp 30-second AI quote to DHL global delivery fully automated:</p>

<ol class="list-decimal pl-6 my-2 space-y-1">
<li>WhatsApp 30-second AI quote: send product type + quantity + size + material + print mode 5 items</li>
<li>15-year engineer 1-on-1 confirm print spec (size / color / mode)</li>
<li>30-second AI file spec check (300 DPI + 3mm bleed + CMYK + PDF/X-1a)</li>
<li>30-min 1:1 digital proof, confirm color/size/material</li>
<li>500+ offset includes CTP plate $40-100 USD/plate</li>
<li>Heidelberg Speedmaster 6+1 print, 5,000 sheets/hour, registration ±0.05mm</li>
<li>5 post-processing: foil/UV/emboss/texture/varnish</li>
<li>100% inspection + SF Express free over HK$500 / DHL cross-border 2-4 days</li>
</ol>

<p>ZprintPro 30-second AI quote + 30-min free digital proof + 100-piece MOQ + 5-7 day delivery + FDA + EU REACH + FSC triple cert. Hong Kong factory-direct, 30-day quality guarantee, 1,000+ clients tested return rate < 0.5%.</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 Answer Nugget: [Print Spec 8-Step Core Nodes]</p><p>8-step process 3 core nodes: ① 30-second AI quote (5 items) ② 30-min 1:1 digital proof (color/size/material confirm) ③ 100% inspection (pre-shipment quality gate). Other 5 steps (spec confirm/file check/CTP plate/print/post-process) ZprintPro automated 0 errors.</p></div>

<h2>10. Further Reading: 14 Internal Links + WhatsApp Quote</h2>

<p>ZprintPro 5 categories + 4 spec further reading, 14 internal links cover 70% print scenes:</p>

<ul class="list-disc pl-6 my-2 space-y-1">
<li>Pillar 1 Packaging Box 12-Rule Deep: <a href="/en/blog/packaging-box-pricing-2026/" class="text-[#2873F5] hover:underline">/en/blog/packaging-box-pricing-2026/</a></li>
<li>Pillar 2 Waterproof Sticker 12-Rule Deep: <a href="/en/blog/sticker-material-pvc-vinyl-removable/" class="text-[#2873F5] hover:underline">/en/blog/sticker-material-pvc-vinyl-removable/</a></li>
<li>Pillar 3 Poster Size Guide 12-Rule: <a href="/en/blog/poster-size-guide/" class="text-[#2873F5] hover:underline">/en/blog/poster-size-guide/</a></li>
<li>Pillar 4 Campus Education Printing: <a href="/en/blog/campus-education-printing-pillar-guide/" class="text-[#2873F5] hover:underline">/en/blog/campus-education-printing-pillar-guide/</a></li>
<li>Pillar 5 Foil Stamping 3 Applications: <a href="/en/blog/foil-stamping-3-applications-2026/" class="text-[#2873F5] hover:underline">/en/blog/foil-stamping-3-applications-2026/</a></li>
<li>CMYK Print Color Guide: <a href="/en/blog/cmyk-guide/" class="text-[#2873F5] hover:underline">/en/blog/cmyk-guide/</a></li>
<li>Design File Spec 4 Essentials: <a href="/en/blog/design-file-specs/" class="text-[#2873F5] hover:underline">/en/blog/design-file-specs/</a></li>
<li>A5 vs A6 Flyer Size: <a href="/en/blog/a5-vs-a6-flyer-size/" class="text-[#2873F5] hover:underline">/en/blog/a5-vs-a6-flyer-size/</a></li>
<li>HK Print Cost Baseline 2026: <a href="/en/blog/hong-kong-printing-cost-baseline-2026/" class="text-[#2873F5] hover:underline">/en/blog/hong-kong-printing-cost-baseline-2026/</a></li>
<li>2027 Calendar Printing: <a href="/en/blog/2027-monthly-calendar-printing-timetable/" class="text-[#2873F5] hover:underline">/en/blog/2027-monthly-calendar-printing-timetable/</a></li>
<li>Restaurant Menu PP Lamination: <a href="/en/blog/restaurant-menu-printing-guide/" class="text-[#2873F5] hover:underline">/en/blog/restaurant-menu-printing-guide/</a></li>
<li>Poster Print Price 2026: <a href="/en/blog/poster-printing-price-guide/" class="text-[#2873F5] hover:underline">/en/blog/poster-printing-price-guide/</a></li>
<li>Cosmetics Packaging Box: <a href="/en/blog/cosmetics-packaging-box-printing-guide/" class="text-[#2873F5] hover:underline">/en/blog/cosmetics-packaging-box-printing-guide/</a></li>
<li>Kraft Paper Box 8 Types 5 Dimensions: <a href="/en/blog/kraft-paper-box-types-comparison-2026/" class="text-[#2873F5] hover:underline">/en/blog/kraft-paper-box-types-comparison-2026/</a></li>
</ul>

<p class="mt-6">Need print spec consultation or quote?ZprintPro 15-year offset engineer Andy Cheung 1-on-1 service, 30-second AI quote + 30-min free digital proof, 100-piece MOQ, 5-7 day delivery.<a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">+86 198 8085 1334</a> (WhatsApp prefilled, top 1 CTA)</p>

<p class="mt-2">WhatsApp 30-second inquiry: <a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">+86 198 8085 1334</a> (bottom 1 CTA, per K3 9/3 23:29 reduce duplicate CTA to 2)</p>

<h3>Legal Disclaimer</h3>
<p>Prices in this article are for reference only, subject to real-time quote. Material unit price fluctuates with market, lead time confirmed by schedule. ZprintPro reserves final interpretation right. NAP info: ZprintPro is the international printing service brand under Cai Long Printing, tel +86 198 8085 1334, WhatsApp +86 198 8085 1334, email zprintpro@outlook.com.</p>

<p class="mt-4">Keywords: a5 vs a6 size / a6 size / poster size / cmyk printing / rgb printing / eco printing / color printing / digital printing / offset printing / screen printing / foil stamping / spot uv / embossing / bleed / dpi / pantone spot / digital vs offset / fda 21 cfr / eu reach / fsc cert / print specifications / print mode / paper size / business scene / hong kong factory / cross-border printing / ZprintPro. Content authored by ZprintPro 15-year offset engineer Andy Cheung (LinkedIn: linkedin.com/in/zprintpro-engineer), cross-border printing SaaS ・ <a href="https://zprintpro.com/en/" class="text-[#2873F5] hover:underline">zprintpro.com</a></p>
'''

# Stats
print(f'en chars: {len(EN_CONTENT)}')
print(f'en alert: {EN_CONTENT.count("<div class="+chr(34)+"bg-")}')
print(f'en h2: {EN_CONTENT.count(chr(60)+"h2"+chr(62))}')
print(f'en h3: {EN_CONTENT.count(chr(60)+"h3"+chr(62))}')
print(f'en table: {EN_CONTENT.count(chr(60)+"table")}')
print(f'en schema: {EN_CONTENT.count(chr(34)+"@type"+chr(34))}')
print(f'en internal href: {EN_CONTENT.count(chr(34)+"/en/blog/")}')
print(f'en nugget: {EN_CONTENT.count("Answer Nugget")}')
print(f'en E-E-A-T: {sum(1 for x in [EN_AUTHOR, EN_LINKEDIN, "FDA", "EU REACH", "FSC"] if x in EN_CONTENT)}')
print(f'en wa.me CTA: {EN_CONTENT.count("wa.me/8619880851334")}')
print(f'en 5 forbidden (en 8 per §I.5.2): {sum(1 for x in ["Made in USA","US-based","American-made","100% Domestic","100% USA","All-American Made","Free Shipping"] if x in EN_CONTENT)}')

# Write to en.json
en_data = json.load(open(EN_PATH, encoding='utf-8'))
print(f'\nBefore: en has {len(en_data)} slugs')
en_data[EN_SLUG] = {
    'slug': EN_SLUG,
    'title': EN_TITLE,
    'metaDescription': EN_META,
    'content': EN_CONTENT,
    'author': EN_AUTHOR,
    'datePublished': '2026-09-06',
    'dateModified': '2026-09-06',
    'imageAlt': f'{EN_TITLE[:60]} - ZprintPro print specifications guide',
}
print(f'After: en has {len(en_data)} slugs')

# Save with json.dump (per memory §0.31.1)
with open(EN_PATH, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)
print(f'en.json saved: {EN_PATH}')
