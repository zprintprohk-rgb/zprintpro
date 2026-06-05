/**
 * SmartWhatsAppLink — WhatsApp 链接 React 组件壳
 * 基于 lib/whatsapp.ts，统一所有 WhatsApp CTA
 * 支持：<a>（默认）、<button>（点击 window.open）
 */

'use client';

import React from 'react';
import { generateWhatsAppLink, WhatsAppContext } from '@/lib/whatsapp';
import { Locale } from '@/types/locale';

interface SmartWhatsAppLinkProps {
  locale?: Locale;
  context?: WhatsAppContext;
  className?: string;
  children: React.ReactNode;
  /** 'a' = anchor (default), 'button' = window.open */
  as?: 'a' | 'button';
  /** 仅 button 模式生效 */
  onClick?: (e: React.MouseEvent) => void;
}

export function SmartWhatsAppLink({
  locale = 'zh-hk',
  context = {},
  className,
  children,
  as = 'a',
  onClick,
}: SmartWhatsAppLinkProps) {
  const href = generateWhatsAppLink(locale, context);

  if (as === 'button') {
    return (
      <button
        type="button"
        className={className}
        onClick={(e) => {
          window.open(href, '_blank', 'noopener,noreferrer');
          onClick?.(e);
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
