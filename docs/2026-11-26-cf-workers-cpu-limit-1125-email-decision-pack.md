# CF Workers CPU 超限第 4 波（11-25 邮件）——复核与行动包（2026-11-26）

- **日期**: 2026-11-26（执行层会话，K3 提问触发：「是从图片中的升级付费5美元吗？穷尽分析后解决昨天收到的邮件问题」）
- **触发**: K3 转发 Cloudflare 自动通知邮件（2026-11-25，"Times exceeded in the past 24 hours: at least 100+"）+ Workers 计划页截图（免费 US$0 vs 付费 US$5/月+用量）
- **前置 SSoT 链**: `docs/2026-10-15-cf-workers-cpu-limit-root-cause-and-plan.md`（首封 ≥1,000/24h + 五级根因链）→ `docs/2026-11-04-cf-workers-cpu-limit-2nd-email-analysis-and-decision-pack.md`（10-29/11-03 两封 + 方案 A/B/C）→ `docs/2026-11-04-scraper-war-r1-cpu-causality-dmca-package.md`（因果终判）→ **本文（第 4 波复发对账 + 行动收口，不推翻前序架构结论）**
- **状态**: 待 K3 付款动作（升级回执前状态 = **已排期**, per §0.24 笼统批准 ≠ 动作完成）
- **结论有效期**: 行为证据长期有效；CPU 按路由精确分布仍待 Analytics scope 校准（§5 动作 4）

**数据来源**:
- K3 转发 CF 邮件原文（2026-11-25，账户级 ≥100+/24h，daily summary 机制）
- K3 提供截图（Workers 计划页：免费 100,000 请求/天 + 10ms CPU；付费 US$5/月+用量，含 10M 请求、每请求最多 5 分钟 CPU、$0.30/百万请求、$0.02/百万 CPU ms）
- CF API 只读探针（2026-11-26 00:07 HKT，复用 `.hermes/tmp/2026-11-04-cf-analytics-probe.mjs`）：zones/pages/projects/workers scripts 200；GraphQL Analytics **403 authz denied**（CF_A 与 CF_B 双 token 一致）；CF_C invalid（token 已 Roll，正常）；凭据全程未回显
- 线上行为探针（curl，2026-11-26 00:07 HKT）：见 §3
- 官方定价页（2026-11 检索）：developers.cloudflare.com/workers/platform/pricing
- **校准状态**: 账户结构 / 防线行为 / 缓存状态 = **已校准**（双方法，§3）；CPU 按路由分布 = **待校准**（Analytics scope 缺，§5 动作 4）；费用为**上限推算口径**（§4，两项高估假设已标注）

---

## §1 对 K3 提问的直接回答

**是。** 解决这封邮件的开关就是截图里 Workers 计划页付费列那个蓝色「升级」按钮——**Workers 付费计划 US$5/月 + 用量**，账户级生效，自动覆盖 zprintpro + aitoptools 两个 Pages 项目的 Functions（本站无独立 Worker，CF API 实测 `workers/scripts=[]`，邮件里的 "Your Workers" = 两个 Pages 项目的 Functions）。

**付费档 vs 免费档（截图 + 官方定价页双源一致）**：

| 项 | 免费（现状） | 付费 US$5/月+用量 |
|---|---|---|
| 请求数 | 100,000/天（账户级，两项目共享） | 10,000,000/月含量，超出 $0.30/百万 |
| CPU 上限 | **10 ms/请求**（超限 → 中途终止 → Error 1102 报错页/断头页） | **默认 30 秒/请求**（可配至 5 分钟，截图口径） |
| CPU 用量 | 不计费（但撞限即杀） | 30M CPU ms/月含量，超出 $0.02/百万 CPU ms |
| 附带 | 社区支持 | Workers Logs、Email Service、Containers 等；Pages 构建配额是否随升提升（500→5,000/月）**以 Dashboard 实际显示为准**（待核，不作为决策依据） |

**为什么这是唯一"当天止血"路径**：免费层每请求 10ms CPU，对 686 页全量 edge SSR（官方口径：SSR 典型 10-20ms）是**物理不够**；10-15 → 10-29 → 11-03 → 11-25 四封邮件 = 同一结构性矛盾的连续复发验证。升级后 CPU 上限 10ms→30s，1102 立即归零；免费池 100k 请求/天账户级共享的 Error 1027 全站下线尾部风险一并消除（11-04 包 §5）。

---

## §2 时间线（第 4 波邮件的定位）

| 日期 | 量级（CF 邮件口径, at least） | 事件 |
|---|---|---|
| 2026-10-15 | ≥1,000/24h | 首封；同日 A2 治理上线（静态资产/噪声旁路 + A/B Set-Cookie 摘除） |
| 2026-10-29 | ≥100/24h | 第 2 封；量级 ↓10x = A2 生效旁证，HTML 全 SSR 面仍在 |
| 2026-11-03 | ≥100/24h | 第 3 封；11-04 决策包开出方案 A 三件事（K3 待办） |
| **2026-11-25** | **≥100+/24h** | **第 4 封（本次）**；11-04 三件事经 11-26 探针确认仍未落地（§3） |

邮件机制自述："This is a daily summary, sent once per day while the limit continues to be hit"——**只要不升级，这封邮件会每天继续来**。10-15 至今已持续 6 周，方案 A 在 11-04 就已开出处方，属**已确诊未用药**。

---

## §3 11-26 00:07 HKT 线上复测（三防线 + 缓存 + 遥测五探针）

| # | 探针 | 结果 | 判定 |
|---|---|---|---|
| 1 | `/zh-hk/` 浏览器 UA ×2 | 200 + **cf-cache-status: DYNAMIC ×2** | ❌ HTML Cache Rules 仍未启用（11-04 动作②未落地） |
| 2 | GPTBot UA → PDP | **403** | ❌ verified-bot 豁免未落（11-04 动作③）；且 AI Bots Protection=block 姿态维持中（R1 §5，复原触发器 = DMCA 落定或 K3 一句话，**本包不代拍**） |
| 3 | curl UA → PDP | **403** | ✅ WAF scraper UA 拦截在位（敌意爬虫仍在边缘被拦，零 CPU 消耗） |
| 4 | CF API 账户结构 | Pages = zprintpro + aitoptools；workers/scripts=[] | ✅ 维持 11-04 结论（邮件 = 两项目 Functions） |
| 5 | GraphQL Analytics | workersInvocationsAdaptive **403 authz denied**（双 token 一致） | ❌ 第五方遥测仍盲（执行层依旧看不见 CF 错误面，11-04 §2.2 盲区未修） |

### 双方法复算（per §0.23.2）

| 结论 | 方法 1 | 方法 2 | 一致性 |
|---|---|---|---|
| 第 4 波复发真实 | K3 邮件（11-25, ≥100+/24h） | 行为证据链（HTML 全 SSR + cache DYNAMIC ×2 + 冷启动 2.73s 实测在档） | ✅ 一致 |
| 11-04 三件事未落地 | 探针（DYNAMIC / GPTBot 403 / Analytics 403） | 11-04 包待办无任何升级回执（§0.24 口径） | ✅ 一致 |
| 敌意爬虫份额已被拦 | curl UA 403 实测 | 三防线 10-16 上线（7f1a283e）+ R1 复测 | ✅ 一致 |
| CPU 按路由精确分布 | 邮件（账户级 ≥100/24h） | CF Analytics → 403（双 token） | ⚠️ 待校准（不阻塞行动） |

**复发机制一句话（维持 11-04 口径）**：每个 HTML 请求（含 Googlebot/GPTBot 每次抓取、真人每次访问）仍全额 SSR，冷启动 isolate 模块求值 + 大页面渲染周期性突破 10ms → 每天 ≥100 次 1102。这是免费层的**结构性必然**，A2 治理只能砍量级，砍不掉物理上限。

---

## §4 费用测算（上限推算口径，两项假设均明显高估）

| 项 | 推算 | 依据 |
|---|---|---|
| 请求量 | 100k/天 × 30 天 = 3M/月 | 假设①：打满免费池 100k/天（实际远低——账户无 1027 全站下线记录，GSC 口径日点击 23 次） |
| 请求费 | 3M < 含量 10M → **$0** | 官方含量 |
| CPU 量 | 3M × 50ms = 150M CPU ms/月 | 假设②：每 Function 请求 50ms（实际典型 10-30ms） |
| CPU 费 | 超出 (150-30)M × $0.02/M = **$2.40** | 官方超额单价 |
| **绝对上限** | **≈ $7.40/月** | 两假设同时取顶 |
| **现实口径** | **≈ $5/月上下** | 次月账单校准本表（升级后核对） |

参照系：$5/月 ≈ HK$39 ≈ 一张包装盒订单（客单 HK$125K-200K，§11.2）的 0.02%-0.03%。

---

## §5 K3 动作清单（一次 Dashboard 会话，约 12-15 分钟，按序）

1. **升级 Workers Paid（= 截图蓝按钮）**：左栏 Workers 计划 → 付费 US$5/月「升级」→ 绑卡确认。账户级，覆盖 zprintpro + aitoptools。**完成证据 = 升级回执/扣费邮件**（per §0.24）；下游证据 = CPU 邮件停发。
2. **HTML Cache Rules**：Caching → Cache Rules → 新建（保守起步一条）：
   - 匹配：hostname eq `zprintpro.com` AND URI Path 不以 `/api/` 开头 AND 不含 `/quote-desk/`
   - 动作：Eligible for cache + **Edge TTL 1 小时**（忽略 origin cache-control）+ Browser TTL 短
   - 上线后 Purge Everything 一次（让探针重新预热）
   - **验收（若 HIT 不达成不阻塞主闸）**：同 URL 连续 2 次请求 → 第 2 次 `cf-cache-status: HIT` = 缓存生效；若仍 DYNAMIC = Cache Rules 对该 Functions 响应形态不生效，如实记录回报（付费档已止血，缓存归入 §0.23.2 待校准项，不影响正确性）
3. **WAF verified-bot 豁免**：Security → WAF → 自定义规则（scraper UA 拦截那条）→ 表达式追加 `and not cf.client.bot` → Save。**分层说明**：GPTBot/ClaudeBot 403 的主因是 AI Bots Protection=block（K3 10-16 姿态，R1 §5 已记录 AEO 权衡与复原触发器）——AI 姿态复原等 K3 触发器，动作 3 只保证 verified bot 不被 UA 规则误伤。
4. **顺手两分钟件**：① 限速规则 `810c7bc2...` 版本在位复核（R1 §2 存疑项）；② （可选）创建只读 Analytics token（**Account Analytics: Read + Zone Analytics: Read**）→ 存 `.env` `CLOUDFLARE_ANALYTICS_TOKEN` → 探针日拉接通第五方遥测（cf-cpu-guard 按 11-04 §8-B5 启用，不新建定时任务）。

---

## §6 升级后 72 小时验证协议

| 时点 | 检查 | PASS 判据 |
|---|---|---|
| T+1 天 | CPU 超限邮件是否停发 | 不再收到 = 1102 归零（daily summary 机制反向利用） |
| T+2 天 | Dashboard → Workers & Pages → zprintpro → Metrics → Errors | "Exceeded CPU Time Limits" 曲线归零；invocations 曲线正常 |
| Cache Rules 上线后 | probe：同 URL ×2 `cf-cache-status` | 第 2 次 HIT；TTFB 秒级→百 ms 级 |
| 次月 | CF 账单 | 用量费核对，校准 §4 推算表 |

---

## §7 方案裁决（维持前序，不重新开庭）

| 方案 | 内容 | 判定 |
|---|---|---|
| **A（推荐，与前两轮一致）** | 升级 Workers Paid（止血主闸）+ HTML Cache Rules（降耗增效闸）+ WAF bot 豁免 | ✅ 唯一当天止血路径；三轮邮件已验证 |
| B 纯代码路线 | next-on-pages SSG 被架构性堵死（10-15 Build#3 回退实锤）；@opennextjs/cloudflare 迁移 = 2-4 周工程 + 部署链更换风险 | ⚠️ 不能替代 A；作为后续工程另立项（11-04 §8-B4） |
| C 换平台（Vercel/Netlify） | $20/月+ | ❌ 维持否决（域名/301/内链固化 CF，churn 红线 §11.8） |

**推荐逻辑一句话**：$5/月换的是「报错页不再随机杀单 + 爬虫/AI 引擎不再抓到半截 + 1027 全站下线尾部风险清零」；B 方案值得做但替代不了 A——免费层 10ms 对全站 SSR 是物理不够，四封邮件已验证四轮。

---

## §8 与飞轮两周窗口（11-19..12-02）的关系

抓取层稳定性是本轮所有 SEO/AEO/GEO 投资的地基：≥100 次/日的 1102 意味着 Googlebot/GPTBot 每天有百余次抓到半截被杀（抓取预算浪费 + 覆盖波动），T1 带钱词页正在爬坡期经不起抓取层抖动（11-04 §5 口径维持）。升级属 K3 付款件，不占 §0.25 攒批队列；执行层零 src 改动。

---

## §9 执行层待办（全部引用既有清单，本包不新增项）

- 11-04 包 §8-B1~B5（探针期望值修正 / sitemap-image 静态化 / /api/search 一跳 / opennext 立项待拍板 / cf-cpu-guard 日拉待 token）**原样有效**。
- 本包新增产物仅：本文档 + AGENTS.md §0.38 状态行更新 + `.hermes/logs/` 探针证据（本节）。

---

## §10 合规声明

- 本报告 **docs-only**：零 `src/` 改动、不单独 push（随下一批攒批顺带，省 build quota）。
- 未创建任何定时任务/监控 cron（建任务需 K3 明确拍板）。
- CF API 全程只读 GET/GraphQL；凭据未回显、未落盘（探针仅输出存在性布尔值）；CF_C invalid = token 已按 10-16 要求 Roll 的正常结果。
- 名片展示层/SEO 层零触碰（§0.0 解禁块）；301/重定向层只读不改。
- 数字纪律：所有数字带口径与来源；费用为上限推算且两项高估假设显式标注；"≥100"为邮件下界表述未放大。
