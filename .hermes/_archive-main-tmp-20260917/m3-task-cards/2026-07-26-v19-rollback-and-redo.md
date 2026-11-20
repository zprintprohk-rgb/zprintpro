# v19 任务卡 — 回滚 v18 + 展示层重做 (模块全保留 · 单价小锚 · 滿500包郵)

> 日期: 2026-07-26 · user 拍板回滚 · autoclaw 执行 · 2 commit (回滚 1 + 重做 1) 2 build
> 收入关联: v18 撤表把规格选择/材质/工艺/数量/订购/报价模块搞没了 — 转化链路断 + SEO 内容变薄,比错价更伤。回滚到 2291c5c 状态重做对客展示,模块一个不许少。

## 任务 1: 回滚 (commit 1, 抢发)

1. `git revert --no-edit cedea19 3199f37` (v18 两个 commit;若 residue 热修也已 push,一并 revert — 先 `git log --oneline -8` 确认)
2. 保留: 669e839 (CF edge runtime 修复) 和 2291c5c 之前的全部成果 (批量价表列语义/双轨海报价/差异化系数/meta 清扫/下单 MVP)
3. 回滚后本地 `npm run build` 全过 → push `git push origin_ssh main` → `verify-deploy.mjs` PASS → **curl 抽查 3 个 PDP (gang-run/a2-posters/a4-flyers): 规格选择器 + 价格表 + 订购报价模块全部回来**
4. commit: `revert: v18 over-removal of price modules (rollback to 2291c5c baseline)`

## 任务 2: 展示层重做 (commit 2, 只在显示层动,不删任何模块)

**红线 (user 7/26 拍板)**: **任何 SKU 不得删除/隐藏 规格选择 / 纸张材质 / 表面工艺 / 印刷数量 / 订购 / 报价 模块 — 全部保留,所有 SKU 都有完整参数模块和参考价表。**

1. **单价小锚 (所有 SKU 首屏 + 卡片)**:
   - 主锚 = 平均每件最低价 (min 整批价÷数量),视觉大字:「每個 HK$0.22 起」「每張 HK$12.9 起」
   - 此前显示「HK$129 起」「HK$1,517 起」「HK$290-7,200」这类整批起价的主锚位,全部换成单价锚 (user 点名:一百多/一千多的起价必须回到单件价)
   - 副文案小字:「N 起批 · 整批 HK$X 起」
   - 无价格表的 SKU: 按品类显示区间锚 (海报单张 每張 HK$0.1-2 / 白卡彩盒专版 每個 HK$0.5-3 / 精装盒 每個 HK$2-10 / 精装书 每本 HK$5-10 / 普通书 每本 HK$0.5-2),**模块照样保留**,价格表区显示区间说明 + WhatsApp CTA,不是整个删
2. **运费文案**: 全站统一只显示「**滿$500包郵**」(含順豐/物流,user 拍板物流也包);en "Free shipping over $500";ja 对应。价格表運送列简化同口径。
3. **乱码/假承诺补刀 (v18 漏网,K3 live 实锤)**:
   - gang-run `price_range` 改 `'HK$129-17,214'`,删 `basePrice_en`/`basePrice_ja` 三币种拼接;hero 按 locale 单货币 (en/ja 用 ×2.2 换算);全站 grep `basePrice_en|basePrice_ja|USD 25 起` 清同型
   - gang-run meta description 重写 (现含「HKD 129 起 起」双起 +「即日交貨」): `拼版白卡彩盒每個 HK$0.22 起,固定刀模共用免刀模費,成本直降 40-60%,500 個起批,8-12 天交期,滿$500包郵。4 種紙材 3 種盒型 8 檔尺寸,香港包裝盒定製專家智印港。`
   - 全站 meta description 扫「即日交貨/免運費」残留统一新口径
4. **保留 v18 正确的部分** (回滚后需挑回来): 交期 5 层分层文案、SKU 热度排序 (GSC 梯队 + 战略 4 彩盒置顶 + 名片禁区最后)、移动端分类折叠、A2 起订量三方一致 (10 張)、A/B 类单价锚文案 — **这些用 cherry-pick 或重做对客文案层,不回滚**

## 纪律

- 每 commit 前 `check-encoding.js --fix` + 本地 `npm run build` 全过
- push `git push origin_ssh main` → `verify-deploy.mjs` PASS
- **渲染层验收 (每个 commit 后都做)**: curl 抽 4 PDP (gang-run/white-card-boxes/a2-posters/a4-flyers) — ① 规格选择器在 ② 价格表在 ③ 首屏单价小锚在 ④ 无 USD 25 起乱码 ⑤ 无整批起价主锚 (129 起/1,517 起/290-7,200 起)
- 汇报: 2 个 commit sha + run id + 4 PDP 五项验收逐项截图文本 + revert 清单 + grep 结果
