// .hermes/_hubfaq_inspect.cjs — 精确定位 packagingContent zh 块 + faq 条数
const fs = require('fs');
const t = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const start = t.indexOf('packagingContent');
// 找 zh-hk 块起点
const zhI = t.indexOf("'zh-hk': {", start);
const enI = t.indexOf("en: {", zhI);
const block = t.slice(zhI, enI);
console.log('zh block len:', block.length);
console.log('faq arrays:', (block.match(/faq:\s*\[/g) || []).length);
const qs = [...block.matchAll(/q:\s*'([^']{0,80})/g)].map(x => x[1]);
console.log('q count:', qs.length);
qs.forEach((q, i) => console.log((i + 1) + '. ' + q));
// 检查是否有价格带字段/表格价格 (真值对齐检查)
console.log('has featuredSnippet:', block.includes('featuredSnippet'));
const as = [...block.matchAll(/a:\s*'([^']{0,100})/g)].map(x => x[1]).slice(0, 3);
console.log('answer samples:', JSON.stringify(as));
const f = block.indexOf('faq:');
console.log('--- first 2 FAQ raw ---');
console.log(JSON.stringify(block.slice(f, f + 760)));
