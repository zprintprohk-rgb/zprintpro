# 2026-08-10 长尾博客交付 · catalog-printing-guide

## 交付摘要
- **Slug**: `catalog-printing-guide` (畫冊印刷指南：攝影集・展覽圖錄・產品型錄 紙材裝訂全攻略)
- **GSC 依据**: 8/9 汇总导出 — 畫冊印刷 12 imp / pos 15.33 (首页边缘词), books 类目 = 全站 #2 印象类目 (136 imps)
- **Category key**: `printing` (无 'books' key, poster-printing-guide 同用 printing)
- **Commit**: `9924772` — 11 files, +1594/-1473
- **Push**: origin_ssh main (055d87e..9924772), git status 无 ahead ✅
- **CF Pages**: 线上 3 locale 页面 200 OK (check-runs API 延迟, 线上实测生效)

## 文件修改清单
| 文件 | 修改 |
|------|------|
| src/data/blog-posts.ts | +lpCatalogPrintingGuide meta (3 locale title/excerpt) + 追加入 blogPosts |
| src/data/blog-data/{zh-hk,en,ja}.json | +catalog-printing-guide content entry |
| src/app/[locale]/blog/[slug]/page.tsx | 3 locale posts 条目 + articleSlugs |
| public/sitemap*.xml ×6 | 重建 600→603 URLs (+3) |

## 内容质量
- zh-hk 4,258 chars (≥600 ✓) / en 6,515 / ja 4,078
- FAQ ×4 (每 locale) + Article/BreadcrumbList/FAQPage schema (page.tsx 提供)
- 内链 ×9 (category/books + catalog-printing + hardcover-books + perfect-bound-books + saddle-stitch-booklets + quote + book-buying-guide + yearbook guide)
- 品牌: zh-hk 智印港 ZprintPro / en ZprintPro / ja ZprintPro (8/10 品牌統一後首篇新内容)
- §13.10 NAP 脱钩: en/ja 标题无 Shenzhen/Hong Kong; zh-hk 香港场景
- CTA: WhatsApp wa.me/8619880851334 (198 号码, 8/7 phase-out 后标准)

## 6 步 Verify (zprintpro.com, Python urllib — MSYS grep 中文 locale bug 已绕过)
1. zh-hk HTTP 200 ✅
2. zh-hk grep "畫冊印刷" = 37 ✅
3. en grep "Art Book Printing" = 12 ✅
4. ja grep "カタログ・写真集" = 21 ✅
5. sitemap-zh-hk.xml grep slug = 5 ✅
6. FAQ Q1-Q4 = 8 (4×2) ✅
+ title/h1 正确 ✅ + 内链 5 条抽查全 200 ✅ + 智印印港 0 残留 ✅

## 预检 3 步 (push 前)
- [x] check-encoding.js — 11 files UTF-8 LF
- [x] scan-simplified.mjs — 0 简体残留
- [x] tsc --noEmit — 51 errors 全在 __tests__/ (pre-existing), 目录外 0
