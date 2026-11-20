import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WhatsAppCtaButton } from '@/components/WhatsAppCtaButton';

/**
 * 名片 · 咭片印刷 承接页 (2026-09-12 建, K3 解禁后选项 c)
 *
 * 目的: 抢回 GSC 实测需求 —— 「咭片印刷」99 展示 / 「咭片」99 / 「印咭片」88, 合计约 286 展示/月,
 *       0 点击, pos 31-39 (第 4 页)。来源: GSC数据/gsc-fresh-2026-09-03.json (calibration 2026-09-03)。
 * 红线遵守:
 *   - 不用 /category/business-card-printing/ (v22 301 源), 新走独立路径
 *   - 不动 middleware 301 映射 / 不动其余 4 款贺卡 SKU / 不动既有贺卡资产
 *   - 规格数字全部取自已上线真实字段 (400g / 700-810g 三合一 / 90×54mm / 100 张起 / DHL 2-4 天), 禁编造
 *   - 三语本地化按 §13.10 (禁机械翻译): zh-hk 香港场景 / en UK-US 场景 / ja 日本市场卖点
 *   - 内链仅指向已注册且线上 200 的路由 (§13.6)
 */

interface Props {
  params: { locale: string };
}

const T = {
  'zh-hk': {
    title: '名片印刷訂製 | 咭片 400g 厚卡・燙金・100張起 | 智印港',
    description:
      '香港名片／咭片印刷訂製：400g 超厚卡、700-810g 三合一裱貼、燙金／燙銀、局部UV、圓角，90×54mm 標準尺寸，100 張起印，免費打樣，順豐本地 + DHL 全球 2-4 天。地產代理、律師會計、設計事務所首選。',
    h1: '名片 · 咭片印刷訂製',
    subtitle: '400g 超厚卡至 700-810g 三合一裱貼 · 燙金／局部UV · 100 張起印',
    eyebrow: '名片印刷',
    crumb: '名片印刷',
    sections: [
      {
        h2: '為何選厚卡名片',
        body: '名片是專業服務的第一印象。400g 超厚銅版紙手感沉穩，可升級至 700-810g 三合一裱貼，邊緣挺直、不易捲曲，適合地產代理、律師、會計師與設計事務所等需要「拿得出手」的場合。',
      },
      {
        h2: '常用規格與工藝',
        body: '標準尺寸 90×54mm（兼容全球名片夾與卡套），方形 54×54mm 可選。四色柯式印刷 + ICC 色彩管理，品牌色批量一致；工藝可選啞膠／光膠覆膜、燙金／燙銀、局部UV、擊凸、圓角模切。',
      },
      {
        h2: '起訂量與交期',
        body: '100 張起印，小批量數碼可當日取，大量轉柯式更具成本優勢。免費刀模檢查與打樣；香港本地順豐當日，海外 DHL／FedEx 全球 2-4 天送達。',
      },
    ],
    faqs: [
      { q: '名片最厚可以做到多少克？', a: '標準為 400g 超厚銅版紙；如需更厚可選 700-810g 三合一裱貼檔，挺度與手感更接近高檔卡片，適合地產與律所等專業形象需求。' },
      { q: '可以做燙金或局部UV嗎？', a: '可以。燙金／燙銀、局部UV、擊凸與圓角模切均可搭配，常見組合為厚卡 + 燙金 + 局部UV。' },
      { q: '標準名片尺寸是多少？', a: '標準 90×54mm，兼容全球名片夾與卡套；另有 54×54mm 方形可選。' },
      { q: '最低訂量與交期？', a: '100 張起印。小批量數碼可當日取；柯式 5-7 個工作日。香港順豐當日送達，海外 DHL 2-4 天。' },
    ],
    cta: 'WhatsApp 即時報價',
    ctaText: '想要報價或看樣品？',
  },
  en: {
    title: 'Business Cards Printing | 400g Thick Card | ZprintPro',
    description:
      'Custom business cards printing: 400g ultra-thick cardstock up to 700-810g triple-layer lamination, foil stamping, spot UV, rounded corners. 90x54mm standard size, MOQ 100, free sample, DHL 2-4 day worldwide delivery from Asia factory. Trusted by estate agents and law firms.',
    h1: 'Custom Business Cards Printing',
    subtitle: '400g ultra-thick up to 700-810g triple-layer · foil stamping · spot UV · MOQ 100',
    eyebrow: 'Business Cards',
    crumb: 'Business Cards',
    sections: [
      {
        h2: 'Why thick business cards',
        body: 'A business card is the first impression for professional services. Our 400g ultra-thick coated cardstock feels substantial, and can be upgraded to 700-810g triple-layer lamination that stays flat and resists curling — ideal for estate agents, law firms, accountants and design studios.',
      },
      {
        h2: 'Standard specs and finishing',
        body: '90x54mm standard size (fits card holders and wallets worldwide), with 54x54mm square optional. 4-colour offset printing with ICC colour management keeps brand colours consistent across runs. Finishing: matte or gloss lamination, gold/silver foil stamping, spot UV, embossing, rounded-corner die-cutting.',
      },
      {
        h2: 'MOQ and lead time',
        body: 'MOQ 100 pieces. Small runs go digital with same-day pickup; larger runs switch to offset for better unit cost. Free die-line check and free sample. DHL / FedEx worldwide delivery in 2-4 days from our Asia factory.',
      },
    ],
    faqs: [
      { q: 'How thick can business cards be?', a: 'Standard is 400g ultra-thick coated cardstock. For a heavier feel we offer a 700-810g triple-layer lamination option — popular with estate agents and law firms.' },
      { q: 'Do you offer foil stamping or spot UV?', a: 'Yes. Gold/silver foil stamping, spot UV, embossing and rounded corners can be combined; the most common premium build is thick card with foil plus spot UV.' },
      { q: 'What is the standard business card size?', a: '90x54mm, which fits card holders and wallets worldwide. A 54x54mm square format is also available.' },
      { q: 'What is the minimum order and lead time?', a: 'MOQ 100 pieces. Small digital runs can be collected same day; offset takes 5-7 business days plus DHL 2-4 day worldwide shipping.' },
    ],
    cta: 'Chat on WhatsApp',
    ctaText: 'Need a quote or a sample?',
  },
  ja: {
    title: '名刺印刷 | 厚手400g・箔押し・100枚から | ZprintPro',
    description:
      '名刺印刷のカスタム製作：400g 超厚口から 700-810g 三層貼り合わせ、箔押し、スポットUV、角丸対応。90×54mm 標準サイズ、100枚から、無料サンプル、DHL 国際 2-4 日納品。不動産・法律事務所など法人名刺に最適。',
    h1: '名刺印刷・カスタム製作',
    subtitle: '400g 超厚口〜700-810g 三層貼り合わせ · 箔押し · スポットUV · 100枚から',
    eyebrow: '名刺印刷',
    crumb: '名刺印刷',
    sections: [
      {
        h2: '厚手名刺が選ばれる理由',
        body: '名刺はプロフェッショナルサービスの第一印象です。400g 超厚口コート紙は重厚感があり、700-810g 三層貼り合わせに変更すると反りにくく、不動産・法律事務所・会計事務所・デザイン事務所などに適しています。',
      },
      {
        h2: '標準仕様と加工',
        body: '標準サイズ 90×54mm（世界中の名刺入れに対応）、54×54mm のスクエアも選択可。4色オフセット印刷 + ICC カラーマネジメントでブランドカラーを安定再現。加工はマット／グロスラミネート、金銀箔押し、スポットUV、エンボス、角丸抜きに対応。',
      },
      {
        h2: '最小ロットと納期',
        body: '100枚から。小ロットはデジタルで即日対応、大量はオフセットで単価を抑えられます。無料の型チェックと無料サンプル付き。アジア工場から DHL／FedEx で世界 2-4 日納品。',
      },
    ],
    faqs: [
      { q: '名刺はどのくらいの厚さまで対応できますか？', a: '標準は 400g 超厚口コート紙です。より重厚な手触りをご希望の場合、700-810g 三層貼り合わせも対応しています。' },
      { q: '箔押しやスポットUVは可能ですか？', a: '可能です。金銀箔押し、スポットUV、エンボス、角丸を組み合わせられます。厚手 + 箔押し + スポットUV が最も一般的な高級仕様です。' },
      { q: '標準の名刺サイズは？', a: '90×54mm です。世界中の名刺入れに対応します。54×54mm のスクエアも選択できます。' },
      { q: '最小ロットと納期は？', a: '100枚から承ります。小ロットのデジタルは即日、オフセットは 5-7 営業日 + DHL 国際 2-4 日です。' },
    ],
    cta: 'WhatsApp で問い合わせ',
    ctaText: 'お見積もり・サンプルをご希望ですか？',
  },
} as const;

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = T[locale] ?? T['zh-hk'];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/business-card-printing/`,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/business-card-printing/`,
        en: `${siteConfig.url}/en/business-card-printing/`,
        ja: `${siteConfig.url}/ja/business-card-printing/`,
        'x-default': `${siteConfig.url}/zh-hk/business-card-printing/`,
      },
    },
  };
}

export default function BusinessCardsPage({ params }: Props) {
  const locale = params.locale as Locale;
  const t = T[locale] ?? T['zh-hk'];
  const L = (p: string) => `/${locale}${p}`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'zh-hk' ? '首頁' : locale === 'ja' ? 'ホーム' : 'Home', item: `${siteConfig.url}/${locale}/` },
      { '@type': 'ListItem', position: 2, name: t.crumb, item: `${siteConfig.url}/${locale}/business-card-printing/` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const skus = [
    { href: L('/product/thick-greeting-cards-400g/'), zh: '厚卡名片 (400g 起)', en: 'Thick Business Cards (400g+)', ja: '厚手名刺 (400g〜)' },
    { href: L('/product/foil-greeting-cards/'), zh: '燙金名片', en: 'Foil-Stamped Business Cards', ja: '箔押し名刺' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <main className="min-h-screen bg-white">
        {/* S1 Hero 骨架 (与 contact/blog/about/help-center 同族) */}
        <section className="max-w-[1320px] mx-auto">
          <div
            className="relative w-full overflow-hidden flex min-h-[380px] md:min-h-[440px] text-white"
            style={{ background: 'var(--color-royal-navy-grad)' }}
          >
            <div aria-hidden className="hidden lg:block absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none">
              <div className="absolute -right-20 -top-24 w-[420px] h-[420px] rounded-full border-[3px] border-white/10" />
              <div className="absolute -right-6 -top-8 w-[300px] h-[300px] rounded-full border-2 border-white/10" />
              <div className="absolute right-44 bottom-6 w-[160px] h-[160px] rounded-full border-2 border-[#F87314]/30" />
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,.6) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
              />
            </div>
            <div className="relative z-[1] w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
              <nav aria-label="breadcrumb" className="text-[13px] text-white/75 mb-4">
                <a href={L('/')} className="underline decoration-white/40 hover:text-white">
                  {locale === 'zh-hk' ? '首頁' : locale === 'ja' ? 'ホーム' : 'Home'}
                </a>
                <span className="mx-1.5 text-white/40">/</span>
                <span className="text-white">{t.crumb}</span>
              </nav>
              <p className="inline-flex items-center gap-2 text-[#F87314] text-[13px] font-semibold tracking-[.12em] uppercase mb-3">
                <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" />
                {t.eyebrow}
              </p>
              <h1 className="text-[clamp(24px,2.5vw,34px)] font-extrabold tracking-[-0.01em] leading-[1.3] max-w-[720px] drop-shadow-sm">
                {t.h1}
              </h1>
              <p className="mt-2.5 text-[16.5px] text-white/85 max-w-[640px] leading-relaxed">{t.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppCtaButton
                  href={`https://wa.me/8619880851334?text=${encodeURIComponent(
                    locale === 'zh-hk' ? '我想查詢名片／咭片印刷報價' : locale === 'ja' ? '名刺印刷の見積もりをお願いします' : 'I would like a business card printing quote'
                  )}`}
                  label={t.cta}
                  source="business-cards-hero"
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 正文 (S2 节奏: 1320 + 17.5px 基线 + 浅蓝卡交替) */}
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid gap-6 md:gap-8">
            {t.sections.map((s, i) => (
              <div
                key={s.h2}
                className={i % 2 === 0 ? 'rounded-[18px] bg-[#F2F6FF] border border-blue-50 p-6 sm:p-8' : 'rounded-[18px] bg-white border border-gray-100 p-6 sm:p-8'}
              >
                <h2 className="text-[clamp(20px,2vw,26px)] font-bold text-[#333333] mb-3">{s.h2}</h2>
                <p className="text-[17.5px] leading-[1.75] text-[#3A4250]">{s.body}</p>
              </div>
            ))}
          </div>

          {/* 内链: 两款名片 SKU (线上 200 已实测) */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {skus.map((k) => (
              <a
                key={k.href}
                href={k.href}
                className="rounded-xl border border-gray-100 bg-white p-5 hover:border-[#2873F5] hover:shadow-sm transition-all"
              >
                <span className="font-bold text-[#333333]">
                  {locale === 'zh-hk' ? k.zh : locale === 'ja' ? k.ja : k.en}
                </span>
                <span className="block text-[17.5px] leading-[1.75] text-[#2873F5] mt-1">→</span>
              </a>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-[clamp(20px,2vw,26px)] font-bold text-[#333333] mb-5">
              {locale === 'zh-hk' ? '常見問題' : locale === 'ja' ? 'よくあるご質問' : 'FAQ'}
            </h2>
            <div className="grid gap-4">
              {t.faqs.map((f) => (
                <div key={f.q} className="rounded-xl bg-[#F2F6FF] border border-blue-50 p-5">
                  <p className="font-semibold text-[#333333] mb-2">{f.q}</p>
                  <p className="text-[17.5px] leading-[1.75] text-[#3A4250]">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S3 尾 CTA */}
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-20">
          <div
            className="rounded-2xl overflow-hidden text-white px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'var(--color-royal-navy-grad)' }}
          >
            <div>
              <p className="font-bold text-[20px]">{t.ctaText}</p>
              <p className="text-white/70 mt-1">
                {locale === 'zh-hk' ? '100 張起印 · 免費打樣 · DHL 全球 2-4 天' : locale === 'ja' ? '100枚から · 無料サンプル · DHL 国際 2-4 日' : 'MOQ 100 · Free sample · DHL 2-4 days worldwide'}
              </p>
            </div>
            <div className="flex gap-3">
              <WhatsAppCtaButton
                href="https://wa.me/8619880851334"
                label={t.cta}
                source="business-cards-tail-cta"
                locale={locale}
              />
              <a
                href={L('/contact/')}
                className="inline-flex items-center rounded-xl border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/10 transition-colors"
              >
                {locale === 'zh-hk' ? '聯絡我們' : locale === 'ja' ? 'お問い合わせ' : 'Contact us'}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
