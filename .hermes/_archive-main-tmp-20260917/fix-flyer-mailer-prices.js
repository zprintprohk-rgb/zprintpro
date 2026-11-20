// zh-hk flyers + mailer-boxes 价格修复 (2026-07-18, user 拍板)
// 依据: intuan 专版实询 ×1.3 锚 — A4 单张 HK$311/1000, 微坑盒 HK$1.93/个(500档)
const fs = require('fs');
const p = 'src/data/products.ts';
let src = fs.readFileSync(p, 'utf-8');
const reps = [
  // [slug, oldBlock, newBlock]
  ["a4-flyers",
   "price_range: 'HK$0.22-0.80/張',\n    basePrice: 0.22,",
   "price_range: 'HK$0.35-0.95/張',\n    basePrice: 0.35,"],
  ["a5-flyers",
   "price_range: 'HK$0.18-0.65/張',\n    basePrice: 0.18,",
   "price_range: 'HK$0.25-0.65/張',\n    basePrice: 0.25,"],
  ["double-sided-flyers",
   "price_range: 'HK$0.27-0.95/張',\n    basePrice: 0.27,\n    basePrice_en: 0.65,",
   "price_range: 'HK$0.40-0.95/張',\n    basePrice: 0.40,\n    basePrice_en: 0.65,"],
  ["folded-leaflets",
   "price_range: 'HK$0.55-1.95/張',\n    basePrice: 0.55,",
   "price_range: 'HK$0.70-1.95/張',\n    basePrice: 0.70,"],
  ["thick-paper-flyers",
   "price_range: 'HK$0.35-1.20/張',\n    basePrice: 0.35,",
   "price_range: 'HK$0.45-1.20/張',\n    basePrice: 0.45,"],
  ["eco-flyers",
   "price_range: 'HK$0.27-0.95/張',\n    basePrice: 0.27,\n    basePrice_en: 0.6,",
   "price_range: 'HK$0.38-0.95/張',\n    basePrice: 0.38,\n    basePrice_en: 0.6,"],
  ["same-day-flyers",
   "price_range: 'HK$0.40-1.50/張',\n    basePrice: 0.4,",
   "price_range: 'HK$0.55-1.50/張',\n    basePrice: 0.55,"],
  ["mailer-boxes",
   "price_range: 'HK$1.8-10/個',\n    basePrice: 1.8,\n    basePrice_en: 0.55,\n    basePrice_ja: 74,",
   "price_range: 'HK$3.5-10/個',\n    basePrice: 3.5,\n    basePrice_en: 0.8,\n    basePrice_ja: 105,"],
];
for (const [slug, oldB, newB] of reps) {
  const n = src.split(oldB).length - 1;
  if (n !== 1) { console.error(`FAIL ${slug}: ${n} occurrences`); process.exit(1); }
  src = src.replace(oldB, newB);
  console.log(`OK ${slug}`);
}
fs.writeFileSync(p, src, 'utf-8');
console.log('written', p);
