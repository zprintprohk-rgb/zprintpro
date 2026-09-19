'use strict';
/**
 * Etsy 篇要件 v2: 用**双口径**核算标题长度 (避免口径歧义)
 *   口径 A「半角字符数」= 字符总数 (ASCII 1 / 全角 1)          <- §5 字面
 *   口径 B「半角当量」  = 全角字符计 2, 半角计 1                <- 传统排版口径
 * 目标区 50-54 (两种口径对纯英文等价; 对含 CJK 标题不同, 故并列显示)
 * 纯 ASCII 下两者恒等 => 只能靠压缩字数达标。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const EN = JSON.parse(fs.readFileSync(path.join(REPO, 'src', 'data', 'blog-data', 'en.json'), 'utf8'));

const lenA = (s) => s.length;
const lenB = (s) => [...s].reduce((n, ch) => n + (/[\u3000-\u9FFF\uFF00-\uFF60]/.test(ch) ? 2 : 1), 0);
const zone = (n) => (n >= 50 && n <= 54 ? '✅ 写满区' : n > 54 ? `⚠️超${n - 54}` : `⚠️缺${50 - n}`);

// 标题候选: 目标 50-54 纯 ASCII (品牌末尾一次)
const TITLES = [
  'Etsy Seller Printing: From 1 Copy, DHL 2-4 Day | ZprintPro',
  'Etsy Printing Guide: 1-Copy Min, FDA Files | ZprintPro',
  'Printing for Etsy Sellers: 1 Copy to Restock | ZprintPro',
  'Etsy Seller Printing: 1 Copy, Free Proof | ZprintPro',
  'Etsy Print Partner: From 1 Copy, 2-4 Day | ZprintPro',
];
console.log('=== 标题候选 (目标 50-54) ===');
TITLES.forEach((t, i) => {
  const a = lenA(t), b = lenB(t);
  console.log(`  [${i + 1}] A=${a}(${zone(a)}) B=${b}(${zone(b)}) 品牌×${(t.match(/ZprintPro/g) || []).length}`);
  console.log(`      ${t}`);
});

// meta description: 目标 150-160
const DESCS = [
  'Etsy sellers: print from 1 copy, no minimum order, free digital proof, DHL 2-4 day restock, and FDA + REACH compliance documents on request.',
  'Selling on Etsy? Order from a single copy with no minimum order, get a free digital proof, DHL 2-4 day restock and FDA + REACH documents.',
  'Etsy sellers can print from 1 copy with no minimum order, free proof, DHL 2-4 day restock, plus FDA and REACH compliance documents on request.',
];
console.log('\n=== meta description 候选 (目标 150-160) ===');
DESCS.forEach((d, i) => {
  const n = d.length;
  console.log(`  [${i + 1}] ${n} ${n >= 150 && n <= 160 ? '✅' : n < 150 ? `⚠️缺${150 - n}` : `⚠️超${n - 160}`}`);
  console.log(`      ${d}`);
});

// 内链: 与 Etsy 卖家最相关的既有篇目 (真实 slug)
console.log('\n=== 内链候选 (真实 slug, 按 Etsy 卖家相关性挑) ===');
const PICK = ['sticker-guide', 'food-packaging-printing-guide', 'paper-bag-printing-guide',
  'packaging-box-custom-guide', 'baby-food-packaging-box-printing-guide', 'pet-food-sticker-printing-guide',
  'cosmetics-packaging-box-printing-guide', 'ip-character-sticker-printing-guide'];
PICK.forEach(s => console.log(`  ${EN[s] ? '✅' : '❌'} /en/blog/${s}/`));

// 合规自检
const all = TITLES.concat(DESCS).join(' ');
const BAD = [[/\bvs\s+Alibaba/i, '竞品名'], [/\b\d{1,3},\d{3}\+/, '量级数字'], [/\b1,?000\+/, '量级数字'],
[/cheapest|guaranteed/i, '绝对化'], [/\d+\s*x\s+cheaper/i, '倍数'], [/\bbest\b/i, '绝对化(best)']];
console.log('\n=== 合规自检 ===');
let hit = 0;
for (const [re, label] of BAD) { const m = all.match(re); if (m) { console.log(`  ⚠️ ${label}: ${m[0]}`); hit++; } }
console.log(hit ? `  => ${hit} 处命中` : '  ✅ 0 命中');

fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'etsy-article-requirements.md'),
  ['# Etsy 篇要件 (en 单语) · 2026-09-19', '',
    '## 标题候选 (目标 50-54)',
    ...TITLES.map(t => `- [${lenA(t)}] ${t}`), '',
    '## meta description 候选 (目标 150-160)',
    ...DESCS.map(d => `- [${d.length}] ${d}`), '',
    '## 内链',
    ...PICK.map(s => `- /en/blog/${s}/`), ''].join('\n'), 'utf8');
console.log('\n落盘: .hermes/_probe-pb/etsy-article-requirements.md');
