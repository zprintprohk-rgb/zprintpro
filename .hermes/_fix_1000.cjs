// .hermes/_fix_1000.cjs
const fs = require('fs');
const p = 'src/data/sku-seo-data.ts';
let t = fs.readFileSync(p, 'utf8');
const bad = '直答：300 個起印、HK$1.5-1000/個，1 小時內免費數碼打稿，30 秒 AI 報價即時出價。';
const n = t.split(bad).length - 1;
if (n) {
  t = t.split(bad).join('');
  fs.writeFileSync(p, t, 'utf8');
}
console.log('removed', n, '| residual', (t.match(/HK\$1\.5-1000/g) || []).length);
