# M3 任务卡 2026-07-22 v6:双品牌收尾 + gift-boxes 301 合并 + 大小写统一

> 优先级: P1 | 1 commit(攒批,1 次 build)| K3 已拍板,user 已批准
> 收入关联: 智印港品牌词 CTR 修复的关键是搜索结果标题(现状 CTR 10% vs 老站 64%);gift-boxes/rigid-boxes 互相抢词,合并后权重集中。
> 前置状态: logo 统一 gsc-logo.png 已上线 (f976813);alternateName 含智印港已上线;AGENTS.md 宪法已改 (36680bb 已 push)。

---

## Task 1: zh-hk 标题/H1 换「智印港」(v4 未完成部分)

现状: zh-hk 首页 `<title>` 仍是「智印雲 ZPrintPro | 香港印刷公司 | ...」(src/lib/seo.ts line 241),M3 v4 只做了 logo alt + schema,标题没换。

1. `grep -rn "智印雲" src/ --include="*.ts" --include="*.tsx" --include="*.json"` 全量列出
2. 替换规则(**只对 zh-hk 语境**):
   - 品牌名语境(title / H1 / hero / alt / og:title)→ 「智印港」
   - 已知热点: `src/lib/seo.ts` line 241 (zh-hk 首页 title)、line 707/781 注释提及处对应的 title 模板、line 1265 产品图 alt 模板;`src/data/blog-data/zh-hk.json` / `src/data/products.ts` / `src/data/sku-seo-data.ts` 里的 zh-hk 品牌后缀
   - 描述性/法律语境(Footer 公司信息、legal、schema name='智印雲')→ **不动**(schema name 保持实体稳定,智印港已在 alternateName)
3. ❌ en/ja 文件禁止出现「智印港」或「智印雲」汉字
4. 标题格式示例: `智印港 ZprintPro | 香港印刷公司 | 急件印刷·即日交貨 | 貼紙/單張/包裝盒定制`(注意 Task 2 的大小写一起改)

## Task 2: ZPrintPro → ZprintPro 大小写统一

现状: 部分标题写 `ZPrintPro`(错误驼峰),标准 = `ZprintPro`。
1. `grep -rn "ZPrintPro" src/ --include="*.ts" --include="*.tsx" --include="*.json"` 全量替换为 `ZprintPro`
2. 注意误伤: 域名 zprintpro.com 小写不动;代码标识符不动;只改用户可见文案
3. 已知热点: src/lib/seo.ts (line 241, 1265)、rush-printing-delivery/page.tsx、CompareTable.tsx、GeoFooterText.tsx、seo-keywords.ts

## Task 3: gift-boxes 301 合并进 rigid-boxes

数据依据 (28 天 GSC): gift-boxes 227 展示 pos 58-72,rigid-boxes 285 展示 pos 48-78,意图重叠互相抢词;类目 13 SKU → 12,一屏展示。

1. **301 重定向** — 在 `next.config.js` `buildGuideRedirects()` 里追加 (对齐现有规则格式,双 source 防尾斜杠环):
```js
// 2026-07-22 v6: gift-boxes 合并进 rigid-boxes (K3 拍板, GSC 数据互相抢词)
for (const locale of LOCALES) {
  rules.push({
    source: `/${locale}/product/gift-boxes`,
    destination: `/${locale}/product/rigid-boxes/`,
    permanent: true,
  });
  rules.push({
    source: `/${locale}/product/gift-boxes/`,
    destination: `/${locale}/product/rigid-boxes/`,
    permanent: true,
  });
}
```
2. **关键词并入**: rigid-boxes 的 title_zh/description/longDescription 吸收 gift-boxes 的核心词(禮品盒/精品盒/gift box),3 locale 同步(en 不带 Hong Kong,ja 不带 深圳/中国,§13.10/§13.13)
3. **quote 参数映射**: `/quote?product=gift-boxes` (GSC 17 次展示) — 找到 quote 页 product 参数解析处 (src/app/[locale]/quote/ 或 QuoteRedirect.tsx),加映射 `gift-boxes → rigid-boxes`,不留断点
4. **products.ts**: 删除 gift-boxes SKU 对象;类目页引用、关联推荐、blog 内链里所有 `product/gift-boxes` 链接改为 `product/rigid-boxes` (`grep -rn "gift-boxes" src/ public/ --include="*.ts" --include="*.tsx" --include="*.json"` 全量过)
5. **sitemap**: `node scripts/generate-sitemap.js` 重生成,gift-boxes 消失、rigid-boxes 保留
6. **matrix**: `.hermes/industry-keyword-matrix.json` 里 gift-boxes 相关条目指向 rigid-boxes
7. ❌ 不删 rigid-boxes/magnetic-closure-gift-box/drawer-slide-gift-box(差异化 SKU 保留,这是 13→12 的唯一删除项)

## 执行纪律(3 个 Task 1 个 commit)

1. **删文件/删 SKU 前必须 grep 引用**(K3 铁律,已连续 2 次踩坑:logo 删除事故 + 本卡 Task 3)
2. commit 前: `node scripts/check-encoding.js --fix` → `node node_modules/typescript/bin/tsc --noEmit 2>&1 | grep -v "__tests__\|No index signature\|missing the following"` 干净
3. commit message: `feat(seo): zh-hk 智印港 title/H1 + ZprintPro casing + gift-boxes 301 merge into rigid-boxes (13→12 SKU)`
4. `git push origin_ssh main`(严禁 origin / --force)→ `node scripts/verify-deploy.mjs` PASS 才报完成

## 验收清单(报完成时附 curl 原文)

1. `curl -s https://zprintpro.com/zh-hk/ | grep -oE "<title>[^<]*</title>"` → 含「智印港 ZprintPro」,不含「智印雲」不含「ZPrintPro」
2. `curl -s https://zprintpro.com/en/ | grep -c "智印港\|智印雲"` = 0;ja 同
3. `curl -s https://zprintpro.com/zh-hk/ | grep -c "ZPrintPro"` = 0
4. `curl -s -o /dev/null -w "%{http_code}" https://zprintpro.com/zh-hk/product/gift-boxes/` = 301 且 `%{redirect_url}` = .../rigid-boxes/
5. `curl -s "https://zprintpro.com/zh-hk/quote/?product=gift-boxes"` 页面产品字段显示 rigid-boxes(不空白/不报错)
6. `curl -s https://zprintpro.com/zh-hk/category/packaging/ | grep -c "product/"` 类目卡片 = 12
7. `curl -s https://zprintpro.com/sitemap.xml | grep -c "gift-boxes"` = 0
