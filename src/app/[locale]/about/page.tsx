import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';

interface AboutPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '關於我們 | 智印港 ZprintPro',
    description: '智印港 ZprintPro 是香港領先的專業印刷服務供應商，致力於為企業和個人提供高品質、價格透明的印刷解決方案。',
    h1: '關於智印港',
    story: '品牌故事',
    storyText: '智印港 ZprintPro 成立於香港觀塘，專注於為本地企業和個人提供一站式專業印刷服務。從2018年創立至今，我們已服務超過3,000家香港企業，包括餐飲、零售、教育、金融等多個行業。我們相信優質的印刷品是品牌傳播的基石，從設計到成品，每一個環節都力求完美。',
    mission: '我們的使命',
    missionText: '讓每一位客戶都能以合理的價格，獲得超出預期的印刷品質。我們致力於推動印刷行業的數碼化轉型，縮短交貨時間，提升產品品質，為香港企業的品牌建設貢獻力量。',
    why: '為什麼選擇我們',
    reasons: ['專業設計團隊支持', '300+ 種紙材選擇', '最快即日交貨', '免費送貨滿$500', '全程品質監控'],
    timeline: '發展歷程',
    timelineItems: [
      { year: '2018', event: '智印港在香港觀塘成立，開始提供名片和傳單印刷服務' },
      { year: '2019', event: '擴展產品線至貼紙、包裝盒和紙袋，服務客戶突破500家' },
      { year: '2020', event: '引入海德堡印刷設備，建立數碼化色彩管理系統' },
      { year: '2021', event: '推出24小時急件印刷服務，滿足香港快節奏商業需求' },
      { year: '2022', event: '建立線上報價系統，客戶可即時獲取準確報價' },
      { year: '2023', event: '服務企業客戶超過3,000家，拓展日本及海外市場' },
      { year: '2024', event: '全新網站上線，支持三語言（繁中/英/日），提供更優質的用戶體驗' },
    ],
    stats: '核心數據',
    statItems: [
      { value: '3,000+', label: '服務企業' },
      { value: '79', label: '產品種類' },
      { value: '99.2%', label: '客戶滿意度' },
      { value: '24h', label: '最快交貨' },
    ],
    team: '專業團隊',
    teamText: '智印港擁有一支經驗豐富的專業團隊，包括資深印刷技師、平面設計師和客戶服務專員。我們的技術團隊平均擁有10年以上印刷行業經驗，熟悉各種印刷工藝和材料特性，能夠為客戶提供專業的建議和解決方案。',
  },
  en: {
    title: 'About Us | ZprintPro',
    description: 'ZprintPro is a leading professional printing service provider in Hong Kong, dedicated to delivering high-quality, transparently-priced printing solutions.',
    h1: 'About ZprintPro',
    story: 'Our Story',
    storyText: 'ZprintPro was founded in Kwun Tong, Hong Kong, focusing on providing one-stop professional printing services for local businesses and individuals. Since 2018, we have served over 3,000 Hong Kong companies across catering, retail, education, finance, and more. We believe quality printing is the cornerstone of brand communication.',
    mission: 'Our Mission',
    missionText: 'To enable every client to obtain printing quality that exceeds expectations at a reasonable price. We are committed to driving digital transformation in the printing industry and contributing to Hong Kong business branding.',
    why: 'Why Choose Us',
    reasons: ['Professional design team', '300+ paper options', 'Same-day delivery available', 'Free shipping over $500', 'Full quality control'],
    timeline: 'Our Journey',
    timelineItems: [
      { year: '2018', event: 'ZprintPro founded in Kwun Tong, Hong Kong, offering business card and flyer printing' },
      { year: '2019', event: 'Expanded product line to stickers, boxes, and paper bags. Served 500+ clients.' },
      { year: '2020', event: 'Introduced Heidelberg printing equipment and digital color management system' },
      { year: '2021', event: 'Launched 24-hour rush printing service for Hong Kong\'s fast-paced business needs' },
      { year: '2022', event: 'Built online quotation system for instant accurate pricing' },
      { year: '2023', event: 'Served 3,000+ business clients, expanded to Japan and overseas markets' },
      { year: '2024', event: 'New website launched supporting 3 languages (ZH/EN/JA) with enhanced UX' },
    ],
    stats: 'Key Metrics',
    statItems: [
      { value: '3,000+', label: 'Clients Served' },
      { value: '79', label: 'Product Types' },
      { value: '99.2%', label: 'Satisfaction Rate' },
      { value: '24h', label: 'Fastest Delivery' },
    ],
    team: 'Our Team',
    teamText: 'ZprintPro has an experienced professional team including senior printing technicians, graphic designers, and customer service specialists. Our technical team averages 10+ years in the printing industry, familiar with various printing processes and material characteristics.',
  },
  ja: {
    title: '会社概要 | ZprintPro',
    description: 'ZprintProは香港を拠点とするプロ印刷サービス提供者で、高品質で透明な価格の印刷ソリューションを提供しています。',
    h1: 'ZprintProについて',
    story: 'ブランドストーリー',
    storyText: 'ZprintProは香港の観塘で設立され、地元企業や個人向けにワンストップのプロ印刷サービスを提供しています。2018年の創業以来、飲食、小売、教育、金融など、3,000社以上の香港企業をサポートしてきました。',
    mission: '私たちの使命',
    missionText: 'すべてのクライアントが適正な価格で期待を超える印刷品質を得られるようにすること。私たちは印刷業界のデジタル変革を推進し、香港企業のブランド構築に貢献しています。',
    why: '選ばれる理由',
    reasons: ['プロのデザインチーム', '300種類以上の用紙', '最短当日配送', '500ドル以上送料無料', '徹底した品質管理'],
    timeline: '沿革',
    timelineItems: [
      { year: '2018', event: '香港観塘でZprintPro設立。名刺・チラシ印刷を開始。' },
      { year: '2019', event: 'ステッカー・箱・紙袋へ製品ライン拡大。500社以上のクライアントを獲得。' },
      { year: '2020', event: 'ハイデルベルグ印刷機導入。デジタルカラーマネジメントシステム構築。' },
      { year: '2021', event: '24時間急行印刷サービス開始。香港の高速ビジネスニーズに対応。' },
      { year: '2022', event: 'オンライン見積もりシステム構築。即時正確な価格提示を実現。' },
      { year: '2023', event: '3,000社以上の企業クライアントをサポート。日本・海外市場へ拡大。' },
      { year: '2024', event: '3言語対応（繁中・英・日）の新ウェブサイト開設。UXを大幅改善。' },
    ],
    stats: '主要データ',
    statItems: [
      { value: '3,000+', label: 'サービス企業' },
      { value: '79', label: '製品種類' },
      { value: '99.2%', label: '満足度' },
      { value: '24h', label: '最短納期' },
    ],
    team: 'プロチーム',
    teamText: 'ZprintProは、熟練した印刷技師、グラフィックデザイナー、カスタマーサービス専門家からなる経験豊富なチームを擁しています。技術チームの平均業界経験は10年以上で、様々な印刷工程と材料特性に精通しています。',
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale + '/'}about/`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/about/`,
        'en': `${siteConfig.url}/en/about/`,
        'ja-JP': `${siteConfig.url}/ja/about/`,
        'x-default': `${siteConfig.url}/en/about/`,
      },
    },
  };
}

export default function AboutPage({ params }: AboutPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-4">{t.story}</h2>
            <p className="text-gray-600 leading-relaxed">{t.storyText}</p>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-4">{t.mission}</h2>
            <p className="text-gray-600 leading-relaxed">{t.missionText}</p>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.why}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 bg-[#2873F5] text-white rounded-full flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                  <span className="text-gray-700 font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 核心數據 */}
          <section className="bg-gradient-to-br from-[#2873F5] to-[#1E5FD1] rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">{t.stats}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.statItems.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 發展歷程 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.timeline}</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {t.timelineItems.map((item, idx) => (
                  <div key={idx} className="relative flex gap-4">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-[#2873F5] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {item.year.slice(-2)}
                    </div>
                    <div>
                      <div className="font-bold text-[#333333]">{item.year}</div>
                      <div className="text-gray-600 text-sm">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 專業團隊 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-4">{t.team}</h2>
            <p className="text-gray-600 leading-relaxed">{t.teamText}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
