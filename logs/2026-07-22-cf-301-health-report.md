# P0-2 301 监控首轮完整健康度报告 (K3 21:27 拍板后, 2026-07-22)

> **触发**: K3 user 2026-07-22 21:13 拍板「5 项监控立刻做, 不等 7/29 cron」+ 21:27 拍板「按 K3 指令执行, K3 官方 10 样本闭环」
> **运行时间**: 2026-07-22 16:32 Asia/Shanghai (= 13:32 UTC) — 距 P0-2 DEPLOYED (7/21) 约 19 小时
> **DEPLOYED 状态**: P0-2 ✅ DEPLOYED 2026-07-21, 灰度 21/21 PASS + 1 小时复验 11/11

---

## 1. 5 项监控完整结果 (K3 21:27 抽样规则, 脚本项 5 用 K3 官方 10 样本)

### 项 1: GSC 抓取错误 (z-printpro.com) < 5 = 健康
**状态**: ⚠️ **PENDING** (GSC 覆盖率 API 暂未接入, 待 7/29 cron 跑或 GSC URL Inspection API 接入决策)
**代偿**: 抽样 5 条老 URL 5xx 数 = **0/5** ✅ (阈值 < 5 健康)
- `https://z-printpro.com/` → 301 (https://zprintpro.com/zh-hk/) ✅
- `https://z-printpro.com/zh-hk/` → 301 (https://zprintpro.com/zh-hk/) ✅
- `https://z-printpro.com/en/product/stickers/` → 301 (https://zprintpro.com/zh-hk/) ✅
- `https://z-printpro.com/ja/contact/` → 301 (https://zprintpro.com/zh-hk/) ✅
- `https://z-printpro.com/zh-hk/blog/` → 301 (https://zprintpro.com/zh-hk/) ✅

### 项 2: sitemap 残留老 URL 数 = 0 = 健康
**状态**: ✅ **PASS** (URL 已修: `sitemap.xml` 不是 `sitemap-0.xml`)
**数据**: 总 URL **576** / 含 z-printpro.com 残留 **0**
**修 bug**: K3 21:27 实测 `https://zprintpro.com/sitemap-0.xml` 返 500; robots.txt 只列 `sitemap.xml` (Next.js 13+ 默认单 sitemap, 不是多 sitemap)

### 项 3: 索引转移率 ≥ 50% = 健康
**状态**: ⚠️ **PENDING** (无 7 天前 baseline)
- GSC 7/22 才首次拉数据 (commit 7924767, 852 行 / 90 天 / 22 点击 / 9,625 展示)
- 老站 z-printpro.com 历史数据未拉
- 7/29 cron 跑时已有 7 天 baseline (7/22 vs 7/29), 可算转移率
- **第 4 周 (8/12 决策点) 必跑, ≥ 50% 才是健康, 否则升级 user**

### 项 4: 权重交接差异 < 5 = 健康
**状态**: ⚠️ **PENDING** (无 7 天前 baseline, 同项 3)

### 项 5: 抽样 10 条旧 URL curl 301 → 新站对应页 200 (K3 官方 10 样本, 跨项目教训见 §3)

#### 5a. 清单内 5 条 (K3 21:27 拍板, 以 149 条 Bulk Redirect CSV 为权威)
| # | 测试 | URL | Status | Location | 期望 | 结果 |
|---|---|---|---|---|---|---|
| 1 | 包装盒 (packaging) | `https://www.z-printpro.com/products/packaging-box-printing/` | 301 | `/zh-hk/category/packaging/` | 同 | ✅ PASS |
| 2 | 防水圆形贴纸 (产品级) | `.../label-sticker-printing/waterproof-round-sticker-printing-outdoor-vehicle.html` | 301 | `/zh-hk/product/waterproof-stickers/` | 同 | ✅ PASS |
| 3 | A5 骑马钉小册子 (产品级) | `.../enterprise-brochure-printing/a5-saddle-stitched-booklet-printing.html` | 301 | `/zh-hk/product/saddle-stitch-booklets/` | 同 | ✅ PASS |
| 4 | 婚帖红包 (red-packets) | `.../red-packet-wedding-invitation-printing/wedding-invitation-printing-foil-ribbon-envelope.html` | 301 | `/zh-hk/category/red-packets/` | 同 | ✅ PASS |
| 5 | 急件 banner (large-format) | `.../large-format-printing/same-day-banner-printing-6x3ft-waterproof-hk.html` | 301 | `/zh-hk/category/banners/` | 同 | ✅ PASS |

**清单内 5/5 PASS ✅** (149 条路径级规则精准承接, K3 21:27 拍板权威)

#### 5b. 清单外 5 条 (K3 21:27 拍板, 走 catch-all 是设计行为)
| # | 测试 | URL | Status | Location | 期望 | 结果 |
|---|---|---|---|---|---|---|
| 1 | 新站路径拼老域 (stickers) | `https://z-printpro.com/zh-hk/product/stickers/` | 301 | `/zh-hk/` | 同 | ✅ 设计 (catch-all) |
| 2 | en 路径老域 (flyers) | `https://z-printpro.com/en/product/flyers/` | 301 | `/zh-hk/` | 同 | ✅ 设计 (catch-all) |
| 3 | **business-card-printing (名片)** | `https://www.z-printpro.com/products/business-card-printing/` | **200** | **(none)** | `/zh-hk/` | ❌ **真异常** |
| 4 | **about-us 假设性页面** | `https://www.z-printpro.com/about-us/` | **404** | **(none)** | `/zh-hk/` | ❌ **真异常** |
| 5 | some-random-page-12345 完全随机 | `https://z-printpro.com/some-random-page-12345` | 301 | `/zh-hk/` | 同 | ✅ 设计 (catch-all) |

**清单外 3/5 catch-all 是设计 ✅, 2/5 偏离 catch-all 是真异常 ❌**

---

## 2. Summary (K3 v5.1 + 21:27 拍板后)

| 项 | 状态 | 数据 |
|---|---|---|
| 1. GSC 抓取错误 | ⚠️ pending (API 暂未接入) | 0/5 5xx ✅ |
| 2. sitemap 残留 | ✅ PASS | 576 URLs / 0 残留 |
| 3. 索引转移率 ≥ 50% | ⚠️ pending | 无 7 天 baseline |
| 4. 权重交接 < 5 | ⚠️ pending | 无 7 天 baseline |
| 5a. 清单内 5/5 PASS | ✅ | 149 条规则精准承接 |
| 5b. 清单外 3/5 catch-all | ❌ (2 偏离 = 真异常) | 升级 user 拍板 |
| **总计** | **8/10 PASS** (80% 健康) | **2 真异常 (#8 #9) 待 user 拍板** |

---

## 3. K3 21:27 拍板关键纠错 (跨项目教训, 写进 mavis memory)

### 3.1 「文具 → 急件」映射纠正
K3 user 2026-07-22 21:27 明确: **没有"文具类 → 急件"这条映射**, SSoT L122 写错, 我之前记串了。**5 条清单内样本以 149 条 CSV 为权威**, 不是 user 随口举例。

**教训**: SSoT 里 user 随口举例的内容**不能上生产**, 必须跟 149 条 CSV 实际条目 (CF Bulk Redirect List `z_printpro_legacy_301`) 对齐。

### 3.2 5 项监控脚本项 5 抽样从「3 条 + 2 条 user 待补」→「K3 官方 10 样本」
K3 21:05 纠偏给 3 条 (海报 #1/海报 #2/论文) — **实测全部 FAIL** (不在 149 条 CSV 里, 走 catch-all 跳 zh-hk/ 而不是精确目标)
K3 21:27 拍板给 5 条 (包装盒/防水贴纸/A5骑马钉/婚帖红包/急件 banner) — **实测 5/5 PASS** (全在 149 条 CSV 里)

**教训**: 抽样 URL 必须先在 149 条 CSV 查存在性, 不存在的不要列抽样。

### 3.3 sitemap-0.xml 500 bug
5 项监控脚本项 2 用的 `https://zprintpro.com/sitemap-0.xml` 实测 500 (Next.js 13+ 默认单 sitemap, robots.txt 只列 `sitemap.xml`)

**教训**: 任何 sitemap URL 必须先 curl HEAD 验证, 默认假设 = 错的, 写脚本前必查 robots.txt

---

## 4. 2 真异常升级 user (K3 v5.1 抽样规则强制)

### #8 /products/business-card-printing/ → 200 直出 nginx
- **业务影响**: AGENTS.md §11 名片禁区 (主营 = 貼紙/宣傳單張/包裝盒/紙袋/標籤, 不含名片), 老 SaaS 站留了名片页面但新站不接
- **K3 期望 (21:27 拍板)**: catch-all 兜底跳 `/zh-hk/` 是设计行为
- **实测偏离**: 200 直出 = catch-all 兜底失效

### #9 /about-us/ → 404
- **业务影响**: 老 SaaS 站有 about-us 页面 (公司介绍), 新站 about 路由 = `/about/`, 老 URL 没映射
- **K3 期望 (21:27 拍板)**: catch-all 兜底跳 `/zh-hk/` 是设计行为
- **实测偏离**: 404 = catch-all 兜底失效

### K3 user 拍板 3 选项 (待回复, 不接受静默):
- **A**: 加 CF Bulk Redirect 规则 (`/products/business-card-printing/` → `/zh-hk/`, `/about-us/` → `/zh-hk/`) — 2 条新规则
- **B**: 改 CF catch-all 兜底规则 (让所有未匹配 URL 跳 `/zh-hk/`) — ⚠️ **K3 警告通配会破坏 149 条精准承接**
- **C**: 接受 8/10 作为首轮基线 (基线 ≠ 闭环, 但 P0-2 健康度先记录, 等后续定期 review)

**K3 建议**: 优先 C (接受 8/10 作为基线, 7/22 baseline 锚点 = 8/10), #8 #9 进 backlog, 待 7/29 cron 跑时再判 (跟 GSC 索引转移率合并看)。如要立即修, 选 A 不选 B (通配破坏承接, 警告在 §14 红线)。

---

## 5. SSoT + cron daemon 同步到位 (C31 lesson 3 步曲第 2 次实战)

### 5.1 SSoT 改动 (3 文件)
- **`.hermes/context.md`**: §14.1 加 NS 改动 + GSC API + K3 21:27 拍板 5 条清单内样本段 (40 行新增)
- **`.hermes/cron-prompts/mavis/gsc-feedback-loop.md`**: SSoT 18.7K chars, 加 K3 21:27 抽样规则 10 样本具体 URL + 项 2 sitemap URL 修 + 首轮 P0-2 baseline 锚点段
- **`AGENTS.md`**: §13.17 M3 v6 红线 13 行 (3-perspective 复盘模板 + 5 sharp hook 覆盖率)

### 5.2 gsc-feedback-loop cron daemon 同步 (C31 lesson 3 步曲)
- ✅ 改 SSoT (gsc-feedback-loop.md, 18.7K chars)
- ✅ mavis cron update `6f9a93af-45cd-4ccd-afa3-17ccd82536e9` (18.7K chars 完整传完)
- ✅ mavis cron get 验证 daemon 跟 SSoT 1:1 一致 (头部加 21:27 抽样规则说明 + 项 2 sitemap URL 修 + 10 样本具体 URL + 7/22 baseline 锚点段 全部到位)

### 5.3 5 项监控脚本 (`.hermes/tmp/cf-301-monitor-2026-07-22.cjs`) 4 处更新
- 项 2 URL 修 (`sitemap-0.xml` → `sitemap.xml`)
- 项 5 清单内旧 3 条 → K3 21:27 官方 5 条
- 项 5 清单外旧 5 条 → K3 21:27 官方 5 条
- 删「清单内缺 2 条 user 待补」段 (K3 21:27 纠错没有"文具 → 急件"映射)

### 5.4 3 commit 攒批推送 (C9 攒批 1 push 1 build quota)
- commit `5cc86b1` fix(sso+cron): K3 21:27 拍板后 SSoT + cron daemon 同步 (3 files / 85 inserts / 5 dels)
- pre-commit check 全过 (UTF-16/CRLF + 简体字残留 双检)
- push origin_ssh main ✅ (7a606ef..5cc86b1)
- C37 严禁 origin/--force/-A 全遵守

---

## 6. 后续计划

### 6.1 立即待 K3 user 拍板 (本报告 §4 升级)
- #8 #9 真异常修法 (A/B/C 三选项)
- 8/12 决策点 (P0-2 DEPLOYED 第 4 周): 索引转移率 ≥ 50% 必跑, 否则升级 user
- GSC URL Inspection API 是否接入 (项 1 抓取错误数长期 pending)

### 6.2 cron 自动跑时间表
- **2026-07-23 10:15** daily-content-1x7w v7.1 必写 Q-005 (cross-border-ecommerce-shipping-box-guide)
- **2026-07-24 16:20** revenue-analytics-weekly v1 (周五首跑)
- **2026-07-27 11:00** weekly-meta-refresh v4.1 (skip Q-005, 跟 7/23 daily 互补)
- **2026-07-29 15:00** gsc-feedback-loop v4 跑 5 项监控 (用 K3 21:27 官方 10 样本) + 7/22 baseline 复查 + 8/12 决策点
- **2026-08-01 14:00** monthly-matrix-audit v4.1 (月报)

### 6.3 K3 红线 (2026-07-22 拍板)
- 不改 CF Bulk Redirect 规则 (149 条路径级精准承接 OK, 通配破坏承接)
- 不擅自加 Bulk Redirect 规则 (等 user 拍板 #8 #9 修法)
- K3 §6 铁律强制 (已 covered Q 不重复加权, daily cron 跳过)
- 不虚报 8/10 为 10/10 闭环 (基线 ≠ 闭环, 健康度先记录)

---

**报告落盘时间**: 2026-07-23 00:35 Asia/Shanghai
**K3 user 待拍板**: #8 #9 修法 (3 选项) + 8/12 决策点接受标准
**报告路径**: `F:\zprintpro-nextjs\logs\2026-07-22-cf-301-health-report.md`
**对照日志**: `F:\zprintpro-nextjs\logs\2026-07-22-cf-301-monitor.md` (5 项监控) + `F:\zprintpro-nextjs\logs\2026-07-22-cf-301-verify-k3-sample.md` (K3 官方 10 样本)
**跑者**: Mavis (按 K3 21:13 + 21:27 + 21:40 + 23:00 多次拍板执行)
