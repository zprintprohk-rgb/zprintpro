/**
 * 产品详情Tabs组件
 * 切换显示产品详情、规格参数、配送信息
 */

'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { getProductDescription, getProductTitle } from '@/data/products';

interface ProductTabsProps {
  product: Product;
  locale: Locale;
}

export function ProductTabs({ product, locale }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');
  
  const translations = {
    'zh-hk': {
      description: '產品詳情',
      specs: '規格參數',
      shipping: '配送信息',
      material: '材質',
      size: '尺寸',
      finish: '表面處理',
      deliveryTime: '交貨時間',
      shippingMethod: '配送方式',
      freeShipping: '免運條件',
    },
    'en': {
      description: 'Description',
      specs: 'Specifications',
      shipping: 'Shipping',
      material: 'Material',
      size: 'Size',
      finish: 'Finish',
      deliveryTime: 'Delivery Time',
      shippingMethod: 'Shipping Method',
      freeShipping: 'Free Shipping',
    },
    'ja': {
      description: '製品詳細',
      specs: '仕様',
      shipping: '配送情報',
      material: '素材',
      size: 'サイズ',
      finish: '仕上げ',
      deliveryTime: '納期',
      shippingMethod: '配送方法',
      freeShipping: '送料無料条件',
    },
  };
  
  const t = translations[locale];
  const description = getProductDescription(product, locale);
  
  return (
    <div className="bg-white rounded-lg border">
      {/* Tab导航 */}
      <div className="flex border-b">
        {(['description', 'specs', 'shipping'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === tab
                ? 'text-[#2873F5] border-b-2 border-[#2873F5]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t[tab]}
          </button>
        ))}
      </div>
      
      {/* Tab内容 */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">{description}</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{locale === 'zh-hk' ? '產品特點' : locale === 'en' ? 'Product Features' : '製品特徴'}</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {locale === 'zh-hk' ? '高品質印刷' : locale === 'en' ? 'High-quality printing' : '高品質印刷'}</li>
                  <li>• {locale === 'zh-hk' ? '環保材料' : locale === 'en' ? 'Eco-friendly materials' : '環境に優しい素材'}</li>
                  <li>• {locale === 'zh-hk' ? '即日交貨' : locale === 'en' ? 'Same-day delivery' : '即日納品'}</li>
                  <li>• {locale === 'zh-hk' ? '免費設計諮詢' : locale === 'en' ? 'Free design consultation' : '無料デザイン相談'}</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{locale === 'zh-hk' ? '適用場景' : locale === 'en' ? 'Use Cases' : '使用場面'}</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {locale === 'zh-hk' ? '企業宣傳' : locale === 'en' ? 'Corporate promotion' : '企業プロモーション'}</li>
                  <li>• {locale === 'zh-hk' ? '活動推廣' : locale === 'en' ? 'Event promotion' : 'イベントプロモーション'}</li>
                  <li>• {locale === 'zh-hk' ? '產品包裝' : locale === 'en' ? 'Product packaging' : '製品包装'}</li>
                  <li>• {locale === 'zh-hk' ? '品牌展示' : locale === 'en' ? 'Brand display' : 'ブランド展示'}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'specs' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">{t.material}</span>
                <span className="font-medium">300g {locale === 'zh-hk' ? '銅版紙' : locale === 'en' ? 'Glossy Paper' : 'コート紙'}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">{t.size}</span>
                <span className="font-medium">90×54mm</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">{t.finish}</span>
                <span className="font-medium">{locale === 'zh-hk' ? '啞膠/光膠' : locale === 'en' ? 'Matte/Gloss' : 'マット/グロス'}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">{t.deliveryTime}</span>
                <span className="font-medium">{locale === 'zh-hk' ? '3-5工作日' : locale === 'en' ? '3-5 business days' : '3-5営業日'}</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{t.shippingMethod}</h4>
              <p className="text-sm text-gray-600">
                {locale === 'zh-hk' 
                  ? '我們提供多種配送方式，包括順豐速運、本地快遞及門市自取。' 
                  : locale === 'en' 
                  ? 'We offer multiple shipping options including SF Express, local courier, and store pickup.'
                  : 'SFエクスプレス、ローカルクーリエ、店舗受取など、複数の配送オプションを提供しています。'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{t.freeShipping}</h4>
              <p className="text-sm text-gray-600">
                {locale === 'zh-hk' 
                  ? '訂單滿HK$500即可享受免費送貨服務（香港地區）。' 
                  : locale === 'en' 
                  ? 'Free shipping for orders over HK$500 (Hong Kong area).'
                  : '注文金額HK$500以上で送料無料（香港地区）。'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
