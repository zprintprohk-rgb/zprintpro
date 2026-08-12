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
import { getLiveRatesHKDLocal } from './quote-engine/fx';
import { UNIT_PRICE_ANCHORS } from './price-data.generated';

// 2026-07-13 Step 2: 实时汇率 (with 静态 fallback)
// pricing.ts 历史用硬编码汇率 (USD 0.128, JPY 19.5, GBP 0.101, AUD 0.195).
// 实际 open.er-api.com 拉到的汇率会差 1-5%, 用实时汇率精度更高.
// 首次启动 bootstrapLiveFxRates() 会预热缓存; 未命中缓存时回退硬编码值.
const LIVE_FX_RATES_FALLBACK = {
  HKD: 1,
  USD: 0.128,
  GBP: 0.101,
  AUD: 0.195,
  JPY: 19.5,
} as const;

function getLiveFxRates(): Record<keyof typeof LIVE_FX_RATES_FALLBACK, number> {
  try {
    const live = getLiveRatesHKDLocal();
    // live 是 "1 CCY = X HKD" 形式, 我们要 "1 HKD = X CCY", 需要 invert
    return {
      HKD: 1,
      USD: live.USD ? 1 / live.USD : LIVE_FX_RATES_FALLBACK.USD,
      JPY: live.JPY ? 1 / live.JPY : LIVE_FX_RATES_FALLBACK.JPY,
      GBP: live.GBP ? 1 / live.GBP : LIVE_FX_RATES_FALLBACK.GBP,
      AUD: live.AUD ? 1 / live.AUD : LIVE_FX_RATES_FALLBACK.AUD,
    };
  } catch {
    return { ...LIVE_FX_RATES_FALLBACK };
  }
}

// ============================================================================
// 2026-06-14 Phase B 修复 P0-5：JA locale JPY 结算强制化
// 背景：审计发现 JA 页面显示 JPY 但实际后台结算走 HKD，信任崩塌。
// 设计：feature flag `NEXT_PUBLIC_JA_FORCE_JPY` 控製（默认 false），
//       打开后 JA locale 走 JPY 计价/结算，HKD 后台记账仍可换算。
// 退出条件：把 env 改 false 一秒回滚。
// ============================================================================

/** JA locale 检测（兼容 'ja' 与 'ja-JP' 两种写法） */
export function isJALocale(locale: string | undefined | null): boolean {
  if (!locale) return false;
  const norm = String(locale).toLowerCase().trim();
  return norm === 'ja' || norm === 'ja-jp';
}

/**
 * 是否在 JA locale 下强制使用 JPY 结算。
 * - 默认 false（保持 HKD 结算，安全）
 * - 把 NEXT_PUBLIC_JA_FORCE_JPY 设为 'true' / '1' 启用
 */
export function isJAForceJPYEnabled(): boolean {
  const raw = process.env.NEXT_PUBLIC_JA_FORCE_JPY;
  if (!raw) return false;
  const v = String(raw).toLowerCase().trim();
  return v === 'true' || v === '1' || v === 'yes' || v === 'on';
}

/**
 * 解析 locale 应当使用的结算币种。
 * - JA + feature flag on → JPY
 * - en + region='GB'/'UK' → GBP（P0-E 多市场）
 * - en + region='AU'/'NZ' → AUD（P0-E 多市场）
 * - 其他 locale → 用 locale 默认（zh-hk=HKD, en=USD, ja=JPY）
 */
export function resolveSettlementCurrency(locale: string | undefined | null, region?: string | null): 'HKD' | 'USD' | 'GBP' | 'AUD' | 'JPY' {
  if (isJALocale(locale) && isJAForceJPYEnabled()) return 'JPY';
  // 现有 mapping：zh-hk=HKD, en=USD, ja=JPY
  if (locale === 'zh-hk') return 'HKD';
  if (locale === 'en') {
    if (region) {
      const r = region.toUpperCase();
      if (r === 'GB' || r === 'UK') return 'GBP';
      if (r === 'AU' || r === 'NZ') return 'AUD';
    }
    return 'USD';
  }
  if (isJALocale(locale)) return 'JPY';
  return 'HKD';
}

/** 货币符号表（含 GBP / AUD 多市场支持，P0-E） */
const CURRENCY_SYMBOLS: Record<'HKD' | 'USD' | 'GBP' | 'AUD' | 'JPY', string> = {
  HKD: 'HK$',
  USD: 'US$',
  GBP: '£',
  AUD: 'A$',
  JPY: '¥',
};

/**
 * 将基础 HKD 价格转换成目标币种（按汇率）。
 * 注意：与 convertCurrency 不同，本函数允许外部传任意目标币种，封装层使用。
 * 2026-07-13 Step 2: 用 getLiveFxRates() 取代硬编码 (USD 0.128, JPY 19.5).
 */
export function convertHKDTo(hkdAmount: number, target: 'HKD' | 'USD' | 'JPY'): number {
  const rates = getLiveFxRates();
  if (target === 'JPY') {
    return Math.round(hkdAmount * rates.JPY);
  }
  return Math.round(hkdAmount * rates[target] * 100) / 100;
}

/**
 * 按 locale 输出价格字符串。
 * 集成 P0-5：当 JA locale + feature flag 开启时，使用 JPY 结算（覆盖原 ¥ 显示逻辑）。
 * 集成 P0-E：支持 GBP / AUD（en-GB / en-AU 多市场）
 */
export function formatPriceForLocale(priceHKD: number, locale: string | undefined | null): { amount: number; currency: 'HKD' | 'USD' | 'GBP' | 'AUD' | 'JPY'; symbol: string; text: string } {
  const currency = resolveSettlementCurrency(locale);
  const symbol = CURRENCY_SYMBOLS[currency];
  let amount: number;
  let text: string;
  if (currency === 'JPY') {
    amount = convertHKDTo(priceHKD, 'JPY');
    text = `${symbol}${amount.toLocaleString()}`;
  } else if (currency === 'GBP') {
    amount = convertCurrency(priceHKD, 'GBP');
    text = `£${amount.toFixed(2)}`;
  } else if (currency === 'AUD') {
    amount = convertCurrency(priceHKD, 'AUD');
    text = `A$${amount.toFixed(2)}`;
  } else if (currency === 'USD') {
    amount = convertHKDTo(priceHKD, 'USD');
    text = `${symbol}${amount.toFixed(2)}`;
  } else {
    amount = priceHKD;
    text = `${symbol}${amount.toFixed(2)}`;
  }
  return { amount, currency, symbol, text };
}

/**
 * P0-E: 根据 region 解析 en locale 应该使用的货币。
 * 优先顺序: explicit region param > URL 路径 hint > 默认 USD
 * - region='GB' / 'UK' → GBP (£)
 * - region='AU' / 'NZ' → AUD (A$)
 * - 其他 → USD（默认美式英语市场）
 *
 * 用法: formatPriceForRegion(price, 'en', 'GB')
 */
export function formatPriceForRegion(
  priceHKD: number,
  locale: string | undefined | null,
  region?: string | null
): { amount: number; currency: 'HKD' | 'USD' | 'GBP' | 'AUD' | 'JPY'; symbol: string; text: string } {
  // ja 强製 JPY（feature flag 控制）
  if (locale && isJALocale(locale)) {
    return formatPriceForLocale(priceHKD, locale);
  }
  // zh-hk 保持 HKD
  if (locale === 'zh-hk') {
    return formatPriceForLocale(priceHKD, locale);
  }
  // en locale 按 region 切
  if (locale === 'en' && region) {
    const r = region.toUpperCase();
    if (r === 'GB' || r === 'UK') {
      const amount = convertCurrency(priceHKD, 'GBP');
      return { amount, currency: 'GBP', symbol: '£', text: `£${amount.toFixed(2)}` };
    }
    if (r === 'AU' || r === 'NZ') {
      const amount = convertCurrency(priceHKD, 'AUD');
      return { amount, currency: 'AUD', symbol: 'A$', text: `A$${amount.toFixed(2)}` };
    }
  }
  // 默认 USD
  return formatPriceForLocale(priceHKD, locale);
}

// ============================================================================
// 2026-07-13 Step 1: per-locale basePrice helper
// 优先用 product.basePrice_en / product.basePrice_ja（locale-optimized 竞品对标价）
// Fallback: convertHKDTo(product.basePrice, 'USD' / 'JPY') 用静态汇率
// ============================================================================

/** 取 Product 在指定 locale 下的 (list price) basePrice */
export function getLocaleBasePrice(
  product: { basePrice: number; basePrice_en?: number; basePrice_ja?: number },
  locale: string | undefined | null
): { amount: number; currency: 'HKD' | 'USD' | 'JPY'; symbol: string; text: string } {
  if (locale === 'zh-hk') {
    return { amount: product.basePrice, currency: 'HKD', symbol: 'HK$', text: `HK$${product.basePrice.toFixed(2)}` };
  }
  if (locale === 'en') {
    const usd = product.basePrice_en ?? convertHKDTo(product.basePrice, 'USD');
    return { amount: usd, currency: 'USD', symbol: '$', text: `$${usd.toFixed(2)}` };
  }
  if (isJALocale(locale)) {
    const jpy = product.basePrice_ja ?? convertHKDTo(product.basePrice, 'JPY');
    return { amount: jpy, currency: 'JPY', symbol: '¥', text: `¥${jpy.toLocaleString()}` };
  }
  // Unknown locale: fall back to HKD
  return { amount: product.basePrice, currency: 'HKD', symbol: 'HK$', text: `HK$${product.basePrice.toFixed(2)}` };
}

/** 取 Product 在指定 locale 下的 basePrice amount (仅数值, 用于计算) */
export function getLocaleBasePriceAmount(
  product: { basePrice: number; basePrice_en?: number; basePrice_ja?: number },
  locale: string | undefined | null
): number {
  if (locale === 'zh-hk') return product.basePrice;
  if (locale === 'en') return product.basePrice_en ?? convertHKDTo(product.basePrice, 'USD');
  if (isJALocale(locale)) return product.basePrice_ja ?? convertHKDTo(product.basePrice, 'JPY');
  return product.basePrice;
}

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
  // ========== Flyers (宣传单张) — 基于e-print.com.hk成本重新定价 ==========
  'a4-flyers': {
    'en': { min: 0.55, max: 0.95, unit: 'pc' },
    'ja': { min: 70, max: 120, unit: '枚' },
  },
  'a5-flyers': {
    'en': { min: 0.40, max: 0.70, unit: 'pc' },
    'ja': { min: 50, max: 90, unit: '枚' },
  },
  'double-sided-flyers': {
    'en': { min: 0.65, max: 1.15, unit: 'pc' },
    'ja': { min: 85, max: 145, unit: '枚' },
  },
  'folded-leaflets': {
    'en': { min: 0.80, max: 1.55, unit: 'pc' },
    'ja': { min: 110, max: 195, unit: '枚' },
  },
  'thick-paper-flyers': {
    'en': { min: 0.70, max: 1.25, unit: 'pc' },
    'ja': { min: 95, max: 155, unit: '枚' },
  },
  'eco-flyers': {
    'en': { min: 0.60, max: 1.00, unit: 'pc' },
    'ja': { min: 75, max: 125, unit: '枚' },
  },
  'same-day-flyers': {
    'en': { min: 0.95, max: 1.80, unit: 'pc' },
    'ja': { min: 125, max: 210, unit: '枚' },
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
    'en': { min: 2.3, max: 4.6, unit: 'pc' },
    'ja': { min: 300, max: 525, unit: '枚' },
  },
  'a1-posters': {
    'en': { min: 4.6, max: 8.28, unit: 'pc' },
    'ja': { min: 600, max: 943, unit: '枚' },
  },
  'outdoor-posters': {
    'en': { min: 3.68, max: 7.36, unit: 'pc' },
    'ja': { min: 480, max: 822, unit: '枚' },
  },
  'display-posters': {
    'en': { min: 7.36, max: 14.28, unit: 'pc' },
    'ja': { min: 960, max: 1677, unit: '枚' },
  },
  'art-posters': {
    'en': { min: 5.98, max: 10.96, unit: 'pc' },
    'ja': { min: 780, max: 1268, unit: '枚' },
  },
  'adhesive-posters': {
    'en': { min: 2.99, max: 5.59, unit: 'pc' },
    'ja': { min: 390, max: 663, unit: '枚' },
  },
  // ========== Packaging ==========
  'gift-boxes': {
    'en': { min: 0.83, max: 2.3, unit: 'pc' },
    'ja': { min: 110, max: 258, unit: '個' },
  },
  'cosmetic-boxes': {
    'en': { min: 1.84, max: 5.03, unit: 'pc' },
    'ja': { min: 240, max: 544, unit: '個' },
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
    'en': { min: 1.84, max: 4.29, unit: 'pc' },
    'ja': { min: 240, max: 480, unit: '個' },
  },
  'magnetic-closure-gift-box': {
    'en': { min: 3.45, max: 6.9, unit: 'pc' },
    'ja': { min: 450, max: 771, unit: '個' },
  },
  'electronics-packaging-box': {
    'en': { min: 1.84, max: 4.6, unit: 'pc' },
    'ja': { min: 240, max: 480, unit: '個' },
  },
  'kraft-paper-packaging-box': {
    'en': { min: 1.15, max: 2.98, unit: 'pc' },
    'ja': { min: 150, max: 317, unit: '個' },
  },
  // 2026-07-23 v7: drawer-slide-gift-box 合并 rigid-boxes, 加 gang-run-card-boxes
  'gang-run-card-boxes': {
    'en': { min: 25, max: 110, unit: 'pc' },
    'ja': { min: 3800, max: 12500, unit: '個' },
  },
  // ========== Paper Bags ==========
  'kraft-paper-bags': {
    'en': { min: 1.84, max: 4.62, unit: 'pc' },
    'ja': { min: 240, max: 538, unit: '個' },
  },
  'white-card-bags': {
    'en': { min: 2.76, max: 6.06, unit: 'pc' },
    'ja': { min: 360, max: 690, unit: '個' },
  },
  'gift-bags': {
    'en': { min: 4.6, max: 10.79, unit: 'pc' },
    'ja': { min: 600, max: 1200, unit: '個' },
  },
  'eco-paper-bags': {
    'en': { min: 1.84, max: 4.77, unit: 'pc' },
    'ja': { min: 240, max: 506, unit: '個' },
  },
  'handle-bags': {
    'en': { min: 1.84, max: 4.08, unit: 'pc' },
    'ja': { min: 240, max: 463, unit: '個' },
  },
  'large-bags': {
    'en': { min: 3.45, max: 7.86, unit: 'pc' },
    'ja': { min: 450, max: 841, unit: '個' },
  },
  // ========== Banners ==========
  'outdoor-vinyl-banners': {
    'en': { min: 2.76, max: 5.52, unit: 'sqft' },
    'ja': { min: 360, max: 706, unit: '平方フィート' },
  },
  'roll-up-banners': {
    'en': { min: 46, max: 92, unit: 'set' },
    'ja': { min: 6440, max: 12880, unit: 'セット' },
  },
  'adhesive-banners': {
    'en': { min: 2.3, max: 4.6, unit: 'sqft' },
    'ja': { min: 300, max: 569, unit: '平方フィート' },
  },
  'vehicle-wraps': {
    'en': { min: 6.44, max: 12.88, unit: 'sqft' },
    'ja': { min: 840, max: 1680, unit: '平方フィート' },
  },
  'mesh-banners': {
    'en': { min: 3.68, max: 9.2, unit: 'sqft' },
    'ja': { min: 480, max: 1113, unit: '平方フィート' },
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
    'ja': { min: 50, max: 150, unit: '個' },
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
    'ja': { min: 50, max: 90, unit: '個' },
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
    'en': { min: 0.40, max: 1.10, unit: 'pc' },
    'ja': { min: 50, max: 150, unit: '個' },
  },
  'desk-calendars': {
    'en': { min: 0.55, max: 1.10, unit: 'pc' },
    'ja': { min: 75, max: 150, unit: '個' },
  },
  'custom-calendars': {
    'en': { min: 0.80, max: 1.10, unit: 'pc' },
    'ja': { min: 110, max: 150, unit: '個' },
  },
  'mini-calendars': {
    'en': { min: 0.40, max: 0.65, unit: 'pc' },
    'ja': { min: 50, max: 90, unit: '個' },
  },
  'photo-frame-calendars': {
    'en': { min: 0.95, max: 1.10, unit: 'pc' },
    'ja': { min: 130, max: 150, unit: '個' },
  },
  'magnetic-calendars': {
    'en': { min: 0.40, max: 0.80, unit: 'pc' },
    'ja': { min: 50, max: 110, unit: '個' },
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
  'en':    { rate: 0.128,  symbol: 'US$' },      // 1 HKD = 0.128 USD
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

/**
 * 2026-07-18 P7 UX: "起价" 表达 — 取转换后价格字符串的下限，保留单位，去掉区间上限
 * 'HK$4-16/本' → 'HK$4/本'；'$0.22-1.00/pc' → '$0.22/pc'；'¥100-300/個' → '¥100/個'
 * 解决区间上限 (HK$16/本) 无数量语境吓退用户的问题；渲染侧统一加 起/From/〜 + MOQ 副行。
 */
export function convertToFromPrice(priceRange: string, locale: Locale, categorySlug?: string, productSlug?: string): string {
  const converted = convertPriceRangeString(priceRange, locale, categorySlug, productSlug);
  return converted.replace(/-[\d.,]+(?=\/|$)/, '');
}

/** 从 price_range 提取单位词 (去掉 '/100張' 里的数字): '/100張'→'張', '/本'→'本', '/個'→'個' */
export function getPriceUnitWord(priceRange: string): string {
  const unit = priceRange.split('/')[1] || '';
  return unit.replace(/^\d+/, '').trim();
}


// ============================================================================
// 类型安全报价计算（新架构）
// 与 types/quotation.ts 对齐
// ============================================================================

import type { QuotationFormData, PriceBreakdown, ProductType, PaperType, ProcessType } from '@/types/quotation';

const basePrices: Record<ProductType, number> = {
  'business-card': 200,
  'sticker': 150,
  'flyer': 180,
  'paper-bag': 500,
  'box': 800,
  'poster': 300,
};

const quantityFactors: { threshold: number; factor: number }[] = [
  { threshold: 100, factor: 1.0 },
  { threshold: 200, factor: 0.85 },
  { threshold: 500, factor: 0.65 },
  { threshold: 1000, factor: 0.50 },
  { threshold: 2000, factor: 0.40 },
  { threshold: 5000, factor: 0.30 },
  { threshold: 10000, factor: 0.25 },
];

const paperFees: Record<PaperType, number> = {
  'artpaper': 0,
  'cotton': 0.20,
  'recycled': 0.10,
  'pvc': 0.15,
};

const processFees: Record<ProcessType, number> = {
  'none': 0,
  'foil': 0.15,
  'uv': 0.10,
  'emboss': 0.12,
  'die-cut': 0.08,
};

export function calculatePrice(data: QuotationFormData): PriceBreakdown {
  const base = basePrices[data.productType];

  // 数量阶梯
  let qtyFactor = 1.0;
  for (const qf of quantityFactors) {
    if (data.quantity >= qf.threshold) {
      qtyFactor = qf.factor;
    }
  }

  const quantityPrice = base * (data.quantity / 100) * qtyFactor;

  // 纸张附加
  const paperFee = quantityPrice * paperFees[data.paper];

  // 工艺附加（叠加）
  let processFee = 0;
  for (const p of data.process) {
    processFee += quantityPrice * processFees[p];
  }

  // 双面
  const sidesFee = data.sides === 'double' ? quantityPrice * 0.15 : 0;

  // 快递
  const deliveryFee = data.delivery === 'express' ? 150 : 0;

  const subtotal = quantityPrice + paperFee + processFee + sidesFee;
  const total = subtotal + deliveryFee;

  return {
    basePrice: Math.round(base),
    quantityFactor: Math.round(quantityPrice),
    processFee: Math.round(processFee),
    paperFee: Math.round(paperFee),
    deliveryFee: Math.round(deliveryFee),
    total: Math.round(total),
    currency: 'HKD',
  };
}

// 货币转换（显示用，结算用HKD）


/** v18: Unit price anchor from precomputed data */
export function getUnitPriceAnchor(slug: string, locale: string): { price: number; qty: number; batchPrice: number; symbol: string; display: string; unitLabel: string } | null {
  var a = UNIT_PRICE_ANCHORS[slug];
  if (!a) return null;
  var l = a[locale];
  if (!l) l = a["zh-hk"];
  if (!l) return null;
  return {
    price: parseFloat(l.priceDisplay),
    qty: l.qty,
    batchPrice: l.batchPrice,
    symbol: locale === "ja" ? "\u00a5" : locale === "en" ? "$" : "HK$",
    display: (locale === "ja" ? "\u00a5" : locale === "en" ? "$" : "HK$") + l.priceDisplay,
    unitLabel: l.unitLabel,
  };
}
/**
 * 2026-07-26 K3 展示层单价锚（唯一入口）
 * PDP hero / 信任条 / 卡片一律走 getDisplayAnchor，禁止直接拿 price_range 整批起价当主锚。
 * 优先级: OVERRIDE 区间锚 > UNIT_PRICE_ANCHORS 表锚 > null(调用方回退 convertToFromPrice)
 */

export interface DisplayAnchor {
  big: string;       // 主锚: "HK$0.22" 或 "HK$0.50-3.00"
  unitLabel: string; // 每個 / 每張 / 每本 (本地化)
  sub: string;       // 小字: "10,000個起批 · 整批 HK$2,198" 或 "實價按規格報價"
}

/** B 类/特殊规则区间锚 (HKD 基准, en/ja 自动换算) */
const DISPLAY_ANCHOR_OVERRIDES: Record<string, { low: number; high: number; unit: '個' | '張' | '本' | '部' | '枚' }> = {
  'white-card-boxes':    { low: 0.50, high: 3.00,  unit: '個' }, // 专版白卡彩盒(非拼版)
  'rigid-boxes':         { low: 2.00, high: 10.00, unit: '個' }, // 精装盒
  'hardcover-books':     { low: 5.00, high: 10.00, unit: '本' }, // 精装书
  'graduation-yearbook': { low: 5.00, high: 10.00, unit: '本' }, // 毕业纪念册(精装)
  'textbooks':           { low: 1.00, high: 5.00,  unit: '本' }, // 教科书/校园
  'desk-calendars':      { low: 3.00, high: 8.00,  unit: '本' }, // 台历(1000本起批口径)
  'white-card-bags':     { low: 0.70, high: 3.50,  unit: '個' }, // 白卡手提袋(减半)
  'gift-bags':           { low: 5.00, high: 10.00, unit: '個' }, // 礼品袋(减半)
  'eco-paper-bags':      { low: 1.50, high: 4.00,  unit: '個' },
  'handle-bags':         { low: 1.50, high: 4.00,  unit: '個' },
  'large-bags':          { low: 3.00, high: 7.50,  unit: '個' }, // 减半
  'doujinshi-printing':  { low: 5.00, high: 10.00, unit: '部' }, // 同人本
  'acrylic-keychain':    { low: 3.00, high: 10.00, unit: '個' },
  'can-badge':           { low: 1.00, high: 5.00,  unit: '個' },
  'postcard-set':        { low: 1.00, high: 5.00,  unit: '枚' },
  'eco-tote-bag':        { low: 5.00, high: 10.00, unit: '個' },
  'a1-posters':          { low: 29.00, high: 29.00, unit: '張' }, // 喷绘实价(诚实锚, K3 标注待 user 拍板)
};

const UNIT_LABEL: Record<string, { zh: string; en: string; ja: string }> = {
  '個': { zh: '每個', en: '/pc', ja: '個あたり' },
  '張': { zh: '每張', en: '/sheet', ja: '枚あたり' },
  '本': { zh: '每本', en: '/book', ja: '冊あたり' },
  '部': { zh: '每部', en: '/copy', ja: '部あたり' },
  '枚': { zh: '每枚', en: '/pc', ja: '枚あたり' },
};

function fmt2(n: number): string {
  return n.toFixed(2);
}

export function getDisplayAnchor(slug: string, locale: string): DisplayAnchor | null {
  const ov = DISPLAY_ANCHOR_OVERRIDES[slug];
  if (ov) {
    const labels = UNIT_LABEL[ov.unit];
    const unitLabel = locale === 'en' ? labels.en : locale === 'ja' ? labels.ja : labels.zh;
    if (locale === 'zh-hk') {
      const big = ov.low === ov.high ? `HK$${fmt2(ov.low)}` : `HK$${fmt2(ov.low)}-${fmt2(ov.high)}`;
      return { big, unitLabel, sub: '實價按規格報價 · 滿$500包郵' };
    }
    const cur = locale === 'ja' ? 'JPY' : 'USD';
    const sym = locale === 'ja' ? '¥' : '$';
    const lo = convertCurrency(ov.low, cur);
    const hi = convertCurrency(ov.high, cur);
    const f = (n: number) => (cur === 'JPY' ? String(Math.round(n)) : fmt2(n));
    const big = ov.low === ov.high ? `${sym}${f(lo)}` : `${sym}${f(lo)}-${f(hi)}`;
    return { big, unitLabel, sub: locale === 'ja' ? '仕様により正式見積 · 送料無料条件あり' : 'Final quote by specs · Free shipping over $500' };
  }
  const a = getUnitPriceAnchor(slug, locale);
  if (a) {
    // 原始 unitLabel 值杂乱 ('每個'/'每張'/'1冊'/'per sheet'...), 归一化到 5 类单位
    const raw = a.unitLabel || '';
    const key = /張|sheet/i.test(raw) ? '張' : /本|冊|book/i.test(raw) ? '本' : /枚/.test(raw) ? '枚' : /部|copy/i.test(raw) ? '部' : '個';
    const labels = UNIT_LABEL[key];
    const unitLabel = locale === 'en' ? labels.en : locale === 'ja' ? labels.ja : labels.zh;
    const big = `${a.symbol}${fmt2(a.price)}`;
    const batch = `${a.symbol}${a.batchPrice.toLocaleString()}`;
    const qtyStr = a.qty.toLocaleString();
    const sub = locale === 'en'
      ? `From ${qtyStr} pcs · batch ${batch}`
      : locale === 'ja'
      ? `${qtyStr}${key === '本' ? '冊' : key === '張' || key === '枚' ? '枚' : key === '部' ? '部' : '個'}〜 · 一括 ${batch}`
      : `${qtyStr}${key}起批 · 整批 ${batch}`;
    return { big, unitLabel, sub };
  }
  return null;
}

// 2026-07-13 Step 2: 用 getLiveFxRates() 取代硬编码
export function convertCurrency(hkdAmount: number, targetCurrency: 'HKD' | 'USD' | 'GBP' | 'AUD' | 'JPY'): number {
  const rates = getLiveFxRates();
  // JPY 用整数（无小数币种）；其他币种保留 2 位小数
  if (targetCurrency === 'JPY') {
    return Math.round(hkdAmount * rates.JPY);
  }
  return Math.round(hkdAmount * rates[targetCurrency] * 100) / 100;
}
