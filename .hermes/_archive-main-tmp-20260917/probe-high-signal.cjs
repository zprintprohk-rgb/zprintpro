#!/usr/bin/env node
/* 只读: 三个高信号命中取证 (假证号 FSC-C123456 / 电话数字位数 / 99.2% 达成率) */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\';
const cases = [
  ['src/data/blog-posts.ts', 1658, ['FSC-C123456', '99.2']],
  ['src/app/[locale]/contact/error.tsx', 90, ['198108851334', '19880851334']],
];
for (const [rel, ln, needles] of cases) {
  const p = ROOT + rel.replace(/\//g, '\\');
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  console.log(`\n=== ${rel} (共 ${lines.length} 行) ===`);
  const ctx = lines.slice(Math.max(0, ln - 3), ln + 2);
  ctx.forEach((l, i) => console.log(`  L${Math.max(1, ln - 2) + i}: ${l.trim().slice(0, 200)}`));
  // 全文件出现次数
  const raw = lines.join('\n');
  needles.forEach(n => console.log(`  「${n}」全文件出现 = ${raw.split(n).length - 1}`));
}
// 电话口径全站核对
const { execSync } = require('child_process');
const out = execSync('git grep -n "198108851334" -- src/', { cwd: ROOT, encoding: 'utf8' });
console.log('\n=== git grep 198108851334 (错号) ===');
console.log(out.trim() || '(无)');
