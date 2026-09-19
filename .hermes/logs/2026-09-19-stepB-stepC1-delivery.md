# Step B + Step C 批 1 交付报告 · 2026-09-19

> **执行层**：deepseek hermes（接手单元）｜**工作目录**：`F:\zprintpro-nextjs`（main）
> **本报告范围**：Step B（GSC 泄漏 P0 + 门童 #16 补扫描面）、Step C 批 1（1032 清理 248 字）
> **数据来源**：全部结论均附脚本与落盘证据，见文末 §7

---

## 1. VERDICT / CONSUMED / DELIVERED / NEXT

| 项 | 内容 |
|---|---|
| **VERDICT** | ✅ Step B 完成且线上验收通过（FAIL 0）；✅ Step C 批 1 完成且基线递减 249；⏳ 批 1 push 待窗口（本地已 commit） |
| **CONSUMED** | 派活书 v2（`.hermes/logs/2026-09-19-handoff-stepB-v2.md`）、分档清单 v2 + 逐笔 CSV、`error-patterns.md` 置顶段、`lane-status.json` |
| **DELIVERED** | commit `30d820ec`（Step B，**已推已部署已验收**）、commit `594217c6`（Step C 批 1，**本地待推**） |
| **NEXT** | ① 批 1 push（延迟任务目标 11:27:15）→ 线上验收 ② Step C 批 2（content 697）③ Step E（847 术语表，需 K3 一次性确认） |

---

## 2. Step B — GSC 泄漏修复 + 门童 #16 补扫描面（commit `30d820ec`，已上线）

### 2.1 泄漏修复：**不是只有 en，是三语全中**（修正派活书的一处事实错误）

派活书 §2.1 记载「L930 是 en 语系 content 值…（同档 L929=zh-hk、L931=ja 均干净）」。实测**三语同构全中**：

| 行 | 语言 | 尾巴变体 |
|---|---|---|
| L929 | zh-hk | `數據來源：GSC 數據 / gsc-fresh-2026-09-03.json … 數據誠信紅線, 校準 … 拍板日` |
| L930 | en | `数据来源：GSC 数据 / … 数据诚信红线, 校准 … 拍板日` |
| L931 | ja | `データ出典：GSC データ / … データ诚信基準, 校正 … 拍板日` |

三行尾巴各 177 字符、完全同构。按 K3「整句重写」口径三语一并重写（去文件路径 / 校准日期 / 内部编号），
六道断言过关（计数 / 备份 / 形状 / 净变化 / 结构 / 残留），en 侧新文案 CJK = **0**（不违反 Step C 方向）。

### 2.2 门童 #16 的性质：**五类静默失效**（原「存量基线豁免」强假设已证伪）

| # | 失效类 | 机制 | 实测证据 |
|---|--------|------|----------|
| ① | 字段盲区 | `scanTs()` 只扫 `title\|description\|excerpt\|keywords` + 多行段落数组；**`content:` 不在扫描面** | 三语尾巴**都被正则命中**，但 `scan()` = **0 命中** |
| ② | 引号截断 | `['"]([^'"]{20,})['"]` 以引号为界，客户 HTML 天然含 `class='…'` | 同一串：无引号 **3 命中** → 包进 HTML **0 命中** |
| ③ | 双引号看空 | `(['"])([^'"]+)\1` 对 `"value"` 匹配成 `""` | `blog-posts.ts` 30 条 / `sku-seo-data.ts` 170 条长期看空 |
| ④ | 文件级漏覆盖 | `CUSTOMER_VISIBLE_FILES` 缺 `src/data` 最大两档 | `products-content.ts` 1,195 KB、`sku-seo-data.ts` 1,138 KB 均不在名单 |
| ⑤ | 词汇级漏覆盖 | 正则「枚举措辞」 | `GSC データ`、`imps 數據`（纯词）、`校準報價`、`拍板日`、`§0.23` → 全 0 覆盖 |

**基线假设证伪证据**：`check-regression-guard.js` 的基线通道只对 `common.js:53 QUOTE_RULES` 内 10 个品牌/i18n 规则 ID 生效，`GSC_LEAK_CUSTOMER_VISIBLE` 不在其中；且实跑返回 `[]`（**命中从未生成**，非被扣减）。
⇒ 性质 = **扫描面盲区**，处置 = 补扫描面（非「从基线移除」）。

### 2.3 落地改造

- `scanTs()` 重构为**解析式提取器**：字符级扫描 `'…' / "…" / 模板串`，取整值后按「键 + 花括号栈外层字段」判所有权；空键/locale 键归外层；判不出 ⇒ `content`（保守照扫）。
- 覆盖名单补 `products-content.ts` / `sku-seo-data.ts`。
- 正则补 8 条（日文片假名、`imps/pos + 數據/数据/データ` 纯词、`數據誠信紅線`、`校準報價/來源/錨點`、`真實校準`、`拍板日`、`§0.xx`）。
- JSON 路径补**行号定位**（原恒报 `line:0`，报告不可执行）+ 同处命中去重。
- **注入回放 12 例 PASS / 0 FAIL**，含阴性对照（干净文案 / class 属性 / `色彩校準` 行业词 / 注释行）。

### 2.4 补面暴露的存量真值 7 处 → 全部修复（K3 裁决 A + 三语统一脱敏）

| 位置 | 内容 | 处置 |
|---|---|---|
| `category-seo-content.ts:4552/4653` | 客户可见 description 写内部代号「**K3** 真實身份 / K3 ≤」 | 改「客服 / support 」 |
| `products-content.ts:51/52/3203/6566` | 定价表内部口径 | 见下 |

定价口径脱敏（21 处，三语统一）：
- 去掉加成倍率与内部汇率：`1.3 倍合理利潤`、`RMB→HKD 1.087`、en `1.3x fair margin`、`CNY→USD 7.25`
- 术语归一：`校準報價` / `校準來源` / `真實校準` / `Calibrated Pricing` / `校正価格` → 参考价格口径；表头 `校準來源` → `價格依據`；单元格 `2026-07-18 參考實詢` → `參考價`
- **守恒断言**：`HK$` 数值序列与百分比序列**逐位未变** —— 只脱敏口径，一个价格都没动

### 2.5 Step B 线上验收（§12 push 5 步 SOP + §0.23.1 线上抽查）

- `git ls-remote origin refs/heads/main` = `30d820ec` ✅（唯一可信判据，遵技术债 2）
- CF Pages 部署 `stages: queued/initialize/clone_repo/build/deploy` 全 success
- **线上渲染验收 FAIL 0**（7 URL × 三语）：三语尾巴 0 残留 + 价格与三语新文案全在
- **1-B 回归 PASS 18 / FAIL 0**（5 SKU × 3 locale 全中；零 churn 对照未污染）

---

## 3. Step C 批 1 — 248 字清零（commit `594217c6`，本地待推）

### 3.1 范围与派活书完全一致

枚举结果：**28 条值级 / 248 字**（category 9/33 + title 2/10 + description 12/67 + JSON-LD 5/138），
档位与合计与派活书 §3.1 逐位一致 ⇒ **无口径漂移**。

### 3.2 三类性质、三类处置

| 类 | 内容 | 处置 |
|---|---|---|
| ① 人工漏译 | category 9 条（`餐飲外賣`/`書籍印刷`/`房地產`…） | 补英文（Food & Beverage / Book Printing / Real Estate…） |
| ② 术语欠译 | description 组（`國際認證體系`/`進口印刷設備`/`急件 18:00 截單`/`認證紙`） | 对齐站内已批准英文表述（ISO 9001 certified / imported 6+1 presses / rush orders, 18:00 cutoff / FSC-certified paper） |
| ③ 撤值遗留 + 误填 | JSON-LD 档：`Cert No. [證書編號備索]` **×14**（SOP-10 第 4 款撤 certNo 后遗留）；`MINDS CMYK (麥思印刷整合)` 第三方来源名；`sku-seo-data` en 块 h1/description 中文误填 ×4；en 正文日文术语 `並製本/上製本` | 分别改为 `Cert No. available on request` / 删中文 / 对齐该 SKU 既有英文标题 / 英文括注 |

执行：**37 条规则 / 46 处**；四道断言（逐条**期望次数**计数 + 备份 + **scope 内**形状残留 + JSON 合法性 + 篇目数 92 守恒）。

### 3.3 基线递减（只许递减）

`.hermes/i18n-pollution-baseline.json`：**total 1320 → 1071（递减 249）**
逐档 `min(旧, 实测)` 共 30 档，**新增污染 0**；门禁复核 `实测 1071 → 基线 1071`，无「反增」警示。

验收：门禁汇总 **🔴 0 / ★新增缺陷 0**｜tsc **54 = 54**（基线持平）｜门童 #16 **0 命中**。

---

## 4. 我踩到并纠正的两次自身翻车（记录在案）

1. **我的第二批正则误报 3 处**：`データ基準`（实为「C&SD 2026 データ基準」= 政府统计**数据基准**）、`校准後`/`校正後`（实为印刷行业「打样校正后」）。逐条看原文后收紧（`數據/数据/データ + 基準` 必须显式含「誠信」；`校準` 只收完整搭配），误报 15 → 12 → 7 清零。
2. **修复脚本的"半截替换"**：首版脱敏用 `String.replace(str, str)` 只替第一处（表头 ×2 / 单元格 ×10）。被**形状断言当场拒绝写盘**——正是 §12「只查计数的守卫是假守卫」的反面教材，已作为技术债 4 固化。
3. **形状断言过严造成假失败**：批 1 首版要求「全文 0 残留」，而 `國際認證體系` 在 content 档仍有 52 处（属批 2/Step E），改为**按批 1 scope 判定**才正确。
4. **线上验收脚本的编码坑**：`.ps1` 内 CJK 字面量 + BOM-less UTF-8 + `powershell -File` ⇒ PS 5.1 按 ANSI 解码崩（AGENTS.md §0.35.5 同族）。已改为**纯 ASCII 脚本**。

---

## 5. 待 K3 裁决 / 移交新单元

| # | 项 | 说明 |
|---|---|---|
| 1 | **Step C 批 2（content 697）与 Step E（847 术语）高度重叠** | 实测 `國際認證體系` 在 en.json 出现 **52 次**、`進口印刷設備` **43 次**、`認證紙` **23 次**、`急件 18:00 截單` **18 次**，绝大多数落在 content 档。**术语一旦拍板，批 2 的大部分即是批量替换**，故建议 Step E 术语表**先行**。 |
| 2 | **机器可读术语表已具备雏形** | 本会话已产出 9 类 category 译名 + 5 组术语对；847 字术语表可直接在其上扩展为「中文术语 → en / ja 批准译法」三列表。 |
| 3 | **`進口印刷設備` 疑为生成器坏输出的根因** | 站点在 `Heidelberg` 被特批（`CRED_HEIDELBERG` 选 A）后，多份英文正文出现「German 進口印刷設備 presses」「進口印刷設備 press」这类**中文插在中英混排句里**的形态 —— 疑为「品牌名脱敏/替换脚本用中文术语占位却未回填」。**建议单列一案**（非 i18n 欠译，而是生成器缺陷）。 |
| 4 | **另一类真缺陷（口径存疑，未动）** | `國際認證體系` 疑似对应 **ISO 9001**，但亦有「ISO 14001 / ISO 14298 / ISO 12647」已单独出现；我按上下文取了 `ISO 9001 certified`，**若与事实不符请纠正**（涉及对外认证表述，属数据诚信红线）。 |
| 5 | **线上 en 页面面包屑仍显示 categoryKey** | 实测 `/en/blog/company-intro/` 面包屑为 `Home / Blog / company-news`（英文页显示英文 slug）。**非 Step C 范围**，但属可见缺陷，建议单独立项。 |

---

## 6. 当前状态

| 项 | 值 |
|---|---|
| 远端真实头 | 待批 1 push（`git ls-remote` 唯一可信，遵技术债 2） |
| 本地待推 | `594217c6`（Step C 批 1）——**延迟 push 已后台启动，目标 11:27:15**（§0.25.8 异步，不阻塞） |
| 已上线且已验收 | `30d820ec`（Step B） |
| 门禁汇总 | 🔴 0（★新增缺陷 0） |
| tsc | 54（基线 54） |
| 门童 #16 | 0 命中（含新增两档 + 九类形状 + 解析式提取） |
| 门童 #4 基线 | 1320 → **1071**（只许递减） |
| 缓存/端口 | 本地 dev server 已关，端口 3999 已释放 |
| 工作区其他未提交 | sitemap `*.xml` ×6 / `GSC数据/index.json` / `.hermes/industry-keyword-matrix.json`（**非本批范围，未动**） |

---

## 7. 证据与回滚

| 用途 | 路径 |
|---|---|
| 分档清单 v2 + 逐笔 CSV | `.hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.md` / `.csv` |
| 批 1 枚举（28 条值级） | `.hermes/_probe-pb/stepC-batch1-items.json` |
| Step B 判决实验（含对照） | `.hermes/_probe-pb/stepB-guard-blindspot.cjs`、`_diag-blindspot3.cjs` |
| Step B 注入回放（12 PASS） | `.hermes/_probe-pb/stepB-guard-injection-replay.cjs` + `stepB-guard-replay-result.json` |
| Step B 真值清单 / 三语变体取证 | `.hermes/_probe-pb/stepB-new-hits-detail.json`、`_stepB-variants.cjs` |
| 渲染验收（本地/线上双用） | `.hermes/_probe-pb/stepB-render-verify.cjs [baseUrl]` |
| 批 1 执行 / 基线递减 | `.hermes/_probe-pb/stepC1-execute.cjs`、`stepC1-baseline-decrease.cjs` |
| **回滚备份** | `_buying-guides.ts.bak-stepB1`、`_products-content.ts.bak-stepB7`、`_stepC1.{en,cat,sku}.bak`、`_i18n-pollution-baseline.bak` |
