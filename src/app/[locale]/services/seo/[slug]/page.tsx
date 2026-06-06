/**
 * /[locale]/services/seo/[slug]
 * 5 个 SEO 专题页（食品包装/纸袋/宣传单/餐牌/利是封）
 * 数据来自 lib/seo-keywords.ts
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale, siteConfig } from '@/lib/seo';
import { SEO_KEYWORDS, getSeoKeyword } from '@/lib/seo-keywords';
import { CompareTable } from '@/components/geo/CompareTable';
import { HowToGuide } from '@/components/geo/HowToGuide';
import { RelatedSearchQueries } from '@/components/seo/RelatedSearchQueries';
import { generateWhatsAppLink, getWhatsAppLinkProps } from '@/lib/whatsapp';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';

const FAQ: Record<Locale, Array<{ q: string; a: string }>> = {
  'zh-hk': [
    { q: '最少起訂量是多少？', a: '不同產品起訂量不同：食品包裝 500 個、紙袋 200 個、宣傳單 500 張、餐牌 50 本、利是封 300 個。可協商小批量試產。' },
    { q: '交貨週期需要多長？', a: '標準 3-7 個工作天，急件可當天完成（+急件費）。' },
    { q: '設計文件有什麼要求？', a: '支持 PDF、AI、PSD、PNG、JPG（最大 50MB）。請預留 3mm 出血位，使用 CMYK 色彩模式。' },
    { q: '可以免費打樣嗎？', a: '是的，下單前提供免費數碼打樣確認色彩和內容。' },
  ],
  en: [
    { q: 'What is the minimum order quantity?', a: 'Varies by product: food packaging 500, paper bags 200, flyers 500, menus 50, lai see 300. Small batch trial runs negotiable.' },
    { q: 'How long is the delivery time?', a: 'Standard 3-7 business days. Same-day rush available (with surcharge).' },
    { q: 'What are the design file requirements?', a: 'PDF, AI, PSD, PNG, JPG (up to 50MB). 3mm bleed, CMYK color mode.' },
    { q: 'Can I get a free proof?', a: 'Yes, we provide a free digital proof before production.' },
  ],
  ja: [
    { q: '最小注文数量は？', a: '製品により異なる：食品パッケージ 500、紙袋 200、チラシ 500、メニュー 50、ポチ袋 300。小ロット試作も相談可。' },
    { q: '納期はどのくらい？', a: '通常 3-7 営業日。当日特急対応可能（追加料金）。' },
    { q: 'デザインデータの要件は？', a: 'PDF、AI、PSD、PNG、JPG（最大 50MB）。3mm 塗り足し、CMYK モード。' },
    { q: '無料サンプルはありますか？', a: 'はい、本生産前に無料デジタル校正を提供。' },
  ],
};

const I18N_CTA: Record<Locale, { cta: string; faqTitle: string; ctaTitle: string; ctaSub: string }> = {
  'zh-hk': {
    cta: '立即獲取報價',
    faqTitle: '常見問題',
    ctaTitle: '需要更多資訊？',
    ctaSub: 'WhatsApp 我們，1 分鐘回覆',
  },
  en: {
    cta: 'Get a Free Quote',
    faqTitle: 'FAQ',
    ctaTitle: 'Need more info?',
    ctaSub: 'WhatsApp us, 1-minute reply',
  },
  ja: {
    cta: '無料見積もりを取得',
    faqTitle: 'よくある質問',
    ctaTitle: '詳細が必要ですか？',
    ctaSub: 'WhatsApp で1分返信',
  },
};

export function generateStaticParams() {
  return SEO_KEYWORDS.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const data = getSeoKeyword(params.slug);
  if (!data) return {};
  return {
    title: data.title[locale],
    description: data.description[locale],
    alternates: {
      canonical: `${siteConfig.url}/${locale}/services/seo/${data.slug}/`,
      languages: {
        'zh-HK': `${siteConfig.url}/services/seo/${data.slug}/`,
        'en': `${siteConfig.url}/en/services/seo/${data.slug}/`,
        'ja': `${siteConfig.url}/ja/services/seo/${data.slug}/`,
        'x-default': `${siteConfig.url}/zh-hk/services/seo/${data.slug}/`,
      },
    },
  };
}

export default function SeoKeywordPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const data = getSeoKeyword(params.slug);
  if (!data) notFound();
  const cta = I18N_CTA[locale] || I18N_CTA.en;
  const faqs = FAQ[locale] || FAQ.en;

  // FAQPage JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href={`/${locale}/`} className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/services/`} className="hover:text-blue-600">Services</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{data.h1[locale]}</span>
        </nav>

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{data.h1[locale]}</h1>
        <p className="text-base md:text-lg text-slate-600 mb-8 max-w-3xl">{data.intro[locale]}</p>

        {/* CTA 按钮组 */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href={`/${locale}/contact/?service=${data.slug}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {cta.cta} <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            {...getWhatsAppLinkProps(locale, { source: `seo-${data.slug}` })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp {cta.ctaSub}
          </a>
        </div>

        {/* Body — 7 行详细要点 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {locale === 'zh-hk' ? '服務詳情' : locale === 'en' ? 'Service Details' : 'サービス詳細'}
          </h2>
          <ul className="space-y-3 bg-slate-50 rounded-xl p-6">
            {data.body[locale]?.map((line, i) => (
              <li key={i} className="flex items-start gap-2.5 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Outro */}
        <p className="text-slate-600 mb-12 leading-relaxed border-l-4 border-blue-500 pl-4 py-1 bg-blue-50/50 rounded-r">
          {data.outro[locale]}
        </p>

        {/* GEO: Compare Table */}
        <section className="mb-12">
          <CompareTable locale={locale} />
        </section>

        {/* GEO: How To */}
        <section className="mb-12">
          <HowToGuide locale={locale} />
        </section>

        {/* P1: GSC top 5 关键词长尾扩展（基于真实搜索数据）*/}
        <RelatedSearchQueries slug={data.slug} locale={locale} />

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{cta.faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{cta.ctaTitle}</h2>
          <p className="text-blue-100 mb-6">{cta.ctaSub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/${locale}/contact/?service=${data.slug}`}
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-slate-100 font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {cta.cta} <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              {...getWhatsAppLinkProps(locale, { source: `seo-${data.slug}-bottom` })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </section>

        {/* 内部链接（其他 4 个 SEO 页） */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {locale === 'zh-hk' ? '相關服務' : locale === 'en' ? 'Related Services' : '関連サービス'}
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SEO_KEYWORDS.filter((k) => k.slug !== data.slug).map((k) => (
              <li key={k.slug}>
                <Link
                  href={`/${locale}/services/seo/${k.slug}/`}
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline p-2 rounded hover:bg-blue-50 transition-colors"
                >
                  {k.h1[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
