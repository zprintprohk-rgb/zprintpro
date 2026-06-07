'use client';

import dynamic from 'next/dynamic';

/**
 * ContactFormWrapper — 客户端包裹层
 *
 * 原因：QuoteForm 用了 react-hook-form + zodResolver + useForm，
 * 在 Next.js 14 + Cloudflare Pages (edge runtime) 的 SSR 阶段会抛错
 * （错误页含 `__next_error__` + `BailoutToCSR` 标记）。
 *
 * 用 `dynamic(..., { ssr: false })` 让 QuoteForm 只在客户端 mount 后加载，
 * 完全跳过 SSR，避开 edge runtime 的 react-hook-form 兼容问题。
 *
 * SEO 收益不受影响：contact page 主体（标题/描述/地址/WhatsApp 按钮）仍是 server render。
 */

const QuoteForm = dynamic(
  () => import('@/components/quote/QuoteForm').then((m) => m.QuoteForm),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-16" aria-busy="true">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-[#2873F5] rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading form…</p>
        </div>
      </div>
    ),
  }
);

interface ContactFormWrapperProps {
  locale: 'zh-hk' | 'en' | 'ja';
}

export function ContactFormWrapper({ locale }: ContactFormWrapperProps) {
  return <QuoteForm locale={locale} />;
}
