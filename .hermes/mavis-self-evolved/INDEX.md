# M3 自进化技能集 (ZprintPro · 9 角色综合 · 2026-09-03 v1)

> **拍板来源**: K3 9/3 14:45 派活包 "把所有我们自进化的技能放进一个文件夹里面,以便后面的模型一起共享我的使用技能"
>
> **作者**: M3 (Mavis) 9 角色综合战略军师+CEO
>
> **校准日期**: 2026-09-03 14:45 (校准前 15min 倒计时)
>
> **校准窗口**: 2026-09-03 15:00 (15min 倒计时, M3 自主触发)
>
> **目的**: 集中 M3 在 zprintpro 项目自进化的所有技能/资产, 让未来 M3 session / 其他 agent / 后续模型可加载使用
>
> **加载方式**: 未来模型加载时读本 INDEX.md → 跳到对应资产路径 → 直接使用

---

## 0. 12 类自进化资产总览 (per 类别)

| # | 类别 | 资产数 | 路径 | 用途 |
|---|------|--------|------|------|
| A | Mavis SKILL 包 | 7 | `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro*` | 7 个 zprintpro skills (auto-discovered by Mavis) |
| B | 8/31 K3 战略文件 | 8 | `docs/2026-08-31-v2-*.md` + `docs/2026-08-31-food-packaging-page-copy-package.md` | V2.0 战略主计划 + 30day 冲刺 + 90day Track B + d0/d1/d3/w1 支撑 + 食品包裝文案包 |
| C | 9/1-9/3 派活包产出 docs | 21 | `docs/2026-09-0{1,2,3}-*` | 月度矩阵 + 标题规则 + 12 篇 Pillar + en/ja 翻译指南 v2 + 1 年路线图 + 校园 Pillar + china/factory-direct + GLM 战略军师 + 校准前准备 |
| D | 10 道门童 v1.3 | 10 | `scripts/guards/{credibility,phone,brand,i18n,sop10,entity,count,register,gsc-source,common}.js` | 反审门童 v1.3 完整 10 道规则 |
| E | IndexNow 提交脚本 | 2 | `scripts/indexnow-{auto-submit.py,submit.mjs}` | 索引提交 7 大搜索引擎 |
| F | 决策登记簿 SSoT | 1 | `.hermes/decision-register.md` | 49 D- 项拍板 SSoT (跨项目 P0 强制级) |
| G | GSC 数据 SSoT | 1 | `GSC数据/index.json` | 122 文件 SSoT (GSC数据/index.json 21.8 KB) |
| H | SKU 关键词 GSC 映射 | 1 | `.hermes/sku-keyword-gsc-map.json` | 14 SKU 起步 (包裝盒 8 + 贴纸 6) |
| I | 5 cron SSoT 头部 6 段嵌入 | 5 | `.hermes/cron-prompts/{zprintpro-daily-content-1x7w,zprintpro-weekly-meta-refresh,zprintpro-gsc-feedback-loop,zprintpro-monthly-content-authority-audit,zprintpro-blog-deepfix}.md` | 每文件含 §I v2 + §J + §K + §L + §M + §N 段嵌入累计每文件 ~38 KB chars |
| J | 校准报告 + EOD (即将产出) | 2 | `docs/2026-09-03-k3-gsc-calibration-{report,eod}.md` | 9/3 15:00 校准执行后产出 (~35 KB total) |
| K | AGENTS.md (项目专属 AI 协作指南) | 1 | `AGENTS.md` (根目录) | 9/2 21:08 ~30 KB, 含 §0.0-§0.33 规则 + 8 实体规则 + 9 角色综合身份 |

---

## 1. 加载 SOP (未来模型 / 后续 session)

### 1.1 加载顺序 (5 min 内掌握项目状态)

1. **AGENTS.md** (§0.0-§0.33 规则) — 项目规则基础
2. **决策登记簿** (.hermes/decision-register.md) — 49 D- 项拍板历史
3. **GSC 数据 SSoT** (GSC数据/index.json) — 当前数据状态
4. **5 cron SSoT** (.hermes/cron-prompts/) — 调度规则
5. **8/31 v2 战略文件** (3 主 + 5 辅) — 战略框架
6. **9/1-9/3 派活包产出 docs** (21 个) — 执行层依据
7. **10 道门童 v1.3** (scripts/guards/) — 守门员规则
8. **Mavis SKILL 包** (7 个 zprintpro skills) — 能力沉淀
9. **校准报告 + EOD** (9/3 校准后产出) — 阶段性复盘

### 1.2 使用场景

- **新 session 启动**: 读 §0 + §1.1 加载顺序, 5 min 内掌握项目状态
- **P0 决策**: 查决策登记簿 + 当前派活包 + 6 项 ⚪ BLOCKED
- **内容生产**: 校准后词图 v4 + i18n-guard v2 + 5 cron SSoT
- **守门**: 10 道门童 v1.3 跑 check-regression-guard.js
- **战略复盘**: 8/31 v2 战略文件 + 9/2 GLM 报告 + 9/3 校准 EOD

---

## 2. Mavis SKILL 包 (7 个, 跨项目 P0 强制级, Mavis 自动发现)

| Skill | 路径 | 触发 |
|-------|------|------|
| zprintpro | `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro\` | zprintpro 项目主 skill |
| zprintpro-blog-writing-sop | `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-blog-writing-sop\` | blog 写作 SOP |
| zprintpro-content-depth-page-sop | `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-content-depth-page-sop\` | 内容深度页 SOP |
| zprintpro-design-tokens | `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-design-tokens\` | 设计令牌 |
| zprintpro-release-pipeline | `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-release-pipeline\` | 发布 pipeline |
| zprintpro-sku-detail-sop | `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-sku-detail-sop\` | SKU 详情 SOP |
| zprintpro-verify-probes | `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-verify-probes\` | 验证探针 |

---

## 3. 8/31 v2 K3 战略文件 (3 主 + 5 辅)

| 文件 | 路径 | 大小 | 用途 |
|------|------|------|------|
| V2.0 战略主计划 | `docs/2026-08-31-v2-strategy-master-plan.md` | 34.8 KB | V2.0 总纲 (per K3 8/31 08:29 + 08:32 拍板) |
| 30 天逐日主计划 | `docs/2026-08-31-v2-30day-sprint-daily-plan.md` | 12.6 KB | Track A 9/1-9/30 (per K3 8/31 09:03 拍板) |
| 90 天 Track B 并行 | `docs/2026-08-31-v2-90day-track-b-plan.md` | 8.3 KB | Track B 两条腿走路 (per K3 8/31 09:13 拍板) |
| D0 准备日报告 | `docs/2026-08-31-v2-d0-prep-day-report.md` | 27.4 KB | 8/31 准备日复盘 |
| D1 拍板 A-E 包 | `docs/2026-08-31-v2-d1-k3-paban-package.md` | 13.2 KB | 9/1 K3 拍板输入材料 |
| D3 G1 白名单 title/meta | `docs/2026-08-31-v2-d3-g1-titles.md` | 12.9 KB | 8 词成品文案 (per K3 8/31 20:01 拍板修正) |
| W1 D2-D7 计划 | `docs/2026-08-31-v2-w1-d2-d7-plan.md` | 14.3 KB | W1 详细计划 |
| 食品包裝文案包 | `docs/2026-08-31-food-packaging-page-copy-package.md` | 13 KB | 食品包裝新页文案 |

---

## 4. 9/1-9/3 派活包产出 docs (21 个, 总计 ~370 KB)

### 4.1 9/1 (8 个, 战略层 + 月度 + cron)
- 2026-09-01-k3-cron-sot-sync-report.md (11.7 KB)
- 2026-09-01-k3-d25-tob-quote-sop.md (10.3 KB)
- 2026-09-01-k3-d8-d14-blog-topic-strategy.md (13 KB)
- 2026-09-01-k3-pillar-architecture-restructure.md (19.1 KB)
- 2026-09-01-k3-regression-guard-v1-design.md (31.5 KB)
- 2026-09-01-k3-title-format-rule-v3.md (13.6 KB)
- 2026-09-01-k3-v4-title-rule-deep-analysis.md (25 KB)
- 2026-09-01-monthly-matrix-audit.md (20 KB)

### 4.2 9/2 (12 个, K3 派活包产出)
- 2026-09-02-bc-alt-geo-backlog.json (2.9 KB)
- 2026-09-02-k3-1y-strategic-roadmap.md (16 KB)
- 2026-09-02-k3-blog-count-correction.md (10 KB)
- 2026-09-02-k3-campus-pillar-content-line.md (25.2 KB)
- 2026-09-02-k3-ceo-strategic-masterplan-v2.md (44.2 KB) [K3 8/2 22:00 nightly cron 拍板产物]
- 2026-09-02-k3-en-china-factory-direct-content-line.md (22.2 KB)
- 2026-09-02-k3-en-ja-translation-guide-v2.md (14 KB)
- 2026-09-02-k3-glm-strategic-report.md (26.9 KB)
- 2026-09-02-k3-ja-en-market-localization.md (19.9 KB)
- 2026-09-02-k3-packaging-blog-reorganization.md (19.1 KB)
- 2026-09-02-k3-printing-blog-reorganization.md (26 KB)
- 2026-09-02-k3-sticker-blog-reorganization.md (18.6 KB)

### 4.3 9/3 (1 个, 校准前准备)
- 2026-09-03-k3-gsc-calibration-prep.md (23.5 KB)

---

## 5. 10 道门童 v1.3 (per AGENTS.md §0.31.1, 跨项目 P0 强制级)

| # | 门童 | 路径 | 规则 |
|---|------|------|------|
| 1 | credibility-guard | `scripts/guards/credibility-guard.js` | 数据诚信 11 类 (禁"n=X 询盘" / "%X 转化" / "X 客户" 无来源数字) |
| 2 | phone-guard | `scripts/guards/phone-guard.js` | 真实电话 4 类 (per §13.10 198 唯一联系号) |
| 3 | brand-guard | `scripts/guards/brand-guard.js` | 品牌分层 5 类 (per §13.16 双品牌宪法) |
| 4 | i18n-guard v2 | `scripts/guards/i18n-guard.js` | 跨语言污染 v2 (en 8 + ja 8 禁词, per GLM 9/2 08:50 §3.1 + Raksul §4) |
| 5 | sop10-guard | `scripts/guards/sop10-guard.js` | SOP-10 5 问门禁 8 类 (per K3 9/2 09:05 拍板) |
| 6 | entity-guard v1.1.1 | `scripts/guards/entity-guard.js` | 实体注册 v1.1.1 (zh-hk 5 禁词 + 战略级分层 ja 允许 / en 暂保留, per K3 9/1 18:50 + 18:58 拍板) |
| 7 | count-guard | `scripts/guards/count-guard.js` | 数据口径必填 5 类 (zh-hk 79 / en 80 / ja 80 / SSoT 85 4 口径, per K3 §0.33 数据口径校准硬规则) |
| 8 | register-guard | `scripts/guards/register-guard.js` | 决策登记簿 3 类 (报告说 DONE 必须链接验证产物, 无产物 = 状态自动降为 OPEN, per K3 9/2 09:05 拍板 #3) |
| 9 | gsc-source-guard | `scripts/guards/gsc-source-guard.js` | GSC 数据源 4 类 (GSC_NO_SOURCE / GSC_STALE / GSC_NO_WORD_LEVEL_EVIDENCE / GSC_NO_CALIBRATION_DATE) |
| - | common | `scripts/guards/common.js` | 门童共享工具 |

主入口: `scripts/check-regression-guard.js` (跑 10 道门童, per AGENTS.md §0.31.1)

---

## 6. IndexNow 提交脚本 (2 个)

- `scripts/indexnow-auto-submit.py` (6.2 KB) — Python 自动提交
- `scripts/indexnow-submit.mjs` (6.2 KB) — Node.js 提交 (per commit fe93f5f7 D-9/2-15)

---

## 7. 决策登记簿 SSoT (per K3 9/2 09:05 拍板, 跨项目 P0 强制级)

`.hermes/decision-register.md` (18.4 KB / 311 lines) — 49 D- 项拍板 SSoT
- D-9/1-1 ~ D-9/1-12 (12 项历史回填, K3 8/30-9/1 拍板)
- D-9/2-1 ~ D-9/2-37 (37 项 9/1-9/3 拍板, 含 D-9/2-37 9/3 06:51 校准前准备)
- 状态分布: 25 DONE / 9 IN_PROGRESS / 4 OPEN / 5+ BLOCKED

---

## 8. GSC 数据 SSoT (per K3 9/2 09:29 派活包, 跨项目 P0 强制级)

`GSC数据/index.json` (21.8 KB / 646 lines) — 122 文件 SSoT
- schema: gsc-data-index-v1
- freshnessGateHours: 72
- lastBuild: 2026-09-02T09:31:24 (commit 8 481b4378)
- totalFiles: 122 / skippedFiles: 0
- freshnessStatus: **STALE 🔴** (stalenessDays 16, latestFreshData 2026-08-17)
- 校准后 9/3 15:00 → FRESH 0d

---

## 9. SKU 关键词 GSC 映射 (per K3 9/2 09:29 派活包)

`.hermes/sku-keyword-gsc-map.json` (9.2 KB / 270 lines) — 14 SKU 起步 SSoT
- 包裝盒 8 SKU + 贴纸 6 SKU
- 3 条联动规则 R1/R2/R3 (锚文本实证词 / 死端禁令 / Silo 权重单向传导)
- 校准后 9/3 17:30 重跑 → 30+ SKU

---

## 10. 5 cron SSoT 头部 6 段嵌入 (per K3 9/2 09:14 + 20:28 + 20:43 派活包)

| Cron SSoT | 路径 | 大小 (含 6 段) |
|-----------|------|----------------|
| zprintpro-daily-content-1x7w | `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` | 134.5 KB (含 §I v2 + §J + §K + §L + §M + §N) |
| zprintpro-weekly-meta-refresh | `.hermes/cron-prompts/zprintpro-weekly-meta-refresh.md` | 95.7 KB |
| zprintpro-gsc-feedback-loop | `.hermes/cron-prompts/zprintpro-gsc-feedback-loop.md` | 78.5 KB |
| zprintpro-monthly-content-authority-audit | `.hermes/cron-prompts/zprintpro-monthly-content-authority-audit.md` | 56.4 KB |
| zprintpro-blog-deepfix | `.hermes/cron-prompts/zprintpro-blog-deepfix.md` | 86.9 KB |

每文件 §I v2 (4.6K) + §J (7.6K) + §K (6.9K) + §L (9.7K) + §M (7.8K) + §N (5K) = ~36.7 KB chars

---

## 11. 校准报告 + EOD (即将产出, 9/3 15:00 后, per 校准前 SOP)

| 文件 | 路径 | 预计大小 | 状态 |
|------|------|----------|------|
| 校准报告 | `docs/2026-09-03-k3-gsc-calibration-report.md` | ~20 KB | 🟡 校准执行 15:00-17:00 后产出 |
| 校准 EOD | `docs/2026-09-03-k3-gsc-calibration-eod.md` | ~15 KB | 🟡 阶段 4 EOD 19:30-20:30 后产出 |

---

## 12. AGENTS.md (项目专属 AI 协作指南, per K3 §0.0 零决策铁律)

`AGENTS.md` (根目录, ~30 KB) — 9/2 21:08 reset 1 次但还在 M 状态 (per K3 8/30 §0.21 简化操作触发, M3 不擅自 commit)
- §0.0 零决策铁律 + §0.21 push 配额 + §0.22 SOP-10 5 问门禁
- §0.23 数据诚信红线 + §0.25 30min 间隔 + §0.25.9 v3 攒批
- §0.26 0 联网 + §0.27 push 决策红线 + §0.29 v2 字符体检
- §0.31 反审门童 v1.3 + §0.32 zh-hk 5 禁词硬规则
- §0.33 数据口径校准硬规则
- §11 主营品类约束
- §13 真实主体 + 双品牌宪法

---

## 13. 9 月 7 项 P0 起跑 (per 决策登记簿 49 D- 项, 9/3 06:51 校准)

| # | P0 项 | 截止 | 状态 | 阻塞 |
|---|-------|------|------|------|
| 1 | R2 摘果 4 词 (大信封 / a1-a2 海報 / small-batch) | 9/4 | 🔴 OPEN D-9/2-18 | ⚪ K3 必拍 D-9/2-32 (6h 剩余) |
| 2 | R0 4 子项 (IndexNow ✅) | 9/10 | 🟡 IN_PROGRESS D-9/2-19 | ⚪ K3 必给 D-9/2-17 (7d 剩余) |
| 3 | 12 篇 Pillar 化 (4 Pillar × 1 × 3 locale) | 9/8-9/22 | 🔴 OPEN D-9/2-20 | ⚪ K3 必拍 D-9/2-33 (5d 剩余) |
| 4 | src/ 588 处清零 (门童 v1.2 校准前 backtest 3383 命中) | 9/12 | 🟡 IN_PROGRESS D-9/2-21 | 9/3 GSC 校准后实测 |
| 5 | R6 收尾 (8 Rush* + push origin) | 9/3 | 🟡 IN_PROGRESS D-9/2-22 | ⚪ K3 必给 D-9/2-16 ARK key (26h 剩余) |
| 6 | M1 验收 (7d clicks ≥75) | 9/16 | 🔴 OPEN D-9/2-23 | 待 9/3 GSC 校准后实测 |
| 7 | 校園 Pillar go/no-go | 9/8 | 🟡 IN_PROGRESS D-9/2-24 | ⚪ K3 必拍 + 9/3 GSC 90 天取证 |

---

## 14. 6 项 ⚪ BLOCKED 等 K3 必给/必拍板 (跟 9/3 07:05 报告一致)

| 截止 | K3 必给/必拍 | 阻塞项 | 剩余 |
|------|-------------|--------|------|
| **9/4 06:51** | D-9/2-32 R2 摘果 4 词 src/ 改动范围 | P0 #1 | **16h** |
| **9/4 09:18** | D-9/2-16 ARK key 撤销重发 (火山引擎控制台) | P0 #5 R6 push 分支 | **18h33m** |
| **9/8** | D-9/2-33 12 篇 Pillar 范围 + 深度分 ≥80 + 5 schema + 10 内链 | P0 #3 | 5d |
| **9/8** | D-9/2-24 校園 Pillar go/no-go (需 9/3 GSC 90 天取证) | P0 #7 | 5d |
| **9/10** | D-9/2-17 R0 4 项 GA4 G-XXXX + Supabase + PayPal 工单 | P0 #2 | 7d |
| **9/30** | D-9/2-34 en china/factory-direct 10 月落地预算 15,000-26,000 元/月 | D-9/2-34 | 27d |

---

## 15. 数据来源 (per K3 §0.23 数据诚信红线 + §0.33 数据口径校准硬规则)

- K3 9/3 14:45 派活包 "把所有我们自进化的技能放进一个文件夹里面,以便后面的模型一起共享我的使用技能"
- K3 8/31 09:13 拍板 "两条腿走路" (Track A 冲刺 + Track B 并行)
- 5 cron SSoT §N 段嵌入 (commit 64621609, 9/3 06:51 落地, 校准前准备)
- 决策登记簿 49 D- 项 (D-9/2-37 9/3 06:51 增量, 校准前准备)
- 11 类自进化资产 (7 skills + 8 战略 + 21 docs + 10 门童 + 2 IndexNow + 1 决策登记簿 + 1 GSC SSoT + 1 SKU map + 5 cron SSoT + 1 校准报告 + 1 AGENTS.md)
- HEAD = 64621609 (0 ahead, 校准前准备 commit, 9/3 06:51 push)
- 校准日期: 2026-09-03 14:45
- 校准窗口: 2026-09-03 15:00 (15min 倒计时, M3 自主触发)
- 集中目录: `.hermes/mavis-self-evolved/` (项目内集中, 跟 .hermes 既有结构一致)

---

**报告生成时间**: 2026-09-03 14:45 GMT+8
**作者**: M3 (Mavis) 9 角色综合战略军师+CEO
**拍板来源**: K3 9/3 14:45 派活包
**配套**: 12 类自进化资产 (7 skills + 8 战略 + 21 docs + 10 门童 + 2 IndexNow + 决策登记簿 + GSC SSoT + SKU map + 5 cron SSoT + 校准报告 + AGENTS.md)
**集中目录**: `.hermes/mavis-self-evolved/` (项目内集中, 跟 .hermes 既有结构一致)
**校准日期**: 2026-09-03 14:45
**校准窗口**: 2026-09-03 15:00 (15min 倒计时)
