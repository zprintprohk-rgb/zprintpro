const fs = require('fs');
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/products-content.ts', 'utf8');
// count exact FAQ line + collect distinct variants
const faqNeedle = '<summary><strong>智印港支援哪些材質和工藝？</strong></summary>';
const variants = new Map();
const lines = t.split(/\r?\n/);
let total = 0;
for (const ln of lines) {
  if (ln.includes(faqNeedle)) {
    total++;
    const key = ln.trim().slice(0, 160);
    variants.set(key, (variants.get(key) || 0) + 1);
  }
}
console.log('FAQ 行总数:', total);
console.log('不同变体数:', variants.size);
for (const [k, v] of variants) console.log(`  ×${v}: ${k.slice(0, 120)}`);
