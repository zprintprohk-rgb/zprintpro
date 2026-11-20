const fs = require('fs');
const CAND = ['comiket-printing-prep-guide', 'print-specifications-reference-guide-2026', 'foil-stamping-3-applications-2026', 'zine-small-batch-booklet-printing-guide'];
for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  console.log(loc, '->', CAND.filter(s => j[s]).join(', ') || '(none)');
}
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const ps = [...prod.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => m[1]);
console.log('products:', ['doujinshi-printing', 'saddle-stitch-booklets', 'perfect-bound-books', 'die-cut-stickers', 'foil-stickers', 'waterproof-stickers'].map(s => `${s}:${ps.includes(s)}`).join(' '));
// doujinshi-printing 的 sku-seo 三语价格口径
const ss = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const i = ss.indexOf('"doujinshi-printing"');
const seg = ss.slice(i, i + 9000);
for (const loc of ['zh-hk', 'en', 'ja']) {
  const k = seg.indexOf(`"${loc}"`);
  const seg2 = seg.slice(k, k + 2500);
  const pr = [...new Set([...seg2.matchAll(/(¥\s?[\d,]+|HK\$[\d.,-]+)/g)].map(m => m[1]))];
  console.log(`sku-seo ${loc} prices:`, pr.slice(0, 4).join(' | '));
}
