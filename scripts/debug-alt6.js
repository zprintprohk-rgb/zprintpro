const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf-8');
const regex = /seoImages:\s*\{[\s\S]*?alt:\s*\{[\s\S]*?\},?[\s\S]*?\},?/g;
let m;
let count = 0;
while ((m = regex.exec(content)) !== null) {
  count++;
  if (count <= 2) {
    console.log('Match', count, 'at', m.index);
    console.log(m[0].slice(0, 200));
    console.log('---');
  }
}
console.log('Total matches:', count);
