const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf-8');
// Show first few slug matches with context
const regex = /slug:\s*'([^']+)'/g;
let m;
let count = 0;
while ((m = regex.exec(content)) !== null && count < 10) {
  console.log('slug:', m[1], 'at', m.index);
  count++;
}
