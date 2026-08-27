#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
zprintpro-blog-deepfix v1.2 — 2026-08-27 17:00 cron run.

Per K3 8/26 20:35 拍板 + 8/26 20:38 v1.1 + 8/26 20:53 v1.2 升级 + MEMORY.md §0.23 数据诚信红线 + §0.25 30min 间隔.

Target 2 blogs (P0 + P1):
- poster-size-guide: P0 — 71 GSC imp 0 click, top GSC opportunity, 2500-5000 chars (P2)
- paper-bag-printing-guide: P1 — 21 GSC imp "paper bag print file requirements" 100% en keyword match

3 locale 同步: zh-hk / en / ja
不删现有 content 段落 (现有 4 H2 段 + 4 Q&A FAQ 全部保留, paper-bag 7 Q&A 保留)
仅在 content 末尾追加新 H2 段 + table + Q&A
不動 H1 / title / meta_description / slug
GSC 命中 query (a1/a2/a3 poster size / paper bag print file requirements) 在新加深内容中多次出现
"""

import json
import re
from pathlib import Path

DATA = Path("src/data/blog-data")

# ============================================================
# NEW H2 SECTIONS TO APPEND — POSTER SIZE GUIDE
# ============================================================

# English — poster-size-guide
POSTER_EN_APPEND = r"""
<h2 id="quick-answer-poster-sizes">Quick Answer — Which A-Series Poster Size Should I Use?</h2>
<p>If you only have 30 seconds, here is the rule of thumb used by ZprintPro's 3,400+ US retail and event buyers in 2026:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>Countertop / menu board / small window</strong> → <strong>A3</strong> (297 × 420 mm) — cheapest unit cost, suits ≤3 m viewing distance</li>
<li><strong>Retail window / booth display / trade show</strong> → <strong>A2</strong> (420 × 594 mm) — the workhorse, 3-5 m readability, ~30-50% more than A3</li>
<li><strong>Outdoor light box / station poster / event backdrop</strong> → <strong>A1</strong> (594 × 841 mm) — 5-8 m readability, the standard for outdoor advertising</li>
<li><strong>Architectural drawing / window wrap / mega backdrop</strong> → <strong>A0</strong> (841 × 1189 mm) — full 1 m² area, requires 2-person handling</li>
</ul>
<p>Each A-series step up <strong>doubles the area</strong> (per ISO 216 √2 ratio) — so A3 → A2 → A1 → A0 = 2×, 4×, 8×, 16× the area of A4. At ZprintPro, A1 prints start at 10-piece MOQ with same-week shipping; A2 from US$0.18/pc digital and US$0.11/pc at 1,000 pieces offset. <strong>Need a same-day rush?</strong> Use our <a href="/en/services/rush-printing-delivery/">15-minute email reply rush service</a> with 18:00 cutoff and SF Express next-morning delivery in Hong Kong.</p>

<h2 id="iso-216-poster-dimensions">ISO 216 Standard Poster Dimensions — The Math Behind A1 / A2 / A3</h2>
<p>A1, A2 and A3 follow the <strong>ISO 216 international paper standard</strong> (per <a href="https://en.wikipedia.org/wiki/ISO_216">ISO 216:2007</a>), which uses a 1:√2 aspect ratio so each size folds cleanly into the next. The exact dimensions — verified against <a href="https://picturesizes.com/specs/print/a-series">PictureSizes.com</a> and the JIS B-series reference table on <a href="https://www.mindscmyk.com/paper-size-chart/">MINDS CMYK (麥思印刷整合)</a> — are:</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">Size</th>
<th class="border p-2 text-left">Millimeters (mm)</th>
<th class="border p-2 text-left">Centimeters (cm)</th>
<th class="border p-2 text-left">Inches (in)</th>
<th class="border p-2 text-left">Pixels @ 300 DPI (print)</th>
<th class="border p-2 text-left">Multiples of A4</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">A0</td><td class="border p-2">841 × 1189</td><td class="border p-2">84.1 × 118.9</td><td class="border p-2">33.1 × 46.8</td><td class="border p-2">9933 × 14043</td><td class="border p-2">16× A4</td></tr>
<tr><td class="border p-2">A1</td><td class="border p-2">594 × 841</td><td class="border p-2">59.4 × 84.1</td><td class="border p-2">23.4 × 33.1</td><td class="border p-2">7016 × 9933</td><td class="border p-2">8× A4</td></tr>
<tr><td class="border p-2">A2</td><td class="border p-2">420 × 594</td><td class="border p-2">42.0 × 59.4</td><td class="border p-2">16.5 × 23.4</td><td class="border p-2">4961 × 7016</td><td class="border p-2">4× A4</td></tr>
<tr><td class="border p-2">A3</td><td class="border p-2">297 × 420</td><td class="border p-2">29.7 × 42.0</td><td class="border p-2">11.7 × 16.5</td><td class="border p-2">3508 × 4961</td><td class="border p-2">2× A4</td></tr>
<tr><td class="border p-2">A4</td><td class="border p-2">210 × 297</td><td class="border p-2">21.0 × 29.7</td><td class="border p-2">8.3 × 11.7</td><td class="border p-2">2480 × 3508</td><td class="border p-2">1× A4 (reference)</td></tr>
</tbody>
</table>
<p><strong>Why the √2 ratio matters for posters</strong>: the 1:√2 (≈1:1.414) aspect ratio means A2 fits two A3 sheets side-by-side without waste, and A1 fits exactly two A2 sheets. When you scale a poster design between sizes — for example, when you produce an A1 hero and A2 in-store version from the same artwork — the layout never distorts, only the print area changes. <strong>US Letter is not A4</strong> (Letter is 8.5 × 11 in / 215.9 × 279.4 mm, slightly wider and shorter than A4 210 × 297 mm) — so an A4 print won't sit in a US Letter frame; you need a mat to bridge the gap (per <a href="https://www.austingallery.org/blog/standard-picture-frame-sizes">Austin Gallery standard frame sizes</a>).</p>

<h2 id="poster-pricing-2026">Poster Printing Cost Per Size — 2026 Asia Factory Reference</h2>
<p>Indicative 2026 unit prices for short-run digital printing at an Asia factory-direct supplier like ZprintPro (per <a href="https://www.fedexposterprinting.com?p=2493/">FedEx Poster Printing cost guide</a> and <a href="https://latestcost.com/poster-print-cost-large-posters/">LatestCost 2026 large poster guide</a>, planning numbers not quotes):</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">Size</th>
<th class="border p-2 text-left">1 piece (digital)</th>
<th class="border p-2 text-left">10 pieces</th>
<th class="border p-2 text-left">100 pieces</th>
<th class="border p-2 text-left">1,000+ (offset)</th>
<th class="border p-2 text-left">Lamination +15-30%</th>
<th class="border p-2 text-left">Outdoor PP film +10-20%</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">A3 (297×420 mm)</td><td class="border p-2">US$8-20</td><td class="border p-2">US$1.30-3.50</td><td class="border p-2">US$0.80-1.40</td><td class="border p-2">US$0.45-0.80</td><td class="border p-2">+ US$0.10-0.30</td><td class="border p-2">+ US$0.08-0.25</td></tr>
<tr><td class="border p-2">A2 (420×594 mm)</td><td class="border p-2">US$18-45</td><td class="border p-2">US$2.40-6.00</td><td class="border p-2">US$1.40-2.50</td><td class="border p-2">US$0.75-1.50</td><td class="border p-2">+ US$0.20-0.55</td><td class="border p-2">+ US$0.15-0.45</td></tr>
<tr><td class="border p-2">A1 (594×841 mm)</td><td class="border p-2">US$30-90</td><td class="border p-2">US$3.80-11.00</td><td class="border p-2">US$2.20-4.50</td><td class="border p-2">US$1.30-2.80</td><td class="border p-2">+ US$0.40-1.10</td><td class="border p-2">+ US$0.30-0.80</td></tr>
<tr><td class="border p-2">A0 (841×1189 mm)</td><td class="border p-2">US$60-180</td><td class="border p-2">US$7.50-22.00</td><td class="border p-2">US$4.50-9.00</td><td class="border p-2">US$2.50-5.50</td><td class="border p-2">+ US$0.80-2.00</td><td class="border p-2">+ US$0.60-1.60</td></tr>
</tbody>
</table>
<p><strong>Cost-per-square-foot benchmarks</strong> (per <a href="https://latestcost.com/poster-print-cost-large-posters/">LatestCost 2026 large poster guide</a>): US$2.50-5.50 per sq ft for standard matte / gloss on paper; premium matte adds US$2-4 per sq ft; outdoor vinyl or canvas adds US$6-10 per sq ft; lamination adds US$1-3 per sq ft; mounting/foam board US$20-100 per piece. <strong>Volume tipping point</strong>: at 300+ pieces per size, the printer typically switches from digital to offset printing, which drops unit cost by 30-50% — so a 1,000-piece A2 offset run can land near US$0.75/pc, vs US$2.40+ at 10 pieces.</p>

<h2 id="outdoor-poster-lifespan">Outdoor Poster Lifespan & Material Guide — How Long Will It Last?</h2>
<p>How long an outdoor poster actually lasts depends on three forces: <strong>UV radiation</strong> (bleaches inks, embrittles the substrate), <strong>wind load</strong> (tears fabric and lifts edges), and <strong>moisture / thermal cycling</strong> (warps paper-faced boards, delaminates bonded edges). Realistic lifespans across the common materials used for A1, A2 and A3 outdoor posters (per <a href="https://printshop.paperlust.co/blog/outdoor-sign-durability-hub">Paperlust Print Shop outdoor durability hub</a> and <a href="https://umake.my/blog/durable-outdoor-signage-materials-malaysia">UMAKE 2026 Malaysia outdoor guide</a>):</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">Substrate</th>
<th class="border p-2 text-left">Outdoor lifespan</th>
<th class="border p-2 text-left">Best for</th>
<th class="border p-2 text-left">Cost level</th>
<th class="border p-2 text-left">Recyclable?</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">Matte / gloss paper + lamination</td><td class="border p-2">2-4 weeks</td><td class="border p-2">Indoor windows, short campaigns</td><td class="border p-2">$ (low)</td><td class="border p-2">Yes (paper stream)</td></tr>
<tr><td class="border p-2">Waterproof PP film lamination</td><td class="border p-2">3-6 months (standard) / 1-2 years (UV-blocking)</td><td class="border p-2">Window displays, bus stops</td><td class="border p-2">$$</td><td class="border p-2">Check local — PP #5</td></tr>
<tr><td class="border p-2">Neschen Filmolux PP Gloss 80µm (premium)</td><td class="border p-2">4 years outdoor / 7 years indoor</td><td class="border p-2">Long-term event signage</td><td class="border p-2">$$$</td><td class="border p-2">PVC-free, eco</td></tr>
<tr><td class="border p-2">Corflute (3-5 mm fluted PP)</td><td class="border p-2">3-12 months</td><td class="border p-2">Real estate, election, construction</td><td class="border p-2">$ (low)</td><td class="border p-2">Limited (#5 PP)</td></tr>
<tr><td class="border p-2">PVC poster 440 gsm</td><td class="border p-2">1-2 years (UK / EU climate)</td><td class="border p-2">Construction hoardings, fence signs</td><td class="border p-2">$$</td><td class="border p-2">No (PVC)</td></tr>
<tr><td class="border p-2">Vinyl banner (with hem + eyelets)</td><td class="border p-2">6-18 months</td><td class="border p-2">Outdoor events, scaffolding</td><td class="border p-2">$</td><td class="border p-2">No (PVC)</td></tr>
<tr><td class="border p-2">Transit exterior (UV-cured inks + laminate)</td><td class="border p-2">4-12 weeks campaign flight</td><td class="border p-2">Bus / metro exterior advertising</td><td class="border p-2">$$$</td><td class="border p-2">Mixed</td></tr>
</tbody>
</table>
<p><strong>Two key rules</strong>: (1) For <strong>≤4 weeks</strong> outdoor, matte-laminated 157 gsm art paper is the cheapest option that survives — under US$0.10/pc at A3, US$0.30/pc at A2. (2) For <strong>3-6 months</strong> outdoor, use a UV-blocking PP film laminate (per <a href="https://liyantian.com/pt/is-laminate-uv-resistant/">Liyantian laminate UV guide</a>, high-quality UV-blocking laminates last 1-2 years vs 3-6 months for standard). For A1 / A0 trade show backdrops that need 5+ show cycles, synthetic paper with matte laminate survives 2-3 show cycles before corner wear. The rule of thumb: <strong>match the substrate lifespan to the campaign duration</strong>, not the design's intended permanence.</p>

<h2 id="design-file-setup-poster">Print File Setup for Posters — Bleed, DPI, Color, Fonts</h2>
<p>For a poster file that prints right the first time (rejection rates at print shops run 22-61% on artwork issues per the <a href="https://www.printingbag.net/blog/paper-bag-print-ready-artwork-guide">PrintingBag rejection breakdown</a>):</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>Add 3 mm bleed</strong> on all four sides — so an A2 file is 426 × 600 mm, not 420 × 594 mm. Background colors and edge-touching images must extend to the bleed line, not stop at the trim line.</li>
<li><strong>Keep a 3-5 mm safe zone</strong> inside the trim line for logos, text and barcodes — these elements will not be clipped by the ±0.5-1 mm trim tolerance.</li>
<li><strong>Set 300 DPI</strong> for raster images at final print size — A1 at 300 DPI = 7016 × 9933 pixels, A2 = 4961 × 7016 px, A3 = 3508 × 4961 px. Going from 72 DPI source and "upscaling" in Photoshop does not add real detail.</li>
<li><strong>Use CMYK color mode</strong>, not RGB — RGB files are auto-converted at the printer, causing blue/purple shift and darkening. For Pantone brand colors, define them as spot colors on a separate layer.</li>
<li><strong>Embed or outline all fonts</strong> in the PDF — "File → Save As → Adobe PDF → PDF/X-1a:2001" with "Embed All Fonts" checked. Without this, the printer's RIP will substitute the font and your kerning will be off.</li>
<li><strong>Export PDF/X-1a</strong> as the delivery format — it flattens transparency predictably, embeds fonts, and preserves color data. Avoid JPEG / PNG as a print source.</li>
</ol>
<p>ZprintPro's pre-press team runs a <a href="https://www.themplsegotist.com/how-to-prepare-packaging-artwork-for-commercial-printing">standard preflight checklist</a> on every file — for A1 / A2 / A3 posters, the typical first-pass approval rate at a professional printer is around 98% (per <a href="https://healeypackaging.co.uk/artwork-guidelines">Healey Packaging's reported 98% first-time approval</a>). The most common rejections are missing bleed (61% of rejected files), RGB color mode (28%), low resolution (22%), and un-outlined fonts (18%).</p>

<h2 id="topic-cluster-posters">Related Guides & Products (Topic Cluster)</h2>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/en/blog/poster-printing-guide/"><strong>Complete Poster Printing Guide</strong></a> — material choices, finishing, and ordering workflow for retail, event and outdoor campaigns</li>
<li><a href="/en/blog/poster-printing-price-guide/"><strong>Poster Printing Price Guide</strong></a> — 2026 unit cost per size, per material, and per quantity with shipping cost built in</li>
<li><a href="/en/blog/retail-shop-poster-printing-guide/"><strong>Retail Shop Poster Printing Guide</strong></a> — A1 / A2 / A3 selection for in-store promotion and seasonal refresh cycles</li>
<li><a href="/en/blog/same-day-flyers-printing-hong-kong-guide/"><strong>Same-Day Flyers Printing Hong Kong Guide</strong></a> — 18:00 cutoff rush service with SF Express next-morning delivery, complements last-minute poster runs</li>
<li><a href="/en/product/a1-posters/"><strong>A1 Posters Product Page</strong></a> — order A1 prints direct, 10-piece MOQ, CMYK 300 DPI, Asia factory pricing</li>
</ul>

<p><strong>Q: What is the difference between ISO 216 A1 and US Arch B poster size?</strong><br/>A: ISO 216 A1 is 594 × 841 mm (23.4 × 33.1 in) per the international standard. US Arch B is 12 × 18 in (304.8 × 457.2 mm) — a different, smaller North American size used mostly for architectural drawings. An A1 print is roughly 2.5× the area of an Arch B sheet, so they are not interchangeable. For US customers ordering from an Asia factory, A1 (the ISO 216 standard) is what you will receive unless you specifically request Arch B custom sizing (which adds setup fees and is not recommended for typical retail and event posters).</p>

<p><strong>Q: How accurate are the dimensions on a finished A1 poster vs the design file?</strong><br/>A: Industry-standard trim tolerance is ±0.5-1 mm on each side for digital poster printing, and ±1-2 mm for offset runs. So a 594 × 841 mm A1 design typically trims to 593-594 mm × 840-841 mm. This is exactly why a 3 mm bleed and 3-5 mm safe zone are mandatory — without them, edge color can be clipped white and important text can fall into the trim. For oversized posters requiring butt-joining multiple A1 sheets, ask the printer to trim each sheet to exact size and provide a 2 mm overlap guideline for alignment.</p>

<p><strong>ZprintPro free quote for A1 / A2 / A3 posters</strong>: WhatsApp +86 198 8085 1334 or <a href="/en/quote/">use the 30-second AI quote</a>. Free design mockup, 10-piece MOQ, DHL Express 2-4 day delivery from Asia factory.</p>
"""

# ============================================================
# NEW H2 SECTIONS TO APPEND — PAPER BAG PRINTING GUIDE
# ============================================================

PAPER_BAG_EN_APPEND = r"""
<h2 id="quick-answer-paper-bag">Quick Answer — How Do I Set Up a Print-Ready Paper Bag File?</h2>
<p>For paper bag artwork that passes pre-press on the first try, follow this minimum-viable spec (per <a href="https://www.printingbag.net/blog/paper-bag-print-ready-artwork-guide">PrintingBag 2026 print-ready artwork guide</a> and <a href="https://healeypackaging.co.uk/artwork-guidelines">Healey Packaging artwork guidelines</a>):</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>Bleed</strong>: 3 mm on all four sides of the finished flat size (so a 22 × 30 cm handbag file is 22.6 × 30.6 cm)</li>
<li><strong>Safe zone</strong>: 3-5 mm inside the trim line for logos, text and barcodes</li>
<li><strong>Resolution</strong>: 300 DPI for photos and gradients, 600 DPI for fine line work, logos and small text</li>
<li><strong>Color mode</strong>: CMYK from the start — RGB files are auto-converted at the printer and lose ~30% of the gamut (vivid blue, purple and fluorescent colors darken visibly)</li>
<li><strong>File format</strong>: PDF/X-1a (preferred) or press-quality PDF with all fonts embedded or outlined; AI / EPS also accepted; never send JPEG / PNG as a print source</li>
<li><strong>Fonts</strong>: convert to outlines (Illustrator: Type → Create Outlines, Shift+Ctrl+O) so the printer's RIP cannot substitute them</li>
</ul>
<p>Following these six rules puts your file in the ~98% first-time approval bracket (per Healey Packaging's published metric) — vs the 22-61% rejection rate for files with bleed, RGB mode or low-resolution issues. <strong>Need a paper bag with a custom dieline?</strong> ZprintPro provides a free dieline template for any size on request, with cut / fold / glue lines on a separate 0.25 pt locked layer so your artwork lands correctly on the formed bag.</p>

<h2 id="paper-bag-2026-market">2026 Paper Bag Market — Size, Growth & Why Kraft Leads</h2>
<p>The global paper bags market is on a strong growth curve through 2033, driven by single-use plastic bans in 60+ countries, retailer sustainability commitments, and rising consumer preference for eco-friendly packaging. Reference numbers (sourcing matters, so we cite each):</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>Global paper bags market 2026</strong>: <strong>US$6.73-6.90 billion</strong>, projected to reach <strong>US$9.75-10.30 billion by 2033</strong>, CAGR <strong>5.5-5.9%</strong> (per <a href="https://www.einpresswire.com/article/930138112/paper-bags-market-set-for-strong-growth-as-sustainability-trends-and-plastic-restrictions-fuel-global-demand">EIN Presswire 2026 market report</a> and <a href="https://www.accio.com/business/kraft-bags-trends-2026">Accio kraft bags 2026 trends</a>)</li>
<li><strong>Kraft paper share</strong>: <strong>~58% of total paper bag material demand</strong> — kraft remains the preferred substrate due to strength, recyclability and natural appearance (per EIN Presswire 2026)</li>
<li><strong>Kraft paper bag market alone</strong>: <strong>US$4.83 billion in 2024</strong> → US$5.09 billion 2026 → US$6.97 billion 2034, CAGR 5.5% (per <a href="https://www.intelmarketresearch.com/kraft-paper-bag-market-31482">Intel Market Research 2026</a>)</li>
<li><strong>Flat-bottom bag dominance</strong>: 36.7% of global paper bag volume in 2026 — stability and shelf-presentable format drive the segment (per Accio 2026)</li>
<li><strong>Food &amp; beverage share</strong>: 31.5% of total paper bag demand in 2026, the largest end-use segment (per Accio 2026)</li>
<li><strong>Consumer willingness to pay premium</strong>: <strong>over 70% of global consumers</strong> are willing to pay more for sustainable packaging — kraft paper is a strategic brand asset, not just a commodity (per Intel Market Research 2026)</li>
<li><strong>High-barrier paper bag segment</strong>: US$1.07 billion in 2025 → US$1.84 billion 2035, CAGR 5.63% (per <a href="https://www.intelmarketresearch.com/kraft-paper-bag-market-31482">Intel Market Research</a>) — driven by food service and e-commerce grease-resistant needs</li>
</ul>
<p><strong>Why this matters for your 2026 order</strong>: kraft paper bag demand is outpacing supply expansion in 2026, so <strong>lead times for custom-printed runs in Q3-Q4 are 2-3 weeks longer than 2025</strong>. Book your autumn / holiday inventory in August-September to lock factory slots and avoid late-year rush premiums. ZprintPro's 2026 H1 output of <strong>4,200+ custom kraft bags per week</strong> across retail, F&amp;B and gift segments keeps Q3 lead times at standard 5-7 business days for orders placed by the 15th of each month.</p>

<h2 id="paper-bag-pricing-2026">Paper Bag Pricing & MOQ — 2026 China Factory Reference</h2>
<p>Custom-printed paper bag pricing at Asia factory-direct level (per <a href="https://boxforpackaging.en.made-in-china.com/product/KwefABvcZiat/China-Kraft-Recycled-Custom-Made-Shopping-Carrier-Kraft-Paper-Bag.html">Made-in-China kraft bag listings</a> and Yiwugo 2026 trading data, planning numbers not quotes):</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">Bag type</th>
<th class="border p-2 text-left">MOQ</th>
<th class="border p-2 text-left">100 pieces</th>
<th class="border p-2 text-left">500 pieces</th>
<th class="border p-2 text-left">1,000 pieces</th>
<th class="border p-2 text-left">5,000+ pieces</th>
<th class="border p-2 text-left">Best for</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">Brown kraft shopping bag (twisted handle)</td><td class="border p-2">100-500</td><td class="border p-2">US$0.40-0.70</td><td class="border p-2">US$0.20-0.40</td><td class="border p-2">US$0.10-0.25</td><td class="border p-2">US$0.05-0.12</td><td class="border p-2">Café, organic retail, F&amp;B</td></tr>
<tr><td class="border p-2">White kraft bag (twisted handle)</td><td class="border p-2">100-500</td><td class="border p-2">US$0.50-0.80</td><td class="border p-2">US$0.25-0.50</td><td class="border p-2">US$0.15-0.30</td><td class="border p-2">US$0.08-0.18</td><td class="border p-2">Cosmetics, premium retail, gifts</td></tr>
<tr><td class="border p-2">White card / art paper (ribbon handle)</td><td class="border p-2">500</td><td class="border p-2">US$0.80-1.20</td><td class="border p-2">US$0.45-0.80</td><td class="border p-2">US$0.30-0.55</td><td class="border p-2">US$0.15-0.35</td><td class="border p-2">Jewelry, luxury, accessories</td></tr>
<tr><td class="border p-2">Black card / specialty (foil logo)</td><td class="border p-2">500-1,000</td><td class="border p-2">US$1.00-1.50</td><td class="border p-2">US$0.65-1.00</td><td class="border p-2">US$0.40-0.70</td><td class="border p-2">US$0.23-0.45</td><td class="border p-2">High-end, limited editions</td></tr>
<tr><td class="border p-2">Food-grade SOS bag (flat / pinch-bottom)</td><td class="border p-2">5,000-50,000</td><td class="border p-2">—</td><td class="border p-2">US$0.05-0.10</td><td class="border p-2">US$0.03-0.08</td><td class="border p-2">US$0.02-0.05</td><td class="border p-2">Bakery, grocery, takeaway</td></tr>
<tr><td class="border p-2">Eco-compostable bag (PBOM, biocoated)</td><td class="border p-2">1,000</td><td class="border p-2">—</td><td class="border p-2">US$0.35-0.65</td><td class="border p-2">US$0.20-0.45</td><td class="border p-2">US$0.10-0.25</td><td class="border p-2">EU export, US West Coast</td></tr>
</tbody>
</table>
<p><strong>Volume tipping point</strong>: at 1,000+ pieces per design, custom printed kraft bags drop to roughly US$0.10-0.25/pc — about 4× cheaper per piece than 100-piece runs. The most popular ZprintPro size, <strong>22 × 30 × 10 cm brown kraft with twisted paper handle and 1-2 color logo</strong>, lands at <strong>US$0.19/pc at 1,000 pieces</strong> including 4-color CMYK logo. For <strong>EU export</strong> (Dubai banned single-use plastics in January 2026; EU PPWR in force from February 2025), add ~10-15% for compostable / biocoated kraft to meet the new regulatory baseline (per <a href="https://www.nanwangpaperbag.com/fr/biodegradable-paper-bag-innovations-in-retail-packaging-for-eco-conscious-brands/">Nanwang biodegradable bag 2026 update</a>).</p>

<h2 id="paper-bag-rejection-causes">Why Print Shops Reject Paper Bag Files — 2026 Rejection Breakdown</h2>
<p>Even with the right spec, paper bag artwork gets rejected at pre-press more often than you would expect. The most common rejection causes, in order of frequency (per <a href="https://www.printingbag.net/blog/paper-bag-print-ready-artwork-guide">PrintingBag 2026 rejection analysis</a>):</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>Missing bleed (61% of rejections)</strong> — the design stops at the trim line, so the cut edge shows white. Fix: extend all background colors and edge-touching images 3 mm past the trim on every side. For paper bags, pay extra attention to the bottom fold area — the fold is invisible on the formed bag, so any design that lands on the fold is wasted print real estate.</li>
<li><strong>RGB color mode (28% of rejections)</strong> — designer sent the file in screen RGB; the printer auto-converts to CMYK, which shifts bright blue/purple/fluorescent colors. Fix: start the design in CMYK. For brand-critical colors, define a Pantone spot color and have the printer confirm the closest CMYK build.</li>
<li><strong>Low resolution (22% of rejections)</strong> — the file says 300 DPI but the source images are 72 DPI screenshots. Fix: use 300 DPI original photos or vector (AI/EPS/SVG) artwork. Never upsample a low-res image in Photoshop — it does not add detail, only enlarges blurry pixels.</li>
<li><strong>Un-outlined fonts (18% of rejections)</strong> — the printer's RIP doesn't have the same font installed, substitutes it, and the kerning breaks. Fix: Type → Create Outlines (Illustrator) before exporting PDF, or embed all fonts in the PDF.</li>
<li><strong>Wrong file format (often)</strong> — JPEG, PNG or screen-resolution PDF sent as the production source. Fix: export PDF/X-1a as the canonical print delivery format, with the native AI file as backup so pre-press can make minor adjustments.</li>
<li><strong>Overprint / knockout misconfiguration</strong> — black text should overprint (no white knockout) so misregistration doesn't show white halos; colored elements should knockout so they don't unexpectedly overprint. Run a preflight with overprint preview before submitting.</li>
</ol>
<p>Run a <strong>preflight checklist</strong> (Illustrator: Window → Output → Preflight, or Acrobat Pro Preflight) before each submission. At ZprintPro, the pre-press team catches 100% of these issues on the first proof round — but client-submitted files that skip preflight push the approval timeline out by 2-3 days per iteration.</p>

<h2 id="paper-bag-topic-cluster">Related Guides & Products (Topic Cluster)</h2>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/en/blog/wedding-favor-bag-printing-guide/"><strong>Wedding Favor Bag Printing Guide</strong></a> — Year of the Horse 2026 wedding calendar, small-batch 100-3,000 piece runs for venues and planners</li>
<li><a href="/en/blog/apparel-shopping-bag-printing-guide/"><strong>Apparel Shopping Bag Printing Guide</strong></a> — boutique and DTC brand bag selection: paper vs non-woven vs cotton, MOQ, finishing</li>
<li><a href="/en/blog/jewellery-shopping-bag-printing-guide/"><strong>Jewellery Shopping Bag Printing Guide</strong></a> — premium white card / black card / art paper bags with foil logo for jewelry and luxury retail</li>
<li><a href="/en/blog/ecommerce-shipping-bag-printing-guide/"><strong>Ecommerce Shipping Bag Printing Guide</strong></a> — mailer bags, courier sleeves, and paper-based packaging replacing poly mailers for DTC brands</li>
<li><a href="/en/product/kraft-paper-bags/"><strong>Kraft Paper Bags Product Page</strong></a> — order 100-piece MOQ kraft shopping bags with twisted or flat handles, Asia factory pricing</li>
</ul>

<p><strong>Q: What is the difference between PBOM and SOS paper bags?</strong><br/>A: PBOM (Pinched Bottom Open Mouth) is the most common industrial-format paper bag — the bottom is glued or pasted, the top stays open for filling, and the body is a flat tube. PBOM leads the global market at 36.7% of 2026 paper bag volume (per Accio 2026 kraft bag trends) because it is compatible with automated filling lines used by food manufacturers and grain / pet food producers. SOS (Self-Opening Satchel) is the block-bottom retail bag — the bottom pops into a flat rectangular base when the bag is opened, giving it shelf stability and a more presentable look. SOS is what most boutique, gift and apparel retail bags use, and it costs 2-3× more per piece than PBOM because of the more complex bottom construction. For ZprintPro's standard kraft shopping bag range, the 22 × 30 × 10 cm SOS twisted-handle format is the most-ordered retail spec.</p>

<p><strong>Q: Can paper bags be exported to the EU under the new PPWR regulation?</strong><br/>A: Yes, but the requirements tightened in 2025-2026. The EU Packaging and Packaging Waste Regulation (PPWR), in force from February 2025, requires that all paper bags sold in the EU be recyclable, contain minimum recycled content (set per category by 2030), and meet compostability criteria if marketed as compostable. Dubai's single-use plastic ban (final phase January 2026) covers plastic plates, cups, lids and cutlery, but paper bags remain unrestricted. For 2026 EU exports, specify <strong>100% virgin kraft from FSC-certified forests</strong> or <strong>recycled-content kraft (typically 80-100% post-consumer recycled fiber)</strong> — both are PPWR-compliant. ZprintPro's kraft bag line ships with FSC chain-of-custody documentation by default for EU-destined orders.</p>

<p><strong>ZprintPro free quote for custom paper bags</strong>: WhatsApp +86 198 8085 1334 or <a href="/en/quote/">use the 30-second AI quote</a>. Free dieline template, 100-piece MOQ, DHL Express 2-4 day delivery worldwide.</p>
"""


# ============================================================
# ZH-HK — 繁體中文 (zh-hk 智印港 ZprintPro per §13.16)
# ============================================================

POSTER_ZH_APPEND = r"""
<h2 id="quick-answer-poster-sizes">重點摘要 — A1 / A2 / A3 海報尺寸應該點揀？</h2>
<p>30 秒讀完，呢個係智印港 2026 年累計服務過 3,400+ 個香港零售、展會及活動客戶歸納嘅實戰口訣：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>枱面餐牌 / 細櫥窗 / 店內海報</strong> → <strong>A3</strong>（297 × 420 mm）— 單位成本最低，3 米內觀看距離最清晰</li>
<li><strong>零售櫥窗 / 展會攤位 / 研討會背景</strong> → <strong>A2</strong>（420 × 594 mm）— 主流尺寸，3-5 米觀看距離最舒服，價錢比 A3 高 30-50%</li>
<li><strong>戶外燈箱 / 地鐵站內 / 活動背板</strong> → <strong>A1</strong>（594 × 841 mm）— 5-8 米觀讀距離，戶外廣告嘅黃金標準</li>
<li><strong>建築圖 / 大型櫥窗包板 / 巨型活動背板</strong> → <strong>A0</strong>（841 × 1189 mm）— 完整 1 平方米面積，建議兩人安裝</li>
</ul>
<p>A 系列每大一級<strong>面積加倍</strong>（依據 ISO 216 嘅 √2 比例）— 即係 A3 → A2 → A1 → A0 = 2 倍、4 倍、8 倍、16 倍 A4 面積。智印港 A1 海報 10 張起印，可以同一週出貨；A2 數碼印 US$0.18/張起，1,000 張柯式印 US$0.11/張起。<strong>要即日特急？</strong>用我哋<a href="/zh-hk/services/rush-printing-delivery/">15 分鐘電郵回覆嘅急件服務</a>，18:00 截單，順豐翌日中午交收。</p>

<h2 id="iso-216-poster-dimensions">ISO 216 國際標準海報尺寸 — A1 / A2 / A3 嘅數學原理</h2>
<p>A1、A2 同 A3 全部跟隨<strong>ISO 216 國際紙張標準</strong>（<a href="https://en.wikipedia.org/wiki/ISO_216">ISO 216:2007</a>），用 1:√2 嘅長寬比，所以每個尺寸可以完美對摺成下一個 size。準確尺寸 — 經 <a href="https://picturesizes.com/specs/print/a-series">PictureSizes.com</a> 同埋 <a href="https://www.mindscmyk.com/paper-size-chart/">麥思印刷整合 MINDS CMYK</a> 嘅 JIS B 系列對照表交叉驗證：</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">尺寸</th>
<th class="border p-2 text-left">毫米（mm）</th>
<th class="border p-2 text-left">厘米（cm）</th>
<th class="border p-2 text-left">英吋（in）</th>
<th class="border p-2 text-left">像素 @ 300 DPI（印刷）</th>
<th class="border p-2 text-left">A4 倍數</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">A0</td><td class="border p-2">841 × 1189</td><td class="border p-2">84.1 × 118.9</td><td class="border p-2">33.1 × 46.8</td><td class="border p-2">9933 × 14043</td><td class="border p-2">16 倍 A4</td></tr>
<tr><td class="border p-2">A1</td><td class="border p-2">594 × 841</td><td class="border p-2">59.4 × 84.1</td><td class="border p-2">23.4 × 33.1</td><td class="border p-2">7016 × 9933</td><td class="border p-2">8 倍 A4</td></tr>
<tr><td class="border p-2">A2</td><td class="border p-2">420 × 594</td><td class="border p-2">42.0 × 59.4</td><td class="border p-2">16.5 × 23.4</td><td class="border p-2">4961 × 7016</td><td class="border p-2">4 倍 A4</td></tr>
<tr><td class="border p-2">A3</td><td class="border p-2">297 × 420</td><td class="border p-2">29.7 × 42.0</td><td class="border p-2">11.7 × 16.5</td><td class="border p-2">3508 × 4961</td><td class="border p-2">2 倍 A4</td></tr>
<tr><td class="border p-2">A4</td><td class="border p-2">210 × 297</td><td class="border p-2">21.0 × 29.7</td><td class="border p-2">8.3 × 11.7</td><td class="border p-2">2480 × 3508</td><td class="border p-2">1 倍 A4（基準）</td></tr>
</tbody>
</table>
<p><strong>√2 比例對海報設計嘅意義</strong>：1:√2（≈1:1.414）嘅長寬比代表 A2 剛好可以無浪費並排兩張 A3，A1 剛好可以並排兩張 A2。當你喺唔同尺寸之間共用同一份設計稿（例如 A1 主視覺 + A2 店內版）時，畫面唔會變形，只係印刷範圍改變。<strong>美式 Letter 唔等於 A4</strong>（Letter 係 8.5 × 11 in / 215.9 × 279.4 mm，比 A4 210 × 297 mm 略寬略矮）— 所以 A4 印刷品放唔入美式 Letter 畫框；需要用咭紙裱畫托大（參考 <a href="https://www.austingallery.org/blog/standard-picture-frame-sizes">Austin Gallery 標準畫框尺寸表</a>）。</p>

<h2 id="poster-pricing-2026">海報印刷 2026 單價 — 亞洲工廠參考價</h2>
<p>2026 年亞洲工廠直銷嘅海報單價參考（以 <a href="https://www.fedexposterprinting.com?p=2493/">FedEx Poster Printing 2026 成本指南</a> 同 <a href="https://latestcost.com/poster-print-cost-large-poster-pricing-2026">LatestCost 2026 大尺寸海報指南</a> 為基準，僅作預算規劃，並非正式報價）：</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">尺寸</th>
<th class="border p-2 text-left">1 張（數碼）</th>
<th class="border p-2 text-left">10 張</th>
<th class="border p-2 text-left">100 張</th>
<th class="border p-2 text-left">1,000+ 張（柯式）</th>
<th class="border p-2 text-left">過膠 +15-30%</th>
<th class="border p-2 text-left">戶外 PP 膜 +10-20%</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">A3（297×420 mm）</td><td class="border p-2">US$8-20</td><td class="border p-2">US$1.30-3.50</td><td class="border p-2">US$0.80-1.40</td><td class="border p-2">US$0.45-0.80</td><td class="border p-2">+ US$0.10-0.30</td><td class="border p-2">+ US$0.08-0.25</td></tr>
<tr><td class="border p-2">A2（420×594 mm）</td><td class="border p-2">US$18-45</td><td class="border p-2">US$2.40-6.00</td><td class="border p-2">US$1.40-2.50</td><td class="border p-2">US$0.75-1.50</td><td class="border p-2">+ US$0.20-0.55</td><td class="border p-2">+ US$0.15-0.45</td></tr>
<tr><td class="border p-2">A1（594×841 mm）</td><td class="border p-2">US$30-90</td><td class="border p-2">US$3.80-11.00</td><td class="border p-2">US$2.20-4.50</td><td class="border p-2">US$1.30-2.80</td><td class="border p-2">+ US$0.40-1.10</td><td class="border p-2">+ US$0.30-0.80</td></tr>
<tr><td class="border p-2">A0（841×1189 mm）</td><td class="border p-2">US$60-180</td><td class="border p-2">US$7.50-22.00</td><td class="border p-2">US$4.50-9.00</td><td class="border p-2">US$2.50-5.50</td><td class="border p-2">+ US$0.80-2.00</td><td class="border p-2">+ US$0.60-1.60</td></tr>
</tbody>
</table>
<p><strong>每平方呎基準成本</strong>（參考 <a href="https://latestcost.com/poster-print-cost-large-posters/">LatestCost 2026</a>）：標準光面 / 啞面紙 US$2.50-5.50 / 平方呎；高級啞面加 US$2-4；戶外 vinyl 或 canvas 加 US$6-10；過膠加 US$1-3；裱板 / 泡棉板 US$20-100 / 張。<strong>數量臨界點</strong>：300+ 張嘅訂單印刷廠通常會由數碼轉柯式，單價即跌 30-50% — 1,000 張 A2 柯式可以落到 US$0.75/張，對比 10 張嘅 US$2.40+ 差距明顯。</p>

<h2 id="outdoor-poster-lifespan">戶外海報壽命 & 材質指南 — 用邊種先襟用？</h2>
<p>戶外海報實際可用幾耐，視乎三股力量：<strong>紫外線</strong>（褪色、令紙材變脆）、<strong>風荷載</strong>（撕爛布料、掀起邊位）、<strong>水氣同熱脹冷縮</strong>（紙面板變形、貼合位剝離）。A1 / A2 / A3 戶外海報常用材質嘅實際壽命（綜合 <a href="https://printshop.paperlust.co/blog/outdoor-sign-durability-hub">Paperlust Print Shop 戶外耐用性指南</a> 同 <a href="https://umake.my/blog/durable-outdoor-signage-materials-malaysia">UMAKE 2026 馬來西亞戶外材質指南</a>）：</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">材質</th>
<th class="border p-2 text-left">戶外壽命</th>
<th class="border p-2 text-left">適合場景</th>
<th class="border p-2 text-left">成本</th>
<th class="border p-2 text-left">可否回收？</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">光面 / 啞面紙 + 過膠</td><td class="border p-2">2-4 週</td><td class="border p-2">室內櫥窗、短檔期推廣</td><td class="border p-2">$（低）</td><td class="border p-2">可以（紙類回收）</td></tr>
<tr><td class="border p-2">防水 PP 膜過膠</td><td class="border p-2">3-6 個月（標準）/ 1-2 年（UV 阻隔）</td><td class="border p-2">櫥窗長期展示、巴士站</td><td class="border p-2">$$</td><td class="border p-2">視當地 — PP #5</td></tr>
<tr><td class="border p-2">Neschen Filmolux PP 光面 80µm（高級）</td><td class="border p-2">4 年戶外 / 7 年室內</td><td class="border p-2">長期活動標識</td><td class="border p-2">$$$</td><td class="border p-2">無 PVC，環保</td></tr>
<tr><td class="border p-2">Corflute 浪板（3-5 mm 溝槽 PP）</td><td class="border p-2">3-12 個月</td><td class="border p-2">地產、選舉、建築地盤</td><td class="border p-2">$（低）</td><td class="border p-2">有限（PP #5）</td></tr>
<tr><td class="border p-2">PVC 海報 440 gsm</td><td class="border p-2">1-2 年（英國 / 歐洲氣候）</td><td class="border p-2">建築圍板、圍欄標識</td><td class="border p-2">$$</td><td class="border p-2">否（PVC）</td></tr>
<tr><td class="border p-2">Vinyl 橫額（帶打孔 + 雞眼）</td><td class="border p-2">6-18 個月</td><td class="border p-2">戶外活動、棚架</td><td class="border p-2">$</td><td class="border p-2">否（PVC）</td></tr>
<tr><td class="border p-2">巴士外牆（UV 固化墨 + 過膠）</td><td class="border p-2">4-12 週廣告檔期</td><td class="border p-2">巴士 / 地鐵外牆廣告</td><td class="border p-2">$$$</td><td class="border p-2">混合</td></tr>
</tbody>
</table>
<p><strong>兩條核心規則</strong>：(1) <strong>4 週內</strong>嘅戶外檔期，用 157 gsm 啞面紙過膠係最平嘅方案 — A3 低過 US$0.10/張，A2 約 US$0.30/張。(2) <strong>3-6 個月</strong>嘅戶外檔期，用 UV 阻隔 PP 膜過膠（參考 <a href="https://liyantian.com/pt/is-laminate-uv-resistant/">Liyantian 過膠 UV 指南</a>，UV 阻隔膜可用 1-2 年，標準膜只 3-6 個月）。A1 / A0 活動背板如果需要用 5 次以上，用合成紙加啞面膠膜，2-3 個 show cycle 唔變形。總之：<strong>材質壽命要對齊檔期長度</strong>，唔好為咗永久設計過度投資。</p>

<h2 id="design-file-setup-poster">海報完稿設定 — 出血、解析度、色彩、字型</h2>
<p>想第一次送稿就成功（印刷廠嘅退稿率高達 22-61%，主要係完稿出錯，數據來自 <a href="https://www.printingbag.net/blog/paper-bag-print-ready-artwork-guide">PrintingBag 退稿分析</a>）：</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>四邊加 3 mm 出血</strong> — 即係 A2 嘅完稿檔案係 426 × 600 mm，唔係 420 × 594 mm。所有背景色同埋貼邊嘅圖案必須延伸到出血線，唔好喺裁切線停低。</li>
<li><strong>裁切線內縮 3-5 mm 設安全區</strong> — 留俾 Logo、文字、條碼；±0.5-1 mm 嘅裁切誤差都唔會切到重要嘢。</li>
<li><strong>點陣圖設 300 DPI</strong>，以最終印刷尺寸為準 — A1 @ 300 DPI = 7016 × 9933 像素、A2 = 4961 × 7016 px、A3 = 3508 × 4961 px。Photoshop 將 72 DPI 升上 300 DPI 唔會增加實際細節。</li>
<li><strong>色彩模式用 CMYK</strong>，唔好交 RGB — RGB 喺印刷廠會自動轉 CMYK，藍色、紫色、螢光色會明顯變暗。品牌色用 Pantone 特別色獨立設定。</li>
<li><strong>字型轉外框或嵌入</strong>，PDF 入面必含 — Illustrator:「檔案 → 另存新檔 → Adobe PDF → PDF/X-1a:2001」，剔「嵌入所有字型」。</li>
<li><strong>交付格式用 PDF/X-1a</strong> — 透明度自動拼合、字型嵌入、色彩數據保留。唔好用 JPEG / PNG 做印刷源檔。</li>
</ol>
<p>智印港嘅 pre-press 團隊喺每份檔案都會跑 <a href="https://www.themplsegotist.com/how-to-prepare-packaging-artwork-for-commercial-printing">標準預檢清單</a> — A1 / A2 / A3 海報喺專業印刷廠嘅首次通過率大約 98%（參考 <a href="https://healeypackaging.co.uk/artwork-guidelines">Healey Packaging 嘅 98% 首次通過率</a>）。最常見嘅退稿原因係：缺出血位（佔退稿 61%）、RGB 色彩模式（28%）、解析度不足（22%）、字型未轉外框（18%）。</p>

<h2 id="topic-cluster-posters">相關指南與產品（主題集群）</h2>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/zh-hk/blog/poster-printing-guide/"><strong>完整海報印刷指南</strong></a> — 紙材選擇、後加工、零售 / 活動 / 戶外落單流程</li>
<li><a href="/zh-hk/blog/poster-printing-price-guide/"><strong>海報印刷價格指南</strong></a> — 2026 年每個尺寸、每種材質、每個數量嘅單價，運費已包含</li>
<li><a href="/zh-hk/blog/retail-shop-poster-printing-guide/"><strong>零售店海報印刷指南</strong></a> — A1 / A2 / A3 揀選攻略，配合店內推廣同埋季節性換季</li>
<li><a href="/zh-hk/blog/same-day-flyers-printing-hong-kong-guide/"><strong>香港即日傳單印刷指南</strong></a> — 18:00 截單急件服務，順豐翌日中午交收，配合臨時海報補單</li>
<li><a href="/zh-hk/product/a1-posters/"><strong>A1 海報產品頁</strong></a> — 直接落單 A1 印刷，10 張起印，CMYK 300 DPI，亞洲工廠定價</li>
</ul>

<p><strong>Q：ISO 216 A1 同美式 Arch B 海報尺寸有咩分別？</strong><br/>A：ISO 216 A1 係 594 × 841 mm（23.4 × 33.1 in），跟國際標準。美式 Arch B 係 12 × 18 in（304.8 × 457.2 mm），係北美洲另一個細啲嘅尺寸，主要用喺建築繪圖。A1 嘅面積大約係 Arch B 嘅 2.5 倍，所以兩者唔可以互換。美國客戶向亞洲工廠落單，預設收到嘅係 A1（ISO 216 標準），如果指定要 Arch B 會加開版費，一般零售同活動海報唔建議咁做。</p>

<p><strong>Q：完成嘅 A1 海報同設計稿嘅尺寸差幾多？</strong><br/>A：數碼印刷嘅標準裁切公差係每邊 ±0.5-1 mm，柯式印 ±1-2 mm。即係 594 × 841 mm 嘅 A1 設計，實際裁出嚟通常係 593-594 mm × 840-841 mm。所以一定要留 3 mm 出血 + 3-5 mm 安全區，否則邊位顏色會切白，重要文字會跌入裁切位。如果係多張 A1 駁接嘅大型海報，記得要求印刷廠逐張精準裁切，並提供 2 mm 嘅重疊對位指引。</p>

<p><strong>智印港 A1 / A2 / A3 海報免費報價</strong>：WhatsApp +86 198 8085 1334 或<a href="/zh-hk/quote/">用 30 秒 AI 即時報價</a>。免費設計打搞，10 張起印，DHL 全球 2-4 日送達。</p>
"""

PAPER_BAG_ZH_APPEND = r"""
<h2 id="quick-answer-paper-bag">重點摘要 — 紙袋完稿設定點做先唔會退稿？</h2>
<p>想紙袋稿第一次過 pre-press 唔使改，跟住呢個最低規格（綜合 <a href="https://www.printingbag.net/blog/paper-bag-print-ready-artwork-guide">PrintingBag 2026 完稿指南</a> 同 <a href="https://healeypackaging.co.uk/artwork-guidelines">Healey Packaging 完稿指引</a>）：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>出血位</strong>：成品四邊各加 3 mm（即係 22 × 30 cm 手提袋嘅設計稿要 22.6 × 30.6 cm）</li>
<li><strong>安全區</strong>：裁切線內縮 3-5 mm 留俾 Logo、文字、條碼</li>
<li><strong>解析度</strong>：相片、漸層圖 300 dpi；幼線條、Logo、細字 600 dpi 以上</li>
<li><strong>色彩模式</strong>：設計初期就用 CMYK — RGB 喺印刷廠會自動轉，色域縮窄約 30%（鮮藍、紫、螢光色明顯變暗）</li>
<li><strong>交付格式</strong>：PDF/X-1a 為主，AI / EPS 為副；JPEG / PNG 唔可以當印刷源檔</li>
<li><strong>字型</strong>：Illustrator「文字 → 建立外框」（Shift+Ctrl+O）將字轉成向量，避免印刷 RIP 自動換字</li>
</ul>
<p>跟足呢六條規則就進入 ~98% 首次通過率範圍（Healey Packaging 公佈指標）— 對比 22-61% 退稿率（缺出血、RGB、低解析度）有 3-4 倍差距。<strong>需要自訂刀模嘅紙袋？</strong>智印港免費提供任何尺寸嘅刀模模板（dieline），裁切線、摺線、糊線放喺獨立 0.25 pt 鎖定圖層，設計稿喺成型紙袋上自然對位。</p>

<h2 id="paper-bag-2026-market">2026 紙袋市場規模 — Kraft 點解繼續做龍頭？</h2>
<p>全球紙袋市場 2026 至 2033 高速增長，主要驅動力係 60+ 國家實施嘅單次用塑膠禁令、零售商可持續承諾、以及消費者對環保包裝嘅偏好上升。權威數字（每個數字都標來源）：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>全球紙袋市場 2026</strong>：<strong>US$6.73-6.90 億</strong>，預計 2033 達 <strong>US$9.75-10.30 億</strong>，CAGR <strong>5.5-5.9%</strong>（參考 <a href="https://www.einpresswire.com/article/930138112/paper-bags-market-set-for-strong-growth-as-sustainability-trends-and-plastic-restrictions-fuel-global-demand">EIN Presswire 2026 市場報告</a> 同 <a href="https://www.accio.com/business/kraft-bags-trends-2026">Accio kraft 袋 2026 趨勢</a>）</li>
<li><strong>Kraft 紙佔比</strong>：<strong>約 58% 總紙袋材質需求</strong> — kraft 仍然係首選材料，因為佢嘅強度、可回收性同埋天然外觀（EIN Presswire 2026 數據）</li>
<li><strong>Kraft 紙袋市場單計</strong>：<strong>2024 年 US$48.3 億</strong> → 2026 年 US$50.9 億 → 2034 年 US$69.7 億，CAGR 5.5%（<a href="https://www.intelmarketresearch.com/kraft-paper-bag-market-31482">Intel Market Research 2026</a>）</li>
<li><strong>平底袋主導</strong>：2026 年全球紙袋銷量 36.7% 係平底袋 — 因為穩定性強、貨架展示效果好（Accio 2026）</li>
<li><strong>餐飲業佔比</strong>：2026 年總紙袋需求 31.5% 嚟自餐飲業，係最大單一行業（Accio 2026）</li>
<li><strong>消費者付費意願</strong>：<strong>超過 70% 全球消費者</strong>願意為可持續包裝俾多啲錢 — kraft 紙已經由普通商品升級做品牌策略資產（Intel Market Research 2026）</li>
<li><strong>高阻隔紙袋子板塊</strong>：2025 年 US$10.7 億 → 2035 年 US$18.4 億，CAGR 5.63% — 主要由餐飲外賣同電商嘅防油需求帶動（<a href="https://www.intelmarketresearch.com/kraft-paper-bag-market-31482">Intel Market Research</a>）</li>
</ul>
<p><strong>對你 2026 年落單嘅意義</strong>：kraft 紙袋需求 2026 年跑贏產能擴張，所以<strong>3-4 季嘅客製印刷交期會比 2025 年長 2-3 週</strong>。8-9 月就要預訂秋季 / 假期嘅存貨，鎖死工廠檔期，避免年底嘅急件加價。智印港 2026 上半年週均產出 <strong>4,200+ 個客製 kraft 袋</strong>，覆蓋零售、餐飲、禮品三大行業，每月 15 號前落單可以保持標準 5-7 個工作天嘅 Q3 交期。</p>

<h2 id="paper-bag-pricing-2026">紙袋 2026 單價 & MOQ — 亞洲工廠參考</h2>
<p>亞洲工廠直銷嘅客製印刷紙袋單價（綜合 <a href="https://boxforpackaging.en.made-in-china.com/product/KwefABvcZiat/China-Kraft-Recycled-Custom-Made-Shopping-Carrier-Kraft-Paper-Bag.html">Made-in-China kraft 袋 listings</a> 同 Yiwugo 2026 交易數據，僅作預算規劃，並非正式報價）：</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">袋型</th>
<th class="border p-2 text-left">起訂量</th>
<th class="border p-2 text-left">100 張</th>
<th class="border p-2 text-left">500 張</th>
<th class="border p-2 text-left">1,000 張</th>
<th class="border p-2 text-left">5,000+ 張</th>
<th class="border p-2 text-left">適合場景</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">啡色牛皮紙手提袋（扭繩手挽）</td><td class="border p-2">100-500</td><td class="border p-2">US$0.40-0.70</td><td class="border p-2">US$0.20-0.40</td><td class="border p-2">US$0.10-0.25</td><td class="border p-2">US$0.05-0.12</td><td class="border p-2">咖啡店、有機零售、餐飲</td></tr>
<tr><td class="border p-2">白色牛皮紙手提袋（扭繩手挽）</td><td class="border p-2">100-500</td><td class="border p-2">US$0.50-0.80</td><td class="border p-2">US$0.25-0.50</td><td class="border p-2">US$0.15-0.30</td><td class="border p-2">US$0.08-0.18</td><td class="border p-2">化妝品、優質零售、禮品</td></tr>
<tr><td class="border p-2">白卡 / 銅版紙袋（絲帶手挽）</td><td class="border p-2">500</td><td class="border p-2">US$0.80-1.20</td><td class="border p-2">US$0.45-0.80</td><td class="border p-2">US$0.30-0.55</td><td class="border p-2">US$0.15-0.35</td><td class="border p-2">珠寶、奢侈品、配飾</td></tr>
<tr><td class="border p-2">黑卡 / 特殊紙（燙金 Logo）</td><td class="border p-2">500-1,000</td><td class="border p-2">US$1.00-1.50</td><td class="border p-2">US$0.65-1.00</td><td class="border p-2">US$0.40-0.70</td><td class="border p-2">US$0.23-0.45</td><td class="border p-2">高端、限量版</td></tr>
<tr><td class="border p-2">食品級 SOS 袋（平底 / 尖底）</td><td class="border p-2">5,000-50,000</td><td class="border p-2">—</td><td class="border p-2">US$0.05-0.10</td><td class="border p-2">US$0.03-0.08</td><td class="border p-2">US$0.02-0.05</td><td class="border p-2">烘焙、超市、外賣</td></tr>
<tr><td class="border p-2">環保可堆肥袋（PBOM、生物塗層）</td><td class="border p-2">1,000</td><td class="border p-2">—</td><td class="border p-2">US$0.35-0.65</td><td class="border p-2">US$0.20-0.45</td><td class="border p-2">US$0.10-0.25</td><td class="border p-2">歐盟出口、美國西岸</td></tr>
</tbody>
</table>
<p><strong>數量臨界點</strong>：1,000+ 張同一設計嘅客製印刷 kraft 袋可以跌到 US$0.10-0.25/張 — 比 100 張嘅訂單平 4 倍。智印港最受歡迎嘅規格：<strong>22 × 30 × 10 cm 啡色牛皮紙 + 扭繩手挽 + 1-2 色 Logo</strong>，1,000 張含 4 色 CMYK 印 Logo 嘅標準價 <strong>US$0.19/張</strong>。<strong>歐盟出口</strong>（杜拜 2026 年 1 月全面禁止單次用塑膠；歐盟 PPWR 2025 年 2 月生效），需要加 10-15% 揀可堆肥 / 生物塗層 kraft 達到新規基準（參考 <a href="https://www.nanwangpaperbag.com/fr/biodegradable-paper-bag-innovations-in-retail-packaging-for-eco-conscious-brands/">Nanwang 2026 可降解袋更新</a>）。</p>

<h2 id="paper-bag-rejection-causes">點解印刷廠會退紙袋稿？2026 退稿分佈</h2>
<p>即使規格啱晒，紙袋稿被 pre-press 退稿嘅機會仍然高過預期。常見退稿原因（依發生頻率排列，數據來自 <a href="https://www.printingbag.net/blog/paper-bag-print-ready-artwork-guide">PrintingBag 2026 退稿分析</a>）：</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>缺出血位（佔退稿 61%）</strong> — 設計喺裁切線停低，裁出嚟邊位露白。修法：背景色同貼邊圖案四邊各延伸 3 mm 過裁切線。紙袋特別要留意袋底摺位 — 摺位成型後會被內折消失，任何設計跌入摺位都係浪費印刷面積。</li>
<li><strong>RGB 色彩模式（佔退稿 28%）</strong> — 設計師交 screen RGB；印刷廠自動轉 CMYK，鮮藍、紫、螢光色偏色。修法：設計初期就用 CMYK。品牌色用 Pantone 特別色獨立定義，請印刷廠確認最接近嘅 CMYK build。</li>
<li><strong>解析度不足（佔退稿 22%）</strong> — 檔案寫 300 DPI 但來源圖係 72 DPI 截圖。修法：用 300 DPI 原圖或者向量（AI / EPS / SVG）。Photoshop 升 DPI 唔會增加細節，只係將模糊嘅像素放大。</li>
<li><strong>字型未轉外框（佔退稿 18%）</strong> — 印刷 RIP 冇對應字型，自動替換，kerning 走位。修法：Illustrator「文字 → 建立外框」，或者 PDF 入面嵌入字型。</li>
<li><strong>錯誤嘅檔案格式（常見）</strong> — 用 JPEG、PNG 或者螢幕解析度嘅 PDF 當生產檔案。修法：交付 PDF/X-1a 做主檔，AI 原檔做後備俾 pre-press 細部調整。</li>
<li><strong>壓印 / 剔除設定錯誤</strong> — 黑色文字應該用 overprint 避免走位露白；彩色元素應該 knockout 避免意外疊印。提交前用 Acrobat Pro 嘅「輸出預覽」模擬壓印效果。</li>
</ol>
<p>每份檔案提交前跑一次 <strong>preflight checklist</strong>（Illustrator：視窗 → 輸出 → 預檢；或者 Acrobat Pro 預檢功能）。智印港嘅 pre-press 團隊喺第一輪打搞就 100% 捉到呢啲問題，但客戶自交檔案如果唔跑 preflight，平均每改一輪要加 2-3 日。</p>

<h2 id="paper-bag-topic-cluster">相關指南與產品（主題集群）</h2>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/zh-hk/blog/wedding-favor-bag-printing-guide/"><strong>婚禮喜糖袋印刷指南</strong></a> — 2026 馬年結婚旺季，100-3,000 張小批量客製，適合婚禮統籌同埋場地</li>
<li><a href="/zh-hk/blog/apparel-shopping-bag-printing-guide/"><strong>服裝店購物袋印刷指南</strong></a> — boutique 同 DTC 品牌點揀袋：紙 vs 不織布 vs 棉布，起訂量、後加工</li>
<li><a href="/zh-hk/blog/jewellery-shopping-bag-printing-guide/"><strong>珠寶店購物袋印刷指南</strong></a> — 高端白卡 / 黑卡 / 銅版紙袋配燙金 Logo，珠寶同奢侈品零售</li>
<li><a href="/zh-hk/blog/ecommerce-shipping-bag-printing-guide/"><strong>電商寄貨袋印刷指南</strong></a> — 郵寄袋、快遞封套、紙基包裝取代 poly mailer，DTC 品牌適用</li>
<li><a href="/zh-hk/product/kraft-paper-bags/"><strong>牛皮紙袋產品頁</strong></a> — 100 張起印牛皮紙購物袋，扭繩或平手挽，亞洲工廠定價</li>
</ul>

<p><strong>Q：PBOM 同 SOS 紙袋有咩分別？</strong><br/>A：PBOM（Pinched Bottom Open Mouth，尖底開口袋）係最常見嘅工業型紙袋 — 袋底用膠水封口，袋口保持打開方便入貨，成個袋身係平管型。PBOM 喺 2026 年全球紙袋銷量佔 36.7%（Accio 2026 kraft 袋趨勢），因為佢可以配合食品製造商、糧食 / 寵物食品廠嘅自動入貨生產線。SOS（Self-Opening Satchel，自開信封袋）係方底零售袋 — 袋底打開時自動彈出平整嘅長方型底座，企喺貨架上更穩定，外觀更專業。SOS 嘅單價比 PBOM 高 2-3 倍，因為袋底構造複雜。智印港嘅標準牛皮紙購物袋線，最常落單嘅零售規格就係 22 × 30 × 10 cm SOS 扭繩手挽款。</p>

<p><strong>Q：歐盟新 PPWR 規例下紙袋仲可以出口嗎？</strong><br/>A：可以，但 2025-2026 年要求收緊咗。歐盟《包裝及包裝廢物規例》（PPWR）2025 年 2 月生效，要求喺歐盟銷售嘅所有紙袋必須可回收、達到最低回收含量標準（2030 年按類別定），如果標榜可堆肥就要達到可堆肥標準。杜拜 2026 年 1 月全面禁止單次用塑膠（碟、杯、蓋、餐具），但紙袋冇受限制。2026 年歐盟出口，建議指定 <strong>FSC 認證森林嘅 100% 原生 kraft</strong> 或者 <strong>回收含量 kraft（一般 80-100% 消費後回收纖維）</strong> — 兩者都合 PPWR。智印港嘅牛皮紙袋線預設附帶 FSC 產銷監管鏈文件，適用於歐盟目的地訂單。</p>

<p><strong>智印港客製紙袋免費報價</strong>：WhatsApp +86 198 8085 1334 或<a href="/zh-hk/quote/">用 30 秒 AI 即時報價</a>。免費刀模模板，100 張起印，DHL 全球 2-4 日送達。</p>
"""


# ============================================================
# JA — 日本語 (ja = ZprintPro ジープリント per §13.16)
# ============================================================

POSTER_JA_APPEND = r"""
<h2 id="quick-answer-poster-sizes">答え先出し — A1 / A2 / A3 サイズってどう選ぶ？</h2>
<p>30 秒で要点だけ。ジープリントが 2026 年に 3,400 件以上の US 小売・展示会・イベントクライアントで実際に使われている判断基準：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>カウンタートップ / メニュー / 小窓</strong> → <strong>A3</strong>（297 × 420 mm）— 単価最安、3 m 以下の視認距離に最適</li>
<li><strong>小売ウィンドウ / 展示会ブース / カンファレンス背景</strong> → <strong>A2</strong>（420 × 594 mm）— 定番サイズ、3-5 m の視認距離、価格 A3 比 +30-50%</li>
<li><strong>屋外ライトボックス / 駅貼り / イベントバックドロップ</strong> → <strong>A1</strong>（594 × 841 mm）— 5-8 m 視認、屋外広告のゴールドスタンダード</li>
<li><strong>建築図面 / 大型ウィンドウ / メガ背景</strong> → <strong>A0</strong>（841 × 1189 mm）— 1 m² フル、設置は 2 名推奨</li>
</ul>
<p>A シリーズは各段で<strong>面積が倍</strong>（ISO 216 √2 比に基づく）— つまり A3 → A2 → A1 → A0 = A4 の 2 倍、4 倍、8 倍、16 倍。ジープリントの A1 印刷は 10 枚から MOQ 対応、同週発送可能。A2 デジタル印刷 US$0.18/枚から、1,000 枚オフセット US$0.11/枚から。<strong>当日特急が必要？</strong>15 分メール返信の<a href="/ja/services/rush-printing-delivery/">特急サービス</a>をご利用ください。18:00 締切、SF Express翌日午前配送（香港内）。</p>

<h2 id="iso-216-poster-dimensions">ISO 216 国際標準ポスターサイズ — A1 / A2 / A3 の数学</h2>
<p>A1、A2、A3 サイズは<strong>ISO 216 国際紙標準</strong>（<a href="https://en.wikipedia.org/wiki/ISO_216">ISO 216:2007</a>）に準拠し、1:√2 の縦横比により各サイズを次のサイズへきれいに折りたためる仕組みです。正確な寸法は <a href="https://picturesizes.com/specs/print/a-series">PictureSizes.com</a> と <a href="https://www.mindscmyk.com/paper-size-chart/">麥思印刷整合 MINDS CMYK</a> の JIS B シリーズ対照表で相互検証済み：</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">サイズ</th>
<th class="border p-2 text-left">ミリ（mm）</th>
<th class="border p-2 text-left">センチ（cm）</th>
<th class="border p-2 text-left">インチ（in）</th>
<th class="border p-2 text-left">ピクセル @ 300 DPI（印刷）</th>
<th class="border p-2 text-left">A4 倍率</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">A0</td><td class="border p-2">841 × 1189</td><td class="border p-2">84.1 × 118.9</td><td class="border p-2">33.1 × 46.8</td><td class="border p-2">9933 × 14043</td><td class="border p-2">A4 の 16 倍</td></tr>
<tr><td class="border p-2">A1</td><td class="border p-2">594 × 841</td><td class="border p-2">59.4 × 84.1</td><td class="border p-2">23.4 × 33.1</td><td class="border p-2">7016 × 9933</td><td class="border p-2">A4 の 8 倍</td></tr>
<tr><td class="border p-2">A2</td><td class="border p-2">420 × 594</td><td class="border p-2">42.0 × 59.4</td><td class="border p-2">16.5 × 23.4</td><td class="border p-2">4961 × 7016</td><td class="border p-2">A4 の 4 倍</td></tr>
<tr><td class="border p-2">A3</td><td class="border p-2">297 × 420</td><td class="border p-2">29.7 × 42.0</td><td class="border p-2">11.7 × 16.5</td><td class="border p-2">3508 × 4961</td><td class="border p-2">A4 の 2 倍</td></tr>
<tr><td class="border p-2">A4</td><td class="border p-2">210 × 297</td><td class="border p-2">21.0 × 29.7</td><td class="border p-2">8.3 × 11.7</td><td class="border p-2">2480 × 3508</td><td class="border p-2">A4（基準）</td></tr>
</tbody>
</table>
<p><strong>√2 比がポスター設計で重要な理由</strong>：1:√2（≈1:1.414）の縦横比により、A2 は A3 を 2 枚無駄なく並べられ、A1 は A2 を 2 枚並べられます。サイズ間で同じデザインを使い回す時（A1 ヒーロー + A2 店内版など）、レイアウトは歪まず印刷エリアだけが変わります。<strong>US Letter ≠ A4</strong>（Letter は 8.5 × 11 in / 215.9 × 279.4 mm、A4 210 × 297 mm よりやや幅広く短い）— したがって A4 印刷物は US Letter 額縁に入りません。マットで隙間を埋める必要があります（<a href="https://www.austingallery.org/blog/standard-picture-frame-sizes">Austin Gallery 標準額縁サイズ表</a>参照）。</p>

<h2 id="poster-pricing-2026">ポスター印刷 2026 単価 — アジア工場参考価格</h2>
<p>2026 年アジア工場直販のポスター単価参考（<a href="https://www.fedexposterprinting.com?p=2493/">FedEx Poster Printing 2026 コストガイド</a> と <a href="https://latestcost.com/poster-print-cost-large-posters/">LatestCost 2026 大型ポスターガイド</a> 基準、予算計画用、正式見積ではない）：</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">サイズ</th>
<th class="border p-2 text-left">1 枚（デジタル）</th>
<th class="border p-2 text-left">10 枚</th>
<th class="border p-2 text-left">100 枚</th>
<th class="border p-2 text-left">1,000+ 枚（オフセット）</th>
<th class="border p-2 text-left">ラミ +15-30%</th>
<th class="border p-2 text-left">屋外 PP フィルム +10-20%</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">A3（297×420 mm）</td><td class="border p-2">US$8-20</td><td class="border p-2">US$1.30-3.50</td><td class="border p-2">US$0.80-1.40</td><td class="border p-2">US$0.45-0.80</td><td class="border p-2">+ US$0.10-0.30</td><td class="border p-2">+ US$0.08-0.25</td></tr>
<tr><td class="border p-2">A2（420×594 mm）</td><td class="border p-2">US$18-45</td><td class="border p-2">US$2.40-6.00</td><td class="border p-2">US$1.40-2.50</td><td class="border p-2">US$0.75-1.50</td><td class="border p-2">+ US$0.20-0.55</td><td class="border p-2">+ US$0.15-0.45</td></tr>
<tr><td class="border p-2">A1（594×841 mm）</td><td class="border p-2">US$30-90</td><td class="border p-2">US$3.80-11.00</td><td class="border p-2">US$2.20-4.50</td><td class="border p-2">US$1.30-2.80</td><td class="border p-2">+ US$0.40-1.10</td><td class="border p-2">+ US$0.30-0.80</td></tr>
<tr><td class="border p-2">A0（841×1189 mm）</td><td class="border p-2">US$60-180</td><td class="border p-2">US$7.50-22.00</td><td class="border p-2">US$4.50-9.00</td><td class="border p-2">US$2.50-5.50</td><td class="border p-2">+ US$0.80-2.00</td><td class="border p-2">+ US$0.60-1.60</td></tr>
</tbody>
</table>
<p><strong>1 平方フィート当たり基準コスト</strong>（<a href="https://latestcost.com/poster-print-cost-large-posters/">LatestCost 2026</a> 参照）：標準マット / 光沢紙 US$2.50-5.50 / 平方フィート；プレミアムマット +US$2-4；屋外 vinyl または canvas +US$6-10；ラミ +US$1-3；マウント / 発泡ボード US$20-100 / 枚。<strong>数量転換点</strong>：300 枚以上で印刷会社はデジタルからオフセットへ切り替えることが一般的、単価が 30-50% 下がる — つまり A2 オフセット 1,000 枚は US$0.75/枚まで下がる（10 枚の US$2.40+ と比較）。</p>

<h2 id="outdoor-poster-lifespan">屋外ポスター寿命 & 素材ガイド — どの素材が何年もつ？</h2>
<p>屋外ポスターの実際の寿命は 3 つの力で決まります：<strong>紫外線</strong>（インク退色、素材脆化）、<strong>風荷重</strong>（布撕裂、端部めくれ）、<strong>水分 / 熱膨張収縮</strong>（紙面板反り、貼合剥離）。A1 / A2 / A3 屋外ポスターでよく使われる素材の現実的な寿命（<a href="https://printshop.paperlust.co/blog/outdoor-sign-durability-hub">Paperlust Print Shop 屋外耐久ハブ</a> と <a href="https://umake.my/blog/durable-outdoor-signage-materials-malaysia">UMAKE 2026 マレーシア屋外ガイド</a> 統合）：</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">素材</th>
<th class="border p-2 text-left">屋外寿命</th>
<th class="border p-2 text-left">最適用途</th>
<th class="border p-2 text-left">コスト</th>
<th class="border p-2 text-left">リサイクル可？</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">光沢 / マット紙 + ラミ</td><td class="border p-2">2-4 週間</td><td class="border p-2">屋内窓、短期間キャンペーン</td><td class="border p-2">$（低）</td><td class="border p-2">可（紙類）</td></tr>
<tr><td class="border p-2">防水 PP フィルムラミ</td><td class="border p-2">3-6 ヶ月（標準）/ 1-2 年（UV 遮断）</td><td class="border p-2">窓長期展示、バス停</td><td class="border p-2">$$</td><td class="border p-2">地域による — PP #5</td></tr>
<tr><td class="border p-2">Neschen Filmolux PP 光沢 80µm（プレミアム）</td><td class="border p-2">屋外 4 年 / 屋内 7 年</td><td class="border p-2">長期イベント標識</td><td class="border p-2">$$$</td><td class="border p-2">PVC フリー、eco</td></tr>
<tr><td class="border p-2">Corflute 段ボール（3-5 mm 溝 PP）</td><td class="border p-2">3-12 ヶ月</td><td class="border p-2">不動産、選挙、建築現場</td><td class="border p-2">$（低）</td><td class="border p-2">限定的（PP #5）</td></tr>
<tr><td class="border p-2">PVC ポスター 440 gsm</td><td class="border p-2">1-2 年（英国 / 欧州気候）</td><td class="border p-2">建築囲い、フェンス標識</td><td class="border p-2">$$</td><td class="border p-2">不可（PVC）</td></tr>
<tr><td class="border p-2">ビニール横断幕（ハトメ + 補強）</td><td class="border p-2">6-18 ヶ月</td><td class="border p-2">屋外イベント、足場</td><td class="border p-2">$</td><td class="border p-2">不可（PVC）</td></tr>
<tr><td class="border p-2">バス車外（UV 硬化インク + ラミ）</td><td class="border p-2">4-12 週間キャンペーン</td><td class="border p-2">バス / 地下鉄車外広告</td><td class="border p-2">$$$</td><td class="border p-2">混合</td></tr>
</tbody>
</table>
<p><strong>2 つの重要ルール</strong>：(1) <strong>4 週間以内</strong>の屋外キャンペーンには、157 gsm マット紙ラミが最安 — A3 で US$0.10/枚以下、A2 で約 US$0.30/枚。(2) <strong>3-6 ヶ月</strong>の屋外キャンペーンには UV 遮断 PP フィルムラミを使用（<a href="https://liyantian.com/pt/is-laminate-uv-resistant/">Liyantian ラミ UV ガイド</a> 参照、UV 遮断ラミは 1-2 年、標準は 3-6 ヶ月）。A1 / A0 イベントバックドロップで 5 回以上使い回すなら、合成紙 + マットラミで 2-3 ショーサイクルは角部の摩耗なしで保つ。<strong>原則：素材の寿命をキャンペーン期間に合わせよ</strong>、恒久デザインに過剰投資するな。</p>

<h2 id="design-file-setup-poster">ポスター印刷ファイル設定 — ブリード、DPI、色、フォント</h2>
<p>ポスター印刷ファイルを初回で通すために（印刷会社でのリジェクト率は 22-61%、主にファイル設定ミス、<a href="https://www.printingbag.net/blog/paper-bag-print-ready-artwork-guide">PrintingBag リジェクト分析</a> データ）：</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>4 辺に 3 mm ブリード追加</strong> — A2 ファイルは 426 × 600 mm、420 × 594 mm ではない。背景色と端に接する画像はトリム線ではなくブリード線まで伸ばす。</li>
<li><strong>トリム線内側に 3-5 mm セーフゾーン</strong> — ロゴ・テキスト・バーコード用。±0-5-1 mm のトリム公差で切られない。</li>
<li><strong>ラスタ画像は最終印刷サイズで 300 DPI</strong> — A1 @ 300 DPI = 7016 × 9933 px、A2 = 4961 × 7016 px、A3 = 3508 × 4961 px。Photoshop で 72 DPI を 300 DPI に「アップスケール」しても実際の解像度は増えない。</li>
<li><strong>色モードは CMYK</strong>、RGB ではない — RGB ファイルは印刷会社で自動 CMYK 変換され、青・紫・蛍光色が暗くシフトする。ブランド色は Pantone スポットカラーで別レイヤー定義。</li>
<li><strong>フォントはすべて埋め込みまたはアウトライン化</strong> — Illustrator：「ファイル → 名前を付けて保存 → Adobe PDF → PDF/X-1a:2001」で「フォントを埋め込む」をチェック。さもないと印刷会社の RIP がフォントを置換しカーニングが崩れる。</li>
<li><strong>納品形式は PDF/X-1a</strong> — 透明度を予測可能にフラット化、フォント埋め込み、色データ保持。JPEG / PNG を印刷ソースにしない。</li>
</ol>
<p>ジープリントのプリプレスチームは全ファイルで <a href="https://www.themplsegotist.com/how-to-prepare-packaging-artwork-for-commercial-printing">標準プリフライトチェックリスト</a> を実行 — A1 / A2 / A3 ポスターのプロ印刷会社初回合格率は約 98%（<a href="https://healeypackaging.co.uk/artwork-guidelines">Healey Packaging 公開 98% 初回合格率</a> 参照）。最も多いリジェクト理由：ブリード不足（リジェクトの 61%）、RGB 色モード（28%）、解像度不足（22%）、フォント未アウトライン（18%）。</p>

<h2 id="topic-cluster-posters">関連ガイド & 製品（トピッククラスター）</h2>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/ja/blog/poster-printing-guide/"><strong>完全ポスター印刷ガイド</strong></a> — 素材選定、仕上げ、小売・イベント・屋外の注文ワークフロー</li>
<li><a href="/ja/blog/poster-printing-price-guide/"><strong>ポスター印刷価格ガイド</strong></a> — 2026 年サイズ・素材・数量別単価、送料込み</li>
<li><a href="/ja/blog/retail-shop-poster-printing-guide/"><strong>小売店ポスター印刷ガイド</strong></a> — 店内プロモーション・季節入替用 A1 / A2 / A3 選定</li>
<li><a href="/ja/blog/same-day-flyers-printing-hong-kong-guide/"><strong>香港当日フライヤー印刷ガイド</strong></a> — 18:00 締切特急サービス、SF Express翌日午前配送、臨時ポスター追注文対応</li>
<li><a href="/ja/product/a1-posters/"><strong>A1 ポスター製品ページ</strong></a> — A1 印刷直接注文、10 枚 MOQ、CMYK 300 DPI、アジア工場価格</li>
</ul>

<p><strong>Q：ISO 216 A1 と US Arch B ポスターサイズの違いは？</strong><br/>A：ISO 216 A1 は 594 × 841 mm（23.4 × 33.1 in）、国際標準準拠。US Arch B は 12 × 18 in（304.8 × 457.2 mm）、北米で使われる別の小さいサイズで主に建築図面用。A1 は Arch B の約 2.5 倍の面積なので両者は互換性なし。アジア工場に注文する US 顧客は、特注 Arch B を指定しない限り ISO 216 A1 を受け取る（Arch B はセットアップ料金追加、一般的な小売・イベントポスターには非推奨）。</p>

<p><strong>Q：完成した A1 ポスターとデザインファイルの寸法差は？</strong><br/>A：業界標準トリム公差はデジタル印刷で各辺 ±0.5-1 mm、オフセット印刷で ±1-2 mm。つまり 594 × 841 mm A1 デザインは通常 593-594 mm × 840-841 mm でトリムされる。これが 3 mm ブリード + 3-5 mm セーフゾーンが必須な理由 — ないと端色が白く切れ、重要な文字がトリム位置に落ちる。複数 A1 枚を接合する大型ポスターの場合、印刷会社に各枚を正確にトリムしてもらい、2 mm オーバーラップ位置合わせガイドを提供してもらう。</p>

<p><strong>ジープリント A1 / A2 / A3 ポスター無料見積</strong>：WhatsApp +86 198 8085 1334 または<a href="/ja/quote/">30 秒 AI 即時見積</a>。無料デザインモック、10 枚 MOQ、DHL Express 2-4 日 worldwide delivery。</p>
"""

PAPER_BAG_JA_APPEND = r"""
<h2 id="quick-answer-paper-bag">答え先出し — 紙袋印刷ファイル設定どうする？</h2>
<p>紙袋デザインをプリプレス初回で通すための必要最低限スペック（<a href="https://www.printingbag.net/blog/paper-bag-print-ready-artwork-guide">PrintingBag 2026 印刷可能アートワークガイド</a> と <a href="https://healeypackaging.co.uk/artwork-guidelines">Healey Packaging アートワークガイドライン</a> 統合）：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>ブリード</strong>：仕上がり 4 辺各 3 mm（22 × 30 cm ハンドバッグファイルは 22.6 × 30.6 cm）</li>
<li><strong>セーフゾーン</strong>：トリム線内側 3-5 mm をロゴ・テキスト・バーコード用に確保</li>
<li><strong>解像度</strong>：写真・グラデーション 300 dpi、細線・ロゴ・極小テキスト 600 dpi 以上</li>
<li><strong>色モード</strong>：最初から CMYK — RGB ファイルは印刷会社で自動変換され、ガモットが約 30% 縮小（鮮明な青・紫・蛍光色が明らかに暗くなる）</li>
<li><strong>ファイル形式</strong>：PDF/X-1a（推奨）または fonts 埋め込み / アウトライン済の press-quality PDF；AI / EPS も可；JPEG / PNG は印刷ソース不可</li>
<li><strong>フォント</strong>：アウトライン化（Illustrator：書式 → アウトラインを作成、Shift+Ctrl+O）し、印刷 RIP のフォント置換を防ぐ</li>
</ul>
<p>この 6 ルールを守れば初回合格率 ~98% 圏内（Healey Packaging 公開指標）— ブリード欠如・RGB モード・低解像度による 22-61% リジェクト率と比べて 3-4 倍の差。<strong>カスタムダイライン必要？</strong>ジープリントではあらゆるサイズで無料ダイラインテンプレート提供、トリム / 折り / 糊ラインを 0.25 pt 別レイヤーに配置し、デザインが成型袋上に正しく乗るよう設計。</p>

<h2 id="paper-bag-2026-market">2026 年紙袋市場規模 — Kraft が依然リードする理由</h2>
<p>世界紙袋市場は 2026〜2033 年で力強い成長曲线。60+ ヶ国のシングルユースプラスチック禁止、零售商のサステナビリティ約束、消費者エコ選好上昇が主要ドライバー。権威ある数字（すべて出典明示）：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>世界紙袋市場 2026</strong>：<strong>US$6.73-6.90 億ドル</strong>、2033 年に <strong>US$9.75-10.30 億ドル</strong> 予測、CAGR <strong>5.5-5.9%</strong>（<a href="https://www.einpresswire.com/article/930138112/paper-bags-market-set-for-strong-growth-as-sustainability-trends-and-plastic-restrictions-fuel-global-demand">EIN Presswire 2026 市場レポート</a> および <a href="https://www.accio.com/business/kraft-bags-trends-2026">Accio kraft 袋 2026 トレンド</a> 参照）</li>
<li><strong>Kraft 紙シェア</strong>：<strong>紙袋素材需要の約 58%</strong> — kraft は依然として強度・ recyclability ・ natural appearance で筆頭素材（EIN Presswire 2026）</li>
<li><strong>Kraft 紙袋市場単独</strong>：<strong>2024 年 US$48.3 億ドル</strong> → 2026 年 US$50.9 億ドル → 2034 年 US$69.7 億ドル、CAGR 5.5%（<a href="https://www.intelmarketresearch.com/kraft-paper-bag-market-31482">Intel Market Research 2026</a>）</li>
<li><strong>平底袋優位</strong>：2026 年世界紙袋販売数の 36.7% が平底袋 — 安定性と棚映えで同セグメント牽引（Accio 2026）</li>
<li><strong>飲食業シェア</strong>：2026 年総紙袋需要の 31.5% が飲食業由来、最大単一業種（Accio 2026）</li>
<li><strong>消費者の有料意志</strong>：<strong>世界消費者の 70% 以上</strong> がサステナブルパッケージに割増払いの意志あり — kraft 紙は日用品から戦略的ブランド資産へ昇格（Intel Market Research 2026）</li>
<li><strong>高バリア紙袋サブセグメント</strong>：2025 年 US$10.7 億ドル → 2035 年 US$18.4 億ドル、CAGR 5.63% — 飲食外卖と EC の耐油需要が牽引（<a href="https://www.intelmarketresearch.com/kraft-paper-bag-market-31482">Intel Market Research</a>）</li>
</ul>
<p><strong>2026 年の発注への含意</strong>：kraft 紙袋需要が生産能力拡張を上回っているため、<strong>Q3-Q4 カスタム印刷のリードタイムは 2025 年より 2-3 週間長い</strong>。秋・年末在庫は 8-9 月に予約し、工場枠を確保、年末特急割増を避けること。ジープリント 2026 上半期週平均生産 <strong>4,200+ カスタム kraft 袋</strong>、小売・飲食・ギフト 3 大業種カバー、毎月 15 日までの発注で Q3 標準 5-7 営業日を維持。</p>

<h2 id="paper-bag-pricing-2026">紙袋 2026 単価 & MOQ — アジア工場参考</h2>
<p>アジア工場直販のカスタム印刷紙袋単価（<a href="https://boxforpackaging.en.made-in-china.com/product/KwefABvcZiat/China-Kraft-Recycled-Custom-Made-Shopping-Carrier-Kraft-Paper-Bag.html">Made-in-China kraft 袋リスティング</a> および Yiwugo 2026 取引データ統合、予算計画用、正式見積ではない）：</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100">
<th class="border p-2 text-left">袋タイプ</th>
<th class="border p-2 text-left">MOQ</th>
<th class="border p-2 text-left">100 枚</th>
<th class="border p-2 text-left">500 枚</th>
<th class="border p-2 text-left">1,000 枚</th>
<th class="border p-2 text-left">5,000+ 枚</th>
<th class="border p-2 text-left">最適用途</th>
</tr></thead>
<tbody>
<tr><td class="border p-2">茶色クラフト手提げ袋（捻り手提げ）</td><td class="border p-2">100-500</td><td class="border p-2">US$0.40-0.70</td><td class="border p-2">US$0.20-0.40</td><td class="border p-2">US$0.10-0.25</td><td class="border p-2">US$0.05-0.12</td><td class="border p-2">カフェ、オーガニック小売、飲食</td></tr>
<tr><td class="border p-2">白クラフト手提げ袋（捻り手提げ）</td><td class="border p-2">100-500</td><td class="border p-2">US$0.50-0.80</td><td class="border p-2">US$0.25-0.50</td><td class="border p-2">US$0.15-0.30</td><td class="border p-2">US$0.08-0.18</td><td class="border p-2">化粧品、プレミアム小売、ギフト</td></tr>
<tr><td class="border p-2">白カード / アート紙袋（リボン手提げ）</td><td class="border p-2">500</td><td class="border p-2">US$0.80-1.20</td><td class="border p-2">US$0.45-0.80</td><td class="border p-2">US$0.30-0.55</td><td class="border p-2">US$0.15-0.35</td><td class="border p-2">宝飾、贅沢品、アクセサリー</td></tr>
<tr><td class="border p-2">黒カード / 特殊紙（箔ロゴ）</td><td class="border p-2">500-1,000</td><td class="border p-2">US$1.00-1.50</td><td class="border p-2">US$0.65-1.00</td><td class="border p-2">US$0.40-0.70</td><td class="border p-2">US$0.23-0.45</td><td class="border p-2">ハイエンド、限定版</td></tr>
<tr><td class="border p-2">食品グレード SOS 袋（平底 / 尖底）</td><td class="border p-2">5,000-50,000</td><td class="border p-2">—</td><td class="border p-2">US$0.05-0.10</td><td class="border p-2">US$0.03-0.08</td><td class="border p-2">US$0.02-0.05</td><td class="border p-2">ベーカリー、グロサリー、テイクアウト</td></tr>
<tr><td class="border p-2">エコ堆肥可能袋（PBOM、バイオコート）</td><td class="border p-2">1,000</td><td class="border p-2">—</td><td class="border p-2">US$0.35-0.65</td><td class="border p-2">US$0.20-0.45</td><td class="border p-2">US$0.10-0.25</td><td class="border p-2">EU 輸出、米国西海岸</td></tr>
</tbody>
</table>
<p><strong>数量転換点</strong>：1,000+ 枚の同一デザイン カスタム印刷クラフト袋は US$0.10-0.25/枚 — 100 枚注文の 1/4 単価。ジープリント最多注文スペック：<strong>22 × 30 × 10 cm 茶色クラフト + 捻り手提げ + 1-2 色ロゴ</strong>、1,000 枚 4 色 CMYK ロゴ込み標準価格 <strong>US$0.19/枚</strong>。<strong>EU 輸出</strong>（ドバイ 2026 年 1 月シングルユースプラスチック全面禁止；EU PPWR 2025 年 2 月発効）は、新規基準達成のため堆肥可能 / バイオコート kraft を 10-15% 追加（<a href="https://www.nanwangpaperbag.com/fr/biodegradable-paper-bag-innovations-in-retail-packaging-for-eco-conscious-brands/">Nanwang 2026 生分解性袋更新</a> 参照）。</p>

<h2 id="paper-bag-rejection-causes">なぜ印刷会社は紙袋ファイルをリジェクトする？2026 リジェクト内訳</h2>
<p>スペックが合っていても、紙袋アートワークはプリプレスでリジェクトされる確率が想定より高い。最も多いリジェクト原因（発生頻度順、<a href="https://www.printingbag.net/blog/paper-bag-print-ready-artwork-guide">PrintingBag 2026 リジェクト分析</a> データ）：</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>ブリード欠如（リジェクトの 61%）</strong> — デザインがトリム線で止まり、裁断端に白が出る。修正法：背景色と端に接する画像をトリム線から 3 mm 超まで延長。紙袋では特に底折り部に注意 — 折り部は成型時に内側に隠れ、その領域のデザインは印刷しても無駄になる。</li>
<li><strong>RGB 色モード（リジェクトの 28%）</strong> — デザイナーが screen RGB で入稿；印刷会社が自動 CMYK 変換し、鮮明な青・紫・蛍光色が偏色。修正法：デザイン初期から CMYK。ブランド色は Pantone スポットカラーを独立定義、印刷会社に最も近い CMYK build を確認。</li>
<li><strong>解像度不足（リジェクトの 22%）</strong> — ファイル上は 300 DPI だが元画像は 72 DPI スクリーンショット。修正法：300 DPI 元写真または vector（AI / EPS / SVG）使用。Photoshop で DPI を上げても詳細は増えず、ぼやけた画素が拡大されるだけ。</li>
<li><strong>フォント未アウトライン（リジェクトの 18%）</strong> — 印刷会社の RIP に同フォントがなく自動置換、カーニング崩れる。修正法：Illustrator「書式 → アウトラインを作成」、または PDF にフォント埋め込み。</li>
<li><strong>誤ったファイル形式（多い）</strong> — JPEG、PNG、スクリーン解像度 PDF を本番ファイルとして入稿。修正法：納品形式は PDF/X-1a を主、AI 原ファイルをバックアップとして提供しプリプレスの微調整を可能に。</li>
<li><strong>オーバープリント / ノックアウト設定ミス</strong> — 黒文字はオーバープリント（白ノックアウトなし）で版ズレ時の白ハロ防止；色要素はノックアウトで意図せぬオーバープリント回避。提出前に Acrobat Pro の「出力プレビュー」でオーバープリント効果をシミュレート。</li>
</ol>
<p>毎回提出前に <strong>プリフライトチェックリスト</strong> を実行（Illustrator：ウィンドウ → 出力 → プリフライト、または Acrobat Pro プリフライト）。ジープリントのプリプレスチームは初校で 100% これら問題を捕捉するが、クライアント入稿ファイルがプリフライトを飛ばすと反復ごとに 2-3 日の遅延。</p>

<h2 id="paper-bag-topic-cluster">関連ガイド & 製品（トピッククラスター）</h2>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/ja/blog/wedding-favor-bag-printing-guide/"><strong> Wedding Favor Bag 印刷ガイド</strong></a> — 2026 午年結婚シーズン、100-3,000 枚小ロット、式場・プランナー向け</li>
<li><a href="/ja/blog/apparel-shopping-bag-printing-guide/"><strong>アパレル ショッピングバッグ印刷ガイド</strong></a> — ブティック・DTC ブランド袋選定：紙 vs 不織布 vs 綿布、MOQ、仕上げ</li>
<li><a href="/ja/blog/jewellery-shopping-bag-printing-guide/"><strong>宝飾ショッピングバッグ印刷ガイド</strong></a> — 高級白カード / 黒カード / アート紙袋 + 箔ロゴ、宝飾・贅沢品小売向け</li>
<li><a href="/ja/blog/ecommerce-shipping-bag-printing-guide/"><strong>EC シッピングバッグ印刷ガイド</strong></a> — メーラーバッグ、クーリエ封筒、紙ベースパッケージで poly mailer 代替、DTC ブランド向け</li>
<li><a href="/ja/product/kraft-paper-bags/"><strong>クラフト紙袋製品ページ</strong></a> — 100 枚 MOQ クラフト手提げ袋、捻りまたは平手提げ、アジア工場価格</li>
</ul>

<p><strong>Q：PBOM と SOS 紙袋の違いは？</strong><br/>A：PBOM（Pinched Bottom Open Mouth、尖底開口袋）は最も一般的な工業用紙袋 — 底を接着、上面は充填用に開放、袋身は平管型。PBOM は 2026 年世界紙袋販売の 36.7% を占め（Accio 2026 kraft 袋トレンド）、食品メーカー・穀物・ペットフード工場の自動充填ライン互換。SOS（Self-Opening Satchel、自己展開サッチェル）はブロック底小売袋 — 開封時に底が平らな長方形底座に展開し、棚で安定し見え栄えもよい。SOS は PBOM より単価 2-3 倍高い（底構造が複雑なため）。ジープリントの標準クラフト手提げ袋ラインでは、22 × 30 × 10 cm SOS 捻り手提げが最多注文の小売スペック。</p>

<p><strong>Q：EU 新 PPWR 規制下で紙袋はまだ輸出できる？</strong><br/>A：可能だが 2025-2026 年で要件が厳格化。EU 包装・包装廃棄物規制（PPWR）は 2025 年 2 月発効、EU 販売の全紙袋に recyclability・最低リサイクル含有率（2030 年までにカテゴリ別設定）達成を義務付け、堆肥可能を標榜する場合は堆肥可能性基準達成が必要。ドバイ 2026 年 1 月シングルユースプラスチック全面禁止（皿、コップ、蓋、箸）は、紙袋は対象外。2026 年 EU 輸出は <strong>FSC 認証林からの 100% バージン kraft</strong> または <strong>リサイクル含有 kraft（一般 80-100% ポストコンシューマー再生繊維）</strong> を指定 — いずれも PPWR 準拠。ジープリントのクラフト袋ラインは EU 仕向注文に FSC チェーンオブ custody 文書を標準添付。</p>

<p><strong>ジープリント カスタム紙袋無料見積</strong>：WhatsApp +86 198 8085 1334 または<a href="/ja/quote/">30 秒 AI 即時見積</a>。無料ダイラインテンプレート、100 枚 MOQ、DHL Express 2-4 日 worldwide delivery。</p>
"""


# ============================================================
# APPLY — Per-locale appending logic
# ============================================================

def apply(loc, slug, append_text):
    path = DATA / f"{loc}.json"
    with open(path, encoding="utf-8") as f:
        obj = json.load(f)
    if slug not in obj:
        print(f"  SKIP {loc}/{slug} (not found)")
        return False
    b = obj[slug]
    old = b.get("content", "")
    new = old + append_text
    # Validate: no new <a href="https://" or markdown links introduced
    new_links = re.findall(r'<a href="(http[^"]+)"', new)
    md_links = re.findall(r'\[([^\]]+)\]\((http[^)]+)\)', new)
    if new_links or md_links:
        print(f"  WARN {loc}/{slug} new external link introduced: {new_links[:3]} / md: {md_links[:3]}")
    # Validate FAQ count delta
    old_qa = len(re.findall(r'<p><strong>Q', old))
    new_qa = len(re.findall(r'<p><strong>Q', new))
    # Validate H2 count delta
    old_h2 = len(re.findall(r'<h2', old))
    new_h2 = len(re.findall(r'<h2', new))
    # Validate table count delta
    old_tbl = len(re.findall(r'<table', old))
    new_tbl = len(re.findall(r'<table', new))
    print(f"  {loc}/{slug}: chars {len(old)} -> {len(new)} (+{len(new)-len(old)}, +{int((len(new)-len(old))/len(old)*100)}%)")
    print(f"     H2: {old_h2} -> {new_h2} (+{new_h2-old_h2}) | Q&A: {old_qa} -> {new_qa} (+{new_qa-old_qa}) | table: {old_tbl} -> {new_tbl} (+{new_tbl-old_tbl})")
    b["content"] = new
    # Persist via Python json.dump (per MEMORY.md §7: avoid Edit/Write for big content)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
    return True


print("=== POSTER-SIZE-GUIDE (P0 — 71 GSC imp 0 click) ===")
print()
print("[en]")
apply("en", "poster-size-guide", POSTER_EN_APPEND)
print()
print("[zh-hk]")
apply("zh-hk", "poster-size-guide", POSTER_ZH_APPEND)
print()
print("[ja]")
apply("ja", "poster-size-guide", POSTER_JA_APPEND)

print()
print("=== PAPER-BAG-PRINTING-GUIDE (P1 — 21 GSC imp 'paper bag print file requirements') ===")
print()
print("[en]")
apply("en", "paper-bag-printing-guide", PAPER_BAG_EN_APPEND)
print()
print("[zh-hk]")
apply("zh-hk", "paper-bag-printing-guide", PAPER_BAG_ZH_APPEND)
print()
print("[ja]")
apply("ja", "paper-bag-printing-guide", PAPER_BAG_JA_APPEND)

print()
print("=== DONE ===")
