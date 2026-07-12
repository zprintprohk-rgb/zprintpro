/**
 * QuantityTierTable — 产品页价格梯度表 (P0.4 en-US market local optimization)
 * Shows "buy more save more" 5-tier pricing table to US SMB buyers
 * Per Vistaprint / MOO / CustomStickers.com UX research, this increases
 * AOV (Average Order Value) by 15-30% by visually anchoring the discount curve
 *
 * Conditions: only render when product.variables.quantities is present (37% of SKUs)
 * Fallback: if no quantities, return null (no visual noise)
 *
 * Props:
 *   - quantities: Array<{ value: number; label: string; discount: number }>
 *     value = quantity at this tier
 *     label = localized label (e.g. "100張" / "100 pcs" / "100枚")
 *     discount = multiplier (1.0 = full price, 0.75 = 25% off)
 *   - basePrice: number (HKD/USD/JPY per piece, currency inferred from locale)
 *   - locale: Locale (controls currency symbol + labels)
 */

import { Locale } from '@/types/locale';

interface QuantityTier {
  value: number;
  label: string;
  discount: number;
}

interface QuantityTierTableProps {
  quantities: QuantityTier[] | undefined;
  basePrice: number;
  locale: Locale;
}

const CURRENCY: Record<Locale, { symbol: string; suffix: string; pcLabel: string; saveLabel: string; offLabel: string; tableTitle: string; tableSubtitle: string }> = {
  'zh-hk': {
    symbol: 'HK$',
    suffix: '/張起',
    pcLabel: '張',
    saveLabel: '節省',
    offLabel: '折',
    tableTitle: '批量折扣 — 買得越多越省',
    tableSubtitle: '下表展示 5 個常用數量檔的單價折扣. 實際結算以即時報價為準.',
  },
  en: {
    symbol: '$',
    suffix: '/pc',
    pcLabel: 'pcs',
    saveLabel: 'Save',
    offLabel: 'off',
    tableTitle: 'Volume Pricing — Buy More, Save More',
    tableSubtitle: '5 popular quantity tiers with bulk discounts. Live quote at checkout for exact pricing.',
  },
  ja: {
    symbol: '¥',
    suffix: '/枚〜',
    pcLabel: '枚',
    saveLabel: '節約',
    offLabel: '引き',
    tableTitle: 'まとめ買い割引 — 大量注文で更にお得',
    tableSubtitle: '5 つの人気数量帯の単価割引. 正確な価格はチェックアウト時の見積もりで.',
  },
};

// Dynamic grid columns based on tier count (instead of fixed grid-cols-5)
function tierGridCols(n: number): string {
  if (n <= 1) return 'grid-cols-1';
  if (n === 2) return 'grid-cols-2';
  if (n === 3) return 'grid-cols-2 sm:grid-cols-3';
  if (n === 4) return 'grid-cols-2 sm:grid-cols-4';
  return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5';
}

export function QuantityTierTable({ quantities, basePrice, locale }: QuantityTierTableProps) {
  // Guard: only render if quantities data exists
  if (!quantities || quantities.length === 0) {
    return null;
  }

  const cur = CURRENCY[locale] || CURRENCY['en'];

  // Sort by value asc (50 → 100 → 250 → 500 → 1000)
  const tiers = [...quantities].sort((a, b) => a.value - b.value);

  // Limit to max 5 tiers (mobile-friendly)
  const displayTiers = tiers.slice(0, 5);

  // Compute savings vs first tier (no discount)
  const fullPrice = basePrice;
  const maxDiscount = Math.max(...tiers.map(t => 1 - t.discount));

  return (
    <section
      className="mt-6 bg-gradient-to-br from-emerald-50 via-white to-blue-50 rounded-2xl border border-emerald-200 p-5 md:p-6"
      aria-label="Volume pricing table"
      data-testid="quantity-tier-table"
    >
      <div className="mb-4">
        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">💰</span>
          {cur.tableTitle}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
          {cur.tableSubtitle}
        </p>
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

      {/* Dynamic grid: cols based on displayTiers.length, items-stretch ensures equal height */}
      <ol className={`grid ${tierGridCols(displayTiers.length)} gap-2 md:gap-3 items-stretch`}>
        {displayTiers.map((tier, idx) => {
          const unitPrice = fullPrice * tier.discount;
          const savePct = Math.round((1 - tier.discount) * 100);
          const isFirst = idx === 0;
          const isLast = idx === displayTiers.length - 1 && maxDiscount > 0;
          const isBestValue = isLast && savePct >= 20;

          return (
            <li
              key={tier.value}
              className={`relative bg-white rounded-xl border p-3 md:p-4 flex flex-col ${
                isBestValue
                  ? 'border-emerald-400 ring-2 ring-emerald-200'
                  : 'border-slate-200'
              }`}
            >
              {/* BEST VALUE label: inline-block (not absolute), so it sits at top of its OWN card uniformly */}
              {isBestValue ? (
                <div className="h-5 -mt-1 mb-1 flex items-center justify-center">
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                    {locale === 'zh-hk' ? '最划算' : locale === 'ja' ? 'ベスト' : 'Best Value'}
                  </span>
                </div>
              ) : (
                /* Reserved space for non-best cards so all cards align identically */
                <div className="h-5 -mt-1 mb-1" aria-hidden="true" />
              )}

              {/* Quantity label */}
              <p className="text-xs text-slate-500 mb-1 text-center">
                {tier.value.toLocaleString()} {cur.pcLabel}
              </p>

              {/* Price block: min-h keeps all cards uniform regardless of digit count */}
              <div className="min-h-[3.25rem] flex flex-col items-center justify-center text-center">
                <p className="text-lg md:text-xl font-extrabold text-slate-900 leading-tight">
                  {cur.symbol}
                  {unitPrice < 1
                    ? unitPrice.toFixed(2)
                    : Math.round(unitPrice * 100) / 100}
                  <span className="text-xs font-normal text-slate-500 ml-0.5">
                    {cur.suffix}
                  </span>
                </p>
                {savePct > 0 ? (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    {cur.saveLabel} {savePct}%
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-1">
                    {locale === 'zh-hk' ? '原價' : locale === 'ja' ? '定価' : 'List'}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Bottom helper text */}
      <p className="text-[11px] text-slate-400 mt-3 text-center">
        {locale === 'zh-hk'
          ? '💡 數量越大單價越低. 報價即時計算包含材質 / 工藝 / 尺寸調整.'
          : locale === 'ja'
          ? '💡 数量が多いほど単価が安くなります. 見積もりには素材・加工・サイズ調整が含まれます.'
          : '💡 Higher quantity = lower per-unit price. Live quote includes material, finishing & size adjustments.'}
      </p>
    </section>
  );
}
