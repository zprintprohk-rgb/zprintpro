# ZP-weekly-meta — 2026-10-30（SEO 健康周报 · 恢复期口径 · 类别 title 当量 TRIM 批 · 结果总线消费轮）

VERDICT: OK
RECOVERY: **105.8%**（同口径：24h 793 ÷ 28d 日均 749.2，全国家口径；`gsc-cliff-2026-10-30.json` `realtime_24h.recovery_ratio_vs_mean28_dynamic`）
RECOVERY_SOURCE: `gsc-cliff-2026-10-30.json` — 同文件另有 `recovery_ratio_vs_precliff = 135.5%`，其分母为固定 585.2（hk+jp+us 单站和），文件自身已标注「与全国家 714.71 不可比」⇒ 135.5% **不得单独引用**。10-29 车道口径 109.9%（7d 785.43 ÷ 3mo 断崖前 714.71）为不同窗口定义，方向一致（>100%），**不可与本轮 105.8% 直接相减**。
CONSUMED: run-context-ZP-weekly-meta.json @ 2026-10-30 07:01:28 | lane-status.json @ 2026-10-29T22:43:03.988Z | lane-results-bus-contract.md（v1 + 2026-10-26 §6 + 2026-10-28 §7）| periodic-review-weekly-2026-10-30.json/.md（契约 §7.3.2 强制首读）| GSC数据/index.json（lastBuild 2026-10-29T03:46 / FRESH / stalenessDays 0 / totalFiles 238）| gsc-cliff-2026-10-24..30.json ×7 | 2026-10-29-ZP-gsc-feedback.md（28d 逐词池）| strategy-task-queue.json | b1c-queue-progress.json（order 1-30）| 仓内一手：src/lib/seo.ts（categorySeoData 16 类目 × 3 语）
DELIVERED: `src/lib/seo.ts`（2 条 zh-hk 类目 title 当量 TRIM：calendars L513 83→52、envelopes L549 62→56；描述/slug/价格/MOQ/schema 零改动）| `.hermes/logs/2026-10-30-weekly-meta-ledger.json`（本批机器可读台账：16 槽当量审计 + 候选冻结映射 + 决策 + 未执行项）| `.hermes/logs/2026-10-30-ZP-weekly-meta.md`（本报告）
NEXT: ① host 侧跑门禁链 + tsc 54=54 + 部署后 curl 2 页 `<title>` 复验（本 lane 无 node/pwsh）② 2026-11-06 复 calendars/envelopes 28d 档（≥1 点击 = 胜；imp 不低于基线 80%）③ K3 裁示 3 个残余超线槽：flyers 59（poster_flyer_rush 簇冻结）/ japan-doujin 66（doujin 簇冻结）/ greeting-cards 72（§0.0 展示层待裁）④ 周六 blog-deepfix 侧补跑 8-gram 相似度（§4 未执行项）⑤ 周一 11-01 月复盘接 11 月队列

IDEMPOTENCY: 本轮 key = `2d920c1eb06bb1a1`；`run-context.retry_queue = []` ⇒ 无 `RETRY_OF`。上一轮 `ZP-weekly-meta-20261010T001056` verdict=OK，已交付 5 条 category description 词面前置 ⇒ 本轮**不重做**该 5 槽（且其中 packaging 槽已于 10-23 被真值批整行重写，见 §4）。
BOUNDARY: 零 description 写入（逐词理由见 §7）；零 title 写入于 10/26 冻结批（§8）；未改 slug / 路由 / 301 / 价格 / MOQ / schema / 图片 / 贺卡资产 / middleware。

---

## 0. 一句话结论

**恢复系数同口径 105.8%（>100%，恢复确认），28d 点击 497 / 展示 20,977 / CTR 2.37% / 平均排名 13.52。** 本周唯一可执行的合规缺口不在 description 而在**类目 title 当量**：全 16 个 zh-hk 类目逐槽手算后，5 槽超 58 阻断线，其中 **calendars（83 当量）与 envelopes（62 当量）不在 10/26 七簇冻结面**，本轮 TRIM 至 52 / 56；flyers（59）与 japan-doujin（66）虽同为超线，但落在 10/26 冻结的簇主 URL 分工表内，**按契约不动**；greeting-cards（72）属 §0.0 待裁资产，不动。**meta description 本批零写入**：zero-click 池前 12 个高展示词中，pos≤20 的 6 个全部落在 5 个 WAITING_K3 任务或词面已齐备的页面上，其余 pos>20 的摘要层改动在 14/28 天窗口内不可测 —— 这是有证据的 NO_OP，不是延后。

---

## 1. 数据源状态（cron SSoT 要求 normal / fallback）

| 项 | 值 | 判定 |
|---|---|---|
| 数据源模式 | **normal**（非 fallback） | 4 档（24h/7d/28d/3mo）三站点汇总 xlsx 已于 10-29 01:16-01:23 落盘并被 gsc-feedback 消费 |
| freshnessStatus | **FRESH**（stalenessDays = 0，门禁 72h） | ✅ 允许输出带数字结论 |
| 数据日 | 28d 窗止 **2026-10-26**，档龄 4 天 | GSC 滞后 2-3 天属正常 |
| 口径 | **全国家**（非 hk+jp+us 三站过滤） | 与 10-28 报告 582.4/108.3% **不可直接比较** |
| 解析层 | 本 lane 无 node/pwsh，不重解析 xlsx | 逐词 imps/clk/pos 一律引自 10-29 gsc-feedback 已落盘报告与 anomaly JSON，**未落盘的词不判** |

---

## 2. ★ 第一节：恢复系数周曲线（10/24–10/30，逐日 detector JSON 汇总）

| 日期 | 24h imps | ratio（detector 原样） | 28d 输入档 | 28d 档龄 | 告警 |
|---|---:|---:|---|---:|---|
| 10-24 | 758 | 129.5% | 10-15 单站（止 10-12） | 12d | WARN_STALE ×3 |
| 10-25 | —（无当日 JSON） | — | — | — | — |
| 10-26 | 758 | 129.5% | 10-15 单站（止 10-12） | 14d | WARN_STALE ×3 |
| 10-27 | 758 | 129.5% | 10-15 单站（止 10-12） | 15d | WARN_STALE ×3 |
| 10-28 | 758 | 129.5% | 10-15 单站（止 10-12） | 16d | WARN_STALE ×3 |
| 10-29 | 793 | 135.5% | 10-15 单站（止 10-12） | 17d | WARN_STALE ×3 |
| 10-30 | 793 | 135.5%（同档动态 105.8%） | **10-29 三站点汇总（止 10-26）** | **4d** | **0 WARN_STALE** + INFO_CALIBER_SWITCH ×3 |

**三条必须写明的口径事实**（否则曲线会被误读）：

1. **10-24→10-29 的曲线是「假平台」**：24h 分子在 758→793 之间只跳了一次，28d 分母一直吃 10-15 单站旧档（WARN_STALE 12→17 天）。这 6 天的比值**不是恢复曲线**，是同一批冻结输入的重复输出。
2. **10-30 是 detector 首次吃到 10-29 三站点汇总批**（`sites.*.file = 28天三站点汇总…2026-10-29.xlsx`，`latest_date 2026-10-26`）⇒ **C8 的 28d 腿已修好**（10-29 NEXT 的验证点达成一半）。
3. **C8 的 24h 腿仍未修**：10-30 的 793 与 10-29 的 793 是**同一个 24h 文件**（窗 10-27T22–10-28T21），detector 没有新的 24h 档可吃；同时 `recovery_ratio_vs_precliff` 分母仍固定为 585.2。⇒ **A17 由「输入分裂」降级为「24h 单腿未更新 + 分母标签缺失」**，本轮已在报告中改用同档动态值（105.8%）并标注 135.5% 的口径，不把 135.5% 当恢复跳升。

**28d 四指标（09-29..10-26，全国家）**：clk **497** / imp **20,977** / CTR **2.37%** / pos **13.52**；7d（10-20..10-26）：140 / 5,498 / 2.55% / 14.17；24h（10-27T22..10-28T21）：15 / 793 / 1.89% / 13.11。最佳单日 10-26：31 clk / 947 imp / 3.27%；最低 10-24：10 / 594 / 1.68%。带钱词首页命中 **6/23**（zh 2 / en 3 / ja 1）。

---

## 3. ★ 第二节：门童 #25 / #27 / #28 / #29 本周审计摘要（存量只准减不准增）

| 门童 | 本周实测 | 趋势（10-23→10-26） | 判定 |
|---|---|---|---|
| **#25** title-band（当量带） | 252 槽全扫，`existingIssues = []` | 0 → 0 → 0 → 0 | ✅ PASS |
| **#27** title-v5 | 252 槽，`hardCount = 7`（全为 `PRICE_MISMATCH`），`warnCount = 28`（LONGTAIL_SOURCE 13 / MOQ_DRIFT 5 / MOQ_UNVERIFIABLE 6 / FROZEN_FILLER_WORD 2 / PRICE_UNVERIFIABLE 2） | 7 → 7 → 7 → 7 | ⚠️ **持平未增**（符合「只准减不准增」的下限；7 条为 SKU 存量、本轮零 SKU title 改动，未新增也未清理） |
| **#28** imageAlt | **无每日全量审计 JSON**（该门童为 pre-commit 触发型） | 无法给趋势 | ⚠️ **NOT_MEASURED**（最近一次实战拦截 = 10-14 folded-leaflets 2 处，已修） |
| **#29** keywords 去毒 | 252 槽全扫，`issues = []`，`exemptedIssues = 6`（thick-greeting-cards-400g ×3 + foil-greeting-cards ×3，均 R3_MORPHEME 待 §0.0） | 0 → 0 → 0 → 0 | ✅ PASS（6 条豁免为已知挂账，非新增） |

**本车道新增的第 5 类审计（门童未覆盖层）**：`#25/#27` 的 252 槽 = **SKU 层**，`seo.ts` 的**类目 title 不在任何门童扫描域**。本轮逐槽手算 16 个 zh-hk 类目 title，发现 5 槽 ≥58 阻断线（见 §6/§8）—— 这是制度盲区，不是本轮引入的缺陷。

---

## 4. ★ 第三节：本周新上线内容相似度抽检（8-gram Jaccard）

**状态：`NOT_COMPUTED_IN_LANE`（不虚报）**。本 lane 沙箱 pwsh 被禁 + 无 node/python 执行通道（v9.4 rearm，环境说明明示不重试），8-gram Jaccard 无法计算，**不写「0 违规」**。

本周净新增/改写正文（以各车道报告为据）：

| 日期 | 产物 | 性质 | 相似度证据 |
|---|---|---|---|
| 10-27 | `2026-10-27-bag-p1-08-zh-paper-bags-purchase-answers.md`<br>`2026-10-27-poster-p1-09-zh-posters-purchase-answers.md`<br>`2026-10-27-p1-b-en-small-batch-and-books-purchase-answers.md` | 新增采购直答段（AEO 块） | 未测 |
| 10-28 | `2026-10-28-data-driven-batch8-10-report.md` | 6 条 zh 模板句改写，无新增段落 | 车道自述「未复算 8-gram（不虚报）」 |
| 10-29 | `2026-10-29-blog-deepfix.md` | roll-up-banner-printing-guide ×3 locale 重写（8 问句 H3 深潜 + 案例 + E-E-A-T） | 未测 |

- 最后**已测**基线：`2026-10-16`（`.hermes/analysis/b1c6b-similarity-2026-10-16.json`，worst 8-gram 0.141，红线 <0.60，目标 ≤0.55）。
- **责任点与复测方式**：host wrapper / 下一个 node 会话，**复用最近一次 8-gram 扫描器**（`.hermes/_b1c6b_similarity.cjs` / `_b1c7_similarity.cjs`，同口径）对上面三条产物生成对，结果落 `.hermes/analysis/`；>50% 的对必须回填本表。**不另造脚本名**（本 lane 无 node，无法新建并验证扫描器）。
- **风险声明**：在补测前，本轮**不得**声称「本周无近重复正文」；恢复期红线③（8-gram >60% 即停手）处于**未验证**状态，本周新增内容若已上线则属既往事实，不追溯改判，只入下一批复测。

---

## 5. ★ 第四节：下周 B1c 队列建议（与 daily-content 进度对账）

**对账事实**：`b1c-queue-progress.json` order **1–30 全部 DONE**（最后一棒 = 10-29 `b50ff77c` cert 残余族 9 SKU 清零）；AEO money-FAQ 覆盖 **46/83**（10-24 台账，本周期无新增 FAQ 批次）。剩余面按可执行性排序：

| 序 | 候选 | 依据 | 阻塞 | 建议 |
|---|---|---|---|---|
| 1 | **类目 title 当量批（en/ja + 残余 zh）** | 本报告 §6：zh 层 3 槽仍超线；en/ja 抽检亦超线（en flyers 69、ja calendars 远超带） | 需 K3 认冻结范围 + 母语审校 | **本周新增建议，P1**——它是唯一「规则已定、缺口已量化、无真值风险」的批 |
| 2 | **flyers / japan-doujin / greeting-cards 三槽 TRIM** | 59 / 66 / 72 当量 | 前两槽在 10/26 簇冻结，第三槽 §0.0 | 等 K3 一句话解冻 |
| 3 | **wedding-invitations / place-cards faqSchema ×2** | order 22 note 明示「wedding 2 SKU 无 faqSchema」 | 无（不在七簇冻结，不触 §0.0） | 可作下一棒内容小批 |
| 4 | AEO money-FAQ 余 37 缺口 | 46/83 | 7 个缺口在 greeting-cards / red-packets（§0.0 / 资产面） | 先做非资产面 12–18 个 SKU |
| 5 | flyers ja `description` 的 `国際認証体系品質` ×1 | order 29 残留（CSV 覆盖域） | 需 node regen（SOP-5 禁直改 ts） | 交 node 会话 |
| 6 | greeting-cards ×6 FAQ | order 10 note | §0.0 (a)/(b)/(c) 未裁 | 不动 |

> 队列文件本轮**未写**（派生文件禁手搓 + 今日 sibling 可能写入；契约 §7.2 只要求提供任务）。preflight 已生成 `proposed_task_ids`（2 条 FIX，属 infra），`queue_write_enabled=true` 但台账未见落盘 —— 归 infra 观察，不手补。

---

## 6. 本批交付：类目 title 当量 TRIM（2 条，`src/lib/seo.ts`）

**为什么这批值得做**：`generateCategoryMetadata` 的 `categoryTitle = customTitle` **原样返回、无截断**（L844-849），而 5 槽写到了 59–83 半角当量。Google SERP 约 600px（≈60 当量）后截断 ⇒ **超线槽的品牌与尾部工艺词根本没显示，任何「title 实验」在此状态下不可测**。TRIM 是回复到 50-57 的合规修复，不是新实验。

| # | 槽 | 行 | 改前（当量） | 改后（当量） | 保留 | 删除 |
|---|---|---|---:|---:|---|---|
| WM-1030-1 | calendars / zh-hk | 513 | `月曆印刷 2027 \| 1本起印・300本起上機・Q4旺季・60天預訂・免費設計・燙金精裝 \| 智印港`（**83**） | `月曆印刷 2027 \| 1本起印・燙金精裝・免費設計 \| 智印港`（**52**） | 主词前置 / 2027 / 1本起印 / 燙金精裝 / 免費設計 / 品牌末尾 | `300本起上機`、`Q4旺季`、`60天預訂` |
| WM-1030-2 | envelopes / zh-hk | 549 | `大信封印刷 100個起・C4/C5/DL・急件即日・DHL 全球 2-4 天 \| 智印港`（**62**） | `大信封印刷 100個起・C4/C5/DL・急件即日・DHL全球 \| 智印港`（**56**） | 主词前置 / 100個起 / C4/C5/DL / 急件即日 / DHL / 品牌末尾 | `2-4 天` |

**真值理由（不是审美理由）**：

1. `300本起上機` 与**同页正文/规格**冲突：线上 `/zh-hk/category/calendars/` 写「**500 本以上柯式印刷更經濟**」（2026-10-30 探针实读），`products.ts` 无 300 阈值字段 ⇒ 这是无源数字，删除方向与 §0.23 一致。
2. `2-4 天` 与**同页规格**冲突：线上 `/zh-hk/category/envelopes/` 规格写「即日交貨（數碼 100–2,000 個）；標準 **2–3 天**（柯式）」⇒ 2-4 天为跨页模板残留。
3. 两条**均未新增任何数字**：只删不改（删 300/60/2-4）；价格与 MOQ 一字未动（calendars 的 HK$3-8 在 description，不在 title；envelopes 的 HK$0.22 同）。
4. 品牌 `智印港` 保持末尾一次，未产生双品牌。

**线上「改前」实证（本 run web_fetch，2026-10-30）**：

- `https://zprintpro.com/zh-hk/category/calendars/` → **HTTP 200**，`<title>` = `月曆印刷 2027 | 1本起印・300本起上機・Q4旺季・60天預訂・免費設計・燙金精裝 | 智印港`（83 当量版本在线，非旧源）。
- `https://zprintpro.com/zh-hk/category/envelopes/` → **HTTP 200**，`<title>` = `大信封印刷 100個起・C4/C5/DL・急件即日・DHL 全球 2-4 天 | 智印港`（62 当量版本在线）。
- 说明：本 lane 的改动**尚未部署**（wrapper 在本 lane 退出后才 commit/push），故「改后」线上断言属 host 侧，见 §10。

---

## 7. 为什么本批 **meta description 零写入**（逐词，不是延后）

`c=0` 连续两档 + `imp≥50` 的 zero-click 池共 **28 词**（10-29 28d 档）。前 12 词逐条判：

| 查询词 | 28d imp | pos | clk | 为什么本轮不动 |
|---|---:|---:|---:|---|
| 海報印刷 | 287 | 14.9 | 0 | `ZH-POSTER-20261028-PROCUREMENT` = **WAITING_K3**（海报价格三源不一致：9/45 vs basePrice 16/20，未裁前改 meta 属绕过审批） |
| コミケ 印刷 | 177 | 18.9 | 0 | `JA-C109-20261028-DEADLINE` = **WAITING_K3**（价格/加急边界未裁） |
| 貼紙印刷 | 118 | **40.5** | 0 | pos 40.5 是**排名问题**，meta 改写在 14/28 天窗口内不可能产生可归因变化（NEW-1 P1，待内容修复后复评） |
| 食品包裝印刷 | 112 | **8.7** | 0 | `ZH-PACKAGING-20261028-BATCH1` = **WAITING_K3**；且该词面 10-10 已试过、10-23 真值批整行重写时被覆盖（见 §4 学习复核） |
| 月曆印刷 | 109 | 23.1 | 0 | live desc 已含「月曆印刷 2027 … HK$3-8/本 … 1 本起印」= 词 ✅ 价 ✅ MOQ ✅，无词面缺口；pos>20 不可测 |
| 宣傳單張 | 108 | 28.3 | 0 | pos>20；flyers 在 10/26 簇冻结表内 |
| 宣傳單張印刷 | 102 | 27.2 | 0 | live desc 已含该词面（10-10 WM-1010-1 仍在档）；pos>20 不可测 |
| 印刷公司 | 103 | 30.8 | 0 | **多 URL 分摊**（内耗），不是单页 meta 缺陷；需月度矩阵裁决主承接页 |
| 書刊印刷 | 97 | 32.2 | 0 | live desc 已含「書刊印刷 / 小冊子印刷」；pos>20 不可测 |
| poster 印刷 | 77 | 11.4 | 0 | 同 posters 冻结（ZH-POSTER） |
| china catalog printing | 76 | 15.9 | 0 | `EN-CATALOG-20261028-TRUTH` = **WAITING_K3**（MOQ/币种真值） |
| 紙袋印刷 | 65 | 14.4 | 0 | live desc 已含 `紙袋印刷 / 印刷紙袋 / 訂做紙袋` + HK$3-8 + 100 個起，词/价/MOQ 全齐；paperbags 簇冻结 |

**结论**：前 12 词中 pos≤20 的 6 个高展示词 **6/6 都在冻结或 WAITING_K3 面**（或词面已齐备）；pos>20 的 6 个 **摘要层不可测**。池内其余 pos≤20 词同样无合法动作：`食品印刷` 59@9.2（packaging 簇冻结）、`戶外貼紙` 62@15.0（stickers 簇冻结）、`印刷紙袋` 64@16.8（desc 已含该词面）。⇒ 本批 description 的合法动作空间 = 0。**这不是「没时间做」，是「做了也是 churn 且违反冻结」**（契约 §6.1 禁止项 + 恢复期「对仍被压制的页不改 meta，改了也测不出效果」）。

---

## 8. 冻结 / 红线避让（含一次「评估后回滚」）

| 面 | 处置 | 证据 |
|---|---|---|
| 10/26 七簇冻结（词表 v1.0 + 主 URL 分工） | **不碰** `/category/posters/`、`/category/flyers/`、`/category/japan-doujin/`、`/category/packaging/`、`/category/stickers/`、`/category/books/`、`/category/paper-bags/` 的 title/desc | `docs/2026-10-26-seven-clusters-baseline-freeze.md` §3；`strategy-task-queue.json` 5 条 WAITING_K3 的 `target` |
| **回滚记录（如实披露）** | 起草阶段曾把 flyers（59）与 japan-doujin（66）一并 TRIM，**定稿前回滚**，因为两页的簇主 URL 分工在 10/26 冻结表内（"posters/flyers category 分品类" / "circle guide 接信息"）。回滚后 `grep` 复核：两行与 10-30 开工前逐字一致 | `grep`：2 条 TRIM 目标旧串 0 残留 / 2 条新串在位；L432、L530 已回滚为原值 |
| §0.0 名片/贺卡展示层 | **不动** greeting-cards（zh title 72 当量、en title 仍含 `Business & Holiday Card` + 假价 `$0.50`） | 该面等 K3 (a)/(b)/(c)；本轮只登记 F-WM-2 |
| 价格 / MOQ 数字 | 零改动（只删 title 里的无源阈值，未改任何价格/MOQ 串） | §6 表 |
| 301 / middleware / 贺卡资产 / slug / 路由 | 零触碰 | 本批仅 `titles` 两行 |
| 派生文件（matrix / index.json / queue / lane-status / clause JSON） | 零手写 | 台账另落新文件 `.hermes/logs/2026-10-30-weekly-meta-ledger.json` |
| 跨车道避让 | `src/lib/seo.ts` 今日无 sibling 写入（三车道 PENDING）；未触 `blog-data/*.json`（9/19 撞车域） | run-context.sibling_lanes |

---

## 9. SCALE / HOLD / FIX / STOP（契约 §7.3.4，每个到期任务一条）

| task_id | 决策 | 依据 |
|---|---|---|
| `REVIEW-20261030-WEEKLY` | **DONE**（本报告） | 四节齐 + 决策表 + ledger |
| `ZH-POSTER-20261028-PROCUREMENT` | **HOLD** | WAITING_K3；海报价格 9/45 vs 16/20 未裁，任何 meta/答案改动都无法归因 |
| `ZH-PACKAGING-20261028-BATCH1` | **HOLD** | WAITING_K3；执行包就绪、生产源未动 |
| `EN-STICKER-20261028-SMALLBATCH` | **HOLD** | WAITING_K3（单位/价格/案例真值 + title freeze） |
| `EN-CATALOG-20261028-TRUTH` | **HOLD** | WAITING_K3（K3-3 MOQ / K3-4 币种） |
| `JA-C109-20261028-DEADLINE` | **HOLD** | WAITING_K3（K3-1 价格 / K3-2 加急边界） |
| `MEASURE-20261028-ATTRIBUTION` | **STOP** | 已被 K3 §0.37 终局关闭（不接入 GA4/008/订单） |
| `GEO-20261103-AI-PROBE-S1` | **HOLD** | 排期 11-03，kit 就绪、无基线声明 |
| `REVIEW-20261101-MONTHLY` | **HOLD** | 排期 11-01 |
| `TRUTH-T1/T2/T3-20261029-*` | **STOP** | 10-29 已 DONE 终态，不重开 |
| `FIX-WEEKLY-2026-10-28-*`（×3） | **FIX** | owner K3-admin；`LastTaskResult=2147946720`（0x80070020 文件占用）在 weekly/blog-deepfix/monthly 三处仍在 |
| `CATEGORY-TITLE-EQUIV-20261030`（本轮**新提**） | **PROPOSED_NOT_WRITTEN** | 见 §5 第 1 序；队列是派生文件不手写，等 weekly 脚本或 K3 落盘 |

**本轮不新增 FIX 到队列的原因**：契约 §7.2 规定队列只由脚本 `strategy-feedback.py --write-queue` 幂等派发；`periodic-review-weekly-2026-10-30.json` 已生成 2 条 `proposed_task_ids`（均 infra），但 `strategy-task-queue.json` 内未见对应记录 ⇒ 属 **queue 写入未生效**的 infra 观察（不手补、不冒充已派发）。

---

## 10. 验收（契约 §四：禁用「我跑过了」与 wrapper exit=0 当成功）

**in-lane 已实证（可复算）**：

| # | 断言 | 证据 |
|---|---|---|
| 1 | 2 条新 title 在位；2 条 TRIM 目标旧串 0 残留 | `grep` 回读 L513 / L549；旧串（`Q4旺季・60天預訂`、`DHL 全球 2-4 天 \| 智印港`）0 命中 |
| 2 | 未误伤另两槽（评估后回滚） | L432 / L530 与开工前逐字一致（`A5 宣傳單張印刷…`、`托特袋 Comiket…` 均在位） |
| 3 | 当量 52 / 56 ∈ [50,57]，58 阻断线未触 | 手算，口径 = `title-equiv.js` 正则（CJK/全角 ×2，其余 ×1）；ledger 存逐槽值 |
| 4 | 零新增数字 | 只删 `300` / `60` / `2-4`；价格串、MOQ 串逐字保留 |
| 5 | 零越界字段 | 本批仅 `categorySeoData.*.titles['zh-hk']` 两行；未触 descriptions / keywords / schema / slug / 路由 |
| 6 | 禁词 0 新增 | 两条新串无 `激安` / `業界最安` / `最安値` / `Made in USA` / `US-based` |
| 7 | 改前线上态确认 | web_fetch ×2：两页 HTTP 200，`<title>` = 改前 83 / 62 当量版本（证明修复对象真实在线，不是旧源） |

**in-lane 无法执行（环境禁 pwsh/node，非简化、非延后）→ 挂 host 侧**：

| # | 项 | 责任点 |
|---|---|---|
| 8 | `title-equiv.js` / #25 / #27 / #29 机检 | host-side pre-commit 链；被拦则 wrapper 返回 4 |
| 9 | encoding guard / `tsc --noEmit` 54=54 / build | host wrapper（exit 3 = encoding） |
| 10 | 部署后 curl 2 页 `<title>` = 52 / 56 当量版本 | 部署后探针（本 lane 无 curl；web_fetch 只能取到「当前线上」，改动未推前不可判） |
| 11 | 8-gram 相似度复测（§4） | node 会话 |

---

## 11. 开放发现 + 下一验证点

| ID | 级别 | 发现 | 下一步 |
|---|---|---|---|
| F-WM-1 | P1 | flyers 59 / japan-doujin 66 超 58 阻断线，但落在 10/26 簇冻结面 | K3 一句话：解冻做 title-only TRIM / 等 11-23 复跑后 |
| F-WM-2 | P1 | greeting-cards zh title 72 当量且**无品牌后缀**；en title 仍 `Business & Holiday Card Printing from $0.50`（假价：真值 $0.13-0.23；`Business` 触 §0.0 展示层） | 等 §0.0 (a)/(b)/(c) 裁决 + 价格 SSoT；本车道不碰 |
| F-WM-3 | P2 | **类目 title 不在 #25/#27 扫描域**（252 槽 = 纯 SKU）；en/ja 层抽检亦超带（en flyers 69、ja calendars 远超） | 建「类目 title 当量」专项批，含母语审校 |
| F-WM-4 | P2 | detector 24h 腿仍复用 10-29 档；135.5% 分母未打标 | C8 收口（infra） |
| F-WM-5 | P2 | 10-10 packaging 词面改动被 10-23 真值批整行覆盖、无归属注记 ⇒ `食品包裝印刷`（112 imp @8.7）自 10-23 起 meta 词面缺失且无批次负责 | 并入 packaging batch1 执行包，由 K3 批时一并决定 |

| 日期 | 验证什么 | 成功阈值 |
|---|---|---|
| **2026-11-06** | calendars / envelopes 新 title 的 28d 表现 | 用同口径 28d 档先取**页级**新基线（本报告未单列 envelopes 页级 imp，不预设数值）；判定 = 页级展示不低于新基线 80%，且 `月曆印刷` 出现 ≥1 点击；未达则回滚单行 |
| 2026-11-06 | 3 个超线槽（flyers / doujin / greeting-cards）解冻或裁示 | 有 K3 文字结论 |
| 2026-11-03 | C8：detector 是否吃新 24h 档 | 24h imps ≠ 793 且 ratio 带分母标签 |
| 2026-11-23 | 七簇基线同口径复跑 | 与本报告 §2 同口径对比，不用单日波动下结论 |

---

## 12. SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异?（查前序任务实现路径）** — 查了 3 条：① 上一轮本车道（10-10）改的是 `descriptions` 词面前置，本轮改的是 `titles` 当量，**同文件不同字段**，无 X/Y 路径冲突；② 10-23 批改的是类目 desc hoist + packaging desc 真值（`seo.ts` L465），10-28 批改的是类目默认 title/desc 模板（L846 / L939），本轮两行 title 与它们**不同槽、不覆盖**；③ 本轮实证 `categoryTitle = customTitle` 原样返回、**不过 `truncateTitleByEquiv`**（L844-849）⇒ 类目 title 当量**无运行时兜底**，这是与 SKU title（builder 截断）的真实架构差异，也是本批存在的理由。
- [x] **2. 约束适用范围?（查 K3 拍板原文）** — 约束 = K3 2026-09-19「目标区 50-57 / 58 阻断」+ 契约 §6.1 Weekly meta「只处理已解冻且有证据的 title/description；禁止碰 10/26 冻结批次」+ 恢复期块「只刷已恢复展示且 CTR 低于 c 值判据的页」。三条同时适用 ⇒ 只动**不在冻结表**的 2 槽，且改因是**当量合规**不是 CTR 实验（CTR 冻结期不追短期波动，docs/2026-10-28 §5 第 7 天纪律）。
- [x] **3. 原数据/拍板来源?（3 问）** — ① 来源：GSC 10-29 四档（FRESH，staleness 0）+ `gsc-cliff-2026-10-30.json` + 仓内 `seo.ts` 一手逐字 + 线上 web_fetch ×2；② 真数据：imp/clk/pos 为导出实测，当量为按 SSoT 正则手算，删除的 300/60/2-4 均与**同页正文/规格**冲突（非估算）；③ 留/撤：K3 9/19 裁决「留 50-57 带」⇒ 超线必 TRIM；冻结面「撤（不动）」⇒ 3 槽保留原状并上报。
- [x] **4. 字段值策略?（certNo/validUntil/issuer 全空）** — 本批未触任何证书字段（0 改动）⇒ 不适用且不违反。
- [x] **5. Markdown 渲染?（`[text](url)` 必须 parseInlineLinks）** — 改动全部落在 `<title>`（纯文本 head 字段），**0 处 Markdown 链接语法** ⇒ `parseInlineLinks` 不适用。

---

## 数据来源（K3 §0.23 / §0.33 / §I.2 三段必含）

```
数据来源:
- GSC数据/24小时·7天·28天·3个月 三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-29.xlsx（K3 2026-10-29 01:16-01:23 导出, 全国家口径; 28d 窗 09-29..10-26）
- GSC数据/index.json（lastBuild 2026-10-29T03:46, latestFreshData 2026-10-29, stalenessDays 0, FRESH, totalFiles 238）
- .hermes/logs/2026-10-29-ZP-gsc-feedback.md（§1 口径 / §2 带钱词 / §3.1 零点击 28 词 / §3.2 striking 40 词 / §11.3 商业意图 18 词）
- .hermes/logs/gsc-cliff-2026-10-24 / -26 / -27 / -28 / -29 / -30.json（周曲线 + detector 输入档龄 + 告警）
- .hermes/logs/lane-status.json（2026-10-29T22:43:03.988Z; problems=4; need_human=4）
- .hermes/logs/periodic-review-weekly-2026-10-30.json/.md（25 runs: OK 12 / STALE 6 / FAILED 6 / BLOCKED 1; attention 2 lanes）
- .hermes/logs/strategy-task-queue.json（16 条：5×WAITING_K3 + 4×BLOCKED_INFRA + 3×DONE + 3×SCHEDULED + 1×CLOSED_BY_K3_S0.37）
- .hermes/logs/b1c-queue-progress.json（order 1-30 全 DONE; AEO 46/83）
- .hermes/logs/sku-title-audit-2026-10-{23,24,25,26}.json（#25: 252 槽, existingIssues 0）
- .hermes/logs/sku-title-v5-audit-2026-10-{23,24,25,26}.json（#27: hard 7 PRICE_MISMATCH / warn 28）
- .hermes/logs/keywords-detox-audit-2026-10-{23,24,25,26}.json（#29: issues 0 / exempted 6）
- src/lib/seo.ts（categorySeoData titles L409-697 / generateCategoryMetadata L812-896 / truncateTitleByEquiv L40-80 / titleEquiv 正则 L50）
- scripts/guards/title-equiv.js（TITLE_MIN 50 / TITLE_MAX 57 / CJK×2 正则）
- docs/2026-10-26-seven-clusters-baseline-freeze.md（§1 词表 v1.0 + §3 主 URL 分工冻结）
- docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md §8.3（Weekly meta 职责与禁止项）
- docs/2026-10-28-data-driven-next-phase-strategy.md §5（7/14/28 天验证窗）§6.2（weekly 扩展为经营复盘）
- 线上探针（本 run web_fetch 2026-10-30）: /zh-hk/category/calendars/ HTTP 200（<title> = 83 当量版）· /zh-hk/category/envelopes/ HTTP 200（<title> = 62 当量版）
校准状态: ✅ 已校准 — GSC 10-29 档 FRESH（stalenessDays=0）；当量为 in-lane 按 SSoT 正则手算（node 不可用，已在 §10 列为待机检）；线上改前态为当日一手探针
撤回声明: 无 — 未撤回任何前序报告。§4 记录一处**归属失效**（10-10 packaging 词面改动被 10-23 真值批覆盖，该槽 retest 不成立），属事实登记不是报告撤回
```

---

*Generated by DSH lane ZP-weekly-meta · 2026-10-30 周五槽位（run-context 07:01:28）· 环境: pwsh 禁用（v9.4 rearm）⇒ 仅 read/glob/grep/write/edit + web_fetch · git commit/push 由 host-side wrapper 执行 · 报告名口径 `2026-10-30-ZP-weekly-meta.md`（`lane-status.mjs` strict 日期前缀 + `weekly-meta` 车道 token）*
