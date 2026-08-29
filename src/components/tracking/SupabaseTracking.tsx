'use client';

/**
 * Supabase 端 page-view 事件追踪 (per K3 8/29 拍板, tracking.ts B 方案)
 *
 * 用途:
 *   - SPA 路由变化时, 调用 tracking.trackPageView → tracking_events 表
 *   - 跟现有 TrackingEvents (CF Beacon) 协同, 不冲突
 *
 * 设计:
 *   - 纯客户端组件, 无 UI (返回 null)
 *   - usePathname 监听路由变化
 *   - sendBeacon 友好 (K3 §0.25 navigation-survivable)
 *   - 0 PII
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/tracking';

export function SupabaseTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // 每次路由变化触发 1 次 page-view 事件
    // (sendBeacon 兜底, 页面跳转不丢)
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

export default SupabaseTracking;
