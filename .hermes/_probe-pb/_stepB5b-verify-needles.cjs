'use strict';
/** Step B-5b: 逐条核实 15 处命中的真实文本 (正则命中 ≠ 泄漏; 必须看原文) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const D = path.join(REPO, 'src', 'data');

const NEEDLES = [
  ['blog-data/ja.json', ['データ基準', '校准後', '校正後']],
  ['category-seo-content.ts', ['校正後', 'K3']],
  ['products-content.ts', ['校準報價', '真實校準', '校準來源']],
];

for (const [file, needles] of NEEDLES) {
  const p = path.join(D, file);
  const raw = fs.readFileSync(p, 'utf8');
  console.log(`\n########## ${file} ##########`);
  for (const nd of needles) {
    let i = -1, count = 0;
    const ctxs = [];
    while ((i = raw.indexOf(nd, i + 1)) !== -1) {
      count++;
      if (ctxs.length < 4) ctxs.push(raw.slice(Math.max(0, i - 150), i + 150));
    }
    console.log(`\n--- 「${nd}」出现 ${count} 次 ---`);
    ctxs.forEach((c, k) => {
      // 判断所在行是否注释
      const upto = raw.slice(0, raw.indexOf(c) + 150);
      console.log(`  [${k + 1}] …${c.replace(/\n/g, '⏎')}…`);
    });
  }
}
