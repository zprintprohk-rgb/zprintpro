'use client';

import React from 'react';
import { Clock, Truck, Headphones, Shield, Award, CreditCard, type LucideIcon } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface WhyChooseUsProps {
  locale: Locale;
}

interface FeatureConfig {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  iconBg: string;
  iconColor: string;
  /** hover 时图标容器的强调色 */
  hoverRing: string;
}

const translations: Record<Locale, { title: string; subtitle: string; features: FeatureConfig[] }> = {
  'zh-hk': {
    title: '為何選擇智印云',
    subtitle: '15,000+ 客戶的信賴之選',
    features: [
      {
        icon: Clock,
        title: '快速列印',
        subtitle: '3-5日交貨',
        description: '標準訂單3-5個工作天完成，特急服務最快24小時',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        hoverRing: 'group-hover:bg-blue-100',
      },
      {
        icon: Truck,
        title: '快速發貨',
        subtitle: '滿HK$500免運',
        description: '訂單滿HK$500即享免費送貨上門服務',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        hoverRing: 'group-hover:bg-emerald-100',
      },
      {
        icon: Headphones,
        title: '24小時支持',
        subtitle: '全天候服務',
        description: '專業客服團隊7x24小時在線，隨時為您解答',
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
        hoverRing: 'group-hover:bg-purple-100',
      },
      {
        icon: Shield,
        title: '準時交貨',
        subtitle: '99.5% 準時率',
        description: '嚴格的生產管理，確保每一份訂單準時交付',
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-600',
        hoverRing: 'group-hover:bg-orange-100',
      },
      {
        icon: Award,
        title: '品質保證',
        subtitle: '100% 滿意',
        description: '不滿意免費重印，品質問題全額退款',
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-600',
        hoverRing: 'group-hover:bg-rose-100',
      },
      {
        icon: CreditCard,
        title: '安全支付',
        subtitle: '多種支付方式',
        description: '支持信用卡、PayPal、銀行轉帳等多種支付方式',
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600',
        hoverRing: 'group-hover:bg-cyan-100',
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
        description: 'Standard orders completed in 3-5 business days, rush service in 24 hours',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        hoverRing: 'group-hover:bg-blue-100',
      },
      {
        icon: Truck,
        title: 'Fast Shipping',
        subtitle: 'Free over HK$500',
        description: 'Free delivery on orders over HK$500',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        hoverRing: 'group-hover:bg-emerald-100',
      },
      {
        icon: Headphones,
        title: '24/7 Support',
        subtitle: 'Always Available',
        description: 'Professional customer service team online 24/7',
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
        hoverRing: 'group-hover:bg-purple-100',
      },
      {
        icon: Shield,
        title: 'On-Time Delivery',
        subtitle: '99.5% On-Time',
        description: 'Strict production management ensures every order is delivered on time',
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-600',
        hoverRing: 'group-hover:bg-orange-100',
      },
      {
        icon: Award,
        title: 'Quality Guarantee',
        subtitle: '100% Satisfaction',
        description: 'Free reprint if not satisfied, full refund for quality issues',
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-600',
        hoverRing: 'group-hover:bg-rose-100',
      },
      {
        icon: CreditCard,
        title: 'Secure Payment',
        subtitle: 'Multiple Options',
        description: 'Credit card, PayPal, bank transfer and more',
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600',
        hoverRing: 'group-hover:bg-cyan-100',
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
        description: '標準注文は3-5営業日、特急サービスは最短24時間',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        hoverRing: 'group-hover:bg-blue-100',
      },
      {
        icon: Truck,
        title: '迅速な発送',
        subtitle: '500HK$以上送料無料',
        description: '500HK$以上の注文で送料無料',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        hoverRing: 'group-hover:bg-emerald-100',
      },
      {
        icon: Headphones,
        title: '24時間サポート',
        subtitle: '年中無休',
        description: 'プロのカスタマーサービスチームが24時間対応',
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
        hoverRing: 'group-hover:bg-purple-100',
      },
      {
        icon: Shield,
        title: '定時納品',
        subtitle: '99.5% 定時率',
        description: '厳格な生産管理で、すべての注文を定時に納品',
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-600',
        hoverRing: 'group-hover:bg-orange-100',
      },
      {
        icon: Award,
        title: '品質保証',
        subtitle: '100% 満足保証',
        description: '満足できない場合は無料再印刷、品質問題は全額返金',
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-600',
        hoverRing: 'group-hover:bg-rose-100',
      },
      {
        icon: CreditCard,
        title: '安全な支払い',
        subtitle: '複数の支払方法',
        description: 'クレジットカード、PayPal、銀行振込などに対応',
        iconBg: 'bg-cyan-50',
        iconColor: 'text-cyan-600',
        hoverRing: 'group-hover:bg-cyan-100',
      },
    ],
  },
};

export function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const t = translations[locale];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — 加渐变分割线 */}
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{t.title}</h2>
          <p className="text-slate-500 text-base">{t.subtitle}</p>
          {/* 渐变分割线 (20px 渐变到透明) */}
          <div className="mt-5 flex justify-center">
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
          </div>
        </div>

        {/* Features Grid — 6 宫格, 桌面 3 列 (中尺寸 2 列, 手机 1 列) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 hover:-translate-y-2"
              >
                {/* hover 时发光边框 (蓝色微光) */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-blue-400/30" />

                {/* 图标容器 — hover 时图标微旋转 6° + 容器底色加深 (基线色 token 不变) */}
                <div className={`w-14 h-14 ${feature.iconBg} ${feature.hoverRing} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                  <Icon className={`w-7 h-7 ${feature.iconColor}`} strokeWidth={2} />
                </div>

                {/* 文案层级 — 标题 hover 时渐变蓝色 (基线 token) */}
                <h3 className="text-xl font-bold text-slate-800 mt-6 transition-colors duration-300 group-hover:text-blue-600">{feature.title}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1.5">
                  {feature.subtitle}
                </p>
                <p className="text-slate-500 mt-3 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
