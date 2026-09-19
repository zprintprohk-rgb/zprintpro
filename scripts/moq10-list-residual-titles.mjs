// moq10-list-residual-titles.mjs — 列出 sku-seo-data 剩餘 title/desc 的 100起印 屬哪個品類
import fs from 'fs';
const s = fs.readFileSync('src/data/sku-seo-data.ts', 'utf-8');
const lines = s.split('\n');
let cur = '';
lines.forEach((l, i) => {
  const t = l.match(/"title": "([^"]{0,80})/);
  if (t) cur = t[1];
  if (!/100\s*張起印|100張起印|100起印/.test(l)) return;
  if (l.includes('收費透明')) return;
  console.log(`L${i + 1} [${l.includes('"title"') ? 'title' : l.includes('"description"') ? 'desc' : 'body'}] ${l.trim().slice(0, 135)}`);
});
