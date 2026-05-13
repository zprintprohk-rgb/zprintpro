const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf-8');

const productsStart = content.indexOf('export const products');
const firstAlt = content.indexOf('alt:', productsStart);
const block = content.slice(firstAlt, firstAlt + 300);
console.log('First alt block:');
console.log(block);
console.log('---');

const enMatch = block.match(/['"]en['"]\s*:\s*['"]([^'"]*)['"]/);
if (enMatch) {
  console.log('en value:', enMatch[1]);
  console.log('has chinese:', /[\u4e00-\u9fff]/.test(enMatch[1]));
  // show char codes
  for (let i = 0; i < enMatch[1].length; i++) {
    const code = enMatch[1].charCodeAt(i);
    if (code > 127) {
      console.log('  non-ascii char at', i, ':', enMatch[1][i], 'code:', code);
    }
  }
}
