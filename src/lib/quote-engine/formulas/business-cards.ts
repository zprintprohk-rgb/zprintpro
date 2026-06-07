/**
 * 业务卡报价公式 v2 (Phase 2 — 印刷大脑版)
 * 2026-06-07 重构：从"按数量乘积"改为"按版数分摊"
 *
 * 价格逻辑：
 * - 启动成本：4 色柯式 HKD 300/版
 * - 纸张：400g 铜版纸 HKD 4.2/张
 * - 拼版：85×55mm 名片，A3+ 大版 329×483mm，单版可排 28 张
 * - 工艺：起步价 + 单版费
 *
 * 总价 = (启动成本 + 纸张费 × 版数 + 工艺费 × 版数) / 数量
 *
 * 对标 e-print 战略：
 * - 小批量 (100-499)：我们穿透价 (15% off)
 * - 中批量 (500-4999)：贴身 e-print
 * - 大批量 (5000+)：包专线价格
 */

import type { FormulaContext, FormulaResult, ProductFormula } from '../types';
import { calculateGang, PRESS_SETUP_COSTS, PAPER_COSTS_PER_SHEET, type SheetSize } from '../core';
import { calculateFinishingCost } from '../finishings';
import type { Market, MarketCode } from '../markets';
import { MARKETS, marketFromLocale } from '../markets';
import { calculateShipping } from '../shipping';
import { calculateTax } from '../tax';
import { calculateFX, bestPaymentChannel } from '../fx';

interface BusinessCardConfig {
  paperType: string;
  paperCost: number;
  press: keyof typeof PRESS_SETUP_COSTS;
  sheet: SheetSize;
  standardSize: { w: number; h: number };
  /** 单张克重 (g) — 用于估算重量 */
  weightPerCardGram: number;
}

const DEFAULT_CONFIG: BusinessCardConfig = {
  paperType: '400g_gloss_art',
  paperCost: PAPER_COSTS_PER_SHEET['400g_gloss_art'],
  press: 'offset_4color',
  sheet: 'A3plus',
  standardSize: { w: 90, h: 54 }, // 欧规
  weightPerCardGram: 2.5, // 90×54mm × 400gsm ≈ 2g，加工艺 ~ 2.5g
};

export const businessCardsFormulaV2: ProductFormula = (ctx: FormulaContext & { market?: Market }): FormulaResult => {
  const { quantity, finishes, deadline, market } = ctx;
  const config = DEFAULT_CONFIG;
  const m = market || MARKETS[marketFromLocale('en')]; // 默认美国市场

  // 1. 拼版计算 (按市场的 gangRunThreshold)
  const gang = calculateGang({
    itemWidthMM: config.standardSize.w,
    itemHeightMM: config.standardSize.h,
    quantity,
    sheet: config.sheet,
    gangRunThreshold: m.gangRunThreshold,
  });

  // 2. 启动成本 (HKD)
  const pressSetup = PRESS_SETUP_COSTS[config.press];
  const setupCost = pressSetup.setupPerSheet;

  // 3. 纸张成本 (HKD)
  const paperCost = gang.sheetsNeeded * config.paperCost;

  // 4. 工艺成本 (HKD)
  let finishingTotal = 0;
  for (const f of finishes) {
    finishingTotal += calculateFinishingCost(f, gang.sheetsNeeded).total;
  }

  // 5. 重量估算 (g) → kg
  const totalWeightKg = (config.weightPerCardGram * quantity) / 1000;

  // 6. 运费 (HKD) — 按市场 zone + standard 服务
  const shipping = calculateShipping({
    zone: m.shippingZone,
    weightKg: totalWeightKg,
    serviceLevel: 'standard',
    orderTotalHKD: setupCost + paperCost + finishingTotal,
  });

  // 7. 交期倍数
  const deadlineMultiplier =
    deadline === 'same-day' ? 2.0 : deadline === 'rush' ? 1.5 : 1.0;
  const deadlineSurcharge = (setupCost + paperCost + finishingTotal) * (deadlineMultiplier - 1.0);

  // 8. 基础总价 (HKD) = 印刷成本 + 运费
  let baseCost = setupCost + paperCost + finishingTotal + shipping.costHKD + deadlineSurcharge;

  // 9. 目标毛利率加成 (按市场)
  // 例如美国目标 45%，价格 = 成本 / (1 - 0.45) = 成本 * 1.82
  const marginMultiplier = 1 / (1 - m.targetMargin);
  const pricedCost = baseCost * marginMultiplier;

  // 10. FX 风险溢价 + 实际净收入
  const totalCostHKD = setupCost + paperCost + finishingTotal + shipping.costHKD;
  const fromCurrencyEstimate = m.currency;
  const fxInputAmount = pricedCost * m.exchangeRate; // 客户付款本币（含目标毛利）
  const fxResult = calculateFX({
    fromAmount: fxInputAmount,
    fromCurrency: fromCurrencyEstimate,
    market: m,
    paymentChannel: bestPaymentChannel({ fromAmount: fxInputAmount, speed: '24h' }),
    factoryCostHKD: totalCostHKD,
    shippingCostHKD: shipping.costHKD,
  });

  // 实际客户付款 = 客户报价（含 FX 风险缓冲）
  const withFxBuffer = fxInputAmount * (1 + m.fxRiskBuffer);

  // 11. 转本币 + 税务
  const taxResult = calculateTax(withFxBuffer, m);
  const finalPrice = taxResult.totalWithTax;

  // 12. 单价 (本币)
  const unitPrice = finalPrice / quantity;

  return {
    baseUnitPrice: unitPrice,
    finishSurcharge: 0, // 已包含
    deadlineMultiplier,
    minQuantity: 100,
    maxQuantity: 100000,
    leadTimeHours:
      deadline === 'same-day' ? { min: 12, max: 24 } :
      deadline === 'rush' ? { min: 48, max: 72 } :
      { min: 120, max: 168 },
    notes: [
      `Market: ${m.displayName} (${m.code})`,
      `Currency: ${m.currency}, Tax: ${taxResult.taxLabel || 'none'}`,
      `Gang: ${gang.itemsPerSheet} pcs/sheet, ${gang.sheetsNeeded} sheets, ${gang.mode}, ${(gang.utilization * 100).toFixed(1)}% util`,
      `Setup: HKD ${setupCost} | Paper: HKD ${paperCost.toFixed(2)} | Finishing: HKD ${finishingTotal.toFixed(2)}`,
      `Shipping: HKD ${shipping.costHKD.toFixed(2)} via ${shipping.carrier} (${shipping.etaDays.min}-${shipping.etaDays.max}d)`,
      `Target margin: ${(m.targetMargin * 100).toFixed(0)}%`,
      `Total ${m.currency}: ${taxResult.totalWithTax.toFixed(2)} (preTax ${taxResult.preTaxAmount.toFixed(2)} + tax ${taxResult.taxAmount.toFixed(2)})`,
    ],
    gangLayout: gang,
    setupCostHKD: setupCost,
    paperCostHKD: paperCost,
    finishingCostHKD: finishingTotal,
    shippingHKD: shipping.costHKD,
    totalCostHKD: pricedCost,
    market: m,
    tax: taxResult,
  } as FormulaResult & {
    gangLayout: ReturnType<typeof calculateGang>;
    setupCostHKD: number;
    paperCostHKD: number;
    finishingCostHKD: number;
    shippingHKD: number;
    totalCostHKD: number;
    market: Market;
    tax: ReturnType<typeof calculateTax>;
  };
};

export const BUSINESS_CARDS_CONFIG_V2 = {
  slug: 'business-cards',
  name: 'Premium Business Cards',
  description: 'Premium 400gsm business cards. Heidelberg 4-color offset + HP Indigo. Printed in 24 hours, shipped to 50+ countries.',
  sizes: [
    { w: 90, h: 54, unit: 'mm' as const, label: 'Standard EU' },
    { w: 85, h: 55, unit: 'mm' as const, label: 'Standard US' },
    { w: 89, h: 51, unit: 'mm' as const, label: 'Standard AU' },
  ],
  materials: ['400g_gloss_art', '300g_gloss_art', '350g_kraft', '300g_specialty_gold'],
  finishes: ['spot-uv', 'foil', 'emboss', 'rounded-corners', 'matte-lamination', 'gloss-lamination'],
  deadlines: ['standard', 'rush', 'same-day'] as const,
  formula: businessCardsFormulaV2,
  /** 多市场可用 */
  availableMarkets: Object.keys(MARKETS) as MarketCode[],
};
