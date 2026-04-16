/**
 * 首页组件
 * 三语言首页
 */

import { Metadata } from 'next';
import { generateHomeMetadata, Locale } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generateOrganizationJsonLd, generateLocalBusinessJsonLd } from '@/lib/seo';
import { HeroBanner } from '@/components/home/HeroBanner';
import { HotProducts } from '@/components/home/HotProducts';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';

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
  
  // 结构化数据
  const organizationJsonLd = generateOrganizationJsonLd();
  const localBusinessJsonLd = generateLocalBusinessJsonLd();
  
  return (
    <>
      {/* 结构化数据 */}
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={localBusinessJsonLd} />
      
      <main className="min-h-screen">
        <HeroBanner locale={locale} />
        <HotProducts locale={locale} />
        <WhyChooseUs locale={locale} />
        <KnowledgeSection locale={locale} />
      </main>
    </>
  );
}
