// verify-batch-b.mjs
// 11-item structural check on longDescriptionEn for Batch B SKUs.
import fs from 'node:fs';
const productsText = fs.readFileSync('src/data/products.ts', 'utf8');
const payload = JSON.parse(fs.readFileSync('patches/batch-b1-content.json', 'utf8'));

const checks = [
  { name: 'chars>=5000', fn: (c) => c.length >= 5000 },
  { name: 'chars<=8000', fn: (c) => c.length <= 8000 },
  { name: 'h3>=6', fn: (c) => (c.match(/<h3>/g) || []).length >= 6 },
  { name: 'table>=2', fn: (c) => (c.match(/<table/g) || []).length >= 2 },
  { name: 'details>=6 (FAQ)', fn: (c) => (c.match(/<details/g) || []).length >= 6 },
  { name: 'hasNAP (ZprintPro)', fn: (c) => /ZprintPro/.test(c) },
  { name: 'no "智印港" (competitor brand)', fn: (c) => !/智印港|智印印港|智印香港|智印香港印刷|Printing Hub/i.test(c) },
  { name: 'has DHL Express global shipping', fn: (c) => /DHL Express/.test(c) },
  { name: 'has Frequently Asked Questions H3', fn: (c) => /Frequently Asked Questions/.test(c) },
  { name: 'has Why Choose ZprintPro', fn: (c) => /Why Choose ZprintPro/.test(c) },
  { name: 'has Use Cases & Industries', fn: (c) => /Use Cases & Industries/.test(c) },
];

let pass = 0, fail = 0;
const failed = [];
for (const item of payload) {
  const { sku, slug, content } = item;
  // Also verify longDescriptionZh was not touched (find the entry, check zh content unchanged)
  const skuIdx = productsText.indexOf(`sku_code: '${sku}'`);
  let zhLen = 0;
  if (skuIdx >= 0) {
    // walk back to entry start
    let entryStart = -1;
    for (let i = skuIdx; i >= 0; i--) {
      if (productsText[i] === '{' && (productsText[i-1] === ' ' || productsText[i-1] === '\n')) {
        const pre = productsText.substring(Math.max(0, i - 4), i);
        if (pre === '\n  ') { entryStart = i; break; }
      }
    }
    if (entryStart < 0) {
      const snippet = productsText.substring(Math.max(0, skuIdx - 300), skuIdx);
      const m = snippet.match(/\n  \{\n[^]*$/);
      if (m) entryStart = skuIdx - 300 + m.index + 2;
    }
    if (entryStart >= 0) {
      // find end
      let depth = 0, end = -1;
      for (let i = entryStart; i < productsText.length; i++) {
        if (productsText[i] === '{') depth++;
        else if (productsText[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
      }
      if (end >= 0) {
        const block = productsText.substring(entryStart, end);
        const zhMatch = block.match(/longDescriptionZh:\s*`([\s\S]+?)`/);
        if (zhMatch) zhLen = zhMatch[1].length;
      }
    }
  }

  const results = checks.map(c => `${c.name}=${c.fn(content) ? '✓' : '✗'}`).join(' ');
  const allPass = checks.every(c => c.fn(content));
  if (allPass) pass++; else { fail++; failed.push({ sku, slug, results }); }
  console.log(`${sku.padEnd(10)} ${slug.padEnd(30)} chars=${content.length} zh=${zhLen}c ${allPass ? '✓' : '✗'}`);
}

console.log();
console.log('=== Failed ===');
failed.forEach(f => {
  console.log(`  ${f.sku} ${f.slug}`);
  console.log(`    ${f.results}`);
});
console.log();
console.log(`Total: ${pass} pass, ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
