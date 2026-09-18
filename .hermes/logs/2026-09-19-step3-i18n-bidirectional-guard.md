# Step 3 交付报告 — 门童 #4（跨语言污染）双向化 + 专用基线通道 + 假缺陷注入回放测试

> **队列依据（首行）**: K3 2026-09-19 派活「Step 3: 门童 #4 跨语言污染规则双向化 + 专用基线通道 + 假缺陷注入回放测试」
> **前序**: `.hermes/logs/2026-09-18-selfpub-delivery.md` §⑦ 事故 4（设计结论，待落地）
> **边界声明**: 未 `git commit` / 未 `git push` / 未 `git add`；未改动 `src/app/[locale]/product/[slug]/page.tsx`、`src/components/category/CategoryProductCard.tsx`、`src/data/print-method-policy.ts`（他车道未提交改动，原样保留）。
> **数据来源**: 见 §⑥（全部为本机实测命令输出，零估算）

---

## ① 交付物

| # | 路径 | 类型 | 说明 |
|---|------|------|------|
| 1 | `scripts/guards/i18n-guard.js` | 改动（未提交） | 双向化：三向判据 + 两份 curate 字集 + 词法值作用域 |
| 2 | `.hermes/i18n-pollution-baseline.json` | **新增** | 专用基线通道（比照门童 #20 `meta-baseline.json`） |
| 3 | `scripts/test-i18n-pollution-bidirectional.js` | **新增** | 假缺陷注入回放测试（10 例：6 必需 + 4 附加） |
| 4 | `.hermes/logs/2026-09-19-step3-i18n-bidirectional-guard.md` | 新增 | 本报告 |

未新增 helper 文件（字集与词法函数内联在 `i18n-guard.js` 并导出，供测试直接驱动裸扫）。

---

## ② 三条语系规则（判据按派活包，未自行改成对称规则）

| 语系 | 判据 | 规则 ID | 严重度 | 依据 |
|---|---|---|---|---|
| en | 值含 **CJK 汉字** | `I18N_POLLUTION_EN` | red | 英文不需要中文；但**实测并非零误报**（见 §⑤ 已知 FP 类别 3） |
| zh-hk | 值含**简体专用字形**（`SIMP_ZH` 866 字） | `I18N_POLLUTION` | red | 繁体站显示简体 = 红线 |
| ja | 值含**简体专用字形**（`SIMP_JA` 791 字 = SIMP_ZH − 75 日文新字体） | `I18N_POLLUTION_JA` | red | ja 本来就用汉字，「含 CJK」对其无意义且必然误报 |

**两份字集，不共用**（「一份字集套三语系」是错的）：

- `SIMP_ZH` = 组 1-5（印刷/商务高频 + 常用简体专用字形补漏），**只收「繁体必与简体不同形」者**；
- `SIMP_JA` = `SIMP_ZH` − `JA_SHINJITAI`(75 字)；
- 代码内建 **形状断言**（§12 危险写入三件套）：① 字集含任何非 CJK 汉字字符 → 抛错；② `出/算/用/件/格/台/里/后/干/云/制/准/系/松/卷/并/斗/范/丰/划/伙/夸/涂/咸/凶/郁/于/筑/庄/粘/表/虫/丑` 进 `SIMP_ZH` → 抛错；③ K3 点名 15 新字体进 `SIMP_JA` → 抛错。

### 2.1 curate 过程（全部为实测，非推断）

| 假阳性来源 | 处置 | 证据 |
|---|---|---|
| 繁简同形字（出/算/用/件/格…） | 整批不入集 + 反向断言 | 例 5 负向控制 PASS |
| **日文新字体**（写数点双学画国体来与当医断错言…） | 入 `JA_SHINJITAI` | 例 4 / 例 8b / **例 9** PASS |
| 首版漏排除 `礼/寿/猫/称/践/却/弥/参/将/径/届/横/寝/恋` 共 14 字 | 逐个补入 `JA_SHINJITAI` | 真语料回归揪出（横 73 命中 / 恋 1 命中）→ 例 7、例 9 现为常设哨兵 |
| 首版漏收 `专/关/举/舱` 等高频字（字集不完整 = 该方向形同虚设） | 新增组 5（161 字） | 例 2/例 3 首轮 **FAIL**（缺「专」）→ 补齐后 PASS |
| 粤语「晒」（講晒/睇晒/得晒，港式行文合法） | 从 `SIMP_ZH` 移除 | 实测 10 处假阳性 → 例 8 PASS |
| 代码注释 / 代码本体 / 无 locale 归属源串 | 词法层剔除（见 §③） | 4,971 → 1,466 命中 |

### 2.2 为什么必须换成「词法值作用域」（本任务最大的技术坎）

**原实现**：`scanLocaleScoped(content, file, pollution, ['zh-hk'])` = 原始文本扫描 + `resolveLocale()` 取「最近左侧 locale 键」+ `isCommentLine()` 过滤注释。

- v1 窄集只有 19 字，该做法尚可；**字集一放宽到千字级即爆炸**：实测 src/ 命中 **4,971** 条，逐条归因后确认绝大多数是假阳性：
  1. 代码注释（JSX 花括号注释 / 行尾双斜杠注释）被算成某 locale 的「值」= **1,473 条**；
  2. 代码本体被算成值 —— 例 `src/lib/h1-builder.ts` 的繁→简转换表 `.replace(/貼/g,'贴')`；
  3. **无 locale 归属的源串被错判** —— 例 `src/data/price-tables/*.json` 的 `configs[].config`（简体源标签）因上方有 `market_markup.ja: 2.2` 而被错当成 `ja`（单项 119 条）。

**改法**（规则判据原文是「**值**含…」，故按「值」实现）：

1. 只扫**字符串字面量**（词法切分：字符串 / `//` / `/* */`），注释与代码一律不扫；
2. locale 归属改为**结构化值作用域**：命中必须落在 `locale键:` 之后那个**值的区间**内（从值起点按 `()[]{}` 配平到同级 `,`/闭合符）；
3. 归属不到任何 locale 作用域 → **不报**（取舍见 §⑤ 之「保守照扫 vs 精度」）；
4. 键位识别加防呆：引号包裹的键必须整个字符串就是键本身（排除值里出现 `"en:"` 的文本）；非引号键要求前一非空白字符属 `{ , ( [ ; = > ? :`（排除 `case 'zh-hk':`）。

**效果**：4,971 → 1,466（假阳性词法层剔除，真缺陷全部保留）。

---

## ③ 专用基线通道（防爆红）

- 档：`.hermes/i18n-pollution-baseline.json`（**不共用** `check-regression-guard.js` 全局 perFile 预算 —— 后者按文件记账、先到先扣，会让门童 #4 的存量命中错扣品牌预算或拿不到豁免）；
- 语义：**存量只许递减**；超出 `perFile` 基线的部分才作为新增缺陷返回（red 硬拦）；
- 基线值 = **规则落地后的实测命中数**（非历史 342，非照抄）；
- **既有内向窄集（v1 pattern）命中永不进基线** —— 基线不得掩盖改造前已 red 的存量。

### 3.1 实测命中 N → 基线 N

```
门童 #4 双向污染存量基线: 实测命中 1466 → 基线 1459 (录于 2026-09-19);
  本次基线内豁免 1459, 既有内向 red 保留 7, ★新增缺陷 0
```

| 规则 | 实测（本次新增维度存量） |
|---|---|
| `I18N_POLLUTION_EN`（en 含 CJK） | **1,138** |
| `I18N_POLLUTION_JA`（ja 含简体专用字形） | **197** |
| `I18N_POLLUTION`（zh-hk 含简体专用字形，广义集新增部分） | **124** |
| 合计 → 基线 | **1,459** |
| 既有内向窄集 red（不进基线，保持 red） | 7 |

Top 存量文件（perFile，完整 33 项见基线档）：

| 文件 | 存量 | 说明 |
|---|---|---|
| `src/data/blog-data/en.json` | 912 | en 正文/描述内嵌繁体中文词组（國際認證體系 312 / 進口印刷設備 258 / 認證紙 / 急件 / 截單 / 證書編號備索…）+ 少量简体（认证体系 4 处） |
| `src/data/category-seo-content.ts` | 159 | zh-hk 简体 19 + ja 76 + en 64 |
| `src/data/blog-data/ja.json` | 132 | ja 正文内嵌简体（饮食外卖 / 骑马钉 / 商标识别 / 成长曲线 / 红包印刷…） |
| `src/data/blog-data/zh-hk.json` | 50 | zh-hk 简体（贴纸 / 详解 / 认证体系 / 关键词…） |
| `src/data/buying-guides.ts` | 47 | zh-hk 简体（贴纸 / 铜版纸 / 防晒相纸…） |
| `src/data/sku-seo-data.ts` | 33 | en 58 项主体 |
| `src/app/[locale]/payment-methods/page.tsx` | 18 | `beneficiaryCn`（中文收款户名）等 |
| `src/data/blog-posts.ts` | 14 | |
| `src/components/layout/Footer.tsx` | 13 | `supportJA` 字段内的中文 |
| 其余 24 个文件 | 各 1-10 | 含 `institutional-printing/page.tsx` 的「拟承接/拟配合」（K3 要求改「拟/计划」时误用了简体「拟」） |

### 3.2 汇总 red：before / after（含逐笔归因）

| 项 | before（改造前） | after（改造后） | 差 |
|---|---|---|---|
| 🔴 汇总 red | **4** | **2** | **−2** |
| 🟠 orange | 1562 | 1562 | 0 |
| 🟡 yellow | 1088 | 1088 | 0 |

**逐笔归因（−2，无任何一笔 red 增量）**：

| # | before 命中 | after | 归因 |
|---|---|---|---|
| 1 | `src/components/geo/CompareTable.tsx:57` 对 | **仍 red** | 真缺陷：zh-hk 值 `caption: 'PVC、PP合成纸、铜版纸、牛皮纸的详细对比'` 为简体 |
| 2 | `src/lib/whatsapp.ts:27` 来 | **仍 red** | 真缺陷：zh-hk 值 `来源：` 为简体 |
| 3 | `src/app/quote-desk/all/page.tsx:126` 个 | 消失 | **JSX 代码注释** `{/* 10 张表, 每张一个 <details> 折叠 */}` —— 不是「值」，判据原文为「值含…」，属原实现（原始文本扫描）造成的假阳性，双向化后词法层剔除 |
| 4 | `src/components/sections/RushDeliveryGrid.tsx:141` 页 | 消失 | 同上：`{/* 上半: 图片 + 标题 + 规格 + 价格 (整块 Link 到产品页) */}` |
| 5 | （原被品牌存量基线吸收，未表现为 red）zh-hk.json `业`×4 / pillar-content.ts `发` | 仍被吸收 | 本次仍由 `.hermes/brand-baseline.json` 按文件预算吸收，**与改造前一致**（未因改造而新增 red） |

> **关于派活包所述「当前基线 = 🔴 50」**：本机实测 **before = 4**（默认 scope `src/`，即 CI/pre-commit 口径）。差异归因：v1 窄集对 `price-data.generated.ts`（90 处 zh-hk 简体）与 `GeoFooterText.tsx`（全站 zh-hk 页脚简体）的存量命中触顶 **`MAX_HITS_PER_RULE = 50`**（每规则 50 条上限）⇒ 历史「50」是**上限饱和值**；Step 1（`325c2e5b`）+ Step 2（`ecdf1475`）修完后现存 4 笔（本轮再剔除 2 笔注释假阳性 = 2）。派活包另记「🔴 50 全部为 I18N_POLLUTION」与本机口径一致，仅数值口径不同。
> 另注：`node scripts/check-regression-guard.js .`（仓库根 scope，非 CI 口径）实测 🔴 5424 —— 该数字含 `.hermes/` 日志与历史快照，**不是**红线口径，此处一并披露以免误比。

---

## ④ 假缺陷注入回放测试（实跑输出）

命令：`node scripts/test-i18n-pollution-bidirectional.js`（**真跑**，退出码 0）

```
PASS  [1] 正向注入 en 键位含中文 -> 必须报 I18N_POLLUTION_EN
PASS  [2] 正向注入 zh-hk 含简体专用字形 (专/质/贴/纸) -> 必须报 I18N_POLLUTION
PASS  [3] 正向注入 ja 含简体专用字形 (专) -> 必须报 I18N_POLLUTION_JA
PASS  [4] 负向控制 ja 含日文新字体 (写数点双学画国体来与当医断错言) -> 必须不报
PASS  [5] 负向控制 zh-hk 含繁简同形字 (出算用件格) -> 必须不报
PASS  [6] 空跑 red == 2 且 ★新增缺陷 == 0
        实测: 汇总 = 🔴 2 / 🟠 1562 / 🟡 1088; 基线行 = 门童 #4 双向污染存量基线: 实测命中 1466 → 基线 1459 (录于 2026-09-19); 本次基线内豁免 1459, 既有内向 red 保留 7, ★新增缺陷 0
PASS  [7] 真语料误报回归: price-data.generated.ts (Step 2 已验收) -> 三向 0 命中 [样本 0 条]
PASS  [8] 字集质量回归: zh-hk 粤语「晒」+ 繁简同形字 -> I18N_POLLUTION 0 命中
PASS  [8b] 字集质量回归: ja 正确日文 (谢礼/寿命/猫/称/践/却/弥/装/黄/欧/惧/属/潜/残/横/寝/参/将/径/届) -> I18N_POLLUTION_JA 0 命中
PASS  [9] 同形新字体自动审计: 常用漢字/日常語コーパス ∩ SIMP_JA == ∅ [语料样本 508 字]

────────────────────────────────────────────────────────────────
门童 #4 双向化注入回放测试: 10 PASS / 0 FAIL
ALL TESTS PASS (门童 #4 双向化)
```

- 例 1-3 = **能拦**（正向）；例 4-5、7-9 = **不误报**（负向）；两边都测（只测一边 = 假守卫）。
- 例 7 是**真语料**回归：`src/lib/price-data.generated.ts` 经 Step 2 验收（en 含汉字 0 / zh-hk 含简体 0 / 残余 ja 131 栏位为正确日文）⇒ 三向必须 0，实测 0。该例在首轮**揪出 横 字假阳性（73 命中）**，是字集质量的关键防线。
- 例 6 是真跑全量门童并解析汇总行（非桩），red 值写死为常量并附「为何是 2」的逐笔注释。

---

## ⑤ 残留风险与待裁事项（不掩盖）

1. **已知 FP 类别 1 · 中文原名**：en 值内的**法人/银行户名原文**（如 `beneficiaryCn: '深圳市彩龍印刷包裝有限公司'`、`supportJA` 字段内的中文）——按「en 含 CJK」判据为命中，已计入基线。是否设「中文原名白名单」需 K3 一句话裁决（本轮**未**自行放宽）。
2. **已知 FP 类别 2 · 粤语专用字**：「晒」已从字集移除（港式行文合法）；若后续出现其他粤语专用字造成假阳性，仍按「收窄字集」处理，不采用「略过该文件」。
3. **取舍披露 · 「保守照扫」 vs 「精度」**：`common.js` 原口径为「无法判定 locale → 保守照扫（不豁免）」。字集放宽后照扫 = 全站注释/代码爆炸（4,971 条），故双向三条规则改为「**只扫字符串值 + 必须落在 locale 值作用域内，否则不报**」。代价：`<p>简体</p>` 这类 **JSX 字面文本值**（非字符串）不会被覆盖 —— 本仓库该形态未出现，若未来出现需补扫 JSX 文本节点。
4. **`哑粉紙`（3+3 处）判定**：`哑` 是 `啞` 的简体字形，出现在 zh-hk/ja 文案（HK 印刷业常写作「啞粉紙」）⇒ 按判据为真简体，保留为命中（存量），未改文案（文案改动需 K3 裁决）。
5. **未修任何存量污染**：本轮只落地「检测 + 基线」，1,459 条存量待修清单见基线档 perFile（建议按 K3 串行纪律另批「zh-hk/ja 简体污染治理」）。**未修**是刻意的：修文案属业务改动，且会让 red/基线数字变动，需另一批授权。

---

## ⑥ 数据来源（§0.23 强制）

```
数据来源:
- 门童全量实跑: node scripts/check-regression-guard.js (scope=src/, 289 文件) 2026-09-19 本机
    before: 🔴 4 | 🟠 1562 | 🟡 1088   after: 🔴 2 | 🟠 1562 | 🟡 1088
- 注入回放测试: node scripts/test-i18n-pollution-bidirectional.js → 10 PASS / 0 FAIL (exit 0)
- pre-commit 口径复核: node scripts/check-regression-guard.js --commit → 扫描文件数 0, 汇总全 0 (exit 0)
- 类型闸门: npx tsc --noEmit → error TS 54 条 (= 项目基线 54)
- 基线档: .hermes/i18n-pollution-baseline.json (measuredTotal 1466 / total 1459 / legacyRedNotBaselined 7)
- 前序事实: .hermes/logs/2026-09-18-selfpub-delivery.md §⑦ 事故 1/3/4/5 (误报集与设计结论)
             commit ecdf1475 (Step 2 price-data 治理) / 325c2e5b (Step 1 页脚止血)
- 字集语料: 常用漢字表 + 日常語コーパス (508 字, 测试例 9) / price-data.generated.ts ja 栏位 (测试例 7)
```

---

## ⑦ 复核入口（给主执行层）

```bash
# 1 反向复核: 门童汇总 red 必须 == 2 (before 4)
node scripts/check-regression-guard.js

# 2 注入回放: 10 PASS / 0 FAIL, exit 0
node scripts/test-i18n-pollution-bidirectional.js

# 3 pre-commit 口径: 不误伤 staged 提交
node scripts/check-regression-guard.js --commit

# 4 类型闸门: 54 条 (与项目基线持平)
npx tsc --noEmit 2>&1 | Select-String 'error TS' | Measure-Object

# 5 工作区: 仅 3 个文件与本任务相关 (另 3 处他车道改动原样保留)
git status --short
```
