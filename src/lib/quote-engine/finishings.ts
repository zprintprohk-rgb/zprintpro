/**
 * 工艺起步价 + 单版费 — Quote Engine v2
 * 2026-06-07 升级：印刷行业工艺不是 multiplier，是"起步价 + 单版费"
 *
 * 行业洞察：
 * - 烫金：必须开锌版（固定费 150 HKD/版）+ 烫金机工时 → 起步合計 300
 * - 覆膜：起步价 150 HKD + 每版 30 HKD
 * - UV：起步价 300 HKD + 每版 40 HKD
 * - 模切：起步价 200 HKD + 每版 25 HKD（啤盒/贴纸必须；贴纸/啤盒基礎公式內含拼版啤位，此檔暫無公式消費，供將來接線）
 *
 * 2026-11-28 K3 拍板新價（與頁面標籤「起」價對齊，Q12a/Q14）：
 *   Spot UV HK$300 起 / 覆膜 HK$150 起 / 圓角 HK$50 起 / 模切 HK$200 起
 *   燙金 HK$300 起（150 起步 + 鋅版 150）/ 擊凸 HK$400 起（200 起步 + 凸版 200）維持
 */

import type { FinishOption } from './types';

export interface FinishingCost {
  /** 起步价 (HKD) - 一次性 */
  baseCost: number;
  /** 单版费 (HKD/版) */
  perSheetCost: number;
  /** 说明 */
  description: string;
  /** 是否需要开版/制版 (烫金/模切等) */
  requiresPlate?: boolean;
  /** 制版费 (HKD/版) */
  plateCost?: number;
}

export const FINISHING_COSTS: Record<FinishOption, FinishingCost> = {
  'spot-uv': {
    baseCost: 300,
    perSheetCost: 40,
    description: '局部 UV 上光 - 高光提亮',
  },
  'foil': {
    baseCost: 150,
    perSheetCost: 50,
    description: '烫金/烫银 - 需开锌版',
    requiresPlate: true,
    plateCost: 150,
  },
  'emboss': {
    baseCost: 200,
    perSheetCost: 60,
    description: '击凸/压凹 - 需开凸版',
    requiresPlate: true,
    plateCost: 200,
  },
  'rounded-corners': {
    baseCost: 50,
    perSheetCost: 5,
    description: '圆角模切',
    requiresPlate: false,
  },
  'matte-lamination': {
    baseCost: 150,
    perSheetCost: 30,
    description: '哑膜覆膜 - 触摸哑光',
  },
  'gloss-lamination': {
    baseCost: 150,
    perSheetCost: 30,
    description: '光膜覆膜 - 表面光鲜',
  },
  // 2026-11-28 K3 拍板 模切 HK$200 起；暫無公式消費（模切產品拼版啤位在 core.ts 佈局層），供將來接線
  'die-cut': {
    baseCost: 200,
    perSheetCost: 25,
    description: '模切/啤盒 - 自定义刀模',
    requiresPlate: false,
  },
};

/**
 * 计算工艺总成本
 * = max(baseCost, perSheetCost × sheetsNeeded) + plateCost (if requires)
 */
export function calculateFinishingCost(
  finish: FinishOption,
  sheetsNeeded: number
): { total: number; breakdown: { label: string; amount: number }[] } {
  const fc = FINISHING_COSTS[finish];
  const perSheetTotal = fc.perSheetCost * sheetsNeeded;
  const base = Math.max(fc.baseCost, perSheetTotal);
  const plate = fc.requiresPlate ? fc.plateCost || 0 : 0;
  const total = base + plate;
  return {
    total,
    breakdown: [
      { label: `${fc.description} 起步价`, amount: fc.baseCost },
      { label: `${sheetsNeeded} 版 × $${fc.perSheetCost}/版`, amount: perSheetTotal },
      ...(fc.requiresPlate ? [{ label: `制版费`, amount: plate }] : []),
    ],
  };
}
