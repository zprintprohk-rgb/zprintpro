// .hermes/_patch_fa_answers.cjs
const fs = require('fs');
const files = [
  'src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx',
  'src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx',
];
for (const p of files) {
  let t = fs.readFileSync(p, 'utf8');
  const before = t;
  t = t.replace(/leading-\[1\.85\]">\{f\.a\}<\/div>/g, 'leading-[1.85]">{parseInlineLinks(f.a)}</div>');
  if (!/import \{ parseInlineLinks \}/.test(t)) {
    const lines = t.split('\n');
    let last = -1;
    for (let i = 0; i < lines.length; i++) if (/^import /.test(lines[i])) last = i;
    lines.splice(last + 1, 0, "import { parseInlineLinks } from '@/utils/parseInlineLinks';");
    t = lines.join('\n');
  }
  console.log(p, 'changed:', t !== before);
  fs.writeFileSync(p, t, 'utf8');
}
