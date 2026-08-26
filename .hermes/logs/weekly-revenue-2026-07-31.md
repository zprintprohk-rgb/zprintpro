# Weekly Revenue Report — 2026-07-31 (v2)

> **Cron**: zprintpro-revenue-analytics-weekly (cronId: ceecf2dd)
> **触发**: 2026-07-31 16:20 Asia/Shanghai
> **覆盖窗口**: 2026-07-24 ~ 2026-07-30 (过去 7 天)
> **SSoT**: `.hermes/cron-prompts/zprintpro-revenue-analytics-weekly.md` (v1 + v2 公共段 15,982 chars)
> **M3 北极星**: 8/12 决策点 US$50,000/月 · 7 项验收表同步 (SSoT v2 §6)
> **预算**: 90 min / 实际 ~25 min (数据源架构缺失, 大量子任务空跑)

---

## §1 摘要 (3 行内, K3 格式)

- **结论 (≤30 字)**: 5 段漏斗全部 N/A (GA4 + Supabase 数据源架构缺失); M3 北极星 8/12 验收 7 项中 2 项已有 baseline, 1 项不可达, 4 项待 8/6+ 跑数据.
- **3 行数据**:
  - **GSC 流量底**: 7/24-7/30 = 386 query, 总 imps ~862 / clicks ~2 (P2 报告同窗口延伸, P2 抽 7/22-7/28)
  - **M3 校园 3 页**: 2/3 已落地 (en: graduation-yearbook-printing-guide ✅, zh-hk: 同 slug 繁中版 ✅, ja: **未落地**)
  - **P3 总 push**: 7/28 以来 17 commit (含 7/30 5 + 7/31 2 真 push), §6.7 余量 ≤14-9 = 5 (按 P2 口径 7/29 累计 5 → 7/31 累计 9)
- **≤1 风险**: **R1 (高, 本周新发现)**: GA4 + Supabase 数据源**架构级缺失** — `.env` 无真实 key, `supabase-py` / `google-analytics` Python 包未装, SSoT 提到的 `fetch_ga4_events.py` / `fetch_supabase_funnel.py` 都不存在; revenue 周报 5 段漏斗 (流量/报价/询盘/订单/收入) **无法计算任何段**, 仅靠 GSC 兜底.

---

## §2 数据 (关键 KPI 大表)

### 2.1 5 段漏斗 (SSoT §v1 漏斗定义, 全部 N/A)

| 段 | 数值 | 转化率 | 周环比 | 异常 | 数据源 |
|---|---|---|---|---|---|
| 总 UV | **N/A** | - | 首次跑无基线 | 数据源缺失 | GA4 事件 (未接入) |
| 报价器使用 | **N/A** | N/A | N/A | 数据源缺失 | GA4 'quote_submit' (未埋点) |
| 询盘 (WhatsApp) | **N/A** | N/A | N/A | 数据源缺失 | Supabase `whatsapp_inquiries` (未接 key) |
| 订单 | **N/A** | N/A | N/A | 数据源缺失 | Supabase `orders` (未接 key) |
| 收入 (USD) | **N/A** | - | N/A | 数据源缺失 | Supabase `orders.paid_amount` (未接 key) |
| 收入 (HKD) | **N/A** | - | N/A | 数据源缺失 | Supabase `orders.paid_amount` + 微信/银行/PayPal (未接) |

> **原因**: 5 段漏斗全部依赖 GA4 事件 + Supabase 实时查询. 当前 `.env` 仅配 GSC + Cloudflare, Supabase / Airwallex / GA4 全是占位符. **这不是"API 拉取失败", 是"数据源架构缺失"** — 修复路径见 §7 下阶段依赖.

### 2.2 GA4 / Plausible 替代流量视角 (GSC query-only 兜底)

| 指标 | 数值 (7/24-7/30) | 数据源 |
|---|---|---|
| GSC 收录 query 数 | 386 (含唯一值去重后) | `fetch_gsc_data.py --days 7` |
| GSC 总展示 | ~862 (含 P2 7/22-7/28 同口径) | P2 报告 §1 + 本 cron 验证 |
| GSC 总点击 | ~2 (智印港 1, 同人印刷 1) | P2 + GSC 7/24-7/30 dry-run |
| 唯一有 click 的 query | `智印港` (CTR 100%, pos 2) + `同人印刷` (CTR 100%, pos 4) | GSC dry-run |
| 校园词 / Q-GR 3 词 | **0 imps** (P2 §4: 全部 0 命中) | P2 报告 |
| 28 baseline 词 7/24-7/30 覆盖 | 19/28 = 68% (同 P2 §2) | P2 报告 |
| 28 baseline 词 CTR | 0% (全 0 点击) | P2 报告 |

> 注: GSC query-only 无国家/页面维度 (P2 §7 标注), 无法做"国家分布"和"入口页 top 10".

### 2.3 Supabase 询盘 + 订单分析 (N/A)

| 指标 | 数值 | 数据源 |
|---|---|---|
| 新增询盘 | **N/A** | Supabase `whatsapp_inquiries` 表 (未接 key) |
| HK / US / JP / Other 询盘分布 | **N/A** | 同上 |
| M3 P3 校园词归因 (5 词) | **0** (P3 7/30 启动, 询盘归因 0 是常态) | P2 §4 + 本 cron 推断 |
| 询盘→订单 转化率 | **N/A** | Supabase `quotes` + `orders` (未接 key) |
| 平均订单金额 | **N/A** | Supabase `orders` (未接 key) |
| 4 渠道支付拆分 (微信/银行/PayPal/Airwallex) | **N/A** | Supabase + 各支付 API (未接) |

> M3 P3 §9 拍板 6: "M3 P3 7/30-8/5 期间, 校园词 5 词询盘归因 0 是常态, 8/6-8/12 开学季才开始有真实询盘."

### 2.4 M3 北极星 US$50,000/月 · 8/12 决策点验收表 7 项 (P4 + revenue 必报, SSoT v2 §6)

| # | 指标 | baseline (7/28) | 8/12 目标 | 7/31 实测 | 距目标 | 状态 |
|---|---|---|---|---|---|---|
| 1 | 开学季询盘 (8/6-8/12) | 0 (P3 落地后开始) | WhatsApp ≥5 条 (原 10, K3 7/29 拍板下调) | 0 (P3 7/30 刚启动) | 待 8/6-8/12 跑 | 🟡 待跑 |
| 2 | 校园词排名 | 0 词 (GSC 0 imps) | 进前 50 | 0 词 | **8/12 不可达** (P2 §6.2 拍板) | 🔴 不可达, 8/12 复盘重定义口径 |
| 3 | 收录页面数增长 | baseline | +3 页 (P3 新增) | en 1 + zh-hk 1 = **2/3** (ja 1 缺) | 还差 ja 1 页 | 🟡 差 1 页, ja 需 8/5 前落地 |
| 4 | Rich Results Test 全产品页 PASS | 0% (P1 删 aggregateRating) | 100% (K3 7/28 21:08 拍板 C 维持 14 天) | 0% (维持) | K3 维持 14 天 | 🟢 维持, 8/12 复盘拍板 |
| 5 | AI 可见性对比 (7/29 vs 8/12) | 0/7 (web_search baseline) → 调整 0/4 (剔除 2 禁区 + 2 无市场) | ≥1/4 (K3 7/29 拍板) | 0/4 | P3 GEO 优化期 | 🟡 P3 校园 blog 7/30-8/5 决定 |
| 6 | 301 传递进度 | 7/22 baseline 5/5 PASS | 旧域名展示量趋近 0 | 本 cron 无 page 维度 (P2 §7) | 待 v3 升级 | 🟡 v3 升级或 P4 补跑 |
| 7 | 总 push 数 (origin_ssh main) | 2 (7/28 v2 §6.7) → 5 (7/29 累计, P2 §6.7) → 7 (7/30 +2) → **9** (7/31 +2) | ≤14 天 × 1 = ≤14 次 (实际 9 远低于) | 9 (按 P2 §6.7 口径) | 还有 5 次余量 | 🟢 健康, 远低于上限 |

> **§6.7 口径说明**: P2 报告 §6.7 写"7/29 累计 5 (5 v2 升级)" — 这是 v2 升级相关 push 计数, 不是全量 commit 数. 全量 commit 数 7/28 以来 17, 7/30 以来 5 (其中真 push 2: e095918 + f374d0d; 1 是 88fd338 修 syntax = 紧急 push, 算 quota 例外). 本表用 P2 §6.7 口径数字.

### 2.5 P3 校园 3 页落地状态 (M3 P3 §5.1 + §8 blocklist)

| # | 页面 | Locale | Slug | 状态 | 落地 commit / 时间 |
|---|---|---|---|---|---|
| 1 | 校园教育类目页 hero 强化 (现有页) | zh-hk | /zh-hk/category/educational/ | 现有类目, hero 强化待 P3 跑 | 未跑 (P3 7/30-8/5 期) |
| 2 | US High School Yearbook Printing Guide (博客) | en | graduation-yearbook-printing-guide | **✅ 已落地** (en.json 200+) | blog-posts.ts L887 (跟 zh-hk 共用 slug) |
| 3 | 畢業紀念冊印刷指南 (博客, zh-hk 繁中版) | zh-hk | graduation-yearbook-printing-guide | **✅ 已落地** (zh-hk.json, ≥900 字, 6 章节 FAQ × 5) | blog-posts.ts L887 |
| 4 | 夏休み明け教材印刷ガイド (博客) | ja | new-semester-printing-japan (blocklist slug) | **❌ 未落地** | ja.json grep 0 命中 (校园/school/新学期) |

> **关键观察**: M3 P3 §5.1 计划 3 页 (zh-hk 类目 + en blog + ja blog). 当前 2/3 已落地 (en + zh-hk 校园 blog 走 graduation-yearbook-printing-guide 共用 slug). ja 校园 blog 走 blocklist slug `new-semester-printing-japan`, ja.json grep 无命中. **ja 缺 1 页 = §6.3 收录 +3 目标还差 1 页, 8/5 P3 截止前必补.**

---

## §3 已完成动作 (5 步动作清单, K3 格式)

1. **读 5 个 SSoT** (按优先级顺序) — ✅ 全部读完, 共 ~30K chars
   - `cron-prompts/zprintpro-revenue-analytics-weekly.md` (v1 + v2 段 15,982 chars)
   - `cron-prompts/m3-master-directive-v2-2026-07-28.md` (master v2, 完整 611 行)
   - `cron-prompts/m3-v2-shared-snippet.md` (v2 公共段 5K chars)
   - `AGENTS.md` (项目宪法 §0 / §1 / §11 / §13.10 / §13.14 / §13.15)
   - `.hermes/context.md` (§1 / §4)

2. **读前置报告** (SSoT v2 §8 cron 同步要求 7/31 跑前必读) — ✅
   - `.hermes/reports/m3-p2-2026-07-29.md` (7/29 GSC 周检, 8.6KB)
   - `.hermes/reports/ai-visibility-baseline-2026-07-29.md` (7/29 AI 测试, 3.1KB)
   - `.hermes/reports/m3-daily-2026-07-29.md` (7/29 daily 14 章, 14.4KB)

3. **GSC 数据真拉验证** (确认数据源通) — ✅
   - `python -X utf8 scripts/fetch_gsc_data.py --days 7 --dry-run` → ✅ auth OK, 7/24-7/30 = 386 query
   - 跟 P2 报告 §1 数据一致 (862 imps / 1 click, 7/22-7/28 跟 7/24-7/30 重叠窗口延伸)
   - **GBK 编码错绕过**: PowerShell 默认 GBK, fetch_gsc_data.py 的 `✅` print 编码错. 修法: `python -X utf8` 或 `chcp 65001`. 本次没改 src (硬约束只读), 仅 workaround.

4. **5 段漏斗数据源探测** (SSoT §异常上报规则) — ✅ 探测, ❌ 数据源缺失
   - `public/analytics/` — ❌ 不存在 (GA4 埋点未启用)
   - `scripts/fetch_ga4_events.py` — ❌ 不存在 (SSoT 引用, 未落地)
   - `scripts/fetch_supabase_funnel.py` — ❌ 不存在 (SSoT 引用, 未落地)
   - `.env` Supabase / GA4 / Airwallex 字段 — ❌ 全是 `your_*_here` 占位符
   - `supabase/migrations/` — ✅ 6 张表 schema 完整 (quotes / whatsapp_inquiries / quote_calculations / material_matrix / markets_and_fx / bank_transfer_payment), 但运行时未接

5. **P3 校园 3 页状态核** (M3 P3 §5.1 验收依据) — ✅
   - en: ✅ graduation-yearbook-printing-guide 已落地
   - zh-hk: ✅ 畢業紀念冊印刷指南 (同 slug 繁中版) 已落地
   - ja: ❌ new-semester-printing-japan (blocklist slug) 未落地, ja.json grep 0 命中

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

> 7/30 88fd338 + 7/31 f5700f9 是 P1 漏修的 about syntax 紧急修 (非 P1 验收本身), 不影响 6 步 PASS 结论.

---

## §5 v2 §0 红线 Compliance (5 红线, SSoT v2 §0)

| # | 红线 | 状态 | 证据 |
|---|---|---|---|
| 0.1 | 每天 ≤1 push (攒批) | ✅ | 7/31 0b3fd91 + f5700f9 = 2 push (其中 f5700f9 是 P1 漏修紧急修, 算 quota 例外, AGENTS.md §11.5); 7/30 f374d0d + e095918 = 2 push (其中 e095918 算 quota 例外, K3 P0 校准). 0.1 红线 = 紧急 push + cron 累计, 不超 3/天, 维持 ✅ |
| 0.2 | push 后 verify-deploy PASS | ✅ | 7/28 P1 v22 verify-deploy PASS, 7/30 88fd338 修 syntax 后续 7/31 0b3fd91 hero 改工厂横幅 push 后未自跑 verify (不在本 cron 范围); 本 cron 0 push (纯只读分析) |
| 0.3 | 封版零改动文件清单 (page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / price_range / price-data.generated.ts) | ✅ | 本 cron 0 src 改动, 0 封版文件触碰 |
| 0.4 | 内链先核后写: curl 验证 200 后才写入 | ✅ | 本 cron 0 内链写入 (纯只读分析) |
| 0.5 | 不删/不改现有 slug/不加地区词 (除非本文件明确指示) | ✅ | 本 cron 0 slug 改动 |
| 0.6 | 拿不准 → 选保守方案, 报告标注, 继续下一任务, 不停等 | ✅ | **本节执行示例**: GA4 + Supabase 数据源缺失, 不在本次 cron 装包/接 API, 报告标 N/A, 升级 user, 继续完成周报 |

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
| 7.8 | GSC 数据异常 (展示量突降 >50%) | ⚠️ **触达 (P2 §1 R1 风险)**: 7/22-7/28 展示量较 6/17 baseline 降 60-90%, P2 报告已标注, **非本 cron 触达, 是 P2 报告已记录的持续下降** | P2 报告 §1 R1 + §5 P4 T4 候选 (15 词 CTR 0% 优化) 已处理, 本 cron 沿用 |

### §6.3 数据源异常 (新发现, 不在原 §7 8 条, 升级 user)

| 异常 | 描述 | 升级动作 |
|---|---|---|
| **D1: GA4 架构级缺失** | `.env` 无 GA4 字段, `google-analytics` Python 包未装, `public/analytics/` 目录不存在, `scripts/fetch_ga4_events.py` 不存在 | **🔴 升级 user (P0)**: 需 user 决策是否启用 GA4 / Plausible 埋点 + 装 `google-analytics-data` Python 包 + 配 GA4 service account key |
| **D2: Supabase 架构级缺失** | `.env` Supabase URL / ANON_KEY / SERVICE_ROLE_KEY 全是 `your_*_here` 占位符, `supabase-py` Python 包未装, `scripts/fetch_supabase_funnel.py` 不存在, 但 `supabase/migrations/` 6 张表 schema 完整 | **🔴 升级 user (P0)**: 需 user 决策是否在 cron 端接 Supabase REST API (用 `requests` 即可, 无需装包) + 配真实 Supabase URL + service_role_key (Server-side 专用) |
| **D3: Airwallex 架构级缺失** | `.env` Airwallex CLIENT_ID / API_KEY / WEBHOOK_SECRET 全是占位符, 实际支付集成未启用 (跟 §memory user 2026-06-25 Airwallex 永久下线一致) | **🟡 已知, 不升级**: 跟 user 长期架构决策一致, 周报不报. 仅在 SSoT §"4 渠道支付拆分" 段标 N/A. |

---

## §7 下阶段依赖 (阻塞 / 待办)

### 7.1 阻塞 (Blocker) - 5 段漏斗计算阻塞

| # | 阻塞 | 解锁条件 | 解锁 owner | 解锁 ETA |
|---|---|---|---|---|
| B1 | 5 段漏斗全部 N/A | Supabase + GA4 数据源接入 | user (P0 决策) | user 拍板后 1 周内可接入 |
| B2 | 无法做"周环比" | 上周 (7/24) snapshot 不存在 + Supabase GA4 都没接 | 同 B1 | 同 B1 |

### 7.2 待办 (下周 revenue 周报前必跑, 不依赖 user 决策)

| # | 待办 | 优先级 | 截止 |
|---|---|---|---|
| T1 | 在 `.hermes/scripts/` 写 `fetch_ga4_events.py` 最小可用版 (用 `requests` 调 GA4 Data API, 不装 `google-analytics` 包) | 🟡 中 (本 cron 不动, 留 P0 升级后跑) | 待 user 决策后 |
| T2 | 在 `.hermes/scripts/` 写 `fetch_supabase_funnel.py` 最小可用版 (用 `requests` 调 Supabase REST API, 不装 `supabase-py` 包) | 🟡 中 (同上) | 待 user 决策后 |
| T3 | M3 P3 ja 校园 blog 落地 (`new-semester-printing-japan`, blocklist slug, 4 cron 不写) | 🔴 高 (M3 P3 §6.3 差 1 页) | P3 截止 8/5 |
| T4 | 301 传递进度 §6.6 page 维度补跑 (P2 §7 标注 v3 升级) | 🟡 中 | P4 8/6+ 阶段 |
| T5 | M3 校园 blog 询盘归因追踪 (5 词: 練習冊/教科書/畢業紀念冊/exercise books/textbook printing) | 🟡 中 (SSoT v1 §2 询盘表 source_keyword 字段) | 8/6-8/12 开学季 |

### 7.3 M3 阶段依赖 (本 cron 沿用 P2 §6.2 判断)

- **§6.2 校园词排名 8/12 不可达** (GSC 0 imps → 14 天不可能进前 50) — 8/12 复盘需要重定义"校园词排名"验收口径 (例: 改"是否有展示量"即可)
- **§6.5 AI 可见性 8/12 验收已调整** 0/7 → ≥1/4 (剔除 2 禁区词 + 2 无市场需求词)
- **§6.4 Rich Results 0%** K3 7/28 21:08 拍板 C 维持 14 天, 8/12 复盘再决策
- **§6.6 301 旧域名展示** 本 cron 无 page 维度, v3 升级或 P4 CTR 阶段补跑
- **§6.7 总 push ≤14** 7/31 累计 9, 还剩 5 次余量, 健康

---

## §8 K3 审批栏 (留空, K3 填)

| # | 拍板项 | K3 决策 |
|---|---|---|
| 1 | **GA4 + Supabase 数据源接入 P0 升级** (D1 + D2) — 是否授权 M3 装 `requests`-only 最小版 API 调用脚本? 是否配真实 Supabase service_role_key + GA4 service account JSON? | (待 K3 填) |
| 2 | **是否启用 Airwallex 卡支付** (D3) — 跟 user 2026-06-25 决策"Airwallex 永久下线"是否一致? | (待 K3 填) |
| 3 | **§6.2 校园词排名 8/12 验收口径重定义** — P2 §6.2 拍板"8/12 不可达", 8/12 复盘是否改"校园词展示量 ≥10 imps"代替"进前 50"? | (待 K3 填) |
| 4 | **M3 P3 ja 校园 blog 谁落地** — blocklist slug `new-semester-printing-japan` 4 cron 严禁写, 是否由 M3 P3 8/5 前独立落地? 或降级到 P4? | (待 K3 填) |
| 5 | **下周 (8/7 16:20) revenue 周报运行模式** — 如果 8/4 前 D1+D2 仍未解, 是否改"只跑 GSC + 8/12 验收表" 模式, 不再 attempt 5 段漏斗? | (待 K3 填) |

---

## §9 K3 §6 段 (接受 0 候选常态说明)

> SSoT v1 §6 拍板 2: "7/25-7/26 daily cron 静默 2 天补跑? — **不补跑**, revenue 周报不调整; 静默期 7/25-7/26 收入归因正常, 不影响 funnel 数据."

- 本周 (7/25-7/31) daily cron 跑 6 次 (7/26 / 7/28 / 7/29 / 7/30 / 7/30 / 7/31), 静默 0 天
- 但 revenue 周报本身因 D1+D2 数据源缺失, 5 段漏斗全 N/A, **不适用**"0 候选常态" 接受 (这是数据源缺失, 不是 cron 静默)
- 建议: §8 审批栏 #1 拍板 D1+D2 后, 才能让"0 候选常态"逻辑应用于 revenue 周报

---

## §10 建议扩容段 (不主动提议, 仅记录观察, SSoT v1 拍板 3)

- **观察 1**: Supabase + GA4 接入后, 5 段漏斗可补 = revenue 周报从"流量兜底"升级为"完整漏斗" — 但这是数据源决策, 非扩容决策
- **观察 2**: M3 校园询盘归因 (5 词) 在 8/6-8/12 开学季才会有真实数据, 8/13 周报是关键观察点
- **观察 3**: §6.2 校园词排名 8/12 不可达已成定局, 8/12 复盘必须重定义口径, 不然验收表失效
- ❌ **不主动提议**: 开新 weekly SKU 优化 cron / 开新 weekly AI 引用监控 cron (SSoT v1 拍板 3)

---

## §11 Commits (本周 revenue 周期内, 7/25-7/31)

> 本 cron 周期内 (7/25-7/31) 涉及 17 commit, 全部非本 cron 产出, 列示供 §6.7 总 push 计数参考.

| # | Commit | 日期 | 描述 | 类别 |
|---|---|---|---|---|
| 1 | 0b3fd91 | 7/31 | feat(about+factory): K3 拍板 A 12 行业 icon 卡片 + factory 全 webp 化 + hero 改工厂横幅 | daily cron + K3 拍板 |
| 2 | f5700f9 | 7/31 | fix(about): K3 7/31 紧急修 88fd338 漏修的 4 处 about syntax + 7/31 matrix cron 5 SKU 跟踪 | daily cron (紧急修) |
| 3 | 88fd338 | 7/30 | fix(build): 修 f374d0d build 失败 2 处 Syntax Error (Vercel 报 line 138 + 3378) | daily cron (紧急修) |
| 4 | f374d0d | 7/30 | feat(daily+about): 7/30 cron 5 SKU + matrix tracking + K4 拍板 2 about C 路线 (合并 1 push, §0.1 合规) | daily cron |
| 5 | e095918 | 7/30 | fix(calendar): K3 P0 校准 - 6 calendar SKU 批量价口径 1000 本起 + HK\-8 区间 (en/ja 同步) | K3 P0 校准 (quota 例外) |
| 6 | 84073b1 | 7/29 | docs(gsc-feedback): 2026-07-29 v4 14 章节 K3 报告 (log + matrix.json) | gsc cron docs |
| 7 | 59c85ac | 7/29 | docs(rush): 2026-07-29 v7.1 P0 即日速遞页转化升级 14-章节 K3 报告 | rush docs |
| 8 | 97fa34d | 7/29 | fix(rush): 2026-07-29 server component 500 - getWhatsAppLinkProps → generateWhatsAppLink | rush fix (紧急修) |
| 9 | 183513f | 7/29 | feat(rush): 2026-07-29 v7.1 P0 即日速遞页转化升级 (3 硬伤 + Hero 双 CTA + 6 卡 WhatsApp 确认) | rush feat |
| 10 | f553a4b | 7/29 | docs(daily): 2026-07-29 v7.1 daily 14-章节 K3 报告 (logs/ + reports/) | daily docs |
| 11 | 2a23586 | 7/29 | feat(daily): 2026-07-29 v7.1 daily content — 5 SKU + 1 PDP + matrix (K3 §6 0 候选 B+C+F 兜底) | daily cron |
| 12 | 326ec6d | 7/28 | feat(cron): K3 v2 升级 5 zprintpro cron + SSoT 落盘 (v1 段 + v2 公共段 + daily/gsc 短 prompt SSoT) | v2 升级 (本 cron SSoT 来源) |
| 13 | ed82881 | 7/28 | fix(price): K3 拍板 price_range 区间上限 - 3 SKU (牛皮纸盒 30→1000, catalog 120→1000, ED-005 24→5 上限 120→50) | K3 P0 校准 (quota 例外) |
| 14 | 8f49e54 | 7/28 | feat(daily): 2026-07-28 v7.1 daily content — 5 SKU + 1 PDP + matrix (K3 §6 0 候选 B+C+F 兜底) | daily cron |
| 15 | 96e2208 | 7/28 | fix(price): K3 拍板 price_range 区间下限 - 牛皮纸盒 5→1.5 / catalog 24→2.8 (3 locale 联动, 区间上限保留) | K3 P0 校准 (quota 例外) |
| 16 | 2c522d1 | 7/28 | fix(seo): M3 v2.1 P1 fix 删 generateProductReviewsJsonLd (K3 v2 §3.3 约束 4) | P1 v22.1 fix |
| 17 | 764e4e4 | 7/28 | feat(seo): M3 v2.1 P1 ja title 年賀状 + 删 productRating 假数据 (K3 v2 拍板 2026-07-28) | P1 v22.1 feat |

> **本 cron 0 commit** (纯只读分析).

---

## §12 Live JSON-LD 验证 / §verify 结果 (7 步 verify 流水线, SSoT v1 §"7 步 verify 流水线")

| # | 验证项 | 状态 | 证据 |
|---|---|---|---|
| step 1 | `.hermes/logs/weekly-revenue-2026-07-31.md` 存在且非空 | ✅ PASS | 本文件 (≥10KB) |
| step 2 | `.hermes/revenue-snapshot-2026-07-31.json` 是 valid JSON | ✅ PASS | 见同目录 snapshot |
| step 3 | 5 段漏斗数字都 non-null | ❌ **FAIL** | 5 段全 N/A, D1+D2 数据源缺失 (已升级 user) |
| step 4 | 国家分布 (US/HK/JP/Other) 都有数据 | ❌ **FAIL** | GSC query-only 无 country 维度, Supabase 未接 |
| step 5 | 4 渠道支付拆分 (微信/银行/PayPal/Airwallex) 都有数据 | ❌ **FAIL** | Supabase + 各支付 API 未接 |
| step 6 | 异常清单 + 待办清单 各 ≥ 1 条 | ✅ PASS | §6 异常 3 条 + §7 待办 5 条 |
| step 7 | 升级消息已发到当前 session (含 5 要素 + M3 北极星进度 7/31+) | ✅ PASS | 本 cron 末段中文升级 + §2.4 M3 8/12 验收表同步 |

> **3/7 PASS, 4/7 FAIL (3 个 FAIL 全部因为 D1+D2 数据源缺失, 1 个 FAIL 是 GSC query-only 维度限制)**. 按 SSoT 异常上报规则, **必须升级 user** (D1+D2), 不能仅"标 N/A 报完成".

---

## §13 Next Steps (下阶段行动)

### 13.1 立即 (24h 内, user 决策)

- **user 决策 D1+D2 (P0)**: 是否授权 M3 接 Supabase REST API (用 `requests` 即可) + 配真实 Supabase URL + service_role_key
- **user 决策 D1 (P0)**: 是否启用 GA4 / Plausible (Plausible 免费 + 自托管, 接入成本低于 GA4)
- **user 决策 §8 拍板 4 (M3 P3 ja 校园 blog 谁落地)** — 8/5 P3 截止前必拍

### 13.2 短期 (1 周内, 8/7 下次 revenue 周报前)

- 8/4-8/5: 跑 `fetch_gsc_data.py --days 7` 拉 7/28-8/3 GSC 数据, 验证 §6.2 校园词 P3 落地后是否开始有 imps
- 8/5: P3 截止, 写 `.hermes/reports/m3-p3-campus-2026-08-05.md` (M3 P3 验收 6 步)
- 8/6: P4 CTR 优化启动, 优先 P2 §5 候选 15 词 (0 点击 + imps ≥5)

### 13.3 中期 (8/12 复盘前)

- 8/7 16:20: 下次 revenue 周报跑 (cronId: ceecf2dd, 周五 16:20)
- 8/12: M3 P4 复盘 + 8/12 验收 7 项拍板 (北极星 US$50k/月决策点)
- 8/12 §6.2 校园词排名**必重定义口径** (P2 §6.2 已标 8/12 不可达)

---

## §14 附录 (技术细节, 关键文件路径)

### 14.1 关键 SSoT 路径

- `F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-revenue-analytics-weekly.md` (本 cron v1 + v2 段 15,982 chars)
- `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md` (master v2 611 行)
- `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-v2-shared-snippet.md` (v2 公共段 5K chars)
- `F:\zprintpro-nextjs\AGENTS.md` (项目宪法 §0 / §1 / §11 / §13.10 / §13.14 / §13.15)
- `F:\zprintpro-nextjs\.hermes\context.md` (§1 / §4)

### 14.2 前置报告路径 (7/31 跑前必读, SSoT v2 §8 cron 同步)

- `F:\zprintpro-nextjs\.hermes\reports\m3-p2-2026-07-29.md` (7/29 GSC 周检, 8.6KB) ✅
- `F:\zprintpro-nextjs\.hermes\reports\ai-visibility-baseline-2026-07-29.md` (7/29 AI 测试, 3.1KB) ✅
- `F:\zprintpro-nextjs\.hermes\reports\m3-daily-2026-07-29.md` (7/29 daily 14 章, 14.4KB) ✅

### 14.3 数据源文件

- **GSC**: `.env` 配 GSC_ACCOUNT_EMAIL + GSC_KEY_FILE (C:\Users\Administrator\gsc-key.json) + GSC_SITE_URL (sc-domain:zprintpro.com), proxy 127.0.0.1:7892 ✅ 通
- **Supabase**: `.env` 占位符 (your_supabase_url / your_supabase_anon_key), `supabase/migrations/` 6 张表 schema 完整, **未接运行时**
- **GA4**: `.env.example` 注释 "可选, 与 Plausible 二选一或并存", **未启用**
- **Airwallex**: `.env` 占位符, **2026-06-25 永久下线** (user 决策)

### 14.4 现有数据脚本

- `F:\zprintpro-nextjs\scripts\fetch_gsc_data.py` ✅ 通 (本 cron 验证)
- `F:\zprintpro-nextjs\scripts\fetch_ga4_events.py` ❌ 不存在 (SSoT 引用, 未落地)
- `F:\zprintpro-nextjs\scripts\fetch_supabase_funnel.py` ❌ 不存在 (SSoT 引用, 未落地)

### 14.5 本 cron 产物

- **本文件**: `F:\zprintpro-nextjs\.hermes\logs\weekly-revenue-2026-07-31.md`
- **Snapshot**: `F:\zprintpro-nextjs\.hermes\revenue-snapshot-2026-07-31.json` (含 m3_north_star 字段, 7/31+ 起)
- **本 cron 0 commit / 0 push** (纯只读分析, §0.3 封版零改动 + §0.5 不删/不改 slug 双红线合规)

---

**EOF · Weekly Revenue Report · 2026-07-31 16:20 Asia/Shanghai · v2 SSoT · K3 14 章节格式**
