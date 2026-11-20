import fs from 'node:fs';
const s = fs.readFileSync('src/data/products.ts', 'utf8');
for (const sku of ['BC-001', 'PK-002']) {
  const i = s.indexOf(`sku_code: '${sku}'`);
  if (i < 0) { console.log(sku, 'not found'); continue; }
  const chunk = s.slice(i, i + 1800);
  const price = (chunk.match(/basePrice\w*: [^,\n]+/g) || []).slice(0, 4);
  const qty = (chunk.match(/minQuantity: [^,\n]+/g) || []).slice(0, 2);
  const slug = (chunk.match(/slug: '[^']+'/) || [])[0];
  console.log(sku, slug, '|', price.join(' | '), '|', qty.join(' | '));
}
