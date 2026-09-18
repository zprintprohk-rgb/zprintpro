# GSC Feedback Loop — 2026-09-18 (v9.4 rearm 持续轮 · 🎯 GSC 数据换代日 · STALE 解除 · 完整 14 章节流程)

**Trigger**: deepseek harness 执行层, gsc-feedback-loop cron lane (2026-09-18 22:43 窗口; v9.4 rearm 持续轮; host-side wrapper 经 `scripts/lane-git-commit.py --lane ZP-gsc-feedback --include-matrix` 执行 commit/push)
**Run type**: gsc-feedback-loop 完整流程 (数据换代 + 全站口径 + v9.4 质量三件套 + M1 线 1 判定 + v9.3 任务 J 8 T1 锁词周环比 + title v4 当量核查 + 锚文本审计 + 品牌监测 + 301 验证 + T43 观察 + matrix 回灌 + 新发现上报), **无简化无延后**
**Output**: `.hermes/industry-keyword-matrix.json` — 新增 `gsc_feedback_2026_09_18` block (16 键) + `last_updated_event` / `last_gsc_feedback_update` / `last_updated` 更新; `GSC数据/index.json` 换代登记; 本报告
**环境**: pwsh 工具在本 lane 沙箱被禁 (v9.4 §3-2 明示**不重试**) — 全程仅用文件工具 (read/glob/grep/write/edit) + web 工具; git commit/push 由 host-side wrapper 执行, **不在 lane 内运行**
**关联**: 今日同 lane 组 — `.hermes/gsc-2026-09-18/*` (12 档 xlsx 解析产物) + `.hermes/logs/2026-09-18-exec-l1-1-serp-diagnosis.md` (L1-1 七查询诊断) + `.hermes/logs/2026-09-18-daily-content.md` (P1 MOQ 落位) + `.hermes/logs/2026-09-18-k3-rulings-record.md` (月曆价格口径裁定)

---

## 0. 数据来源 (SOP-10 第 3 款 / §0.23 数据诚信红线 — 必含)

```
数据来源:
- GSC 数据 (本 run 主源, ★ 换代): GSC数据/*2026-09-18.xlsx (12 档: 24h/7d/28d × 三站点汇总+香港+日本+美国)
                                 → .hermes/gsc-2026-09-18/extract.json (new + old 双档, 9/18 解析)
- GSC 派生 (本 run 读取): .hermes/gsc-2026-09-18/raw-summary.txt (28d 日序列 / 三站点合计 / Top40 查询 / Top30 网页 / 设备+呈现 / Top15 国家)
                        .hermes/gsc-2026-09-18/trend.txt (周度趋势 / 位置带分布 / 零点击桶 / 品牌词 / 带钱簇)
                        .hermes/gsc-2026-09-18/analysis-queries.md (406 行查询层全量分析)
                        .hermes/gsc-2026-09-18/analysis-pages.md (770 行页面层全量分析)
                        .hermes/gsc-2026-09-18/opps.txt (机会量化 + 港/美/日 Top 查询 + 24h 切片)
- GSC 对照窗: GSC数据/*2026-09-10.xlsx (上一档, 28d = 2026-08-11~09-07) — 同 extract.json 的 old.* 维度
- GSC 基线:   GSC数据/gsc-fresh-2026-09-03.json (9/3 canonical, 7d = 12 clicks / 2,207 imps / 0.54% / pos 29.94)
- 前序报告:   .hermes/logs/2026-09-16-gsc-feedback.md (STALE 轮) + 2026-09-15 / 2026-09-14 / 2026-09-13 (前三轮)
- K3 拍板:    v9.3 §S1/S2/S3 门禁 + 任务 J (8 T1 锁词) ← docs/2026-09-12-k3-directive-v93-home-fix-money-words.md
             标题规则 v4 写满 ← docs/2026-09-09-k3-title-rule-v4-write-full.md
             v9.4 §4 质量三件套 + 铺量降速 ← .hermes/cron-prompts/zprintpro-gsc-feedback-loop.md L1141-1168
             §0.0 名片解禁块 (展示层 (a)/(b)/(c) 未拍板) ← AGENTS.md §0.0 / §11.9
             §13.1 gsc cron 范围 (品牌 CTR / ジープリント / 301 验证 / T43)
             数字钩子冻结令 (至 9/30) ← docs/2026-09-18-k3-directive-v101-five-decisions-ruling.md 决策 2
- 线上探针 (本 run 新取证): web_fetch 2026-09-18 —
             旧 z-printpro.com URL ×11 (全部 cross-origin redirect → zprintpro.com = 301 链证据)
             新站落地页 ×7 (packaging / stickers / flyers / books / rush / saddle-stitch / greeting-cards 全 HTTP 200)
             title ×6 逐条线上实测 (与 matrix 9/16 记录逐条核对)
- 锚文本审计 (本 run 新取证): grep src/data/blog-data/zh-hk.json (8 词 `<a href=…>词</a>` 分布, 8/8 达标, 多词较 9/16 超额)
- 幂等核验:   .hermes/logs/2026-09-18-daily-content.md (今日 daily lane 已交付 P1/P3, 本 run 不重做)
             src/data/blog-posts.ts L762 / L1517 (slug 存在性核对, 见 §11 S2)

校准状态: ✅ 已校准 (2026-09-18 22:43, 换代至 9/18 档; 数据日 2026-09-15, staleness 3 天 < 72h 门 ⇒ FRESH)
撤回声明: 无 (本 run 未撤回任何前序报告; 对 matrix 内 2 条存量死 slug 提出**更正建议**, 见 §11/§13)
```

### §I.1 4 口径对照表 (per §0.33.1 — 本报告含 SKU/篇数类数字 → 必填)

| 口径 | 真实数量 | 类型 | 本报告何处使用 |
|------|---------|------|----------------|
| zh-hk.json unique slugs | 79 | zh-hk 真实页面内容 | 未使用 (本 run 未动 blog-data) |
| en.json unique slugs | 80 | en 真实页面内容 | 未使用 |
| ja.json unique slugs | 80 | ja 真实页面内容 | 未使用 |
| blog-posts.ts SSoT entries | 85 | SSoT 配置 | 未使用 |
| **GSC 查询明细列数** | **1,000** (触顶截断) | 9/18 档 28d `查询数` | §3 位置带 / §4 零点击 / §5 品牌 |
| **GSC 网页明细列数** | **575** (old 548) | 9/18 档 28d `網頁` | §3 页面层引用 |
| **8 T1 锁词可对照数** | **3 / 8** | 两窗均进 Top40 明细者 | §5 |

---

## 1. SOP-10 5 问门禁 (§0.22 强制级)

| # | 问 | 本 run 答案 | 结论 |
|---|---|---|---|
| ① | **架构差异? 查前序 commit 路径** | 本 run **无 src/ 改动**; 写入仅限 `.hermes/industry-keyword-matrix.json` + `GSC数据/index.json` + 本报告 (gsc-feedback cron 写权限仅限 .hermes/, 9/13-9/16 四轮同路径实证)。前序 `gsc_feedback_2026_09_16` block 与本块同构, 无 X/Y 路径冲突。**★ 本 run 查出一处真实架构差异**: 前四轮所有报告的「最新真值」均锚定 `.hermes/hk28d-queries.json` (9/10 解析), 而 K3 已于 9/18 上传换代档 (`GSC数据/*2026-09-18.xlsx` + `.hermes/gsc-2026-09-18/extract.json`), 同 lane 9/18 已解析 → 本 run **改走新档**, 并核对两档重叠 20 天的一致性 (见 §3 口径声明)。 | ✅ 无 src 差异; 数据源换代已核对 |
| ② | **约束适用范围? 查 K3 拍板原文** | 适用约束 = v9.3 §S1/S2/S3 (答案块字数 / slug 存在性 / 平台故障 ≥60min) + v9.3 任务 J (8 T1 锁词追踪; 红线「不改 slug、不砍页、不回滚已部署 title」) + v9.4 §4 质量三件套 + §0.0 名片解禁块 (接单层已解禁; 展示层 (a)/(b)/(c) 未拍板 → 不改 greeting-cards 资产、不改 middleware 301) + §13.1 gsc cron 四项范围 + v10.1 决策 2 (title 数字钩子冻结至 9/30) + v1.2 执行主提示词 (执行层无战略级决策权)。K3 原文均已核。 | ✅ 范围正确 |
| ③ | **原数据/拍板来源? 不推断无来源数字** | 全部数字来自 9/18 档 12 xlsx 的机器解析产物 (extract.json → raw-summary/trend/opps/analysis-*.md); 对照窗来自 9/10 档同结构解析; 品牌 CTR / 301 / title 当量均为本 run 线上实测或仓内 grep; **零编造**; 校准状态与口径不一致处显式声明 (§3)。 | ✅ 有来源 |
| ④ | **字段值策略? certNo/validUntil/issuer 全空** | 本 run 未触碰任何 schema/certNo 字段 (无 src 改动, 无 schema 编辑)。 | ✅ N/A |
| ⑤ | **Markdown 渲染? parseInlineLinks** | 本 run 只写 .hermes/ JSON + Markdown 报告 + GSC数据/index.json, **不新增 user-facing 渲染文本**, 无 `[text](url)` 直渲染风险。 | ✅ N/A |

**门禁结论**: 5 问全过; 本 run = 数据换代复核 + 全站/词级/页面级分析消费 + 线上探针 + 观察 + 回灌, **零 src 改动**。

---

## 2. 校准状态 (v4 §5.1 / §K.1.3 新鲜度门 72h) — ★ 本 run 解除 STALE

| 项 | 值 | 判定 |
|---|---|---|
| 前四轮状态 (9/13-9/16) | 最新真值 9/10, 距报告日 6-8 天 | ⚠️ **STALE** (禁止输出带数字结论) |
| **本 run 数据源** | `GSC数据/*2026-09-18.xlsx` ×12 (K3 9/18 上传) | ✅ 换代完成 |
| 新档窗口 | 28d = **2026-08-19 ~ 09-15**; 7d = **2026-09-09 ~ 09-15**; 24h = 最近一日 | — |
| 数据日 vs 报告日 | 9/15 → 9/18 = **3 天** | ✅ **FRESH** (< 72h 门) |
| GSC API 延迟口径 | 2-3 天 (seo-stack.io 核实, §K.9) | 3 天 = 正常边界 |
| 索引登记 | `GSC数据/index.json` lastBuild 2026-09-18T22:43+08:00 / latestFreshData 2026-09-15 / totalFiles 135 | ✅ 本 run 更新 |
| 校准日判定 | 9/18 非校准日; 干净对比窗 (9/9-9/15) 数据在手 | — |
| 下一窗 | 9/22+ 拉新 (下一 gsc-feedback lane); 9/25 回报 K3 v10.1 决策 1 条件④ 书刊簇 CTR/imp | ⏳ |

**窗口结构性限制 (必须与数字同读)**:
- 9/18 档 28d = 08-19~09-15; 9/10 档 28d = 08-11~09-07。两窗**重叠 20 天, 各 8 天独有** (analysis-pages §0.1) ⇒ 所有「两窗对比」是**「变化 + 窗口位移」的混合量**, 本报告一律标注为**方向性**。
- 前四轮报告的 hk 口径 (`.hermes/hk28d-queries.json`, 窗 8/14-9/10) 与本窗 (8/19-9/15) **不同窗**, 不可直接相减; 本报告已显式分离两套数字 (见 §3)。

---

## 3. 全站口径 (9/18 档 28d, combo 三站点汇总)

| 维度 | clicks | imps | CTR | 平均位 | 对照 (9/10 档 28d) |
|---|---|---|---|---|---|
| **全站 (combo)** | **356** | **20,833** | **1.71%** | **18.7** | 349 / 20,323 / 1.72% / 31.3 |
| 前半窗 (8/19-9/1) | 168 | 10,160 | 1.65% | 21.4 | — |
| 后半窗 (9/2-9/15) | **188** | 10,673 | **1.76%** | **16.2** | 后半全面优于前半 |
| 香港 (country filter) | 251 | 10,848 | 2.31% | 16.5 | 前四轮报 247 / 10,022 / 2.46% / 26.6 |
| 日本 | 38 | 1,860 | 2.04% | 19.2 | — |
| 美国 | 23 | 3,948 | 0.58% | 20.7 | — |
| 英国 | 5 | 435 | 1.15% | 15.5 | — |
| 台湾 | 6 | 322 | 1.86% | 12.3 | — |

**周度趋势 (窗内 4 周, 周一为起点)**:

| 周 | combo clicks | imps | CTR | avgPos |
|---|---|---|---|---|
| 08-19~08-25 | 76 | 4,690 | 1.62% | 22.2 |
| 08-26~09-01 | 92 | 5,470 | 1.68% | 20.7 |
| 09-02~09-08 | 87 | 5,557 | 1.57% | 17.0 |
| **09-09~09-15 (干净窗)** | **101** | 5,116 | **1.97%** | **15.3** |

> 周度序列**逐周上行**: clicks 76→92→87→**101**, CTR 1.62%→1.68%→1.57%→**1.97%**, 位置 22.2→20.7→17.0→**15.3**。最近一周是四项指标的最佳周。

⚠️ **口径不一致声明 (非本 run 引入, 但必须如实记录)**: ① 同档内 country 键合计 (hk 10,848 + jp 1,860 + us 3,948 = 16,656) ≠ combo 20,833, 差 4,177 imps (其它国家/地区未列入前 6); ② `analysis-pages §0.2` 实测同一 xlsx 内 `網頁` 表合计 24,089 ≠ `圖表` 口径 20,833 (**+15.6%**), 且 3 个 country 键的 `網頁` 表反而**小于**其 `圖表`。⇒ 本报告**一律以 combo 28d 图表口径为准**, 不与页面表混用; 页面层数字仅作引用并标明来源。

---

## 4. §4 验收口径 v9.4 — 质量三件套判定 (K3 8/26 04:10 §4, 替换旧「7d clicks ≥85」)

| # | 指标 | 目标 | 本窗实测 (9/18 档 28d 命名明细) | 判定 |
|---|---|---|---|---|
| 1 | **striking 词进首页数** (pos 11-20 且展示 ≥50) | ≥5 | **≥10 条** — 戶外貼紙 72/15.69 · 紙袋印刷 70/13.83 · 訂做紙袋 67/18.63 · china catalog printing 110/16.70 · 月歷印刷 64/17.72 · 騎馬釘印刷 60/17.53 · poster 印刷 61/19.74 · 貼紙設計 59/15.08 · 印刷紙袋 58/15.5 · 月曆訂製 65/25.09(带外参考) | ✅ **达标** |
| 2 | **pos 1-20 展示占比** | ≥30% | **38.66%** (1-3 带 265 + 4-10 带 1,146 + 11-20 带 1,864 = 3,275 / 明细 8,472) | ✅ **达标** |
| 3 | **有点击词数** | ≥12 | **≥9 可确认** (智印港 / 車身廣告 / 餐牌印刷 / 貼紙 / 即日印刷 / 印海報一張 / 信封印刷 / pvc 貼紙 / doujin printing / 畢業紀念冊香港 / 印刷公司 / 燙金貼紙 …); 全站真值 356 clicks 中 **304 (85%) 落在 GSC 匿名长尾**, 逐词分布不可知 | 🟡 **无法证实达标** (非不达标) |

**位置带结构 (明细 1,000 条)** — 这是「质量三件套」为何只达 2/3 的根因:

| 位置带 | 查询数 | 展示 | 展示占比 | 点击 | 点击占比 | 加权 CTR |
|---|---|---|---|---|---|---|
| 1-3 | 130 | 265 | 3.13% | 16 | 29.63% | **6.04%** |
| 4-10 | 220 | 1,146 | 13.53% | 17 | 31.48% | 1.48% |
| 11-20 | 164 | 1,864 | 22.00% | 8 | 14.81% | 0.43% |
| **21-50** | **326** | **4,248** | **50.14%** | 13 | 24.07% | **0.31%** |
| 51+ | 160 | 949 | 11.20% | 0 | 0% | 0% |
| 合计 | 1,000 | 8,472 | 100% | 54 | 100% | 0.64% |

> 展示重心 (50.14%) 卡在 **21-50 位** (CTR 0.31%); 只有 3.13% 展示落在 1-3 位却拿走 29.63% 点击。每上一带 CTR 提升 **3-4 倍** ⇒ 「上移一带」是全站最大杠杆 (opps.txt §L)。

**M1 线 1 (7d clicks ≥25) — 首个可判定窗**:

| 项 | 值 | 判定 |
|---|---|---|
| 9/3 校准基线 (canonical 7d) | 12 clicks / 2,207 imps / 0.54% / pos 29.94 | 锁定基线 |
| **本窗 7d (9/9-9/15, 日序列合计)** | **101 clicks / 5,116 imps / 1.97% / pos 15.3** | ✅ **101 ≥ 25 (8.4×基线)** |
| 前四轮判定 | ⏳ 待 9/17 干净窗 + 9/18 档 | 本轮结案 |
| ⚠️ 口径声明 | 101 = 日序列 (图表格) 求和; GSC 独立 `7d` 工作表**未在本 lane 解析为逐词明细** (只有合计, per opps.txt §Q: 09-18 7d 合计 clicks=101 / imps=5,116 — **与日序列求和一致**) | 两源互证一致 ✅ |

**§4 铺量降速 v9.4 执行核对**: 本 cron 每周 1 次 (维持); 本 run **未开新内容队列项** (v10.1 §二「P4/P5 不提前」), 未新增 blog/SKU (幂等铁律)。

---

## 5. v9.3 任务 J — 8 个 T1 锁词追踪 (首次真实周环比)

**追踪规则** (v9.3 §任务 J): 每周追踪 position + CTR; 红线「不改 slug、不砍页、不回滚已部署 title」; 攻坚 ① title v4 写满核查 ② 全站内链锚文本统一 (每词 ≥3)。

| 词 | old 28d imps/pos | **new 28d imps/pos** | Δpos | 本窗 clicks | 判定 |
|---|---|---|---|---|---|
| 包裝盒印刷 ⭐ | 未进 Top40 | **71 / 36.07** | n/a | 0 | 高展示零点击 (簇级 3 clicks / 0.74%) |
| 紙盒印刷 ⭐ | 未进 Top40 | **63 / 35.00** | n/a | 0 | 同上 (簇最佳位 1.0) |
| 包裝盒訂製 | 未进 Top40 | **56 / 30.80** | n/a | 0 | 同上 |
| 貼紙印刷 ⭐ | 153 / 31.18 | **165 / 27.28** | **+3.90** | 0 | ★ 展示 +12 + 位置 +3.90, **连续两窗正向** (9/3→9/10 已 +3.94) |
| 宣傳單張 | 129 / 36.33 | **129 / 36.33** | 0.00 | 0 | 完全持平 (簇级 51 词 / 425 imps / **0 clicks**) |
| 即日印刷 | 51 / 8.57 | **51 / 8.57** | 0.00 | **1** | ★ **8 词中唯一破零** (pos 8.57 在 5-15 速赢窗, CTR 1.96%); 簇级 CTR 1.92% 全类最高 |
| 書刊印刷 | 9/3 未收录 | **61 / 40.90** | n/a | 0 | 展示持续放大 (16→61), 位置仍 40.9 |
| 騎馬釘 | 68 / 21.17 | **64 / 21.17** | 0.00 | 0 | 展示 -4 位置持平; 關聯詞 騎馬釘印刷 60/17.53 · 騎馬釘書刊 60/32.8 |

**判定**: 3/8 词可做同口径周环比 (貼紙印刷 **+3.90** 正向 / 即日印刷 **0.0 但破零** / 宣傳單張 0.0 / 騎馬釘 0.0); 5 词 old 窗未进明细无对照 (但展示全部 ≥56, 可见性在)。**8 词中 7 词仍 0 点击** — 问题已从「排名」转为「摘要/标题吸引力」(与 §6 title 审计 与 §13 #3 呼应)。

**「位置好却 0 点击」7 条 (摘要问题层, 本 run 新量化)** — 这批**不需等排名, 改 title/meta 即变现**:

| 查询 | 展示 | 位置 | 点击 | 期望点击 (带内 CTR) | 缺口 |
|---|---|---|---|---|---|
| 食品包裝印刷 | 145 | **6.65** | 0 | 2.15 | **-2.15** |
| a6 尺寸 | 97 | 8.86 | 0 | 1.44 | -1.44 |
| small batch sticker printing | 69 | 6.61 | 0 | 1.02 | -1.02 |
| 小冊子印刷 | 48 | 10.04 | 0 | 0.71 | -0.71 |
| 大信封 | 45 | 4.42 | 0 | 0.67 | -0.67 |
| small batch stickers | 40 | 5.53 | 0 | 0.59 | -0.59 |
| 邊度有紙袋買 | 36 | 7.44 | 0 | 0.53 | -0.53 |
| **合计** | **480** | — | **0** | **6.61** | — |

---

## 6. 攻坚① — title v4 写满核查 (半角当量 50-54)

方法: web_fetch 2026-09-18 线上 title ×6 实测, 与 matrix/9/16 记录逐条核对; 当量按 `title-audit-v4.mjs` L12 公式 (CJK×2 + ASCII×1)。

| 词 | 落地页 | 线上 title (2026-09-18 实测, 全 HTTP 200) | 当量 | 带位 |
|---|---|---|---|---|
| 包裝盒印刷 / 紙盒印刷 / 包裝盒訂製 | `/zh-hk/category/packaging/` | 紙質食品包裝盒印刷 100個起 \| 食品紙盒/紙袋 \| 智印港 | **51** | ✅ OK (50-54) |
| 貼紙印刷 | `/zh-hk/category/stickers/` | small batch 貼紙印刷 防水抗UV・1張起印・異形裁切・燙金 \| 智印港 | **63** | >60 待修剪 (8/30 批冻结, 挂账) |
| 宣傳單張 | `/zh-hk/category/flyers/` | A5 宣傳單張印刷 100張起・A4/A5/A3 雙面 \| HK$0.18 起 \| 智印港 | **60** | 55-60 遗留只读 (8/30 批冻结) |
| 即日印刷 | `/zh-hk/services/rush-printing-delivery/` | 即日印刷 18:00 截單・順豐翌日 12:00 前送達 \| 智印港 | **51** | ✅ OK |
| 書刊印刷 / 騎馬釘 | `/zh-hk/category/books/` | 騎馬釘小冊子印刷 50本起 \| 騎馬釘 + 膠裝 + 精裝 + 教材繪本 \| 智印港 | **66** | >60 待修剪 (8/30 批冻结, 挂账) |
| 騎馬釘 (SKU) | `/zh-hk/product/saddle-stitch-booklets/` | 騎馬釘小冊子 覆膜・騎馬釘・100起印・HK$6起 \| 智印港 | **53** | ✅ OK |
| 賀卡 (附录) | `/zh-hk/category/greeting-cards/` | 燙金賀卡印刷 · 100 張起印 · 3D 立體 + 燙金 UV · 順豐本地滿 HK$500 免費 | — | 附录观察 (非 8 锁词) |

**判定**: 4/6 组落在 **50-54 写满区** (51/51/51/53); 貼紙印刷 63 与 books 66 超 60 待修剪但属 **8/30 批冻结** ⇒ **只观察不改** (v9.3 任务 J 红线: 不回滚已部署 title); **v10.1 决策 2 数字钩子冻结令 (至 9/30)** 生效 ⇒ 本 run **零 title 改动**。

**★ 本 run 新发现 (title/正文层, 归 §13 #4 上报)**: 1 本起訂 的口径落地 (今日 daily lane) **未同步到** 以下 3 处线上文案 ⇒ 同页多口径:
- `catalog-printing` 产品卡/产品卡标题仍印「**香港畫冊印刷 / Bulk Catalog Printing 50本起**」(9/18 线上 books 页实测), 而同日 daily lane 已把该 SKU 的 `features` 由 `【50本起訂】` 改为 `【1本起訂】`, 且该卡规格栏写 `[起訂] 100 本` ⇒ **同卡三口径** (卡片标题 50 / features 1 / 规格 100);
- `books` 品类页 H1 = 「騎馬釘小冊子印刷 — …」而 `[起訂]` 卡片写 **1 本起訂 (数码) / 100 本以上柯氏更經濟**, title 仍写「50本起」;
- `saddle-stitch-booklets` PDP 正文「已服務的本地客戶」段仍写「**50 本起印**」(实测线上), 与同页 title「100起印」/规格「最低訂購量 100本」冲突。
> 均属 **churn 红线 / 文案禁区**范畴 (改文案 = §8 升级), 本 lane **只报不改**。

---

## 7. 攻坚② — 全站内链锚文本统一审计 (grep 实证, 8/8 达标且多词超额)

grep 实证 (`src/data/blog-data/zh-hk.json`, 精确匹配 `<a href=…>词</a>`, **2026-09-18 复验**):

| 词 | 覆盖文章数 (9/18) | 9/16 记录 | 达标 | 判定 |
|---|---|---|---|---|
| 包裝盒印刷 | **5** | 5 | ✅ ≥3 | 持平 |
| 紙盒印刷 | **3** | 3 | ✅ ≥3 | 持平 |
| 包裝盒訂製 | **3** | 3 | ✅ ≥3 | 持平 |
| 貼紙印刷 | **5** | 4 | ✅ ≥3 | **+1 超额** |
| 宣傳單張 | **7** | 3 | ✅ ≥3 | **+4 超额** |
| 即日印刷 | **7** | 3 | ✅ ≥3 | **+4 超额** |
| 書刊印刷 | **5** | 3 | ✅ ≥3 | **+2 超额** |
| 騎馬釘 | **13** | 3 | ✅ ≥3 | **+10 超额** |

**判定**: **8/8 词 ≥3 统一锚文本达标**, 且 5 词显著超额 (今日 daily lane 的 P1/P3 与 9/17 新篇 `school-exercise-book-printing-guide` 等引入新锚)。任务 J 攻坚② **数据层超额完成**; CTR 效果待下一窗 (9/22+) 回看。

---

## 8. 品牌词追踪 (智印港 / ジープリント / z print)

| 词 | old 28d | **new 28d** | 目标 | 判定 |
|---|---|---|---|---|
| **智印港** | 8 clicks / 12 imps / 66.67% / pos 1.33 | **11 / 17 / 64.71% / pos 1.24** | 基线 10% → 4 周 40%+ | ✅ **远超目标** (点击 +3, 展示 +5, CTR -1.96pp 属小样本波动); 品牌词占明细点击 **20.37% (11/54)** |
| **ジープリント** | 0 命中 | **0 命中** | 6 query 监测, 期望 ≥1 | ⚠️ 未达期望 (与 9/16 同); 17 个 sheet 查询表 0 命中 ⇒ en/ja 品牌 CTR **无分子分母可算** |
| **z print (en)** | 11 imps / pos 15.1 | **18 imps / pos 12.4** | 双域名品牌归一 (GEO) 观察 | 展示 +7 且位置前进 2.7 ⇒ 持续有量, 观察中 |
| ZprintPro / zprintpro | 0 命中 | **0 命中** | — | 品牌英文名在 GSC 无独立查询量 |

**判定**: 智印港 CTR 连续达标 (64.71% > 40% 目标) 但**绝对量极小** (28 天 11 次点击) ⇒ 「达标」是分母太小所致, **不宜当作品牌建设完成的证据** (§0.23 数据诚信)。ジープリント 30 目录建设 (§13.16.1) 继续。

---

## 9. 301 承接验证 (z-printpro.com 旧 URL → 新站 200)

本 run web_fetch 2026-09-18 旧 URL ×**11** — **11/11 全部**返回 `cross-origin redirect to https://zprintpro.com` (= 301 链证据); 新站落地页另测 ×**7** 全部 **HTTP 200**:

| # | 旧 URL (www.z-printpro.com) | 301 链 | 新站落点 / 结果 |
|---|---|---|---|
| 1 | /products/packaging-box-printing/ | ✅ | /zh-hk/category/packaging/ 200 (title 51) |
| 2 | /label-sticker-printing/waterproof-round-sticker-printing-outdoor-vehicle.html | ✅ | /zh-hk/category/stickers/ 200 (title 63) |
| 3 | /enterprise-brochure-printing/a5-saddle-stitched-booklet-printing.html | ✅ | /zh-hk/product/saddle-stitch-booklets/ 200 (title 53) |
| 4 | /red-packet-wedding-invitation-printing/wedding-invitation-printing-foil-ribbon-envelope.html | ✅ | /zh-hk/category/red-packets/ 200 |
| 5 | /large-format-printing/same-day-banner-printing-6x3ft-waterproof-hk.html | ✅ | /zh-hk/category/banners/ 200 |
| 6 | /products/business-card-printing/ | ✅ | greeting-cards 承接 (展示层未拍板前维持) 200 |
| 7 | /about-us/ | ✅ | 200 |
| 8 | /products/sticker-printing/ | ✅ | 200 |
| 9 | /flyer-printing/ | ✅ | 200 |
| 10 | /menu-printing/ | ✅ | 200 |
| 11 | /poster-printing/ | ✅ | 200 |
| — | 新站 /zh-hk/category/books/ 200 (title 66) · /zh-hk/services/rush-printing-delivery/ 200 (title 51) · /zh-hk/category/greeting-cards/ 200 | — | ✅ |

**判定**: **11/11 PASS (301 链) + 7/7 PASS (新站 200)**; 与 9/14 / 9/15 / 9/16 四轮结论一致; 异常 (business-card 直 200 / about-us 404) 未再现。

---

## 10. T43 rich results 观察 (禁盲改 schema)

| 项 | 状态 |
|---|---|
| FAQPage / Product / Article JSON-LD | 16 类目 × 3 locale + PDP + blog 全部在线 (本 run web_fetch 页面 FAQ 区块可见, 渲染层自动生成) |
| schema 改动 | **无** (本 run 零 src 改动, 未触碰任何 schema) |
| GSC 呈现维度 (本 run 新数据) | 产品摘要 **12,031 imps / 208 clicks / 1.73% / pos 28.3**; 商家信息 **23 imps / 6 clicks / 26.09% / pos 3.6** |
| 观察结论 | rich results 持续有展示 ⇒ 维持「观察项」定位, **不盲改 schema** |

---

## 11. v9.3 新门禁 S1 / S2 / S3

| 门禁 | 本 run 状态 |
|---|---|
| **S1 答案块字数断言** (zh-hk 40-60 全角字, 硬上限 ≤60) | **N/A** — 本 run 无答案块/FAQ 批次, 零 src 改动 (今日 daily lane 的 MOQ_AEO = 43 全角字, 已在 9/18 daily 报告验收) |
| **S2 slug 存在性前置校验** | ⚠️ **命中 2 处存量缺陷 (非本 run 新增, 非用户可见)**: ① matrix `Q-P1-01` 引用 `retail-poster-printing-guide` — 在 `src/data/blog-posts.ts` 与 `src/data/blog-data/zh-hk.json` **0 命中** (真实 slug = `retail-shop-poster-printing-guide`, zh-hk.json L186); ② matrix `Q-P1-03` 引用 `lai-see-packet-printing-guide` — **0 命中** (真实 slug = `wedding-red-packet-printing-guide`, blog-posts.ts L762 + zh-hk.json L202)。两处均在 **matrix priority 记录层** (非链接/非渲染), 按 S2「不存在的 slug 随批清洗」本应修正; 因改 priority 条目 = 战略级 (v1.2 ① 执行层无战略决策权) ⇒ **本 run 已在 matrix `priority_boost_changes` 记录 UPDATE 建议 + 上报 K3** (见 §13) |
| **S3 平台故障 ≥60min 上报** | **未观察到平台级故障** — web_fetch 全部 200 / cross-origin 301 正常; 无 CF 503 / 构建队列阻塞证据 |

---

## 12. matrix 回灌 (gsc_feedback_2026_09_18 block)

| 动作 | 详情 |
|---|---|
| **新增 block** | `gsc_feedback_2026_09_18` — 16 键: version / run_at / cron / data_source / site_stats_28d / t1_locked_words_8_28d / quality_metrics_v94 / title_v4_audit_8_words_zh_hk / anchor_text_audit_8_words_zh_hk / brand_tracking / redirect_301_verification / t43_rich_results / **new_gsc_findings_2026_09_18** / s1_s2_s3_gates / priority_boost_changes / priority_boost_holds / calibration_day_check / verification_window_note |
| `last_updated` | `2026-09-15` → **`2026-09-18`** |
| `last_updated_event` | 更新为 2026-09-18 事件串 (数据换代 + STALE 解除 + 质量三件套 + M1 线 1 + 8 T1 周环比 + title/锚审计 + 301×11 + S2 死 slug 上报) |
| `last_gsc_feedback_update` | 更新为 2026-09-18 |
| **priority_boost 变更** | **2 UPDATE** (Q-P1-01: slug 修复 + tier/boost T2/2→**T3/1** 保守归位, 依 v9.3 §1 表 pos 22.57 落 21-50 带; Q-P1-03: slug 修复, boost/tier 不变) + **2 holds** (Q-P1-02 餐牌 T1 boost 3, 依据 餐牌印刷 66/12.82/1 click; Q-P2-03 同人 T2 boost 2, 依据 doujin printing 15/11.5/2 clicks CTR 13.33%) |
| **新增 findings 字段** | `new_gsc_findings_2026_09_18`: A 高展示零点击 7 条 / B 零点击全域 (960 条锁 94.11% 展示) / C 位置带失衡 / D ja 零点击 / E 品牌词仅 1 条 / F 骨幹词前进 2.082 位 (44 改善 vs 14 退步, 0 条退步 >3 位) |
| P0 coverage | **95.45% 维持** (本轮无立项/结项, 不改) |
| `GSC数据/index.json` | totalFiles 123 → **135**; latestFreshData 2026-09-10 → **2026-09-15**; stalenessDays → **3**; freshnessStatus **FRESH** + notes.2026-09-18 登记 (12 档 + 解析产物) |

---

## 13. 给下游建议 / 上报 (PENDING_K3)

1. **★ S2 存量死 slug 修正 (🔴 需 K3 一句话)**: matrix `Q-P1-01` 的 `retail-poster-printing-guide` 与 `Q-P1-03` 的 `lai-see-packet-printing-guide` 均不存在。建议: **(A 推荐) 按本 run `priority_boost_changes` 记录的 UPDATE 落库** (改成 `retail-shop-poster-printing-guide` / `wedding-red-packet-printing-guide`) + 在 `error-patterns.md` 立规则 (priority 条目引 slug 必须先过存在性校验) —— 理由: 纯记录层修正, 不改用户可见面、不碰 churn 红线; (B) 仅删除两条记录 (会丢 queue 位); (C) 挂账不动 (S2 门禁将长期命中)。
2. **Q-P1-01 tier/boost 归位 + 是否破格提升 (🟡 请 K3 裁)**: 本 run 只做 **S2 纯修正** (slug `retail-poster-printing-guide` → `retail-shop-poster-printing-guide`) + 依 v9.3 §1 分层表把 `T2/boost 2` → **`T3/boost 1`** (海報印刷 pos 22.57 落 21-50 带)。**执行层不擅自破格提升 boost 3** — 理由: 选词分层/优先级属战略级 (v1.2 ① 执行层无战略决策权), 且 §0.30 v3 成熟度表对 zh-hk pos 20-40 另有「年轻站正常位置」口径, 两表交叉时**应由 K3 裁**。请 K3 一句话: (A 推荐) 维持 T3/boost 1 (守分层规则) / (B) 破格提升 T1/boost 3 (理由: 展示 174 全站第一 + 零点击属摘要问题 + 锚文本已就位) / (C) 维持原 T2/boost 2。**未拍板前 quantum 按 A 记录**。
3. **摘要层 (title/meta) 修复队列 (🟠 高杠杆, 但属文案禁区)**: §5 的 7 条 (480 展示 / 0 点击 / 期望 6.61 点击) 是全站唯一「不需等排名、改一次即变现」的批次; 今日 L1-1 诊断已定位两条具体病灶 — `food-packaging-printing-guide` **zh-hk 页挂英文 meta description**; 12 个 zh-hk PDP 抽样 **5 个 (41.7%) meta 首词重复** (`防水貼紙/防水貼紙` 等)。**改 meta = 改文案 ⇒ 需 K3 拍板** (建议走 §0.25.10 小改动直推通道)。
4. **title 三处口径冲突 (§6 末)**: `catalog-printing` 卡片 title「50本起」/ books 品类 title「50本起」/ `saddle-stitch-booklets` PDP 正文「50 本起印」**未随每日 lane 的 1 本起訂落地同步** ⇒ 同页多口径。建议并入 9/25 书刊簇验收批统一修 (数字钩子冻结令 9/30 解除后)。
5. **PDP meta 重复词 bug 全量普查 (挂账延续)**: 今日 L1-1 仅抽样 12 个 (41.7% 命中), **未做全站普查**; 该 bug 属 `sku-seo-data.ts` 派生层 (与今日 P3 定位的「派生 vs CSV 不一致」同源) ⇒ 建议与 P3 方向裁决 (A/B/C) 合并处理。
6. **K3 v10.1 决策 1 条件④ (9/25)**: 本 run 已备 baseline — 書刊/冊子/騎馬釘簇 **#q=80 / 1,073 imps / 0 clicks / pos 31.9 / 最佳位 1.0**; 9/25 用下一窗同比回报 CTR/imp。
7. **TS/构建未验证 (诚实声明)**: 本 lane pwsh 被禁 ⇒ **未跑** `npx tsc --noEmit` / build / `verify-deploy.mjs`; 本 lane **零 src 改动**, 风险面 = 报告 + matrix + index.json 三处 .hermes/GSC数据 文件; 由 host-side wrapper 走 §12 push 5 步 SOP (含 tsc/build/check-runs)。
8. **30 min push 间隔**: 今日已 push = `3b8ec078` (2026-09-18 05:02:55); 本 run 由 wrapper 在 lane 退出后提交, 与 05:02 相距 **>17h** ⇒ 不撞车 (§0.25 满足)。
9. **下一窗动作 (9/22+)**: 拉新数据 (xlsx 或 API) → 落盘 `gsc-fresh-YYYY-MM-DD.json` + 更新 index.json → 8 T1 词第三次周环比 (看貼紙印刷 +3.90 是否持续、即日印刷点击是否放大) → 7 条零点击词修复后首次效果回看 → ja 零点击是否破零。
10. **名片展示层 (a)/(b)/(c)**: §0.0 解禁块未拍板前**维持现状** (greeting-cards 承接 301 不动; 本 run 零触及)。

---

## 14. 撤回 / 更正声明 + 决策登记簿 ID (§0.23 / §J.1.3)

**撤回声明**: 本 run **无撤回项** — 无编造数字 (全部有来源, §0); 无 schema 改动; 无 src 改动; 未撤回任何前序报告。

**更正声明 (作用域 = matrix 存量记录, 非本报告数字)**:
| # | 被更正记录 | 更正内容 | 依据 |
|---|---|---|---|
| 1 | matrix `Q-P1-01.slug = "retail-poster-printing-guide"` | 该 slug 全仓 0 命中; 正确 = `retail-shop-poster-printing-guide` | grep `src/data/blog-posts.ts` (0) + `blog-data/zh-hk.json` L186 (命中) |
| 2 | matrix `Q-P1-03.slug = "lai-see-packet-printing-guide"` | 该 slug 全仓 0 命中; 正确 = `wedding-red-packet-printing-guide` | `blog-posts.ts` L762 + `zh-hk.json` L202 |
| 3 | 前四轮报告「最新真值 = 9/10 解析」 | 已被 9/18 档取代 (数据日 9/15); 前四轮的 STALE 判定在本轮解除 | `GSC数据/*2026-09-18.xlsx` ×12 + `index.json` 更新 |

**决策登记簿 ID 列表 (§J.1.3 强制规则)**:
- **D-9/18-GSC-1** (GSC 数据换代 + STALE 解除 + index.json 更新): 🟢 **DONE** (验证产物: `GSC数据/index.json` lastBuild 2026-09-18T22:43+08:00 / latestFreshData 2026-09-15 / FRESH; 本报告 §2)
- **D-9/18-GSC-2** (v9.4 质量三件套判定 + M1 线 1 首判): 🟢 **DONE** (产物: 本报告 §4 + matrix `quality_metrics_v94`)
- **D-9/18-GSC-3** (v9.3 任务 J 8 T1 锁词首次真实周环比): 🟢 **DONE** (产物: 本报告 §5 + matrix `t1_locked_words_8_28d`)
- **D-9/18-GSC-4** (title v4 当量核查 + 锚文本审计): 🟢 **DONE** (产物: 本报告 §6/§7 + matrix 两键)
- **D-9/18-GSC-5** (品牌 CTR + 301 + T43 周度验证): 🟢 **DONE** (产物: 本报告 §8/§9/§10; 301 11/11 PASS 线上实测)
- **D-9/18-GSC-6** (matrix priority_boost 回灌): 🟡 **IN_PROGRESS** (2 UPDATE 已记录进 matrix, **待 K3 拍板落库** — 见 §13 #1/#2)
- **D-9/13-5** (GSC STALE 修法, 前序挂账): 🟢 **DONE** (本 run 换代解除; 参考 `.hermes/logs/2026-09-13-gsc-feedback.md`)
- **D-9/18-plan-P3** (CSV 源头治理, 今日 daily 挂账): 🔴 **OPEN** — 不属本 lane (本 run 仅提供书刊簇 baseline)

---

## 附: 本 run 未做 / 做不到 (诚实边界, 不得当作结论使用)

| # | 项 | 原因 |
|---|---|---|
| 1 | 全站展示 100% 查询归因 | GSC 查询明细只覆盖 40.67% 展示 (8,472/20,833), 其余 12,361 展示因搜索量过低未拆分 |
| 2 | 「有点击词数 ≥12」的精确计数 | 85% 点击 (304/356) 落在匿名长尾, 逐词不可知 |
| 3 | en/ja 品牌 CTR | `ZprintPro` / `zprintpro` / `ジープリント` 17 个 sheet 全 0 命中 ⇒ 无分母 |
| 4 | 7d / 24h 逐词明细 | 本 lane 仅消费同 lane 已解析的 28d 维度; 7d/24h 只有合计 (7d 合计 101 clicks 与日序列求和不矛盾, 已互证) |
| 5 | page × query 交叉维度 | GSC 导出不含该维度 ⇒ 查询↔页面关联为 slug/主题推断 (今日 L1-1 报告已同声明) |
| 6 | tsc / build / 线上 CF Pages 状态 | pwsh 沙箱禁用 (不重试); 由 host-side wrapper 走 §12 SOP |
| 7 | 因果归因 | 无改动前后同窗对照 ⇒ 所有「因为…所以…」均为时序相邻假设 |

---

*Generated by deepseek harness (DSH lane `ZP-gsc-feedback`, v9.4 rearm 持续轮) · 2026-09-18 22:43 窗口 · 仓根 F:\zprintpro-nextjs*
