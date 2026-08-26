# V3.13 战略 — 剩余全品类关键词 SEO+GEO 总攻（K3 8/22 02:24 拍板）

> 数据：GSC 8/14-8/20（84 国全量，v3.2 §一 口径）。v3.12 已覆盖：包装盒/纸袋/海报/贴纸/exercise-books/婚礼（本卡不重复）。
> 竞品事实：e-print 利是封 HK$160/100 个（珍珠紙+立體燙工，7 天交貨，全港分店取貨）；print100 利是封 $330/100 个（光粉紙，7 工作天）—— 价格锚点必须从我方 pricing.ts 取真实值对打。
> 战略层级：本文 > v3.12 > v3.11 > ...

## 一、剩余品类机会池全景（v3.12 未覆盖，按 imps 排序）

| 品类词群 | imps/7d | 词数 | clicks | 排名带 | 性质判定 |
|---|---|---|---|---|---|
| **books 書刊** | **338** | 128 | 0 | 深（pos 33-90） | 🏆 最大未开发池 |
| **flyers 宣傳單張** | 79 | 18 | 1 | pos 28-37 主力 | Pillar 未动过 |
| **calendars 月曆** | 76 | 19 | 1 | pos 18 striking + 长尾跌 | ⏰ 季节性 NOW |
| **food 食品包裝** | 48 | 4 | 0 | pos 12.7-29 全上升 🚀 | blog 在扛，类目未接 |
| **banners 易拉架** | 40 | 11 | 0 | pos 60-68 深海 | 硬骨头 |
| **red-packets 利是封** | 27 | 3 | 1 | pos 30-34 | ⏰ CNY 备货季 11 月 |
| **menus 餐牌** | 23 | 7 | 0 | 全 striking（13.5-17.8） | 摘果型 |
| **envelopes 信封** | 19 | 5 | 0 | **pos 1-2.6 却 0 点击** | 🚨 纯 CTR 漏勺 |
| **doujin 同人** | 18 | 12 | 0 | 同人印刷 11→5 ↑ | C107 冬コミ 10 月启动 |
| **labels 標籤** | 16 | 4 | 0 | pos 22-64 | 顺带 |
| **same-day 即日** | 15 | 6 | 0 | 全 striking（10-16） | 摘果型 |
| **certificates 證書** | 11 | 2 | 0 | pos 11 striking | 摘果型 |
| **educational 校園** | 11 | 5 | 1 | 畢業紀念冊 pos 8.3 已 click | 守+扩 |

合计剩余可调动：**~780 imps/7d**（占查询级总量 51%——v3.12 只动了一半）。

## 二、三个结构性判断（多问问为什么）

### 判断 1：envelopes 是「排名≠点击」的活教材 —— CTR 优化单独成军
大信封 pos 2.6（第 1 页顶！）11 imps 0 clicks；公司信封 pos 1 0 clicks；彩色信封 pos 1 0 clicks。
为什么？排名到了但 snippet 没有点击理由——用户看到 title 不知道「多少钱/多久到/凭什么点你」。
**这是全站最便宜的点击：不用升排名，只改 title/description 就有点击。** R2 已在 8/19 改过 envelopes meta，本窗口（8/14-8/20）只覆盖 1 天新数据，效果未显——8/28 对账验证，若仍 0 click 则 snippet 二次重写（价格数字前置 +「邊度買」口语钩子）。

### 判断 2：books 書刊 338 imps 是全站单一最大池，但需要「结构」不是「 sprinkle」
- saddle stitch booklet(s) 36 imps pos 80-90：着陆页 /en/product/saddle-stitch-booklets/ 有明显内容-意图错配（搜「怎么做/多少钱」，给的是货架页）——v3.10 作战包 3 欠账，本卡收
- 騎馬釘 cluster 36 imps pos 33-42（zh）：騎馬釘/騎馬釘印刷/騎馬釘書刊 三词同落一个 PDP，PDP 单打独斗
- china catalog 3 词齐升（v3.10 着陆页 8/21 上线红利在途）✅
- 教科書/教材 22 imps 落 ja PDP（locale 错配 v3.12 T10#2 已修，待收录）
- **打法：1 篇 en 大单指南 blog（saddle stitch pricing guide）+ books category Pillar 加厚 + 騎馬釘 PDP 三词对齐**，三类意图各给一个正确着陆

### 判断 3：季节性时间窗 = 排名建设必须提前 60-90 天
- **月曆（76 imps）**：2027 年历采购 9-11 月，现在就是旺季前夜。月曆印刷 pos 18.4 已拿 1 click——**这是全站当前投入产出比最高的单词**
- **利是封（27 imps）**：CNY 2027（2/6）备货 11-1 月，e-print 已用 HK$160/100 个卡位——9 月完成内容建设，11 月收割
- **同人誌**：C107 冬コミ 12/30-31，早割内容 10 月上线（参照プリペラ 早割 50% 模式），现在不动

## 三、M3 执行指令卡（2 天，8/22-8/23）

> 铁律沿用 v3.12 卡（禁 git add -A / untracked 检查为空 / verify-deploy success 才算 / CF 失败停手 / §11 / §13.6 / §13.10 / UTF-8 LF）。featuredSnippet 里的价格数字必须从 `src/lib/pricing.ts` 或 products.ts `price_range` 取真实值，⛔ 禁止编造。

### Day 1（8/22）— 月曆 + 宣傳單張 + 書刊结构战

**T14. calendars 月曆词群（76 imps，P0 季节窗）**
- `category-seo-content.ts` calendars 条目（3 locale）：
  - featuredSnippet（对齐 月曆印刷 24i pos18.4 / 月歷印刷 11i pos17.2 / 月曆訂製 10i / 訂制月曆 10i / 印月曆 2i）：`月曆印刷 100 本起訂製，掛曆 HK$XX/本、檯曆 HK$XX/本（真实价），2027 年曆 9 月早鳥，免費設計 + 燙金，DHL 全球 2-4 天。`
  - h2/首段 5 词对齐 + 「2027 月曆」时效词（年历词 8 月已过「2026」，必须全部指向 2027）
  - 5 FAQ：起印量/价格/设计服务/交期/燙金工艺
- en 侧 calendar-printing-guide blog 尺寸段重写（calendar sizes/dimensions/typical/average 4 词全跌 20+ 位，pos 62-80，尺寸表 + 2027 更新）

**T15. flyers 宣傳單張词群（79 imps，P0）**
- `category-seo-content.ts` flyers 条目（3 locale）：featuredSnippet + 对齐 宣傳單張 25i pos36.6 / 宣傳單張印刷 18i pos27.9 / 單張印刷 1i pos19 + 尺寸表（A4/A5/A6）+ 5 FAQ
- en：double-sided-flyers PDP 对齐 double sided flyer printing 3i pos39.3（47→39 上升中）
- ja：両面カラー印刷 pos 40.1 ⛔ 继续不动（R3 重评估期，8/28 对账再定）
- 内链：flyers category ↔ same-day-flyers PDP ↔ a5-vs-a6-flyer-size blog（pos 6.3 已强，做流量分发器）

**T16. books 書刊结构战（338 imps，P0）**
1. 新 blog en `saddle-stitch-booklet-printing-guide`（§13.4 v3 标准）：saddle stitch booklet 26i pos79.7 + booklets 10i pos90.1——内容-意图错配修复，pricing 表 + 页数/装订方式选择指南 + 3 内链（PDP + books category + china catalog 着陆页）
2. `category-seo-content.ts` books 条目：featuredSnippet + 对齐 印書 9i pos31.9 / 型錄印製 1i pos18 / 繪本印製 1i pos19
3. saddle-stitch-booklets zh PDP：騎馬釘/騎馬釘印刷/騎馬釘書刊 三词对齐（36 imps）
4. 顺手确认 china catalog 3 词着陆页收录状态（IndexNow 重 ping）

### Day 2（8/23）— 食品包裝 + 信封 CTR + 餐牌/利是封摘果 + 扫尾

**T17. food 食品包裝（48 imps 全上升 🚀，P1）**
- food-boxes PDP：对齐 食品包裝訂製 12i pos19.5（striking）+ FDA 級/食品級卖点前置
- blog food-packaging-printing-guide（26i pos29.2 在扛）：文末「訂製直通」段 + 3 内链（food-boxes PDP + packaging category + PKG-016 免刀模费）
- 食品印刷 3i pos12.7 NEW + 包裝食品 裡印 7i pos14.6：blog 内自然埋词

**T18. envelopes CTR 修复（19 imps pos 1-2.6 零点击，P1 最便宜点击）**
- large-envelopes / business-envelopes / colored-envelopes 3 PDP 的 title/description 二次重写：价格数字 +「100 個起」+ 交期前置（若 8/19 R2 版本 8/28 仍 0 click 则执行本项；今天先做 spot check：curl 3 个 PDP 确认 8/19 meta 已上线）

**T19. menus 餐牌摘果（23 imps 全 striking，P1）**
- menus category featuredSnippet 已有（8/19 R3）→ 加 3 FAQ + 内链三角（pvc-menus PDP 承接 膠卡餐牌 13.5 / 膠片餐牌 14）
- pvc-menus PDP：title 对齐 膠卡餐牌/膠片餐牌（35.5→13.5 大升势，推一把进首页）

**T20. red-packets 利是封季节建设（27 imps，P1 时间窗）**
- red-packets category（3 locale）：featuredSnippet 对齐 利是封印刷 12i / 利是封訂製 10i（1 click）/ 訂製利是封 5i + 2027 CNY（2/6）时效 + 珍珠紙/燙金工艺表 + 5 FAQ
- 对打 e-print 事实锚：e-print HK$160/100 个 7 天——我方价格从 pricing.ts 取真实值，若相近则打「免費設計 + 全球配送」差异，若贵则打工艺/材质差异，⛔ 不编价格

**T21. 扫尾顺带（每处 ≤15 min，不追求完美）**
- certificates PDP：證書印刷 9i pos11 → title 对齐 + 1 FAQ（striking 摘果）
- same-day：same-day-flyers-printing blog 加 即日印刷/即日急件 答案前置段（pos 11.5/12.3）
- labels：small-batch-stickers PDP 加 "label printing" 词（12i pos57.7）
- 透明貼 11i pos29.5 → transparent-stickers PDP title 对齐
- 精裝盒報價 6i pos48 → rigid-boxes PDP 加「報價」钩子和价格锚
- banners 易拉架 40 imps 深海：⛔ 本轮不动（pos 60+ 需内容重构，排 9 月）

**T22. GEO + 发布**
- 所有改动页 featuredSnippet/FAQ 确认就位
- `public/llms.txt` 更新：calendars/flyers/books/food/menus/red-packets 类目要点（月频更新首次执行）
- IndexNow ping 全部改动 URL + 验证 202

## 四、验收口径（8/28 GSC cron 对账，与 v3.12 合并）

| 指标 | 基线 | 8/28 目标 |
|---|---|---|
| striking 词进首页（pos≤10）| 0 | ≥5（候选：印刷紙袋/紙袋印刷/exercise book printing/a3海報大小/ポスター費用/月曆印刷/證書印刷/膠卡餐牌）|
| 月曆词群 imps | 76 | ≥95（季节上升叠加） |
| envelopes 3 词 clicks | 0 | ≥1（CTR 修复验证） |
| 有名词 7d clicks | 6 | ≥12 |
| 站点日均 imps | 682 | ≥900 |
| GEO：Gemini/ChatGPT 引用测试（K3 自测 2 词） | 月曆已命中 | +包裝盒訂製 / 月曆印刷 2027 新命中 ≥1 |

## 五、转化链路状态（北极星闭环检查点）

- 008 询盘度量层已 deploy（0840f97 ✅）——**待 K3：Supabase SQL Editor 跑 008 SQL + CF Pages env 配 NEXT_PUBLIC_SUPABASE_URL/ANON_KEY + 触发 redeploy**（NEXT_PUBLIC_* 构建期内联，不配 env 度量层静默空转）
- 配好后 7 天即有「点击→询盘」自有数据，CTR/询盘率基准从经验值升级为实测值
