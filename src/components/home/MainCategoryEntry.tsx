/**
 * G1 (v9.2.3): 首页 Hero 下 AEO 直接答案句 + 主营品类入口卡
 * - AEO 答案块: 40-60 字直接答案 (30秒報價 + 100張起 + 18:00截單翌日中午前到 + WhatsApp), 三语言本地化
 * - 主营品类 5 卡: 貼紙/宣傳單張/包裝盒/紙袋/海報 (v9.3 裁决 2: 第 5 卡「標籤印刷」与貼紙同 href=stickers
 *   实证重复 → 改為「海報印刷」卡 href=posters; GSC: 海報印刷 161 展示为 hk 高潜词第 1 位却无首页入口)
 * - v9.3 裁决 3 UX: hover 仅边框变蓝 + 微阴影 (禁缩放位移); icon 去实心色块改细线图标 (对齐 PLP v9 编辑式语言)
 * - 设计令牌: 浅蓝带 #F2F6FF (AEO) / 纯橙 CTA #F87314 / 藏青字 #17284C; 橙渐变仅限首屏 Banner
 * - 移动端: AEO 全设备; 主营品类卡 lg 以上显示 (移动端已有 MobileCategoryEntry, 避免重复)
 */
import Link from 'next/link';
import { ArrowRight, Tag, FileText, Package, ShoppingBag, Image as ImageIcon } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface MainCategoryEntryProps {
  locale: Locale;
}

const WA_NUMBER = '8619880851334';

const TEXTS = {
  'zh-hk': {
    answer: '30 秒 AI 即時報價，100 張起印，18:00 前落單翌日中午前送到，WhatsApp 即時回覆。',
    cta: '獲取報價',
    waText: '你好，我想咨詢印刷報價',
    title: '主營品類',
    viewAll: '查看全部',
    cats: [
      { key: 'stickers', name: '貼紙印刷', hook: '防水 / 透明 / 燙金', href: 'stickers', icon: Tag },
      { key: 'flyers', name: '宣傳單張', hook: 'A4/A5 傳單 · 最快即日', href: 'flyers', icon: FileText },
      { key: 'packaging', name: '包裝盒印刷', hook: '禮盒 / 彩盒 / 郵寄盒', href: 'packaging', icon: Package },
      { key: 'paper-bags', name: '紙袋印刷', hook: '牛皮紙 / 白卡 / 禮品袋', href: 'paper-bags', icon: ShoppingBag },
      { key: 'posters', name: '海報印刷', hook: 'A2/A1 大海報 · 最快即日', href: 'posters', icon: ImageIcon },
    ],
  },
  en: {
    answer: 'Get a 30-second AI quote, print from 100 pcs, order before 6pm for next-day noon delivery. WhatsApp instant reply.',
    cta: 'Get Quote',
    waText: 'Hi, I would like a printing quote',
    title: 'Main Categories',
    viewAll: 'View All',
    cats: [
      { key: 'stickers', name: 'Stickers', hook: 'Waterproof, clear & foil', href: 'stickers', icon: Tag },
      { key: 'flyers', name: 'Flyers', hook: 'A4/A5 · same-day available', href: 'flyers', icon: FileText },
      { key: 'packaging', name: 'Packaging', hook: 'Gift, mailer & folding boxes', href: 'packaging', icon: Package },
      { key: 'paper-bags', name: 'Paper Bags', hook: 'Kraft, white card & gift bags', href: 'paper-bags', icon: ShoppingBag },
      { key: 'posters', name: 'Posters', hook: 'A2/A1 large format · same-day', href: 'posters', icon: ImageIcon },
    ],
  },
  ja: {
    answer: '30秒でAI即時見積もり、100枚〜対応、18:00締切で翌日正午までにお届け。WhatsAppで即返信。',
    cta: '無料お見積もり',
    waText: 'こんにちは、印刷の見積もりをお願いします',
    title: '主なカテゴリー',
    viewAll: 'すべて見る',
    cats: [
      { key: 'stickers', name: 'ステッカー印刷', hook: '防水・透明・箔押し', href: 'stickers', icon: Tag },
      { key: 'flyers', name: 'チラシ印刷', hook: 'A4/A5・短納期対応', href: 'flyers', icon: FileText },
      { key: 'packaging', name: 'パッケージ印刷', hook: 'ギフト・宅配・組立箱', href: 'packaging', icon: Package },
      { key: 'paper-bags', name: '紙袋印刷', hook: 'クラフト・白カード・ギフト袋', href: 'paper-bags', icon: ShoppingBag },
      { key: 'posters', name: 'ポスター印刷', hook: 'A2/A1 大判・短納期', href: 'posters', icon: ImageIcon },
    ],
  },
} as const;

export function MainCategoryEntry({ locale }: MainCategoryEntryProps) {
  const t = TEXTS[locale];
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waText)}`;

  return (
    <section className="bg-white">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* AEO 直接答案句 */}
        <div className="bg-[#F2F6FF] rounded-2xl px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 -mt-1">
          <p className="text-[17px] leading-relaxed text-[#17284C] lg:flex-1">
            {t.answer}
          </p>
          <div className="flex shrink-0 gap-3">
            <Link
              href={`/${locale}/contact/`}
              className="inline-flex items-center gap-1.5 bg-[#F87314] hover:bg-[#EA580C] text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
            >
              {t.cta}
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* 主营品类 5 卡 (lg+ 显示; 移动端由 MobileCategoryEntry 承接) */}
        <div className="hidden lg:block pt-8 pb-10">
          <h2 className="text-2xl font-bold text-[#17284C] mb-5">{t.title}</h2>
          <div className="grid grid-cols-5 gap-4">
            {t.cats.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.key}
                  href={`/${locale}/category/${c.href}/`}
                  className="group bg-white border border-gray-200 hover:border-[#2873F5] hover:shadow-sm rounded-2xl p-5 flex flex-col gap-3 transition-all"
                >
                  {/* v9.3 裁决 3: 去实心色块, 改细线图标 */}
                  <Icon className="w-6 h-6 text-[#2873F5]" strokeWidth={1.6} />
                  <span className="font-bold text-[#17284C] leading-snug">{c.name}</span>
                  <span className="text-sm text-gray-500 leading-snug">{c.hook}</span>
                  <span className="text-[#EA580C] text-sm font-bold inline-flex items-center gap-1 mt-auto">
                    {t.viewAll}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
