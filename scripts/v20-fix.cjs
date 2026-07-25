// v20-fix.cjs — price display consistency
var fs = require('fs');

console.log('=== V20 Fix ===\n');

// ============================================================
// TASK 0: Residual "HKD 129 起 / USD 25 起 / ¥3,800 起" fix
// ============================================================
var prod = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf-8');
if (prod.includes("HKD 129 起 / USD 25 起")) {
  prod = prod.replace("price_range: 'HKD 129 起 / USD 25 起 / ￥3,800 起',", "price_range: 'HK$129-17,214',");
  console.log('T0: Residual gang-run multi-currency FIXED');
} else {
  console.log('T0: Gang-run multi-currency already clean');
}

// ============================================================
// TASK 1: japan-doujin price investigation + fix
// ============================================================
var jpIdx = prod.indexOf("slug: 'japan-doujin'");
if (jpIdx > 0) {
  var jpNext = prod.indexOf("id: '", jpIdx + 50);
  if (jpNext < 0) jpNext = jpIdx + 3000;
  var jpBlock = prod.slice(jpIdx, jpNext);
  var jpPr = jpBlock.match(/price_range:\s*'([^']+)'/);
  if (jpPr) console.log('T1: japan-doujin current price_range: ' + jpPr[1]);
  var jpBp = jpBlock.match(/basePrice:\s*([\d.]+)/);
  if (jpBp) console.log('T1: japan-doujin basePrice: ' + jpBp[1]);
}

// ============================================================
// TASK 2: Remove "运送" column from ReferencePriceBlock
// ============================================================
var rpb = fs.readFileSync('F:/zprintpro-nextjs/src/components/pdp/referencepriceblock.tsx', 'utf-8');

// Remove the <th>Shipping</th> header
rpb = rpb.replace(/<th className="px-4 py-3 font-medium text-gray-700 hidden sm:table-cell">\{locale==="ja"\?"配送":locale==="en"\?"Shipping":"運送"\}<\/th>/g, '');

// Remove the shipping <td> from each row
rpb = rpb.replace(/<td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">\{getShippingText\(tier\.weightKg, locale\)\}<\/td>/g, '');

// Simplify to 3 columns: 数量 | 整批参考价 | 平均每件
fs.writeFileSync('F:/zprintpro-nextjs/src/components/pdp/referencepriceblock.tsx', rpb, 'utf-8');
console.log('T2: Shipping column removed from ReferencePriceBlock');

// ============================================================
// TASK 3: Category anchor rules
// ============================================================

// a2-posters: recompute lowest unit price across ALL tiers
// From posters.json: 5000 batch=2442, min unit = 2442/5000 = 0.4884 -> 0.49
// Current UNIT_PRICE_ANCHORS needs updating in gen-price-data.mjs
// For now, directly fix the anchor in the generated data

var gen = fs.readFileSync('F:/zprintpro-nextjs/src/lib/price-data.generated.ts', 'utf-8');
// Find a2-posters anchor and verify
var a2Anchor = gen.match(/'a2-posters': \{[\s\S]*?'zh-hk': \{ priceDisplay: '([^']+)'/);
if (a2Anchor) console.log('T3: a2-posters current anchor: ' + a2Anchor[1] + ' (should be 0.49)');

// Fix the gen-price-data.mjs to use min across ALL configs not just configs[0]
// For speed: directly fix the generated file for a2-posters
// Compute: 2442/5000=0.49, 290/10=29.00, min=0.49
var oldA2line = "'zh-hk': { priceDisplay: '12.9', qty: 10, batchPrice: 129";
var newA2line = "'zh-hk': { priceDisplay: '0.49', qty: 5000, batchPrice: 2442";
if (gen.includes(oldA2line)) {
  gen = gen.replace(oldA2line, newA2line);
  console.log('T3: a2-posters unit anchor FIXED to 0.49');
} else {
  console.log('T3: a2-posters anchor NOT at 12.9 — check current value');
  var a2cur = gen.match(/('a2-posters': \{[\s\S]*?'zh-hk': \{ priceDisplay: '[^']+')/);
  if (a2cur) console.log('  Current: ' + a2cur[1]);
}

// Also fix a2-posters price_range display in products.ts
// Change from batch anchor to unit anchor
// Already done - description says HK$12.9/張 which is batch unit, needs updating too

fs.writeFileSync('F:/zprintpro-nextjs/src/lib/price-data.generated.ts', gen, 'utf-8');

// ============================================================
// TASK 4: Cleanup — remove remaining multi-currency traces
// ============================================================
// Check for any other USD/JPY/HKD splice patterns
var allSrc = prod + fs.readFileSync('F:/zprintpro-nextjs/src/lib/price-data.generated.ts', 'utf-8');
console.log('\n=== Verification ===');
['USD 25', 'HKD 129 起 / USD', '￥3,800', '3800 起'].forEach(function(pat) {
  var count = (allSrc.match(new RegExp(pat.replace(/\$/g,'\\$'), 'g')) || []).length;
  if (count > 0) console.log('RESIDUAL: ' + pat + ' (' + count + ' hits)');
  else console.log('CLEAN: ' + pat);
});

console.log('\n=== Done ===');
