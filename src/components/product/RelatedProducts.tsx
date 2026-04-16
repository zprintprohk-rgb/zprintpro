'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { Locale } from '@/lib/seo';
import { Product, products } from '@/data/products';

interface RelatedProductsProps {
  currentProduct: Product;
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '相關產品',
    subtitle: '您可能也會喜歡這些產品',
  },
  en: {
    title: 'Related Products',
    subtitle: 'You may also like these products',
  },
  ja: {
    title: '関連製品',
    subtitle: 'こちらの製品もおすすめです',
  },
};

export function RelatedProducts({ currentProduct, locale }: RelatedProductsProps) {
  const t = translations[locale];

  // Get related products from the same category, excluding current product
  const relatedProducts = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#333333]">{t.title}</h2>
          <p className="text-[#666666] mt-2">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
