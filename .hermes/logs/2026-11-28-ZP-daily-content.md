# 2026-11-28 ZP-daily-content — FIX-20261126-DOUJIN-SEMANTIC-FIX ① 类（4-URL 目标集）· 静态清零 15/20 · 价格真值与 D2 标题仍冻结

VERDICT: PARTIAL
CONSUMED: `.hermes/logs/run-context-ZP-daily-content.json` @ 2026-11-28 18:17:02（key `c9df5c562d098f85`，preflight 10/10 ok，lock pid 22484）| `.hermes/logs/lane-status.json` @ 2026-11-28T10:07:06Z（bus 158，verdict=ATTENTION，problems=4）| `.hermes/cron-prompts/lane-results-bus-contract.md` §一–§八 | `harness-daily-growth-20261120.md` + `sop-10-gate.md`
DELIVERED: `src/data/category-seo-content.ts`, `src/data/category-conversion-blocks.ts`, `src/data/products.ts`, `src/data/product-specs-i18n.ts`, `src/data/sku-seo-data.ts`, `.hermes/logs/2026-11-28-ZP-daily-content.md`
NEXT: 2026-11-29 12:05 k3-review 用 4 URL 独立复探本文 §4 的 15 条清零项；2026-11-29 daily 只做 SB/en-stickers §5.2 小批（10 pcs 车表一致 + 无条件交期/统计清零），doujin 价格 `price_range` 与 D2 title/H1 继续等 K3
数据来源: 结果总线 run-context/lane-status/lane-runs；11-28 k3-review §3.2/§5.1；audit-20261126-doujin-semantic-sweep.md；coordination-board 18:17 快照；strategy-task-queue READY 卡；products.ts / sku-seo-data.ts / category-seo-content.ts 静态 grep（2026-11-28 本会话）
RETRY_OF: `ZP-daily-content-20261127T181702-harness`（11-27 VERDICT 业务 OK、格式 STALE；当轮 DOUJIN defer）+ 2026-11-26 run key `c2714322692e0ed1`（STALE / in-flight conflict，未执行 DOUJIN）→ 本轮只补做这两轮**未完成**的 DOUJIN ① 类；11-27 已交付的 board 崩溃修复不重做（`ALREADY_DONE(since 2026-11-27)`）

---

## 0. 一句话结论

`FIX-20261126-DOUJIN-SEMANTIC-FIX` ① 类的 **4 URL 目标集**（`/zh-hk` `/ja` `/en` `category/japan-doujin/` + `/ja/product/doujinshi-printing/`）已完成数据层修复：**20 条静态断言中 15 条清零**（含 k3-review 11-28 明确点名的 `5 本加急 3 天`、`5部急行3日`、`Books 5 days / Rush 2-3 days`、ja `1部￥7,500〜`、ja PDP 6/6 中文 bullet、ja WA 预填错上下文、4 URL 的 `2-4 日` 无条件交期）。**5 条未清（3 类）且不在本卡权限内**：① `price_range='¥7,500〜/注文〜'`（存在 → zh/en 卡面仍出现 `10注文〜`/`¥7,500`；属同 SKU 价格真值，K3 D-1/D-2 冻结）② 冻结 title/H1 的 `24h 特急`（D2 待 K3）③ comiket-c109 页与 doujin blog 的 `¥7,500/per copy`（不在 §5.1 的 4-URL 目标集，登记下一批）。

**本报告不主张“线上已清”**：`pwsh` 在本 lane sandbox 被阻断（环境说明明令不重试），tsc / encoding / 门童 / build **未执行**；部署由 host wrapper 在本 lane 退出后 commit/push，`production_deploy=PENDING`、`online_verify=PENDING`（须 k3-review 独立翻转）。

---

## 1. STEP 0 · 总线消费、幂等、RETRY_OF、跨车道避让

| 项 | 事实 | 本轮处置 |
|---|---|---|
| `run-context.previous_run` | `ZP-daily-content-20261127T181702-harness`，dsh_exit=0，verdict=**OK**，report 在盘；交付 = `scripts/build-coordination-board.py` 修复 | **不重做**；`ALREADY_DONE(since 2026-11-27)` |
| `retry_queue` | ① 2026-11-26 `UNRESOLVED_DAY / STALE`（report 缺完整契约，run key `c2714322692e0ed1`）② 2026-11-27 `UNRESOLVED_DAY / STALE`（格式：首段非四行块 + 当轮 DOUJIN defer） | 两者**业务未完成面 = DOUJIN ① 类**；本轮 `RETRY_OF` 合并补做（见抬头）；11-27 board 修复本身已完成，不重做 |
| `suppressed_retry_queue` | `[]` | 无历史闭合项需恢复 |
| `idempotency` | `c9df5c562d098f85`（2026-11-28）；总线无同键 | 新日新 target，允许执行 |
| `coordination.ready_tasks` | 3 条 owner=daily：`SMALLBATCH`(92) / `DOUJIN`(90) / `G1`(88) | 按 harness §2「每轮最多一个交易页 bounded task」只选 **DOUJIN**；SMALLBATCH/G1 不并列改，避免同轮多变量 |
| `sibling_lanes` | `ZP-k3-review` 12:05 已跑（PARTIAL，写入仅 `.hermes/logs/` 2 文件，零 `src/`）；`ZP-blog-deepfix` 20:17 未到 | 本轮改的 5 个 `src` 文件**均不在** k3-review 今日写入集；blog-deepfix 尚未启动 → 无跨车道撞车 |
| `SESSION_LOCK.md` | 顶部 16:4x 已释放（Q17 blog 层批）；`lane.lock` 由本 lane 持有（18:17:06） | 双条件满足（src 收尾干净 + 人手释放），允许写 `src` |
| 共享队列/账本/看板 | queue 卡 `FIX-20261126-DOUJIN-SEMANTIC-FIX` 保持 **READY**（不自行翻 DONE；online_verify 只能由 k3-review 翻） | **未改** queue / ledger / board / 历史报告（避免污染共享证据面） |

---

## 2. 任务边界（照 k3-review 11-28 §5.1 逐条）

- **只做 ① 类**：条件化 / 删除 / “订单起价”口径落地。
- **不碰**：title（D2 冻结）、车价 ×10 逻辑（D-2）、同 SKU 价格真值（D-1）、WI、SB、full refund、301、名片/贺卡资产。
- **唯一目标集**：`/zh-hk /ja /en category/japan-doujin/` + `/ja/product/doujinshi-printing/`。
- 语义扫描覆盖半/全角变体：`2-4日 / 2-4 日 / 2〜4日 / 3-5営業日 / 24時間 / 24h / 即日 / 2-4 days / 3-5 days`。
- 派生文件纪律：`sku-seo-data.ts` 仅改 **body（ts 权威域，生成器 L145-147/L202 明确保留）**；title/description/CSV 权威域**零改动**，未手搓派生字段。

---

### 2.1 GSC 证据消费（只读，不重算、不造数）

- 最新可用档：`.hermes/logs/gsc-2026-11-28-four-window-analysis.json` + `gsc-2026-11-28-money-keyword-baseline-delta.json`（窗口：28d `2026-10-29..11-25`、7d `11-19..11-25`、24h `11-27..11-28`；由 11-28 k3-review 12:05 消费）。
- 转引读数（k3-review §8.1，不当作本轮新读数）：28d `544 clk / 33,312 imp / 1.633% / 18.32`；7d `127 / 10,253 / 1.239% / 25.37`；24h `16 / 1,204 / 1.329% / 21.11`。
- 边界：7d 重叠 5/7 天、28d 重叠 26/28 天，只作方向；query/page/country 独立 sheet 未拼接；本 run **无新导出**，不生成新 baseline、不写排名胜负。`コミケ 印刷` 的 7d query 行未在本轮提取 → 本任务交付依据是**真值/措辞清零**，不是排名变化。
- 数据供给：`available: true`（11-28 档在盘）；无新增 `NO_CURRENT_BASELINE`。

## 3. 交付明细（文件 → 位置 → 改法）

### 3.1 `src/data/category-seo-content.ts`（japanDoujinContent，3 locale）

| 行 | locale | 旧 | 新 |
|---|---|---|---|
| 3956 | zh | `DHL 2-4 工作天` heading | `DHL Express…（時效以報價確認）` |
| 4000 | zh | `同人誌常規 5 天 / 貼紙 3-5 天 / 海報 3 天 / 加急 2-3 天` | `同人誌 5-7 天（標準，product turnaround 同源）／貼紙與海報按規格確認；特急按稿件與排期報價確認` |
| 4003 | zh | `DHL 2-4 工作天／EMS 5-7 天／順豐 4-6 天` | `DHL Express／EMS／順豐國際（時效以報價確認）` |
| 4011 | zh | `同人誌 5 本加急 3 天出貨` | `小批量加急服務可議` |
| 4028 | zh | FAQ `DHL Express 2-4 個工作天到日本` | `跨境配送時效以報價確認（DHL Express 直送主要城市）` |
| 4048 | en | heading `DHL 2-4 Working Days` | `DHL Express (Transit Confirmed at Quote)` |
| 4092 | en | `Books 5 days standard / Stickers 3-5 days / Posters 3 days / Rush 2-3 days` | `Books 5-7 working days standard / Stickers and posters scheduled per spec / Rush quoted per artwork and schedule` |
| 4095 | en | `DHL Express 2-4 days to Japan / EMS 5-7 / SF 4-6` | `DHL Express / EMS / SF International (transit confirmed at quote)` |
| 4103 | en | `Pre-Comiket emergency support available` | `Pre-Comiket rush is quoted per artwork and schedule` |
| 4120 | en | FAQ `2-4 working days` | `Transit time is confirmed at quote…` |
| 4130 | ja | featuredSnippet `24h出荷 DHL 2-4日` | `特急対応（原稿・日程によりお見積り）、DHL Express配送（所要日数は見積りで確認）` |
| 4144 | ja | heading `DHL 2-4営業日` | `DHL Express…（所要日数は見積りで確認）` |
| 4188 | ja | `同人誌通常5日／ステッカー3-5日／ポスター3日／急行2-3日` | `同人誌 5-7営業日（標準）／ステッカー・ポスターは仕様により見積確認／特急は原稿・日程によりお見積り` |
| 4191 | ja | `DHL 2-4日…` | `DHL Express／EMS／SF国際（所要日数は見積りで確認）` |
| 4199 | ja | `5部急行3日、10部急行2日出荷` | `コミケ前の特急対応（原稿・日程によりお見積り）。少部数からのご相談も承ります` |
| 4209 | ja | `加急料金なし` 暗示 | `イベント2週間前までのご発注を推奨（特急料金は日程によりお見積り）` |
| 4218 | ja | FAQ `2-4営業日` | `越境配送の所要日数は見積りで確認` |

> 说明：`同人誌 5-7` 保留，因 `products.ts` DJ-001 `turnaround` 即 5-7 营业日（同源真值）；其余无字段来源的天数一律条件化。

### 3.2 `src/data/category-conversion-blocks.ts`（`japan-doujin:ja`）

| 行 | 改法 |
|---|---|
| 3194 metaDescription | `同人誌1部￥7,500〜` → `指定仕様・数量のご注文開始価格 ¥7,500〜（1部あたりの単価ではありません）`；`2-4営業日でお届け` → `配送（所要日数は見積りで確認）` |
| 3202 / 3210 quickAnswers | `標準は3-7営業日` → `製造日程は仕様・数量により見積りで確認` |
| 3223 socialProof | `2-4営業日` → `見積り` + label 条件化 |
| 3259 comparison note | `同人誌1部￥7,500〜` → 订单起价口径（加免责句） |
| 3282 / 3286 orderFlow | `標準3-7営業日`、`2-4営業日でお届け` → 見積確認 |
| 3293 WA 预填 | `ポストカードセット / A6 / 20セット / 1個あたりの単価` → `同人誌 A5 / 10部 / 無線綴じ / ご注文金額の目安`（修 E1 上下文错） |
| 3297 WA 预填 | `24時間特急製造` → `特急製造（原稿・日程によりお見積り）`（A19） |
| 3305 / 3310 newFaqs | `1部￥7,500〜` → 订单起价 + 免责句（B18-B21 族） |
| 3306 / 3322 newFaqs | `3-7営業日` / `2-4営業日` → 見積確認（保留特急条件句） |

### 3.3 `src/data/products.ts`（DJ-001）

| 行 | 改法 |
|---|---|
| 6722 `turnaround` | `5-7 営業日 (コミケ前の特急は見積確認)` → `標準 5-7 営業日（特急は原稿・日程によりお見積り）` |
| 6760 `features[2]` | `DHL Express 直送日本 2-4 個工作天` → `…直送日本（時效以報價確認）` |
| 6803 `longDescription` zh | 标准 5-7 保留；`DHL…2-4 個工作天` → `（時效以報價確認）` |
| 6818 `longDescriptionEn` | `DHL…in 2-4 business days` → `(transit time confirmed at quote)` |
| 6833 `longDescriptionJa` | `DHL…2-4 営業日` → `（所要日数は見積りで確認）` |
| **6713 `price_range`** | **未改**：`¥7,500〜/注文〜` 属同 SKU 价格真值/展示口径，K3 D-1/D-2 未裁 → 见 §5 |

### 3.4 `src/data/product-specs-i18n.ts`（C1 修复，数据层映射，不改渲染逻辑）

新增 DJ-001 **6 条 features** 三语映射（行 232-237）：`Comiket 前特急対応可議` / `10 本起印,少量対応` / `深圳自營工廠 + DHL Express…` / `FSC 認證紙材 / ISO 12647` / `繁體中文 / 日文雙語支援` / `A5 / B5 標準尺寸`。
渲染路径不变：`ProductPageV9.tsx:738` 已调用 `localizeSpecValue(f, locale)`；查表命中 → ja/en 输出目标语言，zh-hk 逐字不变（零 churn）。**未改** `ProductTabs.tsx`（legacy 死代码，v9 为线上渲染路径）。

### 3.5 `src/data/sku-seo-data.ts`（仅 body = ts 权威域）

| 行 | locale | 改法 |
|---|---|---|
| 2558 zh body | `單價由 ¥7,500 起／部` → `訂單起價以報價確認（不按每部單價）`；C109 段 `（常規 5 天、加急 2-3 天）與 DHL 日本 2-4 天配送` → `（常規 5-7 天、特急按稿件與排期報價確認）與 DHL 日本配送（時效以報價確認）`；Q3 `DHL 2-4 天配送` → 條件化 |
| 2572 ja body | `DHL配送（2〜4日）`、Q3 `DHL2〜4日の配送` → `所要日数は見積りで確認` |
| en body | `DHL shipping (2-4 days to Japan)` → `(transit time confirmed at quote)` |
| title/description/CSV 權威域 | **零改动**（SOP-5：未手改派生字段；未改 CSV 故无需重生成） |

---

## 4. 静态复扫（before → after）

命令口径：`grep`（UTF-8，半/全角变体）于 5 个 src 文件的 4-URL 相关块；**非** 线上 curl，**非** 门童。

| # | 断言串（4-URL 范围） | before | after | 判定 |
|---|---|---:|---:|---|
| 1 | zh `5 本加急 3 天` | 1 | 0 | ✅ |
| 2 | zh `加急 2-3 天` | 2 | 0 | ✅ |
| 3 | zh/en/ja `DHL … 2-4`（category 块内） | 7 | 0 | ✅ |
| 4 | en `Books 5 days standard` | 1 | 0 | ✅ |
| 5 | en `Rush 2-3 days` | 2 | 0 | ✅ |
| 6 | ja `5部急行3日` | 1 | 0 | ✅ |
| 7 | ja `10部急行2日` | 1 | 0 | ✅ |
| 8 | ja `急行2-3日` | 2 | 0 | ✅ |
| 9 | ja `24h出荷`（category featuredSnippet） | 1 | 0 | ✅ |
| 10 | ja `24時間特急製造`（WA 预填） | 1 | 0 | ✅ |
| 11 | ja `同人誌1部￥7,500`（meta/note/FAQ ×4） | 4 | 0 | ✅ |
| 12 | ja `標準は3-7営業日`（doujin 块） | 3 | 0 | ✅ |
| 13 | ja PDP 中文 bullet | 6 | 0（6/6 key 已映射） | ✅ 静态 |
| 14 | zh body `¥7,500 起／部` | 1 | 0 | ✅ |
| 15 | zh body `常規 5 天` / `加急 2-3 天` | 2 | 0 | ✅ |
| 16 | SKU 价格展示 `¥7,500〜/注文〜`（`price_range`） | 1 | **1** | ❌ 见 §5 |
| 17 | 冻结 title/desc `24h 特急`（sku title 1 + seo.ts 2） | 3 行 | **3 行** | ❌ 见 §5（非本卡权限） |
| 18 | comiket-c109 页 `24 小時特急` / `2-4 日`（全页 union，含注释 1） | 24 | **24** | ⏸ 不在 4-URL 目标集 |
| 19 | doujin blog en/zh `¥7,500 per copy`（4 行，每行 2-3 处） | 4 行 | **4 行** | ⏸ 不在 4-URL 目标集 |
| 20 | `DHL 2-4` 非 doujin 域（包装/月历/贴纸等） | 多 | 多 | 不消费（audit A-2 口径：标准运营信息，需 K3 另批） |

**汇总：4-URL 目标集内 15/15 可执行断言清零；5 条未清 = 1 条价格展示 + 1 条冻结标题（外部阻塞）+ 3 条明确 out-of-scope/不消费。**

> 双方法披露：本次只有「文件级 grep」一种方法（无 shell/node）；结论仅限“源字符串已改”，**不等于** 构建产物/线上 DOM 已清。线上必须由 k3-review 用 curl 复探（同 URL、同语义类），这是 §0.23.2 的第二种方法。

---

## 5. 未清项 / 阻塞（不自行代裁）

### B1（P0，K3 D-1/D-2）`price_range='¥7,500〜/注文〜'`

- 位置：`products.ts:6713`；消费面：`CategoryProductCard` / `ProductCard` / `CategoryPageV9` / `ProductPageV9`（无 locale 变体，zh/en 页会直出 `10注文〜` + `¥7,500`）。
- 为什么不动：同 SKU 7 处价格口径矛盾（HK$500/部 · $65/book · ¥7,500/注文 · 车价 ×10 · 1部¥7,500 · 订单起价），K3 尚未给 zh/en 本市场真值；`quoteOnly` 已隐藏车价 ×10（11-27 D2-C），但卡面 `price_range` 仍裸出。
- 需要的 K3 一句话：`price_range` 是否按 `basePrice_en`/`basePrice` 出本地价，或统一改「按規格報價 / Quoted per spec / 仕様別見積り」（需 locale 变体或组件分支，属 src 行为变更）。
- 本轮**拒绝半修**：只删 `/注文〜` 会留下 `¥7,500` 仍违 K3 #5，故整体保持原状并登记。

### B2（P1，K3 D2）冻结 title/H1 `24h 特急`

- 位置：`sku-seo-data.ts:2554` doujin title（zh `Comiket前24小時特急對應`）、`seo.ts:536/539`（zh/ja meta title）、`comiket-c109/page.tsx` 的 desc/sub（该頁 H1 本身不含 24h）。
- 状态：D2 只解冻了 A1，不含 doujin；本轮按 §5.1 **不碰**。正文已条件化，标题与正文暂时不一致，k3-review 已在 11-28 §6-D2 提案 A（解冻并条件化）。

### B3（下一批，out-of-scope）
- comiket-c109 页 24 处（含注释 1）`24 小時特急 / 2-4 日`（A8-A13）与 doujin blog en/zh 4 行 `¥7,500 per copy`（B10-B13，每行 2-3 处）不在 §5.1 四 URL 目标集，登记下一轮 bounded task。
- SB / en-stickers §5.2（10 pcs 车表 $0.60 一致、`1-2 working day`、`15,000+`、`2.3 days`、`From 50 pcs`、中文材料串）未在本轮消费，留给 11-29 daily。

---

## 6. 门禁 / 部署 / 验收状态（不夸大）

| 项 | 状态 | 证据 |
|---|---|---|
| `pwsh` 沙箱 | **BLOCKED（环境级）** | 按用户环境说明 v9.4：“pwsh tool is blocked in this lane sandbox; do NOT retry” |
| `tsc --noEmit` | **NOT_EXECUTED** | 无 shell；不能声称 0 error |
| `check-encoding` / `content-guard` / `title-v5` / `brand` / `gsc-leak` | **NOT_EXECUTED** | 同上 |
| `next build` / CF Pages | **NOT_EXECUTED** | 同上；host wrapper 退出后 commit/push |
| JSON / TS 形状 | 仅人工 read + grep；未机器解析 | 改动均为字符串替换，无结构变更；`product-specs-i18n` 6 个 key 各 1 次命中 |
| `production_deploy` | **PENDING** | 本 lane 不跑 git；wrapper 负责 commit/push |
| `online_verify` | **PENDING** | 必须 `ZP-k3-review` 独立 4-URL 复探；lane 不得自翻 PASS |
| `idempotency_key` | `c9df5c562d098f85` | 本轮新键，无重复 |

---

## 7. SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 已核 5 条渲染链：PDP = `ProductPageV9.tsx`（v9 线上路径；legacy `ProductTabs.tsx` 死代码 L606 注释确认）；类目长文 = `category-seo-content.ts`；类目转化块 = `category-conversion-blocks.ts`；SKU body = `sku-seo-data.ts`（ts 权威域，生成器 L145-147/L202）；features 本地化 = `product-specs-i18n.ts` 查表 + `localizeSpecValue`。按“源文件 / 线上 DOM / 构建”三层分别断言，不以源 0 命中冒充线上。
- [x] **2. 约束适用范围？** 只动 §5.1 四 URL 的 5 个数据文件；未动 title/H1、车价 ×10、价格真值、SB/WI/full-refund、301、名片/贺卡资产、共享 queue/ledger/board、历史报告。
- [x] **3. 原数据/拍板来源？** K3 10-30 #5（¥7,500=订单起价）、11-26 02:29 G1 直答批、11-27 D3 收窄、11-28 k3-review §5.1（执行 SSoT）；`5-7 営業日` 来自 products.ts DJ-001 `turnaround`（既有字段真值）。**未新增任何数字或价格**。
- [x] **4. 字段值策略？** 本报告不写 certNo/validUntil/issuer；未新增认证/客户数/排名承诺；`95%+` 等既有无源数字未扩写、未当作新证据。
- [x] **5. Markdown 渲染？** 本文件为内部日志，不进 user-facing；未新增 `[text](url)` 渲染面。

---

## 8. 数据来源 / 校准 / 撤回

```
数据来源:
- 结果总线: .hermes/logs/run-context-ZP-daily-content.json @ 2026-11-28 18:17:02 (preflight ok, key c9df5c562d098f85, lock pid 22484)
- 全车道对账: .hermes/logs/lane-status.json @ 2026-11-28T10:07:06Z (bus 158, verdict ATTENTION, problems 4)
- 消费契约: .hermes/cron-prompts/lane-results-bus-contract.md §一–§八
- 执行 SSoT: .hermes/logs/2026-11-28-ZP-k3-review.md §3.2/§5.1/§6 (12:05 快照, HEAD 10c162be, CF Pages success 11:43)
- 锚点表: .hermes/logs/audit-20261126-doujin-semantic-sweep.md (A1-A15 / B1-B22 / C1 / E1)
- 协同板: .hermes/logs/coordination-board.json @ 2026-11-28T18:17:06+0800 (ready: SMALLBATCH/DOUJIN/G1)
- 队列: .hermes/logs/strategy-task-queue.json FIX-20261126-DOUJIN-SEMANTIC-FIX (READY, approval_gate ① 类可执行)
- 前序: .hermes/logs/2026-11-27-ZP-daily-content.md (board fix OK / DOUJIN defer) · 2026-11-26 报告
- 源文件: category-seo-content.ts (3941-4223) · category-conversion-blocks.ts (3190-3325) · products.ts (6698-6844) · product-specs-i18n.ts (229-237) · sku-seo-data.ts (2555-2573)
- 校准状态: 🟡 静态校准 — 文件级 grep/read 已完成；tsc/门童/build/线上 **未校准**（pwsh 阻断）
- 撤回声明: 无数据撤回。口径更正 ① 11-26/11-27 的 STALE 是报告格式缺口，不是业务零产出（11-27 board fix 真实交付）；② 本轮不清 `price_range` 不是遗漏，是 K3 价格真值/展示口径未裁的合规停手。
```

---

## 9. NEXT（下一轮只做这些，不重做已交付）

1. **2026-11-29 12:05 k3-review**：对 4 URL 独立 curl 复探 §4 的 15 条清零项（含半/全角变体），只报变化；`price_range` 与 D2 title/H1 保持 FAIL/冻结，不代翻。
2. **2026-11-29 daily**：执行 §5.2 SB / en-stickers 小批（10 pcs 表/车对齐 D1-B `$0.60`；`1-2 working day`/`Free Shipping` H1/`15,000+`/`2.3 days`/`From 50 pcs`/中文材料串清零），单变量、只动该 2 URL；本次 doujin 产物不重做。
3. **K3 待裁（一句话）**：① `price_range` 本地化口径（B1）② doujin D2 标题解冻（B2）。
4. **持续不改**：11-27/28 历史报告、共享 queue/ledger/board、名片/贺卡资产、301、派生 TS 手改、title 冻结面。

*Generated by ZP-daily-content lane at 2026-11-28 18:17 (+08:00). 本轮写入 = 5 个 `src/data` 文件 + 本报告；零 queue/ledger/board 改写；zero git 操作（host wrapper 负责）。*
