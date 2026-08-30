'use client';

import React from 'react';
import { Locale } from '@/lib/seo';

interface StatsBarProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    stats: [
      { value: '15,000+', label: '滿意客戶' },
      { value: '50+', label: '印刷產品' },
      { value: '99.5%', label: '準時交貨率' },
      { value: '4.9/5', label: '客戶評分' },
    ],
  },
  en: {
    stats: [
      { value: '15,000+', label: 'Happy Customers' },
      { value: '50+', label: 'Products' },
      { value: '99.5%', label: 'On-Time Rate' },
      { value: '4.9/5', label: 'Rating' },
    ],
  },
  ja: {
    stats: [
      { value: '15,000+', label: '満足のお客様' },
      { value: '50+', label: '製品' },
      { value: '99.5%', label: '定時率' },
      { value: '4.9/5', label: '評価' },
    ],
  },
};

export function StatsBar({ locale }: StatsBarProps) {
  const t = translations[locale];

  return (
    <section
      aria-label="stats"
      className="text-white py-[72px] lg:py-[116px]"
      style={{
        background: 'linear-gradient(165deg, #244780 0%, #1B3163 52%, #152649 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.10)',
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {t.stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center py-[26px] px-3 lg:py-[10px] lg:px-[34px] ${
                index % 2 === 1 ? 'border-l border-white/10' : ''
              } ${index > 0 ? 'lg:border-l lg:border-white/10' : ''}`}
            >
              <p className="text-[26px] lg:text-[34px] font-extrabold tracking-tight leading-none text-white">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[14.5px] font-semibold text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
