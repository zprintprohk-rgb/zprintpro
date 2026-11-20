const fs = require('fs');
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
const i = t.indexOf('"doujinshi-printing": {');
const seg = t.slice(i, i + 3000);
const m = seg.match(/"en": \{\s*"title": "((?:[^"\\]|\\.)*)"/);
console.log('doujinshi-printing en title:', m ? m[1] : 'NOT FOUND');
const mj = seg.match(/"ja": \{\s*"title": "((?:[^"\\]|\\.)*)"/);
console.log('doujinshi-printing ja title:', mj ? mj[1] : 'NOT FOUND');
