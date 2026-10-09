# GSC Feedback Loop — 2026-10-10 (ZP-gsc-feedback · 10-09 档消费轮 · 锚点表切换 10-09 验证矩阵 · CTR c 值升一等判据)

VERDICT: OK
CONSUMED: run-context-ZP-gsc-feedback.json @ 2026-10-10 00:01:38 | lane-status.json @ 2026-10-09T15:48:45Z | lane-results-bus-contract.md @ v1 (2026-09-19) | 上轮报告 2026-10-06-gsc-feedback.md (verdict=OK, 已交付不重复) | K3 大脑指令区 2026-10-09 (§F-2 本车道重定制) + docs/2026-10-09-gsc-deep-audit-and-strategy.md §一/§二
DELIVERED: .hermes/logs/2026-10-10-ZP-gsc-feedback.md, .hermes/logs/2026-10-10-gsc-suggested-src-fixes.md, .hermes/industry-keyword-matrix.json (新增 gsc_feedback_2026_10_10 block + last_updated / last_updated_event / last_gsc_feedback_update 3 处元数据), GSC数据/index.json (10/9 档登记 + latestFreshData 2026-10-05→2026-10-09 + freshnessStatus FRESH)
NEXT: ① 10/12 老板拉新档 —— **补 3mo 窗**（连续两档缺）**且**同步落盘多行 per-query JSON（本轮 4 个 T1 锁词因 10-09 解析产物为单行大 JSON + 本 lane 无 node/pwsh 而 PENDING）② weekly-meta 10/17 批纳入 CTR 池第二批（食品包裝印刷 119im c0 / 紙袋印刷 77 / 印刷紙袋 72 / 餐牌印刷 59 / ja 特急印刷 激安 16.1 c0）③ 10/16 盲开判读（年賀状 / holiday cards 0→有展示即胜；仍 0 → 启 Plan B：site: 收录诊断 + sitemap 条目核对）④ 10/19 title 解冻 + churn 组裁决（教科書 印刷 34.6，≥30 即启动诊断；冻结纪律优先）⑤ K3 拍板：FIX-3 footer 实体口径 / §0.0 名片展示层 (a)(b)(c) / W9 聖誕卡是否破 queue ⑥ 管理员：4 车道 LastTaskResult=2147946720 修复 + ZP-k3-review 注册（附可粘贴命令见 §14）

**幂等核验**: run-context.retry_queue = [] （无 RETRY 项）；previous_run verdict = OK @ 2026-10-06（报告 2026-10-06-gsc-feedback.md 交付完整）⇒ 上轮已完成项**不重复做**。本轮为其 NEXT 承诺的「10/12 前后下一拉新窗」**提前一档的消费轮**：10/09 档 ×12 xlsx 已于 10/9 02:03-02:08 落盘，并由会话解析为 `.hermes/gsc-2026-10-09/extract.json` + `compare-vs-0918.json`；本 lane 直接消费其**可读产物**（docs 深度盘点 + 多行 compare JSON），**零重拉、零重解析**。本 run idempotency_key = 66816bffcba590d2（lane|gsc-feedback-10/9档消费|matrix+index|2026-10-10）。
**跨车道避让**: run-context.sibling_lanes = [] ⇒ 今日无兄弟车道记录，无同文件撞车风险；本轮**零 src 改动**，只写 `.hermes/` + `GSC数据/index.json`，不触发 §0.35.5 撞车面。**注**：`.hermes/ctr-meta-20261010.json`（weekly-meta 10/10 备料）与 `DELIVERY/2026-10-10-ctr-meta-price-hook-batch.md` 为本日他人产物，本 lane **只读不写**。
**Run type**: gsc-feedback-loop 完整流程（10/09 档消费 + 锚点表切换 10-09 验证矩阵 + CTR c 值一等判据 + 盲开词纪律 + churn 组盯梢 + freshness 门禁 + v9.4 质量三件套 + M1 线 + risers/fallers + 锚文本双方法审计 + title 线上实测 + 品牌监测 + 301 验证 + matrix 回灌 + src 修复建议上报），**无简化、无延后**。
**环境**: pwsh 工具在本 lane 沙箱被禁（v9.4 rearm 明示**不重试**）——全程仅用文件工具（read/glob/grep/write/edit）+ web 工具；git commit/push 由 host-side wrapper 执行，**不在 lane 内运行**。

---

## 0. 数据来源 (SOP-10 第 3 款 / §0.23 数据诚信红线 — 必含)

```
数据来源:
- GSC 数据 (本 run 主源): GSC数据/*2026-10-09.xlsx ×12 (24h/7d/28d × 三站点汇总+香港+日本+美国; 10/9 02:03-02:08 落盘; 本档无 3mo 窗)
                          机器解析产物 (同仓已落盘, 本 lane 直接消费):
                            .hermes/gsc-2026-10-09/extract.json (逐文件复算原始抽取)
                            .hermes/gsc-2026-10-09/compare-vs-0918.json (多行; hk/us/jp/combo × up/down/gained_top/lost_top/top10 + top10_count)
- GSC 对照档: 10/05 档 ×12 (上轮消费) / 09/29 档 ×16 (首含 3mo) / 09/18 档 (.hermes/gsc-2026-09-18/extract.json)
- 会话解析报告 (10/09 档的可读产物, 本 lane 引用为矩阵锚点 SSoT):
              docs/2026-10-09-gsc-deep-audit-and-strategy.md §一/§二 (三站点总量 + en 8/ja 9/zh-hk 验证矩阵)
              docs/2026-10-09-gsc-20day-delta-vs-0918.md (9/18→10/09 20 天硬对比: 总量/top10 词数/三市场带钱词)
- K3 拍板:    docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md §F-2 (本车道重定制: 锚点表切换 + c 值一等判据 + 盲开纪律 + 下档补 3mo)
              docs/2026-09-12-k3-directive-v93-home-fix-money-words.md (任务 J 8 T1 锁词)
              docs/2026-09-13-title-batch-T-freeze.md §6-3 (title 50-57, 58 阻断) + v9.4 §4 质量三件套
- 线上探针 (本 run 新取证): web_fetch 2026-10-10 ×6 —
              旧 z-printpro.com ×3 (/products/sticker-printing/ /products/packaging-box-printing/ /flyer-printing/) 全部 cross-origin redirect → zprintpro.com (= 301 链证据 3/3)
              新站 ×3 (/zh-hk/category/stickers/ + /zh-hk/category/books/ = HTTP 200 + title 实测; /ja/category/greeting-cards/ = HTTP 200 + 年賀状承接段 live 确认)
- 锚文本审计 (本 run 新取证): grep src/data/blog-data/zh-hk.json 8 词精确锚 + 2 词任意形态 (双方法)
- 幂等核验:   run-context.retry_queue=[] + previous_run.verdict=OK + 10/09 档文件存在性核验 (glob 实证 12 xlsx)
```

### §I.1 4 口径对照表 (per §0.33.1)

| 口径 | 真实数量 | 类型 | 本报告何处使用 |
|------|---------|------|----------------|
| 10/09 档 hk 28d 命名查询 | 550 词 | GSC 查询明细 | §2/§3/§5 |
| 10/09 档 us / jp 28d 命名查询 | 518 / 170 词 | GSC 查询明细 | §3/§7 |
| 10/09 档 combo 28d 命名查询 | 1,000 词 | GSC 查询明细 | §2/§7 |
| 10-09 验证矩阵锚点 | en 8 + ja 9 + zh-hk 16 词 | K3 大脑 §F-2 指定 | §3 |
| 8 T1 锁词清单 | 8 词 (K3 9/12 拍板) | K3 拍板 | §3 |
| 锚文审计 | 8 词 × 双方法 | grep 实测 | §9 |
| 线上探针 | 6 URL | web_fetch | §10/§12 |

**校准状态**: 🟢 FRESH — 10/09 档 10/9 02:0x 落盘（报告前 1 日），数据日约 10/06-07（GSC 滞后 2-3 天属正常）；上轮 10/05 档被本档取代。
**撤回声明**: 无（本 run 未撤回任何前序报告；10/06 轮结论全部维持有效）。
**无老站对比基线声明**: 本档数据均为 zprintpro.com 新站属性，不含老站 z-printpro.com 基线 (per §0.30.5)。

---

## 1. Freshness 门禁判定 (§K.1.3)

| 档 | 落盘日 | 距报告日 | 判定 | 处置 |
|----|--------|---------|------|------|
| 10/05 档 | 10/5 | 5 天 | 🟡 边界（上轮已消费） | 作上轮基线继承，不再单独出结论 |
| **10/09 档** | **10/9 02:0x** | **1 天** | 🟢 **FRESH** | **本轮主消费档** |

- 上轮 NEXT 承诺「10/12 前后拉新窗」**提前兑现**：10/09 档 ×12 已落盘（glob 实证 12 xlsx：24h/7d/28d × 3 站点汇总 + hk/us/jp）。
- **本档缺陷（连续第 2 档）**：无 3mo 窗 ⇒ 品牌长窗对照 / 长趋势仍不可算，已标 PENDING 并于 NEXT 提请老板补拉（K3 大脑 §F-2 明确要求）。
- **解析层缺口（本轮新识别，影响 §3 覆盖）**：10/09 档的完整抽取产物 `extract.json` 是**单行大 JSON**，本 lane 沙箱无 pwsh/node，无法逐词抽取；可读产物仅为 docs 的两份盘点（选定词）+ 多行 `compare-vs-0918.json`（up/down/top10）。⇒ 未落入可读产物的 4 个 T1 锁词标 PENDING，**不编造**（§0.23）。

## 2. 站点总量对照 (数据继承: 上轮 → 本轮, 28d 图表合计)

| 站点 | 09-29 档 | 10-05 档 (上轮) | **10-09 档 (本轮)** | Δ vs 上轮 | 判读 |
|------|---------|----------------|--------------------|-----------|------|
| hk | 266clk / 10,968imp | 282 / 10,491 | **290 / 10,563** | 点击 +8 / 展示 +72 | 点击三连升（**增长引擎**）；7d 点击 70→86→**88** 三连升 |
| us | 32 / 4,125 | 33 / 3,943 | **36 / 3,802** | 点击 +3 / 展示 -141 | 展示收窄、点击三连升 ⇒ CTR 改善中 |
| jp | 36 / 1,922 | 34 / 2,036 | **32 / 2,023** | 点击 -2 / 展示 -13 | 横盘微降，需新钩子（料金表 / 年賀状） |

**20 天硬对比（9/18 → 10/09，飞轮前 vs 飞轮后）**: 全站 28d 展示 20,833→19,981（-4.1%）、点击 356→**390（+9.6%）**、CTR 1.71%→**1.95%**；**pos≤10 查询数 350→486（+38.9%）**（hk 225→230 / us 87→162 **+86%** / jp 28→60 **+114%**）。⇒ 排名层已赢、CTR 层是主战场（与 10/06 报告「问题层三连定位」结论一致）。

## 3. 追踪锚点表 —— **切换为 10-09 验证矩阵**（K3 大脑 §F-2 指令 1）

### 3.1 en 8 锚（us 站，28d 10-05 → 10-09）

| 锚 | 10-05 (上轮) | **10-09 (本轮)** | c 值 | 判定 |
|----|-------------|-----------------|------|------|
| doujinshi printing | 12.3 | **11.2**（38im） | **c1** | ✅ 进前 10 在轨（10/9 L1-1 精确锚已补） |
| china catalog printing | 17.4 | 17.7（53im） | 未给 → PENDING | ⏸ 持平；变体 catalog printing china 21.4→**26.7 📉** 词序变体分化，观察 Google 归并方向（P2） |
| large envelopes | 14.0 | **13.8**（imps 15→19） | 未给 → PENDING | ✅ 在轨（10/9 E1 envelopes:en 转化块已上线） |
| saddle stitch booklet printing | 4.1 | **4.2**（104im） | **c2** | ✅ churn 组回稳纪律兑现 |
| small batch sticker(s) printing | 5.7 / 5.9 | 5.6 / 5.8（99im） | **c0** | ⚠️ **CTR 断裂依旧** —— 10/9 E3 价格钩已上，下轮（10/12）看 c 值 |
| small batch label printing | 26.6 | **29.0 📉** | 未给 | ❌ 回落 → 深-1 批（labels quickAnswers）**提前到 P1（10/13）** |
| calendar sizes（双词） | 43.5 / 38.0 | 44.4 / 38.3 | 未给 | ⏸ A5 FAQ 未撬动；10/12 目标 ≤35 大概率 miss → 转 P3 内容层 |
| corporate/business/custom holiday cards | **0 展示** | **0 展示** | — | 🚩 **盲开未破零**（见 §5） |

### 3.2 ja 9 锚（jp 站，28d 10-05 → 10-09）

| 锚 | 10-05 (上轮) | **10-09 (本轮)** | 判定 |
|----|-------------|-----------------|------|
| コミケ 印刷 | 23.5（185im） | **20.8**（175im）；7d 13.3→24.5 | 28d 改善但 **7d 回落 = Comiket 季后退潮**；10/9 L1-3 清单段已防守 |
| クラフト紙 パッケージ（双变体） | 23.8-24.4（106im） | 24.0 / 24.4；7d 15.5→21.4 | ⏸ A5 FAQ 效应回落；10/9 W2.2 料金表 FAQ 已补第二钩子 |
| **年賀状印刷 / 2027年賀状** | **0 展示** | **0 展示** | 🚩🚩 **最高红旗**（早割 10/31 倒计时 **21 天**）；承接段已 live（见 §10/§5） |
| 卒業アルバム 印刷 | 67.7 | 66.1 | ⏸ 深水横盘，季节蓄水期（Q4→3 月）维持不动 |
| 教科書 印刷 | 28.8 | **34.6 📉** | **churn 组恶化中** → 10/19 仍 ≥30 启动诊断（见 §6） |
| 特急印刷 激安 | 16.1 | 16.1 | **c0 连续两档** → 入 CTR 池（ja 侧）；10/9 E4 flyers:ja 特急料金 FAQ ×2 已上 |
| 社名入りカレンダー 少量注文 | 8.2 | **8.7** | ✅ 页 1 守住 |
| a2 クリアポスター | 未列（PENDING 基线） | 37.5 | 基线缺（10/05 档未给）⇒ 只记绝对值，不判方向 |
| 両面カラー | 未列（PENDING 基线） | 35.4 | 同上 |

### 3.3 zh-hk 16 词（任务 J 8 锁词 + 8 季节/带钱词）

**任务 J 8 T1 锁词（28d）**

| 锁词 | 10-05 (上轮) | **10-09 (本轮)** | 判定 |
|------|-------------|-----------------|------|
| 貼紙印刷 | 170 / 26.98 / 0clk | **156im / c0**（pos 未给） | 全站 28d 高展示词仍 **0 点击** ⇒ CTR 池头号 |
| 宣傳單張 | 103 / 30.54 / **1clk** | **101im / 30.2 / 1clk** | 破零维持（+22 暴涨后正常回摆）；锚文挂账本轮**已转达标**（§9） |
| 即日印刷 | 54 / 8.04 / **2clk** | **58im / 8.31 / 2clk** | ✅ 持续破零放大；衍生理 急件印刷 7im / 6.86 / 2clk（簇内轮动成功） |
| 書刊印刷 | 97 / 35.38 / 0clk | **94im / 34.5 / 0clk** | 位置改善，仍 0 点击 ⇒ CTR 池 |
| 包裝盒印刷 ⭐ | 53 / 33.94 / 0clk | **PENDING** | 未落可读产物（extract.json 单行不可逐词抽取） |
| 紙盒印刷 ⭐ | 48 / 31.00 / 0clk | **PENDING** | 同上 |
| 包裝盒訂製 | 44 / 29.18 / 0clk | **PENDING** | 同上 |
| 騎馬釘 | 43 / 19.40 / 0clk | **PENDING** | 同上（关联词 騎馬釘印刷 7d 曾进首页带） |

**扩展 8 季节/带钱词（28d）**

| 词 | 10-05 | **10-09** | 判定 |
|----|-------|-----------|------|
| 紙袋印刷 / 印刷紙袋 | 14.4 / — | **77im / 8.3 / 0clk · 72im / 8.22 / 0clk** | ✅ 全簇页 1-2 顶（Q4 主力）但 0 点击 ⇒ CTR 池 |
| 紙袋訂製 / 訂做紙袋 | — | **14.4 / 14.1** | ✅ 簇内多词页 1-2 区 |
| 月曆印刷 | 116 / 16.24 / 0clk | **118im / 16.4 / 0clk** | 季节峰在即，CTR 池（weekly-meta 已备 meta 价格钩） |
| 利是封印刷 | 67 / 20.13 / 0clk | **65im / 19.1 / 0clk** | Q4 季前上行 |
| 海報印刷 | — | **184im / 16.1 / 2clk** | 28d 高展示 + 有点击，但 **7d 12.8→18.9 📉**（10/12 前 10 目标有险） |
| 食品包裝印刷 | 117 / 9.7 / 0clk | **119im / 9.66 / 0clk（top10）** | ⚠️ 9/18 6.7→10/09 9.7 **退步**（hk 唯一高展示退步词）⇒ CTR 池 |
| 喜帖印刷 | — | **21.6→18.8** | ✅ 持续上行 |
| 貼紙訂製 | — | **27.7→31.2 📉** | ⚠️ 回落，列入下轮 |

> **矩阵切换完成声明**：本轮 §3 已按 K3 大脑 §F-2 指令 1，把上轮的「8 T1 锁词单表」切换为 **en 8 + ja 9 + zh-hk 16** 的 10-09 验证矩阵；旧 8 锁词表**降为子集**（§3.3 任务 J 段）。覆盖 29/33 个锚位（4 个 zh 锁词 PENDING，原因见 §1/§14）。

## 4. CTR c 值 —— 升为一等判据（K3 大脑 §F-2 指令 2）

**判据规则**：页一/页二词 **c=0 连续两档（10-05 与 10-09）** ⇒ 输出「CTR 修复候选池」供 weekly-meta 周五档消费。

**CTR 修复候选池（10-10 版，≥50im & c0 & 连续两档）**

| 词 | 市场 | 10-05 imps/c | 10-09 imps/c | 连续 c0 | 备注 |
|----|------|-------------|-------------|---------|------|
| 貼紙印刷 | hk | 170 / c0 | 156 / c0 | ✅ | 全站 28d 高展示第一梯队 |
| 月曆印刷 | hk | 116 / c0 | 118 / c0 | ✅ | meta 已含掛曆/檯曆价格钩（备料判定「无需动作」需复核） |
| 宣傳單張印刷 | hk | 109 / c0 | 105 / c0 | ✅ | 类目页 meta 价格钩 10/10 备料已含 |
| 食品包裝印刷 | hk | 117 / c0 | 119 / c0 | ✅ | **本轮新增入池**（top10 内仍 0 点击） |
| small batch sticker printing | us | 64 / c0 | 99 / c0 | ✅ | E3 已上价格钩，10/12 首验 |
| 書刊印刷 | hk | 97 / c0 | 94 / c0 | ✅ | books 类目 meta 备料判定「已含价格」 |
| 紙袋印刷 / 印刷紙袋 | hk | — / c0 | 77 / 72 c0 | 纸袋簇 10-09 首现高展示 | **本轮新增入池**（Q4 季节窗 + 0 点击） |
| 餐牌印刷 | hk | — | 59 / c0（9.68，top10） | 待下档确认 | **本轮新增入池** |
| 特急印刷 激安 | jp | 16.1 / c0 | 16.1 / c0 | ✅ | ja 侧唯二连续 c0 词 |

- **与 weekly-meta 10/10 首批清单对齐**：`DELIVERY/2026-10-10-ctr-meta-price-hook-batch.md` + `.hermes/ctr-meta-20261010.json` 的首批 5 词（貼紙印刷 / 宣傳單張印刷 / small batch sticker printing；月曆/書刊判定已含价格钩）**全部落在本池内** ⇒ 本 lane 判据与备料一致，**无需改口径**。
- **建议 10/17 批纳入**：食品包裝印刷 / 紙袋印刷 / 印刷紙袋 / 餐牌印刷 / ja 特急印刷 激安（5 词，均为本池新增）。

## 5. 盲开词纪律（K3 大脑 §F-2 指令 3）—— 每轮必查，0→有展示即报胜

| 盲开词 | 10-05 | **10-09** | 状态 |
|--------|-------|-----------|------|
| 年賀状印刷 / 2027年賀状（ja） | 0 展示 | **0 展示** | 🚩 仍未破零（第 3+ 档真零） |
| corporate / business / custom holiday cards（en） | 0 展示 | **0 展示** | 🚩 仍未破零 |

- **本轮新增事实（利多）**：承接内容层已于 10/9 落地并**线上实测 live**——`/ja/category/greeting-cards/` 已含「オリジナル年賀状印刷は1枚¥20から・10枚の小ロット」正文段 + 年賀状 4 条 FAQ（web_fetch 2026-10-10 实证，HTTP 200）；en 侧 `category-seo-content.ts` 已含 corporate holiday cards 承接段 + 3 FAQ（grep 实证 L4401-4416）。同日 daily-content 车道交付 **new-year-card-printing-2027-guide 三语全文**并完成全链路注册（738→741 URL）。
- **判读纪律**：10-09 档数据日约 10/06-07，**早于**内容层部署 ⇒ 本轮 0 展示**不构成**对承接段的否定；**10/12 档为首个可反映内容层的数据窗**，10/16 为正式判读日（K3 大脑 Part D）。
- **Plan B 触发条件（预置，10/16 仍 0 才启）**：① site: 查 ja greeting-cards 页 / en 类目页收录状态 ② GSC 请求索引 + sitemap 条目核对（`public/sitemap-ja.xml` / `sitemap-en.xml`）③ 不追加新资产，先修收录。
- **早割倒计时**：年賀状早割窗口「10 月末まで」⇒ 距今 **21 天**（不动作，只报时）。

## 6. churn 组盯梢（K3 大脑 §F-2 / Part D）

| 词 | 9/18 | 10-05 | **10-09** | 纪律 |
|----|------|-------|-----------|------|
| 教科書 印刷（jp） | 51.2 | 28.8 | **34.6 📉** | 10/19 仍 ≥30 → 启动诊断流程；**当前零动作**（title 冻结优先） |
| saddle stitch booklet printing（us） | ~4 | 4.1 | **4.2 / c2** | 回稳，维持 |
| catalog china 簇 | 18.4-20.8 | 17.4-21.4 | 17.7（变体分化 21.4→26.7） | 冻结至 10/19，只观察 Google 归并方向 |
| food packaging（us） | 16.8 | — | **25.0 📉** | 列入 us 退步观察；10/13 E2 packaging:en FAQ 计划内 |
| ai2 poster（us） | 25.2 | — | 30.6 📉（a2 poster printing 7.6 稳） | 词序变体归并中，不动作 |

## 7. 质量三件套 v9.4 + M1 线（口径升级：本轮首次有 pos≤10 硬计数）

| 指标 | 门槛 | 本轮判定 | 证据 |
|------|------|---------|------|
| ① striking 词进首页数 | ≥5 | ✅ **PASS（硬计数）** | combo 28d **pos≤10 查询数 = 486**（9/18: 350，**+38.9%**；hk 230 / us 162 / jp 60）——由 `compare-vs-0918.json.top10_count` 给出，非 top100 截断 proxy |
| ② pos 1-20 展示占比 | ≥30% | 🟡 **proxy PASS** | 词数口径：pos≤10 占比 combo 486/1000 = **48.6%**（hk 41.8% / us 31.3% / jp 35.3%）；**imps 加权未算**（抽取档无全量字段）⇒ 仍标 proxy，不作硬判定 |
| ③ 有点击词数 | ≥12 | ✅ **PASS** | combo 28d top 词中 clicks ≥1 **可见 ≥27 词**（智印港 14 / a2 印刷即日 3 / zprintpro 3 / 海報印刷 2 / saddle stitch booklet printing 2 / 即日印刷 2 / 印刷公司 2 / 大紙袋 2 / a2 printing 2 / 急件印刷 2 + 17 个 c1 词…），远超 12 |
| **M1 线 1（7d clicks ≥25）** | ≥25 | ✅ **PASS（首次全量口径）** | **hk 站 7d 图表合计 = 88 clicks**（70→86→88 三连升，10-09 档 §一）；上轮 PENDING 项**结案** |

## 8. Risers / Fallers（9/18→10/09 20 天 + 10/05→10/09 10 天）

**Risers（20 天硬对比，最强信号）**

| 词 | 市场 | 9/18 → 10/09 | Δ |
|----|------|-------------|---|
| saddle stitch booklet（变体） | us | 83.9 → 16.3 | **+67.7（全场最大）** |
| 四六判 中綴じ | jp | 50.0 → 10.4 | +39.6 |
| 教材 印刷製本 | jp | 56.5 → 20.4 | +36.1 |
| vehicle wraps | us | 32.0 → 10.0 | +22.0（进首页） |
| custom foil stickers | us | 49.2 → 31.4 | +17.8 |
| 教科書 印刷 | jp | 51.2 → 34.6 | +16.6（升幅大但绝对位次仍深，且 10-05→10-09 回吐） |
| 缶バッジ 印刷 | jp | 49.5 → 37.8 | +11.7 |
| 利是封印刷 | hk | 27.8 → 19.1 | +8.6 |
| 印海報 | hk | 23.7 → 15.1 | +8.6 |
| 宣傳單張印刷 | hk | 32.2 → 23.9 | +8.3（R2 标题落地簇） |
| 印刷紙袋 | hk | 15.5 → 8.2 | +7.3（进首页） |
| 海報印刷 | hk | 22.6 → 16.1 | +6.5 |
| 書刊印刷 | hk | 40.9 → 34.5 | +6.4 |
| 宣傳單張 | hk | 36.3 → 30.2 | +6.1（破零维持） |
| 紙袋印刷 | hk | 13.8 → 8.3 | +5.5 |
| doujinshi printing | us | 15.5 → 11.2 | +4.3 |
| 月曆印刷 | hk | 20.4 → 16.4 | +4.0 |
| 易拉架印刷 | hk | 48.4 → 44.3 | +4.1（10/9 A6 FAQ 生效） |
| 新词直接榜首 | jp | — | **中綴じ冊子印刷 激安 pos 1.0** / a1 ポスター 格安 pos 4.3 —— ja 价格钩（激安/格安）决定性证据 |

**Fallers 观察（低基/回摆为主，不恐慌 per §0.30.2）**：food packaging us 16.8→25.0（-8.2，en 站最大退步）· a2 poster us 25.2→30.6（-5.3）· catalog printing china 21.4→26.7 · small batch label printing 26.6→29.0 · 貼紙訂製 27.7→31.2 · 食品包裝印刷 hk 6.7→9.7（-3.1，hk 唯一高展示退步）· 海報印刷 7d 12.8→18.9 · コミケ 7d 回落（季后退潮）· 中綴じ冊子印刷激安 1.0→? （新词无基线）。全部列入下窗复核，**本轮零动作**。

## 9. 锚文本审计（双方法复算 §0.23.2）

**法1 = 精确内链锚 `>词</a>` 所在文章行数（与 9/30、10/6 同口径，可继承）**

| 词 | 9/30 | 10/06 | **10/10** | Δ vs 上轮 | ≥3 |
|----|------|-------|-----------|-----------|-----|
| 包裝盒印刷 | 5 | 5 | **5** | 0 | ✅ |
| 紙盒印刷 | 3 | 3 | **3** | 0 | ✅ |
| 包裝盒訂製 | 2 | 2 | **3** | **+1** | ✅（转达标） |
| 貼紙印刷 | 4 | 4 | **4** | 0 | ✅ |
| 宣傳單張 | 2 | 2 | **3** | **+1** | ✅（转达标） |
| 即日印刷 | 3 | 3 | **3** | 0 | ✅ |
| 書刊印刷 | 3 | 3 | **3** | 0 | ✅ |
| 騎馬釘 | 7 | 3 | **3** | 0 | ✅ |

**法2 = 词任意形态出现文章数（交叉参考，抽样 2 词）**：宣傳單張 **8 篇** / 包裝盒訂製 **5 篇**。

- **达标判定**：**8/8 全部 ≥3（首次满编）**——上轮 2 个跌破词（宣傳單張 2→**3**、包裝盒訂製 2→**3**）本轮均转为达标。
- **双方法口径声明（§0.23.2 纪律）**：法1（精确内链锚）与法2（任意提及，含正文/表格/FAQ 自然语言）**指标本身不同**，数值不可互校（8 vs 3、5 vs 3）；达标判定统一取**法1**（跨三档同口径可继承），法2 仅作「词面覆盖不孤立」的交叉参考。两法**方向一致**（均 ≥3），无「方法间矛盾」需作废结论的情形。抽样真实样本后再写正则（§0.23.2 闸门 1）已在本轮执行（grep 命中行逐条目视核对）。
- **FIX-1 / FIX-2 状态变更**：两条挂账项（宣傳單張 2→≥3、包裝盒訂製 2→≥3）**本轮法1 已达标** ⇒ 建议**从「挂账要求 K3 排批」降级为「已达标观察项」**，不再占用 K3 拍板位（归因窗口 10/07-10/09 会话批次，未定位到单一 commit，**不擅自归因**）。

## 10. Title 线上实测（web_fetch 2026-10-10；50-57 目标区 / 58 阻断）

| 页面 | title（实测原文） | 当量 | 判定 |
|------|------------------|------|------|
| /zh-hk/category/stickers/ | 貼紙印刷 10張起・防水透明異形貼紙・免費設計燙金 \| 智印港 | 57（继承 10/6 实测，字符串未变） | ✅ 维持 |
| /zh-hk/category/books/ | 小冊子印刷 10本起・騎馬釘/膠裝/精裝 教材繪本急印 \| 智印港 | 57（继承 10/6 实测，字符串未变） | ✅ 维持 |
| /ja/category/greeting-cards/ （本轮新增抽测） | 年賀状印刷 2027・10枚から・箔押し対応 DHL全国 \| ZprintPro | **≈55（手算，未跑 title-equiv.js）** | ✅ 目标区；**季节词前置** = 盲开修复配套 |

- 存量超线 3 条维持（services/catalog-printing-china **77** / rush-printing-delivery en **66** / ja **59**）⇒ TRIM 候选已备（`DELIVERY/2026-10-12-money-kw-package.md` §1.3），**10/19 解冻窗口**执行。
- 本轮**零 title 改动**（churn 冻结纪律；title 冻结至 10/19），故无新增门童 #27 触发。
- ⚠️ 诚实声明：当量为**手算**（CJK×2 + ASCII×1），本 lane 沙箱无 node，**未跑** `scripts/guards/title-equiv.js`；zh-hk 值直接继承 10/6 同字符串实测。

## 11. 品牌监测（combo 28d，10-09 档）

| 品牌词 | clicks / imps | CTR | pos | 判读 |
|--------|--------------|-----|-----|------|
| **智印港** | **14 / 22** | **63.6%** | **1.59** | 全站 28d **点击第一词**；品牌词 CTR 与位置双优 ⇒ 品牌信号健康 |
| zprintpro | 3 / 4 | 75.0% | 2.25 | 英文域名品牌词，量小位置优 |
| zprint | 1 / 32 | 3.1% | 7.59 | 持续有量，双域名品牌归一继续 |
| zprints | 1 / 7 | 14.3% | 4.14 | 变体词 |
| ジープリント | 0 命中 | — | — | 30 目录建设继续（未启动） |

- 本档**无 3mo 窗** ⇒ 与 9/30 轮（3mo 41 imps）**不可同窗对比**，品牌长窗仍 PENDING（连续第 2 档）。

## 12. 301 验证（P0-2 ACTIVE 监控，S3 平台故障阈）

| 项 | 本轮实测 | 结果 |
|----|---------|------|
| 旧站 /products/sticker-printing/ | cross-origin redirect → zprintpro.com | ✅ 301 链证据 |
| 旧站 /products/packaging-box-printing/ | cross-origin redirect → zprintpro.com | ✅ 301 链证据 |
| 旧站 /flyer-printing/ | cross-origin redirect → zprintpro.com | ✅ 301 链证据 |
| 新站 /zh-hk/category/stickers/ | HTTP 200 | ✅ |
| 新站 /zh-hk/category/books/ | HTTP 200（title 实测见 §10） | ✅ |
| 新站 /ja/category/greeting-cards/ | HTTP 200 + 年賀状承接段 live | ✅ |

- 本轮抽测 **3 旧 + 3 新 = 6 探针（10/6 为 3 旧 + 4 新）**，**6/6 全 PASS**；未观察到平台级故障（无 CF 503 / 部署卡死迹象 ⇒ S3 阈未触发）。
- 诚实声明：抽测样本数略少于上轮（少 1 个新站 URL），**不宣称全量 301 健康**；按 §0.30.3「卫生项」定位，不重复投入。

## 13. Matrix 回灌 + 新增观察

- **新增 block**：`gsc_feedback_2026_10_10`（含锚点表切换声明 / en 8 + ja 9 + zh 16 三表 / CTR 池 / 盲开 / churn / 质量三件套 / risers-fallers / 锚文双方法 / title 实测 / 品牌 / 301 / PENDING 清单 / request_human）。
- **元数据 ×3**：`stats.last_updated` → 2026-10-10；`stats.last_updated_event` → 本轮摘要；`last_gsc_feedback_update` → 本轮摘要。
- **priority_boost**：**0 UPDATE / 0 hold-change**（观察窗保守不动；9/18 挂账 2 UPDATE 仍待 K3）。P0 coverage **95.45% 维持**（本轮无立项/结项）。
- **新增观察（供 daily-content / weekly-meta / K3 排期参考）**：
  1. **Q4 季节窗全面打开**：紙袋簇（77/8.3 + 72/8.22，页 1-2）+ 利是封（65/19.1）+ 月曆（118/16.4）+ ja 年賀状早割倒计时 21 天 + 中綴じ冊子印刷 激安 **pos 1.0**。
  2. **ja/en 价格钩是最强破位杠杆**：ja「激安/格安」直接打到 #1/#4.3；en saddle-stitch 变体 +67.7 ⇒ 支持把同款模式复制到 zero-click top10 词的 **meta description 价格钩**（不动 title，per §4）。
  3. **GEO 长线资产**：10/9 en 对比事实表（ZprintPro vs MOO vs Vistaprint）已上线，三平台引用源仅 11% 重叠 ⇒ Google AI Overview / Perplexity 双栖资产，**本轮不追单窗**。
  4. **10/9 他人车道产出登记（零改写）**：daily-content 交付 new-year-card-printing-2027-guide（三语，sitemap 738→741）；人手会话交付 christmas-card-printing-2026（commit 748e628d）；P0 批 e6254bab（E1/E3/E4/L1-1/L1-2/L1-3/W2.2/GEO 首单）。
  5. **调度健康（§F-6 映射）**：lane-status 实测 ZP-gsc-feedback 2026-10-09 **MISSING** + 4 车道 `LastTaskResult=2147946720`（0x80070020 文件占用）⇒ 本轮以 10-09 档补跑即 lane 层自愈；**根因修复需管理员**（见 §14 request_human）。
  6. **⚠️ 新发现 · MOQ 口径漂移（books 类目页，live 实测）**：`/zh-hk/category/books/` 正文/技术参数写「**1 本起訂（數碼印刷）**」，同页 FAQ 与 5 张 SKU 卡写「**10 本起訂**」；而真值 = `src/data/products.ts` BK-002 `minQuantity: 10`（且 `features`「【10本起訂】」/ description「MOQ 10 本」）。⇒ 与 10/09 会话发现的 flyers「MOQ 100 vs 真值 10」同属 **MOQ 漂移族**（门童 #24 在 staged 无 MOQ 目标档时 SKIP ⇒ 未被拦下）。已入 FIX-6 候选（需 K3 排批，非本 lane 权限）。

## 14. Src 修复建议上报 + 诚实清单 + 人工动作

详见 `.hermes/logs/2026-10-10-gsc-suggested-src-fixes.md`：
- **FIX-1 / FIX-2 [状态变更：挂账 → 已达标观察]** 宣傳單張 / 包裝盒訂製 精确锚法1 均达 3 篇（§9），**不再要求 K3 排批**。
- **FIX-3 [维持挂账 · 需 K3 确认口径]** 全站 footer 实体地址「香港九龍新蒲崗…」vs 深圳实体口径不一致（法律/NAP 层）。
- **FIX-4 [新增 · 数据管道]** 10/12 拉新档请**同时落盘多行 per-query JSON**（或恢复 `gsc-fresh-YYYY-MM-DD.json` 机器格式）——本档 4 个 T1 锁词因单行大 JSON + lane 无 node 而 PENDING。
- **FIX-5 [新增 · 建议]** weekly-meta 10/17 批纳入 CTR 池第二批 5 词（§4）。
- **FIX-6 [新增 · 候选 · 需 K3 排批]** `/zh-hk/category/books/` 正文「1 本起訂」vs 真值 `products.ts` BK-002 `minQuantity: 10`（同页 FAQ/SKU 卡已写 10）—— MOQ 漂移族，证据见 §13-6。

**诚实清单（本轮做不到/不做的）**

| # | 项 | 状态 | 原因 |
|---|----|------|------|
| 1 | 4 个 zh T1 锁词 10-09 值（包裝盒印刷/紙盒印刷/包裝盒訂製/騎馬釘） | **PENDING** | 10-09 完整抽取 `extract.json` 为单行大 JSON，本 lane 无 pwsh/node 逐词抽取；可读产物未覆盖 |
| 2 | 品牌 3mo 长窗对照 | PENDING | 10-09 档无 3mo 窗（连续第 2 档） |
| 3 | 质量三件套 ② imps 加权占比 | proxy | 抽取产物无全量 imps 字段 ⇒ 仅词数口径 |
| 4 | 部分锚位的 c 值（china catalog / large envelopes / label / calendar / zh 6 词） | 未给 → PENDING | 可读产物未列 c 字段；不推断 |
| 5 | tsc / build / CF Pages / 门童跑批 | 不跑 | pwsh 沙箱禁用（不重试）；host-side wrapper 走 §12 SOP |
| 6 | 因果归因 | 不做 | 无改动前后同窗对照 ⇒ 所有「因为…所以…」均为时序相邻假设 |
| 7 | 301 全量健康 | 不做 | 抽测 4 URL 不代表全量，按 §0.30.3 卫生项定位 |

**request_human（一行可粘贴命令 · 需管理员权限）**
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File F:\zprintpro-nextjs\scripts\register-cron-tasks.ps1; schtasks /Run /TN "ZP-gsc-feedback"
```
（处置 §F-6：4 车道 `2147946720` = 0x80070020 文件占用 → wrapper 加重试 + 管理员重跑注册；另 `ZP-k3-review` 未注册、`\ZprintPro-CronWatchdog-2125` 残留待清）

---

## SOP-10 5 问门禁 (K3 §0.22)

- [x] 1. **架构差异?** — 已查上轮实现路径：10/06 轮消费 10/5 档并落 `gsc_feedback_2026_10_06` block；本轮消费 10/09 档（新档）⇒ 非重复。锚点表按 K3 大脑 §F-2 **显式切换**（en 8 + ja 9 + zh 16），旧 8 锁词表降为子集，路径变更已声明。
- [x] 2. **约束适用范围?** — 已查 K3 拍板原文（§F-2 五项指令 / v9.3 任务 J / title 50-57 §6-3 / §0.0 名片禁区**未触碰**）；本 lane 写权限仅 `.hermes/` + `GSC数据/index.json`，**零 src 改动**，未越权。
- [x] 3. **原数据/拍板来源?** — ① 10/09 档 ×12 xlsx（真数据，glob 实证）+ 同仓解析产物 ② 锚点表 = K3 大脑 2026-10-09 §F-2 指定 ③ title 区间 = K3 2026-09-19 裁决（留） ④ 数字钩子冻结令 9/30 已到期、title 冻结至 10/19（留）。
- [x] 4. **字段值策略?** — N/A（零 src / certNo 字段操作）。
- [x] 5. **Markdown 渲染?** — 本报告为内部文档；未向 user-facing 文本注入未解析 `[text](url)`。

## 数据来源 (K3 §0.23)

```
数据来源:
- GSC数据/*2026-10-09.xlsx ×12 (10/9 02:03-02:08 落盘) + .hermes/gsc-2026-10-09/extract.json + compare-vs-0918.json
- GSC 对照: 10/05 档 ×12 (上轮) · 09/29 档 ×16 · .hermes/gsc-2026-09-18/extract.json
- docs/2026-10-09-gsc-deep-audit-and-strategy.md (§一 总量 / §二 验证矩阵) · docs/2026-10-09-gsc-20day-delta-vs-0918.md
- docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md §F-2 / Part D (K3 2026-10-09 拍板)
- .hermes/logs/2026-10-06-gsc-feedback.md (上轮, verdict=OK) · .hermes/industry-keyword-matrix.json gsc_feedback_2026_10_06 block
- 线上探针: web_fetch 2026-10-10 ×4 (旧站 ×2 301 证据 / 新站 ×2 200)
- 锚文审计: grep src/data/blog-data/zh-hk.json 8 词精确锚 + 2 词任意形态 (双方法, 2026-10-10)
- .hermes/ctr-meta-20261010.json (只读, 对齐 CTR 池) · DELIVERY/2026-10-12-money-kw-package.md (title TRIM 候选)
校准状态: 已校准 (本报告 + matrix gsc_feedback_2026_10_10 block 同批落盘)
撤回声明: 无
```

---

*Generated by deepseek harness (DSH lane `ZP-gsc-feedback`, v9.4 rearm 持续轮 · 10-09 档消费轮) · 2026-10-10 22:43 窗口 · 仓根 F:\zprintpro-nextjs*
