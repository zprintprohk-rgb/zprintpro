'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Locale } from '@/lib/seo';
import { CheckCircle2, Copy, Mail, Phone, MapPin, ShoppingBag, AlertCircle, ChevronUp, CreditCard, Clock, XCircle } from 'lucide-react';
import { AirwallexDropIn } from '@/components/payment/AirwallexDropIn';
import type { SupabaseClient } from '@supabase/supabase-js';

interface OrderConfirmationPageProps {
  params: { locale: string };
}

type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

interface DbOrder {
  id: string;
  status: OrderStatus;
  amount: number;
  currency: string;
  airwallex_payment_intent_id: string | null;
  quote_data: Record<string, unknown>;
  created_at: string;
}

const translations = {
  'zh-hk': {
    title: '訂單確認',
    success: '訂單提交成功',
    paid: '支付成功',
    pending: '等待付款',
    failed: '支付失敗',
    cancelled: '訂單已取消',
    orderId: '訂單編號',
    copy: '複製',
    copied: '已複製',
    orderSummary: '訂單摘要',
    contactInfo: '聯絡信息',
    name: '姓名',
    phone: '電話',
    email: '電郵',
    address: '地址',
    notes: '備註',
    paymentTitle: '付款方式',
    paymentDesc: '請掃描下方二維碼完成付款',
    paymentNotice: '付款須知',
    paymentItems: [
      '付款後請將付款證明（截圖）電郵至 zprintpro@outlook.com',
      '郵件標題請註明「付款確認 + 訂單編號」',
      '客服將於 1 個工作天內確認收款並開始處理訂單',
    ],
    wechat: '微信支付',
    alipay: '支付寶',
    flash: '閃速收款',
    showQr: '點擊顯示收款碼',
    hideQr: '隱藏收款碼',
    security: '⚠️ 安全提示：付款後必須發送電郵確認，否則可能延誤訂單處理。',
    contactCta: '如有疑問，請聯絡客服',
    backHome: '返回首頁',
    noOrder: '找不到訂單',
    noOrderDesc: '請先完成結算流程',
    payOnline: '線上信用卡支付',
    payOnlineDesc: '安全加密，支持 Visa / MasterCard / JCB',
    loading: '載入中...',
  },
  en: {
    title: 'Order Confirmation',
    success: 'Order Submitted Successfully',
    paid: 'Payment Successful',
    pending: 'Awaiting Payment',
    failed: 'Payment Failed',
    cancelled: 'Order Cancelled',
    orderId: 'Order ID',
    copy: 'Copy',
    copied: 'Copied',
    orderSummary: 'Order Summary',
    contactInfo: 'Contact Info',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    notes: 'Notes',
    paymentTitle: 'Payment',
    paymentDesc: 'Please scan the QR code below to complete payment',
    paymentNotice: 'Payment Notice',
    paymentItems: [
      'After payment, email the proof (screenshot) to zprintpro@outlook.com',
      'Email subject: "Payment Confirmation + Order Number"',
      'Our team will confirm receipt within 1 business day',
    ],
    wechat: 'WeChat Pay',
    alipay: 'Alipay',
    flash: 'Flash Receipt',
    showQr: 'Click to show QR code',
    hideQr: 'Hide QR code',
    security: '⚠️ Security Notice: You must send a confirmation email after payment, otherwise order processing may be delayed.',
    contactCta: 'Questions? Contact customer service',
    backHome: 'Back to Home',
    noOrder: 'Order not found',
    noOrderDesc: 'Please complete the checkout process first',
    payOnline: 'Pay by Credit Card',
    payOnlineDesc: 'Secure encrypted payment. Visa / MasterCard / JCB accepted.',
    loading: 'Loading...',
  },
  ja: {
    title: '注文確認',
    success: '注文が完了しました',
    paid: 'お支払い完了',
    pending: '入金待ち',
    failed: '決済失敗',
    cancelled: '注文キャンセル',
    orderId: '注文番号',
    copy: 'コピー',
    copied: 'コピー済み',
    orderSummary: '注文概要',
    contactInfo: '連絡先',
    name: 'お名前',
    phone: '電話番号',
    email: 'メール',
    address: '住所',
    notes: '備考',
    paymentTitle: '支払方法',
    paymentDesc: '以下のQRコードをスキャンしてお支払いください',
    paymentNotice: '支払いについて',
    paymentItems: [
      'お支払い後、領収書を zprintpro@outlook.com までお送りください',
      'メール件名：「入金確認 + 注文番号」',
      '担当者が1営業日以内に入金を確認いたします',
    ],
    wechat: 'WeChat Pay',
    alipay: 'Alipay',
    flash: 'フラッシュレシーブ',
    showQr: 'QRコードを表示',
    hideQr: 'QRコードを隠す',
    security: '⚠️ セキュリティ注意：お支払い後は必ず確認メールを送信してください。',
    contactCta: 'ご質問があればカスタマーサービスまで',
    backHome: 'トップへ戻る',
    noOrder: '注文が見つかりません',
    noOrderDesc: 'まずレジの手続きを完了してください',
    payOnline: 'クレジットカード決済',
    payOnlineDesc: '安全な暗号化決済。Visa / MasterCard / JCB対応。',
    loading: '読み込み中...',
  },
};

const statusConfig: Record<OrderStatus, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  paid: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  pending: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100' },
  failed: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100' },
  cancelled: { icon: XCircle, color: 'text-gray-500', bg: 'bg-gray-100' },
};

export default function OrderConfirmationClient({ params }: OrderConfirmationPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || '';

  const [dbOrder, setDbOrder] = useState<DbOrder | null>(null);
  const [localOrder, setLocalOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showQr, setShowQr] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  /* ── try Supabase first, then fallback to localStorage ── */
  useEffect(() => {
    let cancelled = false;

    async function loadOrder() {
      // 1. Try Supabase (dynamic import to avoid SSR issues)
      try {
        const { supabase: sb } = await import('@/lib/supabase');
        const { data, error } = await (sb as SupabaseClient)
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (!cancelled && data && !error) {
          setDbOrder(data as DbOrder);
        }
      } catch {
        // Supabase not available — fall through to localStorage
      }

      // 2. Fallback to localStorage
      try {
        const raw = localStorage.getItem('zprintpro-current-order');
        if (raw) {
          const data = JSON.parse(raw);
          if (data.id === orderId) {
            setLocalOrder(data);
          }
        }
      } catch {
        // ignore
      }

      setLoading(false);
    }

    loadOrder();
    return () => { cancelled = true; };
  }, [orderId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-[1320px] mx-auto px-4 text-center">
          <p className="text-gray-500">{t.loading}</p>
        </div>
      </main>
    );
  }

  // Determine effective order data
  const order = dbOrder || localOrder;
  const status: OrderStatus = dbOrder?.status || 'pending';
  const StatusIcon = statusConfig[status].icon;
  const statusColor = statusConfig[status].color;
  const statusBg = statusConfig[status].bg;

  // Get order details from whichever source
  const items = dbOrder?.quote_data?.items as any[] || localOrder?.items || [];
  const form = dbOrder?.quote_data?.contact as any || localOrder?.form || {};
  const total = dbOrder?.amount ? dbOrder.amount / 100 : localOrder?.total || 0;
  const currency = dbOrder?.currency || 'HKD';

  const isZh = locale === 'zh-hk';

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-[1320px] mx-auto px-4 text-center">
          <div className="bg-white rounded-xl border border-gray-100 p-12 max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-[#333333] mb-2">{t.noOrder}</h1>
            <p className="text-gray-500 mb-6">{t.noOrderDesc}</p>
            <Link href={`/${locale}/`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#2873F5] text-white rounded-lg font-medium hover:bg-[#1E5FD1] transition-colors">
              {t.backHome}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Status Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 ${statusBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <StatusIcon className={`w-8 h-8 ${statusColor}`} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#333333] mb-2">
            {status === 'paid' ? t.paid : status === 'pending' ? t.pending : status === 'failed' ? t.failed : t.cancelled}
          </h1>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-500">{t.orderId}:</span>
            <span className="font-mono font-bold text-[#333333]">{orderId}</span>
            <button onClick={handleCopy} className="text-[#2873F5] hover:text-[#1E5FD1] transition-colors" title={t.copy}>
              {copied ? <span className="text-xs">{t.copied}</span> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Order Details */}
          <div className="flex-1 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-bold text-[#333333] mb-4">{t.orderSummary}</h2>
              <div className="space-y-4">
                {items.map((item: any) => (
                  <div key={item.sku_code || item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={item.image || '/images/placeholder.webp'} alt={item.name || ''} width={64} height={64} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[#333333]">
                        {locale === 'zh-hk' ? item.name : locale === 'en' ? item.nameEn || item.name : item.nameJa || item.name}
                      </p>
                      {item.options && (item.options.sizeLabel || item.options.materialLabel || item.options.finishingLabel) && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {[item.options.sizeLabel, item.options.materialLabel, item.options.finishingLabel].filter(Boolean).join(' / ')} × {item.quantity}
                        </p>
                      )}
                      <p className="text-sm text-[#F87314] font-medium mt-1">{currency}${((item.unitPrice || 0) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[#333333]">{locale === 'zh-hk' ? '合計' : locale === 'en' ? 'Total' : '合計'}</span>
                  <span className="text-xl font-bold text-[#F87314]">{currency}${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            {form && (form.name || form.phone || form.email) && (
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="font-bold text-[#333333] mb-4">{t.contactInfo}</h2>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {form.name && (
                    <div className="flex items-center gap-2 text-gray-600"><span className="text-gray-400">{t.name}:</span> <span>{form.name}</span></div>
                  )}
                  {form.phone && (
                    <div className="flex items-center gap-2 text-gray-600"><Phone className="w-3.5 h-3.5 text-gray-400" /> <span>{form.phone}</span></div>
                  )}
                  {form.email && (
                    <div className="flex items-center gap-2 text-gray-600 sm:col-span-2"><Mail className="w-3.5 h-3.5 text-gray-400" /> <span>{form.email}</span></div>
                  )}
                  {form.address && (
                    <div className="flex items-center gap-2 text-gray-600 sm:col-span-2"><MapPin className="w-3.5 h-3.5 text-gray-400" /> <span>{form.address}</span></div>
                  )}
                  {form.notes && (
                    <div className="flex items-start gap-2 text-gray-600 sm:col-span-2"><span className="text-gray-400">{t.notes}:</span> <span>{form.notes}</span></div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Payment */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              {status === 'paid' ? (
                /* Paid state */
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h2 className="font-bold text-[#333333] mb-2">{t.paid}</h2>
                  <p className="text-sm text-gray-500">
                    {isZh ? '感謝您的付款！我們將盡快處理您的訂單。' : locale === 'en' ? 'Thank you for your payment! We will process your order shortly.' : 'お支払いありがとうございます！注文を速やかに処理いたします。'}
                  </p>
                </div>
              ) : status === 'pending' ? (
                /* Pending state: show both online + manual QR */
                <>
                  <h2 className="font-bold text-[#333333] mb-3">{t.paymentTitle}</h2>

                  {/* Online Payment Option */}
                  {dbOrder?.airwallex_payment_intent_id && (dbOrder.quote_data?._airwallex as any)?.client_secret && !showPayment && (
                    <button
                      onClick={() => setShowPayment(true)}
                      className="w-full py-3 mb-4 rounded-lg bg-[#2873F5] text-white hover:bg-[#1E5FD1] transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      {t.payOnline}
                    </button>
                  )}

                  {showPayment && dbOrder?.airwallex_payment_intent_id && (dbOrder.quote_data?._airwallex as any)?.client_secret && (
                    <div className="mb-4">
                      <AirwallexDropIn
                        paymentIntentId={dbOrder.airwallex_payment_intent_id}
                        clientSecret={(dbOrder.quote_data._airwallex as any).client_secret}
                        onSuccess={() => window.location.reload()}
                        onError={(err) => alert(err.message)}
                      />
                      <button
                        onClick={() => setShowPayment(false)}
                        className="mt-2 w-full py-2 text-sm text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {/* Manual QR Fallback */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-3">{t.paymentDesc}</p>
                    <div className="space-y-3">
                      {!showQr ? (
                        <button onClick={() => setShowQr(true)} className="w-full py-3 rounded-lg border-2 border-dashed border-[#2873F5] text-[#2873F5] hover:bg-[#2873F5]/5 transition-colors font-medium flex items-center justify-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          {t.showQr}
                        </button>
                      ) : (
                        <div className="space-y-3 animate-in fade-in duration-300">
                          {isZh ? (
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                                <p className="text-xs text-gray-500 mb-2">{t.wechat}</p>
                                <div className="aspect-square bg-gray-50 rounded overflow-hidden">
                                  <Image src="/images/payment-wechat.webp" alt="WeChat" width={200} height={200} className="w-full h-full object-contain" unoptimized />
                                </div>
                              </div>
                              <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                                <p className="text-xs text-gray-500 mb-2">{t.alipay}</p>
                                <div className="aspect-square bg-gray-50 rounded overflow-hidden">
                                  <Image src="/images/payment-alipay.webp" alt="Alipay" width={200} height={200} className="w-full h-full object-contain" unoptimized />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                              <p className="text-sm font-semibold text-gray-700 mb-1">{t.flash}</p>
                              <p className="text-xs text-gray-500 mb-3">{locale === 'ja' ? '推奨支払方法' : 'Recommended'}</p>
                              <div className="aspect-square bg-gray-50 rounded overflow-hidden max-w-[240px] mx-auto">
                                <Image src="/images/payment-flash.webp" alt="Flash Receipt" width={240} height={240} className="w-full h-full object-contain" unoptimized />
                              </div>
                            </div>
                          )}
                          <button onClick={() => setShowQr(false)} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-1">
                            <ChevronUp className="w-4 h-4" /> {t.hideQr}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Notice */}
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <h3 className="font-semibold text-amber-800 text-xs mb-2">{t.paymentNotice}</h3>
                    <ul className="space-y-1.5">
                      {t.paymentItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-amber-700">
                          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                /* Failed / Cancelled */
                <div className="text-center py-6">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h2 className="font-bold text-[#333333] mb-2">
                    {status === 'failed' ? t.failed : t.cancelled}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isZh ? '請聯絡客服或重新下單。' : locale === 'en' ? 'Please contact support or place a new order.' : 'サポートに連絡するか、再度注文してください。'}
                  </p>
                </div>
              )}

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">{t.contactCta}</p>
                <div className="flex items-center justify-center gap-3 text-sm">
                  <a href="mailto:zprintpro@outlook.com" className="text-[#2873F5] hover:underline flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</a>
                  <a href="tel:+8618126380255" className="text-[#2873F5] hover:underline flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +86 181 2638 0255</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href={`/${locale}/`} className="inline-flex items-center gap-2 text-[#2873F5] hover:underline">
            {t.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
