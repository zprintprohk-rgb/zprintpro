'use client';

import React from 'react';
import { Clock, Truck, Headphones, Shield, Award, CreditCard } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface WhyChooseUsProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '為何選擇智印港',
    subtitle: '15,000+ 客戶的信賴之選',
    features: [
      {
        icon: Clock,
        title: '快速列印',
        subtitle: '3-5日交貨',
        subtitleColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-500',
        description: '標準訂單 3-5 個工作天完成；即日急件 18:00 截單，翌日中午 12:00 前送達',
      },
      {
        icon: Truck,
        title: '快速發貨',
        subtitle: '滿$500免運',
        subtitleColor: 'text-green-500',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-500',
        description: '訂單滿HK$500即享免費送貨上門服務',
      },
      {
        icon: Headphones,
        title: '24小時支持',
        subtitle: '全天候服務',
        subtitleColor: 'text-purple-500',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-500',
        description: '標準訂單 3-5 個工作天完成；即日急件 18:00 截單，翌日中午 12:00 前送達',
      },
      {
        icon: Shield,
        title: '準時交貨',
        subtitle: '99.5%準時率',
        subtitleColor: 'text-orange-500',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-500',
        description: '嚴格的生產管理，確保每一份訂單準時交付',
      },
      {
        icon: Award,
        title: '品質保證',
        subtitle: '100%滿意',
        subtitleColor: 'text-red-500',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-500',
        description: '不滿意免費重印，品質問題全額退款',
      },
      {
        icon: CreditCard,
        title: '安全支付',
        subtitle: '多種支付方式',
        subtitleColor: 'text-cyan-500',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-500',
        description: '支持信用卡、PayPal、銀行轉帳等多種支付方式',
      },
    ],
  },
  en: {
    title: 'Why Choose ZprintPro',
    subtitle: 'Trusted by 15,000+ Customers',
    features: [
      {
        icon: Clock,
        title: 'Fast Printing',
        subtitle: '3-5 Day Delivery',
        subtitleColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-500',
        description: 'Standard 3-5 business days; same-day rush: order by 6pm, delivered by noon next day',
      },
      {
        icon: Truck,
        title: 'Fast Shipping',
        subtitle: 'Free over $500',
        subtitleColor: 'text-green-500',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-500',
        description: 'Free US shipping on orders over $99',
      },
      {
        icon: Headphones,
        title: '24/7 Support',
        subtitle: 'Always Available',
        subtitleColor: 'text-purple-500',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-500',
        description: 'Professional customer service team online 24/7',
      },
      {
        icon: Shield,
        title: 'On-Time Delivery',
        subtitle: '99.5% On-Time',
        subtitleColor: 'text-orange-500',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-500',
        description: 'Strict production management ensures every order is delivered on time',
      },
      {
        icon: Award,
        title: 'Quality Guarantee',
        subtitle: '100% Satisfaction',
        subtitleColor: 'text-red-500',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-500',
        description: 'Free reprint if not satisfied, full refund for quality issues',
      },
      {
        icon: CreditCard,
        title: 'Secure Payment',
        subtitle: 'Multiple Options',
        subtitleColor: 'text-cyan-500',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-500',
        description: 'Support credit card, PayPal, bank transfer and more',
      },
    ],
  },
  ja: {
    title: 'ZprintProを選ぶ理由',
    subtitle: '15,000人以上のお客様に信頼されています',
    features: [
      {
        icon: Clock,
        title: '迅速な印刷',
        subtitle: '3-5日で納品',
        subtitleColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-500',
        description: '標準 3-5 営業日；即日印刷：18:00 締切、翌日 12 時着',
      },
      {
        icon: Truck,
        title: '迅速な発送',
        subtitle: '500ドル以上送料無料',
        subtitleColor: 'text-green-500',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-500',
        description: '500ドル以上の注文で送料無料',
      },
      {
        icon: Headphones,
        title: '24時間サポート',
        subtitle: '年中無休',
        subtitleColor: 'text-purple-500',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-500',
        description: '標準 3-5 営業日；即日印刷：18:00 締切、翌日 12 時着',
      },
      {
        icon: Shield,
        title: '定時納品',
        subtitle: '99.5%定時率',
        subtitleColor: 'text-orange-500',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-500',
        description: '厳格な生産管理で、すべての注文を定時に納品',
      },
      {
        icon: Award,
        title: '品質保証',
        subtitle: '100%満足保証',
        subtitleColor: 'text-red-500',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-500',
        description: '満足できない場合は無料再印刷、品質問題は全額返金',
      },
      {
        icon: CreditCard,
        title: '安全な支払い',
        subtitle: '複数の支払方法',
        subtitleColor: 'text-cyan-500',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-500',
        description: 'クレジットカード、PayPal、銀行振込などに対応',
      },
    ],
  },
};

export function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const t = translations[locale];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.title}</h2>
          <p className="text-base text-gray-500">{t.subtitle}</p>
        </div>

        {/* Features Grid - 6 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.map((feature, index) => (
            <div
              key={index}
              className={`group rounded-2xl border p-6 transition-all duration-300 text-center ${
                index === 0
                  ? 'bg-gradient-to-b from-orange-50/70 to-white border-orange-200 sm:col-span-2 lg:col-span-2 hover:shadow-xl hover:-translate-y-1'
                  : 'bg-white border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200'
              }`}
            >
              <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>
              <h3 className="font-bold text-[#333333] text-lg mb-1.5">{feature.title}</h3>
              <p className={`text-sm font-semibold ${feature.subtitleColor} mb-3`}>{feature.subtitle}</p>
              <p className="text-xs text-gray-500 leading-[1.76]">{feature.description}</p>
              {index === 0 && (
                <a
                  href={`/${locale}/services/rush-printing-delivery/`}
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-[#F87314] hover:underline"
                  data-event="rush_cta_click"
                  data-source="home-why-choose-us"
                  data-locale={locale}
                >
                  {locale === 'en' ? 'Same-Day Rush →' : locale === 'ja' ? '即日印刷 →' : '即日急件 →'}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
