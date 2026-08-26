#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
B5 v2: 4 cron prompt §4 验收口径 + 铺量降速 2-3 篇/周 (K3 8/26 04:10 §4 + 8/26 04:50 v2 预批)
修正: daily 用 # H1, weekly/monthly 用 ## H2, gsc 用 # Last sync
"""
import sys

# 4 文件 × 不同 ANCHOR
FILE_ANCHORS = [
    # daily: H1
    (
        r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md",
        "# 【2026-08-25 新增 · SOP-10 5 问门禁 + 数据诚信红线】（K3 8/25 拍板 P0, 4 cron 共享, 必跑）"
    ),
    # weekly: H2
    (
        r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-weekly-meta-refresh.md",
        "## 【2026-08-25 新增 · SOP-10 5 问门禁 + 数据诚信红线】（K3 8/25 拍板 P0, 4 cron 共享, 必跑）"
    ),
    # monthly: H2
    (
        r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-monthly-matrix-audit.md",
        "## 【2026-08-25 新增 · SOP-10 5 问门禁 + 数据诚信红线】（K3 8/25 拍板 P0, 4 cron 共享, 必跑）"
    ),
    # gsc: Last sync
    (
        r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-gsc-feedback-loop.md",
        "# Last sync: 2026-08-25 04:30 (K3 8/25 拍板 P0 落地, SOP-10 5 问门禁 + 数据诚信红线 引用)"
    ),
]

NEW_SECTION = """

---

## 【2026-08-26 新增 · §4 验收口径 v9.4 + 铺量降速 2-3 篇/周】（K3 8/26 04:10 战略评估 §4 拍板, 4 cron 共享, 必跑)

> **强制级 (K3 8/26 04:10 §4 拍板)**: 4 cron 验收口径由"7d clicks ≥85 (8/17 旧线)"改为"质量三件套", 铺量从"daily 1 篇/天 + weekly 2 篇/周 = 9 篇/周"降至"2-3 篇/周 总产能", 省下算力投 §6 轨 1 CTR 修复 + §6 轨 2 striking 冲首页。

**§4 验收口径 v9.4 (K3 8/26 04:10 §4 拍板, 4 cron 报告必含, 替换旧 7d clicks ≥85)**:
1. **striking 词进首页数 ≥5** (优先 pos 11-20 冲 pos ≤10, 替代旧"展示量"指标)
2. **pos 1-20 展示占比 ≥30%** (质量指标, 替代旧"总展示量"灌水)
3. **有点击词数 ≥12** (替代旧"7d clicks ≥85"绝对值, 按词结构算)

> **注**: 原 M1 口径"7d clicks ≥85"作为参考保留, 不作主验收 (8/17 旧线无 527 词分层数据, 已被 K3 8/26 §4 替换)。

**§4 铺量降速 v9.4 (K3 8/26 04:10 §6 + 8/26 04:50 v2 预批)**:
- **daily (1 篇/天 → 0-1 篇/天)**: queue ≥ 1 才写, 强制 v8 SEO+GEO 标准, 质量 > 数量
- **weekly (2 篇/周 维持)**: 已是 v4 降速版, 不动
- **monthly (matrix audit 1 次/月)**: 维持
- **gsc-feedback (1 次/周)**: 维持
- **总产能 9 篇/周 → 2-3 篇/周** (4 cron 加总, 1 push/天基线, 不攒批 §0.21 攒批作废)

**数据来源**:
- K3 战略评估: `.hermes/logs/2026-08-26-下一阶段战略-k3.md` §4 (展示量阶段目标评估) + §6 (3 轨推进)
- K3 v2 修正指令 8/26 04:50: B5 撞墙 = M3 自主 (.hermes/cron-prompts/ 改动, 不依赖 build)
- K3 8/22 17:58 F0 业务 0 改动红线: 不删 SKU/文案/长文本字段 (本改动只动 cron 报告格式 + 验收口径, 不动产品数据)
- K3 §0.21 push 配额不烧 token: 报告不列 push 计数, 攒批作废
- K3 §0.23 数据诚信红线: baseline 必标"待 XX 校准"或"已 XX 校准"

**反例 (M3 8/25 误判)**:
- ❌ "8/26 15:00 GSC cron 验收 (7d clicks ≥85) 大概率不过 (~24.5 推算)" — 用旧线, 应改 §4 v9.4 质量三件套
- ❌ 报告虚报 push 计数 / 攒批拖延 — K3 8/20 11:54 §0.21 已废止
- ❌ striking 词进首页数 0 / pos 1-20 展示占比 < 30% / 有点击词数 < 12 — 不达 §4 验收, K3 不拍板
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

    print(f"\n[B5 v2] {total}/4 cron files updated with §4 验收口径 v9.4 + 铺量降速 2-3 篇/周")
    if not_found:
        for fp, anc in not_found:
            print(f"[FAIL] ANCHOR not found: {fp}\n        expected: {anc}...")
        sys.exit(1)


if __name__ == "__main__":
    main()
