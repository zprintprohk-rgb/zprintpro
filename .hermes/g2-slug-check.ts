// 验证 GUIDE_BLOG_SLUG 16 个 slug 运行时均可解析 (getBlogPostMetaBySlug)
import { getBlogPostMetaBySlug } from '../src/data/blog-posts';
const slugs = ['sticker-material-pvc-vinyl-removable', 'kraft-paper-box-types-comparison-2026', 'a5-vs-a6-flyer-size', 'poster-size-guide', 'apparel-shopping-bag-printing-guide', 'print-specifications-reference-guide-2026', 'graduation-yearbook-printing-guide', 'restaurant-menu-printing-guide', 'large-envelope-printing-c4-c5', 'calendar-printing-guide', 'wedding-red-packet-printing-guide', 'trade-show-banner-printing-guide', 'doujin-circle-printing-guide', 'foil-stamping-3-applications-2026', 'wedding-invitation-envelope-printing-guide'];
let bad = 0;
for (const s of slugs) {
  const p = getBlogPostMetaBySlug(s);
  const zh = p?.title?.['zh-hk'];
  const en = p?.title?.['en'];
  const ja = p?.title?.['ja'];
  if (!p) { bad++; console.log(`[MISSING] ${s}`); continue; }
  if (!zh || !en || !ja) { bad++; console.log(`[TITLE缺locale] ${s} zh=${!!zh} en=${!!en} ja=${!!ja}`); }
  console.log(`OK ${s} | zh:${(zh||'').slice(0,16)} en:${(en||'').slice(0,16)} ja:${(ja||'').slice(0,16)}`);
}
console.log(bad === 0 ? 'ALL 15 SLUGS OK' : `BAD=${bad}`);
