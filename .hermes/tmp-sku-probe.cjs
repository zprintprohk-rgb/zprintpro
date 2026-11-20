const fs = require('fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const i = prod.indexOf("'saddle-stitch-booklets'");
console.log('=== products.ts :: saddle-stitch-booklets ===');
console.log(prod.slice(Math.max(0, i - 200), i + 2600));
