'use strict';
/** 波 3 分档: en 向剩余 68 字符逐条定性 (白名单 / 术语对照注 / 引文出处 / 真缺陷) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const common = require(path.join(REPO, 'scripts', 'guards', 'common.js'));
const i18n = require(path.join(REPO, 'scripts', 'guards', 'i18n-guard.js'));

const files = common.collectFiles('src', false);
const hits = [];
for (const f of files) {
  let c;
  try { c = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  for (const h of i18n.scanBidirectional(c, f)) {
    if (h.legacyRed || h.ruleId !== 'I18N_POLLUTION_EN') continue;
    hits.push({ ...h, file: (h.file || f).replace(/\\/g, '/') });
  }
}
console.log(`en 向剩余命中: ${hits.length} 字符\n`);

const cache = {};
for (const f of new Set(hits.map(h => h.file))) {
  cache[f] = fs.readFileSync(path.join(REPO, f), 'utf8').split('\n');
}

const CLASSES = { 白名单: [], 术语对照注: [], 引文出处: [], 真缺陷: [], 待判: [] };
const WHITELIST = { 'payment-methods/page.tsx': 'WL-1 法人全称/受益人栏', 'Footer.tsx': 'WL-3 supportJA (ja 别名键)' };
const GLOSS = /say\s|also known as|別名|又名|\/\s*\S+\s*\)|（|\(騎|\(坑/;

for (const h of hits) {
  const line = (cache[h.file][h.line - 1]) || '';
  const idx = line.indexOf(h.char);
  const ctx = line.slice(Math.max(0, idx - 110), idx + 110);
  let cls = '待判';
  if (Object.keys(WHITELIST).some(k => h.file.includes(k))) cls = '白名单';
  else if (GLOSS.test(ctx) || /"餐牌"|"菜单"|\(騎|\(坑|也稱|也稱作/.test(ctx)) cls = '术语对照注';
  else if (/White Paper|白皮書|白皮书|per \S+ 2025|出典|出處/.test(ctx)) cls = '引文出处';
  else if (h.char === '彩') cls = '白名单';  // 彩龍印刷 品牌名
  else cls = '真缺陷';
  CLASSES[cls].push({ char: h.char, file: h.file.replace('src/', ''), line: h.line, ctx });
}

for (const [cls, arr] of Object.entries(CLASSES)) {
  if (!arr.length) continue;
  console.log(`\n########## ${cls} — ${arr.length} 字符 ##########`);
  arr.forEach(a => {
    console.log(`  「${a.char}」 ${a.file}:${a.line}`);
    console.log(`     …${a.ctx.replace(/\s+/g, ' ')}…`);
  });
}

console.log('\n=== 分档小计 ===');
Object.entries(CLASSES).forEach(([k, v]) => console.log(`  ${k.padEnd(10)} ${v.length}`));

fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'wave3-classification.json'), JSON.stringify(CLASSES, null, 2), 'utf8');
console.log('\n落盘: .hermes/_probe-pb/wave3-classification.json');
