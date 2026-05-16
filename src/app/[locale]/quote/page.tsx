import type { Metadata } from 'next';
import { QuoteRedirect } from '@/components/quote/QuoteRedirect';
import { QuoteNoIndexManager } from '@/components/quote/QuoteNoIndexManager';
import { Locale, siteConfig } from '@/lib/seo';

interface QuotePageProps {
  params: { locale: string };
}

const locales = ['zh-hk', 'en', 'ja'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const titles: Record<string, string> = {
    'zh-hk': '免費獲取報價 | 智印云 ZprintPro',
    'en': 'Get a Free Quote | ZprintPro',
    'ja': '無料お見積もり | ZprintPro',
  };
  const descriptions: Record<string, string> = {
    'zh-hk': '填寫表單獲取免費印刷報價，24小時內回覆',
    'en': 'Fill out the form to get a free printing quote, reply within 24 hours',
    'ja': 'フォームに記入して無料印刷見積もりを取得、24時間以内に返信',
  };

  // 静态导出时无法使用 searchParams，统一返回 noindex
  // 客户端 QuoteNoIndexManager 会根据 URL 中是否有 product 参数动态控制
  // 有 product → 移除 noindex（允许 Google 收录）
  // 无 product → 维持 noindex（基础报价页不应索引）
  return {
    title: titles[locale] || titles['zh-hk'],
    description: descriptions[locale] || descriptions['zh-hk'],
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/quote/`,
    },
  };
}

export default function QuotePage({ params }: QuotePageProps) {
  return (
    <>
      <QuoteNoIndexManager />
      <QuoteRedirect locale={params.locale} />
    </>
  );
}