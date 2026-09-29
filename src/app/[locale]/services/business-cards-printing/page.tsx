/**
 * 名片 · 咭片印刷承接落地页 (D1 · §0.0 解禁块 选项 (c) · K3 2026-09-30 拍板执行)
 *
 * 定位: 承接 GSC「咭片 / 咭片印刷 / 印咭片」需求 (2026-09-29 三窗口分析, 56+ imps 无承接页),
 *       以及 K3 9/12 解禁后的海外 B2B 名片询盘 (地产/律所/专业服务类)。
 * 边界 (§0.0): 不新建 SKU、不动 greeting-cards 资产、不动 middleware 301 映射;
 *              本页为纯承接落地页, 报价走 WhatsApp / 既有流程。
 * 数据口径: MOQ 10 起 (纸品线统一口径, products.ts greeting-cards minQuantity=10);
 *           无编造价格, 全部走「30 秒 AI 报价 + WhatsApp」, 符合 §0.23。
 * 品牌: zh-hk=智印港 / en=ZprintPro / ja=ZprintPro (§0 单品牌分层)。
 * 本地化: zh-hk 咭片/燙金港式术语 + 100% 繁体; ja 名刺 91×55mm 日本規格; en MOQ/Turnaround B2B 术语。
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generateWhatsAppLink } from '@/lib/whatsapp';

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

type Props = { params: { locale: Locale } };

const metaMap: Record<string, { title: string; desc: string; keywords: string }> = {
  'zh-hk': {
    title: '名片印刷 10張起・燙金/UV/圓角・免費設計即日交貨 | 智印港',
    desc: '香港名片印刷・咭片訂製：90×54mm 標準尺寸，10 張起印，燙金 / 局部 UV / 圓角 / 雙面印刷工藝，免費設計打稿 4 小時，最快即日交貨，港九新界滿 HK$500 免費順豐，DHL 全球 2-4 天配送。WhatsApp 30 秒即時報價，ISO 9001 認證。',
    keywords: '名片印刷,咭片印刷,印咭片,名片訂製,咭片訂製,燙金名片,UV名片,圓角名片,雙面名片,香港名片,business card printing,名片報價',
  },
  en: {
    title: 'Business Card Printing from 10 pcs | Foil / Spot UV / Rounded Corners | ZprintPro',
    desc: 'Custom business card printing from 10 pcs. Standard 90×54mm with foil stamping, spot UV, rounded corners, double-sided printing. Free design proof in 4 hours, DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote, ISO 9001 certified.',
    keywords: 'business card printing,custom business cards,premium business cards,foil business cards,spot uv business cards,rounded corner business cards,double sided business cards,name cards,USA business card printing,small batch business cards',
  },
  ja: {
    title: '名刺印刷 10枚〜・箔押し/スポットUV/角丸・無料デザイン | ZprintPro',
    desc: '名刺印刷 10 枚から対応。標準サイズ 91×55mm、箔押し・スポットUV・角丸・両面印刷対応。無料デザイン校正 2 時間、最短即日発送、日本全国 DHL 2-4 日配送。30 秒 AI 無料見積もり、ISO 9001 認証品質。',
    keywords: '名刺印刷,オリジナル名刺,箔押し名刺,スポットUV名刺,角丸名刺,両面名刺,短納期名刺,名刺作成,小ロット名刺,法人名刺',
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
      canonical: `https://zprintpro.com/${locale}/services/business-cards-printing/`,
      languages: {
        'zh-Hant-HK': 'https://zprintpro.com/zh-hk/services/business-cards-printing/',
        'en': 'https://zprintpro.com/en/services/business-cards-printing/',
        'ja': 'https://zprintpro.com/ja/services/business-cards-printing/',
        'x-default': 'https://zprintpro.com/zh-hk/services/business-cards-printing/',
      },
    },
  };
}

export default function BusinessCardsPage({ params }: Props) {
  const { locale } = params;
  if (!['zh-hk', 'en', 'ja'].includes(locale)) notFound();

  const t = {
    'zh-hk': {
      h1: '香港名片印刷 · 咭片訂製 — 燙金 / 局部UV / 圓角 / 雙面',
      lead: '香港名片印刷 10 張起接單，90×54mm 標準尺寸，燙金、局部 UV、圓角、雙面印刷等工藝都做。免費設計打稿 4 小時，最快即日交貨，30 秒 AI 報價，WhatsApp 一對一跟單。',
      ctaQuote: 'WhatsApp 30 秒報價',
      ctaSpec: '睇工藝比較',
      specTitle: '名片印刷工藝點揀？四款熱門工藝比較',
      specCols: ['工藝', '效果', '適合場景'],
      specRows: [
        ['燙金（金/銀/玫瑰金）', '金屬光澤、凹凸立體感', '律師樓、會計師、地產、高端專業服務'],
        ['局部 UV', '局部亮面 + 啞面底，低調質感', '設計師、品牌公司、美妝護膚'],
        ['圓角裁切', '圓潤手感、防刮袋', '零售、餐飲、個人品牌'],
        ['雙面印刷', '背面加 logo / 多語言資料', '跨境貿易、展會派發'],
      ],
      sizeTitle: '標準尺寸與紙質',
      sizeBody: '標準名片尺寸 90×54mm（亦可做 85.5×54mm 或自訂尺寸）。紙質常見 300g 銅版紙、400g 厚卡、啞粉紙、棉紙及 PVC 膠卡，全部可按報價自選。',
      flowTitle: '名片印刷 6 步流程',
      flow: [
        ['WhatsApp 查詢', '講清楚尺寸、數量、工藝同用途'],
        ['報價確認', '2 小時內回覆價錢同交期'],
        ['提供設計檔', 'AI / PDF / 名片設計模板都得，可代排版'],
        ['打樣確認', '印前提供數碼樣，滿意先開印'],
        ['生產製作', '廠房直接印刷，最快即日交貨'],
        ['收貨驗收', '香港本地派送或自取，跟進到滿意'],
      ],
      faqTitle: '名片印刷常見問題',
      faqs: [
        { q: '名片印刷最少要印幾多張？', a: '10 張起印，適合新入職、小團隊試印或活動即場派發；批量 100 張以上更有優惠，實際以報價為準。' },
        { q: '名片幾時可以攞貨？', a: '常規 2-3 個工作天交貨，急單可 WhatsApp 溝通安排最快即日交貨，以工廠排單為準。' },
        { q: '可唔可以燙金同做圓角？', a: '可以。燙金（金/銀/玫瑰金）、局部 UV、圓角裁切、雙面印刷都做，報價時揀工藝即可。' },
        { q: '我冇設計稿點算？', a: '免費設計打稿 4 小時，提供公司名、職位、聯絡資料即可，確認電子樣先印。' },
        { q: '海外客戶可以落單嗎？', a: '可以，全球接單。DHL 全球 2-4 天配送，WhatsApp 以英文或中文溝通均可。' },
      ],
      relatedTitle: '相關印刷服務',
      related: [
        ['賀卡印刷', `/${locale}/category/greeting-cards/`],
        ['喜帖印刷', `/${locale}/category/wedding-invitations/`],
        ['枱卡・座位卡', `/${locale}/category/place-cards/`],
      ],
      whatsappText: '你好，我想諮詢名片印刷報價。尺寸：90×54mm｜數量：100 張｜工藝：燙金 / 局部UV / 圓角',
    },
    en: {
      h1: 'Business Card Printing · Custom Name Cards — Foil / Spot UV / Rounded Corners / Double-Sided',
      lead: 'Custom business card printing from 10 pcs. Standard 90×54mm with foil stamping, spot UV, rounded corners and double-sided printing. Free design proof in 4 hours, fastest same-day turnaround, 30-second AI quote with one-to-one WhatsApp support.',
      ctaQuote: 'Get a 30-Second Quote on WhatsApp',
      ctaSpec: 'Compare Finishes',
      specTitle: 'Which Business Card Finish? Four Popular Options Compared',
      specCols: ['Finish', 'Effect', 'Best For'],
      specRows: [
        ['Foil (Gold / Silver / Rose Gold)', 'Metallic sheen with debossed depth', 'Law firms, accountants, real estate, premium professional services'],
        ['Spot UV', 'Glossy spot on a matte base — understated premium', 'Designers, brand agencies, beauty & skincare'],
        ['Rounded Corners', 'Soft hand feel, scratch-resistant in card holders', 'Retail, restaurants, personal brands'],
        ['Double-Sided', 'Back side for logo, QR or multi-language details', 'Cross-border trade, trade shows'],
      ],
      sizeTitle: 'Standard Size & Paper',
      sizeBody: 'Standard business card size 90×54mm (85.5×54mm or custom sizes available). Common papers: 300gsm art paper, 400gsm thick card, matte art paper, cotton paper and PVC cards — all quoted per your choice.',
      flowTitle: 'Business Card Printing in 6 Steps',
      flow: [
        ['WhatsApp Inquiry', 'Tell us size, quantity, finish and use case'],
        ['Quote Confirmed', 'Price and lead time within 2 hours'],
        ['Send Artwork', 'AI / PDF / our free templates — we can typeset for you'],
        ['Proof Approval', 'Digital proof before printing — print only when happy'],
        ['Production', 'In-house factory, same-day rush available'],
        ['Delivery', 'HK local delivery or pickup; DHL 2-4 days worldwide'],
      ],
      faqTitle: 'Business Card Printing FAQ',
      faqs: [
        { q: 'What is the minimum order for business cards?', a: '10 pcs minimum — perfect for new joiners, small teams or event giveaways. Bulk tiers from 100 pcs are more cost-effective; final pricing per quote.' },
        { q: 'How fast can I get business cards?', a: 'Standard 2-3 business days; rush orders can be arranged via WhatsApp with same-day turnaround subject to factory schedule.' },
        { q: 'Do you offer foil stamping and rounded corners?', a: 'Yes — foil (gold/silver/rose gold), spot UV, rounded corners and double-sided printing are all available; select finishes at quote time.' },
        { q: 'What if I have no design file?', a: 'Free design proof within 4 hours — send company name, job title and contacts; we typeset and confirm the digital proof before printing.' },
        { q: 'Do you serve overseas customers?', a: 'Yes, worldwide. DHL 2-4 day delivery; communicate in English or Chinese on WhatsApp.' },
      ],
      relatedTitle: 'Related Printing Services',
      related: [
        ['Greeting Card Printing', `/${locale}/category/greeting-cards/`],
        ['Wedding Invitation Printing', `/${locale}/category/wedding-invitations/`],
        ['Place Cards & Seating Cards', `/${locale}/category/place-cards/`],
      ],
      whatsappText: "Hi, I'd like a business card printing quote. Size: 90×54mm | Qty: 100 pcs | Finish: Foil / Spot UV / Rounded corners",
    },
    ja: {
      h1: '名刺印刷 カスタム — 箔押し / スポットUV / 角丸 / 両面',
      lead: '名刺印刷 10 枚から対応。標準サイズ 91×55mm、箔押し・スポットUV・角丸・両面印刷対応。無料デザイン校正 2 時間、最短即日発送、30 秒 AI 無料見積もり、WhatsApp で一対一対応。',
      ctaQuote: 'WhatsApp で30秒見積もり',
      ctaSpec: '加工を比較',
      specTitle: '名刺の加工はどう選ぶ？人気4種の比較',
      specCols: ['加工', '仕上がり', 'おすすめシーン'],
      specRows: [
        ['箔押し（金/銀/ローズゴールド）', 'メタリックな光沢と立体感', '弁護士事務所、会計事務所、不動産、士業・専門サービス'],
        ['スポットUV', 'マット地に部分光沢、上品な質感', 'デザイナー、ブランド企業、美容・スキンケア'],
        ['角丸加工', 'なめらかな手触り、ケース内で傷みにくい', '小売、飲食、個人ブランド'],
        ['両面印刷', '裏面にロゴや多言語情報を掲載', '越境EC、展示会配布'],
      ],
      sizeTitle: '標準サイズと用紙',
      sizeBody: '標準名刺サイズ 91×55mm（日本規格）。用紙は 300g アート紙、400g 厚口、マットコート紙、コットン紙、PVC カードから選択可能。価格はお見積もり制です。',
      flowTitle: '名刺印刷 6ステップ',
      flow: [
        ['WhatsApp で問い合わせ', 'サイズ・数量・加工・用途をお伝えください'],
        ['お見積もり確認', '2時間以内に価格と納期を返信'],
        ['デザインデータ提出', 'AI / PDF / 無料テンプレート、レイアウト代行も可'],
        ['校正確認', '印刷前にデジタル校正、ご確認後に生産開始'],
        ['生産', '自社工場で生産、最短即日対応'],
        ['配送', '日本全国 DHL 2-4 日、沖縄・北海道対応'],
      ],
      faqTitle: '名刺印刷 よくある質問',
      faqs: [
        { q: '名刺印刷の最小ロットは？', a: '10 枚から対応。新入社員や小チーム、イベント配布にも最適。100 枚以上のロットは割引あり、最終価格はお見積もり制です。' },
        { q: '納期はどのくらい？', a: '標準 2-3 営業日、急ぎは WhatsApp でご相談ください。最短即日対応も工場のスケジュールにより可能です。' },
        { q: '箔押しや角丸加工はできますか？', a: 'できます。箔押し（金/銀/ローズゴールド）、スポットUV、角丸加工、両面印刷に対応。お見積もり時にご指定ください。' },
        { q: 'デザインデータがありません。', a: '無料デザイン校正を 2 時間以内にご用意。会社名・役職・連絡先をお送りいただければレイアウトし、デジタル校正でご確認後に印刷します。' },
        { q: '海外からの注文はできますか？', a: 'はい、世界中からご注文いただけます。DHL で 2-4 日配送、日本語サポート完備。' },
      ],
      relatedTitle: '関連印刷サービス',
      related: [
        ['グリーティングカード印刷', `/${locale}/category/greeting-cards/`],
        ['結婚式招待状印刷', `/${locale}/category/wedding-invitations/`],
        ['席札印刷', `/${locale}/category/place-cards/`],
      ],
      whatsappText: 'お世話になっております。名刺印刷のお見積もりをお願いいたします。サイズ：91×55mm｜数量：100 枚｜加工：箔押し / スポットUV / 角丸',
    },
  }[locale];

  const waLink = generateWhatsAppLink(locale, {
    productName: locale === 'zh-hk' ? '名片印刷' : locale === 'ja' ? '名刺印刷' : 'Business Card Printing',
    size: locale === 'ja' ? '91×55mm' : '90×54mm',
    quantity: '100',
    material: locale === 'zh-hk' ? '300g 銅版紙 / 400g 厚卡' : locale === 'ja' ? '300g アート紙 / 400g 厚口' : '300gsm art / 400gsm thick card',
    extra: t.whatsappText,
    source: 'business-cards-printing-hero',
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const serviceName = locale === 'zh-hk' ? '名片印刷・咭片訂製' : locale === 'ja' ? '名刺印刷' : 'Business Card Printing';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    serviceType: 'Printing',
    url: `https://zprintpro.com/${locale}/services/business-cards-printing/`,
    provider: { '@type': 'Organization', name: locale === 'zh-hk' ? '智印港' : 'ZprintPro' },
    areaServed: locale === 'zh-hk' ? 'HK' : locale === 'ja' ? 'JP' : 'US',
    offers: { '@type': 'Offer', description: locale === 'zh-hk' ? '30 秒 AI 即時報價' : locale === 'ja' ? '30秒 AI 無料見積もり' : '30-second AI quote' },
  };

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: locale === 'zh-hk' ? '首頁' : locale === 'ja' ? 'ホーム' : 'Home', item: `https://zprintpro.com/${locale}/` },
            { '@type': 'ListItem', position: 2, name: locale === 'zh-hk' ? '服務' : locale === 'ja' ? 'サービス' : 'Services', item: `https://zprintpro.com/${locale}/services/` },
            { '@type': 'ListItem', position: 3, name: serviceName, item: `https://zprintpro.com/${locale}/services/business-cards-printing/` },
          ],
        }}
      />

      {/* Hero + AEO 快速答案 */}
      <section className="bg-gradient-to-b from-[#F5F8FF] to-white">
        <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
          <p className="text-sm font-semibold tracking-wide text-[#2873F5]">
            {locale === 'zh-hk' ? '名片 / 咭片印刷 · 承接全球訂單' : locale === 'ja' ? '名刺印刷 · 海外注文対応' : 'Business Card Printing · Worldwide'}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{t.h1}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">{t.lead}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#2873F5] to-[#1E5FD1] px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              {t.ctaQuote}
            </a>
            <a
              href="#compare"
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:border-[#2873F5] hover:text-[#2873F5]"
            >
              {t.ctaSpec}
            </a>
          </div>
        </div>
      </section>

      {/* 尺寸与纸质 */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900">{t.sizeTitle}</h2>
          <p className="mt-3 leading-relaxed text-gray-600">{t.sizeBody}</p>
        </div>
      </section>

      {/* 工艺比较表 (GEO 比较列表) */}
      <section id="compare" className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900">{t.specTitle}</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-50">
                {t.specCols.map((c) => (
                  <th key={c} className="px-4 py-3 text-sm font-semibold text-gray-700">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.specRows.map((r) => (
                <tr key={r[0]} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{r[0]}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r[1]}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 步流程 */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900">{t.flowTitle}</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.flow.map(([title, desc], i) => (
              <li key={title} className="rounded-xl border border-gray-200 bg-white p-5">
                <span className="text-sm font-bold text-[#2873F5]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1 font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">{t.faqTitle}</h2>
        <div className="mt-6 space-y-3">
          {t.faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-gray-900">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 相关服务 (outbound) */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="text-lg font-bold text-gray-900">{t.relatedTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {t.related.map(([name, href]) => (
            <a key={href} href={href} className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-[#2873F5] hover:text-[#2873F5]">
              {name}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
