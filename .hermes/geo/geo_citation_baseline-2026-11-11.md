# W4 AI 引用基线探针 第 2 轮 · 2026-11-11（同工具同 11 问题集 · 补 11-10 过点未跑轮）

> 依据：`.hermes/geo/geo_citation_baseline-2026-11-03.md`（web_search 口径 SSoT）+ 复测节奏 11-10/17/24。本文件 = 第 2 轮（11-10 过点未跑，11-11 晚补跑）。
> 内部文档（.hermes/geo/，§0.23.1 永不进客户可见内容）。

数据来源:
- web_search 实测 ×2 遍 × 11 探针（2026-11-11 ~22:0x +08:00，AutoClaw provider=autoglm，每探针取 top-5）
- 固定问题集：P1-P11 逐字沿用 11-03 基线（未改一字）
- 校准状态：已校准（10/11 探针两遍 top-5 完全一致；P2 首遍空返回=工具异常，二遍恢复）

## 第 2 轮结论

| 维度 | 数值 |
|---|---|
| 命中率 | **0/11**（zprintpro.com 与 z-printpro.com 均未被引用；与 11-03 基线持平） |
| 两遍一致性 | 10/11 完全一致（P2 首遍空返回，二遍正常且与 11-03 基线 4/5 吻合） |
| 与 11-03 对比 | 命中无变化；SERP 成分变化见下 |

## 逐探针记录（pass2；pass1 与 pass2 一致，除注明）

| # | 语 | 固定问题 | zprintpro | Top-5（pass2） | vs 11-03 |
|---|---|---|---|---|---|
| P1 | en | best custom packaging boxes supplier for small business 2026 | ✗ | customboxesmarket / shopify-community / growthmarketingpro / packlane / customboxes.io | **大洗牌**（仅 packlane 留榜） |
| P2 | en | custom stickers printing low MOQ free shipping | ✗ | makestickers / customstickers / moo / stickermule / stickerapp | 4/5 吻合（stickerapp 替 printrunner）※首遍空返回 |
| P3 | en | booklet printing services for small business | ✗ | printingcenterusa / vistaprint / staples / smartpress / greenerprinter | staples/smartpress 新入，officedepot/printsafari 出 |
| P4 | zh | 包裝盒訂製 香港邊間好 | ✗ | flintgift / ginkgo / **bmpack** / igpgift / sourceec | bmpack 连续两轮在榜；其余更替 |
| P5 | zh | 貼紙印刷 小批量 快交貨 | ✗ | e-print / servicecorps / print100 / printingbanana / luny.tw | **taobao 系 ×4 全部退出** → HK/TW 实体印刷商占榜 |
| P6 | zh | 月曆印刷 訂製 2027 | ✗ | uu-lian / e-print / print100 / taicheong / tinyko | e-print/print100/taicheong 连续在榜 |
| P7 | ja | ステッカー印刷 小ロット おすすめ | ✗ | digitaprint / note(しどう) / graphic / raksul / orilab | 4/5 与 11-03 吻合 |
| P8 | ja | カレンダー印刷 ノベルティ 注文 | ✗ | hi-ad / shop-stationery / printpac / raksul-novelty / tolot | 全更新面孔（gappri/k-daiwa/originalprint/designphil/mbe 出） |
| P9 | ja | 同人誌印刷 オンデマンド 小部数 | ✗ | orangekoubou / eikou / d-mate / note(planetmary) / shimeken | orangekoubou/eikou/shimeken 连续在榜 |
| P10 | ja | 食品パッケージ 印刷 少ロット | ✗ | graphic / speedpack / raksul-package / spriq / littlepackage | spriq/littlepackage 连续在榜 |
| P11 | ja | 年賀状印刷 注文 2027 | ✗ | kitamura / japanpost / happy-card / webpo / aisatsujo | 4/5 吻合（aisatsujo 替 print-netsquare） |

## 读法（第 2 轮新增洞察）

1. **0/11 基线仍成立** → W4 引用线无进展信号（预期内：11-02 部署的 schema/品牌修复需要重爬 + 引用面积累期）。
2. **ja 探针高度稳定、en/zh 探针高波动** → 日文 SERP 竞争格局固化（raksul/graphic/digitaprint 系连贯霸榜）；zh P5 taobao 系退场 = HK 本地实体商机会窗口。
3. **连续在榜对手（≥2 轮）**：bmpack（P4）、e-print/print100/taicheong（P6）、orangekoubou/eikou/shimeken（P9）、kitamura/japanpost/webpo/happy-card（P11）——这些是 GEO 引用突破的**固定对标物**，W2 内容工程（12 段骨架 + 实体对齐）的差距测量应以它们为靶。
4. 复测节奏不变：**11-17 / 11-24**（与 S2 AI 面探针 11-20..24 错峰，两口径不混比）。
