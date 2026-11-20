#!/usr/bin/env node
/* 只读: (a) CSZH 列内 ZprintPro 残留 (b) TS 派生文件 ZprintPro 残留 */
const fs = require('fs');
const p = 'F:\\zprintpro-nextjs\\zprintpro-sku-seo-data.csv';
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(l => l.trim());
const hdr = lines[0].split('\t');

const byCol = {};
lines.slice(1).forEach(l => {
  l.split('\t').forEach((c, i) => {
    const h = (hdr[i] || '?').trim();
    if (/\(ZH\)/.test(h) && /ZprintPro/.test(c)) {
      byCol[h] = byCol[h] || { n: 0, dual: 0, sample: '' };
      byCol[h].n++;
      if (/智印港/.test(c)) byCol[h].dual++;
      if (!byCol[h].sample) byCol[h].sample = c.slice(-120);
    }
  });
});
console.log('--- CSV ZH 列含 ZprintPro ---');
for (const [h, v] of Object.entries(byCol)) console.log(`${h}: ${v.n} cells (其中同格含智印港 ${v.dual})\n   尾部样本: ${v.sample}`);

console.log('\n--- 全 CSV 形态计数 ---');
const raw = fs.readFileSync(p, 'utf8');
const forms = {
  '智印港 ZprintPro': /智印港\s+ZprintPro/g,
  'ZprintPro智印港(无分隔)': /ZprintPro\s*智印港(?!\s)/g,
  '| ZprintPro': /\|\s*ZprintPro/g,
  'ZprintPro |': /ZprintPro\s*\|/g,
  'ZprintPro 总': /ZprintPro/g,
};
for (const [k, re] of Object.entries(forms)) console.log(`${k}: ${(raw.match(re) || []).length}`);

console.log('\n--- TS 派生文件 ---');
const ts = fs.readFileSync('F:\\zprintpro-nextjs\\src\\data\\sku-seo-data.ts', 'utf8');
const tsForms = {
  'ZprintPro智印港': /ZprintPro\s*智印港/g,
  '智印港 ZprintPro': /智印港\s+ZprintPro/g,
  'ZprintPro 总': /ZprintPro/g,
  '智印港 总': /智印港/g,
};
for (const [k, re] of Object.entries(tsForms)) console.log(`${k}: ${(ts.match(re) || []).length}`);
