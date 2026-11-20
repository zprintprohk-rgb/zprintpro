// .hermes/_read_doujin2.cjs
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/ja.json', 'utf8'));
const p = j['doujin-circle-printing-guide'];
const c = p.content;
console.log('len', c.length, 'h2', (c.match(/<h2/g) || []).length);
console.log('head:', JSON.stringify(c.slice(0, 260)));
console.log('tail:', JSON.stringify(c.slice(-260)));
