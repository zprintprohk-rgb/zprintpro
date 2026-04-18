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
    storyText: '智印港 ZprintPro 成立於香港，專注於為本地企業和個人提供一站式專業印刷服務。我們相信優質的印刷品是品牌傳播的基石，從設計到成品，每一個環節都力求完美。',
    mission: '我們的使命',
    missionText: '讓每一位客戶都能以合理的價格，獲得超出預期的印刷品質。我們致力於推動印刷行業的數碼化轉型，縮短交貨時間，提升產品品質。',
    why: '為什麼選擇我們',
    reasons: ['專業設計團隊支持', '300+ 種紙材選擇', '最快即日交貨', '免費送貨滿$500', '全程品質監控'],
  },
  en: {
    title: 'About Us | ZprintPro',
    description: 'ZprintPro is a leading professional printing service provider in Hong Kong, dedicated to delivering high-quality, transparently-priced printing solutions.',
    h1: 'About ZprintPro',
    story: 'Our Story',
    storyText: 'ZprintPro was founded in Hong Kong, focusing on providing one-stop professional printing services for local businesses and individuals. We believe quality printing is the cornerstone of brand communication.',
    mission: 'Our Mission',
    missionText: 'To enable every client to obtain printing quality that exceeds expectations at a reasonable price. We are committed to driving digital transformation in the printing industry.',
    why: 'Why Choose Us',
    reasons: ['Professional design team', '300+ paper options', 'Same-day delivery available', 'Free shipping over $500', 'Full quality control'],
  },
  ja: {
    title: '会社概要 | ZprintPro',
    description: 'ZprintProは香港を拠点とするプロ印刷サービス提供者で、高品質で透明な価格の印刷ソリューションを提供しています。',
    h1: 'ZprintProについて',
    story: 'ブランドストーリー',
    storyText: 'ZprintProは香港で設立され、地元企業や個人向けにワンストップのプロ印刷サービスを提供することに注力しています。',
    mission: '私たちの使命',
    missionText: 'すべてのクライアントが適正な価格で期待を超える印刷品質を得られるようにすること。私たちは印刷業界のデジタル変革を推進しています。',
    why: '選ばれる理由',
    reasons: ['プロのデザインチーム', '300種類以上の用紙', '最短当日配送', '500ドル以上送料無料', '徹底した品質管理'],
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
        </div>
      </div>
    </main>
  );
}
