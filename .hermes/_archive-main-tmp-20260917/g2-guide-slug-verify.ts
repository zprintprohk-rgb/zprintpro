// 校验 guide links 里可疑 slug + 找替代候选
import { getAllBlogPostSlugs, getBlogPostMetaBySlug } from '../src/data/blog-posts';

const check = ['3d-pop-up-card-guide', 'holiday-card-printing-guide', 'restaurant-opening-flyer-printing-guide', 'corporate-gift-calendar-q4-guide', 'wedding-table-card-printing-guide', 'wedding-place-card-guide', 'pvc-card-printing-guide'];
const all = getAllBlogPostSlugs();
console.log('=== 存在性 ===');
for (const s of check) {
  console.log(`${all.includes(s) ? 'EXISTS ' : '**MISSING**'} ${s}`);
}
console.log('\n=== 替代候选 (pop-up / 立體卡 / 席卡 / 枱卡) ===');
for (const s of all) {
  if (/pop-up|popup|3d|place-card|table-card|seat|card-guide|pvc-card/i.test(s)) {
    const t = getBlogPostMetaBySlug(s)?.title?.['zh-hk'] ?? '';
    console.log(`${s} | ${t}`);
  }
}
