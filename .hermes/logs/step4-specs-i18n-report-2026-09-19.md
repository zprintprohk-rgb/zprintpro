# Step 4 交付报告 — `products.ts` 规格三栏三语化（方案 (a)）

- 执行单元: 执行层专项单元（Step 4）
- 日期: 2026-09-19
- 状态: **READY**（验收 6 项全过；2 项超预期：红色 2→0、基线真实递减 −11）
- 边界遵守: **未** commit / push / add；**未**改 `products.ts` 字段类型契约；**未**触碰
  `src/app/[locale]/product/[slug]/page.tsx`、`src/components/category/CategoryProductCard.tsx`（已用 `git diff` 逐档确认零足迹）、
  `src/data/print-method-policy.ts`。

---

## 1. 交付物（路径 + 行数）

**新增（源头映射 + 探针）**

| 文件 | 行数 | 说明 |
|------|------|------|
| `src/data/product-specs-i18n.ts` | 297 | **源头映射**（238 条，key = products.ts 规格原文；`localizeSpecValue` / `localizeSpecs`） |
| `.hermes/_probe-pb/gen-spec-i18n.cjs` | 143 | 生成器（三件套：计数断言 238 / anchor 形状断言 / `.bak` 备份；断言未过不写盘） |
| `.hermes/_probe-pb/_spec-tr-1..5.json` | 5 档 | 手写译文源（按索引对位 + anchor 自检，防键名转写错） |
| `.hermes/_probe-pb/_dump-spec-strings-full.ts` | 47 | **权威规模 dump**（真跑 products 数组）→ `_spec-strings-full.json` |
| `.hermes/_probe-pb/_verify-spec-i18n.cjs` | 52 | 映射档三向字集自检（门童 #4 0 命中 + 238 全覆盖） |
| `.hermes/_probe-pb/_smoke-spec-i18n.ts` | 60 | 端到端烟测（95 SKU × 3 栏 = 285 栏位逐条取值） |
| `.hermes/_probe-pb/en-cjk-inventory.cjs` / `en-cjk-tokens.cjs` | 62 / 33 | §5 en 值内中文原名全量盘点 |
| `.hermes/_probe-pb/_legacy-red-list.cjs` / `_file-hits.cjs` | 24 / 18 | §6 定位工具（legacy red 全量 / 单档命中） |

**修改（渲染侧接线 + §6 字形修复）**

| 文件 | +/− | 说明 |
|------|-----|------|
| `src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx` | +5/−1 | 活 PDP「規格參數/Specifications/仕様」手风琴取值改查表（line 596 附近） |
| `src/components/product/ProductTabs.tsx` | +6/−4 | legacy PDP 规格表 4 栏取值改查表 |
| `src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx` | +4/−2 | 分类页卡片材质标签 + SpecFinder 材质选项 |
| `src/components/home/HotProducts.tsx` | +3/−1 | 首页热门卡材质标签 |
| `src/components/geo/CompareTable.tsx` | +1/−1 | §6 字形修复（zh-hk caption 全值繁体） |
| `src/lib/whatsapp.ts` | +4/−4 | §6 字形修复（zh-hk 模板 諮詢/報價/材質/數量/來源） |
| `.hermes/i18n-pollution-baseline.json` | +4/−4 | 基线 perFile 递减（只减不增）+ total/measured 同步 |
| `scripts/test-i18n-pollution-bidirectional.js` | +7/−3 | `EXPECTED_RED: 2 → 0` + 归因注释（见 §6 判断说明） |
| `.hermes/logs/i18n-en-cjk-inventory-2026-09-19.md` / `.csv` / `-tokens-2026-09-19.csv` | 新增 | §5 全量明细（1138 字符级 / 80 行 / 56 token） |

---

## 2. 架构选择（方案 (a) 落地方式 + 为什么不并入 ProductTabs）

- `products.ts` 的 `material / printMethod / finishing` **保持中文单值 = 事实源**，类型契约零改动；
  渲染层查表，查不到 **fallback 中文原文**（不报错、不留空，`localizeSpecValue(undefined) → ''`）。
- 不并入 `src/components/ProductTabs.tsx` 的既有 `specsBySlug`：那份是**按 slug/类目**的 16 条策展文案
  （类目级粗粒度，key = slug/category），本批是**按规格值**的 238 条逐字映射（key = 中文原文，细粒度）；
  key 空间不同、无法互换，且那份已被 legacy PDP 使用（改动它会波及 zh-hk 既有输出）。
  沿用其**形态**（`Record<key, {locale: value}>` + 查找 + 兜底）而不复用其**实例**。
- zh-hk 值 = 原文逐字（原文本身即繁體港式，已实测 0 简体字形）⇒ **zh-hk 渲染输出零改动**（零 churn）。

## 3. 规模修正（重要：派活前提被低估）

| 指标 | 派活给定（旧 probe） | 实测真值（tsx 真跑 products 数组） |
|------|----------------------|-------------------------------------|
| 含规格三栏 SKU | 90 | **95** |
| 栏位总数 | 270 | **285** |
| 唯一中文字串 | 223 | **238** |

根因：`.hermes/_probe-pb/size-products-specs.cjs` 以 `split(/\n  \{\n/)` 切 SKU 区块，
漏掉 5 个缩排更深的 SKU（`doujinshi-printing` / `acrylic-keychain` / `can-badge` / `postcard-set` / `eco-tote-bag` = 15 栏位）。
本批已按真值 238 条全做（不是 223 条），并保留位移稽核：旧 dump 前 197 条与新 dump 逐条一致，第 198 条起为新增 15 条 + 后段 23 条整体 +15。

## 4. 验收实测数字（全部真值）

| # | 项 | 结果 |
|---|----|------|
| 1 | `npx tsc --noEmit` | **54**（基线 54，不升不降） |
| 2 | `node scripts/check-regression-guard.js` | **🔴 0**（要求 ≤2）· 🟠 1567 · 🟡 1088 · ⚪ 0 |
| 2b | 真实计数（未截断）段 | `CRED_4_PLUS_NUMBER=3783 / SOP10_4_PLUS_NUMBER=3783 / I18N_META_LENGTH=820 / CRED_ISO_9001=706 / CRED_SELF_FACTORY=260 / CRED_HEIDELBERG=237 / BRAND_LOCALE_MISMATCH=196 / I18N_CURRENCY=168 / CRED_1000_PLUS=138 / BRAND_JA_ALTERNATE=77 / BRAND_DOUBLE=51 / CRED_FSC_C123456=13 / SOP10_HEIDELBERG_6_1=7 / SOP10_24H_SLA=2 / CRED_INTL_TOP=1 / CRED_15_YEARS=1 / SOP10_INTL_TOP=1 / SOP10_15_YEARS=1`，其余 0 |
| 3 | `node scripts/test-i18n-pollution-bidirectional.js` | **10 PASS / 0 FAIL**（test 6 期望 red=0 且 ★新增缺陷 0） |
| 4 | 门童 #4 基线 | **实测 1466 → 1453**；**基线 1459 → 1448（−11）**；`既有内向 red 7 → 5`；★新增缺陷 **0** |
| 5 | 零新增污染 | 新档 `product-specs-i18n.ts` 双向扫描 **0 命中**；en 值含 CJK **0**；zh-hk 值含简体 **0**；ja 值含简体 **0**（逐条 238 条断言） |
| 6 | `node scripts/scan-simplified.mjs` | ✅ 无新增命中；`check-brand-mentions.mjs --strict` = **A 类 0 命中** |

**数据来源**：`npx tsc --noEmit` / `scripts/check-regression-guard.js`（2026-09-19 本机实测）/ `scripts/test-i18n-pollution-bidirectional.js` /
`scripts/scan-simplified.mjs` / `scripts/check-brand-mentions.mjs --strict` / `guard.scanBidirectional` 裸扫 / `npx tsx` 真跑 data 层烟测。

**端到端烟测（数据层真跑，非静态）**：映射 238 条 / 覆盖 95 SKU × 3 栏 = **285 栏位**；
未命中 **0**、en 含 CJK **0**、ja 未翻译 **0**、zh-hk ≠ 原文 **0**；未知值 fallback 原文、`size` 无映射时原样返回。

## 5. 无高置信译文而保留原文的条目

**0 条**（238 条全部给出 zh-hk / en / ja 三语，无一条留中文原文充数）。
但下列 **16 条属术语选型判断**（非 1:1 字典对应），建议日语/英语母语者或 K3 复核；如有异议改
`.hermes/_probe-pb/_spec-tr-*.json` 重跑 `gen-spec-i18n.cjs` 即可（映射档不手改）：

| 原文片段 | en 取值 | ja 取值 | 风险点 |
|----------|--------|--------|--------|
| 灰底白板 | duplex board (grey back) | グレー裏白板紙 | 材质名地域差异 |
| 單粉卡(超高松) | one-side coated card (ultra-high bulk) | 片面コートカード(超嵩高) | 港式行话直译 |
| 易碎紙 | tamper-evident paper | 易破壊紙 | 行业称谓 |
| 導氣槽底紙 | air-release liner | エアフロー加工台紙 | 日文惯用 |
| 筒芯出貨 | shipped on core | 巻き取り出荷 | 出货形态 |
| 單透孔 | one-way vision holes | ワンウェイビジョン穴 | 车贴行话 |
| 手挽 / 手挽材 | handles / handle material | 手提げ / 手提げ素材 | 纸袋行话 |
| 高品數碼 | high-quality digital | 高品質デジタル | 工艺等级 |
| 相架 / 硬紙板相架 | easel frame / rigid board easel frame | フレームスタンド / 厚紙フレームスタンド | 台卡结构 |
| 內托 / 吸塑 / 紙漿內托 | insert / blister tray / moulded pulp insert | 内台 / ブリスタ / パルプ内台 | 包装内衬 |
| 打扣 | grommets | ハトメ | 喷绘后道 |
| 珠光／冰白 | pearl / ice-white | パール／アイスホワイト | 日文 アイスホワイト 为品牌通称 |
| 12 色藝術微噴（Giclée） | 12-color giclée printing | 12色ジクレー印刷 | 原文已含 Giclée，照抄 |
| 3M／Avery 品牌升級 | upgrade to 3M / Avery brand | 3M／Averyブランドへのアップグレード | **第三方品牌名照抄原文**（见下 §7 橙色项） |
| 書脊封面 / 內袋 / 繡名字 | spine cover / inner pocket / embroidered name | 背表紙 / 内ポケット / 刺しゅう名入れ | 同人周边结构 |
| 擊凸 / 壓凹 / 局部UV / 燙金 | embossing / debossing / spot UV / foil stamping | エンボス / デボス / スポットUV / 箔押し | 行业标准译法，低风险 |

数字一律照抄原文（`350g` → `350g`、`90×54mm` 原样、`700-810g`/`1200-1500g`/`80–120g` 连字符与破折号原样），**未做任何单位换算**。

## 6. §6 重新定位 + 修复结果

- 派活所指 `src/components/CompareTable.tsx` **确实不存在**；glob 定位真值 = **`src/components/geo/CompareTable.tsx`**
  （与门童基线 perFile 一致）。`src/lib/whatsapp.ts` 路径正确。
- 两笔均为 **zh-hk 值内真简体**（真缺陷，非误报）：
  - `src/components/geo/CompareTable.tsx:57` `caption: 'PVC、PP合成纸、铜版纸、牛皮纸的详细对比'`（对/纸/铜/详/细 6+1 笔）
  - `src/lib/whatsapp.ts:27` `` `来源：${ctx.source || 'zprintpro.com'}` ``（来，另 22/24/25 行 询/报/价/质/数 5 笔存量同值）
- 处理：**按字形全值修复**（非只改触发红的那一个字）——
  `PVC、PP合成紙、銅版紙、牛皮紙的詳細對比`；`你好，我想諮詢…的報價。` / `材質：` / `數量：` / `來源：`。
  理由：两笔 red 与同值存量简体**同一字符串**，只改一个字形会留下半截简体；且 K3 §4.4 要求基线真实递减，只有此处可减。
- 结果：**红色 2 → 0**；上表 §4 第 4 项基线 −11（CompareTable 6→0、whatsapp 5→0），measured 1466→1453（−13 = 11 存量 + 2 legacy）。
- **判断说明（需主执行层复核）**：red=0 后 `EXPECTED_RED` 必须同步 2→0，否则门童 #4 test 6 会假红（该常量 = 「当前已知 red 清册」，
  下调是变严不是放宽：任何新 red 立刻 FAIL）。若主执行层认为脚本常量不属本批范围，请回滚 `scripts/test-i18n-pollution-bidirectional.js` 一处常量
  并保留两处字形修复（此时 red=0 与常量 2 冲突，须择一）。

## 7. 剩余/未达项与风险（全部明确列出，不掩盖）

1. **`size` 栏仍是中文**（95 SKU / **73 条唯一字串**）：本批范围 = material / printMethod / finishing 三栏，
   en/ja 规格块内 `size` 行仍显示中文。属既有状态（非新增污染，门童 0 命中），建议作为 Step 5 单独立项（同样可用一条 line 级映射覆盖）。
2. **PDP 规格条目的字段名 `dt` 未本地化**：`ProductPageV9.tsx` 用 `Object.keys` 原文渲染 `material/size/printMethod/finishing`，
   故 zh-hk 页也会看到英文栏名。属既有状态；改它会**变更 zh-hk 既有输出**（churn），故本批不动，交 K3 定夺。
3. **橙色 +5（1562 → 1567）**：全部来自 `CRED_HEIDELBERG` 232 → 237，归因于**唯一一行**
   `"四色柯式印刷（海德堡）": { zh-hk: 原文, en: '4-color offset printing (Heidelberg)', ja: '4色オフセット印刷（ハイデルベルク）' }`
   （原文即含「海德堡」= 事实源）。红项未受影响；若 K3 要求 en/ja 不出现第三方印机品牌，改该条即消除（会偏离事实源，故未擅动）。
4. **`ISO 认证体系` 简体残留（存量，未动）**：`src/data/blog-posts.ts:1834` 的 **en 值**含简体「认证体系」，
   `blog-data/{en,ja}.json` 另有 8 处。属 §5 白名单审查范围，建议随白名单批次一并处理。
5. `check-encoding.js` 仅查 staged 文件（本批不 commit）→ 已另用 BOM/大小 spot check 逐档确认（9 档全部 `ok`、无 BOM、无 UTF-16）。

## 8. §5 en 值内中文原名全量明细（交付 K3 一次性白名单）

- 全量档：`.hermes/logs/i18n-en-cjk-inventory-2026-09-19.md`（**80 行**，file:line + 命中字 + 该行原文）
  + `.csv`（**1138 字符级逐笔**，一筆不漏）+ `-tokens-2026-09-19.csv`（56 个中文 token，频次 = **出现行数**）。
- 实测口径：门童 #4 规则 `I18N_POLLUTION_EN`（en 值含 CJK）**裸扫描全量**，未经基线豁免；
  `1138` 与基线 `perRule.I18N_POLLUTION_EN = 1138` **逐数吻合**（互为交叉验证）；涉及 **8 档**、去重 **80 行**。
- 按档：`blog-data/en.json` 912 · `category-seo-content.ts` 118 · `buying-guides.ts` 38 · `sku-seo-data.ts` 28 ·
  `payment-methods/page.tsx` 16 · `layout/Footer.tsx` 12 · `category/[slug]/page.tsx` 10 · `blog-posts.ts` 4。
- **命中高度集中（实测按行）**：1138 命中里 Top 1 行 118、Top 2 行 106、Top 3 行 95 …，即**少数几行吃掉大部分命中**：
  - `blog-data/en.json:612` **118**：整段中文摘要混进英文 content（证书印刷文）
  - `category-seo-content.ts:2150` **106**：**一整条繁体中文 FAQ（q/a）残留插在 `en` 语系的 faq 数组内**
    （前后 2141-2153 全为英文 FAQ；2155 已有对应英文版）⇒ 属**真缺陷（en 页面会渲染中文 FAQ）**，建议**清理而非白名单**
  - `blog-data/en.json:580` **95** / `:644` **92** / `:207` **50** … 同类「整段中文串入英文正文 / JSON-LD」
- 分类清单（K3 白名单审批请**分两档**，勿整批白名单化）：
  1. **建议白名单保留（专有名词，共 4 行）**：
     `payment-methods/page.tsx:697 beneficiaryCn: '深圳市彩龍印刷包裝有限公司'`（法人全称）·
     `payment-methods/page.tsx:758 'Official QR issued by 唐运提 (Mr. Tang, founder)'`（法代姓名，**注意：此处用简体「运」，AGENTS.md 亦写「唐运提」；若按繁体口径应为「唐運提」，属法人姓名口径问题，请 K3 定**）·
     `blog-data/en.json:728`（英文正文内 `彩龍印刷` 公司简称）· `blog-data/en.json` 内 `ZprintPro`（品牌，非 CJK）
  2. **建议清理（结构污染，非专有名词，占 1138 中绝大部分）**：整段繁体中文摘要/FAQ/JSON-LD 串入 en 值的行
     （`blog-data/en.json` 612/580/644/207/588/496/64/620/… + `category-seo-content.ts:2150`）
  3. **简体残留（en 值内真简体，双档皆需处理）**：`认证体系`（2 行：`blog-posts.ts:1834` en 值 + ja 文内）、
     `镂空`（2 行：`category-seo-content.ts` en 描述）、`中国本土`（Footer `supportJA` 12 笔）
  4. **结构性重复**：`layout/Footer.tsx` 12 笔属 `en:` 语系块内的 `supportJA`（ja 文案）重复键，与合法 `supportEN` 并存，非专有名词
- 逐字频次表（56 token）已随档交付；**注意**：token 频次按「出现行数」计（此前的按字计版本已修正，避免同一行重复灌水）。
