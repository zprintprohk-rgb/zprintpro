/**
 * 多语言图片组件
 * 根据 locale 自动切换图片 src 和 alt
 */

import Image from 'next/image';
import { Locale } from '@/types/locale';

interface SEOImageProps {
  src: Record<Locale, string>;
  alt: Record<Locale, string>;
  locale: Locale;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export function SEOImage({ src, alt, locale, ...props }: SEOImageProps) {
  const imageSrc = src[locale] || src['en'] || Object.values(src)[0];
  const imageAlt = alt[locale] || alt['en'] || Object.values(alt)[0];

  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      {...props}
    />
  );
}
