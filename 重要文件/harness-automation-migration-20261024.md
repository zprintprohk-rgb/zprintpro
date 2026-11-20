# ZprintPro 5 定时车道 → DeepSeek Harness 自动化任务迁移包（2026-10-24）

> 用途：把目前由 autoclaw 外部调度器触发的 5 条 ZprintPro 定时车道，注册为 DeepSeek Harness 原生「自动化任务」。
> 用法：在 DeepSeek Harness 的 **zprintpro-nextjs 工作区** 开一个新会话，按顺序粘贴下面 §1-§5 的指令块（每条建一个任务）。
> 时间窗：全部在 18:00–07:30（Asia/Shanghai）内，错峰保留现行时刻（与看门狗容差咬合，避免误报）。

---

## §1 每日内容 1x7w（带钱词日更）— 每天 21:17

```
请创建一个自动化任务：
- 任务名：ZprintPro · 每日内容 1x7w（带钱词日更）
- 频率：每天 21:17（Asia/Shanghai）
- 工作区：zprintpro-nextjs（F:\zprintpro-nextjs）
- 任务内容：完整阅读并严格执行 F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md 的指令区。开工先读：① AGENTS.md（仓库根铁律全本）② C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-content-standards\SKILL.md ③ docs\2026-09-08-title-rules-and-deep-blog-standard.md + docs\2026-09-09-k3-title-rule-v4-write-full.md。当次按词价值分层 T1/T2 + 带钱词地图 v2 + GSC 最新数据选 1 个带钱词落地 1 篇内容；§0.28 1 cron 1 交付物；门童六命令全 PASS + 三闸门后才算完成；push 守 §0.25.9（攒批 + 30min 硬下限，禁 Start-Sleep 阻塞）；报告落 .hermes\logs\YYYY-MM-DD-daily-content.md，必含数据来源行（§0.23）。
```

## §2 GSC 数据回灌反馈环 — 每天 22:43

```
请创建一个自动化任务：
- 任务名：ZprintPro · GSC 数据回灌反馈环
- 频率：每天 22:43（Asia/Shanghai）
- 工作区：zprintpro-nextjs（F:\zprintpro-nextjs）
- 任务内容：完整阅读并严格执行 F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-gsc-feedback-loop.md 的指令区。读 F:\zprintpro-nextjs\GSC数据 最新 canonical 数据（全站 + zh-hk/en/ja × 24h/7d/28d/3m）：① 回灌 .hermes\industry-keyword-matrix.json 词价值分层 priority_boost ② 更新零点击高展示词 / CTR 异常词 / striking distance 词（pos 5-20）清单 ③ 校准日执行 Pillar 收录验证 + 抓取状态表补齐 + 同口径导出 ④ 校准报告落 docs\。§0.23 数据诚信：报告必含数据来源行；9/3 官方口径 7d 全站 CTR 0.54%；零改文案；§0.28 1 cron 1 交付物；报告落 .hermes\logs\YYYY-MM-DD-gsc-feedback.md。
```

## §3 周五 Track B 槽位 + meta 刷新 — 每周五 23:07

```
请创建一个自动化任务：
- 任务名：ZprintPro · 周五 Track B 槽位 + meta 刷新
- 频率：每周五 23:07（Asia/Shanghai）
- 工作区：zprintpro-nextjs（F:\zprintpro-nextjs）
- 任务内容：完整阅读并严格执行 F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-weekly-meta-refresh.md 的指令区。主线 2 选 1（§0.28）：A=Track B 槽位按最新 GSC imps 排序选 1 篇支撑内容写深度 blog（12 段骨架，5 Pillar slug 触发 12 铁律门童）；B=meta 刷新巡检跑半角当量体检 3 行（写满区 50-54 / ≥55 禁加 / <50 按序补 / 跨语言污染零容忍 / title 冻结 2-4 周）。门童六命令全 PASS → 三闸门 → push 守 §0.25.9；报告落 .hermes\logs\YYYY-MM-DD-weekly-meta.md，必含数据来源行。
```

## §4 周六存量 blog 深度重写 — 每周六 05:37

```
请创建一个自动化任务：
- 任务名：ZprintPro · 周六存量 blog 深度重写
- 频率：每周六 05:37（Asia/Shanghai）
- 工作区：zprintpro-nextjs（F:\zprintpro-nextjs）
- 任务内容：完整阅读并严格执行 F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-blog-deepfix.md 的指令区。从 src\data\blog-posts.ts 存量 blog 中按最新 GSC imps 排序选 1 篇未达标篇目，重写至 12 铁律达标（12 段骨架 / 原创数字≥10 全标源 / FAQ 4-8 组 Q:A: 格式 / 内链≥10 / 比较表≥2 / E-E-A-T / GEO 知识原子段）；en/ja 篇守 §I v2 翻译指南 + 跨语言污染零容忍。验收：blog-quality-12-rules-guard + blog-standard-guard + internal-links-cta-guard 0 命中 → check-encoding + tsc PASS → push 守 §0.25.9；报告落 .hermes\logs\blog-deepfix-YYYY-MM-DD.md，含数据来源行 + 达标率更新。
```

## §5 月度复盘 + 关键词矩阵审计 — 每月 1 号 06:13

```
请创建一个自动化任务：
- 任务名：ZprintPro · 月度复盘 + 关键词矩阵审计
- 频率：每月 1 号 06:13（Asia/Shanghai）
- 工作区：zprintpro-nextjs（F:\zprintpro-nextjs）
- 任务内容：完整阅读并严格执行 F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-monthly-matrix-audit.md 的指令区。月度复盘 6 口径全部落 1 份月报 docs\（文件名含月份）：① GSC 同口径四窗对比 ② 北极星 WA 有效询盘 + /quote 提交读数（无埋点标数据缺口禁猜补）③ 008 询盘→成交台账 ④ AI 探针引用率 X/20 ⑤ A/B 读数 ⑥ 门童健康 + 行业关键词矩阵审计（industry-keyword-matrix.json 分层漂移 + T1-T4 升降级建议）。§0.23 数据诚信红线 + §0.24 完成状态分级（已完成/已排期/撞墙，以证据为准）。
```

---

## §6 切换安全检查清单（防双跑 / 防静默停摆）

1. 每建成 1 条 Harness 自动化任务 → 等它**首次按计划时间成功触发**，并确认 `.hermes\logs\` 出现对应报告文件。
2. 首跑确认后 → 下线 autoclaw 侧同车道旧触发器（避免同一车道双跑双写）。
3. 5 条全部首跑确认前 → autoclaw 侧旧调度**保持原状不动**（双保险期）。
4. 看门狗（cron-watchdog）**保留不动**：它按报告新鲜度校验车道存活，新旧调度都兼容。
5. 全部切换完成后 → 复核看门狗下一轮输出应为「[PASS] 5 条车道均在期望间隔内」。

数据来源：
- Harness 自动化面板空态：老板 2026-10-24 截图实证
- 现行时刻与窗口：主脑 v3.0 §1D / 执行层 v1.2 §9（19:00-07:30 窗口，5 cron 时刻）
- 看门狗容差：.hermes\logs\cron-ZP-cron-watchdog.log（26h/26h/192h/192h/768h）
- 指令 SSoT：.hermes\cron-prompts\ 对应 5 文件
