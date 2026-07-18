// Audit products.ts: 列出所有 unique slug + category_slug,看 P0 类别下未覆盖的
import { readFileSync } from 'node:fs';

const t = readFileSync('src/data/products.ts', 'utf8');

// 用 category_slug 字段 + slug 字段 (实际 Product interface)
const productBlocks = t.split(/\n  \{/).slice(1);
const slugToCat = {};
for (const block of productBlocks) {
  const catM = block.match(/category_slug:\s*['"]([^'"]+)['"]/);
  const slugM = block.match(/slug:\s*['"]([^'"]+)['"]/);
  if (catM && slugM) {
    const cat = catM[1];
    const slug = slugM[1];
    if (!slugToCat[slug]) slugToCat[slug] = cat;
  }
}

const allSlugs = Object.keys(slugToCat).sort();
console.log('=== ALL UNIQUE SLUG (' + allSlugs.length + ') ===');
console.log(allSlugs.join('\n'));

// Cross-check with matrix covered
const matrix = JSON.parse(readFileSync('.hermes/industry-keyword-matrix.json', 'utf8'));
const coveredSlugs = new Set(matrix.covered.map(c => c.slug));
const coveredSkus = new Set(matrix.covered.map(c => c.sku).filter(Boolean));
console.log('\n=== COVERAGE BY SKU FIELD (matrix.covered.sku) ===');
console.log('Total covered SKU in matrix:', [...coveredSkus].length);
console.log('Covered SKU:', [...coveredSkus].sort().join(', '));

// P0 类目
const p0cats = ['stickers', 'flyers', 'packaging', 'paper-bags'];
console.log('\n=== P0 CATEGORY SLUGS ===');
const p0slugs = allSlugs.filter(s => p0cats.includes(slugToCat[s]));
console.log('P0 total slug count:', p0slugs.length);
p0slugs.forEach(s => {
  const cov = coveredSlugs.has(s) ? 'COVERED' : (coveredSkus.has(s) ? 'COVERED-via-sku' : 'NEW');
  console.log('  [' + cov + '] ' + s + ' [' + slugToCat[s] + ']');
});
