const fs = require('fs');

const skuMap = JSON.parse(fs.readFileSync('scripts/sku-map.json', 'utf-8'));
const webpFiles = fs.readdirSync('public/images/products/seedream-webp').filter(f => f.endsWith('.webp'));

let issues = [];
for (const [slug, info] of Object.entries(skuMap)) {
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const baseName = info.filename[locale];
    const matches = webpFiles.filter(f => f.startsWith(baseName + '.') || f.startsWith(baseName + '-'));
    if (matches.length === 0) {
      issues.push(slug + ' ' + locale + ': 0 images');
    }
  }
}

console.log('SKUs with missing images:', issues.length);
if (issues.length > 0) {
  issues.slice(0, 20).forEach(i => console.log(' ', i));
}

console.log('\nTotal WebP files:', webpFiles.length);
console.log('Total SKUs:', Object.keys(skuMap).length);
