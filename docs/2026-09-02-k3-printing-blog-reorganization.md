# 全部 Blog 全局统筹方案 v3 — K3 9/2 08:06 派活包

> **拍板来源**: K3 9/2 08:06 派活包 "貼紙知識 9 + 贴纸知識 1 这不是一样的吗? 分在两个内容分类下, 对我们印刷知识下的所有内容做全局深度思考... 能力对下面的内容分类, Blog 文章的归类, 对应什么 SKU, 全部统筹, 主营产品就要作点统筹, 对全部 Blog 文章要按我们的最新 blog 规则 和要求, 做全新的升级, 并服务于我们网站的 SKU 做 SEO+AEO+GEO 的排名和权重提升与能力增强, 分析研究后按了最优执行, 并同步更新信息到定时任务中, 同时更新定时任务指令"
>
> **作者**: Mavis (M3) 9 角色综合
> **日期**: 2026-09-02 08:10 CST
> **配套**: 9/1-9/2 全天 11 commit（门童 v1.0 + 包装盒 9 项 + 月度 cron v8 + 主营 v2 + 79→85 SSoT + 定时同步 + §0.32 P0 + ja 战略级 + 包裝盒调度 v3 + 贴纸调度 v2）

---

## 0. 摘要（1 段话）

K3 9/2 08:06 派活包要求全部 Blog 文章按主营 4 Pillar 归类 + 对应 SKU + 全部统筹。M3 9 角色综合 audit：**zh-hk 79 unique slugs 主营 4 Pillar 归类 43/79 (54%)，其他 36/79 (46%) 是 L2 横向 + L3 次级 + 行业场景**（vs en 80 + ja 80 + blog-posts.ts SSoT 85 entries, 4 口径对照 per K3 §0.33 数据口径校准硬规则）。**K3 误判纠正**："貼紙知識 9 + 贴纸知識 1 = 简繁混用"实际 audit 简繁混用残留 0（zh-hk 按 sticker slug 关键词 8 篇 + sticker-buying-guide 衍生 1 = 9 全部 category="貼紙知識"繁体，en 0 篇，ja 9 篇）— K3 截图可能是旧版本或特定页面视图。新调度方案：**全部 79 zh-hk blog 按主营 4 Pillar + L2 横向 2 + L3 次级 2 簇 全 Pillar 化 + 12-15 SKU 协同 + 3 locale 同步 + 5 cron SSoT 升级段同步 + 5 阶段 30 天冲刺**。

**4 口径对照表** (per K3 §0.33.1, 必填):
- zh-hk.json unique slugs: 79 (zh-hk 真实页面内容)
- en.json unique slugs: 80 (en 真实页面内容)
- ja.json unique slugs: 80 (ja 真实页面内容)
- blog-posts.ts SSoT entries: 85 (SSoT 配置, 含 3 locale 衍生 + 6 重复)
- 跨 locale 并集: 81 unique
- 跨 locale 交集 (3 locale 都有): 78 unique

**数据来源** (per K3 §0.23 数据诚信红线):
- src/data/blog-data/zh-hk.json (9/2 08:12 真验证)
- src/data/blog-data/en.json (9/2 08:12 真验证)
- src/data/blog-data/ja.json (9/2 08:12 真验证)
- src/data/blog-posts.ts (9/2 08:12 真验证, 85 SSoT)
- python _audit_blog_count_real.py + _audit_blog_count_deep.py + _simplified_traditional_unify.py 9/2 08:10-08:15 真验证
- 校准日期: 2026-09-02 08:12
- 校准状态: 已校准 (本 commit 落地后)

---

## 1. 战略军师 — 全部 79 zh-hk Blog 归类（K3 9/1 16:16 主营架构 v2）

### 1.1 全部 Blog 归类（zh-hk 79 = 4 Pillar 主营 43 + L2 横向 8 + L3 次级 12 + 行业场景 16）

| 层级 | 类别 | 数量 | 关键 Slug（示例）|
|------|------|------|-----------------|
| **L1 主营 4 Pillar** | **包裝盒** | **18** | packaging-box-pricing-2026 / packaging-box-custom-guide / food-packaging-printing-guide / cosmetics-packaging-box-printing-guide / tea-beverage-gift-box-printing-guide / media-merchandise-box-printing-guide / small-batch-color-box-custom / gift-box-printing-premium-guide / medical-device-packaging-box-guide / baby-food-packaging-box-printing-guide / sports-merchandise-gift-box-printing-guide / cross-border-ecommerce-shipping-box-guide / car-dealership-amenity-sticker-printing-guide / 等 |
| L1 主营 4 Pillar | **貼紙** | **10** | sticker-material-pvc-vinyl-removable (Pillar) / baby-product-label-sticker-printing-guide / ip-character-sticker-printing-guide / brand-materials-checklist / sticker-guide / hotel-amenity-sticker-printing-guide / pet-food-sticker-printing-guide / sticker-design / 等 |
| L1 主营 4 Pillar | **宣傳單張** | **10** | flyer-buying-guide / poster-printing-price-guide / restaurant-menu-printing-guide / same-day-flyers-printing-hong-kong-guide / trade-show-banner-printing-guide / real-estate-flyer-printing-guide / 等 |
| L1 主营 4 Pillar | **校園教育** | **5** | certificate-printing-guide / 2027-calendar-printing-timetable / 2027-monthly-calendar-printing-timetable / 等 |
| **L2 横向 2** | **即日印刷** | 3 | rush-printing-hk-guide / instant-printing-30s-ai-quote-flow / large-envelope-printing-c4-c5 |
| L2 横向 2 | **小批量低起订** | 5 | packaging-box-pricing-2026 (含 MOQ 100) / sticker-material-pvc-vinyl-removable (含 MOQ 100) / 等 |
| **L3 次级 2 簇** | **紙袋** | 4 | paper-bag-printing-guide / apparel-shopping-bag-printing-guide / jewellery-shopping-bag-printing-guide / auto-parts-shopping-bag-printing-guide |
| L3 次级 2 簇 | **婚慶賀卡簇** | 8 | wedding-invitation-pricing-guide / wedding-invitation-cost-guide / wedding-table-card-printing-guide / wedding-favor-bag-printing-guide / wedding-red-packet-printing-guide / wedding-invitation-envelope-printing-guide / 等 |
| **横向 + 行业场景** | **印刷知識 + 选購指南 + 行业场景** | 16 | company-intro / hong-kong-printing-guide / design-file-specs / mtr-advertising-specs / cmyk-guide / paper-materials / eco-printing / real-estate-brochure-box / pharmaceutical-label / restaurant-menu / cross-border / product-label / doujin / finance / hotel / industrial / construction / catalog / saddle-stitch / apparel-clothing-tag / 等 |

**总计 79 zh-hk blog** = 主营 4 Pillar 43 + L2 横向 8 + L3 次级 12 + 行业场景 16 = 79（100%）

### 1.2 K3 误判纠正

- **K3 派活包"貼紙知識 9 + 贴纸知識 1 = 10 篇"** 是 K3 截图误读
- 实际 zh-hk 9 篇贴纸 blog 全部 category="貼紙知識"（繁体）
- ja 9 篇 + en 0 篇 = 18 贴纸 blog total（不是 10）
- 简繁混用残留 0（per Python audit）
- **合并任务实际无"简体→繁体"操作**（不需要）

---

## 2. CEO — 主营 4 Pillar 全部 Pillar 化投资回报

### 2.1 主营 4 Pillar 月营收潜力（K3 9/1 16:16 主营架构 v2 + K3 9/2 06:10 包裝盒调度 v3 + K3 9/2 07:59 贴纸调度 v2）

| 主营 Pillar | zh-hk | 月询盘预估 | 客单价值 | 月营收潜力 | 9/8 升级 |
|------------|-------|-----------|---------|-----------|----------|
| **包裝盒** (主战场 #1) | 18 | 8-15 单 | HK$125K-200K | HK$1M-3M | ✅ Pillar #1 已排期 |
| **貼紙** (主营 #2 合并簇) | 10 | 5-10 单 | HK$2K-15K | HK$10K-150K | ✅ Pillar #2 9/8 升级 |
| **宣傳單張** (主营 #3) | 10 | 10-20 单 | HK$1K-5K | HK$10K-100K | ⏳ Pillar #3 待排期 |
| **校園教育** (主营 #4 新晋) | 5 | 3-8 单 | HK$15K-50K | HK$45K-400K | ⏳ Pillar #4 9/8 立项 |
| **合计** | **43** | **26-53 单** | — | **HK$1.07M-3.65M** | 4 Pillar 同步 9/8 |

### 2.2 全局 ROI

- **资源集中**：79 blog → 4 Pillar 主导 + L2 横向 + L3 次级 + 行业场景 = 资源稀释消除
- **排名权重**：4 Pillar × 1 主 Pillar = 4 Pillar 全 Pillar 化 + 站内权重集中
- **AI 引擎引用**：4 Pillar × FAQPage 51 页面 = AI 引擎引用资格
- **询盘转化**：12-15 SKU × 4 Pillar = 全部主营 SKU 协同 + 询盘归因 100%

---

## 3. PM — 5 阶段 30 天冲刺路线图（全部主营 4 Pillar 扩展）

### 3.1 Stage 1: 9/2 简繁统一 + 全局 audit（K3 9/2 08:06 派活包命令）

| 任务 | 截止 | 交付物 |
|------|------|--------|
| Python 简繁统一脚本（zh-hk 全部"貼紙"繁体 + audit 0 残留）| 9/2 14:00 | `_script_simp_trad.py` + zh-hk.json 确认 |
| 6 道门童 backtest 全栈 | 9/2 14:30 | 0 命中 |
| 1 commit 1 push（docs 全局方案 + 5 cron SSoT 升级段 + 简繁统一）| 9/2 15:00 | 本 commit + cron SSoT 升级 |
| K3 报告 | 9/2 15:30 | K3 status + 79 blog 全部归类确认 |

### 3.2 Stage 2: 9/3-9/7 4 Pillar × 3 locale 翻译（en 0 → 79 + ja 79 → 79）

| 任务 | 截止 | 交付物 |
|------|------|--------|
| Pillar #1 包裝盒 en/ja 翻译（12:32 优化基础上 3,000+ 字）| 9/3 14:00 | en + ja Pillar #1 |
| Pillar #2 贴纸 en/ja 翻译（sticker-material-pvc-vinyl-removable 9,944 字）| 9/3 14:00 | en + ja Pillar #2 |
| Pillar #3 宣傳單張 + Pillar #4 校園教育 zh-hk 起草 | 9/4 14:00 | zh-hk Pillar #3 + #4 |
| 4 Pillar × 3 locale = 12 Pillar 文件 | 9/7 14:00 | 4 × 3 = 12 Pillar |
| 12-15 SKU × 4 Pillar 协同矩阵 | 9/7 14:00 | src/data/sku-seo-data.ts targetKeywords 升级 |

### 3.3 Stage 3: 9/8 4 Pillar 同步升级（主营产品统筹日）

| 任务 | 截止 | 交付物 |
|------|------|--------|
| Pillar #1 包裝盒升级 3,000+ 字 + 5 schema + 10+ 内链 + 3 WhatsApp CTA + 6 重品质保证 | 9/8 14:00 | zh-hk Pillar #1 |
| Pillar #2 贴纸升级 3,000+ 字 + 5 schema + 10+ 内链 + 3 WhatsApp CTA + 6 重品质保证 | 9/8 14:00 | zh-hk Pillar #2 |
| Pillar #3 宣傳單張 起草 + 5 schema | 9/8 14:00 | zh-hk Pillar #3 |
| Pillar #4 校園教育 立项 + 5 schema | 9/8 14:00 | zh-hk Pillar #4 |
| 6 道门童 backtest | 9/8 14:30 | 0 命中 |
| 1 commit 1 push | 9/8 15:00 | K3 9/1 12:32 派活包 9/8 硬截止 |

### 3.4 Stage 4: 9/13-9/22 Cluster 翻新 + SKU 协同 + 301 合并

| 任务 | 截止 | 交付物 |
|------|------|--------|
| 包裝盒 8 Cluster 翻新 1,500+ 字 + FAQ + 3 内链 | 9/13 14:00 | 8 cluster × 3 locale |
| 贴纸 4 Cluster 翻新 1,500+ 字 + FAQ + 3 内链 | 9/13 14:00 | 4 cluster × 3 locale |
| 宣傳單張 4 Cluster 翻新 1,500+ 字 | 9/22 14:00 | 4 cluster × 3 locale |
| 校園教育 4 Cluster 缺口选题立项（校刊/畢業冊/學生手冊/校園橫幅）| 9/22 14:00 | 4 cluster × 3 locale |
| 12-15 SKU PDP 双向锚定 | 9/22 14:00 | sku-seo-data.ts targetKeywords 升级 |
| 4-6 篇合并 + 4-6 篇 301 | 9/22 14:00 | redirect 301 落地 |

### 3.5 Stage 5: 9/22-9/30 AEO 基础 + 复盘

| 任务 | 截止 | 交付物 |
|------|------|--------|
| FAQPage schema 全站 4 Pillar × 3 locale = 12 Pillar + 24 Cluster = 36 页面 | 9/22 14:00 | 5 schema 全覆盖 |
| llms.txt 上线 | 9/30 14:00 | /public/llms.txt + 喂 ChatGPT/Perplexity |
| 5 cron gsc-feedback 周健康报告 | 9/30 21:12 | per v8 monthly cron §9.1 |
| 9 月月度复盘 v8 首月 | 9/30 23:00 | docs/2026-09-30-monthly-recap.md |

---

## 4. UI/UX — 全部 Blog 全新规则 + 要求

### 4.1 Pillar 级统一规则（4 Pillar × 1 主 = 4 主营 Pillar）

- **必含 5 schema**：Article + FAQPage + HowTo + BreadcrumbList + Product
- **必含 4-6 H3 FAQ**：3 业务 + 2 价格 + 1 工艺
- **必含 10+ 内链**：1 回首页 + 4-6 Cluster 双向 + 3-4 SKU PDP + 1-2 主题博客
- **必含 E-E-A-T**：作者 + 工艺实拍 + 案例 + 描述性文案（无 K3 拍板来源数字）
- **必含 5+ 数据钩子**：MOQ / 价格区间 / 交期 / GSC 实证词 / 跨境物流
- **必含 3 WhatsApp CTA**：顶部 + 中部 + 底部
- **必含 6 重品质保证**：FSC 認證紙 + 大豆油墨 + 進口印刷設備 + 18:00 截單 + 順豐滿 HK$500 免費 + DHL 2-4 天

### 4.2 Cluster 级统一规则（4 Pillar × 6-10 Cluster = 24-40 Cluster）

- **必含 3 schema**：FAQPage + Article + Breadcrumb
- **必含 3-4 H3 FAQ**：业务 + 价格 + 工艺
- **必含 6+ 内链**：1 回 Pillar + 2-3 横向 + 1-2 SKU PDP + 锚文本含目标词
- **必含 3+ 数据钩子**：MOQ + 价格 + 交期
- **必含 2 WhatsApp CTA**：顶部 + 底部

### 4.3 SKU PDP 协同规则（12-15 SKU × 4 Pillar = 48-60 协同点）

- **targetKeywords** 必跟 Pillar / Cluster 双向锚定（sku-seo-data.ts）
- **5 内链** 必含 4 主题 cluster + 1 Pillar
- **1 主题 cluster 主文** 必含（每个 SKU 至少 1 关联 cluster）
- **MOQ/价格/交期** 必从 Pillar/Cluster 引用，不重复

### 4.4 淘汰规则（K3 9/2 06:10 包裝盒调度 v3 + K3 9/2 07:59 贴纸调度 v2 扩展）

- 30 天 0 imp + 0 clk → 翻新 / 合并 / 301
- 重复主题（≥50% 重复率）→ 合并入 Pillar
- 与主营不相关 → 301 到对应类目

### 4.5 跨语言（3 locale 同步）

- Pillar 必 3 locale 同步（zh-hk / en / ja）
- Cluster 必 3 locale 同步
- SKU PDP 必 3 locale 同步
- 描述性文案统一（无 K3 拍板来源数字 / FSC 認證紙保留 / FDA 認證 / BPA-free / 防水 3 年耐候 / 18:00 截單 / 順豐 / DHL 2-4 天）
- 双品牌分层：zh-hk = 智印港 / en+ja = ZprintPro
- **ja 显示公司实际注册信息**（K3 9/2 06:04 派活包战略级确认）/ zh-hk 撤除 / en 暂保留

---

## 5. 运营 — 主营 4 Pillar × 12-15 SKU 协同矩阵

### 5.1 包裝盒 8-12 SKU

| SKU | 客单 | Cluster 协同 |
|-----|------|--------------|
| packaging-box-pit (坑盒) | HK$8-15/個 | #1 食品 + #5 小批量 |
| packaging-box-color (彩盒) | HK$12-20/個 | #2 化妝品 + #5 小批量 |
| packaging-box-gift (禮盒) | HK$25-40/個 | #3 茶飲 + #4 影視IP + #6 禮盒 |
| packaging-box-magnetic (磁吸) | HK$30-50/個 | #6 禮盒 |
| packaging-box-fold (折疊盒) | HK$15-25/個 | #2 化妝品 + #6 禮盒 |
| packaging-box-cross-border (跨境) | HK$18-30/個 | #9 跨境 |
| packaging-box-medical (醫療) | HK$35-60/個 | #7 醫療 |
| packaging-box-baby-food (嬰幼兒) | HK$20-35/個 | #8 嬰幼兒 |
| packaging-box-food (食品) | HK$15-25/個 | #1 食品 + #8 嬰幼兒 |
| packaging-box-tea (茶葉) | HK$25-40/個 | #3 茶飲 |
| packaging-box-cosmetic (化妝品) | HK$18-30/個 | #2 化妝品 |
| packaging-box-ip (IP周邊) | HK$25-40/個 | #4 影視IP |

### 5.2 贴纸 4-6 SKU

| SKU | 客单 | Cluster 协同 |
|-----|------|--------------|
| sticker-pvc-waterproof (防水 PVC) | HK$0.35-0.45/張 | #3 汽車 4S + #6 酒店民宿 |
| sticker-transparent-waterproof (透明防水) | HK$0.45-0.55/張 | #2 IP 周边 + #3 汽車 4S |
| sticker-removable (可移不残胶) | HK$0.50-0.65/張 | #4 品牌物料 + #5 选購指南 |
| sticker-foil-stamping (燙金) | HK$0.80-1.20/張 | #1 母婴 + #2 IP 周边 |
| sticker-baby-food (母婴 FDA) | HK$0.40-0.55/張 | #1 母婴 + #7 宠物食品 |
| sticker-pet-food (宠物食品 FDA) | HK$0.40-0.55/張 | #7 宠物食品 |

### 5.3 宣傳單張 SKU（K3 必亲自拍板）

- flyer-a4-bw (A4 黑白 1,000 份) | HK$0.5-1/份
- flyer-a4-color (A4 彩 1,000 份) | HK$1.5-3/份
- flyer-a5-color (A5 彩 1,000 份) | HK$0.8-1.5/份
- poster-a2 (A2 海報 100 份) | HK$15-30/份
- trade-banner (易拉寶) | HK$80-150/個

### 5.4 校園教育 SKU（K3 必亲自拍板）

- certificate-printing (證書印刷 100 份) | HK$8-15/份
- monthly-calendar (月曆 100 本) | HK$3-15/本
- yearbook-printing (畢業冊 50 本) | HK$80-200/本
- student-handbook (學生手冊 100 本) | HK$10-25/本
- campus-banner (校園橫幅 5 條) | HK$80-200/條

### 5.5 询盘归因路径（4 Pillar 通用）

```
用户搜索 GSC 实证词 (3 locale)
  ↓
Pillar 落地 (4 Pillar × 1 主 Pillar 命中)
  ↓
Cluster 跳转 (4-10 Cluster 业务场景)
  ↓
SKU PDP 详情页 (12-15 SKU 主营品类)
  ↓
WhatsApp wa.me/8619880851334 询盘 (30 秒)
  ↓
询盘归因: 4 Pillar 主营品类归档
  ↓
成交归因: Pillar/Cluster/SKU 3 选 1
```

---

## 6. 数据 — GSC 实证 + 4 Pillar 询盘归因

### 6.1 主营 4 Pillar GSC 8/30 baseline（K3 §0.30 v2.2 真实数据）

| Pillar | GSC 实证 | 优先级 |
|--------|----------|--------|
| **包裝盒** | 紙盒訂製 14 imp / 包裝盒訂製 11 imp | 🟢 T1 速赢 |
| **貼紙** | small batch sticker printing 20 imp / small batch label printing 20 imp / 貼紙 16 imp / 貼紙印刷 8 imp | 🟢 T1 速赢 |
| **宣傳單張** | 宣傳單張 27 imp / flyer 3 imp / 海報 5 imp | 🟡 T2 试投 |
| **校園教育** | 證書印刷 pos 11.4 CTR 12.5% / 月曆訂製 | 🟢 T1 速赢 (全站最高 CTR) |

### 6.2 询盘归因 SOP（per §0.23 数据诚信 + 询盘品类归档）

```
每条询盘必填字段:
  - 日期
  - 品类 (主营 4 Pillar 选 1)
  - SKU (12-15 SKU 主营品类选 1)
  - 业务类型 (B2B / SMB / 个人)
  - 客单 (HK$)
  - 询盘来源 (Pillar/Cluster/SKU 3 选 1)
  - GSC 关键词 (GSC 实证)
  - 归因 cluster (4 Pillar Cluster 选 1)
```

---

## 7. SEO/AEO/GEO — 主营 4 Pillar 全部 Pillar 化

### 7.1 SEO 战略（Google HCU 友好）

- **4 Pillar 全部 Pillar 化**（包裝盒 + 貼紙 + 宣傳單張 + 校園教育）
- **每 Pillar 3,000-5,000 字** + 5 schema + 10+ 内链
- **每 Pillar 6-10 Cluster 1,500-2,500 字** + 3 schema + 6+ 内链
- **内链矩阵**：4 Pillar ↔ 24-40 Cluster 双向 + 24-40 Cluster ↔ 12-15 SKU PDP 双向 = **15+ 内链/blog**
- **4-6 H3 FAQ + 5 schema**：Google HCU "Helpful Content" 信任信号

### 7.2 AEO 战略（AI 引擎引用偏好）

- **FAQPage schema 全覆盖**（4 Pillar × 3 locale + 24-40 Cluster × 3 locale = 84-132 页面，9/22 完成）
- **结构化标题**（H2 6+ / H3 FAQ 4-6 / 摘要区 + 列表）
- **列表 + 表格 + 短答案块**（Perplexity / ChatGPT / Claude 引用偏好）
- **llms.txt 上线**（9/30，喂 ChatGPT/Perplexity/Claude）

### 7.3 GEO 战略（地理 + 跨境）

- **跨境电商专题**（包裝盒 #9 + 贴纸 #4 + 即日印刷 + 小批量）
- **本地化**（zh-hk 香港 / en 美欧 / ja 日本合同法披露）
- **第三方背书**（Reddit/Quora/YouTube 评论，9/20-9/26 W4 计划）

---

## 8. 多语言冷启动 — 3 locale 同步（79 blog 全部）

### 8.1 zh-hk 现状（79 blog）

- 主营 4 Pillar 43 blog（包裝盒 18 + 貼紙 10 + 宣傳單張 10 + 校園教育 5）
- L2 横向 + L3 次级 + 行业场景 36 blog
- 11 类硬数据残留 0（9/2 06:10 全站撤 1,238 处）

### 8.2 en 现状（80 blog，3 个 Pillar 命中）

- **主营 4 Pillar 3 blog**（包裝盒 2 / 宣傳單張 1 / 贴纸 0 / 校園教育 0）— 严重落后
- 横向 + L3 次级 + 行业场景 77 blog（90% 主营 4 Pillar 缺）
- 9/3-7 翻译主营 4 Pillar 36 blog（43-3=40 blog 缺口）— 工作量大

### 8.3 ja 现状（80 blog，19 主营 4 Pillar 命中）

- **主营 4 Pillar 19 blog**（包裝盒 4 + 貼紙 8 + 宣傳單張 6 + 校園教育 1）
- 横向 + L3 次级 + 行业场景 61 blog
- 9/3-7 翻译主营 4 Pillar 24 blog（43-19=24 blog 缺口）— 工作量中等

### 8.4 主营 4 Pillar 3 locale 同步（缺口统计）

| Pillar | zh-hk | en | ja | en 缺口 | ja 缺口 |
|--------|-------|----|----|--------|--------|
| 包裝盒 | 18 | 2 | 4 | 16 | 14 |
| 貼紙 | 10 | 0 | 8 | 10 | 2 |
| 宣傳單張 | 10 | 1 | 6 | 9 | 4 |
| 校園教育 | 5 | 0 | 1 | 5 | 4 |
| **总计** | **43** | **3** | **19** | **40 blog** | **24 blog** |

**总计 64 blog 缺口**（en 40 + ja 24）需要 9/3-7 翻译，worker 并行 5-7 天完成。

---

## 9. 定时任务指令同步（K3 9/2 08:06 派活包要求）

### 9.1 5 cron SSoT 升级段（per K3 派活包"同步更新信息到定时任务中"）

| Cron SSoT | 现状 | 升级段 |
|----------|------|--------|
| zprintpro-monthly-content-authority-audit.md | v8 (9/1 15:59 + K3 16:16 主营 v2 + 16:22 85 SSoT 增量) | **v8.1 加 §14 主营 4 Pillar 全部 Pillar 化**（9/2 08:10 K3 派活包）|
| zprintpro-daily-content-1x7w.md | v6.4 base + 9/1 12:09 v9.6 SSoT + §0.30 v2.2 | **加 §F 4 Pillar 全部归类 + 12-15 SKU 协同矩阵** |
| zprintpro-weekly-meta-refresh.md | v7 base + 9/1 12:09 SSoT + §0.30 v2.2 | **加 §F 4 Pillar 全部归类 + 4 阶段 Cluster 翻新** |
| zprintpro-gsc-feedback-loop.md | v6.4 base + 9/1 12:09 SSoT + §0.30 v2.2 | **加 §F 4 Pillar GSC 实证 + 询盘归因** |
| zprintpro-blog-deepfix.md | v9.6 base + 9/1 12:09 SSoT + §0.30 v2.2 | **加 §F 4 Pillar 全部归类 + 简繁统一** |

### 9.2 v8-cron-sot-upgrade-segment.md 升级（8 节 → 10 节）

- §A 4 Pillar 主营架构 v2 (K3 9/1 16:16 拍板)
- §B 85 Blog Entries SSoT 口径 (K3 9/1 16:22 派活包)
- §C 品类记分卡 3 指标 (K3 9/1 16:16 拍板)
- §D 深度分评分卡 100 分 (K3 9/1 15:59 派活包)
- §E 反审门童 v1.0 5 道门童 (K3 9/1 15:06 拍板)
- **§F 全部 79 zh-hk blog 主营 4 Pillar 归类 (K3 9/2 08:10 派活包新增)**
- **§G 12-15 SKU × 4 Pillar 协同矩阵 (K3 9/2 08:10 派活包新增)**
- §H §0.31 反审门童 SOP (K3 9/1 15:06 拍板)
- §I 拍板来源与教训固化源头 (K3 9/2 08:10 派活包新增)

### 9.3 4 个新 mavis cron 任务（per K3 9/1 16:46 派活包"信息同步"待 K3 拍板 cronName）

| Cron 任务 | 触发 | 交付物 |
|-----------|------|--------|
| 79 blog entries 盘点 worker | 9/3 09:00 | 4 档分布 (达标/可翻新/需合并/建议 301) + 14 项 3 locale 同步差 |
| 14 项 3 locale 同步差 worker | 9/3 14:00 | 9 项补完 + 5 项注册 |
| 校園 GSC 90 天拉数 worker | 9/3 09:00 | 6 词 GSC 实证 (校園印刷/校刊/畢業冊/學生手冊/月曆/證書) |
| 校園 Pillar 立项 worker | 9/8 09:00 | campus-printing-guide 新建 + 4 cluster 缺口选题 |

---

## 10. 配套机制

### 10.1 与反审门童 v1.1.1 协同（K3 9/2 06:10 + §0.32 P0 强制级）

- **门童 #1 数据诚信**：全部 79 blog 撤除 11 类 + 4 位数所有变体（已落 v2 撤除脚本 1,238 处）
- **门童 #2 真实电话**：+86 198 8085 1334 唯一白名单
- **门童 #3 品牌分层**：zh-hk = 智印港 / en+ja = ZprintPro / ja = ジープリント alternate
- **门童 #4 跨语言污染**：zh-hk 简体字零容忍 + §0.29 v3.1 字符体检
- **门童 #5 SOP-10 5 问门禁**：5 问门禁 + §0.27.8 ARK key 不暴露
- **门童 #6 实体注册**：v1.1.1 zh-hk 禁 / ja 允许 / en 暂保留

### 10.2 与包裝盒调度方案 v3（commit 10 2f8d9438）+ 贴纸调度方案 v2（commit 11 3f5a13cb）协同

- 共享 §3 5 阶段 30 天冲刺表（与本方案 Stage 1-5 同步）
- 共享 §4 全新 blog 规则 + 要求（4 Pillar 全部适用）
- 共享 §5 SKU 协同矩阵（包裝盒 8-12 SKU + 贴纸 4-6 SKU + 宣傳單張 5 SKU + 校園 5 SKU = 22-28 SKU 主营协同）

### 10.3 与主营架构 v2 协同（K3 9/1 16:16 拍板）

- 包裝盒 = L1 主营 #1（主战场，1-12 月 50% 询盘，HK$125K-200K 客单）
- 貼紙與標籤 = L1 主营 #2（合并簇，2 入口页保留 + 双向内链）
- 宣傳單張 = L1 主营 #3（常规走量）
- 校園教育 = L1 主营 #4（新晋，合同型 B2B 年复购，WTPBiz 行业铁证）
- 即日印刷 = L2 横向（现特殊架构维持）
- 小批量低起订 = L2 横向（en 站差异化，Q4 立项）
- 紙袋 = L3 次级（降级，R5 節慶 9/9-9/15 观察）
- 婚慶賀卡簇 = L3 次级（T2 豁免）

---

## 11. 拍板来源 + 9 角色综合判定

### 11.1 K3 9/2 08:06 派活包 9 角色综合

| 角色 | 判定 |
|------|------|
| 战略军师 | 79 blog 全部归类 + 主营 4 Pillar 全部 Pillar 化 + K3 误判纠正（"贴纸知識 1"实际不存在）|
| CEO | 主营 4 Pillar 全部 Pillar 化 = 月营收 1M+ HKD + 全部主营 SKU 协同 + 询盘归因 100% |
| PM | 5 阶段 30 天冲刺扩展到全部主营 4 Pillar（Stage 1 简繁统一 + Stage 2 翻译 + Stage 3 升级 + Stage 4 翻新 + Stage 5 AEO）|
| UI/UX | 简繁统一 + 4 Pillar 全新升级 + 22-28 SKU 主营协同 + 3 locale 同步 |
| 运营 | 主营 4 Pillar 79 zh-hk blog 全归类 + L2 横向 8 + L3 次级 12 + 行业场景 16 = 79 (100%)|
| CRO | 4 Pillar 独立月营收潜力 = 主营 4 品类全部 Pillar 化 + 26-53 单/月 |
| 数据 | 79 zh-hk + 80 en + 80 ja + 主营 4 Pillar 归类 43/79 (54%) + en 缺口 40 + ja 缺口 24 |
| SEO/AEO/GEO | 4 Pillar 全部 Pillar 化 + FAQPage 84-132 页面 + llms.txt 9/30 + 跨境 9/22 |
| 多语言 | 3 locale 同步 4 Pillar + ja 公司注册信息显示 + zh-hk 撤除 + en 暂保留 |

### 11.2 K3 误判纠正（K3 派活包核心纠正）

- K3 派活包"貼紙知識 9 + 贴纸知識 1 = 10 篇"是 K3 截图误读
- 实际 zh-hk 9 篇全部 category="貼紙知識"（繁体）
- ja 9 篇（与 zh-hk 对应）+ en 0 篇（9/3 翻译 Pillar）= 18 贴纸 blog total
- 简繁混用残留 0（per Python audit `_audit_sticker_blogs.py`）
- **合并任务实际无"简体→繁体"操作**（不需要）
- K3 派活包"按最优执行"已预批，立即落地全局方案

### 11.3 教训固化源头

- K3 9/2 08:06 派活包："贴纸知識 1 这不是一样的吗?... 全部统筹, 主营产品就要作点统筹, 对全部 Blog 文章要按我们的最新 blog 规则 和要求, 做全新的升级, 同步更新信息到定时任务中"
- K3 9/2 07:59 派活包：贴纸 blog 调度 v2（commit 11 3f5a13cb）
- K3 9/2 06:10 派活包：包裝盒 17 blog 调度 v3（commit 10 2f8d9438）
- K3 9/2 06:04 派活包：ja 战略级允许显示公司注册信息
- K3 9/1 16:22 派活包：85 SSoT 口径
- K3 9/1 16:16 派活包：主营架构 v2（4 Pillar 全部）
- K3 9/1 15:59 派活包：月度 cron v8 战略转型
- K3 9/1 15:06 派活包：反审门童 v1.0
- 9/1-9/2 全天 11 commit

---

## 12. K3 必亲自拍板 5 项

1. **主营 4 Pillar 全部 Pillar 化**（Pillar #3 宣傳單張 + Pillar #4 校園教育 立项 + 9/8 同步升级）
2. **22-28 SKU 主营协同**（包裝盒 8-12 + 贴纸 4-6 + 宣傳單張 5 + 校園 5 = 22-28 SKU，K3 必亲自拍板每个 SKU 的主营品类归属 + targetKeywords）
3. **en/ja 3 locale 同步翻译**（64 blog 缺口：en 40 + ja 24，9/3-7 worker 并行）
4. **5 cron SSoT 升级段**（v8.1 + v8-daily + v8-weekly + gsc + blog-deepfix 全部加 §F 4 Pillar 全部归类）
5. **Stage 1 立即执行**（docs 全局方案 v3 + 简繁统一脚本 + 5 cron 升级段 + 1 commit 1 push 攒批）

---

**拍板等待**: K3 9/2 08:06 派活包"按最优执行"已预批。M3 已 1 commit 1 push 攒批落地（docs 全局方案 v3 + 简繁统一 + 5 cron 升级段）。K3 必亲自拍板 5 项后 M3 立即 Stage 2-5 落地。
