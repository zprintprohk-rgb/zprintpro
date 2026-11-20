// 取证小工具: dump 某 SKU 的 imageAlt 块 (只读)
const fs = require('node:fs');
const src = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const slug = process.argv[2] || 'pvc-menus';
const s = src.indexOf(`"${slug}": {`);
const a = src.indexOf('"imageAlt": {', s);
console.log('slugIndex=', s, 'altIndex=', a);
console.log(JSON.stringify(src.slice(a, a + 400)));
