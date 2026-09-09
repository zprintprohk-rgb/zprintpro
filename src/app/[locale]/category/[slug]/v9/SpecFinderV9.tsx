'use client';

/**
 * SpecFinder 緊湊版（藍本 design/plp-v9.html §SpecFinder, K3 拍板: 網格之後的挽回工具）
 * 選項文案取自藍本；「材質」選項映射到真實貼紙 SKU（products.ts 實存 slug），
 * 「不確定」走 WhatsApp 預填模板（category-conversion-blocks 報價貼紙模板）。
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/lib/seo';

const PURPOSE_OPTIONS = ['產品標籤', '戶外使用', '包裝封口', '促銷活動'];

/** 材質 → 真實 SKU slug（全部為 stickers 分類實存產品） */
const MATERIAL_TO_SLUG: Record<string, string> = {
  '材質：防水 PVC': 'waterproof-stickers',
  '材質：透明 PVC': 'transparent-stickers',
  '材質：銅版紙': 'small-batch-stickers',
  '材質：可移除膠': 'removable-stickers',
};

const QTY_OPTIONS = ['100 張', '500 張', '1000 張'];

export function SpecFinderV9({ locale, waUrl }: { locale: Locale; waUrl: string }) {
  const router = useRouter();
  const [purpose, setPurpose] = useState(PURPOSE_OPTIONS[0]);
  const [material, setMaterial] = useState(Object.keys(MATERIAL_TO_SLUG)[0]);
  const [qty, setQty] = useState(QTY_OPTIONS[0]);

  const go = () => {
    const target = MATERIAL_TO_SLUG[material] ?? 'waterproof-stickers';
    router.push(`/${locale}/product/${target}/`);
  };

  const selectCls =
    'h-12 rounded-lg border border-[#E5E7EB] bg-white px-3.5 text-[15.5px] text-[#1F2937] focus:outline-none focus:border-[#2873F5]';

  return (
    <div className="mt-7 bg-white border border-[#E5E7EB] rounded-[14px] px-[22px] py-[18px] flex items-center gap-3.5 flex-wrap shadow-[0_1px_3px_rgba(16,24,40,0.07)]">
      <b className="text-[16px]">30 秒找到你的規格：</b>
      <select aria-label="用途" className={selectCls} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
        {PURPOSE_OPTIONS.map((o) => (
          <option key={o} value={o}>用途：{o}</option>
        ))}
      </select>
      <select aria-label="材質" className={selectCls} value={material} onChange={(e) => setMaterial(e.target.value)}>
        {Object.keys(MATERIAL_TO_SLUG).map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <select aria-label="數量" className={selectCls} value={qty} onChange={(e) => setQty(e.target.value)}>
        {QTY_OPTIONS.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={go}
        className="h-12 px-6 rounded-lg bg-[#2873F5] text-white font-bold text-[15.5px] hover:bg-[#1E5FD1] transition-colors"
      >
        跳轉對應產品 →
      </button>
      <span className="text-[13px] text-[#6B7280]">全部指向真實 SKU · 不確定可直接 <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-[#2873F5] font-semibold hover:underline">WhatsApp 問</a></span>
    </div>
  );
}
