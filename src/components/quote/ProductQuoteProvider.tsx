/**
 * ProductQuoteProvider — 产品页 quote 状态共享 (2026-07-13 v3 重构)
 *
 * v2 (15c652d) 位置: ProductQuoteSection 把 Qty 色块 + QuoteCalculator 用 flex-row 并排
 *      -> user 反馈位置不对: 色块应该在备注栏下面, 跟 QuoteCalculator 应该是两个独立 block
 *         共享状态而非挤一个左中右
 *
 * v3 位置: page.tsx 是 server component, 用 <ProductQuoteProvider> 顶层包住整个产品页两栏,
 *      左 column 备注栏下面渲染 <QuantityTierInteractive>,
 *      右 column 渲染 <QuoteCalculator externalQuantity onQuantityChange>
 *      两者通过 Context 共享 selectedQuantity, 双向联动.
 *
 * 用法:
 *   ProductQuoteProvider 包住整个产品页 (page.tsx 是 server component, 包后变 client subtree)
 *     - 左 column 备注栏下面渲染 QuantityTierInteractive
 *     - 右 column 渲染 QuoteCalculator
 *     - 两者通过 context 共享 selectedQuantity, 双向联动
 */

'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '@/data/products';

interface ProductQuoteContextValue {
  selectedQuantity: number;
  setSelectedQuantity: (q: number) => void;
  product: Product;
}

const ProductQuoteContext = createContext<ProductQuoteContextValue | null>(null);

export function useProductQuote() {
  const ctx = useContext(ProductQuoteContext);
  if (!ctx) {
    throw new Error('useProductQuote must be used within <ProductQuoteProvider>');
  }
  return ctx;
}

interface ProductQuoteProviderProps {
  product: Product;
  children: ReactNode;
}

export function ProductQuoteProvider({ product, children }: ProductQuoteProviderProps) {
  const defaultQuantity =
    product.variables?.quantities?.[0]?.value || product.minQuantity || 100;

  const [selectedQuantity, setSelectedQuantity] = useState<number>(defaultQuantity);

  // 当 product 变化时 reset
  useEffect(() => {
    setSelectedQuantity(defaultQuantity);
  }, [defaultQuantity]);

  const handleSetQuantity = useCallback((q: number) => {
    setSelectedQuantity(q);
  }, []);

  return (
    <ProductQuoteContext.Provider
      value={{ selectedQuantity, setSelectedQuantity: handleSetQuantity, product }}
    >
      {children}
    </ProductQuoteContext.Provider>
  );
}
