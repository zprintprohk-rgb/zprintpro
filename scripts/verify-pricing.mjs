import { getIndependentPrice, convertPriceRangeString } from '../src/lib/pricing.ts';

const testSlugs = [
  'a4-flyers', 'waterproof-stickers', 'a2-posters',
  'gift-boxes', 'kraft-paper-bags', 'premium-business-cards'
];

console.log('=== EN/JA 独立定价验证 ===\n');
for (const slug of testSlugs) {
  const en = getIndependentPrice(slug, 'en');
  const ja = getIndependentPrice(slug, 'ja');
  console.log(slug + ':');
  if (en) console.log('  EN: US$' + en.min + '-' + en.max + '/' + en.unit);
  if (ja) console.log('  JA: ¥' + ja.min + '-' + ja.max + '/' + ja.unit);
  if (!en && !ja) console.log('  (使用 fallback 分级定价)');
}

console.log('\n=== 价格字符串转换对比 ===');
const ranges = [
  { slug: 'a4-flyers', range: 'HK$0.18-0.65/张', cat: 'flyers' },
  { slug: 'waterproof-stickers', range: 'HK$0.22-1.00/张', cat: 'stickers' },
  { slug: 'a2-posters', range: 'HK$10-35/张', cat: 'posters' },
  { slug: 'gift-boxes', range: 'HK$4-25/个', cat: 'packaging' },
  { slug: 'kraft-paper-bags', range: 'HK$3-8/个', cat: 'paper-bags' },
  { slug: 'premium-business-cards', range: 'HK$100-180/100张', cat: 'business-cards' },
];

for (const t of ranges) {
  const enOld = convertPriceRangeString(t.range, 'en', t.cat);
  const enNew = convertPriceRangeString(t.range, 'en', t.cat, t.slug);
  const jaOld = convertPriceRangeString(t.range, 'ja', t.cat);
  const jaNew = convertPriceRangeString(t.range, 'ja', t.cat, t.slug);
  console.log('\n' + t.slug + ' (' + t.range + '):');
  console.log('  EN old: ' + enOld);
  console.log('  EN new: ' + enNew);
  console.log('  JA old: ' + jaOld);
  console.log('  JA new: ' + jaNew);
}
