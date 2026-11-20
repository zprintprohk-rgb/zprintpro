fix(seo): §0.16 batch 1 残留 - 53 文件 101 类 旧 label 全清 (K3 8/12 11:50 全推拍板)

Per K3 8/12 11:50 "全推" + 8/12 10:55 PM 审核 §0.20.9 教训 (label 清理必 grep 全 src/):

fix(seo) §0.16 batch 1 残留 (8/11 db2cb5f 漏 53 文件, 8/12 e06c1d0 PASS 后 verify 发现):
- 53 文件 101 类替换:
  - 宣傳單張 → 傳單印刷 (zh-hk 纯繁體 + 加"印刷" 词, K3 8/11 10:41)
  - 包裝盒定制 → 包裝盒印刷 (簡→繁"制→製" + 加"印刷")
  - 海報定制 → 海報印刷 (同上)
  - 客製化 → 訂製 (簡→繁)
  - 单字"制"→"製" (含行末 + 中文标点, 全 src/ 繁體化)

受影响文件 (53):
- src/app/[locale]/about/page.tsx + blog/ + case-studies/ + category/ + payment-methods/ + press-kit/ + product/ + services/ + terms/ + trade-program/ (12 个 page)
- src/components/ (15 个: home/, category/, geo/, layout/, product/, quotation-widget, sections/)
- src/data/ (15 个: blog-data/, blog-posts, breadcrumb-names, buying-guides, category-seo-content, cluster-content, image-alt-map, pillar-content, price-tables/, product-faqs, product-seo, products, search-helpers, sku-seo-data)
- src/lib/ (8 个: h1-builder, popularity, pricing, seo-keywords, seo-related-queries, seo, quote-engine/)

豁免: business-cards 图片文件名 (189 处) 实际挂在 greeting-cards 产品下, 改文件名
     破坏 CDN URL, 收益为 0, 不动 (per K3 8/12 10:55 保守方案)

- scripts/cleanup/labels-residual-2026-08-12.py 新增 3.5KB (sweep 工具 + 全 src/ 验证)

验证: grep -rE "宣傳單張|包裝盒定制|海報定制|客製化" src/ = 0
4 个 grep 模式全清零 ✅

K3 8/12 11:17 §0.17 修订 "重要更新/优化不限量" 拍板:
- §0.16 batch 1 残留 = K3 战略层拍板 (840 行残留, 8/18 验收 grep=0)
- 适用 §1.2 例外: 立即推, 不受 5/天 限量

Push 台账: 8/12 push 4/5 = 月累计 20/150
