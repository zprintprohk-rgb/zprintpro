/**
 * v9.3 H 批修正: 只量测 quickAnswers 块 (排除 newFaqs), 并核对 S2 死链清理结果
 */
import fs from 'fs';
import path from 'path';

const ROOT = 'F:\\zprintpro-nextjs';
const SEO = path.join(ROOT, 'src/data/category-seo-content.ts');
const CONV = path.join(ROOT, 'src/data/category-conversion-blocks.ts');

// ── S2 核对 ──
const DEAD = ['3d-pop-up-card-guide', 'holiday-card-printing-guide', 'wedding-place-card-guide', 'pvc-card-printing-guide', 'wedding-table-card-printing-guide', 'wedding-invitation-pricing-guide', 'corporate-gift-calendar-q4-guide'];
const seo = fs.readFileSync(SEO, 'utf8');
console.log('S2 核对:');
for (const d of DEAD) console.log(`  ${d}: 残留 ${(seo.match(new RegExp(d, 'g')) || []).length}`);
console.log(`  /blog/ 链接总数: ${(seo.match(/\/blog\//g) || []).length}`);

// ── S1: 只取 quickAnswers 块 ──
const conv = fs.readFileSync(CONV, 'utf8');
const blocks = [];
let idx = 0;
while (true) {
  const start = conv.indexOf('"quickAnswers"', idx);
  if (start < 0) break;
  const ob = conv.indexOf('[', start);
  let depth = 0, end = -1;
  for (let i = ob; i < conv.length; i++) {
    if (conv[i] === '[') depth++;
    else if (conv[i] === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) break;
  blocks.push({ start, end, body: conv.slice(ob, end + 1) });
  idx = end + 1;
}
console.log(`\nS1: quickAnswers 块数 = ${blocks.length}`);

// locale: 取块之前最近的 "zh-hk"|"en"|"ja" 键
const locOf = (i) => {
  const head = conv.slice(0, i);
  const m = [...head.matchAll(/"(zh-hk|en|ja)"\s*:/g)].pop();
  return m ? m[1] : '?';
};
let over = 0, total = 0;
const rows = [];
for (const b of blocks) {
  const loc = locOf(b.start);
  const re = /"q":\s*"((?:[^"\\]|\\.)*)"[\s\S]{0,30}?"a":\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(b.body))) {
    const a = m[2];
    const len = [...a].length;
    total++;
    if (len > 60) { over++; rows.push({ loc, len, q: m[1].slice(0, 34), a }); }
  }
}
console.log(`  quickAnswers 答案总数 = ${total}, 超 60 字 = ${over}`);
for (const r of rows.sort((a, b) => b.len - a.len)) console.log(`   [${r.loc}] ${r.len}字  Q: ${r.q}`);

// 输出超标答案全文 (供改写)
if (process.env.SHOW_FULL === '1') {
  console.log('\n=== 超标答案全文 ===');
  for (const r of rows) console.log(`\n[${r.loc}] ${r.len}字\nQ: ${r.q}\nA: ${r.a}`);
}
