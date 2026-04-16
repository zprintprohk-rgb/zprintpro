/**
 * 产品卡片组件
 * 用于产品列表页展示
 */

import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { getProductTitle, getProductDescription } from '@/data/products';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const title = getProductTitle(product, locale);
  const description = getProductDescription(product, locale);
  
  // 翻译
  const translations = {
    'zh-hk': { from: '起', viewDetails: '查看詳情' },
    'en': { from: 'from', viewDetails: 'View Details' },
    'ja': { from: 'から', viewDetails: '詳細を見る' },
  };
  
  const t = translations[locale];
  
  return (
    <a
      href={`/${locale}/product/${product.slug}`}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* 产品图片 */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.images[0] || '/images/placeholder.jpg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* 权重标签 */}
        {product.weight_score >= 90 && (
          <span className="absolute top-2 left-2 bg-[#F87314] text-white text-xs px-2 py-1 rounded">
            HOT
          </span>
        )}
      </div>
      
      {/* 产品信息 */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-[#2873F5] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {description.slice(0, 60)}...
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[#2873F5] font-bold">
            {t.from} {product.price_range.split('-')[0]}
          </span>
          <span className="text-sm text-gray-400 group-hover:text-[#2873F5] transition-colors">
            {t.viewDetails} →
          </span>
        </div>
      </div>
    </a>
  );
}
