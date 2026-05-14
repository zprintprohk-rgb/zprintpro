'use client';

interface Props {
  locale: string;
}

const copy: Record<string, { text: string; sub: string }> = {
  'zh-hk': { text: '印刷即日速递送货', sub: '今天下單·明天12點前到' },
  'en': { text: 'Same-Day Rush Delivery', sub: 'Order today·By 12PM tomorrow' },
  'ja': { text: '即日速達配送', sub: '本日注文・翌日12時まで' },
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
