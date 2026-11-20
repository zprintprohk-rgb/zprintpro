#!/usr/bin/env node
/* 只读: blog-data 残留 23 处 (zh-hk) 的所属键归属 (确认全在 title 面) */
const fs = require('fs');
const raw = fs.readFileSync('F:\\zprintpro-main-tmp\\src\\data\\blog-data\\zh-hk.json', 'utf8');
const DUAL = /智印港\s*ZprintPro|ZprintPro\s*智印港/g;
const KEYS = ['title', 'headline', 'name', 'description', 'imageAlt', 'author', 'publisher', 'worksFor'];
const stat = {};
for (const k of KEYS) {
  const re = new RegExp('\\\\"' + k + '\\\\":\\\\"((?:[^\\\\]|\\\\.)*?)\\\\"', 'g');
  let m, n = 0;
  while ((m = re.exec(raw)) !== null) { if (DUAL.test(m[1])) n++; DUAL.lastIndex = 0; }
  // 也统计顶层 (未转义)
  const re2 = new RegExp('"' + k + '":\\s*"((?:[^"\\\\]|\\\\.)*?)"', 'g');
  let m2, n2 = 0;
  while ((m2 = re2.exec(raw)) !== null) { if (DUAL.test(m2[1])) n2++; DUAL.lastIndex = 0; }
  if (n || n2) stat[k] = { escaped: n, raw: n2 };
}
console.log('残留归属 (zh-hk.json, 共 23):', JSON.stringify(stat, null, 1));
