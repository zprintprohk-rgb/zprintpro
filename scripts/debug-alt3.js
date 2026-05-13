const fs = require('fs');
const c = fs.readFileSync('src/data/products.ts', 'utf8');
console.log('products start:', c.indexOf('export const products'));
console.log('categories start:', c.indexOf('export const categories'));
console.log('first product slug:', c.indexOf("slug: 'premium-business-cards'"));
