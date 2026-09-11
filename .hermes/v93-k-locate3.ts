import fs from 'fs';

// 1) customH1Map 里 packaging 项
const page = fs.readFileSync('src/app/[locale]/category/[slug]/page.tsx', 'utf8');
const i = page.indexOf('customH1Map');
console.log('=== customH1Map 片段 ===');
console.log(page.slice(i, i + 1200).replace(/\n\s*/g, ' ').slice(0, 1100));

// 2) food-boxes SKU 结构与 FAQ 字段
const sku = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const k = sku.indexOf('"food-boxes"');
const seg = sku.slice(k, k + 3000);
console.log('\n=== food-boxes 字段探测 ===');
for (const f of ['title', 'description', 'h1', 'keywords', 'body', 'faqs', 'faq']) {
  const has = seg.includes(`"${f}"`);
  console.log(`  ${f}: ${has ? '有' : '无'}`);
}
// 3) PDP FAQ 来源
const pdp = fs.readFileSync('src/app/[locale]/product/[slug]/page.tsx', 'utf8');
const faqLines = pdp.split('\n').map((l, idx) => ({ l: l.trim(), idx: idx + 1 })).filter((x) => /Faq|faq|FAQ/.test(x.l)).slice(0, 12);
console.log('\n=== PDP page FAQ 引用 ===');
for (const x of faqLines) console.log(`  ${x.idx}: ${x.l.slice(0, 120)}`);
