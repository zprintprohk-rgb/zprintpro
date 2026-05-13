/**
 * 语义化内链组件
 * 禁止锚文本："点击这里" / "了解更多" / "Read more"
 * 使用 itemProp="relatedLink" 增强 Schema 语义
 */

'use client';

import Link from 'next/link';
import { Locale } from '@/types/locale';

interface InternalLinkProps {
  href: string; // 格式: /{locale}/product/stickers 或 /{locale}/guide/sticker-guide
  locale: Locale;
  anchorText: Record<Locale, string>;
  className?: string;
}

export function InternalLink({ href, locale, anchorText, className = '' }: InternalLinkProps) {
  const resolvedHref = href.replace('{locale}', locale);
  return (
    <Link
      href={resolvedHref}
      className={`text-[#2873F5] hover:underline font-medium ${className}`}
      itemProp="relatedLink"
    >
      {anchorText[locale]}
    </Link>
  );
}
