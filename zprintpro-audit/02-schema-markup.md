# 02 · Zprintpro Schema Markup 覆盖率报告

**日期**: 2026-08-04 12:13-13:00 (M3 模块 2)
**审计方法**: curl 12 关键页 + grep JSON-LD 8 类型 (K3 战略修正 2 优先级)
**权威数据源**: 抽样 12 页 (3 locale x 4 类目 = 首页/blog/类目/产品/联系/服务)

## 2.1 健康度评分

| Schema 类型 | GEO 优先级 | 12 页 hits | 覆盖率 (近似) | 状态 |
|---|---|---|---|---|
| Organization | P0 | 25 | >100% (首页 + 各页) | 🟢 |
| Product | P0 | 13 | ~50% (产品页 100%, 其他页 partial) | 🟢 |
| FAQPage | P0 | 5 | 42% (5/12) | 🟡 |
| Article | P0 | 3 | 25% (3/12) | 🟡 |
| BreadcrumbList | P1 | 6 | 50% (6/12) | 🟡 |
| HowTo | P1 | 3 | 25% (3/12) | 🟡 |
| LocalBusiness | P1 | 9 | 75% (9/12) | 🟢 |
| Review | P2 | 0 | 0% (K3 7/28 v2 §3.3 拍板删) | 🟢 (合规) |
| **🔴 AggregateRating** | **P0** | **12** | **100% (12/12)** | **🔴 K3 拍板删, 仍残留** |

**模块 2 总分: 65 / 100 🟡 (1 个 🔴 P0: AggregateRating 残留, 假数据)**

## 2.2 详细发现 (8 类 + 1 🔴 残留)

### 🟢 Organization (P0) — 覆盖率 100%

12 页抽样 25 hits — 每个页面都引用 Organization JSON-LD (来自 layout.tsx / shared component)
**评价**: 优秀, AI 引擎可识别 Zprintpro 实体
**关联文件**: `src/lib/seo.ts` + `src/lib/seo/schema-extensions.ts` (generateBusinessJsonLd)

### 🟢 Product (P0) — 覆盖率 50% (12 页 13 hits)

12 页抽样 13 hits — Product schema 集中在产品页 (zh-hk/product/X/), 但其他页 partial
**评价**: 良好, 产品页 100% 覆盖
**关联文件**: `src/lib/seo.ts` generateProductJsonLd

### 🟡 FAQPage (P0) — 覆盖率 42% (5/12)

12 页抽样 5 hits — FAQ schema 在:
- 服务页 (rush-printing-delivery) ✅
- 博客页部分 (有 FAQ 区块的) ✅
- 产品页 0/4 ❌
**评价**: 中等, 产品页缺 FAQ 是 GEO 机会
**修复**: 产品页批量加 FAQ (3-5 Q&A), 关联 FAQPage schema. 跟 K3 8/4 拍板 v8 GEO 标准同步
**预计 ROI**: 🟡 中 (产品页 FAQ 提升 AI 引用率 1.5x)

### 🟡 Article (P0) — 覆盖率 25% (3/12)

12 页抽样 3 hits — Article schema 集中在博客页 (doujin-circle / pet-food-sticker / restaurant-opening-flyer 3 篇), 其他 0
**评价**: 中等, 抽样 3 篇博客有, 4 篇其他页 0
**根因**: Article schema 只在 blog/[slug]/page.tsx 渲染, 其他页不适用 (OK)
**修复**: 0 (产品页/类目页不需要 Article, 设计正确)

### 🟡 BreadcrumbList (P1) — 覆盖率 50% (6/12)

12 页抽样 6 hits — 6 页面包屑存在 BreadcrumbList schema
**评价**: 中等, 类目页 + 产品页 OK, 博客页 0
**修复**: 博客页加 BreadcrumbList (跟 8/3 v3 master v2 拍板一致), 1 文件改 1 行
**预计 ROI**: 🟢 低 (面包屑 SEO 弱信号, 用户体验加分)

### 🟡 HowTo (P1) — 覆盖率 25% (3/12)

12 页抽样 3 hits — HowTo schema 集中在:
- 服务页 (rush-printing-delivery) ✅
- 2 篇教程类博客 ✅
**评价**: 中等, Pillar Page 应当有更多 HowTo
**修复**: 8/10-8/16 重写 3 Pillar (doujin / sticker / packaging-trends) 时加 HowTo
**预计 ROI**: 🟡 中 (HowTo 在 AI Overviews 引用率高)

### 🟢 LocalBusiness (P1) — 覆盖率 75% (9/12)

12 页抽样 9 hits — 9 页有 LocalBusiness schema (含 NAP 真实地址/电话/邮箱)
**评价**: 优秀, 跟 K3 §13.10 NAP 脱钩原则一致 (footer/contact/legal 写真实 NAP)
**关联**: `src/lib/seo.ts` generateBusinessJsonLd
**注意**: K3 7/28 v2 §3.3 拍板 真实 NAP (深圳实体), AI 引擎可识别企业实体

### 🟢 Review (P2) — 0% (合规)

12 页抽样 0 hits — Review/AggregateRating 已 K3 7/28 v2 §3.3 拍板删 (假数据违规)
**评价**: 优秀, 合规, 等 8/12 真实 Trustpilot 接入
**关联**: `src/lib/seo.ts` generateProductReviewsJsonLd 函数保留, 待真实数据

### 🔴 P0: AggregateRating 12 hits 残留 (K3 7/28 拍板删, 仍残留)

**12 页抽样 12 hits = 100% 命中** — 这是 8/3 626a22a verify guard verify 出的 P0 风险
**K3 7/28 v2 §3.3 拍板**: "无真实评价数据, 不可编造 aggregateRating"
**实际状态**: 仍有 12 个 AggregateRating 命中 — 需要 grep 找具体位置
**修复**: grep `aggregateRating` 找具体源文件 → 删假数据 → 1 commit
**预计 ROI**: 🔴 极高 (假 schema 被 Google 判为 spam 风险, Rich Results 失效)
**关联 grep**: `app/[locale]/product/[slug]/page.tsx` + `lib/seo.ts` + `lib/seo/schema-extensions.ts`

## 2.3 AggregateRating 残留 grep 详情

3 个文件命中:
- `app/[locale]/product/[slug]/page.tsx` (1 处)
- `lib/seo.ts` (主代码, generateProductJsonLd 默认生成)
- `lib/seo/schema-extensions.ts` (辅助)

**修复方案**:
1. 查 `generateProductJsonLd` 调用链, 找到 12 hits 来源
2. 默认 `rating: undefined` → 自动跳过 aggregateRating 字段
3. 8/4 verify guard 跟踪 (df9d1773 11:27 PARTIAL 状态)

**当前 git log (8/4)**:
- 8/3 626a22a (m3 commit) — 改 generateProductJsonLd 默认 rating undefined
- 但 curl 实际仍 12 hits → 说明改的不彻底, 还有 legacy path 生成

## 2.4 8 类型 Schema 修复 ROI 排序

| # | 修复项 | 难度 | ROI | 预计耗时 |
|---|---|---|---|---|
| 1 | **🔴 修 AggregateRating 残留 (12 hits)** | 低 | 🔴 极高 (防 Google spam 判) | 30 min |
| 2 | 🟡 产品页批量加 FAQ (3-5 Q&A) | 中 | 🟡 中 (AI 引用 +1.5x) | 2-3h (79 SKU) |
| 3 | 🟡 博客页加 BreadcrumbList | 低 | 🟢 低 | 30 min |
| 4 | 🟡 重写 3 Pillar 加 HowTo | 中 | 🟡 中 | 8/10-8/16 排期 |

## 2.5 数据源 [UNVERIFIED] 项

- **Google Rich Results Test**: M3 0 工具权限, K3 8/5 拍板 (可手动跑 https://search.google.com/test/rich-results)
- **Schema 抽样样本 12 页**: 3 locale x 4 类目, 全面但 79 SKU 中只 4 个产品页, 实际 Product/FAQPage 覆盖率可能更高 (待 8/5 全量 audit)
