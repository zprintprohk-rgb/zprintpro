// .hermes/_foodbox_desc3.cjs
const fs = require('fs');
const ss = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const k = ss.indexOf('"food-boxes"');
const blk = ss.slice(k, k + 8000);
for (const loc of ['zh-hk', 'en', 'ja']) {
  const i = blk.indexOf(`"${loc}"`);
  const seg = blk.slice(i, i + 2000);
  const m = seg.match(/"description": "((?:[^"\\]|\\.)*)"/);
  const d = m ? m[1] : '';
  console.log(`\n=== ${loc} len=${d.length}`);
  console.log(d);
  const simp = (d.match(/[月饼龙发这个们时来会对开关内种实车东马]/g) || []);
  if (simp.length) console.log('  简体嫌疑:', [...new Set(simp)].join(''));
}
