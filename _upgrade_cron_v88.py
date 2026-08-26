#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Upgrade cron prompt v8.7 -> v8.8 (K3 战略级 4 字+①②③ + 双周排期 + KPI 校准 + 3 市场分层).
2026-08-08 04:40 K3 拍板, M3 按最优执行.
"""
import os

cron_path = r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md"

with open(cron_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update header
content = content.replace(
    "# Last sync: 2026-08-08 04:30 (M3 升 v8.7 GSC zh-hk 香港 5 SKU 改字 + 2 LLM blog + NAP 强化 4 段)",
    "# Last sync: 2026-08-08 04:40 (M3 升 v8.8 K3 战略级 4 字+①②③ + 双周排期 + KPI 校准 + 3 市场分层 + 资源重排优先抓强信号)"
)

# v8.8 section
v88_section = """

【v8.8 升级 (2026-08-08 04:40 K3 战略级 4 字+①②③ 拍板, Mavis "按最优执行")】
- **触发**: K3 8/8 04:35 战略级评估: M3 v2/v3 报告 A- 质量, 但期望偏乐观 2 倍, 资源按 imps 错配, 下两周核心 = 复制智印港公式到日本 + 砍低 ROI 动作.
- **核心战略转向 (K3 拍板 4 字 + ①②③)**:
  - **4 字**: ① X URL ② LinkedIn URL ③ 15 SKU 改字 K3 审字 ④ 8/9 Org sameAs 改 K3 审 diff
  - **①②③**: ① 8/12 复盘改用校准值 (§0.10) ② §0.10-0.12 三条入记忆 (✓ 已写 MEMORY.md) ③ Week 2 排期 OK (8/13-8/21)
- **KPI 校准 (per §0.10 硬约束)**: 任何 4-5 天窗口的 KPI 期望, 按 SEO 时间物理校准:
  - 排名 ≤ 当前位置 -15% (不是 -30%); imps ≤ +30% (不是 +50%+)
  - schema 变更打 5 折; 内容 retrofit 需 1-2 周; NAP 不控需求
  - 复盘按校准值判 PASS, 防"方向正确但时间未到"误判
- **资源分配原则 (per §0.11 硬约束)**: 禁止按 imps 大小排优先级, 按"4 天可兑现速度"分 3 档:
  - **P0 抓强信号** (pos ≤ 10 但 0% CTR, 4 天可兑现): small-batch-stickers pos 7.76 / 牛皮紙盒 pos 1 / 燙金貼紙 pos 2.55 / 彩色信封 pos 1
  - **P1 本地实体建设** (智印港公式 + ジープリント + 30 目录, 2-6 周复利): Org sameAs / AutoGLM / MTR NAP
  - **P2 黑洞大词** (a2-posters 856 imps / food-boxes 634 / JA cmyk 197, 需外链+时间): 排最后
- **转化侧指标 (per §0.12 硬约束)**: 8/12 起复盘必含:
  - WhatsApp 询盘数 (期望 0 → ≥5)
  - 响应时长 (≤ 2h)
  - 表单→询盘转化率 (≥ 0.05%)
- **3 市场分层战略 (K3 拍板)**:
  - **zh-hk 香港 = 收割** (抓强 + 2 LLM blog + NAP 4 段 + 询盘转化) — 期望 7d CTR ≥3.2% / 询盘 ≥5 / pos ≤21
  - **ja 日本 = 复制公式** (ジープリント + 30 目录 + knowsAbout + 移动优先) — 期望 KP imps ≥10 / branded ≥1 / 目录 30/30
  - **en 美国 = 低成本抓强** (只改 5 SKU title, 不写内容) — 期望 small-batch CTR ≥3% / KP ≥15
- **Week 1 (8/8-8/12) 3 处修正**:
  - **8/8 amend push 调整**: 先修 EN small-batch-stickers (P0 抓强 pos 7.76/29imps/0%CTR, ROI 最高单点), 再合并 15 SKU (5 JA + 5 EN + 5 zh-hk) 1 push
  - **8/9 起 GSC 抓强监控**: pos ≤ 10 但 0% CTR query 清单, 改 title 后 72h 验 CTR, 形成"改→验"闭环
  - **8/12 复盘用校准值 + 加转化指标** (WhatsApp 询盘数 + 响应时长 + 表单→询盘转化率)
- **Week 2 (8/13-8/21) 排期**:
  - 8/13: zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers) / AutoGLM 目录 10 条 + outreach 跟进
  - 8/14: eco-packaging-hk pillar 内链加固 / 目录 10 条
  - 8/15: JA 移动端专项 (JA 移動 CTR 2.36% 是桌面 3.4 倍, title 前 30 字移动截断优化) / K3 发第二批 outreach
  - 8/16: EN 抓强二批 (paper bag gsm FAQPage) / 目录收尾 10 条
  - 8/17: reliable-printing-hk cluster + pillar 互链 / AI 可见性复测 4 引擎
  - 8/18: JA 教科書/教材 title 二批 (80 imps pos 38.92, Week1 验证后决定) / 清单文上榜确认
  - 8/19: cmyk-guide 二次 retrofit (视 pos 进展) / branded search 6 query 复测
  - 8/20: 缓冲日 (补欠账, 无欠账则 0 push)
  - 8/21: 双周复盘 0 push, 全 7 项 §6 验收
- **8/21 校准 KPI** (per §0.10):
  - ZH 7d CTR ≥3.2% (校准: M3 期望 3.5% 校准至 3.1-3.3%)
  - ZH 询盘累计 ≥5 (per §0.12 转化侧指标)
  - JA branded ≥1 (智印港 31 imps → 40-45 imps)
  - JA KP ≥10 (Org sameAs 改后渐进)
  - EN small-batch CTR ≥3% (pos 7.76 0% → 3-5%)
  - AI 可见性 ≥2/4 (LLM 引文 pos 1+5 已有 + blog 加固)
  - 目录 30/30 (AutoGLM 8/10-8/19 完成)
  - 301 5/5 (K3 8/9 跑 CF Bulk Redirect List)
- **8/8 10:15 amend push 1 调整清单 (优先抓强信号)**:
  - **P0 第 1 优先 (先改, 不跟其他合并)**: EN small-batch-stickers title_en "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof" + 8 行业
  - **P0 第 2 批 (跟其他合并 1 push)**: 5 SKU JA + 4 SKU EN + 5 SKU zh-hk 改字 + AGENTS.md 198 + retrofit cross-border
  - **§0.11 资源重排**: a2-posters 856 imps 黑洞王从 P0 第 1 → P0 第 5 (8/13 zh-hk 抓强二批时再改)
- **9:00 任务提前跑结果 (M3 已跑)**:
  - ✅ §0.7 production smoke step 1: curl POST /api/quote/ HTTP 200 + UUID `4892080c-3e77-4be6-8368-d93944a68b29` + created_at 2026-08-07T20:32:52Z
  - ✅ §0.7 step 2: 3 locale /contact HTTP 200 + wa198 3/3 + wa181 0/3
  - ✅ §0.7 step 3: 5 zh-hk 关键 PDP baseline (发现 kraft-paper-bags + food-boxes 仍用旧 brand "智印雲", 改字时统一改 "智印港")
  - ✅ §0.7 step 4: 5 渲染源 + 3 llms 副文件 0 残留 181
  - ❌ §0.7 step 5: Supabase GET 验证落库 — M3 无 SERVICE_ROLE_KEY, K3 9:00 在 Supabase dashboard 查 (期望 8/7 18:30 id fae355ba-... + 8/8 04:35 id 4892080c-... 两条)
- **K3 9:00 必跑 4 件 (M3 不跑, K3 真实身份)**:
  1. 3 设备 /contact 端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
  2. Supabase dashboard 查 quotes 表 (期望 8/7 18:30 + 8/8 04:35 两条)
  3. formsubmit.co 收件箱激活 (8/7 18:45 触发的激活邮件, K3 点链接)
  4. 提供 X + LinkedIn URL + IndexNow key (8/9 Org sameAs 必填)
- **§0.13 K3 战略拍板 4 字+①②③ 模式** (per MEMORY.md §0.13):
  - Mavis "按最优执行" 自主范围: 5 SKU 选择 / 改字 USP / 5 天节奏 / 矩阵 / cron 升级 / 报告 / 记忆固化 / 9:00 任务能跑部分
  - K3 9:00 必跑: 3 设备真实身份 / Supabase dashboard / formsubmit 激活 / 提供 key
- **月度 push 配额预测**:
  - 8/8: 1 push (amend 合并: P0 small-batch + 14 SKU 改字 + AGENTS.md 198 + retrofit)
  - 8/9: 1 push (Org sameAs + retrofit)
  - 8/10-8/12: 1 push/天 (per §0.1 攒批)
  - 8/13-8/21: 1 push/天 (Week 2 排期)
  - 8/22 月末: 0 push (复盘)
  - 8/8-8/22 总: 14 push (累计 48/500 = 9.6%)

"""

# Find 【T2 cron 治理】 marker
t2_marker = "【T2 cron 治理"
idx = content.find(t2_marker)
if idx == -1:
    raise RuntimeError("T2 marker not found")

new_content = content[:idx] + v88_section + content[idx:]

with open(cron_path, "w", encoding="utf-8") as f:
    f.write(new_content)

old_size = 36526
new_size = os.path.getsize(cron_path)
print(f"OK: cron prompt v8.7 -> v8.8")
print(f"  Old size: {old_size} bytes (v8.7)")
print(f"  New size: {new_size} bytes (+{new_size - old_size})")
print(f"  v8.8 段位置: 插入在 v8.7 段后, T2 cron 治理段前")
print(f"  v8.8 段含: KPI 校准 / 资源重排 / 3 市场分层 / Week 1 3 处修正 / Week 2 9 天排期 / 8/21 校准 KPI / 9:00 4 步 PASS 结果 / §0.13 4 字+①②③ 模式")
