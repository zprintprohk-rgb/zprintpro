/**
 * 工艺起步价 + 单版费 — Quote Engine v2
 * 2026-06-07 升级：印刷行业工艺不是 multiplier，是"起步价 + 单版费"
 *
 * 行业洞察：
 * - 烫金：必须开锌版（固定费 150 HKD/版）+ 烫金机工时
 * - 覆膜：起步价 50 HKD + 每版 30 HKD
 * - UV：起步价 80 HKD + 每版 40 HKD
 * - 模切：起步价 100 HKD + 每版 25 HKD（啤盒/贴纸必须）
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
    baseCost: 80,
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
    baseCost: 30,
    perSheetCost: 5,
    description: '圆角模切',
    requiresPlate: false,
  },
  'matte-lamination': {
    baseCost: 50,
    perSheetCost: 30,
    description: '哑膜覆膜 - 触摸哑光',
  },
  'gloss-lamination': {
    baseCost: 50,
    perSheetCost: 30,
    description: '光膜覆膜 - 表面光鲜',
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
