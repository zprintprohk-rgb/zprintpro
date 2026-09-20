# ZprintPro 交生活书（Handover Living Book）

> **性质**: **活书** —— 每次会话收尾**追加**一条「§9 变更日志」，并**更新** §2 状态快照。
> 不重写历史，只追加（per §0.34.2）。
> **用途**: 新执行层 / 下一位接手者 / 并发会话**第一份要读的文件**。
> **配套技能**: `zprintpro-self-evolution-hardening`（十九类避坑 + 九类能力）、
> `zprintpro-verification-discipline`（度量工具自身缺陷五类）。
> **创建**: 2026-09-20 · **最后更新**: 2026-09-20

---

## §1 一句话现状

**标题规则口径已三源同源（代码 / 书面 / 报告元数据），58 边界清零；当前唯一阻塞 = 并发会话正在编辑
`src/`（8 个 `MM` 文件），menus 文案层 7 处 DRIFT 待落。**

---

## §2 状态快照（每次收尾必更新）

| 项 | 值 | 取证方式 |
|---|---|---|
| 工作目录 | `F:\zprintpro-nextjs`（唯一生产目录, 目录铁律 §3） | — |
| 分支 / HEAD | `main` / 见 `git log -1` | `git rev-parse --short HEAD` |
| 远端 | `origin` 与 `origin_ssh` **同一仓库**（`git@github.com:zprintprohk-rgb/zprintpro.git`） | `git remote -v` |
| 积压 | ⚠️ **必须先 `git fetch` 再读** `origin/main...HEAD`；**禁用未 fetch 的 `@{u}`** | 见避坑 14 |
| 标题当量 SSoT | `scripts/guards/title-equiv.js` → `TITLE_MIN=50 / TITLE_MAX=57`；`band(57)=OK` / `band(58)=TRIM` | `node -e "..."` 实测 |
| 普查 | `node scripts/sku-title-census.mjs` → byBand `OK 250 / FILL 30 / TRIM 20`（当量==58 **0**） | census 复算 |
| 收尾信号 | `git status --porcelain -- src/` 无 `MM` **且** staged 删除归零 | 见 §7 |
| 线上 | 未在本次会话验证（未 push 任何内容；HEAD 与远端一致） | — |

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
| `scripts/_menus-evidence.cjs` | menus 簇实证片段清单（临时，供候选取词） | ⏳ 未入库 |

---

## §5 未完成事项（按优先级，含阻塞原因）

| # | 事项 | 阻塞 | 备注 |
|---|---|---|---|
| 1 | **menus 文案层 7 处 DRIFT** | 🔴 并发会话编辑 `src/` | 真值 10張/10份/10本/10份/100份；`pvc-menus/zh-hk` 66 需删 9；`laminated`/`hardcover` zh-hk 36 需补 14；两 en 62 需删 5；`disposable` en 49 / ja 46 需补 |
| 2 | **13 处品牌-语种错配** | 🔴 同上 | 8× ja description 挂 `\| 智印港`（→`ZprintPro`）；3× ja imageAlt（含 `large-envelopes` **整条纯中文**）；2× en imageAlt（`厚口 カード` / `箔押し カード`） |
| 3 | `I18N_POLLUTION` 扩集 | 🔴 需先取日本常用汉字表 | **必须用「常用汉字表补集」驱动**，禁止手工繁体清单（避坑 13） |
| 4 | 4 条预存跨语言 head | 🟡 需先定对应主词 | `custom-red-packets` zh-hk/ja、`save-the-date-cards` ja、`pvc-menus` ja —— 单变量批次，涉主排名词 |
| 5 | 剩余人工改写 ~35 条 | 🟡 待验证窗 CTR 报告 | 多为 ≤12 imps |
| 6 | 跨 SKU 共享模板句残留（避坑 19） | 🟡 数据层 | 5/6 menus SKU `name` 写 `防水PVC` 但 spec 无 PVC；`disposable-menus` feature 与 finishing 自相矛盾 |
| 7 | `wedding-menu-cards` 币种 | 🟡 | 价写 **NT$**（本站 zh-hk 应为 HK$）；且缺 `unitLabel` |
| 8 | GSIM / RFQ Schema | 🔴 无官方信源 | 维持 `PENDING_VERIFICATION`；**不得据营销来源改 Schema** |

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
