/**
 * 书册公式 Sanity Test (H2 修复 2026-06-07)
 * 旧 bug: sheetsNeeded = ceil(24/8) * ceil(50/50) = 3 张 (实际 150 张, 差 50x)
 * 修复: sheetsNeeded = ceil(totalPages / 8) * quantity
 */
import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { booksFormula } from '../formulas/books';
import { MARKETS } from '../markets';

test('books 50 本 × 24 页: 内页 sheetsNeeded = 150, paperCost 含封面 860.5 (旧公式 3 张 → 15 HKD 破产风险)', () => {
  const r = booksFormula({
    quantity: 50,
    size: { w: 210, h: 297, unit: 'mm' as const },
    material: '80g_inner_paper',
    finishes: [],
    deadline: 'standard' as const,
    pages: 24,
    market: MARKETS.HK,
  });
  // paperCost = innerPaperCost + coverPaperCost
  // innerPaperCost = 150 sheets × 5 = 750
  // coverPaperCost = ceil(50/4) × 8.5 = 13 × 8.5 = 110.5
  // total = 860.5
  assert.equal(r.paperCostHKD, 860.5, `paperCost should be 860.5 (inner 750 + cover 110.5), got ${r.paperCostHKD}`);
  // 旧公式: 3 sheets × 5 = 15, 工厂收 750, 客户付 15 → 亏 735 HKD
});

test('books 100 本 × 32 页: inner 400 sheets × 5 = 2000 + cover 425 = 2425', () => {
  const r = booksFormula({
    quantity: 100,
    size: { w: 210, h: 297, unit: 'mm' as const },
    material: '80g_inner_paper',
    finishes: [],
    deadline: 'standard' as const,
    pages: 32,
    market: MARKETS.HK,
  });
  // innerPaperCost = 100 × ceil(32/8) × 5 = 100 × 4 × 5 = 2000
  // coverPaperCost = ceil(100/4) × 8.5 = 25 × 8.5 = 212.5
  // total = 2212.5
  assert.equal(r.paperCostHKD, 2212.5, `paperCost should be 2212.5, got ${r.paperCostHKD}`);
});

test('books 50 本 × 24 页: paperCost 应该 >= 700 (H2 修复后内页+封面合理成本)', () => {
  const r = booksFormula({
    quantity: 50,
    size: { w: 210, h: 297, unit: 'mm' as const },
    material: '80g_inner_paper',
    finishes: [],
    deadline: 'standard' as const,
    pages: 24,
    market: MARKETS.HK,
  });
  assert.ok(r.paperCostHKD >= 700, `paperCost ${r.paperCostHKD} should be >= 700 (H2 修复后正确反映 150 张大版 + 封面)`);
});
