# GSC Suggested SRC Fixes — 2026-10-15 (lane ZP-gsc-feedback · 新档消费轮)

> 本 lane 写权限仅限 `.hermes/` + `GSC数据/index.json`，**零 src 改动**。下列为 10-15 新档（28d 数据日 10-12）+ 门禁审计产物 + 线上探针 + grep 实证驱动的 src/ 管道修复建议，待 K3 拍板后由 daily-content / weekly-meta / blog-deepfix / monthly-matrix 车道或人手会话排批执行（per v9.3 §S2：引用 slug 批次需先跑存在性校验）。
>
> 上轮挂账继承：`2026-10-13-gsc-suggested-src-fixes.md`（FIX-1~FIX-9）。
> **本轮性质**：**新 28d 档到窗 + W1 CTR 批上线 + 门童 #27 hard 8 首现** ⇒ 修复清单以「状态推进 + 新增 4 条（FIX-10~13）」为主，**不重述上轮已交付结论**。

---

## FIX-1 / FIX-2 [维持：挂账 → 已达标观察] 宣傳單張 / 包裝盒訂製 精确锚回補

- **本轮状态**：**不重算**（本 lane 无 src 写权；今日 blog-data 由 daily-content 车道动过与否见其报告，本 lane 未触碰）。
- **判定维持**：法1（精确内链锚）沿用 10/10 实测 **8/8 ≥3（首次满编）**；10-13 法2 交叉复核（8 词 43 行任意形态命中）**未复跑**（无新增证据需求，避免无谓算力）。
- **红线不变**：不改 slug / 不砍页 / 不动已部署 title（v9.3 任务 J churn 红线，title 冻结至 10/19）。

## FIX-3 [维持挂账第 5 轮 · 需 K3 确认口径] 全站 footer 实体地址不一致

- **本轮状态**：**未复探**（无新证据）。风险面不变：法律公示（§3 法务口径）+ NAP 一致性 + GEO 实体信号。
- **建议动作（候选，需 K3 拍板口径）**：footer 公司地址统一为深圳实体（如需 HK 存在感，保留「香港服務據點」式客服表述）。
- **执行车道**：全站共享 footer 组件（src 行为变更）⇒ 建议 K3 指定 batch 单独排批，不与内容批混推。

## FIX-4 [🟡 部分解除 · 剩 2 项] 数据管线：3mo 窗 + 多行 per-query 机器格式

- **本轮新增实证（三法）**：
  - 法1 `glob GSC数据/*2026-10-15*` ⇒ **10-15 档 ×12 全到**（24h/7d/28d × 三站点汇总 + hk/jp/us）；**无 3mo 窗**。
  - 法2 `.hermes/logs/gsc-cliff-2026-10-15.json` ⇒ 三站点 `latest_date = 2026-10-12`、`data_age_days = 3`、`alerts = []`（WARN_STALE 解除，无 CRITICAL_CLIFF）。
  - 法3 `.hermes/_gsc1015_queries.json` ⇒ 查询级**首次落机器格式**（hk28 553 / us28 525 / jp28 166 / hk24 64 / us24 26 / jp24 9 行），但**单行大 JSON**。
- **判定**：①「无新 28d 档」→ **解除**（4 个 zh T1 锁词等首要阻塞源消失）；②「无 per-query 机器格式」→ **部分解除**（有文件但单行，无 node 车道仍不可逐词解析）；③「3mo 窗」→ **连续第 4 档缺**（品牌长窗/长趋势仍不可算）；④「24h 机器格式」→ **未落**。
- **请求（K3 一次动作）**：下次拉档时 ① 勾选 **3 个月窗** ② per-query 落**多行**格式（每词一行；或恢复 §J-1.1 既定 `gsc-fresh-YYYY-MM-DD.json`）。
- **制度建议（我方可自办，需 node 会话）**：把「xlsx / 单行 JSON → 多行 JSON」固化为一步（如 `scripts/gsc-xlsx-extract.mjs --out .hermes/gsc-<date>/*.json`），并让 24h 档落 `.hermes/logs/gsc-24h-<date>.json`（逐小时 clicks/imps + 窗口起止）⇒ 无 node 车道不必再依赖转录。
- **本轮已自办部分**：`GSC数据/index.json` 已补登 10-15 档 ×12（`totalFiles` 165→177）+ freshnessStatus STALE→FRESH（落盘日口径 0 天 / 档内数据日 10-12 = 龄 3 天）+ notes/actionRequired 更新（见本 run DELIVERED）。

## FIX-5 [状态推进 · W1 CTR 批已上线，真因修正] CTR 修复候选池

- **本轮新增事实（非重复）**：W1「CTR 歼灭批」4 词承接页 **10-15 01:48-01:57 上线**（commit `99269163` + `a330f967`；paper-bags / menus / packaging × 3 语 = 16 格 = 8 title + 8 desc）；本 lane 线上抽验 `/zh-hk/category/paper-bags/` `<title>` 与批内 zh 新值**逐字一致**。
- **根因修正（应回灌战略）**：原假设「0 点击 = 钩子失效」被实测推翻 ⇒ 真因 = **title 截断**（paper-bags zh/en/ja 当量 78/124/108；packaging en 94；menus 61/64 ⇒ 价格钩与品牌全在 Google 截断线后）+ **假价清毒**（menus HK$0.22/$0.14/¥20 无 SKU 支撑；packaging en $0.85 陈旧）。**推论（建议制度化）**：title 超线会**静默吞掉价格钩与品牌** ⇒ 承接页体检应把「当量带」列为 CTR 前置检查项。
- **验证窗纪律**：首判 = **下一份 28d 档（建议 10-22 导出）**；当前 28d 窗全部早于修复上线 ⇒ **此刻不得判 CTR 成败**。
- **红线不变**：title 冻结至 10/19；价格/MOQ/交期一律取 `src/data/products.ts` 真值（§0.23 / 门童 #24）。
- **待 K3 排批的第 2 批（维持 10/10 清单）**：食品包裝印刷 / 紙袋印刷 / 印刷紙袋 / 餐牌印刷 / ja 特急印刷 激安（其中 4 词已是 W1 批对象 ⇒ 本条转「验证窗盯梢」）。

## FIX-6 [🟡 部分闭合 · menus 幽灵价已由他人修复；books 仍开] MOQ / 价格口径漂移

- **menus 部分（本轮新增事实，只读登记）**：`category-conversion-blocks.ts` 的 `menus:zh-hk` 块（客户可见 + FAQPage schema 源）整体建立在**已下架**「一次性餐牌」SKU 上（hero `HK$0.22起` / 对比表整行 / FAQ 分档首条 / metaDescription 五類·100張起訂 / title 100張起）——**已由他人会话 10-15 同日修复 6 处**（`docs/2026-10-15-w1-ctr-batch-paper-bags-menus-packaging.md` §六 三层翻转案）。
- **books 部分**：**未复探**（不新增证据，不改判）。证据链仍见 10/10 报告（线上 `/zh-hk/category/books/` 正文「1 本起訂」vs `products.ts` BK-002 `minQuantity: 10`）。
- **合并建议不变**：books「MOQ 低至 100 張」漂移并入「MOQ 口径批 1」一次排批。
- **制度建议（需 K3 拍板）**：把 `category-seo-content.ts` / `category-conversion-blocks.ts` 纳入门童 #24 扫描域（现无 MOQ 目标档时 SKIP ⇒ 该两处不被覆盖）——**menus 幽灵价案正是该盲区的实证**，本条建议本轮证据已加强。

## FIX-7 [维持 · P0 挂 K3 §0.0 裁决] en greeting-cards 类目页 §0.0 敏感面 + 跨语言量词

- **证据（两法，本轮法1 = 本 lane 一手复验）**：
  - 法1 线上实测（web_fetch 2026-10-15，HTTP 200）：商品卡标题**仍为** `Thick Business Cards (400g+) · Free Shipping · ZprintPro`；卡片元信息**仍写** `[MOQ] 10 張`（繁中量词混入 en 页，全页 6 张卡）⇒ **与 10-13 实测一致，无变化**。
  - 法2 仓内路径继承：`docs/2026-10-12-recovery-lane-defense-plan.md` §5（v22 改名残留 6 槽，`thick-greeting-cards-400g` / `foil-greeting-cards`，含 en/ja keywords 繁中污染）。
- **为什么不擅自动**：§0.0 解禁块 (a)/(b)/(c) **未裁决**；恢复期红线⑤「不动贺卡资产 / 不动 middleware 301 / 不建名片页」。
- **请求（K3 一句话）**：裁决 (a)(b)(c) → 解锁 6 槽残留收口范围（**推荐 (c)**：只改 SKU 显示名/尺寸矛盾与 keywords 去毒，不动 301 与贺卡承接页）。

## FIX-8 [🟡 我方自办延续 · 数据管线] 实时档/新档入索引

- **上轮状态**：10-13 已把 10-12 / 10-13 两个实时档登记入 index，并诚实改写新鲜度。
- **本轮自办**：把 **10-15 档 ×12** 登记入 index（`filesByDate["2026-10-15"]=12`；`totalFiles` 165→177）+ `latestFreshData` 2026-10-09→2026-10-15 + `latestRealtimeData` 10-13→10-15 + `stalenessDays` 4→0 + `freshnessStatus` STALE→**FRESH** + `latestDataDateInFile` 10-05→**10-12** + `inFileDataAgeDays` 8→**3** + `notes["2026-10-15"]` / `actionRequired` / `stalenessNote` 更新。
- **仍未办（需他方）**：24h 档**机器格式**（`.hermes/logs/gsc-24h-<date>.json`）仍未落 ⇒ 恢复曲线的鲜源目前依赖 `gsc-cliff-*.json` 代理（可接受，但 xlsx 一断则曲线断，10-14 断档即实证）。

## FIX-9 [维持 · 🔴 超线] `/en/category/greeting-cards/` title 半角当量 ≈84（超 58 阻断线）

- **本轮复验（一手）**：`web_fetch` 2026-10-15 返回 `<title>` = `Business & Holiday Card Printing from $0.50 | Corporate Christmas 10 MOQ | ZprintPro`，**与 10-13 同字符串**（同字符串 ⇒ 当量同，前提成立）；84 当量仍为**存量超线第 4 条（最长）**。
- **判定 / 处置不变**：本批零动作（title 冻结至 10/19）；纳入 **10/19 title 解冻 TRIM 批**；TRIM 时保留 `Corporate Christmas` / `Holiday Card`（盲开承接词）与 `$0.50` 数字钩，优先删 `Business`、`10 MOQ`。
- **存量超线合批**：`services/catalog-printing-china` 77 / `rush-printing-delivery` en 66 / ja 59 ⇒ 解冻后共 **4 条**。
- **⚠️ 新增前置条件（见 FIX-10）**：10/19 TRIM 批若同时触碰门童 #27 hard 8 中的槽，会被 staged 硬拦 ⇒ **先清 FIX-10 再 TRIM**。

## FIX-10 [🆕 新增 · 🔴 下一步 title 作业前置债] 门童 #27 hard 8：7 条价格钩内战 + 1 条空洞词

- **证据（他人机器产物，本 lane 只读消费）**：`.hermes/logs/sku-title-v5-audit-2026-10-15.json` ⇒ `slotCount 252 / hardCount 8 / warnCount 28`；hard 明细：
  1. `small-batch-stickers` zh-hk：`… HK$0.45` ≠ `basePrice(zh-hk)=38`
  2. `small-batch-stickers` en：`from $0.045` ≠ `basePrice(en)=0.55`（并附 MOQ_DRIFT warn：50 ≠ minQuantity 10）
  3. `same-day-flyers` zh-hk：`HK$1.30起` ≠ `0.55`
  4. `same-day-flyers` en：`$0.16` ≠ `0.95`
  5. `same-day-flyers` ja：`¥25〜` ≠ `125`
  6. `a2-posters` zh-hk：`HK$9起` ≠ `16`
  7. `a1-posters` zh-hk：`HK$45起` ≠ `20`
  8. `white-card-boxes` zh-hk：空洞/条件承诺词 `免費送貨`（FILLER_WORD）
  另 frozen 槽 warn 2 条（`certificates` 品質保證 / 專業印刷，只读）。
- **为什么不影响本轮 push**：门童 #27 pre-commit 口径 = **staged title 变更硬拦、存量入审计不拦**（AGENTS.md §5）⇒ 存量不阻断；但**任何编辑这 8 槽 title 的批次会被拦**。
- **建议动作**：下一批 title 工作（含 10/19 TRIM）**第一步**先按 `src/data/products.ts` 现取价修这 7 条价格钩（title-hooks SSoT）+ 去掉 1 条空洞词，再处理超线 TRIM；否则硬拦 + 返工。
- **诚实声明**：以上 8 条**未在本 lane 复核**（无 node，未跑 `title-v5-guard.js`）⇒ 以 host 侧门童输出为准。

## FIX-11 [🆕 新增 · 客户可见缺陷] 类目商品卡名「品牌重复 + 空洞词」

- **证据（本 lane 一手 web_fetch 2026-10-15）**：`/zh-hk/category/paper-bags/` 商品卡名实测 = `牛皮紙袋印刷訂製 100個起印 免費刀模 FSC認證 · 服裝品牌跨境電商適配 | 智印港 · 品質保證 · 智印港`（**智印港 出现两次** + `品質保證` 空洞词）；同页多张卡同型（gift-bags 为 `… | 智印港 · 環保材質 · 品質保證 · 智印港`）。
- **数据侧已定位半截（grep 一手）**：`src/data/products.ts` **L1486** `title_zh` 即以 `| 智印港` 结尾 ⇒ 疑似**渲染层再追加 ` · 品質保證 · <brand>`**（candidate：`src/lib/h1-builder.ts` L448-455 的「品質保證」分支，或类目卡模板/`ProductWhyChooseUs`）。
- **建议动作**：node 会话定位追加点 → 单批修（**保证品牌末尾仅一次**，符合 §5 title 规则与门童 #27 的 FILLER_WORD 口径）；同时核对 en/ja 卡名是否同型（本 lane 仅取 zh-hk 样本，**未断言**其他语种）。
- **为什么不擅自动**：本 lane 无 src 写权；且属渲染层行为，需先定位再改（避免只改数据不清渲染，产生新半截残留）。

## FIX-12 [🆕 新增 · 客户可见矛盾] 纸袋类目页交期三口径内战

- **证据（本 lane 一手 web_fetch 2026-10-15）**：同一页 `/zh-hk/category/paper-bags/` 内并存 ① FAQ `常規定制袋 7-12 個工作天交貨` ② Specifications `標準 3–5 天（數碼）；5–7 天（柯式）；急件 2–3 天` ③ W1 批 desc `3-5 工作天`。
- **同源（他人已登记）**：daily-content 10-15 报告 §9.2 已登记 SKU body `3-5 vs 5-7` 内战 + 存量四兄弟页（white-card/gift/handle/large）body 内 `5-7` 与 `10 張起印` 残留。
- **建议动作**：**先请 K3 一句话定口径**（避免各批各自为政），再按 B1c 簇 7 统一（类目页 FAQ / Specifications / SKU desc / SKU body 四处同批对齐）。
- **诚实声明**：本 lane 只采到 zh-hk 一处样本；en/ja 是否同型**未核**（不断言）。

## FIX-13 [🆕 新增 · 数据诚信观察 · 需 K3 或门童 owner 确认] 「15,000+ 客戶」claim 的来源与门童覆盖

- **证据（本 lane 一手 grep，5 处读取）**：`15,000+ 客戶 / customers / お客様` 分布于 **12+ 文件**：`src/app/[locale]/contact/page.tsx` L55/111/167 · `src/components/home/WhyChooseUs.tsx` L14/38/61 · `StatsBar.tsx` L13/21/29 · `CategorySidebar.tsx` L48/65/82 · `HotProducts.tsx` L33/49/65 · `HowItWorks.tsx` L224-227 · `EmailSubscribePopup.tsx` L42/56/70 · `KnowledgeSection.tsx` L98 · `QuoteForm.tsx` L120/161/202 · `src/data/blog-posts.ts` L1658-1660 · `src/data/pillar-content.ts` · `src/data/products-content.ts` L63/302/317/2995/6358 · `src/data/sku-seo-data.ts` L2529；并在**线上**类目页可见（`已有 15,000+ 客戶選擇智印港`）。
- **为什么不擅自动 / 不断言**：§0.22 SOP-10 第 3 款要求先查原数据拍板来源（本 lane 无 K3 拍板记录可查，未找到该数字的白名单登记）⇒ **只登记不断言**。
- **观察到的事实**：门童 #1 现有 pattern（`CRED_1000_PLUS` 等）**未覆盖 `15,000+` 形态**；这是一个客户可见的绝对数字 ⇒ 存在「口径未登记 + 门童未覆盖」的双缺口。
- **建议动作（需 K3 或门童 owner 一句话）**：① 确认 `15,000+` 是否属既定白名单口径（属则登记不动，并考虑补进门童白名单）② 若不属，列入清毒批（与 §0.23 数据诚信族同批）。

---

## 不提议项（本轮证据不支持动）

- ❌ **8 T1 锁词 title 重写 / churn 组提前动作**：title 冻结至 10/19；`教科書 印刷` 已从 34.6 落到 **17.4**，10/19「≥30 启诊断」的触发条件在当前档下不成立。
- ❌ **盲开词追加资产**：10-15 档 年賀状 = 0/0、en holiday cards 未列 ⇒ **10/16 正式判读**再定；仍 0 则先修收录（Plan B），不追加资产；早鸟页结构可先行，**割引真值必须 K3 给**。
- ❌ **按恢复系数单点做排期决策**：三点仍非连续日（2 处空档），且 10-13/10-15 两窗机制不同源 ⇒ 只登记曲线，不据此改内容优先级（恢复期红线：先保恢复）。
- ❌ **软化词（貼紙印刷 / saddle stitch / china catalog / zprint 品牌）回滚或改 title**：均无批次归因（断崖伤/第三方压制），处置已在 W2 执行单内。
- ❌ **对 §14 三项（15,000+ / 交期三口径 / 卡名双品牌）直接改 src**：前两者需 K3 口径、第三者需渲染层定位，且本 lane 无 src 写权。
- ❌ **`products.ts` / `sku-seo-data.ts` / sitemap / `b1c-queue-progress.json` 任何写入**：上述文件**今日已被 ZP-daily-content 车道与 10-15 人手会话改写**（跨车道避让，契约 §二.6）。

---
*Generated by DSH lane ZP-gsc-feedback · 2026-10-15 22:43 窗口 · 证据源: `.hermes/logs/gsc-cliff-2026-10-15.json` · `GSC数据/index.json` · `GSC数据/*2026-10-15.xlsx` ×12（存在性）· `.hermes/_gsc1015_queries.json`（行数）· `.hermes/logs/sku-title-v5-audit-2026-10-15.json` · `.hermes/logs/keywords-detox-audit-2026-10-15.json` · `.hermes/logs/2026-10-15-a2-baseline-probes.{md,json}` · `docs/2026-10-15-w1-verdict-recovery-chain-fix-and-w2-kickoff.md` · `docs/2026-10-15-w1-ctr-batch-paper-bags-menus-packaging.md` · `docs/2026-10-12-recovery-lane-defense-plan.md` · `.hermes/logs/2026-10-15-ZP-daily-content.md`(只读) · grep ×5 · web_fetch ×3（2026-10-15）*
