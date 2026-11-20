// .hermes/_foodbox_meta.cjs — 找 food-boxes 的 meta description 来源（两层：products.ts / sku-seo-data.ts）
const fs = require('fs');
const p = fs.readFileSync('src/data/products.ts', 'utf8');
const pm = [...p.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => ({ s: m[1], o: m.index }));
const x = pm.find(y => y.s === 'food-boxes');
const i = pm.indexOf(x);
const seg = p.slice(x.o, pm[i + 1] ? pm[i + 1].o : p.length);
const desc = (seg.match(/description: '([^']*)'/) || [])[1] || '';
console.log('products.ts food-boxes description len:', desc.length);
console.log('  ', desc.slice(0, 300));
console.log('  title_zh:', (seg.match(/title_zh: '([^']*)'/) || [])[1]);

const ss = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const k = ss.indexOf('"food-boxes"');
const b = ss.slice(k, k + 2600);
const d = b.match(/"zh-hk": \{[\s\S]{0,300}?"description": "((?:[^"\\]|\\.)*)"/);
console.log('\nsku-seo zh description:', d ? d[1].slice(0, 300) : 'n/a');
// 检查 1 小时免费打稿 / 免费刀模 是否站内已有真值表述
for (const kw of ['免費數碼打稿', '免費刀模', '1 小時內免費', '3-5 個工作天']) {
  console.log(kw, '→ products:', p.includes(kw), '| seo:', ss.includes(kw));
}
