const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Find all products and check imagesByLocale
const slugMatches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
let missingEn = 0, missingJa = 0, total = 0;

slugMatches.forEach((match) => {
  const slug = match[1];
  const idx = match.index;
  // Look ahead 3000 chars from slug to find imagesByLocale block
  const block = content.slice(idx, idx + 3000);
  total++;
  const hasEn = block.includes("'en': [");
  const hasJa = block.includes("'ja': [");
  if (!hasEn) { missingEn++; console.log('MISSING EN:', slug); }
  if (!hasJa) { missingJa++; console.log('MISSING JA:', slug); }
});

console.log('\nTotal products:', total);
console.log('Missing EN imagesByLocale:', missingEn);
console.log('Missing JA imagesByLocale:', missingJa);
