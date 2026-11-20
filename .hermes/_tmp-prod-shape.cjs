// 取证: products.ts 的导出形态 + slug 锚点实况 (决定孤儿审计能否用行级锚)
const fs = require('node:fs');
const s = fs.readFileSync('src/data/products.ts', 'utf8');

console.log('=== 1) export 行 (前 6 个) ===');
[...s.matchAll(/^export .*$/gm)].slice(0, 6).forEach((m) => console.log('   L' + (s.slice(0, m.index).split('\n').length) + ': ' + m[0].slice(0, 120)));

console.log('\n=== 2) slug 行级锚命中 (任意缩进 + 行尾逗号) ===');
const A = [...s.matchAll(/^\s*slug: '([a-z0-9_-]+)',\s*$/gm)];
console.log(`   命中 ${A.length} 个`);
const byIndent = {};
for (const m of A) {
  const ind = m[0].match(/^(\s*)/)[1].length;
  byIndent[ind] = (byIndent[ind] || 0) + 1;
}
console.log('   按缩进分布: ' + JSON.stringify(byIndent));

console.log('\n=== 3) 值级锚多出来的 16 个是什么 (非产品记录?) ===');
const B = [...new Set([...s.matchAll(/\bslug:\s*['"]([a-z0-9_-]+)['"]/g)].map((m) => m[1]))];
const onlyB = B.filter((x) => !A.map((m) => m[1]).includes(x));
console.log('   ' + onlyB.join(', '));
for (const x of onlyB.slice(0, 4)) {
  const i = s.indexOf(`slug: '${x}'`);
  const ctx = s.slice(Math.max(0, i - 160), i + 60).replace(/\s+/g, ' ');
  console.log(`   [${x}] 上文: …${ctx.slice(-150)}`);
}

console.log('\n=== 4) 记录分隔符假设检验: 每个 slug 前面最近的标识 ===');
const firstSlugs = A.slice(0, 3).map((m) => ({ slug: m[1], i: m.index }));
for (const { slug, i } of firstSlugs) {
  const before = s.slice(Math.max(0, i - 120), i);
  console.log(`   [${slug}] 前 120 字符: …${before.replace(/\s+/g, ' ').slice(-110)}`);
}
