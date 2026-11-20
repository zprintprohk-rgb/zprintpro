// .hermes/_verify_foodbox_after.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const i = t.indexOf('"food-boxes": {');
const blk = t.slice(i, t.indexOf('\n  "', i + 5));
function seoDesc(b, loc) {
  const si = b.indexOf('"seo": {');
  const seg0 = b.slice(si);
  const k = seg0.indexOf(`"${loc}": {`);
  const seg = seg0.slice(k, k + 2000);
  const m = seg.match(/"description": "((?:[^"\\]|\\.)*)"/);
  return m ? m[1].replace(/\\"/g, '"') : '';
}
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = seoDesc(blk, loc);
  console.log(`\n[${loc}] len=${d.length}`);
  console.log(d);
}
const body = (blk.match(/"body": "((?:[^"\\]|\\.)*)"/) || [])[1] || '';
console.log('\nbody len:', body.length, '| C109:', (body.match(/C109/g) || []).length, '| C107:', (body.match(/C107/g) || []).length);
console.log('desc 简体残留 月饼:', /月饼/.test(blk), '| 2 小時打稿:', /2 小時打稿/.test(blk));
