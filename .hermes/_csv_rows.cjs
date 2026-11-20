const fs = require('fs');
const csv = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8');
const lines = csv.split(/\r?\n/);
const hdr = lines[0].split('\t');
lines.forEach((l, i) => {
  if (i === 0 || !l.trim()) return;
  const c = l.split('\t');
  if (c[3] === 'food-boxes' || (c[0] || '').includes('食品包裝')) {
    console.log(`\nrow ${i + 1}: slug=[${c[3]}] nameZH=[${c[0]}] cols=${c.length}`);
    console.log('  descZH:', (c[11] || '').slice(0, 90));
    console.log('  descEN:', (c[12] || '').slice(0, 90));
    console.log('  descJA:', (c[13] || '').slice(0, 90));
  }
});
