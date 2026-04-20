/**
 * 报价计算器组件
 * 对标WooCommerce报价功能
 * 支持材质、尺寸、数量选择和实时价格计算
 */

'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { getProductTitle } from '@/data/products';

interface QuoteCalculatorProps {
  product: Product;
  locale: Locale;
}

interface QuoteConfig {
  size: string;
  material: string;
  quantity: number;
}

export function QuoteCalculator({ product, locale }: QuoteCalculatorProps) {
  const [config, setConfig] = useState<QuoteConfig>({
    size: product.variables?.sizes?.[0]?.value || 'standard',
    material: product.variables?.materials?.[0]?.value || 'standard',
    quantity: product.variables?.quantities?.[0]?.value || 100,
  });
  
  // 翻译
  const translations = {
    'zh-hk': {
      size: '尺寸規格',
      material: '材質選擇',
      quantity: '印刷數量',
      unitPrice: '單價',
      totalPrice: '總價',
      getQuote: '獲取報價',
      addToCart: '加入購物車',
      buyNow: '立即購買',
      uploadDesign: '上傳設計稿',
      designNote: '支持 PDF, AI, PSD, PNG 格式',
      deliveryTime: '預計交貨',
      days: '工作日',
    },
    'en': {
      size: 'Size',
      material: 'Material',
      quantity: 'Quantity',
      unitPrice: 'Unit Price',
      totalPrice: 'Total Price',
      getQuote: 'Get Quote',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      uploadDesign: 'Upload Design',
      designNote: 'Support PDF, AI, PSD, PNG formats',
      deliveryTime: 'Estimated Delivery',
      days: 'business days',
    },
    'ja': {
      size: 'サイズ',
      material: '素材',
      quantity: '数量',
      unitPrice: '単価',
      totalPrice: '合計',
      getQuote: '見積もり',
      addToCart: 'カートに追加',
      buyNow: '今すぐ購入',
      uploadDesign: 'デザインをアップロード',
      designNote: 'PDF, AI, PSD, PNG形式対応',
      deliveryTime: '予定納期',
      days: '営業日',
    },
  };
  
  const t = translations[locale];
  
  // 计算价格
  const calculatedPrice = useMemo(() => {
    const sizeMultiplier = product.variables?.sizes?.find(s => s.value === config.size)?.multiplier || 1;
    const materialSurcharge = product.variables?.materials?.find(m => m.value === config.material)?.surcharge || 0;
    const quantityDiscount = product.variables?.quantities?.find(q => q.value === config.quantity)?.discount || 1;
    
    // basePrice 是单价（每张/每个），materialSurcharge 是每批(minQuantity)附加费，需转换为单价
    const surchargePerUnit = product.minQuantity > 0 ? materialSurcharge / product.minQuantity : materialSurcharge;
    const unitPrice = (product.basePrice + surchargePerUnit) * sizeMultiplier * quantityDiscount;
    const totalPrice = unitPrice * config.quantity;
    
    return { unitPrice: Math.round(unitPrice * 100) / 100, totalPrice: Math.round(totalPrice * 100) / 100 };
  }, [config, product]);
  
  // 处理Stripe结账
  const handleCheckout = async () => {
    // 这里应该调用Stripe Checkout
    // 由于静态导出限制，使用客户端重定向到Stripe
    const stripeUrl = `https://checkout.stripe.com/pay?product=${product.sku_code}&quantity=${config.quantity}`;
    window.location.href = stripeUrl;
  };
  
  return (
    <div className="space-y-6">
      {/* 尺寸选择 */}
      {product.variables?.sizes && product.variables.sizes.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.size}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {product.variables.sizes.map((size) => (
              <button
                key={size.value}
                onClick={() => setConfig({ ...config, size: size.value })}
                className={`px-4 py-2 border rounded-lg text-sm ${
                  config.size === size.value
                    ? 'border-[#2873F5] bg-[#2873F5]/5 text-[#2873F5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* 材质选择 */}
      {product.variables?.materials && product.variables.materials.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.material}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {product.variables.materials.map((material) => (
              <button
                key={material.value}
                onClick={() => setConfig({ ...config, material: material.value })}
                className={`px-4 py-2 border rounded-lg text-sm ${
                  config.material === material.value
                    ? 'border-[#2873F5] bg-[#2873F5]/5 text-[#2873F5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {material.label}
                {material.surcharge > 0 && (
                  <span className="text-xs text-gray-500 ml-1">
                    +HK${Math.round((material.surcharge / product.minQuantity) * 100) / 100}/張
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* 数量选择 */}
      {product.variables?.quantities && product.variables.quantities.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.quantity}
          </label>
          <div className="flex flex-wrap gap-2">
            {product.variables.quantities.map((qty) => (
              <button
                key={qty.value}
                onClick={() => setConfig({ ...config, quantity: qty.value })}
                className={`px-4 py-2 border rounded-lg text-sm ${
                  config.quantity === qty.value
                    ? 'border-[#2873F5] bg-[#2873F5]/5 text-[#2873F5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {qty.label}
                {qty.discount < 1 && (
                  <span className="text-xs text-green-600 ml-1">
                    -{Math.round((1 - qty.discount) * 100)}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* 文件上传 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.uploadDesign}
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2873F5] transition-colors cursor-pointer">
          <input
            type="file"
            accept=".pdf,.ai,.psd,.png,.jpg,.jpeg"
            className="hidden"
            id="design-upload"
          />
          <label htmlFor="design-upload" className="cursor-pointer">
            <div className="text-gray-400 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">{t.designNote}</p>
          </label>
        </div>
      </div>
      
      {/* 价格显示 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">{t.unitPrice}</span>
          <span className="font-medium">HK${calculatedPrice.unitPrice}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-gray-900">{t.totalPrice}</span>
          <span className="text-[#2873F5]">HK${calculatedPrice.totalPrice.toLocaleString()}</span>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {t.deliveryTime}: 3-5 {t.days}
        </div>
      </div>
      
      {/* 操作按钮 */}
      <div className="space-y-3">
        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-[#2873F5] text-white rounded-lg font-medium hover:bg-[#1e5fd1] transition-colors"
        >
          {t.buyNow}
        </button>
        <button
          className="w-full py-3 border border-[#2873F5] text-[#2873F5] rounded-lg font-medium hover:bg-[#2873F5]/5 transition-colors"
        >
          {t.addToCart}
        </button>
        <button
          className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          {t.getQuote}
        </button>
      </div>
    </div>
  );
}
