import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/lib/seo';
import { generateWhatsAppLink } from '@/lib/whatsapp';

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

type L3 = Record<'zh-hk' | 'en' | 'ja', string>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;

  const meta: Record<string, { title: string; description: string }> = {
    'zh-hk': {
      title: '印刷服務 | 貼紙・傳單印刷・包裝盒・紙袋訂製 | 智印港 ZprintPro',
      description:
        '智印港提供香港一站式印刷服務：貼紙、傳單印刷、包裝盒、紙袋、海報、利是封等。30秒AI報價，免費設計，100起訂，72小時出貨，順豐直送港九新界。立即WhatsApp報價！',
    },
    en: {
      title: 'Printing Services: Stickers, Flyers, Packaging | ZprintPro',
      description:
        'Custom stickers, flyers, packaging & paper bags for US small business. Free shipping $99+, free design & mockup, 100 MOQ, 72-hour turnaround. Get your 30-second quote!',
    },
    ja: {
      title: '印刷サービス | ステッカー・チラシ・パッケージ・紙袋 | ZprintPro',
      description:
        'ステッカー、チラシ、パッケージ、紙袋のオリジナル印刷。無料デザイン、小ロット100枚〜、72時間出荷、日本全国へ2-4日配送。30秒オンライン見積もり！',
    },
  };

  return {
    title: meta[locale]?.title || meta['en'].title,
    description: meta[locale]?.description || meta['en'].description,
    alternates: {
      canonical: `https://zprintpro.com/${locale}/services/`,
    },
  };
}

/* ── 服務矩陣（5 主營品類 + 急單 + 設計 + 企業批量） ── */
type ServiceCard = {
  href: (locale: string) => string;
  name: L3;
  desc: L3;
  meta: L3;
};

const serviceCards: ServiceCard[] = [
  {
    href: (l) => `/${l}/category/stickers/`,
    name: { 'zh-hk': '貼紙・標籤印刷', en: 'Stickers & Labels', ja: 'ステッカー・ラベル' },
    desc: {
      'zh-hk': '防水貼紙、透明貼紙、燙金貼紙、防偽標籤，包裝及品牌宣傳必備。',
      en: 'Waterproof, clear, foil & security labels for packaging and branding.',
      ja: '防水・透明・箔押し・セキュリティラベルなど、パッケージやブランディングに。',
    },
    meta: { 'zh-hk': '100 張起訂 · 72h 出貨', en: 'From 100 pcs · 72h turnaround', ja: '100枚〜 · 72時間出荷' },
  },
  {
    href: (l) => `/${l}/category/flyers/`,
    name: { 'zh-hk': '傳單印刷印刷', en: 'Flyers & Leaflets', ja: 'チラシ・リーフレット' },
    desc: {
      'zh-hk': 'A5/A4 單張、摺頁、厚咭紙單張，餐飲推廣、開業宣傳、活動派發首選。',
      en: 'A5/A4 flyers, folded leaflets & thick cardstock for promos, openings and events.',
      ja: 'A5/A4チラシ、折りリーフレット、厚紙チラシ。販促・開業・イベント配布に。',
    },
    meta: { 'zh-hk': '100 張起訂 · 72h 出貨', en: 'From 100 pcs · 72h turnaround', ja: '100枚〜 · 72時間出荷' },
  },
  {
    href: (l) => `/${l}/category/packaging/`,
    name: { 'zh-hk': '包裝盒訂製', en: 'Custom Packaging Boxes', ja: 'パッケージ箱オーダー' },
    desc: {
      'zh-hk': '禮品盒、化妝品盒、食品盒、郵寄盒，免費結構設計及電子打樣。',
      en: 'Gift, cosmetic, food & mailer boxes with free structural design and mockup.',
      ja: 'ギフト箱、化粧品箱、食品箱、通販用箱。構造設計・モックアップ無料。',
    },
    meta: { 'zh-hk': '100 個起訂 · 免費打樣', en: 'From 100 pcs · Free mockup', ja: '100個〜 · モックアップ無料' },
  },
  {
    href: (l) => `/${l}/category/paper-bags/`,
    name: { 'zh-hk': '紙袋訂製', en: 'Custom Paper Bags', ja: 'オリジナル紙袋' },
    desc: {
      'zh-hk': '牛皮紙袋、白卡紙袋、禮品袋，零售門市及活動禮品必備。',
      en: 'Kraft, white card & gift bags for retail stores, events and giveaways.',
      ja: 'クラフト紙袋、白カード紙袋、ギフトバッグ。店舗・イベント・ノベルティに。',
    },
    meta: { 'zh-hk': '100 個起訂 · 72h 出貨', en: 'From 100 pcs · 72h turnaround', ja: '100個〜 · 72時間出荷' },
  },
  {
    href: (l) => `/${l}/services/rush-printing-delivery/`,
    name: { 'zh-hk': '急單・翌日速遞', en: 'Rush & Next-Day Delivery', ja: '特急印刷・短納期便' },
    desc: {
      'zh-hk': '急單專線：當日 6PM 截單，翌日送達港九新界，全球特快 2-4 天。',
      en: 'Rush line: order by 6PM for next-day HK delivery; 2-4 day express worldwide.',
      ja: '特急便：アジア工場より日本全国へ最短2-4日。急ぎの案件に対応します。',
    },
    meta: { 'zh-hk': '6PM 截單 · 翌日送達', en: '6PM cut-off · Next-day HK', ja: '当日18時締切 · 短納期' },
  },
  {
    href: (l) => `/${l}/quote/`,
    name: { 'zh-hk': '免費設計・免費打樣', en: 'Free Design & Mockup', ja: '無料デザイン・モックアップ' },
    desc: {
      'zh-hk': '未有設計稿？專業設計師免費排版設計，確認電子樣後先至印刷。',
      en: 'No artwork? Our designers prepare your layout free — print only after you approve the proof.',
      ja: 'デザインデータがなくてもOK。プロが無料でレイアウト作成、確認後に印刷。',
    },
    meta: { 'zh-hk': '費用全免 · 滿意先印', en: 'Always free · Print when happy', ja: '無料 · 納得してから印刷' },
  },
  {
    href: (l) => `/${l}/contact/`,
    name: { 'zh-hk': '企業批量採購', en: 'Corporate & Bulk Orders', ja: '法人・大量発注' },
    desc: {
      'zh-hk': '批量訂單專屬折扣，月結付款，專人跟進，支援長期供應協議。',
      en: 'Volume discounts, NET-30 terms, dedicated support and long-term supply agreements.',
      ja: '大口割引、請求書払い、専任担当、長期供給契約に対応。',
    },
    meta: { 'zh-hk': '量大從優 · 專人跟進', en: 'Volume pricing · Dedicated rep', ja: '大口割引 · 専任担当' },
  },
];

/* ── 4 步流程 ── */
const steps: Array<{ num: string; title: L3; desc: L3 }> = [
  {
    num: '01',
    title: { 'zh-hk': '提交需求', en: 'Tell Us What You Need', ja: '要件を送信' },
    desc: {
      'zh-hk': 'WhatsApp 或報價表單，話我哋知產品、尺寸、數量。',
      en: 'Send product, size and quantity via WhatsApp or the quote form.',
      ja: 'WhatsAppまたはフォームで製品・サイズ・数量を送信。',
    },
  },
  {
    num: '02',
    title: { 'zh-hk': '30 秒取得報價', en: 'Get a 30-Second Quote', ja: '30秒で見積もり' },
    desc: {
      'zh-hk': 'AI 即時計算，價格透明，無隱藏收費。',
      en: 'Instant AI pricing — transparent, no hidden fees.',
      ja: 'AIが即時計算。透明な価格、隠れた費用なし。',
    },
  },
  {
    num: '03',
    title: { 'zh-hk': '確認設計文件', en: 'Approve Your Proof', ja: 'デザインを確認' },
    desc: {
      'zh-hk': '免費設計修改，確認電子樣後先至開印。',
      en: 'Free design revisions — we print only after you approve the digital proof.',
      ja: '無料で修正対応。デジタル校正確認後に印刷開始。',
    },
  },
  {
    num: '04',
    title: { 'zh-hk': '72 小時出貨', en: '72-Hour Turnaround', ja: '72時間出荷' },
    desc: {
      'zh-hk': '順豐直送香港 1-2 天，全球速遞 2-4 天。',
      en: 'Ships in 72 hours; DHL 2-4 day delivery to the US and worldwide.',
      ja: '72時間で出荷、日本全国へ2-4日でお届け。',
    },
  },
];

/* ── 行業場景 ── */
const industries: Array<{ href: (l: string) => string; name: L3; use: L3 }> = [
  {
    href: (l) => `/${l}/category/stickers/`,
    name: { 'zh-hk': '餐飲外賣', en: 'Restaurants & Food Delivery', ja: '飲食店・デリバリー' },
    use: {
      'zh-hk': '餐盒貼紙、餐牌、推廣單張',
      en: 'Food labels, menus, promo flyers',
      ja: 'フードラベル、メニュー、販促チラシ',
    },
  },
  {
    href: (l) => `/${l}/category/paper-bags/`,
    name: { 'zh-hk': '零售精品', en: 'Retail & Boutiques', ja: '小売・セレクトショップ' },
    use: {
      'zh-hk': '購物紙袋、品牌貼紙、禮品包裝',
      en: 'Shopping bags, brand stickers, gift wrap',
      ja: 'ショッパー、ブランドシール、ギフト包装',
    },
  },
  {
    href: (l) => `/${l}/category/packaging/`,
    name: { 'zh-hk': '跨境電商', en: 'E-commerce Sellers', ja: 'EC・通販' },
    use: {
      'zh-hk': '郵寄盒、感謝卡、封口貼紙',
      en: 'Mailer boxes, thank-you cards, seal stickers',
      ja: '通販用箱、サンクスカード、封印シール',
    },
  },
  {
    href: (l) => `/${l}/category/packaging/`,
    name: { 'zh-hk': '美妝護膚', en: 'Beauty & Skincare', ja: 'コスメ・スキンケア' },
    use: {
      'zh-hk': '化妝品盒、成分標籤、套裝禮盒',
      en: 'Cosmetic boxes, ingredient labels, gift sets',
      ja: '化粧品箱、成分ラベル、ギフトセット',
    },
  },
  {
    href: (l) => `/${l}/category/flyers/`,
    name: { 'zh-hk': '教育培訓', en: 'Education & Events', ja: '教育・イベント' },
    use: {
      'zh-hk': '課程單張、教材印刷、活動海報',
      en: 'Course flyers, workbooks, event posters',
      ja: '講座チラシ、教材印刷、イベントポスター',
    },
  },
  {
    href: (l) => `/${l}/category/red-packets/`,
    name: { 'zh-hk': '婚慶節日', en: 'Weddings & Holidays', ja: 'ウェディング・行事' },
    use: {
      'zh-hk': '利是封、回禮貼紙、邀請卡',
      en: 'Red packets, favor stickers, invitations',
      ja: 'ポチ袋、引出物シール、招待状',
    },
  },
];

/* ── 熱門分類（8 格，P0 優先，無名片） ── */
const categories: Array<{ slug: string; name: L3 }> = [
  { slug: 'stickers', name: { 'zh-hk': '貼紙', en: 'Stickers', ja: 'ステッカー' } },
  { slug: 'flyers', name: { 'zh-hk': '傳單印刷', en: 'Flyers', ja: 'チラシ' } },
  { slug: 'packaging', name: { 'zh-hk': '包裝盒', en: 'Packaging', ja: 'パッケージ' } },
  { slug: 'paper-bags', name: { 'zh-hk': '紙袋', en: 'Paper Bags', ja: '紙袋' } },
  { slug: 'posters', name: { 'zh-hk': '海報', en: 'Posters', ja: 'ポスター' } },
  { slug: 'books', name: { 'zh-hk': '書刊畫冊', en: 'Books & Booklets', ja: '書籍・冊子' } },
  { slug: 'red-packets', name: { 'zh-hk': '利是封', en: 'Red Packets', ja: 'ポチ袋' } },
  { slug: 'banners', name: { 'zh-hk': '易拉寶', en: 'Banners', ja: 'バナー' } },
];

const heroBadges: Record<string, string[]> = {
  'zh-hk': ['30 秒 AI 報價', '免費設計', '100 起訂', '72 小時出貨'],
  en: ['Free Shipping $99+', 'Free Design & Mockup', '100 MOQ', '72h Turnaround'],
  ja: ['無料デザイン', '100枚〜小ロット', '72時間出荷', '日本全国配送'],
};

export default function ServicesPage({ params }: Props) {
  const locale = params.locale as 'zh-hk' | 'en' | 'ja';
  const L = (obj: L3) => obj[locale] || obj['en'];

  const t = {
    'zh-hk': {
      h1: '一站式印刷服務',
      subtitle: '貼紙・傳單印刷・包裝盒・紙袋，專為香港中小企及全球客戶定制',
      servicesTitle: '我們的服務',
      stepsTitle: '落單流程',
      industriesTitle: '行業應用場景',
      categoriesTitle: '熱門產品分類',
      quoteNow: '立即報價',
      ctaTitle: '需要定制印刷服務？',
      ctaDesc: 'WhatsApp 即時報價，或填寫表單獲取免費設計及詳細方案',
      ctaWhatsApp: 'WhatsApp 報價',
      ctaQuote: '索取免費報價',
    },
    en: {
      h1: 'Custom Printing Services',
      subtitle: 'Stickers, flyers, packaging & paper bags — built for US small business',
      servicesTitle: 'Our Services',
      stepsTitle: 'How It Works',
      industriesTitle: 'Industries We Serve',
      categoriesTitle: 'Popular Product Categories',
      quoteNow: 'Get Quote',
      ctaTitle: 'Need Custom Printing?',
      ctaDesc: 'Get an instant WhatsApp quote, or send the form for free design and a detailed plan',
      ctaWhatsApp: 'WhatsApp Us',
      ctaQuote: 'Get a Free Quote',
    },
    ja: {
      h1: 'オリジナル印刷サービス',
      subtitle: 'ステッカー・チラシ・パッケージ・紙袋 — 高品質・短納期でお届け',
      servicesTitle: 'サービス一覧',
      stepsTitle: 'ご注文の流れ',
      industriesTitle: '業種別活用シーン',
      categoriesTitle: '人気製品カテゴリー',
      quoteNow: '見積もり',
      ctaTitle: 'カスタム印刷をご検討ですか？',
      ctaDesc: 'WhatsAppで即時見積もり、またはフォームで無料デザインと詳細プランをご提案',
      ctaWhatsApp: 'WhatsAppで相談',
      ctaQuote: '無料見積もり',
    },
  }[locale] || {
    h1: 'Custom Printing Services',
    subtitle: 'Stickers, flyers, packaging & paper bags — built for US small business',
    servicesTitle: 'Our Services',
    stepsTitle: 'How It Works',
    industriesTitle: 'Industries We Serve',
    categoriesTitle: 'Popular Product Categories',
    quoteNow: 'Get Quote',
    ctaTitle: 'Need Custom Printing?',
    ctaDesc: 'Get an instant WhatsApp quote, or send the form for free design and a detailed plan',
    ctaWhatsApp: 'WhatsApp Us',
    ctaQuote: 'Get a Free Quote',
  };

  const waLink = generateWhatsAppLink(locale, { source: 'services-page' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.servicesTitle,
    itemListElement: serviceCards.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: L(s.name),
        description: L(s.desc),
        url: `https://zprintpro.com${s.href(locale)}`,
        provider: { '@type': 'Organization', name: 'ZprintPro' },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero（面包屑由 layout 全局 BreadcrumbNav 渲染，此处不重复） */}
      <section className="bg-gradient-to-r from-[#2873F5] to-[#1a5fd4] text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.h1}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-6">{t.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            {(heroBadges[locale] || heroBadges['en']).map((b) => (
              <span
                key={b}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/15 text-sm font-medium backdrop-blur-sm"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Matrix */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[#333333] mb-8">{t.servicesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((service) => (
            <Link
              key={L(service.name)}
              href={service.href(locale)}
              className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all hover:border-[#2873F5]/30 flex flex-col"
            >
              <h3 className="text-lg font-bold text-[#333333] mb-3 group-hover:text-[#2873F5] transition-colors">
                {L(service.name)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                {L(service.desc)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{L(service.meta)}</span>
                <span className="inline-flex items-center text-[#2873F5] font-medium text-sm group-hover:underline">
                  {t.quoteNow} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-t">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-[#333333] mb-8 text-center">{t.stepsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <div className="text-3xl font-extrabold text-[#2873F5]/20 mb-2">{step.num}</div>
                <h3 className="text-base font-bold text-[#333333] mb-2">{L(step.title)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{L(step.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[#333333] mb-8">{t.industriesTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind) => (
            <Link
              key={L(ind.name)}
              href={ind.href(locale)}
              className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all hover:border-[#2873F5]/30"
            >
              <h3 className="text-base font-bold text-[#333333] mb-1.5 group-hover:text-[#2873F5] transition-colors">
                {L(ind.name)}
              </h3>
              <p className="text-sm text-gray-600">{L(ind.use)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links to Product Categories */}
      <section className="bg-white border-t">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-[#333333] mb-8 text-center">{t.categoriesTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${locale}/category/${cat.slug}/`}
                className="block text-center p-4 rounded-lg bg-gray-50 hover:bg-[#2873F5]/5 hover:border-[#2873F5]/30 border border-gray-100 transition-all"
              >
                <span className="text-sm font-medium text-gray-700 hover:text-[#2873F5]">
                  {L(cat.name)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-t">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-[#333333] mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">{t.ctaDesc}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1eb856] transition-colors"
            >
              {t.ctaWhatsApp}
            </a>
            <Link
              href={`/${locale}/quote/`}
              className="inline-flex items-center px-6 py-3 bg-[#2873F5] text-white font-semibold rounded-lg hover:bg-[#1a5fd4] transition-colors"
            >
              {t.ctaQuote}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
