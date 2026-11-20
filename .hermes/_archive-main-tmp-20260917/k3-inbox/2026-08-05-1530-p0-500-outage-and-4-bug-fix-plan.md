# 2026-08-05 15:30 K3 升级: 4 bug + P0 500 错

**触发**: K3 15:13 截图 3 张, 提 4 个 bug; M3 调查过程中发现 P0 (19/24 blog 详情页 500 错)

## 一、P0: 19/24 blog 详情页 HTTP 500 (c3b6f3f 引入)

**verify**: 24 URL 测试 (3 locale × 8 blog)
- OK=0, HTTP_ERR=19, SSL_ERR=5 (网络)

**根因** (M3 已定位):
- c3b6f3f (8/5 15:10 GSC cron 自动 commit) 改了 page.tsx, 引入 `blogCat` scope bug
- `const blogCat = inferBlogCategory(...)` 在 `else` 分支内 (block-scoped)
- 模板字符串 `<div data-debug-related>{... blogCat ...}</div>` 在外层引用
- if-branch 走时: `blogCat` 未声明 → ReferenceError → SSR 500

**影响**:
- ❌ GSC 索引的 79+ blog 详情页全部 500
- ❌ K3 8/12 验收 §6.4 Rich Results 100% 不可达
- ❌ K3 8/12 验收 §6.1 询盘 5 条 入口断

**修复 (1 文件 + 3 行)**:
```diff
-  let finalBlogCat: string;
-  if (post.category && validProductCategorySlugs.includes(post.category)) {
-    finalBlogCat = post.category;
-  } else {
-    const blogCat = inferBlogCategory({title: post.title, category: post.category});
-    finalBlogCat = blogCat;
-  }
+  let finalBlogCat: string;
+  let blogCat: string | undefined;  // hoisted for DEBUG marker
+  if (post.category && validProductCategorySlugs.includes(post.category)) {
+    blogCat = post.category;
+    finalBlogCat = post.category;
+  } else {
+    blogCat = inferBlogCategory({title: post.title, category: post.category});
+    finalBlogCat = blogCat;
+  }
```

## 二、K3 截图 3 张 4 bug 调查

| # | Bug | 根因 | 修复范围 |
|---|----|----|---------|
| 1 | 智印雲残留 zh-hk 标题 | 8/4 11:36 v8 标准只用于新 daily cron, 旧 80+ title 残留 | 1 文件 (blog-posts.ts) ~80 title 改 |
| 2 | cosmetics 归 packaging 错显示 海報 | 截图 tab 实际是 "全部文章" (active=all), 海報 tab 选中 K3 误读; categoryKey=packaging ✅ | 0 改 (误读, 实际正确) |
| 3 | cosmetics blog 排版杂乱 (无 v8 模板) | 8/4 11:36 拍板 v8 只用于 daily cron, 旧 68 篇没重写 | 1 文件 (blog-data/zh-hk.json) 全文重写 + 9 段 + table + Author Bio + Last Updated |
| 4 | related products 推错 SKU (第 3 次) | bc7cd62 DEBUG 揭露 `post.title?.[locale]` 永远 undefined + `post.categoryKey` 不存在; c3b6f3f 改用 `post.category` 但引 500 | 同 P0 修复一起 |

## 三、修复方案 (3 选项)

### A. 极小修 (1 commit, 救 P0)
- 修 finalBlogCat scope bug (3 行)
- 删 DEBUG marker (避免再踩雷)
- 改 calendar-printing-guide categoryKey: 'printing' → 'calendars' (否则 calendar 走 inferBlogCategory 推断不完美)
- §0.1 8/5 第 5 例外 push

### B. 中修 (1 commit, 救 P0 + 修 related 错推)
- A 全部
- 改 inferBlogCategory priority 1 title 关键词: 加 `盒` 单独 (匹配 "白卡彩盒" 等) / `paper bag` 已含 / 加 `shopping bag` (apparel 缺)
- §0.1 8/5 第 5 例外 push

### C. 全修 (1-2 commit, 救 P0 + 改智印云 + 改 v8 模板)
- A 全部
- blog-posts.ts zh-hk title ~80 处 智印雲 → 智印港 (脚本批量)
- 1 篇 cosmetics 排版升级 v8 (其余 67 篇后续 daily cron 排期)
- §0.1 8/5 第 5-6 例外 push (上限)

## 四、K3 拍板项

1. **P0 500 必须修 (不可延后)** — 选 A/B/C 修法?
2. 智印雲残留是 A 之外修, 还是攒批到 8/6 daily cron?
3. v8 模板重写 1 篇 (cosmetics) 是 A 之外修, 还是 8/3-8/9 68 篇审计后重写?
4. related 错推 (第 3 次) 是否 B 修法 + 1 cron self-reminder 监控?

**默认建议**: 选 A (P0 极小修), 智印云 + v8 模板 + related 全推 8/6 daily cron 攒批 (1 commit 1 push, 节省 quota)

## 五、verify 计划 (A 修后)
- npm run build PASS (本地)
- git push
- 24 URL 全部 HTTP 200 (5 SSL 排除)
- 4 blog × 3 locale = 12 URL related products 实际 SKU 跟类目匹配
- 2 K3 inbox 报告 (build PASS + verify PASS)
