// .hermes/_hubfaq_enja.cjs — en/ja packaging hub FAQ 清单
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const pc = s.indexOf('packagingContent');
const zh = s.indexOf("'zh-hk': {", pc);
const en = zh + s.slice(zh).search(/\n\s{2}(?:'en'|en):\s*\{/);
const ja = en + s.slice(en).search(/\n\s{2}(?:'ja'|ja):\s*\{/);
for (const [loc, a, b] of [['en', en, ja], ['ja', ja, ja + 12000]]) {
  const blk = s.slice(a, b);
  const fi = blk.indexOf('faq:');
  const faq = fi >= 0 ? blk.slice(fi, fi + 6000) : '';
  const qs = [...faq.matchAll(/q:\s*'([^']{0,90})/g)].map(m => m[1]);
  console.log(`\n[${loc}] faqAt=${fi} qCount=${qs.length}`);
  qs.forEach((q, i) => console.log(`  ${i + 1}. ${q.slice(0, 80)}`));
  console.log('  sticker-ish:', qs.filter(q => /sticker|贴纸|貼紙|シール/i.test(q)).length);
}
