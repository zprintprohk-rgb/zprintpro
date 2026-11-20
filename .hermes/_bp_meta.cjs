const fs = require('fs');
const bp = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
const i = bp.indexOf("slug: 'doujin-circle-printing-guide'");
const seg = bp.slice(i, i + 3200);
console.log(seg);
