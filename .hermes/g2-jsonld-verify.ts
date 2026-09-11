// G2 本地 JSON-LD 结构验证 (2026-09-11): 复刻 page.tsx 合并逻辑, 16 品类 × 3 locale
import { getCategoryBySlug, getProductsByCategory, categories } from '../src/data/products';
import { generateCategoryItemListJsonLd } from '../src/lib/seo/schema-extensions';
import { generateBreadcrumbJsonLd } from '../src/lib/seo';
import { generateFaqSchema } from '../src/components/CategoryPillarContent';
import { getConversionBlocks, getConversionFaqs } from '../src/data/category-conversion-blocks';

const locales = ['zh-hk', 'en', 'ja'] as const;
let fail = 0;
for (const cat of categories) {
  const slug = cat.slug;
  const products = getProductsByCategory(slug);
  if (products.length === 0) continue; // 无产品分类跳过 (非 PLP 网格)
  for (const loc of locales) {
    const category = getCategoryBySlug(slug)!;
    const categoryName = loc === 'zh-hk' ? category.name : loc === 'en' ? (category.nameEn || category.name) : (category.nameJa || category.name);
    const localizedCategoryName = categoryName;
    const itemList = generateCategoryItemListJsonLd(categoryName, products, loc);
    const breadcrumb = generateBreadcrumbJsonLd([{ name: 'Home', url: `https://zprintpro.com/${loc}/` }, { name: categoryName, url: `https://zprintpro.com/${loc}/category/${slug}/` }]);
    const collection = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: localizedCategoryName, url: `https://zprintpro.com/${loc}/category/${slug}/`, mainEntity: itemList };
    // FAQ 合并 (同 page.tsx 逻辑)
    const baseFaq = generateFaqSchema(loc, slug);
    const extraFaqs = getConversionFaqs(slug, loc);
    const quickFaqs = getConversionBlocks(slug, loc)?.quickAnswers ?? [];
    const seen = new Set<string>();
    const isDup = (q: string): boolean => { const k = (q || '').trim().toLowerCase(); if (!k || seen.has(k)) return true; seen.add(k); return false; };
    const mainEntity: unknown[] = [];
    for (const a of quickFaqs) { if (isDup(a.q)) continue; mainEntity.push({ '@type': 'Question', name: a.q, acceptedAnswer: { '@type': 'Answer', text: a.a } }); }
    const baseMain = (baseFaq && (baseFaq as { mainEntity?: Array<{ name?: string }> }).mainEntity) || [];
    for (const q of baseMain) { if (!q.name || isDup(q.name)) continue; mainEntity.push(q); }
    for (const f of extraFaqs) { if (isDup(f.q)) continue; mainEntity.push({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }); }
    const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
    // 验证
    try {
      JSON.parse(JSON.stringify(collection));
      JSON.parse(JSON.stringify(faq));
      JSON.parse(JSON.stringify(breadcrumb));
      const itemListElems = (itemList as { itemListElement?: unknown[] }).itemListElement ?? [];
      const quickCount = quickFaqs.length;
      const faqQuestions = mainEntity.length;
      if (faqQuestions < quickCount) { fail++; console.log(`[FAIL] ${slug}/${loc}: FAQ questions ${faqQuestions} < quickAnswers ${quickCount}`); }
      if (itemListElems.length !== products.length) { fail++; console.log(`[FAIL] ${slug}/${loc}: itemList ${itemListElems.length} != products ${products.length}`); }
      if ((collection as { mainEntity?: unknown }).mainEntity !== itemList) { fail++; console.log(`[FAIL] ${slug}/${loc}: CollectionPage mainEntity not ItemList`); }
    } catch (e) {
      fail++;
      console.log(`[PARSE_FAIL] ${slug}/${loc}: ${(e as Error).message}`);
    }
  }
}
console.log(fail === 0 ? 'ALL JSON-LD OK' : `FAIL=${fail}`);
