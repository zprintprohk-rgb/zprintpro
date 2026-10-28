# 2026-10-29 早晨 K3 动作清单（首席战略参谋 · 按三战略文件优先级）

> 依据: `2026-10-26-seven-clusters-seo-aeo-geo-global-strategy.md` + `2026-10-28-three-strategy-completion-and-next-phase.md` + `2026-10-28-data-driven-next-phase-strategy.md`
> 状态: 10-28 全天 88 commits · 数据驱动小批 #1-12 全部完成上线 (对端) · 线上验收 10-28 夜间批次通过 (本会话 01:0x)
> 数据来源: git log origin/main (0edf8e1a 21:42) · GSC数据/ 目录 (10-23, 无新档) · lane-runs.jsonl (21:20 STALE/quarantined) · 线上探针 curl -4 (01:0x)

## 〇、一句话结论

**执行层可做的工作已基本耗尽，剩余全部 = K3 拍板域 + K3 导出/操作动作。今天上午 K3 完成 3 个 ONE-action 即可解锁全部下游。**

## 一、ONE-action（各 1 个动作，按优先级）

| # | 动作 | 命令/位置 | 解锁什么 | 判据 |
|---|---|---|---|---|
| 1 | **dsh 凭据恢复**（P0，仍是第一阻塞） | `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\repair-dsh-scheduler-credential.ps1`（提升运行）或 DSH Models 页重存 | 全部 5 条 lane 的真实分析（daily/gsc/weekly/blog/monthly + k3-review） | 下轮 lane 产真实报告（`report_auto_generated=false`） |
| 2 | **GSC 新档导出**（P0，数据 16 天龄） | GSC 后台导出 28d + query×page×country 双档，最新日 ≥ 2026-10-26 | KPI 面板刷新（四指标）+ gsc-feedback 真实分析 + 7 天技术抽查数据层 | 导出文件落 `GSC数据/`，lane 10-29 20:13 消费 |
| 3 | **009 SQL Apply**（P0，reviews A1 解锁） | Supabase Studio 执行 009 migration | SKU 评价功能（已 fail-closed 部署，组件隐藏中） | 组件显现 + `/api/reviews/` 返回真实数据 |

## 二、P1 价格裁决（6 项，SSoT = `_allsku_truth.tsv` 83 SKU）

1. **zh 海报 category 9/45 vs basePrice 16/20**（本会话 10-28 双方法实锤 + 10-15 守卫历史；推荐按 basePrice 对齐，同小批 #2 口径）
2. NT$ 婚慶 2 SKU 3. white-card-boxes 129 vs 0.5-3.0 4. corrugated/tuck-end en/ja 币种 5. 三语交期矛盾 6. 纸袋 from-价语义

## 三、参照队列（对端已登记，待拍板）

- MC 三步（brand 重复修复后 48h 观察）
- 年賀状 5 问（10-31 截止）
- 包装批 1 审批（执行包就绪 379faa3f）
- weekly/blog/monthly 调度器 0x800710E0 重注册
- **名片域 K3 裁决**（批 #13 候选 2: service-areas 词叠可自主修 / business-cards 名片域 = §0.0 解禁块 a/b/c 需 K3）
- 隔离残留: 10-28 21:20 lane 假会话脏改动已被对端 58d044a4 收编为合法清毒（§2.2 无证声明）——无需再处理

## 四、排期（无需 K3，仅提醒）

- 10-29 20:13 gsc-feedback（依赖 ONE-action #2）· 10-29 21:17 daily-content（依赖 #1）
- 10-31 20:52 weekly-meta（依赖 #1 + #4 重注册）
- 11-01 12:13 monthly-matrix · 11-01 23:47 blog-deepfix（同上）
- 11-03 GEO-AI-PROBE-S1（kit 就绪 `docs/2026-10-27-geo-ai-face-probe-kit-nov2026.md`，实测前不声称基线）
- **11-23 28 天同口径复测**（SOP 字节同验，裁决 SCALE/HOLD/FIX/STOP）

---

## 补正（01:2x · 主会话复核）

**ONE-action #1 已完成，跳过**：dsh 凭据昨晚已恢复并四方验证（10-28 19:47 gsc-feedback schtasks 触发 `dsh_exit=0` verdict=OK + 20:18 幂等 OK + 21:17 daily-content dsh_exit=0（内容产出被 STALE 隔离后已由 58d044a4 收编为合法清毒）+ 10-29 01:21 harness 复核 OK）。**无需再跑 repair 脚本**——除非今晚 lane 再现 MISSING_CREDENTIAL。

**剩余 K3 动作 = 2 个**：#2 GSC 28d 新档导出（最紧，数据 17 天龄）· #3 009 SQL apply（昨晚深圳网络不通 api.supabase.com，本机实测项目域名 fetch failed；解法 = 代理规则补 supabase.com/supabase.co 或全局模式或手机热点，SQL v2 文本见上轮会话回复/`supabase/migrations/009`）。

**今天排期提醒**：20:13 lane 消费新档（若 #2 完成）→ KPI 面板刷新；21:17 lane 恢复队列消费；reviews 组件在 #3 完成后自动显现。

（来源：GMC 后台截图 ×4 + `.hermes/logs/2026-10-29-morning-k3-action-list.md`；校准日期 2026-10-29）

**新增拍板项（10-29 凌晨 · GMC 四截图）**：GMC 路线三选一 —— A 维持（79 抑制结构性接受）/ B 暂停 HK 目的地 / C 建最小 checkout（唯一同时解 79 抑制 + Customer Reviews）。**GMC 选择参与模块与徽章 = 不集成**（无在线下单 → 无真实订单数据 = 政策违规 + §0.23 编造双红线；徽章无 seller rating 可显）。评估全文：`docs/2026-10-29-gmc-customer-reviews-vs-plan-a-evaluation.md`。009 SQL 仍为最高优先（reviews 解锁不受 GMC 影响）。
