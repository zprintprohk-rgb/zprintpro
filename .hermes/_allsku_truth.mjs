// Authoritative per-SKU fields via module load (same technique as sync-ts-to-csv.mjs loadTs)
import fs from 'node:fs';
let txt = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
txt = txt.replace(/^import[^\n]*\n/gm, '');
const startIdx = txt.indexOf('export const products');
txt = txt.slice(startIdx);
txt = txt.replace('export const products: Product[] =', 'const products =');
// cut trailing exports/functions after the array literal
const tail = txt.indexOf('\nexport ');
if (tail > 0) txt = txt.slice(0, tail);
const mod = { exports: {} };
new Function('module', 'exports', txt + '\nmodule.exports = products;')(mod, mod.exports);
const products = mod.exports;
console.log('products:', products.length);
const rows = products.map(p => [
  p.slug, p.minQuantity ?? '-', p.basePrice ?? '-', p.basePrice_en ?? '-', p.basePrice_ja ?? '-', (p.price_range || '').slice(0, 34),
].join('\t'));
fs.writeFileSync('F:/zprintpro-nextjs/.hermes/_allsku_truth.tsv', rows.join('\n') + '\n', 'utf8');
console.log('written .hermes/_allsku_truth.tsv');
console.log(rows.filter(r => /box|bag|carton/.test(r)).map(r => '  ' + r).join('\n'));
console.log('TRUTH_DONE');
