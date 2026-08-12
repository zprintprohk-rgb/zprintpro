'use client';

/**
 * CF Web Analytics 事件追踪 (修正版, per K3 8/12 PM 审核)
 * 用 CF Beacon API, 不是 Plausible API
 * CF Web Analytics: 0 成本, 0 审批, 部署在 CF Pages 已有
 *
 * 追踪事件:
 * 1. WhatsApp click (wa.me 链接)
 * 2. Email click (mailto 链接)
 * 3. Quote form submit
 * 4. Phone click (tel: 链接)
 * 5. Service hours shown
 *
 * API 用法: window.__cfBeacon.push({ type: 'custom-event', name: 'xxx', properties: { ... } })
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    __cfBeacon?: Array<Record<string, unknown>>;
  }
}

type EventName =
  | 'whatsapp_click'
  | 'email_click'
  | 'quote_submit'
  | 'phone_click'
  | 'service_hours_shown';

interface EventProperties {
  page: string;
  locale?: string;
  product_slug?: string;
  category_slug?: string;
  /** Optional: original event context (e.g. button label) */
  source?: string;
}

function trackEvent(name: EventName, properties: Partial<EventProperties> = {}) {
  if (typeof window === 'undefined') return;

  // CF Web Analytics Beacon
  window.__cfBeacon = window.__cfBeacon || [];
  window.__cfBeacon.push({
    type: 'custom-event',
    name,
    properties: {
      page: properties.page || window.location.pathname,
      locale: properties.locale,
      product_slug: properties.product_slug,
      category_slug: properties.category_slug,
      source: properties.source,
    },
  });

  // 调试日志 (production 关掉)
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[CF Analytics]', name, properties);
  }
}

export function TrackingEvents() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. WhatsApp click (wa.me/8619880851334)
    const handleWhatsAppClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href*="wa.me/8619880851334"]');
      if (!target) return;
      const anchor = target as HTMLAnchorElement;
      trackEvent('whatsapp_click', {
        page: pathname,
        source: anchor.dataset.cfSource || 'unknown',
      });
    };

    // 2. Email click (mailto:zprintpro@outlook.com)
    const handleEmailClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="mailto:"]');
      if (!target) return;
      trackEvent('email_click', {
        page: pathname,
        source: (target as HTMLAnchorElement).dataset.cfSource || 'unknown',
      });
    };

    // 3. Quote form submit
    const handleQuoteSubmit = (e: SubmitEvent) => {
      const form = (e.target as HTMLElement).closest('form[data-cf-event="quote-submit"]');
      if (!form) return;
      trackEvent('quote_submit', { page: pathname });
    };

    // 4. Phone click (tel:+8619880851334)
    const handlePhoneClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="tel:"]');
      if (!target) return;
      trackEvent('phone_click', { page: pathname });
    };

    // 5. Service hours shown (when service hours block enters viewport)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('service_hours_shown', { page: pathname });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    const serviceHoursEl = document.querySelector('[data-cf-event="service-hours"]');
    if (serviceHoursEl) observer.observe(serviceHoursEl);

    document.addEventListener('click', handleWhatsAppClick, { capture: true });
    document.addEventListener('click', handleEmailClick, { capture: true });
    document.addEventListener('submit', handleQuoteSubmit, { capture: true });
    document.addEventListener('click', handlePhoneClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleWhatsAppClick, { capture: true });
      document.removeEventListener('click', handleEmailClick, { capture: true });
      document.removeEventListener('submit', handleQuoteSubmit, { capture: true });
      document.removeEventListener('click', handlePhoneClick, { capture: true });
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

export default TrackingEvents;
