# E1/E4 无风险内链落位方案（子代理分析 + 执行层核验）

> 任务源: `docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md` §5.1 E1/E4（en 作战清单）
> 分析: 子代理 278dd484（只读分析，未改任何文件）+ 执行层独立核验（01:34-01:41）
> **执行状态: E1 ✅（2026-10-27 02:13 push dfe5132f 上线 + 线上双方法验收）· E4 ✅（2026-10-27 02:43 commit 01b2d306，三缺口全部落位，push 待窗口）**
> 时间: 2026-10-27 02:49 Asia/Shanghai（状态更新）

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

## E4 落位（2026-10-27 02:40 执行，commit 01b2d306）

> ⚠️ 对端已做 PDP→C109（sku-seo-data.ts 三语，bb7b157c），以下为**互补缺口**执行结果：

1. **zine guide → /en/product/doujinshi-printing/** ✅
   - 源: `src/data/blog-data/en.json`（zine-small-batch-booklet-printing-guide content）
   - 锚: `doujin circles`（全局唯一 1 次、0 锚内命中——**双方法 dump 修正 01:53 误判**：原文 `doujin circles should start with the <a href="/en/blog/doujin-circle-printing-guide/">doujinshi printing guide</a>`，`doujin circles` 为独立纯文本，无锚点冲突）
   - 落位形态: `; <a href="/en/product/doujinshi-printing/">doujin circles</a> should start with the <a href="/en/blog/doujin-circle-printing-guide/">doujinshi printing guide</a>.`
2. **PDP → /en/blog/comiket-printing-prep-guide/** ✅
   - 源: `src/data/products.ts:6799`（Turnaround 交期段）
   - 锚: `before Comiket`（长上下文 `A 24-hour rush is available before Comiket; during peak seasons` 唯一，禁 replace_all）
   - 形态: `A 24-hour rush is available <a href="/en/blog/comiket-printing-prep-guide/">before Comiket</a>; during peak seasons`
3. **PDP → /en/blog/zine-small-batch-booklet-printing-guide/** ✅
   - 源: `src/data/products.ts:6790`（Binding Options 装订表 Saddle Stitch 行，`<td>Saddle Stitch</td><td>8-64 pages</td>` 唯一）
   - 形态: `<td><a href="/en/blog/zine-small-batch-booklet-printing-guide/">Saddle Stitch</a></td><td>8-64 pages</td>`

- 备份: `.hermes/_bak-blogdata-en-before-e4-20261027.json` + `.hermes/_bak-products-before-e4-20261027.ts`。
- 门禁: encoding ✓ / brand A 类 0 ✓ / tsc 54=54 持平 ✓ / JSON 三重解析 ✓ / diff 3 文件 4 行 ✓。
- 线上预基线（push 前 @02:45）: 三锚精确全串均未出现 → push 后出现 = 确定性归因；既有 `href="/en/product/doujinshi-printing/"` 2 处为自动 related-card 网格（非 content 锚）。

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
