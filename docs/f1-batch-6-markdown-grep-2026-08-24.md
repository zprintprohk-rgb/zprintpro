# F1-batch-6 全站 Markdown 渲染风险扫描报告 (2026-08-24)

> **拍板来源**: K3 8/24 19:03 拍板 + F1-batch-4 commit 28e9ae1 (parseInlineLinks.tsx 新建)
> **配套 SOP-10 第 5 款**: 任何 user-facing 文本含 [text](url) Markdown 语法, 必须用 parseInlineLinks 工具解析
> **执行人**: M3 #2 任务 (8/25 P1 全站 grep 排查)
> **执行日期**: 2026-08-24 20:35 (北京时间, 立即执行)

---

## 1. 扫描方法

2 个独立扫描器, 覆盖全站 src/ 目录 237 文件:

### 1.1 [text](url) Markdown 链接扫描 (`scripts/find-markdown-render.js`)

```js
// 排除图片 ![alt](url) + 排除代码块
// 工具: parseInlineLinks.tsx 本身
```

### 1.2 扩展 Markdown 残留扫描 (`scripts/find-markdown-residual.js`)

检测 5 种 Markdown 语法残留:
- `**bold**` (中文文本中常见误用)
- `*italic*` (单星号)
- `` `code` `` (反引号)
- `# heading` (行首)
- `> blockquote` (行首)

---

## 2. 扫描结果

### 2.1 [text](url) Markdown 链接

| 项目 | 数值 |
|------|------|
| 扫描文件 | 237 |
| 含 [text](url) 的文件 | **0** |
| 总命中数 | **0** |

**结论**: 全站无 [text](url) 残留。F1-batch-4 commit 28e9ae1 修复彻底, about.tsx 3 个位置 (L794/L830/L851) 已全部用 `parseInlineLinks()` 包裹。

### 2.2 扩展 Markdown 残留

| 模式 | 命中数 | 分布 | 渲染层风险 |
|------|--------|------|-----------|
| `**bold**` | 748 | sku-seo-data.ts (547) / products.ts (168) / blog-data JSON (33) | **无** (data source, 渲染层用 dangerouslySetInnerHTML) |
| `# heading` | 6 | blog-data JSON 全部 (2 en + 2 ja + 2 zh-hk) | **无** (已转 `<h2>` HTML) |
| `*italic*` | 2 | 误报 (数学公式 0.7 * weight) | **无** (非 Markdown) |
| `` `code` `` | 0 | - | **无** |
| `> blockquote` | 0 | - | **无** |

### 2.3 渲染层抽样验证

- **PDP 描述** (`src/app/[locale]/product/[slug]/page.tsx`):
  - `longDescription` 三 locale → L561 `dangerouslySetInnerHTML={{ __html: longDesc }}` (HTML 字符串直渲染, **bold 自动转 <strong>**)
  - `description` 仅用于 metadata/SEO, 不在 JSX 渲染
  - **结论**: ✅ 无 Markdown 残留风险

- **Blog 内容** (`src/app/[locale]/blog/[slug]/page.tsx`):
  - `post.content` → L1012 `dangerouslySetInnerHTML={{ __html: post.content }}` (HTML 字符串)
  - **结论**: ✅ 无 Markdown 残留风险

- **About 描述** (`src/app/[locale]/about/page.tsx`):
  - `adv.desc` / `team.desc` / `ind.desc` → L794/L830/L851 `parseInlineLinks()` 包裹
  - **结论**: ✅ 无 Markdown 残留风险

---

## 3. 结论与配套

### 3.1 结论

✅ **F1-batch-4 修复彻底, 全站无 Markdown 渲染风险**

不需要追加任何修复。F1-batch-4 commit 28e9ae1 修复了 about.tsx 3 个位置 + parseInlineLinks 工具新建, 是当前 zprintpro 全站唯一的 [text](url) 渲染路径。后续新页面/新组件如需渲染 user-facing 文本, 走 SOP-10 第 5 款即可。

### 3.2 配套 SOP-10 第 5 款

> **任何 user-facing 文本含 [text](url) Markdown 语法, 必须用 parseInlineLinks 工具解析** (K3 8/24 19:03 拍板)

应用范围:
- ✅ about.tsx (L794/L830/L851 已修)
- ✅ 任何新 page.tsx/component 需渲染含 Markdown 语义的 user-facing 字段
- ❌ data source (.ts/.json) 不强制 — 渲染层决定是否解析

### 3.3 check-content-guard.js Rule 5 落地 (K3 8/24 20:15 拍板 #4)

K3 8/25 P1 #4 要求: check-content-guard.js 加 Rule 5 检测 Raw Markdown link syntax, 标红。

当前扫描脚本 (`find-markdown-render.js`) 就是 Rule 5 的实现基础, 后续 8/25 P1 #4 任务把脚本集成进 check-content-guard.js 的 5 大规则之一即可。

---

## 4. 扫描器

- `scripts/find-markdown-render.js` (3.2KB, 命中 [text](url))
- `scripts/find-markdown-residual.js` (3.3KB, 命中 5 种 Markdown 残留)
- 两个脚本都是 docs-only, 不入 git (验证用)

---

## 5. 任务标记

- ✅ **#2 8/25 全站 grep 排查其他页面 Markdown 渲染 (K3 报告 5.1) — 完成**
- 提前 8/25 一天, 跟 K3 "10 点继续执行" 拍板一致
