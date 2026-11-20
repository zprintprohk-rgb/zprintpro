// .hermes/_show_fix_targets.cjs
const fs = require('fs');
const show = (f, a, b) => {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  console.log(`\n=== ${f} L${a}-${b}`);
  lines.slice(a - 1, b).forEach((l, i) => console.log(`${a + i}: ${l.slice(0, 260)}`));
};
show('src/data/category-seo-content.ts', 2463, 2468);
show('src/data/sku-seo-data.ts', 1113, 1117);
show('src/data/products.ts', 5982, 5986);
