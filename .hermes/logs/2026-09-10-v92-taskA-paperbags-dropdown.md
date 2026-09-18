# 2026-09-10 · v9.2 指令包任务 A 验收报告（导航纸袋下拉偏移修复）

> 执行层：deepseek hermes。指令：K3 指令包 v9.2（docs/2026-09-10-k3-directive-v92-template-rollout.md）任务 A，P0 先行。

## ① 交付物
- commit `bb542511`（分支 redesign/plp-pdp-v9）→ merge `c6257d77` → main → 生产部署 `96d343b2` deploy/success
- 改动文件：`src/components/layout/Header.tsx` 1 行（L117）
- 携带：merge 同时并入 `fee30618`（docs §0.25.10 小改动免预览直推生产，已定型待上线）

## ② 选点依据
- K3 v9.2 指令包任务 A：根因实证 dropdownOffsets['paper-bags'] 为排左第 1 位时的旧值 +240px，zh-hk 移到右第 5 位后 950px 宽下拉出屏。
- 代码实证：档位梯 flyers+160 / stickers+80 / packaging 0 / posters-80 / educational-160 / blog-240（每档 80px），zh-hk navOrder paper-bags=index5 → -240 与梯完全吻合。

## ③ 验收闭环表
| 项 | 结果 |
|---|---|
| git diff 逐行 | 仅 Header.tsx L117，1 行，无越界 |
| tsc | 0（merge 后） |
| build | CF 生产构建 success |
| 硬闸门 bc-ban | 1 条命中 = next.config.js:461（GSC_404_R2 redirect 源行，§0.0.1 豁免类）→ 声明挂账放行，未改脚本/重定向（§6.1） |
| encoding | PASS |
| 线上探针 | 页面 200 ✓ / 15 chunks 扫描：layout chunk 含 `calc(-50% - 240px)` ✓、`+240px` 残留 0 ✓ |

## ④ push 记录
- 13:59:56 push main（e69a63e3..c6257d77）；距上次 02:26 共 11h33m；§0.25.10 小改动直推生产流程（免预览）
- CF env=production 96d343b2 deploy/success

## ⑤ 数据来源
- K3 拍板：docs/2026-09-10-k3-directive-v92-template-rollout.md（任务 A）
- git 实证：bb542511 / c6257d77 / e69a63e3；Header.tsx L116-124 档位梯
- CF Pages REST API env=production（96d343b2）
- 生产探针 curl + JS chunk 扫描：2026-09-10 14:0x HKT

## ⑥ 遗留挂账（2 条，需 K3 定夺）

**挂账 1（本次引入的跨语言影响，A/B/C）**：`dropdownOffsets` 为全语言共享 map。zh-hk paper-bags 第 5 位（最右）→ -240 正确；但 en/ja navOrder 中 paper-bags 为**第 0 位（最左）**，-240 会使 en/ja 该 950px 下拉整体甩出左屏（此前 +240 在左首项亦部分出屏 -105px，非本次新伤）。
- A：维持单值 -240（en/ja 下拉不可见，zh-hk 正确）——最小改动，en/ja 纸袋入口失效
- B（推荐）：per-locale 拆分——zh-hk paper-bags=-240；en/ja 按档位梯 index0=+160（同 map 加 locale 维度或渲染时按 navOrder index 计算偏移，结构性小改，~1 组件）
- C：把 en/ja paper-bags 也移到导航末位与 zh-hk 对齐（动 navOrder，涉及 en/ja 导航结构决策）

**挂账 2**：`scripts/check-bc-ban.mjs` 对 §0.0.1 豁免类「redirect 源行」仍报 BLOCK（next.config.js GSC_404_R2 第 3 条）。建议大脑定夺脚本是否补豁免判断；本次按规则声明放行。

## ⑦ 异常与事故
无。共享工作树按 §6.4 处理（本次 tmp 用 fetch + ff / --no-ff，未用 reset --hard）。
