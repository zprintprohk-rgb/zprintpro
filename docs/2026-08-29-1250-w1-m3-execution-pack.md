# W1 两件套 · M3 执行派活包（2026-08-29 12:50 K3 拍板）

> **拍板来源**: K3 8/29 12:50 "这些做战略级动作，然后给到M3做执行"
> **分工铁律**: 本包由 K3 战略层产出**成品级文案与规格**；M3 **只执行、零改文案**。遇任何疑义（字段定位不清/事实冲突/文案疑义）→ 回报 K3，**禁止自行改写**
> **配套战略依据**: [2026-08-29-1214-k3-strategy-eval-master-plan.md](F:\zprintpro-nextjs\docs\2026-08-29-1214-k3-strategy-eval-master-plan.md) V1.1 §1.3/§2.4/§4.2/§6
> **数据诚信 (§0.23)**: 本包全部事实性 claim 均来自已公示页面文案或 K3 拍板记录，逐条标源

---

## §0 派活协议（R4 幂等 + R5 回报，spawn M3 时 verbatim 嵌入）

> BEFORE any other action, run this 3-question idempotency check:
> (1) Does the expected output already exist with non-empty content? (git log 是否已有本包 commit / CategoryPillarContent.tsx 是否已无 "9 維度 SEO 深度標準" 字样 / sku-seo-data.ts 目标字段是否已是本包新文案)
> (2) If yes, is its mtime within the past 24h?
> (3) Does it cover all 3 个子包 (P0 callout 返工 + G1 Title/Meta 6 页 + P1 数据 bug 批修)?
> If ALL yes → return "ALREADY DONE" and exit immediately. If ANY no → proceed.

**回报协议 (R5)**: 完成后写报告到 `docs/2026-08-29-w1-execution-report.md`，给 K3 发 1 行 ack：`W1 两件套 done. Report: <path>. Verdict: <PASS/FAIL/BLOCKER>.` 不在 ack 里复述报告。

**push 规则 (§0.25.9)**: 本包改动与已攒批的 90b688e (blog W2#1) 同批 1 commit 1 push；距上次 push (194d767 07:40) 30 min 硬下限已过；push 前必跑 3 闸门（encoding --fix → tsc --noEmit → build 或关键页 smoke）。

---

## §1 包 1：P0 callout 返工（CategoryPillarContent.tsx L70-93）

### §1.1 问题（1 段）

当前 L70-93 向终端用户展示"本頁面符合 9 維度 SEO 深度標準 ✅ 5-Layer JSON-LD ✅ @id 互引"——工程师自检清单，采购用户零认知、浪费 H2 下黄金位、对 GEO 是噪音（AI 要可引用的事实陈述，不要 SEO 术语自夸）。**容器样式保留（蓝渐变 + 左蓝边是好设计），内容整体替换为「采购决策 4 要素卡 + WhatsApp CTA」。**

### §1.2 成品文案（M3 照抄，0 改动）

**数据驱动设计**：组件已有 `data` prop。在 `src/data/category-seo-content.ts` 每品类加可选字段 `decisionCard: { moq, price, lead, quality }`，有则用品类专属值，无则用全站 fallback。本包先给 **stickers 专属值**（示范品类）+ **全站 fallback**（其余 12 品类自动生效，后续 W2-W3 逐品类补专属值）。

**stickers 品类专属（数据源：分类页浅蓝条已公示文案 "貼紙印刷 50 個起, 防水啞光 HK$0.45/張起, 5-7 天交期, DHL 全球 2-4 天"）**：
- moq: `50 個起印・HK$0.45/張起`
- price: `防水啞光 PVC・15+ 材質`
- lead: `5-7 天交期・DHL 全球 2-4 天`
- quality: `ISO 9001 工廠・FSC 認證紙`

**全站 fallback（数据源：sku-seo-data 各 body 已公示 + AGENTS §1 核心定位）**：
- moq: `100 張起印・無開版費`
- price: `30 秒 AI 報價・價格透明`
- lead: `標準 3-5 天交貨・加急即日`
- quality: `ISO 9001 工廠・FSC 認證紙`

**3 locale 渲染文案（标题行 + CTA 行）**：

| locale | 标题行 | CTA 行 |
|--------|--------|--------|
| zh-hk | `快速決策・採購 4 要素` | `💬 WhatsApp 5 分鐘報價回覆 →`（链接到 WhatsApp CTA） |
| en | `Quick Decision · 4 Buying Facts` | `💬 WhatsApp quote reply in 5 min →` |
| ja | `クイック決断・購買4要素` | `💬 WhatsApp 5分以内見積返信 →` |

**fallback 4 要素 3 locale**：

| 要素 | zh-hk | en | ja |
|------|-------|----|----|
| moq | 100 張起印・無開版費 | From 100 pcs · No setup fees | 100枚から・版代ゼロ |
| price | 30 秒 AI 報價・價格透明 | 30-sec AI quote · Transparent pricing | 30秒 AI 見積・透明価格 |
| lead | 標準 3-5 天交貨・加急即日 | Standard 3-5 days · Rush same-day | 標準3-5営業日・特急即日 |
| quality | ISO 9001 工廠・FSC 認證紙 | ISO 9001 factory · FSC-certified paper | ISO 9001 工場・FSC認証紙 |

### §1.3 实现规格

1. **删除**：L70-93 整块（含"9 維度 SEO 深度標準"标题 + 9 个 ✅ 格）
2. **新增**：同位置渲染决策卡——容器 className 沿用现有（`mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#2873F5] rounded-r-lg p-5`）；内部 2×2 网格（`grid grid-cols-1 sm:grid-cols-2 gap-2`），每格 1 个内联 SVG 图标（沿用站点现有 SVG 风格，**禁 emoji 当图标**）+ 1 行事实文案（`text-sm text-gray-800 font-medium`）；标题行 `text-sm font-semibold text-[#2873F5]`；底部 CTA 行带链接
3. **禁词检查**：无 SEO/JSON-LD/@id/schema 等工程词汇出现在用户可见文本
4. **同步修订**：`C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-content-depth-page-sop\SKILL.md` §2.1.1 代码块替换为决策卡版本（防止旧自夸块被后续任务复活）

### §1.4 验收

- 13 品类页（stickers 为首验）curl 200 + 页面源码含"快速決策"且**不含**"9 維度 SEO 深度標準"
- schema regression：各页 schema 块数不变、0 DUP
- 3 locale 各抽 1 品类页目检渲染

---

## §2 包 2：G1 捡钱词 Title/Meta 重写（成品级 · 6 页）

### §2.1 词→页映射（GSC 实证，as-of 8/28 查询维度 + 8/26 页面维度）

| 词 | 展示/排名/点击 | 落地页 | 28 天页面展示 |
|----|----------------|--------|----------------|
| 食品包裝印刷 | 27 imp / pos 7.0 / 0 点击 | `/zh-hk/product/food-boxes/` | 297 imp |
| small batch sticker printing | 20 / 7.2 / 0 | `/en/product/small-batch-stickers/` | 43 imp |
| small batch custom stickers | 6 / 10.5 / 0 | 同上 | 25 imp |
| 即日印刷 | 11 / 8.8 / 0 | `/zh-hk/services/rush-printing-delivery/` + `/zh-hk/product/same-day-flyers/` | 57 + 51 imp |
| a2 印刷 即日 | 3 / 5.3 / 0 | `/zh-hk/product/a2-posters/` | 13 imp |
| 海報印刷即日 | 8 / 14.1 / 0 | 同上（striking 顺带） | — |

### §2.2 成品 Title/Meta（M3 照抄进 `src/data/sku-seo-data.ts` 对应 seo 字段，0 改动）

**① food-boxes（目标词：食品包裝印刷 / food packaging printing / 食品パッケージ印刷）**

| locale | 字段 | 新值 |
|--------|------|------|
| zh-hk | title | `食品包裝印刷 100個起訂 HK$4起 \| 智印港 ZprintPro` |
| zh-hk | description | `食品包裝印刷訂製：FDA 認可食品級材質 + FSC 認證紙，100 個起印、HK$4 起/個，燙金 UV 全工藝支援。糕點/茶葉/保健品品牌首選，3-5 天交貨、免費 2 小時打稿。30 秒 AI 報價，WhatsApp 即日回覆。` |
| en | title | `Custom Food Packaging Boxes \| 100 MOQ \| ZprintPro` |
| en | description | `Custom food packaging printing with FDA-safe, FSC-certified materials. 100 MOQ, foil & UV finishes, free 2-hour digital proof, free US shipping $99+. 30-second AI quote.` |
| ja | title | `食品パッケージ印刷 \| 100個から・FSC認証 \| ZprintPro` |
| ja | description | `食品パッケージ印刷を100個から小ロット対応。FDA適合・FSC認証紙、箔押し・UV加工、無料2時間デジタル校正。日本全国送料無料、DHLで2-4日納品。30秒無料見積もり。` |

事实来源：HK$4 起/個、100 個起印、FDA/FSC、3-5 天、燙金 UV（现行 zh-hk description 已公示）；free US shipping $99+、free 2-hour proof（现行 en description）；日本全国送料無料、DHL 2-4 日（现行 ja body）。

**② small-batch-stickers（目标词：small batch sticker printing / 小批量貼紙印刷 / 小ロットステッカー印刷）**

| locale | 字段 | 新值 |
|--------|------|------|
| en | title | `Small Batch Sticker Printing \| 50 MOQ \| ZprintPro` |
| en | description | `Custom small batch sticker printing from 50 pcs. No setup fees, free 2-hour proof. Waterproof PVC, die-cut any shape. Free US shipping $99+. 30-second AI quote.` |
| zh-hk | title | `小批量貼紙印刷 50張起 防水PVC \| 智印港 ZprintPro` |
| zh-hk | description | `小批量貼紙印刷 50 張起印，無開版費。防水 PVC / 透明 BOPP / 銅版紙全材質，異形切割 + 燙金 UV 支援。3-5 天交貨，免費 2 小時打稿。30 秒 AI 報價，WhatsApp 即日回覆。` |
| ja | title | `小ロットステッカー印刷 \| 50枚から・防水PVC \| ZprintPro` |
| ja | description | `オリジナルステッカー印刷を50枚から。版代ゼロ、2時間無料デジタル校正、防水PVC・ダイカット対応。日本全国送料無料、DHL 2-4日納品。30秒無料見積もり。` |

事实来源：50 張起（现行 FAQ Q2 "小批量系列可低至 50 張"）；防水 PVC/BOPP/銅版紙、異形切割、燙金 UV、3-5 天（现行 body）。

**③ same-day-flyers（目标词：即日印刷 / 即日傳單）**

| locale | 字段 | 新值 |
|--------|------|------|
| zh-hk | title | `即日印刷 傳單 100張起 HK$0.55起 \| 智印港 ZprintPro` |
| zh-hk | description | `即日傳單印刷 100 張起、HK$0.55 起/張，下午 3 時前落單即日交貨。157-300g 銅版紙全尺寸 A4/A5/A6/DL，雙面四色。免費 2 小時打稿，滿 HK$500 免費順豐。30 秒 AI 報價。` |

事实来源：全部来自现行 description（HK$0.55 起/張、下午 3 時、157-300g、滿 $500 免費順豐）。

**④ a2-posters（目标词：a2 印刷 即日 / 海報印刷即日 / 印海報）**

| locale | 字段 | 新值 |
|--------|------|------|
| zh-hk | title | `A2 海報印刷 HK$10起 1張起印 即日交貨 \| 智印港 ZprintPro` |
| zh-hk | description | `A2 海報印刷 1 張起印、HK$10 起/張，200g 銅版紙 / PP 防水合成紙，Giclée 級 1200 DPI。展覽/門店/地產推廣適用，即日打稿 2 小時。滿 HK$500 免費順豐，30 秒 AI 報價。` |

事实来源：现行 description（1 張起印、HK$10 起、Giclée 1200 DPI）。**注意**：现行 title 有错字"大幅海印"（应为海報），本包顺带修正。

**⑤ rush-printing-delivery 服务页（目标词：即日印刷）**

M3 先定位该页 metadata 字段（`src/app/[locale]/services/rush-printing-delivery/page.tsx` 的 generateMetadata 或对应 messages），按以下来案落地；**若字段结构与预估不同，回报 K3，不自行硬塞**：

| locale | 字段 | 新值 |
|--------|------|------|
| zh-hk | title | `即日印刷 下午3時前落單即日交貨 \| 智印港 ZprintPro` |
| zh-hk | description | `即日印刷服務：下午 3 時前落單即日交貨，傳單/海報/貼紙全品類支援。免費 2 小時打稿，港九新界滿 HK$500 免費順豐，辦公室/港鐵站交收。30 秒 AI 報價，WhatsApp 即日回覆。` |

**⑥ 顺手修（P2，零新投入）**：doujin/同人词（doujin printing 5 imp pos 9.0 已有 1 点击、同人周邊製作 pos 6.8）——按 K3 12:37 个人小买家降权，**不重写**，仅登记在观察清单。

### §2.3 验收

- 6 页 curl 200 + view-source 含新 title
- GSC 重收录申请（URL Inspection → Request Indexing）6 URL
- 7 天后对照：目标词 CTR 破 0（基线：食品包裝印刷 0/27、small batch sticker printing 0/20、即日印刷 0/11）

---

## §3 包 3：P1 数据 bug 批修（同批 commit，转化与富摘要前置条件）

| # | bug | 位置 | 修法 | 严重级 |
|---|-----|------|------|--------|
| 1 | **FAQ Q3 答案渲染为 "undefined"**（用户可见 + FAQ schema 污染） | sku-seo-data.ts a2-posters body（"落單前可以先看打稿嗎？\nundefined"） | 补真实答案（与各 SKU 同构）：`可以 — 提交檔案後 2 小時內提供免費數碼打稿，最多可免費修改 2 次。實物打稿 HK$199，DHL 速遞送達。` | **P0** |
| 2 | ja h1 为英文残句（" no bulk inventory pressure. Perfect for startups" / " safe and eco-friendly..."） | small-batch-stickers / food-boxes 的 ja.h1 | 替换为：`小ロット対応、50枚から。ZprintPro が高品質なステッカー印刷を提供。`（stickers）/ `食品グレード材質で安全・環境対応。ZprintPro の食品パッケージ印刷。`（food-boxes）；**并全量扫描 sku-seo-data.ts 所有 ja.h1 是否同类残缺，报数量后统一修** | **P0** |
| 3 | ja description 叠词"〜〜" + 语义重复句（"小ロットステッカーの小ロットステッカーは"） | small-batch-stickers / food-boxes ja.description | 已由 §2.2 新文案覆盖（重写即修复）；**全量扫描其余 SKU 的 ja description 同类模式，报数量** | P1 |
| 4 | 过期电话 `+852 9810 1133` 共 **36 处**（K3 8/7 拍板 phase-out，统一 +86 198 8085 1334） | sku-seo-data.ts 全部 body | 全局替换为 `+86 198 8085 1334`，替换后 grep 复核 0 残留 | **P0** |
| 5 | faqs 结构化字段空 q/空 a（"q":"專業食品包裝盒服務 \| 智印港","a":""） | food-boxes / small-batch-stickers 等 faqs 数组 | 删除空 q/a 对，或回填真实 Q/A（从 body 常见问题提取）；**先全量统计空 faqs 数量报 K3，再批量修** | P1 |
| 6 | 叠字"即日傳單印刷印刷"、错字"大幅海印" | same-day-flyers zh description / a2-posters zh title | 已由 §2.2 新文案覆盖 | P1 |

**验收**：grep `undefined` / `852 9810 1133` / `〜〜` 在 src/ 下 0 命中（sku 数据范围）；ja h1 全量人工抽检 10 条无英文残句；6 页 FAQ schema 校验通过（Rich Results Test）。

---

## §4 执行顺序 + 验收 + 回报

1. **顺序**：包 3 P0 项（#1/#2/#4）→ 包 2（6 页 title/meta）→ 包 1（callout 返工）→ 包 3 P1 项（#3/#5 全量扫描+批修）
2. **3 闸门**：`node scripts/check-encoding.js --fix` → `npx tsc --noEmit` → 关键页 smoke（build_verifier 或 6 页本地 dev 目检）
3. **push**：与 90b688e 攒批 1 commit 1 push；commit msg 标注 `feat(w1): P0 callout 返工 + G1 捡钱词 title/meta 6 页 + P1 数据 bug 批修 (K3 8/29 12:50 派活包)`
4. **5 步真验收**：git log / raw GitHub 200 / 7 URL curl 200（主页 + stickers 分类页 + food-boxes/small-batch-stickers/same-day-flyers/a2-posters 4 详情页 + rush 服务页）/ schema regression（0 DUP + FAQ 无空 a）/ sitemap mtime
5. **回报**：写 `docs/2026-08-29-w1-execution-report.md` + 1 行 ack（R5）

---

## §5 SOP-10 5 问门禁（本派活包）

1. **架构差异？** 已 Read CategoryPillarContent.tsx L40-119 + sku-seo-data.ts 4 个 SKU 条目原文，字段结构（seo.\<locale\>.title/description）实证存在
2. **约束适用范围？** 只动：组件 L70-93 一块 + sku-seo-data.ts 数据字段 + 服务页 metadata；不碰蓝块以上结构、不碰产品页左右结构、不碰 SKU/文案长文本字段删除（F0 红线）
3. **原数据/拍板来源？** 全部文案事实逐条标源（现行页面已公示文案 / K3 8/7 电话拍板 / K3 12:50 分工拍板）；GSC 数字来自 8/28 + 8/26 双 CSV 实证
4. **字段值策略？** 电话替换为 K3 拍板值 +86 198 8085 1334；不留旧号
5. **Markdown 渲染？** 本包为内部执行文档，无 user-facing [text](url) 渲染面；落站文案均为纯文本

**数据来源**: gsc_data.csv (as-of 8/28) / gsc_page_query.csv (as-of 8/26) / sku-seo-data.ts 原文 Read（8/29 12:50）/ CategoryPillarContent.tsx 原文 Read（8/29 12:14）/ AGENTS.md 真实主体信息 / grep 计数（+852 9810 1133 × 36，sku-seo-data.ts）。

**待校准声明**：① G1 各词 CTR 破 0 的 7 天对照为前瞻目标，非承诺值；② rush 服务页 metadata 字段位置为推断（"待 M3 定位核实"，已在包内标注回报规则）；③ 全量 ja h1 残缺数量、空 faqs 数量为未知，包内已要求 M3 先统计报数再批修。

---

**END OF W1 两件套 · M3 执行派活包**
