const fs = require('fs');
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
// find ALL occurrences of doujinshi-printing
let idx = 0;
while (true) {
  const i = t.indexOf('doujinshi-printing', idx);
  if (i < 0) break;
  console.log('--- occurrence at', i, 'context:', JSON.stringify(t.slice(Math.max(0, i - 40), i + 60)));
  idx = i + 1;
}
console.log('\ntotal len', t.length);
