/**
 * 为 5 个新增产品添加 seoImages
 */

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '..', 'seedream-prompts-all-skus.csv');
const PRODUCTS_TS_PATH = path.join(__dirname, '..', 'src', 'data', 'products.ts');

// 读取 CSV
const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
const lines = csvContent.split('\n').filter(l => l.trim());
const headers = lines[0].split(',').map(h => h.trim().replace(/^\uFEFF/, ''));

const targetSlugs = ['magnetic-closure-gift-box', 'electronics-packaging-box', 'kraft-paper-packaging-box', 'drawer-slide-gift-box', 'fruit-food-label-stickers'];
const seoDataMap = new Map();

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const cells = [];
  let current = '';
  let inQuotes = false;
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  cells.push(current.trim());

  if (cells.length < headers.length) continue;

  const getCol = (name) => {
    const idx = headers.indexOf(name);
    return idx >= 0 ? cells[idx].replace(/^"|"$/g, '').replace(/""/g, '"') : '';
  };

  const slug = getCol('slug');
  if (!targetSlugs.includes(slug)) continue;

  seoDataMap.set(slug, {
    filename_zh_hk: getCol('filename_zh_hk'),
    filename_en: getCol('filename_en'),
    filename_ja: getCol('filename_ja'),
    alt_zh_hk: getCol('alt_zh_hk'),
    alt_en: getCol('alt_en'),
    alt_ja: getCol('alt_ja'),
  });
}

console.log(`Found ${seoDataMap.size} missing products in CSV`);

// 读取 products.ts
let productsTs = fs.readFileSync(PRODUCTS_TS_PATH, 'utf-8');

for (const [slug, seoData] of seoDataMap) {
  const seoImagesStr = `    seoImages: {
      filename: { 'zh-hk': '${seoData.filename_zh_hk}', en: '${seoData.filename_en}', ja: '${seoData.filename_ja}' },
      alt: { 'zh-hk': '${seoData.alt_zh_hk}', en: '${seoData.alt_en}', ja: '${seoData.alt_ja}' },
    },`;

  // 找到 slug 的位置
  const slugIdx = productsTs.indexOf(`slug: '${slug}'`);
  if (slugIdx === -1) {
    console.log(`  Warning: slug not found: ${slug}`);
    continue;
  }

  // 从 slug 位置往后找 images: 字段
  const afterSlug = productsTs.substring(slugIdx);
  const imagesMatch = afterSlug.match(/(images: \[[^\]]*\],)/);
  if (!imagesMatch) {
    console.log(`  Warning: images not found for: ${slug}`);
    continue;
  }

  const imagesStr = imagesMatch[0];
  const imagesIdx = slugIdx + imagesMatch.index;

  // 检查是否已经有 seoImages
  const afterImages = productsTs.substring(imagesIdx + imagesStr.length, imagesIdx + imagesStr.length + 30);
  if (afterImages.includes('seoImages')) {
    console.log(`  Already has seoImages: ${slug}`);
    continue;
  }

  // 在 images 后插入 seoImages
  productsTs = productsTs.substring(0, imagesIdx + imagesStr.length) + '\n' + seoImagesStr + productsTs.substring(imagesIdx + imagesStr.length);
  console.log(`  Added seoImages for: ${slug}`);
}

fs.writeFileSync(PRODUCTS_TS_PATH, productsTs);
console.log('Done');
