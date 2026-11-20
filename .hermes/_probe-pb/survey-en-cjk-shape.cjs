'use strict';
/** 形状勘察: TS 文件里哪些「键」携带 CJK 值 (为字段归属做准备) — 只读 */
const fs = require('fs');
const P = 'F:/zprintpro-nextjs/';
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/;

function survey(f) {
  const s = fs.readFileSync(P + f, 'utf8');
  const keys = new Map();
  const re = /(?:^|[\n\r,{;\[])\s*(?:\.\.\.)?\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*:\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`)/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const k = m[1];
    const v = m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : (m[4] || '');
    if (!CJK.test(v)) continue;
    keys.set(k, (keys.get(k) || 0) + 1);
  }
  // 也看看数组元素 / 裸串 (无键) 的情况
  console.log('=== ' + f);
  console.log('  keys: ' + [...keys.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, n]) => k + ':' + n).join('  '));
}

['src/data/category-seo-content.ts', 'src/data/buying-guides.ts', 'src/data/sku-seo-data.ts',
 'src/app/[locale]/payment-methods/page.tsx', 'src/components/layout/Footer.tsx',
 'src/app/[locale]/category/[slug]/page.tsx', 'src/data/blog-posts.ts'].forEach(f => {
  try { survey(f); } catch (e) { console.log('  ★ ' + f + ' 失败: ' + e.message); }
});
