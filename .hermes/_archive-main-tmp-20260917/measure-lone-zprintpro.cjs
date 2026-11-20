#!/usr/bin/env node
/* 只读: (a) CSV 是否含 "15+ 年自有品牌" (b) TS zh-hk 段内孤立 ZprintPro 计数 (报告项, 本批不动) */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\';
const csv = fs.readFileSync(ROOT + 'zprintpro-sku-seo-data.csv', 'utf8');
console.log('CSV "15+ 年自有品牌" =', csv.split('15+ 年自有品牌').length - 1);
console.log('CSV "ZprintPro 15+" =', csv.split('ZprintPro 15+').length - 1);

const ts = fs.readFileSync(ROOT + 'src\\data\\sku-seo-data.ts', 'utf8');
const lines = ts.split(/\r?\n/);
let cur = null;
const lone = { 'zh-hk': 0, en: 0, ja: 0 };
const samples = [];
lines.forEach((l, i) => {
  const m = l.match(/"(zh-hk|en|ja)"\s*:\s*[{"\[]/);
  if (m) cur = m[1];
  if (!cur) return;
  const n = (l.match(/ZprintPro/g) || []).length;
  if (n && !/ジープリント\s*ZprintPro|智印港\s*ZprintPro/.test(l)) {
    lone[cur] += n;
    if (cur === 'zh-hk' && samples.length < 12) samples.push(`L${i + 1}: ${l.trim().slice(0, 130)}`);
  }
});
console.log('\nTS 各 locale 段内「孤立 ZprintPro」(非双品牌形态) =', JSON.stringify(lone));
console.log('--- zh-hk 段内样本 (本批未动, 待 K3 定窗口) ---');
samples.forEach(s => console.log('  ' + s));
