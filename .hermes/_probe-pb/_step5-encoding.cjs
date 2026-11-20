/**
 * Step 5 验收 — 改动档编码自检 (UTF-8 无 BOM / LF) + 改动清单
 * 用法: node .hermes/_probe-pb/_step5-encoding.cjs
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

const FILES = [
  'src/data/product-specs-i18n.ts',
  'src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx',
  'src/data/category-seo-content.ts',
  'src/data/blog-data/zh-hk.json',
  '.hermes/i18n-pollution-baseline.json',
  '.hermes/_probe-pb/_spec-tr-6.json',
  '.hermes/_probe-pb/gen-spec-i18n.cjs',
  '.hermes/_probe-pb/_dump-spec-strings-full.ts',
  '.hermes/_probe-pb/_spec-strings-full.json',
  '.hermes/_probe-pb/_spec-strings-full.step4-238.json',
  '.hermes/_probe-pb/_step5-verify.ts',
  '.hermes/_probe-pb/_step5-churn-sim.ts',
  '.hermes/_probe-pb/_step5-size-inventory.ts',
  '.hermes/_probe-pb/_step5-en-cjk-residue.cjs',
  '.hermes/_probe-pb/_step5-newdef.cjs',
  '.hermes/_probe-pb/_step5-baseline-calc.cjs',
  '.hermes/_probe-pb/_step5-gen-idempotent.cjs',
];
let fail = 0;
console.log('file | bytes | BOM | CRLF | 结论');
for (const f of FILES) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { console.log(`  ⚠️ 不存在: ${f}`); continue; }
  const b = fs.readFileSync(p);
  const bom = b[0] === 0xFF && b[1] === 0xFE || b[0] === 0xEF && b[1] === 0xBB;
  const crlf = b.includes(Buffer.from('\r\n'));
  const ok = !bom && !crlf;
  if (!ok) fail++;
  console.log(`  ${ok ? '✅' : '❌'} ${f} | ${b.length} | ${bom} | ${crlf}`);
}
console.log(`\n编码自检: ${fail === 0 ? '✅ 全部 UTF-8 无 BOM + LF' : '❌ ' + fail + ' 档不合格'}`);
process.exit(fail === 0 ? 0 : 1);
