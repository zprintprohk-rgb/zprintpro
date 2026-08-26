// Spot-check encoding of the 3 blog-data JSONs
const fs = require('fs');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const p = `src/data/blog-data/${loc}.json`;
  const b = fs.readFileSync(p);
  const bom = b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF;
  const utf16 = b[0] === 0xFF;
  console.log(`${p}: size=${b.length} BOM=${bom} UTF16=${utf16}`);
}
