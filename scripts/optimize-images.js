const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'F:/新网站压缩后的图片';
const HERO_OUTPUT = 'public/images/hero';
const PRODUCT_OUTPUT = 'public/images/products/seedream-webp';
const MISC_OUTPUT = 'public/images/misc';

// Ensure output dirs exist
[HERO_OUTPUT, PRODUCT_OUTPUT, MISC_OUTPUT].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function classify(filename) {
  const lower = filename.toLowerCase();
  if (/^hero-/.test(lower)) return 'hero';
  if (/^zprintpro-/.test(lower)) return 'product';
  return 'misc';
}

async function processFile(filename) {
  const inputPath = path.join(SOURCE_DIR, filename);
  const baseName = path.basename(filename, path.extname(filename));
  const category = classify(filename);
  let outputDir, targetW, targetH, targetSizeKB, initialQuality;

  if (category === 'hero') {
    outputDir = HERO_OUTPUT;
    targetW = 1320;
    targetH = 400;
    targetSizeKB = 180;
    initialQuality = 85;
  } else if (category === 'product') {
    outputDir = PRODUCT_OUTPUT;
    targetW = 1200;
    targetH = 1200;
    targetSizeKB = 100;
    initialQuality = 80;
  } else {
    outputDir = MISC_OUTPUT;
    targetW = 1200;
    targetH = 1200;
    targetSizeKB = 150;
    initialQuality = 75;
  }

  const outputName = baseName + '.webp';
  const outputPath = path.join(outputDir, outputName);
  const webpPath = outputPath.replace(/\\/g, '/').replace(/^public/, '');

  let quality = initialQuality;
  let attempt = 0;
  let finalSizeKB = 0;

  while (attempt < 5) {
    await sharp(inputPath)
      .resize(targetW, targetH, { fit: 'cover', position: 'center' })
      .webp({ quality })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    finalSizeKB = Math.round(stats.size / 1024);

    if (finalSizeKB <= targetSizeKB || quality <= 50) break;

    quality = Math.max(50, quality - 10);
    attempt++;
  }

  const status = finalSizeKB <= targetSizeKB ? 'OK' : `WARN_OVERSIZE(${finalSizeKB}KB)`;

  return {
    original: filename,
    webp: webpPath,
    category,
    sizeKB: finalSizeKB,
    quality,
    status
  };
}

async function main() {
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  console.log(`Found ${files.length} images to process`);

  const map = [];
  const warnings = [];

  for (const file of files) {
    try {
      const result = await processFile(file);
      map.push(result);
      if (result.status.startsWith('WARN')) {
        warnings.push(`${file} -> ${result.sizeKB}KB (target: ${result.category === 'hero' ? 180 : result.category === 'product' ? 100 : 150}KB)`);
      }
      console.log(`[${result.status}] ${file} -> ${result.webp} (${result.sizeKB}KB, q=${result.quality})`);
    } catch (err) {
      console.error(`[ERROR] ${file}:`, err.message);
      map.push({ original: file, error: err.message });
    }
  }

  // Check for duplicate source images mapped to same logical product
  // Group by category-subcategory extracted from filename
  const productGroups = {};
  map.forEach(item => {
    if (item.category !== 'product' || item.error) return;
    // Parse zprintpro-{category}-{subcategory}-{locale}-{number}.ext
    const m = item.original.match(/^zprintpro-([^-]+)-([^-]+)-([^-]+)-(\d+)/i);
    if (m) {
      const key = `${m[1]}/${m[2]}`;
      if (!productGroups[key]) productGroups[key] = [];
      productGroups[key].push(item.original);
    }
  });

  // Write image map
  fs.writeFileSync('public/images/image-map.json', JSON.stringify({
    processedAt: new Date().toISOString(),
    total: map.length,
    heroCount: map.filter(m => m.category === 'hero').length,
    productCount: map.filter(m => m.category === 'product').length,
    miscCount: map.filter(m => m.category === 'misc').length,
    okCount: map.filter(m => m.status === 'OK').length,
    warnCount: map.filter(m => m.status && m.status.startsWith('WARN')).length,
    errorCount: map.filter(m => m.error).length,
    warnings,
    productGroups,
    map
  }, null, 2));

  console.log('\n=== SUMMARY ===');
  console.log(`Total processed: ${map.length}`);
  console.log(`Hero: ${map.filter(m => m.category === 'hero').length}`);
  console.log(`Product: ${map.filter(m => m.category === 'product').length}`);
  console.log(`Misc: ${map.filter(m => m.category === 'misc').length}`);
  console.log(`OK: ${map.filter(m => m.status === 'OK').length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log(`Errors: ${map.filter(m => m.error).length}`);
  if (warnings.length) {
    console.log('\nWarnings:');
    warnings.forEach(w => console.log('  -', w));
  }
}

main().catch(console.error);
