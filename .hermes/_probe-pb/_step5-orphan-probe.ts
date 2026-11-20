/**
 * Step 5 (A) 孤儿交付物审查探针 — 真跑 products 数组 + pricing anchor
 * 用法: npx tsx .hermes/_probe-pb/_step5-orphan-probe.ts
 */
import { products } from '../../src/data/products';
import { getDisplayAnchor } from '../../src/lib/pricing';

const SLUGS = ['catalog-printing', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks'];

console.log('=== 目标 4 SKU 事实源 (products.ts) ===');
for (const s of SLUGS) {
  const p = products.find((x: any) => x.slug === s);
  if (!p) { console.log(`${s}: NOT FOUND`); continue; }
  console.log(
    `${s} | category=${(p as any).category_slug} | minQuantity=${(p as any).minQuantity} | price_range=${JSON.stringify((p as any).price_range)}`
  );
}

console.log('\n=== getDisplayAnchor 命中情况 (4 SKU × 3 locale) ===');
for (const s of SLUGS) {
  for (const loc of ['zh-hk', 'en', 'ja'] as const) {
    const a = getDisplayAnchor(s, loc);
    console.log(`${s} [${loc}] anchor=${a ? JSON.stringify(a) : 'null'}`);
  }
}

console.log('\n=== books 品类全部 SKU ===');
const books = products.filter((p: any) => p.category_slug === 'books');
console.log(`books SKU 数 = ${books.length}`);
for (const p of books as any[]) {
  console.log(`  ${p.slug} | minQuantity=${p.minQuantity}`);
}

console.log('\n=== 全站 specs 栏名 keys 盘点 ===');
const keys = new Map<string, number>();
for (const p of products as any[]) {
  if (!p.specs) continue;
  for (const k of Object.keys(p.specs)) keys.set(k, (keys.get(k) || 0) + 1);
}
for (const [k, n] of [...keys.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${n}`);
