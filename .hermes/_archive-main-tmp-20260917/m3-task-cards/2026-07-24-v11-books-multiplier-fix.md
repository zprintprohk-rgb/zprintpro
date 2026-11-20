# M3 v11 任务卡 — books 书仔加价率修正 (×0.90 → ×0.97/×0.94)

> 日期: 2026-07-24 · K3 拍板 · 小改动 1 commit 1 build
> 收入关联: 书仔类按错加价率报价 = 每单少赚 4-7 个点;校园簿册是 8/12 开学季主攻品类,价格必须准。

## 背景

v10 注册 exercise-books / perfect-bound-books 时沿用 books.json 的 ×0.90 anchor。
user 2026-07-24 04:55 最终拍板 (覆盖此前所有建议):

| 装订方式 | product | 新加价率 |
|---|---|---|
| 骑马钉 | saddle-stitch (含 A5 书仔) | **×0.97** |
| 校园簿册 | exercise-books (骑马钉属性) | **×0.97** |
| 胶装 | perfect-bound | **×0.94** |

即对 e-print 公开价取 97% / 94% 为我方港币价 (v10 里写的是 ×0.90,偏低,需上调)。

## 执行

1. 改 `src/data/price-tables/books.json` 三个 product 的 tiers 数值:
   - 每个 tier 新价 = e-print anchor 原价 × 0.97 (saddle-stitch + exercise) 或 × 0.94 (perfect-bound)
   - 如果 JSON 里存的就是算好的卖价、没有原始 e-print 价字段可反推,用 现价 ÷ 0.90 得 anchor 原价,再 × 新率,四舍五入到整数 HKD
   - 在每个 product 加 `"priceMultiplier": 0.97` / `0.94` 字段 (M3 v10 汇报里自己提议的方案,照做),`src` 字段更新为 `"anchor-0.97"` / `"anchor-0.94"`
2. 若 `analysis-2026-07-17/gen-yate98-price-tables.py` 或同类生成脚本是 books.json 真源,**改脚本里的常量再重跑**,不要手改 JSON 被下次重跑覆盖 (K3 教训: JSON 先手改被脚本覆盖过一次)。改完在脚本注释里写 "2026-07-24 user 拍板 ×0.97/×0.94"
3. desk.ts 不用动 (它读 sell_hkd 字段,数值对就行)

## 验算 (汇报必带)

- saddle-stitch 某 tier: 原价 ÷ 0.90 × 0.97 = 新价,列 1 组前后对照
- perfect-bound 某 tier: 同上 × 0.94
- exercise-books 某 tier: 同上 × 0.97
- 报价台 live 抽 1 档验: /quote-desk/?k=... 选 books → saddle-stitch 配置,价格与 JSON 一致

## 纪律

- commit 前 `node scripts/check-encoding.js --fix` + 本地 `npm run build` 过
- 1 commit: `fix(pricing): books multipliers ×0.97 saddle/exercise, ×0.94 perfect-bound (user 7/24 拍板)`
- push `git push origin_ssh main`,后跑 `node scripts/verify-deploy.mjs` 见 PASS
- 汇报: commit sha + build run + 3 组验算对照 + live 抽查 1 档
