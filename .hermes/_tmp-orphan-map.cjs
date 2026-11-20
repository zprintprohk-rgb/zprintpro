// 取证: 孤儿 sku-seo 条目在产品层的对应关系 (按中文名定位真实 slug)
const fs = require('node:fs');
const s = fs.readFileSync('src/data/products.ts', 'utf8');
const idx = [...s.matchAll(/^ {4}slug: '([a-z0-9-]+)',$/gm)].map((m) => ({ slug: m[1], i: m.index }));
idx.push({ slug: '__END__', i: s.length });

const NEEDLES = ['小號紙袋', '同人誌', '亞克力', '襟章', '明信片', '環保袋', '水果'];
for (const n of NEEDLES) {
  const found = [];
  for (let k = 0; k < idx.length - 1; k++) {
    const seg = s.slice(idx[k].i, idx[k + 1].i);
    if (seg.includes(n)) found.push(idx[k].slug);
  }
  console.log(`${n.padEnd(6)} → products.ts 真实 slug: ${found.length ? found.join(', ') : '(无任何 SKU 含此名)'}`);
}
