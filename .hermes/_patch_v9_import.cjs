// .hermes/_patch_v9_import.cjs — 插入 import + 检查 FAQ 渲染
const fs = require('fs');
const p = 'src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx';
let t = fs.readFileSync(p, 'utf8');
if (!/import \{ parseInlineLinks \}/.test(t)) {
  const m = t.match(/^(import [^\n]*\n)(?![\s\S]*^import )/m);
  // 在最后一个 import 行后插入
  const lines = t.split('\n');
  let last = -1;
  for (let i = 0; i < lines.length; i++) if (/^import /.test(lines[i])) last = i;
  if (last < 0) { console.log('[FAIL] no import'); process.exit(2); }
  lines.splice(last + 1, 0, "import { parseInlineLinks } from '@/utils/parseInlineLinks';");
  t = lines.join('\n');
  fs.writeFileSync(p, t, 'utf8');
  console.log('[OK] import inserted after line', last + 1);
} else {
  console.log('[skip] import exists');
}
// FAQ 渲染点检查
const faqBlocks = [...t.matchAll(/faq[\s\S]{0,160}?\{([a-z]+\.[aq])\}/g)].map(m => m[1]);
console.log('faq render refs:', JSON.stringify([...new Set(faqBlocks)]));
