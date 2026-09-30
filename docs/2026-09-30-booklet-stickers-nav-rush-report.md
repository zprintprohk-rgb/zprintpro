# 2026-09-30 深夜作战批报告：小册子头词 + stickers AEO + 导航 4 字换词 + 即日急件簇

## 一、小册子印刷簇（booklet money-word）裁决与执行

**GSC 证据**（`.hermes/gsc-2026-09-30-newwords-cluster.json`，9 窗口）：

| 词 | 窗口 | imps | pos | 判读 |
|---|---|---|---|---|
| 小冊子印刷 | hk-3mo | 61 | 10.26 | zh 第一量词，卡页二顶（28d 53 @10.15 稳定） |
| 小冊子 印刷 | hk-3mo | 17 | 10.24 | 同簇 |
| saddle stitch booklet | us-3mo | 95 | 69.52 | en 裸名词深水，**同卷 printing 变体 95 @3.43 首页** = 承接页错配 |
| saddle stitch booklets | us-3mo | 89 | 83.64 | 复数变体同深水 |
| 冊子印刷/中綴じ | jp-3mo | — | pos 1-7 | ja 已首页，不动 |

**执行**：
- seo.ts books 三语 title/keywords/description：zh 头词前置『小冊子印刷 10本起・騎馬釘/膠裝/精裝 教材繪本急印 | 智印港』（57 当量 OK）；en 改『Saddle Stitch Booklet Printing from $1.20 | 10 MOQ + Free Proof | ZprintPro』（裸名词+printing 一次覆盖三变体）；zh keywords 补 小冊子印刷/小冊子 印刷/小冊子/冊子印刷；en keywords 补 saddle stitch booklet printing 精确词
- H1 zh：『香港小冊子印刷 — …』（原『香港騎馬釘小冊子印刷』让位头词）
- 显示名对齐：products.ts/breadcrumb-names/nameMap → 小冊子・書刊印刷 / Booklet Printing / 冊子印刷
- books 转化块 zh/en/ja **MOQ 清毒 30+ 处**：五款書刊真值全部=10（products.ts minQuantity 脚本核实），存量块写 100 本/50-copy/100冊 = 高报 10 倍接單風險 → 全部 10 口径；en title 顺带 50 MOQ→10 MOQ + 头词双修复
- 遗留：BK SKU body 3 处（100 本起印/50 copies/100冊から）在 sku-seo-data.ts 派生文件，已登记漂移队列，SOP-5 移交 CSV 源头批

## 二、可变数据贴纸 / 流水码贴纸 / 白墨印刷（AEO/GEO 层）

**GSC 证据**：三词四窗口 × 三站点 **0 imps** = 能力词非搜索词，**不建独立页**（建站无搜索收益）。

**能力真实性（§0.23 核查通过）**：白墨=真能力（透明贴 SKU『可選白墨打底』、UV 噴墨 CMYK+白墨、银卡盒印白墨）；可变数据/流水码=真能力（HP Indigo 1 枚から可変データ、Excel/CSV 入稿、連番 1-10,000、security stickers 序列化 QR）。

**执行**（AEO 答案层注入 stickers 转化块三语，每语 +2 条 quickAnswer）：
- zh：可變數據貼紙/流水碼貼紙（10 張起印、Excel/CSV、免費數據檢查）+ 白墨打底三選效果（全/局部/無）
- en：variable data / running code / serial numbers + white ink underbase（full/partial/none）
- ja：可変データシール・連番シール + 白インキ（全面/部分/無）

**同批顺手**：stickers en/ja 块 MOQ 清毒（100 pcs/100枚→10，zh 块 9/29 已修，本次补齐 newFaqs 漏网 5 处）；menus zh 比較表 4 行 100→10（menus 真值=10）；breadcrumb『傳單印刷印刷攻略』叠字修复。

## 三、导航栏 4 字换词（K3 指令：导航只能 4 字，不能有 6 字）

**根因**：导航用 Header.tsx 独立映射表（products.ts 改名不传导——昨日改名盲区）。

| 位置 | 旧 | 新 | 依据 |
|---|---|---|---|
| Header/Footer/MobileEntry zh | 校園印刷 | **學校印刷** | A3.2 裁决（學校印刷 70 imps；校園教育印刷/校園印刷 全 0） |
| Header/Footer/MobileEntry zh | 傳單印刷 | **宣傳單張** | 宣傳單張 51 imps vs 傳單 17（hk-3mo）+ K3 点名 |
| Header zh | 包裝盒印刷 | **包裝盒訂製** | 昨日数据对齐词（5 字≤6 上限） |
| Header en | Educational | **School Printing** | school exercise book printing 12 @7.33 首页 |
| Header ja | 教育印刷 | **教科書印刷** | 教科書印刷 118 imps（jp-3mo） |
| Header 下拉 SKU 建议 | A4傳單印刷/即日傳單印刷/校園傳單 | A4宣傳單張/即日宣傳單張/學校傳單 | 词面统一 |
| 全站组件 14 文件 | 傳單印刷 ×22 处 | 宣傳單張 | Hero/Search/FactoryTrust/CompareTable/RushGrid/RushFAQ/quote-widget/blog tabs/services 页/PDP 推荐/guide 正文 |

## 四、即日急件簇（rush 服务页作战）

**GSC 证据**（`.hermes/gsc-2026-09-30-rush-cluster.json`）：

| 词 | 3mo | pos | 28d | pos | 判读 |
|---|---|---|---|---|---|
| 即日印刷 | 131 imps, 4 clicks | 11.63 | 55 | **8.73** | **第一量词，28d 已入页一首位** |
| 即日急件 | 76 | 16.93 | 42 | 15.12 | 第二词，页二顶 |
| 特急快印 | 36 | 31.28 | 35 | 31.8 | 第三词深水 |
| 急件 | 8 | 8.75 | — | — | 已在首页 |
| en: same day flyer 族 | us-3mo 43 imps | 12-53 | — | — | 量小意图强 |
| ja: チラシ印刷 即日 | jp-3mo | ~30 | — | — | 量小 |

**执行**（rush-printing-delivery/page.tsx metaMap 三语，**组件层 Rush* 8 组件冻结不碰**）：
- zh title：『即日印刷・即日急件｜18:00 截單・翌日 12:00 送到 | 智印港』（56 当量）——双头大词并入 title，原『順豐』让位（desc 保留）
- zh keywords 补 特急快印；desc 补 即日急件/宣傳單張词面
- en title：『Same-Day & Rush Printing | Order by 6pm, Next-Day 12pm | ZprintPro』；keywords 补 overnight flyer printing / 24 hour printing / next day leaflets
- ja title：『即日印刷・特急印刷 激安・DHL全国・翌日届 10枚〜 | ZprintPro』；keywords 补 チラシ印刷 即日
- 页内内链 傳單印刷→宣傳單張

**首页目标**：即日印刷 28d 已 8.73（页一首位），3mo 均值 11.63 滞后 2-4 周回追，预期稳态前 5；即日急件 16.9→10 内；特急快印 31→20 区间。下轮 GSC 导出验证。

## 五、守卫与线上验证

- title-equiv：zh books 57 OK / rush 56 OK；tsc 54=54；brand A 类 0；gsc-leak 0
- 门童 #24 MOQ 级联（commit 时）：books/stickers/menus 高报清毒后**新漂移 0**（修复即核销存量）
- 线上探针：books 三语 title/H1/breadcrumb、rush zh title、导航學校印刷/宣傳單張、stickers 可变数据 quickAnswer

**数据来源**：GSC 导出 9 窗口（24h 汇总 9/29 00:03 · 7d/28d/3mo 三站汇总 · 港/美/日分站）→ `.hermes/gsc-2026-09-30-newwords-cluster.json` + `rush-cluster-2026-09-30.json`；MOQ 真值 `src/data/products.ts` minQuantity（books-moq-truth.py 脚本输出：5 款書刊全部=10）； flyer 词量 hk-3mo 导出（宣傳單張 51/傳單 17，昨日分类对齐批）；联网搜索量数据因 API 额度受限未获得，全部裁决基于 GSC 真实查询行为。
