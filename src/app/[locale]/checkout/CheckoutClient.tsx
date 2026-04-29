'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Locale } from '@/lib/seo';
import { Package, ArrowRight, Mail, Phone, MapPin, User, FileText, AlertCircle, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CheckoutPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '結算',
    orderItems: '訂單商品',
    contactInfo: '聯絡信息',
    name: '姓名',
    namePlaceholder: '請輸入您的姓名',
    phone: '電話',
    phonePlaceholder: '請輸入聯絡電話',
    email: '電郵',
    emailPlaceholder: '請輸入電郵地址',
    address: '送貨地址',
    addressPlaceholder: '請輸入詳細送貨地址',
    notes: '訂單備註',
    notesPlaceholder: '如有特殊要求請在此說明',
    fileUpload: '設計稿上傳',
    fileNote: '請在付款後將設計稿（PDF/AI/PSD）及付款證明一併電郵至 zprintpro@outlook.com',
    submitOrder: '提交訂單',
    backToCart: '返回購物車',
    required: '必填',
    subtotal: '小計',
    shipping: '運費',
    shippingNote: '結算後客服確認',
    total: '合計',
    submitSuccess: '訂單已提交',
    submitDesc: '請查看訂單確認頁面並完成付款',
    paymentMethod: '付款方式',
    paymentNote: '提交後將顯示收款碼',
  },
  en: {
    title: 'Checkout',
    orderItems: 'Order Items',
    contactInfo: 'Contact Information',
    name: 'Name',
    namePlaceholder: 'Enter your name',
    phone: 'Phone',
    phonePlaceholder: 'Enter contact number',
    email: 'Email',
    emailPlaceholder: 'Enter email address',
    address: 'Delivery Address',
    addressPlaceholder: 'Enter detailed delivery address',
    notes: 'Order Notes',
    notesPlaceholder: 'Any special requirements',
    fileUpload: 'Design File Upload',
    fileNote: 'Please email your design files (PDF/AI/PSD) and payment proof to zprintpro@outlook.com after payment',
    submitOrder: 'Submit Order',
    backToCart: 'Back to Cart',
    required: 'Required',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    shippingNote: 'Confirmed by customer service',
    total: 'Total',
    submitSuccess: 'Order Submitted',
    submitDesc: 'Please check the order confirmation page and complete payment',
    paymentMethod: 'Payment Method',
    paymentNote: 'QR codes will be shown after submission',
  },
  ja: {
    title: 'レジ',
    orderItems: '注文商品',
    contactInfo: '連絡先情報',
    name: 'お名前',
    namePlaceholder: 'お名前を入力',
    phone: '電話番号',
    phonePlaceholder: '連絡先電話番号',
    email: 'メール',
    emailPlaceholder: 'メールアドレス',
    address: '配送先住所',
    addressPlaceholder: '詳細な配送先住所',
    notes: '注文備考',
    notesPlaceholder: '特別なご要望があれば',
    fileUpload: 'デザインファイル',
    fileNote: 'お支払い後、デザインファイル（PDF/AI/PSD）と領収書を zprintpro@outlook.com までお送りください',
    submitOrder: '注文を確定',
    backToCart: 'カートに戻る',
    required: '必須',
    subtotal: '小計',
    shipping: '送料',
    shippingNote: '決済後に確認',
    total: '合計',
    submitSuccess: '注文を受け付けました',
    submitDesc: '注文確認ページでQRコードを確認し、お支払いを完了してください',
    paymentMethod: '支払方法',
    paymentNote: '送信後にQRコードが表示されます',
  },
};

export default function CheckoutClient({ params }: CheckoutPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const localePrefix = `/${locale}`;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ── load saved contact info from localStorage ── */
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('zprintpro-contact-info');
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({
          ...prev,
          name: parsed.name || '',
          phone: parsed.phone || '',
          email: parsed.email || '',
          address: parsed.address || '',
        }));
      }
    } catch {
      // ignore
    }
    if (items.length === 0 && !submitted) {
      router.push(`${localePrefix}/cart/`);
    }
  }, [items.length, submitted, router, localePrefix]);

  if (!mounted || (items.length === 0 && !submitted)) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-[1320px] mx-auto px-4 text-center">
          <div className="bg-white rounded-xl border border-gray-100 p-12 max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;
    /* save contact info for next time */
    localStorage.setItem('zprintpro-contact-info', JSON.stringify({
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
    }));
    const orderId = 'ZP' + Date.now().toString(36).toUpperCase();
    const orderData = {
      id: orderId,
      items,
      total: totalPrice,
      form,
      date: new Date().toISOString(),
      locale,
    };
    localStorage.setItem('zprintpro-current-order', JSON.stringify(orderData));
    clearCart();
    setSubmitted(true);
    router.push(`${localePrefix}/order-confirmation/?order=${orderId}`);
  };

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] text-sm';

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#333333] mb-8">{t.title}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="font-bold text-[#333333] mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#2873F5]" />
                  {t.contactInfo}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t.name} <span className="text-red-500">*</span>
                    </label>
                    <input type="text" required autoComplete="name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder={t.namePlaceholder} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t.phone} <span className="text-red-500">*</span>
                    </label>
                    <input type="tel" required autoComplete="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder={t.phonePlaceholder} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      {t.email} <span className="text-red-500">*</span>
                    </label>
                    <input type="email" required autoComplete="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder={t.emailPlaceholder} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">{t.address}</label>
                    <input type="text" autoComplete="street-address" value={form.address} onChange={(e) => handleChange('address', e.target.value)} placeholder={t.addressPlaceholder} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">{t.notes}</label>
                    <textarea rows={3} value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} placeholder={t.notesPlaceholder} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* File Upload Notice */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-800 text-sm">{t.fileUpload}</h3>
                    <p className="text-sm text-amber-700 mt-1">{t.fileNote}</p>
                  </div>
                </div>
              </div>

              {/* Payment Notice */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#2873F5] mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#2873F5] text-sm">{t.paymentMethod}</h3>
                    <p className="text-sm text-blue-700 mt-1">{t.paymentNote}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => router.push(`${localePrefix}/cart/`)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  {t.backToCart}
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#F87314] text-white rounded-lg font-bold hover:bg-[#E56203] transition-colors flex items-center justify-center gap-2">
                  {t.submitOrder}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h2 className="font-bold text-[#333333] mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#2873F5]" />
                {t.orderItems}
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.sku_code} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={item.image} alt={item.name} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#333333] line-clamp-1">
                        {locale === 'zh-hk' ? item.name : locale === 'en' ? item.nameEn : item.nameJa}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.options?.sizeLabel || ''} {item.options?.materialLabel || ''} × {item.quantity}
                      </p>
                      <p className="text-sm text-[#F87314] font-medium">HK${(item.unitPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">{t.subtotal}</span><span className="font-medium">HK${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">{t.shipping}</span><span className="text-gray-400">{t.shippingNote}</span></div>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[#333333]">{t.total}</span>
                  <span className="text-xl font-bold text-[#F87314]">HK${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
