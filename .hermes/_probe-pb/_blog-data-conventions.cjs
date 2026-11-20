'use strict';
/** 核对 en.json 内嵌 JSON-LD 惯例 (供 Etsy 篇对齐) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const EN = JSON.parse(fs.readFileSync(path.join(REPO, 'src', 'data', 'blog-data', 'en.json'), 'utf8'));

const keys = Object.keys(EN);
let withLd = 0, withoutLd = 0;
const sample = [];
for (const k of keys) {
  const c = EN[k].content || '';
  if (c.includes('application/ld+json')) { withLd++; if (sample.length < 2) sample.push(k); }
  else withoutLd++;
}
console.log(`=== 内嵌 JSON-LD 覆盖 ===`);
console.log(`  含 JSON-LD: ${withLd} / ${keys.length}`);
console.log(`  不含:      ${withoutLd}`);
console.log(`  样例: ${sample.join(', ')}`);

if (sample[0]) {
  const c = EN[sample[0]].content;
  const i = c.indexOf('<script type="application/ld+json">');
  const seg = c.slice(i, c.indexOf('</script>', i) + 9);
  console.log(`\n=== 样例原文 (${sample[0]}) ===`);
  console.log(seg.slice(0, 1400));
}

// 结构统计: 常见 H2 数 / FAQ 块 / author / Data sources
console.log('\n=== 结构惯例统计 (全部 en 篇目) ===');
const stat = { h2: 0, faq: 0, author: 0, sources: 0, cta: 0 };
let n = 0;
for (const k of keys) {
  const c = EN[k].content || '';
  if (!c) continue;
  n++;
  if ((c.match(/<h2/g) || []).length >= 4) stat.h2++;
  if (/Frequently asked questions|FAQ/i.test(c)) stat.faq++;
  if (/Author team|author/i.test(c)) stat.author++;
  if (/Data sources|Sources:/i.test(c)) stat.sources++;
  if (/WhatsApp|instant quote/i.test(c)) stat.cta++;
}
console.log(`  有内容的篇目: ${n}`);
Object.entries(stat).forEach(([k, v]) => console.log(`  ${k}: ${v} (${(v / n * 100).toFixed(0)}%)`));
