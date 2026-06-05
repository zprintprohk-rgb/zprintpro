/**
 * 日本消费税 (10%) 工具
 */

const TAX_RATE = 0.10;

/** 含税价格 → 不含税 */
export function stripTax(priceIncl: number): number {
  return Math.round((priceIncl / (1 + TAX_RATE)) * 100) / 100;
}

/** 不含税价格 → 含税 */
export function includeTax(priceExcl: number): number {
  return Math.round(priceExcl * (1 + TAX_RATE) * 100) / 100;
}

/** 格式化日元 */
export function formatJPY(value: number): string {
  return `¥${value.toLocaleString('ja-JP')}`;
}
