/**
 * /[locale]/trade-program — B2B Trade Program landing page (P1.2)
 * Target: design agencies, print brokers, advertising agencies, resellers
 * 3 档会员 + 申请表单 (5 字段) + FAQ + TrustBadges
 * 3 locale 完整支持 (en primary, 美国市场 + 全球设计公司)
 *
 * Per PM × UX research: 对标 Vistaprint Reseller / MOO Business Plans
 * 美国市场 B2B 印刷的最大客单价来源于代理/经销商/设计公司转单
 */

import { Metadata } from 'next';
import { Locale } from '@/types/locale';
import { generateBusinessJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { TrustBadges } from '@/components/TrustBadges';
import { TradeProgramForm } from './TradeProgramForm';
import { Briefcase, Users, Building2, CheckCircle2, Clock, Award } from 'lucide-react';

// 3 locale static params
export function generateStaticParams() {
  return [
    { locale: 'zh-hk' },
    { locale: 'en' },
    { locale: 'ja' },
  ];
}

const COPY = {
  en: {
    title: 'ZprintPro Trade Program · 20% Off for Designers & Agencies | ZprintPro',
    description: 'Join ZprintPro Trade Program. Get 20% off all custom printing for your design clients. Dedicated account manager. Free US shipping. Perfect for agencies, designers, print brokers.',
    h1: 'ZprintPro Trade Program',
    subtitle: '20% off all custom printing for your design clients. Built for agencies, designers, and print brokers worldwide.',
    tiers: [
      {
        icon: 'briefcase',
        name: 'Trade',
        price: 'Free to Join',
        priceUnit: 'lifetime',
        discount: '20% off',
        features: [
          '20% off all products (stickers, packaging, paper bags, etc.)',
          'Self-serve quote calculator',
          'Email support (24h response)',
          'Monthly invoice billing (NET-30)',
        ],
        cta: 'Apply Free',
        featured: false,
      },
      {
        icon: 'users',
        name: 'Pro Trade',
        price: 'Free to Join',
        priceUnit: 'lifetime',
        discount: '25% off + Priority',
        features: [
          'Everything in Trade, plus:',
          '25% off all products',
          'Dedicated account manager (1-on-1 WhatsApp)',
          'Priority production (5-day vs 7-day)',
          'Free 5 sample packs per quarter',
          'Quarterly business review call',
        ],
        cta: 'Apply Pro',
        featured: true,
      },
      {
        icon: 'building',
        name: 'Enterprise',
        price: 'Custom',
        priceUnit: 'volume',
        discount: '30%+ off',
        features: [
          'Everything in Pro Trade, plus:',
          '30%+ off (negotiated by volume)',
          'White-label option (your client sees your brand)',
          'API access for automated ordering',
          'Custom paper sourcing (FSC / specialty)',
          'Dedicated production line',
        ],
        cta: 'Talk to Sales',
        featured: false,
      },
    ],
    whoFor: 'Who is this for?',
    whoForList: [
      'Design agencies (5+ employees, US / UK / EU / AU / JP)',
      'Print brokers (you resell printing to your clients)',
      'Marketing agencies (multi-channel campaigns)',
      'In-house design teams (corporate procurement)',
      'Event planners (custom collateral at scale)',
      'Real estate marketing teams',
    ],
    formTitle: 'Apply to Trade Program',
    formSubtitle: '7 business days to approval. No setup fees. Cancel anytime.',
    fields: {
      fullName: 'Full Name',
      email: 'Work Email',
      company: 'Company / Agency Name',
      website: 'Website (optional)',
      useCase: 'How will you use ZprintPro for your clients?',
      monthlyVolume: 'Estimated Monthly Volume',
      volumeOptions: [
        '< $500 / month',
        '$500 - $2,000 / month',
        '$2,000 - $10,000 / month',
        '$10,000+ / month',
      ],
      submit: 'Submit Application',
      submitting: 'Submitting...',
      success: 'Application Received!',
      successSub: 'Our trade team will reply within 7 business days at the email you provided.',
    },
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Is there a fee to join the Trade Program?',
        a: 'No. Trade and Pro Trade tiers are free to join. Enterprise tier is custom-priced based on your annual volume commitment.',
      },
      {
        q: 'How long does approval take?',
        a: 'Typically 5-7 business days. Our trade team reviews each application to ensure alignment with our service standards.',
      },
      {
        q: 'Can I white-label the products?',
        a: 'Enterprise tier only. Trade and Pro Trade tiers produce ZprintPro-branded packaging and shipping labels. White-label option available on Enterprise contracts.',
      },
      {
        q: 'What is the NET-30 billing?',
        a: 'Trade members can request monthly NET-30 invoice billing (pay within 30 days of invoice). Available after first 3 successful orders.',
      },
      {
        q: 'How does the dedicated account manager work?',
        a: 'Pro Trade and Enterprise members get a dedicated account manager reachable via WhatsApp during business hours (UTC+8). One-on-one support for quotes, proofs, and production status.',
      },
      {
        q: 'Can I use the discount for my own personal projects?',
        a: 'Trade discount is for client projects only. Personal-use orders should be placed under your personal ZprintPro account at regular pricing.',
      },
    ],
  },
  'zh-hk': {
    title: '智印港 Trade Program 加盟計劃 · 設計公司 / 廣告公司 8 折優惠 | 智印港',
    description: '加入智印港 Trade Program 加盟計劃. 設計公司 / 廣告公司 / 印刷經紀 享 8 折優惠, 專屬客戶經理, 美國免費送貨.',
    h1: '智印港 Trade Program 加盟計劃',
    subtitle: '為您的設計客戶享 8 折印刷優惠. 為廣告公司 / 設計公司 / 印刷經紀而設.',
    tiers: [
      {
        icon: 'briefcase', name: 'Trade', price: '免費加盟', priceUnit: '永久',
        discount: '8 折', features: ['所有產品 8 折優惠 (貼紙 / 包裝 / 紙袋 等)', '自助報價計算器', '電郵支援 (24 小時回覆)', '月結 NET-30 賬單'],
        cta: '免費申請', featured: false,
      },
      {
        icon: 'users', name: 'Pro Trade', price: '免費加盟', priceUnit: '永久',
        discount: '7.5 折 + 優先', features: ['Trade 全部功能 +', '所有產品 7.5 折', '專屬客戶經理 (1 對 1 WhatsApp)', '優先生產 (5 日 vs 7 日)', '每季免費 5 個樣品包', '季度業務回顧會議'],
        cta: '申請 Pro', featured: true,
      },
      {
        icon: 'building', name: 'Enterprise', price: '定制', priceUnit: '量議',
        discount: '7 折+', features: ['Pro Trade 全部功能 +', '7 折+ (按量議價)', '白標選項 (您的客戶看到您的品牌)', 'API 自動下單', '定制紙張採購 (FSC / 特殊)', '專屬生產線'],
        cta: '聯絡銷售', featured: false,
      },
    ],
    whoFor: '適用對象',
    whoForList: [
      '設計公司 (5+ 員工, 美 / 英 / 歐 / 澳 / 日)',
      '印刷經紀 (轉售印刷給客戶)',
      '營銷代理 (多渠道活動)',
      '內部設計團隊 (企業採購)',
      '活動策劃 (大規模定製)',
      '房地產營銷團隊',
    ],
    formTitle: '申請加盟',
    formSubtitle: '7 個工作天審批. 無設置費. 隨時取消.',
    fields: {
      fullName: '姓名', email: '公司電郵', company: '公司 / 機構名稱', website: '網址 (選填)',
      useCase: '您將如何為客戶使用智印港?', monthlyVolume: '預計每月用量',
      volumeOptions: ['< HK$4,000 / 月', 'HK$4,000 - HK$16,000 / 月', 'HK$16,000 - HK$80,000 / 月', 'HK$80,000+ / 月'],
      submit: '提交申請', submitting: '提交中...', success: '申請已收到!', successSub: '我們的加盟團隊將在 7 個工作天內回覆您.',
    },
    faqTitle: '常見問題',
    faqs: [
      { q: '加盟需要費用嗎?', a: 'Trade 和 Pro Trade 級別免費加盟. Enterprise 級別按年量承諾定制定價.' },
      { q: '審批需時多久?', a: '通常 5-7 個工作天. 我們的加盟團隊會審核每份申請, 確保符合我們的服務標準.' },
      { q: '可以白標嗎?', a: '僅 Enterprise 級別支援. Trade 和 Pro Trade 級別使用智印港品牌包裝.' },
      { q: 'NET-30 結算是什麼?', a: 'Trade 成員可申請月結 NET-30 賬單 (發票後 30 天內付款). 前 3 個成功訂單後可選.' },
      { q: '專屬客戶經理如何運作?', a: 'Pro Trade 和 Enterprise 成員獲分配專屬客戶經理, 通過 WhatsApp 在辦公時間 (UTC+8) 聯絡. 1 對 1 報價 / 打稿 / 生產進度支援.' },
      { q: '折扣可用於個人項目嗎?', a: 'Trade 折扣僅用於客戶項目. 個人用途訂單應在您的個人智印港賬戶下以正價下單.' },
    ],
  },
  ja: {
    title: '智印港 Trade Program パートナー · デザイン会社 20% OFF | 智印港',
    description: '智印港 Trade Program パートナー. デザイン会社 / 広告代理店 / 印刷仲介 20% OFF. 専任アカウントマネージャー. 米国送料無料.',
    h1: '智印港 Trade Program パートナー',
    subtitle: 'クライアント向けに 20% OFF 印刷料金. 広告代理店 / デザイン会社 / 印刷仲介向け.',
    tiers: [
      {
        icon: 'briefcase', name: 'Trade', price: '無料登録', priceUnit: '永久',
        discount: '20% OFF', features: ['全商品 20% OFF (ステッカー・パッケージ・紙袋等)', 'セルフ見積もり計算', 'メールサポート (24 時間対応)', '月次 NET-30 請求'],
        cta: '無料申請', featured: false,
      },
      {
        icon: 'users', name: 'Pro Trade', price: '無料登録', priceUnit: '永久',
        discount: '25% OFF + 優先', features: ['Trade の全機能 +', '全商品 25% OFF', '専任アカウントマネージャー (1 対 1 WhatsApp)', '優先生産 (5 日 vs 7 日)', '四半期ごとに無料サンプル 5 個', '四半期ビジネスレビュー'],
        cta: 'Pro 申請', featured: true,
      },
      {
        icon: 'building', name: 'Enterprise', price: 'カスタム', priceUnit: '量議',
        discount: '30%+ OFF', features: ['Pro Trade の全機能 +', '30%+ OFF (量により交渉)', 'ホワイトラベル (クライアントに自社ブランド表示)', 'API 自動発注', 'カスタム用紙調達 (FSC / 特殊)', '専任生産ライン'],
        cta: '営業に相談', featured: false,
      },
    ],
    whoFor: '対象',
    whoForList: [
      'デザイン会社 (5 名以上, 米 / 英 / 欧 / 豪 / 日)',
      '印刷仲介 (クライアントに印刷再販)',
      'マーケティング代理店 (マルチチャネル)',
      'インハウスデザインチーム (企業調達)',
      'イベントプランナー (大量カスタム)',
      '不動産マーケティングチーム',
    ],
    formTitle: 'パートナー申請',
    formSubtitle: '7 営業日で審査. 登録費なし. いつでもキャンセル可能.',
    fields: {
      fullName: '氏名', email: '会社メール', company: '会社 / 機関名', website: 'ウェブサイト (任意)',
      useCase: 'クライアント向けに智印港をどのように利用しますか?', monthlyVolume: '推定月間ボリューム',
      volumeOptions: ['< 7 万円 / 月', '7 万円 - 28 万円 / 月', '28 万円 - 140 万円 / 月', '140 万円+ / 月'],
      submit: '申請を送信', submitting: '送信中...', success: '申請を受け付けました!', successSub: 'パートナー担当チームから 7 営業日以内にご返信します.',
    },
    faqTitle: 'よくある質問',
    faqs: [
      { q: 'パートナー登録に費用はかかりますか?', a: 'Trade と Pro Trade レベルは無料. Enterprise は年間ボリュームコミットメントに基づくカスタム価格.' },
      { q: '審査にはどのくらいかかりますか?', a: '通常 5-7 営業日. サービス基準との整合性を確認するため審査します.' },
      { q: 'ホワイトラベルはできますか?', a: 'Enterprise レベルのみ対応. Trade と Pro Trade は智印港ブランド.' },
      { q: 'NET-30 請求とは?', a: 'Trade メンバーは月次 NET-30 請求を申請可能 (請求書発行後 30 日以内支払い). 最初の 3 件の成功した注文後から利用可.' },
      { q: '専任アカウントマネージャーは?', a: 'Pro Trade と Enterprise は専任 AM を割り当て. 営業時間 (UTC+8) 中 WhatsApp で 1 対 1 サポート.' },
      { q: '割引は自分のプロジェクトに使えますか?', a: 'Trade 割引はクライアントプロジェクトのみ. 個人利用は通常価格で.' },
    ],
  },
};

const ICON_MAP = {
  briefcase: Briefcase,
  users: Users,
  building: Building2,
  clock: Clock,
  award: Award,
};

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const copy = COPY[params.locale] || COPY['en'];
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `https://zprintpro.com/${params.locale}/trade-program/`,
      languages: {
        'zh-HK': `https://zprintpro.com/zh-hk/trade-program/`,
        'en': `https://zprintpro.com/en/trade-program/`,
        'ja': `https://zprintpro.com/ja/trade-program/`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `https://zprintpro.com/${params.locale}/trade-program/`,
      type: 'website',
    },
  };
}

export default function TradeProgramPage({ params }: { params: { locale: Locale } }) {
  const copy = COPY[params.locale] || COPY['en'];
  const businessJsonLd = generateBusinessJsonLd(params.locale);

  return (
    <>
      <JsonLd data={businessJsonLd} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#2873F5] via-blue-600 to-emerald-500 text-white py-12 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Briefcase className="w-4 h-4" />
              {params.locale === 'zh-hk' ? 'B2B 加盟計劃' : params.locale === 'ja' ? 'B2B パートナー' : 'B2B Trade Program'}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              {copy.h1}
            </h1>
            <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {copy.subtitle}
            </p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-white text-[#2873F5] hover:bg-slate-50 font-bold py-3 px-7 rounded-xl mt-6 transition-colors shadow-lg"
            >
              {params.locale === 'zh-hk' ? '立即申請' : params.locale === 'ja' ? '今すぐ申請' : 'Apply Now'}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* Who is this for */}
        <section className="py-10 md:py-16 bg-slate-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
              {copy.whoFor}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {copy.whoForList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 Tiers */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.tiers.map((tier, i) => {
                const Icon = ICON_MAP[tier.icon as keyof typeof ICON_MAP];
                return (
                  <div
                    key={i}
                    className={`relative rounded-2xl border-2 p-6 md:p-8 ${
                      tier.featured
                        ? 'border-[#2873F5] shadow-xl scale-100 md:scale-105 bg-gradient-to-br from-blue-50 to-white'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    {tier.featured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2873F5] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                        {params.locale === 'zh-hk' ? '最受歡迎' : params.locale === 'ja' ? '一番人気' : 'Most Popular'}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        tier.featured ? 'bg-[#2873F5] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                    </div>

                    <div className="mb-4">
                      <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                        {tier.price}
                      </p>
                      <p className="text-sm text-slate-500">{tier.priceUnit}</p>
                    </div>

                    <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full mb-5">
                      {tier.discount}
                    </div>

                    <ul className="space-y-2 mb-6">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#apply"
                      className={`block text-center font-bold py-3 px-4 rounded-xl transition-colors ${
                        tier.featured
                          ? 'bg-[#2873F5] hover:bg-[#1E5BD6] text-white shadow-md'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                      }`}
                    >
                      {tier.cta}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Apply form */}
        <section id="apply" className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {copy.formTitle}
              </h2>
              <p className="text-sm md:text-base text-slate-600">{copy.formSubtitle}</p>
            </div>

            <TradeProgramForm copy={copy.fields} locale={params.locale} />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
              {copy.faqTitle}
            </h2>
            <div className="space-y-3">
              {copy.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-900 pr-3">{faq.q}</span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <TrustBadges locale={params.locale} compact />
      </main>
    </>
  );
}
