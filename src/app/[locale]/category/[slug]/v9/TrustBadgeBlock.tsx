import { Factory, Zap, Truck, Clock, ShieldCheck, Headphones, type LucideIcon } from 'lucide-react';

/* ═══ 為何選擇智印港 — 信任色塊組件（TrustBadgeBlock） ═══
   - PLP / PDP 復用同一組件, 文案經 props 控制（默認 = 2026-09-09 唐總修訂輪2 指定替換文案）
   - 底色 = 6 步落單流程同款 #F2F6FF（修訂輪3 指定; 原皇家藏青 token 保留於 globals.css, 供 SpecFinder/CTA/Footer 引用） */

/** 品牌與服務介紹（修訂輪2 指定文案; 繁體化僅轉字形, 措辭逐字保留） */
export const TRUST_COPY_INTRO =
  '智印港（ZprintPro）為彩龍印刷旗下國際印刷服務品牌，深圳自有工廠，服務香港及東南亞、美國、日本及全球客戶。我們熟悉跨境印刷需求，提供 IP 保護、ISO 認證品質保證，以及全球物流支援。';

/** 物流承諾行（修訂輪2 指定文案: 本地 24 小時達 + DHL 全球 2-4 日） */
export const TRUST_COPY_LOGISTICS = '順豐香港本地送貨 · 港島/九龍/新界 24小時達 · DHL 全球 2-4 日';

export interface TrustCard {
  icon: LucideIcon;
  title: string;
  sub: string;
  desc: string;
}

/** 6 張信任卡片（文案 = ProductWhyChooseUs zh-hk 逐字, 圖標 = 首頁同款 lucide 白色圖標塊） */
export const TRUST_CARDS: TrustCard[] = [
  { icon: Factory, title: '深圳自有工廠', sub: '15年跨境經驗', desc: '彩龍印刷旗下品牌，深圳自有工廠生產，品質可控' },
  { icon: Zap, title: '即日交貨', sub: '特急24小時', desc: '標準訂單3-5日，急件最快當天' },
  { icon: Truck, title: '順豐直達', sub: '全港覆蓋', desc: '順豐速運上門派送，快捷安全' },
  { icon: Clock, title: '免費打樣', sub: '滿意再下單', desc: '批量訂單免費提供實物樣板確認' },
  { icon: ShieldCheck, title: '品質保證', sub: '100%滿意', desc: '不滿意免費重印，品質問題全額退款' },
  { icon: Headphones, title: '24小時支持', sub: '全天候服務', desc: '專業客服團隊7x24小時在線' },
];

export interface TrustBadgeBlockProps {
  /** 眉題（默認 Why ZprintPro） */
  eyebrow?: string;
  /** 正文段落（默認 = 指定品牌文案） */
  paragraphs?: string[];
  /** 物流承諾行（默認 = 指定物流文案; 傳空串可隱藏） */
  logistics?: string;
  /** 信任卡片（默認 = 6 張標準卡） */
  cards?: TrustCard[];
  /** 底色變體: light = 6 步落單流程同款 #F2F6FF（默認, PLP 用）; navy = 皇家藏青 token（修訂輪4, PDP 用） */
  variant?: 'light' | 'navy';
}

export function TrustBadgeBlock({
  eyebrow = 'Why ZprintPro',
  paragraphs = [TRUST_COPY_INTRO],
  logistics = TRUST_COPY_LOGISTICS,
  cards = TRUST_CARDS,
  variant = 'light',
}: TrustBadgeBlockProps) {
  const navy = variant === 'navy';
  return (
    <section className="max-w-[1320px] mx-auto px-6 mb-16">
      {/* light: 底色與圓角 = 6 步落單流程區同款（bg-[#F2F6FF] + rounded-[22px]）
          navy: 皇家藏青 token 底（--color-royal-navy-grad）+ inset 高光, 文字白色 */}
      <div
        className={`overflow-hidden rounded-[22px] p-7 md:p-10 ${navy ? 'text-white' : 'bg-[#F2F6FF]'}`}
        style={navy ? { background: 'var(--color-royal-navy-grad)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 30px rgba(15,31,61,0.24)' } : undefined}
      >
        <div className="grid gap-9 lg:grid-cols-[5fr_7fr] items-start">
          <div>
            <span className={`inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[.12em] uppercase mb-3.5 ${navy ? 'text-[#9DB8F5]' : 'text-[#2873F5]'}`}>
              <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" aria-hidden="true" />
              {eyebrow}
            </span>
            <h2 className={`text-[26px] md:text-[32px] font-extrabold leading-tight tracking-tight ${navy ? 'text-white' : 'text-[#111827]'}`}>
              為何選擇<em className="not-italic text-[#F87314]">智印港</em>
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className={`mt-4 text-[16.5px] leading-[1.9] text-justify ${navy ? 'text-white/90' : 'text-[#3A4250]'}`}>
                {p}
              </p>
            ))}
            {logistics && (
              <p className={`mt-4 pt-4 border-t text-[16.5px] leading-[1.8] font-bold ${navy ? 'border-white/15 text-white' : 'border-[#C9D6F2] text-[#2873F5]'}`}>
                {logistics}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
            {cards.map((w) => (
              <div
                key={w.title}
                className="flex items-start gap-4 bg-white border border-[#E5E7EB] rounded-2xl py-[22px] px-[20px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(17,24,39,0.06)] hover:-translate-y-[3px] hover:border-[#d6e0f5]"
              >
                <div className="w-[52px] h-[52px] rounded-[14px] bg-[#2873F5] flex items-center justify-center flex-shrink-0">
                  <w.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold text-[#111827]">{w.title}</h3>
                  <p className="text-[13px] font-bold text-[#2873F5] mt-1 mb-1.5">{w.sub}</p>
                  <p className="text-[13px] leading-[1.7] text-[#6B7280]">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
