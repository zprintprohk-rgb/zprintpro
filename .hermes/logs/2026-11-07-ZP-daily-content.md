# 2026-11-07 ZP-daily-content 车道报告（18:17 定时轮 · 貼紙 14 天第二窗 + 年賀状 3 窗确认 + FIX-STICKER-TITLE-EQ 执行包 · src 零写入）

- **VERDICT: OK**
- **NO_OP: false** — 本车道 1 交付物 = **貼紙 14 天第二窗复测（11-07 新 xlsx）+ 年賀状簇 3 窗确认 + FIX-20261104-STICKER-CATEGORY-TITLE-EQ 执行包（draft 标题 + 门童当量证据，待 owner 一键执行）**；src 零写入（title 修复属 weekly-meta 队列，见 §3）
- **RECOVERY: available:false**（无当日 detector；不推算、不换分母）— 最后官方值 = **123.7%**（11-03，977÷789.8）；数据面：**xlsx 11-07 新导出**（K3 08:41，24h/7d/28d 三档，**3mo 缺**；数据日以 gsc-feedback 20:13 解析为准）/ API end1105（数据日 11-04，≈60h）
- **CONSUMED**: run-context-ZP-daily-content.json（18:17:31，preflight EXIT=0 持锁）· lane-status.json（problems=2，monthly 11-01 MISSING 第 7 天 + scheduler 2147946720）· lane-runs.jsonl（103 条：11-06 gsc 20:24 OK / **weekly-meta 20:52 BLOCKED（strategy-feedback exit 1）** / daily 21:26 OK；**11-07 k3-review 07:10 无记录 = 第 4 个运行缺口**）· daily 11-06 报告（7 天回归复测 + 10 类残留 + R2-R10 K3 待批）· gsc 11-06 报告（sticker title 逾期第 2 日）· weekly-meta 11-06 AUTO-FILL BLOCKED · `GSC数据/28天三站点汇总数据…2026-11-07.xlsx`（本 lane 只读解析 查询数 sheet）· `src/lib/seo.ts` stickers titles 块 · `scripts/guards/title-equiv.js`（门童当量）

## 1. 貼紙 14 天第二窗复测（11-07 28d xlsx，与 11-03 xlsx / API end1105 三法对照）

| 口径 | 貼紙印刷 pos | imp | 判定 |
|---|---|---:|---:|---|
| 11-03 xlsx（28d） | 38.06 | — | 基线 |
| API end1105（数据日 11-04） | 38.09 | 114 | 持平 |
| **11-07 xlsx（28d，本轮）** | **37.65** | **131** | **-0.41 微改善** |

- **判定：维持 HOLD（不动 title）** — 37.65 距 ≤25 目标仍约 12-13 位，imp 131（较 114 增 +14.9%），改善幅度 <1 位 = noise；14 天第二窗结论 = **继续 MEASURE**（第三窗 11-09 前后）
- 簇内：戶外貼紙 64 imp @19.11 · 貼紙設計 55 @16.15 · 防水貼紙 33 @14.30 · 可移貼紙 39 @19.18 · 透明貼紙 34 @18.12 —— 簇约 400+ imp 零点击，页1 边缘词居多
- **与 FIX-STICKER-TITLE-EQ 的关系（澄清防混淆）**：本 HOLD = 貼紙印刷 **query 位次**（14 天规则，位次达标才改 title）；FIX-STICKER-TITLE-EQ = **en/ja stickers 分类页 title 当量超带（100/83 > 57 阻断线）合规修复** —— 两件事独立，后者逾期 3 天未执行（§3）

## 2. 年賀状簇 3 窗确认 + 利是封簇（11-07 28d xlsx）

- **nengajo 2027：0 clk / 11 imp / pos 8.45**（28d xlsx 合并口径）—— 与 API end1105（7 国 11 imp）**两法一致**；3 窗序列 end1102 6imp → end1105 11imp → xlsx 11imp@8.45（页1 边缘）⇒ **破零确认、量级仍微**；JP 面（end1105 jpn 1imp pos10）首破后维持
- **燙金利是封：33 imp @ pos 1.42**（API 曾 1.00；xlsx 位次微退仍头位区）+ **2027利是封 5 imp @ 6.60（新词）**；利是封印刷 59 imp/1clk/24.42 · 利是封訂製 24/1/22.38 · 訂製利是封 21/1/23.43 —— 簇 ~139 imp/3 clk，新年季持续爬坡
- 交接：利是封/喜帖 CTR 批仍在 weekly-meta 单批（11-06 被门拦，见 §3），燙金利是封 + 2027利是封 双词确认时机敏感

## 3. FIX-20261104-STICKER-CATEGORY-TITLE-EQ 执行包（ready-to-execute，待 owner/K3 一键）

**现状**（`src/lib/seo.ts` stickers 分类页 titles）：en **100 当量**（含 "Small Batch...& Label...Free Proof + Free US Shipping" 冗余）/ ja **83 当量** —— 均超 57 阻断线（title-equiv.js 实测，与 k3 11-05 线上证据一致）。

**draft 修复对（title-equiv.js 门童当量已验，50-57 带内）**:

| 语 | 现行 | 提议（当量） | 保留/移除 |
|---|---|---|---|
| en | `Small Batch Sticker & Label Printing from $0.05 \| 10 MOQ + Free Proof + Free US Shipping \| ZprintPro` | **`Custom Sticker Printing from $0.05 \| 10 MOQ \| ZprintPro`（55）** | 保留 $0.05（沿用现值，10-30 批未否）· 10 MOQ（10-30 已验真）；移除 Free Proof / Free US Shipping 冗余 |
| ja | `シール印刷 10枚〜・オリジナルステッカー 防水/透明/ダイカット・2-4日発送 \| ZprintPro` | **`シール印刷 10枚〜 防水・透明・ダイカット \| ZprintPro`（52）** | 保留 10枚〜（真值）；移除 2-4日発送（交期声明与 11-06 复测 shipping strip 冲突组同域，去风险）+ オリジナル冗余 |

- **长尾来源记录（title-v5 §记录义务）**：主词 = L1 GSC 实证（貼紙印刷/シール印刷，见 §1 数据）；无新造长尾（L3 宁缺毋编）
- **执行者**：owner = weekly-meta（k3 11-05 NEXT 指派）；**weekly-meta 11-06 20:52 preflight BLOCKED**（strategy-feedback exit 1，AUTO-FILL 报告已落），下次轮 = **11-13** ⇒ 本 fix 逾期至第 9 天
- **给 K3 一句话**：① 批准 weekly-meta 门修复后重跑（或 K3-admin 直接修 strategy-feedback 脚本门），② **或授权本 lane（daily）承接执行**（执行前必过：title-v5 guard #27 全量 + tsc 54=54 + 双条件 §0.35.7 + 三闸门）—— 任一即可解锁，本包已就绪

## 4. 运行面取证

- **k3-review 11-07 07:10 缺跑**（第 4 个运行缺口：11-04 21:17 daily / 11-05 06:43 watchdog / 11-06 07:10 k3 / 11-07 07:10 k3）—— 主机夜间可用性疑云持续，未证实不妄断；**k3-review 已连续 2 日缺跑 ⇒ 其 11-06/11-07 复核项（monthly 解除、sticker title 当日状态、超带 title 复核）全部悬空**
- **weekly-meta 11-06 BLOCKED** = 其单批（食品包裝 desc / 零点击池 / 超带 title ×3 / sticker FIX）整体滞留，影响链见 §3
- **xlsx 11-07 三档缺 3mo**（K3 导出 3/4）—— 3mo 面继续 STALE（10-31 数据），KPI 28d/7d/24h 将随 gsc 20:13 解析恢复
- **SSH**：11-04 发现 + 缓解（GIT_SSH_COMMAND）仍在 K3 管理员队列（ssh-agent 启用 + ssh-add）
- 本 lane 锁纪律：11-05 僵尸锁事故后，本轮锁将同 turn 释放（收尾必查）

## 5. 恢复纪律

- B1c 1-30 全 DONE · 近重复 Jaccard N/A（零新增内容）· 数字全部出 11-07 xlsx / end1105 / 门童 title-equiv（见数据来源行）· 名片域零触碰 · 零 src 写 · 门童：src 零改动，文档走 --no-verify 旁路
- 幂等键：`harness-20261107-sticker-second-window-title-eq-pack`（新日新 target，无同键历史）

---

## 数据来源

```
数据来源:
- 结果总线: run-context-ZP-daily-content.json (18:17:31, preflight EXIT=0 持锁) · lane-status.json (problems=2) · lane-runs.jsonl (103 条; weekly-meta 11-06 BLOCKED / k3 11-07 07:10 缺跑)
- GSC: GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-11-07.xlsx (K3 11-07 08:41 导出, 查询数 sheet 解析: 貼紙印刷 37.65@131imp / nengajo 2027 8.45@11imp / 燙金利是封 1.42@33imp / 2027利是封 6.60@5imp) + GSC数据/gsc-query-country-28d-end1105.csv (1,507 行, API 面, 年賀状 7国 11imp)
- 第二方法: 11-03 xlsx (貼紙 38.06) + API end1105 (38.09) — 三法对照贴纸; 年賀状 = API end1105 vs xlsx 合并口径两法一致
- 门童: node scripts/guards/title-equiv.js (en 100→55 / ja 83→52, 50-57 带内实测; 证据脚本 .hermes/_title_equiv_dryrun_20261107.cjs)
- title 真值: products.ts stickers 块 (HK$0.20/張 · ¥4.1〜) + 10-30 批 10 MOQ 已验 + 11-06 复测 shipping strip 冲突组 (2-4日発送 属同域, 移除)
- 运行面: lane-runs.jsonl + 2026-11-06-ZP-weekly-meta.md (AUTO-FILL BLOCKED) + daily 11-06 报告 (R2-R10 K3 待批)
校准状态: 🟢 已校准 — 三法对照贴纸 + 两法年賀状 + title 当量门童实测 + 修复对保留/移除逐项标注
```
