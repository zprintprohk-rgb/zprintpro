# v15 任务卡 🔴 紧急纠错 — posters.json 错价修正 + A1 噴繪入仓 + 徽章加小批量

> 日期: 2026-07-25 · K3 策略 · autoclaw 执行 · 1 commit 1 push 1 build
> 收入关联: v14 上线的 posters.json 用的是已作废的旧夹逼价 (431/475/561…),比拍板价高 3 倍 — 客户看到 HK$431 而非 HK$129,小单全流失。这是线上现存的错价,P0。

## 任务 1 🔴 posters.json 错价修正 (v14 执行偏差)

**问题**: v14 执行时海报价格沿用了已作废的三段式夹逼价 (10張=431),user 二次拍板的是 **A2 纯 B2 公式价,禁止对标 e-print 海报页 (柯式价无可比性)**。

**修为** (A2·157g·單面,逐档必须命中):
| 数量 | 现在线上 (错) | 改为 (B2 公式价) |
|---|---|---|
| 10 | 431 | **129** |
| 20 | 431 | **198** |
| 50 | 475 | **405** |
| 100 | 561 | **625** |
| 200 | 608 | **1,200** |
| 300 | 656 | **1,562** |
| 500 | 703 | **2,574** |

雙面: 10張 695→**168** / 50張→**600** / 100張→**950** (全档按 (3.6×qty+20) 分段重算)。
公式: `(单价×张数+20) × 3 (RMB≤200) / ×2.5 (≤500) / ×2.2 (>500)`,取整。單面 2.3 / 雙面 3.6 RMB/张。
同时修正 a2-posters price_range 同步为重算后的 min-max;重跑 `scripts/gen-price-data.mjs` 让 PDP/报价台全链一致。

## 任务 2: A1 噴繪价格入仓 (e-banner ×0.95 对标)

- **对标源**: https://hk.e-banner.com/digital-printing-services/posters.html 旗下产品页 (多用途環保海報 $9 起 / 相紙海報 $11 起 / 高級海報 $25 起)。executor 自行打开各产品页,提取 **A1 (594×840mm) 單面每张价**,×0.95 取整为我方价;汇报必须带每个取值的产品页 URL + 原价 + 折后价
- **材质先上 2 款**: PP/環保海報 (Yupo) + 相紙海報;A1 只做單面
- **不做安装**: 页面与 JSON 标注 zh-hk「噴繪成品 · 不含安裝裱貼」/ en "Print only · installation not included" / ja「印刷のみ · 取付工事含まず」(e-banner 有裝工服務,我们不做,必须写清避免客诉)
- 注册进 posters.json (新 config 组: a1-banner-print) + gen-price-data.mjs (a1-posters 挂 PDP 参考价区块);products.ts `a1-posters` price_range 从「噴繪另議」改为实价区间
- 运费: 無重量 → 「另計/到付」

## 任务 3: 徽章加「小批量」前缀 (user 7/25 拍板)

| 位置 | 现在 | 改为 |
|---|---|---|
| PDP page.tsx ~L250 (zh-hk) | 順豐快遞 · 運費實報 | **小批量順豐快遞 · 運費實報** |
| PDP page.tsx ~L271 (en) | SF Express · Freight collect | **Small-batch SF Express · Freight collect** |
| PDP page.tsx ~L292 (ja) | SF Express · 配送料実費 | **小ロット SF Express · 配送料実費** |

## 纪律

- commit 前 `node scripts/check-encoding.js --fix` + 本地 `npm run build` 全过
- 1 commit: `fix(posters): B2 formula pricing (undo deprecated clamp) + A1 inkjet e-banner×0.95 + small-batch badge`
- push `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS
- pollution grep: e-banner/e-print/intuan/成本/倍率字样 对客页 = 0
- **汇报格式**: commit sha + run id + ①A2 修正后 10 档对照表 ②e-banner 每个取值 URL+原价+折后 ③徽章 3 locale 改动行 ④grep 结果。任一锚点不命中 = 未完成
