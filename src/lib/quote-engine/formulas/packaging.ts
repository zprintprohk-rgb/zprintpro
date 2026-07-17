/**
 * 包装盒报价公式 v1 (Phase 4 — 第 4 SKU)
 * 2026-06-07
 *
 * 包装盒 vs 名片核心差异：
 * - 大尺寸 (100-300mm)，啤盒工艺必需
 * - 起步价高 (HKD 500+/版) - 啤版/制版费
 * - 数量阶梯密: 100 / 500 / 1000 / 5000
 * - 工艺多样: 磁吸/击凸/UV/烫金
 * - 5 大类: 礼品盒 / 化妆品盒 / 食品盒 / 快递盒 / 折叠盒
 */

import type { FormulaContext, FormulaResult, ProductFormula } from '../types';
import { calculateGang, PRESS_SETUP_COSTS, type SheetSize } from '../core';
import type { Market, MarketCode } from '../markets';
import { MARKETS, marketFromLocale } from '../markets';
import { calculateShipping } from '../shipping';
import { calculateTax } from '../tax';
import { calculateFX, bestPaymentChannel } from '../fx';

const DIE_CUT_MARGIN_BOX = 8; // 包装盒 8mm 啤位（结构件需要更多空间）

const TIER_PRICING: Array<{ min: number; max: number; basePrice: number }> = [
  { min: 100, max: 499, basePrice: 6.5 },
  { min: 500, max: 999, basePrice: 4.2 },
  { min: 1000, max: 4999, basePrice: 2.8 },
  { min: 5000, max: 100000, basePrice: 1.95 },
];

const DEFAULT_BOX_SIZE = { w: 200, h: 150 }; // 标准 200×150mm (礼品盒)

export const packagingFormula: ProductFormula = (ctx: FormulaContext & { market?: Market }): FormulaResult => {
  const { quantity, deadline, market, finishes } = ctx;
  const m = market || MARKETS[marketFromLocale('en')];

  // 拼版：200×150mm 包装盒 + B3 大版 + 8mm 啤位
  // 一版可排约 (353/216) × (500/166) = 1 × 3 = 3 张
  const gang = calculateGang({
    itemWidthMM: DEFAULT_BOX_SIZE.w,
    itemHeightMM: DEFAULT_BOX_SIZE.h,
    quantity,
    sheet: 'B3' as SheetSize,
    bleedMM: 3,
    dieCutMM: DIE_CUT_MARGIN_BOX,
    gangRunThreshold: m.gangRunThreshold,
  });

  // 4 色柯式 + 啤版起步价
  const setupCost = PRESS_SETUP_COSTS.offset_4color.setupPerSheet + 200; // 啤版费 200
  const paperCostPerSheet = 6.5; // 350g 白卡纸
  const paperCost = gang.sheetsNeeded * paperCostPerSheet;

  // 数量阶梯
  const tier = TIER_PRICING.find((t) => quantity >= t.min && quantity <= t.max) || TIER_PRICING[0];
  const printingCost = quantity * tier.basePrice;

  // 工艺（磁吸/击凸/UV/烫金等起步价高）
  let finishingCost = 0;
  for (const f of finishes) {
    finishingCost += 100; // 每个工艺起步 100
  }

  // 重量：每盒 ~30g (实测 intuan 2026-07-18: 双插卡盒 29g/个, 微坑盒 31g/个)
  const weightKg = (quantity * 0.03);

  // 运费（重 + 大）
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
      deadline === 'same-day' ? { min: 24, max: 48 } :
      deadline === 'rush' ? { min: 72, max: 120 } :
      { min: 144, max: 240 },
    notes: [
      `Market: ${m.displayName} (${m.code})`,
      `Currency: ${m.currency}, Tax: ${taxResult.taxLabel || 'none'}`,
      `Gang: ${gang.itemsPerSheet} boxes/sheet, ${gang.sheetsNeeded} sheets, ${gang.mode}, ${(gang.utilization * 100).toFixed(1)}% util`,
      `Setup: HKD ${setupCost} (4-color offset + die plate)`,
      `Tier: ${tier.min}-${tier.max} = HKD ${tier.basePrice}/box`,
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

export const PACKAGING_CONFIG = {
  slug: 'packaging',
  name: 'Custom Packaging Boxes',
  description: 'Custom packaging boxes: gift boxes, cosmetic boxes, food boxes, mailer boxes, folding boxes. Premium 350gsm + magnetic/embossing/UV.',
  sizes: [
    { w: 200, h: 150, unit: 'mm' as const, label: 'Standard Gift Box 200×150mm' },
    { w: 250, h: 200, unit: 'mm' as const, label: 'Premium Gift Box 250×200mm' },
    { w: 300, h: 200, unit: 'mm' as const, label: 'Mailer Box 300×200mm' },
  ],
  materials: ['350g_white_card', '400g_premium_card', 'kraft_350g', 'specialty_metallic'],
  finishes: ['spot-uv', 'foil', 'emboss', 'magnetic-closure', 'matte-lamination', 'gloss-lamination'],
  deadlines: ['standard', 'rush', 'same-day'] as const,
  formula: packagingFormula,
  availableMarkets: Object.keys(MARKETS) as MarketCode[],
};
