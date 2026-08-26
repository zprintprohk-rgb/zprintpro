#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""GSC 8/8 export keyword analysis — full ranking view."""
import csv, os

os.chdir(r"F:\zprintpro-nextjs")

def num(v):
    try:
        return float(str(v).replace(",", "").replace("%", "").replace("'", "").strip())
    except:
        return 0.0

path = r"GSC数据\zprintpro.com-Performance-on-Search-2026-08-08\查询数.csv"
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

print(f"总 query 数: {len(rows)} | 有展示: {sum(1 for r in rows if r['imps']>0)}")
print()
# 1) 强信号: pos <= 15 且 CTR 低 (抓强机会)
print("=== A. 抓强信号 (pos<=15, 有展示) ===")
strong = [r for r in rows if r["imps"] > 0 and r["pos"] <= 15]
strong.sort(key=lambda r: r["imps"], reverse=True)
for r in strong[:20]:
    print(f"{r['q'][:38]:40s} imp={r['imps']:6.0f} clk={r['clicks']:4.0f} ctr={r['ctr']:5.1f}% pos={r['pos']:5.1f}")

print()
print("=== B. 黑洞词 (pos 20-80, 展示>50, 排名 20-80 高潜力) ===")
pot = [r for r in rows if r["imps"] >= 50 and 20 <= r["pos"] <= 80]
pot.sort(key=lambda r: r["imps"], reverse=True)
for r in pot[:25]:
    print(f"{r['q'][:38]:40s} imp={r['imps']:6.0f} clk={r['clicks']:4.0f} ctr={r['ctr']:5.1f}% pos={r['pos']:5.1f}")

print()
print("=== C. Top 25 展示 (整体) ===")
top = sorted(rows, key=lambda r: r["imps"], reverse=True)[:25]
for r in top:
    print(f"{r['q'][:38]:40s} imp={r['imps']:6.0f} clk={r['clicks']:4.0f} ctr={r['ctr']:5.1f}% pos={r['pos']:5.1f}")

print()
print("=== D. CTR 高 + pos 好 (收割) ===")
harv = [r for r in rows if r["clicks"] >= 1 and r["pos"] <= 30]
harv.sort(key=lambda r: r["ctr"], reverse=True)
for r in harv[:15]:
    print(f"{r['q'][:38]:40s} imp={r['imps']:6.0f} clk={r['clicks']:4.0f} ctr={r['ctr']:5.1f}% pos={r['pos']:5.1f}")
