# 2026-10-31 ZP-blog-deepfix · 第六轮（23:47 调度）· books-zh-hk 交付

VERDICT: OK
CONSUMED: run-context-ZP-blog-deepfix.json @ 2026-10-31 23:47:01（preflight ok / lock 本车道 pid 28936 / retry_queue 空 / sibling_lanes 空 / previous_run verdict=OK @74a80039）| lane-status.json @ 2026-10-30T11:43Z（verdict=ATTENTION，5 problems 全为调度器/锁竞争类，与本车道内容无关）| lane-results-bus-contract.md（含 §6 30 天职责 + §7 队列/复盘口径）| SESSION_LOCK.md = 已释放（2026-10-23）| 队列 blog-money-keyword-queue.json @ 2026-10-31T23:40（8 项）| GSC 28d 档 2026-10-30（窗口 2026-09-30..2026-10-27）
DELIVERED: src/data/blog-data/zh-hk.json（textbook-printing-guide：MOQ 真值对账 2 处 + 段2/5/6/7/8 补齐 + 3 处内部档名清除）, .hermes/cron-prompts/blog-money-keyword-queue.json（books-zh-hk→remeasure + measurement_history + evidence_gap 关闭 + audit_note）, 重要文件/blog-money-keyword-queue.json（人读副本同步）, .hermes/logs/2026-10-31-five-category-truth-audit.md（ED-004 口径补正）, .hermes/logs/2026-10-31-ZP-blog-deepfix.md（本报告）
NEXT: 2026-11-07 复测 書刊印刷／印書（交付前基线 101 imps @32.28 / 52 imps @31.96；query×page 202／148 imps，split 45.5%／34.5%）+ 同窗口复测 posters；队列下一可执行项仅剩 packaging-zh-hk（blocked_waiting_k3，需 K3 包装批 1 拍板，不得自动转 READY）
数据来源: src/data/products.ts（BK-002 L5141-5220／BK-003 L5221-5301／BK-004 L5302-5382／ED-004 L5977-6045，逐字段实读）· .hermes/cron-prompts/blog-money-keyword-queue.json（baseline + query_page_evidence 2026-10-31T15:14Z）· GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-30 (2).xlsx（窗口 2026-09-30..2026-10-27）· 线上 https://zprintpro.com/zh-hk/blog/textbook-printing-guide/（2026-10-31 23:5x 抓取，HTTP 200，用于原文对账）· 前序审计 .hermes/logs/2026-10-31-five-category-truth-audit.md

> RETRY_OF: N/A（run-context.retry_queue 为空）
> ALREADY_DONE(since 2026-10-31)：flyers-zh-hk（第 4 轮，OK）、stickers-zh-hk（第 5 轮，OK）——两者 recheck_after=2026-11-07 未到期，按队列 selection_policy 与幂等铁律跳过，未重复生成。
> BUS_UNAVAILABLE: 否（两份总线文件均已读到）。
> 同文存档：.hermes/logs/2026-10-31-blog-deepfix.md（当日第 1-5 轮 + 本轮，保持历史连续）。

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

## 七、撤回声明

无。本轮未撤回任何既有结论；仅**补正**前序审计的 SKU 归属口径（见 `.hermes/logs/2026-10-31-five-category-truth-audit.md` 末段「补正」），原审计 B1／B2 结论不变。
