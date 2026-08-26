#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inspect optimized SKUs in matrix.json + compare with products.ts.
v2: scan SKU objects properly using brace matching.
"""
import json
import re
import sys

# Load matrix
matrix_path = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"
with open(matrix_path, "r", encoding="utf-8") as f:
    matrix = json.load(f)

skus = matrix.get("v7_sku_optimizations", [])
all_optimized = {}
for s in skus:
    if not s.get("slug"):
        continue
    slug = s["slug"]
    if slug not in all_optimized:
        all_optimized[slug] = {
            "id": s.get("id"),
            "category": s.get("category"),
            "round": s.get("optimization_round") or s.get("optimizationRound") or 0,
            "at": s.get("optimized_at") or s.get("optimizedAt") or "?",
        }

# Load products.ts and parse SKU objects
products_path = r"F:\zprintpro-nextjs\src\data\products.ts"
with open(products_path, "r", encoding="utf-8") as f:
    products_content = f.read()

# Find all slug: 'xxx' positions
slug_positions = [(m.group(1), m.start()) for m in re.finditer(r"slug:\s*['\"]([^'\"]+)['\"]", products_content)]
print(f"TOTAL products.ts slugs found: {len(slug_positions)}")

# For each slug, find its category by scanning AHEAD (next 800 chars) for the first 'category:' field
slug_to_cat = {}
slug_to_data = {}
for slug, pos in slug_positions:
    snippet = products_content[pos:pos+1000]
    # Match category: 'xxx' OR category: "xxx" OR category_slug: 'xxx'
    cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", snippet)
    if cat_m:
        slug_to_cat[slug] = cat_m.group(1)
    else:
        slug_to_cat[slug] = "?"
    # Get optimizedAt and round if present
    opt_m = re.search(r"optimizedAt:\s*['\"]([^'\"]+)['\"]", snippet)
    rnd_m = re.search(r"optimizationRound:\s*(\d+)", snippet)
    slug_to_data[slug] = {
        "cat": slug_to_cat[slug],
        "optAt": opt_m.group(1) if opt_m else None,
        "round": int(rnd_m.group(1)) if rnd_m else 0,
    }

# Validate vs matrix
print("\n=== ALL 101 SKU CATEGORIES (from products.ts) ===")
all_cats = {}
for slug, info in slug_to_data.items():
    cat = info["cat"]
    all_cats[cat] = all_cats.get(cat, 0) + 1
for cat, n in sorted(all_cats.items()):
    print(f"  {cat:20s} | {n}")

# P0 categories per AGENTS §13.3
P0_CATS = {"stickers", "flyers", "packaging", "paper-bags"}

# P0 unoptimized
print("\n=== P0 UNOPTIMIZED (not in matrix v7_sku_optimizations) ===")
unopt_p0 = []
for slug, info in sorted(slug_to_data.items()):
    if info["cat"] in P0_CATS and slug not in all_optimized:
        unopt_p0.append((slug, info["cat"]))
for slug, cat in unopt_p0:
    print(f"  {cat:12s} | {slug}")
print(f"  TOTAL: {len(unopt_p0)}")

# P0 already optimized (R1 only, candidates for R2 upgrade)
print("\n=== P0 R1 ONLY (candidates for R2 upgrade) ===")
r1_p0 = []
for slug, info in all_optimized.items():
    if slug in slug_to_data and slug_to_data[slug]["cat"] in P0_CATS and info["round"] == 1:
        r1_p0.append((slug, slug_to_data[slug]["cat"], info["at"]))
for slug, cat, at in sorted(r1_p0, key=lambda x: x[2]):
    print(f"  R1 | {cat:12s} | {slug} | {at}")
print(f"  TOTAL: {len(r1_p0)}")

# P0 R2 already
print("\n=== P0 R2+ (already upgraded) ===")
r2_p0 = []
for slug, info in all_optimized.items():
    if slug in slug_to_data and slug_to_data[slug]["cat"] in P0_CATS and info["round"] >= 2:
        r2_p0.append((slug, slug_to_data[slug]["cat"], info["at"], info["round"]))
for slug, cat, at, r in sorted(r2_p0, key=lambda x: x[2]):
    print(f"  R{r} | {cat:12s} | {slug} | {at}")
print(f"  TOTAL: {len(r2_p0)}")

# P1 categories
P1_CATS = {"posters", "books", "educational", "menus", "red-packets", "calendars"}
print("\n=== P1 UNOPTIMIZED (could use) ===")
unopt_p1 = []
for slug, info in sorted(slug_to_data.items()):
    if info["cat"] in P1_CATS and slug not in all_optimized:
        unopt_p1.append((slug, info["cat"]))
for slug, cat in unopt_p1:
    print(f"  {cat:12s} | {slug}")
print(f"  TOTAL: {len(unopt_p1)}")
