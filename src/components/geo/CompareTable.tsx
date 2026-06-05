/**
 * CompareTable — 5 维度印刷材质对比
 * LLM/AI 搜索引擎最爱的语料结构
 * 使用 <th scope="col/row"> 增强语义 + 表格下方自然语言段落
 */

import { Locale } from '@/types/locale';

interface CompareTableProps {
  locale?: Locale;
}

interface Material {
  name: { 'zh-hk': string; en: string; ja: string };
  waterproof: { 'zh-hk': string; en: string; ja: string };
  sun: { 'zh-hk': string; en: string; ja: string };
  cost: { 'zh-hk': string; en: string; ja: string };
  best: { 'zh-hk': string; en: string; ja: string };
  recommended?: boolean;
}

const MATERIALS: Material[] = [
  {
    name: { 'zh-hk': 'PVC防水貼紙', en: 'PVC Waterproof Sticker', ja: 'PVC防水ステッカー' },
    waterproof: { 'zh-hk': '⭐⭐⭐⭐⭐', en: '⭐⭐⭐⭐⭐', ja: '⭐⭐⭐⭐⭐' },
    sun: { 'zh-hk': '⭐⭐⭐⭐ 戶外1-2年', en: '⭐⭐⭐⭐ Outdoor 1-2yr', ja: '⭐⭐⭐⭐ 屋外1-2年' },
    cost: { 'zh-hk': 'HK$0.55-2.20/張', en: 'HK$0.55-2.20/pc', ja: 'HK$0.55-2.20/枚' },
    best: { 'zh-hk': '戶外標籤、車身貼紙', en: 'Outdoor labels, vehicle decals', ja: '屋外ラベル、車体ステッカー' },
    recommended: true,
  },
  {
    name: { 'zh-hk': 'PP合成紙', en: 'PP Synthetic Paper', ja: 'PP合成紙' },
    waterproof: { 'zh-hk': '⭐⭐⭐⭐', en: '⭐⭐⭐⭐', ja: '⭐⭐⭐⭐' },
    sun: { 'zh-hk': '⭐⭐⭐ 戶外3-6月', en: '⭐⭐⭐ Outdoor 3-6mo', ja: '⭐⭐⭐ 屋外3-6月' },
    cost: { 'zh-hk': 'HK$0.38-1.50/張', en: 'HK$0.38-1.50/pc', ja: 'HK$0.38-1.50/枚' },
    best: { 'zh-hk': '食品標籤、化妝品貼紙', en: 'Food labels, cosmetic stickers', ja: '食品ラベル、化粧品ステッカー' },
  },
  {
    name: { 'zh-hk': '銅版紙', en: 'Coated Paper', ja: 'コート紙' },
    waterproof: { 'zh-hk': '⭐⭐', en: '⭐⭐', ja: '⭐⭐' },
    sun: { 'zh-hk': '⭐⭐ 室內為主', en: '⭐⭐ Indoor mainly', ja: '⭐⭐ 室内向け' },
    cost: { 'zh-hk': 'HK$0.22-0.80/張', en: 'HK$0.22-0.80/pc', ja: 'HK$0.22-0.80/枚' },
    best: { 'zh-hk': '宣傳單張、室內海報', en: 'Flyers, indoor posters', ja: 'チラシ、室内ポスター' },
  },
  {
    name: { 'zh-hk': '牛皮紙', en: 'Kraft Paper', ja: 'クラフト紙' },
    waterproof: { 'zh-hk': '⭐⭐', en: '⭐⭐', ja: '⭐⭐' },
    sun: { 'zh-hk': '⭐⭐ 室內為主', en: '⭐⭐ Indoor mainly', ja: '⭐⭐ 室内向け' },
    cost: { 'zh-hk': 'HK$0.30-1.00/張', en: 'HK$0.30-1.00/pc', ja: 'HK$0.30-1.00/枚' },
    best: { 'zh-hk': '咖啡店紙袋、文創包裝', en: 'Cafe bags, cultural packaging', ja: 'カフェ袋、クリエイティブ包装' },
  },
];

const I18N: Record<Locale, { title: string; caption: string; dimensions: string; waterproof: string; sun: string; cost: string; best: string; paragraph: { title: string; p1: string; p2: string; p3: string } }> = {
  'zh-hk': {
    title: '材質對比完全指南',
    caption: 'PVC、PP合成纸、铜版纸、牛皮纸的详细对比',
    dimensions: '對比維度',
    waterproof: '防水性',
    sun: '耐曬度',
    cost: '成本（每張）',
    best: '最佳用途',
    paragraph: {
      title: '如何選擇適合的印刷材質？',
      p1: '根據 ZPrintPro 15年印刷經驗，選擇材質需要考慮使用環境、預算和環保需求。',
      p2: '如果您需要戶外長期使用的標籤，PVC防水貼紙是最佳選擇，能承受日曬雨淋1-2年。',
      p3: '對於食品包裝或化妝品標籤，PP合成紙兼顧防水與成本，是性價比最高的選擇。',
    },
  },
  en: {
    title: 'Complete Material Comparison Guide',
    caption: 'Detailed comparison of PVC, PP synthetic paper, coated paper, and kraft paper',
    dimensions: 'Dimension',
    waterproof: 'Waterproof',
    sun: 'UV Resistance',
    cost: 'Cost (per pc)',
    best: 'Best Use',
    paragraph: {
      title: 'How to choose the right printing material?',
      p1: 'Based on ZPrintPro\u2019s 15 years of printing experience, material selection depends on the usage environment, budget, and eco requirements.',
      p2: 'For long-term outdoor use, PVC waterproof stickers are the best choice, withstanding sun and rain for 1-2 years.',
      p3: 'For food packaging or cosmetic labels, PP synthetic paper balances water resistance and cost — the best value choice.',
    },
  },
  ja: {
    title: '素材比較完全ガイド',
    caption: 'PVC、PP合成紙、コート紙、クラフト紙の詳細比較',
    dimensions: '比較項目',
    waterproof: '防水性',
    sun: '耐候性',
    cost: 'コスト（1枚）',
    best: '最適な用途',
    paragraph: {
      title: '印刷素材の選び方',
      p1: 'ZPrintPro の15年の印刷経験に基づき、素材は使用環境、予算、環境要件で選びます。',
      p2: '長期屋外使用には PVC防水ステッカーが最適で、日光と雨に1-2年耐えます。',
      p3: '食品包装や化粧品ラベルには PP合成紙が防水とコストのバランスに優れています。',
    },
  },
};

export function CompareTable({ locale = 'en' }: CompareTableProps) {
  const t = I18N[locale] || I18N.en;
  const mat = (m: Material, key: keyof Omit<Material, 'name' | 'recommended'>) => m[key][locale] || m[key].en;

  return (
    <section className="space-y-6" aria-label={t.title}>
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden text-sm">
        <caption className="sr-only">{t.caption}</caption>
        <thead className="bg-slate-100">
          <tr>
            <th scope="col" className="p-3 text-left font-semibold">{t.dimensions}</th>
            {MATERIALS.map((m, i) => (
              <th key={i} scope="col" className="p-3 text-left font-semibold">{m.name[locale] || m.name.en}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t hover:bg-blue-50/50">
            <th scope="row" className="p-3 font-medium text-slate-700 bg-slate-50">{t.waterproof}</th>
            {MATERIALS.map((m, i) => <td key={i} className="p-3">{mat(m, 'waterproof')}</td>)}
          </tr>
          <tr className="border-t hover:bg-blue-50/50">
            <th scope="row" className="p-3 font-medium text-slate-700 bg-slate-50">{t.sun}</th>
            {MATERIALS.map((m, i) => <td key={i} className="p-3">{mat(m, 'sun')}</td>)}
          </tr>
          <tr className="border-t hover:bg-blue-50/50">
            <th scope="row" className="p-3 font-medium text-slate-700 bg-slate-50">{t.cost}</th>
            {MATERIALS.map((m, i) => <td key={i} className="p-3">{mat(m, 'cost')}</td>)}
          </tr>
          <tr className="border-t hover:bg-blue-50/50">
            <th scope="row" className="p-3 font-medium text-slate-700 bg-slate-50">{t.best}</th>
            {MATERIALS.map((m, i) => (
              <td
                key={i}
                className={`p-3 ${m.recommended ? 'bg-emerald-50 border-l-4 border-emerald-500' : ''}`}
              >
                {mat(m, 'best')}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* 供 AI 抓取的自然语言段落 */}
      <article className="mt-6 text-slate-600 leading-relaxed text-sm md:text-base">
        <h3 className="text-lg font-semibold mb-3 text-slate-900">{t.paragraph.title}</h3>
        <p className="mb-2">{t.paragraph.p1}</p>
        <p className="mb-2">{t.paragraph.p2}</p>
        <p>{t.paragraph.p3}</p>
      </article>
    </section>
  );
}
