# 派活书 v2（交接包）— 新对话从 Step B 开始 · 2026-09-19 10:25

> **用法**：新对话直接贴本文件全文 + K3 最新裁决。**不要再问「上次做到哪」** —— 本文件即交接。
> **工作目录**：`F:\zprintpro-nextjs`（唯一生产目录，main 分支）
> **v2 相对 v1 的变更**：① Step A（1-B）已闭环并**线上全量验收 PASS 18/0**；② Step B 性质已**查清并证伪原假设**；③ 新增 K3 三条裁决；④ 新增四条技术债；⑤ 健康基线刷新。

---

## 0. 接手前必读（3 分钟）

1. **`AGENTS.md`** —— 尤其 §0.23.1（GSC 数据禁入客户可见内容，跨项目 P0）、§0.25（30 min push 间隔 + `check-push-window.mjs`）、§0.35（定时任务 SSoT 与结果总线）、§12（push 5 步 SOP）
2. **`.hermes/regression-guard/error-patterns.md`** —— **顶部已置顶两段**：① 饱和上限伪装稳定红线（旧）② **2026-09-19 四条技术债「验收信号本身可能是假的」（新，本会话产出）**
3. **`.hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.md`** —— 1032 字分档清单（双方法三层判据一致）
4. **`.hermes/logs/lane-status.json`** —— 定时任务结果总线（执行层第一输入，禁看 mtime）

**开工自检（两条）**：
```bash
git -C F:\zprintpro-nextjs ls-remote origin refs/heads/main   # 远端真实头（禁信 git status 的 ahead/behind）
node scripts/check-push-window.mjs                            # push 窗口
```

---

## 1. 已完成（含本会话闭环，全部线上验证）

| 环节 | commit | 状态 |
|---|---|---|
| 队列 P0 第 2 篇 Self-Publishing 三语上线 | `15c1e7e3` | ✅ 线上三语 200 |
| Step 1 止血：zh-hk 页脚简体→繁体 + 远距双品牌 | `325c2e5b` / `5e377dd5` | ✅ 线上 4/4 |
| Step 2 price-data 跨语系污染源头治理 | `ecdf1475` | ✅ 线上验证 |
| Step 3 门童 #4 双向化 + 专用基线 + 注入回放 10 例 | `24013b89` | ✅ |
| Step 3.5 门禁真实计数改造 | `03e525f1` / `30c22144` | ✅ |
| Step 4 `products.ts` 规格三栏三语化 | `84d65111` | ✅ 线上验证 |
| Step 5 (B) `size` 栏 73/73 + PDP 栏名三语 | `82a9f2d3` | ✅ 线上验证 |
| (A) v10.1 决策 1-B 展示层 MOQ 口径（5 SKU 1 本起印）| `8e67354e` | ✅ 已推 |
| **Step A 1-B 落点修复**（改接 `v9/ProductPageV9.tsx` + 删 `page.tsx` 死代码）| **`a5e14d37`** | ✅ **已闭环** |
| **1-B 推送落地**（延迟任务 08:49:30 → 08:49:33 push 成功）| 远端头 `ee0e0164` | ✅ `git ls-remote` 核实 |
| **1-B 部署落地**（CF Pages 构建部署）| deploy `f5b70f2a` @ `ee0e0164` | ✅ **stages 全部 success**（queued/initialize/clone_repo/build/deploy）|
| 本会话 cron 收尾（结果总线/幂等键/8 态状态机/TDZ 修复）| `cb44e7bd` `df24f55d` `c158fab5` `ee0e0164` | ✅ 已推 |

### 1.1 Step A 闭环证据（1-B 线上全量）

**精确字符串探针**（`node .hermes/_probe-pb/decisive-1b-live.cjs`）：

| locale | 线上渲染片段 | 判定 |
|---|---|---|
| zh-hk | `最低訂購量 1 本起印（數碼）· 100 本以上柯式更經濟` | ✅ |
| en | `Minimum order From 1 copy (digital) · 100+ cheaper on offset` | ✅ |
| ja | `1 部から（デジタル）· 100 部以上はオフセットが経済的` | ✅ |

**全量验收**（`node .hermes/_probe-pb/verify-1b-full-live.cjs`）→ **PASS 18 / FAIL 0**：
- 阳性组：名单 5 SKU（`catalog-printing` / `perfect-bound-books` / `hardcover-books` / `spiral-notebooks` / `saddle-stitch-booklets`）× 3 locale 全中；
- 阴性对照组（零 churn）：`kraft-paper-bags` 仍 `100個`、`waterproof-stickers` 仍 `100張`、`business-cards` 308（预期，非名单）。

> ⚠️ **探针自身缺陷（未修，仅记录）**：`decisive-1b-live.cjs` 的 `MOQ_AEO 文案在線` 判据正则只认 `1 本都可以印|1 本起印|From 1 copy`，**不认日文 `1 部から`** ⇒ ja 误报 ❌。线上日文实际已渲染 `1 部から、最低注文数はありません…`。**接手若要复用该探针，先修这条判据**（纪律 1）。

### 1.2 本会话最关键的一条事实（务必内化）

**1-B 之前「上线」是假信号。** 真相链：
- `origin` 与 `origin_ssh` 是**同一 GitHub 仓库的两个别名**，但 `origin_ssh/main` 的跟踪 ref 冻结在 9/18 19:02；
- 上次成功 push 在 **08:19:11**，止于 `f5bb90b6`；
- `a5e14d37` 提交于 **08:19:20**（**晚 9 秒**）⇒ **从未被推送**；
- 当时记的「push ✅ + CF SUCCESS ✅」，CF 绿的实为 `cb73f581`（1-B 的**内容** commit，落在**未渲染**的 `page.tsx` 上，正是原缺陷本身）。

⇒ **push 生效的唯一判据 = `git ls-remote` 真实头 == 本地 HEAD ＋ 精确字符串线上命中。**（已入 error-patterns.md 置顶）

---

## 2. Step B（P0，接手第一件）— GSC 泄漏修复 + 门童 #16 补扫描面

### 2.1 缺陷（已确证，精确原文）

`src/data/buying-guides.ts` **L930**（1-indexed，= 数组第 930 行）是 `en` 语系 `content` 值（该行**单行** 8,899 字符），**尾部**含：

```
<p><small class="text-gray-500">数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)</small></p>
```

命中后台黑话 **7 处**：`GSC` / `gsc-fresh-2026-09-03.json` / `imps` / `pos` / `红线` / `校准` / `拍板`。
**性质**：蜡烛手工皂标签指南的 **en 页面正文**，**客户可见** ⇒ 命中 §0.23.1 红线。
（同档 L929 = zh-hk、L931 = ja，**均干净**，只有 en 这一行带尾巴。）

### 2.2 修法（K3 已裁「本批修」）

**整句重写，不是只删数字**（§0.23.1 教训：只删数字会留下 `GSC 燙金 +` 这类半截空壳）。
重写后**只保留与客户相关的信息**（例如「based on September 2026 search data analysis」）；
**去掉**：文件路径 `gsc-fresh-*.json`、校准日期、内部决策编号（`§九` / `§0.23` / `拍板日`）。

### 2.3 性质已查清 —— **扫描面盲区，不是存量豁免**（原强假设已证伪，勿重复调查）

**三路证据**：

1. **实跑**：`guard.scan(['src/data/buying-guides.ts'])` → **`[]`（0 命中）**——它**不是被基线扣掉，而是根本没生成命中**。
2. **基线归属**：295 条基线只作用于 `common.js:53 QUOTE_RULES` 里的 **10 个品牌/i18n 规则 ID**；`GSC_LEAK_CUSTOMER_VISIBLE` **不在其中** ⇒ 基线通道对门童 #16 无效。
3. **判决性注入实验**（真实路径注入，阳性对照自身先被验证；备份 + 还原 hash 一致）：
   `.hermes/_probe-pb/stepB-guard-blindspot.cjs` + `_diag-blindspot3.cjs`，结果落盘 `.hermes/_probe-pb/stepB-blindspot-result.json`。

| 注入形态 | 命中 | 说明 |
|---|---|---|
| `title: "<泄漏串>"` | **3** | ✅ 阳性对照成立（判据链路通） |
| `content: "<泄漏串>"` | **0** | `content` 字段**不在扫描面** |
| `title: "<含 class='…' 的 HTML>"` | **0** | 引号截断（见技术债 4） |
| 段落数组 `body: [ "…" ]` | **3** | 仅数组形态可见 |
| 非白名单文件（阴性对照） | **0** | ✅ |

**根因两条**（K3 裁决 2 登记口径）：
- **门童 #16 只扫四字段** `title|description|excerpt|keywords` + 多行段落数组；**TS 档 `content:` 长期无人看守**；
- **正则 `['"]([^'"]{20,})['"]` 遇值内单引号即静默失效**（客户 HTML 正文天然含引号）。

### 2.4 Step B 交付物（K3 裁决 2）

1. **修泄漏**：`buying-guides.ts` L930 整句重写；
2. **补 `content` 字段扫描**：`scanTs()` 扫描面覆盖 `content`（含单行 + 多行两种形态）；
3. **引号安全提取**：改用解析式提取（按 `key:` 定位 + 引号配对/平衡扫描），**禁止**「到下一个引号为止」的朴素正则；
4. **注入回放**：新增用例必须含「**值内含引号**」与「**值内含 HTML 属性**」两种形状 + 对照组；
5. `error-patterns.md` 记「门童只扫四字段 + 正则遇引号静默失效」，**不记**「豁免藏缺陷」（已由本会话登记完成，接手只需复核）。

> ⚠️ **补扫描面后预计命中会上升**（这是**真值暴露**，不是新增污染）：`content` 字段体量极大，
> 接手必须**先量化**「补面后新增命中数」，再决定分批清理口径，**不要**在补面的同一次 commit 里顺手清一批存量
> （否则「真值暴露」与「修复」混在一起无法验收）。**建议：补面单独一刀 + 先出全量清单，清理另批。**

---

## 3. Step C / Step E（Step B 完成后串行）

### 3.1 Step C — 1032 清理批 1（K3 已批准按 v2 清单拆 3 批）

清单：`.hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.md` + 逐笔 CSV
**批 1（高优，直接伤 SERP/schema）**：`title` 10 + `description` 67 + `category` 33 + `JSON-LD` 138 = **248 字符**
**批 2**：`content` 697 字符；**批 3**：`其他` 87 字符
要求：附**基线递减**（1320 → N−M）+ 同步更新 `.hermes/i18n-pollution-baseline.json`（只许递减）

### 3.2 Step E — 行业术语 847 字清单（K3 裁决 5）

`content` 档内 46 条 / **847 字符（占 1032 的 82%）** 疑为**印刷行业术语**（`國際認證體系`312 / `進口印刷設備`258 / `認證體系`208 / `認證紙`69 / `急件`36 / `截單`36）。
K3 指示：**先出全量术语表，由 K3 / 母语者一次性确认后，再决定清理范围**。
注：`急件 18:00 截單` 已在 `common.js` 的 `OPERATIONAL_WHITELIST.businessParams` 内。

---

## 4. ⛔ 保护清单（不得触碰 / 不得误提交）

1. **`src/app/[locale]/product/[slug]/page.tsx`** 工作区含 **weekly-meta 车道未提交改动**（2 个内链 hunk + 1 个 404 修复 hunk）—— 属另一 lane，**不得一并提交**
2. 编辑 **`src/data/blog-data/*.json` 前必须先看锁** `.hermes/locks/lane.lock`（§0.35.5：9/19 曾因人手会话与 lane 并发写同档产生坏版 `_broken-zhhk-lane-20260919.json`）
3. §0.0 名片解禁裁决未定项：**不得删改既有贺卡资产 / 不得改 middleware 301 映射**
4. **工作区其余未提交（sitemap `*.xml` × 6 + `GSC数据/index.json` + `.hermes/industry-keyword-matrix.json`）** 不属 Step B 范围，**不得顺手带进 commit**

---

## 5. 已定口径（避免重复裁决）

| 项 | 结论 |
|---|---|
| 分档口径 | **1032**（门童结构化值作用域 = 基线来源）。**不用 1235**（`resolveLocale` 口径，8 档内多出的 203 字**全部落在注释体内**，零例外，是假阳性）|
| 白名单 | **仅 4 行**已批：`payment-methods/page.tsx:697 beneficiaryCn` / `:758 唐运提 QR 行` / `Footer.tsx:146 supportJA` / `en.json` 品牌名 `彩龍印刷` |
| `唐运提` | **保留简体**（法人姓名以身份证为准）|
| `CRED_HEIDELBERG` | 选 **(A) 允许**，映射转写已核正确（`Heidelberg` / `ハイデルベルク`）|
| 1-B 名单 | **5 SKU**（含 `saddle-stitch-booklets`）；`page.tsx` 死代码**已删**（K3 裁定）|
| Step B 性质 | **扫描面盲区**（非存量豁免）；处置 = 补扫描面，**不**从基线移除（K3 裁决 2）|
| push 生效判据 | `git ls-remote` 真实头 == 本地 HEAD **＋** 精确字符串线上命中（K3 裁决 2 / 技术债 2）|
| Etsy | ⛔ **未开**，等措辞卡 + Step B/C 闭环 |

---

## 6. 执行纪律（本轮血的教训，务必遵守）

1. **验收探针的判据必须先自证再用** —— 本会话连续 5 次栽在「度量工具本身没被度量」。**本会话又新增两次现场复现**：① 首版实验把样本写到 `%TEMP%`，连**对照组也 0 命中**（路径正则只对仓库内路径生效）；② 第二版对照组因泄漏串含 `class='text-gray-500'` 被**自己的注入手法**截断。⇒ **凡实验，先跑「阳性对照（应命中）+ 阴性对照（应 0）」，对照失效则结论作废。**
2. **双方法复算是硬要求**：任何 N vs M 对比，落地前必须第二独立方法复算；**不一致则结论作废**。
3. **本地全绿 ≠ 线上生效**：`tsc`/门禁/构建全过 ≠ 客户看得到。**必须用「精确字符串」探针**（不用通用词，如 `4-color offset` 这类页面里本来就有的词）。
4. **push 前置**：`node scripts/check-push-window.mjs`（基准 = `origin/main` 最新 commit 时间，非「我上次 push」）→ ≥30 min 才推；不足则 **commit 留本地立即结束**（§0.25.8 禁 `Start-Sleep` 阻塞）。
5. **CF Pages 可能瞬时失败**：`84d65111` 曾 deploy/failure 但被后继 commit 正常带上线 —— 遇到失败先查 CF API 部署历史（account_id `32c174efaa22353f357c0fdff9d61b86`，token 在 `.env` 的 `CLOUDFLARE_PAGES_TOKEN`），**不要盲目烧配额重推**。
6. **不许手搓派生档（SOP-5）**、**危险写入三件套（备份 + 计数断言 + 形状断言，断言未过不写盘）**。
7. **顺手清理 `git status` 歧义源**：交接时若仍存在 `origin` / `origin_ssh` 双别名，接手第一件事是收敛或强制 `git fetch --all`（技术债 1）。

---

## 7. 常用命令

```bash
# —— 交接/推送安全 ——
git ls-remote origin refs/heads/main                  # ★ 远端真实头（唯一可信）
node scripts/check-push-window.mjs                    # push 窗口守卫
node scripts/verify-deploy.mjs                        # CF Pages 部署状态

# —— 门禁/健康基线 ——
node scripts/check-regression-guard.js                # 门禁汇总 + 真实计数 + 截断警示
node scripts/test-i18n-pollution-bidirectional.js     # 门童 #4 注入回放 (须 10 PASS)
npx tsc --noEmit                                      # 须 = 54

# —— Step B 专用 ——
node .hermes/_probe-pb/stepB-guard-blindspot.cjs      # 门童 #16 盲区判决实验（含对照）
node -e "require('./scripts/guards/gsc-leak-guard.js').scan(['src/data/buying-guides.ts']).then(r=>console.log(r.length))"

# —— 1-B 复验（注意先修 ja 判据，见 §1.1）——
node .hermes/_probe-pb/decisive-1b-live.cjs
node .hermes/_probe-pb/verify-1b-full-live.cjs
```

---

## 8. 当前健康基线（2026-09-19 10:25 实测）

| 项 | 值 | 说明 |
|---|---|---|
| `git ls-remote origin refs/heads/main` | `ee0e0164` | 远端真实头（含 1-B 修复）|
| 本地 HEAD | `fbf8a08c` | 08:53:18 的 **docs-only** commit（第二轮 P1/P3 归档），**未推**，属文档待清项 |
| 本地 vs 远端 | 0 / 1 | 唯一差异 = `fbf8a08c`（docs-only；不影响线上）|
| CF 部署（`ee0e0164`）| `f5b70f2a` | **stages 全 success**（含 `deploy`）；线上 serve 即此版本 |
| `tsc --noEmit` | **54** 错误 | 全在 `src/lib/quote-engine/__tests__/`（既有基线，与 1-B 无关）|
| 门禁汇总 | **🔴 0** / 🟠 1567 / 🟡 1090 | shadow mode |
| 门童 #16 GSC 泄漏 | **0 命中** | ⚠️ **是假零** —— `content` 字段根本未被扫描（技术债 3），Step B 补面后真值将暴露 |
| 门童 #20 存量基线 | 120 / 120（已修 0）| 只许递减 |
| 存量基线豁免 | 295 条 | 属 `QUOTE_RULES`（品牌/i18n），**与门童 #16 无关** |
| 真实计数（未截断）Top | `CRED_4_PLUS_NUMBER=3775` / `SOP10_4_PLUS_NUMBER=3775` / `I18N_META_LENGTH=820` / `CRED_ISO_9001=706` | 见汇总输出 |
| push 窗口 | ✅ 满足（已过 104.7 min）| 可随时 push |

**唯一待清项**：`.hermes/_probe-pb/` 内本会话新增的探针脚本（未提交，**属工具，不属产物**；如需入库请单独一刀，勿混进 Step B 修复 commit）。
