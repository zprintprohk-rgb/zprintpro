// 取证: products.ts 与 sku-seo-data.ts 的 slug 拼写差异 (fruit / small 两条)
const fs = require('node:fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const seo = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');

const grab = (src, re) => [...src.matchAll(re)].map((m) => m[1]);
console.log('products.ts 含 fruit  : ' + JSON.stringify(grab(prod, /slug: '([a-z0-9_-]*fruit[a-z0-9_-]*)'/g)));
console.log('sku-seo   含 fruit  : ' + JSON.stringify(grab(seo, /^ {2}"([a-z0-9_-]*fruit[a-z0-9_-]*)": \{$/gm)));
console.log('products.ts 含 small  : ' + JSON.stringify(grab(prod, /slug: '([a-z0-9_-]*small[a-z0-9_-]*)'/g)));
console.log('sku-seo   含 small  : ' + JSON.stringify(grab(seo, /^ {2}"([a-z0-9_-]*small[a-z0-9_-]*)": \{$/gm)));
console.log('\n⚠️ 若两处拼写相差 1 个字符 (如 - 与 _), 那个 SKU 的 SEO 数据在页面上就是**取不到**的 (getSkuSeo 按 slug 查)。');
