# H1 去重优化报告

**日期**: 2026-07-14
**Commit**: 72d6b2b

## 问题根源

千问指出：H1 中出现两次"防水貼紙"
- `productTitle` = "防水貼紙" (来自 products.ts 的 name 字段)
- `kw1` = "防水貼紙" (来自 h1-builder.ts 硬编码)
- **结果**: 视觉重复，浪费字符空间 (35 字符限制)

## 解决方案

### 1. kw1 去重逻辑 (h1-builder.ts)

```ts
// 检查 productTitle 是否包含 kw1，避免重复
const kw1Safe = (kw1 && productTitle.includes(kw1)) ? kw2 : kw1;
```

**效果**:
- ❌ 旧 H1: `防水貼紙 · 防水貼紙 · 100張起印 · 香港貼紙印刷專家 · 智印雲` (35 字符)
- ✅ 新 H1: `防水貼紙 · 100張起印 · 香港貼紙印刷專家 · 智印雲` (30 字符，节省 5 字符)

### 2. en/ja 去重逻辑

```ts
// en: 检查 productTitle 是否包含 kw1
const kw1Safe = (locale === 'en' && productTitle.includes(kw1)) ? kw2 : kw1;

// ja: 去重卖点关键字
const sellingPointSafe = sellingPoint.replace(productTitle, '').trim();
```

### 3. 卖点库扩展 (SKU_SELLING_POINT_ZH_HK)

覆盖率从 6/26 提升到 24/26:
- ✅ P0 类目 (stickers, flyers, packaging, paper-bags): 14/14
- ✅ P1 类目 (posters, books, menus, red-packets): 8/9 (缺 1 个)
- ✅ P2 类目: 2/3

### 4. 自动化验收脚本

#### scripts/audit-h1-all-sku.mjs
- 随机抽取 5 个 SKU
- 检查 H1 长度 > 45 字符报警
- 检查分隔符 `|` 超过 3 个报警
- 检查脏数据 (? / 这款)

#### scripts/scan-simplified.mjs
- 直接扫描 products.ts 文件内容
- 检测 title_zh 和 name 字段中的简体字
- AGENTS.md §13.16.1 强制执行

## 千问建议融入

1. ✅ **H1 视觉验收自动化** — audit-h1-all-sku.mjs
2. ✅ **卖点库动态化** — SKU_SELLING_POINT_ZH_HK 覆盖率 92%
3. ✅ **kw1 去重逻辑** — productTitle 含 kw1 时跳过

## 验收结果

### 本地
- ✅ `npm run build` — Compiled successfully
- ✅ `node scripts/audit-h1-all-sku.mjs` — 5/5 SKU H1 正常
- ✅ `node scripts/scan-simplified.mjs` — 无简体字残留
- ✅ Pre-commit hooks — 通过

### Live (待 verify-deploy 验证)
- [ ] CF Pages build success
- [ ] H1 无视觉重复
- [ ] zh-hk 100% 繁体中文

## 下一步

### zh-hk (已修复)
- ✅ kw1 去重逻辑
- ✅ 卖点库覆盖率 92%
- ✅ 简体字检测脚本

### en (待优化)
- 当前使用 fallback 模板 (Waterproof Stickers | Global Shipping | ZprintPro)
- 需要根据 GSC 数据选择 Tier 1 美国长尾词
- 参考 AGENTS.md §13.15 en 美国市场集中优化策略

### ja (待优化)
- 当前使用 fallback 模板
- 需要日本市场本地化卖点
- 不出现"深圳""中国"前缀 (§13.10 NAP 脱钩)

## 技术债务

1. **卖点库覆盖率缺口**: 2/26 SKU 无卖点 (folded-brochures, japan-doujin 某些 SKU)
2. **en/ja 模板过时**: fallback 模板过于单薄，需升级为带 sharp hook 版本
3. **自动化验收不完整**: 未实现长尾词排名监控 (GSC 数据集成)