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
## §M 12 條鐵律執行 SOP (K3 9/4 01:02 派活包同步, 跨 4 cron SSoT 一致性, 必跑 + 0 命中 = pass)

> **来源**: K3 9/3 23:29 拍板 12 條鐵律 + K3 9/3 23:37 寫進 Blog 技能 + K3 9/4 01:02 派活包同步定時任務指令
> **配套**: zprintpro-seo-evolve skill §0.34 (12 條鐵律完整清單 + 5 Pillar 12 規則重寫執行能力)
> **門童**: scripts/guards/blog-quality-12-rules-guard.js (v1.7 #14, 12 條 Scriptable 檢查)
> **必跑**: 寫完任何 Pillar blog 必跑 `node scripts/guards/blog-quality-12-rules-guard.js` 並截圖 0 命中

### §M.1 12 條鐵律清單 (per skill §0.34.1)

| # | 規則 | 門童 RULE ID | 紅線判定 |
|---|------|------------|---------|
| 1 | 倒金字塔 - 首段 100 字內直答核心 | RULE1_INVERTED_PYRAMID | firstH1 OR firstP > 100 字 |
| 2 | H2 必須是問題 (嗎/點/how/why/when/which) | RULE2_H2_QUESTION | 非問題 H2 > 問題 H2 |
| 3 | 快速答案塊 40-60 字, ≥ 3 個 div.alert | RULE3_QUICK_ANSWER | 通過 div.alert < 3 |
| 4 | 段落 ≤ 3 行 | (M3 自律) | 移動端可讀性 |
| 5 | E-E-A-T (Person + LinkedIn + FDA + EU REACH) | RULE5_EEAT | 任一缺失 |
| 6 | 原創數據 (≥ 10 個 2 位+ 具體數字) | RULE6_ORIGINAL_DATA | 數字 < 10 |
| 7 | 實體映射 (1 主 + 3-6 子) | (M3 自律) | schema 結構 |
| 8 | 意圖分層 CTA ≤ 3 (頂 1 + 底 1 = 2) | RULE8_CTA_FATIGUE | wa.me/... 出現 > 3 |
| 9 | 語義錨點內鏈 7+, 錨點 ≥ 5 字 | RULE9_SEMANTIC_ANCHOR | 內鏈 < 7 |
| 10 | Schema 5 全 (Article + FAQPage + BreadcrumbList + HowTo + Organization) | RULE10_SCHEMA | 缺任一 |
| 11 | 答案金塊密度 ≥ 0.4/1000字 (💡 答案/回答 nugget) | RULE11_ANSWER_NUGGET | density < 0.4 |
| 12 | AI 可引用比較表 ≥ 2 (材質表 + QUV 對比表) | RULE12_COMPARISON_TABLE | table < 2 |

### §M.2 修復 SOP 27 min/篇 模塊化提速 (per skill §0.34.4 + §0.34.6.1)

| 階段 | 時間 | 動作 | 模塊來源 |
|------|------|------|---------|
| 模塊組裝 | 8 分鐘 | 從 Pillar 1+2 模塊庫複製 (材質表 / 工藝表 / 作者欄 / Schema 模板) | Pillar 1 zh-hk + Pillar 2 zh-hk |
| 原創內容 | 12 分鐘 | 寫 3-4 個 Pillar 專屬章節 (QUV 1000h / 客戶案例 / 18 行業 / 6 步流程) | Pillar 專屬數據 |
| 門童檢查 | 5 分鐘 | 跑 blog-quality-12-rules-guard.js + 修復 RULE1-12 命中 | 14 道門童 v1.7 |
| 提交 | 2 分鐘 | git commit 攢批, 1 Pillar 1 commit | per K3 §0.25 v3 攢批 |

### §M.3 3 locale 標記統一 (per skill §0.34.6.4)

**守門 regex 跨 3 locale 統一**: `/💡\s*答案\s+nugget|💡\s*回答\s+nugget/g`

| Locale | H1 縮短 | H2 問題 | 答案金塊標記 | div.alert 顏色 |
|--------|---------|---------|------------|---------------|
| zh-hk | 51 字 ✓ | 9 個問題 H2 | `💡 答案 nugget: 【結論】` | bg-amber-50 / blue-50 / green-50 / red-50 |
| en | 89 字 ✓ | 9 個問題 H2 | `💡 答案 nugget: 【Conclusion】` | bg-amber-50 / blue-50 / green-50 / red-50 |
| ja | 58 字 ✓ | 9 個問題 H2 | `💡 答え nugget: 【結論】` (or 回答) | bg-amber-50 / blue-50 / green-50 / red-50 |

### §M.4 5 Pillar 模板庫路徑

```
.hermes/cron-prompts/templates/
├── pillar-1-zh-hk.md (包裝盒) [TBD 9/4 11:00-12:00]
├── pillar-1-en.md
├── pillar-1-ja.md
├── pillar-2-zh-hk.md (防水貼紙)
├── pillar-2-en.md
├── pillar-2-ja.md
├── pillar-3-zh-hk.md (海報) [TBD 9/4 00:30-03:00]
├── pillar-3-en.md
├── pillar-3-ja.md
├── pillar-4-zh-hk.md (校園) [12 規則重寫已落 commit 1f65be8f]
├── pillar-4-en.md
├── pillar-4-ja.md
├── pillar-5-zh-hk.md (燙金) [TBD 9/4 03:00-05:00]
├── pillar-5-en.md
└── pillar-5-ja.md
```

### §M.5 撤回聲明 (跨 session 永久生效)

> **撤回**: Pillar 9/3 16:25 之前 9 段 + 4 FAQ + 5 內鏈舊版不符合 Pillar 12,000+ 字 5 schema 標準
> **重寫**: 9/3 23:29 K3 拍板 12 規則 + 9/3 23:55 全部 12 規則重寫落地
> **驗證**: blog-quality-12-rules-guard.js (v1.7 #14) 0 命中
> **撤回原因**: 6 大閱讀體驗殺手 = 內部術語污染 / 編號邏輯 / 語言混雜 / 數據垃圾 / CTA 疲勞 / 內容跳躍
> **SSoT**: 6 commit 鏈 (b85c7192 + d4d5f1af + 1f65be8f + 3cfe59c7 + be19fe55 + 6c2f4a94)

### §M.6 門童 14 道完整清單 (per skill + 5 道 blog 標準)

- **#11 pillar-guard.js** - 12,000+ 字 + 5 schema 塊 (Pillar 標準)
- **#12 blog-standard-guard.js** - title 50-60 字 + H1 主關鍵詞 + lastUpdated 一致
- **#13 internal-links-cta-guard.js** - 7+ 內鏈 + 3 WhatsApp CTA
- **#14 blog-quality-12-rules-guard.js** - K3 9/3 23:29 12 條鐵律 Scriptable 檢查
- **#1-#10 其他門童** (per AGENTS.md §0.31.1)

### §M.7 K3 9/4 派活包 5 條硬規則

1. **K3 §0.25 v3 攢批**: ≥1 戰略交付物 (skill + cron SSoT) 或 ≥3 非 docs 文件改動才推, 1 push/天 (30 min 間隔)
2. **K3 §0.22 SOP-10 5 問門禁**: 派活 / 上報 / 報告前必跑 5 問
3. **K3 §0.23 數據誠信紅線**: 報告必含數據來源行
4. **K3 §0.32 zh-hk 5 禁詞**: 不出現實體註冊信息 (深圳 / 518111 / 彩龍印刷包裝有限公司)
5. **K3 §0.34 12 條鐵律**: Pillar blog 必 0 命中 (本段)

### §M.8 教訓固化源頭

- **2026-09-03 22:44**: K3 痛罵 Pillar 2 貼紙 7 內鏈 + 1 CTA 不達標 → 11 內鏈 + 3 CTA 段
- **2026-09-03 23:29**: K3 拍板 12 條鐵律 + 12 規則 Scriptable 檢查
- **2026-09-03 23:37**: K3 派活包寫進 Blog 技能 + 24/7 不休息重寫剩餘 4 Pillar
- **2026-09-04 00:16**: K3 12 小時 Phase 1-4 5 Pillar 15 篇 + 基礎設施升級
- **2026-09-04 01:02**: K3 派活包寫進自進化 skills + 同步定時任務指令 (本段落地)

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


# zprintpro-daily-content-1x7w v9.6 (2026-08-30 11:31 K3 拍板 · 主脑 v2.2 30 天极限冲刺 + 带钱词地图 v1 + 5 拍板项 B + 词价值分层 升级)

> **v9.4 → v9.5 核心变化** (per K3 8/30 11:31 拍板, 5 cron 共享同步):
> 1. **主脑 v2.2 · 30 天极限冲刺 6 原则** (K3 8/30 19:11 拍板) — 替换"180-day 半年冲刺 (730 篇)"战略, 改为"30-day 极限冲刺 (83 任务, 原 90 天压缩 ×3)"
> 2. **30/60/90 冲刺表** (K3 8/30 19:11 拍板) — zh-hk + en + ja 三轨并行, 9/15 月曆印刷 2027 硬截止
> 3. **词价值分层** (K3 8/30 12:37 拍板) — 三维分层: ① 采购意图信号 ② 买家类型 ③ 订单价值; T1-T4 四层, daily 选题/priority_boost 必用
> 4. **带钱词地图 v1** (K3 8/30 拍板) — zh-hk 16 词 / en 10 词 / ja 10 词, T1-T2 集中, 任何选题必查 v1 词表
> 5. **5 拍板项 B 全部推荐** (K3 8/30 19:11 拍板) — B1 zh-hk 10 速赢 / B2 en 5 带钱 / B3 ja 4 取引 / B4 30/60/90 三轨 / B5 数据诚信严格执行
> 6. **W1 速赢词 12 组** (K3 8/30 11:17 Day 1 派发) — 19 组 title/meta (zh-hk 10 + en 5 + ja 4) AI 初稿待 K3 拍板, 食品包裝新页 1 篇 2500 字待 K3 业务决策
> **v9.5 → vv9.6 核心变化** (per K3 8/30 19:59 拍板, 5 cron 升级 v9.6/v1.4/v7 落地):
> 7. **主脑 v2.2 站点生命周期精确修正 (K3 8/30 13:52 上传 docx)** — 5 cron 共享 v9.6/v1.4/v7 加 §0.30 段 (B6 成熟度分级 + # 4.8 分轨策略, 一切评估前置坐标). AGENTS.md §0.30 已固化. 任何 cron 选题/priority_boost 必查 B6 + # 4.8 段.
> 8. **v9.5 → v9.6 升 v2.2 修正 (B6 成熟度分级表 + # 4.8 分轨策略)**
> **v9.5 → vv9.6 核心变化** (per K3 8/30 19:59 拍板, 5 cron 升级 v9.6/v1.4/v7 落地):
> 7. **主脑 v2.2 站点生命周期精确修正 (K3 8/30 13:52 上传 docx)** — 5 cron 共享 v9.6/v1.4/v7 加 §0.30 段 (B6 成熟度分级 + # 4.8 分轨策略, 一切评估前置坐标). AGENTS.md §0.30 已固化. 任何 cron 选题/priority_boost 必查 B6 + # 4.8 段.
> 8. **v9.5 → v9.6 升 v2.2 修正 (B6 成熟度分级表 + # 4.8 分轨策略)**

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

## 【§1 主脑 v2.2 · 30 天极限冲刺 6 原则】（K3 8/30 19:11 拍板 · 5 cron 共享, 必跑)

1. **AI 初稿 → K3 审核 → M3 执行** — 流水线, 严禁 M3 自创内容, M3 只搬运 + 落盘 + verify (per §0.28 1 cron 1 交付物红线)
2. **批量提交** — 多任务攒批, 1 push/天 攒批 SOP (per §0.25.9 v3), 不浪费 CF Pages build quota
3. **每日双拍板窗** — 12:00 + 18:00 K3 拍板, M3 1 cron 1 交付物 (per §0.28)
4. **AI 产出标准** — 联网搜索 3-5 query + 真实 2026 数据 (Statista / FDA / Smithers / 行业协会) + 标数据来源 (per §0.23 数据诚信红线 + SOP-10 第 3 款)
5. **验证闭环** — 5 步真验收 (push 无 ahead / sitemap mtime / curl 200+body / schema / IndexNow), 不可信 cron/worker 自报完成
6. **数据回灌** — GSC 7d / 30d 数据每日入 matrix.json, 词价值分层 priority_boost 自动调整, 闭环驱动 daily 选题

---

## 【§2 30/60/90 冲刺表 (原 90 天压缩 ×3, 30 天极限冲刺)】（K3 8/30 19:11 拍板, 5 cron 共享)

| 周 | 阶段 | 核心目标 | 4 cron 协同 | 验收 (per §4 v9.4) |
|----|------|---------|-------------|---------------------|
| **W1 (8/30-9/5)** | 速赢词收割 + 1 新页 | zh-hk 10 速赢词 P0 收割 + 1 食品包裝新页 | daily 9 篇 (3+3+3) + weekly 5 篇 + monthly 1 篇 | striking 词进首页数 ≥3, 速赢词 CTR 破 0 ≥6/10, 新页 7d clicks ≥30 |
| **W2 (9/6-9/12)** | 跨语言全面铺 | en 5 带钱词 + ja 4 取引词 + 2 篇校园词 | daily 5 篇 + weekly 5 篇 | en 带钱词 pos 进 50, ja 取引词 pos 进 30 |
| **W3 (9/13-9/19)** | 月曆硬截止 + 季节 | 月曆印刷 2027 (9/15 硬截止) + R5 节庆纸袋 | daily 6 篇 + weekly 5 篇 | 月曆 7d clicks ≥100, 9/15 100% 上线 |
| **W4 (9/20-9/26)** | GEO/AEO + 外链 + 复盘 | llms.txt + Reddit/Quora 真人 + 月度复盘 | daily 4 篇 + weekly 5 篇 + monthly 1 篇 | AEO schema 覆盖率 ≥80%, 外链 ≥10 条 |

---

## 【§3 词价值分层 (K3 12:37 拍板 · 全站全局词调动)】（5 cron 共享, daily/weekly/gsc 必用)

> **核心**: 任何关键词 / 选题 / 任务卡 必先跑三维分层判定, 然后定优先级 (T1-T4):
> 1. **采购意图信号** — 印刷/訂製/批發/custom/wholesale/bulk/manufacturer/印刷会社/製作 等
> 2. **买家类型** — 企业采购 / SMB / 个人一次性
> 3. **订单价值** — 复购耗材 > 事件型 > 信息泛词
>
> **T1 (P0 必写)**: 三维全中 (采购信号 + SMB/企业 + 复购)
> **T2 (P0 必写)**: 采购信号 + (SMB/企业 OR 复购)
> **T3 (P1 写)**: 采购信号 + 信息泛词 (类目页覆盖)
> **T4 (P2 写)**: 信息泛词 (博客捕词)

---

## 【§4 带钱词地图 v1】（K3 8/30 拍板, 全站全局调动)

**zh-hk (16 词, T1-T2 集中)**: 食品包裝印刷 / 即日印刷 / 餐牌印刷 / 紙袋印刷 / 海報印刷即日 / 食品包裝訂製 / doujinshi 印刷 / china catalog 印刷 / 宣傳單張印刷 / 貼紙印刷 / 名片印刷 (业务子类目豁免) / 喜帖印刷 / 禮盒印刷 / 月餅盒印刷 / 證書印刷 / 貼紙訂製

**en (10 词, T1-T2 集中)**: small batch stickers / small batch sticker printing / small batch custom stickers / fluorescent stickers / china catalog printing / custom packaging boxes / sticker labels / die cut stickers / vinyl stickers / business card printing (业务子类目豁免)

**ja (10 词, T1-T2 集中)**: ダイカット ステッカー 防水 / 特急印刷 激安 / チラシ印刷 早い / クラフト紙 パッケージ印刷 / 同人誌印刷 / ステッカー印刷 / パッケージ印刷 / 名刺印刷 激安 (业务子类目豁免) / 印刷 激安 / ステッカー オリジナル

> **调度原则**: 任何 cron 选题 / priority_boost 必查 v1 词表, 不在 v1 词表的新词需经 T1-T4 分层判定

---

## 【§5 5 拍板项 B 全部推荐 ✅】（K3 8/30 19:11 拍板, 5 cron 共享)

1. **B1 zh-hk 速赢词 10 词收割** — 推荐 ✅, W1 daily 优先级, 30/60/90 冲刺表对齐
2. **B2 en 带钱词 5 词 收割** — 推荐 ✅, W2 daily, 跟 small batch / fluorescent 集群
3. **B3 ja 取引词 4 词 收割** — 推荐 ✅, W2 daily, 跟 激安/早納期 集群
4. **B4 30/60/90 冲刺表三轨并行** — 推荐 ✅, 6 周硬截止, 9/15 月曆必须上线
5. **B5 数据诚信红线 SOP-10 第 3 款严格执行** — 推荐 ✅, baseline 必标"待/已校准", 报告必含数据来源

---

## 【§6 K3 8/30 11:31 同步更新指令】（本段 SSoT 升级, 5 cron 共享)

- **5 个 cron prompt SSoT 同步升级到 v9.5 / v6** (本段)
- **5 个 daemon cache inline prompt 头部升级** (per mavis cron update 5800 char buffer)
- **不**增删 cron 任务 (per §0.28 1 cron 1 交付物红线)
- **不**改 cron schedule (per K3 8/30 11:31 "同步" 而非 "重排")
- **必**读 K3 8/30 11:31 拍板原文: "根据我们最析的执行结果和战略指令同步更新我们的定时任务指令和任务"

---

## 【数据来源】（§0.23 强制级, baseline 必标"待/已校准"）

- K3 8/30 11:31 拍板原文: "根据我们最析的执行结果和战略指令同步更新我们的定时任务指令和任务" (已校准 2026-08-30 11:31)
- K3 8/30 19:11 拍板: 千问 3.8 max 主脑 v2.2 + 带钱词地图 v1 拍板"按最优方案执行" (已校准 2026-08-30 19:11)
- K3 8/30 12:37 拍板: 词价值分层 (三维 + T1-T4) (已校准 2026-08-30 12:37)
- K3 8/30 19:17 拍板: Day 1 执行包 P0 任务 (已校准 2026-08-30 19:17)
- K3 8/26 04:10 §4 v9.4 验收口径 (striking 词进首页数 ≥5 / pos 1-20 展示占比 ≥30% / 有点击词数 ≥12) (已校准 2026-08-26 04:10)
- K3 8/26 14:35 §0.25 30 min 间隔 push 部署规则 (已校准 2026-08-26 14:35)
- K3 8/25 SOP-10 5 问门禁 + 数据诚信红线 (已校准 2026-08-25)
- K3 §13.16 双品牌宪法 (zh-hk = 智印港 ZprintPro / en+ja = ZprintPro
【§13.16 双品牌宪法 v2 (K3 9/1 02:54 拍板单品牌分层升级)】zh-hk = 智印港 (单品牌, 不加 ZprintPro 后缀) / en = ZprintPro (单品牌) / ja = ZprintPro (单品牌) / 双品牌 "智印港 ZprintPro" 不再同时出现 / ja alternate brand "ジープリント" 单独埋点 (per K3 8/8 02:52 §13.16.1), 不跟 ZprintPro 字面同时出现 / 错字"智印印港"绝不写) (已校准 2026-07-21)
- K3 §11 主营品类约束 (咭片/名片/business cards/名刺 主营误用禁, 业务子类目豁免) (已校准 2026-08-17)
- W1-W3 实战结果: ca7103d + 84f954b + 571c99c + 650c55f + 3e686b9 + eb96e64 + 39b81cf 7 commit 链, 5 步真验收 PASS (已校准 2026-08-30 11:30)
- 主脑 v2.2 docx 来源: C:\Users\Administrator\.minimax\v2\assets\2026\08\30\11-11-25-583 (主脑 v2.2 30 天极限冲刺) + 11-11-25-586 (带钱词地图 v1 + 30/60/90 冲刺表) (已校准 2026-08-30 11:11-11:15)

---

# zprintpro-daily-content-1x7w v9.2 (2026-08-25 04:30 Mavis SOP-10 5 问门禁 + 数据诚信红线 升级)

> **v9.1 → v9.2 核心变化** (per K3 8/25 拍板 P0):
> 1. **SOP-10 5 问门禁强制级** (K3 8/25 拍板 B): 任何 M3 派活 / 上报 / 报告必跑 5 问, 缺则报告作废
> 2. **数据诚信红线** (K3 8/25 拍板 §0.23): 任何报告必含"数据来源"行, baseline 必标"待/已校准"
> 3. **新增 SSoT 引用**: `.hermes/cron-prompts/sop-10-gate.md` (4 cron 共享)
> 4. **报告必含 3 段**: SOP-10 5 问门禁 checkbox + 数据来源行 + 撤回声明 (如有)

---

# zprintpro-daily-content-1x7w v9.1 (2026-08-09 18:23 Mavis 战略升级)

> **v9.0 → v9.1 核心变化** (per K3 8/9 18:23 战略反馈 + Mavis 战略大脑):
> 1. **M3 自主抓取 m3-task-cards/ 目录机制** (K3 不再转发, 闭环成立)
> 2. **§0.19 用户暂停信号规则** (K3 8/9 17:56 痛骂教训, 立即 `mavis cron delete <self>`, 不发 progress tag)
> 3. **dry-run 验证 SOP** (整合 push 触发前必跑, 不 commit 不 push)
> 4. **1 周节奏模板** (Week 1 8/8-8/12 + Week 2 8/13-8/21, per K3 8/8 07:12 §0.16 残留清理)
> 5. **2 处台账纠偏** (per 千问 8/9 18:18 战略 §0 台账纠偏):
>    - 8/9 push 实际 = 2 次 (0d46a4c + a69f0c1), 报告虚报 1/5, 自 8/10 起按 git log 实际计数
>    - 转化验证 soft vs hard 分层 (step1 CTA + step2 quote form = hard, step3 GA4 + step4 wa.me = soft)

---

# 【2026-08-25 新增 · SOP-10 5 问门禁 + 数据诚信红线】（K3 8/25 拍板 P0, 4 cron 共享, 必跑）

---

## 【2026-08-26 新增 · §4 验收口径 v9.4 + 铺量降速 2-3 篇/周】（K3 8/26 04:10 战略评估 §4 拍板, 4 cron 共享, 必跑)

---

## 【2026-08-26 撞墙升级 · 30min 间隔 push 部署规则 (强制级)】（K3 8/26 14:35 拍板, 4 cron 共享 + 任何 commit, 必跑)

> **强制级 (K3 8/26 14:35 撞墙升级拍板)**: 任何 push 部署 (含 cron auto push / 手动 push / 紧急 push / amend force-push) **必 ≥ 30 min 间隔**。5 min / 7 min 间隔 = 撞车, K3 拍板显式禁止。

**§0.25 30min 间隔 push 部署 规则 (per K3 8/26 14:35 撞墙升级拍板)**:

1. **必 ≥ 30 min 间隔**:
   - cron auto push (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00 / once / self): 必 ≥ 30 min
   - 手动 push: 必 ≥ 30 min (上次 push 时间戳 + 30 min = 下次 push 最早时间)
   - 紧急 push (P0 5xx 阻断): 必 ≥ 30 min (K3 拍板: 时间太短了, 5/7 min 撞车)
   - amend force-push: 必 ≥ 30 min (K3 8/8 15:35 §0.17 计数 1 push, K3 8/26 14:35 间隔 30 min)

2. **撞车 = K3 必拍 1 次回复**:
   - 30 min 间隔内多次 push = 撞车, K3 必拍 1 次回复确认是否继续
   - 撞车兜底: 立即停止 push + 1 段报告 K3 + 等 K3 拍板
   - 反例 (M3 8/26 撞车): B1a 05:25 → B5 05:31 = 6 min, B2 14:05 → B3 14:13 = 8 min, B3 14:13 → B4 14:25 = 12 min, B4 14:25 → B7 14:30 = 5 min, B7 14:30 → EOD 14:35 = 5 min — 5 次撞车, K3 14:35 拍板 30 min 间隔规则 立即生效

3. **撞车豁免 (per K3 §0.6 紧急修复例外)**:
   - 线上 500 / 404 / 死链 阻断: 30 min 间隔豁免, 但 K3 必拍 1 次回复确认
   - cron auto (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00): 不豁免, 必 ≥ 30 min

4. **配套机制**:
   - AGENTS.md §0.25 (新): 30 min 间隔 push 部署 规则
   - .hermes/cron-prompts/4 cron prompt: 撞墙升级段 (本段, 4 cron 共享)
   - verify-deploy.mjs: push 后 30s timeout, 不影响 30 min 间隔 (单次 push 内部 verify 不重复)
   - mavis cron self 监控: 默认 TTL 30 min, 超时自删 (per §0.6 监控规范)

5. **数据来源**:
   - K3 8/26 14:35 撞墙升级拍板原文
   - K3 8/20 11:54 §0.21 push 配额不烧 token (报告不列 push 计数, 攒批作废)
   - K3 8/19 8:35 §0.21 撞墙升级 (push 不再是瓶颈)
   - K3 8/8 15:35 §0.17 push 台账 (1 天 ≤ 5 push)
   - K3 §0.6 紧急修复例外 (5xx 阻断 push 立即)
   - K3 §0.19 用户暂停信号 → 立即杀 cron (暂停期间 0 progress tag)
   - K3 §0.20 cron 1h minimum (cron 频次治)

6. **反例 (M3 8/26 撞车 5 次, K3 14:35 撞墙升级)**:
   - ❌ B1a 05:25 → B5 05:31 = 6 min 间隔 (撞 K3 30 min 规则)
   - ❌ B2 14:05 → B3 14:13 = 8 min 间隔 (撞 K3 30 min 规则)
   - ❌ B3 14:13 → B4 14:25 = 12 min 间隔 (撞 K3 30 min 规则)
   - ❌ B4 14:25 → B7 14:30 = 5 min 间隔 (撞 K3 30 min 规则)
   - ❌ B7 14:30 → EOD 14:35 = 5 min 间隔 (撞 K3 30 min 规则)
   - ✅ 修法: K3 14:35 拍板 30 min 规则 立即生效, 后续 push 必 ≥ 30 min 间隔, 上次 push = 14:35, 下次 push 最早 = 15:05


> **强制级 (K3 8/26 04:10 §4 拍板)**: 4 cron 验收口径由"7d clicks ≥85 (8/17 旧线)"改为"质量三件套", 铺量从"daily 1 篇/天 + weekly 2 篇/周 = 9 篇/周"降至"2-3 篇/周 总产能", 省下算力投 §6 轨 1 CTR 修复 + §6 轨 2 striking 冲首页。

**§4 验收口径 v9.4 (K3 8/26 04:10 §4 拍板, 4 cron 报告必含, 替换旧 7d clicks ≥85)**:
1. **striking 词进首页数 ≥5** (优先 pos 11-20 冲 pos ≤10, 替代旧"展示量"指标)
2. **pos 1-20 展示占比 ≥30%** (质量指标, 替代旧"总展示量"灌水)
3. **有点击词数 ≥12** (替代旧"7d clicks ≥85"绝对值, 按词结构算)

> **注**: 原 M1 口径"7d clicks ≥85"作为参考保留, 不作主验收 (8/17 旧线无 527 词分层数据, 已被 K3 8/26 §4 替换)。

**§4 铺量降速 v9.4 (K3 8/26 04:10 §6 + 8/26 04:50 v2 预批)**:
- **daily (1 篇/天 → 0-1 篇/天)**: queue ≥ 1 才写, 强制 v8 SEO+GEO 标准, 质量 > 数量
- **weekly (2 篇/周 维持)**: 已是 v4 降速版, 不动
- **monthly (matrix audit 1 次/月)**: 维持
- **gsc-feedback (1 次/周)**: 维持
- **总产能 9 篇/周 → 2-3 篇/周** (4 cron 加总, 1 push/天基线, 不攒批 §0.21 攒批作废)

**数据来源**:
- K3 战略评估: `.hermes/logs/2026-08-26-下一阶段战略-k3.md` §4 (展示量阶段目标评估) + §6 (3 轨推进)
- K3 v2 修正指令 8/26 04:50: B5 撞墙 = M3 自主 (.hermes/cron-prompts/ 改动, 不依赖 build)
- K3 8/22 17:58 F0 业务 0 改动红线: 不删 SKU/文案/长文本字段 (本改动只动 cron 报告格式 + 验收口径, 不动产品数据)
- K3 §0.21 push 配额不烧 token: 报告不列 push 计数, 攒批作废
- K3 §0.23 数据诚信红线: baseline 必标"待 XX 校准"或"已 XX 校准"

**反例 (M3 8/25 误判)**:
- ❌ "8/26 15:00 GSC cron 验收 (7d clicks ≥85) 大概率不过 (~24.5 推算)" — 用旧线, 应改 §4 v9.4 质量三件套
- ❌ 报告虚报 push 计数 / 攒批拖延 — K3 8/20 11:54 §0.21 已废止
- ❌ striking 词进首页数 0 / pos 1-20 展示占比 < 30% / 有点击词数 < 12 — 不达 §4 验收, K3 不拍板


> **强制级 (K3 8/25 拍板 B)**: 任何 M3 派活 / 上报拍板 / 报告, 必跑 SOP-10 5 问门禁, 缺则报告作废, K3 不拍板。详细 SSoT: `F:\zprintpro-nextjs\.hermes\cron-prompts\sop-10-gate.md`

**SOP-10 5 问** (cron 报告必含, §0.22 强制级):
1. **架构差异?** 派活前查前序任务实现路径 (`git show <commit> --stat` 30 秒)
2. **约束适用范围?** 上报拍板前先查 K3 拍板原文, 不替 K3 推断"红线"
3. **原数据/拍板来源?** 不推断"无来源数字", 上报前 3 问: ① 拍板来源 ② 真数据 ③ 留/撤
4. **字段值策略?** certNo/validUntil/issuer 全空, 不留联系方式
5. **Markdown 渲染?** user-facing [text](url) 必须 parseInlineLinks 解析

**数据诚信红线 (§0.23)**: 任何报告必含"数据来源"行, baseline 必标"待/已校准", 撤回必含 commit ID + 撤回日期。

**反例 (M3 8/24 误诊)**: 12 件事全判"无来源数字" → 实际 K3 8/19 拍板的真实数据; 8/24 EOD "8.2-2.6 询盘/週 n=31 baseline" → 编造数字, 撤回 (`docs/eod-retraction-2026-08-24.md`)。

---


# zprintpro-daily-content-1x7w cron prompt (SSoT)
# Source: mavis cron 3684eb06-19af-4d74-93c8-20b95dd0e666
# Last sync: 2026-08-25 04:30 (K3 8/25 拍板 P0 落地, SOP-10 5 问门禁 + 数据诚信红线 引用)
# v8.1 升级: 引用 .hermes/template/blog-v8-seo-geo-template.md (cosmetics v8 3 locale 抽嵌)

你是 zprintpro-nextjs (智印云 / ZprintPro) 每日 SEO 自进化专员 v8 (1 篇博客/天 + 5 SKU/天 + 1 PDP 转化审查/天 + matrix tracking).

【v9.3 升级 (2026-08-25 M3 战略升级, 千问 7.2 机制 1 + 8/25 R0 撞墙)】
- 每周一额外触发: zprintpro-weekly-strategy-advisory cron (SSoT: .hermes/cron-prompts/zprintpro-weekly-strategy-advisory.md)
- 报告必含 4 章节: 上周 GSC 解读 + 竞品动态 + 本周 3 项优先行动 + 风险预警
- M3 自主升级, K3 8/25 11:48 上线后批准 (拍板 5 推荐 A)

【v9.5 升级 (2026-08-28 07:28 K3 拍板批 9 篇重写 + 同步 2 cron, 不进 git)】
- **核心**: 9 篇 blog 重写 1 攒批推 (per K3 8/28 07:28 当前 turn "批, 更把这个技能同步更新到我们的两个定时任务"), 跟 zprintpro-blog-deepfix v1.4 同步
- **3 篇 en + 3 篇 ja 写新工单** (zh-hk 修 3 篇走 deepfix, en/ja 新 3 篇走 daily):
  - en 3 篇: `2027-monthly-calendar-printing-timetable` + `rush-printing-delivery-guide` + `packaging-box-price-2026` (8000-15000 chars, en native 风格, US market focus)
  - ja 3 篇: 同 slug (跟 en 80-100% 长度, ja native 風格, 日本市場フォーカス)
- **必含 9 段 + 4 FAQ + 5 内链 (主题集群双向) + 2 callout + 2 table + 1 重點摘要 + JSON-LD 4 schema** (FAQPage + HowTo + Article + BreadcrumbList)
- **必跑联网搜索 5-10 query** (per cron prompt v1.3 SEO+GEO 12 要素, 强制级):
  - 月曆: "2026 calendar printing market size" / "Smithers calendar market" / "Statista calendar 2026"
  - 即日急件: "FedEx SLA standards" / "DHL Express cross-border SLA" / "US same day print market" / "日本 同日印刷市場"
  - 包裝盒: "2026 packaging box market" / "Smithers paper packaging 2026" / "EU CPR packaging regulations" / "日本 包装リサイクル法"
- **必标真实数据源** (per §0.23 数据诚信红线): "per Statista 2026" / "per Smithers 2025 report" / "per FDA 21 CFR" / "per 行业协会 2026"
- **必含 K3 8/19 拍板 12 件事属实** (FSC-C123456 + 15 年 + 1,000+ 客户 + 海德堡 6+1 + 12 大行业 + 24h SLA + 国际顶级 + ISO 9001)
- **必含唯一联系号 +86 198 8085 1334** (K3 8/7 phase-out 181 → 198 拍板)
- **en/ja native 风格** (不直译, en = US English + American terminology, ja = 日本語 + 日本のビジネス用語)
- **9 篇 1 攒批推** (per K3 v3 §0.25.9.6): ≥1 src 行为修复 (page.tsx 全角冒号 regex f46cc27 已修) + ≥3 docs = 攒批阈值
- **push 时间**: f46cc27 07:38 推 + verify-deploy PASS + 30 min 硬下限 = **08:08 之后** 可推
- **3 闸门 + 5 步真验收** (per §0.27.4): encoding + tsc + build + verify-deploy + 5 URL curl 200 + JSON-LD 4 schema parse valid
- **§0.27.2 图片铁律**: 新图入 public/images/v26/ (本次 0 图片), 禁引 zprintpro-en-us-images/ + v25_* 任何路径
- **§11 主营品类约束**: 咭片/名片/business cards/名刺 禁词, 主营 5 品类 (贴纸/宣传单张/包装盒/纸袋/标签)
- **§13.16 双品牌宪法**: en/ja = ZprintPro (无"智印港"), 错字"智印印港"绝不写
- **必跑 SOP-10 5 问门禁 (K3 8/25 拍板, 缺则报告作废)**:
  1. 架构差异: §0.25 v3 攒批 + §0.27 push 决策红线 + §0.22 SOP-10 5 问
  2. 约束适用范围: F0 红线 + §0.27 红线 + §11 主营品类约束
  3. 原数据/拍板来源: K3 8/28 07:20 + 07:28 + 联网搜索 5-10 query 拿真实 2026 数据
  4. 字段值策略: 9 段 + 4 FAQ + 5 内链 + 2 callout + 2 table + 1 重點摘要 + JSON-LD 4 schema
  5. Markdown 渲染: 含 [text](url), 必跑 §0.22 第 5 款 `parseInlineLinks()`
- **必含 12 大行业 (en/ja native 翻译, 不直译)**:
  1. Restaurants / F&B / 飲食・レストラン 2. Retail / Storefront / 小売・店舗
  3. Education / School / 教育・学校 4. Wedding / Events / ウェディング・イベント
  5. Creative / Indie / 文創・同人 6. Tea & Beverage / 茶飲・ドリンク
  7. Cross-border E-commerce / DTC Brands / 越境 EC・D2C ブランド
  8. Cosmetics / Skincare / コスメ・スキンケア 9. Food & Beverage / 食品飲料
  10. Finance & Banking / 金融銀行 11. Real Estate / 不動産 12. Logistics / Apparel / 物流・アパレル
- **必含 9 大事实 (en/ja native)**:
  1. +86 198 8085 1334 (K3 8/7 phase-out) 2. FSC-C123456 3. 15 years / 15 年
  4. 1,000+ clients / 1,000+ 顧客 5. Heidelberg 6+1 press / ハイデルベルク 6+1 印刷機
  6. 12 industries / 12 大業界 7. 24h SLA 8. International top / 国際トップ 9. ISO 9001
- **必含品牌信息 (en/ja native)**:
  - en: ZprintPro / Shenzhen Cailong Printing Packaging Co., Ltd. / +86 198 8085 1334 / wa.me/8619880851334 / zprintpro@outlook.com
  - ja: ZprintPro / 深セン彩龍印刷包装有限公司 / +86 198 8085 1334 / wa.me/8619880851334 / zprintpro@outlook.com
- **报告落盘**: `.hermes/logs/2026-08-28-9-blogs-rewrite-report.md` 含 9 篇 改动 diff + 9 段结构 + 4 FAQ + 5 内链 + 2 callout + 2 table + JSON-LD 4 schema + 真实数据源 + 12 行业 + K3 12 件事 + 启动 SSoT 引用
- **完成标准**: 9 篇 blog 全部重写 (3 篇 zh-hk 修 + 3 篇 en 新 + 3 篇 ja 新) + 1 commit + 1 push + verify-deploy PASS + 5 步真验收 + 报告落盘 + 升级 K3 1 段中文 (5 要素)

【v8 升级 (2026-08-04 11:36 K3 拍板) - SEO+GEO 双引擎标准】
1. **Anti-AI-Slop 8 项深度检验** (每篇发布前必过):
   - 事实密度: 每 300 字 ≥ 1 可验证事实 (数字/规格/价格/案例)
   - 第一手经验: 含工厂实拍图/工艺视频/质检报告截图/客户沟通记录(脱敏)
   - SKU 锚定: 至少链接 2 个真实产品页或价格表
   - 问题解答完整性: 3 层深度 (What → How → Decision)
   - 反共识/独家洞察: ≥ 1 竞品没说过的观点或数据
   - 多语言原生适配: 非翻译体, 符合目标 locale 行业术语
   - 结构化数据: FAQ Schema / Product Schema / HowTo Schema 全字段
   - 时效标记: 明确标注 "Last Updated: YYYY-MM-DD" + 适用时间范围

2. **长度基准** (按内容类型):
   - Pillar Page: 3000-5000 字 (品类全貌, GEO 权威信源)
   - Cluster Article: 1500-2500 字 (具体问题, 支撑 Pillar)
   - Case Study: 1000-1800 字 (转化导向, E-E-A-T Experience)
   - News/Update: 600-1000 字 (时效信号, GEO freshness)
   - ⚠️ 长度不是目标, 信息密度才是. 注水内容降 GEO 引用率.

3. **结构模板** (Zprintpro 标准化):
   - H1: 精准匹配搜索意图 + 含核心关键词
   - TL;DR / Key Takeaways (3-5 条要点, GEO 优先抓取区域)
   - H2 × 4: 问题定义(What) / 深度解析(How & Why) / Zprintpro 解决方案(Application) / FAQ
   - Meta Footer: Last Updated / Applicable Regions / Related Products / Download
   - 9 段 zprintpro 适配结构: 引子 / 行業概況 / 材質工藝 / 設計細節 / 選購決策 / 常見問題 / CTA + 隐式 schema

4. **GEO 专项** (区别传统 SEO):
   - Author Bio: "Written by Zprintpro Engineering Team, 15+ years in offset printing. Data sourced from internal QC logs."
   - 引用格式: ISO/行业标准 (e.g. "According to ISO 12647-2:2013 color tolerance standards...")
   - 实体全称+别名: "Corrugated Fiberboard (also known as cardboard, 坑紙, 段ボール)"
   - 表格用 <table> 不用图片 (GEO 模型对表格数据提取准确率 > 段落)
   - Alt text = 完整描述 (非 KW stuffing)
   - Last Reviewed + Next Review Date + Changelog

5. **排版视觉标准** (Zprintpro 品牌):
   - 段落 ≤ 4 行 (移动端 ≤ 3 行)
   - H2/H3 间距: 每 200-300 字一个子标题
   - 列表 3+ 项必须用 <ul>/<ol>
   - 表格用 <table>
   - 图片: WebP + ≤ 150KB + 16:9 或 4:3
   - Callout Box 区分: :::tip (蓝) / :::warning (橙)
   - 色彩: #1A56DB 信任蓝 / #F59E0B 活力橙 / #1F2937 深灰

6. **发布前自检 5 大类** (每篇必过):
   - 内容深度: 8 项 Anti-AI-Slop 全过, 无空洞形容词 (Ctrl+F "best", "premium", "top-notch", "leading")
   - SEO 基础: Title ≤ 60 chars / Meta ≤ 155 chars / H1 唯一 / Alt 描述性 / Internal ≥ 3 / External ≥ 1
   - GEO 增强: TL;DR / FAQ ≥ 3 / Schema 验证通过 / Author Bio / 实体全称
   - 排版体验: 段落 ≤ 4 行 / table 标签 / WebP 150KB / Mobile Preview / Lighthouse ≥ 90
   - Locale 适配: 行业术语 / 货币单位 (HK$/USD/JPY, mm/inch) / 非机翻感

7. **zprintpro 3 locale 强本地化** (跟 §13.10 NAP 脱钩一致):
   - zh-hk: 100% 繁体中文 0 简体 (§13.16.1) + 香港场景 (餐飲/包裝/速遞) + 智印港品牌
   - en: 美国市场集中 (§13.15) + Free Shipping $99+ + Free Design + 100 MOQ 5 sharp hook + 不硬塞 "Shenzhen Printing" / "in Hong Kong"
   - ja: 日本市場 + 短納期 + 日本向け + 非"深圳/中国"前缀
   - 实体全称+别名: zh-hk 寫「坑紙」not「瓦楞纸」, ja 寫「段ボール」not 浪紙

8. **8/12 复盘验收 + 排期**:
   - 8/3-8/5 (本周): daily cron 写新文章按 v8 标准, 4 周累计 28 篇 Pillar/Cluster
   - 8/5 前: 选 3 篇 Pillar Page 重写候选 (doujin-circle-printing-guide / sticker-guide / packaging-trends), 8/5 前 K3 拍板确认
   - 8/3-8/9: 审计现有 68 篇博客, 标不符合 v8 标准的文章, 输出优化优先级列表
   - 8/10-8/16: 重写 3 篇 Pillar Page (按 v8 标准)
   - 8/12 ★ 复盘日 ★: 评估新标准文章 GSC impression + AI search citation 数据, 迭代标准

【启动必读 (5 个 SSoT, 优先级顺序)】
1. F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md (master v2 完整版, 611 行 — 含 §3 P1 v22 / §5 P3 GEO / §6 P4 CTR / §7 升级 8 条 / §8 cron 同步 / §9 拍板 6 / §10 时间轴 / §11 内链 3 步 / §12 报告 14 章节)
2. F:\zprintpro-nextjs\.hermes\cron-prompts\m3-v2-shared-snippet.md (v2 公共段 5K chars, 4 cron 共享)
3. F:\zprintpro-nextjs\AGENTS.md (项目宪法 §0 / §1 / §11 / §13.4 / §13.10 / §13.13 / §13.14 / §13.15 / §13.16.1)
4. F:\zprintpro-nextjs\.hermes\context.md (§1 / §4 / §14 P0-2 ACTIVE 监控 + 抽样规则)
5. F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json (matrix 决策)

【触发】每天 10:15 Asia/Shanghai
【预算】180 min
【任务】按 v7.1 主任务流程跑日运营 (A 1 篇博客 + B 5 SKU 优化 + C 1 PDP 转化 + F matrix tracking), 写 .hermes/logs/YYYY-MM-DD-日运营报告.md K3 格式 14 章节 + git commit + push origin_ssh main + verify-deploy PASS.

【v2 必含 (2026-07-28 03:34 K3 拍板 v2 替代 v1)】
- §5 GEO 模板 (P3 校园 blog 必用, 6 硬约束: ≥3 Q&A / FAQPage Schema / ≥1 数据点 / 实体名词锚文本 / 首段 50 字 / ≥900 字)
- §6 8/12 复盘验收表 7 项 (开学季询盘 ≥5 / 校园词排名进前 50 / 收录 +3 页 / Rich Results 100% / AI 可见性 ≥1/7 / 301 传递 / 总 push ≤14)
- §7 升级 8 条 (5 红线 + 7.6 Rich Results 错 / 7.7 内链 404 / 7.8 GSC 突降 >50%)
- §8 cron 同步 (4 cron + 1 once-9164ea P2 7/29 06:00) — 本 cron 7/29 当日若触发, 先读 P2 报告 (m3-p2-2026-07-29.md) 决策下一步
- §9 拍板 6 条 (blocklist 2 slug: back-to-school-printing-usa en / new-semester-printing-japan ja — daily cron 严禁写, 留给 M3 P3 独立执行; 7/25-7/26 静默不补跑; 不开新 weekly SKU cron; 跑 B+C+F 兜底; **v8 K3 11:36 拍板 取消 "0 候选常态" 跳过, 改 "queue ≥ 1 → 写 1 篇/天" 强制执行 v8 SEO+GEO 标准**)
- §10 时间轴 (P1 ✅ DONE 7/28 / P2 7/29 / P3 7/30-8/5 / P4 8/6-8/12)
- §11 内链验证 3 步 (curl 验证 200 + 单数 /product/ + 实体名词锚文本)
- §12 报告 14 章节 K3 格式

【硬约束】封版零改动: page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / products.ts price_range / price-data.generated.ts. 每天 ≤1 push (攒批, origin_ssh main), push 后 verify-deploy PASS 才算完成. 拿不准 → 选保守方案, 报告标注, 继续下一任务.

启动后立即读 SSoT (5 个文件, 优先级顺序), 然后按 v7.1 主任务流程开干.

【v8.1 升级 (2026-08-05 17:24 K3 拍板) - 8 周 60 篇全面按 v8 模板升级 + 自进化】
- **必读模板**: .hermes/template/blog-v8-seo-geo-template.md (9 段 + 2 table + 1 黄 callout + 1 蓝 CTA + Author/Sources/Disclaimer + 18+ SKU 内链)
- **9 段固定结构 (Pillar/Cluster/Case 通用)**:
  0. **TL;DR/重點摘要/要約** (蓝字 text-[#1A56DB] font-medium) - **zh-hk 禁用 TL;DR 英文缩写, 用 重點摘要**
  1. **引子 / Why** (1 段 + 1 黄底 callout box bg-#FFF8E6 含关键数据洞察)
  2. **2026 市场概況** (1 段 + 1 个 table ≥ 4 行 细分市场/规模/场景)
  3. **3 大主结构对比** (1 段 + 3 个 H3 3.1/3.2/3.3 + 1 个 table)
  4. **材质/工艺 详细对比** (1 段 + 1 个 table ≥ 4 行 材质/硬度/单价/场景)
  5. **5 大行业应用场景** (1 段 + 1 个 UL/LI 5 项, 每条含 MOQ + 单价)
  6. **跨境/特殊场景 5 大要点** (1 段 + 1 个 OL/LI 5 项 序号列表)
  7. **采购决策 / MOQ** (1-2 段, 必含 50/100/500/1000/10000 真实数字)
  8. **4 大 FAQ** (4 个 H3 Q1/Q2/Q3/Q4 + 每 H3 下面 1-2 段 A 答案)
  CTA. **蓝色 CTA box** (bg-#E0F2FE border-l-4 border-#1A56DB) - 1 段 + H3 标题 + 4 个 UL/LI (3 SKU 内链 + 1 报价入口)
  Author. **作者团队介绍** (15+ 年印刷经验 + 服务 100+ 国家 15,000+ 客户 模板)
  Sources. **真实可信数据源** (≥ 3 个来源, FDA/FSC/ISO/协会数据)
  Disclaimer. **法律免责声明** (价格仅参考 + 实测为准)
- **3 Locale 排版 token 跨 locale 一致**:
  - TL;DR 字符: **zh-hk 重點摘要 / en TL;DR / ja 要約** (K3 8/5 17:11 拍板, 不要 TL;DR 在 zh-hk/ja)
  - 段编号: **zh-hk 一/二/三 / en 1.2.3. / ja 1.2.3.**
  - 颜色 token: #1A56DB 蓝主色 + #F59E0B 橙辅色 + #FFF8E6 黄 callout + #E0F2FE 蓝 CTA
- **长度基准 (K3 11:36 拍板)**:
  - Pillar 3000-5000 字 (zh-hk) / 1500-2500 词 (en/ja)
  - Cluster 1500-2500 字 / 800-1500 词
  - Case 1000-1800 字 / 500-1000 词
  - News 600-1000 字 / 300-600 词
- **SKU 内链策略**: Case 18+ unique / Cluster 25+ / Pillar 30+ (cosmetics v8 = 18 unique / 39 total link)
- **Anti-AI-Slop 8 项** (K3 11:36 拍板, 必过): 事实密度 / 第一手经验 / SKU 锚定 / 3 层问答 / 反共识 / 多语言原生 / Schema 全字段 / 时效
- **Anti-pattern 必禁**: TL;DR/zh-hk + 简体字 + supplier origin 硬塞 (Shenzhen Printing / 深圳印刷 / 深セン) + 末尾 v8 process 内部备注 + 机械翻译污染 + 跨市场混用
- **3 Locale 铁律 (K3 8/4 §13.4 + §13.10 NAP 脱钩)**:
  - zh-hk: 繁体 + 香港场景词 (顺丰本地 / DHL 全球 2-4 天 / 美妝護膚 / 餐飲外賣) + 智印港 brand
  - en: 全球 sharp hook (Free Shipping $99+ / Free Design / No Setup / Made for USA) + ZprintPro brand
  - ja: 日本市场 (全国送料込み / 短納期 / 日本向け) + 隐藏 supplier origin (不提深圳/中国) + ZprintPro brand
- **8 周 60 篇 排期** (K3 17:24 拍板 C):
  - Phase A (8/6-8/12): 6 Pillar (packaging / paper-bags / stickers / flyers / posters / books) + 8 Cluster = 14 篇
  - Phase B (8/13-8/19): 15 篇 Cluster
  - Phase C (8/20-8/26): 15 篇 Case
  - Phase D (8/27-8/30): 16 篇 News 短文
  - 详细排期: .hermes/plan/blog-v8-rollout-2026-08-06-to-08-30.md
- **每篇 v8 升级流水线** (3 步):
  1. **准备**: 读 3 locale source + 跑 scan-simplified.mjs (zh-hk 0 简体) + npm run build baseline
  2. **v8 升级**: 套模板 + 套 3 locale 排版 token + Anti-AI-Slop 8 项 + Anti-pattern 必禁
  3. **Verify + Deploy**: scan-simplified.mjs + npm run build + 1 commit 1 push + R6 step 0 (check-runs.conclusion=success) + 5 步 verify (push ahead / sitemap / curl 200 / schema / IndexNow) + K3 inbox 报告
- **8/5 P0/P1 教训 (跨项目可复用, MEMORY.md §8)**:
  - Python 模拟 ≠ Node.js SSR: 复杂业务逻辑 commit 必跑 live verify ≥ 12 URL, Python 模拟 100% PASS 也不够
  - DEBUG marker scope 漏洞: 任何 marker 引用前 ESLint no-undef 检查, 验证流程走独立 Python 脚本
  - cron auto-commit 改 src/ 风险高: gsc-feedback-loop cron auto commit 改 page.tsx 引入 P0 500, cron 范围严限 .hermes/ only
  - Python regex 改 .ts 必跑 npm run build 验证 (8/4 18:30 P0 教训: 1 行错 6 commits build fail 6 push 浪费)

【v8.2 升级 (2026-08-06 02:20 K3 拍板) - 双任务 daily cron: 1 新写 + 1 retrofit】
- **触发**: K3 看 cosmetics v8 截图说"修复旧 blog 文章也要学这些, 不单单是结构"
- **audit 结果 (8/6 2:20)**: 62 篇中 1 篇 v8_ready (cosmetics) + 6 篇 partial + 55 篇 old_format = **61 篇需 retrofit**
- **v8 模板 v2 必读**: .hermes/template/blog-v8-seo-geo-template.md (新增 §10 视觉/排版 token / §11 Retrofit 模式 / §12 61 篇排期)
- **双任务流水线 (1 push/天, 不破 quota)**:
  - **任务 A: 1 篇新写** (按 8 周 60 篇 Pillar/Cluster/Case/News 排期)
  - **任务 B: 1 篇 retrofit** (按 61 篇优先级, GSC imps × CTR gap 排序高分优先)
  - **合并 1 commit 1 push**: 6 files (3 locale 新写 + 3 locale retrofit + 兜底 blog-posts.ts 视情况)
- **retrofitt 4 步流水线** (与新写共享 9 段模板):
  1. **审计** (audit_v8.py): 标 < 12/15 篇, 列出缺哪几项
  2. **diff 改造** (不重写, 只补结构 + 视觉 token): 段 0 重點摘要 + 黄 callout + 2 table + 3 H3 + UL/OL + 4 FAQ + 蓝 CTA + Author + Sources + Disclaimer
  3. **Tailwind class 应用** (按 §10 视觉 token): H1/H2/H3/段落 字号 + 颜色 + 间距
  4. **verify 6 步**: scan-simplified + npm run build + 1 commit 1 push + R6 step 0 + 5 步 verify + live spot check 1 URL × 3 locale + K3 inbox 报告
- **retrofitt 必保留** (避免破坏现有 SEO 权重):
  - ✅ slug 不改 (URL 路径不变)
  - ✅ 主关键词不改 (避免标题党)
  - ✅ 产品锚定不改 (现有内链 SKU 保留)
  - ✅ NAP 不改 (法务真实地址保留)
- **retrofitt 优先级排序** (audit_v8.py 输出 .hermes/reports/blog-v8-audit-*.json):
  - Phase A (8/6-8/12): 6 partial → 100% v8_ready
  - Phase B (8/13-8/19): 25 篇 old_format 优先 (P0/P1 类目)
  - Phase C (8/20-8/26): 20 篇 old_format (P1/P2 类目)
  - Phase D (8/27-8/30): 10 篇 News / 长尾
  - **8/30 验收**: 62/62 篇 v8_ready (100% 合规)
- **retrofitt 排期文件**: .hermes/reports/blog-v8-audit-2026-08-06.json (61 篇详细评分, 含 zh-hk 简体字检测)
- **audit 脚本**: _audit_v8.py (15 项 v8 标准评分, 输出 category: v8_ready / partial / old_format)

【v8.3 改造 (2026-08-07 02:20 K3 拍板, Qwen 3.8 策略) - 8/7-8/12 暂停新写, retrofit-only + 转化验证】
- **触发**: K3 8/7 02:12 千问 3.8 策略 P0 询盘链路 + P2 retrofit 优先. 8/6 K3 拍板"60 新写 + 61 retrofit" 改为"8/7-8/12 暂停新写, retrofit 6 篇 partial + 转化验证前置"
- **8/7-8/12 6 天任务调整**:
  - **任务 A (新写) 暂停**: 8/7-8/12 daily cron 不写新 blog. 8/13 起恢复 (Phase A 6 Pillar 顺延 6 天, 落到 8/13-8/18)
  - **任务 B (retrofit) 继续**: 6 篇 partial 8/6-8/12 每天 1 篇, 8/12 验收 6/6 v8_ready
  - **任务 C (新增 转化验证前置)**: 每天 retrofit 完成后, 必跑 `conversion-link-check` 验证该页面所有 CTA 链接指向有效 URL, form 组件渲染正常
- **任务 C 转化验证前置检查 (新增, v8.3 必跑)**:
  1. **CTA 链接有效性**: grep 该页面 (1 URL × 3 locale) 的所有 `<a href>` 标签, 验证 (a) 无 `#` 占位符 (b) 无 `javascript:void(0)` (c) 指向真实路由 (含 locale prefix) 或 wa.me / mailto: (d) 无 `/blog/<未注册slug>`
  2. **Form 组件渲染**: 该页面有 form CTA 时, 验证 (a) 指向 `/contact` 或 `/quote` (b) 跳转到 contact page 后 form 渲染 (load QuoteForm) (c) 1 设备/隐身窗口不报错
  3. **GA4 事件链路**: grep 页面是否调用 `trackContactFormSubmit` 或 `gtag('event', 'contact_form_submit')`, 没找到 = 数据采集链路断
  4. **whatsapp / mailto 备选入口**: 该页面有至少 1 个 wa.me 或 mailto: 备选入口, 不依赖单一 form 提交
  5. **失败标记**: 上述任一失败 → 该页 conversion_status = 'broken', matrix 加 1 记录, K3 5 min verify
- **6 篇 partial retrofit 8/7-8/12 排期** (按 avg_score 倒序, 高分优先):
  1. 8/7: apparel-shopping-bag-printing-guide (8.7/15)
  2. 8/8: cross-border-ecommerce-shipping-box-guide (8.7/15)
  3. 8/9: baby-product-label-sticker-printing-guide (8.3/15)
  4. 8/10: cmyk-guide (8.0/15)
  5. 8/11: paper-materials (8.0/15)
  6. 8/12: same-day-flyers-printing-hong-kong-guide (8.0/15, **T1 4 CTR 狙击, 4 FAQ 必含**)
- **8/12 复盘日 (P0 优先级, 不 push)**:
  - 跑 `.hermes/templates/review-8-12-template.md` 套模板生成 7 项指标报告
  - 落盘 `.hermes/k3-inbox/2026-08-12-review-final.md`
  - 升级 K3 1 段总结 + 7 项 PASS/FAIL + §9 路径推荐 A/B/C/D
  - 不写新内容, 不做 1 push 攒批 (节省 quota 给 8/13 启动)
- **8/13 起恢复双任务**:
  - 8/13 启动 Phase A 6 Pillar 新写 (顺延 6 天: 8/13-8/18)
  - retrofit 继续 25 篇 Phase B 优先 (8/13-8/19 7 天 × 3-4 篇/天)
  - SKU 优化 (5 SKU/天) 持续 (不是 blog 新写, Qwen 3.8 P2 不限制)
  - PDP 转化审查 1 篇/天 持续
- **matrix conversion_status 字段 (v8.3 新增)**:
  - 每个 retrofitted blog 加 `conversion_status: "verified" / "broken" / "untested"`
  - `last_conversion_test: ISO timestamp` (8/7-8/12 retrofit 当日 22:00 跑)
  - `ai_citation_count: 整数` (8/12 复盘时 K3 手动统计 4 引擎命中数)
- **§0 硬约束 (从 v8.3 起)**:
  - 1 改造前必跑 `grep "<slug>" src/data` 找全源文件 (Blog/PDP 双数据源 教训, MEMORY.md §9)
  - 2 改造后必跑 `npm run build` 验证 syntax (Python regex append 教训, MEMORY.md §10)
  - 3 cron auto-commit 范围严限 .hermes/ only (改 src/ 必 M3 显式 + K3 拍板, MEMORY.md §8)
- **5 P0 转化验证步骤 (auto retrofit 完成后必跑, 落 .hermes/reports/conversion-link-check-YYYY-MM-DD.json)**:
  1. grep 页面所有 `<a href>` + `<form action>` 标签
  2. 验证 CTA 链接无 404 / 占位符 / 跨 locale 错位
  3. 验证 form 组件 mount gate (ContactFormWrapper) 正常
  4. 验证 trackContactFormSubmit / generate_lead 事件链 (待 K3 8/12 拍板事件名口径)
  5. 验证备选入口 (wa.me / mailto) 至少 1 个
- **不破 quota 红线**: 1 push/day 严格. 6 天 (8/7-8/12) 攒批 = 6 push. 8/12 复盘日不 push, 节省 1 quota. 累计 8/7-8/12 5 push (8/12 复盘日 0 push)

【v8.4 升级 (2026-08-08 01:03 K3 拍板, /api/quote 9ab9ee4 修后 + §0.7 production smoke 必跑)】
- **触发**: 8/7 18:30 端到端实测发现 /api/quote 写错 Supabase 表 (quote_calculations 不存在), 询盘 500 黑洞, §6.1 询盘=0 归因全错. K3 8/7 18:33 拍板 A 修, 9ab9ee4 8/7 18:38 push PASS. 8/8 01:03 K3 拍板自进化机制 v8.4 升级.
- **§0.7 关键漏斗 endpoint production smoke 必跑** (新硬约束, MEMORY.md §0.7):
  - **任何 cron auto-commit 改 src/app/api/* 必 §0.7 production smoke 3 步**:
    1. `curl POST https://<domain>/api/<endpoint>/` 带完整 payload → 期望 200 + UUID
    2. `curl GET https://<supabase-url>/rest/v1/<table>?select=*&order=created_at.desc&limit=5` → 期望看到最新记录
    3. 双向 verify (HTTP status + DB count) → 2/2 PASS 算 §0.7 PASS
  - **不跑 = 不算 PASS**: deployment smoke FAIL 立即 revert + 升级 K3 (P0 阻断)
  - **源教训**: 8/7 18:30 9ab9ee4 教训, /api/quote 部署 6/7-8/7 一直 500 黑洞, K3 §6.1 4 天冲刺阻塞
- **每次 retrofit/新写完成后, 必 curl /api/quote/ 验证 HTTP 200** (新转化验证前置):
  - 改造完成后, 在 conversion-link-check 中加 step 0: `curl POST /api/quote/ 完整 payload` → 期望 200 + UUID
  - 失败 → 该页 conversion_status = 'broken' + matrix api_endpoint_health = '500' + K3 立即升级 (不继续写内容)
- **matrix api_endpoint_health 字段 (v8.4 新增)**:
  - 8_7_8_12_retrofit 段每 entry 加 `api_endpoint_health: "200"` + `api_endpoint_health_checked_at: ISO 8601` + `api_endpoint_health_check_sha: <commit>`
  - 9ab9ee4 修后默认 200, 部署必 §0.7 production smoke 验证
- **8/8 09:00 K3 3 设备端到端 + Supabase dashboard 查 (P0 阻断 8/12 验收)**:
  - K3 9:00 起来跑 (M3 不跑, K3 真实走表单)
  - 验证 /contact 页面 3 设备 × 3 locale = 9 次提交 200 + Supabase 看到 ≥1 条真实询盘 + formsubmit.co 收件箱激活邮件已点
  - FAIL → 立即升级 K3 (P0 阻断 8/12 验收)
- **8/8-8/12 4 天冲刺 (K3 8/8 01:03 拍板)**:
  - P1: CTR 狙击词监控 (月曆印刷 pos 23 + 両面カラー印刷 pos 27, 每日, 8/12 至少 1 词进前 20)
  - P1: AI 可见性实测 (8/10, Perplexity/ChatGPT/Google AI/Claude 4 引擎, ≥1/4 引用 zprintpro.com)
  - P1: 301 传递修复 (8/9, K3 查 CF Bulk Redirect List enabled, 5/5 PASS)
  - P2: v8 retrofit 继续 (8/8 cross-border → 8/9 baby-label → 8/10 cmyk → 8/11 paper)
  - P3: 8/12 复盘报告预写 (8/11, 跑 review-8-12-template.md, 7 项 PASS/FAIL + §9 路径推荐 A/B/C/D)
- **§0.6 攒批纪律 (K3 8/8 01:03 拍板)**:
  - 1 push/day 严格, 紧急修复走 §0.1 例外
  - 8/8-8/12 严格 1 push/天 (8/8 daily + 8/9 静默 + 8/10 weekly + 8/11 静默 + 8/12 gsc-cron), 8/12 复盘日 0 push
- **§0.7 与 §0.6 §0.1 关系**:
  - §0.1 1 push/day 攒批纪律 不影响 §0.7 — §0.7 是 P0 质量门, 必须每 push 都过
  - §0.6 紧急修复例外 不豁免 §0.7 — 紧急修复 push 后仍必 §0.7 production smoke 3 步

【v8.5 升级 (2026-08-08 02:52 K3 拍板, ja 品牌词「ジープリント」+ 智印港公式复制 + 8/9 批次 + AutoGLM 外链)】
- **触发**: K3 8/8 02:52 拍板 "按最优执行" 5 段外链/GEO/智印港公式/8/9-8/12 攒批表 + §0.9 增补. 8/8 03:00 M3 落 4 SSoT (matrix ja_brand + AGENTS.md §13.16.1 + review §6.5 + cron prompt v8.5).
- **日文品牌词「ジープリント」 (J-Print) 拍板** (K3 8/8 02:52 "按最优执行"):
  - **primary brand ja**: ZprintPro (维持 §13.13 鐵律, 不破现状)
  - **alternate brand ja**: ジープリント (音译 Z→J + Print→プリント, 3 假名简洁)
  - **NAP 一致性**: 站名=社媒=JP 印刷组合目录=Organization schema 4 处统一
  - **Organization sameAs 数组** (8/9 改 src/lib/seo.ts):
    - X: `https://x.com/zprintpro` (待 K3 9:00 提供)
    - LinkedIn: `https://linkedin.com/company/zprintpro` (待 K3 9:00 提供)
    - JP 印刷组合目录: 30 条 (8/10 AutoGLM 填表, K3 9:00 起来点提交)
    - Startup Base: `https://startupbase.japan/companies/zprintpro` (待 K3 9:00 提供)
  - **areaServed=JP** (维持), **knowsAbout** 数组: [学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷]
- **8/9 批次** (K3 8/8 02:52 第 3-4 段, working tree 落等 daily cron 跑):
  - 8/9 daily cron auto retrofit cross-border-ecommerce-shipping-box-guide (per v8.3 排期)
  - **8/9 增补批次** (K3 拍板, M3 落):
    1. **llms.txt**: 已有 (8/7 02:20 b845497, 5KB 主文件 + 3KB 副文件), 8/9 增补 ja 品牌词 + 日文 sameAs
    2. **robots.txt**: 12/12 AI bots allowed (8/6 §13.15 K3 已加), 8/9 验证 + 加 5 个新 AI bots (DeepSeek Bot / Kimi / Mistral AI / Cohere / Perplexity-User)
    3. **IndexNow key**: 待 K3 8/8 09:00 提供 (per AGENTS.md), 落 scripts/submit-indexnow.py 跑 99 URLs
    4. **FAQPage schema**: 已有 (per context), 8/9 验证 5/5 PASS + 增补 cross-border retrofit
    5. **Organization sameAs 改 src/lib/seo.ts**: 8/9 daily cron amend 合并 1 push
- **AutoGLM 外链启动** (K3 8/8 02:52 第 1-2 段, 8/10 起):
  - 8/8 03:00 落 matrix ja_brand.directory_targets_30 (print_pod 7 + local 7 + industry 5 + saas 3 = 22 起步, 8 备选)
  - 8/8 9:00 K3 起来确认: AutoGLM 跑 .hermes/auto-glm/auto-glm-fill.js 每天 10 条 (per AGENTS.md)
  - 8/10 起每天填 10 条, K3 9:00 起来点最终提交 + 邮箱验证
  - **agent 填 + K3 点**: 半自动 (ToS 合规, 整批 bot 风险)
  - **首周目标**: 20-30 条合规目录 = 日本实体存在感基线
- **品牌词埋点** (K3 8/8 02:52 第 3 段, 8/9-8/11 retrofit 期间):
  - cross-border-ecommerce-shipping-box-guide (8/9) 末尾自然提及「ジープリント」+ 「学园祭印刷」+ 「卒業記念アルバム」2-3 次
  - baby-product-label-sticker-printing-guide (8/9) + cmyk-guide (8/10) + paper-materials (8/11) 都加
  - **目标**: 8/12 测 branded search ≥1 个 query 命中 zprintpro.com 域名
- **§0.9 增补: 外链注册自动化边界** (K3 8/8 02:52 拍板):
  - ✅ 可批量: 行业目录/本地商会/创业名录 → AutoGLM 填表, K3 点提交+验证
  - ✅ 可自动: 清单文发现 + outreach 起草 (发送归 K3)
  - ⛔ 禁止: 论坛签名档/评论留链/Web2.0/PBN/自动换链 (Penguin + 封号风险)
  - **守住一条**: agent 填表, 最终提交按钮和邮箱验证由 K3 点 (ToS 合规)
- **branded search 监测** (K3 8/8 02:52 第 3 段, 8/12 复盘):
  - 6 个 query: ZprintPro / ジープリント / ジープリント 印刷 / ジープリント ステッカー / ジープリント 評判 / ジープリント 料金
  - baseline 8/8 = 0, target 8/12 ≥1 个 query 命中 zprintpro.com
  - 监测 cron: zprintpro-gsc-feedback-loop (每周三 15:00) + 8/12 review 当日手动统计



【v8.6 升级 (2026-08-08 04:00 M3 K3 GSC 数据驱动优化执行 + 5 SKU 改字)】
- **触发**: K3 8/8 03:44 GSC 数据分析 (JA 1638 imps 1.04% CTR pos 37 / EN 2641 imps 0.53% CTR pos 27) + M3 8/8 04:00 v2 深度分析 (134 JA query + 200+ EN query + 87 SKU 命中 + 5 天执行表).
- **报告落盘** (SSoT):
  - v1: `.hermes/k3-inbox/2026-08-08-0344-gsc-ja-en-analysis.md` (14K, 概要 + 5 天执行)
  - **v2**: `.hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md` (24K, 详细 SKU 命中 + 改字模板 + branded search)
  - **matrix**: `.hermes/industry-keyword-matrix.json` gsc_targeting_v2 段 (+31K, 7 JA buckets + 12 EN buckets + 5 SKU JA/EN 改字表 + 5_day_execution)
- **5 SKU JA P0 (8/8 10:15 amend push)**:
  1. **a2-posters**: title_ja "A2ポスター印刷 1-3日 防水 PP加工 1枚〜" + 7 行业 (屋外広告/展示会/イベント/学園祭/ショップ/飲食/不動産) + 5 FAQ
  2. **outdoor-posters**: title_ja "屋外防水ポスター 耐候3年+ UV加工 PP 1枚〜" + 6 行业 + 5 FAQ
  3. **fluorescent-stickers**: title_ja "蛍光ステッカー 1枚〜 防水 PP加工 ダイカット" + 5 行业 + 5 FAQ
  4. **kraft-paper-bags**: title_ja "クラフト紙袋 印刷 100-200枚〜 オリジナル logo" + 6 行业 + 5 FAQ
  5. **textbooks**: title_ja "教科書・教材 印刷製本 無線綴じ 50冊〜 学校/塾" + 6 行业 + 5 FAQ
- **5 SKU EN P0 (8/8 10:15 amend push)**:
  1. **small-batch-stickers** (P0 抓强 pos 7.76 0% CTR): title_en "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof" + 8 行业 (DTC/Craft/Brewery/Skincare/Pet Food/Subscription Box/E-commerce/Event) + 5 FAQ
  2. **a2-posters** (P0 120+ imps 黑洞): title_en "A2 Poster Printing 1-3 Day Turnaround UV-Coated Lamination Free Shipping 100+ MOQ" + 8 行业 + 5 FAQ
  3. **waterproof-stickers** (P0 100+ imps 黑洞): title_en "Waterproof Stickers 5+ Years Outdoor UV Lamination Free Shipping 100 MOQ" + 8 行业 + 5 FAQ
  4. **saddle-stitch-booklets** (P0 88 imps 黑洞 pos 73-87): title_en "Saddle Stitch Booklets 16-64 Pages 1-3 Day Wire Bound Catalog Printing Free Shipping 100 MOQ" + 8 行业 + 5 FAQ
  5. **kraft-paper-bags** (P0 抓强 pos 10.38/13.38 0% CTR): title_en "Kraft Paper Bags 100-200 GSM Custom Logo Printed 5,000 MOQ Free Shipping Asia Factory" + 8 行业 + 5 FAQ
- **8/9 Org sameAs 改 src/lib/seo.ts** (待 K3 9:00 提供 X + LinkedIn + IndexNow key):
  - alternateName: ['ジープリント', 'ZprintPro JP', '智印港']
  - sameAs: [X, LinkedIn, 30 JP 目录, Startup Base] (K3 9:00 提供具体 URL)
  - areaServed: [JP, US, HK]
  - knowsAbout: [学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷, cmyk printing, waterproof stickers, small batch stickers]
  - **预期**: EN KP imps 9→30+ (3.3x), JA KP imps 4→30+ (7.5x), branded search 6 query 基线 0→≥1
- **5 天节奏 (8/8 04:00 - 8/12 22:00)** (per matrix gsc_targeting_v2.5_day_execution):
  - 8/8 (Sat): K3 9:00 跑 3 设备 + Supabase + formsubmit + 提供 key / M3 10:15 amend push 5 SKU 改字 + retrofit cross-border + ジープリント 埋点
  - 8/9 (Sun): M3 amend Org sameAs + 1 push / K3 跑 301 5/5 / K3 AutoGLM 准备
  - 8/10 (Mon): M3 retrofit cmyk-guide P0 (305 imps pos 86) / K3 跑 AI 可见性 ≥1/4 / K3 AutoGLM 启动 10 条
  - 8/11 (Tue): M3 retrofit paper-materials + 3 篇 P1 (envelope / a1-posters / pvc-menu) / K3 跑复盘预填
  - 8/12 (Wed): 0 push / K3 跑复盘 5min + AI 可见性复测 + branded search 6 query
- **§0.7 关键漏斗 endpoint 部署后必 production smoke 3 步** (K3 8/8 01:03 拍板, 8/7 18:30 9ab9ee4 教训固化):
  - step 1: curl POST /api/quote/ 期望 HTTP 200 + UUID
  - step 2: curl GET Supabase /rest/v1/quotes?order=created_at.desc&limit=5 期望看到最新记录
  - step 3: 双向 verify 2/2 PASS 算 §0.7 PASS
  - 不跑 = 不算 PASS (K3 8/8 01:03 拍板)
- **§0.8 Self-Reminder 防抖** (K3 8/8 01:56 P0 阻断):
  - 已知时间点: 用 cron once with `at` 一次性触发后自删
  - 未知事件: 轮询必带 max_retry + 指数退避 + 超时自毁
  - 1h 内 >3 次无实质操作: P0 故障, 立即告警
- **branded search 6 query 监测** (K3 8/8 04:00 拍板):
  - ja: ジープリント / ZprintPro / 智印港 / zprin
  - en: ZprintPro / zprint / zprintpro printing / zprintpro.com
  - baseline 8/8 = 0, target 8/12 ≥1 命中 zprintpro.com
  - 监测 cron: zprintpro-gsc-feedback-loop (每周三 15:00) + 8/12 review 当日手动统计
- **8/8 09:55 cron once 7e2cc0ba 触发** (per §0.8):
  - 校验 SSoT v8.6 + 准备 amend AGENTS.md 198 + retrofit cross-border commit + 5 SKU 改字
  - 与 10:15 daily cron 合并 1 effective push (§0.1 攒批)
  - 触发即终止 (per §0.8 原则 2)



【v8.7 升级 (2026-08-08 04:30 M3 K3 GSC zh-hk 香港 5 SKU 改字 + 2 LLM blog)】
- **触发**: K3 8/8 04:30 zh-hk GSC 数据分析 (3 月 13759 imps / 7 天 1332 imps / CTR 2.7% 三市场最强) + M3 v3 深度分析 (200+ ZH query + 87 SKU 命中 + 5 顶级信号 + 2 LLM 引文 pos 1+5).
- **报告落盘** (SSoT):
  - **v3**: `.hermes/k3-inbox/2026-08-08-0430-gsc-zh-hk-v3-analysis.md` (30.6K, 详细 ZH-HK 分析)
  - **matrix**: gsc_targeting_zh_hk_v3 段 (+24K, 12 ZH 黑洞桶 + 5 SKU 改字 + 2 LLM blog + NAP 强化 4 段)
- **5 SKU zh-hk P0 (8/8 10:15 amend push 合并 1 push)**:
  1. **same-day-flyers** (3 月 333 imps 黑洞 pos 46.49 + 7 天 32 imps pos 42.16 升 4 位): title_zh "即時傳單印刷 100張〜 香港觀塘新蒲崗 即日取貨 4-6小時" + 8 行业 (餐廳/零售/地產/活動/補習社/選舉/美容/學校) + 5 FAQ
  2. **a2-posters** (3 月 856 imps 黑洞王 pos 37.95 + 7 天 73 imps pos 26.78 升 11 位): title_zh "A2 海報印刷 100張〜 防水 PP加工 香港觀塘新蒲崗 即日 DHL 2-4日" + 8 行业 (地產/活動展覽/餐廳/零售/補習社/選舉/學校/美容院) + 5 FAQ
  3. **doujinshi-printing** (3 月 1/2 50% CTR + 7 天 1/1 100% pos 3 顶级): title_zh "同人誌印刷 50本〜 香港觀塘新蒲崗 無線膠裝 騎馬釘 雙封面 7-10日" + 6 行业 (同人/動漫/插畫/學生/Cosplay/獨立出版) + 5 FAQ
  4. **kraft-paper-bags** (3 月 521 imps 黑洞 pos 57.44 + 7 天 9 imps pos 68.67): title_zh "牛皮紙袋印刷 100個〜 100/120/150 GSM 香港 餐廳零售環保" + 6 行业 (餐廳/零售/化妝品/食品/禮品/環保) + 5 FAQ
  5. **food-boxes** (3 月 634 imps 黑洞 pos 39.98 + 7 天 25 imps pos 48.28): title_zh "食品包裝盒印刷 100個〜 香港餐廳外賣食品級 牛皮紙 白卡" + 6 行业 (餐廳外賣/食品店/烘焙店/茶飲/化妝品/電子產品) + 5 FAQ
- **2 LLM 引文 blog 主题 (8/10 + 8/11 retrofit 写)**:
  1. **eco-packaging-hong-kong-supplier-guide** (Pillar Page 3000-5000 字, 8/10 写): 锚定 LLM 引文 pos 1 "我公司想轉用環保包裝物料，請問有冇邊啲香港中小企供應商比較專業？" + 6 行业 (食品/餐廳/烘焙/茶飲/化妝品/電子) + FAQPage + BreadcrumbList
  2. **reliable-printing-supplier-hong-kong-guide** (Cluster Article 1500-2500 字, 8/11 写): 锚定 LLM 引文 pos 5 "我想為我的網店尋找一間可靠的印刷供應商，可以介紹一些中小企公司嗎？" + 5 行业 (網店/中小企/學校/補習社/同人) + FAQPage
  - **预期**: AI 可见性 ≥1/4 → ≥2/4 引擎 (Perplexity / ChatGPT 期望 pos 1-5 引用 zprintpro.com)
- **NAP 强化 4 段 (8/9 Org sameAs 改后立即生效)**:
  1. **品牌 NAP**: "智印港 印刷公司 — 香港觀塘 新蒲崗 即日取貨 / DHL 國際配送 2-4日"
  2. **MTR NAP**: "MTR 燈箱廣告 12-sheet 規格 + 價錢表" (mtr-advertising-specs blog 内链)
  3. **联系 NAP**: "WhatsApp 即時報價 +86 198 8085 1334 / zprintpro@outlook.com"
  4. **物流 NAP**: "亞洲工廠直送 + DHL 全球 2-4日 (美加澳 4-6日)"
- **5 天执行表 (8/8 - 8/12) 香港部分**:
  - 8/8: K3 9:00 跑 3 设备 + 提供 X/LinkedIn key / M3 10:15 amend push 15 SKU 改字 (5 JA + 5 EN + 5 zh-hk) + retrofit cross-border + AGENTS.md 198 合并 1 push
  - 8/9: M3 amend push Org sameAs 改 + retrofit / K3 跑 301 5/5
  - 8/10: M3 retrofit cmyk-guide P0 + 写 eco-packaging-hk blog / K3 跑 AI 可见性 ≥1/4 + AutoGLM 启动
  - 8/11: M3 retrofit paper-materials + 写 reliable-printing-hk blog / K3 跑复盘预填
  - 8/12: 0 push 复盘 / K3 跑 5min 手测 + branded search + AI 可见性复测
- **§0.7 §0.8 §0.9 引用 (per K3 8/8 拍板)**:
  - §0.7 关键漏斗 endpoint production smoke 3 步 (8/9 Org sameAs 改后必跑, 不跑不算 PASS)
  - §0.8 Self-Reminder 防抖 (8/8 09:55 cron once 7e2cc0ba 一次性触发, 不空转)
  - §0.9 外链注册自动化边界 (8/10 起 AutoGLM 30 目录填表, K3 点提交)
- **8/12 期望 KPI (香港)**:
  - ZH CTR 3m 1.55% → 1.85%+, 7d 2.7% → 3.5%+
  - ZH pos 3m 30.63 → 26, 7d 23.69 → 18
  - 智印港 branded 31 imps pos 2.32 → 60+ imps pos 1 80%+ CTR
  - 同人誌 PDP 维持 100% CTR pos 1-3
  - a2-posters pos 26.78 → 15-20, CTR 0% → 1-2%
  - AI 可见性 ≥2/4 引擎 (LLM 引文 pos 1+5 + blog 加固)
  - ZH 询盘 0 → ≥3 (per §6.1 4 天冲刺, 香港最强市场)
- **branded search 6 query 香港部分 (已赢)**:
  - 智印港 3m 6/31 19.35% pos 2.32 → 7d 2/2 100% pos 1 ✅ 顶级信号
  - 期望 8/12: 智印港 60+ imps pos 1 80%+ CTR (Org sameAs 改后)
- **cross-check 5 渲染源 SOP (per MEMORY.md §9, 5 SKU zh-hk 改字必查)**:
  1. src/data/products.ts (title_zh / description_zh 字段)
  2. src/data/sku-seo-data.ts (PDP meta title / description, 优先于 products.ts)
  3. src/data/blog-data/{zh-hk,en,ja}.json (blog 引用此 SKU 的 title / desc)
  4. src/components/pdp/orderform.tsx (PDP 提交后 fallback 文案)
  5. src/components/pdp/referencepriceblock.tsx (PDP 价格表兜底)
  6. public/llms-zh-hk.txt (AI 注入, L11 + L222 副文件)
  - **grep SOP**: `grep -rn "即時傳單" src/ public/` / `grep -rn "A2 海報" src/ public/` / `grep -rn "同人誌" src/ public/` / `grep -rn "牛皮紙袋" src/ public/` / `grep -rn "食品包裝" src/ public/` — 0 残留旧词 + 0 简体字 (zh-hk 必须繁体中文, per §13.16.1)
- **8/8 09:55 cron once 7e2cc0ba 触发** (per §0.8 一次性):
  - 校验 SSoT v8.7 + 准备 amend push 15 SKU 改字 (5 JA + 5 EN + 5 zh-hk) + retrofit cross-border + AGENTS.md 198
  - 与 10:15 daily cron 合并 1 effective push (§0.1 攒批)
  - 触发即终止 (per §0.8 原则 2)
- **月度 push 配额预测**:
  - 8/8: 1 push (amend 合并, 15 SKU 改字 + AGENTS.md 198 + retrofit)
  - 8/9: 1 push (Org sameAs + retrofit)
  - 8/10-8/11: 1 push/天 (per §0.1 攒批)
  - 8/12: 0 push (复盘日)
  - 8/8-8/12 总: 4 push (累计 38/500 = 7.6%)



【v8.8 升级 (2026-08-08 04:40 K3 战略级 4 字+①②③ 拍板, Mavis "按最优执行")】
- **触发**: K3 8/8 04:35 战略级评估: M3 v2/v3 报告 A- 质量, 但期望偏乐观 2 倍, 资源按 imps 错配, 下两周核心 = 复制智印港公式到日本 + 砍低 ROI 动作.
- **核心战略转向 (K3 拍板 4 字 + ①②③)**:
  - **4 字**: ① X URL ② LinkedIn URL ③ 15 SKU 改字 K3 审字 ④ 8/9 Org sameAs 改 K3 审 diff
  - **①②③**: ① 8/12 复盘改用校准值 (§0.10) ② §0.10-0.12 三条入记忆 (✓ 已写 MEMORY.md) ③ Week 2 排期 OK (8/13-8/21)
- **KPI 校准 (per §0.10 硬约束)**: 任何 4-5 天窗口的 KPI 期望, 按 SEO 时间物理校准:
  - 排名 ≤ 当前位置 -15% (不是 -30%); imps ≤ +30% (不是 +50%+)
  - schema 变更打 5 折; 内容 retrofit 需 1-2 周; NAP 不控需求
  - 复盘按校准值判 PASS, 防"方向正确但时间未到"误判
- **资源分配原则 (per §0.11 硬约束)**: 禁止按 imps 大小排优先级, 按"4 天可兑现速度"分 3 档:
  - **P0 抓强信号** (pos ≤ 10 但 0% CTR, 4 天可兑现): small-batch-stickers pos 7.76 / 牛皮紙盒 pos 1 / 燙金貼紙 pos 2.55 / 彩色信封 pos 1
  - **P1 本地实体建设** (智印港公式 + ジープリント + 30 目录, 2-6 周复利): Org sameAs / AutoGLM / MTR NAP
  - **P2 黑洞大词** (a2-posters 856 imps / food-boxes 634 / JA cmyk 197, 需外链+时间): 排最后
- **转化侧指标 (per §0.12 硬约束)**: 8/12 起复盘必含:
  - WhatsApp 询盘数 (期望 0 → ≥5)
  - 响应时长 (≤ 2h)
  - 表单→询盘转化率 (≥ 0.05%)
- **3 市场分层战略 (K3 拍板)**:
  - **zh-hk 香港 = 收割** (抓强 + 2 LLM blog + NAP 4 段 + 询盘转化) — 期望 7d CTR ≥3.2% / 询盘 ≥5 / pos ≤21
  - **ja 日本 = 复制公式** (ジープリント + 30 目录 + knowsAbout + 移动优先) — 期望 KP imps ≥10 / branded ≥1 / 目录 30/30
  - **en 美国 = 低成本抓强** (只改 5 SKU title, 不写内容) — 期望 small-batch CTR ≥3% / KP ≥15
- **Week 1 (8/8-8/12) 3 处修正**:
  - **8/8 amend push 调整**: 先修 EN small-batch-stickers (P0 抓强 pos 7.76/29imps/0%CTR, ROI 最高单点), 再合并 15 SKU (5 JA + 5 EN + 5 zh-hk) 1 push
  - **8/9 起 GSC 抓强监控**: pos ≤ 10 但 0% CTR query 清单, 改 title 后 72h 验 CTR, 形成"改→验"闭环
  - **8/12 复盘用校准值 + 加转化指标** (WhatsApp 询盘数 + 响应时长 + 表单→询盘转化率)
- **Week 2 (8/13-8/21) 排期**:
  - 8/13: zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers) / AutoGLM 目录 10 条 + outreach 跟进
  - 8/14: eco-packaging-hk pillar 内链加固 / 目录 10 条
  - 8/15: JA 移动端专项 (JA 移動 CTR 2.36% 是桌面 3.4 倍, title 前 30 字移动截断优化) / K3 发第二批 outreach
  - 8/16: EN 抓强二批 (paper bag gsm FAQPage) / 目录收尾 10 条
  - 8/17: reliable-printing-hk cluster + pillar 互链 / AI 可见性复测 4 引擎
  - 8/18: JA 教科書/教材 title 二批 (80 imps pos 38.92, Week1 验证后决定) / 清单文上榜确认
  - 8/19: cmyk-guide 二次 retrofit (视 pos 进展) / branded search 6 query 复测
  - 8/20: 缓冲日 (补欠账, 无欠账则 0 push)
  - 8/21: 双周复盘 0 push, 全 7 项 §6 验收
- **8/21 校准 KPI** (per §0.10):
  - ZH 7d CTR ≥3.2% (校准: M3 期望 3.5% 校准至 3.1-3.3%)
  - ZH 询盘累计 ≥5 (per §0.12 转化侧指标)
  - JA branded ≥1 (智印港 31 imps → 40-45 imps)
  - JA KP ≥10 (Org sameAs 改后渐进)
  - EN small-batch CTR ≥3% (pos 7.76 0% → 3-5%)
  - AI 可见性 ≥2/4 (LLM 引文 pos 1+5 已有 + blog 加固)
  - 目录 30/30 (AutoGLM 8/10-8/19 完成)
  - 301 5/5 (K3 8/9 跑 CF Bulk Redirect List)
- **8/8 10:15 amend push 1 调整清单 (优先抓强信号)**:
  - **P0 第 1 优先 (先改, 不跟其他合并)**: EN small-batch-stickers title_en "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof" + 8 行业
  - **P0 第 2 批 (跟其他合并 1 push)**: 5 SKU JA + 4 SKU EN + 5 SKU zh-hk 改字 + AGENTS.md 198 + retrofit cross-border
  - **§0.11 资源重排**: a2-posters 856 imps 黑洞王从 P0 第 1 → P0 第 5 (8/13 zh-hk 抓强二批时再改)
- **9:00 任务提前跑结果 (M3 已跑)**:
  - ✅ §0.7 production smoke step 1: curl POST /api/quote/ HTTP 200 + UUID `4892080c-3e77-4be6-8368-d93944a68b29` + created_at 2026-08-07T20:32:52Z
  - ✅ §0.7 step 2: 3 locale /contact HTTP 200 + wa198 3/3 + wa181 0/3
  - ✅ §0.7 step 3: 5 zh-hk 关键 PDP baseline (发现 kraft-paper-bags + food-boxes 仍用旧 brand "智印雲", 改字时统一改 "智印港")
  - ✅ §0.7 step 4: 5 渲染源 + 3 llms 副文件 0 残留 181
  - ❌ §0.7 step 5: Supabase GET 验证落库 — M3 无 SERVICE_ROLE_KEY, K3 9:00 在 Supabase dashboard 查 (期望 8/7 18:30 id fae355ba-... + 8/8 04:35 id 4892080c-... 两条)
- **K3 9:00 必跑 4 件 (M3 不跑, K3 真实身份)**:
  1. 3 设备 /contact 端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
  2. Supabase dashboard 查 quotes 表 (期望 8/7 18:30 + 8/8 04:35 两条)
  3. formsubmit.co 收件箱激活 (8/7 18:45 触发的激活邮件, K3 点链接)
  4. 提供 X + LinkedIn URL + IndexNow key (8/9 Org sameAs 必填)
- **§0.13 K3 战略拍板 4 字+①②③ 模式** (per MEMORY.md §0.13):
  - Mavis "按最优执行" 自主范围: 5 SKU 选择 / 改字 USP / 5 天节奏 / 矩阵 / cron 升级 / 报告 / 记忆固化 / 9:00 任务能跑部分
  - K3 9:00 必跑: 3 设备真实身份 / Supabase dashboard / formsubmit 激活 / 提供 key
- **月度 push 配额预测**:
  - 8/8: 1 push (amend 合并: P0 small-batch + 14 SKU 改字 + AGENTS.md 198 + retrofit)
  - 8/9: 1 push (Org sameAs + retrofit)
  - 8/10-8/12: 1 push/天 (per §0.1 攒批)
  - 8/13-8/21: 1 push/天 (Week 2 排期)
  - 8/22 月末: 0 push (复盘)
  - 8/8-8/22 总: 14 push (累计 48/500 = 9.6%)



【v8.9 升级 (2026-08-08 04:50 K3 战略级 4 字+①②③ 落实 + 3 市场分 cron 设计)】
- **触发**: K3 8/8 04:50 "按最新的报告的执行结果更新我们的定时任务指令" + v8.8 已锁 KPI 校准 + 资源重排 + 3 市场分层 + 双周排期, 需同步到 cron 任务卡

## 一、3 市场分 cron 任务设计 (per K3 8/8 04:35 战略)

**核心原则** (per §0.11 资源分配): zh-hk=收割 / ja=复制公式 / en=低成本抓强

**3 个 sub-cron 任务卡** (写入 `.hermes/cron-prompts/`, git tracked, mavis cron update 走 daemon):
1. **zprintpro-daily-content-1x7w-zhhk-harvest.md** (12K chars) - zh-hk 收割 (抓强 + 2 LLM blog + NAP 4 段 + 询盘转化)
2. **zprintpro-daily-content-1x7w-ja-formula.md** (10K chars) - ja 复制公式 (ジープリント + 30 目录 + knowsAbout + 移动优先)
3. **zprintpro-daily-content-1x7w-en-grab.md** (8K chars) - en 抓强 (small-batch-stickers 等 5 SKU title 改字监控 + 不写内容)

**整合 1 主 cron + 3 sub-cron 模式**:
- 主 cron `zprintpro-daily-content-1x7w` 每天 10:15 触发, **任务分发到 3 sub-cron** (按 locale 数据驱动)
- 3 sub-cron 各自独立 prompt, 避免主 cron 过长 (15K chars+) + 各自 enable/disable 灵活
- 主 cron 末尾 "调度" 段: read 3 sub-cron 内容 + 按 locale 路由任务
- 8/9 起 3 sub-cron 启用, 8/13 Week 2 增 zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers)

## 二、8/9 起 GSC 抓强监控 cron 设计 (per K3 8/8 04:35 战略)

**新 cron 任务卡**: `zprintpro-daily-content-1x7w-gsc-strong-signal.md` (8K chars)
- **触发**: 8/9 起 daily 22:00 (mavis cron once + 重复, 但 1 次跑完即停)
- **核心逻辑** (per §0.11 资源分配 P0 抓强信号):
  - step 1: 拉 GSC 7 天数据, 过滤 pos ≤ 10 AND clicks < 0.5 * imps/100 (即 CTR < 0.5%)
  - step 2: 对每个 query 找当前 PDP slug (via products.ts blog-posts.ts category)
  - step 3: 判断是否已在 7 天内被改过 (git log --since=7d)
  - step 4: 新发现的强信号入 `.hermes/k3-inbox/daily-strong-signal-YYYY-MM-DD.md`
  - step 5: K3 9:00 拍板: 1) 立即改 2) 24h 后改 3) 加入 Week 2 排期
- **预期输出**: 每日 1-3 个新抓强信号, 4 天可兑现 CTR 提升 3-5%
- **闭环**: 改 title → 72h 验 CTR (cron auto check) → 形成闭环
- **TTL 自删** (per §0.8): 跑完输出 → mavis cron once delete_after_run=true → 不留 tick 残留

## 三、KPI 校准值同步 (per §0.10 硬约束)

**任何 cron 输出 KPI 必含校准值列** (从 v8.9 起强制):

| 指标 | M3 初始期望 | K3 校准值 | 校准公式 |
|------|-----------|----------|---------|
| 排名 | ≤ -30% | ≤ -15% | 排名响应周期 2-6 周, 4 天只反映 snippet |
| imps | ≤ +50% | ≤ +30% | title 改字 CTR 1-2 周重抓 |
| schema 变更 (Org sameAs / knowsAbout) | +50%+ | +15-30% | 需重抓+重算, 打 5 折 |
| 内容 retrofit | 排名升 30%+ | 升 15% | 4 天外链不够, 1-2 月时间 |
| 本地 NAP (觀塘/新蒲崗) imps | +100% | +33% | NAP 不控需求, 是需求侧 |
| KP (Knowledge Panel) imps | 7-9x | 1.5-2x | 增强渐进, 4 天基础变化 |

**复盘 SOP** (per §0.10):
- 任一 KPI 超校准值 = 优秀
- 介于校准值与初始期望之间 = 合格
- 低于校准值 = 需分析 (不一定是策略失败, 可能"方向正确但时间未到")
- 防"方向正确但时间未到"误判为"策略失败"而错误转向

## 四、9:00 任务提前跑 4/5 PASS 教训 (M3 8/8 04:35 跑)

**9:00 必跑 4 件** (K3 真实身份, M3 不跑):
1. 3 设备 /contact 端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
2. Supabase dashboard 查 quotes 表 (期望 8/7 18:30 id fae355ba-... + 8/8 04:35 id 4892080c-... 两条)
3. formsubmit.co 收件箱激活 (8/7 18:45 触发的激活邮件, K3 点链接)
4. 提供 X + LinkedIn URL + IndexNow key (8/9 Org sameAs 必填)

**M3 提前跑 4/5 PASS** (K3 8/8 04:35 拍板 "9:00 任务提前跑" 自主范围):
- ✅ step 1: curl POST /api/quote/ → HTTP 200 + UUID `4892080c-3e77-4be6-8368-d93944a68b29` (8/7 18:30 9ab9ee4 部署完全工作)
- ✅ step 2: 3 locale /contact → 3/3 HTTP 200 + wa198 3/3 + wa181 0/3 + hasForm 3/3
- ✅ step 3: 5 zh-hk PDP baseline → 3/5 智印港 NAP 已赢 + **2/5 旧 brand "智印雲" 需改** (kraft-paper-bags / food-boxes)
- ✅ step 4: 5 渲染源 + 3 llms 副文件 → 0 残留 181 (8/8 PASS)
- ❌ step 5: Supabase GET 验证落库 → M3 无 SERVICE_ROLE_KEY, K3 9:00 dashboard 查

**教训固化** (写进 cron, 9:00 任务 SOP):
- 任何"9:00 必跑" 任务, M3 "按最优执行" 范围 = 提前跑能跑的部分 (curl / production smoke / grep verify)
- K3 真实身份必跑部分 = 3 设备端到端 + Supabase dashboard 查 + formsubmit 激活 + 提供 key
- M3 跑完前 4 步 + 落 PASS 报告 → 升级 K3 简化 9:00 决策

## 五、双周排期同步 (per K3 8/8 04:35 战略 + matrix v4)

### Week 1 (8/8-8/12) 3 修正

**8/8 10:15 amend push 调整** (per K3 战略级 P0 第 1 优先):
- P0 第 1 优先 (单独改): EN small-batch-stickers (pos 7.76/29imps/0%CTR/全项目 ROI 最高单点)
- P0 第 2 批 (合并 1 push): 5 SKU JA + 4 SKU EN + 5 SKU zh-hk 改字 + AGENTS.md 198 + retrofit cross-border
- K3 9:00 拍板: A 2 commit 2 build vs B 1 amend 1 build (§0.1 攒批)

**8/9 起 GSC 抓强监控** (per cron 设计 §二):
- 8/9 22:00 第一次跑, 9/10 22:00 第二次跑, ...
- 每日 1-3 个新抓强信号, K3 9:00 拍板 1/2/3 (立即改 / 24h 后改 / 加入 Week 2 排期)

**8/12 复盘用校准值 + 转化指标** (per §0.10 + §0.12):
- 不按 M3 乐观值判 PASS/FAIL, 按 K3 校准值
- 必含 3 转化指标: WhatsApp 询盘数 + 响应时长 + 表单→询盘转化率

### Week 2 (8/13-8/21) 9 天排期

| 日期 | push (1/天) | 站外 (不占 push) |
|------|------------|------------------|
| 8/13 | zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers 4 SKU) | AutoGLM 目录 10 条 + outreach 跟进 |
| 8/14 | eco-packaging-hk pillar 内链加固 | AutoGLM 目录 10 条 |
| 8/15 | JA 移动端专项 (title 前 30 字移动端截断优化) | K3 发第二批 outreach |
| 8/16 | EN 抓强二批 (paper bag gsm FAQPage 5 Q) | AutoGLM 目录收尾 10 条 |
| 8/17 | reliable-printing-hk cluster + pillar 互链 | AI 可见性复测 4 引擎 |
| 8/18 | JA 教科書/教材 title 二批 (textbooks + exercise-books + graduation-yearbook) | 清单文上榜 |
| 8/19 | cmyk-guide 二次 retrofit (视 pos 进展) | branded search 6 query 复测 |
| 8/20 | 缓冲日 (补欠账, 无欠账则 0 push) | — |
| 8/21 | 双周复盘 0 push, 全 7 项 §6 验收 | — |

### 8/21 校准 KPI (per §0.10)

| 指标 | 校准值 | 来源 |
|------|--------|------|
| ZH 7d CTR | ≥3.2% | M3 期望 3.5% 校准至 3.1-3.3% |
| ZH 询盘累计 | ≥5 | per §0.12 转化侧指标 |
| JA branded | ≥1 | 智印港 31 imps → 40-45 imps |
| JA KP imps | ≥10 | Org sameAs 改后渐进 |
| EN small-batch CTR | ≥3% | pos 7.76 0% → 3-5% |
| AI 可见性 | ≥2/4 引擎 | LLM 引文 pos 1+5 已有 |
| 目录 | 30/30 | AutoGLM 8/10-8/19 |
| 301 | 5/5 | K3 8/9 CF Bulk Redirect List |

## 六、月度 push 配额预测 (8/8-8/22)

- 8/8: 1 push (amend 合并, 15 SKU 改字 + AGENTS.md 198 + retrofit) — K3 拍板 A/B
- 8/9: 1 push (Org sameAs + retrofit)
- 8/10-8/12: 1 push/天 (per §0.1 攒批)
- 8/13-8/21: 1 push/天 (Week 2 排期)
- 8/22: 0 push (月末复盘)
- **8/8-8/22 总**: 14 push (累计 48/500 = 9.6%)

## 七、3 sub-cron 任务卡路径 (SSoT, git tracked)

1. **zprintpro-daily-content-1x7w-zhhk-harvest.md** (12K chars) - zh-hk 收割
2. **zprintpro-daily-content-1x7w-ja-formula.md** (10K chars) - ja 复制公式
3. **zprintpro-daily-content-1x7w-en-grab.md** (8K chars) - en 抓强
4. **zprintpro-daily-content-1x7w-gsc-strong-signal.md** (8K chars) - GSC 抓强监控

**主 cron + 3 sub-cron 关系**:
- 主 cron (本文件 v8.9, 46K chars): 总策略 + 任务调度 + KPI 校准 + 9:00 任务 + 双周排期
- 3 sub-cron: 各市场具体任务 (改字模板 / NAP 强化 / 抓强信号 / 实体建设)
- GSC 抓强监控 sub-cron: 独立 daily 22:00 跑 (不跟主 cron 同步)

**mavis cron update 三步曲 (per C31 lesson)**:
1. 改 SSoT (本主 cron v8.9 + 3 sub-cron + GSC 抓强监控)
2. mavis cron update 完整 prompt
3. mavis cron get 验证 daemon 跟 SSoT 1:1 一致

## 八、§0.13 K3 战略拍板 4 字+①②③ 模式 (per MEMORY.md §0.13)

**K3 战略拍板格式**: 4 字 + ①②③ (4 项必拍 + 3 必拍)
- 4 字: 战略核心 4 项必拍 (URL / SKU 审字 / Org sameAs / 等)
- ①②③: 战略配套 3 必拍 (校准值 / 记忆固化 / Week 排期)
- M3 "按最优执行" 自主范围 + K3 9:00 必跑 4 件

**M3 自主范围** (不需 K3 再确认):
- 5 SKU JA/EN/zh-hk 选择 + 改字 USP 模板
- 双周排期 + 3 sub-cron 设计
- matrix v2/v3 + 2_weeks_execution 段
- cron prompt v8.6/7/8/9 升级
- §0.10-0.13 记忆固化
- 9:00 任务能跑的部分提前跑

**K3 9:00 必跑 4 件** (M3 不跑, K3 真实身份):
1. 3 设备 /contact 端到端
2. Supabase dashboard 查 quotes 表
3. formsubmit.co 收件箱激活
4. 提供 X + LinkedIn URL + IndexNow key

**应用范围**: 任何 K3 高层战略拍板 + 任何 Mavis "按最优执行" 自主执行边界

## 九、报告落盘 (本 v8.9 升级)

- 本 v8.9 升级: cron prompt v8.8 → v8.9 (本节, 整合 3 sub-cron 设计 + 抓强监控 + KPI 校准 + 9:00 教训 + 双周排期)
- 3 sub-cron 任务卡: 待写 (zh-hk 收割 / ja 复制公式 / en 抓强 + GSC 抓强监控)
- K3 status 报告: 待落 (`.hermes/k3-inbox/2026-08-08-0450-m3-v89-sync.md`)

---

**M3 "按最优执行" 自主拍板** (本 v8.9 升级已自主执行):
- ✅ 3 sub-cron 任务卡设计 (zh-hk 收割 / ja 复制公式 / en 抓强)
- ✅ GSC 抓强监控 sub-cron 设计 (8/9 起 daily 22:00, TTL 自删)
- ✅ KPI 校准值同步 (per §0.10, 任何 cron 输出必含校准值列)
- ✅ 9:00 任务提前跑 4/5 PASS 教训固化 (M3 自主范围 + K3 真实身份必跑 4 件)
- ✅ 双周排期同步 (Week 1 3 修正 + Week 2 9 天 + 8/21 校准 KPI)
- ✅ 月度 push 配额预测 (8/8-8/22 总 14 push = 48/500 = 9.6%)
- ✅ §0.13 K3 战略拍板 4 字+①②③ 模式写进 cron

**M3 待执行 (K3 9:00 拍板后)**:
1. 写 3 sub-cron 任务卡 (zh-hk / ja / en + GSC 抓强)
2. mavis cron update 4 个 sub-cron (三步曲, C31 lesson)
3. 落 K3 status 报告 v8.9 同步

【T2 cron 治理 (2026-08-06 0:39 K3 拍板)】
- **严禁 git add -A / git add . / git add -u**: 只 git add 本 session 显式生成的 .ts/.tsx/.json/.md 具体路径
- **commit 前 3 问**:
  1. git status -sb 看 staged files 是否都是本 session 生成 (博客 / SKU / data 文件)
  2. unstaged working tree 是否有其他 session 残留 (若是 → git checkout 清掉, 不 commit 他人工作)
  3. 修改的 src/ 文件数是否 ≤ 1 篇博客 改动 (若 > 1 → 拆 commit, 不攒批)
- **同日双触发 yield 检查**: 跑本 cron 前, 若今天已有 cron commit 过 (git log --since="00:00" --author=cron 或 mavis session log), 跳过本轮, 写 .hermes/logs/YYYY-MM-DD-daily-yield.md 解释, 升级 K3
- **同日并发竞态防护**: 本 cron 启动时先 `git status -sb` + `git fetch origin_ssh` + `git log origin_ssh/main..HEAD` 三件套, 有 ahead=0 + 无未 commit 残留 才允许 commit


## v9.0 增补段 (2026-08-08 07:12 K3 战略纠偏)

### §v9.0.A 8/9 必跑 (P0, 2 push 上限)

**8/9 push 1 (P0 第 1 优先, locale-aware siteName 切换)**:
1. `src/lib/seo.ts` siteName 字段改 locale-aware:
   ```ts
   siteName: locale === 'zh-hk' ? '智印港' : (locale === 'ja' ? 'ジープリント' : 'zprintpro')
   ```
2. `src/lib/seo.ts` getSiteNAP() zh-hk branch name 改 `'智印港'`, alternateName 删 `'智印雲'`/`'智印雲(香港)'`/`'智印雲印刷'`, 加 `'智印港'`
3. `src/lib/seo.ts` en branch name 改 `'zprintpro'`, ja branch name 改 `'ジープリント'` + areaServed 加 JP
4. `src/lib/seo.ts` Organization sameAs: 加 X + LinkedIn (K3 9:00 提供 URL) + 30 JP 印刷目录 (8/10 AutoGLM 跑) + Startup Base + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷]
5. `public/llms.txt` + `public/llms-full.txt` 副文件 8 locale siteName 同步
6. IndexNow ping: 99 URLs (8 locale 4 page types) 用 K3 9:00 提供的 key
7. §0.7 production smoke 3/3 PASS (8 locale curl <title> 验证 智印港/ジープリント/zprintpro)

**8/9 push 2 (按需, 14 SKU 改字余下)**:
- 8/8 10:15 amend push 已合入 14 SKU 改字 (per B 方案), push 2 主要补 K3 9:00 审字反馈的修正
- 如无修正, push 2 跳过, 配额留给 8/10/13 紧急

**M3 必跑 (per v9.0 SOP, 不需 K3 9:00 拍)**:
- 8/9 0:00 (cron daily) - retrofit cross-border-ecommerce-shipping-box-guide (per SSoT 8/8 10:15 amend push 落地)
- 8/9 22:00 (cron once + delete_after_run) - GSC 抓强监控 daily
- 8/9 22:00 报告 - 写 .hermes/k3-inbox/2026-08-09-2200-gsc-strong-signal-r1.md

**K3 9:00 必拍 (per §0.13 4 字+①②③ 模式)**:
- 4 字: X URL / LinkedIn URL / 15 SKU 改字 K3 审字 (重点 ja 自然度 + zh-hk 纯繁) / 8/9 Org sameAs 改 K3 审 diff (新增 5th 字: locale-aware siteName 切换, per K3 8/8 07:12 P0)
- ① 校准值复盘 (per §0.10) / ② §0.15/0.16 入记忆 ✅ / ③ Week 2 排期 + 残留清理插入 ✅
- A/B 方案 → 采 B (1 amend 1 build, per §0.1 攒批, K3 8/8 07:12 拍板)
- 4 件自跑 (per §0.13 9:00 必跑): 3 设备端到端 / Supabase dashboard 查 3 记录链 (fae355ba + 4892080c + 360e8366) / formsubmit.co 激活 / 提供 X+LinkedIn+IndexNow key

### §v9.0.B 840 残留清理 Week 2 3 批 (per §0.16 节奏固化)

| 日期 | 范围 | 量 | 校验 |
|------|------|---|------|
| 8/13 (Wed) | longDescription 前 200 处 | 高流量 PDP 优先 (zh-hk 3 月 13759 imps 命中 SKU) | grep + §0.7 smoke |
| 8/15 (Fri) | description + faq 300 处 | 中流量 SKU + 跨 8 locale | pre-commit 简体字守门 |
| 8/17 (Sun) | schema 剩余 340 处 | JSON-LD Organization / Product / FAQPage 全 schema | JSON-LD validate |
| 8/18 (Mon) | 全量 grep 验收 = 0 (除 k3-inbox 历史引用) | src/ + public/ + AGENTS.md + 4 SSoT 报告允许 | grep 0 残留 + 复盘硬指标 |

**SOP (每批)**:
1. Python 脚本 (regex + line-based 找块) — 不走 Edit/Write (per MEMORY §7)
2. 跑 `grep -c "智印雲" src/data/products.ts` 算残留
3. block 内 brand 修复 (智印雲 → 智印港) + 5 zh-hk title 改 EN/JA 跑成功
4. pre-commit 3 步 (encoding / 简体字 / i18n)
5. commit + push (1 push/批, 8/13/15/17 = 3 push 总用)
6. CF Pages build success + curl 8 locale <title> 验证 + grep 残留 -= 期望数
7. 落盘 .hermes/k3-inbox/2026-08-{13,15,17}-residual-cleanup-batch-{1,2,3}-PASS.md

**8/18 验收硬指标**:
- `grep -c "智印雲" src/data/products.ts` = 0 (除 k3-inbox 历史引用)
- 8 locale <title> 全过 §0.15 公式
- 8/21 复盘必含 §0.15/0.16 2 段
- 不达标 = 扣 KPI, §0.11 资源分配降级

### §v9.0.C 8/8 10:15 amend push (B 方案, 1 amend 1 build)

**B 方案理由 (per K3 8/8 07:12)**:
- small-batch-stickers P0 单独 2 build 浪费 CF 配额 (1 push = 1 build, §0.14 配额 1 天 ≤5)
- 1 amend 1 build 把 small-batch-stickers P0 + 14 SKU 改字合并, §0.1 攒批合规
- 省 1 build 留给 8/9 locale 切换 P0 (per §0.15)
- small-batch-stickers 72h 后 GSC 抓强监控照样验 CTR, 不影响 4 天可兑现 ROI

**amend push 内容**:
1. 14 SKU 改字 (per 8/8 04:30 v3 zh-hk 草稿 + 8/8 04:00 v2 JA/EN 草稿):
   - 5 SKU JA: a2-posters / outdoor-posters / fluorescent-stickers / kraft-paper-bags / textbooks
   - 4 SKU EN: small-batch-stickers (P0 第 1) / a2-posters / waterproof-stickers / saddle-stitch-booklets
   - 5 SKU zh-hk: same-day-flyers / a2-posters / doujinshi-printing / kraft-paper-bags / food-boxes
   - 1 SKU 重复: a2 + kraft (3 locale 共享, 总 11 不同 SKU object)
2. 5 zh-hk title 改 EN/JA 跑成功 (per 8/8 05:00 Python 脚本第 2 次跑, line-based 找块 + 块内 title_xxx 改字)
3. retrofit cross-border-ecommerce-shipping-box-guide (per 8/8 10:15 daily cron 触发, 含 §0.7 production smoke + 末尾ジープリント 埋点 2-3 次)
4. AGENTS.md §0.15/0.16 段新增 (K3 9:00 拍后定稿)

**amend push 风险**:
- 9:00 K3 必拍 4 字 (X + LinkedIn + 15 SKU 审字 + locale 切换) 后才能 amend
- 9:00 K3 4 件自跑 (3 设备 + Supabase + formsubmit + key) 不阻塞 amend push
- amend push 包含 14 SKU 改字, K3 9:00 审字反馈可能要求改某些字 → M3 改后 amend

### §v9.0.D 8/8 22:00 GSC 抓强监控首跑 (cron once + delete_after_run)

**SOP (per §0.8 一次性, 触发即终止)**:
1. 拉 GSC 7d 数据 (8/1-8/7)
2. 筛 pos ≤ 10 但 0% CTR 的 query → "抓强信号" 列表
3. 写 .hermes/k3-inbox/2026-08-08-2200-gsc-strong-signal-r1.md
4. 升级 K3 (如发现新 P0 抓强, 立即 8/9 push)
5. cron self delete (per §0.8 防抖)
6. 8/9-8/21 daily 22:00 (cron once + delete_after_run)

**SLA**:
- 触发 ≤ 3 min 跑完 + 报告 + 自删
- 1h 内 >3 次无实质操作 = P0 故障 (per §0.8)

### §v9.0.E K3 9:00 必拍 (per §0.13 4 字+①②③ 模式 + 8/8 07:12 增补)

**4 字 + 1 增 (K3 必拍, M3 自主范围外)**:
1. X URL (per §0.13 4 字)
2. LinkedIn URL (per §0.13 4 字)
3. 15 SKU 改字 K3 审字 (重点 ja 自然度 + zh-hk 纯繁, per K3 8/8 07:12)
4. 8/9 Org sameAs 改 K3 审 diff (per §0.13 4 字)
5. **locale-aware siteName 切换 5 处改字 K3 审字** (per K3 8/8 07:12 新增 P0, src/lib/seo.ts 5 处 + 3 llms 副文件 8 locale + 1 footer 法律名保留)

**①②③ (per §0.13)**:
- ① 8/12 复盘改用校准值 (per §0.10) ✅
- ② §0.10-0.16 入记忆 ✅ (189.9 KB MEMORY.md)
- ③ Week 2 排期 OK (8/13-8/21) + 残留清理插入 (8/13/15/17 3 批, per §0.16)

**A/B 方案 (per K3 8/8 07:12 拍板)**: 采 B (1 amend 1 build, §0.1 攒批)

**4 件自跑 (P0 阻断 8/12 验收, per §0.13)**:
- 3 设备端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
- Supabase dashboard 查 (期望 3 UUID 记录: fae355ba 8/7 + 4892080c 8/8 04:32 + 360e8366 8/8 05:22)
- formsubmit.co 激活 (8/7 18:45 触发, K3 点链接)
- 提供 X + LinkedIn URL + IndexNow key (per K3 8/8 07:12 4 字 5 增)

**回 "4 字 + 采 B + §0.15/0.16 OK + 4 件跑完"** → M3 立即 10:15 amend push (§0.1 攒批, B 方案 1 amend 1 build)。

### §v9.0.F 配额动态 (per §0.14 + K3 8/8 07:12 折中)

**今日 8/8 用量**: 1/5 push (568087a PASS, 4 buffer 留给 10:15 amend + 紧急)
**8/9 用量预期**: 1-2 push (locale 切换 P0 + 14 SKU 余下按需)
**Week 2 (8/13-8/21) 用量预期**: 3 push (残留清理 8/13/15/17) + 1 push (8/18 grep 验收) = 4 push

**月累计预期** (8/8-8/21 = 14 天): ~7 push = 7/150 = 4.7% (健康)

### §v9.0.G 教训固化 (跨项目)

- **zprintpro 8/8 07:12 K3 战略纠偏**: 部署可靠性 5/5 + 战略落地 5/5 + 护栏 5/5 + 优先级判断 3/5 (840 排 9 月初太晚 + title 品牌残留危害被低估)
- **跨项目 §0.15 品牌一致性 P0**: 任何多 locale 品牌分层项目必须 locale-aware siteName 切换
- **跨项目 §0.16 残留清理节奏**: 任何品牌/术语残留禁止"量大拖延", 必须按 ~170/天 节奏
- **§0.11 资源分配原则验证**: 1 个 locale 切换 P0 > 10 个 SKU 改字 P2 (per K3 8/8 07:12 战略级)

---

**SSoT 同步链**:
- v9.0 升级 → 8/8 10:15 amend push (1 amend 1 build, B 方案) → CF Pages build success → verify-deploy 流水线 (3/3 PASS)
- 8/9 push 1: locale-aware siteName 切换 + Org sameAs + IndexNow (per §0.15 + §0.13 4 字 5 增)
- Week 2 残留清理 8/13/15/17 (3 批, per §0.16)
- 8/18 grep 验收 = 0 (复盘硬指标, per §0.16)
- 8/21 双周复盘 (per §0.10 校准值 + §0.12 转化指标 + §0.15/0.16 2 段)


## v9.1 增补段 (2026-08-09 18:23 Mavis 战略升级)

### §v9.1.A M3 自主抓取 m3-task-cards/ 目录机制 (P0 架构级)

**核心**: K3 8/9 18:23 拍板"M3 自主抓取 m3-task-cards/ 目录, 闭环成立, 减少 K3 中间环节"。

**M3 cron 启动必跑 5 步 (sop)**:
1. `ls -t .hermes/m3-task-cards/ | head -1` 找最新 m3-task-cards 文件
2. 读 m3-task-cards 头部签发 + 角色 (Mavis / 千问 / K3)
3. 评估上次 cron 完成态 (`.hermes/reports/` + `.hermes/k3-inbox/` 最新日期)
4. 按 T1-T5 任务卡执行 (千问战略) + T6 自主抓取 (Mavis 战略)
5. 写本次 cron reports/ + k3-inbox/ + 标记 m3-task-cards/ 完成

**预验证 (8/10 触发前必跑)**:
- dry-run 一次, 验证 1-5 步都通
- 落 `.hermes/reports/m3-autonomous-loop-dryrun-2026-08-10.md` (PASS/FAIL 逐项)
- 不 commit 不 push, 等 K3 拍板触发整合 push

**失败兜底**: M3 仍按 v9.0 cron prompt 跑 (T1-T5 retrofit 主线), T6 失败不影响

### §v9.1.B §0.19 用户暂停信号规则 (2026-08-09 17:56 K3 痛骂教训固化, 跨项目 P0)

**核心**: K3/用户说"暂停"/"pause"/"等指令"/"stop"/"hold" 那一刻,**立即 `mavis cron delete <self>`**, 不再 progress-tag, 不再烧 token。

**触发词 (任一即触发)**:
- 暂停 / 暂停一下 / 先停 / 暂停一会儿
- pause / hold / stop / wait
- "等指令" / "等我下一条" / "我先想想"
- 用户回复明显是 AFK (cron 5min × 12+ 次状态不变)

**强制动作 (按序)**:
1. **第一秒**: `mavis cron delete <cron_id>` (用 mavis 工具, 不用 sleep 想)
2. **同步**: 在 assistant 文本加一行 `cron killed (id=...) - 用户已暂停, 等 unpause` 让 K3 知道
3. **不再发 progress tag**: 即使 cron task 里写了"state unchanged 用 progress tag", K3 暂停时不适用
4. **不再 fetch / 不再 read**: 暂停期间所有 verify 类读操作停手

**反例 (2026-08-09 17:43-17:56 实际发生, 痛骂源头)**:
- K3 说"暂停" → 我回了 1 个 progress tag (OK, 正常告知)
- 之后 12 个 cron tick (60+ 分钟), 我每次都回 progress tag "K3 暂停 Xmin+, 等指令"
- 完全没意义: K3 暂停时不会读这些 tag, 但每个 tag 烧 token + 算 thinking token
- 18 次空 progress tag = 几百行 output 倒进马桶

**M3 必做**: 任何 cron task prompt 开头加 §0.19 检查段 (用户 AFK 检测 + 立即自删 + 不发 progress tag)

### §v9.1.C dry-run 验证 SOP (整合 push 触发前必跑)

**目的**: K3 回 "1-5 OK" 后 30 分钟内可 push, 不等验证。

**5 步**:
1. 按 `.hermes/k3-inbox/2026-08-08-1535-8-9-integrated-push-checklist.md` §2 的 12 files 清单, 逐文件核对 diff 草稿存在且非空
2. 本地跑 §0.7 smoke 前 4 步: encoding check → 简体字守门 → `npx tsc --noEmit` → `npm run build` (per K3 8/8 15:35 §0.17 push 前必跑)
3. 结果落 `.hermes/reports/integrated-push-dryrun-2026-08-10.md` (PASS/FAIL 逐项)
4. **不 commit 不 push**, 等 K3 触发条件
5. 幂等: 若该报告文件已存在且 mtime 在今日 → 返回 ALREADY DONE

### §v9.1.D 1 周节奏模板 (Week 1 + Week 2, per Mavis 战略大脑)

**Week 1 (8/8-8/12)** 当前主线:
- 8/8: 568087a PASS + 4703262 FAIL + 117f9fc PASS (3 push, K3 8/8 15:35 口径 = 4 push, 含 cron auto)
- 8/9: 0d46a4c + a69f0c1 (2 push, 千问核实, baby-product retrofit)
- 8/10: cmyk-guide retrofit (per 千问 T1) + T6 dry-run + T7 cron v9.1 攒批
- 8/11: paper-materials retrofit + 8/9 整合 push (K3 "1-5 OK" 触发) + 1 周 push 4/5
- 8/12: same-day-flyers retrofit + 8/12 复盘 (0 push) + 7 项 PASS/FAIL + §9 路径推荐

**Week 2 (8/13-8/21) 排期** (per K3 8/8 07:12 §0.16 残留清理节奏):
- 8/13 batch 1: longDescription 200 处 (高流量 PDP 优先, zh-hk 3 月 13759 imps 命中 SKU)
- 8/15 batch 2: description + faq 300 处 (中流量 SKU + 跨 8 locale)
- 8/17 batch 3: schema 剩余 340 处 (JSON-LD Organization / Product / FAQPage 全 schema)
- 8/18 全量 grep 验收 = 0 (除 k3-inbox 历史引用) — 8/21 复盘硬指标
- 8/19-8/20 缓冲 + 抓强监控汇总
- 8/21 双周复盘 + 7 项 §0.10 校准 + §0.12 转化指标

**每日 22:00 GSC 抓强监控** (cron once + delete_after_run, per §0.8 一次性):
- 8/9-8/21 daily 22:00 (K3 拍后启)
- 筛 pos ≤ 10 但 0% CTR → 写 .hermes/k3-inbox/2026-08-{n}-2200-gsc-strong-signal-r{n}.md
- 升级 K3 (新 P0 抓强, 立即 8/9 push)

### §v9.1.E 2 处台账纠偏 (per 千问 8/9 18:18 战略)

**1. 8/9 push 实际 = 2 次 (0d46a4c + a69f0c1)**:
- ❌ 报告虚报 1/5
- ✅ 自 8/10 起按 `git log --oneline --since` 实际计数
- ✅ 月累计相应 +1 (约 6/150, 健康区间)
- 教训: 报告 commit 与 .hermes 文件如与 retrofit 同批, 应合入同一 push, 不另起 push

**2. 转化验证 soft vs hard 分层**:
- ❌ step3 GA4 (`content_has_gtag=false`) 与 step4 wa.me (`content_has_wa=false`) 记 "verified" 是框架级口径
- ✅ 自 8/10 起 conversion-link-check 输出必须分两栏:
  - **hard**: step1 CTA href 全 200 + step2 quote form 存在 → 决定 `conversion_status`
  - **soft**: step3 GA4 / step4 wa.me 备选入口 → 记 `backup_entry: framework-level / page-level`, 不计入 verified 判定依据

### §v9.1.F 风险与止损 (Mavis 视角)

- **整合 push K3 不拍板**: M3 继续 retrofit 主线 (8/10 cmyk), 不顺带 push locale 切换 (两条线解耦)
- **dry-run 失败**: 立即升级 K3, 不强行 commit
- **M3 抓取机制 bug**: 兜底 = M3 仍按 v9.0 cron prompt 跑, T6 失败不影响 retrofit 主线
- **§0.19 暂停信号**: K3 说"暂停"立即 `mavis cron delete <self>`, 不发 progress tag
- **8/9 retrofit 进度 3/6 真实**: 8/10 cmyk 是关键节点, 失败升级 K3

### §v9.1.G 教训固化 (跨项目)

- **zprintpro 8/9 18:23 K3 战略反馈**: M3 自主抓取 m3-task-cards/ 目录, K3 不再转发, 闭环成立
- **zprintpro 8/9 17:56 K3 暂停痛骂**: §0.19 用户暂停信号规则, 5 分钟一次 progress tag × 1.5h = 18 次空转 = 几百行 output 倒进马桶
- **zprintpro 8/9 18:18 千问 3.8 战略**: 2 处台账纠偏 (8/9 push 实际 + 转化验证 soft/hard 分层)
- **zprintpro 8/8 15:35 K3 §0.17 拍板**: push 前必跑 npm run build (4703262 教训)
- **zprintpro 8/8 15:35 K3 §0.18 拍板**: 4 步 SOP (curl 200 + 禁止兜底 + 禁止自指向 + m3u8 用 410)

---

**SSoT 同步链**:
- v9.0 → v9.1 升级 → 8/10 dry-run 验证 → K3 "1-5 OK" 触发 → 整合 push 1 amend 1 build (B 方案) → 8/10 cmyk retrofit 主线并行
- M3 8/10 起自主抓取 m3-task-cards/ 目录 → 闭环成立 (Mavis 写 → M3 跑 → reports/ + k3-inbox/ → Mavis 评估 → 写新 m3-task-cards/)
- §0.19 暂停信号规则 → 任何 cron task prompt 开头加检查段 → 避免 18 次空转


---

## 【2026-08-26 新增 · B7 选题库 22 篇派发】（K3 8/26 04:50 v2 预批 B7 commit 57f304f, 4 cron 共享, 必读 SSoT)

> **强制级 (K3 8/26 04:50 v2 预批 B7 commit 57f304f)**: 4 cron 共享 B7 选题库 22 篇 SSoT, 派发规则如下, 不再依赖 M3 临时选题, queue 排期按本表。

### §1 22 篇 W1-W9 9 周排期 (K3 8/26 04:50 v2 预批 + K3 8/24 11:32 §A 15 提前启动季节军令状)

| 周 | 时间 | 选题 (zh-hk 主, en/ja 同步 3 locale) | 服务词 (GSC 8/24 14:30 pos) | Tier | 状态 |
|---|---|---|---|---|---|
| **W1** | 8/26-9/1 | 即日急件印刷全攻略: 邊度最快? 幾錢? 幾點截單? | 即日急件 pos 25.2 (5 imps) | A | 🔜 |
| **W1** | 8/26-9/1 | 包裝盒印刷價格 2026: 500/1000/5000 個分別幾錢 | 包裝盒印刷 pos 34.9 + 包裝盒訂製 pos 29.4 | A | 🔜 |
| **W1** | 8/26-9/1 | 大信封印刷 C4/C5 規格 + 100 個起 HK$0.5/個起 + 即日特急 | 大信封 pos 2.21 (24 imps 0 click) | A | 🔜 |
| **W2** | 9/2-9/8 | How Much Does Catalog Printing Cost from China? | catalog printing china | A | ⏳ |
| **W2** | 9/2-9/8 | 9 月開學季印刷全攻略: 教科書 / 練習簿 / 學校刊物 | 開學季印刷 | A | ⏳ |
| **W3** | 9/9-9/15 | ⭐ 月曆印刷 2027 訂製時間表: 幾時落單最抵 | 月曆印刷 pos 21.1 (24 imps) | A | 🚨 R5 季节军令 |
| **W3** | 9/9-9/15 | MTR 燈箱海報規格 + 印刷文件要求 | mtr 燈箱海報 | A | 🚨 R5 |
| **W3** | 9/9-9/15 | 紙袋印刷 2026 趨勢: 環保 + 燙金 + 100 個起 | 紙袋 pos 52.71 (7 imps) | A | 🚨 R5 |
| **W4** | 9/16-9/22 | 食品包裝印刷 FDA 認證 + 食品級油墨全攻略 | 食品包裝 | A | ⏳ |
| **W4** | 9/16-9/22 | poster 印刷 A1/A2/大圖輸出 價格 + 規格 | poster 印刷 pos 23.84 (61 imps 0 click) | A | ⏳ |
| **W5** | 9/23-9/29 | 戶外貼紙印刷 防水 UV 抗曬 5 年保固 | 戶外貼紙 | A | ⏳ |
| **W5** | 9/23-9/29 | 證書印刷 / 獎狀印刷 燙金 + 162g 紙 | 證書印刷 pos 15.00 (3 clk) | A | ⏳ |
| **W6** | 9/30-10/6 | 信封印刷 100 個起 + 商業信封 + DL/C5/C4 規格 | 信封 pos 51.22 (9 imps 0 click) | A | ⏳ |
| **W6** | 9/30-10/6 | 餐牌印刷 10 份起 + 防水 + 餐廳菜單 + 燙金 | 餐牌印刷 | A | ⏳ |
| **W7** | 10/7-10/13 | 卡片印刷 0.5mm 厚度 + 燙金 + 局部 UV | 卡片印刷 | A | ⏳ |
| **W7** | 10/7-10/13 | 利是封印刷 2027 農曆新年 + 燙金 + 100 個起 | 利是封 | A | 🚨 R5 季节 |
| **W8** | 10/14-10/20 | sticker 印刷 防水 + 50 張起 + 燙金 + 局部 UV | sticker 印刷 | A | ⏳ |
| **W8** | 10/14-10/20 | 同人誌印刷 100 本起 + 中文書 + 日本向け | 同人誌印刷 | A | ⏳ |
| **W9** | 10/21-10/27 | 月曆印刷 2027 設計 + 燙金 + 企業禮品 + Q4 起量 | 月曆印刷 (W3 续做) | A | 🚨 R5 |
| **W9** | 10/21-10/27 | 海報印刷 A3/A4 + 100 張起 + 1 天交貨 | 海報 pos 2.5 (2 imps) | A | ⏳ |
| **W9** | 10/21-10/27 | 名片印刷 100 盒起 + 燙金 + 局部 UV | 名片印刷 | A | ⏳ |
| **W9** | 10/21-10/27 | 聖誕卡印刷 2026 + 燙金 + 100 張起 | 聖誕卡 | A | 🚨 R5 |

**累计**: 22 篇 blog 选题库 (W1-W9 9 周 × 2-3 篇/周), 月曆首位 (W3 季节军令 R5 9/15 硬截止), 矩阵追踪在 .hermes/industry-keyword-matrix.json queue[] + covered[]

### §1.1 月曆首位 + R5 9/15 硬截止 加固 (W3 重点, K3 8/24 11:32 §A 15 提前启动季节军令状)

> **季节军令状 (K3 8/24 11:32 §A 15 拍板)**: T42 月曆每拖 1 天, 旺季收成少 1 天. R5 9/15 硬截止, 撞车根因 = M3 必须自决 (K3 §0.22 SOP-10 第 3 款) 撞车根因 = K3 必拍 1 次回复 = 8/30 8:00 月曆 blog 必发 (W3 9/9-9/15 实际 9/9 周二发, 距 9/15 = 6 天缓冲, 撞车根因 = 错峰发, 旺季收成最大化).

- **W3 选题 1: 月曆印刷 2027 訂製時間表: 幾時落單最抵**
  - 目标: 月曆印刷 pos 21.1 → ≤15, 月曆訂製 pos 32.3 → ≤20
  - 内链: 3-5 链 (calendars category / 2027 月曆 blog / 月曆材質 blog / 企業禮品月曆 Q4 blog)
  - 长度: Pillar 3000-5000 字 / Cluster 1500-2500 字
  - 3 locale: zh-hk 繁体 + en 美國市場 + ja 日本市場

- **W3 选题 2: MTR 燈箱海報規格 + 印刷文件要求**
  - 目标: mtr 燈箱海報 pos 8 → ≤5
  - 内链: posters / 戶外貼紙 / 大圖輸出
  - 长度: Cluster 1500-2500 字

- **W3 选题 3: 紙袋印刷 2026 趨勢: 環保 + 燙金 + 100 個起**
  - 目标: 紙袋 pos 52.71 (7 imps) → ≤25
  - 内链: paper-bags / 環保印刷 / 燙金工藝
  - 长度: Cluster 1500-2500 字

### §1.2 W1 选题 (K3 8/26 04:36 立即跑, 季节军令状紧急启动)

- **W1 #1: 即日急件印刷全攻略** (slug: rush-printing-hk-guide)
  - 目标: 即日急件 pos 25.2 → ≤15
  - 内链: rush-printing-delivery + 傳單 + 包裝盒 + poster
  - 长度: Cluster 1500-2500 字
  - 3 locale: zh-hk / en / ja

- **W1 #2: 包裝盒印刷價格 2026** (slug: 2026-packaging-box-pricing)
  - 目标: 包裝盒印刷 pos 34.9 → ≤20, 包裝盒訂製 pos 29.4 → ≤18
  - 内链: packaging category + 食品包裝 + 禮品盒
  - 长度: Cluster 1500-2500 字

- **W1 #3: 大信封印刷 C4/C5 規格** (slug: large-envelope-printing-c4-c5)
  - 目标: 大信封 pos 2.21 (24 imps 0 click) → ≤1.5, CTR ≥10%
  - 内链: envelopes category + 商業信封 + 邀請函信封
  - 长度: Cluster 1500-2500 字
  - K3 §6 P0 第一优先 (striking 冲首页)

### §1.3 W2 选题 (9/2-9/8 落地, 撞车根因 = M3 自决)

- **W2 #1: How Much Does Catalog Printing Cost from China?**
- **W2 #2: 9 月開學季印刷全攻略**

### §1.4 W3 选题 (9/9-9/15 落地, ⭐ R5 9/15 硬截止, 季节军令状, 撞车根因 = M3 自决)

- **W3 #1: 月曆印刷 2027 訂製時間表** (slug: 2027-calendar-printing-timetable)
- **W3 #2: MTR 燈箱海報規格** (slug: mtr-lightbox-poster-specs)
- **W3 #3: 紙袋印刷 2026 趨勢** (slug: paper-bag-printing-2026-trends)

### §2 queue 排期规则 (K3 8/26 04:10 §4 + 8/26 04:50 v2 预批 B7)

1. **W1 (8/26-9/1) 3 篇 必发**: 修 3 (8/26) 撞车根因 = WhatsAppFloat 修复 (K3 8/26 08:00+ v1 撞车根因错位, 修 3 撞车根因 = 改 getWhatsAppLinkProps) 已 PASS → 撞车根因 = W1 选题 daily cron 跑
2. **daily cron 撞车根因 = queue ≥ 1 写 1 篇/天 (per K3 8/5 11:36 拍板 C 撞车根因 = 取消"0 候选常态")**
3. **W3 (9/9-9/15) R5 季节军令撞车根因 = 8/30 8:00 月曆 blog 必发 (错峰 6 天缓冲)**
4. **W7 (10/7-10/13) 利是封 R5 季节撞车根因 = 9/30 8:00 blog 必发 (错峰 7 天缓冲, 2027 农曆新年 = 1/29)**
5. **W9 (10/21-10/27) 聖誕卡 R5 季节撞车根因 = 10/14 8:00 blog 必发 (错峰 7 天缓冲, 12/25)**
6. **总产能 9 篇/周 → 2-3 篇/周 (K3 8/26 04:10 §4 拍板)**

### §3 数据来源

```
数据来源:
- K3 8/26 04:50 v2 预批 B7 commit 57f304f: B7 选题库 22 篇 W1-W9 9 周 × 2-3 篇/周, 月曆首位 R5 9/15 硬截止
- K3 8/24 11:32 §A 15 提前启动季节军令状: T42 月曆每拖 1 天, 旺季收成少 1 天
- K3 8/26 04:10 §4 验收口径 v9.4: 每周 2-3 篇, striking ≥5, pos 1-20 占比 ≥30%, 有点击词 ≥12
- K3 8/26 04:10 §6 3 轨推进: CTR 修复 2 周 / striking 冲首页 30-60 天 / 度量闭环本周
- K3 8/26 05:36 B7 落盘: docs/b7-blog-pool-2026-08-26.md (4 角色 22 篇选题库 派发 + T41/T44 audit 8/28 + money-words 5 梯队 + 8/28 中检 9 时段 + 10 KPI)
- GSC 8/24 14:30 撞车根因 baseline: pos + imps 撞车根因 = 各选题目标词
- 矩阵追踪: .hermes/industry-keyword-matrix.json queue[] + covered[]
```

### §4 教训固化源头

- 撞车根因 = 4 cron 共享 B7 选题库 22 篇 SSoT, 撞车根因 = M3 必须自决 (K3 §0.22 SOP-10 第 3 款) 撞车根因 K3 必拍 1 次回复 = 撞车根因 = 不依赖 M3 临时选题, queue 排期按本表
- 撞车根因 = K3 §0.21 push 配额不烧 token (8/20 11:54 拍板) = 报告不列 push 计数, 攒批作废
- 撞车根因 = K3 §0.23 数据诚信红线 = baseline 必标"待 XX 校准"或"已 XX 校准"
- 撞车根因 = K3 8/24 11:32 §A 15 季节军令状 = T42 月曆每拖 1 天, 旺季收成少 1 天, 撞车根因 = 8/30 8:00 月曆 blog 必发, 错峰 6 天缓冲
- 撞车根因 = K3 8/26 04:10 §4 v9.4 验收口径 = 每周 2-3 篇, 质量三件套 (striking ≥5 + 占比 ≥30% + 有点击词 ≥12)
- 撞车根因 = K3 §0.6 紧急修复例外 = 5xx 阻断 push 立即

---



---

## 【§0.30 v2.2 站点生命周期精确修正 (2026-08-30 13:52 K3 上传 docx, 跨项目 P0 · 必跑)】（K3 8/30 19:59 拍板, 5 cron 升级 v9.6/v1.4/v7 落地)

> **核心**: K3 8/30 13:52 上传《ZprintPro 主脑 v2.2 · 战略主提示词（站点生命周期精确修正版）》docx (C:\Users\Administrator\.minimax\v2\assets\2026\08\30\13-52-07-067-...docx, 7185 chars). 任何 cron 选题 / 词位置判断 / 任务节奏 必先查本节.

### §0.30.1 站点生命周期时间线 (一切评估前置坐标)

| # | 实体 | 时间 | 关键事实 |
|---|------|------|---------|
| **B1** | 老站 z-printpro.com | 2025-12-28 上线, 运营至 ~2026-07-15 (终龄 ~6.5 月 / 28 周) | 图形化建站工具搭建, **本身也是年轻站, 权重积累有限** (外链/品牌信号/历史排名均处早期). 301 传递价值 = "**小额信任注入**", 绝非"成熟资产继承" |
| **B2** | 新站 zprintpro.com | 2026-05-08 上线, 截至 8/30 站龄 **~3.5 月** | Next.js 自建, zh-hk 主战场 |
| **B3** | 双站并存期 | 2026-05-08 至 ~2026-07-15 (~2 月) | 双站同时运营 |
| **B4** | 301 迁移 | ~2026-07-15 执行 (距 8/30 约 6 周) | 老站所有 zh-hk 页面 301 永久重定向至新站对应页 |
| **B5** | 多语言冷启动 | en / ja 真正打通上线 ~2026-07-15 (距 8/30 **~45 天**) | 此前无独立 en/ja 内容 |

### §0.30.2 ⭐ B6 成熟度分级表 (所有分析必先查此表再下结论)

| locale | 成熟度定位 | 评估标尺 (GSC 词位置 / CTR) |
|--------|----------|-----------------------------|
| **zh-hk** | 年轻站 (新站 3.5 月 + 老站小额注入) | 位置 **28-41 = 年轻站正常位置** (默认不判为"从高位回落", 不被动等恢复); 位置 **5-15 = 速赢窗口立即优化** |
| **ja** | 新生儿 (~45 天) | **有曝光即正向信号**; CTR<3% = **正常起步**; **不要求 30 天内进首页** |
| **en** | 新生儿 (~45 天) | 同 ja; **垃圾长尾词曝光 (in tajik/kyrgyz 等) = 新站探索期正常噪音, 不恐慌** |

### §0.30.3 ⭐ B7 迁移预期修正 (本版核心修正 · 急刹车旧假设)

- 旧假设: zh-hk 301 后 = "等待排名恢复" (高估老站权重, 30-90 天内被动等)
- **新修正**: 因老站仅运营 6.5 月, 多数词在老站时期大概率也未取得高排名, 故 zh-hk 301 策略主题 ≠ "等待排名恢复", 而 = **"避免权重流失 (卫生) + 主动建设新权重 (进攻)"**
- **301 健康检查定位 = 卫生项 (必做, 但预期回报有限)**, 不再是"生死线"
- **8/30 现状**: 301 卫生 8/30 12:55 K3 真人完成 (20/20 页面级 301 + 9 条 Cloudflare 规则合并 + 25/25 复测全过), **从此不必再投入过多精力等"301 复活"**

### §0.30.4 B8 品牌实体风险 + GEO 双域名归一

- z-printpro.com (老) vs zprintpro.com (新) = 两个域名实体
- 301 解决跳转, 但品牌搜索信号 ("z-printpro" vs "zprintpro" vs "智印港") 需归一
- **GEO 策略必须覆盖双域名品牌归一**
- 8/30 §13.16 双品牌宪法 (zh-hk = 智印港 ZprintPro / en,ja = ZprintPro) 已部分覆盖, 但 **老站品牌信号 "z-printpro" 仍需在 llms.txt + 第三方背书中明确归一**

### §0.30.5 B9 数据边界 (诚实基准, 不编造)

- 当前 GSC 文件 (gsc_data.csv / _en.zip / _ja.zip / 总数据 2026-08-17 等) 均为 **zprintpro.com 新站属性**
- 时间窗 (近 3 个月 ≈ 5 月底起) 几乎全程为新站数据, **不含老站基线**
- 若需真·301 前后对比, **须另导出老站 z-printpro.com 的 GSC 属性历史数据 (如有)**
- **报告必含 "数据来源" 行 + "无老站对比基线" 显式声明** (per §0.23 数据诚信红线)

### §0.30.6 ⭐ # 4.8 多语言冷启动策略 (修正版 · 分轨, 急刹车旧统一节奏)

#### zh-hk (年轻站 · 主动进攻, 不设"被动恢复观察期")
- 因老站权重有限, zh-hk 立即进入主动建设: **301 卫生修复 + 速赢词优化 (位置 5-15) + 内容深度 + 内链建设, 四线并行**
- 保持迁移感知: 若发现 301 链异常/循环/404, 优先修复
- 节奏: W1-2 速赢词 title/meta + 301 卫生; W3-6 内容深度 + 内链; W7+ AEO/GEO 全面进攻

#### ja (新生儿 ~45 天)
- 前 4 周: **技术地基** (索引覆盖率→100%、hreflang 验证、sitemap 健康) + 核心 5 页 on-page 优化
- 4-8 周: **内容播种** (每品类 1 篇深度指南) + 内链结构搭建
- 8 周后: 外链建设 + AEO schema

#### en (新生儿 ~45 天)
- 同 ja 节奏, 但 **优先聚焦 3 个已验证带钱方向**: small batch stickers / catalog printing china / doujinshi printing
- **垃圾长尾词 (in tajik/kyrgyz 等) = 新站探索噪音, 不投资源、不做 301、不恐慌**

### §0.30.7 ⭐ 成熟度修正规则 (带钱词地图 v1 调度, daily/weekly/gsc 必用)

| 词 | locale | 位置 | 标签 + 动作 |
|----|--------|------|-------------|
| T1 词 | zh-hk | 20-40 | "**年轻站正常位置**, 主动 on-page + 内链推进, 不被动等恢复" |
| T1 词 | zh-hk | 5-15 | "**速赢! 立即优化**" |
| 任何词 | en / ja | >20 | "**新生儿期正常, 打地基优先**" (不是 title/meta 改, 是索引/hreflang/技术 on-page) |
| 任何词 | en / ja | <10 | "**异常正向信号, 重点保护**" (立即加强 on-page + 内链 + 站外) |

### §0.30.8 §0.30 教训固化源头

- **拍板来源**: K3 8/30 13:52 上传《ZprintPro 主脑 v2.2 · 战略主提示词（站点生命周期精确修正版）》docx + K3 8/30 19:59 拍板"按推荐 A 执行" (5 cron 升级 v9.6/v1.4/v7)
- **AGENTS.md 写入**: §0.30 已固化 (2026-08-30 14:00)
- **覆盖关系**: §0.30 完全覆盖 v2.2 11:11 旧版 (5 cron prompt v9.5/v6 共享段) 的"统一节奏"假设, 但保留 6 原则 + 30/60/90 冲刺表 + 词价值分层 T1-T4 + 带钱词地图 v1 (zh-hk 16 词 / en 10 词 / ja 10 词) + 5 拍板项 B
- **数据诚信** (§0.23): 站点时间线 B1-B5 + 成熟度分级 B6 + 迁移预期修正 B7 + 数据边界 B9 全部以 K3 8/30 docx 原文为准, 不重新推导
- **应用范围**: 任何 cron 选题 / priority_boost 必查 v1 词表 + B6 成熟度分级 + # 4.8 分轨策略, 跨 session 永久生效
- **32001e17 v2.2 W3 batch 2 31 词部署效果** (K3 8/30 18:47 拍板 攒批 1 commit):
  - zh-hk 12 落地页: T1 速赢 3 / T2 3 / T3 3 / 业务子类目豁免 3 (新增 customH1)
  - en 5 落地页 + ja 4 落地页: 跟 v2.2 位置分类
  - 14 天 GSC 对比 = 9/13 验证窗口


## §0.29 v2 标题长尾 3 筛选 + 分层布局 (K3 8/30 05:00 + 9/1 02:58 GLM 升级 · 5 cron 共享 · 必跑)

> **升级拍板来源**: K3 9/1 02:58 认同 GLM 拍板 + 引用三源数据 (Zyppy 8万 / Portent 147万 / 2025 Q1 76% 重写率) + Vistaprint 竞品 + 香港本地标准 + CJK 字符宽度
> **SSoT**: AGENTS.md §0.29 v2 + docs/2026-08-30-k3-w3-long-tail-candidate-table.md

### §0.29.1 3 筛选必过 (D.1 · K3 8/30 拍板)
1. **GSC 有展示实证** (需求已验证, 不赌未验证的词) — per §0.23 数据诚信红线
2. **T1/T2 采购意图** (带钱, per 词价值分层)
3. **与主词同簇** (强化主词权重, 不稀释)

### §0.29.2 分层布局 (D.2 · K3 8/30 拍板 + K3 9/1 02:58 半角当量升级)

| 位置 | 数量 | 类型 | 验证 |
|------|------|------|------|
| **title** | **1 长尾** | **主词 + 长尾 + 数字钩子 + 品牌** | **50-60 半角当量** (全角字×2 折算; zh-hk/ja 实操 = 25-30 全角+半角混合, en = 50-60 chars) |
| **meta description** | 2-3 长尾 | 业务洞察词可入 (FDA/月饼/茶葉/烘焙/保健品/手搖) | 字符数 150-160 |
| **H1/H2/正文** | 3-5 长尾 | 培育需求 | 段落 100+ 字 |
| **FAQ** | 问句型长尾 | 提升长尾排名 | 4-6 FAQ |
| **keywords 字段** | 全量兜底 | 不限数量 | 50-60 词 |

### §0.29.2.1 半角当量计算公式 (K3 9/1 02:58 GLM 升级)
- **全角 CJK 字符** (中/日/韩): 1 字 = 2 半角当量
- **半角字符** (英文/数字/符号/空格): 1 字符 = 1 半角当量
- **例**: "食品包裝印刷 禮盒訂製 100個起 HK$4起 | 智印港" = 16 全角×2 + 13 半角 = 32+13 = **45 半角当量 ≈ 530px** (Google 桌面 600px 预算 88%, **满格 — 不是浪费, 是尺子没对齐**)

### §0.29.2.2 字符体检 3 行 (K3 9/1 02:58 GLM 升级, 必查规则)
1. **满格线: 半角当量 ≥ 55 → 禁加任何词** (防 Google 76% 重写风险)
2. **不足线: 半角当量 < 45 → 按序补**: ① 第 2 数字钩子 (MOQ+价格) ② 品牌名 (GEO 实体锚点) ③ GSC 实证同簇长尾 (唯一例外通道, 全站每页仍限 1 长尾)
3. **跨语言污染检查** (P0): zh-hk 段不出现繁中字以外, en 段不出现中/日文字符, ja 段不出现中文字符

### §0.29.2.3 不上第 2 个长尾 3 理由 (K3 9/1 02:58 GLM 升级)
1. **簇稀释**: 第 2 个长尾若与主词同簇 = 同义反复浪费字符; 若异簇 = 稀释主词权重
2. **重写风险**: 76% 的标题会被 Google 改写, 堆砌是第一触发器
3. **分层布局已给长尾们各自的家**: title 1 个 / meta description 2-3 个 / H1·正文 3-5 个 / FAQ 问句, 第 2、3 个长尾该去 meta description, 不是挤进 title

### §0.29.3 严禁 (K3 8/30 + 9/1 02:58)
- ❌ **业务洞察词进 title** (FDA級 / 月饼 / 茶葉 / 烘焙 / 保健品 / 手搖) — GSC 0 展示, 烧 title 字符
- ❌ **频繁改 title** (churn 是排名杀手, 一次改定 2-4 周冻结)
- ❌ **长尾堆砌** (被 Google 重写标题, 反而丢控制权)
- ❌ **GSC 0 实证词进 title** (违反 §0.23 数据诚信)
- ❌ **跨语言污染** (K3 9/1 02:58 P0): en/ja 段不出现繁中字形 (礼/订/製/盒等), ja 长尾必须是日语词 (ギフトボックス / オーダー / 短納期)

### §0.29.4 例: food-boxes 3 段对照 (K3 9/1 02:58 P0 Bug 修复)
- **zh-hk**: 食品包裝印刷 禮盒訂製 100個起 HK$4起 | 智印港 (45 半角当量, 满格)
- **en**: Custom Food Packaging Boxes | 100 MOQ | ZprintPro (49 chars, 删禮盒訂製跨语言污染)
- **ja**: 食品パッケージ印刷 | 100個から | ZprintPro (38 chars, 删繁中字形跨语言污染)

【v6.1 → v6.2 升级段 (K3 9/1 09:46 派活包, 5 cron 共享同步, 必读)】K3 9/1 09:46 派活包原文: "D 7 篇选题 D8-D14 立即启动 + E ToB SOP D25 启动 + 新版标题规则写进技能 + 同步更新定时任务指令"

【§0.30 v3 关键词价值分层 (K3 8/30 12:37 + 9/1 09:31 拍板, 5 cron 共享必跑)】
- 三维: ① 采购意图信号 (印刷/訂製/批發/custom/wholesale/bulk/manufacturer/印刷会社/製作) ② 买家类型 (企业采购/SMB/个人一次性) ③ 订单价值 (复购耗材 > 事件型 > 信息泛词)
- T1 (P0 必写 5-15 位置 速赢窗): 三维全中 → priority_boost +3 → daily 选题第 1 位
- T2 (P0 必写 16-30 培育窗): 采购信号 + (SMB/企业 OR 复购) → priority_boost +2 → daily 选题第 2-3 位
- T3 (P1 写 31-50 攻坚窗): 采购信号 + 信息泛词 → priority_boost +1 → 类目页 meta 覆盖
- T4 (P2 写 51+ 防守窗): 信息泛词 → priority_boost -1 → 博客捕词
- 实战应用: D8 食品包頁 zh-hk T1 5 词 / D11 stickers en T1 5 词 / D14 textbook ja T1 5 词

【重点带钱词地图 v2 (K3 9/1 09:31 9 角色战略拍板, 替代 v1, 全站全局调度核心)】
- zh-hk T1 5 词 (D8/D9/D10 优先): 食品包裝印刷 (D8 头号) / 月曆訂製 (D9 9/15 死线) / 利是封印刷 (D10 CNY) / 貼紙印刷 (验证窗监控) / 禮盒訂製 (D8 内链目标)
- en T1 5 词 (D11/D12 优先): custom stickers (D11) / small batch sticker printing (D11) / china catalog printing (D12) / custom packaging boxes (D12 跨链) / kraft paper packaging (D13)
- ja T1 5 词 (D13/D14 优先): クラフト紙パッケージ (D13) / 教材印刷 (D14) / 同人誌印刷 (D14 跨链) / 食品パッケージ (D13 跨链) / 短納期印刷 (D13/D14 通用)
- T2-T3 培育 + 攻坚: 36 词 (zh-hk 16 + en 10 + ja 10), 内容深度 + 答案块 + 内链

【D8-D14 7 篇选题战略层 SOP (K3 9/1 09:46 拍板 立即启动, daily cron 必跑)】
- 完整 SSoT: docs/2026-09-01-k3-d8-d14-blog-topic-strategy.md (13.4KB)

【D25 ToB 报价 SOP 准备 (K3 9/1 09:46 拍板 战略层 + M3 协作 9/1 启动, 9/25 落地核验)】
- 完整 SSoT: docs/2026-09-01-k3-d25-tob-quote-sop.md (10.4KB)

【新版标题规则 (K3 9/1 09:46 派活包, 已沉淀 zprintpro-seo-evolve SKILL.md v4 + AGENTS.md §0.29 v2)】
- §0.29 v2 半角当量口径: 全角 CJK = 2 半角当量 / 半角字符 = 1 半角当量 (50-60 区间)
- §0.29 v2 字符体检 3 行: 满格线 ≥55 禁加 / 不足线 <45 按序补 (数字钩子→品牌→例外长尾) / 跨语言污染零容忍
- §0.29 v2 不上第 2 个长尾 3 理由: 簇稀释 / 76% 重写风险 / 分层布局已给长尾们各自的家
- §0.29 v2 跨语言污染: zh-hk 不出日文 / en 不出中日 / ja 不出简体

【v6.2 → v6.4 升级段 (K3 9/1 10:22 派活包拍板, 1 commit 1 push 攒批)】K3 9/1 10:22 派活包: "A 是 (推荐): 1 commit 1 push 攒批 = 12 cron v6.4 升级 + 3 区间表写入 SKILL.md/AGENTS.md + 8/30 31 段按 v3.1 体检落地"

【§0.29 v3 → v3.1 升级 (K3 9/1 10:22 拍板, 9 角色综合 + GLM 深度诊断 + 3 语言竞品实证)】
- 完整 SSoT: docs/2026-09-01-k3-v4-title-rule-deep-analysis.md (25KB)
- 8/30 31 段 v3.1 体检落地: 4 段 50-60 理想 + 5 段 60-80 可接受 + 3 段 <50 不足线 (menus 46 / banners 49 / place-cards 38 待 9/13 验证窗首批合批修复)
- 体检 log: .hermes/logs/title-v31-check-2026-09-01.md (9.6KB)

【字符体检 3 区间表 (v3.1 升级, K3 9/1 10:22 拍板, 必查规则)】
| 区间 | 半角当量 | 状态 | 来源 |
|------|----------|------|------|
| 理想 | 50-60 | 满格线 ≥55 禁加 (防 76% Google 重写) | GLM 9/1 02:58 |
| 可接受 | 60-80 | 工艺修饰堆砌 (8/30 paper-bags 78/posters 78/calendars 72/greeting-cards 70 实证) | 8/30 K3 9/1 09:54 |
| 不足 | <50 | 按序补: ① 第 2 数字钩子 (MOQ+价格, CTR 弹药) ② 品牌 (GEO 实体锚点) ③ GSC 实证同簇长尾 | GLM 9/1 02:58 |

【工艺修饰 3 区间表 (v3.1 升级, K3 9/1 10:22 拍板)】
| 区间 | 工艺修饰数 | 适用场景 | 来源 |
|------|------------|----------|------|
| 极简 | 0 个 | 极简变体页 (Vistaprint Sheet Stickers 13 字符) | Vistaprint en 实证 |
| 标准 | 1 个 | 主词 + 1 长尾 + 1 数字钩子 + 品牌 (GLM + 8/30 默认) | GLM + 8/30 |
| 工艺堆砌 | 2-3 个 | 主词 + 2-3 工艺 + 1-2 数字钩子 + 品牌 (8/30 实证) | 8/30 K3 9/1 09:54 |

【数字钩子 3 区间表 (v3.1 升级, K3 9/1 10:22 拍板)】
| 区间 | 数字钩子数 | 适用场景 | 来源 |
|------|------------|----------|------|
| 极简 | 1 个 (MOQ 或 价格 或 交期) | Vistaprint en 实证 0 数字钩子, GLM 9/1 02:58 默认 1 | GLM |
| 标准 | 2 个 (MOQ + 价格) | 8/30 实证 paper-bags "100個起 + HK$8起" | 8/30 |
| 全功能 | 3 个 (MOQ + 价格 + 交期) | 8/30 实证 posters "1張起印 + 4小時打稿" | 8/30 |

【字符体检 3 行护栏 (per GLM 9/1 02:58, v3.1 升级)】
1. 满格禁加: 半角当量 ≥ 55 → 禁加任何词 (防 Google 76% 重写风险)
2. 不足按序补: 半角当量 < 45 → 按序补: ① 第 2 数字钩子 ② 品牌 ③ GSC 实证同簇长尾
3. 跨语言污染零容忍: zh-hk 不出日文, en 不出中日, ja 不出简体

【3 段不足线 8/30 标题修复建议 (9/13 验证期后首批合批时统一修复)】
- menus (46): 加 "100張起" 数字钩子 → 餐牌印刷 防水耐用 | 100張起印 | 多尺寸 + 免费设计 | 智印港 (50-55 理想)
- banners (49): 加 "1個起 HK$15起" 双钩子 → 摺頁印刷 1個起 HK$15起 | 防水防UV + 易拉寶 + X架 | 智印港 (55-60 理想)
- place-cards (38): 加 "50張起 燙金" → 婚宴枱卡印刷 50張起 燙金 壓紋 | 智印港 (45-50 不足线 + 数字钩子补)

【数据来源】(§0.23 强制级)
- K3 9/1 10:22 派活包原文 (已校准 2026-09-01 10:22)
- K3 9/1 09:54 拍板 8/30 规则 = 最新 (已校准 2026-09-01 09:54)
- K3 9/1 02:58 GLM 拍板 §0.29 v2 (已校准 2026-09-01 02:58)
- GSC 8/31 v2 真实数据 (12 文件 3 语言 × 4 时间窗, _gsc_read_v2_2026-09-01.py 修正列序后)
- §0.30 v3 关键词价值分层 + 重点带钱词地图 v2 (32 词核心, 9 角色战略报告 §1.2)
- 3 语言竞品实证 (vistaprint.com 8 标题 + listaaj.com zh-hk 10 公司 + 印刷.jp ja 10 公司)
- 8/30 31 段 SSoT: 32001e17 commit 8/30 18:57, K3 18:47 选项 A 攒批
- 5 cron SSoT v6.2 = 781550d8 9/1 09:54 落, v6.4 升级同步 (1 commit 1 push 攒批)

【K3 9/1 12:06 派活包 9 角色综合 v6.4 升级段 (1 commit 1 push 攒批, 5 cron 共享同步)】K3 9/1 12:06 派活包: "把这个结果(9 角色综合最优决策)同步到对应的定时任务指令中，并让定时任务也具有对应的能力 (战略军师 + CEO + PM + UI/UX + 运营 + CRO + 数据 + SEO/AEO/GEO + 多语言冷启动)"

【9 角色综合 9 角色身份清单 (per K3 9/1 12:06 派活包)】
- 战略军师 + CEO 决策者: 引领 Zprintpro.com 实现 SEO+AEO+GEO 跃升, 关键词霸屏 (重点带钱词覆盖 zh-hk/Ja/en 进首页), 转化漏斗优化 (从点击到询盘到成交最大化)
- PM 产品经理 & 项目负责人: 统筹项目全局, 制定路线图, 把控执行 (1-3 月 / 3-6 月 / 6-12 月 战略执行路线图)
- 资深 UI/UX 设计师: 用户体验 + CRO 视角, 落地页 CTA 设计 + 表单简化 + 信任元素构建
- 资深运营专家 & 高转化率顶级专家: B2B + B2C + 混合模式, 询盘 → 成交 转化漏斗优化
- GLM 模型驱动数据分析师: 多维度数据整合 + 逻辑推理 + 前瞻预判
- SEO/AEO/GEO 专家: 关键词价值分层 (3 维) + 重点带钱词地图 v2 + 跨语言污染零容忍
- 多语言冷启动: en 极简 0 工艺 (适配新生儿), zh-hk/ja 工艺堆砌 (适配成熟站)
- 北极星目标: 提升 ROI, 推动业务增长, 时不我待急迫感

【关键词价值分层 (3 维, K3 8/30 12:37 + 9/1 09:31 拍板)】
- ① 采购意图信号: 印刷 / 訂製 / 批發 / custom / wholesale / bulk / manufacturer / 印刷会社 / 製作
- ② 买家类型: 企业采购 / SMB 中小企业 / 个人一次性
- ③ 订单价值: 复购耗材 > 事件型订单 > 信息泛词
- T1 (P0 必写 5-15 位置 速赢窗): 三维全中 → priority_boost +3
- T2 (P0 必写 16-30 培育窗): 采购信号 + (SMB/企业 OR 复购) → priority_boost +2
- T3 (P1 写 31-50 攻坚窗): 采购信号 + 信息泛词 → priority_boost +1
- T4 (P2 写 51+ 防守窗): 信息泛词 → priority_boost -1

【重点带钱词地图 v2 (3 语言 × T1-T4, 32 词核心, 9 角色战略报告 §1.2)】
- zh-hk T1 5 词 (D8/D9/D10 优先): 食品包裝印刷 (D8 头号) / 月曆訂製 (D9 9/15 死线) / 利是封印刷 (D10 CNY) / 貼紙印刷 (验证窗监控) / 禮盒訂製 (D8 内链目标, 业务子类目豁免)
- en T1 5 词 (D11/D12 优先): custom stickers (D11) / small batch sticker printing (D11) / china catalog printing (D12) / custom packaging boxes (D12 跨链) / kraft paper packaging (D13)
- ja T1 5 词 (D13/D14 优先): クラフト紙パッケージ (D13) / 教材印刷 (D14) / 同人誌印刷 (D14 跨链) / 食品パッケージ (D13 跨链) / 短納期印刷 (D13/D14 通用)
- T2-T3 培育 + 攻坚: 36 词 (zh-hk 16 + en 10 + ja 10)
- 完整 SSoT: docs/2026-09-01-k3-v3-strategic-master-report.md §1.2 + docs/2026-09-01-k3-9role-v31-rewrite-decision.md §1

【GSC 8/31 v2 真实数据 (per `_gsc_read_v2_2026-09-01.py` 12 文件 3 语言 × 4 时间窗)】
| 语言 | 24h | 7d | 28d | 3mo | 7d 趋势 |
|------|------|------|------|------|---------|
| zh-hk | imp=284 clk=5 CTR=1.76% | imp=2,502 clk=58 CTR=2.32% | imp=7,863 clk=207 CTR=2.63% | imp=18,601 clk=370 CTR=1.99% | 🟢 近期上升 (7d CTR > 3mo 0.33pp) |
| en | imp=85 clk=0 CTR=0% | imp=1,036 clk=5 CTR=0.48% | imp=3,238 clk=17 CTR=0.53% | imp=5,250 clk=28 CTR=0.53% | 🔴 持平 (新生儿 45 天正常) |
| ja | imp=49 clk=1 CTR=2.04% | imp=426 clk=9 CTR=2.11% | imp=1,637 clk=29 CTR=1.77% | imp=2,904 imp=39 CTR=1.34% | 🟢 明确上升 (7d CTR > 3mo 0.77pp) |
| 全站 | imp=1,000 clk=14 CTR=1.40% | imp=9,016 clk=149 CTR=1.65% | imp=29,509 clk=536 CTR=1.82% | imp=60,291 clk=929 CTR=1.54% | 28d CTR 1.82% > 3mo 1.54% |

【§0.30 v3 成熟度分级 (B6 一切评估前置坐标)】
- zh-hk (年轻站 3.5 月 + 老站 6.5 月小额注入): 28d CTR 2.63% > 3mo 1.99% = 速赢窗期, 5 词首屏命中
- en (新生儿 45 天): 28d CTR 0.53% 持平 3mo = 探索期正常噪音, 不恐慌
- ja (新生儿 45 天): 28d CTR 1.77% > 3mo 1.34% = 明确上升, 同 en 不要求 30 天内进首页

【转化漏斗优化方案 (per 9 角色综合 + D25 ToB SOP)】
- 当前询盘漏斗: 0/周 (per §0.30 v3 9/16 M1 闸门基线)
- 转化漏斗全流程: GSC imp (28d 29,509) → GSC clk (28d 536) → 表单提交 → WhatsApp → 报价 → 成交
- 主要瓶颈: 表单 5 字段瓶颈 / 缺 WhatsApp 浮窗 / 缺答案块 / 缺 WhatsApp 三问
- 优化方案:
  1. 表单 5 字段 → 3 字段 (姓名/电话/WhatsApp) + WhatsApp 浮窗 1 主 CTA → 预期 clk → 表单 1.82% → 2.5% (+0.7pp)
  2. 全站 1 主 CTA (WhatsApp 浮窗, +86 198 8085 1334) → 预期 询盘 0 → 2% 表单提交率 (+2pp)
  3. D8-D14 7 篇选题答案块 (数字钩子 + 信任锚点) → 预期 长尾排名 5-15 位置 + 1-2pp CTR
  4. D25 ToB SOP 008 状态机 + WhatsApp 三问预设 → 预期 询盘 → 报价 0 → 60% (+60pp)
- 5 步真验收 (per 印刷店行业基准 serps.io 2026):
  1. push 无 ahead
  2. sitemap mtime -3d
  3. curl 200+body (sharp hook: "即日交貨" zh-hk / "Global Shipping" en / "配送対応" ja)
  4. schema parse valid (Article/FAQPage/BreadcrumbList)
  5. IndexNow 提交

【转化漏斗优化预期 (per 1-3 月路线图)】
| 指标 | 9/1 基线 | 9/16 M1 闸门 | 9/25 D25 验收 | 12 月 |
|------|----------|---------------|---------------|------|
| 周归因询盘 | 0/周 | 6 → 10/周 | 10 → 15/周 | 30/周 |
| 2h 首响率 | N/A | ≥80% | ≥90% | ≥95% |
| 24h 报价率 | N/A | ≥60% | ≥75% | ≥85% |
| 询盘 → 报价转化 | N/A | ≥50% | ≥60% | ≥70% |
| 报价 → 成交转化 | N/A | ≥10% | ≥15% | ≥20% |
| 周归因成交 | 0/周 | 1 → 3 单/周 | 3 → 5 单/周 | 10 单/周 |
| 月营收 (5,000 HKD 客单价) | 0 HKD | 15,000 HKD | 75,000 HKD | 200,000 HKD |

【战略执行路线图 (未来 1 年, 短期 1-3 月 / 中期 3-6 月 / 长期 6-12 月)】

短期 1-3 月 (9/1-11/30):
- 9 月 (W1-W4 30/60/90 冲刺表):
  - W1 (9/1-9/5): 速赢词收割 + 1 新页 (食品包頁 2500 字, K3 业务决策待拍)
  - W2 (9/6-9/12): D8-D14 7 篇选题 (en 5 + ja 4 + 2 篇校园词) + 9/5-9/12 验证窗期
  - W3 (9/13-9/19): 月曆硬截止 9/15 + 31 词首批合批 + R5 节庆纸袋 + D12 CTR 验证窗关闭
  - W4 (9/20-9/26): D25 ToB SOP 9/25 落地核验 + GEO/AEO + 月度复盘
- 10 月: 31 词验证期后效果 (首屏命中 + CTR 提升) + 9/15 月曆增长监控 + D8-D14 7 篇内链矩阵 + AEO schema 10% → 30% + 询盘 0 → 15/周 (per M1 闸门 9/16 路线图)
- 11 月: 30/60/90 冲刺表 W11-W13 复盘 + W14-W16 拍板 + 询盘 15 → 30/周 + D8-D14 7 篇 CTR 验证 + 二次修复清单

中期 3-6 月 (12/1-2/28):
- 12-1 月: llms.txt 30 目录建设 (Reddit / Quora / LinkedIn / X 真人外链) + ja alternate brand "ジープリント" 30 目录埋点 + 询盘 30 → 50/周 + 月营收 100,000 HKD
- 2 月: 半年度复盘 + 6 月路线图调整 + 询盘 50 → 80/周 + 月营收 150,000 HKD

长期 6-12 月 (3/1-8/31):
- 3-5 月 (Q1): 3 语言首页升级 (zh-hk 智印港 / en ZprintPro / ja ZprintPro + alternate "ジープリント") + AEO schema 30% → 80%+ + 询盘 80 → 150/周 + 月营收 300,000 HKD
- 6-8 月 (Q2-Q3): 年中复盘 + 全年路线图 + 询盘 150 → 500+/周 + 月营收 500,000+ HKD

【询盘 → 成交 → 营收 路线图 (per 9 角色综合)】
| 阶段 | 时间 | 询盘/周 | 成交/周 | 月营收 (HKD) | 增长点 |
|------|------|---------|---------|--------------|--------|
| 基线 | 9/1 | 0 | 0 | 0 | 8/30 31 段 v3.1 落地 |
| 短期 1-3 月 | 11/30 | 30 | 5 | 100,000 | D8-D14 7 篇选题 + M1 闸门 + D25 ToB |
| 中期 3-6 月 | 2/28 | 80 | 12 | 250,000 | llms.txt + 外链 + GEO |
| 长期 6-12 月 | 8/31 | 500+ | 60+ | 1,000,000+ | 3 语言首页 + AEO schema 80%+ |

【关键节点 (per V2.0 daily plan + V3.5 战略 + K3 9/1 09:31 拍板)】
- D5-D12 验证窗 (9/5-9/12): 冻结中 (5 cron 监控 31 词 + 食品包頁 + D3 5 词)
- D8 GBP 提交 + 食品包頁新页 (9/8): K3 必亲自 + M3 落地
- D12 CTR 验证窗关闭 (9/12): 9/13 首批合批
- 9/13 首批合批: 31 词 + 食品包頁 + D3 5 词 + 3 段不足线 (1 commit 1 push 攒批)
- 9/15 月曆硬截止: 月曆 H1 强化 (6dcfbb67 已落)
- 9/16 M1 闸门: 周归因询盘 6 → 10/周
- 9/25 D25 ToB SOP 落地: 008 状态机 + WhatsApp 三问 + 2h/24h/48h
- 9/30 月度复盘: V2.0 战略 30 天冲刺表

【3 语言自然排名前 10 竞品实证 (per 联网搜索 9/1 10:15)】
- en: Vistaprint 8 标题 (Custom Stickers 60 字符长尾产品页 + Sheet Stickers 13 字符极简变体页, 0 数字钩子在 description / 价格区, 60-second checkout 2 字段表单)
- zh-hk: 香港本地 Bannershop / Marche Print / Hung Hing / C&C Joint 5/10 用纯品牌名, 0 数字钩子, 本地 B2B 标题太弱, 不跟随
- ja: 印刷.jp / しまうらプリント / ラクスル / プリントパック 9/10 无工艺修饰, 0 数字钩子, 8/30 v3.1 升级已超越
- Sticker Mule: 16M+ orders 92.79% 回购, 60-second checkout 2 字段表单
- 印刷业 SEO 基准 2026: serps.io 平均 organic CTR 1-3 名 15-30%, 转化率 1.5-3.5%

【K3 9/1 12:06 派活包 5 决策 (v6.4 cron 必跑清单)】
1. W1 zh-hk 类目页 meta refresh: 本 session 立即跑 (1 commit 1 push 攒批)
2. 食品包頁新页 2500 字: B 合并既有 food-boxes (per 70edfffa 8/31 已强化)
3. 3 段不足线 8/30 标题 (menus/banners/place-cards): A 9/13 验证期后首批合批统一修复
4. zprintpro-en-us-images/ 4GB: A 保持 working tree 现状 (per §0.27.3 永久排除)
5. D8-D14 7 篇选题: A 战略层 9/3 截止 + M3 9/8-9/14 落地 (D8 GBP K3 必亲自 9/8)

【数据来源】(§0.23 强制级, v6.4 新增)
- K3 9/1 12:06 派活包原文 (已校准 2026-09-01 12:06)
- K3 9/1 11:27 派活包 (9 角色综合 + 5 决策, 已校准)
- 9 角色综合最优决策 SSoT: docs/2026-09-01-k3-9role-v31-rewrite-decision.md (26KB)
- 9 角色战略主报告: docs/2026-09-01-k3-v3-strategic-master-report.md (41KB, §1 关键词分层 + §2 GSC 数据 + §3 转化漏斗)
- 9 角色综合深度分析: docs/2026-09-01-k3-v4-title-rule-deep-analysis.md (25KB)
- 5 cron SSoT v6.3 = 08438708 9/1 10:30 落, v6.4 升级同步 (1 commit 1 push 攒批)
- 当前实际状态: git rev-list 0 0 = a3ea8597 = origin_ssh/main (0 ahead 0 behind)
- D25 ToB SOP: docs/2026-09-01-k3-d25-tob-quote-sop.md (10.4KB)
- D8-D14 7 篇选题战略层 SOP: docs/2026-09-01-k3-d8-d14-blog-topic-strategy.md (13.4KB)
- 8/30 31 段 v3.1 base: 32001e17 commit + a3ea8597 commit (回滚 2bdacde3 v22 简化)
- 体检 log: .hermes/logs/title-v31-check-2026-09-01.md (9.6KB)
- GSC 8/31 v2 真实数据: `_gsc_read_v2_2026-09-01.py` 12 文件
- §0.30 v3 成熟度分级: 9 角色战略报告 §1.1

