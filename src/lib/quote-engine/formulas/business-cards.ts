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
  /** 单张克重 (g) — 用于估算重量 */
  weightPerCardGram: number;
}

/** 业务卡尺寸按市场分 (2026-06-07 C3 修复)
 * 行业标准 (ISO/IEC 7810 ID-1 for EU/UK, 北美 3.5"×2", 澳洲用 EU)
 * 旧: 硬编码 90×54mm, US/AU/UK 客户收到的名片塞不进当地卡夹
 */
const SIZE_BY_MARKET: Record<MarketCode, { w: number; h: number; label: string }> = {
  US: { w: 89, h: 51, label: 'US Standard (3.5"×2" = 88.9×50.8mm)' },
  CA: { w: 89, h: 51, label: 'CA Standard (3.5"×2")' },
  GB: { w: 85, h: 55, label: 'EU/UK ISO ID-1 (85×55mm)' },
  HK: { w: 90, h: 54, label: 'HK Standard (90×54mm)' },
  AU: { w: 90, h: 54, label: 'AU Standard (90×54mm)' },
  NZ: { w: 90, h: 54, label: 'NZ Standard (90×54mm)' },
  JP: { w: 91, h: 55, label: 'JP Standard (91×55mm)' },
  SG: { w: 90, h: 54, label: 'SG Standard (90×54mm)' },
  CN: { w: 90, h: 54, label: 'CN Standard (90×54mm)' },
};

const DEFAULT_CONFIG: BusinessCardConfig = {
  paperType: '400g_gloss_art',
  paperCost: PAPER_COSTS_PER_SHEET['400g_gloss_art'],
  press: 'offset_4color',
  sheet: 'A3plus',
  weightPerCardGram: 2.5, // 89×51mm × 400gsm ≈ 2g, 加工艺 ~ 2.5g
};

export const businessCardsFormulaV2: ProductFormula = (ctx: FormulaContext & { market?: Market }): FormulaResult => {
  const { quantity, finishes, deadline, market } = ctx;
  const config = DEFAULT_CONFIG;
  const m = market || MARKETS[marketFromLocale('en')]; // 默认美国市场
  // 按市场选尺寸 (C3 修复)
  const standardSize = SIZE_BY_MARKET[m.code];

  // 1. 拼版计算 (按市场的 gangRunThreshold + 市场尺寸)
  const gang = calculateGang({
    itemWidthMM: standardSize.w,
    itemHeightMM: standardSize.h,
    quantity,
    sheet: config.sheet,
    gangRunThreshold: m.gangRunThreshold,
    dieCutMM: 0, // 业务卡不需 die-cut (啤位是给贴纸/啤盒)
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

  // 8. 工厂成本 (HKD) — 印刷实际成本（不含运费）
  // 运费单独走 1.1x 加价 (不进入毛利率加成, 客户运费不该被 45% 毛利加成)
  const factoryCostHKD = setupCost + paperCost + finishingTotal + deadlineSurcharge;
  const shippingMarkupHKD = shipping.costHKD * 1.1; // 运费加价 10% (覆盖包装处理)
  const totalCostHKD = factoryCostHKD + shippingMarkupHKD;

  // 9. 目标毛利率加成 (按市场) — 只对工厂成本加, 不含运费
  // 例如美国目标 45%，印刷价 = factoryCost / (1 - 0.45) = factoryCost * 1.82
  const marginMultiplier = 1 / (1 - m.targetMargin);
  const pricedFactoryHKD = factoryCostHKD * marginMultiplier;
  const pricedShippingHKD = shippingMarkupHKD; // 运费不加毛利
  const pricedCostHKD = pricedFactoryHKD + pricedShippingHKD;

  // 10. FX 计算 (修复双重换汇 bug 2026-06-07)
  // 关键修复: 客户付款金额应该是 HKD → 本币 (用 markets.ts exchangeRate)
  // 然后 fx.ts 不要再做反向换汇, 直接用本币计算支付成本
  // 旧代码: fxInputAmount = pricedCost * exchangeRate (HKD→外币) 然后 fx.ts 又用 midMarketRate 反向
  // 新代码: 直接传本币金额, 让 fx.ts 算支付成本
  const customerPaysLocal = pricedCostHKD * m.exchangeRate; // 客户付款本币 (e.g. USD)
  const fxResult = calculateFX({
    fromAmount: customerPaysLocal,
    fromCurrency: m.currency,
    market: m,
    paymentChannel: bestPaymentChannel({ fromAmount: customerPaysLocal, speed: '24h' }),
    factoryCostHKD,         // 工厂成本 (印刷+deadline, 不含运费)
    shippingCostHKD: shippingMarkupHKD, // 运费加价版 (1.1x 原始运费)
  });

  // 实际客户付款 = 含 FX 风险缓冲
  const withFxBuffer = customerPaysLocal * (1 + m.fxRiskBuffer);

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
      `Shipping: HKD ${shipping.costHKD.toFixed(2)} (markup 1.1x = ${shippingMarkupHKD.toFixed(2)}) via ${shipping.carrier} (${shipping.etaDays.min}-${shipping.etaDays.max}d)`,
      `Target margin: ${(m.targetMargin * 100).toFixed(0)}% (on factory cost only, not shipping)`,
      `FX rate used: ${m.exchangeRate} (1 HKD = ${m.exchangeRate} ${m.currency})`,
      `FX risk buffer: ${(m.fxRiskBuffer * 100).toFixed(1)}%, Payment: ${fxResult.paymentChannel}`,
      `Total ${m.currency}: ${taxResult.totalWithTax.toFixed(2)} (preTax ${taxResult.preTaxAmount.toFixed(2)} + tax ${taxResult.taxAmount.toFixed(2)})`,
    ],
    gangLayout: gang,
    setupCostHKD: setupCost,
    paperCostHKD: paperCost,
    finishingCostHKD: finishingTotal,
    shippingHKD: shippingMarkupHKD,
    totalCostHKD: pricedCostHKD,
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
