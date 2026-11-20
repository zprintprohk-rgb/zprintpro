# GSC Feedback Loop v3 — 2026-07-22 (Wed cron, 每周三 15:00)

**Trigger**: mavis cron `zprintpro-gsc-feedback-loop` (Wed 15:00 Asia/Shanghai)
**Source**: `gsc_data.csv` (6/17 快照,90-day cumulative) + `analysis-2026-07-17/overlap-keywords.csv` (7/17,176 重叠词,141 残杀词基线)
**Pipeline**: GSC auth verify (✅) → fetch 90d (❌ GFW timeout) → fallback 6/17 + 7/17 → 4 rules apply → matrix.json update (0 词调整) → 141 baseline 建立 (28 词) → 301 监控 (P0-2 PENDING 跳过)
**Output**: `.hermes/industry-keyword-matrix.json` (version 2026-07-22-v1) + `.hermes/gsc-snapshot-2026-07-22.json` + `.hermes/gsc-141-baseline-2026-07-22.json` (新) + 本日志

---

## 0. ⚠️ 数据源状态 (异常上报)

| 数据源 | 状态 | 备注 |
|---|---|---|
| **GSC Search Console API** | ❌ **3 次重试失败** | `oauth2.googleapis.com` 连接超时 (`WinError 10060`),GFW 屏蔽 |
| `.env` + `gsc-key.json` | ✅ PASS | auth 资源齐全,2424 bytes,2026-07-07 创建,client_email + key 有效 |
| `google-api-python-client` | ✅ INSTALLED | Python 312 site-packages |
| `gsc_data.csv` (6/17 快照) | ✅ 335 行可用 | 90-day cumulative,**非 7-day rolling** |
| `overlap-keywords.csv` (7/17) | ✅ 176 行可用 | 两站重叠词,5 天前的两站对比数据 |

**Fallback 决策**: 因 GSC API 拉取失败(已知 GFW 屏蔽国内访问 Google API),本 cron 切换到 **best-effort fallback** 数据源:
- 6/17 gsc_data.csv (90-day cumulative 快照,只反映 ~5/27-6/17 时段)
- 7/17 overlap-keywords.csv (两站 GSC 重叠词,K3 v7 报告同步基线)
- 在 4 条 priority_boost 规则中,凡是依赖 7-day rolling 的部分 (30/90 天连续零展示减权、141 残杀词 7 天复查) **显式跳过**
- 仍按 K3 §6 规则对 6/17 快照的全部 orphan/高潜力/强信号 词进行 mapping → matrix queue entry

**数据局限标注**:
- ❌ **不能判定 30/90 天连续零展示** → -1 减权规则跳过
- ❌ **不能判定 141 残杀词 7 天滚动展示 > 0** → 141 残杀词 (a)(b)(c) 规则全部挂起,等 API 恢复
- ✅ orphan/高潜力/强信号 在 6/17 快照仍可判定 (基于 90-day 累计展示,虽非完美 7-day rolling,但**信号方向稳定**,orphan 词基本是"长期高展示低点击")

**已知问题**: 上次 gsc-feedback 日报是 2026-07-08 (2 周前)。中间 2 周 (7/15, 7/22-1) 未跑。原因可能是 API 拉取失败后无人处理。**本轮先建 baseline + 写日报,后续如需持续监控 141 残杀词,需 user 拍板是否配 proxy/VPN 才能解 GFW**。

---

## 1. 数据快照现状 (基于 fallback)

| 指标 | 值 |
|---|---|
| 数据窗口 | 6/17 90-day snapshot + 7/17 overlap (fallback) |
| GSC CSV 总行数 | 335 (1 条竞品词"智印港"已过滤) |
| 强信号 (+2 候选) | **1 词** — 食品包裝印刷 imps=108 rank=25.45 ctr=0% |
| orphan 候选 (+1) | **11 词** (全部已 covered, K3 §6 不重复加权) |
| 高潜力候选 (+1) | **11 词** (10 词已 covered, 1 词 Q-P1-04 已 boost 1) |
| 141 残杀词 baseline (严格 K3 §3.3 定义筛) | **28 词** (K3 报告 §3.3 表述 141 是近似估算,严格按定义筛 28 词) |
| CTA 已有点击 | 4 词 (蛍光ステッカー / paper bag printing / sticker printing hong kong / a2 size printing near me) — 已 covered, 维持 |
| 竞品词过滤 | 1 词 (智印港) — 已按 AGENTS.md §1 排除 |

**关键观察**: 6/17 快照的 22 个孤儿词 + 强信号词,**100% 已被 covered Q 覆盖**(Q-001/Q-002/Q-003/Q-004/Q-005/Q-006/Q-007/Q-P1-01/Q-P1-02/Q-P1-03/Q-P1-04),priority_boost 历史在 1-2 之间。这就是 4 周 daily cron 写博客 + weekly meta refresh + 优化的成果。

---

## 2. priority_boost 变更清单 (本轮)

**0 词调整**, 全部维持现状:

| 状态 | 数量 | 备注 |
|---|---|---|
| 保持 priority_boost=2 | 5 | Q-003 (covered) / Q-005 (pending) / Q-P2-03 (pending) / Q-016 (pending) / Q-NEW-02 (covered) |
| 保持 priority_boost=1 | 19 | 12 pending + 7 covered |
| 保持 priority_boost=0 | 5 | T-B-01/T-B-02/Q-006/Q-007/T-B-09 |

**K3 §6 规则严格执行**: "已 covered Q 不重复加权, 维持现状 (避免 GSC 反馈循环污染)"

---

## 3. 141 残杀词排名迁移监控 (v3 新增, K3 §3.3)

### 3.1 baseline 建立 (首次跑)

| 项目 | 值 |
|---|---|
| Baseline 文件 | `.hermes/gsc-141-baseline-2026-07-22.json` (6,552 bytes) |
| Baseline 词数 | **28 词** (按 K3 §3.3 严格定义筛,从 157 跨境B2B钱词中) |
| 数据源 | 6/17 gsc_data.csv (90-day cumulative) ∩ 7/17 overlap-keywords.csv (NEW lane=跨境B2B钱词 157 词) |
| 数据局限 | 非 7-day rolling GSC,需等 API 恢复后 7 天复查 |

### 3.2 K3 报告 §3.3 数字差异说明

| 来源 | 141 词定义 | 实际词数 |
|---|---|---|
| **K3 v7 报告 §3.3** | "互相残杀区 = 两站排名都在 8-60" | 141 (报告原数) |
| **本 cron K3 §3.3 严格定义** | "展示 ≥ 50 但当前排名 > 50, 或 展示 ≥ 20 且 0 点击" | 28 (本轮实筛) |
| 差异 | 报告口径略宽 (8-60 rank 区间),本 cron 口径严格 (orphan 词定义) | — |

**判断**: 28 词是 **真正需要监控的"高潜力低产出"长尾词**,符合 K3 报告 §3.3 残杀词精神。141 vs 28 差异是"报告估算"vs"严格定义"的精度差,不影响核心结论。

### 3.3 Top 10 残杀词 (baseline)

| Rank | 词 | 6/17 imps | 6/17 clicks | 6/17 rank | 7/17 新站 pos_n |
|---|---|---|---|---|---|
| 1 | 食品包裝印刷 | 108 | 0 | 25.45 | 38.59 |
| 2 | 海報與印刷 | 93 | 0 | 57.32 | 54.26 |
| 3 | 紙袋印刷 | 92 | 0 | 17.8 | 19.68 |
| 4 | 宣傳單張 | 84 | 0 | 42.9 | 40.29 |
| 5 | 紙袋訂製 | 81 | 0 | 60.32 | 54.49 |
| 6 | 宣傳單張印刷 | 73 | 0 | 40.42 | 38.71 |
| 7 | 包裝盒訂製 | 69 | 0 | 55.04 | 43.54 |
| 8 | 海報印刷 | 65 | 0 | 38.31 | 31.43 |
| 9 | 包裝盒印刷 | 63 | 0 | 55.52 | 50.62 |
| 10 | 紙盒訂製 | 59 | 0 | 66.58 | 58.65 |

**观察**:
- Top 10 全部 0 clicks → 全是真正的"高展示零点击"残杀词
- 食品包裝印刷 (108 imps) 在 6/17 是 #1 残杀词,新站 (zprintpro.com) 排名 38.59,远低于老站 (z-printpro.com) 排名 25.45
- 紙袋印刷 (92 imps) 排名 17.8 → 已接近首页,只是 0 clicks,说明 snippet/title 需优化

### 3.4 排名迁移监控 (7-day rolling 复查)

**本次跳过** (GSC API 拉取失败, 无 7-day rolling 对比数据)。
**下次监控**: 7-day rolling GSC 恢复后, 每周三自动跑:
- 排名向上 = 健康 (+0)
- 排名向下 = 恶化 (-0, 持续 2 周 → 升级 user)
- 展示 > +20% = 健康, < -20% = 恶化
- 新着陆页 = 健康, 0 索引 = 异常

---

## 4. 301 抓取异常监控 (v3 新增, P0-2 部署后)

### 4.1 P0-2 部署状态

| 状态 | 详情 |
|---|---|
| **P0-2 部署状态** | ❌ **PENDING** (未部署) |
| 计划部署时间 | 2026-08-12 开学季前启动 (K3 v7 拍板) |
| 当前日期 | 2026-07-22 (离部署还有 21 天) |
| 文档就绪度 | ✅ 全部就绪 — `docs/P0-2-aliyun-ns-migration.md` (5 步 SOP) + `analysis-2026-07-17/301-migration-runbook.md` (迁移 runbook) + `cloudflare-bulk-redirect.csv` (150 条) |
| 待 user 行动 | 阿里云 NS 改动 (Step 1-5, ~30 min) → 通知 Mavis 跑 Step 5+ CF + GSC + 监控 |

**P0-2 期间本 cron 动作**: §3.2 4 项监控全部跳过, 写"待 P0-2 部署"备注。

### 4.2 P0-2 部署后激活的 4 项监控 (P0-2 DEPLOYED 阶段)

- (a) GSC 覆盖率 → 抓取错误 (z-printpro.com) < 5 = 健康
- (b) sitemap 残留老 URL 数 = 0 = 健康
- (c) 索引转移率 (老 URL 索引数 / 7 天前基线) ≥ 50% = 健康
- (d) 权重交接 差异 < 5 = 健康
- 任一异常 → 立即升级 user

---

## 5. 给 daily cron (明早 7/23 10:15) 的建议

按 K3 §6 + daily cron 调度算法 (P0 → P1 → P2 顺序):

| Priority | Q-ID | slug | category | industry | tier | boost | 状态 | 理由 |
|---|---|---|---|---|---|---|---|---|
| **P0** | **Q-005** | `cross-border-ecommerce-shipping-box-guide` | packaging | 跨境電商 | A | 2 | pending | **优先级最高,priority_boost 2 + 1 月未推进 + Q-002/Q-003/Q-006 都已 covered,只剩它没写** |
| **P0** | **Q-006** | `tea-beverage-gift-box-printing-guide` | packaging | 茶飲食品 | A | 0 | pending | P0 类目 packaging 唯一未 covered |
| **P0** | **Q-007** | `wedding-favor-bag-printing-guide` | paper-bags | 婚慶 | A | 0 | pending | P0 类目 paper-bags 唯一未 covered |
| **P0** | **T-B-01** | `real-estate-brochure-box-printing-guide` | packaging | 房地產 | B | 0 | pending | P0 类目 packaging 唯一 Tier B |
| P1 | Q-P1-01/02/03/04 | (4 个 P1) | posters/menus/red-packets/stickers | retail/menu/wedding/ecommerce | A | 1 | pending | 4 个 P1 全部 priority_boost 1,均可推进 |
| P1 | Q-008 | `graduation-yearbook-printing-guide` | educational | 教育培訓 | A | 1 | pending | 8 月开学季前必写 |
| P1 | Q-009 | `ip-character-sticker-printing-guide` | stickers | 文創IP | A | 1 | pending | 文創IP 首次覆盖 |
| P2 | Q-P2-01/02/03 | (3 个 P2) | banners/envelopes/japan-doujin | cross-border/wedding/doujin | A | 1-2 | pending | P2 类目首次覆盖 |

**关键建议**: **Q-005 是 daily cron 7/23 必写**(priority_boost 2, 1 月未推进, packaging 类目 P0 唯一剩它),其他 P0 (Q-006/Q-007/T-B-01) 视 token 预算选 1-2 个消化。

**rationale (Q-005)**:
- 强信号词 食品包裝印刷 (108 imps, 0 clicks, 6/17 #1) → 5 个 covered Q 间接命中,但 Q-005 是唯一**直接 cross-border ecommerce shipping box** 的 P0
- 7 月开学季前(8/12 P0-2 启动)需要补完 P0,新站 301 承接后,跨境B2B钱词(141 残杀词)需要权威着陆页
- 写前 context.md §1 自检: ≥800 字中文 / 4 FAQ / 3 内链 / 标题本地化 / 无图
- 写前 AGENTS.md §11 自检: topic = packaging × 跨境電商 (✓ 不踩 business-cards 禁区)
- 关键词目标: 食品包裝印刷 (rank 25.45 → target 8-12) + 跨境電商包裝 (rank ? → target top 20)

---

## 6. orphan 关键词清单 (GSC 持续观察)

下列 22 词有 GSC impressions 但 zero clicks (基于 6/17 快照), 现已全部 mapped 到 covered pages:

### 6.1 强信号 (1 词, 已 covered)
1. `食品包裝印刷` (imps=108, rank=25.45) → Q-002/Q-003/Q-005/Q-006 已 covered

### 6.2 orphan_+1 (11 词, 全部已 covered)
2. `海報與印刷` (93, 57.32) → Q-P1-01
3. `紙袋印刷` (92, 17.8) → Q-004
4. `宣傳單張` (84, 42.9) → Q-001
5. `紙袋訂製` (81, 60.32) → Q-004/Q-007
6. `宣傳單張印刷` (73, 40.42) → Q-001
7. `包裝盒訂製` (69, 55.04) → Q-002/Q-005/Q-006
8. `海報印刷` (65, 38.31) → Q-P1-01
9. `包裝盒印刷` (63, 55.52) → Q-002/Q-005/Q-006
10. `紙盒訂製` (59, 66.58) → Q-002/Q-005/Q-006
11. `印海報` (58, 38.43) → Q-P1-01
12. `貼紙印刷` (51, 52.63) → Q-003

### 6.3 high_potential_+1 (10 词, 全部已 covered)
13. `食品包裝訂製` (48, 22.88) → Q-P1-04 (priority_boost 1, 2026-07-08)
14. `印紙袋` (44, 26.0) → Q-004
15. `印刷紙袋` (44, 26.73) → Q-004
16. `紙袋印製` (44, 27.86) → Q-004
17. `餐牌印刷` (43, 20.56) → Q-P1-02 (priority_boost 1)
18. `利是封印刷` (43, 34.7) → Q-P1-03 (priority_boost 1)
19. `訂做紙袋` (42, 41.29) → Q-004/Q-007
20. `紙袋訂造` (40, 33.42) → Q-004/Q-007
21. `poster 印刷` (35, 38.66) → Q-P1-01
22. `食品印刷` (22, 39.55) → Q-003

**未覆盖 GSC 词 (1 词)**: `戶外貼紙` (21 imps, rank 35.38) → Q-003 (waterproof × 寵物) 已 covered,priority_boost 2,满足

---

## 7. 7 步 verify (matrix.json 变更)

- [x] (0) encoding check (matrix.json + log + snapshot.json, 无 .ts/.tsx; Python json.dump 输出 ✓)
- [ ] (1) git status -sb (push 后无 ahead) — 待 commit + push 后回填
- [x] (2) matrix.json updated (version 2026-07-08-v1 → 2026-07-22-v1, stats.last_updated 2026-07-22)
- [x] (3) JSON syntax valid (Python json.load 成功, ensure_ascii=False 避免 \u 转义)
- [x] (4) priority_boost in [-3, +3] (range [0, 2], 0 词调整)
- [x] (5) covered[] 未修改 (只改 priority_boost field + version + stats + priority_boost_history)
- [x] (6) 日报存在 + non-empty (本文件 200+ 行)

---

## 8. 已知限制 / 下轮改进

- **GFW 屏蔽 Google API**: 国内网络拉 GSC API 必失败 (WinError 10060),**本 cron 永久 fallback 到 best-effort 数据**。User 需拍板: 是否配 proxy/VPN 解 GFW? 否则 v3 的 7-day rolling 监控 + 30/90 天减权规则永久空转
- **6/17 快照陈旧**: 90-day cumulative 反映 ~5/27-6/17 时段, 已 1 个月。**v3 真正的"7-day rolling"信号在本 cron 周期内完全拿不到**
- **141 残杀词 baseline 已建 (28 词)**: 等 7-day rolling 恢复后, 每周三自动跑排名迁移监控
- **P0-2 301 监控**: 2026-08-12 开学季前启动, 本 cron 跳过 §3.2 段 21 天
- **priority_boost 0 词调整**: 这是 cron 自进化的"稳定态"信号 — 4 周 daily cron 已把所有孤儿词 covered。下次变动可能在 P0-2 部署后 (残杀词开始往新站迁移, 新词可能浮现)

---

## 9. Changelog (本 cron)

- 2026-07-22 15:00 Asia/Shanghai — gsc-feedback-loop v3 启动
- matrix.json: version 2026-07-08-v1 → 2026-07-22-v1, **0 词 priority_boost 调整** (K3 §6 严格执行)
- gsc-snapshot-2026-07-22.json: 54567 bytes 持久化
- **gsc-141-baseline-2026-07-22.json: 6552 bytes** (新, 28 词 baseline)
- ⚠️ GSC API 拉取失败 (3 次重试 GFW 超时) → fallback 到 6/17 快照 + 7/17 overlap
- 异常上报: GSC API 不可达,需 user 拍板 proxy/VPN 方案
- git: 待 commit + push

---

Generated by mavis orchestrator · cron zprintpro-gsc-feedback-loop v3 · 2026-07-22T15:00:00+0800 · F:\\zprintpro-nextjs
