# W1 意图挖掘人读版笔记（2026-09-30）

- 执行: 研究员子代理（6Id3Pcrgv6oj0hef733qkw）联网挖掘 + 主会话验收补记（子代理死线前未写本笔记，机器可读矩阵已落盘且经主会话完整性校验：6 簇 × 7 问 × cited 5-6 × gaps 2 全齐）
- SSoT（机器可读）: `.hermes/geo/geo_intent_matrix.json`
- 数据来源:
  - 联网: source_check SERP（2026-09-30），Reddit/社区帖子仅收录标题+URL（正文反爬未抓取，不转述）
  - GSC: `GSC数据/香港站点28天数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx` + `美国站点28天数据…2026-09-29.xlsx`（查询表，窗口 2026-08-29→09-25）+ `gsc_page_query.csv`（08-26, 2294 行）交叉
  - 双方法复算: openpyxl vs 原始 XML（zh-hk 589 行/202 词带、en 510 行/161 词带全一致，见 `_w1_double_count.json`）
- 性质: 内部文件（含 GSC 后台词，§0.23.1 禁入客户可见内容）

## 各簇缺口 Top（完整版见 JSON）

| 簇 | P0 缺口 | 占位竞对 |
|---|---|---|
| en custom packaging boxes | 「盒型 × 数量梯度 × 单位价」公开对比表缺失 | cubitpackaging / brandtbox |
| en custom stickers low MOQ | 单价表 + die-cut vs kiss-cut 教育内容被平台博客占位 | customstickers / stickermule / shopify blog |
| zh-hk 包裝盒訂製 | 价格梯度表型内容缺口（详见 JSON gaps 字段） | 见 JSON |
| zh-hk 貼紙印刷 | 同上（详见 JSON） | 见 JSON |
| ja パッケージ印刷 | 小ロット費用相場表（個数帯 × 製法）+ 納期表缺失 | TSUMUGU / package-design-office |
| ja ステッカー 小ロット | 枚数階帯単価表（50/100/500枚 × サイズ）缺失 | megaprint / ZEAMI |

## GSC 速赢落点（28 天窗口 08-29→09-25）

| locale | 词 | pos | imps | 落地页 |
|---|---|---|---|---|
| zh-hk | 食品包裝印刷 | 7.7 | 147 | /zh-hk/blog/food-packaging-printing-guide/ |
| zh-hk | a6 尺寸 | 8.6 | 84 | /zh-hk/blog/a5-vs-a6-flyer-size/ |
| zh-hk | 紙袋印刷 | 12.3 | 73 | /zh-hk/product/eco-paper-bags/ |
| zh-hk | 印刷紙袋 | 12.2 | 65 | /zh-hk/blog/paper-bag-buying-guide/ |
| zh-hk | 即日印刷 | 8.9 | 51 | /zh-hk/product/same-day-flyers/ |
| en | small batch sticker printing | 6.5 | 62 | /en/product/small-batch-stickers/ |
| en | small batch stickers | 5.3 | 29 | /en/product/small-batch-stickers/ |
| en | doujinshi printing | 14.5 | 34 | /en/product/doujinshi-printing/ |
| en | exercise book printing business | 11.4 | 23 | /en/product/exercise-books/ |
| en | fluorescent stickers | 12.3 | 18 | /en/product/fluorescent-stickers/ |

## 与 W4 交叉结论

- W4 探针（同夜）: zprintpro 命中 3/8 且全部 zh-hk；en/ja 零引用 → **en small-batch-stickers（pos 5.3/6.5 双速赢词 + AI 零引用）= W2 重构最高杠杆落点**。
- ja 两簇均为「费用表/单价表缺失」型缺口，与 en 簇同构 → W2 重构时同一张梯度表可三语种实体对齐复用（per §0.36.2 第 5 条）。
