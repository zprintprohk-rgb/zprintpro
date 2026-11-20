# 2026-11-10 交接 digest — 近 2 日文档盘点 × 队列状态 × 飞轮 17 实验（为首席分析师续跑供弹）

> 生成：2026-11-10（Asia/Shanghai）· 角色：交接盘点（PROPOSE_ONLY，零 src/、零队列翻转、零 commit/push）
> 数据来源：
> - `重要文件/2026-11-09-three-site-inventory-flywheel-next-step.md`（11-09 03:1x）
> - `重要文件/2026-11-07-eight-day-execution-evaluation-and-harness-flywheel-upgrade.md`（11-07 22:48）
> - `重要文件/2026-11-06-weekly-meta-blocker-fix-report.md`（11-06 23:3x）
> - `重要文件/2026-11-05-pool-snippet-evidence-sweep.md`（11-05 20:1x）
> - `.hermes/cron-prompts/blog-money-keyword-queue.json`（updated_at 2026-11-08，8 条目全量 grep 核对）
> - `.hermes/logs/flywheel-learning-ledger.json`（generated_at 2026-11-10T08:35+08:00）
> 校准状态：全部字段直接摘自上述文件；两处口径出入已在 §五 显式登记，未替文档和解。

---

## ① 四份文档关键结论 / 待办 / 验收状态

### 1）11-09 三站点盘点 + china catalog 诊断决策包
- **结论**：38 重点词 = 8 行业大词 + 25 带钱词 + 3 季节带钱词 + 2 缺当前行；首页 8 词 7 个零点击。`china catalog printing` 为唯一「连续两窗改善」核心词（28d 15.79→14.96→14.15，98 imp / 0 clk），PDP `/en/product/catalog-printing/` 承接 72.7% 集中 → 杠杆在排名/摘要，无 301/砍页依据。线上 H1「Catalog Printing 100+」vs title/desc/body 10 MOQ 矛盾（K3-3 A 裁决 2026-10-26 已批 H1→10，11-08 只修了 A2，catalog 漏网）；zh desc「100 起」、ja desc「100〜」同真值族矛盾；ja H1 英文句 locale 错配（D 案另立）。SERP 双引擎被网络拦截，登记 SERP_UNAVAILABLE。
- **验收状态**：PROPOSE_ONLY 交付；**决策包 A（en H1→10+）与 B/C（zh/ja desc MOQ）已于 11-09 当天执行上线**（队列 a33abd3b / 392c5f30，见 §二）——本报告的 P0/P2 建议不再是待办，只余复测。
- **待办**：11-14 首轮同口径复测 + 11-21 同窗；service 页 desc 240 超带 + 「Save 30-40%」比较表述 + FSC 核验（待 K3）；ja H1 locale 错配另案；海报旧价格另案；月曆 7 天效果 11-10 读数。

### 2）11-07 八天执行评估 + Harness 飞轮升级
- **结论**：周反馈 23 runs（OK 14 / FAILED 6 / BLOCKED 2 / STALE 1），整体 **ATTENTION 非 GREEN**；`learning=0、SCALE-eligible=0`（无实验六件齐）。daily 11-07 自然轮 **DeepSeek QUOTA 余额不足 FAILED**；gsc 11-07 真实执行但 push 失败（wrapper_exit=5）；weekly 11-06 BLOCKED（脚本形状 bug，已修）；monthly/k3-review/watchdog `0x800710E0` 需管理员。5 条 prompt 注入 FLYWHEEL 证据块（FIX/MEASURE/SCALE/STOP + 六件套学习硬门）；学习门槛 = baseline+change+approval+deploy+online_verify+retest 全齐，FIX_DEPLOYED→MEASURE 一律不 SCALE。
- **验收**：20 项隔离回归通过；非生产端到端、非自然调度恢复证明；本会话未 push。
- **待办**：管理员恢复 DeepSeek 额度 + 修 0x800710E0；按自然轮验收（11-13 weekly / 11-14 复测）；blog=决策车道（复测/HOLD/NO_OP 均合法）。

### 3）11-06 weekly-meta BLOCKER 根因修复
- **结论**：根因 = `gsc-daily-anomaly-2026-11-06.json` 的 `tasks` 从数组（11-04）漂移为 map（O1..O12），`strategy-feedback.py` 按旧形状迭代 → `'str' object has no attribute 'get'`；已加 `_task_rows()`/`_task_date_map()` 双形状兼容，新旧格式回归均 exit 0，weekly-meta 重跑前置解除。批 1（poster blog desc）改稿 **152 字符逐字稿**（A41 双方法确认：blog 真值 HK$9×46/HK$45×28 主导，category 的 HK$16/HK$20 不得进该页）已写入 `docs/2026-11-04-weekly-meta-execution-sheet-1106.md` §B-①；批 1b（food blog desc 152 字符）GO 维持，复测锚 `食品包裝印刷` 112@8.39 + `食品印刷` 62@7.48（**11-13 / 11-20**）。
- **待办**：重跑 weekly-meta（`schtasks /run /tn ZP-weekly-meta`）执行 逾期 sticker title（en stickers 104 / ja stickers 83 / en books 75）+ 批1（改稿后）+ 批1b，各单变量；K3 清桌（monthly 重注册 / xlsx 四档 / O2 / D3 / SERP 出口 / EN greeting-cards §0.0 (a)(b)(c) / R5 R7）。

### 4）11-05 池行 snippet 证据补齐
- **结论**：11-05 20:13 gsc 车道 BLOCKED（陈旧锁：daily preflight pid 25932 死进程持锁 → exit 10），gsc 当晚失跑、数据面无损。页 1 零点击池 16 行 / 632 imp 补齐线上 snippet 证据 + 页级归因纠正 4 处：poster 印刷/海報尺寸/海報size 实证承接 = **poster blog**（3 行 122 imp → 批 1 对准）；大信封实证页 = **large-envelopes PDP**（长期 top-5 零点击 → MEASURE 非 FIX）；小冊子实证页 = saddle-stitch blog（desc 113 偏短 + 含「vs Alibaba 黃頁」brand-guard 关注）；即日急件族实证页 = rush blog（**新缺陷：title 双品牌残留「| 智 | 智印港」**，desc 109 偏短）；doujinshi 实证页 = doujinshi PDP（en books 超带 title 与它无关）。池内其余行不进当时批次，待 SERP 证据。
- **待办**：陈旧锁成因看门狗核查；`/zh-hk/product/envelopes/` slug 未注册（返回首页兜底，无证据仅登记）；rush blog title 残留 + 各 desc 偏短候选记后续批。

---

## ② blog-money-keyword-queue.json 逐项状态（8 条目，updated_at 2026-11-08）

| # | cluster | status | recheck_after | 最近变更（相对 remeasure/blocked 的移动） |
|---|---------|--------|---------------|------------------------------------------|
| 1 | flyers-zh-hk | **remeasure** | 2026-11-14 | 10-31 review_or_rewrite 交付（复写既有 flyer-printing-guide）；**11-08 74ffa5a9 商业真值修复上线**（A4/A5 单面价格+100 张/5,000 张阶梯），FIX_DEPLOYED→MEASURE，复测 11-14 / 11-21 |
| 2 | stickers-zh-hk | **remeasure** | 2026-11-14 | 10-31 结构维护+商业真值对账（交期 3-5→5-7 per SKU 等）；11-07 窗继续深位 MEASURE，第三窗 gate 未达（≥11-09 档数据断供） |
| 3 | books-zh-hk | **remeasure** | 2026-11-14 | 10-31 商业真值对账+12 段补缺（膠裝/精裝 100→10 本，教科書 100 保留）；教科書印刷 NO_CURRENT_BASELINE |
| 4 | packaging-zh-hk | **blocked_waiting_k3**（未变） | null | 仅 11-03 窗口观察；商业真值审计-only，等 K3 决策记录才可翻状态 |
| 5 | posters-zh-hk | **remeasure**（由 blocked 翻转） | 2026-11-14 | **11-08 9acc3d16 主承接 URL=category/posters 上线**（K3 11-08 01:38 批），K3 11-03 曾判 keep blocked_waiting_k3，后因拍板解除；复测 11-14 / 11-21 |
| 6 | stickers-en | **remeasure**（由 stale blocked 翻转） | 2026-11-28 | 11-08 诊断纠正陈旧 WAITING_K3 门（K3 10-30 已批 7b396bd9/9f7b348c）；hold_measure_no_op，SERP_UNAVAILABLE（首页零点击 PDP 100% 承接，非内容缺口） |
| 7 | catalog-en | **blocked_waiting_k3**（blog 内容门未变）但 11-09 追加两条已部署变更 | 2026-11-28 | **11-09 a33abd3b：en H1 100+→10+**（K3-3 A 批，CF run 128890190650，线上断言 PASS）；**11-09 392c5f30：zh desc 100 起→10 本起印 + ja 100〜→10冊〜**（CF run 128985513618，L3 断言 PASS）；复测 11-14 / 11-21 |
| 8 | comiket-ja | **remeasure**（由 stale blocked 翻转） | 2026-11-14 | K3 10-30 已裁 JA-C109（7b396bd9 DONE）；11-08 74ffa5a9 补 ¥7,500 订单起价口径；等 K3 核实官方日期前禁写活动日期 |

**小结**：状态翻转 3 项（posters / stickers-en / comiket-ja 由 blocked→remeasure）；维持 blocked 2 项（packaging-zh-hk、catalog-en 的 blog 内容门）；remeasure 基础 3 项不变（flyers / stickers-zh-hk / books）；catalog-en 虽保 blocked 但 PDP 层两批单变量已上线并记账。

---

## ③ flywheel-learning-ledger.json — 17 实验清单（窗口 / 复测）

稀释表（判级口径）：11-14 导出 = 方向窗（7d 仅 42.9% 变更后）；**11-18 = 首个 7d 100% 可判窗**；11-21 / 11-28 = 7d 窗；**12-04 = 首个 28d 82% 经营判据窗**；12-10 = 28D_CLEAN。

| # | 实验 ID | 簇/locale | verdict | 变更（commit/日期） | 首复测 | 判级窗 |
|---|---------|-----------|---------|---------------------|--------|--------|
| 1 | EXP-1108-FLYERS-CLUSTER | flyers / zh-hk | DEPLOYED | 74ffa5a9 · 11-08（A4/A5 价格真值+阶梯） | 11-14 | 11-18 |
| 2 | EXP-1108-POSTER-PRIMARY-URL | posters / zh-hk | DEPLOYED | 9acc3d16 · 11-08（主承接=category） | 11-14 | 11-21 |
| 3 | EXP-1108-WEDDING-PRIMARY-URL | 喜帖 / zh-hk | DEPLOYED | 9acc3d16 · 11-08（主承接=category，感谢卡剥离） | 11-14（样本 16 imp） | 11-21 |
| 4 | EXP-1108-JA-DOUJINSHI-UNIT | japan-doujin / ja | DEPLOYED | 74ffa5a9 · 11-08（¥/部→/注文+免责） | 11-14 | 11-18 |
| 5 | EXP-1108-JA-TEXTBOOK-PRICE | educational / ja | DEPLOYED | 74ffa5a9 · 11-08（¥1,288〜 同源对齐） | 11-14 | 11-21 |
| 6 | EXP-1108-EN-A2-POSTER | posters / en | DEPLOYED | 74ffa5a9 · 11-08（A2 H1+4 处 MOQ 100→10） | 11-14 | 11-18 |
| 7 | EXP-1109-CATALOG-EN-H1 | catalog / en | DEPLOYED | a33abd3b · 11-09（H1 100+→10+） | 11-14 | 11-18 |
| 8 | EXP-1109-CATALOG-DESC | catalog / zh-hk+ja | DEPLOYED | 392c5f30 · 11-09（desc 10 本起印 / 10冊〜） | 11-14 | 11-18 |
| 9 | EXP-1108-SMALLBATCH-SNIPPET | stickers / en | MEASURE | 无（SERP 不可得，HOLD/MEASURE） | 11-14 | 11-28 |
| 10 | EXP-STICKER-THIRD-WINDOW | stickers / zh-hk | HOLD | 无（第三窗 gate 未达，数据断供） | 11-14 | 12-04 |
| 11 | EXP-REDPACKETS-SEASON | red-packets / zh-hk | NO_OP | 无（季节窗+承接集中 75%） | **2027-01-05**（春节前 6-8 周真窗） | — |
| 12 | EXP-FOODBOX-OPP01 | packaging / zh-hk | **BLOCKED**（SERP feature 不可得；weekly-meta 下一窗 11-13） | 无 | 11-13 | 11-21 |
| 13 | EXP-BOOKS-DUAL-PAGE | books / zh-hk | MEASURE | 无（双页深位，禁 301/canonical） | 11-14 | 12-04 |
| 14 | EXP-SCHEMA-CATEGORY-DUP-NODES | technical / all | **FIX（pending-push）** | LOCAL-2026-11-10（删独立 itemListJsonLd，保 mainEntity） | 11-14（category Product 节点应 9） | — |
| 15 | EXP-SCHEMA-BRAND-DUP | technical / all | DEPLOYED | 414549e5 + c4605923（brand 集团常量 + 去 Product @id）；11-10 08:20 线上核验 PASS | **11-17**（等重抓清 GSC 3 项） | — |
| 16 | EXP-SCHEMA-RATING-GAP | technical / all | HOLD | 无（禁编造；待 K3 真实评价收集动作） | K3 决策后 | — |
| 17 | EXP-GEO-S1 | geo / all | MEASURE | 无（S1 基线 0/11 两遍一致） | **11-10 复测未执行** → 11-17 / 11-24（S2 窗 11-20..24） | 11-24 |

**待证**：账本 `next_actions_by_date.2026-11-10` 引用「月曆 EXP-1103-CALFAQ 7 天窗读数（基线在 11-03 报告）」，但 `experiments[]` 17 项中**无**该 ID——11-10 读数需先回 `docs/` 11-03 报告取基线；账本与实验数组存在引用缺口。

---

## ④ 11-13 到期项

1. **weekly-meta 20:52 自然轮首验**（脚本修复 1e85b0d4 后第一个验证点）：preflight 9/9 → 执行 批 1（**152 字符改稿**，勿用旧稿）+ 批 1b（GO）+ 逾期 sticker title 三页单变量单批；判据 = preflight 全过 + DSH 真实执行 + 当日报告与 bus 齐备（11-07 报告 §3 行）。
2. **批 1b 复测锚点 11-13**：`食品包裝印刷` 112@8.39 + `食品印刷` 62@7.48（11-06 报告 §三）；同锚在 11-20。
3. **EXP-FOODBOX-OPP01 下一窗 11-13**（weekly-meta 首验通过后取 SERP 快照再定 snippet 单变量）。
4. **数据供给前置**：账本 data_supply = **BROKEN_DAY6**（Clash/mihomo 7892 宕机 + 直连被墙）——若 11-13 前 K3 未补 11-08/09/10 四档导出 + 重启代理，11-13/11-14 全部复测降级 direction-only 或不可判。
5. 批次记账差异执行前必核：11-05/11-06 报告记 en stickers title 104 超带，账本 11-13 行写 **100**——执行时以 `scripts/guards/title-equiv.js` 实测为准（§五出入 1）。

---

## 五、口径出入与风险（显式登记，不替文档和解）

1. **en stickers title 超带当量**：11-05/11-06 报告 = 104；账本 11-13 行 = 100。两值并存，执行前以 title-equiv.js 当量实测裁决。
2. **队列 updated_at=2026-11-08 但含 11-09 两条 change_deployed**（a33abd3b / 392c5f30）——updated_at 未随 11-09 批次刷新，属元数据滞后，内容记账完整。
3. **调度真相**（账本 11-10 01:29 快照，取代 11-09 06:43 旧快照）：healthy = daily / gsc / k3-review / blog-deepfix（均 0）；watch = weekly exit=1（11-13 首验）；**broken = monthly-matrix（2147946720，第 9 天，需管理员重建）**。11-09 06:43 的 four 0x800710E0 已过时不得引用。
4. **计数口径**（账本 counters，2026-11-10 08:25 实测）：blog zh-hk 101 / en 102 / ja 101 / blog-posts.ts 111 条（unique 110）/ 三语并集 102 / 交集 101；money 词 28d = 29 词 2,102 imp 4 clk，页 1 零点击 7 行 239 imp；KPI 28d = 538 clk / 23,183 imp / CTR 2.32% / pos 14.28（data_day 11-04）。
5. **EXP-1103-CALFAQ 引用缺口**：见 §三末待证。

## 六、建议优先序（承接 11-09 §四 + 账本 next_actions）

1. K3/主机：重启 7892 代理 + 补 11-08/09/10 四档导出 + `fetch_gsc_data.py` + `gsc-cliff-detector.py` + `rebuild-gsc-index.mjs --write`（阻塞全部复测）。
2. 管理员：重建 `ZP-monthly-matrix`（第 9 天缺口）；DeepSeek 额度确认。
3. 11-13 weekly-meta 首验批（单变量单批 ×4）→ 11-14 首轮复测（8 个 DEPLOYED 实验 + schema 节点 9 复验）。
4. EXP-GEO-S1 补跑 11-10 复测（11 问题 × 2 遍同工具）；S2 窗 11-20..24。
5. 待 K3 清桌：packaging-zh-hk 商业真值 · catalog-en blog 内容门 · service 页超带/比较表述 · 海报旧价格 · ja H1 locale 错配 · 真实评价收集（EXP-16）。

（本 digest 落 `.hermes/geo/`，不冒充车道报告命名；内部文档，GSC 数据未入客户可见内容。）
