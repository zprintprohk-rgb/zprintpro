// .hermes/_find_1000.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const i = t.indexOf('HK$1.5-1000');
console.log('idx', i);
console.log(JSON.stringify(t.slice(Math.max(0, i - 120), i + 160)));
