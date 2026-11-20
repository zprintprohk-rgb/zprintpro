'use strict';
/**
 * 诊断: 方法 1 式口径 (resolveLocale) vs 方法 2 式口径 (结构化 en 键值域) 的差额来源
 * 只读, 不改任何生产文件。
 */
const fs = require('fs');
const P = 'F:/zprintpro-nextjs/';
const common = require(P + 'scripts/guards/common.js');

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
const CJK_RE = /[\u3400-\u4dbf\u4e00-\u9fff]/g;

// 立即左邻键名 (结构化键位, 与 common.isInTitleField 同族算法)
const KEY_RE = /(?:^|[\n\r{,;([]\s*)\s*["'\x60]?([A-Za-z_\x24][A-Za-z0-9_\x24]*)["'\x60]?\s*:/g;
function immediateKeyBefore(content, idx) {
  KEY_RE.lastIndex = 0;
  let m, best = null;
  while ((m = KEY_RE.exec(content)) !== null) {
    const valueStart = m.index + m[0].length;
    if (valueStart <= idx) best = { name: m[1], valueStart }; else break;
  }
  return best;
}

const rows = [];
let grand1 = 0, grand2 = 0;
for (const rel of FILES) {
  const abs = P + rel;
  const c = fs.readFileSync(abs, 'utf8');
  let m1chars = 0, m2chars = 0;
  const byImmediateKey = new Map();
  const offside = [];
  CJK_RE.lastIndex = 0;
  let m;
  while ((m = CJK_RE.exec(c)) !== null) {
    const loc = common.resolveLocale(c, m.index, abs);
    if (loc !== 'en') continue;
    if (common.isCommentLine(c, m.index)) continue;
    m1chars++;
    const k = immediateKeyBefore(c, m.index);
    const kn = k ? k.name : '<none>';
    byImmediateKey.set(kn, (byImmediateKey.get(kn) || 0) + 1);
    if (kn === 'en') m2chars++;
    else offside.push({ line: common.findLineNumber(c, m.index), ch: m[0], key: kn });
  }
  grand1 += m1chars; grand2 += m2chars;
  rows.push({ rel, m1chars, m2chars, byImmediateKey, offside });
}

console.log('file'.padEnd(50) + 'M1(resolveLocale)  M2(en键直属)  差');
for (const r of rows) {
  console.log(r.rel.padEnd(50) + String(r.m1chars).padEnd(18) + String(r.m2chars).padEnd(14) + (r.m1chars - r.m2chars));
  const tops = [...r.byImmediateKey.entries()].sort((a, b) => b[1] - a[1]);
  console.log('    立即左键分布: ' + tops.map(([k, n]) => k + '=' + n).join(', '));
}
console.log('\n合计: M1=' + grand1 + '  M2(仅 en 键直属)=' + grand2 + '  差=' + (grand1 - grand2));

// 示例 offside
console.log('\n=== 非 en 键 (resolveLocale 仍判 en) 的示例 ===');
for (const r of rows) {
  if (!r.offside.length) continue;
  console.log('-- ' + r.rel);
  for (const o of r.offside.slice(0, 8)) console.log('   L' + o.line + ' ch=' + o.ch + ' 左键=' + o.key);
}
