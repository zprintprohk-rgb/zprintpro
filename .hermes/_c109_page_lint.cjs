const fs = require('fs');
const p = 'src/app/[locale]/comiket-c109/page.tsx';
const t = fs.readFileSync(p, 'utf8');
const checks = [
  ['ja 禁「份」', /份/.test(t)],
  ['GSC 黑话', /GSC|\bimps\b|\bpos\s?\d/i.test(t)],
  ['智印印港 错字', /智印印港/.test(t)],
  ['双品牌同现', /智印港\s*ZprintPro|ZprintPro\s*智印港/.test(t)],
  ['C107 残留', /C107/.test(t)],
  ['C109 口径', /C109/.test(t)],
  ['12-29 日期', /12 月 29|December 29|12 月 29-31/.test(t)],
  ['空 SGS 主张', /SGS/.test(t)],
];
checks.forEach(([n, hit]) => console.log(`${hit ? 'HIT ' : 'clean'} ${n}`));
// 字数粗算
const cjk = (t.match(/[\u4e00-\u9fff]/g) || []).length;
console.log('CJK chars in file:', cjk);
