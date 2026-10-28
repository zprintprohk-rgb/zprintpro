# 2026-10-29 · C6/A15 执行报告 — GSC数据/index.json 重建 + 门童 #9 新鲜度恢复

> 角色：ZprintPro 首席 SEO/AEO/GEO 数据战略分析师
> 依据：三战略文件优先级交叉判定（10/26 双引擎 §7 周末闸门 + 10/28 three-strategy §七 + 10/28 data-driven §7）
> 日期：2026-10-29（Asia/Shanghai）· 状态：✅ 已执行并验证

## VERDICT / CONSUMED / DELIVERED / NEXT

- **VERDICT**: OK（C6/A15 收尾 — GSC 数据源新鲜度闸门恢复真值；零 src 客户可见内容改动）
- **CONSUMED**: `docs/2026-10-29-gsc-calibration-report.md`（K3 指令指定，落 docs\，对齐 9/10 先例 846edfd4）· `.hermes/logs/2026-10-29-ZP-gsc-feedback.md` + `2026-10-28-ZP-gsc-feedback.md`（GSC 车道前后轮）· `.hermes/logs/2026-10-29-morning-k3-action-list.md` · `.hermes/logs/2026-10-28-eod-strategist-session.md` · `.hermes/logs/2026-10-29-data-driven-batch13-report.md` · `.hermes/logs/2026-10-29-daily-content.md` · GSC数据/ 目录现况（238 文件）· `GSC数据/index.json`（重建前 lastBuild 2026-10-10 / latestFreshData 2026-10-09）
- **DELIVERED**:
  1. `scripts/rebuild-gsc-index.mjs`（新增，SOP-5 合规重建器：目录扫描 → 重算 filesByDate/totalFiles/latestFreshData/stalenessDays/freshnessStatus，保留 files 数组与 schema 骨架，幂等可复跑）
  2. `GSC数据/index.json`（重建：lastBuild 2026-10-29T03:46 / totalFiles 238 / latestFreshData 2026-10-29 / stalenessDays 0 / freshnessStatus FRESH / filesByDate 补入 10/15-10/29 五批 + 9/3 遗漏批 / notes 补 2026-10-29 条）
  3. `scripts/guards/gsc-source-guard.js`（一行修复：`index.stalenessDays || -1` → `?? -1`，消除 0 被渲染为 -1 的测量失真）
- **NEXT**: 11-01 教科書 churn 47.1 月复盘 · 11-03 C4/C6 验证点（面板 §3 join 需 K3 导出 query×page×country 双档）· 11-04 年賀状/貼紙 14 天位次复测 · 每次 GSC 新档落盘后由重建器重跑（SOP-5 禁手搓）

## 一、为什么这是当前最高优先级可执行项（三战略交叉判定）

| 战略文件 | 对应条款 | 判定 |
|---|---|---|
| 10/26 双引擎 | §7 周末闸门（P0 未拍板前只做诊断+无风险项） | ✅ 本项 = 数据诊断/闸门修复，零新增文案，合规 |
| 10/28 three-strategy | §七 P0「运行时与诚实验收」/ §6 自动任务事故根因 | ✅ A15 = 假 FRESH 事故同族，19 天未修，门童 #9 失明 |
| 10/28 data-driven | §1 执行健康指标（index 新鲜度）/ §6.1 preflight | ✅ 门童 #9 依赖 index.json freshnessStatus 判断 GSC_STALE |

**对齐先例**：9/10 校准轮 `846edfd4` 在同一流程里更新了 index.json（latestFreshData→2026-09-10, FRESH）；10/29 校准轮 `9ff9a55e` 只做了矩阵回灌 + 校准报告，**未重建 index** → 本批补上该先例的收尾动作。

## 二、执行细节

### 2.1 重建前状态（证据）
- `GSC数据/index.json`：`lastBuild 2026-10-10T22:43` · `latestFreshData 2026-10-09` · `stalenessDays 1` · `freshnessStatus FRESH`（**假 FRESH**：实际已 19 天未随新档更新）
- 目录实际：238 文件，含 10/15（12 档）/ 10/16（4）/ 10/19（4）/ 10/23（8）/ 10/29（4，K3 01:16-01:23 导出）五批新档 + 9/3 遗漏批（18 档）
- 影响：门童 #9（gsc-source-guard 检查②，读 index.json 实时校验 72h 新鲜度）持续失明 → GSC_STALE 无法触发 → 引用旧文件当新证据的防线失效

### 2.2 重建器设计（SOP-5 合规）
- index.json 为派生文件，禁手搓（SOP-5）→ 新建生成器 `scripts/rebuild-gsc-index.mjs`：
  - 递归扫描 `GSC数据/`，排除 index.json 自身
  - 按路径中 `20xx-xx-xx` 日期 token 归组 filesByDate（无日期 token 落入 `undated`/`extracted-0809` 组）
  - totalFiles = 实际文件计数（含 gitignored xlsx，真实目录口径）
  - latestFreshData = filesByDate 最大日期；stalenessDays = 今日−数据日；freshnessStatus = ≤72h ? FRESH : STALE
  - 保留既有 files 数组（parseable 制品登记，123 条）与 schema 骨架；notes 幂等追加
- 幂等验证：dry-run 与 --write 输出一致（totalFiles=238 / latestFreshData=2026-10-29 / FRESH），重跑无漂移

### 2.3 门童 #9 修复（一行）
- `gsc-source-guard.js` L70：`stalenessDays: index.stalenessDays || -1` → `?? -1`
- 原缺陷：stalenessDays=0（同日新鲜）时 `0 || -1` 渲染为 -1，测量失真
- 修复后 loadGscIndex：`stalenessDays 0 / freshnessStatus FRESH / latestFreshData 2026-10-29` ✓

## 三、验收（双方法 + 三闸门）

| 项 | 方法 1 | 方法 2 | 一致 |
|---|---|---|---|
| totalFiles | 重建器扫描 238 | PowerShell `Get-ChildItem -Recurse` 计数 238 | ✅ |
| latestFreshData | 重建器 max date = 2026-10-29 | GSC数据/ 目录 10/29 xlsx 4 件存在（01:16-01:23 mtime） | ✅ |
| freshnessStatus | 0×24 ≤ 72 → FRESH | 门童 loadGscIndex 读回 FRESH | ✅ |
| filesByDate 完整性 | 重建器 24 组日期 | 目录 Group-Object 24 组（含 9/3 遗漏批 18 件独立验证） | ✅ |
| 幂等 | 重跑 dry-run 数值不变 | — | ✅ 无漂移 |

三闸门：① 匹配口径（先 dump 目录真实文件名再写日期 regex，9/3 批 18 件逐件人工核对为真）✓ ② 响应有效性（loadGscIndex 实读 index.json 返回值含全部字段）✓ ③ 确定性（dry-run 与 write 两次一致）✓

## 四、门禁

- tsc：54=54 基线持平 ✓（`npx tsc --noEmit` 误差 54 条，与基线一致）
- encoding：`check-encoding.js --fix` 无 staged 问题 ✓
- brand：`check-brand-mentions.mjs --strict` A 类 0 ✓
- regression guard：🔴 0 / 🟠 663（shadow 不拦截，存量基线内）✓
- JSON 有效性：`require('./GSC数据/index.json')` 解析通过 ✓
- 零 src 客户可见内容改动（只动 scripts 工具 + GSC 数据资产）→ §0.23.1 门童 #16 不涉及 ✓

## 五、附带发现（数据诚信登记）

1. **matrix 结构嵌套异常**：`gsc_feedback_2026_10_29` 与 `gsc_feedback_2026_10_15` 两个 block 实际嵌套在 `gsc_feedback_2026_10_13` 内部（非顶层键），与其它 `gsc_feedback_YYYY_MM_DD` 顶层 block 结构不一致。**内容无丢失**（raw 文本存在，可读），且无脚本消费者依赖该嵌套路径（已 grep 验证）→ 不擅改结构（避免大 diff 风险），登记待未来规范。commit 9ff9a55e 声称"10_29 block"已回灌，**内容确实在**，但层级与声明不符。
2. **KPI 面板刷新受限**：`k3-kpi-panel.mjs --pull=2026-10-29` 需要 `gsc-deep-analysis-2026-10-29.json` + query×page×country CSV（10/29 批仅导出了 4 个汇总 xlsx，无 query 级产物）→ 面板 §3 join 待 11-03 验证点前 K3 导出 query×page×country 双档。校准报告 §2 已覆盖四指标（clk 497/imp 20,977/CTR 2.37%/pos 13.52）。
3. **GSC 校准报告落位确认**：`docs/2026-10-29-gsc-calibration-report.md` 已在 docs\（commit 9ff9a55e），格式对齐 9/10 先例（§1 口径/§2 指标/§3 带钱词/§4 锚点/§5 盲开/§6 结论 + 数据来源行）✓

## 六、push 与线上验收

- commit `f98c8d89`（2026-10-29 03:50:58）+38 min 自 519604ff 03:14:06 → §0.25.1 30min 硬下限满足
- push `519604ff..f98c8d89 main -> main`（03:56，cf-check-run 30m 窗口实测通过）→ 远端 head = 本地 head ✓
- CF Pages check-run 已为 f98c8d89 生成（gate 下一轮自动识别 "last push f98c8d89"）
- 线上 smoke：`/zh-hk/ /ja/ /en/` 全 200（`/` 308→`/zh-hk/` 为预期 x-default 跳转）✓
- 门禁复盘：encoding 4 文件 UTF-8 LF ✓ · tsc 54=54 ✓ · brand A=0 ✓ · regression 🔴0 ✓ · gate#9 对本报告 exit 0（无 STALE）✓
- 攒批判定：4 文件（2 scripts + 1 GSC数据 + 1 报告）≥3 非 docs → 满足 §0.25.9 阈值

## 数据来源

```
数据来源:
- GSC数据/index.json（重建前 lastBuild 2026-10-10 / 重建后 2026-10-29T03:46, 本会话生成）
- GSC数据/ 目录扫描（Get-ChildItem -Recurse, 238 文件, 2026-10-29 03:45 实扫）
- docs/2026-10-29-gsc-calibration-report.md（K3 指定读取, 对齐 9/10 先例 846edfd4）
- .hermes/logs/2026-10-29-ZP-gsc-feedback.md（RECOVERY 109.9% / 28d KPI, lane 2026-10-29 01:21）
- .hermes/logs/2026-10-28-ZP-gsc-feedback.md（上轮 A15 判定 / WARN_STALE 口径）
- .hermes/industry-keyword-matrix.json（priority_boost_history 2026-10-29 条 + last_gsc_feedback_update 实读）
- git log origin/main（9ff9a55e 校准轮 / 846edfd4 9/10 先例, 2026-10-29 03:35 查）
校准状态: 已校准（2026-10-29 C6/A15 轮; 门童 #9 读回 FRESH 实测通过）
```
