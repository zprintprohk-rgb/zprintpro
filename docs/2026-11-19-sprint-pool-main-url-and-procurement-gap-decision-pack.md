# ZprintPro 三语冲刺池主 URL 定标 + 采购差距决策包（11-19 第 2 轮）

> 日期：2026-11-19 02:15–03:0x（Asia/Shanghai，autoclaw 人手会话第 2 轮）
> 上游：`重要文件/2026-11-19-three-market-seo-aeo-geo-flywheel-and-scheduler-upgrade.md` §8 作战表 11-20/11-22 行 + 54kw 池（复用既有拍板，不重拍）
> 性质：测量与诊断产物（READY 候选输入）；**未修改 `src/`、未 commit／push、未翻转任何队列任务状态**。已有 K3 拍板的主 URL（海报/喜帖）原样保留。
> 3 个并行审计子任务（可移貼紙/學校印刷/摺頁印刷）+ 1 次真实 SERP 取证 + 双方法守卫盲区复核实证。

---

## 0. 结论摘要

1. **15 个重点簇的主 URL 定标完成**（§2）：12 簇为新定标（页面级 GSC + live 200 双证据），3 簇沿用既有 K3 拍板/裁决（海报=category/posters 冻结、喜帖已分工、small-batch/catalog 已执行）。每个簇现在有唯一 owner/主 URL/baseline，满足 11-25「近首页第一批单页单变量执行」的前置条件。
2. **食品包裝印刷真实 SERP 取证成功**（§4）：首页零点击的 SERP 侧解释 = 我方可见承接是信息型博客（第 4 位左右），竞品头部 3 家均为采购型落地页；AI 概覽引用 JoinPrint +3（我方未引用）。三个有界提案（P-a 内链/直答块、P-b PDP 对齐、P-c title 变体须解冻）交 weekly/K3。
3. **两个守卫盲区实锤并已按 §0.31 SOP 入档**（§5）：① `scan-simplified.mjs` 只扫名称 → zh-hk 简体泄漏 17 处（live 实锤）+ en/ja 字段污染全过；② 电话守卫只拦 `+852` 形态 → 裸号 `85290616204` 在 6 个组件存活，线上 CTA 实际拨打旧港号。
4. **三簇采购差距清单**（§3）：可移貼紙（MOQ 10/100/50 三值并存）、學校印刷（同页双答 10 本 vs 100 本且双双进 FAQPage JSON-LD）、摺頁印刷（PDP 价格 4 套口径差 23 倍 + 博客 JSON 链接前缀回归）。顺风带（四词双窗改善）的转化效率正被这些口径冲突侵蚀。

---

## 1. 数据来源与校准

```
数据来源:
- GSC 28d 网页表（604 行，GSC数据/28天...2026-11-19.xlsx，openpyxl 全量提取）
- .hermes/logs/gsc-2026-11-19-money-keyword-delta.json（54 词精确行基线）
- 线上抓取：3 子任务串行 fetch（全 200/长度校验/marker 双方法）+ 受控浏览器 SERP 快照
- 源码：rg/Node utf-8（products.ts / sku-seo-data.ts / products-content.ts / category-* / components）
- .hermes/tmp/audit-{removable,school,folded}-1119.md（子任务详档）
校准状态: 已校准（GSC=11-19 导出；live=11-19 02:2x-03:0x 抓取；源码=当前工作树）
```

测量红线沿用：query×page 不联接（页面表只作承接结构参考）；缺行=NO_CURRENT_BASELINE；本包不含排名/CTR 主张，不评 11-18 变更成效。

---

## 2. 三语冲刺池主 URL 定标表（11-20 行交付物：每词簇唯一 owner/主 URL/baseline）

### 2.1 zh-hk

| 查询簇 | 28d 基线（11-19 delta） | 主承接 URL（定标） | 页面级证据（28d 网页表） | owner / 节奏 |
|---|---|---|---|---|
| 可移貼紙 | 71/0/12.62 双窗改善 | `/zh-hk/product/removable-stickers/` | PDP 206/2/8.59；类目 stickers 306/1/37.49 | daily（11-22 清单→11-25 候选） |
| 學校印刷 | 71/0/16.89（7d -11.69） | `/zh-hk/category/educational/` | 类目 84/2/19.68 + exercise-books 87/6/9.3 + certificates 75/2/11.89 + textbooks 49/3/37.04 | daily（同上） |
| 摺頁印刷 | 65/0/18.66 双窗改善 | `/zh-hk/product/folded-leaflets/` | PDP 45/3/15.2；博客 764/21/7.89（17 倍展示） | daily（同上） |
| 月曆印刷 | 140/0/20.40 双窗改善 | `/zh-hk/product/custom-calendars/` | PDP 395/7/19.39；类目 calendars 241/2/36.73；2027 时间表博客 81/1/10.0 | daily（11-24 季节审核） |
| 食品包裝印刷 | 125/0/7.93 | 交易主=`/zh-hk/product/food-boxes/`；SERP 现承接=博客指南 | PDP 484/2/23.30 | weekly（提案，SERP 证据已录） |
| 利是封印刷 | 59/1/24.27 | `/zh-hk/category/red-packets/` | 类目 216/8/15.91；cny-2027 博客 161/1/9.57 | daily（11-24，与月曆分诊：7d +7.17 退） |
| 海報印刷 | 186/1/20.37 连续恶化 | `/zh-hk/category/posters/`（**K3 冻结沿用**） | a2-posters PDP 825/18/12.98；海报博客 1194/11/10.86 | gsc 诊断（GSC-MEASURE READY） |
| 宣傳單張 | 134/0/39.39 连续恶化 | `/zh-hk/category/flyers/` | 401/3/25.78 | gsc 诊断（READY） |
| 香港印刷 | 34/2/12.18 | `/zh-hk/blog/hong-kong-printing-guide/` | 334/5/24.25 | 观察（行业大词，随实体建设） |
| 書刊印刷 / 印書 | 140/0/35.45 / 61/0/32.16 | `/zh-hk/category/books/` | 类目 714/2/51.31；saddle-stitch 博客 474/7/16.73；perfect-bound PDP 114/2/38.82 | 中期权威建设（11-29） |

### 2.2 en

| 查询簇 | 28d 基线 | 主承接 URL | 页面级证据 | owner / 节奏 |
|---|---|---|---|---|
| small batch sticker printing / small batch stickers | 13/0/8.92（恶化轨迹始于 11-10 窗）／59/0/15.34 | `/en/product/small-batch-stickers/`（一簇一 URL） | PDP 210/2/13.95 | 复测窗（真值已验收，§11-23 健康检查） |
| china catalog printing / catalog printing china / catalogs printing china | 101/0/14.99／37/0/15.57／6/0/22.33 | `/en/product/catalog-printing/`（一簇一 URL，不多页互抢） | PDP 312/1/20.30；supplier-guide 博客 156/1/18.78 | 复测窗（c172b3d2） |
| doujinshi printing | 59/0/11.22 | `/en/product/doujinshi-printing/` | PDP 198/4/8.06；japan-doujin 类目 62/4/9.26 | 近首页冲刺观察 |
| a2 poster | 44/1/43.39 | `/en/product/a2-posters/` | 225/2/23.62 | 诊断（不与 zh 海报混实验；11-18 修复已部署） |

### 2.3 ja

| 查询簇 | 28d 基线 | 主承接 URL | 页面级证据 | owner / 节奏 |
|---|---|---|---|---|
| ステッカー印刷 小ロット / pvc シール / 防水ステッカー | 10.75／26/0/14.38／11.71 | `/ja/product/small-batch-stickers/` | ja PDP **395/4/14.45**；ja waterproof PDP 187/2/16.44 | 近首页冲刺（真值条件化已落地） |
| コミケ 印刷 | 110/0/30.49 连续恶化 | `/ja/comiket-c109/` | ja hub 98/5/5.70；zh hub 538/3/9.46（意图错配信号，待联表诊断） | gsc 诊断（READY） |
| 教材 印刷製本 | 57/0/43.95 连续恶化 | `/ja/product/textbooks/`（PDP）+ 教材博客 | textbooks（zh 版）49/3/37.04 | gsc 诊断（READY）+ blog READY 任务 |

定标原则执行情况：一簇一主 URL（catalog 簇三变体收拢到同一 PDP）；已拍板不重拍（海报沿用冻结）；行业大词只做可见性（香港印刷/印刷公司不开新页）。

---

## 3. 三簇采购差距清单（11-22 行提前交付，READY 候选输入）

> 覆盖声明：下表为**差距要点摘录**；三簇 7 点逐项完整判定（含 ④⑤⑥ 等非差距项的 OK/骨架判定）在对应详档中，每簇均全 7 点覆盖、无未审计项。

### 3.1 可移貼紙（主 URL removable-stickers PDP；详档 audit-removable-1119.md）

| # | 差距 | 分类 | 证据 |
|---|---|---|---|
| 1 | MOQ 三值并存：正文 10 張（products.ts:899→live）vs meta desc「100 張起」（sku-seo-data.ts:143）vs en/ja「100-sticker MOQ」（products-content.ts:1716）vs「小批量 50 張」 | **DIAG**（K3 裁决真值；10 为结构真值候选） | live 双页 + file:line |
| 2 | 材质三套口径同页：規格參數 PP/PET vs 正文 PVC 3.4mil/BOPP/銅版紙 vs 對比表 銅版紙/PVC/透明PET | **DIAG** | 同上 |
| 3 | 类目页「最細 25×25mm」vs PDP「最小約 15×15mm」下限冲突 | DIAG | live |
| 4 | 尺寸/场景 ①、WhatsApp 规格清单 ⑦ | **OK** | wa.me/8619880851334×11 + 規格清单在位 |
| 5 | **zh-hk 简体泄漏「适配行业:」+ 行业列表简繁重复两遍**（products.ts:876→live） | **P0**（§13.16.1） | live + rg 17 处 |
| 6 | live 含「海德堡柯式印刷機組」「HP Indigo 15K B2」设备声明 | **已更正（原误判）**：源定位 = TrustBadgeBlock.tsx L8-11 / ProductPageV9.tsx L75,102,137，注释「修訂輪7 **唐總逐字修訂 2026-09-10**」= **K3 已批逐字文案，合法保留**；衍生动作改为 credibility-guard 对该块加白名单豁免（guard FP 复盘） | live + 源注释 |

### 3.2 學校印刷（主 URL educational 类目；详档 audit-school-1119.md）

| # | 差距 | 分类 | 证据 |
|---|---|---|---|
| 1 | 同页同问句双答：「校簿印刷起訂量要幾多本？」10 本起（category-conversion-blocks.ts:2660）vs 100 本起（:2763），**双双渲染且双双进 FAQPage JSON-LD**；PDP/products.ts 真值=10 本 | **DIAG→READY-CANDIDATE**（:2763 为离群值，真值明确 10 本，属已批口径清理） | file:line + live |
| 2 | H1/title 含「學校印刷」✓；三 PDP 内链全 200 ✓；①③④⑤ 大体 OK | OK | live |
| 3 | 生产/运输/偏遠限制 ⑥ 未声明 | READY-CANDIDATE（按真值条件化补） | live |
| 4 | **Category Sidebar CTA 裸号 85290616204**（全站 6 处组件硬编码，见 §5） | **P0**（§13.10 红线） | src 双方法互证 + live |
| 5 | zh-hk meta 含简体「适配行业」；「15,000+ 客戶」「一張起印」无来源声明（海德堡/HP Indigo 部分已更正为 K3 已批文案，见 §3.3 更正与详档 audit-catalog-en-consistency-1119.md §3） | P0（简体/CRED 家族，设备声明除外） | live + src |

### 3.3 11-23 行健康检查结果（第 3 轮新增：正文/FAQ/schema 三面一致性闸门）

> 子任务 B 完成（详档 `.hermes/tmp/audit-doujin-ja-consistency-1119.md`，5 URL 串行抓取全 200 + JSON-LD 逐字段）；子任务 A（catalog-en）因 provider 容量失败由主会话补做（详档 `.hermes/tmp/audit-catalog-en-consistency-1119.md`，原始 JSON `.hermes/tmp/audit-catalog-en-live-1119.json`）。

**更正（覆盖第 2 轮 §3.1 行 6 / §3.2 行 5 误判）**：海德堡柯式／HP Indigo 15K B2 信任徽标文案经源定位 = TrustBadgeBlock.tsx L8-11 注释「修訂輪7 **唐總逐字修訂 2026-09-10**」= **K3 已批逐字文案，合法保留**；衍生动作改为 credibility-guard 对该块加白名单豁免（guard FP 复盘），详证 `.hermes/tmp/audit-catalog-en-consistency-1119.md` §3。

**一致面（✓，可交接复测）**：catalog PDP 三面核心字段（Offer MOQ 10=正文 10 pc=US$4.60 ✓，ICC/打样/报价确认措辞在位）；新博客 supplier-guide MOQ 10 ✓；ja 小批量正文层 "confirmed at quote" ×26、"4-day" 0 命中 ✓；¥7,500 ja 正文仅条件化 ✓；Product JSON-LD 5/5 无 Offer/price 字段（无 schema 层价格冲突）。

**红级冲突（4 项，均为裁决漏网面）**：

| # | 冲突 | 源定位 | 性质 |
|---|---|---|---|
| S1 | **ja 小批量 meta "4 日米国配送, 99 ドル以上送料無料"**：与 en 已验收真值（4-day=0）和 ja 自身正文双矛盾；GSC 强承接页（395/4/14.45）meta 与正文口径分裂 | `sku-seo-data.ts:193` | 11-13/14 修复只清了正文层，meta 层漏网（本批最大 AEO 风险） |
| S2b | **免邮口径 4 套并存**：meta 99ドル / body 日本全国送料無料（无条件）/ 面板 $500相当 / FAQ 池 $100 以上米国向け | sku-seo:193/196 + 共享 FAQ 池 | 跨面口径冲突 |
| S3 | **ja doujin meta 无支撑声明**：PUR製本対応／即日発送オプション／DHL 2-4日追跡番号付き，正文均 0 命中 | `sku-seo-data.ts:2605` | D3 红线漏网 |
| S4 | **¥7,500 泄漏 en/zh + 语义相反**：price_range 无 locale 分层三语同渲染（en 面板 "from ¥7,500〜"、zh "單價由 ¥7,500 起／部"）；zh「起／部」（单价）与 ja「1部あたりの単価ではありません」（非单价）相反（D2 红线）；basePrice_en 1245 全站 0 使用 | `products.ts:6696` + `sku-seo:2594` | 价格归属裁决 |

**橙/黄项（登记待批）**：面板包邮门槛三语不一（$99+/$500相当/滿$500）；面板 MOQ "10注文〜" 单位错译；¥69 vs HK$38-196 同页双币；校正时效 2h/1h/无时效三口径；ZPQC-2610-ST 档号未注册 copy-fingerprints.ts（§0.38 指纹体系观察项，归 monthly lane）。

**READY-CANDIDATE（按既批裁决即可执行的漏网清理）**：① catalog PDP 特性卡 "95%+ color accuracy"（category-conversion-blocks.ts L4119 live 实锤 + L4058；另 category-seo-content.ts L4094/L4118）→ 按 D4 既批改 ICC/打样流程；② 旧博客 catalog-printing-guide（blog-data/en.json）"50-book MOQ" ×4（excerpt/正文×2/FAQ Q1）→ 按既批 MOQ 10 对齐（10-28 批只修了 100→10，50 漏网）；③ meta 层时效句冲突（ja 小批量/ ja DJ / en catalog meta DHL 句）与第 1 轮 stickers 类目 meta 4 残留合并为「meta 层真值对齐批」。

### 3.4 摺頁印刷（主 URL folded-leaflets PDP；详档 audit-folded-1119.md）

| # | 差距 | 分类 | 证据 |
|---|---|---|---|
| 1 | 博客→PDP live 路径**未断**（3 处锚文本内链在位）——但**数据层回归**：zh-hk.json L791 / en L782 / ja L775 博客 JSON 含无 locale 前缀 PDP 链 + `/quote/` 无前缀×8，下次 build 生效后仅靠 301 兜底 | **READY-CANDIDATE**（§13.6 链接红线，机械修复） | file:line + live |
| 2 | PDP 价格 4 套口径：title/meta 0.70 vs og/schema 0.45（products.ts L2162）vs 计价器 0.38/張 vs 10 張档 HK$16.10/張（差 23 倍） | **DIAG**（K3 价格裁决） | file:line |
| 3 | PDP FAQPage 9 问中 8 问是传单通用模板（含「燙金傳單」FL-006 语义错配），仅 1 问摺頁专属 | READY-CANDIDATE（FAQ 对齐，无新值引入） | sku-seo-data.ts |
| 4 | 结构性事实：博客 764 imp = PDP 17 倍、pos 7.89 vs 15.2——强承接在博客、弱转化在 PDP 价格与 FAQ 模板层 | 诊断输入 | 网页表 |
| 5 | 正文资产在 sku-seo-data.ts L682-686（六摺法表/克重规则/免費摺頁打樣）；products.ts V18 空壳 L2224-2237 零消费 | 观察 | file:line |

---

### 3.5 11-24 行提前执行：月曆/利是封季节缺口审计（第 4 轮新增，含一项撤回）

> 子任务 2 完成：月曆簇详档 `.hermes/tmp/audit-calendars-1119.md`、利是封簇详档 `.hermes/tmp/audit-redpacket-1119.md`（串行抓取全 200 + 源双方法）；车道消费：18:17 Harness daily OK（貼紙印刷第六窗破 30 线 29.94，六窗累计 -8.12，HOLD 维持但进入 title 评估讨论窗口，建议 11-21 SMALLBATCH 复测窗一并议；SMALLBATCH 复测定档 11-21；nengajo 2027 首点击 1/21/8.43）。

**月曆簇（140/0/20.40 双窗改善）**：MOQ 真值「1 本起」三页在位（无 50/1000 残留）✓；2027 季节四件套（时间表/梯度/打样/报价）三页齐、三角互链基本在位 ✓；PDP 首屏零点击已解（H1 1本起印+HK$3-8/本+CTA 全套）✓。缺口：① 博客层 2 处旧 MOQ 口径残留 + 1 处三角断链（真值已批 → READY-CANDIDATE 攒批）；② 柯式最小批量分裂：product-faqs.ts:671「500 本起」vs complete-guide「300 本起」（DIAG，124b0b11 只定了数码 1 本）；③ 类目页「15,000+ 客戶」无源数字（CRED 观察）；④ 三页⑦均有 WhatsApp 但无显式询价规格清单段；⑤ 博客④缺 PDF/出血/交稿规范段（GAP-6b，类目页版本可复用，随批顺带）。

**利是封簇（59/1/24.27，7d +7.17 分诊）**：
- **撤回声明（§0.23.2）**：子任务曾报「类目页 live 渲染旧文案（500 起訂/智印云/觀塘）」，主会话独立复测（19:4x，cf-cache-status: DYNAMIC，255,974B）不成立：智印云/觀塘/500個起訂/HK$0.8 全部 0 命中，live = 当前 2026-10-13 重写版（title「利是封印刷 100個起…」、智印港 ×69、HK$1.10 ×22）。双方法冲突以复测为准，旧文案假设撤回；保留一行观察：若其它区域边缘节点仍存旧缓存可在下周复验一次。
- 保留发现：① cny-2027 博客官方日期 2/6/2027 与自有履约分离 ✓ 无发明截稿日 ✓；缺口 G1 急件「+30%」簇内无锚（DIAG）/ G2 大号尺寸三口径矛盾 120×200 vs 110×200 vs 100×190（DIAG）/ G3 RP 簇无专色报价选项（DIAG）/ G4 3 条裸路径内链实测 301（READY-CANDIDATE，§13.6）；② pearl-envelopes PDP 与「利是封印刷」意图匹配度低（单品页 vs 泛词无 PDP 级承接，角色分工重定位需 K3，DIAG）；③ nengajo en 页 OK 且首次出点击，但早鸟率/截单日/宛名 3 个 K3 待办占位仍「To be confirmed」且死线 10/21 已过（待 K3 补拍）；④ 分诊输入：主词未丢（三处 title/H1 均含利是封印刷）、类目页无「2027」窗口词（窗口词承接只在博客）、内容变更时间点 9/30-10/2x → 7d 退步归 gsc lane 继续诊断（旧文案假设已撤）。

**新增（主会话）：Footer 能力声明过时**：6745d798 移除附件上传模块后，三语 Footer companyDesc 仍声明「online file upload／オンラインファイルアップロード」能力（Footer.tsx L90/L151），而全站已无上传路径——能力口径一致性缺口，改文案需 K3（src）。

## 4. 食品包裝印刷真实 SERP 取证（11-20 行，weekly 任务证据步骤已完成）

证据记录：`.hermes/logs/serp-evidence-2026-11-19-food-packaging.md`（含受控浏览器截图于会话记录）。

- SERP 内嵌 GSC 小组件「點擊 0 / 展示 125 (+15%) / 平均排名 7.9」与差分 JSON（125/0/7.93）双方法互证。
- 可见序：JoinPrint PackLab（采购型落地页，snippet=自家廠房/低MOQ/FSC/香港餐廳）→ 永翔 efh.hk（食品級安全管理）→ Flexi → **智印港博客《食品包裝印刷完全指南》**（信息型标题）→ Bynock → Mainetti → 永偉 →（下页）麥思 → **智印港「食品包裝訂製 / 食品包裝盒」**（交易页排位低于博客）。
- **AI 概覽存在，引用 JoinPrint +3，我方未引用**（与 W4 探针 0/11 三连轮一致）。
- 三个有界提案（均需审批，title 冻结面不动）：**P-a** 博客首屏加 food-boxes PDP 采购入口 + WhatsApp 规格锚（无 title 改动）；**P-b** food-boxes PDP 直答块对齐 AI Overview 问答结构；**P-c** 博客 title 采购化变体（须 K3 解冻，默认不动）。
- 影响：`GSC-FIX-2026-11-19-87656b1b2c` 的 SERP_UNAVAILABLE 阻塞已解除，weekly 下一轮可产单变量提案或升级 K3 三选一。

---

## 5. 本轮新发现：两个守卫盲区（已按 §0.31 自进化 SOP 入档 error-patterns.md）

| # | 盲区 | 规则名（已入档） | 实测 |
|---|---|---|---|
| 1 | `scan-simplified.mjs` 只扫产品名称 → **description 全域盲区** | `SIMPLIFIED_SCAN_NAME_ONLY_BLIND_SPOT` | 守卫报 0 命中 vs `rg "适配行业" products.ts` = **17 处**（含 en/ja 字段泄漏 + 行业列表简繁双列）；removable PDP live 实锤 |
| 2 | phone-guard 只拦 `+852`/`wa.me/852` 形态 → **裸号字面量盲区** | `PHONE_GUARD_LITERAL_WITHOUT_PLUS_BLIND_SPOT` | `85290616204` 于 6 处组件硬编码（CategorySidebar.tsx L225 / WhatsAppFloat.tsx L45,50 / HotProducts.tsx L203 / QuoteCalculator.tsx L232 / whatsapp.ts L14），运行时拼接 wa.me/85290616204 → 线上 CTA 实际用旧港号 |

配套修复建议（入档待批）：scan-simplified 扫描域扩至 description 族 + blog JSON 客户可见字段；phone-guard 增补裸号正则 `(?<!\d)852\d{8}(?!\d)`；6 处硬编码回白名单 +86 198 8085 1334（src 行为修复，K3 确认 + 攒批）。

---

## 6. 建议裁决顺序与 lane 分工（供 11-20 weekly 周复盘采纳）

**K3 裁决包（一次拍板，按序）**：
1. **MOQ/时效/材质真值统一（可移貼紙簇合并裁决）**：MOQ 10（products.ts minQuantity=10 为结构真值，清 100/50 两处离群）；⑤⑥ 时效数字段（sku-seo-data.ts:146）留/撤 → 统一「以報價確認」主口径；③ 材质三套口径三选一；學校印刷 10 本（:2763 离群值清理）——真值已在 products.ts，属已批口径清理，优先放行；
2. **+852 裸号 6 处回白名单**（P0 红线，机械替换）；
3. **简体 17 处清理 + scan-simplified 扩域**（§13.16.1 最高原则）；
4. **摺頁 PDP 价格 4 套口径裁决**（0.70/0.45/0.38/16.10 谁是真值锚）；
5. **食品包裝印刷提案 P-a/P-b/P-c 三选一**；
6. stickers-en 类目 meta 4 处残留（上一轮 §5 决策包，未决）；
7. **季节簇裁决（§3.5 新增）**：柯式最小批量 500 本 vs 300 本（product-faqs.ts:671 vs complete-guide）二选一；pearl-envelopes PDP 与「利是封印刷」泛词的角色分工重定位；nengajo 早鸟率/截单日/宛名 3 个 TBC 占位补拍（死线 10/21 已过）；Footer companyDesc 三语「online file upload」能力声明随附件模块移除后改写；
8. **貼紙 title 评估讨论窗口（daily 车道 11-19 报告建议）**：第六窗 29.94 破 30 线、六窗累计 -8.12，HOLD 维持；第七窗（11-23）若 ≤27 讨论 title 微调 vs 仅 desc/snippet 单变量——建议 11-21 SMALLBATCH 复测窗一并议。

**攒批候选池（真值已批、无需新裁决，随下一攒批放行）**：§3.3-1 博客 JSON 三语无前缀链回归；§3.5 月曆博客 2 处旧 MOQ + 1 三角断链；§3.5 利是封博客 3 条裸路径 301（G4）；§3.3 95%+ ×4 源、旧博客 50-book MOQ ×4。

**⚠️ 运维红灯升级（20:37 实测）**：20:13 gsc-feedback 自然轮 FAILED——preflight 全过（锁+协同板重建）但 `dsh: QUOTA: Insufficient Balance` 0 秒失败（wrapper 日志实证）。连锁影响：9 个 GSC-MEASURE 恶化词诊断（海報/宣傳單張/喜帖/證書/易拉架/コミケ/教材/小冊子/印刷）今晚未跑；21:17 daily 与 11-20 20:52 weekly 预期同因失败（同一 dsh 凭据）。**K3 充值/换 DeepSeek key = 当前唯一最高优先管理员动作**，晚于一切内容裁决（无执行层则裁决包无法落地）；恢复后 gsc lane 先补跑 9 个诊断任务。

**lane 分工**：daily 消费 §3 清单（11-25 前完成已批项）；weekly 采纳 §4 证据 + §6 裁决包立案；gsc 消费 9 个 GSC-MEASURE 诊断任务（今晚 20:13 起，含利是封 7d 退步诊断：旧文案假设已撤，见 §3.5）；k3 复核 §3.3-1 博客 JSON 链接回归（三语同款）+ 6745d798 已推送验收（CF success ×1 + 三语 contact 页 live 全清，唯一残留 = Footer 能力声明过时，已入 §6-7）。

**复测纪律**：任何执行后 7/14/28d 窗；11-18 变更复测窗未到（7d≈11-25/26）；本包全部为测量/诊断产物，不进胜率统计。

---

## 7. SOP-10 五问自检

1. **架构差异**：主 URL 定标复用 54kw/11-19 文档既有拍板（海报冻结沿用），未重拍未扩权；子任务只做只读审计。
2. **约束适用范围**：零 src 写入；§13.6 链接红线、§13.16.1 简体、§13.10 电话、CRED 家族均为发现登记，修复全部待批。
3. **原数据/拍板来源**：GSC=11-19 导出双方法复算；页面级数据=网页表全量提取；SERP=受控浏览器实抓（GSC 小组件与差分 JSON 互证）；852 裸号=live + 源码双方法互证。
4. **字段值策略**：未拍板价格/MOQ/时效不预填；摺頁价格 4 口径只并列不判真值；提案均为「proposal only」。
5. **Markdown 渲染**：内部决策文档，无 user-facing 渲染改动。

---

## 数据来源（汇总）

- `.hermes/logs/gsc-2026-11-19-money-keyword-delta.json` + 28d 网页表（openpyxl 全量 604 行）
- `.hermes/tmp/audit-removable-1119.md` / `audit-school-1119.md` / `audit-folded-1119.md`（3 并行子任务详档，live 抓取全 200 双方法）
- `.hermes/logs/serp-evidence-2026-11-19-food-packaging.md`（真实 SERP 取证）
- `.hermes/regression-guard/error-patterns.md`（2 条新规则入档，备份 `.hermes/tmp/_bak-error-patterns-1119.md`）
- 源码定位：products.ts（876/888/899/957/1039/1120/2162/2224-2237）、sku-seo-data.ts（143/682-686）、category-conversion-blocks.ts（2660/2763）、blog-data/{zh-hk,en,ja}.json（791/782/775）、whatsapp 族 6 处
- 校准状态：已校准（GSC=11-19；live=11-19 02:2x-03:0x；error-patterns 写入经备份+断言三件套）
