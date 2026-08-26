// 2026-08-26 K3 15:20 拍板 (autoclaw 设计稿 1120px 容器 + 内容集中 + 设计美学): 修复 6f74771 容器太宽
// 改动: max-w 1320 → 1120, 4 数据卡 grid-cols-3 md:grid-cols-4 集中, 2 工厂图 aspect-ratio 限

import type { Locale } from '@/lib/seo';

type Props = { locale: Locale };

const i18n = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      eyebrow: '自有產能',
      h2: '自營工廠直印，不經中介，交期自己話事',
      lead: '印刷、後工、分揀、出貨全部喺自己廠房完成。通宵班次專為即日急件開機，唔使等外判，先至敢同你講「聽日中午前到」。',
      stats: [
        { v: '15', u: '年', label: '本地印刷經驗' },
        { v: '1,200+', u: '', label: '企業長期客戶' },
        { v: '24h', u: '', label: '急件承諾' },
        { v: '12', u: '', label: '大行業全覆蓋' },
      ],
      fig1Title: '海德堡 Speedmaster 6+1',
      fig1Desc: '德國原裝六色柯式印刷機 + 連線水性上光，海報/畫冊/包裝盒通用',
      fig2Title: 'HP Indigo 15K',
      fig2Desc: 'B2 高清超級白墨數碼印刷機，小批量急件 100 張起 2 小時出貨',
    },
    en: {
      eyebrow: 'In-house Capacity',
      h2: 'In-house factory direct, no middleman, schedule on our terms',
      lead: 'Printing, finishing, sorting and shipping all done in our own factory. Overnight shift dedicated for rush orders — no outsourcing, so we confidently promise next-day noon delivery.',
      stats: [
        { v: '15', u: 'yrs', label: 'Local print experience' },
        { v: '1,200+', u: '', label: 'Long-term enterprise clients' },
        { v: '24h', u: '', label: 'Rush SLA' },
        { v: '12', u: '', label: 'Industries served' },
      ],
      fig1Title: 'Heidelberg Speedmaster 6+1',
      fig1Desc: 'German 6-color offset press with inline aqueous coating, for posters, booklets, packaging',
      fig2Title: 'HP Indigo 15K',
      fig2Desc: 'B2 high-definition digital press with white ink, 100+ MOQ rush 2-hour ready',
    },
    ja: {
      eyebrow: '自社生産能力',
      h2: '自社工場直接印刷、仲介なし、納期は自社で管理',
      lead: '印刷・後加工・仕分け・出荷すべて自社工場で対応。徹夜シフトで当日特急専用、外注待ちなし。だから「明朝午前中お届け」を自信を持って約束。',
      stats: [
        { v: '15', u: '年', label: '印刷実績年数' },
        { v: '1,200+', u: '', label: '法人顧客' },
        { v: '24h', u: '', label: '特急 SLA' },
        { v: '12', u: '', label: '対応業界' },
      ],
      fig1Title: 'ハイデルベルク Speedmaster 6+1',
      fig1Desc: 'ドイツ製 6 色オフセット印刷機 + 連線水性コート，ポスター/冊子/包装対応',
      fig2Title: 'HP Indigo 15K',
      fig2Desc: 'B2 高精細スーパーホワイトインクデジタル印刷機，小ロット 100 枚〜 2 時間出荷',
    },
  } as const;
  return dict[locale];
};

export default function RushCapacity({ locale }: Props) {
  const d = i18n(locale);
  return (
    <section
      className="py-[104px] overflow-hidden text-white"
      style={{ background: '#0F1F3D' }}
      aria-label="自有工廠產能"
      data-section="rush-capacity"
    >
      {/* 1120px 容器 (autoclaw .wrap 模式, 居中, padding 0 24px) */}
      <div className="max-w-[1120px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-16 items-center">
        <div>
          <p className="text-[#7EA6FF] text-[13px] font-semibold tracking-[.12em] uppercase mb-3">{d.eyebrow}</p>
          <h2 className="text-[clamp(26px,3.4vw,38px)] font-extrabold mt-3 mb-0 leading-[1.2] tracking-tight">
            {d.h2}
          </h2>
          <p className="text-white/85 mt-[18px] text-[17px] leading-[1.8]">{d.lead}</p>

          {/* 4 数据浮层 (autoclaw cap-metrics: 3 列 grid 紧贴 1px line) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-[18px] mt-9">
            {d.stats.map((s, i) => (
              <div key={i} className="border-t border-white/20 pt-4">
                <div className="text-[30px] font-extrabold text-[#F87314] leading-none">
                  {s.v}
                  {s.u && <span className="text-base font-bold ml-1">{s.u}</span>}
                </div>
                <div className="text-white/70 text-[13.5px] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-[18px]">
          <figure className="relative rounded-2xl overflow-hidden aspect-[1200/472] shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <img
              src="/images/factory/factory-heidelberg.webp"
              alt={`即日印刷-${d.fig1Title}-智印港 ZprintPro`}
              width={1200}
              height={472}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.85)' }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 px-[22px] py-[22px] text-[13px] text-white/85"
              style={{ background: 'linear-gradient(180deg,transparent,rgba(10,20,40,.85))' }}
            >
              <div className="font-bold text-sm md:text-base">{d.fig1Title}</div>
              <div className="text-xs mt-1">{d.fig1Desc}</div>
            </figcaption>
          </figure>
          <figure className="relative rounded-2xl overflow-hidden aspect-[1200/472] shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <img
              src="/images/factory/factory-hpindigo.webp"
              alt={`即日印刷-${d.fig2Title}-智印港 ZprintPro`}
              width={1200}
              height={472}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.85)' }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 px-[22px] py-[22px] text-[13px] text-white/85"
              style={{ background: 'linear-gradient(180deg,transparent,rgba(10,20,40,.85))' }}
            >
              <div className="font-bold text-sm md:text-base">{d.fig2Title}</div>
              <div className="text-xs mt-1">{d.fig2Desc}</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
