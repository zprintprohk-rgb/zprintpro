import { getAllBlogPostSlugs } from '../src/data/blog-posts';
const all = new Set(getAllBlogPostSlugs());
const check = ['sticker-guide', 'brand-materials-checklist', 'hong-kong-printing-guide', 'cmyk-guide', 'company-intro', 'sticker-design'];
for (const s of check) console.log((all.has(s) ? 'EXISTS ' : 'MISSING') + ' ' + s);
console.log('blog 总篇数:', all.size);
