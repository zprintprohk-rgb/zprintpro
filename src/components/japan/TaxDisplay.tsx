/**
 * TaxDisplay — 日本价格显示（10% 消费税，税込/税抜 切换）
 */

'use client';

import { useState } from 'react';
import { includeTax, stripTax, formatJPY } from '@/lib/tax';

interface TaxDisplayProps {
  /** 基准价格（HKD or JPY），不含税 */
  basePrice: number;
  /** 货币符号，默认 ¥ */
  currency?: string;
}

export function TaxDisplay({ basePrice, currency = '¥' }: TaxDisplayProps) {
  const [incl, setIncl] = useState(true);
  const displayed = incl ? includeTax(basePrice) : basePrice;

  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-lg font-bold text-amber-600">
        {currency === '¥' ? formatJPY(displayed) : `${currency}${displayed.toLocaleString()}`}
      </span>
      <span className="text-xs text-slate-500">
        {incl ? '（税込）' : '（税抜）'}
      </span>
      <button
        type="button"
        onClick={() => setIncl((v) => !v)}
        className="ml-1 text-[10px] px-1.5 py-0.5 rounded border border-slate-300 text-slate-500 hover:bg-slate-100 transition-colors"
        aria-label={incl ? 'Switch to tax-excluded' : 'Switch to tax-included'}
      >
        税込 / 税抜
      </button>
    </span>
  );
}
