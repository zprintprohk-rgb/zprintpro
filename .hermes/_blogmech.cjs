// .hermes/_blogmech.cjs — 列表过滤 + zh-only slug 先例 + articleSlugs 机制
const fs = require('fs');
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/data/blog-data/en.json', 'utf8'));
const ja = JSON.parse(fs.readFileSync('src/data/blog-data/ja.json', 'utf8'));
const zhOnly = Object.keys(zh).filter(k => !en[k]);
const enOnly = Object.keys(en).filter(k => !zh[k]);
const jaOnly = Object.keys(ja).filter(k => !zh[k]);
console.log('zh keys:', Object.keys(zh).length, 'en:', Object.keys(en).length, 'ja:', Object.keys(ja).length);
console.log('zh-only:', zhOnly.length, zhOnly.slice(0, 8).join(','));
console.log('en-only:', enOnly.length, enOnly.slice(0, 8).join(','));
console.log('ja-only:', jaOnly.length, jaOnly.slice(0, 8).join(','));
// 列表过滤逻辑
const lp = fs.readFileSync('src/app/[locale]/blog/page.tsx', 'utf8');
const ci = lp.indexOf('blogContents');
console.log('--- list usage ---');
console.log(lp.slice(Math.max(0, ci - 300), ci + 500).replace(/\n{2,}/g, '\n'));
