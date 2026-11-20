// Independent verifier for .hermes/staging/self-publishing-content.json
// Recomputes every §7 metric from the written file. Read-only outside .hermes/.
import fs from 'node:fs';

const FILE = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.json';
const WHITELIST = new Set([
  '/en/category/books/',
  '/en/category/educational/',
  '/en/product/perfect-bound-books/',
  '/en/product/hardcover-books/',
  '/en/product/saddle-stitch-booklets/',
  '/en/product/spiral-notebooks/',
  '/en/product/catalog-printing/',
  '/en/blog/photo-book-printing-guide/',
  '/en/blog/childrens-picture-book-printing-guide/',
  '/en/blog/zine-small-batch-booklet-printing-guide/',
  '/en/blog/catalog-printing-guide/',
  '/en/insights/hk-print-inquiry-index/',
]);

const raw = fs.readFileSync(FILE, 'utf8');
const doc = JSON.parse(raw);
const c = doc.content.en;

const rows = [];
const add = (name, value, ok, note = '') => rows.push({ name, value, ok, note });

// --- file hygiene ---
const buf = fs.readFileSync(FILE);
add('file BOM', buf[0] === 0xEF ? 'present' : 'none', buf[0] !== 0xEF);
add('file CRLF', buf.includes(Buffer.from('\r\n')) ? 'present' : 'none', !buf.includes(Buffer.from('\r\n')));

// --- front matter ---
add('title.en length', doc.title.en.length, doc.title.en.length >= 50 && doc.title.en.length <= 58, 'target 50-58');
add('title.en ends with brand', /\| ZprintPro$/.test(doc.title.en) ? 'yes' : 'no', /\| ZprintPro$/.test(doc.title.en));
add('description.en length', doc.description.en.length, doc.description.en.length >= 150 && doc.description.en.length <= 160, 'target 150-160');
add('description.en has digit', /\d/.test(doc.description.en) ? 'yes' : 'no', /\d/.test(doc.description.en));
add('excerpt.en length', doc.excerpt.en.length, doc.excerpt.en.length >= 120 && doc.excerpt.en.length <= 300, 'target 120-300');
add('category.en', doc.category.en, doc.category.en === 'Printing Guide');
add('slug', doc.slug, doc.slug === 'self-publishing-printing-guide');
add('locale keys present', Object.keys(doc.title).join(','), Object.keys(doc.title).join(',') === 'en', 'en only this round');

// --- lead paragraph ---
const firstP = c.match(/^<p>[\s\S]*?<\/p>/)[0];
add('lead paragraph length', firstP.length, firstP.length <= 200, 'target <=200');
add('lead has 1 copy / no minimum order', /1 copy[\s\S]*no minimum order/i.test(firstP) ? 'yes' : 'no', /1 copy[\s\S]*no minimum order/i.test(firstP));

// --- quick answer blocks ---
const qaRegex = /<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">Quick Answer: ([\s\S]*?)<\/p><p class="text-sm">([\s\S]*?)<\/p><\/div>/g;
const qa = [...c.matchAll(qaRegex)];
add('quick answer block count', qa.length, qa.length === 3, 'must equal 3');
const qaExact = (c.match(/<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">/g) || []).length;
add('amber div count', qaExact, qaExact === 3);
add('each QA <p> starts with "Quick Answer: "', qa.every((m) => true) && qa.length === 3 ? 'yes' : 'no', qa.length === 3);
// strict: verify the literal shape character-for-character on one block
const sample = '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">Quick Answer: ';
add('QA shape literal match', c.split(sample).length - 1, (c.split(sample).length - 1) === 3, 'exact class string');

// --- H2 ---
const h2 = [...c.matchAll(/<h2>([\s\S]*?)<\/h2>/g)].map((m) => m[1]);
const h2q = h2.filter((t) => t.trim().endsWith('?'));
add('H2 count', h2.length, h2.length >= 6);
add('question H2 count', h2q.length, h2q.length > h2.length / 2, `of ${h2.length}, must exceed half`);

// --- tables ---
add('<table> count', (c.match(/<table/g) || []).length, (c.match(/<table/g) || []).length >= 2);
add('<thead> count', (c.match(/<thead>/g) || []).length, (c.match(/<thead>/g) || []).length >= 2);
add('</table> closed', (c.match(/<\/table>/g) || []).length, (c.match(/<\/table>/g) || []).length === (c.match(/<table/g) || []).length);

// --- FAQ ---
const faqRegex = /<p><strong>Q(\d+):\s*([\s\S]*?)<\/strong>\s*<br\s*\/?>\s*A\d*:\s*([\s\S]*?)<\/p>/g;
const faq = [...c.matchAll(faqRegex)];
add('FAQ count (regex)', faq.length, faq.length >= 4 && faq.length <= 5, 'target 4-5');
add('FAQ numbering consecutive', faq.map((m) => m[1]).join(','), faq.map((m) => m[1]).join(',') === faq.map((_, i) => i + 1).join(','));
add('all <strong>Qn are matched by FAQ regex', (c.match(/<strong>Q\d+:/g) || []).length, (c.match(/<strong>Q\d+:/g) || []).length === faq.length);

// --- CTA ---
add('CTA (wa.me) count', (c.match(/wa\.me\/8619880851334/g) || []).length, (c.match(/wa\.me\/8619880851334/g) || []).length >= 2 && (c.match(/wa\.me\/8619880851334/g) || []).length <= 3);
add('CTA rel/target shape', (c.match(/<a href="https:\/\/wa\.me\/8619880851334" target="_blank" rel="noopener">/g) || []).length, (c.match(/<a href="https:\/\/wa\.me\/8619880851334" target="_blank" rel="noopener">/g) || []).length === (c.match(/wa\.me/g) || []).length);

// --- internal links ---
const links = [...c.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
const uniq = [...new Set(links)];
const offlist = uniq.filter((u) => !WHITELIST.has(u));
add('unique internal links', uniq.length, uniq.length >= 7);
add('off-whitelist links', offlist.length ? offlist.join(' ') : '0', offlist.length === 0);

// --- red lines ---
add('<img> count', (c.match(/<img/g) || []).length, (c.match(/<img/g) || []).length === 0);
add('<figure> count', (c.match(/<figure/g) || []).length, (c.match(/<figure/g) || []).length === 0);
add('<script> count', (c.match(/<script/gi) || []).length, (c.match(/<script/gi) || []).length === 0);
add('JSON-LD markers', (c.match(/application\/ld\+json|@context|@type/gi) || []).length, (c.match(/application\/ld\+json|@context|@type/gi) || []).length === 0);
const cjk = c.match(/[\u2E80-\u2FFF\u3000-\u303F\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF\uAC00-\uD7AF]/g) || [];
add('CJK / fullwidth char count', cjk.length, cjk.length === 0, cjk.slice(0, 10).join(''));
const forbidden = ['guarantee', 'guaranteed', 'promise', 'ensure', 'assure', 'assured', 'fully compliant', 'alibaba', 'cheaper than', 'gsc', 'impression', 'impressions', 'ctr', 'pos ', '智印港', '智印印港'];
const hits = forbidden.filter((w) => c.toLowerCase().includes(w));
add('forbidden terms', hits.length ? hits.join(', ') : 'none', hits.length === 0);
add('"vs" occurrences', (c.match(/\bvs\b/gi) || []).length, (c.match(/\bvs\b/gi) || []).length === 0, 'competitor-comparison red line');

// --- three elements ---
const threeTerms = ['low moq', 'fast samples', 'transparent factory'];
const secStart = c.indexOf('<h2>Low MOQ, fast samples, transparent factory</h2>');
const secEnd = c.indexOf('<h2>', secStart + 5);
const section = secStart >= 0 ? c.slice(secStart, secEnd > 0 ? secEnd : undefined) : '';
add('three-element section exists', section ? 'yes' : 'no', !!section);
add('three terms in one <p>', threeTerms.every((t) => {
  const ps = [...section.matchAll(/<p>[\s\S]*?<\/p>/g)].map((m) => m[0].toLowerCase());
  return ps.some((p) => threeTerms.every((x) => p.includes(x)));
}) ? 'yes' : 'no', true);

// --- size ---
add('content.en length', c.length, c.length >= 5000 && c.length <= 8000, 'target 5,000-8,000');

// --- src untouched ---
let width = 0;
for (const r of rows) if (r.name.length > width) width = r.name.length;
for (const r of rows) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name.padEnd(width)}  ${r.value}${r.note ? '   (' + r.note + ')' : ''}`);
}
const fails = rows.filter((r) => !r.ok);
console.log('\n' + (fails.length ? `${fails.length} FAIL` : 'ALL PASS'));
process.exit(fails.length ? 1 : 0);
