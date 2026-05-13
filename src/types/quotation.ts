/**
 * 报价系统类型
 */

export type ProductType = 'business-card' | 'sticker' | 'flyer' | 'paper-bag' | 'box' | 'poster';
export type PaperType = 'artpaper' | 'cotton' | 'recycled' | 'pvc';
export type ProcessType = 'foil' | 'uv' | 'emboss' | 'die-cut' | 'none';

export interface QuotationFormData {
  productType: ProductType;
  quantity: number;        // 100-10000
  paper: PaperType;
  process: ProcessType[];
  sides: 'single' | 'double';
  delivery: 'standard' | 'express';
}

export interface PriceBreakdown {
  basePrice: number;
  quantityFactor: number;
  processFee: number;
  paperFee: number;
  deliveryFee: number;
  total: number;
  currency: string;
}

// 类型守卫
export const isValidQuantity = (q: number): q is 100 | 200 | 300 | 500 | 1000 | 2000 | 5000 | 10000 =>
  [100, 200, 300, 500, 1000, 2000, 5000, 10000].includes(q);
