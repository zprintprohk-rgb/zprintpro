#!/usr/bin/env node
/* 只读: 从清单里出 形态 × 文件 矩阵 + 关键形态样本 */
const fs = require('fs');
const M = JSON.parse(fs.readFileSync('F:\\zprintpro-nextjs\\.hermes\\dual-brand-nontitle.json', 'utf8'));
const body = M.items.filter(x => x.face === 'body');

const matrix = {};
for (const x of body) {
  matrix[x.file] = matrix[x.file] || {};
  matrix[x.file][x.form] = (matrix[x.file][x.form] || 0) + 1;
}
console.log('--- 文件 × 形态 (非 title 面) ---');
Object.entries(matrix).sort((a, b) => {
  const s = o => Object.values(o[1]).reduce((p, c) => p + c, 0);
  return s(b) - s(a);
}).forEach(([f, forms]) => console.log(`  ${f}: ${JSON.stringify(forms)}`));

for (const form of ['ジープリント ZprintPro', 'ZprintPro 智印港', '智印港 ZprintPro']) {
  console.log(`\n=== 形态「${form}」样本 (最多 10) ===`);
  body.filter(x => x.form === form).slice(0, 10).forEach(x => console.log(`  ${x.file}:${x.line}  …${x.ctx}…`));
}
