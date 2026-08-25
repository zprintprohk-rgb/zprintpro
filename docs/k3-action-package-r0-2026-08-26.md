# K3 行动包 1: R0 5 项 8/26 09:00 闭环 (零决策)

> **拍板来源**: 千问 8/25 13:45 评核 + 撞墙升级 P0 拍板 1
> **执行人**: M3 准备, K3 真人操作
> **触发**: 8/26 09:00 Asia/Shanghai (30 min 窗口)
> **数据来源**: K3 8/22 17:58 F0 R0 拍板 + 8/25 11:48 战略升级 + docs/r0-action-cards-status-2026-08-25.md

---

## 0. SOP-10 5 问门禁 (K3 §0.22 强制级, §0.23 §0.24)

- [x] 1. 架构差异? — R0 基础设施, 不动 SEO/GEO 战略层
- [x] 2. 约束适用范围? — F0 红线不删 SKU/文案
- [x] 3. 原数据/拍板来源? — K3 8/22 17:58 拍板 R0 + 8/25 11:48 战略升级
- [x] 4. 字段值策略? — 基础设施, 不改 src/ 字段
- [x] 5. Markdown 渲染? — N/A (docs)
- **§0.24 笼统批准 ≠ 动作完成**: R0 5 项 撞墙 = K3 真人动作, 当前状态 = "已排期", 不写"已完成"

**数据来源**:
- K3 8/22 17:58 R0 拍板 (Supabase / X+LinkedIn / PayPal / D4 / CF Analytics)
- K3 8/25 11:48 战略升级 5 拍板建议
- M3 8/25 13:45 docs/r0-action-cards-status-2026-08-25.md (5 项状态)

---

## 1. 5 步 30 min 零决策流程

| 步骤 | 动作 | 耗时 | 责任人 | 工具/链接 |
|------|------|------|--------|-----------|
| 1 | K3 准备 Supabase 项目 key (anon + service_role), 粘贴给 M3 | 5 min | K3 | supabase.com → Project Settings → API |
| 2 | M3 15 min 内接 008 度量层, 回传 4 事件测试截图 (form_submit / whatsapp_click / tel_click / mailto_click) | 15 min | M3 | .env.local + scripts/008-metrics-layer.ts |
| 3 | K3 列 D4 ①层 0/3 验收 3 项具体内容 (K3 决策) | 5 min | K3 | D4 ①层 7/10 0/3 验收表 |
| 4 | M3 配 CF Web Analytics (CF Pages 内置, 零成本) | 5 min | M3 | CF Dashboard → Pages → Web Analytics |
| 5 | 1.2 X+LinkedIn + 1.3 PayPal 确认延后 (M3 建议 B 9/1 阶段 2 启 + B M1 9/16 前) | 5 min | K3 拍板确认 | docs/r0-action-cards-status-2026-08-25.md §2 |

## 2. 步骤 1 Supabase Key 获取路径 (截图指引)

```
1. 登录 supabase.com
2. 选择 zprintpro 项目 (或新建)
3. 左侧导航: Settings → API
4. 复制:
   - Project URL: https://xxxxx.supabase.co
   - anon public key: eyJhbGc...
   - service_role key: eyJhbGc... (⚠️ 仅服务端使用, 勿暴露前端)
5. 粘贴到 M3 提供的 .env.local 模板 (M3 13:51 在线可立即发)
```

## 3. 步骤 2 008 度量层 M3 实施计划 (15 min, 撞墙 = 0)

**3.1 M3 准备 (5 min, K3 给 key 前可做)**:
- 新建 `src/lib/008-metrics-layer.ts` (env-gated, key 未到时本地 console.log)
- 4 事件 API: form_submit / whatsapp_click / tel_click / mailto_click
- 新建 `src/components/MetricsProvider.tsx` (React context)

**3.2 K3 给 key 后 (10 min)**:
- 填 .env.local (NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY + SUPABASE_SERVICE_ROLE_KEY)
- 008 度量层激活, 4 事件实时上报 Supabase 表 `zprintpro_008_events`
- M3 跑测试脚本生成 4 事件测试数据, 截图回传 K3

**3.3 验收**:
- ✅ 4 事件测试截图 (form_submit / whatsapp_click / tel_click / mailto_click)
- ✅ Supabase Dashboard → Table Editor → zprintpro_008_events 看到 4 条记录
- ✅ M3 提交 commit 含 .env.example 模板 (不提交真实 key)

## 4. 步骤 3 D4 ①层 0/3 验收 (K3 列内容)

**D4 ①层 7/10 0/3 验收表 (K3 11+ 天 PENDING 待列内容)**:

K3 8/26 09:00 窗口需列:
- D4 ①层 0/3 验收 3 项具体验收标准 (K3 拍板 7/10 已落, 0/3 待补)
- D4 ②层 (后续阶段 2 启)
- D4 ③层 (后续阶段 3 启)

**M3 撞墙升级**: D4 0/3 3 项内容 K3 决策, M3 8/26 9:00-9:30 期间执行

## 5. 步骤 4 CF Web Analytics 启用 (5 min, M3 撞墙 = 0)

**5.1 CF Dashboard 启用**:
- https://dash.cloudflare.com → Pages → zprintpro-nextjs
- 左侧 Analytics → Web Analytics → Enable
- 0 成本 + 隐私友好 (无 cookie)
- 自动采集 LCP / CLS / INP + page views

**5.2 M3 落地**:
- CF Web Analytics 启用后, 跟现有 GA4 并行 (双数据源)
- 阶段 2 配 LocalBusiness Schema NAP 一致性 (k3 8/25 P0 拍板 #5)

## 6. 步骤 5 X+LinkedIn + PayPal 延后确认 (5 min, K3 拍板)

K3 8/26 09:00 窗口确认:
- 1.2 X+LinkedIn 延后 9/1 阶段 2 启动 (M3 建议 B)
- 1.3 PayPal 延后 M1 闸门 9/16 前 (M3 建议 B)

K3 拍板后, M3 9/1 阶段 2 启动时同步执行 X+LinkedIn + PayPal 配置。

## 7. 8/26 09:00 K3 行动顺序 (30 min 全流程)

```
09:00  K3 上线, M3 报告 R0 5 项行动包
09:05  K3 准备 Supabase key, 粘贴给 M3
09:20  M3 接线 008 度量层 + 4 事件测试 + 截图回传
09:30  K3 列 D4 ①层 0/3 验收 3 项内容
09:35  M3 配 CF Web Analytics (5 min)
09:40  K3 拍板 X+LinkedIn + PayPal 延后 (B + B)
09:45  R0 5 项 8/26 闭环完成
```

## 8. 撞墙升级 + K3 必拍决策

**M3 撞墙 = 0 (K3 给 key 后立即做)**:
- 步骤 1 (K3 准备 key, 5 min)
- 步骤 3 (K3 列 3 项, 5 min)
- 步骤 5 (K3 拍板延后, 5 min)

**M3 撞墙 = 0 (撞墙 = K3 key)**:
- 步骤 2 (M3 接线 008, 15 min)
- 步骤 4 (M3 配 CF, 5 min)

**M3 撞墙 = K3 key 阻塞**: K3 8/26 09:00 之前需准备好 Supabase key

## 9. 8/26 09:00 之后 24h 验收

- ✅ R0 1.1 Supabase 接线 (008 度量层 4 事件激活, 截图回传)
- ✅ R0 1.4 D4 ①层 0/3 验收 3 项内容 (K3 拍板, M3 8/26-8/27 执行)
- ✅ R0 1.5 CF Web Analytics 启用 (双数据源, 跟 GA4 并行)
- ✅ R0 1.2 X+LinkedIn 延后 9/1 (K3 拍板)
- ✅ R0 1.3 PayPal 延后 M1 9/16 前 (K3 拍板)

**撞墙 = 0 完成状态 = 5 项 ✅**

## 10. 配套

- docs/r0-action-cards-status-2026-08-25.md (R0 5 项 M3 建议)
- .hermes/cron-prompts/sop-10-gate.md (SOP-10 4 cron SSoT)
- AGENTS.md §0.22-§0.24 (K3 8/25 拍板强制级)
- scripts/inject-*.py (MEMORY §大段 JSON 经验)
