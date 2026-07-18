/**
 * MobileCategoryEntry — 移动端首页产品分类入口 (2026-07-18 P9)
 * 用户反馈移动端首屏看不到产品分类。本区放在 hero 之后、印刷流程之前,
 * 仅移动端显示 (lg:hidden), 桌面端由 Header 导航承担。
 * 6 个 P0/P1 类目与 Header navOrder 一致, 2x3 grid, 每卡: 类目名 + 一句卖点 + 起价。
 * 文案组件内 TEXTS 常量 (参照 FloatingQuoteCTA 模式), 类目标题与 Header t.categories 保持一致。
 */

import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types/locale';
import { products } from '@/data/products';
import { convertToFromPrice } from '@/lib/pricing';

interface MobileCategoryEntryProps {
  locale: Locale;
}

type CatSlug = 'paper-bags' | 'flyers' | 'stickers' | 'packaging' | 'posters' | 'educational';

const NAV_ORDER: CatSlug[] = ['paper-bags', 'flyers', 'stickers', 'packaging', 'posters', 'educational'];

const TEXTS: Record<Locale, {
  heading: string;
  from: string;
  cats: Record<CatSlug, { name: string; hook: string }>;
}> = {
  'zh-hk': {
    heading: '產品分類',
    from: '起',
    cats: {
      'paper-bags': { name: '紙袋印刷', hook: '牛皮紙 / 白卡 / 禮品袋' },
      'flyers': { name: '宣傳單張', hook: 'A4/A5 傳單 · 最快即日' },
      'stickers': { name: '貼紙印刷', hook: '防水 / 透明 / 燙金' },
      'packaging': { name: '包裝盒定制', hook: '禮盒 / 彩盒 / 郵寄盒' },
      'posters': { name: '海報定制', hook: 'A1/A2 · 戶外可用' },
      'educational': { name: '校園印刷', hook: '練習簿 / 畢業紀念冊' },
    },
  },
  en: {
    heading: 'Shop by Category',
    from: 'From',
    cats: {
      'paper-bags': { name: 'Paper Bags', hook: 'Kraft, white card & gift bags' },
      'flyers': { name: 'Flyers', hook: 'A4/A5 · same-day available' },
      'stickers': { name: 'Stickers', hook: 'Waterproof, clear & foil' },
      'packaging': { name: 'Packaging', hook: 'Gift, mailer & folding boxes' },
      'posters': { name: 'Posters', hook: 'A1/A2 · indoor & outdoor' },
      'educational': { name: 'Educational', hook: 'Workbooks & yearbooks' },
    },
  },
  ja: {
    heading: 'カテゴリーから探す',
    from: '〜',
    cats: {
      'paper-bags': { name: '紙袋印刷', hook: 'クラフト・白カード・ギフト袋' },
      'flyers': { name: 'チラシ印刷', hook: 'A4/A5・短納期対応' },
      'stickers': { name: 'ステッカー印刷', hook: '防水・透明・箔押し' },
      'packaging': { name: 'パッケージ印刷', hook: 'ギフト・宅配・組立箱' },
      'posters': { name: 'ポスター印刷', hook: 'A1/A2・屋内外対応' },
      'educational': { name: '教育印刷', hook: 'ワークブック・卒業アルバム' },
    },
  },
};

/** 取该类目下 price_range 下限最低的产品, 用于展示起价 */
function getCheapestProduct(catSlug: CatSlug) {
  const catProducts = products.filter(
    (p) => (p.category_slug === catSlug || p.category === catSlug) && p.price_range
  );
  let best: (typeof catProducts)[number] | null = null;
  let bestMin = Infinity;
  for (const p of catProducts) {
    const m = p.price_range.match(/HK\$([\d.]+)/);
    if (!m) continue;
    const min = parseFloat(m[1]);
    if (min < bestMin) {
      bestMin = min;
      best = p;
    }
  }
  return best;
}

/** 取该类目第一个产品的场景缩略图 (2026-07-19: 移动端分类卡左侧 56x56) */
function getCategoryImage(catSlug: CatSlug, locale: Locale): string | null {
  const p = products.find((x) => x.category_slug === catSlug || x.category === catSlug);
  if (!p) return null;
  const localeImgs = p.imagesByLocale?.[locale];
  if (localeImgs && localeImgs.length > 0) return localeImgs[0];
  return p.images?.[0] ?? null;
}

export function MobileCategoryEntry({ locale }: MobileCategoryEntryProps) {
  const t = TEXTS[locale] || TEXTS['en'];
  const localePrefix = `/${locale}`;

  return (
    <section className="lg:hidden bg-white py-6 border-b border-gray-100" aria-label="Product categories">
      <div className="max-w-[1320px] mx-auto px-4">
        <h2 className="text-lg font-bold text-slate-900 mb-3">{t.heading}</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {NAV_ORDER.map((slug) => {
            const cat = t.cats[slug];
            const cheapest = getCheapestProduct(slug);
            const thumb = getCategoryImage(slug, locale);
            return (
              <Link
                key={slug}
                href={`${localePrefix}/category/${slug}/`}
                className="flex items-center gap-3 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-[#2873F5]/30 rounded-xl p-3 transition-colors"
              >
                {thumb && (
                  <Image
                    src={thumb}
                    alt={cat.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                )}
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-slate-900">{cat.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-snug">{cat.hook}</div>
                  {cheapest && (
                    <div className="text-xs font-bold text-[#F87314] mt-1.5">
                      {locale === 'en' && <span className="font-medium text-gray-400 mr-0.5">{t.from} </span>}
                      {convertToFromPrice(cheapest.price_range, locale, cheapest.category_slug, cheapest.slug)}
                      {locale !== 'en' && <span className="font-normal text-gray-400 ml-0.5">{t.from}</span>}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
