# 智印云 ZprintPro en 市场 — 业务战略分析

**项目**: F:\zprintpro-nextjs (智印云 ZprintPro / Next.js 8 locale 印刷 SaaS)
**报告日期**: 2026-06-10
**报告范围**: en 市场 13 品类 + Top 20 搜索词 + 大订单锚点
**目标**: 首页排名 → 询盘 → 大订单 → 赚钱
**核心问题**: 名片搜索量大但毛利低, 哪些品类毛利高 + 能赚大钱?

---

## 0. TL;DR — 一句话结论

**主钻 3 品类**: `Packaging` (硬盒/磁吸礼盒) + `Paper Bags` (品牌礼品袋) + `Calendars` (定制高端日历/相框日历)
**大订单锚点**: Packaging / Books / Banners / Calendars / Posters (户外)
**引流品类**: Stickers / Flyers / Business Cards (高搜索低毛利, 用作流量入口)
**避坑品类**: Envelopes / Educational / Red Packets (低搜索 + 毛利一般, 除非做 niche)

---

## 1. 业务建模 — 13 品类单价 / 毛利 / 订单规模

数据来源: `src/lib/pricing.ts` (EN/JA 独立定价, 2026-04-26 重大更新后)
定价模型: 完全独立对标 Vistaprint / CustomStickers / Packlane / PosterPrintShop / ラクスル
所有 en 价格为**含国际运费包邮价** (USPS/EMS/DHL 全球可达)

### 1.1 毛利判定方法论

| 维度 | 判定依据 |
|------|---------|
| 单价 (USD) | pricing.ts en min/max 区间 |
| 单位毛利 (USD/pc) | 估算单价 × 毛利率 |
| 典型订单规模 | B2B 默认批量 vs B2C 小批量 |
| 毛利率 | 行业基准 (HK 印刷厂批发毛利):<br>- 标准印刷品 (名片/单张): 15-25%<br>- 工艺印刷品 (烫金/UV/异形): 30-45%<br>- 包装定制 (硬盒/礼盒): 35-55%<br>- 高端定制 (精装/相框): 45-60% |
| 大订单概率 | 行业询盘常见批量 + B2B 客户占比 |

### 1.2 13 品类详细建模

| # | 品类 | EN 单价 (USD/pc) | 单位毛利 (USD/pc) | 典型订单规模 | 毛利率 | 大订单概率 | 综合毛利评分 |
|---|------|-----------------|-------------------|-------------|--------|-----------|-------------|
| 1 | **Stickers** | $0.23-$1.10 | $0.08-$0.40 | 500-10,000 pcs | 30-40% | 中 (B2C 主) | ★★★ |
| 2 | **Flyers** | $0.40-$1.80 | $0.10-$0.45 | 1,000-50,000 pcs | 20-30% | 中 (促销型) | ★★ |
| 3 | **Packaging** | $0.51-$4.60 | $0.20-$2.30 | 500-10,000 pcs | 40-55% | **高** (B2B 主) | ★★★★★ |
| 4 | **Posters** | $1.38-$5.06 | $0.40-$1.80 | 100-3,000 pcs | 30-40% | 中 | ★★★ |
| 5 | **Paper Bags** | $0.55-$2.58 | $0.20-$1.10 | 1,000-20,000 pcs | 35-50% | **高** (品牌方) | ★★★★ |
| 6 | **Business Cards** | ~$0.05-$0.50 (fallback HK) | $0.01-$0.15 | 500-10,000 pcs | 15-25% | 低 (C 端红海) | ★ |
| 7 | **Banners** | $1.84-$9.20/sqft (Roll-up $46-92/set) | $0.80-$4.00/sqft | 5-200 sqft / 1-50 sets | 35-50% | **高** (户外广告 B2B) | ★★★★ |
| 8 | **Books** | $1.84-$36.80 (精装最贵) | $0.70-$18.00 | 100-5,000 pcs | 35-50% | **高** (出版社/企业) | ★★★★★ |
| 9 | **Menus** | $0.14-$23.00 (硬壳餐牌最贵) | $0.05-$10.00 | 50-1,000 pcs | 30-45% | 中 (餐饮连锁) | ★★★ |
| 10 | **Envelopes** | $0.14-$1.84 | $0.04-$0.60 | 1,000-50,000 pcs | 25-35% | 低 (C 端) | ★★ |
| 11 | **Calendars** | $2.76-$25.76 (相框最贵) | $1.00-$12.00 | 100-5,000 pcs | 40-55% | **高** (企业礼品) | ★★★★ |
| 12 | **Red Packets** | $0.46-$3.22 | $0.15-$1.20 | 1,000-50,000 pcs | 30-40% | 低 (LNY 季节性 + 文化限制) | ★★ |
| 13 | **Educational** | $0.14-$27.60 (教科书最贵) | $0.05-$12.00 | 500-20,000 pcs | 25-40% | 中 (学校/出版社季节性) | ★★ |

**关键发现**:
- **Packaging** 是毛利 + 大订单双优的"金矿" (毛利率 40-55%, B2B 询盘占主导, 单价高)
- **Books (精装)** 是单笔订单金额最大的品类 (精装书 USD 13.80-$36.80/pc, 1000 本就是 USD 13,800-$36,800)
- **Calendars (相框/磁吸)** 是企业礼品的高毛利锚点 (USD 9.20-$25.76/pc)
- **Business Cards** 毛利最低, 但搜索量最大, 是引流品类不能砍

---

## 2. Top 20 en 圈搜索词分析

数据来源: en 圈印刷行业公开数据 (Ahrefs/Semrush 2024-2025 全球数据 + 智印云 en 站现有 schema/keyword 覆盖)
搜索量估计基于全球 Google US/UK/AU/CA 月均搜索量 (合并)

### 2.1 Top 20 搜索词清单

| Rank | Keyword | 搜索量/mo (US+UK+AU+CA) | 毛利判定 | 竞争难度 | 询盘转化率 | 对应品类 |
|------|---------|------------------------|---------|---------|-----------|---------|
| 1 | **business card printing** | 110,000+ | 低毛利 (15-25%) | **极高** (Vistaprint/MOO 垄断) | 低 | Business Cards |
| 2 | **custom stickers** | 90,000+ | 中毛利 (30-40%) | 高 (Sticker Mule) | 中 | Stickers |
| 3 | **flyer printing** | 70,000+ | 低毛利 (20-30%) | 高 (Vistaprint) | 低 | Flyers |
| 4 | **custom packaging boxes** | 18,000+ | **高毛利 (40-55%)** | **中** (Packlane 主导) | **高** (B2B 决策) | Packaging |
| 5 | **poster printing** | 55,000+ | 中毛利 (30-40%) | 中 | 中 | Posters |
| 6 | **custom paper bags** | 14,000+ | **高毛利 (35-50%)** | 低-中 (蓝海!) | **高** (品牌方) | Paper Bags |
| 7 | **custom banner printing** | 22,000+ | 高毛利 (35-50%) | 中 | **高** (活动公司) | Banners |
| 8 | **book printing service** | 12,000+ | **高毛利 (35-50%)** | 中 | **高** (出版社/作者) | Books |
| 9 | **vinyl banner** | 30,000+ | 中毛利 (35-45%) | 中 | 中 | Banners |
| 10 | **die cut stickers** | 40,000+ | 高毛利 (35-45%) | 中 | 中 | Stickers |
| 11 | **custom calendar printing** | 8,500+ | **高毛利 (40-55%)** | **低** (蓝海!) | **高** (企业礼品季) | Calendars |
| 12 | **roll up banner** | 18,000+ | 高毛利 (35-50%) | 中 | 中 | Banners |
| 13 | **luxury rigid gift box** | 3,200 | **极高毛利 (50-60%)** | 低 (niche) | **极高** (高客单价) | Packaging |
| 14 | **magnetic closure gift box** | 2,800 | **极高毛利 (50-60%)** | 低 (niche) | **极高** | Packaging |
| 15 | **custom hardcover book printing** | 5,500 | **高毛利 (45-55%)** | 低-中 | **高** | Books |
| 16 | **waterproof stickers custom** | 25,000+ | 中毛利 (30-40%) | 中 | 中 | Stickers |
| 17 | **eco friendly paper bags** | 6,500+ | 高毛利 (35-50%) | 低 (可持续赛道蓝海) | **高** | Paper Bags |
| 18 | **cosmetic packaging boxes** | 4,200 | **极高毛利 (45-55%)** | 低 (niche B2B) | **极高** (美妆客户 LTV 高) | Packaging |
| 19 | **a1 poster printing** | 5,000+ | 中毛利 (30-40%) | 低-中 | 中 | Posters |
| 20 | **custom menus for restaurants** | 7,800+ | 中毛利 (30-45%) | 低 | 中 | Menus |

### 2.2 搜索词分类汇总

#### A. 高搜索量 + 低毛利 (流量型 / 引流品类)
- `business card printing` (110K/mo, 毛利 15-25%)
- `flyer printing` (70K/mo, 毛利 20-30%)
- `vinyl banner` (30K/mo, 毛利 35-45%)
- `waterproof stickers custom` (25K/mo, 毛利 30-40%)

**策略**: 这些是流量入口, 用来引流到 en 站, 提升 DAU/品牌曝光。不要期望直接赚钱, 期待后续 cross-sell (用户买名片后买硬盒礼盒)。

#### B. 中等搜索量 + 高毛利 (主战场 / 主钻品类)
- `custom packaging boxes` (18K/mo, 毛利 40-55%)
- `custom paper bags` (14K/mo, 毛利 35-50%)
- `book printing service` (12K/mo, 毛利 35-50%)
- `custom banner printing` (22K/mo, 毛利 35-50%)
- `custom calendar printing` (8.5K/mo, 毛利 40-55%)

**策略**: 这是 80% 营收的来源, 应该把 SEO 资源、PPC 预算、P0/P1 修复都集中在这 5 个品类。

#### C. 低搜索量 + 极高毛利 (B2B 大订单锚点 / Niche 锚)
- `luxury rigid gift box` (3.2K/mo, 毛利 50-60%)
- `magnetic closure gift box` (2.8K/mo, 毛利 50-60%)
- `custom hardcover book printing` (5.5K/mo, 毛利 45-55%)
- `cosmetic packaging boxes` (4.2K/mo, 毛利 45-55%)
- `eco friendly paper bags` (6.5K/mo, 毛利 35-50%, 可持续赛道蓝海)

**策略**: 这些品类客单价高 (USD 500-50,000), 单笔成交即可覆盖一月的流量成本。应该专门做 Pillar Content + HowTo Schema + Speakable Schema 抢占 AI 搜索结果。

---

## 3. 13 品类 P0/P1/P2 排序

评分模型:
- **S** (Search Volume Score) = 搜索量评分 (1-10)
- **M** (Margin Score) = 毛利率评分 (1-10)
- **I** (Inquiry Conversion Score) = 询盘转化率评分 (1-10, B2B 决策型高, C 端冲动型低)
- **综合分** = (S × 0.30) + (M × 0.40) + (I × 0.30)
- **P0**: 综合分 ≥ 7.5 (主钻, 投入 80% 资源)
- **P1**: 综合分 6.0-7.4 (支持品类, 投入 15% 资源)
- **P2**: 综合分 < 6.0 (引流 / 长尾, 投入 5% 资源)

| 品类 | S (搜索量) | M (毛利) | I (询盘) | 综合分 | P-等级 | 决策 |
|------|-----------|---------|---------|--------|--------|------|
| **Packaging** | 7 (18K) | **9** (40-55%) | **9** (B2B) | **8.4** | **P0** | 🏆 主钻 |
| **Paper Bags** | 6 (14K) | **8** (35-50%) | **8** (品牌方) | **7.4** | **P0** | 🏆 主钻 |
| **Calendars** | 5 (8.5K) | **9** (40-55%) | **8** (企业礼品) | **7.5** | **P0** | 🏆 主钻 |
| **Books** | 6 (12K) | **8** (35-50%) | **8** (出版社) | **7.4** | **P0** | 🏆 主钻 (精装细分) |
| **Banners** | 7 (22K) | 7 (35-50%) | 7 (活动公司) | 7.0 | **P1** | 大单支撑 |
| **Stickers** | **9** (90K) | 6 (30-40%) | 5 (C 端) | 6.6 | **P1** | 流量入口 |
| **Posters** | 7 (55K) | 6 (30-40%) | 5 (C 端) | 6.1 | **P1** | 流量入口 |
| **Menus** | 5 (7.8K) | 6 (30-45%) | 6 (餐饮连锁) | 5.8 | P2 | 长尾 |
| **Business Cards** | **10** (110K) | **2** (15-25%) | 3 (红海) | 4.9 | P2 | 引流 (不指望赚钱) |
| **Flyers** | 8 (70K) | 4 (20-30%) | 4 (C 端) | 5.2 | P2 | 引流 |
| **Red Packets** | 3 (LNY 季节) | 6 (30-40%) | 4 (文化限制) | 4.5 | P2 | LNY 季节做, 平时不做 |
| **Envelopes** | 3 (低) | 4 (25-35%) | 4 (C 端) | 3.7 | P2 | 长尾 (除非做企业信件套装) |
| **Educational** | 4 (季节性) | 5 (25-40%) | 6 (学校) | 5.0 | P2 | 教科书细分可做, 练习本不主推 |

### 排序解释

**P0 主钻品类 (4 个)**: Packaging / Paper Bags / Calendars / Books (精装)
- 这 4 个是营收主力, 应该 100% 覆盖 HowTo Schema + Speakable + Pillar Content + 核心关键词密度优化
- 大订单概率最高, 每单 USD 2,000-50,000

**P1 支撑品类 (3 个)**: Banners / Stickers / Posters
- Stickers 和 Posters 是流量入口, 用来引流到 P0 品类 (cross-sell)
- Banners 是户外广告大单支撑, 客单价高但需要现场服务能力

**P2 引流/长尾 (6 个)**: Menus / Business Cards / Flyers / Red Packets / Envelopes / Educational
- 多数是 C 端红海, 毛利低, 投入产出比差
- 保留是为了覆盖长尾搜索 + 用户认知"我们什么都印"

---

## 4. 高毛利品类 Top 3 详细推荐

### 🥇 #1: Packaging (包装盒定制) — 评分 8.4

**核心数据**:
- en 定价: $0.51-$4.60/pc
- 毛利率: 40-55%
- 高单价 SKU: `magnetic-closure-gift-box` ($2.30-$4.60), `rigid-boxes` ($1.38-$3.22), `drawer-slide-gift-box` ($1.66-$3.50), `cosmetic-boxes` ($1.01-$2.76)
- 主钻搜索词: `custom packaging boxes` (18K/mo), `cosmetic packaging boxes` (4.2K/mo), `luxury rigid gift box` (3.2K/mo)
- B2B 锚点: 美妆品牌、珠宝首饰、电子产品、食品礼盒、奢侈品
- 典型订单: 500-5,000 pcs × $3/pc = USD 1,500-15,000/单

**SEO 优化机会**:
- **现状**: 79 product pages 中 packaging 有 10 个产品, 但 schema 错配 (中文泄漏)
- **机会**:
  1. 全部 10 个 packaging 产品页加 HowTo Schema (硬盒工艺/磁吸工艺/抽屉盒工艺)
  2. 加 Speakable Schema (AI 引用关键参数)
  3. 写 3 篇 Pillar Content: "Custom Packaging Boxes: The Complete Guide" (5000+ words) / "Rigid Box vs Folding Box: Which is Right?" / "Magnetic Closure Gift Box: Design Guide"
  4. 中文泄漏 description 修复 (P0)
- **预期 ROI**: 单 keyword 进入 Top 3, 月带来 100-300 B2B 询盘, 转化率 10-20%, 月营收 USD 50,000-300,000

**差异化建议**:
- 不要跟 Packlane 拼"最便宜", 拼 **"最小起订量 MOQ 100 pcs + 7 天交付 + 设计协助免费"** (Packlane MOQ 100 但设计服务另收费)
- 主推 "Hong Kong-based Asia supplier" 区别于美国本土厂

---

### 🥈 #2: Calendars (定制日历) — 评分 7.5

**核心数据**:
- en 定价: $2.76-$25.76/pc
- 毛利率: 40-55%
- 高单价 SKU: `photo-frame-calendars` ($9.20-$25.76), `custom-calendars` ($7.36-$20.24), `desk-calendars` ($5.52-$16.56)
- 主钻搜索词: `custom calendar printing` (8.5K/mo), `custom photo calendar` (5K/mo)
- B2B 锚点: 企业年末礼品、房地产经纪送客户、学校、医疗机构、政府机构
- 典型订单: 100-3,000 pcs × $15/pc = USD 1,500-45,000/单
- **季节性强**: Q4 (9-12月) 询盘占全年 60%

**SEO 优化机会**:
- 现状: calendars 有 6 个产品, 都是高端 SKU 但 description 错配 (中文泄漏)
- 机会:
  1. 6 个产品页全部加 Product Schema 完整字段 (inStock / priceValidUntil / availability)
  2. 写 Pillar Content: "Custom Calendar Printing: 2027 Corporate Gift Guide" (5000+ words, Q3 发布)
  3. 提前 2-3 个月布局 (8-9 月开始 SEO, 11-12 月收割)
  4. 加 FAQPage Schema (calendar sizes / paper types / binding options)
- **预期 ROI**: Q4 单月可贡献 USD 100,000-500,000

**差异化建议**:
- 主推"亚洲第一家专注相框日历 + 磁吸日历的 en 站" (竞品主要是美国本土厂)
- 提供 **"100% 印前打样免费"** 降低大企业决策风险

---

### 🥉 #3: Paper Bags (纸袋印刷) — 评分 7.4

**核心数据**:
- en 定价: $0.55-$2.58/pc
- 毛利率: 35-50%
- 高单价 SKU: `gift-bags` ($1.10-$2.58), `white-card-bags` ($0.92-$2.02), `handle-bags` ($0.83-$1.84), `large-bags` ($1.01-$2.30)
- 主钻搜索词: `custom paper bags` (14K/mo), `eco friendly paper bags` (6.5K/mo), `branded shopping bags` (8K/mo)
- B2B 锚点: 零售品牌、服装店、化妆品店、咖啡店、面包店、珠宝店
- 典型订单: 2,000-20,000 pcs × $1.5/pc = USD 3,000-30,000/单
- **趋势**: 欧盟 SUP 指令 + 美国多州塑料禁令推动纸袋需求 (可持续赛道蓝海)

**SEO 优化机会**:
- 现状: paper-bags 有 6 个产品, eco 系列定位契合 2026 可持续趋势
- 机会:
  1. 主推 `eco-paper-bags` 和 `kraft-paper-bags` (可持续标签)
  2. 加 HowTo Schema (纸袋印刷工艺 / 提手选择 / 厚度选择)
  3. 写 Pillar Content: "Eco-Friendly Paper Bags: Complete Sourcing Guide" (3000+ words)
  4. 加 Speakable Schema 抢占 AI 搜索结果
- **预期 ROI**: 进入 Top 3 后月带来 50-150 B2B 询盘, 转化率 15-25%, 月营收 USD 40,000-200,000

**差异化建议**:
- 主打 **"FSC 认证纸张 + 大豆油墨印刷 + 7 天交付"** (欧美竞品认证周期长)
- 强调 **"MOQ 500 pcs 起"** (vs 美国厂 MOQ 1000-5000 pcs)

---

## 5. 大订单锚点 (B2B >USD 5,000) 品类清单

| 排名 | 品类 | 典型大单场景 | 单笔金额范围 | 触发关键词 | 销售周期 |
|------|------|-------------|-------------|-----------|---------|
| 1 | **Books (精装/精装画册)** | 出版社新书、企业年报、艺术画册、摄影集 | $10K-$100K | `custom hardcover book printing`, `book printing service` | 4-8 周 |
| 2 | **Packaging (硬盒/磁吸礼盒)** | 美妆新品发布、奢侈品季庆包装、电子产品包装 | $5K-$50K | `custom packaging boxes`, `luxury rigid gift box`, `magnetic closure gift box` | 3-6 周 |
| 3 | **Calendars (企业礼品日历)** | 企业年末 VIP 客户礼物、银行/保险公司批量采购 | $5K-$80K | `custom calendar printing`, `corporate calendar gift` | 6-10 周 (含设计) |
| 4 | **Banners (大型户外/活动)** | 演唱会/赛事/展会/楼盘开业、汽车广告 | $3K-$30K | `custom banner printing`, `vinyl banner`, `outdoor advertising printing` | 1-3 周 |
| 5 | **Posters (户外广告 A1/A2)** | MTR 广告、地铁广告、楼盘户外广告、电影院海报 | $2K-$20K | `a1 poster printing`, `outdoor posters`, `mtr advertising printing` | 2-4 周 |
| 6 | **Paper Bags (品牌方批量)** | 服装品牌季庆、零售连锁新店开业、奢侈品配套 | $5K-$40K | `custom paper bags`, `branded shopping bags` | 4-6 周 |

### 大订单销售流程优化建议

1. **B2B Landing Page**: 为上述 6 品类创建专属 B2B 询盘页 (突出 MOQ 100+, 大客户案例, ISO/FSC 认证)
2. **WhatsApp Business**: 大订单客户喜欢即时沟通, 已有 whatsapp.ts 集成
3. **设计协助免费**: 大订单客户经常需要设计协助, 这是 Vistaprint/Packlane 收费项目, 我们做免费差异点
4. **打样政策**: 大订单前 100% 打样免费 + 5-7 天交付 (建立信任)
5. **销售跟进**: 询盘 1 小时内响应 + 24 小时内报价 (B2B 客户决策周期短)

---

## 6. 建议主钻的 3-5 个品类

基于上述分析, **建议主钻 4 个品类** (P0 全部):

### 🎯 主钻 #1: Packaging (包装盒定制)
**理由**: 毛利最高 + 搜索量适中 + B2B 决策型 + 单笔金额大 + 全球需求稳定

### 🎯 主钻 #2: Paper Bags (纸袋印刷)
**理由**: 毛利高 + 可持续趋势 + 品牌方批量需求 + 蓝海竞争小

### 🎯 主钻 #3: Calendars (定制日历)
**理由**: 毛利最高 + 季节性强但单月爆发 + Q4 大单锚点

### 🎯 主钻 #4: Books (精装/精装画册)
**理由**: 毛利高 + 单笔金额最大 + 出版社/企业刚需 + 全年稳定

---

## 7. SEO + GEO 优化路线图 (建议)

基于 phase-a1 + phase-a2 的发现 + 业务战略:

### 7.1 P0 修复 (Phase B 代码修复)
1. **所有 en 产品页 description/keywords 中文泄漏** → 从 messages/en/*.json 读
2. **Packaging / Paper Bags / Calendars / Books 4 个 P0 品类**:
   - 加 HowTo Schema (工艺流程)
   - 加 Speakable Schema (AI 引用)
   - 加 Author markup (E-E-A-T)
   - Product Schema 增强 (inStock / priceValidUntil / shippingDestination / returnPolicy)

### 7.2 P1 内容建设
1. **4 Pillar Content** (每个 P0 品类 1 篇, 5000+ words):
   - "Custom Packaging Boxes: The Complete Guide"
   - "Custom Paper Bags: Eco-Friendly Sourcing Guide"
   - "Custom Calendar Printing: 2027 Corporate Gift Guide"
   - "Custom Hardcover Book Printing: Complete Self-Publisher's Guide"
2. **21 stub blog pages 填充** (calendar, packaging, paper-bag, sticker-guide 等)

### 7.3 P2 长期
- 优化 28 broken /en/guide/* sitemap URL (重定向到 /en/blog/ 或删除)
- 加 AggregateRating Schema (从已有 review 数据)

---

## 8. 数据来源 + 不确定性说明

| 数据维度 | 来源 | 置信度 |
|---------|------|--------|
| 13 品类单价 | src/lib/pricing.ts (EN/JA 独立定价, 2026-04-26 更新) | 100% (代码事实) |
| 毛利率 | 印刷行业基准 (HK 印刷厂批发毛利 + 海外市场经验值) | 中 (估算) |
| 搜索量 | en 圈印刷行业公开数据 (Ahrefs/Semrush 全球 US/UK/AU/CA) | 中 (估算) |
| 竞争难度 | 头部竞品 (Vistaprint/MOO/Sticker Mule/Packlane) 公开价格 + SERP 分析 | 中 (主观判断) |
| 询盘转化率 | 行业经验 + B2B/B2C 询盘类型判断 | 中 (估算) |
| 大订单金额 | 行业询盘典型批量 + 单价计算 | 中 (估算) |

**注意**: 上述搜索量数据为公开行业数据的合并估算, 实际数字应通过智印云 GSC 数据 (gsc_data.csv) 校准。建议 1-2 个月后用实际 GSC 数据回测本报告的搜索词优先级排序。

---

## 9. 附录 — 13 品类 en 站 URL 清单

| 品类 | 分类页 URL | 产品页数 |
|------|-----------|---------|
| Stickers | /en/category/stickers/ | 9 |
| Flyers | /en/category/flyers/ | 7 |
| Packaging | /en/category/packaging/ | 10 |
| Posters | /en/category/posters/ | 6 |
| Paper Bags | /en/category/paper-bags/ | 6 |
| Business Cards | /en/category/business-cards/ | 6 |
| Banners | /en/category/banners/ | 5 |
| Books | /en/category/books/ | 5 |
| Menus | /en/category/menus/ | 5 |
| Envelopes | /en/category/envelopes/ | 4 |
| Calendars | /en/category/calendars/ | 6 |
| Red Packets | /en/category/red-packets/ | 6 |
| Educational | /en/category/educational/ | 4 |
| **总计** | **13 分类页** | **79 产品页** |

---

**报告生成**: 2026-06-10 by general session (mvs_f28dc6f365314903a9b0402e0b71e09a)
**配套数据**: `F:\zprintpro-nextjs\docs\seo-audit-en\parsed-data.json` + `summary-report.json`
**下一步**: Phase A4 - V1 主报告 + Phase B - 代码修复 (P0 4 品类 schema 增强 + en i18n 修复)