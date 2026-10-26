# E1/E4 无风险内链落位方案（子代理分析 + 执行层核验）

> 任务源: `docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md` §5.1 E1/E4（en 作战清单）
> 分析: 子代理 278dd484（只读分析，未改任何文件）+ 执行层独立核验（01:34-01:41）
> **执行状态: 待并发窗口**——对端会话 01:37:50 写入 src/data/sku-seo-data.ts（doujinshi C109 内链），§0.35.7 双条件②不满足，本轮未落 src
> 时间: 2026-10-27 01:41 Asia/Shanghai

## 结论速览

| 项 | 方向 | 状态 | 说明 |
|---|---|---|---|
| E1 | sticker-buying-guide → PDP | ✅ 已达标 | buying-guides.ts:147/115/179 三语已链 + relatedProducts |
| E1 | sticker category → PDP | ✅ 已达标 | buying-guides.ts 三语已链 |
| E1 | **sticker-guide(blog) → PDP** | ⚠️ **缺口可补** | blog-data/en.json:40 现有 4 个 PDP 链接但缺 small-batch-stickers |
| E4 | comiket-prep-guide → PDP | ✅ 已达标 | en.json:788 两条 |
| E4 | doujin-circle-guide → PDP | ✅ 已达标 | en.json:264 |
| E4 | comiket-c109 活动页 → PDP | ✅ 已达标 | page.tsx:294-296 CTA 按钮 |
| E4 | **zine guide → PDP** | ⚠️ 缺口 | en.json:731 锚 "doujin circles" |
| E4 | **PDP → comiket-prep-guide** | ⚠️ 缺口 | products.ts:6799 锚 "before Comiket" |
| E4 | **PDP → zine guide** | ⚠️ 缺口 | products.ts:6790 锚 "Saddle Stitch" 表格行 |
| E4 | PDP → C109 活动页 | 🔵 **对端在做** | 对端会话已写 sku-seo-data.ts 三语（01:37:50）——**本方案不再重复** |

## E1 具体落位（唯一可执行，待并发窗口）

1. **sticker-guide → /en/product/small-batch-stickers/**
   - 源: `src/data/blog-data/en.json:40`（sticker-guide 正文，H2 "What's the minimum order? Can I print small batches?" 下采购/总结段）
   - 锚: `small-batch restocking for cross-border sellers`（**唯一出现**，零新增文案）
   - 原文: `...Our low MOQ suits new brand testing, limited-edition campaigns and small-batch restocking for cross-border sellers.`
   - **落位形态（修正）**: 该文件全篇为 **HTML `<a>`（13 个）无 markdown**，既有内链均为无 class 普通 `<a>` → 落位:
     `...campaigns and <a href="/en/product/small-batch-stickers/">small-batch restocking for cross-border sellers</a>.`
   - ⚠️ 勿用 markdown `[text](url)`（sticker-guide 全篇 0 个 markdown 链接，避免风格不一）
   - ⚠️ blog-data JSON 属 lane.lock + §0.35.7 双条件保护区，执行前必查

## E4 落位（对端活跃期间不执行，留待 K3/下轮）

> ⚠️ 对端已做 PDP→C109（sku-seo-data.ts 三语），以下为**互补缺口**，避免与对端撞车：

1. **zine guide → /product/doujinshi-printing/**（blog JSON 无 locale 前缀写法，渲染自动 rewrite）
   - 源: `src/data/blog-data/en.json:731`（"Ready to print?" 采购段尾）
   - 锚: `doujin circles`（唯一出现）
2. **PDP → /en/blog/comiket-printing-prep-guide/**
   - 源: `src/data/products.ts:6799`（"Turnaround" 交期段）
   - 锚: `before Comiket`（**出现 2 次**，须用 `A 24-hour rush is available before Comiket; during peak seasons` 长上下文定位，禁 replace_all）
   - ⚠️ products.ts longDescription 无链接 rewrite，须写全量 `/en/blog/...`
3. **PDP → /en/blog/zine-small-batch-booklet-printing-guide/**
   - 源: `src/data/products.ts:6790`（Binding Options 装订表 Saddle Stitch 行）
   - 锚: `Saddle Stitch`（**多次出现**，须用 `<td>Saddle Stitch</td><td>8-64 pages</td>` 定位；备选 `lays fully flat for reading` 条目内唯一）
   - ⚠️ 同上，须全量 locale URL

## 目标 URL 存在性（子代理 grep 命中）

- `/en/product/small-batch-stickers/` = products.ts:951 ✓
- `/en/product/doujinshi-printing/` = products.ts:6683 ✓
- `/en/blog/comiket-printing-prep-guide/` = blog-posts.ts:2135 + en.json:784 ✓
- `/en/blog/zine-small-batch-booklet-printing-guide/` = blog-posts.ts:1941 + en.json:725 ✓
- `/en/blog/sticker-guide/` = blog-posts.ts:258 + en.json:34 ✓

## 纪律记录

- 子代理只读，未改任何文件 ✓
- 本方案执行前已发现对端写入 sku-seo-data.ts（01:37:50，doujinshi C109 内链 x3 语）→ 按 §0.35.7 双条件②，**本轮不落任何 src**
- E4 PDP→C109 对端已做，本方案**不重复**（幂等铁律）
- 数据来源行: 本方案锚文本均为源页既有精确词组（grep 行号已给），零新增文案
