// .hermes/_hub_bg_check.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const i = t.indexOf('const packagingContent');
const blk = t.slice(i, t.indexOf('const ', i + 20));
const zhS = blk.indexOf("'zh-hk': {");
const zh = blk.slice(zhS, blk.indexOf('en: {'));
const b = zh.indexOf('buyingGuide');
console.log(JSON.stringify(zh.slice(b, b + 700)));
console.log('\n--- faq head ---');
const f = zh.indexOf('faq: [');
console.log(JSON.stringify(zh.slice(f, f + 300)));
