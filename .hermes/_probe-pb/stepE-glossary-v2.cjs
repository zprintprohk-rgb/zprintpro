'use strict';
/**
 * Step E v2: 用**门童 #4 口径** (i18n-guard.scanBidirectional) 取 en 值内 CJK 的真值,
 * 再按「中文连续片段」聚成术语表 —— 与基线同源, 不新造第二套判据。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const common = require(path.join(REPO, 'scripts', 'guards', 'common.js'));
const i18n = require(path.join(REPO, 'scripts', 'guards', 'i18n-guard.js'));

const files = common.collectFiles('src', false);
const hits = [];
for (const f of files) {
  let content;
  try { content = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  for (const h of i18n.scanBidirectional(content, f)) {
    if (h.legacyRed) continue;
    hits.push({ ...h, file: h.file || f.replace(/\\/g, '/') });
  }
}
console.log(`门童口径 en 值内 CJK 命中: ${hits.length} 字符`);

// 按 (file, line, valueContext) 聚合成片段: 用每处命中的字符 + 相邻上下文构造术语
const CJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
const termTally = {};
const byFile = {};
for (const h of hits) {
  const key = h.char || '';
  // 用「该命中所在的中文连续串」做术语归并: 从 hit 上下文里取
  const ctx = h.context || h.snippet || '';
  let term = key;
  const m = ctx.match(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]{2,12}/g);
  if (m && m.length) {
    term = m.sort((a, b) => b.length - a.length)[0];
  }
  termTally[term] = (termTally[term] || 0) + 1;
  byFile[h.file] = byFile[h.file] || {};
  byFile[h.file][term] = (byFile[h.file][term] || 0) + 1;
}

console.log('\n=== 命中样例 (看 hits 结构, 决定聚合方式) ===');
console.log(JSON.stringify(hits.slice(0, 3), null, 1));

console.log('\n=== 单字符命中数 top 20 ===');
const chTally = {};
hits.forEach(h => chTally[h.char] = (chTally[h.char] || 0) + 1);
Object.entries(chTally).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([c, n]) => console.log(`  ${c}  ${n}`));
