const fs = require('fs');
const p = fs.readFileSync('src/data/products.ts', 'utf8');
const pm = [...p.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => ({ s: m[1], o: m.index }));
for (const x of pm.filter(y => /poster|sticker|card/.test(y.s)).slice(0, 12)) {
  const i = pm.findIndex(y => y.s === x.s);
  const seg = p.slice(x.o, pm[i + 1] ? pm[i + 1].o : p.length);
  console.log(x.s, '| minQ', (seg.match(/minQuantity: (\d+)/) || [])[1], '|', (seg.match(/price_range: '([^']+)'/) || [])[1]);
}
