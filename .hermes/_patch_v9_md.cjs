// .hermes/_patch_v9_md.cjs
const fs = require('fs');
const p = 'src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx';
let t = fs.readFileSync(p, 'utf8');
const before = t;

// points 渲染
t = t.replace(/(<li key=\{pt\}[^>]*>\s*\n\s*)\{pt\}/, '$1{parseInlineLinks(pt)}');

// import
if (!/parseInlineLinks/.test(t)) {
  // 在首个 import 之后插入
  t = t.replace(/^(import [^\n]*\n)/, "$1import { parseInlineLinks } from '@/utils/parseInlineLinks';\n");
} else if (!/import \{ parseInlineLinks \}/.test(t)) {
  t = t.replace(/^(import [^\n]*\n)/, "$1import { parseInlineLinks } from '@/utils/parseInlineLinks';\n");
}

if (t === before) {
  console.log('[FAIL] no change'); process.exit(2);
}
fs.writeFileSync(p, t, 'utf8');
console.log('[OK] patched, parseInlineLinks occurrences:', (t.match(/parseInlineLinks/g) || []).length);
