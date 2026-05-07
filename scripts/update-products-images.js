const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const SKU_MAP_PATH = path.join(__dirname, 'sku-map.json');
const WEBP_DIR = path.join(__dirname, '..', 'public', 'images', 'products', 'seedream-webp');

const skuMap = JSON.parse(fs.readFileSync(SKU_MAP_PATH, 'utf-8'));
const webpFiles = fs.readdirSync(WEBP_DIR).filter(f => f.endsWith('.webp'));

// Build file index per SKU slug
const filesBySlug = {};
for (const [slug, info] of Object.entries(skuMap)) {
  filesBySlug[slug] = { 'zh-hk': [], en: [], ja: [] };
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const baseName = info.filename[locale];
    if (!baseName) continue;
    const matches = webpFiles
      .filter(f => f.startsWith(baseName + '.') || f.startsWith(baseName + '-'))
      .map(f => {
        const numMatch = f.match(new RegExp(`^${baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+)\\.webp$`));
        const num = numMatch ? parseInt(numMatch[1], 10) : 0;
        return { f, num };
      })
      .sort((a, b) => a.num - b.num)
      .map(({ f }) => `/images/products/seedream-webp/${f}`);
    filesBySlug[slug][locale] = matches;
  }
}

let content = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
let updatedCount = 0;

// Helper: find product object by slug and replace fields
function updateProduct(slug, info) {
  // Find the product block: slug: 'xxx',
  const slugRegex = new RegExp(`(\\s+slug:\\s*'${slug.replace(/[-]/g, '\\$&')}',)`);
  const slugMatch = content.match(slugRegex);
  if (!slugMatch) {
    console.log('  Warning: slug not found in products.ts:', slug);
    return false;
  }

  const slugIndex = slugMatch.index;
  // Find the start of this product object (look backward for {)
  let objStart = content.lastIndexOf('{', slugIndex);
  // Find the end of this product object (balance braces)
  let braceCount = 0;
  let objEnd = objStart;
  for (let i = objStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) { objEnd = i + 1; break; }
  }
  
  let objText = content.slice(objStart, objEnd);
  
  // Build imagesByLocale
  const files = filesBySlug[slug];
  const hasAnyImages = files['zh-hk'].length || files['en'].length || files['ja'].length;
  
  if (hasAnyImages) {
    const localeEntries = [];
    for (const locale of ['zh-hk', 'en', 'ja']) {
      const arr = files[locale];
      if (arr.length > 0) {
        const items = arr.map(p => `      '${p}',`).join('\n');
        localeEntries.push(`    '${locale}': [\n${items}\n    ]`);
      }
    }
    const imagesByLocaleText = `  imagesByLocale: {\n${localeEntries.join(',\n')},\n  },`;
    
    // Replace or insert imagesByLocale
    if (objText.includes('imagesByLocale:')) {
      objText = objText.replace(
        /(\s+)imagesByLocale:\s*\{[\s\S]*?\n\s*\},?/,
        '\n' + imagesByLocaleText
      );
    } else {
      // Insert after images: [...],
      objText = objText.replace(
        /(images:\s*\[[^\]]*\],?)(\n)/,
        '$1\n' + imagesByLocaleText + '\n'
      );
    }
  }
  
  // Build seoImages with new .webp filenames and alt texts
  const newAlt = info.alt;
  const newFilename = {};
  for (const locale of ['zh-hk', 'en', 'ja']) {
    newFilename[locale] = info.filename[locale] + '.webp';
  }
  
  const seoImagesText = `  seoImages: {\n    filename: { 'zh-hk': '${newFilename['zh-hk']}', en: '${newFilename.en}', ja: '${newFilename.ja}' },\n    alt: { 'zh-hk': '${newAlt['zh-hk'].replace(/'/g, "\\'")}', en: '${newAlt.en.replace(/'/g, "\\'")}', ja: '${newAlt.ja.replace(/'/g, "\\'")}' },\n  },`;
  
  if (objText.includes('seoImages:')) {
    objText = objText.replace(
      /(\s+)seoImages:\s*\{[\s\S]*?\n\s*\},?/,
      '\n' + seoImagesText
    );
  }
  
  // Replace in content
  content = content.slice(0, objStart) + objText + content.slice(objEnd);
  return true;
}

for (const [slug, info] of Object.entries(skuMap)) {
  const ok = updateProduct(slug, info);
  if (ok) updatedCount++;
}

fs.writeFileSync(PRODUCTS_PATH, content, 'utf-8');
console.log(`Updated ${updatedCount} products in products.ts`);
