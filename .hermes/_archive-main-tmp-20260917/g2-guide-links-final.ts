// G2.3 终验: 复刻 CategoryPageV9 guideLinks 逻辑, 校验 16 品类 × 3 locale
// 断言: 所有输出 href 的 slug 均存在 (0 死链) + ≥1 分类 + ≥1 blog
import { categorySeoContent, getDefaultCategoryContent } from '../src/data/category-seo-content';
import { categories as allCategoryDefs } from '../src/data/products';
import { getAllBlogPostSlugs, getBlogPostMetaBySlug } from '../src/data/blog-posts';

const GUIDE_SIBLING_CAT: Record<string, string> = {
  stickers: 'packaging', packaging: 'stickers', flyers: 'posters', posters: 'flyers',
  'paper-bags': 'packaging', books: 'educational', educational: 'books', menus: 'flyers',
  envelopes: 'greeting-cards', calendars: 'educational', 'red-packets': 'greeting-cards',
  banners: 'posters', 'japan-doujin': 'stickers', 'greeting-cards': 'red-packets',
  'wedding-invitations': 'greeting-cards', 'place-cards': 'greeting-cards',
};
const GUIDE_BLOG_SLUG: Record<string, string> = {
  stickers: 'sticker-material-pvc-vinyl-removable', packaging: 'kraft-paper-box-types-comparison-2026',
  flyers: 'a5-vs-a6-flyer-size', posters: 'poster-size-guide', 'paper-bags': 'apparel-shopping-bag-printing-guide',
  books: 'print-specifications-reference-guide-2026', educational: 'graduation-yearbook-printing-guide',
  menus: 'restaurant-menu-printing-guide', envelopes: 'large-envelope-printing-c4-c5',
  calendars: 'calendar-printing-guide', 'red-packets': 'wedding-red-packet-printing-guide',
  banners: 'trade-show-banner-printing-guide', 'japan-doujin': 'doujin-circle-printing-guide',
  'greeting-cards': 'foil-stamping-3-applications-2026',
  'wedding-invitations': 'wedding-invitation-envelope-printing-guide', 'place-cards': 'foil-stamping-3-applications-2026',
};

const validBlog = new Set(getAllBlogPostSlugs());
const validCat = new Set(allCategoryDefs.map((c) => c.slug));
const exists = (href: string) => {
  const m = href.match(/\/(blog|category)\/([^/?#]+)\/?$/);
  if (!m) return true;
  return m[1] === 'blog' ? validBlog.has(m[2]) : validCat.has(m[2]);
};

const LOCALES = ['zh-hk', 'en', 'ja'] as const;
const CATS = Object.keys(GUIDE_SIBLING_CAT);
let deadOps = 0, missingCat = 0, missingBlog = 0, filtered = 0;
const filteredList: string[] = [];
for (const slug of CATS) {
  for (const loc of LOCALES) {
    const seo = categorySeoContent[slug]?.[loc] ?? getDefaultCategoryContent(slug, loc);
    const raw = seo?.buyingGuide?.links ?? [];
    const base = raw.filter((l) => { const ok = exists(l.href); if (!ok) { filtered++; filteredList.push(`${slug}/${loc} ${l.href}`); } return ok; });
    const needCat = !base.some((l) => l.href.includes('/category/'));
    const needBlog = !base.some((l) => l.href.includes('/blog/'));
    const out = [...base];
    if (needCat) {
      const s = GUIDE_SIBLING_CAT[slug];
      const sib = allCategoryDefs.find((c) => c.slug === s);
      if (sib) out.push({ label: 'x', href: `/${loc}/category/${s}/` });
    }
    if (needBlog) {
      const bs = GUIDE_BLOG_SLUG[slug];
      const post = bs ? getBlogPostMetaBySlug(bs) : undefined;
      if (post) out.push({ label: 'y', href: `/${loc}/blog/${post.slug}/` });
    }
    for (const l of out) if (!exists(l.href)) deadOps++;
    if (!out.some((l) => l.href.includes('/category/'))) missingCat++;
    if (!out.some((l) => l.href.includes('/blog/'))) missingBlog++;
  }
}
console.log(`组合数: ${CATS.length * 3}`);
console.log(`过滤掉的死链条数: ${filtered}`);
for (const f of filteredList) console.log('  - ' + f);
console.log(`输出中仍存在的死链: ${deadOps}`);
console.log(`缺分类胶囊组合: ${missingCat}`);
console.log(`缺 blog 胶囊组合: ${missingBlog}`);
console.log(deadOps === 0 && missingCat === 0 && missingBlog === 0 ? 'ALL GREEN' : 'FAIL');
