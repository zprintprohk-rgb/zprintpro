import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: { locale: string };
}

const LOCALES = ['zh-hk', 'en', 'ja'] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const META = {
  'zh-hk': {
    title: '付款方式 · 銀行電匯 / 微信 / 支付寶 / PayPal / 跨境匯款 | ZprintPro 智印雲',
    description:
      '智印雲 ZprintPro 提供 5 大付款通道：銀行電匯 (DBS HK)、微信、支付寶、PayPal (跨境卡支付)、支付寶閃速收款 (跨境匯款)。30 秒 AI 報價後可選任一通道付款，72 小時全球交付。',
    canonical: 'https://zprintpro.com/payment-methods/',
  },
  en: {
    title: 'Payment Methods · Bank Wire / WeChat Pay / Alipay / PayPal / Flash Collect | ZprintPro',
    description:
      'ZprintPro accepts 5 payment channels: Bank Wire (DBS HK), WeChat Pay, Alipay, PayPal (cross-border card payment), and Alipay Flash Collect (cross-border remittance). Pick any channel after your 30s instant quote; 72h global delivery.',
    canonical: 'https://zprintpro.com/en/payment-methods/',
  },
  ja: {
    title:
      '支払い方法 · 銀行振込 / WeChat Pay / Alipay / PayPal / クロスボーダー送金 | ZprintPro',
    description:
      'ZprintPro は 5 つの支払い方法をご提供：銀行振込（DBS HK）、WeChat Pay、Alipay、PayPal（クロスボーダーカード）、フラッシュ送金（クロスボーダー送金）。30 秒見積もり後いずれかの方法で決済、72 時間グローバル配送。',
    canonical: 'https://zprintpro.com/ja/payment-methods/',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = META[params.locale as keyof typeof META] || META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
  };
}

type LocaleKey = 'zh-hk' | 'en' | 'ja';

export default function PaymentMethodsPage({ params }: Props) {
  const locale = (params.locale as LocaleKey) || 'en';
  const section = SECTIONS[locale];
  const localePrefix = `/${locale}`;

  // 6 张通道卡片（命名片段，按 locale 排序渲染）
  const channelCards: Record<string, React.ReactNode> = {
    bank: (
      <ChannelCard
        key="bank"
        locale={locale}
        icon={
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2zm4 10v2m6-2v2" />
          </svg>
        }
        name={section.bank.name}
        tag={section.bank.tag}
        fee={section.bank.fee}
        speed={section.bank.speed}
        bestFor={section.bank.bestFor}
        bullets={section.bank.bullets}
        accountLabel={section.bankAccountLabel}
        account={{
          bank: section.bank.bankName,
          bankCode: section.bank.bankCode,
          branchCode: section.bank.branchCode,
          account: section.bank.accountNo,
          beneficiary: section.bank.beneficiary,
          swift: section.bank.swift,
          address: section.bank.bankAddress,
          city: section.bank.city,
          accountType: section.bank.accountType,
          intermediaryBank: section.bank.intermediaryBank,
        }}
        accent="bg-emerald-500/10 text-emerald-600"
      />
    ),
    wechat: (
      <ChannelCard
        key="wechat"
        locale={locale}
        icon={
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.5 4C5.36 4 2 6.91 2 10.5c0 2.05 1.13 3.87 2.9 5.07L4 18l2.86-1.43c.83.24 1.7.4 2.64.4.23 0 .47-.01.71-.03-.16-.49-.25-1.02-.25-1.57C10 12.34 12.69 10 16.5 10c.5 0 .99.03 1.46.1C17.62 6.61 13.94 4 9.5 4zm-2 4a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2zM16.5 11C13.46 11 11 13.24 11 16c0 1.6.94 3 2.4 3.85L12.5 22l2.16-1.05c.6.18 1.23.3 1.84.3 3.04 0 5.5-2.24 5.5-5s-2.46-5-5.5-5zm-1.5 3a.75.75 0 110 1.5.75.75 0 010-1.5zm3 0a.75.75 0 110 1.5.75.75 0 010-1.5z" />
          </svg>
        }
        name={section.wechat.name}
        tag={section.wechat.tag}
        fee={section.wechat.fee}
        speed={section.wechat.speed}
        bestFor={section.wechat.bestFor}
        bullets={section.wechat.bullets}
        qrSrc="/images/payment-wechat.webp"
        qrLabel={section.wechat.qrLabel}
        qrShowLabel={section.qrShowLabel}
        accent="bg-green-500/10 text-green-600"
      />
    ),
    alipay: (
      <ChannelCard
        key="alipay"
        locale={locale}
        icon={
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zm2 5v2h2V9H7zm4 0v2h2V9h-2zm4 0v2h2V9h-2zM6 12v3h12v-3H6zm2 5l1 2h2l-1-2H8zm4 0l1 2h2l-1-2h-2z" />
          </svg>
        }
        name={section.alipay.name}
        tag={section.alipay.tag}
        fee={section.alipay.fee}
        speed={section.alipay.speed}
        bestFor={section.alipay.bestFor}
        bullets={section.alipay.bullets}
        qrSrc="/images/payment-alipay.webp"
        qrLabel={section.alipay.qrLabel}
        qrShowLabel={section.qrShowLabel}
        accent="bg-blue-500/10 text-blue-600"
      />
    ),
    paypal: (
      <ChannelCard
        key="paypal"
        locale={locale}
        icon={
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337l1.244-7.727H3.548L6.95 2.31h8.56c2.348 0 4.057.792 4.93 2.293.872 1.5.872 3.486-.21 6.066-.768 1.84-1.926 3.314-3.378 4.337C15.578 15.93 13.945 16.5 12 16.5h-2.2l-.732 4.837zM12.067 8.36c1.213 0 2.115-.27 2.706-.81.59-.54.97-1.382 1.143-2.527.157-1.027.066-1.764-.275-2.21-.34-.448-.93-.671-1.768-.671H9.07l-.65 4.218h3.647z" />
          </svg>
        }
        name={section.paypal.name}
        tag={section.paypal.tag}
        fee={section.paypal.fee}
        speed={section.paypal.speed}
        bestFor={section.paypal.bestFor}
        bullets={section.paypal.bullets}
        ctaHref="mailto:zprintpro@outlook.com?subject=PayPal%20Payment%20Inquiry"
        ctaLabel={section.paypal.ctaLabel}
        accent="bg-sky-500/10 text-sky-600"
      />
    ),
    flash: (
      <ChannelCard
        key="flash"
        locale={locale}
        icon={
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h11M9 21l-6-11 6-7m12 18l-6-11 6-7m-6 7h6" />
          </svg>
        }
        name={section.flash.name}
        tag={section.flash.tag}
        fee={section.flash.fee}
        speed={section.flash.speed}
        bestFor={section.flash.bestFor}
        bullets={section.flash.bullets}
        qrSrc={locale === 'zh-hk' ? '/images/payment/shansu-collect-zh-hk.png' : '/images/payment/shansu-collect-en.png'}
        qrLabel={section.flash.qrLabel}
        qrShowLabel={section.qrShowLabel}
        qrSize="flash"
        providers={['Hanpass', 'PandaRemit', 'WireBarley', 'GmoneyTrans', 'Debunk', 'PayForex', 'koala transfer', 'Sendly', 'GME']}
        accent="bg-indigo-500/10 text-indigo-600"
      />
    ),
    invoice: (
      <div key="invoice" className="rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="font-bold text-base text-[#333333] mb-2">{section.invoice.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{section.invoice.desc}</p>
        <Link
          href={`${localePrefix}/contact/`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F87314] hover:underline"
        >
          {section.invoice.cta}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    ),
  };

  // 按 locale 的频道排序（zh-hk 保持原顺序；en/ja 以 PayPal 优先）
  const CHANNEL_ORDER: Record<LocaleKey, string[]> = {
    'zh-hk': ['bank', 'wechat', 'alipay', 'paypal', 'flash', 'invoice'],
    en: ['paypal', 'bank', 'flash', 'invoice', 'alipay', 'wechat'],
    ja: ['paypal', 'bank', 'invoice', 'flash', 'alipay', 'wechat'],
  };

  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero */}
      <section className="bg-[#1a1a2e] text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-4">
            <span>💳</span>
            <span>{section.heroBadge}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{section.h1}</h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {section.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-gray-300">
            <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
              ⚡ {section.badge1}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
              🌍 {section.badge2}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
              🔒 {section.badge3}
            </span>
          </div>
        </div>
      </section>

      {/* Online Channels */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#F87314] uppercase">
            {section.onlineLabel}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mt-2">{section.onlineTitle}</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">{section.onlineDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHANNEL_ORDER[locale].map((key) => channelCards[key])}
        </div>
      </section>

      {/* How to Choose */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold tracking-widest text-[#F87314] uppercase">
                {section.howLabel}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mt-2">{section.howTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.steps.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F87314]/10 text-[#F87314] font-bold text-lg flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#333333] mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-widest text-[#F87314] uppercase">
            FAQ
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mt-2">{section.faqTitle}</h2>
        </div>
        <div className="space-y-3">
          {section.faqs.map((qa, i) => (
            <details
              key={i}
              className="group rounded-2xl bg-white border border-gray-100 px-5 py-4 open:shadow-md transition-shadow"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-semibold text-[#333333]">{qa.q}</span>
                <span className="text-[#F87314] group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">{qa.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] text-white p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{section.ctaTitle}</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{section.ctaDesc}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`https://wa.me/8619880851334`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1FB855] text-white rounded-full font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.5 2 2 6.5 2 12c0 1.78.45 3.45 1.26 4.9L2 22l5.25-1.25C8.7 21.55 10.32 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
              WhatsApp {section.ctaWa}
            </a>
            <Link
              href={`${localePrefix}/quote/`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F87314] hover:bg-[#E56508] text-white rounded-full font-semibold transition-colors"
            >
              {section.ctaQuote}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ChannelCard(props: {
  locale: string;
  icon: React.ReactNode;
  name: string;
  tag: string;
  fee: string;
  speed: string;
  bestFor: string;
  bullets: string[];
  accent: string;
  qrSrc?: string;
  qrLabel?: string;
  qrShowLabel?: string;
  qrSize?: 'default' | 'flash';
  providers?: string[];
  accountLabel?: string;
  account?: {
    bank: string;
    account: string;
    beneficiary: string;
    swift: string;
    address: string;
    bankCode?: string;
    branchCode?: string;
    city?: string;
    accountType?: string;
    intermediaryBank?: { bankName: string; swift: string; note?: string };
  };
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const {
    icon,
    name,
    tag,
    fee,
    speed,
    bestFor,
    bullets,
    accent,
    qrSrc,
    qrLabel,
    qrShowLabel,
    qrSize,
    providers,
    accountLabel,
    account,
    ctaHref,
    ctaLabel,
  } = props;

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${accent}`}>{icon}</div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{tag}</span>
      </div>
      <h3 className="font-bold text-xl text-[#333333] mb-1">{name}</h3>
      <p className="text-xs text-gray-500 mb-4">{bestFor}</p>

      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="bg-gray-50 rounded-lg p-2.5">
          <div className="text-gray-400 mb-0.5">💰 Fee</div>
          <div className="font-semibold text-[#333333]">{fee}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5">
          <div className="text-gray-400 mb-0.5">⚡ Speed</div>
          <div className="font-semibold text-[#333333]">{speed}</div>
        </div>
      </div>

      <ul className="space-y-1.5 text-sm text-gray-600 mb-4 flex-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {account && accountLabel && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1.5 mb-3">
          <div className="font-semibold text-[#333333] mb-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2zm4 10v2m6-2v2" /></svg>
            {accountLabel}
          </div>
          <div className="grid grid-cols-[88px_1fr] gap-x-2 gap-y-1">
            <span className="text-gray-500">Bank</span>
            <span className="font-mono font-semibold text-[#333333]">{account.bank}</span>
            <span className="text-gray-500">Bank Code</span>
            <span className="font-mono text-[#333333]">{account.bankCode || '016'}</span>
            <span className="text-gray-500">Branch</span>
            <span className="font-mono text-[#333333]">{account.branchCode || '478'}</span>
            <span className="text-gray-500">Account</span>
            <span className="font-mono font-semibold text-[#333333] break-all">{account.account}</span>
            <span className="text-gray-500">Beneficiary</span>
            <span className="font-mono text-[#333333] break-all">{account.beneficiary}</span>
            <span className="text-gray-500">SWIFT</span>
            <span className="font-mono font-semibold text-[#333333]">{account.swift}</span>
          </div>
          {account.intermediaryBank && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2 space-y-0.5">
              <div className="font-semibold text-amber-800 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                USD Cross-border Intermediary
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-x-2 gap-y-0.5 text-[11px]">
                <span className="text-amber-700">Bank</span>
                <span className="font-mono text-amber-900">{account.intermediaryBank.bankName}</span>
                <span className="text-amber-700">SWIFT</span>
                <span className="font-mono font-semibold text-amber-900">{account.intermediaryBank.swift}</span>
              </div>
              {account.intermediaryBank.note && (
                <div className="text-[10px] text-amber-700 mt-1">{account.intermediaryBank.note}</div>
              )}
            </div>
          )}
          <div className="text-gray-500 pt-1 border-t border-slate-200 mt-2 text-[11px] leading-relaxed">{account.address}</div>
        </div>
      )}

      {qrSrc && qrLabel && (
        <details className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden group mt-auto border border-gray-200/70">
          <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-white/60 transition-colors select-none">
            <span>{qrShowLabel || 'Click to show QR'}</span>
            <svg
              className="w-4 h-4 text-[#F87314] group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="flex flex-col items-center gap-2.5 p-4 border-t border-gray-200 bg-white/60">
            <div
              className={`relative ${
                qrSize === 'flash' ? 'w-[179px] h-[179px]' : 'w-48 h-48'
              } bg-white border-2 border-slate-200 rounded-xl overflow-hidden flex items-center justify-center shadow-md`}
            >
              <img
                src={qrSrc}
                alt={qrLabel}
                width={qrSize === 'flash' ? 179 : 192}
                height={qrSize === 'flash' ? 179 : 192}
                className="object-contain w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="text-center w-full space-y-1.5">
              <div
                className={`font-semibold text-gray-700 ${
                  qrSize === 'flash' ? 'text-[13px]' : 'text-xs'
                }`}
              >
                {qrLabel}
              </div>
              {providers && (
                <div className="flex flex-wrap gap-1 text-[10px] text-gray-600 justify-center">
                  {providers.map((p) => (
                    <span key={p} className="bg-white border border-gray-200 px-1.5 py-0.5 rounded">
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </details>
      )}

      {ctaHref && ctaLabel && (
        <a
          href={ctaHref}
          target={ctaHref.startsWith('http') ? '_blank' : undefined}
          rel={ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#F87314] hover:bg-[#E56508] text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  );
}

// =====================================================================
// Copy (zh-hk / en / ja)
// =====================================================================
const SECTIONS = {
  'zh-hk': {
    heroBadge: '5 大通道 · 全球適用',
    h1: '付款方式一覽',
    subtitle:
      '智印雲 ZprintPro 提供 5 種付款通道，覆蓋中國大陸 / 香港本地 / 跨境（歐美、日本、澳洲）三大客群。選擇最適合你的方式，付款後 72 小時內全球交付。',
    badge1: '30 秒 AI 報價',
    badge2: '全球 72 小時交付',
    badge3: '100% 合規收款',
    onlineLabel: '線上支付',
    onlineTitle: '5 大常用付款通道',
    onlineDesc: '從下單到收錢再到收貨，全程在線透明，無需面對面。',
    qrShowLabel: '點擊顯示收款碼',
    bankAccountLabel: '帳戶資料 (HKD / USD 兩種)',
    bank: {
      name: '銀行電匯 (DBS HK)',
      tag: 'B2B 大額 / 公司轉帳',
      fee: 'HK$30 /筆 起(汇入方)',
      speed: 'T+1 工作天',
      bestFor: '香港 / 跨境 / B2B 大單',
      bullets: [
        '支援 HKD / USD 兩種收款帳戶',
        'USD 跨境付款建議經代理行 (JP Morgan Chase Bank)',
        '預付定金 40% 即可進入生產，餘款發貨前結清',
        '適合金額 HK$5,000 以上的訂單',
        '提供正式商業發票及合同，匯率以匯出銀行當日牌價為準',
      ],
      bankName: 'DBS Bank (Hong Kong) Limited',
      bankCode: '016',
      branchCode: '478',
      accountNo: '016-478-7949835442',
      rawAccount: '7949835442',
      beneficiary: 'SHEN ZHEN SHI CAI LONG YIN SHUA BAO ZHUANG YOU XIAN GONG SI',
      beneficiaryCn: '深圳市彩龍印刷包裝有限公司',
      swift: 'DHBKHKHH',
      bankAddress: 'Ground Floor, The Center, 99 Queen\'s Road Central, Central, HK',
      city: 'Hong Kong SAR',
      accountType: 'Current',
      createdDate: '2026-06-24',
      intermediaryBank: {
        bankName: 'JP Morgan Chase Bank',
        swift: 'CHASUS33',
        note: 'USD 跨境電匯必填',
      },
    },
    wechat: {
      name: '微信支付 (WeChat Pay)',
      tag: '中國大陸客',
      fee: '0.6% - 1%',
      speed: '即時',
      bestFor: '中國大陸個人 / 企業',
      bullets: [
        '微信掃一掃即可支付',
        '支援綁定信用卡 / 銀行卡',
        '即時到賬，訂單立即進入生產',
        '適合中小額訂單（HK$5,000 以下）',
      ],
      qrLabel: '微信掃碼聯繫',
    },
    alipay: {
      name: '支付寶 (Alipay)',
      tag: '中國大陸 / AlipayHK',
      fee: '0.6% - 1.2%',
      speed: '即時',
      bestFor: '中國大陸 / 香港個人',
      bullets: [
        '內地用戶：支付寶掃碼',
        '香港用戶：AlipayHK 掃碼',
        '即時到賬，訂單自動觸發生產',
        'HK$ 自動按匯率換算',
      ],
      qrLabel: '支付寶 / AlipayHK 掃碼',
    },
    paypal: {
      name: 'PayPal (卡支付)',
      tag: '跨境 (歐美 / 日本 / 澳洲)',
      fee: '4.4% + US$0.3 /筆',
      speed: '即時',
      bestFor: '海外客戶 / Visa / Mastercard',
      bullets: [
        '可用 Visa / Mastercard / Amex',
        '適合海外華人 / 留學生 / 採購商',
        '註：費用較高，建議大額訂單使用',
        '提供 PayPal 發票連結（客服一對一發）',
      ],
      ctaLabel: '聯繫索取 PayPal 收款連結',
    },
    flash: {
      name: '支付寶閃速收款',
      tag: '跨境匯款',
      fee: '由匯款 APP 決定',
      speed: '即時 - 24 小時',
      bestFor: '海外華人 / 留學生 / 港人匯款',
      bullets: [
        '由 唐運提 (智印雲法人) 發起的官方收款碼',
        '海外客戶用 APP 掃碼匯款到國內帳戶',
        '適合 B2B 大額訂單 / 服務費用',
        '注意：這不是訂單支付通道，是已確定要付款後的便捷收款',
      ],
      qrLabel: '掃碼發起跨境匯款',
    },
    invoice: {
      name: '30 日賬期發票',
      desc: '企業客戶可申請 NET-30 賬期，發票開立後 30 天內結算。',
      cta: '聯繫申請 NET-30 賬期',
    },
    howLabel: '付款流程',
    howTitle: '從下單到收貨 3 步搞定',
    steps: [
      { title: '30 秒 AI 報價', desc: '提交尺寸、材質、數量、需求，AI 即時生成含稅報價單。' },
      { title: '選擇付款通道', desc: '於結帳頁選擇適合你的通道，掃碼/匯款/PayPal 任一完成付款。' },
      { title: '進入生產 → 全球 72 小時交付', desc: '款項確認後立即排版生產，DHL/FedEx 直達全球。' },
    ],
    faqTitle: '常見問題',
    faqs: [
      { q: '最低訂單金額是多少？', a: '無最低金額限制，HK$100 起即可下單，量大從優。' },
      { q: '跨境匯款要多久到賬？', a: '支付寶閃速收款：即時 - 24 小時；銀行電匯：T+1 工作天。' },
      { q: '可不可以分批付款？', a: '可以。預付 40% 即可進入生產，餘款發貨前結清。' },
      { q: '有企業月結賬期嗎？', a: '有。企業客戶可申請 NET-30 賬期，需提交商業登記及最近 3 個月銀行流水。' },
      { q: 'USD 跨境電匯要注意什麼？', a: '必須填寫代理行 (Intermediary Bank)：JP Morgan Chase Bank，SWIFT: CHASUS33。否則 USD 匯款會被退回。' },
      { q: 'PayPal 付款安全嗎？', a: '安全。PayPal 是全球最大第三方支付商，受 FCA (英國) / FinCEN (美國) 監管。' },
    ],
    ctaTitle: '還有付款問題？',
    ctaDesc: 'WhatsApp 客服 24 小時在線，為你推薦最划算的付款方式。',
    ctaWa: '一對一結算',
    ctaQuote: '先去 AI 報價',
  },
  en: {
    heroBadge: '5 Channels · Worldwide',
    h1: 'Payment Methods',
    subtitle:
      'ZprintPro accepts 5 payment channels covering Mainland China, Hong Kong, and cross-border clients (US/UK/AU/JP/EU). Pick the one that fits — 72h global delivery after payment.',
    badge1: '30s AI Quote',
    badge2: '72h Global Delivery',
    badge3: '100% Compliant Receipt',
    onlineLabel: 'Online Channels',
    onlineTitle: '5 Standard Payment Methods',
    onlineDesc: 'End-to-end online: order, pay, produce, deliver — no in-person meeting required.',
    qrShowLabel: 'Click to show QR code',
    bankAccountLabel: 'Account Details (HKD / USD)',
    bank: {
      name: 'Bank Wire (DBS HK)',
      tag: 'B2B / Corporate',
      fee: 'HK$30 /wire (receiver)',
      speed: 'T+1 business day',
      bestFor: 'HK / Cross-border B2B',
      bullets: [
        'Two collection accounts: HKD & USD',
        'USD cross-border wires must route via intermediary (JP Morgan Chase Bank)',
        '40% deposit to start production; balance due before shipment',
        'Best for orders HK$5,000+',
        'Commercial invoice + sales contract provided; FX rate = sender bank\'s day quote',
      ],
      bankName: 'DBS Bank (Hong Kong) Limited',
      bankCode: '016',
      branchCode: '478',
      accountNo: '016-478-7949835442',
      rawAccount: '7949835442',
      beneficiary: 'SHEN ZHEN SHI CAI LONG YIN SHUA BAO ZHUANG YOU XIAN GONG SI',
      beneficiaryCn: '深圳市彩龍印刷包裝有限公司',
      swift: 'DHBKHKHH',
      bankAddress: 'Ground Floor, The Center, 99 Queen\'s Road Central, Central, HK',
      city: 'Hong Kong SAR',
      accountType: 'Current',
      createdDate: '2026-06-24',
      intermediaryBank: {
        bankName: 'JP Morgan Chase Bank',
        swift: 'CHASUS33',
        note: 'Required for USD cross-border wires',
      },
    },
    wechat: {
      name: 'WeChat Pay',
      tag: 'Mainland China',
      fee: '0.6% - 1%',
      speed: 'Instant',
      bestFor: 'Mainland Chinese clients',
      bullets: [
        'Scan QR with WeChat to pay',
        'Bind credit / debit card or wallet balance',
        'Real-time: order enters production instantly',
        'Best for orders under HK$5,000',
      ],
      qrLabel: 'Scan with WeChat',
    },
    alipay: {
      name: 'Alipay (Mainland) + AlipayHK',
      tag: 'Mainland / HK',
      fee: '0.6% - 1.2%',
      speed: 'Instant',
      bestFor: 'Mainland / HK individuals',
      bullets: [
        'Mainland users: Alipay scan',
        'HK users: AlipayHK scan',
        'Real-time: order auto-triggers production',
        'HKD auto-converted at FX',
      ],
      qrLabel: 'Scan with Alipay / AlipayHK',
    },
    paypal: {
      name: 'PayPal (Card Payment)',
      tag: 'Cross-border (US/UK/AU/JP)',
      fee: '4.4% + US$0.3 /tx',
      speed: 'Instant',
      bestFor: 'Overseas / Visa / Mastercard',
      bullets: [
        'Accepts Visa / Mastercard / Amex',
        'Best for overseas Chinese / students / buyers',
        'Note: fees are high — better for large orders',
        'PayPal invoice link issued on request',
      ],
      ctaLabel: 'Request PayPal Invoice Link',
    },
    flash: {
      name: 'Alipay Flash Collect',
      tag: 'Cross-border Remittance',
      fee: 'Set by remittance app',
      speed: 'Instant - 24 hours',
      bestFor: 'Overseas Chinese / students',
      bullets: [
        'Official QR issued by 唐运提 (Mr. Tang, founder)',
        'Overseas clients scan via remittance apps to pay',
        'Best for B2B large orders / service fees',
        'Note: not an order-payment channel — post-decision convenience',
      ],
      qrLabel: 'Scan to remit cross-border',
    },
    invoice: {
      name: 'NET-30 Invoicing',
      desc: 'Corporate clients can apply for NET-30 terms — invoice-due 30 days after issue.',
      cta: 'Apply for NET-30 Terms',
    },
    howLabel: 'How It Works',
    howTitle: 'From Order to Delivery in 3 Steps',
    steps: [
      { title: '30s AI Quote', desc: 'Submit specs, quantity, and needs — AI generates tax-inclusive quote instantly.' },
      { title: 'Choose Payment Channel', desc: 'Pick the channel that fits; scan / wire / PayPal — pay in minutes.' },
      { title: 'Produce & Global 72h Delivery', desc: 'Payment confirmed → production starts → DHL/FedEx ships worldwide.' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the minimum order value?', a: 'No minimum. Orders from HK$100 accepted. Volume discounts available.' },
      { q: 'How long does cross-border remittance take?', a: 'Alipay Flash Collect: instant - 24h. Bank wire: T+1 business day.' },
      { q: 'Can we pay in installments?', a: 'Yes. Pay 40% upfront to start production; balance before shipment.' },
      { q: 'Do you offer NET-30 corporate terms?', a: 'Yes. Apply with business registration + last 3 months bank statements.' },
      { q: 'Anything to note on USD cross-border wire?', a: 'You MUST fill the intermediary bank: JP Morgan Chase Bank, SWIFT: CHASUS33. Otherwise the USD wire will bounce back.' },
      { q: 'Is PayPal payment secure?', a: 'Yes. PayPal is regulated by FCA (UK) and FinCEN (US) — buyer protection enabled.' },
    ],
    ctaTitle: 'Still have questions?',
    ctaDesc: 'WhatsApp 24/7 — we will recommend the most cost-effective channel for you.',
    ctaWa: '1-on-1 settlement',
    ctaQuote: 'Get AI Quote',
  },
  ja: {
    heroBadge: '5 つの決済方法 · 全世界対応',
    h1: 'お支払い方法一覧',
    subtitle:
      'ZprintPro は中国本土・香港・クロスボーダー（米英豪日欧）の 5 つの決済方法をご提供。最適な方法をお選びいただければ、ご入金後 72 時間以内にグローバル配送いたします。',
    badge1: '30 秒 AI 見積もり',
    badge2: '72 時間グローバル配送',
    badge3: '100% コンプライアンス',
    onlineLabel: 'オンライン決済',
    onlineTitle: '5 つの主要決済方法',
    onlineDesc: '注文から入金、製造、配送までオンライン完結。対面不要。',
    qrShowLabel: 'QRコードを表示',
    bankAccountLabel: '口座情報（HKD / USD）',
    bank: {
      name: '銀行振込（DBS HK）',
      tag: 'B2B / 法人',
      fee: 'HK$30 /件 受取人負担',
      speed: 'T+1 営業日',
      bestFor: '日本からの海外送金 / B2B 法人取引',
      bullets: [
        'HKD / USD 2 つの受取口座あり',
        '日本の主要銀行・オンライン銀行からの海外送金に対応',
        'USD クロスボーダー送金は代理行（JP Morgan Chase Bank）経由必須',
        '前金 40% で生産開始、残額は出荷前にお支払い',
        'HK$5,000 以上の大口注文に最適',
        '商業請求書 + 契約書発行、為替レートは送金の即日レート',
      ],
      bankName: 'DBS Bank (Hong Kong) Limited',
      bankCode: '016',
      branchCode: '478',
      accountNo: '016-478-7949835442',
      rawAccount: '7949835442',
      beneficiary: 'SHEN ZHEN SHI CAI LONG YIN SHUA BAO ZHUANG YOU XIAN GONG SI',
      beneficiaryCn: '深圳市彩龍印刷包裝有限公司',
      swift: 'DHBKHKHH',
      bankAddress: 'Ground Floor, The Center, 99 Queen\'s Road Central, Central, HK',
      city: 'Hong Kong SAR',
      accountType: 'Current',
      createdDate: '2026-06-24',
      intermediaryBank: {
        bankName: 'JP Morgan Chase Bank',
        swift: 'CHASUS33',
        note: 'USD クロスボーダー送金に必須',
      },
    },
    wechat: {
      name: 'WeChat Pay',
      tag: '中国大陸',
      fee: '0.6% - 1%',
      speed: '即時',
      bestFor: '中国大陸のお客様',
      bullets: [
        'WeChat で QR をスキャン',
        'クレジットカード / デビットカード / 残高',
        '即時入金 — 注文はすぐ生産開始',
        'HK$5,000 未満の小口注文に最適',
      ],
      qrLabel: 'WeChat でスキャン',
    },
    alipay: {
      name: 'Alipay（中国本土）+ AlipayHK',
      tag: '中国大陸 / 香港',
      fee: '0.6% - 1.2%',
      speed: '即時',
      bestFor: '中国大陸 / 香港のお客様',
      bullets: [
        '中国本土ユーザー：Alipay でスキャン',
        '香港ユーザー：AlipayHK でスキャン',
        '即時入金 — 注文自動生産開始',
        'HK$ は自動為替換算',
      ],
      qrLabel: 'Alipay / AlipayHK でスキャン',
    },
    paypal: {
      name: 'PayPal（カード決済）',
      tag: 'クロスボーダー',
      fee: '4.4% + US$0.3 /件',
      speed: '即時',
      bestFor: '海外 / Visa / Mastercard',
      bullets: [
        'Visa / Mastercard / Amex 利用可',
        'PayPal アカウント不要 — カードのみで決済可能',
        '海外華人 / 留学生 / バイヤーに最適',
        '手数料：4.4% + US$0.3/件（カード決済手数料）',
        'PayPal 請求書リンク発行（個別対応）',
      ],
      ctaLabel: 'PayPal 請求書リンクを依頼',
    },
    flash: {
      name: 'フラッシュ送金（クロスボーダー送金）',
      tag: 'クロスボーダー送金',
      fee: '送金 APP により異なる',
      speed: '即時 - 24 時間',
      bestFor: '海外華人 / 留学生',
      bullets: [
        '唐运提（当社創業者）発起の公式 QR',
        '海外のお客様は送金アプリでスキャン',
        'B2B 大口注文 / サービス費用に最適',
        '注意：注文決済チャンネルではなく、送金専用',
      ],
      qrLabel: 'スキャンしてクロスボーダー送金',
    },
    invoice: {
      name: 'NET-30 請求書',
      desc: '法人のお客様は NET-30 条件適用可能 — 請求書発行後 30 日以内に決済。',
      cta: 'NET-30 条件を申請',
    },
    howLabel: 'お支払いフロー',
    howTitle: '注文から納品まで 3 ステップ',
    steps: [
      { title: '30 秒 AI 見積もり', desc: 'サイズ・素材・数量・要件を送信 → AI が即時税込見積もり作成。' },
      { title: '決済方法を選択', desc: 'お好みの方法でスキャン / 振込 / PayPal — 数分で完了。' },
      { title: '製造開始 → 72 時間グローバル配送', desc: '入金確認後すぐ製造、DHL/FedEx で世界中に発送。' },
    ],
    faqTitle: 'よくあるご質問',
    faqs: [
      { q: '最小注文金額は？', a: '最小なし。HK$100 から発注可能、量大割引あり。' },
      { q: 'クロスボーダー送金はどのくらいで着金？', a: 'フラッシュ送金：即時〜24 時間、銀行振込：T+1 営業日。' },
      { q: '分割払いはできますか？', a: 'はい。前金 40% で生産開始、残額は出荷前までにお支払い。' },
      { q: '法人掛け（NET-30）に対応していますか？', a: 'はい。商業登記と直近 3 ヶ月の銀行履歴をご提出ください。' },
      { q: 'USD クロスボーダー送金の注意点は？', a: '代理行（Intermediary Bank）の記入必須：JP Morgan Chase Bank、SWIFT: CHASUS33。記入がないと USD 送金は差し戻されます。' },
      { q: 'PayPal 決済は安全ですか？', a: 'はい。PayPal は FCA（英国）・FinCEN（米国）規制の決済サービス。' },
    ],
    ctaTitle: '決済について質問がありますか？',
    ctaDesc: 'WhatsApp 24 時間対応 — あなたに最適な決済方法をご提案します。',
    ctaWa: '個別相談',
    ctaQuote: 'AI 見積もりを取る',
  },
};
