// .hermes/_cat_bounds2.cjs — 行级精确边界 + 落点核验
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const lines = s.split('\n');
const lineOffset = (ln) => lines.slice(0, ln - 1).reduce((a, l) => a + l.length + 1, 0);
const a = lineOffset(82), b = lineOffset(419);
const blk = s.slice(a, b);
console.log('packaging chars', a, '->', b, 'len', blk.length);
const zh = blk.indexOf("'zh-hk': {");
const en = blk.search(/\n\s*'?en'?:\s*\{/);
const ja = blk.search(/\n\s*'?ja'?:\s*\{/);
console.log('zh/en/ja offsets', zh, en, ja);
const sub = { 'zh-hk': blk.slice(zh, en), en: blk.slice(en, ja), ja: blk.slice(ja) };
for (const [loc, x] of Object.entries(sub)) {
  const links = [...new Set([...x.matchAll(/\]\((\/[^)]+)\)/g)].map(m => m[1]))];
  const qs = [...x.matchAll(/q:\s*'([^']{0,60})/g)].map(m => m[1]);
  console.log(`\n[${loc}] len=${x.length} links=${links.length} faqQ=${qs.length}`);
  console.log('  links:', links.join(' '));
  console.log('  q:', qs.slice(0, 3).join(' | '));
  console.log('  stickerQs:', qs.filter(q => /貼紙|sticker|シール/i.test(q)).length,
    '| 裡印Q:', qs.filter(q => /裡印|inner|内側/i.test(q)).length,
    '| priceQ:', qs.filter(q => /價錢|price|料金|cost/i.test(q)).length);
}
