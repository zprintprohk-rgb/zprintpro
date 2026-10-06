/**
 * 本地 products.ts vs ja feed 对账 (2026-10-06):
 * 找出 feed 缺失的 SKU + 各品类 slug 分布 + BC-002 标题
 */
const fs = require('fs');
const src = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const skuCodes = [...src.matchAll(/sku_code:\s*'([^']+)'/g)].map((m) => m[1]);
const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const catSlugs = [...src.matchAll(/category_slug:\s*'([^']+)'/g)].map((m) => m[1]);
const dist = {};
for (const c of catSlugs) dist[c] = (dist[c] || 0) + 1;

// BC-002 区块 (thick-400g)
const bc002Idx = src.indexOf("sku_code: 'BC-002'");
const bc002Block = src.slice(bc002Idx, bc002Idx + 1200);
const nameJa = /nameJa:\s*'([^']*)'/.exec(bc002Block);
console.log('products.ts sku_code 数:', skuCodes.length, '| slug 数:', slugs.length);
console.log('BC-002 nameJa:', nameJa ? nameJa[1] : '(未找到)');
console.log('\n品类分布:');
for (const [k, v] of Object.entries(dist)) console.log(`  ${k}: ${v}`);

(async () => {
  const res = await fetch('https://zprintpro.com/api/merchant-feed/ja/');
  const xml = await res.text();
  const feedIds = [...xml.matchAll(/<g:id>([^<]+)<\/g:id>/g)].map((m) => m[1]);
  const missing = skuCodes.filter((s) => !feedIds.includes(s));
  console.log('\nfeed ja ids:', feedIds.length);
  console.log('products.ts 有但 feed 没有的 SKU:', missing.length ? missing.join(', ') : '(无)');
  // 品类词在 feed 里 product_type 的分布
  const pts = {};
  for (const m of xml.matchAll(/<g:product_type>([^<]+)<\/g:product_type>/g)) pts[m[1]] = (pts[m[1]] || 0) + 1;
  console.log('feed product_type 分布:', JSON.stringify(pts, null, 0).slice(0, 400));
})();
