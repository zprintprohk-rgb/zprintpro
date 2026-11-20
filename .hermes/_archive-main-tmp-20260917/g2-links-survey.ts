// G2 勘察: 内链覆盖 + quickAnswers 字数 (2026-09-11)
import { getConversionBlocks } from '../src/data/category-conversion-blocks';
import { getDefaultCategoryContent } from '../src/data/category-seo-content';

const cats = ['stickers', 'packaging', 'flyers', 'paper-bags', 'posters', 'calendars', 'banners', 'books', 'menus', 'envelopes', 'red-packets', 'educational', 'japan-doujin'];
const locales = ['zh-hk', 'en', 'ja'] as const;

let bad = 0;
for (const cat of cats) {
  for (const loc of locales) {
    const conv = getConversionBlocks(cat, loc);
    const seo = getDefaultCategoryContent(cat, loc);
    const qa = conv?.quickAnswers ?? [];
    const guide = seo?.buyingGuide;
    const links = guide?.links ?? [];
    const catLinks = links.filter((l) => l.href.includes('/category/'));
    const blogLinks = links.filter((l) => l.href.includes('/blog/'));
    const ansLens = qa.map((a) => a.a.length);
    const okLen = ansLens.every((n) => n >= 30 && n <= 80);
    if (!(catLinks.length >= 1 && blogLinks.length >= 1)) {
      bad++;
      console.log(`[内链不足] ${cat}/${loc}: cat=${catLinks.length} blog=${blogLinks.length} links=${links.map((l) => l.href).join(',')}`);
    }
    if (!okLen) {
      bad++;
      console.log(`[字数异常] ${cat}/${loc}: qa=${qa.length} lens=${ansLens.join(',')}`);
    }
    if (qa.length > 0 && qa.length !== 3) {
      bad++;
      console.log(`[答案卡数≠3] ${cat}/${loc}: qa=${qa.length}`);
    }
  }
}
console.log(`scan done, issues=${bad}`);
