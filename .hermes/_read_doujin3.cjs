const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/ja.json', 'utf8'));
const c = j['doujin-circle-printing-guide'].content;
const plain = c.replace(/<[^>]+>/g, '');
console.log(plain.slice(0, 1500));
console.log('\n===== 2 =====');
console.log(plain.slice(1500, 3200));
