'use strict';
/** 波 1 精确判定: 哪些命中真的落在 **en 值** 内 (只读) —— 避免误改 zh-hk/ja 块的合法中文 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const i18n = require(path.join(REPO, 'scripts', 'guards', 'i18n-guard.js'));

const FILES = [
  'src/data/blog-data/en.json',
  'src/data/category-seo-content.ts',
  'src/data/sku-seo-data.ts',
  'src/data/buying-guides.ts',
  'src/data/blog-posts.ts',
  'src/app/[locale]/category/[slug]/page.tsx',
];

console.log('=== 门童口径 I18N_POLLUTION_EN 命中逐条定位 ===\n');
const perFile = {};
for (const rel of FILES) {
  const p = path.join(REPO, rel);
  const content = fs.readFileSync(p, 'utf8');
  const hits = i18n.scanBidirectional(content, p).filter(h => h.ruleId === 'I18N_POLLUTION_EN');
  if (!hits.length) { console.log(`  ${rel}: 0`); continue; }
  perFile[rel] = hits.length;
  console.log(`\n##### ${rel} — ${hits.length} 字符 #####`);
  // 按行聚合
  const byLine = {};
  hits.forEach(h => { byLine[h.line] = (byLine[h.line] || []); byLine[h.line].push(h.char); });
  const lines = content.split('\n');
  Object.entries(byLine).sort((a, b) => a[0] - b[0]).forEach(([ln, chars]) => {
    const L = lines[ln - 1] || '';
    console.log(`  L${ln}  [${chars.join('')}]  ${JSON.stringify(L.trim().slice(0, 150))}`);
  });
}
console.log('\n=== 小计 ===');
Object.entries(perFile).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
console.log(`  合计 ${Object.values(perFile).reduce((a, b) => a + b, 0)} 字符`);
