// .hermes/_foodguide_enja.cjs
const fs = require('fs');
for (const l of ['en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  const c = j['food-packaging-printing-guide'].content;
  console.log(`\n===== ${l} head 420 =====`);
  console.log(c.slice(0, 420));
  for (const pat of ['12-Industry', '12 業界', 'SGS']) {
    let i = c.indexOf(pat);
    if (i >= 0) console.log(`  [${pat}] @${i}:`, JSON.stringify(c.slice(Math.max(0, i - 70), i + 70)));
  }
  // 淋膜/laminate h2 后位置 (插 内側印刷 段)
  const m = c.match(/<h2[^>]*>[^<]*(?:4\.|Logistics|通関|物流)[\s\S]{0,80}?<\/h2>/);
  console.log('  logistics h2:', m ? JSON.stringify(m[0].slice(0, 90)) : 'n/a');
}
