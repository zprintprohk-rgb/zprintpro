'use client';

/**
 * Quote Calculator v2 (Phase 3 — 多市场 + Gang Run + FX)
 * 2026-06-07
 *
 * 升级：
 * - 市场选择器（9 个市场）
 * - 多币种实时显示 + USD 折算
 * - FX 风险提示
 * - Gang Run 排版预览
 * - 净收入分析 (专业感)
 */

import { useState, useMemo, useDeferredValue, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calculator, Sparkles, Check, AlertCircle, Loader2, Globe, TrendingUp, AlertTriangle } from 'lucide-react';
import { quoteEngine } from '@/lib/quote-engine/engine';
import { BUSINESS_CARDS_CONFIG_V2 as BUSINESS_CARDS_CONFIG } from '@/lib/quote-engine/formulas/business-cards';
import { MARKETS, marketFromLocale, getMarket } from '@/lib/quote-engine/markets';
import type { MarketCode, Market } from '@/lib/quote-engine/markets';
import type { GangResult } from '@/lib/quote-engine/core';
import { GangPreview } from './GangPreview';
import { formatPriceByMarket } from '@/lib/quote-engine/tax';
import type { QuoteRequest, QuoteResult, FinishOption, Deadline } from '@/lib/quote-engine/types';

const formSchema = z.object({
  size: z.enum(['eu', 'us', 'au']),
  material: z.string().min(1, 'Please select a material'),
  finishes: z.array(z.string()).default([]),
  quantity: z.coerce.number().int().min(100, 'Minimum 100 cards').max(100000),
  deadline: z.enum(['standard', 'rush', 'same-day']),
  marketCode: z.enum(['HK', 'US', 'GB', 'AU', 'JP', 'CA', 'CN', 'SG', 'NZ']),
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

/** 市场国旗 emoji (轻量) */
const MARKET_FLAGS: Record<MarketCode, string> = {
  HK: '🇭🇰', US: '🇺🇸', GB: '🇬🇧', AU: '🇦🇺', JP: '🇯🇵',
  CA: '🇨🇦', CN: '🇨🇳', SG: '🇸🇬', NZ: '🇳🇿',
};

export function BusinessCardQuoteCalculator({ source = 'product', defaultLocale = 'en' }: { source?: string; defaultLocale?: 'zh-hk' | 'en' | 'ja' }) {
  const initialMarket = marketFromLocale(defaultLocale);
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
      marketCode: initialMarket,
    },
  });

  const watchedValues = form.watch();
  const deferredValues = useDeferredValue(watchedValues);
  const selectedMarket = getMarket(deferredValues.marketCode as MarketCode);

  // 实时价格计算（含 market 参数）
  const liveResult = useMemo<{
    result: (QuoteResult & { gangLayout?: GangResult; market?: Market; tax?: any; fx?: any }) | null;
    market: Market;
  }>(() => {
    const values = deferredValues;
    if (!values.material || values.quantity < 100) return { result: null, market: selectedMarket };
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
      const result = quoteEngine.calculate({ ...req, market: selectedMarket } as any);
      return { result, market: selectedMarket };
    } catch (e) {
      console.error('[QuoteEngine] calc error:', e);
      return { result: null, market: selectedMarket };
    }
  }, [deferredValues, selectedMarket]);

  async function onSubmit(values: FormValues) {
    if (!liveResult.result) return;
    setSubmitting(true);
    try {
      const m = selectedMarket;
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          size: SIZE_MAP[values.size as keyof typeof SIZE_MAP],
          unitPrice: liveResult.result.unitPrice,
          totalPrice: liveResult.result.totalPrice,
          market: m.code,
          currency: m.currency,
          source,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setResult({ ...liveResult.result, inquiryId: data.id });
        setSubmitSuccess(true);
      }
    } catch (e) {
      console.error('[QuoteEngine] submit error:', e);
    } finally {
      setSubmitting(false);
    }
  }

  const r = liveResult.result;
  const m = liveResult.market;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-6 h-6 text-[#2873F5]" />
        <h2 className="text-xl md:text-2xl font-bold text-[#333333]">
          Instant Quote · Premium Business Cards
        </h2>
      </div>

      {/* ★ 市场选择器 */}
      <div className="mb-5 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex items-center gap-2 mb-1.5">
          <Globe className="w-4 h-4 text-[#2873F5]" />
          <span className="text-sm font-semibold text-gray-700">Shipping to</span>
          <span className="text-xs text-gray-500">·</span>
          <span className="text-xs text-gray-500">Prices in {m.currency} · {m.displayName}</span>
        </div>
        <Controller
          control={form.control}
          name="marketCode"
          render={({ field }) => (
            <select
              {...field}
              onChange={(e) => {
                field.onChange(e);
              }}
              className="w-full px-3 py-2 bg-white border border-blue-200 rounded-md focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] text-sm font-medium"
            >
              {(Object.keys(MARKETS) as MarketCode[]).map((code) => {
                const mk = MARKETS[code];
                return (
                  <option key={code} value={code}>
                    {MARKET_FLAGS[code]} {mk.displayName} · {mk.currency} · Tax {mk.taxType === 'none' ? 'No' : `${(mk.taxRate * 100).toFixed(1)}%`}
                  </option>
                );
              })}
            </select>
          )}
        />
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
              {BUSINESS_CARDS_CONFIG.finishes.map((finish: string) => (
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
                {BUSINESS_CARDS_CONFIG.deadlines.map((d: string) => (
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
        {r && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            {/* ★ 多币种主价格 + USD 折算 */}
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm text-gray-600">Estimated Total</span>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#2873F5]">
                  {formatPriceByMarket(r.totalPrice, m.currency, m)}
                </div>
                {m.currency !== 'USD' && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    ≈ ${(r.totalPrice * 0.128).toFixed(2)} USD
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-xs text-gray-500">
                {formatPriceByMarket(r.unitPrice, m.currency, m)} per card
              </span>
              <span className="text-xs text-gray-500">
                Lead time {r.leadTimeHours.min}-{r.leadTimeHours.max}h
              </span>
            </div>

            {/* ★ FX 风险提示 + 净收入分析 (专业感) */}
            {r.tax && r.fx && (
              <div className="mb-3 p-2 bg-white/60 border border-blue-200 rounded text-xs space-y-1">
                <div className="flex items-center justify-between text-gray-600">
                  <span>{MARKET_FLAGS[m.code]} {m.displayName}</span>
                  <span className="font-mono">
                    {r.tax.taxLabel || 'No tax'} · {(r.fx.totalCostRatio ?? 0).toFixed(1)}% FX/payment fees
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>Net margin (after FX + shipping + tax)</span>
                  <span className="font-mono font-semibold text-green-700">
                    {(r.fx.netMargin ?? 0).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>FX risk buffer ({(m.fxRiskBuffer * 100).toFixed(1)}%)</span>
                  <span className="font-mono text-amber-700">
                    {formatPriceByMarket(r.totalPrice * m.fxRiskBuffer, m.currency, m)}
                  </span>
                </div>
              </div>
            )}

            {/* ★ Gang Run 排版预览 (杀手级体验) */}
            {r.gangLayout && (
              <div className="mt-4">
                <GangPreview
                  gang={r.gangLayout}
                  paperCostHKD={(r as { paperCostHKD?: number }).paperCostHKD || 4.2}
                  setupCostHKD={(r as { setupCostHKD?: number }).setupCostHKD || 300}
                />
              </div>
            )}

            {/* Breakdown */}
            <details className="mb-3">
              <summary className="text-xs text-gray-600 cursor-pointer hover:text-[#2873F5]">
                View price breakdown
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-gray-600">
                {r.breakdown.map((b: { label: string; amount: number; description?: string }, i: number) => (
                  <li key={i} className="flex justify-between">
                    <span>{b.label}</span>
                    <span className="font-mono">
                      {formatPriceByMarket(b.amount, m.currency, m)}
                      {m.currency !== 'USD' && (
                        <span className="text-gray-400 ml-1">(${b.amount.toFixed(2)})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </details>

            {/* Suggestions */}
            {r.suggestions.length > 0 && (
              <div className="space-y-2">
                {r.suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs bg-amber-50 border border-amber-200 rounded-lg p-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-900">{s.message}</p>
                      <p className="text-amber-700 font-semibold">
                        Save {formatPriceByMarket(s.savingsUsd, m.currency, m)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {r.warnings.length > 0 && (
              <div className="mt-3 space-y-1">
                {r.warnings.map((w, i) => (
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
          disabled={submitting || !r || (r.warnings && r.warnings.length > 0)}
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
              {m.currency === 'HKD'
                ? 'Get this quote emailed to me'
                : `Order for ${formatPriceByMarket(r?.totalPrice || 0, m.currency, m)}`}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
