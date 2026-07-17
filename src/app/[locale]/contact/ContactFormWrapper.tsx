'use client';

import { useEffect, useState } from 'react';
import { QuoteForm } from '@/components/quote/QuoteForm';

/**
 * ContactFormWrapper — 客户端挂载门（mount gate）
 *
 * 2026-07-17 替换 next/dynamic ssr:false：
 * dynamic(..., { ssr:false }) 在 Next 14.2 + opennext/edge 的 SSR 走
 * BailoutToCSR 异常路径，streaming 结尾抛错导致 /contact/ 500
 * （2026-07-01、2026-07-16 两次复发，error.tsx 兜底仍返回 500 状态码）。
 *
 * 改为挂载门模式：
 * - 静态 import QuoteForm（无 dynamic bailout 异常路径）
 * - SSR 只渲染 loading 骨架；QuoteForm 在 useEffect 后才 mount，完全不参与 SSR 渲染
 * - QuoteForm 内部对 supabase 一律动态 import，模块级评估在 edge runtime 安全
 *   （react-hook-form/zod 仅在被调用时执行，模块评估无副作用）
 *
 * SEO 收益不受影响：contact page 主体（标题/描述/地址/WhatsApp 按钮）仍是 server render。
 */
interface ContactFormWrapperProps {
  locale: 'zh-hk' | 'en' | 'ja';
}

export function ContactFormWrapper({ locale }: ContactFormWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-16" aria-busy="true">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-[#2873F5] rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading form…</p>
        </div>
      </div>
    );
  }

  return <QuoteForm locale={locale} />;
}
