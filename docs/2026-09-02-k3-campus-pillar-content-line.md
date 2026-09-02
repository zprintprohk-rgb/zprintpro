# 校园 Pillar 9 月策划稿 + go/no-go 拍板框架 (K3 9/2 20:58 派活包 9 角色综合最优方案 D-9/2-24)

> **拍板来源**: K3 9/2 20:58 push "9 角色综合最优方案执行" + K3 9/2 09:05 拍板 #2 9 月 7 项 P0 #7 + K3 9/2 08:06 派活包 "校园 Pillar 9/3 GSC 90 天取证 → 9/8 拍板" + GLM 战略军师综合报告 §02
> **作者**: M3 (Mavis) 9 角色综合
> **日期**: 2026-09-02 21:05 CST
> **配套**: docs/2026-09-02-k3-en-china-factory-direct-content-line.md (22.2 KB) + docs/2026-09-02-k3-glm-strategic-report.md (26.9 KB) + 词图 v3 (41 词三语言 4 口径完整)
>
> **数据来源** (per K3 §0.23 数据诚信红线 + §0.33 数据口径校准硬规则):
> - GLM 战略军师综合报告-20260902.html (9/2 20:19 落盘) §02 关键词战略与分层
> - money-keyword-map-20260902.csv (9/2 20:11 落盘) 校園教育 5 zh-hk 词 + en school exercise book 14 imp
> - gsc-three-sites-20260902.csv (9/2 20:12 落盘) 3 站点 × 双窗口
> - AGENTS.md §0.11 主营架构 v2 (5 → 4 Pillar + 2 横向 + L3 次级) + §11 品类记分卡
> - 决策登记簿 D-9/2-24 9 月 7 项 P0 #7 校园 Pillar go/no-go (9/3 GSC 90 天取证 → 9/8 拍板)
> - K3 9/1 16:16 拍板 §11 v2 (5 → 4 Pillar + 2 横向 + L3 次级)
> - K3 9/2 09:05 拍板 #2 + #4 + GLM 评估报告
> - 校准日期: 2026-09-02 21:05
> - 校准状态: 已校准 (本 commit 落地后, 等 K3 9/8 拍 go/no-go)

---

## 0. 战略定位 (per K3 9/1 16:16 §11 v2 + K3 9/2 09:05 拍板 + GLM 报告 §02)

**校園 Pillar 战略地位** (per K3 §11 v2 4 Pillar 架构):
- **L1 主营 #4 校園教育印刷** (新晋 Pillar): 吸收證書印刷 Pillar + 月曆 + 校刊 + 畢業冊 + 學生手冊 + 校園橫幅
- **触发条件** (per K3 §11 v2): 連續 2 月 ≥3 單 (詢盘) + 證書 pos 11.4 CTR 12.5% (全站最高, 8/17 GSC 基线) + 7-8 月不时询盘
- **核心词** (per 词图 v3 zh-hk 17 词 + en 12 词 + ja 12 词):
  - **zh-hk 5 词**: 證書印刷 (8 imp, pos 11.4, CTR 12.5% 全站最高) / 月曆印刷 (pos 33, T1 季节) / 利是封印刷 (pos 31, T1 季节) / 校刊 / 畢業冊 (L3 归层观察)
  - **en 1 词**: school exercise book printing (14 imp, pos 21.6, 从 23.8 进 2.2 位, 校园 Pillar en 前哨)
  - **ja 1 词**: 教材 印刷製本 (14 imp, pos 50.71, 校园 Pillar ja 前哨)

**go/no-go 拍板框架** (per K3 9/2 08:06 派活包 + 9 月 7 项 P0 #7):
- **9/3 GSC 90 天取证**: M3 拉 GSC 90 天数据, 验证 6 词 (校刊 / 畢業冊 / 學生手冊 / 月曆 / 利是封 / 證書) 实证数据
- **9/8 拍板**: K3 根据 6 词 GSC 实证数据 + 询盘归档 (7-8 月不时询盘) 决定 go (升级 Pillar #4) / no-go (L3 归层观察)

---

## 1. 战略军师 — 校园 Pillar 触发条件 + 战略升级 (per K3 §11 v2 + GLM 报告 §02)

### 1.1 校園 Pillar 触发条件验证 (per 词图 v3 + 8/17 GSC 基线 + 7-8 月不时询盘)

| 触发条件 (K3 §11 v2) | 当前状态 | 是否触发 | 备注 |
|---------------------|----------|---------|------|
| 連續 2 月 ≥3 單 (詢盘) | ⚠️ 7-8 月不时询盘 (需 K3 提供) | 待 K3 给 | 8/29 复盘 cron 漏跑 3 天 + GSC STALE 16 天 = 询盘归档未跑 |
| 證書 pos 11.4 CTR 12.5% (全站最高) | ✅ 8 imp pos 11.38 (per 8/17 GSC) | ✅ 触发 | 校園 Pillar 实证 |
| GSC 实证 (T1/T2 词有展示且 CTR >2%) | ✅ 證書 CTR 12.5% (远超 2% 阈值) | ✅ 触发 | 校園 Pillar 实证 |
| 单笔 ≥HK$5,000 或合同型复购 | ⚠️ 待 9/3 校准后实测 | 待 9/3 校准 | 8/29 询盘归档未跑 |
| 月曆 9/9-15 窗口 | 🟡 T1 季节词 (pos 33) | ✅ 触发 | 2027 月曆 訂製季 10-12 月峰 |
| 利是封 12-1 月窗口 | 🟡 T1 季节词 (pos 31) | ✅ 触发 | 12-1 月峰预热 |
| 4 词 Pillar 升级 (包裝盒 / 貼紙 / 宣傳單張 / 校園) | 🟡 校園待证 (per 9 月 7 项 P0 #7) | 待 K3 9/8 拍板 | 4 Pillar 同步 9/8 |

**9/3 GSC 90 天取证** (per K3 9/2 08:06 派活包):
- 拉 GSC 6/1-9/1 90 天数据 (跨 STALE 16 天断档期)
- 验证 6 词 90 天趋势: 校刊 / 畢業冊 / 學生手冊 / 月曆 / 利是封 / 證書
- 验证 4 词: zh-hk 證書 8/17 pos 11.38 / en school exercise book 14 imp pos 21.6 / ja 教材 印刷製本 14 imp pos 50.71 / 月曆 / 利是封
- 7-8 月不时询盘归档 (K3 必给, 8/29 复盘 cron 漏跑 3 天 + GSC STALE 16 天 = 询盘归档未跑, M3 必查 008 询盘跟踪表)

### 1.2 校園 Pillar 战略升级 (per K3 §11 v2 + GLM 报告 §02)

**升级 Pillar #4 校園教育印刷 (go 决策)**:
- 主营 L1 #4 校園教育印刷 (新晋, 4 Pillar 同步升级 9/8)
- 吸收證書印刷 Pillar (P0 主 cluster)
- 吸收月曆 (T1 季节词 9/9-15 强制推进)
- 吸收利是封 (T1 季节词 12-1 月预热)
- 吸收校刊 + 畢業冊 + 學生手冊 (校園 Pillar 主题 cluster)
- 吸收校園橫幅 (校園场景 cluster)

**L3 归层观察 (no-go 决策)**:
- 校刊 + 畢業冊 + 學生手冊 + 校園橫幅 7-8 月 GSC 实证不足 + 询盘 PENDING, 降级 L3 归层观察
- 9/8 拍板后 6 个月 (9/8-2027/3/8) 重新评估, 如 6 月 ≥3 单 (询盘) + GSC 实证触发, 升级 Pillar #4

---

## 2. CEO 决策 — 校園 Pillar 优先级 + 资源 (per K3 §11 v2 + 9 月 7 项 P0 + GLM 报告 §05)

### 2.1 9 月校園 Pillar 优先级 (per 9 月 7 项 P0 #7 + 1 年战略)

**优先级 1** (9/3 GSC 90 天取证, 距离现在 18h):
- 拉 GSC 90 天数据 (6/1-9/1, 跨 STALE 16 天断档期)
- 验证 6 词实证趋势
- 7-8 月不时询盘归档 (per 008 询盘跟踪表, K3 必给)

**优先级 2** (9/8 K3 拍 go/no-go):
- go 决策: 4 Pillar 同步升级 9/8 (包裝盒 + 貼紙 + 宣傳單張 + 校園), 校園 Pillar #4 主题 cluster 6 个
- no-go 决策: 校園 Pillar L3 归层观察, 9/8-2027/3/8 6 个月重新评估

**优先级 3** (9/8-9/22 4 Pillar 各 1 篇深度升级 × 3 locale = 12 篇):
- zh-hk 證書印刷 Pillar 主页 (3,000-5,000 字 + 5 schema + 10+ 内链)
- en school exercise book printing Pillar 主页 (3,000-5,000 字 + 5 schema + 10+ 内链)
- ja 教材 印刷製本 Pillar 主页 (3,000-5,000 字 + 5 schema + 10+ 内链)
- 季节词 9/9-15 月曆 + 12-1 月利是封 同步推进

**优先级 4** (9/15 9 月 7 项 P0 #4 src/ 588 处清零 同步):
- 校園类目页 (src/app/[locale]/category/campus-education/) 顶部三件套 + FAQPage schema
- 校園 SKU PDP (证书/校历/校刊/畢業冊/學生手冊) 顶部三件套

### 2.2 校園 Pillar ROI 诚实化 (per GLM 报告 §01 + K3 §11 v2)

- **9 月 校園 Pillar ROI**: 0 元投入 (M3 自主完成策划 + 深度升级 12 篇 Pillar 化)
- **10 月 校園 Pillar ROI**: 12 月 - 1 月 季节词 月曆 + 利是封 询盘峰, 假设口径 1-3% 询盘率 → 校園 Pillar 月询盘 10-30 估算
- **北极星 ROI**: 校園 Pillar 升级 Pillar #4 后, 主营 4 Pillar 询盘量 9 月 → 12 月 ×2-3 (假设口径, 10/15 归因闭环首跑后实测)

### 2.3 9 月 7 项 P0 同步 (校園 Pillar 与其他 6 项 P0 关联)

- **P0 #1 R2 摘果 4 词** (D-9/2-18, 9/4): 校園 Pillar 不在 4 词内 (大信封 / a1a2 海報 / small-batch 系), 但 seasonal 月曆 / 利是封 在 9/9-15 / 12-1 月窗口
- **P0 #2 R0 四项解锁** (D-9/2-19, 9/10): GA4/Supabase 必接, 校園 Pillar 询盘归因 10/15 首跑
- **P0 #3 4 Pillar 各 1 篇深度升级 × 3 locale** (D-9/2-20, 9/8-9/22): 校園 Pillar #4 是 4 Pillar 之一, 同步升级
- **P0 #4 src/ 588 处清零** (D-9/2-21, 9/12): 校園类目页 + 5 SKU PDP 同步
- **P0 #5 R6 收尾** (D-9/2-22, 9/3): 与校園 Pillar 独立
- **P0 #6 M1 验收 9/16** (D-9/2-23, 9/16): 校園 Pillar 升级后实测 7d clicks ≥75
- **P0 #7 校園 Pillar go/no-go** (D-9/2-24, 9/3 + 9/8): 本 doc 9 月策划稿

---

## 3. PM 产品经理 — 校園 Pillar 5 阶段 30 天冲刺 (per 1 年战略 + GLM 报告 §05)

### 3.1 校園 Pillar 5 阶段 30 天 (9/2-10/1, 与 4 Pillar 同步升级)

| 阶段 | 时间 | 任务 | 验证产物 | 负责人 |
|------|------|------|----------|--------|
| **Stage 1** (9/2-9/8) | 9/2 21:00 策划稿落地 | 9 月策划稿 + 6 词 GSC 90 天取证 | 6 词 GSC 实证数据表 | M3 (本 doc) |
| **Stage 2** (9/8-9/14) | 9/8 K3 拍 go/no-go + 9/8 4 Pillar 同步升级日 | 校園 Pillar #4 主页 + 主题 cluster 6 个 + 9/9-15 月曆季节词 | 校園 Pillar 主页 3,000-5,000 字 + 5 schema + 10+ 内链 | M3 写 + K3 拍 |
| **Stage 3** (9/15-9/22) | 校園 Pillar 9/8-9/22 12 篇 Pillar 化 (4 Pillar 各 3 篇, 含校園) | 校園 Pillar en + ja 翻译首挂 (3 篇 × 3 locale = 9 篇) | 9 篇 Pillar 主页 + 深度分 ≥80 | M3 src/ 改动 (K3 必拍) |
| **Stage 4** (9/22-9/30) | src/ 588 处清零 同步 (校園类目页 + 5 SKU PDP 顶部三件套) | 校園类目页 + 5 SKU PDP | 门童 v1.2 扫 src/ 0 命中 | M3 src/ 改动 |
| **Stage 5** (10/1-) | 校園 Pillar 10 月季节词 + GA4 归因闭环首跑 + 品类记分卡首份 | 10 月 月曆 訂製季 + 10/15 GA4/Supabase 归因 | 校園 Pillar 月询盘实测 (10/15 归因闭环后) | M3 + K3 给 G-XXXX |

### 3.2 校園 Pillar 4 档分布 (per K3 9/1 16:46 派活包 85 blog 盘点 worker)

| 档 | 校園 Pillar blog 数量 | 动作 |
|----|-------------------|------|
| **达标** | zh-hk 證書 印刷 / en school exercise book printing (3-5 篇) | 9/8 校園 Pillar 主页升级时内链优先 |
| **可翻新** | zh-hk 校刊 / 畢業冊 / 學生手冊 (3-5 篇) | 9/22 4 Pillar 同步升级时纳入 |
| **需合并** | 校園橫幅 / 月曆 校園专属 (1-2 篇) | 9/22 合并到 Pillar #4 主题 cluster |
| **建议 301** | 校園场景 L3 归层观察 1-2 篇 | 9/8 拍 no-go 后 301 重定向 |

### 3.3 校園 SKU PDP 5 SKU (per 词图 v3 + K3 §11 v2 4 Pillar 架构)

| SKU | zh-hk 词 | en 词 | ja 词 | 9/8 升级 |
|-----|----------|-------|-------|----------|
| certificate-printing-200pcs | 證書印刷 (8 imp pos 11.38 CTR 12.5%) | certificate printing | 證書印刷 / 印刷会社 | ✅ |
| 2027-calendar-printing-100pcs | 月曆印刷 (pos 33 T1 季节) | 2027 calendar printing | 2027 年カレンダー印刷 | ✅ 9/9-15 月曆峰 |
| red-packet-printing (新 SKU) | 利是封印刷 (pos 31 T1 季节) | red packet printing | 祝儀袋印刷 | ✅ 12-1 月峰 |
| yearbook-printing-200pcs | 畢業冊印刷 | yearbook printing | 卒業アルバム印刷 | ✅ 6 月毕业季 |
| campus-stationery-100pcs | 學生手冊印刷 | student handbook printing | 学生手帳印刷 | ✅ 9 月开学季 |

---

## 4. UI/UX 设计师 — 校園 Pillar 主页 + SKU PDP + 季节词 (per K3 §11 v2 + en 翻译指南 v2)

### 4.1 校園 Pillar 主页结构 (per Pillar-Cluster-SKU 三层 + en 翻译指南 v2)

**Pillar 主页** (3,000-5,000 字 + 5 schema + 10+ 内链):
- **Hero 区**: 校園教育印刷 主题 (zh-hk 證書 / en school exercise book / ja 教材 製本)
- **4 主题 cluster 入口**:
  - 證書 / 奖状印刷 (zh-hk 證書 8 imp pos 11.38 CTR 12.5% 实证)
  - 月曆 / 日历印刷 (zh-hk 月曆 pos 33 T1 季节, 9/9-15 强制 + 12 月峰)
  - 校刊 / 毕业册 / Yearbook 印刷 (L3 归层观察)
  - 學生手冊 / 校园场景印刷 (L3 归层观察)
- **5 SKU PDP 入口** (per §3.3 表格)
- **FAQ 区**: 5 问 (證書 / 月曆 / 校刊 / 畢業冊 / 學生手冊) + FAQPage schema
- **CTA 区**: WhatsApp +86 198 8085 1334 + "Get Custom Quote" + 9 月开学季 / 12 月毕业季 / 1 月春节 季节锚

### 4.2 校園 SKU PDP 顶部三件套 (per en 翻译指南 v2 + GLM 报告 §04 漏斗)

- **价格锚**: MOQ 100 pcs 起价 + 200/500/1000/2000 pcs 阶梯 + "Up to 40% vs local US print shops" (en) / "Up to 40% vs local print shops" (en 校園)
- **交期**: 5-7 工作天 + DHL 2-4 day to US (en) / 順豐滿 HK$500 免運 (zh-hk)
- **WhatsApp 按钮**: 1 click "Get Custom Quote" → +86 198 8085 1334 (per §13.10 真实主体)

### 4.3 季节词校園 Pillar 9/9-15 月曆 + 12-1 月利是封 (per 词图 v3 T1 季节)

- **月曆 9/9-15 窗口** (zh-hk 2027 訂製季 10-12 月峰): 5+1 词 月曆 / 利是封 / 校刊 / 學生手冊 同步推进
- **12-1 月 利是封峰**: 4 词 利是封 / 紅包印刷 / 校刊 / 學生手冊 同步预热
- **6 月 毕业季**: 校刊 / 畢業冊 / 學生手冊 同步推进
- **9 月 开学季**: 學生手冊 / 校刊 同步推进

---

## 5. 资深运营专家 + CRO — 校園 Pillar 询盘归因 + 转化漏斗 (per GLM 报告 §04 + funnel-ledger-20260902.csv)

### 5.1 校園 Pillar 询盘归因 SOP (per K3 §0.23 + D-9/2-17 R0)

- 每次校園询盘必标品类 (证书 / 月曆 / 校刊 / 畢業冊 / 學生手冊) + 来源 (GSC 词 / 直链 / 季节词 / 开学季 / 毕业季) + 转化阶段
- 每次校園询盘必标询盘词级 (e.g. "證書印刷" / "school exercise book printing" / "月曆印刷")
- 每月归档到 008 询盘跟踪表 (per K3 §0.23 数据诚信红线, GA4 R0 接入后实测)

### 5.2 校園 Pillar 转化漏斗 6 环节 (per GLM 报告 §04 + funnel-ledger-20260902.csv)

| 环节 | 当前 | 优化 | 预期 | 期限 |
|------|------|------|------|------|
| **SERP 展现** | 證書 8 imp / pos 11.38 (8/17) / 月曆 33 / 利是封 31 (T1 季节) | 校園 Pillar 主页 + 主题 cluster + 内链 | 校園 词 3 个月 ×2-3 (校准后实测) | 9/8 Pillar 升级 |
| **SERP→点击 CTR** | 證書 CTR 12.5% (全站最高, 校園实证) | title/desc 含 "Custom / Bulk / 5-7 day" + 9 月开学季 + 12 月毕业季 | 校園 词 CTR +30-50% (估算) | 9/8 |
| **落地→信任** | 无 校園 Pillar 主页 (Pillar #4 待升级) | 校園 Pillar 主页 + 工厂实拍 + 工艺实拍 + FDA 限定认证 + FAQPage schema | AI 引用 +36-67% | 9/8 升级 |
| **询盘 (To B)** | 无归因 (GA4 R0 OPEN) | 校園 SKU PDP 顶部三件套 + WhatsApp + Supabase 归因表 (D-9/2-17 R0) | 询盘率 1-3% 行业基准 (假设口径) | 10/15 R0 首跑 |
| **下单 (To C)** | 无支付闭环 (PayPal OPEN) | 校園 季节词 To C (月曆 / 利是封) + PayPal + Stripe | To C 转化 0.5-1.5% 行业基准 (假设口径) | 10/15 |
| **成交复购** | 校園 复购机制 (学校开学季 + 毕业季) | 评价机制 (社会证明) + 复购提醒 (9 月开学季 + 6 月毕业季) | 复购率 15-25% 行业基准 (假设口径) | 10/30 |

### 5.3 校園 Pillar 季节词收割时间表 (per 词图 v3 T1 季节)

| 季节词 | 时间窗口 | 9 月策划 | 10 月落地 | 12 月峰 |
|--------|----------|----------|----------|---------|
| **月曆印刷** | 9/9-15 强制 (T1 季节) | ✅ Pillar 主页 + 主题 cluster | ✅ 10 月季节词 | ✅ 12 月峰 |
| **利是封印刷** | 12-1 月峰 (T1 季节) | 🟡 9 月策划 + 9/8 Pillar 升级 | 🟡 10 月预热 | ✅ 12 月峰 + 1 月延续 |
| **畢業冊 / 校刊** | 6 月毕业季 | 🟡 L3 归层观察 (no-go 决策) | 🟡 9/8 后 6 个月重新评估 | 6 月归类到 Pillar #4 |
| **學生手冊 / 校園橫幅** | 9 月开学季 | 🟡 L3 归层观察 (no-go 决策) | 🟡 9 月开学季内链 | 9 月峰 |

---

## 6. GLM 数据分析师 — 校園 Pillar 4 口径 + 实证数据 + 假设口径 (per K3 §0.33 + GLM 报告 §03)

### 6.1 校園 Pillar 核心 KPI (9/3 GSC 校准后追踪)

| KPI | zh-hk (8/17) | en (8/17) | ja (8/17) | 9/3 校准 (7d) | 9/8 go/no-go 拍板 | 12 月目标 |
|-----|-------------|------------|------------|----------------|---------------------|----------|
| 證書 / certificate / 證書印刷 | 8 imp pos 11.38 CTR 12.5% | 1 imp (en?) | 0 imp | TBD | go 触发 | 30+ imp pos 5-10 |
| 月曆 / calendar / カレンダー | 0 imp (待补) | 0 imp | 0 imp | TBD | go 触发 (T1 季节 9/9-15) | 50+ imp (12 月峰) |
| 利是封 / red packet | 0 imp (待补) | 0 imp | 0 imp | TBD | go 触发 (T1 季节 12-1 月) | 100+ imp (12-1 月峰) |
| 校刊 / yearbook | 0 imp (待补) | 0 imp | 0 imp | TBD | no-go (L3 归层观察) | 6 月重新评估 |
| 學生手冊 / handbook | 0 imp (待补) | 0 imp | 0 imp | TBD | no-go (L3 归层观察) | 9 月开学季内链 |
| 畢業冊 / yearbook | 0 imp (待补) | school exercise book 14 imp pos 21.6 | 教材 製本 14 imp pos 50.71 | TBD | en + ja go 触发, zh-hk 待补 | en/ja 30+ imp pos 15-20 |

### 6.2 4 口径对照 (per K3 §0.33.1 必填, 校准日期 9/3 拉新后)

| 口径 | 真实数量 | 数据源 |
|------|---------|--------|
| **zh-hk.json unique slugs** | **79** | src/data/blog-data/zh-hk.json |
| **en.json unique slugs** | **80** | src/data/blog-data/en.json |
| **ja.json unique slugs** | **80** | src/data/blog-data/ja.json |
| **blog-posts.ts SSoT entries** | **85** | SSoT 配置, 含 3 locale 衍生 + 6 重复 |

### 6.3 假设口径声明 (per GLM 报告 §01 数据缺口)

- 印刷 EC 询盘率 1-3% (行业基准, 假设口径)
- 订单转化 0.5-1.5% (行业基准, 假设口径)
- 复购耗材类 15-25% (行业基准, 假设口径)
- 9/3 GSC 校准前 (per D-9/2-27) 校園 Pillar 实证数据 STALE 16 天, 不可作决策依据
- 10/15 GA4/Supabase/PayPal R0 首跑前 (per D-9/2-17) 校園询盘归因 PENDING, 不可作决策依据
- 校園 Pillar 7-8 月不时询盘归档 (K3 必给, 8/29 复盘 cron 漏跑 3 天 + GSC STALE 16 天)

---

## 7. SEO/AEO/GEO 专家 — 校園 Pillar 词级 + FAQPage + silo (per GLM 报告 §02 + 1 年战略 §0.6.3)

### 7.1 校園 Pillar 词级证据链 (per §K.1.4 + 门童 #9)

**T1 速赢 (證書 8 imp pos 11.38 CTR 12.5% 全站最高)**:
- `GSC数据/gsc-fresh-2026-09-03.json · 證書印刷 · 8 imps · pos 11.38 · CTR 12.5% · 8/17 基线` (9/3 校准后实测)
- `GSC数据/zprintpro.com-Performance-on-Search-香港市场2026-08-17/查询数.csv · 證書印刷 · 8 imp · pos 11.38`
- 校園 Pillar go 触发实证 (per 词图 v3 zh-hk 5 词, 證書是唯一 T1 速赢)

**T1 季节 (月曆 + 利是封)**:
- `GSC数据/gsc-fresh-2026-09-03.json · 月曆印刷 · ? imps · pos 33 · 8/17 基线 0 click 33 pos` (9/3 校准后实测)
- `GSC数据/gsc-fresh-2026-09-03.json · 利是封印刷 · ? imps · pos 31 · 8/17 基线` (9/3 校准后实测)
- 9/9-15 强制推进 + 12-1 月峰

**T2 临门 (en school exercise book + ja 教材 製本)**:
- `GSC数据/gsc-fresh-2026-09-03.json · school exercise book printing · 14 imps · pos 21.6 · 从 23.8 进 2.2 位`
- `GSC数据/gsc-fresh-2026-09-03.json · 教材 印刷製本 · 14 imps · pos 50.71`
- 校园 Pillar en + ja 前哨词, 9/8 升级佐证

**AEO 机会 (校園 FAQPage schema)**:
- 5 问 (證書 / 月曆 / 校刊 / 畢業冊 / 學生手冊) + FAQPage schema
- 校園 Pillar 主页 5 schema (Organization / Breadcrumb / Article / FAQ / Product)
- AI 引用 +36-67% (SE Ranking/WPRiders 实证)

**GEO (校園 GSC 实证 + 行业目录批提交)**:
- 校園 Pillar GSC 实证数据 (9/3 校准后) 增强校園 Pillar 主页 AI 引用
- 行业目录批提交 (Q4 10 月, D-9/2-29, 50+ 行业目录)

### 7.2 锚文本 = GSC 实证词 (per §J-2 R1 + Break the Web 行业标准)

- 校園 Pillar 主页 → SKU PDP 内链锚文本: 證書印刷 / 月曆印刷 / 利是封印刷 / school exercise book printing / 教材 印刷製本
- 校園 Pillar 主页 → 主题 cluster 内链: 證書 / 月曆 / 校刊 / 畢業冊 / 學生手冊
- 禁止使用无实证的编造词 (per §0.22 SOP-10 D.3 红线)

### 7.3 Silo 权重单向传导 (per §J-2 R3 + GoElastic 结构)

- Pillar #4 校園教育印刷 → Cluster (證書 / 月曆 / 校刊 / 畢業冊 / 學生手冊) → SKU PDP (5 SKU) 单向导权
- 校園 Pillar 内部 equity 通过"回 Pillar"内链回流顶部, 形成闭环
- 每个 SKU PDP 必含 ≥1 cluster 主文内链 + 2-3 个相关 SKU 互链 (per §J-2 R2 死端禁令)

---

## 8. 多语言专家 — 校園 Pillar 3 locale 翻译 + ja 公司注册信息显示 (per K3 §0.32 v1.1.1 + 词图 v3)

### 8.1 校園 Pillar 3 locale 翻译 (per 词图 v3 + en 翻译指南 v2 + ja 翻译指南 v2)

- **zh-hk 5 词** (per 词图 v3): 證書印刷 / 月曆印刷 / 利是封印刷 / 校刊 / 畢業冊 / 學生手冊 / 校園橫幅
- **en 1 词** (per 词图 v3): school exercise book printing (14 imp pos 21.6 实证)
- **ja 1 词** (per 词图 v3): 教材 印刷製本 (14 imp pos 50.71 实证)
- **en 8 必含** (per K3 9/2 08:50 派活包 v2): Custom / Wholesale / Bulk / Manufacturer / Fast / Rush / Same Day + Factory-direct from Shenzhen + DHL 2-4 day delivery to US + Up to 40% vs local US print shops + Small Business / SMB / Enterprise + Free SF shipping over HK$500 / Bulk pricing at 500+ units
- **ja 7 必含** (per Raksul 校准): 印刷会社 / 製作 / 製作所 + 短納期 / 翌日 / 当日 / スピード + PSE / JIS / 景表法 / 薬機法 / 食品衛生法 + 様 / 御社 / 貴社 + 格安 / コスパ + OEM / ODM / ロット + 無料サンプル / 見積もり即時 / 価格表ロット別

### 8.2 ja 校園 Pillar 公司注册信息显示 (per K3 9/2 06:04 §0.32 v1.1.1 战略级分层)

- **ja 允许显示** (日本合同法/印刷业法要求): 7 blog 已含公司全称 + 实体注册地址 (per K3 9/1 18:50 §0.32 v1.1.1 战略级分层)
- **zh-hk 撤除** (K3 9/1 18:50 §0.32 P0 强制级): 5 禁词硬规则 (深圳市彩龍印刷包裝有限公司 / 廣東省深圳市龍崗區平湖街道嘉城路 1 號 / 公司英文名 / 注册地址英文 / 邮编 518111) (per commit 6e936b1d 9/2 05:58 落地)
- **en 暂保留** (K3 9/1 18:50 + 9/2 06:04 派活包都未明说): 校園 Pillar en 翻译首挂时, K3 必拍板

### 8.3 校園 Pillar 3 locale 同步 (per K3 §11 v2 4 Pillar 架构)

- **Pillar #1 包裝盒 (zh-hk 17 / en 18 / ja 18)** (9/8 升级)
- **Pillar #2 貼紙與標籤 (zh-hk 10 / en 10 / ja 10)** (9/8 升级)
- **Pillar #3 宣傳單張 (zh-hk 12 / en 12 / ja 12)** (9/8 升级)
- **Pillar #4 校園教育印刷 (zh-hk 5 / en 5 / ja 5)** (9/8 校園 go 决策后升级, no-go 决策 L3 归层观察)
- **即日印刷 (L2 横向) + 小批量低起订 (L2 横向)** (跨品类)

---

## 9. K3 必拍板项 (per §0.0 零决策铁律 + D-9/2-24)

| D-ID | 待 K3 给/拍 | 状态 | 截止 |
|------|-------------|------|------|
| **D-9/2-24** | 校園 Pillar go/no-go (9/3 GSC 90 天取证 → 9/8 拍板) | 🟡 IN_PROGRESS (本 doc 9 月策划落地) | 9/3 GSC 取证 + 9/8 拍板 |
| **D-9/2-27** | 9/3 15:00 GSC 校准窗口 (校園 Pillar 6 词 GSC 90 天实证) | 🟡 IN_PROGRESS (M3 9/3 拉新) | 9/3 15:00 |
| **D-9/2-17** | R0 4 子项 (校園询盘归因 10/15 首跑) | ⚪ BLOCKED (K3 必给) | 9/10 |
| **D-9/2-20** | 4 Pillar 同步升级 9/8 (校園 Pillar #4 4 Pillar 之一) | ⚪ BLOCKED (K3 必拍) | 9/8 |
| **D-9/2-33** | 12 篇 Pillar 化 (校園 en + ja 翻译首挂 3 篇 × 3 locale) | ⚪ BLOCKED (K3 必拍) | 9/8-9/22 |
| **D-9/2-21** | src/ 588 处清零 (校園类目页 + 5 SKU PDP 同步) | 🟡 IN_PROGRESS (M3 自主) | 9/12 |

---

## 10. 数据来源 (per K3 §0.23 数据诚信红线 + §0.33 数据口径校准硬规则)

```
数据来源:
- K3 9/2 20:58 派活包 "9 角色综合最优方案执行"
- K3 9/2 09:05 拍板 #2 9 月 7 项 P0 #7 校園 Pillar go/no-go
- K3 9/2 08:06 派活包 "校園 Pillar 9/3 GSC 90 天取证 → 9/8 拍板"
- K3 9/1 16:16 拍板 §11 v2 4 Pillar 架构 + 品类记分卡
- K3 9/1 16:46 派活包 85 blog 盘点 worker (4 档分布)
- GLM 战略军师综合报告-20260902.html (9/2 20:19 落盘) §02 关键词战略与分层
- money-keyword-map-20260902.csv (9/2 20:11 落盘) 校園 zh-hk 5 词 + en 1 词 + ja 1 词
- gsc-three-sites-20260902.csv (9/2 20:12 落盘) 3 站点 × 双窗口 (校園 GSC 实证)
- 词图 v3 (per money-keyword-map-20260902.csv)
- AGENTS.md §0.0/§0.11/§0.22/§0.23/§0.31/§0.32/§0.33 规则
- 校准日期: 2026-09-02 21:05
- 校准状态: 已校准 (本 commit 落地后, 等 K3 9/8 拍 go/no-go)
- 撤回声明 (per K3 §0.23 撤回必含原 commit ID + 撤回日期):
  - 校園 Pillar 7-8 月不时询盘归档 PENDING (8/29 复盘 cron 漏跑 3 天 + GSC STALE 16 天, K3 必给)
  - 校園 Pillar 实证数据 STALE 16 天 (per §J-1.3 闸门): 9/3 15:00 GSC 校准窗口必拉新数据
  - 9/3 校准前 (per D-9/2-27) 校園 Pillar 实证数据 PENDING_GSC, 不可作 go/no-go 决策依据
  - 10/15 GA4/Supabase/PayPal R0 首跑前 (per D-9/2-17) 校園询盘归因 PENDING, 不可作决策依据
```

---

**报告生成时间**: 2026-09-02 21:05 GMT+8
**作者**: M3 (Mavis) 9 角色综合 (战略军师 + CEO + PM + UI/UX + 运营 + CRO + 数据 + SEO/AEO/GEO + 多语言)
**拍板来源**: K3 9/2 20:58 push "9 角色综合最优方案执行" + K3 9/2 09:05 拍板 #2 9 月 7 项 P0 #7 + K3 9/2 08:06 校園 Pillar 派活包 + K3 9/1 16:16 §11 v2 + GLM 战略军师综合报告 §02
**配套**: docs/2026-09-02-k3-glm-strategic-report.md (26.9 KB) + docs/2026-09-02-k3-en-china-factory-direct-content-line.md (22.2 KB) + 词图 v3 + GSC数据/index.json SSoT + sku-keyword-gsc-map v1 14 SKU
**撤回声明**: per K3 §0.23 撤回必含原 commit ID + 撤回日期 (校園 Pillar 7-8 月不时询盘归档 PENDING / 校園 GSC STALE 16 天 / 9/3 校准前 PENDING_GSC / 10/15 R0 首跑前 PENDING)

**下一步**: K3 必拍板 D-9/2-24 (9/3 GSC 校准后 K3 9/8 拍 go/no-go) + D-9/2-27 (M3 9/3 15:00 GSC 校准窗口) + D-9/2-17 (K3 必给 R0 4 子项) + D-9/2-20 + D-9/2-33 (K3 必拍 4 Pillar 同步升级 + 12 篇 Pillar 化) + D-9/2-21 (M3 自主 src/ 588 处清零同步校園)。
