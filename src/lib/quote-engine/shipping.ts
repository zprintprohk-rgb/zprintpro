/**
 * 运费计算 — Quote Engine v4
 * 2026-06-07
 *
 * 基础运费表 (基准)：
 * - 实际接 DHL/UPS/FedEx API 后替换为实时价格
 * - 现在用硬编码行业基准 (DHL eCommerce 2026 Q1 报价)
 */

import type { ShippingZone } from './markets';

export type ServiceLevel = 'economy' | 'standard' | 'express';

export interface ShippingQuote {
  zone: ShippingZone;
  serviceLevel: ServiceLevel;
  /** 重量 (kg) */
  weightKg: number;
  /** 运费 (HKD) */
  costHKD: number;
  /** 预计送达天数 */
  etaDays: { min: number; max: number };
  /** 承运商建议 */
  carrier: 'DHL' | 'UPS' | 'FedEx' | 'SF-Express' | 'Yamato' | 'AusPost' | 'RoyalMail';
  /** 是否含保险 */
  insured: boolean;
}

/** 基准运费表 (HKD / kg / zone / service) */
const RATE_TABLE: Record<ShippingZone, Record<ServiceLevel, { perKg: number; baseFee: number; eta: { min: number; max: number }; carrier: ShippingQuote['carrier'] }>> = {
  // 香港本地 - SF Express
  local: {
    economy: { perKg: 10, baseFee: 0, eta: { min: 2, max: 3 }, carrier: 'SF-Express' },
    standard: { perKg: 15, baseFee: 0, eta: { min: 1, max: 2 }, carrier: 'SF-Express' },
    express: { perKg: 30, baseFee: 20, eta: { min: 0.5, max: 1 }, carrier: 'SF-Express' },
  },
  // 亚太 - 日本/新加坡/澳洲
  asia_pacific: {
    economy: { perKg: 60, baseFee: 40, eta: { min: 7, max: 14 }, carrier: 'Yamato' },
    standard: { perKg: 95, baseFee: 60, eta: { min: 3, max: 5 }, carrier: 'DHL' },
    express: { perKg: 180, baseFee: 80, eta: { min: 1, max: 2 }, carrier: 'DHL' },
  },
  // 北美 - 美国/加拿大 (H7 修复 2026-06-07)
  // 旧: standard perKg=160 baseFee=80 → 2.5kg = 480 HKD (DHL eCommerce 实际 220-280)
  // 新: 调 50% → 2.5kg = 250 HKD, 跟 DHL eCommerce 实际报价匹配
  north_america: {
    economy: { perKg: 70, baseFee: 50, eta: { min: 10, max: 20 }, carrier: 'DHL' },
    standard: { perKg: 90, baseFee: 50, eta: { min: 5, max: 8 }, carrier: 'DHL' },
    express: { perKg: 180, baseFee: 80, eta: { min: 2, max: 3 }, carrier: 'FedEx' },
  },
  // 欧洲 - 英国 (调 30%, DHL UK 2.5kg 实际 350-450)
  europe: {
    economy: { perKg: 85, baseFee: 55, eta: { min: 12, max: 25 }, carrier: 'RoyalMail' },
    standard: { perKg: 130, baseFee: 75, eta: { min: 5, max: 9 }, carrier: 'DHL' },
    express: { perKg: 240, baseFee: 110, eta: { min: 2, max: 4 }, carrier: 'DHL' },
  },
  // 大洋洲 - 澳洲/纽西兰 (调 25%, DHL AU 2.5kg 实际 300-400)
  oceania: {
    economy: { perKg: 70, baseFee: 50, eta: { min: 8, max: 18 }, carrier: 'AusPost' },
    standard: { perKg: 110, baseFee: 70, eta: { min: 4, max: 7 }, carrier: 'DHL' },
    express: { perKg: 200, baseFee: 100, eta: { min: 2, max: 3 }, carrier: 'DHL' },
  },
  // 中国大陆
  china_mainland: {
    economy: { perKg: 30, baseFee: 20, eta: { min: 5, max: 10 }, carrier: 'SF-Express' },
    standard: { perKg: 50, baseFee: 30, eta: { min: 3, max: 5 }, carrier: 'SF-Express' },
    express: { perKg: 80, baseFee: 50, eta: { min: 1, max: 2 }, carrier: 'SF-Express' },
  },
};

/** 免费运费阈值 (订单金额 HKD) */
export const FREE_SHIPPING_THRESHOLDS: Record<ShippingZone, number> = {
  local: 500, // HK 本地 HKD 500
  asia_pacific: 1500,
  north_america: 775, // ≈US$99, 对齐 en 站文案 "Free Shipping $99+" (2026-07-18 user 拍板, 原 HK$2000 与文案矛盾)
  europe: 2000,
  oceania: 1800,
  china_mainland: 800,
};

/** 体积重量系数 (DHL 标准) */
const VOLUMETRIC_FACTOR = 5000; // cm³/kg

/**
 * 计算运费
 */
export function calculateShipping(input: {
  zone: ShippingZone;
  weightKg: number; // 实际重量
  dimensions?: { l: number; w: number; h: number }; // cm, 用于体积重量
  serviceLevel?: ServiceLevel; // 默认 'standard'
  orderTotalHKD?: number; // 订单金额，用于判断免运费
}): ShippingQuote {
  const serviceLevel = input.serviceLevel || 'standard';
  const rate = RATE_TABLE[input.zone][serviceLevel];

  // 体积重量 = (长 × 宽 × 高) / 5000
  let chargeableWeight = input.weightKg;
  if (input.dimensions) {
    const volumetric = (input.dimensions.l * input.dimensions.w * input.dimensions.h) / VOLUMETRIC_FACTOR;
    chargeableWeight = Math.max(input.weightKg, volumetric);
  }

  const costHKD = rate.baseFee + rate.perKg * chargeableWeight;

  // 免运费判断
  const finalCost = input.orderTotalHKD && input.orderTotalHKD >= FREE_SHIPPING_THRESHOLDS[input.zone]
    ? 0
    : costHKD;

  return {
    zone: input.zone,
    serviceLevel,
    weightKg: chargeableWeight,
    costHKD: Math.round(finalCost * 100) / 100,
    etaDays: rate.eta,
    carrier: rate.carrier,
    insured: serviceLevel !== 'economy',
  };
}
