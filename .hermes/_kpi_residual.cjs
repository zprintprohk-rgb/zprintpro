// .hermes/_kpi_residual.cjs
const fs = require('fs');
const c = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const i = c.indexOf('9/4 ja CTR');
console.log('at', i);
console.log(JSON.stringify(c.slice(Math.max(0, i - 220), i + 120)));
// 全仓 CTR 类黑话扫描（客户可见字段）
const files = ['src/data/category-seo-content.ts', 'src/data/sku-seo-data.ts', 'src/data/product-faqs.ts', 'src/data/blog-data/zh-hk.json', 'src/data/blog-data/en.json', 'src/data/blog-data/ja.json'];
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const hits = (t.match(/CTR\s*≥|CTR ≥|\bpos\s?\d|imps\b/gi) || []).length;
  if (hits) console.log(f, 'KPI-ish hits:', hits);
}
