'use client';

interface Props {
  locale: string;
}

// 2026-11-21 真值修復 (TASK-BANNER-RUSH-TRUTH): 移除無條件「明天12點前到」承諾，
// 改為有條件口徑（截稿/產能/送達時段以報價確認），與 11-20 即日傳單/A2 拍板單一致；zh-hk 簡繁錯字「速递」一併修正。
const copy: Record<string, { text: string; sub: string }> = {
  'zh-hk': { text: '印刷即日速遞送貨', sub: '今天下單 · 急件截稿與送達以報價確認' },
  'en': { text: 'Same-Day Rush Delivery', sub: 'Order today · rush cutoff & timing confirmed at quote' },
  'ja': { text: '即日速達配送', sub: '本日注文・特急締切・配送は見積りで確認' },
};

export default function RushDeliveryBadge({ locale }: Props) {
  const c = copy[locale] || copy['en'];
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold mb-3 shadow-sm">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
      <span>{c.text}</span>
      <span className="text-white/80 font-normal">| {c.sub}</span>
    </div>
  );
}
