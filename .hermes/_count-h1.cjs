const { skuSeoData } = require('../src/data/sku-seo-data.ts');
let n = 0; const empty = [];
for (const [slug, d] of Object.entries(skuSeoData)) {
  for (const L of ['zh-hk', 'en', 'ja']) {
    const h = d && d.seo && d.seo[L] && d.seo[L].h1;
    if (h && h.trim()) n++; else empty.push(slug + '|' + L);
  }
}
console.log('sku h1 非空:', n, '/300');
console.log('h1 空槽:', empty.length);
console.log(empty.slice(0, 12).join(', '));
