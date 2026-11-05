# 2026-11-05 晚·首席分析师执行报告（gsc 车道 BLOCKED 事件记录 + 页1零点击池 snippet 证据补齐）

> 日期：2026-11-05 20:1x（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 依据：`重要文件/2026-11-03-three-market-one-two-week-optimal-strategy.md`（§2.1 Z1「先测量：记录实际排名页、标题链接、摘要」+ §五自动化验收）· `2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md` · `.hermes/logs/2026-11-05-ZP-k3-review.md`（07:10 NEXT）· `.hermes/logs/gsc-daily-anomaly-2026-11-04.json`（A34 池 16 行 / O4 gate）
> 本轮性质：**运行面事件记录 + 池行 snippet 证据补齐（MEASURE／FIX-prep，PROPOSE_ONLY）**。零 `src/` 写入、零 title/desc/正文改动、零 commit/push（同今晨批次，留给车道）。

## 〇、一句话结论

**今晚 20:13 gsc-feedback 车道被 preflight 锁互斥 BLOCKED（`wrapper_exit=10`，锁被 ZP-daily-content 持有 3.0 min），且持锁进程 pid 25932 已死——这是「陈旧锁 + 跨车道锁冲突」事件，gsc 今晚失跑（NextRun 11-06 20:13），但数据面无损（end1105 今晨已在盘），detector 连续第 2 天缺失、恢复系数第 2 天 UNKNOWN。同一时点，我补齐了页 1 零点击池（16 行 / 632 展示）候选承接页的线上 snippet 证据（新抓 7 页），并给出 triage：大信封（长期 top-5 零点击，9/2 即 2.16 位 89 展示 0 点击）判 MEASURE 非 FIX；即日急件／海報印刷即日（rush 页 desc 113 字符偏短）与小冊子印刷（books 页 desc 141 偏短）记为后续批 desc 候选，不进 11-06 批。**

## 一、运行面事件：11-05 20:13 ZP-gsc-feedback BLOCKED（四方证据）

| 判据（§0.35.4） | 证据 | 判定 |
|---|---|---|
| ① lane-runs.jsonl | `ZP-gsc-feedback-20261105T201303` verdict=**BLOCKED**，phase=preflight，`wrapper_exit=10`，`blocked_reason=锁被 ZP-daily-content 持有 (3.0 min)`，dsh 未调用 | 失跑确认 |
| ② wrapper/日志 | `2026-11-05-ZP-gsc-feedback.md`（919 B，AUTO-FILL）VERDICT BLOCKED；`cron-ZP-gsc-feedback.log` mtime 20:13:03 | 无产出 |
| ③ 锁文件 | `.hermes/locks/lane.lock`：lane=ZP-daily-content、pid=25932、acquired_at=**20:10:02**；`Get-Process -Id 25932` → **进程不存在（已死）**；`cron-ZP-daily-content.log` mtime 仍为 11-03 21:21:58（20:10 的 daily preflight 从未进入 wrapper 日志） | **陈旧锁**（死进程遗留） |
| ④ 调度器 | `ZP-daily-content` LastRun 11-05 01:06:07 / LastResult=2147946720 / **NextRun 11-05 21:17:00**；`ZP-gsc-feedback` LastRun 11-05 20:13:01 / LastResult=1 / **NextRun 11-06 20:13:00** | daily 今晚仍将触发 |

**根因画像**：daily-content 的 preflight 于 20:10:02 抢锁后进程死亡（未进入 dsh、未写 wrapper 日志、未释放锁），20:13 gsc preflight 撞锁 → BLOCKED（exit 10，按 §0.35.4 映射 = 锁被占用）。

**恢复路径（自动）**：daily 21:17 自然触发时锁龄 = 67 min > 3600 s 陈旧阈值 → 按 §0.35.5「3600s 陈旧可夺」自行接管，daily 应正常执行（A38 优先级）。gsc 无当日补救（勿手动代跑 lane）；下次自然触发 11-06 20:13 将消费 end1105/end1106。**若 21:17 daily 亦被同一锁阻挡（不应发生）→ 升级 request_human**。

**影响**：今晚 gsc 四字段报告／anomaly JSON／detector 缺失；KPI 四指标与恢复系数连续第 2 天 UNKNOWN（xlsx 第 2 天 STALE，数据日 10-31 ≈103h；24h 窗止 11-03 02:00）。数据面安全：`end1105.csv`（数据日 11-04，窗 10-08..11-04，1,507 行 / 74 clk / 8,115 imp）已在盘，index.json 256 文件 FRESH。

**给 K3/管理员**：① 建议 `schtasks /run /tn ZP-gsc-feedback` 于 11-06 20:13 前某时点手动补跑一轮（可选，非强制；恢复系数仍依赖 xlsx 导出）；② 陈旧锁成因待看门狗核查（20:10 daily preflight 为何触发——非 21:17 调度时点，疑似 harness/手动触发后进程被杀）。

## 二、页 1 零点击池（16 行 / 632 展示）候选承接页 snippet 证据（2026-11-05 20:1x 线上实抓，curl HTTP 200）

| 池行（API 10-06..11-02） | 候选承接页 | title（线上） | desc 长度／语言 | 当量（启发式） | 备注 |
|---|---|---|---|---|---|
| 食品包裝印刷 114@8.53 | `/zh-hk/blog/food-packaging-printing-guide/` | 食品包裝印刷完全指南：材質、安全、法規與設計實務 \| 智印港 | **125 英文** | — | 今晨已记录；批 1b 修正对象 |
| 食品印刷 62@7.90 | 同上 | 同上 | 同上 | — | 批 1b 复测锚点 |
| 大信封 36@3.94 | `/zh-hk/category/envelopes/` | 大信封印刷 100個起・C4/C5/DL・急件即日・DHL全球 \| 智印港 | 137 中文 | **50** ✓ | title 主词「大信封印刷」在位 |
| poster 印刷 75@10.95 | `/zh-hk/category/posters/` | 海報印刷 A0/A1/A2・防水1張起印・展覽/MTR 燈箱 \| 智印港 | 156 中文 ✓ | 48（贴带下沿） | desc 在带；attribution 待 page 级确认 |
| 海報尺寸 20@4.85 | 同上 | 同上 | 同上 | 同上 | size 意图；疑似承接 blog（poster-size 内容） |
| 海報size 27@9.19 | 同上 | 同上 | 同上 | 同上 | 同上 |
| 小冊子印刷 43@10.74 | `/zh-hk/category/books/`（slug=books，booklets 404） | 小冊子印刷 10本起・騎馬釘/膠裝/精裝 教材繪本急印 \| 智印港 | 141 中文 | **52** ✓ | desc 短 9-19 字符 |
| 邊度有紙袋買 25@7.88 | `/zh-hk/category/paper-bags/` | 紙袋印刷 100個起 HK$3-8/個 \| 牛皮白卡環保袋 \| 智印港 | 150 中文 ✓ | — | question 词；title 无该词属正常 |
| 即日急件 24@7.83 | `/zh-hk/services/rush-printing-delivery/` | 即日印刷・即日急件｜18:00 截單・翌日 12:00 送到 \| 智印港 | **113 中文** | 49（贴带下沿） | desc 短 37-47 字符 |
| 海報印刷即日 20@9.55 | 同上 | 同上 | 同上 | 同上 | rush 族变体 |
| doujinshi printing 35@10.91 | `/en/category/books/` | Saddle Stitch Booklet Printing from $1.84 \| 10 MOQ + Free Proof \| ZprintPro | 153 英文 ✓ | **75（超带，官方审计值）** | 已在 11-06 title 批候选 |
| 燙金利是封 jpn 33@1.0 | `/ja/product/foil-red-packets/` | 箔押しポチ袋印刷 \| 12色 100個から HK$1.10起 | 96 日文 | 55 | 11-04 已记录（批 5 + A38） |
| a1海報 twn 27@1.0 | `/zh-hk/category/posters/`（推断） | 同上 posters | 156 | 48 | 跨市场行，attribution 待 page 级 |
| small batch sticker printing 29@5.83 | `/en/category/stickers/` | Small Batch Sticker & Label Printing from $0.05 \| 10 MOQ + Free Proof + Free US Shipping \| ZprintPro | 162 英文 | **104（超带，11-03 实测）** | 逾期 title 任务（11-06 批） |
| 包裝食品 裡印 31@9.39 | 待归因 | — | — | — | 拼写异常长尾，人工解读前 HOLD |
| z print 31@8.90 | 品牌变体 | — | — | — | 品牌观察，非钱词 |

（`/zh-hk/product/envelopes/` 返回首页兜底 title「智印港 \| 香港印刷服務」——该 slug 未注册产品，观察项不采信。当量为启发式（CJK×2+ASCII），title 改动前必过 `scripts/guards/title-equiv.js`。）

## 三、池行 triage 更新（建议，PROPOSE_ONLY）

1. **大信封 → MEASURE（非 FIX）**：长期 top-5 零点击（9/2 即 pos 2.16 / 89 imp / 0 clk），摘要本身健康（title 主词在位、desc 137 带数字钩子）→「改摘要」假设弱，更可能被 SERP feature（图片/本地/问答）吸收或意图分流；**需 HK/US 出口 SERP 证据后判定，不自动改 desc**。
2. **即日急件＋海報印刷即日 → rush 页 desc 113 偏短**（37-47 字符缺口）：desc-only 候选，**不进 11-06 批**（避免单批变量过多无法归因），记后续批（锚 `即日急件` 24@7.83 / `海報印刷即日` 20@9.55，11-13 后窗口）。
3. **小冊子印刷 → books 页 desc 141 偏短**（9-19 缺口）：desc-only 候选，**不进 11-06 批**；锚 `小冊子印刷` 43@10.74。
4. **海報尺寸／海報size／poster 印刷 → 归因待确认**：posters category desc 156 已在带；若页级归因显示 poster blog 抢头（NEW-4 家族），desc 修复目标应指向 blog 而非 category——与今晨食品包装同型，**11-06 前若有 page 级导出须回读**。
5. **邊度有紙袋買 → MEASURE**：question 词（where to buy），pos 7.88 零点击疑被 PAA/问答 feature 吸收；摘要健康（150 ✓），不改。
6. **燙金利是封 jpn 1.0 / a1海報 twn 1.0 → MEASURE**（跨市场行，locale/意图假设，A35）；批 5（ja desc 96→150-160）维持不变。

## 三-A 页级归因实证与修正（2026-11-05 20:3x，GSC query×page×country 09-30..10-27）

> 把 §二 的「候选承接页（推断）」升级为「实证页 1 ranker（GSC 页级）」；4 处推断被实证纠正。池行→实证页→线上 snippet：

| 池行（API 10-06..11-02） | **实证页 1 ranker**（09-30..10-27） | 页级 pos/imp | live title | live desc | 对 11-06 批的含义 |
|---|---|---|---|---|---|
| poster 印刷 75@10.95 | **`/zh-hk/blog/poster-printing-guide/`** | 10.18 / 74 | 中文 | 197 英文（批 1 before） | **批 1 实证对准**；本行＋海報尺寸＋海報size 共 **122 imp** 同受益 |
| 海報尺寸 20@4.85 | 同 blog | 7.19 / 16 | 同上 | 同上 | 批 1 复测可加锚（11-13） |
| 海報size 27@9.19 | 同 blog | 9.64 / 25 | 同上 | 同上 | 同上 |
| 大信封 36@3.94 | **`/zh-hk/product/large-envelopes/`**（非 category） | 3.56 / 36 | `大號信封 \| C4 229×324mm 平放A4 100個起 HK$0.60起 \| 智印港` | 134 中文（短 16-26） | MEASURE（长期 top-5 零点击；title 词形「大號信封」≈「大信封」；desc 短但含数字钩子） |
| 小冊子印刷 43@10.74 | **`/zh-hk/blog/saddle-stitch-booklet-printing-guide/`**（非 books category） | 10.19 / 48 | `騎馬釘小冊子印刷完全指南：頁數、紙張、價格與低 MOQ \| 智印港` | **113 中文**（短 37-47；**含「vs Alibaba 黃頁」**） | desc 候选（后续批）；Alibaba 提及触发 brand guard 关注，改写时须过 `check-brand-mentions.mjs --strict` |
| 邊度有紙袋買 25@7.88 | **`/zh-hk/product/handle-bags/`**（非 paper-bags category） | 8.52 / 23 | `環保手挽袋 \| 100%環保 多尺寸 \| 100個起 HK$8起 \| 智印港` | 124 中文（短 26-36） | MEASURE（question 词，PAA 吸收假设）；desc 偏短记候选 |
| 即日急件 24@7.83 | **`/zh-hk/blog/rush-printing-hk-guide/`**（非 services rush 页） | 6.40 / 15 | `即日急件印刷全攻略：邊度最快？幾錢？幾點截單？\| 智 \| 智印港` | **109 中文**（短 41-51） | **新缺陷：title 出现「\| 智 \| 智印港」双品牌残留**；desc 偏短；均为候选（title 需 title-v5 门禁 + 单变量，不进 11-06 批） |
| 海報印刷即日 20@9.55 | 同 rush blog | 9.33 / 6 | 同上 | 同上 | 同上 |
| doujinshi printing 35@10.91 | **`/en/product/doujinshi-printing/`**（非 en books category） | 10.42 / 31 | — | — | en books title 75 超带属 saddle 词族，**与 doujinshi 无关**；doujinshi PDP 为页 1 边缘 ranker，观察 |
| 即日印刷（rush 族，1 clk） | rush blog | 10.59 / 39 | 同上 | 同上 | 全族唯一有点击行，印证 rush blog = 家族承接页 |

**实证结论**：
1. **11-06 批 1（poster blog desc 英→中）目标实证对准**，且同时服务池内 3 行（poster 印刷／海報尺寸／海報size，合计 122 imp / 19% 池量）；复测锚点可加这 3 行（同页同词同国家）。
2. **「blog 抢头」再添 3 例**：poster blog（3 行）、saddle-stitch blog（小冊子）、rush blog（即日/急件族）——与 NEW-9 系统性结论一致；desc 语言/长度缺陷集中在 blog 层。
3. **新缺陷登记**：rush blog title 双品牌残留「\| 智 \| 智印港」（客户可见），须 title-v5 门禁评估后单变量处理（不进 11-06 批）。
4. **saddle-stitch blog desc 含「vs Alibaba 黃頁」**：品牌 guard 关注点，改写候选须先过编造/brand lint。

## 四、11-06 weekly-meta 批不变项确认

批 1（poster blog desc 197 英文→中）· 批 1b（food blog desc 125 英文→中，152 字符逐字稿，今晨增补）· 批 2（category desc，复测锚点已改 食品包裝訂製＋包裝盒印刷/訂製/紙盒印刷）· 批 3（ja textbook desc 111）· 批 4（en catalog blog title 58+desc 331，title/desc 分两批）· 批 5（ja foil-red-packets desc 96）· 逾期 sticker title（en stickers 104 / ja stickers 83 / en books 75）各自单批。**池内其余行（大信封/海報尺寸/即日急件/小冊子/邊度有紙袋買）不进 11-06 批**，待 SERP 证据与页级归因。

## 五、K3 清桌（承接 11-04/11-05，本报告新增 2 条）

1. monthly-matrix（MISSING 第 5 天）`schtasks /change /tn ZP-monthly-matrix /st 12:13` 或重建。
2. 11-04/11-05 四档 xlsx 导出（KPI 四指标与恢复系数连续第 2 天 UNKNOWN）。
3. O2 恢复口径 SSoT（推荐 A：xlsx 24h ÷ 同批 28d 动态分母）。
4. 模板真值 A/B/C + D3（第 7 天，含 ja textbook desc JPY 冲突线上实锤）。
5. A38（ja 利是封中文残留）daily 今夜 21:17 优先；涉商业值项需先拍板。
6. SERP 核验出口（FIX 准入前置，需 HK/US IP）。
7. **【新增】gsc 陈旧锁事件**：20:10 daily preflight 死进程遗留锁 → 建议看门狗核查 20:10 触发源；若 21:17 daily 受阻则 request_human。
8. **【新增】`/zh-hk/product/envelopes/` slug 未注册**（返回首页兜底）——若 GSC 有该 URL 展示则需查（当前无证据，仅登记）。

## 六、边界与数据来源

- 零 `src/`；零 title/desc/正文改动；零队列状态翻转；零 commit/push。
- 所有数字出 GSC 导出/JSON/线上实抓；无 GA4/008/订单（§0.37）；无 GSC 黑话进客户可见内容（本文件仅内部）。
- SOP-10 五问：① 已核 anomaly/执行清单/k3 NEXT 路径；② 只记录证据与候选，未改任何冻结域；③ 数值全部出站内可见正文与 GSC 导出；④ 未确认字段留空不补值；⑤ 内部文档，未改用户可见渲染。

## 数据来源

- 运行面：`.hermes/logs/lane-runs.jsonl`（#97 gsc BLOCKED）· `2026-11-05-ZP-gsc-feedback.md`（AUTO-FILL）· `.hermes/locks/lane.lock`（pid 25932 / 20:10:02）· `Get-Process -Id 25932`（不存在）· `Get-ScheduledTaskInfo`（daily 21:17 NextRun / gsc 11-06 20:13 NextRun）
- 数据面：`GSC数据/gsc-query-country-28d-end1105.csv`（1,507 行，数据日 11-04）· `GSC数据/index.json`（256 文件）· `.hermes/logs/gsc-cliff-2026-11-03.json`（官方 123.7%）
- 池行：`.hermes/logs/gsc-daily-anomaly-2026-11-04.json`（A34 16 行 / O4 gate / C2 top-5）
- 线上实抓（2026-11-05 20:1x，curl HTTP 200×7）：envelopes / posters / books / paper-bags / rush / en-books category；product/envelopes 兜底页
- 前序：`docs/2026-11-05-food-packaging-fix-attribution-correction.md`（今晨批 1b/批 2 改锚）· `docs/2026-11-04-weekly-meta-execution-sheet-1106.md`（§E 增补）

（本报告落 `docs/`，不冒充 `2026-11-05-ZP-*.md`；同步副本 `重要文件/`。）
