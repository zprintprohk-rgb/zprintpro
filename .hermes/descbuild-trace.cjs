const fs = require('fs');
const c = fs.readFileSync('src/lib/seo.ts', 'utf8');
const i = c.indexOf('const priceText');
console.log(c.slice(i, i + 900).replace(/\n{2,}/g, '\n'));
