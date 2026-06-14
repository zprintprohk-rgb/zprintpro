'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Locale } from '@/lib/seo';
import { Package, ArrowRight, Mail, Phone, MapPin, User, FileText, AlertCircle, ShoppingBag, CreditCard, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AirwallexDropIn } from '@/components/payment/AirwallexDropIn';
import { createPaymentSession } from '@/lib/airwallex';

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
    fileNote: '支持 PDF、AI、PSD、JPG、PNG 格式，單檔不超過 10MB',
    submitOrder: '前往付款',
    backToCart: '返回購物車',
    required: '必填',
    subtotal: '小計',
    shipping: '運費',
    shippingNote: '結算後客服確認',
    total: '合計',
    paymentTitle: '安全付款',
    paymentDesc: '由 Airwallex 提供安全加密支付',
    processing: '處理中...',
    payNow: '立即支付',
    paymentError: '支付初始化失敗，請重試或聯絡客服',
    step1: '1. 確認訂單',
    step2: '2. 安全付款',
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
    fileNote: 'Supports PDF, AI, PSD, JPG, PNG. Max 10MB per file.',
    submitOrder: 'Proceed to Payment',
    backToCart: 'Back to Cart',
    required: 'Required',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    shippingNote: 'Confirmed by customer service',
    total: 'Total',
    paymentTitle: 'Secure Payment',
    paymentDesc: 'Secure encrypted payment powered by Airwallex',
    processing: 'Processing...',
    payNow: 'Pay Now',
    paymentError: 'Payment initialization failed. Please try again or contact support.',
    step1: '1. Review Order',
    step2: '2. Secure Payment',
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
    fileNote: 'PDF、AI、PSD、JPG、PNG対応。1ファイル最大10MB。',
    submitOrder: 'お支払いへ進む',
    backToCart: 'カートに戻る',
    required: '必須',
    subtotal: '小計',
    shipping: '送料',
    shippingNote: '決済後に確認',
    total: '合計',
    paymentTitle: '安全なお支払い',
    paymentDesc: 'Airwallexによる安全な暗号化決済',
    processing: '処理中...',
    payNow: '今すぐ支払う',
    paymentError: '決済の初期化に失敗しました。もう一度お試しいただくか、サポートにお問い合わせください。',
    step1: '1. 注文確認',
    step2: '2. 安全決済',
  },
};

const currencyMap: Record<Locale, string> = {
  'zh-hk': 'HKD',
  'en': 'USD',
  'ja': 'JPY',
};

/**
 * 2026-06-14 Phase B P0-5: JPY 没有小数位（最小单位 = 1 JPY），其他币种以分为单位传给 Airwallex。
 * 返回 - JPY: 实际金额（整数）；HKD/USD: 金额 × 100（分）。
 */
function toSmallestUnit(amount: number, currency: string): number {
  if (currency === 'JPY') return Math.round(amount);
  return Math.round(amount * 100);
}

/** 按币种格式化显示（JA 用 ¥1,234 无小数，HKD/USD 用 $XX.XX 两位小数） */
function formatMoneyForCurrency(amount: number, currency: string): string {
  if (currency === 'JPY') return `¥${Math.round(amount).toLocaleString()}`;
  const symbol = currency === 'HKD' ? 'HK$' : currency === 'USD' ? '$' : currency;
  return `${symbol}${amount.toFixed(2)}`;
}

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
  const [uploadedFiles, setUploadedFiles] = useState<{ url: string; path: string; name: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [paymentData, setPaymentData] = useState<{ clientSecret: string; paymentIntentId: string; orderId: string } | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
    if (items.length === 0) {
      router.push(`${localePrefix}/cart/`);
    }
  }, [items.length, router, localePrefix]);

  if (!mounted) {
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

  // Mounted 但购物车为空：显示友好提示 + 返回购物车链接（不再卡 Loading）
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-[1320px] mx-auto px-4 text-center">
          <div className="bg-white rounded-xl border border-gray-100 p-12 max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#333333] mb-2">
              {locale === 'zh-hk' ? '購物車是空的' : locale === 'en' ? 'Your cart is empty' : 'カートは空です'}
            </h1>
            <p className="text-gray-500 mb-6">
              {locale === 'zh-hk'
                ? '請先將商品加入購物車'
                : locale === 'en'
                ? 'Please add items to your cart first'
                : '先にカートに商品を追加してください'}
            </p>
            <a
              href={`${localePrefix}/cart/`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2873F5] text-white rounded-lg font-medium hover:bg-[#1E5FD1] transition-colors"
            >
              {locale === 'zh-hk' ? '返回購物車' : locale === 'en' ? 'Go to Cart' : 'カートに戻る'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
    );
  }

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newFiles: { url: string; path: string; name: string }[] = [];
    for (const file of Array.from(files)) {
      try {
        const { url, path } = await import('@/lib/supabase').then((m) => m.uploadToSupabase(file, 'quote-files', 'checkout'));
        newFiles.push({ url, path, name: file.name });
      } catch (err) {
        alert(`上傳失敗: ${file.name} - ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setUploading(false);
  };

  const removeFile = async (index: number) => {
    const file = uploadedFiles[index];
    try {
      await import('@/lib/supabase').then((m) => m.deleteFromSupabase(file.path, 'quote-files'));
    } catch {
      // ignore delete errors
    }
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;

    setIsProcessing(true);
    setPaymentError(null);

    /* save contact info for next time */
    localStorage.setItem('zprintpro-contact-info', JSON.stringify({
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
    }));

    const currency = currencyMap[locale];
    // 2026-06-14 P0-5: 区分币种最小单位（JPY 无小数位）
    const amountInSmallestUnit = toSmallestUnit(totalPrice, currency);

    try {
      const session = await createPaymentSession({
        amount: amountInSmallestUnit,
        currency,
        quote_data: {
          items: items.map((item) => ({
            sku_code: item.sku_code,
            name: item.name,
            nameEn: item.nameEn,
            nameJa: item.nameJa,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            options: item.options,
          })),
          contact: form,
          files: uploadedFiles,
          locale,
        },
      });

      // Also save to localStorage as fallback
      const orderData = {
        id: session.orderId,
        items,
        total: totalPrice,
        form,
        date: new Date().toISOString(),
        locale,
        paymentIntentId: session.paymentIntentId,
      };
      localStorage.setItem('zprintpro-current-order', JSON.stringify(orderData));

      setPaymentData(session);
      setStep('payment');
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : t.paymentError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    if (paymentData) {
      clearCart();
      router.push(`${localePrefix}/order-confirmation/?order=${paymentData.orderId}`);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] text-sm';

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#333333] mb-8">{t.title}</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${step === 'form' ? 'bg-[#2873F5] text-white' : 'bg-gray-200 text-gray-500'}`}>
            <span>{t.step1}</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${step === 'payment' ? 'bg-[#2873F5] text-white' : 'bg-gray-200 text-gray-500'}`}>
            <span>{t.step2}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1">
            {step === 'form' ? (
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

                {/* File Upload */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h2 className="font-bold text-[#333333] mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#2873F5]" />
                    {t.fileUpload}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">{t.fileNote}</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.ai,.psd,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#2873F5] file:text-white hover:file:bg-[#1E5FD1] disabled:opacity-50"
                  />
                  {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
                          <span className="text-gray-700 truncate">{file.name}</span>
                          <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 text-xs ml-2">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {paymentError && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-700">
                    {paymentError}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="button" onClick={() => router.push(`${localePrefix}/cart/`)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    {t.backToCart}
                  </button>
                  <button type="submit" disabled={isProcessing} className="flex-1 py-3 bg-[#F87314] text-white rounded-lg font-bold hover:bg-[#E56203] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                    {isProcessing ? t.processing : (
                      <>
                        {t.submitOrder}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Payment Step */
              paymentData && (
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-5 h-5 text-emerald-500" />
                    <h2 className="font-bold text-[#333333]">{t.paymentTitle}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{t.paymentDesc}</p>
                  <AirwallexDropIn
                    paymentIntentId={paymentData.paymentIntentId}
                    clientSecret={paymentData.clientSecret}
                    locale={locale}
                    intentCurrency={currencyMap[locale]}
                    onSuccess={handlePaymentSuccess}
                    onError={(err) => setPaymentError(err.message)}
                  />
                  {paymentError && (
                    <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-700">
                      {paymentError}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    {t.backToCart}
                  </button>
                </div>
              )
            )}
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
                      <Image src={item.image} alt={item.name} width={56} height={56} className="w-full h-full object-cover" unoptimized loading="lazy" decoding="async" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#333333] line-clamp-1">
                        {locale === 'zh-hk' ? item.name : locale === 'en' ? item.nameEn : item.nameJa}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.options?.sizeLabel || ''} {item.options?.materialLabel || ''} × {item.quantity}
                      </p>
                      <p className="text-sm text-[#F87314] font-medium">{formatMoneyForCurrency(item.unitPrice * item.quantity, currencyMap[locale])}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">{t.subtotal}</span><span className="font-medium">{formatMoneyForCurrency(totalPrice, currencyMap[locale])}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">{t.shipping}</span><span className="text-gray-400">{t.shippingNote}</span></div>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[#333333]">{t.total}</span>
                  <span className="text-xl font-bold text-[#F87314]">{formatMoneyForCurrency(totalPrice, currencyMap[locale])}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
