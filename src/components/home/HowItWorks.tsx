/**
 * HowItWorks — 首页 5 步流程图 (P0.3 en-US market local optimization)
 * 5-step process diagram, 3 locale support
 * Replaces 70% of US SMB buyer mental friction (per Sticker Mule / CustomStickers.com UX research)
 *
 * 5 steps:
 *   1. Choose Your Product (browse 84 SKUs × 14 categories)
 *   2. Upload Your Design (drag & drop PDF/PNG/AI up to 100MB)
 *   3. Free Proof in 4 hours (human review, unlimited revisions)
 *   4. Approve & Pay Securely (Stripe / PayPal / wire / WeChat)
 *   5. Free US Shipping on $99+ (5-7 day DHL Express door-to-door)
 *
 * 3 locale text: en (primary, US market targeted) / zh-hk / ja
 */

import { Locale } from '@/types/locale';

interface HowItWorksProps {
  locale: Locale;
}

interface Step {
  num: number;
  title: string;
  desc: string;
  icon: string;
}

const STEPS: Record<Locale, Step[]> = {
  en: [
    {
      num: 1,
      title: 'Choose Your Product',
      desc: 'Browse 84 SKUs across 14 categories. Stickers, packaging, paper bags, flyers, posters, and more — all with 30-second AI instant quote.',
      icon: '🛒',
    },
    {
      num: 2,
      title: 'Upload Your Design',
      desc: 'Drag & drop PDF / PNG / AI files up to 100MB. Our design team can also help — free basic design service for US orders.',
      icon: '📤',
    },
    {
      num: 3,
      title: 'Free Proof in 4 Hours',
      desc: 'Human review, unlimited revisions. 100% satisfaction guarantee. We send a digital proof to your email before any printing starts.',
      icon: '✅',
    },
    {
      num: 4,
      title: 'Approve & Pay Securely',
      desc: '30-second secure checkout. Stripe / PayPal / wire transfer / WeChat. 256-bit SSL encrypted. No hidden fees.',
      icon: '💳',
    },
    {
      num: 5,
      title: 'Free US Shipping on $99+',
      desc: '5-7 day DHL Express door-to-door delivery to USA. FedEx Ground option available. DDP customs-friendly — no surprise tariffs.',
      icon: '📦',
    },
  ],
  'zh-hk': [
    {
      num: 1,
      title: '選擇產品',
      desc: '14 個類別 84 個 SKU。貼紙、包裝盒、紙袋、傳單、海報等, 30 秒 AI 即時報價.',
      icon: '🛒',
    },
    {
      num: 2,
      title: '上傳設計檔案',
      desc: '拖放 PDF / PNG / AI 檔案 (最大 100MB)。設計團隊可協助排版, 首次落單免費基本設計服務.',
      icon: '📤',
    },
    {
      num: 3,
      title: '4 小時內免費打稿',
      desc: '人工審稿, 不限修改次數. 100% 滿意保證. 開印前電郵發送電子打稿給您確認.',
      icon: '✅',
    },
    {
      num: 4,
      title: '確認並安全付款',
      desc: '30 秒安全結帳. Stripe / PayPal / 銀行匯款 / 微信 / 支付寶. 256-bit SSL 加密. 零隱藏費用.',
      icon: '💳',
    },
    {
      num: 5,
      title: '港九新界免費速遞',
      desc: '順豐本地速遞 / DHL Express 5-7 天全球送達. 港九新界 $500+ 免費上門, 24 小時急件可選. DDP 關稅預付, 沒有意外稅費.',
      icon: '📦',
    },
  ],
  ja: [
    {
      num: 1,
      title: '商品を選ぶ',
      desc: '14 カテゴリー 84 SKU。ステッカー・パッケージ・紙袋・チラシ・ポスターなど、30 秒 AI 即時見積もり.',
      icon: '🛒',
    },
    {
      num: 2,
      title: 'デザインをアップロード',
      desc: 'PDF / PNG / AI ファイルをドラッグ&ドロップ (最大 100MB)。デザインサポートも無料 (全注文対応).',
      icon: '📤',
    },
    {
      num: 3,
      title: '4 時間以内に無料校正',
      desc: '人による校正、校了まで無制限. 100% 満足保証. 印刷前に電子校正をメールでお送りします.',
      icon: '✅',
    },
    {
      num: 4,
      title: '確認して安全決済',
      desc: '30 秒で安全チェックアウト. クレジットカード / PayPal / 銀行振込 / コンビニ決済. 256-bit SSL 暗号化.',
      icon: '💳',
    },
    {
      num: 5,
      title: '日本全国送料無料',
      desc: 'ヤマト運輸 / DHL Express 5-7 日でドア・ツー・ドア. 全国送料 0 円 / 沖縄・北海道も同料金. FedEx / ゆうパック 選択可. DDP 関税先払い対応.',
      icon: '📦',
    },
  ],
};

const HEADING: Record<Locale, { title: string; subtitle: string }> = {
  en: {
    title: 'How It Works',
    subtitle: '5 simple steps from order to door. Free US shipping on $99+. Free design proof in 4 hours. 100% satisfaction guarantee.',
  },
  'zh-hk': {
    title: '印刷流程',
    subtitle: '5 步由訂單到送達. 港九新界 $500+ 免費速遞. 4 小時免費打稿. 100% 滿意保證.',
  },
  ja: {
    title: 'ご注文の流れ',
    subtitle: '5 ステップで注文から納品まで. 全国送料 0 円. 4 時間無料校正. 100% 満足保証.',
  },
};

export function HowItWorks({ locale }: HowItWorksProps) {
  const steps = STEPS[locale] || STEPS['en'];
  const heading = HEADING[locale] || HEADING['en'];

  return (
<section
      className="bg-gradient-to-b from-slate-50 to-white py-8 md:py-12"
      aria-label="How it works - 5 steps"
      data-testid="how-it-works"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            {heading.title}
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
            {heading.subtitle}
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 relative">
          {steps.map((step, idx) => (
            <li
              key={step.num}
              className="relative bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Connector arrow for desktop (between steps) */}
              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-2 -translate-y-1/2 text-slate-300 z-10 text-2xl"
                  aria-hidden="true"
                >
                  →
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2873F5] text-white font-bold text-base flex items-center justify-center">
                  {step.num}
                </span>
                <span className="text-2xl" aria-hidden="true">{step.icon}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-[1.76]">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>

        {/* Bottom trust + CTA bar — 单行蓝色色条 (2026-07-11 PM+UX 复盘: 紧凑一行, 高度同 Hero CTA, 放在产品分类上方) */}
        <div className="mt-6 md:mt-8 bg-[#2873F5] rounded-xl py-3 px-5 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
          <p className="text-white text-xs sm:text-sm font-medium leading-snug text-center sm:text-left">
            {locale === 'zh-hk'
              ? '15+ 年印刷經驗 · ISO 9001 認證 · 5000+ 全球客戶 · 100+ 國家發貨'
              : locale === 'ja'
              ? '15+ 年の印刷実績 · ISO 9001 認証 · 5000+ グローバル顧客 · 100+ 国へ発送'
              : '15+ years in business · ISO 9001 certified · 5000+ global customers · Ships to 100+ countries'}
          </p>
          <a
            href={`/${locale}/quote/`}
            className="inline-flex items-center gap-1.5 text-white text-sm font-bold whitespace-nowrap hover:underline"
          >
            {locale === 'zh-hk' ? '免費獲取報價' : locale === 'ja' ? '無料見積もり' : 'Get Free Quote'}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
