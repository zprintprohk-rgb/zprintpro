# ZprintPro 交生活书（Handover Living Book）

> **性质**: **活书** —— 每次会话收尾**追加**一条「§9 变更日志」，并**更新** §2 状态快照。
> 不重写历史，只追加（per §0.34.2）。
> **用途**: 新执行层 / 下一位接手者 / 并发会话**第一份要读的文件**。
> **配套技能**: `zprintpro-self-evolution-hardening`（十九类避坑 + 九类能力）、
> `zprintpro-verification-discipline`（度量工具自身缺陷五类）。
> **创建**: 2026-09-20 · **最后更新**: 2026-09-20 19:36（menus 起印量 + 品牌/语种错配清账）

---

## §0 关联产物（唯一发现入口 — 必读，勿跳过）

> **背景**: 2026-09-20 同日有**并发会话**各自产出了交接文档。本活书虽自称「并发会话第一份要读的文件」，
> 但对方**并未读到**它，因而另建了一份 handoff —— 即**发现机制失效**（第三/第四套产物由此衍生）。
> 故此处显式登记全部同族产物，并把本文件确立为**唯一入口**。

| 关联产物 | 路径 | 内容 | 状态 |
|---|---|---|---|
| **本活书（唯一入口）** | `docs/2026-09-20-handover-living-book.md` | 状态快照 / 规则 SSoT / 未完事项 / 并发协议 | ✅ |
| 并发会话 handoff | `docs/2026-09-20-handoff-12seg-and-b2b3.md` | 12 段骨架 / 门禁加固 / B2-B3 内容批次 | ✅ 已入库 |
| 并发会话探针 | `.hermes/_probe-pb/probe-self-evolution-skill.sh` | 自进化技能自检 | ✅ 已入库 |
| 本活书配套探针 | `scripts/probe-skill-handover.mjs` | 38 断言（技能/活书/SSoT/规则同源/门禁） | ✅ 已入库 |
| 只读取证（menus） | `.hermes/reports/menus-drift-and-locale-mismatch-2026-09-20.md` | menus 11 处 DRIFT + 13 处品牌错配实证清单 | ✅ |
| 并发写锁 | `SESSION_LOCK.md`（仓库根） | 人手会话声明式软锁 + 接管区 | ✅ |

> ⚠️ **因并发隔离，正文暂未合并，以本指针为唯一发现入口。**
> **阶段 2（合并正文: 避坑条并入同一 skill + 两探针互引）留待并发会话静默后的安全窗口执行。**

---

## §1 一句话现状

**标题规则口径已三源同源（代码 / 书面 / 报告元数据），58 边界清零；当前唯一阻塞 = 并发会话正在编辑
`src/`（8 个 `MM` 文件），menus 文案层 7 处 DRIFT 待落。**

---

## §2 状态快照（每次收尾必更新）

| 项 | 值 | 取证方式 |
|---|---|---|
| 工作目录 | `F:\zprintpro-nextjs`（唯一生产目录, 目录铁律 §3） | — |
| 分支 / HEAD | `main` / `43945538`（2026-09-20 20:14，**未 push**） | `git log -1` |
| 远端 | `origin` 与 `origin_ssh` **同一仓库**（`git@github.com:zprintprohk-rgb/zprintpro.git`） | `git remote -v` |
| ⚠️ 分支 upstream | `main` 跟踪的是 **`origin_ssh/main` 而不是 `origin/main`**；只 fetch `origin` 会看到**过期的 origin/main** → 会误判「有积压/无积压」 | `git config branch.main.remote` |
| 积压 | **3 条待推**（`deda45f9` / `a7c13edc` / `43945538`）；`origin` 与 `origin_ssh` **两个 remote 均已 fetch，读数一致 a=3 / b=0**（2026-09-20 20:14） | `git rev-list --left-right --count` ×2 |
| 标题当量 SSoT | `scripts/guards/title-equiv.js` → `TITLE_MIN=50 / TITLE_MAX=57`；`band(57)=OK` / `band(58)=TRIM` | `node -e "..."` 实测 |
| 普查 | `node scripts/sku-title-census.mjs` → byBand：无新增 TRIM（menus 6 SKU 均不在 TRIM 榜） | census 复算 |
| 收尾信号 | `git status --porcelain -- src/` 无 `MM` **且** staged 删除归零 → **2026-09-20 19:36 已满足**（src/ 干净） | 见 §7 |
| 线上 | 未验证本轮改动（`a2f636e6` **未 push**）；线上最后部署为 `dba48bac` | `git log origin/main -1` |

---

## §3 规则 SSoT 索引（唯一权威，冲突时以此链为准）

| 主题 | SSoT | 备注 |
|---|---|---|
| 标题目标区 | `docs/2026-09-13-title-batch-T-freeze.md` **§6-3** | K3 2026-09-19 裁决: **50-57, 58 为硬阻断线**；取代 v4 的 50-54 与 9/13 的 50-58 |
| 当量口径（代码） | `scripts/guards/title-equiv.js` | 全角 CJK ×2 / 其余 ×1；**唯一实现**，其他脚本一律 `require` |
| 书面正文口径 | `AGENTS.md` §5 + §0.34.1 + §0.34.3 + §0.29.2.0/§0.29.2.2 取代声明 | 已同源 |
| 车道 prompt | `.hermes/cron-prompts/zprintpro-*.md`（5 条 live，清单 SSoT = `.hermes/cron-lanes.json`） | 已同源 |
| 错误模式库 | `.hermes/regression-guard/error-patterns.md` | 含 `STALE_REMOTE_REF_FALSE_BACKLOG` / `LOCATE_BEFORE_PATCH` / `TIME_READING_UNVERIFIED` |
| 调度 SSoT | `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md` + `.hermes/cron-lanes.json` | — |

**优先级**: K3 最新拍板 > AGENTS.md > 入口技能 > 专项技能（§0.34.2）。

---

## §4 工具清单（本轮新增 / 修复）

| 工具 | 用途 | 状态 |
|---|---|---|
| `scripts/audit-sku-locale.cjs` | **结构解析**版 locale/品牌审计（配平花括号→求值→遍历 `seo[locale]`） | ✅ 新增, 已入库 |
| `scripts/sku-title-census.mjs` | 标题普查（byBand / 双方法复算 / 报告元数据已改常量插值） | ✅ 元数据更正 |
| `scripts/apply-title-batch.mjs` | 批次落盘（含 `trim-58` 批次定义；断言「变化行数 == 期望槽数」+ 逐字命中 + 备份） | ✅ |
| `scripts/title-audit-v4.mjs` | 全站标题审计（**已改读 SSoT 常量**，消灭 50/58/65/54 硬编码） | ✅ |
| `scripts/sync-title-rule-50-57.mjs` | 规则文本归一化（取代已删除的 `sync-title-rule-50-58.mjs`） | ✅ |
| `scripts/menus-evidence.cjs` | menus 簇实证片段清单（供候选取词，**只读**） | ✅ 已入库（2026-09-20 去 `_` 前缀正式入库） |
| `scripts/verify-menus.cjs` | menus 真值（`products.ts`）vs 标题现状 DRIFT 核实（**只读**） | ✅ 已入库（同日去 `_` 前缀） |

---

## §5 未完成事项（按优先级，含阻塞原因）

| # | 事项 | 阻塞 | 备注 |
|---|---|---|---|
| 1 | ~~**menus 文案层 DRIFT**~~ | ✅ **2026-09-20 19:36 完成**（`a2f636e6`，10 处标题） | 见 §9 第二段 |
| 2 | ~~**品牌-语种错配 13 处**~~ | ✅ **2026-09-20 19:36 完成**（8 ja description + 5 imageAlt） | 结构解析口径：`node scripts/audit-sku-locale.cjs` 四项全 0 |
| 3 | `I18N_POLLUTION` 扩集 | 🔴 需先取日本常用汉字表 | **必须用「常用汉字表补集」驱动**，禁止手工繁体清单（避坑 13） |
| 4 | 4 条预存跨语言 head | 🟡 需先定对应主词 | `custom-red-packets` zh-hk/ja、`save-the-date-cards` ja、`pvc-menus` ja —— 单变量批次，涉主排名词 |
| 5 | 剩余人工改写 ~35 条 | 🟡 待验证窗 CTR 报告 | 多为 ≤12 imps |
| 6 | 跨 SKU 共享模板句残留（避坑 19） | 🔴 **本轮新增取证** | ① menus 数据层 `description`/`body` 仍写「50 本起 / 100 本起 / 100 張」，与已改标题的「10 張/份/本起」**直接矛盾**（避坑 18：只落一半）；② 5/6 menus SKU 名称写「防水PVC」但 spec 是 200g 銅版紙／啞膠覆膜；③ `disposable-menus` feature 与 finishing 自相矛盾 |
| 7 | `wedding-menu-cards` 币种 | 🟡 | 价写 **NT$**（本站 zh-hk 应为 HK$）；且缺 `unitLabel` |
| 8 | GSIM / RFQ Schema | 🔴 无官方信源 | 维持 `PENDING_VERIFICATION`；**不得据营销来源改 Schema** |
| 9 | **ja `imageAlt` 系统性折行** | 🟡 **🔴 确证 25 处已清 (`deda45f9`)**；余 🟡 4 处需人读 | 量测：`node scripts/audit-ja-imagealt-fold.cjs ja`（旧口径 🟠 上限）→ **改用三级分类** `node scripts/diag-brand-audit-gap-and-alt.cjs`（🔴确证 0 / 🟡需人读 4 / 🟢假阳性 81）。⚠️ 旧工具 🟠 口径过宽，56/81 是含假名的**合法日文**（假阳性） |
| 10 | **`CRED_ISO_9001` 167 处** | 🔴 新发现（取证等级仅门童计数） | pre-commit 门童 `真实计数` 报 167；menus 6 个 SKU 的 description/body 就各写「ISO 9001 certified production」。**须先定「是否存在 ISO 9001 证书」**（§0.23 无来源数字红线），再决定清或补证；本会话**未核实真伪** |
| 11 | **`BRAND_LOCALE_MISMATCH` 188 处（全量真值）** | 🔴 根因已定案，修法待裁 | 门童未截断真值 = **188**（此前只在 staged 里看到 39）。分布：`faqs[].a` **39** · `seo-zh-hk-subfield` 58 · 其他 91 · title 类 **0**。**39 处疑为死数据**（产品页 FAQ 走 `coreProductFAQMap`，全 src 无 `getSkuSeo().faqs` 消费点），且该文件是 CSV 派生（SOP-5 禁手搓）⇒ 候选修法 (a) 回 CSV 源头清 / (b) 确证死数据后**请 K3 拍板**给该族建豁免台账 |
| 12 | **`small-bags` 缺 `nameJa`** | 🟡 新发现 | `products.ts` 该 SKU 无 `nameJa` ⇒ 其 ja 段 imageAlt 折行无法用「真值来源」修（本批 25 条全部有源，故未受此限） |

---

## §6 再开工清单（照做即可）

```bash
cd F:\zprintpro-nextjs
# 0. 读状态（禁用未 fetch 的 @{u}）
git fetch origin main && git fetch origin_ssh main
git rev-parse --short HEAD; git rev-list --left-right --count origin/main...HEAD
# 1. 收尾信号（无 MM 且 staged 删除为 0 才可写 src/）
git status --porcelain -- src/          # 期望: 空
git status --porcelain | Select-String '^D ' | Measure-Object | Select -Expand Count   # 期望: 0
# 2. 口径自检
node -e "const m=require('./scripts/guards/title-equiv.js');console.log(m.TITLE_MIN,m.TITLE_MAX,m.band('x'.repeat(58)))"
node scripts/sku-title-census.mjs
node scripts/audit-sku-locale.cjs
# 3. 批次（dry-run 先行）
node scripts/apply-title-batch.mjs --batch=<name>            # dry-run
node scripts/apply-title-batch.mjs --batch=<name> --apply
# 4. 提交（唯一形式: add 与 commit 间无窗口）
git commit -F .hermes/_commit-msg-<batch>.txt -- <path1> <path2>
```

---

## §7 并发会话安全协议（硬约束）

- **收尾信号** = `src/` 无 `MM` **且** staged 删除归零。`MM` = 对方正在编辑。
- **禁止**代为清理对方 staged 删除；**只** `git add` 自己的文件。
- 等待期做**只读并行准备**（证据清单 / 审计工具 / 探针），不空转、不抢文件。
- 历史事故：2026-09-19 lane 与人手同时写 `src/data/blog-data/zh-hk.json` ⇒ 产出 `_broken-zhhk-lane-20260919.json` 坏版（§0.35.5）。

---

## §8 Push 纪律（本轮修正）

1. **先 `git fetch`**，再以 `origin/main...HEAD` 读积压（**禁用 `@{u}`**，见避坑 14）。
2. `origin` 与 `origin_ssh` **同 URL ⇒ 同一仓库**，不存在「推错目标」。
3. Push 前 5 项 verify：① 无中间态（无 `index.lock` / `rebase-merge` / 无半途 staged）
   ② push 目标 ③ 逐条扫描积压并标归属 ④ `src/` 改动范围 ⑤ 备份完整。
4. Push 后三段验证：① CF check-runs 全 success ② 关键 URL 200
   ③ **特征验证必须绕 CF 边缘缓存**（`?_cb=$(date +%s)` + `Cache-Control: no-cache`），
   确认线上返回的是**新**文案（例: `grep -o "10張起"`）。
5. 30 min 间隔硬下限（§0.25）；不足则 **commit 留本地立即结束**，**禁止 `Start-Sleep` 阻塞**。

---

## §9 变更日志（追加式）

### 2026-09-20 · 标题口径归一 + 结构解析 + 交生活书
**已完成**
- `cfa4ea44` 规则口径归一：`AGENTS.md`（§5 / §0.34.1 / §0.34.3 / §0.29.2.0 / §0.29.2.2 / §0.29 v3.1 块 / 规则表）+
  5 条 live prompt + 3 处脚本真阈值分叉（`title-audit-v4.mjs` / `sku-title-census.mjs` / `title-equiv.js` doc block）+
  删除 `sync-title-rule-50-58.mjs`；**更正 AGENTS.md 对 i18n-guard 的两处事实错误**（「中文=1.5」与「上限 65」皆不成立）。
- `cfa4ea44` 门禁缺口修复：`.hermes/cron-prompts/` 补入 `FULL_EXEMPT_PATHS`
  （原只在 `EXEMPT_PATHS` ⇒ `SOP10_CERT_NO` 仍硬拦 ⇒ **5 条 live prompt 长期无法提交**）。
- `15d16aec` 门童 #23 头注更正（「已施加」≠「已生效」）。
- `97869fc5` `trim-58` 批次：8 槽落盘，违规 **28→20**，当量 == 58 **清零**。
- `021d26b9` `school-flyers` `imageAlt.ja` 清除繁体污染（`學校`→`学校` + 去重复）。
- `2638137b` `apply-title-batch.mjs` 增 `trim-58` 批次定义。
- `d45bd4d9` `error-patterns.md` 入档 `STALE_REMOTE_REF_FALSE_BACKLOG`（第 6 种度量陷阱）。
- `a909538f` `scripts/audit-sku-locale.cjs`（结构解析审计，根治 4 次归属类误判）。
- 本活书 + 技能 §五/§六/§七 追加。

**净结果（可复算）**
| 指标 | 值 |
|---|---|
| 标题违规总数 | **28 → 20**（当量 == 58 由 8 → **0**） |
| census byBand | `OK 242→250 / FILL 30 / TRIM 28→20` |
| 行为不变验证 | census 与 title-audit-v4 的 byBand **改前改后一致**（证明仅文本更正） |
| 规则同源 | 代码 / `AGENTS.md` / `docs §6-3` / 5 条 prompt / 报告元数据 **五处同源** |
| 真实品牌-语种错配 | **13 处**（首次用结构解析得出；此前「105」为假阳性） |
| 本会话自身失误 | **4 次同族**（量测口径），**全部当场拦截未上线**；已入档 |

### 2026-09-20 19:36 · menus 起印量口径对齐 + 品牌/语种错配清账（`a2f636e6`）

**起点状态核对（先证伪三条既有结论）**
- 「4 条本地 commit 待推」→ ❌ **已不成立**：并发车道 19:08 已把 4 条推进远端（`origin_ssh`），本侧 `origin/main` 也未 fetch 到 → 一度误判「0 积压」。**真因**：`main` 的 upstream 是 `origin_ssh/main`，只 fetch `origin` 会看到过期 ref（新避坑 20）。
- 「menus 文案层被并发阻塞」→ ❌ **已解除**：`src/` 无 `MM`、staged 删除 0（收尾信号首次满足）。
- 「`scripts/menus-evidence.cjs` 已被清理删除」→ ❌ **不成立**：该文件在库（`9330f96b` 入库，2539 字节），且 `scripts/verify-menus.cjs` 同样在库。

**已完成（`a2f636e6`，1 文件 / 27 行）**

| 组 | 内容 | 当量 |
|---|---|---|
| menus 标题 10 处 | 真值 SSoT = `products.ts`（pvc/laminated/hardcover/drink `minQuantity=10`，disposable=100，wedding=50） | 57/54/57/57/56/55/57/57/53/54 全落 [50,57] |
| ja description 品牌 8 处 | 尾部 `\| 智印港` → `\| ZprintPro` | — |
| imageAlt 语种错配 5 处 | `large-envelopes/ja`（整条纯中文）·`exercise-books/ja`·`textbooks/ja`（`學校`→`学校`）·`thick-greeting-cards-400g/en`·`foil-greeting-cards/en` | — |
| imageAlt 内容错挂 **4 处（本轮新发现）** | `hardcover-menus/ja` 挂 pvc 中文句；`drink-menus/zh-hk`+`ja`、`disposable-menus/ja` 挂别 SKU 中文 FAQ 句 | — |

**可复算净结果**
| 指标 | 改前 → 改后 | 取证 |
|---|---|---|
| ja/en 段「智印港」 | 13（8 desc + 5 alt）→ **0** | `node scripts/audit-sku-locale.cjs` |
| zh-hk 段 ZprintPro / ja 繁体专用字 / en CJK | 0 → 0 | 同上 |
| menus 标题越界 | pvc zh-hk 66(超) · lam/hard zh-hk 37(不足) · 两 en 62(超) · pvc/hard ja 声称 100 与真值 10 矛盾 → **全清** | `node scripts/verify-menus.cjs` |
| tsc | 54 → **54**（持平） | `npx tsc --noEmit` |
| 探针 | 38 PASS / 0 FAIL | `node scripts/probe-skill-handover.mjs` |
| 编码门禁 | 0 | `node scripts/check-encoding.js` |

**本轮新增工具 / 避坑**
- 新增 `scripts/apply-menus-locale-fix.cjs`：**结构定位**落盘器（按 `"slug": {` 段落 + 配平花括号定位 `imageAlt` 块 / `ja.description`；块内旧串必须恰好命中 1 次；新标题当量先断言区间；命中数不符即跳过并报错）。
- **避坑 20（新）**：`origin` 与 `origin_ssh` 同 URL 但 **ref 各自独立**；`main` 的 upstream 是 `origin_ssh/main` → 只 fetch 一个会读到过期积压状态，与避坑 14（禁用未 fetch 的 `@{u}`）同族但**更隐蔽**（fetch 了、还是错）。判据：先 `git config branch.main.remote` 再 fetch 那个 remote，并同时 fetch 另一个。
- **避坑 21（新）**：**dry-run 的价值在于抓「候选本身写错」**，不只是防呆。本轮 dry-run 当场拦下：两处 en 新标题当量 60/62 越界（我按直觉估的删减量不够）、一处 imageAlt 目标串按旧笔记假设的位置**根本不存在**（`pvc-menus/ja` 实际是正常日文，真正的错挂在 `hardcover-menus/ja`）。**「交接文档写的清单」是二手证据，落盘前必须用程序核实命中数**。

**本批未做（不得声称已修）**
1. menus 数据层 `description`/`body` 仍写「50 本起 / 100 本起 / 100 張」+「ISO 9001 certified」→ 与已改标题矛盾（避坑 18「只落一半」正在发生，见 §5 第 6/10 项）。
2. 约 28 处 ja `imageAlt` 疑仍装 zh-hk 中文句（量测 `node scripts/audit-ja-imagealt-fold.cjs ja`：🔴 0 / 🟠 28，🟠 需人读确认后才可动）。
3. `a2f636e6` **未 push**：距上一远端 push（并发车道 19:08）不足 30 min 硬下限，按 §0.25.8 **commit 留本地、不做 `Start-Sleep` 阻塞**。
4. 临时取证脚本（`.hermes/_tmp-dump-alt.cjs` / `_tmp-list-alt.cjs` / `_tmp-dump-locale.cjs` / `_tmp-hkfold.cjs` / `_tmp-commit.ps1`）留在 `.hermes/` 未清理；**有用者已转正** `scripts/audit-ja-imagealt-fold.cjs`（避坑：`_` 前缀会被清理规则命中）。

### 2026-09-20 20:11 · 起印量数字声称对齐 + ja imageAlt 折行清账 + brand-locale 根因定案

**已完成（3 个 commit）**

| commit | 内容 | 规模 |
|---|---|---|
| `b7da6fe5` | menus 起印量「数字声称」全字段对齐 10（zh-hk description / en·ja description / 三语 body / en h1） | 30 行 |
| `98af3752`+`a2f636e6` | 活书第一轮 + menus 标题/品牌错配（前一段已记） | — |
| `deda45f9` | ja `imageAlt` 折行 **25 处**清账 + 4 个只读分诊器入库 | 5 文件 |

**关键净结果**

| 指标 | 值 | 取证 |
|---|---|---|
| menus 数字声称（含 title/description/body/h1） | 6 SKU × 3 locale 全部对齐 `minQuantity`（10/10/10/10/100/50） | `node scripts/verify-menus.cjs` + 逐条 dump |
| ja imageAlt 折行 | 🔴 确证 **25 → 0**；余 🟡4（需人读）/ 🟢81（前工具误报） | `node scripts/diag-brand-audit-gap-and-alt.cjs` |
| `BRAND_LOCALE_MISMATCH` 全量真值 | **188**（此前只见 staged 里 39） | `common.SCAN_STATS` 未截断真值 |
| 其中 `faqs[].a` | **39**，且疑为**死数据**（产品页 FAQ 走 `coreProductFAQMap`，全 src 无消费点） | `page.tsx` L244-248 + 全仓消费点检索 |
| 回归 | `tsc` 54=54 · 探针 38 PASS/0 FAIL · 编码 0 · 结构审计四项 0 | 见各 commit |

**★ 本轮新增避坑 22（量测域不同 ≠ 口径冲突）**
「A 工具报 39、B 工具报 0」时，**第一动作不是判谁错**，而是把**两个工具的字段域并排列出**。
本轮真因：审计工具 `audit-sku-locale.cjs` 只覆盖 `seo[locale].{title,description,h1}` + `imageAlt[locale]`，
**整族漏掉 `faqs[]`**（无 locale 结构的共享数组），而 39 处全在 `faqs[].a` ⇒ 两边其实**合账**（39 = 39）。
⇒ **教训：报「0 命中」的审计工具，必须先声明自己的字段域**；否则 0 无法与任何外部计数对账。
（同族：避坑 2 单一方法必错、避坑 9 行级计数掩盖同行第二匹配、避坑 14/20 stale ref。）

**本批未做（不得声称已修）**
1. `faqs[].a` 39 处中文值：**未动**（疑死数据 + CSV 派生禁手搓）⇒ 候选修法 (a) 回 CSV 源头 / (b) 确证死数据后请 K3 拍板设豁免台账。
2. `BRAND_LOCALE_MISMATCH` 其余 149 处（`seo-zh-hk-subfield` 58 + 其他 91）未动。
3. 🟡 4 条 ja imageAlt（`eco-paper-bags`/`small-bags`/`a1-posters`/`display-posters`）需人读；`small-bags` 在 `products.ts` **缺 `nameJa`**，无法走真值来源修。
4. `CRED_ISO_9001` 167 处真伪未核实。

### 2026-09-20 20:14 · menus 残留 4 处收口 + 自报指标不一致根因（`43945538`）

> **本段由另一并发会话追加**（即 §0 所指的「并发会话」双方之一）。本段**只记事实与取证**，不改写前文（§0.34.2）。

**起点核对（先证伪三条我方旧结论）**

- 「`d45bd4d9`/`a909538f`/`885d03d9` 待推」→ ❌ **已不成立**：`git fetch` 后 `origin/main..HEAD = 0`，
  三条均已推进远端（我方 `9330f96b` 亦被并发方一并推进）。
- 「`src/` 被 8 个 `MM` 阻塞」→ ❌ **已解除**：`git status --porcelain -- src/` = 0，staged 删除 = 0。
- 「`scripts/_menus-evidence.cjs` 被并发清理删掉」→ ❌ **不成立**：`git log --all` 为空 = **从未被跟踪**，
  文件始终在盘。真因 = `git add` 遇不存在 pathspec **整体失败**（详见 `COMMIT_MSG_OVERCLAIMS_TREE`）。

**已完成（`43945538`，3 文件）**

| # | SKU / locale | 改前 → 改后 | 依据 |
|---|---|---|---|
| ① | `drink-menus` / zh-hk | `10本起` → **`10份起`** | 真值 `unitLabel=份`，且**同记录 description/body/FAQ 三方全写「10 份」** → 记录内自相矛盾 |
| ② | `drink-menus` / ja | `10枚〜` → **`10份〜`** | 同 ①（数字已被并发批对齐，**单位字被漏**） |
| ③ | `disposable-menus` / en | `$99+` → **`$100+`**（e 49→**50**） | 同记录 description/body 均写 `over $100` → 兼修长度与数值矛盾 |
| ④ | `disposable-menus` / ja | 补「印刷」(e 46→**51**) | 该 SKU ja keywords 首项；沿用同簇姊妹句式 |

**可复算净结果**

| 指标 | 值 | 取证 |
|---|---|---|
| menus 簇标题落带 | **18/18**（6 SKU × 3 locale，0 超格 0 不足） | `node scripts/verify-menus-equiv.cjs` |
| 品牌-语种错配（4 项） | ja「智印港」**0** / zh-hk「ZprintPro」**0** / ja 繁体专用字 **0** / en CJK **0** | `node scripts/audit-sku-locale.cjs` |
| tsc | **54 = 基线 54**（`sku-seo-data.ts` 0 error） | `npx tsc --noEmit` |
| 编码门禁 | **0**（3/3 UTF-8 LF） | `node scripts/check-encoding.js` |

**新增工具**
- `scripts/verify-menus-equiv.cjs` — **从文件读取**的当量复算器（逐 SKU 切片取 title，输出 equiv/len/带内判定/非 ASCII 码位）。
  存在理由见下条避坑 23：手打字符串会经 shell 改写，不可信。

**★ 本轮新增避坑 23（自报指标与复算不一致 ⇒ 先查输入通道，勿先怀疑工具）**
手打 `"…$99+…"` 经 `node -e "…"`（PowerShell 双引号）传入 `equiv()` 得 **46**，文件实测同行得 **49**，**三个 title 上稳定差 3**。
「稳定偏移」最像工具 bug，极易误判为「当量函数处理 `$`/`+` 有缺陷」。
**真因**：PowerShell 双引号内 **`$99` 被变量展开**，传进去的根本不是文件里的字符串。
⇒ 判据：**稳定偏移 ≠ 必然工具 bug**；更常见的是**输入通道确定性改写**（shell 展开 / heredoc / 引号 / 编码）。
⇒ 修法：**凡复算「文件里的值」必须从文件读**；两法不一致时**先 dump 输入**（len + 码位）而非怀疑量具；
双方法复算必须在**同定义域**（补 `DOUBLE_METHOD_RECOUNT` 的隐含前提）。已入档 error-patterns。

**★ 本轮新增避坑 24（PowerShell 落盘证据 = UTF-16LE + CRLF 双陷阱）**
`node x.cjs | Tee-Object -FilePath out.txt` → git 判为 **`Bin`**，`check-encoding.js` 再报 **CRLF 57 行**。
真因：PowerShell 重定向默认 **UTF-16LE（`FF FE` BOM）**，叠加 `Out-String` 的 `\r\n`。
⇒ 禁 PowerShell 重定向落盘文本；用 `fs.writeFileSync(p,c,'utf8')` + 正规化 `\r\n`；
落盘后自检三件（无 BOM / 不出 `Bin` / encoding exit 0）。已入档 `POWERSHELL_OUTPUT_ENCODING`。

**并发协议实测（本段建立的锁首次运行）**
- 已建 `SESSION_LOCK.md`（仓库根）：声明持有者 / 意图 / 写入范围 / 30 min TTL / 释放条件 + 接管区。
  **不替代** `.hermes/locks/lane.lock`（机器强制，定时车道）；改 `blog-data/*.json` 前仍必须看 lane.lock。
- 实测发现：**并发会话全程未读活书**（它另建 `docs/2026-09-20-handoff-12seg-and-b2b3.md`），
  ⇒ 已修**发现机制**：本活书新增 **§0「关联产物（唯一发现入口）」** 登记全部同族产物，
  并与对方 handoff 建立**双向指针**（正文合并留待安全窗口，见 §0 阶段 2）。
- 实测发现：**并发会话在本轮内仍持续写入**（20:13:47 仍在写 `.hermes/logs/moq-scan-latest.json`），
  且**会 `git reset` 自己的 HEAD**（`reflog` 数次 `reset: moving to HEAD`）→
  **「收尾信号满足」≠「可以写 `src/`」**。判据应加一条：**需叠加「对方 N 分钟无写入」**。

**本批未做（不得声称已修）**
1. `43945538` **未 push**：距远端上次 push（20:09:17）不足 **30 min 硬下限**（窗口 20:39:17 开），
   按 §0.25.8 **commit 留本地、禁止 `Start-Sleep` 阻塞**。
2. `faqs[].a` 中文值、`BRAND_LOCALE_MISMATCH` 其余 149 处、🟡4 条 ja imageAlt、`CRED_ISO_9001` 167 处 —— **均沿用上一段口径，本批未动**。
3. menus **数据层** `description`/`body` 的「50 本起 / 100 本起」措辞：本批只改 title，**正文未逐条复核**（避坑 18 风险仍在）。
4. 仓库 dirty 文件 **619 条**（`??` 占绝大多数）未盘点分类（该入库 / 该 gitignore / 可删）。



