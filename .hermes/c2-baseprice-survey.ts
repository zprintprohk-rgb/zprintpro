/* 裁决3.3 调查: basePrice 语义 (Offer price 真实性) */
import { products } from '../src/data/products';
for (const slug of ['waterproof-stickers', 'foil-wedding-invitations', 'catalog-printing', 'white-card-boxes', 'a4-flyers']) {
  const p = products.find((x) => x.slug === slug);
  console.log(slug, '| basePrice=', (p as any).basePrice, '| price_range=', (p as any).price_range, '| minQuantity=', (p as any).minQuantity);
}
console.log('--- 全站 basePrice 缺失 SKU 数 ---');
console.log(products.filter((p) => !(p as any).basePrice).map((p) => p.slug).join(', ') || '(全部有 basePrice)');
