'use strict';
/** 波 4 词级清单: 把 169 字命中的「词」去重列出, 并标注是否含白名单 (唐运提 等) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const inv = JSON.parse(fs.readFileSync(path.join(REPO, '.hermes', '_probe-pb', 'wave4-inventory.json'), 'utf8'));

const WHITELIST_WORDS = ['唐运提'];   // K3 已批: 法人姓名保留简体

const wordTally = {};
const wordMeta = {};
for (const e of inv) {
  for (const [w, c] of Object.entries(e.words)) {
    wordTally[w] = (wordTally[w] || 0) + c;
    wordMeta[w] = wordMeta[w] || { chars: new Set(), lines: [] };
    wordMeta[w].chars.add(e.char);
    if (wordMeta[w].lines.length < 1) wordMeta[w].lines.push(e.lines[0]);
  }
}

const sorted = Object.entries(wordTally).sort((a, b) => b[1] - a[1]);
console.log(`=== 波 4 词级清单 (${sorted.length} 个不同词) ===\n`);
console.log('词'.padEnd(26) + '含简体字'.padEnd(14) + '次数  首个位置');
console.log('-'.repeat(96));
const wl = [], fix = [];
for (const [w, c] of sorted) {
  const chars = [...wordMeta[w].chars].join('');
  const isWL = WHITELIST_WORDS.some(x => w.includes(x));
  (isWL ? wl : fix).push([w, c, chars]);
  console.log(`${(isWL ? '🔒 ' : '   ') + w}`.padEnd(26) + chars.padEnd(14) + String(c).padStart(3) + '   ' + wordMeta[w].lines[0]);
}
console.log('-'.repeat(96));
console.log(`\n白名单词 (保留): ${wl.length}  |  待修词: ${fix.length}`);

fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'wave4-words.json'),
  JSON.stringify({ whitelist: wl, fix }, null, 2), 'utf8');
console.log('落盘: .hermes/_probe-pb/wave4-words.json');
