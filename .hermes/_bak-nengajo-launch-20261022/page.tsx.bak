/**
 * 年賀状 2027 早鳥キャンペーンページ（预埋版 · 两周排程 §2 10/16 件 · K3 「直接开工」指令 2026-10-15）
 *
 * SSoT: docs/2026-10-15-nengajo-2027-earlybird-page-skeleton.md
 * 上线机制: NENGAJO_LIVE=false → 构建期 404（客户/Google 不可见, sitemap 未登记）；
 *           K3 三真值到位（死线 10/21）→ 填值 + 翻 true + sitemap staticPages 一行 + push = 当日上线。
 *           上线 runbook = .hermes/drafts/nengajo-2027/LAUNCH-CHECKLIST.md
 * 真值口径 (products.ts 2026-10-15 现取, §0.23):
 *   HKD 1.0/1.2/1.8/1.4/1.1/1.0 · USD 0.13/0.15/0.23/0.18/0.14/0.13 · JPY 20/23/35/27/21/20 · 10枚から · 127×178mm
 * K3 待办1 填值位（死线 10/21, 三处）:
 *   [1] 早割割引率 → 各语 ebSlot 早割率句 + 価格表「早割」列（现「確定後に掲載」）
 *   [2] 正式締切日 → 各语 ebSlot 締切句 + FAQ A2（现「10月末目安・2026-11-01 再確認」既有 K3 口径）
 *   [3] 宛名印刷可否 → 各语 atenaBody（现「確認中」；拍「不提供」则改「対応外」）
 * 纪律: 无编造数字; 日本郵便投函締切只指向官方当年案内; ja 禁詞表（超低价系/最高级表现系，见 i18n-guard JA 禁词规则）零使用;
 *       品牌 ja/en=ZprintPro / zh-hk=智印港 单品牌分层; 不新建 SKU、不动 greeting-cards 资产。
 * 模板: src/app/[locale]/services/business-cards-printing/page.tsx（§0.0 解禁块 (c) 同款静态模式）
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Locale } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generateWhatsAppLink } from '@/lib/whatsapp';

// A2 CPU 治理口径: 构建期确定, 未知参数静态 404
export const dynamicParams = false;

// 上线开关: K3 三真值填入并复核后改 true（改值 diff 应与开关同 commit）
const NENGAJO_LIVE = false;

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

type Props = { params: { locale: Locale } };

const metaMap: Record<string, { title: string; desc: string; keywords: string }> = {
  'zh-hk': {
    title: '賀年卡・年賀狀印刷 2027 早鳥 | 10 張起 HK$1 起 | 智印港',
    desc: '2027 賀年卡・年賀狀印刷早鳥優惠：6 款賀卡全部 10 張起印，HK$1 起，127×178mm 標準尺寸，燙金／局部 UV／圓角／400g 厚卡可選，3-5 個工作天交貨，DHL 全球 2-4 天，免費打樣。早鳥優惠名額與截單日確認後即時更新，WhatsApp 30 秒報價。',
    keywords: '年賀狀印刷,賀年卡印刷,新年卡印刷,2027 賀年卡,賀卡印刷早鳥,燙金賀卡,厚卡賀卡,圓角賀卡,香港賀卡訂製,企業賀年卡',
  },
  'en': {
    title: 'Nengajo 2027 Early-Bird Printing | 10 MOQ | ZprintPro',
    desc: 'Japanese New Year cards (nengajo) 2027 early-bird printing: 6 card SKUs from 10 pcs, from US$0.13/card, 127×178mm standard, foil / spot UV / rounded corners / 400g stock, 3-5 day production, DHL 2-4 day delivery, free digital proof. Early-bird terms confirmed soon. 30-second AI quote.',
    keywords: 'nengajo printing,japanese new year cards 2027,nengajo 2027,new year card printing,greeting card printing early bird,foil new year cards,custom nengajo,nengaja english,japan new year card service,new year postcard printing',
  },
  'ja': {
    title: '年賀状印刷 2027 早割受付中 | 10枚から ¥20〜 | ZprintPro',
    desc: '2027年年賀状印刷の早割受付ページ。6 SKU すべて10枚から、1枚¥20〜（箔押し¥35〜）。127×178mm 標準サイズ、宛名オプション対応確認中、納期3〜5営業日、DHL国際2〜4日、無料入稿チェック。早割率・正式締切は確定次第本ページで更新。30秒AI見積り対応。',
    keywords: '年賀状印刷,年賀状 2027,オリジナル年賀状,箔押し 年賀状,年賀状 早割,年賀状 10枚から,宛名印刷,企業年賀状,数百枚 年賀状,年賀状 外注',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const m = metaMap[locale] || metaMap.ja;
  return {
    title: m.title,
    description: m.desc,
    keywords: m.keywords,
    alternates: {
      canonical: `https://zprintpro.com/${locale}/nengajo-2027/`,
      languages: {
        'zh-hk': 'https://zprintpro.com/zh-hk/nengajo-2027/',
        'en': 'https://zprintpro.com/en/nengajo-2027/',
        'ja': 'https://zprintpro.com/ja/nengajo-2027/',
        'x-default': 'https://zprintpro.com/zh-hk/nengajo-2027/',
      },
    },
  };
}

export default function Nengajo2027Page({ params }: Props) {
  const { locale } = params;
  if (!NENGAJO_LIVE) notFound();
  if (!['zh-hk', 'en', 'ja'].includes(locale)) notFound();

  const t = {
    'zh-hk': {
      h1: '2027 賀年卡・年賀狀印刷 — 早鳥優惠受訂中',
      lead: '2027 年賀狀／賀年卡早鳥受訂開始：6 款賀卡全部 10 張起印，HK$1 起，127×178mm 標準尺寸，燙金、局部 UV、圓角、400g 厚卡可選。3-5 個工作天交貨，DHL 全球 2-4 天，免費打樣，30 秒 AI 報價。',
      ebTitle: '早鳥優惠（名額制）',
      ebBody: '早鳥優惠以「10 月底前落單」為目安（既有口徑，2026-11-01 再確認）。確定嘅早鳥折扣率同正式截單日一經拍板，即刻喺本頁更新 + WhatsApp 逐客通知。',
      ebSlot: '早鳥折扣率・正式截單日：拍板後即刻更新（現行目安：10 月底前落單，2026-11-01 再確認）',
      tableTitle: '6 款賀卡規格・牌價（早鳥價確認後更新）',
      tableCols: ['SKU', '規格', '起印量', '牌價（每張）', '早鳥價'],
      tableRows: [
        ['高級賀卡 Premium', '300g 銅版 127×178mm', '10 張', 'HK$1.0 起', '確認後更新'],
        ['400g 厚卡', '400g 厚卡 127×178mm', '10 張', 'HK$1.2 起', '確認後更新'],
        ['燙金賀卡', '金箔／銀箔 127×178mm', '10 張', 'HK$1.8 起', '確認後更新'],
        ['UV 局部光油賀卡', '局部 UV 127×178mm', '10 張', 'HK$1.4 起', '確認後更新'],
        ['啞膠賀卡', '啞膠過膠 127×178mm', '10 張', 'HK$1.1 起', '確認後更新'],
        ['圓角賀卡', '圓角裁切 127×178mm', '10 張', 'HK$1.0 起', '確認後更新'],
      ],
      tableNote: '牌價來源：products.ts（2026-10-15 現取，與產品頁同步）；早鳥價確認後以本表為準。',
      timelineTitle: '由落單到寄達：發注時間線',
      timeline: [
        ['設計／入稿', 'AI／PDF／Canva 檔都得，免費入稿檢查 + 數碼打樣'],
        ['生產 3-5 個工作天', '深圳平湖廠房柯式印刷，出貨前全檢色差'],
        ['本地／國際配送', '香港滿 HK$500 免費順豐 1-2 天；DHL 全球 2-4 天'],
        ['投函／派賀', '日本投函締切以日本郵便當年官方案内為準（本頁唔代公佈）'],
      ],
      atenaTitle: '宛名印刷選項',
      atenaBody: '宛名（收件人地址）印刷可否代做及加收費用確認中，確認後更新。',
      faqTitle: '賀年卡・年賀狀常見問題',
      faqs: [
        { q: '最少要印幾多張？', a: '6 款賀卡全部 10 張起印，小批量數碼可做，大批量轉柯式更抵；實際以報價為準。' },
        { q: '早鳥優惠幾時截？', a: '以「10 月底前落單」為目安（既有口徑，2026-11-01 再確認）；正式折扣率同截單日拍板後會喺本頁即時更新。' },
        { q: '可以代印宛名（收件人資料）嗎？', a: '宛名印刷可否代做及費用確認中，確認後喺本頁公佈；需要嘅話可以喺 WhatsApp 先登記需求。' },
        { q: '幾時落單先趕得切寄出？', a: '生產 3-5 個工作天 + DHL 2-4 天，建議 12 月中旬前完成落單留返郵寄時間；投函締切請以日本郵便官方案内為準。' },
      ],
      relatedTitle: '延伸閱讀與直接落單',
      related: [
        ['賀卡印刷類目（全部規格）', `/${locale}/category/greeting-cards/`],
        ['年賀狀印刷 2027 指南（深度文）', `/${locale}/blog/new-year-card-printing-2027-guide/`],
        ['燙金 3 大應用指南', `/${locale}/blog/foil-stamping-3-applications-2026/`],
        ['燙金賀卡 SKU', `/${locale}/product/foil-greeting-cards/`],
        ['高級賀卡 SKU', `/${locale}/product/premium-greeting-cards/`],
      ],
      ctaQuote: 'WhatsApp 30 秒報價',
      whatsappText: '你好，我想查詢 2027 賀年卡／年賀狀早鳥優惠。SKU：高級／厚卡／燙金／UV／啞膠／圓角｜數量：＿＿張｜加工：＿＿',
    },
    en: {
      h1: '2027 Nengajo & New Year Cards — Early-Bird Printing',
      lead: 'Early-bird window open for 2027 Japanese New Year cards: 6 SKUs from 10 pcs, from US$0.13/card, 127×178mm standard, foil / spot UV / rounded corners / 400g stock. 3-5 day production, DHL 2-4 day delivery, free digital proof, 30-second AI quote.',
      ebTitle: 'Early-Bird Terms',
      ebBody: 'Working guidance: order by end of October (existing baseline, re-confirmed 2026-11-01). Confirmed discount rate and final deadline will be published on this page once approved.',
      ebSlot: 'Discount rate & final deadline: to be published once approved (working guidance: order by end of October, re-confirmed 2026-11-01)',
      tableTitle: '6 Card SKUs & List Prices (early-bird to be confirmed)',
      tableCols: ['SKU', 'Spec', 'MOQ', 'List price', 'Early-bird'],
      tableRows: [
        ['Premium Greeting Cards', '300g art, 127×178mm', '10 pcs', 'US$0.13 up', 'To be confirmed'],
        ['Thick 400g Cards', '400g stock, 127×178mm', '10 pcs', 'US$0.15 up', 'To be confirmed'],
        ['Foil-Stamped Cards', 'gold/silver foil, 127×178mm', '10 pcs', 'US$0.23 up', 'To be confirmed'],
        ['Spot UV Cards', 'partial UV, 127×178mm', '10 pcs', 'US$0.18 up', 'To be confirmed'],
        ['Matte Cards', 'matte lamination, 127×178mm', '10 pcs', 'US$0.14 up', 'To be confirmed'],
        ['Rounded-Corner Cards', 'rounded die-cut, 127×178mm', '10 pcs', 'US$0.13 up', 'To be confirmed'],
      ],
      tableNote: 'List prices from products.ts (2026-10-15 snapshot, USD basePrice_en extracted 2026-10-15, synced with PDPs).',
      timelineTitle: 'From order to delivery',
      timeline: [
        ['Artwork / upload', 'AI / PDF / Canva accepted; free prepress check + digital proof'],
        ['Production 3-5 days', 'Offset printing at our Shenzhen Pinghu plant, 100% color QC'],
        ['Shipping', 'DHL international 2-4 days; US free shipping $99+'],
        ['Mailing', 'Japan Post mailing deadlines follow the official annual guidance (not republished here)'],
      ],
      atenaTitle: 'Recipient-name (atena) printing',
      atenaBody: 'Availability and pricing for atena (recipient addressing) being confirmed — updates on this page.',
      faqTitle: 'FAQ',
      faqs: [
        { q: 'What is the minimum order?', a: 'All 6 card SKUs start from 10 pcs; small runs are digital, larger runs move to offset for better unit price.' },
        { q: 'When does the early-bird end?', a: 'Working guidance is end of October (baseline, re-confirmed 2026-11-01); the confirmed rate and deadline will be posted here once approved.' },
        { q: 'Can you print recipient names (atena)?', a: 'Availability and pricing are being confirmed; register your requirement on WhatsApp meanwhile.' },
        { q: 'How late can I order for January 1 delivery?', a: 'Production is 3-5 working days plus DHL 2-4 days; we recommend ordering by mid-December, and Japan Post mailing deadlines follow their official annual guidance.' },
      ],
      relatedTitle: 'Related',
      related: [
        ['Greeting Cards category', `/${locale}/category/greeting-cards/`],
        ['New Year Card Printing 2027 guide', `/${locale}/blog/new-year-card-printing-2027-guide/`],
        ['Foil stamping guide', `/${locale}/blog/foil-stamping-3-applications-2026/`],
        ['Foil Greeting Cards SKU', `/${locale}/product/foil-greeting-cards/`],
        ['Premium Greeting Cards SKU', `/${locale}/product/premium-greeting-cards/`],
      ],
      ctaQuote: 'Get a 30-Second Quote on WhatsApp',
      whatsappText: 'Hi, I need a 2027 nengajo / New Year card early-bird quote. SKU: premium/400g/foil/UV/matte/rounded | Qty: ___ | Finish: ___',
    },
    ja: {
      h1: '2027年年賀状印刷 — 早割受付中',
      lead: '2027年年賀状の早割受付を開始しました。6 SKU すべて10枚から、1枚¥20〜。127×178mm 標準サイズ、箔押し・スポットUV・角丸・厚口400gから選べます。納期3〜5営業日、DHL国際2〜4日、無料入稿チェック、30秒AI見積り対応。',
      ebTitle: '早割のご案内',
      ebBody: '早割は「10月末までのご発注」を目安としています（既存口径、2026-11-01 に再確認）。確定した割引率と正式な締切日は、決まり次第こちらのページと WhatsApp でご案内します。',
      ebSlot: '早割率・正式締切日：確定次第更新（現行目安：10月末までのご発注、2026-11-01 再確認）',
      tableTitle: '6 SKU の仕様と牌価（早割価格は確定後に掲載）',
      tableCols: ['SKU', '仕様', '最小数量', '牌価（1枚）', '早割価格'],
      tableRows: [
        ['プレミアム（高級）', '300g アート紙 127×178mm', '10枚', '¥20〜', '確定後に掲載'],
        ['厚口400g', '400g 厚口紙 127×178mm', '10枚', '¥23〜', '確定後に掲載'],
        ['箔押し', '金箔／銀箔 127×178mm', '10枚', '¥35〜', '確定後に掲載'],
        ['スポットUV', '局部 UV 127×178mm', '10枚', '¥27〜', '確定後に掲載'],
        ['マット', 'マットラミネート 127×178mm', '10枚', '¥21〜', '確定後に掲載'],
        ['角丸', '角丸カット 127×178mm', '10枚', '¥20〜', '確定後に掲載'],
      ],
      tableNote: '牌価の出所：products.ts（2026-10-15 現取、商品ページと同期）。',
      timelineTitle: '発注からお届けまでのタイムライン',
      timeline: [
        ['デザイン／入稿', 'AI・PDF・Canva 対応、無料入稿チェック＋デジタル校正'],
        ['印刷 3〜5 営業日', '深圳平湖工場のオフセット印刷、出荷前全数色差検査'],
        ['配送', 'DHL 国際 2〜4 日（日本宛も対応）'],
        ['投函', '年賀状の投函締切は日本郵便の当年公式案内をご参照ください'],
      ],
      atenaTitle: '宛名印刷オプション',
      atenaBody: '宛名（宛先）印刷の対応可否と価格は確認中です。確定次第、本ページでご案内します。',
      faqTitle: 'よくある質問',
      faqs: [
        { q: '最少注文枚数は？', a: '6 SKU すべて10枚から。小ロットはデジタル印刷、ロットが上がるとオフセットで単価が下がります。実額は見積りでご確認ください。' },
        { q: '早割の締切はいつ？', a: '「10月末までのご発注」を目安としています（既存口径、2026-11-01 再確認）。正式な割引率と締切日は確定次第、本ページで更新します。' },
        { q: '宛名印刷はできますか？', a: '対応可否と価格は確認中です。確定次第本ページでご案内します。ご希望は WhatsApp で事前登録いただけます。' },
        { q: '1月1日までに届く締切は？', a: '印刷3〜5営業日＋DHL 2〜4日のため、12月中旬までのご発注が安心です。投函締切は日本郵便の当年公式案内をご参照ください。' },
      ],
      relatedTitle: '関連ページ',
      related: [
        ['グリーティングカード・年賀状カテゴリ', `/${locale}/category/greeting-cards/`],
        ['年賀状印刷 2027 ガイド（深度記事）', `/${locale}/blog/new-year-card-printing-2027-guide/`],
        ['箔押し 3 大活用ガイド', `/${locale}/blog/foil-stamping-3-applications-2026/`],
        ['箔押しカード SKU', `/${locale}/product/foil-greeting-cards/`],
        ['プレミアムカード SKU', `/${locale}/product/premium-greeting-cards/`],
      ],
      ctaQuote: 'WhatsApp で30秒見積もり',
      whatsappText: '2027年年賀状の早割見積りを希望します。SKU：プレミアム／厚口／箔押し／UV／マット／角丸｜数量：＿＿枚｜加工：＿＿',
    },
  }[locale];

  const waLink = generateWhatsAppLink(locale, {
    productName: locale === 'ja' ? '年賀状印刷 2027 早割' : locale === 'zh-hk' ? '賀年卡/年賀狀印刷 2027 早鳥' : 'Nengajo 2027 Early-Bird Printing',
    size: '127×178mm',
    quantity: '10',
    material: locale === 'ja' ? '300g アート紙〜400g 厚口' : locale === 'zh-hk' ? '300g 銅版紙〜400g 厚卡' : '300g art paper to 400g stock',
    extra: t.whatsappText,
    source: 'nengajo-2027-hero',
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

  const campaignSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: metaMap[locale].title,
    description: metaMap[locale].desc,
    provider: { '@type': 'Organization', name: locale === 'zh-hk' ? '智印港' : 'ZprintPro' },
    areaServed: locale === 'ja' ? 'JP' : locale === 'en' ? 'US' : 'HK',
    offers: { '@type': 'Offer', description: locale === 'zh-hk' ? '30 秒 AI 即時報價' : locale === 'ja' ? '30秒 AI 無料見積もり' : '30-second AI quote' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'zh-hk' ? '首頁' : locale === 'ja' ? 'ホーム' : 'Home', item: `https://zprintpro.com/${locale}/` },
      { '@type': 'ListItem', position: 2, name: t.h1.slice(0, 40), item: `https://zprintpro.com/${locale}/nengajo-2027/` },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={campaignSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <h1 className="text-3xl font-bold mb-4">{t.h1}</h1>
      <p className="text-gray-700 mb-6">{t.lead}</p>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
        <p className="font-semibold mb-1">⚡ {t.ebTitle}</p>
        <p>{t.ebBody}</p>
        <p className="mt-2 text-sm text-gray-700">{t.ebSlot}</p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-3">{t.tableTitle}</h2>
      <table className="w-full text-sm border-collapse my-4">
        <thead>
          <tr className="bg-gray-100">
            {t.tableCols.map((c) => (<th key={c} className="border p-2 text-left">{c}</th>))}
          </tr>
        </thead>
        <tbody>
          {t.tableRows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) => (<td key={i} className="border p-2">{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500">{t.tableNote}</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">{t.timelineTitle}</h2>
      <ol className="list-decimal pl-5 my-3 space-y-2">
        {t.timeline.map(([k, v]) => (
          <li key={k}><strong>{k}</strong>：{v}</li>
        ))}
      </ol>

      <h2 className="text-2xl font-bold mt-8 mb-3">{t.atenaTitle}</h2>
      <p className="text-gray-700">{t.atenaBody}</p>

      <h2 className="text-2xl font-bold mt-8 mb-3">{t.faqTitle}</h2>
      {t.faqs.map((f, i) => (
        <p key={i} className="mb-3"><strong>Q{i + 1}: {f.q}</strong><br />A: {f.a}</p>
      ))}

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={waLink} target="_blank" rel="noopener" className="bg-[#25D366] text-white px-5 py-3 rounded-lg font-medium hover:opacity-90">{t.ctaQuote}</a>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-3">{t.relatedTitle}</h2>
      <ul className="list-disc pl-5 space-y-1">
        {t.related.map(([label, href]) => (
          <li key={href}><a href={href} className="text-[#1A56DB] underline">{label}</a></li>
        ))}
      </ul>
    </main>
  );
}
