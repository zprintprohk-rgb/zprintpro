'use client';

import React from 'react';
import { Factory, Zap, Truck, Palette, Shield, Headphones } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface ProductWhyChooseUsProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '為何選擇智印雲？',
    features: [
      {
        icon: Factory,
        title: '觀塘實體工廠',
        subtitle: '15年本地經驗',
        subtitleColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-500',
        description: '香港觀塘工業區自營工廠，品質可控',
      },
      {
        icon: Zap,
        title: '即日交貨',
        subtitle: '特急24小時',
        subtitleColor: 'text-orange-500',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-500',
        description: '標準訂單3-5日，急件最快當天',
      },
      {
        icon: Truck,
        title: '順豐直達',
        subtitle: '全港覆蓋',
        subtitleColor: 'text-green-500',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-500',
        description: '順豐速運上門派送，快捷安全',
      },
      {
        icon: Palette,
        title: '免費打樣',
        subtitle: '滿意再下單',
        subtitleColor: 'text-purple-500',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-500',
        description: '批量訂單免費提供實物樣板確認',
      },
      {
        icon: Shield,
        title: '品質保證',
        subtitle: '100%滿意',
        subtitleColor: 'text-red-500',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-500',
        description: '不滿意免費重印，品質問題全額退款',
      },
      {
        icon: Headphones,
        title: '24小時支持',
        subtitle: '全天候服務',
        subtitleColor: 'text-cyan-500',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-500',
        description: '專業客服團隊7x24小時在線',
      },
    ],
  },
  'en': {
    title: 'Why Choose ZprintPro?',
    features: [
      {
        icon: Factory,
        title: 'HK ISO Factory',
        subtitle: '15+ Years Experience',
        subtitleColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-500',
        description: 'Own factory in Kwun Tong industrial district',
      },
      {
        icon: Zap,
        title: 'Same-Day Delivery',
        subtitle: 'Rush 24h Available',
        subtitleColor: 'text-orange-500',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-500',
        description: 'Standard 3-5 days, urgent orders same day',
      },
      {
        icon: Truck,
        title: 'SF Express Direct',
        subtitle: 'Island-wide Coverage',
        subtitleColor: 'text-green-500',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-500',
        description: 'SF Express door-to-door delivery across HK',
      },
      {
        icon: Palette,
        title: 'Free Sample',
        subtitle: 'Order with Confidence',
        subtitleColor: 'text-purple-500',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-500',
        description: 'Free physical sample for bulk orders',
      },
      {
        icon: Shield,
        title: 'Quality Guarantee',
        subtitle: '100% Satisfaction',
        subtitleColor: 'text-red-500',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-500',
        description: 'Free reprint if not satisfied, full refund',
      },
      {
        icon: Headphones,
        title: '24/7 Support',
        subtitle: 'Always Available',
        subtitleColor: 'text-cyan-500',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-500',
        description: 'Professional customer service online 24/7',
      },
    ],
  },
  'ja': {
    title: 'なぜZprintProを選ぶ？',
    features: [
      {
        icon: Factory,
        title: '香港実工場',
        subtitle: '15年以上の実績',
        subtitleColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-500',
        description: '観塘工業区に自社工場を持つ',
      },
      {
        icon: Zap,
        title: '即日納品',
        subtitle: '特急24時間対応',
        subtitleColor: 'text-orange-500',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-500',
        description: '標準3-5営業日、急ぎは最短当日',
      },
      {
        icon: Truck,
        title: '順豊直送',
        subtitle: '全港カバー',
        subtitleColor: 'text-green-500',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-500',
        description: '順豊速運で香港全域に配送',
      },
      {
        icon: Palette,
        title: '無料サンプル',
        subtitle: '安心の注文',
        subtitleColor: 'text-purple-500',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-500',
        description: '大口注文で実物サンプルを無料提供',
      },
      {
        icon: Shield,
        title: '品質保証',
        subtitle: '100%満足保証',
        subtitleColor: 'text-red-500',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-500',
        description: '不満足な場合は無料再印刷、全額返金',
      },
      {
        icon: Headphones,
        title: '24時間サポート',
        subtitle: '年中無休対応',
        subtitleColor: 'text-cyan-500',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-500',
        description: 'プロのカスタマーサービスが24時間対応',
      },
    ],
  },
};

export function ProductWhyChooseUs({ locale }: ProductWhyChooseUsProps) {
  const t = translations[locale];

  return (
    <div>
      <h3 className="text-lg font-bold text-[#333333] mb-6 text-center">
        {t.title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {t.features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
          >
            <div className={`w-12 h-12 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <h4 className="font-bold text-[#333333] text-base mb-1">{feature.title}</h4>
            <p className={`text-xs font-semibold ${feature.subtitleColor} mb-2`}>{feature.subtitle}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
