/* F1 队列计算 (tsx): zh-hk 左栏 (sku-seo body) < 300 字 → 补齐队列
   用法: npx tsx .hermes/f1-queue-compute.ts
   输出: .hermes/f1-zhhk-queue.json */
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';
import * as fs from 'fs';

const cjk = (s: string) => (s || '').replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '').length;

const queue: any[] = [];
const stats: any = { total: products.length, withEntry: 0, noEntry: 0, thin: 0, ok: 0, lenSum: 0 };

for (const p of products) {
  const seo = skuSeoData[p.slug];
  const body = seo?.seo?.['zh-hk']?.body ?? '';
  const len = cjk(body);
  stats.lenSum += len;
  if (seo?.seo?.['zh-hk']) stats.withEntry++; else stats.noEntry++;
  if (len < 300) {
    stats.thin++;
    queue.push({
      slug: p.slug,
      name: seo?.name?.['zh-hk'] ?? (p as any).name ?? '',
      category_slug: p.category_slug,
      bodyLen: len,
      hasEntry: !!seo,
      seoTitle: seo?.seo?.['zh-hk']?.title ?? '',
      price_range: p.price_range,
      minQuantity: p.minQuantity,
      description: ((p as any).description ?? '').slice(0, 200),
    });
  } else stats.ok++;
}
queue.sort((a, b) => a.bodyLen - b.bodyLen);
fs.writeFileSync('.hermes/f1-zhhk-queue.json', JSON.stringify({ stats, count: queue.length, queue }, null, 1), 'utf8');
console.log('总 SKU:', products.length, '| 有 entry:', stats.withEntry, '| 无 entry:', stats.noEntry);
console.log('薄内容 (<300):', stats.thin, '| 达标:', stats.ok, '| 平均字数:', Math.round(stats.lenSum / products.length));
const byCat: any = {};
for (const q of queue) byCat[q.category_slug] = (byCat[q.category_slug] || 0) + 1;
console.log('按品类:', JSON.stringify(byCat));
console.log('--- 队列前 25 (最薄) ---');
for (const q of queue.slice(0, 25)) console.log(`  ${q.bodyLen}\t${q.slug}\t${q.name}\t[${q.category_slug}]`);
