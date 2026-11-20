'use strict';
/** 勘察 2: 对每个 CJK 命中, 打印其「最近左侧非空白字符 + 最近左侧键名」, 归纳 其他 档的真实形态 */
const fs = require('fs');
const path = require('path');
const P = 'F:/zprintpro-nextjs/';
const guard = require(P + 'scripts/guards/i18n-guard.js');
const common = require(P + 'scripts/guards/common.js');
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/;

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

const out = [];
for (const rel of FILES) {
  const abs = P + rel;
  const c = fs.readFileSync(abs, 'utf8');
  const hits = guard.scanBidirectional(c, abs).filter(h => h.ruleId === 'I18N_POLLUTION_EN');
  // 打印若干示例: 该文件内经 resolveLocale 判 en 的 CJK 命中
  const sample = [];
  const lines = new Set();
  for (const h of hits) {
    if (lines.has(h.line)) continue;
    lines.add(h.line);
    sample.push(h.line);
    if (sample.length >= 6) break;
  }
  out.push('=== ' + rel + '  裸扫 EN 命中=' + hits.length);
  for (const ln of sample) {
    const src = c.split('\n')[ln - 1] || '';
    out.push('  L' + ln + ' loc=' + common.resolveLocale(c, c.split('\n').slice(0, ln - 1).join('\n').length + (src.search(CJK) >= 0 ? src.search(CJK) + 1 : 1), abs));
    out.push('    ' + src.trim().slice(0, 220));
  }
}
fs.writeFileSync(P + '.hermes/_probe-pb/_survey-context.txt', out.join('\n'), 'utf8');
console.log(out.join('\n'));
