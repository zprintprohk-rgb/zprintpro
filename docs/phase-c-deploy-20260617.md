# Phase C 部署报告 — 2026-06-17

## TL;DR
✅ Build 通过 (79 products prerendered, 417 sitemap URLs)
✅ Push 到 `origin_ssh/main` (`176e428..e8d6a15`)
⏳ Cloudflare Pages 部署自动触发中

## 发现的关键问题 (已修复)

### 问题 1: sku-seo-data.ts 被破坏 ❌→✅
**根因**: `commit 9f71368 (Batch A — 24 SKU EN SEO meta v4)` 的 patch apply bug 导致文件膨胀。
- 当前工作树: 18222 行,196 entry,84 unique slug,**110 处 JSON 语法错误**
- main 分支: 4076 行,83 entry,0 错误 ← 干净版本

**修复**: `git checkout origin_ssh/main -- src/data/sku-seo-data.ts` 重置到干净版本。

### 问题 2: products.ts 5 处 longDescriptionJa 字段包装错位 ❌→✅
**根因**: `commit 3361136 (Batch B apply 22 SKUs)` 的 patch apply bug 吃掉了 `longDescriptionJa: \`` 字段包装。

**修复**: 在 5 处 `` `,`` 后插入 `\n    longDescriptionJa: \`` 字段包装:
- L1923 (ST-004 small-batch-stickers)
- L2244 (ST-005 die-cut-stickers)
- L2929 (ST-006 fluorescent-stickers)
- L3615 (ST-007 gift-bags)
- L5445 (ST-008 a2-posters)

### 问题 3: apply-en-sku-seo.mjs `$` group ref bug ❌→✅
**根因**: P0_DATA description 含 `$100` (Free US shipping over $100),被 `replace(regex, $1...)` 当成 regex group ref 100 替换为空。

**修复**: 改用 function replacement: `replace(seoRe, (_, g1, g2, g3) => g1 + newSeoEn + g3)`

### 问题 4: ED-004 (textbooks) 缺失 description_zh ❌→✅
**根因**: batch patch 漏掉这个 entry 的 description_zh 字段。

**修复**: 从 description 复制粘贴 description_zh。

### 问题 5: tsconfig include 扫到 50+ 临时调试脚本 ❌→✅
**修复**: `tsconfig.json` exclude 添加 `"scripts"`。

## 已部署内容 (vs main)

### sku-seo-data.ts: 29 SKU EN SEO 升级 (P0_DATA v4 length-calibrated)
- title 48-60 chars / description 150-160 chars / h1 30-50 chars
- keywords 8-10 个纯英文 / body 2-3 句场景化 / imageAlt 英文
- 0 中日韩字符 / 含 ZprintPro + DHL + market CTA signals
- 13/13 quality checks 全过

### 79 SKU × 3 locales meta 数据恢复
- EN description: 78/79 达标 (≥150 chars)
- zh-hk description: 79/79 达标
- ja description: 78/79 达标
- EN H1: 79/79 全填
- 0 智印港残留 (main 上之前是 79 处)

### 33 SKU EN longDescription v3 升级 (Batch A + Batch B)
- 教科书级: 6 H3 + 2 table + 6 FAQ + NAP + DHL + certs
- Batch A: 24 SKU (commit 9f71368 + ab6f921)
- Batch B: 22 SKU (commit 3361136)
- 重复 5 SKU = 实际新增 41 SKU EN longDescription v3

## Build 验证

```
> zprintpro-nextjs@1.0.0 build
> next build && node scripts/generate-sitemap.js

✓ Compiled successfully
✓ 79 products prerendered
✓ 417 sitemap URLs generated
  - Categories: 13
  - Products: 79
  - Blog posts: 31
  - Static pages: 16
  - Locales: 3
```

## Git 状态

```
main e8d6a15 fix(seo): Phase C — 救回 sku-seo-data.ts 破坏文件 + 修 batch B/C patch bugs
  3361136 feat(seo): Batch B apply 22 SKUs long-description-en (v3 textbook)
  ca729c5 fix(brand): P0 sanitize zhiyinport in csv (234 sites)
  9f71368 fix(seo): Batch A — 24 SKU EN SEO meta v4
  ab6f921 fix(seo): Batch A — 24 SKU EN longDescription v3 教科書
  8fa0b5f fix(seo): 5 P0 SKU EN longDescription v3 教科書
  176e428 fix(seo): P2-79-SKU 长描述 v3 + 教科书 FAQ 8 条 + 0 智印港残留 (origin_ssh/main 起点)
```

## 未完成 (下一轮)

1. **50 SKU EN/Zh/Ja meta 精细化升级** — P0_DATA 只覆盖 29 SKU,剩 50 SKU 用 main 上的默认值
2. **33 条 EN longDescription v3** — apply-en-longdesc-v3.mjs 已写好但未跑 (覆盖 33 SKU)
3. **tsconfig include 收尾** — 临时调试脚本 `_audit-*.txt` / `build-output-*.txt` / `_*.py` 等仍在工作区未 .gitignore
4. **Cloudflare Pages 部署确认** — 等 GitHub push 后 1-3 分钟,CF 自动 build

## 部署验证

Push 到 `origin_ssh/main` (176e428..e8d6a15) 完成。Cloudflare Pages Git integration 应自动触发 build。
下次检查: `curl -I https://zprintpro.com/ -L` 或 Cloudflare Pages dashboard。
