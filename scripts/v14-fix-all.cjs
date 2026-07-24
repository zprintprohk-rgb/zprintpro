// v14-fix-all.cjs — run: node scripts/v14-fix-all.cjs
// Regenerates price data with posters + implements scheme A batch price lookup
const fs = require('fs');

console.log('=== 1. Regenerate price-data.generated.ts with posters ===');
// Run gen-price-data.mjs as a child module
require('./gen-price-data.mjs');

console.log('\n=== 2. Add findClosestTier to price-data.generated.ts ===');
let gen = fs.readFileSync('F:/zprintpro-nextjs/src/lib/price-data.generated.ts', 'utf-8');

// Add findClosestTierBatch function — returns batch price (not unit × qty)
const FINDER = `
export function findClosestTierBatch(
  slug: string,
  qty: number,
  configIndex: number = 0,
): { qty: number; priceHKD: number; priceUSD: number; priceJPY: number; matched: boolean } | null {
  const data = PRICE_TABLE_MAP[slug];
  if (!data) return null;
  const cfg = data.configs[configIndex];
  if (!cfg || !cfg.tiers.length) return null;
  
  // Find tier: qty >= input qty (smallest that covers), else max tier
  let best = cfg.tiers[cfg.tiers.length - 1];
  let matched = false;
  for (const t of cfg.tiers) {
    if (t.qty >= qty) {
      best = t;
      matched = t.qty === qty;
      break;
    }
  }
  
  return {
    qty: best.qty,
    priceHKD: best.priceHKD,
    priceUSD: best.priceUSD,
    priceJPY: best.priceJPY,
    matched,
  };
}
`;

gen = gen.replace(`export function getPriceTableForSlug`, FINDER + `\nexport function getPriceTableForSlug`);
fs.writeFileSync('F:/zprintpro-nextjs/src/lib/price-data.generated.ts', gen, 'utf-8');
console.log('findClosestTierBatch added');

console.log('\n=== 3. Verify data integrity ===');
// Quick sanity: gang-run card boxes 500 qty
const { PRICE_TABLE_MAP, findClosestTierBatch } = require('F:/zprintpro-nextjs/src/lib/price-data.generated.ts');
try {
  const r = findClosestTierBatch('gang-run-card-boxes', 500, 0);
  console.log('gang-run 500: HK$' + r.priceHKD + ' (qty=' + r.qty + ', batch)');
  const r2 = findClosestTierBatch('gang-run-card-boxes', 10000, 0);
  console.log('gang-run 10000: HK$' + r2.priceHKD + ' (qty=' + r2.qty + ', batch)');
  const r3 = findClosestTierBatch('gang-run-card-boxes', 600, 0);
  console.log('gang-run 600: HK$' + r3.priceHKD + ' (qty=' + r3.qty + ', ' + (r3.matched ? 'exact' : 'ceil') + ')');
} catch(e) { console.log('Verify failed:', e.message); }

console.log('\n=== 4. Posters verification ===');
try {
  const a2_10 = findClosestTierBatch('a2-posters', 10, 0);
  console.log('A2 157g 10張: HK$' + a2_10.priceHKD);
  const a2_500 = findClosestTierBatch('a2-posters', 500, 0);
  console.log('A2 157g 500張: HK$' + a2_500.priceHKD);
} catch(e) { console.log('Poster verify failed:', e.message); }
