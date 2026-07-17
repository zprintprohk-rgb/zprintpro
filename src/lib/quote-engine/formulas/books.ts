/**
 * 书册报价公式 v1 (Phase 4 — 第 6 SKU)
 * 2026-06-07
 *
 * 书册 vs 名片核心差异：
 * - 多页结构: 内页 (按页数计费) + 封面 (单独算)
 * - 装订工艺必需: 骑马钉 / 胶装 / 锁线
 * - 起步价高 (装订费 HKD 500+/版)
 * - 5 大类: 练习簿 / 证书 / 校刊 / 教科书 / 画册
 */

import type { FormulaContext, FormulaResult, ProductFormula } from '../types';
import { calculateGang, PRESS_SETUP_COSTS, type SheetSize } from '../core';
import type { Market, MarketCode } from '../markets';
import { MARKETS, marketFromLocale } from '../markets';
import { calculateShipping } from '../shipping';
import { calculateTax } from '../tax';
import { calculateFX, bestPaymentChannel } from '../fx';

/** 装订方式 + 起步价 */
const BINDING_COSTS = {
  'saddle-stitch': { setup: 300, label: 'Saddle Stitch (骑马钉)' }, // 4-32 页
  'perfect-bind': { setup: 500, label: 'Perfect Bind (胶装)' }, // 32-200 页
  'case-bind': { setup: 800, label: 'Case Bind (精装/锁线)' }, // 100+ 页
  'spiral': { setup: 200, label: 'Spiral (线圈装订)' }, // 1-100 页
};

const DEFAULT_PAGES = 24; // 默认 24 页
const DEFAULT_INNER_PAGES_SHEET = 8; // 一张大版 = 8 页（双面 A3+）

export const booksFormula = (ctx: FormulaContext & {
  market?: Market;
  pages?: number;
  binding?: keyof typeof BINDING_COSTS;
}): FormulaResult => {
  const { quantity, deadline, market, finishes, pages, binding } = ctx;
  const m = market || MARKETS[marketFromLocale('en')];
  const totalPages = pages || DEFAULT_PAGES;
  const bindingType = binding || (totalPages <= 32 ? 'saddle-stitch' : totalPages <= 200 ? 'perfect-bind' : 'case-bind');

  // 内页拼版 (H2 修复 2026-06-07)
  // A3+ 大版 = 8 页（双面印刷）= 4 张 A4
  // 旧 bug: ceil(totalPages/8) * ceil(quantity/50) = 3 * 1 = 3 张
  //   → 24 页 × 50 本 = 1200 张内页, 实际需要 150 张大版 (差 50x)
  // 正确: ceil(totalPages / 8) × quantity
  //   → 24 页 / 8 = 3 张/本 × 50 本 = 150 张大版
  const sheetsNeeded = Math.ceil(totalPages / DEFAULT_INNER_PAGES_SHEET) * quantity; // 50 本起印

  // 装订起步价
  const bindingSetup = BINDING_COSTS[bindingType];
  const setupCost = bindingSetup.setup + (sheetsNeeded > 1 ? 100 : 0); // 多版额外制版

  // 内页成本
  const innerPaperCost = sheetsNeeded * 5.0; // 80g 内页纸
  const innerPrintingCost = quantity * totalPages * 0.08; // 每页 0.08HKD

  // 封面成本 (单独算, 250g 铜版纸 + 工艺)
  const coverPaperCost = Math.ceil(quantity / 4) * 8.5; // 一张大版 = 4 张封面
  const coverPrintingCost = quantity * 1.5; // 每张封面 1.5HKD
  const coverFinishingCost = finishes.length * 100; // UV/烫金 起步 100/项

  const printingCost = innerPrintingCost + coverPrintingCost;
  const paperCost = innerPaperCost + coverPaperCost;
  const finishingCost = coverFinishingCost;

  // 重量：按页数线性 (实测 intuan 2026-07-18: A4 16P 骑马钉画册 105g/本 ≈ 6.6g/页, 含封面)
  // 旧值固定 0.15kg/本, 与页数无关, 96P 画册严重低估
  const weightKg = (quantity * totalPages * 0.0066);

  // 运费
  const shipping = calculateShipping({
    zone: m.shippingZone,
    weightKg,
    serviceLevel: 'standard',
    orderTotalHKD: setupCost + paperCost + printingCost + finishingCost,
  });

  // 交期倍数
  const deadlineMultiplier = deadline === 'same-day' ? 2.0 : deadline === 'rush' ? 1.5 : 1.0;
  const deadlineSurcharge = (setupCost + paperCost + printingCost + finishingCost) * (deadlineMultiplier - 1.0);

  // 基础成本
  const baseCost = setupCost + paperCost + printingCost + finishingCost + shipping.costHKD + deadlineSurcharge;

  // 目标毛利
  const marginMultiplier = 1 / (1 - m.targetMargin);
  const pricedCost = baseCost * marginMultiplier;

  // FX + 风险缓冲
  const fromCurrencyAmount = pricedCost * m.exchangeRate;
  const fxResult = calculateFX({
    fromAmount: fromCurrencyAmount,
    fromCurrency: m.currency,
    market: m,
    paymentChannel: bestPaymentChannel({ fromAmount: fromCurrencyAmount, speed: '24h' }),
    factoryCostHKD: baseCost,
    shippingCostHKD: shipping.costHKD,
  });
  const withFxBuffer = fromCurrencyAmount * (1 + m.fxRiskBuffer);

  // 税务
  const taxResult = calculateTax(withFxBuffer, m);
  const finalPrice = taxResult.totalWithTax;
  const unitPrice = finalPrice / quantity;

  return {
    baseUnitPrice: unitPrice,
    finishSurcharge: 0,
    deadlineMultiplier,
    minQuantity: 50,
    maxQuantity: 100000,
    leadTimeHours:
      deadline === 'same-day' ? { min: 36, max: 72 } :
      deadline === 'rush' ? { min: 96, max: 168 } :
      { min: 168, max: 336 },
    notes: [
      `Market: ${m.displayName} (${m.code})`,
      `Currency: ${m.currency}, Tax: ${taxResult.taxLabel || 'none'}`,
      `Book: ${totalPages} pages × ${quantity} copies, ${bindingType} binding`,
      `Setup: HKD ${setupCost} (${bindingSetup.label})`,
      `Inner pages: ${sheetsNeeded} sheets × HKD 5.0 = HKD ${innerPaperCost.toFixed(2)}, printing HKD ${innerPrintingCost.toFixed(2)}`,
      `Cover: paper HKD ${coverPaperCost.toFixed(2)} + printing HKD ${coverPrintingCost.toFixed(2)} + finishing HKD ${coverFinishingCost.toFixed(2)}`,
      `Shipping: HKD ${shipping.costHKD.toFixed(2)} via ${shipping.carrier} (${shipping.etaDays.min}-${shipping.etaDays.max}d, weight ${weightKg.toFixed(2)}kg)`,
      `FX: effective rate ${fxResult.effectiveRate} (${(fxResult.totalCostRatio).toFixed(1)}% fees), net margin ${fxResult.netMargin.toFixed(1)}%`,
      `Total ${m.currency}: ${taxResult.totalWithTax.toFixed(2)}`,
    ],
    gangLayout: { sheetsNeeded, itemsPerSheet: 50, utilization: 0.85, wasteRatio: 0.15, mode: 'isolate' as const, orientation: 'portrait' as const, mixDensity: 0.85, slotsUsed: sheetsNeeded, totalSheetCapacity: 50, itemTotalW: 297, itemTotalH: 210, isolationSheetsNeeded: sheetsNeeded, actualImpressions: sheetsNeeded * 50, overrun: sheetsNeeded * 50 - quantity, warnings: [], suggestions: [] },
    setupCostHKD: setupCost,
    paperCostHKD: paperCost,
    shippingHKD: shipping.costHKD,
    totalCostHKD: pricedCost,
    market: m,
    tax: taxResult,
    fx: fxResult,
  } as FormulaResult & {
    gangLayout: ReturnType<typeof calculateGang>;
    setupCostHKD: number;
    paperCostHKD: number;
    shippingHKD: number;
    totalCostHKD: number;
    market: Market;
    tax: ReturnType<typeof calculateTax>;
    fx: ReturnType<typeof calculateFX>;
  };
};

export const BOOKS_CONFIG = {
  slug: 'books',
  name: 'Custom Books & Booklets',
  description: 'Custom books, booklets, exercise books, certificates. Saddle stitch / perfect bind / case bind. 50 copies minimum.',
  pages: [12, 16, 24, 32, 48, 64, 96, 128, 200],
  bindings: Object.keys(BINDING_COSTS) as (keyof typeof BINDING_COSTS)[],
  bindingCosts: BINDING_COSTS,
  materials: ['80g_inner_paper', '105g_inner_paper', '250g_cover', '300g_cover'],
  finishes: ['matte-lamination', 'gloss-lamination', 'spot-uv', 'foil', 'emboss'],
  deadlines: ['standard', 'rush'] as const, // 同日不接 book
  formula: booksFormula,
  availableMarkets: Object.keys(MARKETS) as MarketCode[],
};
