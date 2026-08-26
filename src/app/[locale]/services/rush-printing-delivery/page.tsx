// 2026-08-26 K3 拍板 (gap-closure-card): 骨架重排 + 4 新组件 verbatim + metadata 3 locale + JSON-LD
// 数据来源: .cluster/rush-page-20260826/deliverable-A-rush-page.html (L204-440) + 8/26 11:38 K3 拍板
// 验收 8 条 grep 钉死 (per K3 卡 §3): 新 H1 / title 含 18:00 截單 聽日 12:00 前到 / 时间轴 3 时刻 / 场景卡 3 词 / data-event ≥8 / 禁词 0 / JSON-LD ≥3 / verify-deploy PASS

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale, generateServiceJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import RushHero from '@/components/services/RushHero';
import RushTimeline from '@/components/services/RushTimeline';
import RushScenarios from '@/components/services/RushScenarios';
import RushCapacity from '@/components/services/RushCapacity';
import RushPriceTable from '@/components/services/RushPriceTable';
import RushFaq from '@/components/services/RushFaq';
import RushCtaForm from '@/components/services/RushCtaForm';
import RushFloating from '@/components/services/RushFloating';

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

// 2026-08-26 K3 拍板 (gap-closure-card §2 Step 3): 3 locale 全换定稿
// zh-hk: 含 18:00 截單 + 100 張起 + 順豐翌日中午 + WhatsApp 30 秒 (150-160 字符)
// en/ja: 不带 Shenzhen/Hong Kong 硬塞前缀 (per §13.10)
const metaMap: Record<string, { title: string; desc: string; keywords: string }> = {
  'zh-hk': {
    title: '即日印刷・即日急件｜18:00 截單 聽日 12:00 前到 | 智印港 ZprintPro',
    desc: '即日印刷 18:00 截單，100 張起印，順豐翌日中午 12:00 前送到。傳單 / 海報 / 貼紙 / 紙袋 / 畫冊 / 易拉寶 100 張起印，CMYK 全彩防水。WhatsApp 30 秒即時報價，15 分鐘電郵回覆承諾。',
    keywords: '即日印刷,即日急件,18:00 截單,通宵印刷,翌日中午,順豐,港鐵站交收,CMYK 全彩,傳單 100 張,海報,貼紙,紙袋,畫冊,易拉寶,急件印刷,自營工廠',
  },
  en: {
    title: 'Same-Day Printing | Order by 6pm, Delivered Next Day 12pm | ZprintPro',
    desc: 'Same-day printing with 6PM cut-off, 100+ MOQ, delivered next-day 12pm. Flyers, posters, stickers, paper bags, booklets, roll-up banners in CMYK full color. WhatsApp 30-sec quote, 15-min email reply.',
    keywords: 'same-day printing,rush printing,6pm cut-off,overnight print,next-day delivery,CMYK full color,flyers 100 moq,posters,stickers,paper bags,booklets,roll-up banner,urgent print,in-house factory',
  },
  ja: {
    title: '即日印刷・当日特急 | 18:00締切 翌日12時着 | ZprintPro',
    desc: '即日印刷 18:00 締切、100 枚〜、翌日 12 時前配送。チラシ・ポスター・ステッカー・紙袋・冊子・ロールアップバナー、CMYK フルカラー防水。WhatsApp 30 秒見積もり、15 分以内にメール返信。',
    keywords: '即日印刷,当日特急,18:00締切,徹夜印刷,翌日12時,CMYK フルカラー,チラシ 100 枚,ポスター,ステッカー,紙袋,冊子,ロールアップバナー,緊急印刷,自社工場',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  if (!['zh-hk', 'en', 'ja'].includes(locale)) notFound();
  const m = metaMap[locale];
  return {
    title: m.title,
    description: m.desc,
    keywords: m.keywords,
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

  return (
    <main className="pb-8 md:pb-12">
      {/* JSON-LD 1/3: Service (per K3 卡 §2 Step 5 — Organization address 深圳不变) */}
      <JsonLd
        data={generateServiceJsonLd({
          serviceType: 'Same-Day Printing Service',
          serviceName: locale === 'en' ? 'Same-Day Printing & Global Delivery' : locale === 'ja' ? '特急印刷・全球配送サービス' : '即日印刷・即日急件服務',
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

      {/* JSON-LD 2/3: FAQPage (per K3 卡 §2 Step 5 — mainEntity 换成 RushFaq 新 6 条 verbatim) */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: locale === 'zh-hk' ? [
            { '@type': 'Question', name: '即日印刷最快幾耐到？', acceptedAnswer: { '@type': 'Answer', text: '每日 18:00 前落單並確認稿件，即安排通宵印刷，順豐翌日中午 12:00 前送到，亦支持港鐵站交收。' } },
            { '@type': 'Question', name: '即日同普通件價錢差幾多？', acceptedAnswer: { '@type': 'Answer', text: '即日急件優先排產會有附加費，實際差價視乎品類同數量，WhatsApp 30 秒攞精準報價最準。' } },
            { '@type': 'Question', name: '過咗 18:00 仲得唔得？', acceptedAnswer: { '@type': 'Answer', text: '過咗截單時間可以 WhatsApp 我哋盡力協調，視乎排產情況安排，唔一定保證翌日中午前到。' } },
            { '@type': 'Question', name: '點樣收貨？', acceptedAnswer: { '@type': 'Answer', text: '順豐送貨上門或港鐵站交收都得，我哋冇門市自取，落單時揀啱收貨方式即可。' } },
            { '@type': 'Question', name: '要準備咩文件？', acceptedAnswer: { '@type': 'Answer', text: 'PDF 或 AI 檔，300dpi，預留 3mm 出血位。唔熟排版可以 WhatsApp 我哋，免費幫你檢查稿件。' } },
            { '@type': 'Question', name: '落單後可唔可以改稿？', acceptedAnswer: { '@type': 'Answer', text: '上機印刷前都可以免費改稿，開印後就冇得改，所以落單後請盡快確認最終版本。' } },
          ] : locale === 'en' ? [
            { '@type': 'Question', name: 'How fast is same-day delivery?', acceptedAnswer: { '@type': 'Answer', text: 'Order before 6PM and confirm artwork, we arrange overnight print, SF Express delivers before noon next day, MTR station pickup also supported.' } },
            { '@type': 'Question', name: 'How much more is rush vs standard?', acceptedAnswer: { '@type': 'Answer', text: 'Rush priority production has a surcharge. Delta depends on product and quantity. 30-second WhatsApp quote is the fastest way.' } },
            { '@type': 'Question', name: 'Can I order after 6PM?', acceptedAnswer: { '@type': 'Answer', text: 'After cut-off please WhatsApp us, we will try to coordinate. Next-day-noon delivery is not guaranteed.' } },
            { '@type': 'Question', name: 'How do I receive?', acceptedAnswer: { '@type': 'Answer', text: 'SF Express door-to-door or MTR station pickup. No storefront self-pickup, choose your delivery method at order time.' } },
            { '@type': 'Question', name: 'What files do I need?', acceptedAnswer: { '@type': 'Answer', text: 'PDF or AI, 300dpi, 3mm bleed. Not sure about layout? WhatsApp us for free file check.' } },
            { '@type': 'Question', name: 'Can I change artwork after ordering?', acceptedAnswer: { '@type': 'Answer', text: 'Free revisions before printing. Once on press, no changes. Please confirm final version promptly.' } },
          ] : [
            { '@type': 'Question', name: '当日印刷の最速納期は？', acceptedAnswer: { '@type': 'Answer', text: '毎日18時までのご注文で徹夜印刷、SF翌朝12時前配送、MTR駅受取も対応。' } },
            { '@type': 'Question', name: '通常印刷との価格差は？', acceptedAnswer: { '@type': 'Answer', text: '特急割増料金あり。差額は商品と数量により異なります。WhatsApp 30秒見積もりで確定。' } },
            { '@type': 'Question', name: '18時過ぎでも対応できますか？', acceptedAnswer: { '@type': 'Answer', text: '締切後は WhatsApp でご相談ください。状況により対応、翌日午前中配送は保証できません。' } },
            { '@type': 'Question', name: '配送方法は？', acceptedAnswer: { '@type': 'Answer', text: 'SF配送またはMTR駅受取。店舗受取はございません、ご注文時にお選びください。' } },
            { '@type': 'Question', name: '必要なデータは？', acceptedAnswer: { '@type': 'Answer', text: 'PDF または AI、300dpi、塗り足し 3mm。データ確認は WhatsApp で無料対応。' } },
            { '@type': 'Question', name: '発注後のデータ変更は？', acceptedAnswer: { '@type': 'Answer', text: '印刷開始前なら無料修正可能。刷了後は変更不可。最終版を速やかにご確認ください。' } },
          ],
        }}
      />

      {/* JSON-LD 3/3: BreadcrumbList (深圳地址) */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: locale === 'zh-hk' ? '首頁' : locale === 'ja' ? 'ホーム' : 'Home', item: `https://zprintpro.com/${locale}/` },
            { '@type': 'ListItem', position: 2, name: locale === 'zh-hk' ? '服務' : locale === 'ja' ? 'サービス' : 'Services', item: `https://zprintpro.com/${locale}/services/` },
            { '@type': 'ListItem', position: 3, name: locale === 'zh-hk' ? '即日印刷' : locale === 'ja' ? '当日印刷' : 'Same-Day Printing', item: `https://zprintpro.com/${locale}/services/rush-printing-delivery/` },
          ],
        }}
      />

      {/* S1 Hero — verbatim 加工厂图全屏 (K3 11:02 授权 viewport 满宽) */}
      <RushHero locale={locale} />

      {/* S2 Timeline — 4 时刻 verbatim */}
      <RushTimeline locale={locale} />

      {/* S3 Scenarios — 6 场景卡 verbatim */}
      <RushScenarios locale={locale} />

      {/* S4 Capacity — 已上 (dad3d69) */}
      <RushCapacity locale={locale} />

      {/* S5 Price — 已上 (dad3d69) */}
      <RushPriceTable locale={locale} />

      {/* S6 FAQ — 新 6 条 verbatim (⛔ 禁「自取點」) */}
      <RushFaq locale={locale} />

      {/* S7 CTA + Form — 已上 (dad3d69) */}
      <RushCtaForm locale={locale} />

      {/* Last Updated + 内部链接 — 8/19 5 件套保留 (F0 红线) */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
        <p className="mb-3"><strong>最後更新：</strong>2026 年 8 月 26 日 · 智印港 ZprintPro（彩龍印刷旗下）</p>
        <p className="mb-2"><strong>相關服務：</strong></p>
        <ul className="space-y-1 list-disc list-inside">
          <li><a href="/zh-hk/category/posters/" className="text-[#2873F5] hover:underline">海報印刷</a> · A1/A2 即日速遞，順豐港九新界翌日中午到</li>
          <li><a href="/zh-hk/category/flyers/" className="text-[#2873F5] hover:underline">傳單印刷</a> · A4/A5 100 張起印，即日截單翌日達</li>
          <li><a href="/zh-hk/category/stickers/" className="text-[#2873F5] hover:underline">貼紙印刷</a> · 防水 Vinyl 50 張起，連工藝完成 24 小時</li>
          <li><a href="/zh-hk/category/paper-bags/" className="text-[#2873F5] hover:underline">紙袋印刷</a> · 100 個起，活動 / 展會批量趕工</li>
          <li><a href="/zh-hk/category/calendars/" className="text-[#2873F5] hover:underline">月曆印刷</a> · 2027 掛曆 9 月開學季企業定制起量</li>
        </ul>
      </section>

      {/* S8 Floating — fixed 模式, 不受 1320px 容器约束 */}
      <RushFloating locale={locale} />
    </main>
  );
}
