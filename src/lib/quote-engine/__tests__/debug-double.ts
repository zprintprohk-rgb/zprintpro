import { businessCardsFormulaV2 } from '../formulas/business-cards';
import { MARKETS } from '../markets';

const r = businessCardsFormulaV2({
  quantity: 1000,
  size: { w: 89, h: 51, unit: 'mm' as const },
  material: '400g_gloss_art',
  finishes: [],
  deadline: 'standard' as const,
  market: MARKETS.HK,
  sides: 'double',
});

console.log('=== HK 1000 张双面 debug ===');
console.log('baseUnitPrice:', r.baseUnitPrice);
console.log('setupCostHKD:', r.setupCostHKD);
console.log('paperCostHKD:', r.paperCostHKD);
console.log('finishingCostHKD:', r.finishingCostHKD);
console.log('shippingHKD:', r.shippingHKD);
console.log('totalCostHKD:', r.totalCostHKD);
console.log('market.taxRate:', r.market.taxRate);
console.log('tax.preTaxAmount:', r.tax.preTaxAmount);
console.log('tax.totalWithTax:', r.tax.totalWithTax);
console.log('Notes:');
r.notes.forEach(n => console.log('  -', n));
