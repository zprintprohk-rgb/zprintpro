# GSC Feedback Loop — 2026-09-14 (v9.4 rearm 执行轮 · 完整流程)

**Trigger**: deepseek harness 执行层, v9.4 cron rearm 执行轮 (K3 9/13 20:10 签发 `docs/2026-09-13-k3-directive-v94-cron-rearm-deepseek.md`; 本会话全流程执行, 无简化无延后)
**Run type**: gsc-feedback-loop 完整流程 (v9.3 任务 J 8 T1 锁定词追踪 + title v4 当量核查 + 锚文本审计 + 智印港/ジープリント 品牌监测 + 301 验证 + T43 观察 + matrix 回灌)
**Output**: `.hermes/industry-keyword-matrix.json` gsc_feedback_2026_09_14 block (本 run 复核 + 锚文本审计修正) + 本报告
**环境**: pwsh 工具在本 lane 沙箱被禁 (v9.4 §3-2) — 全程仅用文件工具 + web 工具; git commit/push 不可执行 = 非阻断警告, 报告落盘即任务成功

---

## 0. 数据来源 (SOP-10 第 3 款 / §0.23 数据诚信红线 — 必含)

```
数据来源:
- GSC 数据: GSC数据/gsc-fresh-2026-09-03.json (9/3 canonical, 28d 8/7-9/3)
- GSC 数据: GSC数据/index.json (lastBuild 2026-09-11T03:20+08:00, latestFreshData 2026-09-10, 123 files)
- GSC 解析: .hermes/hk28d-queries.json (9/10 xlsx 28d hk 解析, 窗口 8/14-9/10; 本 run 逐词复核 8 T1 词 imp/pos/clicks 一致)
- GSC 解析: .hermes/enja28d-queries.json (9/10 xlsx 28d en 116 / ja 56 解析; 品牌词 z print 复核)
- GSC 决策: .hermes/logs/2026-09-10-gsc-decision-data.md (9/10 18:51 产出, 全站口径 hk 247/10022/2.46%/26.6 · all 349/20323/1.72%/31.3, §七 品牌词追踪)
- GSC 基线: .hermes/logs/2026-09-08-gsc-feedback.md (9/8 7d 全站口径)
- K3 拍板: v9.3 任务 J (8 T1 锁定词, docs/2026-09-12-k3-directive-v93-home-fix-money-words.md) / docs/2026-09-09-k3-title-rule-v4-write-full.md (v4 写满 50-54 当量) / v9.4 rearm (docs/2026-09-13-k3-directive-v94-cron-rearm-deepseek.md) / §0.0 解禁块 (2026-09-12)
- 线上探针: web_fetch 2026-09-14 (本 run 复验: 旧 URL 301 链 ×3 + 新站落地页 200 + title ×6)
- 锚文本审计: grep src/data/blog-data/zh-hk.json (8 词精确锚文本 `>词</a>` 分布, 本 run 实证)
- 前序: .hermes/logs/2026-09-13-gsc-feedback.md + 2026-09-13-cron-rearm.md (试射轮) + 本 lane 早期 2026-09-14-gsc-feedback.md 草稿 (锚文本审计被本 run 实证修正)
```

---

## 1. SOP-10 5 问门禁 (§0.22 强制级)

| # | 问 | 本 run 答案 | 结论 |
|---|---|---|---|
| ① | **架构差异? 查前序 commit 路径** | 本 run 无 src/ 改动; 写入仅限 `.hermes/industry-keyword-matrix.json` + 本报告 (gsc-feedback cron 写权限仅限 .hermes/, 9/13 试射轮同路径实证)。前序 9/10 block (gsc_feedback_2026_09_10) 与本块同构, 无 X/Y 路径冲突。 | ✅ 无 src 差异 |
| ② | **约束适用范围? 查 K3 拍板原文** | 适用约束 = v9.3 任务 J (8 T1 锁定词追踪 + 攻坚①②) + §0.0 解禁块 (名片解禁仅接单层; 展示层 (a)/(b)/(c) 未拍板 → 不改 greeting-cards 资产、不改 middleware 301) + §13.1 gsc cron 范围 (智印港 CTR / ジープリント / 301 验证 / T43) + v9.4 rearm 执行纪律 (pwsh 禁, 报告落盘 = 成功)。K3 原文均已核。 | ✅ 范围正确 |
| ③ | **原数据/拍板来源? 不推断无来源数字** | 全部 8 词 imps/pos/clicks 来自 hk28d-queries.json (9/10 解析, 本 run 逐词 read 复核); 9/3 基线来自 gsc-fresh-2026-09-03.json (经 9/10 decision-data 转引); 智印港 CTR 来自 9/10 decision-data §七; 全站口径来自 9/10 decision-data §一; 无编造数字; 校准状态显式声明 (STALE, 见 §2)。 | ✅ 有来源 |
| ④ | **字段值策略? certNo/validUntil/issuer 全空** | 本 run 未触碰任何 schema/certNo 字段 (无 src 改动, 无 schema 编辑)。 | ✅ N/A |
| ⑤ | **Markdown 渲染? parseInlineLinks** | 本 run 只写 .hermes/ 下 JSON + Markdown 报告, 不新增 user-facing 渲染文本, 无 [text](url) 直渲染风险。 | ✅ N/A |

**门禁结论**: 5 问全过; 本 run 为纯数据复核 + 观察 + 回灌, 零 src 改动。

---

## 2. 校准状态 (v4 §5.1 / GSC 新鲜度门)

| 项 | 值 | 判定 |
|---|---|---|
| GSC index.json lastBuild | 2026-09-11T03:20+08:00 | — |
| latestFreshData | 2026-09-10 | 距 9/14 约 4 天 |
| 72h 新鲜度门 | 最新真值 9/10 (~4d old) | ⚠️ **STALE** (9/17 起首个干净对比窗) |
| 本 run 使用真值 | 9/10 解析 (hk28d/enja28d-queries.json) | 两窗方向可比, 不可精确周环比 |
| 校准日判定 | 9/14 非校准日 | 校准判定待 9/17 |
| 新数据动作 | 本 lane 无 GSC API 凭证 + pwsh 禁 → 无法拉新; 沿用 9/10 最新真值, 显式 STALE 声明 | 9/17 窗口由 K3/有凭证车道拉新 |

**窗口说明**: 9/3 canonical = 28d 8/7-9/3; 9/10 解析 = 28d 8/14-9/10。**9/17 是改版后首个干净对比窗** — 8/31-9/10 改动密集 (blog 层 9/1 be744435 / 9/3 5 Pillar / 9/5 1f6f85c5 / 9/8 f8c194a0 / 9/9 819f3189; SKU 层 9/2 54c675c0 / 9/6 4bf2c124 / 9/9 d5d1c240; PLP/PDP v9 9/5-9/10), 28d/7d 值均为混窗。本次 delta 仅作方向参考。

---

## 3. 全站口径核对 (9/10 真总量, 与 9/10 decision-data §一 一致, 本 run 复核)

| Locale | clicks | imps | CTR | wpos |
|---|---|---|---|---|
| hk | 247 | 10,022 | 2.46% | 26.6 |
| en | 19 | 3,925 | 0.48% | 43.6 |
| ja | 35 | 1,791 | 1.95% | 41.2 |
| **all** | **349** | **20,323** | **1.72%** | **31.3** |

对比 9/3 基线 (28d): all 349 clicks (+50) / 20,323 imps (+2,421) / 1.72% CTR / wpos 31.3 (-3.3) — 展示显著增长, 位置下滑, CTR 持平; 混窗方向参考。

---

## 4. v9.3 任务 J — 8 个 T1 锁词追踪 (hk 28d, 9/3 vs 9/10)

> 词级证据链: `.hermes/hk28d-queries.json` (9/10 xlsx 28d 解析, 窗口 8/14-9/10) — 本 run 逐词 read 复核与 matrix block 完全一致。

| # | 词 | 9/3 imp | 9/3 pos | 9/10 imp | 9/10 pos | Δpos | 9/10 clicks | 判定 |
|---|---|---|---|---|---|---|---|---|
| 1 | 包裝盒印刷 ⭐ | 68 | 38.19 | 69 | 36.6 | **+1.59** | 0 | 位置↑, 0 点击 |
| 2 | 紙盒印刷 ⭐ | 54 | 39.43 | 63 | 37.5 | **+1.93** | 0 | 位置↑ + 展示 +9 |
| 3 | 包裝盒訂製 | 64 | 29.39 | 64 | 30.6 | **-1.21** | 0 | 8 词唯一负向 |
| 4 | 貼紙印刷 | 133 | 35.14 | 153 | 31.2 | **+3.94** | 0 | 位置↑ + 展示 +20, 最大进步之一 |
| 5 | 宣傳單張 | 135 | 36.8 | 130 | 36.4 | **+0.4** | 0 | 基本持平 |
| 6 | 即日印刷 | 35 | 9.57 | 42 | 9.1 | **+0.47** | 0 | **速赢窗口 pos 9.1, 仍 0 点击** |
| 7 | 書刊印刷 | — | — | 16 | 39.7 | 新获 | 0 | 9/3 未收录, 9/10 新获可见性 |
| 8 | 騎馬釘 | 63 | 33.03 | 68 | 27.3 | **+5.73** | 0 | 8 词最大升幅, 0 点击 |

**verdict**: 7/8 词位置正向 (包裝盒訂製除外); 全部 0 点击。即日印刷 pos 9.1 = 唯一速赢窗口词 (5-15 区间)。9/17 干净窗后方可判定真实效果。

---

## 5. 攻坚① — title v4 写满核查 (半角当量 50-54)

> 方法: pwsh 阻塞无法跑 `scripts/title-audit-v4.mjs`, 按同公式 (CJK×2 + ASCII×1, per title-audit-v4.mjs L12 equiv) 手工核算; 线上 title 经 web_fetch 9/14 与 seo.ts/sku-seo-data/page.tsx 逐条核对一致。

| 词 | landing | title (线上实证 9/14) | equiv | 带区 |
|---|---|---|---|---|
| 包裝盒印刷/紙盒印刷/包裝盒訂製 | /zh-hk/category/packaging/ | 紙質食品包裝盒印刷 100個起 \| 食品紙盒/紙袋 \| 智印港 | 51 | ✅ OK |
| 貼紙印刷 | /zh-hk/category/stickers/ | small batch 貼紙印刷 防水抗UV・1張起印・異形裁切・燙金 \| 智印港 | 63 | >60 待修剪 (8/30 批冻结, 挂账) |
| 宣傳單張 | /zh-hk/category/flyers/ | A5 宣傳單張印刷 100張起・A4/A5/A3 雙面 \| HK$0.18 起 \| 智印港 | 60 | 55-60 遗留只读 (8/30 批冻结) |
| 即日印刷 | /zh-hk/services/rush-printing-delivery/ | 即日印刷 18:00 截單・順豐翌日 12:00 前送達 \| 智印港 | 51 | ✅ OK |
| 書刊印刷/騎馬釘 | /zh-hk/category/books/ | 騎馬釘小冊子印刷 50本起 \| 騎馬釘 + 膠裝 + 精裝 + 教材繪本 \| 智印港 | 66 | >60 待修剪 (8/30 批冻结, 挂账) |
| 騎馬釘 (SKU) | /zh-hk/product/saddle-stitch-booklets/ | 騎馬釘小冊子 覆膜・騎馬釘・100起印・HK$6起 \| 智印港 | 53 | ✅ OK |

**verdict**: 落地标题 4/6 组 OK (51/51/51/53); 貼紙印刷 63 与 books 66 超 60 待修剪但属 8/30 批冻结, 只观察不改 (红线: 不回滚已部署 title)。**本 run 不改任何 title。**

---

## 6. 攻坚② — 全站内链锚文本统一审计 (grep 实证修正)

> 规则: 每词 ≥3 正文内链使用统一锚文本 (grep 一致性验收)。本 run 以精确模式 `>词</a>` 对 `src/data/blog-data/zh-hk.json` 全量 grep。

| 词 | 锚文本命中行 | 精确计数 | ≥3? |
|---|---|---|---|
| 包裝盒印刷 | 32 / 64 / 140 / 143 / 304 | 5 | ✅ |
| 紙盒印刷 | 104 / 151 / 669 | 3 | ✅ |
| 包裝盒訂製 | 130×2 / 151 | 3 | ✅ |
| 貼紙印刷 | 48 / 56 / 288 / 304 | 4 | ✅ |
| 宣傳單張 | 378 / 445 / 470 | 3 | ✅ |
| 即日印刷 | 445 / 542 / 611 | 3 | ✅ (统一指向 /zh-hk/services/rush-printing-delivery/) |
| 書刊印刷 | 486 / 504 / 514 | 3 | ✅ |
| 騎馬釘 | 224 / 504 / 514 | 3 | ✅ (统一指向 /zh-hk/category/books/) |

**verdict**: **8/8 词 ≥3 统一锚文本达标** — daily-content 9/14 已补 21 锚 (7 词 × 3), 攻坚② 数据层完成, 无需再补。9/17 干净窗看 CTR 效果。

> **修正声明**: 本 lane 早期 2026-09-14 草稿记录「仅 包裝盒印刷 达标, 其余 7 词 <3」为 daily-content 补锚前状态; 本 run 复核 grep 实证修正为 8/8 达标 (matrix gsc_feedback_2026_09_14 block 已同步修正)。L143 早期记录的 typo「傳單印刷印刷」grep 0 残留 — 已被 daily-content 9/14 修复, 不再挂账。

---

## 7. 品牌词追踪 (智印港 / ジープリント / z print)

| 品牌词 | 窗口 | clicks | imps | CTR | pos | 判定 |
|---|---|---|---|---|---|---|
| 智印港 | 9/3 28d all | 10 | 14 | 71.4% | 1.29 | ✅ 远超 40% 目标 |
| 智印港 | 9/3 28d hk | 9 | 10 | 90.0% | 1.4 | ✅ |
| 智印港 | 9/3 7d hk | 4 | 4 | 100% | 1.25 | ✅ |
| 智印港 | 9/10 28d hk | 7 | 8 | 87.5% | 1.5 | ✅ 维持达标 (样本小) |
| ジープリント | 9/10 28d | — | 0 命中 | — | — | ⚠️ 未达 8/12 期望 ≥1 |
| z print (en) | 9/3 28d all | 2 | 16 | 12.5% | 8.88 | — |
| z print (en) | 9/10 28d en | 0 | 11 | 0% | 15.1 | 位置↓, 仍有少量展示 |

**verdict**: 智印港 CTR 87.5-100% 远超 4 周 40%+ 目标 ✅, 但命中条数少 (7-10 clicks/窗) → 品牌认知仍弱, 继续监测; ジープリント 0 命中未达期望, 维持埋点 + 目录建设; z print en 品牌词展示 11 imp, 位置降至 15.1。

---

## 8. 301 承接验证 (z-printpro.com 旧 URL → 新站 200)

> 方法: web_fetch 旧 URL — cross-origin redirect 报错 = 301 链证据 (重定向目标 = zprintpro.com); 目标 URL 直取 HTTP 200。本 run 复验 3 条旧 URL + 6 条落地页。

| 类型 | URL | 结果 |
|---|---|---|
| 旧 URL | z-printpro.com/products/packaging-box-printing/ | ✅ 301 → zprintpro.com |
| 旧 URL | z-printpro.com/label-sticker-printing/waterproof-round-sticker-printing-outdoor-vehicle.html | ✅ 301 → zprintpro.com |
| 旧 URL | z-printpro.com/enterprise-brochure-printing/a5-saddle-stitched-booklet-printing.html | ✅ 301 → zprintpro.com |
| 落地页 | zprintpro.com/zh-hk/category/packaging/ | ✅ HTTP 200, title 与 §5 一致 |
| 落地页 | zprintpro.com/zh-hk/category/stickers/ | ✅ HTTP 200 |
| 落地页 | zprintpro.com/zh-hk/category/flyers/ | ✅ HTTP 200 |
| 落地页 | zprintpro.com/zh-hk/category/books/ | ✅ HTTP 200 |
| 落地页 | zprintpro.com/zh-hk/services/rush-printing-delivery/ | ✅ HTTP 200 |
| 落地页 | zprintpro.com/zh-hk/product/saddle-stitch-booklets/ | ✅ HTTP 200 |

**verdict**: 本 run 9/9 PASS; 叠加 9/14 早期 11 样本 (5 旧 URL + 6 新 URL) — 301 承接健康, 异常 #8 (business-card 直接 200) / #9 (about-us 404) 已消失; catch-all 落点 = 设计行为非异常。

---

## 9. T43 rich results 观察 (禁盲改 schema)

- FAQPage/Product/Article JSON-LD 16 类目 × 3 locale + PDP + blog 全部在线 (9/10 title-audit 探针确认 + 本 run 落地页 200 佐证)。
- **本 run 无任何 schema 改动**, 仅观察; rich results 是 GSC 观察项, 9/17 窗口看 rich result 展示变化。

---

## 10. v9.3 新门禁 S1 / S2 / S3

| 门禁 | 本 run 判定 |
|---|---|
| **S1 答案块字数断言** (40-60 全角字, 硬上限 ≤60) | 本 run 未触碰答案块/FAQ 卡 (零 src 改动), N/A; 既有 3 品类超标 (red-packets 116 / educational 254 / japan-doujin 128) 仍挂账, 待有 src 权限车道处理 |
| **S2 slug 存在性前置校验** | 本 run 不引用 slug 列表 (零数据层 links 改动), N/A; 7 个已下线 blog slug 已由 daily-content 9/14 清, 无新增挂账 |
| **S3 平台故障上报阈** (≥60min 必上报) | 本 run 观察期未见 CF Pages 503 / CDN 大面积异常 / 部署卡死 (落地页全部 200), N/A |

---

## 11. matrix 回灌 (gsc_feedback_2026_09_14 block)

- **priority_boost 变更**: 无 (0 项) — 当前 4 holds 均已 covered, 无新 orphan 达阈。
- **priority_boost holds 维持 (4)**: Q-P1-01 retail-poster-printing-guide (+2, 海報印刷 161imp/pos25.1) / Q-P1-02 restaurant-menu-printing-guide (+3, 餐牌印刷 65imp/pos14.3) / Q-P1-03 lai-see-packet-printing-guide (+2, 利是封印刷 70imp/pos29.5) / Q-P2-03 doujin-circle-printing-guide (+2, doujinshi printing 31imp/pos18.2)。
- **本 run 复核**: matrix block 数据与 hk28d/enja28d 解析逐词一致; **锚文本审计已实证修正为 8/8 达标** (§6); `last_updated_event` 已更新。
- **zero_click_high_impression 观察**: hk 28d 头部 10 词全 0 点击 (海報印刷 161 / 貼紙印刷 153 / 食品包裝印刷 145 / 宣傳單張 130 / 宣傳單張印刷 129 / 月曆印刷 132(1 click) / 包裝盒印刷 69 / 騎馬釘 68 / 餐牌印刷 65(1 click) / 書刊印刷 16) — 即日印刷 42imp/pos9.1 为唯一速赢窗口词。
- **calibration_day_check**: 9/14 非校准日; 9/17 = 改版后首个干净对比窗 (8 T1 词 7d 周环比 + 智印港 40%+ 目标复核 + ジープリント 6 query 复测)。

---

## 12. git / 部署状态 (v9.4 §3-2 非阻断)

| 项 | 状态 |
|---|---|
| git commit | ❌ 无法执行 — pwsh 沙箱被禁 (v9.4 §3-2), 无 shell 通道; 改动 = 1 个 .hermes/ JSON + 本报告 |
| git push | ❌ 同上, 不可执行 |
| verify-deploy | ❌ 不可执行 (需 pwsh/node) |
| 线上部署 | 无需部署 (零 src 改动) |
| 任务判定 | ✅ **报告落盘 = 任务成功** (per v9.4 §3-2 非阻断口径) |

---

## 13. 给下游建议

**daily-content (今日/明日)**:
1. ~~攻坚② 补锚~~ — **已完成** (9/14 补 21 锚, 8/8 词 ≥3, 本 run grep 实证), 不再重复。
2. 即日印刷 pos 9.1 速赢窗口 0 点击: 建议检查 rush 页 meta description / 首页「即日印刷」区块文案吸引力 (不做 schema 改动)。
3. 貼紙印刷 153imp/pos31.2 0 点击: 9/17 干净窗后评估该词 landing 卡点。

**weekly-meta (周五 23:07)**:
1. 8 T1 词 9/17 干净窗首轮判定 (7d 周环比 + CTR), 重点: 貼紙印刷 (+3.94) / 騎馬釘 (+5.73) 是否转化为点击。
2. 智印港 CTR 40%+ 目标复核 (9/10 87.5% 达标, 但样本小)。
3. 貼紙印刷 title 63 当量 / books 66 当量: 9/17 后评估是否进入修剪队列 (冻结批窗口判定后)。
4. ジープリント branded search 0 命中: 复测 6 query。

**monthly-matrix (9/17 校准日)**:
1. 拉新 GSC 数据 (7d 窗口对齐 9/17) + 同口径导出, 结束 STALE 状态。
2. 8 T1 词 + 智印港 CTR + ジープリント 三线首判。

---

## 14. 撤回/更正声明 (§0.23)

- **更正**: 本 lane 早期 2026-09-14 草稿 (matrix gsc_feedback_2026_09_14 block 原始版本) 记录「锚文本审计: 仅包裝盒印刷达标, 其余 7 词 <3」 — 该记录为 daily-content 补锚 (9/14) 前状态, **经本 run grep 实证修正为 8/8 词 ≥3 达标**; L143 typo「傳單印刷印刷」早期记录为待修, **已由 daily-content 9/14 修复 (grep 0 残留)**。修正日期: 2026-09-14。
- 无数字撤回 (本 run 全部数字经 hk28d/enja28d 解析逐词复核 + 9/10 decision-data 转引, 有来源)。

---

Generated by deepseek harness (dsh headless executor) · 2026-09-14 (v9.4 rearm 执行轮 · 完整流程) · F:\zprintpro-nextjs
