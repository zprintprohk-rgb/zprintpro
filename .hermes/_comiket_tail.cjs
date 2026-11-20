// .hermes/_comiket_tail.cjs
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/ja.json', 'utf8'));
const c = j['comiket-printing-prep-guide'].content;
const idx = [...c.matchAll(/<h2[^>]*>/g)].map(m => ({ at: m.index, tag: c.slice(m.index, m.index + 90) }));
console.log(JSON.stringify(idx, null, 1));
console.log('--- tail 900 ---');
console.log(c.slice(-900));
