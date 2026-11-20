# 报价系统 Per-Market 成本分析（2026-07-18）

> 触发：user 要求「分析各语言下的成本是不一样的，比如 en 美国的成本，ja 日本的成本」
> 数据来源：quote-engine 代码审计 + markets.ts / shipping.ts / fx.ts 实际参数 + e-print.com.hk 首页锚点 + intuan.com 结构 + price-tables/*.json（2026-07-17 校准版）

---

## 0. 一句话结论

**同一个产品，三个市场的"服务成本"可差 2-3 倍**——差异不在工厂（深圳工厂成本三市场相同），而在 **运费、支付渠道费、汇率缓冲、税展示、市场锚定价** 五个变量。报价系统必须按市场（MarketCode）定价，不能全站一个价换算汇率完事。

---

## 1. 成本结构分层

```
客户到手价 = 工厂成本 (HKD, 三市场相同)
           × 市场毛利加成 (1/(1-targetMargin))
           + 运费 (按 ShippingZone, HKD/kg)
           + 支付渠道费 (0% ~ 8%)
           + FX 风险缓冲 (0.5% ~ 1.5%)
           × 汇率 (HKD → 本币)
           [+ 税 (外加 or 含税展示)]
```

### 市场参数实表（quote-engine/markets.ts 现值）

| 参数 | zh-hk → HK | en → US | ja → JP |
|---|---|---|---|
| 货币 | HKD | USD | JPY |
| targetMargin | 25% | **45%** | 30% |
| 税 | 无 | sales tax 8.7% **外加** | 消费税 10% **含税展示** |
| 运费 zone | local (顺丰) | north_america (DHL) | asia_pacific (DHL/Yamato) |
| 运费 standard | 15/kg, 无 base | **90/kg + 50 base** | **95/kg + 60 base** |
| 免邮阈值 (引擎) | HK$500 | HK$2,000 (≈US$256) | HK$1,500 (≈¥29,250) |
| 免邮阈值 (前端文案) | — | **"Free Shipping $99+"** ⚠️矛盾 | — |
| 支付渠道 | FPS/PayMe ≈0% | PayPal ~8% / **Airwallex ~4.4%** / Wire 2.5%+$35 | 银行振込 ~1% / Konbini ~3% |
| fxRiskBuffer | 0.5% | 1.2% | 1.0% |
| 最低订单 | HK$80 | US$15 | ¥1,500 |

---

## 2. 三市场成本演算（真实锚点）

### 示例 A：A5 单张 1000 张 157g 哑粉双面（轻货，~5kg）

工厂锚定价 HK$385（price-tables/flyers.json, modeled 待校准）

| 成本项 | HK | US | JP |
|---|---|---|---|
| 产品价 | HK$385 | HK$385 | HK$385 |
| 运费 (standard) | 15×5 = **HK$75** | 50+90×5 = **HK$500** | 60+95×5 = **HK$535** |
| 支付费 | ≈0 | Airwallex 4.4% ≈ HK$39 | 振込 1% ≈ HK$9 |
| FX buffer | 0.5% | 1.2% | 1.0% |
| **落地服务成本** | **≈HK$462** | **≈HK$935** | **≈HK$938** |
| 运费占落地价比 | 16% | **53%** | **57%** |
| 建议零售价 | HK$520-580 | US$125-145 | ¥19,800-22,800 |
| 市场锚点 | copycat 专版 $950 / e-print 拼版 $315(600张) | Vistaprint 1000 flyers ≈US$150-200 | ラクスル ≈¥12,000-15,000+送料 |

**洞察**：轻货跨境，运费比货贵。US/JP 必须把运费打进"包邮价"（US 45% 毛利容得下），否则结账页加运费 = 弃单。JP 锚点（ラクスル）比我们落地成本还低 → **单张不是 JP 主推品**，JP 应推贴纸/小ロット高附加值品。

### 示例 B：飞机盒 500 个 E坑+300g灰底白（重货，~50kg）

工厂锚定价 HK$3,400（price-tables/packaging.json, intuan专版×1.3 modeled）

| 成本项 | HK | US | JP |
|---|---|---|---|
| 产品价 | HK$3,400 | HK$3,400 | HK$3,400 |
| 运费 (standard 公布价) | 15×50 = HK$750 | 50+90×50 = **HK$4,550** | 60+95×50 = **HK$4,810** |
| 运费/货值比 | 22% | **134%** | **141%** |

**洞察**：重货按快递公布价，运费超过货值——这正是 engines RATE_TABLE 用的是 **DHL 公布零售价**。深圳 DHL/FedEx 代理折扣价通常 **3-5 折**，实际成本 ≈HK$1,400-2,300。行动：
1. RATE_TABLE 必须换成代理协议价（问货代要 2026 Q3 报价表）
2. 500 个以上盒子/纸袋订单 → 引导海运/陆运（美西 ~25 天，成本 1/5）
3. 报价页必须"产品价 + 运费"分项透明（B2B 客户接受，C 端才要包邮价）

### 示例 C：貼纸 1000 张 防水 vinyl（超轻货，~2kg）— US 甜点品类

工厂成本估 HK$600（对标 StickerMule 成本结构）

| | HK | US | JP |
|---|---|---|---|
| 落地成本 | ≈HK$640 | ≈HK$830 | ≈HK$850 |
| 市场锚点 | e-print 数码貼纸 | **StickerMule 1000 张 ≈US$200-260** | ラクスル シール |
| 可收价 | HK$800 | **US$160-190 (HK$1,250-1,480)** | ¥15,000-18,000 |
| 毛利率 | 20% | **45-55%** | 35% |

**洞察**：贴纸是 US 市场最佳品类——轻（运费占比低）、锚点高（StickerMule 贵）、复购高。45% targetMargin 在贴纸可达。

---

## 3. 五变量差异总结（报价系统设计依据）

| # | 变量 | HK | US | JP | 设计含义 |
|---|---|---|---|---|---|
| 1 | 运费占比 | 低 (本地) | **极高** | **极高** | US/JP 轻货包邮价打包 / 重货分项+代理折扣价 |
| 2 | 支付费 | ~0% | 4.4-8% | 1-3% | US 定价 +4-8% 渠道成本；推 Airwallex 弃 PayPal 主通道 |
| 3 | 税展示 | 无 | 外加 (报价可不含) | **必须含税** | ja 报价函数输出含税价；en 输出税前价 |
| 4 | 锚定价 | 低 (e-print 拼版) | **高 (Vistaprint/StickerMule)** | 中 (ラクスル) | US 可收 2-3 倍 HK 价；JP 精选品类打；HK 打专版/急单 |
| 5 | 心理价位 | $80 起 | $15 起 / $99 免邮 | ¥1,500 起 / 整数定价 | 每市场独立 minimumOrder + 价格取整规则 |

---

## 4. 发现的 bug / 不一致（按优先级）

| # | 问题 | 位置 | 影响 | 修法 |
|---|---|---|---|---|
| P0-1 | **engine.calculate() 不透传 market/sides** | engine.ts:64-70 | 所有公式永远按 US 市场算 | ctx 加 market/sides 透传（1-2 行） |
| P0-2 | **"Free Shipping $99+" 文案 vs 引擎免邮阈值 HK$2000(≈$256)** | Hero/TrustBadges vs shipping.ts:72 | en 客户预期 $99 免邮，引擎算 $256 → 客诉 | 二选一：阈值改 US$99（运费打进 45% 毛利）或改文案 |
| P0-3 | 汇率双轨 | markets.ts EXCHANGE_RATES (静态 0.128/20.0) vs fx.ts 实时 | 同页可能两种汇率价 | 统一走 fx.ts 实时缓存 |
| P1-1 | HK shippingZone=local 按香港本地顺丰价，但工厂在深圳 | shipping.ts local zone | 深圳→香港跨境段运费被低估 ~HK$20-40/单 | HK zone 改 china_mainland→HK 跨境价或加 baseFee |
| P1-2 | QuoteCalculator（线上唯一在用）与 quote-engine/price-tables 完全脱钩 | components/quote/QuoteCalculator.tsx | 展示价无成本/运费/税依据 | 接 price-tables 查表 → fallback 现逻辑 |
| P1-3 | flyers 1000 张档 HK$385 (modeled) 疑似低于专版成本（copycat 专版 $950） | price-tables/flyers.json | 定价信号错乱（太便宜反而不信任）或亏本 | 校准专版成本：开机费+纸墨+人工 |
| P1-4 | JPY 结算 flag NEXT_PUBLIC_JA_FORCE_JPY 默认关 | pricing.ts:66 | ja 用户可能看不到日元价 | 确认 flag 在 CF 环境变量开启 |
| P2-1 | price-tables ~半数格子 src: modeled/pending 未校准 | price-tables/*.json | README 红线：未校准不得对客展示 | intuan 登录询价 + e-print 完整价表 |
| P2-2 | 名片公式/计算器与 §11 禁区冲突 | formulas/business-cards.ts 等 | 引擎以禁区品类为主 | per-market 架构里去留决策（建议保留引擎作内部成本核算，不对客展示） |

---

## 5. 目标架构（落点）

```
src/data/price-tables/<category>.json   ← HKD 成本锚 (intuan×1.3 / e-print×0.90-0.95)
        ↓
src/lib/quote-engine/market-pricing.ts  ← 新建：HKD 成本 → 市场落地价
  = cost × 1/(1-margin) + shipping(zone, weight) + paymentFee + fxBuffer
  → 按 taxType 输出 含税/税前 本币价
  → 价格取整规则 (US: $X9 / JP: ¥X,800 / HK: $XX8)
        ↓
QuoteCalculator (产品页)  ← 先查 price-tables+market-pricing，fallback 现展示价
QuoteForm (contact 页)    ← 提交带 marketCode + 计算明细存 Supabase quotes 表
```

修复顺序：P0-1（透传 bug）→ P0-3（汇率统一）→ P0-2（免邮口径拍板）→ P1-2（接线）→ P1-3/P2-1（校准）

---

## 6. 运营策略建议（三市场分工）

| 市场 | 主推品类 | 理由 | 定价姿势 |
|---|---|---|---|
| **en (US)** | 贴纸、包装彩盒、纸袋 | 轻/中货 + 高锚点 + 45% 毛利 + Free Shipping $99+ 可消化 | 包邮价打包，$X9 结尾 |
| **ja (JP)** | 贴纸、小ロット精品、ポチ袋、展会物料 | ラクスル锚点中低 → 只打高附加值小批量；重货不推 | 含税展示，¥X,800 整数 |
| **zh-hk (HK)** | 专版单张、画册、急单、利是封 | e-print 拼版价打不过 → 打专版品质/急单/校园 B2B | HKD 透明价 + 顺丰到付/满 $500 免运 |

**PayPal 决策**：en 站主通道改 Airwallex（4.4%），PayPal 保留但价格 +3.5% surcharge 或仅 ≥$200 订单开放（user 已确认 PayPal 手续费过高）。

---

*下一步：按 §5 修复顺序实施 P0 三项（透传 bug + 汇率统一 + 免邮口径），然后 market-pricing.ts。*
