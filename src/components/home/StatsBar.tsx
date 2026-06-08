'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Package, Clock, Star, type LucideIcon } from 'lucide-react';
import { Locale } from '@/lib/seo';

/**
 * CountUp 组件 — 数字进入视口时从 0 滚动到目标值
 * 性能优化: 使用 requestAnimationFrame, 离屏/已触发后停止
 * a11y: 尊重 prefers-reduced-motion
 */
function CountUp({
  end,
  duration = 1800,
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

    // 尊重用户的减少动画偏好
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
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(end * eased);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setValue(end);
              }
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

  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
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
  /** 数字部分 (用于 CountUp) */
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** 原始显示值 (用于 a11y + reduce-motion fallback) */
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
    <section className="py-12 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {t.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center"
                aria-label={`${stat.displayValue} ${stat.label}`}
              >
                {/* 图标移到数字上方 */}
                <div className="mb-3 text-blue-500/50 group-hover:text-blue-500/80 transition-colors">
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                {/* 渐变大数字 — CountUp 动效 */}
                <div className="text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-none">
                  <CountUp
                    end={stat.numericValue}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix}
                  />
                </div>
                {/* 标签 */}
                <p className="text-slate-500 text-sm font-medium mt-2">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
