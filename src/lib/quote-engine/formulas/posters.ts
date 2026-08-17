/**
 * 海报报价公式 v1 (Phase 3 — 第三个 SKU)
 * 2026-06-07
 *
 * 海报 vs 贴纸的核心差异：
 * - 尺寸大：400×600mm 起步，单张大版只能放 1-2 张
 * - 重量重：1 张 400×600 海报约 200g (200gsm 铜版纸)，运费是大头
 * - 起步价高：UV 印刷开机费 HKD 500/版
 * - 数量阶梯：1-9 / 10-49 / 50+ 三档价差大
 * - 最大尺寸限制：≤ 1000×1500mm (large_format 1060×1520mm 大版)
 *
 * 业务卡 28 张/版 vs 海报 1-2 张/版
 * → 海报拼版算法要单独处理（itemsPerSheet = 1-2）
 */

import type { FormulaContext, FormulaResult, ProductFormula } from '../types';
import { calculateGang, PRESS_SETUP_COSTS, type SheetSize } from '../core';
import type { Market, MarketCode } from '../markets';
import { MARKETS, marketFromLocale } from '../markets';
import { calculateShipping } from '../shipping';
import { calculateTax } from '../tax';
import { calculateFX, bestPaymentChannel } from '../fx';

const MAX_POSTER_WIDTH_MM = 1000;
const MAX_POSTER_HEIGHT_MM = 1500;

const TIER_PRICING: Array<{ min: number; max: number; basePrice: number }> = [
  { min: 1, max: 9, basePrice: 80 },
  { min: 10, max: 49, basePrice: 60 },
  { min: 50, max: 99, basePrice: 45 },
  { min: 100, max: 100000, basePrice: 35 },
];

export const postersFormula: ProductFormula = (ctx: FormulaContext & { market?: Market }): FormulaResult => {
  const { quantity, deadline, market, finishes } = ctx;
  const m = market || MARKETS[marketFromLocale('en')];

  // 海报默认尺寸 A2 (420×594mm) - 走 large_format 大版
  const itemWidthMM = 420;
  const itemHeightMM = 594;

  // 尺寸限制
  if (itemWidthMM > MAX_POSTER_WIDTH_MM || itemHeightMM > MAX_POSTER_HEIGHT_MM) {
    throw new Error(
      `海报尺寸超过最大限製 ${MAX_POSTER_WIDTH_MM}×${MAX_POSTER_HEIGHT_MM}mm。请联系销售 (enterprise@zprintpro.com)`
    );
  }

  // 拼版：large-format (1060×1520mm) 装 1-2 张海报
  const sheet: SheetSize = 'large-format';
  const gang = calculateGang({
    itemWidthMM,
    itemHeightMM,
    quantity,
    sheet,
    gangRunThreshold: 50, // 海报阈值更低（重 + 起步价高）
  });

  // UV 印刷开机费（比贴纸高 2x）
  const setupCost = PRESS_SETUP_COSTS.large_format.setupPerSheet;
  const paperCostPerSheet = 8.5; // 200gsm 大版纸
  const paperCost = gang.sheetsNeeded * paperCostPerSheet;

  // 数量阶梯
  const tier = TIER_PRICING.find((t) => quantity >= t.min && quantity <= t.max) || TIER_PRICING[0];
  const printingCost = quantity * tier.basePrice;

  // 工艺（覆膜等）
  const finishingCost = finishes.length * 50; // 简单加价

  // 重量：每张 ~40g (A2 157g 铜版纸 ≈ 0.25m² × 157g/m² = 39g;
  // 佐证 intuan 2026-07-18: A4 157g 宣传单 9.4g/张, A2 = 4×A4 ≈ 38g)
  // 旧值 0.2kg/张 高估 5 倍, 运费虚高
  const weightKg = (quantity * 0.04);

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

  // 目标毛利加成
  const marginMultiplier = 1 / (1 - m.targetMargin);
  const pricedCost = baseCost * marginMultiplier;

  // FX 风险 + 实际净收入
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
    minQuantity: 1,
    maxQuantity: 100000,
    leadTimeHours:
      deadline === 'same-day' ? { min: 24, max: 36 } :
      deadline === 'rush' ? { min: 72, max: 120 } :
      { min: 168, max: 240 },
    notes: [
      `Market: ${m.displayName} (${m.code})`,
      `Currency: ${m.currency}, Tax: ${taxResult.taxLabel || 'none'}`,
      `Gang: ${gang.itemsPerSheet} poster(s)/sheet, ${gang.sheetsNeeded} sheets, ${gang.mode}, ${(gang.utilization * 100).toFixed(1)}% util`,
      `Setup: HKD ${setupCost} (${PRESS_SETUP_COSTS.large_format.label})`,
      `Tier: ${tier.min}-${tier.max} = HKD ${tier.basePrice}/poster`,
      `Paper: ${gang.sheetsNeeded} × HKD ${paperCostPerSheet} = HKD ${paperCost.toFixed(2)}`,
      `Printing: HKD ${printingCost.toFixed(2)}`,
      `Shipping: HKD ${shipping.costHKD.toFixed(2)} via ${shipping.carrier} (${shipping.etaDays.min}-${shipping.etaDays.max}d, weight ${weightKg.toFixed(1)}kg)`,
      `FX: effective rate ${fxResult.effectiveRate} (${(fxResult.totalCostRatio).toFixed(1)}% fees), net margin ${fxResult.netMargin.toFixed(1)}%`,
      `Total ${m.currency}: ${taxResult.totalWithTax.toFixed(2)}`,
    ],
    gangLayout: gang,
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

export const POSTERS_CONFIG = {
  slug: 'posters',
  name: 'Custom Posters & Banners',
  description: 'A2/A1/A0 posters + roll-up banners. UV printed, 200gsm, waterproof optional. Print to US / UK / AU in 5-7 days.',
  sizes: [
    { w: 420, h: 594, unit: 'mm' as const, label: 'A2 (420×594mm)' },
    { w: 594, h: 841, unit: 'mm' as const, label: 'A1 (594×841mm)' },
    { w: 841, h: 1189, unit: 'mm' as const, label: 'A0 (841×1189mm)' },
  ],
  materials: ['200gsm_gloss_art', '200gsm_matte', '300gsm_premium'],
  finishes: ['matte-lamination', 'gloss-lamination', 'waterproof'],
  deadlines: ['standard', 'rush', 'same-day'] as const,
  formula: postersFormula,
  availableMarkets: Object.keys(MARKETS) as MarketCode[],
  maxDimensionsMM: { w: MAX_POSTER_WIDTH_MM, h: MAX_POSTER_HEIGHT_MM },
};
