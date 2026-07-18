/**
 * MobileCategoryChips — 移动端首页类目快捷 chips (2026-07-19 移动端信息架构对标优化)
 * 位置: hero 下方, 仅移动端 (lg:hidden)。
 * 横向滚动 pill chips, 直达 6 个 P0/P1 类目页 (与 Header navOrder / MobileCategoryEntry 一致)。
 * 类目标题与 Header t.categories / MobileCategoryEntry TEXTS 保持一致, 禁止出现 business-cards。
 * §13.10: en 不出现 Hong Kong/Shenzhen, ja 不出现 香港/深圳/中国, zh-hk 纯繁体。
 */

import Link from 'next/link';
import { Locale } from '@/types/locale';

interface MobileCategoryChipsProps {
  locale: Locale;
}

type CatSlug = 'stickers' | 'flyers' | 'paper-bags' | 'packaging' | 'posters' | 'educational';

const CHIP_ORDER: CatSlug[] = ['stickers', 'flyers', 'paper-bags', 'packaging', 'posters', 'educational'];

const TEXTS: Record<Locale, Record<CatSlug, string>> = {
  'zh-hk': {
    stickers: '貼紙印刷',
    flyers: '宣傳單張',
    'paper-bags': '紙袋印刷',
    packaging: '包裝盒定制',
    posters: '海報定制',
    educational: '校園印刷',
  },
  en: {
    stickers: 'Stickers',
    flyers: 'Flyers',
    'paper-bags': 'Paper Bags',
    packaging: 'Packaging',
    posters: 'Posters',
    educational: 'Education',
  },
  ja: {
    stickers: 'ステッカー',
    flyers: 'チラシ',
    'paper-bags': '紙袋',
    packaging: 'パッケージ',
    posters: 'ポスター',
    educational: '教育印刷',
  },
};

export function MobileCategoryChips({ locale }: MobileCategoryChipsProps) {
  const t = TEXTS[locale] || TEXTS['en'];

  return (
    <nav
      className="lg:hidden bg-white border-b border-gray-100"
      aria-label="Quick category links"
    >
      <div className="max-w-[1320px] mx-auto px-4 py-2.5">
        <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CHIP_ORDER.map((slug) => (
            <Link
              key={slug}
              href={`/${locale}/category/${slug}/`}
              className="flex-shrink-0 border border-gray-200 rounded-full px-4 py-2 text-sm text-slate-700 bg-white hover:border-[#2873F5] hover:text-[#2873F5] transition-colors"
            >
              {t[slug]}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
