#!/usr/bin/env python3
"""Dedup v7 matrix entries"""
import json
from pathlib import Path

m = json.loads(Path(".hermes/industry-keyword-matrix.json").read_text(encoding="utf-8"))

# Dedup covered (by id)
seen = set()
new_covered = []
for c in m["covered"]:
    cid = c.get("id") or c.get("qid") or c.get("slug", "UNKNOWN")
    if cid not in seen:
        seen.add(cid)
        new_covered.append(c)
removed = len(m["covered"]) - len(new_covered)
m["covered"] = new_covered
print(f"covered: {len(m['covered'])} (removed {removed} dup)")

# Dedup v7_sku_optimizations (by slug)
if "v7_sku_optimizations" in m:
    seen = set()
    new = []
    for x in m["v7_sku_optimizations"]:
        if x["slug"] not in seen:
            seen.add(x["slug"])
            new.append(x)
    removed = len(m["v7_sku_optimizations"]) - len(new)
    m["v7_sku_optimizations"] = new
    print(f"v7_sku_optimizations: {len(m['v7_sku_optimizations'])} (removed {removed} dup)")

# Dedup v7_pdp_reviews (by slug)
if "v7_pdp_reviews" in m:
    seen = set()
    new = []
    for x in m["v7_pdp_reviews"]:
        if x["slug"] not in seen:
            seen.add(x["slug"])
            new.append(x)
    removed = len(m["v7_pdp_reviews"]) - len(new)
    m["v7_pdp_reviews"] = new
    print(f"v7_pdp_reviews: {len(m['v7_pdp_reviews'])} (removed {removed} dup)")

# Dedup v7_cron_sessions (by session + date)
if "v7_cron_sessions" in m:
    seen = set()
    new = []
    for x in m["v7_cron_sessions"]:
        key = (x.get("session"), x.get("date"))
        if key not in seen:
            seen.add(key)
            new.append(x)
    removed = len(m["v7_cron_sessions"]) - len(new)
    m["v7_cron_sessions"] = new
    print(f"v7_cron_sessions: {len(m['v7_cron_sessions'])} (removed {removed} dup)")

Path(".hermes/industry-keyword-matrix.json").write_text(json.dumps(m, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n[OK] Matrix deduped, file size: {len(Path('.hermes/industry-keyword-matrix.json').read_bytes())} bytes")
