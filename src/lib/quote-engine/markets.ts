/**
 * 多市场定价配置 — Quote Engine v4 (Phase 3)
 * 2026-06-07
 *
 * 核心洞察：e-print / 99designs / moo.com 等竞争对手
 * 对不同市场用不同价格表 + 不同货币 + 不同税率
 * 我们 zprintpro 出口印刷，必须按市场动态定价
 *
 * 5 个市场（按 ROI 排序）：
 * 1. US (美国) - 高利润 45%，主战场
 * 2. HK (香港) - 现金流基础，免运费
 * 3. GB (英国) - VAT 20% 含税
 * 4. AU (澳洲) - GST 10%
 * 5. JP (日本) - 本地化
 */

export type MarketCode = 'HK' | 'US' | 'GB' | 'AU' | 'JP' | 'CA' | 'CN' | 'SG' | 'NZ';
export type Currency = 'HKD' | 'USD' | 'GBP' | 'AUD' | 'JPY' | 'CAD' | 'CNY' | 'SGD' | 'NZD';
export type TaxType = 'none' | 'sales_tax' | 'vat' | 'consumption_tax' | 'gst';
export type ShippingZone = 'local' | 'asia_pacific' | 'north_america' | 'europe' | 'oceania' | 'china_mainland';

export interface Market {
  code: MarketCode;
  /** 对应 Locale (用于自动选择) */
  locale: 'zh-hk' | 'en' | 'ja' | 'en-GB' | 'en-AU' | 'en-CA';
  name: string;
  currency: Currency;
  taxType: TaxType;
  /** 税率 (0.10 = 10%) */
  taxRate: number;
  /** 运费区域 */
  shippingZone: ShippingZone;
  /** Gang Run 阈值（按市场调） */
  gangRunThreshold: number;
  /** 最低订单金额 (本币) */
  minimumOrder: number;
  /** 目标毛利率 (0.25 = 25%) */
  targetMargin: number;
  /** HKD 到本币的汇率 (1 HKD = X 本币) */
  exchangeRate: number;
  /** 支付方式 (Airwallex / PayPal / Konbini / FPS / PayMe) */
  paymentMethods: string[];
  /** 汇率风险溢价 (0.5%-1.5%) - 客户付款时 vs 工厂结算时的波动 */
  fxRiskBuffer: number;
  /** UI 语言标签 */
  displayName: string;
}

/** 汇率 (2026-06-07 静态基准, 实际应接 API) */
export const EXCHANGE_RATES = {
  HKD: 1.0,
  USD: 0.128,
  GBP: 0.1,
  AUD: 0.196,
  JPY: 20.0,
  CAD: 0.175,
  CNY: 0.92,
  SGD: 0.172,
  NZD: 0.21,
};

export const MARKETS: Record<MarketCode, Market> = {
  HK: {
    code: 'HK',
    locale: 'zh-hk',
    name: 'Hong Kong',
    currency: 'HKD',
    taxType: 'none',
    taxRate: 0,
    shippingZone: 'local',
    gangRunThreshold: 1000,
    minimumOrder: 80,
    targetMargin: 0.25,
    exchangeRate: EXCHANGE_RATES.HKD,
    paymentMethods: ['Airwallex-HKD', 'PayMe', 'FPS', 'Alipay-HK'],
    fxRiskBuffer: 0.005, // 香港本地免换汇
    displayName: '香港 / Hong Kong',
  },
  US: {
    code: 'US',
    locale: 'en',
    name: 'United States',
    currency: 'USD',
    taxType: 'sales_tax',
    taxRate: 0.087, // 加州 sales tax 平均值
    shippingZone: 'north_america',
    gangRunThreshold: 500, // 美国市场更激进
    minimumOrder: 15, // USD 15 起步
    targetMargin: 0.45, // 高利润
    exchangeRate: EXCHANGE_RATES.USD,
    paymentMethods: ['Airwallex-USD', 'PayPal', 'ApplePay'],
    fxRiskBuffer: 0.012, // USD/HKD 高波动 + 大市场
    displayName: 'United States',
  },
  GB: {
    code: 'GB',
    locale: 'en-GB',
    name: 'United Kingdom',
    currency: 'GBP',
    taxType: 'vat',
    taxRate: 0.20,
    shippingZone: 'europe',
    gangRunThreshold: 600,
    minimumOrder: 12,
    targetMargin: 0.35,
    exchangeRate: EXCHANGE_RATES.GBP,
    paymentMethods: ['Airwallex-GBP', 'PayPal'],
    fxRiskBuffer: 0.015, // GBP 波动较大 + VAT 风险
    displayName: 'United Kingdom',
  },
  AU: {
    code: 'AU',
    locale: 'en-AU',
    name: 'Australia',
    currency: 'AUD',
    taxType: 'gst',
    taxRate: 0.10,
    shippingZone: 'oceania',
    gangRunThreshold: 800,
    minimumOrder: 20,
    targetMargin: 0.35,
    exchangeRate: EXCHANGE_RATES.AUD,
    paymentMethods: ['Airwallex-AUD', 'PayPal', 'Afterpay'],
    fxRiskBuffer: 0.013,
    displayName: 'Australia',
  },
  JP: {
    code: 'JP',
    locale: 'ja',
    name: 'Japan',
    currency: 'JPY',
    taxType: 'consumption_tax',
    taxRate: 0.10,
    shippingZone: 'asia_pacific',
    gangRunThreshold: 800,
    minimumOrder: 1500, // JPY
    targetMargin: 0.30,
    exchangeRate: EXCHANGE_RATES.JPY,
    paymentMethods: ['Airwallex-JPY', 'Konbini', '银行振込'],
    fxRiskBuffer: 0.010, // JPY 相对稳定
    displayName: '日本',
  },
  CA: {
    code: 'CA',
    locale: 'en-CA',
    name: 'Canada',
    currency: 'CAD',
    taxType: 'gst',
    taxRate: 0.13, // HST 综合
    shippingZone: 'north_america',
    gangRunThreshold: 600,
    minimumOrder: 18,
    targetMargin: 0.35,
    exchangeRate: EXCHANGE_RATES.CAD,
    paymentMethods: ['Airwallex-CAD', 'PayPal'],
    fxRiskBuffer: 0.012,
    displayName: 'Canada',
  },
  CN: {
    code: 'CN',
    locale: 'zh-hk',
    name: 'China Mainland',
    currency: 'CNY',
    taxType: 'vat',
    taxRate: 0.13,
    shippingZone: 'china_mainland',
    gangRunThreshold: 1000,
    minimumOrder: 60,
    targetMargin: 0.20,
    exchangeRate: EXCHANGE_RATES.CNY,
    paymentMethods: ['WeChat-Pay', 'Alipay-CN', 'Airwallex-CNY'],
    fxRiskBuffer: 0.008, // CNY/HKD 稳定
    displayName: '中国大陆',
  },
  SG: {
    code: 'SG',
    locale: 'en',
    name: 'Singapore',
    currency: 'SGD',
    taxType: 'gst',
    taxRate: 0.09,
    shippingZone: 'asia_pacific',
    gangRunThreshold: 700,
    minimumOrder: 20,
    targetMargin: 0.30,
    exchangeRate: EXCHANGE_RATES.SGD,
    paymentMethods: ['Airwallex-SGD', 'PayPal', 'PayNow'],
    fxRiskBuffer: 0.010,
    displayName: 'Singapore',
  },
  NZ: {
    code: 'NZ',
    locale: 'en',
    name: 'New Zealand',
    currency: 'NZD',
    taxType: 'gst',
    taxRate: 0.15,
    shippingZone: 'oceania',
    gangRunThreshold: 800,
    minimumOrder: 22,
    targetMargin: 0.30,
    exchangeRate: EXCHANGE_RATES.NZD,
    paymentMethods: ['Airwallex-NZD', 'PayPal'],
    fxRiskBuffer: 0.013,
    displayName: 'New Zealand',
  },
};

/** 按 locale 自动选 market (默认 en → US, zh-hk → HK, ja → JP) */
export function marketFromLocale(locale: string): MarketCode {
  const map: Record<string, MarketCode> = {
    'zh-hk': 'HK',
    'en': 'US',     // 默认 en → US (主战场)
    'en-US': 'US',
    'en-GB': 'GB',
    'en-AU': 'AU',
    'en-CA': 'CA',
    'en-NZ': 'NZ',
    'ja': 'JP',
    'zh-CN': 'CN',
  };
  return map[locale] || 'US';
}

export function getMarket(code: MarketCode): Market {
  return MARKETS[code];
}
