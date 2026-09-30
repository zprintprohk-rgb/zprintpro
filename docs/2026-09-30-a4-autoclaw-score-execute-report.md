# 2026-09-30 A4 批执行报告：autoclaw 方案评分 + T1-T5 落地

## 一、autoclaw 方案评分（总分 88/100）

| 维度 | 分 | 评语 |
|---|---|---|
| 数据判读 | 95 | 四类缺口分类（季节盲区/内链欠账/CTR/en 二词群）精准，全部数字引自 9/29 GSC 导出可复现；冻结区清单与实际 commit 历史核对一致（无重复动议） |
| 优先级排序 | 92 | T1 年賀状（10/1-11/10 窗口）+ T2 holiday cards（11 月截止）时序正确；T3 119 imps 已建页没收编 = 最低垂果实锤 |
| 方案完整性 | 78 | **缺项①**：无 category-seo-content 正文层 MOQ 审计——实际发现 greeting-cards 100 張/flyers 100 張/menus 100 張/posters 100 張/catalog-china 50 高报 37 处，比 title 层漏网更严重（客户可见 specs/FAQ/featuredSnippet）；**缺项②**：T5 食品包裝 desc 动作其实已在线（8/30 拍板版已有全部钩子），方案未核线上现状即开动作；**缺项③**：T4 未审计存量锚文本（sticker-guide 已有 2 条精确锚、calendar 已有 1 条 = 半达标，只有 ja doujin 0 条真欠账） |
| 纪律合规 | 95 | title 仅 3 处、全过门童设想、Rush 冻结区回避、§0.0 贺卡资产红线写明——但 T1/T2 本身在贺卡资产边界，方案未显式论证授权链（D1 (c) 已拍板解冻展示层精神） |
| 可执行性 | 90 | 验收标准量化（pos 17→10-12、0→有展示）；内链纪律（同锚 ≤3）具体 |

**总评：A-。** 数据与排序一流；缺口在「执行前线上/存量核查」这一步——本批已补齐（见下）。

## 二、本批执行清单（commit d47c1231）

### T1 年賀状印刷 2027（季节盲区 · 最紧急）✅
- ja greeting-cards title：『年賀状印刷 2027・10枚から・箔押し対応 DHL全国 | ZprintPro』——**57 当量满格过门童 #27**；GSC jp 年賀状词群 0 展示 = 纯增量盲区，窗口 10/1-11/10（kisetsubase.com 实证注文适期）
- ja keywords 补：年賀状印刷/2027年賀状/年賀はがき/お年賀カード/法人向け年賀状；ja desc 补「10月から受付・12月中旬到着プラン」
- ja FAQ +2：『年賀状印刷はいつから注文できますか?』（10月受付/早割/4週間前発注推奨）+『喪中の場合はどうすればいいですか?』（喪中はがき対応 = autoclaw 方案的「喪中はがき 除外」的正确实现：不引错误流量、用 FAQ 承接真需求）
- **§0.0 合规声明**：零触碰 6 个贺卡 SKU/301/资产字段，仅类目页 SEO 元数据 + FAQ（K3 9/12 解禁 + D1 (c) 拍板链内）

### T2 en Corporate Holiday Cards ✅
- en title：『Business & Holiday Card Printing from $0.50 | Corporate Christmas 10 MOQ | ZprintPro』
- en keywords 补 corporate holiday cards/business holiday cards/bulk holiday cards/company christmas cards/custom holiday cards（GSC us 簇 0 展示盲区；mailboxpower「November is the real deadline」窗口实证）
- en FAQ +2：企业 11 月中截止订购时效 + company Christmas logo 卡（10 MOQ/4h proof/$99 免运，全部真值口径）

### T3 china catalog printing 族收编（119 imps @17-19）✅
- 落地页 title 已含头词（方案「确认」动作 = 确认达标，唯一改动是 **50→10 MOQ 真值**，见下）
- 精确锚文本内链 ×2：catalog-printing-guide（锚 'China catalog printing service'）+ catalog-printing-china-supplier-guide（锚 'China catalog printing quote'），各 1 条同锚 ≤3 ✓

### T4 内链灌注 ✅（修正后范围）
- 审计发现：sticker-guide 已有精确锚『貼紙印刷』×2 ✓ 达标；calendar-printing-guide 已有『月曆印刷類目頁』✓ 达标；**ja 同人 2 篇 0 链接 = 真欠账**
- 补：doujin-circle-printing-guide（文末）+ comiket-printing-prep-guide（首屏）各 1 条 '/ja/category/japan-doujin/' 锚『コミケ 印刷』（GSC ja 161 imps @26.4 第一大词）
- 未覆盖：zh poster blog ×3/packaging blog ×4/CNY blog（方案全量）——审计存量后另批（本批先保 ja 最大词 + 已过窗口项）

### T5 CTR 抢救 ✅（核后精修）
- 食品包裝印刷 desc **线上已达标**（100個起/HK$1.5/FDA/FSC/免費3D打稿6小時全在，8/30 拍板版）——不动 = 守 churn 红线 ✓（方案动作①实为已完成态）
- a6 尺寸 84 imps @8.6：poster-size-guide **三语正文 A6 提及 = 0**（真盲区）→ 三语首屏注入 A6 quickAnswer（105×148mm/A5 一半/1 張起印 3-5 工作天——posters 真值口径）
- 大信封 @4.0：按方案观察不动 ✓

### 附带战果：内容层 MOQ 真值清毒（方案缺项，本批补）37 处
| 位置 | 旧 | 新 | 真值来源 |
|---|---|---|---|
| catalog-china 页（title/desc/hero/hammer/对比表/FAQ ×34） | 50 MOQ | 10 MOQ | products.ts catalog-printing=10 |
| catalog-china 内链卡 packaging | 50 個起 | 100 個起 | products.ts packaging=100 |
| greeting-cards zh h2/specs/FAQ + en specs/FAQ + ja h2/specs/FAQ | 100 張起印 | 10 張起印 | 贺卡 SKU=10 |
| flyers zh featuredSnippet/h2/正文/specs/FAQ + ja 同 ×5 | 100 張/枚起 | 10 | products.ts flyers=10 |
| menus zh/ja featuredSnippet/h2 | 100 張/枚起 | 10 | pvc-menus=10（B4 已修 en H1，内容层补齐） |
| posters zh featuredSnippet/h2 | 100 張起 | 1 張起 | products.ts posters=1 |

## 三、守卫与验证
- tsc 54=54 / brand A 类 0 / gsc-leak 0 / 门童 #27（ja title 57 当量过）/ #24（37 处清毒 = 漂移核销）
- 线上探针 8 项（`.hermes/verify-a4.json`）：T1/T2 title、T3 title+内链、A6 三语之 zh、ja doujin、flyers/greeting MOQ

## 四、遗留移交
1. T4 全量：zh poster blog ×3（海報印刷 160 @19.5）+ packaging blog ×4（包裝盒 61 @39.5）+ CNY blog（利是封 62 @23）存量锚审计+灌注
2. T6-T11 第二梯队：ja クラフト紙（ja 最大单一需求 111 @24-26）最优先
3. 需 K3 拍板：亞加力匙扣 52 imps（SKU 已下架）/車身廣告 57 imps（zh 无承接页）——维持 autoclaw 方案「不擅动」
4. zh greeting-cards title 65 当量 TRIM（存量超格）——冻结 2-4 周后 10 月批处理

**数据来源**：`GSC数据/` 9/29 导出 9 窗口（autoclaw 方案引用的 28d/7d/3mo 数字与其 fact-sheet 一致，本批逐一线上 curl 复核了 3 处现状）；MOQ 真值 `src/data/products.ts` minQuantity（catalog-printing=10 经 `.hermes/books-moq-truth.py` 同款脚本核）；季节窗口 kisetsubase.com/mailboxpower（autoclaw 方案引证，本批未独立复验——如实声明）；行业搜索量未获得（API 受限），全部判断基于 GSC 真实查询行为。
