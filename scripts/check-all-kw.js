const fs = require('fs');
const content = fs.readFileSync('src/data/product-seo.ts', 'utf-8');

// Find all product blocks - match lines like "  'slug-name': {"
const productMatches = [...content.matchAll(/\n\s+'([a-z0-9-]+)':\s*\{/g)];
console.log(`Found ${productMatches.length} potential products`);

const products = [];

for (const match of productMatches.slice(0, 5)) {
  const slug = match[1];
  console.log(`Testing: ${slug}`);
}

// Let's try a different approach - find the allProductSeo object
const startIdx = content.indexOf('export const allProductSeo');
const seoContent = content.substring(startIdx);

// Match product keys
const keys = [...seoContent.matchAll(/\n\s+'([a-z-]+)':\s*\{/g)];
console.log(`\nFound ${keys.length} products in allProductSeo`);

for (const match of keys) {
  const slug = match[1];
  if (['zh-hk', 'en', 'ja'].includes(slug)) continue;
  
  const matchIdx = match.index;
  const nextMatch = keys.find(k => k.index > matchIdx);
  const blockEnd = nextMatch ? nextMatch.index : matchIdx + 3000;
  const block = seoContent.substring(matchIdx, blockEnd);
  
  const kwMatch = block.match(/'zh-hk':\s*'([^']+)'/);
  if (kwMatch) {
    const kw = kwMatch[1];
    const count = kw.split(',').length;
    products.push({ slug, count });
  }
}

products.sort((a, b) => a.count - b.count);

const needsWork = products.filter(p => p.count < 10);
console.log(`\nTotal products: ${products.length}`);
console.log(`Need work (<10): ${needsWork.length}`);
if (needsWork.length > 0) {
  console.log('\nProducts needing work:');
  for (const p of needsWork) {
    console.log(`  ${p.slug}: ${p.count}`);
  }
}
