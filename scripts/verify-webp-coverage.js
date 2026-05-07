const fs = require('fs');

const skuMap = JSON.parse(fs.readFileSync('scripts/sku-map.json', 'utf-8'));
const webpFiles = fs.readdirSync('public/images/products/seedream-webp').filter(f => f.endsWith('.webp'));

console.log('=== SKUs missing ALL WebP images ===');
let noWebpCount = 0;
for (const [slug, info] of Object.entries(skuMap)) {
  let hasAnyWebp = false;
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const baseName = info.filename[locale];
    const matches = webpFiles.filter(f => f.startsWith(baseName + '.') || f.startsWith(baseName + '-'));
    if (matches.length > 0) hasAnyWebp = true;
  }
  if (!hasAnyWebp) {
    console.log('  NO WEBP:', slug);
    noWebpCount++;
  }
}

console.log('\n=== SKUs with partial WebP coverage ===');
for (const [slug, info] of Object.entries(skuMap)) {
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const baseName = info.filename[locale];
    const matches = webpFiles.filter(f => f.startsWith(baseName + '.') || f.startsWith(baseName + '-'));
    if (matches.length === 0) {
      console.log('  MISSING:', slug, locale);
    }
  }
}

console.log('\n=== SKU WebP coverage summary ===');
let totalWithAll3 = 0, totalWithSome = 0;
for (const [slug, info] of Object.entries(skuMap)) {
  let locales = [];
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const baseName = info.filename[locale];
    const matches = webpFiles.filter(f => f.startsWith(baseName + '.') || f.startsWith(baseName + '-'));
    if (matches.length > 0) locales.push(locale);
  }
  if (locales.length === 3) totalWithAll3++;
  else if (locales.length > 0) totalWithSome++;
}
console.log('  SKUs with all 3 locales:', totalWithAll3);
console.log('  SKUs with partial coverage:', totalWithSome);
console.log('  SKUs with NO coverage:', noWebpCount);
console.log('  Total WebP files:', webpFiles.length);
