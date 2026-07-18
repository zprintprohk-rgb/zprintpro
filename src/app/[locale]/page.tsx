/**
 * 首页组件
 * 三语言首页
 */

import { Metadata } from 'next';
import { generateHomeMetadata, Locale } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/seo';
import { HeroBanner } from '@/components/home/HeroBanner';
import { MobileValueStrip } from '@/components/home/MobileValueStrip';
import { MobileCategoryChips } from '@/components/home/MobileCategoryChips';
import { MobileCategoryEntry } from '@/components/home/MobileCategoryEntry';
import { HotProducts } from '@/components/home/HotProducts';
import { StatsBar } from '@/components/home/StatsBar';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';
import { TrustWaterfall } from '@/components/home/TrustWaterfall';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TrustBadges } from '@/components/TrustBadges';
import { FactoryTrust } from '@/components/home/FactoryTrust';
import { DoujinSKU } from '@/components/japan/DoujinSKU';

// 生成静态参数
export function generateStaticParams() {
  return [
    { locale: 'zh-hk' },
    { locale: 'en' },
    { locale: 'ja' },
  ];
}

// 生成页面元数据
export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return generateHomeMetadata(params.locale);
}

// 首页组件
export default function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;

  const heroPreloadMap: Record<Locale, string> = {
    'zh-hk': '/images/hero/hero-kraft-bag-zh-hk.webp',
    'en': '/images/hero/hero-kraft-bag-en.webp',
    'ja': '/images/hero/hero-kraft-bag-ja.webp',
  };
  
  // 结构化数据 — 按地區切換 LocalBusiness / Organization
  const orgSchema = generateOrganizationSchema(locale);
  const localSchema = generateLocalBusinessSchema(locale);

  return (
    <>
      <link rel="preload" as="image" href={heroPreloadMap[locale]} type="image/webp" />
      {/* 结构化数据 */}
      <JsonLd data={[orgSchema, localSchema]} />
      
      <main className="min-h-screen">
        {/* 2026-07-19: 移动端定位+卖点条 (lg:hidden), header 下方 / hero 上方 */}
        <MobileValueStrip locale={locale} />
        <HeroBanner locale={locale} />
        {/* 2026-07-19: 移动端类目快捷 chips (lg:hidden), hero 下方 */}
        <MobileCategoryChips locale={locale} />
        {/* 2026-07-18 P9: 移动端产品分类入口 (lg:hidden), hero 之后 / 印刷流程之前 */}
        <MobileCategoryEntry locale={locale} />
        <TrustWaterfall locale={locale} />
        {/* 2026-07-09 P0.3: 5 步流程图 — en-US market local optimization (PM × UX × SEO research) */}
        <HowItWorks locale={locale} />
        <HotProducts locale={locale} />
        <StatsBar locale={locale} />
        <WhyChooseUs locale={locale} />
        {/* 2026-07-18: 实力工厂实拍 — 对标智印港信任缺口 (真实印刷机=真工厂背书) */}
        <FactoryTrust locale={locale} />
        <KnowledgeSection locale={locale} />
        {/* 2026-07-09 P1.3: 8 个诚实信任信号 (替代 Trustpilot widget 冷启动) */}
        <TrustBadges locale={locale} />
        {locale === 'ja' && <DoujinSKU locale={locale} />}

        {/* Floating CTA Bar - server-rendered, visible in initial HTML */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
          <div className="max-w-[1320px] mx-auto px-4 py-3 flex items-center gap-2">
            <a
              href={`/${locale}/contact/`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#2873F5] hover:bg-[#1E5BD6] text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-lg shadow-blue-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {locale === 'zh-hk' ? '免費獲取報價' : locale === 'ja' ? '無料お見積もり' : 'Get Free Quote'}
            </a>
            <a
              href={`https://wa.me/8619880851334?text=${encodeURIComponent(locale === 'zh-hk' ? '你好，我想咨詢印刷報價' : locale === 'ja' ? 'こんにちは、印刷の見積もりをお願いします' : 'Hi, I would like a printing quote')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-lg shadow-emerald-200 flex-shrink-0"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
        {/* Desktop sticky CTA - subtle right side */}
        <div className="hidden md:block fixed bottom-6 right-6 z-40">
          <a
            href={`/${locale}/contact/`}
            className="flex items-center gap-2 bg-[#2873F5] hover:bg-[#1E5BD6] text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-blue-300 hover:shadow-xl hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {locale === 'zh-hk' ? '免費獲取報價' : locale === 'ja' ? '無料お見積もり' : 'Get Free Quote'}
          </a>
        </div>
      </main>
    </>
  );
}
