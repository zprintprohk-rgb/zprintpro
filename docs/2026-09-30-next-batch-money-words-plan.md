# 2026-09-30 下一批带钱词排名作战方案（10 月上半 · 基于 9/29 GSC 导出批）

> 角色：首席 SEO/AEO/GEO 数据战略参谋 · 数据窗口：24h/7d/28d/3mo × 港/美/日/汇总（9/29 导出）+ 9/18 对比批
> 事实清单：`.hermes/geo/gsc-fact-sheet-2026-09-30.md`（全部数字可复现）
> 已执行冻结区（本方案不重复动）：小冊子印刷/骑马钉 books 三语头词、貼紙印刷/包裝盒訂製/海報印刷/學校印刷/證書印刷/名片页/教科書印刷 title 层、rush 双头 title、导航 4 字换词、MOQ 清毒、stickers 可变数据/白墨 quickAnswers —— 以上均为 9/29-9/30 A/B/D 批 + 深夜批已上线，title 一律冻结 2-4 周（churn 红线）。

## 数据来源

- GSC 导出：`GSC数据/香港站点28天数据…2026-09-29.xlsx`、美国/日本 28天+7天、三站点汇总 28天/7天/3个月（9/29 批）+ 9/18 对比批 4 文件
- 解析脚本：`.hermes/tmp/gsc_parse_20260930.py`（openpyxl，可复跑）
- 联网证据：kisetsubase.com（年賀状印刷注文 10〜11 月上旬）、mailboxpower.com（Business Holiday Cards 11 月为真实截止）+ Vistaprint/Greenvelope（11 月中前下单）
- 校准状态：已校准（本日解析）；行业搜索量数字未获得（不做编造），全部判断基于 GSC 真实查询行为 + 联网季节窗口证据

## 一、核心判读：两天 title 批之后的缺口在哪

9/29-9/30 两批把 zh-hk 头词层基本补齐。28 天数据揭示的剩余缺口按性质分四类：

1. **ja/en 盲区大词 + 季节窗口重叠**（最紧急）：年賀状印刷（jp，下单窗 10-11 月上旬）、corporate holiday cards（us，11 月截止）——两个词现在 0 承接头词，且窗口 10 月打开。
2. **title 已换、内链欠账**：貼紙印刷(188)/海報印刷(160)/月曆印刷(113)/包裝盒印刷(61)——头词就位但分类页缺精确锚文本内链灌注，pos 不动。
3. **已进页 1 却 0 点击的 CTR 问题**：食品包裝印刷 147 imps @7.7（0 clicks）、a6 尺寸 84 @8.6（0 clicks）、大信封 @4.0（0 clicks）——排名问题已解决，轮到 snippet 层。
4. **en 第二词群未收编**：china catalog printing 族三变体合计 119 imps 卡 17-19，有现成落地页没接内链。

## 二、第一梯队（本周执行 · 5 项）

### T1 ja 年賀状印刷 2027（季节窗 10/1-11/10，最紧急）

| 项 | 内容 |
|---|---|
| GSC 现状 | jp 28d「年賀状」词群 0 展示 = 盲区大词；greeting-cards ja title 现为「グリーティングカード印刷 · 10枚から · 立体 3D 対応」（线上实测 9/30） |
| 资产 | 5 个贺卡 SKU nameJa 已带「年賀状印刷」（products.ts 155/351/449/545/643 行）；类目页现成 |
| 动作 | ① ja greeting-cards 类目 title 改「年賀状印刷 2027・10枚から・箔押し/スタンプ押印 | ZprintPro」式（过 title-v5-guard）；② H1 + keywords 补 年賀状印刷/2027 年賀状/喪中はがき 除外；③ 转化块加 quickAnswer「年賀状印刷はいつから？10月から注文受付、12月中旬までに到着する配送プランあり」（年份按 2027 实际口径写） |
| 验收 | 线上 curl title 三查 + 下轮 GSC 年賀状词群 0→有展示 |
| 证据 | kisetsubase.com：印刷の注文は10〜11月上旬が適期 |

### T2 en Corporate Holiday Cards（11 月截止，10 月上旬必须就位）

| 项 | 内容 |
|---|---|
| GSC 现状 | us greeting-cards 簇 28d 0 展示 = 盲区；en 无 holiday cards 承接头词 |
| 资产 | greeting-cards 类目页 + foil/spot-uv/matte/rounded SKU（原名片资产，已部署） |
| 动作 | ① en greeting-cards title/H1 头词改「Business & Holiday Card Printing」方向（执行前先 curl 核 title 现状，再过门童 #27）；② keywords 补 corporate holiday cards/business holiday cards/bulk holiday cards/company christmas cards；③ 转化块 quickAnswer：企业订购量级 + 11 月中截止提示 + DHL 时效 |
| 验收 | 线上 title 探针 + 下轮 GSC holiday cards 词群 0→有展示 |
| 证据 | mailboxpower「November is the real deadline」/ Vistaprint「order in November」/ Greenvelope「by mid-November」 |

### T3 en china catalog printing 族收编（119 imps 卡 17-19）

| 项 | 内容 |
|---|---|
| GSC 现状 | china catalog printing 63 @17.4 + catalog printing china 32 @18.9 + catalogue printing china 24 @18.8（us 28d，0 clicks） |
| 资产 | `catalog-printing-china/page.tsx` 落地页已存在 |
| 动作 | ① 该页 title/H1 确认含「China Catalog Printing」头词（先读现状）；② catalog-printing-china-supplier-guide 等 3 篇 en blog 以精确锚文本回链该页（每篇 1-2 条，勿重复锚文本 >3）；③ 页内补 printing china 供应商对比表（已有则复核） |
| 验收 | 内链 ≥3 条 + 下轮 GSC 该族 pos 17→10-12 |
| 备注 | us 站仅次于 saddle stitch 的第二大未收编词群 |

### T4 内链锚文本灌注批（zh 簇总欠账，一次脚本化执行）

| 目标分类页 | 灌注锚文本 | 来源资产 | GSC 依据（28d） |
|---|---|---|---|
| /zh-hk/category/stickers/ | 貼紙印刷（精确） | sticker-guide pillar + 貼紙系 blog | 貼紙印刷 188 @24.8 0 clicks |
| /zh-hk/category/posters/ | 海報印刷 | 3 篇 poster blog + poster-size-guide | 海報印刷 160 @19.5 + 印海報 135 @20.4 |
| /zh-hk/category/calendars/ | 月曆印刷 / 月曆訂製 | calendar guide blog 群 | 月曆印刷 113 @19.4 + 訂製变体 151 |
| /zh-hk/category/packaging/ | 包裝盒訂製 / 包裝盒印刷 | 4 篇 packaging blog | 包裝盒印刷 61 @39.5（B1 title 已改，内链未灌） |
| /zh-hk/category/red-packets/ | 利是封印刷 | CNY 语境 blog | 利是封印刷 62 @23 + 訂製变体 54 |
| /ja/category/japan-doujin/ | コミケ 印刷 | 同人 blog 群 | コミケ 印刷 161 @26.4（D3 title 已动，SKU 不碰） |

纪律：每页 ≥5 条精确锚文本；同一 pillar 同锚 ≤3；不碰冻结 title；MOQ 全部走真值 10 口径。

### T5 CTR 抢救（已页 1 却 0 点击 — snippet 层）

| 词 | 现状 | 动作 | 红线 |
|---|---|---|---|
| 食品包裝印刷 | 147 imps @7.7，0 clicks | title 不动（8/30 K3 拍板版 + churn）；meta description 强化数字钩子（100個起/HK$4起/FDA 食品級）+ 确认 FAQPage schema 在位 | 不改 title |
| a6 尺寸 | 84 @8.6，0 clicks | poster-size-guide blog 首屏 quickAnswer 补「A6 尺寸 = 105×148mm」直接答案 + 表格已核 | blog 层 |
| 大信封 | @4.0，0 clicks | 观察 7d（点击可能未回填）；下轮 GSC 复核再动 | 不动 |

## 三、第二梯队（两周内 · 择机执行）

| # | 词/簇 | GSC | 动作 |
|---|---|---|---|
| T6 | ja クラフト紙 パッケージ印刷（两变体 111 @24-26，3mo 196 = ja 最大单一需求） | jp28 | ja packaging 转化块加牛皮纸 quickAnswer（環境配慮/クラフト紙 100個から）+ 内链 |
| T7 | zh 書刊印刷 88 @35.5 + 印書 48（hk 小册子簇第一词） | hk28 | books zh keywords 补 書刊印刷/印書（title 57 当量已满不动）；9/30 头词改的是 小冊子印刷（61 @10.26 临门一脚），書刊印刷由 keywords+内链承接 |
| T8 | en small batch label printing 57 @28.4 | us28 | stickers en 转化块 label printing quickAnswer + en label 系内链 |
| T9 | en calendar sizes 规格词群 61 imps @36-43 | us28 | en calendar 规格答案（blog 或类目 FAQ 承接，AEO 型不建页） |
| T10 | ja PVCシールとは 定义词群 39 imps | jp28 | stickers ja 转化块「PVCシールとは」quickAnswer（AEO） |
| T11 | 香港印刷公司/香港印刷 ~140 @23-26 | hk3mo | 地域 B2B 大词，观察窗：无独立承接页不建（避薄页），由 about/首页自然承接，下轮复核 |

## 四、需 K3 拍板（不擅动）

1. **亞加力匙扣訂製 52 imps @深水**（hk28「其他」簇 Top3）：acrylic-keychain/can-badge 9/22-23 已下架，有真实需求无 SKU。是否恢复上架或以「同人周邊」承接（D3 延伸项）。
2. **車身廣告 57 imps @35**：zh 无承接页（vehicle-wraps 仅 en）。建 zh 页 or 挂 stickers/banner 下，需拍板（§11 主营架构外品类）。

## 五、首页冲刺目标表（下轮 GSC 导出验证）

| 词 | 当前 pos(28d) | 4 周目标 |
|---|---|---|
| 食品包裝印刷 | 7.7 | 守页 1 + CTR 0→>2% |
| 小冊子印刷 | 10.2 | 前 5 |
| 紙袋印刷 | 12.3 | 前 10 |
| 海報印刷 | 19.5 | 前 10 |
| 月曆印刷 | 19.4 | 前 10（Q4 窗口内） |
| 貼紙印刷 | 24.8 | 前 15 |
| china catalog printing（en） | 17.4 | 前 10 |
| コミケ 印刷 | 26.4 | 前 15 |
| 即日印刷 | 8.73(28d) | 稳态前 5（承接上批目标） |
| 年賀状印刷（ja） | 0 展示 | 窗口内出现展示 |
| corporate holiday cards（en） | 0 展示 | 窗口内出现展示 |

## 六、执行边界与守卫

- title 改动仅 T1/T2/T3 三处新头部词，全部过 `node scripts/guards/title-v5-guard.js`（50-57 当量，58 阻断）
- 内链批（T4）不碰任何 title；Rush* 8 组件冻结区零触碰；greeting-cards 资产不动（名片页窄豁免路径除外）
- MOQ 一律 products.ts 真值（10 口径）；禁编造行业数字（§0.23）；GSC 黑话不入客户可见内容（§0.23.1）
- 攒批执行：T1+T2+T3+T4+T5 合并 1 commit 1 push（§0.25.9 攒批阈值达成：多文件 src 行为改动）
