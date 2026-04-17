'use client';

import React from 'react';
import { Users, Package, Clock, Star } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface StatsBarProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    stats: [
      { icon: Users, value: '15,000+', label: '滿意客戶' },
      { icon: Package, value: '50+', label: '印刷產品' },
      { icon: Clock, value: '99.5%', label: '準時交貨率' },
      { icon: Star, value: '4.9/5', label: '客戶評分' },
    ],
  },
  en: {
    stats: [
      { icon: Users, value: '15,000+', label: 'Happy Customers' },
      { icon: Package, value: '50+', label: 'Products' },
      { icon: Clock, value: '99.5%', label: 'On-Time Rate' },
      { icon: Star, value: '4.9/5', label: 'Rating' },
    ],
  },
  ja: {
    stats: [
      { icon: Users, value: '15,000+', label: '満足のお客様' },
      { icon: Package, value: '50+', label: '製品' },
      { icon: Clock, value: '99.5%', label: '準時率' },
      { icon: Star, value: '4.9/5', label: '評価' },
    ],
  },
};

export function StatsBar({ locale }: StatsBarProps) {
  const t = translations[locale];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-6 px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {t.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4 justify-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-6 h-6 text-[#2873F5]" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-[#2873F5]">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
