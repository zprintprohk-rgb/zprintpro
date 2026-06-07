'use client';

/**
 * Quote Calculator v1 (Phase 1 MVP)
 * 2026-06-07 启动：第一个 SKU - Premium Business Cards
 *
 * 特性：
 * - react-hook-form + zod 验证
 * - 实时价格计算（debounced 200ms）
 * - 价格细分 + 优化建议
 * - 提交落 Supabase (quote_calculations table)
 * - 失败 fallback：纯客户端计算，不阻塞 UI
 */

import { useState, useMemo, useDeferredValue, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calculator, Sparkles, Check, AlertCircle, Loader2 } from 'lucide-react';
import { quoteEngine } from '@/lib/quote-engine/engine';
import { BUSINESS_CARDS_CONFIG } from '@/lib/quote-engine/formulas/business-cards';
import type { QuoteRequest, QuoteResult, FinishOption, Deadline } from '@/lib/quote-engine/types';

const formSchema = z.object({
  size: z.enum(['eu', 'us', 'au']),
  material: z.string().min(1, 'Please select a material'),
  finishes: z.array(z.string()).default([]),
  quantity: z.coerce.number().int().min(100, 'Minimum 100 cards').max(100000),
  deadline: z.enum(['standard', 'rush', 'same-day']),
});

type FormValues = z.infer<typeof formSchema>;

const SIZE_MAP = {
  eu: { w: 90, h: 54, unit: 'mm' as const },
  us: { w: 85, h: 55, unit: 'mm' as const },
  au: { w: 89, h: 51, unit: 'mm' as const },
};

const FINISH_LABELS: Record<FinishOption, string> = {
  'spot-uv': 'Spot UV',
  'foil': 'Foil Stamping',
  'emboss': 'Embossing',
  'rounded-corners': 'Rounded Corners',
  'matte-lamination': 'Matte Lamination',
  'gloss-lamination': 'Gloss Lamination',
};

const DEADLINE_LABELS: Record<Deadline, string> = {
  standard: 'Standard (5-7 days)',
  rush: 'Rush (2-3 days)',
  'same-day': 'Same-day (24h)',
};

export function BusinessCardQuoteCalculator({ source = 'product' }: { source?: string }) {
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: 'eu',
      material: BUSINESS_CARDS_CONFIG.materials[0],
      finishes: [],
      quantity: 500,
      deadline: 'standard',
    },
  });

  const watchedValues = form.watch();
  const deferredValues = useDeferredValue(watchedValues);

  // 实时价格计算（useDeferredValue 自动 debounce）
  const liveResult = useMemo<QuoteResult | null>(() => {
    const values = deferredValues;
    if (!values.material || values.quantity < 100) return null;
    const size = SIZE_MAP[values.size as keyof typeof SIZE_MAP];
    const req: QuoteRequest = {
      productSlug: BUSINESS_CARDS_CONFIG.slug,
      quantity: values.quantity,
      size,
      material: values.material,
      finishes: values.finishes as FinishOption[],
      deadline: values.deadline as Deadline,
    };
    try {
      return quoteEngine.calculate(req);
    } catch (e) {
      console.error('[QuoteEngine] calc error:', e);
      return null;
    }
  }, [deferredValues]);

  async function onSubmit(values: FormValues) {
    if (!liveResult) return;
    setSubmitting(true);
    try {
      // 落库：先调 API route 写 Supabase
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          size: SIZE_MAP[values.size as keyof typeof SIZE_MAP],
          unitPrice: liveResult.unitPrice,
          totalPrice: liveResult.totalPrice,
          source,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setResult({ ...liveResult, inquiryId: data.id });
        setSubmitSuccess(true);
      }
    } catch (e) {
      console.error('[QuoteEngine] submit error:', e);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-[#2873F5]" />
        <h2 className="text-xl md:text-2xl font-bold text-[#333333]">
          Instant Quote · Premium Business Cards
        </h2>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Size + Material row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Size</label>
            <Controller
              control={form.control}
              name="size"
              render={({ field }) => (
                <select {...field} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5]">
                  <option value="eu">Standard EU (90×54mm)</option>
                  <option value="us">Standard US (85×55mm)</option>
                  <option value="au">Standard AU (89×51mm)</option>
                </select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Material</label>
            <Controller
              control={form.control}
              name="material"
              render={({ field }) => (
                <select {...field} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5]">
                  {BUSINESS_CARDS_CONFIG.materials.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity (cards)</label>
          <input
            type="number"
            {...form.register('quantity')}
            min={100}
            step={100}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5]"
          />
          {form.formState.errors.quantity && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {form.formState.errors.quantity.message}
            </p>
          )}
        </div>

        {/* Finishes (multi-checkbox) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Finishes (optional)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {BUSINESS_CARDS_CONFIG.finishes.map((finish) => (
              <label
                key={finish}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-[#2873F5] has-[:checked]:border-[#2873F5] has-[:checked]:bg-blue-50"
              >
                <input
                  type="checkbox"
                  value={finish}
                  {...form.register('finishes')}
                  className="w-4 h-4 text-[#2873F5] rounded"
                />
                <span className="text-sm text-gray-700">{FINISH_LABELS[finish as FinishOption]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery</label>
          <Controller
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <div className="grid grid-cols-3 gap-2">
                {BUSINESS_CARDS_CONFIG.deadlines.map((d) => (
                  <label
                    key={d}
                    className="flex items-center justify-center px-3 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:border-[#2873F5] has-[:checked]:border-[#2873F5] has-[:checked]:bg-blue-50 has-[:checked]:text-[#2873F5] has-[:checked]:font-semibold"
                  >
                    <input type="radio" {...field} value={d} className="sr-only" />
                    <span className="text-sm">{DEADLINE_LABELS[d as Deadline]}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>

        {/* Live result */}
        {liveResult && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-sm text-gray-600">Estimated Total</span>
              <span className="text-3xl font-bold text-[#2873F5]">
                ${liveResult.totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-3">
              ${liveResult.unitPrice.toFixed(4)} per card · Lead time {liveResult.leadTimeHours.min}-{liveResult.leadTimeHours.max}h
            </div>

            {/* Breakdown */}
            <details className="mb-3">
              <summary className="text-xs text-gray-600 cursor-pointer hover:text-[#2873F5]">
                View price breakdown
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-gray-600">
                {liveResult.breakdown.map((b, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{b.label}</span>
                    <span className="font-mono">${b.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </details>

            {/* Suggestions */}
            {liveResult.suggestions.length > 0 && (
              <div className="space-y-2">
                {liveResult.suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs bg-amber-50 border border-amber-200 rounded-lg p-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-900">{s.message}</p>
                      <p className="text-amber-700 font-semibold">Save ${s.savingsUsd.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {liveResult.warnings.length > 0 && (
              <div className="mt-3 space-y-1">
                {liveResult.warnings.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-red-600">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || !liveResult || liveResult.warnings.length > 0}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2873F5] to-[#1E5FD1] text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving quote...
            </>
          ) : submitSuccess ? (
            <>
              <Check className="w-4 h-4" />
              Quote saved! We will contact you within 24h.
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4" />
              Get this quote emailed to me
            </>
          )}
        </button>
      </form>
    </div>
  );
}
