/**
 * Engine 透传回归测试 (2026-07-18)
 * P0 bug: engine.calculate() 构造 FormulaContext 时丢了 market/sides,
 * 导致所有公式 fallback 到 US 市场。本测试直接走 engine 层防回归。
 */
import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { quoteEngine } from '../engine';
import { MARKETS } from '../markets';

const baseReq = {
  productSlug: 'packaging',
  quantity: 1000,
  size: { w: 200, h: 150, unit: 'mm' as const },
  material: '350g_white_card',
  finishes: [] as never[],
  deadline: 'standard' as const,
};

test('engine 透传 marketCode: JP 市场结果应标注 Japan 而非 United States', () => {
  const result = quoteEngine.calculate({ ...baseReq, marketCode: 'JP' });
  const ext = result as unknown as { market?: { code: string } };
  assert.equal(ext.market?.code, 'JP', `expected market JP, got ${ext.market?.code}`);
});

test('engine 透传 marketCode: HK 与 US 报价必须不同 (margin/tax/shipping zone 不同)', () => {
  const hk = quoteEngine.calculate({ ...baseReq, marketCode: 'HK' });
  const us = quoteEngine.calculate({ ...baseReq, marketCode: 'US' });
  assert.notEqual(hk.unitPrice, us.unitPrice, 'HK 与 US 单价相同 → market 未透传');
});

test('engine 透传 locale: ja → JP 市场', () => {
  const result = quoteEngine.calculate({ ...baseReq, locale: 'ja' });
  const ext = result as unknown as { market?: { code: string } };
  assert.equal(ext.market?.code, 'JP');
});

test('market 对象与 MARKETS 注册表一致', () => {
  const result = quoteEngine.calculate({ ...baseReq, marketCode: 'US' });
  const ext = result as unknown as { market?: { code: string; currency: string } };
  assert.equal(ext.market?.currency, MARKETS.US.currency);
});
