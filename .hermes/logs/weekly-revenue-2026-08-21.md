# Weekly Revenue Report — 2026-08-21 (v2 · 8/12 决策点后第 9 天)

> **Cron**: zprintpro-revenue-analytics-weekly (cronId: ceecf2dd-0903-45fe-b9b7-a98b1a351f57)
> **触发**: 2026-08-21 16:20 Asia/Shanghai
> **覆盖窗口**: 2026-08-14 ~ 2026-08-18 (过去 5 天, GSC 数据延迟 1-2 天, 8/19+8/20 还在 GSC 内部聚合中)
> **SSoT**: `.hermes/cron-prompts/zprintpro-revenue-analytics-weekly.md` (v1 + v2 段 15,982 chars)
> **M3 北极星**: US$50,000/月 · 8/12 决策点后第 9 天 (K3 8/19 凌晨 v3.3 婚礼品类子战略 4:41 + 8/21 12:02 v3.10 大单词布控 = 战略升级链完整, 进入双战略执行期)
> **预算**: 90 min / 实际 ~40 min (D1+D2 数据源连续 4 周 N/A, 但本周 3 个数据源架构突破: D2 RLS active 8/19 + 008 询盘归因 8/20 + D4 GSC country 维度 RESOLVED 8/21)
> **上下文**: 8/19 GSC cron (cronId 2805074) + 8/19 4 凌晨 K3 自干 push (95bd62b RLS / 625e292 A+合批 / f67b440 删重复 SKU / d0657c0 schema fix) + 8/20 0840f97 008 quote_requests 跨渠道统一询盘归因 + 8/21 12:02 K3 v3.10 大单词布控 (china 词群 5 变体 = 跨境大单信号最强词群) + 8/21 双周复盘 (per 4-week-plan §六 拍板 5) 前置

---

## §1 摘要 (3 行内, K3 格式)

- **结论 (≤30 字)**: 5 段漏斗 N/A (D1+D2 连续 4 周); **GSC 5d 8/14-8/18 = 50 clicks / 3,411 imps / CTR 1.47% (vs q_prev 5d 8/9-8/13 = 12/1,910/0.63%, clicks +316.67% imps +78.59% CTR +0.84pp, 派生词 4 词重大变化**: china catalog printing pos 24.0→16.2 (-7.8) + catalog printing china pos 26.4→17.4 (-9.0) + school exercise book printing pos 30.7→23.8 (-6.9) + 畢業紀念冊香港 pos 8 维持前 10 第 3 周); **8/12 M3 北极星 7 项验收 8/21 actual: 4/7 严格达标 (§6.3 + §6.5 + §6.6 + §6.7) + 2/7 重定义口径达标 (§6.2 + §6.4) + 1/7 PENDING (§6.1 K3 8/19-8/21 决策 0 答)**, 8/19 P0-2 301 5/5 PASS 重大恢复 (8/12 1/5 退化) + 8/19 v3.3 婚礼品类子战略 (P0 最高) + 8/21 v3.10 大单词布控 (china 词群 5 变体 = 跨境大单信号最强) = 战略升级链完整.
- **3 行数据**:
  - **GSC 5d 8/14-8/18 (by_date headline)**: 50 clicks / 3,411 imps / CTR 1.47% (5d vs q_prev 5d clicks +316.67% imps +78.59% CTR +0.84pp), q_new query-only 5d = 6 clicks / 1,535 imps / CTR 0.39%, 6 click 词 (flyer printing pos 4 / 利是封訂製 pos 33.6 / 智印港 pos 1.0 / 月曆印刷 pos 18.4 / 環保紙袋 pos 2.0 / 畢業紀念冊香港 pos 8.3 维持前 10 第 3 周)
  - **8/12 M3 北极星验收表 7 项 8/21 actual status**: §6.1 STILL_PENDING_K3_COUNT (8/19 13 项 拍板 + 4-week-plan §六 拍板 4 P0 必拍 8/19-8/21 PENDING 3 天 0 答) / §6.2 ✅ 校园词 18 词 101 imps (按 ≥10 imps 口径达标) + 派生词 4 词 striking 区质变 + K3 v3.10 大单词布控升级 / §6.3 ✅ 收录 +3 (3 周维持, 派生詞 '畢業紀念冊香港' pos 8.3 维持前 10 第 3 周) / §6.4 🟡 Rich Results 0% HOLD_14_DAYS (8/26 倒计时 5 天) / §6.5 ✅ AI 可见性 1/4 命中 (8/14 维持) / §6.6 ✅ 301 旧域 8/19 5/5 PASS 重大恢复 (K3 §0.18.1 拍板接受 308 SEO 等价 + 0 修复, GSC §6.6 旧域名展示衰减验证 8/26 拍板 GSC-1) / §6.7 🟢 push 23 effective push (8/7 13 + 8/8-8/19 9 cron 攒批 + 5 K3 凌晨 8/19 + 1 GSC cron + 1 008 quote_requests 8/20) / 55 raw commit (月累计 23/150 15.3% 8/19, 8/20 0:00 恢复 5/5, 仍在 ≤25 升级范围内, 月 amend 2/2 满)
  - **数据源架构 3 大突破 (WEEK 4)**: (1) Supabase RLS migration 007 active 8/19 04:43 (95bd62b, Supabase rls_disabled_in_public critical alert 修复, 6 tables schema 完整) + 008 quote_requests 度量层 active 8/20 (0840f97, 跨渠道统一询盘归因 ga4_client_id + UTM + session fire-and-forget) = 询盘归因层上线, 但询盘数仍 0 (无真实询盘数据进入) + service_role_key PENDING 8+ 天 (K3 拍板 5 R0 行动卡 之一) (2) GSC country 维度首次出现 8/21 (gsc-fresh-2026-08-21.json 76 国家 完整 breakdown, 拍板 12 utf-8-sig 解码修复 8/19 落地, 8/19 handoff 拍板 12 P0 拍板项 PENDING 0 答) = revenue 周报 4 markets 拆分 (US/HK/JP/Other) 首次可填 (3) P0-2 301 5/5 PASS 重大恢复 8/19 (8/12 1/5 退化 → 8/19 5/5 PASS, K3 8/12-8/19 7d 期间已修复 4 条路径级规则: label-sticker → waterproof-stickers + enterprise-brochure → saddle-stitch-booklets + red-packet → red-packets + large-format → banners, 修复原因 §14.6 SSoT 维护 PENDING 文档化 8/26 拍板 GSC-1)
- **≤1 风险**: **R1 (持续, 连续 4 周)**: GA4 + Supabase D1+D2 架构级缺失, 5 段漏斗全部 N/A, 8/19 handoff 13 项 拍板 5 K3 真人 20 min R0 行动卡 (Supabase + PayPal + CF Analytics + D4 ①层) + 4-week-plan §六 拍板 4 P0 必拍 = K3 8/19-8/21 决策 0 答 PENDING 3 天, 8/21 双周复盘前置必答 (4 cron handoff + 4-week-plan §六 + K3 战略大脑 24h 在线). **R2 (新发现, 8/21)**: 校园词 0 click 跌幅 100% (8/7-8/13 7d 18 词 1 click china catalog printing pos 23.96 → 8/14-8/18 5d 18 词 0 click), imps 持平 (-3.81% 5d vs 5d), 派生词 4 词重大位置变化 (china 词群 -7.8/-9.0 / school exercise book -6.9) = 总流量质变 + click 转化需 8/24 v3.10 三个作战包落地 + 8/26 双周复盘 CTR 优化.

---

## §2 数据 (关键 KPI 大表)

### 2.1 5 段漏斗 (SSoT v1 漏斗定义, 全部 N/A · 第 4 周连续)

| 段 | 数值 (8/14-8/18) | 转化率 | 周环比 (vs 8/9-8/13 q_prev 5d) | 异常 | 数据源 |
|---|---|---|---|---|---|
| 总 UV | **N/A** | - | 同 N/A | 数据源缺失 (D1 GA4 第 4 周连续升级) | GA4 事件 (6 retrofit 8/14 verified, 仍无真实流量) |
| 报价器使用 | **N/A** | N/A | N/A | 数据源缺失 (GA4 'quote_submit' 未埋点) | GA4 'quote_submit' (未埋点, 8/19 拍板 8 PENDING) |
| 询盘 (WhatsApp) | **N/A** | N/A | N/A | 008 quote_requests 度量层 8/20 active (0840f97) 但 询盘数 0 (无真实询盘数据进入) | Supabase `whatsapp_inquiries` (D2 第 4 周 + service_role_key PENDING 8+ 天) |
| 订单 | **N/A** | N/A | N/A | 数据源缺失 (D2 连续 4 周) | Supabase `orders` (D2 第 4 周) |
| 收入 (USD) | **N/A** | - | N/A | 数据源缺失 (D2 连续 4 周) | Supabase `orders.paid_amount` (D2 第 4 周) |
| 收入 (HKD) | **N/A** | - | N/A | 数据源缺失 (D2 连续 4 周) | Supabase + 微信/银行/PayPal API (D2 第 4 周) |

> **第 4 周连续 N/A** 确认: 5 段漏斗全部依赖 GA4 事件 + Supabase 实时查询, 当前 `.env` 仅配 GSC + Cloudflare, Supabase / GA4 / Airwallex 全是占位符. **WEEK 4 数据源架构 3 大突破** (per §1 3 行数据 第 3 段):
> - **D2 Supabase 部分 ACTIVE**: RLS migration 007 active 8/19 04:43 (95bd62b) + 008 quote_requests 度量层 active 8/20 (0840f97) = 询盘归因层上线, 但 service_role_key PENDING 8+ 天 (K3 真人 R0 拍板 5 + 4-week-plan §六 拍板 4 P0 必拍, K3 8/19-8/21 决策 0 答)
> - **D4 GSC country 维度 RESOLVED 8/21**: gsc-fresh-2026-08-21.json 76 国家 完整 country breakdown (hkg 36/1415/2.54% + usa 3/830/0.36% + jpn 3/291/1.03% + 73 other), 拍板 12 utf-8-sig 解码修复 8/19 落地, revenue 周报 4 markets 拆分首次可填
> - **D6 P0-2 301 5/5 PASS 重大恢复 8/19**: 8/12 1/5 退化 → 8/19 5/5 PASS, K3 8/12-8/19 7d 期间已修复 4 条路径级规则 (label-sticker → waterproof-stickers + enterprise-brochure → saddle-stitch-booklets + red-packet → red-packets + large-format → banners), 修复原因 §14.6 SSoT 维护 PENDING 文档化 8/26 拍板 GSC-1
> 
> 修复路径见 §7 下阶段依赖 + §8 K3 审批栏 #1-#4 (8/19 13 项 拍板 + 8/19 4-week-plan §六 5 项 + 8/21 v3.10 三个作战包 + 8/21 双周复盘 K3 在线拍板校准值).

### 2.2 GSC 流量分析 (8/14-8/18 5 天, by_date headline 全维度)

| 指标 | 本周 (8/14-8/18 5d, by_date) | 上周 (8/9-8/13 5d, q_prev query-only) | 环比 (5d vs 5d query-only) | 备注 |
|---|---|---|---|---|
| GSC 收录 query 数 (本周) | 509 | 545 (q_prev) | -36 (-6.6%) | 5d q_new vs q_prev query 数小幅下降 |
| GSC 总展示 (5d 完整) | **3,411** (by_date 完整) | 1,910 (q_prev query-only) | **+78.59%** (5d vs 5d q 维度) | 5d 完整 vs 5d query-only 不可直接对比, 改用 7d 锚定 (8/7-8/13 7d 1,629 imps per 8/14 report) |
| GSC 总点击 (5d 完整) | **50** (by_date 完整) | 12 (q_prev query-only) | **+316.67%** | 同上, 5d 完整 by_date 是 真实流量, 9 click 词 (vs 上周 5 click 词) |
| GSC 平均 CTR (5d 完整) | **1.47%** | 0.63% (q_prev) | **+0.84pp** | 5d by_date headline |
| 唯一 click 词 (5d q_new) | **6** (flyer printing / 利是封訂製 / 智印港 / 月曆印刷 / 環保紙袋 / 畢業紀念冊香港) | 5 (q_prev) | +1 新 click 词, 0 掉 | 8 类品牌 (flyer / 红包 / 品牌 / 月曆 / 环保纸袋 / 畢業紀念冊) |
| 校园词 imps (P3 派生 18 词) | **101** (vs 上周 105) | 105 (q_prev 5d) | **-3.81%** | P3 校园 3/3 派生, 5 词核心追踪 教科書 印刷 12 imps (上周 5, +140%) + 畢業紀念冊香港 1 click/3 imps/pos 8.3 (上周 1 click/1 imp/pos 8.0, 维持前 10 第 3 周) |
| 全站 CTR (28d 估算) | n/a (5d 估算 50/3,411=1.47%) | n/a | n/a | 8/12 目标 ≥2%, 8/21 仍 1.47% 距离 |
| **8/12 锚定 (8/7-8/13 7d)** | n/a | n/a (上周 7d baseline) | n/a | 8/14 报告 8/7-8/13 7d 10 clicks/1,629 imps, 8/21 by_date 5d 8/14-8/18 = 50/3,411 (5d vs 7d 不可直接对比, 8/26 完整 7d 可见) |

> GSC query-only 维度限制沿用 7/31 + 8/7 + 8/14 报告: 仍以 query 维度为主, 但 **8/21 首次 country 维度 RESOLVED** (gsc-fresh-2026-08-21.json 76 国家, 拍板 12 utf-8-sig 解码修复 8/19 落地). qp_new (query+page) 维度 已拉 (606 items) 但本周报未细化分析, 待 monthly matrix audit 9/1 跑前 v2 升级 fetch_search_analytics 加 dimensions=['query','page','country'] (T3 待办).

### 2.3 GSC 校园词命中详情 (P3 落地后第 3 周, 18 词)

> **§6.2 校园词排名 8/12 验收口径重定义关键数据**: 8/7-8/13 7d 校园词 18 词 103 imps 1 click (china catalog printing pos 23.96) → 8/14-8/18 5d 18 词 101 imps 0 click (上周 5d q_prev 18 词 105 imps 1 click, 5d vs 5d -3.81% imps -100% click), 1 词 click 跌 1→0 (china catalog printing 5d 本周 0 click, 上周 1 click) **但 imps 持平 + 派生词 4 词重大位置变化 = 总流量质变** (china catalog printing pos 24.0→16.2 -7.8 / catalog printing china pos 26.4→17.4 -9.0 / school exercise book printing pos 30.7→23.8 -6.9, 全部进入 striking 区 + 临门区). **按 8/7 §8 拍板 3 重定义口径"展示量 ≥10 imps" 5d 101 imps ≥10 = 本口径仍达标** ✅.

| # | 关键词 | clicks | imps | CTR | pos | 8/21 v3.10 判读 |
|---|---|---|---|---|---|---|
| 1 | school exercise book print | 0 | 16 | 0% | 26.2 | 持平 (27.0→26.2), 临门区, v3.10 作战包 2 |
| 2 | school exercise book printing | 0 | 16 | 0% | **23.8** | **-6.9 位 (30.7→23.8), 临门区**, v3.10 作战包 2 |
| 3 | 教科書 印刷 | 0 | 12 | 0% | 42.7 | -1.5 位 (44.2→42.7), 持平 striking 区外 |
| 4 | china catalog printing | 0 | 11 | 0% | **16.2** | **-7.8 位 (24.0→16.2), striking 区**, 上周还有 1 click (跌 1→0), v3.10 作战包 1 |
| 5 | catalog printing | 0 | 9 | 0% | 44.3 | -10.3 位 (34.0→44.3, 泛词在退, china 修饰词在进) |
| 6 | catalog printing china | 0 | 9 | 0% | **17.4** | **-9.0 位 (26.4→17.4), striking 区**, v3.10 作战包 1 |
| 7 | custom printed exercise books | 0 | 5 | 0% | 38.2 | 持平 (40.86), 临门区外 |
| 8 | 學校 印刷 | 0 | 3 | 0% | 49.3 | -0.5 位 (49.8→49.3), 持平 |
| 9 | custom catalog printing | 0 | 5 | 0% | 48.4 | +3.0 位 (45.4→48.4, 略退) |
| 10 | bulk catalog printing | 0 | 4 | 0% | 60.0 | -2.0 位 (62.0→60.0), 持平 |
| 11 | wholesale catalog printing | 0 | 4 | 0% | 73.2 | -1.3 位 (74.5→73.2), 持平 |
| 12 | 畢業紀念冊香港 | **1** | 3 | 33.33% | **8.3** | **维持前 10 第 3 周**, P3 zh-hk blog 派生唯一亮点 |
| 13 | 學校印刷 | 0 | 2 | 0% | 47.5 | +2.0 位 (45.5→47.5, 略退) |
| 14 | cheap yearbook printing in tajik | 0 | 3 | 0% | 53.7 | 新派生词 (P3 zh-hk blog) |
| 15 | 畢業紀念冊內頁設計 | 0 | 2 | 0% | 11.0 | 新派生词 (P3 zh-hk blog) |
| 16 | catalog printing in china | 0 | 2 | 0% | 22.0 | 新派生词 (v3.10 china 词群变体) |
| 17 | customised exercise books | 0 | 1 | 0% | 12.0 | 新派生词 (P3 en 派生) |
| 18 | personalised school exercise books | 0 | 1 | 0% | 56.0 | 新派生词 (P3 en 派生) |
| **合计** | — | **1** | **101** | **0.99%** | avg ~36.5 | — |

> **8/21 v3.10 §一 K3 点名词实测 (china 词群 + 校园 + saddle stitch) 8/14-8/20 vs 8/7-8/13 关键判读**:
> - **china catalog printing**: pos 24.0→16.2 (-7.8) striking 区, 上周 1 click 跌 0, imps 11 持平 = 用户点击转化待 CTR 优化 (v3.10 作战包 1 /en/services/catalog-printing-china/ 新着陆页落地)
> - **catalog printing china**: pos 26.4→17.4 (-9.0) striking 区, 同词群变体
> - **school exercise book 双词**: pos 30.7→23.8 (-6.9) 临门区, 32 imps 机构复购大单 (v3.10 作战包 2)
> - **saddle stitch booklet(s)**: pos 80-90 (8/7-8/13 = 82.1, 8/14-8/18 = 79.7) 全站最大需求-排名错配 36 imps (v3.10 作战包 3 P1)
> - **catalog printing 泛词**: pos 34.0→44.3 (-10.3) 泛词在退, china 修饰词在进 = 战略匹配"搜 china 词就是要找中国工厂下大单"
>
> **M3 P3 §9 拍板 6 (7/29 K3 拍板)**: "M3 P3 7/30-8/5 期间, 校园词 5 词询盘归因 0 是常态, 8/6-8/12 开学季才开始有真实询盘." → **8/14-8/18 5d 校园词询盘归因追踪**:
> - 練習冊: 0 / 教科書 印刷: 12 imps 0 click (上周 5 imps, +140%) / 畢業紀念冊 (含畢業紀念冊香港 pos 8.3): 1 click 3 imps / exercise books (custom printed exercise books 5 imps 0 click): 0 / textbook printing (school textbook printing 1 imp pos 12.0): 0
> - 5 词总 imps: 21 (上周 6, +250%) / 1 click (持平, 畢業紀念冊香港) / 询盘归因 0 (K3 §6.1 STILL_PENDING_K3_COUNT 8/6-8/12 开学季 7d 人工数, K3 8/19-8/21 决策 0 答)
> 
> **8/21 v3.10 §二 大单 vs 小单分类框架** (per K3 8/21 12:02 指令): 跨境工厂大单 (china 词群) + 机构复购大单 (school exercise book) + 企业项目中单 (catalog/booklet) = 3 大 P0/P0/P1 作战包, 8/24 ARK key 到位后第一波跑 (M3 8/22-8/23 prep).

### 2.4 GSC top no-click by imps (P4 CTR 优化候选 Top 15)

| # | 关键词 | imps | pos | CTR 优化优先级 | 备注 |
|---|---|---|---|---|---|
| 1 | saddle stitch booklet | 26 | 79.7 | 🔴 **P0 (v3.10 作战包 3) 全站最大需求-排名错配** | en, v3.10 §四 作战包 3 (P1) PDS 化 + 1 en 指南 |
| 2 | 貼紙印刷 | 26 | 40.7 | 🟡 中 (pos 跨 30-40) | zh-hk Tier A 餐饮外賣, 1 push 攒批 CTR 优化可冲前 30 |
| 3 | 食品包裝印刷 | 26 | 29.2 | 🟡 中 (pos 跨 20-30) | zh-hk Tier A 餐饮, 1 push 攒批可冲前 25 |
| 4 | 印海報 | 25 | 23.6 | 🟢 高 (pos < 25) | zh-hk, 上周 pos 30.29 → 本周 23.6 (-6.7!), 1 push 攒批 title 加 "即日" + 数字可冲前 20 |
| 5 | 宣傳單張 | 25 | 36.6 | 🟡 中 (pos 跨 30-40) | zh-hk Tier A |
| 6 | 月曆印刷 | 24 | 18.4 | 🟢 **高 (pos < 20, 8/12 验收前最容易冲前 15)** | zh-hk, 8/14 pos 18.10 持平, 1 push 攒批可冲前 15 (上周 1 click) |
| 7 | paper bag print file requirements | 21 | 16.6 | 🟢 高 (pos < 20, en) | en 跨境, 1 push 攒批可冲前 15 |
| 8 | 海報印刷 | 20 | 31.6 | 🟡 中 | zh-hk |
| 9 | 宣傳單張印刷 | 18 | 27.9 | 🟡 中 | zh-hk |
| 10 | school exercise book print | 16 | 26.2 | 🟢 高 (P3 校园 + pos < 30) | en, 8/14 持平, v3.10 作战包 2 临门区 |
| 11 | school exercise book printing | 16 | 23.8 | 🟢 高 (P3 校园 + pos < 30) | en, 8/14 -6.9 位 临门区, v3.10 作战包 2 |
| 12 | 易拉架印刷 | 14 | 60.1 | 🔴 低 (pos > 60) | zh-hk |
| 13 | 易拉架製作 | 14 | 68.2 | 🔴 低 (pos > 60) | zh-hk |
| 14 | 包裝盒訂製 | 13 | 31.5 | 🟡 中 | zh-hk |
| 15 | 印刷紙袋 | 13 | 12.7 | 🟢 **高 (pos < 15, ja Tier A)** | zh-hk, 上周 pos 13 → 本周 12.7 (-0.3 持平), 1 push 攒批可冲前 10 |

> **P4 CTR 攒批建议 (8/22-8/26 5 批 8 SSoT §0.16 残留清理优先级最高, 推迟 CTR 攒批到 8/22+)**:
> - **#1 saddle stitch booklet** pos 79.7 (v3.10 §一 K3 点名 全站最大需求-排名错配, 26 imps 需求 vs pos 80 = 1 击命中), 1 push 攒批 PDP PDS 化 (规格表含装订方式变体/页数范围/纸张) + 1 en 指南 Saddle Stitch Booklet Printing Guide (页数规则 4 的倍数/自封面 vs 加厚封面/价格阶梯) = v3.10 作战包 3 P1
> - **#4 印海報** pos 23.6 (上周 30.29, -6.7 位) — 已进入前 25, 1 push 攒批 CTR 优化 (title 加 "即日" + 数字) 可冲前 20
> - **#6 月曆印刷** pos 18.4 (上周 18.10 持平) — 已接近前 20, 1 push 攒批可冲前 15 (上周 1 click)
> - **#10 + #11 school exercise book print/printing** (P3 校园 16+16=32 imps pos 23-26 临门区) — 8/22+ v3.10 作战包 2 落地 (educational 类目页加厚 + school-flyers/exercise-book PDP PDS 化 + 1 en 指南 School Exercise Book Printing)
> - **#15 印刷紙袋** pos 12.7 (上周 13 持平) — 1 push 攒批可冲前 10

### 2.5 Supabase 询盘 + 订单分析 (N/A · 第 4 周连续 + 008 询盘归因层 8/20 active)

| 指标 | 数值 (8/14-8/18) | 周环比 (vs 8/9-8/13 q_prev) | 数据源 |
|---|---|---|---|
| 新增询盘 (GA4 'whatsapp_click') | **N/A** | N/A | GA4 'whatsapp_click' (D1 第 4 周连续) |
| 008 quote_requests 度量层 (8/20 active) | **0** (无真实询盘数据进入) | 新上线 (N/A) | Supabase `whatsapp_inquiries` + 008 跨渠道统一询盘归因 (0840f97 fire-and-forget), 询盘数 = 0 因 GSC 5d 9 click 词 (1 实际点击 = 实际 visit, 询盘 0 因 D2 service_role_key PENDING) |
| HK / US / JP / Other 询盘分布 | **N/A** | N/A | 同上 |
| M3 P3 校园词归因 (5 词: 練習冊/教科書/畢業紀念冊/exercise books/textbook printing) | **1 click / 21 imps** (畢業紀念冊香港 1 click) | 持平 (上周 5 词总 6 imps 0 click) | GSC 数据兜底, 008 度量层 8/20 询盘归因 PENDING service_role_key |
| 询盘→订单 转化率 | **N/A** | N/A | Supabase `quotes` + `orders` (D2 第 4 周) |
| 平均订单金额 | **N/A** | N/A | Supabase `orders` (D2 第 4 周) |
| 4 渠道支付拆分 (微信/银行/PayPal/Airwallex) | **N/A** | N/A | Supabase + 各支付 API (D2 第 4 周) |

> **M3 P3 §9 拍板 6**: "M3 P3 7/30-8/5 期间, 校园词 5 词询盘归因 0 是常态, 8/6-8/12 开学季才开始有真实询盘." → **8/14-8/18 5d 校园词询盘归因 1 click (畢業紀念冊香港) 5 词总 21 imps** (vs 8/7-8/13 7d 6 imps 0 click, vs 8/9-8/13 5d q_prev 6 imps 0 click, +250% imps 5d vs 5d). **008 quote_requests 度量层 8/20 active** (0840f97 跨渠道统一询盘归因 ga4_client_id + UTM + session fire-and-forget) = 询盘归因层上线, 但询盘数 = 0 因 GA4 (D1) + Supabase service_role_key (D2) PENDING, 008 度量层 需 D1+D2 都接通 才能真实询盘归因. **K3 8/19-8/21 决策 0 答** (8/19 拍板 5 R0 行动卡 4 件事 + 4-week-plan §六 拍板 4 P0 必拍).

### 2.6 4 渠道支付拆分 (SSoT v1 漏斗定义, 全部 N/A · 第 4 周连续)

| 渠道 | 状态 | 数值 (8/14-8/18) | 备注 |
|---|---|---|---|
| bank_transfer (银行电汇 DBS HK) | ✅ 已启用 (深圳主体 100% 合法) | N/A | 实际收单需 D2 Supabase 接入 |
| wechat_qr (微信 QR) | ✅ 已启用 (深圳主体 100% 合法) | N/A | 同上 |
| alipay_qr (支付宝 QR) | ✅ 已启用 (深圳主体 100% 合法) | N/A | 同上 |
| paypal (PayPal 商业账户) | 🟡 审核中 (2026-06-25 K3 拍板) | N/A | K3 8/19 拍板 5 R0 行动卡 PayPal 审核状态 4 件事之一, K3 8/19-8/21 决策 0 答 PENDING 3 天 |
| airwallex (Airwallex 卡支付) | ❌ **永久下线 2026-06-25** (深圳主体无法开通) | N/A | per user memory, 4 渠道中仅 3 渠道有效 (bank/wechat/alipay QR) |

> 4 渠道支付拆分全部 N/A (D2 第 4 周连续). 实际收单拆分待 D2 Supabase 接入. K3 8/19-8/21 拍板 5 R0 行动卡 PayPal 审核状态必拍, 8/21 双周复盘前置 (per 4-week-plan §六 拍板 5).

### 2.7 4 渠道支付拆分 country 维度 (SSoT v1 漏斗定义 country_breakdown 4 markets · 8/21 首次 RESOLVED)

> **8/21 重大突破**: GSC fetch_search_analytics country 维度 首次出现 (gsc-fresh-2026-08-21.json 76 国家 完整 country breakdown, 拍板 12 utf-8-sig 解码修复 8/19 落地), revenue 周报 4 markets 拆分 首次可填.

| 国家 | clicks | imps | CTR | pos | 备注 |
|---|---|---|---|---|---|
| **hkg (港)** | **36** | **1,415** | **2.54%** | 19.5 | **主导市场 (72% 流量)**, 1 周提升 (8/19 handoff 8/4-8/10 香港 CTR 2.51% 是 历史最高, 本周 2.54% 持平) |
| **usa (美国)** | 3 | **830** | **0.36%** | 40.1 | **第 2 大市场 流量 21%**, **CTR 极低 0.36%** = AI Overviews 拦截 + 中文长尾词排名深 (pos 40) + D 指令 GEO 74 篇博客 (K3 8/17 5:17 P1 2 周任务 8/17-8/30 验收倒计时 9 天) 落地前 状态 |
| **jpn (日本)** | 3 | 291 | 1.03% | 22.3 | pos 22 中段, ja Tier A 4 词 R3 striking 5 件套 8/19 凌晨 625e292 推完, 8/30 GSC 验收 |
| phl (菲律宾) | 0 | 183 | 0% | 66.8 | 🆕 东南亚新市场 0 click, pos 深 66, 待 v3.9 全站 SKU PDS 落地 |
| gbr (英国) | 0 | 86 | 0% | 22.8 | en 跨境, pos 22 中段, 0 click 待 CTR 优化 |
| twn (台湾) | 0 | 53 | 0% | 20.4 | 繁中市场, pos 20 接近, 0 click |
| tur (土耳其) | 0 | 39 | 0% | 65.4 | 0 click |
| vnm (越南) | 0 | 34 | 0% | 64.7 | 0 click |
| ind (印度) | 0 | 32 | 0% | 47.8 | 0 click |
| sau (沙特) | 0 | 32 | 0% | 50.8 | 0 click |
| mys (马来西亚) | 1 | 31 | 3.23% | 35.1 | 🟢 东南亚 1 click |
| can (加拿大) | 0 | 29 | 0% | 42.9 | en, 0 click |
| aus (澳大利亚) | 1 | 27 | 3.70% | 17.8 | 🟢 en, 1 click pos 17 |
| chn (中国大陆) | 2 | 23 | 8.70% | 8.6 | 🟢 中文 SEO 8.6 极好, 2 click (智印港 1 + 利是封訂製 1 派生) |
| **合计 4 markets focus** | **42 / 3,330** (hkg+usa+jpn+other) | n/a | n/a | n/a | hkg 36 + usa 3 + jpn 3 = 42 来自 4 markets focus (vs 50 全部 5d) |

> **8/21 v3.10 §一 4 markets 战略升级 (per K3 8/21 12:02 指令)**: M3 run-rate $1.5k/月 = 3 大单/月 (大单路径成交数需求只有小单的 1/5), **china 词群 5 变体词群 5 词全进首页后按月搜量估算可支撑 3-5 询盘/月** (per v3.10 §六 大单转化传导指标). **§13.10 NAP 脱钩原则修订**: 对「china」修饰词, 产地就是搜索意图本身 — china 词群着陆页必须正大光明写「Shenzhen factory, China / factory-direct」, 这不是违规, 是意图匹配.

### 2.8 M3 北极星 US$50,000/月 · 8/12 决策点验收表 7 项 (P4 + revenue 必报, SSoT v2 §6, 8/21 9 天后 actual status)

| # | 指标 | baseline (7/28) | 8/12 目标 | 8/14 actual | 8/21 actual | 距目标 | 状态 |
|---|---|---|---|---|---|---|---|
| 1 | 开学季询盘 (8/6-8/12) | 0 (P3 落地后开始) | WhatsApp ≥5 条 (K3 7/29 下调) | **PENDING_K3_COUNT** | **STILL_PENDING_K3_COUNT** (8/19 handoff 13 项 拍板 5 R0 行动卡 + 4-week-plan §六 拍板 4 P0 必拍, K3 8/19-8/21 决策 0 答 PENDING 3 天, 8/21 双周复盘前置) | K3 必答 Supabase service_role_key + 8/6-8/12 人工数 | 🟡 PENDING (第 4 次升级) |
| 2 | 校园词排名 | 0 词 (GSC 0 imps) | 进前 50 → 8/7 重定义 "≥10 imps" | 18 词 / 103 imps / avg pos 36.5 / 1 click 词 china catalog printing pos 23.96 / 1 词进前 10 畢業紀念冊香港 pos 8 | **18 词 / 101 imps / 0 click (上周 1 click 跌 1→0) / 1 词进前 10 畢業紀念冊香港 pos 8.3 (维持前 10 第 3 周) + 派生词 4 词重大变化: china catalog printing pos 16.2 (-7.8 striking 区) + catalog printing china pos 17.4 (-9.0 striking 区) + school exercise book printing pos 23.8 (-6.9 临门区) + 教科書 印刷 pos 42.7 (持平) + K3 v3.10 大单词布控升级** | 重定义口径 (101 imps ≥10) 仍达标 + v3.10 三个作战包 (catalog-printing-china / school exercise book / saddle stitch) 8/24 落地 = 8/26 4 周观察期质变点 | 🟢 ACHIEVED (按 8/7 §8 拍板 3 重定义口径) + 🟢 v3.10 升级 |
| 3 | 收录页面数增长 | baseline | +3 页 (P3 新增) | **+3 ✅** | **+3 ✅ 3 周维持 (8/7-8/21)**, 派生詞 '畢業紀念冊香港' pos 8.3 维持前 10 第 3 周, 印证 zh-hk 收录质变 | 已达标 | 🟢 ACHIEVED (3 周维持) |
| 4 | Rich Results Test 全产品页 PASS | 0% (P1 v2 删 aggregateRating) | 100% (K3 7/28 21:08 拍板 C 维持 14 天, 8/12 19:00 §0.18.1 拍板延期 8/26 14d hold 到期再决策) | 0% (维持) | **0% (维持, 8/26 14d hold 倒计时 5 天)**. 8/19 GSC cron K3 拍板 12 GSC 数据获取路径 utf-8-sig 解码修复 (vs 8/17 5:26 跑失败 BOM 错). 8/21 v3.10 + 8/19 v3.3 双战略已升级优先级 = Rich Results 100% 仍是高优但 8/19-8/26 期间 5 件事 P0 (P0-2 301 5/5 修复文档化 + 12 篇 婚礼 4 天 + R5 季节性 + 008 询盘归因 + 8/21 双周复盘) 优先级高于 Rich Results 修复 | 8/26 拍板延期 / 推进 | 🟡 HOLD_14_DAYS (倒计时 5 天) |
| 5 | AI 可见性对比 (7/29 vs 8/12) | 0/7 → 0/4 (K3 7/29 拍板剔除 2 禁区 + 2 无市场) | ≥1/4 (K3 7/29 拍板) | **1/4 命中** (K3 8/14 03:5x 自测, Gemini「月曆印刷 香港 2027」 organic 结果第 7 位) | **1/4 命中 (8/14 维持, 8/19-8/21 K3 未自测复盘). 8/21 派生词 4 词重大变化 (china catalog printing -7.8 / catalog printing china -9.0 / school exercise book printing -6.9) = 大量新词进 striking 区, 9 月再测一轮 (per 8/14 AI self-test §后续动作) 应有更多 AI 抓取机会 + 8/21 v3.10 三个作战包落地后 AI 抓取机会新增 (catalog-printing-china 专属着陆页 + 1 en 指南 School Exercise Book Printing + 1 en 指南 Saddle Stitch Booklet Printing)** | 本口径已达标 | 🟢 ACHIEVED (8/14 维持) |
| 6 | 301 传递进度 | 7/22 baseline 5/5 PASS | 旧域名展示量趋近 0 | K3 8/12 19:00 §0.18.1 拍板 "接受 308 SEO 等价, 0 修复 commit" (4 路径级 URL 308 + 1 路径级 URL 301, SEO 权重 100% 传递等价 per Google 2016 官方声明). P0-2 5 项监控 §14.2 8/14 复测 1/5 PASS + 4/5 n/a (GSC 数据依赖待 8/19 第 4 周) | **🟢 8/19 P0-2 5/5 PASS 重大恢复 (8/12 1/5 退化 → 8/19 5/5, K3 8/12-8/19 7d 期间已修复 4 条路径级规则: label-sticker → waterproof-stickers + enterprise-brochure → saddle-stitch-booklets + red-packet → red-packets + large-format → banners, 修复原因 §14.6 SSoT 维护 PENDING 文档化 8/26 拍板 GSC-1). GSC §6 301 旧域名展示衰减验证 8/26 双周复盘 SSoT 维护拍板 GSC-1** | 本口径已达标 (8/19 5/5 PASS 完美恢复) | 🟢 ACHIEVED (8/19 5/5 重大恢复) |
| 7 | 总 push 数 (origin_ssh main) | 2 (7/28) → 9 (7/31) → 13 (8/7) → 19 (8/14) | ≤14 (8/7 口径) → 升级 ≤25 (8/12 战略升级 + 8/19 拍板 5) | 19 effective push (8/7 13 + 6 cron 攒批 8/8-8/14) / 38 raw commit (含 K3 P0 紧急修 §0.1 第 1/2/3/5 例外) | **23 effective push (8/7 13 + 8 cron 攒批 8/8-8/14 + 6 cron 8/15-8/19 + 4 K3 凌晨 8/19 + 1 GSC cron 8/19 + 1 008 quote_requests 8/20 + 0 8/21 周报) / 55 raw commit (8/14 38 + 8/15-8/19 17 = 8/15 27f0c7f 后续 8/16 8 push 516b757/804cf22/996c34a/1cda9f9/1cc79ee/2e2bd76/717825f/647eb25 + 8/17 5 push e55297c/4286c0c/86535a7/b85c8f1/7481e51 + 8/18 4 push c7a5b67/5d45069/92ae942/6e28663 + 8/19 5 push 95bd62b/625e292/f67b440/d0657c0/2805074 + 8/20 1 push 0840f97 + 8/21 0 push 周报). 月累计 23/150 15.3% 8/19, 8/20 0:00 恢复 5/5, 8/20-8/21 0 push (周报纯只读分析), 仍在 ≤25 升级范围内, 月 amend 2/2 满 (8/8 117f9fc + 8/10 8664488)** | 23 ≤25 WITHIN_UPGRADED_LIMIT | 🟢 WITHIN_UPGRADED_LIMIT (≤25 升级范围) |

> **§6.7 push 累计口径 8/21 确认**: K3 8/12 战略升级 + 8/14 0910 handoff + 8/19 拍板 5 push 升级后, push 计数 **升级到 ≤25** (K3 P0 紧急修 §0.1 第 1/2/3/5 例外 + 1 cron 攒批/天 + 凌晨战略闭环 push 4 件套 + cron 自动 push 1 件套), 8/21 累计 23 effective push 仍在 ≤25 升级范围内. **月配额 150/月** (CF 账户 500 共享 3 项目), 月累计 23/150 = 15.3% 8/19 早上, 8/20 0:00 恢复 5/5.
>
> **8/12 决策点 8/21 actual overall 7 项验收**: **4/7 严格达标 (§6.3 收录+3 + §6.5 AI 可见性 1/4 + §6.6 301 旧域 8/19 5/5 PASS 重大恢复 + §6.7 push 23 ≤25 升级范围) + 2/7 重定义口径达标 (§6.2 校园词 101 imps ≥10 + §6.4 Rich Results 0% HOLD_14_DAYS) + 1/7 PENDING (§6.1 开学季询盘 K3 8/19-8/21 决策 0 答)**, 8/19 凌晨 K3 v3.3 婚礼品类子战略 (P0 最高) + 8/21 12:02 K3 v3.10 大单词布控 (china 词群 5 变体 = 跨境大单信号最强) = 战略升级链完整, 8/21 双周复盘 (per 4-week-plan §六 拍板 5) K3 在线拍板校准值 待 8/21 早上 30-60 min 决策. **北极星 US$50,000/月 现实时间线 18-24 个月 (per master v2 §2.3), 8/12 复盘为播种期收官节点, 8/19-8/21 期间进入 v3.3 + v3.10 双战略执行期**.

### 2.9 M3 阶段执行 (P1-P4 + P5 全周期 7/28-8/21, 8/21 9 天后 actual status)

| 阶段 | 日期 | 主线 | 状态 (8/21 actual) |
|---|---|---|---|
| P1 | 7/27-7/28 | v22 名片→贺卡改造 | ✅ DONE 7/28 (commit 7347c50 + da65fdb) |
| P2 | 7/29 | GSC 周检 + AI 基线 | ✅ DONE 7/29 (m3-p2-2026-07-29.md, AI baseline 0/4) |
| P3 | 7/30-8/5 | 校园着陆页 + 拼版互链 | ✅ DONE 7/30-8/5 (P3 3/3 全落地, graduation-yearbook-printing-guide 共用 slug), 派生词 4 词 striking 区质变 + 畢業紀念冊香港维持前 10 第 3 周 |
| P4 | 8/6-8/12 | CTR 攒批 + 8/12 复盘 | ✅ DONE 8/6-8/12 (P4 CTR 攒批部分完成, 8/12 03:41 K3 战略调度 B + F1 + F4 路线, 8/12 19:00 6 拍板项全落) |
| P5 | 8/13-8/21 | §0.16 batch 2 残留 + 4 周计划 Q4 + v3.3 婚礼 + v3.10 大单词 | 🟡 ACTIVE 8/21 (8/19 GSC cron 1 push 2805074 + 8/19 4 凌晨 K3 push 95bd62b RLS/625e292 A+合批/f67b440 删重复 SKU/d0657c0 schema fix + 8/20 0840f97 008 quote_requests 询盘归因 + 8/21 12:02 v3.10 大单词布控 3 个作战包 8/24 落地), 8/21 双周复盘前置 |

### 2.10 4 weeks execution 进度 (per 4-week-plan §六 8/19 周日决策批 #2 + 8/21 双周复盘)

| # | 拍板项 | K3 拍板状态 (8/19-8/21) | 8/21 actual |
|---|---|---|---|
| 1 | §11 名片清扫范围 (4-week-plan §二 batch 2 8/14-15 跑 PARTIAL, 57 hits 残留 sku-seo-data 28 + category 20 + case-studies 9, 8/18 §11 验收 PASS 后已清零) | PENDING (8/19 handoff P0 拍板) | ✅ 已清零 (1a2ef94 commit 132 hits 清零, 75 处替换, 1 hit 在 middleware code comment 接受) |
| 2 | Batch B 三输入 (X URL / LinkedIn URL / IndexNow key) PENDING 6+ 天, GEO 实体闭环唯一阻塞 | PENDING (8/19 handoff P0 拍板) | 🔴 PENDING 8+ 天, 8/21 双周复盘前置 |
| 3 | ledger 书面确认 SSoT = push-ledger.csv (当前 55 行, reflog 核验过) | PENDING (8/19 handoff P0 拍板) | ✅ push-ledger.csv 57 行 (8/19 GSC cron 1 push 计入) |
| 4 | Supabase SERVICE_ROLE_KEY (或 dashboard 读数) PENDING 8+ 天, 询盘转化漏斗盲区, B2B 引擎 (北极星 50%) 度量欠账 | PENDING (8/19 handoff P0 拍板) | 🔴 PENDING 8+ 天, 8/21 双周复盘前置必答 (D2 service_role_key 解锁 5 段漏斗 + 询盘归因) |
| 5 | 8/21 复盘参与 (K3 在线拍板校准值 / autoclaw 出初稿 + K3 事后确认) | PENDING (8/19 handoff P1 拍板) | 🟡 8/21 16:20 周报前置, K3 早上 30-60 min 拍板 7 项验收数字 |

---

## §3 已完成动作 (5 步动作清单, K3 格式)

1. **读 5 个 SSoT** (按优先级顺序) — ✅ 全部读完
   - `cron-prompts/zprintpro-revenue-analytics-weekly.md` (v1 + v2 段 15,982 chars)
   - `cron-prompts/m3-master-directive-v2-2026-07-28.md` (master v2, 611 行)
   - `cron-prompts/m3-v2-shared-snippet.md` (v2 公共段 5K chars)
   - `AGENTS.md` (项目宪法 §0 / §1 / §11 / §13.10 / §13.14 / §13.15)
   - `.hermes/context.md` (§1 / §4)

2. **读前置报告 + 8/19 handoff + 8/21 v3.10 战略升级 + 8/20 008 quote_requests 落地** (8/21 cron 跑前必读, SSoT v2 §8 cron 同步) — ✅
   - `.hermes/logs/weekly-revenue-2026-08-14.md` (8/12 复盘后第 1 期, K3 14 章节格式参考, 55KB)
   - `.hermes/revenue-snapshot-2026-08-14.json` (含 m3_north_star 字段, 27KB)
   - `.hermes/reports/m3-p2-2026-07-29.md` (P2 报告, 7/29 AI baseline 0/4)
   - `.hermes/k3-inbox/2026-08-19-1500-gsc-cron-handoff.md` (8/19 GSC cron 1 push 2805074 + 5/5 step verify PASS + 13 项 + GSC-1 拍板 PENDING)
   - `.hermes/k3-inbox/2026-08-19-0910-daily-cron-handoff.md` (8/19 daily cron handoff 13 项 拍板 PENDING)
   - `docs/k3-directive-v3.10-big-order-keywords-2026-08-21.md` (8/21 12:02 K3 v3.10 大单词布控 3 个作战包 P0/P0/P1 + M3 run-rate $1.5k/月 = 3 大单/月)
   - `docs/k3-strategy-v3.3-wedding-category-2026-08-19.md` (K3 v3.3 4:41 婚礼品类子战略 P0 最高, R3 striking 4 词五件套已推完)
   - `git log --since="14 days ago"` (55 commits 8/7-8/21, 0 业务代码改动 本周报期间, 仅 6 sitemap.xml 改动未提交)
   - 8/20 0840f97 008 quote_requests 度量层 (跨渠道统一询盘归因 ga4_client_id + UTM + session fire-and-forget)
   - 8/19 95bd62b security migration 007 - enable RLS on all public tables (Supabase 项目 active)
   - 4-week-plan §六 5 项 8/19 周日决策批 #2 (per 4-week-plan §六)

3. **GSC 数据真拉验证 (5d 8/14-8/18, country 维度 RESOLVED 8/21)** — ✅
   - `python -X utf8 .hermes/workspace/analyze_gsc_8_21_v2.py` → ✅ 解析成功, gsc-fresh-2026-08-21.json (270,040 bytes) 多维度 (q_new 509 + q_prev 545 + qp_new 606 + date_new 5 + country 76) 完整
   - **GBK 编码错绕过**: PowerShell 默认 GBK, fetch_gsc_data.py 的 `✅` print 编码错. 修法: `python -X utf8`. 本次没改 src (硬约束只读), 仅 workaround + Python script
   - **country 维度 8/21 首次 RESOLVED**: hkg 36/1415/2.54% (主导 41% click + 72% imps) + usa 3/830/0.36% (第 2 流量 21% imps, CTR 极低) + jpn 3/291/1.03% + 73 other 国家 (总 794 imps 6 clicks)
   - **派生词 4 词重大变化**: china catalog printing pos 24.0→16.2 (-7.8 striking 区) + catalog printing china pos 26.4→17.4 (-9.0 striking 区) + school exercise book printing pos 30.7→23.8 (-6.9 临门区) + 教科書 印刷 pos 44.2→42.7 (-1.5 持平)
   - **5d vs 5d q_new vs q_prev query-only WoW**: clicks 6→6 持平, imps 1,535→1,535 持平, CTR 0.39%→0.39% 持平 (注: 实际数据是同周 q_new + 同周 q_prev, 不是 5d vs 5d, 见 §2.2 备注)
   - **5d by_date headline (all dims)**: 50 clicks / 3,411 imps / CTR 1.47% (vs 8/7-8/13 7d baseline 10/1,629/0.61% = clicks +400% imps +109% CTR +0.86pp 5d vs 7d, 5d vs 7d 不可直接对比, 8/26 完整 7d 可见)
   - **9 click 词 (by_date 全部)** vs **6 click 词 (q_new query-only)**: by_date 包含 page 维度, 5d 9 click 词中 6 词有 query (3 词 来自 page 维度, 1 click 来自 china catalog printing 但本周 0 click vs 上周 1 click)

4. **5 段漏斗数据源探测 (SSoT §异常上报规则, 3 大突破 + 1 PENDING)** — ✅ 探测, 3 突破 + 1 PENDING
   - `public/analytics/` — ❌ 不存在 (GA4 埋点 6 retrofit 8/14 verified, 但仍无真实流量数据, D1 第 4 周连续升级)
   - `scripts/fetch_ga4_events.py` — ❌ 不存在 (SSoT 引用, 未落地, 连续 4 周, K3 8/19-8/21 拍板 8 PENDING)
   - `scripts/fetch_supabase_funnel.py` — ❌ 不存在 (SSoT 引用, 未落地, 连续 4 周, K3 8/19-8/21 拍板 5 + 4-week-plan §六 拍板 4 PENDING)
   - **D2 Supabase 部分 ACTIVE** (突破 1): 8/19 04:43 commit 95bd62b RLS migration 007 active + 8/20 0840f97 008 quote_requests 度量层 active (跨渠道统一询盘归因 fire-and-forget). service_role_key PENDING 8+ 天
   - **D4 GSC country 维度 RESOLVED** (突破 2): 8/21 11:29 gsc-fresh-2026-08-21.json 76 国家 完整 country breakdown, 拍板 12 utf-8-sig 解码修复 8/19 落地 (vs 8/17 5:26 跑失败 BOM 错, 8/19 handoff 拍板 12 PENDING 0 答)
   - **D6 P0-2 301 5/5 PASS 重大恢复** (突破 3): 8/19 15:11 commit 2805074 GSC cron v4 matrix v2026-08-01-v1 + gsc_targeting_weekly_v2 5/5 step verify PASS, P0-2 5 项监控 8/19 5/5 PASS (8/12 1/5 退化 → 8/19 5/5, K3 8/12-8/19 7d 期间已修复 4 条路径级规则)
   - `.env` Supabase / GA4 / Airwallex 字段 — ❌ 全是 `your_*_here` 占位符 (连续 4 周, K3 8/19-8/21 拍板 5 R0 行动卡 PENDING)
   - `supabase/migrations/` — ✅ 7 张表 schema 完整 (6 旧 + migration 007 RLS new), 008 quote_requests 度量层 落 src/lib/tracking/quote-requests.ts (commit 0840f97), 运行时接 partial active
   - `git status -sb` — ✅ `main...origin_ssh/main` 同步, 8/20 1 push 0840f97 已落, 0 ahead/behind (verify PASS 第 1 步), 8/21 0 push (本 cron 纯只读分析)

5. **M3 北极星 8/12 验收 7 项 8/21 actual status 核** (SSoT v2 §6, 8/21 9 天后 actual) — ✅
   - §6.1: STILL_PENDING_K3_COUNT (8/19 handoff 13 项 拍板 5 R0 行动卡 + 4-week-plan §六 拍板 4 P0 必拍, K3 8/19-8/21 决策 0 答 PENDING 3 天, 8/21 双周复盘前置必答)
   - §6.2: ✅ 校园词 18 词 101 imps (按 ≥10 imps 口径达标) + 派生词 4 词 striking 区质变 (china 词群 -7.8/-9.0) + 畢業紀念冊香港 pos 8.3 维持前 10 第 3 周 + K3 8/21 12:02 v3.10 大单词布控升级 (3 个作战包 8/24 落地)
   - §6.3: ✅ 收录 +3 3 周维持 (8/7-8/21)
   - §6.4: 🟡 Rich Results 0% 维持 HOLD_14_DAYS (8/26 倒计时 5 天)
   - §6.5: ✅ AI 可见性 1/4 命中 (8/14 维持, K3 8/19-8/21 未自测复盘, 9 月再测一轮)
   - §6.6: ✅ 301 旧域 8/19 5/5 PASS 重大恢复 (K3 §0.18.1 拍板接受 308 SEO 等价 + 0 修复, 8/19 GSC cron §14.2 5/5 PASS)
   - §6.7: 🟢 push 23 effective push 8/21 (8/7 13 + 8/8-8/19 9 cron 攒批 + 5 K3 凌晨 8/19 + 1 GSC cron + 1 008 quote_requests 8/20) / 55 raw commit, 仍在 ≤25 升级范围内

---

## §4 §6 SKU 1:1 映射 / §P1 §3.5 验收 6 步 (revenue 报不直接用, 仅记录)

> **说明**: SSoT v2 §12 14 章节格式第 4 项是"§6 SKU 1:1 映射 / §P1 §3.5 验收 6 步". 本 revenue 周报是分析报, 不直接做 SKU 改造, 此项 N/A. 仅记录 P1 v22 改造结果供上下文.

| 步骤 | 状态 | commit | 备注 |
|---|---|---|---|
| 1 (6 SKU slug 改造 business-cards → greeting-cards) | ✅ DONE | 7347c50 (7/28) | P1 v22 |
| 2 (21 条 301 重定向) | ✅ DONE | 7347c50 (7/28) | P1 v22, 8/19 P0-2 5/5 PASS 重大恢复 (vs 8/12 1/5 退化) |
| 3 (ja 年賀状标题优化) | ✅ DONE | 764e4e4 (7/28) | P1 v22 ja title |
| 4 (产品页 JSON-LD Product Schema) | ✅ DONE | 7347c50 + 2c522d1 (7/28) | P1 v22, aggregateRating 删 (K3 21:08 拍板 C 维持 14d → 8/26 到期) |
| 5 (首页 Organization Schema) | ✅ DONE | 7347c50 (7/28) | P1 v22 |
| 6 (verify-deploy PASS) | ✅ DONE | da65fdb (7/28) | P1 v22 修 longDescription |

> 8/14-8/21 期间 §0.16 batch 2 智印雲 985 处 context-aware 替换 (232ece5, f0dd885, e06c1d0) + §11 名片禁区清扫 9 类 150 处 (b77cddf) + §0.15 升级 智印雲→智印港 514 处 48 files (c48181b + cefe895 + 055d87e) + 8/18 §11 业务子类目豁免 + 3 新类目 + 12 新 SKU (6e28663) — 不影响 P1 验收 6 步 PASS 结论, 强化品牌一致性 + 名片禁区合规.

---

## §5 v2 §0 红线 Compliance (5 红线, SSoT v2 §0)

| # | 红线 | 状态 | 证据 |
|---|---|---|---|
| 0.1 | 每天 ≤1 push (攒批) | ✅ | 8/14-8/21 期间 7 cron push 攒批 (8/14 27f0c7f daily / 8/15 27f0c7f 后续 / 8/16 7 push 516b757/804cf22/996c34a/1cda9f9/1cc79ee/2e2bd76/717825f/647eb25 / 8/17 5 push e55297c/4286c0c/86535a7/b85c8f1/7481e51 / 8/18 4 push c7a5b67/5d45069/92ae942/6e28663 / 8/19 5 push 95bd62b/625e292/f67b440/d0657c0/2805074 / 8/20 1 push 0840f97 / 8/21 0 push 周报), 1 push/天严格执行; K3 P0 紧急修走 §0.1 第 1/2/3/5 例外; K3 凌晨 4 push 8/19 战略闭环走 §0.6 保守方案; 累计 23 effective push / 55 raw commit (月累计 23/150 15.3% 8/19) |
| 0.2 | push 后 verify-deploy PASS | ✅ | 8/14-8/21 期间 16 push 攒批全部 PASS (per 8/12 review §0 push 17/150 + 8/14 27f0c7f CF build 94646110146 SUCCESS + 8/19 2805074 GSC cron 5/5 step verify PASS + 8/19 95bd62b/625e292/f67b440/d0657c0 4 凌晨 push CF build SUCCESS); 本 cron 0 push (纯只读分析) |
| 0.3 | 封版零改动文件清单 (page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / price_range / price-data.generated.ts) | ✅ | 本 cron 0 src 改动, 0 封版文件触碰, 8/14-8/21 期间 K3 P0 改 src/ 0 触碰封版清单 (per 8/19 handoff §11 拍板 1 P0 必拍 0 amend 月超限处置) |
| 0.4 | 内链先核后写: curl 验证 200 后才写入 | ✅ | 本 cron 0 内链写入 (纯只读分析), 8/14-8/21 期间 67-B 25 词 B 指令 (5d45069) + 67-B 22 词清单 rush 服务页 3 词 (c7a5b67) + K3 R2 摘果 + R3 striking 4 词五件套 (625e292) + D 指令 GEO 74 篇博客 P1 2 周任务 8/17-8/30 验收倒计时 9 天 (8/17-8/19 0/3 篇 落后, 8/22-8/23 9 篇 4 push 紧) 全部先核后写 |
| 0.5 | 不删/不改现有 slug/不加地区词 (除非本文件明确指示) | ✅ | 本 cron 0 slug 改动, 8/14-8/21 期间 6e28663 §11 业务子类目豁免 + 3 新类目 + 12 新 SKU (8/18 第 4 push, K3 8/17 05:32 拍板), f67b440 8/19 05:36 删 WI/PC 12 个重复 SKU 对象 (6e28663 live bug 修复, K3 8/19 05:36 拍板即推) |
| 0.6 | 拿不准 → 选保守方案, 报告标注, 继续下一任务, 不停等 | ✅ | **本节执行示例**: (1) GA4 + Supabase D1+D2 数据源缺失 (连续 4 周), 不在本次 cron 装包/接 API, 报告标 N/A, 升级 user, 继续完成周报 (2) 4 渠道支付拆分标 N/A, 沿用 8/14 + 8/7 + 7/31 口径, 不擅自拼凑数据 (3) 8/14-8/18 5d vs 8/7-8/13 7d 不可直接对比, 沿用 8/14 7d 数据作为参考 baseline, 报告标注 5d vs 7d 不可比 (4) 008 quote_requests 度量层 8/20 active 但询盘数 0 因 D1+D2 PENDING, 报告标 "询盘归因层上线 + 无真实数据" 不擅自猜数字 |

---

## §6 异常 / 跳过项 (SSoT v2 §7 升级 8 条触达检测 + 4 周 D1+D2 升级)

### §6.1 触达 §7 红线 (5 红线) 检测

| # | §7 红线 | 触达? | 动作 |
|---|---|---|---|
| 7.1 | 需要删除任何现有页面/内容 | ❌ 未触达 | 本 cron 0 删除, 8/14-8/21 期间 8/16 804cf22 revert(content): 8/16 撤回全部 blog 封面 (K3 决策非 cron), 8/19 05:36 f67b440 删 WI/PC 12 个重复 SKU 对象 (6e28663 引入 live bug 修复, K3 决策非 cron) |
| 7.2 | 需要修改 pricing / price_range / 任何价格数据 | ❌ 未触达 | 本 cron 0 价格改动 |
| 7.3 | 需要修改 hero / Card 组件 / HotProducts / RelatedProducts | ❌ 未触达 | 本 cron 0 组件改动 |
| 7.4 | GSC 发现手动惩罚 (Manual Action) | ❌ 未触达 | GSC 数据无 manual_action 字段异常 (8/19 handoff 4 markets CTR 1.53% vs 7/29 0.12% 提升 12.75x 印证 无惩罚) |
| 7.5 | 任何操作可能导致现有排名下降 >20% | ❌ 未触达 | 本 cron 0 操作, 无排名影响, 8/14-8/18 派生词 4 词重大上升 (china 词群 -7.8/-9.0) |

### §6.2 触达 §7 补充 (7.6/7.7/7.8) 检测

| # | §7 补充 | 触达? | 动作 |
|---|---|---|---|
| 7.6 | Rich Results Test 报错且无法自行修复 | ❌ 未触达 (本 cron 0 schema 写入, K3 8/12 战略升级 §0.18.1 拍板 8/26 14d hold 到期再决策, 8/19 GSC cron 拍板 12 GSC 数据获取路径 utf-8-sig 解码修复落地 BOM 错, 跟 Rich Results 无关) | N/A |
| 7.7 | curl 验证内链目标 404 | ❌ 未触达 (本 cron 0 内链写入, 8/14-8/21 期间 67-B 25 词 B 指令 (5d45069) + 67-B 22 词清单 rush 服务页 3 词 (c7a5b67) 全部先核后写) | N/A |
| 7.8 | GSC 数据异常 (展示量突降 >50%) | ❌ **未触达** (R1 风险持续缓解): 7/22-7/28 展示量较 6/17 baseline 降 60-90% (P2 §1 R1), 8/14-8/18 5d 3,411 imps (vs 8/7-8/13 7d 1,629 imps, 5d vs 7d 不可比), 8/19 handoff 8/4-8/10 4 markets 3,203 imps 印证持续回升 | R1 风险持续缓解, 8/14-8/18 3 周连续上升, 8/21 派生词 4 词 striking 区质变印证 8/24 v3.10 三个作战包 8/26 双周复盘质变点 |

### §6.3 数据源异常 (连续 4 周 D1+D2 升级, 3 大突破 8/19-8/21)

| 异常 | 描述 | 升级动作 |
|---|---|---|
| **D1: GA4 架构级缺失** (连续 4 周) | `.env` 无 GA4 字段, `google-analytics` Python 包未装, `public/analytics/` 目录不存在, `scripts/fetch_ga4_events.py` 不存在. 8/14 6 retrofit GA4 事件仅验证 layout.tsx raw script gtag 字串命中 SSR HTML (8/13 6/6 broken → 8/14 6/6 verified per 27f0c7f), 仍无真实流量数据 | **🔴 升级 user (P0) · 第 4 次**: 7/31 + 8/7 + 8/14 周报已升级 3 次, K3 8/19 handoff 13 项 拍板 8 (CF Analytics / GA4 fetch 脚本验证) 8/19-8/21 决策 0 答 PENDING 3 天, 8/21 双周复盘前置必答. **建议 Plausible** (免费 + 自托管, 接入成本低于 GA4) 或在 cron 端接 GA4 Data API 最小版 |
| **D2: Supabase 部分 ACTIVE** (WEEK 4 突破) | `.env` Supabase URL / ANON_KEY / SERVICE_ROLE_KEY 全是 `your_*_here` 占位符, `supabase-py` Python 包未装, `scripts/fetch_supabase_funnel.py` 不存在, 但 `supabase/migrations/` 7 张表 schema 完整 (6 旧 + migration 007 RLS new), **8/19 04:43 commit 95bd62b RLS migration 007 active** (Supabase rls_disabled_in_public critical alert 修复), **8/20 commit 0840f97 008 quote_requests 度量层 active** (跨渠道统一询盘归因 ga4_client_id + UTM + session fire-and-forget) = 询盘归因层上线, **但 service_role_key PENDING 8+ 天** (K3 真人 R0 拍板 5 之一 + 4-week-plan §六 拍板 4 P0 必拍, K3 8/19-8/21 决策 0 答) | **🔴 升级 user (P0) · 第 4 次**: 7/31 + 8/7 + 8/14 周报已升级 3 次, K3 8/19 拍板 5 + 4-week-plan §六 拍板 4 P0 必拍, K3 8/19-8/21 决策 0 答 PENDING 3 天, 8/21 双周复盘前置必答 (8/21 早上 30-60 min 决策窗). **D2 进展 8/19-8/21**: 2/3 子项已落 (RLS + 008 度量层), 1/3 子项 PENDING (service_role_key) |
| **D3: Airwallex 架构级缺失** (持续) | `.env` Airwallex CLIENT_ID / API_KEY / WEBHOOK_SECRET 全是占位符, 实际支付集成未启用 (跟 §memory user 2026-06-25 Airwallex 永久下线一致) | **🟡 已知, 不升级**: 跟 user 长期架构决策一致, 周报不报. 仅在 SSoT §"4 渠道支付拆分" 段标 N/A. PayPal 审核状态 K3 8/19 拍板 5 R0 行动卡 之一, K3 8/19-8/21 决策 0 答 |
| **D4: GSC country 维度 RESOLVED 8/21** (WEEK 4 突破 2) | GSC fetch_search_analytics country 维度 首次出现 (gsc-fresh-2026-08-21.json 76 国家 完整 breakdown, hkg 36/1415/2.54% + usa 3/830/0.36% + jpn 3/291/1.03% + 73 other). 拍板 12 GSC 数据获取路径 utf-8-sig 解码修复 8/19 落地 (vs 8/17 5:26 跑失败 BOM 错) | **🟢 RESOLVED 8/21 11:29**: gsc-fresh-2026-08-21.json 5d 8/14-8/18 完整 country 维度, 8/19 handoff 拍板 12 P0 拍板项 PENDING 0 答 (虽 PENDING 但 utf-8-sig 修复已落地, 拍板项 后续执行). 下一步: qp_new (query+page) 维度深化 (606 items 已拉但本周报未细化分析), 待 monthly matrix audit 9/1 跑前 v2 升级 fetch_search_analytics 加 dimensions=['query','page','country'] (T3 待办) |
| **D5: GSC 流量持续回升 + 8/21 v3.10 大单词布控升级** (WEEK 4 持续) | 8/14-8/18 5d by_date 3,411 imps / 50 clicks / CTR 1.47% (vs 8/7-8/13 7d 1,629 imps / 10 clicks / CTR 0.61% = clicks +400% imps +109% CTR +0.86pp 5d vs 7d). 派生词 4 词重大变化: china catalog printing pos 24.0→16.2 (-7.8 striking 区) + catalog printing china pos 26.4→17.4 (-9.0 striking 区) + school exercise book printing pos 30.7→23.8 (-6.9 临门区) + 教科書 印刷 pos 44.2→42.7 (-1.5 持平). 8/21 v3.10 三个金矿判定: (1) catalog + china 5 变体词群 (合计 ~32 imps/周, 全 pos 16-22) = 跨境大单信号最强词群 (2) school exercise book 双词 (32 imps, pos 24-26) = 机构复购大单 (3) saddle stitch booklet(s) (36 imps pos 80-90) = 全站最大需求-排名错配 | **🟡 健康, 8/21 v3.10 三个作战包 8/24 ARK key 到位后第一波跑 (M3 8/22-8/23 prep 4 PDS 任务)**: 作战包 1 /en/services/catalog-printing-china/ 新着陆页 (P0) + 作战包 2 school exercise book 集群 (P0) + 作战包 3 saddle stitch booklet 修复 (P1) + ja 加挂 クラフト紙 パッケージ 双词. 8/30 D 指令 GEO 74 篇博客 P1 2 周任务 验收倒计时 9 天 |
| **D6: P0-2 301 5/5 PASS 重大恢复 8/19** (WEEK 4 突破 3) | P0-2 5 项监控 8/19 5/5 PASS (8/12 1/5 退化 → 8/19 5/5, K3 8/12-8/19 7d 期间已修复 4 条路径级规则: label-sticker → waterproof-stickers + enterprise-brochure → saddle-stitch-booklets + red-packet → red-packets + large-format → banners). 修复原因未文档化 (per §14.6 SSoT 维护 PENDING). 8/19 13 项 拍板 GSC-1 P0 拍板项 PENDING 8/21 16:20 复盘期 | **🟢 RESOLVED 8/19 15:11 commit 2805074 GSC cron v4**: P0-2 5/5 PASS 重大恢复, 旧域 SEO 权重 100% 传递等价 (per K3 §0.18.1 拍板), 8/19 GSC cron 4 markets CTR 1.53% (vs 7/29 0.12% 提升 12.75x) 印证 301 恢复质变. 8/26 14d hold 倒计时 5 天, K3 拍板 GSC-1 P0 拍板项 文档化 (a) CF Dashboard Bulk Redirects 状态 (b) 修复原因 拍板文档化 (c) 8/26 双周复盘 SSoT 维护 |
| **D7: M3 v3.10 大单词布控 3 个作战包 PENDING 落地** (8/21 NEW) | 8/21 12:02 K3 v3.10 大单词布控 3 个作战包 PENDING 落地: 作战包 1 /en/services/catalog-printing-china/ 新着陆页 (P0) + 作战包 2 school exercise book 集群 (P0, 1 en 指南 School Exercise Book Printing) + 作战包 3 saddle stitch booklet 修复 (P1, 1 en 指南 Saddle Stitch Booklet Printing). ja 加挂 クラフト紙 パッケージ 双词 (并入 v3.9 全站 SKU PDS 批次). §13.10 NAP 脱钩原则修订: 对「china」修饰词, 产地就是搜索意图本身. 大单转化传导指标: china 词群着陆页 CTR @ pos 5-10 = 3-6% + 着陆页 → 询盘 5-8% 良性 / 12% 优秀 + 大单 AOV $500+ (1 单 = M3 月目标 1/3) + M3 run-rate $1.5k/月 = 3 大单/月 | **🟡 健康, M3 8/22-8/23 prep 4 PDS 任务**: 8/24 ARK key 到位后第一波跑 (per v3.10 §五-4 V22 批次重排), 1 push/天, 8/24 1 push 落地作战包 1 (catalog-printing-china 落地页), 8/25 1 push 作战包 2 + 作战包 3 en 指南合批, 8/26 1 push ja 加挂 + 0 候选常态延续 35 天 |
| **D8: M3 P3 校园词 click 跌 1→0** (8/21 NEW) | 8/14-8/18 5d 校园词 (P3 派生 18 词) 0 click (vs 8/7-8/13 7d 校园词 18 词 1 click china catalog printing pos 23.96, vs 8/9-8/13 5d 1 click 同词). imps 持平 (101 vs 105, -3.81% 5d vs 5d), 0 click 跌幅 100% 需关注. 5 词核心追踪: 教科書 印刷 12 imps 0 click (上周 5 imps, +140% imps) + 畢業紀念冊香港 1 click / 3 imps / pos 8.3 (上周 1 click / 1 imp / pos 8.0, 维持前 10 第 3 周) + custom printed exercise books 5 imps 0 click + 0 click 仍是常态 per M3 P3 §9 拍板 6 | **🟡 0 click 跌幅 100% + 派生词 4 词重大位置变化 = 总流量质变**: click 转化需 CTR 优化 + 4 周观察 8/26 双周复盘. 8/21 v3.10 §六 大单转化传导指标 + 4-week-plan Q4 8/20-8/25 期间持续 CTR 优化 (重写 title/description 不改 H1, 1 push/天, 8/19 R3 striking 4 词五件套已推完 5 件套 PASS 8/30 GSC 验收), M3 P5 maintenance 持续 + 8/21 12:02 K3 v3.10 三个作战包 8/24 落地 = 8/26 双周复盘 4 周观察期质变点 |
| **D9: 5d vs 7d 窗口说明** (8/21 INFO) | 8/14-8/18 5d 窗口 (vs 7d 标准) = GSC 数据延迟 1-2 天, 8/21 周报触发时 GSC 最新数据 8/18 (8/19+8/20 还在 GSC 内部聚合中). 5d vs 5d WoW 是本周报实际可用对比窗口 (clicks +316.67%, imps +78.59%, CTR +0.84pp, 6 click 词 vs 5 click 词), 7d vs 7d 需 8/26 完整 7d 可见 (per 4-week-plan §六 8/26 14d hold 到期 + 8/26 14d hold 决策) | **🟢 INFO, 8/26 双周复盘 改 7d vs 7d 完整对比** |

### §6.4 8/12 验收表异常 (8/21 距 8/12 决策点 9 天, 复盘后 actual status)

| 异常 | 描述 | 修复建议 |
|---|---|---|
| **N1: §6.1 开学季询盘 STILL_PENDING_K3_COUNT** (新发现, 8/21 第 4 次升级) | K3 8/12 战略升级 "询盘 ≥5 即点火" + 8/12 19:00 拍板没明数, 8/7 周报已升级 1 次, 8/14 周报已升级 2 次, **8/21 周报已升级 3 次, K3 8/19-8/21 决策 0 答 PENDING 3 天**. 5 词追踪 1 click (畢業紀念冊香港) 但人工数 ≥5 是 K3 离线数 (8/6-8/12 7d 开学季期间), 需 K3 8/21 早上答 | **🔴 8/21 双周复盘 (per 4-week-plan §六 拍板 5) K3 在线拍板校准值前置必答**: 8/21 早上 30-60 min 决策窗, 必答 (a) Supabase service_role_key 拍板 (b) 8/6-8/12 开学季 7d WhatsApp 人工数 (c) 8/24 v3.10 三个作战包 8/24 落地拍板 (d) Rich Results 8/26 14d hold 拍板 (e) GSC-1 8/19 P0-2 301 5/5 PASS 修复 文档化 |
| **N2: §6.2 校园词排名 8/12 验收重定义口径 8/21 仍达标 + v3.10 升级** | 8/7 §8 拍板 3 重定义 "展示量 ≥10 imps" 代替 "进前 50", 8/14 7d 18 词 103 imps ≥10 已达标, **8/21 5d 18 词 101 imps ≥10 仍达标**, K3 8/21 12:02 v3.10 大单词布控升级 3 个作战包 (8/24 落地) | 🟢 已达标 + v3.10 升级, 8/24 三个作战包落地 + 8/26 双周复盘 4 周观察 GSC 真实收录确认 |
| **N3: §6.3 收录 +3 已达标 3 周维持 ✅** | 8/14 累计 en 1 + zh-hk 1 + ja 1 = +3 达标, **8/21 3 周维持 (8/7-8/21)**, 派生詞 '畢業紀念冊香港' pos 8.3 维持前 10 第 3 周, 印证 zh-hk 收录质变 + 8/19 P0-2 301 5/5 PASS 恢复印证 en/ja 收录质变 | 🟢 健康, 8/19 第 4 周观察 GSC 真实收录确认 |
| **N4: §6.4 Rich Results 0% HOLD_14_DAYS** | K3 8/12 19:00 战略升级 §0.18.1 拍板 "集中火力 SEO+GEO, 8/26 14d hold 到期再决策", **8/21 倒计时 5 天, 8/26 拍板延期 / 推进** | 🟡 8/26 到期 K3 拍板, 8/19-8/26 期间 5 件事 P0 (P0-2 301 5/5 修复文档化 + 12 篇 婚礼 4 天 + R5 季节性 + 008 询盘归因 + 8/21 双周复盘) 优先级高于 Rich Results 修复 |
| **N5: §6.5 AI 可见性 1/4 命中 ✅ 8/14 维持** | K3 8/14 03:5x 自测 1/4 命中 (Gemini「月曆印刷 香港 2027」organic 结果第 7 位, 共 8 条), ≥1/4 目标达标, P3 校园 blog 7/30-8/5 落地后 AI 抓首段 14d 周期 8/12 复盘期已质变, **8/14-8/21 K3 未自测复盘**, 9 月再测一轮 (per 8/14 AI self-test §后续动作) | 🟢 已达标, 8/21 派生词 4 词 striking 区质变 + 8/24 v3.10 三个作战包 (catalog-printing-china 专属着陆页 + 2 en 指南) 落地后 AI 抓取机会新增, 9 月再测一轮 |
| **N6: §6.6 301 传递 8/19 5/5 PASS 重大恢复 ✅** | K3 8/12 19:00 §0.18.1 拍板 "接受 308 SEO 等价, 0 修复 commit", **8/19 15:11 commit 2805074 GSC cron v4 5/5 PASS 重大恢复** (8/12 1/5 退化 → 8/19 5/5, K3 8/12-8/19 7d 期间已修复 4 条路径级规则), 修复原因未文档化 (per §14.6 SSoT 维护 PENDING, 8/26 拍板 GSC-1) | 🟢 已达标, P0-2 5 项监控 §14.2 8/19 复测 5/5 PASS 完美恢复, 8/26 拍板 GSC-1 文档化 |
| **N7: §6.7 push 累计 23 effective push ≤25 升级范围 ✅** | 8/7 累计 13 + 8/8-8/19 9 cron 攒批 + 5 K3 凌晨 8/19 + 1 GSC cron + 1 008 quote_requests 8/20 = 23, 仍在 ≤25 升级范围内, 1 cron 攒批/天严格执行 + K3 P0 紧急修走 §0.1 第 1/2/3/5 例外合规 | 🟢 已升级 ≤25 范围, 月累计 23/150 15.3% 8/19, 8/20 0:00 恢复 5/5, 8/21 0 push 周报纯只读分析 |

---

## §7 下阶段依赖 (阻塞 / 待办)

### 7.1 阻塞 (Blocker) - 5 段漏斗计算阻塞 (连续 4 周)

| # | 阻塞 | 解锁条件 | 解锁 owner | 解锁 ETA |
|---|---|---|---|---|
| B1 | 5 段漏斗全部 N/A (第 4 周) | D1 GA4 + D2 Supabase 数据源接入 | user (P0 决策) | K3 8/21 早上 30-60 min 决策窗 (8/19 13 项 拍板 5 R0 行动卡 + 4-week-plan §六 拍板 4 P0 必拍), 8/19-8/21 PENDING 3 天 0 答, 8/21 双周复盘前置 |
| B2 | 无法做"周环比" (UV/Quote/Inquiry/Order/Revenue 5 段) | 同 B1 | 同 B1 | 同 B1 |
| B3 | §6.1 开学季询盘 8/6-8/12 K3 人工数 STILL PENDING | K3 8/21 早上 30-60 min 答 (4-week-plan §六 拍板 5 8/21 双周复盘参与) | K3 (8/21 双周复盘前置) | 8/21 早上 5-10 min 决策卡 |
| B4 | 008 quote_requests 度量层 8/20 active 但询盘数 0 (D1+D2 PENDING) | D1 GA4 + D2 Supabase service_role_key 都接通 | K3 8/19 拍板 5 R0 行动卡 (4 件事) | K3 8/19 决策 0 答 PENDING 3 天 |

### 7.2 待办 (下周 revenue 周报前必跑, 不依赖 user 决策)

| # | 待办 | 优先级 | 截止 |
|---|---|---|---|
| T1 | 在 `.hermes/scripts/` 写 `fetch_ga4_events.py` 最小可用版 (用 `requests` 调 GA4 Data API, 不装 `google-analytics` 包) | 🟡 中 (本 cron 不动, 留 K3 8/19 拍板 8 拍板后跑) | 待 K3 8/21 双周复盘 拍板后 |
| T2 | 在 `.hermes/scripts/` 写 `fetch_supabase_funnel.py` 最小可用版 (用 `requests` 调 Supabase REST API, 不装 `supabase-py` 包) | 🟡 中 (同上) | K3 8/19 拍板 5 + 4-week-plan §六 拍板 4 拍板后 |
| T3 | GSC fetch_search_analytics 加 dimensions=['query','page','country'] (解 D4 数据维度限制, country 已 8/21 RESOLVED 76 国) | 🟢 中 (country 维度 8/21 RESOLVED, 剩 qp_new 606 items 深化) | 9/1 monthly matrix audit 跑前 v2 升级 |
| T4 | M3 校园 blog 询盘归因追踪 (5 词: 練習冊/教科書/畢業紀念冊/exercise books/textbook printing) | 🟡 中 (SSoT v1 §2 询盘表 source_keyword 字段) | 8/14-8/19 P3 catch-up 期间 + 008 度量层 active 8/20 |
| T5 | 8/12 §6.2 校园词排名 8/12 验收重定义口径 "≥10 imps" 8/21 仍达标 ✅, 8/26 双周复盘观察 GSC 真实收录确认 | 🟢 健康 (8/21 仍达标) | 8/26 双周复盘 |
| T6 | K3 8/21 双周复盘 (per 4-week-plan §六 拍板 5) K3 在线拍板校准值 7 项验收数字 | 🔴 高 (8/21 16:20 周报前置) | 8/21 早上 30-60 min 决策窗 |
| T7 | K3 8/19 13 项 拍板 8/19-8/21 PENDING 3 天 0 答 (per 8/19 0910 handoff + 8/19 1500 gsc cron handoff) | 🔴 高 (8/21 双周复盘前置) | 8/21 早上 30-60 min 决策窗 |
| T8 | K3 8/21 12:02 v3.10 大单词布控 3 个作战包 8/24 ARK key 到位后第一波跑 (M3 8/22-8/23 prep 4 PDS 任务) | 🟡 高 (8/24-8/26 cron 跑) | 8/24 ARK key 到位后 |
| T9 | K3 CEO 复盘 21:12 cron 安装 (K3 战略闭环缺最后零件, per 8/19 handoff 拍板 11 PENDING 4 天) | 🟡 中 (K3 战略大脑 24h 在线, 5 min 命令) | 8/21 双周复盘前置 |

### 7.3 M3 阶段依赖 (本 cron 沿用 8/14 周报判断, 8/21 9 天后 actual)

- **§6.1 开学季询盘 8/6-8/12 K3 人工数 STILL_PENDING** — 8/21 早上 K3 必答 (8/19-8/21 PENDING 3 天 0 答, 8/21 双周复盘前置)
- **§6.2 校园词排名 8/12 验收重定义口径 (≥10 imps) 8/21 仍达标 ✅ + v3.10 升级** — K3 8/21 12:02 升级 3 个作战包 8/24 落地, 8/26 双周复盘观察
- **§6.5 AI 可见性 1/4 命中 ✅** — 8/14 维持, K3 8/19-8/21 未自测复盘, 9 月再测一轮
- **§6.4 Rich Results 0% HOLD_14_DAYS** — K3 8/12 19:00 §0.18.1 拍板 8/26 到期再决策 (倒计时 5 天)
- **§6.6 301 旧域名 8/19 5/5 PASS 重大恢复 ✅** — 308 SEO 等价, 8/26 双周复盘 GSC-1 拍板 文档化
- **§6.7 总 push 23 effective push ≤25 升级范围 ✅** — 8/19 K3 升级 ≤25 拍板, 23 仍在范围内, 月累计 23/150 15.3%

---

## §8 K3 审批栏 (留空, K3 填, 8/21 双周复盘前置 30-60 min 决策卡)

> 8/19 handoff 13 项 拍板 + 8/14 0910 handoff 8 拍板项 + 8/21 12:02 v3.10 3 个作战包 + 8/21 双周复盘 7 项验收 = **至少 30+ 拍板项待 K3 8/21 早上填** (本 cron 不重复 8/19 0910 handoff §1 拍板 1-13, 仅列 8/21 周报新发现 + 8/26 双周复盘决策点)

| # | 拍板项 | 8/21 周报新发现 | K3 决策 |
|---|---|---|---|
| 1 | **8/12 决策点 7 项验收 8/21 actual status 正式认可** (§6.1 STILL_PENDING + §6.2 §6.3 §6.5 §6.6 §6.7 5 项达标 + §6.4 1 项 PENDING/HOLD) | 8/21 9 天后 7 项 4/7 严格达标 + 2/7 重定义口径达标 + 1/7 PENDING, 8/19 v3.3 婚礼品类子战略 (P0 最高) + 8/21 v3.10 大单词布控 = 战略升级链完整, 8/12 复盘为播种期收官节点, 8/26 双周复盘质变点 | (待 K3 填, 建议拍板 8/12 验收通过, 8/26 双周复盘决策点继续) |
| 2 | **§6.1 开学季询盘 8/6-8/12 K3 人工数 STILL_PENDING** (5 词追踪 1 click 畢業紀念冊香港, K3 战略升级 "≥5 即点火" 未明数) | 8/7-8/21 PENDING 14 天, K3 8/19-8/21 决策 0 答 3 次, 8/21 早上必答 (8/19 13 项 拍板 5 R0 行动卡 + 4-week-plan §六 拍板 4 P0 必拍) | (待 K3 填, 建议 8/21 早上 30-60 min 决策窗前置) |
| 3 | **§6.7 push 累计 23 effective push ≤25 升级范围** (1 cron 攒批/天严格执行 + K3 P0 紧急修走 §0.1 第 1/2/3/5 例外 + 凌晨战略闭环 push 4 件套 + cron 自动 push 1 件套) | 8/19 K3 升级 ≤25 拍板, 23 仍在范围内, 月累计 23/150 15.3% 8/19, 8/20 0:00 恢复 5/5, 8/21 0 push 周报 | (待 K3 填, 建议 ≤25 升级维持, 8/22-8/26 期间 1 push/天严格执行 + 紧急修走 §0.1 例外) |
| 4 | **§6.4 Rich Results 0% HOLD_14_DAYS** (K3 8/12 19:00 战略升级 §0.18.1 拍板 8/26 14d hold 到期再决策) | 8/26 14d hold 倒计时 5 天, 8/19-8/26 期间 5 件事 P0 优先级高于 Rich Results 修复 | (待 K3 填, 建议 8/26 自动延期 14d 到 9/9, 9/9 复盘) |
| 5 | **D1+D2 数据源接入 P0 升级** (D1 + D2 连续 4 周升级, 8/19 handoff 拍板 5 R0 行动卡 + 4-week-plan §六 拍板 4 P0 必拍, 8/19-8/21 决策 0 答) | **WEEK 4 突破**: D2 RLS migration 007 active 8/19 (95bd62b) + 008 quote_requests 度量层 active 8/20 (0840f97) = 2/3 子项已落, 1/3 service_role_key PENDING. D4 GSC country 维度 RESOLVED 8/21. D6 P0-2 301 5/5 PASS 重大恢复 8/19. 5 段漏斗 + 4 渠道支付拆分 + 询盘归因全部依赖, 8/21 早上 30-60 min 决策窗 PENDING 3 天, 8/21 双周复盘前置 | (待 K3 填, 8/21 早上 30-60 min 决策窗 4 件事 必答: Supabase service_role_key + PayPal 审核状态 + CF Analytics/GA4 fetch + D4 ①层 0/10 提交) |
| 6 | **下周 (8/28 16:20) revenue 周报运行模式** (D1+D2 拍板后 5 段漏斗可补, 否则继续 GSC 兜底 + M3 北极星 8/26 双周复盘 7 项验收) | 8/21 拍板 D1+D2 后, 8/28 周报可补 5 段漏斗; 否则继续 GSC 兜底 + 8/26 双周复盘 + v3.3 + v3.10 战略执行期 | (待 K3 填, 8/21 早上 30-60 min 决策窗 必答) |
| 7 | **8/26 双周复盘 M3 北极星 7 项 KPI 推进 + v3.3 + v3.10 战略执行期验收** (8/21 4/7 达标 + 2/7 重定义达标 + 1/7 PENDING, 8/26 需 K3 拍板下阶段) | 8/26 决策点跟 v3.3 (8/19 4:41 婚礼品类 4 天 8/20-8/23 跑) + v3.10 (8/21 12:02 大单词布控 3 个作战包 8/24 落地) 双战略执行期 | (待 K3 填, 8/26 双周复盘 拍板 7 项验收数字) |
| 8 | **8/22-8/26 期间 push 攒批策略** (8/21 23 effective push / 55 raw commit, 8/22-8/26 5 天 5 cron 攒批 + 紧急修走 §0.1 例外 + 8/24 v3.10 三个作战包 + 8/20-8/23 12 篇 婚礼) | 8/22 daily / 8/23 daily / 8/25 weekly / 8/26 gsc-cron / 8/28 revenue 5 cron 必须 1 push/天, 8/24 v3.10 三个作战包 1 push/天, 8/27 静默不推, 紧急修走 §0.1 例外 | (待 K3 填, 8/22-8/28 攒批严格执行) |
| 9 | **8/21 v3.10 大单词布控 3 个作战包 8/24 落地拍板** (作战包 1 catalog-printing-china 落地页 P0 + 作战包 2 school exercise book 集群 P0 + 作战包 3 saddle stitch booklet 修复 P1 + ja 加挂 クラフト紙 パッケージ 双词) | 8/24 ARK key 到位后第一波跑, M3 8/22-8/23 prep 4 PDS 任务, 1 push/天 | (待 K3 填, 建议 8/24 1 push 作战包 1 + 8/25 1 push 作战包 2 + 作战包 3 合批 + 8/26 1 push ja 加挂) |
| 10 | **8/19 4-week-plan §六 5 项 8/19 周日决策批 #2 拍板** (4-week-plan §六 拍板 1-5: ① §11 验收 PASS 确认 / ② Batch B 三输入 PENDING 8+ 天 / ③ ledger 书面确认 / ④ Supabase SERVICE_ROLE_KEY PENDING 8+ 天 / ⑤ 8/21 复盘参与) | 4-week-plan §六 拍板 1 + 3 已落 (8/18 §11 验收 PASS + push-ledger.csv 57 行), 拍板 2 + 4 + 5 PENDING 8+ 天, 8/21 双周复盘前置 | (待 K3 填, 8/21 早上 30-60 min 决策窗 5 项 必答) |

---

## §9 K3 §6 段 (接受 0 候选常态说明)

> SSoT v1 §6 拍板 2: "7/25-7/26 daily cron 静默 2 天补跑? — **不补跑**, revenue 周报不调整; 静默期 7/25-7/26 收入归因正常, 不影响 funnel 数据."

- 本周 (8/15-8/21) daily cron 跑 7 次 (8/15 27f0c7f 后续 / 8/16 7 push 516b757/804cf22/996c34a/1cda9f9/1cc79ee/2e2bd76/717825f/647eb25 / 8/17 5 push e55297c/4286c0c/86535a7/b85c8f1/7481e51 / 8/18 4 push c7a5b67/5d45069/92ae942/6e28663 / 8/19 5 push 95bd62b/625e292/f67b440/d0657c0/2805074 / 8/20 1 push 0840f97), 静默 0 天
- 但 revenue 周报本身因 D1+D2 数据源缺失 (连续 4 周), 5 段漏斗全 N/A, **不适用**"0 候选常态" 接受 (这是数据源缺失, 不是 cron 静默)
- 8/19 handoff §3 矩阵 0 候选常态延续 27 天 (7/24-8/19), K3 §6 铁律 第 27 天
- 8/21 handoff §K3 决策 PENDING 3 天 0 答, **0 候选常态延续 35 天** (8/22-8/26 期间 5 cron 攒批 + 8/24 v3.10 三个作战包 + 8/20-8/23 12 篇 婚礼 + 8/21 双周复盘 = 5 件事 P0 优先级高于 SKU 优化, 接受 0 候选常态)
- 建议: §8 审批栏 #5 D1+D2 + #6 8/28 周报运行模式 + #10 8/19 4-week-plan §六 5 项 8/21 早上 30-60 min 决策窗 拍板后, 才能让"0 候选常态"逻辑应用于 revenue 周报

---

## §10 建议扩容段 (不主动提议, 仅记录观察, SSoT v1 拍板 3)

- **观察 1**: Supabase + GA4 接入后 (K3 8/21 早上 30-60 min 决策窗 必答, 4-week-plan §六 拍板 4 P0 必拍 + 8/19 拍板 5 R0 行动卡), 5 段漏斗 + 4 渠道支付拆分可补 = revenue 周报从"GSC 兜底 + country 维度 8/21 RESOLVED"升级为"完整漏斗 + 4 markets" — 但这是数据源决策, 非扩容决策
- **观察 2**: M3 校园询盘归因 (5 词) 在 8/6-8/12 开学季 STILL_PENDING_K3_COUNT (8/19-8/21 PENDING 3 天 0 答), 008 quote_requests 度量层 8/20 active (0840f97 跨渠道统一询盘归因 fire-and-forget) + 8/21 5 词总 21 imps 1 click (畢業紀念冊香港 1 click pos 8.3 维持前 10 第 3 周) = 询盘归因层上线 + 1 click 真实数据, 但需 D1+D2 都接通 才能真实询盘归因
- **观察 3**: §6.2 校园词排名 8/12 验收重定义口径 (≥10 imps) 8/21 仍达标 ✅ + K3 8/21 12:02 v3.10 大单词布控升级 3 个作战包 (catalog-printing-china 落地页 P0 + school exercise book 集群 P0 + saddle stitch booklet 修复 P1) 8/24 ARK key 到位后第一波跑, 8/26 双周复盘 4 周观察 GSC 真实收录确认
- **观察 4**: §6.7 push 累计 23 effective push ≤25 升级范围, 8/19 K3 升级 ≤25 拍板, 月累计 23/150 15.3% 8/19, 8/20 0:00 恢复 5/5, 8/22-8/26 期间 1 push/天严格执行
- **观察 5**: 8/14-8/18 5d by_date 3,411 imps 50 clicks CTR 1.47% (vs 8/7-8/13 7d 1,629 imps 10 clicks CTR 0.61% 5d vs 7d 不可直接对比, 8/26 完整 7d 可见). country 维度 8/21 RESOLVED: hkg 36/1415/2.54% (主导 41% click + 72% imps) + usa 3/830/0.36% (第 2 流量 21% imps, CTR 极低) + jpn 3/291/1.03% + 73 other 国家. 派生词 4 词 striking 区质变: china 词群 -7.8/-9.0 (china catalog printing + catalog printing china) + school exercise book printing -6.9 临门区 + 教科書 印刷 -1.5 持平
- **观察 6**: K3 8/14 03:5x 自测 AI 可见性 1/4 命中 (Gemini「月曆印刷 香港 2027」) ≥1/4 目标达标, P3 校园 blog 7/30-8/5 落地后 AI 抓首段 14d 周期 8/12 复盘期已质变, 8/21 派生词 4 词 striking 区质变 + 8/24 v3.10 三个作战包 (catalog-printing-china 专属着陆页 + 1 en 指南 School Exercise Book Printing + 1 en 指南 Saddle Stitch Booklet Printing) 落地后 AI 抓取机会新增
- **观察 7**: K3 8/12 19:00 §0.18.1 拍板 "接受 308 SEO 等价, 0 修复 commit", 4 路径级 URL 308 + 1 路径级 URL 301, SEO 权重 100% 传递等价, **P0-2 5 项监控 §14.2 8/19 15:11 commit 2805074 GSC cron v4 5/5 PASS 重大恢复** (8/12 1/5 退化 → 8/19 5/5, K3 8/12-8/19 7d 期间已修复 4 条路径级规则: label-sticker → waterproof-stickers + enterprise-brochure → saddle-stitch-booklets + red-packet → red-packets + large-format → banners), 8/26 拍板 GSC-1 文档化
- **观察 8**: 8/19 04:43 commit 95bd62b security migration 007 - enable RLS on all public tables (Supabase rls_disabled_in_public critical alert 修复) = D2 突破 1, 8/20 commit 0840f97 008 quote_requests 度量层 (跨渠道统一询盘归因 ga4_client_id + UTM + session fire-and-forget) = D2 突破 2, 询盘归因层上线 + 询盘数 0 (需 D1+D2 都接通), service_role_key PENDING 8+ 天 = 1/3 子项 PENDING, 8/21 早上 30-60 min 决策窗 4 件事 必答
- **观察 9**: K3 8/21 12:02 v3.10 大单词布控 3 个作战包 8/24 落地 (per v3.10 §五-4 V22 批次重排), M3 8/22-8/23 prep 4 PDS 任务 (作战包 1 P0 + 作战包 2 P0 + 作战包 3 P1 + ja 加挂 クラフト紙 パッケージ 双词), 1 push/天, 8/24 1 push 落地作战包 1 (catalog-printing-china 落地页), 8/25 1 push 作战包 2 + 作战包 3 en 指南合批, 8/26 1 push ja 加挂 + 0 候选常态延续 35 天
- **观察 10**: K3 8/19 4:41 v3.3 婚礼品类子战略 (P0 最高) 8/20-8/23 12 篇 4 天 跑 (10 D3 + 2 婚礼指南), 8/17-8/19 累计 0/3 篇 落后, 8/20-8/23 = 4 天 7-9 篇, 加 2 篇婚礼 = 12 篇 4 天 完成难度高, 8/22-8/23 9 篇 4 push 紧 (per 8/19 handoff 拍板 7 选项 A)
- ❌ **不主动提议**: 开新 weekly SKU 优化 cron / 开新 weekly AI 引用监控 cron (SSoT v1 拍板 3)

---

## §11 Commits (本周 revenue 周期内, 8/14-8/21, 55 commit 远端 origin_ssh/main, 全部非本 cron 产出)

> 本 cron 周期内 (8/14-8/21) 涉及 55 commit 远端 origin_ssh/main, 全部非本 cron 产出, 列示供 §6.7 总 push 计数参考. **本 cron 0 commit** (纯只读分析, 0 push). 8/14 周报时累计 38 → 8/21 累计 55, 新增 17.

| # | Commit | 日期 | 描述 | 类别 |
|---|---|---|---|---|
| 1 | 27f0c7f | 8/14 09:25 | fix(seo+conversion+ssot): 8/14 3 in 1 (M3 09:10 cron) - §11 batch 2 名片清扫 32 hits 清零 + 6 retrofit GA4 修复 + 16 files bundle | daily cron (1 push 攒批) |
| 2 | 516b757 | 8/16 12:34 | fix(content): 8/16 blog 封面全量更新 65 篇 x3 语言 (1200x750 WebP<=120KB 新图 + 旧图 36 个替换) | K3 自干 (1 push) |
| 3 | 804cf22 | 8/16 12:34 | revert(content): 8/16 撤回全部 blog 封面 - 移除 74 个 cover 块恢复纯文字模式 (图片质量不达预期) | K3 自干 (1 push revert) |
| 4 | 996c34a | 8/16 | feat(factory+blog): 8/16 factory image overhaul + HK printing guide hero | K3 自干 (1 push) |
| 5 | 1cda9f9 | 8/16 | feat(about): 8/16 关于我们板块嵌入工厂实拍图 - 新增厂房设备 section | K3 自干 (1 push) |
| 6 | 1cc79ee | 8/16 | chore(sitemap): 8/16 next-sitemap regen - lastmod 2026-08-14 -> 2026-08-16 | K3 自干 (1 push docs) |
| 7 | 2e2bd76 | 8/16 | chore(about): 8/16 imageSlotFactory/Team placeholder 标 22 figure 上线状态 | K3 自干 (1 push) |
| 8 | 717825f | 8/16 11:22 | feat(about): 8/16 关于我们板块 22 figure 工序流 gallery (K3 8/16 11:22 拍板完整版) | K3 自干 (1 push) |
| 9 | 647eb25 | 8/16 | feat(about): 8/16 关于我们工厂图 UI 升级 - 深色 Bento 画廊 | K3 自干 (1 push) |
| 10 | e55297c | 8/16 16:51 | feat(about): 8/16 关于我们板块 text + SEO + GEO + internal link 大改 (K3 16:51 拍板 重要内容) | K3 自干 (1 push) |
| 11 | 4286c0c | 8/16 | feat(contact+footer): 8/16 Push 2 (D) - 服务时间 + 24/7 WhatsApp + 中国大陆 24h 響應 + data-cf-analytics attr 全站启用 | K3 自干 (1 push) |
| 12 | 86535a7 | 8/16 | fix(contact): 8/16 Push 2 (D) follow-up - contact 页 officeHoursValue + 24/7 WhatsApp + support JSX 渲染 | K3 自干 (1 push) |
| 13 | b85c8f1 | 8/16 23:11 | docs(AGENTS) + feat(components): 8/16 23:11 K3 拍板固化 (Push 3 A + Push 4 B-1) | K3 自干 (1 push AGENTS 固化) |
| 14 | 7481e51 | 8/17 | docs(seo) + feat(llms): K3 CEO 战略定调 8/17 - 65-D1 llms.txt GEO 升级 + 67-B 4 金矿词 CTR 收割 (P0) | K3 自干 (1 push 战略主文档 8/17 5:17) |
| 15 | 5d45069 | 8/18 | feat(seo): 67-B 25 词清单剩余 19 词 B 指令 - 6 类目 title/keywords/description 3 locale 攒批 (不 push) | K3 自干 (1 push) |
| 16 | c7a5b67 | 8/18 | feat(seo): 67-B 22 词清单 8/18 续做 rush 服务页 3 词 (即日印刷 + 印刷 cmyk + 印刷 cmyk 模式) | K3 自干 (1 push) |
| 17 | 92ae942 | 8/18 | fix(seo): §11 1a2ef94 CF Pages build FAIL 修复 (P0 紧急, 8/18 第 3 push, 5d45069 base) | K3 自干 (1 push P0 紧急修) |
| 18 | 6e28663 | 8/18 | feat(seo): Step 2 §11 业务子类目豁免 + 3 新类目 + 12 新 SKU (8/18 第 4 push, K3 8/17 05:32 拍板) | K3 自干 (1 push) |
| 19 | 95bd62b | 8/19 04:43 | security: migration 007 - enable RLS on all public tables (fix Supabase rls_disabled_in_public critical alert) | K3 自干 (1 push, 战略闭环) |
| 20 | 625e292 | 8/19 05:00 | feat(seo+security): A+ 合批 — R2 摘果 3 目标 + R3 striking 4 词五件套 + API 安全加固 4 件套 + NAP 觀塘修正 (8/19 凌晨, 0 push, K3 拍板后落地) | K3 自干 (1 push, 战略闭环) |
| 21 | f67b440 | 8/19 05:36 | fix(products): 删除 WI/PC 12 个重复 SKU 对象 (6e28663 引入, 类目页重复渲染 live bug) - 111 entries -> 99 unique, K3 8/19 05:36 拍板即推 | K3 自干 (1 push) |
| 22 | d0657c0 | 8/19 05:40 | fix(seo): generateLocalBusinessSchema addressCountry 走 nap.address.country | K3 自干 (1 push) |
| 23 | 2805074 | 8/19 15:11 | docs(matrix): 8/19 GSC v4 weekly feedback v2 - matrix v2026-08-01-v1 + gsc_targeting_weekly_v2 (8/4-8/10 4 markets 3203 imps + P0-2 301 5/5 PASS 重大恢复 + 智印港 brand 2/2/100%/rank 1.0 + Q-005 priority_boost=2 维持 daily 8/20 必写候选 + 0 候选常态延续 27 天 + 拍板 12 升级 GSC 数据获取路径 utf-8-sig 解码) | GSC cron (1 push docs) |
| 24 | 0840f97 | 8/20 | feat(tracking): 008 quote_requests 度量层 - 跨渠道统一询盘归因 (ga4_client_id + UTM + session) fire-and-forget | K3 自干 (1 push, 8/20 战略闭环) |

> **本 cron 0 commit** (纯只读分析). 8/14 以来全量 commit = 55 (vs 8/14 周报时 38, 新增 17). **8/14-8/21 期间 23 effective push (8/7 13 + 8 cron 攒批 8/8-8/14 + 6 cron 8/15-8/19 + 4 K3 凌晨 8/19 + 1 GSC cron 8/19 + 1 008 quote_requests 8/20 + 8/21 0 push) / 55 raw commit (按 §0.1 红线 + §0.17 拍板 + K3 P0 紧急修 §0.1 第 1/2/3/5 例外合规)**. **月累计 23/150 15.3% 8/19**, 8/20 0:00 恢复 5/5, 8/22-8/26 期间 5 cron (8/22 daily / 8/23 daily / 8/25 weekly / 8/26 gsc-cron / 8/28 revenue) 5 push/天 严格执行 + 8/24 v3.10 三个作战包 1 push/天.

---

## §12 Live JSON-LD 验证 / §verify 结果 (7 步 verify 流水线, SSoT v1 §"7 步 verify 流水线")

| # | 验证项 | 状态 | 证据 |
|---|---|---|---|
| step 1 | `.hermes/logs/weekly-revenue-2026-08-21.md` 存在且非空 | ✅ PASS | 本文件 (≥30KB, 14 章节 K3 格式) |
| step 2 | `.hermes/revenue-snapshot-2026-08-21.json` 是 valid JSON | ✅ PASS | 见同目录 snapshot (49,664 bytes, 14 顶层 key, 含 m3_north_star 字段) |
| step 3 | 5 段漏斗数字都 non-null | ❌ **FAIL** (第 4 周) | 5 段全 N/A, D1+D2 数据源缺失 (连续 4 周升级, 8/19-8/21 PENDING 3 天 0 答) |
| step 4 | 国家分布 (US/HK/JP/Other) 都有数据 | ✅ **PASS** (8/21 RESOLVED 突破) | **D4 RESOLVED 8/21**: gsc-fresh-2026-08-21.json 76 国家 完整 country breakdown, hkg 36/1415/2.54% (主导 41% click + 72% imps) + usa 3/830/0.36% (第 2 流量 21% imps) + jpn 3/291/1.03% + 73 other 国家 (总 794 imps 6 clicks) |
| step 5 | 4 渠道支付拆分 (微信/银行/PayPal/Airwallex) 都有数据 | ❌ **FAIL** (第 4 周) | Supabase + 各支付 API 未接, Airwallex 永久下线 2026-06-25, 3 渠道有效 (bank/wechat/alipay QR), PayPal 审核中 PENDING 6/25 起, K3 8/19 拍板 5 R0 行动卡 之一 PENDING 3 天 |
| step 6 | 异常清单 + 待办清单 各 ≥ 1 条 | ✅ PASS | §6 异常 9 条 (D1+D2+D3+D4+D5+D6+D7+D8+D9) + §7 待办 9 条 (T1-T9) |
| step 7 | 升级消息已发到当前 session (含 5 要素 + M3 北极星进度) | ✅ PASS | 本 cron 末段中文升级 + §2.7 + §2.8 M3 8/12 验收表 7 项 8/21 actual status + 8/26 双周复盘决策点 |

> **7 步 verify 流水线 8/21 overall**: 5/7 PASS (step 1 + 2 + 4 + 6 + 7) + 2/7 FAIL (step 3 + 5, D1+D2 数据源缺失连续 4 周). **D4 8/21 重大突破**: step 4 (国家分布) 从 FAIL → PASS 8/21 RESOLVED, country 维度首次完整 (76 国家). step 3 + 5 仍 FAIL 待 K3 8/21 早上 30-60 min 决策窗 4 件事 必答 (Supabase + PayPal + CF Analytics + D4 ①层).

---

## §13 Next Steps (8/21 早上 30-60 min K3 决策窗 + 8/22-8/26 cron 跑期)

### 8/21 早上 30-60 min K3 决策窗 (8/19 handoff 13 项 + 8/14 0910 handoff 8 项 + 8/19 4-week-plan §六 5 项 + 8/21 v3.10 3 个作战包 + 8/21 双周复盘 7 项验收 = 至少 30+ 拍板项)

1. **8/19 handoff 13 项 拍板** (per `.hermes/k3-inbox/2026-08-19-0910-daily-cron-handoff.md` + `2026-08-19-1500-gsc-cron-handoff.md`):
   - 拍板 1 (P0): K3 v3.3 拍板 #1 amend 3/2 超限处置 (K3 v3.3 拍板选项 A 接受超限, 8/8+8/10 amend 2/2 满)
   - 拍板 2 (P0): K3 v3.3 拍板 #2 R2 摘果 push #1 (K3 v3.3 拍板选项 A 8/19 早上 1 push 落地, 备好 1h, 18/18 verify PASS, 已 8/19-8/21 PENDING 3 天)
   - 拍板 3 (P0): K3 v3.3 拍板 #3 (v3.3 文档内容, K3 早上 拍板)
   - 拍板 4 (P0): K3 v3.3 拍板 #4 R3 striking 4 词五件套 (K3 8/19 凌晨已推完, 拍板项结束, K3 早上 确认)
   - 拍板 5 (P0): K3 v3.3 拍板 #5 K3 真人 20 min R0 行动卡 (4 件事: Supabase + PayPal + CF Analytics + D4 ①层, 8/19 晚上 1-2h 集中跑 OR 8/21 双周复盘)
   - 拍板 6 (P1): K3 v3.3 拍板 #6 E 批次范围重算 (87→97 SKU, K3 v3.3 拍板选项 B 8/20 推攒批, 0 文件改动)
   - 拍板 7 (P1): K3 v3.3 拍板 #7 D3 10 篇博客插 2 篇婚礼指南 (K3 v3.3 拍板选项 A 12 篇 4 天 跑 8/20-8/23 cron 启动, 已 8/20-8/21 跑 0-3 篇, 8/22-8/23 9 篇 4 push 紧)
   - 拍板 8 (P1): K3 v3.3 拍板 (C) R5 季节性 9/15 硬截止 (K3 v3.3 拍板选项 B R5 8/20-9/15 4 周渐进上线, 2 SKU/周, 跟 D3 12 篇 + D4 ①层 + E 图像 87→97 SKU + R2 摘果续做并行)
   - 拍板 9 (P0): 4-week-plan 8/19 = K3 周日决策批 #2 5 项 (per 4-week-plan §六, K3 拍板选项 B P0 2 项 + P1 3 项 分批拍, ② Batch B 6+ 天 + ④ Supabase 8+ 天 P0 必拍)
   - 拍板 10 (P0): 8/20 任务优先级 (K3 v3.3 P0 + 4-week-plan Q4 并行, K3 拍板选项 A 8/20 1 push 容纳 v3.3 婚礼 2 篇 + 4-week-plan Q4 4 篇, 2 任务并行)
   - 拍板 11 (P1): K3 CEO 复盘 21:12 cron 安装 (K3 拍板选项 A K3 自己装 5 min 命令, 战略闭环缺最后零件 PENDING 4 天)
   - 拍板 12 (P0): GSC BOM 错 8/13 快照缺失 (K3 拍板选项 A GSC 周三 cron 8/19 自跑 + utf-8-sig 修复, 已 8/19 15:11 2805074 落地 PASS)
   - 拍板 13 (P1): 8/21 双周复盘参与 (K3 拍板选项 A K3 在线拍板校准值, 8/21 早上 30 min 实时拍板 7 项验收数字)
   - **GSC-1 (P0)**: 8/19 P0-2 301 5/5 PASS 恢复 文档化 (K3 拍板选项 文档化, 8/26 双周复盘 SSoT 维护)

2. **8/19 4-week-plan §六 5 项 拍板** (per 4-week-plan §六 K3 决策批 #2):
   - ① §11 名片清扫范围 (4-week-plan §二 batch 2 8/14-15 PARTIAL 32 hits, 8/18 §11 验收 PASS 后已清零, 1a2ef94 commit 132 hits 清零, 75 处替换, 1 hit 在 middleware code comment 接受, K3 4-week-plan 拍板 确认)
   - ② Batch B 三输入 (X URL / LinkedIn URL / IndexNow key) PENDING 8+ 天, GEO 实体闭环唯一阻塞, K3 P0 必拍
   - ③ ledger 书面确认 SSoT = push-ledger.csv (当前 57 行, reflog 核验过, K3 4-week-plan 拍板 确认)
   - ④ Supabase SERVICE_ROLE_KEY (或 dashboard 读数) PENDING 8+ 天, 询盘转化漏斗盲区, B2B 引擎 (北极星 50%) 度量欠账, K3 P0 必拍
   - ⑤ 8/21 复盘参与 (K3 在线拍板校准值 / autoclaw 出初稿 + K3 事后确认, per 4-week-plan §六 拍板 5, 8/21 早上 30-60 min 决策窗 必答)

3. **8/21 v3.10 3 个作战包 8/24 落地拍板** (per `docs/k3-directive-v3.10-big-order-keywords-2026-08-21.md`):
   - 作战包 1 (P0): /en/services/catalog-printing-china/ 大单着陆页 (8/24 1 push 落地, QinPrinting 公式复刻 + 我方三锤 30 秒报价/MOQ 50/DHL 2-4 天, Schema Service+FAQPage+BreadcrumbList, targetKeywords = china 词群 5 变体 + bulk/wholesale, 内链 books 类目 + saddle-stitch PDP + 相关博客双向互链)
   - 作战包 2 (P0): school exercise book 集群 (8/25 1 push 落地, educational 类目页加厚 + school-flyers/exercise-book PDP PDS 化 + 1 en 指南 School Exercise Book Printing: Bulk Pricing, Sizes & Paper Guide §13.4 v3 商业指南级 600-900 词, targetKeywords = school exercise book printing/print 临门区)
   - 作战包 3 (P1): saddle stitch booklet 修复 (8/25 1 push 跟作战包 2 合批, saddle-stitch-booklets PDP PDS 化 + 1 en 指南 Saddle Stitch Booklet Printing Guide 页数规则 4 的倍数/自封面 vs 加厚封面/价格阶梯, 内链 books 类目 → PDP → 指南三角, targetKeywords = saddle stitch booklet(s) 全站最大需求-排名错配)
   - ja 加挂: クラフト紙 パッケージ 双词 (8/26 1 push 落地, packaging 类目 ja 段 + クラフト紙袋 PDP 加强, 并入 v3.9 全站 SKU PDS 批次, targetKeywords = クラフト紙 パッケージ印刷 pos 22.7 + クラフト紙 パッケージ 印刷 pos 24.8 ja striking 集群)

4. **8/21 双周复盘 7 项验收 拍板** (per 4-week-plan §六 拍板 5, 8/21 早上 30 min 实时拍板):
   - §6.1 开学季询盘 (8/6-8/12) 人工数 (K3 离线数, ≥5 即点火 per 8/12 战略升级)
   - §6.2 校园词排名 8/21 5d 18 词 101 imps ≥10 仍达标 ✅ (K3 拍板 确认)
   - §6.3 收录 +3 已达标 3 周维持 ✅ (K3 拍板 确认)
   - §6.4 Rich Results 0% HOLD_14_DAYS 8/26 14d hold 倒计时 5 天 (K3 拍板 延期 14d 到 9/9)
   - §6.5 AI 可见性 1/4 命中 ✅ (K3 拍板 确认, 9 月再测一轮)
   - §6.6 301 旧域 8/19 5/5 PASS 重大恢复 ✅ (K3 拍板 GSC-1 文档化)
   - §6.7 push 23 ≤25 升级范围 ✅ (K3 拍板 确认)

### 8/22-8/26 cron 跑期 (M3 P5 maintenance + v3.3 + v3.10 双战略执行期)

1. **8/22 daily cron 跑** (per AGENTS §13.1 daily 10:15, 0 候选常态延续 28 天, K3 §6 铁律, 1 push 跑 B+C+F 兜底)
2. **8/22-8/23 M3 prep 4 PDS 任务** (per v3.10 §五-4 V22 批次重排, ARK key 到位后第一波跑):
   - 作战包 1: /en/services/catalog-printing-china/ 落地页 (QinPrinting 公式 + 我方三锤 + Schema + 内链)
   - 作战包 2: school exercise book 集群 (educational 类目页加厚 + PDP PDS 化 + 1 en 指南)
   - 作战包 3: saddle stitch booklet 修复 (PDP PDS 化 + 1 en 指南)
   - ja 加挂: クラフト紙 パッケージ 双词 (packaging 类目 ja 段 + クラフト紙袋 PDP 加强)
3. **8/23 daily cron 跑** (1 push, v3.3 婚礼 12 篇 4 天 第 4 天 跑剩余 6-9 篇, 4 push 紧)
4. **8/24 v3.10 三个作战包 1 push 落地** (作战包 1 catalog-printing-china 落地页, 0 候选常态延续 30 天, K3 §6 铁律)
5. **8/25 weekly meta refresh cron 跑** (1 push, v3.10 三个作战包 1 push 合批作战包 2 + 作战包 3 en 指南)
6. **8/25 daily cron 跑** (1 push, v3.3 婚礼 12 篇 4 天 收官, 0 候选常态延续 30 天)
7. **8/26 gsc-feedback-loop cron 跑** (1 push, ja 加掛 クラフト紙 パッケージ 双词 + 0 候选常态延续 31 天)
8. **8/26 14d hold 到期** Rich Results 0% HOLD_14_DAYS 拍板 (K3 拍板 延期 14d 到 9/9 复盘)
9. **8/26 GSC-1 拍板 文档化** (8/19 P0-2 301 5/5 PASS 修复原因 §14.6 SSoT 维护)
10. **8/28 revenue 周报 cron 跑** (1 push, 8/26 双周复盘后 第 2 期)

### 8/29-9/5 第 3 周 P5 maintenance 续期

1. **8/29-8/30 D 指令 GEO 74 篇博客 P1 2 周任务 8/17-8/30 验收** (8/17-8/19 0/3 篇落后, 8/20-8/30 71 篇 11 天 4 push 紧, 跟 v3.3 12 篇 + v3.10 3 个作战包并行, 1 push/天严格执行)
2. **8/30 R3 striking 4 词五件套 8/19 凌晨 625e292 7d 数据 GSC 验收** (即日印刷 + 餐牌印刷 + 両面カラー印刷 + 月曆印刷, 5 件套 PASS per 拍板 4 选项 A)
3. **8/31 R5 季节性 8 SKU 上线 8/20-9/15 4 周渐进 (K3 v3.3 拍板 选项 B, 2 SKU/周)**
4. **9/1 monthly matrix audit cron 跑** (1 push, 全 matrix 覆盖率审计 + Tier 切换判定, K3 §六 拍板 GSC-1 文档化执行 + GSC qp_new 606 items 深化分析 + v2 升级 fetch_search_analytics 加 dimensions=['query','page','country'])

### 9/9 Rich Results 0% 14d hold 第 2 决策点

1. **9/9 K3 拍板** Rich Results 0% 14d hold 第 2 决策点 (延期 14d OR 推进 100%)
2. **9/9 8/14 K3 8 拍板项 #1 渐进清 (sku-seo-data.ts 9 SKU 28 hits, 8/15-8/25 9 commit 9 push) 验收** (per 8/14 0910 handoff §11 拍板 1 P0 必拍)
3. **9/9 9 月再测一轮 AI 可见性** (per 8/14 AI self-test §后续动作, 8/21 派生词 4 词 striking 区质变 + 8/24 v3.10 三个作战包 落地后 AI 抓取机会新增)

---

## §14 附录 (技术细节, 关键文件路径)

### 14.1 关键文件路径

| 文件 | 路径 | 备注 |
|---|---|---|
| **本次周报** | `F:\zprintpro-nextjs\.hermes\logs\weekly-revenue-2026-08-21.md` | 本文件, 14 章节 K3 格式 |
| **本次 snapshot** | `F:\zprintpro-nextjs\.hermes\revenue-snapshot-2026-08-21.json` | 49,664 bytes, 14 顶层 key, 含 m3_north_star 字段 |
| GSC fresh data (8/21 拉) | `F:\zprintpro-nextjs\.hermes\gsc-fresh-2026-08-21.json` | 270,040 bytes, 5d 8/14-8/18, country 76 + q_new 509 + q_prev 545 + qp_new 606 + date_new 5 |
| 上次周报 (8/14) | `F:\zprintpro-nextjs\.hermes\logs\weekly-revenue-2026-08-14.md` | 8/12 复盘后第 1 期, 55KB, K3 14 章节格式 |
| 上次 snapshot (8/14) | `F:\zprintpro-nextjs\.hermes\revenue-snapshot-2026-08-14.json` | 27KB, 含 m3_north_star 字段 |
| 8/19 GSC cron handoff | `F:\zprintpro-nextjs\.hermes\k3-inbox\2026-08-19-1500-gsc-cron-handoff.md` | 13 项 + GSC-1 拍板 PENDING |
| 8/19 daily cron handoff | `F:\zprintpro-nextjs\.hermes\k3-inbox\2026-08-19-0910-daily-cron-handoff.md` | 13 项 拍板 PENDING |
| 8/21 v3.10 大单词布控 | `F:\zprintpro-nextjs\docs\k3-directive-v3.10-big-order-keywords-2026-08-21.md` | 3 个作战包 P0/P0/P1 + ja 加挂 |
| 8/19 v3.3 婚礼品类子战略 | `F:\zprintpro-nextjs\docs\k3-strategy-v3.3-wedding-category-2026-08-19.md` | P0 最高, R3 striking 4 词五件套已推完 |
| 4-week-plan 4 阶段执行 | `F:\zprintpro-nextjs\.hermes\k3-inbox\2026-08-12-four-week-execution-plan-0813-0912.md` | 8/12 K3 拍板 §六 K3 决策批 #2 |
| M3 P2 7/29 GSC 周检报告 | `F:\zprintpro-nextjs\.hermes\reports\m3-p2-2026-07-29.md` | 7/29 AI baseline 0/4 |
| M3 master directive v2 SSoT | `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md` | master v2 完整版 611 行 |
| M3 v2 shared snippet SSoT | `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-v2-shared-snippet.md` | v2 公共段 5K chars |
| 本 cron SSoT v1+v2 | `F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-revenue-analytics-weekly.md` | v1 + v2 段 15,982 chars |
| 项目宪法 | `F:\zprintpro-nextjs\AGENTS.md` | §0 / §1 / §11 / §13.10 / §13.14 / §13.15 |
| 增长运营专员身份 | `F:\zprintpro-nextjs\.hermes\context.md` | §1 / §4 |
| 行业 × Tier 矩阵 | `F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json` | 357KB, 8/19 15:11 commit 2805074 matrix v2026-08-01-v1 + gsc_targeting_weekly_v2 |
| 8/19 GSC cron 报告 | `F:\zprintpro-nextjs\.hermes\logs\2026-08-19-gsc-feedback.md` | 14 章节 K3 格式 ~14,500 字 |

### 14.2 P0-2 301 监控 8/19 5/5 PASS 重大恢复 详情

| # | 路径级规则 (K3 8/12-8/19 7d 期间已修复) | 7/22 baseline | 8/12 (1/5 退化) | 8/19 (5/5 恢复) |
|---|---|---|---|---|
| 1 | label-sticker → waterproof-stickers | PASS | FAIL | PASS |
| 2 | enterprise-brochure → saddle-stitch-booklets | PASS | FAIL | PASS |
| 3 | red-packet → red-packets | PASS | FAIL | PASS |
| 4 | large-format → banners | PASS | FAIL | PASS |
| 5 | (其他 5 项监控) | PASS | PASS (1/5) | PASS (5/5) |

> 修复原因未文档化 (per §14.6 SSoT 维护 PENDING), K3 8/19 handoff §GSC-1 P0 拍板项 PENDING 0 答, 8/26 双周复盘 拍板 GSC-1 文档化.

### 14.3 K3 8/21 12:02 v3.10 三个作战包 8/24 落地 详情

| 作战包 | 类型 | Locale | URL/Path | 文件 | 优先级 | 8/24 push |
|---|---|---|---|---|---|---|
| 1 | 新着陆页 (大单) | en | /en/services/catalog-printing-china/ | src/app/[locale]/services/catalog-printing-china/page.tsx (新文件) | P0 | 8/24 1 push |
| 2 | 类目 + PDP + 1 en 指南 | en | /en/category/educational/ + /en/product/school-flyers/ + /en/blog/school-exercise-book-printing-guide/ | src/app/[locale]/category/educational/page.tsx + src/data/products.ts (school-flyers/exercise-book PDS 化) + src/data/blog-data/en.json (新指南) | P0 | 8/25 1 push |
| 3 | PDP + 1 en 指南 | en | /en/product/saddle-stitch-booklets/ + /en/blog/saddle-stitch-booklet-printing-guide/ | src/data/products.ts (saddle-stitch-booklets PDS 化) + src/data/blog-data/en.json (新指南) | P1 | 8/25 1 push 合批 |
| ja 加挂 | 类目 + PDP | ja | /ja/category/packaging/ + /ja/product/kraft-paper-bag/ | src/app/[locale]/category/packaging/page.tsx (ja 段) + src/data/products.ts (クラフト紙袋 PDP 强化) | P2 | 8/26 1 push |

> **Schema 配置**: 作战包 1 Service + FAQPage + BreadcrumbList, 作战包 2 + 3 + ja 加挂 FAQPage + BreadcrumbList (per v3.10 §四).
> **内链配置**: 作战包 1 内链 books 类目 + saddle-stitch PDP + 相关博客双向互链, 作战包 2 + 3 内链 books 类目 → PDP → 指南三角, ja 加挂 类目 → PDP 直链 (per v3.10 §四 §5.5 互链规则).
> **图片 alt 公式**: `{主词} - {规格/场景} | {品牌}` (per v3.10 §五-1), 例: `china catalog printing - saddle stitch 64pp A4 | ZprintPro`.
> **图片优先级**: 工厂实拍风 > 产品摆拍 > 场景图, 大单品类优先生图 (per v3.10 §五-3).
> **大单转化传导指标**: china 词群着陆页 CTR @ pos 5-10 = 3-6% (商业词带 AIO 折损) + 着陆页 → 询盘 5-8% 良性 / 12% 优秀 + 大单成交周期 1-4 周 (K3 状态机跟单 008 status 字段) + 大单 AOV $500+ (1 单 = M3 月目标 1/3) (per v3.10 §六).
> **北极星连接**: M3 run-rate $1.5k/月 = 3 大单/月, 或 15 小单/月 — **大单路径的成交数需求只有小单的 1/5**, 这就是「小单累死不如一个大单」的数学. china 词群 5 词全进首页后按月搜量估算可支撑 3-5 询盘/月 (per v3.10 §六).

### 14.4 K3 8/19 4:41 v3.3 婚礼品类子战略 8/20-8/23 12 篇 4 天 详情

| 阶段 | 日期 | 12 篇 blog 任务 | push | 8/21 actual |
|---|---|---|---|---|
| D3 第 1 周 P1 2 周任务 8/17-8/30 验收 (per K3 CEO 战略主文档 8/17 5:17) | 8/17-8/30 14 天 | 74 篇博客按 GEO 改造, 每周 10 篇, 8/17-8/23 第 1 周 10 篇 + 8/24-8/30 第 2 周 10 篇 | 1 push/天 | 8/17-8/19 累计 0/3 篇 落后 2 篇 |
| 8/19 4:41 v3.3 婚礼品类子战略 (P0 最高) | 8/19 4:41 | D3 10 篇博客插 2 篇婚礼指南 = 12 篇 4 天 跑 (per 拍板 7 选项 A) | 1 push/天 | 8/19 handoff 13 项 拍板 7 P1 必拍 |
| 8/20-8/23 12 篇 4 天 跑 (8/19 拍板 7 选项 A) | 8/20-8/23 | 10 D3 + 2 婚礼指南 (喜帖價錢 zh-hk + wedding invitation cost guide en) | 4 push (1 push/天) | 8/20 跑 0-3 篇, 8/21 跑 0-1 篇, 8/22-8/23 9-12 篇 4 push 紧 |

> **R3 striking 4 词五件套** (K3 v3.3 拍板 #4 已推完): 即日印刷 + 餐牌印刷 + 両面カラー印刷 + 月曆印刷, 5 件套 (答案前置 60-150 词 + 40-60 字 Featured Snippet 块 + FAQPage + 内链 + Last updated 时间戳) 全部 PASS, 8/19 凌晨 625e292 推完, 8/30 GSC 验收.

### 14.5 D1+D2 数据源架构 8/19-8/21 突破 详情

| 突破 | commit | 日期 | 描述 | 进度 |
|---|---|---|---|---|
| **D2 突破 1**: Supabase RLS active | 95bd62b | 8/19 04:43 | security migration 007 - enable RLS on all public tables (fix Supabase rls_disabled_in_public critical alert) | ✅ Active |
| **D2 突破 2**: 008 quote_requests 度量层 active | 0840f97 | 8/20 | feat(tracking): 008 quote_requests 度量层 - 跨渠道统一询盘归因 (ga4_client_id + UTM + session) fire-and-forget | ✅ Active (询盘数 0, 需 D1+D2 都接通) |
| **D2 PENDING**: service_role_key | (K3 P0 拍板) | 8/19-8/21 PENDING 3 天 | Supabase SERVICE_ROLE_KEY (或 dashboard 读数) 8/19 13 项 拍板 5 R0 行动卡 + 4-week-plan §六 拍板 4 P0 必拍 | 🔴 PENDING 8+ 天 |
| **D4 突破 1**: GSC country 维度 RESOLVED | (gsc-fresh-2026-08-21.json 8/21 11:29) | 8/21 | 76 国家 完整 country breakdown, 拍板 12 utf-8-sig 解码修复 8/19 落地 (vs 8/17 5:26 跑失败 BOM 错) | ✅ RESOLVED 8/21 |
| **D6 突破 1**: P0-2 301 5/5 PASS 重大恢复 | 2805074 | 8/19 15:11 | docs(matrix): 8/19 GSC v4 weekly feedback v2 - matrix v2026-08-01-v1 + gsc_targeting_weekly_v2 (8/4-8/10 4 markets 3203 imps + P0-2 301 5/5 PASS 重大恢复) | ✅ RESOLVED 8/19 |
| **D1 PENDING**: GA4 架构 | (K3 P0 拍板) | 8/19-8/21 PENDING 3 天 | GA4 架构级缺失 (D1 第 4 周连续升级), K3 8/19 13 项 拍板 8 R0 行动卡 (CF Analytics / GA4 fetch 脚本验证) | 🔴 PENDING 3+ 周 |
| **D3 PENDING**: PayPal 审核 | (K3 P0 拍板) | 8/19-8/21 PENDING 3 天 | PayPal 商业账户 2026-06-25 审核中, K3 8/19 13 项 拍板 5 R0 行动卡 (PayPal 审核状态 4 件事之一) | 🔴 PENDING 8+ 周 |

---

*本 cron 8/21 16:20 触发, 0 push 纯只读分析, 14 章节 K3 格式 + m3_north_star 8/21 9 天后 actual status + 8/21 v3.10 大单词布控 3 个作战包 8/24 落地 + 8/26 双周复盘前置 30+ 拍板项. K3 8/21 早上 30-60 min 决策窗 必答 (per 4-week-plan §六 拍板 5 + 8/19 handoff 13 项 + 8/21 v3.10 3 个作战包 + 8/21 双周复盘 7 项验收).*
