/**
 * JapanTrustBadges — 日本市场三 Badge
 * 国内検品（violet）+ 税込（emerald）+ エコ（green）
 * 仅在 locale === 'ja' 时使用
 */

import { ShieldCheck, Receipt, Leaf } from 'lucide-react';

const BADGES = [
  {
    key: 'kensa',
    icon: ShieldCheck,
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-200',
    iconClass: 'text-violet-500',
    titleJa: '国内検品済み',
    descJa: '日本国内で最終検品を実施し、高品質を保証',
  },
  {
    key: 'zei',
    icon: Receipt,
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    iconClass: 'text-emerald-500',
    titleJa: '消費税込',
    descJa: '表示価格は消費税込みです。追加料金なし',
  },
  {
    key: 'eco',
    icon: Leaf,
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
    iconClass: 'text-green-500',
    titleJa: 'エコ認証',
    descJa: 'FSC認証紙・大豆油墨使用。地球に優しい印刷',
  },
] as const;

interface JapanTrustBadgesProps {
  variant?: 'inline' | 'stacked';
}

export function JapanTrustBadges({ variant = 'inline' }: JapanTrustBadgesProps) {
  const wrapperClass = variant === 'stacked'
    ? 'flex flex-col gap-2'
    : 'flex flex-wrap gap-2';

  return (
    <div
      className={wrapperClass}
      aria-label="日本市場の信頼バッジ"
      role="group"
    >
      {BADGES.map(({ key, icon: Icon, bgClass, borderClass, iconClass, titleJa, descJa }) => (
        <div
          key={key}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${bgClass} ${borderClass}`}
          title={descJa}
        >
          <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${iconClass}`} />
          <span className="text-xs font-semibold text-slate-700">{titleJa}</span>
        </div>
      ))}
    </div>
  );
}
