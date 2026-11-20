'use strict';
/** 生成母语者平铺纯文本版 (按族分组, 每族可整族批复) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const data = JSON.parse(fs.readFileSync(path.join(REPO, '.hermes', '_probe-pb', 'review-v3-flat.json'), 'utf8'));

const L = [];
L.push('TERMINOLOGY REVIEW  ·  zprintpro.com  ·  2026-09-19');
L.push('================================================================');
L.push('WHAT THIS IS');
L.push('  Every term below is ALREADY LIVE on the site. This is a REVIEW,');
L.push('  not a translation -- we are not re-translating anything.');
L.push('');
L.push('HOW TO REPLY  (please keep this format)');
L.push('  FAMILY <n>: OK');
L.push('  ITEM <n>  : OK');
L.push('  ITEM <n>  : CHANGE -> <your suggestion>');
L.push('  Any item not mentioned is treated as OK.');
L.push('');
L.push('*** THE BINDING / FOLDING FAMILY MUST BE APPROVED AS ONE FAMILY ***');
L.push('  It is FAMILY 1 below. Please read all 14 items together and give');
L.push('  one verdict for the family. If one item is changed and its family');
L.push('  partner is not, the site will contradict itself on the same page.');
L.push('');
L.push('NOTES');
L.push('  - "en: -" means our extraction tool could not reliably line up the');
L.push('    English column (the English rows use "-" as a separator, Chinese');
L.push('    and Japanese use commas/brackets). For English judgement please');
L.push('    read the live page -- that is more accurate than a table.');
L.push('  - Numbers (350g, 90x54mm, 2-fold-3-page) are copied through as-is;');
L.push('    we made no unit conversions.');
L.push('================================================================');

const order = Object.entries(data.families).sort((a, b) => b[1].length - a[1].length);
let famNo = 0, itemNo = 0;
for (const [fam, list] of order) {
  famNo++;
  L.push('');
  L.push(`########## FAMILY ${famNo}: ${fam}  --  ${list.length} items ##########`);
  for (const r of list) {
    itemNo++;
    L.push('');
    L.push(`ITEM ${itemNo}   [source: ${r.src}]`);
    L.push(`   zh : ${r.zh}`);
    L.push(`   en : ${r.en}`);
    L.push(`   ja : ${r.ja}`);
    if (r.note) L.push(`   note: ${r.note}`);
  }
}
L.push('');
L.push('================================================================');
L.push(`TOTAL: ${itemNo} items in ${famNo} families.`);
L.push('Reply example:');
L.push('  FAMILY 1: OK');
L.push('  ITEM 7 : OK');
L.push('  ITEM 12: CHANGE -> one-side coated board (ultra high bulk)');
L.push('================================================================');

const out = L.join('\n');
fs.writeFileSync(path.join(REPO, '.hermes', 'logs', '2026-09-19-terminology-review-flat-for-native.txt'), out, 'utf8');
console.log(`已生成: ${itemNo} 条目 / ${famNo} 族 -> .hermes/logs/2026-09-19-terminology-review-flat-for-native.txt (${out.length} B)`);
// 自检
const famNos = [...out.matchAll(/^########## FAMILY (\d+)/gm)].map(m => +m[1]);
const itemNos = [...out.matchAll(/^ITEM (\d+)/gm)].map(m => +m[1]);
const miss = []; for (let i = 1; i <= itemNo; i++) if (!itemNos.includes(i)) miss.push(i);
console.log(`自检: FAMILY 编号 ${famNos.join(',')} | ITEM ${itemNos.length} 条 | 缺号 ${miss.length ? miss.join(',') : '无 ✅'}`);
console.log(`自检: 装订族是否被标为 FAMILY 1 => ${order[0][0].includes('装订') ? '✅' : '❌ 实际 ' + order[0][0]}`);
