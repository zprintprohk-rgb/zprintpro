# -*- coding: utf-8 -*-
"""Analyze fresh GSC data (16:21 pull) for keyword opportunities."""
import csv, io

with open('gsc_data.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    rows = [r for r in reader if r and len(r) >= 5]

print("total rows:", len(rows))
print("header:", rows[0])
data = rows[1:]

def to_float(s):
    try:
        return float(s)
    except:
        return 0.0

def to_int(s):
    try:
        return int(s)
    except:
        return 0

parsed = []
for r in data:
    q = r[0]
    clicks = to_int(r[1])
    imps = to_int(r[2])
    ctr = to_float(r[3])
    pos = to_float(r[4])
    parsed.append((q, clicks, imps, ctr, pos))

# Sort by impressions desc
by_imp = sorted(parsed, key=lambda x: -x[2])
print("\n=== TOP 40 by impressions ===")
for q, c, i, ctr, p in by_imp[:40]:
    print(f"{i:6d} imp | {c:3d} clk | {ctr:6.2f}% | pos {p:6.2f} | {q}")

# Sweet spot: impressions > 20, rank 20-80, no landing page
print("\n=== Sweet spot (imps>20, pos 20-80) ===")
sweet = [x for x in parsed if x[2] > 20 and 20 <= x[4] <= 80]
sweet = sorted(sweet, key=lambda x: -x[2])
for q, c, i, ctr, p in sweet[:30]:
    print(f"{i:6d} imp | {c:3d} clk | {ctr:6.2f}% | pos {p:6.2f} | {q}")

# Poster-related keywords
print("\n=== Poster/海报 related ===")
for q, c, i, ctr, p in sorted([x for x in parsed if any(k in q.lower() for k in ['poster', '海報', 'a1', 'a2', 'a3'])], key=lambda x: -x[2])[:25]:
    print(f"{i:6d} imp | {c:3d} clk | pos {p:6.2f} | {q}")

# Flyer/傳單 related
print("\n=== Flyer/傳單 related ===")
for q, c, i, ctr, p in sorted([x for x in parsed if any(k in q.lower() for k in ['flyer', '傳單', 'leaflet', 'a4', 'a5', 'a6'])], key=lambda x: -x[2])[:20]:
    print(f"{i:6d} imp | {c:3d} clk | pos {p:6.2f} | {q}")
