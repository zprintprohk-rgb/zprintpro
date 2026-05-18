'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/lib/seo';

/**
 * 客户端组件：根据 URL 是否有 product 参数动态管理 noindex 标签和 canonical
 * 
 * 逻辑：
 * - 有 product 参数（产品报价页）：
 *   - 确保无 noindex（可被索引）
 *   - 自引用 canonical: /{locale}/quote/?product=xxx
 * - 无 product 参数（基础报价表单页）：
 *   - 注入 noindex（不应被索引）
 *   - canonical 不变（由 generateMetadata 设置）
 * 
 * GSC 修复说明：
 * 1. 不移除静态 meta（避免 Googlebot 在 JS 执行间隙看到无 meta 状态）
 * 2. 直接覆盖 content 属性，而非删除/重建 DOM 节点
 * 3. 动态更新 canonical 为自引用 URL（含 product 参数）
 */
export function QuoteNoIndexManager() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const hasProduct = params.has('product');

    // 获取静态已设置的 robots meta（由 generateMetadata 设置 index:true,follow:true）
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    let googlebotMeta = document.querySelector<HTMLMetaElement>('meta[name="googlebot"]');

    if (!hasProduct) {
      // ===== 无 product 参数 → 注入 noindex（基础报价表单页） =====
      // 方法：直接修改现有 meta 的 content，或创建新节点
      if (robotsMeta) {
        robotsMeta.content = 'noindex, follow';
      } else {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        robotsMeta.content = 'noindex, follow';
        document.head.appendChild(robotsMeta);
      }

      if (googlebotMeta) {
        googlebotMeta.content = 'noindex, follow';
      } else {
        googlebotMeta = document.createElement('meta');
        googlebotMeta.name = 'googlebot';
        googlebotMeta.content = 'noindex, follow';
        document.head.appendChild(googlebotMeta);
      }
    } else {
      // ===== 有 product 参数 → 确保可索引（产品报价页） =====
      // 确保 robots meta 为 index, follow
      if (robotsMeta) {
        robotsMeta.content = 'index, follow';
      } else {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        robotsMeta.content = 'index, follow';
        document.head.appendChild(robotsMeta);
      }

      if (googlebotMeta) {
        googlebotMeta.content = 'index, follow';
      } else {
        googlebotMeta = document.createElement('meta');
        googlebotMeta.name = 'googlebot';
        googlebotMeta.content = 'index, follow';
        document.head.appendChild(googlebotMeta);
      }

      // 动态更新 canonical 为自引用 URL（含 product 参数）
      // 格式: https://zprintpro.com/{locale}/quote/?product=xxx
      const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (canonicalLink) {
        // 从当前 URL 的 pathname 提取 locale
        const pathParts = window.location.pathname.split('/');
        const locale = pathParts[1] || 'zh-hk'; // fallback
        const product = params.get('product');
        const selfCanonical = `${siteConfig.url}/${locale}/quote/?product=${encodeURIComponent(product || '')}`;
        canonicalLink.href = selfCanonical;
      }
    }
  }, []);

  // 不渲染任何可见内容
  return null;
}