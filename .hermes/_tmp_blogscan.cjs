const fs = require('fs');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync('src/data/blog-data/' + loc + '.json', 'utf8'));
  const keys = Object.keys(j);
  console.log('== ' + loc + ' mapKeys=' + keys.length + ' ==');
  const v0 = j[keys[0]];
  if (loc === 'zh-hk') console.log('sampleValueKeys:', Object.keys(v0).join(','));
  const rows = keys.map(s => ({ slug: s, len: ((j[s] && (j[s].content || j[s].body)) || '').length }));
  rows.sort((a, b) => b.len - a.len);
  for (const r of rows.slice(0, 50)) console.log(r.len + '\t' + r.slug);
}
const ts = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
const m = ts.match(/export const blogPosts[^=]*=\s*\[/);
console.log('blogPosts array found:', !!m);
const slugs = [...ts.matchAll(/slug:\s*'([^']+)'/g)].map(x => x[1]);
console.log('ts slug matches=' + slugs.length + ' distinct=' + new Set(slugs).size);
