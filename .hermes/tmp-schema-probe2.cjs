const fs = require('fs');
for (const f of ['zh-hk', 'en', 'ja']) {
  const arr = JSON.parse(fs.readFileSync('src/data/blog-data/' + f + '.json', 'utf8'));
  const p = Object.values(arr).find((x) => x.slug === 'school-exercise-book-printing-guide');
  console.log('=== ' + f + ' keys: ' + Object.keys(p).join(', '));
  console.log('  title: ' + p.title);
  console.log('  description len: ' + (p.description || '').length + ' → ' + String(p.description).slice(0, 200));
  console.log('  excerpt: ' + (p.excerpt === undefined ? '(none)' : String(p.excerpt).slice(0, 120)));
  console.log('  category: ' + p.category + ' | date: ' + p.date + ' | content len: ' + (p.content || '').length);
}
// blog-posts.ts 里该 slug 的 meta 条目
const bp = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
const i = bp.indexOf("'school-exercise-book-printing-guide'");
console.log('\n=== blog-posts.ts entry around school-exercise-book ===');
console.log(bp.slice(Math.max(0, i - 900), i + 400));
