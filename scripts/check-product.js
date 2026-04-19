const fs = require('fs');
const c = fs.readFileSync('src/data/product-seo.ts', 'utf-8');
const s = c.indexOf("'foil-red-packets': {");
const e = c.indexOf("'large-red-packets': {");
console.log(c.substring(s, Math.min(s+1200, e)));
