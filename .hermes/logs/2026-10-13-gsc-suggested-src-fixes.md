# GSC Suggested SRC Fixes — 2026-10-13 (lane ZP-gsc-feedback · 恢复模式轮)

> 本 lane 写权限仅限 `.hermes/` + `GSC数据/index.json`，**零 src 改动**。下列为 10-13 实时档（恢复系数复算）+ 线上探针 + grep 实证驱动的 src/管道修复建议，待 K3 拍板后由 daily-content / weekly-meta / blog-deepfix / monthly-matrix 车道或人手会话排批执行（per v9.3 §S2：引用 slug 批次需先跑存在性校验）。
>
> 上轮挂账继承：`2026-10-10-gsc-suggested-src-fixes.md`（FIX-1~FIX-6）。
> **本轮性质**：**无新 28d 档**（10-09 档仍为最新完整档）⇒ 修复清单以「状态更新 + 新增线上实证发现」为主，**不重述上轮已交付结论**。

---

## FIX-1 / FIX-2 [维持：挂账 → 已达标观察] 宣傳單張 / 包裝盒訂製 精确锚回補

- **本轮状态**：**不重算**（本 lane 无 src 写权；今日 zh-hk.json 的唯一他方改动 = daily-content 车道 L620 H1 文本片段「TOP3 → 12 大行業 工藝全攻略」，非锚文本域）。
- **交叉复核（本轮 grep 实测，法2 口径）**：`src/data/blog-data/zh-hk.json` 中 8 词（包裝盒印刷 / 紙盒印刷 / 包裝盒訂製 / 貼紙印刷 / 宣傳單張 / 即日印刷 / 書刊印刷 / 騎馬釘）**全部仍有正文命中（43 行，任意形态）** ⇒ 无词面消失，无回归证据。
- **判定维持**：法1（精确内链锚）沿用 10/10 实测 **8/8 ≥3（首次满编）**；标注 `ALREADY_DONE(2026-10-10)`。下一次复算窗 = 10/16-10/17。
- **红线不变**：不改 slug / 不砍页 / 不动已部署 title（v9.3 任务 J churn 红线，title 冻结至 10/19）。

## FIX-3 [维持挂账第 4 轮 · 需 K3 确认口径] 全站 footer 实体地址不一致

- **本轮状态**：**未复探**（无新证据；线上样本与 10-06/10-10 同）。风险面不变：法律公示（§3 法务口径）+ NAP 一致性 + GEO 实体信号。
- **建议动作（候选，需 K3 拍板口径）**：footer 公司地址统一为深圳实体（如需 HK 存在感，保留「香港服務據點」式客服表述）。
- **执行车道**：全站共享 footer 组件（src 行为变更）⇒ 建议 K3 指定 batch 单独排批，不与内容批混推。

## FIX-4 [🔴 升级为 P1 阻断项 · 第 3 轮未解] 数据管线：3mo 窗 + 多行 per-query 机器格式

- **本轮新增实证（两法）**：
  - 法1 `glob GSC数据/*2026-10-1*` ⇒ **仅 2 个文件：`实时24小时…2026-10-12.xlsx` 与 `…2026-10-13.xlsx`**；28d 档最新仍为 `…2026-10-09.xlsx`。
  - 法2 `.hermes/logs/gsc-cliff-2026-10-13.json` ⇒ 三站点 `latest_date = 2026-10-05`、`data_age_days = 8`、`alerts = WARN_STALE ×3`。
- **后果（本轮实测）**：本 lane **连续第 2 轮无法产出任何新增 28d 词级结论**（锚点表 33 位、CTR c 值池、risers/fallers、品牌长窗全部只能继承 10/10）；恢复期判读只剩实时 24h 单一鲜源。4 个任务 J 锁词（包裝盒印刷 / 紙盒印刷 / 包裝盒訂製 / 騎馬釘）**连续第 2 档 PENDING**。
- **请求（K3 一次动作，无需管理员）**：下次拉档时 ① 勾选 **3 个月窗**（连续第 3 档缺 ⇒ 品牌长窗/长趋势彻底不可算）② **同时落盘多行 per-query JSON**（如 `GSC数据/gsc-queries-<date>.json`，每词一行；或恢复 §J-1.1 既定 `gsc-fresh-YYYY-MM-DD.json`）。
- **我方可自办部分（制度建议）**：把实时 24h 档纳入索引 —— 见 FIX-8。

## FIX-5 [状态更新 · 与 10-13 战略 W1 对齐] CTR 修复候选池第二批

- **新对齐事实（本轮新增，非重复）**：`docs/2026-10-13-three-site-one-month-seo-aeo-geo-strategy.md` §3 W1「CTR 歼灭批」指定的 4 词 = **紙袋印刷 / 印刷紙袋 / 食品包裝印刷 / 餐牌印刷**——与 10/10 本 lane 输出的 CTR 池（c=0 连续两档，28d 档）**四词全中**。⇒ 判据一致，**无需改口径**；池内证据可直接作 W1 排批依据。
- **本轮池内新增证据（实时 24h 口径，10-13 档）**：`食品包裝印刷` 24h 位置 **6.6**（28d 档 9.66）；`海報印刷` 24h **8.9**（28d 16.1）；`印海報` 24h **7.0**（28d 15.1）⇒ 三词在实时窗回首页/前 7，**但 28d 窗口内其 c 值仍为 0** ⇒ 支持「先修钩子、再看 7-10 天 CTR 验证窗」的 W1 顺序。
- **红线**：**仅 metaDescription / 类目页文案层**，不碰 title（title 冻结至 10/19）；价格/MOQ/交期一律取 `src/data/products.ts` 真值（§0.23 / 门童 #24）。
- **待 K3 排批的第 2 批（维持 10/10 清单）**：食品包裝印刷 / 紙袋印刷 / 印刷紙袋 / 餐牌印刷 / ja 特急印刷 激安。

## FIX-6 [维持挂账 · 需 K3 排批] books 类目页 MOQ 口径漂移（1 本 vs 真值 10 本）

- **本轮状态**：**未复探**（不新增证据，不改判）。证据链仍见 10/10 报告（法1 线上 `/zh-hk/category/books/` 正文「1 本起訂」vs 法2 `products.ts` BK-002 `minQuantity: 10`）。
- **合并建议不变**：与 flyers「MOQ 低至 100 張」漂移合并为「**MOQ 口径批 1**」一次排批。
- **制度建议（需 K3 拍板）**：把 `category-seo-content.ts` / `category-conversion-blocks.ts` 纳入门童 #24 扫描域（现无 MOQ 目标档时 SKIP ⇒ 该两处不被覆盖）。

## FIX-7 [🆕 新增 · P0 挂 K3 §0.0 裁决] en greeting-cards 类目页 §0.0 敏感面 + 跨语言量词

- **证据（两法，本 run 一手）**：
  - 法1 线上实测：`web_fetch https://zprintpro.com/en/category/greeting-cards/`（HTTP 200，2026-10-13）——商品卡标题仍为 **「Thick Business Cards (400g+) · Free Shipping · ZprintPro」**；卡片元信息仍写 **「[MOQ] 10 張」**（繁中量词混入 en 页，全页 6 张卡）。
  - 法2 仓内路径继承：`docs/2026-10-12-recovery-lane-defense-plan.md` §5（v22 改名残留 6 槽，`thick-greeting-cards-400g` / `foil-greeting-cards`，含 en/ja keywords 繁中污染）——与法1 线上所见同源。
- **为什么不擅自动**：§0.0 解禁块 (a)/(b)/(c) **未裁决**；恢复期红线⑤「不动贺卡资产 / 不动 middleware 301 / 不建名片页」。
- **请求（K3 一句话）**：裁决 (a)(b)(c) → 解锁 6 槽残留收口范围（推荐 (c)：只改 SKU 显示名/尺寸矛盾与 keywords 去毒，不动 301 与贺卡承接页）。

## FIX-8 [🆕 新增 · 我方自办 · 数据管线] 实时 24h 档未入索引、无机器格式

- **问题（本轮实证）**：`GSC数据/index.json` 的 `filesByDate` **无 2026-10-12 / 2026-10-13 条目**，`totalFiles` 仍 163、`lastBuild` 冻结在 2026-10-10T22:43——而**恢复曲线的唯一鲜源**恰恰是这两个实时 24h 档。⇒ 断崖判据（`gsc-cliff-*.json`）与实时档在索引之外，`stalenessDays` 会被乐观化（10-12 k3-review F2 已登记，本轮延续）。
- **建议动作（零 src 代价，管道层）**：每次拉档后把实时 24h 的「图表」sheet 落一份机器格式（如 `.hermes/logs/gsc-24h-<date>.json`：逐小时 clicks/imps + 窗口起止），并把它写进 `GSC数据/index.json`（`filesByDate` + `notes`）；恢复期每日执行。
- **本轮已自办部分**：本 lane 已把 10-12 / 10-13 两个实时档登记进 `GSC数据/index.json`（见本 run DELIVERED），并诚实改写新鲜度字段（见下）。

## FIX-9 [🆕 新增 · 🔴 超线发现] `/en/category/greeting-cards/` title 半角当量 ≈84（超 58 阻断线）

- **证据（双方法手算，§0.23.2）**：
  - 法1 分段加总：`Business & Holiday Card Printing from $0.50`(43) + ` | Corporate Christmas 10 MOQ`(29) + ` | ZprintPro`(12) = **84**。
  - 法2 逐段独立复算：8+1+1+1+7+1+4+1+8+1+4+1+5 = 43；3+9+1+9+1+2+1+3 = 29；1+1+1+9 = 12 ⇒ 84。**两法一致**。
  - 实测原文（web_fetch 2026-10-13 HTTP 200）：`Business & Holiday Card Printing from $0.50 | Corporate Christmas 10 MOQ | ZprintPro`。
- **判定**：**超 50-57 目标区 +26，超 58 阻断线 +26**；与既有存量 3 条（catalog-printing-china 77 / rush en 66 / ja 59）**同族，且为其中最长的第 4 条**。
- **执行建议**：**本批零动作**（title 冻结至 10/19，churn 纪律），纳入 **10/19 title 解冻 TRIM 批**；TRIM 时保留 `Corporate Christmas` / `Holiday Card`（盲开承接词）与 `$0.50` 数字钩，删 `Business`、`10 MOQ`（卡片层已写 MOQ）优先。
- **诚实声明**：半角当量为**手算**（本 lane 沙箱 pwsh 被禁、无 node ⇒ **未跑** `scripts/guards/title-equiv.js`）；若 host 侧跑出不同值，以 `title-equiv.js` 为准。

---

## 不提议项（本轮证据不支持动）

- ❌ **8 T1 锁词 title 重写 / churn 组（教科書 印刷 34.6）提前动作**：title 冻结至 10/19；churn 判据日 10/19。
- ❌ **年賀状 / holiday cards 追加资产**：承接段 10/9 已 live 且 en 类目 title 已含 `Corporate Christmas`（本轮实证）⇒ 10/16 仍 0 展示才启 Plan B（先修收录，不追加资产）。
- ❌ **按实时 24h 单窗做排期决策**：10-13 恢复系数 127.6% 是**点不是线**（窗口 10-11 22:00~10-12 21:00，80% 落在 B1a/B1b 去毒部署**之前**，且与上一窗之间有 ~43h 空档）⇒ 只登记曲线，不据此改内容优先级（恢复期红线：先保恢复）。
- ❌ **`products.ts` / `sku-seo-data.ts` / sitemap / `b1c-queue-progress.json` 任何写入**：上述文件**今日已被 ZP-daily-content 车道改写**（跨车道避让，契约 §二.6）。

---
*Generated by DSH lane ZP-gsc-feedback · 2026-10-13 22:43 窗口 · 证据源: `.hermes/logs/gsc-cliff-2026-10-13.json` · `GSC数据/index.json` · `GSC数据/实时24小时…2026-10-{12,13}.xlsx`(存在性; 数值经 cliff JSON 与 docs 转录) · `docs/2026-10-13-three-site-one-month-seo-aeo-geo-strategy.md` · `docs/2026-10-12-recovery-lane-defense-plan.md` · `.hermes/logs/2026-10-13-ZP-daily-content.md`(只读) · grep `src/data/blog-data/zh-hk.json` ×1 · web_fetch ×7（2026-10-13）*
