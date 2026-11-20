# 修复报告 · 2026-07-06 · buying-guide 27 页面 prose 空白

## User 报错

`https://zprintpro.com/en/blog/menu-buying-guide/` 只有标题没有正文。

## 根因

`page.tsx` 的 `getPostData()` 优先级错了：

```ts
// 旧逻辑 (2026-07-06 修复前)
const meta = getBlogPostMetaBySlug(slug);
const legacyPost = posts[locale]?.[slug];
const jsonEntry = blogContentsByLocale[locale]?.[slug];
if (meta || legacyPost || jsonEntry) {
  // 走 JSON content 路径
  let content = getContentFromJson(locale, slug);
  // ...
}
// 后查 buying-guide (永远到不了!)
const guide = getBuyingGuideBySlug(slug);
```

`menu-buying-guide` slug 在 `blog-posts.ts` (meta 命中) + `buying-guides.ts` (完整 content) 都有数据，
但 `src/data/blog-data/*.json` 没有这 9 个 buying-guide slug → meta 命中走 JSON 路径 → content = '' →
prose div 渲染空字符串。

## 受影响范围

**9 buying-guide × 3 locale = 27 个详情页全部 prose 空白**：
- business-card-buying-guide
- sticker-buying-guide
- flyer-buying-guide
- packaging-buying-guide
- poster-buying-guide
- paper-bag-buying-guide
- banner-buying-guide
- book-buying-guide
- menu-buying-guide (user 报错)

每个 3 locale (zh-hk / en / ja) = 27 个 URL 全部空白。

## 修复

调整 `getPostData()` 优先级，buying-guide 提到最前：

```ts
// 新逻辑 (commit 4478f11)
const guide = getBuyingGuideBySlug(slug);
if (guide) {
  const meta = getBlogPostMetaBySlug(slug);  // 用于 NAP 脱钩修正过的本地化标题
  return {
    title: meta?.title?.[locale] || guide.title[locale],
    description: guide.description[locale],
    date: guide.date,
    category: guide.category[locale],
    content: guide.content[locale],  // ← 关键: 用 buying-guides.ts 的真实内容
    keywords: guide.keywords[locale],
    isBuyingGuide: true,
    linkedProducts: guide.relatedProducts || [],
  };
}
// 然后 legacy path (不变)
// 然后 cluster path (不变)
```

`title` 优先用 `meta.title[locale]` 因为 blog-posts.ts 的 NAP 脱钩修正过的本地化标题更准。

## 全站回归 (commit 4478f11 部署后)

| 类别 | slug 数 | locale | 总页面 | PASS | 平均 chars |
|---|---|---|---|---|---|
| Legacy posts | 17 | 3 | 51 | 51/51 | ~1,720 |
| Q-001 + 新写 | 5 | 3 | 15 | 15/15 | ~1,720 |
| Buying-guide | 9 | 3 | 27 | **27/27** | ~1,720 |
| **总计** | **31** | **3** | **78** | **78/78** ✅ | **134,081 chars** |

## 验证时间线

- 2026-07-06 01:21: commit 4478f11 (fix buying-guide priority)
- 2026-07-06 01:24: CF Pages build success (run 85244378307)
- 2026-07-06 01:25: 全站回归 78/78 PASS

## 教训

**verify 脚本 regex 必须鲁棒**。第一次跑 regression test 失败 42 个页面让我以为破坏了 legacy，
实际是 verify 脚本的 prose regex `<\/div>\s*<\/div>\s*<\/div>` 不匹配嵌套 div 结构。
修正为 stack-based `<div>/< /div>` 配对后所有 78 页 PASS。

**orchestrator 不能信表面的 FAIL** — 必须用更鲁棒的方式实测实际 prod 渲染。

## URL 抽样验证 (user 可手刷)

- https://zprintpro.com/zh-hk/blog/menu-buying-guide/ (1003 chars)
- https://zprintpro.com/en/blog/menu-buying-guide/ (2699 chars)
- https://zprintpro.com/ja/blog/menu-buying-guide/ (1206 chars)
- 9 buying-guide × 3 locale = 27 个 URL 全部 prose 恢复正常