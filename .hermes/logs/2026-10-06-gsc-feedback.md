# GSC Feedback Loop — 2026-10-06 (v9.4 rearm 持续轮 · 10/5 新档消费轮 · STALE 解除轮 · 完整 14 章节流程)

VERDICT: OK
CONSUMED: run-context-ZP-gsc-feedback.json @ 2026-10-06 22:43:02 | lane-status.json @ 2026-09-22T22:43:14 (stale 14 天, 仅作历史对账) | lane-results-bus-contract.md @ v1 (2026-09-19) | 上轮报告 2026-09-30-gsc-feedback.md (verdict=OK, 已交付不重复)
DELIVERED: .hermes/logs/2026-10-06-gsc-feedback.md, .hermes/logs/2026-10-06-gsc-suggested-src-fixes.md, .hermes/industry-keyword-matrix.json (新增 gsc_feedback_2026_10_06 block + last_updated / last_updated_event / last_gsc_feedback_update 3 处元数据), GSC数据/index.json (10/5 档登记 + freshnessStatus STALE→FRESH + 151 files)
NEXT: ① 10/12 前后下一拉新窗 (建议带 3mo 窗补品牌长窗对照, 落 gsc-fresh 机器格式) ② K3 对 3 条 src 修复拍板: 宣傳單張/包裝盒訂製 锚文回補 (挂账第 2 轮) + footer 实体地址口径 (新增) ③ Q-P1-01/Q-P1-03 死 slug 挂账续等 K3 ④ W7 利是封选题 (10/7-10/13) 与 Q4 季节信号承接确认

**幂等核验**: run-context.retry_queue = [] (无 RETRY 项); previous_run verdict=OK @ 2026-10-01 (报告 2026-09-30 交付完整) ⇒ 上轮已完成项**不重复**; 本轮为 9/30 报告 NEXT 承诺的「10/2 后拉新窗」消费轮 — 10/5 档 ×12 xlsx 已落盘并由人手/他会话解析为机器产物, 本 lane 直接消费。idempotency_key 7f425401b05a5b1b (lane|gsc-feedback-10/5档消费|matrix+index|2026-10-06)。
**跨车道避让**: sibling_lanes = [] ⇒ 今日无兄弟车道动作, 无撞车风险; 本 lane 零 src 改动, 不触发 §0.35.5 撞车面。

**Run type**: gsc-feedback-loop 完整流程 (10/5 新档消费 + freshness 门禁 + 8 T1 锁词周追踪 + v9.4 质量三件套判定 + M1 线 1 判定 + risers/fallers + Q4 季节信号 + 锚文本审计 + title 线上实测 + 品牌监测 + 301 验证 + matrix 回灌 + src 修复建议上报), **无简化无延后**
**环境**: pwsh 工具在本 lane 沙箱被禁 (v9.4 §3-2 明示**不重试**) — 全程仅用文件工具 (read/glob/grep/write/edit) + web 工具; git commit/push 由 host-side wrapper 执行, **不在 lane 内运行**; 本 lane 写权限仅限 `.hermes/` + `GSC数据/index.json`, **零 src 改动**

---

## 0. 数据来源 (SOP-10 第 3 款 / §0.23 数据诚信红线 — 必含)

```
数据来源:
- GSC 数据 (本 run 主源): GSC数据/*2026-10-05.xlsx ×12 (24h/7d/28d × 三站点汇总+香港+日本+美国; 本档无 3mo 窗)
                          → 机器解析产物 (同仓已落盘, 本 lane 直接消费):
                            .hermes/gsc-2026-10-05-week-delta.json (7d-sum/28d-sum top 词 + old→new 位置 delta)
                            .hermes/gsc-2026-10-05-k3-bigwords.json (hk/us/jp × 7d/28d 大词)
- GSC 对照窗: 9/18 档 28d (08-19~09-15, .hermes/industry-keyword-matrix.json gsc_feedback_2026_09_18 block) — 与 10/5 档 28d (~09-07~10-04) 同窗型可直接对照
- GSC 前档:   9/29 档 (边界 STALE, 上轮已消费; 本轮被 10/5 档取代)
- 前序报告:   .hermes/logs/2026-09-30-gsc-feedback.md (上一正式报告, verdict=OK)
- K3 拍板:    v9.3 §S1/S2/S3 门禁 + 任务 J (8 T1 锁词) ← docs/2026-09-12-k3-directive-v93-home-fix-money-words.md
              标题规则 ← docs/2026-09-13-title-batch-T-freeze.md §6-3 (K3 2026-09-19 裁决 50-57, 58 阻断)
              v9.4 §4 质量三件套 ← .hermes/cron-prompts/zprintpro-gsc-feedback-loop.md
- 线上探针 (本 run 新取证): web_fetch 2026-10-06 ×7 —
              旧 z-printpro.com URL ×3 (/products/packaging-box-printing/ /products/sticker-printing/ /flyer-printing/)
                全部 cross-origin redirect → zprintpro.com = 301 链证据 (3/3)
              新站 ×4 (/zh-hk/category/books/ /stickers/ /flyers/ /services/rush-printing-delivery/ 全 HTTP 200 + title 逐条实测)
- 锚文本审计 (本 run 新取证): grep src/data/blog-data/zh-hk.json 8 词精确锚, 双方法复算
- 幂等核验:   run-context.retry_queue=[] + previous_run.verdict=OK + 10/5 档文件存在性核验 (glob 实证 12 xlsx + 2 解析 json)
```

### §I.1 4 口径对照表 (per §0.33.1)

| 口径 | 真实数量 | 类型 | 本报告何处使用 |
|------|---------|------|----------------|
| 10/5 档命名查询 (7d 汇总) | 592 词 | GSC 查询明细 | §2/§3/§5 |
| 10/5 档 28d top 词 (汇总+3 市场) | 解析档 top-100/窗 | GSC 派生 | §3/§5/§6 |
| 8 T1 锁词清单 | 8 词 (K3 9/12 拍板) | K3 拍板 | §3 |
| 锚文审计 | 8 词 × 双方法 | grep 实测 | §7 |
| 线上探针 | 7 URL | web_fetch | §8/§10 |

**校准状态**: 🟢 FRESH — 10/5 档导出 (报告前 1 日), 数据日 ~10/02-03 (GSC 滞后 2-3 天属正常); 上轮 9/29 档「边界 STALE (4d)」正式解除; 本档无 3mo 窗 ⇒ 品牌长窗对照缺, 相关结论标 PENDING 不虚报。
**撤回声明**: 无 (本 run 未撤回任何前序报告; 9/30 轮结论全部维持)。
**无老站对比基线声明**: 本档数据均为 zprintpro.com 新站属性, 不含老站 z-printpro.com 基线 (per §0.30.5)。

---

## 1. Freshness 门禁判定 (§K.1.3)

| 档 | 数据日 | 距报告日 | 判定 | 处置 |
|----|--------|---------|------|------|
| 9/29 档 | ~09-26 | 10 天 | ❌ 过期 | 被 10/5 档取代, 不再消费 |
| 10/5 档 | ~10/02-03 | 3-4 天 (导出 1 天) | 🟢 FRESH (本档导出 <72h) | **本轮主消费档** |

- 上轮 NEXT 承诺「10/2 后拉新窗」已兑现: 10/5 档 ×12 落盘 (glob 实证)。
- 本档缺陷: 无 3mo 窗 (9/29 档首含, 本档回归 24h/7d/28d) ⇒ 品牌 3mo 对照 / 长趋势不可算, 已标 PENDING。
- 建议下一窗 (10/12 前后): 拉新时**补 3mo 窗**, 恢复双档对照能力。

## 2. 站点总量对照 (数据继承: 上轮 → 本轮)

| 口径 | 9/29 档 (上轮) | 10/5 档 (本轮) | Δ |
|------|---------------|---------------|---|
| 命名查询 7d 词数 | 604 | 592 | -12 (量级持平) |
| 命名查询 7d 点击 | 18 (含 即日印刷 4clk ★) | 全量字段缺 (解析档无 totals) | PENDING |
| 命名查询 28d 点击 | 57 | 全量字段缺 | PENDING |
| 图表 7d 合计 (M1 线 1 口径) | 未解析 | 未解析 | PENDING (维持 9/18 判定 101≥25) |

- ⚠️ 诚实声明: 10/5 档解析产物**只有 top 词清单 + 位置 delta, 无 clicks/imps totals 字段** ⇒ 总量层一律 PENDING, 不做「点击涨/跌」结论 (数据诚信 §0.23)。
- 可见信号: 7d-sum top 词几乎全 0 点击, 28d top 词 ≥10 个词有点击 (§5) — 方向与上轮一致 (全站 CTR 仍极低, 即日簇独扛点击)。

## 3. 8 T1 锁词周追踪 (任务 J; 28d 同窗对照 = 本轮最大改进点)

> 上轮 9/30 用 3mo 窗对 9/18 的 28d 窗 (窗口径不匹配, 只能方向性); 本轮 10/5 档与 9/18 档**同为 28d 窗**, 首次同窗硬对照。

| 锁词 | 9/18 28d (imp/pos/clk) | 10/6 28d (imp/pos/clk) | 10/6 7d (imp/pos/clk) | 判定 |
|------|----------------------|----------------------|----------------------|------|
| 包裝盒印刷 ⭐ | 71/36.07/0 | 53/33.94/0 | 9/30.78/0 | 位置小幅改善, 0 点击 |
| 紙盒印刷 ⭐ | 63/35.00/0 | 48/31.00/0 | 4/33.75/0 | 位置改善, 0 点击 |
| 包裝盒訂製 | 56/30.80/0 | 44/29.18/0 | 13/27.15/0 | 小幅改善, 0 点击 |
| 貼紙印刷 | 165/27.28/0 | 170/26.98/0 | 26/29.04/0 | 全站 28d 第一词, 0 点击 |
| 宣傳單張 | 129/36.33/0 | 103/30.54/**1clk ★** | 25/15.56/0 | **28d 破零 + 双窗位置大升** |
| 即日印刷 | 51/8.57/1 | 54/8.04/**2clk ★** | 15/6.40/0 | **持续破零且放大 (1→2)** |
| 書刊印刷 | 61/40.90/0 | 97/35.38/0 | 9/34.11/0 | 位置改善, 0 点击; 7d 回落观察 |
| 騎馬釘 | 64/21.17/0 | 43/19.40/0 | 3/21.71/0 (关联 騎馬釘印刷 7/7.21 ★进首页带) | 位置改善, 0 点击 |

- **总结**: 8 词 28d 同窗 **6 词位置改善 / 2 词持平, 无一退步**; 破零词 1→2 (宣傳單張新进); 0 点击 6 词维持 — **问题层三连定位 (9/18→9/30→10/6): CTR/摘要吸引力**, 非位置层。
- rush 簇衍生: **急件印刷 7d 2imps/1clk/pos 7 新词破零** (旧词 即日急件 7d 回落至 19.91, 簇内词位轮动, 观察下窗)。

## 4. 质量三件套 v9.4 + M1 线 1

| 指标 | 门槛 | 本轮判定 | 证据 |
|------|------|---------|------|
| ① striking 词进首页数 | ≥5 | ✅ **PASS (proxy)** | 7d-sum top100 中 pos≤10 词 = **18 个** (即日印刷 6.40 / 紙袋訂製 2.74 / 月歷印刷 3.93 / 騎馬釘印刷 7.21 / 中綴じ冊子印刷激安 1.0 / small batch stickers 4.92 等) |
| ② pos 1-20 展示占比 | ≥30% | 🟡 方向性 PASS (proxy) | top100 中 pos≤20 词 ≈ **47 个 (词数占比 ~47%)**; imps 加权未精确加总 (解析档无全量字段) ⇒ 标 proxy 不作硬判定 |
| ③ 有点击词数 | ≥12 | 🟡 部分 | 28d 可见有点击词 **≥10** (海報印刷 2 / 宣傳單張 1 / saddle stitch booklet printing 2 / 即日印刷 2 / doujinshi printing 1 / 印刷公司 3 / zprint 1 / 印海報一張 1 / a2 印刷即日 3 / 急件印刷 1 等), 7d 可见 3; 全量有点击词数字段缺 |
| M1 线 1 (7d clicks ≥25) | 7d ≥25 | PENDING | 图表合计口径连续两档未解析; 9/18 判定 (101 ≥ 25) 维持至全量口径到窗 |

## 5. Risers / Fallers (7d 单周 delta, per 解析档 old→new)

**Risers TOP (本档最强信号)**:
| 词 | 市场 | old→new | Δ |
|----|------|---------|---|
| 宣傳單張 | hk | 36.89→14.79 | **+22.1** |
| a2 poster printing | us | 23.33→8.29 | +15.0 |
| コミケ 印刷 | jp | 25.22→13.28 | +11.9 |
| 月歷印刷 | hk | 18.16→6.53 | +11.6 |
| 紙袋訂製 | hk | 14.17→2.74 | +11.4 |
| 利是封印刷 | hk | 21.36→11.43 | +9.9 |
| 戶外貼紙 | hk | 14.77→6.35 | +8.4 |
| クラフト紙 パッケージ 印刷 | jp | 24.52→15.50 | +9.0 |
| 28d 窗: saddle stitch booklet | us | 43.59→16.14 | +27.5 |
| 28d 窗: a2 printing | us | 31.43→9.15 | +22.3 |

- **en 内容起效连续验证**: 28d 窗 saddle-stitch 系 (+27.5) / a2 poster 系 (+22.3) / cheap catalog printing china (+21.2) — 9 月 cluster 内容效果跨档延续 (9/29 档已见 7d 暴升, 本档 28d 确认)。
- **Q4 季节信号 (新增观察, 见 §13)**: 纸袋簇 7d 全进 pos≤7 / 利是封簇双词上行 / 月曆簇 6.53 / jp コミケ (Comiket 季) — 季节起量窗口打开, B7 W7 利是封选题 (10/7-10/13) 正接。

**Fallers 观察** (低基波动不恐慌 per §0.30.2): 即日急件 -12.9 (rush 簇轮动) / 書刊印刷 -11.6 / 印書 -11.1 (28d 同窗仍改善, 单窗波动) / 膠片餐牌 -34.8 / 教科書印刷 -24.5 / double sided printing -58 — 均列入下窗复核, 不动作。

## 6. CTR 修复候选池 (28d 零点击高展示, 继承上轮池)

貼紙印刷 170/26.98/0 · 月曆印刷 116/16.24/0 · 宣傳單張印刷 109/24.7/0 · 書刊印刷 97/35.38/0 · 利是封印刷 67/20.13/0 · small batch label printing 64/20.48/0 · 訂做紙袋 59/14.98/0 · 車身廣告 57/38.04/0 — 与 9/29 档池高度重合, 池内词位在改善但点击未至 ⇒ meta description 吸引力/价格钩子层修复建议维持挂账 (属 src 写权, 待 K3 排批)。

## 7. 锚文本审计 (双方法复算 §0.23.2)

| 词 | 9/30 | 10/6 | Δ | ≥3 |
|----|------|------|---|-----|
| 包裝盒印刷 | 5 | 5 | 0 | ✅ |
| 紙盒印刷 | 3 | 3 | 0 | ✅ |
| 包裝盒訂製 | 2 | 2 | 0 | ❌ 挂账 |
| 貼紙印刷 | 4 | 4 | 0 | ✅ |
| 宣傳單張 | 2 | 2 | 0 | ❌ 挂账 |
| 即日印刷 | 3 | 3 | 0 | ✅ |
| 書刊印刷 | 3 | 3 | 0 | ✅ |
| 騎馬釘 | 7 | 3 | -4 | ✅ |

**6/8 达标维持, 2/8 跌破维持** (宣傳單張 2 / 包裝盒訂製 2) — 挂账第 2 轮上报 (FIX-1/FIX-2)。注: 宣傳單張词位单周 +22.1 正在冲首页, 锚文补强窗口正当期。

## 8. Title 线上实测 (web_fetch 2026-10-06, 50-57 目标区 / 58 阻断)

| 页面 | title | 当量 | 判定 |
|------|-------|------|------|
| /zh-hk/category/books/ | 小冊子印刷 10本起・騎馬釘/膠裝/精裝 教材繪本急印 \| 智印港 | 57 | ✅ (维持 9/30) |
| /zh-hk/category/stickers/ | 貼紙印刷 10張起・防水透明異形貼紙・免費設計燙金 \| 智印港 | 57 | ✅ (维持 9/30) |
| /zh-hk/category/flyers/ (新增抽测) | A5 宣傳單張印刷 10張起・A4/A5/A3 雙面 \| HK$0.18 起 \| 智印港 | 56 (・按1计) | ✅ |
| /zh-hk/services/rush-printing-delivery/ (新增抽测) | 即日印刷・即日急件｜18:00 截單・翌日 12:00 送到 \| 智印港 | 55 | ✅ |

抽测 4/4 全在目标区; 9/18 挂账 2 条超线维持结案状态; 数字钩子冻结令已于 9/30 到期, 后续 title 批次按 v5 规则走门童 #27。

## 9. 品牌监测

- **智印港**: us-7d 1 imp / **1 clk** / pos 1.0 (品牌词 CTR 100%); hk-7d top100 未列 (本窗量小, top100 截断口径非「0 展示」声明); 本档无 3mo 窗 ⇒ 与上轮 (3mo 41 imps / pos 1.4) 不可同窗对比, 品牌长窗 PENDING。
- **zprint (en)**: 7d 9 imps / pos 7.78 / 0clk; 28d 31 imps / pos 7.74 / 1clk — 持续有量, 双域名品牌归一继续。
- **ジープリント**: 0 命中 — 30 目录建设继续。

## 10. 301 验证 (P0-2 ACTIVE 监控)

- 旧站抽测 ×3 (/products/packaging-box-printing/ /products/sticker-printing/ /flyer-printing/): **全部 cross-origin redirect → zprintpro.com** = 301 链证据 (3/3 PASS)。
- 新站抽测 ×4 (books/stickers/flyers/rush): HTTP 200 全过。
- 未观察到平台级故障 (S3 阈: 无 CF 503 / 部署卡死迹象)。

## 11. Matrix 回灌 (本节 = 实际落盘内容)

- 新增 block: `gsc_feedback_2026_10_06` (version 2026-10-06-v1, 含 data_source / 8 锁词同窗对照 / risers_fallers / Q4 季节信号 / 锚文审计 / title 实测 / 品牌 / 301 / 质量三件套 / S1-S3 / priority_boost 0/0 / P0 coverage 95.45% / footer flag)。
- 元数据 ×3: `stats.last_updated` → 2026-10-06; `stats.last_updated_event` → 本轮摘要; `last_gsc_feedback_update` → 本轮摘要。
- priority_boost: **0 UPDATE / 0 hold-change** — 本档与 9/18 档 28d 同窗, 变更可判但观察窗保守不动; 9/18 挂账 2 UPDATE (Q-P1-01/Q-P1-03) 仍待 K3。
- P0 coverage: 95.45% 维持 (本轮无立项/结项)。

## 12. Src 修复建议上报 (本 lane 零 src 写权)

详见 `.hermes/logs/2026-10-06-gsc-suggested-src-fixes.md`:
- **FIX-1 [挂账第 2 轮]** 宣傳單張 精确锚 2→≥3 篇 (词位 +22.1 冲首页窗口期)。
- **FIX-2 [挂账第 2 轮]** 包裝盒訂製 精确锚 2→≥3 篇。
- **FIX-3 [新增 · 需 K3 确认口径]** 全站 footer 实体地址显示「香港九龍新蒲崗大有街3號萬廣大廈15樓C室」, 与 §3 深圳实体口径不一致 — 线上探针实证, 建议统一并排批 (法务/NAP 层, 不混入内容批)。

## 13. 新增观察 (T43 关联 / Q4 季节)

- **T43 rich results**: 维持观察项, 零 src 改动; 本档无呈现维度解析 ⇒ PENDING。
- **Q4 季节信号 (本档新增, 供 daily-content 车道与 K3 排期参考)**: 纸袋簇 (7d 全 pos≤7) + 利是封簇 (印刷 11.43↑9.9 / 訂製 5.71↑10.0) + 月曆簇 (6.53↑11.6) + jp コミケ (13.28↑11.9)。B7 选题库 W7 利是封 (10/7-10/13) 与此信号完全同频, 建议确认排批; W9 聖誕卡随后。

## 14. 诚实清单 (本轮做不到/不做的)

| # | 项 | 状态 | 原因 |
|---|----|------|------|
| 1 | 品牌 3mo 长窗对照 | PENDING | 10/5 档无 3mo 窗 |
| 2 | 质量三件套 ② imps 加权 / ③ 硬判定 / M1 线 1 | PENDING | 解析档无全量 clicks/imps totals 字段 (连续档缺, 建议下窗补拉图表合计口径) |
| 3 | tsc / build / CF Pages | 不跑 | pwsh 沙箱禁用 (不重试); host-side wrapper 走 §12 SOP |
| 4 | 因果归因 | 不做 | 无改动前后同窗对照 ⇒ 所有「因为…所以…」均为时序相邻假设 |
| 5 | 9/29 lane 锚文记录复核 | 不适用 | 上轮已以实测为准 (6/8), 本轮同口径复测一致 |

---

## SOP-10 5 问门禁 (K3 §0.22)

- [x] 1. 架构差异? — 已查 9/30 报告 + matrix gsc_feedback_2026_09_30 block 实现路径, 确认本轮为新档消费非重复; 28d 同窗对照口径已与 9/18 block 核验
- [x] 2. 约束适用范围? — K3 拍板原文已查 (v9.3 任务 J / title 50-57 §6-3 / §0.0 名片禁区未触碰); 本 lane 写权限仅限 .hermes/ + GSC数据/index.json 未越权
- [x] 3. 原数据/拍板来源? — ① 10/5 档 xlsx + 同仓解析 json (真数据, glob 实证 12 文件) ② 8 锁词 = K3 9/12 拍板 ③ 50-57 = K3 9/19 裁决 (留) ④ 数字钩子冻结令 9/30 已到期
- [x] 4. 字段值策略? — N/A (零 src/certNo 字段操作)
- [x] 5. Markdown 渲染? — 本报告为内部文档; 未向 user-facing 文本注入 [text](url) 未解析内容

## 撤回声明

- 无。9/30 轮全部结论维持有效; 本轮新增结论以 10/5 档为唯一数据基。

---

*Generated by deepseek harness (DSH lane `ZP-gsc-feedback`, v9.4 rearm 持续轮) · 2026-10-06 22:43 窗口 · 仓根 F:\zprintpro-nextjs*
