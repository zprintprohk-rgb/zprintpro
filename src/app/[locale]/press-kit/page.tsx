import { Metadata } from 'next';
import { Locale, siteConfig, getBrandName } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generateWhatsAppLink } from '@/lib/whatsapp';

interface PressKitPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '媒體中心 & Press Kit | 智印港 ZprintPro',
    description: '智印港 ZprintPro 媒體中心——獲取公司介紹、品牌素材、高解析度產品圖片及媒體聯絡資訊。歡迎媒體、博主及合作夥伴聯繫我們。',
    h1: '媒體中心',
    subtitle: '歡迎媒體、博主及行業夥伴使用以下素材進行報導與合作',
    contact: '媒體聯絡',
    contactName: '唐先生（市場部）',
    contactRole: 'ZprintPro 智印港 市場總監',
    contactEmail: 'zprintpro@outlook.com',
    contactPhone: '+8619880851334',
    contactNote: '媒體查詢優先處理，24小時內回覆',
    about: '公司簡介',
    aboutText: `ZprintPro 智印港成立於2012年，總部位於中華人民共和國廣東省深圳市龍崗區平湖街道嘉城路1號，是面向香港及全球市場的國際印刷服務品牌。我們為全球超過3,000家企業提供高品質印刷解決方案，產品涵蓋名片、傳單、貼紙、包裝盒、紙袋、海報、書籍、利是封等79個品類。我們的使命是讓每一位客戶都能以合理的價格，獲得超出預期的印刷品質。`,
    stats: '核心數據',
    statItems: [
      { value: '3,000+', label: '服務企業' },
      { value: '79', label: '產品種類' },
      { value: '99.2%', label: '客戶滿意度' },
      { value: '24h', label: '最快交貨' },
    ],
    assets: '品牌素材下載',
    logo: '公司 Logo',
    logoDesc: 'ZprintPro 智印港品牌標誌，PNG 格式，透明背景',
    logoDownload: '下載 Logo',
    productImages: '產品圖片',
    productImagesDesc: '78款產品的高解析度展示圖片，適用於媒體報導及內容創作',
    productImagesDownload: '瀏覽產品圖片',
    angles: '報導角度建議',
    angleItems: [
      { title: '香港製造業數碼轉型', desc: '探討傳統印刷行業如何透過線上報價、AI設計輔助等技術實現數碼化轉型。' },
      { title: '中小企品牌建設', desc: '分析香港中小企如何利用高品質印刷品（名片、包裝盒、傳單印刷）提升品牌形象。' },
      { title: '環保印刷趨勢', desc: '報導環保再生紙、大豆油墨等可持續印刷材料的應用與市場趨勢。' },
      { title: '即日印刷的商業價值', desc: '探討24小時急件印刷服務如何滿足香港快節奏商業環境的需求。' },
    ],
    factSheet: '事實資料表',
    factItems: [
      { label: '公司全名', value: 'ZprintPro 智印港' },
      { label: '成立年份', value: '2012年' },
      { label: '總部地址', value: '中國廣東省深圳市龍崗區平湖街道嘉城路1號' },
      { label: '服務範圍', value: '香港、中國內地、日本、美國、英國、澳大利亞' },
      { label: '核心產品', value: '名片、傳單、貼紙、包裝盒、紙袋、海報、書籍' },
      { label: '網站', value: 'zprintpro.com' },
      { label: 'WhatsApp', value: '+8619880851334' },
    ],
    cta: '需要更多素材或有報導合作意向？',
    ctaBtn: '聯繫我們',
  },
  en: {
    title: 'Press Kit & Media Center | ZprintPro',
    description: 'ZprintPro Press Kit — Download company info, brand assets, high-res product images, and media contact details. Journalists, bloggers, and partners welcome.',
    h1: 'Press Kit',
    subtitle: 'Journalists, bloggers, and industry partners are welcome to use the following assets for coverage and collaboration',
    contact: 'Media Contact',
    contactName: 'Mr. Tang (Marketing)',
    contactRole: 'Marketing Director, ZprintPro',
    contactEmail: 'zprintpro@outlook.com',
    contactPhone: '+8619880851334',
    contactNote: 'Media inquiries receive priority response within 24 hours',
    about: 'Company Overview',
    aboutText: `Founded in 2012 and headquartered in Shenzhen, Guangdong, China, ZprintPro is an international printing service brand serving Hong Kong and global markets. We serve over 3,000 businesses worldwide with high-quality printing solutions across 79 product categories, including business cards, flyers, stickers, packaging boxes, paper bags, posters, books, and red packets. Our mission is to help every client achieve exceptional print quality at a fair price.`,
    stats: 'Key Metrics',
    statItems: [
      { value: '3,000+', label: 'Business Clients' },
      { value: '79', label: 'Product Types' },
      { value: '99.2%', label: 'Satisfaction' },
      { value: '24h', label: 'Fastest Delivery' },
    ],
    assets: 'Brand Assets',
    logo: 'Company Logo',
    logoDesc: 'ZprintPro brand logo in PNG format with transparent background',
    logoDownload: 'Download Logo',
    productImages: 'Product Images',
    productImagesDesc: 'High-resolution product showcase images for 78 products, suitable for media coverage and content creation',
    productImagesDownload: 'Browse Product Images',
    angles: 'Story Angles',
    angleItems: [
      { title: 'Digital Transformation in HK Manufacturing', desc: 'How traditional printing adopts online quoting and AI-assisted design to go digital.' },
      { title: 'SME Brand Building', desc: 'How Hong Kong SMEs leverage quality print materials to elevate brand image.' },
      { title: 'Eco-Friendly Printing Trends', desc: 'Sustainable materials like recycled paper and soy ink in the printing market.' },
      { title: 'Same-Day Printing Business Value', desc: 'How 24-hour rush printing meets the demands of Hong Kong\'s fast-paced business environment.' },
    ],
    factSheet: 'Fact Sheet',
    factItems: [
      { label: 'Company Name', value: 'ZprintPro' },
      { label: 'Founded', value: '2012' },
      { label: 'Headquarters', value: 'No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong, China' },
      { label: 'Service Areas', value: 'Hong Kong, Mainland China, Japan, USA, UK, Australia' },
      { label: 'Core Products', value: 'Business cards, flyers, stickers, boxes, bags, posters, books' },
      { label: 'Website', value: 'zprintpro.com' },
      { label: 'WhatsApp', value: '+8619880851334' },
    ],
    cta: 'Need more assets or interested in a story collaboration?',
    ctaBtn: 'Contact Us',
  },
  ja: {
    title: 'プレスキット & メディアセンター | ZprintPro',
    description: 'ZprintProのプレスキット——会社概要、ブランド素材、高解像度製品画像、メディア連絡先をダウンロード。ジャーナリスト、ブロガー、パートナーの皆様を歓迎します。',
    h1: 'プレスキット',
    subtitle: 'ジャーナリスト、ブロガー、業界パートナーの皆様は、以下の素材をカバレッジやコラボレーションにご自由にお使いください',
    contact: 'メディア連絡先',
    contactName: 'タン氏（マーケティング部）',
    contactRole: 'ZprintPro マーケティングディレクター',
    contactEmail: 'zprintpro@outlook.com',
    contactPhone: '+8619880851334',
    contactNote: 'メディアからのお問い合わせは24時間以内に優先対応',
    about: '会社概要',
    aboutText: `2012年に設立され、中華人民共和国広東省深圳市龍崗区平湖街道嘉城路1号に本社を構えるZprintProは、香港を含む世界市場向けの国際印刷サービスブランドです。世界中の3,000社以上の企業に高品質な印刷ソリューションを提供しており、名刺、チラシ、ステッカー、包装箱、紙袋、ポスター、書籍、紅包など79の製品カテゴリーを展開しています。私たちのミッションは、すべてのクライアントが適正な価格で期待を超える印刷品質を得られるようにすることです。`,
    stats: '主要指標',
    statItems: [
      { value: '3,000+', label: '企業クライアント' },
      { value: '79', label: '製品種類' },
      { value: '99.2%', label: '満足度' },
      { value: '24h', label: '最短納期' },
    ],
    assets: 'ブランド素材',
    logo: '会社ロゴ',
    logoDesc: 'ZprintProブランドロゴ（PNG形式、透明背景）',
    logoDownload: 'ロゴをダウンロード',
    productImages: '製品画像',
    productImagesDesc: '78製品の高解像度ショーケース画像。メディア報道やコンテンツ制作に最適',
    productImagesDownload: '製品画像を閲覧',
    angles: '報道アングル提案',
    angleItems: [
      { title: '香港製造業のデジタルトランスフォーメーション', desc: '伝統的な印刷業界がオンライン見積もりやAI支援デザインなどの技術を通じてデジタル化を実現する方法。' },
      { title: '中小企業のブランド構築', desc: '香港の中小企業が高品質な印刷物を活用してブランドイメージを向上させる分析。' },
      { title: '環境配慮型印刷のトレンド', desc: '再生紙や大豆インキなどの持続可能な印刷材料の応用と市場トレンド。' },
      { title: '即日印刷のビジネス価値', desc: '24時間急行印刷サービスが香港の速いビジネス環境のニーズにどう応えるか。' },
    ],
    factSheet: 'ファクトシート',
    factItems: [
      { label: '会社名', value: 'ZprintPro 智印港' },
      { label: '設立', value: '2012年' },
      { label: '本社所在地', value: '中華人民共和国広東省深圳市龍崗区平湖街道嘉城路1号' },
      { label: 'サービスエリア', value: '香港、中国本土、日本、米国、英国、オーストラリア' },
      { label: '主要製品', value: '名刺、チラシ、ステッカー、包装箱、紙袋、ポスター、書籍' },
      { label: 'ウェブサイト', value: 'zprintpro.com' },
      { label: 'WhatsApp', value: '+8619880851334' },
    ],
    cta: 'さらに素材が必要ですか？報道コラボレーションにご興味がありますか？',
    ctaBtn: 'お問い合わせ',
  },
};

export async function generateMetadata({ params }: PressKitPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale] || translations['zh-hk'];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/press-kit/`,
      languages: {
        'zh-HK': `${siteConfig.url}/press-kit/`,
        'en': `${siteConfig.url}/en/press-kit/`,
        'ja': `${siteConfig.url}/ja/press-kit/`,
        'x-default': `${siteConfig.url}/zh-hk/press-kit/`,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export default function PressKitPage({ params }: PressKitPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale] || translations['zh-hk'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t.title,
    description: t.description,
    url: `${siteConfig.url}/${locale}/press-kit/`,
    mainEntity: {
      '@type': 'Organization',
      name: getBrandName(locale),
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/gsc-logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        contactType: 'Media Contact',
        availableLanguage: ['Chinese', 'English', 'Japanese'],
      },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-[#2873F5] text-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl">{t.subtitle}</p>
          </div>
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Media Contact */}
          <section>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.contact}</h2>
            <div className="bg-white rounded-xl border border-gray-100 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.contactName}</h3>
                  <p className="text-gray-600 mb-4">{t.contactRole}</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Email:</span> <a href={`mailto:${t.contactEmail}`} className="text-[#2873F5] hover:underline">{t.contactEmail}</a></p>
                    <p><span className="text-gray-500">WhatsApp:</span> <a href={generateWhatsAppLink(locale, { source: 'press-kit', phone: t.contactPhone })} target="_blank" rel="noopener noreferrer" className="text-[#2873F5] hover:underline">{t.contactPhone}</a></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                    {t.contactNote}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About */}
          <section>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.about}</h2>
            <div className="bg-white rounded-xl border border-gray-100 p-8">
              <p className="text-gray-600 leading-relaxed">{t.aboutText}</p>
            </div>
          </section>

          {/* Stats */}
          <section>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.stats}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.statItems.map((stat, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                  <div className="text-3xl font-bold text-[#2873F5] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Assets */}
          <section>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.assets}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.logo}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.logoDesc}</p>
                <div className="bg-gray-50 rounded-lg p-8 mb-4 flex items-center justify-center">
                  {/* 2026-07-22 v5: press-kit 改用 GSC LOGO.png (K3 拍板 — 统一圆形 logo) */}
                  <img src="/images/gsc-logo.png" alt="ZprintPro Logo" className="max-h-24 object-contain" loading="lazy" decoding="async" width="200" height="200" />
                </div>
                <a
                  href="/images/gsc-logo.png"
                  download
                  className="inline-flex items-center px-4 py-2 bg-[#2873F5] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {t.logoDownload}
                </a>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.productImages}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.productImagesDesc}</p>
                <div className="bg-gray-50 rounded-lg p-8 mb-4 grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-gray-200 rounded" />
                  <div className="aspect-square bg-gray-200 rounded" />
                  <div className="aspect-square bg-gray-200 rounded" />
                </div>
                <a
                  href={`/${locale}/product/premium-business-cards/`}
                  className="inline-flex items-center px-4 py-2 bg-[#2873F5] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {t.productImagesDownload}
                </a>
              </div>
            </div>
          </section>

          {/* Story Angles */}
          <section>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.angles}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.angleItems.map((angle, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{angle.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{angle.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fact Sheet */}
          <section>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.factSheet}</h2>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {t.factItems.map((fact, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-3 font-medium text-gray-700 w-1/3">{fact.label}</td>
                      <td className="px-6 py-3 text-gray-600">{fact.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-8">
            <p className="text-lg text-gray-700 mb-4">{t.cta}</p>
            <a
              href={`/${locale}/contact/`}
              className="inline-flex items-center px-6 py-3 bg-[#2873F5] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t.ctaBtn}
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
