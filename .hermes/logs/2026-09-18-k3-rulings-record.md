# K3 拍板落地记录 — 月曆价格口径 / P0-3 UTM / autoclaw 清理 (2026-09-18)

> **数据来源**: K3 2026-09-18 会话回复 3 项；原值取自 `src/data/blog-data/*.json` 实测（探针 1-5）；机审结果取自 `node scripts/check-regression-guard.js --dod` 与端到端负向测试脚本实测输出。

---

## 一、月曆印刷价格口径 — K3 裁定 HK$8-25/份 ✅ 已落地

**K3 原话**: 「HK8-25/份」

### 1.1 事故（我上一轮上报的遗留项）

同一品类（月曆印刷）在**同一站点同一语言**上存在三个互不相容的基准价区间，最大差 **3-5 倍**：

| 文章 (slug) | zh-hk | en | ja |
|---|---|---|---|
| `calendar-printing-guide` | HK$3-8/本 | $0.40/pc | 1部50円から |
| `2027-calendar-printing-complete-guide` | HK$14-57/本 | US$1.80-7.30/pc | 1冊280〜1,140円 |
| `2027-monthly-calendar-printing-timetable` | HK$3-15 | $0.40-1.90/pc | $0.40-1.90/冊 |

三篇都是 2026-08/09 批量生成，**各自算术自洽、互相矛盾**——单看任一篇发现不了，只有横读三篇才暴露。

### 1.2 落地口径

- 基准区间 = **HK$8-25/份**
- 汇率口径**沿用文章自身换算，不新定汇率**：
  - en: 文章 A 自身 `14/1.80 = 7.78`、`57/7.30 = 7.81` → **7.8** ⇒ **US$1.00-3.20/pc**
  - ja: 文章 A 文中明示 `HK$1 = 20円` ⇒ **160〜500円/冊**

### 1.3 改动清单（共 34 处，全部按 slug 窗口限定作用域）

| locale | 文件 | slug | 改动 | 处数 |
|---|---|---|---|---|
| zh-hk | blog-data | `calendar-printing-guide` | `HK$3-8/本` → `HK$8-25/本` | 6 |
| zh-hk | blog-data | `2027-calendar-printing-complete-guide` | `HK$14-57/本` → `HK$8-25/本` | 3 |
| zh-hk | blog-data | `2027-monthly-calendar-printing-timetable` | `單本 HK$3-15` → `單本 HK$8-25`（平均 HK$8 → HK$16） | 2 |
| en | blog-data | `calendar-printing-guide` | `$0.40/pc` → `US$1.00/pc`（含 `from`/`<strong>`/`From $`/`start at $`/`($… from` 5 种上下文变体） | 7 |
| en | blog-data | `2027-calendar-printing-complete-guide` | `US$1.80-7.30` → `US$1.00-3.20` | 2 |
| en | blog-data | `2027-monthly-calendar-printing-timetable` | `$0.40/pc` → `US$1.00/pc`；`$0.40-1.90/pc` → `US$1.00-3.20/pc` | 3 |
| ja | blog-data | `calendar-printing-guide` | `1部50円から` → `1部160円から` | 7 |
| ja | blog-data | `2027-calendar-printing-complete-guide` | `1冊280〜1,140円` → `1冊160〜500円` | 2 |
| ja | blog-data | `2027-monthly-calendar-printing-timetable` | `$0.40-1.90/冊` → `HK$8-25/冊` | 2 |

差额说明：`calendar-printing-guide` zh-hk 6 处 vs en 7 处，因 en 版单價表行与「数据来源行」措辞不同（`From $0.40/pc` / `($0.40/pc from`），首轮规则漏掉 3 处，由**门童 #19 全量复核抓出后补丁 2 修掉**。

**处数口径与更正**（§0.23 数据诚信）:
- 本表按**出现次数**计 = zh-hk 11 + en 12 + ja 11 = **34 处**（实测脚本 `.hermes/count-calendar-price-changes.cjs`）
- 与之相对，`git diff` 只显示 **16 条差异行**（一行内可含多处）
- ⚠️ **更正**: commit `3b8ec078` 的消息里写成「共 19 处」，**该数字错误**（既非 34 也非 16，是我行文时的笔误）。
  该 commit 已 push，不做 force-push（§0.17 amend 月上限 2 次）；**以本文件 34 处为准**，此文为更正记录。

### 1.4 ★ 作用域陷阱（必须记住）

全文 `split/join` 会**跨品类误伤**，实测：

| 字符串 | 全文 | 属月曆 | 其余归属（**不得改**） |
|---|---|---|---|
| `HK$14-57/本` | 7 | 3 | `saddle-stitch-booklet-printing-guide`(3) + `catalog-printing-china-supplier-guide`(1) = **騎馬釘小冊子價** |
| `HK$3-8/本` | 9 | 6 | `2027-calendar-printing-complete-guide` 内 3 处 = **燙金附加費**（非月曆單價） |

⇒ 必须**按 slug 窗口限定**（相邻 `"slug":` 键之间），并对「必须保留」的同类字符串设反向断言。

### 1.5 机审（DoD 铁律：无规则不修）

- 门童 **#19 `CALENDAR_PRICE_BAND`**（red 硬拦）: `scripts/guards/price-band-guard.js`
  - **不依赖变更文件列表**，每次 commit 全量复核三篇 × 3 locale（否则改 `.tsx` 的那次 commit 会漏过价格回归）
  - 必需断言（基准区间字样必须存在）+ 禁止断言（旧值必须 0）+ 边界断言（他品类同名价必须保留）
- 规则书: `.hermes/regression-guard/error-patterns.md` → `CROSS_ARTICLE_PRICE_CONFLICT`
- **端到端负向测试通过**: 注入 `HK$14-57/本` → 门童报 1 命中（red）；还原 → 0 命中

### 1.6 断言实际拦下的写入（§12 三件套有效性实证）

`fix-calendar-price-band-20260918.cjs` 运行中共 **2 次拒绝写盘 + 自动回滚**：
1. 首跑：5 条计数不符（作用域误判为全文）→ 拒绝写盘
2. 二跑：3 条形状断言不符（**断言本身写错**）→ 自动回滚 3 个文件

**断言写错也会拦 —— 宁可误拦，不可误写。**

### 1.7 遗留（待 K3 一句话）

三篇正文内的**材质/行业子档次价格表**（zh-hk pillar 26 条、en pillar 27 条）仍跨越 **HK$2-57**，
**未纳入本次基准**（基准只统一「基准区间声明」）。子档次要否一并压进 HK$8-25 带内、
或另给各材质档位 → 待 K3 裁决。**不自行编造子档位价格**（§0.23 数据诚信红线）。

---

## 二、P0-3 UTM 归因 — K3 回复「已跑过」✅ 已完成

**K3 原话**: 「supabase/migrations/010_add_lead_source_attribution.sql 仍需你在 Supabase SQL Editor 跑一次（预期 4 OK） 已跑过 Success. No rows returned，都OK了的」

**状态判定**（per §0.24 笼统批准 ≠ 动作完成；本条**有动作回执**故得判定为完成）:

| 项 | 判定 | 证据 |
|---|---|---|
| 迁移 `010_add_lead_source_attribution.sql` | ✅ **已完成** | K3 执行回执「Success. No rows returned」（DDL 迁移无返回行 = 正常成功形态，非失败） |
| 4 个对象（列/索引/触发器/函数） | ✅ 已完成 | 同一 DDL 批次，`Success` 覆盖全语句 |

**口径说明**: `No rows returned` 对 **DDL**（`ALTER TABLE` / `CREATE INDEX` / `CREATE TRIGGER` / `CREATE FUNCTION`）
是**成功**的期望输出——只有 `SELECT`/`RETURNING` 才会返回行。故本次不是「未执行」或「无效果」。
后续验收以**实际写入 4 事件的归因字段非空**为准（下一次询盘落库后抽查）。

---

## 三、autoclaw「印刷需求雷达·首轮自动运行复查（一次性）」— K3 已删 ✅ 已复核

**K3 原话**: 「另一条只能在 autoclaw 内做：印刷需求雷达·首轮自动运行复查（一次性） 我删掉后，autoclaw 45 秒内回写重建了（它才是 jobs.json 的 owner） 有删除了。」

**复核实测（2026-09-18，`C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json`）**:

| 指标 | 值 |
|---|---|
| 任务总数 | **24**（我上一轮记录为 25 → K3 删除后 -1） |
| `首轮自动运行复查` 存在? | **否**（精确匹配 0 条） |
| enabled 任务数 | **1** |
| 唯一 enabled | `印刷需求雷达·每日采集 01:00`（`0 1 * * *` Asia/Shanghai） |

**结论**: 该项已在 **autoclaw 内部**删除且**未被回写重建** —— 印证「autoclaw 才是 jobs.json 的 owner，
外部改文件会被 45s 内覆盖」的判断。后续任何 autoclaw 任务增删**一律走 autoclaw UI/接口**。

---

## 四、当前未决项

| # | 项 | 状态 |
|---|---|---|
| 1 | `ZprintPro-CronWatchdog-2125` 提权删除 | 🔴 待 K3 以管理员运行 `.hermes/cron-run/delete-legacy-watchdog.cmd` |
| 2 | 月曆正文子档次价格表（HK$2-57）是否压进 HK$8-25 | 🟡 待 K3 一句话 |
| 3 | `exit=0` 假成功（lane BLOCKED 但 dsh 返 0） | 🟡 wrapper 需加「本次是否产出新报告」断言，无产出转非 0 |
| 4 | 今晚 21:17 `ZP-daily-content` 首验 | ⏳ 修复后第一次真实运行，须确认有新报告落盘 |
| 5 | DoD `--dod` 模式下 `I18N_POLLUTION` 未入规则书 | 🟡 存量问题（非本次引入），51 red 基线内 |

---

## 五、上线验收（push 后线上探针）

**push**: `ed9c72fc..3b8ec078` (2026-09-18 05:02:55)
**CF Pages build**: `success`（`node scripts/verify-deploy.mjs 3b8ec07` → PASS，run 105382571872）

**线上 curl 探针**（`node .hermes/probe-live-calendar-band.cjs`，三篇 × 3 locale = 9 URL）：

| locale | slug | 新值 | 旧值残留 | 结果 |
|---|---|---|---|---|
| zh-hk | `calendar-printing-guide` | HK$8-25/本 ✓ | 无 | PASS |
| zh-hk | `2027-calendar-printing-complete-guide` | HK$8-25/本 ✓ | 无 | PASS |
| zh-hk | `2027-monthly-calendar-printing-timetable` | HK$8-25 ✓ | 无 | PASS |
| en | `calendar-printing-guide` | US$1.00/pc ✓ | 无 | PASS |
| en | `2027-calendar-printing-complete-guide` | US$1.00-3.20 ✓ | 无 | PASS |
| en | `2027-monthly-calendar-printing-timetable` | US$1.00-3.20/pc ✓ | 无 | PASS |
| ja | `calendar-printing-guide` | 1部160円から ✓ | 无 | PASS |
| ja | `2027-calendar-printing-complete-guide` | 1冊160〜500円 ✓ | 无 | PASS |
| ja | `2027-monthly-calendar-printing-timetable` | HK$8-25/冊 ✓ | 无 | PASS |

**汇总: PASS 9 / FAIL 0** —— 本地 0 命中**且**线上 9/9 干净（per §0.23.1 教训：本地干净 ≠ 线上干净）。

---

**文件结束。**
