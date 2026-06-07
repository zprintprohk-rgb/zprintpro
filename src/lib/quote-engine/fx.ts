/**
 * 换汇 (FX) 模块 — Quote Engine v4
 * 2026-06-07 升级：考虑 Airwallex 实际换汇成本 + 汇率风险溢价
 *
 * 实际成本链 (USD → HKD 场景)：
 *   客户付 USD 100
 *   - Airwallex 平台费 2.9% = -USD 2.90
 *   - 换汇点差 (mid-market + 1.5%) = -USD 1.50
 *   - 换汇手续费 0.5% = -USD 0.50
 *   = 净到账 USD 95.10 (HKD ≈ 742.97)
 *
 * 实际 vs 静态汇率：硬编码汇率让 32% 毛利率看起来 45%
 * 真实净利率 32% 才是给 BD 看的
 *
 * 汇率风险溢价：客户付款时 vs 工厂结算时汇率可能差 1-2%
 * 预留 0.5% (小额) ~ 1.5% (大额) 作为安全垫
 */

import type { Currency, Market } from './markets';

export type RateSource = 'live' | 'locked_24h' | 'forward_30d';
export type PaymentChannel = 'airwallex' | 'paypal' | 'bank_wire' | 'airwallex_locked';

/** 支付渠道费率 (实测 2026 Q1) */
const PAYMENT_FEES: Record<PaymentChannel, { platformFeeRate: number; fxSpreadRate: number; fixedFeeUSD: number }> = {
  airwallex: {
    platformFeeRate: 0.029, // 2.9%
    fxSpreadRate: 0.015, // 1.5% 点差
    fixedFeeUSD: 0,
  },
  airwallex_locked: {
    platformFeeRate: 0.029,
    fxSpreadRate: 0.008, // 锁汇点差 0.8% (比 live 优惠)
    fixedFeeUSD: 0,
  },
  paypal: {
    platformFeeRate: 0.044, // 4.4%
    fxSpreadRate: 0.035, // 3.5% (PayPal FX 差)
    fixedFeeUSD: 0.30,
  },
  bank_wire: {
    platformFeeRate: 0.005, // 0.5%
    fxSpreadRate: 0.020, // 2% (银行点差)
    fixedFeeUSD: 35, // USD 35 wire 费
  },
};

/** 实时基准汇率 (mid-market) — 2026-06-07 静态值
 *
 * ★ TODO: 部署后必须接实时 API (优先级 P0)
 * 候选: open.er-api.com (free) / exchangerate-api.com / Fixer.io
 * 部署策略: 实时 API 失败时回退到此静态表
 */
const STATIC_LIVE_RATES_HKD: Record<Currency, number> = {
  HKD: 1.0,
  USD: 7.81,
  GBP: 9.93,
  AUD: 5.10,
  JPY: 0.050,
  CAD: 5.71,
  CNY: 1.087,
  SGD: 5.81,
  NZD: 4.76,
};

/**
 * FXRateProvider 接口 — 实时汇率 provider
 *
 * 未来可实现:
 * - OpenERAPIProvider (free, no API key)
 * - AirwallexFXProvider (从 Airwallex API 拉真实换汇点差)
 * - CachedProvider (10min 缓存 + 静态 fallback)
 */
export interface FXRateProvider {
  /** Provider 名称 */
  name: string;
  /** 拉取实时汇率 (返回 HKD 基准) */
  fetchLiveRates(): Promise<Record<Currency, number>>;
  /** 拉取上一次成功时间 */
  lastUpdated: string;
}

/** 静态 fallback provider (默认) */
export const StaticFXProvider: FXRateProvider = {
  name: 'static-fallback',
  lastUpdated: '2026-06-07T00:00:00Z',
  async fetchLiveRates() {
    return STATIC_LIVE_RATES_HKD;
  },
};

/** 当前激活的 provider - 未来可换成 Airwallex FX API */
let activeProvider: FXRateProvider = StaticFXProvider;

/** 注入新 provider (用于测试或生产) */
export function setFXProvider(provider: FXRateProvider) {
  activeProvider = provider;
}

/** 动态拉取 (带 1 小时缓存) */
let rateCache: { rates: Record<Currency, number>; cachedAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 小时

export async function getLiveRatesHKD(): Promise<Record<Currency, number>> {
  const now = Date.now();
  if (rateCache && now - rateCache.cachedAt < CACHE_TTL_MS) {
    return rateCache.rates;
  }
  try {
    const rates = await activeProvider.fetchLiveRates();
    rateCache = { rates, cachedAt: now };
    return rates;
  } catch (e) {
    console.error('[FX] live rates fetch failed, using static:', e);
    return STATIC_LIVE_RATES_HKD;
  }
}

/** 同步获取 (用缓存或静态) */
export function getLiveRatesHKDLocal(): Record<Currency, number> {
  if (rateCache) return rateCache.rates;
  return STATIC_LIVE_RATES_HKD;
}

export interface FXQuote {
  fromCurrency: Currency;
  toCurrency: Currency;
  fromAmount: number;
  toAmount: number; // 客户付款 = 客户付了多少 toCurrency
  platformFeeAmount: number;
  platformFeeRate: number;
  fxSpreadAmount: number;
  fxSpreadRate: number;
  fixedFeeAmount: number;
  totalFees: number;
  /** 净到账 (toCurrency) - 扣除所有费用 */
  netAmount: number;
  /** 净到账 (HKD, 工厂成本币) */
  netAmountHKD: number;
  /** 实际有效汇率 (含点差) */
  effectiveRate: number;
  /** 基准 mid-market 汇率 */
  midMarketRate: number;
  /** 汇率风险溢价 (添加到客户报价) */
  fxRiskBuffer: number;
  /** 支付渠道 */
  paymentChannel: PaymentChannel;
  rateSource: RateSource;
  /** 总成本占比 (fees / fromAmount) */
  totalCostRatio: number;
  /** 实际净利率 (vs 客户付款) */
  netMargin: number;
}

/**
 * 计算换汇 + 支付成本
 * @param fromAmount 客户付款金额 (客户币种)
 * @param fromCurrency 客户币种 (e.g. USD)
 * @param market 目标市场 (用于判断目的币种 HKD)
 * @param paymentChannel 支付渠道 (默认 airwallex)
 * @param amountForHKDAfterFees 工厂成本 HKD (用于算净利率)
 */
export function calculateFX(input: {
  fromAmount: number;
  fromCurrency: Currency;
  market: Market;
  paymentChannel?: PaymentChannel;
  rateSource?: RateSource;
  factoryCostHKD?: number; // 工厂成本 HKD (用于算净利率)
  factoryCostLocal?: number; // 工厂成本 本币
  taxAmountLocal?: number;
  shippingCostHKD?: number;
}): FXQuote {
  const ch = input.paymentChannel || 'airwallex';
  const src = input.rateSource || 'live';
  const channel = ch === 'airwallex_locked' ? 'airwallex_locked' : ch;
  const fees = PAYMENT_FEES[channel];
  const toCurrency: Currency = 'HKD'; // 工厂收 HKD

  // 1. 客户付的币种不是 HKD 时换汇
  const liveRates = getLiveRatesHKDLocal();
  let midMarketRate = 1;
  let effectiveRate = 1;
  if (input.fromCurrency !== toCurrency) {
    // mid-market rate
    midMarketRate = liveRates[input.fromCurrency];
    // 实际有效汇率（考虑点差 + 平台费）
    // 实际收到 HKD = fromAmount * midMarketRate * (1 - fxSpreadRate) * (1 - platformFeeRate) - fixedFee
    effectiveRate =
      midMarketRate * (1 - fees.fxSpreadRate) * (1 - fees.platformFeeRate);
  } else {
    midMarketRate = 1;
    effectiveRate = 1 - fees.platformFeeRate;
  }

  const platformFeeAmount = input.fromAmount * fees.platformFeeRate;
  const fxSpreadAmount = input.fromAmount * fees.fxSpreadRate;
  // fixed fee 转换为 fromCurrency 等值（粗略：按 1:1 USD）
  const fixedFeeAmount = fees.fixedFeeUSD;
  const totalFees = platformFeeAmount + fxSpreadAmount + fixedFeeAmount;

  // 客户付款
  const toAmount = input.fromAmount;
  // 净到账 (HKD)
  const netAmountHKD = toAmount * effectiveRate;
  // 净到账 (fromCurrency)
  const netAmount = netAmountHKD / midMarketRate;

  // 净利率 (如果有工厂成本)
  let netMargin = 0;
  if (input.factoryCostHKD !== undefined && input.shippingCostHKD !== undefined) {
    const totalCost = input.factoryCostHKD + input.shippingCostHKD + (input.taxAmountLocal || 0) * 0.128;
    const profit = netAmountHKD - totalCost;
    netMargin = profit / toAmount;
  }

  // 汇率风险溢价
  // 大订单 + 长账期 → 高风险
  // 基础 0.5% (小额 / 即时结算)
  // 1.0% (中等订单 1000+ 张)
  // 1.5% (大订单 5000+ 张)
  let fxRiskBuffer = 0.005;
  if (input.fromAmount > 500) fxRiskBuffer = 0.01;
  if (input.fromAmount > 2000) fxRiskBuffer = 0.015;
  // 锁汇时降低
  if (src === 'locked_24h') fxRiskBuffer *= 0.5;
  if (src === 'forward_30d') fxRiskBuffer *= 0.2;

  const totalCostRatio = totalFees / toAmount;

  return {
    fromCurrency: input.fromCurrency,
    toCurrency,
    fromAmount: toAmount,
    toAmount,
    platformFeeAmount: Math.round(platformFeeAmount * 100) / 100,
    platformFeeRate: fees.platformFeeRate,
    fxSpreadAmount: Math.round(fxSpreadAmount * 100) / 100,
    fxSpreadRate: fees.fxSpreadRate,
    fixedFeeAmount: Math.round(fixedFeeAmount * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
    netAmountHKD: Math.round(netAmountHKD * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 10000) / 10000,
    midMarketRate,
    fxRiskBuffer,
    paymentChannel: channel,
    rateSource: src,
    totalCostRatio: Math.round(totalCostRatio * 1000) / 10, // %
    netMargin: Math.round(netMargin * 1000) / 10, // %
  };
}

/** 选择最优支付渠道 (按 fromAmount + 期望速度) */
export function bestPaymentChannel(input: {
  fromAmount: number;
  speed: 'instant' | '24h' | '30d';
}): PaymentChannel {
  if (input.speed === '30d') return 'airwallex_locked';
  if (input.fromAmount > 5000) return 'airwallex_locked'; // 大单锁汇
  if (input.speed === 'instant') return 'airwallex';
  return 'airwallex';
}
