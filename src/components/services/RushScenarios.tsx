// 2026-08-26 K3 拍板 (autoclaw 设计稿 verbatim 视觉优化): section 104px + sc-card 34px 28px padding + 52x52 蓝底白字 icon + promise pill
// 数据来源: .cluster/rush-page-20260826/deliverable-A-rush-page.html L266-311 + K3 15:09 上传附件

import type { Locale } from '@/lib/seo';

type Props = { locale: Locale };

const i18n = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      eyebrow: '邊啲情況啱用',
      h2: '臨急任務，交畀我哋',
      sub: '趕工最怕冇人接。以下場景全部支援 18:00 截單、翌日中午前送到。',
      cards: [
        { title: '展會物料', desc: '聽日開 show，今日先醒起。傳單、海報、易拉寶一晚搞掂。', promise: '今日 18:00 前確認，聽日中午前到場' },
        { title: '投標文件', desc: '截標前最後一刻補印，小批量彩色文件即日完成。', promise: '今日 18:00 前確認，聽日中午前到場' },
        { title: '活動海報', desc: 'A3 / A2 大圖海報，防水材質，戶外貼都冇問題。', promise: '今日 18:00 前確認，聽日中午前到場' },
        { title: '開業傳單', desc: '新店聽日開張，傳單今日先到齊，一樣趕得切派街。', promise: '今日 18:00 前確認，聽日中午前到場' },
        { title: '易拉寶急單', desc: '展架背景臨時要換，鋁合金支架 + 高清噴繪一晚起貨。', promise: '今日 18:00 前確認，聽日中午前到場' },
        { title: '貼紙急單', desc: '防水 / PVC / 透明貼紙，任意形狀模切，包裝標籤趕工首選。', promise: '今日 18:00 前確認，聽日中午前到場' },
      ],
    },
    en: {
      eyebrow: 'Use Cases',
      h2: 'Rush tasks, hand to us',
      sub: 'Last-minute jobs nobody wants. All scenarios support 6PM cut-off, next-day noon delivery.',
      cards: [
        { title: 'Trade Show', desc: 'Show opens tomorrow, just remembered today. Flyers, posters, banners in one night.', promise: 'Confirm by 6PM today, deliver by noon tomorrow' },
        { title: 'Tender Docs', desc: 'Last-minute re-print before tender close. Small-batch color docs same-day.', promise: 'Confirm by 6PM today, deliver by noon tomorrow' },
        { title: 'Event Poster', desc: 'A3 / A2 large format posters, waterproof material, suitable for outdoor use.', promise: 'Confirm by 6PM today, deliver by noon tomorrow' },
        { title: 'Opening Flyer', desc: 'New shop opens tomorrow, flyers arrive today, still on time for street distribution.', promise: 'Confirm by 6PM today, deliver by noon tomorrow' },
        { title: 'Roll-up Banner', desc: 'Banner background swap last-minute. Aluminum stand + HD print overnight.', promise: 'Confirm by 6PM today, deliver by noon tomorrow' },
        { title: 'Sticker Rush', desc: 'Waterproof / PVC / transparent, any shape die-cut, packaging label rush-first choice.', promise: 'Confirm by 6PM today, deliver by noon tomorrow' },
      ],
    },
    ja: {
      eyebrow: 'こんな時に便利',
      h2: '急ぎの案件は、私たちに',
      sub: '締め切り直前でも安心。下記シーンすべて18時締切・翌日午前中配送対応。',
      cards: [
        { title: '展示会場の備品', desc: '明日展示開始、今日気づく。チラシ・ポスター・バナーを一晩で。', promise: '本日18時までの確認で翌日午前中配送' },
        { title: '入札書類', desc: '入札直前の追加印刷、少ロットカラー書類も当日対応。', promise: '本日18時までの確認で翌日午前中配送' },
        { title: 'イベントポスター', desc: 'A3 / A2 大判ポスター、防水素材で屋外使用も安心。', promise: '本日18時までの確認で翌日午前中配送' },
        { title: '開業チラシ', desc: '明日開店、チラシ本日届く、配街も間に合います。', promise: '本日18時までの確認で翌日午前中配送' },
        { title: 'ロールアップバナー', desc: 'バナー背景の差し替え急務。アルミスタンド + 高画質印刷を一晩で。', promise: '本日18時までの確認で翌日午前中配送' },
        { title: 'ステッカー特急', desc: '防水 / PVC / 透明、任意形状トムソン、包装ラベルの特急に最適。', promise: '本日18時までの確認で翌日午前中配送' },
      ],
    },
  } as const;
  return dict[locale];
};

export default function RushScenarios({ locale }: Props) {
  const d = i18n(locale);
  return (
    <section
      className="py-[104px] bg-[#F9FAFB]"
      aria-label="即日印刷適用場景"
      data-section="rush-scenarios"
    >
      <div className="max-w-[1120px] mx-auto px-6">
        <p className="inline-flex items-center gap-2 text-[#2873F5] text-[13px] font-semibold tracking-[.12em] uppercase mb-3">
          <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" />
          {d.eyebrow}
        </p>
        <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold mt-3 mb-2 text-[#111827] leading-[1.2] tracking-tight">
          {d.h2}
        </h2>
        <p className="text-[#6B7280] max-w-[560px] mb-14 text-base md:text-lg leading-[1.6]">{d.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {d.cards.map((c) => (
            <article
              key={c.title}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-[34px] sm:p-7 hover:border-[#F87314] hover:shadow-[0_10px_30px_rgba(17,24,39,0.08)] transition-all"
              style={{ boxShadow: '0 10px 30px rgba(17,24,39,.06)' }}
            >
              {/* 52x52 蓝底白字 icon (autoclaw design — 醒目不刺眼) */}
              <div
                className="w-[52px] h-[52px] rounded-[14px] bg-[#2873F5] flex items-center justify-center text-white mb-5"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#111827] leading-[1.2] mb-2">{c.title}</h3>
              <p className="text-[14.5px] text-[#6B7280] mt-2 leading-[1.6]">{c.desc}</p>
              {/* promise pill (border-radius 99px, 橙底橙字) */}
              <span
                className="inline-flex items-center gap-[7px] mt-4 text-[14px] font-bold text-[#F87314] px-[14px] py-[7px] rounded-full"
                style={{ background: '#FEF1E6' }}
              >
                ✓ {c.promise}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
