'use strict';
/** 事实核查: sku-seo-data.ts 的 CJK 字符究竟落在哪些键下; 以及全 8 档的门童 EN 命中 (基线对账) */
const fs = require('fs');
const P = 'F:/zprintpro-nextjs/';
const common = require(P + 'scripts/guards/common.js');
const guard = require(P + 'scripts/guards/i18n-guard.js');

const FILES = [
  'src/data/blog-data/en.json',
  'src/data/category-seo-content.ts',
  'src/data/buying-guides.ts',
  'src/data/sku-seo-data.ts',
  'src/app/[locale]/payment-methods/page.tsx',
  'src/components/layout/Footer.tsx',
  'src/app/[locale]/category/[slug]/page.tsx',
  'src/data/blog-posts.ts',
];

console.log('=== 门童 #4 I18N_POLLUTION_EN 逐档 (裸扫, 未经基线) ===');
let tot = 0;
for (const rel of FILES) {
  const abs = P + rel;
  const c = fs.readFileSync(abs, 'utf8');
  const h = guard.scanBidirectional(c, abs).filter(x => x.ruleId === 'I18N_POLLUTION_EN');
  tot += h.length;
  console.log(rel.padEnd(52) + h.length);
}
console.log('合计 = ' + tot);

console.log('\n=== sku-seo-data.ts: 含 CJK 的行 + 该行结构 ===');
{
  const abs = P + 'src/data/sku-seo-data.ts';
  const c = fs.readFileSync(abs, 'utf8');
  const lines = c.split('\n');
  const cjk = /[\u3400-\u4dbf\u4e00-\u9fff]/;
  const hit = [];
  for (let i = 0; i < lines.length; i++) {
    if (!cjk.test(lines[i])) continue;
    hit.push(i + 1);
  }
  const hits = guard.scanBidirectional(c, abs).filter(x => x.ruleId === 'I18N_POLLUTION_EN');
  console.log('含 CJK 行数 = ' + hit.length + '  (前 20 行号: ' + hit.slice(0, 20).join(',') + ')');
  const hitLines = new Set(hits.map(h => h.line));
  for (const ln of hit.filter(l => hitLines.has(l)).slice(0, 6)) {
    console.log('EN命中 L' + ln + ': ' + lines[ln - 1].trim().slice(0, 200));
    // 往上找最近的键
    for (let k = ln - 1; k >= 0 && k > ln - 30; k--) {
      const mm = lines[k].match(/^\s*["'`]?([A-Za-z_][A-Za-z0-9_]*)["'`]?\s*:/);
      if (mm) { console.log('    ↑最近上键 L' + (k + 1) + ': ' + mm[1]); break; }
    }
  }
}
