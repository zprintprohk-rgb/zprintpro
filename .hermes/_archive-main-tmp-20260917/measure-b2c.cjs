#!/usr/bin/env node
/* 只读: 三条精确 pattern 的计数 (B2c 基准) */
const fs = require('fs');
const F = 'F:\\zprintpro-main-tmp\\src\\data\\blog-data\\zh-hk.json';
const raw = fs.readFileSync(F, 'utf8');
const PATS = [
  ['智印港 ZprintPro 首頁', /智印港 ZprintPro 首頁/g],
  ['智印港 ZprintPro 跨境印刷 SaaS', /智印港 ZprintPro 跨境印刷 SaaS/g],
  ['智印港 ZprintPro 印刷規格指南', /智印港 ZprintPro 印刷規格指南/g],
];
let sum = 0;
for (const [k, re] of PATS) { const n = (raw.match(re) || []).length; sum += n; console.log(`${k}: ${n}`); }
console.log('合计:', sum);
// 安全断言: 这些 pattern 是否出现在 title/headline/h1 语境
const hl = raw.split('\\"headline\\":\\"').slice(1).map(s => s.slice(0, 400));
const h1 = [...raw.matchAll(/<h1>([^<]{0,300})<\/h1>/g)].map(m => m[1]);
for (const [k, re] of PATS) {
  const inHl = hl.filter(s => re.test(s)).length;
  const inH1 = h1.filter(s => re.test(s)).length;
  console.log(`  ${k}: 出现在 headline=${inHl} h1=${inH1}`);
}
