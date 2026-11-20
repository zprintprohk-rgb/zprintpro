#!/usr/bin/env node
/* 只读: ④ 现状量化 — sku-seo-data.ts faqs 覆盖度 + 语言判定 (CJK 比例 / 假名检测) */
const fs = require('fs');
const t = fs.readFileSync('F:\\zprintpro-main-tmp\\src\\data\\sku-seo-data.ts', 'utf8');
const ls = t.split(/\r?\n/);
const faqStarts = ls.map((l, i) => [i + 1, l]).filter(([, l]) => /^\s*"faqs":\s*\[/.test(l));
console.log('faqs 数组数 =', faqStarts.length);
let cur = null; const items = [];
ls.forEach((l, i) => {
  const s = l.match(/^  "([a-z0-9-]+)":\s*\{/);
  if (s) cur = s[1];
  const q = l.match(/^\s*"q":\s*"(.*)",\s*$/);
  const a = l.match(/^\s*"a":\s*"(.*)",?\s*$/);
  if (q) items.push({ slug: cur, kind: 'q', line: i + 1, text: q[1] });
  if (a) items.push({ slug: cur, kind: 'a', line: i + 1, text: a[1] });
});
const kana = (s) => (s.match(/[\u3040-\u30ff]/g) || []).length;
const han = (s) => (s.match(/[\u4e00-\u9fff]/g) || []).length;
const stat = { ja: 0, zh: 0, en: 0, other: 0 };
items.forEach(it => {
  const k = kana(it.text), h = han(it.text);
  if (k > 2) stat.ja++; else if (h > 4) stat.zh++; else if (/[A-Za-z]{4,}/.test(it.text)) stat.en++; else stat.other++;
});
console.log('q/a 条目数 =', items.length, '| 语言分布:', JSON.stringify(stat));
console.log('--- 样本 (前 8) ---');
items.slice(0, 8).forEach(it => console.log(`  ${it.slug} L${it.line} [${it.kind}] ${it.text.slice(0, 90)}`));
console.log('\n空 faqs 数组数 =', (t.match(/"faqs":\s*\[\s*\]/g) || []).length);
