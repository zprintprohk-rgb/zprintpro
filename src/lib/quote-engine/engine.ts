/**
 * Quote Engine v1 (Phase 1 MVP)
 *
 * 用法：
 * ```ts
 * import { quoteEngine } from '@/lib/quote-engine/engine';
 * const result = quoteEngine.calculate({ productSlug: 'business-cards', ... });
 * ```
 *
 * 阶段路线图：
 * - v1 (本周): 基础公式 + react-hook-form 客户端实时计算
 * - v2 (W3): 公式 DSL 化，BD 可配置
 * - v3 (W6): AI 智能填表 + 历史询盘 ML
 * - v4 (W10): 报价对比 + 节省建议
 */

import type {
  FormulaContext,
  PriceBreakdown,
  PriceSuggestion,
  ProductFormula,
  FormulaResult,
  QuoteRequest,
  QuoteResult,
} from './types';
import { businessCardsFormulaV2 } from './formulas/business-cards';
import { postersFormula } from './formulas/posters';
import { stickersFormula } from './formulas/stickers';
import { packagingFormula } from './formulas/packaging';
import { bagsFormula } from './formulas/bags';
import { booksFormula } from './formulas/books';
import { MARKETS, marketFromLocale, getMarket } from './markets';
import type { Market } from './markets';

const REGISTRY: Record<string, ProductFormula> = {
  'business-cards': businessCardsFormulaV2, // v2 (Phase 2 — 印刷大脑版)
  'posters': postersFormula, // v1 (Phase 3 — 海报公式)
  'stickers': stickersFormula, // v1 (Phase 4 — 贴纸公式)
  'packaging': packagingFormula, // v1 (Phase 4 — 包装盒公式)
  'bags': bagsFormula, // v1 (Phase 4 — 纸袋公式)
  'books': booksFormula, // v1 (Phase 4 — 书册公式)
};

class QuoteEngine {
  /** 注册新产品的公式 */
  register(productSlug: string, formula: ProductFormula) {
    REGISTRY[productSlug] = formula;
  }

  /** 列出已注册的产品 */
  listProducts(): string[] {
    return Object.keys(REGISTRY);
  }

  /** 核心计算 */
  calculate(req: QuoteRequest): QuoteResult {
    const formula = REGISTRY[req.productSlug];
    if (!formula) {
      throw new Error(
        `No formula registered for product "${req.productSlug}". Available: ${Object.keys(REGISTRY).join(', ')}`
      );
    }

    // P0 修复 (2026-07-18): ctx 之前丢了 market 和 sides,
    // 导致所有公式 fallback 到 MARKETS[marketFromLocale('en')] = 永远按美国市场算
    // (margin/shipping zone/tax/FX 全错), sides 也从未到达公式。
    const ctx: FormulaContext = {
      quantity: req.quantity,
      size: req.size,
      material: req.material,
      finishes: req.finishes,
      deadline: req.deadline,
      sides: req.sides,
      market: req.marketCode
        ? getMarket(req.marketCode)
        : getMarket(marketFromLocale(req.locale || 'en')),
    };

    const formulaResult = formula(ctx);
    const warnings: string[] = [];
    const suggestions: PriceSuggestion[] = [];

    // 数量校验
    if (req.quantity < formulaResult.minQuantity) {
      warnings.push(
        `Minimum order quantity for this product is ${formulaResult.minQuantity} pcs. Please increase your quantity.`
      );
    }
    if (req.quantity > formulaResult.maxQuantity) {
      warnings.push(
        `For quantities above ${formulaResult.maxQuantity} pcs, please contact sales for a custom quote.`
      );
    }

    // C5 修复 (2026-06-07): 市场最低订单金额强制
    // 客户订单 (本币) 低于市场 minimumOrder → 警告 + 提示
    const m = req.marketCode ? getMarket(req.marketCode) : getMarket(marketFromLocale(req.locale || 'en'));
    const totalPriceLocal = formulaResult.baseUnitPrice * req.quantity;
    if (totalPriceLocal < m.minimumOrder) {
      warnings.push(
        `${m.displayName} minimum order is ${m.currency} ${m.minimumOrder}. Current quote is ${m.currency} ${totalPriceLocal.toFixed(2)}. Please increase quantity to meet the minimum.`
      );
    }

    // 价格计算
    const finalUnitPrice =
      (formulaResult.baseUnitPrice + formulaResult.finishSurcharge) * formulaResult.deadlineMultiplier;
    const totalPrice = finalUnitPrice * req.quantity;

    const breakdown: PriceBreakdown[] = [];

    // v2 公式：按版数分摊的详细 breakdown
    const extended = formulaResult as FormulaResult & {
      gangLayout?: ReturnType<typeof import('./core').calculateGang>;
      setupCostHKD?: number;
      paperCostHKD?: number;
      finishingCostHKD?: number;
      totalCostHKD?: number;
      market?: Market;
      tax?: unknown;
      fx?: unknown;
      shippingHKD?: number;
    };
    if (extended.gangLayout && extended.setupCostHKD !== undefined) {
      breakdown.push({
        label: 'Setup (press)',
        amount: extended.setupCostHKD * 0.128, // HKD → USD
        description: `${extended.gangLayout.sheetsNeeded} sheets × 1 setup`,
      });
      breakdown.push({
        label: 'Paper',
        amount: (extended.paperCostHKD || 0) * 0.128,
        description: `${extended.gangLayout.sheetsNeeded} sheets of paper stock`,
      });
      if ((extended.finishingCostHKD || 0) > 0) {
        breakdown.push({
          label: 'Finishing',
          amount: (extended.finishingCostHKD || 0) * 0.128,
          description: req.finishes.join(', '),
        });
      }
    } else {
      // v1 公式 fallback
      breakdown.push({
        label: 'Base price',
        amount: formulaResult.baseUnitPrice * req.quantity,
        description: `$${formulaResult.baseUnitPrice.toFixed(2)} × ${req.quantity} cards`,
      });
      if (formulaResult.finishSurcharge > 0) {
        breakdown.push({
          label: 'Finish upgrades',
          amount: formulaResult.finishSurcharge * req.quantity,
          description: `${req.finishes.join(', ')} +$${formulaResult.finishSurcharge.toFixed(2)}/card`,
        });
      }
    }
    if (formulaResult.deadlineMultiplier > 1.0) {
      const extra = totalPrice - finalUnitPrice * req.quantity / formulaResult.deadlineMultiplier;
      breakdown.push({
        label: 'Rush production',
        amount: extra,
        description: `x${formulaResult.deadlineMultiplier} (${req.deadline})`,
      });
    }

    // 优化建议：数量阶梯
    if (req.quantity < 500 && req.quantity >= 100) {
      const nextTier = 500;
      const nextTierPrice = 0.08;
      const savings = (formulaResult.baseUnitPrice - nextTierPrice) * nextTier;
      if (savings > 5) {
        suggestions.push({
          type: 'quantity-bump',
          savingsUsd: savings,
          message: `Order ${nextTier} cards instead of ${req.quantity} to save $${savings.toFixed(2)} (price drops to $${nextTierPrice}/card).`,
        });
      }
    } else if (req.quantity < 1000 && req.quantity >= 500) {
      const nextTier = 1000;
      const nextTierPrice = 0.06;
      const savings = (formulaResult.baseUnitPrice - nextTierPrice) * nextTier;
      if (savings > 10) {
        suggestions.push({
          type: 'quantity-bump',
          savingsUsd: savings,
          message: `Order ${nextTier} cards instead of ${req.quantity} to save $${savings.toFixed(2)} (price drops to $${nextTierPrice}/card).`,
        });
      }
    }

    // 优化建议：交期
    if (req.deadline === 'same-day') {
      suggestions.push({
        type: 'deadline-change',
        savingsUsd: totalPrice * 0.5,
        message: `Switch to rush (3-day) delivery to save 50%, or standard (7-day) to save 50% more.`,
      });
    } else if (req.deadline === 'rush') {
      suggestions.push({
        type: 'deadline-change',
        savingsUsd: totalPrice * 0.33,
        message: `Switch to standard (7-day) delivery to save 33%.`,
      });
    }

    return {
      unitPrice: Number(finalUnitPrice.toFixed(4)),
      totalPrice: Number(totalPrice.toFixed(2)),
      breakdown,
      leadTimeHours: formulaResult.leadTimeHours,
      warnings,
      suggestions,
      calculatedAt: new Date().toISOString(),
      // v3 透传：拼版数据 + 版数分摊成本
      ...(extended.gangLayout && {
        gangLayout: extended.gangLayout,
        setupCostHKD: extended.setupCostHKD,
        paperCostHKD: extended.paperCostHKD,
        finishingCostHKD: extended.finishingCostHKD,
        totalCostHKD: extended.totalCostHKD,
      }),
      // P0 修复 (2026-07-18): 公式返回的 market/tax/fx/shippingHKD 也要透传到 QuoteResult,
      // 否则调用方无法确认本次报价按哪个市场/汇率/税率计算
      ...(extended.market && {
        market: extended.market,
        tax: extended.tax,
        fx: extended.fx,
        shippingHKD: extended.shippingHKD,
      }),
    } as QuoteResult;
  }
}

export const quoteEngine = new QuoteEngine();
