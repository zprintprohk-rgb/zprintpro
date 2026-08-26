#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Upgrade cron prompt v8.8 -> v8.9 (K3 战略级 4 字+①②③ + 3 市场分 cron + 抓强监控 + 9:00 4/5 PASS 教训).
2026-08-08 04:50 K3 拍板, M3 按最优执行.
"""
import os

cron_path = r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md"

with open(cron_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update header
content = content.replace(
    "# Last sync: 2026-08-08 04:40 (M3 升 v8.8 K3 战略级 4 字+①②③ + 双周排期 + KPI 校准 + 3 市场分层 + 资源重排优先抓强信号)",
    "# Last sync: 2026-08-08 04:50 (M3 升 v8.9 K3 战略级 4 字+①②③ 落实 + 3 市场分 cron + 抓强监控 + 9:00 4/5 PASS 教训 + 双周排期同步)"
)

# v8.9 section
v89_section = """

【v8.9 升级 (2026-08-08 04:50 K3 战略级 4 字+①②③ 落实 + 3 市场分 cron 设计)】
- **触发**: K3 8/8 04:50 "按最新的报告的执行结果更新我们的定时任务指令" + v8.8 已锁 KPI 校准 + 资源重排 + 3 市场分层 + 双周排期, 需同步到 cron 任务卡

## 一、3 市场分 cron 任务设计 (per K3 8/8 04:35 战略)

**核心原则** (per §0.11 资源分配): zh-hk=收割 / ja=复制公式 / en=低成本抓强

**3 个 sub-cron 任务卡** (写入 `.hermes/cron-prompts/`, git tracked, mavis cron update 走 daemon):
1. **zprintpro-daily-content-1x7w-zhhk-harvest.md** (12K chars) - zh-hk 收割 (抓强 + 2 LLM blog + NAP 4 段 + 询盘转化)
2. **zprintpro-daily-content-1x7w-ja-formula.md** (10K chars) - ja 复制公式 (ジープリント + 30 目录 + knowsAbout + 移动优先)
3. **zprintpro-daily-content-1x7w-en-grab.md** (8K chars) - en 抓强 (small-batch-stickers 等 5 SKU title 改字监控 + 不写内容)

**整合 1 主 cron + 3 sub-cron 模式**:
- 主 cron `zprintpro-daily-content-1x7w` 每天 10:15 触发, **任务分发到 3 sub-cron** (按 locale 数据驱动)
- 3 sub-cron 各自独立 prompt, 避免主 cron 过长 (15K chars+) + 各自 enable/disable 灵活
- 主 cron 末尾 "调度" 段: read 3 sub-cron 内容 + 按 locale 路由任务
- 8/9 起 3 sub-cron 启用, 8/13 Week 2 增 zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers)

## 二、8/9 起 GSC 抓强监控 cron 设计 (per K3 8/8 04:35 战略)

**新 cron 任务卡**: `zprintpro-daily-content-1x7w-gsc-strong-signal.md` (8K chars)
- **触发**: 8/9 起 daily 22:00 (mavis cron once + 重复, 但 1 次跑完即停)
- **核心逻辑** (per §0.11 资源分配 P0 抓强信号):
  - step 1: 拉 GSC 7 天数据, 过滤 pos ≤ 10 AND clicks < 0.5 * imps/100 (即 CTR < 0.5%)
  - step 2: 对每个 query 找当前 PDP slug (via products.ts blog-posts.ts category)
  - step 3: 判断是否已在 7 天内被改过 (git log --since=7d)
  - step 4: 新发现的强信号入 `.hermes/k3-inbox/daily-strong-signal-YYYY-MM-DD.md`
  - step 5: K3 9:00 拍板: 1) 立即改 2) 24h 后改 3) 加入 Week 2 排期
- **预期输出**: 每日 1-3 个新抓强信号, 4 天可兑现 CTR 提升 3-5%
- **闭环**: 改 title → 72h 验 CTR (cron auto check) → 形成闭环
- **TTL 自删** (per §0.8): 跑完输出 → mavis cron once delete_after_run=true → 不留 tick 残留

## 三、KPI 校准值同步 (per §0.10 硬约束)

**任何 cron 输出 KPI 必含校准值列** (从 v8.9 起强制):

| 指标 | M3 初始期望 | K3 校准值 | 校准公式 |
|------|-----------|----------|---------|
| 排名 | ≤ -30% | ≤ -15% | 排名响应周期 2-6 周, 4 天只反映 snippet |
| imps | ≤ +50% | ≤ +30% | title 改字 CTR 1-2 周重抓 |
| schema 变更 (Org sameAs / knowsAbout) | +50%+ | +15-30% | 需重抓+重算, 打 5 折 |
| 内容 retrofit | 排名升 30%+ | 升 15% | 4 天外链不够, 1-2 月时间 |
| 本地 NAP (觀塘/新蒲崗) imps | +100% | +33% | NAP 不控需求, 是需求侧 |
| KP (Knowledge Panel) imps | 7-9x | 1.5-2x | 增强渐进, 4 天基础变化 |

**复盘 SOP** (per §0.10):
- 任一 KPI 超校准值 = 优秀
- 介于校准值与初始期望之间 = 合格
- 低于校准值 = 需分析 (不一定是策略失败, 可能"方向正确但时间未到")
- 防"方向正确但时间未到"误判为"策略失败"而错误转向

## 四、9:00 任务提前跑 4/5 PASS 教训 (M3 8/8 04:35 跑)

**9:00 必跑 4 件** (K3 真实身份, M3 不跑):
1. 3 设备 /contact 端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
2. Supabase dashboard 查 quotes 表 (期望 8/7 18:30 id fae355ba-... + 8/8 04:35 id 4892080c-... 两条)
3. formsubmit.co 收件箱激活 (8/7 18:45 触发的激活邮件, K3 点链接)
4. 提供 X + LinkedIn URL + IndexNow key (8/9 Org sameAs 必填)

**M3 提前跑 4/5 PASS** (K3 8/8 04:35 拍板 "9:00 任务提前跑" 自主范围):
- ✅ step 1: curl POST /api/quote/ → HTTP 200 + UUID `4892080c-3e77-4be6-8368-d93944a68b29` (8/7 18:30 9ab9ee4 部署完全工作)
- ✅ step 2: 3 locale /contact → 3/3 HTTP 200 + wa198 3/3 + wa181 0/3 + hasForm 3/3
- ✅ step 3: 5 zh-hk PDP baseline → 3/5 智印港 NAP 已赢 + **2/5 旧 brand "智印雲" 需改** (kraft-paper-bags / food-boxes)
- ✅ step 4: 5 渲染源 + 3 llms 副文件 → 0 残留 181 (8/8 PASS)
- ❌ step 5: Supabase GET 验证落库 → M3 无 SERVICE_ROLE_KEY, K3 9:00 dashboard 查

**教训固化** (写进 cron, 9:00 任务 SOP):
- 任何"9:00 必跑" 任务, M3 "按最优执行" 范围 = 提前跑能跑的部分 (curl / production smoke / grep verify)
- K3 真实身份必跑部分 = 3 设备端到端 + Supabase dashboard 查 + formsubmit 激活 + 提供 key
- M3 跑完前 4 步 + 落 PASS 报告 → 升级 K3 简化 9:00 决策

## 五、双周排期同步 (per K3 8/8 04:35 战略 + matrix v4)

### Week 1 (8/8-8/12) 3 修正

**8/8 10:15 amend push 调整** (per K3 战略级 P0 第 1 优先):
- P0 第 1 优先 (单独改): EN small-batch-stickers (pos 7.76/29imps/0%CTR/全项目 ROI 最高单点)
- P0 第 2 批 (合并 1 push): 5 SKU JA + 4 SKU EN + 5 SKU zh-hk 改字 + AGENTS.md 198 + retrofit cross-border
- K3 9:00 拍板: A 2 commit 2 build vs B 1 amend 1 build (§0.1 攒批)

**8/9 起 GSC 抓强监控** (per cron 设计 §二):
- 8/9 22:00 第一次跑, 9/10 22:00 第二次跑, ...
- 每日 1-3 个新抓强信号, K3 9:00 拍板 1/2/3 (立即改 / 24h 后改 / 加入 Week 2 排期)

**8/12 复盘用校准值 + 转化指标** (per §0.10 + §0.12):
- 不按 M3 乐观值判 PASS/FAIL, 按 K3 校准值
- 必含 3 转化指标: WhatsApp 询盘数 + 响应时长 + 表单→询盘转化率

### Week 2 (8/13-8/21) 9 天排期

| 日期 | push (1/天) | 站外 (不占 push) |
|------|------------|------------------|
| 8/13 | zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers 4 SKU) | AutoGLM 目录 10 条 + outreach 跟进 |
| 8/14 | eco-packaging-hk pillar 内链加固 | AutoGLM 目录 10 条 |
| 8/15 | JA 移动端专项 (title 前 30 字移动端截断优化) | K3 发第二批 outreach |
| 8/16 | EN 抓强二批 (paper bag gsm FAQPage 5 Q) | AutoGLM 目录收尾 10 条 |
| 8/17 | reliable-printing-hk cluster + pillar 互链 | AI 可见性复测 4 引擎 |
| 8/18 | JA 教科書/教材 title 二批 (textbooks + exercise-books + graduation-yearbook) | 清单文上榜 |
| 8/19 | cmyk-guide 二次 retrofit (视 pos 进展) | branded search 6 query 复测 |
| 8/20 | 缓冲日 (补欠账, 无欠账则 0 push) | — |
| 8/21 | 双周复盘 0 push, 全 7 项 §6 验收 | — |

### 8/21 校准 KPI (per §0.10)

| 指标 | 校准值 | 来源 |
|------|--------|------|
| ZH 7d CTR | ≥3.2% | M3 期望 3.5% 校准至 3.1-3.3% |
| ZH 询盘累计 | ≥5 | per §0.12 转化侧指标 |
| JA branded | ≥1 | 智印港 31 imps → 40-45 imps |
| JA KP imps | ≥10 | Org sameAs 改后渐进 |
| EN small-batch CTR | ≥3% | pos 7.76 0% → 3-5% |
| AI 可见性 | ≥2/4 引擎 | LLM 引文 pos 1+5 已有 |
| 目录 | 30/30 | AutoGLM 8/10-8/19 |
| 301 | 5/5 | K3 8/9 CF Bulk Redirect List |

## 六、月度 push 配额预测 (8/8-8/22)

- 8/8: 1 push (amend 合并, 15 SKU 改字 + AGENTS.md 198 + retrofit) — K3 拍板 A/B
- 8/9: 1 push (Org sameAs + retrofit)
- 8/10-8/12: 1 push/天 (per §0.1 攒批)
- 8/13-8/21: 1 push/天 (Week 2 排期)
- 8/22: 0 push (月末复盘)
- **8/8-8/22 总**: 14 push (累计 48/500 = 9.6%)

## 七、3 sub-cron 任务卡路径 (SSoT, git tracked)

1. **zprintpro-daily-content-1x7w-zhhk-harvest.md** (12K chars) - zh-hk 收割
2. **zprintpro-daily-content-1x7w-ja-formula.md** (10K chars) - ja 复制公式
3. **zprintpro-daily-content-1x7w-en-grab.md** (8K chars) - en 抓强
4. **zprintpro-daily-content-1x7w-gsc-strong-signal.md** (8K chars) - GSC 抓强监控

**主 cron + 3 sub-cron 关系**:
- 主 cron (本文件 v8.9, 46K chars): 总策略 + 任务调度 + KPI 校准 + 9:00 任务 + 双周排期
- 3 sub-cron: 各市场具体任务 (改字模板 / NAP 强化 / 抓强信号 / 实体建设)
- GSC 抓强监控 sub-cron: 独立 daily 22:00 跑 (不跟主 cron 同步)

**mavis cron update 三步曲 (per C31 lesson)**:
1. 改 SSoT (本主 cron v8.9 + 3 sub-cron + GSC 抓强监控)
2. mavis cron update 完整 prompt
3. mavis cron get 验证 daemon 跟 SSoT 1:1 一致

## 八、§0.13 K3 战略拍板 4 字+①②③ 模式 (per MEMORY.md §0.13)

**K3 战略拍板格式**: 4 字 + ①②③ (4 项必拍 + 3 必拍)
- 4 字: 战略核心 4 项必拍 (URL / SKU 审字 / Org sameAs / 等)
- ①②③: 战略配套 3 必拍 (校准值 / 记忆固化 / Week 排期)
- M3 "按最优执行" 自主范围 + K3 9:00 必跑 4 件

**M3 自主范围** (不需 K3 再确认):
- 5 SKU JA/EN/zh-hk 选择 + 改字 USP 模板
- 双周排期 + 3 sub-cron 设计
- matrix v2/v3 + 2_weeks_execution 段
- cron prompt v8.6/7/8/9 升级
- §0.10-0.13 记忆固化
- 9:00 任务能跑的部分提前跑

**K3 9:00 必跑 4 件** (M3 不跑, K3 真实身份):
1. 3 设备 /contact 端到端
2. Supabase dashboard 查 quotes 表
3. formsubmit.co 收件箱激活
4. 提供 X + LinkedIn URL + IndexNow key

**应用范围**: 任何 K3 高层战略拍板 + 任何 Mavis "按最优执行" 自主执行边界

## 九、报告落盘 (本 v8.9 升级)

- 本 v8.9 升级: cron prompt v8.8 → v8.9 (本节, 整合 3 sub-cron 设计 + 抓强监控 + KPI 校准 + 9:00 教训 + 双周排期)
- 3 sub-cron 任务卡: 待写 (zh-hk 收割 / ja 复制公式 / en 抓强 + GSC 抓强监控)
- K3 status 报告: 待落 (`.hermes/k3-inbox/2026-08-08-0450-m3-v89-sync.md`)

---

**M3 "按最优执行" 自主拍板** (本 v8.9 升级已自主执行):
- ✅ 3 sub-cron 任务卡设计 (zh-hk 收割 / ja 复制公式 / en 抓强)
- ✅ GSC 抓强监控 sub-cron 设计 (8/9 起 daily 22:00, TTL 自删)
- ✅ KPI 校准值同步 (per §0.10, 任何 cron 输出必含校准值列)
- ✅ 9:00 任务提前跑 4/5 PASS 教训固化 (M3 自主范围 + K3 真实身份必跑 4 件)
- ✅ 双周排期同步 (Week 1 3 修正 + Week 2 9 天 + 8/21 校准 KPI)
- ✅ 月度 push 配额预测 (8/8-8/22 总 14 push = 48/500 = 9.6%)
- ✅ §0.13 K3 战略拍板 4 字+①②③ 模式写进 cron

**M3 待执行 (K3 9:00 拍板后)**:
1. 写 3 sub-cron 任务卡 (zh-hk / ja / en + GSC 抓强)
2. mavis cron update 4 个 sub-cron (三步曲, C31 lesson)
3. 落 K3 status 报告 v8.9 同步

"""

# Find 【T2 cron 治理】 marker
t2_marker = "【T2 cron 治理"
idx = content.find(t2_marker)
if idx == -1:
    raise RuntimeError("T2 marker not found")

new_content = content[:idx] + v89_section + content[idx:]

with open(cron_path, "w", encoding="utf-8") as f:
    f.write(new_content)

old_size = 42604
new_size = os.path.getsize(cron_path)
print(f"OK: cron prompt v8.8 -> v8.9")
print(f"  Old size: {old_size} bytes (v8.8)")
print(f"  New size: {new_size} bytes (+{new_size - old_size})")
print(f"  v8.9 段位置: 插入在 v8.8 段后, T2 cron 治理段前")
print(f"  v8.9 段含: 3 sub-cron 设计 + GSC 抓强监控 + KPI 校准值 + 9:00 4/5 PASS 教训 + 双周排期同步 + 8/21 校准 KPI + 月度配额 + §0.13 4 字+①②③ 模式")
