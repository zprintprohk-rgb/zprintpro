// .hermes/_kpi_all.cjs
const fs = require('fs');
const re = /CTR\s*≥|CTR ≥|\bpos\s?\d|imps\b/gi;
for (const f of ['src/data/category-seo-content.ts', 'src/data/product-faqs.ts']) {
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split('\n');
  console.log(`\n=== ${f}`);
  lines.forEach((ln, i) => {
    if (re.test(ln)) {
      re.lastIndex = 0;
      console.log(`L${i + 1}: ${ln.trim().slice(0, 230)}`);
    }
  });
}
