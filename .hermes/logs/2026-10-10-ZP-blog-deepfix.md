# ZP-blog-deepfix — 2026-10-10（周六槽位 · 结果总线消费轮 · 当次全量执行, 无简化无延后）

VERDICT: PARTIAL
CONSUMED: run-context-ZP-blog-deepfix.json @ 2026-10-10 00:10:56（preflight ok / lock acquired pid 21040 / this_run_key `37eaab37ee14ebaf` / retry_queue=[] / sibling_lanes=[]） | lane-status.json @ 2026-10-09T15:48:45.210Z（verdict=ATTENTION, problems=10） | lane-results-bus-contract.md @ v1（2026-09-19） | .hermes/cron-prompts/zprintpro-blog-deepfix.md（含 K3-BRAIN-INJECT-2026-10-09 第 -2 优先级） | .hermes/cron-prompts/sop-10-gate.md | GSC数据/index.json（FRESH）
DELIVERED: zprintpro-sku-seo-data.csv, src/data/sku-seo-data.ts（6 greeting-cards SKU 描述 holiday/年賀状 场景句: 4 改 / 2 ALREADY_DONE）, .hermes/logs/2026-10-10-ZP-blog-deepfix.md（本报告）
NEXT: ① host 侧跑 `node scripts/csv-to-sku-seo.mjs`（dry-run）证明 CSV↔TS 幂等（6 个 greeting-cards slug 必须**不**出现在「字节级变化块」）② `npx tsc --noEmit`（54=54）+ `node scripts/guards/blog-quality-12-rules-guard.js --baseline --online --json` + 门童六命令 ③ 线上 curl 6 个 PDP meta description 抽查 ④ 下周六：books/catalog 簇轮换（大脑第 4 条）+ 本报告 §5 三笔挂账（envelopes MOQ 漂移收口 / socialProof 无来源数字 / hreflang 口径待 K3）

**RETRY_OF**: 无 — `run-context.retry_queue = []`（契约 §二.3: 无待重做项，报告不写 RETRY_OF）。
**ALREADY_DONE**: `premium-greeting-cards` / `matte-greeting-cards` 描述**已含** holiday/年賀状 场景（聖誕卡+新年卡 / Xmas+New Year / クリスマス+年賀状）→ 按幂等铁律零改写；greeting-cards 红旗 1 承接段（`841a7260`，ja/en 承接段 + 6 精确锚 + IndexNow）大脑明文「已修复，不重复做」→ 零改写。

---

## SOP-10 5 问门禁（K3 §0.22）

1. **架构差异?（查前序任务实现路径）** ✅
   - 前序实测：`.hermes/logs/2026-09-19-blog-deepfix.md`（本 lane 首跑，verdict 记 OK 但**实际零 src 交付**，且自引入 `zh-hk.json` JSON 损坏 ⇒ `run-context.delivered_files_from_report = []`）；本 run 开工第一件事 = 验证该损坏是否已由 host 回滚。
     - 实测：`grep 'ZDX|ZREAL_TAIL|ZZZDEL1|SONG_ORPHAN_DELETED|ZD_LINE|ZD_OL' src/data/blog-data/` = **0 命中** ⇒ host 已回滚，损坏不复现。**不重做**该回滚。
   - SKU 描述链路实测（本 run 主交付）：`zprintpro-sku-seo-data.csv`（TAB 31 栏，权威域描述）→ `scripts/csv-to-sku-seo.mjs`（K3 2026-09-21 批准的**方案 C 增量合并**生成器；CSV 权威域 = name/title/description/h1/keywords/imageAlt，ts 权威域 = body/faqs）→ `src/data/sku-seo-data.ts` → `getSkuSeo()`（`src/app/[locale]/product/[slug]/page.tsx` L44/L115/L120）→ **PDP `<meta name="description">`（现网 live 字段）**。
   - `category-conversion-blocks.ts` 链路实测：`quickAnswers` / `newFaqs` 为**结构化 `{q,a}` 对象**（非 HTML 串），由 `src/app/[locale]/category/[slug]/page.tsx` L350-L387 **结构化**产出 FAQPage JSON-LD（`a.a` / `f.a`），`CategoryConversionBlocks.tsx` L59/L205 负责渲染 ⇒ 与 `extractFaqFromHtml`（仅作用于 blog `content`，`blog/[slug]/page.tsx` L878-L897 / L1040）**不同链路**（本 run 第 2 项的核心结论）。
2. **约束适用范围?（查 K3 拍板原文）** ✅
   - 大脑 2026-10-09 第 -2 优先级本车道第 1 条明文：「6 SKU 描述补 holiday/年賀状 场景句（**各 ≤1 句，零 title 改动**；数据源改动走 CSV 源头 + 生成器，SOP-5 禁手搓派生）」⇒ 本 run 严格按此：**零 title / 零 H1 / 零 keywords / 零 name / 零 slug** 改动（逐字段回读验证）。
   - §0.0（2026-09-12 解禁块）：本批**未触及名片展示层/SEO 层**——未新增/删除/改名任何名片资产，未动 middleware 301，未批量改写含「卡片」历史内容；仅在既有贺卡 6 SKU 的 `description` 字段**增补场景句**（= 大脑指定的密度补强，非重建）。**观察到**既有贺卡资产内仍有名片期命名/尺寸残留（§5 挂账 5，供 K3 (a)/(b)/(c) 裁决参考，本 run 零改动）。
   - v9.3 §S1（答案块字数断言）：本批**不涉**答案块/FAQ/答案卡 ⇒ 断言不适用（不虚报已跑）。v9.3 §S2（slug 存在性前置校验）：本批未新增任何 slug/链接引用 ⇒ 不适用（下 §3 另列本 run 实际引用面核验）。
   - v9.3 任务 J 红线「不改 slug、不砍页、不回滚已部署 title」：零违反。冻结名单（`zprintpro-en-us-images/` · `_batch*.py` · `Rush*` 8 组件 · `page.redesign.tsx` · `src/services/rush/*`）：**零触及**。
   - §0.32 zh-hk 实体注册禁词：新增 zh-hk 文本 0 命中「深圳 / 518111 / 彩龍印刷包裝有限公司」。
   - v1.2 §①（执行层无战略决策权）：未新增/砍页、未改选题战略、未动预算节奏。
3. **原数据/拍板来源?（3 问）** ✅
   - ① 拍板来源：K3 大脑 2026-10-09（SSoT `docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md` §F-2 本车道重定制 第 1 条 + §C2）+ §0.0 2026-09-12 解禁块。
   - ② 是不是真数据：**是**。本批所有价格/MOQ/尺寸/工艺数字**逐条取自 `src/data/products.ts` BC-001~BC-006 真值**（L172-175 / L269-272 / L368-371 / L466-469 / L562-565 / L660-663），零编造、零估算；GSC 侧本 run **零引用词级数字**（见下「数据来源」声明）。
   - ③ 留/撤：**留** — 未撤任何既有数字/文案；thick/foil 两处「描述桩」（`燙金名片` / `Embossed Business Cards` / `商務名片定制` / `玫瑰金名片` / `Wedding Business Cards` / `聖誕燙金卡`）属既有缺陷**填充**，非撤回。
4. **字段值策略?（certNo/validUntil/issuer 全空）** ✅ 未新增/改写任何 `certNo` / `validUntil` / `issuer`；未引入联系方式变更（沿用站上既有 +86 198 8085 1334 / `wa.me/8619880851334`）。
5. **Markdown 渲染?（`[text](url)` 必须 parseInlineLinks）** ✅ 新增文本零 Markdown 链接语法（纯描述句，无 `[text](url)`）⇒ `parseInlineLinks()` 不适用；无 Rule 5 风险。

**门禁结论**: 5 问全过。

---

## 数据来源（K3 §0.23 强制 / §I.2 三段必含）

```
数据来源:
- K3 大脑指令: docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md（2026-10-09；§F-2 本车道 4 条 + §C2 + Part A 10/11 表）
- 价格/MOQ 真值: src/data/products.ts BC-001~BC-006（L147-700，本 run 逐行回读 2026-10-10）
   HK$100-180 / 120-220 / 180-320 / 140-260 / 110-190 / 100-170（每 100 張）；minQuantity 10；basePrice_ja 20/23/35/27/21/20；127×178mm 或 90×54mm（规格冲突见 §5）
- 交付链路实测: zprintpro-sku-seo-data.csv（TAB 31 栏，L67-72）+ src/data/sku-seo-data.ts（L2725-2940）+ scripts/csv-to-sku-seo.mjs（方案 C 增量合并 + 断言 A-E）
- 业务总线: .hermes/logs/run-context-ZP-blog-deepfix.json（2026-10-10 00:10:56）+ .hermes/logs/lane-status.json（2026-10-09 23:48）+ .hermes/logs/lane-runs.jsonl（19 条）+ .git/logs/HEAD（591 行, HEAD=c32931c8）
- 同日后台证据（只读, 未改写）: .hermes/logs/2026-10-09-ZP-daily-content.md / .hermes/logs/2026-10-10-ZP-gsc-feedback.md / .hermes/logs/2026-10-10-ZP-weekly-meta.md / .hermes/logs/2026-10-10-gsc-suggested-src-fixes.md
- GSC 新鲜度: GSC数据/index.json（lastBuild 2026-10-10T22:43+08:00; latestFreshData 2026-10-09; stalenessDays 1; freshnessStatus FRESH < 72h 门）
- 线上探针（web_fetch, 本 run 3 条, HTTP 200）: /en/category/envelopes/ · /ja/category/envelopes/ · /ja/category/flyers/
- 环境: pwsh 工具在本 lane 沙箱被禁（v9.4 rearm 2026-09-14 环境注记, 明示不重试）⇒ node/git/curl/tsc/build/门童命令**均未在 lane 内运行**, 由 host-side wrapper 执行；不虚报 PASS。

校准状态: ✅ GSC 侧已校准（数据日 2026-10-09 / stalenessDays=1 / FRESH）；**本 run 未消费任何 GSC 词级数字**（本 lane 无 node 不可解析 xlsx；主交付为大脑指定题，不依赖 GSC 选词）⇒ 交付文本内零 GSC 数字、零后台黑话（门童 #16 语义自检通过）。
撤回声明: 无（本 run 未撤回任何前序报告；对 §5 挂账 1 提出**口径更正请求**：大脑 §C2「新块 FAQ 是否过 extractFaqFromHtml」的前提与实测链路不符，见 §4）。
```

### §I.1 4 口径对照表（per §0.33.1，本报告含 SKU/blog 类数字 → 必填）

| 口径 | 真实数量 | 类型 | 本报告何处使用 |
|------|---------|------|----------------|
| zh-hk.json unique slugs | 79 | zh-hk 页面内容 | 未使用（本批零 blog 改动） |
| en.json unique slugs | 80 | en 页面内容 | 未使用 |
| ja.json unique slugs | 80 | ja 页面内容 | 未使用 |
| blog-posts.ts SSoT entries | 85 | SSoT 配置 | 未使用 |
| **本批目标 SKU（greeting-cards）** | **6** | `products.ts` BC-001~BC-006 实测 | §2 |
| **本批实际改写描述** | **4 / 6**（2 已达标 ALREADY_DONE） | CSV + TS 逐行回读 | §2 |
| **实际改动文件** | **2**（CSV 源头 + TS 派生） | 仓内实测 | §2 / §6 |

> 上表 79/80/80/85 为 §I 已于 2026-09-02 09:00 校准的**继承值**，本 run 未复算（不涉篇数结论），故只列不用。

---

## 1. 任务清单执行状态（大脑 4 条 × 当次全量, 无简化无延后）

| # | 大脑第 -2 优先级任务 | 状态 | 证据 |
|---|----------------------|------|------|
| 1 | **greeting-cards 簇深修**：6 SKU 描述补 holiday/年賀状 场景句（各 ≤1 句，零 title；走 CSV 源头 + 生成器） | ✅ 完成（4 改 / 2 已达标） | §2（CSV + TS 双向逐行回读） |
| 2 | **新块 FAQ regex 格式扫描**：envelopes:en / envelopes:ja / flyers:ja 过 `extractFaqFromHtml` 可解析性 + 线上 FAQPage JSON-LD 资格 | ✅ 完成（结论 = **前提不成立（非 blog HTML 链路）**；实际风险面已按正确链路复核） | §3（链路实测 + 3 条线上探针 + JSON-LD 生成点 L350-387） |
| 3 | **千问 P0 技术底座复核（只读）**：hreflang 三向对称 + Organization sameAs ×3 locale + 独立 canonical | ✅ 完成（只读；缺陷入报告挂账，未擅自修） | §4（4 个模块逐行实测 + 挂账 1-4） |
| 4 | 后续周六簇轮换：books/catalog → packaging → posters | ⏭ 排程信息（本轮不执行） | 已写入 NEXT |

> **未做且不做的项（有据不自作）**：任何 title/H1/keywords/name/slug 改动（大脑「零 title 改动」+ v9.3 任务 J churn 红线）；`src/data/blog-data/*.json` 写入（见 §6 跨车道避让）；middleware 301；`products.ts` 规格字段；`.hermes/sku-keyword-gsc-map.json` / `industry-keyword-matrix.json` 回灌（今日已被兄弟车道改写）。

---

## 2. 任务 1 交付明细 — greeting-cards 6 SKU 描述（CSV 源头 + TS 派生同步）

**改动原则**：① 只动 `description`（SEO描述 ZH/EN/JA 三栏）；② 每 SKU 的 holiday/年賀状 场景**≤1 句**；③ 全部数字 = `products.ts` 真值；④ 中文用繁体、ja 用日文、en 纯 ASCII；⑤ 不新增 `/`「A/A」式重复（门童 #20 规则 B）、不新增 ellipsis（门童 #17）、不新增简体字形（门童 #4）、不出现 `US$`（门童 #4 I18N_CURRENCY 口径）。

### 2.1 改动前 → 改动后（逐 SKU × 3 locale）

| SKU (products.ts ID) | locale | 改动前 `description` | 改动后（新增 holiday/年賀状 场景句以 **粗体**） | 判定 |
|---|---|---|---|---|
| `thick-greeting-cards-400g` (BC-002) | zh-hk | `燙金名片`（描述桩） | **超厚 400g 賀卡印刷：高克重卡紙手感厚實、儀式感強。127×178mm 標準，10 張起印 HK$1.2 起。可配燙金、局部 UV、壓紋工藝，適合新年賀卡、聖誕卡、婚禮邀請及企業里程碑祝賀，免費設計打稿、即日報價，量大優惠歡迎 WhatsApp 查詢。** | ✅ 改 |
| 同上 | en | `Embossed Business Cards` | **Thick 400g greeting cards: heavyweight, rigid cardstock with a premium hand-feel. 127×178mm, 10-card MOQ, from HK$1.2 per card. Add foil stamping, spot UV or embossing. Ideal for New Year cards, Christmas cards, wedding invitations and corporate milestones. Free proof, quick quote.** | ✅ 改 |
| 同上 | ja | `商務名片定制`（简体污染桩） | **厚口400gグリーティングカード印刷：厚手のカード紙による重厚な手触り。127×178mm標準、10枚から、1枚¥23〜。箔押し・部分UV・エンボス加工に対応し、年賀状、クリスマスカード、結婚式の招待状、企業記念カードに最適。無料デザイン校正、即日見積もり、大量注文は割引対応。** | ✅ 改 |
| `foil-greeting-cards` (BC-003) | zh-hk | `玫瑰金名片`（描述桩） | **燙金賀卡印刷：300g 銅版紙配金、銀、玫瑰金金屬燙金層，光線下呈現細緻光澤。127×178mm 標準，10 張起印 HK$1.8 起。適合新年賀卡、聖誕卡、婚禮邀請與感謝卡，可配局部 UV、壓紋升級，免費設計打稿、即日報價，量大優惠歡迎 WhatsApp 查詢。** | ✅ 改 |
| 同上 | en | `Wedding Business Cards` | **Foil-stamped greeting cards: 300gsm coated stock with gold, silver or rose-gold metallic foil for a luminous finish. 127×178mm, 10-card MOQ, from HK$1.8 each. Ideal for New Year cards, Christmas cards, wedding invitations and thank-you cards. Free proof, quick quote.** | ✅ 改 |
| 同上 | ja | `聖誕燙金卡`（繁中污染 ja 槽） | **箔押しグリーティングカード印刷：300gコート紙に金・銀・ローズゴールドの箔を施し、光を受けて美しく輝く仕上がり。127×178mm標準、10枚から、1枚¥35〜。年賀状、クリスマスカード、結婚式の招待状、サンキューカードに最適。無料デザイン校正、即日見積もり、大量注文は割引対応。** | ✅ 改 |
| `spot-uv-greeting-cards` (BC-004) | zh-hk | …適用生日卡、聖誕卡、產品宣傳卡及品牌賀卡… | …適用生日卡、聖誕卡、**新年卡**、產品宣傳卡及品牌賀卡… | ✅ 改（1 句内） |
| 同上 | en | …Birthday, Christmas & brand. | …Birthday, Christmas, **New Year** & brand. | ✅ 改 |
| 同上 | ja | …誕生日・クリスマス・ブランドカードに最適… | …誕生日・クリスマス・**年賀状**・ブランドカードに最適… | ✅ 改 |
| `rounded-corner-greeting-cards` (BC-006) | zh-hk | …適用生日卡、聖誕卡、感謝卡及品牌宣傳卡… | …適用生日卡、聖誕卡、**新年卡**、感謝卡及品牌宣傳卡… | ✅ 改（1 句内） |
| 同上 | en | …Birthday, Christmas & thank-you cards. | …Birthday, Christmas, **New Year** & thank-you cards. | ✅ 改 |
| 同上 | ja | …誕生日・クリスマス・感謝・記念カードに最適… | …誕生日・クリスマス・**年賀状**・感謝・記念カードに最適… | ✅ 改 |
| `premium-greeting-cards` (BC-001) | 3 locale | 已含 `聖誕卡、新年卡` / `Xmas, New Year` / `年賀状` | **零改写** | ⏭ ALREADY_DONE |
| `matte-greeting-cards` (BC-005) | 3 locale | 已含 `聖誕卡、新年卡` / `Xmas, New Year` / `年賀` | **零改写** | ⏭ ALREADY_DONE |

**真实数字来源逐条对照（§0.23 数据来源行内嵌）**：

| 写入值 | products.ts 依据 |
|---|---|
| thick zh `10 張起印 HK$1.2 起` / en `10-card MOQ, from HK$1.2` | BC-002 `minQuantity: 10` + `price_range: 'HK$120-220/100張'`（L269, L179 同型） |
| thick ja `10枚から、1枚¥23〜` | BC-002 `basePrice_ja: 23`（L272） |
| foil zh `10 張起印 HK$1.8 起` / en `10-card MOQ, from HK$1.8` | BC-003 `price_range: 'HK$180-320/100張'`（L368） |
| foil ja `10枚から、1枚¥35〜` | BC-003 `basePrice_ja: 35`（L371） |
| `127×178mm`（6 SKU 全用） | BC-001~006 `specs.size` / CSV 既有口径 |
| `300g 銅版紙`（foil）/ `400g`（thick）/ 燙金・局部UV・壓紋 | BC-001 `specs.material` + BC-002/003 `features`（L157-171 型） |

### 2.2 写入方式与 SOP-5 例外留痕（**必须 host 复核**）

- 源文件：`zprintpro-sku-seo-data.csv`（L67/L68/L69/L70/L71/L72 六个 TAB 行）——**8 次外科式 edit**（2 次 TAB 锚定三栏描述块 + 6 次句内片段替换）。
- 派生文件：`src/data/sku-seo-data.ts`（L2770/2777/2784/2806/2813/2820 描述桩替换 + L2842/2849/2856/2914/2921/2928 片段替换）——**12 次 edit**，与 CSV 逐字一致（双向回读验证）。
- **SOP-5 例外（留痕，非图方便）**：`csv-to-sku-seo.mjs` 是「改 CSV → 跑生成器」的标准路径，但本 lane pwsh/node 被禁（环境注记明示不重试）⇒ 无法执行生成器。按 `docs/2026-09-20-sku-seo-data-regen-hazard-and-sop5-exception.md` §三 已确立的例外模式（**改 CSV（源头）+ 同步 TS（派生），以前后断言保护**）执行，并**同时**满足两手：
  1. **CSV 权威域与 TS 现值逐字对齐** ⇒ 生成器 dry-run 的断言 A-E 应全 PASS；
  2. **零 title / 零 keywords / 零 name / 零 body / 零 faqs 改动** ⇒ 不触生成器的 ts 权威例外域与漂移闸。
- **host 验证指令（可直接粘贴, 判据唯一）**：
  ```bash
  # ① CSV↔TS 一致性（生成器自带断言 A-E: 锚位/ key 数守恒 / ts-only 逐字 / body+faqs 保留 / 全量重解析一致）
  node scripts/csv-to-sku-seo.mjs
  # 判据: 输出 "[gen] 断言 PASS" 且「字节级变化块」中【不出现】
  #   premium/thick/foil/spot-uv/matte/rounded-corner-greeting-cards 这 6 个 slug
  #   （若出现其他 slug = 既有 title 漂移, 与本批无关, 按生成器 WARN 提示另行处置）
  # ② 类型 + 门童
  npx tsc --noEmit
  node scripts/guards/i18n-guard.js && node scripts/guards/meta-description-guard.js \
    && node scripts/guards/gsc-leak-guard.js && node scripts/guards/ce-truncation-guard.js
  # ③ 线上（部署后）6 个 PDP meta 抽查
  for u in /zh-hk/product/thick-greeting-cards-400g/ /en/product/thick-greeting-cards-400g/ /ja/product/thick-greeting-cards-400g/ \
           /zh-hk/product/foil-greeting-cards/ /en/product/foil-greeting-cards/ /ja/product/foil-greeting-cards/; do
    curl -s "https://zprintpro.com$u" | grep -o '<meta name="description"[^>]*>' ; done
  # 预期: thick 三语含「超厚 400g/Thick 400g/厚口400g」+「新年賀卡/New Year/年賀状」
  ```

### 2.3 lane 内自检（本 run 实做, 非纸面）

- [x] **6 个 slug 的 `description` 唯一性前置校验**：12 条 needle 在 TS 内各 **1 命中**（grep 实测 L2770/2777/2784/2806/2813/2820 + L2842/2849/2856/2914/2921/2928）。
- [x] **CSV 列对齐校验**：thick/foil 用 **TAB 锚定 9 栏序列**替换（`400g名片×3 + 描述×3 + 新年名片/Wedding Business Cards/高級名片印刷`），回读确认 keywords(8-10) 与 h1(14-16) **逐字未动**。
- [x] **文件完整性**：`sku-seo-data.ts` = 3342 行（改动前后一致，`};` + `getSkuSeo` 尾部完好）；`zprintpro-sku-seo-data.csv` = 92 行（未增删行）。
- [x] **门童 #20 规则 B 预检**：新增文本零 `X/X`、零 `X…/X` 形态（无 `/` 与 `／`）⇒ 不新增 META_DESCRIPTION_INTEGRITY 命中（该文件基线容许 44，本批只减不增）。
- [x] **门童 #4 预检**：新增 zh-hk 文本逐字对照 `SIMP_ZH`（含 2026-09-19 扩集）零命中；新增 ja 文本零命中 `SIMP_JA`（`状` 在 `JA_SHINJITAI` 排除表内，ja「年賀状」合法）；新增 en 文本零 CJK。
- [x] **门童 #4 I18N_CURRENCY**：新增文本零 `US$`/`USD`/`JPY`/`￥`（en/ja 用 HK$ 与 ¥ 真值）。
- [x] **门童 #17 ce 截断**：新增文本零基线残缺 token。
- [x] **门童 #16 GSC 泄漏**：新增文本零 GSC 后台黑话。
- [ ] **tsc / build / 门童 exit 0 / 线上 curl**：⛔ **未执行**（pwsh 禁用）⇒ 不虚报；已转为 host 可粘贴命令（§2.2）。

---

## 3. 任务 2 交付明细 — 新块 FAQ 格式 / FAQPage 收录资格

**大脑原文（SSoT §C2）**：「新块 FAQ regex 格式扫描（envelopes:en / envelopes:ja / flyers:ja **新 FAQ 是否过 extractFaqFromHtml**）→ category-conversion-blocks.ts → FAQPage JSON-LD 收录资格」。

### 3.1 实测结论：**前提不成立**（链路错配），实际风险面为零

| 项 | 实测证据 | 判定 |
|---|---|---|
| `extractFaqFromHtml` 的作用域 | `src/app/[locale]/blog/[slug]/page.tsx` L878-L897 定义，**唯一调用点 = L1040 `extractFaqFromHtml(post.content)`**（blog 正文 HTML） | 只作用于 **blog `content` HTML** |
| 3 个目标块的数据形态 | `category-conversion-blocks.ts` L2365 `flyers:ja` / L3470 `envelopes:en` / L3596 `envelopes:ja`：`quickAnswers[]` 与 `newFaqs[]` 均为 **`{q, a}` 结构化字符串**，**零 HTML 标签、零 `Q1:`/`A:` 内联标记、零 `<p class>`** | 不走 HTML 正则链路 |
| 这 3 个块的 FAQPage 生成路径 | `src/app/[locale]/category/[slug]/page.tsx` L350-L387：`quickFaqs = getConversionBlocks(slug, locale)?.quickAnswers` + `extraFaqs = getConversionFaqs()`（= `newFaqs`）→ **结构化**拼 `mainEntity`（`acceptedAnswer.text = a.a` / `f.a`，L369/L382）→ `<JsonLd data={{'@type':'FAQPage', mainEntity}} />`（L386）；`mainEntity.length === 0` 才 return null（L385） | **结构上保证 FAQPage 产出**（只要块存在且 q/a 非空） |
| 线上实证（web_fetch 2026-10-10） | `/en/category/envelopes/` **HTTP 200** 正文渲染 3 条 `envelopes:en` quickAnswers（US$0.14/0.18/0.28/0.46、100 pcs、C4 229×324mm）；`/ja/category/envelopes/` **HTTP 200** 渲染 3 条 `envelopes:ja` quickAnswers（¥20/25/39/64、100枚、C4）；`/ja/category/flyers/` **HTTP 200** 渲染 **4 条** `flyers:ja` quickAnswers（含 E4「特急・即日チラシ印刷の料金はいくら？」） | 3/3 块**已挂载上线**、FAQ 数据被消费 |
| 结论 | ① 三个新块的 FAQ **不存在** `<li>` / `<p class>` / 缺 `A:` / 答案另起 `<p>` 四类静默失败形态（因其非 HTML）；② FAQPage JSON-LD 由同源字段**结构化**产出，与 blog 的 regex 风险**完全不同源**；③ ⇒ 大脑 §C2 的「过 extractFaqFromHtml」判据**不适用**，应改为「块级 q/a 非空 + category 页 JSON-LD 生成点覆盖」——本 run 已按后者复核并全过 | ✅ **风险面 0；无需修复** |

### 3.2 ⚠️ 顺带查出的**次生事实**（非本批任务, 但直接影响 10/10 批次的处置建议）

- **`categoryConversionBlocks[].title` 与 `.metaDescription` 是死字段（0 线上效果）**——本 run 三方证据：
  1. `/ja/category/flyers/` 线上 `<title>` = `A5 チラシ印刷 10枚〜・両面カラー・即日対応 | ZprintPro`，而块内 `title` = `チラシ印刷 | フライヤー印刷・チラシ作成 | A6〜A3 100枚から 即日特急対応｜ZprintPro`（L2368）⇒ **块 title 未上 head**；category head 由 `src/lib/seo.ts#generateCategoryMetadata`（L812/L864-L877）产出。
  2. 同型：块 `metaDescription`（L2369 起）与本 run 线上正文/摘要不一致。
  3. 与 `.hermes/logs/2026-10-10-ZP-weekly-meta.md` §4「`.metaDescription` 死字段」结论**同向**（该轮已就此上报 K3 口径更正请求）。
  ⇒ **落地建议**：`flyers:ja` 块内 title「100枚から」属**死字段残留**，不构成线上 MOQ 漂移（线上 title 已是 10枚〜）；10/10 批次若继续在块的 `title`/`metaDescription` 上做工 = **零 ROI**，应改在 `src/lib/seo.ts` 的 live 字段（但今日该文件已被兄弟车道改写 ⇒ 见 §6 避让）。
- **同页 MOQ 自相矛盾（P1, 需收口, 本 run 未擅自修）**：`/en/category/envelopes/` 与 `/ja/category/envelopes/` 的新块 quickAnswers 说 **100 pcs / 100枚 MOQ**（与 product 卡 `[MOQ] 100 個` 一致），但**同页**「Why ZprintPro」与「Technical Specifications」段仍写 **`500 pcs minimum (digital printing)` / `500枚から（デジタル印刷）`**、「From 500」⇒ 同页两套 MOQ 并存（经典 MOQ 漂移形态）。来源指向 category 页正文数据源（非本批文件）。
- **无来源数字 2 处（§0.23 红线观察项, 不擅改）**：① `flyers:ja` `socialProof` 含 `+22%`（label「2026年上半期のチラシ問い合わせ伸び率」，**无来源**）；② 类目页公共组件文案「Trusted by 15,000+ customers」/「15,000人以上のお客様に選ばれています」（客户数, 与 K3 8/19 拍板「1,000+ 客户」口径不同）。⇒ 建议下一批核对后收口或补来源。

---

## 4. 任务 3 交付明细 — 千问 P0 技术底座只读复核（缺陷入报告挂账, 未擅修）

### 4.1 hreflang 三向对称（en↔ja↔zh-HK, 语言码 zh-HK 非 zh-TW, jp→ja）

| 模块 | 产出 tag 集 | 路径感知 | 消费者 |
|---|---|---|---|
| `src/lib/seo.ts#generateHomeMetadata` L344-353 | `zh-Hant-HK`→/zh-hk/ · en-US/GB/AU→/en/ · **`ja`**→/ja/ · x-default→**/zh-hk/** | ✅（首页） | 首页 |
| `#generateCategoryMetadata` L867-876 | `zh-Hant-HK` · en-US/GB/AU · **`ja`** · x-default→/zh-hk | ✅ 含 slug | 类目页（live） |
| `#generateProductMetadata` L960-969 | 同上（含 slug） | ✅ | PDP（live） |
| `#generateQuotePageMetadata` L1688-1696 | `zh-Hant-HK` · en-US/GB/AU · **`ja`** · x-default→/zh-hk | ✅ /quote/ | 报价页 |
| `#generateHreflangTags` L1702-1712 | **`zh-HK`** · en-US/GB/AU · **`ja`** · x-default→/zh-hk | ✅ | **0 消费者**（仅定义） |
| `src/lib/metadata.ts#createMetadata` L19-29 | `zh-Hant-HK`→**/zh-hk** · en-US/GB/AU→**/en** · **`ja`**→**/ja** · x-default→**/en** ❌ | ❌ **写死 locale 首页, 丢 slug** | **`/guide/[slug]`**（`guide/[slug]/page.tsx` L35） |
| `src/lib/hreflang.ts#generateHreflangTags` L20-76 | `zh-HK` · en-US/GB/AU/**CA** + 通用 `en` · **`ja-JP`** · x-default→/zh-hk | ✅ | **0 消费者（死代码）** |

**判定**：
- ✅ **三向对称成立**（live 4 个 page-family 每页都同时发 zh-hk + en ×3 区域 + ja, 且各自 canonical 自指, 无跨语言 canonical）。
- ✅ **无 `zh-TW`**（全站 grep 0 命中）；✅ **无 `jp` 语言码**（只有 `ja` / `ja-JP`）。
- 🔴 **挂账 1（P1, src 行为变更, 须 K3/攒批）**：`/guide/[slug]`（pillar 指南页族）经 `createMetadata` 产出 hreflang，**全部指向 locale 首页而非当前 guide 页**，且 **x-default → `/en`**（与 §5「x-default=zh-hant-HK/zh-hk」及 §0.36.3 缺口 #2 口径冲突）⇒ 该页族 hreflang 信号无效化。修法建议（不在本 lane 执行）：`createMetadata` 接 `path` 参数或改调 `seo.ts` 的 path-aware 生成器。
- 🟠 **挂账 2（P2 口径债）**：同一 locale 有**两套语言码**并存 —— `zh-Hant-HK`（seo.ts/metadata.ts）vs `zh-HK`（types/locale.ts `hreflangMap` + hreflang.ts）；`ja`（live）vs `ja-JP`（hreflangMap/hreflang.ts）。建议单源化（K3 §0.36.3 缺口 #2 一并裁）。
- 🟡 **挂账 3（P3 清理）**：`src/lib/hreflang.ts` **死代码**且含第 4 套不一致集合（多 `en-CA`、通用 `en` 仅 en 页发）；若将来接线会再引入一套口径 ⇒ 建议标废弃或删除（需 K3 同意）。

### 4.2 Organization schema sameAs ×3 locale

| 项 | 实测 | 判定 |
|---|---|---|
| 主节点 `generateOrganizationSchema(locale)`（`seo.ts` L1755-L1795） | `sameAs = ['https://twitter.com/zprintpro','https://linkedin.com/company/zprintpro','https://github.com/zprintprohk-rgb','https://github.com/zprintprohk-rgb/zprintpro']`（L1783-1785，与 locale 无关 = 三语一致） | ✅ 真链接 4 条 |
| 三语覆盖 | 首页 `src/app/[locale]/page.tsx` L9/L57 `generateOrganizationSchema(locale)` —— `[locale]` 参数化 ⇒ zh-hk/en/ja **三语各发一次** | ✅ ×3 |
| 另一路径 `generateBusinessJsonLd(locale)`（L1000-L1033） | `sameAs: nap.sameAs.length > 0 ? nap.sameAs : []`（L1030-1032 注释「改为空, 不传假链接」）⇒ **恒空** | 🟠 **挂账 4**：§0.36.3 缺口 #1「Organization sameAs 空壳」在 G1 v9.2.3 后**只解了一半**（首页 Organization 节点已填；business/LocalBusiness 节点仍空）⇒ 同一实体两处 sameAs 不一致, 建议 K3 裁一处口径 |
| `generateOrganizationJsonLd()`（L1091-1093） | 硬编码 `generateBusinessJsonLd('zh-hk')`（向后兼容包装） | 🟡 建议标废弃（同挂账 3 类） |

### 4.3 独立 canonical

- ✅ 首页 `/locale/`（L345）、类目 `/locale/category/slug/`（L868）、PDP `/locale/product/slug/`（L961）、报价 `/locale/quote/`（L1688）、`createMetadata`（`seo.canonical`）**全部 per-locale 自指**，无跨语言 canonical 指向 ⇒ §15「canonical 不指向跨语言」达标。
- 🟠 唯一例外 = 挂账 1 的 `/guide/[slug]`（canonical 用 `seo.canonical`，取决于 pillar 数据；hreflang 侧已错，canonical 侧未发现错指，但同族风险同源）。

### 4.4 探针能力边界（诚实声明, 对应契约 §四）

- `web_fetch` **不回传 `<head>`**（本 run 实测：3 个 URL 只回传 title + 正文, 无 `<link rel="alternate">` / 无 `<script type="application/ld+json">`）⇒ **本 lane 无法用线上探针直接验证 hreflang / FAQPage JSON-LD 的 head 输出**, 上表结论均为**代码级实测**（文件 + 行号）。**不虚报「线上已验证」**。host 侧建议探针：
  ```bash
  curl -s https://zprintpro.com/ja/category/flyers/ | grep -oE '<link rel="alternate"[^>]*>|"@type":"FAQPage"'
  curl -s https://zprintpro.com/en/category/envelopes/ | grep -c '"@type":"FAQPage"'
  curl -s https://zprintpro.com/en/guide/<任一 slug>/ | grep -oE '<link rel="alternate"[^>]*>'   # 验证挂账 1
  ```

---

## 5. 挂账清单（本轮不改, 交 K3 / 下一批）

| # | 级别 | 项 | 证据 | 建议 |
|---|---|---|---|---|
| 1 | 🔴 P1 | `/guide/[slug]` hreflang 指向 locale 首页 + x-default→/en | `src/lib/metadata.ts` L19-29；消费者 `guide/[slug]/page.tsx` L35 | K3 裁后单批修（src 行为变更） |
| 2 | 🟠 P2 | hreflang 语言码两套并存（zh-Hant-HK/zh-HK；ja/ja-JP） | `types/locale.ts` L16-20 vs `seo.ts` L347/L351 vs `hreflang.ts` L47/L42 | 与 §0.36.3 缺口 #2 合并裁决, 单源化 |
| 3 | 🟡 P3 | `src/lib/hreflang.ts` 死代码 + 第 4 套不一致集合（en-CA/通用 en） | 全仓 grep: 0 消费者 | 标废弃或删除 |
| 4 | 🟠 P2 | Organization sameAs 双口径（首页已填 4 真链 / business 节点恒空） | `seo.ts` L1783-1785 vs L1030-1032 | 一处口径统一（§0.36.3 缺口 #1 收口） |
| 5 | 🟡 P3 | 既有贺卡资产内的名片期残留（不擅改, 供 §0.0 (a)/(b)/(c) 参考）：`products.ts` BC-001 `variables.sizes` = `90×54mm`/`65×65mm`（名片尺寸）与同 SKU `specs.size` = `127×178mm` **自相矛盾**；CSV L68/L69 名称仍为「超厚名片 (400g)」「燙金名片」 | `products.ts` L211-214 vs L168；CSV L68-69 | **等 K3 就 §0.0 展示层 (a)/(b)/(c) 拍板**，拍板后单批收口（**本 run 零改动**） |
| 6 | 🔴 P1 | `/en/category/envelopes/` + `/ja/category/envelopes/` **同页 MOQ 自相矛盾**（新块 100 pcs vs Why/Specifications 段 `500 pcs minimum` / `500枚から`；ja 单价 `HK$0.15／枚` vs en `US$0.02/pc`） | web_fetch 2 页正文（2026-10-10） | 下一批定位 category 正文数据源后收口 |
| 7 | 🟠 P2 | 无来源数字（§0.23）：`flyers:ja` socialProof `+22%`「チラシ問い合わせ伸び率」；类目页「Trusted by 15,000+ customers」/「15,000人以上」 | `category-conversion-blocks.ts` L2402-2403；web_fetch 正文 | 撤除或补真实来源（K3/运营裁） |
| 8 | 🟡 P3 | 块内 `title` / `metaDescription` 为死字段（0 线上效果） | 本报告 §3.2 三方证据 | 10/10 批次改在 live 字段（`src/lib/seo.ts`）而非块字段 |

---

## 6. 结果总线消费记录（契约第 -1 优先级）

1. **幂等键**：本轮 `37eaab37ee14ebaf`（lane|intent|target|day）≠ `previous_run.idempotency_key`（`152fae94b2081d68`，2026-09-19）⇒ 换天 = 新工作（合法）；`lane-status.warnings` 无 `DUPLICATE_IDEMPOTENCY_KEY`。
2. **retry_queue 处置**：`run-context.retry_queue = []` ⇒ 无 RETRY 项, 报告不写 `RETRY_OF`（契约 §二.3）。
3. **verdict=OK 的已完成项（不重做）**：① `premium/matte-greeting-cards` 描述（已含 holiday/年賀状）→ `ALREADY_DONE`；② greeting-cards 红旗 1 承接段（`841a7260`）→ 大脑明文不重复做；③ 2026-09-19 lane 的 `zh-hk.json` 损坏 → 实测已回滚（0 命中）→ 不重做回滚。
4. **不重犯（契约 §二.5）**：`previous_run.guard.ok = true`（无拦截项）；但**上轮的真实教训 = `blog-data/*.json` 单行值内写多段插入会把真换行写进 JSON**（`.hermes/logs/2026-09-19-blog-deepfix.md` §六）。本 run **完全避开该风险面**：主交付落在 `sku-seo-data.ts`（pretty-printed 多行 TS）与 CSV（TAB 行式），**零 blog-data 写入**；且 CSV 编辑用 **TAB 锚定**（非 read 渲染重建 needle），12 条 TS needle 先做唯一性 grep 再 edit。
5. **数据继承（契约 §二.7）**：上轮 `delivered_files_from_report = []`（零 src 交付）→ 本轮 **2 文件交付**；GSC 侧本轮**零词级数字引用**（不适用「上轮 X → 本轮 Y」对比, 已在「数据来源」显式声明）。
6. **跨车道避让（契约 §二.6，本轮实测生效）**：`run-context.sibling_lanes = []`（生成于 00:10:56），但**直读 `lane-runs.jsonl` 发现同日已有 3 条兄弟记录** ⇒ 本 run **零改写**下列今日已被兄弟车道写入的文件：
   | 车道 | run_id | 今日已改文件 |
   |---|---|---|
   | ZP-daily-content | `ZP-daily-content-20261010T000137` | `src/data/blog-data/{zh-hk,en,ja}.json` · `src/data/blog-posts.ts` · `src/app/[locale]/blog/[slug]/page.tsx` |
   | ZP-gsc-feedback | `ZP-gsc-feedback-20261010T000715` | `.hermes/industry-keyword-matrix.json` |
   | ZP-weekly-meta | `ZP-weekly-meta-20261010T001056` | `src/lib/seo.ts` |
   ⇒ 本轮交付面（`zprintpro-sku-seo-data.csv` + `src/data/sku-seo-data.ts` + 本报告）**与该表零交集**；§5 挂账 1-4 的修复若触及 `src/lib/seo.ts`（今日已改）**必须顺延到下一窗口**（本轮只挂账, 不修）。
7. **判据纪律（契约 §四）**：本报告**不**以「跑过了 / wrapper exit=0 / Task Scheduler Result=0」当成功；成功判据 = 本报告 + `DELIVERED` 两文件 + §2.3 的 lane 内可执行自检结果；机器门禁与线上 head 探针**明确标注未执行**。

---

## 7. 升级 K3（1 段中文，5 要素）

**① 修了什么**：按您 10/9 大脑指令第 -2 优先级本车道第 1 条，完成 **greeting-cards 簇 6 SKU 描述的 holiday/年賀状 场景句密度补强**——`spot-uv` / `rounded-corner` 各 3 语在职场景句内补「新年卡 / New Year / 年賀状」；`thick-400g` / `foil` 两 SKU 的 6 个**描述桩**（原来线上 meta description 就是「燙金名片」「Embossed Business Cards」「商務名片定制」这类词组，其中 ja 槽还混着简体/繁中）补成完整描述并含「新年賀卡 / New Year / 年賀状」；`premium` / `matte` 已达标**零改写**（幂等）。全部经 **CSV 源头 + TS 派生同步**（SOP-5 例外留痕见 §2.2），**零 title / 零 H1 / 零 keywords / 零 name / 零 slug**；价格/MOQ 全部取自 `products.ts` BC-001~006 真值。

**② 深度证据**：改动 2 文件（CSV L67-72 + TS L2770-2928），12 条 needle 全部经唯一性预检；文件行数守恒（TS 3342 / CSV 92）；门童 #20 规则 B、门童 #4（三向字形 + 币种）、门童 #16、门童 #17 语言/格式自检全过；线上 3 条探针（en/ja envelopes + ja flyers, HTTP 200）证明相关块与描述链路已挂载。

**③ 两处必须知情的结论**：**(a) 您 §C2 的「新块 FAQ 过 extractFaqFromHtml」前提不成立**——`envelopes:en/ja` 与 `flyers:ja` 的 FAQ 是**结构化 `{q,a}`**（走 `category/[slug]/page.tsx` L350-387 结构化产出 FAQPage JSON-LD），`extractFaqFromHtml` 只作用于 blog 正文 HTML；⇒ 该 3 块**零 regex 风险、无需修复**，但**顺带查出块内 `title`/`metaDescription` 是死字段**（线上 title 实测来自 `seo.ts`），10/10 批次若继续改块内这两列 = 零 ROI。**(b) 只读复核查出 4 笔技术债**（挂账 1-4）：`/guide/[slug]` 页族 hreflang 全指 locale 首页且 x-default 错指 /en（P1）；hreflang 语言码两套并存（zh-Hant-HK vs zh-HK、ja vs ja-JP）；`src/lib/hreflang.ts` 死代码带第 4 套口径；Organization sameAs 首页已填 4 真链但 business 节点恒空。**均按「缺陷入报告挂账, 不擅自修」处理**。

**④ 5 步 verify**：CSV↔TS 一致性（lane 内逐字回读 ✅ / **生成器 dry-run 待 host**）/ 唯一性 + 行数守恒 ✅ / 门童语言-格式自检 ✅ / 线上 3 探针 200 + 块渲染 ✅ / tsc·build·门童 exit 0·head 内 JSON-LD ⛔ 未执行（pwsh 禁用, 已给可粘贴命令, 不虚报）。

**⑤ 下一步**：① host 跑 §2.2 三条命令（生成器 dry-run 判据 = 6 个 greeting-cards slug **不**出现在「字节级变化块」）；② 周六槽位轮换 books/catalog 簇（大脑第 4 条）；③ 请 K3 一次裁三件：`/guide` hreflang 修法（挂账 1）+ §0.36.3 缺口 #2 语言码单源化（挂账 2）+ §0.0 展示层 (a)/(b)/(c)（挂账 5，名片期残留如何收口）；④ 下一批收 envelopes 同页 MOQ 矛盾（挂账 6）与 2 处无来源数字（挂账 7）。

---

## 8. 决策登记簿 ID 列表（per §J.1.3）

- **D-10/10-BLOG-1**（greeting-cards 6 SKU 描述 holiday/年賀状 场景句：CSV 源头 + TS 派生同步）：🟢 **DONE**（产物：`zprintpro-sku-seo-data.csv` + `src/data/sku-seo-data.ts`，本报告 §2；机器门禁待 host）
- **D-10/10-BLOG-2**（§C2 新块 FAQ regex 扫描 + 链路归因 + 线上 FAQPage 资格）：🟢 **DONE**（产物：本报告 §3；结论 = 前提不成立、风险 0）
- **D-10/10-BLOG-3**（千问 P0 技术底座只读复核）：🟢 **DONE**（产物：本报告 §4 + 挂账 1-4）
- **D-10/10-BLOG-4**（挂账 6 envelopes 同页 MOQ 矛盾收口）：🔴 **OPEN** — 需定位 category 正文数据源, 下一批
- **D-10/10-BLOG-5**（挂账 7 无来源数字 `+22%` / `15,000+` 处置）：🔴 **OPEN** — 需 K3/运营裁
- **D-9/19-BLOG-2**（v9.3 任务 K 食品包装意图修复）：⚪ **BLOCKED→顺延** — 上轮自引入事故已由 host 回滚（本 run 已验证 0 残留），修复本体仍未落地；本 run 未越权执行（不属大脑 10/9 本批范围）

---

## 附：本 run 做不到 / 未做（诚实边界, 不得当作结论使用）

| # | 项 | 原因 |
|---|---|---|
| 1 | 跑 `node` / `git` / `curl` / `tsc` / `build` / 门童命令 | pwsh 工具在本 lane 沙箱被禁（v9.4 rearm 2026-09-14 明示不重试）⇒ 由 host-side wrapper 执行 |
| 2 | 跑 `csv-to-sku-seo.mjs`（生成器） | 同上；已用「CSV + TS 双向逐字对齐」替代（SOP-5 例外留痕 §2.2）+ 给出 host 判据 |
| 3 | 线上 head 内 hreflang / FAQPage JSON-LD 实证 | `web_fetch` 不回传 `<head>`（实测 3 URL）⇒ 结论改为代码级实测 + host curl 命令 |
| 4 | `src/data/blog-data/*.json` 任何写入 | 跨车道避让（今日 daily-content 已写, 契约 §二.6） |
| 5 | 挂账 1-4（hreflang / 死代码 / sameAs）修复 | 大脑第 3 条明文「只读, 缺陷入报告挂账, 不擅自修」+ `src/lib/seo.ts` 今日被兄弟车道改写 |
| 6 | GSC 词级数字引用 / 选词 | 本 lane 无 node 不可解析 xlsx；主交付为大脑指定题, 不依赖 GSC 选词（不做二手引用） |
| 7 | title/H1/keywords/name/slug 任何改动 | 大脑「零 title 改动」+ v9.3 任务 J churn 红线 + 9/13 title 冻结纪律（至 10/19） |

---

*Generated by deepseek harness（DSH lane `ZP-blog-deepfix`, v9.4 rearm 持续轮）· 2026-10-10 · 仓根 `F:\zprintpro-nextjs` · HEAD `c32931c8`*
