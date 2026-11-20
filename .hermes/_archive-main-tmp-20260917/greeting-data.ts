/* 6 贺卡 SKU 深度优化数据提取: products 实数据 + sku-seo 全字段 + GSC 贺卡词 */
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';
import * as fs from 'fs';

const targets = ['premium-greeting-cards', 'thick-greeting-cards-400g', 'foil-greeting-cards',
  'spot-uv-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards'];

for (const p of products) {
  if (!targets.includes(p.slug)) continue;
  const t = p as any;
  console.log(`\n========== ${p.slug} [${p.category_slug}] ==========`);
  console.log(`name: ${t.name}`);
  console.log(`nameEn: ${t.nameEn ?? ''}`);
  console.log(`nameJa: ${t.nameJa ?? ''}`);
  console.log(`title_zh: ${t.title_zh ?? '(无)'}`);
  console.log(`title_en: ${t.title_en ?? '(无)'}`);
  console.log(`title_ja: ${t.title_ja ?? '(无)'}`);
  console.log(`price_range: ${t.price_range ?? '(无)'} | minQuantity: ${t.minQuantity ?? '(无)'}`);
  if (t.specs && typeof t.specs === 'object') console.log(`specs: ${JSON.stringify(t.specs)}`);
  const seo = skuSeoData[p.slug];
  if (seo) {
    for (const loc of ['zh-hk', 'en', 'ja'] as const) {
      const s = seo.seo?.[loc];
      console.log(`  seo[${loc}]: title="${s?.title ?? ''}" | h1="${s?.h1 ?? ''}" | desc=${(s?.description ?? '').length}字 | keywords=${JSON.stringify(s?.keywords ?? [])}`);
    }
    console.log(`  faqs: ${(seo.faqs ?? []).length} 条 | imageAlt: ${JSON.stringify(seo.imageAlt ?? {})}`);
  } else console.log('  seo: (无 sku-seo entry)');
}

// GSC 贺卡/賀年相关词
const hk = JSON.parse(fs.readFileSync('.hermes/hk28d-queries.json', 'utf8'));
const enja = JSON.parse(fs.readFileSync('.hermes/enja28d-queries.json', 'utf8'));
console.log('\n========== GSC 贺卡相关词 ==========');
const pat = /賀卡|賀年|greeting card|card|カード|グリーティング|年賀|クリスマスカード/;
let n = 0;
for (const q of hk) if (pat.test(q.query)) { console.log(`  hk ${q.imp}imp/${q.pos}pos: ${q.query}`); n++; }
for (const q of enja.en) if (pat.test(q.query)) { console.log(`  en ${q.imp}imp/${q.pos}pos: ${q.query}`); n++; }
for (const q of enja.ja) if (pat.test(q.query)) { console.log(`  ja ${q.imp}imp/${q.pos}pos: ${q.query}`); n++; }
console.log(`贺卡相关 GSC 词总数: ${n}`);
