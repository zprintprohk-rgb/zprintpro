/**
 * Service Areas Page — GEO SEO优化页面
 * 针对香港三大区域（香港岛/九龙/新界）的独立服务页面
 * 注入LocalBusiness + GeoShape Schema
 */

import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { generateBusinessJsonLd, Locale } from '@/lib/seo';

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { locale } = params;
  const titles = {
    'zh-hk': '香港印刷服務地區 | 全港送貨 | 智印云 ZprintPro',
    en: 'Hong Kong Printing Service Areas | Island-wide Delivery | ZprintPro',
    ja: '香港印刷サービスエリア | 全港配送 | ZprintPro',
  };
  const descriptions = {
    'zh-hk': '智印云提供全港印刷送貨服務，覆蓋香港島、九龍、新界及離島。即日印刷，順豐速遞，次日送達。觀塘工場直送，品質保證。',
    en: 'ZprintPro offers island-wide printing delivery across Hong Kong Island, Kowloon, New Territories and Outlying Islands. Same-day printing, SF Express next-day delivery. Kwun Tong factory direct.',
    ja: 'ZprintProは香港島・九龍・新界・離島をカバーする全港印刷配送サービスを提供。即日印刷、顺丰翌日配送。観塘工場直送、品質保証。',
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: locale === 'zh-hk' 
      ? ['香港印刷送貨','全港送貨','香港島印刷','九龍印刷','新界印刷','即日印刷速遞','觀塘印刷'] 
      : locale === 'en' 
        ? ['hong kong printing delivery','island wide delivery','hong kong island printing','kowloon printing','new territories printing','same day printing','kwun tong printing']
        : ['香港印刷配送','全港配送','香港島印刷','九龍印刷','新界印刷','即日印刷','観塘印刷'],
  };
}

export default function ServiceAreasPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  // LocalBusiness Schema
  const businessJsonLd = generateBusinessJsonLd(locale);

  // Geo Shape Schema for service areas
  const geoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: locale === 'zh-hk' ? '智印云服務地區' : locale === 'en' ? 'ZprintPro Service Areas' : 'ZprintProサービスエリア',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.3193',
      longitude: '114.1694',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kwun Tong',
      addressRegion: 'Kowloon',
      addressCountry: 'HK',
    },
    containedInPlace: [
      {
        '@type': 'AdministrativeArea',
        name: locale === 'zh-hk' ? '香港島' : 'Hong Kong Island',
      },
      {
        '@type': 'AdministrativeArea',
        name: locale === 'zh-hk' ? '九龍' : 'Kowloon',
      },
      {
        '@type': 'AdministrativeArea',
        name: locale === 'zh-hk' ? '新界' : 'New Territories',
      },
    ],
  };

  const content = {
    'zh-hk': {
      h1: '香港全港印刷送貨服務',
      subtitle: '覆蓋香港島、九龍、新界及離島，即日印刷，順豐速遞，次日送達',
      areas: [
        {
          title: '香港島',
          districts: '中環、上環、金鐘、灣仔、銅鑼灣、跑馬地、北角、鰂魚涌、太古、西灣河、筲箕灣、柴灣、香港仔、薄扶林、數碼港、黃竹坑',
          delivery: '標準次日達，急件當日達（上午11點前截單）',
          note: '中環、金鐘、灣仔商業區為主要客戶集中地，設有專屬送貨路線',
        },
        {
          title: '九龍',
          districts: '尖沙咀、佐敦、油麻地、旺角、太子、深水埗、長沙灣、荔枝角、美孚、九龍塘、樂富、黃大仙、鑽石山、彩虹、牛池灣、九龍灣、牛頭角、觀塘、藍田、油塘、將軍澳、調景嶺、康城',
          delivery: '標準次日達，急件4小時達（觀塘工場周邊2小時）',
          note: '觀塘工場所在地，周邊區域享最快送貨速度',
        },
        {
          title: '新界',
          districts: '荃灣、葵涌、青衣、東涌、沙田、大圍、火炭、馬鞍山、大埔、太和、粉嶺、上水、元朗、天水圍、屯門、將軍澳、將軍澳南',
          delivery: '標準1-2個工作日，急件次日達',
          note: '沙田、荃灣、將軍澳設有定時送貨班次',
        },
        {
          title: '離島',
          districts: '大嶼山、愉景灣、東涌、赤鱲角、機場、南丫島、長洲、坪洲、大澳',
          delivery: '2-3個工作日，需提前預約',
          note: '離島地區建議選擇提前下單，確保準時交付',
        },
      ],
      cta: '立即獲取報價',
      guarantee: '送貨保證：所有訂單均附帶順豐追蹤號碼，可實時查詢物流狀態',
    },
    en: {
      h1: 'Global Printing Service | US · UK · AU',
      subtitle: 'International printing for businesses in the United States, United Kingdom, Australia and beyond. Hong Kong factory direct, SF Express / DHL worldwide shipping.',
      areas: [
        {
          title: 'United States',
          districts: 'New York · Los Angeles · Chicago · Houston · San Francisco · Seattle · Boston · Miami · Atlanta · Dallas · Denver · Washington D.C. · Philadelphia · Phoenix · San Diego · All 50 states',
          delivery: 'Standard 5-7 business days via DHL Express. Rush 3-5 days available.',
          note: 'Customs-cleared door-to-door. Free design consultation for US-based teams.',
        },
        {
          title: 'United Kingdom',
          districts: 'London · Manchester · Birmingham · Leeds · Glasgow · Liverpool · Bristol · Newcastle · Sheffield · Edinburgh · Cardiff · Belfast · All UK mainland',
          delivery: 'Standard 5-7 business days via DHL Express. Rush 3-5 days available.',
          note: 'Includes Northern Ireland. VAT-compliant invoicing for UK businesses.',
        },
        {
          title: 'Australia & New Zealand',
          districts: 'Sydney · Melbourne · Brisbane · Perth · Adelaide · Auckland · Wellington · Christchurch · All AU & NZ metro areas',
          delivery: 'Standard 7-10 business days via DHL Express. Rush 5-7 days available.',
          note: 'Free local pickup at AU/NZ consolidator points for orders above US$500.',
        },
        {
          title: 'Other Regions',
          districts: 'Canada · Singapore · Europe (DE / FR / NL / IT / ES) · Middle East · Southeast Asia',
          delivery: 'Standard 7-14 business days. Express options available.',
          note: 'Contact us for a custom quote to your country. ISO9001 + FSC certified prints.',
        },
      ],
      cta: 'Get a Free Quote',
      guarantee: 'Worldwide Delivery Guarantee: All international orders include DHL tracking with full insurance.',
    },
    ja: {
      h1: '日本向け海外印刷サービス | 香港から発送',
      subtitle: '同人誌・企業資料を香港から日本へ。観塘自社工場直送、ISO9001認証、DHL国際配送。',
      areas: [
        {
          title: '東京・関東エリア',
          districts: '東京、神奈川、埼玉、千葉、茨城、栃木、群馬。秋葉原・池袋・渋谷・新宿の店舗・同人イベント会場へ直接配送可能。',
          delivery: '標準7〜10営業日（DHL Express）。急ぎ便3〜5日対応可。',
          note: 'コミケ・即売会・企業イベント向けの大量印刷割引あり。最短2週間前のご注文推奨。',
        },
        {
          title: '大阪・関西エリア',
          districts: '大阪、兵庫、京都、滋賀、奈良、和歌山。COMIC CITY・サンシャインクリエイション等のイベント会場配送対応。',
          delivery: '標準7〜10営業日（DHL Express）。急ぎ便3〜5日対応可。',
          note: '関西圏の同人イベント向け印刷実績多数。和紙素材・本文用紙の質感サンプル送付可能。',
        },
        {
          title: '名古屋・中部エリア',
          districts: '愛知、静岡、岐阜、三重、長野、山梨。新潟含む中部広域対応。',
          delivery: '標準10〜14営業日。急ぎ便5〜7日対応可。',
          note: '企業パンフレット・会社案内・展示会資料の実績多数。',
        },
        {
          title: '北海道・東北・九州',
          districts: '北海道、青森、岩手、宮城、秋田、山形、福島、福岡、佐賀、長崎、熊本、大分、宮崎、鹿児島、沖縄。',
          delivery: '標準14〜21営業日。急ぎ便は事前相談。',
          note: '遠方地域は早期予約で大幅割引対応可。サンプル品事前送付サービスあり。',
        },
      ],
      cta: 'お見積もり依頼',
      guarantee: '国際配送保証：DHL Expressで追跡可能、送料は実費で透明会計。同人イベント向けの分割納品も対応。',
    },
  };

  const t = content[locale];

  return (
    <>
      <JsonLd data={businessJsonLd} />
      <JsonLd data={geoJsonLd} />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#2873F5] to-[#1a5fd1] text-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl">{t.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`/${locale}/contact/`}
                className="inline-flex items-center px-6 py-3 bg-white text-[#2873F5] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </div>

        {/* Service Areas Grid */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.areas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{area.title}</h2>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {locale === 'zh-hk' ? '覆蓋地區' : locale === 'en' ? 'Coverage' : 'カバー地域'}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{area.districts}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {locale === 'zh-hk' ? '送貨時間' : locale === 'en' ? 'Delivery Time' : '配送時間'}
                  </h3>
                  <p className="text-[#2873F5] font-medium">{area.delivery}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-600 text-sm">{area.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Banner */}
          <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-800 font-medium">{t.guarantee}</p>
          </div>
        </div>
      </main>
    </>
  );
}
