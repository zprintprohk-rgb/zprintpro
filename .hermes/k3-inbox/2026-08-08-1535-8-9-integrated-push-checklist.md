# 8/9 整合 push 总报告 (B 方案 1 amend 1 build, 7 项内容)

> **拍板来源**: K3 8/8 15:35 战略级 5 段反馈 §三 下一步策略
> **策略**: B 方案 1 amend 1 build (per K3 8/8 07:12 拍板, §0.1 攒批, 节省 1 build 配额)
> **触发**: K3 9:00 必拍 4 字 (X / LinkedIn / 15 SKU 审字 / Org sameAs 审 diff) + 4 件 (3 设备 / Supabase 3 链 / formsubmit / key) → M3 立即 10:15 amend push
> **节省**: small-batch-stickers P0 不单独 commit (省 1 build, 跟 14 SKU 合并, 4 天后 GSC 抓强监控照样验 CTR)

## 1. 7 项内容 (按 ROI 排序)

### 1️⃣ locale-aware siteName 切换 (P0 最高, K3 8/8 07:12 战略纠偏)
- **文件**: `src/lib/seo.ts` (5 处) + `src/app/[locale]/{blog,about,case-studies,press-kit}/page.tsx` (4 模板)
- **diff 草稿**: `.hermes/k3-inbox/2026-08-08-0712-8-9-locale-switch-diff-for-k3-review.md` (9.6 KB)
- **核心**:
  - 加 `getSiteName(locale)` helper (zh-hk=智印港 / ja=ジープリント / en=zprintpro)
  - `siteConfig.alternateName` 删旧 brand 智印雲印刷, 加 ja ジープリント
  - `getSiteNAP()` zh-hk/ja/en 3 branch: name + alternateName + areaServed + knowsAbout
  - 4 page.tsx 模板 siteConfig.name → getSiteName(locale)
- **§0.7 验证**: 8 locale curl <title> + og:title + JSON-LD Organization.name 全过 §0.15 公式
- **§0.10 校准预期**: zh-hk SERP CTR +1-2% / branded search 智印港 0→1 / AI 引用 ≥2/4 → ≥3/4

### 2️⃣ 14 SKU 改字 (B 方案合并, 节省 1 build)
- **5 SKU JA**: a2-posters / outdoor-posters / fluorescent-stickers / kraft-paper-bags / textbooks
- **4 SKU EN**: small-batch-stickers (P0 第 1) / a2-posters / waterproof-stickers / saddle-stitch-booklets
- **5 SKU zh-hk**: same-day-flyers / a2-posters / doujinshi-printing / kraft-paper-bags / food-boxes
- **1 SKU 重复**: a2 + kraft (3 locale 共享, 总 11 不同 SKU object)
- **草稿**:
  - v2 JA/EN: `.hermes/k3-inbox/2026-08-08-0400-seo-ts-diff-for-k3-review.md` (13.7 KB)
  - v3 zh-hk: `.hermes/k3-inbox/2026-08-08-0430-zh-hk-sku-diff-for-k3-review.md` (15.4 KB)
- **§0.7 验证**: 8 locale PDP 抓 <title> 验证关键词命中

### 3️⃣ AGENTS.md §0.15/0.16 段新增
- **新增段**: §0.15 品牌一致性 P0 + §0.16 残留清理节奏 (跟 §0.10-0.14 同级)
- **位置**: AGENTS.md §0 之后 (跟现有 §0.1 攒批 / §0.6 紧急修复 / §0.7 production smoke / §0.8 Self-Reminder / §0.9 外链注册边界 / §0.10-0.14 同级)
- **内容来源**: MEMORY.md §0.15/0.16 (K3 8/8 07:12 + 15:35 拍板)

### 4️⃣ SSoT v9.0 + v5 同步 (cron + matrix)
- **`.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` v9.0** (61.4 KB, K3 7:12 已升级, working tree M)
- **`.hermes/industry-keyword-matrix.json` v5** (321.8 KB, K3 7:12 已升级, working tree M)
- **`.hermes/cron-prompts/zprintpro-daily-content-1x7w-zhhk-harvest.md`** (9.3 KB, zh-hk 收割子 cron)
- **`.hermes/cron-prompts/zprintpro-daily-content-1x7w-ja-formula.md`** (9.7 KB, ja 复制公式子 cron)
- **`.hermes/cron-prompts/zprintpro-daily-content-1x7w-en-grab.md`** (8.1 KB, en 抓强子 cron)
- **`.hermes/cron-prompts/zprintpro-daily-content-1x7w-gsc-strong-signal.md`** (8.7 KB, GSC 抓强监控子 cron)
- **总 87.8 KB 5 cron 卡** (K3 7:12 已落盘)

### 5️⃣ llms 8 副文件 (siteName locale 化)
- **3 副文件**: `public/llms.txt` + `public/llms-full.txt` + 8 locale 子文件
- **改法**: locale 化 siteName 引用, 跟 getSiteName(locale) 同源
- **§0.7 验证**: 8 locale llms.txt 抓 siteName 验证 zh-hk=智印港 / ja=ジープリント / en=zprintpro

### 6️⃣ GMC L1188 + schema-extensions.ts sku 补全 (per K3 8/8 14:56 + 15:35)
- **src/lib/seo.ts L1188**: 验证后**已是 locale 感知** (3 locale 三元), 不需改
- **src/lib/seo/schema-extensions.ts L520-536**: 加 `sku: product.slug` (PDP 实际 Product 段在这里, 117f9fc 改的 src/lib/seo.ts 没生效)
- **§0.7 验证**: 8 locale PDP 抓 JSON-LD Product 段验证 sku + returnFees (GMC 强烈建议)

### 7️⃣ Retrofit 锚点修复 (顺带, 1 file 1 hunk)
- **问题**: en/ja 段 5/6 锚点+FAQ H3 partial (per K3 8/8 15:35 §一 retrofit 46809c3 评分)
- **修法**: 动态解析 H3 锚点, 8/9 retrofit 任务 (baby-label / cmyk-guide) 用动态锚点脚本
- **§0.7 验证**: 8/10 跑 baby-label retrofit 后, 抓 <h3 id=""> 验证锚点

## 2. amend push 1 commit 1 push 1 build (B 方案)

**commit 范围 (7 项, ~10-15 files)**:
1. `src/lib/seo.ts` (locale 切换 5 处 + GMC L1188 验证, 不改)
2. `src/app/[locale]/blog/[slug]/page.tsx` (siteConfig.name → getSiteName)
3. `src/app/[locale]/about/page.tsx` (同上, + 8/8 14:43 工厂图 placeholder 隐藏 {false && (...)})
4. `src/app/[locale]/case-studies/page.tsx` (同上)
5. `src/app/[locale]/press-kit/page.tsx` (同上)
6. `src/data/products.ts` (14 SKU 改字 + 5 zh-hk brand 修复 in 2 SKU 块, 已 done 568087a)
7. `src/lib/seo/schema-extensions.ts` (sku: product.slug 补全)
8. `AGENTS.md` (§0.15/0.16 段新增)
9. `public/llms.txt` + `public/llms-full.txt` (8 locale 子文件) (siteName locale 化)
10. `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` v9.0
11. `.hermes/industry-keyword-matrix.json` v5
12. `src/data/blog-posts.ts` (retrofit cross-border-ecommerce-shipping-box-guide blog, 含末尾ジープリント 埋点)

**预估行数**: +200-300 / -50-100 (12 files, 7 项合并)

## 3. §0.7 production smoke 4 步 (B 方案必跑)

1. **encoding check**: 12 files 全 UTF-8 LF
2. **简体字守门**: zh-hk 产品名称纯繁体
3. **tsc --noEmit**: TypeScript 0 error
4. **npm run build**: ✅ Compiled successfully (必跑, per K3 8/8 15:35 §0.17 push 前必跑)
5. **git commit + push (force-with-lease if needed)**
6. **CF Pages build success verify-deploy.mjs**
7. **8 locale curl <title> + og:title + JSON-LD Product 段 验证 §0.15 公式**
8. **§0.7 /api/quote/ smoke 1 步 (HTTP 200 + UUID)**
9. **IndexNow ping 99 URLs (8 locale × 4 page types)**

## 4. K3 9:00 必拍 (4 字 5 增, K3 8/8 15:35 已简化)

### 4 字 + 1 增 (K3 8/8 15:35 简化版)
1. **X URL** ✅ (K3 9:00 提供)
2. **LinkedIn URL** ✅ (K3 9:00 提供)
3. **15 SKU 改字 K3 审字** ✅ (重点 ja 自然度 + zh-hk 纯繁)
4. **8/9 Org sameAs 改 K3 审 diff** ✅
5. **locale-aware siteName 切换 5 处改字 K3 审字** ✅ (新 P0, per K3 8/8 07:12 增补)
6. **IndexNow key** ✅ (K3 8/8 15:35 提前到 8/9 必提供)

### 4 件自跑 (K3 真实身份)
1. **CF Bulk Redirects 按修正版上线** (4-7 条 + 1 Edge Rule, 5 分钟事)
2. **GMC 诊断页查被拒数 + 确认 feed 抓取** (8/9 24h 后)
3. **Supabase 3 链** (fae355ba 8/7 + 4892080c 8/8 04:32 + 360e8366 8/8 05:22 + 117f9fc 8/8 15:22 实际 4 链, K3 9:00 dashboard 查)
4. **3 设备端到端** (Desktop Chrome / Mobile Safari / Android Chrome)
5. **formsubmit.co 激活** (8/7 18:45 触发的激活邮件, K3 点链接)

## 5. 配额 (per §0.17)

- **今日 8/8 push**: 4/5 (per K3 口径, 1 PASS + 1 FAIL 替代 + 1 PASS 117f9fc + 1 force-with-lease 算 1)
  - 实际 K3 8/8 15:35 说 "8/8 = 4 push 日配额" — 我之前数错, 应该是 4 push (1 normal + 1 fail + 1 amend force + 1 ?, 实际看 git log)
- **月累计 4/14**: 1 周 (8/1-8/7) push 数 + 8/8 push 数
- **8/9 整合 push 预期**: 1 push (B 方案 1 amend 1 build, 节省配额)
- **8/10-8/12 retrofit 3 push**: baby-label (8/10) + cmyk-guide (8/11) + cross-border retrofit (8/8 daily cron 10:15) 3 push
- **8/13/15/17 残留清理 3 push**: 3 批各 1 push
- **月累计 8/8-8/21 预期**: ~10-12 push / 150 (4-7-8%)

## 6. 8/8 14:43 反馈集成

- **about/page.tsx 工厂图 placeholder 隐藏** (K3 14:43 反馈): `{false && (...)}` 包裹 L386-401
- 已改但未 commit (working tree M), 8/9 整合 push 一起合

## 7. M3 "按最优执行" 自主范围

### 不需 K3 9:00 再确认 (per K3 8/8 15:35 简化拍板)
- §0.15/0.16 入 MEMORY ✅ (196.8 KB)
- §0.17/0.18 入 MEMORY ✅ (196.8 KB)
- src/lib/seo.ts L1188 验证 (locale 感知 ✅)
- 404 草稿修正版 (.hermes/k3-inbox/2026-08-08-1535-cf-bulk-redirects-corrected.md)
- 8/9 整合 push 总报告 (本文件, 6.5 KB)
- push 计数统一 (per §0.17)

### 等 K3 9:00 必拍 (4 字 5 增 + 4 件自跑, K3 8/8 15:35 已简化)
- 4 字 5 增: X / LinkedIn / 15 SKU 审字 / Org sameAs 审 diff / locale 切换 5 处审字 / IndexNow key
- 4 件: 3 设备端到端 / Supabase dashboard 查 (4 链) / formsubmit 激活 / CF Bulk Redirects 上线

### 8/9 触发条件
K3 回 "1-5 OK" + 4 件跑完 → M3 立即 10:15 amend push 1 effective (B 方案)

## 8. 升级 K3

K3, 8/9 整合 push 准备就绪:
- 7 项内容 (locale / 14 SKU / AGENTS.md §0.15/0.16 / SSoT v9.0+v5 / llms 8 副文件 / GMC sku 补全 / retrofit 锚点)
- B 方案 1 amend 1 build (节省 1 build 配额)
- §0.7 production smoke 4 步 (含 npm run build 必跑, per K3 15:35 §0.17)
- 12 files 改字范围 (~200-300 lines)
- K3 9:00 必拍 4 字 5 增 + 4 件自跑 → 10:15 amend push

报告: `.hermes/k3-inbox/2026-08-08-1535-8-9-integrated-push-checklist.md` (6.5 KB)
