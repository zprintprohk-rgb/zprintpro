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
- CSV 图片Alt 列利是封族污染（en/ja V22 疤痕 + ZH 500 MOQ 假值 4 条）——若未来 regen 管线回写 CSV→ts 会把好 alt 覆盖回污染值，建议 Wave-2 清 CSV（走源头修正再 regen，per SOP-5）。
