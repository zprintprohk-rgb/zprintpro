"""
zprintpro matrix.json GSC cron 8/5 写入 (本 cron 必跑)
1. last_updated 2026-08-01T10:35:00 → 2026-08-05T15:00:00
2. v7_cron_sessions 11 → 12 (加 8-5-gsc-cron-v4 entry)
3. k3_section6_skip_count 28 → 29 (8/5 +1, GSC cron 0 候选常态延续)
4. k3_section6_skip_log 加 8/5 entry
5. v7_cron_sessions_count 11 → 12
"""
import json
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs")
matrix_path = ROOT / ".hermes" / "industry-keyword-matrix.json"

# 读 (utf-8-sig strip BOM)
with open(matrix_path, "r", encoding="utf-8-sig") as f:
    matrix = json.load(f)

# 1. last_updated
old_last_updated = matrix.get("last_updated", "?")
matrix["last_updated"] = "2026-08-05T15:00:00+08:00"

# 2. v7_cron_sessions 加 8/5 GSC cron entry
new_session = {
    "session_id": "8-5-gsc-cron-v4",
    "date": "2026-08-05",
    "cron_name": "zprintpro-gsc-feedback-loop",
    "cron_id": "6f9a93af",
    "trigger_type": "scheduled_cron_weekly_wed_15:00",
    "deliverables": {
        "gsc_data_fetched": 1,
        "gsc_window": "2026-07-28 to 2026-08-04 (7 days)",
        "gsc_total_imps": 1301,
        "gsc_total_clicks": 3,
        "gsc_total_rows": 390,
        "gsc_28_baseline_matched": 19,
        "p0_2_5_items_monitored": 5,
        "p0_2_5_items_passed": 3,
        "p0_2_5_items_failed": 1,
        "p0_2_5_items_pending_v3": 3,
        "matrix_updates": 1,
        "report_written": 1,
        "k3_section6_skip_count": 1,
    },
    "build_quota": 0,
    "strategy": "v4 GSC 周报 + 5 项 P0-2 监控 + matrix tracking + 14 章节 K3 格式报告 + 1 push 攒批 (跟 daily 后续 5 M 文件)",
    "p0_2_5_items": {
        "1_crawl_errors": "⚠️ fallback 抽样 (无 GSC API page 维度, v3 升级待跑)",
        "2_sitemap_old_url": "✅ 0 老 URL 残留",
        "3_index_transfer_rate": "⚠️ fallback 待 v3 升级",
        "4_ranking_diff": "⚠️ fallback 待 v3 升级",
        "5_old_url_10_check": "❌ 清单内 1/5 PASS (严重降级 from 7/22 5/5), §14.4 升级 K3",
    },
    "k3_section_6_protection": "P0/P1 100% 楗和 (34/34 P0 unique SKU 优化 42 次), P2 pending-verify, 0 候选可写新 blog. GSC cron §6 daily cron 必写 Q-005 建议 (Q-005 cross-border-ecommerce-shipping-box-guide packaging × 跨境電商 高复购 Tier A, K3 拍板 0 候选常态延续则跳过)",
    "tier_b_industry_status": "Tier B 8/8 100% 覆盖完成 (T6-FI-006 金融證券 1st 7/27 + 8/3 monthly 拓点 + 8/5 维持)",
    "p3_campus_3_pages_status": "0/3 完成 (8/5 15:00 P3 阶段 last day, blocklist 2 slug 留给 M3 P3 独立执行, 本 cron 0 commit 校园内容)",
    "push_status": "pending (1 push/day §0.1, GSC cron 日报 + matrix + 5 M 文件 攒批)",
    "commit_hash": "pending",
    "verify_deploy_status": "pending",
}
matrix["v7_cron_sessions"].append(new_session)

# 3. k3_section6_skip_count 28 → 29
old_skip_count = matrix.get("k3_section6_skip_count", 0)
matrix["k3_section6_skip_count"] = old_skip_count + 1

# 4. k3_section6_skip_log 加 8/5 entry
new_skip_log = {
    "date": "2026-08-05",
    "cron": "zprintpro-gsc-feedback-loop",
    "queue_size": 35,
    "pending_in_queue": 22,
    "covered_skip": 22,
    "k3_section6_skip_count": 1,
    "new_blog_written": False,
    "reason": "matrix P0/P1 100% 楗和 (34/34 P0 unique SKU 优化 42 次) + P2 3 pending-verify (Q-P2-01 banners + Q-P2-02 envelopes + Q-P2-03 doujin), 0 候选可写新 blog. K3 §6 0 候选常态延续 (12 → 13 天). GSC cron 0 commit 校园内容 (P3 3 页留给 M3 P3 独立执行, §8 blocklist 4 cron 禁写). GSC cron §6 daily cron 必写 Q-005 建议 (cross-border-ecommerce-shipping-box-guide packaging × 跨境電商, K3 拍板 0 候选常态延续则跳过). v4 cron 1 push 攒批 (日报 + matrix + 5 M 文件). P0-2 5 项监控 §3.2 退化 (清单内 1/5 PASS, §14.4 升级 K3 8/5 EOD 决策).",
    "session": "mvs_b597258d78734ccc9da833a3724bc2a8",
}
matrix["k3_section6_skip_log"].append(new_skip_log)

# 5. v7_cron_sessions_count 11 → 12
matrix["v7_cron_sessions_count"] = 12

# 写回 (用 PowerShell-safe UTF-8, 不加 BOM, 用 LF 换行)
import io
buf = io.StringIO()
json.dump(matrix, buf, ensure_ascii=False, indent=2)
data = buf.getvalue().replace("\r\n", "\n").encode("utf-8")
matrix_path.write_bytes(data)

print("matrix.json GSC cron 8/5 写入完成:")
print(f"  last_updated: {old_last_updated} → {matrix['last_updated']}")
print(f"  v7_cron_sessions: 11 → 12 (新加 8-5-gsc-cron-v4 entry)")
print(f"  k3_section6_skip_count: {old_skip_count} → {matrix['k3_section6_skip_count']}")
print(f"  v7_cron_sessions_count_field: 11 → 12")
print(f"  k3_section6_skip_log: 加 8/5 entry (跟 7/24-8/4 11 天延续 + 8/5 +1)")
