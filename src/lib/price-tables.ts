/**
 * 真实价格表报价引擎 (2026-07-18)
 * 数据源: src/data/price-tables/*.json — HKD 锚定, intuan 实询 ×1.3 校准
 *
 * getTableQuote(sku, qty):
 *  - qty 落在两档之间 → 线性插值 unit 价
 *  - qty 低于最小档 → 用最小档 unit 价
 *  - qty 高于最大档 → 用最大档 unit 价
 *  - sku 无表 → 返回 null (调用方回退展示价逻辑)
 */

import paperBags from '@/data/price-tables/paper-bags.json';
import packaging from '@/data/price-tables/packaging.json';
import flyers from '@/data/price-tables/flyers.json';
import books from '@/data/price-tables/books.json';
import stickers from '@/data/price-tables/stickers.json';

export interface PriceTier {
  qty: number;
  price: number;
  unit: number;
  src?: string;
  note?: string;
}

interface PriceTableProduct {
  sku: string;
  tiers: PriceTier[];
}

interface PriceTable {
  products: PriceTableProduct[];
}

const TABLES: PriceTable[] = [paperBags, packaging, flyers, books, stickers] as unknown as PriceTable[];

const SKU_INDEX: Map<string, PriceTier[]> = (() => {
  const map = new Map<string, PriceTier[]>();
  for (const table of TABLES) {
    for (const p of table.products) {
      // tiers 升序排序一次, 后续插值依赖有序
      map.set(p.sku, [...p.tiers].sort((a, b) => a.qty - b.qty));
    }
  }
  return map;
})();

export interface TableQuote {
  /** 总价 (HKD) */
  totalHKD: number;
  /** 单价 (HKD) */
  unitHKD: number;
  /** 命中的数量档: 插值时为 [低, 高] 两档, 边界外/精确命中时 low === high */
  tier: { low: PriceTier; high: PriceTier; interpolated: boolean };
}

export function getTableQuote(sku: string, qty: number): TableQuote | null {
  const tiers = SKU_INDEX.get(sku);
  if (!tiers || tiers.length === 0 || !Number.isFinite(qty) || qty <= 0) return null;

  const first = tiers[0];
  const last = tiers[tiers.length - 1];

  // 低于最小档: 用最小档 unit 价
  if (qty <= first.qty) {
    return { totalHKD: round2(first.unit * qty), unitHKD: first.unit, tier: { low: first, high: first, interpolated: false } };
  }
  // 高于最大档: 用最大档 unit 价
  if (qty >= last.qty) {
    return { totalHKD: round2(last.unit * qty), unitHKD: last.unit, tier: { low: last, high: last, interpolated: false } };
  }

  // 找区间 [low, high]
  for (let i = 0; i < tiers.length - 1; i++) {
    const low = tiers[i];
    const high = tiers[i + 1];
    if (qty === low.qty) {
      return { totalHKD: round2(low.unit * qty), unitHKD: low.unit, tier: { low, high: low, interpolated: false } };
    }
    if (qty > low.qty && qty < high.qty) {
      // 线性插值 unit 价
      const ratio = (qty - low.qty) / (high.qty - low.qty);
      const unit = low.unit + (high.unit - low.unit) * ratio;
      const unitR = round2(unit);
      return { totalHKD: round2(unitR * qty), unitHKD: unitR, tier: { low, high, interpolated: true } };
    }
    if (qty === high.qty) {
      return { totalHKD: round2(high.unit * qty), unitHKD: high.unit, tier: { low: high, high, interpolated: false } };
    }
  }
  return null;
}

/** 某 sku 是否有真实价格表 */
export function hasPriceTable(sku: string): boolean {
  return SKU_INDEX.has(sku);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
