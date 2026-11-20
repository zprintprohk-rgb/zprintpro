// .hermes/_read_b58.cjs
const fs = require('fs');
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/data/blog-data/en.json', 'utf8'));
for (const [loc, slug] of [['zh-hk', 'paper-bag-printing-guide'], ['zh-hk', 'corporate-calendar-customization-2027'], ['en', 'calendar-sizes-print-reference']]) {
  const p = (loc === 'zh-hk' ? zh : en)[slug];
  if (!p) { console.log(loc, slug, 'MISSING'); continue; }
  const c = p.content;
  console.log(`\n=== ${loc}/${slug} len=${c.length} h2=${(c.match(/<h2/g) || []).length} links=${new Set([...c.matchAll(/href="([^"]+)"/g)].map(m => m[1])).size}`);
  console.log('h2:', JSON.stringify([...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, ''))));
  const prices = [...new Set([...c.matchAll(/HK\$[\d.]+(?:-[\d.]+)?/g)].map(m => m[0]))];
  console.log('prices:', prices.slice(0, 8).join(' '));
  if (slug === 'paper-bag-printing-guide') {
    const i = c.indexOf('HK$1.5');
    if (i >= 0) console.log('HK$1.5 ctx:', JSON.stringify(c.slice(Math.max(0, i - 120), i + 80)));
  }
}
