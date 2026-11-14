import type { Locale } from '@/types/locale';

/**
 * Offer-level return policy shared by PDP and category ItemList markup.
 *
 * Source of truth: /[locale]/legal/ — custom printed products are returnable
 * only for verified print-quality defects and the request window is 14 days.
 * Do not add returnMethod, returnFees or refundType here: offer-level policies
 * support only a subset of Organization-level MerchantReturnPolicy fields.
 */
export function getMerchantReturnPolicy(locale: Locale) {
  const description =
    locale === 'zh-hk'
      ? '按需訂製印刷產品僅限印刷品質缺陷等法定披露情形退貨，須於簽收後 14 天內提出申請；非質量問題不適用無條件退貨。'
      : locale === 'ja'
        ? '受注印刷品の返品は、印刷品質不良など法定開示ページ記載の場合に限ります。商品受領後 14 日以内に申請が必要です。品質不良以外の無条件返品は受け付けません。'
        : 'Made-to-order printed products may be returned only for print quality defects and other cases disclosed on the legal page. Requests must be submitted within 14 days of receipt; unconditional returns for non-quality reasons are not accepted.';

  return {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: locale === 'zh-hk' ? 'HK' : locale === 'ja' ? 'JP' : 'US',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 14,
    description,
  } as const;
}
