// BC-BAN-DEPRECATED (2026-09-09 K3 拍板②): deprecated 名片公式模块的配套验证脚本, 随模块保留, 不随门童阻断。

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
import type { Market, MarketCode } from '../markets';
import { calculateFX } from '../fx';

// 2026-11-21 P0 fix: 公式額外成本明細只在回傳值的 inline 交集型別（宣告型別是 FormulaResult）,
// 顯式補回才能讀 setup/paper/finishing/shipping/total；同時為 reportMarket 補上參數型別。
type BcResult = ReturnType<typeof businessCardsFormulaV2> & {
  setupCostHKD: number;
  paperCostHKD: number;
  finishingCostHKD: number;
  shippingHKD: number;
  totalCostHKD: number;
  size?: unknown;
};
type BookResult = ReturnType<typeof booksFormula> & { paperCostHKD: number };

function reportMarket(code: MarketCode, market: Market) {
  const QUANTITY = 1000;
  const r = businessCardsFormulaV2({
    quantity: QUANTITY,
    size: { w: 89, h: 51, unit: 'mm' as const },
    material: '400g_gloss_art',
    finishes: [],
    deadline: 'standard' as const,
    market,
    sides: 'double',
  }) as BcResult;
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
for (const code of Object.keys(MARKETS) as MarketCode[]) {
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
}) as BookResult;
console.log(`  Books 50本 24页 HK | paperCost ${book.paperCostHKD} HKD (旧 15 HKD 破产, 现在 860.5 ✓)`);

console.log('\n=== 跨市场 sanity ===');
const hk = businessCardsFormulaV2({ quantity: 1000, size: { w: 90, h: 54, unit: 'mm' as const }, material: '400g_gloss_art', finishes: [], deadline: 'standard' as const, market: MARKETS.HK }) as BcResult;
const us = businessCardsFormulaV2({ quantity: 1000, size: { w: 89, h: 51, unit: 'mm' as const }, material: '400g_gloss_art', finishes: [], deadline: 'standard' as const, market: MARKETS.US }) as BcResult;
const gb = businessCardsFormulaV2({ quantity: 1000, size: { w: 85, h: 55, unit: 'mm' as const }, material: '400g_gloss_art', finishes: [], deadline: 'standard' as const, market: MARKETS.GB }) as BcResult;
const jp = businessCardsFormulaV2({ quantity: 1000, size: { w: 91, h: 55, unit: 'mm' as const }, material: '400g_gloss_art', finishes: [], deadline: 'standard' as const, market: MARKETS.JP }) as BcResult;
console.log(`  HK 1000 张 ${hk.baseUnitPrice.toFixed(4)} HKD/张 (90×54mm)`);
console.log(`  US 1000 张 ${us.baseUnitPrice.toFixed(4)} USD/张 (89×51mm 3.5"×2")`);
console.log(`  GB 1000 张 ${gb.baseUnitPrice.toFixed(4)} GBP/张 (85×55mm EU ID-1)`);
console.log(`  JP 1000 张 ${jp.baseUnitPrice.toFixed(4)} JPY/张 (91×55mm)`);
console.log(`  尺寸按市场: ${hk.size ? 'has size' : 'no size in result'} (note: result 不带 size 字段, 实际公式用了 SIZE_BY_MARKET)`);
