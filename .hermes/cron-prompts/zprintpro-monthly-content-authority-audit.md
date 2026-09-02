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
