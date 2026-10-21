/**
 * コミケ C109 同人誌印刷 特設ページ（2026-12-29 ~ 31）
 * 背景: 两周方案 v2 §3 10/23-24（C107 专题 ja / 10/25 en）；刊次按官方口径 = C109（C107 为 2025 冬）
 * 真值口径（§0.23）: 10 冊/10 本から・A5/B5・表紙カラー＋本文モノクロ・標準 5-7 営業日・コミケ前 24 時間特急・DHL 2-4 日
 *                  単価 ¥7,500 起/部 は sku-seo-data.ts（doujinshi-printing）製品ページ価格表どおり、zh/en は価格を断定せず見積り導線
 * 禁止: GSC/pos/imps 黒話・「份」・虚偽の締切断定（主催者公式発表が優先）・新 SKU 追加なし
 */
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { generateWhatsAppLink } from '@/lib/whatsapp';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

type Props = { params: { locale: string } };

const META: Record<string, { title: string; desc: string; h1: string; sub: string }> = {
  ja: {
    title: 'コミケ C109 同人誌印刷 | 10冊から 12/29開幕 | ZprintPro',
    desc: 'コミケ C109（2026年12月29-31日・東京ビッグサイト）向け同人誌印刷。10冊から、A5/B5、表紙カラー＋本文モノクロ、標準5-7営業日、開幕前24時間特急、DHL2-4日。締切逆算表と入稿チェックリスト付き。',
    h1: 'コミケ C109 同人誌印刷',
    sub: '2026 年 12 月 29-31 日・東京ビッグサイト｜10 冊から｜標準 5-7 営業日｜開幕前 24 時間特急',
  },
  en: {
    title: 'Comiket C109 Doujinshi Printing | 10 MOQ | ZprintPro',
    desc: 'Doujinshi printing for Comiket C109 (Dec 29-31, 2026, Tokyo Big Sight): 10-copy minimum, A5/B5, colour cover with mono text, 5-7 working day standard production, 24-hour rush before the event, DHL 2-4 days. Deadline countdown and file checklist included.',
    h1: 'Comiket C109 Doujinshi Printing',
    sub: 'Dec 29-31, 2026 · Tokyo Big Sight | from 10 copies | 5-7 working days | 24-hour pre-event rush',
  },
  'zh-hk': {
    title: 'Comiket C109 同人誌印刷 | 10 本起 12/29 開幕 | 智印港',
    desc: 'Comiket C109（2026 年 12 月 29-31 日・東京ビッグサイト）同人誌印刷：10 本起印、A5／B5、封面彩色＋內頁單色、標準 5-7 個工作天、開幕前 24 小時特急、DHL 2-4 天。附截稿逆算表同交稿檢查清單。',
    h1: 'Comiket C109 同人誌印刷',
    sub: '2026 年 12 月 29-31 日・東京ビッグサイト｜10 本起印｜標準 5-7 個工作天｜開幕前 24 小時特急',
  },
};

type Block = { h: string; p?: string[]; ul?: string[]; table?: { head: string[]; rows: string[][] } };

const BODY: Record<string, { qa: string; blocks: Block[]; faq: { q: string; a: string }[]; cta: string }> = {
  ja: {
    qa: '直答：コミケ C109（2026 年 12 月 29-31 日）に間に合わせるなら、<b>12 月 7 日までに入稿</b>が安全圏です。同人誌は 10 冊から、A5/B5、表紙フルカラー＋本文モノクロ、標準 5-7 営業日、開幕前 24 時間特急、DHL 2-4 日。',
    blocks: [
      {
        h: '締切逆算カレンダー',
        p: ['開幕日から逆算するのがもっとも確実です。標準生産 5-7 営業日、国際配送（DHL）2-4 日、特急 24 時間。この 3 つの数字で 3 プランに整理できます。'],
        table: {
          head: ['プラン', '入稿', '出荷', '会場到着', '余裕'],
          rows: [
            ['ゆとり', '12/7（月）', '12/14〜12/16', '12/16〜12/20', '9 日以上'],
            ['標準', '12/14（月）', '12/21〜12/23', '12/23〜12/27', '2 日'],
            ['特急', '12/23（水）', '12/24', '12/26〜12/28', '1 日'],
          ],
        },
      },
      {
        h: '品目と価格の考え方',
        p: ['同人誌は表紙フルカラー＋本文モノクロが標準構成で、単価は ¥7,500 から（製品ページ価格表どおり）。実際の単価はページ数・部数・用紙・製本で変動するため、見積りで確定します。'],
        ul: ['同人誌：10 冊から／A5・B5（A4 も相談可）', 'ステッカー：10 枚から', 'ポスター・カード類：1 部から', 'まとめ発注なら校正も一括で回せます'],
      },
      {
        h: '入稿前チェックリスト',
        ul: [
          '塗り足し 3mm（表紙は四周）',
          '背幅はページ数×用紙の厚みで算出（表紙と本文は別ファイル推奨）',
          'CMYK で入稿（RGB のままは色が沈みます）',
          'フォントはアウトライン化',
          '仕上がりサイズで 300dpi 以上',
        ],
      },
      {
        h: '搬入と受け取り',
        p: ['印刷物は会場ではなく、前日までに手元（自宅・ホテル・倉庫）へ受け取るのが基本です。会場へはサークル入場後に手荷物として持ち込み、主催者の搬入案内に従ってください。'],
        ul: ['ホテル受け取り：チェックイン以降に届くよう指定', '知人・隣接サークル宛：台車の手配が 1 回で済む', '営業所留め置き：到着時刻が読みにくい場合の保険'],
      },
      {
        h: '当日のトラブルを減らす',
        ul: ['予備を 2-3 冊多めに刷る', 'グッズは本と同便でまとめる（片方だけ遅れると揃わない）', '特急はデータ完成が前提（デザインが動いている段階では前提にしない）'],
      },
    ],
    faq: [
      { q: 'コミケ C109 はいつ開催ですか？', a: '2026 年 12 月 29-31 日、東京ビッグサイトです。日程・搬入時刻は主催者の公式発表を必ずご確認ください。' },
      { q: '何冊から注文できますか？', a: '同人誌は 10 冊からです。ステッカーは 10 枚から、ポスター・カード類は 1 部から注文できます。' },
      { q: '開幕前に特急で間に合いますか？', a: 'データが完成していれば 24 時間特急に対応できます。ただし航空便・通関の遅延で 1 日ずれると当日に間に合わないため、12 月 7 日までの入稿をおすすめします。' },
      { q: '入稿から会場到着まで何日ですか？', a: '標準生産 5-7 営業日＋DHL 2-4 日で、入稿から最短 7 日・余裕を見て 12-14 日です。' },
    ],
    cta: '仕様が固まっていなくても相談できます。部数と締切から逆算して現実的なスケジュールを組みます。',
  },
  en: {
    qa: 'Direct answer: to be ready for Comiket C109 (December 29-31, 2026), <b>submit artwork by December 7</b> for a safe margin. Doujinshi starts at 10 copies, A5/B5, colour cover with mono text, 5-7 working days standard, 24-hour pre-event rush, DHL 2-4 days.',
    blocks: [
      {
        h: 'Deadline countdown',
        p: ['Work backwards from the opening day. Standard production is 5-7 working days, DHL delivery 2-4 days, and rush production 24 hours. Those three numbers give three plans.'],
        table: {
          head: ['Plan', 'Artwork in', 'Ships', 'Arrives', 'Buffer'],
          rows: [
            ['Relaxed', 'Dec 7 (Mon)', 'Dec 14-16', 'Dec 16-20', '9+ days'],
            ['Standard', 'Dec 14 (Mon)', 'Dec 21-23', 'Dec 23-27', '2 days'],
            ['Rush', 'Dec 23 (Wed)', 'Dec 24', 'Dec 26-28', '1 day'],
          ],
        },
      },
      {
        h: 'What you can order',
        p: ['Doujinshi standard build is a full-colour cover with monochrome text pages. Because the unit price moves with page count, quantity, paper and binding, the quote sets the final number — submit your spec and we price it precisely.'],
        ul: ['Doujinshi: from 10 copies, A5 / B5 (A4 on request)', 'Stickers: from 10 pieces', 'Posters and cards: from 1 piece', 'Combined orders share one proof round'],
      },
      {
        h: 'Artwork checklist',
        ul: ['3 mm bleed on all four sides of the cover', 'Spine width from page count × paper bulk (keep cover and text as separate files)', 'CMYK, never RGB', 'Fonts outlined', '300 dpi at final size'],
      },
      {
        h: 'Delivery and venue logistics',
        p: ['Goods should reach you before the event, not the venue. At the venue you carry them in as luggage after circle entry, following the organiser instructions.'],
        ul: ['Hotel delivery timed to check-in', 'Ship to a friend or neighbouring circle for one trolley run', 'Courier depot hold near the venue as a fallback'],
      },
      {
        h: 'Reducing day-one problems',
        ul: ['Print 2-3 spare copies', 'Ship goods in the same parcel as the books', 'Treat rush as a last resort, not a plan'],
      },
    ],
    faq: [
      { q: 'When is Comiket C109?', a: 'December 29-31, 2026 at Tokyo Big Sight. Always confirm dates and move-in times on the organiser official announcement.' },
      { q: 'What is the minimum order?', a: '10 copies for doujinshi, 10 pieces for stickers, and 1 piece for posters and cards.' },
      { q: 'Can rush production make a late deadline?', a: '24-hour rush works if the file is finished. A one-day flight or customs delay can still cost you the event, so December 7 intake is the safer target.' },
      { q: 'How long from artwork to arrival?', a: '5-7 working days of production plus 2-4 days DHL: about 7 days at best, 12-14 days with a comfortable margin.' },
    ],
    cta: 'Send your spec even if it is not final — we will work backwards from your copy count and deadline into a schedule that holds.',
  },
  'zh-hk': {
    qa: '直答：要趕上 Comiket C109（2026 年 12 月 29-31 日），<b>12 月 7 日前交稿</b>屬安全範圍。同人誌 10 本起印、A5／B5、封面彩色＋內頁單色、標準 5-7 個工作天、開幕前 24 小時特急、DHL 2-4 天。',
    blocks: [
      {
        h: '截稿逆算時間表',
        p: ['由開幕日倒推最穩陣。標準生產 5-7 個工作天、DHL 配送 2-4 天、特急 24 小時——三個數字可組成三個方案。'],
        table: {
          head: ['方案', '交稿', '出貨', '到場', '餘裕'],
          rows: [
            ['寬鬆', '12/7（一）', '12/14〜12/16', '12/16〜12/20', '9 日以上'],
            ['標準', '12/14（一）', '12/21〜12/23', '12/23〜12/27', '2 日'],
            ['特急', '12/23（三）', '12/24', '12/26〜12/28', '1 日'],
          ],
        },
      },
      {
        h: '可以訂什麼',
        p: ['同人誌標準配置為封面全彩＋內頁單色。單價按頁數、部數、紙材同裝訂計算，所以由報價確定最終數字——提交規格即出精準報價。'],
        ul: ['同人誌：10 本起印，A5／B5（A4 可商議）', '貼紙：10 張起印', '海報、卡片：1 張起印', '同一批落單可共用一次打稿'],
      },
      {
        h: '交稿檢查清單',
        ul: ['四邊出血 3mm（封面四周）', '書脊寬度按頁數×紙厚計算（封面與內頁分開檔案）', '必須用 CMYK，不要交 RGB', '字體轉外框', '成品尺寸下 300dpi 以上'],
      },
      {
        h: '收貨同會場搬入',
        p: ['印刷品應在活動前送到你手上（住所、酒店或倉庫），而不是直接送會場。會場內屬社團入場後以手提行李帶入，須依主辦方搬入指引。'],
        ul: ['酒店收貨：指定入住日之後到貨', '寄朋友／鄰近社團：當日只需一次推車', '會場附近營業所自取：到貨時間難掌握時的保險'],
      },
      {
        h: '減少當日出事',
        ul: ['多印 2-3 本備用', '周邊與本子同一批出貨（分開寄會有一邊未到）', '特急以檔案完成為前提，設計仍在改時不要當成方案'],
      },
    ],
    faq: [
      { q: 'Comiket C109 幾時舉行？', a: '2026 年 12 月 29-31 日，東京ビッグサイト。日期同搬入時間請以主辦方官方公告為準。' },
      { q: '最少印幾本？', a: '同人誌 10 本起印，貼紙 10 張起印，海報同卡片 1 張起印。' },
      { q: '臨近開幕可以用特急嗎？', a: '檔案完成的話可走 24 小時特急；但航班或通關延誤一日就會趕不上，所以建議 12 月 7 日前交稿。' },
      { q: '由交稿到收貨要幾日？', a: '標準生產 5-7 個工作天加 DHL 2-4 天，最快約 7 日，預留餘裕約 12-14 日。' },
    ],
    cta: '規格未定都可以先問——我們按部數同截稿倒推，給你一個行得通的時間表。',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = META[params.locale] ?? META.ja;
  return {
    title: m.title,
    description: m.desc,
    alternates: {
      canonical: `https://zprintpro.com/${params.locale}/comiket-c109/`,
      languages: {
        'zh-HK': 'https://zprintpro.com/zh-hk/comiket-c109/',
        en: 'https://zprintpro.com/en/comiket-c109/',
        ja: 'https://zprintpro.com/ja/comiket-c109/',
        'x-default': 'https://zprintpro.com/ja/comiket-c109/',
      },
    },
  };
}

export default function Page({ params }: Props) {
  const locale = params.locale;
  const meta = META[locale] ?? META.ja;
  const body = BODY[locale] ?? BODY.ja;
  const p = locale === 'zh-hk' ? '/zh-hk' : `/${locale}`;
  const wa = generateWhatsAppLink(
    (locale === 'ja' || locale === 'en' ? locale : 'zh-hk') as 'zh-hk' | 'en' | 'ja',
    { source: 'comiket-c109', productName: 'doujinshi-printing' }
  );

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://zprintpro.com${p}/` },
        { '@type': 'ListItem', position: 2, name: meta.h1, item: `https://zprintpro.com${p}/comiket-c109/` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: body.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={jsonLd} />
      <nav className="text-xs text-gray-500 mb-4">
        <a href={`${p}/`} className="hover:underline">Home</a>
        <span className="mx-2">/</span>
        <a href={`${p}/category/japan-doujin/`} className="hover:underline">同人誌・同人グッズ</a>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1D3465]">{meta.h1}</h1>
      <p className="mt-3 text-sm text-gray-600">{meta.sub}</p>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed">
        <p dangerouslySetInnerHTML={{ __html: body.qa }} />
      </div>

      {body.blocks.map((b, i) => (
        <section key={i} className="mt-8">
          <h2 className="text-xl font-semibold text-[#1D3465] border-l-4 border-[#1D3465] pl-3">{b.h}</h2>
          {b.p?.map((t, k) => (
            <p key={k} className="mt-3 text-[15px] leading-relaxed text-gray-700">{t}</p>
          ))}
          {b.ul && (
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[15px] text-gray-700">
              {b.ul.map((t, k) => <li key={k}>{t}</li>)}
            </ul>
          )}
          {b.table && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50 text-[#1D3465]">
                  <tr>{b.table.head.map((h, k) => <th key={k} className="text-left p-2 border-b">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {b.table.rows.map((r, k) => (
                    <tr key={k} className={k % 2 ? 'bg-gray-50/50' : ''}>
                      {r.map((c, j) => <td key={j} className="p-2 border-b border-gray-100">{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#1D3465] border-l-4 border-[#1D3465] pl-3">
          {locale === 'ja' ? 'よくあるご質問' : locale === 'en' ? 'Frequently asked questions' : '常見問題'}
        </h2>
        <dl className="mt-4 space-y-4">
          {body.faq.map((f, i) => (
            <div key={i}>
              <dt className="font-medium text-gray-900">{f.q}</dt>
              <dd className="mt-1 text-[15px] text-gray-700 leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 rounded-xl bg-[#1D3465] text-white p-6">
        <p className="text-sm leading-relaxed">{body.cta}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={wa} className="rounded-lg bg-white text-[#1D3465] px-4 py-2 text-sm font-medium">
            {locale === 'ja' ? 'WhatsApp で相談' : locale === 'en' ? 'Chat on WhatsApp' : 'WhatsApp 查詢'}
          </a>
          <a href={`${p}/quote/`} className="rounded-lg border border-white/60 px-4 py-2 text-sm">
            {locale === 'ja' ? '30 秒 AI 見積り' : locale === 'en' ? '30-second AI quote' : '30 秒 AI 報價'}
          </a>
          <a href={`${p}/product/doujinshi-printing/`} className="rounded-lg border border-white/60 px-4 py-2 text-sm">
            {locale === 'ja' ? '同人誌印刷の製品ページ' : locale === 'en' ? 'Doujinshi printing page' : '同人誌印刷產品頁'}
          </a>
        </div>
      </section>

      <p className="mt-8 text-xs text-gray-500">
        {locale === 'ja'
          ? '※ 開催日程・搬入時刻は主催者の公式発表をご確認ください。価格はページ数・部数・仕様により変動します。'
          : locale === 'en'
          ? 'Event dates and move-in times follow the organiser official announcement. Prices vary with page count, quantity and specification.'
          : '活動日期同搬入時間以主辦方官方公告為準；價格按頁數、部數同規格計算。'}
      </p>
    </main>
  );
}
