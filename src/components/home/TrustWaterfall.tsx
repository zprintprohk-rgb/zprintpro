/**
 * TrustWaterfall — 首页 Hero 下方信任瀑布
 * 4 个小条：15年本地经验 / 30秒报价 / 不满意免费重印 / 24/7 客服
 * flex 横排，hover 微动效
 */

import { CheckCircle2 } from 'lucide-react';
import { Locale } from '@/types/locale';

interface TrustWaterfallProps {
  locale: Locale;
}

const ITEMS: Record<Locale, string[]> = {
  'zh-hk': [
    '15年本地經驗',
    '30秒智能報價',
    '不滿意免費重印',
    '24/7 客戶服務',
  ],
  en: [
    '15 Years Experience',
    '30-Second Quote',
    'Free Reprint Guarantee',
    '24/7 Customer Service',
  ],
  ja: [
    '15年の実績',
    '30秒見積もり',
    '満足保証',
    '24時間対応',
  ],
};

export function TrustWaterfall({ locale }: TrustWaterfallProps) {
  const items = ITEMS[locale] || ITEMS['en'];
  return (
    <section
      className="bg-white border-b border-slate-100"
      aria-label="Trust signals"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-14">
          {items.map((label, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-[13px] md:text-[15px] text-slate-700 hover:text-slate-900 transition-colors"
            >
              <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 flex-shrink-0" />
              <span className="font-semibold whitespace-nowrap">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
