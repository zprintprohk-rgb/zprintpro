// .hermes/_verify_cluster8.cjs
const fs = require('fs');
const s = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const i = s.indexOf('"mailer-boxes": {');
const seg = s.slice(i, i + 6000);
const hits = [...seg.matchAll(/7-10/g)].map(m => seg.slice(Math.max(0, m.index - 70), m.index + 40).replace(/\n/g, ' '));
console.log('mailer block 7-10:', hits.length);
hits.forEach(h => console.log('  •', JSON.stringify(h.slice(0, 130))));

const c = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
console.log('\neducational ja snippet 现况:');
const k = c.indexOf('教科書 印刷 100本から');
console.log(JSON.stringify(c.slice(k, k + 200)));
console.log('KPI 黑话 residual (9/4 ja CTR):', (c.match(/9\/4 ja CTR/g) || []).length);
console.log('HK$28 residual in seo:', (c.match(/HK\$28/g) || []).length);
