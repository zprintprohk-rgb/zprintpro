"""monthly-matrix-stats.py
8/1 monthly cron: 读 matrix 全状态 + 写报告基础数据
"""
import json
from pathlib import Path
from datetime import datetime, timezone, timedelta

ROOT = Path(r"F:\zprintpro-nextjs")
m = json.loads((ROOT / ".hermes/industry-keyword-matrix.json").read_text(encoding="utf-8"))

print("=== STATS ===")
for k, v in m.get("stats", {}).items():
    print(f"  {k}: {v}")

print()
print("=== V7 FIELDS ===")
v7_sku = m.get("v7_sku_optimizations", [])
v7_pdp = m.get("v7_pdp_reviews", [])
v7_sessions = m.get("v7_cron_sessions", [])
v7_skip = m.get("v7_skip_log", [])
k3_skip = m.get("k3_section6_skip_count", 0)
print(f"v7_sku_optimizations: {len(v7_sku)}")
for x in v7_sku[-5:]:
    slug = x.get("slug", "")
    r = x.get("optimization_round", x.get("round", "?"))
    d = x.get("optimized_at", x.get("date", ""))
    print(f"  - {slug:50s} R{r} ({d})")
print(f"\nv7_pdp_reviews: {len(v7_pdp)}")
for x in v7_pdp[-3:]:
    slug = x.get("slug", "")
    d = x.get("reviewed_at", x.get("date", ""))
    print(f"  - {slug} ({d})")
print(f"\nv7_cron_sessions: {len(v7_sessions)}")
for x in v7_sessions:
    d = x.get("date", "")
    e = x.get("event", x.get("type", ""))
    print(f"  - {d}  {e}")
print(f"\nv7_skip_log: {len(v7_skip)}")
for x in v7_skip[-3:]:
    print(f"  - {x}")
print(f"\nk3_section6_skip_count: {k3_skip}")
print(f"k3_section6_skip_log: {len(m.get('k3_section6_skip_log', []))}")

print()
print("=== COVERED ===")
covered = m.get("covered", [])
print(f"covered count: {len(covered)}")
print(f"first 5: {covered[:5]}")
print(f"last 5: {covered[-5:]}")

print()
print("=== LAST TIER SWITCH ===")
print(f"last_tier_switch_run: {m.get('last_tier_switch_run')}")
print(f"lastUpdated: {m.get('lastUpdated')}")
print(f"last_updated: {m.get('last_updated')}")
print(f"version: {m.get('version')}")
print(f"priority_boost_history: {len(m.get('priority_boost_history', []))} entries")

print()
print("=== P0/P1/P2 COVERAGE ===")
queue = m.get("queue", [])
for pri in ["P0", "P1", "P2"]:
    pq = [q for q in queue if q.get("priority") == pri]
    pd = [q for q in pq if q.get("status") == "completed"]
    pct = len(pd)/len(pq)*100 if pq else 0
    print(f"  {pri}: {len(pd)}/{len(pq)} = {pct:.0f}%")

print()
print("=== TIER A/B/C COVERAGE ===")
for tier in ["A", "B", "C"]:
    tq = [q for q in queue if q.get("tier") == tier]
    td = [q for q in tq if q.get("status") == "completed"]
    pct = len(td)/len(tq)*100 if tq else 0
    print(f"  Tier {tier}: {len(td)}/{len(tq)} = {pct:.0f}%")

print()
print("=== 524 LONG-TAIL TARGET ===")
stats = m.get("stats", {})
print(f"total_524_target: {stats.get('total_524_target')}")
print(f"covered_524_pct: {stats.get('covered_524_pct')}")
