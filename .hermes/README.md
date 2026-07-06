# ZprintPro 项目 - Hermes 实例使用说明

> 本目录是 ZprintPro 项目专属 Hermes 实例的配置中心。
> 通用配置在 `C:\Users\Administrator\.hermes\`(全局),跨项目隔离架构说明在 `F:\hermes-config\README.md`。

## 文件结构

```
F:\zprintpro-nextjs\.hermes\
├─ context.md       # LLM 启动时看到的完整 prompt (硬约束 + 任务流程)
├─ project.yaml     # 项目元数据 (工具集 / 部署权限 / 模型分级)
├─ logs\            # 每日产出 (YYYY-MM-DD-{任务名}.md)
├─ backup\          # 关键文件备份
└─ README.md        # 本文件
```

## 时间窗口

| 时段 | 时间 | 任务 |
|---|---|---|
| 启动 | 10:15 | SEO 巡检 + GSC 分析 + 内容生产 + 客户开发 + 竞品监控 |
| 收尾 | 12:15 | 产出落到 `.hermes\logs\` |

## 手动启动 (绕过 cron)

如果需要立即跑(不等到 10:15):

```powershell
cd F:\zprintpro-nextjs
hermes -p "F:\zprintpro-nextjs" -t seo -q "读 .hermes\context.md 完整指令,跑今日任务"
```

或者用 cronjob 工具集:

```
/cron add
  name: zprintpro-now
  schedule: once
  workdir: F:\zprintpro-nextjs
  prompt: <读取 context.md>
```

## 查看今日产出

```powershell
Get-ChildItem F:\zprintpro-nextjs\.hermes\logs\ -Filter "$(Get-Date -Format 'yyyy-MM-dd')*"
```

## 风控铁律

1. ❌ **禁止部署**: wrangler deploy / npm run cf-deploy / git push
2. ❌ **禁止品牌**: 智印港 / 智印印港 (竞品)
3. ⚠️ **真实主体**: 深圳市彩龙印刷包装有限公司(深圳龙岗,**不是 HK 観塘**)
4. ⚠️ **人工审核**: 所有 user-facing 文案(开发信/博客/FAQ)在 user 审核前不进生产环境

## 模型使用

- **唯一**: `mavis / MiniMax-M3` (mavis orchestrator 默认,thinking variant)

---

**Updated**: 2026-06-27