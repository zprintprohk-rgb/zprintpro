# 2026-11-25 ZP-daily-content 车道报告（18:17 定时轮 · NO_OP 内容层 · 貼紙第八窗 plateau + SMALLBATCH 7d 干净窗 · src 零写入）

- **VERDICT: OK**
- **NO_OP: true（内容层）** — daily 队列 READY=0；交付 = **貼紙第八窗复测 + SMALLBATCH 7 天干净窗复测**（11-25 新档，数据日 11-22）
- **RECOVERY: available:false**（detector 长期无档；最后官方值 **123.7%**（11-03，977÷789.8））
- **CONSUMED**: run-context-ZP-daily-content.json（18:17:04，preflight EXIT=0 持锁）· lane-status.json（problems=3）· lane-runs.jsonl（k3 11-24 PARTIAL / k3 11-25 07:15 PARTIAL）· `strategy-task-queue.json`（daily READY=0）· `GSC数据/*2026-11-25*.xlsx`（28d/7d/24h，K3 16:35 导出，数据日 11-22）

## 1. 貼紙第八窗复测（11-25 28d xlsx，数据日 11-22）

| 窗 | 档 | 貼紙印刷 pos | imp |
|---|---|---|---:|---:|
| 第六窗 | 11-19 | 29.94 | 179 |
| 第七窗 | 11-23 | 30.10 | 205 |
| **第八窗** | **11-25（数据日 11-22）** | **30.56** | **225** |

- **判定：plateau 确认** — 三窗在 30±0.6 震荡（29.94 / 30.10 / 30.56），**六窗改善 streak 结束**；imp 继续扩（179→225，+25.7%）但 pos 不再改善 ⇒ **HOLD 结论强化**（不动 title，且 title 面冻结中）；imp 持续增长 + pos 停滞 = **snippet/CTR 面问题**（225 imp 0 clk），候选 = desc/snippet 单变量优化（非本批，需 K3 拍板）
- 同档：**食品包裝印刷 156 imp @ 9.28（页1 改善）** · 月曆 175 @ 21.63（微退） · nengajo 19 imp @ 9.89（微退，1 clk） · 2027利是封 15 imp @ 6.53 · 證書 9 @ 10.11

## 2. SMALLBATCH 7 天干净窗复测（7d sheet，数据日 11-22，窗 11-16..11-22 = 部署 11-13 后纯 post 窗）

| 页 | 7d 干净窗 | 28d 对照（11-23 档） | 判定 |
|---|---|---|---|
| en small-batch | 0clk / 61imp / **pos 11.33** | 1clk / 229imp / 13.84 | pos **-2.51 改善**，点击 0 |
| ja small-batch | 0clk / 111imp / **pos 11.33** | 4clk / 460imp / 13.86 | pos **-2.53 改善**，点击 0 |
| zh small-batch | 0clk / 113imp / **30.89** | 3clk / 314imp / 34.24 | pos **-3.35 改善**，点击 0 |

- **判定：POS 方向转正，CTR 仍未咬合** — 三页 7d 干净窗位次全部优于 28d 混合窗（-2.5～-3.4），但 **7d 窗口 0 点击**（285 imp / 0 clk）⇒ **MEASURE 继续**：位次改善传导到 CTR 需要更长时间窗（下一判点 = 12-02 前后 14d 窗）；en 面 MOQ 口径修复未在 7d 内转化为点击
- 结论口径：**FIX_DEPLOYED → MEASURE（pos 正面 / CTR 未验）**，不宣称修复成效

## 3. 运行面

- k3 11-24 + 11-25 均 **PARTIAL**（连续）；11-24 调度事故后对端已加 watchdog 90min stuck guard（db362399）
- 数据：11-25 三档 16:35 导出（较前批 09:2x 晚）；3mo 仍缺
- 队列：daily READY=0；余 READY 归 blog-deepfix/manual

## 4. 恢复纪律

- B1c 38/38 DONE · 近重复 Jaccard N/A · 数字全部出 11-25 档（见数据来源行）· 名片域零触碰 · **title/H1 零改动（冻结）** · src 零写入
- 幂等键：`harness-20261125-noop-sticker-plateau-smallbatch-7d`（新日新 target，无同键历史）

---

## 数据来源

```
数据来源:
- 结果总线: run-context-ZP-daily-content.json (18:17:04, preflight EXIT=0 持锁) · lane-status.json (problems=3) · lane-runs.jsonl (k3 11-24/11-25 PARTIAL)
- GSC (第八窗): GSC数据/28天三站点汇总数据…2026-11-25 (2).xlsx (K3 16:36 导出, 数据日 11-22: 貼紙印刷 30.56@225imp / 食品包裝 9.28@156 / 月曆 21.63@175 / nengajo 9.89@19)
- GSC (7d 干净窗): GSC数据/7天…2026-11-25 (2).xlsx 网页 sheet (窗 11-16..11-22: en 61imp@11.33 / ja 111@11.33 / zh 113@30.89, 均 0clk)
- 对照: 11-23 档 28d 三页 (en 229@13.84 / ja 460@13.86 / zh 314@34.24) — 本车道 11-24 报告
- 队列: strategy-task-queue.json (daily READY=0)
校准状态: 🟢 已校准 — 八窗同法 + 7d 干净窗与 28d 混合窗分列 + plateau/CTR 未咬合 如实判定
```
