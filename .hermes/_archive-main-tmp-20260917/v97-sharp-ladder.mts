import sharp from 'sharp';

const f = 'F:\\zprintpro-en-us-images M3的模型生成的图片\\FL-001\\zprintpro-flyers-a4-flyers-en-hero.webp';
const f2 = 'F:\\zprintpro-en-us-images M3的模型生成的图片\\PO-001\\zprintpro-posters-a2-posters-en-hero.webp';
const LIMIT = 100 * 1024;

for (const src of [f, f2]) {
  console.log('=== ' + src.split('\\').slice(-1)[0]);
  for (const q of [70, 65, 60, 55, 50, 45, 40]) {
    const b = await sharp(src).webp({ quality: q, effort: 5 }).toBuffer();
    console.log(`  q${q} (1200px): ${(b.length / 1024).toFixed(1)}KB ${b.length < LIMIT ? '✅' : ''}`);
  }
  for (const w of [1100, 1000, 900]) {
    const b = await sharp(src).resize({ width: w }).webp({ quality: 80, effort: 5 }).toBuffer();
    console.log(`  w${w} q80: ${(b.length / 1024).toFixed(1)}KB ${b.length < LIMIT ? '✅' : ''}`);
  }
}
