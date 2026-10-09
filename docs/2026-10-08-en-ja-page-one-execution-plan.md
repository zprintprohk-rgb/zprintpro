# 2026-10-08 en/ja 排名首页优化提升执行方案（首席 SEO/AEO/GEO 数据战略参谋 · 深度版）

> 角色：ZprintPro 首席搜索数据分析与战略参谋
> 数据基座：GSC 2026-10-05 导出全量核验（**68 xlsx：us 4,763 / jp 1,585 / hk 6,063 / 汇总 10,648 查询行**，已用 openpyxl 逐文件复算）+ 带钱正则筛选（en 17 / ja 22 / zh 12 构式，`.hermes/money-kw-mine.py` 可复现 → `.hermes/money-kw-20261005.json`）+ 聚合去重 en/ja 词盘（`.hermes/tmp/enja-wordboard-20261008.cjs` 本次新建）+ CSV 源头 91 行全覆盖实况 + 线上探针
> 价格真值：products.ts（basePrice_en/ja 同源口径）；行业搜索量未获得，全部判断基于 GSC 真实查询行为（§0.23）
> 前序方案（本版继承不重复）：`docs/2026-10-07-en-ja-page-one-strategy.md`（四梯队 + 三层杠杆 + 10/12 矩阵）、`docs/2026-10-06-en-ja-sku-keywords-expansion-plan.md`（B1/B2 已全量落地）、`DELIVERY/2026-10-12-money-kw-package.md`（W2 预留动作代码包）
> 当前时间锚：2026-10-08，title churn 组冻结至 10/19，10/12 GSC 导出未到（验证档 PENDING）

---

## 〇、总诊断：三个断点（本方案全部动作的病因学）

**断点 1 — CTR 断裂（最痛）**：en/ja 带钱词与页一词 **c=0 现象普遍**。en 实证：small batch sticker printing 59 imps @5.66 c=0 + small batch stickers 35 imps @5.86 c=0（94 imps 零点击，页一守成无收益）；ja 实证：特急印刷 激安 100 imps @18.2 c=0、即日印刷双变体 130 imps @30-39 c=0。页一/页二词有展示无点击 = **SERP 呈现缺钩子**（价格不够前置 / 无 AEO 直接答案卡占位的 rich 呈现弱 / 意图匹配度不足）。

**断点 2 — 页二到页一的最后一公里**：en 词群 @12-21（doujinshi 12.3 / china catalog 17.4 / large envelopes 14.0 / saddle stitch booklet 16.14 / transparent stickers 18.46 / catalogue printing china 19-20.8 / catalogs printing china 18.46）；ja 词群 @16-24（コミケ 185im 7d 13.28 / クラフト紙 パッケージ 106im @23.8-24.4 / pvc シール 21.3 / 特急印刷 激安 16-18）。这批词词面多已补齐（10/5-10/7 批次），**缺的是内链信号与 AEO 答案占位**。

**断点 3 — GEO/AI 引用流空白**：`evaluate the printing services company`（moo/vistaprint 对比意图）4 imps @3.0 已现身——AI Overview 时代的金矿山，全站零承接。

---

## 一、第一主线：CTR 修复（页一守成组，零风险最高 ROI）

逻辑：已在页一（或页二顶）的词，每修 1% CTR = 直接询盘增量，不涉及排名风险。

| # | 动作 | 目标词（基线） | 执行内容 | 优先级 |
|---|---|---|---|---|
| E1 | **envelopes 转化块补缺（en + ja 双缺）** | large envelopes 15im @14.0（7d Top1）/ catalog envelopes custom / 大型封筒 ja | 本次普查：envelopes 类目**仅 zh-hk 有块，en/ja 双缺**（全站唯一缺口类目）→ 建 `envelopes:en` + `envelopes:ja` 块：quickAnswers ×3（价格 $0.28 起 100 MOQ／¥ 真值 / 尺寸 C4 A4 flat）+ priceTable（products.ts 信封簇真值） | P0 |
| E2 | transparent-stickers en title 补价格钩子 | transparent stickers 13im @18.46 c=0 | 现 title "Transparent Stickers \| Die-Cut PVC \| 10 MOQ" **无 $ 钩子** → 按 v5 规则补 `from $X`（basePrice_en 真值，执行时取）；同簇 die-cut/foil 自查一遍 | P2（10/13-19 L3 title 批） |
| E3 | small-batch-stickers 双词 AEO 强化 | 59+35 imps @5.7/5.9 c=0 | stickers:en/ja 块已有 → 检查 quickAnswers 首条是否价格直接答案（《How much...》问句即 H3 形态），不足则补「from $0.045/50pcs」直接答案卡 | P0 审查（可能 0 改动） |
| E4 | ja 即日/特急簇答案卡加固 | 特急印刷 激安 100im @18.2 / 即日印刷 130im @30-39 | rush 为服务页（自管 FAQ 数组于 page.tsx，不走 conversion blocks）：ja faq 现含即日/料金条目，补一条「特急印刷 激安はいくら？」精确问句（答案 = 18:00 締切・翌日 12 時・DHL 全国・加算料金真值）→ FAQPage JSON-LD 自动收录 | P0 |

## 二、第二主线：页二冲页一（L1 临门一脚，10/8-10/11 攒批窗）

| # | 动作 | 目标词（基线 → 目标） | 依据 |
|---|---|---|---|
| L1-1 | en blog 加 doujinshi printing 精确锚 1 条（books/saddle-stitch blog → doujin SKU） | doujinshi printing 37im @12.3 c=1（已在点击！）→ 前 10 | 页 2 顶→页 1 通常差 1-2 个内链信号；B2 SKU 行 + A4 blog 已就位 |
| L1-2 | catalog-china 页加「catalog printing cost table 2026」数据表段 | china catalog printing 55im @17.4 → ≤12 | 数据表 = AEO 引用饵；价格 truth $4.60 起；**与 W2.2 料金表同批代码包** |
| L1-3 | ja japan-doujin 类目 buyingGuide 加「コミケ 新刊 時短チェックリスト」段 | コミケ 印刷 185im（全站第一词）7d 13.28 → 前 10 | 三层叠加已完（A4+A5+B2），防 12 月季节性回落加固 |
| L1-4 | a2 poster en 内链+答案卡复核 | a2 poster 27im @30.9（7d 8.3 页一）→ 28d 页一 | A6 quickAnswer 已做；7d 已页一说明引擎认可，28d 滞后自然回摆，补 1 条 poster-size-guide 内链催化 |

## 三、第三主线：深水收编（分批，不贪多）

| 批次 | 词群 | 动作形态 |
|---|---|---|
| 深-1（10/8-11） | en small batch label printing 42im @26.6 / double sided flyers 15+12im @45.3/37.75 / food packaging 18im @23.6 | labels 簇 SKU 行已存在 → 仅补 conversion quickAnswers；flyers 双面词面已在 CSV → 答案卡补「両面同価」类真值；food packaging → packaging:en 块补 FAQ |
| 深-2（10/13-19） | ja 両面カラー印刷 33im @35.7 / 食品 パッケージ印刷 20im @50.3 / a2 ポスター 激安 20im @48.1 | flyers ja title 加 両面カラー词面（L3 冻结解冻后）；packaging ja FAQ 补食品規格；poster ja 激安词面入 kw（35 词余量：a2-posters[ja]=35 已满 → 走置换） |
| 深-3（季节蓄水） | ja 卒業アルバム 印刷 15im @67.7 / 同窓会 印刷 10im @44.7 / 上製本 印刷 安い 28im @65.8 | B2 graduation-yearbook 行已上；educational ja 内容段 + 卒アル 1冊から文化 FAQ（n-pri/raksul 实证源）；硬面本 ja 料金锚 |

## 四、GEO 首单：en 对比评测页（新战场，10/8-11 窗内立项）

**信号**：`evaluate the printing services company` 4 imps @3.0（moo/vistaprint 品牌锚定流）——Google AI Overview / Perplexity 引用层的入场券。

**形态**：服务页加「ZprintPro vs MOO vs Vistaprint」事实对比 section（或独立 buying-guide blog），对比维度 = MOQ / 单价 / 交期 / 纸张 / 运费，**全部数字用我方 products.ts 真值 + 竞品官网公开价（标注来源日期）**。GEO 三件套：① 首 150 字直接给结论（AEO 黄金法则）② 数据对比表（AI 引擎最易引用结构）③ Speakable 摘要。

**红线**：竞品名仅作事实比较，不贬损；数字可溯源（§0.36.2 引用红线）。

## 五、ja 季节双窗

| 窗 | 词 | 动作 |
|---|---|---|
| 年賀状（11 月旺季前） | 年賀状印刷 / 2027年賀状（10/5 未出现 = 盲开首验） | A4 ja title + A4 类目 FAQ 已就位；**10/12 判读纪律：0→有展示即胜**。10/13 起每轮必查；起量后 en corporate holiday cards 同步（A4 en title 已盲开） |
| 卒アル（Q4→3 月） | 卒業アルバム 印刷 67.7 / 同窓会 44.7 | B2 SKU 行已上；educational ja FAQ + graduation-yearbook ja body 已含；10/12 验证后决定加码 |

## 六、执行排期（与 10/7 方案 §四 对齐 + 本版细化）

| 窗口 | 动作包 | push 纪律 |
|---|---|---|
| **P0 = 10/8-10/11** | E1 envelopes:en 块 + E3/E4 quickAnswers 审查加固 + L1-1 doujinshi 内链 + L1-2 cost table + L1-4 a2 内链 + GEO 对比 section + **W2.2 ja 料金表**（代码包已就绪） | 攒批 1 push（≥3 src 文件 + 行为修复达标） |
| **P1 = 10/12** | GSC 导出 → 验证矩阵逐项核对（§七）→ churn 组解冻裁决 → GAP 扫描（money-kw-mine.py 复跑 + 35 词置换算法） | 数据驱动，无预设立场 |
| **P2 = 10/13-19** | L3 title 批（仅当 10/12 无回撤证据）：W2.1 wholesale saddle stitch（57 当量候选已备）/ W2.3 same day flyers（55 当量，兼修存量 66 超线）/ E2 transparent-stickers 价格钩子 / ja flyers 両面カラー / **存量 TRIM 收编：catalog-china 77 当量 → 56 当量候选、rush ja 59 → 合规带** | title 批每 SKU 过门童 #27，攒批 1 push |
| **P3 = 10/20-31** | 年賀状内容层加码（11 月窗）+ 深-2/深-3 按 10/12 数据取舍 | — |

## 七、10/12 验证矩阵（三站合并版 + 判读纪律）

### en 验证锚点
| 词 | 基线(10/5) | 目标 | 归因动作 |
|---|---|---|---|
| doujinshi printing | 12.3 | 前 10 | B2 行 + A4 内链 + L1-1 新内链 |
| china catalog printing | 17.4 | ≤12 | kw+$4.6 FAQ+cost table |
| catalogue printing china | 19-20.8 | ≤12 | 同上 + 英式拼写 |
| large envelopes | 14.0 | ≤10 | B2 行 + E1 envelopes:en 块 |
| calendar sizes 双词 | 43.5/38.0 | ≤35 | A5 FAQ ×3 |
| corporate holiday cards 簇 | 0 展示 | 0→有展示 | A4 en title 盲开 |
| churn 组（saddle stitch booklet printing 4.1 / food packaging 23.6） | 页一/回撤 | 回稳 | 零 title 回调纪律 |

### ja 验证锚点
| 词 | 基线(10/5) | 目标 | 归因动作 |
|---|---|---|---|
| コミケ 印刷 | 23.5（7d 13.28） | 前 10 | A4+A5+B2+L1-3 四层 |
| クラフト紙 パッケージ 印刷 双变体 | 23.8-24.4 | 前 10 | A5 FAQ + W2.2 料金表 |
| 年賀状印刷 / 2027年賀状 | 未出现 | 0→有展示 | A4 title 盲开 |
| 卒業アルバム 印刷 | 67.7 | ≤50 | B2 行 |
| pvc シール | 21.3 | ≤12 | 30a60554 kw |
| 教科書 印刷会社 | 62.6 | ≤45 | 30a60554 kw |
| 特急印刷 激安 | 16-18 | 前 10 | rush 存量 + E4 答案卡 |
| a2 クリアポスター 印刷 | 36.0 | ≤25 | B3 kw |
| churn 组（教科書 印刷 28.75） | 回撤 | 回稳；10/19 仍 ≥30 启动诊断 | 冻结观察 |

**判读纪律**（承 A6 报告 §五，不重复不冲突）：① 盲开词先看有无展示再看位次 ② churn 组不比 10/5 差即对冲成功 ③ 三个「趋势改善+动作加码」词（コミケ/クラフト紙/特急激安）是最大看点 ④ CTR 指标（c 值）首次纳入判读：页一词 c 仍 0 → 下一轮优先 AEO 呈现层而非再加内容。

## 八、红线与质检

- title 冻结至 10/19（churn 组）/ 最后变更 +2-4 周；本方案 P0 窗口**零 title 改动**（E2 及全部 title 动作锁在 P2）
- SOP-5：CSV 源头改动必跑 `scripts/csv-to-sku-seo.mjs` 生成器 + 三件套断言；禁手搓派生
- GSC 黑话零泄漏（门童 #16）；MOQ/价格全走 products.ts 真值；FAQ/描述涉时效数字（早割 10/31 等）标注来源与到期复核日
- 每个 P0 动作落地后：tsc 54=54 持平 + 门童全量 + 线上探针（对应页 keyword/FAQ 标记）
- push：P0 攒批 1 push（满足 §0.25.9 阈值）；10/12 后按数据再攒
- 双方法复算（§0.23.2）：本方案所有 imps/pos 数字 = money-kw JSON 聚合 + gsc-1005-parsed 两源交叉（us/jp 28d 行级一致）

## 九、数据来源

- GSC 2026-10-05 导出 68 xlsx（`GSC数据/`，逐文件 openpyxl 复算：us 4,763 / jp 1,585 / hk 6,063 / 汇总 10,648 查询行）vs 2026-09-29 同窗口对比
- 带钱正则挖掘：`.hermes/money-kw-mine.py` → `.hermes/money-kw-20261005.json`（本方案 en/ja 词表来源）
- 本次新建分析脚本：`.hermes/tmp/enja-wordboard-20261008.cjs`（聚合去重词盘，可复跑）
- CSV 源头实况：`zprintpro-sku-seo-data.csv` 91/91 SKU 全覆盖（B1 7b592897 + B2 b6956399/dcd371d0）；16 类目行不在 CSV 属设计（类目 SEO 在 seo.ts + category-seo-content.ts）
- 批次实况：30a60554（money 批）/ 059314bd（B3 zine）/ 3ef3094b（A5 FAQ×15）/ a675b376+ad54ea18（A6）/ e763dc6c（漂移闸）；部署探针 9 URL 全 LIVE（2026-10-08 00:4x）
- 线上 title 状态：sku-seo-data.ts 现行值（B1.5 写回口径）；W2 代码包：`DELIVERY/2026-10-12-money-kw-package.md`
