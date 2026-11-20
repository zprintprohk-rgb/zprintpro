// .hermes/_read_comiket_en.cjs
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/en.json', 'utf8'));
const p = j['comiket-printing-prep-guide'];
const c = p.content;
console.log('title:', p.title);
console.log('len:', c.length, 'h2:', (c.match(/<h2/g) || []).length);
console.log('h2s:', JSON.stringify([...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, ''))));
const idx = [...c.matchAll(/<h2[^>]*>/g)].map(m => m.index);
console.log('h2 offsets:', idx.join(','));
console.log('--- head 420 ---');
console.log(c.slice(0, 420));
