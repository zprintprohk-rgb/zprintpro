/**
 * 将 seedream-prompts-all-skus.csv 中的 SEO 文件名和 Alt 标注集成到 products.ts
 */

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '..', 'seedream-prompts-all-skus.csv');
const PRODUCTS_TS_PATH = path.join(__dirname, '..', 'src', 'data', 'products.ts');

// 1. 读取 CSV
const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
const lines = csvContent.split('\n').filter(l => l.trim());
const headers = lines[0].split(',').map(h => h.trim().replace(/^\uFEFF/, ''));

const seoDataMap = new Map();

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  // 简单解析：处理引号内的逗号
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
  if (!slug) continue;

  seoDataMap.set(slug, {
    filename_zh_hk: getCol('filename_zh_hk'),
    filename_en: getCol('filename_en'),
    filename_ja: getCol('filename_ja'),
    alt_zh_hk: getCol('alt_zh_hk'),
    alt_en: getCol('alt_en'),
    alt_ja: getCol('alt_ja'),
  });
}

console.log(`Parsed ${seoDataMap.size} SEO entries from CSV`);

// 2. 读取 products.ts
let productsTs = fs.readFileSync(PRODUCTS_TS_PATH, 'utf-8');

// 3. 在 Product 接口中添加 seoImages 字段
const interfaceInsertPoint = productsTs.indexOf('  images: string[];');
if (interfaceInsertPoint === -1) {
  console.error('Could not find images field in Product interface');
  process.exit(1);
}

const seoImagesField = `  seoImages?: {
    filename: { 'zh-hk': string; en: string; ja: string };
    alt: { 'zh-hk': string; en: string; ja: string };
  };`;

if (!productsTs.includes('seoImages')) {
  productsTs = productsTs.slice(0, interfaceInsertPoint + '  images: string[];'.length) +
    '\n' + seoImagesField +
    productsTs.slice(interfaceInsertPoint + '  images: string[];'.length);
  console.log('Added seoImages field to Product interface');
}

// 4. 为每个产品添加 seoImages 数据
// 策略：找到每个产品的 images 数组，在其后添加 seoImages
let modifiedCount = 0;
let skippedCount = 0;

for (const [slug, seoData] of seoDataMap) {
  // 构建 seoImages 字符串
  const seoImagesStr = `    seoImages: {
      filename: { 'zh-hk': '${seoData.filename_zh_hk}', en: '${seoData.filename_en}', ja: '${seoData.filename_ja}' },
      alt: { 'zh-hk': '${seoData.alt_zh_hk}', en: '${seoData.alt_en}', ja: '${seoData.alt_ja}' },
    },`;

  // 在 products.ts 中找到该产品的 images 字段
  // 产品格式：images: ['/images/products/xxx.jpg'],
  const imagesPattern = new RegExp(`(images: \\[[^\\]]*'/images/products/${slug}\\.jpg'[^\\]]*\\],)`);
  const match = productsTs.match(imagesPattern);

  if (match) {
    // 检查是否已经有 seoImages
    const afterImages = productsTs.substring(productsTs.indexOf(match[0]) + match[0].length, productsTs.indexOf(match[0]) + match[0].length + 50);
    if (!afterImages.includes('seoImages')) {
      productsTs = productsTs.replace(match[0], match[0] + '\n' + seoImagesStr);
      modifiedCount++;
    } else {
      skippedCount++;
    }
  } else {
    // 尝试更宽松的匹配
    const loosePattern = new RegExp(`(slug: '${slug}',[\\s\\S]{0,500}?images: \\[[^\\]]*\\],)`);
    const looseMatch = productsTs.match(loosePattern);
    if (looseMatch) {
      const afterImages = productsTs.substring(productsTs.indexOf(looseMatch[0]) + looseMatch[0].length, productsTs.indexOf(looseMatch[0]) + looseMatch[0].length + 50);
      if (!afterImages.includes('seoImages')) {
        productsTs = productsTs.replace(looseMatch[0], looseMatch[0] + '\n' + seoImagesStr);
        modifiedCount++;
      } else {
        skippedCount++;
      }
    } else {
      console.log(`  Warning: Could not find images for slug: ${slug}`);
    }
  }
}

console.log(`Modified ${modifiedCount} products, skipped ${skippedCount}`);

// 5. 写回
fs.writeFileSync(PRODUCTS_TS_PATH, productsTs);
console.log('Updated products.ts successfully');
