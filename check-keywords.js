const fs = require('fs');
const content = fs.readFileSync('src/data/product-seo.ts', 'utf8');

// Check if keywords were actually expanded
const idx = content.indexOf("'thick-business-cards-400g':");
if (idx > -1) {
  const snippet = content.slice(idx, idx + 500);
  console.log(snippet);
}

// Count how many SKUs have expanded keywords (look for 'heavyweight' in en)
const matches = content.match(/heavyweight business cards/g);
console.log('heavyweight matches:', matches ? matches.length : 0);
