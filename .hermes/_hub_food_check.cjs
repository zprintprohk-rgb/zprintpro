// .hermes/_hub_food_check.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const i = t.indexOf('const packagingContent');
const j = t.indexOf('const ', i + 20);
const blk = t.slice(i, j);
console.log('packaging block len', blk.length);
const zhK = blk.indexOf("'zh-hk': {");
const enK = blk.indexOf('en: {');
const zh = blk.slice(zhK, enK);
console.log('zh len', zh.length, '| 食品 hits', (zh.match(/食品/g) || []).length);
// 结构键
const keys = [...zh.matchAll(/^\s{4}([a-zA-Z]+):/gm)].map(m => m[1]);
console.log('zh keys:', [...new Set(keys)].join(','));
// 找 sections/paragraphs 数组
const m = zh.match(/sections: \[/);
console.log('has sections:', !!m);
if (m) {
  const s = zh.indexOf('sections: [');
  console.log('sections head:', JSON.stringify(zh.slice(s, s + 400)));
}
