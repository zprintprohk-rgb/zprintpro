// 2026-08-26 K3 拍板 (gap-closure-card §2 Step 1) — verbatim 转设计稿 L266-311
// 6 场景卡: 展會物料 / 投標文件 / 活動海報 / 開業傳單 / 易拉寶急單 / 貼紙急單
// 验收 grep 钉死: 展會物料 / 投標文件 / 開業傳單 ≥3

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
    <section className="py-12 md:py-16" aria-label="即日印刷適用場景" data-section="rush-scenarios">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="inline-block bg-[#1A56DB] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{d.eyebrow}</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2">{d.h2}</h2>
        <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 max-w-3xl">{d.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {d.cards.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl bg-white border border-gray-200 p-6 hover:border-[#F87314] hover:shadow-lg transition-all"
            >
              {/* 26×26 内联 SVG (设计稿 L274/280/286/292/298/304) — 通用 building icon 简化示意 */}
              <div className="w-12 h-12 rounded-lg bg-orange-50 text-[#F87314] flex items-center justify-center mb-4">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">{c.desc}</p>
              <span className="inline-block text-xs font-bold text-[#F87314] bg-orange-50 px-3 py-1.5 rounded-full">
                ✓ {c.promise}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
