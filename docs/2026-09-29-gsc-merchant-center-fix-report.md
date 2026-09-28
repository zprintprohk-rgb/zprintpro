# GSC Rich Results + Merchant Center 问题诊断与修复报告 (2026-09-29)

> 执行层: deepseek hermes · 范围: GSC Rich Results (Product schema) + Google Merchant Center
> 状态: 代码修复已完成并本地验证, 待 push 生产

---

## 0. 问题清单（来自 K3 提供的 GSC 截图, 2026-09-29）

| # | 问题 | 来源 | 数量 | 性质 |
|---|------|------|------|------|
| 1 | 应指定 "offers"、"review" 或 "aggregateRating" | GSC Rich Results 错误区 | 0 | ✅ 已满足（全站 Product schema 均有 offers） |
| 2 | 未填写字段 "aggregateRating" | GSC Rich Results 增强区 | 449 | ⚠️ Enhancement 提示（非错误） |
| 3 | 未填写字段 "review" | GSC Rich Results 增强区 | 449 | ⚠️ Enhancement 提示（非错误） |
| 4 | Merchant Center 未获批准商品 ×4 | Merchant Center 商品列表 | 4 | 🔴 已下架 SKU 的残留条目 |
| 5 | （附带发现）Merchant Center 定时抓取 URL 无尾斜杠 → 308 | 线上探针 | — | ⚠️ 适配层行为, 需在 MC 配置带尾斜杠 URL |

---

## 1. 深度分析

### 1.1 问题 1（0 项错误）— 已满足，无需动作

`generateProductJsonLd` 输出的 Product schema 始终携带 `offers`（2026-09-12 GSC P0 修复后，
无价格表 SKU 也回退用 `price_range` 真实报价源挂 offers），因此「应指定 offers/review/aggregateRating」
错误为 0 项。**保持现状。**

### 1.2 问题 2/3（449 项 missing aggregateRating / review）— 根因与诚实边界

**根因**：站内 **0 条真实客户评价**。K3 2026-08-04 P0-2 裁决（v2 §3.3 约束 4）明确：
「无真实评价数据，不可编造」，且 AGENTS.md §0.23 数据诚信红线 + `check-brand-mentions.mjs --strict`
（假评审人 Daniel T. / Maya L. 零容忍）双重门禁。此前曾两次删除假评分数据：
- 2026-08-04 删 `schema-extensions.ts` 假 aggregateRating 块（"公司级综合评分 4.9/128"）
- 2026-07-28 v2.1 删 PDP 伪随机 rating（weight_score 算 4.2-4.9 + reviewCount 15-64）

**诚实边界（Google 政策 + 站规）**：
- 这两项是 **Enhancement 级警告**，不是错误——缺它只影响「星级展示」，不影响商品摘要/价格/库存富媒体展示；
- 编造评价 → Google 对整站富媒体结果的人工处置风险（review 必须来自真实客户）；
- 因此**填假数据不是解决方案，反而制造更大的风险**。

**已落地（机制就绪）**：新增真实评价数据源 `src/data/product-reviews.ts`，PDP JSON-LD 与
Merchant Center feed 双通道自动消费——**填入真实评价后自动输出 aggregateRating + review，无需再改渲染层**。
同时删除了潜伏的假评价死代码 `generateProductReviewsJsonLd`（默认 4.8/27 + 張先生/李小姐 等编造作者）
和 `generateProductJsonLd` 内硬编码的 Sarah L./David W. 假评价块，杜绝未来任何调用方误触假数据。

### 1.3 问题 4（4 件未获批准）— 均为 K3 已拍板下架的 SKU

| 商品 | locale | MC 最后更新 | 下架时间 | 下架依据 |
|------|--------|-------------|----------|----------|
| Acrylic Keychain (acrylic-keychain) | en | 2026-09-26 | **2026-09-22** | commit `2e46b1f1` SKU 压缩 99→92（K3 指令） |
| アクリルキーホルダー (acrylic-keychain) | ja | 2026-09-22 | **2026-09-22** | 同上 |
| Can Badge Printing (can-badge) | en | 2026-09-15 | **2026-09-23** | commit `3606d042`（K3 拍板：罐型襟章印刷 非业务范围） |
| 罐型襟章印刷 (can-badge) | zh-hk | 2026-08-31 | **2026-09-23** | 同上 |

**线上实证**（2026-09-29 探针）：
- 4 个 SKU 已不在 `products.ts` → 3 个 locale feed（91 items 每个）**均不含** keychain/can-badge；
- 4 个落地页 URL 全部 308 → 同人周邊类目页（next.config.js 301 映射收拢）：
  `/en|ja/product/acrylic-keychain/ → /{locale}/category/japan-doujin/`、
  `/zh-hk|en/product/can-badge/ → /{locale}/category/japan-doujin/`；
- Merchant Center 商品列表的 4 条是**下架前最后一次成功抓取的残留**。

**结论**：这 4 条不是「待批准的新品」，而是已下架商品的过期条目。**正确解法 = 让 feed 抓取成功，
Google 自动移除；不应重新上架**（违反 K3 下架裁决）。

### 1.4 问题 5（feed 无尾斜杠 308）— 适配层行为，MC 配置带尾斜杠 URL 即可

线上实测 `https://zprintpro.com/api/merchant-feed/en`（无尾斜杠，route 文件注释旧版写的正是这个 URL）
返回 **308 → /api/merchant-feed/en/**。带尾斜杠版本直接 200（XML，91 items）。
曾尝试 middleware 内部 rewrite 消除 308：本地 `next start` 验证有效（200），但**线上 next-on-pages
适配层在 middleware 之前完成尾斜杠规范化**（实证：线上 middleware 已运行——响应含 x-zp-ab-variant
标记，但无尾斜杠请求仍在 middleware 之前被 308），故 rewrite 方案在 CF Pages 无效，已回退。
**结论**：Google 定时抓取能跟随 308（HTTP 标准行为），但为消除一切不确定性，MC 抓取 URL 应使用
**带尾斜杠版本**（直达 200）。

### 1.5 附带修复（schema 质量）

| 发现 | 修复 |
|------|------|
| PDP Product schema `image` 为站内相对路径（`/images/...`） | 统一补全为绝对 URL（`https://zprintpro.com/...`） |
| PDP Product schema `brand.name` 在 en/ja 页误挂「智印港」（应 en=ZprintPro / ja=ジープリント，单品牌分层 K3 9/1 02:54） | 改用 `getBrandName(locale)`（seller 同步修复） |
| Merchant feed brand 3 locale 统一 ZprintPro（zh-hk 应智印港 / ja 应ジープリント） | `brandByLocale` 按 locale 输出 |
| 定制印刷商品无 GTIN，feed 缺 `identifier_exists` | 补 `<g:identifier_exists>false</g:identifier_exists>`（防「缺少 GTIN」警告） |

---

## 2. 代码改动清单

| 文件 | 改动 |
|------|------|
| `src/data/product-reviews.ts` | **新增**：真实评价唯一数据源（当前 0 条，含接入规则与格式示例）；`getProductReviews` / `getProductAggregateRating`（按 locale 独立聚合） |
| `src/lib/seo.ts` | `generateProductJsonLd`：① image 绝对 URL ② brand/seller 按 locale（getBrandName）③ review/aggregateRating 改为真实数据驱动（`reviews` 参数，无则零输出）④ 删除硬编码 Sarah L./David W. 假评价块 ⑤ **删除 `generateProductReviewsJsonLd` 假数据死代码** |
| `src/app/[locale]/product/[slug]/page.tsx` | 移除假函数导入；接线 `getProductReviews`/`getProductAggregateRating` → 传入 `rating` + `reviews`（当前无真实评价 → 输出与修复前逐字节一致，零回归） |
| `src/app/api/merchant-feed/[locale]/route.ts` | brand 按 locale；`identifier_exists=false`；真实评价存在时输出 `aggregate_rating`/`review_count`/`rating_range`（当前 0 条 → 不输出）；channel title/description 品牌按 locale（消除同一 XML 内品牌词与异区品牌同现）；doc 注释更新 |
| `src/middleware.ts` | ~~无尾斜杠内部 rewrite~~ **已回退**（2026-09-29 线上实证：next-on-pages 适配层在 middleware 之前完成尾斜杠 308，rewrite 方案在 CF 无效；MC 改用带尾斜杠 URL 直达 200） |

**验证**：tsc 54=54 基线（0 新增）· encoding 5/5 UTF-8 LF · brand-mentions A 类 0 · gsc-leak 0 · next build PASS。

---

## 3. 待 K3 决策 / 人工动作（Merchant Center 后台）

### 3.1 Merchant Center 后台（需要 K3 或管理员操作一次）

1. **核对 feed 抓取配置**：Scheduled fetch URL 用**带尾斜杠**版本
   `https://zprintpro.com/api/merchant-feed/en/`（无尾斜杠版本 308 → 带尾斜杠，Google 虽会跟随，
   但直接配带斜杠版本最稳）；抓取频率若为「月」，建议提到「周」。
2. **触发一次手动抓取**（或等下一次定时抓取）→ 4 条已下架商品残留条目会被 Google 自动移除。
   若 1-2 个抓取周期后仍残留，在 MC 商品列表手动删除这 4 条（它们是已下架商品，无需保留）。
3. **449 项 aggregateRating/review 警告**（Enhancement，不影响现有商品摘要展示）：
   消除它们的唯一合法路径是**真实评价**，三选一：
   - **A（推荐，免费）**：接入 **Google Customer Reviews**（GCR）— Merchant Center 内开通 +
     站内加一段 opt-in 调查脚本，Google 自动收集下单后真实评分，后续评分可回传至商品；
   - **B（立即可做）**：K3 从 WhatsApp / 邮件订单中整理真实客户反馈（客户同意公开），
     按 `product-reviews.ts` 格式填入 → PDP 星级 + feed 评分自动生效（我负责写入）；
   - **C**：接入第三方评价平台（Trustpilot / Reviews.io 等）API。
   在获得真实数据前，**不建议**用任何编造评分「消红」——违反 §0.23 且触发 Google 人工处置风险。

### 3.2 本次 push 说明

- 本次改动满足 §0.25.9 攒批阈值（≥1 src 行为修复）；上次 push = 2026-09-28 07:16（c5cfdf9b），
  30 min 硬下限早已满足。
- **commit 1cd7b221（已 push 生产 c5cfdf9b..1cd7b221）**：真实评价机制 + schema/feed 修复 + 假评价死代码清除。
- **commit d6826168（本地，待 30min 窗口推）**：feed channel title/description 品牌按 locale。
- 仓库另有**非本会话**的既有脏文件（sitemap*.xml / AGENTS.md / .hermes 日志 /
  zprintpro-en-us-images 删除项），按纪律不代持不代提交，本次只提交上述 6 个文件。

---

## 4. 数据来源（§0.23 必含）

```
数据来源:
- GSC Rich Results 报告截图 (K3 提供, 2026-09-29; 449 项 aggregateRating/review 缺失)
- Merchant Center 商品列表截图 (K3 提供, 2026-09-29; 239 已批准 / 4 未获批准)
- 线上 feed 探针: https://zprintpro.com/api/merchant-feed/{en,zh-hk,ja}/ (2026-09-29,
  HTTP 200, XML, 每 locale 91 items, keychain/badge 0 命中)
- 线上 308 探针: /api/merchant-feed/en → 308 /api/merchant-feed/en/ (2026-09-29)
- 线上落地页探针: 4 个已下架 SKU URL → 308 → /{locale}/category/japan-doujin/ (2026-09-29)
- 线上 PDP JSON-LD 探针: /en/product/folding-boxes/ (2026-09-29; offers=True,
  aggregateRating=False, review=False, brand=智印港[bug])
- git log: 2e46b1f1 (2026-09-22 SKU 压缩 99→92, 下架 acrylic-keychain 等 7 SKU)
- git log: 3606d042 (2026-09-23 K3 下架 can-badge, 非业务范围)
- src/lib/seo.ts 注释史 (K3 8/4 P0-2 裁决 / 7/28 v2.1 / 9/12 GSC P0 修复记录)
```
