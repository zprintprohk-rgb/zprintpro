'use client';

/**
 * 类目页 category-view 事件追踪 (per K3 8/29 拍板, tracking.ts B 方案)
 *
 * 用途:
 *   - 类目页加载时, 调用 tracking.trackCategoryView → tracking_events 表
 *   - 0 PII, sendBeacon 兜底
 */

import { useEffect } from 'react';
import { trackCategoryView } from '@/lib/tracking';

interface CategoryViewTrackerProps {
  category: string;
  productSlug?: string;
}

export function CategoryViewTracker({ category, productSlug }: CategoryViewTrackerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    trackCategoryView(category, productSlug);
  }, [category, productSlug]);

  return null;
}

export default CategoryViewTracker;
