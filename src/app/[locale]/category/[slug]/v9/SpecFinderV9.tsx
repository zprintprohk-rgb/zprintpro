'use client';

/**
 * SpecFinder 緊湊版（藍本 design/plp-v9.html §SpecFinder, K3 拍板: 網格之後的挽回工具）
 * 選項文案取自藍本；「材質」選項映射到真實 SKU（products.ts 實存 slug），
 * 「不確定」走 WhatsApp 預填模板（category-conversion-blocks 報價貼紙模板）。
 * B1 泛化 (2026-09-10): 新增 options prop — 非 stickers 類目由 products 實數據派生
 * 材質/數量選項（內容零編造）; 不傳 options = 沿用貼紙硬編碼默認（定型頁逐像素不變）。
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/lib/seo';

/**
 * B2 本地化 (2026-09-10): 文案按 locale 切换 — zh-hk 值 = 定型页逐字不变; en 为
 * 新 UI 元素的最小功能标签 (SpecFinder 在 en 无前例, 列入 B2 报告已知偏差待老板复核)。
 * 贴纸硬编码默认项 (purposes/materials/quantities) 同步 per-locale。
 */
const SF = {
  'zh-hk': {
    title: '30 秒找到你的規格：',
    purposeLabel: '用途',
    purposePrefix: '用途：',
    materialLabel: '材質',
    quantityLabel: '數量',
    jump: '跳轉對應產品 →',
    note1: '全部指向真實 SKU · 不確定可直接',
    waAsk: 'WhatsApp 問',
    purposes: ['產品標籤', '戶外使用', '包裝封口', '促銷活動'],
    materials: {
      '材質：防水 PVC': 'waterproof-stickers',
      '材質：透明 PVC': 'transparent-stickers',
      '材質：銅版紙': 'small-batch-stickers',
      '材質：可移除膠': 'removable-stickers',
    },
    quantities: ['100 張', '500 張', '1000 張'],
  },
  en: {
    title: 'Find your spec in 30 seconds:',
    purposeLabel: 'Purpose',
    purposePrefix: 'Purpose: ',
    materialLabel: 'Material',
    quantityLabel: 'Quantity',
    jump: 'Jump to Product →',
    note1: 'All link to real SKUs · Not sure?',
    waAsk: 'Ask on WhatsApp',
    purposes: ['Product Labels', 'Outdoor Use', 'Packaging Seal', 'Promotions'],
    materials: {
      'Material: Waterproof PVC': 'waterproof-stickers',
      'Material: Transparent PVC': 'transparent-stickers',
      'Material: Art Paper': 'small-batch-stickers',
      'Material: Removable Adhesive': 'removable-stickers',
    },
    quantities: ['100 pcs', '500 pcs', '1000 pcs'],
  },
  /* v9.2.1 B3 (2026-09-10): ja 最小功能标签 (SpecFinder 在 ja 无前例, 与 en 同属新 UI 元素, 列 B3 报告已知偏差);
     材質選項對應同一組實存 SKU (products.ts 實證), 數量單位按 ja 慣例 枚 */
  ja: {
    title: '30秒で仕様を見つける：',
    purposeLabel: '用途',
    purposePrefix: '用途：',
    materialLabel: '材質',
    quantityLabel: '数量',
    jump: '該当製品へ →',
    note1: 'すべて実在SKUへ · 不明な場合は',
    waAsk: 'WhatsAppで質問',
    purposes: ['製品ラベル', '屋外使用', 'パッケージ封緘', 'プロモーション'],
    materials: {
      '材質：防水PVC': 'waterproof-stickers',
      '材質：透明PVC': 'transparent-stickers',
      '材質：コート紙': 'small-batch-stickers',
      '材質：剥がせる粘着': 'removable-stickers',
    },
    quantities: ['100枚', '500枚', '1000枚'],
  },
} as const;

export interface SpecFinderOptions {
  purposes?: string[];
  materials: { label: string; slug: string }[];
  quantities: string[];
  defaultSlug: string;
}

export function SpecFinderV9({ locale, waUrl, options }: { locale: Locale; waUrl: string; options?: SpecFinderOptions }) {
  const router = useRouter();
  // 门控保证运行时 locale ∈ {zh-hk, en, ja} (B3)
  const sf = SF[locale as 'zh-hk' | 'en' | 'ja'];
  // B1 探针修正 (2026-09-10): options 模式未显式给 purposes → 默认 [] (隐藏用途下拉, 防贴纸用途选项泄漏到其他品类);
  // 仅无 options (stickers 定型页) 才用 per-locale 硬编码默认项。
  const purposes = options ? (options.purposes ?? []) : sf.purposes;
  const materials =
    options?.materials ??
    Object.entries(sf.materials).map(([label, slug]) => ({ label, slug }));
  const quantities = options?.quantities ?? sf.quantities;
  const defaultSlug = options?.defaultSlug ?? 'waterproof-stickers';

  const [purpose, setPurpose] = useState(purposes[0] ?? '');
  const [material, setMaterial] = useState(materials[0]?.label ?? '');
  const [qty, setQty] = useState(quantities[0] ?? '');

  const go = () => {
    const target = materials.find((m) => m.label === material)?.slug ?? defaultSlug;
    router.push(`/${locale}/product/${target}/`);
  };

  const selectCls =
    'h-12 rounded-lg border border-[#E5E7EB] bg-white px-3.5 text-[15.5px] text-[#1F2937] focus:outline-none focus:border-[#2873F5] flex-1 min-w-[140px] lg:min-w-[150px]';

  return (
    <div
      className="mt-7 rounded-[14px] px-[22px] py-[18px] flex items-center gap-x-3.5 gap-y-3 flex-wrap text-white"
      style={{ background: 'var(--color-royal-navy-grad)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 30px rgba(15,31,61,0.24)' }}
    >
      <b className="text-[16px] whitespace-nowrap">{sf.title}</b>
      {purposes.length > 0 && (
        <select aria-label={sf.purposeLabel} className={selectCls} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          {purposes.map((o) => (
            <option key={o} value={o}>{sf.purposePrefix}{o}</option>
          ))}
        </select>
      )}
      {materials.length > 0 && (
        <select aria-label={sf.materialLabel} className={selectCls} value={material} onChange={(e) => setMaterial(e.target.value)}>
          {materials.map((o) => (
            <option key={o.label} value={o.label}>{o.label}</option>
          ))}
        </select>
      )}
      <select aria-label={sf.quantityLabel} className={selectCls} value={qty} onChange={(e) => setQty(e.target.value)}>
        {quantities.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={go}
        className="h-12 px-6 rounded-lg bg-[#F87314] text-white font-bold text-[15.5px] ring-1 ring-white/25 hover:brightness-95 transition-all whitespace-nowrap"
      >
        {sf.jump}
      </button>
      <span className="text-[13px] text-white/75">{sf.note1} <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-[#9DB8F5] font-semibold underline decoration-white/40 underline-offset-4 hover:text-white">{sf.waAsk}</a></span>
    </div>
  );
}
