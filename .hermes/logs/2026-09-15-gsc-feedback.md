# GSC Feedback Loop — 2026-09-15 (v9.4 rearm 后首轮真实 cron lane · 完整流程)

**Trigger**: deepseek harness 执行层, gsc-feedback-loop cron lane (2026-09-15 22:43 窗口; host-side wrapper 已修复 `call` 前缀, 见 `.hermes/logs/2026-09-15-wrapper-call-fix.md` — 本 lane 为修复后首个真实运行, git commit/push 由 wrapper 经 `scripts/lane-git-commit.py --lane gsc-feedback --include-matrix` 执行)
**Run type**: gsc-feedback-loop 完整流程 (v9.3 任务 J 8 T1 锁定词追踪 + title v4 当量核查 + 锚文本审计 + 智印港/ジープリント 品牌监测 + 301 验证 + T43 观察 + matrix 回灌), 无简化无延后
**Output**: `.hermes/industry-keyword-matrix.json` — 新增 `gsc_feedback_2026_09_15` block + **修正 `gsc_feedback_2026_09_14` block 锚文本审计为 8/8** + `last_updated_event` 更新 + 本报告
**环境**: pwsh 工具在本 lane 沙箱被禁 (v9.4 §3-2 明示不重试) — 全程仅用文件工具 + web 工具; git commit/push 由 host-side wrapper 执行, 不在 lane 内运行

---

## 0. 数据来源 (SOP-10 第 3 款 / §0.23 数据诚信红线 — 必含)

```
数据来源:
- GSC 数据: GSC数据/gsc-fresh-2026-09-03.json (9/3 canonical, 28d 8/7-9/3)
- GSC 数据: GSC数据/index.json (lastBuild 2026-09-11T03:20+08:00, latestFreshData 2026-09-10, 123 files)
- GSC 解析: .hermes/hk28d-queries.json (9/10 xlsx 28d hk 解析, 窗口 8/14-9/10; 本 run 逐词 read 复核 8 T1 词 imp/pos/clicks 一致)
- GSC 解析: .hermes/enja28d-queries.json (9/10 xlsx 28d en 116 / ja 56 解析; 品牌词 z print 复核)
- GSC 决策: .hermes/logs/2026-09-14-gsc-feedback.md (9/14 执行轮全报告, 全站口径 hk 247/10022/2.46%/26.6 · all 349/20323/1.72%/31.3, §7 品牌词追踪, §8 301 验证 11/11)
- GSC 判定: .hermes/logs/2026-09-14-ctr-judgement-final.md (智印港 9/3 10/14/71.4%/pos1.3 → 9/10 7/8/87.5%/pos1.5)
- K3 拍板: v9.3 任务 J (8 T1 锁定词, docs/2026-09-12-k3-directive-v93-home-fix-money-words.md) / docs/2026-09-09-k3-title-rule-v4-write-full.md (v4 写满 50-54 当量) / v9.4 rearm 执行纪律 / §0.0 解禁块 (2026-09-12) / §13.1 gsc cron 范围
- 线上探针 (本 run 新取证): web_fetch 2026-09-15 — 旧 z-printpro.com URL ×11 (全部 cross-origin redirect to zprintpro.com = 301 链证据) + 新站落地页 ×7 (packaging/stickers/flyers/rush/books/saddle-stitch/greeting-cards/home 全 HTTP 200) + title ×6 逐条核对
- 锚文本审计 (本 run 新取证): grep src/data/blog-data/zh-hk.json (8 词精确锚文本 `>词</a>` 分布, 8/8 词 ≥3 统一锚)
- 前序: .hermes/logs/2026-09-14-gsc-feedback.md (本 run 的锚审计实证修正源) + 2026-09-13-gsc-feedback.md (试射轮) + .hermes/logs/2026-09-15-wrapper-call-fix.md (wrapper 修复记录)
```

---

## 1. SOP-10 5 问门禁 (§0.22 强制级)

| # | 问 | 本 run 答案 | 结论 |
|---|---|---|---|
| ① | **架构差异? 查前序 commit 路径** | 本 run 无 src/ 改动; 写入仅限 `.hermes/industry-keyword-matrix.json` + 本报告 (gsc-feedback cron 写权限仅限 .hermes/, 9/13/9/14 试射+执行轮同路径实证)。前序 `gsc_feedback_2026_09_14` block 与本块同构, 无 X/Y 路径冲突。 | ✅ 无 src 差异 |
| ② | **约束适用范围? 查 K3 拍板原文** | 适用约束 = v9.3 任务 J (8 T1 锁定词追踪 + 攻坚①②) + §0.0 解禁块 (名片解禁仅接单层; 展示层 (a)/(b)/(c) 未拍板 → 不改 greeting-cards 资产、不改 middleware 301) + §13.1 gsc cron 范围 (智印港 CTR / ジープリント / 301 验证 / T43) + v9.4 rearm 执行纪律 (pwsh 禁, 报告落盘 = 成功) + §0.25.8 (不阻塞等待, push 交给 wrapper)。K3 原文均已核。 | ✅ 范围正确 |
| ③ | **原数据/拍板来源? 不推断无来源数字** | 全部 8 词 imps/pos/clicks 来自 hk28d-queries.json (9/10 解析, 本 run 逐词 read 复核); 9/3 基线来自 gsc-fresh-2026-09-03.json (经 9/14 报告转引); 智印港 CTR 来自 9/14 ctr-judgement-final.md; 全站口径来自 9/14 报告 §3; 无编造数字; 校准状态显式声明 (STALE, 见 §2)。 | ✅ 有来源 |
| ④ | **字段值策略? certNo/validUntil/issuer 全空** | 本 run 未触碰任何 schema/certNo 字段 (无 src 改动, 无 schema 编辑)。 | ✅ N/A |
| ⑤ | **Markdown 渲染? parseInlineLinks** | 本 run 只写 .hermes/ 下 JSON + Markdown 报告, 不新增 user-facing 渲染文本, 无 [text](url) 直渲染风险。 | ✅ N/A |

**门禁结论**: 5 问全过; 本 run 为纯数据复核 + 线上探针 + 观察 + 回灌, 零 src 改动。

---

## 2. 校准状态 (v4 §5.1 / GSC 新鲜度门)

| 项 | 值 | 判定 |
|---|---|---|
| GSC index.json lastBuild | 2026-09-11T03:20+08:00 | — |
| latestFreshData | 2026-09-10 | 距 9/15 约 5 天 |
| 72h 新鲜度门 | 最新真值 9/10 (~5d old) | ⚠️ **STALE** (与 9/14 run 同判定) |
| 本 run 使用真值 | 9/10 解析 (hk28d/enja28d-queries.json) | 两窗方向可比, 不可精确周环比 |
| 校准日判定 | 9/15 非校准日 | 校准判定待 9/17 |
| 新数据动作 | 本 lane 无 GSC API 凭证 + pwsh 禁 → 无法拉新; 沿用 9/10 最新真值, 显式 STALE 声明 | 9/17 窗口由 K3/有凭证车道拉新 |

**窗口说明**: 9/3 canonical = 28d 8/7-9/3; 9/10 解析 = 28d 8/14-9/10。**9/17 是改版后首个干净对比窗** (8/31-9/10 改动密集: blog 层 9/1 be744435 / 9/3 5 Pillar / 9/5 1f6f85c5 / 9/8 f8c194a0 / 9/9 819f3189; SKU 层 9/2 54c675c0 / 9/6 4bf2c124 / 9/9 d5d1c240; PLP/PDP v9 9/5-9/10)。本次 delta 仅作方向参考。

---

## 3. 全站口径核对 (9/10 真总量, 与 9/14 报告 §3 一致, 本 run 复核)

| locale | clicks | imps | CTR | wpos | 判定 |
|---|---|---|---|---|---|
| hk | 247 | 10,022 | 2.46% | 26.6 | 与 9/14 一致 |
| en | 19 | 3,925 | 0.48% | 43.6 | 与 9/14 一致 |
| ja | 35 | 1,791 | 1.95% | 41.2 | 与 9/14 一致 |
| all | 349 | 20,323 | 1.72% | 31.3 | 与 9/14 一致 |

无新数据窗 (9/10 为最新真值), 口径不变; hk CTR 2.46% > 全站 1.72%, 智印港品牌词 CTR 87.5% 为全站最强信号 (§7)。

---

## 4. v9.3 任务 J — 8 个 T1 锁词追踪 (hk 28d, 9/3 vs 9/10)

| 词 | 9/3 imp/pos | 9/10 imp/pos | Δpos | 9/10 clicks | 判定 |
|---|---|---|---|---|---|
| 包裝盒印刷 ⭐ | 68 / 38.19 | 69 / 36.6 | +1.59 | 0 | 位置↑, 0 点击 |
| 紙盒印刷 ⭐ | 54 / 39.43 | 63 / 37.5 | +1.93 | 0 | 位置↑ + 展示 +9 |
| 包裝盒訂製 | 64 / 29.39 | 64 / 30.6 | −1.21 | 0 | 唯一负向 |
| 貼紙印刷 ⭐ | 133 / 35.14 | 153 / 31.2 | +3.94 | 0 | 位置↑ + 展示 +20 |
| 宣傳單張 | 135 / 36.8 | 130 / 36.4 | +0.4 | 0 | 基本持平 |
| 即日印刷 | 35 / 9.57 | 42 / 9.1 | +0.47 | 0 | 唯一速赢窗口 (pos 9.1) |
| 書刊印刷 | 未收录 | 16 / 39.7 | n/a | 0 | 新获可见性 |
| 騎馬釘 | 63 / 33.03 | 68 / 27.3 | +5.73 | 0 | 最大升幅 |

**判定**: 7/8 词位置正向 (包裝盒訂製除外); **全部 0 点击**。数据 STALE (9/10), 9/17 干净窗后方可判定攻坚①②真实效果。即日印刷 pos 9.1 处 5-15 速赢带, 但 0 点击 → 9/17 优先看破零。

---

## 5. 攻坚① — title v4 写满核查 (半角当量 50-54)

方法: 本 run web_fetch 线上 title ×6 与 matrix/9/14 记录逐条核对 (数据层未变, 幂等复核; 当量按 title-audit-v4.mjs L12 equiv 公式 CJK×2 + ASCII×1, 9/14 手工核算沿用)。

| 词 | 落地页 | 线上 title (web_fetch 200) | 当量 | 带位 |
|---|---|---|---|---|
| 包裝盒印刷/紙盒印刷/包裝盒訂製 | /zh-hk/category/packaging/ | 紙質食品包裝盒印刷 100個起 \| 食品紙盒/紙袋 \| 智印港 | 51 | ✅ OK (50-54) |
| 貼紙印刷 | /zh-hk/category/stickers/ | small batch 貼紙印刷 防水抗UV・1張起印・異形裁切・燙金 \| 智印港 | 63 | >60 待修剪 (8/30 批冻结, 挂账) |
| 宣傳單張 | /zh-hk/category/flyers/ | A5 宣傳單張印刷 100張起・A4/A5/A3 雙面 \| HK$0.18 起 \| 智印港 | 60 | 55-60 遗留只读 (8/30 批冻结) |
| 即日印刷 | /zh-hk/services/rush-printing-delivery/ | 即日印刷 18:00 截單・順豐翌日 12:00 前送達 \| 智印港 | 51 | ✅ OK (50-54) |
| 書刊印刷/騎馬釘 | /zh-hk/category/books/ | 騎馬釘小冊子印刷 50本起 \| 騎馬釘 + 膠裝 + 精裝 + 教材繪本 \| 智印港 | 66 | >60 待修剪 (8/30 批冻结, 挂账) |
| 騎馬釘 (SKU) | /zh-hk/product/saddle-stitch-booklets/ | 騎馬釘小冊子 覆膜・騎馬釘・100起印・HK$6起 \| 智印港 | 53 | ✅ OK (50-54) |

**判定**: 8 词落地标题 4/6 组 OK (51/51/51/53); 貼紙印刷 63 与 books 66 超 60 待修剪但属 8/30 批冻结, **只观察不改** (红线: 不回滚已部署 title); 9/17 后评估修剪队列 (PENDING_K3 挂账, 与 9/14 报告 §13 一致)。

---

## 6. 攻坚② — 全站内链锚文本统一审计 (grep 实证修正)

**本 run 关键动作**: 9/14 报告 §11 已声明「锚文本审计实证修正为 8/8」, 但 **matrix `gsc_feedback_2026_09_14` block 未落盘修正** (仍记录「仅 包裝盒印刷 达标, 其余 7 词 <3」)。本 run grep 实证 8/8 词 ≥3 统一锚文本, 并将 9/14 block 一并修正落盘 (§11)。

grep 实证 (src/data/blog-data/zh-hk.json, `>词</a>` 精确匹配, 2026-09-15):

| 词 | 锚数 | 行号 | 达标 |
|---|---|---|---|
| 包裝盒印刷 | 5 | 32 / 64 / 140 / 143 / 304 | ✅ ≥3 |
| 紙盒印刷 | 3 | 104 / 151 / 669 | ✅ ≥3 |
| 包裝盒訂製 | 3 | 130 (×2) / 151 | ✅ ≥3 |
| 貼紙印刷 | 4 | 48 / 56 / 288 / 304 | ✅ ≥3 |
| 宣傳單張 | 3 | 378 / 445 / 470 | ✅ ≥3 |
| 即日印刷 | 3 | 445 / 542 / 611 | ✅ ≥3 |
| 書刊印刷 | 3 | 486 / 504 / 514 | ✅ ≥3 |
| 騎馬釘 | 3 | 224 / 504 / 514 | ✅ ≥3 |

**判定**: 8/8 词 ≥3 统一锚文本达标 (daily-content 9/14 补锚 21 处 + 包裝盒印刷既有 5 锚保留); 攻坚② 数据层完成, 9/17 干净窗看 CTR 效果。L143 typo (傳單印刷印刷→傳單印刷) 已由 daily-content 9/14 修复 (grep 0 残留)。

---

## 7. 品牌词追踪 (智印港 / ジープリント / z print)

| 词 | 9/3 | 9/10 | 目标 | 判定 |
|---|---|---|---|---|
| 智印港 | 10/14/71.4%/pos 1.3 | 7/8/87.5%/pos 1.5 | 基线 10% → 4 周 40%+ | ✅ CTR 87.5% 远超目标; 但命中条数少 (7 clicks/窗), 品牌认知仍弱, 维持埋点, 9/17 复核 |
| ジープリント | 0 命中 | 0 命中 | 6 query 监测, 期望 ≥1 | ⚠️ 0 命中, 未达期望; 维持埋点 + 30 目录建设 (§13.16.1) |
| z print (en) | — | 11 imp / pos 15.1 | 品牌归一 (GEO) 观察 | 少量展示持续存在, 双域名品牌归一持续观察 |

---

## 8. 301 承接验证 (z-printpro.com 旧 URL → 新站 200)

本 run web_fetch 旧 URL ×11, 全部返回 `cross-origin redirect to https://zprintpro.com` (301 链证据); 新站落地页全部 HTTP 200:

| # | 旧 URL (www.z-printpro.com) | 301 链 | 新站落点 200 |
|---|---|---|---|
| 1 | /products/packaging-box-printing/ | ✅ | /zh-hk/category/packaging/ (title 51 OK) |
| 2 | /label-sticker-printing/waterproof-round-sticker-printing-outdoor-vehicle.html | ✅ | /zh-hk/product/waterproof-stickers/ |
| 3 | /enterprise-brochure-printing/a5-saddle-stitched-booklet-printing.html | ✅ | /zh-hk/product/saddle-stitch-booklets/ |
| 4 | /red-packet-wedding-invitation-printing/wedding-invitation-printing-foil-ribbon-envelope.html | ✅ | /zh-hk/category/red-packets/ |
| 5 | /large-format-printing/same-day-banner-printing-6x3ft-waterproof-hk.html | ✅ | /zh-hk/category/banners/ |
| 6 | /products/business-card-printing/ | ✅ | greeting-cards 承接 (名片展示层未拍板前维持贺卡承接) |
| 7 | /about-us/ | ✅ | 200 |
| 8 | /products/sticker-printing/ | ✅ | 200 |
| 9 | /flyer-printing/ | ✅ | 200 |
| 10 | /menu-printing/ | ✅ | 200 |
| 11 | /poster-printing/ | ✅ | 200 |

**判定**: 11/11 PASS (301 链 + 新站 200); 与 9/14 run 结论一致; 异常 #8/#9 (business-card 200-direct / about-us 404) 未再现; catch-all 落点 = 设计行为非异常。

---

## 9. T43 rich results 观察 (禁盲改 schema)

| 项 | 状态 |
|---|---|
| FAQPage / Product / Article JSON-LD | 16 类目 × 3 locale + PDP + blog 全部在线 (本 run web_fetch 页面 FAQ 区块可见, 渲染层自动生成) |
| schema 改动 | **无** (本 run 零 src 改动, 未触碰任何 schema) |
| 观察结论 | rich results 维持 GSC 观察项; 9/17 干净窗看 rich result 展示变化, 不盲改 schema |

---

## 10. v9.3 新门禁 S1 / S2 / S3

| 门禁 | 本 run 状态 |
|---|---|
| S1 答案块字数断言 (zh ≤60 全角字) | N/A — 本 run 无答案块/FAQ 批次, 零 src 改动 |
| S2 slug 存在性前置校验 | N/A — 本 run 无引用 slug 列表批次; 锚文本审计仅 grep 既有链接, 全部落有效路由 |
| S3 平台故障 ≥60min 上报 | 未观察到平台级故障 (web_fetch 全部 200/301 正常, 无 CF 503) |

---

## 11. matrix 回灌 (gsc_feedback_2026_09_15 block + 9/14 block 修正)

| 动作 | 详情 |
|---|---|
| 新增 block | `gsc_feedback_2026_09_15` — 15 键全落盘: version/run_at/cron/data_source/site_stats_28d/t1_locked_words_8_28d/zero_click_high_impression_28d/title_v4_audit_8_words_zh_hk/anchor_text_audit_8_words_zh_hk/brand_tracking/redirect_301_verification/t43_rich_results/priority_boost_changes/priority_boost_holds/s1_s2_s3_gates/calibration_day_check/verification_window_note |
| **修正 9/14 block** | `gsc_feedback_2026_09_14.anchor_text_audit_8_words_zh_hk` 由「仅 包裝盒印刷 达标, 其余 7 词 <3」→ **8/8 词 ≥3 达标** (grep 实证 2026-09-15), 附 correction 字段说明修正原因 (9/14 报告 §11 已声明但 matrix 未落盘) |
| last_updated_event | 更新为 2026-09-15 事件串 (含 9/14 block 锚审计修正说明) |
| priority_boost | 4 holds 维持 (Q-P1-01/02/03 + Q-P2-03), 无新增/移除 |
| P0 coverage | 95.45% 维持 |

---

## 12. git / 部署状态 (v9.4 §3-2 非阻断)

- **lane 内不运行 git** (pwsh 禁 + host-side 分工, 见 2026-09-15-wrapper-call-fix.md / lane-git-channel-fix.md)。
- 本 lane 改动 = `.hermes/industry-keyword-matrix.json` (新 block + 9/14 block 修正 + last_updated_event) + 本报告; wrapper 经 `scripts/lane-git-commit.py --lane gsc-feedback --include-matrix` commit + push (30min 保护, CF Pages build 以 check-runs 为准)。
- 报告落盘 = 本 lane 任务成功 (v9.4 §3-2); 不虚报 PASS。

---

## 13. 给下游建议

1. **9/17 干净对比窗 (首要)**: 8 T1 词 7d 周环比 (攻坚② 锚文本 + 攻坚① title v4 效果首判) + 智印港 40%+ 目标复核 + ジープリント 6 query 复测 + 即日印刷 (pos 9.1) 破零观察。
2. **PENDING_K3 (未替拍板)**: 貼紙印刷 63 / books 66 标题当量修剪裁决 (8/30 批冻结到期后) / GSC STALE 修法 (D-9/13-5) / tsc+5 回归修法 (D-9/13-1, 9/13 已知)。
3. **名片展示层 (a)/(b)/(c)**: §0.0 解禁块未拍板前维持现状 (greeting-cards 承接 301 不动); business-card 旧 URL 承接继续走贺卡。
4. **品牌**: 智印港 CTR 87.5% 保持全站最强信号, 但绝对命中少 → 9/17 复核后再决定是否加埋点; ジープリント 0 命中 → 30 目录建设持续推进 (§13.16.1)。
5. **301**: 11/11 PASS 维持; 无需新增动作, 季度抽查即可。

---

## 14. 撤回/更正声明 (§0.23)

- **更正 (matrix 落盘)**: `.hermes/industry-keyword-matrix.json` `gsc_feedback_2026_09_14` block 的 `anchor_text_audit_8_words_zh_hk` 原记录「仅 包裝盒印刷 达标 (5 ≥3), 其余 7 词 <3」为 **daily-content 9/14 补锚 (21 锚) 前状态**。9/14 报告 §11 已声明实证修正为 8/8, 但 matrix 当时未同步落盘 — 本 run (2026-09-15) 以 grep 实证 (src/data/blog-data/zh-hk.json, 8/8 词 ≥3 统一锚文本) 将该 block 修正为 8/8 并落盘, 附 correction 字段。原记录为历史快照, 不构成编造 (有 9/14 报告 §11 声明 + 9/14 daily-content 报告锚验收为证)。
- **本 run 无撤回项**: 无编造数字 (全部数字有来源, §0); 无 schema 改动; 无 src 改动。
- **校准声明**: GSC 数据 9/10 为最新真值 (~5d old vs 72h 门 → **STALE**); 本 run 所有 delta 仅作方向参考, **9/17 起为改版后首个干净对比窗**。
