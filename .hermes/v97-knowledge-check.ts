import { blogPosts, getBlogPostMetaBySlug } from '../src/data/blog-posts';
import { blogM3Images } from '../src/data/blog-m3-images';

const slugs = ['sticker-guide', 'brand-materials-checklist', 'hong-kong-printing-guide', 'cmyk-guide', 'company-intro', 'sticker-design'];
for (const s of slugs) {
  const p = getBlogPostMetaBySlug(s);
  console.log(`${s}: ${p ? `date=${p.date} cat=${p.categoryKey} zh=${(p.title?.['zh-hk'] || '').slice(0, 30)} | m3=${blogM3Images[s] ? 'YES' : 'NO'}` : 'MISSING'}`);
}
const latest = [...blogPosts].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 6);
console.log('\n最新 6 篇:');
for (const p of latest) console.log(`  ${p.date} ${p.slug} | m3=${blogM3Images[p.slug] ? 'YES' : 'NO'}`);
console.log('\nM3 映射条目数:', Object.keys(blogM3Images).length, '| blog 总篇数:', blogPosts.length);
