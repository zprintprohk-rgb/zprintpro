# E2 catalog 承接诊断包（PROPOSE_ONLY）+ 11-04 运维附记

> 依据：`2026-11-03-three-market-one-two-week-optimal-strategy.md` §2.2 E2（catalog = 承接测量，先核装订/页数/纸张/打样/国际订单 + 采购指南内链作用）· `periodic-review-weekly-2026-11-03.md`（MEASURE gate）· `2026-10-30-three-strategy-completion-and-next-phase.md` §9.3
> 性质：诊断交付。零 `src/` 改动、零 canonical/redirect、零商业真值变更。

## 一、承接分布（query×page×country，09-30..10-27）

`china catalog printing`（7 行）：

| URL | 国家 | imp | pos |
|---|---|---:|---:|
| **/en/product/catalog-printing/** | usa | **40** | **13.30** |
| /en/product/catalog-printing/ | can | 11 | 13.91 |
| /en/blog/catalog-printing-china-supplier-guide/ | can | 8 | 10.00 |
| /en/blog/catalog-printing-china-supplier-guide/ | usa | 8 | 36.12 |
| /en/product/catalog-printing/ | gbr | 5 | 15.60 |
| /en/blog/…supplier-guide/ | gbr | 4 | 33.75 |

`catalog printing china`（4 行）：PDP usa 27 imp / pos 13.41；blog usa 5 / 30.40；zh-hk services 页 2 / 94.5（跨语噪音）。

**结论**：**PDP 已是集中主承接**（us/ca/uk 三市场一致，pos 13.3-15.6 = 页 1 尾至页 2 头），blog 仅在加拿大落在 10.0、其余市场 30+ 深位。**无内耗证据**，不支持 301/canonical（与 10-31 战略判断一致）。

## 二、页面级证据（2026-11-04 20:0x 实抓，均 200）

| 页面 | title（当量） | desc | 采购信息覆盖 | 内链 |
|---|---|---|---|---|
| /en/product/catalog-printing/ （主承接） | `Catalog Printing \| 10 MOQ $4.60 \| Free Ship \|（品牌）`（**55 ✅**） | 145 | 装订/页数/纸张/打样/国际 五类**全有** | 43 |
| /en/product/saddle-stitch-booklets/ （`saddle stitch booklet printing` usa 14 imp / **pos 9.71 页 1 零点击**） | `Saddle Stitch Booklets A4/A5 \| 10 MOQ $1.84 \|（品牌）`（**55 ✅**） | 150 | 五类全有 | 41 |
| /en/blog/catalog-printing-china-supplier-guide/ | `Catalog Printing China Supplier Guide: 4 Binding + 4 Paper`（**58 ⚠️ 触阻断线**、无品牌位） | **331 ⚠️ 超长（guidance 150-160）** | 五类全有 | 63 |

趋势（date×page，至 11-01）：catalog PDP 日展示 3-25（10-17 25 / 10-20 23 为高点，10-29/30 降至 3/2——尾端低值需下窗复核，不作结论）。

## 三、诊断结论

1. **承接结构健康**：PDP 集中、blog 辅助、无跨市场内耗 → E2 的「承接测量」结论 = **不需要结构动作**。
2. **真正的缺口是 snippet 卫生**（与 E2 绑定的 en books 簇）：
   - blog guide title **58 当量 = 阻断线**，且**无品牌位**（title 规则要求品牌末尾一次）；
   - 同页 desc **331 字符**（会在 SERP 被截断，且可能触发重写）；
   - `/en/category/books/` title **75 当量**（11-04 审计已记）。
3. `saddle stitch booklet printing` 是**页 1 零点击**（9.71 / 14 imp），snippet 已含 MOQ+价格，但 title 无「Printing」词形；属**意图-词形微差**假设，需有效 SERP 才能确认（当前地理不可验，K3 域）。

## 四、建议（全部 PROPOSE_ONLY，按优先级）

| # | 建议 | 风险 | 归属 |
|---|---|---|---|
| 1 | blog guide desc 331 → **150-160**；title 58 → **50-57 且补品牌位**（单变量分两批） | 低（snippet 卫生，非商业真值） | weekly-meta / meta 存量通道 |
| 2 | `/en/category/books/` title 75 → 带内（与 stickers 104 / ja stickers 83 同族，**分批**） | 中（title churn，需审批 + 门童 #25/#27） | 需 K3/车道批准 |
| 3 | saddle stitch PDP：**先补有效 SERP 证据**再谈 title 词形（当前 pos 9.71 已页 1） | 低（仅测量） | K3 出口前置 |
| 4 | catalog PDP：**不动**（title/desc 均达标，信息齐全） | — | — |

## 五、复测口径

- 建议 1 上线后：D1/D2 健康 → 11-13/11-20 同词同页复核 `china catalog printing`（PDP 基线 40 imp / pos 13.30 / 0 clk）与 blog 份额变化。
- 若 28 天内 PDP 主承接份额下降而 blog 上升 → 才进入内耗判别（当前无此证据）。

## 六、11-04 运维附记（非 E2 内容）

- `ZP-k3-review` 07:10 实质轮 **OK**（报告 33KB，已消费本会话 11-04 四件产物）；**09:15 重复轮 `wrapper_exit=5 / blocked_reason="git push failed"`**（dsh_exit=0，报告正常）→ 重复轮在远程已前进时 push 失败，**非系统性阻塞**（18:17 daily 车道推送成功 465a0ee9 可证）。建议：重复轮命中已存在报告时应走 NO_OP 而非再 push（下轮 k3-review 可自查）。

## 数据来源

- `.hermes/logs/gsc-2026-11-04-e2-live-probe.json`（三页实抓）
- `GSC数据/money-kw-query-page-country-2026-10-31.csv`（china catalog printing / catalog printing china / saddle stitch 承接）
- `GSC数据/gsc-date-page-28d-end1102.csv`（PDP 日展示序列）
- `GSC数据/gsc-query-country-28d-end1103.csv` + `.hermes/logs/gsc-2026-11-04-handoff-14q-snapshot.json`（API 现值）
- `.hermes/logs/2026-11-04-ZP-k3-review.md`（07:10 OK）+ `lane-runs.jsonl` #94（09:15 wrapper_exit=5）
