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
  QuoteRequest,
  QuoteResult,
} from './types';
import { businessCardsFormula } from './formulas/business-cards';

const REGISTRY: Record<string, ProductFormula> = {
  'business-cards': businessCardsFormula,
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

    const ctx: FormulaContext = {
      quantity: req.quantity,
      size: req.size,
      material: req.material,
      finishes: req.finishes,
      deadline: req.deadline,
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

    // 价格计算
    const finalUnitPrice =
      (formulaResult.baseUnitPrice + formulaResult.finishSurcharge) * formulaResult.deadlineMultiplier;
    const totalPrice = finalUnitPrice * req.quantity;

    const breakdown: PriceBreakdown[] = [
      {
        label: 'Base price',
        amount: formulaResult.baseUnitPrice * req.quantity,
        description: `$${formulaResult.baseUnitPrice.toFixed(2)} × ${req.quantity} cards`,
      },
    ];
    if (formulaResult.finishSurcharge > 0) {
      breakdown.push({
        label: 'Finish upgrades',
        amount: formulaResult.finishSurcharge * req.quantity,
        description: `${req.finishes.join(', ')} +$${formulaResult.finishSurcharge.toFixed(2)}/card`,
      });
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
    };
  }
}

export const quoteEngine = new QuoteEngine();
