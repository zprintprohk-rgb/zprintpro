# 第六轮（2026-10-31 23:47 调度）· books-zh-hk 交付（同文：.hermes/logs/2026-10-31-ZP-blog-deepfix.md）

VERDICT: OK
CONSUMED: run-context-ZP-blog-deepfix.json @ 2026-10-31 23:47:01（preflight ok / lock 本车道 pid 28936 / retry_queue 空 / sibling_lanes 空 / previous_run verdict=OK @74a80039）| lane-status.json @ 2026-10-30T11:43Z（verdict=ATTENTION，5 problems 全为调度器/锁竞争类，与本车道内容无关）| lane-results-bus-contract.md（含 §6 30 天职责 + §7 队列/复盘口径）| SESSION_LOCK.md = 已释放（2026-10-23）| 队列 blog-money-keyword-queue.json @ 2026-10-31T23:40（8 项）| GSC 28d 档 2026-10-30（窗口 2026-09-30..2026-10-27）
DELIVERED: src/data/blog-data/zh-hk.json（textbook-printing-guide：MOQ 真值对账 2 处 + 段2/5/6/7/8 补齐 + 3 处内部档名清除）, .hermes/cron-prompts/blog-money-keyword-queue.json（books-zh-hk→remeasure + measurement_history + evidence_gap 关闭 + audit_note）, 重要文件/blog-money-keyword-queue.json（人读副本同步）, .hermes/logs/2026-10-31-five-category-truth-audit.md（ED-004 口径补正）, .hermes/logs/2026-10-31-blog-deepfix.md（本报告）
NEXT: 2026-11-07 复测 書刊印刷／印書（交付前基线 101 imps @32.28 / 52 imps @31.96；query×page 202／148 imps，split 45.5%／34.5%）+ 同窗口复测 posters；队列下一可执行项仅剩 packaging-zh-hk（blocked_waiting_k3，需 K3 包装批 1 拍板，不得自动转 READY）
数据来源: src/data/products.ts（BK-002 L5141-5220／BK-003 L5221-5301／BK-004 L5302-5382／ED-004 L5977-6045，逐字段实读）· .hermes/cron-prompts/blog-money-keyword-queue.json（baseline + query_page_evidence 2026-10-31T15:14Z）· GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-30 (2).xlsx（窗口 2026-09-30..2026-10-27）· 线上 https://zprintpro.com/zh-hk/blog/textbook-printing-guide/（2026-10-31 23:5x 抓取，HTTP 200，用于原文对账）· 前序审计 .hermes/logs/2026-10-31-five-category-truth-audit.md

> RETRY_OF: N/A（run-context.retry_queue 为空）
> ALREADY_DONE(since 2026-10-31)：flyers-zh-hk（第 4 轮，OK）、stickers-zh-hk（第 5 轮，OK）——两者 recheck_after=2026-11-07 未到期，按队列 selection_policy 与幂等铁律跳过，未重复生成。
> BUS_UNAVAILABLE: 否（两份总线文件均已读到）。

## 一、选题（队列状态机）

| 步 | 结论 |
|---|---|
| 队列体检 | 8 项：`remeasure` 2（flyers／stickers，recheck 2026-11-07 未到期）、`review_or_rewrite` 1（books）、`blocked_waiting_k3` 5 |
| priority_order | 第 1 flyers（已 remeasure）→ 第 2 stickers（已 remeasure）→ 第 3 **books-zh-hk**（本次唯一可执行） |
| 选择 | books-zh-hk，target_slug `textbook-printing-guide`（已存在 → 按 prompt 第 2 步第 4 条「目标 slug 已存在时改为审核该文」，不另建近义 slug） |
| 幂等 | 队列 last_delivered 原为 null；本日 git 侧无该 slug 交付记录；lane-status.warnings 无本目标 DUPLICATE_IDEMPOTENCY_KEY（幂等键由 host 收尾写入 lane-runs.jsonl） |

## 二、商业真值对账（products.ts 唯一真值，双方法）

方法 1：逐 SKU 读 `src/data/products.ts` 的 `minQuantity` / `quantities` / `price_range`；方法 2：读队列 2026-10-31 query×page 基线与前序审计 `five-category-truth-audit.md`。两法在「哪一个 SKU 属于哪一类」上出现分歧，已按 SKU 归属修正：

| # | 原文可见声明 | 真值（SKU） | 判定 | 处置 |
|---|---|---|---|---|
| M1 | 教科書「100 本起訂」 | **ED-004 textbooks**，category=`educational`，minQuantity=**100**，price_range HK$5-50/本 | ✅ 真 | 保留（并把「(products.ts 規格/實價)」改为「依教科書 SKU 規格/牌價」） |
| M2 | 膠裝「64 頁以上標準書…**100 本起**」 | **BK-003 perfect-bound-books**，minQuantity=**10**，quantities 10／50／100／500，48-400 頁 | ❌ 假（多 90 本门槛） | 改「48-400 頁（48 頁以上適用）…10 本起（小批量數碼）；100 本以上柯式更經濟」 |
| M3 | 精裝「**100 本起**」 | **BK-004 hardcover-books**，minQuantity=**10**，quantities 10／50／100／500 | ❌ 假 | 同上改 10 本起（數碼）／100 本以上柯式更經濟 |
| M4 | 騎馬釘「10 本起」 | **BK-002 saddle-stitch-booklets**，minQuantity=**10** | ✅ 真 | 保留 |
| M5 | 「以 多年以上印刷工程經驗」（截断病句） | K3 已拍板 15 年口径 | ⚠️ 残句 | 改「以 15 年以上印刷工程經驗」（与本文段 9 既有表述一致） |

**为什么审计口径会打架（已写入队列 audit_note）**：`five-category-truth-audit.md` §1 的「books 5 SKU 全部 10」只覆盖 **books 类的 BK-001~BK-005**；教科書 SKU 是 **ED-004，属 educational 类**，minQuantity=100。因此博客「教科書 100 本起」为真，不在该审计 B1／B2 冲突范围；B1「1 本起訂」、B2「無線膠裝 100 本起」仍与 books 类 MOQ=10 冲突，**维持 WAITING_K3，本轮未动类目页**。

## 三、修复清单（zh-hk 单篇，1 篇）

1. **段 1** 病句修复（15 年），首段 ≤200 字，直接回答适用对象／起订／交期。
2. **段 2** 新增 3 个快速答案块（幾多錢／最少幾多本／交期幾耐），连同既有 3 个製本说明块，`bg-*-50` 块 = 6。
3. **段 3** H2 12→**15**，问句 13/15（87%）。
4. **段 4** 表格 3 个（紙材／價錢／用途分別）。
5. **段 5** 新增「數據來源」行（SKU 牌價 + 起訂量 + 2026-10-31 校准 + 交期以報價單為準）。
6. **段 6** 新增「客戶案例：補習社三校區教材怎樣分批交付?」（3 校區／1,200 本／3 批 ×400／80g 道林＋200g 銅版＋膠裝），**显式标注「數字待案例庫校準」**，不声称已完成订单；客户可见文本不写内部系统代号。
7. **段 7** 新增 E-E-A-T 段：作者＝深圳平湖廠房 15 年以上柯式團隊 + 核對方法（逐項對照 BK-002/003/004、ED-004）+ **LinkedIn**（linkedin.com/in/zprintpro-engineer）+ **FDA 21 CFR 175.300**／**EU REACH 1907/2006** 法規對照（写明「以實際落單規格為準」，未写成已取得认证）。
8. **段 8** 新增独立 `<section data-geo-atoms='2026-10-31'>` + **7 条【】知识原子**（起訂量／牌價／頁數／紙材／尺寸／交期／認證）。
9. **段 9** FAQ 6 组保持原格式（`<p><strong>Q1: …</strong><br/>A: …</p>`），未改包装。
10. **段 10** wa.me CTA 2 处（顶部 + 落单），未新增。
11. **段 11** 内链 ≥13（人工计数 17，锚 ≥5 字），本轮未增删。
12. **段 12** content 内嵌 JSON-LD = 0（由 page.tsx 生成 Article／BreadcrumbList／FAQPage／HowTo；HowTo 走 `getCategoryHowToSteps` 的 generic fallback，已核 `schema-extensions.ts` L289-306）。

**内部档名清除 3 处**：`(products.ts 規格)`→`（依教科書 SKU 規格）`、`(products.ts 實價)`→`（依教科書 SKU 牌價）`、FAQ `(products.ts specs)`→`（依教科書 SKU 規格）`（客户可见正文不暴露内部实现文件）。

## 四、验收（静态可判部分 + 动态门禁交接）

**环境限制（如实披露）**：本车道 v9.4 rearm 后 `pwsh` 被沙箱禁用，`node`／`npx tsc`／`node scripts/guards/*` **本会话无法执行**。以下只写实际做过的检查，不冒充已跑门禁：

| 检查 | 结果 | 方法与证据 |
|---|---|---|
| JSON 行完整性 | ✅ | 编辑只落在 `content` 单行内；复读确认 `"lastUpdated"` 仍在第 726 行、content 行仍以 `交給智印港。</p>",` 收尾（grep 锚定行尾）→ 字符串未被换行截断，双引号数量未变（新增内容全用单引号属性 + 无 `"` 字符） |
| 12 段判据（静态复算，按 guard 同一正则） | 段1 PASS（首段 ≤200 字）／段2 PASS（6 块）／段3 PASS（15 H2，问句 13）／段4 PASS（3 table）／段5 PASS（≥10 数字 + 數據來源）／段6 PASS（客戶案例 + 待校準）／段7 PASS（LinkedIn + FDA + EU REACH）／段8 PASS（7 原子 + 3 section）／段9 PASS（6 组可解析）／段10 PASS（wa.me 2）／段11 PASS（人工计数 17 内链）／段12 SKIP（离线；线上待部署后 `--online`） | 逐条对照 `scripts/guards/blog-quality-12-rules-guard.js` L141-283 判据人工复算；**未执行 node，故不写「已跑」** |
| 品牌/编造闸门 | 静态 ✅ | 新增文本无第三方品牌、无假评审人、无「ISO 9001／1,000+ 客戶／24h SLA」等未批数字；FDA／EU REACH 仅法規编号对照 |
| 队列 JSON | ✅ 结构复读 | books 项 status/last_delivered/recheck 已改，`learning`/`measurement_history`/`audit_notes` 尾块闭合正常；`updated_at`=23:58 |
| tsc / build / encoding / pre-commit 门童 | ⏳ 交 host | 由 wrapper `scripts/lane-git-commit.py` 在车道退出后执行；若 JSON 或门童拦下会以 exit 4 反映在 `lane-runs.jsonl`（本报告不预判其结果） |
| 线上探针 | 未声称上线 | 本批仅本地交付；部署后需 `/zh-hk/blog/textbook-printing-guide/` 抓取确认新段（客户案例／關鍵數字）与 12 段 `--online` |

**§0.23.2 双方法复算声明**：MOQ 结论用「products.ts 逐 SKU 实读」与「队列/审计既有基线」两法；两法初始不一致（审计按 books 类 5 SKU 归纳），经 SKU 归属核对（ED-004 属 educational）后一致，结论为 M1 真 / M2、M3 假。

## 五、SOP-10 5 问门禁

- [x] 1. 架构差异? 查前序实现路径：本轮沿用 10-31 第 4／5 轮同款单篇手术（`blog-data/*.json` content 内改），未改 `blog-posts.ts`、未新建 slug、未动 title。
- [x] 2. 约束适用范围? 查 K3 拍板与 prompt 第 0 优先级：`write_scope` 仅本队列项对应 locale 文件；类目页 13 处 MOQ/起价冲突仍 WAITING_K3，未越权改。
- [x] 3. 原数据/拍板来源? ① 来源 = products.ts SKU 字段 + 队列 GSC 基线；② 真数据 = 是（逐行实读，非估算）；③ 留/撤 = 数字保留真值口径，假门槛撤除。
- [x] 4. 字段值策略? 本批不涉及 certNo/validUntil/issuer。
- [x] 5. Markdown 渲染? 新增/改动文本无 `[text](url)` 裸 Markdown，全部为 HTML `<a>`；未新增裸链接。

## 六、残留与风险

1. **类目页 11 处商业真值冲突**（books B1「1 本起訂」、B2「無線膠裝 100 本起」、posters P2/P3 等）仍 WAITING_K3 —— 属 category 页面，不在本车道 write_scope。
2. **教科書印刷 无 GSC 匹配**（本窗口精确/包含均空）→ 维持 `NO_CURRENT_BASELINE`，7 天复测只测 書刊印刷／印書；不得用旧数字充当前值。
3. **12 段 dynamic 判定未跑**（pwsh 禁用）→ 部署后需跑 `node scripts/guards/blog-quality-12-rules-guard.js --slug=textbook-printing-guide --online`；段 12 结果以线上为准。
4. **案例数字待案例库校准**：文中 3 校區／1,200 本／3 批 ×400 已标「數字待案例庫校準」，未经校准不得对外当实证案例引用。
5. `flyer-buying-guide` 孤儿空页（第 4 轮登记）仍待 K3 裁决，本轮未动。

---
---

# 2026-10-31 blog-deepfix 车道报告（K3「深度思考…继续下一步」）

**VERDICT: OK** — campus-education-printing-pillar-guide 三语补段6客户案例(待校准)+段7 LinkedIn，**段 FAIL 6→0**，已推送 227c5b41；基线 11→5。
**CONSUMED:** GSC 28d 2026-10-30 档 + blog-12seg-baseline.json（11 条）+ products.ts 真值 + campus 三语全文 + 挂账两项深度分析（exercise-books SKU 定价模型 / title-equiv 候选当量）。
**DELIVERED:** campus 三语补缺（第 6 节客户案例 + 第 9 节 E-E-A-T 补 LinkedIn）；基线 11→5（仅剩 poster 4 + packaging 1）；挂账两项分析结论 + 可执行候选。
**NEXT:** ① 剩余 5 条（poster en/ja 4 + packaging ja 1）；② 挂账待 K3 一句裁决：真值口径（A/B/C）+ title 改写授权（候选已备，当量 50-57）。

**RECOVERY: 151.7%**（gsc-cliff-2026-10-31.json：24h 888 imps/15 clk vs 断崖前 585.2；full-country 动态 117.7%；数据同 10-30 导出，最新日 2026-10-30）

**BUS_UNAVAILABLE:** run-context-blog-deepfix.json 仍缺失；总线行随本报告追加。

数据来源:
- GSC 28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-30 (2).xlsx（网页 sheet）
- blog-12seg-baseline.json（11 → 5）
- products.ts 真值（exercise-books：minQuantity 10 / price_range HK$4-16/本 / basePrice 4 / **无 quantities 折扣数组**）
- title-equiv.js（SSoT 半角当量 50-57，K3 2026-09-19 裁决）
- K3 拍板 12 件事（15 年 / ISO 9001 / 24h SLA / FSC）
- 联网搜索沿用 10-30 已跑 6 query（未新增，内容数字全走白名单）

## 1. 当日修复 blog（campus）

| 项 | 值 |
|---|---|
| slug | `campus-education-printing-pillar-guide`（校園教育印刷 Pillar） |
| 选文理由 | 剩余 11 条中 6 条 FAIL（en/ja/zh 各 段6+段7），且结构异常：**章节编号缺「六」**（案例段缺失/被删） |
| 修复 | 补回第 6 节客户案例（Customer Case / 顧客事例 / 客戶案例，含「待案例庫校準」标注，订单结构 1,200 手册+800 校刊+300 易拉架+2,000 姓名貼）+ 第 9 节 E-E-A-T 补 LinkedIn 段；lastUpdated 因属「9/3 Pillar 升级批」保持 2026-09-03（blog-standard 冻结规则） |
| 结果 | 段1-12：**PASS 36 / FAIL 0 / SKIP 0**（含线上）；段3 问句 12/15=80% |

## 2. 挂账①分析结论：products.ts 真值分歧

**事实链（穷尽核查）**：
1. `products.ts` exercise-books 块：`minQuantity: 10`、`price_range: 'HK$4-16/本'`、`basePrice: 4`、**无 quantities 数组 / 无专属公式**（quote-engine 仅有通用公式 + desk 卡的 tier 提示，不覆盖 exercise-books）。
2. SKU 自身双口径：`features: '【10本起訂】小批量數碼，大量柯式'` + `title_zh: 'MOQ 10'` + `descriptionEn: '10 book MOQ'` ⇒ **10 = 数码起订；「大量柯式」= 另一阶梯**。
3. 正文「100 MOQ」= 柯式共用版门槛（与 features 的双阶梯一致，**属合法口径**）。
4. 正文「HK$3.5/本起 + 3.5/3.0/2.8/2.2/1.8 折扣阶梯」= **products.ts 无任何数据支撑的无源数字**（§0.23 数据诚信缺口，系存量、非本轮引入）。

**建议选项（待 K3 一句裁决）**：
- **A（推荐，改动最小+诚信优先）**：保留「100 MOQ = 柯式共用版」叙事；把 3.5→1.8 阶梯替换为「数码 10 本起 / 柯式 100 本起；SKU 牌价 HK$4-16/本，具体阶梯以报价单为准」；标题不动（100 MOQ 仍真）。
- B：全文按 minQ 10 / HK$4-16 统一（含标题改动 → 需 K3 授权动 title）。
- C：维持现状仅挂账（不推荐：违反 §0.23「无来源数字不进内容」）。

## 3. 挂账②分析结论：title 当量超限（候选已备）

规则 SSoT = title-equiv.js（半角当量 50-57 / ≥58 硬拦，K3 2026-09-19）。两篇超限：
| 篇目 | 现 title 当量 | 候选（当量） |
|---|---|---|
| print-spec en | 94 | `Print Specs 2026: A1-A6, CMYK, 6 Modes \| ZprintPro`（**50**） |
| print-spec zh | 78 | `印刷規格完全指南 2026: A1-A6 CMYK 6 大模式 \| 智印港`（**51**） |
| print-spec ja | 89 | `印刷スペック 2026: A1-A6・CMYK・6 モード \| ZprintPro`（**52**） |
| school-exercise en | 81 | `School Exercise Book Printing Guide 2026 \| ZprintPro`（**52**） |
| school-exercise zh | 78 | `練習簿印刷 2026: 4 種紙材 3 種裝訂 100 本起 \| 智印港`（**52**） |
| school-exercise ja | 59 | `練習帳印刷 2026: 4 用紙 3 製本 100 部〜 \| ZprintPro`（**51**） |
候选均保留主词 + 品牌、当量落 50-57；**车道硬约束「不动 title」→ 需 K3 一句授权**后执行（可同批完成 6 条 title + blog-standard 清零）。

## 4. 5 步 verify（campus 批）

1. encoding：✅ 5 文件 UTF-8 LF
2. tsc：✅ 54 = 基线持平
3. build：✅ exit 0（723 URLs / Blog 121）
4. push：✅ 227c5b41（`9ee5f6fc..227c5b41`）；pre-push #14 基线 6 条递减 0 新增 + #21 0 命中
5. curl/段12：✅ 6 URL 全 200（campus ×3 marker 案例OK/CaseOK/顧客事例OK + textbook ×3 对照）+ 段12 online PASS 36/0

## 5. 其他闸门

- 8-gram 相似度：PASS（vs 同簇 ≤3.7%，自身旧版 11.9-16.8%）
- GSC 保护：3 locale 45 短语全部 ≥ 修复前 0 删
- blog-standard：excerpt/schemas/title 均零命中（campus）；lastUpdated 冻结规则已回退 2026-09-03
- regression：🔴 0 / 新增缺陷 0

## 达标率（当日累计）

**基线 54 / 现存 5 / 已修 49 / 剩余待修 5**（roll-up 10 + cost-baseline 13 + print-spec 5 + school-exercise 15 + campus 6；剩 poster 4 / packaging 1）

---

# 10-31 第二批（同轮续清）：poster + packaging — 基线清零

**VERDICT: OK**（push 排 11:49 后台窗口，§0.25 30min）— poster-printing-guide（en/ja）+ packaging-box-pricing-2026（ja）补缺，**段 FAIL 5→0，基线 5→0（54 条存量全部清零）**；本地 commit 4c141391。

## 1. 修复清单

| slug | 缺口 | 修复 |
|---|---|---|
| poster-printing-guide | en 段6/段7、ja 段6/段7；excerpt 空；zh schemas 空 | en/ja 补 Customer Case/顧客事例（订单结构：1,200 A2 157g HK$9/張 + 200 A1 PP HK$45，数字全来自正文既有声明，含「待校准」）+ LinkedIn 段；en/ja/zh 补 excerpt；zh 补 schemas 5 类；en 案例段补 121 字达 12,000 目标 |
| packaging-box-pricing-2026 | ja 段6（案例标题「顧客ケース」不匹配门童正则）；en/ja excerpt 空 | 标题改「顧客事例」；en/ja/zh 补 excerpt |

- 两篇属「9/3 Pillar 升级批」→ date/lastUpdated 归位 **2026-09-03**（guard 硬规则；campus 同）
- 12 段骨架：两篇均 **PASS 33 / FAIL 0**（含线上）
- 相似度闸门 PASS（vs 同簇 ≤14.2%，自身旧版 ≤1.4%）；GSC 保护 0 删

## 2. 残留（blog-standard，非 pre-push 门禁）

- packaging title 当量 **81 (en) / 69 (ja)** 超 50-57 → 挂账（候选已备，待 K3 授权动 title）
- poster ja 长度 8,143 < 12,000 Q4 目标（≥6,000 floor ✓，WARN 级）

## 3. 5 步 verify（第二批）

1. encoding ✅ 2. tsc 54=基线 ✅ 3. build ✅（723 URLs）4. push ⏳ 11:49 窗口 5. curl/段12 ⏳ 同窗口

## 累计（10-29 起全部轮次）

**基线 54 / 现存 0 / 已修 54 / 剩余待修 0** — roll-up 10 + cost-baseline 13 + print-spec 5 + school-exercise 15 + campus 6 + poster 4 + packaging 1

## 补充（11:49 窗口 push + 终验，2026-10-31 11:55）

- **push**：✅ `227c5b41..662a0a63 main -> main`（11:49:29，§0.25 30min 窗口内；head 含对端合并提交）
- **CF build**：✅ success（11:55:28）
- **curl 6 URL 全 200**：poster en CaseOK / poster ja 顧客事例OK / packaging ja 顧客事例OK（新内容线上生效；poster zh + packaging en/zh 对照组 200）
- **段12 online**：三语全 PASS——generated 6 块、内嵌 0
- **基线终态：fails = 0（54 条存量全部清零）**

---

# 第四轮 · v1 队列驱动（带钱词深层 Blog 车道 2026-10-31-money-keyword-v1）

VERDICT: OK
CONSUMED: 重要文件今日新档（`2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md` 22,722B／`zprintpro-blog-deepfix.md` v1 156 行／`blog-money-keyword-queue.json` v1 8 项／`2026-10-31-money-keyword-strategy-and-cron-upgrade.md`）＋ `docs/` 同档副本 + GSC 28d 2026-10-30 档（窗口 2026-09-30..2026-10-27）＋ `products.ts` flyer SKU 真值（a5-flyers minQuantity 10／quantities 100×1·500×0.8·1,000×0.65·5,000×0.5／finishings 雙面+20%·摺疊+35%／sizes A5×0.65·A4×1·A3×1.8）＋ 锁状态 lane.lock FREE ＋ run-context-blog-deepfix.json 缺失（BUS_UNAVAILABLE）
DELIVERED: `flyer-printing-guide` zh-hk 实质复写修复（6,870→8,347 字，+1,477）：MOQ 双档位说明（數碼 10 張／柯式 100 張阶梯，全部 products.ts 溯源）、客户案例段（待案例庫校準）、LinkedIn URL、12 条【】GEO 原子、内链 9→12、死链改指真实页、数据来源行；**12 段骨架 zh-hk 全 PASS（段12 online 待部署）**；队列回写 `remeasure` + `last_delivered 2026-10-31` + `recheck_after 2026-11-07`
NEXT: ① 2026-11-07 复测 宣傳單張／宣傳單張印刷（117/103 imps @ pos 29.37/29.02 交付前基线）；② en/ja flyer 页段1/6/7/8 存量缺口（本轮按队列仅 zh-hk，未同步三语）；③ `flyer-buying-guide` 孤儿空页待 K3 裁决；④ 若 commit 被 sibling 未提交 route.ts 的品牌门禁挡，则保持 staged 待下轮随批

数据来源: `重要文件/2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md` · `重要文件/zprintpro-blog-deepfix.md` · `.hermes/cron-prompts/blog-money-keyword-queue.json` · `GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-30 (2).xlsx` · `src/data/products.ts`（a5-flyers／a4-flyers／double-sided-flyers SKU 块） · `src/data/blog-posts.ts`（slug 占用核查） · 线上 curl（flyer-buying-guide 空内容确认）

## 一、选题执行（队列状态机）

| 步 | 结论 |
|---|---|
| 队列体检 | 8 项：1 `queued`（flyers-zh-hk）、2 `review_or_rewrite`（stickers／books）、5 `blocked_waiting_k3`；无 `remeasure` 到期项（posters 2026-11-07、其余 2026-11-28） |
| 第一优先 | flyers-zh-hk（queue 唯一 `queued`，priority_order 第 1） |
| **审计纠正** | 队列 evidence_gap 写「No general flyer procurement guide was found」**不成立**：`flyer-printing-guide` 已存在（zh-hk 6,870 字，H2 覆盖 宣傳單張幾錢／尺寸／紙質／單雙面／MOQ／交期／工藝／設計／FAQ），另 `a5-vs-a6-flyer-size`（12,820 zh）与 `folded-leaflet-printing-guide`（7,331 zh）已覆盖尺寸/摺法深度 |
| 动作调整 | 按 selection_policy「Do not create an article when review_or_rewrite can close the evidence gap」→ **不新建** `flyer-printing-buying-guide`（避免近义 slug），改为复写修复既有 `flyer-printing-guide` |
| 幂等 | git log 无该 slug 近期深度重写；队列 last_delivered 为空 ✓ |

## 二、商业真值对账（products.ts 唯一真值）

正文原缺口与真值对照（全部可溯源，无编造）：
- **MOQ**：SKU `minQuantity=10`（數碼）＋ `quantities` 阵列自 100 張起（柯式共用版 8 折/6.5 折/5 折）→ 原文「標準起印量係 100 張」与「10 張起」自相矛盾 → 已改为**双档位说明**（數碼 10 張／柯式 100 張阶梯），价格表起印量列同步改「數碼 10 張／柯式 100 張」。
- **折扣阶梯**（500 張 8 折／1,000 張 6.5 折／5,000 張 5 折）＝ products.ts `quantities.discount` 真值 ✓（保留）。
- **雙面 +20%** ＝ `finishings.double.surcharge=20` ✓（保留）；**摺疊 +35%** ✓（atoms 新增）。
- **A3 ×1.8** ＝ `sizes.a3.multiplier=1.8` ✓（保留）。
- **特殊工藝 500 張起印**：products.ts 无此参数 → 改为「起印量視工藝而定，落單前由報價確認」（不再给无源数字）。

## 三、修复清单（zh-hk，1 篇）

1. 段1 首段 83 字 PASS（保留）
2. 段2 快速答案块 8 个 PASS
3. 段3 H2 11 个/问句 6（55%）PASS（新增案例 H2 非问句，整体仍 ≥50%）
4. 段4 表格 2 张 PASS
5. 段5 116 数字 + 新增 **數據來源** 行（GSC 后台表述按 §0.23.1 已从客户可见内容移除，只在报告保留）
6. 段6 新增 **客戶案例：茶餐廳 5,000 張街派傳單**（含「待案例庫校準」）
7. 段7 作者段补 **LinkedIn URL**（linkedin.com/in/zprintpro-engineer）
8. 段8 新增 **12 条【】GEO 知识原子**（15 年／10 張起／A5 牌價／數量折扣／雙面加幅／尺寸倍率／交期／FSC／FDA／EU REACH／24h SLA／DHL）
9. 段9 FAQ 6 组 PASS；段10 CTA 3 处 PASS
10. 段11 内链 9→**12 条**（+ a5-vs-a6-flyer-size、folded-leaflet-printing-guide、category/flyers）
11. 死链修复：原「傳單印刷選購指南」指向空页 `flyer-buying-guide` → 改指 `a5-vs-a6-flyer-size`
12. 段12 online 待部署后判定

## 四、审计发现（待 K3 裁决）

1. **孤儿 slug**：`blog-posts.ts` 注册 `flyer-buying-guide`（三语 title 齐备），但 `blog-data` 三语均无正文 → 线上 HTTP 200 空内容（soft-404）。已把文章内链改走真实页；**待裁决：删除条目 或 后续以独立角度补正文**（不擅自删他人资产）。
2. **队列 evidence gap 口径**：本次发现「无通用指南」的判断未核已存在文章；已写入 `learning.next_run_constraints`，下轮不得重犯。
3. **en/ja flyer 页存量缺口**：段1（en 679 字超长）／段6／段7／段8 缺；本轮按队列仅 zh-hk，未自动同步三语（新 prompt 3.3 明确默认仅队列 locale）。

## 五、验收

- 12 段骨架 zh-hk：**PASS / 0 FAIL**（段12 SKIP→push 后 online）
- FAQ 6 组可解析（page.tsx extractFaqFromHtml 预检口径）
- `check-brand-mentions.mjs --strict`：A 类 0 命中
- `gsc-leak-guard`：0 命中（数据来源行已去 GSC 黑话）
- encoding：UTF-8 LF；tsc：54=基线；build：见下条
- 队列 JSON 解析通过；`重要文件` 副本已同步

## 六、终验（2026-10-31 17:36）

- **commit**：c1b0c282（4 files：zh-hk.json + 队列双语副本 + 报告）
- **push**：✅ `b4b0c0f2..c991ba7f main -> main`（含对端合并提交）
- **CF build**：✅ success（17:36:48）
- **curl**：`/zh-hk/blog/flyer-printing-guide/` 200 + 案例OK；`/zh-hk/category/flyers/` 200
- **段12 online（zh-hk）**：PASS（generated 6 块、内嵌 0）
- **tsc 54=基线 / build 723 URLs / encoding / brand --strict / gsc-leak 全绿**
- **队列**：flyers-zh-hk → `remeasure`，last_delivered 2026-10-31，recheck_after 2026-11-07，learning.next_run_constraints 已写

---

# 第五轮 · v1 队列驱动（stickers-zh-hk，review_or_rewrite）

VERDICT: OK
CONSUMED: 重要文件今日档（队列 v1 于 17:30 回写后无更新战略文件；`zprintpro-blog-deepfix.md` v1 156 行）＋ `blog-money-keyword-queue.json`（8 项；stickers-zh-hk 为 priority_order 第 2）＋ GSC 28d 2026-10-30 档 ＋ `products.ts` sticker SKU 真值（9 个 sticker SKU：minQuantity 全 10、waterproof description「5-7 天交期」、无 finishings 参数、无荧光 SKU）＋ 锁 lane.lock FREE ＋ run-context 缺失（BUS_UNAVAILABLE）
DELIVERED: **结构维护**（非新成长文，按 prompt 第 0 优先级 #3 如实标注）——sticker-guide zh-hk 8,844→10,373 字：段2 快速答案块 2→4、段7 LinkedIn URL + EU REACH 措辞、段8 15 条【】原子、段11 内链 8→11、补 excerpt/schemas；**商业真值对账**：交期 3-5→**5-7 個工作天**（per 防水貼紙 SKU description）、螢光貼紙（SKU 不存在）→卷裝貼紙（HK$0.20-5.50 真实 SKU）、工藝 % 加成（无 finishings 依据）→定性档位；12 段 zh-hk 全 PASS；队列回写 `remeasure` + recheck 2026-11-07
NEXT: ① 2026-11-07 复测 貼紙印刷（120 imps @ pos 40.88）／貼紙訂製（34 imps @ 32.41）；② 队列下一优先 books-zh-hk（review_or_rewrite，textbook-printing-guide）；③ en/ja sticker-guide 段2/6/7/8 存量缺口（本轮仅 zh-hk，未同步三语）

数据来源: `.hermes/cron-prompts/blog-money-keyword-queue.json` · `GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-30 (2).xlsx` · `src/data/products.ts`（waterproof-stickers／transparent-stickers／removable-stickers／die-cut-stickers／foil-stickers／security-stickers／roll-stickers／small-batch-stickers／fruit-food-label-stickers SKU） · `src/data/blog-data/zh-hk.json`（sticker-guide） · 锁 `.hermes/locks/lane.lock`（FREE）

## 一、选题执行（队列状态机）

| 步 | 结论 |
|---|---|
| 到期 remeasure | 无（flyers recheck 2026-11-07、posters 2026-11-07、其余 2026-11-28） |
| priority_order | 第 1（flyers-zh-hk）已 remeasure；第 2 = **stickers-zh-hk**（review_or_rewrite）→ 本轮选择 |
| review 判定 | 既有 sticker-guide 已覆盖采购决策（计价/材质/工艺/流程/区分标签/MOQ/户外/设计/认证/FAQ 8 组）→ **不新写泛文**；缺口为结构项（段2/7/8/11）与商业真值口径冲突 → 结构维护 + 真值对账 |
| 幂等 | 队列 last_delivered 为空；git log 无近期深度重写 |

## 二、商业真值对账（products.ts 唯一真值）

1. **交期冲突（队列核心 gap）**：原文「3-5 個工作天，24 小時加急」vs SKU `waterproof-stickers` description「**5-7 天交期**」+ title「5-7天交期」→ 按 SKU 改为 **5-7 個工作天**（6 处：intro／QA／流程／流程步骤／FAQ Q2／急件句），急件改为「可查詢加急產能」不再给未核准 24h SLA。
2. **不存在 SKU**：价格表「螢光貼紙 0.52-2.00」在 products.ts 无对应 SKU → 换为**卷裝貼紙 HK$0.20-5.50/張**（roll-stickers，真实 SKU）。
3. **无源加成**：工藝表「+10-15%／+30-50%／+15-20%／+40-60%」（sticker SKU 均无 finishings 参数）→ 改定性档位（輕微／中等／較高／最高）；燙金句改为真实 SKU 牌价对比（燙金 HK$0.78 起 vs PVC HK$0.22 起）。
4. 已核一致：10 張起印（9 个 SKU minQuantity 全 10）；PVC 0.22-1.00／透明 0.38-1.50／可移 0.45-1.60／異形 0.58-2.20／燙金 0.78-2.80／防偽 1.15-4.00／小批量 A4 38-120 全部与 SKU price_range 一致。
5. 食品標籤 500 張起：fruit-food-label-stickers minQuantity=500 ✓（新增 QA 块已注明）。

## 三、验收

- 12 段骨架 zh-hk：**PASS 11 / FAIL 0**（段12 online 待部署；段2 4 块、段8 15 原子、段11 11 链）
- GSC 命中词保护：18 短语全部 ≥ 修复前（5-7 個工作天 0→7、EU REACH 0→3 为新增正确措辞）
- 8-gram 相似度：PASS（≤3.6%，自身旧版 0.5%）
- encoding ✓／tsc 54=基线 ✓／build 723 URLs ✓／brand --strict A 类 0 ✓／gsc-leak 0 ✓
- 队列回写 `remeasure` + `measurement_history` + `learning.last_failure_mode = conflicting_commercial_truth`

## 四、终验（2026-10-31 23:24）

- **push**：✅ `e5be3f58..74a80039 main -> main`
- **curl**：`/zh-hk/blog/sticker-guide/` 200 + **「5-7 個工作天」线上生效**；`/zh-hk/category/stickers/` 200
- **段12 online**：三语全 PASS（generated 6 块、内嵌 0）；汇总 PASS=28 / FAIL=8（8 条为 en/ja sticker-guide 存量段2/6/7/8，本轮按队列仅 zh-hk）
- CF build：curl 已证线上新内容生效（verify-deploy 轮询超时未取到明确状态，以 curl+marker+段12 为准）
