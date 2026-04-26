/**
 * 报价计算 + 多币种定价系统
 * 
 * 2026-04-26 重大更新：
 * EN/JA 市场采用完全独立的定价策略，直接对标海外市场头部竞品。
 * 不再使用 "HK 价格 × 倍数" 模型。
 * 
 * 核心原则：
 * 1. 名片（business-cards）：保持低价引流策略，沿用分级定价（不调整）
 * 2. Flyers/Stickers/Posters/Packaging/Paper-bags：设定独立价格，对标 Vistaprint/CustomStickers/PosterPrintShop/Packlane/ラクスル 等
 * 3. 其他品类：使用调整后的分级定价作为 fallback
 * 4. 所有 EN/JA 价格为含国际运费的包邮价
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
// EN/JA 独立定价系统（2026-04-26）
// 完全独立于 HK 定价，直接对标海外市场
// ============================================================================

/** 独立定价映射：slug -> locale -> {min, max, unit} */
const INDEPENDENT_PRICES: Record<string, Record<'en' | 'ja', { min: number; max: number; unit: string }>> = {
  // ========== Flyers ==========
  'a4-flyers': {
    'en': { min: 0.41, max: 0.83, unit: 'pc' },
    'ja': { min: 51, max: 101, unit: '枚' },
  },
  'a5-flyers': {
    'en': { min: 0.28, max: 0.55, unit: 'pc' },
    'ja': { min: 37, max: 74, unit: '枚' },
  },
  'double-sided-flyers': {
    'en': { min: 0.51, max: 1.01, unit: 'pc' },
    'ja': { min: 64, max: 120, unit: '枚' },
  },
  'folded-leaflets': {
    'en': { min: 0.64, max: 1.38, unit: 'pc' },
    'ja': { min: 83, max: 156, unit: '枚' },
  },
  'thick-paper-flyers': {
    'en': { min: 0.55, max: 1.1, unit: 'pc' },
    'ja': { min: 69, max: 129, unit: '枚' },
  },
  'eco-flyers': {
    'en': { min: 0.46, max: 0.87, unit: 'pc' },
    'ja': { min: 55, max: 106, unit: '枚' },
  },
  'same-day-flyers': {
    'en': { min: 0.74, max: 1.47, unit: 'pc' },
    'ja': { min: 92, max: 175, unit: '枚' },
  },
  // ========== Stickers ==========
  'waterproof-stickers': {
    'en': { min: 0.32, max: 0.6, unit: 'pc' },
    'ja': { min: 41, max: 78, unit: '枚' },
  },
  'transparent-stickers': {
    'en': { min: 0.41, max: 0.83, unit: 'pc' },
    'ja': { min: 51, max: 101, unit: '枚' },
  },
  'removable-stickers': {
    'en': { min: 0.37, max: 0.69, unit: 'pc' },
    'ja': { min: 46, max: 87, unit: '枚' },
  },
  'small-batch-stickers': {
    'en': { min: 0.55, max: 1.1, unit: 'pc' },
    'ja': { min: 69, max: 138, unit: '枚' },
  },
  'die-cut-stickers': {
    'en': { min: 0.46, max: 0.92, unit: 'pc' },
    'ja': { min: 60, max: 115, unit: '枚' },
  },
  'foil-stickers': {
    'en': { min: 0.51, max: 1.01, unit: 'pc' },
    'ja': { min: 64, max: 129, unit: '枚' },
  },
  'security-stickers': {
    'en': { min: 0.41, max: 0.78, unit: 'pc' },
    'ja': { min: 51, max: 97, unit: '枚' },
  },
  'fluorescent-stickers': {
    'en': { min: 0.46, max: 0.92, unit: 'pc' },
    'ja': { min: 60, max: 115, unit: '枚' },
  },
  'fruit-food-label-stickers': {
    'en': { min: 0.23, max: 0.51, unit: 'pc' },
    'ja': { min: 32, max: 64, unit: '枚' },
  },
  // ========== Posters ==========
  'a2-posters': {
    'en': { min: 1.38, max: 2.76, unit: 'pc' },
    'ja': { min: 184, max: 322, unit: '枚' },
  },
  'a1-posters': {
    'en': { min: 2.3, max: 4.14, unit: 'pc' },
    'ja': { min: 322, max: 506, unit: '枚' },
  },
  'outdoor-posters': {
    'en': { min: 1.84, max: 3.68, unit: 'pc' },
    'ja': { min: 258, max: 442, unit: '枚' },
  },
  'display-posters': {
    'en': { min: 1.66, max: 3.22, unit: 'pc' },
    'ja': { min: 221, max: 386, unit: '枚' },
  },
  'art-posters': {
    'en': { min: 2.76, max: 5.06, unit: 'pc' },
    'ja': { min: 368, max: 598, unit: '枚' },
  },
  'adhesive-posters': {
    'en': { min: 1.38, max: 2.58, unit: 'pc' },
    'ja': { min: 184, max: 313, unit: '枚' },
  },
  // ========== Packaging ==========
  'gift-boxes': {
    'en': { min: 0.83, max: 2.3, unit: 'pc' },
    'ja': { min: 110, max: 258, unit: '個' },
  },
  'cosmetic-boxes': {
    'en': { min: 1.01, max: 2.76, unit: 'pc' },
    'ja': { min: 138, max: 313, unit: '個' },
  },
  'food-boxes': {
    'en': { min: 0.74, max: 2.02, unit: 'pc' },
    'ja': { min: 101, max: 230, unit: '個' },
  },
  'mailer-boxes': {
    'en': { min: 0.55, max: 1.66, unit: 'pc' },
    'ja': { min: 74, max: 184, unit: '個' },
  },
  'folding-boxes': {
    'en': { min: 0.51, max: 1.38, unit: 'pc' },
    'ja': { min: 69, max: 156, unit: '個' },
  },
  'rigid-boxes': {
    'en': { min: 1.38, max: 3.22, unit: 'pc' },
    'ja': { min: 184, max: 368, unit: '個' },
  },
  'magnetic-closure-gift-box': {
    'en': { min: 2.3, max: 4.6, unit: 'pc' },
    'ja': { min: 322, max: 552, unit: '個' },
  },
  'electronics-packaging-box': {
    'en': { min: 0.92, max: 2.3, unit: 'pc' },
    'ja': { min: 129, max: 258, unit: '個' },
  },
  'kraft-paper-packaging-box': {
    'en': { min: 0.64, max: 1.66, unit: 'pc' },
    'ja': { min: 87, max: 184, unit: '個' },
  },
  'drawer-slide-gift-box': {
    'en': { min: 1.66, max: 3.5, unit: 'pc' },
    'ja': { min: 230, max: 414, unit: '個' },
  },
  // ========== Paper Bags ==========
  'kraft-paper-bags': {
    'en': { min: 0.55, max: 1.38, unit: 'pc' },
    'ja': { min: 74, max: 166, unit: '個' },
  },
  'white-card-bags': {
    'en': { min: 0.92, max: 2.02, unit: 'pc' },
    'ja': { min: 120, max: 230, unit: '個' },
  },
  'gift-bags': {
    'en': { min: 1.1, max: 2.58, unit: 'pc' },
    'ja': { min: 147, max: 294, unit: '個' },
  },
  'eco-paper-bags': {
    'en': { min: 0.64, max: 1.66, unit: 'pc' },
    'ja': { min: 83, max: 175, unit: '個' },
  },
  'handle-bags': {
    'en': { min: 0.83, max: 1.84, unit: 'pc' },
    'ja': { min: 110, max: 212, unit: '個' },
  },
  'large-bags': {
    'en': { min: 1.01, max: 2.3, unit: 'pc' },
    'ja': { min: 138, max: 258, unit: '個' },
  },
  // ========== Banners ==========
  'outdoor-vinyl-banners': {
    'en': { min: 1.84, max: 3.68, unit: 'sqft' },
    'ja': { min: 258, max: 506, unit: '平方フィート' },
  },
  'roll-up-banners': {
    'en': { min: 46, max: 92, unit: 'set' },
    'ja': { min: 6440, max: 12880, unit: 'セット' },
  },
  'adhesive-banners': {
    'en': { min: 1.38, max: 2.76, unit: 'sqft' },
    'ja': { min: 194, max: 368, unit: '平方フィート' },
  },
  'vehicle-wraps': {
    'en': { min: 4.6, max: 9.2, unit: 'sqft' },
    'ja': { min: 644, max: 1288, unit: '平方フィート' },
  },
  'mesh-banners': {
    'en': { min: 1.84, max: 4.6, unit: 'sqft' },
    'ja': { min: 258, max: 598, unit: '平方フィート' },
  },
  // ========== Books ==========
  'catalog-printing': {
    'en': { min: 4.6, max: 18.4, unit: 'pc' },
    'ja': { min: 644, max: 2576, unit: '個' },
  },
  'saddle-stitch-booklets': {
    'en': { min: 1.84, max: 7.36, unit: 'pc' },
    'ja': { min: 258, max: 1030, unit: '個' },
  },
  'perfect-bound-books': {
    'en': { min: 4.6, max: 13.8, unit: 'pc' },
    'ja': { min: 644, max: 1932, unit: '個' },
  },
  'hardcover-books': {
    'en': { min: 13.8, max: 36.8, unit: 'pc' },
    'ja': { min: 1932, max: 5150, unit: '個' },
  },
  'spiral-notebooks': {
    'en': { min: 2.76, max: 9.2, unit: 'pc' },
    'ja': { min: 386, max: 1288, unit: '個' },
  },
  // ========== Menus ==========
  'pvc-menus': {
    'en': { min: 2.76, max: 7.36, unit: 'pc' },
    'ja': { min: 386, max: 1030, unit: '個' },
  },
  'laminated-menus': {
    'en': { min: 1.84, max: 5.52, unit: 'pc' },
    'ja': { min: 258, max: 773, unit: '個' },
  },
  'hardcover-menus': {
    'en': { min: 9.2, max: 23, unit: 'pc' },
    'ja': { min: 1288, max: 3220, unit: '個' },
  },
  'drink-menus': {
    'en': { min: 3.68, max: 9.2, unit: 'pc' },
    'ja': { min: 515, max: 1288, unit: '個' },
  },
  'disposable-menus': {
    'en': { min: 0.14, max: 0.46, unit: 'pc' },
    'ja': { min: 20, max: 64, unit: '個' },
  },
  // ========== Envelopes ==========
  'business-envelopes': {
    'en': { min: 0.14, max: 0.74, unit: 'pc' },
    'ja': { min: 20, max: 103, unit: '個' },
  },
  'colored-envelopes': {
    'en': { min: 0.18, max: 0.92, unit: 'pc' },
    'ja': { min: 25, max: 129, unit: '個' },
  },
  'large-envelopes': {
    'en': { min: 0.28, max: 1.1, unit: 'pc' },
    'ja': { min: 39, max: 154, unit: '個' },
  },
  'pearl-envelopes': {
    'en': { min: 0.46, max: 1.84, unit: 'pc' },
    'ja': { min: 64, max: 258, unit: '個' },
  },
  // ========== Calendars ==========
  'wall-calendars': {
    'en': { min: 4.6, max: 13.8, unit: 'pc' },
    'ja': { min: 644, max: 1932, unit: '個' },
  },
  'desk-calendars': {
    'en': { min: 5.52, max: 16.56, unit: 'pc' },
    'ja': { min: 773, max: 2318, unit: '個' },
  },
  'custom-calendars': {
    'en': { min: 7.36, max: 20.24, unit: 'pc' },
    'ja': { min: 1030, max: 2834, unit: '個' },
  },
  'mini-calendars': {
    'en': { min: 2.76, max: 7.36, unit: 'pc' },
    'ja': { min: 386, max: 1030, unit: '個' },
  },
  'photo-frame-calendars': {
    'en': { min: 9.2, max: 25.76, unit: 'pc' },
    'ja': { min: 1288, max: 3606, unit: '個' },
  },
  'magnetic-calendars': {
    'en': { min: 3.68, max: 11.04, unit: 'pc' },
    'ja': { min: 515, max: 1546, unit: '個' },
  },
  // ========== Red Packets ==========
  'foil-red-packets': {
    'en': { min: 0.46, max: 1.84, unit: 'pc' },
    'ja': { min: 64, max: 258, unit: '個' },
  },
  'embossed-red-packets': {
    'en': { min: 0.92, max: 3.22, unit: 'pc' },
    'ja': { min: 129, max: 451, unit: '個' },
  },
  'custom-red-packets': {
    'en': { min: 0.74, max: 2.3, unit: 'pc' },
    'ja': { min: 103, max: 322, unit: '個' },
  },
  'cartoon-red-packets': {
    'en': { min: 0.46, max: 1.84, unit: 'pc' },
    'ja': { min: 64, max: 258, unit: '個' },
  },
  'eco-red-packets': {
    'en': { min: 0.74, max: 2.3, unit: 'pc' },
    'ja': { min: 103, max: 322, unit: '個' },
  },
  'large-red-packets': {
    'en': { min: 0.92, max: 2.76, unit: 'pc' },
    'ja': { min: 129, max: 387, unit: '個' },
  },
  // ========== Educational ==========
  'exercise-books': {
    'en': { min: 1.84, max: 5.52, unit: 'pc' },
    'ja': { min: 258, max: 773, unit: '個' },
  },
  'certificates': {
    'en': { min: 2.76, max: 9.2, unit: 'pc' },
    'ja': { min: 386, max: 1288, unit: '個' },
  },
  'school-flyers': {
    'en': { min: 0.14, max: 0.37, unit: 'pc' },
    'ja': { min: 20, max: 52, unit: '個' },
  },
  'textbooks': {
    'en': { min: 9.2, max: 27.6, unit: 'pc' },
    'ja': { min: 1288, max: 3864, unit: '個' },
  },
};


/** 检查是否有独立定价 */
export function hasIndependentPrice(slug: string, locale: Locale): boolean {
  if (locale === 'zh-hk') return false;
  return !!INDEPENDENT_PRICES[slug]?.[locale];
}

/** 获取独立定价 */
export function getIndependentPrice(slug: string, locale: Locale): { min: number; max: number; unit: string } | null {
  if (locale === 'zh-hk') return null;
  return INDEPENDENT_PRICES[slug]?.[locale] ?? null;
}

// ============================================================================
// Fallback 分级定价（用于未设定独立定价的 SKU）
// 名片保持原有倍率不变（低价引流策略）
// ============================================================================

/** 品类分级倍率 — 仅作为 fallback 使用 */
const CATEGORY_TIER_MULTIPLIERS: Record<string, { en: number; ja: number }> = {
  // A级：轻量高值，运费占比低
  'envelopes':    { en: 2.0, ja: 2.0 },

  // B级：中量中值
  'business-cards': { en: 2.3, ja: 2.3 }, // 名片：保持原有，不调整
  'banners':      { en: 2.5, ja: 2.5 },
  'menus':        { en: 2.5, ja: 2.5 },
  'calendars':    { en: 2.5, ja: 2.5 },
  'red-packets':  { en: 2.5, ja: 2.5 },

  // C级：重量低值，运费占比高
  'books':        { en: 3.0, ja: 3.0 },
  'educational':  { en: 2.8, ja: 2.8 },
};

const BASE_EXCHANGE_RATES: Record<Locale, { rate: number; symbol: string }> = {
  'zh-hk': { rate: 1,      symbol: 'HK$' },
  'en':    { rate: 0.128,  symbol: 'US$' },   // 1 HKD = 0.128 USD
  'ja':    { rate: 19.5,   symbol: '¥' },     // 1 HKD = 19.5 JPY
};

/** PayPal 手续费补偿系数 */
const PAYPAL_SURCHARGE = 1.035; // +3.5%

/** 获取品类的定价倍率（fallback 用） */
export function getCategoryMultiplier(categorySlug: string, locale: Locale): number {
  if (locale === 'zh-hk') return 1;
  const tier = CATEGORY_TIER_MULTIPLIERS[categorySlug];
  const multiplier = tier ? tier[locale] : 2.5; // 默认 2.5×
  // EN 市场额外叠加 PayPal 手续费
  return locale === 'en' ? multiplier * PAYPAL_SURCHARGE : multiplier;
}

/** 获取 effective 汇率（基础汇率 × 品类倍率）— fallback 用 */
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

/** 转换基础HKD价格到目标币种（支持品类分级定价）— fallback 用 */
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

/** 
 * 转换 price_range 字符串到目标币种
 * 
 * 优先级：
 * 1. 如果传入了 productSlug 且该 SKU 有独立定价 → 使用独立定价
 * 2. 否则使用分级定价（HK 价格 × 品类倍率）
 */
export function convertPriceRangeString(priceRange: string, locale: Locale, categorySlug?: string, productSlug?: string): string {
  // HK 市场直接返回原字符串
  if (locale === 'zh-hk') return priceRange;

  // 1. 优先检查独立定价
  if (productSlug) {
    const independent = getIndependentPrice(productSlug, locale);
    if (independent) {
      const { symbol } = BASE_EXCHANGE_RATES[locale];
      const { min, max, unit } = independent;
      if (locale === 'ja') {
        return `${symbol}${Math.round(min).toLocaleString()}-${Math.round(max).toLocaleString()}/${unit}`;
      }
      return `${symbol}${min.toFixed(2)}-${max.toFixed(2)}/${unit}`;
    }
  }

  // 2. Fallback 到分级定价
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
