'use strict';
// 枚舉各 locale 內容中「div > p 首段引言」的字面變體, 確認 qa-answer 識別需覆蓋哪些
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

const variants = {};
const re = /<div class="([^"]*)">\s*<p[^>]*>(?:\s*<[^>]+>)*\s*([^<：:]{2,24})[：:]/g;

for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog-data', loc + '.json'), 'utf8'));
  for (const [slug, e] of Object.entries(j)) {
    const c = e.content || '';
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(c)) !== null) {
      const lead = m[2].trim();
      // 只看像「答案塊標籤」的短引言
      if (lead.length > 18) continue;
      const key = loc + '  |  ' + lead;
      variants[key] = (variants[key] || 0) + 1;
    }
  }
}
Object.entries(variants).sort((a, b) => b[1] - a[1]).slice(0, 24)
  .forEach(([k, v]) => console.log(String(v).padStart(4), '  ', k));
