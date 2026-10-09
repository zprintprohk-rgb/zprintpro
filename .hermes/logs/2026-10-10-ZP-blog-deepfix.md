# ZP-blog-deepfix — 2026-10-10（第二档 00:43 · 幂等命中轮 / IDEMPOTENT_SKIP · 当次全量执行, 无简化无延后）

VERDICT: OK
STATE: skipped（IDEMPOTENT_SKIP — 同轮 `this_run_key 37eaab37ee14ebaf` 已由 2026-10-10 00:17 档同键交付, 契约 §二.2 + §二.4 `pending→skipped`）
CONSUMED: run-context-ZP-blog-deepfix.json @ 2026-10-10 00:43:03（preflight=ok / lock acquired pid 21548 / this_run_key `37eaab37ee14ebaf` / retry_queue=[] / sibling_lanes=[] / prev bus verdict=OK @ 00:17:10） | lane-status.json @ 2026-10-09T15:48:45.210Z（verdict=ATTENTION / problems=10 / bus_records=15） | lane-results-bus-contract.md（v1 2026-09-19） | .hermes/cron-prompts/zprintpro-blog-deepfix.md（含 K3-BRAIN-INJECT-2026-10-09 第 -2 优先级） | .hermes/cron-prompts/sop-10-gate.md | .hermes/logs/lane-runs.jsonl（24 条, 本轮读回全量） | .git/logs/HEAD（598 行, HEAD=38c009fe） | GSC数据/index.json（FRESH）
DELIVERED: .hermes/logs/2026-10-10-ZP-blog-deepfix.md（本报告 — 覆盖写；**本档零 src 改动**，见下「幂等判定」）
NEXT: ① host 侧裁/修两项 MOQ 漂移（本报告 §4 envelopes 四源矛盾 + §5 greeting-cards 4/6 SKU 漂移）② host 跑 §8 可粘贴命令（含线上 FAQPage JSON-LD head 探针 — 本 lane 工具面做不到）③ 统一幂等键口径（§6-A，`lane-preflight.py` vs `lane-git-commit.py`）④ 清 daily-content 00:35 BLOCKED 遗留的 5 个脏生产文件（§6-B）⑤ 下周六簇轮换 books/catalog（大脑第 4 条）

**RETRY_OF**: 无 — `run-context.retry_queue = []`（契约 §二.3：无待重做项，故不写 RETRY_OF）。反向确认：lane-status 的 10 条 `problems` 中与本 lane 相关的仅「ZP-blog-deepfix 2026-10-03 -> MISSING」+「scheduler LastTaskResult=2147946720」，其证据指向**调度器层 0x80070020 启动失败**（属 `request_human`，非车道可自愈项），本轮不伪重跑。

**ALREADY_DONE（幂等判定, 契约 §二.1 + §二.2）**:
1. 00:17 档（run_id `ZP-blog-deepfix-20261010T001710`，verdict=OK / state=completed / guard.ok=true / files=`src/data/sku-seo-data.ts` / head=92845293）已交付大脑第 -2 优先级本车道第 1-3 条全部内容 → **零重做**。
2. 该档报告（VERDICT: PARTIAL）**全文已入 git**（`aa1bd8f7` 产物提交 + `92845293` 报告提交），本轮覆盖写前已读回全文并摘录；可用 `git show 92845293:.hermes/logs/2026-10-10-ZP-blog-deepfix.md` 取回原件。**不是数据丢失**。
3. `premium-greeting-cards` / `matte-greeting-cards` 的 holiday/年賀状 场景句（上档判定 ALREADY_DONE）+ 红旗 1 承接段（`841a7260`，大脑明文「已修复，不重复做」）→ 本档同样**零改写**。
4. 契约 §四（判据纪律）：本档**不**以「跑过了 / wrapper exit=0 / Task Scheduler Result=0」当成功；成功判据 = 本报告 + §2 在盘独立复核结果 + §3 线上探针实证；**机器门禁与线上 head 内 JSON-LD 明确标注未执行**，不虚报。

---

## SOP-10 5 问门禁（K3 §0.22）

1. **架构差异?（查前序任务实现路径）** ✅ 先查 git 而非推断：`aa1bd8f7`（`cron(ZP-blog-deepfix): lane 产物自动提交 2026-10-10 00:17`）+ `92845293`（报告提交）证明上档是**已落盘的真实交付**，非空转；本轮据此走「幂等命中 → skip + 独立复核」路径（契约 §二.2 明文），而不是第二次改写同一批文件。同时实测上档交付链路（`zprintpro-sku-seo-data.csv` → `csv-to-sku-seo.mjs` → `src/data/sku-seo-data.ts` → PDP meta）在盘结果存在且与上档报告逐字一致（见 §2）。
2. **约束适用范围?（查 K3 拍板原文）** ✅ ① 大脑 2026-10-09 本车道第 1 条 = 「6 SKU 描述补 holiday/年賀状 场景句（各 ≤1 句，**零 title 改动**）」——上档已按此交付；本轮**未新增任何 src 改动**，故零违反面。② 大脑第 3 条明文「**只读**，缺陷入报告挂账，**不擅自修**」→ 本轮 §4/§5 两项 MOQ 漂移**只定位不改写**，逐条给出 A/B/C 与推荐（§0.2 禁只抛问题）。③ §0.0（2026-09-12 解禁块）：零触及名片展示层/SEO 层；未删改既有贺卡资产；未动 middleware 301。④ v9.3 任务 J「不改 slug、不砍页、不回滚已部署 title」：零违反（本档零 src 改动）。⑤ 冻结名单（`zprintpro-en-us-images/` · `_batch*.py` · `Rush*` · `page.redesign.tsx` · `src/services/rush/*`）：零触及。
3. **原数据/拍板来源?（3 问）** ✅ ① 拍板来源：K3 大脑 2026-10-09（`docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md` §F-2 本车道 4 条）+ 契约 v1 + AGENTS.md §0.35。② 是不是真数据：**是**。本报告所有数字均带文件 + 行号（products.ts / category-seo-content.ts / category-conversion-blocks.ts / sku-seo-data.ts / lane-runs.jsonl / .git/logs/HEAD），逐条可复算；GSC 侧**零引用词级数字**（见「数据来源」声明）。③ 留/撤：**留** — 未撤任何数字/文案/报告；对**前档报告 §5 挂账 6 的口径做了「进步式更新」而非撤回**（源从「未定位」→「四源已定位」，见 §4）。
4. **字段值策略?（certNo/validUntil/issuer 全空）** ✅ 未新增/改写任何 `certNo`/`validUntil`/`issuer`；未引入联系方式变更（沿用既有 +86 198 8085 1334）。
5. **Markdown 渲染?（`[text](url)` 必须 parseInlineLinks）** ✅ 本档零 user-facing 文本产出（只写内部报告 + 后台日志路径）；报告正文链接均为内部路径/命令，非站内渲染文本 ⇒ `parseInlineLinks()` 不适用。

**门禁结论**: 5 问全过。

---

## 数据来源（K3 §0.23 强制 / §I.2 三段必含）

```
数据来源:
- 结果总线: .hermes/logs/run-context-ZP-blog-deepfix.json（2026-10-10 00:43:03）+ .hermes/logs/lane-status.json（2026-10-09 23:48:45 本地 / 15:48:45Z）+ .hermes/logs/lane-runs.jsonl（24 条, 本 run 全量读回）
- 上档交付账本: .hermes/logs/2026-10-10-ZP-blog-deepfix.md（00:17 档, 302 行, 覆盖写前读回）+ .git/logs/HEAD L593-L594（aa1bd8f7 / 92845293）
- 在盘复核对象: src/data/sku-seo-data.ts（L2741/2748/2770/2777/2784/2806/2813/2820/2849/2856/2885/2892/2921/2928）+ zprintpro-sku-seo-data.csv
- MOQ 四源证据: src/data/products.ts（信封 entry L5989/L6063/L6160/L6257; minQuantity L6016/L6090/L6187/L6284=100; faqSchema L6055/L6152/L6249/L6345="MOQ 500 pieces"; 贺卡 BC-001~006 minQuantity L179/276/375/473/569/667=10）+ src/data/category-seo-content.ts（en L1472/L1506/L1530; ja L1571/L1605/L1630; 红包同型 L2092/L2134/L2158 + ja L2191/L2233/L2257）+ src/data/category-conversion-blocks.ts（envelopes:en L3482; +22% L2402）
- 无来源数字证据: 「15,000+」≥13 个客户可见文件（StatsBar L13/21/29 · WhyChooseUs L14/37-38/61 · CategorySidebar L48/65/82 · HotProducts L33/49/65 · EmailSubscribePopup L42/56/70 · contact/page L54/110/166 · HowItWorks L224-227 · QuoteForm L120/161 · KnowledgeSection L98 · blog-posts.ts L1658/1659 · products-content.ts L63/302/317/3242/6605 · sku-seo-data.ts L2528） vs src/app/[locale]/about/page.tsx L202「Trusted by 1,000+ global brands」 vs K3 8/19 拍板「1,000+ 客户」（AGENTS.md §0.22 SOP-10 第 3 款列明的**属实数据**）
- 线上探针（web_fetch, 本档 2 条, HTTP 200）: https://zprintpro.com/ja/category/flyers/ · https://zprintpro.com/en/category/envelopes/（均为 2026-10-10 拉取）
- GSC 新鲜度: GSC数据/index.json（lastBuild 2026-10-10T22:43+08:00; latestFreshData 2026-10-09; stalenessDays 1; freshnessStatus FRESH; totalFiles 163; 注记「连续第 2 档缺 3mo 窗, 待 10/12 补」）
- 并发状态: SESSION_LOCK.md 顶部 = ⚪ RELEASED（2026-10-09 12:0x, 748e628d + 981025df）；.hermes/locks/lane.lock 由本 lane preflight 持有（pid 21548 @ 00:43:03）
- 环境: pwsh 工具在本 lane 沙箱被禁（v9.4 rearm 2026-09-14 环境注记, 明示不重试）⇒ node/git/curl/tsc/build/门童命令 **均未在 lane 内运行**, 由 host-side wrapper 执行；不虚报 PASS

校准状态: ✅ GSC 侧 FRESH（数据日 2026-10-09 / stalenessDays=1 / <72h 门）；**本档未消费任何 GSC 词级数字**（主交付为幂等复核 + MOQ 源定位，不依赖 GSC 选词）⇒ 报告内零 GSC 后台黑话、零词级数字（门童 #16 语义自检通过；§K.1.3 新鲜度闸门不触发数字结论）。
撤回声明: 无（未撤回任何前序报告；§4 对前档挂账 6 做的是**证据补强**）。
```

### §I.1 4 口径对照表（per §0.33.1；本报告含 SKU/文件计数 → 必填）

| 口径 | 真实数量 | 类型 | 本报告何处使用 |
|------|---------|------|----------------|
| zh-hk.json unique slugs | 79（9/2 校准**继承值**） | zh-hk 页面内容 | 未使用（本档零 blog 改动） |
| en.json unique slugs | 80（继承值） | en 页面内容 | 未使用 |
| ja.json unique slugs | 80（继承值） | ja 页面内容 | 未使用 |
| blog-posts.ts SSoT entries | 85（继承值） | SSoT 配置 | 未使用 |
| **信封 SKU（envelopes 类目）** | **4**（`products.ts` business/colored/large/pearl） | 仓内实测 | §4 |
| **信封 MOQ 冲突源** | **4 源**（products.minQuantity / products.faqSchema / category-seo-content / category-conversion-blocks） | 仓内实测 + 线上 | §4 |
| **贺卡 SKU 携带 MOQ 文案** | **6**（其中 **4 处 = 100**、2 处 = 10） | `sku-seo-data.ts` 逐行 | §5 |
| **本档实际改动文件** | **0 src + 1 报告** | 仓内实测 | 全篇 |

> 上表 79/80/80/85 为 §I 于 2026-09-02 09:00 的**继承值**，本档未复算（不涉篇数结论）。**已记录的漂移**：10/10 00:28 daily-content 实测 zh-hk 100 / en 101 / ja 100，与本表差 20+ 条 → 该口径债已由 daily-content 报告 §10.2 列 `need_human`，本档**不重复挂账、不擅自改写校准表**（口径属 K3 拍板层）。

---

## 1. 本轮性质与幂等账本（为什么是 skip 而不是重做）

本档是**同夜第 7 次 lane 触发**（host 侧 00:01→00:43 补齐批次）。当日 lane-runs.jsonl 实测 7 条（本 run 全量读回）：

| 时刻 | lane | verdict | state | 备注（files） |
|---|---|---|---|---|
| 00:01:37 | daily-content | OK | completed | 10-09 报告；blog-data×3 + blog-posts.ts + blog/[slug]/page.tsx |
| 00:07:15 | gsc-feedback | OK | completed | industry-keyword-matrix.json |
| 00:10:56 | weekly-meta | OK | completed | src/lib/seo.ts |
| **00:17:10** | **blog-deepfix** | **OK** | **completed** | **src/data/sku-seo-data.ts（本档的「已交付」对象）** |
| 00:21:33 | monthly-matrix | OK | completed | — |
| 00:23:56 | k3-review | OK | completed | — |
| 00:35:33 | daily-content | **BLOCKED** | blocked | **wrapper_exit=4；pre-commit guard 拒绝 5 个生产文件**（见 §6-B） |
| 00:38:40 | gsc-feedback | OK | completed | report=NONE |

**幂等判定（两方法，per §0.23.2 双方法复算）**：
- **方法 1（机器键）**：`run-context.idempotency.this_run_key = 37eaab37ee14ebaf`；上档报告首段自述其 CONSUMED 的 run-context 键**同为 `37eaab37ee14ebaf`** ⇒ 同键命中（契约 §二.2：「命中同一个 key = 同一件事今天已处理过 → 跳过」）。
- **方法 2（证据账本，契约 §二.1，优先级更高）**：`run-context.previous_run.bus_record` = verdict OK / state completed / guard.ok=true / files=[`src/data/sku-seo-data.ts`] / report=本文件路径；且我**逐行回读**了该档报告与在盘文件（§2）⇒ 同目标准确已交付。
- **两次结论一致** ⇒ 幂等成立，**不重做**。⚠️ 方法 1 暴露一处机器口径不一致（run-context 键 ≠ lane-runs 键），已列 §6-A — 这也是本轮**必须**走方法 2 的原因。

**不重犯（契约 §二.5）**：上档 `guard.ok=true`（无拦截）；lane-status 无 `DUPLICATE_IDEMPOTENCY_KEY` 警告。本档零 src 写入 ⇒ 天然规避上档教训面（单行 JSON 内写多行值会把真换行写进 JSON，`.hermes/logs/2026-09-19-blog-deepfix.md` §六）。

**跨车道避让（契约 §二.6，实测生效）**：`run-context.sibling_lanes=[]`（生成于 00:43:03 — 但本 run **直读 lane-runs.jsonl** 发现当日已有 7 条记录）。今日已被他 lane 动过的文件 = `src/data/blog-data/{zh-hk,en,ja}.json` · `src/data/blog-posts.ts` · `src/app/[locale]/blog/[slug]/page.tsx`（daily-content）· `src/lib/seo.ts`（weekly-meta）· `.hermes/industry-keyword-matrix.json`（gsc-feedback）。本档交付面 = **1 个 .hermes 报告**，与该 6 文件**零交集** ⇒ 无撞车。§4/§5 挂账的修复若触及 `category-seo-content.ts` / `products.ts` / `sku-seo-data.ts`，**下一批须先看 lane.lock + 当日 lane-runs**（本档只挂账，不修）。

---

## 2. 独立复核 — 上档交付物在盘核验（read-only，逐行）

| 复核项 | 方法 | 结果 |
|---|---|---|
| thick 400g 三语场景句 | grep `新年賀卡\|New Year cards\|年賀状` on `sku-seo-data.ts` | ✅ L2770（zh：新年賀卡）/ L2777（en：New Year cards）/ L2784（ja：年賀状）**逐字存在** |
| foil 三语场景句 | 同上 | ✅ L2806 / L2813 / L2820 全部存在（含「箔押し…年賀状」） |
| spot-uv 三语场景词 | 同上 | ✅ L2849（en「Birthday, Christmas, New Year & brand」）/ L2856（ja「年賀状」） |
| matte / rounded-corner 场景词 | 同上 | ✅ L2885 / L2921（en「New Year」）+ L2888 / L2928（ja「年賀状」） |
| ALREADY_DONE 两项 | 同上 | ✅ premium L2748（ja 已含 年賀状）/ matte 已含 New Year ⇒ 与上档「零改写」判定一致 |
| products.ts 真值 | grep `minQuantity` | ✅ BC-001~006 = L179/276/375/473/569/667 **均 10**（上档写入的「10 張起 / 10-card MOQ / 10枚から」有据） |
| 上档报告可追溯 | `.git/logs/HEAD` L593-594 | ✅ `aa1bd8f7`（产物）+ `92845293`（报告）双提交；HEAD 现为 `38c009fe` |
| CSV 侧 | 上档称 8 次外科式 edit | ⚠️ **本档未逐行回读 CSV**（避免大文件 grep 噪音）；CSV↔TS 一致性仍以 host 跑 `node scripts/csv-to-sku-seo.mjs` 为唯一判据（上档 §2.2 已给命令）——**不虚报为已验证** |

**结论**：上档 `DELIVERED` 声明与在盘事实**一致**，无虚假交付；本档无需要补救的缺口。

---

## 3. 线上探针（本档实做 2 条, 含一项**新证据**）

| URL | 结果 | 关键观测 |
|---|---|---|
| `/ja/category/flyers/` | HTTP 200 | 4 条 `flyers:ja` quickAnswers **渲染上线**（含「特急・即日チラシ印刷の料金はいくら？」）；7 张商品卡 **[最小注文] 10 張** 统一；Why 段「小ロット高コストパフォーマンス、10枚から」⇒ 与 **flyers MOQ 真值=10**（commit `a5c66073`/`21b7f2ee`）**线上一致** ⇒ 该轮 MOQ 漂移修复**已上线生效** |
| `/en/category/envelopes/` | HTTP 200 | **同页两套 MOQ 并存**（线上实证，非代码推断）：① quickAnswers「All four envelope types start at **100 pcs** with digital printing」；② 4 张商品卡「**[MOQ] 100 個** / 100 MOQ」；③ **Why ZprintPro 03「500 pcs minimum (digital printing)」**；④ **Technical Specifications → Minimum Order「500 pcs (digital printing)」**；⑤ Industries 卡「**From 500** · 5-day delivery」⑥ 同页其他文案「Trusted by **15,000+** customers」 |

**FAQPage JSON-LD 收录资格（大脑第 2 条的线上子项）— 诚实结论：本 lane 做不到，仍未验证（OPEN）**
- `web_fetch` **不回传 `<head>` 与 `<script type="application/ld+json">`**（本档再次实测 2 URL）；两次裸 HTML 代理亦失败：`api.allorigins.win` → `TypeError: fetch failed`；`api.codetabs.com` → **HTTP 522**。
- ⇒ 本档**不主张**「线上 FAQPage 已验证」。上档把该子项记为「✅ 完成（结论=前提不成立）」，准确表述应为「**代码级链路结论成立 + head 级线上验证未做**」；本档把该子项**退回 OPEN**并给 host curl（§8 第 5-7 条）。
- 可确证的替代证据（足够支撑「数据被消费」）：3 个目标块（`envelopes:en` / `envelopes:ja` / `flyers:ja`）的 quickAnswers **已在线上正文渲染**（本档 2 条 + 上档 1 条探针合计 3/3 命中），FAQPage JSON-LD 由 `category/[slug]/page.tsx` L350-387 结构化产出 —— **块存在且 q/a 非空 ⇒ JSON-LD 生成点必然执行**（代码级保证），但仍需 host curl 才算线上实证。

---

## 4. 新增发现 A（🔴 P1）— envelopes「500 vs 100」MOQ 矛盾：**四源已定位**（前档挂账 6 的收口证据）

前档只写到「源指向 category 正文数据源（非本批文件）；下一批定位」。本档已定位到**行号级**：

| # | 源 | 位置（实测行号） | 声明值 | 线上可见性 |
|---|---|---|---|---|
| 1 | `src/data/products.ts` `minQuantity` | business L6016 · colored L6090 · large L6187 · pearl L6284 = **100**（entry slug 起 L5989/6063/6160/6257，已逐行核对归属） | **100** | 商品卡「[MOQ] 100 個」+ 报价引擎（**结构性真值**） |
| 2 | `src/data/products.ts` `faqSchema` | L6055 / L6152 / L6249 / L6345（4 个信封 SKU 同串） | **500**（"MOQ 500 pieces"） | PDP FAQ / FAQPage schema |
| 3 | `src/data/category-seo-content.ts` | en：L1472（coreAdvantages）+ L1506（techSpecs Minimum Order）+ L1530（FAQ）；ja：L1571 + L1605 + L1630 | **500** | **Why ZprintPro / Technical Specifications / FAQ**（线上实证） |
| 4 | `src/data/category-conversion-blocks.ts` | `envelopes:en` L3482「All four envelope types start at 100 pcs」；`envelopes:ja` 同型块（上档 L3596 区） | **100** | quickAnswers（线上实证） |

- **同型污染（非信封独有）**：`category-seo-content.ts` **红包类目**同结构 500（en L2092/L2134/L2158；ja L2191/L2233/L2257），同段又写「5,000+ pcs offset」⇒ 疑似**把「5,000+ 柯式推荐档」错位搬进 MOQ 字段**，属同一缺陷族（**建议同批体检，不单点修**）。
- **A/B/C + 推荐（§0.2 禁只抛问题）**：
  - **A（推荐）**：以 **`minQuantity`（=100）为唯一真值**，把源 2/3 的 6 处 en + 6 处 ja「500」改为「100」，并把同段「5,000+ 柯式推荐」保留为**加价阶梯**表述；沿用 flyers 先例（`a5c66073`「truth=10, 16 customer-visible spots」已上线验证，见 §3）⇒ 口径统一、有先例、有线上验证法。
  - **B**：若业务上信封确为「500 起（数码）/100 起（团购）」双档，则须**回填 `minQuantity` 之外的第二字段**并同步商品卡与报价引擎 —— 属数据层 schema 变更，**不得由本 lane 自裁**。
  - **C**：只改 category-seo-content（消线上矛盾）而留 `faqSchema` 500 —— **不推荐**（矛盾从「同页」转移为「页 vs schema」）。
- **风险与纪律**：这是**客户可见商务声明**（MOQ），改前须 K3/产品一句确认（§0.22 SOP-10 第 3 款：不推断数字）。本档**零改动**。

---

## 5. 新增发现 B（🔴 P1）— greeting-cards 簇 **MOQ 自相不一致**（上档修复后残留，直击本周主题簇）

上档本批把 thick / foil 两 SKU 描述写成「**10** 張起 / 10-card MOQ / 10枚から」（有 products.ts 真值支撑）；但**同簇另 4 个 SKU 仍写 100**：

| SKU | description 实测 | body 实测 | products.ts `minQuantity` |
|---|---|---|---|
| `premium-greeting-cards` | en L2741「from **100** pcs HK$100」· ja L2748「**100**枚〜HK$100〜」 | ja L2751「最小注文は **100** 枚から」 | **10**（L179） |
| `spot-uv-greeting-cards` | en L2849「from **100** pcs HK$140」· ja L2856「**100**枚〜」 | ja L2859「最小注文は **100** 枚から」 | **10**（L473） |
| `matte-greeting-cards` | en L2885「from **100** pcs HK$110」· ja L2892「**100**枚〜」 | ja L2895「最小注文は **100** 枚から」 | **10**（L569） |
| `rounded-corner-greeting-cards` | en L2921「from **100** pcs HK$100」· ja L2928「**100**枚〜」 | ja L2931「最小注文は **100** 枚から」 | **10**（L667） |
| `thick-400g` / `foil`（上档新写） | **10**-card MOQ（L2777 / L2813） | — | 10（L276 / L375） |

- **影响面**：`description` 是 **PDP meta description**（上档 §2 链路实测）⇒ 同一类目 6 个 SKU 向 Google/客户暴露两种 MOQ；且**报价引擎按 `minQuantity=10` 计算**，与 4 个 SKU 的「100 起」文案**直接冲突**（客户按 100 询价，系统按 10 报价）。
- **修法（推荐 A）**：以上档同一手法（SOP-5 走 CSV 源头 + 生成器）把 4 个 SKU 的「100 MOQ」表述对齐 **10**（含 ja body「最小注文は100枚から」→「10枚から」），**零 title / 零 H1 / 零 keywords / 零 body 文案改写以外的改动**；改前跑门童 #20（语言错配/A-A 重复）+ #17（ce 截断）+ #4（字形/币种）+ #16（GSC 泄漏）。**注意**：`thick/foil` 的「HK$1.2/card」与 `premium` 的「HK$100/100張」是**两种价格口径**（单价 vs 百张价），修复时须保留各自既有口径，**只改 MOQ 数字**，勿顺手动 price（§0.23 数据诚信）。
- **为什么不本档直接修**：① 同键幂等命中（本档性质 = skip，不新开 scope，per v1.2 §①「不扩大范围」）；② 客户可见商务数字改动须一次定稿（churn 红线段）；③ 当日 00:35 daily-content 刚被 pre-commit guard 拦下 5 个生产文件（§6-B），工作树存在未决 guard 状态，**不宜在其上再叠一批 src 改动**；④ 修复需 host 跑生成器（lane 无 node）。

---

## 6. 新增发现 C（🟠 P2）— 结果总线完整性 2 项

**A. 幂等键双口径不一致（P3-10 机器判重当前不可用）**
- 证据：`run-context.idempotency.this_run_key = 37eaab37ee14ebaf`，而同一 lane/同日的 `lane-runs.jsonl` 记录（`ZP-blog-deepfix-20261010T001710`）`idempotency_key = e5038594dc97fb9f`。
- 两键均自称 `sha256(lane|intent|target|day)[:16]` ⇒ 相同输入不可能得出不同结果 ⇒ **写入方（`lane-preflight.py` vs `lane-git-commit.py`）对 `intent`/`target` 取值或算法不一致**。
- 影响：契约 §二.2 的「命同 key 即跳过」**永远无法命中**（同一天永远两个键），机器判重退化为靠人工比报告 —— 这正是本档必须走「方法 2 证据账本」的原因（§0.23.2 双方法复算救了一次）。
- 建议（host）：统一键派生为单函数（如 `scripts/lane-idempotency.mjs`），preflight 与收尾同调；短期以 `run-context.previous_run.report + files` 为权威判据并写进契约。

**B. daily-content 00:35 档：机器判 BLOCKED，盘上报告自报 OK（契约 §四 的典型分歧）**
- 总线：`ZP-daily-content-20261010T003533` → `wrapper_exit=4` / `verdict=BLOCKED` / `blocked_reason="pre-commit guard 拒绝 5 个生产文件"` / `files=[blog/[slug]/page.tsx, blog-data/{zh-hk,en,ja}.json, blog-posts.ts]` / `pushed=false`。
- 盘上报告 `.hermes/logs/2026-10-10-ZP-daily-content.md` 首段却写 `VERDICT: OK`（lane 侧无 node 无法自跑门禁）。
- ⇒ **判据铁律（§0.35.4）再次被验证：以机器 verdict 为准，不以 lane 自报为准**；且这 5 个文件**可能仍处于脏/被拦状态**，任何后续 src 批次前须由 host 先解决（否则下一个 lane 的 wrapper commit 可能继承同一拦截）。本档**零触及**这 5 个文件。

---

## 7. 挂账清单（更新：前档 8 项 + 本档新增 5 项）

| # | 级别 | 项 | 证据 | 状态变化 |
|---|---|---|---|---|
| 4 | 🟠 P2 | `flyers:ja` socialProof `+22%` 无来源 | `category-conversion-blocks.ts` L2402 | **范围扩大**：同数字亦见 `category-seo-content.ts` L3101/L3191（en featuredSnippet+FAQ）· L3201/L3295（ja）⇒ 非「一处社交证据」，是**类目页文案层** |
| 5 | 🔴 P1 | `/guide/[slug]` hreflang 全指 locale 首页 + x-default→/en | `src/lib/metadata.ts` L19-29 → `guide/[slug]/page.tsx` L35 | 未变（仍需 K3 裁） |
| 6 | 🔴 P1 | **envelopes 同页 MOQ 矛盾（500 vs 100）** | 本报告 §4 四源行号 + 2 条线上探针 | **源已定位**（前档为「未定位」）→ 待 K3/产品一句确认后单批修 |
| 7 | 🟠 P2 | 无来源数字「15,000+」· `+22%` §0.23 | 本报告 §4/§6 数据来源行（≥13 文件 vs about 页「1,000+」vs K3 8/19 拍板 1,000+） | **范围扩大且有内部自相矛盾**（about 页 L202 用 1,000+）→ 需 K3/运营**一句口径裁决** |
| 8 | 🟡 P3 | 块内 `title` / `metaDescription` 死字段（0 线上效果） | 前档 §3.2 三方证据 | 未变 |
| 9 | 🔴 P1 | **greeting-cards 4/6 SKU MOQ=100 文案 vs `minQuantity=10`**（§5） | sku-seo-data.ts L2741/2748/2849/2856/2885/2892/2921/2928 + products.ts L179/473/569/667 | **本档新增** |
| 10 | 🟠 P2 | **幂等键双口径**（§6-A） | run-context `37eaab37ee14ebaf` vs lane-runs `e5038594dc97fb9f` | **本档新增** |
| 11 | 🟠 P2 | daily-content 00:35 **BLOCKED 遗留 5 个脏生产文件**（§6-B） | lane-runs.jsonl L23 | **本档新增** |
| 12 | 🟡 P3 | 线上 **FAQPage JSON-LD head 级验证仍缺**（大脑第 2 条子项退回 OPEN） | 本报告 §3（web_fetch 无 head；2 代理失败） | **状态更正**（前档记 ✅，实为未做） |
| 13 | 🟡 P3 | GSC 索引持续缺 3mo 窗（连续第 2 档）| `GSC数据/index.json` stalenessNote | 转记（属 gsc-feedback lane，非本 lane 修） |

**不在本 lane 范围（仅登记，不越权）**：lane-status 10 条 `problems` 全为**调度器层**（4 条 `2147946720`=0x80070020 文件占用 / `267009`=任务运行中 / `267011`=未运行）→ 属 host 管理员动作（大脑 Part F-6 已列），依契约 §二.3 `request_human`。

---

## 8. 可粘贴验收命令（host 侧；本 lane pwsh/node 被禁，故不代跑）

```bash
cd /d F:\zprintpro-nextjs

# 1) 上档交付一致性（唯一判据）：6 个 greeting-cards slug 不得出现在「字节级变化块」
node scripts/csv-to-sku-seo.mjs

# 2) 类型基线
npx tsc --noEmit                     # 期望 54=54 持平

# 3) 12 段骨架门禁（存量清理车道口径）
node scripts/guards/blog-quality-12-rules-guard.js --baseline --online --json

# 4) 相关门童（本报告 §4/§5 挂账若落地，改前后各跑一次）
node scripts/guards/i18n-guard.js && node scripts/guards/meta-description-guard.js \
  && node scripts/guards/gsc-leak-guard.js && node scripts/guards/ce-truncation-guard.js

# 5) 线上 FAQPage JSON-LD（本 lane 做不到的 head 级验证）
curl -s https://zprintpro.com/ja/category/flyers/    | grep -c '"@type":"FAQPage"'
curl -s https://zprintpro.com/en/category/envelopes/ | grep -c '"@type":"FAQPage"'
curl -s https://zprintpro.com/ja/category/envelopes/ | grep -c '"@type":"FAQPage"'

# 6) hreflang 三向对称（挂账 5 的复核）
curl -s https://zprintpro.com/en/guide/<任一 slug>/ | grep -oE '<link rel="alternate"[^>]*>' | head -20
#   期望：指向该 guide 页自身 x4；若指向 /en /ja /zh-hk 首页 ⇒ 挂账 5 复现

# 7) §4 MOQ 四源盘点（改前基线）
grep -n "500 pcs\|500枚" src/data/category-seo-content.ts | head -30
grep -n "MOQ 500 pieces" src/data/products.ts | head

# 8) §6-A 幂等键口径核对
grep 'ZP-blog-deepfix-20261010T001710' .hermes/logs/lane-runs.jsonl
grep -n 'this_run_key' .hermes/logs/run-context-ZP-blog-deepfix.json

# 9) 前档报告取回（本报告覆盖写的原件）
git show 92845293:.hermes/logs/2026-10-10-ZP-blog-deepfix.md | head -40
```

---

## 9. 决策登记簿 ID 列表（per §J.1.3）

- **D-10/10-BLOG-6**（00:17 档交付的**独立在盘复核** + 幂等命中判定）：🟢 **DONE**（产物：本报告 §1-§2；判据 = 逐行 grep + git 提交链 `aa1bd8f7`/`92845293`）
- **D-10/10-BLOG-7**（envelopes MOQ 四源定位 + A/B/C 修法）：🟢 **DONE（分析）** / 🔴 **OPEN（落地）** — 待 K3/产品一句确认真值（产物：§4）
- **D-10/10-BLOG-8**（greeting-cards 4/6 SKU MOQ=100 文案漂移）：🔴 **OPEN** — 推荐对齐 `minQuantity=10`（产物：§5）
- **D-10/10-BLOG-9**（幂等键双口径统一）：🔴 **OPEN** — host 脚本层修复（产物：§6-A）
- **D-10/10-BLOG-10**（`+22%` / `15,000+` 口径裁决）：🔴 **OPEN** — K3/运营一句裁（产物：§7 #4/#7）
- **D-10/10-BLOG-4 / -5**（前档挂账 6 / 7）：🟡 **IN_PROGRESS** — 本档已把「源未定位」推进为「四源行号已定位」/「范围已扩大」，**未关闭**
- **D-10/10-BLOG-11**（FAQPage JSON-LD head 级验证退回 OPEN + host curl 命令）：🔴 **OPEN**（产物：§3 + §8 第 5-7 条）

---

## 10. 升级 K3（1 段中文，5 要素）

**① 修了什么**：本档是**同夜第二次触发**（00:43），而上档 00:17 已按您 10/9 大脑指令第 -2 优先级把本车道第 1-3 条全部交付（greeting-cards 6 SKU 场景句 / 新块 FAQ 链路归因 / hreflang·sameAs·canonical 只读复核）⇒ 依契约幂等铁律与结果总线段**命中同键（`37eaab37ee14ebaf`）→ 判定 skip，零重做、零 src 改动**。省下的算力全部转成**只读复核 + 缺口定位**：独立逐行核验了上档 6 SKU 交付**确实在盘**（sku-seo-data.ts L2741-L2931 + products.ts minQuantity 真值），并**新查出三项可落地缺口**（下条）。

**② 深度证据**：①上档交付在盘复核 7 项全过（含 git 双提交 `aa1bd8f7`/`92845293` 可追溯）；②线上探针 2 条 HTTP 200（`/ja/category/flyers/` 印证 flyers MOQ=10 修复已上线生效；`/en/category/envelopes/` **实证同页 100/500 两套 MOQ 并存**）；③**envelopes MOQ 矛盾四源已定位到行号**（products.ts `minQuantity=100` L6016/6090/6187/6284 + 同文件 `faqSchema` 写「MOQ 500 pieces」L6055/6152/6249/6345 + category-seo-content.ts 写 500 L1472/1506/1530（ja L1571/1605/1630，红包类目同型 L2092/2134/2158）+ category-conversion-blocks.ts 写 100 L3482）——前档只能写「源未定位」，本档给出可修清单；④**greeting-cards 簇自相矛盾**：上档修好的 thick/foil 说 10，但 premium / spot-uv / matte / rounded-corner 4 个 SKU 的 meta 描述与 ja 正文仍写 100，而报价引擎按 `minQuantity=10` 走 ⇒ 客户按 100 询价、系统按 10 报价。

**③ 必须知情的结论（3 项，均按「缺陷入报告挂账，不擅自修」处理）**：**(a)** 上档把大脑第 2 条的「线上 FAQPage JSON-LD 收录资格」记为 ✅，**实际 head 级验证没做**（`web_fetch` 不回传 `<head>`；本轮再试两个裸 HTML 代理全失败）⇒ 本档**退回 OPEN** 并给 host curl 三条，请以 host 命令为准；**(b)** P3-10 幂等键**双口径不一致**（run-context `37eaab37ee14ebaf` vs 总线 `e5038594dc97fb9f`，同一 lane 同日）⇒ 机器判重当前永远命中不了，本轮靠「上一轮 report+files 证据账本」才判准，建议 host 统一派生函数；**(c)** 今夜 00:35 daily-content 被 pre-commit guard 拦下 5 个生产文件（机器判 BLOCKED），但其盘上报告自报 OK，且这批脏文件可能仍在树里 ⇒ 任何下一批 src 改动前请先清理，否则会继承同一拦截。

**④ 5 步 verify**：上档交付在盘复核 ✅（7/7，逐行）· 幂等判定双方法一致 ✅（键 + 证据账本）· 线上探针 2/2 HTTP 200 ✅（含矛盾实证）· MOQ 四源行号定位 ✅ · **机器门禁（tsc / build / 门童 exit 0 / head 内 FAQPage JSON-LD / 生成器 dry-run）⛔ 未执行**（pwsh 被 lane 沙箱禁，v9.4 环境注记明示不重试）→ 已转 §8 可粘贴命令，**不虚报 PASS**。

**⑤ 下一步**：① 请 K3 一次裁两件 MOQ 真值：信封（100 还是 500？推荐以 `minQuantity=100` 为唯一真值，沿用 flyers 先例）与贺卡 4 SKU（推荐对齐 10）；② 请就 `15,000+` vs about 页「1,000+」vs 您 8/19 拍板「1,000+」给一句口径（本档实测 ≥13 个客户可见文件写 15,000+，自相矛盾）；③ 周六槽位下一轮按大脑第 4 条轮换 **books/catalog 簇**（本档未启动，避免与幂等边界冲突）；④ host 侧顺手修幂等键口径 + 清 daily-content 脏文件。

---

## 附：本档做不到 / 未做（诚实边界，不得当作结论使用）

| # | 项 | 原因 |
|---|---|---|
| 1 | 跑 `node` / `git` / `curl` / `tsc` / `build` / 门童命令 / 生成器 | pwsh 工具在本 lane 沙箱被禁（v9.4 rearm 2026-09-14 明示不重试）⇒ 由 host wrapper 执行；已给 §8 命令 |
| 2 | 线上 head 内 FAQPage JSON-LD / hreflang 实证 | `web_fetch` 不回传 `<head>`；`api.allorigins.win` fetch failed；`api.codetabs.com` HTTP 522 ⇒ 结论停在代码级 + host curl |
| 3 | 任何 src 写入（含 §4/§5 MOQ 修复） | 幂等命中 skip（不新开 scope）+ 客户可见商务声明须 K3 确认真值 + 当日 00:35 guard 拦截遗留脏树 |
| 4 | `src/data/blog-data/*.json` / `blog-posts.ts` / `blog/[slug]/page.tsx` / `src/lib/seo.ts` 任何写入 | 跨车道避让（当日 daily-content / weekly-meta 已动）+ guard 拦截态 |
| 5 | CSV 逐行回读 / 生成器 dry-run | 大文件 grep 噪音 + lane 无 node；以 host `node scripts/csv-to-sku-seo.mjs` 为唯一判据 |
| 6 | GSC 词级数字引用 / 选词 | 本档主交付为幂等复核与 MOQ 源定位，不依赖 GSC 选词 ⇒ 不做二手引用（§K.1.4 证据链纪律） |
| 7 | 逐词/逐页 3mo 窗 GSC 复算 | `GSC数据/index.json` 注记「连续第 2 档缺 3mo 窗」⇒ 属 gsc-feedback lane，非本 lane |

---

*Generated by deepseek harness（DSH lane `ZP-blog-deepfix`, v9.4 rearm 持续轮 · 第二档幂等命中）· 2026-10-10 00:43 档 · 仓根 `F:\zprintpro-nextjs` · 覆盖写前 HEAD `38c009fe` · 前档报告存于 `92845293`*
