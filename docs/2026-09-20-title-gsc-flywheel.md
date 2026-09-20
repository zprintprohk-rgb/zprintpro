# 标题-GSC-关键词库增长飞轮 SSoT (K3 2026-09-20 指令)

> 四环: GSC 定位机会词 → 素材库扩展钩子 → 深度标题升级 → CTR 反哺 GSC。
> 本文件是飞轮的运行 SSoT；规则层 SSoT 仍是 `docs/2026-09-13-title-batch-T-freeze.md` §6-3（50-57，58 阻断）与 `scripts/guards/title-equiv.js`。

## 1. 飞轮组件与落点

| 环 | 组件 | 落点 |
|---|---|---|
| GSC 定位 | 28d 页面级/查询级抽取件 + 普查交叉 | `GSC数据/*.xlsx` → `.hermes/gsc-YYYY-MM-DD/extract.json`；`scripts/sku-title-census.mjs` |
| 素材库 | 数字钩子/认证/工艺亮点（带来源与状态） | `scripts/guards/title-hooks.json`（机器读，本文件 §4 人读摘要） |
| 标题升级 | 候选生成（真值+闸门）→ 人工审阅 → 应用 | `scripts/gen-title-flywheel.mjs` → `.hermes/reports/title-flywheel-approved-*.json` → `scripts/apply-title-flywheel.mjs` |
| 门禁防复发 | staged 新增 ≥58 硬拦 + 全量审计 JSON | 门童 #25 `scripts/guards/title-band-guard.js`（canonical pre-commit §3.9） |
| 闭环验证 | 7-10 天只读窗 + CTR 对比报告 | `.hermes/title-verify-window.json` + `scripts/title-verify-report.mjs` |

## 2. 素材库使用纪律（title-hooks.json）

- **status=approved** 才可入标题：`proof_1h`（1 小时免费打样，线上承诺）、`exp_15y`（15+ 年，K3 8/19 拍板）、`dhl_24`（DHL 2-4 天，线上承诺）、`us_ship_short`/`hk_ship`（包邮承诺短式）。
- **status=conditional_forbidden_until_k3** 禁用：ISO 9001 / FSC / FDA（待 K3 拍板批次1 清单 #1/#2，无证书号 per SOP-10 第 4 款）。
- **动态数字钩**（MOQ/价格）不入库，由生成器从 `products.ts`（minQuantity / basePrice / basePrice_en / basePrice_ja / unitLabel）现取——与门童 #24 同源。
- **第 2 个长尾词**仅限 GSC 实证同簇词（`gscClusters`，按品类取）。

## 3. 生成→应用流水线纪律

1. `node scripts/gen-title-flywheel.mjs` — 只写 `.hermes/reports/`，不碰 src。
2. 人工逐条审阅，修正当量/语言/结构，写入 `title-flywheel-approved-YYYY-MM-DD.json`（含每槽 sources）。
3. `node scripts/apply-title-flywheel.mjs --check` 全过后 `--apply`（exact-match + 计数断言 + 自动备份 `.hermes/_bak-title-flywheel-*/`）。
4. 冻结避让：近期改过的槽不进 issue 名单（幂等铁律 + freeze 2-4 周）。批次1 已避让 same-day-flyers（2026-09-20 事实修复批）。
5. 收尾四件套：`sku-title-census --stdout`（期望全 OK）→ `audit-sku-locale.cjs`（四项 0）→ tsc（只看增量）→ 门童 #25 复扫。

## 4. 验证窗纪律（不可破）

- 每批改动后 **7-10 天只读**，同槽不得再改（churn 是排名杀手）。
- tracker 记录每槽 old/new title + GSC 基线（窗初值）。
- 窗满：导入新 GSC 抽取件跑 `title-verify-report.mjs --gsc`，看 Δ点击/ΔCTR/Δ位置；成功模式回写素材库，失败模式入 error-patterns 候选。
- 同时监控 **Google 重写率**（GSC 网页级"搜索结果呈现"或抽查 SERP 展示标题 vs 代码内 title）；改动后仍频繁重写 = 信息密度仍不足。
- 注意：GSC 28d 滑动窗与改动时点重叠会稀释 Δ，归因必须人工。

## 5. 批次1 结果（2026-09-20）

- 42 槽（25 FILL + 17 TRIM）按 GSC imps 排序全量修复；**全站 300 槽首次全部落入 50-57 OK 带**（census 实证，apply 前 258 OK/25 FILL/17 TRIM）。
- 修正滞留旧值：exercise-books/a5-flyers/thick-paper-flyers ja 的「100 枚〜」→ 真值 10 枚〜。
- 修正跨语言污染：can-badge/eco-tote-bag 的「推し活」→ 應援/去除；doujinshi 日文新字体「対応」→「對應」；custom-red-packets zh-hk 英文主词 → 定制利是封。
- 结构性修复：cosmetic-boxes 盒型堆砌（77→50）、perfect-bound-books en 重复段、food-boxes 主词过长。
- 门禁：门童 #25 上线（#25 为空闲编号，20-26 中仅 25 未占用）；hook 三份 sha256 同步。
- 验证窗：至 2026-09-30，tracker 42 槽基线已采（GSC 2026-09-18）。

## 6. 已知限制 / 下一轮

- `vehicle-wraps`（imps=109 高价值槽）未带价格：basePrice=28 与 price-data 分叉未清（批次1 登记 #1），待 K3 裁决后补。
- `doujinshi-printing`/`can-badge`（japan-doujin 嵌套块）basePrice 为日元计价混区，未带价格。
- `small-bags` 无 products.ts 真值，仅用白名单承诺钩；若该 SKU 入正式产品线需补真值。
- Google 重写率监控暂无自动化，验证窗报告以 GSC 点击/CTR 为主、SERP 抽查为辅。
- tsc 存量 54 错全在 `src/lib/quote-engine/__tests__/`（6 文件，本批未触碰），建议单独立项清理。
- 下一轮：验证窗满 → 闭环报告 → 成功模式回写素材库；同时 GSC 新抽取件刷新机会词清单（下一轮目标由闭环结果定）。
