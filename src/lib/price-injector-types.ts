/**
 * price-injector-types.ts — shared types
 */
export interface PriceTier {
  qty: number;
  priceHKD: number;
  priceUSD: number;
  priceJPY: number;
  weightKg: number | null;
}

export interface PriceConfig {
  label: Record<string, string>;
  tiers: PriceTier[];
}

export interface PriceTableData {
  source: string;
  productName: Record<string, string>;
  defaultConfigIndex: number;
  configs: PriceConfig[];
}
