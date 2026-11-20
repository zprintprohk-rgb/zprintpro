const fs = require('fs');
const p = fs.readFileSync('src/data/products.ts', 'utf8');
const pm = [...p.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => ({ s: m[1], o: m.index }));
const T = ['food-boxes', 'folding-boxes', 'mailer-boxes', 'cosmetic-boxes', 'rigid-boxes', 'kraft-paper-bags', 'white-card-bags', 'gift-bags', 'magnetic-closure-boxes'];
for (const slug of T) {
  const i = pm.findIndex(x => x.s === slug);
  if (i < 0) { console.log(slug, 'MISSING'); continue; }
  const seg = p.slice(pm[i].o, pm[i + 1] ? pm[i + 1].o : p.length);
  const g = (re) => (seg.match(re) || [])[1] || '';
  console.log(`${slug}: minQ=${g(/minQuantity: (\d+)/)} range=${g(/price_range: '([^']+)'/)}`);
}
