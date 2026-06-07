/**
 * 纸袋报价公式 v1 (Phase 4 — 第 5 SKU)
 * 2026-06-07
 *
 * 纸袋 vs 名片核心差异：
 * - 大尺寸 (250×350mm)，手提袋
 * - 起步价高 (HKD 400+/版) - 含绳子/打孔
 * - gsm 计费 (120-300g 不同厚度)
 * - 5 大类: 牛皮纸袋 / 白卡纸袋 / 礼品袋 / 环保纸袋 / 手提袋
 */

import type { FormulaContext, FormulaResult, ProductFormula } from '../types';
import { calculateGang, PRESS_SETUP_COSTS, type SheetSize } from '../core';
import type { Market, MarketCode } from '../markets';
import { MARKETS, marketFromLocale } from '../markets';
import { calculateShipping } from '../shipping';
import { calculateTax } from '../tax';
import { calculateFX, bestPaymentChannel } from '../fx';

const TIER_PRICING: Array<{ min: number; max: number; basePrice: number }> = [
  { min: 100, max: 499, basePrice: 2.5 },
  { min: 500, max: 999, basePrice: 1.8 },
  { min: 1000, max: 4999, basePrice: 1.2 },
  { min: 5000, max: 100000, basePrice: 0.85 },
];

const DEFAULT_BAG_SIZE = { w: 250, h: 350 }; // 标准礼品袋

export const bagsFormula: ProductFormula = (ctx: FormulaContext & { market?: Market }): FormulaResult => {
  const { quantity, deadline, market, finishes } = ctx;
  const m = market || MARKETS[marketFromLocale('en')];

  // 拼版：250×350mm 纸袋 + A3+ 大版
  // 一版可排约 1 张 (250x350 vs 329x483)
  // 大批量用 B3 (353x500) 可排 1-2 张
  const gang = calculateGang({
    itemWidthMM: DEFAULT_BAG_SIZE.w,
    itemHeightMM: DEFAULT_BAG_SIZE.h,
    quantity,
    sheet: 'B3' as SheetSize,
    bleedMM: 5,
    dieCutMM: 3,
    gangRunThreshold: m.gangRunThreshold,
  });

  // 4 色柯式 + 绳子打孔
  const setupCost = PRESS_SETUP_COSTS.offset_4color.setupPerSheet + 150; // 绳子打孔费 150
  const paperCostPerSheet = 5.5; // 250gsm 牛皮纸
  const paperCost = gang.sheetsNeeded * paperCostPerSheet;

  // 数量阶梯
  const tier = TIER_PRICING.find((t) => quantity >= t.min && quantity <= t.max) || TIER_PRICING[0];
  const printingCost = quantity * tier.basePrice;

  // 工艺（覆膜/UV/烫金）
  let finishingCost = 0;
  for (const f of finishes) {
    finishingCost += 60;
  }

  // 重量：每袋 ~30g
  const weightKg = (quantity * 0.03);

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
    minQuantity: 100,
    maxQuantity: 100000,
    leadTimeHours:
      deadline === 'same-day' ? { min: 24, max: 36 } :
      deadline === 'rush' ? { min: 72, max: 120 } :
      { min: 144, max: 216 },
    notes: [
      `Market: ${m.displayName} (${m.code})`,
      `Currency: ${m.currency}, Tax: ${taxResult.taxLabel || 'none'}`,
      `Gang: ${gang.itemsPerSheet} bags/sheet, ${gang.sheetsNeeded} sheets, ${gang.mode}, ${(gang.utilization * 100).toFixed(1)}% util`,
      `Setup: HKD ${setupCost} (4-color offset + rope + hole)`,
      `Tier: ${tier.min}-${tier.max} = HKD ${tier.basePrice}/bag`,
      `Paper: ${gang.sheetsNeeded} × HKD ${paperCostPerSheet} = HKD ${paperCost.toFixed(2)}`,
      `Printing: HKD ${printingCost.toFixed(2)}`,
      `Finishing: HKD ${finishingCost.toFixed(2)} (${finishes.length} processes)`,
      `Shipping: HKD ${shipping.costHKD.toFixed(2)} via ${shipping.carrier} (${shipping.etaDays.min}-${shipping.etaDays.max}d, weight ${weightKg.toFixed(2)}kg)`,
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

export const BAGS_CONFIG = {
  slug: 'bags',
  name: 'Custom Paper Bags',
  description: 'Custom paper bags: kraft, white card, gift, eco, handle. 120-300gsm, with rope handle. Premium gift packaging.',
  sizes: [
    { w: 250, h: 350, unit: 'mm' as const, label: 'Standard Gift Bag 250×350mm' },
    { w: 320, h: 420, unit: 'mm' as const, label: 'Large Bag 320×420mm' },
    { w: 180, h: 240, unit: 'mm' as const, label: 'Small Bag 180×240mm' },
  ],
  materials: ['250g_kraft', '300g_white_card', '350g_kraft', '200g_specialty'],
  finishes: ['spot-uv', 'foil', 'matte-lamination', 'gloss-lamination', 'rope-handle'],
  deadlines: ['standard', 'rush', 'same-day'] as const,
  formula: bagsFormula,
  availableMarkets: Object.keys(MARKETS) as MarketCode[],
};
