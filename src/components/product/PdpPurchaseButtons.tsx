'use client';

/**
 * PDP 购买按钮区 (K3 2026-10-29 拍板「立即購買」· 批 1)
 * - 数量选择 (min = minQuantity, products.ts 真值) + 单价 × 数量实时小计
 * - 加入購物車 (cart-context, localStorage) + 立即購買 (加购后直达 /cart)
 * - 币种口径 = merchant feed 同源 (zh-hk HKD / en USD / ja JPY; basePrice_en/ja 缺失按 feed fallback 汇率) → 与 GMC 价格一致性
 * - 红线: 不改报价/WhatsApp 主 CTA (定制主转化), 购买行为增量补位
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/data/products';

type Locale = 'zh-hk' | 'en' | 'ja';

const T: Record<Locale, Record<string, string>> = {
  'zh-hk': {
    quantity: '數量',
    addToCart: '加入購物車',
    buyNow: '立即購買',
    added: '已加入購物車 ✓',
    total: '小計',
    cart: '購物車',
  },
  en: {
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    added: 'Added to cart ✓',
    total: 'Subtotal',
    cart: 'cart',
  },
  ja: {
    quantity: '数量',
    addToCart: 'カートに追加',
    buyNow: '今すぐ購入',
    added: 'カートに追加しました ✓',
    total: '小計',
    cart: 'カート',
  },
};

const CURRENCY_BY_LOCALE: Record<Locale, string> = { 'zh-hk': 'HKD', en: 'USD', ja: 'JPY' };
const SYMBOL: Record<string, string> = { HKD: 'HK$', USD: '$', JPY: '¥' };
const FALLBACK_RATES = { USD: 0.128, JPY: 19.5 } as const;

function getLocalePrice(p: Product, locale: Locale): number {
  if (locale === 'en') {
    return p.basePrice_en ?? Number((p.basePrice * FALLBACK_RATES.USD).toFixed(2));
  }
  if (locale === 'ja') {
    return p.basePrice_ja ?? Math.round(p.basePrice * FALLBACK_RATES.JPY);
  }
  return p.basePrice;
}

function formatMoney(value: number, currency: string): string {
  return `${SYMBOL[currency]}${currency === 'JPY' ? Math.round(value).toLocaleString('en-US') : value.toFixed(2)}`;
}

export default function PdpPurchaseButtons({ product, locale }: { product: Product; locale: Locale }) {
  const t = T[locale] ?? T['zh-hk'];
  const currency = CURRENCY_BY_LOCALE[locale];
  const unitPrice = getLocalePrice(product, locale);
  const minQty = product.minQuantity && product.minQuantity > 0 ? product.minQuantity : 1;
  const router = useRouter();
  const { addItem } = useCart();
  const [qty, setQty] = useState(minQty);
  const [added, setAdded] = useState(false);

  if (!product?.slug || !unitPrice || unitPrice <= 0) return null;

  function addItemToCart(): void {
    addItem({
      sku_code: product.sku_code,
      slug: product.slug,
      name: product.name,
      nameEn: product.nameEn,
      nameJa: product.nameJa,
      image: product.images?.[0] ?? '',
      price_range: product.price_range ?? '',
      category_slug: product.category_slug,
      unitPrice,
      quantity: qty,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="mt-4 rounded-[12px] border border-[#E5E7EB] bg-white p-4" data-purchase-block>
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-[13.5px] text-[#6B7280]" htmlFor={`qty-${product.slug}`}>
          {t.quantity}
        </label>
        <div className="inline-flex items-center rounded-[8px] border border-[#E5E7EB]">
          <button
            type="button"
            aria-label="-"
            className="px-3 py-1.5 text-gray-500 hover:text-[#F87314]"
            onClick={() => setQty((q) => Math.max(minQty, q - Math.max(1, Math.round(minQty / 10))))}
          >
            −
          </button>
          <input
            id={`qty-${product.slug}`}
            type="number"
            min={minQty}
            value={qty}
            onChange={(e) => {
              const v = Math.max(minQty, Math.round(Number(e.target.value) || minQty));
              setQty(v);
            }}
            className="w-16 border-x border-[#E5E7EB] py-1.5 text-center text-sm outline-none"
          />
          <button
            type="button"
            aria-label="+"
            className="px-3 py-1.5 text-gray-500 hover:text-[#F87314]"
            onClick={() => setQty((q) => q + Math.max(1, Math.round(minQty / 10)))}
          >
            +
          </button>
        </div>
        <span className="text-sm text-[#6B7280]">
          {formatMoney(unitPrice, currency)} × {qty} ={' '}
          <span className="font-bold text-[#1D3465]">{formatMoney(unitPrice * qty, currency)}</span>
        </span>
        <span className="text-xs text-gray-400">MOQ {minQty}</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={addItemToCart}
          className="text-center border-2 border-[#1D3465] bg-white text-[#1D3465] font-bold text-[15px] py-[13px] rounded-[10px] hover:bg-[#EEF2FF] transition-colors"
        >
          {added ? t.added : t.addToCart}
        </button>
        <button
          type="button"
          onClick={() => {
            addItemToCart();
            router.push(`/${locale}/cart`);
          }}
          className="text-center bg-[#F87314] text-white font-bold text-[15px] py-[13px] rounded-[10px] shadow-[0_6px_18px_rgba(248,115,22,0.35)] hover:bg-[#e8660a] transition-colors"
        >
          {t.buyNow} →
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-400">{t.total}: {formatMoney(unitPrice * qty, currency)} · {t.cart} → 結算</p>
    </div>
  );
}
