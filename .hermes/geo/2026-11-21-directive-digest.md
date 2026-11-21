# 2026-11-21 指令摘要（A 车解读 · 由编排层落盘）

> 数据来源: 重要文件/2026-11-19-three-market-seo-aeo-geo-flywheel-and-scheduler-upgrade.md + 2026-11-20-manual-scheduler-rebuild-and-two-week-flywheel.md + 2026-11-18-decision-window-execution.md + brief（2026-11-21 全文读取）; 落盘者: 编排层（原解读子代理为只读权限, 全文存 .zwork/runs/0ce64d56/0-分析师.md）

## ① 11-19 文件要点

- **架构转变**（§0.1）: 「七条各自产文的定时任务」→「一个搜索增长团队」：GSC 统一测量、交易页先修商业真值、weekly 只做有真实 SERP 的摘要提案、Blog 每轮最多一篇、k3 独立验收（§5.1 统一闭环）。
- **优先级 7 步**（§12）: ① 管理员恢复调度/余额 → ② k3 清验收积压 + GSC 刷协同板 → ③ 食品包装/small-batch 验收与 CTR → ④ 海报/单张/教材/C109 **只诊断不改 title** → ⑤ 月曆/利是封用现有页 → ⑥ 深位词转中期 → ⑦ 只放大有完整部署验收复测证据的动作。
- **Owner/RACI**（§5.2）: Kimi 战略裁决、DeepSeek 只执行 READY bounded task（七车道）。
- **验收六项**（§9.1）: 四方对账 / 唯一任务 ID / 实际部署 / 零点击破零 / AEO 一致 / GEO 可复核；「两周不承诺任何词必进首页」。
- Harness 修订副本 `.hermes/tmp/harness-schedule-20261119.proposed.json` 已产出；**C 车实测：11-19 14:39 管理员已实际应用 2 条（apply-result.json: harness_applied=true）——推翻 11-19 文档「未应用」声明**（§0.3/§6.3）。

## ② 11-20 文件要点（4+1 手动调度器重建）

- **已做** = 设计与副本全套：§5.1-5.3 任务表与 watchdog 创建值、§6 数据流+16 字段、§7.3 12 个 GEO 固定问题、§8 两周日程（11-20—12-03, 14 行）、§9 验收/停止规则、§10 老板五件事；盘面核实 4 个 harness prompt 已在 `.hermes/cron-prompts/`（两个文件名日期即 20261121）。
- **待做** = 全部生产动作：Harness 4 入口粘贴 prompt + 停用 GSC/monthly 重复入口、管理员重建 watchdog（06:43、S4U、不配 RestartOnFailure）、同步 cron-lanes.json/lane-status、恢复 DeepSeek 额度（**已恢复**: 11-20 起 dsh_exit=0, C 车实测）、拍板 A2/即日传单/贴纸单位·交期·免邮·打样、补 query×page 导出。
- **今天 11-21 点名**：① SMALLBATCH 7d 复测（追加 measurement_history）；② 周六 Blog 恢复单篇补缺（海报既有文复写 或 有依据 NO_OP）；③（11-19 §8）海报/教材/C109 承接诊断；④（11-18 执行报告 §5）query×page 承接复测（三议程首个 7d 可读窗）。

## ③ K3 拍板/红线（原文短句）

- 「以优先级继续按顺序的最优推荐执行下一步」（11-18 §1 standing instruction）
- 「后台数据不得进入客户可见内容」「缺行写 NO_CURRENT_BASELINE，不是零需求」（11-19 §1）
- 「7 天主要验技术与早期方向，14 天看方向，28 天才允许经营判断」
- AEO 真值:「『即日生产』不得写成『美国／日本即日送达』…无来源认证…应删除或阻断」（11-20 §7.2）
- 「建议资源顺序，不是自动放行」（§8）；「不要在聊天中提供密码」（§5.3）；「S4U canary …待管理员运行」

## ④ 今天（11-21）优先级

**执行层可自主**：SMALLBATCH 复测读数 · query×page 复测（缺导出如实记 NO_DATA）· Blog 信息增益判定（写一篇或 NO_OP；**本批纪律禁改 src/**）· 海报/教材/C109 诊断（只诊断）。
**需 K3/管理员**：Harness 4 入口替换 · watchdog 重建 + S4U canary · DeepSeek 额度（已恢复）· 商业真值拍板（A2/即日传单/贴纸单位交期免邮打样）· query×page 每日三档恢复。
