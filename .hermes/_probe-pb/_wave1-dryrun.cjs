'use strict';
/** 干跑 wave1 全部规则 (正则版, 顺序执行, 输出每条真实命中数) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const T = fs.readFileSync(path.join(__dirname, 'wave1-execute.cjs'), 'utf8');
const m = T.match(/const RULES = \[([\s\S]*?)\n\];/);
const F = {
  en: 'src/data/blog-data/en.json', ja: 'src/data/blog-data/ja.json',
  cat: 'src/data/category-seo-content.ts', sku: 'src/data/sku-seo-data.ts',
  buy: 'src/data/buying-guides.ts', bp: 'src/data/blog-posts.ts',
  catpage: 'src/app/[locale]/category/[slug]/page.tsx',
};
const src = {};
for (const k of Object.keys(F)) src[k] = fs.readFileSync(path.join(REPO, F[k]), 'utf8');
const RULES = eval('[' + m[1] + ']');
const out = { ...src };
let bad = 0;
RULES.forEach(([fk, oldS, newS, expect, note], i) => {
  // 独立口径: 对**原始**内容计数 (与执行器一致; 顺序仅用于替换)
  const n = (src[fk].match(new RegExp(oldS.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const ok = n === expect;
  if (!ok) bad++;
  console.log(`  ${ok ? '✅' : '❌'} [${String(i + 1).padStart(2)}] ${fk.padEnd(8)} 声明 ${String(expect).padStart(3)} 实得 ${String(n).padStart(3)}  「${oldS.slice(0, 40)}」  (${note})`);
  out[fk] = out[fk].split(oldS).join(newS);
});
console.log(`\n${bad ? '❌ 需修 ' + bad + ' 条' : '✅ 全部 ' + RULES.length + ' 条通过'}`);
// 改后重复自检
console.log('\n=== 改后重复自检 ===');
const DUP = ['certified certified', 'presses presses', 'FSC FSC-certified', 'paper certified', 'Answer nugget Answer', 'presses press'];
let dup = 0;
for (const fk of Object.keys(out)) DUP.forEach(d => { const n = out[fk].split(d).length - 1; if (n) { console.log(`  ❌ ${fk}: 「${d}」 × ${n}`); dup++; } });
if (!dup) console.log('  ✅ 无重复词');
