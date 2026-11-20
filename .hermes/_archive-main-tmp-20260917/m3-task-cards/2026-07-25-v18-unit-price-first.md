# v18 任务卡 (v2 重写) — 单价区间锚展示 + 无竞争力价格表撤退 + 交期分层 + 热度排序 + 移动端折叠

> 日期: 2026-07-25 v2 · K3 策略 · autoclaw 执行 · 1 commit 1 push 1 build
> 收入关联: 列表页/PDP 首屏"起价"是点击命门。user 拍板:做不了实时报价系统就不硬撑 — 有竞争力的品类留真实价格表,没竞争力的撤表改区间锚,低价感留客,成交走 WhatsApp。
> 本卡替代 2026-07-25 v18 初版 (4 任务版),冲突处以本卡为准。

## 任务 1: 单价区间锚展示 (user 7/25 拍板,展示层策略定稿)

**分层规则**:

**A 类 — 留真实价格表 (我们有竞争力) + 每個/每張单价主锚**:
- a2-posters (B2 数码 129 起,双轨价) / a1-posters (喷绘 ×0.95)
- **gang-run / tuck-end / corrugated 3 条彩盒** (yate98 锚,香港零竞品) — 首屏主锚一律「每個 HK$X 起」(min 整批价÷数量): gang-run=每個 HK$0.22 起;tuck-end/corrugated 按各自全档最低单价算
- white-card-bags / digital-stickers / books 柯式档 / flyers 柯式拼版档 — 同样单价主锚 + 副文案「N 起批 · 整批 HK$X 起」
- ⚠️ **white-card-boxes (PKG-013) 不在 A 类** — 它是专版,系统无专版价格表,v13 错挂了拼版飞机盒过滤价 (HK$129 起是拼版价,误导),撤表转 B 类

**B 类 — 撤真实价格表,改区间锚 (没竞争力或无真实价,挂出来=劝退)**:
- **A3/A4 数码宣传单张**: e-print 对标 100 张 HK$92.4,我们成本都盖不住 — **数码档从价格表/PDP 撤下**, flyers 只留柯式拼版档 (600 張起,有竞争力)
- 区间锚文案 (首屏大字 + 卡片):
  | 品类 | zh-hk 区间锚 |
  |---|---|
  | 海报/宣传单张 (数码) | 每張 HK$0.1-2 起 · 實價按規格報價 |
  | 白卡彩盒·专版 (white-card-boxes PKG-013) | 每個 HK$0.5-3 起 · 實價按規格報價 |
  | 精装盒 (rigid-boxes) | 每個 HK$2-10 起 · 實價按規格報價 |
  | 精装书 (hardcover-books) | 每本 HK$5-10 起 · 實價按規格報價 |
  | 普通书刊 (saddle-stitch/exercise/perfect-bound) | 每本 HK$0.5-2 起 · 實價按規格報價 |
- en/ja 同结构: "from US$X-Y/pc · final quote by specs" / 「¥X-Y/枚〜 · 仕様により正式見積」(按 fx 换算取整)
- B 类 SKU 的 ReferencePriceBlock 整个不渲染 (没竞争力的表挂出来=送客),只留区间锚 + WhatsApp CTA

**C 类 — 修复乱码 (P0)**: gang-run-card-boxes 首屏现在显示「HKD 129 起 / USD 25 起 / ¥3,800 起起 500USD 25 起起訂」— 三币种字符串串接 bug。修为按当前 locale 只显示单一货币:zh-hk=HKD / en=USD / ja=JPY。全站扫同型串接 bug。

**D 类 — 起订量一致性 (P0)**: A2 卡片标题写「1張起印」但卡片显示「100件起訂」;价格表起订 10 張。三方必须一致:**A2 海报 = 10 張起訂** (标题/卡片/minQuantity/价格表全改 10)。全站扫同类不一致 (标题起印量 vs minQuantity vs 价格表最小档),列清单汇报。

**E 类 — 徽章与运费文案定稿 (user 7/25 二次拍板)**: zh-hk 徽章「**滿$500包郵到手**」;en "Free shipping over $500";ja「$500 相当以上 送料無料」。**包邮含 >30kg 物流件** (user 拍板:物流也包,不设除外小字)。价格表「運送」列与 PDP 运费文案统一口径:「滿$500包郵 (順豐/物流) · 未滿$500運費實報」— 此前「順豐到付」「>30kg 物流另行報價」等旧文案同步替换。

## 任务 2: 交期文案分层 (保留初版,不变)

数码快印层 (a2-posters digital 档 / a1-posters 噴繪 / same-day-flyers / 数码贴纸小批量):「今天下單 · 明天中午前送達 (小批量 · 中午 12 點前確認稿件)」;海报柯式档 3-5 天;拼版单张 5-7 天;拼版彩盒 8-12 天;书刊 5-7 天。全 src grep 交期词逐条归类,徽章/hero/meta 三处一致。

## 任务 3: SKU 热度排序 (保留初版,不变)

按 K3 GSC 28 天梯队调 sort_order:第一梯队 a2-posters(593)/a4-flyers(249)/a5-flyers(227)/food-boxes(199)/saddle-stitch(199)/perfect-bound(123)/same-day(117)/a1-posters(113)/waterproof(110);战略 4 条彩盒固定 packaging 前 4;premium-business-cards 排类目最后+撤首页推荐 (§11 禁区);首页 isHot = 第一梯队+战略 4 条。

## 任务 4: 移动端分类折叠 (保留初版,不变)

<768px 默认收起为「当前分类+三」,点击展开抽屉;桌面端不动;首屏 3 秒看到产品图+单价锚+CTA。

## 纪律

- commit 前 `node scripts/check-encoding.js --fix` + 本地 `npm run build` 全过
- 1 commit: `feat(pdp): unit-price range anchors + retreat uncompetitive price tables + lead-time tiers + heat ordering + mobile collapse`
- push `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS
- **渲染层验收**: curl 抽 3 PDP — gang-run 首屏单货币无乱码 + 每個 HK$0.22 起;a2-posters = 每張 HK$12.9 起 + 10 張起訂三方一致;A4 flyers 数码档不再显示 + 区间锚在
- 汇报: commit sha + run id + ①A/B 类 SKU 分类清单 ②乱码修复点 ③起订量不一致清单 ④区间锚渲染文本 ⑤交期/排序/折叠 ⑥grep 结果
