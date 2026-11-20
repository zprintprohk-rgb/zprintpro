const fs = require('fs');
const p = fs.readFileSync('src/data/products.ts', 'utf8');
for (const slug of ['wall-calendars', 'desk-calendars']) {
  const i = p.indexOf(`slug: '${slug}'`);
  if (i < 0) { console.log(slug, 'MISSING'); continue; }
  const j = p.indexOf("slug: '", i + 10);
  const seg = p.slice(i, j > 0 ? j : p.length);
  const g = (re) => (seg.match(re) || [])[1] || '';
  console.log(`\n### ${slug}`);
  console.log('  minQ', g(/minQuantity: (\d+)/), '| base', g(/basePrice: ([\d.]+)/), '| range', g(/price_range: '([^']+)'/));
  console.log('  title:', g(/title_zh: '([^']*)'/).slice(0, 80));
  console.log('  desc:', g(/description: '([^']*)'/).slice(0, 200));
}
