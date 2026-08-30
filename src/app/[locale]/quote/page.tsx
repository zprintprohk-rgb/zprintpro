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
    'zh-hk': '免費獲取報價 | 智印港 ZprintPro',
    'en': 'Get a Free Quote | ZprintPro',
    'ja': '無料お見積もり | ZprintPro',
  };
  const descriptions: Record<string, string> = {
    'zh-hk': '填寫表單獲取免費印刷報價，24小時內回覆',
    'en': 'Fill out the form to get a free printing quote, reply within 24 hours',
    'ja': 'フォームに記入して無料印刷見積もりを取得、24時間以内に返信',
  };

  // 静态导出时无法使用 searchParams，移除静态 noindex 避免阻止所有报价页收录
  // 客户端 QuoteNoIndexManager 会根据 URL 中是否有 product 参数动态控制：
  // - 有 product → 不注入 noindex（允许 Google 收录产品报价页）
  // - 无 product → 注入 noindex（基础报价表单页不应索引）
  return {
    title: titles[locale] || titles['zh-hk'],
    description: descriptions[locale] || descriptions['zh-hk'],
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/quote/`,
    },
  };
}

export default function QuotePage({ params }: QuotePageProps) {
  // 2026-08-25 P1 #8 拍板 24h SLA FAQ 触发位置 (K3 8/24 19:03 拍板 SLA 适用条款, 8/25 P0 #5 数据 + 8/25 P1 #8 触发)
  const faqLinkText: Record<string, string> = {
    'zh-hk': '查看 24 小時 SLA 適用條款',
    'en': 'View 24h SLA Terms',
    'ja': '24 時間 SLA 適用条件を見る',
  };
  return (
    <>
      <QuoteNoIndexManager />
      <QuoteRedirect locale={params.locale} />
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href={`/${params.locale}/faq/`}
          className="inline-flex items-center gap-2 bg-[#2873F5] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#1E5BD8] transition-colors text-sm font-medium"
          aria-label={faqLinkText[params.locale] || faqLinkText.en}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {faqLinkText[params.locale] || faqLinkText.en}
        </a>
      </div>
    </>
  );
}