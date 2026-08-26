fix(seo): §0.16 batch 2 - products.ts 智印雲 985 处 context-aware 替换 (K3 8/12 11:50 全推拍板)

Per K3 8/12 11:50 "全推" + §0.15 公式 (zh-hk=智印港 / en=ZprintPro / ja=ジープリント):

fix(seo) §0.16 batch 2:
- src/data/products.ts 智印雲 → locale-aware brand 替换:
  - 步骤 1: 全文 智印雲 → 智印港 (zh-hk 默认, 985 处)
  - 步骤 2.ja: longDescriptionJa 字段内 智印港 → ジープリント (334 处)
  - 智印港 654 残留 (zh-hk 字段, 适用, 不动): title_zh/name/description/longDescription/description_zh

- scripts/cleanup/brand-locales-products-2026-08-12.py 新增 3.7KB
  (context-aware 替换工具, 用 regex 锁定 en/ja 字段范围)

en 字段 (nameEn/descriptionEn/longDescriptionEn) 没有"智印港"残留 (原本就用 ZprintPro, 不变)
- 跨 locale 段落 (longDescription 跨 3 locale 复用) 内"智印港" 是 zh-hk brand 注释, zh-hk 字段适用, 不动
- en/ja 文本里"智印港"残留 (如 "ZprintPro(智印港)") 是历史品牌注释, 8/13 push 5 §0.16 batch 3 处置

K3 8/12 11:17 §0.17 修订 "重要更新/优化不限量" 拍板:
- §0.16 batch 2 = §0.15 品牌一致性升级 (3 locale 终极版, 跨项目 P0)
- 适用 §1.2 例外: 立即推, 不受 5/天 限量

Push 台账: 8/12 push 5/5 = 月累计 21/150
