const fs = require('fs');
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const patterns = ["slug:'a4-flyers'", "slug: 'a4-flyers'", 'slug:"a4-flyers"', 'slug: "a4-flyers"'];
const idxs = patterns.map((p) => t.indexOf(p)).filter((x) => x >= 0);
const idx = idxs.sort((a, b) => a - b)[0];
console.log('idx =', idx);
if (idx >= 0) {
  const block = t.slice(idx, idx + 2200);
  console.log(block);
  // extract field names
  const fields = [...block.matchAll(/^\s{4}(\w+):/gm)].map((m) => m[1]);
  console.log('\n--- field names ---');
  console.log([...new Set(fields)].join(', '));
}
