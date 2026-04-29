'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Locale } from '@/lib/seo';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package } from 'lucide-react';

interface CartPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '購物車',
    empty: '購物車是空的',
    emptyDesc: '快去選購您喜歡的印刷產品吧',
    browse: '瀏覽產品',
    product: '產品',
    unitPrice: '單價',
    qty: '數量',
    subtotal: '小計',
    delete: '刪除',
    orderSummary: '訂單摘要',
    items: '件商品',
    total: '合計',
    shipping: '運費',
    shippingNote: '結算時計算',
    checkout: '前往結算',
    continue: '繼續購物',
    options: '規格',
  },
  en: {
    title: 'Shopping Cart',
    empty: 'Your cart is empty',
    emptyDesc: 'Browse our printing products',
    browse: 'Browse Products',
    product: 'Product',
    unitPrice: 'Unit Price',
    qty: 'Quantity',
    subtotal: 'Subtotal',
    delete: 'Remove',
    orderSummary: 'Order Summary',
    items: 'items',
    total: 'Total',
    shipping: 'Shipping',
    shippingNote: 'Calculated at checkout',
    checkout: 'Proceed to Checkout',
    continue: 'Continue Shopping',
    options: 'Options',
  },
  ja: {
    title: 'カート',
    empty: 'カートは空です',
    emptyDesc: '印刷製品をお選びください',
    browse: '製品を見る',
    product: '製品',
    unitPrice: '単価',
    qty: '数量',
    subtotal: '小計',
    delete: '削除',
    orderSummary: '注文概要',
    items: '点',
    total: '合計',
    shipping: '送料',
    shippingNote: '決済時に計算',
    checkout: 'レジへ進む',
    continue: '買い物を続ける',
    options: '仕様',
  },
};

export default function CartClient({ params }: CartPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const router = useRouter();
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const localePrefix = `/${locale}`;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl border border-gray-100 p-12 max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#333333] mb-2">{t.empty}</h1>
            <p className="text-gray-500 mb-6">{t.emptyDesc}</p>
            <Link
              href={`${localePrefix}/`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2873F5] text-white rounded-lg font-medium hover:bg-[#1E5FD1] transition-colors"
            >
              {t.browse}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#333333] mb-8">{t.title}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div
                key={item.sku_code}
                className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex gap-4"
              >
                {/* Image */}
                <Link
                  href={`${localePrefix}/product/${item.slug}/`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0"
                >
                  <Image
                    src={item.image}
                    alt={locale === 'zh-hk' ? item.name : locale === 'en' ? item.nameEn : item.nameJa}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`${localePrefix}/product/${item.slug}/`}
                        className="font-semibold text-[#333333] hover:text-[#2873F5] transition-colors line-clamp-1"
                      >
                        {locale === 'zh-hk' ? item.name : locale === 'en' ? item.nameEn : item.nameJa}
                      </Link>
                      {item.options && (item.options.sizeLabel || item.options.materialLabel || item.options.finishingLabel) && (
                        <p className="text-xs text-gray-400 mt-1">
                          {t.options}: {[item.options.sizeLabel, item.options.materialLabel, item.options.finishingLabel].filter(Boolean).join(' / ')}
                        </p>
                      )}
                      <p className="text-sm text-[#F87314] font-medium mt-1">
                        HK${item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.sku_code)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title={t.delete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.sku_code, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.sku_code, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-bold text-[#333333]">
                      HK${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href={`${localePrefix}/`}
              className="inline-flex items-center gap-1.5 text-sm text-[#2873F5] hover:underline"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              {t.continue}
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h2 className="font-bold text-[#333333] mb-4">{t.orderSummary}</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t.items}</span>
                  <span className="font-medium">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t.subtotal}</span>
                  <span className="font-medium">HK${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t.shipping}</span>
                  <span className="text-gray-400">{t.shippingNote}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[#333333]">{t.total}</span>
                  <span className="text-xl font-bold text-[#F87314]">HK${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => router.push(`${localePrefix}/checkout/`)}
                className="w-full mt-5 py-3 bg-[#F87314] text-white rounded-lg font-bold hover:bg-[#E56203] transition-colors flex items-center justify-center gap-2"
              >
                {t.checkout}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
