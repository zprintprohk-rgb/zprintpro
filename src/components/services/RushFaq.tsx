// 2026-08-26 K3 拍板 (gap-closure-card §2 Step 1) — verbatim 转设计稿 L367-398
// 6 条 FAQ 钉死 (⛔ 禁「自取點」, 设计稿用「港鐵站交收」+「我哋冇門市自取」)
// 验收 grep 钉死: FAQ 主实体 6 条 verbatim + 禁词 0

'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/seo';

type Props = { locale: Locale };

const i18n = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      eyebrow: '常見問題',
      h2: '即日印刷 FAQ',
      faqs: [
        { q: '即日印刷最快幾耐到？', a: '每日 18:00 前落單並確認稿件，即安排通宵印刷，順豐翌日中午 12:00 前送到，亦支持港鐵站交收。' },
        { q: '即日同普通件價錢差幾多？', a: '即日急件優先排產會有附加費，實際差價視乎品類同數量，WhatsApp 30 秒攞精準報價最準。' },
        { q: '過咗 18:00 仲得唔得？', a: '過咗截單時間可以 WhatsApp 我哋盡力協調，視乎排產情況安排，唔一定保證翌日中午前到。' },
        { q: '點樣收貨？', a: '順豐送貨上門或港鐵站交收都得，我哋冇門市自取，落單時揀啱收貨方式即可。' },
        { q: '要準備咩文件？', a: 'PDF 或 AI 檔，300dpi，預留 3mm 出血位。唔熟排版可以 WhatsApp 我哋，免費幫你檢查稿件。' },
        { q: '落單後可唔可以改稿？', a: '上機印刷前都可以免費改稿，開印後就冇得改，所以落單後請盡快確認最終版本。' },
      ],
    },
    en: {
      eyebrow: 'FAQ',
      h2: 'Same-Day Printing FAQ',
      faqs: [
        { q: 'How fast is same-day delivery?', a: 'Order before 6PM and confirm artwork, we arrange overnight print, SF Express delivers before noon next day, MTR station pickup also supported.' },
        { q: 'How much more is rush vs standard?', a: 'Rush priority production has a surcharge. Delta depends on product and quantity. 30-second WhatsApp quote is the fastest way.' },
        { q: 'Can I order after 6PM?', a: 'After cut-off please WhatsApp us, we will try to coordinate. Next-day-noon delivery is not guaranteed.' },
        { q: 'How do I receive?', a: 'SF Express door-to-door or MTR station pickup. No storefront self-pickup, choose your delivery method at order time.' },
        { q: 'What files do I need?', a: 'PDF or AI, 300dpi, 3mm bleed. Not sure about layout? WhatsApp us for free file check.' },
        { q: 'Can I change artwork after ordering?', a: 'Free revisions before printing. Once on press, no changes. Please confirm final version promptly.' },
      ],
    },
    ja: {
      eyebrow: 'よくあるご質問',
      h2: '当日印刷 FAQ',
      faqs: [
        { q: '当日印刷の最速納期は？', a: '毎日18時までのご注文で徹夜印刷、SF翌朝12時前配送、MTR駅受取も対応。' },
        { q: '通常印刷との価格差は？', a: '特急割増料金あり。差額は商品と数量により異なります。WhatsApp 30秒見積もりで確定。' },
        { q: '18時過ぎでも対応できますか？', a: '締切後は WhatsApp でご相談ください。状況により対応、翌日午前中配送は保証できません。' },
        { q: '配送方法は？', a: 'SF配送またはMTR駅受取。店舗受取はございません、ご注文時にお選びください。' },
        { q: '必要なデータは？', a: 'PDF または AI、300dpi、塗り足し 3mm。データ確認は WhatsApp で無料対応。' },
        { q: '発注後のデータ変更は？', a: '印刷開始前なら無料修正可能。刷了後は変更不可。最終版を速やかにご確認ください。' },
      ],
    },
  } as const;
  return dict[locale];
};

export default function RushFaq({ locale }: Props) {
  const d = i18n(locale);
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section className="py-12 md:py-16 bg-gray-50" aria-label="即日印刷常見問題" data-section="rush-faq">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="inline-block bg-[#1A56DB] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{d.eyebrow}</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-8 md:mb-12">{d.h2}</h2>

        <div className="space-y-3 max-w-4xl">
          {d.faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base md:text-lg">{f.q}</span>
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full bg-[#F87314] text-white text-xl leading-none transition-transform ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm md:text-base text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
