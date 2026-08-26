// 2026-08-26 K3 拍板 (autoclaw 设计稿 verbatim 视觉优化): section 104px 大留白 + 4 时刻大字 + tl-step dot 14px ring 6px + tl-note 橙左条
// 数据来源: .cluster/rush-page-20260826/deliverable-A-rush-page.html L231-264 + K3 15:09 上传附件

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
    <section
      className="py-[104px] bg-white"
      aria-label="即日印刷時間軸"
      data-section="rush-timeline"
    >
      <div className="max-w-[1120px] mx-auto px-6">
        <p className="inline-flex items-center gap-2 text-[#2873F5] text-[13px] font-semibold tracking-[.12em] uppercase mb-3">
          <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" />
          {d.eyebrow}
        </p>
        <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold mt-3 mb-12 max-w-[640px] leading-[1.2] tracking-tight text-[#111827]">
          {d.h2a}<em className="not-italic text-[#F87314]">{d.h2em}</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {d.steps.map((s, i) => (
            <div
              key={i}
              className="relative pt-7 px-5 pb-2 text-left"
            >
              {/* dot 14px + 6px ring 橙色 (autoclaw design) */}
              <span
                className="absolute top-7 left-5 w-[14px] h-[14px] rounded-full bg-[#F87314] z-[2]"
                style={{ boxShadow: '0 0 0 6px #FEF1E6' }}
                aria-hidden="true"
              />
              {/* 数字大字 (clamp 26-38px, font-weight 800) */}
              <div className="mt-4 mb-1 text-[clamp(26px,3vw,38px)] font-extrabold text-[#111827] tracking-[-.02em] leading-none">
                <small className="block text-[13px] font-semibold text-[#F87314] tracking-[.08em] mb-1">
                  {s.t}
                </small>
                {s.time}
              </div>
              <p className="text-[#6B7280] text-[15px] leading-[1.6] whitespace-pre-line">{s.d}</p>

              {/* 箭头 (autoclaw design — 节点右侧, 灰色) */}
              {i < d.steps.length - 1 && (
                <svg
                  className="hidden md:block absolute top-[30px] -right-[14px] z-[3] text-[#D1D5DB]"
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

        {/* tl-note 橙左条 + bg-orange-light (autoclaw design) */}
        <div
          className="mt-11 px-[22px] py-[18px] rounded-r-xl text-[#7c3e10] text-[15px] font-medium border-l-4 border-[#F87314]"
          style={{ background: '#FEF1E6' }}
        >
          {d.note}
        </div>
      </div>
    </section>
  );
}
