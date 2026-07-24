// convert-product-images.mjs
// Convert source JPGs → ~150KB webp for BK-004 and PKG-016
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SEEDREAM_DIR = 'F:/zprintpro-nextjs/public/images/products/seedream-webp';
const TARGET_KB = 150;

// Mapping: source JPG (from subdir) → target webp name
const BK004_SOURCE = 'F:/zprintpro-nextjs/public/images/products/seedream-webp/香港畢業紀念冊';
const PKG016_SOURCE = 'F:/zprintpro-nextjs/public/images/products/seedream-webp/拼版白卡彩盒';

// BK-004 mappings (source JPG → target webp)
const BK004 = [
  { src: path.join(BK004_SOURCE, 'zprintpro-books-hardcover-books-zh-hk-1.jpg'), dest: 'zprintpro-books-hardcover-books-zh-hk.webp' },
  { src: path.join(BK004_SOURCE, 'zprintpro-books-hardcover-books-zh-hk-2.jpg'), dest: 'zprintpro-books-hardcover-books-zh-hk-2.webp' },
  { src: path.join(BK004_SOURCE, 'zprintpro-books-hardcover-books-zh-hk-3.jpg'), dest: 'zprintpro-books-hardcover-books-zh-hk-3.webp' },
  { src: path.join(BK004_SOURCE, 'zprintpro-books-hardcover-books-en-1.jpg'), dest: 'zprintpro-books-hardcover-books-en.webp' },
  { src: path.join(BK004_SOURCE, 'zprintpro-books-hardcover-books-en-2.jpg'), dest: 'zprintpro-books-hardcover-books-en-2.webp' },
  { src: path.join(BK004_SOURCE, 'zprintpro-books-hardcover-books-en-3.jpg'), dest: 'zprintpro-books-hardcover-books-en-3.webp' },
  { src: path.join(BK004_SOURCE, 'zprintpro-books-hardcover-books-ja-1.jpg'), dest: 'zprintpro-books-hardcover-books-ja.webp' },
  { src: path.join(BK004_SOURCE, 'zprintpro-books-hardcover-books-ja-1-2.jpg'), dest: 'zprintpro-books-hardcover-books-ja-2.webp' },
  { src: path.join(BK004_SOURCE, 'zprintpro-books-hardcover-books-ja-3.jpg'), dest: 'zprintpro-books-hardcover-books-ja-3.webp' },
];

// PKG-016 mappings
const PKG016 = [
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-zh-hk-1.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-zh-hk.webp' },
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-zh-hk-2.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-zh-hk-2.webp' },
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-zh-hk-3.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-zh-hk-3.webp' },
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-zh-hk-4.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-zh-hk-4.webp' },
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-en-1.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-en.webp' },
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-en-2.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-en-2.webp' },
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-en-3.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-en-3.webp' },
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-ja-1.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-ja.webp' },
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-ja-2.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-ja-2.webp' },
  { src: path.join(PKG016_SOURCE, 'zprintpro-packaging-gang-run-card-boxes-ja-3.jpg'), dest: 'zprintpro-packaging-gang-run-card-boxes-ja-3.webp' },
];

async function convert(mapping, label) {
  for (const { src, dest } of mapping) {
    const destPath = path.join(SEEDREAM_DIR, dest);
    
    if (!fs.existsSync(src)) {
      console.log(`[${label}] SKIP (source missing): ${src}`);
      continue;
    }
    
    try {
      // Get original dimensions first
      const metadata = await sharp(src).metadata();
      const srcSize = (fs.statSync(src).size / 1024).toFixed(1);
      
      // Try quality 85 first, adjust if needed
      let quality = 85;
      let buffer = await sharp(src).webp({ quality }).toBuffer();
      let finalSize = (buffer.length / 1024).toFixed(1);
      
      // If over 180KB, reduce quality
      if (buffer.length > 180 * 1024) {
        quality = 75;
        buffer = await sharp(src).webp({ quality }).toBuffer();
        finalSize = (buffer.length / 1024).toFixed(1);
      }
      
      // If still over, more aggressive
      if (buffer.length > 180 * 1024) {
        quality = 65;
        buffer = await sharp(src).webp({ quality }).toBuffer();
        finalSize = (buffer.length / 1024).toFixed(1);
      }
      
      // If under 120KB, increase quality
      if (buffer.length < 120 * 1024 && quality < 90) {
        quality = 90;
        buffer = await sharp(src).webp({ quality }).toBuffer();
        finalSize = (buffer.length / 1024).toFixed(1);
      }
      
      fs.writeFileSync(destPath, buffer);
      console.log(`[${label}] OK: ${dest} | ${srcSize}KB JPG → ${finalSize}KB webp (q=${quality}, ${metadata.width}x${metadata.height})`);
    } catch (err) {
      console.log(`[${label}] FAIL: ${dest} — ${err.message}`);
    }
  }
}

async function main() {
  console.log('=== BK-004 hardcover-books ===');
  await convert(BK004, 'BK-004');
  console.log('');
  console.log('=== PKG-016 gang-run-card-boxes ===');
  await convert(PKG016, 'PKG-016');
  console.log('');
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
