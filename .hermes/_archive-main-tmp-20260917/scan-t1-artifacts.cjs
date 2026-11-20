#!/usr/bin/env node
/* 只读: T1 后畸形扫描 (相邻重复品牌 / 括注残留) + en.json 具体行 */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\';
for (const f of ['zh-hk', 'ja', 'en']) {
  const p = ROOT + `src\\data\\blog-data\\${f}.json`;
  const raw = fs.readFileSync(p, 'utf8');
  const pats = {
    'ZprintPro (ZprintPro)': /ZprintPro\s*\(ZprintPro\)/g,
    '智印港（ZprintPro）': /智印港\s*[（(]\s*ZprintPro/g,
    'ZprintPro（智印港）': /ZprintPro\s*[（(]\s*智印港/g,
    '相邻重复 ZprintPro': /ZprintPro\s*ZprintPro/g,
    '相邻重复 智印港': /智印港\s*智印港/g,
    '空括注': /[（(]\s*[）)]/g,
  };
  const hits = Object.entries(pats).map(([k, re]) => `${k}=${(raw.match(re) || []).length}`).join(' ');
  console.log(`${f}.json: ${hits}`);
}
const en = fs.readFileSync(ROOT + 'src\\data\\blog-data\\en.json', 'utf8').split(/\r?\n/);
en.forEach((l, i) => { if (/ZprintPro\s*\(ZprintPro\)|智印港/.test(l)) console.log(`  en L${i + 1}: …${l.slice(Math.max(0, l.search(/ZprintPro\s*\(ZprintPro\)|智印港/) - 60), l.search(/ZprintPro\s*\(ZprintPro\)|智印港/) + 60)}…`); });
