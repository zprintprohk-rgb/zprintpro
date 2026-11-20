const fs = require('fs');
const p = 'src/data/category-seo-content.ts';
let t = fs.readFileSync(p, 'utf8');
const i = t.indexOf('食品包裝專節');
console.log('BEFORE:', JSON.stringify(t.slice(i - 200, i - 30)));
// 修复悬空逗号：'] ,\n      ,\n        ' 形如 "…',\n      ,\n"
const bad = "'\n      ,\n        '";
const cnt = t.split(bad).length - 1;
console.log('bad occurrences:', cnt);
if (cnt === 1) {
  t = t.replace(bad, "'\n        '");
  fs.writeFileSync(p, t, 'utf8');
  console.log('fixed dangling comma');
}
