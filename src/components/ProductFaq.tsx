'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface FaqItem {
  q: string;
  a: string;
}

interface ProductFaqProps {
  items: FaqItem[];
  locale: Locale;
}

const titles: Record<Locale, string> = {
  'zh-hk': '常見問題',
  en: 'Frequently Asked Questions',
  ja: 'よくある質問',
};

export function ProductFaq({ items, locale }: ProductFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-[#333333] mb-6">{titles[locale]}</h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-[#333333] pr-4">{item.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === idx ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
