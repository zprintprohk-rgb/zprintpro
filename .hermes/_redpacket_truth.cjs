const fs = require('fs');
const p = fs.readFileSync('src/data/products.ts', 'utf8');
const pm = [...p.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => ({ s: m[1], o: m.index }));
for (const slug of ['foil-red-packets', 'custom-red-packets', 'embossed-red-packets', 'large-red-packets']) {
  const i = pm.findIndex(x => x.s === slug);
  if (i < 0) { console.log(slug, 'MISSING'); continue; }
  const seg = p.slice(pm[i].o, pm[i + 1] ? pm[i + 1].o : p.length);
  const g = (re) => (seg.match(re) || [])[1] || '';
  console.log(`\n${slug}: minQ=${g(/minQuantity: (\d+)/)} range=${g(/price_range: '([^']+)'/)}`);
  console.log('  desc:', g(/description: '([^']*)'/).slice(0, 170));
}
const t = fs.readFileSync('src/data/product-faqs.ts', 'utf8');
console.log('\nred-packet FAQs present:', ['foil-red-packets', 'custom-red-packets', 'embossed-red-packets', 'large-red-packets'].filter(s => t.includes(`'${s}': [`)).join(',') || '(none)');
