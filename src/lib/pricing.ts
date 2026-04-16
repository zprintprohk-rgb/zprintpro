export interface QuoteParams {
  /** 页数（1-1000） */
  pages: number;
  /** 颜色模式 */
  color: 'black' | 'color';
  /** 装订方式 */
  binding: 'none' | 'staple' | 'spiral' | 'perfect';
  /** 数量（1-10000） */
  quantity: number;
  /** 是否覆膜 */
  lamination?: boolean;
  /** 纸张类型（可选） */
  paperType?: 'standard' | 'premium' | 'recycled';
  /** 双面打印（可选） */
  duplex?: boolean;
}

export interface QuoteResult {
  /** 单价（HKD） */
  unitPrice: number;
  /** 总价（HKD） */
  totalPrice: number;
  /** 明细项 */
  breakdown: {
    baseCost: number;
    colorSurcharge: number;
    bindingCost: number;
    laminationCost: number;
    paperSurcharge: number;
    quantityDiscount: number;
  };
  /** 货币单位 */
  currency: 'HKD';
}

/**
 * 计算报价
 * 公式：总价 = (基础价 + 彩色附加费 + 装订费 + 覆膜费) × 数量 × 折扣系数
 */
export function calculateQuote(params: QuoteParams): QuoteResult {
  const {
    pages,
    color,
    binding,
    quantity,
    lamination = false,
    paperType = 'standard',
    duplex = false,
  } = params;

  // 基础价（每页 HKD）
  const baseCost = pages * 0.5;

  // 彩色附加费
  const colorSurcharge = color === 'color' ? baseCost * 1.5 : 0;

  // 装订费
  const bindingCostMap: Record<QuoteParams['binding'], number> = {
    none: 0,
    staple: 2,
    spiral: 8,
    perfect: 15,
  };
  const bindingCost = bindingCostMap[binding];

  // 覆膜费
  const laminationCost = lamination ? pages * 0.3 : 0;

  // 纸张附加费
  const paperSurchargeMap: Record<NonNullable<QuoteParams['paperType']>, number> =
    { standard: 0, premium: 0.2, recycled: 0.1 };
  const paperSurcharge = pages * paperSurchargeMap[paperType];

  // 数量折扣系数（阶梯折扣）
  const discountMap: Record<number, number> = {
    1: 1.0,
    10: 0.9,
    50: 0.8,
    100: 0.7,
    500: 0.6,
    1000: 0.5,
  };
  const discount = Object.entries(discountMap).reduce(
    (acc, [threshold, rate]) => (quantity >= Number(threshold) ? rate : acc),
    1.0
  );

  const unitPrice =
    (baseCost + colorSurcharge + bindingCost + laminationCost + paperSurcharge) *
    (duplex ? 0.9 : 1.0);
  const totalPrice = unitPrice * quantity * discount;

  return {
    unitPrice: Math.round(unitPrice * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
    breakdown: {
      baseCost,
      colorSurcharge,
      bindingCost,
      laminationCost,
      paperSurcharge,
      quantityDiscount: discount,
    },
    currency: 'HKD',
  };
}
