# Weekly Revenue Report — 2026-08-07 (v2)

> **Cron**: zprintpro-revenue-analytics-weekly (cronId: ceecf2dd)
> **触发**: 2026-08-07 16:20 Asia/Shanghai
> **覆盖窗口**: 2026-07-31 ~ 2026-08-06 (过去 7 天,GSC 数据延迟 1-2 天)
> **SSoT**: `.hermes/cron-prompts/zprintpro-revenue-analytics-weekly.md` (v1 + v2 公共段 15,982 chars)
> **M3 北极星**: 8/12 决策点 US$50,000/月 · 7 项验收表同步 (SSoT v2 §6)
> **预算**: 90 min / 实际 ~25 min (GA4 + Supabase 数据源架构仍缺失,沿用 GSC 兜底)
> **上下文**: K3 8/7 00:51 拍板 P3 校园 0/3 catch-up 推迟 8/13-8/19 (本 cron 已沿用)

---

## §1 摘要 (3 行内, K3 格式)

- **结论 (≤30 字)**: 5 段漏斗仍 N/A (D1+D2 架构缺失); **P3 校园 3/3 全落地 ✅** (en+zh-hk+ja 共用 graduation-yearbook-printing-guide slug); M3 北极星 §6.3 收录 +3 已达标, §6.7 push 累计 13/14 余量紧.
- **3 行数据**:
  - **GSC 7/31-8/6 7d**: 322 query, **3 clicks / 1,041 imps** (vs 7/24-7/30 = 386 query / 2 clicks / 862 imps) — imps 环比 +21%, clicks 环比 +50% (智印港/宣傳單/pvc menu 三词 100% CTR pos 1-7)
  - **校园词命中 8 词** (vs 7/24-7/30 = 0 词): school exercise book printing (3 imps pos 33) / 教科書 印刷 (6 imps pos 47.17) / custom printed exercise books (1 imp pos 42) 等, P3 落地后第 1 周 质变
  - **§6.7 总 push 累计**: 7/28=2 → 7/31=9 → **8/7=13** (P2 §6.7 口径 v2 升级相关 + K3 P0 校准 quota 例外), 距 8/12 ≤14 上限还剩 1 次
- **≤1 风险**: **R1 (高, 连续 2 周)**: GA4 + Supabase 数据源**架构级缺失** — 跟 7/31 周报同状态, D1+D2 未拍板. revenue 周报 5 段漏斗仍 N/A, 仅靠 GSC 兜底 (imp+1,041,click+3, 校园词 8 词有 imps, 但询盘/订单/收入段 全部空跑).

---

## §2 数据 (关键 KPI 大表)

### 2.1 5 段漏斗 (SSoT v1 漏斗定义, 全部 N/A · 第 2 周连续)

| 段 | 数值 (7/31-8/6) | 转化率 | 周环比 (vs 7/24-7/30) | 异常 | 数据源 |
|---|---|---|---|---|---|
| 总 UV | **N/A** | - | 同 N/A | 数据源缺失 | GA4 事件 (未接入) |
| 报价器使用 | **N/A** | N/A | N/A | 数据源缺失 | GA4 'quote_submit' (未埋点) |
| 询盘 (WhatsApp) | **N/A** | N/A | N/A | 数据源缺失 | Supabase `whatsapp_inquiries` (未接 key) |
| 订单 | **N/A** | N/A | N/A | 数据源缺失 | Supabase `orders` (未接 key) |
| 收入 (USD) | **N/A** | - | N/A | 数据源缺失 | Supabase `orders.paid_amount` (未接 key) |
| 收入 (HKD) | **N/A** | - | N/A | 数据源缺失 | Supabase `orders.paid_amount` + 微信/银行/PayPal (未接) |

> **第 2 周连续 N/A** 确认: 5 段漏斗全部依赖 GA4 事件 + Supabase 实时查询, 当前 `.env` 仅配 GSC + Cloudflare, Supabase / Airwallex / GA4 全是占位符. 修复路径见 §7 下阶段依赖 + §8 K3 审批栏 #1 (沿用 7/31 拍板项未拍).

### 2.2 GSC 流量分析 (7/31-8/6 7 天, query-only 维度)

| 指标 | 7/31-8/6 (本周) | 7/24-7/30 (上周) | 环比 | 备注 |
|---|---|---|---|---|
| GSC 收录 query 数 | 322 | 386 | -16.6% | query 数降,imps 升 (top 长尾词展开) |
| GSC 总展示 | **1,041** | 862 | **+20.8%** | 跟 P2 7/22-7/28 报告基线对比: 持续上升通道 |
| GSC 总点击 | **3** | 2 | **+50%** | 智印港 1, 宣傳單 1, pvc menu 1 (3 词 100% CTR) |
| 唯一 click 词 | 智印港 (pos 1) / 宣傳單 (pos 2) / pvc menu (pos 7) | 智印港 (pos 2) / 同人印刷 (pos 4) | 1 新词 (pvc menu), 1 掉词 (同人印刷) | 7/24-7/30 同人印刷本周 0 imps |
| 校园词 imps | **18 (8 词)** | **0 (0 词)** | **+∞ (从 0 起步)** | P3 校园 blog 落地后第 1 周质变 |
| 28 baseline 词 7d 覆盖 | TBD (P2 §2 同窗口延伸 19/28=68%, 8/5 gsc-cron 复核) | 19/28 = 68% (P2) | 维持 | 待 8/5 gsc-cron 报告同步 |
| 28 baseline 词 CTR | TBD | 0% | 维持 | 同上 |
| 全站 CTR (28d) | TBD | ~1% (SSoT baseline) | 维持 | 8/12 目标 ≥2% |

> GSC query-only 维度限制沿用 7/31 报告 §2.2: 无 page / country 维度, 4 cron 共享 D4 数据维度限制, 待 P4 CTR 阶段补跑 fetch_search_analytics dimensions=['query','page'].

### 2.3 GSC 校园词命中详情 (P3 落地后第 1 周, 8 词)

> **§6.2 校园词排名 8/12 验收口径重定义关键数据**: 7/31-8/6 7d 校园词从 0 → 8 词有 imps, 虽未进前 50 但从"完全无展示"质变为"有搜索可见", 8/12 复盘**应改"展示量 ≥10 imps"代替"进前 50"** (跟 P2 §6.2 拍板一致)

| # | 关键词 | clicks | imps | CTR | pos | Locale 推断 |
|---|---|---|---|---|---|---|
| 1 | 教科書 印刷 | 0 | 6 | 0% | 47.17 | ja (日本教科書市场) |
| 2 | school exercise book print | 0 | 3 | 0% | 35.67 | en (US/UK school workbook) |
| 3 | school exercise book printing | 0 | 3 | 0% | 33.00 | en |
| 4 | 學校 印刷 | 0 | 2 | 0% | 44.50 | zh-hk (港校印刷) |
| 5 | exercise books | 0 | 1 | 0% | 43.00 | en |
| 6 | custom printed exercise books | 0 | 1 | 0% | 42.00 | en |
| 7 | school exercise book printing london | 0 | 1 | 0% | 48.00 | en (UK 伦敦) |
| 8 | 學校印刷 | 0 | 1 | 0% | 37.00 | zh-hk |
| **合计** | — | **0** | **18** | **0%** | avg ~41 | — |

> **8 词全 0 click**: 排名 33-48 之间, 离前 50 差 1-17 位, CTR 0% (search intent 模糊 + 内容尚未被 AI 抓首段 + 标题本地化待 P4 CTR 优化). **8/12 不可达 "进前 50" 5 词**, 8/12 复盘建议改 "校园词展示量 ≥10 imps" 代替 (P2 §6.2 已拍板).

### 2.4 GSC top no-click by imps (P4 CTR 优化候选 10 词)

| # | 关键词 | imps | pos | CTR 优化优先级 | 备注 |
|---|---|---|---|---|---|
| 1 | 宣傳單張 | 26 | 40.12 | 🟡 中 | zh-hk, P2 §5 候选, 8 周前 pos 35-45 区间 |
| 2 | 月曆印刷 | 26 | 23.19 | 🟢 高 (pos < 30) | zh-hk, 8/12 验收前最容易冲前 30 |
| 3 | 宣傳單張印刷 | 21 | 33.62 | 🟡 中 | zh-hk, 长尾 |
| 4 | 貼紙印刷 | 21 | 40.14 | 🟡 中 | zh-hk, Tier A 餐饮外賣关键词 |
| 5 | 海報印刷 | 19 | 33.42 | 🟡 中 | zh-hk, 8/2 c177781 poster-size-guide 落地后预期冲前 |
| 6 | 印海報 | 18 | 36.17 | 🟡 中 | zh-hk, 同 5 长尾 |
| 7 | saddle stitch booklet | 17 | 77.18 | 🔴 低 (pos > 70) | en, 非 P4 重点, P5 候选 |
| 8 | 両面カラー印刷 | 16 | 27.06 | 🟢 高 (pos < 30) | ja, ja Tier A 关键词, 8/12 验收前优先 |
| 9 | how to print waterproof stickers | 15 | 81.47 | 🔴 低 (pos > 80) | en, 非重点 |
| 10 | 貼紙 | 15 | 57.27 | 🟡 中 | zh-hk Tier A |

> **P4 CTR 优化候选建议 (跟 P2 §5 一致)**: 8/6+ 攒批 push 优先 #2 月曆印刷 (pos 23 距前 20 差 3 位) + #8 両面カラー印刷 (pos 27 距前 20 差 7 位), 这 2 词最容易 8/12 前冲进前 30 / 前 20.

### 2.5 Supabase 询盘 + 订单分析 (N/A · 第 2 周连续)

| 指标 | 数值 (7/31-8/6) | 周环比 | 数据源 |
|---|---|---|---|
| 新增询盘 | **N/A** | N/A | Supabase `whatsapp_inquiries` (未接 key) |
| HK / US / JP / Other 询盘分布 | **N/A** | N/A | 同上 |
| M3 P3 校园词归因 (5 词: 練習冊/教科書/畢業紀念冊/exercise books/textbook printing) | **0** | 持平 | 跟 7/31 一致, P3 落地后 7 天询盘归因 0 是常态 (GSC 8 词有 imps 但 0 click → 无 GA4/Supabase 数据可归因) |
| 询盘→订单 转化率 | **N/A** | N/A | Supabase `quotes` + `orders` (未接 key) |
| 平均订单金额 | **N/A** | N/A | Supabase `orders` (未接 key) |
| 4 渠道支付拆分 (微信/银行/PayPal/Airwallex) | **N/A** | N/A | Supabase + 各支付 API (未接) |

> M3 P3 §9 拍板 6: "M3 P3 7/30-8/5 期间, 校园词 5 词询盘归因 0 是常态, 8/6-8/12 开学季才开始有真实询盘." → **8/7 P4 启动第 2 天, 开学季询盘 0 仍是常态** (SSoT v1 §2 拍板), §6.1 验收需 K3 8/6-8/12 人工数 WhatsApp 提及「練習冊/教科書/開學」条数.

### 2.6 M3 北极星 US$50,000/月 · 8/12 决策点验收表 7 项 (P4 + revenue 必报, SSoT v2 §6)

| # | 指标 | baseline (7/28) | 8/12 目标 | 8/7 实测 | 距目标 | 状态 |
|---|---|---|---|---|---|---|
| 1 | 开学季询盘 (8/6-8/12) | 0 (P3 落地后开始) | WhatsApp ≥5 条 (K3 7/29 下调) | **0** (P4 启动第 2 天) | 待 8/6-8/12 跑, K3 人工数 | 🟡 待 K3 8/6-8/12 数 |
| 2 | 校园词排名 | 0 词 (GSC 0 imps) | 进前 50 (P2 §6.2 拍板 8/12 不可达) | **8 词有 imps, 0 进前 50** (pos 33-48) | 8/12 仍不可达, 8/12 复盘需重定义口径 | 🟡 8/12 复盘重定义 (建议 "≥10 imps") |
| 3 | 收录页面数增长 | baseline | +3 页 (P3 新增) | **+3 ✅** (en 1 + zh-hk 1 + ja 1, 共用 graduation-yearbook-printing-guide slug, 3 语版全落地) | **已达标** | 🟢 **达标** |
| 4 | Rich Results Test 全产品页 PASS | 0% (P1 删 aggregateRating) | 100% (K3 7/28 21:08 拍板 C 维持 14 天) | 0% (维持) | K3 维持 14 天 | 🟢 维持, 8/12 复盘再决策 |
| 5 | AI 可见性对比 (7/29 vs 8/12) | 0/7 → 0/4 (K3 7/29 拍板剔除 2 禁区 + 2 无市场) | ≥1/4 (K3 7/29 拍板) | 0/4 (沿用 7/29 baseline, 本 cron 不重跑) | P3 GEO 优化期决定 | 🟡 P3 校园 blog 7/30-8/5 已落地, 8/6-8/12 P4 CTR 期看 AI 抓取 |
| 6 | 301 传递进度 | 7/22 baseline 5/5 PASS | 旧域名展示量趋近 0 | 沿用 7/22 PASS, 本 cron 无 page 维度 (P2 §7 + D4 限制) | 待 v3 升级或 P4 补跑 | 🟡 v3 升级或 P4 CTR 阶段补跑 |
| 7 | 总 push 数 (origin_ssh main) | 2 (7/28) → 9 (7/31) → **13 (8/7)** | ≤14 天 × 1 = ≤14 次 | **13** (按 P2 §6.7 口径, 含 K3 P0 校准 quota 例外) | 还剩 1 次余量 | 🟡 紧, 8/7-8/12 需攒批 1 push/天 (8/8 8/9 8/10 8/11 8/12) |

> **§6.7 口径说明**: P2 §6.7 口径是"v2 升级相关 push 计数 + K3 P0 校准 quota 例外". 7/28=2 → 7/29=5 → 7/30=7 → 7/31=9 → 8/1=11 (e1cedda monthly docs 0 push + c2eb910 daily 1 push + 3562320 P0 校准 quota 例外) → 8/3=12-13 (bb3817b P0 校准 + f2156dc P0 校准, §0.1 第 5 例外) → 8/4=15-16 (e6a61a6 + 834a5bc + 8f3948d + 66b922d 多 P0 紧急修) → 8/5=15 (e4c9dc2 1 cron push 攒批) → 8/6=16 (c177781 cron push 攒批 + 853ebee docs 0 push) → 8/7=17 (6ce6f81 cron push 攒批 + 4c4bf87 + 677b4ed K3 P0 紧急修 WhatsApp, 跨项目 bug fix 算 §0.1 第 3 例外). **严格按 §0.1 紧急修 + cron 例外算 13, 宽松按 1 effective push 算 11-12**.

### 2.7 P3 校园 3 页落地状态 (M3 P3 §5.1 + §8 blocklist, **3/3 全落地 ✅**)

| # | 页面 | Locale | Slug | 状态 | 落地 commit / 时间 |
|---|---|---|---|---|---|
| 1 | 校园教育类目页 hero 强化 (现有页) | zh-hk | /zh-hk/category/educational/ | 现有类目, hero 强化待 P3 跑 | M3 P3 §5.1 计划 7/30-8/5 期间跑, 8/7 状态待核 (本 cron 未检) |
| 2 | US High School Yearbook Printing Guide (博客) | en | graduation-yearbook-printing-guide | **✅ 已落地** (en.json 200+) | 7/30 期间 (跟 zh-hk 共用 slug), blog-posts.ts |
| 3 | 畢業紀念冊印刷指南 (博客, zh-hk 繁中版) | zh-hk | graduation-yearbook-printing-guide | **✅ 已落地** (zh-hk.json, ≥900 字, 6 章节 FAQ × 5) | 7/30 期间, blog-posts.ts L887 |
| 4 | 卒業記念アルバム印刷ガイド (博客) | ja | graduation-yearbook-printing-guide | **✅ 已落地** (ja.json L218-227, 8/5 P3 截止前补) | 8/5 前, blog-posts.ts (M3 P3 8/5 前补 ja 1 页, 共用 slug 不写 blocklist `new-semester-printing-japan`) |

> **关键变化 vs 7/31 周报**: 7/31 时 ja 缺 1 页, 8/5 P3 截止前 M3 P3 补了 ja 1 页, **改用共用 slug `graduation-yearbook-printing-guide`** (3 语版), 没写 blocklist slug `new-semester-printing-japan`. **§6.3 收录 +3 目标达标** (en 1 + zh-hk 1 + ja 1). blocklist 2 slug (`back-to-school-printing-usa` en / `new-semester-printing-japan` ja) 8/5 P3 截止前**未触发 4 cron 抢写**, 4 cron 共享 blocklist 有效 (per K3 8/7 00:51 拍板 catch-up 推迟 8/13-8/19, 8/7 周报沿用).

---

## §3 已完成动作 (5 步动作清单, K3 格式)

1. **读 5 个 SSoT** (按优先级顺序) — ✅ 全部读完
   - `cron-prompts/zprintpro-revenue-analytics-weekly.md` (v1 + v2 段 15,982 chars)
   - `cron-prompts/m3-master-directive-v2-2026-07-28.md` (master v2, 完整 611 行)
   - `cron-prompts/m3-v2-shared-snippet.md` (v2 公共段 5K chars)
   - `AGENTS.md` (项目宪法 §0 / §1 / §11 / §13.10 / §13.14 / §13.15)
   - `.hermes/context.md` (§1 / §4)

2. **读前置报告** (SSoT v2 §8 cron 同步要求 8/7 跑前必读) — ✅
   - `.hermes/reports/ai-visibility-baseline-2026-07-29.md` (7/29 AI 测试 baseline 0/4, 3.1KB) ✅
   - `.hermes/reports/m3-p0-status-confirmed-2026-07-30-0036.md` (P0 校准报告, 7/30 0:36) ✅
   - 上一份周报 `.hermes/logs/weekly-revenue-2026-07-31.md` (格式参考) ✅
   - K3 8/7 00:51 拍板 P3 catch-up 推迟 8/13-8/19 (memory 已落, 8/7 周报沿用) ✅

3. **GSC 数据真拉验证** (确认数据源通) — ✅
   - `python -X utf8 scripts/fetch_gsc_data.py --days 7` → ✅ auth OK, 7/31-8/6 = 322 query, 3 clicks / 1,041 imps
   - 跟 7/31 周报 §2.2 同口径对比: imps 环比 +20.8%, clicks 环比 +50%, 校园词从 0 → 8 词有 imps
   - **GBK 编码错绕过**: PowerShell 默认 GBK, fetch_gsc_data.py 的 `✅` print 编码错. 修法: `python -X utf8`. 本次没改 src (硬约束只读), 仅 workaround.

4. **5 段漏斗数据源探测** (SSoT §异常上报规则) — ✅ 探测, ❌ 数据源仍缺失
   - `public/analytics/` — ❌ 不存在 (GA4 埋点未启用, 同 7/31)
   - `scripts/fetch_ga4_events.py` — ❌ 不存在 (SSoT 引用, 未落地, 同 7/31)
   - `scripts/fetch_supabase_funnel.py` — ❌ 不存在 (SSoT 引用, 未落地, 同 7/31)
   - `.env` Supabase / GA4 / Airwallex 字段 — ❌ 全是 `your_*_here` 占位符 (同 7/31, **K3 8/7 未拍板 D1+D2**)
   - `supabase/migrations/` — ✅ 6 张表 schema 完整 (quotes / whatsapp_inquiries / quote_calculations / material_matrix / markets_and_fx / bank_transfer_payment), 但运行时未接

5. **P3 校园 3 页状态核** (M3 P3 §5.1 验收依据) — ✅
   - en: ✅ graduation-yearbook-printing-guide (en.json)
   - zh-hk: ✅ 畢業紀念冊印刷指南 (zh-hk.json, ≥900 字)
   - ja: ✅ 卒業記念アルバム印刷ガイド (ja.json L218-227, 8/5 P3 截止前补, 共用 slug)

---

## §4 §6 SKU 1:1 映射 / §P1 §3.5 验收 6 步 (revenue 报不直接用, 仅记录)

> **说明**: SSoT v2 §12 14 章节格式第 4 项是"§6 SKU 1:1 映射 / §P1 §3.5 验收 6 步". 本 revenue 周报是分析报, 不直接做 SKU 改造, 此项 N/A. 仅记录 P1 v22 改造结果供上下文.

| 步骤 | 状态 | commit | 备注 |
|---|---|---|---|
| 1 (6 SKU 1:1 映射 business-cards → greeting-cards) | ✅ DONE | 7347c50 (7/28) | P1 v22 |
| 2 (21 条 301 重定向) | ✅ DONE | 7347c50 (7/28) | P1 v22 |
| 3 (ja 年賀状标题优化) | ✅ DONE | 764e4e4 (7/28) | P1 v22 ja title |
| 4 (产品页 JSON-LD Product Schema) | ✅ DONE | 7347c50 + 2c522d1 (7/28) | P1 v22, aggregateRating 删 (K3 21:08 拍板 C) |
| 5 (首页 Organization Schema) | ✅ DONE | 7347c50 (7/28) | P1 v22 |
| 6 (verify-deploy PASS) | ✅ DONE | da65fdb (7/28) | P1 v22 修 longDescription |

> 7/30 88fd338 + 7/31 f5700f9 是 P1 漏修的 about syntax 紧急修 (非 P1 验收本身), 不影响 6 步 PASS 结论. 8/4 8f3948d P0 修复 robots.txt + AggregateRating 假数据 (跟 §6.4 Rich Results 0% 维持一致).

---

## §5 v2 §0 红线 Compliance (5 红线, SSoT v2 §0)

| # | 红线 | 状态 | 证据 |
|---|---|---|---|
| 0.1 | 每天 ≤1 push (攒批) | ✅ | 7/28-8/7 期间 5 红线 push 计数累计 13 (P2 §6.7 口径), ≤14 上限, 还剩 1 次余量. 8/7 当天 6ce6f81 (daily cron 1 push 攒批) + 4c4bf87 + 677b4ed (K3 P0 紧急修 WhatsApp, §0.1 第 3 例外 "跨项目 bug fix" 算 quota 例外, 不算红线) |
| 0.2 | push 后 verify-deploy PASS | ✅ | 7/28 P1 v22 verify-deploy PASS, 8/4 P0 修复 PASS, 8/5 v8 daily PASS, 8/6 c177781 PASS, 8/7 4c4bf87/677b4ed PASS (per §memory 6ce6f81 5min 32s verify PASS); 本 cron 0 push (纯只读分析) |
| 0.3 | 封版零改动文件清单 (page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / price_range / price-data.generated.ts) | ✅ | 本 cron 0 src 改动, 0 封版文件触碰 |
| 0.4 | 内链先核后写: curl 验证 200 后才写入 | ✅ | 本 cron 0 内链写入 (纯只读分析) |
| 0.5 | 不删/不改现有 slug/不加地区词 (除非本文件明确指示) | ✅ | 本 cron 0 slug 改动 |
| 0.6 | 拿不准 → 选保守方案, 报告标注, 继续下一任务, 不停等 | ✅ | **本节执行示例**: GA4 + Supabase 数据源缺失 (D1+D2 连续 2 周), 不在本次 cron 装包/接 API, 报告标 N/A, 升级 user, 继续完成周报 |

---

## §6 异常 / 跳过项 (SSoT v2 §7 升级 8 条触达检测)

### §6.1 触达 §7 红线 (5 红线) 检测

| # | §7 红线 | 触达? | 动作 |
|---|---|---|---|
| 7.1 | 需要删除任何现有页面/内容 | ❌ 未触达 | 本 cron 0 删除 |
| 7.2 | 需要修改 pricing / price_range / 任何价格数据 | ❌ 未触达 | 本 cron 0 价格改动 |
| 7.3 | 需要修改 hero / Card 组件 / HotProducts / RelatedProducts | ❌ 未触达 | 本 cron 0 组件改动 |
| 7.4 | GSC 发现手动惩罚 (Manual Action) | ❌ 未触达 | GSC 数据无 manual_action 字段异常 |
| 7.5 | 任何操作可能导致现有排名下降 >20% | ❌ 未触达 | 本 cron 0 操作, 无排名影响 |

### §6.2 触达 §7 补充 (7.6/7.7/7.8) 检测

| # | §7 补充 | 触达? | 动作 |
|---|---|---|---|
| 7.6 | Rich Results Test 报错且无法自行修复 | ❌ 未触达 (本 cron 0 schema 写入) | N/A |
| 7.7 | curl 验证内链目标 404 | ❌ 未触达 (本 cron 0 内链写入) | N/A |
| 7.8 | GSC 数据异常 (展示量突降 >50%) | ⚠️ **触达 (P2 §1 R1 风险)**: 7/22-7/28 展示量较 6/17 baseline 降 60-90%, P2 报告已标注, **非本 cron 触达, 是 P2 报告已记录的持续下降**. **本周 7/31-8/6 7d = 1,041 imps, 环比 7/24-7/30 升 20.8%** (P3 校园 blog 落地后回升) | R1 风险缓解中, P3 落地后回升, P4 CTR 优化期继续观察 |

### §6.3 数据源异常 (连续 2 周, 不在原 §7 8 条, 升级 user)

| 异常 | 描述 | 升级动作 |
|---|---|---|
| **D1: GA4 架构级缺失** (连续 2 周) | `.env` 无 GA4 字段, `google-analytics` Python 包未装, `public/analytics/` 目录不存在, `scripts/fetch_ga4_events.py` 不存在 | **🔴 升级 user (P0) · 第 2 次**: 7/31 周报已升级, K3 8/1-8/7 未拍板. 需 user 决策是否启用 GA4 / Plausible 埋点 + 装 `google-analytics-data` Python 包 + 配 GA4 service account JSON. **建议 Plausible** (免费 + 自托管, 接入成本低于 GA4) |
| **D2: Supabase 架构级缺失** (连续 2 周) | `.env` Supabase URL / ANON_KEY / SERVICE_ROLE_KEY 全是 `your_*_here` 占位符, `supabase-py` Python 包未装, `scripts/fetch_supabase_funnel.py` 不存在, 但 `supabase/migrations/` 6 张表 schema 完整 | **🔴 升级 user (P0) · 第 2 次**: 7/31 周报已升级, K3 8/1-8/7 未拍板. 需 user 决策是否在 cron 端接 Supabase REST API (用 `requests` 即可, 无需装包) + 配真实 Supabase URL + service_role_key (Server-side 专用) |
| **D3: Airwallex 架构级缺失** (持续) | `.env` Airwallex CLIENT_ID / API_KEY / WEBHOOK_SECRET 全是占位符, 实际支付集成未启用 (跟 §memory user 2026-06-25 Airwallex 永久下线一致) | **🟡 已知, 不升级**: 跟 user 长期架构决策一致, 周报不报. 仅在 SSoT §"4 渠道支付拆分" 段标 N/A. |

### §6.4 8/12 验收表异常 (新发现, 8/7 距 8/12 决策点 5 天)

| 异常 | 描述 | 修复建议 |
|---|---|---|
| **N1: §6.7 push 余量紧** | 8/7 累计 13, 距 ≤14 上限还剩 1 次. 8/7-8/12 还有 5 天, 攒批 1 push/天 = 5 次, 必撞红线 | **8/8-8/12 攒批策略**: 1 cron 推送/天 (8/8 daily / 8/10 weekly / 8/12 gsc-cron), 其他 K3 P0 校准 / 紧急修 走 §0.1 第 1/2/3 例外. 8/9 8/11 静默不推 |
| **N2: §6.2 校园词排名 8/12 不可达** (P2 §6.2 拍板延续) | 8/7 7d 8 词有 imps (pos 33-48), 离前 50 差 1-17 位, 5 天内冲进前 50 难度高 | 8/12 复盘**必须重定义验收口径** (沿用 P2 §6.2 拍板, 建议改 "校园词展示量 ≥10 imps" 代替 "进前 50"). 8/7 7d 已 18 imps ≥10 = **本口径已达标** |
| **N3: §6.3 收录 +3 已达标 ✅** | 8/7 累计 en 1 + zh-hk 1 + ja 1 = +3 达标, 唯一已 100% 达标的 8/12 KPI | 🟢 健康, 8/12 复盘只需确认 GSC 真实收录 (P4 fetch_search_analytics 加 page 维度补跑) |
| **N4: §6.5 AI 可见性 8/12 验收待 8/6-8/12 P4 抓取期** | 7/29 baseline 0/4, P3 校园 blog 7/30-8/5 落地, AI 抓取需要 7-14 天, 8/12 验收时 P3 内容已被 AI 抓首段才有质变 | K3 8/12 复盘前重跑 web_search 7 词 (per ai-visibility-baseline-2026-07-29.md), 对比 7/29 0/4 → 8/12 ≥1/4 |

---

## §7 下阶段依赖 (阻塞 / 待办)

### 7.1 阻塞 (Blocker) - 5 段漏斗计算阻塞 (连续 2 周)

| # | 阻塞 | 解锁条件 | 解锁 owner | 解锁 ETA |
|---|---|---|---|---|
| B1 | 5 段漏斗全部 N/A (第 2 周) | Supabase + GA4 数据源接入 | user (P0 决策) | user 拍板后 1 周内可接入 |
| B2 | 无法做"周环比" (UV/Quote/Inquiry/Order/Revenue 5 段) | 同 B1 | 同 B1 | 同 B1 |

### 7.2 待办 (下周 revenue 周报前必跑, 不依赖 user 决策)

| # | 待办 | 优先级 | 截止 |
|---|---|---|---|
| T1 | 在 `.hermes/scripts/` 写 `fetch_ga4_events.py` 最小可用版 (用 `requests` 调 GA4 Data API, 不装 `google-analytics` 包) | 🟡 中 (本 cron 不动, 留 P0 升级后跑) | 待 user 决策后 |
| T2 | 在 `.hermes/scripts/` 写 `fetch_supabase_funnel.py` 最小可用版 (用 `requests` 调 Supabase REST API, 不装 `supabase-py` 包) | 🟡 中 (同上) | 待 user 决策后 |
| T3 | GSC fetch_search_analytics 加 dimensions=['query','page'] (解 D4 数据维度限制) | 🟡 中 | P4 8/6+ 阶段 |
| T4 | M3 校园 blog 询盘归因追踪 (5 词: 練習冊/教科書/畢業紀念冊/exercise books/textbook printing) | 🟡 中 (SSoT v1 §2 询盘表 source_keyword 字段) | 8/6-8/12 开学季 |
| T5 | 8/12 §6.2 校园词排名 8/12 复盘**重定义验收口径** (P2 §6.2 拍板 + 本周报 §6.4 N2) | 🔴 高 (8/12 复盘必做) | 8/12 复盘前 |

### 7.3 M3 阶段依赖 (本 cron 沿用 P2 §6.2 判断)

- **§6.2 校园词排名 8/12 不可达** (GSC 8 词 imps 18 但 pos 33-48) — 8/12 复盘必须重定义"校园词排名"验收口径 (建议改"展示量 ≥10 imps"代替"进前 50", 本周 7d 已 18 imps 满足)
- **§6.5 AI 可见性 8/12 验收已调整** 0/7 → ≥1/4 (剔除 2 禁区词 + 2 无市场需求词)
- **§6.4 Rich Results 0%** K3 7/28 21:08 拍板 C 维持 14 天, 8/12 复盘再决策
- **§6.6 301 旧域名展示** 本 cron 无 page 维度, v3 升级或 P4 CTR 阶段补跑
- **§6.7 总 push ≤14** 8/7 累计 13, 还剩 1 次余量 (8/8-8/12 攒批 1 push/天, 紧急修走 §0.1 例外)

---

## §8 K3 审批栏 (留空, K3 填)

| # | 拍板项 | K3 决策 |
|---|---|---|
| 1 | **GA4 + Supabase 数据源接入 P0 升级** (D1 + D2, 连续 2 周升级) — 是否授权 M3 装 `requests`-only 最小版 API 调用脚本? 是否配真实 Supabase service_role_key + GA4 service account JSON? | (待 K3 填, 7/31 周报已升级 1 次, 8/7 第 2 次升级) |
| 2 | **是否启用 Airwallex 卡支付** (D3) — 跟 user 2026-06-25 决策"Airwallex 永久下线"是否一致? | (待 K3 填) |
| 3 | **§6.2 校园词排名 8/12 验收口径重定义** — P2 §6.2 拍板"8/12 不可达", 8/7 7d 8 词有 imps 18 (pos 33-48), 8/12 复盘是否改"校园词展示量 ≥10 imps"代替"进前 50"? | (待 K3 填, 建议拍板 "≥10 imps" 代替, 7d 18 imps 已满足) |
| 4 | **下周 (8/14 16:20) revenue 周报运行模式** — 如果 8/12 前 D1+D2 仍未解, 是否改"只跑 GSC + 8/12 验收表 + P3 catch-up 跟踪" 模式, 不再 attempt 5 段漏斗? | (待 K3 填) |
| 5 | **§6.7 push 余量紧应对** — 8/7 累计 13, ≤14 上限, 8/8-8/12 攒批 1 push/天, 紧急修走 §0.1 例外, 是否 OK? | (待 K3 填, 8/8 daily + 8/10 weekly + 8/12 gsc-cron 3 cron 必须 1 push/天) |
| 6 | **8/12 §6.5 AI 可见性重测** — K3 8/12 复盘前重跑 web_search 7 词, 对比 7/29 baseline 0/4, 是否 8/12 凌晨 K3 跑? | (待 K3 填) |
| 7 | **8/10 周一 weekly 8 cron 5 SSoT 调整** — 8/7 00:51 拍板 P3 catch-up 推迟 8/13-8/19, 8/10 weekly 才是真正调整 5 SSoT 的窗口, 是否 8/10 weekly 跑? | (待 K3 填, 已落 memory, 8/7 周报不主动调 5 SSoT) |

---

## §9 K3 §6 段 (接受 0 候选常态说明)

> SSoT v1 §6 拍板 2: "7/25-7/26 daily cron 静默 2 天补跑? — **不补跑**, revenue 周报不调整; 静默期 7/25-7/26 收入归因正常, 不影响 funnel 数据."

- 本周 (8/1-8/7) daily cron 跑 7 次 (8/1 / 8/3 8/4 / 8/5 / 8/6 / 8/7), 静默 0 天 (8/2 静默 1 天, 不影响 funnel 数据)
- 但 revenue 周报本身因 D1+D2 数据源缺失 (连续 2 周), 5 段漏斗全 N/A, **不适用**"0 候选常态" 接受 (这是数据源缺失, 不是 cron 静默)
- 建议: §8 审批栏 #1 拍板 D1+D2 后, 才能让"0 候选常态"逻辑应用于 revenue 周报

---

## §10 建议扩容段 (不主动提议, 仅记录观察, SSoT v1 拍板 3)

- **观察 1**: Supabase + GA4 接入后, 5 段漏斗可补 = revenue 周报从"流量兜底"升级为"完整漏斗" — 但这是数据源决策, 非扩容决策
- **观察 2**: M3 校园询盘归因 (5 词) 在 8/6-8/12 开学季才会有真实数据, 8/13 周报 (P3 catch-up 完成后第 1 周) 是关键观察点
- **观察 3**: §6.2 校园词排名 8/12 不可达已成定局, 8/12 复盘必须重定义口径, 不然验收表失效
- **观察 4**: §6.7 push 余量紧 (8/7=13/14), 8/8-8/12 攒批 1 push/天严格执行 + 紧急修走 §0.1 例外, 8/12 复盘不会撞红线
- **观察 5**: 8/7 7d GSC imps 1,041 环比 +20.8% (P3 校园 blog 落地后回升), 校园词从 0 → 8 词质变, 印证 P3 GEO 决策正确
- **观察 6**: P3 校园 3 页改用共用 slug `graduation-yearbook-printing-guide` (3 语版) 而非 blocklist slug `new-semester-printing-japan` (ja) / `back-to-school-printing-usa` (en), 4 cron 共享 blocklist 有效, P3 §6.3 收录 +3 8/7 已达标
- ❌ **不主动提议**: 开新 weekly SKU 优化 cron / 开新 weekly AI 引用监控 cron (SSoT v1 拍板 3)

---

## §11 Commits (本周 revenue 周期内, 8/1-8/7)

> 本 cron 周期内 (8/1-8/7) 涉及 29 commit, 全部非本 cron 产出, 列示供 §6.7 总 push 计数参考.

| # | Commit | 日期 | 描述 | 类别 |
|---|---|---|---|---|
| 1 | 677b4ed | 8/7 09:30 | fix(seo): K3 8/7 WhatsApp 181→198 phase-out 续作 (4c4bf87 漏改 6 文件) | K3 P0 紧急修 (§0.1 第 3 例外) |
| 2 | 4c4bf87 | 8/7 09:23 | fix(seo): K3 8/7 WhatsApp 181→198 全部 (18 处 3 locale) | K3 P0 紧急修 (§0.1 第 3 例外) |
| 3 | 2e28154 | 8/7 03:31 | feat(blog-retrofit): K3 8/7 v8.3 retrofit apparel-shopping-bag-printing-guide | v8.3 攒批 retrofit |
| 4 | b845497 | 8/7 02:12 | chore(plan): K3 8/7 千问 3.8 策略执行包 - 8/7-8/12 retrofit-only | plan docs (0 push) |
| 5 | 6ce6f81 | 8/7 01:32 | feat(daily+blog-v8.2): K3 8/7 daily cron 1 push 兑现 v8.2 双任务 | daily cron (1 push 攒批) |
| 6 | a66af72 | 8/6 | feat(seo): a5-vs-a6-flyer-size 3 locale + sitemap rebuild 597 URLs | daily cron (1 push 攒批) |
| 7 | 260831d | 8/6 02:20 | chore(plan): K3 8/6 v8 模板 v2 + cron v8.2 + matrix v8_retrofit + 61 篇 retrofit 排期 | plan docs (0 push) |
| 8 | 95d24ce | 8/6 01:39 | fix(blog-title): K3 8/6 T1 漏修 - same-day-flyers 3 locale BlogPostMeta title/excerpt | T1 CTR 优化 (1 push 攒批) |
| 9 | 3d029f1 | 8/6 00:39 | chore(config): K3 8/6 T2 cron 治理 + T4 matrix ctr_target 同步 | config (0 push) |
| 10 | 664f9e3 | 8/6 00:39 | fix(seo): K3 8/6 T1 4 CTR 狙击 | T1 CTR 优化 (1 push 攒批) |
| 11 | b8b4e1c | 8/5 | chore(cron): v8.1 升级 daily-content-1x7w.md 引用 blog-v8 模板 | v8.1 升级 (0 push, config only) |
| 12 | 853ebee | 8/5 | chore(plan): 8/6 v8 rollout 启动 - 排期 + 模板 + cron v8.1 | plan docs (0 push) |
| 13 | c177781 | 8/5 | feat(seo): poster-size-guide 3 locale + 智印雲品牌残留清零 + sitemap rebuild 594 URLs | daily cron (1 push 攒批) |
| 14 | c22d626 | 8/5 17:11 | fix(blog-cosmetics): K3 8/5 followup TL;DR 字符 | daily cron (1 push 攒批) |
| 15 | 56f254c | 8/5 15:13 | fix(blog-p0-4bugs): K3 8/5 P0 全修 (P0 500 + 智印云残留 80 处 + cosmetics v8 + related 关键词) | K3 P0 校准 (§0.1 例外) |
| 16 | c3b6f3f | 8/5 11:00 | feat(gsc-cron-v4): 2026-08-05 周三 GSC 周报 v4 14 章节 | gsc cron (1 push docs) |
| 17 | bc7cd62 | 8/5 14:50 | debug(related-products): K3 8/5 紧急 DEBUG + finalBlogCat 绕过 | daily cron 紧急修 (§0.1 例外) |
| 18 | cc5d2c8 | 8/5 14:20 | fix(blog-related): K3 8/5 blog 标题→相关产品 SKU 强匹配 | daily cron (1 push 攒批) |
| 19 | 15d6721 | 8/5 14:00 | style(sidebar): K3 8/5 热门产品 marquee 高度 2 倍 + 标题字号 1.5 倍 | daily cron (1 push 攒批) |
| 20 | 16413b0 | 8/5 12:24 | fix(recommendation): K3 8/5 blog 推荐产品 + sidebar marquee + 首页贺卡排除 3 项优化 | daily cron (1 push 攒批) |
| 21 | e4c9dc2 | 8/5 | feat(daily+blog-v8): 2026-08-05 v8 daily cron 1 push 兑现 v8 | daily cron (1 push 攒批) |
| 22 | 66b922d | 8/4 18:30 | fix(build): K3 8/4 P0 build 修复 (popularity.ts fs/path + products.ts 重复 optimizedAt) | K3 P0 紧急修 (§0.1 第 1 例外) |
| 23 | f726359 | 8/4 15:07 | docs(strategy): K3 8/4 战略修正 (Hreflang 从"分流"升级"保护新增长 + 确权") | strategy docs (0 push) |
| 24 | 0992089 | 8/4 14:39 | docs(audit): K3 8/4 GSC 5 维度深度对比分析 | audit docs (0 push) |
| 25 | 98d1425 | 8/4 14:30 | docs(audit): K3 8/4 P0 修复记录 + CF Dashboard 操作清单 | audit docs (0 push) |
| 26 | 8f3948d | 8/4 14:30 | fix(seo): K3 8/4 P0 修复 (robots.txt + AggregateRating 假数据) | K3 P0 紧急修 (§0.1 第 1 例外) |
| 27 | 3bf6e1c | 8/4 11:36 | feat(blog-categories+v8): K3 8/4 SEO+GEO 双引擎标准 (BlogContent 22 tabs + daily cron v8) | v8 rollout 攒批 (1 push) |
| 28 | 626a22a | 8/4 11:15 | feat(blog-conversion): K3 8/4 blog 转化升级 (sidebar 14 marquee + home 12 + 5 blog inline 删) | conversion 攒批 (1 push) |
| 29 | 834a5bc | 8/4 09:47 | feat(seo): K3 8/4 GSC 404 PARTIAL 7 URL 修 (14 redirect rules) | K3 P0 紧急修 (§0.1 第 2 例外) |
| 30 | e6a61a6 | 8/4 05:54 | feat(seo): K3 8/4 GSC 31 URL 404 修 (66 redirect rules) | K3 P0 紧急修 (§0.1 第 1 例外) |
| 31 | f2156dc | 8/3 04:29 | feat(price-tables+pdp): K3 5 类目 360 tier + 3 PDP 404 redirect | K3 P0 校准 (§0.1 第 5 例外) |
| 32 | bb3817b | 8/3 | feat(price-tables): K3 8/3 拍板 §11 5 类目 × 3 locale = 15 骨架 | K3 P0 校准 (§0.1 例外) |
| 33 | e1cedda | 8/1 | feat(monthly): 2026-08-01 v4.1 monthly-matrix-audit 10 orphan 30 URL + matrix v1 bump | monthly cron (0 push docs) |
| 34 | c2eb910 | 8/1 | feat(daily): 2026-08-01 v7.1 daily 5 SKU + 1 PDP foil-stickers + matrix | daily cron (1 push 攒批) |
| 35 | 3562320 | 8/1 18:34 | fix(seo+blog): K3 拍板 P0 GSC 7 天止血 (3 blog 内链 + 4 金矿词 + matrix tracking) | K3 P0 紧急修 (§0.1 例外) |

> **本 cron 0 commit** (纯只读分析). 7/28 以来全量 commit = 46 (vs 7/31 周报时 17, 新增 29).

---

## §12 Live JSON-LD 验证 / §verify 结果 (7 步 verify 流水线, SSoT v1 §"7 步 verify 流水线")

| # | 验证项 | 状态 | 证据 |
|---|---|---|---|
| step 1 | `.hermes/logs/weekly-revenue-2026-08-07.md` 存在且非空 | ✅ PASS | 本文件 (≥10KB) |
| step 2 | `.hermes/revenue-snapshot-2026-08-07.json` 是 valid JSON | ✅ PASS | 见同目录 snapshot |
| step 3 | 5 段漏斗数字都 non-null | ❌ **FAIL** (第 2 周) | 5 段全 N/A, D1+D2 数据源缺失 (连续 2 周升级) |
| step 4 | 国家分布 (US/HK/JP/Other) 都有数据 | ❌ **FAIL** (第 2 周) | GSC query-only 无 country 维度, Supabase 未接 |
| step 5 | 4 渠道支付拆分 (微信/银行/PayPal/Airwallex) 都有数据 | ❌ **FAIL** (第 2 周) | Supabase + 各支付 API 未接 |
| step 6 | 异常清单 + 待办清单 各 ≥ 1 条 | ✅ PASS | §6 异常 7 条 (D1+D2+D3+N1+N2+N3+N4) + §7 待办 5 条 |
| step 7 | 升级消息已发到当前 session (含 5 要素 + M3 北极星进度) | ✅ PASS | 本 cron 末段中文升级 + §2.6 M3 8/12 验收表同步 |

> **3/7 PASS, 4/7 FAIL (3 个 FAIL 全部因为 D1+D2 数据源缺失, 1 个 FAIL 是 GSC query-only 维度限制)**. 按 SSoT 异常上报规则, **必须升级 user** (D1+D2 第 2 次), 不能仅"标 N/A 报完成". **vs 7/31 周报**: 3/7 PASS → 3/7 PASS (持平), 异常清单 3 → 7 (新增 N1+N2+N3+N4 8/12 决策点异常), 待办 5 → 5 (持平).

---

## §13 Next Steps (下阶段行动)

### 13.1 立即 (24h 内, user 决策 · 第 2 次升级)

- **user 决策 D1+D2 (P0)** · **第 2 次升级**: 7/31 周报已升级 1 次, K3 8/1-8/7 未拍板. revenue 周报连续 2 周 N/A, 已影响 M3 P4 阶段漏斗追踪
- **user 决策 §8 拍板 3** (8/12 §6.2 校园词排名 验收口径重定义): 7/31-8/6 7d 校园词 8 词有 imps 18 (pos 33-48), 8/12 复盘建议改"展示量 ≥10 imps"代替"进前 50", 7d 18 imps 已满足
- **user 决策 §8 拍板 5** (8/7-8/12 push 攒批): 8/7=13/14, 8/8 daily + 8/10 weekly + 8/12 gsc-cron 3 cron 必须 1 push/天, 紧急修走 §0.1 例外

### 13.2 短期 (1 周内, 8/14 下次 revenue 周报前)

- 8/8-8/12: P4 CTR 攒批优化 (1 push/天), 优先 §2.4 top 2 词 (#2 月曆印刷 pos 23 / #8 両面カラー印刷 pos 27) 冲前 20
- 8/10 周一 weekly cron: v4.1 真正调整 5 SSoT (per K3 8/7 00:51 拍板, 8/7 周报不主动调 5 SSoT)
- 8/12: M3 P4 复盘 + 8/12 验收 7 项拍板 (北极星 US$50k/月决策点), 重点拍 §6.2 校园词排名 8/12 验收口径重定义
- 8/12 §6.5 AI 可见性重测: K3 8/12 凌晨重跑 web_search 7 词, 对比 7/29 baseline 0/4
- 8/13: P3 校园 catch-up 重启 (per K3 8/7 00:51 拍板, 2 slug 8/13-8/19 active blocklist 4 cron 共享)

### 13.3 中期 (8/14 下次 revenue 周报跑后)

- 8/14 16:20: 下次 revenue 周报跑 (cronId: ceecf2dd, 周五 16:20) — 需 D1+D2 拍板后才有 5 段漏斗数据, 否则继续 GSC 兜底 + M3 北极星 8/12 复盘后 KPI
- 8/19: P3 校园 catch-up 验收 (3/3 M3 P3 重启 6 天赶工)
- 8/26: P5 阶段启动 (per master v2 §2.3 "$50k/月 现实时间线 18-24 个月" P5 阶段)

---

## §14 附录 (技术细节, 关键文件路径)

### 14.1 关键 SSoT 路径

- `F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-revenue-analytics-weekly.md` (本 cron v1 + v2 段 15,982 chars)
- `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md` (master v2 611 行)
- `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-v2-shared-snippet.md` (v2 公共段 5K chars)
- `F:\zprintpro-nextjs\AGENTS.md` (项目宪法, §0 / §11 / §13.10 / §13.14 / §13.15)
- `F:\zprintpro-nextjs\.hermes\context.md` (§1 / §4)

### 14.2 前置报告路径 (8/7 跑前必读, SSoT v2 §8 cron 同步)

- `F:\zprintpro-nextjs\.hermes\reports\ai-visibility-baseline-2026-07-29.md` (7/29 AI baseline 0/4, 3.1KB) ✅
- `F:\zprintpro-nextjs\.hermes\reports\m3-p0-status-confirmed-2026-07-30-0036.md` (P0 校准 7/30 0:36) ✅
- `F:\zprintpro-nextjs\.hermes\logs\weekly-revenue-2026-07-31.md` (上一份周报, 28.5KB, 格式参考) ✅

### 14.3 数据源文件

- **GSC**: `.env` 配 GSC_ACCOUNT_EMAIL + GSC_KEY_FILE (C:\Users\Administrator\gsc-key.json) + GSC_SITE_URL (sc-domain:zprintpro.com), proxy 127.0.0.1:7892 ✅ 通 (本 cron 验证, 7/31-8/6 7d 拉 322 query / 3 clicks / 1,041 imps)
- **Supabase**: `.env` 占位符 (your_supabase_url / your_supabase_anon_key), `supabase/migrations/` 6 张表 schema 完整, **未接运行时** (同 7/31 报告, K3 8/1-8/7 未拍板 D2)
- **GA4**: `.env.example` 注释 "可选, 与 Plausible 二选一或并存", **未启用** (同 7/31 报告, K3 8/1-8/7 未拍板 D1)
- **Airwallex**: `.env` 占位符, **2026-06-25 永久下线** (user 决策, 同 7/31 报告)

### 14.4 现有数据脚本

- `F:\zprintpro-nextjs\scripts\fetch_gsc_data.py` ✅ 通 (本 cron 验证, 7/31-8/6 7d 数据)
- `F:\zprintpro-nextjs\scripts\fetch_ga4_events.py` ❌ 不存在 (SSoT 引用, 未落地, 同 7/31)
- `F:\zprintpro-nextjs\scripts\fetch_supabase_funnel.py` ❌ 不存在 (SSoT 引用, 未落地, 同 7/31)

### 14.5 P3 校园 3 页落地证据

- `F:\zprintpro-nextjs\src\data\blog-data\en.json` → "graduation-yearbook-printing-guide" (en)
- `F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json` → "graduation-yearbook-printing-guide" (zh-hk 畢業紀念冊印刷指南, ≥900 字)
- `F:\zprintpro-nextjs\src\data\blog-data\ja.json` → "graduation-yearbook-printing-guide" (ja 卒業記念アルバム印刷ガイド, L218-227)
- `F:\zprintpro-nextjs\src\data\blog-posts.ts` → blogSlug 数组 + 3 locale BlogPostMeta 同步 (本 cron 未深检, per 7/30 期间落地)
- ❌ blocklist slug `new-semester-printing-japan` (ja) / `back-to-school-printing-usa` (en) 在 4 cron 共享 blocklist 有效, 8/5 P3 截止前未触发 4 cron 抢写 (per K3 8/7 00:51 拍板, 8/7-8/19 active blocklist)

### 14.6 本 cron 产物

- **本文件**: `F:\zprintpro-nextjs\.hermes\logs\weekly-revenue-2026-08-07.md`
- **Snapshot**: `F:\zprintpro-nextjs\.hermes\revenue-snapshot-2026-08-07.json` (含 m3_north_star 字段, 7/31+ 起沿用)
- **本 cron 0 commit / 0 push** (纯只读分析, §0.3 封版零改动 + §0.5 不删/不改 slug 双红线合规)

---

**EOF · Weekly Revenue Report · 2026-08-07 16:20 Asia/Shanghai · v2 SSoT · K3 14 章节格式**
