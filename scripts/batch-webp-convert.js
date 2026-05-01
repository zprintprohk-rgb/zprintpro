/**
 * 批量将 JPG 转为 WebP (Quality 50)
 * 输入: F:\新网站压缩后的图片\*.jpg
 * 输出: F:\zprintpro-nextjs\public\images\products\seedream-webp\*.webp
 * 同时生成 SKU 映射报告
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'F:\\新网站压缩后的图片';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'products', 'seedream-webp');
const REPORT_PATH = path.join(__dirname, '..', 'scripts', 'webp-mapping-report.csv');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log('✓ 创建输出目录:', OUTPUT_DIR);
}

// 读取源文件
const files = fs.readdirSync(SOURCE_DIR)
  .filter(f => f.toLowerCase().endsWith('.jpg'))
  .sort();

console.log(`========================================`);
console.log(`批量 WebP 转换 (Quality 50)`);
console.log(`源目录: ${SOURCE_DIR}`);
console.log(`输出目录: ${OUTPUT_DIR}`);
console.log(`总 JPG 文件: ${files.length}`);
console.log(`========================================\n`);

let success = 0;
let skipped = 0;
let failed = 0;
const reportLines = ['文件名,品类,slug,语言,编号,SKU匹配,状态,原大小KB,输出大小KB'];

// SKU 映射表 (从 products.ts 提取)
const skuMap = {
  // Business Cards
  'business-cards-premium-business-cards': 'BC-001',
  'business-cards-thick-business-cards-400g': 'BC-002',
  'business-cards-foil-business-cards': 'BC-003',
  'business-cards-spot-uv-business-cards': 'BC-004',
  'business-cards-matte-business-cards': 'BC-005',
  'business-cards-rounded-corner-cards': 'BC-006',
  // Stickers
  'stickers-waterproof-stickers': 'ST-001',
  'stickers-transparent-stickers': 'ST-002',
  'stickers-removable-stickers': 'ST-003',
  'stickers-small-batch-stickers': 'ST-004',
  'stickers-die-cut-stickers': 'ST-005',
  'stickers-foil-stickers': 'ST-006',
  'stickers-security-stickers': 'ST-007',
  'stickers-fluorescent-stickers': 'ST-008',
  'stickers-fruit-food-label-stickers': 'ST-009',
  // Paper Bags
  'paper-bags-kraft-paper-bags': 'PB-001',
  'paper-bags-white-card-bags': 'PB-002',
  'paper-bags-gift-bags': 'PB-003',
  'paper-bags-eco-paper-bags': 'PB-004',
  'paper-bags-handle-bags': 'PB-005',
  'paper-bags-large-bags': 'PB-007',
  // Flyers
  'flyers-a4-flyers': 'FL-001',
  'flyers-a5-flyers': 'FL-002',
  'flyers-double-sided-flyers': 'FL-003',
  'flyers-folded-leaflets': 'FL-004',
  'flyers-thick-paper-flyers': 'FL-005',
  'flyers-eco-flyers': 'FL-007',
  'flyers-same-day-flyers': 'FL-008',
  // Posters
  'posters-a2-posters': 'PO-001',
  'posters-a1-posters': 'PO-002',
  'posters-outdoor-posters': 'PO-003',
  'posters-display-posters': 'PO-004',
  'posters-art-posters': 'PO-005',
  'posters-adhesive-posters': 'PO-006',
  // Packaging
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
  // Red Packets
  'red-packets-foil-red-packets': 'RP-001',
  'red-packets-embossed-red-packets': 'RP-002',
  'red-packets-custom-red-packets': 'RP-003',
  'red-packets-cartoon-red-packets': 'RP-004',
  'red-packets-eco-red-packets': 'RP-005',
  'red-packets-large-red-packets': 'RP-006',
  // Calendars
  'calendars-wall-calendars': 'CL-001',
  'calendars-desk-calendars': 'CL-002',
  'calendars-custom-calendars': 'CL-003',
  'calendars-mini-calendars': 'CL-004',
  'calendars-photo-frame-calendars': 'CL-005',
  'calendars-magnetic-calendars': 'CL-006',
  // Menus
  'menus-pvc-menus': 'MN-001',
  'menus-laminated-menus': 'MN-002',
  'menus-hardcover-menus': 'MN-003',
  'menus-drink-menus': 'MN-004',
  'menus-disposable-menus': 'MN-005',
  // Banners
  'banners-outdoor-vinyl-banners': 'BN-001',
  'banners-roll-up-banners': 'BN-002',
  'banners-adhesive-banners': 'BN-003',
  'banners-vehicle-wraps': 'BN-004',
  'banners-mesh-banners': 'BN-005',
  // Books
  'books-catalog-printing': 'BK-001',
  'books-saddle-stitch-booklets': 'BK-002',
  'books-perfect-bound-books': 'BK-003',
  'books-hardcover-books': 'BK-004',
  'books-spiral-notebooks': 'BK-005',
  // Envelopes
  'envelopes-business-envelopes': 'EV-001',
  'envelopes-colored-envelopes': 'EV-002',
  'envelopes-large-envelopes': 'EV-003',
  'envelopes-pearl-envelopes': 'EV-004',
  // Educational
  'educational-exercise-books': 'ED-001',
  'educational-certificates': 'ED-002',
  'educational-school-flyers': 'ED-003',
  'educational-textbooks': 'ED-004',
};

function parseFilename(filename) {
  // zprintpro-{category}-{slug}-{lang}-{n}.jpg
  // slug may contain hyphens, lang is one of: zh-hk, en, ja
  const match = filename.match(/^zprintpro-([a-z]+)-(.+)-(zh-hk|en|ja)-(\d+)\.jpg$/i);
  if (!match) return null;
  return {
    category: match[1],
    slug: match[2],
    lang: match[3],
    num: parseInt(match[4], 10),
  };
}

async function main() {
  for (const file of files) {
    const srcPath = path.join(SOURCE_DIR, file);
    const parsed = parseFilename(file);

    // 异常文件：无法解析的文件名
    if (!parsed) {
      console.log(`  ⚠ 异常文件，准备删除: ${file}`);
      try {
        fs.unlinkSync(srcPath);
        skipped++;
        reportLines.push(`${file},,,,,,异常删除,0,0`);
      } catch (err) {
        console.log(`  ✗ 删除失败: ${file} - ${err.message}`);
        failed++;
      }
      continue;
    }

    const skuKey = `${parsed.category}-${parsed.slug}`;
    const skuId = skuMap[skuKey] || 'UNKNOWN';
    const outName = file.replace(/\.jpg$/i, '.webp');
    const outPath = path.join(OUTPUT_DIR, outName);
    const srcStat = fs.statSync(srcPath);
    const srcSizeKB = Math.round(srcStat.size / 1024);

    try {
      await sharp(srcPath)
        .webp({ quality: 50, effort: 4 })
        .toFile(outPath);

      const outStat = fs.statSync(outPath);
      const outSizeKB = Math.round(outStat.size / 1024);
      const ratio = Math.round((1 - outStat.size / srcStat.size) * 100);

      success++;
      reportLines.push(`${file},${parsed.category},${parsed.slug},${parsed.lang},${parsed.num},${skuId},成功,${srcSizeKB},${outSizeKB}`);

      if (success % 20 === 0 || success === 1) {
        process.stdout.write(`\r  处理中: ${success}/${files.length} ...`);
      }
    } catch (err) {
      failed++;
      reportLines.push(`${file},${parsed.category},${parsed.slug},${parsed.lang},${parsed.num},${skuId},失败,${srcSizeKB},0`);
      console.log(`\n  ✗ 转换失败: ${file} - ${err.message}`);
    }
  }

  // 写入报告
  fs.writeFileSync(REPORT_PATH, '\ufeff' + reportLines.join('\n'), 'utf8');

  console.log(`\n\n========================================`);
  console.log(`转换完成`);
  console.log(`========================================`);
  console.log(`  成功: ${success} 张`);
  console.log(`  跳过/删除异常: ${skipped} 张`);
  console.log(`  失败: ${failed} 张`);
  console.log(`  报告: ${REPORT_PATH}`);
  console.log(`  输出目录: ${OUTPUT_DIR}`);
  console.log(`========================================`);
}

main().catch(console.error);
