/**
 * apply-en-longdesc-v3.mjs — 5 P0 SKU 的 EN longDescription 教科書 v3 增强
 *
 * 设计：把 5 个 SKU 的 longDescriptionEn 从纯文本升级为 zh 教科書 v3 验证过的 6 H3 + 2 table 结构
 *   1. H3: Premium [Product] for Global Brands + Intro paragraph
 *   2. H3: Material & GSM Comparison + table
 *   3. H3: Printing & Finish Options + table
 *   4. H3: Why Choose ZprintPro? + ul list
 *   5. H3: Use Cases & Industries + p
 *   6. H3: Frequently Asked Questions + 6 <details> FAQ
 *   NAP closing paragraph
 *
 * 输出：
 *   - DRY-RUN (default): stdout 打印 5 个 SKU 的新 longDescriptionEn + QA check
 *   - --apply: 直接修改 src/data/products.ts (git branch 上)
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PRODUCTS_FILE = path.join(ROOT, 'src/data/products.ts');
const APPLY_MODE = process.argv.includes('--apply');

// === 5 P0 SKU 的 EN 教科書 v3 longDescription 内容 ===

const LONGDESC_V3 = {
  'premium-business-cards': {
    content: `<h3>Premium Business Cards for Global Brands</h3>
<p>ZprintPro premium business cards are designed for executives, finance, and legal professionals across the US and global markets. Choose from 300g-400g matte, cotton, or coated paper with foil stamping, spot UV, and embossing. Heidelberg 4-color offset printing delivers 90%+ color saturation and crisp halftone reproduction, while optional R3mm rounded corners add a refined touch. Standard 85×54mm size, 100-card MOQ, with free color proofing to ensure batch consistency.</p>

<h3>Material & GSM Comparison</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Weight</th>
      <th class="p-2 text-center">Rigidity</th>
      <th class="p-2 text-center">Feel</th>
      <th class="p-2 text-center">Cost</th>
      <th class="p-2 text-left">Best For</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">300g Matte</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Startups, general business</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">350g Cotton</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Creative agencies, designers</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">400g Premium</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Lawyers, finance, luxury brands</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">600g Ultra</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★</td><td class="p-2">VIP cards, executive suites</td></tr>
  </tbody>
</table>

<h3>Printing & Finish Options</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Finish</th>
      <th class="p-2 text-left">Effect</th>
      <th class="p-2 text-center">Lead Time</th>
      <th class="p-2 text-center">Cost Add</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">Matte Lamination</td><td class="p-2">Soft-touch, fingerprint resistant</td><td class="p-2 text-center">+0 days</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Gloss Lamination</td><td class="p-2">High-shine, vibrant colors</td><td class="p-2 text-center">+0 days</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">Foil Stamping (Gold/Silver/Rose Gold)</td><td class="p-2">Metallic shine, luxury feel</td><td class="p-2 text-center">+1 day</td><td class="p-2 text-center">$$</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Spot UV</td><td class="p-2">Glossy dimensional contrast</td><td class="p-2 text-center">+1 day</td><td class="p-2 text-center">$$</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">Embossing / Rounded Corners</td><td class="p-2">Tactile depth, soft aesthetic</td><td class="p-2 text-center">+1 day</td><td class="p-2 text-center">$</td></tr>
  </tbody>
</table>

<h3>Why Choose ZprintPro?</h3>
<ul>
  <li><strong>Global Shipping:</strong> DHL Express 2-4 days to US/UK/AU/KR/SG/AE. Free US shipping on orders over $100.</li>
  <li><strong>Certified Quality:</strong> FSC paper, ISO 9001 manufacturing, ISO 12647 color management, Delta E ≤2.</li>
  <li><strong>Low MOQ with Volume Discount:</strong> 100-card minimum, 15% off at 500+, 25% off at 1,000+.</li>
  <li><strong>Free Sample Proofing:</strong> Digital color proof before production, free reprints if color drifts.</li>
  <li><strong>Variable Data Printing:</strong> Per-card customization (name, title, QR code) for sales teams of 100+.</li>
</ul>

<h3>Use Cases & Industries</h3>
<p>Premium business cards are the first handshake of your brand. ZprintPro serves executives at Fortune 500 finance firms, partners at law offices, founders at tech startups, and creative directors at agencies. For US-based professionals, we offer rush turnaround (1-3 business days) with same-day file confirmation. For international clients in the UK, Australia, Korea, Singapore, and the UAE, DHL Express delivers in 2-4 days. Common use cases include corporate rebrand rollouts, conference name badges, client gift packets, and individual executive updates.</p>

<h3>Frequently Asked Questions</h3>
<details class="my-2"><summary><strong>What is the minimum order quantity?</strong></summary><p>100 cards. Sample orders of 10-50 cards are available for design proofing (rush fee applies).</p></details>
<details class="my-2"><summary><strong>How long does production take?</strong></summary><p>Standard production is 3-5 business days after artwork approval. Rush production (1-2 days) is available for orders up to 500 cards.</p></details>
<details class="my-2"><summary><strong>Do you offer double-sided printing?</strong></summary><p>Yes. Double-sided 4-color CMYK is standard. Submit two files (front and back) or one combined file with separate layers.</p></details>
<details class="my-2"><summary><strong>Can I order different names on each card?</strong></summary><p>Yes. Variable data printing allows per-card customization. Submit an Excel/CSV file with name, title, and contact details. Minimum 100 cards for variable orders.</p></details>
<details class="my-2"><summary><strong>How is shipping calculated to my country?</strong></summary><p>US orders over $100 ship free via DHL Express (2-4 business days). UK/AU orders over £80 / AU$150 ship free. KR/SG/AE ship via DHL Express at standard rates (calculated at checkout). Tracking provided for all shipments.</p></details>
<details class="my-2"><summary><strong>What if I'm not happy with the print quality?</strong></summary><p>We provide free digital color proofing before production. If the final print drifts from approved proof, we reprint at no cost or refund in full. Your satisfaction is guaranteed.</p></details>

<p><em>Printed in our Hong Kong facility, shipped worldwide via DHL Express. ZprintPro — your global printing partner for premium business cards, packaging, and marketing materials.</em></p>
`,
  },

  'waterproof-stickers': {
    content: `<h3>Waterproof Stickers for Global Brands</h3>
<p>ZprintPro waterproof stickers are engineered for outdoor labels, product packaging, car decals, and equipment tags across the US, UK, Australia, and global markets. Built on PVC or PP synthetic facestock with water-resistant inks, our stickers withstand rain, UV exposure, and abrasion. Optional matte or gloss lamination extends outdoor life to 3-5 years, while die-cut shapes and variable QR codes enable batch control and brand tracking. 100-sticker MOQ, with same-day sampling for small batches.</p>

<h3>Material & Durability Comparison</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Material</th>
      <th class="p-2 text-center">Waterproof</th>
      <th class="p-2 text-center">UV Resistance</th>
      <th class="p-2 text-center">Outdoor Life</th>
      <th class="p-2 text-left">Best For</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">PVC Film</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">3-5 years</td><td class="p-2">Outdoor labels, car decals</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">PP Synthetic</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">2-3 years</td><td class="p-2">Product packaging, equipment tags</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">Clear PET</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">2-4 years</td><td class="p-2">Bottle labels, gift seals</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">Vinyl (Cast)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">5-7 years</td><td class="p-2">Vehicle wraps, premium decals</td></tr>
  </tbody>
</table>

<h3>Lamination & Finish Options</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Finish</th>
      <th class="p-2 text-left">Effect</th>
      <th class="p-2 text-center">Lead Time</th>
      <th class="p-2 text-center">Cost Add</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">Gloss Lamination</td><td class="p-2">High-shine, color saturation</td><td class="p-2 text-center">+0 days</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Matte Lamination</td><td class="p-2">Soft-touch, anti-glare</td><td class="p-2 text-center">+0 days</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">Die-Cut Shapes</td><td class="p-2">Custom outlines, kiss-cut available</td><td class="p-2 text-center">+1 day</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Variable QR / Serial Numbers</td><td class="p-2">Batch tracking, anti-counterfeit</td><td class="p-2 text-center">+1 day</td><td class="p-2 text-center">$$</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">Removable Adhesive</td><td class="p-2">Clean removal, no residue</td><td class="p-2 text-center">+0 days</td><td class="p-2 text-center">$</td></tr>
  </tbody>
</table>

<h3>Why Choose ZprintPro?</h3>
<ul>
  <li><strong>Global Shipping:</strong> DHL Express 2-4 days to US/UK/AU/KR/SG/AE. Free US shipping on orders over $100.</li>
  <li><strong>Certified Safe:</strong> SGS migration tested, heavy-metal-free inks, suitable for food-contact outer packaging.</li>
  <li><strong>Low MOQ with Same-Day Sampling:</strong> 100-sticker minimum, same-day digital proofing for batches under 500.</li>
  <li><strong>Free Die-Cut Design:</strong> Custom shapes at no extra charge. Submit your outline (AI/PDF) and we prep the file for production.</li>
  <li><strong>Variable Data Printing:</strong> Per-sticker QR codes or serial numbers for inventory, anti-counterfeit, and event check-in.</li>
</ul>

<h3>Use Cases & Industries</h3>
<p>Waterproof stickers are the workhorse of product branding and outdoor labeling. ZprintPro serves beverage brands (bottle labels), cosmetics (outer packaging seals), e-commerce sellers (mailing and thank-you stickers), and industrial clients (equipment tags, toolbox labels, machinery ID). For US-based small businesses, our 100-sticker MOQ with same-day file confirmation is ideal for short-run product launches. For international clients, DHL Express delivers in 2-4 days to UK, Australia, Korea, Singapore, and UAE.</p>

<h3>Frequently Asked Questions</h3>
<details class="my-2"><summary><strong>Are the stickers truly waterproof?</strong></summary><p>Yes. PVC film stickers with our lamination are fully waterproof — they survive rain, dishwashers, freezers, and brief submersion. PP synthetic stickers are water-resistant (suitable for short outdoor exposure and damp environments).</p></details>
<details class="my-2"><summary><strong>What shapes and sizes can you cut?</strong></summary><p>Any custom shape from 10×10mm to 300×300mm. Circles, squares, ovals, stars, hearts, and irregular logo outlines are all supported. Submit your die-cut line in AI or PDF format.</p></details>
<details class="my-2"><summary><strong>Will the colors fade in sunlight?</strong></summary><p>PVC film with our UV-resistant lamination maintains color for 3-5 years outdoors. For high-sun or coastal environments, choose cast vinyl (5-7 year outdoor life).</p></details>
<details class="my-2"><summary><strong>Can I get a sample before ordering?</strong></summary><p>Yes. We offer same-day digital sampling for batches under 500 stickers. Physical printed samples ship via DHL Express and arrive in 2-4 business days.</p></details>
<details class="my-2"><summary><strong>Do you offer removable adhesive?</strong></summary><p>Yes. Our removable adhesive is repositionable 3-5 times on smooth surfaces and leaves no residue. Perfect for short-term campaigns, events, and rental equipment.</p></details>
<details class="my-2"><summary><strong>How do I order different designs on one sheet?</strong></summary><p>Submit multiple AI/PDF files or one combined file with separate layers. We'll arrange them on the print sheet for optimal material use.</p></details>

<p><em>Printed in our Hong Kong facility, shipped worldwide via DHL Express. ZprintPro — your global printing partner for waterproof labels, premium packaging, and outdoor-grade marketing materials.</em></p>
`,
  },

  'kraft-paper-bags': {
    content: `<h3>Kraft Paper Bags for Global Brands</h3>
<p>ZprintPro kraft paper bags combine eco-friendly materials with retail-ready durability. Choose from 120-300g natural brown or white kraft with cotton or paper rope handles, base reinforcement, and gussets for load comfort. Our 4-color CMYK printing supports bold one-color identities through full-coverage photographic prints, with foil logo options for gifting appeal. 100-bag MOQ, 5-7 day standard production, FSC certified.</p>

<h3>Material & Weight Comparison</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Stock</th>
      <th class="p-2 text-center">Strength</th>
      <th class="p-2 text-center">Eco Score</th>
      <th class="p-2 text-center">Print Quality</th>
      <th class="p-2 text-left">Best For</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">120g Brown Kraft</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Lightweight gifts, takeout</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">150g Brown Kraft</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Cafés, bakeries, retail</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">200g Brown Kraft</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Apparel, lifestyle retail</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">250-300g White Card</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Beauty, jewelry, premium gifting</td></tr>
  </tbody>
</table>

<h3>Handle & Finish Options</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Option</th>
      <th class="p-2 text-left">Effect</th>
      <th class="p-2 text-center">Load Capacity</th>
      <th class="p-2 text-center">Cost Add</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">Cotton Rope Handles</td><td class="p-2">Premium tactile, eco-friendly</td><td class="p-2 text-center">8-12kg</td><td class="p-2 text-center">$$</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Paper Rope Handles</td><td class="p-2">100% recyclable, classic look</td><td class="p-2 text-center">6-10kg</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">Flat Paper Handles</td><td class="p-2">Sleek, retail-friendly</td><td class="p-2 text-center">4-6kg</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Foil Stamped Logo</td><td class="p-2">Metallic shine, gifting appeal</td><td class="p-2 text-center">—</td><td class="p-2 text-center">$$</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">Spot UV / Embossing</td><td class="p-2">Dimensional contrast</td><td class="p-2 text-center">—</td><td class="p-2 text-center">$$</td></tr>
  </tbody>
</table>

<h3>Why Choose ZprintPro?</h3>
<ul>
  <li><strong>Global Shipping:</strong> DHL Express 2-4 days to US/UK/AU/KR/SG/AE. Free US shipping on orders over $100.</li>
  <li><strong>FSC Certified Paper:</strong> Sustainably sourced kraft and white card. Soy-based inks available for ESG-conscious brands.</li>
  <li><strong>Low MOQ with Volume Discount:</strong> 100-bag minimum, 15% off at 500+, 25% off at 1,000+, 35% off at 2,000+.</li>
  <li><strong>Free Structural Design:</strong> Custom dieline design included. We handle glue flap, bleed, and base reinforcement spec.</li>
  <li><strong>Reinforced Load Testing:</strong> 8-12kg capacity tested on standard configurations. Heavy-duty options for apparel twin-packs.</li>
</ul>

<h3>Use Cases & Industries</h3>
<p>Kraft paper bags are the eco-friendly face of retail. ZprintPro serves coffee shops and bakeries (takeout and pastry bags), apparel brands (shopping bags for clothing and shoes), lifestyle retailers (gift and boutique bags), and event companies (conference and wedding favor bags). For US-based small businesses, our 100-bag MOQ and 5-7 day production is ideal for short retail runs. For international clients in the UK, Australia, and beyond, DHL Express delivers in 2-4 days.</p>

<h3>Frequently Asked Questions</h3>
<details class="my-2"><summary><strong>What is the minimum order quantity?</strong></summary><p>100 bags. Volume discounts start at 500 bags (15% off), 1,000 bags (25% off), and 2,000+ bags (35% off).</p></details>
<details class="my-2"><summary><strong>Can I print my logo in metallic foil?</strong></summary><p>Yes. Gold, silver, rose gold, and holographic foils are available. Foil stamping adds 1-2 days to production and is quoted per design complexity.</p></details>
<details class="my-2"><summary><strong>How much weight can the bags hold?</strong></summary><p>Standard cotton rope handle bags hold 8-12kg, paper rope 6-10kg, flat paper 4-6kg. For heavier items, we reinforce the base and add internal card inserts.</p></details>
<details class="my-2"><summary><strong>Are the bags food-safe?</strong></summary><p>For direct food contact, we offer FDA-compliant inner liners. For bakery and takeaway use, our standard kraft with a food-grade insert is recommended.</p></details>
<details class="my-2"><summary><strong>Can I get custom sizes?</strong></summary><p>Yes. We produce custom dimensions from 8×6×2" (small jewelry) to 320×120×380mm (large apparel). Submit your spec for a quote.</p></details>
<details class="my-2"><summary><strong>What about eco-certifications?</strong></summary><p>We offer FSC-certified kraft, 100% recycled fiber, and soy-based ink options. Carbon footprint calculation and eco-certification labels are available on request.</p></details>

<p><em>Printed in our Hong Kong facility, shipped worldwide via DHL Express. ZprintPro — your global printing partner for eco-friendly retail bags, premium packaging, and brand merchandise.</em></p>
`,
  },

  'a4-flyers': {
    content: `<h3>A4 Flyers for Global Brands</h3>
<p>ZprintPro A4 flyers (210×297mm) are the workhorse of event marketing, product launches, and retail promotions. Choose from 128g-300g gloss or matte art paper with 4-color CMYK printing on one or both sides. Our Heidelberg offset presses deliver saturated color and crisp text, with optional matte or gloss lamination for durability. 100-flyer MOQ, same-day production available for orders of 500 or fewer. Standard lead time 1-3 business days.</p>

<h3>Paper & Weight Comparison</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Paper</th>
      <th class="p-2 text-center">Weight</th>
      <th class="p-2 text-center">Feel</th>
      <th class="p-2 text-center">Cost</th>
      <th class="p-2 text-left">Best For</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">Gloss Art</td><td class="p-2 text-center">128g</td><td class="p-2 text-center">Slick, vibrant</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Mass distribution, retail promos</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Gloss Art</td><td class="p-2 text-center">157g</td><td class="p-2 text-center">Premium standard</td><td class="p-2 text-center">★★★★</td><td class="p-2">Product launches, real estate</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">Matte Art</td><td class="p-2 text-center">200g</td><td class="p-2 text-center">Substantial, refined</td><td class="p-2 text-center">★★★</td><td class="p-2">Restaurant menus, events</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Matte Art</td><td class="p-2 text-center">250-300g</td><td class="p-2 text-center">Card-like, luxury</td><td class="p-2 text-center">★★</td><td class="p-2">Premium catalogs, course guides</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">Recycled</td><td class="p-2 text-center">120-150g</td><td class="p-2 text-center">Natural, textured</td><td class="p-2 text-center">★★★★</td><td class="p-2">Eco campaigns, NGO outreach</td></tr>
  </tbody>
</table>

<h3>Size & Format Options</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Size</th>
      <th class="p-2 text-left">Dimensions</th>
      <th class="p-2 text-center">Info Capacity</th>
      <th class="p-2 text-center">Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">A6 (postcard)</td><td class="p-2">105×148mm</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">A5 (half page)</td><td class="p-2">148×210mm</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">A4 (standard)</td><td class="p-2">210×297mm</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">DL (envelope fit)</td><td class="p-2">99×210mm</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">Square</td><td class="p-2">210×210mm</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★</td></tr>
  </tbody>
</table>

<h3>Why Choose ZprintPro?</h3>
<ul>
  <li><strong>Global Shipping:</strong> DHL Express 2-4 days to US/UK/AU/KR/SG/AE. Free US shipping on orders over $100.</li>
  <li><strong>Same-Day Turnaround:</strong> 500-flyer orders with file confirmation by 11am ship same day. Standard 1-3 business days.</li>
  <li><strong>Low MOQ with Volume Discount:</strong> 100-flyer minimum, 15% off at 500+, 25% off at 1,000+, 35% off at 5,000+.</li>
  <li><strong>Free Layout & Bleed Check:</strong> We prepress your file at no charge. CMYK conversion, color proofing, and bleed verification included.</li>
  <li><strong>Free Design Service:</strong> 3 layout concepts free with every order. Professional designers tailor to your industry and audience.</li>
</ul>

<h3>Use Cases & Industries</h3>
<p>A4 flyers are the most versatile marketing collateral. ZprintPro serves real estate agents (open house and listing flyers), restaurants (menu and promo flyers), retail stores (sale and event announcements), educational institutions (course enrollment and event flyers), and service businesses (dental, salon, fitness, and professional services). For US-based small businesses, our same-day turnaround and 100-MOQ is ideal for last-minute events. For international clients in the UK, Australia, and beyond, DHL Express delivers in 2-4 days.</p>

<h3>Frequently Asked Questions</h3>
<details class="my-2"><summary><strong>What is the minimum order quantity?</strong></summary><p>100 flyers. We also accept sample orders of 10-50 flyers for design proofing (rush fee applies).</p></details>
<details class="my-2"><summary><strong>Can I get same-day printing?</strong></summary><p>Yes. For orders up to 500 flyers with file confirmation by 11am (Hong Kong time), production and same-day dispatch are available. US delivery via DHL Express arrives 2-4 business days after dispatch.</p></details>
<details class="my-2"><summary><strong>Do you offer double-sided printing?</strong></summary><p>Yes. Double-sided 4-color CMYK is standard. Front-to-back registration precision within ±0.5mm. Submit two files (front and back) or one combined file with layers.</p></details>
<details class="my-2"><summary><strong>Can I add a QR code or coupon design?</strong></summary><p>Yes. QR codes, discount coupons, and tear-off reply cards are all supported. We can also design these for you at no extra charge.</p></details>
<details class="my-2"><summary><strong>What paper weight should I choose?</strong></summary><p>157g gloss art is the industry standard for A4 flyers. For premium feel, choose 200-250g matte. For high-volume distribution (under $0.10 per flyer), 128g gloss is the budget option.</p></details>
<details class="my-2"><summary><strong>Do you offer eco-friendly options?</strong></summary><p>Yes. FSC-certified recycled paper and soy-based inks are available. Carbon footprint calculation and eco-certification labels can be added on request.</p></details>

<p><em>Printed in our Hong Kong facility, shipped worldwide via DHL Express. ZprintPro — your global printing partner for flyers, posters, packaging, and marketing collateral.</em></p>
`,
  },

  'food-boxes': {
    content: `<h3>Food Boxes for Global Brands</h3>
<p>ZprintPro food packaging boxes are designed for bakeries, tea brands, health supplement companies, and gift food producers across the US, UK, Australia, and global markets. Choose from 350g-400g food-grade white card or kraft with optional PE or PLA biodegradable inner lining. Our boxes pass FDA, LFGB, and SGS food-contact migration testing, ensuring safety for direct pastry, tea, and supplement contact. Optional window design (PET clear film or die-cut) and foil-stamped logos elevate shelf appeal.</p>

<h3>Material & Safety Comparison</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Material</th>
      <th class="p-2 text-center">Food Safe</th>
      <th class="p-2 text-center">Grease Resistance</th>
      <th class="p-2 text-center">Eco Score</th>
      <th class="p-2 text-left">Best For</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">350g White Card + PE Lining</td><td class="p-2 text-center">FDA/LFGB</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Pastries, fried foods, takeaway</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">400g White Card + PLA Lining</td><td class="p-2 text-center">FDA/LFGB</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Eco-friendly brands, vegan bakeries</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">350g Kraft + PE Lining</td><td class="p-2 text-center">FDA/LFGB</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Artisan bread, organic tea</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">400g Clay-Coated Board</td><td class="p-2 text-center">FDA/LFGB</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Health supplements, gift packaging</td></tr>
  </tbody>
</table>

<h3>Box Style & Finish Options</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Style</th>
      <th class="p-2 text-left">Effect</th>
      <th class="p-2 text-center">Lead Time</th>
      <th class="p-2 text-center">Cost Add</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">Tuck-End Box</td><td class="p-2">Standard, easy assembly</td><td class="p-2 text-center">+0 days</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Auto-Lock Bottom Box</td><td class="p-2">E-commerce friendly, 70% storage save</td><td class="p-2 text-center">+0 days</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">Window Design (PET Film)</td><td class="p-2">Product visibility, shelf appeal</td><td class="p-2 text-center">+1 day</td><td class="p-2 text-center">$</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Foil-Stamped Logo</td><td class="p-2">Metallic shine, premium feel</td><td class="p-2 text-center">+1 day</td><td class="p-2 text-center">$$</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">Variable QR / Batch Code</td><td class="p-2">Traceability, anti-counterfeit</td><td class="p-2 text-center">+1 day</td><td class="p-2 text-center">$$</td></tr>
  </tbody>
</table>

<h3>Why Choose ZprintPro?</h3>
<ul>
  <li><strong>Global Shipping:</strong> DHL Express 2-4 days to US/UK/AU/KR/SG/AE. Free US shipping on orders over $100.</li>
  <li><strong>Certified Food Safety:</strong> FDA (US), LFGB (EU), SGS migration tested, heavy-metal-free inks.</li>
  <li><strong>Low MOQ with Volume Discount:</strong> 100-box minimum, 15% off at 1,000+, 25% off at 5,000+.</li>
  <li><strong>Free Dieline Design:</strong> Custom box structure and dieline included. We handle tuck-end, auto-lock, and rigid box designs.</li>
  <li><strong>Eco Options Available:</strong> PLA biodegradable lining, FSC-certified kraft, and soy-based inks for ESG-conscious brands.</li>
</ul>

<h3>Use Cases & Industries</h3>
<p>Food packaging boxes are the silent salesperson on the shelf. ZprintPro serves pastry shops (cookie and cake boxes), tea brands (loose-leaf and bagged tea packaging), health supplement companies (powder and capsule boxes), confectionery brands (chocolate and candy gift boxes), and gift food producers (holiday and corporate gift sets). For US-based food businesses, our FDA-compliant materials and 100-MOQ are ideal for small-batch artisan production. For international clients in the UK, Australia, Korea, Singapore, and UAE, DHL Express delivers in 2-4 days.</p>

<h3>Frequently Asked Questions</h3>
<details class="my-2"><summary><strong>Are the boxes food-safe?</strong></summary><p>Yes. All materials are FDA (US) and LFGB (EU) compliant, with SGS migration testing. Inks are heavy-metal-free and water-based, preventing odor transfer or chemical leaching into food.</p></details>
<details class="my-2"><summary><strong>What is the minimum order quantity?</strong></summary><p>100 boxes. Volume discounts start at 1,000 boxes (15% off) and 5,000 boxes (25% off). For sample orders under 50, rush fees apply.</p></details>
<details class="my-2"><summary><strong>Can I get a window in the box?</strong></summary><p>Yes. PET clear film windows and die-cut window openings are available. Window size and position are customizable. Add 1 day to production.</p></details>
<details class="my-2"><summary><strong>Do you offer eco-friendly materials?</strong></summary><p>Yes. PLA biodegradable lining (compostable), FSC-certified kraft, recycled paperboard, and soy-based inks are all available. We can also calculate carbon footprint per order.</p></details>
<details class="my-2"><summary><strong>Can you print variable QR codes for batch tracking?</strong></summary><p>Yes. Variable data printing allows per-box QR codes linking to batch records, certificates of analysis, or anti-counterfeit verification. Submit an Excel/CSV file with the data.</p></details>
<details class="my-2"><summary><strong>What about box structural design?</strong></summary><p>We provide free dieline design and 3D mockups. Standard tuck-end, auto-lock bottom, book-style, and rigid lid-base boxes are all available. Custom structures are quoted on request.</p></details>

<p><em>Printed in our Hong Kong facility, shipped worldwide via DHL Express. ZprintPro — your global printing partner for food packaging, premium boxes, and certified-safe marketing materials.</em></p>
`,
  },
};

// === Quality checks ===
function hasZh(s) { return /[\u4e00-\u9fff]/.test(s); }
function hasJa(s) { return /[\u3040-\u309f\u30a0-\u30ff]/.test(s); }

function run() {
  console.log('====== apply-en-longdesc-v3.mjs ======\n');
  console.log(`模式: ${APPLY_MODE ? 'APPLY (修改 src/data/products.ts)' : 'DRY-RUN'}`);
  console.log(`目标 SKU: ${Object.keys(LONGDESC_V3).length}\n`);
  console.log('='.repeat(80));

  for (const [slug, { content }] of Object.entries(LONGDESC_V3)) {
    const h3 = (content.match(/<h3>/g) || []).length;
    const tbl = (content.match(/<table/g) || []).length;
    const faq = (content.match(/<details/g) || []).length;
    const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter((w) => w).length;
    const hasZhChars = hasZh(content);
    const hasJaChars = hasJa(content);
    const hasZhiYinGang = content.includes('智印港');
    const hasDHL = /DHL/i.test(content);
    const hasZprintPro = content.includes('ZprintPro');
    console.log(`\n### ${slug}`);
    console.log(`  size: ${content.length} chars, ${words} words`);
    console.log(`  h3: ${h3}, table: ${tbl}, FAQ: ${faq}`);
    console.log(`  no Chinese: ${!hasZhChars} | no Japanese: ${!hasJaChars} | no 智印港: ${!hasZhiYinGang}`);
    console.log(`  has DHL: ${hasDHL} | has ZprintPro: ${hasZprintPro}`);
  }

  console.log('\n====== Quality Checks ======');
  let pass = 0, fail = 0;
  for (const [slug, { content }] of Object.entries(LONGDESC_V3)) {
    const h3 = (content.match(/<h3>/g) || []).length;
    const tbl = (content.match(/<table/g) || []).length;
    const faq = (content.match(/<details/g) || []).length;
    const checks = [
      { name: 'h3 >= 6', ok: h3 >= 6, val: h3 },
      { name: 'table >= 2', ok: tbl >= 2, val: tbl },
      { name: 'FAQ >= 5', ok: faq >= 5, val: faq },
      { name: 'no Chinese', ok: !hasZh(content) },
      { name: 'no Japanese', ok: !hasJa(content) },
      { name: 'no 智印港', ok: !content.includes('智印港') },
      { name: 'has DHL', ok: /DHL/i.test(content) },
      { name: 'has ZprintPro', ok: content.includes('ZprintPro') },
    ];
    const failed = checks.filter((c) => !c.ok);
    if (failed.length === 0) { pass++; console.log(`  ✅ ${slug}: ${checks.length}/${checks.length}`); }
    else { fail++; console.log(`  ❌ ${slug}: ${checks.length - failed.length}/${checks.length}`); failed.forEach((f) => console.log(`     - ${f.name}${f.val !== undefined ? ` (${f.val})` : ''}`)); }
  }
  console.log(`\n汇总: ${pass} PASS / ${fail} FAIL`);

  if (APPLY_MODE) {
    console.log('\n====== APPLY MODE ======');
    if (!fs.existsSync(PRODUCTS_FILE)) { console.error(`❌ Not found: ${PRODUCTS_FILE}`); process.exit(1); }
    let content = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    const lines = content.split('\n');
    let applied = 0;

    for (const slug of Object.keys(LONGDESC_V3)) {
      // find slug line
      const slugLine = lines.findIndex((ln) => ln.includes(`slug: '${slug}'`));
      if (slugLine < 0) { console.log(`  ⚠️ ${slug}: slug not found, skipped`); continue; }
      // find object opening { backward
      let objStart = slugLine;
      while (objStart > 0 && !lines[objStart].trim().startsWith('{')) objStart--;
      // find object closing }, forward with brace counting
      let depth = 0, objEnd = -1;
      for (let j = objStart; j < lines.length; j++) {
        depth += (lines[j].match(/{/g) || []).length;
        depth -= (lines[j].match(/}/g) || []).length;
        if (depth === 0 && j > objStart) { objEnd = j; break; }
      }
      if (objEnd < 0) { console.log(`  ⚠️ ${slug}: object end not found`); continue; }

      // find longDescriptionEn line
      let ldescLine = -1;
      for (let j = objStart; j <= objEnd; j++) {
        if (/longDescriptionEn:\s*`/.test(lines[j])) { ldescLine = j; break; }
      }
      if (ldescLine < 0) { console.log(`  ⚠️ ${slug}: longDescriptionEn line not found`); continue; }

      // the backtick block: from line ldescLine (with `) to the line that has closing `
      let closeLine = -1;
      for (let j = ldescLine; j <= objEnd; j++) {
        if (j > ldescLine && lines[j].includes('`')) { closeLine = j; break; }
      }
      if (closeLine < 0) { console.log(`  ⚠️ ${slug}: closing backtick not found`); continue; }

      // Replace lines [ldescLine..closeLine] with new content
      // Indent: longDescriptionEn line uses 4-space indent in products.ts
      // New content lines also use 6-space indent (continuation of template literal)
      const newContent = LONGDESC_V3[slug].content;
      const newLines = newContent.split('\n').map((ln, i) => {
        if (i === 0) return `    longDescriptionEn: \`${ln}`;
        if (ln === '') return ln;
        return ln;
      });
      // Last line should be just closing backtick
      newLines.push('    `,');

      // Apply
      const before = lines.slice(0, ldescLine);
      const after = lines.slice(closeLine + 1);
      lines.splice(0, lines.length, ...before, ...newLines, ...after);
      applied++;
      console.log(`  ✅ ${slug}: longDescriptionEn replaced (lines ${ldescLine + 1}..${closeLine + 1} → ${newLines.length} new lines)`);
      // objEnd is now stale but we don't need it (loop continues with next slug)
    }

    fs.writeFileSync(PRODUCTS_FILE, lines.join('\n'), 'utf-8');
    console.log(`\n📝 Wrote ${applied} longDescriptionEn updates to ${PRODUCTS_FILE}`);
    console.log(`💡 Next: git diff src/data/products.ts | head -100 to review`);
  } else {
    console.log('\n💡 Run with --apply to write changes to products.ts');
  }
}

run();