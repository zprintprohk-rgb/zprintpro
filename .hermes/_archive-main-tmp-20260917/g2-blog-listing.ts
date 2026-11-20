// 列各 BlogCategoryKey 的 blog slug (日期倒序), 供 G2 内链精选
import { getBlogPostsByCategory, type BlogCategoryKey } from '../src/data/blog-posts';
const keys: BlogCategoryKey[] = ['sticker', 'card', 'packaging', 'printing', 'flyers', 'paper-bags', 'posters', 'menus', 'red-packets', 'banners', 'wedding-envelope', 'japan-doujin', 'education', 'calendars', 'design', 'trends'];
for (const k of keys) {
  const posts = getBlogPostsByCategory(k);
  const sorted = [...posts].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  console.log(`[${k}] (${posts.length}):`);
  for (const p of sorted.slice(0, 8)) {
    console.log(`  ${p.date} ${p.slug}  zh:${(p.title['zh-hk'] || '').slice(0, 30)}`);
  }
}
