'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products, getProductTitle } from '@/data/products';
import { getProductMainImage } from '@/lib/product-image';

export default function NotFoundPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh-hk';
  const localePrefix = `/${locale}`;

  const t: Record<string, { title: string; subtitle: string; backHome: string; hotProducts: string; search: string }> = {
    'zh-hk': {
      title: '頁面不存在',
      subtitle: '抱歉，您要找的頁面已經搬家或從未存在過。',
      backHome: '← 返回首頁',
      hotProducts: '熱門產品',
      search: '搜索產品',
    },
    'en': {
      title: 'Page Not Found',
      subtitle: 'Sorry, the page you are looking for has moved or never existed.',
      backHome: '← Back to Home',
      hotProducts: 'Hot Products',
      search: 'Search Products',
    },
    'ja': {
      title: 'ページが見つかりません',
      subtitle: '申し訳ございませんが、お探しのページは移動したか、存在しません。',
      backHome: '← ホームに戻る',
      hotProducts: '人気製品',
      search: '製品を検索',
    },
  };
  const labels = t[locale] || t['zh-hk'];

  const hotProducts = products
    .filter((p) => p.isHot)
    .sort((a, b) => b.weight_score - a.weight_score)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-[#2873F5] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#333333] mb-3">{labels.title}</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">{labels.subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href={`${localePrefix}/`}
            className="inline-flex items-center px-6 py-3 bg-[#2873F5] text-white rounded-xl font-medium hover:bg-[#1E5FD1] transition-colors"
          >
            {labels.backHome}
          </Link>
          <Link
            href={`${localePrefix}/search`}
            className="inline-flex items-center px-6 py-3 border-2 border-[#2873F5] text-[#2873F5] rounded-xl font-medium hover:bg-[#2873F5] hover:text-white transition-colors"
          >
            {labels.search}
          </Link>
        </div>

        <div className="text-left">
          <h3 className="text-xl font-bold text-[#333333] mb-6 text-center">{labels.hotProducts}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {hotProducts.map((product) => (
              <Link
                key={product.sku_code}
                href={`${localePrefix}/product/${product.slug}/`}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-50 relative overflow-hidden">
                  <img
                    src={getProductMainImage(product, locale as 'zh-hk' | 'en' | 'ja')}
                    alt={getProductTitle(product, locale as 'zh-hk' | 'en' | 'ja')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-bold text-[#333333] line-clamp-2 group-hover:text-[#2873F5] transition-colors">
                    {getProductTitle(product, locale as 'zh-hk' | 'en' | 'ja')}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
