'use strict';
/**
 * Step E v3: 按规则拆分 (只取 en 值内 CJK = I18N_POLLUTION_EN), 聚成术语表
 * 并用「值级」定位: 每条命中的是哪个文件/值, 以便给出可执行的替换范围。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const common = require(path.join(REPO, 'scripts', 'guards', 'common.js'));
const i18n = require(path.join(REPO, 'scripts', 'guards', 'i18n-guard.js'));

const files = common.collectFiles('src', false);
const byRule = {};
const enHits = [];
for (const f of files) {
  let content;
  try { content = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  for (const h of i18n.scanBidirectional(content, f)) {
    if (h.legacyRed) continue;
    const rel = (h.file || f).replace(/\\/g, '/');
    byRule[h.ruleId] = (byRule[h.ruleId] || 0) + 1;
    if (h.ruleId === 'I18N_POLLUTION_EN') enHits.push({ ...h, file: rel });
  }
}
console.log('=== 按规则命中数 (门童口径) ===');
Object.entries(byRule).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(24)} ${v}`));
console.log(`\nI18N_POLLUTION_EN (en 值内 CJK) = ${enHits.length} 字符  <- Step C/E 记账口径`);

// 按文件统计
const byFileCnt = {};
enHits.forEach(h => byFileCnt[h.file] = (byFileCnt[h.file] || 0) + 1);
console.log('\n=== en 值内 CJK 按文件 ===');
Object.entries(byFileCnt).sort((a, b) => b[1] - a[1]).forEach(([f, c]) => console.log(`  ${String(c).padStart(5)}  ${f.replace('src/', '')}`));

// 术语聚合: 从文件内容里取每条命中所在的中文连续串
const CJKRE = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]{2,}/g;
const fileCache = {};
const termTally = {};
const termFiles = {};
for (const h of enHits) {
  if (!fileCache[h.file]) {
    try { fileCache[h.file] = fs.readFileSync(path.join(REPO, h.file), 'utf8').split('\n'); } catch (e) { fileCache[h.file] = ''; }
  }
  const line = (fileCache[h.file][h.line - 1]) || '';
  // 找包含该字符的中文连续串
  let term = h.char;
  CJKRE.lastIndex = 0;
  let m;
  while ((m = CJKRE.exec(line)) !== null) {
    if (m[0].includes(h.char)) {
      // 取包含该字符、且与该字符位置最近的串
      const idx = line.indexOf(m[0]);
      if (idx >= 0) { term = m[0]; break; }
    }
  }
  termTally[term] = (termTally[term] || 0) + 1;
  termFiles[term] = termFiles[term] || {};
  termFiles[term][h.file] = (termFiles[term][h.file] || 0) + 1;
}

console.log('\n=== 术语聚合 (en 值内中文连续串) — 全量清单 ===');
console.log('术语'.padEnd(30) + '字符数'.padEnd(8) + '文件数');
console.log('-'.repeat(56));
const sorted = Object.entries(termTally).sort((a, b) => b[1] - a[1]);
let sum = 0;
for (const [t, n] of sorted) {
  sum += n;
  console.log(t.padEnd(30) + String(n).padEnd(8) + Object.keys(termFiles[t]).length);
}
console.log('-'.repeat(56));
console.log('合计'.padEnd(30) + String(sum).padEnd(8) + '');
console.log(`术语条数: ${sorted.length}`);

fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepE-terms.json'),
  JSON.stringify({ total: enHits.length, terms: sorted.map(([t, n]) => ({ term: t, chars: n, files: termFiles[t] })) }, null, 2), 'utf8');
console.log('\n落盘: .hermes/_probe-pb/stepE-terms.json');
