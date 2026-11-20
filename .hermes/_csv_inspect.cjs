const fs = require('fs');
const g = fs.readFileSync('scripts/csv-to-sku-seo.mjs', 'utf8');
const m = g.match(/const C = \{[\s\S]{0,600}?\};/);
console.log(m ? m[0] : 'C not found');
const csv = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8');
const lines = csv.split(/\r?\n/);
console.log('\nrows:', lines.length, '| header cols:', (lines[0] || '').split('\t').length);
console.log('header:', lines[0].split('\t').map((h, i) => `${i}:${h}`).join(' '));
lines.forEach((l, i) => {
  if (l.includes('food-boxes')) {
    const c = l.split('\t');
    console.log(`\nrow ${i + 1} cols=${c.length} slug=${c[0]} lang=${c[1]}`);
    console.log('  desc:', (c[5] || '').slice(0, 120));
  }
});
