'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface Step {
  name: string;
  text: string;
}

interface ProductHowToProps {
  steps: Step[];
  locale: Locale;
  productName: string;
}

const titles: Record<Locale, string> = {
  'zh-hk': '印刷流程',
  en: 'How It\'s Made',
  ja: '製作フロー',
};

export function ProductHowTo({ steps, locale, productName }: ProductHowToProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-[#333333] mb-6">{titles[locale]}</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
        
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex gap-4 md:gap-6">
              {/* Step number / icon */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#2873F5] text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {idx + 1}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-[#333333] mb-2">{step.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* HowTo JSON-LD is injected by parent */}
    </section>
  );
}
