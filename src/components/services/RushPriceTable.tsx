// 2026-08-26 K3 15:20 拍板 (autoclaw 设计稿 1120px 容器 + 内容集中): 修复 6f74771 容器太宽 + 表内容散到边
// 改动: max-w 1320 → 1120, 表 4 列集中, 表头 bg #F3F6FC, 急件价用 tabular-nums + text-[#F87314]

import Link from 'next/link';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import type { Locale } from '@/lib/seo';

type Props = { locale: Locale };

const i18n = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      eyebrow: '價格速查',
      h2: '即日印刷價錢',
      sub: '100 張起印，實際單價以文件複雜度為準。',
      rows: [
        { cat: '傳單 A4 雙面 CMYK', moq: '100 張', std: '2-3 天', rush: '翌日 12:00 前', price: 'HK$0.25 / 張 起' },
        { cat: '海報 A1 單面 CMYK', moq: '10 張', std: '2-3 天', rush: '翌日 12:00 前', price: 'HK$15 / 張 起' },
        { cat: '貼紙 防水 Vinyl', moq: '100 張', std: '2-3 天', rush: '翌日 12:00 前', price: 'HK$0.22 / 張 起' },
        { cat: '紙袋 通用款', moq: '100 個', std: '3-5 天', rush: '翌日 12:00 前 (視乎後工)', price: 'HK$3 / 個 起' },
        { cat: '畫冊 騎馬釘 16P', moq: '10 本', std: '3-5 天', rush: '翌日 12:00 前', price: 'HK$8 / 本 起' },
        { cat: '易拉寶 80×200cm', moq: '1 個', std: '2-3 天', rush: '翌日 12:00 前', price: 'HK$35 / 個 起' },
      ],
      note: '包裝盒 / 信封屬常規 2-5 天交期，不適用隔夜達服務。急件請以 WhatsApp 確認後再下單。',
      cta: '💬 WhatsApp 攞報價',
    },
    en: {
      eyebrow: 'Price Quick Reference',
      h2: 'Same-Day Printing Price',
      sub: '100 MOQ, real price depends on file complexity.',
      rows: [
        { cat: 'Flyer A4 duplex CMYK', moq: '100 sheets', std: '2-3 days', rush: 'Next-day 12PM', price: 'from $0.04 / sheet' },
        { cat: 'Poster A1 simplex CMYK', moq: '10 sheets', std: '2-3 days', rush: 'Next-day 12PM', price: 'from $1.95 / sheet' },
        { cat: 'Sticker waterproof Vinyl', moq: '100 sheets', std: '2-3 days', rush: 'Next-day 12PM', price: 'from $0.06 / sheet' },
        { cat: 'Paper bag standard', moq: '100 pcs', std: '3-5 days', rush: 'Next-day 12PM (finishing-dependent)', price: 'from $0.40 / pc' },
        { cat: 'Booklet saddle-stitch 16P', moq: '10 copies', std: '3-5 days', rush: 'Next-day 12PM', price: 'from $1.05 / copy' },
        { cat: 'Roll-up banner 80×200cm', moq: '1 pc', std: '2-3 days', rush: 'Next-day 12PM', price: 'from $4.50 / pc' },
      ],
      note: 'Packaging boxes / envelopes are standard 2-5 day production, not eligible for overnight. Confirm via WhatsApp before rush order.',
      cta: '💬 WhatsApp for Quote',
    },
    ja: {
      eyebrow: '価格一覧',
      h2: '当日印刷料金',
      sub: '100 枚〜、実勢価格はデータ複雜度による。',
      rows: [
        { cat: 'チラシ A4 両面 CMYK', moq: '100 枚', std: '2-3 日', rush: '翌日 12 時前', price: '¥4 / 枚〜' },
        { cat: 'ポスター A1 片面 CMYK', moq: '10 枚', std: '2-3 日', rush: '翌日 12 時前', price: '¥195 / 枚〜' },
        { cat: 'ステッカー 防水 Vinyl', moq: '100 枚', std: '2-3 日', rush: '翌日 12 時前', price: '¥6 / 枚〜' },
        { cat: '紙袋 標準', moq: '100 個', std: '3-5 日', rush: '翌日 12 時前 (後加工による)', price: '¥40 / 個〜' },
        { cat: '冊子 中綴じ 16P', moq: '10 冊', std: '3-5 日', rush: '翌日 12 時前', price: '¥105 / 冊〜' },
        { cat: 'ロールアップバナー 80×200cm', moq: '1 個', std: '2-3 日', rush: '翌日 12 時前', price: '¥450 / 個〜' },
      ],
      note: 'パッケージ箱 / 封筒は通常 2-5 日生産、当日配送対象外。ご注文前に WhatsApp で確認。',
      cta: '💬 WhatsApp で見積もり',
    },
  } as const;
  return dict[locale];
};

export default function RushPriceTable({ locale }: Props) {
  const d = i18n(locale);
  const waHref = generateWhatsAppLink(locale as 'zh-hk' | 'en' | 'ja', {
    productName: locale === 'zh-hk' ? '急件報價' : locale === 'ja' ? '特急見積もり' : 'Rush Quote',
    source: 'rush-printing',
    extra: d.cta,
  });

  return (
    <section className="py-[104px] bg-white" aria-label="即日印刷價錢" data-section="rush-price-table">
      {/* 1120px 容器 (autoclaw .wrap 居中 + 集中) */}
      <div className="max-w-[1120px] mx-auto px-6">
        <p className="inline-flex items-center gap-2 text-[#2873F5] text-[13px] font-semibold tracking-[.12em] uppercase mb-3">
          <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" />
          {d.eyebrow}
        </p>
        <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold mt-3 mb-2 text-[#111827] leading-[1.2] tracking-tight">
          {d.h2}
        </h2>
        <p className="text-[#6B7280] mb-[52px] text-base md:text-lg leading-[1.6]">{d.sub}</p>

        {/* 表格 (autoclaw p-table: 圆角 14px + 1px line + overflow hidden + 急件列橙色高亮) */}
        <div className="rounded-[14px] border border-[#E5E7EB] overflow-hidden">
          <table className="w-full border-collapse text-[15px]">
            <thead style={{ background: '#F3F6FC' }}>
              <tr>
                <th className="text-left px-[18px] py-4 text-[#1a3f8f] font-bold text-[14px]">{locale === 'zh-hk' ? '品類' : locale === 'ja' ? '商品' : 'Product'}</th>
                <th className="text-left px-[18px] py-4 text-[#1a3f8f] font-bold text-[14px]">{locale === 'zh-hk' ? '起印量' : locale === 'ja' ? '最小ロット' : 'MOQ'}</th>
                <th className="text-left px-[18px] py-4 text-[#1a3f8f] font-bold text-[14px]">{locale === 'zh-hk' ? '標準交期' : locale === 'ja' ? '通常納期' : 'Standard'}</th>
                <th className="text-left px-[18px] py-4 text-[#1a3f8f] font-bold text-[14px]">{locale === 'zh-hk' ? '通宵交期' : locale === 'ja' ? '徹夜納期' : 'Overnight'}</th>
                <th className="text-left px-[18px] py-4 text-[#1a3f8f] font-bold text-[14px]">{locale === 'zh-hk' ? '急件價' : locale === 'ja' ? '特急価格' : 'Rush Price'}</th>
              </tr>
            </thead>
            <tbody>
              {d.rows.map((r, i) => (
                <tr key={i} className="border-t border-[#E5E7EB]">
                  <td className="px-[18px] py-4 font-bold text-[#111827]">{r.cat}</td>
                  <td className="px-[18px] py-4 text-[#111827]">{r.moq}</td>
                  <td className="px-[18px] py-4 text-[#6B7280]">{r.std}</td>
                  <td className="px-[18px] py-4 font-bold" style={{ background: '#FEF1E6', color: '#a14e0b' }}>
                    {r.rush}
                  </td>
                  <td className="px-[18px] py-4 font-bold tabular-nums" style={{ color: '#F87314' }}>{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3.5 text-[#6B7280] text-[13.5px] leading-[1.6]">{d.note}</p>

        {/* 表尾 CTA (autoclaw p-foot) */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-[#111827] text-[15px]">
            <b>{locale === 'zh-hk' ? '實際單價以文件複雜度為準' : locale === 'ja' ? '実勢価格はデータ複雜度による' : 'Real price depends on file complexity'}</b>
            {locale === 'zh-hk' ? ' — WhatsApp 30 秒攞精準報價' : locale === 'ja' ? ' — WhatsApp 30 秒見積もり' : ' — 30-sec WhatsApp quote'}
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-event="whatsapp_click"
            data-source="rush-printing"
            data-locale={locale}
            className="inline-flex items-center justify-center gap-2 bg-[#F87314] hover:bg-[#E56203] text-white font-bold rounded-xl px-7 py-3 text-[17px] transition-transform active:translate-y-px"
            style={{ boxShadow: '0 8px 24px rgba(248,115,20,.32)' }}
          >
            {d.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
