// .hermes/_doujin_price.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const i = t.indexOf('"doujinshi-printing"');
console.log('block at', i);
if (i > 0) {
  const seg = t.slice(i, i + 1600);
  const nums = [...new Set([...seg.matchAll(/¥\s?[\d,]+/g)].map(m => m[0]))];
  console.log('JPY claims:', nums.slice(0, 8).join(' | '));
  console.log('head:', JSON.stringify(seg.slice(0, 200)));
}
// 站内所有出现 ¥7,500 的位置
for (const f of ['src/data/blog-data/ja.json', 'src/data/products.ts', 'src/data/sku-seo-data.ts', 'src/data/product-faqs.ts']) {
  const c = fs.readFileSync(f, 'utf8');
  const n = (c.match(/7,?500/g) || []).length;
  if (n) console.log(f, '7,500 hits:', n);
}
