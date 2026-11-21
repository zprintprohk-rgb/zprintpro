// BC-BAN-DEPRECATED (2026-09-09 K3 拍板②): deprecated 名片公式模块的调试脚本, 随模块保留, 不随门童阻断。
import { businessCardsFormulaV2 } from '../formulas/business-cards';
import { MARKETS } from '../markets';

// 2026-11-21 P0 fix: 公式額外成本明細只在回傳值的 inline 交集型別，宣告型別是 FormulaResult。
type DebugResult = ReturnType<typeof businessCardsFormulaV2> & {
  setupCostHKD: number;
  paperCostHKD: number;
  finishingCostHKD: number;
  shippingHKD: number;
  totalCostHKD: number;
  market: { taxRate: number };
  tax: { taxRate: number; preTaxAmount: number; totalWithTax: number };
};

const r = businessCardsFormulaV2({
  quantity: 1000,
  size: { w: 89, h: 51, unit: 'mm' as const },
  material: '400g_gloss_art',
  finishes: [],
  deadline: 'standard' as const,
  market: MARKETS.HK,
  sides: 'double',
}) as DebugResult;

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
r.notes?.forEach(n => console.log('  -', n));
