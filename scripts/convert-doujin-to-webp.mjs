/**
 * 将 DoujinSKU 5 张代表图转为 webp，目标 ~100KB
 * 用法：node scripts/convert-doujin-to-webp.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'public', 'images', 'japan');

// 5 个 SKU 的源图 → 目标文件名
const JOBS = [
  { src: 'JA-zprintpro-doujinshi-eco-tote-bag-ja-1.jpg',     out: 'eco-tote-bag.webp' },
  { src: 'zprintpro-doujinshi-acrylic-keychain-ja-1.jpg',   out: 'acrylic-keychain.webp' },
  { src: 'zprintpro-doujinshi-can-badge-ja-1.jpg',          out: 'can-badge.webp' },
  { src: 'zprintpro-doujinshi-doujinshi-printing-ja-1.jpg', out: 'doujinshi-printing.webp' },
  { src: 'zprintpro-doujinshi-postcard-set-ja-1.jpg',       out: 'postcard-set.webp' },
];

// 目标 100KB 左右：先 q=80，看输出大小；太大就降质量
async function convertOne(src, out) {
  const inPath = path.join(SRC, src);
  const outPath = path.join(SRC, out);
  if (!fs.existsSync(inPath)) {
    console.warn(`[skip] missing ${src}`);
    return;
  }
  // 强制 resize 到 1024x1024（webp 友好）
  // 迭代调质量直到 < 110KB
  for (const q of [82, 78, 74, 70, 66, 62, 58, 54]) {
    const buf = await sharp(inPath)
      .resize(1024, 1024, { fit: 'cover', position: 'center' })
      .webp({ quality: q, effort: 6 })
      .toBuffer();
    if (buf.length < 110 * 1024) {
      fs.writeFileSync(outPath, buf);
      console.log(`[OK] ${src} -> ${out} (${(buf.length/1024).toFixed(1)} KB, q=${q})`);
      return;
    }
  }
  // fallback：q=50
  const buf = await sharp(inPath)
    .resize(1024, 1024, { fit: 'cover', position: 'center' })
    .webp({ quality: 50, effort: 6 })
    .toBuffer();
  fs.writeFileSync(outPath, buf);
  console.log(`[OK-fallback] ${src} -> ${out} (${(buf.length/1024).toFixed(1)} KB, q=50)`);
}

(async () => {
  for (const j of JOBS) {
    await convertOne(j.src, j.out);
  }
  console.log('Done. Final files:');
  for (const j of JOBS) {
    const p = path.join(SRC, j.out);
    if (fs.existsSync(p)) {
      const s = fs.statSync(p);
      console.log(`  ${j.out}  ${(s.size/1024).toFixed(1)} KB`);
    }
  }
})();
