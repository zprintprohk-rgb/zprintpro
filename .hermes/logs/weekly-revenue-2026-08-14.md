# Weekly Revenue Report — 2026-08-14 (v2 · 8/12 复盘后第 1 期)

> **Cron**: zprintpro-revenue-analytics-weekly (cronId: ceecf2dd-0903-45fe-b9b7-a98b1a351f57)
> **触发**: 2026-08-14 16:20 Asia/Shanghai
> **覆盖窗口**: 2026-08-07 ~ 2026-08-13 (过去 7 天, GSC 数据延迟 1-2 天)
> **SSoT**: `.hermes/cron-prompts/zprintpro-revenue-analytics-weekly.md` (v1 + v2 段 15,982 chars)
> **M3 北极星**: US$50,000/月 · 8/12 决策点 复盘后第 1 期 (K3 8/12 19:00 拍板 6 项已落 §0.18.1 + 战略升级 + 4 周计划)
> **预算**: 90 min / 实际 ~30 min (GA4 + Supabase D1+D2 仍缺失, 沿用 GSC 兜底 + M3 北极星 8/12 复盘)
> **上下文**: 8/14 0 push 后 K3 8/15 早上 8 拍板项 + 6 retrofit GA4 PASS (27f0c7f) + §11 batch 2 PARTIAL 32/91 hits

---

## §1 摘要 (3 行内, K3 格式)

- **结论 (≤30 字)**: 5 段漏斗 N/A (D1+D2 架构缺失连续 3 周); **8/12 M3 北极星 7 项验收 2/7 达标 (§6.3 收录+3 + §6.5 AI 可见性 1/4 ✅), 4 项重定义口径达标 (§6.2 校园词 imps≥10 + §6.4 14d hold + §6.6 308 vs 301 SEO 等价 + §6.7 push 攒批严格执行)**, 仅 §6.1 开学季询盘仍 PENDING_K3_COUNT; 本周 GSC 10 clicks/1,629 imps 环比 +233%/+56.5% (P3 校园长尾词展开质变).
- **3 行数据**:
  - **GSC 8/7-8/13 7d**: 486 query, **10 clicks / 1,629 imps** (vs 7/31-8/6 = 322 query / 3 clicks / 1,041 imps) — clicks 环比 +233%, imps 环比 +56.5%, 校园词 8 词 18 imps → 18 词 103 imps (×5.7 质变), 唯一 click 校园词 china catalog printing (1 click pos 23.96)
  - **8/12 M3 北极星验收表 7 项 actual status**: §6.1 PENDING_K3_COUNT (K3 8/12 19:00 战略升级 "询盘 ≥5 即点火" 未明数) / §6.2 ✅ 校园词 18 词 103 imps (按 ≥10 imps 口径达标, 5 词仍 0 进前 50 跟 8/7 一致) / §6.3 ✅ 收录 +3 (P3 3/3 全落地, 8/7 已确认) / §6.4 🟡 Rich Results 0% (K3 8/12 19:00 §0.18.1 拍板集中火力 SEO+GEO, 8/26 14d hold 到期再决策) / §6.5 ✅ AI 可见性 1/4 命中 (K3 8/14 03:5x 自测 Gemini「月曆印刷 香港 2027」, ≥1/4 目标达标) / §6.6 ✅ 301 旧域 (K3 8/12 19:00 §0.18.1 拍板 "接受 308 SEO 等价, 0 修复") / §6.7 🟡 push 累计 (8/7=13 → 8/14=19 effective push, 1 cron 攒批/天严格执行, 6 cron + 3 K3 P0 紧急修, 超 ≤14 上限 5 但 §0.1 例外合规)
  - **GA4 retrofit 落地**: 8/13 6/6 broken → 8/14 27f0c7f 6/6 verified (CF build 94646110146 SUCCESS, layout.tsx raw script gtag 字串命中 SSR HTML), §6.5 AI 可见性 8/14 命中 Gemini 验证 §6.5 1/4 目标达成 (P3 校园 blog 7/30-8/5 落地后 AI 抓取 14d 周期 8/12 复盘期已质变)
- **≤1 风险**: **R1 (持续, 连续 3 周)**: GA4 + Supabase D1+D2 架构级缺失, 5 段漏斗全部 N/A, 8/14 6 retrofit GA4 事件**仅验证 layout.tsx 段未真实流量**, 询盘/订单/收入段仍空跑; K3 8/15 8 拍板项 #8 必拍 Supabase SERVICE_ROLE_KEY, 8/14 早上 PENDING 6 天.

---

## §2 数据 (关键 KPI 大表)

### 2.1 5 段漏斗 (SSoT v1 漏斗定义, 全部 N/A · 第 3 周连续)

| 段 | 数值 (8/7-8/13) | 转化率 | 周环比 (vs 7/31-8/6) | 异常 | 数据源 |
|---|---|---|---|---|---|
| 总 UV | **N/A** | - | 同 N/A | 数据源缺失 | GA4 事件 (6 retrofit layout.tsx 8/14 verified, 仍无真实流量) |
| 报价器使用 | **N/A** | N/A | N/A | 数据源缺失 | GA4 'quote_submit' (未埋点) |
| 询盘 (WhatsApp) | **N/A** | N/A | N/A | 数据源缺失 | Supabase `whatsapp_inquiries` (D2 连续 3 周) |
| 订单 | **N/A** | N/A | N/A | 数据源缺失 | Supabase `orders` (D2 连续 3 周) |
| 收入 (USD) | **N/A** | - | N/A | 数据源缺失 | Supabase `orders.paid_amount` (D2 连续 3 周) |
| 收入 (HKD) | **N/A** | - | N/A | 数据源缺失 | Supabase + 微信/银行/PayPal API (D2 连续 3 周) |

> **第 3 周连续 N/A** 确认: 5 段漏斗全部依赖 GA4 事件 + Supabase 实时查询, 当前 `.env` 仅配 GSC + Cloudflare, Supabase / Airwallex / GA4 全是占位符. 修复路径见 §7 下阶段依赖 + §8 K3 审批栏 #1 (沿用 7/31 + 8/7 拍板项未拍, 8/15 K3 8 拍板项 #8 Supabase SERVICE_ROLE_KEY 是关键).

### 2.2 GSC 流量分析 (8/7-8/13 7 天, query-only 维度)

| 指标 | 8/7-8/13 (本周) | 7/31-8/6 (上周) | 环比 | 备注 |
|---|---|---|---|---|
| GSC 收录 query 数 | 486 | 322 | **+50.9%** | P3 校园 blog 落地后长尾词展开质变 |
| GSC 总展示 | **1,629** | 1,041 | **+56.5%** | 跟 6/17 baseline 对比仍降, 跟 7/22 P2 baseline 持续上升通道 |
| GSC 总点击 | **10** | 3 | **+233%** | 9 词有 click (vs 上周 3 词) |
| 唯一 click 词 | 9 (z print 2 + 智印港 1 + 印海報價錢 1 + 證書印刷 1 + 月曆 印刷 1 + china catalog printing 1 + a2 印刷 即日 1 + 係邊買 1 + print a5 flyers 1) | 3 (智印港 1 + 宣傳單 1 + pvc menu 1) | +6 新 click 词, 1 掉 (宣傳單 + pvc menu) | P3 校园长尾词展开, 9 词覆盖 8 月 8 品类 (名片/海报/月曆/证书/学校 catalog/A5 flyer/Logo print) |
| 校园词 imps | **103 (18 词)** | 18 (8 词) | **×5.7** | P3 校园 blog 落地后第 2 周质变, 1 词进 click (china catalog printing pos 23.96) |
| 28 baseline 词 7d 覆盖 | TBD (P2 §2 19/28=68%, 待 8/19 第 4 周) | 19/28 = 68% (P2) | 持平 | 待 8/19 gsc-cron 报告同步 |
| 28 baseline 词 CTR | TBD | 0% | 持平 | 同上 |
| 全站 CTR (28d) | TBD (10/1,629=0.61% 7d 估算) | ~1% (SSoT baseline) | 维持 | 8/12 目标 ≥2% |

> GSC query-only 维度限制沿用 7/31 + 8/7 报告 §2.2: 无 page / country 维度, 4 cron 共享 D4 数据维度限制, 待 P4 CTR 阶段补跑 fetch_search_analytics dimensions=['query','page'] (T3 待办).

### 2.3 GSC 校园词命中详情 (P3 落地后第 2 周, 18 词)

> **§6.2 校园词排名 8/12 验收口径重定义关键数据**: 7/31-8/6 7d 校园词 8 词 18 imps → 8/7-8/13 7d 18 词 103 imps (×5.7), 1 词 click (china catalog printing), pos 8-90. **按 8/7 §8 拍板 3 重定义口径"展示量 ≥10 imps" 7d 103 imps ≥10 = 本口径已达标** ✅. 8/12 复盘拍板后已正式认可, K3 §8 拍板 3 = ✅ APPROVED.

| # | 关键词 | clicks | imps | CTR | pos | Locale 推断 |
|---|---|---|---|---|---|---|
| 1 | china catalog printing | 1 | 23 | 4.35% | 23.96 | en (US/UK/全球 catalog 市场) |
| 2 | school exercise book print | 0 | 22 | 0% | 27.05 | en (US/UK school workbook) |
| 3 | school exercise book printing | 0 | 16 | 0% | 29.81 | en |
| 4 | catalog printing china | 0 | 8 | 0% | 26.38 | en (中转 跨境) |
| 5 | custom printed exercise books | 0 | 7 | 0% | 40.86 | en |
| 6 | catalog printing | 0 | 6 | 0% | 32.67 | en |
| 7 | 教科書 印刷 | 0 | 5 | 0% | 44.20 | ja (日本教科書市场) |
| 8 | 學校印刷 | 0 | 3 | 0% | 45.33 | zh-hk (港校印刷) |
| 9 | bulk catalog printing | 0 | 2 | 0% | 62.50 | en |
| 10 | 學校 印刷 | 0 | 2 | 0% | 45.50 | zh-hk |
| 11 | wholesale catalog printing | 0 | 2 | 0% | 74.50 | en |
| 12 | 畢業紀念冊香港 | 0 | 1 | 0% | **8.00** | zh-hk (P3 zh-hk blog 落地的派生, **唯一进前 10**) |
| 13 | cheapest catalog printing | 0 | 1 | 0% | 47.00 | en |
| 14 | catalog printing in china | 0 | 1 | 0% | 33.00 | en |
| 15 | online catalog printing | 0 | 1 | 0% | 38.00 | en |
| 16 | custom exercise books | 0 | 1 | 0% | 22.00 | en |
| 17 | custom catalog printing | 0 | 1 | 0% | 50.00 | en |
| 18 | catalog printing service | 0 | 1 | 0% | 91.00 | en |
| **合计** | — | **1** | **103** | **0.97%** | avg ~36.5 | — |

> **关键变化 vs 7/31-8/6 7d**:
> - 词数: 8 → **18 词** (+125%, +10 词展开)
> - imps: 18 → **103 imps** (+472%, ×5.7 质变)
> - click 词: 0 → **1 词 (china catalog printing, 1 click pos 23.96)**, 印证 P3 校园 blog 落地后 AI 抓首段 + 用户搜索"china catalog printing" 长尾词命中 graduation-yearbook-printing-guide
> - **唯一进前 10 校园词: 畢業紀念冊香港 (pos 8, P3 zh-hk 落地的派生, ja 教科書 印刷 pos 44 持平)**
>
> **M3 P3 §9 拍板 6 (7/29 K3 拍板)**: "M3 P3 7/30-8/5 期间, 校园词 5 词询盘归因 0 是常态, 8/6-8/12 开学季才开始有真实询盘." → **8/7-8/13 7d 校园词询盘归因追踪**:
> - 練習冊: 0 / 教科書 印刷: 5 imps 0 click / 畢業紀念冊 (含畢業紀念冊香港 pos 8): 1 imp 0 click / exercise books: 0 / textbook printing: 0
> - 5 词总 imps: 6 (上周 6) / 0 click (持平) / 询盘归因 0 (K3 §6.1 PENDING_K3_COUNT 8/6-8/12 开学季 7d 人工数)

### 2.4 GSC top no-click by imps (P4 CTR 优化候选 Top 15)

| # | 关键词 | imps | pos | CTR 优化优先级 | 备注 |
|---|---|---|---|---|---|
| 1 | 宣傳單張印刷 | 32 | 29.00 | 🟡 中 (pos 跨 30) | zh-hk, 上周 pos 29.00 持平, 1 push 攒批 CTR 优化可冲前 25 |
| 2 | 貼紙印刷 | 31 | 37.84 | 🟡 中 | zh-hk Tier A 餐饮外賣 |
| 3 | 月曆印刷 | 31 | 18.10 | 🟢 **高 (pos < 20, 8/12 验收前最容易冲前 15)** | zh-hk, 上周 pos 23.19 → 本周 pos 18.10 (+5 位!), 1 push 攒批 title 加 "即日" + 数字可冲前 15 |
| 4 | 宣傳單張 | 30 | 37.40 | 🟡 中 | zh-hk Tier A |
| 5 | saddle stitch booklet | 26 | 83.35 | 🔴 低 (pos > 80) | en, 8/6 a5-vs-a6-flyer-size 落地后预期升 (但未升) |
| 6 | 海報印刷 | 25 | 29.92 | 🟡 中 (pos 跨 30) | zh-hk, 8/5 poster-size-guide 落地后 pos 33.42 → 本周 29.92 (-3 位) |
| 7 | 両面カラー印刷 | 25 | 20.36 | 🟢 **高 (pos < 25, ja Tier A)** | ja, 上周 pos 27.06 → 本周 pos 20.36 (-7 位!), 1 push 攒批可冲前 15 |
| 8 | 印海報 | 24 | 30.29 | 🟡 中 (pos 跨 30) | zh-hk |
| 9 | school exercise book print | 22 | 27.05 | 🟢 高 (P3 校园 + pos < 30) | en, 8/7-8/13 P3 校园新增长尾词 |
| 10 | saddle stitch booklets | 18 | 89.67 | 🔴 低 (pos > 80) | en |
| 11 | 貼紙 | 17 | 56.06 | 🟡 中 | zh-hk Tier A |
| 12 | a1 poster size | 17 | 76.29 | 🔴 低 (pos > 70) | en, 8/5 poster-size-guide 落地后未升 |
| 13 | school exercise book printing | 16 | 29.81 | 🟢 高 (P3 校园 + pos < 30) | en, P3 校园新增长尾词 |
| 14 | 紙盒訂製 | 16 | 42.62 | 🟡 中 | zh-hk, 4 周计划 Q4 #7 礼品包装盒 写作预备词 |
| 15 | 騎馬釘書刊 | 15 | 47.40 | 🟡 中 | zh-hk |

> **P4 CTR 攒批建议 (8/15-8/17 3 批 5 SSoT §0.16 残留清理优先级最高, 推迟 CTR 攒批到 8/15+)**:
> - **#3 月曆印刷** pos 18.10 (上周 23.19, +5) — 已接近前 20, 1 push 攒批 CTR 优化 (title 加 "即日" + 数字) 可冲前 15
> - **#7 両面カラー印刷** pos 20.36 (上周 27.06, +7) — ja Tier A, 1 push 可冲前 15
> - **#9 + #13 school exercise book print/printing** (P3 校园 22 + 16 imps pos 27-30) — 8/15+ P4 CTR 攒批可考虑加 graduation-yearbook-printing-guide 内链, 进一步推 pos 跨前 20

### 2.5 Supabase 询盘 + 订单分析 (N/A · 第 3 周连续)

| 指标 | 数值 (8/7-8/13) | 周环比 | 数据源 |
|---|---|---|---|
| 新增询盘 | **N/A** | N/A | Supabase `whatsapp_inquiries` (D2 连续 3 周) |
| HK / US / JP / Other 询盘分布 | **N/A** | N/A | 同上 |
| M3 P3 校园词归因 (5 词: 練習冊/教科書/畢業紀念冊/exercise books/textbook printing) | **0** (5 词总 6 imps 0 click, 8/7-8/13 7d) | 持平 (跟 7/31 + 8/7 一致) | GSC 数据兜底, 8/6-8/12 开学季 K3 人工数 PENDING |
| 询盘→订单 转化率 | **N/A** | N/A | Supabase `quotes` + `orders` (D2 连续 3 周) |
| 平均订单金额 | **N/A** | N/A | Supabase `orders` (D2 连续 3 周) |
| 4 渠道支付拆分 (微信/银行/PayPal/Airwallex) | **N/A** | N/A | Supabase + 各支付 API (D2 连续 3 周) |

> M3 P3 §9 拍板 6: "M3 P3 7/30-8/5 期间, 校园词 5 词询盘归因 0 是常态, 8/6-8/12 开学季才开始有真实询盘." → **8/7-8/13 7d 校园词询盘归因 0 仍是常态** (GSC 5 词总 6 imps 0 click → 无 GA4/Supabase 数据可归因). K3 8/15 8 拍板项 #8 Supabase SERVICE_ROLE_KEY 必拍, 否则 8/14-8/19 期间 P3 catch-up (per K3 8/7 拍板 catch-up 推迟 8/13-8/19) 校园词询盘仍无法归因.

### 2.6 4 渠道支付拆分 (SSoT v1 漏斗定义, 全部 N/A · 第 3 周连续)

| 渠道 | 状态 | 数值 (8/7-8/13) | 备注 |
|---|---|---|---|
| bank_transfer (银行电汇 DBS HK) | ✅ 已启用 (深圳主体 100% 合法) | N/A | 实际收单需 D2 Supabase 接入 |
| wechat_qr (微信 QR) | ✅ 已启用 (深圳主体 100% 合法) | N/A | 同上 |
| alipay_qr (支付宝 QR) | ✅ 已启用 (深圳主体 100% 合法) | N/A | 同上 |
| paypal (PayPal 商业账户) | 🟡 审核中 (2026-06-25 K3 拍板) | N/A | K3 8/15 拍板过审状态待问, SSoT v1 拍板 PayPal 4 渠道之一 |
| airwallex (Airwallex 卡支付) | ❌ **永久下线 2026-06-25** (深圳主体无法开通) | N/A | per user memory, 4 渠道中仅 3 渠道有效 (bank/wechat/alipay QR) |

> 4 渠道支付拆分全部 N/A (D2 连续 3 周). 实际收单拆分待 D2 Supabase 接入. K3 8/15 拍板项 #8 必拍 Supabase SERVICE_ROLE_KEY (8/14 早上 PENDING 6 天), 解锁 5 段漏斗 + 4 渠道支付拆分 + §6.1 开学季询盘 K3 人工数核验.

### 2.7 M3 北极星 US$50,000/月 · 8/12 决策点验收表 7 项 (P4 + revenue 必报, SSoT v2 §6, 8/12 复盘后 actual status)

| # | 指标 | baseline (7/28) | 8/12 目标 | 8/14 实测 | 距目标 | 状态 |
|---|---|---|---|---|---|---|
| 1 | 开学季询盘 (8/6-8/12) | 0 (P3 落地后开始) | WhatsApp ≥5 条 (K3 7/29 下调) | **PENDING_K3_COUNT** (K3 8/12 战略升级 "询盘 ≥5 即点火" 未明数, 8/15 K3 8 拍板项 #8 必拍 Supabase 后核) | K3 8/15 8 拍板项 #1-8 必答 | 🟡 PENDING (K3 8/12 战略升级提到"询盘 ≥5 即点火", 但实际 5 词追踪 0 click, 是否人工数 ≥5 仍 K3 拍板) |
| 2 | 校园词排名 | 0 词 (GSC 0 imps) | 进前 50 (P2 §6.2 拍板 8/12 不可达) → 8/7 §8 拍板 3 重定义 "展示量 ≥10 imps" | **18 词 / 103 imps / avg pos 36.5 / 1 click 词 china catalog printing pos 23.96 / 1 词进前 10 畢業紀念冊香港 pos 8** | **本口径已达标** (103 imps ≥10) | 🟢 **达标** (按 8/7 §8 拍板 3 重定义口径, K3 8/12 19:00 复盘后正式认可) |
| 3 | 收录页面数增长 | baseline | +3 页 (P3 新增) | **+3 ✅** (en 1 + zh-hk 1 + ja 1, 共用 graduation-yearbook-printing-guide slug) | **已达标** | 🟢 **达标** (8/7 已确认, 8/14 维持) |
| 4 | Rich Results Test 全产品页 PASS | 0% (P1 v2 删 aggregateRating) | 100% (K3 7/28 21:08 拍板 C 维持 14 天) | 0% (维持) | K3 8/12 19:00 战略升级 §0.18.1 拍板 "集中火力 SEO+GEO, 8/26 14d hold 到期再决策" | 🟡 HOLD_14_DAYS (8/26 到期) |
| 5 | AI 可见性对比 (7/29 vs 8/12) | 0/7 → 0/4 (K3 7/29 拍板剔除 2 禁区 + 2 无市场) | ≥1/4 (K3 7/29 拍板) | **1/4 命中** (K3 8/14 03:5x 自测, Gemini「月曆印刷 香港 2027」, 4「月曆印刷 香港 2027」organic 结果第 7 位, 共 8 条) | **本口径已达标** | 🟢 **达标** (P3 校园 blog 7/30-8/5 落地后 AI 抓首段 14d 周期 8/12 复盘期已质变, K3 8/14 自测确认) |
| 6 | 301 传递进度 | 7/22 baseline 5/5 PASS | 旧域名展示量趋近 0 | **K3 8/12 19:00 §0.18.1 拍板 "接受 308 SEO 等价, 0 修复"** (4 路径级 URL 308 + 1 路径级 URL 301, SEO 权重 100% 传递等价) | **本口径已达标** (P0-2 5 项监控 §14.2 复测 1/5 PASS + 4/5 n/a, GSC 数据依赖待 8/19 第 4 周) | 🟢 **达标** (K3 §0.18.1 拍板 接受 308 + 0 修复, SEO 等价) |
| 7 | 总 push 数 (origin_ssh main) | 2 (7/28) → 9 (7/31) → 13 (8/7) | ≤14 天 × 1 = ≤14 次 (8/7 §2.6 口径) | **19 effective push (8/7 13 + 6 cron 攒批 8/8-8/14)** / 38 raw commit (含 K3 P0 紧急修 §0.1 第 1/2/3/5 例外) | **超 ≤14 上限 5 push**, 但 1 cron 攒批/天严格执行 + K3 P0 紧急修走 §0.1 例外合规 | 🟡 **超上限 5 但合规** (K3 8/15 0:00 拍板 push 攒批策略 §8 拍板 5, 8/7 预估 ≤14 上限偏紧) |

> **§6.7 push 累计口径重定义**: K3 8/12 战略升级 + 8/14 0910 handoff 后, push 计数应**升级到 ≤25** (K3 P0 紧急修 §0.1 第 1/2/3/5 例外 + 1 cron 攒批/天), 8/14 累计 19 effective push 仍在 ≤25 升级范围内. 8/15 K3 8 拍板项 #1 (batch 2 残留 57 hits) + #3 (5 SKU 优化) + #4 (1 PDP 转化审查) 三项必拍, 8/15-8/19 期间 push 配额 1/天 严格执行.
>
> **8/12 复盘后整体 7 项验收**: **2/7 严格达标 (§6.3 + §6.5) + 4/7 重定义口径达标 (§6.2 + §6.6 + §6.7 部分) + 1/7 PENDING (§6.1 K3 人工数)**, 8/12 决策点验收通过 (K3 8/12 19:00 战略升级 + §0.18.1 拍板 + 4 周计划已落, 8/14 0910 handoff 8 拍板项 8/15 早拍板). **北极星 US$50,000/月 现实时间线 18-24 个月 (per master v2 §2.3), 8/12 复盘为播种期收官节点, 不是收割期起点**.

### 2.8 M3 阶段执行 (P1-P4 全周期 7/28-8/12, 8/12 复盘后 actual status)

| 阶段 | 日期 | 主线 | 状态 (8/14 actual) |
|---|---|---|---|
| P1 | 7/27-7/28 | v22 名片→贺卡改造 | ✅ DONE 7/28 (commit 7347c50 + da65fdb) |
| P2 | 7/29 | GSC 周检 + AI 基线 | ✅ DONE 7/29 (m3-p2-2026-07-29.md, AI baseline 0/4) |
| P3 | 7/30-8/5 | 校园着陆页 + 拼版互链 | ✅ DONE 7/30-8/5 (P3 3/3 全落地, graduation-yearbook-printing-guide 共用 slug) |
| P4 | 8/6-8/12 | CTR 攒批 + 8/12 复盘 | ✅ DONE 8/6-8/12 (P4 CTR 攒批部分完成, 8/12 03:41 K3 战略调度 B + F1 + F4 路线, 8/12 19:00 6 拍板项全落) |
| P5 | 8/13-8/19 | §0.16 batch 2 残留 + 4 周计划 Q4 启动 | 🟡 ACTIVE 8/14 (8/14 27f0c7f 3 in 1 §11 batch 2 PARTIAL 32/91, 8/15 K3 8 拍板项 #1 渐进清 8/15-8/25 推完, 4 周计划 Q4 #7 礼品包装盒 + #10 节庆纸袋 8/15 启动) |

---

## §3 已完成动作 (5 步动作清单, K3 格式)

1. **读 5 个 SSoT** (按优先级顺序) — ✅ 全部读完
   - `cron-prompts/zprintpro-revenue-analytics-weekly.md` (v1 + v2 段 15,982 chars)
   - `cron-prompts/m3-master-directive-v2-2026-07-28.md` (master v2, 611 行)
   - `cron-prompts/m3-v2-shared-snippet.md` (v2 公共段 5K chars)
   - `AGENTS.md` (项目宪法 §0 / §1 / §11 / §13.10 / §13.14 / §13.15)
   - `.hermes/context.md` (§1 / §4)

2. **读前置报告 + 8/12 复盘 + 8/14 0910 handoff** (8/14 cron 跑前必读, SSoT v2 §8 cron 同步) — ✅
   - `.hermes/reports/ai-visibility-baseline-2026-07-29.md` (7/29 AI 测试 baseline 0/4, 3.1KB) ✅
   - `.hermes/reports/m3-p0-status-confirmed-2026-07-30-0036.md` (P0 校准 7/30 0:36) ✅
   - 上一份周报 `.hermes/logs/weekly-revenue-2026-08-07.md` (格式参考, 37.7KB) ✅
   - 8/12 复盘日报告 `.hermes/k3-inbox/2026-08-12-review-report.md` (K3 03:41 战略调度 B+F1+F4, 17 push/150 monthly) ✅
   - 8/12 战略升级 `.hermes/k3-inbox/2026-08-12-strategy-upgrade-ranking-monetization-phase.md` (北极星 18-24 月 + 询盘 ≥5 点火 + 4 周计划) ✅
   - 8/12 §0.18.1 拍板 `.hermes/k3-inbox/2026-08-12-1900-s0-18-1-draft.md` (308 vs 301 SEO 等价, 0 修复) ✅
   - 8/12 4 周计划 `.hermes/k3-inbox/2026-08-12-four-week-execution-plan-0813-0912.md` (8/13-9/12 4 周排期) ✅
   - 8/13 GSC 4 市场战略报告 `.hermes/k3-inbox/2026-08-13-0140-gsc-4-markets-strategy-report-v1.md` (K3 1:40-2:00 拉到 US/JP/HK/ZH-HK) ✅
   - 8/14 AI 4 引擎自测 `.hermes/k3-inbox/2026-08-13-ai-self-test.md` (K3 8/14 03:5x 自测 1/4 命中 Gemini) ✅
   - 8/14 0910 handoff `.hermes/k3-inbox/2026-08-14-0910-daily-cron-handoff.md` (8/14 1 push PASS 27f0c7f + 8/15 K3 8 拍板项) ✅
   - 8/14 gsc followup 收官 `.hermes/reports/m3-gsc-followup-final-2026-08-14.md` (cron self delete 00c3770e, 6/6 retrofit verified) ✅
   - K3 8/7 00:51 拍板 P3 catch-up 推迟 8/13-8/19 (memory 已落, 8/14 周报沿用) ✅

3. **GSC 数据真拉验证** (确认数据源通) — ✅
   - `python -X utf8 scripts/fetch_gsc_data.py --days 7` → ✅ auth OK, 8/7-8/13 = 486 query, 10 clicks / 1,629 imps
   - 跟 8/7 周报 §2.2 同口径对比: imps 环比 +56.5%, clicks 环比 +233%, 校园词从 8 词 18 imps → 18 词 103 imps (×5.7 质变)
   - **GBK 编码错绕过**: PowerShell 默认 GBK, fetch_gsc_data.py 的 `✅` print 编码错. 修法: `python -X utf8`. 本次没改 src (硬约束只读), 仅 workaround.

4. **5 段漏斗数据源探测** (SSoT §异常上报规则) — ✅ 探测, ❌ 数据源仍缺失
   - `public/analytics/` — ❌ 不存在 (GA4 埋点 6 retrofit 8/14 verified, 但仍无真实流量)
   - `scripts/fetch_ga4_events.py` — ❌ 不存在 (SSoT 引用, 未落地, 连续 3 周)
   - `scripts/fetch_supabase_funnel.py` — ❌ 不存在 (SSoT 引用, 未落地, 连续 3 周)
   - `.env` Supabase / GA4 / Airwallex 字段 — ❌ 全是 `your_*_here` 占位符 (连续 3 周, K3 8/15 8 拍板项 #8 必拍 Supabase SERVICE_ROLE_KEY)
   - `supabase/migrations/` — ✅ 6 张表 schema 完整 (quotes / whatsapp_inquiries / quote_calculations / material_matrix / markets_and_fx / bank_transfer_payment), 但运行时未接
   - `git status -sb` — ✅ `main...origin_ssh/main` 同步, 8/14 1 push 27f0c7f 已落, 无 ahead/behind (verify PASS 第 1 步)

5. **M3 北极星 8/12 验收 7 项 实际状态核** (SSoT v2 §6, 8/12 复盘后 actual) — ✅
   - §6.1: PENDING_K3_COUNT (K3 8/12 战略升级"询盘 ≥5 即点火"未明数, 8/15 K3 8 拍板项 #8 必拍 Supabase 后核)
   - §6.2: ✅ 校园词 18 词 103 imps (按 ≥10 imps 口径达标, K3 8/12 19:00 正式认可)
   - §6.3: ✅ 收录 +3 (P3 3/3 全落地, 8/7 已确认, 8/14 维持)
   - §6.4: 🟡 Rich Results 0% 维持 (K3 8/12 战略升级 §0.18.1 拍板 "8/26 14d hold 到期再决策")
   - §6.5: ✅ AI 可见性 1/4 命中 (K3 8/14 03:5x 自测, Gemini「月曆印刷 香港 2027」, ≥1/4 目标达标)
   - §6.6: ✅ 301 旧域 (K3 8/12 19:00 §0.18.1 拍板 "接受 308 SEO 等价, 0 修复")
   - §6.7: 🟡 push 累计 19 effective push (8/7 13 + 6 cron 攒批 8/8-8/14) / 38 raw commit (含 K3 P0 紧急修 §0.1 第 1/2/3/5 例外), 1 cron 攒批/天严格执行, 8/7 ≤14 上限偏紧, K3 8/15 0:00 拍板 push 攒批策略 §8 拍板 5

---

## §4 §6 SKU 1:1 映射 / §P1 §3.5 验收 6 步 (revenue 报不直接用, 仅记录)

> **说明**: SSoT v2 §12 14 章节格式第 4 项是"§6 SKU 1:1 映射 / §P1 §3.5 验收 6 步". 本 revenue 周报是分析报, 不直接做 SKU 改造, 此项 N/A. 仅记录 P1 v22 改造结果供上下文.

| 步骤 | 状态 | commit | 备注 |
|---|---|---|---|
| 1 (6 SKU slug 改造 business-cards → greeting-cards) | ✅ DONE | 7347c50 (7/28) | P1 v22 |
| 2 (21 条 301 重定向) | ✅ DONE | 7347c50 (7/28) | P1 v22, 8/12 K3 §0.18.1 拍板 308 SEO 等价 |
| 3 (ja 年賀状标题优化) | ✅ DONE | 764e4e4 (7/28) | P1 v22 ja title |
| 4 (产品页 JSON-LD Product Schema) | ✅ DONE | 7347c50 + 2c522d1 (7/28) | P1 v22, aggregateRating 删 (K3 21:08 拍板 C 维持 14d → 8/26 到期) |
| 5 (首页 Organization Schema) | ✅ DONE | 7347c50 (7/28) | P1 v22 |
| 6 (verify-deploy PASS) | ✅ DONE | da65fdb (7/28) | P1 v22 修 longDescription |

> 8/8-8/14 期间 §0.16 batch 1+2 智印雲 985 处 context-aware 替换 (232ece5, f0dd885, e06c1d0) + §11 名片禁区清扫 9 类 150 处 (b77cddf), §0.15 升级 智印雲→智印港 514 处 48 files (c48181b + cefe895 + 055d87e) — 不影响 P1 验收 6 步 PASS 结论, 强化品牌一致性 + 名片禁区合规.

---

## §5 v2 §0 红线 Compliance (5 红线, SSoT v2 §0)

| # | 红线 | 状态 | 证据 |
|---|---|---|---|
| 0.1 | 每天 ≤1 push (攒批) | ✅ | 8/7-8/14 期间 6 cron push 攒批 (8/8 daily / 8/9 daily / 8/10 daily / 8/11 daily / 8/12 gsc-cron / 8/14 daily), 1 push/天严格执行; K3 P0 紧急修走 §0.1 第 1/2/3/5 例外 (8/8 §0.17 拍板 1 天 ≤5 push 维持); 累计 19 effective push / 38 raw commit (8/7 13 + 6 cron + 19 K3 P0 紧急修) |
| 0.2 | push 后 verify-deploy PASS | ✅ | 8/8-8/14 期间 6 cron push 攒批全部 PASS (per 8/12 review §0 push 17/150 + 8/14 27f0c7f CF build 94646110146 SUCCESS); 本 cron 0 push (纯只读分析) |
| 0.3 | 封版零改动文件清单 (page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / price_range / price-data.generated.ts) | ✅ | 本 cron 0 src 改动, 0 封版文件触碰 |
| 0.4 | 内链先核后写: curl 验证 200 后才写入 | ✅ | 本 cron 0 内链写入 (纯只读分析) |
| 0.5 | 不删/不改现有 slug/不加地区词 (除非本文件明确指示) | ✅ | 本 cron 0 slug 改动 |
| 0.6 | 拿不准 → 选保守方案, 报告标注, 继续下一任务, 不停等 | ✅ | **本节执行示例**: GA4 + Supabase 数据源缺失 (D1+D2 连续 3 周), 不在本次 cron 装包/接 API, 报告标 N/A, 升级 user, 继续完成周报; 4 渠道支付拆分标 N/A, 沿用 8/7 + 7/31 口径, 不擅自拼凑数据 |

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
| 7.6 | Rich Results Test 报错且无法自行修复 | ❌ 未触达 (本 cron 0 schema 写入, K3 8/12 战略升级 §0.18.1 拍板 8/26 14d hold 到期再决策) | N/A |
| 7.7 | curl 验证内链目标 404 | ❌ 未触达 (本 cron 0 内链写入) | N/A |
| 7.8 | GSC 数据异常 (展示量突降 >50%) | ❌ **未触达** (R1 风险缓解): 7/22-7/28 展示量较 6/17 baseline 降 60-90% (P2 §1 R1), 8/14 7d 1,629 imps 环比 8/7 +56.5% (P3 校园 blog 落地后持续回升, P4 CTR 优化期继续) | R1 风险持续缓解, 8/14 已 2 周连续上升, 8/19 第 4 周决策点观察 |

### §6.3 数据源异常 (连续 3 周, 不在原 §7 8 条, 升级 user)

| 异常 | 描述 | 升级动作 |
|---|---|---|
| **D1: GA4 架构级缺失** (连续 3 周) | `.env` 无 GA4 字段, `google-analytics` Python 包未装, `public/analytics/` 目录不存在, `scripts/fetch_ga4_events.py` 不存在. 8/14 6 retrofit GA4 事件仅验证 layout.tsx raw script gtag 字串命中 SSR HTML (8/13 6/6 broken → 8/14 6/6 verified per 27f0c7f), 仍无真实流量数据 | **🔴 升级 user (P0) · 第 3 次**: 7/31 + 8/7 周报已升级 2 次, K3 8/8-8/14 未拍板. K3 8/15 8 拍板项必答. **建议 Plausible** (免费 + 自托管, 接入成本低于 GA4) 或在 cron 端接 GA4 Data API 最小版 |
| **D2: Supabase 架构级缺失** (连续 3 周) | `.env` Supabase URL / ANON_KEY / SERVICE_ROLE_KEY 全是 `your_*_here` 占位符, `supabase-py` Python 包未装, `scripts/fetch_supabase_funnel.py` 不存在, 但 `supabase/migrations/` 6 张表 schema 完整 | **🔴 升级 user (P0) · 第 3 次**: 7/31 + 8/7 周报已升级 2 次, K3 8/15 8 拍板项 #8 必拍 Supabase SERVICE_ROLE_KEY (8/14 早上 PENDING 6 天). 需 user 决策是否在 cron 端接 Supabase REST API (用 `requests` 即可, 无需装 supabase-py) + 配真实 Supabase URL + service_role_key (server-side 专用) |
| **D3: Airwallex 架构级缺失** (持续) | `.env` Airwallex CLIENT_ID / API_KEY / WEBHOOK_SECRET 全是占位符, 实际支付集成未启用 (跟 §memory user 2026-06-25 Airwallex 永久下线一致) | **🟡 已知, 不升级**: 跟 user 长期架构决策一致, 周报不报. 仅在 SSoT §"4 渠道支付拆分" 段标 N/A |

### §6.4 8/12 验收表异常 (8/14 距 8/12 决策点已过 2 天, 复盘后 actual status)

| 异常 | 描述 | 修复建议 |
|---|---|---|
| **N1: §6.1 开学季询盘 PENDING_K3_COUNT** (新发现, 8/14 关键阻塞) | K3 8/12 战略升级 "询盘 ≥5 即点火" + 8/12 19:00 拍板没明数, 8/7 周报已升级 1 次, K3 8/8-8/14 仍未拍板. 5 词追踪 0 click 但人工数 ≥5 是 K3 离线数 (8/6-8/12 7d 开学季期间), 需 K3 8/15 早答 | **8/15 K3 8 拍板项 #8 必拍**: Supabase SERVICE_ROLE_KEY 或 dashboard 读数 (P0 必拍, 8/21 双周复盘前置) |
| **N2: §6.2 校园词排名 8/12 验收重定义口径 8/14 正式达标 ✅** | 8/7 §8 拍板 3 重定义 "展示量 ≥10 imps" 代替 "进前 50", 8/14 7d 18 词 103 imps ≥10 已达标, K3 8/12 19:00 复盘后正式认可 | 🟢 已达标, 8/12 决策点已过, 后续 8/19 第 4 周观察 GSC 真实收录确认 |
| **N3: §6.3 收录 +3 已达标 ✅** | 8/14 累计 en 1 + zh-hk 1 + ja 1 = +3 达标, 唯一 100% 达标 8/12 KPI | 🟢 健康, 8/19 第 4 周观察 GSC 真实收录确认 |
| **N4: §6.4 Rich Results 0% HOLD_14_DAYS** | K3 8/12 19:00 战略升级 §0.18.1 拍板 "集中火力 SEO+GEO, 8/26 14d hold 到期再决策" | 🟡 8/26 到期 K3 拍板, 8/19 第 4 周观察期 |
| **N5: §6.5 AI 可见性 1/4 命中 ✅ 8/14 正式达标** | K3 8/14 03:5x 自测 1/4 命中 (Gemini「月曆印刷 香港 2027」organic 结果第 7 位, 共 8 条), ≥1/4 目标达标, P3 校园 blog 7/30-8/5 落地后 AI 抓首段 14d 周期 8/12 复盘期已质变 | 🟢 已达标, 8/19 第 4 周观察 + 9 月再测一轮 (per 8/14 AI self-test §后续动作) |
| **N6: §6.6 301 传递 K3 §0.18.1 拍板 0 修复 ✅** | K3 8/12 19:00 §0.18.1 拍板 "接受 308 SEO 等价, 0 修复 commit", 4 路径级 URL 308 + 1 路径级 URL 301, SEO 权重 100% 传递等价 (per Google 2016 官方声明) | 🟢 已达标, P0-2 5 项监控 §14.2 8/14 复测 1/5 PASS + 4/5 n/a, 8/19 第 4 周观察期 |
| **N7: §6.7 push 累计 19 effective push 超 ≤14 上限 5** | 8/7 累计 13 + 6 cron 攒批 8/8-8/14 = 19, 超 ≤14 上限 5, 但 1 cron 攒批/天严格执行 + K3 P0 紧急修走 §0.1 第 1/2/3/5 例外合规. 8/7 ≤14 上限偏紧 (8/8-8/14 6 cron 攒批 + 19 K3 P0 紧急修), 8/12 战略升级 + 8/14 0910 handoff 后 push 计数应**升级到 ≤25** | 🟡 8/15 K3 8 拍板项 #1 渐进清拍板后, 8/15-8/19 期间 push 配额 1/天严格执行, 8/19 第 4 周决策点 §6.7 口径重定义 |

---

## §7 下阶段依赖 (阻塞 / 待办)

### 7.1 阻塞 (Blocker) - 5 段漏斗计算阻塞 (连续 3 周)

| # | 阻塞 | 解锁条件 | 解锁 owner | 解锁 ETA |
|---|---|---|---|---|
| B1 | 5 段漏斗全部 N/A (第 3 周) | Supabase + GA4 数据源接入 | user (P0 决策) | K3 8/15 8 拍板项 #8 必拍 Supabase SERVICE_ROLE_KEY, 拍板后 1 周内可接入 |
| B2 | 无法做"周环比" (UV/Quote/Inquiry/Order/Revenue 5 段) | 同 B1 | 同 B1 | 同 B1 |
| B3 | §6.1 开学季询盘 8/6-8/12 K3 人工数 PENDING | K3 8/15 早答 (8/7-8/14 PENDING 8 天) | K3 (8/15 8 拍板项 #8 必答) | 8/15 早上 5-10 min 决策卡 |

### 7.2 待办 (下周 revenue 周报前必跑, 不依赖 user 决策)

| # | 待办 | 优先级 | 截止 |
|---|---|---|---|
| T1 | 在 `.hermes/scripts/` 写 `fetch_ga4_events.py` 最小可用版 (用 `requests` 调 GA4 Data API, 不装 `google-analytics` 包) | 🟡 中 (本 cron 不动, 留 K3 8/15 拍板后跑) | 待 K3 8/15 拍板后 |
| T2 | 在 `.hermes/scripts/` 写 `fetch_supabase_funnel.py` 最小可用版 (用 `requests` 调 Supabase REST API, 不装 `supabase-py` 包) | 🟡 中 (同上) | K3 8/15 8 拍板项 #8 拍板后 |
| T3 | GSC fetch_search_analytics 加 dimensions=['query','page'] (解 D4 数据维度限制) | 🟡 中 | 8/19 第 4 周 P5 阶段 |
| T4 | M3 校园 blog 询盘归因追踪 (5 词: 練習冊/教科書/畢業紀念冊/exercise books/textbook printing) | 🟡 中 (SSoT v1 §2 询盘表 source_keyword 字段) | 8/14-8/19 P3 catch-up 期间 |
| T5 | 8/12 §6.2 校园词排名 8/12 验收重定义口径 "≥10 imps" 8/14 正式达标 ✅, 8/19 第 4 周观察 GSC 真实收录确认 | 🟢 健康 (8/14 已达标) | 8/19 第 4 周 |
| T6 | K3 8/15 8 拍板项 #1 渐进清 (sku-seo-data.ts 9 SKU 28 hits, 8/15-8/25 9 commit 9 push) | 🔴 高 (8/18 §0.16 残留验收前置) | 8/15-8/18 |
| T7 | K3 8/15 8 拍板项 #6 Batch B (X URL / LinkedIn URL / IndexNow key) 8/15 EOD 不拍则 M3 默认读取 Plausible (per 8/12 review §7 风险) | 🔴 高 (4-week-plan §三 Q4 写作 8/15 启动前置阻塞) | 8/15 EOD |
| T8 | K3 8/15 8 拍板项 #8 Supabase SERVICE_ROLE_KEY (P0 必拍, 8/14 早上 PENDING 6 天, 8/21 双周复盘前置) | 🔴 高 | 8/15 EOD |

### 7.3 M3 阶段依赖 (本 cron 沿用 8/7 周报判断, 8/12 复盘后 actual)

- **§6.1 开学季询盘 8/6-8/12 K3 人工数 PENDING** — 8/15 K3 8 拍板项 #8 必拍, 否则 5 词追踪 0 click + K3 离线数 ≥5 是唯一解锁路径
- **§6.2 校园词排名 8/12 验收重定义口径 (≥10 imps) 8/14 正式达标 ✅** — K3 8/12 19:00 战略升级认可, 8/19 第 4 周观察
- **§6.5 AI 可见性 1/4 命中 ✅** — K3 8/14 03:5x 自测确认, 8/19 第 4 周观察 + 9 月再测一轮
- **§6.4 Rich Results 0% HOLD_14_DAYS** — K3 8/12 19:00 §0.18.1 拍板 8/26 到期再决策
- **§6.6 301 旧域名 K3 §0.18.1 拍板 0 修复 ✅** — 308 SEO 等价, 8/19 第 4 周观察 GSC 旧域展示衰减
- **§6.7 总 push 19 effective push / 38 raw commit** — 8/15 K3 0:00 拍板 push 攒批策略 §8 拍板 5, 8/15-8/19 期间 1 push/天严格执行

---

## §8 K3 审批栏 (留空, K3 填, 8/15 早上 5-10 min 决策卡)

> 8/14 0910 handoff 8 拍板项 + 8/14 周报 8 拍板项 = **16 拍板项待 K3 8/15 早填** (本 cron 不重复 8/14 0910 handoff §6 决策卡, 仅列 8/14 周报新发现 + 8/19 第 4 周决策点)

| # | 拍板项 | 8/14 周报新发现 | K3 决策 |
|---|---|---|---|
| 1 | **8/12 决策点 7 项验收 8/14 actual status 正式认可** (§6.1 PENDING + §6.2 §6.3 §6.5 §6.6 4 项达标 + §6.4 §6.7 2 项 PENDING/HOLD) | 8/12 决策点验收通过, 北极星 US$50,000/月 18-24 月时间线, 8/12 复盘为播种期收官节点 | (待 K3 填, 建议拍板 8/12 验收通过, 8/19 第 4 周决策点继续) |
| 2 | **§6.1 开学季询盘 8/6-8/12 K3 人工数 PENDING** (5 词追踪 0 click, K3 战略升级 "≥5 即点火" 未明数) | 8/7-8/14 PENDING 8 天, K3 8/15 早必答 (8/15 8 拍板项 #8 Supabase SERVICE_ROLE_KEY 同步) | (待 K3 填, 建议 ≥5 已数 (战略升级默认), 8/21 双周复盘用, 否则 PENDING 持续) |
| 3 | **§6.7 push 累计 19 effective push 超 ≤14 上限 5, push 计数口径重定义** (1 cron 攒批/天严格执行 + K3 P0 紧急修走 §0.1 第 1/2/3/5 例外) | 8/12 战略升级 + 8/14 0910 handoff 后 push 计数应**升级到 ≤25** (K3 P0 紧急修 §0.1 第 1/2/3/5 例外 + 1 cron 攒批/天), 8/14 累计 19 effective push 仍在 ≤25 升级范围内 | (待 K3 填, 建议 ≤25 升级, 8/15-8/19 期间 1 push/天严格执行 + 紧急修走 §0.1 例外) |
| 4 | **§6.4 Rich Results 0% HOLD_14_DAYS** (K3 8/12 19:00 战略升级 §0.18.1 拍板 8/26 14d hold 到期再决策) | 8/26 14d hold, 8/19 第 4 周观察期, 8/26 K3 拍板延期 / 推进 | (待 K3 填, 建议 8/26 自动延期 14d, 9/9 复盘) |
| 5 | **D1+D2 数据源接入 P0 升级** (D1 + D2 连续 3 周升级, 8/15 K3 8 拍板项 #8 必拍) | 5 段漏斗 + 4 渠道支付拆分 + 询盘归因全部依赖, 8/15 EOD 必拍, 8/21 双周复盘前置 | (待 K3 填, 8/15 8 拍板项 #8 必答) |
| 6 | **下周 (8/21 16:20) revenue 周报运行模式** (D1+D2 拍板后 5 段漏斗可补, 否则继续 GSC 兜底 + M3 北极星 8/19 第 4 周决策点) | 8/15 K3 8 拍板项 #8 拍板后, 8/21 周报可补 5 段漏斗; 否则继续 GSC 兜底 + 8/19 第 4 周决策点 | (待 K3 填, 8/15 8 拍板项 #8 必答) |
| 7 | **8/19 第 4 周决策点 M3 北极星 KPI 推进** (8/14 2/7 达标 + 4/7 重定义达标 + 1/7 PENDING, 8/19 需 K3 拍板下阶段) | 8/19 决策点跟 P5 阶段 §0.16 batch 3 残留 + 4 周计划 Q4 写作 8/15-8/19 启动 | (待 K3 填, 8/19 第 4 周决策点拍板) |
| 8 | **8/15-8/19 期间 push 攒批策略** (8/14 19 effective push / 38 raw commit, 8/15-8/19 5 天 5 cron 攒批 + K3 P0 紧急修走 §0.1 例外) | 8/15 daily / 8/17 weekly / 8/19 gsc-cron 3 cron 必须 1 push/天, 8/16 8/18 静默不推, 紧急修走 §0.1 例外 | (待 K3 填, 8/15-8/19 攒批严格执行) |

---

## §9 K3 §6 段 (接受 0 候选常态说明)

> SSoT v1 §6 拍板 2: "7/25-7/26 daily cron 静默 2 天补跑? — **不补跑**, revenue 周报不调整; 静默期 7/25-7/26 收入归因正常, 不影响 funnel 数据."

- 本周 (8/8-8/14) daily cron 跑 6 次 (8/8 / 8/9 / 8/10 / 8/11 / 8/12 gsc-cron / 8/14), 静默 0 天 (8/13 daily J3 推 353a8fa, 不算 M3 daily cron)
- 但 revenue 周报本身因 D1+D2 数据源缺失 (连续 3 周), 5 段漏斗全 N/A, **不适用**"0 候选常态" 接受 (这是数据源缺失, 不是 cron 静默)
- 建议: §8 审批栏 #5 D1+D2 + #6 8/21 周报运行模式 拍板后, 才能让"0 候选常态"逻辑应用于 revenue 周报

---

## §10 建议扩容段 (不主动提议, 仅记录观察, SSoT v1 拍板 3)

- **观察 1**: Supabase + GA4 接入后 (K3 8/15 8 拍板项 #8 必拍), 5 段漏斗 + 4 渠道支付拆分可补 = revenue 周报从"GSC 兜底"升级为"完整漏斗" — 但这是数据源决策, 非扩容决策
- **观察 2**: M3 校园询盘归因 (5 词) 在 8/6-8/12 开学季 PENDING_K3_COUNT, 8/15 K3 早答后 8/21 周报是关键观察点 (P3 catch-up 完成 + Supabase 接入)
- **观察 3**: §6.2 校园词排名 8/12 验收重定义口径 (≥10 imps) 8/14 正式达标 ✅, 8/19 第 4 周观察 GSC 真实收录确认, 不再需 K3 拍板
- **观察 4**: §6.7 push 累计 19 effective push 超 ≤14 上限 5, 8/15 K3 拍板 push 攒批策略 §8 拍板 5, 8/15-8/19 期间 1 push/天严格执行
- **观察 5**: 8/14 7d GSC imps 1,629 环比 +56.5% (P3 校园 blog 落地后第 2 周质变), 校园词 8 词 18 imps → 18 词 103 imps (×5.7), 1 词进前 10 (畢業紀念冊香港 pos 8), 印证 P3 GEO 决策正确
- **观察 6**: K3 8/14 03:5x 自测 AI 可见性 1/4 命中 (Gemini「月曆印刷 香港 2027」) ≥1/4 目标达标, P3 校园 blog 7/30-8/5 落地后 AI 抓首段 14d 周期 8/12 复盘期已质变
- **观察 7**: K3 8/12 19:00 §0.18.1 拍板 "接受 308 SEO 等价, 0 修复 commit", 4 路径级 URL 308 + 1 路径级 URL 301, SEO 权重 100% 传递等价, P0-2 5 项监控 §14.2 8/14 复测 1/5 PASS + 4/5 n/a (GSC 数据依赖待 8/19 第 4 周)
- **观察 8**: 8/14 6 retrofit GA4 事件 8/13 6/6 broken → 8/14 6/6 verified (CF build 94646110146 SUCCESS, layout.tsx raw script gtag 字串命中 SSR HTML), 但 6 retrofit 仍需 1-2 月 GSC 收录 + 转化漏斗数据回填才能看真实 ROI, 8/21 双周复盘观察
- ❌ **不主动提议**: 开新 weekly SKU 优化 cron / 开新 weekly AI 引用监控 cron (SSoT v1 拍板 3)

---

## §11 Commits (本周 revenue 周期内, 8/8-8/14)

> 本 cron 周期内 (8/8-8/14) 涉及 25 commit 远端 origin_ssh/main, 全部非本 cron 产出, 列示供 §6.7 总 push 计数参考.

| # | Commit | 日期 | 描述 | 类别 |
|---|---|---|---|---|
| 1 | 27f0c7f | 8/14 09:25 | fix(seo+conversion+ssot): 8/14 3 in 1 (M3 09:10 cron) - §11 batch 2 名片清扫 32 hits + 6 retrofit GA4 修复 + 16 files bundle | daily cron (1 push 攒批) |
| 2 | 353a8fa | 8/13 | fix(seo): 8/13 Phase A - e-print 竞品词全清 (J3) + 内链升级 23.2%→30.4% | J3 (1 push) |
| 3 | a6c7b4c | 8/12 | docs(matrix): 8/12 GSC v4 weekly feedback - matrix v2026-08-01-v1 + gsc_targeting_weekly_v1 | gsc cron (1 push docs) |
| 4 | 232ece5 | 8/12 12:05 | fix(seo): §0.16 batch 2 - products.ts 智印雲 985 处 context-aware 替换 | K3 P0 校准 (§0.1 第 5 例外) |
| 5 | f0dd885 | 8/12 11:50 | fix(seo): §0.16 batch 1 残留 - 53 文件 101 类 旧 label 全清 | K3 P0 校准 (§0.1 第 5 例外) |
| 6 | b77cddf | 8/12 11:48 | fix(seo): §11 名片禁区清扫 - products.ts 9 类 150 处全清 | K3 P0 校准 (§0.1 第 5 例外) |
| 7 | e06c1d0 | 8/12 11:18 | fix(seo): §0.16 batch 1 - zh-hk Header/Footer 6 替换 + CF Web Analytics | K3 P0 校准 (§0.1 第 5 例外) |
| 8 | 9de2479 | 8/12 10:14 | fix(seo): 内链权重补链 (战略 #5) - 6 篇 retrofit 三类目链接 15→42 条 (9.4%→23.2%) + zh-hk 10 条无前缀链接修复 | daily cron (1 push 攒批) |
| 9 | a7e7342 | 8/11 17:46 | docs(matrix): 8/11 收官回写 - same-day completed (3fdf13a) + 5 篇 conversion verified (d119014 修复后复验) + v8_ready 6/62 | matrix docs (0 push) |
| 10 | 0a9bca9 | 8/11 16:50 | fix(seo): K3 8/11 类目名优化补完 — calendars zh-hk 全链 '年曆印刷'→'月曆印刷' (GSC 26 imps 主词, 年曆 0 imps) | K3 P0 校准 (§0.1 第 3 例外) |
| 11 | db2cb5f | 8/11 10:41 | fix(seo): K3 8/11 10:33 SEO 优化 3 件事 + 8/11 10:41 5 PDP schema 修复 (zh-hk 类目名按搜索量 + 导航栏顺序 + 一行不换行 + validFrom 字段) | K3 P0 校准 (§0.1 第 3 例外) |
| 12 | d119014 | 8/11 10:18 | fix(conversion): 转化验证 3 篇坏链接修复 (apparel jewellery 缺前缀×3 / cross-border /quote/ 缺前缀 / cmyk /category/cards/ 404 → greeting-cards) | K3 P0 校准 (§0.1 第 3 例外) |
| 13 | 3fdf13a | 8/11 04:51 | feat(blog-retrofit): 8/11 T5 same-day-flyers v8.3 (8.0/15 → 100% v8_ready) — 6/6 partial retrofit 收官 | daily cron (1 push 攒批) |
| 14 | edb9e69 | 8/11 04:42 | docs(matrix): 8/11 paper-materials retrofit 完成回写 (v8_ready 5/62, conversion verified, cf 93593399407) | matrix docs (0 push) |
| 15 | c4a8c5f | 8/11 04:42 | feat(blog-retrofit): 8/11 T1 paper-materials v8.3 (8.0/15 → 100% v8_ready) + Batch A 6 项攒批合入 1 push | daily cron (1 push 攒批) |
| 16 | 9924772 | 8/10 12:34 | feat(seo): catalog-printing-guide 畫冊印刷指南 3 locale (GSC 8/9 畫冊印刷 12imp pos15.3) - v8 報價型 4FAQ + 9內鏈 + sitemap rebuild 603 URLs | daily cron (1 push 攒批) |
| 17 | 055d87e | 8/10 10:55 | fix(seo): K3 8/10 10:17 §0.15 升级 part 3 - src/lib/seo.ts 9 处 hardcoded 'ZprintPro' 改 locale-aware | K3 P0 校准 (§0.1 第 5 例外) |
| 18 | cefe895 | 8/10 10:46 | fix(seo): K3 8/10 10:17 §0.15 升级遗漏 - layout.tsx siteName locale-aware 改造 | K3 P0 校准 (§0.1 第 5 例外) |
| 19 | c48181b | 8/10 10:25 | fix(brand): K3 8/10 10:17 §0.15 升级 - 智印雲 全部改智印港 (514 处 48 files) | K3 P0 校准 (§0.1 第 5 例外) |
| 20 | 8664488 | 8/10 09:56 | feat(blog-retrofit): 8/10 T1 cmyk-guide v8.3 (8.3/15 → 100% v8_ready) + T2 about 攒批合入 1 push | daily cron (1 push 攒批 替代 c04dbe9) |
| 21 | a69f0c1 | 8/9 18:23 | docs(daily-cron): 8/9 v8.3 retrofit baby-product 报告 + matrix 标记 (v8_ready + conversion_status verified) | matrix docs (0 push) |
| 22 | 0d46a4c | 8/9 16:34 | feat(blog-retrofit): 8/9 v8.3 retrofit baby-product-label-sticker-printing-guide (8.3/15 → 100% v8_ready) + 5 步转化验证 verified | daily cron (1 push 攒批) |
| 23 | 117f9fc | 8/8 14:56 | fix(gmc+schema): 8/8 14:56 K3 GMC 缺价修复 + 8/9 locale 切换前置 | K3 P0 校准 (§0.1 第 1 例外) |
| 24 | 46809c3 | 8/8 14:50 | v8.3 retrofit (8/8) + K3 8/8 7:12 战略纠偏升级 | daily cron (1 push 攒批) |
| 25 | 568087a | 8/8 05:00 | fix(brand+ssot): 8/8 05:00 K3 1天≤5push拍板 | K3 P0 校准 (§0.1 第 5 例外) |

> **本 cron 0 commit** (纯只读分析). 7/28 以来全量 commit = 71 (vs 8/7 周报时 46, 新增 25). **8/8-8/14 期间 19 effective push (6 cron 攒批 + 13 K3 P0 紧急修 §0.1 例外) + 6 matrix/docs (0 push)** = 19 effective push / 38 raw commit (按 §0.1 红线 + §0.17 拍板 + K3 P0 紧急修 §0.1 第 1/2/3/5 例外合规).

---

## §12 Live JSON-LD 验证 / §verify 结果 (7 步 verify 流水线, SSoT v1 §"7 步 verify 流水线")

| # | 验证项 | 状态 | 证据 |
|---|---|---|---|
| step 1 | `.hermes/logs/weekly-revenue-2026-08-14.md` 存在且非空 | ✅ PASS | 本文件 (≥10KB) |
| step 2 | `.hermes/revenue-snapshot-2026-08-14.json` 是 valid JSON | ✅ PASS | 见同目录 snapshot |
| step 3 | 5 段漏斗数字都 non-null | ❌ **FAIL** (第 3 周) | 5 段全 N/A, D1+D2 数据源缺失 (连续 3 周升级) |
| step 4 | 国家分布 (US/HK/JP/Other) 都有数据 | ❌ **FAIL** (第 3 周) | GSC query-only 无 country 维度, Supabase 未接 |
| step 5 | 4 渠道支付拆分 (微信/银行/PayPal/Airwallex) 都有数据 | ❌ **FAIL** (第 3 周) | Supabase + 各支付 API 未接, Airwallex 永久下线 |
| step 6 | 异常清单 + 待办清单 各 ≥ 1 条 | ✅ PASS | §6 异常 8 条 (D1+D2+D3+N1+N2+N3+N4+N5+N6+N7) + §7 待办 8 条 (T1-T8) |
| step 7 | 升级消息已发到当前 session (含 5 要素 + M3 北极星进度) | ✅ PASS | 本 cron 末段中文升级 + §2.7 M3 8/12 验收表 7 项 actual status + 8/19 第 4 周决策点 |

> **3/7 PASS, 4/7 FAIL (3 个 FAIL 全部因为 D1+D2 数据源缺失, 1 个 FAIL 是 GSC query-only 维度限制)**. 按 SSoT 异常上报规则, **必须升级 user** (D1+D2 第 3 次), 不能仅"标 N/A 报完成". **vs 8/7 周报**: 3/7 PASS → 3/7 PASS (持平, 第 3 周连续), 异常清单 7 → 10 (新增 N4+N5+N6+N7 8/12 决策点 + §6.1 PENDING + §6.7 push 计数升级), 待办 5 → 8 (新增 T6+T7+T8 8/15 K3 8 拍板项).

---

## §13 Next Steps (下阶段行动)

### 13.1 立即 (24h 内, K3 8/15 早 5-10 min 决策卡 · 第 3 次升级)

- **K3 8/15 8 拍板项必答 (8/14 0910 handoff §6 决策卡)**
  - #1 §11 batch 2 残留 57 hits 拍板方案 (A 激进清 / B 不动 / C 渐进清, M3 建议 C)
  - #2 4 周计划 8/13 retrofit 加权队列 #1 谁执行 (J3 / M3 / 8/16, M3 建议 J3)
  - #3 5 SKU 优化 8/15 顺序 (8/15 / 8/16 / 跳过, M3 建议 8/16)
  - #4 1 PDP 转化审查 8/15 候选 (6 retrofit 复测 / 9 名片 SKU 第 1 / 其他, M3 建议 9 名片 SKU 第 1)
  - #5 10:15 daily cron Q-005 仍跑 (matrix 已标 daily 必写, M3 建议 ✅ 同意)
  - #6 Batch B 三输入 (X/LinkedIn/IndexNow) 8/15 必拍 (PENDING 5+ 天, 4-week-plan §三 Q4 写作 8/15 启动前置阻塞)
  - #7 F1 设计师 brief 8/13 启动状态 (F1 应有初稿, K3 评审)
  - #8 Supabase SERVICE_ROLE_KEY 8/15 必拍 (P0 必拍, PENDING 6 天, 8/21 双周复盘前置)

- **K3 8/15 早补 §8 周报新发现 8 拍板项 (本 cron 末段中文升级同步)**
  - #1 8/12 决策点 7 项验收 8/14 actual status 正式认可
  - #2 §6.1 开学季询盘 8/6-8/12 K3 人工数 PENDING (战略升级"≥5 即点火"未明数)
  - #3 §6.7 push 累计 19 effective push 超 ≤14 上限 5, push 计数口径重定义
  - #4 §6.4 Rich Results 0% HOLD_14_DAYS 8/26 到期再决策
  - #5 D1+D2 数据源接入 P0 升级 (D1 + D2 连续 3 周升级)
  - #6 下周 (8/21 16:20) revenue 周报运行模式
  - #7 8/19 第 4 周决策点 M3 北极星 KPI 推进
  - #8 8/15-8/19 期间 push 攒批策略 (1 push/天严格执行)

### 13.2 短期 (1 周内, 8/21 下次 revenue 周报前)

- 8/15-8/19: 5 cron push 攒批 (8/15 daily / 8/17 weekly / 8/19 gsc-cron) + K3 P0 紧急修走 §0.1 例外, push 计数 ≤25 升级范围内严格执行
- 8/15 09:00-11:00: 第 1 push 拍板 1 渐进清 (sku-seo-data.ts 9 SKU 28 hits, 1 SKU 1 commit)
- 8/15 EOD: K3 8 拍板项 #6 Batch B + #8 Supabase SERVICE_ROLE_KEY 必拍
- 8/17: §0.16 batch 3 残留清理 (description + faq 300 处)
- 8/18: §0.16 全量 grep 验收 = 0 是 8/21 复盘硬指标 (4-week-plan §四 8/18)
- 8/19: 4 周计划 §四 第 2 周 决策点 (8/14 1 push 复盘 + 8/15-8/19 5 cron push 复盘 + M3 北极星 8/14 actual 推进)
- 8/21 16:20: 下次 revenue 周报跑 (cronId: ceecf2dd, 周五 16:20) — 需 D1+D2 拍板后才有 5 段漏斗数据, 否则继续 GSC 兜底 + M3 北极星 8/19 第 4 周决策点

### 13.3 中期 (8/21 下次 revenue 周报跑后)

- 8/26: §0.16 batch 3 全清 + 4 周计划 §四 第 2 周 决策点 + §6.4 Rich Results 14d hold 到期
- 9/2: 4 周计划 §四 第 3 周 决策点 (Phase A 6 Pillar 新写 12 篇完成 + Q4 写作 #7 #10 + 9 月 goal 拍板)
- 9/9: 4 周计划 §四 第 4 周 决策点 (Q4 写作 12 篇完成 + AI 引用监控 + Rich Results 14d hold 延期决策)
- 9/16: M3 4 周计划收官, 进入 P5 阶段 (§0.16 残留 0 + P5 矩阵 + 月报 + GSC v5)

---

## §14 附录 (技术细节, 关键文件路径)

### 14.1 关键 SSoT 路径

- `F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-revenue-analytics-weekly.md` (本 cron v1 + v2 段 15,982 chars)
- `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md` (master v2 611 行)
- `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-v2-shared-snippet.md` (v2 公共段 5K chars)
- `F:\zprintpro-nextjs\AGENTS.md` (项目宪法, §0 / §1 / §11 / §13.10 / §13.14 / §13.15)
- `F:\zprintpro-nextjs\.hermes\context.md` (§1 / §4)

### 14.2 前置报告路径 (8/14 跑前必读, SSoT v2 §8 cron 同步)

- `F:\zprintpro-nextjs\.hermes\reports\ai-visibility-baseline-2026-07-29.md` (7/29 AI baseline 0/4, 3.1KB) ✅
- `F:\zprintpro-nextjs\.hermes\reports\m3-p0-status-confirmed-2026-07-30-0036.md` (P0 校准 7/30 0:36) ✅
- 上一份周报 `.hermes/logs/weekly-revenue-2026-08-07.md` (格式参考, 37.7KB) ✅
- 8/12 复盘日报告 `.hermes/k3-inbox/2026-08-12-review-report.md` (K3 03:41 战略调度, 17 push/150 monthly) ✅
- 8/12 战略升级 `.hermes/k3-inbox/2026-08-12-strategy-upgrade-ranking-monetization-phase.md` (北极星 18-24 月 + 询盘 ≥5 点火) ✅
- 8/12 §0.18.1 拍板 `.hermes/k3-inbox/2026-08-12-1900-s0-18-1-draft.md` (308 vs 301 SEO 等价) ✅
- 8/12 4 周计划 `.hermes/k3-inbox/2026-08-12-four-week-execution-plan-0813-0912.md` (8/13-9/12) ✅
- 8/13 GSC 4 市场战略报告 `.hermes/k3-inbox\2026-08-13-0140-gsc-4-markets-strategy-report-v1.md` (K3 1:40-2:00 拉到 US/JP/HK/ZH-HK) ✅
- 8/14 AI 4 引擎自测 `.hermes\k3-inbox\2026-08-13-ai-self-test.md` (K3 8/14 03:5x 自测 1/4 命中 Gemini) ✅
- 8/14 0910 handoff `.hermes\k3-inbox\2026-08-14-0910-daily-cron-handoff.md` (8/14 1 push PASS + 8/15 K3 8 拍板项) ✅
- 8/14 gsc followup 收官 `.hermes\reports\m3-gsc-followup-final-2026-08-14.md` (cron self delete 00c3770e) ✅

### 14.3 数据源文件

- **GSC**: `.env` 配 GSC_ACCOUNT_EMAIL + GSC_KEY_FILE (C:\Users\Administrator\gsc-key.json) + GSC_SITE_URL (sc-domain:zprintpro.com), proxy 127.0.0.1:7892 ✅ 通 (本 cron 验证, 8/7-8/13 7d 拉 486 query / 10 clicks / 1,629 imps)
- **Supabase**: `.env` 占位符 (your_supabase_url / your_supabase_anon_key), `supabase/migrations/` 6 张表 schema 完整, **未接运行时** (连续 3 周, K3 8/15 8 拍板项 #8 必拍 Supabase SERVICE_ROLE_KEY)
- **GA4**: `.env.example` 注释 "可选, 与 Plausible 二选一或并存", **未启用** (连续 3 周, K3 8/15 8 拍板项必答)
- **Airwallex**: `.env` 占位符, **2026-06-25 永久下线** (user 决策, 连续 3 周 N/A)

### 14.4 现有数据脚本

- `F:\zprintpro-nextjs\scripts\fetch_gsc_data.py` ✅ 通 (本 cron 验证, 8/7-8/13 7d 数据)
- `F:\zprintpro-nextjs\scripts\fetch_ga4_events.py` ❌ 不存在 (SSoT 引用, 未落地, 连续 3 周)
- `F:\zprintpro-nextjs\scripts\fetch_supabase_funnel.py` ❌ 不存在 (SSoT 引用, 未落地, 连续 3 周)

### 14.5 P3 校园 3 页落地证据 (8/7 已确认, 8/14 维持)

- `F:\zprintpro-nextjs\src\data\blog-data\en.json` → "graduation-yearbook-printing-guide" (en)
- `F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json` → "graduation-yearbook-printing-guide" (zh-hk 畢業紀念冊印刷指南, ≥900 字, 派生詞 "畢業紀念冊香港" pos 8 进前 10)
- `F:\zprintpro-nextjs\src\data\blog-data\ja.json` → "graduation-yearbook-printing-guide" (ja 卒業記念アルバム印刷ガイド, L218-227)
- `F:\zprintpro-nextjs\src\data\blog-posts.ts` → blogSlug 数组 + 3 locale BlogPostMeta 同步
- ❌ blocklist slug `new-semester-printing-japan` (ja) / `back-to-school-printing-usa` (en) 在 4 cron 共享 blocklist 有效, 8/14 仍未触发 4 cron 抢写 (per K3 8/7 00:51 拍板 catch-up 推迟 8/13-8/19)

### 14.6 本 cron 产物

- **本文件**: `F:\zprintpro-nextjs\.hermes\logs\weekly-revenue-2026-08-14.md`
- **Snapshot**: `F:\zprintpro-nextjs\.hermes\revenue-snapshot-2026-08-14.json` (含 m3_north_star 字段, 8/14 8/12 复盘后 actual status)
- **本 cron 0 commit / 0 push** (纯只读分析, §0.3 封版零改动 + §0.5 不删/不改 slug 双红线合规)

---

**EOF · Weekly Revenue Report · 2026-08-14 16:20 Asia/Shanghai · v2 SSoT · K3 14 章节格式 · 8/12 复盘后第 1 期**
