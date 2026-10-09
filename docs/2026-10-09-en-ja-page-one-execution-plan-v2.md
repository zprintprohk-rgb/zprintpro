# 2026-10-09 en/ja 排名首页优化提升执行方案 v2（终版 · 对齐千问 v2.0 P0-P3）

> 角色：ZprintPro 首席 SEO/AEO/GEO 数据战略参谋
> 数据基座：GSC 三批次复算（09-29 / 10-05 / 10-09 导出，openpyxl 逐文件，脚本 `.hermes/tmp/gsc_compare_20261009.py` + 本次补充核查脚本可复跑）——**本方案所有数字均为本次会话亲自复算值，非转引**
> 千问对齐声明：千问 3.8max《全站三语言飞轮提升总指令 v2.0》原文附件（ZprintPro 全站三语言 SEOA.txt）不在仓内（全仓 + .hermes + k3-inbox 深搜确认）；其 P0-P3 框架与术语对照表已由 10-09 报告 §六并入，本方案对齐该框架，引用链完整
> 前序继承：`docs/2026-10-09-gsc-deep-audit-and-strategy.md`（本日深度盘点）、`docs/2026-10-08-en-ja-page-one-execution-plan.md`（四梯队+三层杠杆）、`docs/2026-09-29-gsc-seo-geo-quarter-review.md`（季度复盘盲区图）
> 当前锚点：2026-10-09；title churn 组冻结至 10/19；P0 窗 = 10/9-10/12（零 title 改动）

---

## 〇、三批次复算总表（本方案全部判断的基座）

### 0.1 站点总量（28d 图表合计，逐文件复算）

| 站点 | 09-29 | 10-05 | 10-09 | 10 日判读 |
|---|---|---|---|---|
| us | 32clk/4,125imp（CTR 0.78%） | 33/3,943 | **36/3,802（CTR 0.95%）** | 点击三连升、展示缓降 = 质量改善在兑现 |
| jp | 36clk/1,922imp（CTR 1.87%） | 34/2,036 | **32/2,023（CTR 1.58%）** | 展示横盘、点击两连降 = ja 需要新钩子（年賀状/料金表） |

### 0.2 关键测量学判定（红旗 1 证据强度升级）

ja 28d 查询清单中 `pvcシール` 仅 **1 im@14.0 也入清单**（三批次均在）→ 本仓 GSC 清单阈值 ≈1 展示。因此：
- 年賀状印刷 / 2027年賀状 / 年賀状（ja）三批次**未入清单 = 真零展示**，非阈值截断假象；
- corporate / business / custom holiday cards（en）三批次同样**真零展示**。
- 盲开验证结论成立且升级：**词面覆盖（A4 批）7-14 天未建立查询关联 → 必须下内容层第三刀**（见 §一）。

---

## 一、红旗 1 深度复核（修正原诊断 + P1 修复精确指令）

### 1.1 逐层覆盖审计（本次会话线上源码实查）

| 层 | ja greeting-cards | en greeting-cards |
|---|---|---|
| SEO title | ✅ 「年賀状印刷 2027・10枚から…」（seo.ts:659） | ✅ 「Business & Holiday Card Printing from $0.50…」（seo.ts:658） |
| meta keywords | ✅ 含 年賀状印刷/2027年賀状/年賀はがき/法人向け年賀状 | ✅ 含 corporate/business/bulk/custom holiday cards 4 词 |
| meta description | ✅ 年賀状印刷 2027 対応 | ✅ Business & holiday card printing… |
| 类目 h2 | ✅ 年賀状印刷・グリーティングカード印刷（category-seo-content.ts:4421） | ❌ 无 holiday 词面（$0.50/3D Pop-Up/100 MOQ 钩子向） |
| 类目 FAQ | ✅ ×2（いつから注文 / 喪中はがき，:4501-4502） | ✅ ×2（corporate holiday cards 何时下单 / company Christmas cards logo，:4413-4414） |
| **类目 buyingGuide 正文** | ❌ **5 段无一提及年賀状**（仅クリスマス/新年泛述） | ❌ **5 段无一提及 corporate/holiday cards** |
| coreAdvantages | ❌ 无年賀状 | ⚠️ 仅「Holiday / Birthday /…」列表式罗列 |
| SKU 层 | ✅ **6 贺卡 SKU nameJa 全部前置「年賀状印刷｜」+ 5 个年賀状专品 SKU**（products.ts:155/351/449/545/643 + sku-seo-data.ts:1236-1416） | ⚠️ 仅 spot-uv/matte 2 SKU keywords 含 modern/matte holiday cards |
| blog 层 | ❌ **全站 0 篇年賀状专文**（ja blog 唯一提及 = 厚紙カード gsm 文 1 句） | ❌ 全站 0 篇 holiday cards 专文 |
| 内链锚 | ❌ 无「年賀状印刷」精确锚 → 类目 | ❌ 无「holiday cards」精确锚 → 类目 |

**修正原诊断两条**：
1. 「缺 body 内容层锚点」对 ja 只对一半——ja 词面覆盖已达 7/10 层（A4 批把 6 SKU nameJa 全置年賀状前缀 + FAQ×2 + title 全套），**真缺口收敛为 3 处**：类目 buyingGuide 主题段、专文 blog、精确锚内链。SKU 层**不再追加**（已满覆盖，再加即堆砌）。
2. **新发现（关联稀释根因之一）**：CSV 源头 8 个 SKU 的 en keywords 挂着 holiday-card 词——a4-flyers / a5-flyers / double-sided-flyers / thick-paper-flyers / same-day-flyers / foil-embossed-custom-red-packets ×3（`zprintpro-sku-seo-data.csv` 行 16-21/34-36，sku-seo-data.ts:583-763/1231-1317 已实查）：`custom holiday card / business holiday card / Mother's Day card / save the date` 等。**Google 学到的 holiday cards 承接页是传单页和利是封页，不是贺卡页** → title/FAQ 层再改也建不起正确关联。SOP-5 修源头：CSV 置换为 flyers/利是封本词 → `csv-to-sku-seo.mjs` 重新生成。

### 1.2 P1 修复指令（今日可落地 · 零 title 改动 · 内容层）

| # | 动作 | 落点 | 内容要点 |
|---|---|---|---|
| R1-1 | ja buyingGuide 第 1 段后插入年賀状主题段 | category-seo-content.ts greetingCardsContent.ja.buyingGuide.paragraphs | 「年賀状印刷は11月が本番・10月末が早割目安」：10月受付/早割（10月末期限，标复核日 2026-10-31 到期）/12月中旬到着プラン/喪中はがき対応/10枚から・箔押し対応。来源标注（グラフィック/mynavi 调研口径，复核日 2026-10-15） |
| R1-2 | en buyingGuide 第 1 段后插入 corporate holiday cards 主题段 | greetingCardsContent.en.buyingGuide.paragraphs | corporate/business holiday cards 段：mid-November cut-off、100-5,000 pcs bulk、foil-stamped logo cards 3-5 天生产、DHL 2-4 天。价格真值走 products.ts，不编数 |
| R1-3 | 精确锚内链 ≥3 条 | ja：厚紙カード gsm guide（blog-data/ja.json:799 已有年賀状句）+ rush 即日文 → /ja/category/greeting-cards/ 锚「年賀状印刷」；en：sticker-guide/相关 pillar → /en/category/greeting-cards/ 锚「corporate holiday cards」 | 锚文本=目标词，分散来源，单 pillar 同锚 ≤3（§3.D 内链纪律） |
| R1-4 | CSV 污染置换（SOP-5：改 CSV → 跑生成器 → 三件套断言，禁手搓派生） | zprintpro-sku-seo-data.csv 行 16-21/34-36 的 en keywords | holiday-card 词 → 各 SKU 本词（same-day flyers 收 `same day flyers` 族；red-packets 收 CNY/lai see 族）；与 P2 title 批同攒批 push |
| R1-5 | blog 层 = W9 聖誕卡前置承接（见 §五裁决 2） | B7 queue | 破 queue 前置后，ja 版写成「クリスマスカード＋年賀状」双目标冬季卡季文，一次补两层 |

---

## 二、en 站执行方案（按优先级）

### P0 = 10/9-10/12（零 title · 攒批 1 push）

| # | 目标词（28d 复算基线） | 动作 | 判据 |
|---|---|---|---|
| E-P0-1 | 红旗 1：holiday cards 簇 0 im | R1-2 + R1-3（§一） | 10/12 起 0→有展示即胜 |
| E-P0-2 | small batch sticker(s) printing 64+35im **c0** | E3 价格钩子 10/9 已上 → 等 7d 生效；**若 10/12 仍 c0，第二刀 = meta description 价格前置 + Product schema price 呈现复核**（meta desc 非 title，冻结不覆盖） | c 值破 0 |
| E-P0-3 | a2 poster 29im@30.6（7d 42.6 📉） | **L1-4 未执行**（10-09 批漏收）：poster-size-guide → a2 poster SKU 补 1 条内链催化 | 28d 回 25 内 |
| E-P0-4 | small batch label printing 42im@29.0（7d 32.9 📉） | labels 簇 quickAnswers 深-1 批（原定 10/8-11，仍开放）：labels 为 stickers 类目内簇，答案卡补「from $X / 10 MOQ」直接答案 | 止跌回 26 内 |
| E-P0-5 | GEO 引用流 | 10/9 事实对比表已上线 → 观察窗不追单窗；补 Organization sameAs 复核（千问 P0 技术底座项） | 长线资产 |

### P1 = 10/12（数据驱动日）

GSC 新档导出 → 验证矩阵终判（§六）→ catalog-china 词序变体归并方向裁决（`catalog printing china` 26.7 📉 vs `china catalog printing` 17.7 / `catalogue printing china` 19.2 —— **Google 正在重新归并词簇，title 层动作锁到归并方向明确后**，否则两边都不讨好）→ churn 组解冻裁决 → money-kw-mine 复跑 + 35 词置换算法。

### P2 = 10/13-19（title 批 · 门童 #27 逐条过 · 无回撤证据才动）

| 动作 | 内容 |
|---|---|
| W2.1 | wholesale saddle stitch title（57 当量候选已备，DELIVERY 代码包） |
| W2.3 | same day flyers title（55 当量，兼修存量 66 超线） |
| E2 | transparent stickers 补 from $X 价格钩子（14im@18.7 c0） |
| TRIM 收编 | catalog-china 77→56 当量 / rush en 66→55 / rush ja 59→55 |
| R1-4 收编 | CSV 污染置换随本批重新生成（§一） |

### P3 = 10/20-31（季节冲刺 + 深水）

holiday cards 内容冲刺（11 月美国 corporate 下单峰）：W9 前置的 en 版 10/14 已发 → 本窗评估加码独立 buying-guide 文；深-2 按 10/12 数据取舍；en 「china/factory-direct」内容线立项（11 月 queue 既定）。

---

## 三、ja 站执行方案（按优先级）

### P0 = 10/9-10/12（零 title · 攒批 1 push）

| # | 目标词（28d 复算基线） | 动作 | 判据 |
|---|---|---|---|
| J-P0-1 | **年賀状印刷 / 2027年賀状 0 im（最高红旗）** | R1-1 + R1-3（§一）；**季节不对称：日本年賀状检索 10 月中起量、11 月主峰，早割叙事 10/31 到期——每晚 1 天少 1 天收成（K3 T42 军令状同构）** | 10/12 起 0→有展示即胜；10/19 仍 0 升级 W9-ja 专文独立立项 |
| J-P0-2 | 教科書 印刷 18im@34.6（7d 43.2 📉） | **零动作纪律**（churn 组冻结至 10/19）：B2 注入的 kw 待生效中；10/19 仍 ≥30 启动诊断（纪律已立，不提前动） | 10/19 触发线 |
| J-P0-3 | コミケ 印刷 175im@20.8（7d 24.5 季后退潮） | 四层叠加已完（A4+A5+B2+L1-3），退潮为预期内，**零加码**；冬コミ蓄水窗 11 月再评估 | 12 月前守住 28d ≤20 |
| J-P0-4 | クラフト紙 パッケージ 双变体 105im@24.0/24.4 | W2.2 料金表 FAQ 10/9 已上 → 10/12 看 7d 钩子效应；同时启动 **ja 料金表页独立化评估**（raksul 构式，P3 立项输入） | 7d 位次回落 ≤20 |
| J-P0-5 | 特急印刷 激安 13im@16.1 c0 | E4 特急料金 FAQ ×2 已上 → 等生效；c0 若 10/12 未破，下一刀 = rush ja meta desc 料金前置 | c 值破 0 |

### P1 = 10/12

验证矩阵终判（§六）；シール印刷/オリジナルシール盲开第二验（9/30 title 重写后 9 天仍未入清单 —— 词簇关联建立期 2-4 周，**继续观察零动作**，pvcシール 14.0 证明贴纸相关性在涨）；卒アル 13im@66.1 蓄水期维持不动。

### P2 = 10/13-19（title 批 · 门童 #27）

W2.3 same day flyers ja（55 当量）+ rush ja TRIM 59→55；両面カラー印刷 28im@35.4 与 食品パッケージ 17im@50.5 深-2 动作按 10/12 数据 gate；a2 クリアポスター 18im@37.5 观察 B3 kw 生效。

### P3 = 10/20-31（年賀状冲刺 + ja 料金表独立页）

① 年賀状内容冲刺：W9-ja 版（双目标冬季卡季文）10/14 承接后，10/20 起按 GSC 展示数据决定是否独立年賀状完全ガイド专文；② ja 料金表页独立化（クラフト紙 105im + 食品 17im + パッケージ印刷 275im 族 = ja 最大单一需求簇，raksul 构式对打）；③ 卒アル Q4→3 月蓄水内容段按 10/12 验证加码。

---

## 四、GEO/AEO 跨站线

| # | 动作 | 状态/窗 |
|---|---|---|
| G1 | ZprintPro vs MOO vs Vistaprint 事实对比表（en，hong-kong-printing-guide） | ✅ 10/9 上线，观察窗不追单窗 |
| G2 | ja 版对比事实表（raksul/npi 构式，竞品名仅事实比较不贬损，§0.36.2） | P3（10/20-31）；ja 备用品牌词「ジープリント」单独埋点，不与 ZprintPro 同现（§13.16.1） |
| G3 | AI 引用监测基线 5 问月度快照 | 11 月 queue 既定，不提前 |
| A1 | FAQPage JSON-LD 全绿维护 + quickAnswers 直接答案卡格式统一（R1 新增 FAQ 走 extractFaqFromHtml 兼容格式） | 随每攒批门检 |

---

## 五、四件待裁决的建议答案（K3 拍板后执行层即动）

1. **名片展示层 (a)/(b)/(c)**：建议 **(c)** 新增 1 个「名片・咭片印刷」承接落地页，不动已部署贺卡资产、不动 middleware 301。证据：接单层解禁后海外名片单已实证（400+ USD 英国地产公司）；GSC 咭片 56im@41 有真实需求；现状 (a) 等于把已解禁品类的搜索需求让给竞品。(b) 新建 SKU + 品类页会撞 v22 贺卡资产的 301 承接链与 GSC 已有「卡片」展示，风险大于收益。
2. **W9 聖誕卡 blog 是否破 queue 提前**：**建议提前到 10/14，且这不是破 queue——B7 queue SSoT 自己的 R5 季节军令状写明「W9 聖誕卡 撞车根因 = 10/14 8:00 blog 必发（12/25 前 7 天缓冲）」**（zprintpro-daily-content-1x7w.md:2324，K3 8/24 军令状 T42 同构）。执行口径：zh 版聖誕卡照常；**ja 版写成クリスマスカード＋年賀状双目标**（日本冬季卡季一体），一次补齐红旗 1 的 blog 层缺口；en 版补 corporate holiday cards 视角。三 locale 一篇三发，产能不超载（当周 2-3 篇纪律内）。
3. **footer 实体地址口径**：建议 **深圳实体**（2026-06-18 user-corrected 真实主体：深圳市彩龙印刷包装有限公司，legal/ 与 siteConfig 已是深圳口径；footer 若仍写香港新蒲崗 = NAP 自相矛盾，比"无香港地址"更伤 zh-hk 本地信任与 GEO 实体一致性）。如需保留香港本地 SEO 触点，用「深圳自有工厂 + 香港服务节点」双段式，主实体恒为深圳。**这是法务/NAP 层，非执行层可自裁，待 K3 一句**。
4. **FIX-1/FIX-2 锚文回补（宣傳單張 2→≥3、包裝盒訂製 2→≥3）**：纯内链补强、零风险，建议随下一攒批（P1 深-1 窗）执行，不必单独占 push 配额。

**另复 K3 转问：红旗 1 的 P1 修复要不要现在做掉——建议立刻做（今日），**理由：① 零 title 改动，churn 冻结不冲突；② 本次审计已把缺口收敛到 3 个文件级动作（§一 1.2），当天可落地随攒批走；③ 季节收益不对称，10/31 早割叙事到期前每晚一天都在失血。

---

## 六、10/12 验证矩阵（en/ja 锚点 · 基线 = 本次复算 10-09 档）

### en
| 词 | 基线 | 目标 | 归因 |
|---|---|---|---|
| doujinshi printing | 11.2（38im c1） | 前 10 | L1-1 锚 + B2 行 |
| large envelopes | 13.8（19im） | ≤10 | E1 envelopes:en 块 |
| china catalog 簇 | 17.7 / 19.2 / **26.7📉** | 归并方向明确前不动 title | 观察 |
| saddle stitch booklet printing | 4.2（104im c2） | 守住页 1 | churn 纪律 |
| small batch sticker(s) | 5.6/5.8（99im **c0**） | c 破 0 | E3 → meta desc 第二刀 |
| small batch label printing | 29.0（7d 32.9） | 止跌 ≤26 | labels quickAnswers |
| corporate/business/custom holiday cards | **0** | 0→有展示 | R1-2/R1-3/R1-5 |
| a2 poster | 30.6 | ≤25 | L1-4 内链 |

### ja
| 词 | 基线 | 目标 | 归因 |
|---|---|---|---|
| 年賀状印刷 / 2027年賀状 | **0** | 0→有展示 | R1-1/R1-3/R1-5 |
| コミケ 印刷 | 20.8（7d 24.5） | 守住 28d ≤20 | 四层已完成 |
| クラフト紙 パッケージ 双词 | 24.0/24.4 | 7d ≤20 | W2.2 料金表 |
| 教科書 印刷 | 34.6（7d 43.2） | 10/19 ≥30 → 诊断 | 冻结观察 |
| 特急印刷 激安 | 16.1 c0 | c 破 0 | E4 |
| 社名入りカレンダー 少量注文 | 8.7 | 守住页 1 | 存量 |
| シール印刷（盲开第二验） | 未入清单 | 10/19 前入清单 | 9/30 title 生效中 |
| 卒業アルバム 印刷 | 66.1 | 蓄水不动 | B2 行 |

**判读纪律**（承 10-08 方案不重复）：盲开词先看有无展示再看位次；churn 组不比 10-05 差即对冲成功；c 值首次纳入判读——页一词 c 仍 0 下一轮优先 AEO 呈现层。

---

## 七、红线与质检

- **title 冻结**：churn 组至 10/19，最后变更 +2-4 周；本方案 P0/P1 窗零 title 改动
- SOP-5：CSV 改动必跑 `scripts/csv-to-sku-seo.mjs` + 三件套断言；禁手搓派生文件
- §0.23 数据诚信：本方案无未校准搜索量数字；涉时效数字（早割 10/31、mid-November cut-off）标来源与到期复核日
- GSC 黑话零泄漏（门童 #16）；竞品名仅事实比较不贬损（§0.36.2）
- 每攒批门检：tsc 54=54 持平 + 门童全量 + 线上探针；**攒批 push 纪律，docs 本地提交不烧构建配额**
- 人手会话改 `src/data/blog-data/*.json` 前必看 `.hermes/locks/lane.lock`（§0.35.5）与 SESSION_LOCK.md（§0.35.7）

---

## 八、数据来源（§0.23 强制行）

```
数据来源:
- GSC数据/ 2026-09-29 / 2026-10-05 / 2026-10-09 三批 ×12 xlsx（28d 图表合计 + 查询数表 + 7d 查询数表，openpyxl 逐文件复算）
  复算脚本: .hermes/tmp/gsc_compare_20261009.py（复跑输出与本方案 §〇/§六一致）+ 本次盲区词补充核查（28d 查询数表）
- 阈值判定依据: pvcシール 1im@14.0 三批次均入 ja 28d 清单 → 清单阈值≈1 展示 → 未入清单即真零展示
- 内容层实况: src/lib/seo.ts:658-669（greeting-cards title/kw/desc）、src/data/category-seo-content.ts:4242-4509（三 locale 类目内容逐层）
  src/data/products.ts:129/155/351/449/545/643（SKU nameJa）、src/data/sku-seo-data.ts:583-763/1231-1317/2748-2895（SKU kw/body）
  src/data/blog-data/ja.json:799（年賀状唯一 blog 提及）、zprintpro-sku-seo-data.csv 行 16-21/34-36（污染源头）
- queue SSoT: .hermes/cron-prompts/zprintpro-daily-content-1x7w.md:2239-2324（W1-W9 排期 + R5 军令状 10/14 必发条款）
- 千问 3.8max 总指令 v2.0：原文附件不在仓内（全仓深搜确认），P0-P3 框架经 docs/2026-10-09-gsc-deep-audit-and-strategy.md §六 并入后对齐
- 前序基线: docs/2026-10-09-gsc-deep-audit-and-strategy.md / docs/2026-10-08-en-ja-page-one-execution-plan.md §七 / docs/2026-09-29-gsc-seo-geo-quarter-review.md §2.2-2.3
```
