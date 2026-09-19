// 只读: 用 page.tsx 的生产正则逐个测试 5 Pillar × 3 locale 的 FAQ 可解析性
import fs from 'fs';
const regex = /<p><strong>Q[0-9]*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)\s*A[0-9]*[:：]\s*([\s\S]*?)<\/p>/gi;
const slugs = [
  'packaging-box-pricing-2026',
  'sticker-material-pvc-vinyl-removable',
  'poster-printing-guide',
  'campus-education-printing-pillar-guide',
  'foil-stamping-3-applications-2026',
];
// 宽松法 (第二方法): 任何带 class 的 <p ...><strong>Q..:</strong>
const loose = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：][\s\S]*?<\/p>/gi;
for (const loc of ['zh-hk', 'en', 'ja']) {
  const data = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  for (const slug of slugs) {
    const c = (data[slug] || {}).content || '';
    const prod = (c.match(regex) || []).length;
    const lo = (c.match(loose) || []).length;
    const faqField = Array.isArray((data[slug] || {}).faq) ? data[slug].faq.length : ((data[slug] || {}).faq ? 'obj' : 0);
    console.log(`${loc}\t${slug}\tprodRegex=${prod}\tlooseRegex=${lo}\tfaqField=${faqField}`);
  }
}
