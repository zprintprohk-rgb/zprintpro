'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, ShoppingCart, Info } from 'lucide-react';
import { Locale } from '@/lib/seo';
import { Product } from '@/data/products';

interface QuoteCalculatorProps {
  product: Product;
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '即時報價',
    quantity: '數量',
    material: '材質',
    size: '尺寸',
    finishing: '加工',
    turnaround: '製作時間',
    turnaroundOptions: {
      standard: '標準 (3-5工作天)',
      express: '急件 (1-2工作天) +30%',
      rush: '特急 (即日) +50%',
    },
    unitPrice: '單價',
    totalPrice: '總價',
    addToCart: '加入購物車',
    getQuote: '獲取報價',
    contactUs: '聯絡我們獲取詳細報價',
    note: '以上價格僅供參考，實際價格以訂單確認為準',
  },
  en: {
    title: 'Instant Quote',
    quantity: 'Quantity',
    material: 'Material',
    size: 'Size',
    finishing: 'Finishing',
    turnaround: 'Turnaround',
    turnaroundOptions: {
      standard: 'Standard (3-5 days)',
      express: 'Express (1-2 days) +30%',
      rush: 'Rush (Same day) +50%',
    },
    unitPrice: 'Unit Price',
    totalPrice: 'Total Price',
    addToCart: 'Add to Cart',
    getQuote: 'Get Quote',
    contactUs: 'Contact us for detailed quote',
    note: 'Prices are for reference only, actual price subject to order confirmation',
  },
  ja: {
    title: '即時見積もり',
    quantity: '数量',
    material: '素材',
    size: 'サイズ',
    finishing: '加工',
    turnaround: '納期',
    turnaroundOptions: {
      standard: '標準 (3-5日)',
      express: '急ぎ (1-2日) +30%',
      rush: '特急 (当日) +50%',
    },
    unitPrice: '単価',
    totalPrice: '合計',
    addToCart: 'カートに追加',
    getQuote: '見積もりを取得',
    contactUs: '詳細な見積もりはお問い合わせください',
    note: '価格は参考用です、実際の価格は注文確認時に確定します',
  },
};

export function QuoteCalculator({ product, locale }: QuoteCalculatorProps) {
  const t = translations[locale];
  const [quantity, setQuantity] = useState(product.minQuantity);
  const [material, setMaterial] = useState(product.options?.material?.[0]?.value || '');
  const [size, setSize] = useState(product.options?.size?.[0]?.value || '');
  const [finishing, setFinishing] = useState(product.options?.finishing?.[0]?.value || 'none');
  const [turnaround, setTurnaround] = useState('standard');

  // Calculate price
  const calculatedPrice = useMemo(() => {
    let basePrice = product.basePrice;

    // Material price adjustment
    const selectedMaterial = product.options?.material?.find(m => m.value === material);
    if (selectedMaterial?.priceAdjustment) {
      basePrice += selectedMaterial.priceAdjustment;
    }

    // Size price adjustment
    const selectedSize = product.options?.size?.find(s => s.value === size);
    if (selectedSize?.priceAdjustment) {
      basePrice += selectedSize.priceAdjustment;
    }

    // Finishing price adjustment
    const selectedFinishing = product.options?.finishing?.find(f => f.value === finishing);
    if (selectedFinishing?.priceAdjustment) {
      basePrice += selectedFinishing.priceAdjustment;
    }

    // Quantity discount
    let quantityMultiplier = 1;
    if (quantity >= 1000) quantityMultiplier = 0.7;
    else if (quantity >= 500) quantityMultiplier = 0.8;
    else if (quantity >= 250) quantityMultiplier = 0.85;
    else if (quantity >= 100) quantityMultiplier = 0.9;

    // Turnaround multiplier
    let turnaroundMultiplier = 1;
    if (turnaround === 'express') turnaroundMultiplier = 1.3;
    if (turnaround === 'rush') turnaroundMultiplier = 1.5;

    const unitPrice = Math.round(basePrice * quantityMultiplier * turnaroundMultiplier);
    const totalPrice = unitPrice * quantity;

    return { unitPrice, totalPrice };
  }, [quantity, material, size, finishing, turnaround, product]);

  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-[#2873F5]" />
        <h3 className="font-semibold text-[#333333]">{t.title}</h3>
      </div>

      <div className="space-y-4">
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            {t.quantity}
          </label>
          <input
            type="number"
            min={product.minQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(product.minQuantity, parseInt(e.target.value) || product.minQuantity))}
            className="w-full px-4 py-2 border border-[#DDDDDD] rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent outline-none"
          />
        </div>

        {/* Material */}
        {product.options?.material && product.options.material.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              {t.material}
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-4 py-2 border border-[#DDDDDD] rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent outline-none"
            >
              {product.options.material.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}{m.priceAdjustment ? ` (+$${m.priceAdjustment})` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Size */}
        {product.options?.size && product.options.size.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              {t.size}
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border border-[#DDDDDD] rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent outline-none"
            >
              {product.options.size.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}{s.priceAdjustment ? ` (+$${s.priceAdjustment})` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Finishing */}
        {product.options?.finishing && product.options.finishing.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              {t.finishing}
            </label>
            <select
              value={finishing}
              onChange={(e) => setFinishing(e.target.value)}
              className="w-full px-4 py-2 border border-[#DDDDDD] rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent outline-none"
            >
              {product.options.finishing.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}{f.priceAdjustment ? ` (+$${f.priceAdjustment})` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Turnaround */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            {t.turnaround}
          </label>
          <select
            value={turnaround}
            onChange={(e) => setTurnaround(e.target.value)}
            className="w-full px-4 py-2 border border-[#DDDDDD] rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent outline-none"
          >
            <option value="standard">{t.turnaroundOptions.standard}</option>
            <option value="express">{t.turnaroundOptions.express}</option>
            <option value="rush">{t.turnaroundOptions.rush}</option>
          </select>
        </div>

        {/* Price Display */}
        <div className="border-t border-[#EEEEEE] pt-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#666666]">{t.unitPrice}</span>
            <span className="font-medium text-[#333333]">${calculatedPrice.unitPrice}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-[#333333]">{t.totalPrice}</span>
            <span className="text-2xl font-bold text-[#F87314]">${calculatedPrice.totalPrice.toLocaleString()}</span>
          </div>

          <button className="w-full bg-[#F87314] hover:bg-[#E56203] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            {t.addToCart}
          </button>
        </div>

        {/* Note */}
        <div className="flex items-start gap-2 text-xs text-[#999999]">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>{t.note}</p>
        </div>
      </div>
    </div>
  );
}
