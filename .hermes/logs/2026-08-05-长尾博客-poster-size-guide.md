# 2026-08-05 长尾博客交付: poster-size-guide

## 交付摘要

| 项目 | 内容 |
|------|------|
| Slug | `poster-size-guide` (A1/A2/A3 海報尺寸指南) |
| GSC 依据 | a2 prints 15imp/pos61 + a1 posters 5imp/48 + a2 poster prints 5imp/67 + a2 ポスター印刷 4imp/57 + a2 海報 pos1 等 ≈ 60 imp, 排名 48-77 (20-80 区间) |
| Category | posters (P1 辅助类目) |
| Commit | `c177781` (c22d626..c177781 main -> main) |
| CF Deploy | ✅ success (runs/92281955683) |
| Sitemap | 594 URLs (zh-hk/en/ja 各 198, Blog 82) |

## 文件改动 (9 files, +215 -87)

| 文件 | 改动 |
|------|------|
| src/data/blog-posts.ts | +lpPosterSizeGuide meta (3 locale title/excerpt) + 加入 blogPosts[] + ja 14 处智印雲→ZprintPro |
| src/app/[locale]/blog/[slug]/page.tsx | 3 locale 各加 poster-size-guide 条目 (块内精确插入) + articleSlugs + zh-hk 块智印雲→智印港/ja→ZprintPro |
| src/data/blog-data/zh-hk.json | +poster-size-guide content (2405 字, FAQx4, 5 内链) |
| src/data/blog-data/en.json | +poster-size-guide content (499 词, FAQx4, 5 内链) |
| src/data/blog-data/ja.json | +poster-size-guide content (2475 字, FAQx4, 5 内链) + 46 处智印雲→ZprintPro |
| public/sitemap*.xml | 重建, 3 locale 各含 poster-size-guide |

## 内容质量达标

- zh-hk 2405 字 (>=600 ✅) / en 499 词 / ja 2475 字
- FAQ x4 ✅ | 无 <img> ✅ | 3-5 内链 (5 条, 全有效路由) ✅
- Schema: Article + BreadcrumbList + FAQPage (page.tsx 内置) ✅
- 无竞品词/无名片内容 ✅ | 简体扫描 0 残留 ✅

## 品牌残留修复 (4fix 遗留, 同 commit)

- page.tsx: 智印雲 24 处 → zh-hk 块改智印港 / ja 块改 ZprintPro
- blog-posts.ts: 智印雲 14 处 (ja) → ZprintPro
- ja.json: 智印雲 46 处 → ZprintPro
- 线上验证: en/ja 页面 0 智印港, zh-hk 4 处智印港 ✅

## 6 步 verify 结果 (全部 PASS)

| # | 检查 | 结果 |
|---|------|------|
| 1 | /zh-hk/blog/poster-size-guide/ HTTP | 200 OK ✅ |
| 2 | zh-hk 关键词「海報尺寸」 | 3 ✅ |
| 3 | en 关键词「Poster Size Guide」 | 3 ✅ |
| 4 | ja 关键词「ポスターサイズ」 | 3 ✅ |
| 5 | sitemap-zh-hk.xml 含 slug | 5 ✅ |
| 6 | FAQ「Q:」 | 5 ✅ |

en/ja 页面 200 ✅ | pre-commit 3 检查全过 (UTF-8 LF / 简体 0)

## 明日选题建议

`a5-vs-a6-flyer-size` — A5/A6 flyer 尺寸对比专页 (a5 flyer size 4imp/62 + a5 vs a6 flyer 2imp/7 + a6 flyer size 2imp/14 + a5 and a6 which is bigger 1imp/34 ≈ 14 imp, 排名 7-62)。现有 flyer-printing-guide 标题未含 A5/A6 具体尺寸词, 与今日 poster-size-guide 同模式。
