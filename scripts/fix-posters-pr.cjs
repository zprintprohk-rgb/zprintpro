const fs = require('fs');
let prod = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf-8');

// a2-posters: insert price_range + basePrice before next SKU
const a2Marker = "id: 'PO-002'"; // next SKU after a2-posters (PO-001)
const a2Idx = prod.indexOf(a2Marker);
if (a2Idx < 0) { console.log('a2-posters: PO-002 not found'); process.exit(1); }

// Find the quantities] closing before PO-002
const beforePO002 = prod.lastIndexOf('},', a2Idx);
// Actually, let's find a2-posters slug and work from there
const a2slug = prod.indexOf("slug: 'a2-posters'");
const a2blockEnd = prod.indexOf("id: 'PO-002'", a2slug);
const a2block = prod.slice(a2slug, a2blockEnd);
console.log('a2 block length:', a2block.length);

// Insert price_range + basePrice RIGHT BEFORE the closing of the a2-posters object
// Look for the last `},` in the a2 block - that's the variables closing, then we add fields
const varsEnd = a2block.indexOf('quantities:');
if (varsEnd > 0) {
  // Find the closing of quantities array and variables
  const qEnd = a2block.indexOf('],', varsEnd);
  if (qEnd > 0) {
    // The variables object closes a few lines later
    const vEnd = a2block.indexOf('},', qEnd + 100);
    if (vEnd > 0) {
      const insertPos = a2slug + vEnd + 3; // after the `},`
      const before = prod.slice(0, insertPos);
      const after = prod.slice(insertPos);
      prod = before + '\n    price_range: \x27HK$129-703\x27,\n    basePrice: 129,\n    weight_score: 80,\n    isHot: false,\n    isNew: false,\n    minQuantity: 1,\n    turnaround: \x271-2 工作天\x27,' + after;
      console.log('a2-posters: price_range inserted');
    }
  }
}

// a1-posters
const a1slug = prod.indexOf("slug: 'a1-posters'");
const a1block2 = prod.indexOf("id: 'PO-003'", a1slug);
const a1block = prod.slice(a1slug, a1block2 > 0 ? a1block2 : a1slug + 5000);
const a1pr = a1block.indexOf('price_range');
if (a1pr > 0) {
  const prLine = a1block.slice(a1pr, a1pr + 80).split(',')[0];
  console.log('a1 current pr:', prLine);
  prod = prod.replace(prLine, '    price_range: \x27噴繪另議 · 正式報價\x27');
  console.log('a1-posters: price_range fixed');
} else {
  // No price_range, insert
  const vEnd = a1block.indexOf('variables:');
  if (vEnd > 0) {
    const insertPos = a1slug + vEnd;
    const before = prod.slice(0, insertPos);
    const after = prod.slice(insertPos);
    prod = before + '    price_range: \x27噴繪另議 · 正式報價\x27,\n    basePrice: 0,\n    weight_score: 60,\n    isHot: false,\n    isNew: false,\n    minQuantity: 1,\n    ' + after;
    console.log('a1-posters: price_range inserted');
  }
}

fs.writeFileSync('F:/zprintpro-nextjs/src/data/products.ts', prod, 'utf-8');
console.log('Done');
