#!/usr/bin/env node
/* 只读: blog-data 内 (a) FSC-C123456 全量上下文 (b) zh-hk 字段简体字命中上下文 */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\src\\data\\blog-data\\';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const raw = fs.readFileSync(ROOT + loc + '.json', 'utf8');
  const fsc = (raw.match(/FSC[-\s]?C123456/g) || []);
  if (fsc.length) {
    console.log(`\n=== ${loc}.json FSC-C123456 ×${fsc.length} ===`);
    let idx = -1; const re = /FSC[-\s]?C123456/g;
    while ((idx = re.exec(raw)) !== null) console.log(`  …${raw.slice(Math.max(0, idx.index - 70), idx.index + 40).replace(/\s+/g, ' ')}…`);
  }
}
// zh-hk 简体字
const zh = fs.readFileSync(ROOT + 'zh-hk.json', 'utf8');
const SIMP = /[复电业为发这们个时来会说过对开现应学页]/g;
console.log('\n=== zh-hk.json 简体字命中 ===');
let m; const re2 = new RegExp(SIMP.source, 'g');
while ((m = re2.exec(zh)) !== null) {
  console.log(`  [${m[0]}] …${zh.slice(Math.max(0, m.index - 60), m.index + 40).replace(/\s+/g, ' ')}…`);
}
// 重复品牌
console.log('\n=== 重复品牌 ZprintPro (ZprintPro) ===');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const raw = fs.readFileSync(ROOT + loc + '.json', 'utf8');
  const n = (raw.match(/ZprintPro\s*\(ZprintPro\)/g) || []).length;
  if (n) console.log(`  ${loc}.json ×${n}`);
}
