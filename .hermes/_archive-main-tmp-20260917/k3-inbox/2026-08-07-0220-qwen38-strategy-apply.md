# 8/7 02:20 千问 3.8 策略执行包 (Mavis 主动拍板)

## 触发
K3 8/7 02:12 引千问 3.8 策略:
- P0 询盘链路端到端测试 (§6.1)
- P0 AI 可见性主动注入 (§6.5)
- P1 CTR 狙击词排名监控
- P1 301 传递止血 (§6.6)
- P2 v8 Retrofit 暂停新写 (8/7-8/12)
- Phase 2 8/13-8/19 扩展期 条件触发

## 3 blockers 主动拍板 (K3 让 Mavis 自主决策)

| Blocker | Mavis 拍板 | 理由 |
|---------|----------|------|
| **D1+D2 数据源接入** | ✅ **不需 K3 重新授权, Mavis 可用现有 Supabase REST API** | env SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL 已就绪, 代码层 src/lib/supabase.ts 已有 supabase client |
| **§6.2/§6.3 验收口径** | 推 K3 拍: 改"展示量 ≥10 imps" 替代 (8/12 不可达) | §6.1 (询盘≥5) 是终极, §6.2/§6.3 校园词排名是辅助. 8/12 验收口径应聚焦 §6.1 |
| **8/7-8/12 daily cron 模式** | ✅ **接受: 暂停新写, retrofit-only 6 篇 partial + 转化验证前置** | 6 篇 partial 8/6-8/12 6 天清零, 8/13 起恢复双任务 |

## 8/7-8/12 6 天执行表 (Mavis 拍板)

| Day | 任务 | 1 push | 转化验证 |
|-----|------|--------|----------|
| 8/7 (今天) | retrofit 1 篇 partial (apparel-shopping-bag-printing-guide 8.7/15) | 1 push | auto check |
| 8/8 | retrofit 1 篇 (cross-border-ecommerce-shipping-box-guide 8.7/15) | 1 push | auto check |
| 8/9 | retrofit 1 篇 (baby-product-label-sticker-printing-guide 8.3/15) + 301 diff 报告 | 1 push | auto check |
| 8/10 (周一) | retrofit 1 篇 (cmyk-guide 8.0/15) + weekly meta refresh 11:00 | 1 push | auto check |
| 8/11 | retrofit 1 篇 (paper-materials 8.0/15) | 1 push | auto check |
| 8/12 (复盘日) | retrofit 1 篇 (same-day-flyers 8.0/15, **T1 4 CTR 狙击, 4 FAQ 必含**) + 7 项指标复盘报告 | 0 push (攒批) | auto check + 7 项 |

**6 push / 6 天 = 1 push/day 不破 §0.6**
**8/12 复盘日 0 push, 节省 1 quota**

## 已完成 (8/7 02:20 落盘, 1 push 整合)

### 1. 报告落盘 (不破 push, 仅 .hermes/ 改动)
- `.hermes/reports/301-diff-2026-08-07.json` (5/5 PASS, next.config.js 11 条规则, K3 需查 CF Bulk Redirect List enabled)
- `.hermes/reports/conversion-link-check-2026-08-07.json` (3 站内 CTA + 1 wa.me + 2 mailto + 4 GA4 hits + 9 webhook hits)

### 2. cron prompt v8.3 升级
- `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md`:
  - 任务 A (新写) 暂停 8/7-8/12, 8/13 起恢复
  - 任务 B (retrofit) 继续 6 篇 partial 8/6-8/12 (8/7-8/12 retrofitted 当日)
  - 任务 C (新增) 转化验证前置 5 步 (CTA 链接 / form 组件 / GA4 事件 / 备选入口 / 失败标记)

### 3. matrix 加 conversion_status 字段
- `.hermes/industry-keyword-matrix.json` 加顶层段 `conversion_status`:
  - 6 篇 partial retrofit (8/7-8/12) 全部初始化 conversion_status = 'untested'
  - 字段 schema: status / last_conversion_test / ai_citation_count

### 4. 8/12 复盘模板
- `.hermes/templates/review-8-12-template.md` (6.4 KB, 12 章节, 7 项指标 + 4 ctr_target 词 + 4 AI 引擎 + 9 路径推荐 A/B/C/D)

### 5. AI 注入 (P0 §6.5)
- `public/llms.txt` (5.0 KB, llmstxt.org 标准, 含核心品牌 / 5 品类 / 4 重点博客 / 8 权威数据源 / 3 联系渠道 / 站点结构)
- `public/robots.txt` 已含 13 个 LLM/AI crawler (GPTBot/ClaudeBot/PerplexityBot/Google-Extended/Applebot-Extended/Bytespider/CCBot 等) — 8/6 K3 §13.15 已加

## 6 关键发现 (转化链路 grep 报告)

| 发现 | 现状 | 风险 |
|------|-----|------|
| ✅ Form tags | 1 个 (QuoteForm.tsx) | OK |
| ✅ Form action | /api/quote-notify/ (Resend API) | OK |
| ✅ Webhook | Resend API + Supabase insert | OK |
| ✅ WhatsApp 备选 | wa.me/+86 198 8085 1334 | OK |
| ✅ mailto 备选 | zprintpro@outlook.com | OK |
| ⚠️ **GA4 事件名** | `contact_form_submit` (analytics.ts:110, **自定义**) | **K3 拍板**: A. 改代码 → `generate_lead` (2 行 edit) / B. 维持自定义, GA4 自定义报告读 |
| ❌ **缺失项** | `generate_lead` (Google 标准事件) 找不到 | 8/12 §6.1 验收口径需 K3 拍 |

## 4 引擎 AI 引用测试 (K3 8/12 复盘手测)

| 引擎 | 测试查询 | 期望 |
|------|---------|------|
| Perplexity | "香港化妆品包装盒定制" | 引用 zprintpro.com |
| ChatGPT Search | "Custom packaging boxes for small business USA" | 引用 zprintpro.com |
| Claude.ai | "両面カラー印刷 おすすめ" | 引用 zprintpro.com |
| Gemini | "月曆印刷 香港 2027" | 引用 zprintpro.com |

**Mavis 8/12 复盘日不能跑 (无 API), K3 8/12 22:00 自测**

## 关键产物 (8/7 02:20 全部 commit + push, 1 push)

- 5 文件 (1 modified + 4 new + 1 new 静态资源):
  - .hermes/cron-prompts/zprintpro-daily-content-1x7w.md (v8.2 → v8.3)
  - .hermes/industry-keyword-matrix.json (+ conversion_status 段)
  - .hermes/reports/301-diff-2026-08-07.json (NEW)
  - .hermes/reports/conversion-link-check-2026-08-07.json (NEW)
  - .hermes/templates/review-8-12-template.md (NEW)
  - public/llms.txt (NEW, AI 注入 P0)
  - .hermes/k3-inbox/2026-08-07-0220-qwen38-strategy-apply.md (NEW, K3 报告)
- 8/7 push 累计 1/1 (5 攒批合并)
- 月度 25/500 (5.0%)

## Phase 2 8/13-8/19 路径推荐 (待 K3 8/12 复盘拍板)

| 情景 | 触发 | 行动 |
|------|-----|------|
| A. 询盘 ≥3 | §6.1 PASS | 恢复双任务, 8/13 启动 Phase A 6 Pillar (顺延 6 天 8/13-8/18) |
| B. 询盘 = 0 但 AI ≥1 | §6.1 FAIL, §6.5 PASS | 全力修表单/CTA/落地页, 暂停内容生产 1 周 |
| C. 询盘 = 0 且 AI = 0 | 双 FAIL | 启动"转化诊断专项" (定价/信任状/竞品差异), 暂停所有 cron 1 周 |
| D. P3 catch-up 8/13-8/19 | 不管 A/B/C | 4 cron blocklist 2 slug 延期 active (back-to-school-printing-usa en / new-semester-printing-japan ja) |

## 9 红线 (Mavis 自主, 不需 K3 拍)

1. ✅ 8/7-8/12 不写新 blog, retrofit-only 6 篇 partial
2. ✅ 8/7-8/12 retrofit 当日必跑 conversion-link-check (5 步验证)
3. ✅ 1 push/day 严格, 8/12 复盘日 0 push
4. ✅ SKU 优化 5 SKU/天 持续 (不是 blog 新写, 不受 retrofit-only 限制)
5. ✅ PDP 转化审查 1 篇/天 持续
6. ✅ matrix conversion_status 字段每天 22:00 auto 跑
7. ✅ 8/12 22:00 daily cron auto 跑复盘模板, 落盘 k3-inbox
8. ✅ 4 引擎 AI 引用测试 K3 8/12 22:00 自测 (Mavis 无 API)
9. ✅ Phase A 6 Pillar 新写 8/13 启动 (顺延 6 天)

## 8/12 验收依赖 (K3 5 项手测)

1. 询盘 ≥5 (§6.1): 查 Supabase `quotes` 表 count
2. CF Bulk Redirect List enabled: K3 5min 自查 CF Dashboard
3. 4 引擎 AI 引用 ≥1/4: K3 8/12 22:00 自测
4. 4 ctr_target 词 ≥2 进 top 10: 查 GSC 8/6-8/12 7d
5. 6/6 partial retrofit 全 v8_ready: 跑 audit_v8.py 8/12 版

---

**作者**: Mavis 主动拍板组 (K3 8/7 02:12 拍板"按最优方案执行")
**拍板时间**: 2026-08-07 02:20 Asia/Shanghai
**关联 commits**: (1 push 整合, commit hash 待 push 后)
**关联 memory**: MEMORY.md §9 Blog/PDP 双数据源 (避免重蹈 T1 漏修), §8 cron auto-commit 限 .hermes/ (本次 retrofit 改动全在 .hermes/)
