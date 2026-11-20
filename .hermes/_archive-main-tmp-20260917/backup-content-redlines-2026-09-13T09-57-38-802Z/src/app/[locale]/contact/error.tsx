'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

/**
 * Contact 页 Error Boundary
 * 
 * 2026-07-01 fix(contact-500): Edge Runtime + dynamic(..., { ssr: false })
 * 在 streaming 结尾触发 BailoutToCSR 导致 500。
 * ErrorBoundary 兜底：显示 WhatsApp/电话直达链接，不影响转化。
 * 
 * 用户仍可通过以下方式联系：
 * - WhatsApp 即时聊天
 * - 电话直拨
 * - 邮箱发送
 * 
 * 在修复底层 streaming 问题前保证用户侧不看到白屏/500。
 */

const localeTranslations: Record<string, { title: string; message: string; whatsapp: string; phone: string; email: string; tryAgain: string; home: string }> = {
  'zh-hk': {
    title: '暫時出現錯誤',
    message: '報價表單暫時未能載入，請透過以下方式直接聯繫我們。',
    whatsapp: 'WhatsApp 即時查詢',
    phone: '致電我們',
    email: '發送電郵',
    tryAgain: '重試',
    home: '返回首頁',
  },
  en: {
    title: 'Temporary Glitch',
    message: 'The quote form is temporarily unavailable. Please reach us directly:',
    whatsapp: 'Chat on WhatsApp',
    phone: 'Call Us',
    email: 'Send Email',
    tryAgain: 'Try Again',
    home: 'Back to Home',
  },
  ja: {
    title: '一時的なエラー',
    message: '見積もりフォームが一時的に利用できません。以下の方法で直接お問い合わせください。',
    whatsapp: 'WhatsAppで相談',
    phone: '電話する',
    email: 'メールを送る',
    tryAgain: '再試行',
    home: 'ホームに戻る',
  },
};

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh-hk';
  const t = localeTranslations[locale] || localeTranslations['zh-hk'];

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#333333] mb-3">{t.title}</h1>
        <p className="text-gray-500 mb-8">{t.message}</p>

        {/* Contact channels */}
        <div className="space-y-3 mb-8">
          <a
            href="https://wa.me/8619880851334?text=Hi%20ZprintPro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.whatsapp}
          </a>
          <a
            href="tel:+86198108851334"
            className="flex items-center justify-center gap-2 w-full bg-[#2873F5] hover:bg-[#1E5BD6] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {t.phone}
          </a>
          <a
            href="mailto:zprintpro@outlook.com"
            className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t.email}
          </a>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-white border-2 border-[#2873F5] text-[#2873F5] hover:bg-blue-50 font-semibold rounded-xl transition-colors"
          >
            {t.tryAgain}
          </button>
          <Link
            href={`/${locale}/`}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#333333] font-semibold rounded-xl transition-colors"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
