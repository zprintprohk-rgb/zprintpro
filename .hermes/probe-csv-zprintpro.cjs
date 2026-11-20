#!/usr/bin/env node
/* 只读: 查 CSV 内 ZprintPro 分布, 定位残留是否合法 */
const fs = require('fs');
const p = 'F:\\zprintpro-nextjs\\zprintpro-sku-seo-data.csv';
const raw = fs.readFileSync(p, 'utf8');
const lines = raw.split(/\r?\n/);
console.log('总行数(含空):', lines.length);
console.log('表头:', lines[0]);
console.log('列数:', lines[0].split(',').length);

let withZ = 0, dual = 0, totalZ = 0;
const samples = [];
lines.forEach((l, i) => {
  if (i === 0 || !l.trim()) return;
  const z = (l.match(/ZprintPro/g) || []).length;
  if (z) { withZ++; totalZ += z; }
  if (/智印港\s*ZprintPro/.test(l)) dual++;
  if (z >= 3 && samples.length < 5) samples.push(`L${i + 1} z=${z} :: ${l.slice(0, 300)}`);
});
console.log('含 ZprintPro 行数:', withZ, '| ZprintPro 总出现:', totalZ, '| 双品牌行:', dual);
console.log('--- 高密度样本 ---');
samples.forEach(s => console.log(s));

// 列级统计
const hdr = lines[0].split(',');
const perCol = hdr.map(() => 0);
lines.slice(1).forEach(l => {
  if (!l.trim()) return;
  const cells = l.split(',');
  cells.forEach((c, idx) => { if (idx < perCol.length) perCol[idx] += (c.match(/ZprintPro/g) || []).length; });
});
console.log('--- 列级 ZprintPro 分布 ---');
hdr.forEach((h, i) => { if (perCol[i]) console.log(`col${i} ${h.trim()}: ${perCol[i]}`); });
