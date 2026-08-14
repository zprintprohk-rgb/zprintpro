# price-tables/ — 真实价格表 (v1, 2026-07-17)

> **策略来源**: user 2026-07-17 拍板 — 盒子/手提袋 = intuan.com 专版报价 × 1.3;画册 = e-print × 0.90;宣传单张 = e-print × 0.95 (拼版标准规格不硬拼);锚币种 = **HKD**。
> **状态**: v1 = 锚点 + 建模估算。**所有 `"src": "modeled"/"pending"` 的格子必须校准后才允许对客展示。**

## 文件

| 文件 | 品类 | 策略 |
|---|---|---|
| `flyers.json` | 宣传单张 | e-print × 0.95;100-300 张数码甜点区不跟拼版 |
| `paper-bags.json` | 手提袋/纸袋 | intuan 专版 × 1.3 |
| `packaging.json` | 包装盒 | intuan 专版 × 1.3 |
| `books.json` | 画册/书刊/校簿 | e-print 书刊 × 0.90;校园车道 |

## 校准 SOP (每月 1 号 cron 跑 / 首次上线前必跑)

1. **intuan 校准** (盒子/袋子): 登入 intuan.com 账号 → 专版报价器 → 按各 JSON 里 `config` 的标准配置询价,数量档 500/1000/2000/3000/5000 → 记录 × 1.3 × 1.09 (RMB→HKD) → 更新 tiers,`src` 改 `"anchor"`。每次约 30 分钟。
2. **e-print 校准** (单张/画册): e-print.com.hk 对应产品页抓完整价表 → × 0.95 (单张) / × 0.90 (画册) → 更新。
3. **漂移告警**: 任一档位变动 > 10% → 升级 user,不静默改价。

## 集成计划 (Phase 2,前端)

- `QuoteCalculator.tsx` 当前走 `pricing.ts calculateQuote()` 通用公式 → 改造为: 先查 `price-tables/<category>.json` 精确档 (线性插值中间档),查不到才 fallback 公式。
- 报价结果显示 **数量跳水表** (5 档数量×单价,当前档高亮) + 工艺逐项 "+HK$X" + 一键发 WhatsApp 报价单。
- en/ja 价: HKD 表 × 实时汇率 + 国际运费包 (现有 `quote-engine/shipping.ts` + `fx.ts`),保持独立定价文件 `INDEPENDENT_PRICES` 同步刷新。

## 校准记录

### 2026-07-20 (e-print 单张实抓 × 0.95)
- `flyers.json`: a5-flyers 5 档 (600/1000/2000/3000/5000) + a4-flyers 5 档 (300/500/1000/2000/5000) modeled→anchor
- 数据源: https://www.e-print.com.hk/products_brochure_booklet_leaflet_printing (2026-07-20 curl 实抓完整价目表)
- 依据: A5 157g (4C 同价) 600張$315/1000張$365/2000張$415/4000張$635/6000張$810;A4 157g 4C+4C 300張$500/500張$550/1000張$650/2000張$940/3000張$1190/5000張$1650;中间档线性插值
- 100-300 数码甜点档按红线不硬拼,保持 modeled
- 复算脚本: `.hermes/calibrate-price-tables-2026-07-20.py`
- **仍未校准 (下轮)**: books 的 perfect-bound-books / exercise-books (e-print 膠裝書刊页变量多,需按 P 数建模);packaging food-boxes;paper-bags eco/gift-bags;flyers same-day/eco (gift-boxes 已 2026-07-22 合并入 rigid-boxes)

### 2026-07-20 v2 (e-print 数码单张实抓 × 0.95 — 50-300張数码主车道, user 当日拍板放开)
- `flyers.json`: a5 100/300 档 + a4 100/300 档 + same-day 100/300 档 → anchor-digital (共 6 档)
- 数据源: https://www.e-print.com.hk/products_digital_brochure_booklet_leaflet_printing (2026-07-20 实抓)
- 依据: A4 雙面 100張$400/300張$750;A5 雙面 100張$132/300張$248;same-day 以 A4 双面为保守锚
- 校准纠偏: a4 100張建模价 $220 低于 e-print 成本线, 纠正为 $380 — 避免赔本接单
- same-day 500張档 e-print 数码页无 500 档(特急页未抓), 保持 modeled
- 复算脚本: `.hermes/calibrate-digital-flyers-2026-07-20.py`
- **校簿 exercise-books 卡点**: e-print 膠裝/騎馬釘书刊页是 JS 配置器(按 P 数报价, HTML 无价表, 报价 API 未暴露) → 需 WebBridge 驱动配置器设定 A5/32P/80g书纸/骑马钉/黑白 取 500/1000/3000 本价 (下轮 K3 难点任务), 或走 intuan 校园簿册询价

### 2026-07-20 v3 (e-print 柯式骑马钉书刊 × 0.90 — 校簿校园季车道)
- `books.json`: exercise-books 全档 pending→anchor (500/1000/2000/3000/5000 本), 配置锚定 A5 32PP 全書80g書紙黑白骑马钉
- 数据源: https://www.e-print.com.hk/products_books_printing_stitched_binding_color 页面固定价表 (user 指正: 价表就在页面上, 无需 WebBridge)
- 依据: A5 直度全書同一紙質表·黑白列 100本$992/500本$1,503/1000本$2,289/2000本$3,032/3000本$3,516/5000本$4,791 ×0.90
- 校簿价: 500本 HK$1,353 (2.71/本) → 5000本 HK$4,312 (0.86/本), 对校园批量询盘有竞争力
- 复算脚本: `.hermes/calibrate-exercise-books-2026-07-20.py`
- **剩余**: perfect-bound-books (胶装, e-print 膠裝書刊页有同类固定价表, 可照此法校准 — M3 可执行); packaging food-boxes; paper-bags eco/gift-bags; flyers eco; same-day 500档 (gift-boxes 已 2026-07-22 合并入 rigid-boxes)

### 2026-07-21 v4 (e-print 胶装书 A5 32PP + 急件 flyers 6 档 — 校准同日完成)
- `books.json`: perfect-bound-books 全档 pending→anchor (7 档: 100/500/1000/2000/3000/5000/10000), 配置 A5 32PP 4+32PP 內文80G書紙 250g 封面
  - 数据源: https://www.e-print.com.hk/products_books_printing_perfect_binding_color (A5 直度彩色膠裝書刊价表, 內文80G書紙 tab, 4+32PP 行)
  - 依据: 100本$1838/500本$2907/1000本$3168/2000本$3560/3000本$4769/5000本$6290/10000本$9842 ×0.90
  - 校准价: 100本 HK$1,654 (16.54/本) → 5000本 HK$5,661 (1.13/本), 适合 32PP 以上的 book/menu/产品手册
- `flyers.json`: same-day-flyers 急件 1小時 6 档 modeled/anchor-digital→anchor
  - 数据源: https://www.e-print.com.hk/products_Leaflet_Express_Service (單張特急快印 1小時即取, A4/A5 tabs)
  - 依据: A4 100張$600/200張$750 (上限200); A5 100張$173/200張$263/300張$503/400張$615 (上限400) — 雙面彩色 ×0.95
  - 校准价: A4 100張 HK$570 / A5 100張 HK$164 / A5 400張 HK$584
  - **500 档保留 modeled**: e-print 1小時急件不提供 500 張 (A4 max 200, A5 max 400), 按 400 張 A5 急件 + 同日 4小時複印溢價 35% 估算 HK$800, 待 intuan 急件实询校准
- `flyers.json`: eco-flyers 维持 pending — e-print 公开页无 100% recycled/再生纸 宣傳單配置 (仅有 FSC 咭片 + 環保袋), 待 intuan 询价 (需 user WebBridge 登入)
- 复算脚本: `.hermes/calibrate-perfect-bound-and-flyers-2026-07-21.py` (1 script 管 2 SKU, C9 攒批 1 commit = 1 build quota)
- **P0-1 B 进度**: 3/8 任务完成 (B-2 same-day + B-7 perfect-bound + B-8 exercise-books); 剩 5 任务 (B-1 a4-flyers autoglm + B-3~6 paper-bags/packaging 4 SKU user WebBridge)

## 红线

- ❌ 未校准 (`src≠anchor`) 的格子不得对客展示 — 先内部用,客户询价走 WhatsApp 人工报。
- ❌ 改价不走 git 直接改线上 — 价格表走 PR + 校准记录。
- ❌ 名片 (business-cards) 不出现在任何价格表 (§11 禁区,2026-07-17 user 再确认)。
- ❌ **抓不到真实价不许标 anchor** (2026-07-21 user 拍板: same-day 500 档 / eco-flyers / any 无 e-print/intuan 实抓证据的 tier) — 保持 modeled/pending 状态, 校准脚本留白纸黑字依据。
