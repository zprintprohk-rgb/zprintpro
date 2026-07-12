/**
 * ProductQuoteSection — 产品页右侧 "报价+订购" 区块 (2026-07-13 重构)
 *
 * 之前: QuoteCalculator 是 self-contained client component, 内部 useState 管 config.
 *       QuantityTierTable 是纯展示色块, 跟 QuoteCalculator 0 联动.
 *
 * 现在: 父组件 ProductQuoteSection 用 useState 管理 selected quantity.
 *       QuoteCalculator 改造为受控 — 接受 externalQuantity + onQuantityChange,
 *         内部 useEffect 同步外部 quantity 到内部 config.
 *       QuantityTierInteractive 是新组件, 接 currentQuantity + onSelect,
 *         5 档卡片变成可点击 button, 选中档 emerald ring 高亮.
 *
 * 联动效果: 点 QuantityTierInteractive 卡片 -> setSelectedQuantity -> QuoteCalculator 重算
 *
 * 位置: 用 flex layout, 左边 QuantityTierInteractive (flex-1) 跟右边 QuoteCalculator
 *       (flex-1) 并排, 高度由 QuoteCalculator 主导, 左边对齐.
 *       (后续 user 改"色块底边对齐报价框底边"由父容器 items-stretch 实现)
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { QuoteCalculator } from './QuoteCalculator';
import { QuantityTierInteractive } from './QuantityTierInteractive';

interface ProductQuoteSectionProps {
  product: Product;
  locale: Locale;
}

export function ProductQuoteSection({ product, locale }: ProductQuoteSectionProps) {
  // 默认 quantity = 第一个 quantity 档, 或 minQuantity
  const defaultQuantity =
    product.variables?.quantities?.[0]?.value || product.minQuantity || 100;

  const [selectedQuantity, setSelectedQuantity] = useState<number>(defaultQuantity);

  // 当 product 变化时 (理论不会, 但安全起见) reset
  useEffect(() => {
    setSelectedQuantity(defaultQuantity);
  }, [defaultQuantity]);

  const handleQuantityChange = useCallback((q: number) => {
    setSelectedQuantity(q);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-stretch">
      {/* 左侧: 批量折扣色块 (可交互) */}
      <div className="flex-1 min-w-0">
        <QuantityTierInteractive
          product={product}
          locale={locale}
          currentQuantity={selectedQuantity}
          onSelect={handleQuantityChange}
        />
      </div>

      {/* 右侧: 报价计算器 (受控) */}
      <div className="flex-1 min-w-0">
        <QuoteCalculator
          product={product}
          locale={locale}
          externalQuantity={selectedQuantity}
          onQuantityChange={handleQuantityChange}
        />
      </div>
    </div>
  );
}
