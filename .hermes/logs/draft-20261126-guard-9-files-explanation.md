# 2026-11-26 解释稿（草案）：11-20 ZP-weekly-meta「pre-commit guard 拒 9 production 文件」事件独立核查

> 本稿性质：只读核查解释稿（2026-11-25 起草，供 11-27 weekly-meta 车道与 owner 闭合引用）。零 src/ 写入、零共享账本/队列改写、未改动任何历史报告与总线记录；唯一写入 = 本文件。文件名不以日期开头、不以车道后缀结尾，不会冒充车道产物（per §0.35.3.6）。
> 数据来源与校准状态见文末 §6；未验证项见 §7。

---

## 0. 结论（三行）

1. **事件定性：weekly-meta 车道自身交付正常，FAILED 是 host 侧收尾的「跨会话文件误收」被门童正确拦截。** 11-20 20:58:53 收尾时，`scripts/lane-git-commit.py` 按路径白名单把**并发 K3 晚场真值批会话（TRUTH-A2-SAMEDAY-20261120-01）进行中的 9 个生产文件**当成本车道产物一并 `git add` + `git commit`，被 pre-commit 门童 #24（MOQ 口径闸门）以 6 条 same-day-flyers 新漂移拒绝 → exit 4、pushed=false。guard 拒绝 = 防双写撞车按设计工作，不是车道事故。
2. **冲突消解：模型报告「OK / 零 src」与总线「FAILED / exit 4」在三个层面各自为真，按四方判据以总线为准。** 机械层 commit 确实未成（总线 FAILED 为准）；内容层模型确实零 src 写入、唯一 meta 任务判 HOLD（报告自述为真，wrapper 日志旁证）；业务层 9 文件内容已经 K3 拍板批 `99902084`（21:02）+ `42223814`（21:26）全量落地，**无工作丢失**（11-21 R14 双方法等价对账已关闭，commit `b2eaf643`）。
3. **现状：9 文件全部入库、工作树零残留、7 个关键 commit 均在 origin/main。** 11-27 weekly **无需重新提交任何文件**，只需引用本稿与 R14 把 11-20 按「FAILED(机械) × 等价交付(业务)」口径闭合，然后按原 NEXT 执行（11-27 食品包裝印刷方向读数、12-04 首个干净 7d 窗）。

---

## 1. 事件时间线（总线 vs 模型报告冲突点）

### 1.1 时间线（Asia/Shanghai，2026-11-20）

| 时间 | 事件 | 证据 |
|---|---|---|
| 20:13–20:22 | ZP-gsc-feedback 自然轮 + 收尾：`73418302`（20:21 产物 commit，**含 docs/assets/2026-11-20/ 两份 GSC JSON 与 analyst 文档**）+ `fb62b52b`（报告）→ bus #7 PARTIAL、pushed=true | lane-runs.jsonl bus #7；`git show --stat 73418302` |
| 20:30 | K3 拍板「按建议 A」：TRUTH-A2-SAMEDAY-20261120-01（A2 海報 × 即日傳單 17 项价格真值，拍板单 §四） | `2026-11-20-TRUTH-A2-SAMEDAY.md` 头部；`2026-11-20-ZP-daily-content.md` §2 |
| 20:34–20:49 | TRUTH-A2 调度车道 4 条 bus 记录：BLOCKED（DEEPSEEK_API_KEY absent）×2 → FAILED（dsh exit 1，AUTO-FILL failure.md）→ STALE（报告 verdict 不可 finalize）→ **实际执行由 K3 晚场会话承接** | bus #8–#11；`2026-11-20-TRUTH-A2-SAMEDAY.failure.md`（Generated 20:34:58） |
| 20:36–20:52 | K3 晚场会话编辑价格管线文件（in-progress，同仓共享工作树） | `2026-11-20-TRUTH-A2-SAMEDAY.md` 执行时间行 |
| 20:36 | `5d78f8ae` 实体统一名 commit 落库（= weekly run 时点的 HEAD，非车道产物） | bus record head 字段；`git log` |
| 20:52:00.53 | ZP-weekly-meta wrapper run start，preflight ok；dsh 模型执行：读总线/周复盘/GSC/SERP，唯一 READY meta 任务（食品包裝印刷）判 HOLD **零字段改动**，只写周报 | `cron-ZP-weekly-meta.log` L10322（run start）；模型报告 §2/§9 |
| 20:58:53 | 模型收尾；host 侧 `lane-git-commit.py` finalize：`git status` 扫到 **21 个白名单内脏文件（9 生产 + 12 .hermes 内部）** → 对 9 个生产文件 `git add` + `git commit` → pre-commit 门童链走到**门童 #24 FAIL**（详见 §2）→ commit 被拒 → **return 4**，写总线 FAILED、pushed=false，**报告未 commit**（脚本在 src commit 被拦分支直接 return，跳过报告提交） | `lane-runs.jsonl` L138（run_id ZP-weekly-meta-20261120T205853-29108，idempotency_key e311eb8c55fd59fc，head 5d78f8ae）；`lane-git-commit.py` 源码（blocked_reason 文案与 return 4 分支） |
| 20:58:53.37 | wrapper 打印 `run end exit=0`、`exit /b %RC%` → **Task Scheduler LastTaskResult=0**（RC=dsh 退出码，lane-git-commit 的 4 结构性不传播） | `cron-ZP-weekly-meta.log` L15103；`.hermes/cron-run/ZP-weekly-meta.cmd`（`set RC=%ERRORLEVEL%` 取的是 dsh 段） |
| 21:02 | K3 晚场批 `99902084` 提交 9 档（含 weekly 拒单中的 5 个）并 push（fb62b52b..99902084）；CF build 失败（/quote-desk 预渲染崩溃） | `git show --stat 99902084`；`42223814` commit message |
| 21:17–21:26 | daily lane 自然轮收尾：`f3347842`（21:20:43，顺带提交 entity doc + tmp cmd）+ `c851ec68`（21:20:48，报告 commit --no-verify，**顺带把 weekly 周报、TRUTH-A2 报告等 19 个 .hermes 文件入库**）→ `42223814`（21:26）修 build | `git show --stat f3347842` / `c851ec68`；bus #13 |
| 11-21 10:26–10:35 | AutoClaw 只读调度审计：bus 逐行核对 + 调度器实况 + 缺口清单（含「weekly 9 文件被 TRUTH 路径吸收【推断】」待核对项） | `.hermes/geo/2026-11-21-scheduler-lane-audit.md` §3.1/结论 5 |
| 11-21 11:42 | **R14 等价性对账关闭**（commit `b2eaf643`）：双方法核验「无工作丢失；guard 拒绝 = 防双写撞车正确行为；等价性关闭」 | `2026-11-21-scheduler-lane-audit.md` R14 节；`b2eaf643` |
| 11-25 至今 | 无 owner 专门解释文档 → 本稿补齐 | 本文件 |

### 1.2 总线 vs 模型报告冲突点（三层真值表）

| 层面 | 模型报告（2026-11-20-ZP-weekly-meta.md） | 总线/lane-git-commit（lane-runs.jsonl L138） | 判定 |
|---|---|---|---|
| 机械层（commit/push 是否完成） | VERDICT: OK；「未 commit/push（host wrapper 处理）」 | wrapper_exit=4、verdict FAILED、pushed=false、guard.ok=false | **以总线为准**（§0.35.4：必看 lane-runs.jsonl；commit 确实未成） |
| 内容层（模型本轮写了什么） | DELIVERED 仅周报；「本轮未改 src、未改 sibling、未写账本」 | files 字段列 6 个文件（2 docs JSON + 4 src）——是**收尾扫描捡到的**，不是模型写的 | **模型自述为真**：wrapper 日志全程无模型 src 编辑动作；9 文件归属并发会话（R14 已核） |
| 业务层（被拒内容是否丢失） | NEXT 照常挂 11-27/12-04 | FAILED 后无人跟进（至 11-25 无 owner 解释） | **无丢失**：内容经 99902084+42223814 落地（R14 谱系+树差法 436+/746- 吻合） |

### 1.3 四方对账（11-20 weekly-meta 当日）

| # | 判据 | 读数 | 说明 |
|---|---|---|---|
| ① | 调度器 `Get-ScheduledTaskInfo` | Last=20:52:00，LastTaskResult=**0** | 假绿（wrapper 只传播 dsh 退出码） |
| ② | `lane-runs.jsonl` 该日记录 | **FAILED，wrapper_exit=4**，guard.ok=false | **权威**（本事件判定依据） |
| ③ | wrapper 日志 | run start 20:52:00.53 / `src commit 被拦` / `run end exit=0` | run end 的 exit=%RC% 是 dsh 段退出码，**结构性丢失 lane-git-commit 的 4**（读码判断，`.cmd` 源文） |
| ④ | 当日报告 | `2026-11-20-ZP-weekly-meta.md` 存在、VERDICT OK、21:20 由 daily 车道收尾顺带入库 | 报告真实存在且已上线面 |

---

## 2. 被拒 9 文件逐个（清单可考，非「不可考」）

### 2.1 拒绝门童与命中规则

- **拒绝门童 = 门童 #24 MOQ 口径一致性闸门**（`scripts/canonical/pre-commit` 步骤 3️⃣.6，执行体 `scripts/moq10-books-context-scan.ts --gate --staged`）。
- **触发条件**：staged 含真值源 `src/data/products.ts` → 按设计升级为**全 5 档级联检查**（products.ts / sku-seo-data.ts / products-content.ts / seo.ts / category-seo-content.ts）。wrapper 日志实测：`[SCOPE] 真值源已 staged（src/data/products.ts）→ 全 5 檔級聯檢查`，真值 SKU 82、命中 662、漂移 103（其中已登錄 91 + 已核准 6 + **🆕 新漂移 6**）。
- **FAIL 明细（6 条新漂移，全部 `same-day-flyers`）**：
  - `products.ts:2406` 找到 100 / 真值 10（zh_張起）×2、（ja_枚から）×1、（en_pcs）找到 99 / 真值 10、（en_pcs）找到 100 / 真值 10
  - `products.ts:2411` 找到 100 / 真值 10（zh_張起）
  - 即：真值已改为 10，而产品文案仍是「100 張起印 / 99 pcs / 100 pcs」的**中间态不一致快照** → `[GATE] FAIL — MOQ 口徑掃描閘門` → `❌ 门童 #24 拦截` → pre-commit exit 1。
- **同批其余门童读数**：encoding PASS（6 个被检文件 UTF-8 LF）；简体扫描过；反审门童主扫 shadow 模式 🔴0/🟠54/🟡135（仅预警不拦，存量基线内）；门童 #3 品牌全量基线 PASS（431→259 递减）。#24 之后的门童（#25/#27/#28/#29/DoD）因 hook 中止未执行。
- **9 文件中仅 `src/data/products.ts` 被 #24 直接点名**；其余 8 个是**commit 级联拒绝**（任一门童 FAIL → 整个 commit 被拒），未单独命中规则。
- guard 输出在日志中的位置（`cron-ZP-weekly-meta.log`，行号按 UTF-8 容错解码后 `\n` 切行，供 grep 定位；**该段 stdout/stderr 缓冲交错，行号顺序≠时间序【推断】**）：L13798（`[lane-git] src commit 被拦`）、L14633–14635（#24 scope+计数）、L15019（`[GATE] FAIL`）、L15020–15027（6 条明细）、L15028（拦截行）。21 个白名单文件完整清单在 L15078–15099。

### 2.2 9 文件清单、命中情况与落账去向

| # | 文件 | 20:58 状态来源 | 命中情况 | 内容落账 commit | 当前状态 |
|---|---|---|---|---|---|
| 1 | `src/data/products.ts` | K3 晚场真值批（in-progress） | **#24 直接命中**（6 条 same-day-flyers 漂移所在） | `99902084`（21:02；后续 `e392b120` 11-21 续改） | clean，在 origin/main |
| 2 | `src/data/sku-seo-data.ts` | 同上 | 级联拒（未单独点名） | `99902084` | clean，在 origin/main |
| 3 | `src/lib/price-data.generated.ts` | 同上（生成器重写） | 级联拒 | `99902084` | clean，在 origin/main |
| 4 | `src/lib/pricing.ts` | 同上（same-day 条目改价） | 级联拒 | `99902084`（+`e392b120`） | clean，在 origin/main |
| 5 | `scripts/gen-price-data.mjs` | 同上（currencyOverrides/headline 白名单） | 级联拒 | `99902084` | clean，在 origin/main |
| 6 | `docs/assets/2026-11-20/gsc-money-queries-and-pages.json` | GSC 分析资产（gsc/analyst 会话产物；20:21 已由 `73418302` 入库一次，20:58 仍呈脏态） | 级联拒 | `73418302`（20:21，gsc 车道顺带） | clean；`git diff 73418302 HEAD -- docs/assets/2026-11-20/` 零差异 |
| 7 | `docs/assets/2026-11-20/gsc-small-order-term-comparison.json` | 同上 | 级联拒 | `73418302` | clean，同上 |
| 8 | `docs/2026-11-20-entity-name-unification-zprintpro-zhiyingang.md` | 实体统一名配套文档（`5d78f8ae` 同主题会话遗留） | 级联拒 | `f3347842`（21:20:43，daily 车道收尾顺带） | clean，在 origin/main |
| 9 | `scripts/tmp-run-truth-a2-sameday-20261120.cmd` | TRUTH-A2 会话临时执行脚本 | 级联拒 | `f3347842` | clean；**临时件仍在库**（仅记录，清理归 ops） |

> 说明：`lane-git-commit.py` 的 blocked_reason「rejected 9 production files」计数口径 = 白名单内非 `.hermes/` 文件（与上表 9 一致）；总线 `files` 字段只显示非 `.md`、非 `scripts/`、非 `.hermes` 的 6 个（2 JSON + 4 src），两处口径不同但同源，非矛盾。

---

## 3. 当时变更性质判定（这批文件是谁改的、改动是否合理）

1. **归属**：9 文件**不是** weekly-meta 模型的产物。模型本轮唯一 READY 任务（食品包裝印刷 FIX）判 HOLD 零字段改动，DELIVERED 仅周报；wrapper 日志全程无模型 src 编辑动作。归属 = 并发 K3 晚场真值批（TRUTH-A2-SAMEDAY-20261120-01）的进行中工作树（表 2.2 #1–#5）+ 早前 gsc/analyst/实体名会话的资产（#6–#8）与临时件（#9）。R14 用双方法独立得出同一结论。
2. **改动合理性**：被拒内容本身是 K3 2026-11-20 20:30 拍板选项 A 的 17 项商业真值修复（A2 海報 × 即日傳單：MOQ 10、HK$184/批、三币价格、即日口径），17/17 机器断言通过；`99902084` 提交时门禁 PASS（encoding / MOQ 闸门 / brand / tsc 54=54 基线）；push 后 CF build 失败由 `42223814` 当晚修复；部署后 daily 车道线上验收发现 same-day-flyers 渲染残留（HK$0.55/1.30/4 小时/A6·DL），挂 `TRUTH-A2-SAMEDAY-RESIDUAL`（owner daily，后续 11-21 批继续收敛）。**改动方向合法且有拍板，问题只在「谁收尾、何时收尾」。**
3. **为什么会撞**：`lane-git-commit.py` 白名单按**路径**不按**归属**（ALLOWED_PATHS 含 `src/data/`、`src/lib/`、`docs/`、`scripts/`），单一共享工作树 + 多会话并发 → 车道收尾把他人进行中文件当本车道产物。pre-commit 门童链是唯一拦截层——本次它拦下的正是「真值已改 10、文案仍写 100/99」的不一致中间态，**若放行将上线 MOQ 自相矛盾页面**；另 20:58 时点 build 实际是坏的（21:26 才修），属另一层防线缺口但非本次拒绝原因。
4. **判定**：guard 拒绝 = 正确行为（互斥防撞）；总线 FAILED = 机械事实，应保留不改写；业务语义 = 等价交付（R14 分层结论，本稿复核一致）。

---

## 4. 现状核查（9 文件当前 git 状态，2026-11-25 实测）

- `git status --porcelain`：**src/ 零漂移**；9 文件全部 clean（当前脏文件仅 .hermes 运行态 + docs/重要文件 未跟踪件，与 9 文件无关）。
- 逐文件落账 commit 见表 2.2；`99902084` / `42223814` / `f3347842` / `c851ec68` / `73418302` / `5d78f8ae` / `b2eaf643` 七个 commit `git merge-base --is-ancestor origin/main` **全部 PASS** → 全部已在线上面。
- weekly 车道自己的周报 `2026-11-20-ZP-weekly-meta.md` 已随 `c851ec68` 入库并在 origin/main，其 NEXT（11-27 方向读数 / 12-04 干净 7d）可直接执行。
- 双方法核对：① R14 谱系+树差法（lane head `5d78f8ae` 是 origin/main 祖先；11 个价格管道文件 436+/746- 与 `99902084`+`42223814` 吻合，无孤儿改动）；② 本稿 git status / merge-base / 逐文件 log 复核。**两次一致。**
- 残余观察（仅记录）：`scripts/tmp-run-truth-a2-sameday-20261120.cmd` 临时件仍在库；same-day-flyers 线上残留的最终验收归 daily 车道 RESIDUAL 任务，不属本事件闭合范围。

---

## 5. 给 11-27 weekly 的建议处置

1. **不重新提交任何文件**：9 文件零残留、内容已在库（§4），不存在「重新提交路径」需求；不建议任何 `--no-verify` 豁免。
2. **口径闭合**：11-27 报告在 PARTIAL 跟进/周报四栏引用本稿 + `.hermes/geo/2026-11-21-scheduler-lane-audit.md` R14，把 11-20 记为「FAILED(机械) × 等价交付(业务)」闭合；**不改写 lane-runs.jsonl、不改写 11-20 历史报告**（红线）。
3. **照常执行原 NEXT**：11-27 读最新导出（数据日约 11-23，变更后 5/7 天）做食品包裝印刷方向读数，不判胜负不改字段；12-04 首个干净 7d（数据日 ≥11-25）再决定是否向 K3 提交 title 单变量候选（P-c，须 K3 解冻 + 仍零点击）。
4. **机制改进（登记，不在本稿执行）**：① lane 收尾扫描按路径白名单会误收并发会话文件——建议后续推动「收尾只认本车道报告 + 显式文件清单」或人手/临时会话按 §0.35.7 双条件先协调；② wrapper `exit /b %RC%` 结构性丢失 lane-git-commit 退出码（本事件 Task Scheduler Result=0 假绿的直接根因）——建议列入 wrapper 修复待办（owner：管理员/K3，改 `.hermes/cron-run/ZP-weekly-meta.cmd` 一族）。
5. **不需要 K3 新拍板**：事件本身可凭 R14 + 本稿闭合；唯一挂账决策仍是 12-04 的 title 解冻（属正常流程，非本事件遗留）。

---

## 6. 数据来源 / 校准状态

```
数据来源:
- 结果总线: .hermes/logs/lane-runs.jsonl（11-20 window #7–#13，关键 L138 = ZP-weekly-meta-20261120T205853-29108：wrapper_exit=4 / FAILED / 9 production files / head 5d78f8ae）
- 汇总: .hermes/logs/lane-status.json（generated_at 2026-11-25T10:15:36Z，weekly-meta lane 段 + lastWrapperRun guardBlocked=true）
- wrapper 日志: .hermes/logs/cron-ZP-weekly-meta.log（L10322 run start 20:52:00.53；L13798 src commit 被拦；L14633-14635 门童#24 scope+计数；L15019-15028 GATE FAIL + 6 条漂移明细 + 拦截行；L15078-15099 白名单 21 文件清单；L15103 run end exit=0）
- 模型报告: .hermes/logs/2026-11-20-ZP-weekly-meta.md（VERDICT OK / DELIVERED 仅报告 / 零 src 自述 / §9 跨车道避让记录）
- 并发会话: .hermes/logs/2026-11-20-TRUTH-A2-SAMEDAY.md（VERDICT FAILED=既有 guard debt / 17 项 COMPLETE / 20:36-20:52 执行）+ 2026-11-20-TRUTH-A2-SAMEDAY.failure.md（20:34:58 AUTO-FILL）
- daily 车道验收: .hermes/logs/2026-11-20-ZP-daily-content.md（A2_LIVE_PARTIAL；same-day-flyers 残留清单；RESIDUAL 挂账）
- git 实测（2026-11-25）: git log / show --stat / merge-base --is-ancestor（99902084、42223814、f3347842、c851ec68、73418302、5d78f8ae、b2eaf643 全在 origin/main）/ status --porcelain（src 零漂移）/ diff 73418302..HEAD -- docs/assets/2026-11-20/（零差异）
- 机制读码: scripts/lane-git-commit.py（exit 4 语义、blocked_reason 文案、白名单口径、被拦后跳过报告提交）；scripts/canonical/pre-commit（门童链与 #24 步骤）；.hermes/cron-run/ZP-weekly-meta.cmd（RC=dsh 退出码结构）
- 既有对账: .hermes/geo/2026-11-21-scheduler-lane-audit.md（§3.1 bus 逐行 + R14 等价性关闭节）及 commit b2eaf643
- 拍板（转引，本稿未读原文）: 重要文件/2026-11-20-a2-posters-and-same-day-flyers-truth-decision-sheet.md（K3 11-20 20:30 选项 A）——依据 = TRUTH-A2 报告头部 + 99902084 commit message 双记录一致
校准状态: 已校准至 2026-11-25 18:2x（workspace 只读实测时点）；git 状态以当日 origin/main 为准
撤回声明: 无
```

## 7. 审阅范围与未验证项

- **已核**：总线记录、wrapper 日志 guard 输出与 21 文件清单、模型报告与并发会话报告、门童 #24 拒绝明细、9 文件逐个落账与当前状态、lane-git-commit.py/pre-commit/.cmd 机制读码、R14 对账复核。
- **未验证（如实登记）**：① 20:58 时点 `price-tables/*.json`、`product-faqs.ts`、`products-content.ts` 未出现在脏清单的原因（无法回放进程时序；不影响结论——它们随后随 `99902084` 一并入库）；② docs/assets 两份 JSON 在 20:21 入库后至 20:58 之间被哪个会话再触碰（无进程级日志；HEAD 内容与 `73418302` 版一致已验）；③ K3 拍板单原文未直接读取（转引两份独立记录互相印证）；④ 「模型零 src」为报告自述 + wrapper 日志旁证，非进程级取证。
- **推断（已标注）**：日志行号顺序≠时间序（缓冲交错）；wrapper RC 传播缺陷为读码判断；11-20 21:02→21:20→21:26 三次 push 间隔 <30min 属观察事实（R14 审计已登记，处置归 owner/K3）。