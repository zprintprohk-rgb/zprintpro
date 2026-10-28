# GMC 顾客评价两集成 vs 我方方案 A — 对比评估与路线建议（2026-10-29）

> 角色: 首席 SEO/AEO/GEO 数据战略参谋 · 依据: 三战略文件优先级 + K3 四张 GMC/GSC 截图 + 10-28 夜间执行链
> 数据来源: GMC 截图 ×4（merchant_id 5813755895）· 本站探针（/api/reviews=404 pre-migration）· `src/data/product-reviews.ts` 头部 K3 8-04 裁决 · K3-8 拍板（10-27）

## 一、截图证据层（GSC/GMC 现状）

| 证据 | 内容 |
|---|---|
| GMC 评价页 | ⚠️「Google 顾客评价已超过 30 天没有向顾客显示『选择参与』通知」；选择订阅调查用户数 = **无数据** |
| GMC 商品 → 需要注意 | **79 商品（33.9%）未获批准**，全部 = 「用户无法完成购买交易」（燙金貼紙/A2海報/防水貼紙/線圈筆記本/大號利是封…多个高点击潜力） |
| 设置和政策问题 | **人工检查发现**：① 网店缺少有效的「购买」按钮 ② 商品页无法正常加载或跳转首页 ③ 不销售广告中宣传的商品——在香港导致 79 件商品无法展示 |
| 附带 | 未关联任何 Google Ads 账号（= 无 Shopping ads 在投，仅 Free listings） |

**根因链**：业务模式 = WhatsApp 询盘/线下订单（K3-8 拍板「线下处理，不是在线交易」）→ **无站内 checkout** → Google Shopping 结账要求**结构性不满足** → 79 商品抑制。这与 feed 数据质量**无关**（feed 真值/跨语 ID 已修，re-crawl 会吸收），是政策层结构问题，人工审查会**周期性复发**。

## 二、三方案 + 结构性选项对比

| 维度 | GMC ①选择参与模块 | GMC ②徽章 | 我方案 A（A1 已上线） | 结构性 C：最小 checkout |
|---|---|---|---|---|
| 前置要求 | 订单确认页 + **真实订单数据**（order_id/email/country/date） | 存在 seller rating | 无（009 SQL apply 即活） | 支付页（Airwallex lib 已在 `src/lib/airwallex.ts`） |
| 现状适配 | ❌ **无在线下单 = 无真实数据源**；占位数据 = 政策违规 + §0.23 编造双红线 | ❌ seller rating = 0 条 → 徽章显示「没有可显示的评分」 | ✅ 零依赖 checkout | ⚠️ 需新建功能区 + 修订 K3-8 doctrine |
| 政策风险 | **高**——站点已被人工审查标记「缺少购买按钮」，再部署订单确认类组件 = 加重 circumvent 嫌疑 | 无（但无意义） | 无 | 低（合规建成即达标） |
| 评分产出 | Google **seller** reviews（卖家级） | 同左展示 | 第一方**产品**评价 → PDP aggregateRating（≥3 条）→ 产品星级富结果 | 解锁 ①+② 全部能力 |
| 解锁 GMC 79 抑制 | ❌ | ❌ | ❌ | ✅ **唯一同时解两题的路径** |
| 结论 | **不建**（结构性不适用） | **不挂**（等真实 seller rating） | **唯一可执行评分路径** | **业务级决策（K3）** |

**关键认知**：GMC 的 seller reviews 与我方 Plan A 的 product reviews 是**两条正交体系**——Plan A 不依赖、也不替代 Customer Reviews；Google 搜索中的产品星级主要吃 **PDP 页 product schema 的真实 aggregateRating**（Plan A 产出），seller 星级吃 Customer Reviews（被 checkout 阻断）。

## 三、推荐路线（按优先级）

1. **短期（本周）**：① 009 SQL apply 最优先（代理/热点解决 supabase.co 访问后重跑 v2 SQL，2 分钟）→ Plan A 全链激活；② GMC **维持现状**——154 个批准商品继续免费展示，79 抑制接受（无可修项），观察 feed 修复后的 re-crawl（ID 前缀 + 真值已上）；③ **opt-in 模块与徽章均不集成**（红线见上表）
2. **中期（K3 拍板）**：**GMC 路线三选一**：
   - **A 维持**：接受结构性抑制 + 人工审查周期复发，零成本保留 Free listings 曝光
   - **B 减范围/暂停 HK 目的地**：政策噪音清零，代价 = 放弃全部免费展示曝光（建议仅当账号健康恶化触发）
   - **C 建最小 checkout**：根治 79 抑制 + 解锁 Customer Reviews + 顺带修订 K3-8（在线交易与线下并行，监控口径不变）——工作量 = 新功能区 2-3 批 + 支付合规，**业务级决策**
3. **风险监控**：GMC 人工审查为周期性——若出现账号级 suspend 警告，立即触发 B 止损并升级 K3

## 四、与我方 A 方案的衔接

- A1 已 fail-closed 上线（`dc5e625f`），009 apply 后表单即时显现，真实提交 → 审核台（Supabase Studio）→ approved → 前台 + （≥3 条后）星级 schema
- K3 昨夜卡点 = 深圳 → `*.supabase.co` 不通（本机实测 fetch failed，平台状态正常）→ 解法 = 代理规则补 supabase 域 / 全局模式 / 手机热点，SQL v2 已备
- A2 候选（评价进 HTML ISR + 站内审核页）维持待拍板
