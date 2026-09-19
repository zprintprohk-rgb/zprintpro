// .hermes/logs/_diff-fallbacks.mjs — categoryFallbacks 差異明細
import fs from 'node:fs';

function ex(f) {
  const s = fs.readFileSync(f, 'utf8');
  const i = s.indexOf('categoryFallbacks');
  const eq = s.indexOf('=', i);
  const st = s.indexOf('{', eq);
  let d = 0;
  let j = st;
  for (; j < s.length; j++) {
    if (s[j] === '{') d++;
    else if (s[j] === '}') {
      d--;
      if (!d) break;
    }
  }
  return { body: s.slice(st, j + 1), full: s.slice(i, j + 1) };
}

const A = ex('src/components/category/CategoryProductCard.tsx');
const B = ex('src/components/product/ProductCard.tsx');

console.log(`A (CategoryProductCard) 原文長度 ${A.body.length}`);
console.log(`B (product/ProductCard)  原文長度 ${B.body.length}`);
console.log(`\n--- A 原文 ---\n${A.body}\n`);
console.log(`--- B 原文（前 1200 字）---\n${B.body.slice(0, 1200)}\n`);
