// .hermes/_doujin_all_locale.cjs
const fs = require('fs');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const p = j['doujin-circle-printing-guide'];
  if (!p) { console.log(loc, 'MISSING'); continue; }
  const c = p.content || '';
  const h2 = (c.match(/<h2/g) || []).length;
  const links = new Set([...c.matchAll(/href="([^"]+)"/g)].map(m => m[1])).size;
  console.log(`${loc}: len=${c.length} h2=${h2} links=${links} date=${p.date}`);
  const bads = [];
  if (/30 部 MOQ|30部MOQ|30 部 MOQ/.test(c)) bads.push('30部MOQ');
  if (/US\$/.test(c)) bads.push('US$ x' + (c.match(/US\$/g) || []).length);
  if (/約 USドル/.test(c)) bads.push('broken-figure');
  if (/Comic-Con|Flame Con|MCM London/.test(c)) bads.push('US-events x' + (c.match(/Comic-Con|Flame Con|MCM/g) || []).length);
  if (loc === 'ja' && /份/.test(c)) bads.push('份');
  console.log('  defects:', bads.join(', ') || '(none)');
}
// 真值锚点（doujinshi-printing sku-seo ja）
const ss = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const i = ss.indexOf('"doujinshi-printing"');
const seg = ss.slice(i, i + 3000);
const m = seg.match(/"ja": \{[\s\S]{0,600}?"title": "([^"]+)"/);
console.log('\nja seo title:', m ? m[1] : 'n/a');
