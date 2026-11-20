#!/usr/bin/env node
/* 只读: blog-data 内 JSON-LD「name」双品牌形态计数 (B2b 前置基准) */
const fs = require('fs');
const FILES = ['zh-hk', 'en', 'ja'];
const PATS = {
  'escaped name: 智印港 ZprintPro': /\\"name\\":\\"智印港 ZprintPro\\"/g,
  'escaped name: ZprintPro 智印港': /\\"name\\":\\"ZprintPro 智印港\\"/g,
  'escaped name: ジープリント ZprintPro': /\\"name\\":\\"ジープリント ZprintPro\\"/g,
  'escaped name: ZprintPro ジープリント': /\\"name\\":\\"ZprintPro ジープリント\\"/g,
  'raw name: 智印港 ZprintPro': /"name":"智印港 ZprintPro"/g,
  'body · ZprintPro ジープリント ·': /ZprintPro ジープリント/g,
};
for (const loc of FILES) {
  const p = `F:\\zprintpro-main-tmp\\src\\data\\blog-data\\${loc}.json`;
  const raw = fs.readFileSync(p, 'utf8');
  let j = null; try { j = JSON.parse(raw); } catch (e) { console.log(`${loc}: JSON 解析失败 ${e.message}`); continue; }
  const out = {};
  for (const [k, re] of Object.entries(PATS)) { const n = (raw.match(re) || []).length; if (n) out[k] = n; }
  // headline / imageAlt 内含双品牌的数量 (content 内 JSON-LD 引号是转义的 -> 用 [^\\]* 取值)
  const hl = (raw.match(/\\"headline\\":\\"[^\\]*\\"/g) || []).filter(s => /智印港\s*ZprintPro|ZprintPro\s*智印港|ジープリント\s*ZprintPro|ZprintPro\s*ジープリント/.test(s));
  const ia = (raw.match(/\\"imageAlt\\":\\"[^\\]*\\"/g) || []).filter(s => /智印港\s*ZprintPro|ZprintPro\s*智印港|ジープリント\s*ZprintPro|ZprintPro\s*ジープリント/.test(s));
  console.log(`${loc}: keys=${Object.keys(j).length} len=${raw.length}`);
  console.log(`   ${JSON.stringify(out)}`);
  console.log(`   headline(转义) 含双品牌 = ${hl.length} | imageAlt(转义) 含双品牌 = ${ia.length}`);
  hl.slice(0, 2).forEach(s => console.log(`      HL: ${s.slice(0, 110)}`));
  ia.slice(0, 2).forEach(s => console.log(`      ALT: ${s.slice(0, 110)}`));
}
