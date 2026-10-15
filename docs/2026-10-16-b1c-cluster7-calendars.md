# 2026-10-16 B1c 簇7 calendars 六 SKU 重写 — v2 方案 §3 10/16 档交付

> **触发**: K3 v2 方案 `docs/2026-10-16-two-week-execution-plan-v2.md` §3 10/16「簇 7 开工：calendars 族 ×3 语重写（带价格口径逐 SKU 核对）」
> **数据来源**（§0.23 强制行）:
> - products.ts 六 SKU 一手直读（L4276/4351/4435/4523/4612/4702）：全家 6/6 = price_range 'HK$3-8/本' / basePrice 3 / basePrice_en 0.40 / basePrice_ja 50 / minQuantity 1
> - CSV rows 39-44 病灶一手 dump + N-corner 扫描（desc 0.87-0.96 克隆族）
> - 校准状态: 已校准（2026-10-16 04:2x-05:0x 本 run 一手）

## 一、病灶清单（修前实测）

| 病灶 | 面 |
|---|---|
| desc 三语全家克隆 | word-Jaccard 0.87-0.96（15+ 对 >0.5） |
| 假 MOQ 三杀 | zh「50 本起」/ ja「50冊〜」/ en「100-MOQ...100 MOQ」（真值 minQ 1） |
| 假交期 | zh「7-10 個工作天」/ ja「7-10営業日」（真值口径：數碼 3-5 / 柯式 5-7，站点日历类目 techSpecs 已发布口径） |
| 假材质 | 「250g 銅版紙/啞面」全家同串（各 SKU 真材质：wall 300g / desk 200-250g+灰板 / custom 250-300g 藝術紙 / mini 150-200g / photo 250-300g 相紙 / magnetic 200-250g+軟磁片） |
| alt 串优 | custom/mini/photo-frame/magnetic altZH =「一般為50本起訂…」FAQ 答案 ×4；altEN 全家「wire-bound spiral」错材质（desk/magnetic/photo/mini 并非金属圈） |
| keywords 交叉污染 | wall kwZH 含「相框年曆」（兄弟 SKU 头词）；kwJA 全家共享尾模板；custom「custom custom calendars」结巴 +「定制」简体字形 |
| CSV zh FAQ 列 | 惰性数据但三病俱全（假 MOQ / 定制简体 / 7-10 天），SOP-5 源头清毒 |
| ts body | 六块主体已是前会话差异化好内容；仅 desk/custom 各 1 句「下單後7-10 個工作天交貨」假交期 |

## 二、本批交付

- **CSV 89 格**：desc×18 + h1×18 + altZH×4 + altEN×6 + altJA×6 + kwZH×6 + kwJA×6 + kwEN×1 + FAQ 列×24
- **六锚分工**（各 SKU 差异化主轴）：wall=A3/A2 13頁金屬圈企業送禮主力 / desk=三角座架灰板底座收銀位 / custom=十二版面燙金可變數據 / mini=85×55mm 口袋大量派發 / photo=硬紙板相架可換照片 / magnetic=軟磁片雪櫃高頻曝光
- **faqSchema ×6 原位替换**既有共享模板（4 Q 真值：minQ 1 / HK$3 / Q4 檔期 10 月底 / 可變數據——全部可溯源 products.ts features 或站点已发布口径）
- **body 外科手术 ×2 句**（desk/custom 假交期 → 數碼 3-5 / 柯式 5-7），body 其余不动（最小 churn）
- **title 六槽零改动**（冻结域，10/19 解冻批另处理）

## 三、验收

- 相似度双方法 **90 对全 PASS**：word-Jaccard worst **0.400** / 8-gram worst **0.172**（红线 <0.60、目标 ≤0.55）；证据 `.hermes/analysis/b1c7-similarity-2026-10-16.json`
- regen `csv-to-sku-seo.mjs --apply --allow-drift` 断言 A-E PASS，字节级变化恰 6 块（=本批六 SKU）
- tsc **54=54**；门童在 commit 时全套过（pre-commit 实测见 push 记录）
- body 六块「7-10」残留复扫 = 0；价格口径核对 6/6 ✓（方案要求动作完成）
- sitemap 再生 + 3 locale IndexNow ping（生成器内置）

## 四、残留登记（→ 簇 8 / docket）

1. kwEN（除 custom 外）仍为模板尾（bulk/free shipping 族）——无交叉污染，低优先
2. CSV zh FAQ 列已清毒但仍为惰性数据（ts faqs 空）——映射链核实归簇 8
3. **教训固化（§0.23.2 复发登记）**：faqSchema/块边界判定必须用 next-slug-line 区间法，括号配对法本批两次误判（先误报「无 faqSchema」、后误扫到文件尾）——与 6b 的 TS1117 同根因
4. 10/19 title 解冻批：日历 title/meta 层「HK$10 起/本」假地板（层 2）+ conversion-block「100 本起」（层 3）按 v2 方案执行
