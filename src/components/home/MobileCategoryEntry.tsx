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
      'flyers': { name: '傳單印刷', hook: 'A4/A5 傳單 · 最快即日' },
      'stickers': { name: '貼紙印刷', hook: '防水 / 透明 / 燙金' },
      'packaging': { name: '包裝盒印刷', hook: '禮盒 / 彩盒 / 郵寄盒' },
      'posters': { name: '海報印刷', hook: 'A1/A2 · 戶外可用' },
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

/** 取该类目第一个产品的场景缩略图 (2026-07-20: 移动端分类卡顶部整宽缩略图) */
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
                className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:border-[#2873F5]/40 hover:shadow-md transition-all"
              >
                {/* 2026-07-20 UX 升级: 场景缩略图置顶整宽 (对标参考样式 2 列信息卡),
                    图下依次 = 类目名 / 一句卖点 / 橙色起始价 */}
                {thumb && (
                  <div className="relative w-full h-[92px]">
                    <Image
                      src={thumb}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-3 min-w-0">
                  <div className="text-[15px] font-bold text-slate-900 leading-tight">{cat.name}</div>
                  <div className="text-xs text-slate-500 mt-1 leading-snug line-clamp-2">{cat.hook}</div>
                  {cheapest && (
                    <div className="text-sm font-bold text-orange-600 mt-1.5">
                      {locale === 'en' && <span className="text-xs font-medium text-gray-400 mr-1">{t.from}</span>}
                      {convertToFromPrice(cheapest.price_range, locale, cheapest.category_slug, cheapest.slug)}
                      {locale !== 'en' && <span className="text-xs font-normal text-gray-400 ml-1">{t.from}</span>}
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
