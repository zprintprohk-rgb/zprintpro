'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/lib/seo';

interface QuoteRedirectProps {
  locale: string;
}

/**
 * 客户端重定向逻辑（SEO 友好版）
 * 
 * GSC 修复（2026-05-18）：
 * - 有 product 参数（产品报价页）→ 不重定向，展示报价内容
 *   Googlebot 可正常抓取页面，解决 53 个 quote 页 noindex 问题
 * - 无 product 参数（基础报价页）→ 重定向到 contact 页
 */
export function QuoteRedirect({ locale }: QuoteRedirectProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [productName, setProductName] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const product = params.get('product');

      if (!product) {
        // 无 product 参数 → 重定向到 contact
        const target = `/${locale}/contact/`;
        router.replace(target);
      } else {
        // 有 product 参数 → 渲染报价展示内容
        setProductName(product);
        setShouldRender(true);
      }
    }
  }, [locale, router]);

  if (shouldRender) {
    return <QuotePageContent locale={locale} productName={productName} />;
  }

  // 无 product 参数时显示加载状态（重定向期间）
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#2873F5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Redirecting...</p>
      </div>
    </main>
  );
}

/**
 * 产品报价展示页内容
 * 当 URL 包含 ?product=xxx 时渲染此组件
 * 提供产品信息 + 引导用户联系客服获取报价
 */
function QuotePageContent({ locale, productName }: { locale: string; productName: string }) {
  const titles: Record<string, string> = {
    'zh-hk': `獲取報價 - ${productName}`,
    'en': `Get a Quote - ${productName}`,
    'ja': `見積もり - ${productName}`,
  };

  const descriptions: Record<string, string> = {
    'zh-hk': `填寫以下信息獲取${productName}的免費報價，智印云專業團隊將在24小時內回覆。`,
    'en': `Fill in the form below to get a free quote for ${productName}. Our team will reply within 24 hours.`,
    'ja': `以下のフォームに記入して${productName}の無料見積もりを取得してください。24時間以内にご返信いたします。`,
  };

  const contactLinks: Record<string, string> = {
    'zh-hk': `/${locale}/contact/?product=${productName}`,
    'en': `/${locale}/contact/?product=${productName}`,
    'ja': `/${locale}/contact/?product=${productName}`,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* 产品名称 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {titles[locale] || titles['en']}
          </h1>

          {/* 产品描述 */}
          <p className="text-lg text-gray-600 mb-8">
            {descriptions[locale] || descriptions['en']}
          </p>

          {/* 联系 CTA */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              {locale === 'zh-hk' ? '需要即時報價？' : locale === 'ja' ? '即時見積もりが必要ですか？' : 'Need an instant quote?'}
            </h2>
            <p className="text-blue-700 mb-4">
              {locale === 'zh-hk'
                ? '點擊下方按鈕直接聯繫我們，獲取最準確的報價'
                : locale === 'ja'
                  ? '下のボタンをクリックして、正確な見積もりを入手してください'
                  : 'Click the button below to contact us directly for the most accurate quote'}
            </p>
            <a
              href={contactLinks[locale]}
              className="inline-flex items-center px-6 py-3 bg-[#2873F5] text-white font-semibold rounded-lg hover:bg-[#1a5fd4] transition-colors"
            >
              {locale === 'zh-hk' ? '立即詢價' : locale === 'ja' ? '今すぐ見積もり' : 'Get Quote Now'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* 产品规格信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'zh-hk' ? '📋 產品規格' : locale === 'ja' ? '📋 製品仕様' : '📋 Product Specs'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'zh-hk'
                  ? '填寫表單告訴我們您的需求'
                  : locale === 'ja'
                    ? 'フォームにご要望をご記入ください'
                    : 'Fill in the form to tell us your requirements'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'zh-hk' ? '🚚 交貨時間' : locale === 'ja' ? '🚚 納期' : '🚚 Delivery Time'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'zh-hk'
                  ? '最快24小時內出貨'
                  : locale === 'ja'
                    ? '最短24時間で出荷'
                    : 'Fastest delivery within 24 hours'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'zh-hk' ? '💳 安全支付' : locale === 'ja' ? '💳 安全な支払い' : '💳 Secure Payment'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'zh-hk'
                  ? 'Airwallex 等多種安全支付方式'
                  : locale === 'ja'
                    ? 'Airwallexなど安全な支払い方法'
                    : 'Multiple secure payment options including Airwallex'}
              </p>
            </div>
          </div>

          {/* 结构化数据 */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: productName,
                url: `${siteConfig.url}/${locale}/quote/?product=${productName}`,
                offers: {
                  '@type': 'Offer',
                  priceCurrency: locale === 'ja' ? 'JPY' : locale === 'en' ? 'USD' : 'HKD',
                  availability: 'https://schema.org/InStock',
                  priceSpecification: {
                    '@type': 'PriceSpecification',
                    price: '0',
                    priceCurrency: locale === 'ja' ? 'JPY' : locale === 'en' ? 'USD' : 'HKD',
                  },
                },
              }),
            }}
          />
        </div>
      </div>
    </main>
  );
}