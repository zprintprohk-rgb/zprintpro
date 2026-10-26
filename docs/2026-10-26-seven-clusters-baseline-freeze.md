# 七簇 SEO／AEO／GEO 基线冻结（词表 v1.0）— 2026-10-26

> 任务源: `docs/2026-10-26-seven-clusters-seo-aeo-geo-global-strategy.md` §九 第 1 周「基线冻结」与 MEASURE-15。
> 目的: 把七簇词表、数据文件、脚本与主 URL 分工**版本化冻结**，保证 2026-11-23 复跑同口径；**不能只报改善词**。
> 本文件为内部文档（含 GSC 内部数据，禁入客户可见内容，§0.23.1）。

## 1. 词表版本 v1.0（2026-10-26）

分类规则: **固定顺序首匹配**（`magazine` 不误匹配 `zine`；`zine` 需整词匹配）。改词表必须新建版本并**重跑两窗**，不能只改当前窗。

```python
CLUSTERS = {
  "stickers":        ["sticker","label","貼紙","標籤","シール","ステッカー","ラベル"],
  "doujin_comiket":  ["doujin","comiket","zine","同人","コミケ","c109"],
  "books_school":    ["saddle stitch","booklet","exercise book","textbook","workbook",
                      "school printing","小冊子","騎馬釘","教材","教科書","学校","中綴じ","冊子"],
  "catalog":         ["catalog","catalogue","目錄","カタログ"],
  "poster_flyer_rush":["poster","flyer","leaflet","same day","rush printing","海報","傳單",
                      "宣傳單張","即日","急件","ポスター","チラシ","フライヤー","特急"],
  "nengajo_yearbook":["nengajo","new year card","graduation","yearbook","年賀状","卒アル",
                      "卒業アルバム","卒業記念"],
  "paperbags_eco":   ["paper bag","paper bags","paperbag","kraft bag","eco-friendly packaging",
                      "eco friendly packaging","sustainable packaging","紙袋","環保包裝","エコパッケージ"],
}
```

## 2. 数据文件与脚本（已随本版入库 `.kimi-work/seven-clusters-20261026/`）

| 文件 | 内容 | 角色 |
|---|---|---|
| `analyze_seven_clusters.py` | 词表 + 两窗聚合逻辑（词表 SSoT 在本文件） | 复跑脚本 |
| `probe_pages.py` / `page-probe.json` | 线上 22 页 HTTP/title/desc/H1/canonical/robots 探针 | 线上证据 |
| `validate_strategy_report.py` | 报告数字校验 | 口径校验 |
| `seven-cluster-summary.csv` | locale×cluster 两窗聚合（展示/点击/位置/页数） | 主基线表 |
| `seven-cluster-queries.csv` | 逐词明细（含当前与前期） | 逐词裁决 |
| `seven-cluster-pages.csv` | 逐 URL 承接明细 | 主 URL 份额 |
| `seven-cluster-local-evidence.json` | 全量可机读载荷（meta + terms + summary + queries + pages） | 机读 SSoT |
| `qwen-seven-clusters.txt` | 千问附件原文（保留只读） | 附件存档 |
| `analysis-output.txt` | 分析 stdout 存档 | 可复现 |

**输入口径（固定）**: `.hermes/logs/gsc-query-page-country-2026-10-26.csv`（当前 28 天 2026-09-28—10-25）对比 `...-previous-28d-2026-10-26.csv`（前期 2026-08-31—09-27）；`query × page × country`，位置按展示加权，簇展示 = 该范围内曝光（非去重全站、非市场搜索量）。

**图表（docs/evidence/2026-10-26/）**: `seven-cluster-gsc-comparison.png`、`seven-cluster-priority-flywheel.png`、`en-ja-commercial-opportunities.png`、`dual-engine-operating-model.png`、`packaging-gsc-28d-comparison.png`、`packaging-evidence-flywheel.png`、`gsc-locale-28d-comparison.png`。

## 3. 主 URL 分工映射（三语 × 簇，策略 §6.1 冻结版）

| 簇 | zh-hk | en | ja |
|---|---|---|---|
| 贴纸 | `/category/stickers/` 通用采购；材质 PDP 细分 | `/product/small-batch-stickers/` 接 small batch | waterproof PDP 接 `pvc シール` |
| 同人／コミケ | circle guide 接信息、PDP 接报价 | `/product/doujinshi-printing/` 主接交易 | **PDP 主接交易曝光**；`/comiket-c109/` 接日期/入稿逆算并链 PDP |
| 书刊／学校 | books category 接品类 | saddle/exercise PDP 分产品；school guide 接入稿 | textbook guide 接知识；PDP 接报价 |
| 目录 | 样本不足，不扩页 | catalog PDP 交易；supplier guide 接筛选/打样/色差/交付风险 | 0 展示，先诊断现有 PDP |
| 海报／传单／即日 | posters/flyers category 分品类；A2 PDP 接规格 | A2 PDP 接规格；flyer size guide 接尺寸 | A2/same-day PDP 分工；即日只写真值 |
| 年賀状／卒アル | 非本簇主攻 | yearbook 小样本观察 | nengajo 活动页仅 A 分支；graduation PDP 分意图 |
| 纸袋／环保 | **category 主接通用纸袋**；handle/kraft/large PDP 接袋型 | eco GSM guide 先诊断 | 样本太小；先修港币，不大投 |

## 4. 基线数字（2026-10-26 冻结，与策略 §2.2/§2.3 同源）

簇级两窗对比（展示 当前/前期 | 点击 当前/前期 | 位置 当前/前期）：

| locale／簇 | 展示 | 点击 | 位置 | 承接页数 |
|---|---|---|---|---|
| en 贴纸 | 306/436 | 0/0 | 21.89/22.63 | 16 |
| ja 贴纸 | 59/74 | 0/0 | 22.39/26.67 | 6 |
| zh 贴纸 | 684/874 | 2/2 | 34.80/28.43 | 21 |
| en 同人 | 58/106 | 2/2 | **9.95/22.86** | 2 |
| ja 同人 | 170/181 | 0/0 | **19.06/26.48** | 2 |
| zh 同人 | 34/40 | 1/0 | **6.59/11.55** | 3 |
| en 书刊/学校 | 113/326 | 0/3 | 18.46/20.82 | 5 |
| ja 书刊/学校 | 76/45 | 0/0 | 18.17/11.98 | 4 |
| zh 书刊/学校 | 466/336 | 1/0 | 36.61/29.97 | 8 |
| en 目录 | 261/316 | 0/0 | 24.96/24.11 | 4 |
| ja 目录 | 0/17 | 0/0 | —/35.94 | 0 |
| zh 目录 | 5/1 | 0/0 | 89.00/92.00 | 1 |
| en 海报/传单 | 362/366 | 0/0 | **20.96/34.91** | 16 |
| ja 海报/传单 | 111/131 | 0/0 | 36.35/30.42 | 11 |
| zh 海报/传单 | **1,997/1,855** | **10/16** | **27.70/31.66** | 30 |
| ja 年賀状/卒アル | 43/19 | 0/0 | **29.33/58.79** | 1 |
| en 纸袋/环保 | 15/109 | 0/0 | 44.47/13.18 | 3 |
| ja 纸袋/环保 | 4/5 | 0/0 | 28.00/40.80 | 4 |
| zh 纸袋/环保 | **663/570** | **3/3** | 30.09/24.03 | 9 |

带钱词基线（展示/位置/点击）：`small batch sticker printing` 49/4.77/0；`small batch stickers` 28/5.07/0；`doujinshi printing` 39/10.21/0；`doujin printing` 13/9.00/2；`saddle stitch booklet printing` 15/9.60/0；`china catalog printing` 78/18.00/0；`a2 poster` 44/11.93/0；ja `コミケ 印刷` 170/19.06/0；ja `教材 印刷製本` 33/19.33/0；ja `卒アル販売` 16/5.00/0；ja `卒業アルバム 印刷` 14/80.57/0；zh `海報印刷` 516/32.68/0；zh `即日印刷` 77/12.12/1；zh `紙袋印刷` 147/31.53/0；zh `邊度有紙袋買` 34/8.47/0；zh `貼紙印刷` 215/51.81/0；zh `小冊子印刷` 65/11.48/0；ja `pvc シール` 19/18.95/0。

## 5. 复跑 SOP（2026-11-23 用）

1. 拉取同口径 28 天 GSC：`gsc-query-page-country-<date>.csv` + `-previous-28d-<date>.csv` 落 `.hermes/logs/`。
2. 复制本目录脚本到 `.kimi-work/seven-clusters-<date>/`（**词表不许改**；确需改 → 建 v1.1 并重跑两窗）。
3. 跑 `analyze_seven_clusters.py` → 输出同构 CSV/JSON。
4. 对每词记录: 展示、点击、位置、主 URL 份额、样本限制、变更日期 → 标记 `SCALE/HOLD/FIX/STOP/NEEDS_DATA`。
5. 两次结果不一致 → 先查测量（§0.23.2 双方法复算），不换口径制造改善。
