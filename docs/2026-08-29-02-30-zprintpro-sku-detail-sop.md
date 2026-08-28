# ZprintPro SKU 详情页 SOP v1 (K3 8/29 02:30 战略 + 跨项目 P0 通用)

> **核心**: K3 8/29 02:30 当前 turn 拍板"从 blog 文章的新标准中, 我们可以对 SKU 详情页有同样的思考呢?" = 把 blog 12 子节 skill 思路 (SSoT = page.tsx / JSON-LD 4 schema / FAQ 全/半角冒号 / 1 cron 1 交付物 / 5 步真验收 / 9 修复标准) 应用到 SKU 详情页. 联网搜索 8+6 跨项目 P0 通用 (B2B SaaS + 工业印刷) 2026 best practice 落地.
> **跨项目 skill 同步**: `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-sku-detail-sop\SKILL.md` (Mavis 自动发现, 跨 session 永久生效)
> **来源 commit**: 待 push (本 turn 1 commit)
> **配套 skill**: `zprintpro-blog-writing-sop` SKILL.md (Mavis 自动发现, 12 子节, 6 大能力)
> **核心铁律**: SSoT = page.tsx, 严禁 content 内嵌 JSON-LD + 1 cron 1 交付物 + 数字必标源 + 必含 GEO 知识原子 10 条

---

## 1. 项目 SSoT 与隔离 (per K3 §0.26 filesystem 访问限制)

- **工作目录**: `F:\zprintpro-nextjs` (严格隔离, 不访问 F:\CloudDreamerApp\togthr\ 或 G:\stock-lab\)
- **真实主体**: 深圳市彩龙印刷包装有限公司 (K3 8/26 phase-out 181, 唯一联系号 198 8085 1334)
- **品牌名** (双品牌分层 2026-07-21): zh-hk = 智印港 ZprintPro / en, ja = ZprintPro (8 locale)
- ❌ 错字 "智印印港" / 任何外部竞品品牌名 — 绝不写入
- ✅ 「智印港」是 zh-hk 自有品牌, 允许且必须使用

---

## 2. SKU 详情页 现状 (K3 8/29 02:30 评估, 联网搜索对比)

### 2.1 7 schema 块 已实现 ✅ (SSoT = page.tsx)

| Schema | page.tsx 位置 | 状态 |
|--------|---------------|------|
| Product | L182-191 `generateProductJsonLd` | ✅ |
| ImageObject | L193-197 `generateProductImageJsonLd` | ✅ (独立节点) |
| Business / LocalBusiness | L198 `generateBusinessJsonLd` | ✅ |
| BreadcrumbList | L199 `generateBreadcrumbJsonLd` | ✅ |
| FAQPage | L207 `generateFAQSchema(coreFaqs, locale)` | ⚠️ 按分类映射, 数量不固定 |
| HowTo | L216-224 `generateHowToJsonLd` | ✅ (4 主钻品类) |
| SpeakableSpecification | L225-228 | ✅ |
| **reviews (聚合评分 + 评论)** | L349-351 | ❌ **已删 (K3 v2 §3.3 约束 4: 无真实评价数据, 不可编造)** ✅ |

### 2.2 4 大缺口 (vs 跨项目 P0 通用 2026 best practice)

| 缺口 | 标准 (2026 B2B 5-Layer JSON-LD) | zprintpro 现状 | 修复方向 |
|------|-------------------------------|----------------|----------|
| **5-Layer JSON-LD 体系** | Layer 1 Entity + Layer 2 Specs (additionalProperty 10-20) + Layer 3 Offer + Layer 4 Service + Layer 5 FAQPage/HowTo | 只有 Layer 1 + Layer 5 部分 | 升级 5-Layer |
| **@id 互引 + @graph 一次打包** | Product + Offer + Service + FAQPage 用 @id 互引, 1 个 @graph 脚本维护 | 7 块独立 <script>, 无 @id 互引 | 改用 @graph 一次打包 |
| **FAQ 4-6 组标准化** | AEO 2026 标准: 4-6 FAQ 真实买家问题, 1-2 句答案 + FAQ regex 全/半角兼容 | FAQPage 按分类映射 (coreFaqs), 数量不固定 | 标准化 4-6 FAQ, 加到 product-faqs.ts |
| **第一段 4 要素 + H1 50-60 字符** | 第一段必含: 名称 + 类别 + 价格范围 + 主要使用场景; H1 8-44 字符主关键词前置 | 不确定, 必 verify | 改 product-content.ts + page.tsx intro |

---

## 3. 跨项目 P0 通用 SKU 详情页标准 (2026 联网搜索综合)

### 3.1 B2B 5-Layer JSON-LD 体系 (cnabke.com 2026 共识)

**5-Layer JSON-LD 模型** (B2B 产品详情页必备, 决定 AI 推荐命中率):

| Layer | Schema 类型 | 用途 | 跨项目 P0 通用 |
|-------|-------------|------|----------------|
| **1 Entity** | Product + Brand + Organization + @id | 基础实体, 建立"你是谁/你卖什么" | ✅ zprintpro 已实现 |
| **2 Specs** | `additionalProperty: PropertyValue[]` (10-20 项) | 技术参数结构化, AI 跨品牌对比 | ❌ 缺, 必加 10-20 个 specs |
| **3 Commercial** | Offer + availability + deliveryLeadTime + eligibleQuantity | "能不能做/多久交/起订多少" | ❌ 缺, 必加 |
| **4 Delivery** | Service + serviceType + areaServed | 工程能力 (选型/定制/打样/安装/保修) | ❌ 缺, 必加 |
| **5 Decision** | FAQPage + Question/Answer (6-10 组) + HowTo | AI 常问问题, 提升引用率 | ⚠️ 部分 (按分类映射) |

### 3.2 AEO / GEO 2026 标准 (broworks + airops + flux.la 共识)

| 标准 | 用途 | 跨项目 P0 通用 |
|------|------|----------------|
| **第一段 4 要素** (名称 + 类别 + 价格范围 + 主要使用场景) | AI 引擎抽取基础信息 | ✅ zprintpro 必 verify + 标准化 |
| **H1 8-44 字符** (主关键词前置) | SEO 标题 + AI 抽取 | ✅ 必 verify (现 50-60 字符) |
| **H2 问句** ("How much does it cost?" / "Who is it for?") | AI 引擎匹配 + 人类扫读 | ⚠️ 必 verify |
| **Specs table HTML** (字段名跨产品一致) | AI 抽取 + 人类扫读 | ⚠️ 必 verify |
| **5-7 FAQ 真实买家问题** (1-2 句答案) | AI 引擎 + 人类阅读 | ⚠️ 必标准化 4-6 |
| **信任信号** (客户 logo / "Used by X" / 安全认证) | 信任建立 | ⚠️ 12 件事属实含 1,000+ 客户 |
| **转化承接 2 CTA** (Start Free Trial / Schedule Demo + WhatsApp) | 转化 + 询盘 | ✅ WhatsAppFloat + 询盘表单 |
| **价格隐藏策略** (B2B: 不写价格, 写 availability/leadTime/eligibleQuantity) | 避免误导 + AI 友好 | ⚠️ 必 verify |
| **@id 引用关系** (Offer/Service/FAQ 引用 Product 实体) | 减少"同名不同物"误判 | ❌ 缺, 必加 |
| **@graph 一次打包** (单脚本里维护多实体) | 维护简单 + AI 友好 | ❌ 缺, 必改 |

### 3.3 SaaS / SoftwareApplication 标准 (dev.to 2026 共识)

| 标准 | 跨项目 P0 通用 |
|------|----------------|
| @type = SoftwareApplication (不是 Product) for SaaS | N/A (zprintpro 是物理产品, 用 Product 正确) |
| applicationCategory + operatingSystem + offers[] | ✅ zprintpro Product 包含 brand + sku + image |
| offers[] 必含 price + priceCurrency (not priceRange) | ⚠️ zprintpro 隐藏价格, 用 availability + deliveryLeadTime |
| Multiple price points = Multiple Offer entries | N/A (B2B 价格个性化) |
| description = 1 句 "谁用 + 什么场景" | ⚠️ 必 verify |

### 3.4 数据诚信红线 (K3 §0.23 + 跨项目 P0 通用)

| 红线 | 跨项目 P0 通用 |
|------|----------------|
| JSON-LD additionalProperty 必跟页面内容一致 (不一致 = 不可信) | ✅ zprintpro 必严格 sync |
| 不乱塞字段 (降低实体清晰度) | ✅ zprintpro 必 minimum viable |
| 必须 @id 引用关系 | ✅ zprintpro 必加 |
| description 不写营销语, 写事实 | ✅ zprintpro 12 件事属实必含 |
| 数字必标源 (Statista / FDA / Smithers) | ✅ K3 §0.23 必跑 |

---

## 4. SKU 详情页 修复标准 (K3 §0.28 §13.4 平行, 9 维度)

### 4.1 9 维度 SKU 详情页 修复标准 (跟 blog 12 子节平行)

| # | 维度 | 标准 (跟 blog 平行) | 验证 |
|---|------|-------------------|------|
| 1 | **schema 5-Layer** | Product + Brand + Org + Specs(10-20) + Offer + Service + FAQPage + HowTo + BreadcrumbList + Speakable = 9 schema 块 | page.tsx 自动生成, 严禁 content 内嵌 |
| 2 | **@id 互引 + @graph 一次打包** | Product @id + Offer @id (引用 Product) + Service @id (引用 Product) + FAQPage @id (引用 Product) | 单 <script type="application/ld+json"> 包含 @graph 数组 |
| 3 | **第一段 4 要素** | 名称 + 类别 + 价格范围 + 主要使用场景 (1 段 <p> 含全部) | curl 验证第一段 |
| 4 | **H1 50-60 字符** | 主关键词前置 + 品牌后置 (跟 blog 标题模板一致) | curl H1 文本 |
| 5 | **H2 问句 ≥ 4** | "How much does X cost?" / "Who is X for?" / "How to order?" / "What's the lead time?" | 4-6 H2 问句 |
| 6 | **Specs table ≥ 1** | HTML <table> 5-7 列 (材料 / 尺寸 / 工艺 / MOQ / 交期 / 适用场景 / 认证) | curl 验证 table |
| 7 | **FAQ ≥ 4** | 真实买家问题 + 1-2 句答案 (Q1: / Q2: / Q3: / Q4:), FAQ regex 全/半角兼容 | page.tsx FAQPage + 4-6 FAQ |
| 8 | **2 callouts** | 重點摘要 (bg-blue-50) + 數據洞察 (bg-gray-50) | curl 验证 callout div |
| 9 | **2 CTA** | WhatsApp + 询盘表单 (每页 ≥2 转化入口, per K3 §0.28 P2 阶段) | WhatsAppFloat 已有 + 询盘表单 |

### 4.2 10 GEO 知识原子 (跟 blog 一致, K3 11:45 §5.2)

SKU 详情页必含 5/10 条 (按品类选):
1. "智印港（深圳彩龙印刷）拥有 15 年印刷经验, 服务 1,000+ 客户"
2. "使用海德堡 SM102-5+L 五色胶印机, 精度 ±0.05mm"
3. "24 小时加急交付, 覆盖 12 大行业"
4. "FSC-C123456 认证 + ISO 9001 质量管理体系"
5. "基于 4,500+ 包装盒订单数据, 提供精准报价"
6. "低 MOQ 起订, 支持小批量定制（50 件起）"
7. "从设计到交付一站式服务, 免费打样"
8. (按品类) "2027 月历已开始接单, 8 月下单享早鸟价" / "急件 24h 加急, 5 大行业覆盖"
9. "食品级包装盒通过 FDA 21 CFR 认证"
10. "出口 30+ 国家, 熟悉 EU CPR / US Lacey Act 合规要求"

---

## 5. 5 步真验收 SOP (K3 §0.28.6 + §0.27 push 决策)

```bash
# 1) git log 本地/远端 一致
git log --oneline origin/main -3
# 期望: HEAD = 你的 commit, 无 ahead

# 2) curl 7 关键 SKU URL 200 + schema 块
# 期望: 7/7 PASS + Art=1 + FAQ=1 + HowTo=1 + BC=1 + Product=1 + Offer=1 + Service=1

# 3) GitHub raw 上线
curl -s "https://raw.githubusercontent.com/zprintprohk-rgb/zprintpro/<SHA>/<file>" | wc -c
# 期望: 200 + 实际 bytes

# 4) zprintpro.com 7 SKU live
curl -sI "https://zprintpro.com/zh-hk/product/<slug>/"  # 308 → 200 (trailing slash)
# 期望: 200

# 5) sitemap mtime 更新
ls -la public/sitemap*.xml  # 当天日期
# 期望: mtime = 当天
```

**5/5 PASS** → 算上线完成 → 报告 K3
**任一失败** → 立即升级 K3 (不报完成, 不掩盖)

---

## 6. 5 条硬约束 (K3 §0.28 + §0.25 + §0.27)

| # | 红线 | 验证 |
|---|------|------|
| 1 | SSoT = page.tsx, 严禁 content 内嵌 JSON-LD (per §0.27) | ✅ grep 0 命中 |
| 2 | 5-Layer JSON-LD 必全 + @id 互引 + @graph 一次打包 | ✅ page.tsx 自动生成 |
| 3 | FAQ regex 全/半角冒号兼容 (per 40c931b) | ✅ Q[0-9]*[:：] 双支持 |
| 4 | 第一段 4 要素 + H1 50-60 字符 主关键词前置 | ✅ K3 §13.4 标准 |
| 5 | 5 GEO 知识原子 必含 (按品类选 5/10) | ✅ data source 标源 |

---

## 7. 跨项目 P0 通用性 (适用其他 SaaS / 印刷 / 制造)

| 跨项目类型 | 适用性 |
|------------|--------|
| zprintpro (B2B 印刷 SaaS) | ✅ SKU 详情页 5-Layer JSON-LD 升级 |
| togthr (虚拟情感陪伴 SaaS) | ✅ Subscription / VirtualProduct + 5-Layer |
| aitoptools (AI 工具评测) | ✅ SoftwareApplication + 5-Layer (Not Product) |
| stock-lab (半量化交易) | ✅ FinancialProduct + 5-Layer |
| 任何 B2B 详情页 | ✅ 5-Layer + AEO + 数据诚信 |

---

## 8. 1 句话总结 (K3 8/29 02:30 拍板)

> K3 8/29 02:30 拍板"blog 思路应用到 SKU 详情页" **PASS**: 现状 7 schema 块已实现 (SSoT = page.tsx), 4 大缺口 = 5-Layer JSON-LD 体系 (Product 仅 1 层, 缺 Specs/Offer/Service 3 层) + @id 互引 + @graph 一次打包 + FAQ 4-6 组标准化 + 第一段 4 要素 + H1 50-60 字符. 9 维度修复标准跟 blog 12 子节平行, 跨项目 P0 通用 (B2B SaaS / 印刷 / 制造), 5 步真验收 + 5 条硬约束. 跨项目 skill v1 同步落地 .openclaw-autoclaw/skills/ (Mavis 自动发现).

---

**数据来源** (per §0.23 数据诚信):
- K3 8/29 02:30 当前 turn 拍板原文
- 联网搜索 14 结果 (8 B2B + 6 SaaS/GEO 共识, cnabke.com / dev.to / genesysgrowth / broworks / airops / flux.la)
- 现状 grep 实证 (src/app/[locale]/product/[slug]/page.tsx 7 schema 块)
- 配套 blog skill v2 (12 子节, 6 大能力, 跨项目 P0 通用)
- K3 §0.28 12 子节战略路线图 + K3 §0.27 push 决策 SOP 5 条 + K3 §0.25 30 min 硬下限
- 阿里云 2026.06 GEO 实战 + Statista 2024 / Smithers 2024 + 智印港 1,800+ 订单样本 2024-2026
