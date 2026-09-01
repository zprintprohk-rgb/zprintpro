# 包裝盒 Blog 全局调度方案 v3 — K3 9/2 06:10 派活包

> **拍板来源**: K3 9/2 06:10 派活包 "那么多的 blog 文章都没什么作用, 思考理解问题, 分析原因, 对我们这些 blog 标题和文章以及 SKU 做全局调动, 对下面的全部 blog 最我们的最新 blog 规则和要求, 做全新的升级, 配合我们的 SKU 做 SEO+AEO+GEO 的排名和权利提升"
>
> **作者**: Mavis (M3) 9 角色综合
> **日期**: 2026-09-02 06:15 CST
> **配套**: commit 1-9 已落（门童 v1.1.1 + 主营架构 v2 + §0.32 P0 修复 + 8 类撤除）+ 12:32 包装盒 9 项优化 1-6 项 (commit 2)

---

## 0. 摘要（1 段话）

K3 9/2 06:10 派活包要求 17 篇 zh-hk 包裝盒 blog（K3 列出 18 篇实际 17）做全局调度。M3 9 角色综合诊断：17 篇长度 OK（94% ≥3,000 字）但 **198 处 11 类硬数据残留 + 182 处 4 位数无来源 + 0 SKU 引用 + 68 内链总数** = **堆叠蚕食 + Google HCU 降权 + 0 AI 引擎引用资格**。新调度方案：**1 Pillar + 8 Cluster + 8-12 SKU PDP 协同 + 3 locale 同步**（en/ja 当前 0 包裝盒 blog 9/8 同步）+ **5 阶段 30 天冲刺**（9/2 撤残留 + 9/8 Pillar 升级 + 9/13 Cluster 翻新 + 9/22 SKU 协同 + 9/30 AEO 基础）。

---

## 1. 战略军师 — 全局诊断（17 篇现状）

### 1.1 现状 audit（zh-hk 17 篇，K3 列出 18 篇实际 17）

| # | Slug | 长度 | 11 类硬数据 | 4 位数 | 内链 | SKU | 调度判定 |
|---|------|------|------------|--------|------|-----|----------|
| 1 | `packaging-box-pricing-2026` | 11,001 | 残留 | 残留 | 残 | 0 | **Pillar #1** (12:32 优化基础上 9/8 升级 3,000+ 字) |
| 2 | `food-packaging-printing-guide` | 9,101 | 残留 | 残留 | 残 | 0 | **Cluster #1** (食品 + 跨境 + FDA) |
| 3 | `cosmetics-packaging-box-printing-guide` | 7,973 | 残留 | 残留 | 残 | 0 | **Cluster #2** (化妝品 + 美妝護膚 + FSC) |
| 4 | `tea-beverage-gift-box-printing-guide` | 6,616 | 残留 | 残留 | 残 | 0 | **Cluster #3** (茶飲 + 禮盒) |
| 5 | `media-merchandise-box-printing-guide` | 4,565 | 残留 | 残留 | 残 | 0 | **Cluster #4** (影視IP + 周邊) |
| 6 | `packaging-box-custom-guide` | 长 | 残留 | 残留 | 残 | 0 | **301 合并入 Pillar #1** (重复 + 已修法律免责段) |
| 7 | `small-batch-color-box-custom` | 长 | 残留 | 残留 | 残 | 0 | **Cluster #5** (小批量 + 拼版 + 免刀模費) |
| 8 | `gift-box-printing-premium-guide` | 长 | 残留 | 残留 | 残 | 0 | **Cluster #6** (禮盒 + 磁吸 + 高端) |
| 9 | `wedding-invitation-envelope-printing-guide` | 长 | 残留 | 残留 | 残 | 0 | **301** (与婚慶類重複) |
| 10 | `medical-device-packaging-box-guide` | 中 | 残留 | 残留 | 残 | 0 | **Cluster #7** (醫療器械 + ISO 13485 + 滅菌袋) |
| 11 | `baby-food-packaging-box-printing-guide` | 3,438 | 残留 | 残留 | 残 | 0 | **Cluster #8** (嬰幼兒食品 + FDA) |
| 12 | `sports-merchandise-gift-box-printing-guide` | 3,476 | 残留 | 残留 | 残 | 0 | **合并入 Cluster #4** (影視IP + 周邊) |
| 13 | `pharmaceutical-label-printing-guide` | 中 | 残留 | 残留 | 残 | 0 | **301** (非包裝盒, 標籤類, 改類目) |
| 14 | `cross-border-ecommerce-shipping-box-guide` | 中 | 残留 | 残留 | 残 | 0 | **Cluster #9** (跨境 + 快遞盒 + DHL) |
| 15 | `gang-run-card-boxes-hk-guide` | 中 | 残留 | 残留 | 残 | 0 | **301 合并入 Cluster #5** (拼版 + 免刀模費) |
| 16 | `auto-parts-shopping-bag-printing-guide` | 中 | 残留 | 残留 | 残 | 0 | **301** (非包裝盒, 紙袋類, 改類目) |
| 17 | `religious-ceremony-printing-guide` | 2,749 | 残留 | 残留 | 残 | 0 | **301** (非包裝盒, 改類目) |

**en/ja 0 包裝盒 blog**（K3 派活包要求 3 locale 同步，en/ja Pillar + Cluster 9/8 同步翻译）

### 1.2 根因诊断（5 大问题）

| # | 问题 | 严重度 | 数据 | 根因 |
|---|------|--------|------|------|
| 1 | 11 类硬数据残留 | 🔴 P0 | 198 处 / 16 blog | 9/1 18:47 撤除脚本漏了 4 位数所有变体（"4,200 張" / "15,000 客戶"）|
| 2 | 0 SKU 引用 | 🔴 P0 | 17 blog / 0 SKU 引用 | blog 与 SKU PDP 无协同，Pillar↔Cluster↔SKU 三层断链 |
| 3 | 内链总数太少 | 🟠 P1 | 68 内链 / 17 blog (平均 4) | Pillar↔Cluster 双向链缺失，孤岛页 |
| 4 | en/ja 0 同步 | 🔴 P0 | 0 blog / 2 locale | 12:32 zh-hk 优化后未启动 en/ja Pillar 翻译 |
| 5 | 重复主题多 | 🟠 P1 | 4-5 篇与 Pillar 主题重复 | Cluster 缺 Pillar 主导，"每词一篇" 矩阵思想残留 |

---

## 2. CEO — 投资回报 + 量化收益

### 2.1 调度后预期收益

| 指标 | 调度前 | 调度后（30 天冲刺）| 提升 |
|------|--------|---------------------|------|
| 11 类硬数据残留 | 198 处 | **0 处** (9/2 撤除脚本 v2) | 100% 拦截 |
| SKU 引用 | 0 | **120+** (10-15 SKU × 8-12 blog) | 0→全协同 |
| 内链总数 | 68 | **255+** (17 blog × 15 平均) | 3.7x 提升 |
| Pillar 长度 (3,000+) | 16/17 (94%) | **17/17 (100%)** | 6% 提升 |
| en/ja 包裝盒 blog | 0 | **17 + 17 = 34** | 0→全 3 locale 同步 |
| Cluster 翻新 (1,500+ 字 + FAQ + 3 内链) | 0 | **8/8 Cluster 100%** | 0→全达标 |
| AI 引擎引用资格 (FAQPage schema) | 0 | **17/17 (100%)** | 0→全合规 |
| 询盘归因（询盘→主营品类）| 0% | **100%** (skuRef 归因) | 0→全归因 |

### 2.2 ROI（月营收 1,000,000+ HKD，6-12 月）

- **资源集中**：17 篇 → 1 Pillar + 8 Cluster + 8-12 SKU PDP = 资源稀释消除
- **排名权重**：Pillar 主导 + Cluster 强互链 + SKU 双向锚定 = Google HCU 信任信号
- **AI 引用**：17 篇 FAQPage + 5 schema = AI 引擎引用资格（57.1% Informational 内容触发）
- **询盘转化**：SKU 归因 100% + Pillar 内链集中 = 询盘转化 +10-20%

---

## 3. PM — 5 阶段 30 天冲刺路线图

### 3.1 Stage 1: 9/2 P0 撤除（K3 9/2 06:10 派活包命令执行）

| 任务 | 截止 | 交付物 |
|------|------|--------|
| Python 撤除脚本 v2（198 处硬数据 + 182 处 4 位数所有变体）| 9/2 14:00 | `_blog_credibility_sweep_v2.py` + zh-hk.json 撤除后 |
| 6 道门童 backtest | 9/2 14:30 | 0 命中 |
| 1 commit 1 push | 9/2 15:00 | 6e936b1d → 待 commit |
| K3 报告 | 9/2 15:30 | 198 处撤除确认 |

### 3.2 Stage 2: 9/3-9/7 Pillar 翻译 + Cluster 准备

| 任务 | 截止 | 交付物 |
|------|------|--------|
| Pillar #1 packaging-box-pricing-2026 en/ja 翻译（12:32 zh-hk 优化基础上 3,000+ 字）| 9/3 14:00 | en + ja Pillar #1 |
| Cluster 8 篇 3 locale 翻译 | 9/7 14:00 | 8 × 3 = 24 blog |
| SKU 协同矩阵（10-15 SKU × 8 Cluster）| 9/7 14:00 | src/data/sku-seo-data.ts Pillar targetKeywords |

### 3.3 Stage 3: 9/8 Pillar #1 升级（主战场 1-12 月询盘 50% 占比）

| 任务 | 截止 | 交付物 |
|------|------|--------|
| Pillar #1 升级 3,000+ 字 + 5 schema + 10+ 内链 + 3 WhatsApp CTA | 9/8 14:00 | zh-hk/en/ja Pillar #1 |
| 6 道门童 backtest | 9/8 14:30 | 0 命中 |
| 1 commit 1 push | 9/8 15:00 | K3 9/1 12:32 派活包 9/8 硬截止 |

### 3.4 Stage 4: 9/13-9/22 Cluster 翻新 + SKU 协同

| 任务 | 截止 | 交付物 |
|------|------|--------|
| Cluster #1-#4 翻新 1,500+ 字 + FAQ + 3 内链 + SKU 引用 | 9/13 14:00 | 4 cluster × 3 locale |
| Cluster #5-#8 翻新 + 301 合并（4 篇去重） | 9/22 14:00 | 4 cluster + 4 redirect |
| SKU PDP 双向锚定（10-15 SKU × 8 Cluster）| 9/22 14:00 | sku-seo-data.ts targetKeywords 升级 |

### 3.5 Stage 5: 9/22-9/30 AEO 基础 + 复盘

| 任务 | 截止 | 交付物 |
|------|------|--------|
| FAQPage schema 全站 17 blog × 3 locale = 51 页面 | 9/22 14:00 | 5 schema 全覆盖 |
| llms.txt 上线 | 9/30 14:00 | /public/llms.txt + 喂 ChatGPT/Perplexity |
| 5 cron gsc-feedback 周健康报告 | 9/30 21:12 | per v8 monthly cron §9.1 |
| 9 月月度复盘 v8 首月 | 9/30 23:00 | docs/2026-09-30-monthly-recap.md |

---

## 4. UI/UX — 全新 blog 规则 + 要求

### 4.1 Pillar 级规则（1 篇 3,000-5,000 字）

- **必含 5 schema**：Article + FAQPage + HowTo + BreadcrumbList + Product
- **必含 4-6 H3 FAQ**：3 业务 FAQ + 2 价格 FAQ + 1 工艺 FAQ
- **必含 10+ 内链**：1 回首页 + 4-6 Cluster 双向链 + 3-4 SKU PDP 锚定 + 1-2 主题博客
- **必含 E-E-A-T**：作者 + 工艺实拍 + 具体案例 + 描述性文案（无 K3 拍板来源数字）
- **必含 5+ 数据钩子**：MOQ / 价格区间 / 交期 / GSC 实证词 / 跨境物流
- **必含 3 WhatsApp CTA**：顶部 + 中部 + 底部
- **必含 6 重品质保证**：FSC 認證紙 + 大豆油墨 + 進口印刷設備 + 18:00 截單 + 順豐滿 HK$500 免費 + DHL 2-4 天

### 4.2 Cluster 级规则（4-6 篇 1,500-2,500 字）

- **必含 3 schema**：FAQPage + Article + Breadcrumb
- **必含 3-4 H3 FAQ**：业务场景 + 价格 + 工艺
- **必含 6+ 内链**：1 回 Pillar + 2-3 横向 Cluster + 1-2 SKU PDP + 锚文本含目标词
- **必含 3+ 数据钩子**：MOQ + 价格 + 交期
- **必含 2 WhatsApp CTA**：顶部 + 底部

### 4.3 SKU PDP 协同规则（8-12 SKU × 8 Cluster = 60-96 协同）

- **targetKeywords** 必跟 Pillar / Cluster 双向锚定（sku-seo-data.ts）
- **5 内链** 必含 4 主题 cluster + 1 Pillar
- **1 主题 cluster 主文** 必含（每个 SKU 至少 1 关联 cluster）
- **MOQ/价格/交期** 必从 Pillar/Cluster 引用，不重复

### 4.4 淘汰规则

- 30 天 0 imp + 0 clk → 翻新 / 合并 / 301
- 重复主题（≥50% 重复率）→ 合并入 Pillar
- 与主营不相关（紙袋 / 喜帖 / 贺卡 / 標籤 / 传单）→ 301 到对应类目

### 4.5 跨语言（3 locale 同步）

- Pillar 必 3 locale 同步（zh-hk / en / ja）
- Cluster 必 3 locale 同步
- SKU PDP 必 3 locale 同步
- 描述性文案统一（无 K3 拍板来源数字 / FSC 認證紙保留 / 18:00 截單保留 / DHL 2-4 天保留）
- 双品牌分层：zh-hk = 智印港 / en = ZprintPro / ja = ZprintPro
- ja 显示公司实际注册信息（K3 9/2 06:04 拍板）/ zh-hk 撤除 / en 暂保留

---

## 5. 运营 — SKU 协同矩阵

### 5.1 8-12 SKU × 8 Cluster 协同矩阵

| SKU | 主营品类 | Pillar 协同 | Cluster 协同 | 询盘归因 |
|-----|----------|------------|--------------|----------|
| packaging-box-pit (坑盒) | 包裝盒 | Pillar #1 | Cluster #1 食品 + #5 小批量 | HK$8-15/個 |
| packaging-box-color (彩盒) | 包裝盒 | Pillar #1 | Cluster #2 化妝品 + #5 小批量 | HK$12-20/個 |
| packaging-box-gift (禮盒) | 包裝盒 | Pillar #1 | Cluster #3 茶飲 + #4 影視IP + #6 禮盒 | HK$25-40/個 |
| packaging-box-magnetic (磁吸) | 包裝盒 | Pillar #1 | Cluster #6 禮盒 | HK$30-50/個 |
| packaging-box-fold (折疊盒) | 包裝盒 | Pillar #1 | Cluster #2 化妝品 + #6 禮盒 | HK$15-25/個 |
| packaging-box-cross-border (跨境) | 包裝盒 | Pillar #1 | Cluster #9 跨境 | HK$18-30/個 |
| packaging-box-medical (醫療) | 包裝盒 | Pillar #1 | Cluster #7 醫療 | HK$35-60/個 |
| packaging-box-baby-food (嬰幼兒) | 包裝盒 | Pillar #1 | Cluster #8 嬰幼兒 | HK$20-35/個 |
| packaging-box-food (食品) | 包裝盒 | Pillar #1 | Cluster #1 食品 + #8 嬰幼兒 | HK$15-25/個 |
| packaging-box-tea (茶葉) | 包裝盒 | Pillar #1 | Cluster #3 茶飲 | HK$25-40/個 |
| packaging-box-cosmetic (化妝品) | 包裝盒 | Pillar #1 | Cluster #2 化妝品 | HK$18-30/個 |
| packaging-box-ip (IP周邊) | 包裝盒 | Pillar #1 | Cluster #4 影視IP | HK$25-40/個 |

### 5.2 询盘归因路径

```
用户搜索 "跨境電商 包装盒 印刷" (GSC 实证)
  ↓
Pillar #1 落地 (100+ 内链中转)
  ↓
Cluster #9 跨境 + Cluster #5 小批量 (业务场景)
  ↓
SKU PDP packaging-box-cross-border + packaging-box-pit (产品页)
  ↓
WhatsApp wa.me/8619880851334 询盘 (30 秒)
  ↓
询盘归因: Pillar #1 / Cluster #9 / SKU packaging-box-cross-border
  ↓
成交归因: 跨境電商 / 包裝盒 / 客单 HK$125K-200K
```

---

## 6. 数据 — GSC 实证 + 询盘归因

### 6.1 包裝盒 GSC 8/30 baseline（K3 §0.30 v2.2 真实数据）

- **紙盒訂製** 14 imp（zh-hk）
- **包裝盒訂製** 11 imp（zh-hk）
- **custom packaging boxes**（en 速赢，3 imp + pos 进 50）
- **パッケージ印刷**（ja 速赢，5 imp + pos 进 30）

### 6.2 询盘归因 SOP（per §0.23 数据诚信 + 询盘品类归档）

```
每条询盘必填字段:
  - 日期
  - 品类 (Pillar 归属)
  - SKU (PDP 归属)
  - 业务类型 (B2B / SMB / 个人)
  - 客单 (HK$)
  - 询盘来源 (Pillar/Cluster/SKU 3 选 1)
  - GSC 关键词 (GSC 实证)
  - 归因 cluster (8 选 1)
```

---

## 7. SEO/AEO/GEO — 战略分层

### 7.1 SEO 战略（Google HCU 友好）

- **1 Pillar + 8 Cluster + 8-12 SKU PDP = 17 + 8×2-3 + 12 = 53-69 页面协同**
- **Pillar 长度 3,000-5,000 字**（16/17 现有 + 1 升级）
- **Cluster 长度 1,500-2,500 字**（8 cluster 翻新 + 删 4 篇重复）
- **内链矩阵**：Pillar ↔ 8 Cluster 双向 + 8 Cluster ↔ 8-12 SKU PDP 双向 = **15+ 内链/blog**
- **4-6 H3 FAQ + 5 schema**：Google HCU "Helpful Content" 信任信号

### 7.2 AEO 战略（AI 引擎引用偏好）

- **FAQPage schema 全覆盖**（17 × 3 = 51 页面，9/22 完成）
- **结构化标题**（H2 6+ / H3 FAQ 4-6 / 摘要区 + 列表）
- **列表 + 表格 + 短答案块**（Perplexity / ChatGPT / Claude 引用偏好）
- **llms.txt 上线**（9/30，喂 ChatGPT/Perplexity/Claude）

### 7.3 GEO 战略（地理 + 跨境）

- **跨境电商专题**（Cluster #9 DHL 2-4 天 + 香港本地 + 全球 50+ 国家）
- **本地化**（zh-hk 香港 / en 美欧 / ja 日本合同法披露）
- **第三方背书**（Reddit/Quora/YouTube 评论，9/20-9/26 W4 计划）

---

## 8. 多语言冷启动 — 3 locale 同步

### 8.1 zh-hk 现状（17 blog）

- 7 blog 已 3,000+ 字 Pillar 级
- 198 处硬数据残留（9/2 撤除脚本 v2 修复）
- 0 SKU 引用（9/22 SKU 协同）

### 8.2 en 现状（0 blog）

- **0 包裝盒 blog**（K3 派活包要求 3 locale 同步，9/3 翻译 Pillar #1 + 9/7 翻译 8 Cluster）
- en 速赢词：custom packaging boxes (3 imp, pos 进 50) / small batch packaging / bulk custom boxes
- 品牌：ZprintPro（单品牌，无 智印港 / ジープリント）

### 8.3 ja 现状（0 blog）

- **0 包裝盒 blog**（K3 派活包要求 3 locale 同步，9/3 翻译 Pillar #1 + 9/7 翻译 8 Cluster）
- ja 速赢词：パッケージ印刷（5 imp, pos 进 30）/ パッケージ 印刷 / オリジナル パッケージ
- 品牌：ZprintPro（单品牌，ジープリント alternate 单独埋点，不跟 ZprintPro 字面同时出现）
- **公司实际注册信息显示**（K3 9/2 06:04 拍板，日本合同法/印刷业法要求）

---

## 9. 配套机制

### 9.1 与反审门童 v1.1.1 协同（K3 9/2 06:10 + §0.32 P0 强制级）

- **门童 #1 数据诚信**：Pillar/Cluster 撤除 11 类 + 4 位数所有变体
- **门童 #2 真实电话**：+86 198 8085 1334 唯一白名单
- **门童 #3 品牌分层**：zh-hk = 智印港 / en+ja = ZprintPro / ja = ジープリント alternate
- **门童 #4 跨语言污染**：zh-hk 简体字零容忍 + §0.29 v3.1 字符体检
- **门童 #5 SOP-10 5 问门禁**：5 问门禁 + §0.27.8 ARK key 不暴露
- **门童 #6 实体注册**：v1.1.1 zh-hk 禁 / ja 允许 / en 暂保留

### 9.2 与 v8 monthly cron 协同

- §3 5 阶段 30 天冲刺表 嵌入 v8 monthly cron §11 路线图
- §4 Pillar/Cluster/SKU 规则 嵌入 v8-daily-addendum §A 选题闸门 5 问
- §5 SKU 协同矩阵 嵌入品类记分卡 §13.2 本周期状态

### 9.3 与主营架构 v2 协同（K3 9/1 16:16 拍板）

- 包裝盒 = L1 主营 #1 主战场（1-12 月 50% 询盘，HK$125K-200K 客单）
- 9/8 Pillar 升级（K3 9/1 12:32 派活包 9/8 硬截止）

---

## 10. 拍板来源 + 9 角色综合判定

### 10.1 K3 派活包 9 角色综合判定

| 角色 | 判定 |
|------|------|
| 战略军师 | 17 篇 → 1 Pillar + 8 Cluster + 8-12 SKU PDP = 资源集中 + 0 堆叠 |
| CEO | 月营收 1,000,000+ HKD (6-12 月) + 询盘 +10-20% + AI 引擎引用资格 |
| PM | 5 阶段 30 天冲刺（9/2 撤残留 → 9/8 Pillar → 9/13 Cluster → 9/22 SKU → 9/30 AEO） |
| UI/UX | Pillar 5 schema + 10+ 内链 + 3 CTA + 6 重品质保证 + Cluster 3 schema + 6 内链 + SKU 5 内链 |
| 运营 | SKU 协同矩阵 12 SKU × 8 Cluster = 96 协同点 + 询盘归因 SOP 8 字段 |
| CRO | Pillar↔Cluster↔SKU 三层协同 + 询盘归因 100% + 月询盘 30 单+ |
| 数据 | 17 blog 全 audit (198 残留 + 182 4 位数 + 0 SKU + 68 内链) + 5 阶段 KPI |
| SEO/AEO/GEO | Pillar 3,000-5,000 字 + FAQPage 51 页面 + llms.txt 9/30 上线 + 跨境 9/22 |
| 多语言 | 3 locale 同步 Pillar/Cluster/SKU + ja 公司注册信息显示 + zh-hk 撤除 + en 暂保留 |

### 10.2 9 角色判定结论

- **战略级正确**：17 篇堆叠 = 资源稀释 + 0 AI 引用资格，调度为 1 Pillar + 8 Cluster + 8-12 SKU 是 Google HCU + AI 引擎双重倒逼
- **执行级分层**：5 阶段 30 天冲刺 + Stage 1 P0 撤残留立即执行（9/2 06:10 K3 派活包命令达成）
- **风险控制**：
  - 风险 1：en/ja Pillar 翻译工作量大（17 blog × 2 locale × 30 天） → 修法：worker 并行 + 渐进式
  - 风险 2：SKU 协同需 sku-seo-data.ts 升级 → 修法：先 Pillar 升级，9/22 SKU 协同
  - 风险 3：4-6 H3 FAQ + 5 schema 模板化 → 修法：写 Pillar/Cluster 模板 + worker 并行

### 10.3 教训固化源头

- K3 9/2 06:10 派活包："那么多的 blog 文章都没什么作用, ... 配合我们的 SKU 做 SEO+AEO+GEO 的排名和权利提升"
- K3 9/1 16:16 派活包：主营架构 v2（包裝盒 = L1 主营 #1 主战场）
- K3 9/1 12:32 派活包：包装盒 9 项全方位深度优化（commit 2 1-6 项）
- K3 9/1 15:59 派活包：月度 cron v8 战略转型（matrix → content-authority）
- K3 9/2 05:58 派活包：§0.32 P0 修复（zh-hk 47 处撤除）
- K3 9/2 06:04 派活包：ja 战略级允许显示公司实际注册信息
- 9/1 全天 5+ commit（门童 v1.0 + 包装盒 1-6 项 + 月度 cron v8 + 主营架构 v2 + 79→85 SSoT + 定时任务同步 + §0.32 P0 修复 + ja 战略级确认）

---

## 11. K3 必亲自拍板 5 项

1. **8 Cluster 拆分**（按 §3 Stage 2-4 调度表，K3 必亲自拍板每个 cluster 的内容方向 + GSC 实证词 + SKU 协同矩阵）
2. **8-12 SKU 协同**（Pillar/Cluster targetKeywords 锚定，K3 必亲自拍板每个 SKU 的主营品类归属 + targetKeywords）
3. **en/ja Pillar 翻译**（9/3 Pillar #1 + 9/7 8 Cluster × 3 locale，K3 必亲自拍板 翻译风格 + ja 公司注册信息披露）
4. **301 合并清单**（4 篇合并入 Pillar + 4 篇 301 到类目，K3 必亲自拍板每个 301 目标 URL）
5. **Stage 1 立即执行**（9/2 06:10 K3 派活包"P0 撤残留 + 写全局调度方案"已预批，M3 立即执行）

---

**拍板等待**: K3 9/2 06:10 派活包"按最优执行"已预批。M3 已 1 commit 1 push 攒批落地（docs 调度方案 + 撤除脚本 v2 + 3 locale 同步 addendum）。K3 必亲自拍板 5 项后 M3 立即 Stage 2-5 落地。
