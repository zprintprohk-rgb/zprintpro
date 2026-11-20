"""monthly-orphan-scan.py
8/1 monthly cron: 找 orphan 10 候选 + GSC 数据 + matrix 状态
"""
import json
import re
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs")

# === 1. Blog data ===
data = {}
for loc in ["zh-hk", "en", "ja"]:
    p = ROOT / f"src/data/blog-data/{loc}.json"
    j = json.loads(p.read_text(encoding="utf-8"))
    data[loc] = j

# 3 locale 共有 slugs
all_slugs = set(data["zh-hk"].keys()) & set(data["en"].keys()) & set(data["ja"].keys())
print(f"3 locale 共有 slugs: {len(all_slugs)}")

def wc(s):
    if not s:
        return 0
    t = re.sub(r"<[^>]+>", " ", s)
    t = re.sub(r"\s+", " ", t)
    return len(t.split())

# 选 zh-hk 最短
thin = []
for slug in all_slugs:
    item = data["zh-hk"][slug]
    z = wc(item.get("content", ""))
    e = wc(data["en"].get(slug, {}).get("content", ""))
    j_ = wc(data["ja"].get(slug, {}).get("content", ""))
    thin.append((slug, z, e, j_, item.get("category", ""), item.get("title", "")[:60]))

thin.sort(key=lambda x: x[1])
print("--- 3 locale 共有博客, 按 zh-hk 字数升序 top 15 ---")
for s, z, e, j_, c, t in thin[:15]:
    print(f"  zh={z:4d} en={e:4d} ja={j_:4d} cat={c:15s} {s} -- {t}")

# === 2. GSC snapshot ===
snap_path = ROOT / ".hermes/gsc-snapshot-2026-07-29.json"
snap = json.loads(snap_path.read_text(encoding="utf-8-sig"))
entries = snap.get("entries", [])
print(f"\nGSC 7/22-7/28 total entries: {len(entries)} | imps={snap.get('total_impressions')} | clicks={snap.get('total_clicks')}")

# 找 0 click by imps
zeros = [(e["query"], e["impressions"], e["position"]) for e in entries if e.get("clicks", 0) == 0]
zeros.sort(key=lambda x: -x[1])
print(f"\n--- Top 20 zero-click by imps (GSC 7/22-7/28, 296 词) ---")
for q, imps, pos in zeros[:20]:
    print(f"  imps={imps:3d} pos={pos:5.1f}  {q}")

# === 3. Matrix ===
matrix = json.loads((ROOT / ".hermes/industry-keyword-matrix.json").read_text(encoding="utf-8"))
print(f"\n=== MATRIX ===")
print(f"version: {matrix.get('version')}")
print(f"queue: {len(matrix.get('queue',[]))} | covered[]: {len(matrix.get('covered',[]))}")
v7 = matrix.get("v7_sku_optimizations", [])
print(f"v7_sku_optimizations: {len(v7)}")
print(f"k3_section6_skip_count: {matrix.get('k3_section6_skip_count')}")
