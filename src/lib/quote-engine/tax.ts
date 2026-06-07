/**
 * 税务计算 — Quote Engine v4
 * 2026-06-07
 *
 * 多市场税率 (基础 + 显示用标签)
 */

import type { Market, TaxType } from './markets';

export interface TaxBreakdown {
  taxType: TaxType;
  taxRate: number;
  /** 含税前金额 (本币) */
  preTaxAmount: number;
  /** 税额 (本币) */
  taxAmount: number;
  /** 含税金额 (本币) */
  totalWithTax: number;
  /** 显示用标签 (e.g. "VAT 20%" / "Sales Tax 8.7%") */
  taxLabel: string;
  /** 是否含税展示 (e.g. 美国价格通常 "未含税", 欧洲必须 "含税") */
  displayInclusive: boolean;
}

const TAX_LABELS: Record<TaxType, string> = {
  none: '',
  sales_tax: 'Sales Tax',
  vat: 'VAT',
  consumption_tax: '消費税',
  gst: 'GST',
};

const INCLUSIVE_ZONES: TaxType[] = ['vat', 'gst', 'consumption_tax']; // 这些市场标签价 = 含税价
const ADDITIVE_ZONES: TaxType[] = ['sales_tax']; // 这些市场标签价 = 未含税

export function calculateTax(amount: number, market: Market): TaxBreakdown {
  const taxAmount = amount * market.taxRate;
  const totalWithTax = amount + taxAmount;
  const taxLabel = market.taxType === 'none' ? '' : `${TAX_LABELS[market.taxType]} ${(market.taxRate * 100).toFixed(market.taxRate % 1 === 0 ? 0 : 1)}%`;
  const displayInclusive = INCLUSIVE_ZONES.includes(market.taxType);

  return {
    taxType: market.taxType,
    taxRate: market.taxRate,
    preTaxAmount: amount,
    taxAmount: Math.round(taxAmount * 100) / 100,
    totalWithTax: Math.round(totalWithTax * 100) / 100,
    taxLabel,
    displayInclusive,
  };
}

/** 多市场金额格式化 */
export function formatPriceByMarket(amount: number, currency: string, market?: Market): string {
  // JPY / KRW 不显示小数
  const fractionDigits = ['JPY', 'KRW', 'VND'].includes(currency) ? 0 : 2;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}
