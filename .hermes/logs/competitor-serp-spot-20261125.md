# 带钱词竞品 SERP 抽查 — 2026-11-25

- **任务**: 7 个带钱词竞品 SERP 抽查（只读公开网页；不写 src/；产物仅本文件）
- **执行**: autoclaw · 2026-11-25（当天实时抽查，非缓存数据）
- **数据来源**:
  - web_search 工具（provider=autoglm；每次请求声明 count=8，实际每词仅返回 2–3 条）——查询执行日 2026-11-25
  - fetch_content 抓 Bing 备用通道：2 次均失败（`fetch_content_invalid_response`，第 1 次=word① 裸 URL，第 2 次=word① 加 setmkt=zh-HK&setlang=zh-hant&count=10 重试），失败后按止损线停止，未再消耗预算
- **网络请求台账**: web_search 7 次 + fetch_content 2 次（均失败）= **9 次 ≤ 预算 12**
- **方法与覆盖声明（诚实边界）**:
  - 方法 1（web_search）成功但每词仅返回 2–3 条 → **位次覆盖 = 工具返回条数内（2–3 条），非完整前 5**
  - 方法 2（Bing 回退）失败 ×2 → **位次 4–5 无法核实**，统一标「未覆盖」；没有任何位次是推断或编造
  - **结论等级：低置信**（SERP 覆盖不足；zprintpro 在榜判定仅限返回范围内成立）
  - 观察备注：部分结果 URL 带 `srsltid=` 追踪参数（Google 来源特征）；位次为工具返回顺序，非浏览器实抓排序
- **合规**: 本文件仅存 `.hermes/logs/`，不入任何客户可见内容（§0.23.1 同族纪律）；所有引文均为搜索结果 snippet 原文摘录

---

## 逐词 SERP 记录

### ① 宣傳單張印刷（zh-hk · HK 视角）— 查询词「宣傳單張印刷 香港」
状态：PARTIAL_COVERAGE（web_search 返回 3/5；Bing 回退失败）

| 位次 | 域名 | 标题 | snippet 价格/MOQ/交期锚点 |
|---|---|---|---|
| 1 | e-print.com.hk | 宣傳單張類 | 无（仅品类罗列「多款尺寸」） |
| 2 | print100.com | 數碼宣傳單張 | 交期：「急印最快3小時起貨」 |
| 3 | printshop.hk | 印館PrintShop-宣傳單張系列 | 价格：「$21 起」「A5\|$21/10張」「A6\|$96/500張」；交期：「1個工作天交貨」「2個工作天交貨」 |
| 4–5 | — | 未覆盖（Bing 回退失败） | — |

- **zprintpro.com 在榜：否**（返回前 3 未见）
- 位次 3 snippet 原文摘录：「數碼單張. $21 起. 1個工作天交貨. A5|$21/10張 · 宣傳咭. $96起. 2個工作天交貨. A5|$32/5張 · 數碼咭紙. $39起…」

### ② 利是封印刷（zh-hk）— 查询词「利是封印刷 香港」
状态：PARTIAL_COVERAGE（3/5）

| 位次 | 域名 | 标题 | snippet 价格/MOQ/交期锚点 |
|---|---|---|---|
| 1 | e-print.com.hk | 香港利是封印刷 | 无价格；信任/设计要素：「備免費在線利是封設計」「瀏覽器直接DIY」「港式模板」 |
| 2 | print100.com | 利是封印刷\| 觸感紙利是封\| 少數量利是封 | MOQ：「起印量低至100個」；设计：「免費使用…現成設計模板」 |
| 3 | design-easy.com | 節慶祝福利是封\|少數起印 | MOQ（标题级）：「少數起印」；规模：「超1000款利是封設計樣式」 |
| 4–5 | — | 未覆盖 | — |

- **zprintpro.com 在榜：否**（返回前 3 未见）
- 位次 2 snippet 原文摘录：「接受大少數量訂單印刷，起印量低至100個。」

### ③ 月曆印刷（zh-hk）— 查询词「月曆印刷 香港」
状态：PARTIAL_COVERAGE（3/5）

| 位次 | 域名 | 标题 | snippet 价格/MOQ/交期锚点 |
|---|---|---|---|
| 1 | e-print.com.hk | 月曆印刷\|香港掛曆製作 | 无数字锚点（「標準模板或自家設計」） |
| 2 | meika-printing.com | 月曆\|印刷\|書刊\|小冊子\|商業印刷\|手挽袋\|信封\|禮盒\|推廣產品 | 信任要素：「在香港成立於1982年」「廣州自設廠房」 |
| 3 | taicheong.com.hk | Tai Cheong Calendar Limited 大昌月曆印刷有限公司 | 信任要素：「超過30年」「自建內地廠房」 |
| 4–5 | — | 未覆盖 | — |

- **zprintpro.com 在榜：否**（返回前 3 未见）

### ④ 包裝盒訂製（zh-hk）— 查询词「包裝盒訂製 香港」
状态：PARTIAL_COVERAGE（3/5）

| 位次 | 域名 | 标题 | snippet 价格/MOQ/交期锚点 |
|---|---|---|---|
| 1 | yaukee.com | 包裝盒設計香港印刷 | 信任要素：「超30多年包裝盒設計及印刷經驗」「香港及國內設廠」 |
| 2 | ezbox.com.hk | 包裝/包裝盒設計訂製\| 紙盒紙箱設計印刷公司- ezbox | 无数字锚点（服务描述） |
| 3 | flintgift.com | 包裝盒訂製｜禮物盒訂造 | 无数字锚点（服务描述） |
| 4–5 | — | 未覆盖 | — |

- **zprintpro.com 在榜：否**（返回前 3 未见）

### ⑤ catalog printing china（en · 美国买家视角）— 查询词「catalog printing china」
状态：PARTIAL_COVERAGE（3/5）

| 位次 | 域名 | 标题 | snippet 价格/MOQ/交期锚点 |
|---|---|---|---|
| 1 | made-in-china.com | Catalog Printing | 无数字锚点（类目聚合页） |
| 2 | printedinchinaonline.com | China Printing Company,cheap catalog,magazine,book | 定性价格词：「cheap offshore printing」（无具体数字） |
| 3 | chinaprintingmasters.com | Printing Company\|China Printing Service\|Book Printing | 信任要素：「the largest Chinese printing company」+ 直线电话「(+86) 1770 305 2930」 |
| 4–5 | — | 未覆盖 | — |

- **zprintpro.com 在榜：否**（返回前 3 未见）

### ⑥ small batch sticker printing（en）— 查询词「small batch sticker printing」
状态：PARTIAL_COVERAGE（**仅 2 条**，工具返回最少的一词）

| 位次 | 域名 | 标题 | snippet 价格/MOQ/交期锚点 |
|---|---|---|---|
| 1 | vistaprint.com | Custom Single Stickers - Vistaprint | 规格锚点：「sizes range from a compact 1" x 2", all the way up to 5" x 5"」（无价格数字） |
| 2 | moo.com/us/stickers | Custom Stickers & Labels \| Premium Custom Sticker Printing | 价格：「10 stickers from $21.50」「24 stickers from $9.60」（snippet 原文如此，两档单价逻辑未展开）；材质：「Matte Paper, Coated Paper, Metallic」 |
| 3–5 | — | 未覆盖 | — |

- **zprintpro.com 在榜：否**（返回前 2 未见）

### ⑦ ステッカー 小ロット（ja）— 查询词「ステッカー 小ロット」
状态：PARTIAL_COVERAGE（3/5）

| 位次 | 域名 | 标题 | snippet 价格/MOQ/交期锚点 |
|---|---|---|---|
| 1 | graphic.jp | シール印刷・ステッカー印刷・ラベル作成 小ロット（1枚から）も可能 | MOQ：「1枚（小ロット）から大ロットまで」；交期：「翌日発送可能」；价格框架：「激安ネット印刷」 |
| 2 | raksul.com | ステッカー・シールを1枚から注文できる送料無料の印刷所 | MOQ 阶梯：「1枚から」「5枚・10枚といった小ロットから」「100枚以降は100枚…」；物流：「送料無料」；内容日期 2025-08-31 |
| 3 | zeamisticker.com | 安いオリジナルステッカー・シール作成・印刷｜1枚35円 | 价格：「1枚35円〜」；MOQ：「合計50枚の小ロットから」；交期：「特急製作」 |
| 4–5 | — | 未覆盖 | — |

- **zprintpro.com 在榜：否**（返回前 3 未见）

---

## zprintpro.com 在榜总览

**7/7 词在工具返回范围内（每词 2–3 条）均未见 zprintpro.com。**
置信边界：位次 4–5（及第 2 页）未核实——本工具返回条数不足且 Bing 回退失败，**不能**据此断言「前 5 全无」；只能说「返回片段内未见」。低置信，不作为任何 src/ 改动依据。

## 3 条用户习惯洞察（全部来自本次抓到的 snippet 原文，非推断）

1. **交期/急速表达是 zh-hk 与 ja 市场第一可见锚点，且写法极度具体**。
   证据：①位次 2 print100「急印最快3小時起貨」；①位次 3 printshop「1個工作天交貨」；⑦位次 1 graphic.jp「翌日発送可能」；⑦位次 3 zeamisticker「特急製作」。
   对比：我站全球口径是 72 小时交付，但 HK 本地竞品在 snippet 里直接放「3 小時 / 1 工作天」级别表达——可核实前提下，交期锚点的具体度（小时/工作天）比形容词更抢 CTR。

2. **价格锚点固定句式 = 「最低单价起 + 最小起订量」双数字组合，MOQ 几乎必出现**。
   证据：①位次 3「$21 起 / A5|$21/10張」；②位次 2「起印量低至100個」；⑥位次 2 moo「10 stickers from $21.50」；⑦位次 3「1枚35円〜 + 合計50枚の小ロットから」。
   对比：本次 7 词中，凡 snippet 带「单价起 + N 件起」双数字的（①③⑦），其 snippet 信息密度明显高于纯服务描述（④位次 2/3 ezbox、flintgift 无任何数字）。价格带参考：HK 数码单张约 $21 起/10 张；ja 低价位可到 1 枚 35 日元。

3. **信任要素表述 = 「厂龄年限 + 厂房/本土属性 + 规模数字」三件套，而非认证词**。
   证据：③位次 2 meika「1982年成立 + 廣州自設廠房」；③位次 3 taicheong「超過30年 + 自建內地廠房」；④位次 1 yaukee「超30多年…香港及國內設廠」；②位次 3 design-easy「超1000款設計樣式」；⑤位次 3「the largest Chinese printing company + 直线电话」。
   对比：7 个词的返回片段里**没有一处**出现 ISO/FSC 类认证词作为 snippet 主信任信号；竞品主推「年限+厂房+规模/模板数」。我站现行合规口径「深圳平湖廠房 + 香港服務點」（per AGENTS 门童 #1 CRED_SELF_FACTORY 替代表述）与该习惯兼容，年限类数字须走 §0.23 有源数字（2012 年实体/15+ 口径 per §13.14）才可入 snippet。

## 待证项（不写结论，只记线索）

- 位次 4–10 与 zprintpro 真实位次：需浏览器实抓（Google HK / Bing）补齐；本次两通道（web_search 条数上限、fetch_content 抓 Bing）均已到能力边界。
- ⑥ 词仅返回 2 条，en 市场该词的真实竞争面未观察到（Vistaprint/Moo 之外的第 3 名及以后未知）。

## 建议的下一步

1. 用 autoglm-browser-agent 实抓 7 词 Google/Bing 前 10，补位次 4–5 与 zprintpro 是否在 4–10 位（一次会话可串行完成，不占本次预算）。
2. 若确认 7 词前 10 均无 zprintpro：按 §0.29 标题长尾 SOP 检查各词对应页面的 title/description 是否缺「价格起 + MOQ + 交期」锚点（洞察 2 的双数字句式可直接套用），改动走 §0.25 攒批。
3. 本报告仅存 `.hermes/logs/`，任何结论进入 src/ 前须先补齐位次证据并过对应门童（title-v5 / gsc-leak / brand）。
