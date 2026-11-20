#!/usr/bin/env node
/* 只读: 残留 ja 形态 (ジープリント ZprintPro / ZprintPro ジープリント) 逐条定位 + 所属键 */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\';
const FILES = ['src/data/blog-data/ja.json', 'src/data/category-seo-content.ts', 'src/app/[locale]/layout.tsx', 'src/app/[locale]/insights/hk-print-inquiry-index/page.tsx', 'src/components/insights/HKPrintInquiryIndex/OrganizationSchema.tsx'];
const RE = /ジープリント\s*ZprintPro|ZprintPro\s*ジープリント/g;
for (const rel of FILES) {
  const ls = fs.readFileSync(ROOT + rel.replace(/\//g, '\\'), 'utf8').split(/\r?\n/);
  const hits = ls.map((l, i) => [i + 1, l]).filter(([, l]) => RE.test(l));
  console.log(`\n=== ${rel} (${hits.length} 行) ===`);
  hits.forEach(([n, l]) => {
    // 该行前 6 行找键
    let key = '(?)';
    for (let k = n - 1; k >= Math.max(0, n - 7); k--) {
      const m = (ls[k] || '').match(/^\s*([A-Za-z_"'\-\[\]]+)\s*:/);
      if (m) { key = m[1]; break; }
    }
    const i = l.search(RE);
    console.log(`  L${n} key≈${key}: …${l.slice(Math.max(0, i - 55), i + 45).replace(/\\n/g, ' ')}…`);
  });
}
