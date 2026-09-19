// .hermes/logs/_verify-fallbacks-equivalence.mjs — categoryFallbacks 三份等價性驗證
import fs from 'node:fs';

const FILES = [
  'src/components/category/CategoryProductCard.tsx',
  'src/components/product/ProductCard.tsx',
  'src/components/ProductCard.tsx',
];

/** 抽出 `const categoryFallbacks ... = {` 的完整物件原文 */
function extract(file) {
  const src = fs.readFileSync(file, 'utf8');
  const i = src.indexOf('categoryFallbacks');
  if (i < 0) return null;
  const eq = src.indexOf('=', i);
  const start = src.indexOf('{', eq);
  let depth = 0;
  let j = start;
  for (; j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  return { body: src.slice(start, j + 1), decl: src.slice(i - 20, j + 1).trim().slice(0, 60) };
}

const out = FILES.map((f) => ({ file: f, data: extract(f) }));
for (const o of out) {
  if (!o.data) {
    console.log(`  🔴 ${o.file}: 找不到 categoryFallbacks`);
    continue;
  }
  const keys = [...o.data.body.matchAll(/'([a-z-]+)':\s*\{/g)].map((m) => m[1]);
  console.log(`  ${o.file}`);
  console.log(`      鍵數 ${keys.length}: ${keys.slice(0, 6).join(', ')}…`);
  console.log(`      長度 ${o.data.body.length}`);
}

console.log('\n=== 逐對比對（去空白後的字面比較）===');
const norm = (s) => s.replace(/\s+/g, '');
let allSame = true;
for (let i = 1; i < out.length; i++) {
  if (!out[0].data || !out[i].data) continue;
  const same = norm(out[0].data.body) === norm(out[i].data.body);
  if (!same) allSame = false;
  console.log(`  ${same ? '✓ 相同' : '🔴 不同'}  ${out[0].file} vs ${out[i].file}`);
}
console.log(allSame ? '\n✅ 三份完全等價 → 可零風險收斂' : '\n🔴 有差異 → 收斂前需先對齊');
