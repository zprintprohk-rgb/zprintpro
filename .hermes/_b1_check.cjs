// .hermes/_b1_check.cjs
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/ja.json', 'utf8'));
const c = j['new-year-card-printing-2027-guide'].content;
console.log('len', c.length, 'h2', (c.match(/<h2/g) || []).length);
console.log('クイック回答 blocks:', (c.match(/クイック回答/g) || []).length);
const i = c.indexOf('クイック回答');
console.log('ctx:', JSON.stringify(c.slice(Math.max(0, i - 160), i + 60)));
console.log('h2s:', JSON.stringify([...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, ''))));
