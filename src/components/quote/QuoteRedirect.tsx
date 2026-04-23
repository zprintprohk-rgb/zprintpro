'use client';

import { useEffect } from 'react';

interface QuoteRedirectProps {
  locale: string;
}

export function QuoteRedirect({ locale }: QuoteRedirectProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const product = params.get('product');
      const target = product
        ? `/${locale}/contact/?product=${encodeURIComponent(product)}`
        : `/${locale}/contact/`;
      window.location.replace(target);
    }
  }, [locale]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#2873F5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Redirecting...</p>
      </div>
    </main>
  );
}
