# v20 任务卡 — 价格显示一致性总修 (根因排查 + 单价规则定稿)

> 日期: 2026-07-26 · K3 策略 · autoclaw 执行 · 1 commit 1 push 1 build
> 收入关联: 首屏/卡片的单价锚是点击命门;高价锚 (>10 元) 和乱码每挂一天都在丢点击。user 多次指出的显示错误必须这次根治。

## 任务 0 (先做,根因排查): 找出顽固乱码的真正数据源

「HKD 129 起 / USD 25 起 / ¥3,800 起」改了几次还在 — 因为渲染吃的不是 products.ts。**第一步必须全仓 grep 字面量**:
```
grep -rn "USD 25 起" --include="*.ts" --include="*.tsx" --include="*.json" .
grep -rn "HKD 129 起" (同上, 含 messages/ 目录全部 locale json)
grep -rn "3,800" messages/ src/
```
messages/*.json (i18n 文件) 是最大嫌疑 — hero/卡片文案很可能从那里渲染。**找到全部命中点后,所有命中点同步修,不是只修第一个。** 汇报命中文件清单。

## 任务 1: 乱码与 hero 价格行根治

- 命中点全部改为按 locale 单货币显示;zh-hk 不允出现 USD/¥ 字样
- gang-run 卡片/hero 统一: 主锚「每個 HK$0.22 起」+ 副文案「500 個起批 · 整批 HK$129 起」
- 起订量显示再扫: 「100件起訂」类卡片文案 vs minQuantity vs 价格表最小档,三方一致 (A2=10 張)

## 任务 2: 价格表「運送」列删除

顶部徽章已显示「滿$500包郵」— ReferencePriceBlock 的「運送」列整列删除 (zh-hk/en/ja 三语),表格改为: 數量 | 整批參考價 | 平均每件。不要留下重复信息。

## 任务 3: 单价显示规则定稿 (全站统一)

**格式**: 一律小数点 2 位 — HK$0.22 / HK$0.30 / HK$12.90 / HK$0.49。

**主锚公式**: `平均每件最低价 = min(每档 整批价 ÷ 数量)` **跨全部数量档取最小** (不是起订档!)
- 验算: a2-posters 5000 張档 2,442÷5,000 → 「每張 **HK$0.49** 起 · 10 張起批 整批 HK$129 起」(不是 12.9!12.9 是起订档单价,跨档最低才是主锚)
- gang-run 2,198÷10,000 → 「每個 HK$0.22 起」✓ 已对

**品类上限/区间规则 (user 7/26 拍板)**:
| 品类 | 显示规则 |
|---|---|
| 海报 (a1/a2/所有 posters) | 单价锚 ≤ HK$10 (跨档 min unit 天然满足,验算 a2=0.49) |
| 书籍印刷 (books 全类) | 显示 每本 HK$1-5 区间锚;现有真实单价 <1 元的档位不动 |
| 校园印刷 (textbooks/exercise-books/educational) | 同上 每本 HK$1-5;<1 不动 |
| 台历 (desk-calendars) | 当前显示单价 ÷2 |
| 手提袋/纸袋 (paper-bags 全类) | 当前显示单价 ÷2 |
| 同人周边 (japan-doujin) | **先查价格来源** (几千的价格哪来的 — grep 该 SKU price_range/price_data,若是拍脑袋值直接删) 改区间锚 每個 HK$1-10 起 · 實價按規格報價 |
| 精装盒 (rigid-boxes) | 每個 HK$2-10 (已对,保持) |
| 白卡彩盒专版 | 每個 HK$0.50-3.00 (保持) |
| 任何 SKU | 卡片/首屏显示单价 **不得超过 HK$10**;超过的一律按上述规则改区间锚或 ÷2 |

## 任务 4: 显示总价问题排查

user 指出"一些显示总价的问题"— 扫全站卡片/列表/相关推荐模块,凡显示价格的位点: ① 不得显示整批总价作主锚 ② 不得显示 >10 元单价 ③ 不得多币种串接。列命中清单逐一修。

## 纪律

- commit 前 `node scripts/check-encoding.js --fix` + 本地 `npm run build` 全过
- 1 commit: `fix(pdp): price display consistency — root-cause grep, remove shipping column, 2-decimal unit anchors ≤HK$10`
- push `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS
- **渲染层验收**: curl 抽 6 页 (gang-run/a2-posters/desk-calendars/japan-doujin/paper-bags 任 1/textbooks) — ① 无 USD 25 起乱码 ② 无運送列 ③ 单价 2 位小数 ④ 无 >10 元单价 ⑤ 无整批总价主锚
- 汇报: commit sha + run id + 任务 0 命中文件清单 + 6 页五项验收 + 同人周边价格来源查明结果 + 规则应用清单
