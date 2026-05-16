'use client';

import { useEffect } from 'react';

/**
 * 客户端组件：根据 URL 是否有 product 参数动态管理 noindex 标签
 * 
 * - 无 product 参数：注入 <meta name="robots" content="noindex" /> （默认屏蔽）
 * - 有 product 参数：删除任何已有的 robots noindex 标签（允许索引）
 * 
 * 注意：此组件仅在客户端运行，配合 generateMetadata 的静态 noindex 逻辑
 * 确保无 product 参数时页面始终不索引，有 product 参数时可以索引
 */
export function QuoteNoIndexManager() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const hasProduct = params.has('product');

    // 移除已有的 robots meta 标签（由 generateMetadata 静态设置）
    const existingMeta = document.querySelector('meta[name="robots"]');
    if (existingMeta) {
      existingMeta.remove();
    }

    // 移除已有的 googlebot meta 标签
    const existingGooglebot = document.querySelector('meta[name="googlebot"]');
    if (existingGooglebot) {
      existingGooglebot.remove();
    }

    if (!hasProduct) {
      // 没有 product 参数 → 注入 noindex
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, follow';
      document.head.appendChild(meta);

      const googlebotMeta = document.createElement('meta');
      googlebotMeta.name = 'googlebot';
      googlebotMeta.content = 'noindex, follow';
      document.head.appendChild(googlebotMeta);
    }
    // 有 product 参数 → 不注入 noindex，允许 Google 索引
  }, []);

  // 不渲染任何可见内容
  return null;
}