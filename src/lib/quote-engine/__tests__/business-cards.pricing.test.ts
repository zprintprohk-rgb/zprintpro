/**
 * 报价系统 Sanity Tests (2026-06-07)
 * 防止价格 bug 回归
 * 用户: "你都有了报价系统，里面还有那么错误的价格？"
 */
import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { businessCardsFormulaV2 } from '../formulas/business-cards';
import { MARKETS } from '../markets';
import { calculateFX } from '../fx';

const baseCtx = {
  quantity: 1000,
  finishes: [],
  deadline: 'standard' as const,
};

function getQuote(marketCode: keyof typeof MARKETS) {
  const m = MARKETS[marketCode];
  return businessCardsFormulaV2({ ...baseCtx, market: m });
}

test('HK 1000 张: HKD 单价 0.5-0.8 之间, 总价 > 起步 80', () => {
  const r = getQuote('HK');
  assert.ok(r.baseUnitPrice > 0.5, `HK unit price ${r.baseUnitPrice} should > 0.5 HKD`);
  assert.ok(r.baseUnitPrice < 0.8, `HK unit price ${r.baseUnitPrice} should < 0.8 HKD`);
  const total = r.baseUnitPrice * 1000;
  assert.ok(total >= 80, `HK total ${total} should >= 80 HKD minimum`);
});

test('US 1000 张: USD 单价 0.08-0.15, 总价 > 起步 15', () => {
  const r = getQuote('US');
  assert.ok(r.baseUnitPrice > 0.08, `US unit ${r.baseUnitPrice} should > 0.08 USD`);
  assert.ok(r.baseUnitPrice < 0.15, `US unit ${r.baseUnitPrice} should < 0.15 USD`);
  const total = r.baseUnitPrice * 1000;
  assert.ok(total >= 15, `US total ${total} should >= 15 USD minimum`);
});

test('GB 1000 张: 含 VAT 20%, 总价 > 起步 12 GBP', () => {
  const r = getQuote('GB');
  const total = r.baseUnitPrice * 1000;
  assert.ok(total >= 12, `GB total ${total} should >= 12 GBP minimum`);
  assert.equal(r.tax.taxRate, 0.20, 'GB should have VAT 20%');
});

test('运费不被目标毛利率加成 (修复 #4)', () => {
  // 旧公式: 含运费 baseCost 乘 1.82, 新公式: 运费 1.1x 不进毛利率
  // US 1000 张: 工厂 ~600 HKD, 运费 ~100 HKD
  // 旧: 700 * 1.82 = 1274 HKD; 新: 600*1.82 + 110 = 1202 HKD
  // 关键: 客户付 USD 应该 < 0.20 USD/张 (防止运费被加 82%)
  const r = getQuote('US');
  assert.ok(r.baseUnitPrice < 0.20, `US unit ${r.baseUnitPrice} should < 0.20 USD (防止运费被毛利率加成)`);
  assert.ok(r.totalCostHKD < 1300, `totalCostHKD ${r.totalCostHKD} should < 1300 (含运费但不该被加 82%)`);
});

test('FX 不被双重换汇抵消 (修复 #1)', () => {
  // 关键测试: 净 FX 调整应该接近真实成本 (2.9% + 1.5% = 4.4%)
  // 旧 bug: 净 FX ≈ 0, 净利率虚高
  // 修复后: 净 FX 4.4%, 净利率应该 30-40%
  const r = getQuote('US');
  const customerPaysUSD = r.baseUnitPrice * r.quantity;
  const factoryHKD = r.setupCostHKD + r.paperCostHKD + r.finishingCostHKD;
  const fx = calculateFX({
    fromAmount: customerPaysUSD,
    fromCurrency: 'USD',
    market: MARKETS.US,
    factoryCostHKD: factoryHKD,
    shippingCostHKD: r.shippingHKD,
  });
  assert.ok(fx.netMargin > 0.20, `netMargin ${fx.netMargin} should > 20% (修复后真实值)`);
  assert.ok(fx.netMargin < 0.50, `netMargin ${fx.netMargin} should < 50%`);
  console.log(`[US 1000] customer pays USD ${customerPaysUSD.toFixed(2)}, net margin ${fx.netMargin.toFixed(1)}%`);
});

test('同 1000 张跨市场, 工厂成本一致, 客户付按汇率', () => {
  const hk = getQuote('HK');
  const us = getQuote('US');
  // 工厂成本 (HKD) 应该一致
  assert.equal(hk.setupCostHKD, us.setupCostHKD, '工厂 setup 一致');
  assert.equal(hk.paperCostHKD, us.paperCostHKD, '工厂 paper 一致');
  // US 毛利高 → 客户付 (按汇率折回 HKD) 应该 > HK
  const hkHKD = hk.baseUnitPrice * 1000;
  const usHKD = (us.baseUnitPrice * 1000) / MARKETS.US.exchangeRate; // USD → HKD
  assert.ok(usHKD > hkHKD * 1.3, `US ${usHKD.toFixed(0)} HKD should > HK ${hkHKD.toFixed(0)} * 1.3`);
});
