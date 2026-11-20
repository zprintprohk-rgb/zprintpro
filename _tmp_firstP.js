const d = require('./src/data/blog-data/zh-hk.json');
const c = d['restaurant-menu-printing-guide'].content;
const pos = c.indexOf('<p');
console.log('first <p at:', pos);
console.log('content (first 500):', c.substring(pos, pos + 500));
console.log('---');
// First H1 or H2 (which is what RULE1 wants)
const h1 = c.indexOf('<h1');
const h2 = c.indexOf('<h2');
const h3 = c.indexOf('<h3');
console.log('h1 pos:', h1, 'h2 pos:', h2, 'h3 pos:', h3);
