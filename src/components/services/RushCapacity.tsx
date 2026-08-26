// 2026-08-26 K3 brief §S4: 产能信任区(车间图 + 数据浮层)
// 来源: deliverable-A-rush-page.html S4 + rush-nextjs-component-map.md
// F0 红线: 不删 SKU/文案,只新增车间图区
// 工厂图已就位: public/images/factory/factory-heidelberg.webp + factory-hpindigo.webp

import type { Locale } from '@/lib/seo';

type Props = {
  locale: Locale;
};

const t = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      title: '智印港產能保障',
      subtitle: '深圳龍崗自營工廠 · 4 條柯式生產線 · 2 條 HP Indigo 數碼線',
      heidelberg: '海德堡 Speedmaster 6+1',
      heidelbergDesc: '德國原裝六色柯式印刷機 + 連線水性上光,海報/畫冊/包裝盒通用',
      hpindigo: 'HP Indigo 15K',
      hpindigoDesc: 'B2 高清超級白墨數碼印刷,小批量急件 100 張起 2 小時出貨',
      stat1: '15',
      stat1Unit: '年印刷經驗',
      stat2: '1,200+',
      stat2Unit: '企業長期客戶',
      stat3: '24h',
      stat3Unit: '急件承諾',
      stat4: '12',
      stat4Unit: '大行業全覆蓋',
    },
    en: {
      title: 'ZprintPro Production Capacity',
      subtitle: 'Self-operated Shenzhen factory · 4 offset lines · 2 HP Indigo digital lines',
      heidelberg: 'Heidelberg Speedmaster 6+1',
      heidelbergDesc: 'German 6-color offset + inline aqueous coating for posters, booklets, packaging',
      hpindigo: 'HP Indigo 15K',
      hpindigoDesc: 'B2 high-definition digital press with white ink, 100+ MOQ rush 2-hour ready',
      stat1: '15',
      stat1Unit: 'Years in Printing',
      stat2: '1,200+',
      stat2Unit: 'Enterprise Clients',
      stat3: '24h',
      stat3Unit: 'Rush SLA',
      stat4: '12',
      stat4Unit: 'Industries Served',
    },
    ja: {
      title: 'ZprintPro 生産能力',
      subtitle: '深圳龍崗自社工場 · オフセット 4 ライン · HP Indigo デジタル 2 ライン',
      heidelberg: 'ハイデルベルク Speedmaster 6+1',
      heidelbergDesc: 'ドイツ製 6 色オフセット + 連線水性コート,ポスター/冊子/包装対応',
      hpindigo: 'HP Indigo 15K',
      hpindigoDesc: 'B2 高精細スーパーホワイトインク,小ロット 100 枚〜 2 時間出荷',
      stat1: '15',
      stat1Unit: '印刷実績年数',
      stat2: '1,200+',
      stat2Unit: '法人顧客',
      stat3: '24h',
      stat3Unit: '特急 SLA',
      stat4: '12',
      stat4Unit: '対応業界',
    },
  } as const;
  return dict[locale];
};

export default function RushCapacity({ locale }: Props) {
  const d = t(locale);
  return (
    <section
      className="mb-8 md:mb-12 rounded-2xl overflow-hidden"
      style={{ background: '#0F1F3D' }}
      data-section="rush-capacity"
    >
      <div className="px-6 md:px-10 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{d.title}</h2>
        <p className="text-sm md:text-base text-blue-100 mb-8 max-w-3xl">{d.subtitle}</p>

        {/* 4 项数据浮层 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { v: d.stat1, u: d.stat1Unit },
            { v: d.stat2, u: d.stat2Unit },
            { v: d.stat3, u: d.stat3Unit },
            { v: d.stat4, u: d.stat4Unit },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-[#F87314]">{s.v}</div>
              <div className="text-xs md:text-sm text-blue-100 mt-1">{s.u}</div>
            </div>
          ))}
        </div>

        {/* 2 张设备图 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <figure className="rounded-xl overflow-hidden bg-black/30">
            <img
              src="/images/factory/factory-heidelberg.webp"
              alt={`${d.heidelberg}-智印港 ZprintPro`}
              width={1200}
              height={845}
              loading="lazy"
              className="w-full h-48 md:h-64 object-cover"
            />
            <figcaption className="px-4 py-3 text-white">
              <div className="font-bold text-sm md:text-base">{d.heidelberg}</div>
              <div className="text-xs text-blue-100 mt-1">{d.heidelbergDesc}</div>
            </figcaption>
          </figure>
          <figure className="rounded-xl overflow-hidden bg-black/30">
            <img
              src="/images/factory/factory-hpindigo.webp"
              alt={`${d.hpindigo}-智印港 ZprintPro`}
              width={1200}
              height={472}
              loading="lazy"
              className="w-full h-48 md:h-64 object-cover"
            />
            <figcaption className="px-4 py-3 text-white">
              <div className="font-bold text-sm md:text-base">{d.hpindigo}</div>
              <div className="text-xs text-blue-100 mt-1">{d.hpindigoDesc}</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
