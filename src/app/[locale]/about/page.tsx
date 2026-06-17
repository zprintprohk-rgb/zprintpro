import { Metadata } from 'next';
import { Locale, siteConfig, generateLocalBusinessSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = translations[params.locale];
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `${siteConfig.url}/${params.locale}/about/`,
      languages: {
        'zh-HK': `${siteConfig.url}/about/`,
        'en': `${siteConfig.url}/en/about/`,
        'ja': `${siteConfig.url}/ja/about/`,
      },
    },
  };
}

const translations = {
  'zh-hk': {
    metaTitle: '關於智印雲 | 香港專業印刷服務 | 10年經驗服務1000+企業',
    metaDesc: '智印雲 ZprintPro 扎根香港超過10年，專注為本地及全球企業提供高品質印刷服務。ISO 9001認證、FSC環保認證，累計服務1000+客戶。',
    h1: '關於智印雲 ZprintPro',
    subtitle: '扎根香港超過10年，專注高品質印刷服務',
    storyTitle: '品牌故事',
    story: `智印雲 ZprintPro 於2014年在香港成立，最初是一間專注於名片與宣傳單張的小型印刷工作室。創辦人憑藉對色彩管理的執著與對客戶需求的敏銳洞察，逐步將業務拓展至包裝盒、貼紙、海報、書籍等全方位印刷領域。

十年來，我們見證了香港印刷行業從傳統柯式印刷向數碼印刷轉型的全過程。我們率先引入海德堡四色柯式印刷機與HP Indigo數碼印刷系統，建立了完整的ICC色彩管理流程，確保每一張成品都精準還原品牌色彩。我們累計服務超過1000家香港本地及海外企業，涵蓋金融、法律、餐飲、零售、教育及創意產業。`,
    advantageTitle: '核心優勢',
    advantages: [
      { title: '品質保證', desc: 'ISO 9001質量管理體系認證，海德堡四色柯式印刷，ICC色彩管理，Delta E ≤3色彩誤差控制。從印前到印後，每個環節均有專人檢查。' },
      { title: '快速交付', desc: '數碼印刷當日可取，柯式印刷3–5天交貨。順豐速遞覆蓋香港全區，大批量可安排專車直送。緊急訂單專人跟進，確保準時交付。' },
      { title: '專業服務', desc: '免費設計諮詢、免費刀模設計、免費色彩校樣。專屬客戶經理一對一跟進，從報價到交付全程無憂。' },
    ],
    teamTitle: '專業團隊',
    teams: [
      { title: '創始人', desc: '擁有15年印刷行業經驗，曾服務於國際頂級印刷集團，精通色彩管理與印前工藝。' },
      { title: '印前工程師', desc: '平均8年經驗，專注於AI／PDF文件檢查、刀模設計、ICC色彩配置與數碼打樣。' },
      { title: '客戶服務團隊', desc: '流利粵語、英語、普通話及日語，提供24小時內回覆承諾，協助客戶解決從報價到售後的所有問題。' },
    ],
    certTitle: '資質認證',
    certs: [
      { name: 'ISO 9001', desc: '質量管理體系認證，確保每個生產環節標準化' },
      { name: 'FSC 認證', desc: '森林管理委員會認證，環保紙張可追溯來源' },
      { name: '大豆油墨', desc: '採用環保大豆油墨，VOC排放低於行業標準50%' },
    ],
    stats: { clients: '1000+', years: '10+', products: '79', satisfaction: '98%' },
    statsLabels: { clients: '累計客戶', years: '行業經驗', products: 'SKU產品', satisfaction: '客戶滿意度' },
  },
  en: {
    metaTitle: 'About ZprintPro | Premium Printing Service From Hong Kong to USA / UK / AU',
    metaDesc: 'Premium printing service from Hong Kong to US, UK, AU, CA. ISO 9001 + FSC certified, 10+ years experience, 1000+ global clients. 72-hour worldwide delivery from our Hong Kong factory.',
    h1: 'About ZprintPro',
    subtitle: 'Premium printing service shipping to 50+ countries from Hong Kong since 2014',
    storyTitle: 'Our Story',
    story: `ZprintPro was founded in Hong Kong in 2014, starting as a small printing studio focused on business cards and flyers. The founder's obsession with color management and keen insight into client needs gradually expanded the business into packaging, stickers, posters, books, and comprehensive printing services.

Over the past decade, we have witnessed Hong Kong's printing industry transform from traditional offset to digital printing. We pioneered the introduction of Heidelberg 4-color offset presses and HP Indigo digital systems, establishing complete ICC color management workflows to ensure every piece precisely reproduces brand colors. We have served over 1,000 local and overseas businesses across finance, legal, F&B, retail, education, and creative industries.`,
    advantageTitle: 'Core Advantages',
    advantages: [
      { title: 'Quality Assurance', desc: 'ISO 9001 + FSC certified. Heidelberg 4-color offset + HP Indigo digital printing. ICC color management with Delta E ≤3 control. Every order inspected by dedicated prepress and postpress teams before shipping.' },
      { title: 'Fast Global Delivery', desc: 'Digital printing ships in 24 hours. Offset printing delivers in 3–5 business days. Worldwide express shipping to 50+ countries. Free shipping on selected products to US / UK / AU / CA. Volume orders include dedicated freight forwarding.' },
      { title: 'Professional Service', desc: 'Free design consultation, free die-cut design, free color proofing. Dedicated English-speaking account manager assigned to every order. From quote to delivery — no setup fees, no hidden charges.' },
    ],
    teamTitle: 'Our Team',
    teams: [
      { title: 'Founder', desc: '15 years of printing industry experience, formerly with top international printing groups, expert in color management and prepress processes.' },
      { title: 'Prepress Engineers', desc: 'Average 8 years experience, specializing in AI/PDF file checking, die-cut design, ICC color profiling, and digital proofing.' },
      { title: 'Customer Service', desc: 'Fluent English-speaking team (Mandarin, Cantonese, Japanese available). 24-hour response commitment, dedicated WhatsApp support at +86 181 2638 0255. Assisting clients from quote to after-sales.' },
    ],
    certTitle: 'Certifications',
    certs: [
      { name: 'ISO 9001', desc: 'Quality management system certification ensuring standardized production' },
      { name: 'FSC Certified', desc: 'Forest Stewardship Council certified, eco paper with traceable sources' },
      { name: 'Soy-based Inks', desc: 'Environmentally friendly soy inks with 50% lower VOC emissions' },
    ],
    stats: { clients: '1000+', years: '10+', products: '79', satisfaction: '98%' },
    statsLabels: { clients: 'Clients Served', years: 'Years Experience', products: 'SKU Products', satisfaction: 'Satisfaction Rate' },
  },
  ja: {
    metaTitle: 'ZprintProについて | 香港プロ印刷サービス | 10年の実績',
    metaDesc: '智印雲 ZprintProは香港で10年以上の歴史を持ち、高品質な印刷サービスを提供しています。ISO 9001認証、FSC認証、1000社以上のお客様にサービスを提供。',
    h1: 'ZprintProについて',
    subtitle: '香港で10年以上、高品質印刷に専念',
    storyTitle: 'ブランドストーリー',
    story: `智印雲 ZprintProは2014年に香港で設立され、当初は名刺とチラシに特化した小さな印刷スタジオでした。創業者は色彩管理へのこだわりと顧客ニーズへの鋭い洞察力により、段階的にパッケージ、ステッカー、ポスター、書籍などの総合印刷領域へ事業を拡大しました。

10年間、香港の印刷業界が伝統的なオフセットからデジタル印刷へと変貌する過程を目の当たりにしてきました。私たちはハイデルベルク4色オフセット印刷機とHP Indigoデジタル印刷システムを率先して導入し、ICCカラーマネジメントワークフローを構築しました。これにより、すべての製品がブランドカラーを正確に再現することを保証しています。金融、法律、飲食、小売、教育、クリエイティブ業界を含む、1000社以上の香港および海外企業にサービスを提供しています。`,
    advantageTitle: '核心強み',
    advantages: [
      { title: '品質保証', desc: 'ISO 9001品質管理システム認証、ハイデルベルク4色オフセット印刷、ICCカラーマネジメント、Delta E ≤3の色彩誤差管理。印前から印後まで、各工程に専任者が検査を行います。' },
      { title: '迅速な納品', desc: 'デジタル印刷は当日受取可能、オフセット印刷は3～5日で納品。顺丰速遞は香港全域をカバーし、大口注文は専用トラック直送も可能です。' },
      { title: '専門的なサービス', desc: '無料デザイン相談、無料型抜き設計、無料カラープルーフ。専任のアカウントマネージャーが見積もりから納品までワンストップでサポートします。' },
    ],
    teamTitle: '専門チーム',
    teams: [
      { title: '創業者', desc: '印刷業界15年の経験。国際トップ印刷グループでの勤務経験があり、色彩管理と印前工程に精通。' },
      { title: '印前エンジニア', desc: '平均8年の経験。AI／PDFファイルチェック、型抜き設計、ICCカラープロファイリング、デジタル校正を専門としています。' },
      { title: 'カスタマーサービス', desc: '広東語、英語、北京語、日本語が堪能。24時間以内の返信を約束し、見積もりからアフターサービスまですべての問題を解決します。' },
    ],
    certTitle: '認証資格',
    certs: [
      { name: 'ISO 9001', desc: '品質管理システム認証。各生産工程の標準化を保証。' },
      { name: 'FSC 認証', desc: '森林管理協議会認証。環境配慮型紙の溯源が可能。' },
      { name: '大豆インク', desc: '環境配慮型大豆インクを採用。VOC排出量は業界標準の50%以下。' },
    ],
    stats: { clients: '1000+', years: '10+', products: '79', satisfaction: '98%' },
    statsLabels: { clients: '累計顧客', years: '業界経験', products: 'SKU製品', satisfaction: '顧客満足度' },
  },
};

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = translations[locale];

  // TeamMember Schema
  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t.metaTitle,
    url: `${siteConfig.url}/${locale}/about/`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: siteConfig.logo,
      foundingDate: '2014',
      description: t.metaDesc,
      member: [
        {
          '@type': 'Person',
          name: locale === 'zh-hk' ? '創始人' : locale === 'ja' ? '創業者' : 'Founder',
          jobTitle: locale === 'zh-hk' ? '創始人兼首席執行官' : locale === 'ja' ? '創業者兼CEO' : 'Founder & CEO',
          worksFor: { '@type': 'Organization', name: siteConfig.name },
        },
        {
          '@type': 'Person',
          name: locale === 'zh-hk' ? '首席印前工程師' : locale === 'ja' ? '主任印前エンジニア' : 'Head of Prepress',
          jobTitle: locale === 'zh-hk' ? '印前工程總監' : locale === 'ja' ? '印前工程ディレクター' : 'Prepress Engineering Director',
          worksFor: { '@type': 'Organization', name: siteConfig.name },
        },
        {
          '@type': 'Person',
          name: locale === 'zh-hk' ? '客戶服務總監' : locale === 'ja' ? 'カスタマーサービスディレクター' : 'Customer Service Director',
          jobTitle: locale === 'zh-hk' ? '客戶成功總監' : locale === 'ja' ? '顧客成功ディレクター' : 'Director of Customer Success',
          worksFor: { '@type': 'Organization', name: siteConfig.name },
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: locale === 'zh-hk' ? '印刷服務' : locale === 'ja' ? '印刷サービス' : 'Printing Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Cards' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stickers' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Packaging' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flyers' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Posters' } },
        ],
      },
    },
  };

  // 2026-06-12 Phase B-P1 修复 R08: LocalBusiness schema 注入（Phase A2 报告 0/138 → 1/138）
  const localBusinessJsonLd = generateLocalBusinessSchema(locale);

  return (
    <>
      <JsonLd data={teamSchema} />
      {/* 2026-06-12 Phase B-P1 修复 R08: LocalBusiness schema */}
      <JsonLd data={localBusinessJsonLd} />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#2873F5] to-[#1a5fd1] text-white py-16 md:py-24 max-w-[1320px] mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-10 bg-gray-50 border-b border-gray-100">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#2873F5]">{t.stats.clients}</div>
                <div className="text-gray-600 text-sm mt-1">{t.statsLabels.clients}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#2873F5]">{t.stats.years}</div>
                <div className="text-gray-600 text-sm mt-1">{t.statsLabels.years}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#2873F5]">{t.stats.products}</div>
                <div className="text-gray-600 text-sm mt-1">{t.statsLabels.products}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#2873F5]">{t.stats.satisfaction}</div>
                <div className="text-gray-600 text-sm mt-1">{t.statsLabels.satisfaction}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-6 text-center">{t.storyTitle}</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {t.story}
              </div>
            </div>
          </div>
        </section>

        {/* Core Advantages */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-10 text-center">{t.advantageTitle}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {t.advantages.map((adv, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-[#2873F5]/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-[#2873F5] text-xl font-bold">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{adv.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-10 text-center">{t.teamTitle}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {t.teams.map((team, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2873F5] to-[#1a5fd1] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {team.title.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{team.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{team.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-10 text-center">{t.certTitle}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {t.certs.map((cert, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#333333]">{cert.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
