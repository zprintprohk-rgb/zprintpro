'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

interface AirwallexDropInProps {
  paymentIntentId: string;
  clientSecret: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function AirwallexDropIn({
  paymentIntentId,
  clientSecret,
  onSuccess,
  onError,
}: AirwallexDropInProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
