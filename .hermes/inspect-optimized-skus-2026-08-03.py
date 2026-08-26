#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inspect optimized SKUs in matrix.json + compare with products.ts.
Output: optimized SKU list with id, slug, category, round, date.
"""
import json
import os
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
            "industries_zh": s.get("industries_zh") or s.get("industries", []),
        }

# Load products.ts to get all SKU slugs
products_path = r"F:\zprintpro-nextjs\src\data\products.ts"
with open(products_path, "r", encoding="utf-8") as f:
    products_content = f.read()

# Find all slug: 'xxx' patterns
slug_pattern = re.compile(r"slug:\s*['\"]([^'\"]+)['\"]", re.MULTILINE)
all_product_slugs = sorted(set(slug_pattern.findall(products_content)))
print(f"TOTAL products.ts slugs: {len(all_product_slugs)}")
print(f"TOTAL matrix v7_sku_optimizations unique slugs: {len(all_optimized)}")
print()

# Find NOT optimized P0 SKUs
# P0 categories per AGENTS §13.3: stickers / flyers / packaging / paper-bags
P0_CATS = {"stickers", "flyers", "packaging", "paper-bags"}

# Get category for each slug from products.ts (find by reverse-lookup of category via category[slug] config)
# Simpler: for each slug, scan products.ts to find its first `category:` line within the same object
def get_category(slug, content):
    # Find the slug
    m = re.search(r"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content)
    if not m:
        return None
    # Search backwards from this position for the nearest category: line
    text_before = content[:m.start()]
    # Find last "category:" line
    cat_matches = list(re.finditer(r"category:\s*['\"]([^'\"]+)['\"]", text_before))
    if cat_matches:
        return cat_matches[-1].group(1)
    return None

# Map: slug -> category from products.ts
slug_to_cat = {}
for slug in all_product_slugs:
    cat = get_category(slug, products_content)
    if cat:
        slug_to_cat[slug] = cat

# Print unoptimized P0 SKUs
print("=== UNOPTIMIZED P0 SKUs (not in matrix) ===")
unopt_p0 = []
for slug, cat in slug_to_cat.items():
    if cat in P0_CATS and slug not in all_optimized:
        unopt_p0.append((slug, cat))
for slug, cat in sorted(unopt_p0, key=lambda x: (x[1], x[0])):
    print(f"  {cat:12s} | {slug}")

print()
print("=== OPTIMIZED P0 SKUs (R1) ===")
opt_r1 = []
for slug, info in all_optimized.items():
    if slug in slug_to_cat and slug_to_cat[slug] in P0_CATS and info["round"] == 1:
        opt_r1.append((slug, slug_to_cat[slug], info["at"]))
for slug, cat, at in sorted(opt_r1, key=lambda x: (x[1], x[2])):
    print(f"  R1 | {cat:12s} | {slug} | {at}")

print()
print("=== OPTIMIZED P0 SKUs (R2) ===")
opt_r2 = []
for slug, info in all_optimized.items():
    if slug in slug_to_cat and slug_to_cat[slug] in P0_CATS and info["round"] >= 2:
        opt_r2.append((slug, slug_to_cat[slug], info["at"], info["round"]))
for slug, cat, at, r in sorted(opt_r2, key=lambda x: (x[1], x[2])):
    print(f"  R{r} | {cat:12s} | {slug} | {at}")
