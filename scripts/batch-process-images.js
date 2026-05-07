const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'F:\\新网站压缩后的图片';
const TARGET_DIR = path.join(__dirname, '..', 'public', 'images', 'products', 'seedream-webp');
const skuMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'sku-map.json'), 'utf-8'));

// Build reverse lookup: baseFilename + locale -> slug
const filenameToSlug = {};
for (const [slug, info] of Object.entries(skuMap)) {
  for (const [locale, baseName] of Object.entries(info.filename)) {
    const key = `${baseName}__${locale}`;
    filenameToSlug[key] = slug;
  }
}

if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR, { recursive: true });

const sourceFiles = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.jpg'));
console.log(`Found ${sourceFiles.length} source JPG files`);

async function processImage(srcPath, outPath) {
  let quality = 80;
  let buf;
  for (let attempt = 0; attempt < 8; attempt++) {
    buf = await sharp(srcPath)
      .resize(1200, 1200, { fit: 'cover', position: 'center' })
      .webp({ quality, effort: 4 })
      .toBuffer();
    const sizeKB = buf.length / 1024;
    if (sizeKB >= 80 && sizeKB <= 100) break;
    if (sizeKB > 100) quality -= 5;
    else quality += 3;
    if (quality < 50) quality = 50;
    if (quality > 95) quality = 95;
  }
  fs.writeFileSync(outPath, buf);
  return buf.length / 1024;
}

async function run() {
  let processed = 0, skipped = 0, errors = [];
  
  for (let i = 0; i < sourceFiles.length; i++) {
    const file = sourceFiles[i];
    // Extract base name: remove -{n}.jpg
    const m = file.match(/^(.+)-(zh-hk|en|ja)-(\d+)\.jpg$/);
    if (!m) { console.log('  Skip format:', file); continue; }
    const baseName = m[1] + '-' + m[2];
    const locale = m[2];
    const num = parseInt(m[3], 10);
    
    const key = `${baseName}__${locale}`;
    const slug = filenameToSlug[key];
    
    if (!slug) {
      console.log('  Skip (no SKU match):', file);
      continue;
    }
    
    // Determine output name
    let outName;
    if (num === 1) {
      outName = baseName + '.webp';
    } else {
      outName = baseName + '-' + num + '.webp';
    }
    
    const srcPath = path.join(SOURCE_DIR, file);
    const outPath = path.join(TARGET_DIR, outName);
    
    if (fs.existsSync(outPath)) {
      const srcStat = fs.statSync(srcPath);
      const outStat = fs.statSync(outPath);
      if (outStat.mtime >= srcStat.mtime) { skipped++; continue; }
    }
    
    try {
      const sizeKB = await processImage(srcPath, outPath);
      processed++;
      if (processed % 50 === 0) {
        console.log(`  ...${processed} processed (last: ${outName} @ ${sizeKB.toFixed(1)}KB)`);
      }
    } catch (err) {
      errors.push({ file, error: err.message });
    }
  }
  
  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors.length}`);
  if (errors.length) console.log('Errors:', errors.slice(0, 5));
}

run().catch(console.error);
