'use strict';
// 快速答案塊跨語系一致性: page.tsx L813 的識別 regex 硬編碼中文「快速答案」
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog-data', loc + '.json'), 'utf8'));
  let withZhLiteral = 0, withEnLiteral = 0, divWithP = 0;
  const samples = [];
  for (const [slug, e] of Object.entries(j)) {
    const c = e.content || '';
    if (/快速答案/.test(c)) withZhLiteral++;
    if (/Quick answer|quick answer|クイック回答|回答のポイント|まず結論/i.test(c)) withEnLiteral++;
    if (/<div[^>]*>\s*<p/i.test(c)) divWithP++;
  }
  console.log('=== ' + loc + ' ===');
  console.log('  含「快速答案」字面:', withZhLiteral, '/', Object.keys(j).length);
  console.log('  含英/日對應字面  :', withEnLiteral);
  console.log('  有 div>p 結構     :', divWithP);

  // 抽 photo-book 的實際結構
  const e = j['photo-book-printing-guide'];
  if (e) {
    const c = e.content;
    const divs = [...c.matchAll(/<div[^>]*>\s*<p[^>]*>([\s\S]{0,120})/g)].slice(0, 4);
    console.log('  photo-book 前幾個 div>p 開頭:');
    divs.forEach((d, i) => console.log('     [' + (i + 1) + '] ' + d[1].replace(/\s+/g, ' ').slice(0, 100)));
  }
}
