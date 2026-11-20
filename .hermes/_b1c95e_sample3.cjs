// .hermes/_b1c95e_sample3.cjs — products-content/conversion/category-seo/case-studies 的 1,000+ 形态
const fs = require('fs');
for (const f of ['src/data/products-content.ts', 'src/data/category-conversion-blocks.ts', 'src/data/category-seo-content.ts', 'src/app/[locale]/case-studies/page.tsx', 'src/app/[locale]/services/catalog-printing-china/page.tsx', 'src/data/pillar-content.ts', 'src/data/buying-guides.ts']) {
  const t = fs.readFileSync(f, 'utf8');
  let rest = t;
  let n = 0;
  while (n < 8) {
    const j = rest.search(/1,?000\+/);
    if (j < 0) break;
    const ctx = rest.slice(Math.max(0, j - 55), j + 55).replace(/\s+/g, ' ');
    console.log('[' + f.split('/').pop() + ']', ctx);
    rest = rest.slice(j + 6);
    n++;
  }
}
