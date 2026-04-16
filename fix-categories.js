const fs = require('fs');
let content = fs.readFileSync('src/data/products.ts', 'utf8');
content = content.replace(
  /\{ slug: '([^']+)', name_zh: '([^']+)', name_en: '([^']+)', name_ja: '([^']+)', sort_order: (\d+) \}/g,
  "{ slug: '$1', name: '$2', nameEn: '$3', nameJa: '$4', name_zh: '$2', name_en: '$3', name_ja: '$4', sort_order: $5 }"
);
fs.writeFileSync('src/data/products.ts', content);
console.log('Updated categories');
