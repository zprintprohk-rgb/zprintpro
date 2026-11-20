#!/usr/bin/env node
/* 只读: sku-seo-data.ts 结构 + ZprintPro 分布 (按字段名) */
const fs = require('fs');
const ts = fs.readFileSync('F:\\zprintpro-nextjs\\src\\data\\sku-seo-data.ts', 'utf8');
const lines = ts.split(/\r?\n/);
console.log('总行数:', lines.length);

// 字段名直方图 (key: "value")
const fieldHits = {};
lines.forEach((l, i) => {
  const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:/);
  if (!m) return;
  const key = m[1];
  fieldHits[key] = fieldHits[key] || { n: 0, z: 0, c: 0 };
  fieldHits[key].n++;
  fieldHits[key].z += (l.match(/ZprintPro/g) || []).length;
  fieldHits[key].c += (l.match(/智印港/g) || []).length;
});
console.log('--- 字段: 行数 / ZprintPro / 智印港 ---');
for (const [k, v] of Object.entries(fieldHits)) {
  if (v.z || v.c) console.log(`${k}: lines=${v.n} Z=${v.z} C=${v.c}`);
}
console.log('\n--- 顶层导出名 ---');
console.log(lines.filter(l => /^export/.test(l)).join('\n'));
console.log('\n--- ZprintPro 行样本 (前 4) ---');
let n = 0;
lines.forEach((l, i) => { if (/ZprintPro/.test(l) && n < 4) { console.log(`L${i + 1}: ${l.trim().slice(0, 180)}`); n++; } });
