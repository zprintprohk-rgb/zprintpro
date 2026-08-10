import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShoppingCart, Printer, Package, Truck, ChevronRight } from 'lucide-react';
import { Locale, generateServiceJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generateWhatsAppLink } from '@/lib/whatsapp';
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
    title: '印刷即日速递送货 | 今天下單明天12點前到 | 18:00截單 | 智印港 ZPrintPro',
    desc: '印刷即日速递送货首选智印港 ZPrintPro！今天下班6點前下單，明天中午12點前收貨。宣傳單張、海報、貼紙、紙袋、畫冊、易拉寶通宵印刷，支持港鐵站交收。',
  },
  'en': {
    title: 'Rush Printing Service | 2-4 Day Global Delivery | ZprintPro',
    desc: 'Rush printing service for flyers, posters, stickers, paper bags, booklets & roll-up banners. Order by 6PM HKT, printed overnight, DHL/FedEx delivery in 2-4 business days to US, UK, AU, CA. No setup fees. AI instant quote.',
  },
  'ja': {
    title: '特急印刷サービス | 2〜4営業日で日本全国お届け | ZPrintPro',
    desc: 'チラシ、ポスター、シール、紙袋、冊子、ロールアップバナーの特急印刷。平日18時までのご注文で徹夜印刷、DHL・FedExで2〜4営業日にお届け。AI即時見積もり。',
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
        canonical: `https://zprintpro.com/${locale}/services/rush-printing-delivery/`,
        languages: {
          'zh-HK': 'https://zprintpro.com/zh-hk/services/rush-printing-delivery/',
          'en': 'https://zprintpro.com/en/services/rush-printing-delivery/',
          'ja': 'https://zprintpro.com/ja/services/rush-printing-delivery/',
          'x-default': 'https://zprintpro.com/zh-hk/services/rush-printing-delivery/',
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
      ? 'Rush Printing & 2-4 Day Global Delivery'
      : '特急印刷・2〜4営業日お届け';

  return (
    <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={generateServiceJsonLd({
          serviceType: 'Rush Printing Service',
          serviceName: locale === 'en' ? 'Rush Printing & Global Delivery' : locale === 'ja' ? '特急印刷・全球配送サービス' : '印刷即日速遞送貨',
          description: metaMap[locale].desc,
          url: `https://zprintpro.com/${locale}/services/rush-printing-delivery/`,
          areaServed: ['US', 'GB', 'AU', 'CA', 'JP', 'HK'],
          offers: [
            { name: 'Flyer Printing', price: '0.04', priceCurrency: 'USD' },
            { name: 'Sticker Printing', price: '0.06', priceCurrency: 'USD' },
            { name: 'Poster Printing', price: '1.95', priceCurrency: 'USD' },
            { name: 'Booklet Printing', price: '0.50', priceCurrency: 'USD' },
            { name: 'Roll-up Banner Printing', price: '12.00', priceCurrency: 'USD' },
          ],
        })}
      />

      {/* Hero Banner 占位区 - 方角 + 固定 440px (P0 雙 CTA 加高) */}
      <section className="relative w-full h-[440px] rounded-none overflow-hidden mb-4">
        {/* 渐变背景（占位，后续替换为真实图片） */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-amber-400" />
        
        {/* 内容层 */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold mb-4">
            ⚡ {locale === 'zh-hk' ? '通宵達旦服務' : locale === 'en' ? 'Overnight Delivery' : '徹夜配送'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {locale === 'zh-hk' ? '今天下單·明天中午12點前到' : locale === 'en' ? 'Order Today, Printed Overnight' : '本日注文・徹夜印刷'}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-5 max-w-2xl">
            {locale === 'zh-hk' ? '專為臨急任務而生——宣傳單張、海報、貼紙、紙袋通宵印刷，畫冊與易拉寶翌日中午準時達' : locale === 'en' ? 'Rush printing for flyers, posters, stickers, paper bags. Booklets & banners on priority production.' : 'チラシ、ポスター、シール、紙袋の特急印刷。冊子とバナーも優先製作対応。'}
          </p>
          {/* 雙 CTA (P0 K3 拍板): 主 = WhatsApp 確認趕單 (預填產品/數量/地址), 次 = 查看價格並下單 */}
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <a
              href={generateWhatsAppLink(locale as 'zh-hk' | 'en' | 'ja', {
                productName: locale === 'zh-hk' ? '急單確認' : locale === 'ja' ? '急ぎの注文' : 'Rush Order Confirm',
                source: 'rush-printing-delivery-hero',
                extra: locale === 'zh-hk'
                  ? '請填寫：\n• 產品：\n• 數量：\n• 收貨地址/港鐵站：'
                  : locale === 'en'
                  ? 'Please fill in:\n• Product:\n• Quantity:\n• Delivery address / MTR station:'
                  : 'ご記入ください：\n• 製品：\n• 数量：\n• 配送住所/MTR駅：',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              💬 {locale === 'zh-hk' ? 'WhatsApp 確認趕單' : locale === 'en' ? 'WhatsApp Confirm Rush' : 'WhatsApp で急行確認'}
            </a>
            <Link
              href={`/${locale}/quote/`}
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              {locale === 'zh-hk' ? '查看價格並下單' : locale === 'en' ? 'View Price & Order' : '価格確認・注文'}
            </Link>
          </div>
          <p className="text-sm text-white/85">
            {locale === 'zh-hk' ? '趕不到會直接告訴你，不耽誤你' : locale === 'en' ? 'If we can\'t make it, we\'ll tell you straight up.' : '対応できない場合は、正直にすぐにお伝えします。'}
          </p>
        </div>
      </section>

      {/* 面包屑由 layout.tsx / BreadcrumbNav 统一生成，page.tsx 内不重复 */}

      {/* GEO 答案块 */}
      <section className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
          {locale === 'zh-hk' && (
            <>
              <strong>今天下班6點前下單，明天中午12點前收貨。</strong>
              專為臨急任務而生——宣傳單張、海報、貼紙、紙袋通宵印刷，畫冊與易拉寶翌日中午準時達。支持全港港鐵站交收。
            </>
          )}
          {locale === 'en' && (
            <>
              <strong>Order by 6PM HKT, printed overnight, delivered in 2–4 business days via DHL / FedEx.</strong>
              Rush printing for flyers, posters, stickers, paper bags, booklets, roll-up banners. Premium-grade printing shipped from our Asia facility to the US, UK, Australia and worldwide. Free shipping on orders over $200. No setup fees.
            </>
          )}
          {locale === 'ja' && (
            <>
              <strong>平日18時までのご注文で、徹夜印刷。DHL・FedExで2〜4営業日にお届け。</strong>
              チラシ、ポスター、シール、紙袋は徹夜印刷。冊子とロールアップバナーも短納期対応。日本全国へお届けします。
            </>
          )}
        </p>
      </section>

      {/* 时间轴 - 4个节点均匀分布在1000px容器内 */}
      <section className="mb-8 bg-gray-50 rounded-xl p-6 md:p-8">
        <div className="max-w-[1000px] mx-auto w-full px-4">
          <div className="flex justify-between items-start">
            {/* 节点1 */}
            <div className="flex flex-col items-center text-center w-24">
              <div className="h-14 w-14 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center mb-2 shadow-sm">
                <ShoppingCart className="h-6 w-6 text-[#2873F5]" strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-gray-900">{locale === 'zh-hk' ? '今天18:00' : locale === 'en' ? 'Today 6PM' : '本日18時'}</span>
              <span className="text-xs text-gray-500">{locale === 'zh-hk' ? '您下單' : locale === 'en' ? 'You order' : 'ご注文'}</span>
            </div>

            {/* 箭头1 */}
            <div className="flex items-center pt-5">
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </div>

            {/* 节点2 */}
            <div className="flex flex-col items-center text-center w-24">
              <div className="h-14 w-14 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center mb-2 shadow-sm">
                <Printer className="h-6 w-6 text-[#2873F5]" strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-gray-900">{locale === 'zh-hk' ? '今晚22:00' : locale === 'en' ? 'Tonight 10PM' : '今夜22時'}</span>
              <span className="text-xs text-gray-500">{locale === 'zh-hk' ? '印刷完成' : locale === 'en' ? 'Printed' : '印刷完了'}</span>
            </div>

            {/* 箭头2 */}
            <div className="flex items-center pt-5">
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </div>

            {/* 节点3 */}
            <div className="flex flex-col items-center text-center w-24">
              <div className="h-14 w-14 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center mb-2 shadow-sm">
                <Package className="h-6 w-6 text-[#2873F5]" strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-gray-900">{locale === 'zh-hk' ? '明早06:00' : locale === 'en' ? 'Tomorrow 6AM' : '翌朝6時'}</span>
              <span className="text-xs text-gray-500">{locale === 'zh-hk' ? '分揀包裝' : locale === 'en' ? 'Packed' : '梱包完了'}</span>
            </div>

            {/* 箭头3 */}
            <div className="flex items-center pt-5">
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </div>

            {/* 节点4 */}
            <div className="flex flex-col items-center text-center w-24">
              <div className="h-14 w-14 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center mb-2 shadow-sm">
                <Truck className="h-6 w-6 text-[#2873F5]" strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-gray-900">{locale === 'zh-hk' ? '明天12:00' : locale === 'en' ? 'Ships in 2-4 days' : '2〜4営業日で出荷'}</span>
              <span className="text-xs text-gray-500">{locale === 'zh-hk' ? '您收貨' : locale === 'en' ? 'Delivered' : 'お届け'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6 个 SKU 网格 */}
      <RushDeliveryGrid locale={locale} />

      {/* FAQ */}
      <RushDeliveryFAQ locale={locale} />
    </main>
  );
}
