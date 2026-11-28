# 2026-11-28 · ZP-blog-deepfix · Blog 认证声明真值批（BATCH 6）

VERDICT: PARTIAL
CONSUMED: run-context-ZP-blog-deepfix.json @ 2026-11-28 20:17:00 | lane-status.json @ 2026-11-28T10:07:06Z
DELIVERED: src/data/blog-data/zh-hk.json, src/data/blog-data/en.json, src/data/blog-data/ja.json, .hermes/logs/strategy-task-queue.json, .hermes/logs/2026-11-28-ZP-blog-deepfix.md
NEXT: ① 带 node 的门禁环境清「正文深处」行级残留（zh 6 行 / en 2 行 / ja 7 行，4 大認證/三重認證/雙認證 变体）；② 部署后 curl 三语代表页（sticker-material / foil / campus / box-types / print-spec）核对新口径、旧句归零；③ zh title L153/L232 + description L321 的「FDA 認證」走 title/meta 批（需 title-v5 gate）；④ 8,000+ 訂單/12,800 單 无源统计按 D6 STATISTICS 另批；⑤ 7/14/28d 复测在 data_supply 恢复后开窗。

数据来源: `.hermes/logs/run-context-ZP-blog-deepfix.json`（preflight ok / retry_queue 空 / ready_task FIX-20261030-BLOG-CERT-PHRASES）· `.hermes/logs/lane-status.json`（2026-11-28T10:07:06Z）· `.hermes/logs/strategy-task-queue.json`（任务卡 L606-629）· `.hermes/logs/commercial-truth-decisions-2026-11-13.json`（CT-20261113-D1-D6 D6）· `.hermes/logs/2026-10-30-blog-cert-claims-inventory.md` · `.hermes/logs/2026-11-22-cert-claims-inventory-and-batch1.md` · `src/data/blog-data/{zh-hk,en,ja}.json` 本机实测（2026-11-28 20:2x）· `SESSION_LOCK.md`（Q17 释放记录）· `.hermes/locks/lane.lock`（本车道持锁 pid 31008）

---

## 0. 结论摘要（一句话）

队列唯一 READY、owner=本车道的 `FIX-20261030-BLOG-CERT-PHRASES` 被 11-22 任务卡标注「本任务实质完成」，但本轮独立复核证明该结论**不成立**：三语 blog 仍存在 A 组「聚合认证徽章」（`FDA + EU REACH + FSC 4 大認證`、`All materials … certified`、8/9 处 GEO atoms 的「廠房通過國際質量管理體系認證」样板）。本轮在拍板范围内做 **BATCH 6：44 处 / 29 个编辑操作**，全部改为「按要求选配 / 以訂單確認」口径，零 title/H1/canonical/301/noindex/贺卡资产改动。因**仍有正文深处残留** + **本沙箱 pwsh 被封无法跑 JSON/tsc/门童/线上探针**，判 `PARTIAL`，不写 OK。

---

## 1. STEP 0：结果总线消费（契约第 -1 优先级）

| 输入 | 关键读数 | 本轮用法 |
|---|---|---|
| `run-context-ZP-blog-deepfix.json` | preflight `ok`（repo/branch=main/依赖/凭据/锁全过）；`retry_queue: []`；`suppressed_retry_queue: []`；`previous_run` = 2026-11-07 `OK`；`this_run_key = 0dc9395a11ff8ab7`；sibling = daily-content `PENDING`、k3-review `PARTIAL` | 无 RETRY_OF（无待重做项）；上轮已交付项不重做 |
| `lane-status.json` | `verdict: ATTENTION`；problems 4 条（daily Result=1 / weekly PARTIAL / blog-deepfix 调度器 `2147946720` / k3 PARTIAL）；本车道近 8 天仅 11-21 `MISSING`、11-28 `PENDING`；warnings 4 条 DUPLICATE 均与本轮 key 无关 | 不把调度器故障当内容失败，也不把 wrapper=0 当成功；本轮按真实产物判定 |
| `lane-results-bus-contract.md` | 第 -1 优先级；§6.2 STOP_IF（缺真值/锁冲突/门禁失败）；§7 队列；§8 飞轮账本与 `data_supply` 阻断规则 | 全程按其判定与写回格式执行 |
| `coordination.ready_tasks` | 仅 1 条 READY 且 `owner_lane=ZP-blog-deepfix`：`FIX-20261030-BLOG-CERT-PHRASES`（prio 0.72，write_scope=三语 blog-data JSON 认证声明，approval_gate=K3 2026-11-13 D6） | 本轮唯一执行目标 |

**幂等判定**
- `retry_queue` 为空 → 无 `RETRY_OF(<run_id>)`。
- 上轮 2026-11-07 `OK` 交付 = blog 三项 baseline 复测 triage JSON + 2 张 GSC 图 + 报告。本轮目标（认证真值）与其不重叠，**未重做**；上轮产物不重复生成（`ALREADY_DONE(since 2026-11-07)`）。
- `this_run_key=0dc9395a11ff8ab7` 在 `lane-status.warnings` 中无 DUPLICATE 记录 → 非重复处理。
- 队列卡 `next_batch` 原文「无（Batch 1-5 已清 A 组…）新增 A 组声明时另开 batch 6」→ 本轮发现的正是**未被 Batch 1-5 覆盖的 A 组声明**，开 batch 6 符合卡上指令，不是推翻先前结论的重复劳动。

---

## 2. 并发 / 锁 / 跨车道避让

| 检查 | 结果 | 处置 |
|---|---|---|
| `lane.lock` | 本车道持有（pid 31008，2026-11-28 20:17 取得） | 正常 |
| `SESSION_LOCK.md` 顶部 | Q17 人手会话 **已释放**（2026-11-28 16:4x） | 可写，但记录风险 |
| 今日同文件写入 | Q17 人手批（K3 16:17 批准）**今日改过**同一三份 `blog-data/*.json`（FSC boilerplate/免運門檻/48h 条件化，commit `ec714edf` + `550b312b`） | 遵守 §0.35.7：②静默窗满足（16:4x → 20:2x，>3h 无新写入）；①`git status --porcelain -- src/` **无法执行**（pwsh 被封）→ 以「逐条 literal 替换、不整文件重写」把覆盖风险降到最低，Q17 内容零触碰 |
| sibling lanes | daily-content 今日 `PENDING`（无写入）；k3-review `PARTIAL` 仅写 `docs/assets/2026-11-28/` | 无 blog-data 车道撞车 |
| 写入方式 | 29 次 `edit` literal 替换（其中 2 次 `replace_all` 为**同一样板块**：zh 8 处、en 9 处，上下文完全一致） | 无整文件覆写、无格式化、无编码转换 |

> 注：Q17 与本轮同文件属**人手会话 vs 定时车道**跨层并发，非 sibling lane 撞车；但因条件 ① 无法机器核验，本轮只做字符串级最小 diff，并在 §5 如实登记该风险。

---

## 3. 执行内容（BATCH 6：A 组聚合认证徽章条件化）

拍板口径（`CT-20261113-D1-D6` · `D6.certifications`）：A 组删自有认证/测试声明并保留工艺知识；B 组材料与订单合规确认；C 组仅保留公共法规中性解释；**禁止无上下文全局替换**。
本轮只处理**明确的自有认证声明**（把“我们/所有材质已获认证”改为“按要求选配、以订单确认”），**不删**法规解释、不碰 B/C 组中性引用。

### 3.1 代表性命中 → 改后（before / after）

| # | 文件 · 位置 | before（原文片段） | after（本轮） |
|---|---|---|---|
| 1 | zh-hk · `sticker-material`（L607） | `所有材質均 FDA 21 CFR 175.300 + EU REACH 認證,食品接觸安全。` | `所有材質可按 FDA 21 CFR 175.300 與 EU REACH 要求選配,食品接觸合規以訂單確認。` |
| 2 | zh-hk · 8 篇 GEO atoms 样板 | `【國際質量認證】廠房通過國際質量管理體系認證。`（×8） | `【質量管理】廠房按國際質量管理體系要求執行品質管控。` |
| 3 | zh-hk · `foil-stamping-3-applications-2026`（L639） | `…100 個起印, FDA 21 CFR 175.300 + EU REACH + FSC + 國際品質體系 4 大認證.` | `…100 個起印, 材質可按 FDA 21 CFR 175.300、EU REACH、FSC 等要求選配（以訂單確認）.` |
| 4 | zh-hk · `campus-education-printing-pillar-guide`（L655） | `💡 4 大國際認證:</strong>FDA + EU REACH + FSC + 品質管理體系, ESG 採購必備.` | `💡 合規選項:</strong>FSC 紙材選項、材質按 FDA／EU REACH 要求選配（以訂單確認）, ESG 採購可按需核對文件.` |
| 5 | zh-hk · `print-specifications-reference-guide-2026`（L704 + metaDescription L703） | `…FDA 21 CFR + EU REACH + FSC 三重認證。` / `…FDA 21 CFR + EU REACH + FSC 認證…` | `…材質按 FDA 21 CFR、EU REACH 要求選配, FSC 紙材選項（以訂單確認）。` / `…材質按 FDA 21 CFR、EU REACH、FSC 等要求選配（以訂單確認）…` |
| 6 | en · `food-packaging-printing-guide`（L96） | `FDA / EU / GB triple-certified materials` | `materials specified to FDA / EU / GB food-contact requirements (confirmed at quote)` |
| 7 | en · `packaging-box-printing` heroes（L549） | `<p>All materials FDA 21 CFR 175.300 + EU REACH certified.</p>` + `【Quality Certified】Factory operates under an international quality management system.`（×9） | `<p>Materials can be specified to FDA 21 CFR 175.300 and EU REACH requirements; compliance is confirmed at quote.</p>` + `【Quality Management】Factory follows an international quality management framework.` |
| 8 | ja · `packaging-box-printing` / `sticker-material` heroes（L550/L592） | `全素材 FDA 21 CFR 175.300 + EU REACH 認証済み。` / `…認証済み、食品直接接触安全。` | `全素材は FDA 21 CFR 175.300・EU REACH の要求に沿って選定可能（注文時確認）。` / `…選定可能、食品直接接触の適合は注文時確認。` |
| 9 | ja · `foil` / `box-types` / `spec`（content + description + excerpt，L624/L657/L688/L654/L659） | `…4 大認証` / `4 大国際認証完備` / `三重認証` | `…などの要求に沿った素材選定が可能（注文時確認）` |

### 3.2 计数（本轮交付）

| 文件 | 编辑操作 | 替换字符串数 | 其中样板块 replace_all |
|---|---|---|---|
| `src/data/blog-data/zh-hk.json` | 11 | **18** | 【國際質量認證】×8 |
| `src/data/blog-data/en.json` | 11 | **19** | 【Quality Certified】×9 |
| `src/data/blog-data/ja.json` | 7 | **7** | 无 |
| **合计** | **29** | **44** | 17 |

zh 覆盖：餐牌 heroes ×2 · sticker-material ×1 · foil ×1 · campus ×1 · print-spec content+meta ×2 · baby-product ×2 · kraft-box excerpt ×1 · GEO atoms ×8。
en 覆盖：food-packaging ×1 · packaging heroes ×10（含 9×样板）· poster sizes ×1 · foil ×1 · box-types ×2 · sticker-material ×2 · school ×1 · calendar ×1 · rush ×1。
ja 覆盖：packaging heroes ×2 · foil ×1 · box-types content+description+excerpt ×3 · spec ×1。

**零改动面**：所有 `title`、`metaDescription`（除第 5 行一处纯认证词组外）、slug、canonical、301、noindex、贺卡资产、其他车道文件。

---

## 4. 校验证据（本沙箱可达范围内）

1. **残留断言（旧句式）**：编辑后 grep
   - zh `4 大認證|三重認證|雙認證|通過國際質量管理體系認證` → 命中 6 行，但**可见片段已无旧句**，命中位于 2000 字符截断之后的正文深处（见 §6 残留）。
   - en `4 certifications|four-cert|internationally-certified|ISO certified|triple-certified` → 命中 2 行（L96/L623，均属深层残留，非本轮编辑位点）。
   - ja `4 大認証|三重認証|4 大国際認証|認証済み` → 命中 7 行（深层残留）。
   - 结论：**本轮编辑位点全部改净**；行级仍有余量，不能声称全域清零。
2. **结构完整性**：三文件行数 `zh-hk 882 / en 873 / ja 866`，均以合法 `}` 收尾；替换全部发生在 JSON 字符串值内部，未引入 `"`、`\`、换行 → 引号/转义奇偶性按构造保持。`en.json` 行数 873 与编辑前一致。
3. **未执行的门禁（重要限制）**：环境 v9.4 明确 `pwsh` 被封，**无法运行** `node scripts/check-encoding.js` / `npx tsc --noEmit` / `check-brand-mentions.mjs --strict` / `blog-quality-12-rules-guard` / `gsc-leak-guard` / `JSON.parse` 自检 / 线上 `curl`。因此本轮**不声称** tsc/门童/线上 PASS。最终门禁 = host wrapper 的 pre-commit guard + CF build；若被拦（exit 4），按 §0.35.5 报告已先落盘。

---

## 5. 测量 / 学习 / 上线状态

| 项 | 状态 | 依据 |
|---|---|---|
| production_deploy | **未声称** | 本车道不 push；由 host wrapper 在本会话退出后提交推送。`push ≠ 部署证明` |
| online_verify | **未执行** | 沙箱无 curl（pwsh 被封）；web 工具无法对未部署变更做页面断言。交 `k3-review` 部署后核验 |
| 复测（7/14/28d） | **BLOCKED** | `flywheel-learning-ledger.data_supply.status = BROKEN_DAY6`（GSC 代理/导出断供，11-19 记录）；按契约 §8.8，数据供给非 OK 时复测写 BLOCKED，**不得用旧档重算冒充当日读数** |
| 飞轮账本回写 | **无需** | 账本中本车道无 cert 实验条目（仅 scheduler/next_actions 提及 blog-deepfix）；本轮不新增实验，因无 deploy + 无 online_verify，不满足 learning 四件齐 |
| 学习候选 | **未写入** | 缺 `online_verify` 与 `retest`，按 §7.4 不得进 `learning-candidates.jsonl` |

---

## 6. 残留与欠账（下一轮的唯一依据）

> 计数纪律：以下为**行级**命中（grep 可证），并非出现次数。单行 content 超 2000 字符会被 read 截断，无法在不运行脚本的条件下给出可靠 occurrence 计数——按 §0.23 / §0.23.2 不编数。

| # | 残留 | 证据 | 建议处置 |
|---|---|---|---|
| R1 | 正文深处聚合认证变体：zh 6 行（L115 食品包装 / L220 餐牌 / L639 燙金 / L655 校園 / L704 印刷規格 / L734 練習簿）；en 2 行（L96 / L623）；ja 7 行（L104 / L146 / L225 / L550 / L624 / L640 / L688） | 上述 grep 命中行；命中点在截断区之后 | 下一轮在**可跑脚本**的环境用 `cert-inventory.py` 精确取上下文后逐条改，禁止盲替换 |
| R2 | zh `title` 含 `FDA 認證`：L153（寵物食品貼紙）、L232（跨境標籤） | read/grep 直见 | 走 title 批（需 `title-v5-guard` + 50-57 当量 + 冻结槽检查），本车道不擅改 |
| R3 | zh `description` L321（母嬰標籤）「通過 FDA 認證」 | read 直见 | 与 weekly-meta 协调（meta 字段归属），避免双车道同改 |
| R4 | 无源统计：zh `8,000+ 訂單`（kraft-box 正文/excerpt）、`12,800 單`（燙金）、`30 天品質保證不滿意全額退款`（campus） | read 直见 | D6 `STATISTICS` / `REFUNDS` 另开批，不混入本轮 cert 批 |
| R5 | zh L115 / L473 仍有「國際質量認證」字样（截断区后，疑为变体样板） | grep 命中 | 与 R1 同批处理 |
| R6 | FSC 全域口径（「所有素材 FSC 認證」类） | Q17 已把真值收敛为「指定品項（牛皮紙袋/環保紙袋）」；本轮不重复 Q17 | 若仍见「全素材 FSC」→ 归 Q17 欠账批，不并入 cert 批 |
| R7 | 调度器 `LastTaskResult=2147946720`（0x800710E0） | `lane-status.problems` + 11-27 周报；同因已由 `FIX-WEEKLY-2026-10-28-ZP-blog-deepfix-4231b4bd` 追踪（11-27 提议 `…70604f6a` 被 `suppressed_duplicates` 去重） | **request_human（管理员）**，本车道不代执行、不重复造单。诊断命令：`Get-ScheduledTask -TaskName ZP-blog-deepfix \| Get-ScheduledTaskInfo`；修复走 `scripts/register-cron-tasks.ps1` 重建实体 |

**队列卡已更新**（不伪造 DONE）：`strategy-task-queue.json` 的 `FIX-20261030-BLOG-CERT-PHRASES` 保持 `status: READY`，新增 `progress_correction_20261128`（推翻「实质完成」表述）+ `next_batch_20261128`（R1-R5 摘要），保留历史 `progress` 原文不改写（§0.34.2 史实不改写口径）。

---

## 7. SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 先查前序实现路径：Batch 1-5 记录在 `.hermes/logs/2026-11-22-cert-claims-inventory-and-batch1.md`（脚本在 `.hermes/tmp/`，按条目 context-reviewed），本轮不复用其计数口径去互证，只按同拍板做增量。
- [x] **2. 约束适用范围？** 查 K3 拍板原文：`CT-20261113-D1-D6` D6 明确 A/B/C 三组处置与「禁止无上下文全局替换」；未把「红线」扩大为「不动 blog」。
- [x] **3. 原数据/拍板来源？** ① 拍板来源 = `commercial-truth-decisions-2026-11-13.json` D6（K3 2026-11-13）＋队列卡 approval_gate；② 是否真数据 = 本轮只做「撤声明/条件化」，**不新增任何数字**；③ 留/撤 = A 组撤、B 组条件化、C 组留。
- [x] **4. 字段值策略？** 未触 certNo/validUntil/issuer；反向清掉残留的「證書編號備索」式空壳不在本轮新引入。
- [x] **5. Markdown 渲染？** 本轮只改纯文本/HTML 串，未新增 `[text](url)` Markdown；既有链保持原样，渲染路径未变。

---

## 8. 数据来源（K3 §0.23，强制）

```
数据来源:
- .hermes/logs/run-context-ZP-blog-deepfix.json (2026-11-28 20:17, lane-preflight 生成)
- .hermes/logs/lane-status.json (2026-11-28T10:07:06Z, scripts/lane-status.mjs)
- .hermes/logs/strategy-task-queue.json L606-629 (任务卡, 2026-11-13T03:10:02+08:00 更新)
- K3 拍板记录: .hermes/logs/commercial-truth-decisions-2026-11-13.json CT-20261113-D1-D6 D6 (2026-11-13)
- .hermes/logs/2026-10-30-blog-cert-claims-inventory.md (词组+次数盘点, 2026-10-30)
- .hermes/logs/2026-11-22-cert-claims-inventory-and-batch1.md (Batch 1-5 执行记录, 2026-11-22)
- 本机实测: src/data/blog-data/{zh-hk,en,ja}.json grep/read @ 2026-11-28 20:2x-20:4x
- SESSION_LOCK.md Q17 释放记录 (2026-11-28 16:4x, commit ec714edf / 550b312b)
```

校准声明：本轮**未**产生任何新的 GSC / 排名 / 转化数字；`44 处 / 29 操作` 为本轮 edit 操作计数（含 2 次样板 replace_all 的 8 与 9），非全网盘点口径；行级残留 6/2/7 行为 grep 行命中数，**不与** 10-30 盘点的 528 次或 11-22 的 1575 token 互证（扫描面不同，§0.23.2）。

---

## 9. 撤回声明

无。本轮未撤回任何既有报告结论；仅对队列卡中「本任务实质完成」一句作**勘误**（见 §6），原 `progress` 文本保留不改写，勘误字段为 `progress_correction_20261128`。
