# 2026-07-08 Layer A SEO 升级 (类目 hub + 2 SKU 拓点 + 调度算法 SKILL.md)

## 任务来源

User 提的三块大活:

1. 13 类目页 Layer A SEO 升级 (TDK + H1 + 內链 + Schema + brand 简化) ✓
2. 2 SKU 调整: educational = 畢業紀念冊, packaging = 化妝品包裝盒 ✓
3. 创建 industry-keyword-matrix.json + 更新 SKILL.md / context.md ✓

## 实现路径

### 1. 类目页 Layer A hub-and-spoke (13 类目)

**新增源数据** (`src/lib/seo.ts`):
- `CATEGORY_INDUSTRIES`: 14 类目 × 3 locale = 42 行业映射 (商业名片走 §11 禁区, 13 类目注入)
- 涵盖 Tier A 高复购 + Tier B 中频, NAP 脱钩 (不写 Shenzhen/香港 残留)

**meta 升级** (`src/lib/seo.ts` `generateCategoryMetadata`):
- description 末尾追加 ` 适配行业: ${industries.join('、')}` (zh-hk/en/ja 各一套)
- NAP 一致性 + Tier A 行业关键词注入, 不动 title (customH1Map 已优)

**UI 升级** (`src/app/[locale]/category/[slug]/page.tsx`):
- 新增 `<CategoryIndustries>` 组件 (191 行新增)
- 渲染三层: 子标题 + 5 个 industry tags (Tier A 蓝 / Tier B 琥珀) + cross-link 到 matrix covered blogs
- 已铺博客的 8 个类目 (flyers/packaging/stickers/paper-bags/posters/menus/red-packets) → 真 cross-link
- 没铺博客的 5 个类目 → 显示 industry tags + placeholder 文案

### 2. 2 SKU 拓点 (`src/data/products.ts`)

| ID | slug | category | industries |
|----|------|----------|------------|
| ED-005 | graduation-yearbook | educational | 教育培訓 |
| PKG-011 | cosmetics-packaging-box | packaging | 美妝護膚 |

**完整 schema**: title_zh/en/ja + longDescription (含 9 段结构 + 4 FAQ) + description × 4 语言 + features + specs + imagesByLocale (zh-hk × 2 / en × 2 / ja × 1) + seoImages + price_range + basePrice + minQuantity

**NAP 脱钩 (3 locale)**: zh-hk 走香港本地, en 走全球通用卖点, ja 走日本市场 — 无 "深圳/Shenzhen/Hong Kong" 硬塞词

### 3. Matrix + SKILL.md + context.md

**Matrix** (`.hermes/industry-keyword-matrix.json`):
- Q-008 (educational / graduation-yearbook / 教育培訓 / A / P1) + 加 valid_internal_links 6 个 (cross-link 进 SKU + 类目页)
- Q-009 (packaging / cosmetics-packaging-box / 美妝護膚 / A / P1) + valid_internal_links 6 个
- stats 更新: queue_size 14→16, p1_total 4→6
- 等待 daily-content-evolve cron 覆盖 (写对应博客)

**SKILL.md** (单源):
- 创建 `C:\Users\Administrator\.mavis\agents\mavis\skills\zprintpro-seo-evolve\SKILL.md`
- 落地 context.md §7 要求 "写进 SKILL.md §3.8"
- 章节: 项目硬规则 / 4 cron 任务 / 4 sub-task / §3.8 调度算法 / 7 步 verify / R6 协议退出条件 / Anti-patterns / 链接红线 / 异常上报 / Changelog

**context.md**: §7 改为 "见 SKILL.md §3.8", cron prompt 加载后会直接读 §3.8

## Deploy

- Commit: `ddd12e9`
- CF Pages run: `85869231777` (success)
- 推送时间: 2026-07-08 20:18+ Asia/Shanghai
- 全量 sitemap 重建: 2026-07-08 14:56

## 7 步 verify (per context.md §13.1)

| Step | 检查项 | 结果 |
|------|--------|------|
| 1 | `git status -sb` 无 ahead | ✅ |
| 2 | sitemap 是今天的 (≤ 24h) | ✅ 2026-07-08 14:56 |
| 3 | curl 6 新 SKU URL × 3 locales 全 200 | ✅ 6/6 |
| 4 | 主关键词出现在 body | ✅ zh-hk 180 / 175 hits |
| 5 | schema JSON-LD 注入 | ✅ 22 hits (BreadcrumbList/ItemList/HowTo/FAQPage/Organization) |
| 6 | 无 `<img>`/`cover` | ✅ N/A (类目 + SKU 页不写 blog) |
| 7 | matrix covered 反查一致 | ✅ Q-008 + Q-009 queue 在位 |

## Layer A UI 行为验收

```
URL                                              | 服務行業 | 内链slug数
------------------------------------------------|---------|----------
/zh-hk/category/packaging/                       | 2       | 8
/zh-hk/category/stickers/                        | 2       | 6
/en/category/stickers/                           | 2       | 6
/ja/category/stickers/                           | 2       | 6
/zh-hk/category/educational/ (empty placeholder) | 2       | 0
/zh-hk/category/calendars/ (empty placeholder)   | 2       | 0
/zh-hk/category/japan-doujin/ (empty placeholder)| 2       | 0
```

`cross_links=0` 类目走 placeholder 是有意的: 不出现 broken link, 但仍显示 industry tags + "更多行業內容將陸續更新" 文案 — 等 daily cron 陆续铺博客后自动转 cross-link。

## NAP vs SEO 脱钩 (AGENTS.md §13.10 / §13.13)

✅ **2 个新 SKU 三 locale 标题**: zh-hk 香港本地场景 / en 全球卖点 (size/paper/design/material) / ja 日本市场 — 零 "Shenzhen" / "Shenzhen Printing" 硬塞

✅ **2 个新 SKU description**: 
- zh-hk 走"香港中學大學院校定制" 路径
- en 走"Asia factory + DHL 2-4 day global delivery" 路径  
- ja 走"中国深セ自社工場・DHL 国際配送 2-4 日" (正文允许工厂地点)

✅ **3 locale TDK 都不同** (zh-hk/en/ja 独立策略, 非机翻)

## CF Pages 月度 quota (AGENTS.md §11.5)

- 本次 1 push = 1 build, 月底统计正常
- Pre-commit hook 自动检 UTF-8 + LF (避免 UTF-16 污染)
- @cloudflare/next-on-pages 加 `--legacy-peer-deps` (53f2a4f commit 已固化)

## 后续动作 (waiting on cron)

| 任务 | 频率 | 触发 |
|------|------|------|
| Daily cron 写 Q-008 博客 | 等 10:15 cron | graduation-yearbook-printing-guide |
| Daily cron 写 Q-009 博客 | 等 10:15 cron | cosmetics-packaging-box-printing-guide |
| Weekly meta refresh | 周一 11:00 | 拉 GSC → 更新类目 H1 |
| GSC feedback loop | 周三 15:00 | 写回 priority_boost |

**Author**: mavis orchestrator (Session mvs_8bf28272b6704ccfad3fe5ff2f1da72b, AGI 调度)
**Module**: zprintpro SEO self-evolve (Layer A 落地 2026-07-08 v5)
