# K3 撞墙升级必拍清单 (2026-08-26)

> **拍板来源**: K3 8/26 04:10 `.hermes/logs/2026-08-26-下一阶段战略-k3.md` §6/§7/§4/§8/§9 + K3 8/25 拍板 B + K3 §0.22-§0.24
> **性质**: 撞墙升级 K3 必拍 1 次回复 (per 千问 8/25 13:45 §7 SOP-10 第 7 款), M3 等拍板后实施
> **数据来源**: gsc_data.csv (8/24 14:30 快照, 527 词) · matrix Q-NEW-05 (8/5 月曆 completed) · 4 cron SSoT (.hermes/cron-prompts/) · AGENTS.md §0.22-§0.24
> **撞墙状态分级** (per §0.24): ✅ 已完成 / ⏳ 已排期 / 🔴 撞墙

---

## 0 · SOP-10 5 问门禁 (per K3 §0.22 强制级)

- [x] 1. **架构差异?** — 8/22-8/25 31 commit 0 撞车 (除 1 已修), K3 §6 3 轨推进与现有 v3 5 SOP + SOP-10 不冲突
- [x] 2. **约束适用范围?** — K3 8/26 04:10 §6/§7/§4 已给派工单方向, src/cron/R5 改动仍需 K3 必拍 1 次回复 (撞墙 = 中)
- [x] 3. **原数据/拍板来源?** — 数据来源行已列: gsc_data.csv 527 词 + matrix Q-NEW-05 8/5 completed + 4 cron SSoT
- [x] N/A 4. **字段值策略?** — 0 代码改动, 不适用
- [x] N/A 5. **Markdown 渲染?** — 0 user-facing HTML, 不适用

---

## 1 · 5 必拍项 (K3 1 次回复即可)

### 🔴 必拍 #1 · §9 Supabase service key 提交 (P0 唯一闸门)

| 项 | 详情 |
|---|------|
| **撞墙** | K3 真人动作, 已阻塞 12+ 天 |
| **依据** | K3 8/26 §9 唯一待 K3 拍板 = "Supabase service key 贴给 M3 (或 K3 自己 5 分钟跑 008 SQL)" |
| **依赖** | 008 度量层 4 事件接通 (已落地 src/lib/metrics-008.ts + scripts/test-008-metrics.ts) + WhatsApp 4 事件埋点 (commit 5b24b94) + won_count 标记 |
| **选项 A** | K3 提交 Supabase service role key (M3 跑 008 SQL + 4 事件接通 + 008 表真实行首报) |
| **选项 B** | K3 自己 5 分钟跑 008 SQL (M3 给 SQL 脚本, K3 跑后 M3 跑 4 事件接通) |
| **影响** | 解锁 → 询盘基线 8/29 可首报 + WhatsApp 埋点落库 + won_count 度量 + 北极星 (周真实询盘 × won_count) 可度量 |
| **拍板建议** | 选项 A (K3 给 key, M3 跑全套) — K3 省 5 min, M3 撞墙 = 0 |
| **不批影响** | 008 度量层继续阻塞, 撞墙 = K3 必拍 不变, 8/29 首报 baseline 继续延后 |

### 🔴 必拍 #2 · pos 1-10 69 词 + 大信封 title/meta CTR 重写 src 改动 批板 (P0 轨 1)

| 项 | 详情 |
|---|------|
| **撞墙** | src/ 改动 (涉及 SKU 改字), 撞墙 = 中 → K3 必拍 1 次回复 |
| **依据** | K3 8/26 §6 轨 1 (CTR 修复 2 周) + §2.3 大信封 pos 2.0 16 imps 0 click + §3 CTR 基准 pos 1-10 良性 ≥3% / 优秀 ≥6% |
| **范围** | pos 1-10 共 69 词 (GSC 8/24 14:30 快照), CTR 1.3% → 目标 ≥3% (良性线), 大信封 pos 2 优先修复 |
| **改动类型** | title/meta 重写 (snippet 数字+差异点前置 + 价格/规格/起订量进 meta + 智印港品牌词 40% CTR 公式复制) |
| **撞墙 = K3 必拍** | 具体 69 词哪些改 + 改什么词 = 撞墙 = 中 (src 改动) → K3 必拍 1 次回复 (批/部分批/不批) |
| **实施方式** | K3 拍板后 M3 1 commit 1 push, 涉及 src/data/products.ts (title_zh/en/ja + meta description × 69 SKU) + 3 个类目页 (paper-bags / packaging / envelopes) |
| **撞车风险** | 撞墙 = 中 (K3 8/22 17:58 F0 业务 0 改动红线: 不删 SKU/文案/长文本字段) → K3 必拍确认不破红线 |
| **拍板建议** | 批 69 词全量 (GSC 数据已证明 0 click 撞墙 = 病) + 大信封第 1 优先 (1 词单独提交, 不等其他) |
| **不批影响** | pos 1-10 CTR 维持 1.3%, 撞墙 = CTR 病持续, 2 周后 GSC 对比撞墙 = 中, K3 8/28 中检 §4 验收口径撞墙 = 不达标 |

### 🔴 必拍 #3 · striking 第 1 梯队 3 词冲首页 src 改动 批板 (P1 轨 2)

| 项 | 详情 |
|---|------|
| **撞墙** | src/ 改动 (新增 FAQ 补齐 + 内链加强 + 改产品文案), 撞墙 = 中 → K3 必拍 1 次回复 |
| **依据** | K3 8/26 §6 轨 2 (striking 冲首页 30-60 天) + §2.3 高展示 0 点击 TOP8 |
| **3 词 (距首页)** | ① 紙袋印刷 / 印刷紙袋 (pos 12.23/14.77, 距首页 2-5 位) ② 食品包裝印刷 (pos 15.61) ③ paper bag print file requirements (pos 15.21, en) |
| **改动类型** | 3 个着陆页 (paper-bags 类目 × 3 locale + paper-bag-printing-guide blog × 3 locale + calendar-printing-guide blog × 3 locale 已 8/5 上线) 新增 FAQ 补齐 + 内链加强 + 改产品文案 (skus 牛皮紙袋/白卡紙袋/禮品紙袋/環保紙袋) |
| **撞墙 = K3 必拍** | 具体 FAQ 写哪些 + 内链加什么 = 撞墙 = 中 (新增内容) → K3 必拍 1 次回复 |
| **实施方式** | K3 拍板后 M3 1 commit 1 push, 涉及 src/data/blog-posts.ts (3 词 3 locale FAQ 补齐) + src/data/products.ts (紙袋/食品包裝 类目 SKU 改产品文案) + 3 个类目页 (paper-bags + packaging + food-packaging) |
| **撞车风险** | K3 8/22 17:58 F0 (不删 SKU/文案/长文本字段) → K3 必拍确认不破红线 |
| **拍板建议** | 批 3 词全量 (GSC 数据 3 词距首页 2-5 位, 一纸之隔, 内链+FAQ 即可推过线) |
| **不批影响** | 8/30 验收 ≥2 词进 pos ≤10 撞墙 = 不达标, K3 8/26 §6 轨 2 30-60 天目标延后 |

### 🔴 必拍 #4 · R5 月曆印刷 pos 23.61 → 9 月中前冲 pos ≤15 计划 + FAQ 补齐 src 改动 批板 (P1 季节优先)

| 项 | 详情 |
|---|------|
| **撞墙** | src/ 改动 (新增 FAQ 补齐 + 内链加强) + 9 月中前冲首页, 撞墙 = 中 → K3 必拍 1 次回复 |
| **依据** | K3 8/26 §6 维持不变 (R5 季节硬截止 9/15) + matrix Q-NEW-05 (calendar-printing-guide 8/5 completed 3 locale, ctr_7d_pos 23.61, ctr_target_4w_pos 10) |
| **SKU 状态** | wall-calendars + desk-calendars 已上线 8/5 (新增 SKU 撞墙 = 0, 已完成), 撞墙 = FAQ 补齐 + 内链加强 |
| **改动类型** | calendar-printing-guide 3 locale 新增 FAQ 补齐 (4 FAQ → 6 FAQ) + 内链加强 (12 内部链接 → 20 内部链接) + 撞墙 = paper-bags / packaging 类目页加月曆印刷互链 |
| **撞墙 = K3 必拍** | 具体 FAQ 写哪些 + 内链加什么 = 撞墙 = 中 (新增内容) → K3 必拍 1 次回复 |
| **实施方式** | K3 拍板后 M3 1 commit 1 push, 涉及 src/data/blog-data/calendar-printing-guide/{zh-hk,en,ja}.json (FAQ + 内链) + src/app/[locale]/category/calendars/page.tsx (互链) |
| **撞车风险** | K3 8/22 17:58 F0 (不删 SKU/文案/长文本字段) → K3 必拍确认不破红线 |
| **拍板建议** | 批 月曆 FAQ 补齐 + 内链加强 全量 (R5 9/15 硬截止, 季节词错过 Q4 订 calendar 旺季) |
| **不批影响** | 9 月中前撞墙 = 中, 月曆印刷 pos 23.61 维持, 错过 Q4 订 calendar 旺季 |

### 🔴 必拍 #5 · §4 验收口径 4 cron 改动 批板 (P1 验收口径)

| 项 | 详情 |
|---|------|
| **撞墙** | 4 cron SSoT 改动 (.hermes/cron-prompts/*.md), 撞墙 = 中 → K3 必拍 1 次回复 |
| **依据** | K3 8/26 §4 "建议 8/28 中检把验收口径改为: striking 词进首页数 ≥5 + pos 1-20 展示占比 ≥30% + 有点击词数 ≥12 (原 M1 口径保留作参考)" + §0.21 攒批作废后, 8/17 85 click 旧口径已过期 |
| **范围** | 4 cron SSoT (.hermes/cron-prompts/zprintpro-daily-content-1x7w.md + zprintpro-weekly-meta-refresh.md + zprintpro-monthly-matrix-audit.md + zprintpro-gsc-feedback-loop.md) 验收口径段 |
| **选项 A** | 现在改 (8/26 即时生效, 4 cron 8/27 起按新口径验收) — 撞墙 = 0 |
| **选项 B** | 8/28 中检后改 (K3 中检拍板决定, M3 4 cron 8/29 起按新口径) — 撞墙 = 1 天 |
| **拍板建议** | 选项 B (8/28 中检后改) — K3 8/26 §4 已写"8/28 中检把验收口径改为...", 中检后改是 K3 拍板原意, 现在改 = 替 K3 推断, 撞墙 = SOP-10 第 2 款违规 |
| **撞车风险** | 4 cron SSoT 是基础架构, 撞墙 = 中 → K3 必拍确认 |
| **不批影响** | 4 cron 8/28 继续按 85 click 旧口径验收, 撞墙 = 中, 8/28 中检 9 时段 10 KPI 拉数据撞墙 = 不可比 |

---

## 2 · K3 真人时间窗口 (撞墙 ≠ 必拍, 是 K3 真人操作)

| 撞墙 | 详情 | 时间 |
|------|------|------|
| 🔴 §8 站点地图 K3 后台 5 min 真人操作 | GSC "请求编入索引" 10 个核心 URL (本 docs §3 清单) | 8/26 当天 5 min |
| 🔴 §9 Supabase service key 提交 (与必拍 #1 同源) | K3 提交 key 或 K3 自己跑 008 SQL | 8/26 当天 5 min |
| 🔴 GBP 3 locale 亲提 | docs/listicle-targets-2026-08-26.md 已备媒体清单 | 8/27 09:00 15 min |
| 🔴 Listicle 投出 | docs/listicle-targets-2026-08-26.md 已备媒体清单 | 8/28 11:00 20 min |
| 🔴 8/28 中检 9 时段 + 10 KPI 拉数据 | docs/2026-08-28-midterm-checklist.md 已备 | 8/28 12:00 30 min |

**8/26 K3 总真人时间 = 10 min (5 min 站点地图 + 5 min Supabase key)**, 4 阶段最轻的一天。

---

## 3 · 撞墙 = M3 自主 (⏳ 已排期, 不需 K3 拍板)

| 撞墙 | 详情 | 排期 |
|------|------|------|
| ⏳ 内容铺量降速 1-2 篇/天→2-3 篇/周 | 4 cron SSoT 调整 (daily 触发频率 + weekly 选题池) | 8/26-8/28 60 min, 1 commit 1 push |
| ⏳ T41/T42/T44/T45 8/28 排期收官 | K3 8/22 已批 5 SOP, 撞墙 = M3 自主 | 8/26-8/28 10 min 状态 audit |
| ⏳ Blog 选题库 20+ | K3 8/25 P1 #4 拍板 | 8/26-8/28 完成 |
| ⏳ Top10 词 Title/Meta 审计 | K3 8/25 P1 #4 拍板 | 8/26-8/28 完成 |
| ⏳ CWV 基线测量 (14/15 LCP ≤ 2.5s) | K3 8/25 P1 #4 拍板 | 8/26 完成 |
| ⏳ 008 度量层 4 事件接通 (撞墙 = Supabase key) | 等必拍 #1 拍板后, M3 跑 008 SQL + 4 事件接通 | 8/26 撞墙 = Supabase key 拍板后 |
| ⏳ 8/26 EOD 报告 | 30 min, 1 docs | 8/26 23:00 |

---

## 4 · 拍板 1 次回复模板 (K3 填空即可)

```
K3 8/26 拍板 (1 次回复):
- 必拍 #1 Supabase key: ☐ A 给 key / ☐ B K3 自己跑 / ☐ 暂缓
- 必拍 #2 pos 1-10 69 词 + 大信封: ☐ 批全量 / ☐ 批大信封先 / ☐ 部分批 / ☐ 暂缓
- 必拍 #3 striking 3 词冲首页: ☐ 批全量 / ☐ 部分批 / ☐ 暂缓
- 必拍 #4 R5 月曆 FAQ 补齐 + 内链: ☐ 批全量 / ☐ 部分批 / ☐ 暂缓
- 必拍 #5 §4 验收口径 4 cron 改动: ☐ A 现在改 / ☐ B 8/28 中检后改 / ☐ 暂缓
- 撞墙 = §8 站点地图 5 min: ☐ 8/26 当天 / ☐ 8/27 早 / ☐ 8/27 晚 / ☐ 暂缓
- 撞墙 = §9 Supabase key: (同必拍 #1, 不重复)

拍板时间: 2026-08-26 HH:MM
```

**K3 1 次回复即可 (per 千问 8/25 13:45 §7 + K3 12:12 "按你的建议执行" 拍板节奏)**。

---

## 5 · M3 撞墙兜底 (per SOP-8 K3 8/23 02:52)

| 撞墙场景 | 兜底动作 |
|---------|---------|
| K3 8/26 24:00 未拍板 | M3 撞墙升级 K3 必拍 1 次, 等拍板, 不擅自实施 (SOP-10 第 2 款约束适用范围) |
| K3 8/27 09:00 未上 | M3 撞墙升级 K3 必拍 1 次, GBP 撞墙 = 中, 等 K3 真人窗口 |
| K3 必拍 #2/#3/#4 任一 src 改动撞车 (build fail) | M3 撞车兜底 B (kill 抢跑 + revert + 1 段报告 K3, 不擅自修) |
| K3 必拍 #5 选项 A 撞车 (4 cron 改动后 1 cron 撞墙) | M3 撞车兜底 B, 1 段报告 K3, 撞墙 = 0 |

---

## 6 · 验收口径 (per K3 §0.24 完成以动作证据为准)

- ✅ 已完成: K3 5 必拍项全批 + §8 真人操作 + §9 Supabase key 落地 + M3 src/cron 改动 push + verify-deploy PASS
- ⏳ 已排期: 5 必拍项 K3 撞墙升级中, M3 等拍板 (本撞墙升级文档落, ⏳ 已排期状态)
- 🔴 撞墙: K3 必拍 1 次回复 (5 必拍项) + K3 真人时间 (§8 5 min + §9 key + GBP 8/27 + Listicle 8/28 + 8/28 中检 9 时段)

**本撞墙升级 = ⏳ 已排期状态**, 待 K3 1 次回复拍板后 → M3 实施 → ✅ 已完成。

---

*整理: M3 撞墙升级 (K3 8/26 §6/§7/§4 拍板) / 2026-08-26 / 数据: gsc_data.csv 8/24 14:30 527 词 + matrix Q-NEW-05 8/5 + 4 cron SSoT + AGENTS.md §0.22-§0.24 / docs-only 0 代码改动 / 不列 push 计数 (§0.21)*
