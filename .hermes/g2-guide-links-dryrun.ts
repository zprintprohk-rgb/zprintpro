// G2 dry-run: 选购指南内链兜底逻辑复刻, 验证 16 品类 × 3 locale 各生成 1 分类 + 1 blog
import { categories as allCategoryDefs } from '../src/data/products';
import { getBlogPostMetaBySlug } from '../src/data/blog-posts';

const GUIDE_SIBLING_CAT: Record<string, string> = {
  stickers: 'packaging', packaging: 'stickers', flyers: 'posters', posters: 'flyers',
  'paper-bags': 'packaging', books: 'educational', educational: 'books', menus: 'flyers',
  envelopes: 'greeting-cards', calendars: 'educational', 'red-packets': 'greeting-cards',
  banners: 'posters', 'japan-doujin': 'stickers', 'greeting-cards': 'red-packets',
  'wedding-invitations': 'greeting-cards', 'place-cards': 'greeting-cards',
};
const GUIDE_BLOG_SLUG: Record<string, string> = {
  stickers: 'sticker-material-pvc-vinyl-removable',
  packaging: 'kraft-paper-box-types-comparison-2026',
  flyers: 'a5-vs-a6-flyer-size',
  posters: 'poster-size-guide',
  'paper-bags': 'apparel-shopping-bag-printing-guide',
  books: 'print-specifications-reference-guide-2026',
  educational: 'graduation-yearbook-printing-guide',
  menus: 'restaurant-menu-printing-guide',
  envelopes: 'large-envelope-printing-c4-c5',
  calendars: 'calendar-printing-guide',
  'red-packets': 'wedding-red-packet-printing-guide',
  banners: 'trade-show-banner-printing-guide',
  'japan-doujin': 'doujin-circle-printing-guide',
  'greeting-cards': 'foil-stamping-3-applications-2026',
  'wedding-invitations': 'wedding-invitation-envelope-printing-guide',
  'place-cards': 'foil-stamping-3-applications-2026',
};
const locales = ['zh-hk', 'en', 'ja'] as const;
let bad = 0;
const missingSlugs = Object.values(GUIDE_BLOG_SLUG).filter((s) => !getBlogPostMetaBySlug(s));
if (missingSlugs.length > 0) { bad++; console.log(`[不存在slug] ${missingSlugs.join(',')}`); }
for (const cat of allCategoryDefs) {
  for (const loc of locales) {
    const links: { label: string; href: string }[] = [];
    const siblingSlug = GUIDE_SIBLING_CAT[cat.slug];
    if (siblingSlug) {
      const sib = allCategoryDefs.find((c) => c.slug === siblingSlug);
      if (sib) {
        const sibName = loc === 'zh-hk' ? sib.name : loc === 'en' ? (sib.nameEn || sib.name) : (sib.nameJa || sib.name);
        links.push({ label: sibName, href: `/${loc}/category/${siblingSlug}/` });
      }
    }
    const blogSlug = GUIDE_BLOG_SLUG[cat.slug];
    if (blogSlug) {
      const post = getBlogPostMetaBySlug(blogSlug);
      if (post) {
        const title = post.title[loc] || post.title['zh-hk'];
        if (title) links.push({ label: title, href: `/${loc}/blog/${post.slug}/` });
      }
    }
    const catLinks = links.filter((l) => l.href.includes('/category/')).length;
    const blogLinks = links.filter((l) => l.href.includes('/blog/')).length;
    if (!(catLinks >= 1 && blogLinks >= 1)) { bad++; console.log(`[缺失] ${cat.slug}/${loc}: ${links.map((l) => l.href).join(',')}`); }
    if (loc === 'zh-hk') console.log(`${cat.slug}: ${links.map((l) => l.href.replace('/zh-hk/', '')).join(' | ')}`);
  }
}
console.log(`done, missing=${bad}`);
