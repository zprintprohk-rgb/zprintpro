// 取证: menus 6 SKU 的 h1 三语现值 (只读)
const fs = require('node:fs');
const raw = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const braceStart = raw.indexOf('{', raw.indexOf('export const skuSeoData'));
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < raw.length; i++) {
  const c = raw[i];
  if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === quote) inStr = false; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
  if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
const data = new Function('return ' + raw.slice(braceStart, end + 1))();
for (const slug of Object.keys(data).filter((s) => /menu/i.test(s))) {
  const e = data[slug];
  console.log(`\n[${slug}]`);
  for (const loc of ['zh-hk', 'en', 'ja']) {
    console.log(`  ${loc.padEnd(6)} h1: ${JSON.stringify(e.seo?.[loc]?.h1 || '(无)')}`);
  }
}
