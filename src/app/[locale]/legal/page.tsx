import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

interface LegalPageProps {
  params: { locale: string };
}

// 2026-06-18 Phase 0 法律公示页面 — 基于真实深圳实体数据
// 出典: 日本《特定商取引法》第3条 + 施行規則第2条 (必須記載事項 11 項)
const LEGAL_ENTITY = {
  sellerName: '深圳市彩龙印刷包装有限公司',
  sellerNameEn: 'Shenzhen Cailong Printing & Packaging Co., Ltd.',
  responsiblePerson: '唐运提',
  responsiblePersonEn: 'Tang Yunti',
  address: '〒518111 中華人民共和国 広東省深圳市龍崗区平湖街道嘉城路1号',
  addressEn: 'No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong 518111, China',
  phone: '+86-181-2638-0255',
  email: 'zprintpro@outlook.com',
  brand: '智印雲 / ZprintPro',
  establishedYear: 2009,
  // For schema.org — international format
  phoneRaw: '+8618126380255',
  postalCode: '518111',
  countryCode: 'CN',
  region: 'Guangdong',
  city: 'Shenzhen',
};

const translations = {
  'zh-hk': {
    title: '特定商取引法に基づく表記 | 智印雲 ZprintPro',
    titleShort: '特定商取引法に基づく表記',
    description:
      '智印雲 ZprintPro 銷售業者資訊・商品販売条件・特定商取引法に基づく表記(日本市場向け)。',
    h1: '特定商取引法に基づく表記',
    lastUpdated: '最終更新',
    sectionCrossBorder: '事業者の説明',
    crossBorderBody:
      'ZprintPro(智印雲)は、中華人民共和国深圳市に本社を置く国際印刷サービス事業者です。日本市場向けには越境EC(Eコマース)形式で商品を販売しており、日本国内には店舗・営業所・支店はございません。本ページは「特定商取引に関する法律」(特定商取引法)第3条および同法施行規則第2条に基づき、日本消費者の皆様に販売事業者を明示するものです。',
    sectionSeller: '販売事業者情報',
    sectionTransaction: '商品販売条件',
    sectionCustoms: '関税・輸入消費税について',
    customsBody:
      '本商品は中華人民共和国から国際便で発送されます。関税・輸入消費税はご注文者様のご負担となります(印刷物の HS code 4911.99 は関税 0% が一般的ですが、輸入消費税 10% が課税される場合があります)。詳細は税関までお問い合わせください。',
    sectionContact: 'お問い合わせ',
    contactBody:
      'ご質問・お問い合わせは下記までご連絡ください。日本語対応スタッフがお答えします(平日 9:00-18:00 日本時間)。',
    contactHours: '平日 9:00-18:00 日本時間',
    contactResponseSla: '通常 1-2 営業日以内に返信',
    fields: {
      sellerName: '販売業者名',
      responsiblePerson: '運営統括責任者',
      address: '所在地',
      phone: '電話番号',
      email: 'メールアドレス',
      brand: '運営ブランド',
      established: '設立年',
      langSupport: '対応言語',
      price: '販売価格',
      additionalFees: '商品代金以外の必要料金',
      paymentMethod: '支払方法',
      paymentTiming: '支払時期',
      deliveryTiming: '引渡時期',
      returns: '返品・交換',
      quantityLimit: '販売数量の制限',
      techEnv: '動作環境',
    },
    values: {
      price:
        '各商品ページに表示(消費税込価格)。送料は別途(下記参照)。商品によりボリュームディスカウントあり(500枚 15% OFF / 1,000枚 25% OFF)。',
      additionalFees:
        '国際送料(DHL Express / FedEx 国際速達便)。日本全国一律 ¥10,000 以上のご注文で送料無料。沖縄・離島は追加料金が必要な場合があります。',
      paymentMethod:
        'クレジットカード(VISA / Mastercard / JCB / AMEX)、Alipay、銀行振込(前払い・法人・個人いずれも可)。',
      paymentTiming:
        'クレジットカード:商品出荷時に即時決済。Alipay:商品出荷時に即時決済。銀行振込:ご注文確定後 7 日以内にお振込み。',
      deliveryTiming:
        '校正完了後 3-7 営業日で出荷。DHL / FedEx 国際速達便で日本全国へ 2-4 日配送(沖縄・離島は 5-7 日)。納期内配送率は 98.5% 以上(2024 年実績)。',
      returns:
        'オーダーメイド印刷商品は性質上、原則として返品不可。ただし、商品到着時に破損・汚損・注文と異なる商品が届いた場合は、商品到着後 7 日以内に限り、無償で再印刷または全額返金いたします。色校正 PDF を提供し、最終印刷前に内容を確認いただいております。',
      quantityLimit:
        '商品ごとに最小注文数量(MOQ)を設定(各商品ページに記載)。大量発注割引あり(各商品ページのボリュームディスカウント表を参照)。',
      techEnv:
        '本サービスは WEB ブラウザ(Chrome / Firefox / Safari / Edge 最新版)で動作します。インターネット接続が必要です。推奨画面解像度:1280×720 以上。',
    },
  },
  en: {
    title: 'Legal Disclosure (Tokutei-Shoji-Ho) | ZprintPro',
    titleShort: 'Legal Disclosure',
    description:
      'ZprintPro seller information, transaction conditions, and disclosure under the Japanese Act on Specified Commercial Transactions.',
    h1: 'Legal Disclosure (Tokutei-Shoji-Ho)',
    lastUpdated: 'Last updated',
    sectionCrossBorder: 'About the Seller',
    crossBorderBody:
      'ZprintPro is an international printing service provider headquartered in Shenzhen, China. We sell to the Japanese market via cross-border e-commerce and do not operate any physical store, branch, or sales office in Japan. This page discloses the seller in accordance with Article 3 of the Japanese Act on Specified Commercial Transactions and Article 2 of the related enforcement order.',
    sectionSeller: 'Seller Information',
    sectionTransaction: 'Transaction Conditions',
    sectionCustoms: 'Customs & Import Consumption Tax',
    customsBody:
      'Products are shipped from China via international courier. Customs duties and import consumption tax are the buyer\u2019s responsibility (printed matter HS code 4911.99 is generally duty-free at 0%, but a 10% consumption tax may apply). Please contact your local customs office for details.',
    sectionContact: 'Contact',
    contactBody:
      'Please reach out using the channels below. Japanese-speaking staff will respond on weekdays 9:00-18:00 JST.',
    contactHours: 'Weekdays 9:00-18:00 JST',
    contactResponseSla: 'Typically replies within 1-2 business days',
    fields: {
      sellerName: 'Seller name',
      responsiblePerson: 'Representative',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      brand: 'Brand',
      established: 'Established',
      langSupport: 'Languages supported',
      price: 'Sale price',
      additionalFees: 'Additional charges',
      paymentMethod: 'Payment methods',
      paymentTiming: 'Payment timing',
      deliveryTiming: 'Delivery timing',
      returns: 'Returns & exchanges',
      quantityLimit: 'Sales quantity limits',
      techEnv: 'Technical environment',
    },
    values: {
      price:
        'Shown on each product page (tax-inclusive). Shipping is additional (see below). Volume discounts available (500 units 15% off, 1,000 units 25% off).',
      additionalFees:
        'International shipping via DHL Express / FedEx. Free shipping on orders over JPY 10,000 to anywhere in Japan. Remote islands may incur additional fees.',
      paymentMethod:
        'Credit card (VISA / Mastercard / JCB / AMEX), Alipay, Bank wire transfer (prepayment, available for both individuals and corporations).',
      paymentTiming:
        'Credit card: charged at the time of shipment. Alipay: charged at the time of shipment. Bank wire transfer: within 7 days of order confirmation.',
      deliveryTiming:
        '3-7 business days after proof approval, then 2-4 days via DHL / FedEx to anywhere in Japan (5-7 days for Okinawa and remote islands). On-time delivery rate above 98.5% (2024 data).',
      returns:
        'Custom-printed products are generally non-returnable due to their made-to-order nature. However, if the product arrives damaged, defective, or does not match your order, we will reprint free of charge or issue a full refund if you notify us within 7 days of receipt. A PDF color proof is provided for your final approval before printing.',
      quantityLimit:
        'Each product has a minimum order quantity (MOQ) shown on its page. Volume discounts are available (see the volume discount table on each product page).',
      techEnv:
        'This service runs in modern web browsers (latest Chrome / Firefox / Safari / Edge). An Internet connection is required. Recommended display resolution: 1280x720 or higher.',
    },
  },
  ja: {
    title: '特定商取引法に基づく表記 | ZprintPro',
    titleShort: '特定商取引法に基づく表記',
    description:
      'ZprintPro(智印雲)の販売事業者情報・商品販売条件・特定商取引法に基づく表記。日本市場向けの法定開示事項。',
    h1: '特定商取引法に基づく表記',
    lastUpdated: '最終更新日',
    sectionCrossBorder: '事業者について',
    crossBorderBody:
      'ZprintPro(智印雲)は、中華人民共和国深圳市に本社を置く国際印刷サービス事業者です。日本市場向けには越境EC(Eコマース)形式で商品を販売しており、日本国内には店舗・営業所・支店はございません。本ページは「特定商取引に関する法律」(特定商取引法)第3条および同法施行規則第2条に基づき、日本消費者の皆様に販売事業者を明示するものです。',
    sectionSeller: '販売事業者情報',
    sectionTransaction: '商品販売条件',
    sectionCustoms: '関税・輸入消費税について',
    customsBody:
      '本商品は中華人民共和国から国際便で発送されます。関税・輸入消費税はご注文者様のご負担となります(印刷物の HS code 4911.99 は関税 0% が一般的ですが、輸入消費税 10% が課税される場合があります)。詳細は税関までお問い合わせください。',
    sectionContact: 'お問い合わせ窓口',
    contactBody:
      'ご質問・お問い合わせは下記までご連絡ください。日本語対応スタッフがお答えします(平日 9:00-18:00 日本時間)。',
    contactHours: '平日 9:00-18:00 日本時間',
    contactResponseSla: '通常 1-2 営業日以内に返信',
    fields: {
      sellerName: '販売業者名',
      responsiblePerson: '運営統括責任者',
      address: '所在地',
      phone: '電話番号',
      email: 'メールアドレス',
      brand: '運営ブランド',
      established: '設立年',
      langSupport: '対応言語',
      price: '販売価格',
      additionalFees: '商品代金以外の必要料金',
      paymentMethod: '支払方法',
      paymentTiming: '支払時期',
      deliveryTiming: '引渡時期',
      returns: '返品・交換',
      quantityLimit: '販売数量の制限',
      techEnv: '動作環境',
    },
    values: {
      price:
        '各商品ページに表示(消費税込価格)。送料は別途(下記参照)。商品によりボリュームディスカウントあり(500枚 15% OFF / 1,000枚 25% OFF)。',
      additionalFees:
        '国際送料(DHL Express / FedEx 国際速達便)。日本全国一律 ¥10,000 以上のご注文で送料無料。沖縄・離島は追加料金が必要な場合があります。',
      paymentMethod:
        'クレジットカード(VISA / Mastercard / JCB / AMEX)、Alipay、銀行振込(前払い・法人・個人いずれも可)。',
      paymentTiming:
        'クレジットカード:商品出荷時に即時決済。Alipay:商品出荷時に即時決済。銀行振込:ご注文確定後 7 日以内にお振込み。',
      deliveryTiming:
        '校正完了後 3-7 営業日で出荷。DHL / FedEx 国際速達便で日本全国へ 2-4 日配送(沖縄・離島は 5-7 日)。納期内配送率は 98.5% 以上(2024 年実績)。',
      returns:
        'オーダーメイド印刷商品は性質上、原則として返品不可。ただし、商品到着時に破損・汚損・注文と異なる商品が届いた場合は、商品到着後 7 日以内に限り、無償で再印刷または全額返金いたします。色校正 PDF を提供し、最終印刷前に内容を確認いただいております。',
      quantityLimit:
        '商品ごとに最小注文数量(MOQ)を設定(各商品ページに記載)。大量発注割引あり(各商品ページのボリュームディスカウント表を参照)。',
      techEnv:
        '本サービスは WEB ブラウザ(Chrome / Firefox / Safari / Edge 最新版)で動作します。インターネット接続が必要です。推奨画面解像度:1280×720 以上。',
    },
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    // 法定開示ページは index: true (JP 消費者が Google 検索で見つけられる必要がある)
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/legal/`,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/legal/`,
        en: `${siteConfig.url}/en/legal/`,
        'ja-JP': `${siteConfig.url}/ja/legal/`,
        'x-default': `${siteConfig.url}/en/legal/`,
      },
    },
  };
}

export default function LegalPage({ params }: LegalPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const legalUrl = `${siteConfig.url}/${locale}/legal/`;

  // JSON-LD: WebPage + Organization (with REAL Shenzhen entity — fixes C5 NAP inconsistency)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${legalUrl}#webpage`,
        url: legalUrl,
        name: t.title,
        description: t.description,
        inLanguage:
          locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'ja' ? 'ja-JP' : 'en-US',
        isPartOf: { '@id': `${siteConfig.url}#website` },
        dateModified: '2026-06-18',
      },
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}#seller`,
        name: locale === 'en' ? LEGAL_ENTITY.sellerNameEn : LEGAL_ENTITY.sellerName,
        alternateName: LEGAL_ENTITY.brand,
        url: siteConfig.url,
        email: LEGAL_ENTITY.email,
        telephone: LEGAL_ENTITY.phoneRaw,
        founder: {
          '@type': 'Person',
          name:
            locale === 'en'
              ? LEGAL_ENTITY.responsiblePersonEn
              : LEGAL_ENTITY.responsiblePerson,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            locale === 'en'
              ? 'No.1 Jiacheng Road, Pinghu Street, Longgang District'
              : '嘉城路1号 平湖街道 龍崗区',
          addressLocality:
            locale === 'en' ? LEGAL_ENTITY.city : '深圳市',
          addressRegion:
            locale === 'en' ? LEGAL_ENTITY.region : '広東省',
          postalCode: LEGAL_ENTITY.postalCode,
          addressCountry: {
            '@type': 'Country',
            name: 'China',
            identifier: LEGAL_ENTITY.countryCode,
          },
        },
        areaServed: [
          { '@type': 'Country', name: 'Japan' },
          { '@type': 'Country', name: 'Hong Kong' },
          { '@type': 'Country', name: 'China' },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            telephone: LEGAL_ENTITY.phoneRaw,
            email: LEGAL_ENTITY.email,
            availableLanguage: ['Japanese', 'Chinese', 'English'],
            hoursAvailable: 'Mo-Fr 09:00-18:00 JST',
            areaServed: 'JP',
          },
        ],
        foundingDate: String(LEGAL_ENTITY.establishedYear),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={jsonLd} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-8">{t.h1}</h1>

        {/* Section: Cross-border disclosure preamble */}
        <section className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-amber-900 mb-3">
            {t.sectionCrossBorder}
          </h2>
          <p className="text-gray-800 leading-relaxed">{t.crossBorderBody}</p>
        </section>

        {/* Section: Seller info (11 required items, group 1) */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-[#333333] mb-6">
            {t.sectionSeller}
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.sellerName}
              </dt>
              <dd className="mt-1 text-gray-900 font-medium">
                {locale === 'en' ? LEGAL_ENTITY.sellerNameEn : LEGAL_ENTITY.sellerName}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.responsiblePerson}
              </dt>
              <dd className="mt-1 text-gray-900 font-medium">
                {locale === 'en'
                  ? LEGAL_ENTITY.responsiblePersonEn
                  : LEGAL_ENTITY.responsiblePerson}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.brand}
              </dt>
              <dd className="mt-1 text-gray-900 font-medium">
                {LEGAL_ENTITY.brand}
              </dd>
            </div>
            <div className="md:col-span-3">
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.address}
              </dt>
              <dd className="mt-1 text-gray-900">
                {locale === 'en' ? LEGAL_ENTITY.addressEn : LEGAL_ENTITY.address}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.phone}
              </dt>
              <dd className="mt-1 text-gray-900">
                <a
                  href={`tel:${LEGAL_ENTITY.phoneRaw}`}
                  className="text-blue-600 hover:underline"
                >
                  {LEGAL_ENTITY.phone}
                </a>
                <span className="text-xs text-gray-500 ml-2">
                  ({t.contactHours})
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.email}
              </dt>
              <dd className="mt-1 text-gray-900">
                <a
                  href={`mailto:${LEGAL_ENTITY.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {LEGAL_ENTITY.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.established}
              </dt>
              <dd className="mt-1 text-gray-900">
                {LEGAL_ENTITY.establishedYear}年
              </dd>
            </div>
            <div className="md:col-span-3">
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.langSupport}
              </dt>
              <dd className="mt-1 text-gray-900">
                日本語 / 中文(繁體・簡體) / English
              </dd>
            </div>
          </dl>
        </section>

        {/* Section: Transaction conditions (11 required items, group 2) */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-[#333333] mb-6">
            {t.sectionTransaction}
          </h2>
          <dl className="space-y-6">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.price}
              </dt>
              <dd className="mt-1 text-gray-900 leading-relaxed">
                {t.values.price}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.additionalFees}
              </dt>
              <dd className="mt-1 text-gray-900 leading-relaxed">
                {t.values.additionalFees}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.paymentMethod}
              </dt>
              <dd className="mt-1 text-gray-900 leading-relaxed">
                {t.values.paymentMethod}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.paymentTiming}
              </dt>
              <dd className="mt-1 text-gray-900 leading-relaxed">
                {t.values.paymentTiming}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.deliveryTiming}
              </dt>
              <dd className="mt-1 text-gray-900 leading-relaxed">
                {t.values.deliveryTiming}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.returns}
              </dt>
              <dd className="mt-1 text-gray-900 leading-relaxed">
                {t.values.returns}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.quantityLimit}
              </dt>
              <dd className="mt-1 text-gray-900 leading-relaxed">
                {t.values.quantityLimit}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t.fields.techEnv}
              </dt>
              <dd className="mt-1 text-gray-900 leading-relaxed">
                {t.values.techEnv}
              </dd>
            </div>
          </dl>
        </section>

        {/* Section: Customs / import tax (cross-border specific) */}
        <section className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            {t.sectionCustoms}
          </h2>
          <p className="text-gray-800 leading-relaxed">{t.customsBody}</p>
        </section>

        {/* Section: Contact */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-[#333333] mb-4">
            {t.sectionContact}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t.contactBody}</p>
          <ul className="space-y-2 text-gray-900">
            <li>
              <strong>メール:</strong>{' '}
              <a
                href={`mailto:${LEGAL_ENTITY.email}`}
                className="text-blue-600 hover:underline"
              >
                {LEGAL_ENTITY.email}
              </a>
            </li>
            <li>
              <strong>電話:</strong>{' '}
              <a
                href={`tel:${LEGAL_ENTITY.phoneRaw}`}
                className="text-blue-600 hover:underline"
              >
                {LEGAL_ENTITY.phone}
              </a>{' '}
              <span className="text-sm text-gray-500">({t.contactHours})</span>
            </li>
            <li className="text-sm text-gray-500">
              {t.contactResponseSla}
            </li>
          </ul>
        </section>

        <p className="text-sm text-gray-500 text-center mt-8">
          {t.lastUpdated}: 2026年6月18日
        </p>
      </div>
    </main>
  );
}