const fs = require('fs');
const p = fs.readFileSync('src/data/products.ts', 'utf8');
const pm = [...p.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => ({ s: m[1], o: m.index }));
const T = ['transparent-stickers', 'removable-stickers', 'foil-stickers', 'security-stickers', 'a4-flyers', 'a5-flyers', 'wall-calendars'];
for (const slug of T) {
  const idx = pm.findIndex(x => x.s === slug);
  if (idx < 0) { console.log(slug, 'MISSING'); continue; }
  const seg = p.slice(pm[idx].o, pm[idx + 1] ? pm[idx + 1].o : p.length);
  const g = (re) => (seg.match(re) || [])[1] || '';
  console.log(`\n### ${slug}`);
  console.log('  minQ:', g(/minQuantity: (\d+)/), '| base:', g(/basePrice: ([\d.]+)/), '| baseEn:', g(/basePrice_en: ([\d.]+)/), '| range:', g(/price_range: '([^']+)'/));
  console.log('  title_zh:', g(/title_zh: '([^']*)'/).slice(0, 80));
  console.log('  desc:', g(/description: '([^']*)'/).slice(0, 190));
}
