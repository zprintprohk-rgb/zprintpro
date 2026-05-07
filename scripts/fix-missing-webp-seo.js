const fs = require('fs');

const PRODUCTS_PATH = 'src/data/products.ts';
const skuMap = JSON.parse(fs.readFileSync('scripts/sku-map.json', 'utf-8'));
const webpFiles = fs.readdirSync('public/images/products/seedream-webp').filter(f => f.endsWith('.webp'));

// Find SKUs with NO webp coverage at all
const noWebpSlugs = [];
for (const [slug, info] of Object.entries(skuMap)) {
  let hasAnyWebp = false;
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const baseName = info.filename[locale];
    const matches = webpFiles.filter(f => f.startsWith(baseName + '.') || f.startsWith(baseName + '-'));
    if (matches.length > 0) hasAnyWebp = true;
  }
  if (!hasAnyWebp) noWebpSlugs.push(slug);
}

console.log('Fixing', noWebpSlugs.length, 'SKUs with no WebP images:', noWebpSlugs.join(', '));

let content = fs.readFileSync(PRODUCTS_PATH, 'utf-8');

for (const slug of noWebpSlugs) {
  const info = skuMap[slug];
  const newFilename = {};
  for (const locale of ['zh-hk', 'en', 'ja']) {
    newFilename[locale] = info.filename[locale] + '.jpg';
  }
  
  // Find seoImages block for this slug and replace .webp with .jpg in filename only
  const slugRegex = new RegExp(`(\\s+slug:\\s*'${slug.replace(/[-]/g, '\\$&')}',)`);
  const slugMatch = content.match(slugRegex);
  if (!slugMatch) {
    console.log('  Warning: slug not found:', slug);
    continue;
  }
  
  const slugIndex = slugMatch.index;
  const objStart = content.lastIndexOf('{', slugIndex);
  let braceCount = 0;
  let objEnd = objStart;
  for (let i = objStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) { objEnd = i + 1; break; }
  }
  
  let objText = content.slice(objStart, objEnd);
  
  // Replace filename in seoImages: change .webp to .jpg
  objText = objText.replace(
    /filename:\s*\{[^}]+\}/,
    `filename: { 'zh-hk': '${newFilename['zh-hk']}', en: '${newFilename.en}', ja: '${newFilename.ja}' }`
  );
  
  // Also remove imagesByLocale since no webp files exist
  if (objText.includes('imagesByLocale:')) {
    objText = objText.replace(/\n\s*imagesByLocale:\s*\{[\s\S]*?\n\s*\},/, '');
  }
  
  content = content.slice(0, objStart) + objText + content.slice(objEnd);
  console.log('  Fixed:', slug);
}

fs.writeFileSync(PRODUCTS_PATH, content, 'utf-8');
console.log('Done!');
