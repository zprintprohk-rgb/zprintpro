#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Add 5 new slugs to articleSlugs in page.tsx"""
from pathlib import Path

REPO = Path(r"F:\zprintpro-nextjs")
PAGE_TSX = REPO / "src" / "app" / "[locale]" / "blog" / "[slug]" / "page.tsx"

NEW_SLUGS = """  'baby-food-packaging-box-printing-guide',
  'real-estate-flyer-printing-guide',
  'medical-device-packaging-box-guide',
  'auto-parts-shopping-bag-printing-guide',
  'sports-merchandise-gift-box-printing-guide',"""

with open(PAGE_TSX, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the articleSlugs anchor. Looking at the prior grep output:
# 'construction-material-sample-book-printing-guide',\n  'thick-paper-flyer-printing-restaurant-takeout-guide',
# Wait that's wrong order. Let me look at the actual structure.

# Better: find the end of articleSlugs array. The array ends with the last entry + '];'
# Find the last known slug before Q-NEW-03 then insert the 5 new slugs after
anchor = "  'construction-material-sample-book-printing-guide',"
if anchor not in content:
    raise RuntimeError(f"Cannot find anchor {anchor}")
new_content = content.replace(anchor, anchor + "\n" + NEW_SLUGS + ",", 1)
print("[1] Inserted 5 new slugs into articleSlugs array")

with open(PAGE_TSX, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"[2] Wrote {PAGE_TSX}")

# Verify
with open(PAGE_TSX, 'r', encoding='utf-8') as f:
    verify = f.read()
for slug in ['baby-food-packaging-box-printing-guide', 'real-estate-flyer-printing-guide',
             'medical-device-packaging-box-guide', 'auto-parts-shopping-bag-printing-guide',
             'sports-merchandise-gift-box-printing-guide']:
    has = f"'{slug}'" in verify
    print(f"  {slug}: in_articleSlugs={has}")
