/**
 * 业务卡报价公式 (Phase 1 MVP)
 * 对标 WooCommerce Product Add-Ons + PriceWise Calculator Pro
 *
 * 价格逻辑（2026-06-07 baseline）：
 * - 100-499 张：$0.10/张
 * - 500-999 张：$0.08/张
 * - 1000+ 张：$0.06/张
 *
 * 工艺附加（每张）：
 * - spot-uv: +$0.03
 * - foil (烫金): +$0.05
 * - emboss (击凸): +$0.06
 * - rounded-corners: +$0.02
 * - matte-lamination: +$0.04
 * - gloss-lamination: +$0.04
 *
 * 交期倍数：
 * - standard (7 days): x1.0
 * - rush (3 days): x1.5
 * - same-day (24h): x2.0
 */

import type { FormulaContext, FormulaResult, ProductFormula, FinishOption } from '../types';

const TIER_PRICING: Array<{ min: number; max: number; price: number }> = [
  { min: 100, max: 499, price: 0.10 },
  { min: 500, max: 999, price: 0.08 },
  { min: 1000, max: 100000, price: 0.06 },
];

const FINISH_SURCHARGE: Record<string, number> = {
  'spot-uv': 0.03,
  'foil': 0.05,
  'emboss': 0.06,
  'rounded-corners': 0.02,
  'matte-lamination': 0.04,
  'gloss-lamination': 0.04,
};

const DEADLINE_MULTIPLIER: Record<string, number> = {
  standard: 1.0,
  rush: 1.5,
  'same-day': 2.0,
};

const DEADLINE_LEAD_TIME: Record<string, { min: number; max: number }> = {
  standard: { min: 120, max: 168 }, // 5-7 days
  rush: { min: 48, max: 72 }, // 2-3 days
  'same-day': { min: 12, max: 24 }, // 12-24h
};

function getTierPrice(quantity: number): { price: number; tier: string } {
  for (const tier of TIER_PRICING) {
    if (quantity >= tier.min && quantity <= tier.max) {
      return { price: tier.price, tier: `${tier.min}-${tier.max === 100000 ? '+' : tier.max}` };
    }
  }
  return { price: TIER_PRICING[0].price, tier: 'default' };
}

export const businessCardsFormula: ProductFormula = (ctx: FormulaContext): FormulaResult => {
  const { quantity, finishes, deadline } = ctx;

  const tier = getTierPrice(quantity);
  const baseUnitPrice = tier.price;

  const finishSurcharge = finishes.reduce(
    (sum: number, f: FinishOption) => sum + (FINISH_SURCHARGE[f] || 0),
    0
  );
  const deadlineMultiplier = DEADLINE_MULTIPLIER[deadline] || 1.0;
  const leadTimeHours = DEADLINE_LEAD_TIME[deadline] || DEADLINE_LEAD_TIME.standard;

  return {
    baseUnitPrice,
    finishSurcharge,
    deadlineMultiplier,
    minQuantity: 100,
    maxQuantity: 100000,
    leadTimeHours,
    notes: [
      `Quantity tier: ${tier.tier} pcs = $${baseUnitPrice}/card`,
      `Finish surcharge: +$${finishSurcharge.toFixed(2)}/card`,
      `Deadline multiplier: x${deadlineMultiplier}`,
    ],
  };
};

export const BUSINESS_CARDS_CONFIG = {
  slug: 'business-cards',
  name: 'Premium Business Cards',
  description: 'Premium 400gsm stock with spot UV, foil, embossing & rounded corners. Printed in 24 hours, shipped to US / UK / AU.',
  sizes: [
    { w: 90, h: 54, unit: 'mm' as const, label: 'Standard EU' },
    { w: 85, h: 55, unit: 'mm' as const, label: 'Standard US' },
    { w: 89, h: 51, unit: 'mm' as const, label: 'Standard AU' },
  ],
  materials: ['400gsm matte art card', '300gsm coated', '350gsm kraft', '350gsm specialty'],
  finishes: Object.keys(FINISH_SURCHARGE),
  deadlines: Object.keys(DEADLINE_MULTIPLIER) as Array<keyof typeof DEADLINE_MULTIPLIER>,
  formula: businessCardsFormula,
};
