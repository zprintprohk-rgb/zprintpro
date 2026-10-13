# 利是封 6 SKU 换血记录（2026-10-13）

## K3 指令
> 利是封印刷分类下SKU的图片也用新的图片替换，文件名，alt 等必须符合关键词SEO+AEO+GEO排名至首页的技术要求，深度思考理解问题，穷尽100%能力分析研究执行图片上传。

## 数据来源
- 代际对账：`.hermes/_rp_genesis.py`（sha256 三方：git cc479df1 / v28.6 commit / v28_5 源）+ `.hermes/_rp_compare.py`（70 差 2 缺）
- MOQ 真值：products.ts minQuantity=100 ×6（v28_5 EXIF/ledger「100個起印/100枚から」属实，无 10-11 闸2 错误 MOQ 角标问题——该问题经实锤仅限 hero/ 目录 48 张分类横幅，SKU 方图不在其列）
- alt 三源对照：sku-seo CSV 图片Alt标签列（**污染**：en/ja 为 "holiday cards, wedding invitations / 年賀状" V22 改名疤痕 + ZH 4 条为「500個起訂」笔记且 MOQ 与真值 100 矛盾 → 弃用）、v28_5 ledger（双品牌「智印港 ZprintPro」+「樣片/sample」后缀 + ISO 9001 → 弃用）、products.ts seoAlt（结构合规但 zh/en 缺品牌、ja 简中「紅包印刷」→ 升级）
- 手术+验证：`.hermes/_rp_swap.py`（18 alt 升级 + 72 文件 EXIF 重注）/ `.hermes/_rp_poison.py`（毒串 0）/ `_rp_audit.py` 结构复核

## 执行
1. **18 条 alt 升级为 GEO 公式终版**：`关键词簇(品类/工艺/场景) | 规格(g数/材質/無覆膜) MOQ 100 真值钩子 | 品牌`（zh=智印港 / en·ja=ZprintPro，单品牌分层）；ja「紅包印刷」→「ポチ袋印刷」（§13 本地化红线）。
2. **72 文件换血**：v28_5 RP-001..006 → 剥旧 EXIF/XMP（双品牌+樣片+ISO 清毒）→ 注入与 products.ts 逐字一致的新 EXIF alt（手写 TIFF type-2，Batch A 工艺复刻）→ 同名覆盖（文件名保持 SEO 关键词命名，零路径漂移）。
3. **cartoon ja 补位**：v28_5 全 4 视图 vs 现网仅 2 → 补 `-3`/`-4`，products.ts 数组 2→4。
4. **legacy 修指** ×6：jpg → webp hero（Batch B 同口径）。

## 门检
tsc 54=基线 / brand A 类 0 / EXIF 字节级 72/72 + 独立抽验 16/16 / 毒串 0（ja 零紅包）/ sitemap 1066→1068 图。

## 挂账
- ~~CSV 图片Alt 列利是封族污染~~ ✅ **当批已清**：CSV 6 行 × 3 列按 GEO 公式修正 → 官方 regen（csv-to-sku-seo.mjs --apply，断言 A-E 全过、0 漂移）→ sku-seo-data.ts imageAlt 落地。三源对齐：CSV = ts 渲染 = products.ts seoImages.alt = EXIF。

## 重大根因追加（18:0x 实锤）
- **PDP v9 线上渲染路径绕过 getProductImageAlt**：K3 2026-09-19 裁决后 v9 模板覆盖三语全 SKU，v9 的 `GalleryV9 alt={productTitle}`（短名）使 sku-seo imageAlt 全链长期不渲染（旧 ProductGallery 路径成死代码）。
- 修复：`ProductPageV9.tsx` L420 改接 `getProductImageAlt(product, locale) || productTitle`（commit `607591dc`）。
- 影响面 = **全站 PDP**：凡 sku-seo imageAlt 非空且过 isValidImageAlt 的 SKU（roll-stickers 等 Batch A 资产同批生效，已实测渲染 GEO 串），兜底链不变。
- 教训固化：「数据已修正但页面不生效」排查必须先到**线上实际渲染组件**（v9 门控），不能只验数据层。本轮三连踩坑同源：audit11 假开口 → place-cards 错靶 → v9 旁路，均为「看的不是线上真路径」。
