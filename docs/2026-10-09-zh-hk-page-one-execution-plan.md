# 2026-10-09 zh-hk 繁体站排名首页冲刺执行方案

> 角色：ZprintPro 首席 SEO/AEO/GEO 数据战略参谋
> 定位：补齐 `docs/2026-10-09-en-ja-page-one-execution-plan-v2.md`（en/ja 终版）缺失的 zh-hk 腿——K3 10/9 19:43「也包括繁体 zh-hk 站点首页冲刺方案」
> 数据基座：`.hermes/gsc-2026-10-09/compare-vs-0918.json`（9/18↔10/09 二十天硬对比）+ `extract.json` hk 28d/7d 网页级（本方案数字均为本会话复算值）
> 框架对齐：v2 方案 P0-P3 + 千问三层杠杆（排名层/摘要层/内容层）；hk 特性 = 基本盘最稳（top10 词 225→230）、点击引擎（全站 390 点击中 hk 占 290）、Q4 季节簇主场

## 〇、hk 站 20 天成绩单（先看清再动手）

- top10 查询 225→230；28d 点击 290（三连升）；7d 点击 88。
- 8 个 T1 锁词 6 升 2 平零退步；纸袋双词进 top10；即日印刷破零放大（1→2clk）。
- **核心病灶 = CTR 断裂**：top10 内 0 点击高展示词 ≥7 个（见 §一）；**第二病灶 = 类目页沉睡**：6 个类目页 116-312 imps 排名 32-62、几乎 0 点击（见 §二）。

## 一、P0：CTR 断裂修复批（meta 价格钩，不动 title —— 零冻结风险）

> 杠杆层：摘要层。纪律：只改 description，title 一字不动（churn 组冻结至 10/19 + 23 slug 冻结集不受影响）。

| 词 | pos | imps 28d | 落页 | 动作 |
|---|---|---|---|---|
| 食品包裝印刷 ⚠️下滑 | 9.7（6.7→9.7） | 117 | blog/food-packaging-printing-guide（216im@11.3） | meta 首句改答案句：HK$ 价格带 + MOQ + 交期（真值 products.ts food-boxes）；同步防守排名（§四） |
| 紙袋印刷 | 8.3 | 77 | category/paper-bags + blog/paper-bag-printing-guide（129im@10.2） | 双落页 meta 价格钩：「100個起 HK$X.X 起」真值 |
| 印刷紙袋 | 8.2 | 72 | 同上 | 同上（双词同页，一批搞定） |
| 餐牌印刷 | 9.8 | 58 | menus 类目/PDP | meta 价格钩（pvc-menus 已冻结 title，meta 可动） |
| 即日印刷 | 8.4（2clk） | 55 | blog/rush-printing-hk-guide（74im@9.5 3clk）| 已破零，meta 加「下午3時前落單即日交貨」式承诺句放大 CTR（须与活文案一致） |
| 大信封 / 公司信封 | 5.2 / 1.0 | 40/21 | envelopes 族 | E1 转化块已上 en/ja，**hk 侧 meta 钩补挂** |
| 年曆印刷（新词） | 5.5 | 8 | custom-calendars（250im@21.2）| 并入 §三 Q4 批 |

验收锚点：**10/12 档**看这 7 词 c 值破零数 ≥3。

## 二、P0：类目页激活批（hk 最大沉睡资产）

| 类目页 | imps 28d | pos | 病灶 | 动作（按 en/ja E1/E3 已验证模式复制） |
|---|---|---|---|---|
| category/books | **312** | 42.5 | 书是大词（書刊印刷 94im）落页却在 42 | 类目转化块（价格阶梯 + MOQ 答案块 + 3 SKU 直链）+ blog→类目带钱词锚文（書刊印刷/印刷書刊精确锚）|
| category/packaging | 234 | 35.2 | 包裝盒印刷/紙盒印刷锁词落页 | 同上（8 锁词中 3 个包装盒族词的主承接页） |
| category/flyers | 201 | 32.0 | 宣傳單張簇 200+ imps | 转化块 + 宣傳單張/單張印刷锚文（R2 词承接） |
| category/paper-bags | 173 | 34.2 | 紙袋双词已 top10 但落页在 34 = **blog 在接、类目没接上** | 转化块 + blog↔类目互链权重归拢 |
| category/calendars | 159 | 34.2 | Q4 主战场落页沉睡 | 见 §三 |
| category/red-packets | 155 | 20.0 | 利是封印刷 19.1 季前上行 | 转化块（CNY 窗口内容已在库 cny-2027 指南）+ 锚文 |
| category/stickers | 135 | 45.2 | 貼紙印刷=全站第一词 170im 落页 45 | 转化块 + sticker-buying-guide（106im@26.7）锚文归拢 |
| category/posters | 116 | 61.8 | 海報印刷 180im@16.1 被 a2-posters PDP 和 blog 分接 | 锚文分工：海報印刷→类目，a2/a1→PDP（现有分工合理，类目页需转化块托底） |

> 依据：blog 层已能打进 top10-13（food-packaging 11.3 / paper-bag 10.2 / rush 9.5），证明域名权重够；类目页 0 转化块、0 精确锚承接 = 结构问题非权重问题。en/ja 侧 E1（envelopes 转化块）今日已上线，hk 复制同模板即可，真值全走 products.ts。

## 三、P1：Q4 季节冲刺批（hk 是主战场，窗口 = 现在到 12 月）

1. **月曆/年曆簇（最紧急，peak 已开始）**：月曆印刷 118im 20.4→16.4、**7d 已到 3.93**；年曆印刷新词 5.5。custom-calendars PDP 250im@21.2 + category/calendars 159im@34.2 双沉睡。动作：① §一批 meta 价格钩 ② 类目转化块 ③ 月曆/年曆/座檯曆 锚文互链（wall/desk/custom-calendars PDP 已在 9/20 批优化过 title，复用）④ daily-content 车道 W 窗排期确认（11 月檯曆季内容）。
2. **利是封簇（CNY 预备）**：利是封印刷 27.8→19.1；category/red-packets 155im@20.0 临门一脚。cny-2027-red-packet-printing-guide 已入库——动作 = 转化块 + 指南↔类目互链，12 月-1 月放量前把类目推进 top10。
3. **聖誕簇**：圣诞卡指南 10/9 人手会话已交付（per 7deaf888 prompt 注入记录），hk 侧承接 = greeting-cards 6 SKU 锚文。

## 四、P1：防守批（唯一下滑大词）

- **食品包裝印刷 6.7→9.7（117 imps）**：hk 唯一高展示退步词。落页是 blog（216im@11.3 同向承压）。动作：① 指南页内容刷新（lastUpdated + 2026 价格表复核，真值 products.ts food-boxes）② 内链加固（food-boxes PDP 99im@38.3 太弱，指南→PDP 锚文）③ §一 meta 钩。10/12 档若跌破 12 升级 P0。
- 次要观察：貼紙設計 15.1→18.4 / 貼紙訂製 25.7→31.2（设计/订製意图词，与 9/23 工艺词清理后的词面重排有关，下档再判）。

## 五、红线与纪律（hk 侧专用）

- **冻结避让**：23 slug 冻结集中 hk 主词命中 = 公司信封/彩色信封/環保紙袋/牛皮紙袋/畫冊印刷/證書印刷/作業簿/環保傳單/燙金貼紙/螢光貼紙/防水貼紙/透明貼紙 等——这些 SKU 的 **title 不动**，本方案全部走 meta + 类目层 + 内链层，零冲突。
- **A/B 两槽验证窗**：a5-flyers / double-sided-flyers（R2 單張印刷批）窗已届满（9/21+7-10d），窗满对账 = 本方案 §一宣傳單張簇数据即为对账证据（↑6-8 位 + 破零 1clk = **R2 判胜**，可复制到传单族其余 SKU 的 meta 层，title 复制需等 10/19 churn 解禁）。
- 真值铁律：所有价格/MOQ 引 products.ts / price-data.generated.ts；锚文用词引 GSC 实证词（本方案词表即锚文白名单）。
- 节奏：§一+§二可一批（meta+类目转化块，预估 1 次 push）；§三月曆批优先于利是封批。

## 六、两周验证节奏

| 档 | 验证点 |
|---|---|
| 10/12 档 | §一 7 词 c 值破零 ≥3；食品包裝印刷守住 ≤12 |
| 10/16 档 | 类目页 8 页 pos 均值下降 ≥3 位；月曆簇 7d 维持 ≤5 |
| 10/19 | churn 冻结解禁 → 传单族 title 复制「單張印刷」模式裁决（凭届时 CTR 数据） |

> 数据来源：`.hermes/gsc-2026-10-09/extract.json`（hk 28d/7d 查询+网页）· `compare-vs-0918.json`（9/18↔10/09）· 8 锁词追踪 `.hermes/logs/2026-10-06-gsc-feedback.md` §3 · 真值 `src/data/products.ts`
