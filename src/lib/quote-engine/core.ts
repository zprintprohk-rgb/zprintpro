/**
 * 拼版算法核心 — Quote Engine v3 (Phase 2.1)
 * 2026-06-07 升级：
 *   1. Imposition（印前拼版）：单设计在大版上怎么排
 *   2. Gang Run（混拼）：1 张大版拼多个不同客户的不同设计
 *   ★ 这是 e-print 真正的核心壁垒
 *
 * 行业洞察：
 * - 工厂**不是**为每个客户开一张大版
 * - 1 张大版（329×483mm）填 85% 利用率
 * - 客户 100 张 + 50 张 A5 + 200 张贴纸 混拼 = 1 张版
 * - 开机费 300 HKD 被 3 个客户分摊
 * - **小批量客户单价降 4x**
 *
 * 战术：
 * - 小批量（≤ GANG_RUN_THRESHOLD）：混拼，1 张大版，多客户共享
 * - 大批量（> GANG_RUN_THRESHOLD）：自拼，ceil(quantity / itemsPerSheet) 张版
 */

export type SheetSize = 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'SRA3' | 'A3plus' | 'B3' | 'B4' | 'B5' | 'large-format';

/** 标准印刷大版尺寸 (mm) — 来自海德堡/小森行业惯例 */
export const SHEET_SIZES: Record<SheetSize, { w: number; h: number; label: string }> = {
  A0: { w: 841, h: 1189, label: 'A0 (841×1189mm)' },
  A1: { w: 594, h: 841, label: 'A1 (594×841mm)' },
  A2: { w: 420, h: 594, label: 'A2 (420×594mm)' },
  A3: { w: 297, h: 420, label: 'A3 (297×420mm)' },
  A4: { w: 210, h: 297, label: 'A4 (210×297mm)' },
  SRA3: { w: 320, h: 450, label: 'SRA3 (320×450mm) — 数码印刷常用' },
  A3plus: { w: 329, h: 483, label: 'A3+ (329×483mm)' },
  B3: { w: 353, h: 500, label: 'B3 (353×500mm)' },
  B4: { w: 250, h: 353, label: 'B4 (250×353mm)' },
  B5: { w: 176, h: 250, label: 'B5 (176×250mm)' },
  'large-format': { w: 1060, h: 1520, label: 'Large Format (1060×1520mm) — 大幅面' },
};

/** 出血 (mm) — 印刷行业标准 */
export const BLEED_DEFAULT_MM = 3;

/** 啤位/刀模位 (mm) — 用于模切产品 */
export const DIE_CUT_MARGIN_MM = 2;

export interface GangInput {
  /** 成品尺寸 (mm) — 不含出血 */
  itemWidthMM: number;
  itemHeightMM: number;
  /** 数量 */
  quantity: number;
  /** 出血 (默认 3mm) */
  bleedMM?: number;
  /** 啤位/刀模位 (默认 2mm，用于贴纸/啤盒) */
  dieCutMM?: number;
  /** 大版尺寸 (默认大度对开 530×740，行业标准 4 开机) */
  sheet?: SheetSize;
  /** 大版自定义尺寸 (override sheet) */
  customSheet?: { w: number; h: number };
  /** 是否允许旋转 90° 优化排版 */
  allowRotate?: boolean;
  /** 混拼阈值 (默认 1000) — 低于此数走混拼 */
  gangRunThreshold?: number;
  /** 混拼密度 (默认 0.85) */
  mixDensity?: number;
}

export interface GangResult {
  /** 单张成品含出血+啤位的总尺寸 */
  itemTotalW: number;
  itemTotalH: number;
  /** 排版策略：横向排 / 竖向排 / 自动选最优 */
  orientation: 'landscape' | 'portrait' | 'auto';
  /** 单大版可排数量（imposition 模式 — 满版排） */
  itemsPerSheet: number;
  /** 需多少张大版 (imposition 模式) */
  isolationSheetsNeeded: number;
  /** 实际印多少张大版 (考虑 gang run) */
  sheetsNeeded: number;
  /** Gang Run 模式：mix / isolate */
  mode: 'mix' | 'isolate';
  /** 混拼密度 (0-1)：1 张大版实际填充比例 (行业标准 0.85) */
  mixDensity: number;
  /** 你占的版位（混拼下你的设计在大版上占几个位置） */
  slotsUsed: number;
  /** 混拼版总版位 */
  totalSheetCapacity: number;
  /** 实际利用率 0-1 */
  utilization: number;
  /** 浪费率 0-1 (1 - utilization) */
  wasteRatio: number;
  /** 实际印量 (sheetsNeeded × itemsPerSheet) */
  actualImpressions: number;
  /** 多印的张数 (actualImpressions - quantity) */
  overrun: number;
  /** 警告：利用率低/超量等 */
  warnings: string[];
  /** 优化建议：调整尺寸/方向 */
  suggestions: string[];
}

/** 混拼阈值 (行业经验值) - 低于此数量走混拼模式 */
export const GANG_RUN_THRESHOLD = 1000;

/** 混拼密度 (行业标准) - 1 张大版实际填充率 85% */
export const DEFAULT_MIX_DENSITY = 0.85;

/**
 * 核心拼版算法 v3 (Gang Run 模式)
 *
 * 两阶段决策：
 * 1. imposition 计算 (单设计满版排版) → itemsPerSheet
 * 2. gang run 决策：
 *    - quantity <= GANG_RUN_THRESHOLD：混拼模式 (mix)
 *      你的版位 = ceil(quantity / (itemsPerSheet × mixDensity))
 *      实际印 sheetsNeeded = ceil(slotsUsed / totalSheetCapacity) 张大版
 *      通常 100-1000 张走 mix
 *    - quantity > GANG_RUN_THRESHOLD：自拼模式 (isolate)
 *      sheetsNeeded = ceil(quantity / itemsPerSheet)
 */
export function calculateGang(input: GangInput): GangResult {
  const bleed = input.bleedMM ?? BLEED_DEFAULT_MM;
  const dieCut = input.dieCutMM ?? DIE_CUT_MARGIN_MM;
  const itemTotalW = input.itemWidthMM + bleed * 2 + dieCut * 2;
  const itemTotalH = input.itemHeightMM + bleed * 2 + dieCut * 2;

  const sheetSize = input.customSheet || SHEET_SIZES[input.sheet || 'A3plus'];
  const sheetW = sheetSize.w;
  const sheetH = sheetSize.h;

  // 横排
  const landscapeH = Math.floor(sheetW / itemTotalW);
  const landscapeV = Math.floor(sheetH / itemTotalH);
  const landscapeCount = landscapeH * landscapeV;

  // 竖排
  const portraitH = Math.floor(sheetW / itemTotalH);
  const portraitV = Math.floor(sheetH / itemTotalW);
  const portraitCount = portraitH * portraitV;

  let bestCount: number;
  let orientation: 'landscape' | 'portrait' | 'auto';
  if (input.allowRotate === false) {
    bestCount = landscapeCount;
    orientation = 'landscape';
  } else if (portraitCount > landscapeCount) {
    bestCount = portraitCount;
    orientation = 'portrait';
  } else {
    bestCount = landscapeCount;
    orientation = 'landscape';
  }

  const itemsPerSheet = Math.max(1, bestCount);
  const gangRunThreshold = input.gangRunThreshold ?? GANG_RUN_THRESHOLD;
  const mixDensity = input.mixDensity ?? DEFAULT_MIX_DENSITY;

  // Gang Run 决策
  const mode: 'mix' | 'isolate' = input.quantity <= gangRunThreshold ? 'mix' : 'isolate';

  let sheetsNeeded: number;
  let slotsUsed: number;

  if (mode === 'mix') {
    // 混拼模式：1 张大版容量 = itemsPerSheet × mixDensity
    // 你的版位 = ceil(quantity / effectivePerSheet)
    const effectivePerSheet = itemsPerSheet * mixDensity;
    slotsUsed = Math.ceil(input.quantity / effectivePerSheet);
    // 实际印多少张大版 = ceil(slotsUsed / itemsPerSheet)
    sheetsNeeded = Math.max(1, Math.ceil(slotsUsed / itemsPerSheet));
  } else {
    // 自拼模式
    sheetsNeeded = Math.ceil(input.quantity / itemsPerSheet);
    slotsUsed = sheetsNeeded * itemsPerSheet; // 满版用
  }

  const actualImpressions = sheetsNeeded * itemsPerSheet;
  const utilization = (input.quantity * itemTotalW * itemTotalH) / (sheetsNeeded * sheetW * sheetH);
  const wasteRatio = 1 - utilization;
  const overrun = actualImpressions - input.quantity;

  // 警告 + 建议
  const warnings: string[] = [];
  const suggestions: string[] = [];
  if (itemsPerSheet === 0) {
    warnings.push(
      `Item size (${input.itemWidthMM}×${input.itemHeightMM}mm + bleed) too large for sheet (${sheetW}×${sheetH}mm). Choose bigger sheet.`
    );
  }
  if (wasteRatio > 0.4) {
    warnings.push(
      `Waste ratio ${(wasteRatio * 100).toFixed(0)}% is high (>40%). Consider adjusting size or quantity.`
    );
  }
  if (mode === 'mix' && input.quantity < gangRunThreshold) {
    suggestions.push(
      `Gang Run enabled: your order shares the press sheet with other customers. Saves HKD ${((itemsPerSheet * mixDensity - input.quantity / sheetsNeeded) * 4.2).toFixed(2)} on paper + setup.`
    );
  }

  return {
    itemTotalW,
    itemTotalH,
    orientation,
    itemsPerSheet,
    isolationSheetsNeeded: Math.ceil(input.quantity / itemsPerSheet),
    sheetsNeeded,
    mode,
    mixDensity,
    slotsUsed,
    totalSheetCapacity: itemsPerSheet,
    utilization: Math.min(1, utilization),
    wasteRatio: Math.max(0, Math.min(1, wasteRatio)),
    actualImpressions,
    overrun,
    warnings,
    suggestions,
  };
}

/**
 * 启动成本 (HKD/版) — 海德堡/小森 4 色开机基准
 * 不同印刷机类型 + 数量级有不同档位
 */
export const PRESS_SETUP_COSTS = {
  /** 数码印刷 (HP Indigo / Xerox) - 0 开机费但慢 */
  digital: { setupPerSheet: 0, label: 'Digital (HP Indigo / Xerox)' },
  /** 4 色柯式 (海德堡 SM74/小森) - 中小批量标准 */
  offset_4color: { setupPerSheet: 300, label: '4-Color Offset (Heidelberg SM74)' },
  /** 5 色柯式 + UV - 含 UV 工艺 */
  offset_5color_uv: { setupPerSheet: 450, label: '5-Color Offset + UV' },
  /** 8 色柯式 - 大批量 + 联机上光 */
  offset_8color: { setupPerSheet: 800, label: '8-Color Offset' },
  /** 大幅面喷绘 */
  large_format: { setupPerSheet: 100, label: 'Large Format Inkjet' },
};

/**
 * 纸张单价 (HKD/张) — 香港市场基准
 * 注：实际应从 print_materials 表查询
 */
export const PAPER_COSTS_PER_SHEET: Record<string, number> = {
  '157g_gloss_art': 1.2, // 157g 铜版纸
  '200g_gloss_art': 1.8,
  '250g_gloss_art': 2.4,
  '300g_gloss_art': 3.0,
  '350g_gloss_art': 3.6,
  '400g_gloss_art': 4.2,
  '250g_kraft': 2.8,
  '300g_kraft': 3.4,
  '350g_kraft': 4.0,
  '300g_specialty_gold': 8.5, // 特种纸 - 金箔
  '350g_specialty_silver': 9.2,
  '300g_pvc': 6.0, // 防水 PVC
  'transparent_vinyl': 5.5,
  'white_vinyl': 4.0,
};
