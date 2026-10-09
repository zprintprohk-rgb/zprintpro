# ZP-blog-deepfix — 2026-10-10（周六 05:37 定时档 · 幂等命中轮 + 存量缺口定位 · 当次全量执行, 无简化无延后）

VERDICT: OK
STATE: skipped（IDEMPOTENT_SKIP — 同轮 `this_run_key 37eaab37ee14ebaf` 已由 2026-10-10 00:17 档同目标交付; 契约 §二.1 + §二.2 + §二.4 `pending→skipped`）
CONSUMED: run-context-ZP-blog-deepfix.json @ 2026-10-10 05:37:01（preflight=ok / lock acquired pid 37156 / this_run_key `37eaab37ee14ebaf` / retry_queue=[] / sibling_lanes=[] / prev bus verdict=OK @ 00:47:33） | lane-status.json @ 2026-10-09T15:48:45.210Z（verdict=ATTENTION / problems=10 / bus_records=15） | lane-results-bus-contract.md（v1 2026-09-19 全文） | .hermes/cron-prompts/zprintpro-blog-deepfix.md（含 K3-BRAIN-INJECT-2026-10-09 第 -2 优先级 + v9.3 第 -3 + v11 段3/FAQ 口径 + v9 翻译层补丁 + §M 12 铁律 + 【任务 5 步】） | .hermes/cron-prompts/sop-10-gate.md（全 78 行） | .hermes/logs/lane-runs.jsonl（25 条, 本轮全量读回） | SESSION_LOCK.md（顶部 = ⚪ RELEASED 2026-10-09 12:0x） | GSC数据/index.json（FRESH / stalenessDays=1 / latestFreshData 2026-10-09）
DELIVERED: .hermes/logs/2026-10-10-ZP-blog-deepfix.md（本报告 — 覆盖写; **本档零 src 改动**，见 §3 跨车道避让硬判定）
NEXT: ① host 先解 §3 的 blog-data 撞车锁定态（daily-content 00:35 BLOCKED 遗留）② 下一批按 §4 清单修 2 篇 × 3 locale 的 markdown FAQ 包装标签（≤3 篇/批, 只改标签零改文案）③ K3 一句裁 MOQ 真值（信封 100 或 500 / 贺卡 4 SKU 对齐 10, §5）④ 2026-10-17 周六按大脑第 4 条轮换 books/catalog 簇（§4.4 已给 11 个候选 slug, 只读准备完成）

**RETRY_OF**: 无 — `run-context.retry_queue = []`（契约 §二.3: 无待重做项, 故不写 RETRY_OF）。反向确认: lane-status 10 条 `problems` 中与本 lane 相关的仅「ZP-blog-deepfix 2026-10-03 -> MISSING」+「scheduler LastTaskResult=2147946720」= 调度器层 0x80070020 启动失败（`request_human`, 非车道可自愈项）, 本轮不伪重跑。

**ALREADY_DONE（幂等判定, 契约 §二.1 + §二.2 + §0.23.2 双方法复算）**:
1. 00:17 档（run_id `ZP-blog-deepfix-20261010T001710` / bus verdict=OK / guard.ok=true / files=`src/data/sku-seo-data.ts` / head `92845293`）已按 K3 大脑 2026-10-09 本车道第 1 条交付 greeting-cards 6 SKU 场景句 → 本轮**零重做**。
2. 00:43 档（报告 `ab851992`）已对本车道第 1-3 条做完只读复核与缺口定位 → 本轮**不重复其结论**, 只做增量: 独立在盘复核（§2）+ 3 项新定位（§4/§5/§6）。
3. **方法 1（机器键）**: `run-context.idempotency.this_run_key = 37eaab37ee14ebaf`; 00:43 档报告首段自述其 CONSUMED 的 run-context 键**同为 `37eaab37ee14ebaf`** ⇒ 同键命中。
4. **方法 2（证据账本, 优先级更高）**: `run-context.previous_run.bus_record` = verdict OK / state completed / report=本文件路径; lane-runs.jsonl L20 独立确认 `files:["src/data/sku-seo-data.ts"]` + §2 逐行在盘复核一致 ⇒ 同目标准确已交付。
5. **两次结论一致** ⇒ 幂等成立, 不重做。⚠️ 机器键**双口径不一致仍未修**: run-context 键 `37eaab37ee14ebaf` ≠ 总线键 `e5038594dc97fb9f`（同一 lane 同日, lane-runs L20/L25 双记录同键）⇒ 契约 §二.2 的键判重当前**永远命中不了**, 这正是本轮必须走方法 2 的原因（挂账沿用 #10）。

---

## SOP-10 5 问门禁（K3 §0.22）

1. **架构差异?（查前序任务实现路径）** ✅ 先查前序落地路径再动手: `aa1bd8f7`（lane 产物自动提交 2026-10-10 00:17）+ `92845293`（报告提交）+ `ab851992`（00:43 报告提交）证明前两档是**已落盘真实交付**; 本轮据此走「幂等命中 → skip + 增量只读定位」路径, 而不是第二次改写同一批文件。同时实测生产链路 `zprintpro-sku-seo-data.csv → csv-to-sku-seo.mjs → src/data/sku-seo-data.ts → PDP meta` 的在盘结果（§2）。
2. **约束适用范围?（查 K3 拍板原文）** ✅ ① 大脑 2026-10-09 本车道第 1 条 = 「6 SKU 描述补 holiday/年賀状 场景句（各 ≤1 句, **零 title 改动**）」——上档已交付。② 大脑第 2 条（FAQ regex 格式扫描）: 本轮指出其**技术前提需校正**（§4.1, 那 3 个块不是 HTML、不走 `extractFaqFromHtml`）并把它落到真正生效的面上（blog 正文）。③ 大脑第 3 条明文「**只读**, 缺陷入报告挂账, **不擅自修**」→ §6 只读、不改写。④ §0.0（2026-09-12 解禁块）: 零触及名片展示层/SEO 层, 未删改贺卡资产, 未动 middleware 301。⑤ v9.3 任务 J「不改 slug、不砍页、不回滚已部署 title」: 零违反（本档零 src 改动）。⑥ 冻结名单（`zprintpro-en-us-images/` · `_batch*.py` · `Rush*` · `page.redesign.tsx` · `src/services/rush/*`）: 零触及。
3. **原数据/拍板来源?（3 问）** ✅ ① 拍板来源: K3 大脑 2026-10-09（`docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md` 本车道 4 条）+ 契约 v1 + AGENTS.md §0.35。② 是不是真数据: **是**。本报告所有数字均带文件 + 行号, 可逐条复算（products.ts / category-seo-content.ts / category-conversion-blocks.ts / sku-seo-data.ts / blog-data JSON / blog/[slug]/page.tsx / lib/metadata.ts / lib/seo.ts / lane-runs.jsonl）; GSC 侧**零词级数字引用**。③ 留/撤: **留** — 未撤任何数字/文案/报告; 对前档挂账做的是「证据补强」而非撤回。
4. **字段值策略?（certNo/validUntil/issuer 全空）** ✅ 未新增/改写任何 `certNo`/`validUntil`/`issuer`; 未引入联系方式变更（沿用既有 +86 198 8085 1334）。
5. **Markdown 渲染?（`[text](url)` 必须 parseInlineLinks）** ✅ 本档零 user-facing 文本产出（只写内部报告）; 报告内链接均为内部路径与可粘贴命令 ⇒ `parseInlineLinks()` 不适用。

**门禁结论**: 5 问全过。

---

## 数据来源（K3 §0.23 强制 / §I.2 三段必含）

```
数据来源:
- 结果总线: .hermes/logs/run-context-ZP-blog-deepfix.json（2026-10-10 05:37:01）+ .hermes/logs/lane-status.json（2026-10-09 23:48 本地 / 15:48:45Z）+ .hermes/logs/lane-runs.jsonl（25 条, 本 run 全量读回）
- 前序交付账本: .hermes/logs/2026-10-10-ZP-blog-deepfix.md（00:43 档, 276 行, 覆盖写前读回）+ lane-runs.jsonl L20/L23/L25 + .git 提交链（92845293 / ab851992 / 38c009fe）
- 在盘复核对象: src/data/sku-seo-data.ts（L1224-L2931 区段）+ src/data/products.ts（greeting-cards L148-L667; envelopes L5989-L6345; red-packets L3727-L4257）+ src/data/category-seo-content.ts（L1472/1506/1530 · L1571/1605/1630 · L2092/2134/2158 · L2191/2233/2257）+ src/data/category-conversion-blocks.ts（L2365 flyers:ja / L3470 envelopes:en / L3596 envelopes:ja）
- FAQ 格式取证: src/app/[locale]/blog/[slug]/page.tsx（L879-L898 extractFaqFromHtml 同源正则 / L1041 `extractFaqFromHtml(post.content)` 原始 content 直传）+ scripts/guards/blog-quality-12-rules-guard.js（L77 段9 规格 / L93 同源声明 / L246-L255 段9 判定 / L375+L429 扫描面 = PILLAR_SLUGS）+ .hermes/regression-guard/blog-12seg-baseline.json（updated_at 2026-09-21T03:22:13.646Z, 57 条 FAIL, **段9 命中 0 条**）+ src/data/blog-data/{zh-hk,en,ja}.json（zh-hk L128 restaurant-opening-flyer-printing-guide / L138 pet-food-sticker-printing-guide; en L127/L145; ja L135/L145）
- 技术底座只读取证: src/lib/metadata.ts（L19-L29 alternates.languages）+ src/app/[locale]/guide/[slug]/page.tsx（L35 createMetadata 唯一调用点）+ src/lib/seo.ts（L175/L204/L235 NAP sameAs; L1030-L1032 baseSchema sameAs; L1783-L1785 Organization sameAs）+ src/components/insights/HKPrintInquiryIndex/OrganizationSchema.tsx（L38）
- 线上探针（web_fetch, 本档 1 条新增, HTTP 200）: https://zprintpro.com/ja/category/envelopes/（2026-10-10 拉取; 正文可见 100 与 500 两套 MOQ 并存 + 「15,000人以上のお客様」）
- GSC 新鲜度: GSC数据/index.json（lastBuild 2026-10-10T22:43+08:00; latestFreshData 2026-10-09; stalenessDays=1; freshnessStatus FRESH; totalFiles=163; 注记「连续第 2 档缺 3mo 窗, 待 10/12 补」+「10/10 ZP-gsc-feedback lane 已消费」）
- 并发状态: SESSION_LOCK.md 顶部 = ⚪ RELEASED（2026-10-09 12:0x, 748e628d + 981025df）; .hermes/locks/lane.lock 由本 lane preflight 持有（pid 37156 @ 05:37:01）
- 环境: pwsh 工具在本 lane 沙箱被禁（v9.4 rearm 2026-09-14 环境注记, 明示不重试）⇒ node/git/curl/tsc/build/门童命令 **均未在 lane 内运行**, 由 host-side wrapper 执行; 不虚报 PASS

校准状态: ✅ GSC 侧 FRESH（数据日 2026-10-09 / stalenessDays=1 / <72h 门）; **本档未消费任何 GSC 词级数字**（主交付为幂等复核 + 存量缺口定位, 不依赖 GSC 选词）⇒ 报告内零 GSC 后台黑话、零词级数字（门童 #16 语义自检通过; §K.1.3 新鲜度闸门不触发数字结论）。
撤回声明: 无（未撤回任何前序报告; §4/§5/§6 对前档挂账做的是证据补强与范围收窄）。
```

### §I.1 4 口径对照表（per §0.33.1; 本报告含 SKU/篇目计数 → 必填）

| 口径 | 真实数量 | 类型 | 本报告何处使用 |
|------|---------|------|----------------|
| zh-hk.json unique slugs | 79（9/2 校准**继承值**） | zh-hk 页面内容 | §4.2（不改写该文件, 仅取证） |
| en.json unique slugs | 80（继承值） | en 页面内容 | §4.2 |
| ja.json unique slugs | 80（继承值） | ja 页面内容 | §4.2 |
| blog-posts.ts SSoT entries | 85（继承值） | SSoT 配置 | §4.4 books/catalog 候选筛选 |
| **greeting-cards SKU 携带 MOQ 文案** | **6**（其中 **2** = 10、**4** = 100） | `sku-seo-data.ts` 逐行 | §2 / §5 |
| **envelopes MOQ 冲突源** | **4 源**（products.minQuantity / products.faqSchema / category-seo-content / category-conversion-blocks） | 仓内实测 + 线上 | §5 |
| **红封同型冲突源** | **2 源**（products.faqSchema 500 / minQuantity 100） | 仓内实测 | §5 |
| **markdown-FAQ 风险篇目** | **2 篇 × 3 locale = 6 篇目** | blog-data JSON 实测 | §4.2 |
| **本档实际改动文件** | **0 src + 1 报告** | 仓内实测 | 全篇 |

> 上表 79/80/80/85 为 §I 于 2026-09-02 09:00 的**继承值**, 本档未复算（不涉篇数结论）。**已记录的漂移**: 10/10 00:28 daily-content 实测 zh-hk 100 / en 101 / ja 100, 与本表差 20+ 条 → 该口径债已由 daily-content 报告 §10.2 列 `need_human`, 本档**不重复挂账、不擅自改写校准表**（口径属 K3 拍板层）。

---

## 1. 本轮性质与幂等账本

本档是**当夜第 8 次 lane 触发**、本 lane 当夜第 3 次触发。lane-runs.jsonl 实测当日已有 8 条（本 run 全量读回 L17-L24）:

| 时刻 | lane | verdict | 备注（files） |
|---|---|---|---|
| 00:01:37 | daily-content | OK | blog-data×3 + blog-posts.ts + blog/[slug]/page.tsx |
| 00:07:15 | gsc-feedback | OK | .hermes/industry-keyword-matrix.json |
| 00:10:56 | weekly-meta | OK | src/lib/seo.ts |
| **00:17:10** | **blog-deepfix** | **OK** | **src/data/sku-seo-data.ts（本档的「已交付」对象）** |
| 00:21:33 | monthly-matrix | OK | — |
| 00:23:56 | k3-review | OK | — |
| 00:35:33 | daily-content | **BLOCKED** | **wrapper_exit=4; pre-commit guard 拒绝 5 个生产文件; pushed=false** |
| 00:38:40 | gsc-feedback | OK | report=NONE |
| 00:47:33 | blog-deepfix | OK | files=[]（仅报告提交 ab851992） |

**不重犯（契约 §二.5）**: 前档 `guard.ok=true`（无拦截）; lane-status `warnings=[]`（无 `DUPLICATE_IDEMPOTENCY_KEY`）。本档零 src 写入 ⇒ 天然规避前档教训面。**唯一复发项** = §1.5 的幂等键双口径（挂账 #10 未修）。

---

## 2. 独立复核 — 前档交付物在盘核验（read-only, 逐行）

| 复核项 | 方法（第二方法独立于前档叙述） | 结果 |
|---|---|---|
| greeting-cards 6 SKU `minQuantity` 真值 | grep `^    (slug\|minQuantity):` on `products.ts`（按行号归属） | ✅ L179 / L276 / L375 / L473 / L569 / L667 **全 = 10**（前档「10 起印有据」成立） |
| thick 400g 场景句（上档新写） | grep `年賀状\|New Year\|新年賀卡` | ✅ L2770（zh「新年賀卡」）/ L2777（en「New Year cards」）/ L2784（ja「年賀状」） |
| foil 场景句（上档新写） | 同上 | ✅ L2806 / L2813 / L2820 三语齐 |
| spot-uv / matte / rounded 场景词 | 同上 | ✅ L2849「New Year」/ L2856 / L2885 / L2892 / L2921 / L2928 齐 |
| ALREADY_DONE 两项（premium / matte） | 同上 | ✅ premium L2748（ja 已含 年賀状）⇒ 与前档「零改写」判定一致 |
| 前档报告可追溯 | lane-runs L20/L25 + 前档自述 | ✅ `92845293`（00:17 产物）+ `ab851992`（00:43 报告）双提交；本轮覆盖写前已读回全文 |
| CSV↔TS 一致性 | — | ⚠️ **本档未逐行回读 CSV**（大文件 grep 噪音 + lane 无 node）；仍以 host `node scripts/csv-to-sku-seo.mjs` 为唯一判据（§8-1）——**不虚报为已验证** |

**结论**: 前档 `DELIVERED` 声明与在盘事实**一致**, 无虚假交付、无数据丢失（旧版报告存于 `92845293` / `ab851992`）。

---

## 3. 硬判定: 为什么本档必须零 src 改动（跨车道避让, 契约 §二.6）

**规则**: 契约 §二.6 + 本轮 STEP 0 指令 —— 「never rewrite a file that a sibling lane touched today（cross-lane collision guard）」; 根因 = 9/19 `zh-hk.json` 双写撞车事故。

**实测（lane-runs.jsonl L17-L24, 今日被**他**车道动过的文件）**:

| 文件 | 今日动它的车道 | 本档是否可写 |
|---|---|---|
| `src/data/blog-data/{zh-hk,en,ja}.json` | daily-content（00:01 OK + 00:35 **BLOCKED**, pushed=false） | ❌ **禁写**（撞车 + 树内可能有该 lane 未决改动） |
| `src/data/blog-posts.ts` | daily-content（同上） | ❌ 禁写 |
| `src/app/[locale]/blog/[slug]/page.tsx` | daily-content（同上） | ❌ 禁写 |
| `src/data/sku-seo-data.ts` | **本 lane** 00:17（非 sibling） | ⚠️ 同 lane 幂等命中 → 本轮不重做（§1） |
| `src/lib/seo.ts` | weekly-meta（00:10） | ❌ 禁写 |
| `.hermes/industry-keyword-matrix.json` | gsc-feedback（00:07） | ❌ 禁写 |

**后果（直接影响本轮可交付面）**: 本 lane 的「存量清理」主力面（段 9 FAQ 包装标签修复 / 段 12 内嵌去重）**全部落在 `blog-data/*.json`** ⇒ **本轮物理上不可执行**, 不是选择延后。§4.2 已完成下一批的**只读取证与清单**, 待 host 解掉撞车锁定态后即可施工（≤3 篇/批, 只改标签零改文案）。

---

## 4. 新增发现 A（🟠 P1-P2）— 大脑第 2 条 FAQ regex 扫描: **口径校正 + 真实风险清单**

### 4.1 校正: 被点名的 3 个块**不经过** `extractFaqFromHtml`（前档未点出）

大脑第 2 条原文点名 `envelopes:en` / `envelopes:ja` / `flyers:ja` 三块「过 `extractFaqFromHtml` 可解析性」。实测**技术前提不成立**:

- `extractFaqFromHtml` 在全仓**只出现于** `src/app/[locale]/blog/[slug]/page.tsx`（L879 定义 / L1041 消费 `post.content`）——即**只作用于 blog 正文 HTML**。
- 被点名的三块是 `src/data/category-conversion-blocks.ts` 的 **categoryConversionBlocks** 结构化对象（`flyers:ja` L2365 / `envelopes:en` L3470 / `envelopes:ja` L3596），字段为 `quickAnswers[{q,a}]` + `newFaqs[{q,a}]`（类型定义 L68）。
- 其消费路径是 `src/app/[locale]/category/[slug]/page.tsx` L350-L387: `quickAnswers` → `generateFaqSchema` → `newFaqs` 三者**按问题文本归一化去重**后**直接组装 FAQPage JSON-LD**（`{'@type':'FAQPage', mainEntity}`）——**全程无 HTML 正则解析**。

⇒ 这 3 个块**不存在** regex 解析失败风险; 对它们的正确断言 = 「块非空 + q/a 非空 + FAQPage JSON-LD 在 head 生成」。而真正有静默丢失风险的，是 **blog 正文**（§4.2）。前档把该子项记为「代码级链路结论成立 + head 级线上验证未做」，本档把**口径错位**这一层补上。

### 4.2 真实风险清单（新增, 双方法复算 §0.23.2）

**风险机理（代码级铁证）**: `extractFaqFromHtml(post.content)` 直接吃**原始 content**（L1041, 无 markdown 预处理）, 正则要求 `<p[^>]*><strong>Q…[:：]…</strong>(<br/>)? A…[:：]…</p>`（L888）; 返回 `null` ⇒ `faqJsonLd=null` ⇒ **线上静默失去 FAQPage**。

**双方法取证（两次独立命中同 6 行）**:

| # | 方法（独立正则） | 命中 |
|---|---|---|
| 1 | `\\n\*\*Q1[:：]`（markdown Q1 + 全/半角冒号） | **6 行** |
| 2 | `\\n\*\*Q4[:：]`（同族第 4 问, 与正文自述「4 條 FAQ」互证） | **同 6 行** |

**6 篇目（2 篇 × 3 locale, 全部是 `**Q1: …**` markdown 形态 → 正则解析不出）**:

| 篇目 slug | zh-hk | en | ja | 正文自述 |
|---|---|---|---|---|
| `restaurant-opening-flyer-printing-guide` | L128 | L127 | L135 | 「4 條餐飲東主最常問嘅 FAQ」/「4 of the most common questions」/「よくある質問 4 件」 |
| `pet-food-sticker-printing-guide` | L138 | L145 | L145 | 「4 條品牌創辦人常見 FAQ」/「4 of the most common FAQs」/「よくある質問 4 件」 |

**对照组（说明格式纪律已被覆盖的形态）**:
- `<li><strong>Q1` = **0 命中**（列表形态 FAQ 已不存在; 早期 `<li><strong>Q` 命中 31 行经查为 `<li><strong>QR Code…` 类, 非 FAQ）。
- `<p><strong>Q1[:：]` 形态广泛存在（多数 12 段文章走此形态）⇒ 段 9 纪律在**多数**篇目已落地, 本清单是**遗留尾巴**。

**门童 #14 的覆盖面盲区（新增, 需 host 复核）**: `blog-quality-12-rules-guard.js` 的段 9 判定（L246-L255）正是「0 组可解析 + 正文有 FAQ 语义 = FAIL → FAQPage 静默丢失」, 但其扫描面 = `PILLAR_SLUGS`（L45 / L375 / L429）。`.hermes/regression-guard/blog-12seg-baseline.json`（台账 updated_at **2026-09-21**, 57 条 FAIL）**段 9 命中 0 条** ⇒ 上述 2 篇**不在被扫集合**, 或已脱出。**本档不断言台账失效**, 只给 host 单篇复跑定性命令（§8-4）。
**附带未定性项（诚实边界）**: `en.json` 另有 `<h3…>Q[0-9][:：]` 命中 9 行（= H3 承载 Q1: 的形态）。它可能是段 3 的「问句式 H3」, 也可能是 FAQ 以 H3 承载（若后者则为同类丢失）。本轮**不作缺陷主张**, 列 OPEN + host 复跑命令。

### 4.3 建议修法（A/B/C + 推荐, §0.2 禁只抛问题）

- **A（推荐）**: 严格按门童 #254 处方——**只改包装标签、答案文字逐字保留、零改文案**（`**Q1: 问?**\n答` → `<p><strong>Q1: 问?</strong><br/>A: 答</p>`）; 每批 ≤3 篇; 改后跑门童 #14 `--slug` 单篇 + `--online` 复验段 9/段 12。**先决**: §3 撞车解锁。
- **B**: 同时把 `restaurant-opening-flyer-printing-guide` / `pet-food-sticker-printing-guide` 纳入门童 #14 扫描面（或扩为全量 blog-data 扫描）→ 防复发; 属门禁改动, 需 host 侧评估运行时长。
- **C**: 只修 zh-hk/en 留 ja —— **不推荐**（ja 是同一缺陷, 且 3 locale 一致性是本车道硬约束）。

### 4.4 大脑第 4 条轮换准备（下一周六 books/catalog 簇, 只读）

`blog-posts.ts` 实测候选 **11 个 slug**: `book-buying-guide`(L203) / `saddle-stitch-booklet-printing-guide`(L491) / `graduation-yearbook-printing-guide`(L854) / `construction-material-sample-book-printing-guide`(L1181) / `catalog-printing-guide`(L1535) / `catalog-printing-china-supplier-guide`(L1553) / `textbook-printing-guide`(L1800) / `school-exercise-book-printing-guide`(L1824) / `zine-small-batch-booklet-printing-guide`(L1941) / `childrens-picture-book-printing-guide`(L1971) / `photo-book-printing-guide`(L1998)。台账中已登记 FAIL 的 `school-exercise-book-printing-guide`（6 段 FAIL）/ `print-specifications-reference-guide-2026` 属同簇邻接, 轮换时优先。

---

## 5. 新增发现 B（🔴 P1）— MOQ 矛盾: **四源行号 + 新线上探针（ja 页）**

### 5.1 信封类（envelopes）: 同页两套 MOQ —— 四源定位（本档独立复算, 行号与前档一致）

| # | 源 | 位置（本档实测） | 声明值 | 线上可见性 |
|---|---|---|---|---|
| 1 | `products.ts` `minQuantity` | business L6016 · colored L6090 · large L6187 · pearl L6284（slug 起 L5989/6063/6160/6257） | **100** | 商品卡「100個〜 / [最小注文] 100 個」+ 报价引擎（结构性真值） |
| 2 | `products.ts` `faqSchema` | L6055 / L6152 / L6249 / L6345（4 SKU 同串） | **500**（「MOQ 500 pieces」） | PDP FAQ / FAQPage schema |
| 3 | `category-seo-content.ts` | en L1472（Why）· L1506（techSpecs Minimum Order）· L1530（FAQ）; ja L1571 · L1605 · L1630 | **500** | **线上实证**（Why ZprintPro 03 / 技術仕様 最小発注数） |
| 4 | `category-conversion-blocks.ts` | `envelopes:en` L3482「All four envelope types start at 100 pcs」; `envelopes:ja` L3608「4種類すべて100枚から」 | **100** | quickAnswers（线上实证） |

### 5.2 新线上探针（本档新增, HTTP 200）— `/ja/category/envelopes/`

前档只验了 `/en/category/envelopes/` 与 `/ja/category/flyers/`; 本档补验 **ja 信封页**, 结论**同型复现**:
- 100 侧: 「4種類すべて**100枚**から」（quickAnswers）/ 4 张商品卡「[最小注文] **100 個**」+「**100個〜**」。
- 500 侧: Why ZprintPro 03「**500枚から**（デジタル印刷）」/ 技術仕様→最小発注数「**500枚から**（デジタル印刷）。5,000枚以上はオフセット印刷がお得。」/ Industries 卡「**500枚**から・5日納品」。
- 附带: 同页「**15,000人以上**のお客様に選ばれています」（vs about 页「1,000+ global brands」vs K3 8/19 拍板 1,000+）⇒ 挂账 #7 的**范围再确认**。

### 5.3 红封同型（范围再扩大, 本档独立取证）

`products.ts` `faqSchema` 6 个红封 SKU **同串写「MOQ 500 pieces」**（L3792 / L3887 / L3980 / L4071 / L4164 / L4257）, 而 6 个 SKU `minQuantity` **全 = 100**（L3755/3828/3921/4014/4105/4198）; `category-seo-content.ts` 红包同型块亦写 500（en L2092/2134/2158; ja L2191/2233/2257, 且 ja h2 L2176 写「500枚から」）⇒ 与信封**同一缺陷族**（疑似把「5,000+ 柯式推荐档」错位搬进 MOQ 字段）。

### 5.4 A/B/C + 推荐（§0.2）

- **A（推荐）**: 以 `minQuantity` 为唯一真值（信封 **100** / 贺卡 **10** / 红封 **100**）, 把源 2/3 的「500」改为真值, 并把「5,000+ 柯式推荐」保留为**加价阶梯**表述; 沿用 flyers/same-day-flyers 先例（已在线上验证的做法）。
- **B**: 若业务上确为「500 起（数码）/100 起（团购）」双档, 须**回填第二字段**并同步商品卡与报价引擎 —— 属数据层 schema 变更, **不得由本 lane 自裁**。
- **C**: 只改 `category-seo-content.ts` 消线上矛盾而留 `faqSchema` 500 —— **不推荐**（矛盾从「同页」转移为「页 vs schema」）。
- **纪律**: 这是**客户可见商务声明**（MOQ）, 真值须 K3/产品一句确认（§0.22 SOP-10 第 3 款: 不推断数字）。**本档零改动**（叠加 §3 撞车锁定）; 且 `sku-seo-data.ts` 属**派生文件**, 修复必须走 CSV 源头 + 生成器（SOP-5 禁手搓）——lane 无 node, host 侧执行。

---

## 6. 只读技术底座审计（大脑第 3 条, 本轮加深: 范围收窄 + 同一性盘点）

1. **`/guide/[slug]` hreflang 缺陷 —— 范围已收窄为「仅 guide 页」（确认挂账 #5, 且不是全站）**
   - `createMetadata`（`src/lib/metadata.ts` L12）**全仓唯一调用点 = `src/app/[locale]/guide/[slug]/page.tsx` L35**（grep 实测 2 命中: 定义 + 调用）⇒ 影响面 = guide 页, **不波及** category/product/blog 页。
   - 缺陷本体（L19-L29）: `alternates.languages` 硬编码为 **locale 根 URL**（`zh-Hant-HK→/zh-hk`, `en-US/en-GB/en-AU→/en`, `ja→/ja`）, `x-default→/en` ⇒ guide 页互指**语言首页**而非同篇 guide 页, 跨语言聚类失效。
   - 口径三方不一致（**须 K3 一句裁**）: 本文件实写 `zh-Hant-HK` + `x-default→/en`; AGENTS.md §5 声明 `zh-hant-HK` + `x-default=zh-hant-HK`; AGENTS.md §0.36.3 缺口 #2 记录为「实现 zh-HK / x-default→`/`」。⇒ 与 §0.36.3 的 `待 K3 拍板` 状态一致, 本轮**不改写**。
2. **Organization `sameAs` ×3 locale —— 已非「空壳」, 但存在**多定义并存**风险**
   - NAP 路径（`seo.ts` L175/L204/L235, zh-hk/ja/en 各一）: 每 locale **2 条真实 GitHub 锚点**（L177-178 / L206-207 / L237-238, 注释标注 2026-09-30 W2 Phase 1.2 HTTP 200 已验）⇒ §0.36.3 缺口 #1「sameAs 空壳」在该路径**已收口**。
   - **并存的第二、第三定义**: `seo.ts` L1783-L1785（X + LinkedIn + GitHub 共 4 条）; `src/lib/seo/schema-extensions.ts` L381/L391/L401; `HKPrintInquiryIndex/OrganizationSchema.tsx` L38; 另有 L1032「`nap.sameAs.length>0 ? nap.sameAs : []`」的降级分支。
   - ⇒ 风险 = 同一站可能出现**字段集不同的 Organization 实体**（实体消歧负面）。**本轮只读登记**, 是否收敛为单一定义源 = 需 K3 拍板（src 行为变更）。
3. **canonical**: 本档未复算（前档已记「独立 canonical」子项; 属只读项, 无新增证据）⇒ 保持前档状态, 不注水。

---

## 7. 挂账清单（更新: 前档 13 项 → 本档 15 项, 状态变化已标）

| # | 级别 | 项 | 证据 | 状态变化 |
|---|---|---|---|---|
| 4 | 🟠 P2 | `+22%` 无来源 | `category-conversion-blocks.ts` L2402 等 | 未变（本档未再扩面） |
| 5 | 🔴 P1 | `/guide/[slug]` hreflang 全指 locale 首页 + x-default→/en | `lib/metadata.ts` L19-29 → `guide/[slug]/page.tsx` L35（**唯一调用点已实证**） | **范围收窄 + 定性完成**（仅 guide 页） |
| 6 | 🔴 P1 | envelopes 同页 MOQ 矛盾（500 vs 100） | §5.1 四源行号 + §5.2 **ja 页线上新证** | **证据加强**（en 之外 ja 同样复现） |
| 7 | 🟠 P2 | 无来源数字「15,000+」 | §5.2 ja 页「15,000人以上」 vs about 页「1,000+」vs K3 8/19 拍板 | **范围再确认** |
| 8 | 🟡 P3 | 块内 `title`/`metaDescription` 死字段（0 线上效果） | 前档 §3.2 | 未变 |
| 9 | 🔴 P1 | greeting-cards 4/6 SKU MOQ=100 文案 vs `minQuantity=10` | §2 逐行（L2741/2748/2849/2856/2885/2892/2921/2928 vs products L179/473/569/667） | 未变（待 K3 一句裁） |
| 10 | 🟠 P2 | 幂等键双口径（`37eaab37ee14ebaf` vs `e5038594dc97fb9f`） | §1.5 + run-context + lane-runs L20/L25 | **本轮再次实测复现**（仍未修） |
| 11 | 🟠 P2 | daily-content 00:35 **BLOCKED 遗留 5 个脏生产文件** | lane-runs L23 | **升级为硬阻塞**: 直接锁死本 lane 本轮 src 面（§3） |
| 12 | 🟡 P3 | 线上 head 级 FAQPage JSON-LD 验证仍缺 | `web_fetch` 不回传 head | 未变（host curl, §8-5） |
| 13 | 🟡 P3 | GSC 索引持续缺 3mo 窗（连续第 2 档） | `GSC数据/index.json` stalenessNote | 转记（属 gsc-feedback lane） |
| 14 | 🟠 P1 | **markdown-FAQ 6 篇目 → FAQPage 静默丢失**（§4.2） | 双方法各命中同 6 行 | **本档新增** |
| 15 | 🟡 P2 | **门童 #14 段 9 扫描面 = PILLAR_SLUGS, 上述 2 篇不在被扫集合**（§4.2） | guard L45/L375/L429 + 台账段 9 命中 0 | **本档新增（待 host 定性）** |
| 16 | 🟡 P3 | **红封同型 MOQ 500/100 冲突 + sameAs 多定义并存**（§5.3 / §6.2） | 行号见正文 | **本档新增** |

**不在本 lane 范围（仅登记, 不越权）**: lane-status 10 条 `problems` 全为**调度器层**（4 条 `2147946720`=0x80070020 / `267009`=任务运行中 / `267011`=未运行）→ 属 host 管理员动作, 依契约 §二.3 `request_human`。

---

## 8. 可粘贴验收命令（host 侧; 本 lane pwsh/node 被禁, 故不代跑）

```bash
cd /d F:\zprintpro-nextjs

# 0) 先解 §3 撞车锁定态（必做, 否则下一批 blog-data 改动会继承同一拦截）
git status --porcelain -- src/ | head -20
git diff --stat HEAD -- src/data/blog-data src/data/blog-posts.ts src/app/\[locale\]/blog/\[slug\]/page.tsx

# 1) 前档交付一致性（唯一判据）: 6 个 greeting-cards slug 不得出现意外变化
node scripts/csv-to-sku-seo.mjs

# 2) 类型基线
npx tsc --noEmit                                   # 期望 54=54 持平

# 3) 12 段骨架门禁（存量清理车道口径）
node scripts/guards/blog-quality-12-rules-guard.js --baseline --online --json

# 4) §4.2 定性: 逐篇单跑段 9（两篇 × 3 locale）, 期望 stderr 出 "0 组可被 extractFaqFromHtml 解析"
node scripts/guards/blog-quality-12-rules-guard.js --slug restaurant-opening-flyer-printing-guide
node scripts/guards/blog-quality-12-rules-guard.js --slug pet-food-sticker-printing-guide
#   附带定性 en.json 的 9 行 <h3…>Q[0-9][:：]（§4.2 未定性项）:
node scripts/guards/blog-quality-12-rules-guard.js --slug <该 9 行对应 slug> --json | head -40

# 5) 线上 head 级 FAQPage（本 lane 做不到）
curl -s https://zprintpro.com/en/blog/restaurant-opening-flyer-printing-guide/ | grep -c '"@type":"FAQPage"'   # 预期 0 = 本档发现成立
curl -s https://zprintpro.com/ja/blog/pet-food-sticker-printing-guide/         | grep -c '"@type":"FAQPage"'
curl -s https://zprintpro.com/ja/category/envelopes/ | grep -c '"@type":"FAQPage"'   # 类目页应为 ≥1（§4.1）

# 6) §5 MOQ 四源盘点（改前基线）
grep -n "500 pcs\|500枚\|MOQ 500 pieces" src/data/products.ts | head -20
grep -n "500枚から\|500 pcs" src/data/category-seo-content.ts | head -30

# 7) §6.1 guide hreflang 复核
grep -rn "createMetadata(" src/ | head
curl -s https://zprintpro.com/en/guide/<任一 slug>/ | grep -oE '<link rel="alternate"[^>]*>' | head -20
#   期望: 指向该 guide 页自身 ×4; 若指向 /zh-hk /ja 首页 ⇒ 挂账 5 复现

# 8) §1.5 幂等键口径核对（挂账 10）
grep -n 'this_run_key' .hermes/logs/run-context-ZP-blog-deepfix.json
grep 'ZP-blog-deepfix-20261010' .hermes/logs/lane-runs.jsonl
```

---

## 9. 决策登记簿 ID 列表（per §J.1.3）

- **D-10/10-BLOG-6**（前档 00:17 交付的**独立在盘复核** + 幂等命中判定）: 🟢 **DONE**（产物: §1-§2; 判据 = 逐行 grep + lane-runs L20/L25）
- **D-10/10-BLOG-12**（markdown-FAQ 6 篇目清点 + 修法 A/B/C）: 🟢 **DONE（分析）** / 🔴 **OPEN（落地）** — 待 §3 撞车解锁（产物: §4.2/§4.3）
- **D-10/10-BLOG-13**（FAQ regex 口径校正: 3 个类目块不走 extractFaqFromHtml）: 🟢 **DONE**（产物: §4.1 + 代码行号）
- **D-10/10-BLOG-14**（门童 #14 段 9 扫描面盲区, 待 host 定性）: 🔴 **OPEN**（产物: §4.2 + §8-4）
- **D-10/10-BLOG-7**（envelopes MOQ 四源定位 + A/B/C）: 🟢 **DONE（分析）** / 🔴 **OPEN（落地）** — 待 K3/产品一句确认真值（产物: §5.1）
- **D-10/10-BLOG-15**（ja 信封页线上 MOQ 矛盾新证 + 红封同型）: 🟢 **DONE**（产物: §5.2/§5.3）
- **D-10/10-BLOG-8**（greeting-cards 4/6 SKU MOQ=100 文案漂移）: 🔴 **OPEN** — 推荐对齐 `minQuantity=10`（产物: §2/§5.4）
- **D-10/10-BLOG-5**（guide hreflang）: 🟡 **IN_PROGRESS** — 本轮**范围收窄为仅 guide 页 + 三方口径不一致已列**（产物: §6.1）
- **D-10/10-BLOG-16**（Organization sameAs 多定义并存）: 🔴 **OPEN**（产物: §6.2）
- **D-10/10-BLOG-9 / -10 / -11**（幂等键口径 / `15,000+` 口径 / FAQPage head 验证）: 🔴 **OPEN**（产物: §1.5 / §5.2 / §4.1）

---

## 10. 升级 K3（1 段中文, 5 要素）

**① 修了什么**：本轮是**周六 05:37 法定档**, 但当夜 00:17 档已把您 10/9 大脑指令的本车道第 1 条（greeting-cards 6 SKU 场景句）真实交付（`src/data/sku-seo-data.ts`, head `92845293`）⇒ 依契约幂等铁律判定 **skip, 零重做、零 src 改动**。省下的算力全部转成**存量缺口定位 + 只读取证**, 并把**下一批的施工清单与解锁条件**备好。**必须说明**: 本轮**不可能**改 src —— 今日 `src/data/blog-data/*.json`、`blog-posts.ts`、`blog/[slug]/page.tsx` 已被 daily-content 车道动过（其中 00:35 那次被 pre-commit guard 拦下 `pushed=false`）, 按跨车道避让硬规则（9/19 撞车事故根因）本轮禁写; 本 lane 的存量清理主力面恰好全在这些文件上。

**② 深度证据**：①前档交付**逐行在盘复核一致**（6 SKU `minQuantity=10` @ products L179/276/375/473/569/667; thick/foil 三语场景句 @ sku-seo-data L2770-2820）; ②**大脑第 2 条的技术前提被校正**: 被点名的 `envelopes:en`/`envelopes:ja`/`flyers:ja` 是**结构化类目块**, 由 `category/[slug]/page.tsx` L350-387 直接组装 FAQPage, **不经** `extractFaqFromHtml`; ③真正的 FAQPage 静默丢失风险在 **blog 正文**, 已用**两种独立正则**（`\n**Q1:` / `\n**Q4:`）命中**同一 6 篇目**（`restaurant-opening-flyer-printing-guide` + `pet-food-sticker-printing-guide` × zh-hk/en/ja, 均为 markdown FAQ, 生产正则要求 HTML `<p><strong>Q…A…</p>`）——这正是门童 #14 段 9 定义的「写了 FAQ 但线上无 FAQPage」; ④**线上新证**: `/ja/category/envelopes/` HTTP 200, 同页 **100 枚**（quickAnswers + 4 商品卡）与 **500 枚**（Why ZprintPro / 技術仕様 最小発注数 / Industries）并存, 与 en 页同型 ⇒ 信封 MOQ 矛盾在 ja 亦复现; ⑤`/guide/[slug]` hreflang 缺陷**范围已实证收窄**（`createMetadata` 全仓唯一调用点 = guide 页 L35）, 且发现三处口径不一致（本文 `zh-Hant-HK`+x-default→/en vs AGENTS §5 vs §0.36.3）。

**③ 必须知情的结论（3 项）**：**(a)** 本轮**零 src 改动不是延后**而是**跨车道硬约束**（§3 表列出 6 个被占文件）; 除非先解掉 00:35 daily-content 的 BLOCKED 遗留（`pushed=false`, 5 个生产文件可能仍在树里）, 否则下一个 lane 的 commit 会**继承同一拦截**。**(b)** 请 K3 一句裁 MOQ 真值: 信封（推荐以 `minQuantity=100` 为唯一真值, 沿用 flyers 先例）与贺卡 4 SKU（推荐对齐 **10**）; 红封 faqSchema 同型 500/100 冲突一并纳入同批。**(c)** 幂等键双口径（`37eaab37ee14ebaf` vs `e5038594dc97fb9f`）**本轮再次复现**, 机器判重当前永远命中不了, 靠「上一轮 report+files 证据账本」才判准（§0.23.2 双方法救了一次）。

**④ 5 步 verify**：前档交付在盘复核 ✅（7 项逐行）· 幂等判定双方法一致 ✅（键 + 证据账本）· FAQ 格式双方法一致 ✅（2 正则同 6 行）· 线上探针 1/1 HTTP 200 ✅（ja 信封页含 100/500 双证 + 15,000人以上）· 只读技术审计 ✅（guide 调用点 1/1、sameAs 多定义 4 处）· **机器门禁（tsc / build / 门童 exit 0 / head 内 FAQPage JSON-LD / 生成器 dry-run）⛔ 未执行**（pwsh 被 lane 沙箱禁, v9.4 环境注记明示不重试）→ 已转 §8 可粘贴命令, **不虚报 PASS**。

**⑤ 下一步**：① host 先清 §3 撞车锁定态（§8-0）; ② 下一批 ≤3 篇按 §4.3-A 修 markdown FAQ 包装标签（只改标签、答案逐字保留）, 改后跑门童 #14 `--slug` + `--online` 复验段 9/段 12; ③ 请 K3 裁两件 MOQ 真值 + `15,000+` vs `1,000+` 口径（挂账 #7）; ④ **2026-10-17 周六**按大脑第 4 条轮换 **books/catalog 簇**（§4.4 已给 11 个候选 slug, 优先 `school-exercise-book-printing-guide`）。

---

## 附：本档做不到 / 未做（诚实边界, 不得当作结论使用）

| # | 项 | 原因 |
|---|---|---|
| 1 | 跑 `node` / `git` / `curl` / `tsc` / `build` / 门童命令 / 生成器 | pwsh 工具在本 lane 沙箱被禁（v9.4 rearm 明示不重试）⇒ 由 host wrapper 执行; 已给 §8 命令 |
| 2 | 任何 src 写入（含 §4 FAQ 包装标签修复、§5 MOQ 修复） | **跨车道避让硬约束**（§3: 今日 6 个文件被他 lane 占用, 含 1 次 guard BLOCKED） |
| 3 | `src/data/blog-data/*.json` 逐行全文回读 | 单行 8-15k 字符, 工具面输出会被截断 ⇒ 只用「正则命中 + 行号 + 双方法互证」取证, 并保留单篇复跑命令 |
| 4 | 线上 head 内 FAQPage JSON-LD / hreflang 实证 | `web_fetch` 不回传 `<head>`（本轮 1 URL 实测再次确认）⇒ 结论停在代码级 + host curl |
| 5 | §4.2 en.json「`<h3…>Q[0-9][:：]` 9 行」定性 | 无法在单行内做 AND 条件匹配（工具面限制）⇒ 列 OPEN + `--slug` 复跑命令, **不主张为缺陷** |
| 6 | CSV 逐行回读 / 生成器 dry-run | 大文件 grep 噪音 + lane 无 node; 以 host `node scripts/csv-to-sku-seo.mjs` 为唯一判据 |
| 7 | GSC 词级数字引用 / 选词 | 本档主交付为幂等复核与缺口定位, 不依赖 GSC 选词 ⇒ 不做二手引用（§K.1.4 证据链纪律） |

---

*Generated by deepseek harness（DSH lane `ZP-blog-deepfix`, v9.4 rearm 持续轮 · 周六 05:37 档 · 幂等命中 + 存量定位）· 2026-10-10 05:37 档 · 仓根 `F:\zprintpro-nextjs` · 覆盖写前 HEAD `ab851992` · 前档报告存于 `92845293` / `ab851992`*
