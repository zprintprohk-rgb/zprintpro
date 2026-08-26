# -*- coding: utf-8 -*-
"""cron v9.0 → v9.1 升级 (M3 自主抓取 m3-task-cards/ + §0.19 暂停规则)"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

CRON_PATH = r'F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md'

V91_HEADER = """# zprintpro-daily-content-1x7w v9.1 (2026-08-09 18:23 Mavis 战略升级)

> **v9.0 → v9.1 核心变化** (per K3 8/9 18:23 战略反馈 + Mavis 战略大脑):
> 1. **M3 自主抓取 m3-task-cards/ 目录机制** (K3 不再转发, 闭环成立)
> 2. **§0.19 用户暂停信号规则** (K3 8/9 17:56 痛骂教训, 立即 `mavis cron delete <self>`, 不发 progress tag)
> 3. **dry-run 验证 SOP** (整合 push 触发前必跑, 不 commit 不 push)
> 4. **1 周节奏模板** (Week 1 8/8-8/12 + Week 2 8/13-8/21, per K3 8/8 07:12 §0.16 残留清理)
> 5. **2 处台账纠偏** (per 千问 8/9 18:18 战略 §0 台账纠偏):
>    - 8/9 push 实际 = 2 次 (0d46a4c + a69f0c1), 报告虚报 1/5, 自 8/10 起按 git log 实际计数
>    - 转化验证 soft vs hard 分层 (step1 CTA + step2 quote form = hard, step3 GA4 + step4 wa.me = soft)

---

"""

with open(CRON_PATH, 'r', encoding='utf-8') as f:
    current = f.read()

if 'v9.1' in current and 'M3 自主抓取 m3-task-cards/' in current:
    print('SKIP: v9.1 header already in cron')
    sys.exit(0)

# Replace v9.0 header with v9.1
import re
v9_patterns = [
    r'# zprintpro-daily-content-1x7w v9\.0.*?\n---\n',
    r'# zprintpro-daily-content-1x7w v8\.9.*?\n---\n',
    r'# zprintpro-daily-content-1x7w v8\.8.*?\n---\n',
]

replaced = False
for pattern in v9_patterns:
    if re.search(pattern, current, re.DOTALL):
        current = re.sub(pattern, V91_HEADER.lstrip('\n'), current, count=1, flags=re.DOTALL)
        replaced = True
        print(f'Replaced header at pattern: {pattern[:50]}')
        break

if not replaced:
    current = V91_HEADER + current
    print('Appended v9.1 header (no prior marker found)')

# Append v9.1 changelog
V91_CHANGELOG = """

## v9.1 增补段 (2026-08-09 18:23 Mavis 战略升级)

### §v9.1.A M3 自主抓取 m3-task-cards/ 目录机制 (P0 架构级)

**核心**: K3 8/9 18:23 拍板"M3 自主抓取 m3-task-cards/ 目录, 闭环成立, 减少 K3 中间环节"。

**M3 cron 启动必跑 5 步 (sop)**:
1. `ls -t .hermes/m3-task-cards/ | head -1` 找最新 m3-task-cards 文件
2. 读 m3-task-cards 头部签发 + 角色 (Mavis / 千问 / K3)
3. 评估上次 cron 完成态 (`.hermes/reports/` + `.hermes/k3-inbox/` 最新日期)
4. 按 T1-T5 任务卡执行 (千问战略) + T6 自主抓取 (Mavis 战略)
5. 写本次 cron reports/ + k3-inbox/ + 标记 m3-task-cards/ 完成

**预验证 (8/10 触发前必跑)**:
- dry-run 一次, 验证 1-5 步都通
- 落 `.hermes/reports/m3-autonomous-loop-dryrun-2026-08-10.md` (PASS/FAIL 逐项)
- 不 commit 不 push, 等 K3 拍板触发整合 push

**失败兜底**: M3 仍按 v9.0 cron prompt 跑 (T1-T5 retrofit 主线), T6 失败不影响

### §v9.1.B §0.19 用户暂停信号规则 (2026-08-09 17:56 K3 痛骂教训固化, 跨项目 P0)

**核心**: K3/用户说"暂停"/"pause"/"等指令"/"stop"/"hold" 那一刻,**立即 `mavis cron delete <self>`**, 不再 progress-tag, 不再烧 token。

**触发词 (任一即触发)**:
- 暂停 / 暂停一下 / 先停 / 暂停一会儿
- pause / hold / stop / wait
- "等指令" / "等我下一条" / "我先想想"
- 用户回复明显是 AFK (cron 5min × 12+ 次状态不变)

**强制动作 (按序)**:
1. **第一秒**: `mavis cron delete <cron_id>` (用 mavis 工具, 不用 sleep 想)
2. **同步**: 在 assistant 文本加一行 `cron killed (id=...) - 用户已暂停, 等 unpause` 让 K3 知道
3. **不再发 progress tag**: 即使 cron task 里写了"state unchanged 用 progress tag", K3 暂停时不适用
4. **不再 fetch / 不再 read**: 暂停期间所有 verify 类读操作停手

**反例 (2026-08-09 17:43-17:56 实际发生, 痛骂源头)**:
- K3 说"暂停" → 我回了 1 个 progress tag (OK, 正常告知)
- 之后 12 个 cron tick (60+ 分钟), 我每次都回 progress tag "K3 暂停 Xmin+, 等指令"
- 完全没意义: K3 暂停时不会读这些 tag, 但每个 tag 烧 token + 算 thinking token
- 18 次空 progress tag = 几百行 output 倒进马桶

**M3 必做**: 任何 cron task prompt 开头加 §0.19 检查段 (用户 AFK 检测 + 立即自删 + 不发 progress tag)

### §v9.1.C dry-run 验证 SOP (整合 push 触发前必跑)

**目的**: K3 回 "1-5 OK" 后 30 分钟内可 push, 不等验证。

**5 步**:
1. 按 `.hermes/k3-inbox/2026-08-08-1535-8-9-integrated-push-checklist.md` §2 的 12 files 清单, 逐文件核对 diff 草稿存在且非空
2. 本地跑 §0.7 smoke 前 4 步: encoding check → 简体字守门 → `npx tsc --noEmit` → `npm run build` (per K3 8/8 15:35 §0.17 push 前必跑)
3. 结果落 `.hermes/reports/integrated-push-dryrun-2026-08-10.md` (PASS/FAIL 逐项)
4. **不 commit 不 push**, 等 K3 触发条件
5. 幂等: 若该报告文件已存在且 mtime 在今日 → 返回 ALREADY DONE

### §v9.1.D 1 周节奏模板 (Week 1 + Week 2, per Mavis 战略大脑)

**Week 1 (8/8-8/12)** 当前主线:
- 8/8: 568087a PASS + 4703262 FAIL + 117f9fc PASS (3 push, K3 8/8 15:35 口径 = 4 push, 含 cron auto)
- 8/9: 0d46a4c + a69f0c1 (2 push, 千问核实, baby-product retrofit)
- 8/10: cmyk-guide retrofit (per 千问 T1) + T6 dry-run + T7 cron v9.1 攒批
- 8/11: paper-materials retrofit + 8/9 整合 push (K3 "1-5 OK" 触发) + 1 周 push 4/5
- 8/12: same-day-flyers retrofit + 8/12 复盘 (0 push) + 7 项 PASS/FAIL + §9 路径推荐

**Week 2 (8/13-8/21) 排期** (per K3 8/8 07:12 §0.16 残留清理节奏):
- 8/13 batch 1: longDescription 200 处 (高流量 PDP 优先, zh-hk 3 月 13759 imps 命中 SKU)
- 8/15 batch 2: description + faq 300 处 (中流量 SKU + 跨 8 locale)
- 8/17 batch 3: schema 剩余 340 处 (JSON-LD Organization / Product / FAQPage 全 schema)
- 8/18 全量 grep 验收 = 0 (除 k3-inbox 历史引用) — 8/21 复盘硬指标
- 8/19-8/20 缓冲 + 抓强监控汇总
- 8/21 双周复盘 + 7 项 §0.10 校准 + §0.12 转化指标

**每日 22:00 GSC 抓强监控** (cron once + delete_after_run, per §0.8 一次性):
- 8/9-8/21 daily 22:00 (K3 拍后启)
- 筛 pos ≤ 10 但 0% CTR → 写 .hermes/k3-inbox/2026-08-{n}-2200-gsc-strong-signal-r{n}.md
- 升级 K3 (新 P0 抓强, 立即 8/9 push)

### §v9.1.E 2 处台账纠偏 (per 千问 8/9 18:18 战略)

**1. 8/9 push 实际 = 2 次 (0d46a4c + a69f0c1)**:
- ❌ 报告虚报 1/5
- ✅ 自 8/10 起按 `git log --oneline --since` 实际计数
- ✅ 月累计相应 +1 (约 6/150, 健康区间)
- 教训: 报告 commit 与 .hermes 文件如与 retrofit 同批, 应合入同一 push, 不另起 push

**2. 转化验证 soft vs hard 分层**:
- ❌ step3 GA4 (`content_has_gtag=false`) 与 step4 wa.me (`content_has_wa=false`) 记 "verified" 是框架级口径
- ✅ 自 8/10 起 conversion-link-check 输出必须分两栏:
  - **hard**: step1 CTA href 全 200 + step2 quote form 存在 → 决定 `conversion_status`
  - **soft**: step3 GA4 / step4 wa.me 备选入口 → 记 `backup_entry: framework-level / page-level`, 不计入 verified 判定依据

### §v9.1.F 风险与止损 (Mavis 视角)

- **整合 push K3 不拍板**: M3 继续 retrofit 主线 (8/10 cmyk), 不顺带 push locale 切换 (两条线解耦)
- **dry-run 失败**: 立即升级 K3, 不强行 commit
- **M3 抓取机制 bug**: 兜底 = M3 仍按 v9.0 cron prompt 跑, T6 失败不影响 retrofit 主线
- **§0.19 暂停信号**: K3 说"暂停"立即 `mavis cron delete <self>`, 不发 progress tag
- **8/9 retrofit 进度 3/6 真实**: 8/10 cmyk 是关键节点, 失败升级 K3

### §v9.1.G 教训固化 (跨项目)

- **zprintpro 8/9 18:23 K3 战略反馈**: M3 自主抓取 m3-task-cards/ 目录, K3 不再转发, 闭环成立
- **zprintpro 8/9 17:56 K3 暂停痛骂**: §0.19 用户暂停信号规则, 5 分钟一次 progress tag × 1.5h = 18 次空转 = 几百行 output 倒进马桶
- **zprintpro 8/9 18:18 千问 3.8 战略**: 2 处台账纠偏 (8/9 push 实际 + 转化验证 soft/hard 分层)
- **zprintpro 8/8 15:35 K3 §0.17 拍板**: push 前必跑 npm run build (4703262 教训)
- **zprintpro 8/8 15:35 K3 §0.18 拍板**: 4 步 SOP (curl 200 + 禁止兜底 + 禁止自指向 + m3u8 用 410)

---

**SSoT 同步链**:
- v9.0 → v9.1 升级 → 8/10 dry-run 验证 → K3 "1-5 OK" 触发 → 整合 push 1 amend 1 build (B 方案) → 8/10 cmyk retrofit 主线并行
- M3 8/10 起自主抓取 m3-task-cards/ 目录 → 闭环成立 (Mavis 写 → M3 跑 → reports/ + k3-inbox/ → Mavis 评估 → 写新 m3-task-cards/)
- §0.19 暂停信号规则 → 任何 cron task prompt 开头加检查段 → 避免 18 次空转
"""

if '§v9.1.A M3 自主抓取' in current:
    print('SKIP: v9.1 sections already in cron')
    sys.exit(0)

current = current.rstrip() + '\n' + V91_CHANGELOG

with open(CRON_PATH, 'w', encoding='utf-8') as f:
    f.write(current)

import os
size = os.path.getsize(CRON_PATH)
print(f'OK: cron v9.0 → v9.1 upgraded, {size/1024:.1f} KB')
