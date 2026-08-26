# M3 任务卡 2026-07-24 v8:拼版彩盒 3 locale Q 级博客(Q-GR-01/02/03)

> 优先级: P0(matrix 队首 3 条,K3 已插队 boost 3/2/2)| 1 commit(攒批 1 build)
> 收入关联: 拼版彩盒 SKU 页已上线(3 locale 200),博客与 SKU 互链抢「拼版彩盒」香港零竞争词 + en/ja 高毛利长尾。
> 通用模板: `.hermes/context.md §4 Sub-task A` 全部规则生效(字数/结构/FAQ/内链/无图/路径),本卡只给差异化内容。
> ⚠️ 路径红线: 正文写 `src/data/blog-data/<locale>.json`(不是 public/);Meta 写 `src/data/blog-posts.ts`;slug 加入 articleSlugs;**写前 grep 变量名防重复声明**(7/21 撞车事故教训)。

---

## Blog 1: Q-GR-01(zh-hk 主攻,香港零竞争词)

- slug: `gang-run-card-boxes-hk-guide`
- categoryKey: `packaging` | source: `daily` | date: `2026-07-24`
- title:
  - zh-hk: `香港拼版彩盒印刷指南 · 免刀模費直降40%的預算首選 | 智印港 ZprintPro`
  - en: `Gang-Run Card Boxes Guide: No Die-Cut Fee, 40-60% Cheaper | ZprintPro`
  - ja: `合版カードボックス印刷ガイド:型代不要で40-60%削減 | ZprintPro`
- 字数: zh-hk 800-1000 字 / en 250-350 词 / ja 250-350 词
- 9 段结构主线: 什麼是拼版(共用刀模)→ 與專版差異對照表(價格/起訂量/交期/自由度)→ 4 種紙材(350g/400g 單粉卡、375g 銀卡、375g 鐳射銀卡)→ 3 種盒型 × 8 檔標準尺寸 → 免刀模費成本拆解(為何平 40-60%)→ 適合行業(零售精品/美妝/茶飲食品/文創)→ 不適合場景(自定義尺寸→轉介 white-card-boxes)→ 8-15 天交期說明(凑版逻辑,如实写)→ CTA
- 价格锚 ≥3 处(引 price-tables/gang-run-card-boxes.json,HKD ×1.5): 飛機盒 60x40x20 500 個 HK$129 起 / 扣底盒 90x60x30 1000 個 HK$358 / 鐳射銀卡 150x50x100 500 個 HK$920
- 内链 3-5 个(全部 matrix valid_internal_links 核对 + curl 200): `/zh-hk/product/gang-run-card-boxes/`(必含)、`/zh-hk/product/white-card-boxes/`(专版交叉)、`/zh-hk/category/packaging/`、可选 `/zh-hk/quote/`
- 4 FAQ(拼版 vs 專版 / 可否自定義尺寸 / 銀卡要不要印白墨 / 交期點解 8-15 天)
- 关键词自然覆盖: 拼版彩盒 / 免刀模費 / 白卡彩盒印刷 / 香港彩盒印刷 / 合版印刷
- ❌ zh-hk 100% 繁体;标题品牌后缀用「智印港 ZprintPro」(§13.6 双品牌已生效)

## Blog 2: Q-GR-02(en 美国,×2.2 高毛利 + Free Shipping hook)

- slug: `custom-card-boxes-small-batch-usa`
- categoryKey: `packaging` | source: `daily` | date: `2026-07-24`
- title:
  - zh-hk: `小批量彩盒訂製: 跨境電商賣家免刀模費方案 | 智印港 ZprintPro`
  - en: `Custom Card Boxes for E-commerce: 500 MOQ, No Die-Cut Fee, Free Shipping $99+ | ZprintPro`
  - ja: `小口カードボックス印刷:500個から型代不要・EC出品者向け | ZprintPro`
- en 正文 250-350 词,美国卖家视角: DTC/Amazon FBA 小批量补货痛点(die-cut fee $200-500 起步)→ gang-run 如何砍掉的 → 4 stocks / 3 styles / 8 sizes → 500-10,000 pcs → 8-15 day production + DHL 2-4 day shipping
- en sharp hooks 必含(§13.15): **Free Shipping $99+ / No Minimum 500 MOQ / Free design mockup / Made for USA small business**(注意是 Made for 不是 Made in)
- 价格锚(USD ×2.2): airplane box 500 pcs From $25 / lock-bottom 1,000 pcs From $51 / silver card From $119
- 内链: `/en/product/gang-run-card-boxes/`(必含)、`/en/product/white-card-boxes/`、`/en/category/packaging/`
- 4 FAQ(die-cut fee / FBA 尺寸合规 / 500 MOQ 能否多款混拼 / delivery to USA)
- ❌ en 全文不出现 Hong Kong / Shenzhen / China factory 前缀;supplier origin 只许"Asia factory + DHL 2-4 day"句式(§13.10)

## Blog 3: Q-GR-03(ja 日本,银卡差异化)

- slug: `cosmetic-card-boxes-gang-run-japan`
- categoryKey: `packaging` | source: `daily` | date: `2026-07-24`
- title:
  - zh-hk: `美妝彩盒拼版印刷: 銀卡/鐳射銀卡高級感包裝 | 智印港 ZprintPro`
  - en: `Cosmetic Card Boxes: Silver & Holographic Cardstock, No Die-Cut Fee | ZprintPro`
  - ja: `化粧品カードボックス合版印刷:銀カード・ホログラム対応・型代不要 | ZprintPro`
- ja 正文 250-350 词,日本美妆/杂货品牌视角: パッケージの高級感が棚前転換率を決める → 銀カード(印白墨)/ ホログラム銀カード(逆向UV)の質感差 → 型代不要で小ロット試作 → 500個から → 8-15日 + ヤマト運輸/国際便
- 价格锚(JPY ×2.2): airplane box 500 個 From ¥3,800 / 銀卡扣底盒 500 個 From ¥5,700 / 鐳射 500 個 From ¥7,400
- 内链: `/ja/product/gang-run-card-boxes/`(必含)、`/ja/product/cosmetic-boxes/`、`/ja/category/packaging/`
- 4 FAQ(銀カードに白墨は必要か / ホログラムと普通銀の違い / 小ロット試作 / 日本への配送)
- ❌ ja 全文不出现 深圳/中国/深セン 前缀(§13.10/§13.13)

---

## 统一执行 + 验收

1. 3 篇全部写完 → `node scripts/check-encoding.js --fix` → tsc(过滤 __tests__/No index/missing the following)→ `npm run build` 关键页面无新增错
2. commit: `feat(blog): gang-run card boxes 3-locale Q-blogs (Q-GR-01/02/03) — 香港零竞争词 + en/ja 高毛利长尾`
3. `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS
4. 验收 curl(报完成附原文):
   - 3 locale × 3 slug = 9 URL 全 200
   - `curl -s .../zh-hk/blog/gang-run-card-boxes-hk-guide/ | grep -c "<img\|cover"` = 0
   - en 篇 `grep -c "Hong Kong\|Shenzhen"` = 0;ja 篇 `grep -c "深圳\|深セン"` = 0
   - 内链逐个 curl 全 200
   - matrix.json covered[] 追加 3 条,queue 移除 Q-GR-01/02/03
