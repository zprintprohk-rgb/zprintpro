# W4 AI 引用基线探针 S1 · 2026-11-03（首轮可重复问题集 + 引用记录）

> 依据：2026-10-30 三战略接续指令（「11 月 3 日建立首轮可重复问题集与引用记录｜无基线前不宣称增长」）。
> 本文件为**内部文档**（.hermes/geo/），按 §0.23.1 永不进入客户可见内容。
> 机器读版本：[geo_citation_baseline-2026-11-03.json](geo_citation_baseline-2026-11-03.json)

数据来源:
- web_search 实测 ×2 遍 × 11 探针（2026-11-02 23:50 ~ 11-03 00:05 +08:00，AutoClaw provider=autoglm，每探针取 top-5）
- 固定问题集口径：P1-P8 逐字沿用 `geo_citation_baseline-2026-09-30.json`；P9-P11 按 10-30 接续指令新增三簇（同人誌/食品パッケージ/年賀状）
- 校准状态：已校准（两遍结果逐条一致，双方法成立）

## ⚠️ 口径断点（必须先读）

09-30 / 10-15 / 10-23 三期基线用 `source_check(provider=auto)`；该工具在 2026-11-02 环境不可用（tool_search 查无）。
本文件改用 **web_search**。**与历史序列不可直接比大小**——本文件确立新口径基线，未来复测沿用同一工具 + 同一问题集。若 source_check 恢复，需双工具并行一轮以重建桥接。

## 基线结论

| 维度 | 数值 |
|---|---|
| 命中率 | **0/11**（zprintpro.com 与旧域 z-printpro.com 均未被引用） |
| 分语种 | en 0/3 · zh-hk 0/3 · ja 0/5 |
| 两遍一致性 | 11/11 top-5 完全一致（检索确定性成立，复测有效） |

## 逐探针引用榜（两遍一致）

| # | 语 | 固定问题 | zprintpro | Top-5 引用域 |
|---|---|---|---|---|
| P1 | en | best custom packaging boxes supplier for small business 2026 | ✗ | customboxmakers / f6s / twopackaging / wecustomizeboxes / packola |
| P2 | en | custom stickers printing low MOQ free shipping | ✗ | makestickers / customstickers / stickermule / moo / printrunner |
| P3 | en | booklet printing services for small business | ✗ | printingcenterusa / vistaprint / greenerprinter / officedepot / printsafari |
| P4 | zh | 包裝盒訂製 香港邊間好 | ✗ | yaukee / pro360 / **bmpack** / ezbox / sunecobox |
| P5 | zh | 貼紙印刷 小批量 快交貨 | ✗ | **taobao 系 ×4** / print88king |
| P6 | zh | 月曆印刷 訂製 2027 | ✗ | taicheong / teammate / taiwancalendar / print100 / **e-print** |
| P7 | ja | ステッカー印刷 小ロット おすすめ | ✗ | digitaprint / note / **raksul** / orilab / graphic |
| P8 | ja | カレンダー印刷 ノベルティ 注文 | ✗ | gappri / k-daiwa / originalprint / designphil / mbe |
| P9 | ja | 同人誌印刷 オンデマンド 小部数（新簇） | ✗ | otaclub / shimeken / biz.ne.jp / book-hon / komugiblog |
| P10 | ja | 食品パッケージ 印刷 少ロット（新簇） | ✗ | digitaprint / littlepackage / artpacks / 1st-print / spriq |
| P11 | ja | 年賀状印刷 注文 2027（新簇） | ✗ | キタムラ / **日本郵便官方** / webpo / おたより本舗 / print-netsquare |

## 判读（供内容与 AEO 攻坚定向，非结论性断言）

1. **zh-hk 贴纸簇被 taobao 电商聚合内容淹没**——本簇的内容资产在检索引用面没有入口；与新战略「贴纸簇承接分散 33.9%」的测量审计互证。
2. **P4/P6 的 HK 头部（e-print / bmpack / print100）与 09-30 序列重叠**——它们是 AEO 内容最该攻的引用位，且本站已有对应深度内容，差距在引用面而非内容面。
3. **年賀状簇被官方渠道锁死**（日本郵便 + キタムラ级平台）——与 10-30 审计「官方事实可建答案、不承诺本站投函能力」口径一致；切入路径 = C109 活动页 + PDP 的长尾差异化，不做正面竞争。
4. **en 三簇全是 US 平台**——本站 USA sharp hook（free shipping $99+ / free proof / MOQ 50-100）是潜在引用面，当前零出现；与 11-01 测量审计「en small batch pos 5.5 + 0 点击 = 纯 CTR 缺口」互证。

## 复测节奏与纪律

- 复测：**11-10 / 11-17 / 11-24**（每周一轮，同工具同问题集；与 blog-money-keyword 11-07 remeasure 窗相邻但不混算口径）
- 纪律：无后续命中增长证据前，不得在任何报告声称「AI 引用增长」；本文件只确立起点。
- 工具备注：`source_check` 恢复后需双工具并行一轮重建与 09-30 序列的桥接。

数据来源：web_search 实测（22 次调用，两遍×11 探针）；固定问题集源 = geo_citation_baseline-2026-09-30.json + 2026-10-30 接续指令；校准 2026-11-03 00:08。
