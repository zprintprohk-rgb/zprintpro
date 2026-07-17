/**
 * 贴纸报价公式 v1 (Phase 4 — 第 3 SKU)
 * 2026-06-07
 *
 * 贴纸 vs 名片核心差异：
 * - 必须有啤位 (5mm die cut margin) - 否则切偏/毛边
 * - 5 种核心材质: 防水 PVC / 透明 vinyl / 白色 vinyl / 烫金 / 牛皮纸
 * - 起步价低 (贴纸小, 一版可排 80+ 张)
 * - 数量阶梯密: 50 / 100 / 500 / 1000 / 5000 / 10000
 * - 异形/圆形/方形 SKU 通用
 */

import type { FormulaContext, FormulaResult, ProductFormula } from '../types';
import { calculateGang, PRESS_SETUP_COSTS, type SheetSize } from '../core';
import type { Market, MarketCode } from '../markets';
import { MARKETS, marketFromLocale } from '../markets';
import { calculateShipping } from '../shipping';
import { calculateTax } from '../tax';
import { calculateFX, bestPaymentChannel } from '../fx';

const DIE_CUT_MARGIN_STICKER = 5; // 贴纸 5mm 啤位

const TIER_PRICING: Array<{ min: number; max: number; basePrice: number }> = [
  { min: 50, max: 99, basePrice: 0.30 },
  { min: 100, max: 499, basePrice: 0.20 },
  { min: 500, max: 999, basePrice: 0.10 },
  { min: 1000, max: 4999, basePrice: 0.06 },
  { min: 5000, max: 100000, basePrice: 0.04 },
];

const DEFAULT_STICKER_SIZE = { w: 50, h: 50 }; // 标准 50x50mm

export const stickersFormula: ProductFormula = (ctx: FormulaContext & { market?: Market }): FormulaResult => {
  const { quantity, deadline, market, finishes } = ctx;
  const m = market || MARKETS[marketFromLocale('en')];

  // 拼版：50x50mm 贴纸 + A3+ 大版 + 5mm 啤位
  // 一版可排约 (329/60) × (483/60) = 5 × 8 = 40 张
  const gang = calculateGang({
    itemWidthMM: DEFAULT_STICKER_SIZE.w,
    itemHeightMM: DEFAULT_STICKER_SIZE.h,
    quantity,
    sheet: 'A3plus' as SheetSize,
    bleedMM: 3,
    dieCutMM: DIE_CUT_MARGIN_STICKER,
    gangRunThreshold: m.gangRunThreshold,
  });

  // 数码印刷开机费 (贴纸小批量，数码更经济)
  const setupCost = PRESS_SETUP_COSTS.digital.setupPerSheet;
  const paperCostPerSheet = 4.5; // 50x50mm 防水 PVC 大版纸
  const paperCost = gang.sheetsNeeded * paperCostPerSheet;

  // 数量阶梯
  const tier = TIER_PRICING.find((t) => quantity >= t.min && quantity <= t.max) || TIER_PRICING[0];
  const printingCost = quantity * tier.basePrice;

  // 工艺（模切/覆膜等）
  const finishingCost = finishes.length * 30;

  // 重量：每张 0.5g (50x50mm 贴纸; 佐证 intuan 2026-07-18: 60×30mm 不干胶 0.36g/张,
  // 按面积比 50×50/60×30 = 1.39 → 0.36 × 1.39 ≈ 0.5g, 现值准确, 仅补来源注释)
  const weightKg = (quantity * 0.0005);

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
      deadline === 'same-day' ? { min: 12, max: 24 } :
      deadline === 'rush' ? { min: 48, max: 72 } :
      { min: 96, max: 144 },
    notes: [
      `Market: ${m.displayName} (${m.code})`,
      `Currency: ${m.currency}, Tax: ${taxResult.taxLabel || 'none'}`,
      `Gang: ${gang.itemsPerSheet} pcs/sheet, ${gang.sheetsNeeded} sheets, ${gang.mode}, ${(gang.utilization * 100).toFixed(1)}% util`,
      `Setup: HKD ${setupCost} (${PRESS_SETUP_COSTS.digital.label})`,
      `Tier: ${tier.min}-${tier.max} = HKD ${tier.basePrice}/sticker`,
      `Paper: ${gang.sheetsNeeded} × HKD ${paperCostPerSheet} = HKD ${paperCost.toFixed(2)}`,
      `Printing: HKD ${printingCost.toFixed(2)}`,
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

export const STICKERS_CONFIG = {
  slug: 'stickers',
  name: 'Custom Stickers & Labels',
  description: 'Custom die-cut stickers, waterproof vinyl, transparent, foil, holographic. 50 pcs minimum, rush available. Ships to 50+ countries.',
  sizes: [
    { w: 50, h: 50, unit: 'mm' as const, label: 'Square 50×50mm' },
    { w: 76, h: 76, unit: 'mm' as const, label: 'Round 76mm diameter' },
    { w: 90, h: 54, unit: 'mm' as const, label: 'Oval 90×54mm' },
  ],
  materials: ['waterproof_pvc', 'transparent_vinyl', 'white_vinyl', 'foil_paper', 'kraft_paper'],
  finishes: ['rounded-corners', 'matte-lamination', 'gloss-lamination'],
  deadlines: ['standard', 'rush', 'same-day'] as const,
  formula: stickersFormula,
  availableMarkets: Object.keys(MARKETS) as MarketCode[],
};
