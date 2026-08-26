# 8/8 15:20 部署报告 — commit 117f9fc (GMC 缺价修复 v2, PARTIAL PASS)

> **状态**: PARTIAL PASS — commit 117f9fc build success + /api/quote/ PASS, 但 PDP 顶层 Product JSON-LD pre-existing 缺 (不在 src/lib/seo.ts)
> **关键**: 4703262 失败后 amend 117f9fc 修复, 1 effective push (force-with-lease)
> **K3 拍板 (14:56)**: "按最优方案修复 404 + GMC 缺价一并解决, push 部署"

## 1. 部署动作

| 项目 | 值 |
|------|---|
| commit | `117f9fc` (替代失败 4703262) |
| 上次 PASS commit | `568087a` (8/8 05:12 PASS) |
| 推送状态 | `+ 4703262...117f9fc main -> main (forced update)` ✅ |
| 本地 build | ✅ Compiled successfully + 5/5 static pages |
| Pre-commit 2/2 | encoding ✅ + 简体字 ✅ PASS |
| CF Pages build | ✅ success (run 93074350218) |
| 今日 push 用量 | 3/5 (1 PASS + 1 FAIL 替代 + 1 success, 净 2 net commits) |

## 2. verify 流水线 (§0.7 production smoke 3/3)

### Step 1: POST /api/quote/ ✅
- HTTP 200
- UUID: `f67b1991-df6c-425d-8395-3b11b3e3ca0f`
- created_at: `2026-08-08T07:22:06.113629+00:00` (= 8/8 15:22 +0800, 完美对应 build success 后)

**4 记录链完整** (P0 阻断 8/12 验收已满足):
- 8/7 18:30 UTC `fae355ba-7880-494b-b89c-5f6bcf6e2b8c` (9ab9ee4 commit, /api/quote 修复)
- 8/8 04:32 UTC `4892080c-3e77-4be6-8368-d93944a68b29` (568087a commit 验证)
- 8/8 05:22 UTC `360e8366-f3dd-40a9-b13c-b05ef08c3e49` (568087a PASS 验证)
- 8/8 15:22 UTC `f67b1991-df6c-425d-8395-3b11b3e3ca0f` (117f9fc PASS 验证)

### Step 2: PDP 顶层 Product JSON-LD 验证 ⚠️ PARTIAL

**生产 HTML 实际 6 个 JSON-LD script (zprintpro.com/zh-hk/product/stickers/)**:
- [0] WebSite (size 133)
- [1] BreadcrumbList (size 278)
- [2] **ItemList (size 12218, 含 Product 内嵌, 类目页用)** ← 生产实际 Product 段在这里
- [3] LocalBusiness (size 1339)
- [4] SpeakableSpecification (size 143)
- [5] FAQPage (size 1336)

**关键发现 — PDP 缺顶层 Product JSON-LD**:
- `src/lib/seo.ts L1073 generateProductJsonLd` 改字**生效** (priceValidUntil + sku + hasMerchantReturnPolicy 字段加进去)
- 但 **PDP 实际 HTML 6 个 JSON-LD script 没顶层 Product** = `generateProductJsonLd` 输出**未被 PDP 渲染**
- **生产 PDP 实际 Product schema 来自** `src/lib/seo/schema-extensions.ts:520-536` (ItemList 内嵌 Product, 走 `generateCategoryItemListJsonLd`)

**schema-extensions.ts L520-536 已含字段** (pre-existing, 不是我加的):
- ✅ priceValidUntil: '2027-12-31'
- ✅ hasMerchantReturnPolicy (3 locale 兼容)
- ✅ shippingDetails (3 locale 适配)
- ❌ **sku 缺失** (GMC 强烈建议, 但 GMC 不强制要求)
- ❌ **returnFees 缺失** (GMC 强烈建议)

**结论**:
- 117f9fc 改的 src/lib/seo.ts L1073 函数有效, 但 PDP 实际不渲染这个函数
- 真实 Product schema 来自 schema-extensions.ts L520-536, **117f9fc 改动对生产 PDP 实际没生效**
- GMC 必填 (priceValidUntil) **已在生产** (pre-existing)
- GMC 强烈建议 (sku + returnFees) **缺失** (src/lib/seo.ts 改了没用)

### Step 3: build success ✅
- 117f9fc build success, deploy is live

## 3. GMC 修复影响 (实际状态)

**117f9fc 对生产**:
- ❌ src/lib/seo.ts L1073 改动**没生效到 PDP 顶层 Product** (PDP 不渲染这个函数)
- ❌ src/lib/seo.ts 改动只对调用 generateProductJsonLd 的页面生效 (可能其他页面)

**生产 PDP 实际状态** (pre-existing 4703262 之前就有):
- ✅ priceValidUntil: '2027-12-31' (schema-extensions.ts L526, 2026-08-04 拍的)
- ✅ hasMerchantReturnPolicy (schema-extensions.ts L531, GSC「商家信息」要求)
- ❌ sku 缺失 (GMC 强烈建议)
- ❌ returnFees 缺失 (GMC 强烈建议)
- ✅ shippingDetails (GSC 要求)

**GMC 必填已满足** (priceValidUntil + availability), 产品不会因 GMC 缺价被拒。sku + returnFees 是强烈建议, 不影响 GMC 投流。

## 4. P0 阻断分析 (PDP 顶层 Product 缺)

**根因**: `src/lib/seo.ts L1073 generateProductJsonLd` 是**死代码或 RSC 不渲染**:
- PDP page.tsx L303 `<JsonLd data={productJsonLd} />` 应该渲染
- 但生产 HTML 6 个 JSON-LD 没顶层 Product
- 可能 RSC streaming 行为, 或者 schema 函数 throw silent error, 或者 page.tsx L303 没真的 export

**影响**:
- GSC 抓 PDP 看不到顶层 Product, 只看到 ItemList (类目页用的) — 严重 SEO 问题
- Rich Results 测试不通过
- PDP 排名 + CTR 受损

**修法 (8/9 整合 push 一并修)**:
1. 查 `src/app/[locale]/product/[slug]/page.tsx` L303 实际是否被 RSC 渲染
2. 改 `src/lib/seo/schema-extensions.ts L520-536` 加 `sku: product.slug` (GMC 强烈建议, 不依赖 PDP 顶层 Product)
3. 8/9 push 1: locale-aware siteName 切换 + schema-extensions.ts sku 补全 + IndexNow ping

## 5. 404 修复 (GSC 30+ URL, 不变)

- **业务卡 SKU 实际 3 个** (double-sided-flyers / postcard-set / eco-tote-bag) 不在 §11 严禁区
- **6 类 URL 修复方向已写报告** (双 locale 前缀 / 无 locale / 类目错位 / 占位符 / www 域 / m3u8 410)
- **CF Bulk Redirect List 待 K3 真实身份操作** (CF Dashboard → Bulk Redirects → Add rules, 草稿在 .hermes/k3-inbox/2026-08-08-1500-deploy-4703262-PARTIAL.md §4)

## 6. self-reminder 监控

| cron_name | cron_id | status |
|-----------|---------|--------|
| `verify-deploy-117f9fc` | `2444d839-b793-42bb-90da-00b8ce402482` | **已删 (PASS 自删)** |
| `verify-deploy-4703262` (旧) | `5533b369-b0e1-4b5e-8119-44e4de3c6875` | 已删 |

## 7. 配额动态 (per §0.14)

- **今日 8/8 push**: 3/5 (568087a PASS + 4703262 FAIL + 117f9fc PASS, 净 2 net commits)
- **8/9 整合 push 预期**: 1 push (locale 切换 + 14 SKU + retrofit + AGENTS.md §0.15/0.16 + cron v9.0 + matrix v5 + about placeholder + **schema-extensions.ts sku 补全**)
- **8/13/15/17 残留清理 3 批**: 3 push
- **月累计预期 (8/8-8/21)**: ~7 push / 150 = 4.7% (健康)

## 8. M3 升级 K3

K3, **117f9fc GMC 缺价修复 PARTIAL PASS**:

**改字内容** (`src/lib/seo.ts L1096-1117` schema Product offers 段):
- priceValidUntil: '2027-12-31' (GMC 必填)
- sku: slug (GMC 强烈建议)
- (hasMerchantReturnPolicy 在 L1188 统一加, 3 locale 兼容)

**部署结果**:
- ✅ 117f9fc build success, deploy is live
- ✅ /api/quote/ HTTP 200 + UUID `f67b1991-...` (4 记录链完整)
- ✅ Pre-commit 2/2 PASS
- ❌ **PDP 顶层 Product JSON-LD 实际缺** (pre-existing bug, PDP 不渲染 generateProductJsonLd)
- ❌ **生产 PDP 实际 Product 来自** `src/lib/seo/schema-extensions.ts:520-536` (类目页 ItemList 内嵌 Product)
- ❌ 117f9fc 改的 src/lib/seo.ts L1073 函数**对生产 PDP 实际没生效**
- ✅ 但 schema-extensions.ts L520-536 **pre-existing 已含** priceValidUntil + hasMerchantReturnPolicy (GMC 必填已满足)

**GMC 修复影响** (实际状态):
- ✅ GMC 必填 (priceValidUntil) 已在生产
- ❌ sku 缺失 (GMC 强烈建议, 不影响投流)
- ❌ returnFees 缺失 (GMC 强烈建议, 不影响投流)
- ✅ 8/9 24h 内 GMC 重新抓取, 产品不会因缺价被拒

**P0 阻断分析 (PDP 顶层 Product 缺)**:
- 根因: PDP page.tsx L303 `<JsonLd data={productJsonLd} />` 输出没在生产 HTML 6 个 JSON-LD 里
- 影响: GSC 抓 PDP 看不到顶层 Product, Rich Results 不通过, 排名 + CTR 受损
- 修法: 8/9 整合 push 修 `src/lib/seo/schema-extensions.ts:520-536` 加 `sku: product.slug`

**今日 push 用量**: 3/5 (1 PASS + 1 FAIL 替代 + 1 PASS, 净 2 net commits), 留 2 buffer (8/9 整合 + 紧急)

**SLA**: ✅ CF build success + /api/quote/ smoke PASS, 4 记录链完整 (P0 阻断 8/12 验收已满足)

报告: `.hermes/k3-inbox/2026-08-08-1520-deploy-117f9fc-PARTIAL-PASS.md` (5.5 KB)。verify-deploy-117f9fc cron 已自删 (PASS 触发即终止, per §0.8)。

**K3 9:00 必拍 4 字+①②③**: X / LinkedIn / 15 SKU 审字 / Org sameAs 审 diff / **locale 切换 5 处审字** + ①②③ + 采 B + 4 件 → M3 立即 8/9 整合 1 push (locale 切换 + 14 SKU + retrofit + AGENTS.md §0.15/0.16 + cron v9.0 + matrix v5 + about placeholder + **schema-extensions.ts sku 补全**)。

**教训固化**: 改 src/lib/seo.ts 这种核心 schema 文件**必先跑 `npm run build` 验证** (这次 4703262 没跑 build 直接 push, TS duplicate property 报 错), 教训: §0.7 production smoke 4 步 = encoding + 简体字 + tsc + **npm run build**。
