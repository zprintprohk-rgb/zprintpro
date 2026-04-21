const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf-8');
const blocks = content.split(/(?=\{\s*id:\s*['"])/g).slice(1);
for (const block of blocks) {
  const slug = block.match(/slug:\s*['"]([^'"]+)['"]/);
  if (!slug) continue;
  if (slug[1].includes('flyer') || slug[1].includes('leaflet')) {
    const name = block.match(/name:\s*['"]([^'"]+)['"]/);
    const sku = block.match(/sku_code:\s*['"]([^'"]+)['"]/);
    console.log('=== ' + sku[1] + ' ' + name[1] + ' ===');
    const varMatch = block.match(/variables:\s*\{([\s\S]*?)\n\s+\},?\s*\n/);
    if (varMatch) {
      console.log(varMatch[0].substring(0, 800));
    }
    console.log('');
  }
}
