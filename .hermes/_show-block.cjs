const fs = require('fs');
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
const i = t.indexOf('"doujinshi-printing"');
console.log(t.slice(i, i + 900));
