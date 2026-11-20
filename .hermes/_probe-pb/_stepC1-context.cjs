'use strict';
/** Step C 批 1 取证: 逐条打印命中中文的**真实上下文**, 判定「术语欠译 / 生成器坏输出 / 人工误填」三类 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const items = JSON.parse(fs.readFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepC-batch1-items.json'), 'utf8'));

const fileCache = {};
const readLines = (rel) => fileCache[rel] || (fileCache[rel] = fs.readFileSync(path.join(REPO, rel), 'utf8').split('\n'));

for (const it of items) {
  const L = readLines(it.file)[it.line - 1] || '';
  const hit = it.chars;
  const i = L.indexOf(hit);
  console.log(`\n##### [${it.bucket}] ${it.file.replace('src/data/', '')}:${it.line}  field=${it.field}  ${hit.length} 字 #####`);
  if (i >= 0) {
    console.log('  命中原文: ' + JSON.stringify(hit));
    console.log('  窗口(命中前 120 / 后 120):');
    console.log('    …' + L.slice(Math.max(0, i - 120), i).replace(/\n/g, '⏎'));
    console.log('    >>> ' + L.slice(i, i + hit.length + 120).replace(/\n/g, '⏎'));
  } else {
    console.log('  (该行未直接含命中串 — 可能在转义/多行值内)');
    console.log('  行首 260: ' + JSON.stringify(L.slice(0, 260)));
  }
}
