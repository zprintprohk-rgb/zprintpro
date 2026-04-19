/**
 * Service Areas Page — GEO SEO优化页面
 * 针对香港三大区域（香港岛/九龙/新界）的独立服务页面
 * 注入LocalBusiness + GeoShape Schema
 */

import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { generateLocalBusinessJsonLd, Locale } from '@/lib/seo';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { locale } = params;
  const titles = {
    'zh-hk': '香港印刷服務地區 | 全港送貨 | 智印港 ZprintPro',
    en: 'Hong Kong Printing Service Areas | Island-wide Delivery | ZprintPro',
    ja: '香港印刷サービスエリア | 全港配送 | ZprintPro',
  };
  const descriptions = {
    'zh-hk': '智印港提供全港印刷送貨服務，覆蓋香港島、九龍、新界及離島。即日印刷，順豐速遞，次日送達。觀塘工場直送，品質保證。',
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
  const localBusinessJsonLd = generateLocalBusinessJsonLd();

  // Geo Shape Schema for service areas
  const geoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: locale === 'zh-hk' ? '智印港服務地區' : locale === 'en' ? 'ZprintPro Service Areas' : 'ZprintProサービスエリア',
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
      h1: 'Hong Kong Island-Wide Printing Delivery',
      subtitle: 'Covering Hong Kong Island, Kowloon, New Territories & Outlying Islands. Same-day printing, SF Express next-day delivery.',
      areas: [
        {
          title: 'Hong Kong Island',
          districts: 'Central, Sheung Wan, Admiralty, Wan Chai, Causeway Bay, Happy Valley, North Point, Quarry Bay, Taikoo, Sai Wan Ho, Shau Kei Wan, Chai Wan, Aberdeen, Pok Fu Lam, Cyberport, Wong Chuk Hang',
          delivery: 'Standard next-day delivery. Rush same-day (order before 11 AM).',
          note: 'Central, Admiralty and Wan Chai CBD have dedicated delivery routes.',
        },
        {
          title: 'Kowloon',
          districts: 'Tsim Sha Tsui, Jordan, Yau Ma Tei, Mong Kok, Prince Edward, Sham Shui Po, Cheung Sha Wan, Lai Chi Kok, Mei Foo, Kowloon Tong, Lok Fu, Wong Tai Sin, Diamond Hill, Choi Hung, Ngau Chi Wan, Kowloon Bay, Ngau Tau Kok, Kwun Tong, Lam Tin, Yau Tong, Tseung Kwan O, Tiu Keng Leng, LOHAS Park',
          delivery: 'Standard next-day. Rush 4-hour (2-hour around Kwun Tong factory).',
          note: 'Kwun Tong factory location ensures fastest delivery to surrounding areas.',
        },
        {
          title: 'New Territories',
          districts: 'Tsuen Wan, Kwai Chung, Tsing Yi, Tung Chung, Sha Tin, Tai Wai, Fo Tan, Ma On Shan, Tai Po, Tai Wo, Fanling, Sheung Shui, Yuen Long, Tin Shui Wai, Tuen Mun, Tseung Kwan O, Tseung Kwan O South',
          delivery: 'Standard 1-2 business days. Rush next-day available.',
          note: 'Scheduled delivery routes to Sha Tin, Tsuen Wan and Tseung Kwan O.',
        },
        {
          title: 'Outlying Islands',
          districts: 'Lantau Island, Discovery Bay, Tung Chung, Chek Lap Kok, Airport, Lamma Island, Cheung Chau, Peng Chau, Tai O',
          delivery: '2-3 business days. Advance booking required.',
          note: 'For outlying islands, please order in advance to ensure on-time delivery.',
        },
      ],
      cta: 'Get a Free Quote',
      guarantee: 'Delivery Guarantee: All orders include SF Express tracking number for real-time logistics monitoring.',
    },
    ja: {
      h1: '香港全港印刷配送サービス',
      subtitle: '香港島・九龍・新界・離島をカバー。即日印刷、顺丰翌日配送。',
      areas: [
        {
          title: '香港島',
          districts: '中環、上環、金鐘、灣仔、銅鑼灣、跑馬地、北角、鰂魚涌、太古、西灣河、筲箕灣、柴灣、香港仔、薄扶林、數碼港、黃竹坑',
          delivery: '標準翌日配送。急行当日配送（午前11時までに注文）。',
          note: '中環、金鐘、灣仔の商業地区には専用配送ルートがあります。',
        },
        {
          title: '九龍',
          districts: '尖沙咀、佐敦、油麻地、旺角、太子、深水埗、長沙灣、荔枝角、美孚、九龍塘、樂富、黃大仙、鑽石山、彩虹、牛池灣、九龍灣、牛頭角、觀塘、藍田、油塘、將軍澳、調景嶺、康城',
          delivery: '標準翌日配送。急行4時間配送（観塘工場周辺は2時間）。',
          note: '観塘工場所在地のため、周辺エリアは最速配送が可能です。',
        },
        {
          title: '新界',
          districts: '荃灣、葵涌、青衣、東涌、沙田、大圍、火炭、馬鞍山、大埔、太和、粉嶺、上水、元朗、天水圍、屯門、將軍澳、將軍澳南',
          delivery: '標準1〜2営業日。急行翌日配送可能。',
          note: '沙田、荃灣、將軍澳には定期配送便があります。',
        },
        {
          title: '離島',
          districts: '大嶼山、愉景灣、東涌、赤鱲角、機場、南丫島、長洲、坪洲、大澳',
          delivery: '2〜3営業日。事前予約が必要です。',
          note: '離島地区は事前注文をお勧めします。',
        },
      ],
      cta: 'お見積もりを依頼',
      guarantee: '配送保証：全注文に顺丰追跡番号が付属し、物流状況をリアルタイムで確認できます。',
    },
  };

  const t = content[locale];

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={geoJsonLd} />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#2873F5] to-[#1a5fd1] text-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl">{t.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`/${locale}/quote/`}
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
