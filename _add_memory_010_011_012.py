#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Append §0.10 KPI 校准 / §0.11 资源分配 / §0.12 转化侧指标 to MEMORY.md
K3 8/8 04:35 P0 拍板 4 字 (回「1-5 + ①②③ OK」).
"""
import os
from datetime import datetime

memory_path = r"C:\Users\Administrator\.minimax\agents\mavis\memory\MEMORY.md"

# 3 段 P0 记忆内容
new_sections = """

### §0.10 KPI 校准硬约束 (2026-08-08 04:35 K3 战略级拍板, 4 字 + ①②③ OK)

**核心**: 任何 4-5 天窗口的 KPI 期望, 必须按 SEO 时间物理校准, 不按 M3 乐观值判 PASS/FAIL.

**SOP (K3 校准表)**:
- **排名响应周期**: 2-6 周, 4 天只反映 snippet 变化
- **title 改字 CTR 提升**: 需 1-2 周重抓
- **schema 变更 (Org sameAs / KnowsAbout)**: 需重抓+重算, 期望打 5 折
- **内容 retrofit (cmyk-guide 等)**: 4 天不够, 需外链配合
- **本地 NAP (觀塘/新蒲崗) imps**: 是需求侧, 不受 NAP 控制
- **KP (Knowledge Panel) imps**: 增强是渐进的, 4 天只反映基础变化

**校准公式**:
- 排名期望 ≤ 当前位置 -15% (不是 -30%)
- imps 期望 ≤ +30% (不是 +50%+)
- schema 变更类期望打 5 折
- 复盘按校准值判 PASS, 防"方向正确但时间未到"误判为"策略失败"

**反例 (zprintpro 8/8 04:00 M3 v2/v3 报告初始期望)**:
- ❌ ZH pos 23.69→18 (4 天) — 实际期望 21 (-15%)
- ❌ ZH CTR 7d 2.7→3.5% — 实际期望 3.1-3.3% (snippet 改后 1-2 周)
- ❌ 智印港 31→60+ imps — 实际期望 40-45 imps (schema 重抓)
- ❌ JA cmyk pos 86→50 — 实际期望 70-75 (4 天外链不够)
- ❌ 觀塘/新蒲崗 60→120+ imps — 实际期望 80 imps (NAP 不控需求)
- ❌ EN KP 9→30+ / JA KP 4→30+ — 实际期望 15-20 / 10-15 (KP 渐进)

**应用范围**:
- 任何 4-5 天 KPI 复盘 (8/12, 8/21, 8/30, 月末)
- 任何 GSC 数据驱动的 KPI 期望
- 任何 schema 变更后的 imps/CTR 期望
- 任何 retrofit 内容的效果期望
- 任何新市场/新 locale 启动的初始 KPI 基准

**实施硬约束**:
- 任何 KPI 报告 (matrix / cron prompt / K3 inbox) 必含 "校准值" 列
- 校准值 = M3 初始期望 × 0.5-0.7 (按 SEO 物理)
- 复盘按校准值判 PASS, 不按初始期望
- 任一 KPI 超校准值 = 优秀, 介于校准值与初始期望之间 = 合格, 低于校准值 = 需分析

**教训固化源头**:
- zprintpro 8/8 04:00 v2/v3 报告初始期望过于乐观
- K3 8/8 04:35 战略级指导, 防错误转向
- 跨项目: 任何 SEO KPI 期望必须按 SEO 物理时间校准, 不拍脑袋

### §0.11 资源分配原则 (2026-08-08 04:35 K3 战略级拍板, 4 字 + ①②③ OK)

**核心**: 禁止按 imps 大小排优先级. 按"可兑现速度"分 3 档.

**资源分配 3 档优先级 (从高到低)**:
1. **抓强信号 (P0, 4 天可兑现)**: pos ≤ 10 但 0% CTR 的 query
   - 改 PDP title 加 USP (100 MOQ / Same Day / Free Shipping / NAP 香港) 即可胜
   - 4 天内必能见效
   - 例子: small-batch-stickers pos 7.76 29 imps / 牛皮紙盒 pos 1 7 imps / 燙金貼紙 pos 2.55 11 imps
2. **本地实体建设 (P1, 2-6 周复利)**: 智印港公式 + ジープリント + 30 目录
   - NAP 强化 + 品牌记忆度 + 口语搜索词 + 实体一致性
   - 中期复利, 不是 4 天内能见效
   - 例子: Org sameAs 改 / AutoGLM 30 目录填表 / MTR NAP 段落
3. **黑洞大词 (P2, 需外链+时间, 排最后)**: 排名 4-10 页外的高 imps 词
   - 改 title 几乎不可能 4 天进前 20
   - 需外链配合 + 1-2 月时间
   - 例子: a2-posters 856 imps pos 37.95 / food-boxes 634 imps pos 39.98 / JA cmyk 197 imps pos 80-99

**反例 (zprintpro 8/8 04:00 v2/v3 报告初始分配)**:
- ❌ 按 imps 大小排 (a2-posters 856 imps 排第 1) — 4 天改 title 不可能
- ✅ 按可兑现速度排 (small-batch-stickers pos 7.76 排第 1) — 4 天可 CTR 提升

**应用范围**:
- 任何 SEO 资源分配 (5 SKU 选择 / 5 blog retrofit / 30 目录)
- 任何 GSC 数据驱动的优先级排序
- 任何 cron auto-retrofit 排期
- 任何外链注册优先级

**实施硬约束**:
- 任何"5 SKU 改字"清单必含 ≥ 3 个抓强信号 (pos ≤ 10 但 0% CTR)
- 任何"5 blog retrofit"清单必含 ≥ 1 个本地实体建设 (Pillar Page 锚定 LLM 引文)
- 黑洞大词改字必加 5 FAQ + 内链 + 外链, 单独 commit, 不跟抓强信号合并
- 优先级评判: 1 个抓强信号 > 10 个黑洞大词改字 (投入产出比)

**§0.10 §0.11 §0.12 关系**:
- §0.10 校准期望
- §0.11 修正资源分配
- §0.12 加转化侧指标
- 三者一起 = 防"做了很多但没效果"误判

**教训固化源头**:
- zprintpro 8/8 04:00 v2/v3 报告资源按 imps 排 (a2-posters 856 排第 1)
- K3 8/8 04:35 战略级指导, 改按可兑现速度排
- 跨项目: 任何 SEO 资源分配按"4 天能兑现"标准排, 不按 imps 大小

### §0.12 转化侧指标 (2026-08-08 04:35 K3 战略级拍板, 4 字 + ①②③ OK)

**核心**: imps/CTR 只是过程指标, 真正的钱在转化侧. 8/12 起复盘必含转化指标.

**必含 3 转化指标 (8/12 起复盘模板)**:
1. **WhatsApp 询盘数** (per §6.1 4 天冲刺)
   - 期望 0 → ≥5 (per K3 8/8 04:35 双周计划, zh-hk 期望最多)
   - K3 9:00 跑 3 设备端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
2. **响应时长** (询盘 → 第一回复)
   - 期望 ≤ 2 小时 (K3 真实身份)
   - > 4 小时 = 转化漏斗警告
3. **表单→询盘转化率** (form submit / 总 imps)
   - 期望 ≥ 0.05% (500 imps → 1 询盘)
   - < 0.02% = 转化侧有大问题

**反例 (zprintpro 8/8 04:00 v2/v3 报告只看过程指标)**:
- ❌ 只看 JA CTR 1.04→1.5%+ / EN CTR 0.53→0.8%+ / ZH CTR 1.55→1.85%+
- ✅ 加上 ZH 询盘 0→≥3 + 响应时长 ≤ 2h + 表单转化率 ≥ 0.05%

**应用范围**:
- 任何 4-5 天 KPI 复盘
- 任何 GSC + form 端到端验证 (§0.7 production smoke 3 步)
- 任何询盘/订单/支付 funnel 监控
- 任何 cron auto-commit 改 src/app/api/* endpoint

**实施硬约束**:
- 任何 review 模板 (review-8-12-template.md / review-8-21-template.md) 必含 §0.12 3 指标
- 任何 weekly / monthly 复盘必含 转化指标
- imps/CTR 是必要不充分指标, 不作 KPI 唯一依据
- 转化指标 = 询盘/订单/支付数, 是唯一"接近钱"的指标

**§0.12 与 §0.7 关系**:
- §0.7 关键漏斗 endpoint production smoke 3 步 (curl 200 + UUID + Supabase GET 落库)
- §0.12 转化侧指标 (WhatsApp 询盘数 + 响应时长 + 表单转化率)
- §0.7 = 部署后必跑, §0.12 = 复盘必含, 两者互补

**教训固化源头**:
- zprintpro 8/8 04:00 v2/v3 报告只看 imps/CTR 过程指标
- 8/7 18:30 9ab9ee4 教训: 询盘 0 不只是流量问题, 是 /api/quote 写错表 500 黑洞
- K3 8/8 04:35 战略级指导, 8/12 起必含转化侧指标
- 跨项目: 任何 SEO/SaaS 项目复盘必含转化指标, 不只看流量

### §0.13 K3 战略拍板 4 字+①②③ OK 模式 (2026-08-08 04:35 K3 拍板, Mavis "按最优执行" 范围)

**核心**: K3 高层战略拍板采用"4 字 + ①②③"格式, Mavis "按最优执行" 自主执行.

**4 字 (战略核心 4 项必拍)**:
1. X URL (e.g. x.com/zprintpro)
2. LinkedIn URL (e.g. linkedin.com/company/zprintpro)
3. 15 SKU 改字 K3 审字 (5 JA + 5 EN + 5 zh-hk)
4. 8/9 Org sameAs 改 K3 审 diff

**①②③ (战略配套 3 必拍)**:
1. 8/12 复盘改用校准值 (§0.10)
2. §0.10-0.12 三条入记忆 (✓ 已写)
3. Week 2 排期 OK (8/13-8/21)

**Mavis "按最优执行" 自主范围 (不需 K3 再确认)**:
- 5 SKU JA/EN/zh-hk 选择 + 改字 USP 模板
- 5 天节奏 (8/8 - 8/12) + 双周排期 (8/13 - 8/21)
- matrix v2/v3 + 2_weeks_execution 段
- cron prompt v8.6/7/8 升级
- 5 个 SSoT 报告落盘 (.hermes/k3-inbox/)
- §0.10-0.12 记忆固化 (✓ 已写)
- 9:00 任务能跑的部分提前跑 (curl Supabase, production smoke, grep verify)

**待 K3 9:00 必跑 4 件 (M3 不跑, K3 真实身份)**:
1. 3 设备 /contact 端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
2. Supabase dashboard 查 quotes 表 (期望 id fae355ba-7880-494b-b89c-5f6bcf6e2b8c) — M3 可用 curl 替代查
3. formsubmit.co 收件箱激活 (8/7 18:45 触发的激活邮件, K3 点链接)
4. 提供 X + LinkedIn URL + IndexNow key

**9:00 任务提前跑策略 (M3 04:35 拍板)**:
- M3 立即跑: curl Supabase GET /rest/v1/quotes?order=created_at.desc&limit=5 (验证 id fae355ba-... 在)
- M3 立即跑: 3 个核心 zh-hk 页面 production smoke 3 步 (curl /zh-hk/product/same-day-flyers/ + /zh-hk/product/a2-posters/ + /zh-hk/product/doujinshi-printing/)
- M3 立即跑: grep 5 渲染源验证 NAP 0 残留 181 (per §9 教训)
- K3 9:00 必跑: 3 设备真实身份提交 + formsubmit 激活邮件 + 提供 key

**应用范围**:
- 任何 K3 高层战略拍板
- 任何 Mavis "按最优执行" 自主执行边界
- 任何 9:00 必跑任务提前分拆 (M3 跑 + K3 跑)

**教训固化源头**:
- zprintpro 8/8 04:35 K3 战略级拍板格式 4 字+①②③
- 跨项目: 任何 Mavis "按最优执行" 模式必含 自主范围 + 待确认范围

"""

with open(memory_path, "r", encoding="utf-8", errors="replace") as f:
    content = f.read()

# Append at end
new_content = content.rstrip() + "\n" + new_sections

with open(memory_path, "w", encoding="utf-8", errors="replace") as f:
    f.write(new_content)

old_size = os.path.getsize(memory_path) - len(new_sections.encode("utf-8"))
new_size = os.path.getsize(memory_path)
print(f"OK: MEMORY.md + 4 段 §0.10-0.13")
print(f"  Old size: {old_size} bytes")
print(f"  New size: {new_size} bytes (+{new_size - old_size})")
print(f"  Added: §0.10 KPI 校准 / §0.11 资源分配 / §0.12 转化侧指标 / §0.13 K3 战略拍板 4 字+①②③ 模式")
