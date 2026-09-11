// 关键核查: 组件实际数据源 categorySeoContent[slug][locale] 的 buyingGuide.links
import { categorySeoContent } from '../src/data/category-seo-content';
import { getDefaultCategoryContent } from '../src/data/category-seo-content';

const cats = ['stickers', 'packaging', 'flyers', 'posters', 'paper-bags', 'greeting-cards', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'japan-doujin', 'wedding-invitations', 'place-cards'];
const locales = ['zh-hk', 'en', 'ja'] as const;
let dataLinksTotal = 0;
let noEntry = 0;
for (const cat of cats) {
  for (const loc of locales) {
    const specific = categorySeoContent[cat]?.[loc as 'zh-hk' | 'en' | 'ja'];
    const seo = specific ?? getDefaultCategoryContent(cat, loc);
    const links = seo?.buyingGuide?.links ?? [];
    if (!specific) noEntry++;
    if (links.length > 0) {
      dataLinksTotal++;
      console.log(`[有数据links] ${cat}/${loc}: ${links.map((l) => `${l.label}→${l.href}`).join(' | ')}`);
    }
  }
}
console.log(`统计: 有数据links 的条目=${dataLinksTotal} / 无特定条目(走默认)=${noEntry} / 总 48`);
