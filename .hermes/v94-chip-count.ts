// v9.4 前置: 各 locale 分类计数 (核对胶囊全量显示预期值)
import { blogPosts } from '../src/data/blog-posts';

const keys = ['company-news', 'sticker', 'card', 'packaging', 'printing', 'design', 'branding', 'hongkong', 'buying-guide', 'material', 'industry-trend', 'case-study'];
const counts: Record<string, number> = {};
for (const p of blogPosts) counts[p.categoryKey] = (counts[p.categoryKey] || 0) + 1;
console.log('总篇数:', blogPosts.length);
console.log('分类键计数:');
for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);
console.log('有帖分类数 (胶囊数 = 1 + 此数):', Object.values(counts).filter((v) => v > 0).length);
