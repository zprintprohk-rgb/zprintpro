# 报价系统问题清单 (2026-06-07)

## 已修复 ✅

### #1 双重换汇 bug (business-cards.ts)
- **症状**: 客户付金额被乘两次 (HKD × exchangeRate → USD, fx.ts 又 USD × midMarketRate → HKD)
- **影响**: 净 FX 调整被抵消，32% 真实净利率被掩盖成 45%
- **修法**: 直接传本币 fromAmount 给 fx.ts，不再做反向换汇
- **改动**: business-cards.ts line 103-119

### #2 Shipping 重复计费 (business-cards.ts)
- **症状**: baseCost 含 shipping, totalCostHKD 又加, fx 又加一次
- **影响**: 净利率少算 5-8%
- **修法**: factoryCostHKD (不含运费) + shippingMarkupHKD 单独走 1.1x 加价

### #4 运费被目标毛利率加成
- **症状**: 含运费的 baseCost 乘 1.82 (45% 毛利)，运费被加 82%
- **影响**: 客户付的运费过高
- **修法**: 运费单独 1.1x 加价, 不进毛利率加成

## 待修复 🔴 (sanity test 暴露)

### #6 业务卡走 die-cut 算法
- **症状**: 业务卡不该需要 die-cut (啤位), 但默认 dieCutMM=2
- **影响**: itemsPerSheet 28→21, sheetsNeeded 36→48, 工厂成本多 33%
- **修法**: business-cards.ts 传 `dieCutMM: 0`

### #7 shipping.ts 虚高
- **症状**: 1000 张业务卡 2.5kg DHL US = HKD 480 (实际行业 HKD 200-300)
- **影响**: 客户付运费多 60-140%
- **修法**: 重核 DHL/FedEx/USPS 实际费率表

### #8 netMargin NaN / 单位混乱 (fx.ts)
- **症状**: `netMargin = profit / toAmount`, profit 是 HKD, toAmount 是 USD
- **影响**: 净利率计算崩 (NaN), 报表显示 0%
- **修法**: profit 转本币 (÷ midMarketRate), 或全部统一 HKD

### #9 tax 算 1 次但 USD 价格显示偏高
- **症状**: 含税 USD 202.76, 但 0.20 USD/张 偏贵 (moo.com 1000 张 ~ USD 80-100)
- **影响**: 客户感知贵 2x
- **修法**: 修 #6 + #7 后再校验

## 审计中 🟡

### #3 业务卡尺寸不按市场分 (HK 90×54 / US 85×55 / AU 89×51)
- 修法: 公式里按 m.code 选尺寸

### #5 minimumOrder 没在公式里强制
- 修法: 公式最后检查 `quantity * unitPrice >= m.minimumOrder`，不达标抛错

### #10 deadline 不按市场 lead time
- 修法: same-day 不允许 US/AU (物理上做不到)

### #11 双面印刷没选项
- 修法: 公式加 `sides: 1|2`，双面 +30-50% 纸张

## Agent 深度审计中

opc-monetization-chief session `mvs_e7108b2d5926498b8d542de210d8ed9a` 跑扩展报告 (5-15 分钟)，预计发现 5-10 个新问题。
