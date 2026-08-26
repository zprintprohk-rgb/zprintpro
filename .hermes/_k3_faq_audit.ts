import { categorySeoContent, getDefaultCategoryContent } from '../src/data/category-seo-content';
import { categories } from '../src/data/products';
const locales = ['zh-hk','en','ja'] as const;
console.log('slug'.padEnd(24), 'zh-hk', 'en', 'ja', '  (faq count, D=default fallback)');
for (const c of categories) {
  const row = locales.map(l => {
    const own = (categorySeoContent as any)[c.slug]?.[l];
    const n = own?.faq?.length;
    if (n) return String(n);
    const d = getDefaultCategoryContent(c.slug, l) as any;
    return d?.faq?.length ? 'D'+d.faq.length : '0';
  });
  console.log(c.slug.padEnd(24), row.join('   '));
}
