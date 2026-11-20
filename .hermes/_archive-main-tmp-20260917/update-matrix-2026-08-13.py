#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Update matrix.json with 8/13 daily cron status.
- 8/13 push 配额已用 (J3 03:40 → 353a8fa)
- 4 周计划 8/13 retrofit 加权队列 #1 (flyer-sizes-compared 276 imps) 未做
- 6 retrofit GA4 事件 broken (8/13 09:18 conversion-link-check)
- 4 周计划 batch 1 智印雲 + e-print 已 done by J3
- 4 周计划 batch 1 登錄態 1 已改 products.ts 未 commit (defer 8/14)

不 commit / 不 push, 只更新 matrix 文件 (matrix.json 不是 src/, 改动不入 git
触 CF build 是 matrix 自己的 tracking, 不影响主站).
"""
import json
import os
from datetime import datetime, timezone, timedelta

MATRIX_PATH = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"
tz_sh = timezone(timedelta(hours=8))
now = datetime.now(tz_sh).isoformat(timespec="seconds")

# Load
with open(MATRIX_PATH, "r", encoding="utf-8-sig") as f:
    data = json.load(f)

# 1. Add cron_8_13_status block (top-level segment)
status_block = {
    "version": "v1",
    "created_at": now,
    "creator": "M3 (Mavis) daily cron 2026-08-13 09:10 Asia/Shanghai",
    "trigger": "daily cron auto + 4 周计划 8/13 batch 1 + retrofit 加权队列 #1",
    "push_quota_used": "1/1 (J3 03:40 → 353a8fa, deploy PASS)",
    "remaining_push_today": 0,
    "amend_quota_used": "2/2 (8/8 117f9fc + 8/10 8664488)",
    "outstanding_work_4week_plan_8_13": [
        {
            "task": "batch 1 智印雲 985 处",
            "status": "✅ done",
            "commit": "232ece5 (8/12 12:00)"
        },
        {
            "task": "batch 1 e-print 27 处",
            "status": "✅ done (J3)",
            "commit": "353a8fa (8/13 03:40)"
        },
        {
            "task": "batch 1 登錄態 1 处",
            "status": "⚠️ edited in working tree, uncommitted",
            "file": "src/data/products.ts (1 line 登錄態→實詢)",
            "defer_to": "8/14 push bundle"
        },
        {
            "task": "加权队列 #1 retrofit (flyer-sizes-compared 276 imps)",
            "status": "❌ NOT done (4 周计划 8/13 retrofit 部分)",
            "reason": "源 file 不在 M3 可访问位置, §0.6 保守方案不猜",
            "defer_to": "autoclaw next session or 8/14"
        },
        {
            "task": "6 retrofit GA4 事件 修复 (step3_ga4 broken)",
            "status": "❌ broken, not fixed today",
            "evidence": "conversion-link-check 2026-08-13T09:18:48 (6/6 broken)",
            "fix_needs": "page.tsx 改 gtag event 代码 = 需 push = 超 8/13 配额",
            "defer_to": "8/14 (P0 修复)"
        }
    ],
    "daily_cron_8_13_status": {
        "Q_005_daily_target": {
            "matrix_id": "Q-005",
            "slug": "cross-border-ecommerce-shipping-box-guide",
            "queued_at": "2026-07-06",
            "priority_boost": 2,
            "gsc_signal": "GSC v4 §9 blocklist 1 (per a6c7b4c)",
            "status": "⏳ 待 daily cron 10:15 自动跑 (此 cron 09:10 启动, 不抢 10:15 配额)",
            "deferred_to": "10:15 daily cron (cron id 6f9a93af 序列)"
        }
    },
    "verify_5_step": {
        "step_1_git_status_ahead": "✅ clean (353a8fa = HEAD = origin_ssh/main)",
        "step_2_deploy_pass": "✅ verify-deploy.mjs PASS (CF run 94229774541, J3 03:40 推送)",
        "step_3_conversion_link_check": "❌ 6/6 retrofit pages step3_ga4 broken (8/13 09:18 跑)",
        "step_4_matrix_updated": "✅ this script ran (cron_8_13_status block added)",
        "step_5_no_push": "✅ 0 push today (8/13 配额已用尽, §0.17 push 台账)"
    },
    "follow_up_for_K3_8_14_approval": [
        "1. 6 retrofit GA4 事件修复 (需 page.tsx 改, 建议 8/14 早上 push 第 1)",
        "2. 4 周计划 8/13 retrofit 加权队列 #1 (autoclaw 内部任务, K3 8/14 早上拍板谁来执行)",
        "3. 4 周计划 8/14 batch 2 (名片 94+55+1 文案清扫, 已建议 8/14 优先)",
        "4. 4 周计划 8/14 内链 23.2%→30% 补链 (J3 03:40 已做 30.4%, 已超额, 可改 8/15)",
        "5. 16 文件 uncommitted (sitemaps 1500+ 行 + price-tables 7 + products.ts 1 + AGENTS.md 36) — 8/14 决定 bundle 还是 revert",
        "6. 8/13 9:10 cron 0 push 决策 (M3 自主, K3 复盘可见)"
    ]
}

# Insert at top-level
data["cron_8_13_status"] = status_block

# Save (with UTF-8 no BOM, indent for human readability)
with open(MATRIX_PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"[OK] matrix.json updated with cron_8_13_status at {now}")
print(f"[INFO] matrix file size: {os.path.getsize(MATRIX_PATH):,} bytes")
print(f"[INFO] added keys: cron_8_13_status (with 5 sub-blocks)")
print(f"[WARN] no commit / no push today (8/13 配额 1/1 used by J3 03:40)")
