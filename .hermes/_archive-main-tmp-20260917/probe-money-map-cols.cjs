#!/usr/bin/env node
/* 只读: 打印带钱词地图前几行的原始字段 (定位 landing page 列位置) */
const fs = require('fs');
const M = 'F:\\zprintpro-nextjs\\重要文件\\money-keyword-map-20260905.md';
const lines = fs.readFileSync(M, 'utf8').split(/\r?\n/);
let shown = 0;
lines.forEach((l, i) => {
  if (!l.trim().startsWith('|')) return;
  if (shown >= 6) return;
  const c = l.split('|').map(x => x.trim());
  console.log(`L${i + 1} 列数=${c.length}: ${JSON.stringify(c.slice(1, 11))}`);
  shown++;
});
// 表头行
const hdr = lines.find(l => l.includes('关键词') && l.includes('市场'));
console.log('\n表头:', hdr);
