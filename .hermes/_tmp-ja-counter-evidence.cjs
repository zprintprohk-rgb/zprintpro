// 取证: ja 段是否出现中文量词「份」(判定 drink-menus ja 标题争议)
//   争议: 并发车道 43945538 主张「10枚〜 → 10份〜」(依据: unitLabel=份 + 同记录 description/body 写「10 份」)
//         我方主张「份」是中文量词, 日文应为 枚
//   判据: 若全仓 ja 段**从不**用「份」, 则该写法是孤例 = 污染; 若普遍使用, 则是我方误判。
const fs = require('node:fs');
const raw = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const a0 = raw.indexOf('{', raw.indexOf('export const skuSeoData'));
let d = 0, e = -1, i2 = false, es = false, q = '';
for (let i = a0; i < raw.length; i++) {
  const c = raw[i];
  if (i2) { if (es) { es = false; continue; } if (c === '\\') { es = true; continue; } if (c === q) i2 = false; continue; }
  if (c === '"' || c === "'" || c === '`') { i2 = true; q = c; continue; }
  if (c === '{') d++; else if (c === '}') { d--; if (d === 0) { e = i; break; } }
}
const data = new Function('return ' + raw.slice(a0, e + 1))();

console.log('=== 1) drink-menus ja 标题现值 ===');
console.log('   ' + JSON.stringify(data['drink-menus']?.seo?.ja?.title));

console.log('\n=== 2) 全仓 ja 段含中文量词「份」的字段 ===');
let n = 0;
const rows = [];
for (const slug of Object.keys(data)) {
  const s = data[slug].seo?.ja;
  if (!s) continue;
  for (const f of ['title', 'description', 'h1', 'body']) {
    if (typeof s[f] === 'string' && s[f].includes('份')) { n++; rows.push(`${slug}/${f}: ${s[f].slice(0, 90)}`); }
  }
}
console.log(`   命中 ${n} 个字段`);
rows.slice(0, 10).forEach((r) => console.log('      ' + r));

console.log('\n=== 3) 对照: ja 段正确量词用法 (枚/部/冊) ===');
for (const [slug, f] of [['drink-menus', 'title'], ['pvc-menus', 'title'], ['hardcover-menus', 'title'], ['pvc-menus', 'body']]) {
  const v = data[slug]?.seo?.ja?.[f] || '';
  const m = v.match(/\d+\s*(枚|部|冊|枚〜|部〜)/g);
  console.log(`   [${slug}/${f}] 量词=${m ? [...new Set(m)].join(',') : '(无)'}`);
}

console.log('\n=== 4) 结论 ===');
console.log(n === 0
  ? '   ja 段**零**使用「份」⇒ drink-menus ja 的「10份〜」是**孤例** = 中文量词污染 (我方修法成立)'
  : `   ja 段有 ${n} 处用「份」⇒ 需逐条人读, 不能一概判污染`);
