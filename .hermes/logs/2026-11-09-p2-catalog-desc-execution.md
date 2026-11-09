# P2 执行登记：catalog zh/ja desc MOQ 对齐（B/C 批，2026-11-09）

> 依据：`docs/2026-11-09-three-site-inventory-flywheel-next-step.md` §3.4 决策包 B/C（K3-3 A 真值）· P0 先例（a33abd3b 同款门禁）
> 结果：**全链 PASS**。两个单变量分属 zh-hk / jpn 独立查询粒度，归因隔离。

## 变更内容

| 批 | 字段 | before | after |
|---|---|---|---|
| B | zh-hk desc | `畫冊印刷/畫冊印刷 100 起。`（名称重复 + MOQ 矛盾） | `畫冊印刷 10 本起印。`（去重 + 对齐 title「10本起印」） |
| C | ja desc | `…デザイン自由。100〜、3-5営業日…` | `…デザイン自由。10冊〜、3-5営業日…`（对齐 title「10冊〜」） |

## 执行链

| # | 步骤 | 结果 |
|---|---|---|
| 1 | 行级修改脚本（列数 31 守恒 / 模式唯一性断言 / 备份） | ✅ |
| 2 | 生成器 dry-run | ✅ 断言 A-E PASS（字节级变化 1 = catalog 1 块含 2 行） |
| 3 | 预览 diff 精确核对 | ✅ 恰 2 行 desc（zh/ja），零附带 |
| 4 | `--apply` | ✅ |
| 5 | 门禁 | brand A 类 0 ✅ · **tsc 54=54 基线** ✅ · pre-commit 全链 ✅ |
| 6 | commit `392c5f30` + push | ✅ `92d0fc90..392c5f30` |
| 7 | CF Pages **success**（run 128985513618） | ✅ |
| 8 | L3 线上断言 | zh-hk：`10 本起印` 在位、`100 起`/名称重复 **0** ✅；ja：`10冊〜` 在位、`100〜` **0** ✅ |
| 9 | 队列回写 | catalog-en measurement_history +1（commit 392c5f30，retest 11-14/11-21），status 维持 blocked_waiting_k3 ✅ |

## 归因说明

- B（zh-hk）影响 zh-hk 畫冊印刷查询粒度；C（ja）影响 jpn カタログ印刷查询粒度——两粒度独立，同 commit 不影响各自单变量归因。
- en H1（P0，a33abd3b）已于今晨先行部署；11-14 首轮复测将同时覆盖 A/B/C 三个变量（各按自身粒度基线）。

## 数据来源

- 决策包：`docs/2026-11-09-three-site-inventory-flywheel-next-step.md` §3.3（矛盾表）· §3.4（B/C 批）
- 线上断言：`.hermes/logs` UA fetch（2026-11-09 12:5x，`_p2_l3_assert.cjs`）
- 真值：K3-3 A（2026-10-26 决策队列，MOQ=10 公开口径）
