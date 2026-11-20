// .hermes/_blog_head_md.cjs
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
for (const [slug, p] of Object.entries(j)) {
  const c = p.content || '';
  const ms = [...c.matchAll(/(?:^|\n)\s*(#{1,4})\s+([^\n]{0,40})/g)];
  if (ms.length) console.log(slug, 'x' + ms.length, '| e.g.', JSON.stringify(c.slice(ms[0].index, ms[0].index + 60)));
}
