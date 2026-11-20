// .hermes/_read_comiket.cjs
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/ja.json', 'utf8'));
const p = j['comiket-printing-prep-guide'];
console.log('title:', p.title);
console.log('description:', p.description);
console.log('date:', p.date, 'category:', p.category);
const c = p.content;
console.log('len:', c.length);
const h2 = [...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, ''));
console.log('h2:', JSON.stringify(h2, null, 0));
console.log('--- first 700 ---');
console.log(c.slice(0, 700));
console.log('--- links ---');
console.log([...new Set([...c.matchAll(/href="([^"]+)"/g)].map(m => m[1]))].join('\n'));
