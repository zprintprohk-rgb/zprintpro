// 找 v5.1 快速答案块的真实 HTML 样板 (div 首段含「快速答案」/「Quick Answer」/「クイック回答」)
const fs = require('fs');
for (const [f, marker] of [['src/data/blog-data/zh-hk.json', '快速答案'], ['src/data/blog-data/en.json', 'Quick Answer'], ['src/data/blog-data/ja.json', 'クイック回答']]) {
  const arr = JSON.parse(fs.readFileSync(f, 'utf8'));
  const list = Object.values(arr);
  let shown = 0;
  for (const p of list) {
    const c = p.content || '';
    const i = c.indexOf(marker);
    if (i === -1) continue;
    // 回溯到最近的 <div
    const d = c.lastIndexOf('<div', i);
    if (d === -1 || i - d > 300) continue;
    console.log('\n########## ' + f + ' :: ' + p.slug + ' (title: ' + String(p.title).slice(0, 70) + ')');
    console.log(c.slice(d, d + 700).replace(/\\"/g, '"'));
    shown++;
    if (shown >= 2) break;
  }
}
