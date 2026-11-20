// .hermes/_foodblog_check.cjs
const fs = require('fs');
for (const l of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  const keys = Object.keys(j).filter(k => /food|packag|box/i.test(k));
  console.log(`[${l}] packaging-ish (${keys.length}):`);
  keys.forEach(k => console.log('   ', k, (j[k].content || '').length, '|', (j[k].title || '').slice(0, 50)));
}
