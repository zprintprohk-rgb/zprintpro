// .hermes/logs/_diag-gradient.mjs
import fs from 'node:fs';
const s = fs.readFileSync('src/components/category/CategoryProductCard.tsx', 'utf8');
const L = s.split(/\r?\n/);
console.log(`檔案 ${L.length} 行`);
let grad = 0;
let bg = 0;
L.forEach((l, i) => {
  if (l.includes('gradient')) {
    grad++;
    console.log(`  [gradient] L${i + 1}: ${l.trim().slice(0, 110)}`);
  }
  if (l.includes('bgColor')) bg++;
});
console.log(`\ngradient 出現 ${grad} 行 ｜ bgColor 出現 ${bg} 行`);
console.log('\n=== L20-36 資料定義 ===');
L.slice(19, 36).forEach((l, i) => console.log(`  L${i + 20}: ${l.trim().slice(0, 120)}`));
