/* F2 数据源深度调查: specs en 值 + conversion-blocks 覆盖 + thin 队列精确清单 */
import { products, categories } from '../src/data/products';
import { getConversionBlocks } from '../src/data/category-conversion-blocks';
import { skuSeoData } from '../src/data/sku-seo-data';

const wc = (s: string) => (s || '').trim().split(/\s+/).filter(Boolean).length;

// specs 样例 (en 值?)
const wp = products.find(p => p.slug === 'waterproof-stickers');
if (wp) {
  console.log('specs keys:', Object.keys(wp.specs || {}));
  console.log('specs sample:', JSON.stringify(wp.specs).slice(0, 400));
  console.log('features sample:', JSON.stringify(wp.features).slice(0, 300));
  console.log('descriptionEn:', (wp as any).descriptionEn?.slice(0, 200));
}

// conversion-blocks 覆盖 (所有 category × locale)
const catSet = new Set(categories.map(c => c.slug));
console.log('\nconversion-blocks 覆盖:');
for (const c of catSet) {
  const got: string[] = [];
  for (const l of ['zh-hk', 'en', 'ja'] as const) {
    const blk = getConversionBlocks(c, l);
    if (blk?.orderFlow) got.push(l);
  }
  console.log(`  ${c}: ${got.join(',')}`);
}

// thin en 队列精确清单 (按品类分组)
const thin: Record<string, { slug: string; words: number }[]> = {};
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.en?.body;
  const n = wc(b);
  if (n < 180) {
    (thin[p.category_slug] ||= []).push({ slug: p.slug, words: n });
  }
}
console.log('\nF2 thin 队列 (按品类):');
let total = 0;
for (const [cat, list] of Object.entries(thin)) {
  list.sort((a, b) => a.words - b.words);
  console.log(`  ${cat} (${list.length}): ${list.map(x => `${x.slug}(${x.words})`).join(', ')}`);
  total += list.length;
}
console.log('总计:', total);
