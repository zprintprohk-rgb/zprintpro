// .hermes/_cat_bounds.cjs — 所有类目内容对象边界 + packaging 跨度 + 三处新增落点归属
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const decls = [...s.matchAll(/export const (\w+): Record<string, CategoryLocaleContent>/g)].map(m => ({ name: m[1], off: m.index }));
console.log('category objects:', decls.map(d => `${d.name}@${d.off}`).join(' '));
const i = decls.findIndex(d => d.name === 'packagingContent');
const spanStart = i >= 0 ? decls[i].off : -1;
const spanEnd = i >= 0 && i + 1 < decls.length ? decls[i + 1].off : s.length;
console.log('packagingContent span:', spanStart, '->', spanEnd, 'len', spanEnd - spanStart);
const blk = s.slice(spanStart, spanEnd);
// 三语块边界
const zh = blk.indexOf("'zh-hk': {");
const en = blk.search(/\n\s{2}(?:'en'|en):\s*\{/);
const ja = blk.search(/\n\s{2}(?:'ja'|ja):\s*\{/);
console.log('within packaging: zh', zh, 'en', en, 'ja', ja, 'blockLen', blk.length);
// 落点核验
for (const probe of ['食品包裝印刷完全指南', 'food packaging printing guide', '食品包装印刷ガイド', '20種以上の定型', 'covering all your packaging printing needs', '⑧ 磁吸禮盒']) {
  const k = s.indexOf(probe);
  const where = k < 0 ? 'NOT FOUND' : (k >= spanStart && k < spanEnd ? 'INSIDE packaging' : 'OUTSIDE (offset ' + k + ')');
  console.log(`probe "${probe.slice(0, 22)}" -> ${where}`);
}
