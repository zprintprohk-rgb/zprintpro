import sharp from 'sharp';
import fs from 'fs';

const files = [
  'F:\\zprintpro-en-us-images M3的模型生成的图片\\FL-001\\zprintpro-flyers-a4-flyers-en-hero.webp',
  'F:\\zprintpro-en-us-images M3的模型生成的图片\\PK-002\\zprintpro-packaging-cosmetic-boxes-en-detail.webp',
];
for (const f of files) {
  console.log('---', f.split('\\').slice(-2).join('/'), fs.existsSync(f) ? fs.statSync(f).size + 'B' : 'MISSING');
  try {
    const meta = await sharp(f).metadata();
    console.log('   meta:', meta.format, meta.width + 'x' + meta.height, 'hasAlpha=', meta.hasAlpha, 'pages=', meta.pages);
    const out = await sharp(f).webp({ quality: 80, effort: 4 }).toBuffer();
    console.log('   q80 ->', (out.length / 1024).toFixed(1) + 'KB');
  } catch (e) {
    console.log('   ERROR:', String(e).slice(0, 200));
  }
}
