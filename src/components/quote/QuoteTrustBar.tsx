interface QuoteTrustBarProps {
  locale: 'zh-hk' | 'en' | 'ja';
}

const TRUST_ITEMS: Record<'zh-hk' | 'en' | 'ja', Array<{ icon: string; label: string }>> = {
  'zh-hk': [
    { icon: '⚡', label: '2小時內回覆報價' },
    { icon: '✅', label: '免費報價・無隱藏收費' },
    { icon: '🏭', label: '香港註冊・自設廠房' },
    { icon: '🚚', label: '指定產品即日速遞' },
  ],
  en: [
    { icon: '⚡', label: 'Quote within 2 hours' },
    { icon: '✅', label: 'Free quote, no hidden fees' },
    { icon: '🏭', label: 'HK registered, own factory' },
    { icon: '🚚', label: 'Same-day delivery available' },
  ],
  ja: [
    { icon: '⚡', label: '2時間以内に見積回答' },
    { icon: '✅', label: '見積無料・追加料金なし' },
    { icon: '🏭', label: '香港登記・自社工場' },
    { icon: '🚚', label: '即日配送対応商品あり' },
  ],
};

export function QuoteTrustBar({ locale }: QuoteTrustBarProps) {
  const items = TRUST_ITEMS[locale];

  return (
    <div className="mb-4 rounded-2xl border border-slate-200/80 bg-white/85 p-2 shadow-sm backdrop-blur-sm">
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50/90 px-2.5 py-2 text-[13px] font-medium text-slate-700"
          >
            <span className="shrink-0 text-base leading-none" aria-hidden="true">
              {item.icon}
            </span>
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
