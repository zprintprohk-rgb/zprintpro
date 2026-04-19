const fs = require('fs');
const c = fs.readFileSync('src/data/product-seo.ts', 'utf-8');
const start = c.indexOf("'premium-business-cards':");
const end = c.indexOf("'foil-business-cards':");
console.log(c.substring(start, end));
