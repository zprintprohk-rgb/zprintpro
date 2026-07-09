'use client';

/**
 * EmailSubscribePopup — en home 邮件订阅弹窗 (P1.4)
 * 美国市场转化漏斗: 访客 → 留 email → 10% off + Free US Ship
 * 触发: en home 访问 5s 后 (其他 locale 不弹, 节省干扰)
 * 7 天不重复弹 (localStorage 持久化)
 * 后端: /api/subscribe (Next.js Route Handler) + Resend API + mailto fallback
 *
 * 退出: 右上角 X / 点击背景 / 提交后 / 7 天后再弹
 */

import { useEffect, useState } from 'react';
import { X, Mail, Gift, Truck, CheckCircle2 } from 'lucide-react';
import { Locale } from '@/types/locale';

interface EmailSubscribePopupProps {
  locale: Locale;
}

const COPY: Record<Locale, {
  title: string;
  subtitle: string;
  placeholder: string;
  cta: string;
  perks: string[];
  noThanks: string;
  success: string;
  successSub: string;
}> = {
  en: {
    title: 'Get 10% Off Your First Order',
    subtitle: 'Plus free US shipping on $99+ orders. Join 5,000+ global SMBs.',
    placeholder: 'your@email.com',
    cta: 'Send My 10% Off Code',
    perks: [
      '10% off your first order, instantly',
      'Free US shipping on $99+ orders',
      'Monthly design tips & special offers',
    ],
    noThanks: 'No thanks, I prefer full price',
    success: 'Check your inbox!',
    successSub: 'Your 10% off code is on its way to your email.',
  },
  'zh-hk': {
    title: '首次落單立減 10%',
    subtitle: '美國 $99+ 訂單免費送貨. 加入 5000+ 全球中小企行列.',
    placeholder: 'your@email.com',
    cta: '發送 10% 折扣碼',
    perks: [
      '首次落單即享 10% 折扣',
      '美國 $99+ 訂單免費送貨',
      '每月設計靈感與專屬優惠',
    ],
    noThanks: '不, 謝謝',
    success: '請檢查您的電郵!',
    successSub: '您的 10% 折扣碼正在發送中.',
  },
  ja: {
    title: '初回注文 10% OFF',
    subtitle: '米国 $99+ 注文で送料無料. 5000+ グローバル SMB に仲間入り.',
    placeholder: 'your@email.com',
    cta: '10% OFF コードを送信',
    perks: [
      '初回注文が即 10% 割引',
      '米国 $99+ 注文で送料無料',
      '毎月のデザイン Tips と限定オファー',
    ],
    noThanks: 'いいえ、結構です',
    success: '受信箱をご確認ください!',
    successSub: '10% OFF コードを送信中です.',
  },
};

const STORAGE_KEY = 'zp_email_popup_dismissed';
const DISMISS_DAYS = 7;
const POPUP_DELAY_MS = 5000;

export function EmailSubscribePopup({ locale }: EmailSubscribePopupProps) {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const copy = COPY[locale] || COPY['en'];

  useEffect(() => {
    // Only show on en locale (US-market focus)
    if (locale !== 'en') return;

    // Check localStorage for previous dismissal
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) return;
    }

    const timer = setTimeout(() => setVisible(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [locale]);

  const handleDismiss = () => {
    setVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(locale === 'zh-hk' ? '請輸入有效電郵' : locale === 'ja' ? '有効なメールを入力してください' : 'Please enter a valid email');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, source: 'home_popup' }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Subscribe failed');
      }
      setSubmitted(true);
      // Auto-dismiss after 4s of success
      setTimeout(() => {
        handleDismiss();
      }, 4000);
    } catch (err) {
      setError(locale === 'zh-hk' ? '提交失敗, 請稍後再試' : locale === 'ja' ? '送信に失敗しました。後でもう一度お試しください' : 'Submission failed, please try again');
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={copy.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
      data-testid="email-subscribe-popup"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top gradient banner */}
        <div className="bg-gradient-to-r from-[#2873F5] to-emerald-500 px-6 py-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-5 h-5" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider opacity-90">
              {locale === 'zh-hk' ? '限時優惠' : locale === 'ja' ? '期間限定' : 'Limited Time'}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold leading-tight">
            {copy.title}
          </h2>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{copy.success}</h3>
              <p className="text-sm text-slate-600">{copy.successSub}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {copy.subtitle}
              </p>

              <ul className="space-y-2 mb-5">
                {copy.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder={copy.placeholder}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#2873F5] focus:ring-2 focus:ring-blue-100"
                    disabled={submitting}
                    aria-label="Email"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#2873F5] hover:bg-[#1E5BD6] disabled:bg-slate-300 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {locale === 'zh-hk' ? '提交中...' : locale === 'ja' ? '送信中...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4" aria-hidden="true" />
                      {copy.cta}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full text-xs text-slate-500 hover:text-slate-700 transition-colors py-1"
                >
                  {copy.noThanks}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
