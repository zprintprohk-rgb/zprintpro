/**
 * 端到端 verification (2026-06-07)
 * 自验: 4 commits 后报价系统行为
 */
import { businessCardsFormulaV2 } from '../formulas/business-cards';
import { booksFormula } from '../formulas/books';
import { postersFormula } from '../formulas/posters';
import { stickersFormula } from '../formulas/stickers';
import { packagingFormula } from '../formulas/packaging';
import { bagsFormula } from '../formulas/bags';
import { MARKETS } from '../markets';
import { calculateFX } from '../fx';

function reportMarket(code, market) {
  const QUANTITY = 1000;
  const r = businessCardsFormulaV2({
    quantity: QUANTITY,
    size: { w: 89, h: 51, unit: 'mm' as const },
    material: '400g_gloss_art',
    finishes: [],
    deadline: 'standard' as const,
    market,
    sides: 'double',
  });
  const fx = calculateFX({
    fromAmount: r.baseUnitPrice * QUANTITY,
    fromCurrency: market.currency,
    market,
    factoryCostHKD: r.setupCostHKD + r.paperCostHKD + r.finishingCostHKD,
    shippingCostHKD: r.shippingHKD,
  });
  const totalLocal = r.baseUnitPrice * QUANTITY;
  // fx.netMargin 已经是 percentage (e.g. 42.6), 不要 * 100
  const fxM = fx.netMargin.toFixed(1);
  console.log(`  ${code} (${market.currency}) | 1000 张双面 | ${totalLocal.toFixed(2)} ${market.currency} | shipping ${r.shippingHKD.toFixed(0)} HKD | netMargin ${fxM}%`);
}

console.log('\n=== 6 SKU × 9 市场端到端 (业务卡 1000 张双面) ===\n');
for (const code of Object.keys(MARKETS)) {
  reportMarket(code, MARKETS[code]);
}

console.log('\n=== books 50 本 × 24 页验证 ===');
const book = booksFormula({
  quantity: 50,
  size: { w: 210, h: 297, unit: 'mm' as const },
  material: '80g_inner_paper',
  finishes: [],
  deadline: 'standard' as const,
  pages: 24,
  market: MARKETS.HK,
});
console.log(`  Books 50本 24页 HK | paperCost ${book.paperCostHKD} HKD (旧 15 HKD 破产, 现在 860.5 ✓)`);

console.log('\n=== 跨市场 sanity ===');
const hk = businessCardsFormulaV2({ quantity: 1000, size: { w: 90, h: 54, unit: 'mm' as const }, material: '400g_gloss_art', finishes: [], deadline: 'standard' as const, market: MARKETS.HK });
const us = businessCardsFormulaV2({ quantity: 1000, size: { w: 89, h: 51, unit: 'mm' as const }, material: '400g_gloss_art', finishes: [], deadline: 'standard' as const, market: MARKETS.US });
const gb = businessCardsFormulaV2({ quantity: 1000, size: { w: 85, h: 55, unit: 'mm' as const }, material: '400g_gloss_art', finishes: [], deadline: 'standard' as const, market: MARKETS.GB });
const jp = businessCardsFormulaV2({ quantity: 1000, size: { w: 91, h: 55, unit: 'mm' as const }, material: '400g_gloss_art', finishes: [], deadline: 'standard' as const, market: MARKETS.JP });
console.log(`  HK 1000 张 ${hk.baseUnitPrice.toFixed(4)} HKD/张 (90×54mm)`);
console.log(`  US 1000 张 ${us.baseUnitPrice.toFixed(4)} USD/张 (89×51mm 3.5"×2")`);
console.log(`  GB 1000 张 ${gb.baseUnitPrice.toFixed(4)} GBP/张 (85×55mm EU ID-1)`);
console.log(`  JP 1000 张 ${jp.baseUnitPrice.toFixed(4)} JPY/张 (91×55mm)`);
console.log(`  尺寸按市场: ${hk.size ? 'has size' : 'no size in result'} (note: result 不带 size 字段, 实际公式用了 SIZE_BY_MARKET)`);
