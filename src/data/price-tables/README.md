# price-tables/ — 真实价格表 (v1, 2026-07-17)

> **策略来源**: user 2026-07-17 拍板 — 盒子/手提袋 = intuan.com 专版报价 × 1.3;画册 = e-print × 0.90;宣传单张 = e-print × 0.95 (拼版标准规格不硬拼);锚币种 = **HKD**。
> **状态**: v1 = 锚点 + 建模估算。**所有 `"src": "modeled"/"pending"` 的格子必须校准后才允许对客展示。**

## 文件

| 文件 | 品类 | 策略 |
|---|---|---|
| `flyers.json` | 宣传单张 | e-print × 0.95;100-300 张数码甜点区不跟拼版 |
| `paper-bags.json` | 手提袋/纸袋 | intuan 专版 × 1.3 |
| `packaging.json` | 包装盒 | intuan 专版 × 1.3 |
| `books.json` | 画册/书刊/校簿 | e-print 书刊 × 0.90;校园车道 |

## 校准 SOP (每月 1 号 cron 跑 / 首次上线前必跑)

1. **intuan 校准** (盒子/袋子): 登录 intuan.com 账号 → 专版报价器 → 按各 JSON 里 `config` 的标准配置询价,数量档 500/1000/2000/3000/5000 → 记录 × 1.3 × 1.09 (RMB→HKD) → 更新 tiers,`src` 改 `"anchor"`。每次约 30 分钟。
2. **e-print 校准** (单张/画册): e-print.com.hk 对应产品页抓完整价表 → × 0.95 (单张) / × 0.90 (画册) → 更新。
3. **漂移告警**: 任一档位变动 > 10% → 升级 user,不静默改价。

## 集成计划 (Phase 2,前端)

- `QuoteCalculator.tsx` 当前走 `pricing.ts calculateQuote()` 通用公式 → 改造为: 先查 `price-tables/<category>.json` 精确档 (线性插值中间档),查不到才 fallback 公式。
- 报价结果显示 **数量跳水表** (5 档数量×单价,当前档高亮) + 工艺逐项 "+HK$X" + 一键发 WhatsApp 报价单。
- en/ja 价: HKD 表 × 实时汇率 + 国际运费包 (现有 `quote-engine/shipping.ts` + `fx.ts`),保持独立定价文件 `INDEPENDENT_PRICES` 同步刷新。

## 红线

- ❌ 未校准 (`src≠anchor`) 的格子不得对客展示 — 先内部用,客户询价走 WhatsApp 人工报。
- ❌ 改价不走 git 直接改线上 — 价格表走 PR + 校准记录。
- ❌ 名片 (business-cards) 不出现在任何价格表 (§11 禁区,2026-07-17 user 再确认)。
