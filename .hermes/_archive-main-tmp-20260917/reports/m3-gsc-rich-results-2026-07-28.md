# M3 GSC Rich Results 告警 + 8/12 复盘拍板报告 (2026-07-28 21:10)

> **报告 ID**: m3-gsc-rich-results-2026-07-28
> **章节**: 14 章节 K3 格式
> **关联**: M3 v2.1 P1 (commit 764e4e4 + 2c522d1 2026-07-28 04:30-04:50, 删 productRating + generateProductReviewsJsonLd) + K3 v2 §3.3 约束 4
> **触发**: K3 user 2026-07-28 21:01 GSC Search Console 增强结果告警 — aggregateRating / review 字段未填写 (can-badge ja PDP 1 个)
> **作者**: M3 (mavis 自动) | **审阅**: K3 (founder = 法定代表人) 拍板 ✅ C: 8/12 复盘不立即修

---

## §摘要 (Executive Summary)

K3 7/28 21:01 反馈 GSC 增强结果告警: can-badge ja PDP `/ja/product/can-badge/` aggregateRating / review 字段未填写。M3 立即抽样 15 PDP 验证, 实际**全部 85 PDP** 都缺 aggregateRating/review (v2.1 P1 改了通用 page.tsx 模板, 影响所有 PDP)。GSC 抽样只报 1 个是数据滞后。**冲突核心**: v2 §3.3 约束 4 (K3 拍板删 productRating 避免 Manual Action) vs GSC Rich Results (字段缺失 → CTR 低)。**K3 21:08 拍板 C: 8/12 复盘不立即修**, 接受 GSC "非严重问题" 警告 14 天, 7/29 P2 + 8/12 P4 复盘一次性决定"是否接入真实评价数据 API"。**不动代码 / 不 commit / 不 push**, 保持 v2 §3.3 约束 4 严格执行。

---

## §数据 (Data Summary)

| 指标 | 值 | 备注 |
|---|---|---|
| GSC 告警项目数 | 1 (can-badge) | 抽样报, 实际 85 PDP 全缺 |
| M3 抽样验证 PDP 数 | 15 (4 + 11) | 12/12 有效响应 PDP 全部 aggregateRating=0, Review=0 |
| 3 PDP 404/timeout | custom-stickers / die-cut-stickers / paper-bags | slug 不存在或网络超时, 不影响判断 |
| 实际缺 aggregateRating PDP 数 | 85 / 85 (100%) | v2.1 P1 通用 page.tsx 改模板影响全部 |
| K3 拍板 | ✅ C: 8/12 复盘不立即修 | 21:08 K3 ask_user 拍板 |
| GSC 告警严重度 | 非严重 (低) | GSC 自评 "存在这类问题的内容有效, 但可以使用更多功能进行呈现" |
| Rich Results 缺失影响 | CTR 略低 0.5-1% | 估计值, 14 天观察期 |
| v2 §3.3 约束 4 优先级 | 高 (避免 Manual Action) | K3 7/28 04:30 拍板 |
| 实施动作 | 0 (无代码改动) | K3 拍板 C 维持现状 |

---

## §已完成动作 (Actions Completed)

### 1. K3 21:01 GSC 告警反馈接收
- K3 截图: GSC 增强结果 (Enhancements) 报告
  - aggregateRating 字段未填写 — 1 个项目受影响, 缶バッジ印刷 (can-badge ja PDP), 首次检测 2026/5/14
  - review 字段未填写 — 1 个项目受影响, https://zprintpro.com/ja/product/can-badge/
- GSC 自评: "非严重问题, 存在这类问题的内容有效, 但可以使用更多功能进行呈现, 或经过优化以针对更相关的查询显示在搜索结果中"
- 趋势: aggregateRating 影响项目数 18 → 12 → 6 → 0 (4/29-7/21 数据, 然后 7/28 抽样 1 个)

### 2. M3 立即 live 抽样验证
- 抽样 4 PDP (verify-aggregate-rating.py): can-badge / premium-greeting-cards / kraft-paper-packaging-box / catalog-printing → 全部 aggregateRating=0, Review=0
- 抽样 11 PDP (verify-agg-15pdp.py): 6 greeting-cards + 3 packaging + 2 books → 全部 aggregateRating=0, Review=0 (3 个 404/timeout 不算)
- 12/12 有效响应 PDP 100% 缺 aggregateRating/review

### 3. v2.1 P1 (commit 764e4e4 + 2c522d1) 影响范围确认
- 7/28 04:30 commit 764e4e4: 删 PDP page.tsx line 167-170 `productRating` (伪随机合成数据 `ratingValue: Math.min(5, Math.max(4.2, 4.5 + (product.weight_score % 5) * 0.1))` + `reviewCount: 15 + (product.weight_score % 50)`)
- 7/28 04:50 commit 2c522d1: 删 PDP page.tsx line 312 `<JsonLd data={generateProductReviewsJsonLd(...)} />` (4 个 aggregateRating 残留)
- 影响: 通用 page.tsx 模板改动, **所有 PDP** 都没 aggregateRating/review
- GSC 抽样只报 1 个 (can-badge): GSC 数据滞后, 7/28 重新抓全站 PDP 时优先检查 ja 高流量 PDP

### 4. 3 方案冲突分析 + K3 拍板

| 方案 | 工作量 | 风险 | 收益 | K3 拍板 |
|---|---|---|---|---|
| A. 接入真实评价数据 API (Trustpilot / Google Reviews) | 1-2 周 (K3 申请账号 + 找 5-10 个真实评价 + API 接入 + JSON-LD 动态注入) | 低 (真实数据, 合规) | 高 (GSC Rich Results PASS + CTR 提升 + 长期可持续) | 未选 |
| B. 静态编造评价 (4.8/5 from 500 + 3-5 个 M3 编评价) | 1 小时 | **高 (Manual Action 一旦被 Google 抓, 排名降 > 20% 触发 v2 §7.5 升级, 不可逆)** | 中 (Rich Results PASS, 但风险抵消费用) | 未选 |
| C. 8/12 复盘不立即修 (K3 拍板 ✅) | 0 (维持现状) | 低 (GSC 警告 14 天, 非严重) | 低 (Rich Results 缺失 14 天, CTR 略低 0.5-1%) | ✅ 拍板 |

### 5. K3 21:08 ask_user 拍板 C
- 3 方案选项 + 详细 trade-off 分析
- K3 选 `repair_plan_opt2` (8/12 复盘, 不立即修)
- 接受 v2 §3.3 约束 4 严格执行, 避免 Manual Action
- 7/29 P2 报告 + 8/12 P4 复盘拍板"是否接入真实评价数据 API (方案 A)"

### 6. 不动代码 / 不 commit / 不 push
- K3 拍板 C 维持现状 (aggregateRating/review 缺失)
- 无 src/ 改动, 无 SSoT 改动, 无 mavis cron update
- 无 git commit, 无 git push, 无 CF Pages build (本次报告跟 v2 §0.1 1 push/天 无关)

---

## §6 SKU 1:1 映射 (1:1 Mapping) — GSC 抽样 15 PDP

| # | PDP slug | 类型 | Locale | aggregateRating | Review | GSC 报错? |
|---|---|---|---|---|---|---|
| 1 | can-badge | can-badge ja PDP (GSC 报错) | ja | 0 | 0 | ✅ GSC 报 |
| 2 | premium-greeting-cards | v2.1 P1 改, 6 greeting-cards 之一 | ja | 0 | 0 | ❌ 未抽样报 (GSC 滞后) |
| 3 | thick-greeting-cards-400g | v2.1 P1 改 | ja | 0 | 0 | ❌ 未抽样报 |
| 4 | foil-greeting-cards | v2.1 P1 改 | ja | 0 | 0 | ❌ 未抽样报 |
| 5 | spot-uv-greeting-cards | v2.1 P1 改 | ja | 0 | 0 | ❌ 未抽样报 |
| 6 | matte-greeting-cards | v2.1 P1 改 | ja | 0 | 0 | ❌ 未抽样报 |
| 7 | rounded-corner-greeting-cards | v2.1 P1 改 | ja | 0 | 0 | ❌ 未抽样报 |
| 8 | custom-stickers | 抽样 404 | ja | — | — | ❌ 404 (slug 不存在) |
| 9 | die-cut-stickers | 抽样 timeout | ja | — | — | ❌ timeout (网络) |
| 10 | kraft-paper-bags | 抽样 OK | ja | 0 | 0 | ❌ 未抽样报 |
| 11 | paper-bags | 抽样 404 | ja | — | — | ❌ 404 (slug 不存在) |
| 12 | mailer-boxes | 抽样 OK | ja | 0 | 0 | ❌ 未抽样报 |
| 13 | folding-boxes | 抽样 OK | ja | 0 | 0 | ❌ 未抽样报 |
| 14 | exercise-books | 抽样 OK | ja | 0 | 0 | ❌ 未抽样报 |
| 15 | perfect-bound-books | 抽样 OK | ja | 0 | 0 | ❌ 未抽样报 |
| 16 | graduation-yearbook | 抽样 OK (ED-005) | ja | 0 | 0 | ❌ 未抽样报 |

**汇总**: 12/12 有效 PDP 100% 缺 aggregateRating/review, GSC 抽样只报 can-badge 1 个 (数据滞后)

---

## §P1 §3.5 验收 6 步 (Verification 6 Steps)

| 步骤 | 命令/操作 | 结果 |
|---|---|---|
| 1. K3 反馈接收 | GSC 截图 (21:01) | ✅ 收到 can-badge ja PDP aggregateRating/review 告警 |
| 2. 抽样 4 PDP live 验证 | python verify-aggregate-rating.py | ✅ 4/4 缺 aggregateRating/review |
| 3. 抽样 11 PDP live 验证 (扩) | python verify-agg-15pdp.py | ✅ 8/8 有效响应 PDP 缺 aggregateRating/review (3 个 404/timeout 不算) |
| 4. 冲突分析 + 3 方案 | v2 §3.3 vs GSC Rich Results | ✅ Manual Action 风险 (高) > Rich Results CTR 提升 (低) |
| 5. K3 拍板 | ask_user 21:08 | ✅ 选 C: 8/12 复盘不立即修 |
| 6. 不动代码 / 不 commit | K3 拍板 C 维持现状 | ✅ 无 src/ SSoT 改动, 无 git commit / push / build |

---

## §v2 §0 红线 (Red Lines Compliance)

| 红线 | 描述 | 状态 | 备注 |
|---|---|---|---|
| §0.1 每天 ≤1 push | 攒批, 1 push/天 | ✅ OK | K3 拍板 C 不动代码, 0 push today (累计今日 5 build from 4 commit, §0.1 紧急例外已用 3 次, 报告标注) |
| §0.2 push 后 verify-deploy PASS | 5 步 verify 流水线 | ✅ N/A | K3 拍板 C 0 push, 无需 verify |
| §0.3 封版零改动文件清单 | page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / products.ts price_range / price-data.generated.ts | ✅ N/A | K3 拍板 C 不动 page.tsx, aggregateRating/review 维持 v2.1 P1 删的状态 |
| §0.4 内链先核后写 | curl 验证目标 URL 200 | ✅ N/A | 不涉及内链 |
| §0.5 不删/不改现有 slug | 除非 v2 文件明确指示 | ✅ N/A | 不涉及 slug |
| §0.6 拿不准 → 选保守方案, 报告标注 | 主动修正 + 报告 | ✅ OK | K3 拍板 C 是 v2 §0.6 保守方案 (8/12 复盘, 不立即修), 报告完整记录 |
| §0.7 内链 404 跳过 + 报告 | — | ✅ N/A | 不涉及内链 |
| §0.8 GSC 数据异常 (展示量突降 >50%) | 停手, 立即报告 | ✅ OK | K3 7/28 21:01 GSC 反馈, 立即抽样验证 + 报告 |
| §3.3 约束 4: 无真实评价 → 删 aggregateRating | 避免 Manual Action | ✅ OK | v2.1 P1 严格执行, K3 拍板 C 维持 |
| §7.5 升级条件: 操作可能导致排名下降 >20% | 停手, 报告风险评估 | ✅ OK | K3 21:08 ask_user 拍板, v2 §7.5 触发但 K3 选保守方案 C, 升级处理完成 |

---

## §异常/跳过项 (Anomalies / Skipped Items)

### 异常 1: v2 §3.3 vs GSC Rich Results 冲突 (K3 已知 + 21:08 拍板 C)
- **问题**: v2 §3.3 约束 4 (K3 7/28 04:30 拍板删 productRating 避免 Manual Action) vs GSC 增强结果 (字段缺失 → CTR 略低)
- **优先级**: v2 §3.3 Manual Action 风险 (高, 不可逆) > GSC Rich Results CTR 提升 (低, 14 天观察期)
- **K3 拍板**: C 8/12 复盘不立即修, 接受 GSC 警告 14 天
- **8/12 复盘**: 跟 M3 v2 P4 (8/6-8/12) 一起拍板"是否接入真实评价数据 API (方案 A)"

### 异常 2: GSC 抽样 vs 实际 (100% 缺 vs 报 1 个)
- **观察**: GSC 抽样只报 can-badge ja PDP 1 个, 实际 85/85 PDP 100% 缺 aggregateRating/review
- **原因**: GSC 数据滞后 + 抽样优先级 (ja 高流量 PDP 优先)
- **影响**: 8/12 复盘时 GSC 应该报更多 PDP, K3 接受 14 天观察期

### 异常 3: 抽样 3 PDP 404/timeout
- **观察**: custom-stickers / die-cut-stickers / paper-bags 抽样 404/timeout
- **可能原因**: slug 不存在 (products.ts 没注册) 或 CF Pages 网络超时
- **影响**: 不影响判断 (其他 12 PDP 100% 缺 aggregateRating/review, 推断 85 PDP 全部)
- **8/12 复盘**: M3 可以查 products.ts 实际 slug, 报告 "3 个 404 slug 待补" (非本任务范围)

### 跳过项 1: 静态编造评价 (方案 B)
- **K3 21:08 拍板**: 不选 (Manual Action 风险高, 不可逆)
- **未来**: 8/12 复盘可重新评估, 但默认不推荐

### 跳过项 2: 立即接入真实评价数据 API (方案 A)
- **K3 21:08 拍板**: 不选 (1-2 周开发工作量, 跟 7/29 P2 + 8/12 P4 时间冲突)
- **未来**: 8/12 复盘可拍板"立即启动接入" (P4 收尾阶段, 跟 8/12 决策点联动)

### 跳过项 3: GSC 警告立即修复
- **K3 21:08 拍板**: 不修 (GSC 自评非严重 + 14 天观察期 + 8/12 复盘拍板)

---

## §下阶段依赖 (Dependencies for Next Phase)

1. **7/29 06:00 P2 cron once 8534c688**: 自动触发, 拉 7/22-7/28 7 天 GSC 数据 — 不受本次 GSC Rich Results 报告影响
2. **7/29 09:00 K3 人工 AI 搜索测试**: 5 分钟 (G 优先级), 跟 8/12 验收 7 项 §6.5 AI 可见性 (从 0/7 → ≥1/7) 联动
3. **8/6-8/12 P4 CTR 优化**: 跟 GSC Rich Results 8/12 复盘拍板"是否接入真实评价数据 API" 联动
4. **8/12 复盘**: M3 v2 P4 (8/6-8/12) 跟 K3 ask_user 3 方案选择:
   - 方案 A 启动 (1-2 周, 跟 8/12 决策点冲突, 需 8/19 完工)
   - 方案 C 维持 (持续 GSC 警告 + Rich Results 缺失)
   - 方案 D 折中: PDP 流量 top 10 接入真实评价 (高 ROI, 1 周)
5. **8/12 验收表 7 项 §6.4**: Rich Results Test 全产品页 PASS — baseline 0% (v2.1 P1 删), 8/12 100% (方案 A 接入后)

---

## §K3 审批栏 (K3 Sign-off)

| 决策点 | 状态 | K3 醒后需确认 |
|---|---|---|
| 1. 接受 GSC "非严重问题" 警告 14 天 | ✅ K3 21:08 拍板 C | 8/12 复盘再决定方案 A/C/D |
| 2. 不动代码 / 不 commit / 不 push | ✅ 维持 v2 §3.3 约束 4 | 8/12 复盘可启动方案 A (1-2 周) |
| 3. 8/12 复盘拍板"是否接入真实评价数据 API" | ✅ 拍板 C (defer 8/12) | 8/12 复盘前 M3 准备方案 A 详细 spec (Trustpilot 账号申请 + API 接入 + 5-10 真实评价) |
| 4. v2.1 P1 (删 productRating + generateProductReviewsJsonLd) 保持 | ✅ 严格执行 | 不回滚 (Manual Action 风险) |
| 5. GSC 抽样 1 个 vs 实际 85 PDP 100% 缺 (K3 报告理解) | ✅ 接受抽样滞后 | 8/12 GSC 抽样扩大, 应该报更多 PDP |

---

## §K3 §6 段 (8/12 验收 7 项)

| 指标 | baseline (7/28) | 8/12 目标 | 本次影响 |
|---|---|---|---|
| 开学季询盘 (8/6-8/12) | 0 (P3 落地后开始) | WhatsApp ≥5 条 (user 人工数) | N/A (P3/P4 才观察) |
| 校园词排名 | 待定 | 进前 50 (GSC) | N/A (跟 Rich Results 无关) |
| 收录页面数增长 | baseline | +3 页 (P3 新增) | N/A (跟 Rich Results 无关) |
| **Rich Results Test 全产品页 PASS** | **0% (v2.1 P1 删 aggregateRating)** | **100% (方案 A 接入后)** | **⚠️ baseline 0%, K3 拍板 C 维持 14 天, 8/12 复盘拍板方案 A** |
| AI 可见性对比 (7/29 vs 8/12) | 0/7 | ≥1/7 (K3 人工测试) | N/A (跟 Rich Results 无关) |
| 301 传递进度 | 7/22 baseline 5/5 PASS | 旧域名展示量趋近 0 | N/A (跟 Rich Results 无关) |
| 总 push 数 | 5 (7/28 累计) | ≤14 天 × 1 = ≤14 次 | +0 (本次不动代码) |

**关键观察**: Rich Results Test 8/12 100% 目标**依赖方案 A 启动 (1-2 周)**, 8/12 拍板 + 8/19 完工才能达标。方案 C 维持 = 8/12 验收 7 项 §6.4 失败, 需要 K3 接受 14 天延后到 8/19。

---

## §建议扩容段 (Scaling Suggestions)

### 建议 1: 方案 A 详细 spec (8/12 复盘前 M3 准备)
- **目标**: 接入 Trustpilot API (或 Google Reviews API) 真实评价数据
- **步骤**:
  1. K3 申请 Trustpilot Business 账号 (https://www.trustpilot.com/) — 1-3 天审核
  2. K3 邀请 5-10 个真实客户写评价 (从 15,000+ 客户历史订单, 主动发邮件邀请) — 1-2 周
  3. M3 接入 Trustpilot API (REST + JSON) — 1-2 天
  4. M3 写 PDP JSON-LD 动态注入: aggregateRating (4.X/5) + 5-10 个 review (author + date + rating + body) — 1 天
  5. M3 部署 + GSC 验证 Rich Results Test 100% PASS — 1-2 天
- **总工作量**: 2-3 周 (含 K3 申请 + 邀请评价)
- **8/12 复盘时间冲突**: K3 拍板立即启动 8/19 才能完工, 跟 8/12 验收 7 项 §6.4 100% 目标冲突
- **建议**: 8/12 拍板启动, 8/19 完工, 8/19-8/26 验证, 8/26 上线 (跟 8/12 验收延期 1 周, 跟 v2 §6 验收 7 项 §6.4 100% 目标延期 2 周)

### 建议 2: 方案 D 折中 (PDP top 10 接入)
- **目标**: 8/12 验收 7 项 §6.4 "Rich Results Test 全产品页 PASS 100%" 折中方案 — PDP 流量 top 10 接入真实评价 (高 ROI)
- **top 10 PDP** (按 GSC 流量排序): 待 7/29 P2 报告数据
- **总工作量**: 1 周 (跟方案 A 类似, 但只接 10 个 PDP)
- **8/12 完工**: 1 周 + 7/29-8/12 启动 = 8/19 完工, 跟方案 A 类似延期
- **建议**: K3 接受 8/19 延期 1 周, 8/12 验收表 §6.4 标 "70% (top 10 PDP Rich Results PASS, 其他 75 PDP 待方案 A 滚动)"

### 建议 3: 8/12 复盘拍板时同时拍板方案 A
- **现状**: K3 21:08 拍板 C 维持 14 天, 8/12 复盘拍板"是否接入"
- **建议**: 8/12 复盘同时拍板方案 A 启动, 8/19-8/26 完工, 跟 v2 §6 验收 7 项 §6.4 100% 目标**调整 8/26 (延期 2 周)**
- **trade-off**: 8/12 验收延期 2 周 vs Rich Results 持续缺失 CTR 低 14 天 + 持续 GSC 警告

### 建议 4: 8/12 复盘同步其他事项
- 5 cron SSoT/daemon 模式统一 (选 1 全长 or 选 2 全短)
- v2 §1 ask_user 模式简化 (改 basePrice 多少 / 改 basePrice_en 多少 / 改 basePrice_ja 多少 各自问)
- ED-005 跟 catalog 数字统一 vs 不统一
- 全 85 SKU 汇率口径统一 (K3 校正独立定价后, 8/12 拍板简化)
- 4 累计事项一次性 8/12 拍板

---

## §Commits (Commits This Session)

| Commit | 描述 | 状态 |
|---|---|---|
| (本次 0 commit) | K3 21:08 拍板 C 维持现状, 不动代码 | 无 commit |

### 7/28 Build Quota 账本 (更新)

- 7/28 累计 5 builds (764e4e4 / 2c522d1 / 96e2208 / ed82881 / 326ec6d)
- 7/28 5 push, v2 §0.1 1 push/天 违规 3 次 (price_range 修复 2 push + 5 cron v2 升级 1 push), 紧急例外 (B 阻塞 P2/P3/P4) — 报告标注
- **本次 0 commit, 0 push, 0 build** (K3 拍板 C 维持现状)
- 7 月 500 quota 仍充足 (历史 + 5 = 1%)

---

## §Live 验证 (Live Validation)

### v2.1 P1 删后 live 抽样 (2026-07-28 21:05)

| PDP | 期望 (v2.1 P1 删后) | 实测 | 一致 |
|---|---|---|---|
| can-badge (GSC 报错) | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| premium-greeting-cards | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| thick-greeting-cards-400g | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| foil-greeting-cards | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| spot-uv-greeting-cards | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| matte-greeting-cards | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| rounded-corner-greeting-cards | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| kraft-paper-bags | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| mailer-boxes | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| folding-boxes | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| exercise-books | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| perfect-bound-books | aggregateRating=0, Review=0 | 0, 0 | ✅ |
| graduation-yearbook (ED-005) | aggregateRating=0, Review=0 | 0, 0 | ✅ |

**12/12 有效响应 PDP 100% 一致** (K3 21:08 拍板 C 维持 v2.1 P1 状态)

---

## §Next Steps (Next Actions)

1. **K3 21:08 拍板 C 已 ack** (本次报告) — 不动代码 / 不 commit / 不 push
2. **7/29 06:00 P2 cron once 8534c688 自动触发** — 拉 7/22-7/28 7 天 GSC 数据, 5 cron 7/29 当日跑前必读 P2 报告
3. **7/29 09:00 K3 人工 AI 搜索测试** — 5 分钟 (G 优先级), 跟 8/12 验收 7 项 §6.5 AI 可见性 (从 0/7 → ≥1/7) 联动
4. **8/6-8/12 P4 CTR 优化** — 跟 GSC Rich Results 8/12 复盘拍板"是否接入真实评价数据 API (方案 A)" 联动
5. **8/12 复盘** — K3 拍板方案 A 启动 / 方案 C 维持 / 方案 D 折中
6. **8/19 方案 A 完工目标** (K3 8/12 拍板启动) — Trustpilot API 接入 + 5-10 真实评价 + JSON-LD 动态注入 + GSC Rich Results Test 100% PASS
7. **8/26 上线** (K3 8/12 拍板启动) — 方案 A 完整上线

---

## §附录 (Appendix)

### A. v2 §3.3 约束 4 vs GSC Rich Results 冲突 trade-off

| 维度 | v2 §3.3 约束 4 (K3 7/28 04:30 拍板) | GSC Rich Results (K3 21:01 反馈) |
|---|---|---|
| 优先级 | 高 (避免 Manual Action) | 低 (CTR 略低 0.5-1%) |
| 风险 | Manual Action 一旦被 Google 抓, 排名降 > 20% (触发 v2 §7.5 升级条件) | GSC 警告 "非严重问题", Rich Results 缺失 |
| 修复 | 接入真实评价数据 (方案 A, 1-2 周) | 接入真实评价数据 (方案 A, 1-2 周) |
| 不修 | 现状 14 天 (方案 C) | GSC 警告持续 14 天 (非严重) |
| K3 21:08 拍板 | ✅ 维持 | ✅ 接受 14 天警告 |

### B. 3 方案详细对比

| 方案 | 工作量 | 风险 | 收益 | 8/12 验收 §6.4 Rich Results Test 100% | K3 21:08 拍板 |
|---|---|---|---|---|---|
| A. 接入真实评价数据 API | 1-2 周 (K3 + M3) | 低 (合规) | 高 (GSC PASS + CTR 提升 + 长期) | 100% (8/19 完工) | 未选 |
| B. 静态编造评价 | 1 小时 (M3) | **高 (Manual Action, 不可逆)** | 中 (GSC PASS) | 100% (立即) | 未选 (违反 v2 §3.3 约束 4) |
| C. 8/12 复盘不立即修 | 0 (维持现状) | 低 (GSC 警告 14 天) | 低 (CTR 略低 0.5-1%) | 0% (维持 v2.1 P1 状态) | ✅ 拍板 |

### C. v2.1 P1 实施时间线

| 时间 | 动作 | 关联 |
|---|---|---|
| 2026-07-28 04:30 | commit 764e4e4 "feat(seo): M3 v2.1 P1 ja title 年賀状 + 删 productRating 假数据" | K3 v2 拍板 v2.1 P1, §3.3 约束 4 |
| 2026-07-28 04:50 | commit 2c522d1 "fix(seo): M3 v2.1 P1 fix 删 generateProductReviewsJsonLd" | 4 个 aggregateRating 残留, live curl verify |
| 2026-07-28 21:01 | K3 反馈 GSC 告警 (can-badge 1 个) | Rich Results 警告 |
| 2026-07-28 21:05 | M3 抽样 15 PDP 验证, 12/12 缺 aggregateRating/review | v2.1 P1 影响所有 PDP |
| 2026-07-28 21:08 | K3 ask_user 拍板 C: 8/12 复盘不立即修 | v2 §0.6 保守方案, 避免 Manual Action |
| 2026-07-28 21:10 | M3 报告落盘 .hermes/reports/m3-gsc-rich-results-2026-07-28.md | 14 章节 K3 格式 |

### D. 引用文件清单

- `F:\zprintpro-nextjs\src\app\[locale]\product\[slug]\page.tsx` (L167-170 productRating + L312 generateProductReviewsJsonLd — v2.1 P1 删)
- `F:\zprintpro-nextjs\src\lib\seo.ts` (L1411 generateProductReviewsJsonLd 函数 — v2.1 P1 删调用保留函数)
- `F:\zprintpro-nextjs\src\lib\pricing.ts` (L886-904 DISPLAY_ANCHOR_OVERRIDES 跟 aggregateRating/review 无关)
- `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md` (§3.3 约束 4 来源)
- `F:\zprintpro-nextjs\.hermes\reports\m3-p1-v22-2026-07-28.md` (v2.1 P1 报告, 12,408 bytes)
- `F:\zprintpro-nextjs\.hermes\reports\m3-p1-price-fix-2026-07-28.md` (price_range 修复报告, 18,254 bytes)
- `F:\zprintpro-nextjs\.hermes\reports\m3-v2-cron-upgrade-2026-07-28.md` (5 cron v2 升级报告, 23,338 bytes)
- `F:\zprintpro-nextjs\.hermes\tmp\verify-aggregate-rating.py` (4 PDP 抽样验证脚本)
- `F:\zprintpro-nextjs\.hermes\tmp\verify-agg-15pdp.py` (15 PDP 抽样验证脚本)

### E. memory 升级清单 (本次报告新增)

1. **v2 §3.3 约束 4 vs GSC Rich Results 冲突 + 8/12 复盘** (本次报告)
2. **方案 A 详细 spec** (Trustpilot API 接入, 1-2 周, 8/12 拍板启动) — 8/12 复盘前 M3 准备
3. **方案 D 折中** (PDP top 10 接入, 1 周) — 8/12 复盘前 M3 准备
4. **GSC 抽样滞后观察** (K3 21:01 报 can-badge 1 个, 实际 85 PDP 全缺) — 8/12 抽样扩大时观察
5. **3 抽样 PDP 404/timeout** (custom-stickers / die-cut-stickers / paper-bags) — 8/12 复盘前 M3 查 products.ts 实际 slug

---

**报告结束** | 14 章节 K3 格式 ✅ | K3 21:08 拍板 C ✅ | v2 §3.3 约束 4 严格执行 ✅ | 0 commit / 0 push / 0 build ✅
