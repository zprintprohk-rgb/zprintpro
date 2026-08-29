'use client';

/**
 * 产品页 product-view 事件追踪 (per K3 8/29 拍板, tracking.ts B 方案)
 *
 * 用途:
 *   - 产品页加载时, 调用 tracking.trackProductView → tracking_events 表
 *   - 0 PII, sendBeacon 兜底
 */

import { useEffect } from 'react';
import { trackProductView } from '@/lib/tracking';

interface ProductViewTrackerProps {
  productSlug: string;
  productName: string;
}

export function ProductViewTracker({ productSlug, productName }: ProductViewTrackerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    trackProductView(productSlug, productName);
  }, [productSlug, productName]);

  return null;
}

export default ProductViewTracker;
