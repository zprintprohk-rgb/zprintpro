import Image from 'next/image';
import type { Locale } from '@/lib/seo';

/**
 * 实力工厂实拍区 (2026-07-18 v2)
 * 主视觉: 柯式印刷机全景实拍 (桌面横版 1380x345 / 移动竖版 414x736, <picture> 艺术方向切换)
 * 辅图: 商标轮转机 (貼紙/標籤量产背书)
 * §13.10: supplier origin 允许在正文层佐证品质 (亚洲工厂/深圳自設廠房)
 */

const TEXTS = {
  'zh-hk': {
    title: '實力工廠 · 自家廠房實拍',
    subtitle: '柯式印刷機 × 商標輪轉機 · ISO 9001 品質管理 · 15+ 年印刷經驗',
    caption1: '柯式印刷機組 — 宣傳單張 / 包裝盒 / 畫冊專色量產',
    caption2: '商標輪轉印刷機 — 貼紙 / 標籤卷裝量產',
    alt1: '智印雲工廠柯式印刷機全景實拍',
    alt2: '智印雲工廠商標輪轉印刷機實拍',
  },
  en: {
    title: 'Real Factory · Our Own Production Facility',
    subtitle: 'Offset press line × Label rotary press · ISO 9001 quality management · 15+ years in printing',
    caption1: 'Offset press line — spot-color flyers, packaging & booklets at scale',
    caption2: 'Label rotary press — roll-to-roll sticker & label production',
    alt1: 'ZprintPro factory offset press line panorama',
    alt2: 'ZprintPro factory label rotary press',
  },
  ja: {
    title: '自社工場 · 生産設備の実写',
    subtitle: 'オフセット印刷機 × ラベル輪転機 · ISO 9001 品質管理 · 15年以上の印刷実績',
    caption1: 'オフセット印刷機ライン — チラシ・パッケージ・冊子の特色量産',
    caption2: 'ラベル輪転印刷機 — ステッカー・ラベルのロール量産',
    alt1: 'ZprintPro 自社工場オフセット印刷機パノラマ',
    alt2: 'ZprintPro 自社工場ラベル輪転機',
  },
} as const;

export function FactoryTrust({ locale }: { locale: Locale }) {
  const t = (TEXTS[locale] ?? TEXTS.en) as (typeof TEXTS)['en'];
  return (
    <section className="py-10 md:py-14 bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t.title}</h2>
          <p className="text-sm md:text-base text-gray-500 mt-2">{t.subtitle}</p>
        </div>

        {/* 主视觉: 全景实拍 (桌面横版 / 移动竖版) */}
        <figure className="group bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4 md:mb-6">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/factory/factory-press-mobile.webp" />
            <img
              src="/images/factory/factory-press-pano.webp"
              alt={t.alt1}
              width={1380}
              height={345}
              loading="lazy"
              className="w-full h-56 md:h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
            />
          </picture>
          <figcaption className="px-4 py-3 text-sm text-gray-600">{t.caption1}</figcaption>
        </figure>

        {/* 辅图: 商标轮转机 */}
        <figure className="group bg-white rounded-2xl border border-gray-200 overflow-hidden md:w-1/2 md:mx-auto">
          <div className="relative aspect-[4/1] md:aspect-[2/1] overflow-hidden">
            <Image
              src="/images/factory/label-press.webp"
              alt={t.alt2}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <figcaption className="px-4 py-3 text-sm text-gray-600">{t.caption2}</figcaption>
        </figure>
      </div>
    </section>
  );
}
