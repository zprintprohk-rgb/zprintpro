/**
 * QuantityTierInteractive — 产品页 "批量折扣" 可交互色块 (2026-07-13 替代纯展示版)
 *
 * 之前: QuantityTierTable 是死展示, 点 5 档卡片无反应, 价格硬编码 basePrice × tier.discount.
 * 现在: 每档是 button, 选中档 emerald ring 高亮; 价格实时按 QuoteCalculator 公式计算
 *       (复用 basePrice + quantity.discount, 跟 QuoteCalculator useMemo 公式一致).
 *
 * Props:
 *   - locale: Locale
 *
 * 数据从 useProductQuote() context 取 (2026-07-13 v3: 通过 ProductQuoteProvider 共享 quantity state)
 *
 * 设计:
 *   - 高度: h-full flex flex-col, 由父级 items-stretch 拉平
 *   - 选中态: emerald-400 border + ring-2 ring-emerald-200 + '最划算' 标签
 *   - 折扣价格: tier.discount < 1 时显示绿色 "節省 X%"; 1.0 时显示 "原價"
 *   - hover: 鼠标 hover 上去有 lift 阴影
 */

'use client';

import { useMemo } from 'react';
import { Locale } from '@/lib/seo';
import { useProductQuote } from './ProductQuoteProvider';

interface QuantityTierInteractiveProps {
  locale: Locale;
}

const CURRENCY: Record<Locale, { symbol: string; suffix: string; pcLabel: string; saveLabel: string }> = {
  'zh-hk': { symbol: 'HK$', suffix: '/張起', pcLabel: '張', saveLabel: '節省' },
  en: { symbol: '$', suffix: '/pc', pcLabel: 'pcs', saveLabel: 'Save' },
  ja: { symbol: '¥', suffix: '/枚〜', pcLabel: '枚', saveLabel: '節約' },
};

// 自适应列数 (5 档 → 5 列, 3 档 → 3 列, 等等)
function tierGridCols(n: number): string {
  if (n <= 1) return 'grid-cols-1';
  if (n === 2) return 'grid-cols-2';
  if (n === 3) return 'grid-cols-3';
  if (n === 4) return 'grid-cols-2 sm:grid-cols-4';
  return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5';
}

export function QuantityTierInteractive({ locale }: QuantityTierInteractiveProps) {
  const { product, selectedQuantity, setSelectedQuantity } = useProductQuote();
  const quantities = product.variables?.quantities;

  // Guard: 无 quantity 数据时不渲染
  if (!quantities || quantities.length === 0) {
    return null;
  }

  const cur = CURRENCY[locale] || CURRENCY['en'];

  // 按 quantity value 升序
  const tiers = useMemo(
    () => [...quantities].sort((a, b) => a.value - b.value),
    [quantities]
  );

  const displayTiers = tiers.slice(0, 5);
  const fullPrice = product.basePrice;
  const maxDiscount = Math.max(...tiers.map(t => 1 - t.discount));

  // 文案
  const i18n = {
    'zh-hk': {
      title: '批量折扣 — 買得越多越省',
      subtitle: '點選數量檔直接帶入報價單',
      bestValue: '最划算',
      list: '原價',
      helper: '💡 點選任意數量檔, 右邊報價即時更新',
    },
    en: {
      title: 'Volume Pricing — Buy More, Save More',
      subtitle: 'Click any tier to update the quote instantly',
      bestValue: 'Best Value',
      list: 'List',
      helper: '💡 Click any tier to update your quote on the right',
    },
    ja: {
      title: 'まとめ買い割引 — 大量注文で更にお得',
      subtitle: '数量帯をクリックすると見積もり自動更新',
      bestValue: 'ベスト',
      list: '定価',
      helper: '💡 数量帯をクリックすると右の見積もりが自動更新',
    },
  };
  const t = i18n[locale];

  return (
    <section
      className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-white to-blue-50 rounded-2xl border border-emerald-200 p-4 md:p-5"
      aria-label="Volume pricing — click to select quantity"
      data-testid="quantity-tier-interactive"
    >
      {/* 标题区 */}
      <div className="mb-3">
        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">💰</span>
          {t.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{t.subtitle}</p>
        {maxDiscount > 0 && (
          <p className="text-xs text-emerald-700 font-semibold mt-1">
            {locale === 'zh-hk'
              ? `最高可享 ${Math.round(maxDiscount * 100)}% 折扣`
              : locale === 'ja'
              ? `最大 ${Math.round(maxDiscount * 100)}% OFF`
              : `Up to ${Math.round(maxDiscount * 100)}% off`}
          </p>
        )}
      </div>

      {/* 5 档卡片 — 可点击 */}
      <ol className={`grid ${tierGridCols(displayTiers.length)} gap-2 md:gap-3 flex-1 items-stretch`}>
        {displayTiers.map((tier, idx) => {
          const unitPrice = fullPrice * tier.discount;
          const savePct = Math.round((1 - tier.discount) * 100);
          const isFirst = idx === 0;
          const isLast = idx === displayTiers.length - 1 && maxDiscount > 0;
          const isBestValue = isLast && savePct >= 20;
          const isSelected = selectedQuantity === tier.value;

          return (
            <li key={tier.value} className="flex">
              <button
                type="button"
                onClick={() => setSelectedQuantity(tier.value)}
                aria-pressed={isSelected}
                className={`relative w-full bg-white rounded-xl border p-2.5 md:p-3 flex flex-col items-center justify-center text-center transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-300 shadow-md'
                    : isBestValue
                    ? 'border-emerald-400 ring-2 ring-emerald-200'
                    : 'border-slate-200'
                }`}
              >
                {/* BEST VALUE 标签 / 占位 */}
                {isBestValue ? (
                  <div className="h-5 -mt-1 mb-1 flex items-center justify-center">
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                      {t.bestValue}
                    </span>
                  </div>
                ) : (
                  <div className="h-5 -mt-1 mb-1" aria-hidden="true" />
                )}

                {/* 选中态 ✓ 标识 */}
                {isSelected && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
                    ✓
                  </div>
                )}

                <p className="text-xs text-slate-500 mb-1">
                  {tier.value.toLocaleString()} {cur.pcLabel}
                </p>

                <div className="min-h-[3rem] flex flex-col items-center justify-center">
                  <p className="text-base md:text-lg font-extrabold text-slate-900 leading-tight">
                    {cur.symbol}
                    {unitPrice < 1
                      ? unitPrice.toFixed(2)
                      : Math.round(unitPrice * 100) / 100}
                    <span className="text-[10px] font-normal text-slate-500 ml-0.5">
                      {cur.suffix}
                    </span>
                  </p>
                  {savePct > 0 ? (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      {cur.saveLabel} {savePct}%
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400 mt-0.5">{t.list}</p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      {/* 底部 helper */}
      <p className="text-[11px] text-slate-400 mt-3 text-center">{t.helper}</p>
    </section>
  );
}
