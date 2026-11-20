// D14 en 12 段完整版 content 生成器 (对齐 ja 12 段骨架, 单品牌 ZprintPro)
// 数据来源: src/data/products.ts textbooks SKU (HK$5-50/本, 100本起, A4/B5, 80-100g wood-free, perfect/saddle/hardcover, ISBN)
// GSC 实证: 教科書 印刷 104 imp pos 40.6 / 教材 印刷製本 53 imp pos 52.4 (ja B2B cluster)
const fs = require('fs');

const faqs = [
  ['What is the minimum order quantity for textbooks?', '100 copies for textbooks (standard). Saddle-stitch booklets from 50 copies. 5 sample copies for proofing.'],
  ['How long does it take?', 'Standard 5-7 business days after proof approval. Rush 48 hours available on request. Peak season is 2 weeks before term start — annual contracts secure priority slots.'],
  ['Which paper and binding should I choose?', '80-100g wood-free paper (eye-friendly) + saddle stitch (thin) or perfect bound (thick) is standard. 200g coated cover with lamination for durability (products.ts specs).'],
  ['Do you ship internationally?', 'Yes — DHL Express 2-4 days to Japan and worldwide from the Shenzhen factory. Direct delivery to schools, tutoring centers and publishers.'],
  ['Do you support ISBN/barcodes?', 'Yes — ISBN/JAN barcode/QR code printing is standard (textbook SKU description).'],
  ['Are there volume discounts for annual contracts?', 'Term-by-term recurring orders qualify for volume discounts. Register your annual quantity in advance for stable pricing and peak-season priority.'],
];

const LINKS = {
  textbooks: '/en/product/textbooks/',
  saddle: '/en/product/saddle-stitch-booklets/',
  perfect: '/en/product/perfect-bound-books/',
  hardcover: '/en/product/hardcover-books/',
  notebooks: '/en/product/spiral-notebooks/',
  catBooks: '/en/category/books/',
  catEdu: '/en/category/educational/',
  catDoujin: '/en/category/japan-doujin/',
  blogSaddle: '/en/blog/saddle-stitch-booklet-printing-guide/',
  blogDoujin: '/en/blog/doujin-circle-printing-guide/',
  blogGrad: '/en/blog/graduation-yearbook-printing-guide/',
  blogCampus: '/en/blog/campus-education-printing-pillar-guide/',
  quote: '/en/quote/',
  contact: '/en/contact/',
};

function a(href, text, cls = 'text-[#1A56DB] underline') {
  return `<a href="${href}" class="${cls}">${text}</a>`;
}

const content = `<p>Textbook and educational material printing is an annual procurement for schools, tutoring chains and publishers. ZprintPro offers <a href="${LINKS.textbooks}" class="text-[#1A56DB] underline">textbook printing</a> and educational printing from 100 copies: A4/B5 sizes, 80-100g wood-free eye-friendly paper, 3 binding types (saddle stitch / perfect bound / hardcover), 5-7 business day turnaround, DHL Express 2-4 day global delivery, and ISBN/barcode support. With 15+ years of printing engineering experience, we serve annual-contract printing for schools, tutoring centers and publishers.</p>
<p>Textbook & educational printing quote: <a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">+86 198 8085 1334 (WhatsApp)</a> — 30-second AI quote, free consultation.</p>

<h2>1. How to Choose the Right Binding for Textbooks?</h2>
<p>Binding depends on page count and use case. <a href="${LINKS.textbooks}" class="text-[#1A56DB] underline">Textbook printing</a> standard specs: A4/B5, 80-100g wood-free paper, perfect bound or saddle stitch (products.ts specs).</p>
<div class="bg-blue-50 p-4 rounded-lg"><p><strong>Saddle Stitch</strong>: 8-64 page thin booklets for workbooks, drills and handouts. Lays flat, most affordable. From 50 copies. See the ${a(LINKS.blogSaddle, 'saddle stitch booklet printing guide')}.</p></div>
<div class="bg-blue-50 p-4 rounded-lg"><p><strong>Perfect Bound</strong>: 64+ page standard books for textbooks and training manuals. Spine title printing available. From 100 copies.</p></div>
<div class="bg-blue-50 p-4 rounded-lg"><p><strong>Hardcover</strong>: Premium books, yearbooks and library editions. ${a(LINKS.hardcover, 'Hardcover book printing')} from 100 copies.</p></div>

<h2>2. Which Paper Stock for Educational Printing?</h2>
<p>Textbooks need eye-friendly paper. ZprintPro standard: 80-100g wood-free paper, 200g coated cover with lamination option (products.ts specs).</p>
<table><thead><tr><th>Stock</th><th>Use</th><th>Feature</th></tr></thead><tbody>
<tr><td>80g wood-free</td><td>Workbooks, drills</td><td>Writes smoothly, no bleed</td></tr>
<tr><td>100g wood-free</td><td>Textbooks</td><td>Strength + writing balance</td></tr>
<tr><td>200g coated (cover)</td><td>Textbook covers</td><td>Vivid color + lamination</td></tr>
<tr><td>Bond paper</td><td>Training manuals</td><td>High whiteness</td></tr>
</tbody></table>

<h2>3. How Much Does Textbook Printing Cost?</h2>
<p><a href="${LINKS.textbooks}" class="text-[#1A56DB] underline">Textbook printing</a> from 100 copies at <strong>HK$5-50/book</strong> (products.ts price). Price varies by pages, binding and quantity — volume discounts apply as quantity increases.</p>
<table><thead><tr><th>Quantity</th><th>Unit Price (HK$)</th><th>Note</th></tr></thead><tbody>
<tr><td>100 copies</td><td>HK$5-50/book</td><td>Small batch standard</td></tr>
<tr><td>500 copies</td><td>Volume discount</td><td>Quote confirmed</td></tr>
<tr><td>1,000+ copies</td><td>Volume discount</td><td>Lower unit price</td></tr>
</tbody></table>
<p>Get an exact quote via the ${a(LINKS.quote, '30-second AI instant quote')}: enter pages, quantity and binding.</p>

<h2>4. How Does an Annual Contract Work?</h2>
<p>Annual procurement for schools, tutoring chains and publishers follows a planned flow:</p>
<ol>
<li><strong>Apr-Jun</strong>: Finalize next year's material list, page counts and quantities</li>
<li><strong>Jul-Aug</strong>: Sample proof (5 copies) + unit price contract (annual rate locked)</li>
<li><strong>Sep-Nov</strong>: Term-by-term orders (produced from proofed files)</li>
<li><strong>Dec-Mar</strong>: Spring session and new-term reprints</li>
</ol>
<p>Annual contract benefits: stable pricing + peak-season priority + volume discounts. ${a(LINKS.contact, 'Annual contract consultation')} is free.</p>

<h2>5. Printing for Tutoring Centers and International Schools?</h2>
<p>Tutoring centers and international schools have different materials per grade in small quantities — the 100-copy minimum fits perfectly. The ${a(LINKS.catEdu, 'educational printing')} category covers textbooks, workbooks and yearbooks in one order. ${a(LINKS.notebooks, 'Spiral notebooks')} are popular for supplementary materials and custom tutoring workbooks.</p>

<h2>6. What Is the Proofing Process?</h2>
<p>ZprintPro runs full proofing: <strong>①design check → ②free PDF proof → ③color proof (optional) → ④physical sample (5 copies)</strong>. Page numbers, chapters, question numbers and ISBN positions are all confirmed on the proof.</p>
<p>CMYK color standard. For image-heavy materials, coated paper + full color is recommended. Check the ${a(LINKS.catBooks, 'book printing')} category for binding options.</p>

<h2>7. What Is the Turnaround Time?</h2>
<p>Standard <strong>5-7 business days</strong> after proof approval. Rush 48 hours available. Peak season is 2 weeks before term start (mid-Aug to early Sep / mid-Mar to early Apr) — order early via annual contract.</p>
<p>See the ${a(LINKS.blogSaddle, 'saddle stitch booklet guide')} and ${a(LINKS.blogDoujin, 'doujinshi printing guide')} for real turnaround examples.</p>

<h2>8. Textbooks vs Doujinshi vs Yearbooks?</h2>
<p>Same binding technology, different specs by use case.</p>
<table><thead><tr><th>Use</th><th>Binding</th><th>Quantity</th><th>Feature</th></tr></thead><tbody>
<tr><td>Textbooks</td><td>Perfect bound</td><td>100-5,000</td><td>ISBN, annual contract</td></tr>
<tr><td>Doujinshi</td><td>Saddle/Perfect</td><td>50-500</td><td>Small batch, fast, free cover finishes</td></tr>
<tr><td>Yearbooks</td><td>Hardcover</td><td>50-500</td><td>Premium finish</td></tr>
</tbody></table>
<p>See the ${a(LINKS.blogGrad, 'yearbook printing guide')} and ${a(LINKS.blogDoujin, 'doujinshi printing')} — also handled under ${a(LINKS.catBooks, 'book printing')}.</p>

<h2>9. Quality Assurance for Textbook Printing?</h2>
<p>ZprintPro runs an in-house factory with full quality control: <strong>①100% proof approval (free PDF proof + 5 physical samples) ②FSC-certified paper ③DHL Express tracked delivery ④15+ years offset printing engineering team</strong>. Every step from cover to text is quality-checked.</p>

<h2>10. International Delivery for Textbooks?</h2>
<p>From the Shenzhen factory, <strong>DHL Express delivers to Japan in 2-4 days</strong>. Direct delivery to schools, tutoring centers and publishers, multi-school consolidated shipping (split delivery) supported, with customs clearance assistance.</p>
<p>The ${a(LINKS.blogCampus, 'campus education printing guide')} covers the full picture for school printing.</p>

<h2>11. FAQ</h2>
${faqs.map(([q, a2], i) => `<p><strong>Q${i + 1}: ${q}</strong><br/>A: ${a2}</p>`).join('\n')}

<h2>12. How to Order Textbook Printing?</h2>
<p><a href="${LINKS.textbooks}" class="text-[#1A56DB] underline">Textbook printing</a> from 100 copies. Get an instant price via the ${a(LINKS.quote, '30-second AI quote')} — enter pages, quantity and binding. Annual contract and recurring order inquiries: <a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">WhatsApp +86 198 8085 1334</a> or ${a(LINKS.contact, 'contact us')}. Trust ZprintPro for textbook and educational material printing.</p>`;

console.log(JSON.stringify(content));
