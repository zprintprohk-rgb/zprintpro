# W4 AI 引用基线探针 — 首日 Baseline（2026-09-30）

> 任务: W4 AI 引用基线探针（首日 baseline）· zprintpro 项目 · 仅内部文件（.hermes/geo/，per §0.23.1 GSC/探针后台数据禁入客户可见内容）
> W3 上下文（未重新验证，仅引用结论）: zprintpro.com sameAs 空、Organization 信号弱 → 探针低命中为预期基线。来源: `.hermes/geo/w3-technical-audit-2026-09-30.md`

数据来源:
- 工具: AutoClaw `source_check`（多 provider 聚合检索, provider=`auto`; **perplexity provider 不可用——API key 缺失，错误原文 "Perplexity API key not found"，未重试**），每次调用返回带序引用列表（本工具返回「按序引用源列表」而非合成答案段落，参数从引用标题/摘要中提取）
- 会话时间窗: 2026-09-30 00:21:35 +08:00（开始）→ 2026-09-30 00:30:33 +08:00（收尾），host 时钟 = PowerShell `Get-Date`；单 probe 未逐条计时，按执行顺序推算（下表标注 ~ 为约值）
- 16 次 probe 调用 responseId（可复核）: P1r1 mumvx5ez7q0h06 / P2r1 mumvxeleaj5i39 / P3r1 mumvxhif6ny73v / P4r1 mumvxs7fjx4mw1 / P5r1 mumvxtsetxzq59 / P6r1 mumvxwb3wtytku / P7r1 mumvyla6whhbnv / P8r1 mumvymp3wjk2jp；复算 r2: P4 mumw1jd183vpne / P2 mumw1k3rz446wq / P7 mumw1l6qezqwg2 / P5 mumw3avs9nhw5c / P6 mumw3bquq3b3x8 / P1 mumw4adne2pym0 / P3 mumw4b6ektus07 / P8 mumw4bwnyk0jgg
- 双方法复算（§0.23.2）: **8/8 probe 全部复算两次**，命中项位次逐条一致（P4 旧域 #6/#7、P5 #6、P6 #6 两次完全吻合）；P7 复算列表组成有差异（run2 新增 raksul.com #4、orilab.jp #9，其余为 run1 前 10 截断），但 zprintpro 结论不变
- 校准状态: 已校准（本文件即原始探针记录，2026-09-30 00:30 +08:00）

---

## 一、总览

| # | Probe（原文 verbatim） | Locale | zprintpro 被引用? | 位置 | 复算一致? |
|---|---|---|---|---|---|
| 1 | best custom packaging boxes supplier for small business 2026 | en | ❌ 未出现在引用中 | — | ✅ 两次均未出现 |
| 2 | custom stickers printing low MOQ free shipping | en | ❌ 未出现在引用中 | — | ✅ 两次均未出现 |
| 3 | booklet printing services for small business | en | ❌ 未出现在引用中 | — | ✅ 两次均未出现 |
| 4 | 包裝盒訂製 香港邊間好 | zh-hk | ✅ **被引用** | r1: 旧域 z-printpro.com **#6 #7** + 新域 zprintpro.com **#14 #17**；r2: 旧域 **#6 #7** | ✅ 位次一致 |
| 5 | 貼紙印刷 小批量 快交貨 | zh-hk | ✅ **被引用** | r1: **#6**（rush 服务页）+ **#20**（主页）；r2: **#6** | ✅ 位次一致 |
| 6 | 月曆印刷 訂製 2027 | zh-hk | ✅ **被引用** | r1: **#6**（custom-calendars PDP）+ **#11**（category 页）+ **#17**（desk-calendars PDP）；r2: **#6** | ✅ 位次一致 |
| 7 | ステッカー印刷 小ロット おすすめ | ja | ❌ 未出现在引用中 | — | ✅ 两次均未出现（r2 列表组成有差异，zprintpro 两次皆缺） |
| 8 | カレンダー印刷 ノベルティ 注文 | ja | ❌ 未出现在引用中 | — | ✅ 两次均未出现 |

**命中率: 3/8（37.5%）** · 分 locale: zh-hk **3/3** · en **0/3** · ja **0/2**

**与 W3 结论互证**: 命中全部集中在 zh-hk（带参数密度的品类/产品页被引用），en/ja 全部零命中——与「sameAs 空、Organization 信号弱」的 W3 审计结论一致，低命中为真实基线而非探测方法偏差。

**重要旁证（hygiene 线索）**: Probe 4 中被引用的 zprintpro 产品页是 **旧域 z-printpro.com**（2 处，/products/packaging-box-printing/... 路径），与 §0.30 记录的「~2026-07-15 已完成 301 迁移」并存——旧域 URL 仍在被引用索引中作为独立页面出现，实体信号被新旧双域分摊（见缺口 2）。

---

## 二、逐 probe 明细（引用源按序 · 全量转写）

### Probe 1 · "best custom packaging boxes supplier for small business 2026"（en）
- zprintpro.com: **未出现在引用中**（两次均未出现）
- 引用源 run1（14 条，~00:22）: 1 centpackaging.com · 2 tealpackaging.com/best-custom-packaging-companies-small-business/ · 3 growthmarketingpro.com/11-best-companies-for-custom-boxes-and-packaging/（榜单文）· 4 cubitpackaging.com/custom-boxes · 5 packlane.com · 6 printnpackage.com · 7 packagingship.com · 8 discountedpackaging.com · 9 packings.co · 10 boxgenie.com/pages/small-business-packaging-solutions · 11 cubitpackaging.com/blog/best-custom-packaging-companies-2025 · 12 apexiopackaging.com/custom-mailer-boxes/ · 13 tealpackaging.com/custom-folding-carton-boxes/ · 14 kreativepackaging.com/custom-boxes/
- 复算 run2（10 条）: = run1 前 10，顺序一致
- 竞品 Top5（两次合计频次）: tealpackaging.com 3 · cubitpackaging.com 3 · centpackaging.com 2 · growthmarketingpro.com 2（榜单聚合文）· packlane.com 2
- 参数（从引用标题提取）: `from $0.35`（cubitpackaging）· `No Minimum Order, Free Shipping`（packagingship）· `Zero MOQ & Free US Shipping`（apexiopackaging）· `[2026]` 年份钩子（growthmarketingpro/cubit）
- 竞争格局: 美国本土包装商 + 榜单文（growthmarketingpro/cubit blog）占位；无跨洲工厂型玩家被引用

### Probe 2 · "custom stickers printing low MOQ free shipping"（en）
- zprintpro.com: **未出现在引用中**（两次均未出现）
- 引用源 run1（17 条，~00:24）: 1 printful.com/custom-stickers · 2 stickerkiko.com/products/die-cut-stickers · 3 printify.com/custom-stickers/ · 4 stickermule.com/custom-stickers · 5 youstickers.com/product/sticker-maker/ · 6 stickerine.com/custom-stickers · 7 printsticker.com · 8 stickerobot.com/products/sticker-maker/ · 9 makestickers.com/products/custom-stickers · 10 customstickers.com · 11 stickerkiko.com/ · 12 stickermint.com/products/custom-stickers · 13 apexiopackaging.com/custom-design-stickers/ · 14 youstickers.com/ · 15 stickerkiko.com/products/sticker-sheets · 16 makestickers.com/products/print-custom-stickers · 17 standoutstickers.com/order/custom-stickers/vinyl
- 复算 run2（10 条）: = run1 前 10，顺序一致
- 竞品 Top5: stickerkiko.com 4 · youstickers.com 3 · makestickers.com 3 · printful.com 2 · stickermule.com 2
- 参数: `No Minimum`（stickerkiko ×2）· `from $0.06/ea`（stickerine）· `Free Shipping`（stickermule/makestickers/customstickers/stickermint）· `Since 2009`（standoutstickers）
- 竞争格局: Printful/Printify/StickerMule 三大平台 + 长尾专业站；winning citation 全部在标题前置 MOQ/免邮参数

### Probe 3 · "booklet printing services for small business"（en）
- zprintpro.com: **未出现在引用中**（两次均未出现）
- 引用源 run1（15 条，~00:24）: 1 businessprinting.com/booklets/ · 2 canva.com/booklets/ · 3 mimeo.com/lp/booklet-printing/ · 4 printmagic.com/booklet-printing/ · 5 smartpress.com/shop/custom-booklets · 6 officedepot.com/b/booklets/N-1212284 · 7 uprinting.com/booklet-printing.html · 8 printingcenterusa.com/printing/booklet-printing · 9 lulu.com/create/booklets · 10 staples.com/services/printing/... · 11 vistaprint.com/marketing-materials/booklets · 12 overnightprints.com/booklets · 13 mixam.com/booklets · 14 mixam.co.uk/booklets · 15 catdi.com/printing/booklet-printing
- 复算 run2（10 条）: = run1 前 10，顺序一致
- 竞品 Top5: mixam.com（含 .co.uk）3 · staples.com 2 · canva.com 2 · mimeo.com 2 · uprinting.com 2
- 参数: `8 to 72 Pages`（catdi）· `On Demand`（mimeo/lulu）
- 竞争格局: 美国大型连锁（staples/officedepot）+ 网印平台（mixam/uprinting/vistaprint）+ 设计平台（canva）；zprintpro 书册类 en 资产未被引用

### Probe 4 · "包裝盒訂製 香港邊間好"（zh-hk）★命中
- **zprintpro.com 被引用**:
  - r1 #6: https://www.z-printpro.com/products/packaging-box-printing/custom-packaging-box-printing-100pcs-3day-hk.html（旧域，标题「香港包裝盒印刷 | Custom Box Printing HK | 彩盒瓦楞盒100個起 | 3天出貨 | 智印港」）
  - r1 #7: https://www.z-printpro.com/products/packaging-box-printing/small-batch-packaging-box-printing-100pcs-from-hk08-hk.html（旧域，「小批量包裝盒印刷｜100個起｜HK$0.8起｜即日報價」）
  - r1 #14: https://zprintpro.com/zh-hk/（新域主页）
  - r1 #17: https://zprintpro.com/zh-hk/product/rigid-boxes/（新域 PDP）
  - r2 #6、#7: 两条旧域 URL 位次与 r1 完全一致 ✅（r2 仅返回前 10，新域两条不在窗口内，非矛盾）
- 引用源 run1（17 条，~00:25）: 1 bmpack.com · 2 xobox.hk/pages/custom-boxes-packaging-online · 3 bmpack.com/products · 4 e-print.com.hk/products_personalized-packaging-boxes · 5 ezbox.com.hk/zh/ · 6-7 **z-printpro.com（旧域）×2** · 8 ginkgoproductionhk.com/packaging · 9 flintgift.com/...包裝盒訂製 · 10 pro360.com.hk/zh-hk/price/packaging_design（比价平台）· 11 wwpc.hk · 12 packnbox.com/zh-hant/ · 13 winprint.hk/?product=packingbox · 14 **zprintpro.com/zh-hk/** · 15 ubf.com.hk/?lang=zh · 16 goldenfame.com.hk/Hinged-Boxes/27.html · 17 **zprintpro.com/zh-hk/product/rigid-boxes/**
- 复算 run2（10 条）: = run1 前 10（含 #6/#7 旧域位次一致）
- 竞品 Top5: bmpack.com 4 · e-print.com.hk 2 · xobox.hk 2 · ezbox.com.hk 2 · ginkgoproductionhk.com 2（flintgift/pro360 并列 2）
- 参数: `100件起訂・即時報價`（bmpack）· `低至10個起印 3日交貨`（e-print）· **`100個起｜HK$0.8起｜即日報價 / 100個起 | 3天出貨`（zprintpro 旧域两条——本 probe 中参数密度最高的供应商引用）** · `100個起`（xobox 标题语境）
- 竞争格局: 香港本地包装平台（bmpack/ezbox/xobox）+ 香港网印龙头 e-print；zprintpro 以 4 条引用入榜但 2 条挂旧域

### Probe 5 · "貼紙印刷 小批量 快交貨"（zh-hk）★命中
- **zprintpro.com 被引用**:
  - r1 #6: https://zprintpro.com/zh-hk/services/rush-printing-delivery/（「即日印刷 18:00 截單・順豐翌日 12:00 前送達」）
  - r1 #20: https://zprintpro.com/zh-hk/（主页）
  - r2 #6: 与 r1 一致 ✅（r2 前 10 窗口内 #20 不在，非矛盾）
- 引用源 run1（20 条，~00:26）: 1 luny.tw/urgent-stickers · 2 luny.tw · 3 apple-print.com.tw/shop/urgent-sticker-3h/ · 4 everprinter.com/product/24hr-single-stickers · 5 everprinter.com/product/pdt-110 · 6 **zprintpro.com/zh-hk/services/rush-printing-delivery/** · 7 e-print.com.hk/products_online_design · 8 apple-print.com.tw/shop/die-cut-stickers/ · 9 haokan.com.tw/product/pay_5/ · 10 theprint.com.hk/...digital-fast-label-printing-detail · 11 e-print.com.hk/products_Digital_Stickers · 12 golden-co.com/sticker-printing/ · 13 cpct-copycat.com/...instant-sticker-printing.html · 14 design-easy.com/labels-digital-stickers.html · 15 golden-co.com/ · 16 e-print.com.hk/products_Labels · 17 print100.com/hk/html/prod_d_smallamountsticker.aspx · 18 e-print.com.hk/ · 19 fungyiuco.com/ · 20 **zprintpro.com/zh-hk/**
- 复算 run2（10 条）: = run1 前 10（#6 一致）
- 竞品 Top5: e-print.com.hk 5 · luny.tw 4 · apple-print.com.tw 4 · everprinter.com 4 · golden-co.com 2
- 参数: `3小時急件`（apple-print）· `24hr`（everprinter）· `1張起印即日`（e-print/copycat/design-easy）· **`18:00 截單・順豐翌日 12:00 前送達`（zprintpro——唯一给出截单时限+承运商+送达 SLA 全链路参数的引用）**
- 竞争格局: 注意 run1 有台湾供应商混入（luny/apple-print/everprinter/haokan 为 .tw）——zh-hk 探针词未锁定 HK 地域，台湾快印抢占引用位；zprintpro 凭 rush 服务页拿到 #6

### Probe 6 · "月曆印刷 訂製 2027"（zh-hk）★命中（最佳命中结构）
- **zprintpro.com 被引用**:
  - r1 #6: https://zprintpro.com/zh-hk/product/custom-calendars/（「定制年曆 | 企業禮品 多款式」）
  - r1 #11: https://zprintpro.com/zh-hk/category/calendars/（「月曆印刷 2027 | 100本起印・Q4旺季・60天預訂・燙金精裝・企業LOGO」）
  - r1 #17: https://zprintpro.com/zh-hk/product/desk-calendars/（「座檯年曆 | 企業禮品 多款式」）
  - r2 #6: 与 r1 一致 ✅（#11/#17 在 r2 前 10 窗口外，非矛盾）
- 引用源 run1（17 条，~00:26）: 1 e-print.com.hk/products_Custom_Desk_Calendar · 2 print100.com/hk/html/prod_desk.aspx · 3 e-print.com.hk/products_desk_calendar_printing · 4 amazingstudiohk.com/calendar · 5 runtoogift.com/product_de/2107.html · 6 **zprintpro.com/zh-hk/product/custom-calendars/** · 7 uu-lian.com/wallcalendars.php · 8 teammate.com.hk/series/2027-Creative-calendar/ · 9 uu-lian.com/c2cnt-c2_356137-c2-13182.html · 10 guantai.com.tw/product · 11 **zprintpro.com/zh-hk/category/calendars/** · 12 amazingstudiohk.com/corporatecalendar · 13 fingerprint.com.hk/cms/promotion/products/calendar · 14 teammate.com.hk/calendar2027/ · 15 doublecreativehk.com/en/calendar · 16 doublecreativehk.com/ · 17 **zprintpro.com/zh-hk/product/desk-calendars/**
- 复算 run2（10 条）: = run1 前 10（#6 一致）
- 竞品 Top5: e-print.com.hk 4 · amazingstudiohk.com 2 · uu-lian.com 2 · teammate.com.hk 2 · print100.com 2（runtoogift/doublecreative 并列 2）
- 参数: `1本起印`（e-print）· `早鳥優惠・免費樣板`（amazingstudio）· **`100本起印・Q4旺季・60天預訂`（zprintpro category 页——全列表唯一同时给出 MOQ+旺季节奏+预订窗口的引用）** · `2027` 年份钩子（多站）
- 竞争格局: 香港本地网印（e-print/print100）+ 企业礼品商（teammate/amazingstudio/runtoogift）；zprintpro 是唯一以「category 页带完整季节参数」被引用的供应商

### Probe 7 · "ステッカー印刷 小ロット おすすめ"（ja）
- zprintpro.com: **未出现在引用中**（两次均未出现）
- 引用源 run1（15 条，~00:27）: 1 megaprint.jp/OrderInfo?viewName=sticker-small-lot · 2 graphic.jp/lineup/sticker · 3 zeamisticker.com/small-lot/ · 4 yotsuba-insatsu.com/print/sticker.php · 5 print.denno-saurus.com/sticker.php · 6 weblabels.net/seal/small-lot · 7 visipri.com/sticker/single-type.php · 8 zeamisticker.com/ · 9 stickerjapan.com/ · 10 makel.jp/sticker · 11 visipri.com/sticker/intro_order.php · 12 decaplus.jp/ · 13 gekisute.com/ · 14 aiprintshop.jp/ · 15 originalprint.jp/store.php/campaign/stickerPrint
- 复算 run2（10 条）: graphic.jp · weblabels.net · zeamisticker/small-lot · **raksul.com/print/sticker/（r2 新增）** · yotsuba · zeamisticker · visipri/single-type · denno · **original-goods.orilab.jp/magazine/...（r2 新增，榜单文）** · makel —— 列表组成与 run1 有差异（raksul/orilab 进入，megaprint/stickerjapan/decaplus/gekisute/aiprintshop/originalprint 落出）；zprintpro 两次皆缺，结论不变
- 竞品 Top5: zeamisticker.com 4 · visipri.com 3 · graphic.jp 2 · weblabels.net 2 · yotsuba-insatsu.com 2
- 参数: `1枚32円〜`（zeamisticker）· `1枚から`（graphic/yotsuba）· `5枚から`（makel）· `型代0円`（zeamisticker）· `50枚から`（aiprintshop）
- 竞争格局: 日本本土网印完全垄断；平台型 raksul 在 r2 进入；无海外供应商被引用——ja 站点零存在感

### Probe 8 · "カレンダー印刷 ノベルティ 注文"（ja）
- zprintpro.com: **未出现在引用中**（两次均未出现）
- 引用源 run1（19 条，~00:27）: 1 spc.askul.co.jp/naire/calendar · 2 printrider.jp/products/calendar/ · 3 calendo365.com/guide/ · 4 ddsp.jp/product/goods/calendar/ · 5 calepro.com/detail/natural/NA-01_double.html · 6 originalgoods.press/products/detail/6046 · 7 matsumoto-gift.jp/products/detail/5936 · 8 shop.kayo.co.jp/calendar/full-order/standard · 9 matsumoto-gift.jp/products/detail/4610 · 10 hi-ad.jp/products/detail/T102601418 · 11 mbe.co.jp/seasonal/calendar · 12 calendar-pr.jp/original · 13 ypg.jp/specials/calendar.html · 14 pripress.co.jp/lp/calendar/ · 15 calendar-direct.jp/index.php · 16 raksul.com/print/calendar/ · 17 hs-honpo.com/calendar/original/ · 18 mbe.co.jp/calendar/mbecustom · 19 original-calendar.com/
- 复算 run2（10 条）: = run1 前 10，顺序一致
- 竞品 Top5: spc.askul.co.jp 2（平台）· matsumoto-gift.jp 2 · mbe.co.jp 2 · printrider.jp 2 · calepro.com 2（ddsp/calendo365/originalgoods.press/kayo/hi-ad/raksul/hs-honpo 等并列 2 或 1）
- 参数: `早期20%OFF`（askul）· `最安値352円`（originalgoods.press）· `最安20.9円/部〜最小ロット10部`（calendar-direct）· `10部から`（matsumoto-gift）· `200円〜`（hs-honpo）· `2027年（令和9年度）` 年份钩子（多站）
- 竞争格局: 名入れカレンダー专业零售 + 平台（askul/raksul）垄断；全部本土；ja 完全无 zprintpro 痕迹

---

## 三、汇总

### 3.1 命中率
- **3/8（37.5%）**；zh-hk 3/3 · en 0/3 · ja 0/2
- zprintpro 系引用（zprintpro.com + z-printpro.com）合计 13 个引用槽位（P4 6 + P5 3 + P6 4）

### 3.2 竞品引用榜（8 probe × 2 run 合计频次 Top10）
| 排名 | 域名 | 频次 | 出现 probe | 类型 |
|---|---|---|---|---|
| 1 | **e-print.com.hk** | 11 | P4/P5/P6 | 香港网印龙头 |
| 2 | bmpack.com | 4 | P4 | 香港包装平台 |
| 2 | zeamisticker.com | 4 | P7 | ja 贴纸专业店 |
| 2 | stickerkiko.com | 4 | P2 | en 贴纸专业店 |
| 2 | luny.tw | 4 | P5 | 台湾贴纸（zh-hk 词漏入） |
| 2 | apple-print.com.tw | 4 | P5 | 台湾贴纸（同上） |
| 2 | everprinter.com | 4 | P5 | 台湾贴纸（同上） |
| 8 | youstickers.com / makestickers.com | 3 | P2 | en 贴纸 |
| 8 | tealpackaging.com / cubitpackaging.com | 3 | P1 | en 包装 |
| 8 | mixam.com（含 .co.uk）| 3 | P3 | en 书册平台 |

其余 ≥2 次的长尾: visipri.com 3、amazingstudiohk.com、uu-lian.com、teammate.com.hk、print100.com、golden-co.com、graphic.jp、weblabels.net、yotuba（yotsuba）-insatsu.com、matsumoto-gift.jp、mbe.co.jp、spc.askul.co.jp、growthmarketingpro.com、packlane.com、canva.com、staples.com、mimeo.com、uprinting.com 等。

### 3.3 可乘缺口 Top2
1. **Probe 6（月曆印刷 訂製 2027）— 已在榜内，向上突破成本最低**。zprintpro 3 条引用（#6/#11/#17），且 category 页是全列表唯一带「MOQ+Q4 旺季+60 天预订窗」参数密度的引用；前方竞品（e-print/print100/amazingstudio/teammate）靠的是高频目录页与企业礼品商页面。2027 预订窗正在开启（Q4 旺季），趁竞品参数缺位（e-print 仅「1本起印」、amazingstudio 仅「早鳥優惠」）强化实体信号（W3: sameAs 空）+ 内链 + 保持参数化标题，最有把握从 #6-#11 推进 Top5。
2. **Probe 1/2（en 包装/贴纸）— zh-hk 已验证的参数式引用打法在 en 完全未复现**。zh-hk 侧被引用靠的是标题内嵌真实参数（100個起 / HK$0.8起 / 3天出貨 / 18:00 截單翌日 12:00 順豐），而 en 获引用的供应商全部采用同款参数前置打法（"No Minimum Order, Free Shipping" / "from $0.35" / "Zero MOQ & Free US Shipping"）。zprintpro 手握等值真实参数（100 MOQ / USD 定价 / DHL 2-4 天）但 en 页面零引用；叠加旧域 z-printpro.com 仍在 P4 引用中分摊实体信号 → en 站 Organization/sameAs 补全 + 参数前置 + 新旧域实体归一，是对症下药的突破口。（ja P7/P8 完全暗区，竞品 100% 本土，需 ja 市场实体存在感先行，列入后续观察而非本轮主攻。）

### 3.4 方法论限制（如实记录）
1. perplexity provider 不可用（无 API key）——未获问 with 的「AI 合成答案+文内引用」形态，本轮引用位次来自 source_check 多 provider 聚合的**检索式引用列表**；后续若接入 Perplexity/Exa 原生 provider 应补跑对照。
2. 本工具不返回单 probe 精确时间戳，时间按会话窗口+执行顺序推算（已标 ~）。
3. 复算 run2 仅返回前 10 条（run1 为 14-20 条），r2「未出现」不等于「消失」，仅窗口外；位次判断以两 run 交集为准。
4. zh-hk Probe 5 引用含台湾供应商，说明该 probe 词组地域信号弱，后续轮次可加「香港」限定词做对照实验（属 W4 后续迭代，不在本 baseline 范围）。

### 3.5 后续对比口径（供每日 diff）
- 命中率 n/8 与分 locale 命中
- zprintpro 各 probe 最高引用位次（当前最优: P4 旧域 #6）
- e-print.com.hk 等 Top3 竞品频次变化
- 旧域 z-printpro.com 引用占比（实体归一进度指标: 当前 P4 中 旧域 4 槽 vs 新域 3 槽）

— 报告完 —（W4 Day 1 baseline · 生成 2026-09-30 00:30 +08:00 · 仅供内部使用）
