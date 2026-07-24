/**
 * price-injector.ts — Server-side price table injector for PDP ReferencePriceBlock
 * v13 任务卡 2026-07-25
 *
 * 数据来自 scripts/gen-price-data.mjs 预生成的 price-data.generated.ts
 * 零 fs 依赖，Next.js RSC 和 edge 均可安全 import
 */

export { getPriceTableForSlug, findClosestTierBatch } from './price-data.generated';
export type { PriceTableData, PriceConfig, PriceTier } from './price-injector-types';

/**
 * 生成 WhatsApp CTA 预填文本
 */
export function buildWhatsAppMessage(
  locale: string,
  productName: string,
  configLabel: string,
  qty: number,
  price: number,
  currency: string,
): string {
  const currencySymbol = currency === 'USD' ? '$' : currency === 'JPY' ? '¥' : 'HK$';
  const msg = {
    'zh-hk': `你好，我對「${productName}」有興趣。\n配置：${configLabel}\n數量：${qty} 個\n參考價：${currencySymbol}${price}\n請提供正式報價，謝謝。`,
    en: `Hi, I'm interested in "${productName}".\nConfig: ${configLabel}\nQty: ${qty}\nReference price: ${currencySymbol}${price}\nPlease provide a formal quote. Thanks.`,
    ja: `こんにちは、「${productName}」に興味があります。\n構成：${configLabel}\n数量：${qty} 個\n参考価格：${currencySymbol}${price}\n正式見積もりをお願いします。`,
  };
  return (msg as any)[locale] || msg.en;
}
