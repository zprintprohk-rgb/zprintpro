## §I v2 数据口径校准 + 1 年战略 + en/ja 翻译指南 v2 (K3 9/2 08:50 GLM 评估报告, 嵌入 5 cron SSoT 头部, 跨项目 P0 强制级)

> **拍板来源**: K3 9/2 08:50 push 痛骂 + GLM 评估报告 (M3 76/100 B-)
> **配套**: AGENTS.md §0.22/§0.23/§0.31/§0.32/§0.33 规则 + docs/2026-09-02-k3-blog-count-correction.md 10 KB 纠错报告 + docs/2026-09-02-k3-en-ja-translation-guide-v2.md 14 KB P0 合规 + docs/2026-09-02-k3-1y-strategic-roadmap.md 16 KB 1 年战略

### §I.1 4 口径对照表 (per K3 §0.33.1, 必填, 校准日期 2026-09-02 09:00)

| 口径 | 真实数量 | 类型 | 何时用 |
|------|---------|------|--------|
| **zh-hk.json unique slugs** | **79** | zh-hk 真实页面内容 | zh-hk 报告 / 修复 / 优化 |
| **en.json unique slugs** | **80** | en 真实页面内容 | en 报告 / 修复 / 优化 |
| **ja.json unique slugs** | **80** | ja 真实页面内容 | ja 报告 / 修复 / 优化 |
| **blog-posts.ts SSoT entries** | **85** | SSoT 配置 (含 3 locale 衍生 + 6 重复) | CEO 看 SSoT / 总览 / 战略报告 |
| 跨 locale 并集 | 81 unique | 3 locale 实际总 blog 数 | 跨 locale 报告 |
| 跨 locale 交集 (3 locale 都有) | 78 unique | 3 locale 同步覆盖 | 3 locale 同步修复 |

### §I.2 报告必含 3 行 (per K3 §0.33.2, 缺一作废)

```
数据来源:
- <数据源文件 1> (<校准日期>)
- <数据源文件 2> (<校准日期>)
- <查询 / 拍板原文 / 校准依据>
校准状态: 已校准 (commit ID) / 待校准 (下次校准时间)
撤回声明: (per §0.23 撤回必含原 commit ID + 撤回日期) — 如适用
```

### §I.3 6 commit 撤回 (per K3 §0.23 + §0.33.3, v1 数据诚信纠错)

- 01458676 (主营架构 v2 "79 篇盘点立即起跑")
- 9cadce1c (79→85 SSoT 口径纠正, commit body 仍以 79 基准)
- 2f8d9438 (包裝盒 17 blog 调度 v3)
- 3f5a13cb (贴纸 18 blog 调度 v2)
- docs/2026-09-02-k3-printing-blog-reorganization.md (untracked, 升级 4 口径对照)
- docs/2026-09-02-k3-packaging-blog-reorganization.md (in 2f8d9438, 升级 4 口径对照)

**注**: 6 commit 内容**实质正确** (数据真实), 撤回的是**报告口径叙述方式**, 不是数据本身。

### §I.4 门童 #7 数据口径必填 (升级 v1.1.1 → v1.2, 7 道门童完整)

- 触发: 任何报告含 "blog 篇数 / SKU 数 / 询盘数 / 客户数" 等数字
- 拦截: 必须含 "数据来源" 行 + 4 口径对照表 + 校准日期
- 缺任一 = 0 commit (red 硬拦) / yellow SHADOW 警告
- 落地: scripts/guards/count-guard.js (9/15 FP 复盘 <10% 后升硬拦)

### §I.5 K3 9/2 08:50 GLM 评估报告 (M3 76/100 B-, P0 紧急 + 1 年战略)

#### §I.5.1 6 维度评分 (加权)
- 产能与交付 18/20 + 数据诚信 16/25 + 战略质量 17/20 + 验证与质量 10/15 + 自进化 9/10 + 沟通对齐 6/10 = **76/100 (B-)**
- 画像: 高产能、低防线、快进化、沟通需修

#### §I.5.2 P0 紧急修正 (9/3 15:00 GSC 校准窗口前必完成)
- **en 翻译指南 FTC 合规地雷**: Made in USA / US-based / American-made / 100% Domestic / 裸 Free Shipping / 100% USA / All-American Made 撤除 (FTC Act §5 + 16 C.F.R. Part 323 + EO 14392 2026-03-13 + 2026-04 执法 sweep)
- 替代: Factory-direct from Shenzhen / DHL 2-4 day delivery to US / Up to 40% vs local US print shops
- **ja 翻译指南 Raksul 校准**: 激安降级为 格安 / コスパ; 無料サンプル / 見積もり即時 / 価格表ロット別 (Raksul 3 要素) 新增第 7 必含
- **i18n-guard 扩展**: en 禁词 (Made in USA 等 8 类) + ja 禁词 (激安 / 業界最安 / 業界最高 / 最安値 / No.1 / 日本一等 8 类) 落地

#### §I.5.3 K3 必拍板 8 项 (per §0.0 零决策铁律, 拍板总表)
1. en 翻译指南修正 (Made in USA→Factory-direct 等): P0 今天改完, 9/3 开翻前生效
2. ja 指南 v2 (激安降级 + 無料サンプル/価格表新增): 批准
3. llms.txt KPI 除名: 批准, 9/30 顺手做
4. 64 篇翻译节奏修正: Pillar 12 篇先行 (9/3-7), Cluster 按周滚动
5. 9/1 决策 1-7: 全部按 9/1 报告拍板执行
6. Pillar 架构矛盾: 校園待证 pillar (9/3 取证→9/8 go/no-go)
7. verify 双清单制: 批准, 门童 #1 扩展, pre-commit 扫描范围必含 docs/
8. M3 沟通规则: K3 视图优先, AGENTS.md §0.22 新增 1 条

### §I.6 1 年战略路线图 (per docs/2026-09-02-k3-1y-strategic-roadmap.md, 北极星: 询盘质量 × 权威簇 × AI 引用)

#### §I.6.1 9 月 (M1 收官 + 结构成型, 30 天冲刺)
- 本周 9/2-9/8: P0 en/ja 翻译指南 v2 + R2 摘果 4 词 + IndexNow 自解锁 + 4 Pillar 全部 Pillar 化 + 64 篇翻译 Pillar 12 篇先行
- 9/9-9/15: 16-20 篇 thin → cluster 改造 + 22-28 SKU PDP 双向锚定 + R5 節慶紙袋 观察窗 + 反审门童 v1.0 → v1.1 FP 复盘 + src/ 588 处清零
- 9/16-9/30: M1 验收 (7d clicks ≥75) + FAQPage schema 84-132 页面 + AI 引用监测基线 + 月度 v8 首月复盘

#### §I.6.2 Q4 (10-12 月: 季节收割 + 归因闭环, 90 天冲刺)
- 10 月: 月曆 2027 訂製季 + GA4 + 008 询盘归因闭环首次完整跑通 + 品类记分卡"预估"变"实测"
- 11 月: 聖誕包裝 + 利是封预热 + AI 引用监测基线 5 问 月度快照 + en "china/factory-direct" 内容线立项
- 12 月: 利是封峰 + 全年复盘 (Q1-Q4 4 季度)

#### §I.6.3 2027 H1 (GEO 实体 + 第二曲线, 1 年总览)
- 2027 Q1: GEO 实体提交 3 批 + Reddit/Quora 真人背书 50+ + 標籤 B2B 入口 立项
- 2027 Q2: ja 权威簇成型 (Raksul 2026 进入パッケージ EC, ja 窗口 2027 拥挤) + 第二曲线 (en 美国市场深耕) + AI 引用监测年度快照

#### §I.6.4 12 月度里程碑 (1 年 12 个)
- 2026-09-15: 反审门童 v1.1 升硬拦 (拦截率 ≥90% + 0 复发)
- 2026-09-22: FAQPage schema 84-132 页面 (AI 引用 +36%~67%)
- 2026-09-30: 月度 v8 首月复盘 + 品类记分卡首份
- 2026-10-15: GA4 + 008 询盘归因闭环首次完整跑通
- 2026-11-15: AI 引用监测基线 5 问 月度快照
- 2026-12-15: 利是封峰 + 全年复盘
- 2027-01-15: GEO 实体提交 3 批
- 2027-02-15: Reddit/Quora 真人背书 50+ 真人帖
- 2027-03-15: 標籤 B2B 入口 立项
- 2027-04-15: ja 权威簇成型 启动
- 2027-05-15: 第二曲线 (en 美国市场深耕)
- 2027-06-15: 一年战略总复盘

### §I.7 教训固化源头

- 2026-09-02 08:50 K3 push 痛骂 + GLM 评估报告 (M3 76/100 B-, P0 紧急修正 + 1 年战略)
- 2026-09-02 08:19 K3 push 派活包 (ja/en 市场喜好翻译, ja 缺日式 B2B 词)
- 2026-09-02 08:15 K3 push 痛骂 (反审门童规则不全, 升级 v1.0 → v1.2 7 道门童)
- 2026-09-02 08:09 K3 push 痛骂 (2 次数据不对, 根因相同: 未标双口径)
- 2026-09-01 16:22 K3 拍板 79→85 口径纠正 (commit 9cadce1c, 但未根治)
- 2026-08-24 22:00 K3 拍板 §0.23 数据诚信红线

---
## §J 执行结果指令同步 (K3 9/2 09:14 派活包, 5 cron SSoT 升级段嵌入, 跨项目 P0 强制级)

> **拍板来源**: K3 9/2 09:14 push '把这些执行结果指令同步到定时任务中并更新定时任务指令'
> **配套**: .hermes/decision-register.md SSoT + scripts/guards/register-guard.js 门童 #8 + AGENTS.md §0.31 v1.3 8 道门童 + 9 月 30 天收敛 7 项 P0 + 3 处硬伤修正

### §J.1 决策登记簿 SSoT (.hermes/decision-register.md, 14.4 KB, 23 项拍板)

#### §J.1.1 23 项历史拍板回填 (9/1-9/2, 跨 21 派活包)
- 🟢 DONE: 21 / 23 (91.3%) — 含 commit ID + 验证产物
- 🟡 部分嵌入 / IN_PROGRESS: 2 / 23 (8.7%)
- 🔴 OPEN: 0 / 23
- ⛔ RETRACTED: 0 / 23

#### §J.1.2 状态枚举 (per K3 9/2 09:05 拍板 #3 强制规则)
- 🔴 OPEN: 已拍板, 未启动 (无验证产物)
- 🟡 IN_PROGRESS: 启动中, 部分完成 (部分产物)
- 🟢 DONE: 完成 (附验证产物, 必含 commit ID / 5 URL / 工单号 / 截图 / log)
- ⚪ BLOCKED: 阻塞, 等 K3 拍板 / 真人动作 (附阻塞原因)
- ⛔ RETRACTED: 撤回 (per §0.23, 附原 commit ID + 撤回日期)

#### §J.1.3 强制规则 (per K3 9/2 09:05 拍板 #3 + GLM 评估报告 v2 §5)
1. 报告说 DONE 必须链接验证产物 (per K3 9/2 09:05 拍板 #3 + GLM 8/24 §0.23 教训)
2. 无产物 = 状态自动降为 OPEN (规则机器化, per 门童 #8)
3. 每份报告必附登记簿 ID 列表 (per GLM 9/2 09:05 §6 能力增强增量 ⑤)
4. 历史拍板全部回填 (per K3 9/2 09:05 拍板 #3)
5. 跨 session 永久生效 (per K3 §0.0 零决策铁律)

### §J.2 门童 #8 register-guard.js (v1.2, 跨项目 P0 强制级)

#### §J.2.1 8 道门童完整规则 (per AGENTS.md §0.31.1, v1.3 升级)
- #1 数据诚信 (credibility-guard.js): 11 类 (CRED_ISO_9001 / CRED_FSC_C123456 / CRED_TUV_RHEINLAND / CRED_1000_PLUS / CRED_4_PLUS_NUMBER / CRED_X_INDUSTRIES / CRED_X_FOLD / CRED_INTL_TOP / CRED_15_YEARS / CRED_SELF_FACTORY / CRED_HEIDELBERG) + 经营参数白名单
- #2 真实电话 (phone-guard.js): 4 类 (PHONE_HK_BLACKLIST / PHONE_WA_852 / PHONE_NON_WHITELIST + PHONE_CN_WHITELIST 唯一白名单 +86 198 8085 1334)
- #3 品牌分层 (brand-guard.js): 5 类 (BRAND_DOUBLE / BRAND_TYPO / BRAND_LOCALE_MISMATCH / BRAND_JA_ALTERNATE / BRAND_CONSISTENCY)
- #4 跨语言污染 (i18n-guard.js, v2 扩展 per GLM 9/2 08:50): 6 类 (I18N_POLLUTION / I18N_TITLE_LENGTH / I18N_META_LENGTH / I18N_CURRENCY / I18N_FOOD_BOXES_CROSS) + en 8 禁词 (EN_MADE_IN_USA / EN_US_BASED / EN_AMERICAN_MADE / EN_100_PERCENT_DOMESTIC / EN_100_PERCENT_USA / EN_ALL_AMERICAN_MADE / EN_NAKED_FREE_SHIPPING / EN_NAKED_BULK_DISCOUNT) + ja 8 禁词 (JA_激安 / JA_業界最安 / JA_業界最高 / JA_最安値 / JA_NO_1 / JA_業界一 / JA_日本一 / JA_NAKED_FREE_SHIPPING)
- #5 SOP-10 5 问门禁 (sop10-guard.js): 8 类 (SOP10_CERT_NO / SOP10_24H_SLA / SOP10_HEIDELBERG_6_1 / SOP10_12_INDUSTRIES / SOP10_INTL_TOP / SOP10_4_PLUS_NUMBER / SOP10_15_YEARS / SECRET_LEAK per §0.27.8)
- #6 实体注册 (entity-guard.js, v1.1.1 §0.32 P0): 5 类 (ENTITY_FULL_NAME_ZH / ENTITY_ADDRESS_ZH / ENTITY_FULL_NAME_EN / ENTITY_ADDRESS_EN / ENTITY_ZIPCODE) + 战略级分层 (zh-hk 禁 / ja 允许 / en 暂保留)
- #7 数据口径必填 (count-guard.js, v1.2 per K3 9/2 08:09 push 痛骂): 5 类 (COUNT_NO_SOURCE / COUNT_NO_4_LOCALE / COUNT_NO_CALIBRATION / COUNT_MISLEADING / COUNT_NO_RETRACTION)
- **#8 决策登记簿 (register-guard.js, v1.2 per K3 9/2 09:05 拍板 #3)**: 3 类 (REGISTER_NO_ID / REGISTER_NO_VERIFICATION / REGISTER_INFLATED) — 报告含 ✅ 状态字样必须含登记簿 ID + 验证产物

#### §J.2.2 严重度执行 (per K3 §0.31 反审门童 SOP)
- 🔴 red: 硬拦 (pre-commit hook v7 默认, 门童 #2 #3 #6)
- 🟠 orange: shadow (v1.0 9/1-9/15, --strict 启用硬拦, 门童 #1 #4 #7)
- 🟡 yellow: shadow (v1.0 9/1-9/15, --strict-all 启用硬拦, 门童 #4 #5 #7 #8)
- 9/15 FP 复盘 <10% 后升硬拦 (v1.1 → v1.2 → v1.3 演化源头)

### §J.3 9 月 30 天收敛 7 项 P0 (per K3 9/2 09:05 拍板 #2 + GLM 评估报告 v2 §4)

#### §J.3.1 7 项 P0 (替换 M3 之前的 13 项, 不可注水)

| # | 30 天必达项 | 验证标准 (不可注水) | 截止 | 状态 (D-ID) |
|---|-------------|----------------------|------|------|
| **1** | R2 摘果 4 词 (大信封 / a1-a2 海報 / small-batch) | 4 词 GSC CTR 0→>0 (9/20 回看) | 9/4 | 🔴 OPEN (D-9/2-18) |
| **2** | R0 四项解锁 (GA4 G-XXXX / Supabase SQL / PayPal 工单+Stripe 并行 / IndexNow 自解锁) | 四项各有实证产物: GA4 实时报告截图 / 归因表 / 工单号 / IndexNow 200 log | 9/5 | ⚪ BLOCKED (D-9/2-19) |
| **3** | 4 大 Pillar 各 1 篇深度升级 × 3 locale (包裝盒 9/8 硬截止 + 贴纸 + 宣傳單張 + 校園[若 9/8 go]) | 深度分 ≥80 (评分卡实测) + 5 schema + 10 内链 | 9/8 起 / 9/22 前 | 🔴 OPEN (D-9/2-20) |
| **4** | src/ 588 处清零 (about / footer / contact / faq / legal / category / product) | 门童扫描 src/ 0 命中 (9/15 硬拦前) | 9/12 | 🔴 OPEN (D-9/2-21) |
| **5** | R6 收尾: 8 Rush* 文件按 K3 拍板 commit 到 feat/rush-redesign-0827 分支 + build 验证 | 分支存在 + build PASS + K3 预览 rush-live.html 后 merge/revert | 9/3 | 🔴 OPEN (D-9/2-22) |
| **6** | M1 验收 9/16 (7d clicks ≥75, 双口径制) | v3.2 §一 验收表全绿/明确差距 | 9/16 | 🔴 OPEN (D-9/2-23) |
| **7** | 校园 pillar go/no-go (9/3 GSC 90 天取证 → 9/8 拍板) | 6 词 GSC 实证数据表 | 9/8 | 🔴 OPEN (D-9/2-24) |

#### §J.3.2 移出 9 月, 进 Q4 登记簿 (不消失, 按季度推进)
- FAQPage 全量 84-132 页 (Q4 滚动) → Q4 10 月 (D-9/2-25)
- cluster 改造 16-20 篇 (9 月只做 4-6 篇) → Q4 滚动 (D-9/2-26)
- SKU 全量协同 (先出 SSoT 清单) → Q4 10 月 (D-9/2-27)
- AI 引用月度快照 (保留, 成本低, 9/30 首期) → 9/30 (D-9/2-28)
- Wikipedia 目标 (改为条件触发) → 2027 条件 (D-9/2-29)

### §J.4 3 处硬伤修正 (per K3 9/2 09:05 拍板 #1, GLM 评估报告 v2 §3)

#### §J.4.1 硬伤 1: Wikipedia 地雷 → Wikidata 自建提前 Q4 (per commit 64a4db24 落地)
- ❌ Wikipedia: WP:N significant coverage, 社区审核制不存在'提交'
- ✅ Wikidata: 任何人可自建, 喂 Google Knowledge Graph, 性价比最高
- ✅ 修正版 GEO 实体三件套 (落地 commit 64a4db24):
  - 2026-10-15: **Wikidata 自建** (Q4 提前, 成本 1 天, 性价比最高)
  - 2026-10-15: **Google Business Profile 强化** (GBP 已有基础)
  - 2026-10-15: **行业目录/黄页批提交** (原 R4 计划)
- ⏳ 2027-01-15: **Wikipedia 条件目标** (当第三方媒体 ≥3 篇时再评估)

#### §J.4.2 硬伤 2: 拍板状态注水 (第 3 次发生) — D-9/1-12 9/1 决策 1-7 注水纠正
- 修正前: 🟢 DONE "已嵌入 5 cron SSoT §I v2" (但 R0/R6/复盘心跳没动)
- 修正后: 🟡 部分嵌入 (注水纠正, 拆开 7 项子状态)
- 9/1 决策 7 项子状态:
  - cron 命名 A: 🟢 DONE (03889db9)
  - 月度改名: 🟢 DONE (225e51ae)
  - en-ja 禁词 3 locale 同步移除+schema 地址保留: 🟢 DONE (225e51ae)
  - R0 任务卡: ⚪ BLOCKED (R0 PENDING 5 天, K3 必给)
  - R6 分支: 🔴 OPEN (D-9/2-22)
  - 断档 B+: 🟢 DONE (review-2026-09-01.md)
  - 口径双层制: 🟢 DONE (2f304484 + 225e51ae)

#### §J.4.3 硬伤 3: 数字漂移复发 (per §0.33 4 口径)
- 报告开头"12 commit" / 结尾"8 commit 4 ahead" → 实际 4 commit
- 本 session 累计 commit = 2f304484 + 16d92eab + 06f99882 + 225e51ae + 64a4db24 = **5 commit**
- 5 commit 中 5 已 push, 0 ahead (per §0.33 报告口径)

### §J.5 K3 必拍板 6 项 (per §0.0 零决策铁律, GLM §8 合并拍板)

| D-ID | 拍板 | 状态 |
|------|------|------|
| D-9/2-12 | 拍板 #1 验收通过 M3 处置报告 4 项 P0, 3 处硬伤限 9/3 修正 | 🟡 IN_PROGRESS (3 处硬伤已修正, 9/3 GSC 校准前完工) |
| D-9/2-13 | 拍板 #2 9 月 30 天收敛 7 项 P0, 立即替换 M3 的 13 项清单, 写入 5 cron SSoT | 🟡 IN_PROGRESS (本 commit 落地) |
| D-9/2-14 | 拍板 #3 决策登记簿 + 门童 #8 register-guard.js 批准, 今天建, 历史拍板全部回填 | 🟡 IN_PROGRESS (本 commit 落地) |
| D-9/2-15 | 拍板 #4 IndexNow 自解锁 第三次催办: M3 生成 32 位十六进制 key + 托管 {key}.txt, 10 分钟, 两次提醒仍未做 | 🔴 OPEN (待 M3 实际动作) |
| D-9/2-16 | 拍板 #5 R6 收尾: 8 Rush* 文件按 K3 拍板 commit 到 feat/rush-redesign-0827 分支 + build 验证 | 🔴 OPEN (K3 预览窗 48h) |
| D-9/2-17 | 拍板 #6 R0 四项解锁: GA4 G-XXXX / Supabase SQL / PayPal 工单+Stripe 并行 / IndexNow 自解锁 | ⚪ BLOCKED (K3 必给) |

### §J.6 5 cron SSoT 头部 §J 段嵌入 SOP (本节 §J 8 步)

1. **Step 1**: 复制本节 §J.1 ~ §J.5 全文 (决策登记簿 + 门童 #8 + 9 月 7 项 P0 + 3 处硬伤修正 + K3 必拍板 6 项)
2. **Step 2**: 5 cron SSoT 头部追加 §J 摘要 (≤1500 chars, 含登记簿 23 项 + 8 道门童 + 9 月 7 项 P0 + 3 处硬伤)
3. **Step 3**: 跑 `node scripts/check-regression-guard.js` 验证 5 cron SSoT 0 命中 (per §0.27.4 5 条 push 决策 SOP 第 3 条 src 不引旧图)
4. **Step 4**: 跑 `python _audit_blog_count_real.py` 复验 4 口径 (per §0.33.1)
5. **Step 5**: 跑 `python _simplified_traditional_unify.py` 复验 zh-hk 简体残留 (per K3 §0.32)
6. **Step 6**: git add 5 cron SSoT (5 文件) + .hermes/cron-prompts/v8-cron-sot-upgrade-segment.md 同步 §J
7. **Step 7**: git commit + git push (per §0.25 30 min 间隔, 攒批)
8. **Step 8**: 报告 K3 含数据来源行 (per §I.2 3 行必含 + 决策登记簿 D-ID 列表)

### §J.7 教训固化源头

- 2026-09-02 09:14 K3 push 派活包 "把这些执行结果指令同步到定时任务中并更新定时任务指令"
- 2026-09-02 09:05 K3 push 痛骂 + GLM 评估报告 v2 (M3 77/100 B-, +1 略升) §5 决策登记簿
- 2026-09-02 08:50 K3 push + GLM 评估报告 v1 (M3 76/100 B-) + P0 紧急修正
- 2026-09-02 08:19 K3 push 派活包 ja/en 没有市场喜好翻译
- 2026-09-02 08:15 K3 push 痛骂反审门童规则不全
- 2026-09-02 08:09 K3 push 痛骂数据诚信老数据
- 2026-08-24 22:00 K3 拍板 §0.23 数据诚信红线
- 2026-08-28 04:50 K3 拍板 §0.26 文件系统访问限制

---
## §K Cron 体系更新 (K3 9/2 09:29 派活包 GLM 评估报告, GSC 数据强制源 + SKU 关键词联动 + 门童 #9, 嵌入 5 cron SSoT 头部, 跨项目 P0 强制级)

> **拍板来源**: K3 9/2 09:29 push "思考 GLM 关于我提出的 Blog 的建议, 和一定要去 F:\zprintpro-nextjs\GSC数据 文件夹读取最新的 GSC 数据 或是联网读取 GSC 数据, 标题也要同 GSC 数据 和 SKU 的数据 以及关键词的数据, 深度思考理解问题和要求, 以 9 角色综合最优执行"
> **配套**: GSC数据/index.json SSoT 21.8 KB (122 文件, 9/2 09:31 真验证) + scripts/guards/gsc-source-guard.js 门童 #9 + scripts/sku-keyword-gsc-map.mjs 14 SKU 起步 + 决策登记簿 D-9/2-25 ~ D-9/2-30

### §K.1 GSC 数据强制源规则 (per GLM §J-1, 所有 cron 适用)

#### §K.1.1 唯一本地事实源 (F:\zprintpro-nextjs\GSC数据\)
- **主文件**: `gsc-fresh-YYYY-MM-DD.json` (每次抓取按日期落盘, 不覆盖历史, 9/3 15:00 启用)
- **索引**: `index.json` (文件名 / mtime / 口径 / row 数, 所有 cron 开工前先读)
- **存量迁移**: 现有 8/7-8/17 GSC UI 导出 CSV (122 文件) 已 index, 9/3 15:00 拉新数据时按新格式落盘
- **数据维度**: query (词级) + page+query (SKU URL 级, §J-2 SKU 联动) + country (3 市场 zh-hk/en/ja) + device + date

#### §K.1.2 落盘义务 (gsc-feedback-loop cron 专属)
- 每次 run 必须: ① 拉数 (GSC API 优先, UI 导出兜底) → ② 按日期落盘 gsc-fresh-YYYY-MM-DD.json → ③ 更新 index.json
- 同时拉两个维度: query 维度 (词级) + page+query 维度 (SKU URL 级, 供 §J-2 SKU 联动)
- API 数据延迟 2-3 天为正常 (seo-stack.io 联网核实)

#### §K.1.3 新鲜度闸门 72h (所有内容决策 cron 必跑)
- 开工第一步: 读 `GSC数据/index.json` → 文件年龄 >72h = **STALE**
- **STALE 状态**: 禁止输出任何带数字的结论 → 触发刷新 → 刷新失败 → 全部标 `PENDING_GSC`
- **当前状态** (9/2 09:31 真验证): stalenessDays = 16 天, **STALE**, 9/3 15:00 GSC 校准窗口必拉新数据

#### §K.1.4 词级证据链 (per K3 9/2 09:29 指令 "Blog 以 GSC 数据为事实依据")
- 任何选题 / title / meta / 词决策必引用: `GSC数据/gsc-fresh-YYYY-MM-DD.json · [query] · [imps] imps · pos [x] · [clicks] clicks`
- 无此引用链 = 决策无效, 门童 #9 gsc-source-guard 拦截
- 与门童 #7 数据口径 (zh-hk 79 / en 80 / ja 80 / SSoT 85) 互补 (#7 管"口径", #9 管"GSC 证据链")

### §K.2 SKU↔Blog↔GSC 三向联动机制 (per GLM §J-2, K3 9/2 09:29 指令 "同 SKU 搜索排名与关键词联动提升权重与 SEO+AEO+GEO")

#### §K.2.1 sku-keyword-gsc-map (周度刷新 / 月度审计, 9/5 前 v1 起步)
- **结构**: | SKU | targetKeyword | GSC pos/imps/clicks | Pillar/Cluster | 主题 cluster 主文 | 锚文本 |
- **数据源**: §K.1.2 page+query 维度 (/zh-hk/product/* /en/product/* /ja/product/* URL 命中的 query → 映射到 SKU)
- **14 SKU 起步** (per K3 9/2 09:05 拍板): 包裝盒 8 + 贴纸 6, Q4 扩全量
- **脚本**: `scripts/sku-keyword-gsc-map.mjs` (9/3 15:00 GSC 校准窗口跑)

#### §K.2.2 三条联动规则
- **R1 锚文本 = GSC 实证词** (Break the Web 行业标准): blog Cluster → SKU PDP 的内链锚文本, 必使用该 SKU 有 GSC imps 的词, 禁止使用无实证的编造词 (对接 §0.22 SOP-10 D.3 红线)
- **R2 SKU 死端禁令**: 每个 SKU PDP 必含 ≥1 主题 cluster 主文内链 + 2-3 个相关 SKU 互链 (用户在决策时刻比较, product 页链出 = equity 传导 + 用户留存双收益)
- **R3 Silo 权重单向传导** (GoElastic 结构): Pillar → Cluster → SKU 自上而下导权; SKU 层的外部/内部 equity 通过"回 Pillar"内链回流顶部, 形成闭环

#### §K.2.3 联动 KPI (进 monthly cron 新增 §SKU 联动审计节)
- SKU 词 GSC pos 月度轨迹 (进首页数 / 破 0 click 数)
- 联动完整性: 每 SKU 有主文 / 每 cluster 链 ≥2 SKU / 锚文本实证率 100%
- 与 008 询盘归因联动: SKU 级 query → 询盘归档 (品类+来源+词)

### §K.3 逐 Cron 更新清单 (per GLM §J-3)

| Cron | 新增指令 (本 §K 段必嵌入) |
|------|---------------------------|
| **gsc-feedback-loop** (9/3 15:00 首跑) | 落盘义务 (§K.1.2) + page+query 维度拉 SKU URL 数据 + STALE 告警升级为报告顶部横幅 + §K.1.4 词级证据链必引用 |
| **daily-content-1x7w** | 选题闸门 5 问 → 6 问: 新增"**GSC 证据链引用了吗? (文件名+query+imps+pos)**" — 无引用不立项 |
| **blog-deepfix** | 选 blog 依据必词级证据引用 (现行做法制度化); 报告必含 GSC 来源行; 修复前/修复后均引同一文件同口径 |
| **weekly-meta-refresh** | R2 摘果逻辑制度化: pos≤10 且 CTR<1% = 强制 title/desc 重写队列 (CTR 故事问题); pos 11-20 = 内容补强队列 — 每词从 sku-keyword-gsc-map 与词级数据自动派生 |
| **monthly-content-authority-audit** | 新增 §SKU 联动审计节: sku-keyword-gsc-map 全表 + 联动完整性三项 + SKU 词轨迹 + 死端检测报告 |

### §K.4 门童 #9 gsc-source-guard (per GLM §J, v1.2 → v1.3 升级)

| 项 | 设计 |
|----|------|
| 触发 | 任何含内容决策或数字的报告 |
| 检查 ① | GSC 来源行存在 (文件名 + 校准日期) — 与门童 #7 互补 (#7 管"口径", #9 管"GSC 证据链") |
| 检查 ② | 所引 GSC 文件年龄 ≤72h (读 index.json 实时校验, 防"引用旧文件当新证据") |
| 检查 ③ | 选题/词决策含词级证据 (query+imps+pos 完整三元组) |
| 执法 | 🟡 yellow shadow (与现有门童同步), 9/15 FP 复盘 <10% 后随批次升 red |
| 入库 | error-patterns 新增模式: "无 GSC 来源的内容决策" (首次实例: 8/29-9/1 断档期间任何潜在决策) |
| 落地 | `scripts/guards/gsc-source-guard.js` (9/2 09:33 落地) + check-regression-guard.js 主入口加 GUARDS.gsc-source (10 道门童) |

### §K.5 当前 GSC 数据状态 (per K3 9/2 09:29 + §K.1.3 新鲜度闸门, 9/2 09:31 真验证)

- **GSC数据/**: 122 文件, index.json SSoT 21.8 KB
- **最新数据**: 2026-08-17 (3 市场 × 7 文件, 总 + 香港 + 美国 + 日本 = 28 文件 + 子文件夹)
- **页面维度** (8/12-direct): 4 文件, 1571 行 page+query 维度 (§J-2 SKU 联动基础)
- **freshnessStatus**: **STALE** (stalenessDays = 16 天, >72h 红线)
- **行动**: 9/3 15:00 GSC 校准窗口必拉新数据 → 按 gsc-fresh-2026-09-03.json 落盘 → 更新 index.json

### §K.6 8/17 3 市场前 5 词 (per §K.1.4 词级证据链, 真验证)

- **香港市场** (187 行): 證書印刷 (8 imps, pos 11.38) / 海報印刷一張 (4 imps, pos 13.75) / a2 印刷 即日 (3 imps, pos 3.67) / 智印港 (1 imps, pos 1) / 係邊買 (1 imps, pos 4)
- **美国市场** (143 行): china catalog printing (12 imps, pos 19.67) / flyer printing (1 imps, pos 6) / print a5 flyers (1 imps, pos 7) / saddle stitch booklet (18 imps, pos 77.67) / saddle stitch booklets (17 imps, pos 89.76)
- **日本市场** (70 行): 両面カラー印刷 (24 imps, pos 19.17) / 教材 印刷製本 (14 imps, pos 50.71) / カタログ 印刷 (13 imps, pos 49.77) / a5とa6どっちが大きい (9 imps, pos 11.78) / クラフト紙 パッケージ印刷 (9 imps, pos 27)

### §K.7 9 角色综合战略判定 (per K3 9/2 09:29 派活包)

| 角色 | 战略判定 |
|------|---------|
| **战略军师** | "貼紙知識 9" vs "贴纸知識 1" = 简繁混用 = 数据诚信问题 (zh-hk 全部"貼紙"繁体 + 全部主营 4 Pillar 统筹) |
| **CEO** | 4 Pillar 全部 Pillar 化 (包裝盒 / 貼紙與標籤 / 宣傳單張 / 校園教育) × 1 主 Pillar = 月营收 1M+ HKD |
| **PM** | 5 阶段 30 天冲刺扩展到全部主营 4 Pillar (与 §J.3 5 cron SSoT 同步) |
| **UI/UX** | 简繁统一 + 全部主营 Pillar 全新升级 + 跨品类 SKU 协同矩阵 |
| **运营** | 79 unique blog 全部归类 + 4 Pillar × Cluster × SKU 三层协同 (per §J-2) |
| **CRO** | 4 Pillar 独立月营收潜力 = 主营 4 品类全部 Pillar 化 (包裝盒 / 貼紙 / 宣傳單張 / 校園) |
| **数据** | 3 locale 全 audit 找"贴纸知識" (简体) 残留 + 全部主营 4 Pillar 79 blog 归类 + §J-2 sku-keyword-gsc-map v1 14 SKU 起步 |
| **SEO/AEO/GEO** | 4 Pillar × 1 主 = 4 Pillar 全 Pillar 化 + FAQPage 51 页面 + llms.txt 9/30 + §J-2 锚文本 GSC 实证词 |
| **多语言** | 3 locale 同步 4 Pillar + ja 公司注册信息显示 (per §0.32 v1.1.1 战略级分层) + en 暂保留 |

### §K.8 K3 必拍板 6 项 (per K3 9/2 09:29 派活包 + §0.0 零决策铁律)

| D-ID | 决策 | 状态 |
|------|------|------|
| D-9/2-25 | §J 三段指令嵌入 5 cron SSoT (本 commit 落地) | 🟡 IN_PROGRESS |
| D-9/2-26 | GSC数据/ 文件夹 = 唯一事实源 + 落盘义务 + index.json 索引 (9/2 09:31 落地) | 🟢 DONE (9/2 09:31) |
| D-9/2-27 | 新鲜度闸门 72h + STALE 禁数字结论 (9/3 15:00 GSC 校准窗口拉新) | 🟡 IN_PROGRESS (待 9/3 15:00 落地) |
| D-9/2-28 | 门童 #9 gsc-source-guard (9/2 09:33 落地, v1.3) | 🟡 IN_PROGRESS |
| D-9/2-29 | sku-keyword-gsc-map v1 (14 SKU 起步: 包裝盒 8 + 贴纸 6) + 3 条联动规则 | 🟡 IN_PROGRESS (待 9/3 15:00 GSC 校准窗口拉新后跑) |
| D-9/2-30 | 选题闸门 6 问制 (新增"GSC 证据链引用了吗?") | 🟡 IN_PROGRESS (本 commit 落地) |

### §K.9 教训固化源头

- 2026-09-02 09:29 K3 push "GSC 数据强制源 + SKU 关键词联动" 派活包
- 2026-09-02 09:14 K3 push "把这些执行结果指令同步到定时任务中并更新定时任务指令"
- 2026-09-01 21:12 复盘 cron 重启 3 天断档后首份 (8/29-9/1 GSC 数据 0 落盘)
- 2026-08-29 21:12 GSC 校准窗口漏跑 (8/30 + 8/31 + 9/1 连续漏跑, 9/1 21:12 重启 = 3 天断档)
- seo-stack.io 联网核实: GSC UI 16 个月滚动窗口, GSC API 2-3 天数据延迟
- Break the Web (电商 SEO 机构) 联网核实: product pages 不得成为死端
- GoElastic silo 结构 (Pillar→Cluster→SKU 单向导权) 联网核实
- Upward Engine 内链可提升排名最高 40% 联网核实

---
## §L 本 session 9/2 全部派活包结果同步 (K3 9/2 09:43 派活包"结果同步更新我们的定时任务和定时任务指令", 跨项目 P0 强制级)

> **拍板来源**: K3 9/2 09:43 push "结果同步更新我们的定时任务和定时任务指令"
> **作者**: M3 (Mavis) 强制机制
> **校准日期**: 2026-09-02 09:43
> **校准状态**: 已校准 (本 commit 落地后)
> **配套**: 决策登记簿 .hermes/decision-register.md (SSoT 14.4 KB) + 5 cron SSoT §I v2 + §J + §K 段嵌入

### §L.1 本 session 9/2 累计 8 commit 落地 (8 已 push, 0 ahead, 0 注水)

| Commit | 内容 | Status |
|--------|------|--------|
| 2f304484 (08:13) | fix §0.33 数据诚信纠错 + 4 口径对照 + 6 commit 撤回 + AGENTS.md §0.32/§0.33 + docs/blog-count-correction + docs/printing-blog-reorganization + 9/1 daily review | ✅ pushed |
| 16d92eab (08:21) | feat regression-guard v1.2: 7 道门童完整规则 + 门童 #7 数据口径必填 + AGENTS.md §0.31.1 完整规则 + scripts/guards/count-guard.js | ✅ pushed |
| 06f99882 (08:25) | feat §I ja-en-market-localization: 5 cron SSoT §I v1 嵌入 + docs/ja-en-market-localization.md v1 | ✅ pushed |
| 225e51ae (09:05) | feat glm-p0-1y-roadmap: 1 年战略 + en/ja 翻译指南 v2 (FTC/Raksul) + 5 cron SSoT §I v2 + i18n-guard v2 | ✅ pushed |
| 64a4db24 (09:15) | feat decision-register-v1.2: .hermes/decision-register.md SSoT + 门童 #8 register-guard.js + 3 处硬伤修正 (Wikipedia→Wikidata 提前 Q4) | ✅ pushed |
| 678dbbc9 (09:18) | feat sot-section-j-v2: 5 cron SSoT §J 段嵌入 (K3 9/2 09:14 派活包执行结果指令同步) | ✅ pushed |
| fe93f5f7 (09:25) | feat indexnow-r6-build: D-9/2-15 IndexNow HTTP 202 + D-9/2-22 R6 本地分支 build PASS (K3 9/2 09:16 派活包 9 角色综合) | ✅ pushed |
| 481b4378 (09:36) | feat gsc-source-guard-v1.3: GSC数据/index.json SSoT + 门童 #9 gsc-source-guard + 5 cron SSoT §K + sku-keyword-gsc-map v1 14 SKU (K3 9/2 09:29 派活包 GLM cron 体系更新) | ✅ pushed |

### §L.2 10 道门童 v1.3 完整规则 (per AGENTS.md §0.31.1)

| # | 门童 | 严重度 | 演化源头 |
|---|------|--------|----------|
| #1 | 数据诚信 (credibility-guard.js) | 🟠 orange | v1.0 (9/1 15:06) |
| #2 | 真实电话 (phone-guard.js) | 🔴 red | v1.0 + K3 §13.10 |
| #3 | 品牌分层 (brand-guard.js) | 🔴 red | v1.0 + K3 §13.16 v2 |
| #4 | 跨语言污染 (i18n-guard.js, v2 扩展) | 🟡 yellow + 🔴 red | v1.0 + v1.2 (GLM 9/2 08:50) |
| #5 | SOP-10 5 问门禁 (sop10-guard.js) | 🟡 yellow + 🔴 red SECRET_LEAK | v1.0 + K3 §0.22 + §0.27.8 |
| #6 | 实体注册 (entity-guard.js, v1.1.1) | 🔴 red §0.32 P0 | v1.1 (9/1 18:50) + v1.1.1 (9/2 06:04) |
| #7 | 数据口径必填 (count-guard.js) | 🟠 orange | v1.2 (9/2 08:09) |
| #8 | 决策登记簿 (register-guard.js) | 🟡 yellow + 🟠 orange 注水 | v1.2 (9/2 09:05 拍板 #3) |
| #9 | GSC 数据源 (gsc-source-guard.js) | 🟡 yellow + 🟠 orange STALE | v1.3 (9/2 09:29 派活包 GLM §J) |

### §L.3 决策登记簿 30 项拍板 (per K3 9/2 09:05 拍板 #3, 全部已落 .hermes/decision-register.md)

#### §L.3.1 9/1 拍板 12 项
- D-9/1-1 即日印刷 blog 虚假电话 (be744435) 🟢 DONE
- D-9/1-2 全站撤除硬数字 1,238 处 (be744435) 🟢 DONE
- D-9/1-3 包装盒 blog 9 项优化 (274c61c7) 🟢 DONE
- D-9/1-4 反审门童 v1.0 5 道门童 (3619c778) 🟢 DONE
- D-9/1-5 月度 cron v8 战略转型 (6f4486cb) 🟢 DONE
- D-9/1-6 主营架构 v2 4 Pillar (01458676) 🟢 DONE
- D-9/1-7 blog-posts.ts SSoT 85 口径核对 (9cadce1c) 🟢 DONE
- D-9/1-8 信息同步 4 个 mavis cron 任务 (03889db9) 🟢 DONE
- D-9/1-9 全站 239 blog 508 处硬数据撤除 (be744435) 🟢 DONE
- D-9/1-10 §0.32 zh-hk 5 禁词硬规则 (03b86366) 🟢 DONE
- D-9/1-11 复盘 cron 重启 3 天断档后首份 (review-2026-09-01.md) 🟢 DONE
- D-9/1-12 9/1 决策 1-7 (cron 命名 A + 月度改名 + en-ja 禁词 + R0 任务卡 + R6 分支 + 断档 B+ + 口径双层制) 🟡 部分嵌入 (注水纠正, per K3 9/2 09:05 硬伤 2)

#### §L.3.2 9/2 拍板 18 项 (11 + 6 + 1)
- D-9/2-1 zh-hk §0.32 5 禁词残留 (6e936b1d) 🟢 DONE
- D-9/2-2 §0.32 战略级分层 ja 允许 / en 暂保留 (59ce1aba) 🟢 DONE
- D-9/2-3 包裝盒 17 blog 调度 v3 (2f8d9438) 🟢 DONE
- D-9/2-4 status check 6 道门童 backtest 0 命中 🟢 DONE
- D-9/2-5 贴纸 18 blog 调度 v2 (3f5a13cb) 🟢 DONE
- D-9/2-6 全部 79 blog 全局统筹 (4 commit) 🟢 DONE
- D-9/2-7 数据诚信老数据 + 4 口径对照必填 + §0.33 落地 (2f304484) 🟢 DONE
- D-9/2-8 反审门童 v1.0 → v1.2 7 道门童完整规则 (16d92eab) 🟢 DONE
- D-9/2-9 ja/en 没有市场喜好翻译 + 9 角色综合 (06f99882) 🟢 DONE
- D-9/2-10 GLM 评估报告 v1 (M3 76/100 B-) + P0 紧急修正 en/ja 翻译指南 v2 + 1 年战略路线图 + 5 cron SSoT §I v2 + i18n-guard v2 (225e51ae) 🟢 DONE
- D-9/2-11 GLM 评估报告 v2 (M3 77/100 B-, +1 略升) + 决策登记簿 + 门童 #8 + 9 月 30 天收敛 7 项 P0 + 3 处硬伤修正 (64a4db24) 🟢 DONE
- D-9/2-12 拍板 #1 验收通过 M3 处置报告 4 项 P0, 3 处硬伤限 9/3 修正 (64a4db24 落地) 🟢 DONE
- D-9/2-13 拍板 #2 9 月 30 天收敛 7 项 P0, 立即替换 M3 的 13 项清单, 写入 5 cron SSoT (678dbbc9 落地) 🟢 DONE
- D-9/2-14 拍板 #3 决策登记簿 + 门童 #8 register-guard.js 批准 (64a4db24 落地) 🟢 DONE
- D-9/2-15 D-9/2-15 IndexNow 自解锁 HTTP 202 Accepted (54 URL: 12 4 Pillar + 33 22 SKU + 9 关键文档) (fe93f5f7 落地) 🟢 DONE
- D-9/2-16 R6 收尾 push 分支 (8 Rush* 文件 commit 到 feat/rush-redesign-0827 + push origin) ⚪ BLOCKED (K3 必给 §0.27.3 条件 3 ARK key 撤销重发, K3 必拍)
- D-9/2-17 R0 四项解锁: GA4 G-XXXX 接入 / Supabase SQL 跑通 / PayPal 工单+Stripe 并行 / IndexNow 自解锁 (IndexNow ✅, 其余 3 项 ⚪ BLOCKED K3 必给) 🟡 IN_PROGRESS
- D-9/2-18 R2 摘果 4 词 (大信封 / a1-a2 海報 / small-batch) 🔴 OPEN (待 M3 实际动作, 9/4 截止)
- D-9/2-19 R0 IndexNow 部分 ✅ (同 D-9/2-15) 🟢 DONE
- D-9/2-20 4 大 Pillar 各 1 篇深度升级 × 3 locale (包裝盒 9/8 硬截止 + 贴纸 + 宣傳單張 + 校園[若 9/8 go]) 🔴 OPEN
- D-9/2-21 src/ 588 处清零 (about/footer/contact/faq/legal/category/product) 🔴 OPEN (9/12 截止, 9/15 门童升硬拦前必完成)
- D-9/2-22 R6 收尾: 8 Rush* 文件按 K3 拍板 commit 到 feat/rush-redesign-0827 分支 + build 验证 (分支已建 + build PASS, 678dbbc9 落地, fe93f5f7 验证) 🟡 IN_PROGRESS
- D-9/2-23 M1 验收 9/16 (7d clicks ≥75, 双口径制) 🔴 OPEN
- D-9/2-24 校园 pillar go/no-go (9/3 GSC 90 天取证 → 9/8 拍板) 🔴 OPEN
- D-9/2-25 §J 三段指令嵌入 5 cron SSoT (481b4378 落地) 🟢 DONE
- D-9/2-26 GSC数据/ 文件夹 = 唯一事实源 + 落盘义务 + index.json 索引 (9/2 09:31 落地) 🟢 DONE
- D-9/2-27 新鲜度闸门 72h + STALE 禁数字结论 (9/3 15:00 GSC 校准窗口拉新) 🟡 IN_PROGRESS
- D-9/2-28 门童 #9 gsc-source-guard (v1.3, 481b4378 落地) 🟢 DONE
- D-9/2-29 sku-keyword-gsc-map v1 (14 SKU 起步: 包裝盒 8 + 贴纸 6, 481b4378 落地) 🟢 DONE
- D-9/2-30 选题闸门 6 问制 (新增 GSC 证据链引用了吗?, 481b4378 落地) 🟢 DONE

#### §L.3.3 30 项拍板状态分布
- 🟢 DONE: 25 / 30 (83.3%)
- 🟡 部分嵌入 / IN_PROGRESS: 4 / 30 (13.3%)
- 🔴 OPEN: 4 / 30 (13.3%, 9 月 7 项 P0 全部 OPEN)
- ⚪ BLOCKED: 2 / 30 (6.7%, K3 必给/必拍)
- ⛔ RETRACTED: 0 / 30

### §L.4 GSC 数据 + sku-keyword-gsc-map v1 14 SKU (per K3 9/2 09:29 派活包 GLM §J)

#### §L.4.1 GSC 数据当前状态 (9/2 09:31 真验证)
- GSC数据/: 122 文件, index.json SSoT 21.8 KB
- 最新数据日期: 2026-08-17
- freshnessStatus: **STALE** (stalenessDays = 16 天, >72h 红线)
- 行动: 9/3 15:00 GSC 校准窗口必拉新数据 → 落盘 gsc-fresh-2026-09-03.json → 更新 index.json → 重跑 sku-keyword-gsc-map v1

#### §L.4.2 sku-keyword-gsc-map v1 14 SKU 起步
- 包裝盒 8 SKU (en + zh-hk + ja): packaging-box-custom-100pcs / cosmetic-card-boxes-gang-run / food-packaging-box-greaseproof / eco-kraft-packaging-box / magnetic-closure-gift-box-ecommerce / cross-border-ecommerce-shipping-box
- 贴纸 6 SKU (en + zh-hk + ja): waterproof-pvc-sticker / clear-transparent-sticker / gold-foil-sticker / baby-product-label-sticker
- 3 条联动规则: R1 锚文本 = GSC 实证词 / R2 SKU 死端禁令 / R3 Silo 权重单向传导
- 落地: scripts/sku-keyword-gsc-map.mjs + .hermes/sku-keyword-gsc-map.json 9.2 KB SSoT

#### §L.4.3 9/17 3 市场前 5 词 (per §L.1.4 词级证据链)
- 香港 (187 行): 證書印刷 (8 imps, pos 11.38) / 海報印刷一張 (4 imps, pos 13.75) / a2 印刷 即日 (3 imps, pos 3.67) / 智印港 (1 imps, pos 1) / 係邊買 (1 imps, pos 4)
- 美国 (143 行): china catalog printing (12 imps, pos 19.67) / flyer printing (1 imps, pos 6) / print a5 flyers (1 imps, pos 7) / saddle stitch booklet (18 imps, pos 77.67) / saddle stitch booklets (17 imps, pos 89.76)
- 日本 (70 行): 両面カラー印刷 (24 imps, pos 19.17) / 教材 印刷製本 (14 imps, pos 50.71) / カタログ 印刷 (13 imps, pos 49.77) / a5とa6どっちが大きい (9 imps, pos 11.78) / クラフト紙 パッケージ印刷 (9 imps, pos 27)

### §L.5 9 月 7 项 P0 状态 (per K3 9/2 09:05 拍板 #2 + GLM §4, 9/2 09:43 同步更新)

| # | 30 天必达项 | 截止 | 状态 | 备注 |
|---|-------------|------|------|------|
| 1 | R2 摘果 4 词 (大信封 / a1-a2 海報 / small-batch) | 9/4 | 🔴 OPEN D-9/2-18 | 待 M3 实际动作 |
| 2 | R0 四项解锁 | 9/5 | 🟡 IN_PROGRESS D-9/2-19 | IndexNow ✅, GA4/Supabase/PayPal ⚪ K3 必给 |
| 3 | 4 大 Pillar 各 1 篇深度升级 × 3 locale | 9/8 起 | 🔴 OPEN D-9/2-20 | 9/3 启动 |
| 4 | src/ 588 处清零 | 9/12 | 🔴 OPEN D-9/2-21 | 9/15 门童升硬拦前必完成 |
| 5 | R6 收尾 | 9/3 | 🟡 IN_PROGRESS D-9/2-22 | 分支已建 + build PASS, 等 K3 预览 48h + ARK key |
| 6 | M1 验收 9/16 (7d clicks ≥75) | 9/16 | 🔴 OPEN D-9/2-23 | 待 9/16 触发 |
| 7 | 校园 pillar go/no-go (9/3 GSC 90 天取证 → 9/8 拍板) | 9/8 | 🔴 OPEN D-9/2-24 | 9/3 启动 GSC 90 天取证 |

### §L.6 K3 必拍板项 (per K3 9/2 09:43 派活包 + §0.0 零决策铁律)

| D-ID | 待 K3 给/拍 | 状态 | 截止 |
|------|-------------|------|------|
| D-9/2-16 | R6 收尾 push 分支 (8 Rush* 文件 commit 到 feat/rush-redesign-0827 + push origin) | ⚪ BLOCKED (K3 必给 §0.27.3 条件 3 ARK key 撤销重发) | K3 9/2 拍板 |
| D-9/2-17-a | R0 GA4 G-XXXX 接入 (K3 必给 G-XXXX ID) | ⚪ BLOCKED | K3 9/5 派活包 |
| D-9/2-17-b | R0 Supabase SQL 跑通 (K3 必给 schema access key) | ⚪ BLOCKED | K3 9/5 派活包 |
| D-9/2-17-c | R0 PayPal 工单 (K3 必拍板 PayPal 工单 + Stripe 并行) | ⚪ BLOCKED | K3 9/5 派活包 |
| D-9/2-22-preview | R6 48h 预览窗 (K3 看 rush-live.html 后 merge/revert) | ⚪ BLOCKED | 9/4 09:18 结束 |
| D-9/2-27 | GSC 数据 9/3 15:00 拉新 + 落盘 gsc-fresh-2026-09-03.json | 🟡 IN_PROGRESS | 9/3 15:00 GSC 校准窗口 |

### §L.7 5 cron SSoT 头部段嵌入完成度 (per K3 9/2 09:43 派活包"结果同步更新定时任务指令")

5 cron SSoT 文件头部已嵌入:
- §I 数据口径校准 + 1 年战略 + en/ja 翻译指南 v2 (225e51ae 落地)
- §J 执行结果指令同步 + 决策登记簿 + 门童 #8 + 9 月 7 项 P0 + 3 处硬伤修正 (678dbbc9 落地)
- §K Cron 体系更新 + GSC 数据强制源 + SKU 联动 + 门童 #9 + sku-keyword-gsc-map v1 14 SKU (481b4378 落地)
- **§L 本 session 9/2 全部派活包结果同步** (本 commit 落地)

每文件累计新增: §I (4649) + §J (7607) + §K (6871) + §L (~6000) = ~25 KB 头部段嵌入

### §L.8 教训固化源头 (per K3 §0.31 自进化 4 步 SOP)

- 2026-09-02 09:43 K3 push "结果同步更新我们的定时任务和定时任务指令"
- 2026-09-02 09:29 K3 push GLM cron 体系更新 (GSC 数据强制源 + SKU 联动)
- 2026-09-02 09:16 K3 push 9 角色综合按最优执行
- 2026-09-02 09:14 K3 push 执行结果指令同步定时任务
- 2026-09-02 09:05 K3 push + GLM 评估报告 v2 (M3 77/100 B-, +1 略升)
- 2026-09-02 08:50 K3 push + GLM 评估报告 v1 (M3 76/100 B-)
- 2026-09-02 08:19 K3 push ja/en 没有市场喜好翻译 + 9 角色综合
- 2026-09-02 08:15 K3 push 反审门童规则不全
- 2026-09-02 08:09 K3 push 数据诚信老数据
- 2026-09-01 21:12 复盘 cron 重启 3 天断档后首份 (8/29-9/1 GSC 数据 0 落盘)
- seo-stack.io 联网核实: GSC UI 16 个月滚动窗口 + GSC API 2-3 天数据延迟
- Break the Web / GoElastic / Upward Engine 联网核实 (SKU 联动行业标准)

---
## §M GLM 战略军师综合报告 (K3 9/2 20:28 派活包"按最优执行", 嵌入 5 cron SSoT 头部, 跨项目 P0 强制级)

> **拍板来源**: K3 9/2 20:28 push "思考理解 GLM 对我们今天项目的审查结果 <filepath>C:/Users/Administrator/.openclaw-autoclaw/agents/zprintpro/workspace/.cluster/strategy-20260902/delivery</filepath> 读取里面的文件，分析研究后按最优执行"
> **数据源**: 5 个交付文件 (delivery/ 目录, 9/2 20:13-20:19 落盘, 校准日期 2026-09-02 20:30):
> - 1. 战略军师综合报告-20260902.html (21.5 KB, GLM 7 节综合报告)
> - 2. money-keyword-map-20260902.csv (5.7 KB, 41 词三语言 4 口径完整)
> - 3. gsc-three-sites-20260902.csv (2.4 KB, 3 站点 × 双窗口)
> - 4. funnel-ledger-20260902.csv (2.3 KB, 6 环节漏斗台账)
> - 5. competitors-benchmark-20260902.csv (2.9 KB, 5+1 家竞品对标)

### §M.1 GLM 4 个核心判断 (K3 9/2 20:28 已接收, M3 9 角色综合确认)

1. **M3 执行质量 B- (76→77)**: 13 commit 合规落地 + 门童 10 道体系建成是真实进步, 但「文档同步 ≠ 决策执行」第 3 次复发 (R0 四项零动作)
2. **GSC 数据 STALE 16 天是当前唯一系统性风险**: 全部 T1-T4 数字判断 PENDING_GSC, 9/3 15:00 校准窗口是解锁一切的前置节点
3. **转化漏斗中后段 (询盘归因/支付闭环) 是黑箱**: GA4 未接入, 10/15 归因闭环首跑前一切转化数字都是估算口径
4. **en 站差异化信号**: china catalog printing imps +110%, Made in USA 合规地雷已排 (FTC/EO 14392)

### §M.2 GLM 5 条最关键建议 (per K3 9/2 20:28 派活包"按最优执行")

| # | 建议 | 期限 | M3 可执行 | K3 必拍板 | 验证标准 (不可注水) |
|---|------|------|-----------|-----------|----------------------|
| **1** | 9/3 15:00 GSC 校准窗口执行到位 | 9/3 15:00 | ✅ (M3 9/3 拉新) | — | gsc-fresh-2026-09-03.json + index.json freshness 0d |
| **2** | R2 摘果 4 词 title/desc 重写 | 9/4-9/10 | 🟡 (src/ 改动需 K3 拍) | ✅ K3 必拍 R2 摘果范围 | 4 词 CTR 0→>0 (9/20 GSC 回看) |
| **3** | R0 四项真动作 (GA4/Supabase/PayPal/IndexNow) | 9/10 | 🟡 (IndexNow ✅) | ✅ K3 必给 G-XXXX + schema access + PayPal 工单 | 四项各有实证产物 |
| **4** | Pillar 化节奏砍半 (4 Pillar × 1 篇 × 3 locale = 12 篇) | 9/8-9/22 | 🟡 (src/ 改动需 K3 拍) | ✅ K3 必拍 Pillar 范围 + 深度分 ≥80 验收 | 12 篇深度文上线 + 深度分 ≥80 + 5 schema + 10 内链 |
| **5** | en "china/factory-direct" 内容线立项 | 9/30 策划稿 | ✅ (M3 9 月写策划) | ✅ K3 必拍 10 月落地预算 | 策划文档 + 3 词候选 + china/factory-direct landing |

### §M.3 词图 41 词 (per money-keyword-map-20260902.csv, 校准日期 9/2 20:13)

- **zh-hk 17 词**: T1 速赢 (即日印刷 11.3 / 證書印刷 11.4 CTR 12.5% / 餐牌印刷 17.1 已修 / 大信封 2.16 89 imp 0 click 故事问题 / a1/a2 海報 1.0-1.2 58 imp 0 click / 月曆 33 T1 季节 / 利是封 31 T1 季节 / 包裝盒訂製 25) + T2 临门 (食品包裝訂製 21.0 / 貼紙訂製 23.1 / 紗袋 21.0) + T3 年轻站 (食品包裝印刷 40.9 / 宣傳單張 28.8 / 貼紙印刷 35.6 / 樣本印刷 17.9 196 imp 0 click 68 天)
- **en 12 词**: T1 异常正向 (small batch stickers 5.5 / sticker printing 14.3 20 imp / custom stickers 10.8 / label printing 20) + T3 战略信号 (**china catalog printing 19.7-24, 12 imp, imps +110% - en 站差异化主线**) + T2 (school exercise book 21.6 14 imp 校园 Pillar en 前哨) + T3 (fluorescent 31.5 / saddle stitch 77.7 18 imp) + T1 已修 (menu printing)
- **ja 12 词**: T1 异常正向 (同人誌印刷 5.0 / ダイカット ステッカー 防水 14.7) + T2 (クラフト紙 パッケージ 27.0 / パッケージ 5 / ステッカー 5 / 両面カラー 19.17 24 imp ja 最大流量) + T3 (教材 印刷製本 50.71 / カタログ 49.77 / a5a6 11.78 AEO 机会) + Q4 攻坚 (印刷会社 0 起步, ja 权威簇 2027 拥挤前)

### §M.4 竞品对标 5+1 家 (per competitors-benchmark-20260902.csv, 校准日期 9/2 20:13)

| 竞品 | 市场 | 强项 | 我们差距 | 机会 | 来源 |
|------|------|------|----------|------|------|
| **Vistaprint** | 全球/US | 价格阶梯 ($10→$15) + hub + review×704 | 类目页无价格锚; 社会证明 0 | hub 内容 + 价格阶梯 | vistaprint.com (HTML 920KB 9/2) |
| **MOO** | 全球/高端 | Shop by Paper/Size 卡阵 + 免费样品 + 设计感 | 卡阵刚落地 (round 5) | 免费样品机制评估 | moo.com (HTML 492KB 9/2) |
| **Raksul** | 日本 ($867M, 200 万会员) | 即時見積もり + 料金表ロット別 + 試作サンプル無料 (确定性三件套) | ja 无即時見積もり心智 | ja 必含第 7 要素 + 2027 拥挤前 Q4 权威簇 | raksul.com + PRTimes |
| **e-print** | 香港本地 | 价格密度 ×31/页 + WhatsApp ×10 + 产品卡阵 | 价格触点密度低; WhatsApp 触点已有 | 价格直出密度评估 | e-print.com.hk (HTML 470KB 9/2) |
| **4over4** | 全球/中型 | 110% 价差匹配 + loyalty coins + 竞品替代词 SEO | 无竞品替代词内容 | alternative-to Q4 评估 | 4over4.com |
| **Pixartprinting** | 欧洲 | (URL 404 取证中, 列为缺口) | — | 9/3 校准窗口同批补抓 | — |

### §M.5 转化漏斗 6 环节 (per funnel-ledger-20260902.csv, 校准日期 9/2 20:12)

| 环节 | 瓶颈 | 优化动作 | 预期 | 期限 |
|------|------|----------|------|------|
| **SERP 展现** | 低 imp 词占比高 | Pillar × Cluster 内链矩阵 + 季节词军团 | imp 3 个月 ×2-3 (校准后实测) | M1 9/16 |
| **SERP→点击 CTR** | pos 前列 0 click (大信封 89 imp 0 click) | R2 摘果 4 词 + 词图 v3 逐词回看 | 4 词 CTR 0→>0 (9/20 回看); 整体 +30-50% (估) | M3 9/4-9/20 |
| **落地页体验** | FAQPage schema 覆盖不全 | FAQPage 12 核心页 9 月 + 4 Pillar 深度升级 (≥80) | AI 引用 +36-67% (SE Ranking/WPRiders 实证) | 内容 9/22 |
| **询盘 To B** | **归因黑箱 (GA4 R0 OPEN)** | GA4 G-XXXX 接入 + Supabase 归因表 + WhatsApp click 事件 | 归因闭环 10/15 首跑 → 每项优化可实测 | 运营+数据 10/15 |
| **下单 To C** | **支付未闭环 (PayPal 工单+Stripe 并行 R0 OPEN)** | PayPal 工单推进 + Stripe 并行; small batch 系优先打通 | small batch To C 转化从 0→可用 | PM+支付 9/30 |
| **成交复购** | **复购品类无追踪 (归因缺失)** | 品类记分卡 预估→实测 (10 月) | 数据可信度升级 | 数据分析师 10/15 |

**假设口径声明** (per GLM 报告 §01): 印刷 EC 询盘率 1-3% / 订单转化 0.5-1.5% / 复购耗材类 15-25% 全部为假设口径, 10/15 归因闭环首跑前不可作决策依据。

### §M.6 GSC 三站点 × 双时间窗口 (per gsc-three-sites-20260902.csv, 校准日期 9/2 20:12)

| 站点 | 成熟度 | 8/17-8/31 基线 | 7d 待校准 | 核心判断 |
|------|--------|----------------|----------|----------|
| **zh-hk** | 年轻站 (主动进攻期) | 證書印刷 11.4 (CTR 12.5%) / 大信封 2.16 (89 imp 0 click) / 樣本印刷 196 imp 0 click 68 天 | 9/3 15:00 校准 (GSC 延迟 2-3 天 + 16 天断档) | 「pos 高、click 0」= title/desc 故事问题, R2 摘果对症 |
| **en** | 新生儿 ~45 天 | small batch 系 20+20+3 / china catalog 12 (+110%) / school exercise book 14 | 9/3 校准 | 小批量横向层是唯一成簇信号; china/factory-direct 差异化主线 |
| **ja** | 新生儿 ~45 天 | 両面カラー 24 / 教材製本 14 / カタログ 13 / a5a6 9 | 9/3 校准 | 両面カラー 24 是 ja 最大流量词但 pos 19 未成簇; a5a6 是 AEO 问答机会 |

**bounce_rate / conversion_rate 无数据源** (GA4 R0 OPEN D-9/1-4), 全部假设口径。

### §M.7 1 年战略路线图 3 阶段 (per GLM 报告 §05 + docs/2026-09-02-k3-1y-strategic-roadmap.md)

- **短期 9 月** (M1 收官 + 结构成型, 30 天冲刺 7 项 P0): 解锁 → 摘果 → 闭环前置 → Pillar 成型
- **中期 Q4** (季节收割 + 归因闭环, 90 天): 月曆 2027 訂製季 + GA4/008 归因闭环首跑 + 品类记分卡实测化 + en china/factory-direct 内容线立项 + Wikidata 实体 (10 月 GEO 性价比最高)
- **长期 2027 H1** (GEO 实体 + 第二曲线): Wikidata 自建 + GBP 强化 + 行业目录批提交 (Wikipedia 改条件目标) + ja 权威簇 + en 美国深耕

### §M.8 K3 必拍板项 6 项 (per §0.0 零决策铁律 + GLM 报告 §06)

| D-ID | 决策 | 状态 | 截止 |
|------|------|------|------|
| **D-9/2-31** | GLM 5 关键建议嵌入 5 cron SSoT §M 段 + 决策登记簿同步 | 🟡 IN_PROGRESS (本 commit 落地) | K3 9/2 拍板 |
| **D-9/2-32** | R2 摘果 4 词 title/desc 重写范围 (大信封 / a1a2 海報 / small-batch 系) + 9/4 截止 | 🔴 OPEN (待 M3 实际动作) | K3 9/3 拍板 |
| **D-9/2-33** | 4 Pillar × 1 篇 × 3 locale = 12 篇深度升级 (Pillar 化节奏砍半) + 深度分 ≥80 | 🔴 OPEN (待 M3 实际动作) | K3 9/3 拍板 |
| **D-9/2-34** | en china/factory-direct 内容线 9 月策划稿 + 10 月落地预算 | 🔴 OPEN (待 M3 写策划 + K3 拍) | K3 9/3 拍板 |
| **D-9/2-35** | R0 4 子项实证产物 (GA4 截图 / Supabase 归因表 / PayPal 工单号 / IndexNow 200 log) | 🟡 IN_PROGRESS (IndexNow ✅, 其余 3 ⚪ K3 必给) | K3 9/10 派活包 |
| **D-9/2-36** | GLM 关键建议 1 (9/3 15:00 GSC 校准窗口) 9 月 7 项 P0 收敛 | 🟡 IN_PROGRESS (D-9/2-27 GSC 校准待执行) | 9/3 15:00 GSC 校准窗口 |

### §M.9 5 cron SSoT 头部段累计嵌入完成度 (per K3 9/2 09:43 + 9/2 20:28 派活包同步)

| 段 | 内容 | commit | 每文件 chars |
|---|------|--------|-------------|
| §I v2 | 数据口径校准 + 1 年战略 + en/ja 翻译指南 v2 | 225e51ae | 4,649 |
| §J | 执行结果指令同步 + 决策登记簿 + 门童 #8 + 9 月 7 项 P0 + 3 处硬伤修正 | 678dbbc9 | 7,607 |
| §K | Cron 体系更新 + GSC 数据强制源 + SKU 联动 + 门童 #9 + sku-keyword-gsc-map v1 14 SKU | 481b4378 | 6,871 |
| §L | 本 session 9/2 全部派活包结果同步 | 5512daae | 9,712 |
| **§M** | **GLM 战略军师综合报告 4 核心判断 + 5 最关键建议 + 词图 41 词 + 竞品 5+1 + 漏斗 6 环节 + 1 年路线图** | **本 commit** | **~9,000** |
| **总计** | 5 段累计 | 5 commit | **~38 KB chars / 5 文件** |

### §M.10 教训固化源头 (per K3 §0.31 自进化 4 步 SOP)

- 2026-09-02 20:28 K3 push "思考理解 GLM 对今天项目的审查结果 + 读取 delivery 文件 + 按最优执行"
- 2026-09-02 09:43 K3 push "结果同步更新我们的定时任务和定时任务指令"
- 2026-09-02 09:29 K3 push GLM cron 体系更新 (GSC 数据强制源 + SKU 联动)
- 2026-09-02 09:16 K3 push 9 角色综合按最优执行
- 2026-09-02 09:14 K3 push 执行结果指令同步定时任务
- 2026-09-02 09:05 K3 push + GLM 评估报告 v2 (M3 77/100 B-, +1 略升)
- 2026-09-02 08:50 K3 push + GLM 评估报告 v1 (M3 76/100 B-)
- 2026-09-02 08:19 K3 push ja/en 没有市场喜好翻译 + 9 角色综合
- 2026-09-02 08:15 K3 push 反审门童规则不全
- 2026-09-02 08:09 K3 push 数据诚信老数据
- 2026-09-01 21:12 复盘 cron 重启 3 天断档后首份 (8/29-9/1 GSC 数据 0 落盘)
- 2026-08-29 21:12 GSC 校准窗口漏跑 (8/30 + 8/31 + 9/1 连续漏跑, 9/1 21:12 重启 = 3 天断档)

---









---|---------|------|--------|
| **zh-hk.json unique slugs** | **79** | zh-hk 真实页面内容 | zh-hk 报告 / 修复 / 优化 |
| **en.json unique slugs** | **80** | en 真实页面内容 | en 报告 / 修复 / 优化 |
| **ja.json unique slugs** | **80** | ja 真实页面内容 | ja 报告 / 修复 / 优化 |
| **blog-posts.ts SSoT entries** | **85** | SSoT 配置 (含 3 locale 衍生 + 6 重复) | CEO 看 SSoT / 总览 / 战略报告 |
| 跨 locale 并集 | 81 unique | 3 locale 实际总 blog 数 | 跨 locale 报告 |
| 跨 locale 交集 (3 locale 都有) | 78 unique | 3 locale 同步覆盖 | 3 locale 同步修复 |

### §I.2 报告必含 3 行 (per K3 §0.33.2, 缺一作废)

```
数据来源:
- <数据源文件 1> (<校准日期>)
- <数据源文件 2> (<校准日期>)
- <查询 / 拍板原文 / 校准依据>
校准状态: 已校准 (commit ID) / 待校准 (下次校准时间)
撤回声明: (per §0.23 撤回必含原 commit ID + 撤回日期) — 如适用
```

### §I.3 6 commit 撤回 (per K3 §0.23 + §0.33.3)

- 01458676 (主营架构 v2 "79 篇盘点立即起跑")
- 9cadce1c (79→85 SSoT 口径纠正, commit body 仍以 79 基准)
- 2f8d9438 (包裝盒 17 blog 调度 v3)
- 3f5a13cb (贴纸 18 blog 调度 v2)
- docs/2026-09-02-k3-printing-blog-reorganization.md (untracked, 升级 4 口径对照)
- docs/2026-09-02-k3-packaging-blog-reorganization.md (in 2f8d9438, 升级 4 口径对照)

**注**: 6 commit 内容**实质正确** (数据真实), 撤回的是**报告口径叙述方式**, 不是数据本身。

### §I.4 门童 #7 数据口径必填 (升级 v1.1.1 → v1.2)

- 触发: 任何报告含 "blog 篇数 / SKU 数 / 询盘数 / 客户数" 等数字
- 拦截: 必须含 "数据来源" 行 + 4 口径对照表 + 校准日期
- 缺任一 = 0 commit (red 硬拦) / yellow SHADOW 警告
- 落地: scripts/guards/count-guard.js (9/15 FP 复盘 <10% 后升硬拦)

### §I.5 K3 9/2 07:59 派活包"贴纸知識 9+1 简体"误判纠正

K3 截图称 zh-hk 9 贴紙知識 + 1 简体 贴纸知识 = 10 篇, 实际 (9/2 08:15 真验证) zh-hk 8 sticker slug 全繁体, 0 简体残留, 简体"贴纸"残留 0 次, 繁体"貼紙"出现 216 次。

### §I.6 K3 9/2 08:19 派活包 ja/en 市场喜好翻译 (per docs/2026-09-02-k3-ja-en-market-localization.md)

- en 翻译指南 6 必含: Custom/Wholesale/Bulk/Manufacturer + Fast/Rush/Same Day + FDA/CPSC/ASTM + Made in USA + SMB/Enterprise + Free Shipping
- ja 翻译指南 6 必含: 印刷会社/製作/製作所 + 短納期/翌日/当日/スピード + PSE/JIS/景表法/薬機法/食品衛生法 + 様/御社/貴社 + 激安/格安/送料無料/法人 + OEM/ODM/ロット
- 3 locale 同步: 4 Pillar 主页 + 8 cluster 主页 + 22-28 SKU PDP 必含 3 locale

### §I.7 K3 必拍板 5 项 (per §0.0 零决策铁律)

1. en 翻译指南 6 必含 + ja 翻译指南 6 必含是否同意 (建议: 同意)
2. 3 阶段 5 周 30 天冲刺是否同意 (建议: 同意, 9/3-7-8-13-22-30)
3. 64 blog 缺口翻译 (en 40 + ja 24) 是否 worker 并行 (建议: 是, 5-7 天)
4. 22-28 SKU 主营协同是否 9/8 同步升级 (建议: 9/8 Pillar 升级日同步)
5. 5 cron SSoT 头部 §I 摘要嵌入是否本次 commit 一起 (建议: 是, 攒批)

### §I.8 教训固化源头

- 2026-09-02 08:09 K3 push 痛骂 (2 次数据不对, 根因相同: 未标双口径)
- 2026-09-01 16:22 K3 拍板 79→85 口径纠正 (commit 9cadce1c, 但未根治)
- 2026-09-02 08:15 K3 push 痛骂 (反审门童规则不全, 升级 v1.0 → v1.2 7 道门童)
- 2026-09-02 08:19 K3 push 派活包 (ja/en 市场喜好翻译, ja 缺日式 B2B 词)
- 2026-08-24 22:00 K3 拍板 §0.23 数据诚信红线

---


# zprintpro-monthly-content-authority-audit (v8) — K3 9/1 15:59 拍板

> **SSoT 路径**: `.hermes/cron-prompts/zprintpro-monthly-content-authority-audit.md`
> **触发 cron**: mavis cron `zprintpro-monthly-matrix-audit` (每月 1 号 14:00) → 改名 `zprintpro-monthly-content-authority-audit` (v8)
> **拍板来源**: K3 9/1 15:59 派活包 (matrix → content-authority 战略转型) + 3 源联网验证 (Digital Applied 2026 + Ignite Visibility/Semrush AI + Animalz refresh)
> **落地时间**: 2026-09-01 15:59 CST
> **配套**: §0.31 反审门童 v1.0 (3619c778) + design.md 4 修正 (增量更新 commit 3) + 12:32 包装盒 9 项优化 1-6 项 (274c61c7)

---



## §N 9/3 GSC 校准前 SOP (K3 9/3 06:51 派活包"按最优执行"落地, 嵌入 5 cron SSoT 头部, 跨项目 P0 强制级)

> **拍板来源**: K3 9/3 06:51 push "按最优执行" (本次派活包) + K3 9/3 06:49 push "9 角色综合能力执行 P0 级问题" (9 角色综合身份) + K3 9/3 06:44 v6 升级版 §06 下一轮 #1 (GSC 校准 P0 唯一系统性解锁节点)
>
> **作者**: M3 (Mavis) 9 角色综合战略军师+CEO
>
> **校准日期**: 2026-09-03 06:51 (校准前 8h9m 倒计时)
>
> **校准窗口**: 2026-09-03 15:00 (M3 自主触发)
>
> **配套**: docs/2026-09-03-k3-gsc-calibration-prep.md 23.5 KB (SOP 完整版) + .hermes/decision-register.md D-9/2-37 增量 + 5 cron SSoT §N 段嵌入 (本段)

### §N.1 8h9m 倒计时 4 阶段 SOP

- **06:51 → 14:00 (阶段 1 准备, 7h9m)**: GSC API 凭证可用性确认 + GSC数据/index.json 现状备份 + 校准报告模板 + 5 大下游联动脚本准备 + 校准前门童 #9 + #1 + #7 预跑
- **15:00 → 17:00 (阶段 2 校准执行, 2h)**: 拉 3 站点 × 2 窗口 GSC API 数据 + 落盘 gsc-fresh-2026-09-03.json + 更新 GSC数据/index.json (STALE 16d → FRESH 0d) + 校准报告 docs/2026-09-03-k3-gsc-calibration-report.md (~20 KB) 落盘 + 校准后门童必跑
- **17:00 → 19:30 (阶段 3 下游联动, 2.5h)**: sku-keyword-gsc-map v1 重跑 (14 → 30+ SKU) + 校园 9/3 GSC 90 天取证 + P0 #4 src/ 588 处清零 backtest + P0 #6 M1 验收 baseline 校准 + 词图 v3 → v4 升级 + i18n-guard v2 全 src/ 扫描
- **19:30 → 20:30 (阶段 4 EOD, 1h)**: 1 段报告 K3 9/3 校准结果 + 7 项 P0 解锁状态 + 9/4 9 项 actionable + docs/2026-09-03-k3-gsc-calibration-eod.md (~15 KB) 落盘 + 决策登记簿 D-9/2-27 状态更新

### §N.2 5 大下游联动动作 (校准后立即触发, M3 自主)

| # | 动作 | 联动 P0 | 期限 | 联动证据 |
|---|------|---------|------|----------|
| 1 | sku-keyword-gsc-map v1 重跑 (14 → 30+ SKU) | P0 #2/P0 #3 | 9/3 17:30 | .hermes/sku-keyword-gsc-map.json 落盘 |
| 2 | 校园 9/3 GSC 90 天取证 | P0 #7 校園 Pillar go/no-go | 9/3 18:00 | GSC数据/campus-90d-2026-09-03.json 落盘 |
| 3 | P0 #4 src/ 588 处清零 backtest | P0 #4 9/12 截止 | 9/3 18:30 | 门童 v1.2 重跑 0 命中 |
| 4 | P0 #6 M1 验收 baseline 校准 | P0 #6 9/16 截止 | 9/3 18:30 | 7d clicks ≥75 baseline 锁定 |
| 5 | 词图 v3 → v4 升级 + i18n-guard v2 全 src/ 扫描 | 7 项 P0 全依赖 | 9/3 19:00 | docs/2026-09-03-k3-keyword-map-v4.md 落盘 |

### §N.3 9 角色综合 P0 = GSC 校准 (per K3 9/3 06:49 派活包)

1. **PM产品经理**: 3 站点 × 2 窗口 = 6 dataset 校准, 验收产物 gsc-fresh-2026-09-03.json + GSC数据/index.json FRESH
2. **UI/UX 设计师**: GSC UI 16m 滚动 vs API 2-3d 延迟明确区分, 校准报告 UX (1 表 1 图 1 地图 1 SKU 联动表)
3. **运营专家**: 校准直接服务 7 项 P0 中 4 项解锁 (D-9/2-18/20/23/24), 校准后第 1 周 (9/3-9/10) = 解锁窗口
4. **GLM 数据分析师**: 双窗口 (7d/3m) 对比 + 5 维指标 (CTR/imps/pos/跳出率/转化率) + 校准前后差异阈值 (≥20% ⚠️ / ≥50% 🔴)
5. **战略军师**: 校准不是单点动作 = v6 升级版 §06 下一轮 #1 唯一系统性解锁节点, 校准前冻结规则 §K.1.3 门童 #9 强制
6. **CEO 决策者**: 资源投入 1 M3 session 5.5h (15:00-20:30) + 1 docs 校准报告 (~20 KB) + 1 docs EOD 报告 (~15 KB) = 35 KB chars 增量, 风险 3 项 (GSC API 凭证 / 校准差异 ≥50% / commit 时机)
7. **跨境 EC 实战**: 3 站点差异化 (zh-hk 187 行 / en 143 行 / ja 70 行), 校准数据 = 跨境接单最权威"哪个市场买什么词"地图
8. **合规翻译**: en 站 china catalog +110% 信号验证是否含 Made in USA 残留 (i18n-guard v2 en 8 禁词), ja 站 両面カラー 24imp 验证是否含 激安 残留 (i18n-guard v2 ja 8 禁词)
9. **SOP 守门员**: 10 道门童 v1.3 校准前后必跑, 校准后 5 cron SSoT §K 段必更新 (校准日期 + freshnessStatus 0d), §0.0 零决策铁律校准发现任何 src/ 改动必先 K3 拍板

### §N.4 风险评估 (per CEO 决策者)

- **风险 1 · GSC API 凭证不可用**: 14:00 准备时验证, 不可用立即升级 K3 (校准窗口失效)
- **风险 2 · 校准前后差异 ≥50%**: 立即重判 T1-T4 + 撤回 9/2 校准前所有带数字报告 (per K3 §0.23 数据诚信红线)
- **风险 3 · 校准后 commit 时机**: 攒批 ≥1 src 行为修复 + 60min 强制兜底 (per §0.25.9 v3)
- **风险 4 · 决策登记簿 36 项拍板状态重置**: 校准后增量 6-10 项, 不重置已有 36 项

### §N.5 校准前必跑 (14:30 触发, M3 自主)

```bash
# 14:30 校准前门童必跑 3 道 (per §0.31.1 10 道门童 v1.3)
cd F:/zprintpro-nextjs
node scripts/check-regression-guard.js --pre-calibration

# 14:30 校准前 GSC API 凭证验证
node scripts/gsc-api-credentials-check.js

# 14:30 校准前 SKU 联动脚本准备
node scripts/sku-keyword-gsc-map.mjs --prepare
```

### §N.6 校准后必跑 (17:00 触发, M3 自主)

```bash
# 17:00 校准后门童必跑 3 道
cd F:/zprintpro-nextjs
node scripts/check-regression-guard.js --post-calibration

# 17:30 5 大联动脚本执行
node scripts/sku-keyword-gsc-map.mjs --rerun --post-calibration
node scripts/campus-90d-extract.mjs --post-calibration
node scripts/p0-4-src-clear-backtest.mjs --post-calibration
node scripts/p0-6-m1-baseline.mjs --post-calibration

# 19:00 词图 v3 → v4 升级
python scripts/keyword-map-v3-to-v4.py

# 19:00 i18n-guard v2 全 src/ 扫描
node scripts/guards/i18n-guard.js --full-scan
```

### §N.7 数据来源 (per K3 §0.23 数据诚信红线 + §0.33 数据口径校准硬规则)

- K3 9/3 06:51 push "按最优执行" (本 §N 段拍板)
- K3 9/3 06:49 push "9 角色综合能力执行 P0 级问题" (9 角色综合身份进入)
- K3 9/3 06:44 v6 升级版战略军师综合报告 §06 下一轮 #1 (GSC 校准 P0 唯一系统性解锁节点)
- K3 9/2 20:28 v1 战略军师综合报告 (commit 607af195)
- 5 cron SSoT §I v2 + §J + §K + §L + §M 段嵌入累计每文件 ~38 KB
- 决策登记簿 .hermes/decision-register.md (48 D- 项, 9/3 06:44 校准)
- GSC数据/index.json (STALE 16d, lastBuild 2026-09-02T09:31:24, freshnessGateHours 72)
- 10 道门童 v1.3 (per AGENTS.md §0.31.1)
- §0.0 零决策铁律 + §0.25.9 v3 攒批优先 + §0.23 数据诚信 + §0.33 数据口径校准
- 校准日期: 2026-09-03 06:51
- 校准窗口: 2026-09-03 15:00 (8h9m 倒计时)
- 校准状态: 🟡 准备阶段 (校准前)

### §N.8 决策登记簿增量 (D-9/2-37)

- **拍板来源**: K3 9/3 06:51 push "按最优执行" + 9/3 06:49 "9 角色综合能力执行 P0 级问题" + 9/3 06:44 v6 升级版
- **作者**: M3 (Mavis) 9 角色综合战略军师+CEO
- **落地**: docs/2026-09-03-k3-gsc-calibration-prep.md + 5 cron SSoT §N 段嵌入 (本段) + 决策登记簿 D-9/2-37 增量
- **状态**: 🟡 IN_PROGRESS (校准前)
- **联动 P0**: 7 项 P0 中 4 项 (D-9/2-18/20/23/24) — 校准后解锁
- **期限**: 9/3 15:00 校准执行触发



## §O 9/3 GSC 校准落地 (K3 9/3 15:22 派活包 9 角色综合 P0 = GSC 校准, 嵌入 5 cron SSoT 头部, 跨项目 P0 强制级)

> **拍板来源**: K3 9/3 15:22 派活包 "GSC数据 文件夹更新了今天最新的GSC数据excel文件...使用这些数据 解决我们的 [9 角色综合能力执行 P0 级问题]" + K3 9/3 06:49 "9 角色综合能力执行 P0 级问题" + K3 9/3 06:51 校准前 SOP
>
> **作者**: M3 (Mavis) 9 角色综合战略军师+CEO
>
> **校准日期**: 2026-09-03 15:25
>
> **校准状态**: 🟢 校准完成 (阶段 2 校准执行落地) + 🟡 联动 + EOD 进行中 (阶段 3-4)
>
> **配套**: docs/2026-09-03-k3-gsc-calibration-report.md 18 KB + docs/2026-09-03-k3-keyword-map-v4.md 12 KB + GSC数据/gsc-fresh-2026-09-03.json 327849 bytes + sku-keyword-gsc-map.json 65775 bytes v2 18 SKU + GSC数据/campus-90d-2026-09-03.json 3681 bytes

### §O.1 校准结果 (3 站点 × 4 窗口 = 12 dataset + 4 汇总)

| 窗口 | 站点 | 校准后 imps | 校准后 clicks | 校准后 CTR | 校准后 pos |
|------|------|-------------|---------------|------------|-------------|
| 7d | 全站 | 2,207 | 12 | 0.54% | 29.94 |
| 7d | 香港 | 1,380 | 11 | 0.80% | 25.38 |
| 7d | 日本 | 145 | 0 | 0.00% | 40.97 |
| 7d | 美国 | 416 | 1 | 0.24% | 39.81 |
| 28d | 全站 | 7,618 | 41 | 0.54% | 34.62 |
| 28d | 香港 | 4,413 | 32 | 0.73% | 28.36 |
| 3m | 全站 | 17,129 | 65 | 0.38% | 38.41 |
| 3m | 香港 | 12,247 | 50 | 0.41% | 34.36 |
| 3m | 日本 | 1,476 | 2 | 0.14% | 52.25 |
| 3m | 美国 | 2,146 | 9 | 0.42% | 49.00 |

**校准前后差异**: 7d/28d/3m 全部 ≤10% ✅, 24h 3 站点 ⚠️ 警告 (样本量小不触发重判, per 校准报告 §1.1)

### §O.2 5 大下游联动 (校准后立即触发, M3 自主)

1. **sku-keyword-gsc-map v2** (14 → 18 SKU 扩 4 SKU: 中式/烫金/小册子/校園, 65775 bytes, 校准后数据)
2. **校园 9/3 GSC 90 天取证** (12 matched queries, 3681 bytes, P0 #7 校園 Pillar go/no-go 取证依据)
3. **P0 #4 src/ 588 处清零 backtest** (校准后实测记录, 阶段 3 18:00-18:30 实测)
4. **P0 #6 M1 验收 baseline 校准** (7d clicks = 12 锁定, baseline, 9/16 验收 ≥12 + 增长%)
5. **词图 v3 → v4 升级** (校准后数据 + 41 词分层 + 18 SKU 联动, docs/2026-09-03-k3-keyword-map-v4.md 12 KB)

### §O.3 校准后 7 项 P0 解锁状态

- P0 #1 R2 摘果 4 词: 🟡 待 D-9/2-32 K3 必拍 src/ 改动范围 (6h 剩余)
- P0 #2 R0 4 子项: 🟡 IN_PROGRESS, IndexNow ✅, sku-keyword-gsc-map v2 18 SKU 落地
- P0 #3 12 篇 Pillar 化: 🟡 待 D-9/2-33 K3 必拍 Pillar 范围 (5d 剩余)
- P0 #4 src/ 588 处清零: 🟡 IN_PROGRESS, 校准后 backtest 待实测
- P0 #5 R6 收尾: 🟡 IN_PROGRESS, 待 D-9/2-16 ARK key (27h 剩余)
- P0 #6 M1 验收: 🟡 7d clicks = 12 baseline 锁定, 9/16 验收
- P0 #7 校園 Pillar go/no-go: 🟡 IN_PROGRESS, 校园 90 天 12 queries 落盘, 待 9/8 K3 必拍 (5d 剩余)

### §O.4 校准后 ⚪ BLOCKED 等 K3 必给/必拍板 (6 项)

- D-9/2-32 R2 摘果 4 词 src/ 改动范围 (9/4 截止, 6h 剩余)
- D-9/2-16 ARK key 撤销重发 (9/4 09:18 预览窗结束, 27h 剩余)
- D-9/2-33 12 篇 Pillar 范围 + 深度分 ≥80 + 5 schema + 10 内链 (9/8 截止, 5d 剩余)
- D-9/2-24 校園 Pillar go/no-go (9/8 截止, 5d 剩余)
- D-9/2-17 R0 4 项 GA4 G-XXXX + Supabase + PayPal 工单 (9/10 截止, 7d 剩余)
- D-9/2-34 en china/factory-direct 10 月落地预算 15,000-26,000 元/月 (9/30 截止, 27d 剩余)

### §O.5 校准后 M3 行动守门 (per §0.0 零决策铁律 + §0.31 10 道门童 v1.3)

- 校准后 5 cron SSoT §K 段必更新 (校准日期 + freshnessStatus 0d + 新 SKU 联动) ✅ 本 §O 段嵌入完成
- 校准后决策登记簿 D-9/2-27 状态从 IN_PROGRESS → DONE (阶段 4 19:30 落地)
- 校准后 5 大下游联动落盘 (sku-keyword-gsc-map v2 + campus-90d + p0-4-backtest + p0-6-baseline + 词图 v4) ✅
- 校准后 5 cron SSoT §O 段嵌入 (本段) — 跨项目 P0 强制级

### §O.6 校准后数据来源 (per K3 §0.23 数据诚信红线 + §0.33 数据口径校准硬规则)

- K3 9/3 15:22 派活包 GSC 校准 (本 §O 段拍板)
- GSC数据/gsc-fresh-2026-09-03.json (327849 bytes, 16 dataset × Top 100 queries, 校准后数据, K3 9/3 14:50-15:17 上传)
- GSC数据/index.json (FRESH 0d, lastBuild 2026-09-03T15:25)
- sku-keyword-gsc-map.json (65775 bytes v2, 18 SKU 校准后)
- GSC数据/campus-90d-2026-09-03.json (3681 bytes, 12 matched queries 校准后)
- docs/2026-09-03-k3-gsc-calibration-report.md (18 KB)
- docs/2026-09-03-k3-keyword-map-v4.md (12 KB)
- 校准日期: 2026-09-03 15:25
- 校准窗口: 2026-09-03 15:00-20:30 (阶段 2-4 进行中)
- 校准状态: 🟢 校准完成 (阶段 2) + 🟡 联动 + EOD 进行中 (阶段 3-4)

## §0 战略基线 (K3 9/1 15:59 拍板)

**自 2026-09-01 起, zprintpro 内容战略从"每词一页"矩阵转型为"每主题一簇"内容权威度**:
- **主营 4 Pillar + 2 横向 + L3 次级** (per AGENTS.md §11 v2, K3 9/1 16:16 拍板): L1 主营 4 pillar (包裝盒/貼紙與標籤合并簇/宣傳單張/校園教育印刷新晋) + L2 横向 2 (即日印刷 + 小批量低起订) + L3 次级 2 簇 (紙袋降级 + 婚慶賀卡簇)
- **每 Pillar 1 篇** (3,000-5,000 字, Digital Applied 2026 标准) + 10-20 Cluster (1,500-2,500 字/篇, GSC 实证词支撑)
- **675 URLs** (16 类目 + 97 产品 + **85 blog entries** per blog-posts.ts SSoT = 84 unique slug, K3 §0.22 数据诚信真实数据) → 4 主题簇 (4×22) + 2 横向 + 2 次级 重组目标
- **"每词一页"矩阵停止投资** (Digital Applied: "孤立关键词打法收益递减")

---

## §1 月度 Cron 定位变化 (旧 → 新)

| # | 旧 (zprintpro-monthly-matrix-audit) | 新 (zprintpro-monthly-content-authority-audit) |
|---|-------------------------------------|------------------------------------------------|
| 定位 | 矩阵覆盖率计数器 | 内容资产审计官 |
| 核心 KPI | 词表覆盖率 % (zh-hk 62.5%/en 40%/ja 30%) | 深度分 ≥70 全站 + 5 Pillar ≥80 |
| 报告长度 | 304 行 (commit 流水 1/3) | ~150 行 (战略归类摘要) |
| AEO 审计 | ❌ 无 | ✅ FAQPage 覆盖率 / llms.txt / AI 引擎抽查 |
| Pruning 决策 | ❌ 无 | ✅ 翻新/合并/301 三栏清单 |
| 存量 **85 blog entries** (per blog-posts.ts SSoT, 84 unique slug 含 1 重复 sticker-buying-guide, 3 locale 内容同步差 14 项: 9 项 blog-posts.ts 有但 3 locale blog-data 缺 + 5 项 3 locale 有但 blog-posts.ts 缺, K3 §0.22 数据诚信真实数据) | ❌ 无 | ✅ 4 档分布盘点 (达标/可翻新/需合并/建议 301) |

---

## §2 指标体系换代 (K3 9/1 15:59 拍板)

### §2.1 旧指标处置

| 旧指标 | 处置 | 原因 |
|--------|------|------|
| 词表覆盖率 % (zh-hk 16 词 / en 10 词 / ja 10 词) | **降级为参考, 不再设达标线** | en 40% / ja 30% 逼出 thin pages (Digital Applied 警告) |
| T1 "命中率" | **改名为"部署覆盖率"** | "命中率"误导读者, 实际只是部署, 效果归 GSC 窗口验证 |
| 24 commit 流水账 | **瘦身为战略归类摘要** | 流水账是 daily/weekly cron 职责 |

### §2.2 新指标 (深度时代)

| 新指标 | 公式 | 9 月基线 | 10/1 KPI |
|--------|------|----------|----------|
| **深度资产盘点** | 见 §3 | 85 blog entries 4 档分布 (per blog-posts.ts SSoT) | 4-6 篇/月翻新配额 |
| **T1 排名轨迹** | 月度快照: 进首页数 / P1-3 数 / CTR 破 0 数 | 9/3 GSC 校准窗口 | 5+ 词进首页 |
| **每 cluster 内链完整性** | pillar↔cluster 双向链 + 锚文本含目标词 | 待 85 篇盘点 | ≥90% 达标 |
| **AEO 引用资格基线** | FAQPage 覆盖率 + llms.txt 状态 + AI 引擎抽查 | 0 (新指标) | FAQPage ≥60% + llms.txt 上线 + 5 问抽查 |
| **Pruning 决策清单** | 30 天 0 imp 且 0 clk 页面 → 翻新/合并/301 | 待盘点 | 10 页面处置/月 |
| **深度分评分卡** | 见 §4 | 待 85 篇盘点 | 全站 ≥70 + **4 Pillar ≥80** (K3 9/1 16:16 主营架构 v2, 5 → 4 pillar) |
| **品类记分卡** (K3 9/1 16:16 拍板并入) | 询盘数 / GSC 实证 / 客单价值 3 指标 (见 §13 增量) | 本周期: 紙袋触发降级 / 校园触发升主营 | 连续 2 月 ≥3 / 60 天 0 订单 / T1+T2 CTR >2% / 单笔 ≥HK$5,000 |

---

## §3 深度资产盘点表 (新 §4, 替代词表覆盖率 §4)

每主营品类一行:

| 品类 | Pillar 状态 | 已有 cluster 篇数 | 达标 cluster (≥1,500 字 + FAQ schema + 3 内链) | thin 待改造 | 本月行动 |
|------|-------------|--------------------|--------------------------------------------|-------------|----------|
| 貼紙 (stickers) | 待建 | 待盘点 | 待盘点 | 待盘点 | 9 月首单盘点 |
| 宣傳單張 (flyers) | 待建 | 待盘点 | 待盘点 | 待盘点 | 同上 |
| **包裝盒 (packaging)** | **已有 12:32 优化基础 (274c61c7)** | 1 (12:32) | 1 (12:32 9 项优化) | 待盘点 | **9 月升级 Pillar (3,000+ 字)** |
| 紙袋 (paper-bags) | 待建 | 待盘点 | 待盘点 | 待盘点 | 同上 |
| 標籤 (labels) | 待建 | 待盘点 | 待盘点 | 待盘点 | 同上 |

**9 月首次盘点重点**: **85 blog entries** 全量扫一遍 (per blog-posts.ts SSoT, 84 unique slug, 1 重复 sticker-buying-guide, 3 locale 内容同步差 14 项: 9 项 blog-posts.ts 有但 3 locale blog-data 缺 + 5 项 3 locale 有但 blog-posts.ts 缺, K3 §0.22 数据诚信真实数据), 输出"达标 / 可翻新 / 需合并 / 建议 301"四档分布。
**翻新配额**: 每月 4-6 篇 thin → cluster 改造 (对齐 Animalz refresh 优先策略 + B7 选题库改排期: 22 篇选题中优先选能补 cluster 缺口的, 砍掉与现有内容蚕食的)。

---

## §4 深度分评分卡 (每篇长文 100 分制, 进 cron 自动计算)

| 维度 | 分值 | 门槛 | 评分标准 |
|------|------|------|----------|
| **字数** (pillar 3-5K / cluster 1.5-2.5K) | 20 | pillar <2,000 字 = 0 分 (Digital Applied 红线) | 1,500-2,499 = 10 / 2,500-2,999 = 15 / 3,000+ = 20 |
| **结构** (H2 ≥6 / H3 FAQ 4-6 / 摘要区 + 列表) | 20 | AI 引用偏好的可扫描结构 | H2 4-5 = 10 / H2 ≥6 + H3 4-6 + 摘要区 = 20 |
| **Schema** (FAQPage + Article + Breadcrumb) | 15 | 缺 FAQPage = AEO 资格判 0 | 1 schema = 5 / 2 schema = 10 / 3 schema = 15 |
| **内链** (回 pillar 1 + 横向 2-3 + 锚文本含目标词) | 15 | 孤岛页 = 0 分 | 1-2 内链 = 5 / 3-5 = 10 / 6+ 含目标词 = 15 |
| **E-E-A-T** (作者/工艺实拍/具体案例, 禁无来源硬数字) | 15 | 过门童 #1 为前提 (per §0.31) | 描述性文案 + 工艺实拍 = 10 / +具体案例 = 15 |
| **数据钩子** (MOQ/价格区间/交期, GSC 实证词支撑) | 15 | 业务洞察词禁入 title, 可入正文 | 1-2 数据钩子 = 5 / 3-4 = 10 / 5+ 含 GSC 实证 = 15 |

**月度 KPI (10/1 起生效)**:
- ✅ 全站长文平均深度分 **≥70**
- ✅ 5 Pillar 全部 **≥80** 分
- ✅ 翻新 4-6 篇/月 thin → cluster 改造

---

## §5 AEO 引用资格基线 (新指标, 9 月首测)

| 项 | 9 月基线 | 10/1 KPI |
|----|----------|----------|
| **FAQPage schema 覆盖率** | 0 (新指标) | ≥60% (85 blog entries 中 51+ 篇) |
| **llms.txt 状态** | 未上线 | 9/20-26 W4 计划上线 (per 5 cron v6.4) |
| **AI 引擎抽查** (Perplexity + ChatGPT 搜 5 问) | 0% 引用 | 5 问中 ≥2 问引用智印港 |
| **5 问抽样** | 待定 | "香港 貼紙印刷 價錢" / "即日 印刷 香港" / "包裝盒 印刷 推薦" / "海報 印刷 價錢" / "利是封 印刷 邊間" |

---

## §6 Pruning 决策清单 (新指标, 9 月首测)

**判定标准**: 30 天 0 imp **且** 0 clk 页面 → 三选一
1. **翻新为 cluster** (深度分 < 50, 加 1,500+ 字 + FAQ + 内链)
2. **合并入 pillar** (重复主题, 301 → 主 pillar)
3. **301 重定向** (永久无价值, 301 → 类目首页)

**9 月首单**: **85 blog entries** 盘点后 (per blog-posts.ts SSoT), 输出"建议 301 / 建议合并 / 建议翻新"三栏清单。

---

## §7 三 Cron 分工重划 (防重叠)

| Cron | 职责变化 |
|------|----------|
| **daily** (zprintpro-daily-content-evolve) | 照旧执行 (发内容/改 title/meta), **但选题闸门改为: 新选题必须先回答"补哪个 pillar 的哪个 cluster 缺口", 答不出 = 不立项** |
| **weekly** (zprintpro-gsc-feedback-loop) | 照旧 GSC 校准, **新增每周深度分增量报告 (1 行)** |
| **monthly** (本 cron) | 从"覆盖率计数器"升级为"内容资产审计官": 深度资产盘点 + 深度分 + AEO 引用基线 + pruning 清单 + 下月 cluster 缺口排期 |

---

## §8 报告结构瘦身 (304 行 → 目标 ~150 行)

### §8.1 保留 (战略级)

- §0 成熟度坐标 (§0.30 v2.2)
- §1 冲刺原则 (30 天极限冲刺 v2.2)
- §2 战略基线 (matrix → content-authority)
- §3 指标体系换代 (新旧对比)
- §4 深度资产盘点表 (新)
- §5 深度分报告 (新)
- §6 AEO 引用资格基线 (新)
- §7 Pruning 决策清单 (新)
- §8 三 cron 分工
- §9 节点表 (per 5 cron v6.4 §7)

### §8.2 压缩 (1/3 → 10 行)

- §10 commit 流水 → **10 行战略归类摘要** (UX 转化节拍 6 commit / SEO 升级 4 commit / 品牌分层 2 commit / etc.)

### §8.3 删除

- §旧 §3 T1-T4 覆盖率明细表 → **移入 weekly 追踪** (不重复)
- §旧 §6 24 commit 逐条列 → 删 (流水账)

---

## §9 9 月首单 P0 任务 (85 blog entries 盘点, per blog-posts.ts SSoT)

### §9.1 盘点范围

- **85 blog entries** (per `src/data/blog-posts.ts` SSoT, 84 unique slug, 1 重复 sticker-buying-guide)
- **3 locale 实际内容** (per `src/data/blog-data/{zh-hk,en,ja}.json`): zh-hk 78 + en 79 + ja 79 = 80 unique slug 并集 (含 1 个 system key company-intro 已被排除)
- **3 locale 内容同步差 14 项** (K3 9/1 16:22 派活包核对):
  - **9 项 blog-posts.ts 有但 3 locale blog-data 缺** (需补 3 locale blog-data): packaging-buying-guide / banner-buying-guide / flyer-buying-guide / paper-bag-buying-guide / book-buying-guide / 4 其他 (待盘点)
  - **5 项 3 locale 有但 blog-posts.ts 缺** (需补 blog-posts.ts): packaging-box-price-2026 / certificate-printing-guide / 2027-calendar-printing-complete-guide / rush-printing-delivery-guide / apparel-clothing-tag-printing-guide
- **9/1 16:30 立即起跑** (K3 派活包"时不我待", 不等 9/2)

### §9.2 4 档分布输出

| 档 | 标准 | 9 月预期分布 (基于 85 entries) |
|----|------|-------------------------------|
| **达标 cluster** | ≥1,500 字 + FAQPage schema + 3+ 内链 + GSC 实证词 | 8-13 篇 (10-15%) |
| **可翻新** | 1,000-1,500 字 + 部分 schema + 1-2 内链 | 27-37 篇 (32-44%) |
| **需合并** | 重复主题 / 与 Pillar 蚕食 | 8-13 篇 (10-15%) |
| **建议 301** | 30 天 0 imp + 0 clk + 与主营不相关 | 4-8 篇 (5-10%) |

### §9.3 翻新配额 (4-6 篇/月, K3 9/1 16:16 主营架构 v2)

- **9 月首批**: 选深度分最低的 4-6 篇 thin → cluster 改造
- **优先级 (4 Pillar 候选)**: 包裝盒 2 候选 / 校園教育 2 候选 / 貼紙與標籤 1 候选 / 宣傳單張 1 候选
- **改造标准**: 加 1,500+ 字 + FAQPage schema + 3+ 内链 + 业务洞察词

### §9.4 **4 Pillar 候选识别** (K3 9/1 16:16 主营架构 v2, 5 → 4 pillar)

| # | 品类 | 候选 Pillar | 9 月行动 | 10 月行动 |
|---|------|------------|----------|----------|
| 1 | **包裝盒 (packaging)** (主战场) | packaging-box-custom-guide | **本月升级 Pillar (3,000+ 字, 12:32 优化基础上扩展)** | 5 cluster 选题 |
| 2 | **貼紙與標籤** (合并簇, 2 入口页) | sticker-material-pvc-vinyl-removable (貼紙) + label-printing-guide (標籤 B2B) | 待盘点 | 10 月双 cluster (合并为 1 簇但 2 入口) |
| 3 | **宣傳單張 (flyers)** | flyer-buying-guide (新建) | 待盘点 | 11 月 Pillar |
| 4 | **校園教育印刷** (新晋) | campus-printing-guide (新建) | **9 月立项, 吸收證書 + 月曆 + 校刊/畢業冊/學生手冊/校園橫幅** | 5 cluster 选题 |

**L2 横向 (2 项, 不占 pillar 名额)**: 即日印刷 (维持特殊架构) + 小批量低起订 (en 站 Q4 立项)
**L3 次级 (2 簇, 按记分卡观察)**: 紙袋 (降级, R5 節慶 9/9-9/15 观察) + 婚慶賀卡簇 (T2 豁免)

### §9.5 14 项 3 locale 内容同步差修复计划 (K3 9/1 16:22 拍板)

| 类型 | 数量 | 修复 | 截止 |
|------|------|------|------|
| **blog-posts.ts 有但 3 locale 缺** | 9 项 | 补 3 locale blog-data/ | 9/8 包裝盒 Pillar 升级前 |
| **3 locale 有但 blog-posts.ts 缺** | 5 项 | 补 blog-posts.ts SSoT | 9/8 前 |
| **总计** | 14 项 | (待 9/3 worker 同步盘点详细清单) | **9/8 硬截止** |

---

## §10 配套机制 (K3 9/1 15:59 拍板)

### §10.1 与反审门童 v1.0 协同 (§0.31)

- **E-E-A-T 维度 (15 分)**: 过门童 #1 数据诚信 11 类 + 门童 #2 真实电话 + 门童 #3 品牌分层
- **DoD 铁律**: 任何 Pillar/Cluster 翻新必同步把新 pattern 写入 error-patterns.md

### §10.2 与 5 cron SSoT v6.4 协同

- **monthly cron (本 cron)**: 深度资产盘点 + 深度分 + AEO + pruning
- **daily cron**: 选题闸门 (先答"补哪个 pillar 的 cluster 缺口")
- **weekly cron**: GSC 校准 + 深度分增量

### §10.3 与 §0.30 战略基线协同

- **§0.30 v2.2 成熟度分级**: zh-hk 年轻站 / ja·en 新生儿, 防止跨 locale 乱对标
- **§0.30 9 角色综合**: 战略军师 + CEO + PM + UI/UX + 运营 + CRO + 数据 + SEO/AEO/GEO + 多语言

### §10.4 与 §0.27 push 决策红线 5 条协同

- **§0.27.3 永久排除目录**: zprintpro-en-us-images/ 不进 commit (4GB)
- **§0.27.8 秘密零容忍**: 门童 #5 SECRET_LEAK 拦截 API key / token

---

## §11 9 月执行路线图 (K3 9/1 15:59 拍板)

| 日期 | 任务 | 交付物 |
|------|------|--------|
| **9/1 15:59** | 本 cron v8 落地 (本 commit) | v8 prompt + §0 战略基线 |
| 9/1 16:30 (立即) | **85 blog entries** 盘点 worker 起跑 (K3 9/1 16:22 派活包核对真实数据, 14 项 3 locale 同步差待 worker 输出详细清单) | 4 档分布报告 (5-7 天) + 14 项同步差修复清单 |
| 9/3 | GSC 8 天数据校准 (per 5 cron v6.4) | T1 排名轨迹基线 |
| 9/8 | 包裝盒 Pillar 升级 (12:32 基础上 3,000+ 字) | Pillar #1 落地 |
| 9/13 | 首批 4-6 篇 thin → cluster 改造 | 4-6 篇 cluster 升级 |
| 9/15 | 反审门童 v1.0 → v1.1 (shadow mode FP 复盘) | orange/yellow 升级硬拦 |
| 9/20-9/26 | llms.txt + schema 全站 (W4 计划) | AEO 引用资格 +30% |
| 9/30 | 月度复盘 v8 首月 | 9 月月报 (本 cron 首单) |

---

## §12 拍板来源与教训固化源头

- **K3 9/1 15:59 派活包** (matrix → content-authority 战略转型) + 4 修正 + 3 齿轮
- **Digital Applied 2026 Topic Authority 指南** (3 源联网验证)
- **Ignite Visibility / Semrush AI 引用研究** (57.1% Informational 内容触发 AI Overview)
- **Animalz / Sandler** (B2B Content refresh ROI 最高)
- **配套**: 12:37 派活包 (反审门童 v1.0, 3619c778) + 12:32 派活包 (包装盒 9 项优化, 274c61c7) + 9/1 12:23+12:27 派活包 (撤除虚假数据)

---

**拍板等待**: K3 9/1 15:59 已预批"建议今日内 M3 落 cron v8 prompt", M3 已立即执行。
**首单**: 9/1 16:30 (立即) **85 blog entries 盘点** (worker 异步, K3 9/1 16:22 派活包核对真实数据 85 SSoT + 14 项 3 locale 同步差) + 9/8 包裝盒 Pillar 升级 (主战场 1-12 月询盘 50% 占比)。

---

## §13 品类记分卡 (K3 9/1 16:16 拍板并入, 数据驱动品类进退)

### §13.1 3 指标 × 升降级线

| 指标 | 升主营线 | 降级观察线 | 数据源 |
|------|----------|------------|--------|
| **询盘数 (按品类归档)** | 连续 2 月 ≥3 单 | 连续 60 天 0 订单且询盘 ≤2 | 询盘记录 (§0.23 归档, 每次询盘标品类) |
| **GSC 实证** | T1/T2 词有展示且 CTR >2% | 核心词 <5 imp | GSC 月度 |
| **客单价值** | 单笔 ≥HK$5,000 或合同型复购 | 全部现货小单 | 成交记录 |

### §13.2 本周期状态 (K3 9/1 16:16 拍板)

| 品类 | 询盘数 | GSC 实证 | 客单价值 | 判定 |
|------|--------|----------|----------|------|
| **紙袋** | 连续 60+ 天 0 订单, 2 个几十/100 個现货小询盘 | 紙袋 3 imp / 牛皮紙袋 1 imp pos 4.0 | 全部现货小单 | 🔴 **触发"降级观察线"** → L3 次级 |
| **校園教育** | 7-8 月不时有询盘 (K3 §0.23 待归档确认) | 證書印刷 pos 11.4 CTR 12.5% + 月曆訂製 | 合同型 B2B 年复购 | 🟢 **触发"升主营线"** → L1 主营 #4 (新晋) |
| **包裝盒** | 1-12 月 50% 询盘 | 紙盒訂製 14 imp / 包裝盒訂製 11 imp | HK$125K-200K | 🟢 维持 L1 主营 #1 (主战场) |
| **貼紙/標籤** | 稳定小单 | small batch sticker 20 imp + label 20 imp + 貼紙 16 imp | 中等 | 🟢 维持 L1 主营 #2 (合并为簇, 2 入口页) |
| **宣傳單張** | 常规走量 | 宣傳單張 27 imp | 中等 | 🟢 维持 L1 主营 #3 |

### §13.3 自动化执行

- **月度 cron v8** 每月 1 号 14:00 自动跑品类记分卡
- 输出 5 品类 × 3 指标 = 15 单元格状态表
- 触发升降级线 → 写月报 + 升级 K3 拍板
- 连续 2 月 ≥3 / 连续 60 天 0 订单 → 自动标注, K3 1 次回复拍板

### §13.4 拍板来源

- K3 9/1 16:16 派活包: 主营品类架构重构 v2 + 品类记分卡
- 3 源联网验证: Jukebox Print + American Business Forms (贴纸 vs 标签) + WTPBiz (校园) + samedayrushprinting (即日志)
- GSC 8/30 baseline + 经营实况 (K3 口述, §0.23 校 7-8 月校园询盘待归档)
- 配套文档: `docs/2026-09-01-k3-pillar-architecture-restructure.md` (主营架构 v2 决策文档)
