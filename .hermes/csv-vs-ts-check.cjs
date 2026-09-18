/** 只读: CSV 源头 vs 派生 .ts 的 meta 一致性 (判断重生成是否安全) */
const fs = require('fs');
const csv = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8');
const lines = csv.split(/\r?\n/).filter((l) => l.trim());
console.log('CSV 行数: ' + lines.length);
const hdr = lines[0].split(',');
console.log('CSV 表头 (' + hdr.length + ' 列):');
hdr.forEach((h, i) => console.log('  [' + i + '] ' + h));
const row = lines.find((l) => l.includes('saddle-stitch-booklets'));
console.log('\nBK-002 行存在: ' + !!row);
if (row) {
  // 简易 CSV 解析 (含引号)
  const cols = [];
  let cur = '', q = false;
  for (let i = 0; i < row.length; i++) {
    const c = row[i];
    if (c === '"') { q = !q; continue; }
    if (c === ',' && !q) { cols.push(cur); cur = ''; continue; }
    cur += c;
  }
  cols.push(cur);
  cols.forEach((v, i) => {
    const flag = /50 本起|50本起|重複|重複詞/.test(v) ? ' ★含50本起' : '';
    console.log('  [' + i + '] ' + (hdr[i] || '?') + ' = ' + v.slice(0, 130) + flag);
  });
}
// 重复词 bug 是否源于 CSV
console.log('\n=== CSV 中是否存在首词重复 "A/A" ===');
const dup = [];
for (const l of lines.slice(1)) {
  const m = l.match(/([\u4e00-\u9fff]{2,10})\/\1/);
  if (m) dup.push(m[1] + '/' + m[1]);
}
console.log('  CSV 内重复词命中: ' + dup.length + (dup.length ? ' → ' + [...new Set(dup)].slice(0, 8).join(', ') : ''));
// 派生 .ts 中的重复词
const ts = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const dupTs = [];
for (const m of ts.matchAll(/([\u4e00-\u9fff]{2,10})\/\1/g)) dupTs.push(m[1]);
console.log('  .ts 内重复词命中: ' + dupTs.length + ' → ' + [...new Set(dupTs)].slice(0, 10).join(', '));
