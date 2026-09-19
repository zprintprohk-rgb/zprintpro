'use strict';
/**
 * 波 4 前置: ja 向 169 字精确清单 —— 逐字取**真实词**上下文, 区分
 *   ① 日语新字体/同形字 (合法, 不可动)  ② 简体专用字 (污染, 需改)  ③ 中文词整串混入
 * 只读。
 */
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
    if (h.legacyRed || h.ruleId !== 'I18N_POLLUTION_JA') continue;
    hits.push({ ...h, file: (h.file || f).replace(/\\/g, '/') });
  }
}
console.log(`ja 向命中: ${hits.length} 字符\n`);

// 逐字符统计 + 取该字符所在的中文/汉字连续串
const CJKRUN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]{1,}/g;
const cache = {};
const perChar = {};
for (const h of hits) {
  if (!cache[h.file]) cache[h.file] = fs.readFileSync(path.join(REPO, h.file), 'utf8').split('\n');
  const line = cache[h.file][h.line - 1] || '';
  // 找包含该字符的汉字连续串
  CJKRUN.lastIndex = 0;
  let m, word = h.char;
  while ((m = CJKRUN.exec(line)) !== null) {
    if (m[0].includes(h.char)) { word = m[0]; break; }
  }
  perChar[h.char] = perChar[h.char] || { n: 0, words: {}, files: {}, lines: [] };
  perChar[h.char].n++;
  perChar[h.char].words[word] = (perChar[h.char].words[word] || 0) + 1;
  perChar[h.char].files[h.file] = (perChar[h.char].files[h.file] || 0) + 1;
  if (perChar[h.char].lines.length < 2) perChar[h.char].lines.push(`${h.file.replace('src/', '')}:${h.line}`);
}

console.log('=== ja 向 169 字逐字清单 (按频次) ===\n');
const sorted = Object.entries(perChar).sort((a, b) => b[1].n - a[1].n);
console.log('字  次数  所在词 (top3)                                     位置');
console.log('-'.repeat(108));
for (const [ch, v] of sorted) {
  const words = Object.entries(v.words).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([w, c]) => `${w}(${c})`).join(' ');
  console.log(`${ch}   ${String(v.n).padStart(3)}  ${words.slice(0, 48).padEnd(50)} ${v.lines[0]}`);
}
console.log('-'.repeat(108));
console.log(`合计 ${sorted.length} 个不同字符 / ${hits.length} 字符`);

fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'wave4-inventory.json'),
  JSON.stringify(sorted.map(([ch, v]) => ({ char: ch, n: v.n, words: v.words, files: v.files, lines: v.lines })), null, 2), 'utf8');
console.log('\n落盘: .hermes/_probe-pb/wave4-inventory.json');
