const fs = require('fs');
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/products-content.ts', 'utf8');
const lines = t.split(/\r?\n/);
const flyers = ['a4-flyers','a5-flyers','double-sided-flyers','folded-leaflets','thick-paper-flyers','eco-flyers','same-day-flyers','school-flyers'];
let cur = '?';
const faqLines = [];
const flyerSlugLines = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^  '([a-z0-9-]+)': \{/);
  if (m) { cur = m[1]; if (flyers.includes(cur)) flyerSlugLines.push(`${cur} @ L${i + 1}`); }
  if (lines[i].includes('支援哪些材質和工藝')) faqLines.push(`${cur} L${i + 1}`);
}
console.log('=== flyer 家族在 products-content.ts 的位置 ===');
console.log(flyerSlugLines.join('\n'));
console.log('\n=== 含通用 FAQ 的 slug 数 ===');
const cnt = {};
for (const f of faqLines) { const s = f.split(' ')[0]; cnt[s] = (cnt[s] || 0) + 1; }
console.log('FAQ 出现产品数:', Object.keys(cnt).length);
console.log('\n=== flyer 家族是否含 FAQ ===');
for (const s of flyers) console.log(`${s}: ${faqLines.some((f) => f.startsWith(s)) ? '含FAQ' : '无'}`);
