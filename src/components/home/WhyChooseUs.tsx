'use client';

import React from 'react';
import { Clock, Shield, Truck, Headphones, Palette, Leaf, Award, Zap } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface WhyChooseUsProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '為何選擇智印港',
    subtitle: '我們致力於提供卓越的印刷服務體驗',
    features: [
      {
        icon: Clock,
        title: '快速交貨',
        description: '標準訂單3-5個工作天，急單服務最快即日交貨',
      },
      {
        icon: Shield,
        title: '品質保證',
        description: '採用優質紙材和先進印刷技術，確保每件產品完美無瑕',
      },
      {
        icon: Truck,
        title: '免費送貨',
        description: '訂單滿$500即享免費送貨服務，覆蓋全香港',
      },
      {
        icon: Headphones,
        title: '專業客服',
        description: '經驗豐富的客服團隊，隨時解答您的疑問',
      },
      {
        icon: Palette,
        title: '免費設計支援',
        description: '專業設計師提供設計建議和文件檢查服務',
      },
      {
        icon: Leaf,
        title: '環保印刷',
        description: '使用環保油墨和可回收材料，愛護地球',
      },
      {
        icon: Award,
        title: '價格透明',
        description: '網上即時報價，無隱藏收費，價格公道',
      },
      {
        icon: Zap,
        title: '先進設備',
        description: '配備最新數碼和傳統印刷設備，滿足各種需求',
      },
    ],
  },
  en: {
    title: 'Why Choose ZPrintPro',
    subtitle: 'We are committed to providing an exceptional printing service experience',
    features: [
      {
        icon: Clock,
        title: 'Fast Delivery',
        description: 'Standard orders in 3-5 business days, rush orders available same-day',
      },
      {
        icon: Shield,
        title: 'Quality Guaranteed',
        description: 'Premium materials and advanced printing technology for flawless results',
      },
      {
        icon: Truck,
        title: 'Free Delivery',
        description: 'Free shipping on orders over $500, covering all of Hong Kong',
      },
      {
        icon: Headphones,
        title: 'Professional Support',
        description: 'Experienced customer service team ready to assist you',
      },
      {
        icon: Palette,
        title: 'Free Design Support',
        description: 'Professional designers provide advice and file checking services',
      },
      {
        icon: Leaf,
        title: 'Eco-Friendly',
        description: 'Using eco-friendly inks and recyclable materials',
      },
      {
        icon: Award,
        title: 'Transparent Pricing',
        description: 'Instant online quotes, no hidden fees, fair prices',
      },
      {
        icon: Zap,
        title: 'Advanced Equipment',
        description: 'Latest digital and offset printing equipment for all needs',
      },
    ],
  },
  ja: {
    title: 'ZPrintProを選ぶ理由',
    subtitle: '卓越した印刷サービス体験を提供することに全力を尽くしています',
    features: [
      {
        icon: Clock,
        title: '迅速な納品',
        description: '標準注文は3-5営業日、急ぎ注文は最短当日配送',
      },
      {
        icon: Shield,
        title: '品質保証',
        description: '優れた材料と先進的な印刷技術で完璧な仕上がりを',
      },
      {
        icon: Truck,
        title: '送料無料',
        description: '500ドル以上の注文で送料無料、香港全域対象',
      },
      {
        icon: Headphones,
        title: '専門サポート',
        description: '経験豊富なカスタマーサービスチームがサポート',
      },
      {
        icon: Palette,
        title: '無料デザイン支援',
        description: 'プロのデザイナーがアドバイスとファイルチェックを提供',
      },
      {
        icon: Leaf,
        title: 'エコフレンドリー',
        description: '環境に優しいインクとリサイクル可能な材料を使用',
      },
      {
        icon: Award,
        title: '透明な価格',
        description: 'オンライン即時見積もり、隠れた料金なし、公正な価格',
      },
      {
        icon: Zap,
        title: '先進設備',
        description: '最新のデジタル・オフセット印刷設備であらゆるニーズに対応',
      },
    ],
  },
};

export function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const t = translations[locale];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">{t.title}</h2>
          <p className="text-base text-[#666666] max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 border border-[#EEEEEE] hover:shadow-lg hover:border-[#2873F5]/20 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#2873F5]/10 to-[#F87314]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[#2873F5] group-hover:to-[#F87314] transition-all duration-300">
                <feature.icon className="w-7 h-7 text-[#2873F5] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-base text-[#333333] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#666666]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
