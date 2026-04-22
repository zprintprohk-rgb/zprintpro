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
// 多币种定价系统（新增）
// zh-hk: HKD (主场基准价)
// en:    USD (国际价 ≈ HKD × 0.128 × 3)
// ja:    JPY (日本价 ≈ HKD × 19.5 × 3)
// ============================================================================

const EXCHANGE_RATES: Record<Locale, { rate: number; symbol: string }> = {
  'zh-hk': { rate: 1, symbol: 'HK$' },
  'en':    { rate: 0.384, symbol: 'US$' },   // 0.128 USD/HKD × 3
  'ja':    { rate: 58.5, symbol: '¥' },      // 19.5 JPY/HKD × 3
};

/** 需要显示价格的分类（其余显示"需報價"） */
const PRICE_VISIBLE_CATEGORIES = ['flyers', 'posters', 'banners'];

/** 判断该分类是否显示价格 */
export function shouldShowPrice(categorySlug: string): boolean {
  return PRICE_VISIBLE_CATEGORIES.includes(categorySlug);
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

/** 转换基础HKD价格到目标币种 */
export function convertPrice(basePriceHkd: number, locale: Locale): number {
  return basePriceHkd * EXCHANGE_RATES[locale].rate;
}

/** 格式化价格显示（单个数值） */
export function formatPrice(price: number, locale: Locale): string {
  const { symbol } = EXCHANGE_RATES[locale];
  if (locale === 'ja') {
    return `${symbol}${Math.round(price).toLocaleString()}`;
  }
  return `${symbol}${price.toFixed(2)}`;
}

/** 从 price_range 字符串提取并转换 */
export function convertPriceRangeString(priceRange: string, locale: Locale): string {
  const match = priceRange.match(/HK\$([\d.]+)(?:-([\d.]+))?\s*(?:\/(.*))?/);
  if (!match) return priceRange;

  const base = parseFloat(match[1]);
  const max = match[2] ? parseFloat(match[2]) : null;
  const unit = match[3] || '';
  const unitStr = unit ? `/${unit}` : '';
  const { symbol } = EXCHANGE_RATES[locale];

  const minPrice = convertPrice(base, locale);

  if (!max || max <= base) {
    if (locale === 'ja') return `${symbol}${Math.round(minPrice).toLocaleString()}${unitStr}`;
    return `${symbol}${minPrice.toFixed(2)}${unitStr}`;
  }

  const maxPrice = convertPrice(max, locale);
  if (locale === 'ja') {
    return `${symbol}${Math.round(minPrice).toLocaleString()}-${Math.round(maxPrice).toLocaleString()}${unitStr}`;
  }
  return `${symbol}${minPrice.toFixed(2)}-${maxPrice.toFixed(2)}${unitStr}`;
}
