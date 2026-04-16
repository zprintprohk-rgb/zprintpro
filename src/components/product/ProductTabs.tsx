'use client';

import React, { useState } from 'react';
import { Check, Info, Truck, FileText } from 'lucide-react';
import { Locale } from '@/lib/seo';
import { Product } from '@/data/products';

interface ProductTabsProps {
  product: Product;
  locale: Locale;
}

const translations = {
  'zh-hk': {
    tabs: {
      description: '產品描述',
      specs: '規格參數',
      shipping: '送貨資訊',
      templates: '設計模板',
    },
    specs: {
      material: '材質',
      size: '尺寸',
      printMethod: '印刷方式',
      finishing: '加工工藝',
      turnaround: '製作時間',
    },
    shipping: {
      freeShipping: '滿$500免運費',
      standard: '標準送貨: 3-5個工作天',
      express: '急件送貨: 1-2個工作天',
      selfPickup: '門市自取: 觀塘',
    },
    templates: {
      description: '下載設計模板，確保您的設計符合印刷要求',
      download: '下載模板',
    },
  },
  en: {
    tabs: {
      description: 'Description',
      specs: 'Specifications',
      shipping: 'Shipping',
      templates: 'Templates',
    },
    specs: {
      material: 'Material',
      size: 'Size',
      printMethod: 'Print Method',
      finishing: 'Finishing',
      turnaround: 'Turnaround',
    },
    shipping: {
      freeShipping: 'Free shipping over $500',
      standard: 'Standard: 3-5 business days',
      express: 'Express: 1-2 business days',
      selfPickup: 'Self pickup: Kwun Tong',
    },
    templates: {
      description: 'Download design templates to ensure your design meets printing requirements',
      download: 'Download Template',
    },
  },
  ja: {
    tabs: {
      description: '製品説明',
      specs: '仕様',
      shipping: '配送',
      templates: 'テンプレート',
    },
    specs: {
      material: '素材',
      size: 'サイズ',
      printMethod: '印刷方法',
      finishing: '加工',
      turnaround: '納期',
    },
    shipping: {
      freeShipping: '500ドル以上送料無料',
      standard: '標準配送: 3-5営業日',
      express: '急ぎ配送: 1-2営業日',
      selfPickup: '店頭受取: 観塘',
    },
    templates: {
      description: '印刷要件を満たすためにデザインテンプレートをダウンロード',
      download: 'テンプレートをダウンロード',
    },
  },
};

export function ProductTabs({ product, locale }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');
  const t = translations[locale];

  const getProductDescription = () => {
    switch (locale) {
      case 'en': return product.descriptionEn;
      case 'ja': return product.descriptionJa;
      default: return product.description;
    }
  };

  const getProductLongDescription = () => {
    switch (locale) {
      case 'en': return product.longDescriptionEn || product.descriptionEn;
      case 'ja': return product.longDescriptionJa || product.descriptionJa;
      default: return product.longDescription || product.description;
    }
  };

  const tabs = [
    { id: 'description', label: t.tabs.description, icon: Info },
    { id: 'specs', label: t.tabs.specs, icon: FileText },
    { id: 'shipping', label: t.tabs.shipping, icon: Truck },
  ];

  return (
    <div className="mt-8">
      {/* Tab Navigation */}
      <div className="border-b border-[#EEEEEE]">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 font-medium transition-colors relative ${
                activeTab === tab.id 
                  ? 'text-[#2873F5]' 
                  : 'text-[#666666] hover:text-[#333333]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2873F5]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-[#666666] leading-relaxed">
              {getProductLongDescription()}
            </p>
            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-[#333333] mb-3">產品特點</h4>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-[#666666]">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {product.specs?.material && (
                  <tr className="border-b border-[#EEEEEE]">
                    <td className="py-3 text-[#666666] w-1/3">{t.specs.material}</td>
                    <td className="py-3 text-[#333333]">{product.specs.material}</td>
                  </tr>
                )}
                {product.specs?.size && (
                  <tr className="border-b border-[#EEEEEE]">
                    <td className="py-3 text-[#666666]">{t.specs.size}</td>
                    <td className="py-3 text-[#333333]">{product.specs.size}</td>
                  </tr>
                )}
                {product.specs?.printMethod && (
                  <tr className="border-b border-[#EEEEEE]">
                    <td className="py-3 text-[#666666]">{t.specs.printMethod}</td>
                    <td className="py-3 text-[#333333]">{product.specs.printMethod}</td>
                  </tr>
                )}
                {product.specs?.finishing && (
                  <tr className="border-b border-[#EEEEEE]">
                    <td className="py-3 text-[#666666]">{t.specs.finishing}</td>
                    <td className="py-3 text-[#333333]">{product.specs.finishing}</td>
                  </tr>
                )}
                <tr>
                  <td className="py-3 text-[#666666]">{t.specs.turnaround}</td>
                  <td className="py-3 text-[#333333]">{product.turnaround}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-[#333333]">{t.shipping.freeShipping}</h4>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#2873F5]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-[#2873F5]" />
              </div>
              <div>
                <h4 className="font-medium text-[#333333]">{t.shipping.standard}</h4>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#F87314]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-[#F87314]" />
              </div>
              <div>
                <h4 className="font-medium text-[#333333]">{t.shipping.express}</h4>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium text-[#333333]">{t.shipping.selfPickup}</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
