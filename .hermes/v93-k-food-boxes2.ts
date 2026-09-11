import { skuSeoData } from '../src/data/sku-seo-data';

const e = (skuSeoData as Record<string, any>)['food-boxes'];
console.log('顶层字段:', Object.keys(e).join(', '));
console.log('seo locales:', Object.keys(e.seo).join(', '));
for (const loc of Object.keys(e.seo)) {
  const s = e.seo[loc];
  console.log(`\n[seo.${loc}]`);
  console.log(`  title: ${String(s.title || '').slice(0, 220)}`);
  console.log(`  h1: ${String(s.h1 || '').slice(0, 220)}`);
  console.log(`  description: ${String(s.description || '').slice(0, 300)}`);
}
console.log('\nfaqs locales:', Object.keys(e.faqs || {}).join(', '));
const fz = e.faqs?.['zh-hk'];
if (Array.isArray(fz)) {
  console.log('zh-hk FAQ 条数:', fz.length);
  for (const f of fz.slice(0, 3)) console.log(`   Q: ${String(f.q || f.question).slice(0, 60)}`);
}
