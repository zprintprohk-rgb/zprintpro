/* 校验: 未入 F3 队列的 SKU 确实 ≥180 ja 词 */
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';
import * as fs from 'fs';
import * as path from 'path';

const jaWc = (s: string): number => {
  if (!s) return 0;
  const seg = new Intl.Segmenter('ja', { granularity: 'word' });
  return [...seg.segment(s.replace(/\*\*[^*]+\*\*/g, ''))].filter((x) => x.isWordLike).length;
};
const packetSlugs = new Set(fs.readdirSync(path.resolve(__dirname, 'f3-packets')).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', '')));
let skipped = 0, under = 0;
const underList: string[] = [];
for (const p of products) {
  if (packetSlugs.has(p.slug)) continue;
  skipped++;
  const b = skuSeoData?.[p.slug]?.seo?.ja?.body;
  const n = jaWc(b);
  if (n < 180) { under++; underList.push(`${p.slug}:${n}`); }
}
console.log(`skipped(≥180 by segmenter): ${skipped}, 其中仍 <180: ${under}`, underList);
