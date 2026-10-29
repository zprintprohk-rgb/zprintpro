# 2026-10-29 C7 · D4 运行时修复报告（lane 报告命名双轨 + 校验器兼容）

> 数据来源: k3-review `2026-10-29-ZP-k3-review.md` §3 D4 行 · `lane-runs.jsonl` (ZP-daily-content 01:56:51 BLOCKED + 01:57:00 OK report=2026-10-29-daily-content.md report_auto=false; ZP-blog-deepfix 01:57:00 OK) · `node scripts/lane-status.mjs --days=3` 实跑 · 线上 curl 探针 (calendars en / greeting-cards en) · products.ts / category-conversion-blocks.ts / sku-seo-data.ts / pricing.ts / CategoryPageV9.tsx / variable-i18n.ts 源码直读

## 1. 优先级判定（本轮为何做 D4）

k3-review 今日优先 ④: `P1 修运行时（§5 重注册 + 今晚两轮四方验收）→ P2 K3 批 1 项解锁队列 → P3 真值缺陷 T1-T3 先入队 READY 再单批修`。

- §5 重注册（weekly/blog/monthly 三连 0x800710E0）= K3 管理员动作，执行层不可代做。
- 今晚 20:13/21:17 四方验收 = 时间窗未到。
- **P1 中可由执行层落地的唯一项 = D4 校验器兼容**（k3-review §3 `modify_payload`：host 归一或校验器兼容；在此之前不得用 reportStrict 单判「零产出」）。本轮完成校验器兼容。
- P3 T1-T3 = 已入队 READY（见 strategy-task-queue.json 3 条新任务），src 单批修因 peer 活跃（§0.35.7 双条件② 未满足）推至窗口期执行（见 §4）。

## 2. D4 根因与修复（双轨命名 + 粗体字段）

### 2.1 根因（两处，均已实证）
1. **命名双轨**：harness 真实 OK 报告写**短名** `{day}-{lane 去 ZP-}.md`（如 `2026-10-29-daily-content.md`）；旧 `validate_lane_report()` 只认 `{day}-ZP-{lane}.md` → 真报告漏认，AUTO-FILL stub 被写成长名 `{day}-ZP-{lane}.md` → lane 被误判 STALE。
2. **字段格式双轨**：harness 真报告用**粗体 Markdown 字段**（`- **VERDICT: OK**` / `**VERDICT: OK** — 说明`），旧正则要求行首裸 `^VERDICT:` → `contractOk` 误判缺机器可读 VERDICT。`lane-status.mjs` L266-272 已兼容双命名（`includes(laneToken) || includes(lane.task)`），但 L278-280 的正则与 lane-git-commit.py 同病。

### 2.2 修复（scripts 两文件）
**`scripts/lane-git-commit.py`** — `validate_lane_report()` 重写：
- 候选 = `[{day}-{lane}.md]` +（lane 以 ZP- 开头时）`[{day}-{lane[3:]}.md]`（双轨都试）；
- 已有候选循环**跳过 AUTO-FILL / AUTO-FILLED 文本**（continue 到兄弟候选），不把失败证据当真报告；
- 字段正则放宽 `^[-*\s]*\*?\*?{field}\*?\*?:\s*\S.*$`（裸/粗体均可）；
- VERDICT OK 正则 `^[-*\s]*\*?\*?VERDICT\*?\*?:\s*\*?\*?OK\*?\*?(?=\s*$|\s*[—–-])`（行尾或 em-dash 说明均可）；
- 无候选 → `missing exact same-day lane report: {candidates}`；全候选 AUTO-FILL → `all same-day lane report candidates are AUTO-FILL failure evidence; no real OK report`。

**`scripts/lane-status.mjs`** — `contractOk` 同步兼容：
- `fieldRe(field)` = `^[-*\s]*\*?\*?{field}\*?\*?:\s*\S.*$`（m 模式）；
- VERDICT OK 用与 lane-git-commit.py 同款 lookahead 正则；四字段 VERDICT/CONSUMED/DELIVERED/NEXT 全过 + VERDICT OK 才算 contractOk。

## 3. 测试矩阵（importlib 实跑，全部通过）

| 报告文件 | 期望 | 结果 |
|---|---|---|
| `2026-10-29-daily-content.md`（短名，`- **VERDICT: OK**`） | 接受为真报告 | ✅ PASS |
| `2026-10-29-blog-deepfix.md`（短名，`**VERDICT: OK** — em-dash 说明`） | 接受 | ✅ PASS |
| `2026-10-29-ZP-gsc-feedback.md`（长名，裸 `VERDICT: OK`） | 接受（无回归） | ✅ PASS |
| `2026-10-29-ZP-k3-review.md`（长名，裸） | 接受（无回归） | ✅ PASS |
| 10-28 daily-content（仅 AUTO-FILL stub） | 拒（失败证据） | ✅ PASS |
| weekly-meta（无报告） | 拒（missing clean） | ✅ PASS |

`node scripts/lane-status.mjs --days=3` 实跑：`OK ZP-daily-content last=2026-10-29 report=yes`（原 STALE → OK）· `OK ZP-gsc-feedback` · `OK ZP-k3-review` · `UNKNOWN ZP-weekly-meta/blog-deepfix/monthly-matrix`（weekly/monthly=0x800710E0 缺报告；blog-deepfix 为 3-day 窗口非调度日伪影，01:57 OK 总线记录仍在）· problems=3（原 4，-1）。

## 4. 附带发现（T1-T3 真值已实证，src 批待窗口）

peer 12:04-12:45 持续推送 §2.2 认证词清毒（T5 族），`CategoryPageV9.tsx` 于 12:38 被 peer 改动 → §0.35.7 双条件②（peer ≥15 min 无写入）不满足，**src 单批暂缓**。真值三闸门 #1（dump 实样）已完成：
- **T1**：products.ts calendars 全 `minQuantity:1`/`HK$3-8/本`；线上 en calendars 页同现「1 MOQ」title + seo-faq「From 1 pc」与 conversion-block FAQ「50 pcs」/socialProof「50 pcs」/comparisonTable「From 50 pcs (digital)」×4 → 全 block 需对齐 1 起印。
- **T2**：sku-seo-data.ts mini-calendars en body FAQ Q3「Orders start at 1,000 units」vs 同文「1-unit minimum (bulk 300+ offset)」；CSV 正文列为空 → body 为 ts 权威域，直接改 ts 合规（§0.23 SOP-5）。
- **T3**：greeting-cards 无 DISPLAY_ANCHOR_OVERRIDES / UNIT_PRICE_ANCHORS / INDEPENDENT_PRICES → `getDisplayAnchor` null → `convertToFromPrice` 回退保留 `/100張`（pricing.ts L736-751）+ CategoryPageV9 L244 原样 `張`；ProductPageV9 的 EN_UNIT_MAP/JA_UNIT_MAP 与 variable-i18n.ts 的 QUANTITIES_ZH2EN/JA 是先例映射。

队列已登记 3 条 READY（TRUTH-T1/T2/T3-20261029），approval_gate = k3-review §2.5 classify + products.ts 真值 + 线上双证，不夹带 title/名片域。

## 5. Push 与线上验收

- **T1-T3 src 批已完成并 commit（70024963）**：peer 13:14 push bcf6bcac 后窗口重开，T1-T3 与 D4 同批 commit；push 等待 peer 的 cf-check-run ≥30 min（后台异步 job，§0.25.8 不阻塞主循环）。
- 攒批：2 scripts + 4 src 行为/数据修复 + 队列 + 报告 = ≥1 src 行为修复（pricing 单位本地化）+ ≥3 非 docs → 达标（§0.25.9）。
- push 后必验：CF check-run success + curl `/en/category/calendars/`（50 pcs 全消失、From 1 pc 生效）+ `/en/category/greeting-cards/`（无 100張/10 張，显示 100 pcs/pcs）+ `/en/product/mini-calendars/`（无 1,000 units）。

## 6. 遗留（不属本轮）

- host 归一短名为 dsh harness 行为，不在本仓库可修范围；校验器兼容已覆盖双轨。
- blog-deepfix UNKNOWN = 窗口伪影（周六调度、周三手动 OK），非缺陷；weekly/monthly 三连 0x800710E0 仍等 K3 管理员重注册（k3-review §5 命令）。
- K3 三件（token revoke ×2 / GMC re-review / Studio approve-delete）与 包装批1 拍板 仍待 K3。
- T5（认证词清毒）由 peer 12:04-13:14 §2.2 系列执行中；T6（15,000+）待 K3 裁决，均不属本轮。
