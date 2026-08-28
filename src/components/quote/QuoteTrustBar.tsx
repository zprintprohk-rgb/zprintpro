import { Clock, CheckCircle2, Factory, Truck, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  check: CheckCircle2,
  factory: Factory,
  truck: Truck,
};

interface QuoteTrustBarProps {
  items: Array<{ icon: string; label: string }>;
}

export function QuoteTrustBar({ items }: QuoteTrustBarProps) {
  return (
    <div className="mb-4 rounded-2xl border border-slate-200/80 bg-white/85 p-2 shadow-sm backdrop-blur-sm">
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const Icon = ICONS[item.icon] ?? CheckCircle2;
          return (
            <div
              key={item.label}
              className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50/90 px-2.5 py-2 text-[13px] font-medium text-slate-700"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2873F5] text-white" aria-hidden="true">
                <Icon className="h-4 w-4" />
              </span>
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
