/**
 * 相关产品组件
 * 显示与当前产品相关的其他产品
 */

import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { getProductsByCategory, getProductDisplayTitle, getProductImageAlt } from '@/data/products';
import { getProductMainImage } from '@/lib/product-image';
import { getDisplayAnchor } from '@/lib/pricing';

interface RelatedProductsProps {
  currentProduct: Product;
  locale: Locale;
}

export function RelatedProducts({ currentProduct, locale }: RelatedProductsProps) {
  // 获取同分类的其他产品
  const relatedProducts = getProductsByCategory(currentProduct.category_slug)
    .filter((p) => p.sku_code !== currentProduct.sku_code)
    .slice(0, 4);
  
  if (relatedProducts.length === 0) return null;
  
  const translations = {
    'zh-hk': { title: '相關產品', viewAll: '查看全部' },
    'en': { title: 'Related Products', viewAll: 'View All' },
    'ja': { title: '関連製品', viewAll: 'すべて見る' },
  };
  
  const t = translations[locale];
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
        <a 
          href={`/${locale}/category/${currentProduct.category_slug}/`}
          className="text-[#2873F5] text-sm hover:underline"
        >
          {t.viewAll} →
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <a
            key={product.sku_code}
            href={`/${locale}/product/${product.slug}/`}
            className="group bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-gray-100">
              <img
                src={getProductMainImage(product, locale)}
                alt={getProductImageAlt(product, locale)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-3">
              <h3 className="text-lg font-medium text-gray-900 line-clamp-1 group-hover:text-[#2873F5]">
                {getProductDisplayTitle(product, locale)}
              </h3>
              <p className="text-sm text-[#F87314] font-semibold mt-1">
                {(() => { const a = getDisplayAnchor(product.slug, locale); return a ? `${a.big} ${a.unitLabel}${locale === 'zh-hk' ? '起' : locale === 'en' ? 'from' : '〜'}` : product.price_range; })()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
