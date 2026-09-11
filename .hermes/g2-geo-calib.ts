// G2 探针 GEO 针校准: 各品类 × locale serviceNodes 文案实际关键词
import { getDefaultCategoryContent } from '../src/data/category-seo-content';
const cats = ['stickers', 'packaging', 'flyers', 'posters', 'paper-bags', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'japan-doujin'];
const locales = ['zh-hk', 'en', 'ja'] as const;
for (const cat of cats) {
  const seo = getDefaultCategoryContent(cat, 'zh-hk');
  const nodes = seo?.serviceNodes?.items ?? [];
  const joined = nodes.map((n) => `${n.title} ${n.description}`).join(' ');
  const hasSf = joined.includes('順豐');
  const hasHk = joined.includes('港九新界') || joined.includes('港島') || joined.includes('九龍');
  const hasDhl = joined.includes('DHL');
  const hasZh = joined.includes('本地') || joined.includes('香港');
  console.log(`${cat}/zh-hk: 順豐=${hasSf} 港区=${hasHk} DHL=${hasDhl} 本地=${hasZh} nodes=${nodes.length} | ${joined.slice(0, 60)}`);
}
