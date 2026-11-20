const fs = require('fs');
const t = fs.readFileSync('src/data/product-faqs.ts', 'utf8');
const keys = [...t.matchAll(/^  '([a-z0-9-]+)': \[/gm)].map(m => m[1]);
console.log('keys', keys.length);
console.log(keys.join(','));
const i = t.indexOf("'wall-calendars': [");
console.log('\n--- wall-calendars sample ---');
console.log(t.slice(i, i + 560));
// 结构断言：每 key 4 问（仅新 7 个）
for (const s of ['transparent-stickers', 'removable-stickers', 'foil-stickers', 'security-stickers', 'a4-flyers', 'a5-flyers', 'wall-calendars']) {
  const a = t.indexOf(`'${s}': [`);
  const b = t.indexOf("\n  '", a + 5);
  const seg = t.slice(a, b > 0 ? b : t.length);
  const qn = (seg.match(/question: \{/g) || []).length;
  console.log(`${s}: questions=${qn}`);
}
