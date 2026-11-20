const fs = require('fs');
const txt = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const i = txt.indexOf("slug: 'doujinshi-printing'");
console.log('idx', i);
if (i > 0) console.log(txt.slice(i - 150, i + 1600));
