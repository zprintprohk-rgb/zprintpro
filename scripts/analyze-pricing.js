const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf-8');
const blocks = content.split(/(?=\{\s*id:\s*['"])/g).slice(1);
const results = [];
for (const block of blocks) {
  const slug = block.match(/slug:\s*['"]([^'"]+)['"]/);
  const sku = block.match(/sku_code:\s*['"]([^'"]+)['"]/);
  const name = block.match(/name:\s*['"]([^'"]+)['"]/);
  const price = block.match(/price_range:\s*['"]([^'"]+)['"]/);
  const basePrice = block.match(/basePrice:\s*(\d+)/);
  const minQty = block.match(/minQuantity:\s*(\d+)/);
  if (slug) {
    results.push({
      sku: sku ? sku[1] : '',
      slug: slug[1],
      name: name ? name[1] : '',
      price_range: price ? price[1] : '',
      basePrice: basePrice ? parseInt(basePrice[1]) : 0,
      minQuantity: minQty ? parseInt(minQty[1]) : 0
    });
  }
}
// Group by category
const cats = {};
results.forEach(r => {
  const cat = r.sku.split('-')[0];
  if (!cats[cat]) cats[cat] = [];
  cats[cat].push(r);
});
Object.keys(cats).forEach(cat => {
  console.log('\n=== ' + cat + ' (' + cats[cat].length + ' SKU) ===');
  cats[cat].forEach(r => {
    console.log(r.sku + ' | ' + r.name + ' | ' + r.price_range + ' | base=' + r.basePrice + ' | min=' + r.minQuantity);
  });
});
console.log('\nTotal products: ' + results.length);
