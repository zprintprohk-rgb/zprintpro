const fs = require('fs');
// 1. blog-data entry keys
const arr = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const list = Object.values(arr);
console.log('entries:', list.length);
console.log('keys:', Object.keys(list[0]).join(', '));
// 2. content length distribution of recent posts
const lens = list.map((p) => ({ slug: p.slug, len: (p.content || '').length, date: p.date }));
lens.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
console.log('\n最近 12 篇 (date desc): slug | content len | date');
for (const x of lens.slice(0, 12)) console.log('  ' + x.slug + ' | ' + x.len + ' | ' + x.date);
// 3. 找一篇长度中等的做全文样板
const mid = lens.filter((x) => x.len > 4000 && x.len < 12000).slice(0, 3);
console.log('\n候选样板:', mid.map((x) => x.slug + '(' + x.len + ')').join(', '));
// 4. blog-posts.ts 第一条 + 结构
const bp = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
console.log('\nblog-posts.ts bytes:', bp.length);
const i = bp.indexOf('BlogPostMeta');
console.log(bp.slice(0, 1600));
