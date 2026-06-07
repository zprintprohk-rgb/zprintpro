/**
 * 报价引擎类型定义
 * 2026-06-07 启动：QuoteEngine v1 (Phase 1 MVP)
 *
 * 目标：对标 WooCommerce Product Add-Ons + PriceWise Calculator Pro
 * 实现：shadcn/ui + react-hook-form + TypeScript 公式引擎
 */

export type FinishOption = 'spot-uv' | 'foil' | 'emboss' | 'rounded-corners' | 'matte-lamination' | 'gloss-lamination';
export type Deadline = 'standard' | 'rush' | 'same-day';
export type SizeUnit = 'mm' | 'in';

export interface QuoteRequest {
  /** 产品 slug（决定走哪个公式模板） */
  productSlug: string;
  /** 产品数量 */
  quantity: number;
  /** 尺寸（mm 或 in） */
  size: { w: number; h: number; unit: SizeUnit };
  /** 材质（由产品决定可选列表） */
  material: string;
  /** 工艺附加 */
  finishes: FinishOption[];
  /** 交期 */
  deadline: Deadline;
  /** 目标市场代码 (C5 修复 2026-06-07) - 用于 minimumOrder 校验 */
  marketCode?: import('./markets').MarketCode;
  /** Locale (跟 marketCode 二选一) */
  locale?: string;
  /** 文件 URL（可选，附在询盘单上） */
  fileUrls?: string[];
}

export interface PriceBreakdown {
  label: string;
  amount: number;
  /** 单价/数量/工艺各项的细分说明 */
  description?: string;
}

export interface PriceSuggestion {
  /** 优化建议类型 */
  type: 'material-swap' | 'quantity-bump' | 'finish-remove' | 'deadline-change';
  /** 节省金额（USD） */
  savingsUsd: number;
  /** 人类可读的建议 */
  message: string;
}

export interface QuoteResult {
  /** 单价（USD） */
  unitPrice: number;
  /** 总价（USD） */
  totalPrice: number;
  /** 价格细分（透明度） */
  breakdown: PriceBreakdown[];
  /** 交期（小时） */
  leadTimeHours: { min: number; max: number };
  /** 警告（例如最小起订量不足） */
  warnings: string[];
  /** 优化建议（驱动 AI 智能报价） */
  suggestions: PriceSuggestion[];
  /** 询盘 ID（落库后返回） */
  inquiryId?: string;
  /** 计算时间戳 */
  calculatedAt: string;
}

/** 公式模板接口：每个 SKU 实现一份 */
export interface FormulaContext {
  quantity: number;
  size: { w: number; h: number; unit: SizeUnit };
  material: string;
  finishes: FinishOption[];
  deadline: Deadline;
}

export interface FormulaResult {
  baseUnitPrice: number;
  finishSurcharge: number;
  deadlineMultiplier: number;
  minQuantity: number;
  maxQuantity: number;
  leadTimeHours: { min: number; max: number };
  notes?: string[];
}

export type ProductFormula = (ctx: FormulaContext) => FormulaResult;
