#!/usr/bin/env node
/* 只读: 数据层 ①②③ 目标精确计数 (写前基准, per §0.26.9 先定基准) */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\';
const ts = fs.readFileSync(ROOT + 'src\\data\\sku-seo-data.ts', 'utf8');
const pr = fs.readFileSync(ROOT + 'src\\data\\products.ts', 'utf8');
const csvRaw = fs.readFileSync(ROOT + 'zprintpro-sku-seo-data.csv', 'utf8');

const c = (s, needle) => s.split(needle).length - 1;
console.log('=== ③ sku-seo-data.ts ===');
console.log('  "ZprintPro 15+ 年自有品牌" =', c(ts, 'ZprintPro 15+ 年自有品牌'));
console.log('  "智印港 15+ 年自有品牌"   =', c(ts, '智印港 15+ 年自有品牌'));
console.log('  "ZprintPro 15+"           =', c(ts, 'ZprintPro 15+'));

console.log('\n=== ② products.ts ===');
console.log('  "ZprintPro智印港" =', c(pr, 'ZprintPro智印港'));
console.log('  "智印港 ZprintPro" =', c(pr, '智印港 ZprintPro'));
const lines = pr.split(/\r?\n/);
lines.forEach((l, i) => { if (/ZprintPro智印港/.test(l)) console.log(`   L${i + 1}: ${l.trim().slice(0, 140)}`); });

console.log('\n=== ① CSV (TSV, 列感知) ===');
const csvLines = csvRaw.replace(/\r/g, '').split('\n').filter(l => l.trim());
const hdr = csvLines[0].split('\t');
const cols = { alt: hdr.indexOf('图片Alt标签(ZH)'), title: hdr.indexOf('SEO标题(ZH)'), desc: hdr.indexOf('SEO描述(ZH)'), body: hdr.indexOf('正文内容优化(ZH)') };
console.log('  列索引:', JSON.stringify(cols), '总列', hdr.length);
const stat = { alt: 0, title: 0, desc: 0, body: 0, altForm: {}, titleForm: {} };
csvLines.slice(1).forEach(l => {
  const cells = l.split('\t');
  const a = cells[cols.alt] || '', t = cells[cols.title] || '', d = cells[cols.desc] || '', b = cells[cols.body] || '';
  if (/ZprintPro/.test(a)) { stat.alt++; const f = a.slice(a.lastIndexOf('|') + 1).trim(); stat.altForm[f] = (stat.altForm[f] || 0) + 1; }
  if (/ZprintPro/.test(t)) { stat.title++; const f = t.slice(t.lastIndexOf('|') + 1).trim(); stat.titleForm[f] = (stat.titleForm[f] || 0) + 1; }
  if (/ZprintPro/.test(d)) stat.desc++;
  if (/ZprintPro/.test(b)) stat.body++;
});
console.log('  图片Alt标签(ZH) 含 ZprintPro 格数 =', stat.alt, JSON.stringify(stat.altForm));
console.log('  SEO标题(ZH) 含 ZprintPro 格数     =', stat.title, JSON.stringify(stat.titleForm));
console.log('  SEO描述(ZH) 含 ZprintPro 格数     =', stat.desc);
console.log('  正文内容优化(ZH) 含 ZprintPro 格数 =', stat.body);
// 样本
csvLines.slice(1).forEach((l, i) => {
  const cells = l.split('\t');
  if (/ZprintPro/.test(cells[cols.title] || '') && i < 3) {
    console.log(`   [row${i + 2}] title=${(cells[cols.title] || '').slice(0, 60)} | desc=${(cells[cols.desc] || '').slice(0, 50)} | body尾=${(cells[cols.body] || '').slice(-40)}`);
  }
});
