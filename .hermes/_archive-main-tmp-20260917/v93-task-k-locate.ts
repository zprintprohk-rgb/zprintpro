import { categorySeoContent } from '../src/data/category-seo-content';
import { productFaqs } from '../src/data/product-faqs';

// 1) packaging PLP 内容
const pk = (categorySeoContent as Record<string, Record<string, unknown>>)['packaging'];
console.log('packaging PLP locales:', pk ? Object.keys(pk).join(', ') : 'NONE');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const e = pk?.[loc] as { title?: string; metaDescription?: string; h1?: string; description?: string } | undefined;
  if (!e) { console.log(`  [${loc}] 无条目`); continue; }
  console.log(`  [${loc}] title: ${(e.title || '').slice(0, 120)}`);
  console.log(`       meta: ${(e.metaDescription || '').slice(0, 140)}`);
  if (e.h1) console.log(`       h1: ${e.h1.slice(0, 120)}`);
}

// 2) 食品包装 SKU (product-faqs 里的键)
const pfKeys = Object.keys(productFaqs as Record<string, unknown>);
console.log('\nproduct-faqs 键总数:', pfKeys.length);
const foodKeys = pfKeys.filter((k) => /food|食品/i.test(k));
console.log('食品相关键:', foodKeys.join(', ') || '(无)');
for (const k of foodKeys.slice(0, 2)) {
  const v = (productFaqs as Record<string, Array<{ question?: Record<string, string>; answer?: Record<string, string> }>>)[k];
  console.log(`  [${k}] FAQ 条数=${Array.isArray(v) ? v.length : 'n/a'}`);
  if (Array.isArray(v)) for (const f of v.slice(0, 4)) console.log(`     Q(zh): ${(f.question?.['zh-hk'] || '').slice(0, 70)}`);
}
