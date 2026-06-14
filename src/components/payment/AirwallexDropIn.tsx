'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createElement, loadAirwallex } from 'airwallex-payment-elements';
import { isJALocale, isJAForceJPYEnabled } from '@/lib/pricing';

interface AirwallexDropInProps {
  paymentIntentId: string;
  clientSecret: string;
  /**
   * 当前 locale（来自 [locale] 段）。用于 P0-5 JPY 结算强制化。
   * - 'ja' + feature flag on → 校验传入的 payment intent currency 必须是 JPY
   * - 其他 locale → 透传
   */
  locale?: string;
  /**
   * 当前 payment intent 的 currency（来自服务端创建响应）。
   * 与 locale 不一致时（例：JA locale 但 currency=HKD），控制台 warn，
   * 提示运维这是 feature flag 没正确开启，或后端没传 JPY。
   */
  intentCurrency?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function AirwallexDropIn({
  paymentIntentId,
  clientSecret,
  locale,
  intentCurrency,
  onSuccess,
  onError,
}: AirwallexDropInProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 2026-06-14 Phase B P0-5: 校验 JA locale + feature flag 与 payment intent currency 一致性
  useEffect(() => {
    if (!locale) return;
    if (!isJALocale(locale)) return;
    if (!isJAForceJPYEnabled()) return;
    if (!intentCurrency) return; // 未传时跳过，由调用方保证
    if (String(intentCurrency).toUpperCase() !== 'JPY') {
      const msg = `[P0-5] JA locale detected, NEXT_PUBLIC_JA_FORCE_JPY=true, but payment intent currency=${intentCurrency} (expected JPY). Verify the create-payment-session endpoint is passing currency=JPY for JA orders.`;
      // eslint-disable-next-line no-console
      console.warn(msg);
    }
  }, [locale, intentCurrency]);

  const stableOnSuccess = useCallback(() => {
    onSuccess?.();
  }, [onSuccess]);

  const stableOnError = useCallback((err: Error) => {
    onError?.(err);
  }, [onError]);

  useEffect(() => {
    let isMounted = true;
    let elementInstance: ReturnType<typeof createElement> | null = null;

    async function initDropIn() {
      try {
        const Airwallex = await loadAirwallex();

        if (!isMounted || !containerRef.current) return;

        elementInstance = createElement('dropIn', {
          intent: {
            id: paymentIntentId,
            client_secret: clientSecret,
          },
        });

        if (elementInstance && containerRef.current) {
          elementInstance.mount(containerRef.current);
          setIsReady(true);
        }

        Airwallex?.setPaymentSuccessHandler?.(() => {
          stableOnSuccess();
        });

        Airwallex?.setPaymentErrorHandler?.((err: Error) => {
          setError(err.message);
          stableOnError(err);
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to initialize Airwallex';
        setError(message);
        onError?.(err instanceof Error ? err : new Error(message));
      }
    }

    initDropIn();

    return () => {
      isMounted = false;
      if (elementInstance && typeof elementInstance.destroy === 'function') {
        elementInstance.destroy();
      }
    };
  }, [paymentIntentId, clientSecret, stableOnSuccess, stableOnError]);

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div ref={containerRef} className="min-h-[200px] w-full" />
      {!isReady && !error && (
        <p className="text-sm text-muted-foreground">Loading payment form...</p>
      )}
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}
