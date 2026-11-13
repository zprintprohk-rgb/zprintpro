# 2026-11-13 ZP-daily-content 车道报告（18:25 定时轮 · 执行 FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL · CT-D3 落地 · src 写入 6 处）

- **VERDICT: OK**
- **NO_OP: false** — 本车道 1 交付物 = **src 真值执行：`FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL`（k3 11-13 NEXT 指派 daily 取 1 个 READY，score 90 优先）+ 队列 DONE + RESET_BY_TRUTH_FIX**
- **RECOVERY: available:false**（detector 连续第 10 日无档；最后官方值 **123.7%**（11-03，977÷789.8）；11-10 派生 130.0% / 11-11 派生 105.3% 均标 DERIVED_NOT_DETECTOR 不替代）
- **CONSUMED**: run-context-ZP-daily-content.json（18:25:29，preflight EXIT=0 持锁）· lane-status.json（problems=3：weekly 1 / monthly 2147946720 / k3 2147946720）· **k3-review 11-13 07:16 报告**（NEXT：daily 只取 1 个 READY 真值任务 SMALLBATCH 90；A51 三页 title 已上线 11-12 22:55 禁二次改写；CT-D1-D6 03:10 裁决；调度残留 3 条 + 本车道 6/7 天缺跑）· `strategy-task-queue.json`（EN-STICKER-20261028-SMALLBATCH=DONE / **FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL=READY**）· `docs/2026-11-13-catalog-stickers-residual-anchors.md`（806a60e3，SMALLBATCH 精确锚点）· `commercial-truth-decisions-2026-11-13.json`（CT-D3）· `GSC数据/*2026-11-12*.xlsx`（三档隔夜补导，3mo 仍缺）

## 1. 交付：SMALLBATCH-TRUTH-RESIDUAL 执行（CT-D3，6 处 MOQ 口径分离）

**裁决（CT-20261113-D3，K3 03:10）**：10 stickers/pcs per design = **KEEP**；A4-sheet MOQ 与 pcs MOQ **分开表达不得互换**；from US$0.55 **条件化**（报价确认）；proof/生产/运输 = 报价确认。

**实际变更（commit `ff97d235`，2 文件 6+/6-，全钩子过）**:

| 文件 | 位置 | 变更 |
|---|---|---|
| sku-seo-data.ts | body | `from 10 pcs at $0.55/pc (A4 sheet)` → `from 10 pcs per design, from US$0.55/pc (final quote confirms price and schedule)` |
| sku-seo-data.ts | FAQ Q2 | `10 stickers (A4 sheet-based layouts), no setup fees...` → `10 stickers per design, no setup fees...` |
| products-content.ts | L1964 body | `Order from 10 stickers (sheet-based A4 layouts)...` → `...10 stickers per design...` |
| products-content.ts | L2007 Start-at | `Start at 10 stickers (A4 sheet layouts)` → `Start at 10 stickers per design` |
| products-content.ts | L2042 FAQ | `MOQ is <strong>10 stickers</strong> (A4 sheet-based layouts)` → `<strong>10 stickers per design</strong>` |
| products-content.ts | L2047 FAQ | `MOQ is 10 stickers (A4 sheet-based layouts) across...` → `MOQ is 10 stickers per design across...` |

**保留（CT-D3 合规）**：A4-sheet 独立表述 = Size & Format 表 Per-Sheet Yield 列（70-180/40/21/8 pcs）+ products.ts L957 desc「Minimum A4 size order」—— 两口径现分开表达；价格表 `50 pcs` 行 = 合法定价档（非 MOQ 声明）保留；`100% satisfaction guarantee / Door-to-door / Free design proof` = doujinshi/catalog 别页模板残留（锚点文档 §三），按单变量纪律**不入本批**（归 EN 模板条件化后续批，d450abbc 族）。

**三闸门**：#1 线上锚点（806a60e3 实抓）先于正则 ✓ #2 diff 逐行 6+/6- ✓ #3 双文件同法 + 残留扫描（pcs-MOQ 子句 0 残留；L10195 信封页 A4 尺寸合法保留）✓。门童：encoding/brand/gsc-leak/content/i18n PASS + tsc **54=54** + pre-commit 全过。SOP-5：body/faqs 为 TS 权威域（generator 保留 ts 现值，不经 CSV regen）→ 直接改 TS 合规。

## 2. 运行面消费

- **A51 三页 title 已上线并独立核验**（11-12 22:55，ae277dfa）：en stickers 100→55 / ja 83→52 / zh flyers 59→56 —— **FIX-20261104-STICKER-CATEGORY-TITLE-EQ（逾期 9 天）闭合**；本 lane 11-07 执行包（en-c25/ja-c6 当量 55/52）与上线值一致（门童 title-equiv 同法）
- **CT-D1-D6 裁决已出**（03:10）未部署：D3（本批已落地）、D4 catalog（残留锚点 §二，CATALOG score 87 待明日 daily 轮或手动）、D6 EN 模板 DELETE/CONDITIONAL（归后续批）
- 调度残留 3 条（weekly 1 / monthly 2147946720 / k3 2147946720）—— k3 11-13 07:16 为手动/看门狗触发，未声称调度恢复；k3 车道窗口内 6/7 天缺跑
- gsc 11-12 PARTIAL（无导出）已由隔夜 11-12 三档补导缓解；11-13 20:13 gsc 将拉 11-13 新档（未在总线，观察）
- 数据：KPI 面 FRESH（11-12 批，7d/28d 数据日 11-09≈31h）；3mo 缺第 5 批 ≈295h；API STALE

## 3. 复测挂账与窗口

- **RESET_BY_TRUTH_FIX**：本批部署重置 small-batch 测量窗；首复测 = **11-18**（7d 100% 窗）；11-14 只判方向且 stickers/flyers 三页标 `CONFOUNDED_BY_1112_TITLE`（title 变更后天数 0）
- 貼紙 14 天窗：第五窗待 ≥11-14 数据日（当前 11-17 目标）；上值 34.58@142imp（11-11 批）维持 HOLD
- 年賀状：最后读数 11-10 档（1 clk / 13 imp / 8.85）；nengajo 5 问仍待 K3

## 4. 恢复纪律

- B1c 38/38 DONE · 近重复 Jaccard N/A（无新增内容，仅 6 处口径分离改写）· 数字全部出 GSC 档/裁决单（见数据来源行）· 名片域零触碰 · title/H1/价格/MOQ 主值零改动（仅条件化表述）· 双条件 §0.35.7（src 无 MM + 对端最后 src 写 11-12 22:55 ae277dfa → 静默 >20h）✓
- 幂等键：`harness-20261113-smallbatch-truth-residual-exec`（新日新 target，无同键历史）

---

## 数据来源

```
数据来源:
- 结果总线: run-context-ZP-daily-content.json (18:25:29, preflight EXIT=0 持锁) · lane-status.json (problems=3) · lane-runs.jsonl (k3 11-13 07:16 OK)
- k3-review 11-13 报告 (NEXT: daily 取 1 READY SMALLBATCH 90 / A51 title 上线 11-12 22:55 禁二改 / CT-D1-D6 03:10 / 调度残留 3 条 / 6-7 天缺跑)
- 裁决: .hermes/logs/commercial-truth-decisions-2026-11-13.json (CT-D3: moq KEEP 10 stickers/pcs per design / from_price US$0.55 KEEP_CONDITIONAL / A4-sheet 分开 / 50 pcs 删或条件化)
- 锚点: docs/2026-11-13-catalog-stickers-residual-anchors.md (806a60e3, 线上实抓 11-13 12:0x 双方法)
- 队列: strategy-task-queue.json (FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL READY→DONE, write_scope 3 文件)
- 交付证据: git ff97d235 (2 文件 6+/6-) · tsc 54=54 · 门童全 PASS · 残留扫描 (pcs-MOQ 子句 0; L10195 信封页合法)
- GSC: *2026-11-12*.xlsx 三档 (K3 11-12 22:40 补导) · gsc-cliff-2026-11-03.json (123.7% 最后官方)
校准状态: 🟢 已校准 — 线上锚点→正则→diff→残留 四步 + 队列 DONE 回写 + RESET_BY_TRUTH_FIX
```
