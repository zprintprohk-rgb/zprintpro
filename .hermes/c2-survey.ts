/* C2 en PDP 调查: en body 字数 / 价格表 / FAQ / conversion locale / 单位词 */
import { products } from '../src/data/products';
import { getPriceTableForSlug } from '../src/lib/price-injector';
import { getConversionBlocks } from '../src/data/category-conversion-blocks';
import { skuSeoData } from '../src/data/sku-seo-data';
import { getPriceUnitWord } from '../src/lib/pricing';

// 1. en body 字数分布 (sku-seo body en)
const wc = (s: string) => (s || '').trim().split(/\s+/).filter(Boolean).length;
const thin: { slug: string; words: number; table: boolean }[] = [];
let total = 0;
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.en?.body;
  const n = wc(b);
  if (!b) { thin.push({ slug: p.slug, words: 0, table: !!getPriceTableForSlug(p.slug) }); continue; }
  total++;
  if (n < 180) thin.push({ slug: p.slug, words: n, table: !!getPriceTableForSlug(p.slug) });
}
console.log(`en: 有 body SKU=${total}/${products.length}, <180词=${thin.length}`);
thin.sort((a, b) => a.words - b.words);
for (const t of thin.slice(0, 60)) console.log(`  ${t.slug}: ${t.words}词 价格表=${t.table}`);

// 2. 价格表覆盖
const withTable = products.filter(p => !!getPriceTableForSlug(p.slug));
console.log(`\n价格表 SKU: ${withTable.length}`);

// 3. conversion orderFlow locale 抽样
for (const loc of ['zh-hk', 'en', 'ja'] as const) {
  const c = getConversionBlocks('stickers', loc);
  console.log(`conversion stickers ${loc}: title=${c?.orderFlow?.title} steps=${c?.orderFlow?.steps?.length}`);
}

// 4. 单位词抽样
for (const slug of ['waterproof-stickers', 'a4-flyers', 'rigid-boxes', 'kraft-paper-bags', 'greeting-cards']) {
  const p = products.find(x => x.slug === slug);
  if (p) console.log(`unit ${slug}: price_range=${p.price_range} → unitWord=${getPriceUnitWord(p.price_range)}`);
}
