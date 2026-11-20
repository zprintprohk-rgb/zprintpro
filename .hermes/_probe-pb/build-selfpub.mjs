// Builder v5 (final) for .hermes/staging/self-publishing-content.json (en only).
// Writes UTF-8 without BOM, LF newlines. No src/ writes.
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.json';
const WA = 'https://wa.me/8619880851334';
const A = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
const IL = (href, text) => `<a href="${href}">${text}</a>`;
const QAB = (q, a) =>
  `<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">Quick Answer: ${q}</p><p class="text-sm">${a}</p></div>`;
const T = (c) => `<td class="border p-2">${c}</td>`;
const TH = (c) => `<th class="border p-2 text-left">${c}</th>`;
const ROW = (...c) => `<tr>${c.map(T).join('')}</tr>`;
const TB = (...h) => `<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100">`
  + h.map(TH).join('') + `</tr></thead><tbody>`;

const B = [];

B.push(`<p>Self-publishing printing starts at <strong>1 copy, no minimum order</strong>. Digital runs carry no plate fee; 100+ copies turn to offset.</p>`);

B.push(QAB(`What is the minimum order for a book?`,
  `1 copy, no minimum order: the category page runs digital printing, which needs no plate.`));
B.push(QAB(`When does offset beat digital?`,
  `At 100+ copies, which the category page recommends for offset. Below that, digital costs more per copy but drops the plate fee.`));
B.push(QAB(`How do I check quality before a full run?`,
  `Order one copy: a digital proof is ready within 1 hour of file submission on the perfect bound line.`));

B.push(`<p>Know your page count? ${A(WA, 'Send your specs to ZprintPro on WhatsApp')} for a per-copy quote at 100 and 1,000 copies.</p>`);

// H2 1 (question)
B.push(`<h2>Can you print a self-published book from 1 copy?</h2>`);
B.push(`<p>Yes. The ${IL('/en/category/books/', 'books category page')} states a <strong>1 copy minimum on digital printing</strong> and names it for self-publishing and limited art editions. Before a crowdfunding launch, order one copy, photograph it, then print the run.</p>`);

// H2 2 (question)
B.push(`<h2>How is self-publishing book printing priced?</h2>`);
B.push(`<p>Books are quoted per copy. Four specifications set the band: <strong>page count, trim size, interior stock and binding</strong>. Published bands run HK$16-80 per copy for ${IL('/en/product/perfect-bound-books/', 'perfect bound books')}, HK$40-240 for ${IL('/en/product/hardcover-books/', 'hardcover books')}, HK$6-32 for ${IL('/en/product/saddle-stitch-booklets/', 'saddle stitch booklets')}, HK$8-40 for ${IL('/en/product/spiral-notebooks/', 'spiral notebooks')} and HK$2.8-1000 for ${IL('/en/product/catalog-printing/', 'catalog printing')}.</p>`);
B.push(`<p>The product pages name an HP Indigo 15K B2 digital line and a Heidelberg offset press line. Offset needs plates, so make-ready only pays back over a longer run. Lead times: digital 2-3 days, offset 5-7 days, hardcover 7-10 days. DHL worldwide shipping is 2-4 days, free on US orders over $99.</p>`);

// H2 3 (question) + binding table
B.push(`<h2>Which binding should you choose for your book?</h2>`);
B.push(`<p>Six binding methods are listed on the category page; these five have a product page.</p>`);
B.push(TB('Binding', 'Best for', 'Pages')
  + ROW('Perfect bound', 'Novels and reports', '48-400')
  + ROW('Hardcover', 'Keepsakes and yearbooks', 'By page count')
  + ROW('Saddle stitch', 'Zines and programmes', '8-64')
  + ROW('Wire-o and spiral', 'Workbooks and manuals', 'By page count')
  + ROW('Catalog', 'Lookbooks and portfolios', 'By page count')
  + `</tbody></table>`);
B.push(`<p>Perfect bound and hardcover do not lie flat, so artwork crossing the spine loses a few millimetres into the gutter; saddle stitch and wire-o open flat, which suits a slim ${IL('/en/blog/zine-small-batch-booklet-printing-guide/', 'small-batch booklet')}.</p>`);

// H2 4 (question) + ladder table
B.push(`<h2>What does the price ladder look like from 100 to 10,000 copies?</h2>`);
B.push(`<p>The perfect bound product page publishes a reference ladder for A5 (148 x 210 mm), 4+32pp, PUR perfect binding.</p>`);
B.push(TB('Run size', 'Unit price')
  + ROW('100', 'US$2.08')
  + ROW('500', 'US$0.66')
  + ROW('1,000', 'US$0.36')
  + ROW('5,000', 'US$0.14')
  + ROW('10,000', 'US$0.11')
  + `</tbody></table>`);
B.push(`<p>Unit price falls from US$2.08 at 100 copies to US$0.36 at 1,000, then flattens, and the page flags the 10,000-copy tier as best value. That points to a two-step release, digital for backers then offset once demand is proven, and ${A(WA, 'a quote at two run sizes')} shows the spread.</p>`);

// H2 5 (question) - paper stocks as prose
B.push(`<h2>Which paper and cover stocks hold up in the mail?</h2>`);
B.push(`<p>Stocks are listed per title in the product data. Perfect bound and catalog work use 157g-200g art paper inside with a 200g-250g laminated cover; hardcover replaces it with 2.5mm gray board, foil or ribbon; saddle stitch runs on 128g-157g book paper. Matte lamination shows handling marks, gloss shows scratches. Picture-led titles follow the same logic in the ${IL('/en/blog/childrens-picture-book-printing-guide/', "children's picture book guide")}.</p>`);

// H2 6 (statement) - three mandated elements
B.push(`<h2>Low MOQ, fast samples, transparent factory</h2>`);
B.push(`<p>Low MOQ, fast samples and a transparent factory are the three factors an author is really buying, and each is checkable before ordering.</p>`);
B.push(`<p><strong>Low MOQ.</strong> The minimum is 1 copy on digital printing with no minimum order, so a proof copy and a limited signed edition come from one file. The category page recommends 100+ copies for offset and lists volume discounts at 500, 1,000 and 5,000 copies, while the product pages for the offset-oriented titles carry a structured minimum of 100 pieces. Ask which applies to your specification.</p>`);
B.push(`<p><strong>Fast samples.</strong> A digital proof is ready within 1 hour of file submission on the perfect bound line, and the category page quotes a free design proof within 4 hours.</p>`);
B.push(`<p><strong>Transparent factory.</strong> The facility is described as ISO 9001 and FSC certified, and the book product pages name ICC color management with press-side proofing. The category page also notes an InDesign typesetting team. The ${IL('/en/insights/hk-print-inquiry-index/', 'print inquiry index')} lists the specification fields a factory needs before files are sent.</p>`);

// H2 7 (statement) - FAQ
B.push(`<h2>Frequently asked questions about self-publishing printing</h2>`);
B.push(`<p><strong>Q1: Is there really no minimum order?</strong><br/>A: The category page states a 1 copy minimum on digital printing with no minimum order, while the product pages for the offset-oriented titles list 100 pieces.</p>`);
B.push(`<p><strong>Q2: What does it cost to print 100 paperback copies?</strong><br/>A: For the published A5, 4+32pp PUR perfect bound reference specification, the product page lists US$2.08 per copy at 100 copies, a batch total of US$207.94.</p>`);
B.push(`<p><strong>Q3: Can I get a sample before ordering a full run?</strong><br/>A: Yes. Because the minimum is 1 copy, a single sample can be ordered from the same file, and the category page quotes a free design proof within 4 hours.</p>`);
B.push(`<p><strong>Q4: How long does printing and delivery take?</strong><br/>A: Digital at 2-3 days, offset at 5-7 days and hardcover at 7-10 days, per the category page. DHL worldwide shipping is 2-4 days, free on US orders over $99.</p>`);

// Closing CTA
B.push(`<p>Ready to hold your own book? ${A(WA, 'Send your trim size and page count to ZprintPro')} for a quote at your run size. Related reading: ${IL('/en/blog/catalog-printing-guide/', 'catalog printing')} and ${IL('/en/category/educational/', 'educational printing')}.</p>`);

const content = B.join('\n\n');

const doc = {
  slug: 'self-publishing-printing-guide',
  title: { en: 'Self-Publishing Printing: 1 Copy, Paperback | ZprintPro' },
  description: {
    en: 'Self-publishing printing from 1 copy, no minimum order. Compare paperback and hardcover bindings, see the 100 to 10,000 copy price ladder, then WhatsApp us.',
  },
  excerpt: {
    en: 'Self-publishing book printing starts at 1 copy with no minimum order. This guide compares five binding formats, explains the digital-to-offset break at 100 copies, and publishes the per-copy reference ladder from 100 to 10,000 copies.',
  },
  category: { en: 'Printing Guide' },
  content: { en: content },
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(doc, null, 2) + '\n', 'utf8');

const raw = fs.readFileSync(OUT);
console.log('written:', OUT);
console.log('bytes:', raw.length, 'BOM:', raw[0] === 0xEF ? 'YES' : 'no', 'CRLF:', raw.includes(Buffer.from('\r\n')) ? 'YES' : 'no');
console.log('title.en:', doc.title.en.length, '| description.en:', doc.description.en.length, '| excerpt.en:', doc.excerpt.en.length, '| content.en:', content.length);
console.log('--- per block ---');
B.forEach((b, i) => console.log(String(i).padStart(2), String(b.length).padStart(5), b.slice(0, 50).replace(/\n/g, ' ')));
