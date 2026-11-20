'use strict';
// 確認 en/ja 內容中「快速答案」直譯等價位的所有大小寫變體
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

const found = {};
for (const loc of ['en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog-data', loc + '.json'), 'utf8'));
  for (const [slug, e] of Object.entries(j)) {
    const c = e.content || '';
    // 抓 div > p 首段引言 (emoji 剝離後的位置)
    const re = /<div class="[^"]*">\s*<p[^>]*>(?:\s*<[^>]+>)*\s*([^<：:]{2,24})[：:]/g;
    let m;
    while ((m = re.exec(c)) !== null) {
      const lead = m[1].trim().replace(/^[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]+\s*/u, '').trim();
      if (/quick\s*answer/i.test(lead) || /クイック回答/.test(lead)) {
        found[loc + ' | ' + lead] = (found[loc + ' | ' + lead] || 0) + 1;
      }
    }
  }
}
console.log('=== 「快速答案」直譯等價位的實際變體 ===');
Object.entries(found).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(String(v).padStart(4), '  ', k));
console.log('\n是否還有其他大小寫形式? 逐一列舉 en 中所有 quick...answer 片段:');
{
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog-data', 'en.json'), 'utf8'));
  const set = new Set();
  for (const e of Object.values(j)) {
    for (const m of (e.content || '').matchAll(/quick\s*answer|Quick\s*Answer|QUICK\s*ANSWER/gi)) set.add(m[0]);
  }
  console.log('   ' + [...set].map(s => JSON.stringify(s)).join('  '));
}
