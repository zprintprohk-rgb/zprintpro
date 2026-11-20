'use strict';
/**
 * Etsy 篇 (en 单语) 入库 — 全程序化生成 + 六道断言
 * 口径来源 (全部已上线, 不新造):
 *   · 起订 MOQ: PAPER_GOODS_MOQ_AEO.en = "From 10 pieces … From 100 pieces the unit price drops clearly"
 *   · 书刊: MOQ_DISPLAY.en = "From 10 copies (digital) · 100+ cheaper on offset"
 *   · 合规: FDA 21 CFR 175.105 / EU REACH (站内既有)
 *   · 打样/交期/报价: free proof / DHL 2-4 day / 30-second quote (站内既有)
 * 红线 (措辞卡 §1.2 / §2.1): 零竞品名 / 零倍数 / 零量级数字 / 零绝对化 / 不披露加成与汇率
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const TARGET = path.join(REPO, 'src', 'data', 'blog-data', 'en.json');
const BAK = path.join(REPO, '.hermes', '_probe-pb', '_etsy-article.en.json.bak');
const SLUG = 'etsy-seller-printing-guide';

const TITLE = 'Etsy Printing: 10-Piece Min, Free Proof | ZprintPro';
const DESC = 'Etsy sellers print from 10 pieces with no 500-piece minimum, get a free digital proof, DHL 2-4 day restock and FDA plus REACH files on request. 30s quote.';

const C = (s) => s;

const para = [];
para.push(`<h1>Etsy Seller Printing: Start at 10 Pieces, Prove It Free, Restock in 2-4 Days</h1>`);
para.push(`<p>If you sell on Etsy, print is a stock problem before it is a design problem. A listing that sells a few units a day still has to keep labels, cards, tags or packaging on the shelf; a print run sized for a warehouse turns your working capital into cardboard. This page explains the four things Etsy sellers ask us about most: <strong>how low the minimum really is</strong>, <strong>how to check quality before committing</strong>, <strong>how fast a restock can land</strong>, and <strong>which compliance documents you can get for food-contact or EU-bound products</strong>.</p>`);
para.push(`<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">Quick Answer: What is the minimum order?</p><p class="text-sm">From <strong>10 pieces</strong> on our small-batch sticker, card and flyer lines. We accept 10 and we accept 99 &mdash; the difference is the unit price, because press start-up and colour calibration are spread over fewer pieces. From <strong>100 pieces</strong> the unit price drops clearly.</p></div>`);

para.push(`<h2>1. Why the minimum matters more for Etsy than for a warehouse</h2>`);
para.push(`<p>Offset printing carries fixed costs &mdash; plate making, die making, make-ready &mdash; so traditional runs are quoted in the hundreds or thousands. That is fine for a brand shipping pallets; it is the wrong shape for a shop that restocks weekly. Digital printing removes the plate cost, which is what makes a ten-piece run possible in the first place.</p>`);
para.push(`<p>Our small-batch lines start at <strong>10 pieces</strong>: waterproof stickers, clear stickers, removable stickers, die-cut stickers, foil stickers and anti-counterfeit stickers, plus greeting cards and A4/A5 flyers. Food-grade label stickers and rigid packaging boxes are offset work and start higher &mdash; the product page always states the real number for that item, so check the page before you plan a run.</p>`);
para.push(`<p><strong>How to use this:</strong> test a listing with a 10-piece or 50-piece run, photograph the finished item for your Etsy photos, and only scale once the listing proves it sells. Because the unit price falls as quantity rises, the same file can be reordered at 100 or 500 pieces later without any artwork change.</p>`);

para.push(`<h2>2. Prove it free before you commit</h2>`);
para.push(`<p>A proof is the lowest-cost insurance in print. Most Etsy quality complaints we see are not ink problems &mdash; they are size, stock or die-shape mismatches that a single proof would have caught.</p>`);
para.push(`<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>Free digital proof</strong> on your order: colour, size, stock and finish checked before production starts.</li><li><strong>Physical sample available</strong> on request, so you can check paper feel and laminate before a full run.</li><li><strong>File check included</strong>: we check bleed, resolution and colour mode, and tell you what to fix rather than printing a bad file.</li></ul>`);
para.push(`<p>For a new listing, the practical sequence is: send the artwork, approve the digital proof, then order the smallest run that gets you to launch. Once the listing has reviews, reorder at the volume tier.</p>`);

para.push(`<h2>3. Restocking in 2-4 days instead of pressing your luck</h2>`);
para.push(`<p>Etsy sellers generally reorder in small, frequent batches. A restock that lands after the listing has already sold out costs you search ranking, so lead time is a stock decision as much as a shipping one.</p>`);
para.push(`<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>Standard production 5-7 working days</strong> for most items; digital short runs move faster than offset.</li><li><strong>Courier delivery 2-4 days</strong> internationally by DHL, plus a local same-day / next-day courier option in Hong Kong.</li><li><strong>30-second AI quote</strong> so you can price a restock before the stock runs out, not after.</li></ul>`);
para.push(`<p>A workable pattern for a shop selling a few units a day: keep one production run in hand, and start the next run when you are roughly halfway through it. With production and delivery both counted, that keeps the gap between batches inside the delivery window rather than overlapping a stockout.</p>`);

para.push(`<h2>4. Compliance paperwork for food-contact and EU-bound products</h2>`);
para.push(`<p>Etsy's own guidance is that sellers are responsible for compliance with the regulations that apply to their products, and that the platform does not provide regulatory advice. If your product touches food, or if you ship into the EU, the burden of evidence sits with you &mdash; so it is worth knowing what a printer can hand over.</p>`);
para.push(`<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>Food-contact adhesive</strong>: FDA 21 CFR 175.105 (indirect food contact) is the standard our food-grade label stock is specified against.</li><li><strong>EU chemical compliance</strong>: EU REACH is the framework EU buyers ask about for chemical safety.</li><li><strong>Paper sourcing</strong>: FSC-certified paper is available, and colour work runs under ISO 12647 colour management.</li><li><strong>Documents</strong>: compliance documentation is available on request &mdash; tell us the end use and destination country when you order, and we confirm which documents apply to your specification.</li></ul>`);
para.push(`<p>Two practical notes. First, "food-safe" and "food-contact" are not interchangeable &mdash; a label on the outside of a jar is a different case from a wrapper in direct contact with food, and the document you need follows the use case. Second, state the destination market up front: EU buyers ask for different paperwork than US buyers, and it is cheaper to settle that before the run than to reprint after it.</p>`);

para.push(`<h2>5. Materials and finishes that Etsy listings use most</h2>`);
para.push(`<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Item</th><th class="border p-2 text-left">Common specification</th><th class="border p-2 text-left">Available finish</th></tr></thead><tbody><tr><td class="border p-2">Product labels</td><td class="border p-2">Water-resistant BOPP, or paper for dry goods</td><td class="border p-2">Matte or gloss laminate, die-cut shapes</td></tr><tr><td class="border p-2">Stickers</td><td class="border p-2">Vinyl, transparent PET, removable adhesive</td><td class="border p-2">Foil stamping, spot UV, die-cut</td></tr><tr><td class="border p-2">Greeting cards</td><td class="border p-2">300gsm coated or 250gsm matte art paper</td><td class="border p-2">Lamination, foil stamping, spot UV, rounded corners</td></tr><tr><td class="border p-2">Thank-you cards</td><td class="border p-2">Same as greeting cards</td><td class="border p-2">Foil stamping, debossing</td></tr><tr><td class="border p-2">Packaging boxes</td><td class="border p-2">Folding carton or rigid board</td><td class="border p-2">Matte or gloss laminate, foil, magnetic closure</td></tr></tbody></table>`);
para.push(`<p>If you are not sure which stock fits, the specification pages below go deeper on each family:</p>`);
para.push(`<ul class="list-disc pl-5 my-3 space-y-1"><li><a href="/en/blog/sticker-guide/">Sticker printing guide</a> &mdash; materials, finishes and applications</li><li><a href="/en/blog/food-packaging-printing-guide/">Food packaging guide</a> &mdash; food-grade stocks and compliance context</li><li><a href="/en/blog/paper-bag-printing-guide/">Paper bag printing guide</a> &mdash; handle types, GSM and finishing</li><li><a href="/en/blog/packaging-box-custom-guide/">Custom packaging box guide</a> &mdash; box styles, board and lamination</li><li><a href="/en/blog/baby-food-packaging-box-printing-guide/">Baby food packaging guide</a> &mdash; child-safety material requirements</li><li><a href="/en/blog/pet-food-sticker-printing-guide/">Pet food label guide</a> &mdash; labelling for pet food brands</li><li><a href="/en/blog/cosmetics-packaging-box-printing-guide/">Cosmetics packaging guide</a> &mdash; skincare and beauty box printing</li><li><a href="/en/blog/ip-character-sticker-printing-guide/">IP character sticker guide</a> &mdash; fan and character merchandise</li></ul>`);

para.push(`<h2>Frequently asked questions</h2>`);
para.push(`<p><strong>Q1: What is the smallest print run I can order?</strong><br/>A: From 10 pieces on our small-batch sticker, card and flyer lines. Food-grade label stickers and rigid boxes are offset work with a higher minimum; the product page states the exact figure for that item.</p>`);
para.push(`<p><strong>Q2: How do I check quality before ordering a full run?</strong><br/>A: Every order includes a free digital proof covering colour, size, stock and finish, and a physical sample is available on request.</p>`);
para.push(`<p><strong>Q3: How fast can a restock arrive?</strong><br/>A: Standard production is 5-7 working days for most items, and courier delivery is 2-4 days internationally by DHL, with a local same-day or next-day option in Hong Kong.</p>`);
para.push(`<p><strong>Q4: Can you supply FDA and REACH documents?</strong><br/>A: Compliance documentation is available on request. Tell us the end use and destination country when you order and we confirm which documents apply to your specification. Food-contact label stock is specified against FDA 21 CFR 175.105 for indirect food contact, and EU buyers generally ask about EU REACH.</p>`);
para.push(`<p><strong>Q5: Does the unit price change with quantity?</strong><br/>A: Yes. Small runs are priced as a setup fee plus a per-piece rate, so the lower the quantity the higher the unit price; from 100 pieces the unit price drops clearly. The same artwork can be reordered at a higher tier later.</p>`);
para.push(`<p><strong>Q6: Can I reorder the same item without resubmitting artwork?</strong><br/>A: Yes. Reorders keep the approved file and specification, which is why a small first run and a larger follow-up run can come from one artwork set.</p>`);

para.push(`<h2>Ready to price your next run?</h2>`);
para.push(`<p>Send the item, quantity, size and finish to <a href="https://wa.me/8619880851334" target="_blank" rel="noopener"><strong>WhatsApp +86 198 8085 1334</strong></a>, or get a <a href="/en/quote/">30-second instant quote</a> first and see what your quantity costs before you commit.</p>`);
para.push(`<p>Related reading: <a href="/en/blog/saddle-stitch-booklet-printing-guide/">saddle stitch booklet printing</a> and the <a href="/en/blog/zine-small-batch-booklet-printing-guide/">zine and small-batch booklet guide</a> for book-format projects.</p>`);
para.push(`<div class="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200"><p><strong>Author team:</strong> the ZprintPro print specialists, working on cross-border printing for small brands and independent sellers.</p><p class="mt-3">Data sources: ZprintPro product pages (minimum quantities, production lead times, shipping options as published September 2026), ZprintPro print method policy (digital versus offset split), and public documentation for FDA 21 CFR 175.105, EU REACH, FSC paper certification and ISO 12647 colour management.</p></div>`);

const content = para.join('\n');
const entry = { slug: SLUG, title: TITLE, description: DESC, date: '2026-09-19', category: 'Printing Guide', content };

// ===== 六道断言 =====
const fail = [];
const HALF = (s) => s.length;
if (HALF(TITLE) > 54 || HALF(TITLE) < 50) fail.push(`标题半角 ${HALF(TITLE)} 越界 [50,54]`);
if (DESC.length < 150 || DESC.length > 160) fail.push(`描述 ${DESC.length} 越界 [150,160]`);
if ((TITLE.match(/ZprintPro/g) || []).length !== 1) fail.push('标题品牌非恰好 1 次');
// 红线
const RED = [
  [/\bvs\s+Alibaba|Alibaba|Sticker Mule|Vistaprint|Packlane|\bMOO\b/i, '竞品名'],
  [/\b\d{1,3},\d{3}\+/, '量级数字'],
  [/\b1,?000\+/, '量级数字'],
  [/\b\d+\s*x\s+(cheaper|faster|better)/i, '倍数'],
  [/cheapest|guaranteed lowest|\bbest price\b|\b100%\s*(satisfaction|guarantee)/i, '绝对化'],
  [/1\.3\s*(x|倍)|RMB|CNY→|margin/i, '内部定价口径'],
  [/GSC|\bpos\s*\d|\bimps?\b|攻艱|衝首頁/i, 'GSC 后台黑话'],
];
for (const [re, label] of RED) { const m = content.match(re); if (m) fail.push(`${label}: ${m[0]}`); }
// 描述不得与正文冲突: 起订口径必须一致
if (!/From 10 pieces|10 pieces/.test(content)) fail.push('正文缺 10 件起订口径');
if (/From 1 copy|1 copy minimum/i.test(content)) fail.push('正文残留过期口径 From 1 copy');
// 内链必须真实存在
const EN = JSON.parse(fs.readFileSync(TARGET, 'utf8'));
const links = [...content.matchAll(/href="\/en\/blog\/([a-z0-9-]+)\//g)].map(m => m[1]);
const badLinks = links.filter(s => !EN[s]);
if (badLinks.length) fail.push(`内链不存在: ${badLinks.join(',')}`);
// tag 平衡 (粗检)
const open = (content.match(/<div/g) || []).length, close = (content.match(/<\/div>/g) || []).length;
if (open !== close) fail.push(`div 不平衡 ${open}/${close}`);

console.log('=== 六道断言 ===');
console.log(`  标题: ${HALF(TITLE)} 半角 | 描述: ${DESC.length} 字符`);
console.log(`  内链: ${links.length} 条, 全部存在: ${badLinks.length === 0 ? '✅' : '❌'}`);
console.log(`  红线: ${RED.length} 类检查`);
console.log(`  正文长度: ${content.length} 字符`);
if (fail.length) { console.log('\n❌ 断言未过, 不写盘:'); fail.forEach(f => console.log('   - ' + f)); process.exit(1); }
console.log('  ✅ 全部通过');

// ===== 写盘 (危险写入三件套) =====
const before = fs.readFileSync(TARGET, 'utf8');
fs.writeFileSync(BAK, before, 'utf8');
const obj = JSON.parse(before);
if (obj[SLUG]) { console.error('❌ 该 slug 已存在 -> 不写盘'); process.exit(1); }
const keysBefore = Object.keys(obj).length;
obj[SLUG] = entry;
const out = JSON.stringify(obj, null, 2);
const back = JSON.parse(out);
if (Object.keys(back).length !== keysBefore + 1) { console.error('❌ 篇目数断言失败'); process.exit(1); }
fs.writeFileSync(TARGET, out, 'utf8');
const re = fs.readFileSync(TARGET, 'utf8');
if (!JSON.parse(re)[SLUG]) { fs.writeFileSync(TARGET, before, 'utf8'); console.error('❌ 写盘校验失败 -> 已回滚'); process.exit(1); }
console.log(`\n✅ Etsy 篇写盘成功: ${SLUG} (篇目 ${keysBefore} -> ${keysBefore + 1})`);
console.log(`   回滚: Copy-Item .hermes/_probe-pb/_etsy-article.en.json.bak src/data/blog-data/en.json -Force`);
