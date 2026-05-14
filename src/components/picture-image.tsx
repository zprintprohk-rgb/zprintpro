/**
 * 多格式自适应图片组件
 * 自动提供 WebP/AVIF 格式回退，减少传输体积
 * 包裹 next/image，兼容 Server / Client Component
 */

import Image from 'next/image';
import { CSSProperties } from 'react';

interface PictureSource {
  srcSet: string;
  type: 'image/webp' | 'image/avif' | string;
  media?: string;
}

interface PictureImageProps {
  /** 基础路径（用于自动推断 webp/avif 路径） */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  /** 显式指定额外格式源；不传则自动推断同路径 .webp/.avif */
  sources?: PictureSource[];
  /** 回退 src，当 src 本身不是目标格式时使用 */
  fallbackSrc?: string;
}

/**
 * 从 src 自动推断可能的替代格式路径
 * e.g. "/images/hero/a.jpg" → ["/images/hero/a.webp", "/images/hero/a.avif"]
 */
function inferSources(src: string): PictureSource[] {
  const dotIndex = src.lastIndexOf('.');
  if (dotIndex === -1) return [];
  const base = src.slice(0, dotIndex);
  const sources: PictureSource[] = [];
  // AVIF 优先（体积最小），其次 WebP
  sources.push({ srcSet: base + '.avif', type: 'image/avif' });
  sources.push({ srcSet: base + '.webp', type: 'image/webp' });
  return sources;
}

export function PictureImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  loading = 'lazy',
  decoding = 'async',
  className,
  style,
  sizes,
  sources: explicitSources,
  fallbackSrc,
}: PictureImageProps) {
  const imgSrc = fallbackSrc || src;
  const pictureSources = explicitSources ?? inferSources(src);

  // 过滤掉与 fallback 同格式的 source（避免浏览器选到同一个文件）
  const filteredSources = pictureSources.filter((s) => s.srcSet !== imgSrc);

  return (
    <picture className={fill ? 'contents' : undefined}>
      {filteredSources.map((source, idx) => (
        <source key={idx} srcSet={source.srcSet} type={source.type} media={source.media} />
      ))}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        loading={loading}
        decoding={decoding}
        className={className}
        style={style}
        sizes={sizes}
        unoptimized
      />
    </picture>
  );
}
