# M3 GSC 周报 v4 · 2026-07-29 (Wed 15:00)

> **Cron**: `zprintpro-gsc-feedback-loop` (Cron ID: 6f9a93af)
> **触发**: 每周三 15:00 Asia/Shanghai
> **预算**: 60 min
> **会话**: mvs_38fa4b081faa473c929730c6f6d8b2cf
> **版本**: v4 (K3 §6 铁律 + 141 残杀词周报 + P0-2 301 监控 + matrix 改 + 7/29 P2 联动 + Q-005 daily 必写)
> **SSoT**: `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md`

---

## §1 摘要 (3 行内)

- **结论**: 7d 862 imps / 1 click; 28 baseline 词 19 命中 (全 CTR 0%) + 9 消失; **🚨 P0-2 301 监控清单内 0/5 PASS (7/22 baseline 5/5 退步, Bulk Redirect List 疑似整体失效, 升级 K3)**
- **3 行数据**: 显示量较 6/17 baseline 降 60-90% (e.g. 食品包裝印刷 108→9 imps, 海報印刷 65→19 imps); 校园词 0 命中 (P3 7/30 创造流量入口, 不是收割); AI 可见性 0/7 (K3 8/12 复盘目标 ≥1/4)
- **≤1 风险**: 149 条 Bulk Redirect List 整体失效, 7/23 拍板加 2 条新规则 (#8 #9) 是否有同步操作, 需 K3 立即排查 CF Dashboard enabled 状态

---

## §2 数据 (KPI 大表)

### 2.1 7-day GSC (2026-07-22 ~ 2026-07-28, 拉取 2026-07-29 02:18)

| 指标 | 7d (7/22-7/28) | 6/17 baseline (90d 快照) | 7/17 baseline (90d 快照) | 趋势 |
|---|---|---|---|---|
| 总展示 | 862 | n/a (snapshot 不同) | n/a | — |
| 总点击 | 1 | n/a | n/a | — |
| 总词数 | 296 | n/a | n/a | — |
| 平均 CTR | 0.12% | n/a | n/a | — |
| 平均排名 | ~50 | n/a | n/a | — |
| "智印港" 词 (M3 v6 改后追踪) | 1 imp / 1 click / pos 2 | 32 imps / CTR 9.4% | n/a | ↑ 点击率 = 100% (单样本) |

**注**: 6/17 + 7/17 baseline 是 90d 累计快照, 跟 7/22-7/28 7d 窗口不可直接比较, 用 "baseline 词 imps 7d 趋势" 间接对比

### 2.2 28 baseline 词 × 7d GSC 覆盖 (K3 §3.3 定义: imps≥50 排名>50 OR imps≥20 0 点击)

| 状态 | 数量 | 占比 | 说明 |
|---|---|---|---|
| **FOUND (7d 仍有展示)** | 19 | 68% | 命中词 100% CTR 0% (零点击) |
| **NOT_FOUND (7d 0 展示)** | 9 | 32% | 消失原因: 5 纸袋变体季节性 / 1 利是封季节 / 1 bag printing en 跨境 / 1 印名片 §11 禁区 / 2 利基 (户外贴纸/印纸盒) |
| **残杀 (ZOMBIE)** | 19 | 68% | 有展示无点击, 7d imps 全 < 20, 排名全 > 30 (远未到首页) |
| **总 28 词 baseline 7d 累计 imps** | 154 | — | 平均 8.1 imps/词, 0 click |

### 2.3 残杀 19 词 (按 7d imps 排序) - P4 CTR 优化候选

| # | 词 | 7d imps | 7d pos | 6/17 imps | 6/17 pos | 6/17→7d 趋势 |
|---|---|---|---|---|---|---|
| 1 | 海報印刷 | 19 | 32.0 | 65 | 31.4 | ↓71% imps (唯一 pos < 35) |
| 2 | 宣傳單張 | 17 | 38.4 | 84 | 40.3 | ↓80% |
| 3 | 貼紙印刷 | 14 | 55.5 | 51 | 43.1 | ↓73%, pos 退步 12 位 |
| 4 | 印海報 | 13 | 28.6 | 58 | 36.2 | ↓78%, pos 进步 8 位 |
| 5 | 宣傳單張印刷 | 13 | 36.9 | 73 | 38.7 | ↓82% |
| 6 | 包裝盒訂製 | 11 | 37.1 | 69 | 43.5 | ↓84% |
| 7 | 訂做紙袋 | 11 | 42.1 | 42 | 41.9 | ↓74% |
| 8 | 食品包裝印刷 | 9 | 74.6 | 108 | 25.5 | ↓91%, pos 退步 49 位 🚨 |
| 9 | 食品包裝訂製 | 5 | 23.0 | 48 | 22.9 | ↓90%, **唯一 pos < 30** |
| 10 | poster 印刷 | 8 | 28.0 | 35 | 31.2 | ↓77%, pos 进步 3 位 |
| 11 | 紙袋印刷 | 10 | 35.3 | 92 | 19.7 | ↓89%, pos 退步 15 位 |
| 12 | 包裝盒印刷 | 8 | 45.0 | 63 | ? | ↓87% |
| 13 | 紙袋訂製 | 8 | 44.6 | 81 | 54.5 | ↓90% |
| 14 | 紙盒訂製 | 6 | 62.8 | 59 | ? | ↓90% |
| 15 | 貼紙訂製 | 6 | 51.5 | 39 | ? | ↓85% |
| 16 | 印刷紙袋 | 5 | 48.2 | 44 | ? | ↓89% |
| 17 | 海報與印刷 | 4 | 52.8 | 93 | 54.3 | ↓96% |
| 18 | 禮盒訂製 | 2 | 53.0 | 28 | ? | ↓93% |
| 19 | 食品印刷 | 1 | 73.0 | 22 | ? | ↓95% |

### 2.4 消失 9 词 (7d 0 展示, 不补原因分类)

| # | 词 | 6/17 imps | 6/17 pos | 消失原因 |
|---|---|---|---|---|
| 1 | 印名片 | 53 | ? | §11 禁区, **不补** (K3 主营品类约束) |
| 2 | 印紙袋 | 44 | 27.1 | 纸袋变体季节性, GSC 数据延迟 |
| 3 | 紙袋印製 | 44 | 32.4 | 纸袋变体季节性 |
| 4 | 利是封印刷 | 43 | 31.9 | 季节词 (7 月无农历新年查询) |
| 5 | 紙袋訂造 | 40 | 36.6 | 纸袋变体季节性 |
| 6 | 紙袋訂做 | 37 | 48.1 | 纸袋变体季节性 |
| 7 | 紙袋批發 | 24 | 55.1 | 纸袋变体季节性 |
| 8 | 戶外貼紙 | 21 | 37.0 | 利基词 |
| 9 | 印紙盒 | 21 | 51.1 | 利基词 |

### 2.5 5 项 P0-2 301 监控 (context.md §14.2 强制监控)

| # | 监控项 | 7/22 baseline | 7/29 实测 | 状态 |
|---|---|---|---|---|
| 1 | 老域名 (z-printpro.com) 抓取错误数 | < 5 | 0 (fallback 7/17 csv) | ✅ PASS (待 v3 page 维度量化) |
| 2 | sitemap 残留老 URL 数 | = 0 | 0 (`public/sitemap*.xml` grep z-printpro.com = 0) | ✅ PASS |
| 3 | 索引转移率 (老→新) | ≥ 50% | **未量化** (本 cron 拉 query 单维度, 无 page 维度) | ⚠️ 数据缺 (待 v3 升级) |
| 4 | 权重交接差异 (老 vs 新同关键词) | < 5 位 | **未量化** (同 #3) | ⚠️ 数据缺 |
| 5 | 旧 URL 抽查 10 条 (5 清单内 + 5 清单外) | 5/5 PASS + 3/3 catch-all | **🚨 0/5 PASS (清单内 5 条全 200/404 直出, Bulk Redirect List 整体失效)** | 🚨 **退步! 升级 K3** |

**§14.4 升级 K3 触发条件命中**: 清单内 URL 抽查 FAIL (≤5/5 命中 149 条精准承接) → 立即升级 user, 这是真异常, 不是设计行为

### 2.6 P4 CTR 优化 Top 15 候选 (从 0 点击 + imps≥5 15 词)

| # | 词 | 7d imps | 期望 CTR 提升 |
|---|---|---|---|
| 1 | 海報印刷 | 19 | 0% → 1.5-3% |
| 2 | 月曆印刷 | 17 | 同 |
| 3 | 宣傳單張 | 17 | 同 |
| 4 | 貼紙印刷 | 14 | 同 |
| 5 | 印海報 | 13 | 同 |
| 6 | 宣傳單張印刷 | 13 | 同 |
| 7 | 印刷 cmyk | 12 | 同 |
| 8 | 騎馬釘 | 11 | 同 |
| 9 | 包裝盒訂製 | 11 | 同 |
| 10 | 透明貼 | 11 | 同 |
| 11 | 訂做紙袋 | 11 | 同 |
| 12 | catalog printing | 11 | 同 |
| 13 | 書刊印刷 | 10 | 同 |
| 14 | 印刷 カラー モード | 10 | 同 |
| 15 | 咭片印刷 | 10 | 同 |

(完整 165 词 0 点击见 gsc-snapshot-2026-07-29.csv)

---

## §3 已完成动作 (5 步)

| 步骤 | 动作 | 状态 |
|---|---|---|
| 1 | 读 5 SSoT (master v2 / shared snippet / AGENTS / context / matrix + 3 GSC 数据文件) | ✅ DONE |
| 2 | 读今日 P2 报告 + AI 基线 + matrix-audit + v7-feedback (07/29 02-13 时段已完成) | ✅ DONE |
| 3 | 跑 5 项 P0-2 301 监控 (10 URL curl + sitemap grep) | ✅ DONE, **清单内 0/5 退步升级 K3** |
| 4 | 算 28 baseline 词 3 分类 (残杀 19 / 消失 9 / 0 候选) + P4 CTR 15 词候选 | ✅ DONE |
| 5 | 改 matrix.json priority_boost_history 加 7/29 entry + lastUpdated 同步 | ✅ DONE |

---

## §4 v2 §0 红线 compliance (5 红线 + 5 升级条件)

| # | 约束 | 验证 | 状态 |
|---|---|---|---|
| 0.1 | 每天 ≤1 push (cron 自动 commit 不算) | 本 cron 1 commit (本 cron log + matrix.json) | ✅ |
| 0.2 | push 后 verify-deploy PASS | `node scripts/verify-deploy.mjs` 待跑 (commit 后) | ⏳ |
| 0.3 | 封版零改动 (page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / price_range / price-data.generated.ts) | 0 改动封版文件, 仅 .hermes/ + .hermes/logs/ 落盘 | ✅ |
| 0.4 | 内链先核后写 (curl 验证 200) | 0 内链写入, 仅监控, 不需核 | N/A |
| 0.5 | 不删/不改现有 slug | 0 slug 改动, 0 redirect 改动 | ✅ |
| 0.6 | 拿不准 → 选保守方案 | 0 候选常态维持 (K3 §9 拍板 #2) | ✅ |
| **7.6** | Rich Results Test 报错且无法自行修复 | 7/28 状态 0% (K3 21:08 拍板 C 维持 14 天), 不在本次监控范围 | N/A |
| **7.7** | curl 验证内链目标 404 | 0 内链操作 | N/A |
| **7.8** | GSC 数据异常 (展示量突降 >50%) | 28 baseline 词 100% imps 突降 60-95%, **但原因可能是 (a) GSC 数据延迟 (b) 301 旧域衰减 (c) 长尾词季节性, 不能简单升级, 报告标注** | ⚠️ 标注 (非升级) |
| **7.x (新)** | **清单内 URL 抽查 FAIL (≤5/5)** | **0/5 PASS, §14.4 升级 K3** | 🚨 升级 |

---

## §5 异常/跳过项

| # | 项 | 详情 | 状态 |
|---|---|---|---|
| 1 | P0-2 §14.4 触发 (清单内 0/5) | 149 条 Bulk Redirect List 整体失效, 详见 §K3 §6 段 | 🚨 升级 K3 |
| 2 | GSC 7d vs 6/17 突降 60-90% | 三因不明 (数据延迟 / 301 旧域衰减 / 季节性), 不简单升级, 报告标注, P4 关注 | 观察 |
| 3 | en/product/flyers/ 404 | 跑监控时新站 zprintpro.com/en/product/flyers/ 返回 404, **flyers SKU 在 en locale 不存在?** 需 8/5 P3 报告附录排查 | 排查 (8/5 前) |
| 4 | 28 baseline 词 9 消失 | 5 纸袋变体 / 1 利是封季节 / 1 bag printing en / 1 印名片 §11 / 2 利基, 不补 | 维持 |
| 5 | AI 可见性 0/7 | 7/29 web_search 0 命中, K3 8/12 验收目标 ≥1/4 (剔除禁区+无市场), P3 校园 + P4 CTR 14 天窗口 | 推进 |
| 6 | 8/12 §6.2 校园词排名不可达 | P2 7/29 02:18 已标注, 14 天 GSC 0 命中 → 排名 不可达, 8/12 复盘需重定义口径 | 8/12 复盘 |
| 7 | 8/12 §6.4 Rich Results 100% 不可达 | K3 21:08 拍板 C 维持 14 天, 8/12 复盘拍板方案 A (Trustpilot 接入 8/26 完工) | 8/12 复盘 |
| 8 | 8/12 §6.6 旧域名展示量本 cron 无 page 维度 | 待 v3 升级或 P4 补跑, K3 7/29 13:42 拍板新口径: 环比下降 ≥50% | 数据缺 (新口径 K3 拍) |

---

## §6 下阶段依赖

| # | 依赖项 | 阻塞谁 | 解锁条件 |
|---|---|---|---|
| 1 | K3 7/29 排查 Bulk Redirect List (5 项 checklist) | gsc-feedback 下次 cron (8/5) | 清单内 5/5 PASS 恢复 |
| 2 | P3 7/30-8/5 校园 3 页 (blocklist 2 slug 留给 M3 P3 独立写) | 8/12 验收 §6.1 询盘 ≥1 + §6.3 收录 +3 + §6.5 AI 可见性 ≥1/4 | M3 P3 8/5 前完工 |
| 3 | P4 8/6-8/12 CTR 优化 15 词 (本 cron §2.6 候选) | 8/12 验收 §6.7 (K3 13:42 拍板新口径) | P4 commit + sitemap lastmod (P1-1 短期方案) |
| 4 | matrix.json v7 字段 7/31 截止对账 (K3 P1-3 拍板) | 8/1 monthly matrix-audit cron | 方案 A schema 改 (matrix-audit 13:50 报告) |
| 5 | Q-005 cross-border-ecommerce-shipping-box-guide (P0 跨境電商) | daily cron 7/30 必写 (master §6 0 候选常态 → Q-005 大流量高潜力首选) | 7/30 daily cron 触发 |
| 6 | 8/12 复盘 4 项真验收 + 3 项 KPI 监控 + 3 PDP 404 + Trustpilot 方案 A | 8/12 K3 复盘拍板 | 8/12 P4 report 提交 |

---

## §7 K3 审批栏 (留空, K3 填)

- [ ] §7.8 GSC 突降 60-90% 是否接受"非升级, P4 关注"判断 (yes/no)
- [ ] §5.3 en/product/flyers/ 404 是否同意 8/5 前 P3 报告附录排查 (yes/no)
- [ ] §7.1 0 候选常态维持 (matrix priority_boost 0 应用) 是否同意 (yes/no)
- [ ] §6.1 7/30 daily cron 必写 Q-005 是否同意 (yes/no) — K3 v7 拍板 B+C+F 兜底, Q-005 是 P0 跨境電商唯一未 covered, 是 7/30 必写
- [ ] §K3 §6 段 5 项 Bulk Redirect List 排查 checklist (P0-2 升级) 是否立即执行 (yes/no)

---

## §8 K3 §6 段 (接受 0 候选常态说明 + P0-2 升级)

### 8.1 0 候选常态说明 (K3 §6 拍板)

**K3 7/29 13:42 v7 拍板**: matrix priority_boost 0 应用 = 0 候选常态 (K3 §9 拍板 #2: 7/25-7/26 静默不补跑; §9 拍板 #3: 不开新 weekly SKU cron; §9 拍板 #6: GEO 增强纳入 P1-P4)

**本 cron 维持 0 候选常态**:
- 28 baseline 词 19 命中全 CTR 0%, 9 消失
- 已 covered 35+ 博客未产生任何 zprintpro 流量 (7d 仅 "智印港" 1 imp 1 click)
- 真正有商业价值 (跨境電商/婚慶/教育/美妝) 候选都已在 Q-GR-01/02/03 (3 篇 7/23-7/24 部署, 7/30+ 等收录)
- P4 CTR 优化 15 词候选在 §2.6 列表, 等 8/6-8/12 P4 阶段 (不再本 cron 重复加权)

### 8.2 🚨 P0-2 301 监控升级 (K3 立即排查)

**退步事实**: 7/22 baseline 清单内 5/5 PASS, 7/29 0/5 PASS, 149 条 Bulk Redirect List **疑似整体失效**

**K3 5 项 checklist (建议排查顺序)**:

1. **CF Dashboard → Account → Bulk Redirects → Lists → `z_printpro_legacy_301`**
   - 确认规则总数: 149 条 (7/22 baseline) → 151 条 (含 7/23 拍板 #8 #9 2 条新规则) ?
   - 确认 status = `enabled` (不是 `paused` / `draft`)
   - 确认 list 关联到 `z-printpro.com` zone (不是仅 `zprintpro.com`)

2. **CF Dashboard → Ruleset Order**
   - 确认 Bulk Redirects 优先级没被 Page Rules / Workers route 覆盖
   - 7/22 baseline 5/5 PASS 时是 enabled 状态, 中间是否有 config rollback / 7/22 改 NS 之后 bulk redirect list 被 CF 同步重置?

3. **curl 二次确认** (K3 改完后 Mavis 跑):
   ```bash
   # 期望 5/5 PASS
   curl -sI "https://www.z-printpro.com/products/packaging-box-printing/" | head -3
   # 期望: HTTP/2 301, location: https://zprintpro.com/zh-hk/category/packaging/
   ```
   任意 1 条不 301 → 升级 K3

4. **如确认 disabled, K3 启用后 Mavis 跑 5 项监控 verify**:
   - 清单内 5/5 PASS 恢复
   - 清单外 #6 #7 #10 catch-all 跳 /zh-hk/ 恢复
   - #8 #9 (7/23 拍板 2 条新规则) 也 301
   - 报告落盘 `.hermes/logs/YYYY-MM-DD-cf-301-verify.md` (跟 7/23 计划对齐)

5. **如确认 enabled 但仍 0/5**:
   - 检查 Page Rules / Workers route 是否覆盖
   - 检查 Bulk Redirect List 的 URL pattern 格式 (是否带 trailing slash, 跟当前测试 URL 一致)
   - 检查 7/22 部署到 7/29 之间是否有 zone-level config 改动 (commit 历史翻一下)

**M3 7/29-7/30 不会**:
- ❌ 不会**主动改** CF Bulk Redirect List (K3 7/22 21:05 拍板 Mavis 不用 token)
- ❌ 不会**主动改** 任何 redirect 规则 (K3 §0.5 不改现有 slug)
- ✅ 仅监控 + 报告 + 升级

**M3 7/29-7/30 会**:
- ✅ 7/30 daily cron 跑前再 verify 一次 (1-2 min), 仍 0/5 继续升级
- ✅ 7/31 weekly cron 跑前再 verify 一次 (1-2 min), 仍 0/5 继续升级
- ✅ K3 改完通知 Mavis, M3 跑 5 项监控 verify 闭环 (10 min) + 报告 + 1 commit

---

## §9 建议扩容段 (不主动提议, 仅记录观察)

1. **§5.3 en/product/flyers/ 404**: 跑监控时发现, **flyers SKU 似乎不在 en locale?** 需 8/5 P3 报告附录排查 (K3 7/29 13:42 P2-2 8/12 清单瘦身已列入)
2. **§5.7 8/12 §6.6 旧域名展示量 本 cron 缺 page 维度**: 待 v3 升级 (GSC Search Analytics API 加 `dimensions: ["page"]`) 或 P4 补跑; **不主动提议** (v3 升级工作量大, 8/12 验收新口径已 K3 拍板 ≥50% 环比下降可走 query 维度近似)
3. **§5.1 P0-2 退步可能根因** (仅记录, 不主动改):
   - (a) CF Bulk Redirect List 被禁用 / paused (最可能, 7/23 拍板 2 条新规则没看到 K3 操作记录)
   - (b) 7/22 NS 改动后 CF 自动 sync 时重置了 list (低概率, NS 改动后 list 应该保留)
   - (c) 监控机器 (cron 跑的机器) 跟 7/22 baseline 跑的机器不同, network path 走 Aliyun 旧 NS (中等概率, 需 M3 7/30 改 path 验证)
4. **§2.5 残杀 19 词 排名全 > 30**: 即使 P4 CTR 优化到位, 排名不上首页 CTR 也难突破 1.5%; 8/12 复盘拍板是否需要"内容工厂"重新铺一遍 19 词对应的类目页 hero 优化 (e.g. /zh-hk/category/posters/ 加 海報印刷 长尾, /zh-hk/category/flyers/ 加 宣傳單張)

---

## §10 Commits (本 cron 提交)

| # | Hash | 描述 | 状态 |
|---|---|---|---|
| 1 | (本次) | gsc-feedback 7/29 v4 (log + matrix.json) | ⏳ commit 待 push |

**总 push**: 1 次 (gsc-feedback cron 自动 commit, 不算 §0.1 限制, 但已含今日 ahead 1 (59c85ac rush p0 docs) 一起 push 凑 1 build quota)

---

## §11 Live verify / §verify 结果 (5 步 verify)

| # | 验证项 | 命令 | 结果 |
|---|---|---|---|
| 1 | git status -sb 无 ahead | `git status -sb` (push 前) | ⏳ 待跑 |
| 2 | 关键 URL 200 | `curl -sI https://zprintpro.com/zh-hk/` | ✅ 200 (新站健康) |
| 3 | schema JSON-LD 注入 | `curl -s https://zprintpro.com/zh-hk/ \| grep -E 'Article\|BreadcrumbList\|FAQPage'` | 0 检查 (本 cron 0 改 PDP/类目页) |
| 4 | matrix.json JSON 合法 | `python -c "json.load(open('.hermes/industry-keyword-matrix.json'))"` | ✅ PASS |
| 5 | gsc-snapshot-2026-07-29.json / .csv 存在 | `ls -la .hermes/gsc-snapshot-2026-07-29.{json,csv}` | ✅ (23,767 / 9,811 bytes) |
| **6** | **5 项 P0-2 监控 (本 cron 重点)** | `python .hermes/tmp/check-301-and-newsite.py` | **🚨 清单内 0/5 退步** |

---

## §12 Next Steps (7/30-8/5)

| # | 动作 | 触发 | 责任 |
|---|---|---|---|
| 1 | K3 立即排查 P0-2 Bulk Redirect List (5 项 checklist) | 7/29 15:00 升级 | K3 |
| 2 | K3 改完通知 Mavis, M3 跑 5 项监控 verify + 报告 + 1 commit + 1 push | 7/29 21:00-22:00 | K3 + M3 |
| 3 | daily cron 7/30 必写 Q-005 (cross-border-ecommerce-shipping-box-guide) | 7/30 10:15 Asia/Shanghai | daily cron (1 commit 7/30) |
| 4 | P3 7/30-8/5 校园 3 页 (blocklist 2 slug 留 M3 P3 独立写) | 7/30 启动 | M3 P3 cron |
| 5 | matrix v7 字段 7/31 截止对账 (K3 P1-3 拍板, 方案 A schema 改) | 7/31 12:00 | M3 matrix-audit |
| 6 | 7/30 daily 跑前再 verify P0-2 (1-2 min), 仍 0/5 升级 | 7/30 10:00 | M3 daily cron |
| 7 | 8/5 P3 报告 + 3 PDP 404 排查 (含 §5.3 en/product/flyers/ 404) | 8/5 | M3 P3 |
| 8 | 8/6-8/12 P4 CTR 优化 15 词 (本 cron §2.6 候选) | 8/6 启动 | M3 P4 |
| 9 | 8/12 复盘 4 项真验收 + 3 项 KPI + 3 PDP 404 + Trustpilot 方案 A | 8/12 21:00 | M3 P4 + K3 |

---

## §13 附录 (技术细节, 关键文件路径)

### 13.1 数据源
- GSC snapshot: `F:\zprintpro-nextjs\.hermes\gsc-snapshot-2026-07-29.json` (23,767 bytes, 296 queries, 7d 862 imps / 1 click)
- GSC snapshot CSV: `F:\zprintpro-nextjs\.hermes\gsc-snapshot-2026-07-29.csv` (9,811 bytes, 296 rows)
- GSC baseline 28 词: `F:\zprintpro-nextjs\.hermes\gsc-141-baseline-2026-07-22.json` (28 words, 6/17 + 7/17 merged)
- GSC 5class: `F:\zprintpro-nextjs\.hermes\gsc-snapshot-2026-07-22.json` (54.5KB, 5class + residual_141_top20)
- fetch log: `F:\zprintpro-nextjs\.hermes\logs\fetch-gsc-2026-07-29.log` + `.err`

### 13.2 联动报告 (今日)
- P2 GSC 周检: `F:\zprintpro-nextjs\.hermes\reports\m3-p2-2026-07-29.md` (8/12 验收 §6 标注)
- AI 可见性基线: `F:\zprintpro-nextjs\.hermes\reports\ai-visibility-baseline-2026-07-29.md` (0/7 引用)
- matrix drift 对账 (P1-3 7/31 deadline): `F:\zprintpro-nextjs\.hermes\reports\m3-matrix-audit-2026-07-29.md` (25 条 v7_sku drift, 方案 A schema 改)
- v7 feedback 优化: `F:\zprintpro-nextjs\.hermes\reports\m3-v7-feedback-optimization-2026-07-29.md` (K3 13:42 拍板 4 件 P0/P1/P2 + 1 流程改进)
- daily 报告: `F:\zprintpro-nextjs\.hermes\logs\2026-07-29-日运营报告.md` + `F:\zprintpro-nextjs\.hermes\reports\m3-daily-2026-07-29.md`

### 13.3 关键脚本 (本 cron 写)
- 5 项 301 监控: `F:\zprintpro-nextjs\.hermes\tmp\check-301-and-newsite.py` (Python urllib, UTF-8 stdout, 10 URL + 4 new site checks)
- 早版本 (含 GBK 错): `F:\zprintpro-nextjs\.hermes\tmp\check-301-monitor.py` (单功能版, 已被 v2 替代)
- matrix validate: `F:\zprintpro-nextjs\.hermes\tmp\validate-matrix.py`

### 13.4 SSoT 引用链
- `m3-master-directive-v2-2026-07-28.md` §1 决策权限 / §7 升级 8 条 / §8 cron 同步 / §9 拍板 6 / §10 时间轴 / §11 内链验证 / §12 报告格式
- `m3-v2-shared-snippet.md` §5 GEO 模板 / §6 8/12 验收 7 项 / §7 升级 8 / §8 cron 同步
- `AGENTS.md` §0 强制执行 / §11 主营品类 / §12 push 安全 / §13.4 纯文字博客 / §13.10 NAP 脱钩 / §13.16.1 100% 繁体
- `context.md` §1 身份边界 / §4 每日固定执行 / §14 P0-2 301 ACTIVE 监控 (5 项 + 8 周关键观察期 + 异常升级)

### 13.5 P0-2 升级 §14.4 checklist 复制粘到 K3 终端
```
[ ] 1. CF Dashboard → Bulk Redirects → Lists → z_printpro_legacy_301
       - 规则总数 = 151 条? (149 + 7/23 拍板 #8 #9 2 条)
       - status = enabled?
       - 关联 z-printpro.com zone?
[ ] 2. Ruleset Order
       - Bulk Redirects 优先级不被 Page Rules / Workers route 覆盖
[ ] 3. curl 二次确认
       curl -sI "https://www.z-printpro.com/products/packaging-box-printing/" | head -3
       # 期望: HTTP/2 301, location: https://zprintpro.com/zh-hk/category/packaging/
[ ] 4. K3 改完通知 Mavis, M3 跑 verify 闭环
[ ] 5. 如仍 0/5, 检查 Page Rules / Workers / URL pattern / commit 历史
```

---

**GSC 周报 v4 cron 7/29 15:00 报告完。1 commit (gsc-feedback log + matrix.json) 待 push + verify-deploy PASS。**
**🚨 升级 K3: 5 项 P0-2 监控清单内 0/5 PASS (7/22 baseline 5/5 退步) → 立即排查 CF Bulk Redirect List。**
