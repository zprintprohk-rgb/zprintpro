/**
 * price-injector.ts — Server-side price table injector for PDP ReferencePriceBlock
 * v13 任务卡 2026-07-25
 *
 * 数据来自 scripts/gen-price-data.mjs 预生成的 price-data.generated.ts
 * 零 fs 依赖，Next.js RSC 和 edge 均可安全 import
 */

export { getPriceTableForSlug, findClosestTierBatch, UNIT_PRICE_ANCHORS } from './price-data.generated';
export type { PriceTableData, PriceConfig, PriceTier } from './price-injector-types';

/**
 * v18: B-class range anchors (per-SKU) — displayed when getPriceTableForSlug returns null
 * white-card-boxes: 专版, 区间锚
 * flyers/books/leaflets: 数码单张, 区间锚
 */
export const B_CLASS_RANGE_ANCHORS: Record<string, Record<string, string>> = {
  'white-card-boxes': {
    'zh-hk': '每個 HK$0.5-3 起·實價按規格報價',
    en: 'HK$0.5-3 per box·Price varies by specs',
    ja: '1個 HK$0.5-3 から·実価格は仕様により異なります',
  },
  'a5-flyers': {
    'zh-hk': '每張 HK$0.14 起·實價按數量報價',
    en: 'From HK$0.14 per sheet·Price by quantity',
    ja: '1枚 HK$0.14 から·数量により変動',
  },
  'a4-flyers': {
    'zh-hk': '每張 HK$0.31 起·實價按數量報價',
    en: 'From HK$0.31 per sheet·Price by quantity',
    ja: '1枚 HK$0.31 から·数量により変動',
  },
  'same-day-flyers': {
    'zh-hk': '每張 HK$1.3 起·急件按需報價',
    en: 'From HK$1.3 per sheet·Rush order pricing',
    ja: '1枚 HK$1.3 から·急ぎ対応要相談',
  },
  'eco-flyers': {
    'zh-hk': '每張 HK$0.72 起·環保紙按需報價',
    en: 'From HK$0.72 per sheet·Eco paper pricing',
    ja: '1枚 HK$0.72 から·環保紙対応',
  },
  'saddle-stitch-booklets': {
    'zh-hk': '每本 HK$1.2 起·騎馬釘裝按需報價',
    en: 'From HK$1.2 per book·Saddle stitch pricing',
    ja: '1冊 HK$1.2 から·中綴じ製本',
  },
  'perfect-bound-books': {
    'zh-hk': '每本 HK$0.87 起·膠裝書按需報價',
    en: 'From HK$0.87 per book·Perfect bound pricing',
    ja: '1冊 HK$0.87 から·無線綴じ製本',
  },
  'exercise-books': {
    'zh-hk': '每本 HK$0.9 起·練習簿按需報價',
    en: 'From HK$0.9 per book·Exercise book pricing',
    ja: '1冊 HK$0.9 から·練習帳',
  },
  'folded-leaflets': {
    'zh-hk': '每張 HK$0.38 起·風琴摺按需報價',
    en: 'From HK$0.38 per sheet·Accordion fold pricing',
    ja: '1枚 HK$0.38 から·アコーディオン折り',
  },
  'special-fold-leaflets': {
    'zh-hk': '每個 HK$0.38 起·特殊摺頁按需報價',
    en: 'From HK$0.38 per pc·Special fold pricing',
    ja: '1個 HK$0.38 から·特殊折り',
  },
  'custom-flyers': {
    'zh-hk': '每個 HK$0.08 起·專版按需報價',
    en: 'From HK$0.08 per pc·Custom flyer pricing',
    ja: '1個 HK$0.08 から·専版チラシ',
  },
};

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
