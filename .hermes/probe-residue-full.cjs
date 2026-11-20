#!/usr/bin/env node
/* 只读: 精确清点残留 —— (A) TS ja 段内 智印港 (B) CSV 各列 ZprintPro/智印港 混用 */
const fs = require('fs');
const tsPath = 'F:\\zprintpro-nextjs\\src\\data\\sku-seo-data.ts';
const csvPath = 'F:\\zprintpro-nextjs\\zprintpro-sku-seo-data.csv';

// --- A. TS ja 段 ---
const tsLines = fs.readFileSync(tsPath, 'utf8').split(/\r?\n/);
let cur = null, jaShown = 0, jaTotal = 0;
console.log('=== A. TS ja 段内 智印港 ===');
tsLines.forEach((l, i) => {
  const m = l.match(/"(zh-hk|en|ja)"\s*:\s*[{"\[]/);
  if (m) cur = m[1];
  if (cur === 'ja' && /智印港/.test(l)) {
    jaTotal++;
    if (jaShown < 10) { console.log(`L${i + 1}: ${l.trim().slice(0, 150)}`); jaShown++; }
  }
});
console.log('ja 段含智印港行数:', jaTotal);

// --- B. CSV 列级 ---
const csvLines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/).filter(l => l.trim());
const hdr = csvLines[0].split('\t');
console.log('\n=== B. CSV 列级品牌混用 ===');
const col = {};
csvLines.slice(1).forEach(l => {
  l.split('\t').forEach((c, i) => {
    const h = (hdr[i] || '?').trim();
    col[h] = col[h] || { z: 0, c: 0, dual: 0, dualSample: '', zSample: '' };
    const z = /ZprintPro/.test(c), cc = /智印港/.test(c);
    if (z) { col[h].z++; if (!col[h].zSample) col[h].zSample = c.slice(-90); }
    if (cc) col[h].c++;
    if (z && cc) { col[h].dual++; if (!col[h].dualSample) col[h].dualSample = c.slice(-90); }
  });
});
for (const [h, v] of Object.entries(col)) {
  const zh = /\(ZH\)/.test(h), en = /\(EN\)/.test(h), ja = /\(JA\)/.test(h);
  const bad = (zh && v.z) || (en && v.c) || (ja && v.c) || v.dual;
  if (v.z || v.c) console.log(`${bad ? '⚠' : ' '} ${h}: Z=${v.z} C=${v.c} dual=${v.dual} | ${v.dualSample || v.zSample}`);
}

// --- C. 形态清单 (处理 CRLF 干扰) ---
const raw = fs.readFileSync(csvPath, 'utf8').replace(/\r/g, '');
console.log('\n=== C. CSV 形态计数 (CRLF 归一后) ===');
[['智印港 ZprintPro', /智印港\s+ZprintPro/g], ['ZprintPro智印港', /ZprintPro\s*智印港/g],
 ['| ZprintPro', /\|\s*ZprintPro/g], ['ZprintPro 15+', /ZprintPro\s*15\+/g]]
  .forEach(([k, re]) => console.log(`${k}: ${(raw.match(re) || []).length}`));
