const fs = require('fs');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const p = j['doujin-circle-printing-guide'];
  console.log(`\n=== ${loc}`);
  console.log('title:', p.title);
  console.log('desc:', (p.description || '').slice(0, 220));
  // blog-posts.ts meta 同步检查
}
const bp = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
const i = bp.indexOf("slug: 'doujin-circle-printing-guide'");
const seg = bp.slice(i, i + 1400);
console.log('\n=== blog-posts meta ===');
console.log(seg.slice(0, 1200));
