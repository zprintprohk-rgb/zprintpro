// 2026-08-26 K3 拍板 (gap-closure-card §2 Step 1) — verbatim 转设计稿 L230-264
// 4 时刻: 18:00 你落單 / 22:00 印刷完成 / 06:00 分揀包裝 / 翌日 12:00 你收貨
// 验收 grep 钉死: 22:00 / 06:00 / 分揀包裝 ≥3

import type { Locale } from '@/lib/seo';

type Props = { locale: Locale };

const i18n = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      eyebrow: '即日時間軸',
      h2a: '今晚落單，',
      h2em: '聽朝收貨',
      steps: [
        { t: 'STEP 1', time: '18:00', d: '你落單\n確認稿件同付款' },
        { t: 'STEP 2', time: '22:00', d: '印刷完成\n全彩輸出落機' },
        { t: 'STEP 3', time: '06:00', d: '分揀包裝\n逐單核對出庫' },
        { t: 'STEP 4', time: '翌日 12:00', d: '你收貨\n順豐送達 / 港鐵站交收' },
      ],
      note: '每日 18:00 截單，過咗截單時間 WhatsApp 我哋，盡力幫你協調。',
    },
    en: {
      eyebrow: 'Same-Day Timeline',
      h2a: 'Order tonight, ',
      h2em: 'delivered tomorrow',
      steps: [
        { t: 'STEP 1', time: '6:00 PM', d: 'You order\nConfirm artwork & payment' },
        { t: 'STEP 2', time: '10:00 PM', d: 'Print complete\nCMYK output off-press' },
        { t: 'STEP 3', time: '6:00 AM', d: 'Sort & pack\nPer-order QC before ship' },
        { t: 'STEP 4', time: 'Next-day 12:00 PM', d: 'You receive\nSF Express / MTR pickup' },
      ],
      note: 'Daily 6PM cut-off. After 6PM WhatsApp us, we will do our best to coordinate.',
    },
    ja: {
      eyebrow: '当日印刷タイムライン',
      h2a: '今夜注文、',
      h2em: '明朝お届け',
      steps: [
        { t: 'STEP 1', time: '18:00', d: 'ご注文\nデータ確認とお支払い' },
        { t: 'STEP 2', time: '22:00', d: '印刷完了\nCMYK出力落機' },
        { t: 'STEP 3', time: '06:00', d: '仕分け梱包\n1件ずつ検品出荷' },
        { t: 'STEP 4', time: '翌日 12:00', d: 'お届け\nSF配送 / MTR駅受取' },
      ],
      note: '毎日18時締切。締切後は WhatsApp でご連絡ください、最善を調整します。',
    },
  } as const;
  return dict[locale];
};

export default function RushTimeline({ locale }: Props) {
  const d = i18n(locale);
  return (
    <section className="bg-[#F8FAFC] py-12 md:py-16" aria-label="即日印刷時間軸" data-section="rush-timeline">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="inline-block bg-[#1A56DB] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{d.eyebrow}</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-8 md:mb-12">
          {d.h2a}<em className="not-italic text-[#F87314]">{d.h2em}</em>
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {d.steps.map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {/* 橙圆点 (设计稿 L239/244/249/254) */}
              <span
                className="w-4 h-4 rounded-full bg-[#F87314] mb-3 ring-4 ring-orange-100"
                aria-hidden="true"
              />
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                <small className="block text-xs">{s.t}</small>
                <span className="text-2xl md:text-3xl font-extrabold text-gray-900 block mt-1">{s.time}</span>
              </div>
              <p className="text-sm text-gray-700 mt-2 whitespace-pre-line leading-relaxed">{s.d}</p>
              {/* 箭头 (设计稿 L258-260) — 仅在 md+ 显示, 移动端纵向隐藏 */}
              {i < d.steps.length - 1 && (
                <svg
                  className="hidden md:block absolute top-2 -right-2 w-6 h-6 text-[#F87314] z-10"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm md:text-base text-gray-600 text-center">{d.note}</p>
      </div>
    </section>
  );
}
