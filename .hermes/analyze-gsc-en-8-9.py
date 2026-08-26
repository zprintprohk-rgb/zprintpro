#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""EN GSC query analysis."""
import csv, os

os.chdir(r"F:\zprintpro-nextjs")

def num(v):
    try:
        return float(str(v).replace(",", "").replace("%", "").replace("'", "").strip())
    except:
        return 0.0

path = r"GSC数据\zprintpro.com-Performance-on-Search-2026-08-08 (1)\查询数.csv"
rows = []
with open(path, "r", encoding="utf-8-sig", errors="replace") as f:
    for r in csv.DictReader(f):
        rows.append({
            "q": (r.get("热门查询") or "").strip(),
            "clicks": num(r.get("点击次数")),
            "imps": num(r.get("展示")),
            "ctr": num(r.get("点击率")),
            "pos": num(r.get("排名")),
        })

print(f"总 EN query: {len(rows)}")
print()
print("=== A. 抓强信号 (pos<=15, 有展示) ===")
strong = [r for r in rows if r["imps"] > 0 and r["pos"] <= 15]
strong.sort(key=lambda r: r["imps"], reverse=True)
for r in strong[:15]:
    print(f"{r['q'][:40]:42s} imp={r['imps']:6.0f} clk={r['clicks']:4.0f} ctr={r['ctr']:5.1f}% pos={r['pos']:5.1f}")

print()
print("=== B. 黑洞词 (imps>=15, pos 15-80) ===")
pot = [r for r in rows if r["imps"] >= 15 and 15 <= r["pos"] <= 80]
pot.sort(key=lambda r: r["imps"], reverse=True)
for r in pot[:25]:
    print(f"{r['q'][:40]:42s} imp={r['imps']:6.0f} clk={r['clicks']:4.0f} ctr={r['ctr']:5.1f}% pos={r['pos']:5.1f}")

print()
print("=== C. Top 30 imps 全览 ===")
top = sorted(rows, key=lambda r: r["imps"], reverse=True)[:30]
for r in top:
    print(f"{r['q'][:40]:42s} imp={r['imps']:6.0f} clk={r['clicks']:4.0f} ctr={r['ctr']:5.1f}% pos={r['pos']:5.1f}")
