# 2026-10-09 三站点 SEO/AEO/GEO 深度盘点与首页提升执行方案

> 角色：ZprintPro 首席 SEO/AEO/GEO 数据战略参谋
> 数据基座：GSC 2026-10-09 导出 12 文件（今日 02:03-02:08 落盘）vs 2026-10-05 同窗口 vs 2026-09-29 趋势窗，openpyxl 逐文件复算（脚本 `.hermes/tmp/gsc_compare_20261009.py` 可复跑）
> 前序文档：`docs/2026-10-08-en-ja-page-one-execution-plan.md`（四梯队+三层杠杆）、`docs/2026-10-06-en-ja-sku-keywords-expansion-plan.md`（B1/B2 已全量落地）、千问 3.8max《全站三语言飞轮提升总指令 v2.0》（附件，本报告 §六 对齐其 P0-P3 框架）
> 本批执行：commit `e6254bab` 已推送（P0 攒批 1 push）

---

## 一、站点总量（图表合计，28d 窗）

| 站点 | 09-29 档 | 10-05 档 | 10-09 档 | 判读 |
|---|---|---|---|---|
| us | 32clk/4,125imp | 33/3,943 | **36/3,802** | 展示缓降、点击三连升——CTR 改善中 |
| jp | 36/1,922 | 34/2,036 | **32/2,023** | 横盘，点击微降 |
| hk | 266/10,968 | 282/10,491 | **290/10,563** | 点击稳步上行；7d 点击 70→86→**88** 三连升 |

**结论**：hk 站是增长引擎（Q4 季节簇 + 内容飞轮共振）；us 站展示收窄但质量提升；jp 站需要新钩子（料金表/年賀状）。

## 二、验证矩阵早读（10-08 方案锚点，28d：10-05 → 10-09）

### en（us 站）
| 词 | 基线 | 10-09 | 判定 |
|---|---|---|---|
| doujinshi printing | 12.3 | **11.2**（38im，c1） | ✅ 进前 10 在轨（今日 L1-1 精确锚已补） |
| china catalog printing | 17.4 | 17.7（53im） | ⏸ 持平；变体 catalog printing china 21.4→26.7 📉 分化，词序变体被重新归并，观察 |
| large envelopes | 14.0 | **13.8**（imps 15→19） | ✅ 在轨（今日 E1 envelopes:en 块上线） |
| saddle stitch booklet printing | 4.1 | 4.2（104im，c2） | ✅ churn 组回稳纪律兑现 |
| small batch sticker(s) printing | 5.7/5.9 | 5.6/5.8（99im，**c0**） | ⚠️ CTR 断裂依旧——今日 E3 价格钩子已上，下轮看 c 值 |
| small batch label printing | 26.6 | **29.0** 📉 | ❌ 回落，深-1 批（labels quickAnswers）提前到 P1 |
| calendar sizes 双词 | 43.5/38.0 | 44.4/38.3 | ⏸ A5 FAQ 未撬动，10/12 目标 ≤35 大概率 miss，转 P3 内容层 |
| corporate/business/custom holiday cards | 0 展示 | **0 展示** | 🚩 盲开未破零（见 §四 红旗 1） |
| evaluate the printing services company | 4im@3.0 | 掉出窗口 | GEO 对比表今日已上（长线资产，不追单窗） |

### ja（jp 站）
| 词 | 基线 | 10-09 | 判定 |
|---|---|---|---|
| コミケ 印刷 | 23.5（185im） | **20.8**（175im）；7d 13.3→24.5 | 28d 改善但 7d 回落=Comiket 季后退潮，今日 L1-3 清单段防守 |
| クラフト紙 パッケージ 双变体 | 23.8-24.4（106im） | 24.0/24.4；7d 15.5→21.4 | ⏸ A5 FAQ 效应回落，今日 W2.2 料金表 FAQ 补上第二钩子 |
| 年賀状印刷 / 2027年賀状 | 0 展示 | **0 展示** | 🚩🚩 最高红旗（见 §四 红旗 1），早割窗 10/31 倒计时 |
| 卒業アルバム 印刷 | 67.7 | 66.1 | ⏸ 深水横盘，季节蓄水期（Q4→3 月）维持不动 |
| 教科書 印刷 | 28.8 | **34.6** 📉 | churn 组恶化中——10/19 仍 ≥30 即启动诊断（纪律已立） |
| 特急印刷 激安 | 16.1（c0） | 16.1（c0） | ⏸ 今日 E4 flyers:ja 特急料金 FAQ ×2 已上 |
| 社名入りカレンダー 少量注文 | 8.2 | 8.7 | ✅ 页 1 守住 |

### zh-hk（K3 16 大词 + 季节簇）
| 词 | 28d 10-05→10-09 | 判定 |
|---|---|---|
| 即日印刷 | 8.2→8.4（c2）+ 急件印刷 7.0（c2，imps 2→7） | ✅ rush 簇双词带点击上行 |
| 紙袋印刷 / 紙袋訂製 / 訂做紙袋 | 8.3 / 14.4 / 14.1 | ✅ 全簇页 1-2 顶，Q4 季节主力 |
| 食品包裝印刷 | 9.7（117im） | ✅ 页 1 稳 |
| 喜帖印刷 | 21.6→**18.8** | ✅ 持续上行 |
| 易拉架印刷 | 48.4→**44.3**（📈+4.1，7d 38.0） | ✅ A6 FAQ 生效 |
| 學校印刷 | 41.1→**37.9**（7d 27.3） | ✅ 目标 20 在轨 |
| 海報印刷 | 16.1（180im，c2）；7d 12.8→**18.9** 📉 | ⚠️ 7d 回落，10/12 前 10 目标有险 |
| 貼紙訂製 | 27.7→31.2 📉 | ⚠️ 回落，列入下轮 |
| 宣傳單張 / 宣傳單張印刷 | 30.2/23.9；7d 16.1/22.4 | ⏸ +22 暴涨后正常回摆，锚文挂账（FIX-1）仍待 K3 |
| 聖誕卡/賀卡/卡片印刷 | 0 展示 | 季节未到，W9 窗 10/21 启动 |

## 三、断点诊断更新（10-08 三断点 → 今日状态）

1. **CTR 断裂**：small batch sticker 99im c0 未愈——今日已下第一刀（E3 价格前置）。若 10/12 仍 c0，下一刀 = meta description 价格钩子 + Product schema price 呈现复核。
2. **页二→页一最后一公里**：doujinshi（11.2）与 large envelopes（13.8）在轨；china catalog 簇（17-27）词序变体分化，需观察 Google 归并方向再定 title 层动作（P2）。
3. **GEO 引用流**：今日 en 对比事实表上线（ZprintPro vs MOO vs Vistaprint，moo.com/vistaprint.com 官方页 2026-10 取证，事实比较不贬损）——三平台引用源仅 11% 重叠，此为 Google AI Overview / Perplexity 双栖资产。

## 四、红旗与对策

### 🚩 红旗 1：年賀状 / holiday cards 盲开双站 0 展示（最高优先级）
- 事实：A4 批 title + 类目 FAQ 上线已 7-14 天，en（corporate/business/custom holiday cards）与 ja（年賀状印刷/2027年賀状）**全零展示**。
- 诊断：title/FAQ 层词面不足以让 Google 为季节词建立查询关联——**缺 body 内容层锚点**（类目页正文、SKU 描述、blog 均未显性承接「年賀状」「holiday cards」实体）。
- 对策（P1，本周内）：① ja greeting-cards 类目 quickAnswer/body 补「年賀状印刷はいつから？11月が本番・早割は10月末までが目安」段（来源：グラフィック/mynavi 既有调研口径，标注复核日）；② en greeting-cards body 补 corporate holiday cards 段；③ W9 聖誕卡 blog（B7 queue 10/21 窗）提前评估是否前置到 10/14——**季节窗不等人，建议 K3 裁决是否破 queue 提前**。

### 🚩 红旗 2：教科書 印刷 churn 恶化（28.8→34.6）
- 纪律已立：10/19 仍 ≥30 启动诊断。当前零动作（title 冻结），B2 textbooks ja kw 已注入待生效。

### ⚠️ 观察：small batch label printing（29.0）/ 貼紙訂製（31.2）/ 海報印刷 7d（18.9）
- 均列入 P1 深-1 批：labels 簇 quickAnswers、sticker-guide 锚文、poster blog 锚文复核。

## 五、本批已执行（commit e6254bab，2026-10-09 02:5x 推送）

| # | 动作 | 内容 |
|---|---|---|
| E1 | envelopes:en + envelopes:ja 转化块（全站唯一双缺类目补齐） | 价格前置 quickAnswers×3 + 4 型对比表 + socialProof，全走 products.ts 真值 |
| E3 | stickers:en 首条答案卡加价格钩子 | MOQ 10 + from US$0.55 + 1-2 天交付（真值） |
| E4 | flyers:ja 特急/即日料金 FAQ ×2 | ¥6〜/+50% 特急，AI 見積 30 秒（10/8 会话产出，本批收编） |
| L1-1 | doujinshi printing 精确锚 | saddle-stitch-booklet-printing-guide 用例段 +1 条 → SKU |
| L1-2 | catalog-china 成本拆解表 ×3 locale | 4 因子（数量/頁數/紙張/裝訂），数字与本页实价表同源（10/8 会话产出，本批收编） |
| L1-3 | japan-doujin コミケ時短チェックリスト段 | buyingGuide +1 段（10/8 会话产出，本批收编） |
| W2.2 | ja packaging 料金表 FAQ | DELIVERY 代码包原样落地（8 SKU 真值，tuck-end 无真值不入表） |
| GEO 首单 | ZprintPro vs MOO vs Vistaprint 事实对比表 | hong-kong-printing-guide（US Market 条目）新 H3 段：BLUF 结论 + 5 维事实表 + 来源注（moo.com 50 张 $23 起 / vistaprint.com 50-10,000 张，2026-10 查验） |
| 门检 | tsc 54=54 / brand A 类 0 / encoding PASS / bc-scan 报告式 0 阻断 / GSC 黑话 0 命中 | 攒批 1 push |

## 六、后续排期（对齐千问 v2.0 P0-P3 框架 + 本仓 10-08 方案）

| 窗口 | 动作 | 门槛 |
|---|---|---|
| **P1 = 10/9-10/12** | 红旗 1 年賀状/holiday cards 内容层双站修复；深-1：labels 簇 quickAnswers + food packaging FAQ；千问 P0 技术底座复核（hreflang 三向对称 / Organization sameAs——历史批次已建，本次复核即可） | 零 title 改动；攒批 1 push |
| **10/12** | GSC 新档导出 → 验证矩阵终判（本报告 §二为早读基线）→ churn 组解冻裁决 → GAP 扫描（money-kw-mine 复跑） | 数据驱动 |
| **P2 = 10/13-19** | title 批（仅当无回撤证据）：W2.1 wholesale saddle stitch（57 当量候选已备）/ W2.3 same day flyers（55）/ E2 transparent-stickers 价格钩子 / 存量 TRIM 收编（catalog-china 77→56、rush en 66→55、rush ja 59） | 门童 #27 逐条过 |
| **P3 = 10/20-31** | 年賀状/聖誕卡内容冲刺（11 月窗）+ 深-2/深-3 + ja 料金表页独立化评估（raksul 构式） | — |

### 待 K3 裁决（不擅自执行）
1. **§0.0 名片展示层 (a)/(b)/(c) 选项**——接单层已解禁，展示层维持现状待裁决。
2. **W9 聖誕卡 blog 是否破 queue 提前**（红旗 1 对策③）。
3. **FIX-3 footer 实体地址口径**（香港新蒲崗 vs 深圳实体，10-06 gsc-feedback 上报，法务/NAP 层）。
4. **FIX-1/FIX-2 锚文回补挂账**（宣傳單張 2→≥3、包裝盒訂製 2→≥3，挂账第 2 轮）。

## 七、数据来源（§0.23 强制行）

```
数据来源:
- GSC数据/ 2026-10-09 批 ×12 xlsx（02:03-02:08 落盘）vs 2026-10-05 批 ×12 vs 2026-09-29 批
  解析: .hermes/tmp/gsc_compare_20261009.py（openpyxl 逐文件复算，查询表+图表合计）
- 验证矩阵锚点: docs/2026-10-08-en-ja-page-one-execution-plan.md §七 / docs/2026-10-07-en-ja-page-one-strategy.md §三
- 价格/MOQ 真值: src/data/products.ts（small-batch-stickers basePrice_en=0.55、minQuantity=10；packaging 8 SKU 料金真值 per DELIVERY/2026-10-12-money-kw-package.md §2.2）
- 竞品事实: moo.com/us/business-cards（50 cards from $23.00）、vistaprint.com/business-cards/standard（50-10,000 张）——2026-10-09 WebSearch 取证
- 执行实况: git log e6254bab（本批）/ 30a60554 / dcd371d0 / b6956399 / 7b592897
- 千问 3.8max 总指令 v2.0（附件 ZprintPro 全站三语言 SEOA.txt）——P0-P3 框架与本地术语对照表已并入本方案
```
