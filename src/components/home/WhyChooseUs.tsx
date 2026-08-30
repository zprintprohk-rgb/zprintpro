'use client';

import React from 'react';
import { Clock, Truck, Headphones, Shield, Award, CreditCard, ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface WhyChooseUsProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    eyebrow: '為何選擇智印港',
    titleLead: '15,000+ 客戶的',
    titleEm: '信賴之選',
    subtitle: '15 年本地印刷經驗，從落單到收貨，每一步都有專人把關。',
    momentEyebrow: '即日急件時刻',
    momentSegs: [
      { text: '18:00', bold: true },
      { text: ' 截單 → 翌日中午 ', bold: false },
      { text: '12:00', bold: true },
      { text: ' 前送達', bold: false },
    ],
    momentDesc: '標準訂單 3-5 個工作天完成；即日急件 18:00 截單，翌日中午 12:00 前送達。',
    momentCta: '即日急件',
    features: [
      { icon: Clock, title: '快速列印', subtitle: '3-5日交貨', description: '標準訂單 3-5 個工作天完成；即日急件 18:00 截單，翌日中午 12:00 前送達' },
      { icon: Truck, title: '快速發貨', subtitle: '滿$500免運', description: '訂單滿 HK$500，全港免費送貨上門' },
      { icon: Headphones, title: '24小時支持', subtitle: '全天候服務', description: 'WhatsApp 及電郵全天候受理查詢，深夜落單同樣有人跟進。' },
      { icon: Shield, title: '準時交貨', subtitle: '99.5%準時率', description: '嚴格生產排期管理，長期保持 99.5% 準時交貨紀錄' },
      { icon: Award, title: '品質保證', subtitle: '100%滿意', description: '不滿意免費重印，品質問題全額退款' },
      { icon: CreditCard, title: '安全支付', subtitle: '多種支付方式', description: '支持信用卡、PayPal、銀行轉帳等多種支付方式' },
    ],
  },
  en: {
    eyebrow: 'Why Choose ZprintPro',
    titleLead: 'Trusted by ',
    titleEm: '15,000+ Customers',
    subtitle: '15 years of local printing experience, with dedicated care at every step from order to delivery.',
    momentEyebrow: 'Same-Day Rush Deadline',
    momentSegs: [
      { text: 'Order by ', bold: false },
      { text: '6PM', bold: true },
      { text: ' → delivered by ', bold: false },
      { text: 'noon', bold: true },
      { text: ' next day', bold: false },
    ],
    momentDesc: 'Standard orders done in 3-5 business days; same-day rush: order by 6pm, delivered by noon next day.',
    momentCta: 'Same-Day Rush',
    features: [
      { icon: Clock, title: 'Fast Printing', subtitle: '3-5 Day Delivery', description: 'Standard 3-5 business days; same-day rush: order by 6pm, delivered by noon next day' },
      { icon: Truck, title: 'Fast Shipping', subtitle: 'Free over $500', description: 'Free door-to-door shipping on orders over $500' },
      { icon: Headphones, title: '24/7 Support', subtitle: 'Always Available', description: 'Professional customer service team online 24/7' },
      { icon: Shield, title: 'On-Time Delivery', subtitle: '99.5% On-Time', description: 'Strict production scheduling maintains our 99.5% on-time delivery record' },
      { icon: Award, title: 'Quality Guarantee', subtitle: '100% Satisfaction', description: 'Free reprint if not satisfied, full refund for quality issues' },
      { icon: CreditCard, title: 'Secure Payment', subtitle: 'Multiple Options', description: 'Support credit card, PayPal, bank transfer and more' },
    ],
  },
  ja: {
    eyebrow: 'ZprintProを選ぶ理由',
    titleLead: '15,000人以上のお客様に',
    titleEm: '信頼されています',
    subtitle: '15年の現地印刷経験。発注から納品まで、各ステップで専任スタッフがしっかりサポートします。',
    momentEyebrow: '即日印刷の締切',
    momentSegs: [
      { text: '18:00', bold: true },
      { text: ' 締切 → 翌日正午 ', bold: false },
      { text: '12:00', bold: true },
      { text: ' までにお届け', bold: false },
    ],
    momentDesc: '標準は3-5営業日で完成；即日印刷は18:00締切、翌日12時までにお届け。',
    momentCta: '即日印刷',
    features: [
      { icon: Clock, title: '迅速な印刷', subtitle: '3-5日で納品', description: '標準 3-5 営業日；即日印刷：18:00 締切、翌日 12 時着' },
      { icon: Truck, title: '迅速な発送', subtitle: '500ドル以上送料無料', description: '500ドル以上の注文で送料無料' },
      { icon: Headphones, title: '24時間サポート', subtitle: '年中無休', description: 'WhatsApp・メールで24時間受付。深夜のご注文も専任スタッフがフォローします' },
      { icon: Shield, title: '定時納品', subtitle: '99.5%定時率', description: '厳格な生産スケジュール管理で、99.5%の定時納品率を維持' },
      { icon: Award, title: '品質保証', subtitle: '100%満足保証', description: '満足できない場合は無料再印刷、品質問題は全額返金' },
      { icon: CreditCard, title: '安全な支払い', subtitle: '複数の支払方法', description: 'クレジットカード、PayPal、銀行振込などに対応' },
    ],
  },
};

const WHY_MOMENT_STYLE: React.CSSProperties = {
  background: 'linear-gradient(155deg, #26477F 0%, #1D3465 55%, #17284C 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12), 0 14px 30px rgba(15,31,61,.16)',
};

export function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const t = translations[locale];

  return (
    <section className="py-14 lg:py-[72px] bg-white" id="why">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-9 lg:gap-14 items-start">
          {/* Left column */}
          <div className="lg:sticky lg:top-[110px]">
            <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[.12em] uppercase text-[#2873F5] mb-3.5">
              <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" aria-hidden="true" />
              {t.eyebrow}
            </span>
            <h2 className="text-[26px] md:text-[32px] xl:text-[38px] font-extrabold leading-tight tracking-tight text-[#111827]">
              {t.titleLead}
              <em className="not-italic text-[#F87314]">{t.titleEm}</em>
            </h2>
            <p className="mt-3 text-base text-[#6B7280]">{t.subtitle}</p>

            {/* Moment card */}
            <div
              className="relative mt-9 rounded-2xl p-7 md:p-8 text-white overflow-hidden isolate"
              style={WHY_MOMENT_STYLE}
            >
              <span
                aria-hidden="true"
                className="absolute -top-[60px] -right-[50px] w-[220px] h-[220px] rounded-full pointer-events-none -z-10"
                style={{ background: 'radial-gradient(circle, rgba(93,144,235,.25), transparent 68%)' }}
              />
              <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[.12em] uppercase text-[#9DB8F5] mb-3">
                <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" aria-hidden="true" />
                {t.momentEyebrow}
              </span>
              <p className="text-[26px] md:text-[32px] xl:text-[38px] leading-tight font-extrabold tracking-tight">
                {t.momentSegs.map((seg, i) =>
                  seg.bold ? (
                    <b key={i} className="text-[#F87314] font-extrabold">{seg.text}</b>
                  ) : (
                    <React.Fragment key={i}>{seg.text}</React.Fragment>
                  )
                )}
              </p>
              <p className="mt-3 text-[14.5px] leading-[1.75] text-white/70">{t.momentDesc}</p>
              <a
                href={`/${locale}/services/rush-printing-delivery/`}
                className="inline-flex items-center gap-2 mt-5 rounded-xl px-[26px] py-[13px] text-[15px] font-bold text-white bg-[#F87314] hover:bg-[#e9660d] transition-colors shadow-[0_8px_24px_rgba(248,115,20,0.32)] whitespace-nowrap"
                data-event="rush_cta_click"
                data-source="home-why-choose-us"
                data-locale={locale}
              >
                {t.momentCta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right column: 6 feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
            {t.features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 bg-white border border-[#E5E7EB] rounded-2xl py-[22px] px-[20px] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(17,24,39,0.06)] hover:-translate-y-[3px] hover:border-[#d6e0f5]"
              >
                <div className="w-[52px] h-[52px] rounded-[14px] bg-[#2873F5] flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold text-[#111827]">{feature.title}</h3>
                  <p className="text-[13px] font-bold text-[#2873F5] mt-1 mb-1.5">{feature.subtitle}</p>
                  <p className="text-[13px] leading-[1.7] text-[#6B7280]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
