#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""v3: Get actual optimizationRound from products.ts (source of truth).
"""
import json
import re

products_path = r"F:\zprintpro-nextjs\src\data\products.ts"
with open(products_path, "r", encoding="utf-8") as f:
    products_content = f.read()

# Find all slug: 'xxx' positions
slug_positions = [(m.group(1), m.start()) for m in re.finditer(r"slug:\s*['\"]([^'\"]+)['\"]", products_content)]

# For each slug, look AHEAD for category, optimizedAt, optimizationRound
P0_CATS = {"stickers", "flyers", "packaging", "paper-bags"}
results = []
for slug, pos in slug_positions:
    snippet = products_content[pos:pos+1500]
    cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", snippet)
    opt_m = re.search(r"optimizedAt:\s*['\"]([^'\"]+)['\"]", snippet)
    rnd_m = re.search(r"optimizationRound:\s*(\d+)", snippet)
    if not cat_m:
        continue
    cat = cat_m.group(1)
    if cat not in P0_CATS:
        continue
    results.append({
        "slug": slug,
        "cat": cat,
        "at": opt_m.group(1) if opt_m else None,
        "round": int(rnd_m.group(1)) if rnd_m else 0,
    })

# Group
r0_p0 = [r for r in results if r["round"] == 0]
r1_p0 = [r for r in results if r["round"] == 1]
r2_p0 = [r for r in results if r["round"] == 2]
r3_p0 = [r for r in results if r["round"] >= 3]

print("=== P0 R0 (NOT optimized) — based on products.ts (source of truth) ===")
for r in sorted(r0_p0, key=lambda x: (x["cat"], x["slug"])):
    print(f"  R0 | {r['cat']:12s} | {r['slug']}")
print(f"  TOTAL: {len(r0_p0)}\n")

print("=== P0 R1 (candidates for R2 upgrade) ===")
for r in sorted(r1_p0, key=lambda x: (x["cat"], x["slug"], x["at"] or "")):
    print(f"  R1 | {r['cat']:12s} | {r['slug']} | {r['at']}")
print(f"  TOTAL: {len(r1_p0)}\n")

print("=== P0 R2+ (already upgraded at least once) ===")
for r in sorted(r2_p0, key=lambda x: (x["cat"], x["slug"], x["at"] or "")):
    print(f"  R{r['round']} | {r['cat']:12s} | {r['slug']} | {r['at']}")
print(f"  TOTAL: {len(r2_p0)}\n")
