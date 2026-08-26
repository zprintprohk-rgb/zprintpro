#!/usr/bin/env python3
"""Check products.ts schema for 5 SKUs - what title fields exist"""
import re
from pathlib import Path

c = Path("src/data/products.ts").read_text(encoding="utf-8")

for slug in ['white-card-bags', 'handle-bags', 'mailer-boxes', 'food-boxes', 'kraft-paper-packaging-box']:
    m = re.search(rf"slug: '{slug}',[\s\S]{{0,2500}}", c)
    if not m:
        print(slug, 'NOT FOUND')
        continue
    block = m.group(0)
    titles = re.findall(r"(title\w*):", block)
    descs = re.findall(r"(description\w*):", block)
    print(f"{slug}:")
    print(f"  title fields: {titles}")
    print(f"  desc fields: {descs}")
