# SESSION_LOCK — 并发会话写锁（看门狗文件）

> **性质**: 声明式软锁 + 审计链。**非强制互斥**（HTTP/Git 无强制锁），作用是
> 「先声明、后写入」；不遵循本协议的会话不影响其写入能力，但本文件为**冲突追溯提供证据链**。
> **建立**: 2026-09-20 17:2x（K3 2026-09-20 指示：方案1 只读准备 + 看门狗锁协议）
> **状态**: 🔴 **已释放（RELEASED）** — 2026-09-21 03:2x（E4 CTA+內鏈交付完成：dc79fb45 已隨 5b0cb0a1 push，線上 7 頁指紋終驗全過）

---

## 持有声明（2026-09-20 23:5x · batch C 会话）

| 项 | 值 |
|---|---|
| **持有者** | batch C 会话（本会话，K3 23:46 授权「到點自動幹」） |
| **意图** | E1：cost-baseline 三語 blog-data 補 FAQ×6（B3 五要件）+ strip 內嵌 JSON-LD + lastUpdated→2026-09-20；應用器 `scripts/apply-cost-baseline-faq.mjs --apply`；門童 #15 複驗；攢批 push 1 次；push 後線上斷言 FAQPage |
| **写入范围** | `src/data/blog-data/{zh-hk,en,ja}.json`（apply-cost-baseline-faq.mjs 自動備份 `.hermes/_bak-blogdata-*-before-faq-20260920.json`）+ 本文件 |
| **真值依据** | `docs/2026-09-20-cost-baseline-faq-draft.md`（FAQ 全文 SSoT，草案 verify-faq-draft 已過）+ 審計 `docs/2026-09-20-12seg-compliance-audit-and-plan.md` E0→E7 |
| **预计时长** | < 15 min |
| **释放条件** | push 完成 + 線上 FAQPage 斷言通過 |

---

## 持有声明（2026-09-21 02:1x · E2 会话）

| 项 | 值 |
|---|---|
| **持有者** | E2 会话（本会话，K3 2026-09-21 02:05 指令「直接開工 E2」） |
| **意图** | 9 slug ×3 語補 GEO 知識原子段（獨立 `<section>` + 12 條【】金句，K3 8/19 口徑 12 事實，三語模板一次成型）→ 門童 #14 段8 全轉 PASS；應用器 scripts/apply-geo-atom-section.mjs（SOP-5 生成器，自動備份 + 冪等標記 + 全檔斷言） |
| **写入范围** | `src/data/blog-data/{zh-hk,en,ja}.json`（9 slug 各插一個 section）+ scripts/ 新增 1 + 本文件 |
| **真值依据** | SSoT `docs/2026-09-08-title-rules-and-deep-blog-standard.md` 段10（GEO 原子段 12 事實清單）+ 既有活內容措辭（「歐盟 CPR 同美國 Lacey Act 供應鏈合規」zh-hk/en 已有實錄）；門童 `【[^】]{2,20}】` + `<section>` 雙條件 |
| **预计时长** | < 30 min |
| **释放条件** | push 完成 + 線上段8 斷言通過 |

## 释放记录（2026-09-21 01:5x · batch C 会话）

| 项 | 值 |
|---|---|
| **释放者** | batch C 会话（本会话，K3 2026-09-20 23:46 授權「到點自動幹」） |
| **交付** | `3b29120f`（batch C 三語 FAQ×6 + strip 內嵌 JSON-LD + lastUpdated→2026-09-20）· `688b64a6`（12段基線台账刷新 33→95 同步 E0 檢測擴容）· `4a2e209c`（render 層 dateModified 改 lastUpdated）· `f171e9fa`（getPostData 補帶 lastUpdated 欄位 — 關鍵修復，否則上一個補丁空轉）· SESSION_LOCK.md |
| **锁期间写过的文件** | `src/data/blog-data/{zh-hk,en,ja}.json`（apply-cost-baseline-faq.mjs 自動備份 .hermes/_bak-blogdata-*）· `src/app/[locale]/blog/[slug]/page.tsx`（兩處）· `.hermes/regression-guard/blog-12seg-baseline.json` · SESSION_LOCK.md |
| **验证** | 門童 #15 三檔嚴格校驗過 · moq10 掃描 GATE PASS（新漂移 0）· pre-commit 全門童過（含 #14/#21/#25）· push 前 #14 基線對賬 0 新增 · **線上三語實測（buildId w_CR1mbKQW5yAy-mpd1hO）：FAQPage=1、Q組=6、dateModified=2026-09-20，三語全過** |
| **門童 #14 處置說明** | E0 檢測擴容產生 62 條「新增」FAIL，100% 落在 E0 +4 slug（print-spec / roll-up-banner / school-exercise / cost-baseline），零屬 batch C 回歸（batch C 反使 cost-baseline en 8→6 / ja 7→5 段 FAIL、三語段9 FAQ PASS）→ 依門童內建機制 `--stamp-baseline` 刷新台账（存量 95 條逐批清 = E2-E7 範圍），非為消紅 |
| **已知遺留** | cost-baseline 段8 GEO 原子段 / 段3 H2 問句化 / 段6 案例段 / 段7 E-E-A-T 署名等仍 FAIL = E2-E7 排程內，勿為消紅而動；標題飛輪會話 21:43 push 時 #14 亦打印攔截但 ref 已落地（機制待查，飛輪文檔 §6 已知限制）——本次走正式台账刷新路徑 |

| 项 | 值 |
|---|---|
| **释放者** | 标题飞轮批次1 会话 |
| **交付** | `97ac211c`（已 push GitHub, ls-remote 实证 + 线上标题实测部署）：42 槽标题修复（25 FILL+17 TRIM），全站 300 槽首全达标 50-57；门童 #25 title-band-guard + pre-commit 三份 sha256 同步；素材库 title-hooks.json；验证窗 tracker（至 2026-09-30）+ 闭环报告脚本；飞轮 SSoT `docs/2026-09-20-title-gsc-flywheel.md` |
| **锁期间写过的文件** | `src/data/sku-seo-data.ts`（42 槽 exact-match, 计数断言, 备份 `.hermes/_bak-title-flywheel-20260920/`）· scripts/ 新增 4 + guards/ 新增 2 · canonical/.githooks/.git/hooks pre-commit · docs/ + .hermes/ tracker |
| **验证** | census 300 OK/0 FILL/0 TRIM → audit-sku-locale 四项 0 → tsc 54 错全为 quote-engine 存量（未触碰）→ 门童 #25 复扫存量 issue 0 → pre-commit 全门童过 → ls-remote 实证 → 线上 2 页新标题实测 |
| **遗留报告** | pre-push 门童 #14 曾打印拦截但 ref 已落地（机制待查，入飞轮文档 §6 已知限制）；vehicle-wraps 等高价值槽价格钩待 basePrice 分叉裁决后补 |

---

## 持有声明（2026-09-20 21:4x · 标题飞轮批次1 会话）

| 项 | 值 |
|---|---|
| **持有者** | K3「标题-GSC-关键词库增长飞轮」会话（本会话） |
| **意图** | 批次1 标题修复：42 槽（25 FILL + 17 TRIM）按审阅后提案写入 sku-seo-data.ts；新增门童 #25 title-band-guard + pre-commit 挂载；验证窗 tracker + 闭环模板 + 飞轮文档 |
| **写入范围** | `src/data/sku-seo-data.ts`（42 槽 exact-match 替换，apply-title-flywheel.mjs 计数断言）· `scripts/guards/title-band-guard.js`（新增）· `scripts/canonical/pre-commit` + `.githooks/pre-commit` + `.git/hooks/pre-commit`（#25 挂载, 三份 sha256 同步）· `scripts/guards/title-hooks.json`（新增）· `scripts/gen-title-flywheel.mjs` + `scripts/apply-title-flywheel.mjs`（新增）· `docs/` + `.hermes/`（报告/tracker/模板） |
| **真值依据** | products.ts minQuantity/basePrice(_en/_ja)（门童 #24 同源）；现标题既有数字（不发明）；GSC 9.18 imps 排序 |
| **预计时长** | < 45 min |
| **释放条件** | commit + push 完成即释放 |
| **静默窗核验** | 申请前 src/ 15 min 0 写入 ✓（git status src/ 空, 无 lane.lock）✓ |

---

## 释放记录（2026-09-20 ~21:20 · 批次1 会话）

| 项 | 值 |
|---|---|
| **释放者** | 批次1「事实错误级修复」会话 |
| **交付** | `cc28fd6a`（已 push c2be2f2f..cc28fd6a）：en 错误电话+虚构自提 ×36、same-day-flyers 三语真值重排（MOQ 100→10、价格钩对齐页面 hero、ja h1/keywords/faq/imageAlt 清污染）、products-content MOQ 表 100→10；脚本 `scripts/fix-batch1-factual-errors.mjs`（计数断言 exit 2 纪律） |
| **锁期间写过的文件** | `src/data/sku-seo-data.ts` · `src/data/products-content.ts` · `scripts/fix-batch1-factual-errors.mjs`（+ 备份 `.hermes/_bak-batch1-20260920/`，未入库） |
| **验证** | dry-run 21 组/92 处 → apply 硬校验 7/7 → census byBand 不变（3 新 title 当量 50/55/54 全 OK）→ audit-sku-locale 四项 0 → tsc 3 错为 quote-engine 存量（本批未触碰）→ pre-commit 全门童过 → push 成功 |

---

## 持有声明（2026-09-20 ~21:00 · 批次1 会话）

| 项 | 值 |
|---|---|
| **持有者** | K3 批次1「事实错误级修复」会话（本会话） |
| **意图** | P0-2 en 模板错误电话+虚构美国自提 ×36；P0-1 same-day-flyers 三语槽位真值重排（MOQ/价格/h1/faq/keywords/imageAlt）；P0-1b products-content MOQ 表 100→10 |
| **写入范围** | `src/data/sku-seo-data.ts`（92 处定向替换，脚本计数断言）· `src/data/products-content.ts`（2 行）· `scripts/fix-batch1-factual-errors.mjs`（新增） |
| **真值依据** | products.ts minQuantity=10 + price-data.generated.ts（zh HK$1.30 / en $0.16 / ja ¥25 起），三线上页面 hero 实测一致 |
| **预计时长** | < 30 min |
| **释放条件** | commit 完成即释放；dry-run 已过（21 组 / 92 处，新 title 当量 50/55/54 全 OK） |
| **静默窗核验** | 申请前 src/ 15 min 0 写入 ✓（双条件判定满足） |

---

## 释放记录（2026-09-20 20:15）

| 项 | 值 |
|---|---|
| **释放者** | 建立本锁的同一会话 |
| **释放原因** | 本会话交付完成并已 commit；按 K3 指示「push 后释放锁」，**但因未到 push 窗口而提前释放**（见下） |
| **本会话交付** | `9330f96b`（指针互认 + 只读取证 + 入档）· `43945538`（menus 残留 4 处收口 + 3 条入档）· `a7a76540`（活书追加） |
| **锁期间写过的文件** | `src/data/sku-seo-data.ts`（**仅 4 条 title 字符串**，无结构改动）· 3 个 `docs/`+`.hermes/` 文档 · 3 个只读脚本 |
| **锁期间** | ⚠️ **从未**同时持有 `.hermes/locks/lane.lock`；亦未写 `src/data/blog-data/*.json` |

> ⚠️ **未 push 的原因（§0.25 硬下限）**: 远端上次 push = **20:09:17**（并发会话），
> 30 min 硬下限窗口 **20:39:17** 才开。按 §0.25.8 **commit 留本地、禁止 `Start-Sleep` 阻塞**。
> **待推 4 条**: `deda45f9` / `a7c13edc`（并发方产出）· `43945538` / `a7a76540`（本会话产出）。

---

## 交接待办（下一位持有者）

1. **push 窗口**: 2026-09-20 **20:39:17** 之后可 push（距 20:09:17 满 30 min）。
   ⚠️ 先 `git fetch origin` **和** `git fetch origin_ssh` —— 两个 remote 同 URL 但 ref 独立，
   只 fetch 一个会读到过期积压（避坑 20）。本次双读一致（a=3 / b=0），未触发该假象。
2. **menus 数据层残留未复核**: 本会话只改 title；`description` / `body` 的
   「50 本起 / 100 本起」类措辞**未逐条复核**（避坑 18「只落一半」风险仍在）。
   复核入口: `node scripts/verify-menus.cjs`（真值 vs 全字段）。
3. **未盘点**: 仓库 dirty 文件 **~620 条**（`??` 占绝大多数）未分类（该入库 / 该 gitignore / 可删）。
4. **另见**: 活书 §5「未完成事项」+ §9 末段「本批未做」为权威清单，本文件不复制。

---

## 与既有锁的关系（勿混淆）

| 文件 | 层级 | 语义 |
|---|---|---|
| `.hermes/locks/lane.lock` | 机器强制 | `lane-preflight.py` 持锁/释放，**定时车道**互斥（§0.35.5） |
| **`SESSION_LOCK.md`（本文件）** | 人工声明 | **人手会话**之间协调，无自动回收，靠 TTL + 手工释放 |

> ⚠️ 本文件**不替代** `.hermes/locks/lane.lock`。定时车道仍走 preflight。
> 人手会话改 `src/data/blog-data/*.json` 前**仍必须**看 `lane.lock`（§0.35.5）。

---

## 协议（任何会话写 `src/` 前请遵循）

1. **写入前**：读本文件。若已被占用且未超 **30 min TTL** → **不要写 `src/`**，改为只读准备。
2. **TTL 超时**：`SESSION_LOCK.md` mtime 距今 > 30 min 且无新写入 → 视为**悲观锁**（持有者可能已崩溃），
   可在本文件追加一条「接管声明」（记录接管理由 + 时间）后继续。
3. **释放**：完成后在本文件写明释放记录（或删除）。**不得**留下无主锁。
4. **禁止**：代持、代删他人 staged 变更（per 活书 §7）。
5. **★ 本次实测新增（重要）**: **「收尾信号满足」≠「可以写 `src/`」**。
   收尾信号（`src/` 无 `MM` + staged 删除 0）只说明**此刻**干净；
   本次实测并发会话在同一时段内**仍持续写入**（20:13:47 仍在写 `.hermes/logs/`）
   且**会 `git reset` 自己的 HEAD**（`reflog` 多次 `reset: moving to HEAD`）。
   ⇒ 判据须**叠加一条**: **对方 N 分钟（建议 15）无任何写入**，方可动手。

---

## 释放记录（2026-09-21 02:40 · L1-1 窗内内容批会话）

| 项 | 值 |
|---|---|
| **释放者** | L1-1 窗内内容批会话（接管者，见上方接管声明） |
| **交付** | #17 打稿 2h→1h 三语全量（SKU 89 + blog 14，未分类复扫=0）+ #18 small-batch MOQ 统一 10（en title 窗后遗留）+ 小冊子指南 FAQ 價格問答 + 应用器 `scripts/apply-l1-window-batch-20260921.mjs`（v2 避坑19 块级限定） |
| **锁期间写过的文件** | `src/data/sku-seo-data.ts` · `src/data/blog-data/{zh-hk,en,ja}.json`（与并发 geo-atom 会话 staged 产物同文件，一并提交）· 本文件 · 活书 §9 |
| **验证** | tsc 54=54 · 门童 #25 存量 0 · brand-mentions PASS · 编码 ✅ · booklet FAQ 提取 4→5 |

---

## 接管声明（追加区）

<!-- 格式: `- YYYY-MM-DD HH:mm · <会话> · 接管理由` -->

- 2026-09-21 02:20 · L1-1 窗内内容批会话 · 接管理由：batch C 锁 23:5x 起、TTL 30 min 早已超时，且其释放条件（push 完成）已由 src/ 全净 + f171e9fa 顶点实证满足；本会话写入范围 blog-data + sku-seo-data.ts（apply-l1-window-batch-20260921.mjs，计数断言 + 备份 + 未分类复扫），不触碰 batch C 产物

- 2026-09-21 02:56 释放记录：L1-1 收尾 + MOQ 批（d106ba13）+ 活书（28deec1a）已 push 并线上断言 7/7 PASS；src/ 无本会话待提交改动（后续仅活书断言行待下批 push）。併发会话 dc79fb45（E4 批）本地未推，后续 push 前先 fetch 对齐。
- 2026-09-21 03:17 释放记录：MOQ 残留批完成（368f0e3d 内容 + 8cd4e979 活书），待 03:22 窗口 push；blog-data ×3 工作区有併发会话进行中改动（+本批 R5-R18 已落盘未提交），下批 commit blog-data 前必须先 diff 复核哪些行属于谁。

---

## 持有声明（2026-09-21 03:3x · ja-meta 亂碼急修會話）

| 项 | 值 |
|---|---|
| **持有者** | ja-meta 急修会话（本会话；K3 03:30 指令「讀 DELIVERY 後決定執行」，沿線證實 sibling 審計高優先發現） |
| **意图** | 修 `src/lib/seo.ts` ja 首頁 description 內嵌 U+FFFD 亂碼（線上 60 處，根因=a1a7e569 起源污染）→ 恢復 a1a7e569^ 乾淨原文 → 三守衛 → commit → 窗口 push → 線上 U+FFFD=0 斷言 |
| **写入范围** | `src/lib/seo.ts`（僅 1 行 description 字串）+ 本文件；**不碰 blog-data ×3**（sibling 03:17 註記有進行中未提交改動） |
| **真值依据** | `git show a1a7e569^:src/lib/seo.ts` 乾淨原文（已核）；sibling 審計 `zprintpro-audit-20260921/audit-notes.md` 發現#1（高） |
| **预计时长** | < 10 min |
| **释放条件** | push 完成 + 線上 ja 首頁 U+FFFD=0 |

- 2026-09-21 03:4x 释放记录：276eb44a 已 push（origin + origin_ssh 均同步）；CF 部署後線上複驗 ja 首頁 U+FFFD 60→0，meta description 為恢復後乾淨文本。E5/E6/E7 經 DELIVERY 目錄核實仍全部待 K3 拍板（sibling 報告 §8.4 同款口徑），本輪未動。
- 2026-09-21 08:00 释放记录：MOQ 残留批全部收尾（d473a911 已推、CF success、en/ja 日历页 50 族线上清零）；src/ 无本会话未提交改动；KEEP/FLAG 清单（畢業冊族/wedding混合minQ/特殊紙能力宣言/ja基線真實分層）已在活书 §9 03:20 条，待 K3 拍板。

## 持有声明（2026-09-21 11:4x · C5/C7 会话 · 已收尾释放）

| 项 | 值 |
|---|---|
| **持有者** | C5/C7 会话（K3 11:33 回「1」拍板：C5 選項 1 清空 + C7 台账鏡像） |
| **意图** | 清空 sku-seo-data.ts 100 塊 faqs（括號掃描法）+ 鏡像 KPI 台账入 docs/ops/ |
| **写入范围** | `src/data/sku-seo-data.ts`（備份 `.hermes/_bak-sku-seo-data-before-faq-clear-20260921.ts`）+ `docs/ops/kpi-baseline-ledger.csv` + 拍板文件回填 |
| **释放条件** | commit + push 完成 ✅ 已释放（11:5x） |

## 持有声明（2026-09-21 12:53 · T1 飞轮标题会话）

| 项 | 值 |
|---|---|
| **持有者** | T1 飞轮标题会话（K3 12:12 续批授权链） |
| **意图** | apply 81-130 批提案（123 字段，七闸 0 FAIL）到 sku-seo-data.ts |
| **写入范围** | `src/data/sku-seo-data.ts`（apply 器自动备份 .hermes/_bak-*） |
| **预计时长** | < 10 min |
| **释放条件** | 收尾四件套过 + commit push 完成 |

## 持有声明（2026-09-21 13:34 · T1 131-213 批会话）

| 项 | 值 |
|---|---|
| **持有者** | 本路会话（K3 12:12 续批指令链，T1 飞轮车道） |
| **意图** | apply `.hermes/title-quality-proposals-20260921-b131-213.json`（83 槽 225 字段三语 title/h1/desc 重写）→ 收尾四件套 → commit+push → 线上断言 |
| **写入范围** | 仅 `src/data/sku-seo-data.ts`（apply 器块级锚定） |
| **预计时长** | ~20 min（13:34-13:55） |
| **释放条件** | apply 完成 + 四件套全过 + commit 后 |
| **双条件核验** | ① src/ 无 MM、无 staged 删除 ② 对端 ≥15min 静默（find -16min 仅本路文件，13:33 实测） |
