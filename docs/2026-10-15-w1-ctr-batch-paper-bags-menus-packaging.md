# W1 CTR 歼灭批执行报告：紙袋/餐牌/食品包裝 三类目承接页 (2026-10-15)

> **战略出处**: `docs/2026-10-13-three-site-one-month-seo-aeo-geo-strategy.md` §3 W1.2 —— 紙袋印刷/印刷紙袋/食品包裝印刷/餐牌印刷 四词承接页 title+description 按 v5 数字钩重写
> **执行**: deepseek hermes 人手会话 · **数据真值**: `src/data/products.ts` 现取现核
> **验收窗**: 7-10 天后 GSC 28d 档对账 CTR（基线 ~0%）

## 一、阶段重定位（执行前诊断修正）

战略原假设：「首页词 0 点击 = title/desc 钩子失效」。**实测推翻**：

| 承接页 | 旧 title 当量 | 真相 |
|---|---|---|
| paper-bags zh/en/ja | **78 / 124 / 108** | 严重超长，价格钩（HK$8起/from $1.84）与品牌（智印港/ZprintPro）全部落在 Google 截断线后——搜索者只看到前半截品类词，**钩子和品牌从未被展示** |
| menus zh/ja | 61 / 64 | 轻度超长 |
| packaging en | **94** | 超长 |

叠加**数据诚信伤**（§0.23 级）：
- menus desc/title 价格 **HK$0.22 / $0.14 / ¥20** —— 无任何 SKU 支撑（最便宜 = 過膠 laminated-menus basePrice HK$5 / $1.84 / ¥258），「一次性餐牌」产品早已不在 products.ts
- packaging en title/desc **$0.85** —— 陈旧（现最便宜 en base = folding-boxes $0.51）

⇒ 本批实质 = **截断修复 + 假价清毒** 双目标，与战略「CTR>排名」原则一致但根因不同。

## 二、执行清单（16 格）

**8 titles（v5 五段式：主词前置 + 数字钩 + 规格 + 品牌；全部 50-57 当量带）**

| 槽 | 当量 | 新 title |
|---|---|---|
| paper-bags zh | 52 | 紙袋印刷 100個起 HK$3-8/個 \| 牛皮白卡環保袋 \| 智印港 |
| paper-bags en | 57 | Paper Bags 100 MOQ $1.84 \| Kraft & White Card \| ZprintPro |
| paper-bags ja | 55 | 紙袋印刷 100個〜 ¥240〜 \| クラフト/白カード \| ZprintPro |
| menus zh | 54 | 餐牌印刷 10張起 HK$5起 \| 過膠PVC防水 精裝餐牌 \| 智印港 |
| menus en | 56 | Menu Printing 10 MOQ $1.84 \| PVC & Hardcover \| ZprintPro |
| menus ja | 55 | メニュー印刷 10枚〜 ¥258〜 \| PVC/ラミネート \| ZprintPro |
| packaging en | 53 | Packaging Boxes 100 MOQ $0.51 \| Food-Safe \| ZprintPro |
| packaging ja | 56 | パッケージ印刷 100個〜 ¥69〜 \| 食品紙箱/紙袋 \| ZprintPro |
| packaging zh | 56（未动） | 包裝盒訂製 100個起・食品紙盒/紙袋/防油卡 3D打稿 \| 智印港 |

**8 descs（假价清毒 + 价格带化 + 长度合规 138-163）**：紙袋 HK$3-8/個 价格带（价格带 per 战略 W1.2 原文「价格带」）；餐牌 ¥258〜/$1.84/HK$5 起真值分档；packaging $0.51/¥69 真值。菜单类「一次性 HK$0.22」假档整行删除。

## 三、门检

| 项 | 结果 |
|---|---|
| title 当量带 | 9/9 BAND-OK（文件级回读 `.hermes/_w1_ctr_final_equiv2.mjs`） |
| 假价残留 lint | 0（0.14/¥20〜/HK$0.22/$0.85 全清零） |
| 品牌分层 | zh 纯智印港 / en·ja 纯 ZprintPro，0 泄漏 |
| tsc | 54=54 |
| brand mentions --strict | A 类 0 |
| 备份 | `.hermes/_bak-seo-ts-before-w1ctr.ts` |

## 四、验证与对账

- push 后线上探针 3 类目 ×3 语 `<title>` 新值在位（结果见 SESSION_LOCK / 本文件尾注）
- **7-10 天验证窗**：GSC 28d 档对账 紙袋印刷/印刷紙袋/食品包裝印刷/餐牌印刷 CTR（基线 ~0%，目标 ≥2% per 战略 §4）
- B1c 进度总账 `.hermes/logs/b1c-queue-progress.json` 已同步（簇2 完成度修正 + 簇3 DONE + 本批 DONE）

## 五、遗留

- 簇 2 余 3 SKU（cartoon/eco/large red-packets）长尾，待后续车道或人手批
- en 站首页词（saddle stitch / small batch stickers）守成类无改动
- packaging zh title 无价格钩（56 当量已满，3D打稿钩在位），如需加 HK$1.5 起需取舍 3D 钩——留验证窗后按 CTR 数据定
