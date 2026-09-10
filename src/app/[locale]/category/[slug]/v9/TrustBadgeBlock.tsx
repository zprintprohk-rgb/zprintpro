import { Factory, Zap, Truck, Clock, ShieldCheck, Headphones, type LucideIcon } from 'lucide-react';
import { Locale } from '@/lib/seo';

/* ═══ 為何選擇智印港 — 信任色塊組件（TrustBadgeBlock） ═══
   - PLP / PDP 復用同一組件, 文案經 props 控制（默認 = 2026-09-09 唐總修訂輪2 指定替換文案）
   - 底色 = 6 步落單流程同款 #F2F6FF（修訂輪3 指定; 原皇家藏青 token 保留於 globals.css, 供 SpecFinder/CTA/Footer 引用） */

/** 品牌與服務介紹（修訂輪7 唐總逐字修訂 2026-09-10: HP Indigo 15K B2 / 1 小時打稿 / 急單即日出貨 / 撤 ISO 12647 / 一張起印;
 *  繁體化: 急單即日出貨; 站內其他位置（leadbar 6K/2 小時、CTA 2 小時、已服務客戶段 500 張起印）待唐總拍板是否同步） */
export const TRUST_COPY_INTRO =
  '智印港（ZprintPro）為彩龍印刷旗下國際印刷服務品牌，深圳自有工廠，服務香港及東南亞、美國、日本及全球客戶。廠房配備海德堡柯式印刷機組與 HP Indigo 15K B2 數碼產線，提交檔案後 1 小時內免費數碼打稿、平均 2.3 天出貨，急單即日出貨；FSC 認證紙材與 ISO 9001 認證把關品質。我們熟悉跨境印刷需求，提供 IP 保護、價格透明與全球物流支援，一張起印，靈活承接小批量與大宗訂單。';

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

/* v9.2.1 B2 (2026-09-10): en 版正文/物流/卡片 — 逐字复用站内现有 en 条目 (源文件注释标注, 非新造, 禁机翻):
   - intro: src/components/seo/RegionalContent.tsx L23 content.en.expertIntro (en 分类页在用)
   - logistics: RegionalContent.tsx L20 content.en.shipping
   - cards: src/components/ProductWhyChooseUs.tsx en.features (title/subtitle/description, en 产品页在用) */
const EN_INTRO =
  'ZprintPro is the international printing service brand of Cailong Printing. Operating from our Shenzhen production facility, we serve cross-border printing clients in the US, UK, Australia, Japan, and beyond. We understand the unique requirements of international printing and offer IP-protected, ISO-certified quality manufacturing with worldwide logistics support.';
const EN_LOGISTICS =
  'Worldwide shipping via DHL Express: 3-5 days to US/UK/Australia · 5-7 days to Europe · Tracking number provided';
const EN_CARDS: TrustCard[] = [
  { icon: Factory, title: 'Shenzhen ISO Factory', sub: '15+ Years Experience', desc: 'Owned production facility in Shenzhen, operated by Cailong Printing. ISO-certified quality manufacturing.' },
  { icon: Zap, title: 'Same-Day Delivery', sub: 'Rush 24h Available', desc: 'Standard 3-5 days, urgent orders same day' },
  { icon: Truck, title: 'DHL Express Direct', sub: 'Nationwide Coverage', desc: 'DHL door-to-door delivery across the US' },
  { icon: Clock, title: 'Free Sample', sub: 'Order with Confidence', desc: 'Free physical sample for bulk orders' },
  { icon: ShieldCheck, title: 'Quality Guarantee', sub: '100% Satisfaction', desc: 'Free reprint if not satisfied, full refund' },
  { icon: Headphones, title: '24/7 Support', sub: 'Always Available', desc: 'Professional customer service online 24/7' },
];

/* v9.2.1 B3 (2026-09-10): ja 版正文/物流/卡片 — 逐字复用站内现有 ja 条目 (源文件注释标注, 非新造, 禁机翻):
   - intro: src/components/seo/RegionalContent.tsx L30 content.ja.expertIntro (ja 分类页在用)
   - logistics: RegionalContent.tsx L27 content.ja.shipping
   - cards: src/components/ProductWhyChooseUs.tsx ja.features (title/subtitle/description, ja 产品页在用) */
const JA_INTRO =
  '智印港（ZprintPro）は、彩龍印刷が運営する国際印刷サービスブランドです。深圳自社工場から、DHL Express で日本を含む全世界へ高品質印刷を輸出しています。日本市場特有の品質基準への適合、厳密な納期管理、日本語対応スタッフによる丁寧なサポートで、深圳から日本への高品質印刷輸出を実現します。';
const JA_LOGISTICS =
  '深圳から日本へ国際配送（航空便3-5日、税関対応可）· DHL/FedEx追跡番号付き · 日本全国対応';
const JA_CARDS: TrustCard[] = [
  { icon: Factory, title: '深圳自社工場', sub: '15年以上の実績', desc: '彩龍印刷が運営する深圳自社工場、ISO認証取得の品質管理' },
  { icon: Zap, title: '即日納品', sub: '特急24時間対応', desc: '標準3-5営業日、急ぎは最短当日' },
  { icon: Truck, title: '国際配送', sub: '日本全国対応', desc: 'DHL・FedExで日本全国へ2〜4日配送' },
  { icon: Clock, title: '無料サンプル', sub: '安心の注文', desc: '大口注文で実物サンプルを無料提供' },
  { icon: ShieldCheck, title: '品質保証', sub: '100%満足保証', desc: '不満足な場合は無料再印刷、全額返金' },
  { icon: Headphones, title: '24時間サポート', sub: '年中無休対応', desc: 'プロのカスタマーサービスが24時間対応' },
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
  /** 語系 (B2 2026-09-10): 默認 zh-hk = 現行文案不變; en 走現有條目 (ProductWhyChooseUs en + RegionalContent en);
   *  ja (B3) 走 ProductWhyChooseUs ja + RegionalContent ja */
  locale?: Locale;
}

export function TrustBadgeBlock({
  eyebrow = 'Why ZprintPro',
  paragraphs,
  logistics,
  cards,
  variant = 'light',
  locale = 'zh-hk',
}: TrustBadgeBlockProps) {
  const navy = variant === 'navy';
  const en = locale === 'en';
  const ja = locale === 'ja';
  // en/ja: 正文/物流/卡片复用现有条目 (本地常量, 源见文件头注释)
  const resolvedParagraphs = paragraphs ?? (en ? [EN_INTRO] : ja ? [JA_INTRO] : [TRUST_COPY_INTRO]);
  const resolvedLogistics = logistics !== undefined ? logistics : en ? EN_LOGISTICS : ja ? JA_LOGISTICS : TRUST_COPY_LOGISTICS;
  const resolvedCards = cards ?? (en ? EN_CARDS : ja ? JA_CARDS : TRUST_CARDS);
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
              {en ? (
                <>Why Choose <em className="not-italic text-[#F87314]">ZprintPro</em></>
              ) : ja ? (
                <>なぜ<em className="not-italic text-[#F87314]">ZprintPro</em>を選ぶ？</>
              ) : (
                <>為何選擇<em className="not-italic text-[#F87314]">智印港</em></>
              )}
            </h2>
            {resolvedParagraphs.map((p, i) => (
              <p key={i} className={`mt-4 text-[16.5px] leading-[1.9] text-justify ${navy ? 'text-white/90' : 'text-[#3A4250]'}`}>
                {p}
              </p>
            ))}
            {resolvedLogistics && (
              <p className={`mt-4 pt-4 border-t text-[16.5px] leading-[1.8] font-bold ${navy ? 'border-white/15 text-white' : 'border-[#C9D6F2] text-[#2873F5]'}`}>
                {resolvedLogistics}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
            {resolvedCards.map((w) => (
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
