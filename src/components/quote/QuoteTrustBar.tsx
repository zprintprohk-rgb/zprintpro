interface QuoteTrustBarProps {
  items: Array<{ icon: string; label: string }>;
}

export function QuoteTrustBar({ items }: QuoteTrustBarProps) {
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
