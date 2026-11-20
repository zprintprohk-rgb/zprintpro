/**
 * Step 5 (B3) 扫描: category-seo-content.ts 内「整段繁中摘要/FAQ/JSON-LD 串进 en 值」同类残留
 * 判据: en 语系块 (en: { ... }) 内的 q/a/paragraph/title/description 值, 汉字数 >= 8 且不含假名
 * 用法: node .hermes/_probe-pb/_step5-en-cjk-residue.cjs
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const FILE = path.join(ROOT, 'src', 'data', 'category-seo-content.ts');
const lines = fs.readFileSync(FILE, 'utf8').split('\n');

const HAN = /[\u3400-\u9FFF\uF900-\uFAFF]/g;
const KANA = /[\u3040-\u309F\u30A0-\u30FF]/;
const isCjk = (s) => (s.match(HAN) || []).length;

// 定位语系块边界: 顶层的 `  en: {` / `  zh-hk: {` / `  ja: {`
const blocks = [];
let cur = null;
lines.forEach((l, i) => {
  const m = l.match(/^  (zh-hk|en|ja):\s*\{/);
  if (m) { if (cur) cur.end = i; cur = { loc: m[1], start: i + 1, end: lines.length, indent: 2 }; blocks.push(cur); }
});
if (cur) cur.end = lines.length;
// 只保留各 category 内的块: 用「缩排 2 且后面紧跟 faq/coreAdvantages」粗判不便, 直接取所有命中并按最近的上层 category 标号

const hits = [];
lines.forEach((l, i) => {
  const loc = (() => {
    for (const b of blocks) if (i + 1 >= b.start && i + 1 <= b.end) return b.loc;
    return null;
  })();
  if (loc !== 'en') return;
  const m = l.match(/^\s*(q|a|title|description|heading):\s*(['"`])(.*)\2\s*\}?\s*,?\s*$/);
  if (!m) return;
  const val = m[3];
  const n = isCjk(val);
  if (n >= 8 && !KANA.test(val)) hits.push({ line: i + 1, field: m[1], han: n, val });
});

console.log(`file: src/data/category-seo-content.ts`);
console.log(`判据: en 语系块内 q/a/title/description/heading 值, 汉字 >= 8 且无假名`);
console.log(`命中 = ${hits.length} 行\n`);
hits.sort((a, b) => b.han - a.han).forEach(h => {
  console.log(`L${h.line}  [${h.field}] 汉字 ${h.han}`);
  console.log(`   ${h.val.slice(0, 170)}${h.val.length > 170 ? '…' : ''}`);
});

// 行级汉字计数 (对齐 Step 4 §8 的 106 口径)
console.log('\n--- 逐行 CJK 计数 Top 10 (该档全档, 仅 en 块) ---');
const rowCount = [];
lines.forEach((l, i) => {
  const loc = (() => { for (const b of blocks) if (i + 1 >= b.start && i + 1 <= b.end) return b.loc; return null; })();
  if (loc !== 'en') return;
  const n = isCjk(l);
  if (n > 0) rowCount.push({ line: i + 1, n });
});
rowCount.sort((a, b) => b.n - a.n);
rowCount.slice(0, 10).forEach(r => console.log(`  L${r.line}: ${r.n}`));
console.log(`  合计命中字符 ${rowCount.reduce((s, r) => s + r.n, 0)} / 命中行 ${rowCount.length}`);
fs.writeFileSync(path.join(ROOT, '.hermes', '_probe-pb', '_step5-en-residue.json'), JSON.stringify({ hits: hits.map(h => ({ line: h.line, field: h.field, han: h.han })), rowTop: rowCount.slice(0, 10), totalChars: rowCount.reduce((s, r) => s + r.n, 0), totalRows: rowCount.length }, null, 1), 'utf8');
