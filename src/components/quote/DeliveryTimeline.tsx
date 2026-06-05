/**
 * DeliveryTimeline — 5 节点水平交货时间轴
 * 标准（3-5天）/ 急件（24小时）两套，节点动态高亮
 * 已完成/当前/未完成 三态显示
 */

'use client';

import { Check, Zap, Clock } from 'lucide-react';
import { Locale } from '@/types/locale';

type Mode = 'standard' | 'express';

interface DeliveryTimelineProps {
  mode?: Mode;
  currentStep?: number; // 0-4, 当前已完成的最后一步（-1 表示刚开始）
  locale?: Locale;
}

const I18N: Record<Locale, { title: string; standard: string; express: string; steps: string[] }> = {
  'zh-hk': {
    title: '交貨時間預估',
    standard: '標準',
    express: '急件',
    steps: ['今天下單', '看稿確認', '生產印刷', '物流發貨', '送達收貨'],
  },
  en: {
    title: 'Delivery Timeline',
    standard: 'Standard',
    express: 'Express',
    steps: ['Order Today', 'Proof Approval', 'Production', 'Shipping', 'Delivered'],
  },
  ja: {
    title: '納期目安',
    standard: '通常',
    express: '特急',
    steps: ['本日注文', '校了確認', '印刷・製作', '発送', 'お届け'],
  },
};

export function DeliveryTimeline({
  mode = 'standard',
  currentStep = 1,
  locale = 'en',
}: DeliveryTimelineProps) {
  const t = I18N[locale] || I18N.en;
  const steps = t.steps;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          {t.title}
        </h4>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            mode === 'express'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {mode === 'express' && <Zap className="w-3 h-3" />}
          {mode === 'standard' ? t.standard : t.express}
        </span>
      </div>

      {/* 时间轴 */}
      <ol className="relative flex items-start justify-between">
        {steps.map((label, i) => {
          const isDone = i < currentStep;
          const isCurrent = i === currentStep;
          const isLast = i === steps.length - 1;
          return (
            <li key={i} className="flex-1 flex flex-col items-center text-center relative">
              {/* 连接线 */}
              {!isLast && (
                <div
                  className={`absolute top-3.5 left-1/2 right-0 h-0.5 -translate-y-1/2 ${
                    i < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                  aria-hidden="true"
                />
              )}
              {/* 节点 */}
              <div
                className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-blue-600 border-blue-600 text-white animate-pulse'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span
                className={`mt-2 text-[11px] md:text-xs leading-tight max-w-[64px] ${
                  isCurrent ? 'font-semibold text-blue-700' : isDone ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* 急件标签 */}
      {mode === 'express' && (
        <p className="mt-3 text-xs text-amber-700 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          ⚡ {locale === 'ja' ? '特急チャネル' : locale === 'en' ? 'Express Channel' : '急件通道'}
        </p>
      )}
    </div>
  );
}
