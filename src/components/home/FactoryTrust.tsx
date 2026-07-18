import Image from 'next/image';
import type { Locale } from '@/lib/seo';

/**
 * 实力工厂实拍区 (2026-07-18)
 * 对标智印港移动端信任缺口: 真实印刷机实拍 = 真工厂背书
 * 图片: 商标轮转机 + 柯式印刷机控制台 (自家厂房实拍, 非素材图)
 * §13.10: supplier origin 允许在正文层佐证品质 (亚洲工厂/深圳自設廠房)
 */

const TEXTS = {
  'zh-hk': {
    title: '實力工廠 · 自家廠房實拍',
    subtitle: '商標輪轉機 × 柯式印刷機 · ISO 9001 品質管理 · 15+ 年印刷經驗',
    caption1: '商標輪轉印刷機 — 貼紙 / 標籤卷裝量產',
    caption2: '柯式印刷機控制台 — 宣傳單張 / 包裝盒專色印刷',
    alt1: '智印雲工廠商標輪轉印刷機實拍',
    alt2: '智印雲工廠柯式印刷機控制台實拍',
  },
  en: {
    title: 'Real Factory · Our Own Production Facility',
    subtitle: 'Label rotary press × Offset press · ISO 9001 quality management · 15+ years in printing',
    caption1: 'Label rotary press — roll-to-roll sticker & label production',
    caption2: 'Offset press console — spot-color flyers & packaging',
    alt1: 'ZprintPro factory label rotary press',
    alt2: 'ZprintPro factory offset press console',
  },
  ja: {
    title: '自社工場 · 生産設備の実写',
    subtitle: 'ラベル輪転機 × オフセット印刷機 · ISO 9001 品質管理 · 15年以上の印刷実績',
    caption1: 'ラベル輪転印刷機 — ステッカー・ラベルのロール量産',
    caption2: 'オフセット印刷機コンソール — チラシ・パッケージの特色印刷',
    alt1: 'ZprintPro 自社工場ラベル輪転機',
    alt2: 'ZprintPro 自社工場オフセット印刷機コンソール',
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <figure className="group bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="relative aspect-[4/1] md:aspect-[2/1] overflow-hidden">
              <Image
                src="/images/factory/label-press.webp"
                alt={t.alt1}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm text-gray-600">{t.caption1}</figcaption>
          </figure>
          <figure className="group bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="relative aspect-[4/1] md:aspect-[2/1] overflow-hidden">
              <Image
                src="/images/factory/offset-press.webp"
                alt={t.alt2}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm text-gray-600">{t.caption2}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
