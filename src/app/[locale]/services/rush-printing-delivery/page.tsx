import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Locale } from '@/lib/seo';
import RushDeliveryGrid from '@/components/sections/RushDeliveryGrid';
import RushDeliveryFAQ from '@/components/sections/RushDeliveryFAQ';

export function generateStaticParams() {
  return [
    { locale: 'zh-hk' },
    { locale: 'en' },
    { locale: 'ja' },
  ];
}

type Props = {
  params: { locale: Locale };
};

const metaMap: Record<string, { title: string; desc: string }> = {
  'zh-hk': {
    title: '印刷即日速递送货 | 今天下單明天12點前到 | 18:00截單 | 智印港',
    desc: '印刷即日速递送货首选智印港！今天下班6點前下單，明天中午12點前收貨。宣傳單張、海報、貼紙、名片、畫冊、易拉寶通宵印刷，支持港鐵站交收。',
  },
  'en': {
    title: 'Same-Day Printing Delivery | Order Today, Receive by 12PM Tomorrow | ZPrintPro',
    desc: 'Same-day printing with next-day delivery by 12PM. Order by 6PM today. Flyers, posters, stickers, business cards, booklets, roll-up banners. MTR station pickup available.',
  },
  'ja': {
    title: '即日印刷・翌日正午配送 | 本日注文・明日12時まで | ZPrintPro',
    desc: '香港の即日印刷サービス。平日18時までのご注文で、翌日12時までにお届け。チラシ、ポスター、シール、名刺、冊子、ロールアップバナー対応。MTR駅受取可。',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  if (!['zh-hk', 'en', 'ja'].includes(locale)) notFound();
  const m = metaMap[locale];
  return {
    title: m.title,
    description: m.desc,
    alternates: {
      canonical: `https://zprintpro.com/${locale}/services/rush-printing-delivery`,
      languages: {
        'zh-HK': 'https://zprintpro.com/zh-hk/services/rush-printing-delivery',
        'en-US': 'https://zprintpro.com/en/services/rush-printing-delivery',
        'en-GB': 'https://zprintpro.com/en/services/rush-printing-delivery',
        'en-AU': 'https://zprintpro.com/en/services/rush-printing-delivery',
        'ja': 'https://zprintpro.com/ja/services/rush-printing-delivery',
        'x-default': 'https://zprintpro.com/en/services/rush-printing-delivery',
      },
    },
  };
}

export default function RushDeliveryPage({ params }: Props) {
  const { locale } = params;
  if (!['zh-hk', 'en', 'ja'].includes(locale)) notFound();

  const title =
    locale === 'zh-hk'
      ? '印刷即日速递送货'
      : locale === 'en'
      ? 'Same-Day Printing & Next-Day Delivery'
      : '即日印刷・翌日正午配送';

  return (
    <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Banner 占位区 */}
      <section className="relative w-full h-[320px] md:h-[380px] rounded-xl overflow-hidden mb-8">
        {/* 渐变背景（占位，后续替换为真实图片） */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-amber-400" />
        
        {/* 内容层 */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold mb-4">
            ⚡ {locale === 'zh-hk' ? '通宵達服務' : locale === 'en' ? 'Overnight Delivery' : '徹夜配送'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {locale === 'zh-hk' ? '今天下單·明天中午12點前到' : locale === 'en' ? 'Order Today, Receive by 12PM Tomorrow' : '本日注文・翌日12時まで'}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
            {locale === 'zh-hk' ? '專為臨急任務而生——宣傳單張、海報、貼紙、名片通宵印刷，畫冊與易拉寶翌日中午準時達' : 'Rush printing for flyers, posters, stickers, business cards. Booklets & banners by noon next day.'}
          </p>
          <Link
            href={`/${locale}/services/rush-printing-delivery#order`}
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            {locale === 'zh-hk' ? '立即下單' : locale === 'en' ? 'Order Now' : '注文する'}
          </Link>
        </div>
      </section>

      {/* 面包屑 */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href={`/${locale}`} className="hover:text-[#2873F5] transition-colors">
          {locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム'}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">
          {locale === 'zh-hk' ? '即日服務' : locale === 'en' ? 'Rush Service' : '即日サービス'}
        </span>
      </nav>

      {/* GEO 答案块 */}
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
          {locale === 'zh-hk' && (
            <>
              <strong>今天下班6點前下單，明天中午12點前收貨。</strong>
              專為臨急任務而生——宣傳單張、海報、貼紙、名片通宵印刷，畫冊與易拉寶翌日中午準時達。支持全港港鐵站交收。
            </>
          )}
          {locale === 'en' && (
            <>
              <strong>Order by 6PM today, receive by 12PM tomorrow.</strong>
              Rush printing for flyers, posters, stickers, business cards overnight. Booklets and roll-up banners delivered by noon next day. Free MTR station pickup in Hong Kong.
            </>
          )}
          {locale === 'ja' && (
            <>
              <strong>平日18時までのご注文で、翌日12時までにお届け。</strong>
              チラシ、ポスター、シール、名刺は徹夜印刷。冊子とロールアップバナーも翌日正午までに配達。香港MTR駅受取対応。
            </>
          )}
        </p>
      </section>

      {/* 时间轴 */}
      <section className="mb-12 bg-gray-50 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          {[
            {
              time: locale === 'zh-hk' ? '今天18:00' : locale === 'en' ? 'Today 6PM' : '本日18時',
              label: locale === 'zh-hk' ? '您下單' : locale === 'en' ? 'You order' : 'ご注文',
              icon: '👤',
            },
            {
              time: locale === 'zh-hk' ? '今晚22:00' : locale === 'en' ? 'Tonight 10PM' : '今夜22時',
              label: locale === 'zh-hk' ? '印刷完成' : locale === 'en' ? 'Printed' : '印刷完了',
              icon: '🖨️',
            },
            {
              time: locale === 'zh-hk' ? '明早06:00' : locale === 'en' ? 'Tomorrow 6AM' : '翌朝6時',
              label: locale === 'zh-hk' ? '分揀包裝' : locale === 'en' ? 'Packed' : '梱包完了',
              icon: '📦',
            },
            {
              time: locale === 'zh-hk' ? '明天12:00' : locale === 'en' ? 'Tomorrow 12PM' : '翌日12時',
              label: locale === 'zh-hk' ? '您收貨' : locale === 'en' ? 'Delivered' : 'お届け',
              icon: '🏢',
            },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl mb-2">{step.icon}</span>
              <span className="font-bold text-gray-900">{step.time}</span>
              <span className="text-sm text-gray-600">{step.label}</span>
              {i < 3 && (
                <span className="hidden md:block text-gray-300 text-xl mt-2">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6 个 SKU 网格 */}
      <RushDeliveryGrid locale={locale} />

      {/* FAQ */}
      <RushDeliveryFAQ locale={locale} />
    </main>
  );
}
