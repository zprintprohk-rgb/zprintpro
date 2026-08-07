# 8/12 复盘模板 (K3 8/7 02:12 拍板, M3 8/7 02:20 写)

> **触发**: K3 §6 8/12 验收 (开学季流量战役北极星), 7 项指标必答
> **目的**: 自动生成复盘报告, 不需 K3 复盘当日再来回拉扯
> **执行**: 8/12 当日 22:00 daily cron auto 跑这份模板, 落盘 `.hermes/k3-inbox/2026-08-12-review-final.md`

---

## §1. 复盘背景

- **战略原点**: 8 周 60 篇 v8 rollout (8/5 17:24 K3 C 拍板) + Qwen 3.8 8/7 02:12 策略 P0-P2 (询盘链路 / AI 注入 / 301 止血 / CTR 监控 / retrofit 优先)
- **时间窗**: 8/6 0:00 - 8/12 22:00 (7 天)
- **北极星**: §6.1 询盘 ≥5 (开学季, 跨境 EC 旺季开端)
- **核心矛盾**: 流量真相 (展示涨, 点击几乎为零, CTR 0.23%)

---

## §2. 7 项指标实际值 vs 目标值 (K3 §6 验收)

| # | 指标 | 目标 | 实际 (auto 抓) | 状态 |
|---|------|-----|--------------|-----|
| 6.1 | 询盘数 (Supabase `quotes` 表) | ≥5 (8/7 18:30 修 /api/quote 后 4 天内 8/8-8/11 可达) | (查 count) | PASS / FAIL |
| 6.2 | 校园词排名 (K3 8/8 拍板改口径) | **展示量 ≥10 imps** (替代 top 50, 当前 18 imps 已达标) | (查 GSC) | PASS / FAIL |
| 6.3 | 收录页数增长 | +3 (P3 catch-up 8/19 后) | (查 GSC) | PASS / FAIL |
| 6.4 | Rich Results Test | 100% | (查 GSC) | PASS / FAIL (v2.1 P1 已删 aggregateRating, 后续重接) |
| 6.5 | AI 可见性 (K3 8/8 拍板改口径) | **≥1/4 引擎引用 zprintpro.com** (替代 ≥1/7) | (查 Perplexity/ChatGPT/Claude/Gemini) | PASS / FAIL |
| 6.6 | 301 传递 (old_url 5/5) | 5/5 PASS | (K3 手动验 CF Bulk Redirect List) | PASS / FAIL |
| 6.7 | 总 push ≤14 (8 月) (K3 8/8 拍板攒批) | ≤14 + 1 push/day 攒批 (紧急修走 §0.1 例外) | (查 git log) | PASS / FAIL |

---

## §3. 3 篇 v8 实验组 GSC CTR 对比 (K3 §6.4 复盘口径)

| 文章 | 8/5 7d CTR | 8/12 7d CTR | 提升 |
|------|-----------|-----------|------|
| same-day-flyers (T1 改 即日印刷) | (查 GSC) | (查 GSC) | (diff) |
| cosmetics-packaging-box (8/5 56f254c v8) | (查 GSC) | (查 GSC) | (diff) |
| calendar-printing-guide (8/5 56f254c 8.5 v8) | (查 GSC) | (查 GSC) | (diff) |
| **其他 v7/v6 旧文** (3 篇对照) | (查 GSC) | (查 GSC) | (diff, 期望 v8 > 旧文) |

**判定**: v8 实验组平均 CTR > 旧文 50% 算显著提升, 否则 8/13-8/19 需调整模板

---

## §4. 4 个 ctr_target 词排名变化 (K3 8/6 0:39 早会, T1 狙击)

| 词 | 7d imps | 7d pos baseline (7/29-8/5) | 8/12 pos (8/6-8/12) | 4w pos 目标 | 状态 |
|---|---------|---------------------------|---------------------|-----------|------|
| 即日印刷 (zh-hk/en/ja) | 28 | 15.25 | (查 GSC) | top 10 | PASS / FAIL |
| 餐牌印刷 (zh-hk) | 14 | 17.93 | (查 GSC) | top 10 | PASS / FAIL |
| 月曆印刷 (zh-hk/en/ja) | 31 | 23.61 | (查 GSC) | top 10 | PASS / FAIL |
| 両面カラー印刷 (ja) | 27 | 22.19 | (查 GSC) | top 10 | PASS / FAIL |

**判定**: 8/12 至少 2 个词进 top 10 算 8/6 0:39 T1 狙击成功

---

## §5. AI 可见性实测 (K3 §6.5, Qwen 3.8 P0 注入)

**M3 8/7 注入**:
- 3 篇 v8 标杆文 (cosmetics / packaging / same-day-flyers) 末尾加 llms.txt 摘要块
- robots.txt 确认未屏蔽 GPTBot / ClaudeBot / PerplexityBot

**8/12 复盘测试**:
| AI 引擎 | 测试查询 | 引用 zprintpro.com? | 证据 |
|---------|---------|------------------|------|
| Perplexity | "香港化妆品包装盒定制" | YES/NO | (截图) |
| ChatGPT Search | "Custom packaging boxes for small business USA" | YES/NO | (截图) |
| Claude.ai | "両面カラー印刷 おすすめ" | YES/NO | (截图) |
| Gemini | "月曆印刷 香港 2027" | YES/NO | (截图) |

**判定**: ≥1/4 引擎引用 = PASS

**§5.5 Branded Search 监测 (K3 8/8 02:52 拍板, 智印港公式复制)**:
- 6 个 query: ZprintPro / ジープリント / ジープリント 印刷 / ジープリント ステッカー / ジープリント 評判 / ジープリント 料金
- baseline 8/8 = 0, target 8/12 ≥1 个 query 命中 zprintpro.com 域名
- 监测: zprintpro-gsc-feedback-loop (每周三 15:00) + 8/12 review 当日手动统计 GSC 7d 数据
- 期望: cross-border-ecommerce-shipping-box-guide (8/9) + baby-label + cmyk + paper 4 篇 retrofit 末尾自然提及「ジープリント」2-3 次, 诱导 branded search

**§5.6 Organization sameAs 实体信号 (K3 8/8 02:52 拍板, GEO 公式)**:
- 8/9 改 src/lib/seo.ts 加 Organization JSON-LD sameAs 数组 (X + LinkedIn + 30 JP 目录 + Startup Base) + areaServed=JP + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷]
- 验证: curl + grep Organization schema 含 sameAs + areaServed=JP + knowsAbout
- 8/12 验收: 5/5 PASS

**§5.7 外链目录注册进度 (K3 8/8 02:52 拍板 §0.9 增补)**:
- 8/10-8/12 AutoGLM 跑日本目录填表, K3 9:00 起来点最终提交 + 邮箱验证
- 目标: 8/12 累计 30 条合规目录 = 日本实体存在感基线
- 验收: 30/30 条 approved + visible

---

## §6. 询盘链路验证 (K3 §6.1, Qwen 3.8 P0 端到端)

**实测记录** (K3 5min 自查):
- [ ] 3 设备 × 3 locale = 9 次提交成功
- [ ] 9/9 收到 Webhook 邮件通知 (zprintpro@outlook.com)
- [ ] 9/9 GA4 DebugView 看到事件 (事件名待 K3 拍板: `contact_form_submit` vs `generate_lead`)
- [ ] Supabase `quotes` 表 count (8/6-8/12) ≥5

**事件名口径** (K3 拍板):
- 当前实现: `contact_form_submit` (analytics.ts:110, 自定义)
- GA4 标准: `generate_lead`
- **K3 拍板**: A. 改代码 contact_form_submit → generate_lead (2 行 edit) / B. 维持自定义, GA4 自定义报告读

---

## §7. 301 传递 (K3 §6.6, Qwen 3.8 P1 止血)

**M3 8/7 02:15 已跑**:
- next.config.js: 11 条 redirect 规则解析 ✅
- 5 抽样 URL live 验证: 5/5 PASS ✅
- CF Bulk Redirect List enabled 状态: K3 5min 自查 (M3 0 CF API token)

**8/12 复盘检查**:
- K3 8/7 22:00 报告 (自查 CF Bulk Redirect List enabled 状态)
- 5/5 抽样 old_url curl 仍 PASS

---

## §8. v8 Retrofit 进度 (8/6 2:20 K3 拍板 + Qwen 3.8 P2 8/7-8/12 优先)

| 阶段 | 排期 | 篇数 | 8/12 完成度 |
|------|-----|------|------------|
| A. partial 补完 | 8/6-8/12 | 6 篇 | (查 audit 报告) |
| B. P0/P1 | 8/13-8/19 | 25 篇 | (8/12 仍 0/25) |
| C. P1/P2 | 8/20-8/26 | 20 篇 | (8/12 仍 0/20) |
| D. News | 8/27-8/30 | 10 篇 | (8/12 仍 0/10) |

**8/12 验收**: Phase A 6 篇 partial 全 v8_ready (12+/15 分)

---

## §9. 8/13-8/19 路径推荐 (基于 §2-§8 实际值)

| 情景 | 触发条件 | 行动 |
|------|---------|------|
| **A. 询盘 ≥3** | §6.1 PASS | 恢复 daily cron 双任务 (1 新写 + 1 retrofit), 8/13 启动 Phase A 6 Pillar 新写 |
| **B. 询盘 = 0 但 AI ≥1** | §6.1 FAIL, §6.5 PASS | 全力修表单/CTA/落地页, 暂停内容生产, 8/13-8/19 retrofit 6 篇也暂停 |
| **C. 询盘 = 0 且 AI = 0** | §6.1 FAIL, §6.5 FAIL | 启动"转化诊断专项" (定价/信任状/竞品差异), 暂停所有 cron 1 周 |
| **D. P3 catch-up 8/13-8/19** | 不管情景 A/B/C | 4 cron blocklist 2 slug 延期 active (back-to-school-printing-usa en / new-semester-printing-japan ja) |

---

## §10. §0.7 关键漏斗 endpoint 自检 (K3 8/8 01:03 拍板, 9ab9ee4 教训固化)

任何 /api/* 涉及 Supabase 写入的 endpoint 部署后必 3 步 production smoke, 8/12 复盘必答:

| # | 自检项 | 期望 | 实际 (auto 跑) | 状态 |
|---|--------|-----|--------------|-----|
| 0.7.1 | curl POST /api/quote/ | HTTP 200 + UUID | (跑) | PASS / FAIL |
| 0.7.2 | Supabase GET /rest/v1/quotes | 看到最新 5 条 + 落库数 ≥5 | (跑) | PASS / FAIL |
| 0.7.3 | formsubmit.co 收件箱激活 | 收到激活邮件 (K3 点链接) | (K3 查) | PASS / FAIL |
| 0.7.4 | /api/order-notify HTTP 200 | 200 + success:true | (跑) | PASS / FAIL |
| 0.7.5 | PDP 提交页 form 表单可达 | 3 locale 9 页面 form 渲染 | (跑) | PASS / FAIL |

**判定**: 5/5 PASS 算 §0.7 PASS, 否则 8/13 修法升级 K3.

**教训源头**: 8/7 18:30 /api/quote 写错表 quote_calculations 500 黑洞, 部署 6/7-8/7 一直坏, §6.1 询盘=0 归因全错, K3 4 天冲刺阻塞. 9ab9ee4 commit 修复 (K3 18:33 拍板 A + 护栏).

---

## §11. 复盘报告输出路径

`.hermes/k3-inbox/2026-08-12-review-final.md` (auto 8/12 22:00 daily cron 生成)

**内容**:
- §2-§8 7 项指标实际值 (auto 抓)
- §9 路径推荐 (A/B/C/D, K3 拍板)
- §11 月度 push 累计 (≤14)
- §12 后续 1 周 (8/13-8/19) 任务清单

---

## §12. 8/12 当日 M3 行动清单 (auto 跑)

```
1. 拉 GSC 7d 数据 (.hermes/gsc-7d-2026-08-12.csv)
2. 拉 Supabase quotes count (8/6-8/12)
3. 跑 audit_v8.py 8/12 版 (含 Phase A 6 篇 partial 评分)
4. 跑 5 URL 抽样 (v8 标杆 3 篇 + 其他 2 篇)
5. 写 `.hermes/k3-inbox/2026-08-12-review-final.md` (套本模板)
6. 升级 K3 (1 段总结 + 7 项 PASS/FAIL + 路径推荐 A/B/C/D)
```

---

**作者**: Mavis 模板组 (K3 8/7 02:12 拍板)
**版本**: v1.0 (2026-08-07)
**下版**: 8/12 22:00 auto 生成实报告, 套用本模板填实际值
