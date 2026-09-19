// moq10-find-seo-cat.ts — 列出 seo.ts 內騎馬釘/校園品類級的 MOQ 宣稱
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const lines = fs.readFileSync(path.join(ROOT, 'src/lib/seo.ts'), 'utf-8').split('\n');

console.log('=== seo.ts 內 50本起/100本起/500+ 相關行 ===');
lines.forEach((l, i) => {
  if (!/(50\s*本起|100\s*本起|500\s*本起|MOQ 100|MOQ 50|500\+)/.test(l)) return;
  console.log(`L${i + 1}: ${l.trim().slice(0, 220)}`);
});

console.log('\n=== products.ts 內 「vs Alibaba」段 ===');
const pl = fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf-8').split('\n');
pl.forEach((l, i) => {
  if (l.includes('vs Alibaba') || l.includes('MOQ 100 本')) console.log(`L${i + 1}: ${l.trim().slice(0, 240)}`);
});
