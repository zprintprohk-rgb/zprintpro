/**
 * 报价计算 + 多币种定价系统
 */

import { Locale } from './seo';

// ============================================================================
// 原有报价计算（书籍/画册类）
// ============================================================================

export interface QuoteParams {
  /** 页数（1-1000） */
  pages: number;
  /** 颜色模式 */
  color: 'black' | 'color';
  /** 装订方式 */
  binding: 'none' | 'staple' | 'spiral' | 'perfect';
  /** 数量（1-10000） */
  quantity: number;
  /** 是否覆膜 */
  lamination?: boolean;
  /** 纸张类型（可选） */
  paperType?: 'standard' | 'premium' | 'recycled';
  /** 双面打印（可选） */
  duplex?: boolean;
}

export interface QuoteResult {
  /** 单价（HKD） */
  unitPrice: number;
  /** 总价（HKD） */
  totalPrice: number;
  /** 明细项 */
  breakdown: {
    baseCost: number;
    colorSurcharge: number;
    bindingCost: number;
    laminationCost: number;
    paperSurcharge: number;
    quantityDiscount: number;
  };
  /** 货币单位 */
  currency: 'HKD';
}

/**
 * 计算报价
 * 公式：总价 = (基础价 + 彩色附加费 + 装订费 + 覆膜费) × 数量 × 折扣系数
 */
export function calculateQuote(params: QuoteParams): QuoteResult {
  const {
    pages,
    color,
    binding,
    quantity,
    lamination = false,
    paperType = 'standard',
    duplex = false,
  } = params;

  const baseCost = pages * 0.5;
  const colorSurcharge = color === 'color' ? baseCost * 1.5 : 0;
  const bindingCostMap: Record<QuoteParams['binding'], number> = {
    none: 0, staple: 2, spiral: 8, perfect: 15,
  };
  const bindingCost = bindingCostMap[binding];
  const laminationCost = lamination ? pages * 0.3 : 0;
  const paperSurchargeMap: Record<NonNullable<QuoteParams['paperType']>, number> =
    { standard: 0, premium: 0.2, recycled: 0.1 };
  const paperSurcharge = pages * paperSurchargeMap[paperType];
  const discountMap: Record<number, number> = { 1: 1.0, 10: 0.9, 50: 0.8, 100: 0.7, 500: 0.6, 1000: 0.5 };
  const discount = Object.entries(discountMap).reduce(
    (acc, [threshold, rate]) => (quantity >= Number(threshold) ? rate : acc), 1.0
  );
  const unitPrice = (baseCost + colorSurcharge + bindingCost + laminationCost + paperSurcharge) * (duplex ? 0.9 : 1.0);
  const totalPrice = unitPrice * quantity * discount;

  return {
    unitPrice: Math.round(unitPrice * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
    breakdown: { baseCost, colorSurcharge, bindingCost, laminationCost, paperSurcharge, quantityDiscount: discount },
    currency: 'HKD',
  };
}

// ============================================================================
// 多币种定价系统（2026-04-16 更新：分级定价模型）
// zh-hk: HKD (主场基准价，1×)
// en:    USD (分级倍率 × 基础汇率 0.128)
// ja:    JPY (分级倍率 × 基础汇率 19.5)
// ============================================================================

/** 品类分级倍率 — 基于竞品分析（运费、重量、竞争度） */
const CATEGORY_TIER_MULTIPLIERS: Record<string, { en: number; ja: number }> = {
  // A级：轻量高值，运费占比低，价格可接近本地
  'stickers':     { en: 1.9, ja: 1.9 },
  'flyers':       { en: 1.9, ja: 1.9 },
  'envelopes':    { en: 2.0, ja: 2.0 },

  // B级：中量中值，运费适中，保持竞争力
  'business-cards': { en: 2.3, ja: 2.3 },
  'posters':      { en: 2.5, ja: 2.5 },
  'banners':      { en: 2.5, ja: 2.5 },
  'menus':        { en: 2.5, ja: 2.5 },
  'calendars':    { en: 2.5, ja: 2.5 },
  'red-packets':  { en: 2.5, ja: 2.5 },

  // C级：重量低值，运费占比高，需覆盖成本
  'packaging':    { en: 3.2, ja: 3.2 },
  'paper-bags':   { en: 3.2, ja: 3.2 },
  'books':        { en: 3.2, ja: 3.2 },
  'educational':  { en: 3.0, ja: 3.0 },
};

const BASE_EXCHANGE_RATES: Record<Locale, { rate: number; symbol: string }> = {
  'zh-hk': { rate: 1,      symbol: 'HK$' },
  'en':    { rate: 0.128,  symbol: 'US$' },   // 1 HKD = 0.128 USD
  'ja':    { rate: 19.5,   symbol: '¥' },     // 1 HKD = 19.5 JPY
};

/** PayPal 手续费补偿系数 */
const PAYPAL_SURCHARGE = 1.03; // +3%

/** 获取品类的定价倍率 */
export function getCategoryMultiplier(categorySlug: string, locale: Locale): number {
  if (locale === 'zh-hk') return 1;
  const tier = CATEGORY_TIER_MULTIPLIERS[categorySlug];
  const multiplier = tier ? tier[locale] : 2.5; // 默认 2.5×
  // EN 市场额外叠加 PayPal 手续费
  return locale === 'en' ? multiplier * PAYPAL_SURCHARGE : multiplier;
}

/** 获取 effective 汇率（基础汇率 × 品类倍率） */
function getEffectiveRate(locale: Locale, categorySlug?: string): number {
  const base = BASE_EXCHANGE_RATES[locale].rate;
  if (locale === 'zh-hk') return base;
  const multiplier = categorySlug ? getCategoryMultiplier(categorySlug, locale) : 2.5 * (locale === 'en' ? PAYPAL_SURCHARGE : 1);
  return base * multiplier;
}

/** 所有分类都显示价格 */
export function shouldShowPrice(_categorySlug: string): boolean {
  return true;
}

/** 获取分类的报价提示文案 */
export function getQuoteLabel(locale: Locale): string {
  const labels: Record<Locale, string> = {
    'zh-hk': '需報價',
    'en':    'Quote',
    'ja':    'お見積もり',
  };
  return labels[locale];
}

/** 转换基础HKD价格到目标币种（支持品类分级定价） */
export function convertPrice(basePriceHkd: number, locale: Locale, categorySlug?: string): number {
  return basePriceHkd * getEffectiveRate(locale, categorySlug);
}

/** 格式化价格显示（单个数值） */
export function formatPrice(price: number, locale: Locale): string {
  const { symbol } = BASE_EXCHANGE_RATES[locale];
  if (locale === 'ja') {
    return `${symbol}${Math.round(price).toLocaleString()}`;
  }
  return `${symbol}${price.toFixed(2)}`;
}

/** 从 price_range 字符串提取并转换（支持品类分级定价） */
export function convertPriceRangeString(priceRange: string, locale: Locale, categorySlug?: string): string {
  const match = priceRange.match(/HK\$([\d.]+)(?:-([\d.]+))?\s*(?:\/(.*))?/);
  if (!match) return priceRange;

  const base = parseFloat(match[1]);
  const max = match[2] ? parseFloat(match[2]) : null;
  const unit = match[3] || '';
  const unitStr = unit ? `/${unit}` : '';
  const { symbol } = BASE_EXCHANGE_RATES[locale];

  const minPrice = convertPrice(base, locale, categorySlug);

  if (!max || max <= base) {
    if (locale === 'ja') return `${symbol}${Math.round(minPrice).toLocaleString()}${unitStr}`;
    return `${symbol}${minPrice.toFixed(2)}${unitStr}`;
  }

  const maxPrice = convertPrice(max, locale, categorySlug);
  if (locale === 'ja') {
    return `${symbol}${Math.round(minPrice).toLocaleString()}-${Math.round(maxPrice).toLocaleString()}${unitStr}`;
  }
  return `${symbol}${minPrice.toFixed(2)}-${maxPrice.toFixed(2)}${unitStr}`;
}
