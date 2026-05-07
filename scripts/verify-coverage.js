const fs = require('fs');

const skuMap = JSON.parse(fs.readFileSync('scripts/sku-map.json', 'utf-8'));
const srcFiles = fs.readdirSync('F:\\新网站压缩后的图片').filter(f => f.endsWith('.jpg'));
const webpFiles = fs.readdirSync('public/images/products/seedream-webp').filter(f => f.endsWith('.webp'));

console.log('=== SKUs missing ALL locale images (no source files at all) ===');
for (const [slug, info] of Object.entries(skuMap)) {
  let hasAnySrc = false;
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const baseName = info.filename[locale];
    const matches = srcFiles.filter(f => f.startsWith(baseName + '-'));
    if (matches.length > 0) hasAnySrc = true;
  }
  if (!hasAnySrc) console.log('  NO SOURCE:', slug);
}

console.log('\n=== SKUs with some locale missing ===');
for (const [slug, info] of Object.entries(skuMap)) {
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const baseName = info.filename[locale];
    const srcMatches = srcFiles.filter(f => f.startsWith(baseName + '-'));
    const webpMatches = webpFiles.filter(f => f.startsWith(baseName + '.') || f.startsWith(baseName + '-'));
    if (srcMatches.length === 0) {
      console.log('  MISSING:', slug, locale, '(0 source, 0 webp)');
    }
  }
}

console.log('\n=== Source files present but WebP missing ===');
for (const [slug, info] of Object.entries(skuMap)) {
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const baseName = info.filename[locale];
    const srcMatches = srcFiles.filter(f => f.startsWith(baseName + '-'));
    const webpMatches = webpFiles.filter(f => f.startsWith(baseName + '.') || f.startsWith(baseName + '-'));
    if (srcMatches.length > 0 && webpMatches.length === 0) {
      console.log('  BUG:', slug, locale, srcMatches.length, 'source files but 0 webp');
    }
  }
}

console.log('\nSummary:');
console.log('  Total source JPGs:', srcFiles.length);
console.log('  Total WebP files:', webpFiles.length);
console.log('  Total SKUs:', Object.keys(skuMap).length);
