'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Package, Clock, Star, type LucideIcon } from 'lucide-react';
import { Locale } from '@/lib/seo';

/**
 * CountUp 组件 — 视口触发滚动
 * 尊重 prefers-reduced-motion
 */
function CountUp({
  end,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setValue(end);
      startedRef.current = true;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(end * eased);
              if (progress < 1) requestAnimationFrame(tick);
              else setValue(end);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

interface StatsBarProps {
  locale: Locale;
}

interface StatConfig {
  icon: LucideIcon;
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  displayValue: string;
  label: string;
}

const translations: Record<Locale, { stats: StatConfig[] }> = {
  'zh-hk': {
    stats: [
      { icon: Users, numericValue: 15000, suffix: '+', displayValue: '15,000+', label: '滿意客戶' },
      { icon: Package, numericValue: 50, suffix: '+', displayValue: '50+', label: '印刷產品' },
      { icon: Clock, numericValue: 99.5, decimals: 1, suffix: '%', displayValue: '99.5%', label: '準時交貨率' },
      { icon: Star, numericValue: 4.9, decimals: 1, suffix: '/5', displayValue: '4.9/5', label: '客戶評分' },
    ],
  },
  en: {
    stats: [
      { icon: Users, numericValue: 15000, suffix: '+', displayValue: '15,000+', label: 'Happy Customers' },
      { icon: Package, numericValue: 50, suffix: '+', displayValue: '50+', label: 'Products' },
      { icon: Clock, numericValue: 99.5, decimals: 1, suffix: '%', displayValue: '99.5%', label: 'On-Time Rate' },
      { icon: Star, numericValue: 4.9, decimals: 1, suffix: '/5', displayValue: '4.9/5', label: 'Customer Rating' },
    ],
  },
  ja: {
    stats: [
      { icon: Users, numericValue: 15000, suffix: '+', displayValue: '15,000+', label: '満足のお客様' },
      { icon: Package, numericValue: 50, suffix: '+', displayValue: '50+', label: '製品' },
      { icon: Clock, numericValue: 99.5, decimals: 1, suffix: '%', displayValue: '99.5%', label: '準時納品率' },
      { icon: Star, numericValue: 4.9, decimals: 1, suffix: '/5', displayValue: '4.9/5', label: 'お客様評価' },
    ],
  },
};

export function StatsBar({ locale }: StatsBarProps) {
  const t = translations[locale];

  return (
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 仪表盘胶囊流: 4 个胶囊 + 3 条竖线分隔 */}
        <div className="flex flex-wrap items-center justify-center gap-y-3">
          {t.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <React.Fragment key={index}>
                {/* 胶囊指标 */}
                <div
                  className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-full"
                  aria-label={`${stat.displayValue} ${stat.label}`}
                >
                  <Icon className="w-5 h-5 text-blue-500 flex-shrink-0" strokeWidth={2} />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-slate-800 leading-none">
                      <CountUp
                        end={stat.numericValue}
                        decimals={stat.decimals ?? 0}
                        suffix={stat.suffix}
                      />
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      {stat.label}
                    </span>
                  </div>
                </div>
                {/* 竖线分隔 (最后一个不加) */}
                {index < t.stats.length - 1 && (
                  <div
                    className="hidden md:block h-8 w-px bg-slate-200 mx-1"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
