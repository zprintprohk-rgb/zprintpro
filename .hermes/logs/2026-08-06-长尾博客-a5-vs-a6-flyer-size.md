# 2026-08-06 长尾博客交付 · a5-vs-a6-flyer-size

## 交付摘要
- **Slug**: `a5-vs-a6-flyer-size` (A5 vs A6 傳單尺寸指南)
- **GSC 依据**: 8/5 7d 数据 A5/A6 flyer size 词群 ~14 imps (a5 vs a6 flyer pos 7 / a6 flyer size pos 14.5 / a5 flyers dimensions pos 11 / a6 flyers size pos 13 — 首页边缘可推)
- **Category**: flyers (P1, 非禁区)
- **Commit**: `a66af72` — 11 files, +1582/-1461
- **Push**: origin_ssh main (260831d..a66af72)
- **CF Pages verify-deploy**: PASS (runs/92592693618, build success, deploy live)

## 文件修改清单
| 文件 | 修改 |
|------|------|
| src/data/blog-posts.ts | +lpA5VsA6FlyerSize meta (3 locale title/excerpt) + 追加入 blogPosts |
| src/data/blog-data/{zh-hk,en,ja}.json | +a5-vs-a6-flyer-size content entry (62→63 keys) |
| src/app/[locale]/blog/[slug]/page.tsx | 3 locale posts 条目 + articleSlugs |
| public/sitemap*.xml ×6 | 重建 594→597 URLs (+3) |

## 内容质量
- zh-hk 3293 chars (≥600 ✓) / en 5403 chars / ja 3594 chars
- FAQ ×4 (每 locale) + Article/BreadcrumbList/FAQPage schema (page.tsx 提供)
- 内链 ×5 (category flyers + a5-flyers + a4-flyers + folded-leaflets + flyer-printing-guide)
- §13.10 NAP 脱钩: zh-hk 香港场景 / en US sharp hooks (Free Shipping $99+, same-day) / ja 日本配送 (ヤマト・佐川)
- §13.16.1 繁体: scan-simplified.mjs 0 残留; pre-commit hook 通过

## 6 步 Verify (zprintpro.com — zprintprohk.com 已失效, skill 内 URL 过时)
1. zh-hk HTTP 200 OK ✅
2. zh-hk grep "A5 定 A6" = 5 ✅
3. en grep "A5 vs A6" = 4 ✅
4. ja grep "A5 と A6" = 6 ✅
5. sitemap-zh-hk.xml grep slug = 5 ✅
6. FAQ "Q:" = 5 ✅
+ 内链 5 条全部 200 ✅ + 智印印港 0 残留 ✅ + en Shenzhen 仅 footer NAP ✅

## 附注
- 8/6 9:10 v8.2 daily cron 走 yield 跳过 (K3 凌晨 4 commit 占 quota), 本 18:30 SEO cron 按 cron 自动 commit 例外 + 强制执行约束正常 push 1 次
- matrix.json 改动 (v7-PDP-14 + session entry) 未 commit, 留给 8/7 9:10 cron 兑现
