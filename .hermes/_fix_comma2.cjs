const fs = require('fs');
const p = 'src/data/category-seo-content.ts';
let t = fs.readFileSync(p, 'utf8');
const i = t.indexOf('食品包裝專節');
const ctx = t.slice(i - 120, i);
console.log('JSON:', JSON.stringify(ctx));
// 找出 "]," 之后紧跟换行 + 空白 + "," 的模式
const m = ctx.match(/(\]|')\s*,\s*$/);
console.log('tail match:', m ? JSON.stringify(m[0]) : 'none');
// 打印前后字符码
console.log([...ctx.slice(-12)].map(c => c.charCodeAt(0)).join(','));
