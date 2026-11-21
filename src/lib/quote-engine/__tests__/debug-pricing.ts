// BC-BAN-DEPRECATED (2026-09-09 K3 拍板②): deprecated 名片公式模块的调试脚本, 随模块保留, 不随门童阻断。
// Debug: print actual quote values
import { businessCardsFormulaV2 } from '../formulas/business-cards';
import { MARKETS } from '../markets';

// 2026-11-21 P0 fix: 補齊 FormulaContext 必填 size/material；額外成本明細以交集型別取回。
type DebugResult = ReturnType<typeof businessCardsFormulaV2> & {
  setupCostHKD: number;
  paperCostHKD: number;
  finishingCostHKD: number;
  shippingHKD: number;
  totalCostHKD: number;
  tax: { taxRate: number; preTaxAmount: number; totalWithTax: number };
};

const r = businessCardsFormulaV2({
  quantity: 1000,
  size: { w: 89, h: 51, unit: 'mm' as const },
  material: '400g_gloss_art',
  finishes: [],
  deadline: 'standard',
  market: MARKETS.US,
}) as DebugResult;

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
r.notes?.forEach(n => console.log('  -', n));
