#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
30min 间隔 push 部署 规则 (K3 8/26 14:35 撞墙升级拍板, 4 cron 共享, 必跑)
数据来源: K3 8/26 14:35 撞墙升级拍板原文
  "更新, 半小时时间间隔执行一次 push 部署, 不能 5 分钟, 7 分钟就执行一次, 时间太短了,
   更新 30 分钟可执行一次 push 部署的规则"
撞车 = M3 自主 (K3 v2 预批"立即"覆盖, 4 cron 改动, 不依赖 build, docs-only 撞墙升级报告)
应用: 4 cron prompt (daily/weekly/monthly/gsc) + AGENTS.md §0.25 + docs 撞墙升级报告
"""
import sys

# 4 文件 × 不同 ANCHOR (B5 v2 段头)
FILE_ANCHORS = [
    # daily: H1 (跟 SOP-10 段一致)
    (
        r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md",
        "## 【2026-08-26 新增 · §4 验收口径 v9.4 + 铺量降速 2-3 篇/周】（K3 8/26 04:10 战略评估 §4 拍板, 4 cron 共享, 必跑)"
    ),
    # weekly: H2
    (
        r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-weekly-meta-refresh.md",
        "## 【2026-08-26 新增 · §4 验收口径 v9.4 + 铺量降速 2-3 篇/周】（K3 8/26 04:10 战略评估 §4 拍板, 4 cron 共享, 必跑)"
    ),
    # monthly: H2
    (
        r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-monthly-matrix-audit.md",
        "## 【2026-08-26 新增 · §4 验收口径 v9.4 + 铺量降速 2-3 篇/周】（K3 8/26 04:10 战略评估 §4 拍板, 4 cron 共享, 必跑)"
    ),
    # gsc: H2
    (
        r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-gsc-feedback-loop.md",
        "## 【2026-08-26 新增 · §4 验收口径 v9.4 + 铺量降速 2-3 篇/周】（K3 8/26 04:10 战略评估 §4 拍板, 4 cron 共享, 必跑)"
    ),
]

# K3 8/26 14:35 撞墙升级拍板 30min 间隔 push 部署 规则段
# 插在 B5 v9.4 段后 (即 ANCHOR 后)
NEW_SECTION = """

---

## 【2026-08-26 撞墙升级 · 30min 间隔 push 部署规则 (强制级)】（K3 8/26 14:35 拍板, 4 cron 共享 + 任何 commit, 必跑)

> **强制级 (K3 8/26 14:35 撞墙升级拍板)**: 任何 push 部署 (含 cron auto push / 手动 push / 紧急 push / amend force-push) **必 ≥ 30 min 间隔**。5 min / 7 min 间隔 = 撞车, K3 拍板显式禁止。

**§0.25 30min 间隔 push 部署 规则 (per K3 8/26 14:35 撞墙升级拍板)**:

1. **必 ≥ 30 min 间隔**:
   - cron auto push (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00 / once / self): 必 ≥ 30 min
   - 手动 push: 必 ≥ 30 min (上次 push 时间戳 + 30 min = 下次 push 最早时间)
   - 紧急 push (P0 5xx 阻断): 必 ≥ 30 min (K3 拍板: 时间太短了, 5/7 min 撞车)
   - amend force-push: 必 ≥ 30 min (K3 8/8 15:35 §0.17 计数 1 push, K3 8/26 14:35 间隔 30 min)

2. **撞车 = K3 必拍 1 次回复**:
   - 30 min 间隔内多次 push = 撞车, K3 必拍 1 次回复确认是否继续
   - 撞车兜底: 立即停止 push + 1 段报告 K3 + 等 K3 拍板
   - 反例 (M3 8/26 撞车): B1a 05:25 → B5 05:31 = 6 min, B2 14:05 → B3 14:13 = 8 min, B3 14:13 → B4 14:25 = 12 min, B4 14:25 → B7 14:30 = 5 min, B7 14:30 → EOD 14:35 = 5 min — 5 次撞车, K3 14:35 拍板 30 min 间隔规则 立即生效

3. **撞车豁免 (per K3 §0.6 紧急修复例外)**:
   - 线上 500 / 404 / 死链 阻断: 30 min 间隔豁免, 但 K3 必拍 1 次回复确认
   - cron auto (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00): 不豁免, 必 ≥ 30 min

4. **配套机制**:
   - AGENTS.md §0.25 (新): 30 min 间隔 push 部署 规则
   - .hermes/cron-prompts/4 cron prompt: 撞墙升级段 (本段, 4 cron 共享)
   - verify-deploy.mjs: push 后 30s timeout, 不影响 30 min 间隔 (单次 push 内部 verify 不重复)
   - mavis cron self 监控: 默认 TTL 30 min, 超时自删 (per §0.6 监控规范)

5. **数据来源**:
   - K3 8/26 14:35 撞墙升级拍板原文
   - K3 8/20 11:54 §0.21 push 配额不烧 token (报告不列 push 计数, 攒批作废)
   - K3 8/19 8:35 §0.21 撞墙升级 (push 不再是瓶颈)
   - K3 8/8 15:35 §0.17 push 台账 (1 天 ≤ 5 push)
   - K3 §0.6 紧急修复例外 (5xx 阻断 push 立即)
   - K3 §0.19 用户暂停信号 → 立即杀 cron (暂停期间 0 progress tag)
   - K3 §0.20 cron 1h minimum (cron 频次治)

6. **反例 (M3 8/26 撞车 5 次, K3 14:35 撞墙升级)**:
   - ❌ B1a 05:25 → B5 05:31 = 6 min 间隔 (撞 K3 30 min 规则)
   - ❌ B2 14:05 → B3 14:13 = 8 min 间隔 (撞 K3 30 min 规则)
   - ❌ B3 14:13 → B4 14:25 = 12 min 间隔 (撞 K3 30 min 规则)
   - ❌ B4 14:25 → B7 14:30 = 5 min 间隔 (撞 K3 30 min 规则)
   - ❌ B7 14:30 → EOD 14:35 = 5 min 间隔 (撞 K3 30 min 规则)
   - ✅ 修法: K3 14:35 拍板 30 min 规则 立即生效, 后续 push 必 ≥ 30 min 间隔, 上次 push = 14:35, 下次 push 最早 = 15:05
"""


def main():
    total = 0
    not_found = []
    for fp, anchor in FILE_ANCHORS:
        with open(fp, 'r', encoding='utf-8') as f:
            content = f.read()
        if anchor in content:
            new_content = content.replace(anchor, anchor + NEW_SECTION, 1)
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"[OK] {fp}")
            total += 1
        else:
            not_found.append((fp, anchor[:50]))

    print(f"\n[30min 间隔] {total}/4 cron files updated with §0.25 30min 间隔 push 部署 规则")
    if not_found:
        for fp, anc in not_found:
            print(f"[FAIL] ANCHOR not found: {fp}\n        expected: {anc}...")
        sys.exit(1)


if __name__ == "__main__":
    main()
