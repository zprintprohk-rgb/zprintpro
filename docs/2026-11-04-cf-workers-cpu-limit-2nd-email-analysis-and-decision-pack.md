# CF Workers CPU 超限第二波（10-29 + 11-03 邮件）——复发分析与 K3 决策包

- **日期**: 2026-11-04（首席 SEO/AEO/GEO 数据战略分析师 · 第 1 轮续跑）
- **触发**: K3 转发 Cloudflare 自动通知邮件 ×2（2026-10-29、2026-11-03，各 "Times exceeded in the past 24 hours: at least 100+"，账户 Zprintprohk@gmail[.]com's Account），指令 = 结合今天/昨天执行报告与日志穷尽分析给方案
- **前置 SSoT**: `docs/2026-10-15-cf-workers-cpu-limit-root-cause-and-plan.md`（10-15 首报 ≥1,000 次/24h + A/B/C 方案，本文为其**复发对账与决策收口**，不推翻其架构结论）
- **状态**: 待 K3 拍板（K3 动作收敛为**一次 10 分钟 Dashboard 会话 × 3 件事**，见 §7）
- **结论有效期**: 架构与线上行为证据长期有效；CPU 精确计数仍待 Analytics 校准（§3 最后行）

**数据来源**:
- K3 转发 CF 邮件原文 ×2（2026-10-29 / 2026-11-03，账户级，"daily summary, sent once per day while the limit continues to be hit"）
- `docs/2026-10-15-cf-workers-cpu-limit-root-cause-and-plan.md`（10-15 SSoT：五级根因链 + A2 改动清单 + Build#3 回退记录）
- 线上回归探针 37 URL（`node scripts/probes/cf-pages-regression-probe.mjs`，2026-11-04 00:19-00:32 UTC 实测，产物 `.hermes/logs/2026-11-04-00-a2-probe.{json,md}`）
- CF API 只读实测（`.hermes/tmp/2026-11-04-cf-analytics-probe.mjs` → 复用 `.hermes/tmp/2026-10-15-cf-probe.mjs`，zones/pages/projects 200；Account Analytics 与 Zone Analytics **403 authz denied**，token scope 不足，凭据全程未回显）
- 执行报告与日志：`.hermes/logs/2026-11-03-ZP-k3-review.md`、`2026-11-03-ZP-gsc-feedback.md`、`2026-11-03-ZP-daily-content.md`、`2026-11-04-ZP-k3-review.md`（今日 07:15）、`periodic-review-weekly-2026-11-03.md`、`2026-11-03-three-day-execution-evaluation-and-automation-upgrade.md`、`lane-status.json`（06:43 快照，bus_records=93）、`lane-runs.jsonl`
- GSC 面：`gsc-cliff-2026-11-01.json` / `gsc-cliff-2026-11-03.json`（官方恢复系数 123.7%）、`k3-kpi-panel-2026-10-30.md`、11-03 xlsx 四档（24h 977 imp / 23 clk，full-country 口径）
- 代码与配置：`src/middleware.ts`（14KB，含 10-15 A2 治理注释）、`next.config.js`（images.unoptimized: true @ L660-661）、`package.json`（`build:cf` = @cloudflare/next-on-pages@1.13.16）
- **校准状态**: 账户/项目结构、线上行为、执行层状态 = **已校准**（双方法，见 §4）；CPU 超限精确次数/按路由分布 = **待校准**（CF Dashboard → Workers & Pages → zprintpro → Metrics → Errors → "Exceeded CPU Time Limits"，或补 Account Analytics 只读 scope 后探针自动日拉）

---

## TL;DR（5 条）

1. **两封邮件 = 10-15 已确诊问题的复发确认，不是新病**。同一账户、同一根因（Pages Functions 全量 edge SSR 撞免费层 10ms CPU）。量级 **≥1,000（10-15）→ ≥100（10-29 / 11-03）**：A2 治理（静态资产/扫描噪声旁路 + A/B Set-Cookie 摘除）把 Function 调用砍掉约一个数量级——**治理确实有效，但只完成半程**。
2. **半程未完的三件遗留**（全部有 11-04 实测证据）：① 686 页仍 `runtime="edge"` 每请求全量 SSR（10-15 Build#3 因 next-on-pages 架构性堵死 SSG 而回退）；② **HTML 边缘缓存从未启用**（`cf-cache-status: DYNAMIC` ×2 实测，A2-5 Cache Rules 是 K3 Dashboard 动作，一直没做）；③ A1 Workers Paid（$5/月）当时标"已排期"，至今未见升级回执（per §0.24，回执 = 完成证据）。
3. **新发现 P0（本轮首次实锤）**: WAF 按 UA 拦截非浏览器请求——`/zh-hk/product/food-boxes/` 用 **GPTBot UA = 403**、浏览器 UA = 200（10-20 已实锤 curl-UA 403，当时要求 K3"今日"加 `and not (cf.client.bot)` 豁免，至今未落）。**robots.txt 明文邀请 GPTBot/ClaudeBot/PerplexityBot（§0.36 AEO/GEO 战略），边缘层却把它们 403 拒之门外**——AI 引擎引用管线在自己前门断掉，这比 CPU 超限对 GEO 目标的直接伤害更大。
4. **GSC 数据面暂未见伤害**：官方恢复系数 123.7%（11-03 detector，24h 977 imp/23 clk）、cliff_ratio 0.91 无新悬崖；但 GSC 数据滞后 2-3 天（最新数据日 11-02）且 1102 是间歇性失败——**"还没痛"≠"不会痛"**，Googlebot/AI 爬虫每天仍有 ≥100 次抓到半截被杀。
5. **决策收口（推荐方案 A）**: K3 一次 10 分钟 Dashboard 会话做 3 件事——①升级 Workers Paid $5/月（1102 → 0，同时消除 aitoptools 共享池的 Error 1027 全站下线尾部风险）②HTML Cache Rules（边缘缓存 HTML，SSR 调用量坍缩 + TTFB 秒级→百 ms 级）③WAF 规则加 `and not (cf.client.bot)`。$5/月 ≈ HK$39 ≈ 一张包装盒订单（客单 HK$125K-200K，§11.2）的 **0.02%-0.03%**。执行层免费加固项（§8）无论是否付费都排入后续攒批。

---

## 1. 两封邮件解读与时间线

| 时间 | 事件 | 量级 | 解读 |
|---|---|---|---|
| 2026-10-15 | K3 转发首封 CF 邮件 | **≥1,000 次/24h** | 首报；同日完成根因分析 + A2 第一批治理（见 10-15 SSoT §9） |
| 2026-10-15 之后 | A2 治理上线（`_routes.json` 21 条资产/噪声旁路、`public/_headers`、middleware A/B 摘除、32 页 dynamicParams=false） | — | 治理**部分生效**：Build#3 被迫回退 `runtime="edge"`（next-on-pages 对 Node fallback 函数硬拒绝 → SSG 架构性堵死），HTML 仍每请求全量 SSR |
| **2026-10-29** | K3 收到第二封 CF 邮件 | **≥100 次/24h** | 量级降一个数量级 = A2 资产旁路生效的旁证；但 HTML SSR 面仍在持续击杀 |
| 2026-11-01~11-02 | （未收到邮件？待 K3 确认收件箱） | 未知 | 邮件为 daily summary，"只要还在触发就每天一封"；仅凭两封不能断定 10-30~11-02 是否触发，**不推断**（§0.23） |
| **2026-11-03** | K3 收到第三封 CF 邮件 | **≥100 次/24h** | 确认**至少 10-29 与 11-02~11-03 两个 24h 窗口仍在持续超限**，慢性问题而非单日尖峰 |

**邮件关键句翻译**：免费层每请求 CPU 上限 10ms，超限 → CF **中途终止**该请求（Error 1102, outcome `exceededCpu`）→ 用户/爬虫看到报错页、断头页或失败调用。升级 Workers Paid = 每请求 30 秒 CPU（可配至 5 分钟）+ 10M 请求/月。

**结构事实（11-04 CF API 复核 200）**：账户独立 Worker = **0 个**（`workers/scripts=[]`）；Pages 项目 = `zprintpro`（zprintpro.com）+ `aitoptools`（aitoptools.net）**共享同一免费池**（100k 请求/天账户级 + 每请求 10ms CPU）。邮件里的 "Your Workers" = 两个 Pages 项目的 Functions。

---

## 2. 今天/昨天执行报告与日志对账——业务健康，监控盲区

### 2.1 车道层 verdict（四方判据，lane-status.json 06:43 快照 + 车道报告实读）

| 车道 | 11-03 | 11-04 | 备注 |
|---|---|---|---|
| ZP-k3-review | OK（07:16, head d0ba9b7a） | **OK**（07:15, 今日复盘 + 次日指令齐备） | 今日结论：API 面 FRESH（数据日 11-02）/ xlsx 面 STALE；monthly 调度 `2147946720` 未修 = 唯一业务 P0 |
| ZP-gsc-feedback | OK（20:25, head 7fba4c30） | 未到点（20:13） | 11-02 QUOTA 失败轮已由同日 06:1x 恢复轮闭合（ALREADY_DONE，零重跑） |
| ZP-daily-content | OK（21:21, head fb2aff8a = NO_OP；18:17 harness 批 8 src c0552853 已上线） | 未到点（21:17） | — |
| ZP-monthly-matrix | **MISSING 第 3 天** | **MISSING 第 4 天** | `LastTaskResult=2147946720`（0x800710E0），需 K3 管理员处理——与本文 CF 项可同一次 Dashboard/管理员会话一并处理 |
| ZP-weekly-meta / blog-deepfix | OK | 非调度日 | Next 11-06 / 11-07 |

### 2.2 盲区结论（本轮分析的核心增量之一）

**两天的全部执行报告与日志中，"CPU/1102/Cloudflare 超限"关键词 0 命中**（rg 全文检索实证）。原因：探针脚本 10-15 就绪，但 `.env` token 缺 Account/Zone Analytics 只读 scope（11-04 复测仍 403 authz denied），CF 侧错误数据进不了任何车道、watchdog 或 KPI 面板——**基础设施在持续故障，执行层指标体系完全看不见**。GSC 面"无新悬崖"与 CF 面"每天 ≥100 次击杀"并存，恰恰说明现有四方对账（调度器/总线/wrapper 日志/当日报告）缺**第五方（CF 平台健康）**。

> 教训固化方向：补 scope 后启用 `scripts/probes/cf-cpu-guard.mjs` 日拉（10-15 SSoT §6 已设计），先以"口径外记录"接入（per §0.35.3.6 不冒充车道报告、不新建定时任务——**建 cron 需 K3 明确拍板**，本文不代建）。

---

## 3. 根因链复核（引用 10-15 SSoT 五级链）× 11-04 复测证据

| # | 根因级（10-15 结论） | 11-04 复测证据 | 状态 |
|---|---|---|---|
| 1 | "Workers" = Pages Functions（zprintpro + aitoptools 共享免费池） | CF API：`workers/scripts=[]`、pages/projects 两项目 + 域名 200 实测 | ✅ 维持 |
| 2 | `_routes.json` include `/*` → 全站进 Function | **资产旁路已生效**：/images/、robots.txt、sitemap*.xml、manifest 全部无 `x-matched-path`（探针 5/5 PASS） | ✅ 已治（1000+→100+ 的主要解释） |
| 3 | 686 页 `runtime="edge"` 每请求全量 SSR，10ms 天然不够（官方：SSR 典型 10-20ms） | 探针首个请求 `/zh-hk/` TTFB **2.73s**（冷启动形态），其余页 0.22-0.53s；Build#3 回退记录在案 | ❌ **未治（复发主因）** |
| 4 | A/B Set-Cookie 废掉边缘缓存 | 探针断言 `set-cookie` 无 `zp_ab_bucket` 全 PASS（A2-3 生效）；**但** `cf-cache-status: DYNAMIC`（×2 重复请求一致）= **A2-5 Cache Rules 从未启用**，HTML 仍 100% 动态进 Function | ❌ **未治** |
| 5 | 爬虫/AI 引擎/扫描噪声放大 | 扫描噪声已治（/wp-login.php、/.env、/wp-admin/、未知 slug → 404 快速返回，4/4 PASS）；**新发现**：GPTBot UA 被 WAF 403（§6） | 部分 ✅ + 新 P0 |

**复发机制一句话**：图片/静态/噪声的 Function 调用已被旁路砍掉（量级 ↓10x），但**每个 HTML 请求（含 Googlebot / GPTBot 每次抓取、用户每次访问）仍是全额 SSR**，冷启动 isolate 的模块求值 + 大页面渲染周期性突破 10ms → 每天 ≥100 次 1102。这在免费层是**结构性必然**（官方文档：SSR 类负载典型 10-20ms），与 10-15 结论完全一致。

**次要去 CPU 优化点（非故障）**：`/api/search` 被 `trailingSlash: true` 规范化 308 一跳（`/api/search?q=...` → `/api/search/?q=...`），每次搜索多一次调用；`sitemap-image.xml` 仍是 `.func`（force-static + 3600s 但仍占调用）。

---

## 4. 双方法复算（per §0.23.2，凡"N 个 vs M 个"结论必过）

| 结论 | 方法 1 | 方法 2 | 一致性 |
|---|---|---|---|
| 复发真实（10-29 / 11-03 仍 ≥100 次/24h） | K3 转发邮件原文 ×2 | 线上机制证据链（HTML 全 SSR + cache DYNAMIC + 冷启动 2.73s + 10-15 Build#3 回退） | ✅ 一致 |
| "邮件 = Pages Functions 而非独立 Worker" | CF API `workers/scripts = []`（11-04 复核） | `pages/projects = [zprintpro, aitoptools]` + 邮件账户名一致 | ✅ 一致 |
| A2 资产旁路确实生效（解释 1000+→100+） | 探针：图片/robots/sitemap/manifest 无 `x-matched-path` + 噪声 404 ×4 | `_routes.json`（项目根，10-15 新增 21 条 exclude）+ `public/_headers` 在仓 | ✅ 一致 |
| HTML 未启用边缘缓存 | `cf-cache-status: DYNAMIC` ×2（间隔 2s 同 URL） | A2-5 在 10-15 报告中标注"可选，K3 dashboard"，仓内无启用记录 | ✅ 一致 |
| 执行层对 CF 故障零感知 | 两日全部车道报告 rg "CPU/1102/Cloudflare" = 0 命中 | CF Analytics API 403 authz denied（token 无 scope，11-04 实测） | ✅ 一致（盲区实锤） |
| CPU 超限精确次数/按 URL 分布 | 邮件（≥100/24h，账户级） | CF Analytics → **403**（同 10-15） | ⚠️ 待校准（不阻塞方案；校准路径见文首数据来源块） |

---

## 5. SEO/AEO/GEO 影响量化（口径纪律：数字全部标源，模糊值禁入）

| 维度 | 现值（含口径） | 风险判读 |
|---|---|---|
| 被中断请求量 | **≥100 次/24h**（CF 邮件，账户级，含 aitoptools）| 每月 ≥3,000 次请求被中途终止；按 URL/爬虫分布待校准 |
| GSC 流量面 | 24h 977 imp / 23 clk（11-03 xlsx，full-country）；恢复系数 123.7%（官方最后值）；cliff_ratio 0.91 | **尚无可见悬崖**——1102 为间歇性失败 + GSC 滞后 2-3 天，不能据此松懈 |
| Googlebot 路径 | 400+ 页全量 HTML 每次抓取都进 Function | 撞 1102 = 抓取预算浪费 + 覆盖波动；T1 带钱词页（喜帖/貼紙/包裝盒簇）正在爬坡期（11-04 复盘：貼紙 HOLD、包裝盒簇两窗微退）经不起抓取层抖动 |
| **AEO/GEO 路径（新 P0，§6）** | GPTBot UA 访问 PDP = **403**（11-04 实测） | robots 明文邀请（§0.28.3/§0.36）但边缘 403 拦截 → AI 引擎**抓不到钱页** → 引用管线断裂；GEO S1 正爬坡（11-03 报告：ZP=source #2/9） |
| 转化路径 | 用户偶发 1102 报错页 | 名片解禁后周订单 400+ USD（§0.0）、包装盒客单 HK$125K-200K（§11.2）——报错页 = 直接丢单面 |
| 尾部风险 | 免费池 100k 请求/天**账户级**（zprintpro + aitoptools 共享） | 爬虫风暴单日触顶 → Error 1027 **全站下线页**；升级 Paid 后此风险消除 |

**量化声明**：以上"≥100/24h"为邮件口径（"at least"，实际可能更高）；本报告不编造任何按 URL/按爬虫的分布数字（待 Analytics 校准后由 cf-cpu-guard 补齐）。

---

## 6. 🔴 新发现 P0：WAF 拦截 AI 爬虫（与 AEO/GEO 战略直接冲突）

**11-04 实测（同 URL 同刻三 UA 差分）**：

| UA | `/zh-hk/product/food-boxes/` 结果 |
|---|---|
| `curl/8.0` | **403** |
| Chrome 浏览器 UA | 200（正常页） |
| `GPTBot/1.0 (+https://openai.com/gptbot)` | **403** |

- 该防护 10-20 已实锤（`docs/2026-10-20-execution-log-skufaq-and-cf-block.md` §二：curl-UA 单发即 403，判读为 UA 主动拦截规则），当时已列入 K3 待办 #2（死线"今日"）——**至今未落**。
- 冲突：`robots.txt` 按 §0.28.3 明文放行 GPTBot / ClaudeBot / PerplexityBot（AEO/GEO 战略基础设施），WAF 层却在 PDP 路径 403 拒之门外——**SEO 层邀请、边缘层拒客**，AI Overviews / Perplexity 引用目标（§0.36）在数据获取第一步就失败。
- 修法（K3 Dashboard → Security → WAF → 自定义规则，2 分钟）：该规则表达式追加 `and not (cf.client.bot)`（或对 verified bots 设 Skip）。
- 验收：`curl -A "GPTBot/1.0 (+https://openai.com/gptbot)" https://zprintpro.com/zh-hk/product/food-boxes/` → 200。
- 附带收益：Bingbot 等其他 verified bot 同步放行（不作无证据外推，验收以实测为准）；我方监控/探针脚本（非浏览器 UA）也不再被假 403 污染读数。

---

## 7. 方案 A / B / C 与 K3 动作清单

| 方案 | 内容 | 成本 | 效果 | 判定 |
|---|---|---|---|---|
| **A（推荐）** | **A1 升级 Workers Paid + A2-5 HTML Cache Rules + WAF bot 豁免**——K3 一次 10 分钟 Dashboard 会话三件事 | $5/月 | 1102 → 0（CPU 上限 10ms→30s）；1027 全站下线风险消除；HTML 边缘命中后 SSR 调用量坍缩、TTFB 秒级→百 ms；AI 爬虫恢复可达 | ✅ **唯一"当天止血"路径** |
| B（纯免费加固） | §8 执行层清单 + 中期 @opennextjs/cloudflare 迁移（真 SSG） | $0 + 执行层工程 | 缓解不根治：next-on-pages 下 SSG 被架构性堵死（10-15 实锤），SSR 面仍在；opennext 迁移 = 2-4 周工程 + 部署链更换风险 | ✅ 作为 A 的并行工程排入攒批 |
| C（换平台） | Vercel Pro / Netlify | $20/月+ | 同 A1 效果 | ❌ 维持 10-15 否决（域名/301/内链/SEO 资产已固化 CF，churn 红线 §11.8，$15/月差价不值得迁移风险） |

**推荐逻辑（一句话给 K3）**：$5/月 ≈ HK$39 ≈ 0.02%-0.03% 张包装盒订单，换来的是"错误页不再随机杀单 + AI 引擎重新读得到你的钱页 + 1027 全站下线尾部风险清零"；B 方案无论付不付费都值得做，但它**替代不了** A——免费层 10ms 对全站 SSR 是物理不够，10-15 到今天的三封邮件已经把这件事验证了三轮。

### K3 动作清单（一次 Dashboard 会话，约 10 分钟，按序）

1. **升级 Workers Paid**：Workers & Pages → Plans → Workers Paid（$5/月，账户级，自动覆盖 zprintpro + aitoptools 两个 Pages 项目的 Functions）。per §0.24：**升级回执邮件 = 完成证据**，此前状态记"已排期"。
2. **HTML Cache Rules**：Caching → Cache Rules → 新建 2 条：① hostname `zprintpro.com` + 路径匹配 HTML（排除 `/api/*`、`/quote-desk/*`、带 query 的 `/search`）→ Edge TTL 1h + 浏览器 TTL 短；②（可选）stale-while-revalidate。上线后 purge 一次缓存（Caching → Purge Everything），让 verify-deploy 探针重新预热。
3. **WAF bot 豁免**：Security → WAF → 自定义规则（非浏览器 UA 拦截那条）→ 表达式追加 `and not (cf.client.bot)` → 保存。
4. （可选，2 分钟）**监控补权**：发一个带 **Account Analytics:read + Zone Analytics:read** 的只读 token 存入 `.env`（如 `CLOUDFLARE_ANALYTICS_TOKEN`）→ 探针（`.hermes/tmp/2026-10-15-cf-probe.mjs` 已就绪）即可自动拉每日 invocations/errors/cpuTimeP99，把"第五方"接进对账；或直接截图 Workers & Pages → zprintpro → **Metrics → Errors（Exceeded CPU Time Limits 近 30 天曲线）** 给执行层归档。

---

## 8. 执行层自主清单（不需要 K3，按攒批纪律排队，本报告不代执行）

| # | 项 | 说明 | 排期建议 |
|---|---|---|---|
| B1 | 探针期望值修正 | `scripts/probes/cf-pages-regression-probe.mjs` 15 个 FAIL 中 14 个是**期望值过时**（301→308、绝对→相对 location，重定向层已迁 CF 边缘规则/Next 308 规范——**非回归**）；修正后恢复探针可信度。**实改时先看锁**（§0.35.7 双条件） | 下一个 src/scripts 攒批窗口 |
| B2 | `sitemap-image.xml` 构建期静态化 | 从 `.func` 改为构建产物 + `_headers` 缓存头，省一类 Function 调用 | 同上 |
| B3 | `/api/search` 一跳优化 | trailingSlash 308 规范化让每次搜索多一次调用；前端改请求 `/api/search/`（带斜杠）即省一跳 | 同上（低优先） |
| B4 | **@opennextjs/cloudflare 迁移立项** | next-on-pages 已被官方 deprecate（10-15 实查）；opennext 支持真 SSG + `run_worker_first=false`，是**唯一免费根治路径**（Function 调用趋零 + TTFB 亚秒）。工程量 2-4 周，涉及部署链更换 → **需 K3 立项拍板**，不自主开工 | 待 K3 拍板后单独立项 |
| B5 | `cf-cpu-guard` 日拉遥测 | 依赖 K3 补 Analytics scope（§7.4）；激活后先以口径外记录接入（§0.35.3.6），**不新建定时任务**（建 cron 需 K3 明确拍板） | token 到位即启用 |

---

## 9. 合规声明

- 本报告为 **docs-only** 产物：零 `src/` 改动、不触发 push（per 10-15 SSoT 同款声明；今日车道日报 21:17 未到点，避免与 lane 并发写盘）。
- 未创建任何定时任务/监控 cron（建任务需 K3 明确拍板，仅给方案）。
- 未触碰名片展示层/SEO 层（§0.0 解禁块：未拍板前不得动贺卡资产与 middleware 301 映射——本报告对 301/重定向层**只读不改**）。
- CF API 探针全程只读 GET/GraphQL；凭据未回显、未落盘（wrapper 只输出 token 是否存在布尔值）。
- 数字纪律：所有数字带口径与来源；无拍板来源的估算值 0 个；"≥100"为邮件下界表述，未放大。

---

## 10. 一句话结论

**这不是新事故，是 10-15 已确诊疾病的第二波发作邮件——治理半程有效（1000+→100+），但"HTML 全 SSR + 零边缘缓存 + 免费层 10ms"的结构性矛盾只有 $5/月 Workers Paid + 2 条 Cache Rules 能当天终结；顺带修掉 WAF 拦 GPTBot 这个自己锁死 AEO 前门的 P0，再把 Analytics 权限补上让执行层从此看得见 CF 平台健康。**
