const fs = require('fs');
const ts = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
// .ts 顶层 SKU slug 键数（形如  'slug': { 或 slug: {
const slugs = new Set([...ts.matchAll(/['"]([a-z0-9][a-z0-9-]{5,})['"]\s*:\s*\{/g)].map((m) => m[1]));
const csvRows = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8').split(/\r?\n/).filter((l) => l.trim()).length - 1;
console.log('.ts 唯一 slug 键: ' + slugs.size);
console.log('CSV 数据行: ' + csvRows);
console.log('差值: ' + (slugs.size - csvRows));
const g = fs.readFileSync('scripts/csv-to-sku-seo.mjs', 'utf8');
console.log('\n生成器写出目标: ' + ([...g.matchAll(/(?:writeFileSync|createWriteStream)\(\s*([^,)]+)/g)].map((m) => m[1].trim()).join(' | ') || '(未显式找到)'));
console.log('生成器是否支持 dry/preview/argv: ' + /dry|preview|argv/i.test(g));
console.log('\n=== 各类缺陷分布 ===');
const FILES = [
  'src/data/sku-seo-data.ts', 'src/data/blog-data/zh-hk.json', 'src/data/blog-data/en.json', 'src/data/blog-data/ja.json',
  'src/data/products.ts', 'src/data/blog-posts.ts', 'src/data/buying-guides.ts', 'src/data/category-seo-content.ts', 'src/data/product-faqs.ts',
];
for (const f of FILES) {
  if (!fs.existsSync(f)) { console.log('  (缺) ' + f); continue; }
  const c = fs.readFileSync(f, 'utf8');
  const dup = (c.match(/[\u4e00-\u9fff]{2,12}\/\1/g) || []).length;
  const en = (c.match(/[\u4e00-\u9fff]{2,12}\/[A-Za-z]/g) || []).length;
  console.log('  ' + f.padEnd(38) + ' 重复词=' + String(dup).padStart(3) + '  中文/拉丁混排=' + en);
}
// 空 meta 探测（blog-posts.ts excerpt 空 / blog-data description 空）
console.log('\n=== 空字段探测 ===');
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
let emptyDescZh = [], emptyContent = [];
for (const [k, p] of Object.entries(zh)) {
  if (!p.description || !String(p.description).trim()) emptyDescZh.push(k);
  if (!p.content || !String(p.content).trim()) emptyContent.push(k);
}
console.log('  zh-hk blog-data description 为空: ' + emptyDescZh.length + (emptyDescZh.length ? ' → ' + emptyDescZh.slice(0, 8).join(', ') : ''));
console.log('  zh-hk blog-data content 为空: ' + emptyContent.length);
const bp = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
console.log('  blog-posts.ts 中 excerpt 为空对象: ' + (bp.match(/excerpt:\s*\{\s*\}/g) || []).length);
