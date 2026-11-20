// .hermes/_read_b4.cjs
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const p = j['cny-2027-red-packet-printing-guide'];
const c = p.content;
console.log('title:', p.title);
console.log('len:', c.length, 'h2:', (c.match(/<h2/g) || []).length, 'links:', new Set([...c.matchAll(/href="([^"]+)"/g)].map(m => m[1])).size);
console.log('h2s:', JSON.stringify([...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, ''))));
console.log('head 400:', c.slice(0, 400));
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const pm = [...prod.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => ({ s: m[1], o: m.index }));
pm.filter(x => /red-packet/.test(x.s)).forEach(x => {
  const i = pm.findIndex(y => y.s === x.s);
  const seg = prod.slice(x.o, pm[i + 1] ? pm[i + 1].o : prod.length);
  console.log('SKU', x.s, (seg.match(/minQuantity: (\d+)/) || [])[1], (seg.match(/price_range: '([^']+)'/) || [])[1]);
});
