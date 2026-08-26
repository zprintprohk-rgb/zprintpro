# M3 v10 任务卡 — 报价台 ×2.2 修复 + 老板全表总览页 + 2 张表补入仓

> 日期: 2026-07-24 · K3 拍板 · 1 commit 1 push 1 build
> 收入关联: en/ja 是 ×2.2 高毛利市场 (毛利≥50%),报价台给错价 = 每单少赚 ~17 个点毛利;全表总览页 = 老板 30 秒查任意品类任意档,报价效率直接变现。

## 任务 1 🔴 必修: en/ja ×2.2 分层加价没生效

**Bug 位置**: `src/lib/quote-engine/desk.ts` `calcPrice()` 约 323-326 行

**现状**: USD/JPY 全部从 `sellHKD × fx` 转换,等于 en/ja 客户拿到 zh-hk 的 ×1.5 价。

**拍板规则** (user 2026-07-23):
- zh-hk: yate98 cost_rmb ×1.5 → HKD (JSON 里 sell_hkd 已预烧,不动)
- en/ja: yate98 cost_rmb ×2.2 → 换算 USD/JPY (毛利≥50%)
- e-print 锚表 (flyers/books/special-fold, 无 cost_rmb): en/ja 维持 sell_hkd × fx 不变 (HK 锚定价,本来就对标香港市场价)

**修法**:
```ts
// calcPrice 内, priceMode === 'yate98' 且 tier.costRMB 存在时:
//   en: sellUSD = costRMB × 2.2 × CNY_TO_USD
//   ja: sellJPY = round(costRMB × 2.2 × CNY_TO_JPY)
//   zh-hk: sellHKD 维持 tier.sellHKD 不变
// CNY_TO_USD / CNY_TO_JPY 从 fx-rates.json 推:
//   rates.CNY = 1 CNY = X HKD; 1 USD = rates.USD HKD
//   CNY_TO_USD = rates.CNY / rates.USD; CNY_TO_JPY = rates.CNY / rates.JPY
// priceMode === 'eprint' | 'special-fold': 维持现状 (sellHKD × fx)
```
注意 `HKD_TO_CNY` 常量已存在但方向别用错,先 console 验算 1 个已知档:
gang-run-card-boxes 某档 cost_rmb=100 → en 价 = 100×2.2×(1.087/7.81) ≈ $30.6。

**验收**: 随便选 1 个 yate98 品类,locale 切 en,价格 ÷ cost_rmb 应 ≈ 2.2×汇率,不是 1.5×汇率。

## 任务 2: 老板全表总览页 /quote-desk/all

**需求** (user 原话): "只有我能看全部报价台的单独的不显示的网页"。

**规格**:
- 新路由 `src/app/quote-desk/all/page.tsx`,同一个密钥门 (?k= 复用 QUOTE_DESK_KEY, unlocked 状态从 quote-desk 主页带不过去,all 页自己验 k 即可)
- noindex (跟主报价台同方式),不进 sitemap,零内链
- 渲染全部已注册表 (getAllTables 全量):每张表一个 section,表格列出 配置 (parseConfigHuman zh-hk) | 数量档 qty | cost_rmb | sell_hkd (×1.5) | en 价 USD (×2.2) | ja 价 JPY (×2.2) | weight_kg | 运费试算 (>30kg 的档显示 calcShipping 结果)
- 这是内部老板视图,**允许显示 cost_rmb 和加价率** (页面顶部加一行 "内部成本视图·勿外发"),红线的"成本不上 UI"只针对对客页面和 WhatsApp 文案,本页豁免
- 表格长没关系,按品类 <details> 折叠默认收起,点开看
- 顶部加 locale 切换不必要,直接 zh-hk 为主 + USD/JPY 列

**验收**: `https://zprintpro.com/quote-desk/all/?k=zprintpro-quote-2026-07-24-v9` 200,每张表行数 = JSON 里 tiers 总数,×2.2 列数值与任务 1 修后的 calcPrice 一致 (复用 calcPrice,别另写公式)。

## 任务 3: exercise-books + perfect-bound-books 入仓注册

- 数据已在 `F:\zprintpro-nextjs\analysis-2026-07-17\` (P0-1 v4 校准产物, e-print 锚 anchor 状态)。先 Glob 找 `**/exercise-books*.json` / `**/perfect-bound*.json`,找到后复制到 `src/data/price-tables/` (schema 对齐 flyers.json/books.json 的 eprint 结构)
- `desk.ts` 加 2 行 import + 2 行 registerEprint + getAllTables 数组加 2 项,表数 8→10
- 若 analysis 目录找不到 JSON,在汇报里说明,不要自己编数据

## 提交纪律

- commit 前: `node scripts/check-encoding.js --fix` + 本地 `npm run build` 必过 (v7 教训: 改完不 build 直接 push 浪费 quota)
- 1 commit 攒 3 任务: `fix(quote-desk): en/ja ×2.2 markup + /all boss view + 2 eprint tables`
- push: `git push origin_ssh main` (严禁 origin / --force)
- push 后: `node scripts/verify-deploy.mjs` 见 PASS 才报完成
- 汇报格式: commit sha + build run id + 6 项 curl (quote-desk 200 / all 200 / 无 k 时 all 显示锁定 / ×2.2 验算数值 / 表数 10 / pollution grep 对客页=0)
