# AutoClaw 落地指令卡 · PLP/PDP v9.1

**卡号**：2026-09-09-autoclaw-plp-pdp-v91 · **版本**：v1.3（2026-09-09 修订：执行者改派本会话 AI 执行层；v1.2 改派人工作废；v1.1：§5 命令经 Git Bash 实测修正） · **签发**：2026-09-09 · **裁决**：CEO 终裁 P0 通过，立即执行
**执行者**：本会话 AI 执行层（无裁量权；2026-09-09 唐总改派「交给你来执行」，v1.2 人工改派作废；卡内「AutoClaw」执行字样一律按「执行者」读） · **复核**：M3（deepseek hermes 承接，AGENTS §0.34.2） · **验收人**：唐总（CF Preview 拍板）

---

## 0. 五大锁定点（总览）

| # | 锁定点 | 一句话 |
|---|--------|--------|
| 1 | 唯一蓝本 | 只许照 `design/plp-v9.html` + `design/pdp-v9.html` 执行，禁止自由发挥 |
| 2 | 范围锁死 | 仅 zh-hk `/category/stickers/` + `/product/waterproof-stickers/` 两个样板路由 |
| 3 | 内容零改动 | `git diff main --stat -- src/data/ messages/` 必须为空；只动结构/样式/排版 |
| 4 | 分支隔离 | `redesign/plp-pdp-v9` 分支 → CF Preview 验收 → 满意才 merge |
| 5 | 6 条验收命令 | 字号基线/1:1 图/工厂图/禁词/编码/编译，逐条写死，自验+M3 双闸 |

---

## 1. 锁定一：唯一蓝本（禁止自由发挥）

**蓝本文件（sha256 供执行前校验，不匹配即停）：**

| 蓝本 | 路径 | 大小 |
|------|------|------|
| PLP | `F:\zprintpro-nextjs\design\plp-v9.html` | 53,361 B |
| PDP | `F:\zprintpro-nextjs\design\pdp-v9.html` | 42,361 B |

执行规则：

1. AutoClaw **只做蓝本→src 路由的映射实现**，禁止引入蓝本没有的模块、配色、文案、间距、动效。
2. 设计令牌以蓝本 CSS 为唯一口径：卡片图 `aspect-ratio:1/1`、正文 14/15/16px、PDP H1 42px、PLP H1 27px。蓝本里没有的值不许出现。
3. 蓝本即验收标准：实现效果与蓝本渲染不一致 = 验收失败，无解释空间。
4. 映射点（蓝本 → src）：
   - PLP → `src/app/[locale]/category/[slug]/page.tsx`（数据取 stickers 相关模块，禁碰数据文件）
   - PDP → `src/app/[locale]/product/[slug]/page.tsx`（同上）
   - 页眉/左侧分类栏/页脚沿用现有 src 组件（蓝本 demo 区不搬），逐字节不动。

---

## 2. 锁定二：范围锁死（两个样板路由）

本次**只允许**改这两个 URL 的渲染层：

- `https://zprintpro.com/zh-hk/category/stickers/`
- `https://zprintpro.com/zh-hk/product/waterproof-stickers/`

**明令禁止：**

- 其余 15 个品类一律不进入执行范围，样板验收通过 + 唐总再次确认后才可批量。
- 不动 `/en/`、`/ja/` 版本（同一组件改动自然影响三语，但样式层三语共用属预期，文案零改动见锁定三）。
- 不动 sitemap、manifest、redirect、中间件、Next 配置。

---

## 3. 锁定三：内容零改动（可校验）

本次**只动结构/样式/排版**。校验命令（执行中、commit 前各跑一次）：

```bash
git diff main --stat -- src/data/ messages/
```

**通过判定：输出为空。** 非空 = 立即停手，`git restore` 回滚误改文件后重查。

**冻结区（逐字节不动）：** `src/data/` 全部、`messages/` 全部、页眉组件、左侧分类栏组件、页脚组件。文案、价格、SKU、FAQ 内容、NAP 一律零改动——它们来自数据文件，数据文件禁碰即天然冻结。

---

## 4. 锁定四：分支隔离（主线零影响）

```bash
git checkout main && git pull
# 注: redesign/plp-pdp-v9 分支已存在(commit=c92e0f60, 与 main 同点零差异), 直接 checkout 使用, 禁止重建:
git checkout redesign/plp-pdp-v9
# …执行映射实现, commit 用 conventional commits…
git push -u origin redesign/plp-pdp-v9
```

流程：

1. 全部工作只在 `redesign/plp-pdp-v9` 分支；main 全程零 commit。
2. push 后 Cloudflare Pages 自动出 Preview 部署，Preview URL 发唐总验收。
3. **满意才 merge；不满意不 merge**，改完重新出 Preview 再验。
4. merge 时用 merge commit（禁 squash），保留分支历史可回溯。
5. merge 节点避开周三 GSC cron 窗口（见 §8）。

---

## 5. 锁定五：6 条验收命令（写死，逐条执行）

**执行环境写死：Git Bash**（`C:\Program Files\Git\bin\bash.exe`）。本机 cmd/PowerShell 无 grep，禁止在 cmd/PowerShell 下跑。仓库根 `F:\zprintpro-nextjs`。pathspec 一律带 `:(literal)`（`[locale]` 会被 git 当 glob）。

1-5 条基于本次 diff 增行；判定以**输出行为准**（无匹配行=过；管道尾接 head 后 `$?` 不可靠，禁看 EXIT 判定）；第 6 条构建。

```bash
# ① 字号基线(白名单=蓝本令牌 12-22/27/42)：增行出现令牌外字号 = FAIL
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -E 'font-size:' | grep -vE 'font-size:\s*(12|13|14|15|16|17|18|19|20|22|27|42)px' | head -5

# ② 1:1 图：增行含 aspect-ratio:1/1 计数 ≥1 = PASS(卡片图按蓝本 1:1 实现)；0 = FAIL
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -c 'aspect-ratio:\s*1/1'

# ③ 工厂图：PDP 路由文件中 images/factory/ 引用 ≥1 = PASS；0 = FAIL(工厂实拍是信任要素, 禁删)
grep -c 'images/factory/' "src/app/[locale]/product/[slug]/page.tsx"

# ④ 禁词：增行 0 命中 = PASS(名片禁令 §0.0 + AI 标注泄漏)
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -iE '名片|咭片|business.?card|名刺|name.?card|SEO 主內容|可見正文|內部標注|kicker">AEO' | head -5

# ⑤ 编码：增行无乱码特征 = PASS
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -aP '\x{FFFD}|\xc3\xa3\xe2\x82\xac|\xc3\xa5' | head -5

# ⑥ 编译：生产构建成功 = PASS；报错 = FAIL(约 5-20 分钟, 闸门执行者完整跑)
npm run build:cf 2>&1 | tail -5
```

**幂等口径：** ①④⑤ 无输出行=过；② ≥1 过；③ ≥1 过；⑥ 构建成功为过。任何一条 FAIL → 停手修复 → 六条全部重跑，禁带病提交复核。

---

---

## 6. 双闸复核流程（顺序写死）

```
AutoClaw 自验 → 全过 → 提交 M3 复核 → 全过 → CF Preview → 唐总拍板 → merge
    │                              │
    └─ 任一 FAIL: 修复后六条重跑     └─ FAIL: 修复后回到自验闸重跑六条
```

- **闸一（AutoClaw 自验）**：§5 六条命令逐条跑、逐条留输出记录；锁定三 diff 空校验；蓝本渲染对照截图（桌面+移动）。**自验未过不得提交 M3。**
- **闸二（M3 复核）**：独立重跑六条命令 + 核对 `git diff main --stat -- src/data/ messages/` 为空 + 抽查 3 处蓝本↔实现一致性（PLP 卡片区/PDP 价格区/PDP 工厂图区）+ 名片禁词全 diff 扫描。**M3 未过不得请求 merge。**
- 双闸记录落盘 `docs/2026-09-09-v91-gate-records.md`（跑命令时间戳+输出摘要）。

---

## 7. 异常路径与回滚条款

| 场景 | 处置 |
|------|------|
| Preview 验收不通过 | 不 merge。在 `redesign/plp-pdp-v9` 上修复 → 重跑六条 → 新 Preview 再验；最多 3 轮，超轮次升级唐总裁定 |
| 自验/M3 发现数据文件被误改 | `git restore --source=main -- src/data/ messages/` → 重跑锁定三校验 → 重新走闸 |
| merge 后线上异常（回滚判定：首页/PLP/PDP 任一 500、渲染错乱、询盘按钮失效、转化率 24h 内跌超 50%） | ① `git revert -m 1 <merge-commit>` 生成回滚 commit 并 push；② 确认 CF Pages 重新部署回上一可用版本；③ 线上抽查两 URL 恢复 200+正常渲染；④ 24h 内向唐总提交复盘 |
| 回滚也失败 | CF Pages 控制台「Rollback」到上一个成功部署（部署历史保留 30 天） |
| 执行中发现蓝本与路由现状冲突（数据结构缺字段/组件能力不足） | **禁止自行发挥补齐**——停手，写明冲突点升级唐总裁定 |

---

## 8. 上线节点与效果观测

- **上线节点**：merge/上线动作**避开周三**（GSC cron 采集窗口），首选周四~周五上午（周中后置，留足工作日观察）。
- **三节点对比**（样板路由上线后，对比上线前 28 天基线）：

| 节点 | 观测项 | 数据源 |
|------|--------|--------|
| D+7 | CTR、平均排名、询盘数 | GSC + CF Analytics + 询盘表单后台 |
| D+14 | 同上 + 三语排名对比 | 同上 |
| D+28 | 同上 + 品类级转化率、跳出率 | 同上 |

- 每节点输出一页对比报告落 `docs/`，作为其余 15 品类批量决策的输入。数据采集与分析不在本次执行范围（仅条款约定）。

---

## 9. 五视角裁决记录

| 视角 | 裁决 | 理由 |
|------|------|------|
| ① PM | 支持 | 蓝本-映射-验收-回滚四段闭环，无模糊地带 |
| ② UI/UX+CRO | 支持 | 设计令牌写死，AutoClaw 无审美自由裁量权，杜绝「AI 默认审美」回潮 |
| ③ 运营/转化 | 支持 | 样板先行保护现有转化路径，preview 数据干净可归因 |
| ④ 数据分析师 | 条件支持 | 上线节点避开周三 GSC cron，验收后 7/14/28 天三节点对比 CTR/排名/询盘 |
| ⑤ **CEO 终裁** | **P0 通过，立即执行** | 五视角无反对，条件项已写入 §8 条款 |

---

## 10. 验证记录（2026-09-09，卡 v1.1 定稿前实测）

| 验证项 | 结果 |
|--------|------|
| 锁定三 `git diff main --stat -- src/data/ messages/` | 实测输出空 PASS，与仓库现状一致 |
| ①②④⑤ 命令（Git Bash 实测） | 语法有效；当前 diff 为空 → ①④⑤ 无输出行=过，② 计数 0（动工前预期） |
| ③ 命令（Git Bash 实测） | 语法有效；当前 PDP 路由 `images/factory/` 计数 0（动工后须按蓝本补 ≥1） |
| ⑥ 口径 | `package.json` 实存 `build:cf` script（clean → sitemap → @cloudflare/next-on-pages）；完整构建由闸门执行 |
| 蓝本 sha256 | plp `c34d8e73a3f54a1c…` / pdp `0ab1030ec3f58081…` 与 §1 表一致 |
| 蓝本字号令牌实测 | PLP {14×10,15×10,16×7,13×6,17×3,12×2,19×2,18×2,20×1,27×1}；PDP {14×9,13×7,15×6,16×4,17×4,18×2,22×2,20×1,42×1,12×1} → ①白名单据此写死 |
| 分支 | `redesign/plp-pdp-v9` 已存在（c92e0f60，与 main/origin 三点对齐零差异），执行者直接 checkout |
| cmd/PowerShell 兼容性 | 不兼容（grep 缺失，实测 `'grep' 不是内部或外部命令`），故执行环境写死 Git Bash |
| v1.2 执行者改派 | 唐总 2026-09-09「现在交给人来执行」→ 执行者 = 人工执行者（交接书 `2026-09-09-v91-human-execution-handoff.md` 落盘）；卡内「AutoClaw」执行字样一律按「执行者」读；复核闸由 deepseek hermes 承接 M3 称谓（AGENTS §0.34.2，职责不变）；其余条款零改动 |
| v1.3 执行者再改派 | 唐总 2026-09-09「是交给你来执行，不是 autoclaw」→ v1.2 人工改派作废，执行者 = **本会话 AI 执行层**（直接在本会话写代码落地）；交接书执行者字段同步修正；其余条款零改动 |

**签发完毕。执行者对齐本卡逐条执行；本卡未尽事宜一律停手升级唐总，禁止自行解释。**
