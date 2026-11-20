// 取证: small-bags 在 products.ts 的完整记录片段 (判定 nameJa 是否真缺失)
const fs = require('node:fs');
const s = fs.readFileSync('src/data/products.ts', 'utf8');
const i = s.indexOf("slug: 'small-bags'");
console.log('slug 位置 = ' + i);
if (i < 0) { console.log('未找到 small-bags'); process.exit(0); }
const seg = s.slice(i - 60, i + 900);
console.log('---- 原始片段 (换行保留) ----');
console.log(seg);
console.log('\n---- nameJa 匹配 ----');
const m = seg.match(/nameJa:\s*'((?:[^'\\]|\\.)*)'/);
console.log(m ? m[1] : '(片段内无 nameJa)');
