// Debug: print actual quote values
import { businessCardsFormulaV2 } from '../formulas/business-cards';
import { MARKETS } from '../markets';

const r = businessCardsFormulaV2({
  quantity: 1000,
  finishes: [],
  deadline: 'standard',
  market: MARKETS.US,
});

console.log('=== US 1000 张 (after fix 2026-06-07) ===');
console.log('baseUnitPrice USD:', r.baseUnitPrice.toFixed(4));
console.log('setupCostHKD:', r.setupCostHKD);
console.log('paperCostHKD:', r.paperCostHKD);
console.log('finishingCostHKD:', r.finishingCostHKD);
console.log('shippingHKD:', r.shippingHKD);
console.log('totalCostHKD:', r.totalCostHKD);
console.log('factoryCost (setup+paper+fin):', r.setupCostHKD + r.paperCostHKD + r.finishingCostHKD);
console.log('tax.taxRate:', r.tax.taxRate);
console.log('tax.preTaxAmount:', r.tax.preTaxAmount.toFixed(2));
console.log('tax.totalWithTax:', r.tax.totalWithTax.toFixed(2));
console.log('Total 1000 张 USD:', (r.baseUnitPrice * 1000).toFixed(2));
console.log('Notes:');
r.notes.forEach(n => console.log('  -', n));
