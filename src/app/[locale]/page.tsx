/**
 * 首页组件
 * 三语言首页
 */

import { Metadata } from 'next';
import { generateHomeMetadata, Locale } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/seo';
import { HeroBanner } from '@/components/home/HeroBanner';
import { HotProducts } from '@/components/home/HotProducts';
import { StatsBar } from '@/components/home/StatsBar';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';
import { TrustWaterfall } from '@/components/home/TrustWaterfall';
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
        <HeroBanner locale={locale} />
        <TrustWaterfall locale={locale} />
        <HotProducts locale={locale} />
        <StatsBar locale={locale} />
        <WhyChooseUs locale={locale} />
        <KnowledgeSection locale={locale} />
        {false && locale === 'ja' && <DoujinSKU locale={locale} />}
      </main>
    </>
  );
}
