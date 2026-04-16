/**
 * 产品详情页 (PDP - Product Detail Page)
 * 显示单个产品的详细信息、报价计算器、加入购物车
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  getProductBySlug, 
  getCategoryBySlug,
  getCategoryName,
  getProductTitle,
  getProductDescription,
  products 
} from '@/lib/products';
import { 
  generateProductMetadata, 
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
  generateOrganizationJsonLd,
  Locale 
} from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ProductGallery } from '@/components/ProductGallery';
import { QuoteCalculator } from '@/components/quote/QuoteCalculator';
import { ProductTabs } from '@/components/ProductTabs';
import { RelatedProducts } from '@/components/RelatedProducts';

// 生成静态参数 - 79产品 × 3语言 = 237个路径
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  const locales: Locale[] = ['zh-hk', 'en', 'ja'];
  const productSlugs = products.map((p) => p.slug);
  
  locales.forEach((locale) => {
    productSlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  
  return params;
}

// 生成页面元数据
export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { title: 'Not Found' };
  }
  
  return generateProductMetadata(locale, product.name, product.nameEn, product.nameJa, product.description, product.descriptionEn, product.descriptionJa, product.slug);
}

// 产品详情页组件
export default function ProductPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const product = getProductBySlug(slug);
  
  // 产品不存在时返回404
  if (!product) {
    notFound();
  }
  
  // 获取分类信息
  const category = getCategoryBySlug(product.category_slug);
  const categoryName = category ? getCategoryName(category, locale) : '';
  
  // 获取产品信息
  const productTitle = getProductTitle(product, locale);
  const productDescription = getProductDescription(product, locale);
  
  // 面包屑数据
  const breadcrumbItems = [
    { name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム', url: `/${locale}` },
    { name: categoryName, url: `/${locale}/category/${product.category_slug}` },
    { name: productTitle, url: `/${locale}/product/${slug}` },
  ];
  
  // JSON-LD结构化数据
  const productJsonLd = generateProductJsonLd(product.name, product.description, product.images[0] || '', product.slug, product.basePrice);
  const organizationJsonLd = generateOrganizationJsonLd();
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);
  
  // 翻译文本
  const translations = {
    'zh-hk': {
      home: '首頁',
      specifications: '規格選擇',
      price: '價格',
      priceRange: '價格範圍',
      getQuote: '獲取報價',
      addToCart: '加入購物車',
      buyNow: '立即購買',
      description: '產品詳情',
      specs: '規格參數',
      shipping: '配送信息',
      reviews: '客戶評價',
      relatedProducts: '相關產品',
      sku: '產品編號',
      category: '產品分類',
      deliveryTime: '交貨時間',
      freeShipping: '滿$500免運費',
      sameDay: '即日交貨',
      quality: '品質保證',
      minOrder: '最低訂購量',
    },
    'en': {
      home: 'Home',
      specifications: 'Specifications',
      price: 'Price',
      priceRange: 'Price Range',
      getQuote: 'Get Quote',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      description: 'Description',
      specs: 'Specifications',
      shipping: 'Shipping',
      reviews: 'Reviews',
      relatedProducts: 'Related Products',
      sku: 'SKU',
      category: 'Category',
      deliveryTime: 'Delivery Time',
      freeShipping: 'Free shipping over $500',
      sameDay: 'Same-day delivery',
      quality: 'Quality Guarantee',
      minOrder: 'Minimum Order',
    },
    'ja': {
      home: 'ホーム',
      specifications: '仕様選択',
      price: '価格',
      priceRange: '価格帯',
      getQuote: '見積もり',
      addToCart: 'カートに追加',
      buyNow: '今すぐ購入',
      description: '製品詳細',
      specs: '仕様',
      shipping: '配送情報',
      reviews: 'レビュー',
      relatedProducts: '関連製品',
      sku: '製品番号',
      category: 'カテゴリー',
      deliveryTime: '納期',
      freeShipping: '500ドル以上送料無料',
      sameDay: '即日納品',
      quality: '品質保証',
      minOrder: '最小注文数',
    },
  };
  
  const t = translations[locale];
  
  return (
    <>
      {/* 结构化数据 */}
      <JsonLd data={productJsonLd} />
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      
      <main className="min-h-screen bg-gray-50">
        {/* 面包屑导航 */}
        <div className="bg-white border-b">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-sm text-gray-500">
              <a href={`/${locale}`} className="hover:text-[#2873F5]">
                {t.home}
              </a>
              <span className="mx-2">/</span>
              <a href={`/${locale}/category/${product.category_slug}`} className="hover:text-[#2873F5]">
                {categoryName}
              </a>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{productTitle}</span>
            </nav>
          </div>
        </div>
        
        {/* 产品详情区 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* 左侧：产品图片 */}
            <div>
              <ProductGallery images={product.images} title={productTitle} />
            </div>
            
            {/* 右侧：产品信息和报价计算器 */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {productTitle}
              </h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productDescription}
              </p>
              
              {/* 价格显示 */}
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <span className="text-sm text-gray-500">{t.priceRange}</span>
                <div className="text-2xl font-bold text-[#2873F5]">
                  {product.price_range}
                </div>
              </div>
              
              {/* 快速信息 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {t.sameDay}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {t.freeShipping}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {t.quality}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {t.minOrder}: 100
                </div>
              </div>
              
              {/* SKU信息 */}
              <div className="text-sm text-gray-500 mb-6">
                {t.sku}: <span className="font-mono">{product.sku_code}</span>
              </div>
              
              {/* 报价计算器 */}
              <div className="border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">{t.specifications}</h3>
                <QuoteCalculator product={product} locale={locale} />
              </div>
            </div>
          </div>
          
          {/* 产品详情Tabs */}
          <div className="mt-12">
            <ProductTabs product={product} locale={locale} />
          </div>
          
          {/* 相关产品 */}
          <div className="mt-12">
            <RelatedProducts 
              currentProduct={product} 
              locale={locale} 
            />
          </div>
        </div>
      </main>
    </>
  );
}
