// .hermes/_pc_unit_ctx.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/products-content.ts', 'utf8');
const i = t.indexOf("'kraft-paper-bags': {");
const seg = t.slice(i, i + 4000);
const ms = [...seg.matchAll(/(\d{1,5})\s*張\s*起(?:印)?/g)];
console.log('hits', ms.length);
ms.slice(0, 4).forEach(m => console.log(JSON.stringify(seg.slice(Math.max(0, m.index - 80), m.index + 40).replace(/\s+/g, ' '))));
