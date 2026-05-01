/**
 * 阶段 3 Step 2: 自动生成 imagesByLocale 数据并注入 products.ts
 * 同时更新 seoImages.filename 指向 WebP
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const WEBP_DIR = path.join(__dirname, '..', 'public', 'images', 'products', 'seedream-webp');

// 1. 读取所有 WebP 文件并分组
const files = fs.readdirSync(WEBP_DIR)
  .filter(f => f.toLowerCase().endsWith('.webp'))
  .sort();

const skuMap = {};

function parseWebpFilename(filename) {
  // zprintpro-{category}-{slug}-{lang}-{n}.webp
  const match = filename.match(/^zprintpro-([a-z]+)-(.+)-(zh-hk|en|ja)-(\d+)\.webp$/i);
  if (!match) return null;
  return {
    category: match[1],
    slug: match[2],
    lang: match[3],
    num: parseInt(match[4], 10),
  };
}

for (const file of files) {
  const parsed = parseWebpFilename(file);
  if (!parsed) continue;

  // 构建 SKU key: {category}-{slug}
  // 需要映射到 products.ts 中的 id
  const skuKey = `${parsed.category}-${parsed.slug}`;
  const webpPath = `/images/products/seedream-webp/${file}`;

  if (!skuMap[skuKey]) {
    skuMap[skuKey] = { 'zh-hk': [], en: [], ja: [] };
  }
  skuMap[skuKey][parsed.lang].push({ path: webpPath, num: parsed.num });
}

// 排序并去重
for (const key of Object.keys(skuMap)) {
  for (const lang of ['zh-hk', 'en', 'ja']) {
    skuMap[key][lang].sort((a, b) => a.num - b.num);
    skuMap[key][lang] = skuMap[key][lang].map(item => item.path);
  }
}

// SKU ID 映射表
const idMap = {
  'business-cards-premium-business-cards': 'BC-001',
  'business-cards-thick-business-cards-400g': 'BC-002',
  'business-cards-foil-business-cards': 'BC-003',
  'business-cards-spot-uv-business-cards': 'BC-004',
  'business-cards-matte-business-cards': 'BC-005',
  'business-cards-rounded-corner-cards': 'BC-006',
  'stickers-waterproof-stickers': 'ST-001',
  'stickers-transparent-stickers': 'ST-002',
  'stickers-removable-stickers': 'ST-003',
  'stickers-small-batch-stickers': 'ST-004',
  'stickers-die-cut-stickers': 'ST-005',
  'stickers-foil-stickers': 'ST-006',
  'stickers-security-stickers': 'ST-007',
  'stickers-fluorescent-stickers': 'ST-008',
  'stickers-fruit-food-label-stickers': 'ST-009',
  'paper-bags-kraft-paper-bags': 'PB-001',
  'paper-bags-white-card-bags': 'PB-002',
  'paper-bags-gift-bags': 'PB-003',
  'paper-bags-eco-paper-bags': 'PB-004',
  'paper-bags-handle-bags': 'PB-005',
  'paper-bags-large-bags': 'PB-007',
  'flyers-a4-flyers': 'FL-001',
  'flyers-a5-flyers': 'FL-002',
  'flyers-double-sided-flyers': 'FL-003',
  'flyers-folded-leaflets': 'FL-004',
  'flyers-thick-paper-flyers': 'FL-005',
  'flyers-eco-flyers': 'FL-007',
  'flyers-same-day-flyers': 'FL-008',
  'posters-a2-posters': 'PO-001',
  'posters-a1-posters': 'PO-002',
  'posters-outdoor-posters': 'PO-003',
  'posters-display-posters': 'PO-004',
  'posters-art-posters': 'PO-005',
  'posters-adhesive-posters': 'PO-006',
  'packaging-gift-boxes': 'PK-001',
  'packaging-cosmetic-boxes': 'PK-002',
  'packaging-food-boxes': 'PK-003',
  'packaging-mailer-boxes': 'PK-004',
  'packaging-folding-boxes': 'PK-005',
  'packaging-rigid-boxes': 'PK-006',
  'packaging-magnetic-closure-gift-box': 'PKG-007',
  'packaging-electronics-packaging-box': 'PKG-008',
  'packaging-kraft-paper-packaging-box': 'PKG-009',
  'packaging-drawer-slide-gift-box': 'PKG-010',
  'red-packets-foil-red-packets': 'RP-001',
  'red-packets-embossed-red-packets': 'RP-002',
  'red-packets-custom-red-packets': 'RP-003',
  'red-packets-cartoon-red-packets': 'RP-004',
  'red-packets-eco-red-packets': 'RP-005',
  'red-packets-large-red-packets': 'RP-006',
  'calendars-wall-calendars': 'CL-001',
  'calendars-desk-calendars': 'CL-002',
  'calendars-custom-calendars': 'CL-003',
  'calendars-mini-calendars': 'CL-004',
  'calendars-photo-frame-calendars': 'CL-005',
  'calendars-magnetic-calendars': 'CL-006',
  'menus-pvc-menus': 'MN-001',
  'menus-laminated-menus': 'MN-002',
  'menus-hardcover-menus': 'MN-003',
  'menus-drink-menus': 'MN-004',
  'menus-disposable-menus': 'MN-005',
  'banners-outdoor-vinyl-banners': 'BN-001',
  'banners-roll-up-banners': 'BN-002',
  'banners-adhesive-banners': 'BN-003',
  'banners-vehicle-wraps': 'BN-004',
  'banners-mesh-banners': 'BN-005',
  'books-catalog-printing': 'BK-001',
  'books-saddle-stitch-booklets': 'BK-002',
  'books-perfect-bound-books': 'BK-003',
  'books-hardcover-books': 'BK-004',
  'books-spiral-notebooks': 'BK-005',
  'envelopes-business-envelopes': 'EV-001',
  'envelopes-colored-envelopes': 'EV-002',
  'envelopes-large-envelopes': 'EV-003',
  'envelopes-pearl-envelopes': 'EV-004',
  'educational-exercise-books': 'ED-001',
  'educational-certificates': 'ED-002',
  'educational-school-flyers': 'ED-003',
  'educational-textbooks': 'ED-004',
};

// 反向映射: id -> skuKey
const idToSkuKey = {};
for (const [key, val] of Object.entries(idMap)) {
  idToSkuKey[val] = key;
}

// 2. 读取 products.ts
let content = fs.readFileSync(PRODUCTS_PATH, 'utf8');

// 3. 对每个 product，注入 imagesByLocale 并更新 seoImages.filename
// 策略：找到每个 product 块的 images 行，在其后插入 imagesByLocale
// 同时更新 seoImages.filename 为 WebP 路径

let modifiedCount = 0;
let skippedCount = 0;

for (const [skuKey, langMap] of Object.entries(skuMap)) {
  const skuId = idMap[skuKey];
  if (!skuId) {
    console.log(`⚠ 未找到 SKU ID 映射: ${skuKey}`);
    continue;
  }

  // 构建 imagesByLocale 字符串
  const zhHkPaths = langMap['zh-hk'].map(p => `      '${p}',`).join('\n');
  const enPaths = langMap['en'].map(p => `      '${p}',`).join('\n');
  const jaPaths = langMap['ja'].map(p => `      '${p}',`).join('\n');

  const imagesByLocaleStr = `imagesByLocale: {\n      'zh-hk': [\n${zhHkPaths}\n      ],\n      en: [\n${enPaths}\n      ],\n      ja: [\n${jaPaths}\n      ],\n    },`;

  // 找到这个 SKU 的 product 块
  // 匹配模式：id: 'XX-XXX', ... images: [...],
  const idPattern = new RegExp(`(id: '${skuId}',[\\s\\S]{0,2000}?images: \\[[^\\]]*\\],)`);
  const match = content.match(idPattern);

  if (!match) {
    console.log(`⚠ 未在 products.ts 中找到 SKU: ${skuId}`);
    skippedCount++;
    continue;
  }

  // 检查是否已有 imagesByLocale
  if (content.includes(`id: '${skuId}'`) && content.indexOf(`imagesByLocale`, content.indexOf(`id: '${skuId}'`)) > -1 && content.indexOf(`imagesByLocale`, content.indexOf(`id: '${skuId}'`)) < content.indexOf(`id: '${getNextId(skuId)}'`, content.indexOf(`id: '${skuId}'`) + 1)) {
    // 已存在，跳过
    continue;
  }

  // 在 images 行后面插入 imagesByLocale
  const before = match[1];
  const after = before + '\n    ' + imagesByLocaleStr;
  content = content.replace(before, after);
  modifiedCount++;
}

function getNextId(currentId) {
  const ids = Object.values(idMap).sort();
  const idx = ids.indexOf(currentId);
  return idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : 'ZZZ-999';
}

// 4. 保存文件
fs.writeFileSync(PRODUCTS_PATH, content, 'utf8');

console.log(`========================================`);
console.log(`imagesByLocale 注入完成`);
console.log(`========================================`);
console.log(`  成功注入 SKU 数: ${modifiedCount}`);
console.log(`  跳过/未找到: ${skippedCount}`);
console.log(`  WebP 文件总数: ${files.length}`);
console.log(`========================================`);
