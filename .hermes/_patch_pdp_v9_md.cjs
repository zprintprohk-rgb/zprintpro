// .hermes/_patch_pdp_v9_md.cjs
const fs = require('fs');
const p = 'src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx';
let t = fs.readFileSync(p, 'utf8');
const before = t;

// 两处段落渲染
t = t.replace(/leading-\[1\.85\]\">\{p\}<\/p>/, 'leading-[1.85]">{parseInlineLinks(p)}</p>');
t = t.replace(/text-justify mb-4\">\{p\}<\/p>/, 'text-justify mb-4">{parseInlineLinks(p)}</p>');
// lead 段
t = t.replace(/border-\[#1F2937\]\">\{bodyLead\}<\/p>/, 'border-[#1F2937]">{parseInlineLinks(bodyLead)}</p>');

if (!/import \{ parseInlineLinks \}/.test(t)) {
  const lines = t.split('\n');
  let last = -1;
  for (let i = 0; i < lines.length; i++) if (/^import /.test(lines[i])) last = i;
  lines.splice(last + 1, 0, "import { parseInlineLinks } from '@/utils/parseInlineLinks';");
  t = lines.join('\n');
}

console.log('changed:', t !== before, '| occurrences:', (t.match(/parseInlineLinks/g) || []).length);
fs.writeFileSync(p, t, 'utf8');
