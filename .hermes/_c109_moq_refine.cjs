const fs = require('fs');
const p = 'src/app/[locale]/comiket-c109/page.tsx';
let t = fs.readFileSync(p, 'utf8');
const reps = [
  ["'ポスター・カード類：1 部から'", "'ポスター・カード類：1 部から（A2 オフセットは 10 枚から）'"],
  ["'Posters and cards: from 1 piece'", "'Posters and cards: from 1 sheet (A2 offset runs start at 10)'"],
  ["'海報、卡片：1 張起印'", "'海報、卡片：1 張起印（A2 柯式為 10 張起）'"],
];
let applied = 0;
for (const [a, b] of reps) {
  const n = t.split(a).length - 1;
  if (n !== 1) { console.log('MISS', a.slice(0, 24), n); continue; }
  t = t.replace(a, b);
  applied++;
}
fs.writeFileSync(p, t, 'utf8');
console.log('applied', applied, '/3');
