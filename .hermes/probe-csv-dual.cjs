#!/usr/bin/env node
/* 只读: 定位 CSV 中 "同格双品牌" / "ZH 列含 ZprintPro" 的真实位置 */
const fs = require('fs');
const p = 'F:\\zprintpro-nextjs\\zprintpro-sku-seo-data.csv';
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(l => l.trim());
const hdr = lines[0].split('\t');
console.log('header cells:', hdr.length);
const cellCounts = {};
lines.slice(1).forEach(l => {
  const n = l.split('\t').length;
  cellCounts[n] = (cellCounts[n] || 0) + 1;
});
console.log('data row cell-count histogram:', JSON.stringify(cellCounts));

let shown = 0;
lines.slice(1).forEach((l, li) => {
  const cells = l.split('\t');
  cells.forEach((c, i) => {
    if (/ZprintPro/.test(c) && /智印港/.test(c)) {
      if (shown < 6) {
        console.log(`row${li + 2} cell${i} hdr="${(hdr[i] || '?').trim()}" nCells=${cells.length}`);
        console.log('   ', c.slice(0, 200));
      }
      shown++;
    }
  });
});
console.log('同格双品牌 cells:', shown);
